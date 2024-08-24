import { getproductdata, shopify } from '@/app/lib/shopify'

import ProductPageCard from '@/app/components/ProductPageCard/ProductPageCard'

async function page({params}) {
    const handle=params.id

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
   
    const{availableForSale,description,images,priceRange,variants,title,totalInventory,tags}=data.body.data.product
    const {maxVariantPrice,minVariantPrice}=priceRange
 
  return (
    <div>
        <ProductPageCard
        images={images}
        maxVariantPrice={maxVariantPrice}
        description={description}
        availableForSale={availableForSale}
        totalInventory={totalInventory}
        title={title}
        tags={tags}
        variants={variants}
        />
    </div>
  )
}

export default page