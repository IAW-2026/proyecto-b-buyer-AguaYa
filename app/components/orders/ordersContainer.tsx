// components/orders/OrderListContainer.tsx
import { Order, OrderItem } from "@/lib/orders";
import { OrderCard } from "@/app/components/orders/orderCard";

type OrderWithItems = Order & { items: OrderItem[] };

type Props = {
  orders: OrderWithItems[];
  emptyMessage?: string;
};

export function OrdersContainer({ orders  }: Props) {
  if (orders.length === 0) {
    return <p className="text-gray-500">No tenes pedidos</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {orders.map((order) => (
        <OrderCard key={order.order_id} order={order} items={order.items} />
      ))}
    </div>
  );
}

