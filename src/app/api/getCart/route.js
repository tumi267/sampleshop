import { shopify } from "@/app/lib/shopify";
import { NextResponse } from "next/server";
export async function POST(request)  {
    const {checkoutId}=await request.json()
    const data=await shopify({
        query:`{
          cart(
            id: "gid://shopify/Cart/Z2NwLWV1cm9wZS13ZXN0MTowMUo0RjBWQ1I5NUExM0IwVlo4QlcyUDRBNA?key=10cbcae91f2be261b7d6f7eedaf44d4b"
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