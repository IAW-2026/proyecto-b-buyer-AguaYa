import { NextRequest, NextResponse } from "next/server"
import { getClaimsByOrderId, createClaim } from "@/lib/claims"

export async function GET(req: NextRequest) {
    const orderId = req.nextUrl.searchParams.get('order_id')
    const apiKey = req.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    if (!orderId) {
        return NextResponse.json(
            { error: "order_id es requerido" },
            { status: 400 }
        )
    }
    try {
        const claims = await getClaimsByOrderId(orderId)
        return NextResponse.json({ claims }, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const body = await req.json()
        const { order_id, reason, photo } = body
        if (!order_id || !reason || !photo) {
            return NextResponse.json(
                { error: "order_id, reason y photo son requeridos" },
                { status: 400 }
            )
        }
        const claim = await createClaim(order_id, reason, photo)
        return NextResponse.json({ claim }, { status: 201 })
    } catch {
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}
