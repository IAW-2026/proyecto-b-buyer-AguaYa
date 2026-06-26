import { getOrdersByStatus, OrderStatus } from "@/lib/orders"
import { CartContainer } from "../components/cart/cartContainer";
import { getBuyerByUserId } from "@/lib/buyers";
import { auth } from "@clerk/nextjs/server";
import { ClearCartButton } from '../components/cart/clearCartButton'
import Link from "next/link";

export default async function CartPage() {
  const { userId } = await auth();

  const buyer = await getBuyerByUserId(userId!);
  if (!buyer) throw new Error("no esta asociado un buyer al usuario");

  const orders = await getOrdersByStatus(buyer.buyer_id, OrderStatus.PENDING);

  return (
    <main>
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex divide-x divide-gray-200">
          <Link href="/" className="flex-1 text-center py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            ← Volver
          </Link>
          <div className="flex-1 flex justify-center items-center">
            <ClearCartButton />
          </div>
        </div>
      </nav>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Mi carrito</h1>
        <CartContainer orders={orders} />
      </div>
    </main>
  );
}