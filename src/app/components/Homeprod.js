
import Intro from "./Intro/Intro"
import Products from "./Products/Products"
import CollectionContain from "./CollectionContain/CollectionContain"
import ZoomParellax from "./ZoomParellax/ZoomParellax"
import ShopDescription from "./shopDescription/ShopDescription"

async function Homeprod() {
  const baseUrl = 'http://localhost:3000';

  const shopdata=await fetch(`${baseUrl}/api/getshopdata`, { cache: 'no-store' })
  const res=await shopdata.json()

  const productsData=await fetch(`${baseUrl}/api/getAllProducts`, { cache: 'no-store' })
  const res1=await productsData.json()
  const {products}=res1.msg

  const collectioData=await fetch(`${baseUrl}/api/getCollections`, { cache: 'no-store' })
  const res2=await collectioData.json()
 
  return (
    <div>

      <ZoomParellax
      pics={res2.msg.edges}/>
      <Intro
      data={res.msg}/> 
     <CollectionContain
      data={res2.msg.edges}/>
      <ShopDescription
      data={res.msg}/>
      <Products
      data={products?.edges}/> 
    </div>
  )
}

export default Homeprod