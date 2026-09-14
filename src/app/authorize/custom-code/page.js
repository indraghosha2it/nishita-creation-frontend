
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { FaSave, FaSpinner, FaCode, FaInfoCircle } from 'react-icons/fa';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// function Toggle({ checked, onChange }) {
//   return (
//     <label className="relative inline-flex cursor-pointer items-center">
//       <input
//         type="checkbox"
//         className="sr-only peer"
//         checked={checked}
//         onChange={onChange}
//       />
//       <div className="h-6 w-11 rounded-full bg-[#F7C7D3] transition-colors peer-checked:bg-[#EE4275] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
//     </label>
//   );
// }

// const SLOTS = [
//   {
//     key: 'headerCode',
//     label: 'Header Code',
//     badge: '<head>',
//     badgeColor: 'bg-[#F7C7D3]/30 text-[#EE4275]',
//     hint: 'Injected inside the <head> tag — perfect for meta tags, verification codes, and tracking scripts',
//     placeholder: `<!-- Example: Google Analytics -->
// <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());
//   gtag('config', 'G-XXXXXXXXXX');
// </script>`,
//   },
//   {
//     key: 'bodyCode',
//     label: 'Body Code',
//     badge: '<body>',
//     badgeColor: 'bg-[#F7C7D3]/30 text-[#EE4275]',
//     hint: 'Injected right after <body> opens — ideal for noscript fallbacks',
//     placeholder: `<!-- Example: Google Tag Manager noscript -->
// <noscript>
//   <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
//     height="0" width="0" style="display:none;visibility:hidden">
//   </iframe>
// </noscript>`,
//   },
//   {
//     key: 'footerCode',
//     label: 'Footer Code',
//     badge: '</body>',
//     badgeColor: 'bg-[#F7C7D3]/30 text-[#EE4275]',
//     hint: 'Injected right before </body> closes — perfect for async tracking scripts',
//     placeholder: `<!-- Example: Facebook Pixel -->
// <script>
//   !function(f,b,e,v,n,t,s)
//   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//   n.queue=[];t=b.createElement(e);t.async=!0;
//   t.src=v;s=b.getElementsByTagName(e)[0];
//   s.parentNode.insertBefore(t,s)}(window, document,'script',
//   'https://connect.facebook.net/en_US/fbevents.js');
//   fbq('init', 'YOUR_PIXEL_ID');
//   fbq('track', 'PageView');
// </script>`,
//   },
// ];

// export default function CustomCodePage() {
//   const [cfg, setCfg] = useState({
//     headerCode: '',
//     bodyCode: '',
//     footerCode: '',
//     active: true,
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           toast.error('Please login first');
//           return;
//         }

//         const response = await fetch(`${API}/api/custom-code/settings`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         const data = await response.json();
        
//         if (data.success) {
//           setCfg(data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching custom code:', error);
//         toast.error('Failed to load custom code settings');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSettings();
//   }, []);

//   const set = (key, val) => setCfg((s) => ({ ...s, [key]: val }));

//   const handleSave = async () => {
//     setSaving(true);
//     setSaved(false);
    
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         return;
//       }

//       const response = await fetch(`${API}/api/custom-code/settings`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(cfg),
//       });

//       const data = await response.json();
      
//       if (!response.ok) throw new Error(data.error || 'Save failed');
      
//       setSaved(true);
//       toast.success('Custom code saved successfully!');
//       setTimeout(() => setSaved(false), 2500);
//     } catch (err) {
//       toast.error(err.message || 'Failed to save');
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-[#EE4275] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500 text-sm">Loading custom code settings...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="custom_code">
//     <div className="min-h-screen bg-[#FFF5F6] py-8">
//       <div className="container mx-auto max-w-4xl px-4">
//         <div className="bg-white rounded-2xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden">
//           {/* Header */}
//           <div className="p-6 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white">
//             <div>
//               <h1 className="text-2xl font-bold flex items-center gap-3">
//                 <FaCode className="w-7 h-7" />
//                 Custom Code Snippets
//               </h1>
//               <p className="text-white/80 text-sm mt-1">
//                 Inject custom HTML, CSS, and JavaScript into your site
//               </p>
//             </div>
//           </div>

//           <div className="p-6 space-y-6">
//             {/* Warning Notice */}
//             <div className="bg-[#F7C7D3]/20 border border-[#EE4275]/20 rounded-xl p-4">
//               <div className="flex items-start gap-3">
//                 <FaInfoCircle className="text-[#EE4275] w-5 h-5 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-[#2D1B2E]">⚠️ Security Warning</h4>
//                   <p className="text-xs text-[#2D1B2E]/70 mt-1">
//                     Only paste code from trusted sources. Malicious code can steal user data or break your site.
//                     Always test in a staging environment first.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Code Inputs */}
//             <div className="divide-y divide-[#F7C7D3]/40 border rounded-xl border-[#F7C7D3]/40">
//               {SLOTS.map(({ key, label, badge, badgeColor, hint, placeholder }) => (
//                 <div key={key} className="px-6 py-5 space-y-2">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-semibold text-[#2D1B2E]">{label}</span>
//                     <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${badgeColor}`}>
//                       {badge}
//                     </span>
//                   </div>
//                   <p className="text-xs text-[#EE4275]/60">{hint}</p>
//                   <textarea
//                     value={cfg[key]}
//                     onChange={(e) => set(key, e.target.value)}
//                     rows={7}
//                     placeholder={placeholder}
//                     spellCheck={false}
//                     className="w-full rounded-lg border border-[#F7C7D3]/50 bg-[#FFF5F6] px-3 py-2.5 text-xs font-mono text-[#2D1B2E] focus:border-[#EE4275] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EE4275]/20 resize-y transition"
//                     disabled={!cfg.active}
//                   />
//                 </div>
//               ))}

//               {/* Active Toggle */}
//               <div className="flex items-center justify-between px-6 py-4">
//                 <div>
//                   <p className="text-sm font-semibold text-[#2D1B2E]">Active</p>
//                   <p className="text-xs text-[#EE4275]/60 mt-0.5">
//                     Disable to temporarily remove all custom code from your site
//                   </p>
//                 </div>
//                 <Toggle
//                   checked={cfg.active}
//                   onChange={(e) => set('active', e.target.checked)}
//                 />
//               </div>
//             </div>

//             {/* Save Button */}
//             <div className="flex items-center justify-end pt-4 border-t border-[#F7C7D3]/40">
//               <button
//                 onClick={handleSave}
//                 disabled={saving}
//                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all shadow-md font-medium disabled:opacity-50"
//               >
//                 {saving ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaSave className="w-4 h-4" />}
//                 {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//      </ProtectedRoute>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import { FaSave, FaSpinner, FaCode, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================================
// FONT CONSTANTS - MATCHING ABOUT PAGE
// ============================================================
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="h-6 w-11 rounded-full bg-[#e2e3dd] transition-colors peer-checked:bg-[#52665a] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
    </label>
  );
}

