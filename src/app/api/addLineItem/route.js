import { NextResponse } from "next/server";
import { shopify } from "@/app/lib/shopify";
export async function POST(request){
    const{checkoutId,variant,quantity}=await request.json()
    const data=await shopify({
        query:`mutation addLineItem {
          cartLinesAdd(cartId: "${checkoutId}", lines: {merchandiseId: "${variant}", quantity: ${quantity}}) {
            cart {
              lines(first: 10) {
                edges {
                  node{
                    id
                    merchandise
                  }
                }
              }
              totalQuantity
            }
          }
        }`
      })
    
      if(data.body.data){
    return NextResponse.json({msg:'ok'},{status:200})
      }else{
        return NextResponse.json({msg:'something went wrong try again'},{status:400})
      }
}