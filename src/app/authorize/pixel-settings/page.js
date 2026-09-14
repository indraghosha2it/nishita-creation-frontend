
// 'use client';

// import { useState, useEffect, Suspense } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import {
//   FaFacebook,
//   FaGoogle,
//   FaSave,
//   FaSpinner,
//   FaTimes,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaInfoCircle,
//   FaSync,
//   FaEye,
//   FaEyeSlash,
//   FaExternalLinkAlt,
//   FaClipboardList
// } from 'react-icons/fa';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // Move the main component logic to a separate function
// function PixelSettingsContent() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [testing, setTesting] = useState(false);
//   const [showTokens, setShowTokens] = useState(false);
//   const [settings, setSettings] = useState({
//     enabled: false,
//     facebook: {
//       enabled: false,
//       pixelId: '',
//       accessToken: '',
//       testEventCode: '',
//       autoConfig: true,
//       debug: false,
//       capiEnabled: false,
//       capiToken: ''
//     },
//     google: {
//       enabled: false,
//       measurementId: '',
//       debug: false,
//       apiSecret: ''
//     },
//     customEvents: {
//       addToCart: true,
//       initiateCheckout: true,
//       purchase: true,
//       viewContent: true,
//       search: true,
//       contact: true,
//       newsletterSignup: true
//     }
//   });

//   const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//   // Fetch settings directly from backend
//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           toast.error('Please login first');
//           router.push('/login');
//           return;
//         }

//         console.log('📡 Fetching pixel settings from:', `${API_BASE}/api/pixels/admin/settings`);
        
//         const response = await fetch(`${API_BASE}/api/pixels/admin/settings`, {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         // Check if response is JSON
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           const text = await response.text();
//           console.error('❌ Non-JSON response:', text.substring(0, 200));
//           throw new Error('Server returned invalid response. Make sure backend is running.');
//         }

//         const data = await response.json();
//         console.log('📥 Pixel settings received:', data);
        
//         if (data.success) {
//           setSettings(data.data);
//         } else {
//           toast.error(data.error || 'Failed to load settings');
//         }
//       } catch (error) {
//         console.error('❌ Fetch settings error:', error);
//         toast.error(error.message || 'Network error. Make sure backend server is running on port 5000');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSettings();
//   }, [router]);

//   // Save settings directly to backend
//   const handleSave = async () => {
//     // Validate
//     if (settings.facebook.enabled && !settings.facebook.pixelId) {
//       toast.error('Facebook Pixel ID is required when enabled');
//       return;
//     }
//     if (settings.facebook.capiEnabled && !settings.facebook.capiToken) {
//       toast.error('Facebook CAPI Token is required when CAPI is enabled');
//       return;
//     }
//     if (settings.google.enabled && !settings.google.measurementId) {
//       toast.error('Google Measurement ID is required when enabled');
//       return;
//     }

//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         return;
//       }

//       console.log('📤 Saving pixel settings...');
      
//       const response = await fetch(`${API_BASE}/api/pixels/settings`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(settings)
//       });

//       // Check if response is JSON
//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         const text = await response.text();
//         console.error('❌ Non-JSON response:', text.substring(0, 200));
//         throw new Error('Server returned invalid response');
//       }

//       const data = await response.json();
//       console.log('📥 Save response:', data);
      
//       if (data.success) {
//         toast.success('Pixel settings saved successfully!');
//         setSettings(data.data);
//       } else {
//         toast.error(data.error || 'Failed to save settings');
//       }
//     } catch (error) {
//       console.error('❌ Save error:', error);
//       toast.error(error.message || 'Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Test Facebook Pixel
//   const handleTest = async () => {
//     if (!settings.facebook.pixelId) {
//       toast.error('Please save Pixel ID first');
//       return;
//     }

//     setTesting(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`${API_BASE}/api/pixels/facebook/test`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           pixelId: settings.facebook.pixelId,
//           testEventCode: settings.facebook.testEventCode
//         })
//       });

