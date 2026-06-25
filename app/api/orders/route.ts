import { NextRequest, NextResponse } from "next/server"
import { getAllOrders, getOrdersByBuyerId, createOrder } from "@/lib/orders"

export async function GET(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const buyerId = req.nextUrl.searchParams.get('buyer_id')
        if (buyerId) {
            const orders = await getOrdersByBuyerId(buyerId)
            return NextResponse.json({ orders }, { status: 200 })
        }
        const orders = await getAllOrders()
        return NextResponse.json({ orders }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const body = await req.json()
        const { vendor_id, buyer_id, buyer_user_id, total, address_id, items } = body
        if (!vendor_id || !buyer_id || !buyer_user_id || total === undefined) {
            return NextResponse.json(
                { error: "vendor_id, buyer_id, buyer_user_id y total son requeridos" },
                { status: 400 }
            )
        }
        const order = await createOrder({ vendor_id, buyer_id, buyer_user_id, total, address_id, items })
        return NextResponse.json({ order }, { status: 201 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
