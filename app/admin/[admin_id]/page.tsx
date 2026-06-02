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
        <h1 className="text-2xl font-bold mb-6">Panel de administración</h1>
        <div className="flex flex-col gap-4">
          <Link href={`/admin/${admin_id}/orders`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Ver y gestionar órdenes
          </Link>
          <Link href={`/admin/${admin_id}/favorites`} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Ver y gestionar favoritos
          </Link>
          <Link href={`/admin/${admin_id}/buyers`} className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
            Ver y gestionar compradores
          </Link>
        </div>
      </main>
    </div>
  );
}