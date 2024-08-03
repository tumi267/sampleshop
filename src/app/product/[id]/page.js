import { getproductdata } from '@/app/lib/shopify'

import ProductPageCard from '@/app/components/ProductPageCard/ProductPageCard'
async function page({params}) {
    const handle=params.id
    const baseUrl = 'http://localhost:3000';
    const data= await fetch(`${baseUrl}/api/getproductdata`,{
      method:'POST',
      headers:{  'Content-Type': 'application/json'
    },
    body: JSON.stringify({handle:handle}) ,
    cache: 'no-store' 
    })
   const res= await data.json()
    
    const{availableForSale,description,images,priceRange,variants,title,totalInventory,tags}=res.msg
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