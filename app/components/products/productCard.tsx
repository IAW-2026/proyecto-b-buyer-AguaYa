import {Product} from "@/lib/external_api_calls/products";

export default async function ProductCard({product}:{product: Product}){
    return (
    <div className="border rounded p-4">
        <h1>{product.name}</h1>
        <p>{product.price.toString()}</p>
        <p>{product.stock.toString()}</p>
    </div>
  )
}

//id:"1", vendorId:"1", name:"Producto1", price:100, stock:10}
