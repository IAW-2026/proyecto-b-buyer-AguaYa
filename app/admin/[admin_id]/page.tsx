// app/admin/[admin_id]/page.tsx
import Link from 'next/link';

type Props = {
  params: Promise<{ admin_id: string }>;
};

export default async function AdminPage({ params }: Props) {
  const { admin_id } = await params;

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
  <h1 className="text-2xl font-bold mb-6 text-center">Panel de administración</h1>
  <div className="grid grid-cols-3 gap-4">
    <Link href={`/admin/${admin_id}/orders`} className="bg-[#4287f5] hover:bg-blue-600 text-white text-center font-medium py-8 rounded-lg transition-colors">
      Órdenes
    </Link>
    <Link href={`/admin/${admin_id}/favorites`} className="bg-[#4287f5] hover:bg-blue-600 text-white text-center font-medium py-8 rounded-lg transition-colors">
      Favoritos
    </Link>
    <Link href={`/admin/${admin_id}/buyers`} className="bg-[#4287f5] hover:bg-blue-600 text-white text-center font-medium py-8 rounded-lg transition-colors">
      Compradores
    </Link>
  </div>
</main>
    </div>
  );
}