import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client/index.js'
import { PrismaNeon } from '@prisma/adapter-neon'


const connectionString = process.env.DATABASE_URL ;
const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) })

async function main() {
	console.log('Comenzando seed...')

	// Eliminar datos existentes para permitir re-ejecuciones idempotentes
	await prisma.orderItem.deleteMany()
	await prisma.order.deleteMany()
	await prisma.address.deleteMany()
	await prisma.favorite.deleteMany()
	await prisma.buyer.deleteMany()
	await prisma.adminBuyer.deleteMany()

	// Crear un comprador con dirección
	const buyer1 = await prisma.buyer.create({
		data: {
			user_id: 'user_1',
			mail: 'alice@example.com',
			phone_numbers: '123456789',
			name: 'Alice',
			addresses: {
				create: [
					{
						street: 'Av. Principal 123',
						city: 'Lima',
						zip: '15001'
					}
				]
			}
		},
		include: { addresses: true }
	})

	const address1 = buyer1.addresses[0]

	// Crear un pedido para buyer1 con dos items
	const order1 = await prisma.order.create({
		data: {
			vendor_id: 'vendor_1',
			buyer_id: buyer1.buyer_id,
			buyer_user_id: buyer1.user_id,
			total: 49.99,
			address_id: address1.id,
			items: {
				create: [
					{
						product_id: 'prod_1',
						product_name: 'Agua mineral',
						product_price: 9.99,
						quantity: 3
					},
					{
						product_id: 'prod_2',
						product_name: 'Jugo natural',
						product_price: 20.02,
						quantity: 1
					}
				]
			}
		},
		include: { items: true }
	})

	// Favorite
	await prisma.favorite.create({ data: { buyer_id: buyer1.buyer_id, vendor_id: 'vendor_1' } })

	// AdminBuyer
	await prisma.adminBuyer.create({ data: { id_usuario: 'admin_user_1', nombre: 'Admin Uno' } })

	// Crear un segundo comprador y un pedido mínimo
	const buyer2 = await prisma.buyer.create({
		data: {
			user_id: 'user_2',
			mail: 'bob@example.com',
			phone_numbers: '987654321',
			name: 'Bob',
			addresses: { create: [{ street: 'Calle Secundaria 5', city: 'Cusco', zip: '08001' }] }
		},
		include: { addresses: true }
	})

	await prisma.order.create({
		data: {
			vendor_id: 'vendor_2',
			buyer_id: buyer2.buyer_id,
			buyer_user_id: buyer2.user_id,
			total: 15.0,
			address_id: buyer2.addresses[0].id,
			items: { create: [{ product_id: 'prod_3', product_name: 'Galletas', product_price: 15.0, quantity: 1 }] }
		}
	})

	console.log('Seed completado.')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

