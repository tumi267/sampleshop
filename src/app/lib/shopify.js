// call to shopify
export async function shopify({ query, variables }) {
    const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
    try {
      const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': `${key}`
        },
        body: { query, variables } && JSON.stringify({ query, variables })
      });
  
      return {
        status: result.status,
        body: await result.json()
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        status: 500,
        error: 'Error receiving data'
      };
    }
  }
// all products
  export async function getAllProducts() {
    return shopify({
      query: `{
          products(sortKey: TITLE, first: 100) {
            edges{
              node {
                id
                title
                handle
                availableForSale
                description
                priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
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
  }
  // collections
export async function getCollections(){
    return shopify({
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
}
// shop
export async function getshopdata(){
    return shopify({
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
}
// collection
export async function getCollectiondata(handle){
  return shopify({
    query:`{
      collection(handle: "${handle}") {
        description
        title
        products(first: 100) {
          edges {
            node {
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
              handle
            }
          }
        }
      }
    }`
  })
}
// product
export async function getproductdata(handle){
  return shopify({
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
          variants(first: 10) {
            edges {
              node {
                id
                image {
                  src
                }
              }
            }
          }
          title
          totalInventory
        }
      }`
  })
}