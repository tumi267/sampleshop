import { shopify } from "@/app/lib/shopify";
import { NextResponse } from "next/server";
export async function POST(request)  {
    const {handle}=await request.json()

const data=await shopify({
    query:`{
      collection(handle: "${handle}") {
        description
        title
        products(first: 200) {
          edges {
            
            node {
              variants(first: 200) {
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
              availableForSale
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    id
                    src
                  }
                }
              }
              title
              tags
              handle
            }
          }
        }
      }
    }`
  })

    return NextResponse.json({msg:data.body.data.collection},{status:200})
}