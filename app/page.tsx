import { auth } from '@clerk/nextjs/server';
import { clerkClient} from "@clerk/nextjs/server";
import { createBuyerIfNotExists } from "@/lib/buyers";
import { getProducts, Product } from "@/lib/external_api_calls/products";
import ProductCard from "@/app/components/products/productCard";

export default async function Home() {
  const { userId } = await auth();
  const products = await getProducts();
  if (userId) {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    await createBuyerIfNotExists(
      userId,
      user.emailAddresses[0].emailAddress,
      `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
    ) 
  }
  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
