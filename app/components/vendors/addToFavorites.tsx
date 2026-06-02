"use client";
import { addFavorite } from "@/app/actions/favorites";
import { useRouter } from "next/navigation";

type Props = {
  vendorId: string;
  buyerId?: string;
  isFavorite: boolean;
};

export default function AddToFavorites({ vendorId, buyerId, isFavorite }: Props) {
  const router = useRouter();

  async function handleClick() {
    await addFavorite(vendorId, buyerId);
    router.refresh();
  }

  if (isFavorite) {
    return <p className="text-sm text-gray-500">Ya en favoritos</p>;
  }

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 text-sm font-medium text-[#4287f5] hover:bg-gray-50 transition-colors"
    >
      Agregar a favoritos 
    </button>
  );
}