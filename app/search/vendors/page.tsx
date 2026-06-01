// app/search/vendors/page.tsx
import { search } from "@/lib/search";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function VendorsSearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const { vendors } = await search(q);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Resultados para "{q}"
      </h1>
      {vendors.length === 0 ? (
        <p className="text-gray-500">Sin resultados.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {vendors.map((v) => (
            <div key={v.id} className="border rounded-lg p-4">
              <p className="font-medium">{v.name}</p>
              <p className="text-gray-500">{v.address}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}