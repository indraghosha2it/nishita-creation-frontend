// 'use client';

// import { useState, useEffect } from 'react';
// import { toast } from 'sonner';
// import { 
//   FaEnvelope, FaSave, FaCheckCircle, FaTimesCircle, 
//   FaSpinner, FaSync, FaMailBulk, FaShoppingBag, FaCog
// } from 'react-icons/fa';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// export default function EmailSettingsPage() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [testing, setTesting] = useState({ order: false, system: false });
  
//   // Order Email Settings
//   const [orderSettings, setOrderSettings] = useState({
//     smtpHost: '',
//     smtpPort: '',
//     smtpUser: '',
//     smtpPassword: '',
//     smtpSecure: false,
//     fromEmail: '',
//     fromName: 'Smart Gadget',
//     ownerEmail: ''
//   });
  
//   // System Email Settings
//   const [systemSettings, setSystemSettings] = useState({
//     smtpHost: '',
//     smtpPort: '',
//     smtpUser: '',
//     smtpPassword: '',
//     smtpSecure: false,
//     fromEmail: '',
//     fromName: 'Smart Gadget',
//     ownerEmail: ''
//   });
  
//   const [status, setStatus] = useState({
//     order: { isConfigured: false, lastTestedAt: null, lastTestResult: false, lastTestMessage: '' },
//     system: { isConfigured: false, lastTestedAt: null, lastTestResult: false, lastTestMessage: '' }
//   });

//   useEffect(() => {
//     fetchSettings('order');
//     fetchSettings('system');
//     fetchStatus('order');
//     fetchStatus('system');
//   }, []);

//   const fetchSettings = async (type) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/email-settings/${type}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         const settings = data.data;
//         if (type === 'order') {
//           setOrderSettings({
//             smtpHost: settings.smtpHost || '',
//             smtpPort: settings.smtpPort || '',
//             smtpUser: settings.smtpUser || '',
//             smtpPassword: settings.smtpPassword || '', // ✅ Password now shows
//             smtpSecure: settings.smtpSecure || false,
//             fromEmail: settings.fromEmail || '',
//             fromName: settings.fromName || 'Smart Gadget',
//             ownerEmail: settings.ownerEmail || ''
//           });
//         } else {
//           setSystemSettings({
//             smtpHost: settings.smtpHost || '',
//             smtpPort: settings.smtpPort || '',
//             smtpUser: settings.smtpUser || '',
//             smtpPassword: settings.smtpPassword || '', // ✅ Password now shows
//             smtpSecure: settings.smtpSecure || false,
//             fromEmail: settings.fromEmail || '',
//             fromName: settings.fromName || 'Smart Gadget',
//             ownerEmail: settings.ownerEmail || ''
//           });
//         }
//       }
//     } catch (error) {
//       console.error(`Fetch ${type} settings error:`, error);
//       toast.error(`Failed to fetch ${type} email settings`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStatus = async (type) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/email-settings/${type}/status`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setStatus(prev => ({
//           ...prev,
//           [type]: data.data
//         }));
//       }
//     } catch (error) {
//       console.error(`Fetch ${type} status error:`, error);
//     }
//   };

//   const handleInputChange = (type, e) => {
//     const { name, value, type: inputType, checked } = e.target;
//     if (type === 'order') {
//       setOrderSettings(prev => ({
//         ...prev,
//         [name]: inputType === 'checkbox' ? checked : value
//       }));
//     } else {
//       setSystemSettings(prev => ({
//         ...prev,
//         [name]: inputType === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   const handleSave = async (type) => {
//     const settings = type === 'order' ? orderSettings : systemSettings;
    
//     // Validate
//     if (!settings.smtpHost) {
//       toast.error('SMTP Host is required');
//       return;
//     }
//     if (!settings.smtpPort) {
//       toast.error('SMTP Port is required');
//       return;
//     }
//     if (!settings.smtpUser) {
//       toast.error('SMTP Username is required');
//       return;
//     }
//     if (!settings.smtpPassword) {
//       toast.error('SMTP Password is required');
//       return;
//     }
//     if (!settings.fromEmail) {
//       toast.error('From Email is required');
//       return;
//     }
//     if (!settings.ownerEmail) {
//       toast.error('Owner Email is required');
//       return;
//     }

