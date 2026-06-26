"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Buyer, Address } from "@/generated/prisma/client"
import { updateBuyerProfileAction, deleteAddressAction } from "@/app/actions/settings"
import { createAddressAction } from "@/app/actions/address"

type Props = {
  buyer: Buyer
  addresses: Address[]
}

export function SettingsForm({ buyer, addresses }: Props) {
  const router = useRouter()

  const [name, setName] = useState(buyer.name)
  const [phone, setPhone] = useState(buyer.phone_numbers ?? "")

  const [saving, setSaving] = useState(false)
  const [addingAddress, setAddingAddress] = useState(false)
  const [newStreet, setNewStreet] = useState("")
  const [newCity, setNewCity] = useState("")
  const [newZip, setNewZip] = useState("")

  async function handleSaveProfile() {
    setSaving(true)
    try {
      await updateBuyerProfileAction(name, phone)
      router.refresh()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  async function handleAddAddress() {
    if (!newStreet.trim() || !newCity.trim() || !newZip.trim()) return
    setAddingAddress(true)
    try {
      await createAddressAction(newStreet.trim(), newCity.trim(), newZip.trim())
      setNewStreet("")
      setNewCity("")
      setNewZip("")
      router.refresh()
    } catch (e) {
      console.error(e)
    } finally {
      setAddingAddress(false)
    }
  }

  async function handleDeleteAddress(addressId: string) {
    try {
      await deleteAddressAction(addressId)
      router.refresh()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="space-y-8">
      {/* Perfil */}
      <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Perfil</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4287f5] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+54 9 11 1234 5678"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4287f5] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
          <p className="px-4 py-2 text-gray-400 bg-gray-50 rounded-lg">{buyer.mail}</p>
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="bg-[#4287f5] text-white rounded-lg font-medium px-6 py-2 hover:bg-blue-600 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </section>

      {/* Direcciones */}
      <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Direcciones</h2>

        {addresses.length === 0 ? (
          <p className="text-gray-400 text-sm">No tenés direcciones registradas.</p>
        ) : (
          <ul className="space-y-2">
            {addresses.map((addr) => (
              <li key={addr.id} className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">
                  {addr.street}, {addr.city} — CP: {addr.zip}
                </span>
                <button
                  onClick={() => handleDeleteAddress(addr.id)}
                  className="text-red-500 hover:text-red-700 text-sm cursor-pointer flex-shrink-0"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="border-t border-gray-200 pt-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Agregar dirección</h3>
          <input
            type="text"
            value={newStreet}
            onChange={(e) => setNewStreet(e.target.value)}
            placeholder="Calle y número"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4287f5] focus:border-transparent"
          />
          <div className="flex gap-3">
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Ciudad"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4287f5] focus:border-transparent"
            />
            <input
              type="text"
              value={newZip}
              onChange={(e) => setNewZip(e.target.value)}
              placeholder="CP"
              className="w-28 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4287f5] focus:border-transparent"
            />
          </div>
          <button
            onClick={handleAddAddress}
            disabled={addingAddress || !newStreet.trim() || !newCity.trim() || !newZip.trim()}
            className="bg-gray-800 text-white rounded-lg font-medium px-6 py-2 hover:bg-gray-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {addingAddress ? "Agregando..." : "Agregar dirección"}
          </button>
        </div>
      </section>
    </div>
  )
}
