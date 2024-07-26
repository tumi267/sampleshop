'use client'
import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // Add cart-related logic here if needed

  return (
    <CartContext.Provider value={{ cart, setCart, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
    return useContext(CartContext);
  }