import { getCart } from "./shopify";

export const loadCart = async (cart,setCartItems) => {
    try {
        // console.log(cart)
      const cartData = await getCart(cart);
     
      if (cartData) {
        if(setCartItems){
            setCartItems(cartData.body.data?.cart)
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };