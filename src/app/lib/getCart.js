export const loadCart = async (cart,setCartItems) => {
    try {
      if(cart){
        const dev = process.env.NODE_ENV !== 'production';
        const baseurl = dev ? 'http://localhost:3000' : 'https://sampleshop.vercel.app/';
  
      const data=await fetch(`${baseurl}/api/getCart`,{
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