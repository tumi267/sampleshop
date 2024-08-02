import ColectionCard from "@/app/components/conlectionCard/ColectionCard"
import { getCollectiondata } from "@/app/lib/shopify"
import styles from '../collection.module.css'
async function page({ params }) {
    const handle=params.id
    const data= await getCollectiondata(handle)
    const {title,products,description}=data.body.data.collection
    const productData=products.edges
    // get variants set id to variants.id

  return (
    <div className={styles.contain}>
        <h2>{title}</h2>
        <div className={styles.cardContain}>
      {productData.map((e,i)=>{
        return <div key={i} className={styles.contain}><ColectionCard 
        pic={e.node.images.edges[0].node.src}
        title={e?.node?.title}
        currency={e?.node?.priceRange?.minVariantPrice?.currencyCode}
        price={e?.node?.priceRange?.minVariantPrice?.amount}
        handle={e?.node?.handle}
        where={'product'}
        tags={e?.node?.tags}
        variants={e.node.variants}
        /></div>
      })}
      </div>
    </div>
  )
}

export default page