import ColectionCard from "../components/conlectionCard/ColectionCard"
import { getAllProducts } from "../lib/shopify"
import styles from './product.module.css'
async function page() {
    
    const dev = process.env.NODE_ENV !== 'production';
    const baseurl = dev ? 'http://localhost:3000' : 'https://sampleshop.vercel.app';
    const data= await fetch(`${baseurl}/api/getAllProducts`, {
      cache:'no-store' 
    });
    const res=await data.json()
    const list=res.msg?.products.edges
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
        variants={e.node.variants}
        />
        })}
      </div>
    </div>
  )
}

export default page