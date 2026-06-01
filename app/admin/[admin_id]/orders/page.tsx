import { getAllOrders } from '@/lib/orders'
import { AdminOrderCard } from '@/app/components/orders/adminOrderCard';

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Órdenes</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No hay órdenes registradas.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <AdminOrderCard key={order.order_id} order={order} />
          ))}
        </div>
      )}
    </main>
  );
}