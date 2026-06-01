
'use server'
import { deleteBuyer } from '@/lib/buyers'

export async function deleteBuyerAction(buyerId: string) {
    await deleteBuyer(buyerId);
    return { ok: true }
}

