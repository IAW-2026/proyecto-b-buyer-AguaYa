import { NextRequest, NextResponse } from "next/server"
import { getAddressesByBuyerId, createAddress } from "@/lib/address"

export async function GET(request: NextRequest, { params }: { params: Promise<{ buyer_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { buyer_id } = await params
        const addresses = await getAddressesByBuyerId(buyer_id)
        return NextResponse.json({ addresses }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ buyer_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { buyer_id } = await params
        const body = await request.json()
        const { street, city, zip } = body
        if (!street || !city || !zip) {
            return NextResponse.json(
                { error: "street, city y zip son requeridos" },
                { status: 400 }
            )
        }
        const address = await createAddress(buyer_id, street, city, zip)
        return NextResponse.json({ address }, { status: 201 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
