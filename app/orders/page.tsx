import { getConfirmedOrders } from "@/lib/orders";
import { getBuyerByUserId } from "@/lib/buyers";
import { auth } from "@clerk/nextjs/server";
import { OrdersContainer } from "../components/orders/ordersContainer";

export default async function OrdersPage() {
  const { userId } = await auth();

  const buyer = await getBuyerByUserId(userId!);
    if (!buyer) throw new Error("no esta asociado un buyer al usuario");

  const orders = await getConfirmedOrders(buyer.buyer_id);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mis pedidos</h1>
      <OrdersContainer orders={orders} />
    </main>
  );
}