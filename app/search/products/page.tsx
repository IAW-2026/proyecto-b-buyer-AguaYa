// app/search/products/page.tsx
import { search } from "@/lib/search";

type Props = {
  searchParams: { q?: string };
};

export default async function ProductsSearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const { products } = await search(q);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Resultados para "{q}"
      </h1>
      {products.length === 0 ? (
        <p className="text-gray-500">Sin resultados.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border rounded-lg p-4">
              <p className="font-medium">{p.name}</p>
              <p className="text-gray-500">${p.price}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}