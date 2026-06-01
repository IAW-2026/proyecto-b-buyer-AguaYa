import { Buyer } from '@/generated/prisma/client'

type Props = {
  buyer: Buyer;
};

export function BuyerInfo({ buyer }: Props) {
  return (
    <div>
      <p className="font-medium">{buyer.name}</p>
      <p className="text-sm text-gray-500">{buyer.mail}</p>
      <p className="text-sm text-gray-500">{buyer.phone_numbers}</p>
    </div>
  );
}