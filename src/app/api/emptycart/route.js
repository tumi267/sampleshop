import { shopify } from "@/app/lib/shopify";
import { NextResponse } from "next/server";
export async function POST(request){
    const {cart,lines}=await request.json()

    const data= await shopify({
        query:`
        mutation RemoveLines($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
              id
              lines(first: 100) {
                edges {
                  node {
                    id
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        cartId: cart,
        lineIds: lines
      }
      });
      
    return NextResponse.json({status:200})
}