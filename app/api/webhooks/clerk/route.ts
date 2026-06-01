// app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent,clerkClient } from "@clerk/nextjs/server";
import authMiddleware  from '@clerk/nextjs'
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) throw new Error("Missing CLERK_WEBHOOK_SECRET");

  // Verificar la firma del webhook
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;
  
  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  // Manejar el evento
  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = event.data;
    console.log(email_addresses[0]);
    const buyerUser = await prisma.buyer.create({
      data: {
        user_id: id,
        mail: email_addresses[0].email_address,
        name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      },
    });
    if(!buyerUser){
      return new Response("No se pudo crear el perfil de comprador", { status: 500 })
    }
  
  }

  return new Response("OK", { status: 200 });
}
/*
model Buyer {
  user_id    String    @unique
  buyer_id String  @id @default(cuid())
  mail  String @unique
  phone_numbers  String? //no  atomico?
  addresses Address[]
  name String
  favorites Favorite[]
} 
*/ 