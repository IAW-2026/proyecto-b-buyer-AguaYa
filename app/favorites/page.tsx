
import { auth } from '@clerk/nextjs/server';
import { getBuyerByUserId } from '@/lib/buyers';
import { getFavoritesByBuyerId } from '@/lib/favorites';
import { getVendors } from '@/lib/external_api_calls/vendors';
import { FavoriteCard } from '@/app/components/favorites/favoriteCard';
import Link from 'next/link';
export default async function FavoritesPage() {
  const { userId } = await auth();
  const buyer = await getBuyerByUserId(userId!);
  if (!buyer) return null;

  const [favorites, vendors] = await Promise.all([
    getFavoritesByBuyerId(buyer.buyer_id),
    getVendors(),
  ]);

  const favoriteIds = new Set(favorites.map((f) => f.vendor_id));
  const favoriteVendors = vendors.filter((v) => favoriteIds.has(v.id));

  return (
    <div>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex divide-x divide-gray-200">
            <Link href="/" className="flex-1 text-center py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              ← Volver
            </Link>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Mis favoritos</h1>
        {favoriteVendors.length === 0 ? (
          <p className="text-gray-500">No tenés vendedores favoritos aún.</p>
        ) : (
        <div className="grid grid-cols-3 gap-4">
          {favoriteVendors.map((vendor) => (
            <FavoriteCard key={vendor.id} vendor={vendor} buyerId={buyer.buyer_id} />
          ))}
        </div>
      )}
    </main>
    </div>
  );
}