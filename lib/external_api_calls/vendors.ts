export type Vendor = {
  id: string
  name: string
  address: string
}

interface VendorResponse {
  id: string;
  name: string;
  description: string;
  address: string;
  image: string;
  isActive: boolean;
  clerkUserId: string;
}

interface VendorsListResponse {
  success: boolean;
  vendors: VendorResponse[];
}

interface VendorDetailResponse {
  success: boolean
  vendor: VendorResponse
}

const mockVendors: Vendor[] = [
    {id:"1", name:"AquaSur Distribuciones", address:"Buenos Aires"},
    {id:"2", name:"Manantial Azul", address:"Bahia Blanca"},
    {id:"3", name:"Agua Cristal", address:"Buenos Aires"},
    {id:"4", name:"Bidones del Puerto", address:"Punta Alta"},
    {id:"5", name:"Hidrovita", address:"Bahia Blanca"},
    {id:"6", name:"Aguas del Atlántico", address:"Mar del Plata"},
    {id:"7", name:"Fuente Clara", address:"Rosario"},
    {id:"8", name:"AquaVida", address:"Córdoba"},
    {id:"9", name:"Manantiales Andinos", address:"Mendoza"},
    {id:"10", name:"Agua Pura Express", address:"Buenos Aires"},
    {id:"11", name:"Bidones del Sur", address:"Punta Alta"},
    {id:"12", name:"Distribuidora Oasis", address:"Bahia Blanca"},
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
  return data.vendors;
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
  return data.vendor
}