export type Vendor = {
  id: string
  name: string
  address: string
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
    return mockVendors;
}

export async function getVendorById(id: string): Promise<Vendor | null> {
    const vendor = mockVendors.find(v => v.id === id);
    if (!vendor) 
        return null;
    return vendor;
}