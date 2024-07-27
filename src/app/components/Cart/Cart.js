'use client'
import { useCart } from "@/app/context/context";
import styles from './Cart.module.css'
import { useEffect, useState } from "react";
import ColectionCard from "../conlectionCard/ColectionCard";
import { loadCart } from "@/app/lib/getCart";
import CartItemsCard from "./CartItemsCard";
import { getRelated } from "@/app/lib/shopify";
function Cart() {
    const { isOpen, setIsOpen ,cart} = useCart();
    const [cartItems,setCartItems]=useState([])
    const [lineItems,setLineItems]=useState([])
    const [relatedProducts,setRelatedProducts]=useState([])
    const [cost,setcost]=useState({
      totalTaxAmount:{amount:0},
      subtotalAmount:{amount:0},
      totalAmount:{amount:0}
    })
    const closeCart=()=>{
      setIsOpen(!isOpen)
    } 

    useEffect(()=>{
      loadCart(cart,setCartItems)

    },[isOpen])
    useEffect(()=>{
    setLineItems(cartItems?.lines?.edges)
    setcost(cartItems?.estimatedCost)
    const related=async ()=>{
    const randomizeditem=Math.floor(Math.random() * cartItems?.lines?.edges?.length)
    const relatedproducts=await getRelated(cartItems?.lines?.edges[randomizeditem]?.node?.merchandise?.product?.tags)
    setRelatedProducts(relatedproducts.body.data.products.edges)
    }
    related()
    },[cartItems])

  return (
    <div className={isOpen!==false?styles.contain:styles.closeCart}>
      <div className={styles.cartDrawer}>
        <div className={styles.related}>
          <div className={styles.relatedHeader}>
          <h2>Related Items</h2>
          </div>
          <div>
            {relatedProducts.map((e,i)=>{
              return <ColectionCard 
              key={i}
              pic={e.node.images.edges[0].node.src}
              title={e?.node?.title}
              currency={e?.node?.priceRange?.minVariantPrice?.currencyCode}
              price={e?.node?.priceRange?.minVariantPrice?.amount}
              handle={e?.node?.handle}
              tags={e?.node?.tags}
              variants={e.node.variants.edges}
              />
            })}          
          </div>
        </div>
        <div className={styles.bag}>
          <div className={styles.header}>
            <p>your bag</p>
            <p onClick={closeCart}>close</p>
          </div>
          <div >
          {cartItems?.lines?.edges.length > 0?<div>{lineItems?.map((e,i)=>{
            return <CartItemsCard
            key={i}
            pic={e?.node?.merchandise?.image?.src}
            name={e?.node?.merchandise?.product?.title}
            price={e?.node?.merchandise?.price}
            qty={e?.node?.quantity}
            />
          })}</div>:<h2>your bag is empty</h2>}
          </div>
          <hr/>
          <h3>Total</h3>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Tax</td>
                <td>{cost?.totalTaxAmount?.amount}</td>
              </tr>
              <tr>
                <td>Subtotal Amount</td>
               <td>{cost?.subtotalAmount?.amount}</td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td>{cost?.totalAmount?.amount}</td>
              </tr>
            </tbody>
        </table> 
        </div>
      </div>
    </div>
  )
}

export default Cart





