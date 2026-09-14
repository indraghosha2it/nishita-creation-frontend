// utils/pixelEvents.js

// Track events with both Facebook and Google
export const trackEvent = (eventName, eventData = {}) => {
  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, {
      ...eventData,
      currency: eventData.currency || 'BDT'
    });
    console.log(`📊 Facebook Event: ${eventName}`, eventData);
  }
  
  // Google Analytics (GA4)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventData,
      currency: eventData.currency || 'BDT'
    });
    console.log(`📊 Google Event: ${eventName}`, eventData);
  }
};

// Track ViewContent
export const trackViewContent = (product) => {
  trackEvent('view_item', {
    items: [{
      item_id: product._id || product.id,
      item_name: product.productName,
      price: product.discountPrice || product.regularPrice,
      currency: 'BDT'
    }]
  });
};

// Track AddToCart
export const trackAddToCart = (product, quantity = 1) => {
  trackEvent('add_to_cart', {
    items: [{
      item_id: product._id || product.id,
      item_name: product.productName,
      price: product.discountPrice || product.regularPrice,
      quantity: quantity,
      currency: 'BDT'
    }]
  });
};

// Track InitiateCheckout
export const trackInitiateCheckout = (cartItems, subtotal) => {
  const items = cartItems.map(item => ({
    item_id: item.productId || item._id,
    item_name: item.productName,
    price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice,
    quantity: item.quantity,
    currency: 'BDT'
  }));
  
  trackEvent('begin_checkout', {
    items: items,
    value: subtotal,
    currency: 'BDT',
    coupon: null
  });
};

// Track Purchase
export const trackPurchase = (orderData) => {
  const items = orderData.items?.map(item => ({
    item_id: item.productId,
    item_name: item.productName,
    price: item.discountPrice || item.regularPrice,
    quantity: item.quantity || 1,
    currency: 'BDT'
  })) || [];
  
  trackEvent('purchase', {
    transaction_id: orderData.orderNumber || orderData._id,
    value: orderData.total,
    currency: 'BDT',
    items: items,
    shipping: orderData.shippingCost || 0,
    tax: 0,
    coupon: orderData.couponCode || null
  });
};

// Track AddPaymentInfo
export const trackAddPaymentInfo = (paymentMethod) => {
  trackEvent('add_payment_info', {
    payment_type: paymentMethod,
    currency: 'BDT'
  });
};