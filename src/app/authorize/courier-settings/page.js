
// // app/dashboard/admin/settings/couriers/page.js (Updated)

// 'use client';

// import { useState, useEffect, Suspense } from 'react';
// import { toast } from 'sonner';
// import { 
//   FaEdit, FaSave, FaCheckCircle, FaTimesCircle, 
//   FaSpinner, FaTruck, FaTimes, FaEye, FaEyeSlash,
//   FaInfoCircle, FaKey, FaShieldAlt,
//   FaWeibo,
//   FaTencentWeibo
// } from 'react-icons/fa';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// const CREDENTIAL_FIELDS = {
//   pathao: [
//     { name: 'clientId', label: 'Client ID', type: 'text' },
//     { name: 'clientSecret', label: 'Client Secret', type: 'password' },
//     { name: 'username', label: 'Username', type: 'text' },
//     { name: 'password', label: 'Password', type: 'password' },
//   ],
//   steadfast: [
//     { name: 'apiKey', label: 'API Key', type: 'text' },
//     { name: 'secretKey', label: 'Secret Key', type: 'password' },
//   ],
//   redx: [
//     { name: 'apiToken', label: 'API Access Token', type: 'password' },
//     { name: 'phone', label: 'Phone (Optional)', type: 'text' },
//     { name: 'password', label: 'Password (Optional)', type: 'password' },
//     { name: 'shopId', label: 'Shop ID', type: 'text' },
//   ]
// };

// // Webhook configuration fields per courier
// const WEBHOOK_FIELDS = {
//   pathao: {
//     description: 'Pathao sends webhooks with X-Pathao-Signature header. The secret must match exactly.',
//     secretHelp: 'Generate a random string or use the default format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
//     defaultSecret: 'f3992ecc-59da-4cbe-a049-a13da2018d51'
//   },
//   redx: {
//     description: 'RedX sends webhooks with token as query parameter: ?token=YOUR_TOKEN',
//     secretHelp: 'Generate a random 64-character hex string for security',
//     defaultSecret: ''
//   },
//   steadfast: {
//     description: 'Steadfast sends webhooks with Bearer token in Authorization header',
//     secretHelp: 'Generate a random 64-character hex string for security',
//     defaultSecret: ''
//   }
// };

// // Main component content
// function CourierSettingsContent() {
//   const [couriers, setCouriers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingCourier, setEditingCourier] = useState(null);
//   const [credentials, setCredentials] = useState({});
//   const [storeConfig, setStoreConfig] = useState({});
//   const [webhookConfig, setWebhookConfig] = useState({
//     enabled: false,
//     secret: '',
//     bearerToken: '',
//     token: '',
//     events: []
//   });
//   const [apiEnabled, setApiEnabled] = useState(false);
//   const [testing, setTesting] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [showPassword, setShowPassword] = useState({});
//   const [showWebhookSecrets, setShowWebhookSecrets] = useState({});

//   useEffect(() => {
//     fetchCouriers();
//   }, []);

