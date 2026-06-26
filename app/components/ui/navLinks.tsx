"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Productos" },
  { href: "/vendors", label: "Vendedores" },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-6">
      {links.map(({ href, label }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`relative text-sm sm:text-base font-medium transition-colors pb-1 ${
              isActive
                ? "text-[#4287f5]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4287f5] rounded-full" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
