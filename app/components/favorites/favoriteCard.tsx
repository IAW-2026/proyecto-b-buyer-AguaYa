// components/favorites/FavoriteCard.tsx
import { Vendor } from '@/lib/external_api_calls/vendors'
import VendorCard from '@/app/components/vendors/vendorCard'
import { DeleteFavoriteButton } from './deleteFavoriteButton'

type Props = {
  vendor: Vendor;
  buyerId: string;
};

export function FavoriteCard({ vendor, buyerId }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <VendorCard vendor={vendor} />
      <DeleteFavoriteButton vendorId={vendor.id} buyerId={buyerId} />
    </div>
  );
}