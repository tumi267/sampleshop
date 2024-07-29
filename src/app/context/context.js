'use client'
import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems,setCartItems] = useState(null);
  const [checkoutId, setCheckoutId] = useState(null)
  // Add cart-related logic here if needed

  return (
    <CartContext.Provider value={{ cart, setCart, isOpen, setIsOpen,checkoutId, setCheckoutId,cartItems,setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
    return useContext(CartContext);
  }