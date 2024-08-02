import { getproductdata } from '@/app/lib/shopify'

import ProductPageCard from '@/app/components/ProductPageCard/ProductPageCard'
async function page({params}) {
    const handle=params.id
    const data=await getproductdata(handle)
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