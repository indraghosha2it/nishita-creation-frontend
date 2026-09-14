// 'use client';

// import { useEffect, useState } from 'react';

// const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// export default function CustomCodeInjector() {
//   const [code, setCode] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCode = async () => {
//       try {
//         console.log('📡 1. Fetching custom code from:', `${API}/api/custom-code/settings`);
        
//         const response = await fetch(`${API}/api/custom-code/settings`);
//         console.log('📡 2. Response status:', response.status);
        
//         const data = await response.json();
//         console.log('📡 3. API Response:', data);
        
//         if (data.success && data.data.active) {
//           console.log('✅ 4. Code loaded successfully!');
//           console.log('📝 5. Body Code Length:', data.data.bodyCode?.length || 0);
//           console.log('📝 6. Body Code Preview:', data.data.bodyCode?.substring(0, 100) + '...');
//           setCode(data.data);
//         } else {
//           console.log('⚠️ 7. Code is disabled or not configured');
//         }
//       } catch (error) {
//         console.error('❌ 8. Error fetching code:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCode();
//   }, []);

//   // Inject Body Code
//   useEffect(() => {
//     console.log('🔧 9. Body injection useEffect triggered');
//     console.log('🔧 10. code?.bodyCode exists?', !!code?.bodyCode);
    
//     if (!code?.bodyCode) {
//       console.log('⏭️ 11. No body code to inject');
//       return;
//     }

//     console.log('📝 12. Attempting to inject body code...');

//     const injectBodyCode = () => {
//       console.log('📝 13. injectBodyCode function called');
      
//       // Check if already injected
//       const existing = document.querySelector('[data-custom-body="true"]');
//       if (existing) {
//         console.log('ℹ️ 14. Body code already injected');
//         return;
//       }

//       console.log('📝 15. Creating container for body code...');
      
//       const container = document.createElement('div');
//       container.setAttribute('data-custom-body', 'true');
//       container.style.display = 'none';
//       container.innerHTML = code.bodyCode;
      
//       console.log('📝 16. Container HTML:', container.innerHTML);
      
//       // Insert after body opens
//       const body = document.body;
//       console.log('📝 17. Body element exists?', !!body);
      
//       if (body.firstChild) {
//         console.log('📝 18. Inserting before first child');
//         body.insertBefore(container.firstChild, body.firstChild);
//       } else {
//         console.log('📝 19. Body is empty, appending');
//         while (container.firstChild) {
//           body.appendChild(container.firstChild);
//         }
//       }
      
//       console.log('✅ 20. Body code injected successfully!');
      
//       // Verify injection
//       const verify = document.querySelector('[data-custom-body="true"]');
//       console.log('🔍 21. Verification - data-custom-body exists?', !!verify);
//     };

//     // Wait for body to be ready
//     if (document.body) {
//       console.log('📝 22. Document.body exists, injecting now');
//       injectBodyCode();
//     } else {
//       console.log('📝 23. Document.body not ready, waiting for DOMContentLoaded');
//       document.addEventListener('DOMContentLoaded', injectBodyCode);
//     }
//   }, [code]);

//   // Inject Header Code
//   useEffect(() => {
//     if (!code?.headerCode) return;

//     const injectHeaderCode = () => {
//       if (document.querySelector('[data-custom-header]')) {
//         return;
//       }

//       const container = document.createElement('div');
//       container.setAttribute('data-custom-header', 'true');
//       container.innerHTML = code.headerCode;
      
//       const head = document.head;
//       while (container.firstChild) {
//         head.appendChild(container.firstChild);
//       }
      
//       console.log('✅ Header code injected');
//     };

//     injectHeaderCode();
//   }, [code]);

//   // Inject Footer Code
//   useEffect(() => {
//     if (!code?.footerCode) return;

//     const injectFooterCode = () => {
//       if (document.querySelector('[data-custom-footer]')) {
//         return;
//       }

//       const container = document.createElement('div');
//       container.setAttribute('data-custom-footer', 'true');
//       container.innerHTML = code.footerCode;
      
//       const body = document.body;
//       while (container.firstChild) {
//         body.appendChild(container.firstChild);
//       }
      
//       console.log('✅ Footer code injected');
//     };

//     if (document.body) {
//       injectFooterCode();
//     } else {
//       document.addEventListener('DOMContentLoaded', injectFooterCode);
//     }
//   }, [code]);

//   // Log final state
//   useEffect(() => {
//     if (!loading) {
//       console.log('📊 24. Final state:', {
//         hasCode: !!code,
//         hasBodyCode: !!code?.bodyCode,
//         bodyCodeLength: code?.bodyCode?.length || 0,
//         isActive: code?.active
//       });
//     }
//   }, [code, loading]);

//   return null;
// }
'use client';

import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function CustomCodeInjector() {
  const [code, setCode] = useState(null);
  const [injected, setInjected] = useState(false);

  // Fetch code from API
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(`${API}/api/custom-code/settings`);
        const data = await response.json();
        if (data.success && data.data.active) {
          setCode(data.data);
        }
      } catch (error) {
        // Silent fail
      }
    };
    fetchCode();
  }, []);

  // Inject GTM
  useEffect(() => {
    if (!code?.bodyCode || injected) return;
    if (document.querySelector('iframe[src*="googletagmanager"]')) {
      setInjected(true);
      return;
    }

    const gtmMatch = code.bodyCode.match(/GTM-[A-Z0-9]+/);
    if (!gtmMatch) return;

    const gtmId = gtmMatch[0];
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.cssText = 'display:none;visibility:hidden';
    noscript.appendChild(iframe);

    const body = document.body;
    if (!body) {
      setTimeout(() => {
        document.body?.insertBefore(noscript, document.body.firstChild);
      }, 100);
      return;
    }

    const firstChild = body.firstChild;
    if (firstChild) {
      body.insertBefore(noscript, firstChild);
    } else {
      body.appendChild(noscript);
    }

    setInjected(true);
  }, [code, injected]);

  // Inject Header Code
  useEffect(() => {
    if (!code?.headerCode) return;
    try {
      if (document.querySelector('[data-custom-header="true"]')) return;
      const head = document.head;
      head.insertAdjacentHTML('beforeend', code.headerCode);
      const marker = document.createElement('div');
      marker.setAttribute('data-custom-header', 'true');
      marker.style.display = 'none';
      head.appendChild(marker);
    } catch (error) {
      // Silent fail
    }
  }, [code]);

  // Inject Footer Code
  useEffect(() => {
    if (!code?.footerCode) return;
    try {
      if (document.querySelector('[data-custom-footer="true"]')) return;
      if (!document.body) return;
      document.body.insertAdjacentHTML('beforeend', code.footerCode);
      const marker = document.createElement('div');
      marker.setAttribute('data-custom-footer', 'true');
      marker.style.display = 'none';
      document.body.appendChild(marker);
    } catch (error) {
      // Silent fail
    }
  }, [code]);

  return null;
}