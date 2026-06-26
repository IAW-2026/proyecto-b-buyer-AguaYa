import { Order, OrderItem } from '@/generated/prisma/client'
import { OrderCard } from '@/app/components/orders/orderCard'
import { DeleteOrderButton } from './deleteOrderButton'

type OrderWithItems = Order & { items: OrderItem[] };

type Props = {
  order: OrderWithItems;
};

export function AdminOrderCard({ order }: Props) {
  return (
    <div className="border rounded-lg p-4 flex flex-col gap-2">
      <p className="text-sm text-gray-400">Comprador: #{order.buyer_id}</p>
      <div className="flex justify-between items-center">
        <OrderCard order={order} items={order.items} />
        <DeleteOrderButton orderId={order.order_id} />
      </div>
    </div>
  );
}