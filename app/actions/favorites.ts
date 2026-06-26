'use server'

import { prisma } from '@/lib/prisma'
import { getBuyerByUserId } from '@/lib/buyers';
import { deleteFavorite } from '@/lib/favorites';
export async function addFavorite(vendorId: string, buyerId?: string) {
    if (!buyerId) {
        return { ok: false, error: 'Debés iniciar sesión para agregar favoritos.' }
    }
    const result =  await prisma.favorite.create({
        data: {
            buyer_id: buyerId,
            vendor_id: vendorId,
        },
    });
    return { ok: true }
}



export async function deleteFavoriteAction(vendorId: string, buyerId: string) {
  await deleteFavorite(buyerId, vendorId);
}