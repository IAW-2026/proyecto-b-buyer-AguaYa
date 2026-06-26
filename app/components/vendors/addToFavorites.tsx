"use client";
import { Star } from "lucide-react";
import { addFavorite, deleteFavoriteAction } from "@/app/actions/favorites";
import { useRouter } from "next/navigation";

type Props = {
  vendorId: string;
  buyerId?: string;
  isFavorite: boolean;
  iconOnly?: boolean;
};

export default function AddToFavorites({ vendorId, buyerId, isFavorite, iconOnly }: Props) {
  const router = useRouter();

  async function handleClick() {
    if (!buyerId) {
      router.push("/signin");
      return;
    }
    if (isFavorite) {
      await deleteFavoriteAction(vendorId, buyerId);
    } else {
      await addFavorite(vendorId, buyerId);
    }
    router.refresh();
  }

  if (iconOnly) {
    return (
      <button
        onClick={handleClick}
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
          isFavorite
            ? "text-yellow-500 hover:text-yellow-600"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <Star size={22} fill={isFavorite ? "currentColor" : "none"} />
      </button>
    );
  }

  if (isFavorite) {
    return <p className="text-sm text-gray-500">Ya en favoritos</p>;
  }

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 text-sm font-medium text-[#4287f5] hover:bg-gray-50 transition-colors cursor-pointer"
    >
      Agregar a favoritos
    </button>
  );
}
