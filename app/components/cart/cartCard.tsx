"use client";
import { Order, OrderItem } from "@/generated/prisma/client";
import { OrderInfo } from "../orders/orderInfo";
import { confirmPaymentAction } from "@/app/actions/payment";
import { deleteOrderAction } from "@/app/actions/orders";
import { useRouter } from "next/navigation";
import { useState } from "react";
type Props = {
  order: Order;
  items: OrderItem[];
};

export function CartCard({ order, items }: Props) {
  const router = useRouter();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  async function handleConfirm() {
    const result = await confirmPaymentAction(order.order_id);
    if (result?.checkoutUrl) {
      setCheckoutUrl(result.checkoutUrl);
    }
  }

  async function handleDelete() {
    await deleteOrderAction(order.order_id);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-2">
      <OrderInfo order={order} items={items} />
      <div className="flex gap-2">
        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-80 text-center"
          >
            Ir a checkout
          </a>
        ) : (
          <button
            onClick={handleConfirm}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-80"
          >
            Confirmar pedido
          </button>
        )}
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-80"
        >
          Quitar del carrito
        </button>
      </div>
    </div>
  );

}