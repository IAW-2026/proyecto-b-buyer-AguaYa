"use client"

import {Vendor} from '@/lib/external_api_calls/vendors';

export default function VendorInfo({ vendor }: { vendor: Vendor }){
    return (
            <p>Ubicacion : {vendor.address}</p>
    )
}

