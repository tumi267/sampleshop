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
                variants(first: 10) {
                  edges {
                    node {
                      id
                      price {
                        amount
                        currencyCode
                      }
                      quantityAvailable
                      title
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
              tags
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
}
// related
export async function getRelated(tags){
  return shopify({
    query: `{
      products(first: 10, query: "tag:${tags}") {
        edges {
          node {
            id
            title
            handle
            variants(first: 10) {
              edges {
                node {
                  id
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
}
// create cart
export async function createCart() {
  return shopify({
  query: `mutation creatCart {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }`
  })}
// get cart
export async function getCart(checkoutId){
 
  return shopify({
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
}

// add line item
export async function addLineItem(checkoutId,variant){
  
  return shopify({
    query:`mutation addLineItem {
      cartLinesAdd(cartId: "${checkoutId}", lines: {merchandiseId: "${variant}", quantity: 1}) {
        cart {
          lines(first: 10) {
            edges {
              node{
                id
                merchandise
              }
            }
          }
          totalQuantity
        }
      }
    }`
  })
}

// empty cart
export async function emptycart(cart, lineIds){
  return shopify({
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
  lineIds: lineIds
}
});
}
//update cart line item
export async function updateCartItem(cart, item, qty) {
  return shopify({
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
      lineId: item,
      quantity: qty
    }
  });
}
//remove cart item
export async function removeCartLineItems(cartId, lineIds) {
 
    return shopify({
      query: `
        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
                        title
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
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        cartId,
        lineIds
      }
    });
}
