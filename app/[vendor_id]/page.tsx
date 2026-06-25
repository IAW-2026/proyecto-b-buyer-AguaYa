import React,{Suspense} from "react";
import { getProducts, getProductsByVendor, Product } from "@/lib/external_api_calls/products";
import { notFound } from "next/navigation";
import { Vendor, getVendorById } from '@/lib/external_api_calls/vendors'
import ProductCard from "@/app/components/products/productCard";
import AddToFavorites from "../components/vendors/addToFavorites";
import { getFavoriteByIDs } from "@/lib/favorites";
import { getBuyerByUserId } from "@/lib/buyers";
import { auth } from '@clerk/nextjs/server';
import Link from "next/link";
import Image from 'next/image';

const DEFAULT_IMAGE = "/vendedordefault.png";
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
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex justify-between items-center divide-x divide-gray-200">
          <Link href="/" className="flex-1 text-center py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            ← Volver
          </Link>
          <div className="flex-1 flex justify-center items-center py-2">
            <AddToFavorites vendorId={vendor_id} buyerId={buyer?.buyer_id ?? ""} isFavorite={isFavorite} />
          </div>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 pt-6 pb-2 flex flex-col gap-3 items-start">
        <div className="relative w-full h-64 mb-2">
          <Image
            src={vendor.imageUrl ?? DEFAULT_IMAGE}
            alt={vendor.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold">{vendor.name}</h1>
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