import {Vendor} from './vendorCard'

export default function VendorInfo({ vendor }: { vendor: Vendor }){
    return (
            <p>{vendor.address}</p>
    )
}

