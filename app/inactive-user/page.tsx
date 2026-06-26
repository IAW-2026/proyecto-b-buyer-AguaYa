import Link from "next/link";

export default function InactiveUserPage() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center gap-6 p-6">
      <div className="max-w-md text-center space-y-4">
        <div className="text-6xl">🚫</div>
        <h1 className="text-2xl font-bold text-gray-800">
          Cuenta inactiva
        </h1>
        <p className="text-gray-600">
          Tu cuenta no está activa. Contactate con soporte para más información.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#4287f5] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
