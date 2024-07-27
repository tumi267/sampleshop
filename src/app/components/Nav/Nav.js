'use client'
import { useCart } from "@/app/context/context";
import Link from "next/link"
import styles from './Nav.module.css'
import { createCart} from "@/app/lib/shopify";
import { useEffect } from "react";
function Nav() {
  const {isOpen, setIsOpen,cart,setCart } = useCart();
  const openbag=()=>{
    setIsOpen(!isOpen)
  }
  const shopName=`shopName`
  useEffect(()=>{
    const savedCheckoutId = localStorage.getItem(`${shopName}`);
    if (savedCheckoutId) {
      setCart(savedCheckoutId);
    } else {
      createAndStoreCart();
    }
  },[])
  const createAndStoreCart = async () => {
    try {
      const checkout = await createCart();
      setCheckoutId(checkout?.body?.data?.cartCreate?.cart.id);
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
        {/* {cart.length > 0 ? `Bag ${cart.length}` : 'Bag'} */}
        Bag
        </p>
    </div>
  )
}

export default Nav