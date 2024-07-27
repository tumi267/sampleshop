'use client'
import { useState } from "react"
import styles from '../../product/product.module.css'
import Image from "next/image"
import AddToCart from "../AddToCart/AddToCart"
function ProductPageCard({images,maxVariantPrice,description,availableForSale,totalInventory,title}) {
    const [mainImg,setMainImg]=useState(0)
  return (
    <div>
        <div className={styles.content_contain}>
          <div className={styles.imageCotainer}>
            {images.edges.length>1&&<div className={styles.imageSelector}>{images.edges.map((e,i)=>{return <div key={i} onClick={()=>{setMainImg(i)}}>
                <Image src={images.edges[i].node.src}
                 alt={title} height={50} width={50}/>
                </div>})}
            </div>}
            <div className={styles.imageCotainer}>
            <Image  src={images?.edges[mainImg]?.node.src} 
            alt={title} 
            fill={true} 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
            </div>
          </div>
          <div>
          <h1 className={styles.headerText}>{title}</h1>
          <h3 className={styles.headerText}>{maxVariantPrice.currencyCode} {maxVariantPrice.amount}</h3>
          {title}
          {availableForSale==true&&totalInventory>0&&<AddToCart
          pic={images?.edges[0]?.node.src}
          title={title}
          price={maxVariantPrice.currencyCode}
          currencyCode={maxVariantPrice.currencyCode} 
          />}
          {totalInventory<5&&<p className={styles.inventory}>{totalInventory} left on stock</p>}

          <p className={styles.description}>{description}</p>
          </div>
        </div>
    </div>
  )
}

export default ProductPageCard