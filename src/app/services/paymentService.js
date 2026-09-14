const API_BASE_URL = 'http://localhost:5000/api';

export const paymentService = {
 initiatePayment: async (orderData, returnUrl, cancelUrl) => {
  try {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/payments/initiate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ orderData, returnUrl, cancelUrl })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Initiate payment error:', error);
    throw error;
  }
},
  
  validatePayment: async (tranId, valId, status) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(
        `${API_BASE_URL}/payments/validate?tran_id=${tranId}&val_id=${valId}&status=${status}`,
        { headers }
      );
      
      return await response.json();
    } catch (error) {
      console.error('Validate payment error:', error);
      throw error;
    }
  },
  
  getPaymentStatus: async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_BASE_URL}/payments/status/${orderId}`, { headers });
      return await response.json();
    } catch (error) {
      console.error('Get payment status error:', error);
      throw error;
    }
  }
};