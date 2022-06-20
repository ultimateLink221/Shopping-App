import { createContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartPrice, setCartPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
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

  const handleCart = (price) => {
    setCartCount(cartCount + 1);
    setCartPrice((parseFloat(cartPrice) + parseFloat(price.app_sale_price)));
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