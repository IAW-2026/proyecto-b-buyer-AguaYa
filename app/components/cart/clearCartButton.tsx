"use client";
import { clearCart } from '@/app/actions/cart'
import { useRouter } from 'next/navigation'

export function ClearCartButton() {
  const router = useRouter();

  async function handleClick() {
    await clearCart();
    router.refresh();
  }

  return (
    <button
      onClick={handleClick}
      className="border border-gray-300 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 hover:border-gray-400 transition-colors"
    >
      Limpiar carrito
    </button>
  );
}