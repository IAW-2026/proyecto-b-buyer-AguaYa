import 'dotenv/config'
import { fakerES as faker } from '@faker-js/faker'
import { PrismaClient } from '../generated/prisma/client/index.js'
import { PrismaNeon } from '@prisma/adapter-neon'
import { getVendors, mockVendors } from '../lib/external_api_calls/vendors'
import { getProducts, mockProducts } from '../lib/external_api_calls/products'
import type { Vendor } from '../lib/external_api_calls/vendors'
import type { Product } from '../lib/external_api_calls/products'

const CLERK_API = 'https://api.clerk.com/v1/users'
const CLERK_SECRET = process.env.CLERK_SECRET_KEY!
const SEED_PASSWORD = 'SeedTest123!'
const BUYER_COUNT = 20

const connectionString = process.env.DATABASE_URL!
const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) })

const STATUS_WEIGHTS: [string, number][] = [
  ['DELIVERED', 0.40],
  ['PENDING', 0.20],
  ['PAID', 0.10],
  ['READY', 0.05],
  ['IN_DELIVERY', 0.05],
  ['IN_REVISION', 0.10],
  ['CANCELLED', 0.10],
]

function randomStatus(): string {
  const r = Math.random()
  let cumulative = 0
  for (const [status, weight] of STATUS_WEIGHTS) {
    cumulative += weight
    if (r < cumulative) return status
  }
  return 'PENDING'
}

