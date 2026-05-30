
const mockProducts = [ 
    {id:"1", vendorId:"1", name:"Producto1", price:100, stock:10},
    {id:"2", vendorId:"1", name:"Producto2", price:200, stock:20},
    {id:"3", vendorId:"2", name:"Producto3", price:300, stock:30},
    {id:"4", vendorId:"2", name:"Producto4", price:400, stock:40},
    {id:"5", vendorId:"3", name:"Producto5", price:500, stock:50}
]

export async function getProducts(vendorId?: string){
   /* let baseUrl = process.env.NEXT_PUBLIC_API_URL;
    let url= `${baseUrl}/seller/products`;
    if (vendorId) {
        url += `?vendor_id=${encodeURIComponent(vendorId)}`;
    }
    console.log(url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener productos');*/
    if (vendorId) {
        return mockProducts.filter(p => p.vendorId === vendorId);
    }
    return mockProducts;
}