//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/email-settings/${type}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(settings)
//       });
//       const data = await response.json();
//       if (data.success) {
//         toast.success(`${type === 'order' ? 'Order' : 'System'} email settings saved successfully`);
//         // Refresh the settings to show updated data
//         fetchSettings(type);
//         fetchStatus(type);
//       } else {
//         toast.error(data.error || `Failed to save ${type} settings`);
//       }
//     } catch (error) {
//       console.error('Save error:', error);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleTest = async (type) => {
//     setTesting(prev => ({ ...prev, [type]: true }));
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/email-settings/${type}/test`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         toast.success('Test email sent successfully! Check your inbox.');
//         fetchStatus(type);
//       } else {
//         toast.error(data.error || 'Test email failed');
//       }
//     } catch (error) {
//       console.error('Test error:', error);
//       toast.error('Network error');
//     } finally {
//       setTesting(prev => ({ ...prev, [type]: false }));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <FaSpinner className="w-8 h-8 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   const renderEmailSettings = (type, settings, status, onSave, onTest, isTesting) => {
//     const isOrder = type === 'order';
//     const title = isOrder ? 'Order Email Configuration' : 'System Email Configuration';
//     const icon = isOrder ? <FaShoppingBag className="text-blue-600" /> : <FaCog className="text-blue-600" />;
//     const description = isOrder 
//       ? 'Configure email settings for order confirmations, status updates, and invoices'
//       : 'Configure email settings for password reset, admin notifications, and system alerts';

//     return (
//       <div className="bg-white rounded-2xl border border-blue-600/30 p-6 shadow-sm">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-3">
//             {icon}
//             <div>
//               <h3 className="text-lg font-bold text-black">{title}</h3>
//               <p className="text-xs text-gray-500">{description}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
//               status.isConfigured ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//             }`}>
//               {status.isConfigured ? (
//                 <><FaCheckCircle className="w-3 h-3" /> Configured</>
//               ) : (
//                 <><FaTimesCircle className="w-3 h-3" /> Not Configured</>
//               )}
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* SMTP Host */}
//           <div>
//             <label className="block text-sm font-medium text-black mb-1">
//               SMTP Host <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="smtpHost"
//               value={settings.smtpHost || ''}
//               onChange={(e) => handleInputChange(type, e)}
//               placeholder="e.g., smtp.gmail.com"
//               className="w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//             />
//           </div>

//           {/* SMTP Port */}
//           <div>
//             <label className="block text-sm font-medium text-black mb-1">
//               SMTP Port <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="smtpPort"
//               value={settings.smtpPort || ''}
//               onChange={(e) => handleInputChange(type, e)}
//               placeholder="e.g., 587 or 465"
//               className="w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//             />
//           </div>

//           {/* SMTP Username */}
//           <div>
//             <label className="block text-sm font-medium text-black mb-1">
//               SMTP Username <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="smtpUser"
//               value={settings.smtpUser || ''}
//               onChange={(e) => handleInputChange(type, e)}
//               placeholder="e.g., order@yourdomain.com"
//               className="w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//             />
//           </div>

//           {/* SMTP Password - Now showing saved value */}
//           <div>
//             <label className="block text-sm font-medium text-black mb-1">
//               SMTP Password <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="smtpPassword"
//               value={settings.smtpPassword || ''}
//               onChange={(e) => handleInputChange(type, e)}
//               placeholder="Enter your SMTP password"
//               className="w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//             />
//             {settings.smtpPassword && (
//               <p className="text-xs text-green-600 mt-1">
//                 <FaCheckCircle className="inline w-3 h-3 mr-1" />
//                 Password is configured
//               </p>
//             )}
//           </div>

