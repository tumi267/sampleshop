import { shopify } from "@/app/lib/shopify";
import { NextResponse } from "next/server";

export async function GET(request)  {
  try {
    const data=await shopify({
      query:`{
          shop {
            name
            description
            brand {
              slogan
              shortDescription
            }
          }
        }`
  })

  return NextResponse.json({msg:data.body.data.shop},{status:200})
  } catch (error) {
   return NextResponse.json({msg:error}) 
  }

}