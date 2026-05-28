/* 
model Resena {
  id_resena Int      @id @default(autoincrement())
  id_pedido     String   // Referencia al pedido original en SellerApp 
  id_usuario    String   // El ID del Comprador (sub de Clerk) 
  id_vendedor   String   // El ID del Vendedor calificado 
  estrellas     Int      // Calificación del 1 al 5 
  comentario    String?  @db.Text
  foto          String?  // URL de la imagen (te conviene agregarlo por el Entregable 1.4) 
  fecha         DateTime @default(now())
}

Para simplificar el ejemplo, el mock de reviews solo tendrá id_resena, id_usuario, id_vendedor y estrellas  como atributos
*/
import { NextResponse, NextRequest } from "next/server";

const mockReviews = [
  { review_id: "1", user_id: "user1", vendor_id: "vendor1", rating: 5 },
  { review_id: "2", user_id: "user2", vendor_id: "vendor1", rating: 4 },
  { review_id: "3", user_id: "user3", vendor_id: "vendor2", rating: 5 }
];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const review_id = searchParams.get('review_id');
  const user_id = searchParams.get('user_id');
  const vendor_id = searchParams.get('vendor_id');
  const rating = searchParams.get('rating');
  const ratingNumber = rating ? parseInt(rating) : null;
  let result = [...mockReviews];
  if (review_id) {
    result = result.filter(r => r.review_id === review_id);
  }
  if (user_id) {
    result = result.filter(r => r.user_id === user_id);
  }
  if (vendor_id) {
    result = result.filter(r => r.vendor_id === vendor_id);
  }
  if (ratingNumber !== null) {
    result = result.filter(r => r.rating === ratingNumber);
  }
  return NextResponse.json(result);
}