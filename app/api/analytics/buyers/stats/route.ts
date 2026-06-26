import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const [total, active, inactive, allBuyers] = await Promise.all([
            prisma.buyer.count(),
            prisma.buyer.count({ where: { is_active: true } }),
            prisma.buyer.count({ where: { is_active: false } }),
            prisma.buyer.findMany({
                select: {
                    buyer_id: true,
                    user_id: true,
                    mail: true,
                    name: true,
                    is_active: true,
                    _count: {
                        select: {
                            favorites: true,
                            addresses: true,
                        },
                    },
                },
                orderBy: { buyer_id: "asc" },
            }),
        ])

        return NextResponse.json({
            totals: { total, active, inactive },
            buyers: allBuyers,
        }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
