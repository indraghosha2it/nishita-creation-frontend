

// 'use client';

// import { useEffect, useState } from 'react';
// import { usePathname, useSearchParams } from 'next/navigation';

// export default function PixelTracker() {
//   const [config, setConfig] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [loadingError, setLoadingError] = useState(null);
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//   // Fetch pixel configuration
//   useEffect(() => {
//     const fetchConfig = async () => {
//       console.log('📡 Fetching pixel config from:', `${API_BASE}/api/pixels/settings`);
      
//       try {
//         const response = await fetch(`${API_BASE}/api/pixels/settings`);
        
//         // Check if response is JSON
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           const text = await response.text();
//           console.warn('⚠️ Non-JSON response:', text.substring(0, 200));
//           setLoadingError('Invalid response from server');
//           return;
//         }
        
//         const data = await response.json();
//         console.log('📥 Pixel config received:', data);
        
//         if (data.success) {
//           setConfig(data.data);
//           console.log('✅ Config loaded:', {
//             enabled: data.data.enabled,
//             fbEnabled: data.data.facebook?.enabled,
//             fbPixelId: data.data.facebook?.pixelId,
//             gaEnabled: data.data.google?.enabled,
//             gaMeasurementId: data.data.google?.measurementId
//           });
//         } else {
//           console.error('❌ API returned error:', data.error);
//           setLoadingError(data.error || 'Failed to load config');
//         }
//       } catch (error) {
//         console.error('❌ Fetch error:', error);
//         setLoadingError(error.message);
//       }
//     };

//     fetchConfig();
//   }, []);

//   // Load Facebook Pixel
//   useEffect(() => {
//     console.log('🔍 Checking pixel conditions:', {
//       configExists: !!config,
//       enabled: config?.enabled,
//       fbEnabled: config?.facebook?.enabled,
//       fbPixelId: config?.facebook?.pixelId
//     });

//     if (!config?.enabled) {
//       console.log('⏭️ Master switch is disabled');
//       return;
//     }

//     if (!config?.facebook?.enabled) {
//       console.log('⏭️ Facebook Pixel is disabled in settings');
//       return;
//     }

//     if (!config?.facebook?.pixelId) {
//       console.log('⏭️ Facebook Pixel ID is missing');
//       return;
//     }

//     const loadFacebookPixel = () => {
//       // Check if already loaded
//       if (window.fbq) {
//         console.log('✅ Facebook Pixel already loaded');
//         setIsLoaded(true);
//         return;
//       }

//       console.log('🚀 Loading Facebook Pixel:', config.facebook.pixelId);

//       // Facebook Pixel initialization
//       !function(f,b,e,v,n,t,s) {
//         if(f.fbq)return;
//         n=f.fbq=function(){
//           n.callMethod? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
//         };
//         if(!f._fbq) f._fbq=n;
//         n.push=n;
//         n.loaded=!0;
//         n.version='2.0';
//         n.queue=[];
//         t=b.createElement(e);
//         t.async=!0;
//         t.src=v;
//         s=b.getElementsByTagName(e)[0];
//         s.parentNode.insertBefore(t,s)
//       }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      
//       window.fbq('init', config.facebook.pixelId);
      
//       if (config.facebook.debug) {
//         console.log('✅ Facebook Pixel initialized:', config.facebook.pixelId);
//         console.log('🔍 Debug mode enabled');
//       }
      
//       if (config.facebook.autoConfig !== false) {
//         window.fbq('config', config.facebook.pixelId, {
//           autoConfig: true
//         });
//       }
      
//       setIsLoaded(true);
//       console.log('✅ Facebook Pixel loaded successfully!');
//     };

//     loadFacebookPixel();
//   }, [config]);

//   // Load Google Analytics
//   useEffect(() => {
//     if (!config?.enabled || !config?.google?.enabled || !config?.google?.measurementId) {
//       return;
//     }

//     const loadGoogleAnalytics = () => {
//       if (window.gtag) {
//         console.log('✅ Google Analytics already loaded');
//         return;
//       }

//       console.log('🚀 Loading Google Analytics:', config.google.measurementId);

//       const script = document.createElement('script');
//       script.src = `https://www.googletagmanager.com/gtag/js?id=${config.google.measurementId}`;
//       script.async = true;
//       document.head.appendChild(script);

//       window.dataLayer = window.dataLayer || [];
//       window.gtag = function() {
//         window.dataLayer.push(arguments);
//       };
//       window.gtag('js', new Date());
//       window.gtag('config', config.google.measurementId, {
//         send_page_view: true,
//         debug_mode: config.google.debug || false
//       });

//       if (config.google.debug) {
//         console.log('✅ Google Analytics initialized:', config.google.measurementId);
//       }
//     };

//     loadGoogleAnalytics();
//   }, [config]);

