/*
model Product {
  id          String      @id @default(cuid())
  vendorId    String
  name        String
  description String?
  price       Float
  stock       Int         @default(0)
  image       String?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  deletedAt   DateTime?   // Soft delete: producto marcado como eliminado, pero datos preservados

  vendor      Vendor      @relation(fields: [vendorId], references: [id])
  orderItems  OrderItem[]
}
*/ 
//mock products solo tengra hasta stock como atributos, y no tendra descripcion ni imagen ni fechas, para simplificar el ejemplo
import { NextResponse,NextRequest } from "next/server";

const mockProducts = [ 
    {id:"1", vendorId:"1", name:"Producto1", price:100, stock:10},
    {id:"2", vendorId:"1", name:"Producto2", price:200, stock:20},
    {id:"3", vendorId:"2", name:"Producto3", price:300, stock:30},
    {id:"4", vendorId:"2", name:"Producto4", price:400, stock:40},
    {id:"5", vendorId:"3", name:"Producto5", price:500, stock:50}
]

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const priceNumber = price ? parseFloat(price) : null;
    const stock = searchParams.get('stock');
    const stockNumber = stock ? parseInt(stock) : null;
    let result = [...mockProducts];
    if (id) {
        result = result.filter(p => p.id === id)
    }
    if (name) {
        result = result.filter(p => p.name == name)
    }
    if (price) {
        result = result.filter(p => p.price == priceNumber)
    }
    if (stock) {
        result = result.filter(p => p.stock == stockNumber)
    }
    return NextResponse.json(result);
}