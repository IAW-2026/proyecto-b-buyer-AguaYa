import { NextRequest, NextResponse } from "next/server"
import { deleteAdmin } from "@/lib/admins"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ admin_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { admin_id } = await params
        await deleteAdmin(admin_id)
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
