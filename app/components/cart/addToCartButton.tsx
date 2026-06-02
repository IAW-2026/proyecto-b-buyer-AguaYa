'use client'

import { addToCart } from '@/app/actions/cart'
import { useState } from 'react'

interface Props {
  productId: string
}

export function AddToCartButton({ productId }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleQuantityChange(value: string) {
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed > 0) {
      setQuantity(parsed);
    }
  }

  async function handleClick() {
    setLoading(true)
    const result = await addToCart(productId, quantity)
    setLoading(false)
    if (result.ok) {
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } else {
      setError(result.error ?? 'Ocurrió un error inesperado.')
      setTimeout(() => setError(null), 3000)
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => handleQuantityChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#4287f5] focus:border-transparent"
      />
      <button
        onClick={handleClick}
        disabled={loading || added}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors
          ${added
            ? 'bg-green-500 text-white cursor-default'
            : 'bg-[#4287f5] text-white hover:bg-blue-600 cursor-pointer'
          }
          ${loading ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        {loading ? 'Agregando...' : added ? '¡Agregado!' : 'Agregar al carrito'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}