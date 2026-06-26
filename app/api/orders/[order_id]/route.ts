import { NextRequest, NextResponse } from "next/server"
import {OrderStatus,setOrderStatus, getOrderById, deleteOrder} from "@/lib/orders"

export async function GET(request: NextRequest, { params }: { params: Promise<{ order_id: string }> }) {
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { order_id } = await params;
        const order = await getOrderById(order_id);
        if (!order) {
            return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });
        }
        return NextResponse.json({ order }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

export async function PATCH(request:NextRequest,{ params }:{ params: Promise<{ order_id: string }> }) {
    const body = await request.json();
    const orderStatus = body.orderStatus as OrderStatus | undefined;
    const statusReason = body.status_reason as string | undefined;
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (orderStatus === undefined || orderStatus === null) {
        return NextResponse.json(
            { error: "no se encuentra el campo de orderStatus" },
            { status: 400 }
        )
    }
    if (!Object.values(OrderStatus).includes(orderStatus)) {
        return NextResponse.json({ error: "El Status enviado es inválido" }, { status: 400 });
    }
    try {
        const { order_id } = await params;
        await setOrderStatus(order_id, orderStatus, statusReason);
        return NextResponse.json({ ok: true }, { status: 200 });
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Orden no encontrada') {
            return NextResponse.json(
                { error: 'Orden no encontrada' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ order_id: string }> }) {
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.BUYER_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { order_id } = await params
        await deleteOrder(order_id)
        return NextResponse.json({ ok: true }, { status: 200 })
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}