//   // Track page views
//   useEffect(() => {
//     if (!config?.enabled) return;

//     const pageTitle = document.title || pathname;
//     const pageUrl = window.location.href;

//     console.log('📊 Tracking page view:', {
//       path: pathname,
//       title: pageTitle,
//       fbLoaded: !!window.fbq,
//       gaLoaded: !!window.gtag
//     });

//     // Facebook Pixel PageView
//     if (config.facebook?.enabled && window.fbq && isLoaded) {
//       try {
//         window.fbq('track', 'PageView', {
//           page_title: pageTitle,
//           page_location: pageUrl,
//           page_path: pathname
//         });
        
//         console.log('📊 Facebook PageView tracked:', pathname);
//       } catch (error) {
//         console.error('❌ Facebook PageView error:', error);
//       }
//     }

//     // Google Analytics PageView
//     if (config.google?.enabled && window.gtag) {
//       try {
//         window.gtag('event', 'page_view', {
//           page_title: pageTitle,
//           page_location: pageUrl,
//           page_path: pathname
//         });
        
//         console.log('📊 Google PageView tracked:', pathname);
//       } catch (error) {
//         console.error('❌ Google PageView error:', error);
//       }
//     }
//   }, [pathname, searchParams, config, isLoaded]);

//   // Expose pixel functions globally
//   useEffect(() => {
//     if (typeof window !== 'undefined' && config) {
//       window.__pixel = {
//         config,
//         isLoaded,
//         track: (event, data) => {
//           console.log('🎯 Tracking event:', event, data);
//           if (config.facebook?.enabled && window.fbq) {
//             window.fbq('track', event, data);
//           }
//           if (config.google?.enabled && window.gtag) {
//             window.gtag('event', event, data);
//           }
//         },
//         trackPurchase: (orderData) => {
//           const purchaseData = {
//             value: orderData.total || orderData.amount,
//             currency: 'BDT',
//             transaction_id: orderData.orderNumber || orderData.id,
//             contents: orderData.items?.map(item => ({
//               id: item.productId || item.id,
//               quantity: item.quantity,
//               price: item.price || item.discountPrice || item.regularPrice
//             })),
//             content_type: 'product'
//           };
          
//           console.log('💰 Tracking Purchase:', purchaseData);
          
//           if (config.facebook?.enabled && window.fbq) {
//             window.fbq('track', 'Purchase', purchaseData);
//           }
//           if (config.google?.enabled && window.gtag) {
//             window.gtag('event', 'purchase', purchaseData);
//           }
//         },
//         debug: {
//           config: config,
//           isLoaded: isLoaded,
//           fbq: !!window.fbq,
//           gtag: !!window.gtag
//         }
//       };
      
//       console.log('✅ Pixel API exposed as window.__pixel');
//     }
//   }, [config, isLoaded]);

//   // Debug render
//   if (loadingError) {
//     console.warn('⚠️ PixelTracker error:', loadingError);
//   }

//   return null;
// }


