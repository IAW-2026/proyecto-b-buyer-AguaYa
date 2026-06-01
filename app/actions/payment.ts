"use server";
import { setOrderStatus, OrderStatus } from "@/lib/orders";
import { confirmPayment } from "@/lib/external_api_calls/payments";

export async function confirmPaymentAction(orderId: string) {
  await confirmPayment(orderId);
}