import React, { Suspense } from "react";
import { getProductsByVendor, Product } from "@/lib/external_api_calls/products";
import { notFound } from "next/navigation";
import { getVendorById } from '@/lib/external_api_calls/vendors'
import ProductCard from "@/app/components/products/productCard";
import AddToFavorites from "../components/vendors/addToFavorites";
import { getFavoriteByIDs } from "@/lib/favorites";
import { getBuyerByUserId } from "@/lib/buyers";
import { auth } from '@clerk/nextjs/server';
import Link from "next/link";
import Image from 'next/image';
import { MapPin, Package } from "lucide-react";

const DEFAULT_IMAGE = "/vendedordefault.png";

type VendorPageProps = {
  params: Promise<{ vendor_id: string }>;
};

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-4xl mx-auto">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4 animate-pulse">
          <div className="w-full h-40 bg-gray-200 rounded-lg mb-3" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}

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
      <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-3">
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
          ← Volver
        </Link>
      </nav>
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-2">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative w-full md:w-48 h-48 shrink-0">
            <Image
              src={vendor.imageUrl ?? DEFAULT_IMAGE}
              alt={vendor.name}
              fill
              sizes="(max-width: 768px) 100vw, 192px"
              className="rounded-xl shadow-md object-cover"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{vendor.name}</h1>
              <AddToFavorites vendorId={vendor_id} buyerId={buyer?.buyer_id ?? ""} isFavorite={isFavorite} iconOnly />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {vendor.address}
              </span>
              <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                <Package size={14} /> {vendor.productCount} productos
              </span>
            </div>
            {vendor.description && (
              <p className="text-gray-600 leading-relaxed">{vendor.description}</p>
            )}
          </div>
        </div>
      </div>
      <hr className="max-w-4xl mx-auto my-6 border-gray-200" />
      <Suspense fallback={<ProductGridSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-4xl mx-auto">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
