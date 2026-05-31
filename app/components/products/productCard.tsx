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

//id:"1", vendorId:"1", name:"Producto1", price:100, stock:10}
/*
import Link from 'next/link';
import VendorInfo from './vendorInfo';
import { Vendor } from '@/lib/external_api_calls/vendors';

//deberia ser un link a la pagina del vendedor, con el nombre del vendedor como texto del link
export default function VendorCard({ vendor }: { vendor: Vendor }) {
  console.log(vendor.id);
  return (
    <div className="border rounded p-4">
       <Link href={`/${vendor.id}`}>
        {vendor.name}
       </Link>
      <VendorInfo vendor={vendor} />
    </div>
  )
}
*/ 