'use client'

import { addToCart } from '@/app/actions/cart'
import { useState } from 'react'

interface Props {
  productId: string
  quantity: number
}

export function AddToCartButton({ productId, quantity}: Props) {
    const [loading, setLoading] = useState(false)
    const [added, setAdded] = useState(false)
    const [error, setError] = useState<string | null>(null)
    async function handleClick() {
        setLoading(true)
        const result = await addToCart(productId, quantity)
        setLoading(false)
        if (result.ok) {
            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
        }
        else {
            setError(result.error ?? 'Ocurrió un error inesperado.');
            setTimeout(() => setError(null), 3000)
        }
    }

    return (
        <div>
            <button onClick={handleClick} disabled={loading || added}>
                {loading ? 'Agregando...' : added ? '¡Agregado!' : 'Agregar al carrito'}
            </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}