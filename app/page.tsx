import React from "react";
import {getVendors} from "@/lib/external_api_calls/vendors";
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
        <div className="grid grid-cols-3 gap-4">
         <pre>{JSON.stringify(vendors, null, 2)}</pre>
      </div>
      </div>
    </div>
  );
}
