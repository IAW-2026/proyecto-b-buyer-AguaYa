import {OrderStatus} from '../generated/prisma/client';
import {prisma} from './prisma'

export {OrderStatus} from '../generated/prisma/client';
export type { Order,OrderItem } from '../generated/prisma/client';

export async function setOrderStatus(order_id: string, status: OrderStatus) {
  const order = await prisma.order.findUnique({
    where: { order_id },
  });

  if (!order) {
    throw new Error('Orden no encontrada');
  }

  return prisma.order.update({
    where: { order_id },
    data: {
      status: { set: status },
    },
  });
}

export async function getOrdersByStatus(buyerId: string, status: OrderStatus) {
  return prisma.order.findMany({
    where: {
      buyer_id: buyerId,
      status,
    },
    include: { items: true },
    orderBy: { created_at: "desc" },
  });
}

export async function getConfirmedOrders(buyerId: string) {
  return prisma.order.findMany({
    where: {
      buyer_id: buyerId,
      status: { not: OrderStatus.PENDING },
    },
    include: { items: true },
    orderBy: { created_at: "desc" },
  });
}

export async function deleteOrder(orderId : string){
  return prisma.$transaction(async (tx) => {
    // Eliminar claims asociados a esta orden
    await tx.claim.deleteMany({
      where: { order_id: orderId },
    });

    await tx.orderItem.deleteMany({
      where: { order_id: orderId },
    });

    await tx.order.delete({
      where: { order_id: orderId },
    });
  });
}

// lib/orders.ts
export async function deletePendingOrders(buyerId: string) {
  return prisma.$transaction(async (tx) => {
    const pendingOrders = await tx.order.findMany({
      where: {
        buyer_id: buyerId,
        status: OrderStatus.PENDING,
      },
      select: { order_id: true },
    });

    const orderIds = pendingOrders.map((o) => o.order_id);

    await tx.orderItem.deleteMany({
      where: { order_id: { in: orderIds } },
    });

    await tx.order.deleteMany({
      where: { order_id: { in: orderIds } },
    });
  });
}

export async function getAllOrders() {
  return prisma.order.findMany({
    include: { items: true },
  });
}