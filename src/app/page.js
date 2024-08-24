import CollectionContain from './components/CollectionContain/CollectionContain';
import Intro from './components/Intro/Intro';
import Products from './components/Products/Products';
import ZoomParellax from './components/ZoomParellax/ZoomParellax';
import ShopDescription from './components/shopDescription/ShopDescription';
import { shopify } from './lib/shopify';
import styles from './page.module.css'

export default async function Home() {
  const shopdata =await shopify({
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
  const productsData= await shopify({
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
    const collectioData=await shopify({
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

  return (
    <main className={styles.main}>
    <main className={styles.main}>
      <ZoomParellax pics={collectioData.body.data.collections.edges} />
      <Intro data={shopdata.body.data.shop} />
      <CollectionContain data={collectioData.body.data.collections.edges} />
      <ShopDescription data={shopdata.body.data.shop} />
      <Products data={productsData.body.data.products?.edges} />
    </main>
    </main>
  )
}


