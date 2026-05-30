import {OrderStatus} from '../generated/prisma/client';
import {prisma} from './prisma'

export {OrderStatus} from '../generated/prisma/client';

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