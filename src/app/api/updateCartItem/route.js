import { shopify } from "@/app/lib/shopify";
import { NextResponse } from "next/server";
export async function POST(request)  {
   const{cart,id,qtyAmount}= await request.json()
   const data= await shopify({
    query: `
      mutation updateCartLineItem($cartId: ID!, $lineId: ID!, $quantity: Int!) {
        cartLinesUpdate(
          cartId: $cartId,
          lines: {
            id: $lineId,
            quantity: $quantity
          }
        ) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `,
    variables: {
      cartId: cart,
      lineId: id,
      quantity: qtyAmount
    }
  });
    return NextResponse.json({msg:data.body.data},{status:200})
}