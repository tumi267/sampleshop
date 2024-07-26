import ColectionCard from "@/app/components/conlectionCard/ColectionCard"
import { getCollectiondata } from "@/app/lib/shopify"
import styles from '../collection.module.css'
async function page({ params }) {
    const handle=params.id
    const data= await getCollectiondata(handle)
  return (
    <div className={styles.contain}>
        <h2>{data?.body?.data?.collection?.title}</h2>
        <div className={styles.cardContain}>
      {data?.body?.data?.collection.products.edges.map((e,i)=>{
        return <div key={i} className={styles.contain}><ColectionCard 
        pic={e.node.images.edges[0].node.src}
        title={e?.node?.title}
        currency={e?.node?.priceRange?.minVariantPrice?.currencyCode}
        price={e?.node?.priceRange?.minVariantPrice?.amount}
        handle={e?.node?.handle}
        where={'product'}
        /></div>
      })}
      </div>
    </div>
  )
}

export default page