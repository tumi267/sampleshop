'use client'
import Image from "next/image"
import Link from "next/link"
import styles from './Products.module.css'
import ColectionCard from "../conlectionCard/ColectionCard"
function Products({data}) {
  //  different call
  return (
    <div >
        <h2>Products</h2>
        <div className={styles.contain}>
            {data.map((e,i)=>{return<div key={i} className={styles.containCard}>
              <ColectionCard 
              pic={e.node.images.edges[0].node.src}
              title={e?.node?.title}
              currency={e?.node?.priceRange?.minVariantPrice?.currencyCode}
              price={e?.node?.priceRange?.minVariantPrice?.amount}
              handle={e?.node?.handle}
              where={'product'}
            />
            </div>})}
        </div>
    </div>
  )
}

export default Products