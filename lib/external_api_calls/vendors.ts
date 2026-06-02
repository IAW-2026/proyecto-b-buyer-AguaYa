export type Vendor = {
  id: string
  name: string
  address: string
}

const mockVendors: Vendor[] = [
    {id:"1", name:"Vendedor1", address:"Buenos Aires"},
    {id:"2", name:"Vendedor2", address:"Bahia Blanca"},
    {id:"3", name:"Vendedor3", address:"Buenos Aires"},
    {id:"4", name:"Vendedor4", address:"Punta Alta"},
    {id:"5", name:"Vendedor5", address:"Bahia Blanca"},
    {id:"6", name:"Vendedor6", address:"Mar del Plata"},
    {id:"7", name:"Vendedor7", address:"Rosario"},
    {id:"8", name:"Vendedor8", address:"Córdoba"},
    {id:"9", name:"Vendedor9", address:"Mendoza"},
    {id:"10", name:"Vendedor10", address:"Buenos Aires"},
    {id:"11", name:"Vendedor11", address:"Punta Alta"},
    {id:"12", name:"Vendedor12", address:"Bahia Blanca"},
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