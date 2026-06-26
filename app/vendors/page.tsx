import { getVendors } from "@/lib/external_api_calls/vendors"
import VendorCard from "@/app/components/vendors/vendorCard"

export default async function VendorsPage() {
  const vendors = await getVendors()
  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Todos los Vendedores</h1>
        <div className="grid grid-cols-3 gap-4">
          {vendors.map(v => <VendorCard key={v.id} vendor={v} />)}
        </div>
      </div>
    </div>
  )
}
