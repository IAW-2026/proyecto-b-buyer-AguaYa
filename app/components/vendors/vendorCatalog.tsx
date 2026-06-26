"use client"

import { useState, useMemo } from "react"
import { Vendor } from "@/lib/external_api_calls/vendors"
import VendorCard from "./vendorCard"

type SortKey = "name-asc" | "name-desc" | "address"

export function VendorCatalog({ vendors }: { vendors: Vendor[] }) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("name-asc")

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    let items = q
      ? vendors.filter(
          (v) =>
            (v.name?.toLowerCase() ?? '').includes(q) ||
            (v.address?.toLowerCase() ?? '').includes(q),
        )
      : [...vendors]

    items.sort((a, b) => {
      switch (sort) {
        case "name-asc": return (a.name ?? '').localeCompare(b.name ?? '')
        case "name-desc": return (b.name ?? '').localeCompare(a.name ?? '')
        case "address": return (a.address ?? '').localeCompare(b.address ?? '')
        default: return 0
      }
    })

    return items
  }, [vendors, query, sort])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar vendedores..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4287f5] focus:border-transparent"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4287f5]"
        >
          <option value="name-asc">Nombre A-Z</option>
          <option value="name-desc">Nombre Z-A</option>
          <option value="address">Ubicación</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Sin resultados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  )
}
