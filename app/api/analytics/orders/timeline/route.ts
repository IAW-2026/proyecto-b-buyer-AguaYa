import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const from = request.nextUrl.searchParams.get("from")
        const to = request.nextUrl.searchParams.get("to")
        const status = request.nextUrl.searchParams.get("status")
        const groupBy = request.nextUrl.searchParams.get("group_by") ?? "day"

        const where: Record<string, unknown> = {}
        if (from || to) {
            const createdAt: Record<string, Date> = {}
            if (from) createdAt.gte = new Date(from)
            if (to) createdAt.lte = new Date(to)
            where.created_at = createdAt
        }
        if (status) {
            where.status = status
        }

        const orders = await prisma.order.findMany({
            where,
            select: {
                created_at: true,
                total: true,
                status: true,
            },
            orderBy: { created_at: "asc" },
        })

        const dateFormat = groupBy === "month" ? "month" : groupBy === "week" ? "week" : "day"

        const timelineMap = new Map<string, { count: number; revenue: number }>()

        for (const order of orders) {
            let key: string
            const d = new Date(order.created_at)

            if (dateFormat === "month") {
                key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
            } else if (dateFormat === "week") {
                const startOfYear = new Date(d.getFullYear(), 0, 1)
                const weekNum = Math.ceil(((d.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7)
                key = `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`
            } else {
                key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
            }

            const entry = timelineMap.get(key) ?? { count: 0, revenue: 0 }
            entry.count++
            entry.revenue += order.total
            timelineMap.set(key, entry)
        }

        const timeline = Array.from(timelineMap.entries()).map(([date, data]) => ({
            date,
            ...data,
        }))

        return NextResponse.json({ timeline }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
