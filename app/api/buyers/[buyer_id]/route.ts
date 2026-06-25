import { NextRequest, NextResponse } from "next/server"
import { getBuyerById, updateBuyer, deleteBuyer } from "@/lib/buyers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ buyer_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { buyer_id } = await params
        const buyer = await getBuyerById(buyer_id)
        if (!buyer) {
            return NextResponse.json({ error: "Buyer no encontrado" }, { status: 404 })
        }
        return NextResponse.json({ buyer }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ buyer_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { buyer_id } = await params
        const body = await request.json()
        const buyer = await updateBuyer(buyer_id, body)
        return NextResponse.json({ buyer }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ buyer_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { buyer_id } = await params
        await deleteBuyer(buyer_id)
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
