import { OrderItem } from "@/lib/orders";

type Props = {
  item: OrderItem;
};

export function OrderItemCard({ item }: Props) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold">{item.product_name}</p>
        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
      </div>
      <p className="font-semibold">
        Total: ${(item.product_price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
}