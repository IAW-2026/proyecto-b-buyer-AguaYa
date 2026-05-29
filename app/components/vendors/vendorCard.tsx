import Link from 'next/link';
import VendorInfo from './vendorInfo';
export interface Vendor {
  id: string
  name: string
  address: string
}
//deberia ser un link a la pagina del vendedor, con el nombre del vendedor como texto del link
export default function VendorCard({ vendor }: { vendor: Vendor }) {
  console.log(vendor.id);
  return (
    <div className="border rounded p-4">
       <Link href={`/${vendor.id}`}>
        {vendor.name}
       </Link>
      <VendorInfo vendor={vendor} />
    </div>
  )
}
