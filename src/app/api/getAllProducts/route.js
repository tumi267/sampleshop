import { shopify } from "@/app/lib/shopify";
import { NextResponse } from "next/server";
export async function GET(request)  {
    const data= await shopify({
        query: `{
            products(sortKey: TITLE, first: 100) {
              edges{
                node {
                  id
                  title
                  tags
                  handle
                  availableForSale
                  description
                  priceRange {
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
                  availableForSale
                  images(first: 1) {
                      edges {
                        node {
                          src
                          altText
                        }
                      }
                  }
                }
              }
            }
          }`
      });
     
    return NextResponse.json({msg:data.body.data},{status:200})
}