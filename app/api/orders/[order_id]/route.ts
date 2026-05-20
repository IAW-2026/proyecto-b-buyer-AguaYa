import { NextRequest, NextResponse } from "next/server"
import {OrderStatus,setOrderStatus} from "@/lib/orders"

export async function PATCH(request:NextRequest,{ params }:{ params: Promise<{ order_id: string }> }) {
    const body = await request.json();
    const orderStatus = body.orderStatus as OrderStatus | undefined;

    if (!orderStatus) {
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
        await setOrderStatus(order_id, orderStatus);
        return NextResponse.json({ ok: true }, { status: 200 });
    }
    catch (error){
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        ) 
    }
}

