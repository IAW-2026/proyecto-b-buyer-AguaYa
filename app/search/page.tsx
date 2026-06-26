// app/search/page.tsx
import { SearchBar } from "../components/search/searchBar";

export default function SearchPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Buscar</h1>
      <SearchBar />
    </main>
  );
}