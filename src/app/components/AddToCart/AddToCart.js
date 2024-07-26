'use client'
import { useCart } from "@/app/context/context";
import styles from './addToBag.module.css'
function AddToCart({pic,title,price,currencyCode}) {
    const { cart,setCart,setIsOpen} = useCart();
    // added from ColectionCard and ProductPageCard
    const updateCart=()=>{
      setIsOpen(true)
      setCart([...cart,{pic,title,price,currencyCode}])
    }
  return (
    <button className={styles.btn} onClick={updateCart}>add to bag</button>
  )
}

export default AddToCart