import { setOrderStatus,OrderStatus } from "../orders";
export async function confirmPayment(orderId : string ){
    setOrderStatus(orderId,OrderStatus.PAID);
}