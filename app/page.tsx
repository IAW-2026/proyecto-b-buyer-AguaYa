import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4287f5] focus:border-transparent"
        />
      </div>
    </div>
  );
}
