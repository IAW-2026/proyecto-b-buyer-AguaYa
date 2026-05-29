export async function getProducts(vendorId?: string){
    let url = "http://localhost:3000/api/seller/products";
    if (vendorId) {
        url += `?vendor_id=${encodeURIComponent(vendorId)}`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener productos');
    return res.json();
}