// app/admin/[admin_id]/buyers/page.tsx
import { getAllBuyers } from '@/lib/buyers'
import { AdminBuyerCard } from '@/app/components/buyers/adminBuyerCard';

export default async function AdminBuyersPage() {
  const buyers = await getAllBuyers();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Compradores</h1>
      {buyers.length === 0 ? (
        <p className="text-gray-500">No hay compradores registrados.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {buyers.map((buyer) => (
            <AdminBuyerCard key={buyer.buyer_id} buyer={buyer} />
          ))}
        </div>
      )}
    </main>
  );
}