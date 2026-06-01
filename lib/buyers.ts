import {prisma} from './prisma'
import { Buyer } from "@/generated/prisma/client";

export async function getBuyerByUserId(userId: string): Promise<Buyer | null> {
    return prisma.buyer.findUnique({
        where: { user_id: userId },
    });
}