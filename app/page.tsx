import { auth } from '@clerk/nextjs/server';
import { clerkClient} from "@clerk/nextjs/server";
import { createBuyerIfNotExists } from "@/lib/buyers";
import { getProducts } from "@/lib/external_api_calls/products";
import { ProductCatalog } from "@/app/components/products/productCatalog";

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
        <ProductCatalog products={products} />
      </div>
    </div>
  );
}
