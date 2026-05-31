import {Product} from "@/lib/external_api_calls/products";
import ProductInfo from "./productInfo";
import Link from 'next/link';
export default async function ProductCard({product}:{product: Product}){
    return (
    <div className="border rounded p-4">
        <Link href ={`/products/${product.id}`}>
          {product.name}
        </Link>
        <ProductInfo product={product} />
    </div>
  )
}
