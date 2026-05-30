export type Product = {
  id: string
  vendorId: string
  name: string
  price: number
  stock: number
}

const mockProducts: Product[] = [ 
    {id:"1", vendorId:"1", name:"Producto1", price:100, stock:10},
    {id:"2", vendorId:"1", name:"Producto2", price:200, stock:20},
    {id:"3", vendorId:"2", name:"Producto3", price:300, stock:30},
    {id:"4", vendorId:"2", name:"Producto4", price:400, stock:40},
    {id:"5", vendorId:"3", name:"Producto5", price:500, stock:50}
]

export async function getProducts(): Promise<Product[]> {
    return mockProducts;
}

export async function getProductsByVendor(vendorId: string): Promise<Product[]> {
    return mockProducts.filter(p => p.vendorId === vendorId);
}

export async function getProductById(id: string): Promise<Product> {
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Producto no encontrado');
    return product;
}