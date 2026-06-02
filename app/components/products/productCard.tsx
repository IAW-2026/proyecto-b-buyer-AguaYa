import { Product } from "@/lib/external_api_calls/products";
import ProductInfo from "./productInfo";
import Link from 'next/link';
import Image from 'next/image';
import { AddToCartButton } from '../cart/addToCartButton';
import { Suspense } from "react";
const DEFAULT_IMAGE = "/botelladefecto.jpg";

export default async function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <div className="relative w-full h-48">
        <Image
          src={product.imageUrl ?? DEFAULT_IMAGE}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="rounded-lg object-contain"
        />
      </div>
      <Link href={`/products/${product.id}`}>
        {product.name}
      </Link>
      <ProductInfo product={product} />
      <AddToCartButton productId={product.id} />
    </div>
  );
}