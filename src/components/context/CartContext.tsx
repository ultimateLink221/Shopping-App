import { createContext, useState, useEffect } from "react";

interface CartContextInterface {
  cartPrice: number;
  setCartPrice: any;
  cartCount: number; 
  setCartCount: any; 
  cartItems: any[]; 
  setCartItems: any; 
  cartImage: string; 
  setCartImage: any; 
  handleCart: any; 
  handleClearCart: any;
}

const CartContext = createContext<Partial<CartContextInterface>>({});

export const CartProvider = ({ children }: any) => {
  const [cartPrice, setCartPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartImage, setCartImage] = useState('');

  useEffect(() => {
    const storedPrice = window.localStorage.getItem('CART_PRICE');
    if (storedPrice !== null) setCartPrice(JSON.parse(storedPrice));

    const storedCount = window.localStorage.getItem('CART_COUNT');
    if (storedCount !== null) setCartCount(JSON.parse(storedCount));

  }, []);
  
  useEffect(() => {
    window.localStorage.setItem('CART_PRICE', JSON.stringify(cartPrice));
    window.localStorage.setItem('CART_COUNT', JSON.stringify(cartCount));
  }, [cartPrice]);

  const handleCart = (price: any) => {
    setCartCount(cartCount + 1);
    setCartPrice((parseFloat((cartPrice).toFixed(2)) + parseFloat(price.app_sale_price)));
    setCartItems([...cartItems, price]);

  }

  const handleClearCart = () => {
    setCartCount(0);
    setCartPrice(0);
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{cartPrice, setCartPrice, cartCount, setCartCount, cartItems, setCartItems, cartImage, setCartImage, handleCart, handleClearCart}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext;