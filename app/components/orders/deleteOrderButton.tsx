"use client";
import { deleteOrderAction } from '@/app/actions/orders'
import { useRouter } from 'next/navigation'

type Props = {
  orderId: string;
};

export function DeleteOrderButton({ orderId }: Props) {
  const router = useRouter();

  async function handleDelete() {
    await deleteOrderAction(orderId);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-80"
    >
      Eliminar orden
    </button>
  );
}