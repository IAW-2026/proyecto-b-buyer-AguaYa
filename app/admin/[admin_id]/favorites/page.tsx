import { getAllFavorites } from '@/lib/favorites'
import { getVendors } from '@/lib/external_api_calls/vendors'
import { FavoriteCard } from '@/app/components/favorites/favoriteCard';
import Link from 'next/link';
export default async function AdminFavoritesPage() {
  const [favorites, vendors] = await Promise.all([
    getAllFavorites(),
    getVendors(),
  ]);

  const vendorMap = new Map(vendors.map((v) => [v.id, v]));

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
        <div className="flex flex-col gap-4">
          {favorites.map((favorite) => {
            const vendor = vendorMap.get(favorite.vendor_id);
            if (!vendor) return null;
            return (
              <FavoriteCard
                key={`${favorite.buyer_id}-${favorite.vendor_id}`}
                vendor={vendor}
                buyerId={favorite.buyer_id}
              />
            );
          })}
        </div>
        )}
      </main>
    </div>
  );
}