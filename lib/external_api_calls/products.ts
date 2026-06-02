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
    {id:"6", vendorId:"3", name:"Producto6", price:150, stock:15},
    {id:"7", vendorId:"4", name:"Producto7", price:250, stock:25},
    {id:"8", vendorId:"4", name:"Producto8", price:350, stock:35},
    {id:"9", vendorId:"4", name:"Producto9", price:450, stock:45},
    {id:"10", vendorId:"5", name:"Producto10", price:175, stock:20},
    {id:"11", vendorId:"5", name:"Producto11", price:275, stock:30},
    {id:"12", vendorId:"5", name:"Producto12", price:375, stock:40},
    {id:"13", vendorId:"6", name:"Producto13", price:120, stock:12},
    {id:"14", vendorId:"6", name:"Producto14", price:220, stock:22},
    {id:"15", vendorId:"7", name:"Producto15", price:320, stock:32},
    {id:"16", vendorId:"7", name:"Producto16", price:420, stock:42},
    {id:"17", vendorId:"8", name:"Producto17", price:180, stock:18},
    {id:"18", vendorId:"8", name:"Producto18", price:280, stock:28},
    {id:"19", vendorId:"9", name:"Producto19", price:380, stock:38},
    {id:"20", vendorId:"9", name:"Producto20", price:480, stock:48},
    {id:"21", vendorId:"10", name:"Producto21", price:130, stock:13},
    {id:"22", vendorId:"10", name:"Producto22", price:230, stock:23},
    {id:"23", vendorId:"11", name:"Producto23", price:330, stock:33},
    {id:"24", vendorId:"11", name:"Producto24", price:430, stock:43},
    {id:"25", vendorId:"12", name:"Producto25", price:160, stock:16},
    {id:"26", vendorId:"12", name:"Producto26", price:260, stock:26},
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