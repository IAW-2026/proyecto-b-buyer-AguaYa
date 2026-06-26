"use server";
import { auth } from "@clerk/nextjs/server";
import { createAddress, getAddressesByBuyerId } from "@/lib/address";
import { assignAddressToOrder } from "@/lib/orders";
import { confirmPayment } from "@/lib/external_api_calls/payments";

export async function createAddressAction(street: string, city: string, zip: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  const { getBuyerByUserId } = await import("@/lib/buyers");
  const buyer = await getBuyerByUserId(userId);
  if (!buyer) throw new Error("Buyer no encontrado");

  return createAddress(buyer.buyer_id, street, city, zip);
}

export async function getBuyerAddressesAction() {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  const { getBuyerByUserId } = await import("@/lib/buyers");
  const buyer = await getBuyerByUserId(userId);
  if (!buyer) throw new Error("Buyer no encontrado");

  return getAddressesByBuyerId(buyer.buyer_id);
}

export async function submitAddressAndPayAction(orderId: string, addressId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  await assignAddressToOrder(orderId, addressId);

  return confirmPayment(orderId);
}