//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         throw new Error('Invalid response from server');
//       }

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Test URL generated');
//         window.open(data.data.testUrl, '_blank');
//       } else {
//         toast.error(data.error || 'Failed to generate test URL');
//       }
//     } catch (error) {
//       console.error('❌ Test error:', error);
//       toast.error(error.message || 'Network error');
//     } finally {
//       setTesting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-[#EE4275] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500 text-sm">Loading pixel settings...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="pixel_settings">
//       <div className="min-h-screen bg-[#FFF5F6] py-8">
//         <div className="container mx-auto max-w-4xl px-4">
//           <div className="bg-white rounded-2xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden">
//             {/* Header */}
//             <div className="p-6 bg-[#718369] text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-2xl font-bold flex items-center gap-3">
//                     <FaClipboardList className="w-7 h-7" />
//                     Pixel & Analytics Configuration
//                   </h1>
//                   <p className="text-white/80 text-sm mt-1">
//                     Configure Facebook Pixel and Google Analytics for your site
//                   </p>
//                   <p className="text-white/60 text-xs mt-1">
//                     Backend: {API_BASE}
//                   </p>
//                 </div>
//                 <button
//                   onClick={handleSave}
//                   disabled={saving}
//                   className="px-4 py-2 bg-white text-[#718369] rounded-lg hover:shadow-lg hover:shadow-white/20 transition-all flex items-center gap-2 font-medium disabled:opacity-50"
//                 >
//                   {saving ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaSave className="w-4 h-4" />}
//                   Save Settings
//                 </button>
//               </div>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Master Enable/Disable */}
//               <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#F7C7D3]/40">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-sm font-semibold text-[#2D1B2E]">Enable All Tracking</h3>
//                     <p className="text-xs text-[#EE4275]/60">Turn all tracking on/off with one switch</p>
//                   </div>
//                   <button
//                     onClick={() => setSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
//                     className={`relative w-14 h-8 rounded-full transition-colors ${settings.enabled ? 'bg-[#EE4275]' : 'bg-[#F7C7D3]'}`}
//                   >
//                     <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${settings.enabled ? 'translate-x-6' : ''}`} />
//                   </button>
//                 </div>
//               </div>

//               {/* Facebook Pixel Section */}
//               <div className="border rounded-xl border-[#F7C7D3]/40 overflow-hidden">
//                 <div className="p-4 bg-gradient-to-r from-[#FFF5F6] to-[#F7C7D3]/20 border-b border-[#F7C7D3]/40 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <FaFacebook className="text-[#EE4275] text-2xl" />
//                     <div>
//                       <h3 className="font-semibold text-[#2D1B2E]">Facebook Pixel</h3>
//                       <p className="text-xs text-[#EE4275]/60">Track conversions and retarget visitors</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setSettings(prev => ({
//                       ...prev,
//                       facebook: { ...prev.facebook, enabled: !prev.facebook.enabled }
//                     }))}
//                     className={`relative w-12 h-7 rounded-full transition-colors ${settings.facebook.enabled ? 'bg-[#EE4275]' : 'bg-[#F7C7D3]'}`}
//                   >
//                     <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.facebook.enabled ? 'translate-x-5' : ''}`} />
//                   </button>
//                 </div>

