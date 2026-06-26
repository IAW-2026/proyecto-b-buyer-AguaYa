"use client"

import { useState, useMemo } from "react"
import { Product } from "@/lib/external_api_calls/products"
import ProductCard from "./productCard"

type SortKey = "name-asc" | "name-desc" | "price-asc" | "price-desc"

export function ProductCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("name-asc")

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    let items = q
      ? products.filter(
          (p) =>
            (p.name?.toLowerCase() ?? '').includes(q) ||
            (p.description?.toLowerCase() ?? '').includes(q),
        )
      : [...products]

    items.sort((a, b) => {
      switch (sort) {
        case "name-asc": return (a.name ?? '').localeCompare(b.name ?? '')
        case "name-desc": return (b.name ?? '').localeCompare(a.name ?? '')
        case "price-asc": return (a.price ?? 0) - (b.price ?? 0)
        case "price-desc": return (b.price ?? 0) - (a.price ?? 0)
        default: return 0
      }
    })

    return items
  }, [products, query, sort])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4287f5] focus:border-transparent"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4287f5]"
        >
          <option value="name-asc">Nombre A-Z</option>
          <option value="name-desc">Nombre Z-A</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Sin resultados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
