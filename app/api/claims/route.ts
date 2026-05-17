import { NextRequest, NextResponse } from "next/server"
import { getClaimsByOrderId } from "@/lib/claims"

/*
DEVUELVE LOS  CLAIMS ASOCIADOS AL ORDER ID

*/ 


export async function GET(req:NextRequest){

    const orderIds = req.nextUrl.searchParams.get('order_id');

    if (!orderIds) {
        return NextResponse.json(
            { error: "order ids no fueron ingresados" },
            { status: 400 }
        )
    }

    if (isNaN(parseInt(orderIds, 10))) {
        return NextResponse.json(
            { error: "order_ids debe ser un número" },
            { status: 400 }
        )
    }

    try {
        const claims = await getClaimsByOrderId(orderIds)
        if (!claims || claims.length === 0) {
            return NextResponse.json(
                { error: "Claims no encontrados" },
                { status: 404 }
            )
        }
        return NextResponse.json(claims)
    } catch (error) {
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }

}

