
import { getOrdersByStatus,OrderStatus} from "@/lib/orders"
import { CartContainer } from "../components/cart/cartContainer";
import { getBuyerByUserId } from "@/lib/buyers";
import { auth } from "@clerk/nextjs/server";
import { ClearCartButton } from '../components/cart/clearCartButton'

export default async function CartPage() {
  const { userId } = await auth();

  const buyer = await getBuyerByUserId(userId!);
    if (!buyer) throw new Error("no esta asociado un buyer al usuario");

  const orders = await getOrdersByStatus(buyer.buyer_id, OrderStatus.PENDING);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mi carrito</h1>
        <ClearCartButton />
      </div>
      <CartContainer orders={orders} />
    </main>
  );
}