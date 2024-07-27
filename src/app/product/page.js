import ColectionCard from "../components/conlectionCard/ColectionCard"
import { getAllProducts } from "../lib/shopify"
import styles from './product.module.css'
async function page() {
    const products=await getAllProducts()
    const list=products.body.data.products.edges
    
  return (
    <div className={styles.pageContain}>
        <h1>Products</h1>
        <div className={styles.pageContain_content}>
        {list.map((e,i)=>{return <ColectionCard key={i}
        pic={e.node.images.edges[0].node.src}
        price={e?.node?.priceRange?.minVariantPrice?.amount}
        currency={e.node.priceRange.minVariantPrice?.currencyCode}
        title={e.node.title}
        handle={e.node.handle}
        tags={e.node.tags}
        where={'product'}
        />
        })}
      </div>
    </div>
  )
}

export default page