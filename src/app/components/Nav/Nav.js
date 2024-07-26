'use client'
import { useCart } from "@/app/context/context";
import Link from "next/link"
import styles from './Nav.module.css'
function Nav() {
  const {isOpen, setIsOpen,cart } = useCart();
  const openbag=()=>{
    setIsOpen(!isOpen)
  }
  return (
    <div className={styles.contain}>
        <Link className={styles.navText} href={`/`}>Home</Link>
        <Link className={styles.navText} href={`/collection`}>Collections</Link>
        <Link className={styles.navText} href={`/product`}>Products</Link>
        <p className={styles.navText} onClick={openbag}> {cart.length > 0 ? `Bag ${cart.length}` : 'Bag'}</p>
    </div>
  )
}

export default Nav