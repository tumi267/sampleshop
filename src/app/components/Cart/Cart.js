'use client'
import { useCart } from "@/app/context/context";
import styles from './Cart.module.css'
import { useEffect, useState } from "react";
import { createCart, getCart, getRelated } from "@/app/lib/shopify";
import ColectionCard from "../conlectionCard/ColectionCard";
function Cart() {
    const { isOpen, setIsOpen ,cart} = useCart();
    const [cartItems,setCartItems]=useState([])
    
    // get shop Data
    
    const closeCart=()=>{
      setIsOpen(!isOpen)
    }
    const [relatedProducts,setRelatedProducts]=useState([])
    
    const loadCart = async () => {
      try {
        const cartData = await getCart(cart);
        if (cartData) {
            setCartItems(cartData.body.data?.cart)
            console.log(cartData.body.data?.cart)
          // setCartItems(cartData.body.data?.cart?.lines.edges)
          // const newCartItems = cartData.lineItems.edges.map(edge => ({
          //   id: edge?.node.id,
          //   title: edge?.node.title,
          //   variantId: edge?.node.variant.id,
          //   quantity: edge?.node.quantity,
          //   image: edge?.node.variant.image ? edge.node.variant.image.src : '',
          //   price: edge?.node.variant.priceV2.amount,
          //   currency: edge?.node.variant.priceV2.currencyCode,
          // }));
          // setCart(newCartItems);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    useEffect(()=>{
      loadCart()
    },[isOpen])
//  useEffect(()=>{
//   const related=async ()=>{
//     const randomizeditem=Math.floor(Math.random() * cart.length)
//     const relatedproducts=await getRelated(cart[randomizeditem]?.tags)
//     setRelatedProducts(relatedproducts.body.data.products.edges)
    
//   }
//   related()
//  },[cart])

  return (
    <div className={isOpen!==false?styles.contain:styles.closeCart}>
      <div className={styles.cartDrawer}>
        <div className={styles.related}>
          <div className={styles.relatedHeader}>
          <h2>Related Items</h2>
          </div>
          <div>
            {/* {relatedProducts.map((e,i)=>{
              return <ColectionCard 
              key={i}
              pic={e.node.images.edges[0].node.src}
              title={e?.node?.title}
              currency={e?.node?.priceRange?.minVariantPrice?.currencyCode}
              price={e?.node?.priceRange?.minVariantPrice?.amount}
              handle={e?.node?.handle}
              tags={e?.node?.tags}
              />
            })}           */}
          </div>
        </div>
        <div className={styles.bag}>
          <div className={styles.header}>
            <p>your bag</p>
            <p onClick={closeCart}>close</p>
          </div>
          <div >
          {cartItems?.length > 0?<div>items</div>:<h2>your bag is empty</h2>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart





