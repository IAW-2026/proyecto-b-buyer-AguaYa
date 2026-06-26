import { getAllFavorites } from '@/lib/favorites'
import { getVendors } from '@/lib/external_api_calls/vendors'
import Link from 'next/link'
import { deleteFavoriteAction } from '@/app/actions/favorites'
import { DeleteRowButton } from '@/app/components/admin/deleteRowButton'

export default async function AdminFavoritesPage() {
  const [favorites, vendors] = await Promise.all([
    getAllFavorites(),
    getVendors(),
  ])

  const vendorMap = new Map(vendors.map((v) => [v.id, v]))

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
        <h1 className="text-2xl font-bold mb-6">Favoritos</h1>
        {favorites.length === 0 ? (
          <p className="text-gray-500">No hay favoritos registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 px-3 font-semibold text-gray-600">Buyer ID</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Vendor ID</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Vendor Name</th>
                  <th className="py-2 px-3 font-semibold text-gray-600">Acción</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((favorite) => {
                  const vendor = vendorMap.get(favorite.vendor_id)
                  if (!vendor) return null
                  return (
                    <tr key={`${favorite.buyer_id}-${favorite.vendor_id}`} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-3 font-mono text-xs">{favorite.buyer_id}</td>
                      <td className="py-2 px-3 font-mono text-xs">{favorite.vendor_id}</td>
                      <td className="py-2 px-3">{vendor.name}</td>
                      <td className="py-2 px-3">
                        <DeleteRowButton action={() => deleteFavoriteAction(favorite.vendor_id, favorite.buyer_id)} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
