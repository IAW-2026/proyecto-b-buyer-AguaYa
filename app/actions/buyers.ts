
'use server'
import { deleteBuyer } from '@/lib/buyers'
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {prisma} from "@/lib/prisma";
export async function deleteBuyerAction(buyerId: string) {
    await deleteBuyer(buyerId);
}

export async function createUserAction(){
const user = await currentUser();
    console.log("esta aqui")
    if (!user) redirect("/signup");
    const existingBuyer = await prisma.buyer.findUnique({
        where: { user_id: user.id },
    });
    if (!existingBuyer) {
        const buyerUser = await prisma.buyer.create({
            data: {
                user_id: user.id,
                mail: user.emailAddresses[0].emailAddress,
                name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
            },
        });
        if(!buyerUser){
            return new Response("No se pudo crear el perfil de comprador", { status: 500 });
        }
    }
    redirect("/");
}

