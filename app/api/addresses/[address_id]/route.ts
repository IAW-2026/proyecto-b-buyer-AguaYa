import { NextRequest, NextResponse } from "next/server"
import { getAddressById, updateAddress, deleteAddress } from "@/lib/address"

export async function GET(request: NextRequest, { params }: { params: Promise<{ address_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { address_id } = await params
        const address = await getAddressById(address_id)
        if (!address) {
            return NextResponse.json({ error: "Dirección no encontrada" }, { status: 404 })
        }
        return NextResponse.json({ address }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ address_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { address_id } = await params
        const body = await request.json()
        const address = await updateAddress(address_id, body)
        return NextResponse.json({ address }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ address_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { address_id } = await params
        await deleteAddress(address_id)
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
