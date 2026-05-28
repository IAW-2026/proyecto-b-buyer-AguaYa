




export async function getVendors(){
    const res = await fetch("http://localhost:3000/api/seller/sellers");
    console.log(process.env.NEXT_PUBLIC_API_URL);
    if (!res.ok) throw new Error('Error al obtener productos');
    return res.json();
}
