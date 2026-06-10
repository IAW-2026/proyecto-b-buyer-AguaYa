import React, { Suspense } from "react";
import { getVendors, Vendor } from "@/lib/external_api_calls/vendors";
import VendorCard from "@/app/components/vendors/vendorCard";
import Link from "next/link";
import { SearchBar } from "./components/search/searchBar";
import { auth } from '@clerk/nextjs/server';
import { isAdmin } from "@/lib/auth-custom";
import { clerkClient} from "@clerk/nextjs/server";
import { createBuyerIfNotExists } from "@/lib/buyers";

export default async function Home() {
  const { userId } = await auth();
  console.log(await auth());
  const isAdminUser = await isAdmin();
  const vendors = await getVendors();
  if (userId) {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    await createBuyerIfNotExists(
      userId,
      user.emailAddresses[0].emailAddress,
      `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
    ) 
  }
  return (
    <div>
      {/* Barra de navegación - ancho completo */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex divide-x divide-gray-200">
          <Link href="/cart" className="flex-1 text-center py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Carrito
          </Link>
          <Link href="/orders" className="flex-1 text-center py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Pedidos
          </Link>
          <Link href="/favorites" className="flex-1 text-center py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Favoritos
          </Link>
          {isAdminUser && (
            <Link href="/admin" className="flex-1 text-center py-3 text-sm font-medium text-red-500 hover:bg-gray-50 transition-colors">
              Admin
            </Link>
          )}
        </div>
      </nav>

     {/* Contenido centrado */}
      <div className="flex justify-center items-center p-4">
        <div className="w-full max-w-4xl">
          <Suspense fallback={<div>Cargando vendedores...</div>}>
            <div className="grid grid-cols-3 gap-4 p-4">
            {vendors.map((vendor: Vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
