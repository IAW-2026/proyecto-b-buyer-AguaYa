import { getAllOrders } from '@/lib/orders'
import Link from 'next/link'
import { deleteOrderAction } from '@/app/actions/orders'
import { DeleteRowButton } from '@/app/components/admin/deleteRowButton'

export default async function AdminOrdersPage() {
  const orders = await getAllOrders()

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
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 px-3 font-semibold text-gray-600">Order ID</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Buyer ID</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Status</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Total</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Fecha</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Acción</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-3 font-mono text-xs">{order.order_id}</td>
                    <td className="py-2 px-3 font-mono text-xs">{order.buyer_id}</td>
                    <td className="py-2 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        order.status === 'PAID' ? 'bg-green-100 text-green-700' :
                        order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        order.status === 'DELIVERED' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-3">${order.total.toFixed(2)}</td>
                    <td className="py-2 px-3 text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('es-AR')}
                    </td>
                    <td className="py-2 px-3">
                      <DeleteRowButton action={() => deleteOrderAction(order.order_id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
