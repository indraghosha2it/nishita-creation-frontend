
// // components/UnifiedPopupManager.js working properly on localhost
// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { usePathname } from 'next/navigation';
// import PromotionalModal from './PromotionalModal';
// import NewsletterPopup from './NewsletterPopup';

// export default function UnifiedPopupManager() {
//   const pathname = usePathname();
//   const [popupConfig, setPopupConfig] = useState(null);
//   const [configLoaded, setConfigLoaded] = useState(false);
//   const [showPromotional, setShowPromotional] = useState(false);
//   const [showNewsletter, setShowNewsletter] = useState(false);
//   const [promotionalProducts, setPromotionalProducts] = useState([]);
//   const [currentProductIndex, setCurrentProductIndex] = useState(0);
//   const [promotionalShowCount, setPromotionalShowCount] = useState(0);
//   const [newsletterShowCount, setNewsletterShowCount] = useState(0);
//   const [promotionalIntervals, setPromotionalIntervals] = useState([]);
//   const [promotionalMaxShows, setPromotionalMaxShows] = useState(3);
//   const [isUserSubscribed, setIsUserSubscribed] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [subscriptionChecked, setSubscriptionChecked] = useState(false);
//   const [shouldHideAll, setShouldHideAll] = useState(false);
//   const [shouldHideNewsletter, setShouldHideNewsletter] = useState(false);
  
//   const timerRef = useRef(null);
//   const intervalRef = useRef(null);
//   const isMountedRef = useRef(true);
//   const lastPathnameRef = useRef(pathname);
  
//   // Different hide paths for different popups
//   const hideAllPaths = ['/admin', '/moderator', '/customer'];
//   const hideNewsletterOnlyPaths = ['/login', '/register'];
  
//   // Helper function to normalize paths
//   const normalizePath = (path) => {
//     if (!path) return '/';
//     let normalized = path === '/' ? '/' : path.replace(/\/$/, '');
//     normalized = normalized.split('?')[0];
//     return normalized;
//   };
  
//   // Update hide states when pathname changes
//   useEffect(() => {
//     const hideAll = hideAllPaths.some(path => pathname?.startsWith(path));
//     const hideNewsletter = hideAll || hideNewsletterOnlyPaths.some(path => pathname?.startsWith(path));
    
//     setShouldHideAll(hideAll);
//     setShouldHideNewsletter(hideNewsletter);
    
//     console.log('🔍 Path updated - Current path:', pathname);
//     console.log('🔍 Should hide all popups:', hideAll);
//     console.log('🔍 Should hide newsletter only:', hideNewsletter);
//   }, [pathname]);
  
//   // Check if user is subscribed to newsletter
//   const checkUserSubscription = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const userData = localStorage.getItem('user');
      
//       if (token && userData) {
//         setIsLoggedIn(true);
//         const response = await fetch('http://localhost:5000/api/auth/subscription-status', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const data = await response.json();
//         if (data.success) {
//           setIsUserSubscribed(data.isSubscribed);
//           console.log('📧 User subscription status:', data.isSubscribed);
//         }
//       } else {
//         setIsLoggedIn(false);
//         setIsUserSubscribed(false);
//       }
//     } catch (error) {
//       console.error('Error checking subscription:', error);
//       setIsUserSubscribed(false);
//     } finally {
//       setSubscriptionChecked(true);
//     }
//   };
  
//   // Detect hard reload
//   const isHardReload = () => {
//     if (typeof window !== 'undefined' && performance) {
//       const nav = performance.getEntriesByType('navigation')[0];
//       if (nav) {
//         return nav.type === 'reload';
//       }
//     }
//     const lastLoadTime = sessionStorage.getItem('lastLoadTime');
//     const now = Date.now();
//     if (lastLoadTime && (now - parseInt(lastLoadTime)) < 2000) {
//       return true;
//     }
//     sessionStorage.setItem('lastLoadTime', now.toString());
//     return false;
//   };
  
//   // Reset counters on hard reload
//   useEffect(() => {
//     if (isHardReload()) {
//       console.log('🔄 Hard reload detected! Resetting all popup counters...');
//       localStorage.removeItem('promotionalShowCount');
//       localStorage.removeItem('newsletterShowCount');
//       setPromotionalShowCount(0);
//       setNewsletterShowCount(0);
//     }
//   }, []);
  
//   // Check subscription status on mount and auth change
//   useEffect(() => {
//     checkUserSubscription();
    
//     const handleAuthChange = () => {
//       console.log('🔄 Auth change detected, checking subscription...');
//       checkUserSubscription();
//     };
    
//     window.addEventListener('auth-change', handleAuthChange);
//     return () => window.removeEventListener('auth-change', handleAuthChange);
//   }, []);
  
