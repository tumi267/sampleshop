'use client'
import Image from "next/image"
import Link from "next/link"
import styles from './ColectionCard.module.css'
import AddToCart from "../AddToCart/AddToCart"
function ColectionCard({pic,price,currency,title,handle,where,param,tags}) {
  return (
    <div className={styles.contain}>
        <Link href={`/${where}/${handle}`}>
        <div className={styles.imageContain}>
        <Image src={pic} alt={title} layout="fill"/>
        </div>
        <div className={styles.cardText_contain}>
        <h3 className={styles.cardtext}>{title}</h3>
        <h3 className={styles.cardtext}>{currency} {price}</h3>
        </div>
        </Link>
        {param!==0&&<div className={styles.btn}>
        <AddToCart
         pic={pic}
         title={title}
         price={price}
         currencyCode={currency} 
         tags={tags}
        />
        </div>}
    </div>
  )
}

export default ColectionCard