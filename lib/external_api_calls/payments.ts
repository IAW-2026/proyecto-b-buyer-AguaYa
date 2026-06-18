import { getOrderById , Order, OrderStatus, OrderItem} from "../orders";
import {getAddressById} from "../address";
import {getBuyerById} from "../buyers";
import {Vendor,getVendorById} from "./vendors";
export async function confirmPayment(orderId : string ){
  const order = await getOrderById(orderId);
  if (!order) {
    throw new Error('Orden no encontrada');
  }
  let address = null;
  if(order.address_id){
    address = await getAddressById(order.address_id);
  }
  let buyer = null;
  if(order.buyer_id){
    buyer = await getBuyerById(order.buyer_id);
  }
  let vendor = null;
  if(order.vendor_id){
    vendor = await getVendorById(order.vendor_id);
  }

  try {
      const response = await fetch('https://proyecto-b-payments-agua-ya.vercel.app/api/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.PAYMENT_API_KEY || '',
            },
            body: JSON.stringify({
                orderId: orderId,
                buyer: {
                    id: buyer?.buyer_id,
                    name: buyer?.name,
                    email: buyer?.mail,
                    address: address?.street + ' ' + address?.city + ' ' + address?.zip
                },
                vendor: {
                    id: vendor?.id,
                    name: vendor?.name
                },
                amount: order.total,
                items: order.items.map((item) => ({
                  id: item.product_id,
                  name: item.product_name,
                  quantity: item.quantity,
                  unitPrice: item.product_price,
                })),
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

