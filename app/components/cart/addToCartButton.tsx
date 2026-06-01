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
    <div>
      <div>
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>
          -
        </button>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
        />
        <button onClick={() => setQuantity(q => q + 1)}>
          +
        </button>
      </div>
      <button onClick={handleClick} disabled={loading || added}>
        {loading ? 'Agregando...' : added ? '¡Agregado!' : 'Agregar al carrito'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}