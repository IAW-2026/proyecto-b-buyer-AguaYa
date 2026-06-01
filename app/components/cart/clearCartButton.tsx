// components/cart/ClearCartButton.tsx
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
    <button onClick={handleClick}>
      Limpiar carrito
    </button>
  );
}