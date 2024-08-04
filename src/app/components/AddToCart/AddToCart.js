'use client'
import { useCart } from "@/app/context/context";
import styles from './addToBag.module.css'
function AddToCart({id}) {
    const { cart,setCart,isOpen,setIsOpen} = useCart();
    // added from ColectionCard and ProductPageCard
    const shopName=async()=>{
      const shopdata=await fetch('/api/getshopdata',{cache:'no-store'})
      const res=await shopdata.json()
      return res?.msg?.name
    }
    const updateCart=async()=>{
     
      const data= await fetch(`/api/addLineItem`,{
        method:'POST',
        headers:{
          'Content-Type':'applicaton/json'
        },
        body:JSON.stringify({checkoutId:await cart,variant:id,quantity:1}),
        cache:'no-store'
      })
    window.localStorage.setItem(`${await shopName()}:newitem`,'dirty')
 
    if(data.status==200){
      setIsOpen(true)
    }
    }
  return (
    <button className={styles.btn} onClick={updateCart}>add to bag</button>
  )
}

export default AddToCart