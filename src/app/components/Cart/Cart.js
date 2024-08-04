'use client'
import { useCart } from "@/app/context/context";
import styles from './Cart.module.css'
import { useEffect, useState } from "react";
import ColectionCard from "../conlectionCard/ColectionCard";
import CartItemsCard from "./CartItemsCard";
import { emptycart, getRelated } from "@/app/lib/shopify";
import Link from "next/link";
function Cart() {
    const { isOpen, setIsOpen ,cart,cartItems,setCartItems} = useCart();
    const [lineItems,setLineItems]=useState([])
    const [relatedProducts,setRelatedProducts]=useState([])
    const baseUrl = 'http://localhost:3000';
    const [cost,setcost]=useState({
      totalTaxAmount:{amount:0},
      subtotalAmount:{amount:0},
      totalAmount:{amount:0}
    })
    const shopName=async()=>{
      const shopdata=await fetch('/api/getshopdata',{cache:'no-store'})
      const res=await shopdata.json()
      return res?.msg?.name
    }
    const closeCart=()=>{
      setIsOpen(!isOpen)
    } 

    useEffect(()=>{
    setLineItems(cartItems?.lines?.edges)
    setcost(cartItems?.estimatedCost)
    const related=async ()=>{
    const randomizeditem=Math.floor(Math.random() * cartItems?.lines?.edges?.length)
    const relateddata= await fetch(`${baseUrl}/api/getRelated`,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({handle:cartItems?.lines?.edges[randomizeditem]?.node?.merchandise?.product?.tags}) ,
      cache: 'no-store' 
    })
    const res=await relateddata.json()
    if(res.msg){
      setRelatedProducts(res.msg)
    }

    }
    related()
    },[cartItems])

    const clearCart = async () => {
      try {
        // Collecting all line IDs from the cart items
        const lineIds = cartItems.lines.edges.map(e => e.node.id);
        const data= await fetch(`${baseUrl}/api/emptycart`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({cart:cart,lines:lineIds}),
          cache:'no-store'
        })
      } catch (error) {
        console.error('Error during cart clearance:', error);
      }
      window.localStorage.setItem(`${await shopName()}:newitem`,'dirty')
    };
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
              // display name
              key={i}
              pic={e.node.images.edges[0].node.src}
              title={e?.node?.title}
              currency={e?.node?.priceRange?.minVariantPrice?.currencyCode}
              price={e?.node?.priceRange?.minVariantPrice?.amount}
              handle={e?.node?.handle}
              tags={e?.node?.tags}
              variants={e.node.variants}
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
            data={e}

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
        <Link href={`${cartItems?.checkoutUrl}`}>check out</Link>
      
        <p onClick={()=>{clearCart()}}>empty cart</p>
        </div>
      </div>
    </div>
  )
}

export default Cart





