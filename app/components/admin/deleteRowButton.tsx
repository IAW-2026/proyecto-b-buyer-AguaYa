"use client"
import { useRouter } from "next/navigation"

export function DeleteRowButton({ action, label = "🗑️" }: {
  action: () => Promise<unknown>
  label?: string
}) {
  const router = useRouter()
  return (
    <button onClick={async () => { await action(); router.refresh() }}
      className="text-red-500 hover:text-red-700 text-sm cursor-pointer">
      {label}
    </button>
  )
}
