import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { OrderStatus } from "@/generated/prisma/client"

export async function GET(request: NextRequest) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const from = request.nextUrl.searchParams.get("from")
        const to = request.nextUrl.searchParams.get("to")

        const where: Record<string, unknown> = {
            status: {
                in: [OrderStatus.PAID, OrderStatus.DELIVERED, OrderStatus.IN_DELIVERY, OrderStatus.READY],
            },
        }
        if (from || to) {
            const createdAt: Record<string, Date> = {}
            if (from) createdAt.gte = new Date(from)
            if (to) createdAt.lte = new Date(to)
            where.created_at = createdAt
        }

        const [totalRevenue, byVendor, totalOrders] = await Promise.all([
            prisma.order.aggregate({
                _sum: { total: true },
                where,
            }),
            prisma.order.groupBy({
                by: ["vendor_id"],
                where,
                _sum: { total: true },
                _count: true,
                orderBy: { _sum: { total: "desc" } },
            }),
            prisma.order.count({ where }),
        ])

        return NextResponse.json({
            total_revenue: totalRevenue._sum.total ?? 0,
            total_orders: totalOrders,
            by_vendor: byVendor.map((v) => ({
                vendor_id: v.vendor_id,
                revenue: v._sum.total ?? 0,
                orders: v._count,
            })),
        }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