//   // Cleanup on unmount
//   useEffect(() => {
//     isMountedRef.current = true;
//     return () => {
//       isMountedRef.current = false;
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       if (intervalRef.current) {
//         clearTimeout(intervalRef.current);
//         intervalRef.current = null;
//       }
//     };
//   }, []);
  
//   // Get category ID from URL params (for products page)
//   const getCategoryFromURL = () => {
//     try {
//       const urlParams = new URLSearchParams(window.location.search);
//       const categoryParam = urlParams.get('category');
      
//       if (categoryParam) {
//         console.log('📦 Found category parameter in URL:', categoryParam);
//         return categoryParam;
//       }
//     } catch (error) {
//       console.error('Error getting category from URL:', error);
//     }
//     return null;
//   };
  
//   // Get current product's category ID from product details page
//   const getCurrentProductCategory = async () => {
//     try {
//       const urlParams = new URLSearchParams(window.location.search);
//       const productId = urlParams.get('id');
      
//       if (!productId) {
//         console.log('No product ID found in URL');
//         return null;
//       }
      
//       console.log('📦 Fetching product details for ID:', productId);
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`);
//       const data = await response.json();
      
//       if (data.success && data.data) {
//         const product = data.data;
//         let categoryId = null;
//         if (product.category) {
//           if (typeof product.category === 'object' && product.category._id) {
//             categoryId = product.category._id;
//           } else if (typeof product.category === 'string') {
//             categoryId = product.category;
//           }
//         }
//         console.log('✅ Current product category ID:', categoryId);
//         return categoryId;
//       }
//     } catch (error) {
//       console.error('Error fetching product category:', error);
//     }
//     return null;
//   };
  
//   // Fetch promotional products function
//   // const fetchPromotionalProducts = async (currentCount, currentPathname, currentCategoryId = null) => {
//   //   try {
//   //     console.log('📡 Fetching promotional products...');
//   //     console.log('Current path:', currentPathname);
//   //     console.log('Category filter:', currentCategoryId);
      
//   //     // Build URL with query params
//   //     let url = 'http://localhost:5000/api/promotional';
//   //     if (currentCategoryId) {
//   //       url += `?categoryId=${currentCategoryId}`;
//   //       console.log('🔍 Filtering by category ID:', currentCategoryId);
//   //     } else {
//   //       console.log('🔍 No category filter - showing latest products');
//   //     }
      
//   //     const response = await fetch(url);
//   //     const data = await response.json();
      
//   //     console.log('📦 Promotional products response:', data);
      
//   //     if (data.success && data.data.isActive && data.data.products && data.data.products.length > 0) {
//   //       console.log('✅ Total products from API:', data.data.products.length);
        
//   //       const currentPath = normalizePath(currentPathname);
//   //       console.log('📍 Current page path (normalized):', currentPath);
        
//   //       // First filter by page permissions
//   //       const productsAllowedOnPage = data.data.products.filter(product => {
//   //         if (product.showOnPages && Array.isArray(product.showOnPages) && product.showOnPages.length > 0) {
//   //           const normalizedShowOnPages = product.showOnPages.map(page => normalizePath(page));
//   //           const isAllowed = normalizedShowOnPages.includes(currentPath);
//   //           console.log(`📌 Product "${product.productName?.substring(0, 40)}" allowed on ${currentPath}: ${isAllowed}`);
//   //           return isAllowed;
//   //         }
//   //         console.log(`⚠️ Product "${product.productName?.substring(0, 40)}" has no page restrictions - NOT SHOWING`);
//   //         return false;
//   //       });
        
//   //       console.log(`📊 Products after page filter: ${productsAllowedOnPage.length} of ${data.data.products.length}`);
        
//   //       if (productsAllowedOnPage.length === 0) {
//   //         console.log('⚠️ No products available for current page after page filter');
//   //         setPromotionalProducts([]);
//   //         setConfigLoaded(true);
//   //         return;
//   //       }
        
//   //       console.log('🎯 Setting promotional products:', productsAllowedOnPage.map(p => p.productName));
//   //       setPromotionalProducts(productsAllowedOnPage);
//   //       setPromotionalIntervals(data.data.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }]);
//   //       setPromotionalMaxShows(data.data.maxShows || 3);
        
//   //       if (currentCount >= (data.data.maxShows || 3)) {
//   //         console.log('🎯 Already shown maximum times');
//   //         setConfigLoaded(true);
//   //         return;
//   //       }
        
//   //       // Clear any existing timer
//   //       if (timerRef.current) {
//   //         clearTimeout(timerRef.current);
//   //       }
        
//   //       const firstDelay = (data.data.intervals?.[0]?.delay || 5) * 1000;
//   //       console.log(`🎯 Will show popup in ${firstDelay/1000}s`);
        
//   //       timerRef.current = setTimeout(() => {
//   //         if (isMountedRef.current) {
//   //           console.log('🎯 SHOWING PROMOTIONAL POPUP!');
//   //           setShowPromotional(true);
//   //         }
//   //         timerRef.current = null;
//   //       }, firstDelay);
        
//   //     } else {
//   //       console.log('⚠️ No promotional products found');
//   //       setPromotionalProducts([]);
//   //       setConfigLoaded(true);
//   //     }
//   //   } catch (error) {
//   //     console.error('❌ Error fetching promotional products:', error);
//   //     setPromotionalProducts([]);
//   //     setConfigLoaded(true);
//   //   }
//   // };

// // In UnifiedPopupManager.js - Update fetchPromotionalProducts workd for cat filter

// // const fetchPromotionalProducts = async (currentCount, currentPathname, currentCategoryId = null, isProductDetails = false) => {
// //   try {
// //     console.log('📡 Fetching promotional products...');
// //     console.log('Current path:', currentPathname);
// //     console.log('Category filter:', currentCategoryId);
// //     console.log('Is product details page:', isProductDetails);
    
// //     // Build URL with query params
// //     let url = 'http://localhost:5000/api/promotional';
// //     const params = new URLSearchParams();
    
// //     if (currentCategoryId) {
// //       params.set('categoryId', currentCategoryId);
// //     }
    
// //     if (isProductDetails) {
// //       params.set('isProductDetailsPage', 'true');
// //     }
    
// //     if (params.toString()) {
// //       url += `?${params.toString()}`;
// //     }
    
// //     console.log('🔍 Fetching from URL:', url);
    
// //     const response = await fetch(url);
// //     const data = await response.json();
    
// //     console.log('📦 Promotional products response:', data);
    
// //     // Check if we have products
// //     if (data.success && data.data.isActive && data.data.products && data.data.products.length > 0) {
// //       console.log('✅ Total products from API:', data.data.products.length);
      
// //       // Log what products we got
// //       data.data.products.forEach((product, idx) => {
// //         console.log(`Product ${idx + 1}: ${product.productName} - Target Category: ${product.targetCategoryId || 'None'}`);
// //       });
      
// //       const currentPath = normalizePath(currentPathname);
// //       console.log('📍 Current page path (normalized):', currentPath);
      
// //       // Filter by page permissions (showOnPages)
// //       const productsAllowedOnPage = data.data.products.filter(product => {
// //         if (product.showOnPages && Array.isArray(product.showOnPages) && product.showOnPages.length > 0) {
// //           const normalizedShowOnPages = product.showOnPages.map(page => normalizePath(page));
// //           const isAllowed = normalizedShowOnPages.includes(currentPath);
// //           console.log(`📌 Product "${product.productName?.substring(0, 40)}" allowed on ${currentPath}: ${isAllowed}`);
// //           return isAllowed;
// //         }
// //         return true; // If no restrictions, show it
// //       });
      
// //       console.log(`📊 Products after page filter: ${productsAllowedOnPage.length} of ${data.data.products.length}`);
      
// //       if (productsAllowedOnPage.length === 0) {
// //         console.log('⚠️ No products available for current page after page filter');
// //         setPromotionalProducts([]);
// //         setConfigLoaded(true);
// //         return;
// //       }
      
// //       console.log('🎯 Setting promotional products:', productsAllowedOnPage.map(p => p.productName));
// //       setPromotionalProducts(productsAllowedOnPage);
// //       setPromotionalIntervals(data.data.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }]);
// //       setPromotionalMaxShows(data.data.maxShows || 3);
      
// //       if (currentCount >= (data.data.maxShows || 3)) {
// //         console.log('🎯 Already shown maximum times');
// //         setConfigLoaded(true);
// //         return;
// //       }
      
// //       // Clear any existing timer
// //       if (timerRef.current) {
// //         clearTimeout(timerRef.current);
// //       }
      
// //       const firstDelay = (data.data.intervals?.[0]?.delay || 5) * 1000;
// //       console.log(`🎯 Will show popup in ${firstDelay/1000}s`);
      
// //       timerRef.current = setTimeout(() => {
// //         if (isMountedRef.current) {
// //           console.log('🎯 SHOWING PROMOTIONAL POPUP!');
// //           setShowPromotional(true);
// //         }
// //         timerRef.current = null;
// //       }, firstDelay);
      
// //     } else {
// //       console.log('⚠️ No promotional products found');
// //       console.log('Response data:', data);
// //       setPromotionalProducts([]);
// //       setConfigLoaded(true);
// //     }
// //   } catch (error) {
// //     console.error('❌ Error fetching promotional products:', error);
// //     setPromotionalProducts([]);
// //     setConfigLoaded(true);
// //   }
// // };

// // In UnifiedPopupManager.js - Update the fetchPromotionalProducts function

// // In UnifiedPopupManager.js

// const fetchPromotionalProducts = async (currentCount, currentPathname, currentCategoryId = null, isProductDetails = false) => {
//   try {
//     console.log('========================================');
//     console.log('📡 Fetching promotional products...');
//     console.log('Current pathname:', currentPathname);
//     console.log('Category filter:', currentCategoryId);
//     console.log('Is product details page:', isProductDetails);
//     console.log('========================================');
    
//     // Build URL with query params
//     let url = 'http://localhost:5000/api/promotional';
//     const params = new URLSearchParams();
    
//     // ALWAYS pass the current path for page filtering
//     if (currentPathname) {
//       params.set('path', currentPathname);
//     }
    
//     if (currentCategoryId) {
//       params.set('categoryId', currentCategoryId);
//     }
    
//     if (isProductDetails) {
//       params.set('isProductDetailsPage', 'true');
//     }
    
//     if (params.toString()) {
//       url += `?${params.toString()}`;
//     }
    
//     console.log('🔍 Fetching from URL:', url);
    
//     const response = await fetch(url);
//     const data = await response.json();
    
//     console.log('📦 API Response:', data);
    
//     if (data.success && data.data.isActive && data.data.products && data.data.products.length > 0) {
//       console.log('✅ Total products from API:', data.data.products.length);
      
//       // Log each product for debugging
//       data.data.products.forEach((product, idx) => {
//         console.log(`\n📦 Product ${idx + 1}: ${product.productName}`);
//         console.log(`   - Created: ${new Date(product.createdAt).toLocaleString()}`);
//         console.log(`   - Category Restriction: ${product.triggerCategoryName || 'None'}`);
//         console.log(`   - Page Restriction: ${product.showOnPages ? product.showOnPages.join(', ') : 'All pages'}`);
//       });
      
//       // Check if we've already shown max times
//       if (currentCount >= (data.data.maxShows || 3)) {
//         console.log('🎯 Already shown maximum times:', currentCount);
//         setConfigLoaded(true);
//         return;
//       }
      
//       console.log('🎯 Setting promotional products:', data.data.products.map(p => p.productName));
//       setPromotionalProducts(data.data.products);
//       setPromotionalIntervals(data.data.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }]);
//       setPromotionalMaxShows(data.data.maxShows || 3);
      
//       // Clear any existing timer
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//       }
      
//       // Calculate first delay
//       const firstDelay = (data.data.intervals?.[0]?.delay || 5) * 1000;
//       console.log(`⏰ Will show popup in ${firstDelay/1000} seconds`);
      
//       // Set timer to show popup
//       timerRef.current = setTimeout(() => {
//         if (isMountedRef.current) {
//           console.log('🎯 SHOWING PROMOTIONAL POPUP!');
//           setShowPromotional(true);
//         }
//         timerRef.current = null;
//       }, firstDelay);
      
//     } else {
//       console.log('⚠️ No promotional products found');
//       console.log('Response data:', data);
//       setPromotionalProducts([]);
//       setConfigLoaded(true);
//     }
//   } catch (error) {
//     console.error('❌ Error fetching promotional products:', error);
//     setPromotionalProducts([]);
//     setConfigLoaded(true);
//   }
// };
  
//   // Handle promotional modal close
//   const handlePromotionalClose = () => {
//     console.log('🔚 Promotional popup closed');
//     setShowPromotional(false);
    
//     const newCount = promotionalShowCount + 1;
//     setPromotionalShowCount(newCount);
//     localStorage.setItem('promotionalShowCount', newCount.toString());
    
//     // Schedule next promotional popup
//     if (newCount < promotionalMaxShows && promotionalIntervals[newCount]) {
//       const nextDelay = promotionalIntervals[newCount].delay * 1000;
//       console.log(`⏰ Next promotional popup in ${nextDelay/1000}s`);
      
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//       }
      
//       timerRef.current = setTimeout(() => {
//         if (isMountedRef.current) {
//           console.log(`🎯 Showing promotional popup #${newCount + 1}`);
//           setShowPromotional(true);
//         }
//         timerRef.current = null;
//       }, nextDelay);
//     } else {
//       console.log('📅 No more promotional popups to schedule');
//     }
//   };
  
//   // Handle newsletter modal close
//   const handleNewsletterClose = () => {
//     console.log('📧 Newsletter popup closed');
//     setShowNewsletter(false);
    
//     const newCount = newsletterShowCount + 1;
//     setNewsletterShowCount(newCount);
//     localStorage.setItem('newsletterShowCount', newCount.toString());
    
//     if (isUserSubscribed) {
//       console.log('📧 User already subscribed - no more popups');
//       return;
//     }
    
//     if (popupConfig?.newsletter && newCount < popupConfig.newsletter.maxShows) {
//       const intervals = popupConfig.newsletter.intervals;
//       const nextDelay = (intervals[newCount]?.delay || 15) * 1000;
      
//       console.log(`⏰ Next newsletter popup in ${nextDelay/1000}s`);
//       timerRef.current = setTimeout(() => {
//         if (isMountedRef.current) {
//           console.log('📧 Showing next newsletter popup');
//           setShowNewsletter(true);
//         }
//         timerRef.current = null;
//       }, nextDelay);
//     }
//   };
  
//   // Initialize popup system based on current page
//   // const initializePopupSystem = useCallback(async (currentPathname, currentShowCount) => {
//   //   console.log('📡 Initializing popup system for path:', currentPathname);
    
//   //   // Clear any existing timers
//   //   if (timerRef.current) {
//   //     clearTimeout(timerRef.current);
//   //     timerRef.current = null;
//   //   }
    
//   //   // Reset show state
//   //   setShowPromotional(false);
    
//   //   let categoryId = null;
    
//   //   // Get the normalized path without query params
//   //   const normalizedPath = normalizePath(currentPathname);
    
//   //   // Check if on product details page
//   //   const isProductDetailsPage = normalizedPath === '/productDetails';
    
//   //   // Check if on products listing page
//   //   const isProductsPage = normalizedPath === '/products';
    
//   //   if (isProductDetailsPage) {
//   //     console.log('🎯 On product details page - fetching category from current product...');
//   //     categoryId = await getCurrentProductCategory();
//   //     if (categoryId) {
//   //       console.log('✅ Will filter promotional products by product category:', categoryId);
//   //     } else {
//   //       console.log('⚠️ Could not get product category - will show latest products');
//   //     }
//   //   } 
//   //   else if (isProductsPage) {
//   //     console.log('🎯 On products listing page - checking for category filter in URL...');
//   //     const urlCategoryId = getCategoryFromURL();
//   //     if (urlCategoryId) {
//   //       categoryId = urlCategoryId;
//   //       console.log('✅ Will filter promotional products by URL category:', categoryId);
//   //     } else {
//   //       console.log('⚠️ No category filter in URL - will show latest products');
//   //     }
//   //   }
//   //   else {
//   //     console.log('🎯 On regular page - showing latest products (no category filter)');
//   //   }
    
//   //   // Fetch promotional products with or without category filter
//   //   await fetchPromotionalProducts(currentShowCount, currentPathname, categoryId);
    
//   // }, []);
//   // In UnifiedPopupManager.js - Update initializePopupSystem

// const initializePopupSystem = useCallback(async (currentPathname, currentShowCount) => {
//   console.log('📡 Initializing popup system for path:', currentPathname);
  
//   // Clear any existing timers
//   if (timerRef.current) {
//     clearTimeout(timerRef.current);
//     timerRef.current = null;
//   }
  
//   // Reset show state
//   setShowPromotional(false);
  
//   let categoryId = null;
//   let isProductDetails = false;
  
//   // Get the normalized path without query params
//   const normalizedPath = normalizePath(currentPathname);
  
//   // Check if on product details page
//   const isProductDetailsPage = normalizedPath === '/productDetails';
  
//   // Check if on products listing page
//   const isProductsPage = normalizedPath === '/products';
  
//   if (isProductDetailsPage) {
//     console.log('🎯 On product details page - fetching category from current product...');
//     categoryId = await getCurrentProductCategory();
//     isProductDetails = true;
//     if (categoryId) {
//       console.log('✅ Will filter promotional products by product category:', categoryId);
//     } else {
//       console.log('⚠️ Could not get product category - will show products with no target category');
//     }
//   } 
//   else if (isProductsPage) {
//     console.log('🎯 On products listing page - checking for category filter in URL...');
//     const urlCategoryId = getCategoryFromURL();
//     if (urlCategoryId) {
//       categoryId = urlCategoryId;
//       console.log('✅ Will filter promotional products by URL category:', categoryId);
//     } else {
//       console.log('⚠️ No category filter in URL - will show products with no target category');
//     }
//   }
//   else {
//     console.log('🎯 On regular page - showing products with no target category');
//   }
  
//   // Fetch promotional products with or without category filter
//   await fetchPromotionalProducts(currentShowCount, currentPathname, categoryId, isProductDetails);
  
// }, []);
  
//   // Handle page navigation - re-initialize based on active popup
//   useEffect(() => {
//     if (!configLoaded || !subscriptionChecked) return;
    
//     // Clear any existing timers
//     if (timerRef.current) {
//       clearTimeout(timerRef.current);
//       timerRef.current = null;
//     }
    
//     // Reset show states
//     setShowPromotional(false);
//     setShowNewsletter(false);
    
//     // Get current show counts from localStorage
//     const storedPromoCount = localStorage.getItem('promotionalShowCount');
//     const promoCount = storedPromoCount ? parseInt(storedPromoCount) : 0;
//     setPromotionalShowCount(promoCount);
    
//     const storedNewsCount = localStorage.getItem('newsletterShowCount');
//     const newsCount = storedNewsCount ? parseInt(storedNewsCount) : 0;
//     setNewsletterShowCount(newsCount);
    
//     console.log(`🔄 Page changed to: ${pathname}`);
//     console.log(`📊 Show counts - Promotional: ${promoCount}, Newsletter: ${newsCount}`);
//     console.log(`🎯 Active popup from config: ${popupConfig?.activePopup}`);
    
//     if (shouldHideAll) {
//       console.log('🚫 Popups hidden on this page');
//       return;
//     }
    
//     // Initialize based on which popup is active
//     if (popupConfig?.activePopup === 'promotional') {
//       console.log('🎯 Initializing promotional popup (active popup)');
//       initializePopupSystem(pathname, promoCount);
//     } else if (popupConfig?.activePopup === 'newsletter') {
//       console.log('🎯 Initializing newsletter popup (active popup)');
//       if (isUserSubscribed) {
//         console.log('📧 User already subscribed - not showing newsletter popup');
//         return;
//       }
//       if (!popupConfig?.newsletter?.isActive) {
//         console.log('📧 Newsletter popup is disabled in settings');
//         return;
//       }
      
//       if (newsCount < popupConfig.newsletter.maxShows) {
//         const firstDelay = (popupConfig.newsletter.intervals?.[0]?.delay || 5) * 1000;
//         console.log(`📧 Will show newsletter popup in ${firstDelay/1000}s`);
        
//         timerRef.current = setTimeout(() => {
//           if (isMountedRef.current) {
//             console.log('📧 SHOWING NEWSLETTER POPUP!');
//             setShowNewsletter(true);
//           }
//           timerRef.current = null;
//         }, firstDelay);
//       }
//     } else if (popupConfig?.activePopup === 'none') {
//       console.log('🚫 All popups disabled');
//     }
    
//     lastPathnameRef.current = pathname;
//   }, [pathname, configLoaded, subscriptionChecked, shouldHideAll, popupConfig, initializePopupSystem, isUserSubscribed]);
  
//   // Listen for URL changes (including pushState/popstate) to detect category filter changes on products page
//   useEffect(() => {
//     if (!configLoaded || !subscriptionChecked) return;
//     if (popupConfig?.activePopup !== 'promotional') return;
//     if (shouldHideAll) return;
    
//     // Check if on products page
//     const normalizedPath = normalizePath(pathname);
//     if (normalizedPath !== '/products') return;
    
//     console.log('🔍 Setting up URL change listener for products page');
    
//     // Function to handle URL changes - using setTimeout to avoid render-phase state updates
//     const handleURLChange = () => {
//       console.log('🔄 URL changed, re-initializing popup system...');
      
//       // Use setTimeout to schedule the state update asynchronously
//       setTimeout(() => {
//         if (isMountedRef.current) {
//           // Clear existing timer
//           if (timerRef.current) {
//             clearTimeout(timerRef.current);
//             timerRef.current = null;
//           }
          
//           // Get current show count
//           const storedPromoCount = localStorage.getItem('promotionalShowCount');
//           const promoCount = storedPromoCount ? parseInt(storedPromoCount) : 0;
          
//           // Re-initialize popup system with new URL
//           initializePopupSystem(pathname, promoCount);
//         }
//       }, 0);
//     };
    
//     // Listen for popstate (back/forward buttons)
//     window.addEventListener('popstate', handleURLChange);
    
//     // Override pushState and replaceState to detect URL changes from filter selections
//     const originalPushState = window.history.pushState;
//     const originalReplaceState = window.history.replaceState;
    
//     window.history.pushState = function(...args) {
//       originalPushState.apply(window.history, args);
//       handleURLChange();
//     };
    
//     window.history.replaceState = function(...args) {
//       originalReplaceState.apply(window.history, args);
//       handleURLChange();
//     };
    
//     return () => {
//       window.removeEventListener('popstate', handleURLChange);
//       window.history.pushState = originalPushState;
//       window.history.replaceState = originalReplaceState;
//     };
//   }, [pathname, configLoaded, subscriptionChecked, popupConfig?.activePopup, shouldHideAll, initializePopupSystem]);
  

//   // Listen for category filter changes from products page
// useEffect(() => {
//   if (!configLoaded || !subscriptionChecked) return;
//   if (popupConfig?.activePopup !== 'promotional') return;
//   if (shouldHideAll) return;
  
//   console.log('🔍 Setting up category filter change listener');
  
//   const handleCategoryFilterChange = (event) => {
//     console.log('🔍 Category filter changed from products page:', event.detail);
    
//     // Clear existing timer
//     if (timerRef.current) {
//       clearTimeout(timerRef.current);
//       timerRef.current = null;
//     }
    
//     // Get current show count
//     const storedPromoCount = localStorage.getItem('promotionalShowCount');
//     const promoCount = storedPromoCount ? parseInt(storedPromoCount) : 0;
    
//     // Re-initialize popup system with new category
//     initializePopupSystem(pathname, promoCount);
//   };
  
//   window.addEventListener('categoryFilterChanged', handleCategoryFilterChange);
  
//   return () => {
//     window.removeEventListener('categoryFilterChanged', handleCategoryFilterChange);
//   };
// }, [pathname, configLoaded, subscriptionChecked, popupConfig?.activePopup, shouldHideAll, initializePopupSystem]);
//   // Fetch popup configuration - only once
//   useEffect(() => {
//     let isActive = true;
    
//     const fetchPopupConfig = async () => {
//       if (!isActive) return;
      
//       try {
//         console.log('📡 Fetching popup config from API...');
//         const response = await fetch('http://localhost:5000/api/popup-config');
//         const data = await response.json();
        
//         if (data.success && isActive) {
//           console.log('✅ Active popup from API:', data.data.activePopup);
//           setPopupConfig(data.data);
//           setConfigLoaded(true);
//         } else if (isActive) {
//           console.error('❌ Failed to load popup config');
//           setConfigLoaded(true);
//         }
//       } catch (error) {
//         console.error('❌ Error fetching popup config:', error);
//         if (isActive) {
//           setConfigLoaded(true);
//         }
//       }
//     };
    
//     if (subscriptionChecked) {
//       fetchPopupConfig();
//     }
    
//     return () => {
//       isActive = false;
//     };
//   }, [subscriptionChecked]);
  
//   // Log render conditions
//   console.log('🟢 RENDERING - Config loaded:', configLoaded);
//   console.log('🟢 RENDERING - showPromotional:', showPromotional);
//   console.log('🟢 RENDERING - showNewsletter:', showNewsletter);
//   console.log('🟢 RENDERING - promotionalProducts length:', promotionalProducts.length);
//   console.log('🟢 RENDERING - activePopup:', popupConfig?.activePopup);
  
//   if (!configLoaded || !subscriptionChecked) {
//     console.log('⏳ Waiting for config or subscription to load...');
//     return null;
//   }
  
//   if (shouldHideAll) {
//     console.log('🚫 All popups hidden on this page');
//     return null;
//   }
  
//   if (popupConfig?.activePopup === 'none') {
//     console.log('🚫 Popups disabled globally');
//     return null;
//   }
  
//   return (
//     <>
//       {/* Promotional Modal - Only show when promotional is active */}
//       {popupConfig?.activePopup === 'promotional' && showPromotional && promotionalProducts.length > 0 && (
//         <PromotionalModal 
//           key={`promo-${Date.now()}`}
//           products={promotionalProducts}
//           onClose={handlePromotionalClose}
//           currentProductIndex={currentProductIndex}
//           onProductChange={setCurrentProductIndex}
//         />
//       )}
      
//       {/* Newsletter Popup - Only show when newsletter is active */}
//       {popupConfig?.activePopup === 'newsletter' && !shouldHideNewsletter && !isUserSubscribed && (
//         <NewsletterPopup 
//           isExternallyControlled={true} 
//           onClose={handleNewsletterClose}
//           forceOpen={showNewsletter}
//         />
//       )}
//     </>
//   );
// }



// components/UnifiedPopupManager.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import PromotionalModal from './PromotionalModal';
import NewsletterPopup from './NewsletterPopup';

export default function UnifiedPopupManager() {
  const pathname = usePathname();
  const [popupConfig, setPopupConfig] = useState(null);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [showPromotional, setShowPromotional] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [promotionalProducts, setPromotionalProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [promotionalShowCount, setPromotionalShowCount] = useState(0);
  const [newsletterShowCount, setNewsletterShowCount] = useState(0);
  const [promotionalIntervals, setPromotionalIntervals] = useState([]);
  const [promotionalMaxShows, setPromotionalMaxShows] = useState(3);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscriptionChecked, setSubscriptionChecked] = useState(false);
  const [shouldHideAll, setShouldHideAll] = useState(false);
  const [shouldHideNewsletter, setShouldHideNewsletter] = useState(false);
  
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const isMountedRef = useRef(true);
  const lastPathnameRef = useRef(pathname);
  
  // Different hide paths for different popups
  const hideAllPaths = ['/admin', '/moderator', '/customer'];
  const hideNewsletterOnlyPaths = ['/login', '/register'];
  
  // Helper function to normalize paths (CASE-INSENSITIVE)
  const normalizePath = (path) => {
    if (!path) return '/';
    let normalized = path === '/' ? '/' : path.replace(/\/$/, '');
    normalized = normalized.split('?')[0];
    // Convert to lowercase for case-insensitive comparison
    return normalized.toLowerCase();
  };
  
  // Update hide states when pathname changes
  useEffect(() => {
    const hideAll = hideAllPaths.some(path => pathname?.startsWith(path));
    const hideNewsletter = hideAll || hideNewsletterOnlyPaths.some(path => pathname?.startsWith(path));
    
    setShouldHideAll(hideAll);
    setShouldHideNewsletter(hideNewsletter);
    
    console.log('🔍 Path updated - Current path:', pathname);
    console.log('🔍 Should hide all popups:', hideAll);
    console.log('🔍 Should hide newsletter only:', hideNewsletter);
  }, [pathname]);
  
  // Check if user is subscribed to newsletter
  const checkUserSubscription = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setIsLoggedIn(true);
        const response = await fetch('http://localhost:5000/api/auth/subscription-status', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          setIsUserSubscribed(data.isSubscribed);
          console.log('📧 User subscription status:', data.isSubscribed);
        }
      } else {
        setIsLoggedIn(false);
        setIsUserSubscribed(false);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      setIsUserSubscribed(false);
    } finally {
      setSubscriptionChecked(true);
    }
  };
  
  // Detect hard reload
  const isHardReload = () => {
    if (typeof window !== 'undefined' && performance) {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav) {
        return nav.type === 'reload';
      }
    }
    const lastLoadTime = sessionStorage.getItem('lastLoadTime');
    const now = Date.now();
    if (lastLoadTime && (now - parseInt(lastLoadTime)) < 2000) {
      return true;
    }
    sessionStorage.setItem('lastLoadTime', now.toString());
    return false;
  };
  
  // Reset counters on hard reload
  useEffect(() => {
    if (isHardReload()) {
      console.log('🔄 Hard reload detected! Resetting all popup counters...');
      localStorage.removeItem('promotionalShowCount');
      localStorage.removeItem('newsletterShowCount');
      setPromotionalShowCount(0);
      setNewsletterShowCount(0);
    }
  }, []);
  
  // Check subscription status on mount and auth change
  useEffect(() => {
    checkUserSubscription();
    
    const handleAuthChange = () => {
      console.log('🔄 Auth change detected, checking subscription...');
      checkUserSubscription();
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);
  
  // Get category ID from URL params (for products page)
  const getCategoryFromURL = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get('category');
      
      if (categoryParam) {
        console.log('📦 Found category parameter in URL:', categoryParam);
        return categoryParam;
      }
    } catch (error) {
      console.error('Error getting category from URL:', error);
    }
    return null;
  };
  
  // Get current product's category ID from product details page
  const getCurrentProductCategory = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      
      if (!productId) {
        console.log('No product ID found in URL');
        return null;
      }
      
      console.log('📦 Fetching product details for ID:', productId);
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const product = data.data;
        let categoryId = null;
        if (product.category) {
          if (typeof product.category === 'object' && product.category._id) {
            categoryId = product.category._id;
          } else if (typeof product.category === 'string') {
            categoryId = product.category;
          }
        }
        console.log('✅ Current product category ID:', categoryId);
        return categoryId;
      }
    } catch (error) {
      console.error('Error fetching product category:', error);
    }
    return null;
  };
  
  // Fetch promotional products function
  const fetchPromotionalProducts = async (currentCount, currentPathname, currentCategoryId = null, isProductDetails = false) => {
    try {
      console.log('========================================');
      console.log('📡 Fetching promotional products...');
      console.log('Current pathname:', currentPathname);
      console.log('Category filter:', currentCategoryId);
      console.log('Is product details page:', isProductDetails);
      console.log('========================================');
      
      // Build URL with query params
      let url = 'http://localhost:5000/api/promotional';
      const params = new URLSearchParams();
      
      // ALWAYS pass the current path for page filtering
      if (currentPathname) {
        params.set('path', currentPathname);
      }
      
      if (currentCategoryId) {
        params.set('categoryId', currentCategoryId);
      }
      
      if (isProductDetails) {
        params.set('isProductDetailsPage', 'true');
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      console.log('🔍 Fetching from URL:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('📦 API Response:', data);
      
      if (data.success && data.data.isActive && data.data.products && data.data.products.length > 0) {
        console.log('✅ Total products from API:', data.data.products.length);
        
        // Log each product for debugging
        data.data.products.forEach((product, idx) => {
          console.log(`\n📦 Product ${idx + 1}: ${product.productName}`);
          console.log(`   - Created: ${new Date(product.createdAt).toLocaleString()}`);
          console.log(`   - Category Restriction: ${product.triggerCategoryName || 'None'}`);
          console.log(`   - Page Restriction: ${product.showOnPages ? product.showOnPages.join(', ') : 'All pages'}`);
        });
        
        // Check if we've already shown max times
        if (currentCount >= (data.data.maxShows || 3)) {
          console.log('🎯 Already shown maximum times:', currentCount);
          setConfigLoaded(true);
          return;
        }
        
        console.log('🎯 Setting promotional products:', data.data.products.map(p => p.productName));
        setPromotionalProducts(data.data.products);
        setPromotionalIntervals(data.data.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }]);
        setPromotionalMaxShows(data.data.maxShows || 3);
        
        // Clear any existing timer
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        
        // Calculate first delay
        const firstDelay = (data.data.intervals?.[0]?.delay || 5) * 1000;
        console.log(`⏰ Will show popup in ${firstDelay/1000} seconds`);
        
        // Set timer to show popup
        timerRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            console.log('🎯 SHOWING PROMOTIONAL POPUP!');
            setShowPromotional(true);
          }
          timerRef.current = null;
        }, firstDelay);
        
      } else {
        console.log('⚠️ No promotional products found');
        console.log('Response data:', data);
        setPromotionalProducts([]);
        setConfigLoaded(true);
      }
    } catch (error) {
      console.error('❌ Error fetching promotional products:', error);
      setPromotionalProducts([]);
      setConfigLoaded(true);
    }
  };
  
  // Handle promotional modal close
  const handlePromotionalClose = () => {
    console.log('🔚 Promotional popup closed');
    setShowPromotional(false);
    
    const newCount = promotionalShowCount + 1;
    setPromotionalShowCount(newCount);
    localStorage.setItem('promotionalShowCount', newCount.toString());
    
    // Schedule next promotional popup
    if (newCount < promotionalMaxShows && promotionalIntervals[newCount]) {
      const nextDelay = promotionalIntervals[newCount].delay * 1000;
      console.log(`⏰ Next promotional popup in ${nextDelay/1000}s`);
      
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      timerRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          console.log(`🎯 Showing promotional popup #${newCount + 1}`);
          setShowPromotional(true);
        }
        timerRef.current = null;
      }, nextDelay);
    } else {
      console.log('📅 No more promotional popups to schedule');
    }
  };
  
  // Handle newsletter modal close
  const handleNewsletterClose = () => {
    console.log('📧 Newsletter popup closed');
    setShowNewsletter(false);
    
    const newCount = newsletterShowCount + 1;
    setNewsletterShowCount(newCount);
    localStorage.setItem('newsletterShowCount', newCount.toString());
    
    if (isUserSubscribed) {
      console.log('📧 User already subscribed - no more popups');
      return;
    }
    
    if (popupConfig?.newsletter && newCount < popupConfig.newsletter.maxShows) {
      const intervals = popupConfig.newsletter.intervals;
      const nextDelay = (intervals[newCount]?.delay || 15) * 1000;
      
      console.log(`⏰ Next newsletter popup in ${nextDelay/1000}s`);
      timerRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          console.log('📧 Showing next newsletter popup');
          setShowNewsletter(true);
        }
        timerRef.current = null;
      }, nextDelay);
    }
  };
  
  // Initialize popup system based on current page
  const initializePopupSystem = useCallback(async (currentPathname, currentShowCount) => {
    console.log('📡 Initializing popup system for path:', currentPathname);
    
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Reset show state
    setShowPromotional(false);
    
    let categoryId = null;
    let isProductDetails = false;
    
    // Get the normalized path without query params (already lowercase)
    const normalizedPath = normalizePath(currentPathname);
    
    // Check if on product details page (case-insensitive)
    const isProductDetailsPage = normalizedPath === '/productdetails';
    
    // Check if on products listing page (case-insensitive)
    const isProductsPage = normalizedPath === '/products';
    
    console.log('Normalized path:', normalizedPath);
    console.log('Is product details page?', isProductDetailsPage);
    console.log('Is products page?', isProductsPage);
    
    if (isProductDetailsPage) {
      console.log('🎯 On product details page - fetching category from current product...');
      categoryId = await getCurrentProductCategory();
      isProductDetails = true;
      if (categoryId) {
        console.log('✅ Will filter promotional products by product category:', categoryId);
      } else {
        console.log('⚠️ Could not get product category - will show products with no target category');
      }
    } 
    else if (isProductsPage) {
      console.log('🎯 On products listing page - checking for category filter in URL...');
      const urlCategoryId = getCategoryFromURL();
      if (urlCategoryId) {
        categoryId = urlCategoryId;
        console.log('✅ Will filter promotional products by URL category:', categoryId);
      } else {
        console.log('⚠️ No category filter in URL - will show products with no target category');
      }
    }
    else {
      console.log('🎯 On regular page - showing products with no target category');
    }
    
    // Fetch promotional products with or without category filter
    await fetchPromotionalProducts(currentShowCount, currentPathname, categoryId, isProductDetails);
    
  }, []);
  
  // Handle page navigation - re-initialize based on active popup
  useEffect(() => {
    if (!configLoaded || !subscriptionChecked) return;
    
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Reset show states
    setShowPromotional(false);
    setShowNewsletter(false);
    
    // Get current show counts from localStorage
    const storedPromoCount = localStorage.getItem('promotionalShowCount');
    const promoCount = storedPromoCount ? parseInt(storedPromoCount) : 0;
    setPromotionalShowCount(promoCount);
    
    const storedNewsCount = localStorage.getItem('newsletterShowCount');
    const newsCount = storedNewsCount ? parseInt(storedNewsCount) : 0;
    setNewsletterShowCount(newsCount);
    
    console.log(`🔄 Page changed to: ${pathname}`);
    console.log(`📊 Show counts - Promotional: ${promoCount}, Newsletter: ${newsCount}`);
    console.log(`🎯 Active popup from config: ${popupConfig?.activePopup}`);
    
    if (shouldHideAll) {
      console.log('🚫 Popups hidden on this page');
      return;
    }
    
    // Initialize based on which popup is active
    if (popupConfig?.activePopup === 'promotional') {
      console.log('🎯 Initializing promotional popup (active popup)');
      initializePopupSystem(pathname, promoCount);
    } else if (popupConfig?.activePopup === 'newsletter') {
      console.log('🎯 Initializing newsletter popup (active popup)');
      if (isUserSubscribed) {
        console.log('📧 User already subscribed - not showing newsletter popup');
        return;
      }
      if (!popupConfig?.newsletter?.isActive) {
        console.log('📧 Newsletter popup is disabled in settings');
        return;
      }
      
      if (newsCount < popupConfig.newsletter.maxShows) {
        const firstDelay = (popupConfig.newsletter.intervals?.[0]?.delay || 5) * 1000;
        console.log(`📧 Will show newsletter popup in ${firstDelay/1000}s`);
        
        timerRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            console.log('📧 SHOWING NEWSLETTER POPUP!');
            setShowNewsletter(true);
          }
          timerRef.current = null;
        }, firstDelay);
      }
    } else if (popupConfig?.activePopup === 'none') {
      console.log('🚫 All popups disabled');
    }
    
    lastPathnameRef.current = pathname;
  }, [pathname, configLoaded, subscriptionChecked, shouldHideAll, popupConfig, initializePopupSystem, isUserSubscribed]);
  
  // Listen for URL changes (including pushState/popstate) to detect category filter changes on products page
  useEffect(() => {
    if (!configLoaded || !subscriptionChecked) return;
    if (popupConfig?.activePopup !== 'promotional') return;
    if (shouldHideAll) return;
    
    // Check if on products page (case-insensitive)
    const normalizedPath = normalizePath(pathname);
    const isProductsPage = normalizedPath === '/products';
    
    if (!isProductsPage) return;
    
    console.log('🔍 Setting up URL change listener for products page');
    
    // Function to handle URL changes
    const handleURLChange = () => {
      console.log('🔄 URL changed, re-initializing popup system...');
      
      setTimeout(() => {
        if (isMountedRef.current) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          
          const storedPromoCount = localStorage.getItem('promotionalShowCount');
          const promoCount = storedPromoCount ? parseInt(storedPromoCount) : 0;
          
          initializePopupSystem(pathname, promoCount);
        }
      }, 0);
    };
    
    window.addEventListener('popstate', handleURLChange);
    
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleURLChange();
    };
    
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args);
      handleURLChange();
    };
    
    return () => {
      window.removeEventListener('popstate', handleURLChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [pathname, configLoaded, subscriptionChecked, popupConfig?.activePopup, shouldHideAll, initializePopupSystem]);
  
  // Listen for category filter changes from products page
  useEffect(() => {
    if (!configLoaded || !subscriptionChecked) return;
    if (popupConfig?.activePopup !== 'promotional') return;
    if (shouldHideAll) return;
    
    console.log('🔍 Setting up category filter change listener');
    
    const handleCategoryFilterChange = (event) => {
      console.log('🔍 Category filter changed from products page:', event.detail);
      
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      
      const storedPromoCount = localStorage.getItem('promotionalShowCount');
      const promoCount = storedPromoCount ? parseInt(storedPromoCount) : 0;
      
      initializePopupSystem(pathname, promoCount);
    };
    
    window.addEventListener('categoryFilterChanged', handleCategoryFilterChange);
    
    return () => {
      window.removeEventListener('categoryFilterChanged', handleCategoryFilterChange);
    };
  }, [pathname, configLoaded, subscriptionChecked, popupConfig?.activePopup, shouldHideAll, initializePopupSystem]);
  
  // Fetch popup configuration - only once
  useEffect(() => {
    let isActive = true;
    
    const fetchPopupConfig = async () => {
      if (!isActive) return;
      
      try {
        console.log('📡 Fetching popup config from API...');
        const response = await fetch('http://localhost:5000/api/popup-config');
        const data = await response.json();
        
        if (data.success && isActive) {
          console.log('✅ Active popup from API:', data.data.activePopup);
          setPopupConfig(data.data);
          setConfigLoaded(true);
        } else if (isActive) {
          console.error('❌ Failed to load popup config');
          setConfigLoaded(true);
        }
      } catch (error) {
        console.error('❌ Error fetching popup config:', error);
        if (isActive) {
          setConfigLoaded(true);
        }
      }
    };
    
    if (subscriptionChecked) {
      fetchPopupConfig();
    }
    
    return () => {
      isActive = false;
    };
  }, [subscriptionChecked]);
  
  // Log render conditions
  console.log('🟢 RENDERING - Config loaded:', configLoaded);
  console.log('🟢 RENDERING - showPromotional:', showPromotional);
  console.log('🟢 RENDERING - showNewsletter:', showNewsletter);
  console.log('🟢 RENDERING - promotionalProducts length:', promotionalProducts.length);
  console.log('🟢 RENDERING - activePopup:', popupConfig?.activePopup);
  
  if (!configLoaded || !subscriptionChecked) {
    console.log('⏳ Waiting for config or subscription to load...');
    return null;
  }
  
  if (shouldHideAll) {
    console.log('🚫 All popups hidden on this page');
    return null;
  }
  
  if (popupConfig?.activePopup === 'none') {
    console.log('🚫 Popups disabled globally');
    return null;
  }
  
  return (
    <>
      {/* Promotional Modal - Only show when promotional is active */}
      {popupConfig?.activePopup === 'promotional' && showPromotional && promotionalProducts.length > 0 && (
        <PromotionalModal 
          key={`promo-${Date.now()}`}
          products={promotionalProducts}
          onClose={handlePromotionalClose}
          currentProductIndex={currentProductIndex}
          onProductChange={setCurrentProductIndex}
        />
      )}
      
      {/* Newsletter Popup - Only show when newsletter is active */}
      {popupConfig?.activePopup === 'newsletter' && !shouldHideNewsletter && !isUserSubscribed && (
        <NewsletterPopup 
          isExternallyControlled={true} 
          onClose={handleNewsletterClose}
          forceOpen={showNewsletter}
        />
      )}
    </>
  );
}