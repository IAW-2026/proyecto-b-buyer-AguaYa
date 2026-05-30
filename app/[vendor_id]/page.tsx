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