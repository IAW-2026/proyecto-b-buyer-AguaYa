"use client"

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export function UserMenuDropdown() {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const isAdmin = user?.publicMetadata?.role === 'admin'

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100 text-xl leading-none cursor-pointer"
      >
        ☰
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 min-w-40 z-50">
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            🛒 Carrito
          </Link>
          <Link
            href="/orders"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            📋 Pedidos
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
            >
              ⚙️ Admin
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