function randomDate(daysBack: number): Date {
  const now = Date.now()
  const past = now - daysBack * 24 * 60 * 60 * 1000
  return new Date(past + Math.random() * (now - past))
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

async function clerkCreateUser(email: string, firstName: string, lastName: string): Promise<string> {
  const res = await fetch(CLERK_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLERK_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: [email],
      first_name: firstName,
      last_name: lastName,
      password: SEED_PASSWORD,
      public_metadata: { seed: true },
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Clerk create user failed (${res.status}): ${body}`)
  }
  const data: { id: string } = await res.json()
  return data.id
}

async function clerkDeleteUser(clerkId: string): Promise<void> {
  const res = await fetch(`${CLERK_API}/${clerkId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${CLERK_SECRET}` },
  })
  if (!res.ok && res.status !== 404) {
    console.warn(`   ⚠️ Failed to delete Clerk user ${clerkId}: ${res.status}`)
  }
}

async function cleanupClerkSeedUsers(): Promise<number> {
  let deleted = 0
  const res = await fetch(`${CLERK_API}?limit=500`, {
    headers: { 'Authorization': `Bearer ${CLERK_SECRET}` },
  })
  if (!res.ok) throw new Error(`Failed to list Clerk users: ${res.status}`)
  const users: { id: string; public_metadata?: Record<string, unknown> }[] = await res.json()

  for (const u of users) {
    if (u.public_metadata?.seed === true) {
      await clerkDeleteUser(u.id)
      deleted++
    }
  }
  return deleted
}

async function main() {
  console.log('🌱 Starting seed...')
  const start = Date.now()

  // 1. Fetch vendors and products
  console.log('📦 Fetching vendors and products...')
  let vendors: Vendor[]
  let products: Product[]
  let usingMock = false
  try {
    vendors = await getVendors()
    products = await getProducts()
  } catch (err) {
    console.warn('   ⚠️ External API failed, falling back to mock data')
    console.warn(`   ${err instanceof Error ? err.message : err}`)
    vendors = mockVendors
    products = mockProducts
    usingMock = true
  }
  console.log(`   ✅ ${vendors.length} vendors, ${products.length} products${usingMock ? ' (mock)' : ''}`)

  const productsByVendor = new Map<string, Product[]>()
  for (const p of products) {
    const list = productsByVendor.get(p.vendorId)
    if (list) list.push(p)
    else productsByVendor.set(p.vendorId, [p])
  }

  // 2. Clean up previous seed Clerk users
  console.log('🧹 Cleaning previous seed Clerk users...')
  const deletedClerk = await cleanupClerkSeedUsers()
  console.log(`   ✅ ${deletedClerk} Clerk users removed`)

  // 3. Clean database
  console.log('🧹 Cleaning database...')
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.address.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.buyer.deleteMany()
  console.log('   ✅ Database cleaned')

  // 4. Create buyers + Clerk users
  console.log(`👤 Creating ${BUYER_COUNT} buyers (with Clerk users)...`)
  const buyerRecords: { buyer_id: string; user_id: string; name: string }[] = []

  for (let i = 0; i < BUYER_COUNT; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName }).toLowerCase()
    const name = `${firstName} ${lastName}`
    const phone = faker.phone.number({ style: 'international' })
    const progress = `[${i + 1}/${BUYER_COUNT}]`

    process.stdout.write(`   ${progress} Creating Clerk user ${email}... `)
    const clerkId = await clerkCreateUser(email, firstName, lastName)
    console.log(`✅`)

    const buyer = await prisma.buyer.create({
      data: {
        user_id: clerkId,
        mail: email,
        name,
        phone_numbers: phone,
        is_active: faker.datatype.boolean(0.9),
      },
    })
    buyerRecords.push({ buyer_id: buyer.buyer_id, user_id: clerkId, name })
  }
  console.log(`   ✅ ${buyerRecords.length} buyers created`)

  // 5. Create addresses
  console.log('📍 Creating addresses...')
  let addressCount = 0
  const addressRows: { street: string; city: string; zip: string; buyer_id: string }[] = []

  for (const buyer of buyerRecords) {
    const addrCount = faker.number.int({ min: 1, max: 2 })
    for (let a = 0; a < addrCount; a++) {
      addressRows.push({
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        zip: faker.location.zipCode('####'),
        buyer_id: buyer.buyer_id,
      })
    }
    addressCount += addrCount
  }
  await prisma.address.createMany({ data: addressRows })
  console.log(`   ✅ ${addressCount} addresses created`)

  // 6. Create favorites
  console.log('⭐ Creating favorites...')
  let favCount = 0
  const vendorIds = vendors.map((v) => v.id)
  for (const buyer of buyerRecords) {
    const count = faker.number.int({ min: 2, max: 5 })
    const picked = pickRandom(vendorIds, Math.min(count, vendorIds.length))
    for (const vendorId of picked) {
      await prisma.favorite.create({
        data: { buyer_id: buyer.buyer_id, vendor_id: vendorId },
      }).catch(() => { /* skip duplicates */ })
      favCount++
    }
  }
  console.log(`   ✅ ${favCount} favorites created`)

  // 7. Create orders
  console.log('📋 Creating orders...')
  let orderCount = 0
  let itemCount = 0
  const allAddresses = await prisma.address.findMany()
  const addressesByBuyer = new Map<string, typeof allAddresses>()
  for (const addr of allAddresses) {
    const list = addressesByBuyer.get(addr.buyer_id)
    if (list) list.push(addr)
    else addressesByBuyer.set(addr.buyer_id, [addr])
  }

  for (const buyer of buyerRecords) {
    const orderQty = faker.number.int({ min: 4, max: 10 })
    const buyerAddresses = addressesByBuyer.get(buyer.buyer_id) ?? []

    for (let o = 0; o < orderQty; o++) {
      const vendor = faker.helpers.arrayElement(vendors)
      const vendorProducts = productsByVendor.get(vendor.id) ?? []
      if (vendorProducts.length === 0) continue

      const itemQty = faker.number.int({ min: 1, max: Math.min(5, vendorProducts.length) })
      const picked = pickRandom(vendorProducts, itemQty)
      const total = picked.reduce((sum, p) => sum + p.price, 0)
      const status = randomStatus()
      const address = buyerAddresses.length > 0
        ? faker.helpers.arrayElement(buyerAddresses)
        : null

      await prisma.order.create({
        data: {
          vendor_id: vendor.id,
          buyer_id: buyer.buyer_id,
          buyer_user_id: buyer.user_id,
          status: status as never,
          total,
          address_id: address?.id ?? undefined,
          created_at: randomDate(90),
          ...(status === 'CANCELLED' ? { status_reason: faker.lorem.sentence() } : {}),
          items: {
            create: picked.map((p) => ({
              product_id: p.id,
              product_name: p.name,
              product_price: p.price,
              quantity: faker.number.int({ min: 1, max: 3 }),
            })),
          },
        },
      })
      orderCount++
      itemCount += itemQty
    }
  }
  console.log(`   ✅ ${orderCount} orders with ${itemCount} items created`)

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\n🎉 Seed completed in ${elapsed}s`)
  console.log(`   ${BUYER_COUNT} buyers`)
  console.log(`   ${addressCount} addresses`)
  console.log(`   ${favCount} favorites`)
  console.log(`   ${orderCount} orders`)
  console.log(`   ${itemCount} order items`)
  console.log(`\n🔑 All seed users password: ${SEED_PASSWORD}`)
}

main()
  .catch((e) => {
    console.error('💥 Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
