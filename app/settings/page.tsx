import { auth } from "@clerk/nextjs/server"
import { getBuyerByUserId } from "@/lib/buyers"
import { getAddressesByBuyerId } from "@/lib/address"
import { SettingsForm } from "@/app/components/settings/settingsForm"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const { userId } = await auth()
  if (!userId) redirect("/signin")

  const buyer = await getBuyerByUserId(userId)
  if (!buyer) redirect("/")

  const addresses = await getAddressesByBuyerId(buyer.buyer_id)

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6">⚙️ Configuración</h1>
        <SettingsForm buyer={buyer} addresses={addresses} />
      </div>
    </div>
  )
}
