export type Product = {
  id: string
  vendorId: string
  name: string
  price: number
  stock: number
  imageUrl?: string
}

const mockProducts: Product[] = [ 
    {id:"1", vendorId:"1", name:"Bidón de Agua Mineral 20 L", price:100, stock:10, imageUrl:"https://res.cloudinary.com/deqelupbf/image/upload/f_auto,q_auto/png-transparent-bottled-water-graphy-water-bottle-plastic-bottle-drinking-water-lid-running-product-thumbnail_akhot7"},
    {id:"2", vendorId:"1", name:"Bidón de Agua Purificada 12 L", price:200, stock:20, imageUrl:"https://res.cloudinary.com/deqelupbf/image/upload/f_auto,q_auto/png-clipart-drinking-water-water-cooler-bottled-water-mineral-water-water-glass-plastic-bottle_hwrwt9"},

    {id:"3", vendorId:"2", name:"Bidón Retornable 20 L", price:300, stock:30},
    {id:"4", vendorId:"2", name:"Agua de Mesa 6 L", price:400, stock:40},

    {id:"5", vendorId:"3", name:"Bidón de Agua de Manantial 20 L", price:500, stock:50, imageUrl:"https://res.cloudinary.com/deqelupbf/image/upload/f_auto,q_auto/pngtree-water-bottle-can-photo-png-image_14202721_regafd"},
    {id:"6", vendorId:"3", name:"Bidón de Agua Purificada 15 L", price:150, stock:15},

    {id:"7", vendorId:"4", name:"Bidón Familiar 20 L", price:250, stock:25},
    {id:"8", vendorId:"4", name:"Bidón Retornable 12 L", price:350, stock:35},
    {id:"9", vendorId:"4", name:"Agua Mineral Sin Gas 8 L", price:450, stock:45},

    {id:"10", vendorId:"5", name:"Bidón Premium 20 L", price:175, stock:20},
    {id:"11", vendorId:"5", name:"Agua Purificada 10 L", price:275, stock:30},
    {id:"12", vendorId:"5", name:"Botellón de Agua 5 L", price:375, stock:40},

    {id:"13", vendorId:"6", name:"Bidón de Agua Natural 20 L", price:120, stock:12},
    {id:"14", vendorId:"6", name:"Bidón de Agua de Mesa 12 L", price:220, stock:22},

    {id:"15", vendorId:"7", name:"Bidón Hogareño 20 L", price:320, stock:32},
    {id:"16", vendorId:"7", name:"Bidón de Agua Mineral 15 L", price:420, stock:42},

    {id:"17", vendorId:"8", name:"Bidón de Agua Purificada 20 L", price:180, stock:18},
    {id:"18", vendorId:"8", name:"Agua de Manantial 10 L", price:280, stock:28},

    {id:"19", vendorId:"9", name:"Bidón Retornable Premium 20 L", price:380, stock:38},
    {id:"20", vendorId:"9", name:"Agua de Mesa 6 L", price:480, stock:48},

    {id:"21", vendorId:"10", name:"Bidón Familiar Retornable 20 L", price:130, stock:13},
    {id:"22", vendorId:"10", name:"Bidón Purificado 12 L", price:230, stock:23},

    {id:"23", vendorId:"11", name:"Bidón de Agua Cristalina 20 L", price:330, stock:33},
    {id:"24", vendorId:"11", name:"Agua Mineral 8 L", price:430, stock:43},

    {id:"25", vendorId:"12", name:"Bidón de Agua Premium 20 L", price:160, stock:16},
    {id:"26", vendorId:"12", name:"Botellón Purificado 5 L", price:260, stock:26},
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