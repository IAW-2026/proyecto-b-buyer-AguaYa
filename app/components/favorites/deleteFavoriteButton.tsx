
"use client";
import { deleteFavoriteAction } from '@/app/actions/favorites'
import { useRouter } from 'next/navigation'

type Props = {
  vendorId: string;
  buyerId: string;
};

export function DeleteFavoriteButton({ vendorId, buyerId }: Props) {
  const router = useRouter();
  async function handleDelete() {
    await deleteFavoriteAction(vendorId, buyerId);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-80"
    >
      Borrar favorito
    </button>
  );
}