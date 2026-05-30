
export type Vendor = {
  id: string
  name: string
  address: string
}


const mockVendors: Vendor[] = [
    {id:"1", name:"Vendedor1",address:"Buenos Aires"},
    {id:"2", name:"Vendedor2",address:"Bahia Blanca"},
    {id:"3", name:"Vendedor3",address:"Buenos Aires"},
    {id:"4", name:"Vendedor4",address:"Punta Alta"},
    {id:"5", name:"Vendedor5",address:"Bahia Blanca"}
]

export async function getVendors(): Promise<Vendor[]> {
    return mockVendors;
}

export async function getVendorById(id: string): Promise<Vendor> {
    const vendor = mockVendors.find(v => v.id === id);
    if (!vendor) throw new Error('Vendedor no encontrado');
    return vendor;
}
 /* let baseUrl = process.env.NEXT_PUBLIC_API_URL;
    let url= `${baseUrl}/seller/sellers`;
    if (id) {
        url += `?id=${encodeURIComponent(id)}`;
    }
    const res = await fetch(url);
    console.log(process.env.NEXT_PUBLIC_API_URL);
    if (!res.ok) throw new Error('Error al obtener vendedores');*/