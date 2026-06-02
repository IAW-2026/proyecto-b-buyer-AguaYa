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
      <Suspense fallback = {<div>Cargando imagen...</div>}>
      <Image
        src={product.imageUrl ?? DEFAULT_IMAGE}
        alt={product.name}
        width={200}
        height={200}
        className="rounded-lg object-cover"
      />
      </Suspense>
      <Link href={`/products/${product.id}`}>
        {product.name}
      </Link>
      <ProductInfo product={product} />
      <AddToCartButton productId={product.id} />
    </div>
  );
}