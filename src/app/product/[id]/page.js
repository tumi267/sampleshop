import { getproductdata } from '@/app/lib/shopify'

import ProductPageCard from '@/app/components/ProductPageCard/ProductPageCard'
async function page({params}) {
    const handle=params.id
    const dev = process.env.NODE_ENV !== 'production';
    const baseurl = dev ? 'http://localhost:3000' : 'https://sampleshop.vercel.app';
    const data= await fetch(`${baseurl}/api/getproductdata`,{
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