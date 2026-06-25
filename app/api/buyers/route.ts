import { NextRequest, NextResponse } from "next/server"
import { getAllBuyers, getBuyerByUserId, createBuyerIfNotExists } from "@/lib/buyers"

export async function GET(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const buyers = await getAllBuyers()
        return NextResponse.json({ buyers }, { status: 200 })
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
        const { user_id, mail, name } = body
        if (!user_id || !mail || !name) {
            return NextResponse.json(
                { error: "user_id, mail y name son requeridos" },
                { status: 400 }
            )
        }
        await createBuyerIfNotExists(user_id, mail, name)
        const buyer = await getBuyerByUserId(user_id)
        return NextResponse.json({ buyer }, { status: 201 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
