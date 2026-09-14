// components/ProtectedRoute.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

export default function ProtectedRoute({ children, pageKey }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
          router.push('/login');
          return;
        }

        const user = JSON.parse(userData);
        
        // Super Admin has access to everything
        if (user.role === 'super_admin') {
          setIsAuthorized(true);
          setLoading(false);
          return;
        }

        // Check if user has access to this page
        const dashboardAccess = user.dashboardAccess || [];
        
        // For backward compatibility - map old keys to new keys
        const oldToNewKeyMap = {
          'analytics': 'dashboard',
          'orders': 'all_orders',
          'products': 'all_products',
          'banners': 'manage_banner',
          'content': 'manage_navbar',
          'users': 'manage_users',
          'roles': 'role_management',
          'delivery': 'delivery_settings',
          'media': 'media_library',
          'homepage': 'manage_homepage',
          'reviews': 'manage_reviews',
          'settings': 'settings',
           'why_choose_us': 'manage_why_choose_us' 
        };

        const mappedKey = oldToNewKeyMap[pageKey] || pageKey;
        
        if (dashboardAccess.includes(mappedKey) || dashboardAccess.includes(pageKey)) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Error checking page access:', error);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [pageKey, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. Please contact your administrator.
          </p>
          <button
            onClick={() => router.push('/authorize/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition-opacity"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return children;
}