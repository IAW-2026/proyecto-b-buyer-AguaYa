import { NextRequest, NextResponse } from "next/server"
import { getFavoritesByBuyerId, addFavorite, deleteFavorite, getAllFavorites } from "@/lib/favorites"

export async function GET(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const buyerId = req.nextUrl.searchParams.get('buyer_id')
        if (buyerId) {
            const favorites = await getFavoritesByBuyerId(buyerId)
            return NextResponse.json({ favorites }, { status: 200 })
        }
        const favorites = await getAllFavorites()
        return NextResponse.json({ favorites }, { status: 200 })
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
        const { buyer_id, vendor_id } = body
        if (!buyer_id || !vendor_id) {
            return NextResponse.json(
                { error: "buyer_id y vendor_id son requeridos" },
                { status: 400 }
            )
        }
        const favorite = await addFavorite(buyer_id, vendor_id)
        return NextResponse.json({ favorite }, { status: 201 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const buyerId = req.nextUrl.searchParams.get('buyer_id')
        const vendorId = req.nextUrl.searchParams.get('vendor_id')
        if (!buyerId || !vendorId) {
            return NextResponse.json(
                { error: "buyer_id y vendor_id son requeridos como query params" },
                { status: 400 }
            )
        }
        await deleteFavorite(buyerId, vendorId)
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
