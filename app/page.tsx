import React from "react";
import { getVendors, Vendor } from "@/lib/external_api_calls/vendors";
import VendorCard from "@/app/components/vendors/vendorCard";
import Link from "next/link";
import { SearchBar } from "./components/search/searchBar";
import { auth } from '@clerk/nextjs/server';

export default async function Home() {
  const { sessionClaims } = await auth();
  const isAdmin = sessionClaims?.metadata?.role === "admin";
  const vendors = await getVendors();
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <SearchBar/>
        <Link href = "/cart">
          Carrito
        </Link>
        <Link href = "/orders">
          Pedidos
        </Link>
        <Link href = "/favorites">
          Favoritos
        </Link>
         {isAdmin && (
        <Link href = "/admin">Panel de administración</Link>
        )}
        <div className="grid grid-cols-3 gap-4 p-4">
          {vendors.map((vendor:Vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  );
}
