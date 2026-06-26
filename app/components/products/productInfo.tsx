"use client"

import {Product} from "@/lib/external_api_calls/products";

export default function ProductInfo({product}:{product: Product}){
    return (
    <div>
        <p className="text-lg font-bold text-[#4287f5]">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Stock: {product.stock} unidades</p>
    </div>
  )
}
