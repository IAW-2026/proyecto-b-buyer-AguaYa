import { NextResponse, NextRequest } from "next/server";
const mockFAQData = [
  {
    id: "1",
    question: "¿Cómo realzo un pedido?",
    answer: "Para realizar un pedido, debe ingresar a nuestro sitio web y seleccionar los productos que desea comprar."
  },
  {
    id: "2",
    question: "¿Cuáles son las opciones de pago disponibles?",
    answer: "Ofrecemos varias opciones de pago, incluyendo tarjeta de crédito, transferencia bancaria y efectivo al recibir."
  },
  {
    id: "3",
    question: "¿Qué tiempo tarda en llegar mi pedido?",
    answer: "El tiempo de entrega varía según la ubicación y el método de envío seleccionado. En promedio, los pedidos llegan en 3-5 días hábiles."
  }
];

export async function GET(request: NextRequest) {
  return NextResponse.json(mockFAQData);
}


