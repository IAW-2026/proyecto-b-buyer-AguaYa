import {Product} from "@/lib/external_api_calls/products";

export default async function ProductInfo({product}:{product: Product}){
    return (
    <div className="border rounded p-4">
        <p>{product.price.toString()}</p>
        <p>{product.stock.toString()}</p>
    </div>
  )
}