import { shopify } from "@/app/lib/shopify";
import { chunking } from "@/app/utils/chunking";
import { NextResponse } from "next/server";
export async function POST(request)  {
    const {handle}=await request.json()
    const data=await shopify({
        query: `{
          products(first: 10, query: "tag:${handle}") {
            edges {
              node {
                id
                title
                handle
                variants(first: 5) {
                  edges {
                    node {
                      id
                      price {
                        amount
                        currencyCode
                      }
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        availableForSale
                        totalInventory
                        tags
                        title
                        images(first: 10) {
                          nodes {
                            src
                          }
                        }
                      }
                      image {
                        src
                      }
                    }
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      src
                      altText
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }`
      })
     const minizmidedlist= chunking(data.body.data.products.edges,5)
    
    return NextResponse.json({msg:minizmidedlist[0]},{status:200})
}