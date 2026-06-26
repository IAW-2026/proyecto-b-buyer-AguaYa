"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SearchType = "products" | "vendors";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("products");
  const router = useRouter();

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && query.trim() !== "") {
      router.push(`/search/${searchType}?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`Buscar ${searchType === "products" ? "productos" : "vendedores"}...`}
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4287f5] focus:border-transparent"
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value as SearchType)}
        className="text-center px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4287f5] "
      >
        <option value="products">Productos</option>
        <option value="vendors">Vendedores</option>
      </select>
    </div>
  );
}