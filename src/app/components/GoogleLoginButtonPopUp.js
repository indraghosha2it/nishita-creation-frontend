// components/GoogleLoginButtonPopUp.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import axios from 'axios';

const GoogleLoginButtonPopUp = ({ 
  mode = 'login', 
  onSuccess, 
  onError,
  onSignupSuccess // New callback for signup
}) => {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const processGoogleUser = async (user) => {
    try {
      const idToken = await user.getIdToken();
      const endpoint = mode === 'login' ? '/api/auth/google' : '/api/auth/google-signup';
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        { 
          idToken,
          ...(mode === 'signup' && {
            userType: 'customer',
            source: 'google_signup'
          })
        }
      );

      const { token, user: userData, requiresAdditionalInfo, isNewUser } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if (onSuccess) onSuccess(response.data);

      // Handle signup separately - redirect to profile
      if (mode === 'signup' && isNewUser) {
        if (requiresAdditionalInfo) {
          router.push('/customer/settings');
        } else {
          router.push('/customer/dashboard');
        }
        // Call signup success callback if provided
        if (onSignupSuccess) {
          onSignupSuccess(userData);
        }
      }
      // For login, stay on current page (no redirect)
      
      return response.data;
    } catch (error) {
      console.error('Google auth processing error:', error);
      throw error;
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await processGoogleUser(result.user);
      
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Google login popup closed by user - no action needed');
        return;
      }
      
      let errorMessage = mode === 'login' ? 'Google login failed' : 'Google signup failed';
      
      if (error.response) {
        errorMessage = error.response.data.error || errorMessage;
        if (error.response.status === 409) {
          errorMessage = 'An account with this email already exists. Please login instead.';
        }
      } else if (error.code) {
        switch (error.code) {
          case 'auth/cancelled-popup-request':
            errorMessage = 'Authentication cancelled';
            break;
          case 'auth/popup-blocked':
            errorMessage = 'Popup was blocked by browser. Please allow popups.';
            break;
          case 'auth/account-exists-with-different-credential':
            errorMessage = 'An account already exists with the same email but different sign-in method.';
            break;
          default:
            errorMessage = error.message;
        }
      }
      
      if (onError && error.code !== 'auth/popup-closed-by-user') {
        onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-500">
        <span>Loading Google auth...</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing...</span>
        </div>
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>{mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}</span>
        </>
      )}
    </button>
  );
};

export default GoogleLoginButtonPopUp;