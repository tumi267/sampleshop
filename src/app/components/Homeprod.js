import { getAllProducts, getCollections, getshopdata } from "../lib/shopify"
import Intro from "./Intro/Intro"
import Products from "./Products/Products"
import CollectionContain from "./CollectionContain/CollectionContain"
import ZoomParellax from "./ZoomParellax/ZoomParellax"
import ShopDescription from "./shopDescription/ShopDescription"

async function Homeprod() {
  const shopdata=await getshopdata()
  const shop=shopdata?.body?.data.shop
  const productsData=await getAllProducts()
  const products=productsData?.body?.data?.products?.edges
  const collectiondata=await getCollections()
  const collections=collectiondata?.body?.data.collections?.edges

  return (
    <div>

      <ZoomParellax
      pics={collections}/>
      <Intro
      data={shop}/>
      <CollectionContain
      data={collections}/>
      <ShopDescription
      data={shop}/>
      <Products
      data={products}/>
    </div>
  )
}

export default Homeprod