'use client'
import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState(null)
  // Add cart-related logic here if needed

  return (
    <CartContext.Provider value={{ cart, setCart, isOpen, setIsOpen,checkoutId, setCheckoutId }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
    return useContext(CartContext);
  }