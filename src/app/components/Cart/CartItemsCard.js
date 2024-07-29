import Image from "next/image"
import styles from './Cart.module.css'
function CartItemsCard({pic,name,price,qty}) {
  return (
    <div>
        <div className={styles.cartImage}>
        <Image
            src={pic}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={`image-${name}`}
            />
        </div>
        <p>{name}</p>
        <p>{qty}</p>
        <p>{price?.amount}</p>
    </div>
  )
}

export default CartItemsCard