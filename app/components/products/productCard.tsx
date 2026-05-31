import {Product} from "@/lib/external_api_calls/products";
import ProductInfo from "./productInfo";
import Link from 'next/link';
import { AddToCartButton } from '../cart/addToCartButton';
export default async function ProductCard({product}:{product: Product}){
    return (
    <div>
        <Link href ={`/products/${product.id}`}>
          {product.name}
        </Link>
        <ProductInfo product={product} />
        <AddToCartButton productId={product.id} quantity={1}/>
    </div>
  )
}
