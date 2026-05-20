import { NextRequest, NextResponse } from "next/server"
import {OrderStatus,setOrderStatus} from "@/lib/orders"

export async function PATCH(request:NextRequest,{ params }:{ params: { order_id: string } }) {
    const body = await request.json();
    if(!body.status){
        return NextResponse.json(
            { error: "no se encuentra el campo de status" },
            { status: 400 }
        )
    }
    if (!Object.values(OrderStatus).includes(body.orderStatus)) {
        return Response.json({ error: "El Status enviado es inválido" }, { status: 400 });
    }
    try {
        const orderStatus = body.orderStatus as OrderStatus;
        await setOrderStatus(params.order_id,orderStatus);
        return NextResponse.json({ ok: true }, { status: 200 });
    }
    catch (error){
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        ) 
    }
}

