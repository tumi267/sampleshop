'use client'
import { useCart } from "@/app/context/context";
import styles from './Cart.module.css'
import { useEffect, useState } from "react";
import ColectionCard from "../conlectionCard/ColectionCard";
import CartItemsCard from "./CartItemsCard";
import { emptycart, getRelated } from "@/app/lib/shopify";
function Cart() {
    const { isOpen, setIsOpen ,cart,cartItems,setCartItems} = useCart();
    const [lineItems,setLineItems]=useState([])
    const [relatedProducts,setRelatedProducts]=useState([])
    const [cost,setcost]=useState({
      totalTaxAmount:{amount:0},
      subtotalAmount:{amount:0},
      totalAmount:{amount:0}
    })
    const shopName=`shopName`
    const closeCart=()=>{
      setIsOpen(!isOpen)
    } 

 
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

    const clearCart = async () => {
      try {
        // Collecting all line IDs from the cart items
        const lineIds = cartItems.lines.edges.map(e => e.node.id);
    
        // Calling emptycart with the list of all line IDs
        const response = await emptycart(cart, lineIds);
    
        console.log('Batch removal response:', response);
      } catch (error) {
        console.error('Error during cart clearance:', error);
      }
      window.localStorage.setItem(`${shopName}:newitem`,'dirty')
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
        <button>check out</button>
        <p onClick={()=>{clearCart()}}>empty cart</p>
        </div>
      </div>
    </div>
  )
}

export default Cart





