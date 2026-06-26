import { getVendors } from "@/lib/external_api_calls/vendors"
import { VendorCatalog } from "@/app/components/vendors/vendorCatalog"

export default async function VendorsPage() {
  const vendors = await getVendors()
  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Todos los Vendedores</h1>
        <VendorCatalog vendors={vendors} />
      </div>
    </div>
  )
}
