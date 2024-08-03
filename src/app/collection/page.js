import ColectionCard from "../components/conlectionCard/ColectionCard"

import styles from './collection.module.css'
async function page() {
    const baseUrl = 'http://localhost:3000';
    const collectioData=await fetch(`${baseUrl}/api/getCollections`, { cache: 'no-store' })
    const collections=await collectioData.json() 
    const list=collections.msg.edges
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