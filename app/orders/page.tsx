import { getConfirmedOrders, getOrdersByBuyerId } from "@/lib/orders";
import { getBuyerByUserId } from "@/lib/buyers";
import { auth } from "@clerk/nextjs/server";
import { OrdersContainer } from "../components/orders/ordersContainer";
import Link from "next/link";
export default async function OrdersPage() {
  const { userId } = await auth();

  const buyer = await getBuyerByUserId(userId!);
  if (!buyer) throw new Error("no esta asociado un buyer al usuario");

  const orders = await getOrdersByBuyerId(buyer.buyer_id);

  return (
    <div>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex divide-x divide-gray-200">
          <Link href="/" className="flex-1 text-center py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            ← Volver
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Mis pedidos</h1>
        <OrdersContainer orders={orders} />
      </main>
    </div>
  );
}