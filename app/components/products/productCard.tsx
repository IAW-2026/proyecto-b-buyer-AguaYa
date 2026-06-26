"use client"

import { Product } from "@/lib/external_api_calls/products";
import ProductInfo from "./productInfo";
import Link from 'next/link';
import Image from 'next/image';
import { AddToCartButton } from '../cart/addToCartButton';
const DEFAULT_IMAGE = "/botelladefecto.jpg";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 bg-white flex flex-col gap-2">
      <div className="relative w-full h-40">
        <Image
          src={product.imageUrl ?? DEFAULT_IMAGE}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="rounded-lg object-cover"
        />
      </div>
      <Link href={`/products/${product.id}`}>
        <h3 className="font-semibold text-gray-900 hover:text-[#4287f5] transition-colors">
          {product.name}
        </h3>
      </Link>
      <ProductInfo product={product} />
      <AddToCartButton productId={product.id} />
    </div>
  );
}