//           {/* Secure Connection */}
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="smtpSecure"
//               checked={settings.smtpSecure || false}
//               onChange={(e) => handleInputChange(type, e)}
//               className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
//             />
//             <label className="text-sm font-medium text-black">
//               Use Secure Connection (SSL/TLS)
//             </label>
//             <span className="text-xs text-gray-400 ml-2">
//               (Check for port 465, uncheck for port 587)
//             </span>
//           </div>

//           {/* From Email */}
//           <div>
//             <label className="block text-sm font-medium text-black mb-1">
//               From Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               name="fromEmail"
//               value={settings.fromEmail || ''}
//               onChange={(e) => handleInputChange(type, e)}
//               placeholder="e.g., orders@yourdomain.com"
//               className="w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//             />
//           </div>

//           {/* From Name */}
//           <div>
//             <label className="block text-sm font-medium text-black mb-1">
//               From Name
//             </label>
//             <input
//               type="text"
//               name="fromName"
//               value={settings.fromName || 'Smart Gadget'}
//               onChange={(e) => handleInputChange(type, e)}
//               placeholder="e.g., Smart Gadget Orders"
//               className="w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//             />
//           </div>

//           {/* Owner Email */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-black mb-1">
//               Owner/Admin Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               name="ownerEmail"
//               value={settings.ownerEmail || ''}
//               onChange={(e) => handleInputChange(type, e)}
//               placeholder="e.g., admin@yourdomain.com"
//               className="w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               {isOrder ? 'Order notifications will be sent to this email' : 'System notifications will be sent to this email'}
//             </p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-blue-600/30">
//           <button
//             onClick={() => onSave(type)}
//             disabled={saving}
//             className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
//           >
//             {saving ? (
//               <><FaSpinner className="w-4 h-4 animate-spin" /> Saving...</>
//             ) : (
//               <><FaSave className="w-4 h-4" /> Save Settings</>
//             )}
//           </button>

//           <button
//             onClick={() => onTest(type)}
//             disabled={isTesting}
//             className="px-6 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
//           >
//             {isTesting ? (
//               <><FaSpinner className="w-4 h-4 animate-spin" /> Sending Test...</>
//             ) : (
//               <><FaSync className="w-4 h-4" /> Send Test Email</>
//             )}
//           </button>
//         </div>

//         {/* Status Messages */}
//         {status.lastTestMessage && (
//           <div className={`mt-4 p-3 rounded-xl border ${
//             status.lastTestResult ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
//           }`}>
//             <p className="text-sm flex items-center gap-2">
//               {status.lastTestResult ? <FaCheckCircle className="w-4 h-4" /> : <FaTimesCircle className="w-4 h-4" />}
//               {status.lastTestMessage}
//               {status.lastTestedAt && (
//                 <span className="text-xs text-gray-500 ml-2">
//                   ({new Date(status.lastTestedAt).toLocaleString()})
//                 </span>
//               )}
//             </p>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <ProtectedRoute pageKey="email_settings">
//     <div className="space-y-6 p-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-black flex items-center gap-3">
//           <FaMailBulk className="text-blue-600" />
//           Email Configuration
//         </h2>
//         <div className="text-sm text-gray-500">
//           Configure separate email settings for different services
//         </div>
//       </div>

//       {/* Order Email Settings */}
//       {renderEmailSettings(
//         'order',
//         orderSettings,
//         status.order,
//         handleSave,
//         handleTest,
//         testing.order
//       )}

//       {/* System Email Settings */}
//       {renderEmailSettings(
//         'system',
//         systemSettings,
//         status.system,
//         handleSave,
//         handleTest,
//         testing.system
//       )}

