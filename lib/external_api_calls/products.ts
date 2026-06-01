export type Product = {
  id: string
  vendorId: string
  name: string
  price: number
  stock: number
  imageUrl?: string
}

const mockProducts: Product[] = [ 
    {id:"1", vendorId:"1", name:"Producto1", price:100, stock:10, imageUrl:"https://res.cloudinary.com/deqelupbf/image/upload/f_auto,q_auto/png-transparent-bottled-water-graphy-water-bottle-plastic-bottle-drinking-water-lid-running-product-thumbnail_akhot7"},
    {id:"2", vendorId:"1", name:"Producto2", price:200, stock:20, imageUrl:"https://res.cloudinary.com/deqelupbf/image/upload/f_auto,q_auto/png-clipart-drinking-water-water-cooler-bottled-water-mineral-water-water-glass-plastic-bottle_hwrwt9"},
    {id:"3", vendorId:"2", name:"Producto3", price:300, stock:30},
    {id:"4", vendorId:"2", name:"Producto4", price:400, stock:40},
    {id:"5", vendorId:"3", name:"Producto5", price:500, stock:50, imageUrl:"https://res.cloudinary.com/deqelupbf/image/upload/f_auto,q_auto/pngtree-water-bottle-can-photo-png-image_14202721_regafd"},
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