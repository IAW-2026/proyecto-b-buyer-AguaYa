import { getAllBuyers } from '@/lib/buyers'
import Link from 'next/link'
import { deleteBuyerAction } from '@/app/actions/buyers'

export default async function AdminBuyersPage() {
  const buyers = await getAllBuyers()

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
        <h1 className="text-2xl font-bold mb-6">Compradores</h1>
        {buyers.length === 0 ? (
          <p className="text-gray-500">No hay compradores registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 px-3 font-semibold text-gray-600">Buyer ID</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Nombre</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Email</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Tel</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Activo</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Acción</th>
                </tr>
              </thead>
              <tbody>
                {buyers.map((buyer) => (
                  <tr key={buyer.buyer_id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-3 font-mono text-xs">{buyer.buyer_id}</td>
                    <td className="py-2 px-3">{buyer.name}</td>
                    <td className="py-2 px-3 text-xs">{buyer.mail}</td>
                    <td className="py-2 px-3 text-xs text-gray-500">{buyer.phone_numbers ?? "—"}</td>
                    <td className="py-2 px-3">
                      {buyer.is_active ? (
                        <span className="text-green-600 text-xs font-medium">✅ Sí</span>
                      ) : (
                        <span className="text-red-500 text-xs font-medium">❌ No</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      <form action={deleteBuyerAction.bind(null, buyer.buyer_id)}>
                        <button type="submit" className="text-red-500 hover:text-red-700 text-sm cursor-pointer">🗑️</button>
                      </form>
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
