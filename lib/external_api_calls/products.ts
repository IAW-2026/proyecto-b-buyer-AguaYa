export type Product = {
  id: string
  vendorId: string
  name: string
  description: string
  price: number
  stock: number
  imageUrl?: string
}

interface RawProduct {
  id: string
  vendorId: string
  name: string
  description: string
  price: number
  stock: number
  image: string
}

interface RawProductsResponse {
  success: boolean
  products: RawProduct[]
}

const BASE_URL = 'https://proyecto-b-seller-agua-ya.vercel.app/api'
function isValidUrl(url: string | undefined): boolean {
  if (!url) return false;
  try { new URL(url); return true; } catch { return false; }
}

const mockProducts: Product[] = [
    {id:"1", vendorId:"1", name:"Bidón de Agua Mineral 20 L", description:"Agua mineral natural de manantial, ideal para consumo diario en hogar y oficina.", price:100, stock:10, imageUrl:"https://res.cloudinary.com/deqelupbf/image/upload/f_auto,q_auto/png-transparent-bottled-water-graphy-water-bottle-plastic-bottle-drinking-water-lid-running-product-thumbnail_akhot7"},
    {id:"2", vendorId:"1", name:"Bidón de Agua Purificada 12 L", description:"Agua purificada mediante ósmosis inversa, liviana y práctica para espacios reducidos.", price:200, stock:20, imageUrl:"https://res.cloudinary.com/deqelupbf/image/upload/f_auto,q_auto/png-clipart-drinking-water-water-cooler-bottled-water-mineral-water-water-glass-plastic-bottle_hwrwt9"},

    {id:"3", vendorId:"2", name:"Bidón Retornable 20 L", description:"Bidón retornable ecológico, abonás solo el contenido y devolvés el envase.", price:300, stock:30},
    {id:"4", vendorId:"2", name:"Agua de Mesa 6 L", description:"Agua de mesa en formato práctico de 6 litros, ideal para llevar a cualquier lado.", price:400, stock:40},

    {id:"5", vendorId:"3", name:"Bidón de Agua de Manantial 20 L", description:"Agua directamente de manantial, con minerales naturales que la hacen única.", price:500, stock:50, imageUrl:"https://res.cloudinary.com/deqelupbf/image/upload/f_auto,q_auto/pngtree-water-bottle-can-photo-png-image_14202721_regafd"},
    {id:"6", vendorId:"3", name:"Bidón de Agua Purificada 15 L", description:"Agua purificada de alta calidad en bidón de 15 litros, práctica y rendidora.", price:150, stock:15},

    {id:"7", vendorId:"4", name:"Bidón Familiar 20 L", description:"El formato ideal para toda la familia, con tapa fácil de usar y asa de transporte.", price:250, stock:25},
    {id:"8", vendorId:"4", name:"Bidón Retornable 12 L", description:"Bidón liviano y retornable, perfecto para hogares que consumen agua de forma moderada.", price:350, stock:35},
    {id:"9", vendorId:"4", name:"Agua Mineral Sin Gas 8 L", description:"Agua mineral sin gas en presentación de 8 litros, suave y de sabor equilibrado.", price:450, stock:45},

    {id:"10", vendorId:"5", name:"Bidón Premium 20 L", description:"Bidón premium con filtro integrado que elimina impurezas y mejora el sabor del agua.", price:175, stock:20},
    {id:"11", vendorId:"5", name:"Agua Purificada 10 L", description:"Agua purificada en bidón de 10 litros con tapa precinto que garantiza su higiene.", price:275, stock:30},
    {id:"12", vendorId:"5", name:"Botellón de Agua 5 L", description:"Botellón de 5 litros con pico dosificador, cómodo para usar en el día a día.", price:375, stock:40},

    {id:"13", vendorId:"6", name:"Bidón de Agua Natural 20 L", description:"Agua natural de filtrado completo, conserva el pH equilibrado para una hidratación saludable.", price:120, stock:12},
    {id:"14", vendorId:"6", name:"Bidón de Agua de Mesa 12 L", description:"Agua de mesa suave y liviana en bidón de 12 litros, ideal para comedores y oficinas.", price:220, stock:22},

    {id:"15", vendorId:"7", name:"Bidón Hogareño 20 L", description:"Bidón hogareño de 20 litros con sistema antigoteo, fácil de colocar en cualquier dispensador.", price:320, stock:32},
    {id:"16", vendorId:"7", name:"Bidón de Agua Mineral 15 L", description:"Agua mineral con bajo sodio en bidón de 15 litros, recomendada para dietas hiposódicas.", price:420, stock:42},

    {id:"17", vendorId:"8", name:"Bidón de Agua Purificada 20 L", description:"Agua purificada de triple filtrado en bidón de 20 litros, calidad asegurada.", price:180, stock:18},
    {id:"18", vendorId:"8", name:"Agua de Manantial 10 L", description:"Agua de manantial recolectada en su fuente natural, rica en oligoelementos.", price:280, stock:28},

    {id:"19", vendorId:"9", name:"Bidón Retornable Premium 20 L", description:"Bidón premium retornable fabricado con materiales resistentes y libres de BPA.", price:380, stock:38},
    {id:"20", vendorId:"9", name:"Agua de Mesa 6 L", description:"Agua de mesa de calidad superior en formato compacto de 6 litros.", price:480, stock:48},

    {id:"21", vendorId:"10", name:"Bidón Familiar Retornable 20 L", description:"Bidón familiar retornable con depósito de garantía, contribuís al cuidado del medio ambiente.", price:130, stock:13},
    {id:"22", vendorId:"10", name:"Bidón Purificado 12 L", description:"Agua purificada en bidón de 12 litros con sello de calidad, apta para toda la familia.", price:230, stock:23},

    {id:"23", vendorId:"11", name:"Bidón de Agua Cristalina 20 L", description:"Agua cristalina de altísima pureza, sometida a rigurosos controles de calidad.", price:330, stock:33},
    {id:"24", vendorId:"11", name:"Agua Mineral 8 L", description:"Agua mineral natural envasada en origen, con burbujas finas y sabor refrescante.", price:430, stock:43},

    {id:"25", vendorId:"12", name:"Bidón de Agua Premium 20 L", description:"Agua premium de origen protegido, con minerales selectos que realzan su sabor.", price:160, stock:16},
    {id:"26", vendorId:"12", name:"Botellón Purificado 5 L", description:"Botellón purificado con tapa a rosca, práctico para llevar al trabajo o al gimnasio.", price:260, stock:26},
]
//Potencialmente redundante, solo util si difieren los datos entre seller y buyer
function mapRawProduct(raw: RawProduct): Product {
  return {
    id: raw.id,
    vendorId: raw.vendorId,
    name: raw.name,
    description: raw.description,
    price: raw.price,
    stock: raw.stock,
    imageUrl: isValidUrl(raw.image) ? raw.image : undefined,
  }
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://proyecto-b-seller-agua-ya.vercel.app/api/products', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.VENDOR_API_KEY!,
    },
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error("Error al obtener productos")
  const data: RawProductsResponse = await res.json()
  return data.products.map(mapRawProduct)
}


export async function getProductsByVendor(vendorId: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?vendorId=${encodeURIComponent(vendorId)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.VENDOR_API_KEY!,
    },
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error("Error al obtener productos del vendedor")
  const data: RawProductsResponse = await res.json()
  return data.products.map(mapRawProduct)
}

export async function getProductById(id: string): Promise<Product> {
  const products = await getProducts()
  const product = products.find(p => p.id === id)
  if (!product) throw new Error('Producto no encontrado')
  return product
}