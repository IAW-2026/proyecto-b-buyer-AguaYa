"use client"

import {Product} from "@/lib/external_api_calls/products";

export default function ProductInfo({product}:{product: Product}){
    return (
    <div className="border rounded p-4">
        <p>Precio del producto : ${product.price.toString()}</p>
        <p>Stock disponible : {product.stock.toString()}</p>
    </div>
  )
}