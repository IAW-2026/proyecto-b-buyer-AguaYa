import { NextRequest, NextResponse } from "next/server"
import { getBuyerByUserId } from "@/lib/buyers"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const apiKey = req.headers.get("x-api-key")
  if (apiKey !== process.env.BUYER_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { user_id } = await params
    const buyer = await getBuyerByUserId(user_id)
    if (!buyer) {
      return NextResponse.json(
        { error: "Buyer no encontrado" },
        { status: 404 }
      )
    }
    return NextResponse.json({ buyer_id: buyer.buyer_id, name: buyer.name })
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
