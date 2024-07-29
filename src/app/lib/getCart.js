import { getCart } from "./shopify";

export const loadCart = async (cart,setCartItems) => {
    try {
      if(cart){
      const cartData = await getCart(cart);
      if (cartData) {
            setCartItems(cartData.body.data?.cart)
      }
    }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };