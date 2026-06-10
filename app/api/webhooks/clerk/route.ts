// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { prisma } from '@/lib/prisma'
import { createBuyerWithID} from '@/lib/buyers'

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req)
    console.log('Evento recibido:', event.type)

    if (event.type === 'user.created') {
      await createBuyerWithID(event.data.id)
    }

    if (event.type === 'session.created') {
      await createBuyerWithID(event.data.user_id)
    }

    return new Response('OK', { status: 200 })
  } catch (err) {
    console.error('Error en webhook:', err)
    return new Response('Webhook inválido', { status: 400 })
  }
}
