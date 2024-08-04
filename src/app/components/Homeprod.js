
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
  const text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id nisi erat. Suspendisse congue viverra maximus. Cras mollis enim urna, fermentum convallis ante aliquam ut. Morbi arcu ex, tristique nec mollis in, iaculis in ipsum. Nulla facilisi. In urna tortor, pretium sed tempor in, tristique nec purus. Suspendisse tellus ligula, sollicitudin sed commodo gravida, maximus quis felis. Suspendisse scelerisque massa eu tellus euismod, id euismod sapien dictum. Vivamus nulla erat, egestas non justo vitae, faucibus consequat felis."
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