'use client'
import { useCart } from "@/app/context/context";
import Link from "next/link"
import styles from './Nav.module.css'
import { useEffect, useState } from "react";
import { loadCart } from "@/app/lib/getCart";
import { useScroll,motion,useMotionValueEvent, } from "framer-motion";
function Nav() {
  const {isOpen, setIsOpen,cart,setCart,cartItems,setCartItems,setCheckoutId } = useCart();
  const { scrollY } = useScroll()
  const openbag=()=>{
    setIsOpen(!isOpen)
  }
  const shopName=async()=>{
    const shopdata=await fetch('/api/getshopdata',{cache:'no-store'})
    const res=await shopdata.json()
    return res?.msg?.name
  }

  useEffect(()=>{
    const getitems=async()=>{
      const name=await shopName()
      const savedCheckoutId = localStorage.getItem(`${name}`);
      if (savedCheckoutId) {
        setCart(savedCheckoutId);
        window.localStorage.setItem(`${name}:newitem`,'dirty')
      } else {
        createAndStoreCart();
      }
    }
    getitems()
  },[])
  useEffect(()=>{
    const cartquaity = async() =>  {
      const name=await shopName()
     const status= window.localStorage.getItem(`${name}:newitem`)
      //load cart here
      if(status=='dirty'){
      loadCart(cart,setCartItems)
      window.localStorage.setItem(`${name}:newitem`,'clean')
      }
    };
    
        // Set an interval to call the function every 500ms
    const intervalId = setInterval(cartquaity, 500);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  },[cart])

  const createAndStoreCart = async () => {
    try {
      const cartdata= await fetch('/api/createCart',{cache:'no-store'})
      const checkout=await cartdata.json()
      const{cartCreate}=checkout.msg
      setCheckoutId(cartCreate?.cart.id);
      const name=await shopName()
      localStorage.setItem(`${name}`, cartCreate?.cart.id);
      setCart(cartCreate?.cart.id);
      
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  };
  const [hidden,setHidden]=useState(false)

   useMotionValueEvent(scrollY,'change',(latest)=>{
    const prev=scrollY.getPrevious()
    if(latest>prev&&latest>50){
      setHidden(true)
    }else{
      setHidden(false)
    }
   })
 
  
  return (
    <motion.div
    variants={{
      visable:{y:0},
      hidden:{y:"-100%"},
    }}
    animate={hidden?"hidden":"visable"}
    transition={{duration:0.35,ease:"easeInOut"}}
    className={styles.contain}>
        <Link className={styles.navText} href={`/`}>Home</Link>
        <Link className={styles.navText} href={`/collection`}>Collections</Link>
        <Link className={styles.navText} href={`/product`}>Products</Link>
        <p className={styles.navText} onClick={openbag}> 
        {cartItems?.lines.edges.length>0 ? `Bag ${cartItems?.totalQuantity}` : 'Bag'}
        </p>
    </motion.div>
  )
}

export default Nav