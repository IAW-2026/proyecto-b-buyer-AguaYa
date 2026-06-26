import { Order, OrderItem } from "@/generated/prisma/client";
import { OrderInfo } from "@/app/components/orders/orderInfo";
import { CartCard } from "./cartCard";

type OrderWithItems = Order & { items: OrderItem[] };

type Props = {
  orders: OrderWithItems[];
};

export function CartContainer({ orders }: Props) {
  if (orders.length === 0) {
    return <p className="text-gray-500">Tu carrito está vacío.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {orders.map((order) => (
        <CartCard key={order.order_id} order={order} items={order.items} />
      ))}
    </div>
  );
}