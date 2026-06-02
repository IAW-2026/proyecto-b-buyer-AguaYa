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
      className="w-full py-3 text-sm font-medium text-red-500 hover:bg-gray-50 transition-colors"
    >
      Limpiar carrito
    </button>
  );
}