import React from "react";
import { getProductById } from "@/lib/external_api_calls/products"
import ProductCard from "@/app/components/products/productCard";
import Link from "next/link";

type ProductPageProps = {
  params: Promise<{ product_id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { product_id } = await params;
  const product = await getProductById(product_id);

  return (
    <div>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex divide-x divide-gray-200">
          <Link href={`/`} className="flex-1 text-center py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            ← Volver
          </Link>
        </div>
      </nav>
      <div className="max-w-sm mx-auto p-6">
        <ProductCard product={product} />
      </div>
    </div>
  );
}