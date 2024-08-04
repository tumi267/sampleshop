export const loadCart = async (cart,setCartItems) => {
    try {
      if(cart){
        const baseUrl = 'http://localhost:3000';
  
      const data=await fetch(`${baseUrl}/api/getCart`,{
        method:'POST',
        headers:{
          'Content-Type':'Application/json'
        },
        body:JSON.stringify({checkoutId:cart}),
        cache:'no-store'
      })
      const cartdata=await data.json()
      if (cartdata.msg) {
            setCartItems(cartdata.msg)
      }
    }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };