'use client'
import { useCart } from "@/app/context/context";
import styles from './addToBag.module.css'
function AddToCart({pic,title,price,currencyCode}) {
    const { cart,setCart,isOpen,setIsOpen} = useCart();
    // added from ColectionCard and ProductPageCard
    const updateCart=(e)=>{
      // Ensure that the item has all necessary details
  if (pic && title && price && currencyCode) {
    // Check if the item is already in the cart
    const isItemInCart = cart.some(item => item.title === title);
    if (!isItemInCart) {
      setIsOpen(!isOpen);
      setCart(prevCart => [...prevCart, { pic, title, price, currencyCode }]);
    } else {
      // Optionally, you could update the quantity or show a message
      console.log('Item is already in the cart');
    }
  } else {
    console.log('Incomplete item details');
  }
    }
  return (
    <button className={styles.btn} onClick={updateCart}>add to bag</button>
  )
}

export default AddToCart