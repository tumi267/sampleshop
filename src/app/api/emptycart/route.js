import { NextResponse } from "next/server";
export async function POST(request){
    const {cart,lines}=await request.json()
    console.log(cart,lines)
    return NextResponse.json({msg:'working'},{status:200})
}