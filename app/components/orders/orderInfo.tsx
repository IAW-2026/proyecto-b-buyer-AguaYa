// components/order/OrderCard.tsx
import { Order, OrderItem } from "@/lib/orders";
import { OrderItemCard } from "./orderItemCard";

type Props = {
  order: Order;
  items: OrderItem[];
};

export function OrderInfo({ order, items }: Props) {
  return (
    <div className="border rounded-lg p-4">
        <p className="text-sm text-gray-400 mb-2">Orden #{order.externalId}</p>
        <div className="flex flex-col gap-3">
            {items.map((item) => (
            <OrderItemCard key={item.id} item={item} />
            ))}
        </div>
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <p className="text-lg font-bold">Total: ${order.total.toFixed(2)}</p>
        </div>
    </div>
    );
}