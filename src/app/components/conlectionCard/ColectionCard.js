'use client'
import Image from "next/image"
import Link from "next/link"
import styles from './ColectionCard.module.css'
import AddToCart from "../AddToCart/AddToCart"
import { useRef, useState } from "react"
import { handleseletor, variantselect } from "@/app/lib/variants"
import { useSpring,useTransform,motion, useMotionValue } from "framer-motion"
function ColectionCard({pic,currency,title,handle,where,param,tags,variants}) {

  const options=variantselect(variants)
  const [variantSelected,setVariantSeleted]=useState(options.availableVariants?.node)
  const {product,id,image,price,selectedOptions}=variantSelected;

  return (
    <div

    className={styles.contain}
    >
      <div            
       style={{
        transform: "translateZ(75px)",
        transformStyle: "preserve-3d",
          }}>
        <Link 
        href={`/${where}/${handle}`}>
        <div className={styles.imageContain}>
        <Image src={pic} 
        alt={title} 
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
        </div>
        <div className={styles.cardText_contain}>
        <h3 className={styles.cardtext}>{title}</h3>
        {price&&<h3 className={styles.cardtext}>{price.currencyCode} {price.amount}</h3>}
        </div>
        </Link>
        {param!==0&&<div className={styles.btn}>
          <div>
          <div>
        {options?.keys.map((e,i) => {
            return<div key={i}>
              {e!=='Title'&&<><h3>{e}</h3>
              <div className={styles.selector}>
              {options.flattened[e].map((j,y)=>{
               
               return <div key={y} onClick={()=>{handleseletor(setVariantSeleted,selectedOptions,j,e,variants)}}>{j}</div>
              })}
              </div></>}
            </div>
            })}
        </div>
        <AddToCart
         pic={pic}
         title={title}
         price={price}
         currencyCode={currency} 
         tags={tags}
         id={id}
        />
        </div>
        </div>}
        </div>
    </div>
  )
}

export default ColectionCard