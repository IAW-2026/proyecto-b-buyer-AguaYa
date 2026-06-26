export type Vendor = {
  id: string
  name: string
  description: string
  address: string
  productCount: number
  imageUrl?: string
}

interface VendorResponse {
  id: string;
  name: string;
  description: string;
  address: string;
  image: string;
  isActive: boolean;
  clerkUserId: string;
  productCount: number
}

interface VendorsListResponse {
  success: boolean;
  vendors: VendorResponse[];
}

interface VendorDetailResponse {
  success: boolean
  vendor: VendorResponse
}

function isValidUrl(url: string | undefined): boolean {
  if (!url) return false;
  try { new URL(url); return true; } catch { return false; }
}

function mapRawVendor(raw: VendorResponse): Vendor {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    address: raw.address,
    productCount: raw.productCount,
    imageUrl: isValidUrl(raw.image) ? raw.image : undefined,
  }
}

export const mockVendors: Vendor[] = [
    {id:"1", name:"AquaSur Distribuciones", description:"Distribuidora de agua en Buenos Aires", address:"Buenos Aires", productCount: 0},
    {id:"2", name:"Manantial Azul", description:"Agua de manantial de calidad", address:"Bahia Blanca", productCount: 5},
    {id:"3", name:"Agua Cristal", description:"Agua cristalina para tu hogar", address:"Buenos Aires", productCount: 0},
    {id:"4", name:"Bidones del Puerto", description:"Bidones retornables en Punta Alta", address:"Punta Alta", productCount: 3},
    {id:"5", name:"Hidrovita", description:"Hidratación saludable para todos", address:"Bahia Blanca", productCount: 0},
    {id:"6", name:"Aguas del Atlántico", description:"Agua del Atlántico en Mar del Plata", address:"Mar del Plata", productCount: 8},
    {id:"7", name:"Fuente Clara", description:"Fuente de agua clara en Rosario", address:"Rosario", productCount: 2},
    {id:"8", name:"AquaVida", description:"Agua de vida en Córdoba", address:"Córdoba", productCount: 0},
    {id:"9", name:"Manantiales Andinos", description:"Manantiales de los Andes mendocinos", address:"Mendoza", productCount: 6},
    {id:"10", name:"Agua Pura Express", description:"Agua pura express en Buenos Aires", address:"Buenos Aires", productCount: 0},
    {id:"11", name:"Bidones del Sur", description:"Bidones del sur argentino", address:"Punta Alta", productCount: 4},
    {id:"12", name:"Distribuidora Oasis", description:"Oasis de hidratación en Bahia Blanca", address:"Bahia Blanca", productCount: 0},
]

export async function getVendors(): Promise<Vendor[]> {
  const res = await fetch( 'https://proyecto-b-seller-agua-ya.vercel.app/api/vendors', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.VENDOR_API_KEY!,
    },
    next: { revalidate: 60 }, 
  });

  if (!res.ok) throw new Error("Error al obtener vendors");

  const data: VendorsListResponse = await res.json();
  return data.vendors.map(mapRawVendor);
}

export async function getVendorById(id: string): Promise<Vendor | null> {
  const res = await fetch(`https://proyecto-b-seller-agua-ya.vercel.app/api/vendors/${encodeURIComponent(id)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.VENDOR_API_KEY!,
    },
    next: { revalidate: 60 },
  })

  if (res.status === 404) return null
  if (!res.ok) throw new Error("Error al obtener vendor")

  const data: VendorDetailResponse = await res.json()
  return data.vendor ? mapRawVendor(data.vendor) : null
}