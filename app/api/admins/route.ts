import { NextRequest, NextResponse } from "next/server"
import { getAllAdmins, createAdmin } from "@/lib/admins"

export async function GET(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const admins = await getAllAdmins()
        return NextResponse.json({ admins }, { status: 200 })
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
        const { id_usuario, nombre } = body
        if (!id_usuario || !nombre) {
            return NextResponse.json(
                { error: "id_usuario y nombre son requeridos" },
                { status: 400 }
            )
        }
        const admin = await createAdmin(id_usuario, nombre)
        return NextResponse.json({ admin }, { status: 201 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
