import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  
  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
