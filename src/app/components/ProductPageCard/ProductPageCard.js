'use client'
import { useState } from "react"
import styles from '../../product/product.module.css'
import Image from "next/image"
import AddToCart from "../AddToCart/AddToCart"
import { handleseletor, variantselect } from "@/app/lib/variants"
function ProductPageCard({images,description,totalInventory,variants}) {
    const [mainImg,setMainImg]=useState(0)
    const options=variantselect(variants)
    const [variantSelected,setVariantSeleted]=useState(options.availableVariants.node)
    const {product,id,image,price,selectedOptions}=variantSelected
    
  return (
    <div>
        <div className={styles.content_contain}>
          <div className={styles.imageCotainer}>
            {images.edges.length>1&&<div className={styles.imageSelector}>{images.edges.map((e,i)=>{return <div key={i} onClick={()=>{setMainImg(i)}}>
                <Image src={images.edges[i].node.src}
                 alt={product?.title} height={50} width={50}/>
                </div>})}
            </div>}
            <div className={styles.imageCotainer}>
            <Image  src={images?.edges[mainImg]?.node.src} 
            alt={product.title} 
            fill={true} 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
            </div>
          </div>
          <div>
          <h1 className={styles.headerText}>{product.title}</h1>
          <h3 className={styles.headerText}>{price.currencyCode} {price.amount}</h3>
          <div>
         
          {options.keys.map((e,i) => {
            return<div key={i}>
              <h3>{e}</h3>
              <div className={styles.selector}>
              {options.flattened[e].map((j,y)=>{
               return <div key={y} onClick={()=>{handleseletor(setVariantSeleted,selectedOptions,j,e,variants)}}>{j!=='Default Title'&&j}</div>
              })}
              </div>
            </div>
            })}
          </div>
          {product.title}
          {product.availableForSale==true&&<AddToCart
          pic={images?.edges[0]?.node.src}
          title={product.title}
          price={price.currencyCode}
          currencyCode={price.currencyCode}
          id={id} 
          />}
          {totalInventory<5&&<p className={styles.inventory}>{totalInventory} left on stock</p>}

          <p className={styles.description}>{description}</p>
          </div>
        </div>
    </div>
  )
}

export default ProductPageCard