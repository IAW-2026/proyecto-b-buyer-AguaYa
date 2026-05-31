/*
import React from "react";
import{getProducts,getProductsByVendor,Product} from "@/lib/external_api_calls/products";
import ProductCard from "@/app/components/products/productCard";

type VendorPageProps = {
  params: Promise<{ vendor_id: string }>;
};

export default async function VendorPage({ params }: VendorPageProps) {
  const { vendor_id } = await params;
  const products = await getProductsByVendor(vendor_id);
  return (
    <div>
      <div>
        <h1>Vendor ID: {vendor_id}</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
*/ 

import React from "react";
import {Product,getProductById} from "@/lib/external_api_calls/products"
import { AddToCartButton } from "@/app/components/cart/addToCartButton";
type ProductPageProps = {
  params: Promise<{ product_id: string }>;
};

export default async function ProductPage({params}:ProductPageProps){
    const {product_id} = await params;
    const product = await getProductById(product_id);
    return (
        <div>
            <h1>{product.name}</h1>
            <AddToCartButton productId={product.id} quantity={1}/>
        </div>
    );
}


