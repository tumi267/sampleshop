'use client'
import { useCart } from "@/app/context/context";
import Link from "next/link"
import styles from './Nav.module.css'
import { createCart} from "@/app/lib/shopify";
import { useEffect, useState } from "react";
import { loadCart } from "@/app/lib/getCart";
function Nav() {
  const {isOpen, setIsOpen,cart,setCart,cartItems,setCartItems } = useCart();
  
  const openbag=()=>{
    setIsOpen(!isOpen)
  }
  const shopName=`shopName`
  useEffect(()=>{
    const savedCheckoutId = localStorage.getItem(`${shopName}`);
    if (savedCheckoutId) {
      setCart(savedCheckoutId);
      window.localStorage.setItem(`${shopName}:newitem`,'dirty')
    } else {
      createAndStoreCart();
    }
  },[])
  useEffect(()=>{
    const cartquaity = () =>  {
     const status= window.localStorage.getItem(`${shopName}:newitem`)
      //load cart here
      if(status=='dirty'){
      loadCart(cart,setCartItems)
      window.localStorage.setItem(`${shopName}:newitem`,'clean')
      }
    };
    
        // Set an interval to call the function every 500ms
    const intervalId = setInterval(cartquaity, 500);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  },[cart])

  const createAndStoreCart = async () => {
    try {
      const checkout = await createCart();
      // setCheckoutId(checkout?.body?.data?.cartCreate?.cart.id);
      localStorage.setItem(`${shopName}`, checkout?.body?.data?.cartCreate?.cart.id);
      setCart([]);
      
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  };

  return (
    <div className={styles.contain}>
        <Link className={styles.navText} href={`/`}>Home</Link>
        <Link className={styles.navText} href={`/collection`}>Collections</Link>
        <Link className={styles.navText} href={`/product`}>Products</Link>
        <p className={styles.navText} onClick={openbag}> 
        {cartItems?.lines.edges.length>0 ? `Bag ${cartItems?.totalQuantity}` : 'Bag'}
        </p>
    </div>
  )
}

export default Nav