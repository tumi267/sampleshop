'use client'
import { useCart } from "@/app/context/context";
import styles from './Cart.module.css'
function Cart() {
    const { cart,setCart,isOpen, setIsOpen } = useCart();
    const closeCart=()=>{
      setIsOpen(!isOpen)
    }
    console.log(cart)
  return (
    <div className={isOpen!==false?styles.contain:styles.closeCart}>
      <div className={styles.cartDrawer}>
        <div className={styles.related}>
          <div className={styles.relatedHeader}>
          <h2>Related Items</h2>
          </div>
          <div>
          items
          </div>
        </div>
        <div className={styles.bag}>
          <div className={styles.header}>
            <p>your bag</p>
            <p onClick={closeCart}>close</p>
          </div>
          <div >
          {cart.length > 0?<div>items</div>:<h2>your bag is empty</h2>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart





