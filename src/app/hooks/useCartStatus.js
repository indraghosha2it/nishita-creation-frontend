import { useState, useEffect } from 'react';

export const useCartStatus = (productId) => {
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItemId, setCartItemId] = useState(null);

  const checkCartStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch('http://localhost:5000/api/cart', { headers });
      
      if (response.ok) {
        const data = await response.json();
        const cart = data.data;
        
        if (cart && cart.items) {
          const foundItem = cart.items.find(item => item.productId === productId);
          setIsInCart(!!foundItem);
          setCartItemId(foundItem?._id || null);
        }
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
      setIsInCart(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkCartStatus();
  }, [productId]);

  // Listen for cart updates to refresh status
  useEffect(() => {
    const handleCartUpdate = () => {
      checkCartStatus();
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [productId]);

  return { isInCart, loading, cartItemId, refetch: checkCartStatus };
};