//       {/* Info Box */}
//       <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//         <div className="flex items-start gap-3">
//           <FaEnvelope className="w-5 h-5 text-blue-500 mt-0.5" />
//           <div>
//             <h4 className="text-sm font-semibold text-blue-700">Email Service Usage</h4>
//             <ul className="text-xs text-blue-600 mt-1 space-y-1">
//               <li>• <strong>Order Email:</strong> Used for order confirmations, status updates etc.</li>
//               <li>• <strong>System Email:</strong> Used for password reset,  system alerts, internal communications etc.</li>
//               <li>• Each service can use different SMTP providers</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//     </ProtectedRoute>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  FaEnvelope, FaSave, FaCheckCircle, FaTimesCircle, 
  FaSpinner, FaSync, FaMailBulk, FaShoppingBag, FaCog
} from 'react-icons/fa';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function EmailSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState({ order: false, system: false });
  
  // Order Email Settings
  const [orderSettings, setOrderSettings] = useState({
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
    smtpSecure: false,
    fromEmail: '',
    fromName: 'Beauty Bucket',
    ownerEmail: ''
  });
  
  // System Email Settings
  const [systemSettings, setSystemSettings] = useState({
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
    smtpSecure: false,
    fromEmail: '',
    fromName: 'Beauty Bucket',
    ownerEmail: ''
  });
  
  const [status, setStatus] = useState({
    order: { isConfigured: false, lastTestedAt: null, lastTestResult: false, lastTestMessage: '' },
    system: { isConfigured: false, lastTestedAt: null, lastTestResult: false, lastTestMessage: '' }
  });

  useEffect(() => {
    fetchSettings('order');
    fetchSettings('system');
    fetchStatus('order');
    fetchStatus('system');
  }, []);

  const fetchSettings = async (type) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/email-settings/${type}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        const settings = data.data;
        if (type === 'order') {
          setOrderSettings({
            smtpHost: settings.smtpHost || '',
            smtpPort: settings.smtpPort || '',
            smtpUser: settings.smtpUser || '',
            smtpPassword: settings.smtpPassword || '',
            smtpSecure: settings.smtpSecure || false,
            fromEmail: settings.fromEmail || '',
            fromName: settings.fromName || 'Beauty Bucket',
            ownerEmail: settings.ownerEmail || ''
          });
        } else {
          setSystemSettings({
            smtpHost: settings.smtpHost || '',
            smtpPort: settings.smtpPort || '',
            smtpUser: settings.smtpUser || '',
            smtpPassword: settings.smtpPassword || '',
            smtpSecure: settings.smtpSecure || false,
            fromEmail: settings.fromEmail || '',
            fromName: settings.fromName || 'Beauty Bucket',
            ownerEmail: settings.ownerEmail || ''
          });
        }
      }
    } catch (error) {
      console.error(`Fetch ${type} settings error:`, error);
      toast.error(`Failed to fetch ${type} email settings`);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatus = async (type) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/email-settings/${type}/status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setStatus(prev => ({
          ...prev,
          [type]: data.data
        }));
      }
    } catch (error) {
      console.error(`Fetch ${type} status error:`, error);
    }
  };

  const handleInputChange = (type, e) => {
    const { name, value, type: inputType, checked } = e.target;
    if (type === 'order') {
      setOrderSettings(prev => ({
        ...prev,
        [name]: inputType === 'checkbox' ? checked : value
      }));
    } else {
      setSystemSettings(prev => ({
        ...prev,
        [name]: inputType === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSave = async (type) => {
    const settings = type === 'order' ? orderSettings : systemSettings;
    
    // Validate
    if (!settings.smtpHost) {
      toast.error('SMTP Host is required');
      return;
    }
    if (!settings.smtpPort) {
      toast.error('SMTP Port is required');
      return;
    }
    if (!settings.smtpUser) {
      toast.error('SMTP Username is required');
      return;
    }
    if (!settings.smtpPassword) {
      toast.error('SMTP Password is required');
      return;
    }
    if (!settings.fromEmail) {
      toast.error('From Email is required');
      return;
    }
    if (!settings.ownerEmail) {
      toast.error('Owner Email is required');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/email-settings/${type}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`${type === 'order' ? 'Order' : 'System'} email settings saved successfully`);
        fetchSettings(type);
        fetchStatus(type);
      } else {
        toast.error(data.error || `Failed to save ${type} settings`);
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async (type) => {
    setTesting(prev => ({ ...prev, [type]: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/email-settings/${type}/test`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Test email sent successfully! Check your inbox.');
        fetchStatus(type);
      } else {
        toast.error(data.error || 'Test email failed');
      }
    } catch (error) {
      console.error('Test error:', error);
      toast.error('Network error');
    } finally {
      setTesting(prev => ({ ...prev, [type]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FaSpinner className="w-8 h-8 animate-spin text-[#6F8167]" />
      </div>
    );
  }

  const renderEmailSettings = (type, settings, status, onSave, onTest, isTesting) => {
    const isOrder = type === 'order';
    const title = isOrder ? 'Order Email Configuration' : 'System Email Configuration';
    const icon = isOrder ? <FaShoppingBag className="text-[#6F8167]" /> : <FaCog className="text-[#6F8167]" />;
    const description = isOrder 
      ? 'Configure email settings for order confirmations, status updates, and invoices'
      : 'Configure email settings for password reset, admin notifications, and system alerts';

    return (
      <div className="bg-white rounded-2xl border border-[#6F8167]/20 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <h3 className="text-lg font-bold text-[#2D1B2E]">{title}</h3>
              <p className="text-xs text-[#6F8167]/60">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
              status.isConfigured ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {status.isConfigured ? (
                <><FaCheckCircle className="w-3 h-3" /> Configured</>
              ) : (
                <><FaTimesCircle className="w-3 h-3" /> Not Configured</>
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SMTP Host */}
          <div>
            <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
              SMTP Host <span className="text-[#6F8167]">*</span>
            </label>
            <input
              type="text"
              name="smtpHost"
              value={settings.smtpHost || ''}
              onChange={(e) => handleInputChange(type, e)}
              placeholder="e.g., smtp.gmail.com"
              className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#6F8167] focus:border-transparent bg-white hover:border-[#6F8167]/30"
            />
          </div>

          {/* SMTP Port */}
          <div>
            <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
              SMTP Port <span className="text-[#6F8167]">*</span>
            </label>
            <input
              type="text"
              name="smtpPort"
              value={settings.smtpPort || ''}
              onChange={(e) => handleInputChange(type, e)}
              placeholder="e.g., 587 or 465"
              className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#6F8167] focus:border-transparent bg-white hover:border-[#6F8167]/30"
            />
          </div>

          {/* SMTP Username */}
          <div>
            <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
              SMTP Username <span className="text-[#6F8167]">*</span>
            </label>
            <input
              type="text"
              name="smtpUser"
              value={settings.smtpUser || ''}
              onChange={(e) => handleInputChange(type, e)}
              placeholder="e.g., order@yourdomain.com"
              className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#6F8167] focus:border-transparent bg-white hover:border-[#6F8167]/30"
            />
          </div>

          {/* SMTP Password */}
          <div>
            <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
              SMTP Password <span className="text-[#6F8167]">*</span>
            </label>
            <input
              type="text"
              name="smtpPassword"
              value={settings.smtpPassword || ''}
              onChange={(e) => handleInputChange(type, e)}
              placeholder="Enter your SMTP password"
              className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#6F8167] focus:border-transparent bg-white hover:border-[#6F8167]/30"
            />
            {settings.smtpPassword && (
              <p className="text-xs text-green-600 mt-1">
                <FaCheckCircle className="inline w-3 h-3 mr-1" />
                Password is configured
              </p>
            )}
          </div>

          {/* Secure Connection */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="smtpSecure"
              checked={settings.smtpSecure || false}
              onChange={(e) => handleInputChange(type, e)}
              className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#6F8167] focus:ring-[#6F8167]"
            />
            <label className="text-sm font-medium text-[#2D1B2E]">
              Use Secure Connection (SSL/TLS)
            </label>
            <span className="text-xs text-[#6F8167]/40 ml-2">
              (Check for port 465, uncheck for port 587)
            </span>
          </div>

          {/* From Email */}
          <div>
            <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
              From Email <span className="text-[#6F8167]">*</span>
            </label>
            <input
              type="email"
              name="fromEmail"
              value={settings.fromEmail || ''}
              onChange={(e) => handleInputChange(type, e)}
              placeholder="e.g., orders@yourdomain.com"
              className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#6F8167] focus:border-transparent bg-white hover:border-[#6F8167]/30"
            />
          </div>

          {/* From Name */}
          <div>
            <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
              From Name
            </label>
            <input
              type="text"
              name="fromName"
              value={settings.fromName || 'Beauty Bucket'}
              onChange={(e) => handleInputChange(type, e)}
              placeholder="e.g., Beauty Bucket Orders"
              className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#6F8167] focus:border-transparent bg-white hover:border-[#6F8167]/30"
            />
          </div>

          {/* Owner Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
              Owner/Admin Email <span className="text-[#6F8167]">*</span>
            </label>
            <input
              type="email"
              name="ownerEmail"
              value={settings.ownerEmail || ''}
              onChange={(e) => handleInputChange(type, e)}
              placeholder="e.g., admin@yourdomain.com"
              className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#6F8167] focus:border-transparent bg-white hover:border-[#6F8167]/30"
            />
            <p className="text-xs text-[#6F8167]/40 mt-1">
              {isOrder ? 'Order notifications will be sent to this email' : 'System notifications will be sent to this email'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#F7C7D3]/40">
          <button
            onClick={() => onSave(type)}
            disabled={saving}
            className="px-6 py-2 bg-[#6F8167] text-white rounded-xl hover:shadow-lg hover:shadow-[#6F8167]/25 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <><FaSpinner className="w-4 h-4 animate-spin" /> Saving...</>
            ) : (
              <><FaSave className="w-4 h-4" /> Save Settings</>
            )}
          </button>

          <button
            onClick={() => onTest(type)}
            disabled={isTesting}
            className="px-6 py-2 border border-[#6F8167] text-[#6F8167] rounded-xl hover:bg-[#6F8167] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isTesting ? (
              <><FaSpinner className="w-4 h-4 animate-spin" /> Sending Test...</>
            ) : (
              <><FaSync className="w-4 h-4" /> Send Test Email</>
            )}
          </button>
        </div>

        {/* Status Messages */}
        {status.lastTestMessage && (
          <div className={`mt-4 p-3 rounded-xl border ${
            status.lastTestResult ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <p className="text-sm flex items-center gap-2">
              {status.lastTestResult ? <FaCheckCircle className="w-4 h-4" /> : <FaTimesCircle className="w-4 h-4" />}
              {status.lastTestMessage}
              {status.lastTestedAt && (
                <span className="text-xs text-[#6F8167]/40 ml-2">
                  ({new Date(status.lastTestedAt).toLocaleString()})
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <ProtectedRoute pageKey="email_settings">
    <div className="space-y-6 p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2D1B2E] flex items-center gap-3">
          <FaMailBulk className="text-[#6F8167]" />
          Email Configuration
        </h2>
        <div className="text-sm text-[#6F8167]/60">
          Configure separate email settings for different services
        </div>
      </div>

      {/* Order Email Settings */}
      {renderEmailSettings(
        'order',
        orderSettings,
        status.order,
        handleSave,
        handleTest,
        testing.order
      )}

      {/* System Email Settings */}
      {renderEmailSettings(
        'system',
        systemSettings,
        status.system,
        handleSave,
        handleTest,
        testing.system
      )}

      {/* Info Box */}
      <div className="bg-[#FFF5F6] border border-[#6F8167]/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <FaEnvelope className="w-5 h-5 text-[#6F8167] mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-[#2D1B2E]">Email Service Usage</h4>
            <ul className="text-xs text-[#2D1B2E]/70 mt-1 space-y-1">
              <li>• <strong>Order Email:</strong> Used for order confirmations, status updates etc.</li>
              <li>• <strong>System Email:</strong> Used for password reset, system alerts, internal communications etc.</li>
              <li>• Each service can use different SMTP providers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}