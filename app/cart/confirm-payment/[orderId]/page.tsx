import { auth } from "@clerk/nextjs/server";
import { getOrderById } from "@/lib/orders";
import { getBuyerByUserId } from "@/lib/buyers";
import { getAddressesByBuyerId } from "@/lib/address";
import { notFound } from "next/navigation";
import { ConfirmPaymentForm } from "@/app/components/cart/confirmPaymentForm";
import Link from "next/link";

type Props = {
  params: Promise<{ orderId: string }>;
};

export default async function ConfirmPaymentPage({ params }: Props) {
  const { orderId } = await params;
  const { userId } = await auth();
  if (!userId) notFound();

  const buyer = await getBuyerByUserId(userId);
  if (!buyer) notFound();

  const order = await getOrderById(orderId);
  if (!order || order.buyer_id !== buyer.buyer_id) notFound(); //evitamos que se acceda a un confirm payment que no le corresponde a ese usuario

  const addresses = await getAddressesByBuyerId(buyer.buyer_id);

  return (
    <main>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex divide-x divide-gray-200">
          <Link
            href="/cart"
            className="flex-1 text-center py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Volver al carrito
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Confirmar pedido</h1>
        <ConfirmPaymentForm
          order={order}
          addresses={addresses}
          buyerId={buyer.buyer_id}
        />
      </div>
    </main>
  );
}
