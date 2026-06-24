"use client";
import { Order, OrderItem } from "@/lib/orders";
import { Address } from "@/lib/address";
import { OrderInfo } from "../orders/orderInfo";
import { useState } from "react";
import { createAddressAction, submitAddressAndPayAction } from "@/app/actions/address";

type Props = {
  order: Order & { items: OrderItem[] };
  addresses: Address[];
  buyerId: string;
};

export function ConfirmPaymentForm({ order, addresses: initialAddresses, buyerId }: Props) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    order.address_id ?? ""
  );
  const [showNewForm, setShowNewForm] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newZip, setNewZip] = useState("");

  async function handleCreateAddress() {
    if (!newStreet.trim() || !newCity.trim() || !newZip.trim()) return;
    setLoading(true);
    try {
      const newAddress = await createAddressAction(newStreet, newCity, newZip);
      setAddresses((prev) => [...prev, newAddress]);
      setSelectedAddressId(newAddress.id);
      setShowNewForm(false);
      setNewStreet("");
      setNewCity("");
      setNewZip("");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm() {
    if (!selectedAddressId) return;
    setLoading(true);
    try {
      const result = await submitAddressAndPayAction(order.order_id, selectedAddressId);
      if (result?.checkoutUrl) {
        setCheckoutUrl(result.checkoutUrl);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (checkoutUrl) {
    return (
      <div className="flex flex-col gap-4">
        <OrderInfo order={order} items={order.items} />
        <p className="text-green-600 font-medium">¡Pedido confirmado!</p>
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-80 text-center"
        >
          Ir a checkout
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <OrderInfo order={order} items={order.items} />

      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Dirección de entrega</h2>

        {addresses.length === 0 && !showNewForm && (
          <p className="text-gray-500 mb-3">
            No tenés direcciones guardadas. Agregá una nueva.
          </p>
        )}

        <div className="flex flex-col gap-2">
          {addresses.map((addr) => (
            <label
              key={addr.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedAddressId === addr.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="address"
                value={addr.id}
                checked={selectedAddressId === addr.id}
                onChange={() => setSelectedAddressId(addr.id)}
                className="accent-blue-500"
              />
              <span className="text-sm">
                {addr.street}, {addr.city} — CP: {addr.zip}
              </span>
            </label>
          ))}
        </div>

        {!showNewForm && (
          <button
            onClick={() => setShowNewForm(true)}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            + Agregar nueva dirección
          </button>
        )}

        {showNewForm && (
          <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg flex flex-col gap-3">
            <input
              type="text"
              placeholder="Calle y número"
              value={newStreet}
              onChange={(e) => setNewStreet(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ciudad"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Código postal"
                value={newZip}
                onChange={(e) => setNewZip(e.target.value)}
                className="w-36 border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateAddress}
                disabled={loading || !newStreet.trim() || !newCity.trim() || !newZip.trim()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:opacity-80 disabled:opacity-50"
              >
                {loading ? "Guardando..." : "Guardar dirección"}
              </button>
              <button
                onClick={() => {
                  setShowNewForm(false);
                  setNewStreet("");
                  setNewCity("");
                  setNewZip("");
                }}
                className="text-gray-500 px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleConfirm}
          disabled={loading || !selectedAddressId}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Confirmar pago"}
        </button>
      </div>
    </div>
  );
}