//                 <div className="p-4 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                       Pixel ID <span className="text-[#EE4275]">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={settings.facebook.pixelId}
//                       onChange={(e) => setSettings(prev => ({
//                         ...prev,
//                         facebook: { ...prev.facebook, pixelId: e.target.value }
//                       }))}
//                       placeholder="Enter your Facebook Pixel ID (e.g., 123456789012345)"
//                       className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent text-sm font-mono bg-white hover:border-[#EE4275]/30"
//                       disabled={!settings.facebook.enabled}
//                     />
//                     <p className="text-xs text-[#EE4275]/60 mt-1">Find your Pixel ID in Facebook Events Manager</p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                       Access Token <span className="text-[#EE4275]/40 text-xs">(Optional)</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showTokens ? 'text' : 'password'}
//                         value={settings.facebook.accessToken}
//                         onChange={(e) => setSettings(prev => ({
//                           ...prev,
//                           facebook: { ...prev.facebook, accessToken: e.target.value }
//                         }))}
//                         placeholder="Enter Facebook Access Token for CAPI"
//                         className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent text-sm font-mono pr-10 bg-white hover:border-[#EE4275]/30"
//                         disabled={!settings.facebook.enabled}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowTokens(!showTokens)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 hover:text-[#EE4275]"
//                       >
//                         {showTokens ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
//                       </button>
//                     </div>
//                     <p className="text-xs text-[#EE4275]/60 mt-1">Required for Conversions API (CAPI) tracking</p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                       Test Event Code <span className="text-[#EE4275]/40 text-xs">(Optional)</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={settings.facebook.testEventCode}
//                       onChange={(e) => setSettings(prev => ({
//                         ...prev,
//                         facebook: { ...prev.facebook, testEventCode: e.target.value }
//                       }))}
//                       placeholder="Enter test event code for debugging"
//                       className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent text-sm font-mono bg-white hover:border-[#EE4275]/30"
//                       disabled={!settings.facebook.enabled}
//                     />
//                     <p className="text-xs text-[#EE4275]/60 mt-1">Use this to test your pixel implementation</p>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div className="flex items-center gap-3">
//                       <input
//                         type="checkbox"
//                         checked={settings.facebook.autoConfig}
//                         onChange={(e) => setSettings(prev => ({
//                           ...prev,
//                           facebook: { ...prev.facebook, autoConfig: e.target.checked }
//                         }))}
//                         className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#EE4275] focus:ring-[#EE4275]"
//                         disabled={!settings.facebook.enabled}
//                       />
//                       <label className="text-sm text-[#2D1B2E]">Auto Config</label>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <input
//                         type="checkbox"
//                         checked={settings.facebook.debug}
//                         onChange={(e) => setSettings(prev => ({
//                           ...prev,
//                           facebook: { ...prev.facebook, debug: e.target.checked }
//                         }))}
//                         className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#EE4275] focus:ring-[#EE4275]"
//                         disabled={!settings.facebook.enabled}
//                       />
//                       <label className="text-sm text-[#2D1B2E]">Debug Mode</label>
//                     </div>
//                   </div>

//                   <div className="border-t border-[#F7C7D3]/30 pt-3">
//                     <div className="flex items-center gap-3">
//                       <input
//                         type="checkbox"
//                         checked={settings.facebook.capiEnabled}
//                         onChange={(e) => setSettings(prev => ({
//                           ...prev,
//                           facebook: { ...prev.facebook, capiEnabled: e.target.checked }
//                         }))}
//                         className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#EE4275] focus:ring-[#EE4275]"
//                         disabled={!settings.facebook.enabled}
//                       />
//                       <label className="text-sm font-medium text-[#2D1B2E]">
//                         Enable Conversions API (CAPI)
//                         <span className="text-xs text-[#EE4275]/60 ml-2">More reliable tracking</span>
//                       </label>
//                     </div>
//                     {settings.facebook.capiEnabled && (
//                       <div className="mt-2">
//                         <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                           CAPI Token <span className="text-[#EE4275]">*</span>
//                         </label>
//                         <input
//                           type="password"
//                           value={settings.facebook.capiToken}
//                           onChange={(e) => setSettings(prev => ({
//                             ...prev,
//                             facebook: { ...prev.facebook, capiToken: e.target.value }
//                           }))}
//                           placeholder="Enter Facebook CAPI Token"
//                           className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent text-sm font-mono bg-white hover:border-[#EE4275]/30"
//                         />
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     onClick={handleTest}
//                     disabled={testing || !settings.facebook.pixelId}
//                     className="flex items-center gap-2 px-4 py-2 bg-[#EE4275] text-white rounded-lg hover:bg-[#EE4275]/80 transition-colors disabled:opacity-50 text-sm"
//                   >
//                     {testing ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaExternalLinkAlt className="w-4 h-4" />}
//                     Test Pixel
//                   </button>
//                 </div>
//               </div>

