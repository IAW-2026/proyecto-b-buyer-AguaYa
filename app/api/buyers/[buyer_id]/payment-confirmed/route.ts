/*
Endpoint	HTTP POST /api/buyers/:buyer_id/payment-confirmed
Request*	El endpoint recibe los datos asociados a un pago exitoso procesado (order_id, buyer_id, transaction_id, monto).
Response	BuyerApp responde con la confirmación de recepción para actualizar la UI del cliente.
Comunicación	PaymentApp notifica a → Compradores (BuyerApp)

*/

import { NextRequest, NextResponse } from "next/server"

