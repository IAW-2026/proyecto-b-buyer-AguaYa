import React from "react";
import { getVendors, Vendor } from "@/lib/external_api_calls/vendors";
import VendorCard from "@/app/components/vendors/vendorCard";
import Link from "next/link";
export default async function Home() {
  const vendors = await getVendors();
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4287f5] focus:border-transparent"
        />
        <Link href = "/cart">
          Carrito
        </Link>
        <Link href = "/orders">
          Pedidos
        </Link>
        <div className="grid grid-cols-3 gap-4 p-4">
          {vendors.map((vendor:Vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  );
}
