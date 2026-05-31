'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { getProductById } from '@/lib/external_api_calls/products'
export async function addToCart(productId: string, quantity: number) {
    const { userId } = await auth()
    if (!userId) {
        return { ok: false, error: 'Debés iniciar sesión para agregar productos.' }
    }
    if (quantity <= 0) {
        return { ok: false, error: 'La cantidad debe ser mayor a 0.' }
    }
    const product = await getProductById(productId);
    if (!product) {
        return { ok: false, error: 'Producto no encontrado.' }
    }
    const buyer = await prisma.buyer.findFirst({
        where: {user_id: userId},
    });
    if(!buyer){
        return { ok: false, error: 'No hay buyer asociado al usuario.' }
    }
    const productPrice = product.price;
    const result = await prisma.$transaction(async (tx) => {
   
    //buscamos si hay una orden pendiente para ese buyer y vendedor
    let order = await tx.order.findFirst({
      where: { buyer_id:buyer.buyer_id,vendor_id:product.vendorId, status: 'PENDING' },
    })

    if (!order) {
      order = await tx.order.create({
        data: {  externalId: crypto.randomUUID(), 
        vendor_id: product.vendorId,    
        buyer_id: buyer.buyer_id,                
        total: productPrice },
      });
    }

    // Si el item ya existe, incrementa la cantidad, sino lo crea
    const existingItem = await tx.orderItem.findFirst({
      where: { order_id: order.order_id, product_id: productId },
    })

    if (existingItem) {
      await tx.orderItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      })
    } else {
      await tx.orderItem.create({
        data: {
          order_id: order.order_id,
          product_id: productId,
          product_name: product.name,
          product_price: productPrice,
          quantity,
        },
      })
    }

    // Recalcula el total desde cero con todos los items actuales
    const items = await tx.orderItem.findMany({
      where: { order_id: order.order_id },
    })

    const total = items.reduce(
      (sum, item) => sum + item.product_price * item.quantity,
      0
    )

    return tx.order.update({
      where: { order_id: order.order_id },
      data: { total },
      include: { items: true },
    })
  })

  return { ok: true, order: result }
}
