import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { OrderStatus } from "@/generated/prisma/client"

export async function GET(request: NextRequest) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const [totalBuyers, activeBuyers, ordersByStatus, revenueResult] = await Promise.all([
            prisma.buyer.count(),
            prisma.buyer.count({ where: { is_active: true } }),
            prisma.order.groupBy({ by: ["status"], _count: true }),
            prisma.order.aggregate({
                _sum: { total: true },
                where: {
                    status: {
                        in: [OrderStatus.PAID, OrderStatus.DELIVERED, OrderStatus.IN_DELIVERY, OrderStatus.READY],
                    },
                },
            }),
        ])

        const byStatus: Record<string, number> = {}
        for (const o of ordersByStatus) {
            byStatus[o.status] = o._count
        }

        return NextResponse.json({
            buyers: {
                total: totalBuyers,
                active: activeBuyers,
                inactive: totalBuyers - activeBuyers,
            },
            orders: {
                by_status: byStatus,
                total: ordersByStatus.reduce((sum, o) => sum + o._count, 0),
            },
            revenue: revenueResult._sum.total ?? 0,
        }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
