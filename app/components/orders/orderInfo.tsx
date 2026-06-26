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
      <p className="text-sm text-gray-400 mb-2">Vendedor #{order.vendor_id}</p>
      <div className="flex flex-col divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.id} className="py-3">
            <OrderItemCard item={item} />
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <p className="text-lg font-bold">Precio Total: ${order.total.toFixed(2)}</p>
      </div>
    </div>
  );
}