const SLOTS = [
  {
    key: 'headerCode',
    label: 'Header Code',
    badge: '<head>',
    badgeColor: 'bg-[#e2e3dd]/60 text-[#52665a]',
    hint: 'Injected inside the <head> tag — perfect for meta tags, verification codes, and tracking scripts',
    placeholder: `<!-- Example: Google Analytics -->
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`,
  },
  {
    key: 'bodyCode',
    label: 'Body Code',
    badge: '<body>',
    badgeColor: 'bg-[#e2e3dd]/60 text-[#52665a]',
    hint: 'Injected right after <body> opens — ideal for noscript fallbacks',
    placeholder: `<!-- Example: Google Tag Manager noscript -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0" width="0" style="display:none;visibility:hidden">
  </iframe>
</noscript>`,
  },
  {
    key: 'footerCode',
    label: 'Footer Code',
    badge: '</body>',
    badgeColor: 'bg-[#e2e3dd]/60 text-[#52665a]',
    hint: 'Injected right before </body> closes — perfect for async tracking scripts',
    placeholder: `<!-- Example: Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>`,
  },
];

export default function CustomCodePage() {
  const [cfg, setCfg] = useState({
    headerCode: '',
    bodyCode: '',
    footerCode: '',
    active: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          toast.error('Please login first');
          return;
        }

        const response = await fetch(`${API}/api/custom-code/settings`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        
        if (data.success) {
          setCfg(data.data);
        }
      } catch (error) {
        console.error('Error fetching custom code:', error);
        toast.error('Failed to load custom code settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const set = (key, val) => setCfg((s) => ({ ...s, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        return;
      }

      const response = await fetch(`${API}/api/custom-code/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cfg),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Save failed');
      
      setSaved(true);
      toast.success('Custom code saved successfully!');
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#52665a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}>Loading custom code settings...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="custom_code">
    <div className="min-h-screen bg-[#f7f4ef] py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e2e3dd]/60 overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                <FaCode className="w-7 h-7" />
                Custom Code Snippets
              </h1>
              <p className="text-white/80 text-sm mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                Inject custom HTML, CSS, and JavaScript into your site
              </p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Warning Notice */}
            <div className="bg-[#e2e3dd]/30 border border-[#52665a]/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="text-[#52665a] w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>⚠️ Security Warning</h4>
                  <p className="text-xs text-[#29362f]/70 mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Only paste code from trusted sources. Malicious code can steal user data or break your site.
                    Always test in a staging environment first.
                  </p>
                </div>
              </div>
            </div>

            {/* Code Inputs */}
            <div className="divide-y divide-[#e2e3dd]/60 border rounded-xl border-[#e2e3dd]/60">
              {SLOTS.map(({ key, label, badge, badgeColor, hint, placeholder }) => (
                <div key={key} className="px-6 py-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{label}</span>
                    <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${badgeColor}`}>
                      {badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>{hint}</p>
                  <textarea
                    value={cfg[key]}
                    onChange={(e) => set(key, e.target.value)}
                    rows={7}
                    placeholder={placeholder}
                    spellCheck={false}
                    className="w-full rounded-lg border border-[#e2e3dd]/60 bg-[#f7f4ef] px-3 py-2.5 text-xs font-mono text-[#29362f] focus:border-[#52665a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#52665a]/20 resize-y transition"
                    disabled={!cfg.active}
                  />
                </div>
              ))}

              {/* Active Toggle */}
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>Active</p>
                  <p className="text-xs text-[#52665a]/60 mt-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Disable to temporarily remove all custom code from your site
                  </p>
                </div>
                <Toggle
                  checked={cfg.active}
                  onChange={(e) => set('active', e.target.checked)}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end pt-4 border-t border-[#e2e3dd]/60">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all shadow-md font-medium disabled:opacity-50"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                {saving ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaSave className="w-4 h-4" />}
                {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
     </ProtectedRoute>
  );
}