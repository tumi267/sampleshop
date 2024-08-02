import ColectionCard from "../components/conlectionCard/ColectionCard"
import { getCollections } from "../lib/shopify"
import styles from './collection.module.css'
async function page() {
    const collections=await getCollections()    
    const list=collections.body.data.collections.edges
    const dumie={edges:[{node:{
      selectedOptions:[],
      product:{
        availableForSale:
          true
      }
    }
  }
]}
    console.log(list[0].node)
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