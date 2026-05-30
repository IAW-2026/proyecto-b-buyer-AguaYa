export async function getProducts(vendorId?: string){
    let baseUrl = process.env.NEXT_PUBLIC_API_URL;
    let url= `${baseUrl}/seller/products`;
    if (vendorId) {
        url += `?vendor_id=${encodeURIComponent(vendorId)}`;
    }
    console.log(url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener productos');
    return res.json();
}