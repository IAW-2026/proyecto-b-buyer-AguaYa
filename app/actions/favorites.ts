'use server'

import { prisma } from '@/lib/prisma'
import { getBuyerByUserId } from '@/lib/buyers';

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