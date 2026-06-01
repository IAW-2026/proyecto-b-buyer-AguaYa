import { Buyer } from '@/generated/prisma/client'
import { BuyerInfo } from './buyerInfo'
import { DeleteBuyerButton } from './deleteBuyerButton'

type Props = {
  buyer: Buyer;
};

export function AdminBuyerCard({ buyer }: Props) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <BuyerInfo buyer={buyer} />
      <DeleteBuyerButton buyerId={buyer.buyer_id} />
    </div>
  );
}