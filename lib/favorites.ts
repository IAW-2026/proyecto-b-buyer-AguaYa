import { prisma } from './prisma'

export async function getFavoriteByIDs(buyerId: string, vendorId: string) {
  return prisma.favorite.findUnique({
    where: {
      buyer_id_vendor_id: {
        buyer_id: buyerId,
        vendor_id: vendorId,
      },
    },
  });
}

export async function getFavoritesByBuyerId(buyerId: string) {
  return prisma.favorite.findMany({
    where: { buyer_id: buyerId },
  });
}