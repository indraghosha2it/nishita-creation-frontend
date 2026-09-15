// 'use client';

// import { useState, useEffect } from 'react';

// export function useNavbar() {
//   const [navbarData, setNavbarData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNavbar = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const headers = {};
//         if (token) {
//           headers['Authorization'] = `Bearer ${token}`;
//         }
        
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar`, { headers });
//         const data = await response.json();
        
//         if (data.success) {
//           setNavbarData(data.data);
//           setError(null);
//         } else {
//           setError(data.error || 'Failed to fetch navbar');
//           // Set default values if API fails
//           setNavbarData({
//             logo: {
//               text: 'Hyper',
//               highlightText: 'Volt',
//               icon: 'Zap',
//               logoUrl: ''
//             }
//           });
//         }
//       } catch (err) {
//         console.error('Error fetching navbar:', err);
//         setError(err.message);
//         // Set default values if API fails
//         setNavbarData({
//           logo: {
//             text: 'Hyper',
//             highlightText: 'Volt',
//             icon: 'Zap',
//             logoUrl: ''
//           }
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNavbar();
//   }, []);

//   return { navbarData, loading, error };
// }


'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const DEFAULT_NAVBAR = {
  items: [
    { id: '1', name: 'ALL PRODUCTS', href: '/products', type: 'link', isActive: true },
    { id: '2', name: 'SALE OFFER', href: '/sale', type: 'link', isActive: true, highlight: true },
    { id: '3', name: 'NEW ARRIVALS', href: '/new-arrivals', type: 'link', isActive: true },
    { id: '4', name: 'BEST SELLERS', href: '/best-sellers', type: 'link', isActive: true },
  ],
  logo: {
    text: 'Nishat Creation',
    highlightText: 'Nishat Creation',
    icon: 'Flower2',
    logoUrl: ''
  },
  topBar: {
    phone: '+880 1XXXXXXXXX',
    phoneLink: '/contact',
    showTrackOrder: true,
    trackOrderLink: '/track',
    trackOrderText: 'Track Order',
    showOutlet: true,
    outletText: 'Our Outlet'
  },
  outlet: {
    name: 'Main Outlet',
    address: '',
    phone: '',
    email: '',
    googleMapsEmbedUrl: '',
    googleMapsLink: ''
  },
  searchPlaceholders: [
    'Search Products...',
    'Makeup...',
    'Skincare...',
    'Hair Care...',
    'Serum...',
    'Moisturizer...'
  ],
  styling: {
    primaryColor: '#8B9D83',
    primaryLight: '#A8B8A0',
    primaryDark: '#6B7D63',
    backgroundColor: '#F1EFE3',
    textColor: '#292725',
    accentColor: '#d83a38'
  },
  categories: []
};

export function useNavbar() {
  const [navbarData, setNavbarData] = useState(DEFAULT_NAVBAR);
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
        
        const response = await fetch(`${API_URL}/api/navbar`, { headers });
        const data = await response.json();
        
        if (data.success && data.data) {
          setNavbarData({
            ...DEFAULT_NAVBAR,
            ...data.data,
            items: data.data.items?.length > 0 ? data.data.items : DEFAULT_NAVBAR.items
          });
          setError(null);
        } else {
          setError(data.error || 'Failed to fetch navbar');
          setNavbarData(DEFAULT_NAVBAR);
        }
      } catch (err) {
        console.error('Error fetching navbar:', err);
        setError(err.message);
        setNavbarData(DEFAULT_NAVBAR);
      } finally {
        setLoading(false);
      }
    };

    fetchNavbar();
  }, []);

  return { navbarData, loading, error };
}