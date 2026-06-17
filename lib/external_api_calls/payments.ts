import { getOrderById } from "../orders";
import {getAddressById} from "../address";
export async function confirmPayment(orderId : string ){
  const order = await getOrderById(orderId);
  if (!order) {
    throw new Error('Orden no encontrada');
  }
  let address = null;
  if(order.address_id){
    address = await getAddressById(order.address_id);
  }
  try {
      const response = await fetch('https://proyecto-b-payments-agua-ya.vercel.app/api/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_INTERNAL_API_KEY || '',
            },
            body: JSON.stringify({
                orderId: orderId,
                // buyer: {
                //     id: "buyer-id-de-tu-app",
                //     name: "Nombre del comprador",
                //     email: "comprador@email.com",
                //     address: "Avenida Siempre Viva 123 depto 12"
                // },
                // seller: {
                //     id: "seller-id-de-tu-app",
                //     name: "Nombre del vendedor"
                // },
                // amount: 2000,
                // items: [
                //     {
                //         id: "product-id",
                //         name: "Nombre del producto",
                //         imageUrl: "https://...",
                //         quantity: 2,
                //         unitPrice: 1000
                //     }
                // ]
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to confirm payment: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error confirming payment:', error);
        throw error;
    }
}

/* 
POST /api/payments

Header:


x-api-key: <INTERNAL_API_KEY>
Body:


{
  "orderId": "tu-order-id-interno",
  "buyer": {
    "id": "buyer-id-de-tu-app",
    "name": "Nombre del comprador",
    "email": "comprador@email.com",
    "address": "Avenida Siempre Viva 123 depto 12"
  },
  "seller": {
    "id": "seller-id-de-tu-app",
    "name": "Nombre del vendedor"
  },
  "amount": 2000,
  "items": [
    {
      "id": "product-id",
      "name": "Nombre del producto",
      "imageUrl": "https://...",
      "quantity": 2,
      "unitPrice": 1000
    }
  ]
}

INTERNAL_API_KEY=un-secreto-cualquiera-para-dev
*/