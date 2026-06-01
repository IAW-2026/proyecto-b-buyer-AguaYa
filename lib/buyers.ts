import {prisma} from './prisma'
import { Buyer } from "@/generated/prisma/client";

export async function getBuyerByUserId(userId: string): Promise<Buyer | null> {
    return prisma.buyer.findUnique({
        where: { user_id: userId },
    });
}

export async function getAllBuyers() {
  return prisma.buyer.findMany();
}

export async function deleteBuyer(buyerId: string) {
  return prisma.$transaction(async (tx) => {
    const addresses = await tx.address.findMany({
      where: { buyer_id: buyerId },
      select: { id: true },
    });

    const addressIds = addresses.map((a) => a.id);

    const orders = await tx.order.findMany({
      where: { buyer_id: buyerId },
      select: { order_id: true },
    });

    const orderIds = orders.map((o) => o.order_id);

    await tx.claim.deleteMany({
      where: { order_id: { in: orderIds } },
    });

    await tx.orderItem.deleteMany({
      where: { order_id: { in: orderIds } },
    });

    await tx.order.deleteMany({
      where: { buyer_id: buyerId },
    });

    await tx.address.deleteMany({
      where: { buyer_id: buyerId },
    });

    await tx.favorite.deleteMany({
      where: { buyer_id: buyerId },
    });

    await tx.buyer.delete({
      where: { buyer_id: buyerId },
    });
  });
}