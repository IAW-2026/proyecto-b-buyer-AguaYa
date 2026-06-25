import { prisma } from './prisma'

export async function getClaimsByOrderId(orderId: string) {
  return prisma.claim.findMany({
    where: { order_id: orderId },
  })
}

export async function createClaim(orderId: string, reason: string, photo: string) {
  return prisma.claim.create({
    data: {
      order_id: orderId,
      reason,
      photo,
      date: new Date(),
    },
  })
}

export async function updateClaim(claimId: string, data: { reason?: string; photo?: string }) {
  return prisma.claim.update({
    where: { claim_id: claimId },
    data,
  })
}

export async function deleteClaim(claimId: string) {
  return prisma.claim.delete({
    where: { claim_id: claimId },
  })
}
