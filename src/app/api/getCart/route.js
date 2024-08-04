import { shopify } from "@/app/lib/shopify";
import { NextResponse } from "next/server";
export async function POST(request)  {
    const {checkoutId}=await request.json()
    const data=await shopify({
        query:`{
          cart(
            id: "${checkoutId}"
          ) {
            id
            checkoutUrl
            lines(first: 200) {
              edges {
                node {
                  id
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      quantityAvailable
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        src
                      }
                      product {
                        handle
                        title
                        tags
                      }
                    }
                  }
                  quantity
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            totalQuantity
            checkoutUrl
            estimatedCost {
              totalTaxAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }`
      })
    return NextResponse.json({msg:data.body.data.cart},{status:200})
}