//               {/* Google Analytics Section */}
//               <div className="border rounded-xl border-[#F7C7D3]/40 overflow-hidden">
//                 <div className="p-4 bg-gradient-to-r from-[#FFF5F6] to-[#F7C7D3]/20 border-b border-[#F7C7D3]/40 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <FaGoogle className="text-[#EE4275] text-2xl" />
//                     <div>
//                       <h3 className="font-semibold text-[#2D1B2E]">Google Analytics</h3>
//                       <p className="text-xs text-[#EE4275]/60">Track website traffic and user behavior</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setSettings(prev => ({
//                       ...prev,
//                       google: { ...prev.google, enabled: !prev.google.enabled }
//                     }))}
//                     className={`relative w-12 h-7 rounded-full transition-colors ${settings.google.enabled ? 'bg-[#EE4275]' : 'bg-[#F7C7D3]'}`}
//                   >
//                     <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.google.enabled ? 'translate-x-5' : ''}`} />
//                   </button>
//                 </div>

//                 <div className="p-4 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                       Measurement ID <span className="text-[#EE4275]">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={settings.google.measurementId}
//                       onChange={(e) => setSettings(prev => ({
//                         ...prev,
//                         google: { ...prev.google, measurementId: e.target.value }
//                       }))}
//                       placeholder="Enter GA4 Measurement ID (e.g., G-XXXXXXXXXX)"
//                       className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent text-sm font-mono bg-white hover:border-[#EE4275]/30"
//                       disabled={!settings.google.enabled}
//                     />
//                     <p className="text-xs text-[#EE4275]/60 mt-1">Find your Measurement ID in Google Analytics Admin</p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                       API Secret <span className="text-[#EE4275]/40 text-xs">(Optional)</span>
//                     </label>
//                     <input
//                       type="password"
//                       value={settings.google.apiSecret}
//                       onChange={(e) => setSettings(prev => ({
//                         ...prev,
//                         google: { ...prev.google, apiSecret: e.target.value }
//                       }))}
//                       placeholder="Enter GA4 API Secret for server-side tracking"
//                       className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent text-sm font-mono bg-white hover:border-[#EE4275]/30"
//                       disabled={!settings.google.enabled}
//                     />
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <input
//                       type="checkbox"
//                       checked={settings.google.debug}
//                       onChange={(e) => setSettings(prev => ({
//                         ...prev,
//                         google: { ...prev.google, debug: e.target.checked }
//                       }))}
//                       className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#EE4275] focus:ring-[#EE4275]"
//                       disabled={!settings.google.enabled}
//                     />
//                     <label className="text-sm text-[#2D1B2E]">Debug Mode</label>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-wrap gap-3 pt-4 border-t border-[#F7C7D3]/40">
//                 <button
//                   onClick={handleSave}
//                   disabled={saving}
//                   className="flex-1 min-w-[140px] px-4 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-50"
//                 >
//                   {saving ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaSave className="w-4 h-4" />}
//                   Save Settings
//                 </button>
//                 <button
//                   onClick={() => {
//                     if (window.confirm('Are you sure you want to reset all pixel settings?')) {
//                       setSettings({
//                         enabled: false,
//                         facebook: { enabled: false, pixelId: '', accessToken: '', testEventCode: '', autoConfig: true, debug: false, capiEnabled: false, capiToken: '' },
//                         google: { enabled: false, measurementId: '', debug: false, apiSecret: '' },
//                         customEvents: {
//                           addToCart: true,
//                           initiateCheckout: true,
//                           purchase: true,
//                           viewContent: true,
//                           search: true,
//                           contact: true,
//                           newsletterSignup: true
//                         }
//                       });
//                       toast.info('Settings reset to default');
//                     }
//                   }}
//                   className="px-4 py-2.5 border border-[#F7C7D3]/50 text-[#2D1B2E] rounded-lg hover:bg-[#FFF5F6] transition-colors flex items-center gap-2"
//                 >
//                   <FaSync className="w-4 h-4" />
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// // Main export with Suspense wrapper
// export default function PixelSettingsPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-[#EE4275] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500 text-sm">Loading pixel settings...</p>
//         </div>
//       </div>
//     }>
//       <PixelSettingsContent />
//     </Suspense>
//   );
// }


