'use server'
import { deleteOrder } from "@/lib/orders";

export async function deleteOrderAction(orderId: string) {
    await deleteOrder(orderId);
}