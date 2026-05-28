/*
model Payment {
  id              String        @id @default(cuid())
  orderId         String
  buyerId         String
  sellerId        String
  amount          Int
  status          PaymentStatus
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  mpPreferenceId String?
  mpPaymentId     String?
  mpStatus        String?
  mpPaymentMethod String?
  mpPaymentDate   DateTime?
  invoice         Invoice?
}
*/

//Por simplicidad, el mock de payments solo tendrá id, orderId, buyerId, sellerId, amount y status como atributos
import { NextResponse, NextRequest } from "next/server";    

const mockPayments = [
    {id:"1", orderId:"order1", buyerId:"buyer1", sellerId:"seller1", amount:100, status:"completed"},
    {id:"2", orderId:"order2", buyerId:"buyer2", sellerId:"seller2", amount:200, status:"pending"},
    {id:"3", orderId:"order3", buyerId:"buyer3", sellerId:"seller3", amount:300, status:"failed"}
]

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get('id');
    const orderId = searchParams.get('orderId');
    const buyerId = searchParams.get('buyerId');
    const sellerId = searchParams.get('sellerId');
    const amount = searchParams.get('amount');
    const amountNumber = amount ? parseInt(amount) : null;
    const status = searchParams.get('status');
    let result = [...mockPayments]; 
    if (id) {
        result = result.filter(p => p.id === id)
    }
    if (orderId) {
        result = result.filter(p => p.orderId === orderId)
    }
    if (buyerId) {
        result = result.filter(p => p.buyerId === buyerId)
    }
    if (sellerId) {
        result = result.filter(p => p.sellerId === sellerId)
    }
    if (amountNumber !== null) {
        result = result.filter(p => p.amount === amountNumber)
    }
    if (status) {
        result = result.filter(p => p.status === status)
    }
    return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { orderId, buyerId, sellerId, amount, status } = body;
    const newPayment = {
        id: (mockPayments.length + 1).toString(),
        orderId,
        buyerId,
        sellerId,
        amount,
        status
    };
    mockPayments.push(newPayment);
    return NextResponse.json(newPayment);
}
