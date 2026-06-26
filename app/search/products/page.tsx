import { search } from "@/lib/search";
import ProductCard from "@/app/components/products/productCard";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}