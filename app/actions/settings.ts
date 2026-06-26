"use server"

import { auth } from "@clerk/nextjs/server"
import { getBuyerByUserId, updateBuyer } from "@/lib/buyers"
import { deleteAddress } from "@/lib/address"

export async function updateBuyerProfileAction(name: string, phone: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("No autenticado")

  const buyer = await getBuyerByUserId(userId)
  if (!buyer) throw new Error("Buyer no encontrado")

  return updateBuyer(buyer.buyer_id, {
    name,
    phone_numbers: phone || undefined,
  })
}

export async function deleteAddressAction(addressId: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("No autenticado")

  return deleteAddress(addressId)
}
