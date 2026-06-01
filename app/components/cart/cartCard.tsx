"use client";
import { Order, OrderItem } from "@/generated/prisma/client";
import { OrderInfo } from "../orders/orderInfo";
import { confirmPaymentAction } from "@/app/actions/payment";
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

  return (
    <div className="flex flex-col gap-2">
      <OrderInfo order={order} items={items} />
      <button
        onClick={handleConfirm}
        className="w-full bg-black text-white px-4 py-2 rounded-lg hover:opacity-80"
      >
        Confirmar pedido
      </button>
    </div>
  );
}