




export async function getVendors(id?: string){

    let baseUrl = process.env.NEXT_PUBLIC_API_URL;
    let url= `${baseUrl}/seller/sellers`;
    if (id) {
        url += `?id=${encodeURIComponent(id)}`;
    }
    const res = await fetch(url);
    console.log(process.env.NEXT_PUBLIC_API_URL);
    if (!res.ok) throw new Error('Error al obtener vendedores');
    return res.json();
}
