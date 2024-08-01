'use client'
import { useState } from "react"
import styles from '../../product/product.module.css'
import Image from "next/image"
import AddToCart from "../AddToCart/AddToCart"
function ProductPageCard({images,description,totalInventory,variants}) {
    const [mainImg,setMainImg]=useState(0)

    const values = variants.edges.flatMap(e => e.node.selectedOptions);
    const uniqueOptions = new Set();
  // Flatten and deduplicate variant options
    const flattened = values.reduce((acc, { name, value }) => {
      const key = `${name}-${value}`;
      if (!uniqueOptions.has(key)) {
        uniqueOptions.add(key);
        if (!acc[name]) {
          acc[name] = [];
        }
        acc[name].push(value);
      }
      return acc;
    }, {});
    const keys = Object.keys(flattened);
    // set fir available variant
    const availableVariants = variants.edges.find(e =>e.node.product.availableForSale==true
    );
    const [variantSelected,setVariantSeleted]=useState(availableVariants.node)
    const {product,id,image,price,selectedOptions}=variantSelected
    // handles click selection update
    const handleseletor=(key,value)=>{
      const newOptions=selectedOptions.map(e=>e.name==key?{...e,value}:e)
    // Define a function to check if the variant's selectedOptions match newOptions
    const matchesSelectedOptions = (variantOptions) => {
      return variantOptions.length === newOptions.length &&
        variantOptions.every(option =>
        newOptions.some(newOption => 
        newOption.name === option.name && newOption.value === option.value
      )
    );
    };
      const newVariants = variants.edges.filter(e => 
      matchesSelectedOptions(e.node.selectedOptions)
    );
    setVariantSeleted(newVariants[0].node);
    }
    
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
         
          {keys.map((e,i) => {
            return<div key={i}>
              <h3>{e}</h3>
              <div className={styles.selector}>
              {flattened[e].map((j,y)=>{
               return <div key={y} onClick={()=>{handleseletor(e,j)}}>{j}</div>
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