'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Separate component that uses useSearchParams
function PixelTrackerContent() {
  const [config, setConfig] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Fetch pixel configuration
  useEffect(() => {
    const fetchConfig = async () => {
      console.log('📡 Fetching pixel config from:', `${API_BASE}/api/pixels/settings`);
      
      try {
        const response = await fetch(`${API_BASE}/api/pixels/settings`);
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.warn('⚠️ Non-JSON response:', text.substring(0, 200));
          setLoadingError('Invalid response from server');
          return;
        }
        
        const data = await response.json();
        console.log('📥 Pixel config received:', data);
        
        if (data.success) {
          setConfig(data.data);
          console.log('✅ Config loaded:', {
            enabled: data.data.enabled,
            fbEnabled: data.data.facebook?.enabled,
            fbPixelId: data.data.facebook?.pixelId,
            gaEnabled: data.data.google?.enabled,
            gaMeasurementId: data.data.google?.measurementId
          });
        } else {
          console.error('❌ API returned error:', data.error);
          setLoadingError(data.error || 'Failed to load config');
        }
      } catch (error) {
        console.error('❌ Fetch error:', error);
        setLoadingError(error.message);
      }
    };

    fetchConfig();
  }, []);

  // Load Facebook Pixel
  useEffect(() => {
    console.log('🔍 Checking pixel conditions:', {
      configExists: !!config,
      enabled: config?.enabled,
      fbEnabled: config?.facebook?.enabled,
      fbPixelId: config?.facebook?.pixelId
    });

    if (!config?.enabled) {
      console.log('⏭️ Master switch is disabled');
      return;
    }

    if (!config?.facebook?.enabled) {
      console.log('⏭️ Facebook Pixel is disabled in settings');
      return;
    }

    if (!config?.facebook?.pixelId) {
      console.log('⏭️ Facebook Pixel ID is missing');
      return;
    }

    const loadFacebookPixel = () => {
      // Check if already loaded
      if (window.fbq) {
        console.log('✅ Facebook Pixel already loaded');
        setIsLoaded(true);
        return;
      }

      console.log('🚀 Loading Facebook Pixel:', config.facebook.pixelId);

      // Facebook Pixel initialization
      !function(f,b,e,v,n,t,s) {
        if(f.fbq)return;
        n=f.fbq=function(){
          n.callMethod? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
        };
        if(!f._fbq) f._fbq=n;
        n.push=n;
        n.loaded=!0;
        n.version='2.0';
        n.queue=[];
        t=b.createElement(e);
        t.async=!0;
        t.src=v;
        s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      
      window.fbq('init', config.facebook.pixelId);
      
      if (config.facebook.debug) {
        console.log('✅ Facebook Pixel initialized:', config.facebook.pixelId);
        console.log('🔍 Debug mode enabled');
      }
      
      if (config.facebook.autoConfig !== false) {
        window.fbq('config', config.facebook.pixelId, {
          autoConfig: true
        });
      }
      
      setIsLoaded(true);
      console.log('✅ Facebook Pixel loaded successfully!');
    };

    loadFacebookPixel();
  }, [config]);

  // Load Google Analytics
  useEffect(() => {
    if (!config?.enabled || !config?.google?.enabled || !config?.google?.measurementId) {
      return;
    }

    const loadGoogleAnalytics = () => {
      if (window.gtag) {
        console.log('✅ Google Analytics already loaded');
        return;
      }

      console.log('🚀 Loading Google Analytics:', config.google.measurementId);

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.google.measurementId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', config.google.measurementId, {
        send_page_view: true,
        debug_mode: config.google.debug || false
      });

      if (config.google.debug) {
        console.log('✅ Google Analytics initialized:', config.google.measurementId);
      }
    };

    loadGoogleAnalytics();
  }, [config]);

  // Track page views
  useEffect(() => {
    if (!config?.enabled) return;

    const pageTitle = document.title || pathname;
    const pageUrl = window.location.href;

    console.log('📊 Tracking page view:', {
      path: pathname,
      title: pageTitle,
      fbLoaded: !!window.fbq,
      gaLoaded: !!window.gtag
    });

    // Facebook Pixel PageView
    if (config.facebook?.enabled && window.fbq && isLoaded) {
      try {
        window.fbq('track', 'PageView', {
          page_title: pageTitle,
          page_location: pageUrl,
          page_path: pathname
        });
        
        console.log('📊 Facebook PageView tracked:', pathname);
      } catch (error) {
        console.error('❌ Facebook PageView error:', error);
      }
    }

    // Google Analytics PageView
    if (config.google?.enabled && window.gtag) {
      try {
        window.gtag('event', 'page_view', {
          page_title: pageTitle,
          page_location: pageUrl,
          page_path: pathname
        });
        
        console.log('📊 Google PageView tracked:', pathname);
      } catch (error) {
        console.error('❌ Google PageView error:', error);
      }
    }
  }, [pathname, searchParams, config, isLoaded]);

  // Expose pixel functions globally
  useEffect(() => {
    if (typeof window !== 'undefined' && config) {
      window.__pixel = {
        config,
        isLoaded,
        track: (event, data) => {
          console.log('🎯 Tracking event:', event, data);
          if (config.facebook?.enabled && window.fbq) {
            window.fbq('track', event, data);
          }
          if (config.google?.enabled && window.gtag) {
            window.gtag('event', event, data);
          }
        },
        trackPurchase: (orderData) => {
          const purchaseData = {
            value: orderData.total || orderData.amount,
            currency: 'BDT',
            transaction_id: orderData.orderNumber || orderData.id,
            contents: orderData.items?.map(item => ({
              id: item.productId || item.id,
              quantity: item.quantity,
              price: item.price || item.discountPrice || item.regularPrice
            })),
            content_type: 'product'
          };
          
          console.log('💰 Tracking Purchase:', purchaseData);
          
          if (config.facebook?.enabled && window.fbq) {
            window.fbq('track', 'Purchase', purchaseData);
          }
          if (config.google?.enabled && window.gtag) {
            window.gtag('event', 'purchase', purchaseData);
          }
        },
        debug: {
          config: config,
          isLoaded: isLoaded,
          fbq: !!window.fbq,
          gtag: !!window.gtag
        }
      };
      
      console.log('✅ Pixel API exposed as window.__pixel');
    }
  }, [config, isLoaded]);

  // Debug render
  if (loadingError) {
    console.warn('⚠️ PixelTracker error:', loadingError);
  }

  return null;
}

// Main export with Suspense wrapper
export default function PixelTracker() {
  return (
    <Suspense fallback={null}>
      <PixelTrackerContent />
    </Suspense>
  );
}