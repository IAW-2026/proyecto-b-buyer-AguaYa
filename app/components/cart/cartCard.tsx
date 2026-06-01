"use client";
import { Order, OrderItem } from "@/generated/prisma/client";
import { OrderInfo } from "../orders/orderInfo";
import { confirmPaymentAction } from "@/app/actions/payment";
import { deleteOrderAction } from "@/app/actions/orders";
import { useRouter } from "next/navigation";

type Props = {
  order: Order;
  items: OrderItem[];
};

export function CartCard({ order, items }: Props) {
  const router = useRouter();

  async function handleConfirm() {
    await confirmPaymentAction(order.order_id);
    router.refresh();
  }

  async function handleDelete() {
    await deleteOrderAction(order.order_id);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-2">
      <OrderInfo order={order} items={items} />
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-80"
        >
          Quitar del carrito
        </button>
        <button
          onClick={handleConfirm}
          className="w-full bg-black text-white px-4 py-2 rounded-lg hover:opacity-80"
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  );
}