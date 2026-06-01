// components/order/OrderCard.tsx
import { Order, OrderItem } from "@/generated/prisma/client";
import { OrderInfo } from "./orderInfo";

type Props = {
  order: Order;
  items: OrderItem[];
};

export function OrderCard({ order, items }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500">Estado: {order.status}</p>
      <OrderInfo order={order} items={items} />
    </div>
  );
}