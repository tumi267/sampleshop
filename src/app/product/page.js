import ColectionCard from "../components/conlectionCard/ColectionCard"
import { shopify } from "../lib/shopify"
import styles from './product.module.css'

async function page() {
    
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
    const list=productsData.body.data.products?.edges
    
  return (
    <div className={styles.pageContain}>
        <h1>Products</h1>
        <div className={styles.pageContain_content}>
        {list.map((e,i)=>{return <ColectionCard key={i}
        pic={e.node.images.edges[0].node.src}
        price={e?.node?.priceRange?.minVariantPrice?.amount}
        currency={e.node.priceRange.minVariantPrice?.currencyCode}
        title={e.node.title}
        handle={e.node.handle}
        tags={e.node.tags}
        where={'product'}
        variants={e.node.variants}
        />
        })}
      </div>
    </div>
  )
}

export default page