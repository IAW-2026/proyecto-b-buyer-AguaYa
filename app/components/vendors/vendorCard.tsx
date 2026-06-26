"use client"

import Link from 'next/link';
import VendorInfo from './vendorInfo';
import { Vendor } from '@/lib/external_api_calls/vendors';
import Image from 'next/image';

const DEFAULT_IMAGE = "/vendedordefault.png";

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <div className="border-2 border-[#D5D5F6] rounded-lg p-6 dark:border-[#4B4B6B] dark:bg-gray-800 dark:text-white">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={vendor.imageUrl ?? DEFAULT_IMAGE}
          alt={vendor.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="rounded-lg object-contain"
        />
      </div>
      <Link href={`/${vendor.id}`}>
        <h1 className="text-xl font-bold text-[#070722] dark:text-white">{vendor.name}</h1>
      </Link>
      <VendorInfo vendor={vendor} />
    </div>
  )
}
