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
          {/* send in e as data destucure in card */}
        {list.map((e,i)=>{return <ColectionCard key={i}
        pic={e.node.images.edges[0].node.src}
        price={e?.node?.priceRange?.minVariantPrice?.amount}
        currency={e.node.priceRange.minVariantPrice?.currencyCode}
        title={e.node.title}
        handle={e.node.handle}
        tags={e.node.tags}
        where={'product'}
        // variant selector logic of first avaible variant
        id={e.node.variants.edges[0].node.id}
        />
        })}
      </div>
    </div>
  )
}

export default page