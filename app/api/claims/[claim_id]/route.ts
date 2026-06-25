import { NextRequest, NextResponse } from "next/server"
import { updateClaim, deleteClaim } from "@/lib/claims"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ claim_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { claim_id } = await params
        const body = await request.json()
        const { reason, photo } = body
        const claim = await updateClaim(claim_id, { reason, photo })
        return NextResponse.json({ claim }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ claim_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { claim_id } = await params
        await deleteClaim(claim_id)
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
