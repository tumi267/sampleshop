import { shopify } from "@/app/lib/shopify";
import { NextResponse } from "next/server";
export async function POST(request)  {
    const{handle}=await request.json()
   
    const data= await shopify({
        query:`{
          product(handle: "${handle}") {
            availableForSale
            description
            images(first: 10) {
              edges {
                node {
                  id
                  src
                }
              }
            }
            priceRange {
              maxVariantPrice {
                currencyCode
                amount
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
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
            tags
            title
            totalInventory
          }
        }`
    })
    
    return NextResponse.json({msg:data.body.data.product},{status:200})
}