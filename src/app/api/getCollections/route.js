import { shopify } from "@/app/lib/shopify";
import { NextResponse } from "next/server";
export async function GET(request)  {
const data=await shopify({
    query:`{
        collections(first: 100) {
          edges {
            node {
              id
              title
              description
              handle
              image {
                src
                altText
              }
            }
          }
        }
      }`
})

    return NextResponse.json({msg:data.body.data.collections},{status:200})
}