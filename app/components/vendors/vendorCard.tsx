import Link from 'next/link';
import VendorInfo from './vendorInfo';
import { Vendor } from '@/lib/external_api_calls/vendors';
//deberia ser un link a la pagina del vendedor, con el nombre del vendedor como texto del link
export default function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <div className="border-2 border-[#D5D5F6] rounded-lg p-6 dark:border-[#4B4B6B] dark:bg-gray-800 dark:text-white">
       <Link href={`/${vendor.id}`}>
        <h1 className="text-xl font-bold text-[#070722] dark:text-white">{vendor.name}</h1>
       </Link>
      <VendorInfo vendor={vendor} />
    </div>
  )
}