'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  FaFacebook,
  FaGoogle,
  FaSave,
  FaSpinner,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaSync,
  FaEye,
  FaEyeSlash,
  FaExternalLinkAlt,
  FaClipboardList
} from 'react-icons/fa';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// Move the main component logic to a separate function
function PixelSettingsContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [settings, setSettings] = useState({
    enabled: false,
    facebook: {
      enabled: false,
      pixelId: '',
      accessToken: '',
      testEventCode: '',
      autoConfig: true,
      debug: false,
      capiEnabled: false,
      capiToken: ''
    },
    google: {
      enabled: false,
      measurementId: '',
      debug: false,
      apiSecret: ''
    },
    customEvents: {
      addToCart: true,
      initiateCheckout: true,
      purchase: true,
      viewContent: true,
      search: true,
      contact: true,
      newsletterSignup: true
    }
  });

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Fetch settings directly from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          toast.error('Please login first');
          router.push('/login');
          return;
        }

        console.log('📡 Fetching pixel settings from:', `${API_BASE}/api/pixels/admin/settings`);
        
        const response = await fetch(`${API_BASE}/api/pixels/admin/settings`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('❌ Non-JSON response:', text.substring(0, 200));
          throw new Error('Server returned invalid response. Make sure backend is running.');
        }

        const data = await response.json();
        console.log('📥 Pixel settings received:', data);
        
        if (data.success) {
          setSettings(data.data);
        } else {
          toast.error(data.error || 'Failed to load settings');
        }
      } catch (error) {
        console.error('❌ Fetch settings error:', error);
        toast.error(error.message || 'Network error. Make sure backend server is running on port 5000');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [router]);

  // Save settings directly to backend
  const handleSave = async () => {
    // Validate
    if (settings.facebook.enabled && !settings.facebook.pixelId) {
      toast.error('Facebook Pixel ID is required when enabled');
      return;
    }
    if (settings.facebook.capiEnabled && !settings.facebook.capiToken) {
      toast.error('Facebook CAPI Token is required when CAPI is enabled');
      return;
    }
    if (settings.google.enabled && !settings.google.measurementId) {
      toast.error('Google Measurement ID is required when enabled');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        return;
      }

      console.log('📤 Saving pixel settings...');
      
      const response = await fetch(`${API_BASE}/api/pixels/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text.substring(0, 200));
        throw new Error('Server returned invalid response');
      }

      const data = await response.json();
      console.log('📥 Save response:', data);
      
      if (data.success) {
        toast.success('Pixel settings saved successfully!');
        setSettings(data.data);
      } else {
        toast.error(data.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      toast.error(error.message || 'Network error');
    } finally {
      setSaving(false);
    }
  };

  // Test Facebook Pixel
  const handleTest = async () => {
    if (!settings.facebook.pixelId) {
      toast.error('Please save Pixel ID first');
      return;
    }

    setTesting(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE}/api/pixels/facebook/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          pixelId: settings.facebook.pixelId,
          testEventCode: settings.facebook.testEventCode
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response from server');
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success('Test URL generated');
        window.open(data.data.testUrl, '_blank');
      } else {
        toast.error(data.error || 'Failed to generate test URL');
      }
    } catch (error) {
      console.error('❌ Test error:', error);
      toast.error(error.message || 'Network error');
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#52665a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Loading pixel settings...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="pixel_settings">
      <div className="min-h-screen bg-[#f7f4ef] py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-[#e2e3dd]/60 overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-[#52665a] text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    <FaClipboardList className="w-7 h-7" />
                    Pixel & Analytics Configuration
                  </h1>
                  <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Configure Facebook Pixel and Google Analytics for your site
                  </p>
                  <p className="text-white/60 text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Backend: {API_BASE}
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-white text-[#52665a] rounded-lg hover:shadow-lg hover:shadow-white/20 transition-all flex items-center gap-2 font-medium disabled:opacity-50"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {saving ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaSave className="w-4 h-4" />}
                  Save Settings
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Master Enable/Disable */}
              <div className="bg-[#f7f4ef] rounded-xl p-4 border border-[#e2e3dd]/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#29362f]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Enable All Tracking</h3>
                    <p className="text-xs text-[#52665a]/60" style={{ fontFamily: "'Inter', sans-serif" }}>Turn all tracking on/off with one switch</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                    className={`relative w-14 h-8 rounded-full transition-colors ${settings.enabled ? 'bg-[#52665a]' : 'bg-[#e2e3dd]'}`}
                  >
                    <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${settings.enabled ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Facebook Pixel Section */}
              <div className="border rounded-xl border-[#e2e3dd]/60 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-[#f7f4ef] to-[#e2e3dd]/20 border-b border-[#e2e3dd]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaFacebook className="text-[#52665a] text-2xl" />
                    <div>
                      <h3 className="font-semibold text-[#29362f]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Facebook Pixel</h3>
                      <p className="text-xs text-[#52665a]/60" style={{ fontFamily: "'Inter', sans-serif" }}>Track conversions and retarget visitors</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      facebook: { ...prev.facebook, enabled: !prev.facebook.enabled }
                    }))}
                    className={`relative w-12 h-7 rounded-full transition-colors ${settings.facebook.enabled ? 'bg-[#52665a]' : 'bg-[#e2e3dd]'}`}
                  >
                    <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.facebook.enabled ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Pixel ID <span className="text-[#52665a]">*</span>
                    </label>
                    <input
                      type="text"
                      value={settings.facebook.pixelId}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        facebook: { ...prev.facebook, pixelId: e.target.value }
                      }))}
                      placeholder="Enter your Facebook Pixel ID (e.g., 123456789012345)"
                      className="w-full px-3 py-2 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent text-sm font-mono bg-white hover:border-[#52665a]/30"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      disabled={!settings.facebook.enabled}
                    />
                    <p className="text-xs text-[#52665a]/60 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Find your Pixel ID in Facebook Events Manager</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Access Token <span className="text-[#52665a]/40 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showTokens ? 'text' : 'password'}
                        value={settings.facebook.accessToken}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          facebook: { ...prev.facebook, accessToken: e.target.value }
                        }))}
                        placeholder="Enter Facebook Access Token for CAPI"
                        className="w-full px-3 py-2 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent text-sm font-mono pr-10 bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        disabled={!settings.facebook.enabled}
                      />
                      <button
                        type="button"
                        onClick={() => setShowTokens(!showTokens)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52665a]/40 hover:text-[#52665a]"
                      >
                        {showTokens ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-[#52665a]/60 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Required for Conversions API (CAPI) tracking</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Test Event Code <span className="text-[#52665a]/40 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={settings.facebook.testEventCode}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        facebook: { ...prev.facebook, testEventCode: e.target.value }
                      }))}
                      placeholder="Enter test event code for debugging"
                      className="w-full px-3 py-2 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent text-sm font-mono bg-white hover:border-[#52665a]/30"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      disabled={!settings.facebook.enabled}
                    />
                    <p className="text-xs text-[#52665a]/60 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Use this to test your pixel implementation</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={settings.facebook.autoConfig}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          facebook: { ...prev.facebook, autoConfig: e.target.checked }
                        }))}
                        className="w-4 h-4 rounded border-[#e2e3dd]/60 text-[#52665a] focus:ring-[#52665a]"
                        disabled={!settings.facebook.enabled}
                      />
                      <label className="text-sm text-[#29362f]" style={{ fontFamily: "'Inter', sans-serif" }}>Auto Config</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={settings.facebook.debug}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          facebook: { ...prev.facebook, debug: e.target.checked }
                        }))}
                        className="w-4 h-4 rounded border-[#e2e3dd]/60 text-[#52665a] focus:ring-[#52665a]"
                        disabled={!settings.facebook.enabled}
                      />
                      <label className="text-sm text-[#29362f]" style={{ fontFamily: "'Inter', sans-serif" }}>Debug Mode</label>
                    </div>
                  </div>

                  <div className="border-t border-[#e2e3dd]/40 pt-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={settings.facebook.capiEnabled}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          facebook: { ...prev.facebook, capiEnabled: e.target.checked }
                        }))}
                        className="w-4 h-4 rounded border-[#e2e3dd]/60 text-[#52665a] focus:ring-[#52665a]"
                        disabled={!settings.facebook.enabled}
                      />
                      <label className="text-sm font-medium text-[#29362f]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Enable Conversions API (CAPI)
                        <span className="text-xs text-[#52665a]/60 ml-2">More reliable tracking</span>
                      </label>
                    </div>
                    {settings.facebook.capiEnabled && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                          CAPI Token <span className="text-[#52665a]">*</span>
                        </label>
                        <input
                          type="password"
                          value={settings.facebook.capiToken}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            facebook: { ...prev.facebook, capiToken: e.target.value }
                          }))}
                          placeholder="Enter Facebook CAPI Token"
                          className="w-full px-3 py-2 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent text-sm font-mono bg-white hover:border-[#52665a]/30"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleTest}
                    disabled={testing || !settings.facebook.pixelId}
                    className="flex items-center gap-2 px-4 py-2 bg-[#52665a] text-white rounded-lg hover:bg-[#52665a]/80 transition-colors disabled:opacity-50 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {testing ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaExternalLinkAlt className="w-4 h-4" />}
                    Test Pixel
                  </button>
                </div>
              </div>

              {/* Google Analytics Section */}
              <div className="border rounded-xl border-[#e2e3dd]/60 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-[#f7f4ef] to-[#e2e3dd]/20 border-b border-[#e2e3dd]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaGoogle className="text-[#52665a] text-2xl" />
                    <div>
                      <h3 className="font-semibold text-[#29362f]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Google Analytics</h3>
                      <p className="text-xs text-[#52665a]/60" style={{ fontFamily: "'Inter', sans-serif" }}>Track website traffic and user behavior</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      google: { ...prev.google, enabled: !prev.google.enabled }
                    }))}
                    className={`relative w-12 h-7 rounded-full transition-colors ${settings.google.enabled ? 'bg-[#52665a]' : 'bg-[#e2e3dd]'}`}
                  >
                    <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.google.enabled ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Measurement ID <span className="text-[#52665a]">*</span>
                    </label>
                    <input
                      type="text"
                      value={settings.google.measurementId}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        google: { ...prev.google, measurementId: e.target.value }
                      }))}
                      placeholder="Enter GA4 Measurement ID (e.g., G-XXXXXXXXXX)"
                      className="w-full px-3 py-2 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent text-sm font-mono bg-white hover:border-[#52665a]/30"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      disabled={!settings.google.enabled}
                    />
                    <p className="text-xs text-[#52665a]/60 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Find your Measurement ID in Google Analytics Admin</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      API Secret <span className="text-[#52665a]/40 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="password"
                      value={settings.google.apiSecret}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        google: { ...prev.google, apiSecret: e.target.value }
                      }))}
                      placeholder="Enter GA4 API Secret for server-side tracking"
                      className="w-full px-3 py-2 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent text-sm font-mono bg-white hover:border-[#52665a]/30"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      disabled={!settings.google.enabled}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.google.debug}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        google: { ...prev.google, debug: e.target.checked }
                      }))}
                      className="w-4 h-4 rounded border-[#e2e3dd]/60 text-[#52665a] focus:ring-[#52665a]"
                      disabled={!settings.google.enabled}
                    />
                    <label className="text-sm text-[#29362f]" style={{ fontFamily: "'Inter', sans-serif" }}>Debug Mode</label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-[#e2e3dd]/60">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 min-w-[140px] px-4 py-2.5 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-50"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {saving ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaSave className="w-4 h-4" />}
                  Save Settings
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset all pixel settings?')) {
                      setSettings({
                        enabled: false,
                        facebook: { enabled: false, pixelId: '', accessToken: '', testEventCode: '', autoConfig: true, debug: false, capiEnabled: false, capiToken: '' },
                        google: { enabled: false, measurementId: '', debug: false, apiSecret: '' },
                        customEvents: {
                          addToCart: true,
                          initiateCheckout: true,
                          purchase: true,
                          viewContent: true,
                          search: true,
                          contact: true,
                          newsletterSignup: true
                        }
                      });
                      toast.info('Settings reset to default');
                    }
                  }}
                  className="px-4 py-2.5 border border-[#e2e3dd]/60 text-[#29362f] rounded-lg hover:bg-[#f7f4ef] transition-colors flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <FaSync className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Main export with Suspense wrapper
export default function PixelSettingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#52665a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Loading pixel settings...</p>
        </div>
      </div>
    }>
      <PixelSettingsContent />
    </Suspense>
  );
}