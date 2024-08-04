'use client';

import Image from "next/image";
import styles from './Cart.module.css';
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/context";
import { removeCartLineItems, updateCartItem } from "@/app/lib/shopify";

function CartItemsCard({ data }) {
  // Extract necessary properties from context and props
  const { cart } = useCart();
  const shopName=async()=>{
    const shopdata=await fetch('/api/getshopdata',{cache:'no-store'})
    const res=await shopdata.json()
    return res?.msg?.name
  } // Replace with actual shop name or value if dynamic
  const { id, merchandise, quantity } = data.node;
  const { image, product, price } = merchandise;

  // Initialize state for quantity
  const [qtyAmount, setQtyAmount] = useState(quantity);
  // base url
  const baseUrl = 'http://localhost:3000';
  // Function to update quantity based on action type
  const updateQty = async (input) => {
    switch (input) {
      case 0: // Decrement quantity
        setQtyAmount(prevQty => Math.max(prevQty - 1, 1)); // Ensure quantity doesn't go below 1
        break;
      case 1: // Increment quantity
    // need a case where qty is not tracked
        setQtyAmount(prevQty => {
          const maxQty = merchandise.quantityAvailable; // Get max available quantity
          if(maxQty>0){
            return Math.min(prevQty + 1, maxQty); // Ensure quantity doesn't exceed max available
            }else{
              return prevQty+1
            }
        });
        break;
      case 2: // Update cart item
        // const result = await updateCartItem(cart, id, qtyAmount);
        
        const data= await fetch(`${baseUrl}/api/updateCartItem`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({cart:cart,id:id,qtyAmount:qtyAmount}),
          cache:'no-store'
        })
        const res=await data.json()

        if (res.msg) {
          window.localStorage.setItem(`${await shopName()}:newitem`, 'dirty'); // Mark as 'dirty'
        }
        break;
      case 3://remove cart item
        // const remove=await removeCartLineItems(cart,id)
        const remove= await fetch(`${baseUrl}/api/removeCartLineItems`,{
          method:'POST',
          headers:{'Content-Type':'Application/json'},
          body:JSON.stringify({cart:cart,id:id})
        })
        const res1=await remove.json()
        if(res1.msg){
          window.localStorage.setItem(`${await shopName()}:newitem`, 'dirty'); // Mark as 'dirty'
        }
        break;
      default:
        console.log('Unknown action type');
        break;
    }
  };

  // Handle input change for quantity
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
  
    const available = merchandise.quantityAvailable; // Get available quantity
    setQtyAmount(value > available ? available : value); // Set quantity ensuring it doesn't exceed available
  };

  // Update cart when qtyAmount changes and is different from initial quantity
  useEffect(() => {
    if (quantity !== qtyAmount) {
      updateQty(2);
    }
  }, [qtyAmount]);

  return (
    <div>
      <div className={styles.cartImage}>
        <Image
          src={image?.src}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={`image-${product?.title}`}
        />
      </div>
      <p>{product?.title}</p>
      <button onClick={() => updateQty(0)}>-</button>
      <input
        type="number"
        value={qtyAmount}
        onChange={handleInputChange}
        min="1" // Ensure input is at least 1
      />
      <button onClick={() => updateQty(1)}>+</button>
      <p>{price?.amount}</p>
      <p onClick={()=>updateQty(3)}>scrap item</p>
    </div>
  );
}

export default CartItemsCard;