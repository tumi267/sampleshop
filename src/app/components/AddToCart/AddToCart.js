'use client'
import { useCart } from "@/app/context/context";
import styles from './addToBag.module.css'
import { addLineItem } from "@/app/lib/shopify";
function AddToCart({pic,title,price,currencyCode,tags,variants}) {
    const { cart,setCart,isOpen,setIsOpen} = useCart();
    // added from ColectionCard and ProductPageCard
    
    const updateCart=async()=>{
      
      const added=await addLineItem(cart,variants[0].node.id,1)
      console.log(added)
    }
  return (
    <button className={styles.btn} onClick={updateCart}>add to bag</button>
  )
}

export default AddToCart