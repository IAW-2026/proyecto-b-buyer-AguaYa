"use client";
import { useState } from "react";
import { SearchResults } from "@/lib/search";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(value: string) {
    setQuery(value);
    if (value.trim() === "") {
      setResults(null);
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Buscar productos o vendedores..."
      />
      {loading && <p>Buscando...</p>}
      {results && (
        <div>
          <section>
            <h2>Productos</h2>
            {results.products.length === 0 ? (
              <p>Sin resultados</p>
            ) : (
              results.products.map((p) => (
                <div key={p.id}>
                  <p>{p.name}</p>
                  <p>${p.price}</p>
                </div>
              ))
            )}
          </section>
          <section>
            <h2>Vendedores</h2>
            {results.vendors.length === 0 ? (
              <p>Sin resultados</p>
            ) : (
              results.vendors.map((v) => (
                <div key={v.id}>
                  <p>{v.name}</p>
                  <p>{v.address}</p>
                </div>
              ))
            )}
          </section>
        </div>
      )}
    </div>
  );
}