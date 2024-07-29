'use client'
import { useCart } from "@/app/context/context";
import styles from './addToBag.module.css'
import { addLineItem } from "@/app/lib/shopify";
function AddToCart({pic,title,price,currencyCode,tags,variants}) {
    const { cart,setCart,isOpen,setIsOpen} = useCart();
    // added from ColectionCard and ProductPageCard
    const shopName=`shopName`
    const updateCart=async()=>{
    await addLineItem(cart,variants[0].node.id,1)
    window.localStorage.setItem(`${shopName}:newitem`,'dirty')
    }
  return (
    <button className={styles.btn} onClick={updateCart}>add to bag</button>
  )
}

export default AddToCart