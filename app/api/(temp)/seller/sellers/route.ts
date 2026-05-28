import { NextResponse,NextRequest } from "next/server";

const mockVendors = [
    {id:"1", name:"Vendedor1",address:"Buenos Aires"},
    {id:"2", name:"Vendedor2",address:"Bahia Blanca"},
    {id:"3", name:"Vendedor3",address:"Buenos Aires"},
    {id:"4", name:"Vendedor4",address:"Punta Alta"},
    {id:"5", name:"Vendedor5",address:"Bahia Blanca"}
]


export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const address = searchParams.get('Address');
    let result = [...mockVendors];
    if (id) {
        result = result.filter(p => p.id === id)
    }
    if (name) {
        result = result.filter(p => p.name == name)
    }
    if (address) {
        result = result.filter(p => p.address == address)
    }
    return NextResponse.json(result);
}