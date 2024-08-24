import ColectionCard from "../components/conlectionCard/ColectionCard"
import { shopify } from "../lib/shopify"
import styles from './collection.module.css'

async function page() {
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
    const list= collectioData.body.data?.collections.edges
   
    const dumie={edges:[{node:{
      selectedOptions:[],
      product:{
        availableForSale:
          true
      }
    }
  }
]}

  return (
    <div className={styles.contain}>
        <h2>Collections</h2>
        <div className={styles.cardContain}>
        {list.map((e,i)=>{return <div key={i} className={styles.contain}>
        <ColectionCard  
        pic={e.node.image?.src}
        title={e.node.title}
        handle={e.node.handle}
        where={'collection'}
        param={0}
        variants={dumie}
        />
        </div>
        })} 
      </div>
    </div>
  )
}

export default page