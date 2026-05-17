import { NextRequest, NextResponse } from "next/server"
import {OrderStatus,setOrderStatus} from "@/lib/orders"

export async function POST(request: NextRequest) {
    const body = await request.json();
    if(!body){
        return NextResponse.json(
        { error: "la informacion no fue recibida" },
        { status: 400 }
        )
    }
    try {
        setOrderStatus(body.order_id,OrderStatus.CONFIRMED);
    } catch (error) {
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}