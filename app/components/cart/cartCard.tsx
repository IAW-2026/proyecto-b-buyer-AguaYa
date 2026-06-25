"use client";
import { Order, OrderItem } from "@/lib/orders";
import { OrderInfo } from "../orders/orderInfo";
import { deleteOrderAction } from "@/app/actions/orders";
import { checkBuyerActive } from "@/app/actions/cart";
import { useRouter } from "next/navigation";
type Props = {
  order: Order;
  items: OrderItem[];
};

export function CartCard({ order, items }: Props) {
  const router = useRouter();

  async function handleConfirm() {
    const { active } = await checkBuyerActive();
    if (!active) {
      router.push('/inactive-user');
      return;
    }
    router.push("/cart/confirm-payment/" + order.order_id);
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
          onClick={handleConfirm}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-80"
        >
          Confirmar pedido
        </button>
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