//   const fetchCouriers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/couriers`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setCouriers(data.data || []);
//       }
//     } catch (error) {
//       console.error('Fetch couriers error:', error);
//       toast.error('Failed to fetch couriers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCourierCredentials = async (courierId) => {
//     try {
//       const token = localStorage.getItem('token');
//       console.log(`📡 Fetching credentials for courier ID: ${courierId}`);
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/couriers/${courierId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
//       console.log('📦 API Response:', data);
      
//       if (data.success) {
//         const courier = data.data;
//         setCredentials(courier.credentials || {});
//         setStoreConfig(courier.storeConfig || {});
//         setApiEnabled(courier.apiEnabled || false);
        
//         // ========== 🆕 LOAD WEBHOOK CONFIG ==========
//         setWebhookConfig({
//           enabled: courier.webhookConfig?.enabled || false,
//           secret: courier.webhookConfig?.secret || '',
//           bearerToken: courier.webhookConfig?.bearerToken || '',
//           token: courier.webhookConfig?.token || '',
//           events: courier.webhookConfig?.events || []
//         });
        
//         return courier;
//       }
//       return null;
//     } catch (error) {
//       console.error('Fetch credentials error:', error);
//       toast.error('Failed to fetch credentials');
//       return null;
//     }
//   };

//   const handleEdit = async (courier) => {
//     console.log('✏️ Editing courier:', courier.name);
//     setEditingCourier(courier);
//     setShowPassword({});
//     setShowWebhookSecrets({});
//     const updatedCourier = await fetchCourierCredentials(courier._id);
//     if (!updatedCourier) {
//       setApiEnabled(courier.apiEnabled || false);
//       setStoreConfig(courier.storeConfig || {});
//       setCredentials({});
//       setWebhookConfig({ enabled: false, secret: '', bearerToken: '', token: '', events: [] });
//     }
//   };

//   // ========== 🆕 GENERATE WEBHOOK SECRET ==========
//   const generateWebhookSecret = (type) => {
//     const timestamp = Date.now().toString(36);
//     const random = Math.random().toString(36).substring(2, 10);
    
//     if (type === 'pathao') {
//       // Pathao expects UUID format
//       const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         const r = Math.random() * 16 | 0;
//         const v = c === 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//       });
//       return uuid;
//     } else {
//       // RedX and Steadfast use hex strings
//       return `${timestamp}${random}${Math.random().toString(36).substring(2, 10)}`;
//     }
//   };

//   const handleGenerateSecret = (type) => {
//     const newSecret = generateWebhookSecret(type);
//     setWebhookConfig(prev => ({
//       ...prev,
//       secret: newSecret
//     }));
//     toast.success(`New webhook secret generated for ${editingCourier?.name}`);
//   };

//   const handleGenerateToken = (type) => {
//     const newToken = generateWebhookSecret('hex');
//     if (type === 'bearer') {
//       setWebhookConfig(prev => ({ ...prev, bearerToken: newToken }));
//     } else {
//       setWebhookConfig(prev => ({ ...prev, token: newToken }));
//     }
//     toast.success(`New webhook ${type === 'bearer' ? 'bearer token' : 'token'} generated`);
//   };

//   const handleSave = async (courierId) => {
//     const isPathao = editingCourier?.slug === 'pathao';
//     const isRedx = editingCourier?.slug === 'redx';
//     const isSteadfast = editingCourier?.slug === 'steadfast';
    
//     // Validate Pathao credentials
//     if (isPathao) {
//       const requiredFields = ['clientId', 'clientSecret', 'username', 'password'];
//       const missingFields = requiredFields.filter(field => !credentials[field]?.trim());
//       if (missingFields.length > 0) {
//         toast.error(`Please fill in: ${missingFields.join(', ')}`);
//         return;
//       }
//       if (!storeConfig.pathaoStoreId) {
//         toast.error('Please enter your Pathao Store ID');
//         return;
//       }
//     }
    
//     // Validate Steadfast credentials
//     if (isSteadfast) {
//       if (!credentials.apiKey?.trim() || !credentials.secretKey?.trim()) {
//         toast.error('Please fill in both API Key and Secret Key');
//         return;
//       }
//     }

//     // Validate RedX credentials
//     if (isRedx) {
//       if (!credentials.apiToken?.trim()) {
//         toast.error('API Access Token is required for RedX integration');
//         return;
//       }
//       if (!credentials.shopId?.trim()) {
//         toast.error('Shop ID is required for RedX tracking links');
//         return;
//       }
//     }

//     // ========== 🆕 VALIDATE WEBHOOK CONFIG ==========
//     if (webhookConfig.enabled) {
//       if (isPathao && !webhookConfig.secret) {
//         toast.error('Webhook secret is required for Pathao when webhooks are enabled');
//         return;
//       }
//       if (isSteadfast && !webhookConfig.bearerToken) {
//         toast.error('Bearer token is required for Steadfast when webhooks are enabled');
//         return;
//       }
//       if (isRedx && !webhookConfig.token) {
//         toast.error('Webhook token is required for RedX when webhooks are enabled');
//         return;
//       }
//     }

//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const payload = {
//         apiEnabled,
//         credentials,
//         storeConfig: {},
//         webhookConfig: {
//           enabled: webhookConfig.enabled,
//           secret: webhookConfig.secret || null,
//           bearerToken: webhookConfig.bearerToken || null,
//           token: webhookConfig.token || null,
//           events: webhookConfig.events || []
//         }
//       };

//       if (isPathao) {
//         payload.storeConfig = {
//           pathaoStoreId: parseInt(storeConfig.pathaoStoreId) || null,
//           pathaoStoreName: storeConfig.pathaoStoreName || '',
//         };
//       }

//       if (isRedx) {
//         payload.storeConfig = {
//           pickupStoreId: storeConfig.pickupStoreId ? parseInt(storeConfig.pickupStoreId) : null,
//           redxBaseUrl: storeConfig.redxBaseUrl || '',
//         };
//       }

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/couriers/${courierId}/integration`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Courier settings saved successfully');
//         setEditingCourier(null);
//         setCredentials({});
//         setShowPassword({});
//         fetchCouriers();
//       } else {
//         toast.error(data.error || 'Failed to save settings');
//       }
//     } catch (error) {
//       console.error('Save error:', error);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleTest = async (courier) => {
//     setTesting(prev => ({ ...prev, [courier.slug]: true }));
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/couriers/${courier._id}/test-connection`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success && data.data?.success) {
//         toast.success(data.data?.message || 'Connection test successful');
//       } else {
//         toast.error(data.data?.message || data.message || 'Connection test failed');
//       }
//       fetchCouriers();
//     } catch (error) {
//       console.error('Test error:', error);
//       toast.error('Network error');
//     } finally {
//       setTesting(prev => ({ ...prev, [courier.slug]: false }));
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingCourier(null);
//     setCredentials({});
//     setStoreConfig({});
//     setWebhookConfig({ enabled: false, secret: '', bearerToken: '', token: '', events: [] });
//     setApiEnabled(false);
//     setShowPassword({});
//     setShowWebhookSecrets({});
//   };

//   const toggleWebhookSecretVisibility = (field) => {
//     setShowWebhookSecrets(prev => ({ ...prev, [field]: !prev[field] }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <FaSpinner className="w-8 h-8 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="courier_settings">
//       <div className="space-y-6 p-6">
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-[#004767] flex items-center gap-3">
//             <FaTruck className="text-blue-600" />
//             Courier Service Settings
//             <span className="text-sm font-normal text-gray-400 ml-2">
//               ({couriers.length} services)
//             </span>
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {couriers.map((courier) => {
//             const isEditing = editingCourier?._id === courier._id;
//             const fields = CREDENTIAL_FIELDS[courier.slug] || [];
//             const isTesting = testing[courier.slug];
//             const isPathao = courier.slug === 'pathao';
//             const isRedx = courier.slug === 'redx';
//             const isSteadfast = courier.slug === 'steadfast';
//             const webhookInfo = WEBHOOK_FIELDS[courier.slug] || {};

//             return (
//               <div key={courier._id} className="bg-white rounded-2xl border border-blue-600/30 p-6 shadow-sm">
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <h3 className="text-lg font-bold text-[#004767]">{courier.name}</h3>
//                     <div className="flex items-center gap-2 mt-1 flex-wrap">
//                       <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
//                         courier.apiEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
//                       }`}>
//                         {courier.apiEnabled ? 'Active' : 'Inactive'}
//                       </span>
//                       {courier.integrationStatus?.lastTestOk ? (
//                         <span className="text-green-600 text-xs flex items-center gap-1">
//                           <FaCheckCircle className="w-3 h-3" /> Connected
//                         </span>
//                       ) : courier.integrationStatus?.lastTestedAt ? (
//                         <span className="text-red-600 text-xs flex items-center gap-1">
//                           <FaTimesCircle className="w-3 h-3" /> Failed
//                         </span>
//                       ) : null}
//                       {courier.configured ? (
//                         <span className="text-blue-600 text-xs flex items-center gap-1">
//                           <FaCheckCircle className="w-3 h-3" /> Configured
//                         </span>
//                       ) : (
//                         <span className="text-gray-400 text-xs">Not configured</span>
//                       )}
//                       {courier.webhookConfig?.enabled && (
//                         <span className="text-purple-600 text-xs flex items-center gap-1">
//                           <FaWeibo className="w-3 h-3" /> Webhooks Enabled
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   {!isEditing && (
//                     <button
//                       onClick={() => handleEdit(courier)}
//                       className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
//                       title="Edit settings"
//                     >
//                       <FaEdit className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 {isEditing ? (
//                   <div className="space-y-4">
//                     {/* API Enabled Toggle */}
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         id={`api-enabled-${courier.slug}`}
//                         checked={apiEnabled}
//                         onChange={(e) => setApiEnabled(e.target.checked)}
//                         className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
//                       />
//                       <label htmlFor={`api-enabled-${courier.slug}`} className="text-sm font-medium text-[#004767]">
//                         Enable API Integration
//                       </label>
//                     </div>

//                     {/* Credentials Fields */}
//                     <div className="space-y-3">
//                       {fields.map((field) => {
//                         const fieldValue = credentials[field.name] || '';
//                         const isPassword = field.type === 'password';
//                         const isVisible = showPassword[field.name] || false;
                        
//                         return (
//                           <div key={field.name}>
//                             <label className="block text-sm font-medium text-[#004767] mb-1">
//                               {field.label}
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type={isPassword ? (isVisible ? 'text' : 'password') : field.type}
//                                 value={fieldValue}
//                                 onChange={(e) => setCredentials(prev => ({
//                                   ...prev,
//                                   [field.name]: e.target.value
//                                 }))}
//                                 className={`w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
//                                   isPassword ? 'pr-10' : ''
//                                 }`}
//                                 placeholder={`Enter ${field.label}`}
//                               />
//                               {isPassword && (
//                                 <button
//                                   type="button"
//                                   onClick={() => togglePasswordVisibility(field.name)}
//                                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                 >
//                                   {isVisible ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
//                                 </button>
//                               )}
//                             </div>
//                             {fieldValue && (
//                               <p className="text-xs text-green-600 mt-1">
//                                 <FaCheckCircle className="inline w-3 h-3 mr-1" />
//                                 Currently configured
//                               </p>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>

//                     {/* Store Config */}
//                     {isPathao && (
//                       <div>
//                         <label className="block text-sm font-medium text-[#004767] mb-1">
//                           Store ID <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="number"
//                           value={storeConfig.pathaoStoreId || ''}
//                           onChange={(e) => setStoreConfig(prev => ({
//                             ...prev,
//                             pathaoStoreId: e.target.value ? parseInt(e.target.value) : null
//                           }))}
//                           className="w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                           placeholder="Enter Pathao Store ID"
//                         />
//                         <p className="text-xs text-gray-400 mt-1">
//                           Required for Pathao. Find it in your Pathao merchant dashboard.
//                         </p>
//                       </div>
//                     )}

//                     {isSteadfast && (
//                       <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
//                         <p className="text-xs text-blue-700">
//                           <FaCheckCircle className="inline w-3 h-3 mr-1" />
//                           Steadfast only requires API Key and Secret Key. No Store ID needed.
//                         </p>
//                       </div>
//                     )}

//                     {isRedx && (
//                       <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3">
//                         <div className="flex items-start gap-2">
//                           <FaInfoCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
//                           <div>
//                             <p className="text-xs text-blue-700 font-medium">API Access Token & Shop ID:</p>
//                             <p className="text-xs text-blue-600 mt-1">
//                               Generate the API Access Token from your RedX Merchant Panel → Settings → API/Integration.
//                               The Shop ID can be found in your RedX dashboard URL or settings.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* ========== 🆕 WEBHOOK CONFIGURATION SECTION ========== */}
//                     <div className="border-t border-blue-600/20 pt-4 mt-4">
//                       <div className="flex items-center gap-2 mb-3">
//                         <FaTencentWeibo className="text-purple-600 w-5 h-5" />
//                         <h4 className="text-sm font-bold text-[#004767]">Webhook Configuration</h4>
//                         <span className="text-xs text-gray-400">(For real-time status updates)</span>
//                       </div>

//                       {/* Webhook Enabled Toggle */}
//                       <div className="flex items-center gap-2 mb-3">
//                         <input
//                           type="checkbox"
//                           id={`webhook-enabled-${courier.slug}`}
//                           checked={webhookConfig.enabled}
//                           onChange={(e) => setWebhookConfig(prev => ({ ...prev, enabled: e.target.checked }))}
//                           className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                         />
//                         <label htmlFor={`webhook-enabled-${courier.slug}`} className="text-sm font-medium text-[#004767]">
//                           Enable Webhooks
//                         </label>
//                       </div>

//                       {webhookConfig.enabled && (
//                         <div className="space-y-3 bg-purple-50 p-4 rounded-xl border border-purple-200">
//                           <p className="text-xs text-purple-700 mb-2">
//                             <FaInfoCircle className="inline w-3 h-3 mr-1" />
//                             {webhookInfo.description}
//                           </p>

//                           {/* Pathao Webhook Secret */}
//                           {isPathao && (
//                             <div>
//                               <label className="block text-sm font-medium text-[#004767] mb-1">
//                                 Webhook Secret <span className="text-red-500">*</span>
//                               </label>
//                               <div className="relative">
//                                 <input
//                                   type={showWebhookSecrets.secret ? 'text' : 'password'}
//                                   value={webhookConfig.secret}
//                                   onChange={(e) => setWebhookConfig(prev => ({ ...prev, secret: e.target.value }))}
//                                   className="w-full px-3 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-24"
//                                   placeholder={webhookInfo.defaultSecret || 'Enter webhook secret'}
//                                 />
//                                 <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
//                                   <button
//                                     type="button"
//                                     onClick={() => toggleWebhookSecretVisibility('secret')}
//                                     className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
//                                   >
//                                     {showWebhookSecrets.secret ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
//                                   </button>
//                                   <button
//                                     type="button"
//                                     onClick={() => handleGenerateSecret('pathao')}
//                                     className="p-1.5 text-purple-600 hover:text-purple-800 rounded text-xs font-medium"
//                                   >
//                                     Generate
//                                   </button>
//                                 </div>
//                               </div>
//                               <p className="text-xs text-gray-500 mt-1">{webhookInfo.secretHelp}</p>
//                               <div className="mt-2 bg-white p-2 rounded border border-purple-200">
//                                 <p className="text-xs text-gray-600 font-mono break-all">
//                                   Callback URL: {typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks/courier/pathao` : '/api/webhooks/courier/pathao'}
//                                 </p>
//                               </div>
//                             </div>
//                           )}

//                           {/* Steadfast Bearer Token */}
//                           {isSteadfast && (
//                             <div>
//                               <label className="block text-sm font-medium text-[#004767] mb-1">
//                                 Bearer Token <span className="text-red-500">*</span>
//                               </label>
//                               <div className="relative">
//                                 <input
//                                   type={showWebhookSecrets.bearerToken ? 'text' : 'password'}
//                                   value={webhookConfig.bearerToken}
//                                   onChange={(e) => setWebhookConfig(prev => ({ ...prev, bearerToken: e.target.value }))}
//                                   className="w-full px-3 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-24"
//                                   placeholder="Enter bearer token"
//                                 />
//                                 <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
//                                   <button
//                                     type="button"
//                                     onClick={() => toggleWebhookSecretVisibility('bearerToken')}
//                                     className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
//                                   >
//                                     {showWebhookSecrets.bearerToken ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
//                                   </button>
//                                   <button
//                                     type="button"
//                                     onClick={() => handleGenerateToken('bearer')}
//                                     className="p-1.5 text-purple-600 hover:text-purple-800 rounded text-xs font-medium"
//                                   >
//                                     Generate
//                                   </button>
//                                 </div>
//                               </div>
//                               <p className="text-xs text-gray-500 mt-1">{webhookInfo.secretHelp}</p>
//                               <div className="mt-2 bg-white p-2 rounded border border-purple-200">
//                                 <p className="text-xs text-gray-600 font-mono break-all">
//                                   Callback URL: {typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks/courier/steadfast` : '/api/webhooks/courier/steadfast'}
//                                 </p>
//                               </div>
//                             </div>
//                           )}

//                           {/* RedX Token */}
//                           {isRedx && (
//                             <div>
//                               <label className="block text-sm font-medium text-[#004767] mb-1">
//                                 Webhook Token <span className="text-red-500">*</span>
//                               </label>
//                               <div className="relative">
//                                 <input
//                                   type={showWebhookSecrets.token ? 'text' : 'password'}
//                                   value={webhookConfig.token}
//                                   onChange={(e) => setWebhookConfig(prev => ({ ...prev, token: e.target.value }))}
//                                   className="w-full px-3 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-24"
//                                   placeholder="Enter webhook token"
//                                 />
//                                 <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
//                                   <button
//                                     type="button"
//                                     onClick={() => toggleWebhookSecretVisibility('token')}
//                                     className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
//                                   >
//                                     {showWebhookSecrets.token ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
//                                   </button>
//                                   <button
//                                     type="button"
//                                     onClick={() => handleGenerateToken('token')}
//                                     className="p-1.5 text-purple-600 hover:text-purple-800 rounded text-xs font-medium"
//                                   >
//                                     Generate
//                                   </button>
//                                 </div>
//                               </div>
//                               <p className="text-xs text-gray-500 mt-1">{webhookInfo.secretHelp}</p>
//                               <div className="mt-2 bg-white p-2 rounded border border-purple-200">
//                                 <p className="text-xs text-gray-600 font-mono break-all">
//                                   Callback URL: {typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks/courier/redx?token=${webhookConfig.token || 'YOUR_TOKEN'}` : '/api/webhooks/courier/redx?token=YOUR_TOKEN'}
//                                 </p>
//                               </div>
//                             </div>
//                           )}

//                           <div className="text-xs text-gray-500 mt-2 border-t border-purple-200 pt-2">
//                             <FaShieldAlt className="inline w-3 h-3 mr-1" />
//                             Keep these secrets secure. They are used to verify incoming webhook requests.
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Save/Cancel Buttons */}
//                     <div className="flex gap-2 pt-2">
//                       <button
//                         onClick={() => handleSave(courier._id)}
//                         disabled={saving}
//                         className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-800 disabled:opacity-50 flex items-center justify-center gap-2"
//                       >
//                         {saving ? (
//                           <>
//                             <FaSpinner className="w-4 h-4 animate-spin" />
//                             Saving...
//                           </>
//                         ) : (
//                           <>
//                             <FaSave className="w-4 h-4" />
//                             Save
//                           </>
//                         )}
//                       </button>
//                       <button
//                         onClick={handleCancelEdit}
//                         className="px-4 py-2 border border-blue-600/30 text-gray-700 rounded-xl hover:bg-gray-50 flex items-center gap-2"
//                       >
//                         <FaTimes className="w-4 h-4" />
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     {courier.configured ? (
//                       <div className="text-sm text-green-600 flex items-center gap-1">
//                         <FaCheckCircle className="w-4 h-4" />
//                         Credentials configured
//                       </div>
//                     ) : (
//                       <div className="text-sm text-gray-400">Not configured</div>
//                     )}
                    
//                     {/* Show webhook status */}
//                     {courier.webhookConfig?.enabled && (
//                       <div className="text-sm text-purple-600 flex items-center gap-1 mt-1">
//                         <FaWeibo className="w-3 h-3" />
//                         Webhooks: Enabled
//                         {courier.webhookConfig?.secret && (
//                           <span className="text-xs text-gray-400 ml-2">
//                             (Secret: {courier.webhookConfig.secret.substring(0, 8)}...)
//                           </span>
//                         )}
//                       </div>
//                     )}
                    
//                     <button
//                       onClick={() => handleTest(courier)}
//                       disabled={isTesting || !courier.configured}
//                       className="mt-3 px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
//                     >
//                       {isTesting ? (
//                         <>
//                           <FaSpinner className="w-4 h-4 animate-spin" />
//                           Testing...
//                         </>
//                       ) : (
//                         'Test Connection'
//                       )}
//                     </button>
                    
//                     {courier.integrationStatus?.lastTestedAt && (
//                       <p className="text-xs text-gray-400 mt-2">
//                         Last tested: {new Date(courier.integrationStatus.lastTestedAt).toLocaleString()}
//                         <br />
//                         Status: {courier.integrationStatus.lastTestMessage || 'Unknown'}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// // Main export with Suspense wrapper
// export default function CourierSettingsPage() {
//   return (
//     <Suspense fallback={
//       <div className="flex justify-center items-center py-20">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500 text-sm">Loading courier settings...</p>
//         </div>
//       </div>
//     }>
//       <CourierSettingsContent />
//     </Suspense>
//   );
// }


// app/dashboard/admin/settings/couriers/page.js (Updated)

'use client';

import { useState, useEffect, Suspense } from 'react';
import { toast } from 'sonner';
import { 
  FaEdit, FaSave, FaCheckCircle, FaTimesCircle, 
  FaSpinner, FaTruck, FaTimes, FaEye, FaEyeSlash,
  FaInfoCircle, FaKey, FaShieldAlt,
  FaWeibo,
  FaTencentWeibo
} from 'react-icons/fa';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const CREDENTIAL_FIELDS = {
  pathao: [
    { name: 'clientId', label: 'Client ID', type: 'text' },
    { name: 'clientSecret', label: 'Client Secret', type: 'password' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
  ],
  steadfast: [
    { name: 'apiKey', label: 'API Key', type: 'text' },
    { name: 'secretKey', label: 'Secret Key', type: 'password' },
  ],
  redx: [
    { name: 'apiToken', label: 'API Access Token', type: 'password' },
    { name: 'phone', label: 'Phone (Optional)', type: 'text' },
    { name: 'password', label: 'Password (Optional)', type: 'password' },
    { name: 'shopId', label: 'Shop ID', type: 'text' },
  ]
};

// Webhook configuration fields per courier
const WEBHOOK_FIELDS = {
  pathao: {
    description: 'Pathao sends webhooks with X-Pathao-Signature header. The secret must match exactly.',
    secretHelp: 'Generate a random string or use the default format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    defaultSecret: 'f3992ecc-59da-4cbe-a049-a13da2018d51'
  },
  redx: {
    description: 'RedX sends webhooks with token as query parameter: ?token=YOUR_TOKEN',
    secretHelp: 'Generate a random 64-character hex string for security',
    defaultSecret: ''
  },
  steadfast: {
    description: 'Steadfast sends webhooks with Bearer token in Authorization header',
    secretHelp: 'Generate a random 64-character hex string for security',
    defaultSecret: ''
  }
};

// Main component content
function CourierSettingsContent() {
  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourier, setEditingCourier] = useState(null);
  const [credentials, setCredentials] = useState({});
  const [storeConfig, setStoreConfig] = useState({});
  const [webhookConfig, setWebhookConfig] = useState({
    enabled: false,
    secret: '',
    bearerToken: '',
    token: '',
    events: []
  });
  const [apiEnabled, setApiEnabled] = useState(false);
  const [testing, setTesting] = useState({});
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  const [showWebhookSecrets, setShowWebhookSecrets] = useState({});

  useEffect(() => {
    fetchCouriers();
  }, []);

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const fetchCouriers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/couriers`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCouriers(data.data || []);
      }
    } catch (error) {
      console.error('Fetch couriers error:', error);
      toast.error('Failed to fetch couriers');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourierCredentials = async (courierId) => {
    try {
      const token = localStorage.getItem('token');
      console.log(`📡 Fetching credentials for courier ID: ${courierId}`);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/couriers/${courierId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      console.log('📦 API Response:', data);
      
      if (data.success) {
        const courier = data.data;
        setCredentials(courier.credentials || {});
        setStoreConfig(courier.storeConfig || {});
        setApiEnabled(courier.apiEnabled || false);
        
        // Load webhook config
        setWebhookConfig({
          enabled: courier.webhookConfig?.enabled || false,
          secret: courier.webhookConfig?.secret || '',
          bearerToken: courier.webhookConfig?.bearerToken || '',
          token: courier.webhookConfig?.token || '',
          events: courier.webhookConfig?.events || []
        });
        
        return courier;
      }
      return null;
    } catch (error) {
      console.error('Fetch credentials error:', error);
      toast.error('Failed to fetch credentials');
      return null;
    }
  };

  const handleEdit = async (courier) => {
    console.log('✏️ Editing courier:', courier.name);
    setEditingCourier(courier);
    setShowPassword({});
    setShowWebhookSecrets({});
    const updatedCourier = await fetchCourierCredentials(courier._id);
    if (!updatedCourier) {
      setApiEnabled(courier.apiEnabled || false);
      setStoreConfig(courier.storeConfig || {});
      setCredentials({});
      setWebhookConfig({ enabled: false, secret: '', bearerToken: '', token: '', events: [] });
    }
  };

  // Generate webhook secret
  const generateWebhookSecret = (type) => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 10);
    
    if (type === 'pathao') {
      // Pathao expects UUID format
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      return uuid;
    } else {
      // RedX and Steadfast use hex strings
      return `${timestamp}${random}${Math.random().toString(36).substring(2, 10)}`;
    }
  };

  const handleGenerateSecret = (type) => {
    const newSecret = generateWebhookSecret(type);
    setWebhookConfig(prev => ({
      ...prev,
      secret: newSecret
    }));
    toast.success(`New webhook secret generated for ${editingCourier?.name}`);
  };

  const handleGenerateToken = (type) => {
    const newToken = generateWebhookSecret('hex');
    if (type === 'bearer') {
      setWebhookConfig(prev => ({ ...prev, bearerToken: newToken }));
    } else {
      setWebhookConfig(prev => ({ ...prev, token: newToken }));
    }
    toast.success(`New webhook ${type === 'bearer' ? 'bearer token' : 'token'} generated`);
  };

  const handleSave = async (courierId) => {
    const isPathao = editingCourier?.slug === 'pathao';
    const isRedx = editingCourier?.slug === 'redx';
    const isSteadfast = editingCourier?.slug === 'steadfast';
    
    // Validate Pathao credentials
    if (isPathao) {
      const requiredFields = ['clientId', 'clientSecret', 'username', 'password'];
      const missingFields = requiredFields.filter(field => !credentials[field]?.trim());
      if (missingFields.length > 0) {
        toast.error(`Please fill in: ${missingFields.join(', ')}`);
        return;
      }
      if (!storeConfig.pathaoStoreId) {
        toast.error('Please enter your Pathao Store ID');
        return;
      }
    }
    
    // Validate Steadfast credentials
    if (isSteadfast) {
      if (!credentials.apiKey?.trim() || !credentials.secretKey?.trim()) {
        toast.error('Please fill in both API Key and Secret Key');
        return;
      }
    }

    // Validate RedX credentials
    if (isRedx) {
      if (!credentials.apiToken?.trim()) {
        toast.error('API Access Token is required for RedX integration');
        return;
      }
      if (!credentials.shopId?.trim()) {
        toast.error('Shop ID is required for RedX tracking links');
        return;
      }
    }

    // Validate webhook config
    if (webhookConfig.enabled) {
      if (isPathao && !webhookConfig.secret) {
        toast.error('Webhook secret is required for Pathao when webhooks are enabled');
        return;
      }
      if (isSteadfast && !webhookConfig.bearerToken) {
        toast.error('Bearer token is required for Steadfast when webhooks are enabled');
        return;
      }
      if (isRedx && !webhookConfig.token) {
        toast.error('Webhook token is required for RedX when webhooks are enabled');
        return;
      }
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        apiEnabled,
        credentials,
        storeConfig: {},
        webhookConfig: {
          enabled: webhookConfig.enabled,
          secret: webhookConfig.secret || null,
          bearerToken: webhookConfig.bearerToken || null,
          token: webhookConfig.token || null,
          events: webhookConfig.events || []
        }
      };

      if (isPathao) {
        payload.storeConfig = {
          pathaoStoreId: parseInt(storeConfig.pathaoStoreId) || null,
          pathaoStoreName: storeConfig.pathaoStoreName || '',
        };
      }

      if (isRedx) {
        payload.storeConfig = {
          pickupStoreId: storeConfig.pickupStoreId ? parseInt(storeConfig.pickupStoreId) : null,
          redxBaseUrl: storeConfig.redxBaseUrl || '',
        };
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/couriers/${courierId}/integration`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Courier settings saved successfully');
        setEditingCourier(null);
        setCredentials({});
        setShowPassword({});
        fetchCouriers();
      } else {
        toast.error(data.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async (courier) => {
    setTesting(prev => ({ ...prev, [courier.slug]: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/couriers/${courier._id}/test-connection`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success && data.data?.success) {
        toast.success(data.data?.message || 'Connection test successful');
      } else {
        toast.error(data.data?.message || data.message || 'Connection test failed');
      }
      fetchCouriers();
    } catch (error) {
      console.error('Test error:', error);
      toast.error('Network error');
    } finally {
      setTesting(prev => ({ ...prev, [courier.slug]: false }));
    }
  };

  const handleCancelEdit = () => {
    setEditingCourier(null);
    setCredentials({});
    setStoreConfig({});
    setWebhookConfig({ enabled: false, secret: '', bearerToken: '', token: '', events: [] });
    setApiEnabled(false);
    setShowPassword({});
    setShowWebhookSecrets({});
  };

  const toggleWebhookSecretVisibility = (field) => {
    setShowWebhookSecrets(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FaSpinner className="w-8 h-8 animate-spin text-[#718369]" />
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="courier_settings">
      <div className="space-y-6 p-6 bg-white min-h-screen">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#2D1B2E] flex items-center gap-3">
            <FaTruck className="text-[#718369]" />
            Courier Service Settings
            <span className="text-sm font-normal text-[#718369]/60 ml-2">
              ({couriers.length} services)
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {couriers.map((courier) => {
            const isEditing = editingCourier?._id === courier._id;
            const fields = CREDENTIAL_FIELDS[courier.slug] || [];
            const isTesting = testing[courier.slug];
            const isPathao = courier.slug === 'pathao';
            const isRedx = courier.slug === 'redx';
            const isSteadfast = courier.slug === 'steadfast';
            const webhookInfo = WEBHOOK_FIELDS[courier.slug] || {};

            return (
              <div key={courier._id} className="bg-white rounded-2xl border border-[#718369]/20 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#2D1B2E]">{courier.name}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                        courier.apiEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {courier.apiEnabled ? 'Active' : 'Inactive'}
                      </span>
                      {courier.integrationStatus?.lastTestOk ? (
                        <span className="text-green-600 text-xs flex items-center gap-1">
                          <FaCheckCircle className="w-3 h-3" /> Connected
                        </span>
                      ) : courier.integrationStatus?.lastTestedAt ? (
                        <span className="text-red-600 text-xs flex items-center gap-1">
                          <FaTimesCircle className="w-3 h-3" /> Failed
                        </span>
                      ) : null}
                      {courier.configured ? (
                        <span className="text-[#718369] text-xs flex items-center gap-1">
                          <FaCheckCircle className="w-3 h-3" /> Configured
                        </span>
                      ) : (
                        <span className="text-[#718369]/40 text-xs">Not configured</span>
                      )}
                      {courier.webhookConfig?.enabled && (
                        <span className="text-purple-600 text-xs flex items-center gap-1">
                          <FaWeibo className="w-3 h-3" /> Webhooks Enabled
                        </span>
                      )}
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => handleEdit(courier)}
                      className="p-2 text-[#718369]/60 hover:text-[#718369] hover:bg-[#FFF5F6] rounded-lg transition-colors"
                      title="Edit settings"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    {/* API Enabled Toggle */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`api-enabled-${courier.slug}`}
                        checked={apiEnabled}
                        onChange={(e) => setApiEnabled(e.target.checked)}
                        className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#718369] focus:ring-[#718369]"
                      />
                      <label htmlFor={`api-enabled-${courier.slug}`} className="text-sm font-medium text-[#2D1B2E]">
                        Enable API Integration
                      </label>
                    </div>

                    {/* Credentials Fields */}
                    <div className="space-y-3">
                      {fields.map((field) => {
                        const fieldValue = credentials[field.name] || '';
                        const isPassword = field.type === 'password';
                        const isVisible = showPassword[field.name] || false;
                        
                        return (
                          <div key={field.name}>
                            <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                              {field.label}
                            </label>
                            <div className="relative">
                              <input
                                type={isPassword ? (isVisible ? 'text' : 'password') : field.type}
                                value={fieldValue}
                                onChange={(e) => setCredentials(prev => ({
                                  ...prev,
                                  [field.name]: e.target.value
                                }))}
                                className={`w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#718369] focus:border-transparent bg-white hover:border-[#718369]/30 ${
                                  isPassword ? 'pr-10' : ''
                                }`}
                                placeholder={`Enter ${field.label}`}
                              />
                              {isPassword && (
                                <button
                                  type="button"
                                  onClick={() => togglePasswordVisibility(field.name)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718369]/40 hover:text-[#718369]"
                                >
                                  {isVisible ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                </button>
                              )}
                            </div>
                            {fieldValue && (
                              <p className="text-xs text-green-600 mt-1">
                                <FaCheckCircle className="inline w-3 h-3 mr-1" />
                                Currently configured
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Store Config */}
                    {isPathao && (
                      <div>
                        <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                          Store ID <span className="text-[#718369]">*</span>
                        </label>
                        <input
                          type="number"
                          value={storeConfig.pathaoStoreId || ''}
                          onChange={(e) => setStoreConfig(prev => ({
                            ...prev,
                            pathaoStoreId: e.target.value ? parseInt(e.target.value) : null
                          }))}
                          className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#718369] focus:border-transparent bg-white hover:border-[#718369]/30"
                          placeholder="Enter Pathao Store ID"
                        />
                        <p className="text-xs text-[#718369]/40 mt-1">
                          Required for Pathao. Find it in your Pathao merchant dashboard.
                        </p>
                      </div>
                    )}

                    {isSteadfast && (
                      <div className="bg-[#FFF5F6] border border-[#718369]/20 rounded-xl p-3">
                        <p className="text-xs text-[#718369]">
                          <FaCheckCircle className="inline w-3 h-3 mr-1" />
                          Steadfast only requires API Key and Secret Key. No Store ID needed.
                        </p>
                      </div>
                    )}

                    {isRedx && (
                      <div className="bg-[#FFF5F6] border border-[#718369]/20 rounded-xl p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <FaInfoCircle className="w-4 h-4 text-[#718369] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-[#2D1B2E] font-medium">API Access Token & Shop ID:</p>
                            <p className="text-xs text-[#718369]/60 mt-1">
                              Generate the API Access Token from your RedX Merchant Panel → Settings → API/Integration.
                              The Shop ID can be found in your RedX dashboard URL or settings.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Webhook Configuration Section */}
                    <div className="border-t border-[#F7C7D3]/40 pt-4 mt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FaTencentWeibo className="text-purple-600 w-5 h-5" />
                        <h4 className="text-sm font-bold text-[#2D1B2E]">Webhook Configuration</h4>
                        <span className="text-xs text-[#718369]/40">(For real-time status updates)</span>
                      </div>

                      {/* Webhook Enabled Toggle */}
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="checkbox"
                          id={`webhook-enabled-${courier.slug}`}
                          checked={webhookConfig.enabled}
                          onChange={(e) => setWebhookConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                          className="w-4 h-4 rounded border-[#F7C7D3]/50 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor={`webhook-enabled-${courier.slug}`} className="text-sm font-medium text-[#2D1B2E]">
                          Enable Webhooks
                        </label>
                      </div>

                      {webhookConfig.enabled && (
                        <div className="space-y-3 bg-purple-50 p-4 rounded-xl border border-purple-200">
                          <p className="text-xs text-purple-700 mb-2">
                            <FaInfoCircle className="inline w-3 h-3 mr-1" />
                            {webhookInfo.description}
                          </p>

                          {/* Pathao Webhook Secret */}
                          {isPathao && (
                            <div>
                              <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                                Webhook Secret <span className="text-[#718369]">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type={showWebhookSecrets.secret ? 'text' : 'password'}
                                  value={webhookConfig.secret}
                                  onChange={(e) => setWebhookConfig(prev => ({ ...prev, secret: e.target.value }))}
                                  className="w-full px-3 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-24 bg-white"
                                  placeholder={webhookInfo.defaultSecret || 'Enter webhook secret'}
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                  <button
                                    type="button"
                                    onClick={() => toggleWebhookSecretVisibility('secret')}
                                    className="p-1.5 text-[#718369]/40 hover:text-[#718369] rounded"
                                  >
                                    {showWebhookSecrets.secret ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleGenerateSecret('pathao')}
                                    className="p-1.5 text-purple-600 hover:text-purple-800 rounded text-xs font-medium"
                                  >
                                    Generate
                                  </button>
                                </div>
                              </div>
                              <p className="text-xs text-[#718369]/40 mt-1">{webhookInfo.secretHelp}</p>
                              <div className="mt-2 bg-white p-2 rounded border border-purple-200">
                                <p className="text-xs text-[#2D1B2E] font-mono break-all">
                                  Callback URL: {typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks/courier/pathao` : '/api/webhooks/courier/pathao'}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Steadfast Bearer Token */}
                          {isSteadfast && (
                            <div>
                              <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                                Bearer Token <span className="text-[#718369]">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type={showWebhookSecrets.bearerToken ? 'text' : 'password'}
                                  value={webhookConfig.bearerToken}
                                  onChange={(e) => setWebhookConfig(prev => ({ ...prev, bearerToken: e.target.value }))}
                                  className="w-full px-3 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-24 bg-white"
                                  placeholder="Enter bearer token"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                  <button
                                    type="button"
                                    onClick={() => toggleWebhookSecretVisibility('bearerToken')}
                                    className="p-1.5 text-[#718369]/40 hover:text-[#718369] rounded"
                                  >
                                    {showWebhookSecrets.bearerToken ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleGenerateToken('bearer')}
                                    className="p-1.5 text-purple-600 hover:text-purple-800 rounded text-xs font-medium"
                                  >
                                    Generate
                                  </button>
                                </div>
                              </div>
                              <p className="text-xs text-[#718369]/40 mt-1">{webhookInfo.secretHelp}</p>
                              <div className="mt-2 bg-white p-2 rounded border border-purple-200">
                                <p className="text-xs text-[#2D1B2E] font-mono break-all">
                                  Callback URL: {typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks/courier/steadfast` : '/api/webhooks/courier/steadfast'}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* RedX Token */}
                          {isRedx && (
                            <div>
                              <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
                                Webhook Token <span className="text-[#718369]">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type={showWebhookSecrets.token ? 'text' : 'password'}
                                  value={webhookConfig.token}
                                  onChange={(e) => setWebhookConfig(prev => ({ ...prev, token: e.target.value }))}
                                  className="w-full px-3 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-24 bg-white"
                                  placeholder="Enter webhook token"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                  <button
                                    type="button"
                                    onClick={() => toggleWebhookSecretVisibility('token')}
                                    className="p-1.5 text-[#718369]/40 hover:text-[#718369] rounded"
                                  >
                                    {showWebhookSecrets.token ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleGenerateToken('token')}
                                    className="p-1.5 text-purple-600 hover:text-purple-800 rounded text-xs font-medium"
                                  >
                                    Generate
                                  </button>
                                </div>
                              </div>
                              <p className="text-xs text-[#718369]/40 mt-1">{webhookInfo.secretHelp}</p>
                              <div className="mt-2 bg-white p-2 rounded border border-purple-200">
                                <p className="text-xs text-[#2D1B2E] font-mono break-all">
                                  Callback URL: {typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks/courier/redx?token=${webhookConfig.token || 'YOUR_TOKEN'}` : '/api/webhooks/courier/redx?token=YOUR_TOKEN'}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="text-xs text-[#718369]/60 mt-2 border-t border-purple-200 pt-2">
                            <FaShieldAlt className="inline w-3 h-3 mr-1" />
                            Keep these secrets secure. They are used to verify incoming webhook requests.
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Save/Cancel Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleSave(courier._id)}
                        disabled={saving}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-[#718369] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#718369]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {saving ? (
                          <>
                            <FaSpinner className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="w-4 h-4" />
                            Save
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 border border-[#F7C7D3]/50 text-[#2D1B2E] rounded-xl hover:bg-[#FFF5F6] transition-all flex items-center gap-2"
                      >
                        <FaTimes className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {courier.configured ? (
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        <FaCheckCircle className="w-4 h-4" />
                        Credentials configured
                      </div>
                    ) : (
                      <div className="text-sm text-[#718369]/40">Not configured</div>
                    )}
                    
                    {/* Show webhook status */}
                    {courier.webhookConfig?.enabled && (
                      <div className="text-sm text-purple-600 flex items-center gap-1 mt-1">
                        <FaWeibo className="w-3 h-3" />
                        Webhooks: Enabled
                        {courier.webhookConfig?.secret && (
                          <span className="text-xs text-[#718369]/40 ml-2">
                            (Secret: {courier.webhookConfig.secret.substring(0, 8)}...)
                          </span>
                        )}
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleTest(courier)}
                      disabled={isTesting || !courier.configured}
                      className="mt-3 px-4 py-2 border border-[#718369] text-[#718369] rounded-xl hover:bg-[#718369] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {isTesting ? (
                        <>
                          <FaSpinner className="w-4 h-4 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        'Test Connection'
                      )}
                    </button>
                    
                    {courier.integrationStatus?.lastTestedAt && (
                      <p className="text-xs text-[#718369]/40 mt-2">
                        Last tested: {new Date(courier.integrationStatus.lastTestedAt).toLocaleString()}
                        <br />
                        Status: {courier.integrationStatus.lastTestMessage || 'Unknown'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Main export with Suspense wrapper
export default function CourierSettingsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#718369] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading courier settings...</p>
        </div>
      </div>
    }>
      <CourierSettingsContent />
    </Suspense>
  );
}