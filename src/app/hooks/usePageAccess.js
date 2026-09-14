// hooks/usePageAccess.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function usePageAccess(pageKey) {
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
          'settings': 'settings'
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

  return { isAuthorized, loading };
}