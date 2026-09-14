// src/utils/session.js

/**
 * Get or create a guest session ID
 * Stores in localStorage for persistence across page reloads
 */
export const getSessionId = () => {
  let sessionId = localStorage.getItem('guestSessionId');
  
  if (!sessionId) {
    // Generate a unique session ID
    sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    localStorage.setItem('guestSessionId', sessionId);
    console.log('🆕 Generated new guest session ID:', sessionId);
  }
  
  return sessionId;
};

/**
 * Clear the guest session (useful for logout)
 */
export const clearSessionId = () => {
  localStorage.removeItem('guestSessionId');
  console.log('🗑️ Cleared guest session ID');
};

/**
 * Get headers to include in API requests
 */
export const getSessionHeaders = () => {
  const sessionId = getSessionId();
  return {
    'x-session-id': sessionId,
    'Content-Type': 'application/json'
  };
};