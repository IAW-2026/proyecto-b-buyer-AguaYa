import React,{Suspense} from "react";
import { getProducts, getProductsByVendor, Product } from "@/lib/external_api_calls/products";
import { notFound } from "next/navigation";
import { Vendor, getVendorById } from '@/lib/external_api_calls/vendors'
import ProductCard from "@/app/components/products/productCard";
import AddToFavorites from "../components/vendors/addToFavorites";
import { getFavoriteByIDs } from "@/lib/favorites";
import { getBuyerByUserId } from "@/lib/buyers";
import { auth } from '@clerk/nextjs/server';

type VendorPageProps = {
  params: Promise<{ vendor_id: string }>;
};

export default async function VendorPage({ params }: VendorPageProps) {
  const { vendor_id } = await params;
  const { userId } = await auth();

  const [vendor, products, buyer] = await Promise.all([
    getVendorById(vendor_id),
    getProductsByVendor(vendor_id),
    getBuyerByUserId(userId!),
  ]);

  if (!vendor) return notFound();

  const isFavorite = buyer
    ? !!(await getFavoriteByIDs(buyer.buyer_id, vendor_id))
    : false;

  return (
    <div>
      <div>
        <h1>Vendor ID: {vendor_id}</h1>
        <AddToFavorites vendorId={vendor_id} buyerId={buyer?.buyer_id ?? ""} isFavorite={isFavorite} />
      </div>
      <Suspense fallback= {<div>Cargando productos...</div>}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      </Suspense>
    </div>
  );
}