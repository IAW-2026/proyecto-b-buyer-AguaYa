'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getProductById } from '@/lib/external_api_calls/products'
export async function addToCart(productId: string, quantity: number) {
    const { userId } = await auth()
    console.log('1. userId:', userId)
    if (!userId) {
        return { ok: false, error: 'Debés iniciar sesión para agregar productos.' }
    }
    if (quantity <= 0) {
        return { ok: false, error: 'La cantidad debe ser mayor a 0.' }
    }

    const product = await getProductById(productId);
    console.log('2. product:', product)
    if (!product) {
        return { ok: false, error: 'Producto no encontrado.' }
    }

    const buyer = await prisma.buyer.findFirst({
        where: { user_id: userId },
    });
    console.log('3. buyer:', buyer)
    if (!buyer) {
        return { ok: false, error: 'No hay buyer asociado al usuario.' }
    }

    console.log('4. Entrando a la transacción')
    const result = await prisma.$transaction(async (tx) => {

        let order = await tx.order.findFirst({
            where: { buyer_id: buyer.buyer_id, vendor_id: product.vendorId, status: 'PENDING' },
        })
        console.log('5. order existente:', order)

        if (!order) {
            order = await tx.order.create({
                data: {
                    externalId: crypto.randomUUID(),
                    vendor_id: product.vendorId,
                    buyer_id: buyer.buyer_id,
                    total: 0,
                },
            });
            console.log('6. order creada:', order)
        }

        const existingItem = await tx.orderItem.findFirst({
            where: { order_id: order.order_id, product_id: productId },
        })
        console.log('7. existingItem:', existingItem)

        if (existingItem) {
            await tx.orderItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            })
            console.log('8a. item actualizado')
        } else {
            await tx.orderItem.create({
                data: {
                    order_id: order.order_id,
                    product_id: productId,
                    product_name: product.name,
                    product_price: product.price,
                    quantity,
                },
            })
            console.log('8b. item creado')
        }

        const items = await tx.orderItem.findMany({
            where: { order_id: order.order_id },
        })

        const total = items.reduce(
            (sum, item) => sum + item.product_price * item.quantity,
            0
        )
        console.log('9. total calculado:', total)

        return tx.order.update({
            where: { order_id: order.order_id },
            data: { total },
            include: { items: true },
        })
    })

    console.log('10. resultado final:', result)
    return { ok: true, order: result }
}
