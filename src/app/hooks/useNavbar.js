'use client';

import { useState, useEffect } from 'react';

export function useNavbar() {
  const [navbarData, setNavbarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar`, { headers });
        const data = await response.json();
        
        if (data.success) {
          setNavbarData(data.data);
          setError(null);
        } else {
          setError(data.error || 'Failed to fetch navbar');
          // Set default values if API fails
          setNavbarData({
            logo: {
              text: 'Hyper',
              highlightText: 'Volt',
              icon: 'Zap',
              logoUrl: ''
            }
          });
        }
      } catch (err) {
        console.error('Error fetching navbar:', err);
        setError(err.message);
        // Set default values if API fails
        setNavbarData({
          logo: {
            text: 'Hyper',
            highlightText: 'Volt',
            icon: 'Zap',
            logoUrl: ''
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNavbar();
  }, []);

  return { navbarData, loading, error };
}