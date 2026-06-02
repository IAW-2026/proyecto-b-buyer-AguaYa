import { getAllOrders } from '@/lib/orders'
import { AdminOrderCard } from '@/app/components/orders/adminOrderCard';
import Link from 'next/link';
export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex divide-x divide-gray-200">
          <Link href="/admin" className="flex-1 text-center py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            ← Volver al panel de administración
          </Link>
        </div>
      </nav>
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
    </div>
  );
}