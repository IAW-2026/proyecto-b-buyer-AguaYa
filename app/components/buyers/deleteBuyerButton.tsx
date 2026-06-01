
"use client";
import { deleteBuyerAction } from '@/app/actions/buyers'
import { useRouter } from 'next/navigation'

type Props = {
  buyerId: string;
};

export function DeleteBuyerButton({ buyerId }: Props) {
  const router = useRouter();

  async function handleDelete() {
    await deleteBuyerAction(buyerId);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-80"
    >
      Eliminar buyer
    </button>
  );
}