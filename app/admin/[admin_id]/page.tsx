// app/admin/[admin_id]/page.tsx
import Link from 'next/link';

type Props = {
  params: Promise<{ admin_id: string }>;
};

export default async function AdminPage({ params }: Props) {
  const { admin_id } = await params;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de administración</h1>
      <div className="flex flex-col gap-4">
        <Link href={`/admin/${admin_id}/orders`}>
          Órdenes
        </Link>
        <Link href={`/admin/${admin_id}/favorites`}>
          Favoritos
        </Link>
        <Link href={`/admin/${admin_id}/buyers`}>
          Compradores
        </Link>
      </div>
    </main>
  );
}