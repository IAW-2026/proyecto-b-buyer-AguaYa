import {OrderStatus} from '../generated/prisma/client';
import {prisma} from './prisma'

export {OrderStatus} from '../generated/prisma/client';
export type { Order,OrderItem } from '../generated/prisma/client';

export async function setOrderStatus(order_id: string, status: OrderStatus, status_reason?: string) {
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
      ...(status_reason !== undefined && { status_reason }),
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
    await tx.orderItem.deleteMany({
      where: { order_id: orderId },
    });

    await tx.order.delete({
      where: { order_id: orderId },
    });
  });
}

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

export async function getOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { order_id: orderId },
    include: { items: true, address: true },
  });
}

export async function getOrdersByBuyerId(buyerId: string) {
  return prisma.order.findMany({
    where: { buyer_id: buyerId },
    include: { items: true },
    orderBy: { created_at: "desc" },
  });
}

export async function createOrder(data: {
  vendor_id: string
  buyer_id: string
  buyer_user_id: string
  total: number
  address_id?: string
  items?: { product_id: string; product_name: string; product_price: number; quantity: number }[]
}) {
  return prisma.order.create({
    data: {
      vendor_id: data.vendor_id,
      buyer_id: data.buyer_id,
      buyer_user_id: data.buyer_user_id,
      total: data.total,
      address_id: data.address_id,
      items: data.items ? { create: data.items } : undefined,
    },
    include: { items: true },
  })
}

export async function assignAddressToOrder(orderId: string, addressId: string) {
  const order = await prisma.order.findUnique({
    where: { order_id: orderId },
  });

  if (!order) {
    throw new Error('Orden no encontrada');
  }

  return prisma.order.update({
    where: { order_id: orderId },
    data: { address_id: addressId },
  });
}