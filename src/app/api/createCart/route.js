import { shopify } from "@/app/lib/shopify";
import { NextResponse } from "next/server";
export async function GET(){
    const data=await shopify({
        query: `mutation creatCart {
          cartCreate {
            cart {
              id
              checkoutUrl
            }
          }
        }`
        })
        
    return NextResponse.json({msg:data.body.data},{status:200})
}