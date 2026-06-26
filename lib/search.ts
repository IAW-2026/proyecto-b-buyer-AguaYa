import { getProducts,Product } from "@/lib/external_api_calls/products";
import { getVendors,Vendor } from "@/lib/external_api_calls/vendors";


export type SearchResults = {
  products: Product[];
  vendors: Vendor[];
};

export async function search(query: string): Promise<SearchResults> {
  const [products, vendors] = await Promise.all([getProducts(), getVendors()]);

  const q = query.toLowerCase();

  return {
    products: products.filter((p) => p.name.toLowerCase().includes(q)),
    vendors: vendors.filter((v) => v.name.toLowerCase().includes(q) || v.address.toLowerCase().includes(q)),
  };
}