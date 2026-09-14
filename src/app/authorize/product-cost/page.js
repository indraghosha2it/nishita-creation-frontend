
// 'use client';

// import { useState, useEffect, Suspense } from 'react';
// import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { toast } from 'sonner';
// import { 
//   FaBoxOpen, 
//   FaSave, 
//   FaSpinner, 
//   FaTruck,
//   FaHistory,
//   FaUndo
// } from 'react-icons/fa';
// import { 
//   Sparkles,
//   ArrowLeft,
//   CheckCircle,
//   Package,
//   AlertCircle,
//   ChevronRight
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ========== MAIN COMPONENT CONTENT ==========
// function ProductCostSettingsContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [settings, setSettings] = useState({
//     packagingCost: '',
//     deliveryCost: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [resetting, setResetting] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [updatedBy, setUpdatedBy] = useState(null);
//   const [version, setVersion] = useState(1);

//   useEffect(() => {
//     fetchSettings();
//   }, []);

//   const fetchSettings = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/product-cost/settings', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const result = await response.json();
      
//       if (result.success) {
//         setSettings({
//           packagingCost: result.data.packagingCost === 0 ? '' : result.data.packagingCost,
//           deliveryCost: result.data.deliveryCost === 0 ? '' : result.data.deliveryCost
//         });
//         setLastUpdated(result.data.updatedAt);
//         setUpdatedBy(result.data.updatedBy);
//         setVersion(result.data.version || 1);
//       } else {
//         toast.error('Failed to load settings');
//       }
//     } catch (error) {
//       console.error('Error fetching settings:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!settings.packagingCost && !settings.deliveryCost) {
//       toast.error('Please enter at least one cost value');
//       return;
//     }
    
//     setSaving(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/product-cost/settings', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           packagingCost: settings.packagingCost ? Number(settings.packagingCost) : 0,
//           deliveryCost: settings.deliveryCost ? Number(settings.deliveryCost) : 0
//         })
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         toast.success('Product cost settings updated successfully');
//         setLastUpdated(result.data.updatedAt);
//         setUpdatedBy(result.data.updatedBy);
//         setVersion(result.data.version || version + 1);
//         await fetchSettings();
//       } else {
//         toast.error(result.error || 'Failed to update settings');
//       }
//     } catch (error) {
//       console.error('Error updating settings:', error);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleReset = async () => {
//     if (!confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
//       return;
//     }
    
//     setResetting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/product-cost/settings/reset', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         toast.success('Settings reset to defaults');
//         setSettings({
//           packagingCost: '',
//           deliveryCost: ''
//         });
//         setLastUpdated(result.data.updatedAt);
//         setUpdatedBy(result.data.updatedBy);
//         setVersion(result.data.version || 1);
//       } else {
//         toast.error(result.error || 'Failed to reset settings');
//       }
//     } catch (error) {
//       console.error('Error resetting settings:', error);
//       toast.error('Network error');
//     } finally {
//       setResetting(false);
//     }
//   };

//   const handleNumberChange = (e) => {
//     const { name, value } = e.target;
//     if (value === '' || /^\d*$/.test(value)) {
//       setSettings(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     if (value === '' || value === null) {
//       setSettings(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleString('en-BD', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh] bg-white">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-600 font-medium">Loading product cost settings...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="product_cost">
//     <div className="min-h-screen bg-white">
//       {/* Header - Black and White Theme */}
//       <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <a 
//                 href="/authorize/dashboard" 
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-black" />
//               </a>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <Package className="w-6 h-6 text-black" />
//                   <h1 className="text-xl font-bold text-gray-900">Product Cost Settings</h1>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1">Configure default packaging and delivery costs</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               {version > 1 && (
//                 <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1 border border-gray-200">
//                   <FaHistory className="w-3 h-3" />
//                   v{version}
//                 </span>
//               )}
//               <Sparkles className="w-5 h-5 text-gray-400" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-2xl mx-auto py-8 px-4">
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//           {/* Header Section - Black Accent */}
//           <div className="p-6 bg-black">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-white text-lg font-semibold flex items-center gap-2">
//                   <FaBoxOpen className="w-5 h-5 text-white" />
//                   Default Product Costs
//                 </h2>
//                 <p className="text-gray-300 text-sm mt-1">Set default costs that apply to all new products</p>
//               </div>
//               {lastUpdated && (
//                 <div className="text-right">
//                   <p className="text-gray-400 text-xs">Last updated</p>
//                   <p className="text-white text-sm font-medium">{formatDate(lastUpdated)}</p>
//                   {updatedBy && updatedBy.name && (
//                     <p className="text-gray-400 text-xs">by {updatedBy.name}</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6 space-y-6">
//             {/* Packaging Cost */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                 <div className="p-1.5 bg-gray-100 rounded-lg border border-gray-200">
//                   <FaBoxOpen className="w-4 h-4 text-gray-700" />
//                 </div>
//                 Default Packaging Cost (৳)
//               </label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">৳</span>
//                 <input
//                   type="text"
//                   name="packagingCost"
//                   value={settings.packagingCost}
//                   onChange={handleNumberChange}
//                   onBlur={handleBlur}
//                   placeholder="Enter default packaging cost"
//                   className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white hover:border-gray-400"
//                 />
//               </div>
//               <p className="text-xs text-gray-500 flex items-center gap-1">
//                 <span className="w-1 h-1 rounded-full bg-gray-400"></span>
//                 Default packaging cost per unit for all new products
//               </p>
//             </div>

//             {/* Delivery Cost */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                 <div className="p-1.5 bg-gray-100 rounded-lg border border-gray-200">
//                   <FaTruck className="w-4 h-4 text-gray-700" />
//                 </div>
//                 Default Delivery Cost (৳)
//               </label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">৳</span>
//                 <input
//                   type="text"
//                   name="deliveryCost"
//                   value={settings.deliveryCost}
//                   onChange={handleNumberChange}
//                   onBlur={handleBlur}
//                   placeholder="Enter default delivery cost"
//                   className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white hover:border-gray-400"
//                 />
//               </div>
//               <p className="text-xs text-gray-500 flex items-center gap-1">
//                 <span className="w-1 h-1 rounded-full bg-gray-400"></span>
//                 Default delivery cost per unit for all new products
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4 pt-4 border-t border-gray-200">
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md font-medium"
//               >
//                 {saving ? (
//                   <>
//                     <FaSpinner className="w-4 h-4 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <FaSave className="w-4 h-4" />
//                     Save Settings
//                   </>
//                 )}
//               </button>
              
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 disabled={resetting}
//                 className="px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium border border-gray-200"
//               >
//                 {resetting ? (
//                   <FaSpinner className="w-4 h-4 animate-spin" />
//                 ) : (
//                   <FaUndo className="w-4 h-4" />
//                 )}
//                 Reset
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//     </ProtectedRoute>
//   );
// }

// // ========== MAIN EXPORT WITH SUSPENSE ==========
// export default function ProductCostSettingsPage() {
//   return (
//     <Suspense fallback={
//       <div className="flex items-center justify-center min-h-[60vh] bg-white">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-600 font-medium">Loading product cost settings...</p>
//         </div>
//       </div>
//     }>
//       <ProductCostSettingsContent />
//     </Suspense>
//   );
// }


'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { 
  FaBoxOpen, 
  FaSave, 
  FaSpinner, 
  FaTruck,
  FaHistory,
  FaUndo
} from 'react-icons/fa';
import { 
  Sparkles,
  ArrowLeft,
  CheckCircle,
  Package,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ========== MAIN COMPONENT CONTENT ==========
function ProductCostSettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [settings, setSettings] = useState({
    packagingCost: '',
    deliveryCost: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [updatedBy, setUpdatedBy] = useState(null);
  const [version, setVersion] = useState(1);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/product-cost/settings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      
      if (result.success) {
        setSettings({
          packagingCost: result.data.packagingCost === 0 ? '' : result.data.packagingCost,
          deliveryCost: result.data.deliveryCost === 0 ? '' : result.data.deliveryCost
        });
        setLastUpdated(result.data.updatedAt);
        setUpdatedBy(result.data.updatedBy);
        setVersion(result.data.version || 1);
      } else {
        toast.error('Failed to load settings');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!settings.packagingCost && !settings.deliveryCost) {
      toast.error('Please enter at least one cost value');
      return;
    }
    
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/product-cost/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          packagingCost: settings.packagingCost ? Number(settings.packagingCost) : 0,
          deliveryCost: settings.deliveryCost ? Number(settings.deliveryCost) : 0
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('Product cost settings updated successfully');
        setLastUpdated(result.data.updatedAt);
        setUpdatedBy(result.data.updatedBy);
        setVersion(result.data.version || version + 1);
        await fetchSettings();
      } else {
        toast.error(result.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
      return;
    }
    
    setResetting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/product-cost/settings/reset', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('Settings reset to defaults');
        setSettings({
          packagingCost: '',
          deliveryCost: ''
        });
        setLastUpdated(result.data.updatedAt);
        setUpdatedBy(result.data.updatedBy);
        setVersion(result.data.version || 1);
      } else {
        toast.error(result.error || 'Failed to reset settings');
      }
    } catch (error) {
      console.error('Error resetting settings:', error);
      toast.error('Network error');
    } finally {
      setResetting(false);
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^\d*$/.test(value)) {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === '' || value === null) {
      setSettings(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#73856B] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading product cost settings...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="product_cost">
    <div className="min-h-screen bg-white">
      {/* Header - Pink Theme */}
      <div className="bg-white border-b border-[#F7C7D3]/40 shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a 
                href="/authorize/dashboard" 
                className="p-2 hover:bg-[#F7C7D3]/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#73856B] hover:text-[#73856B]" />
              </a>
              <div>
                <div className="flex items-center gap-2">
                  <Package className="w-6 h-6 text-[#73856B]" />
                  <h1 className="text-xl font-bold text-[#2D1B2E]">Product Cost Settings</h1>
                </div>
                <p className="text-sm text-gray-500 mt-1">Configure default packaging and delivery costs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {version > 1 && (
                <span className="text-xs text-[#73856B] bg-[#F7C7D3]/20 px-3 py-1 rounded-full flex items-center gap-1 border border-[#73856B]/20">
                  <FaHistory className="w-3 h-3" />
                  v{version}
                </span>
              )}
              <Sparkles className="w-5 h-5 text-[#73856B]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden">
          {/* Header Section - Pink Accent */}
          <div className="p-6 bg-[#73856B]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                  <FaBoxOpen className="w-5 h-5 text-white" />
                  Default Product Costs
                </h2>
                <p className="text-white/80 text-sm mt-1">Set default costs that apply to all new products</p>
              </div>
              {lastUpdated && (
                <div className="text-right">
                  <p className="text-white/70 text-xs">Last updated</p>
                  <p className="text-white text-sm font-medium">{formatDate(lastUpdated)}</p>
                  {updatedBy && updatedBy.name && (
                    <p className="text-white/70 text-xs">by {updatedBy.name}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Packaging Cost */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[#2D1B2E]">
                <div className="p-1.5 bg-[#F7C7D3]/20 rounded-lg border border-[#73856B]/20">
                  <FaBoxOpen className="w-4 h-4 text-[#73856B]" />
                </div>
                Default Packaging Cost (৳)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#73856B] font-semibold">৳</span>
                <input
                  type="text"
                  name="packagingCost"
                  value={settings.packagingCost}
                  onChange={handleNumberChange}
                  onBlur={handleBlur}
                  placeholder="Enter default packaging cost"
                  className="w-full pl-8 pr-4 py-3 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent transition-all bg-white hover:border-[#73856B]/30"
                />
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#73856B]"></span>
                Default packaging cost per unit for all new products
              </p>
            </div>

            {/* Delivery Cost */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[#2D1B2E]">
                <div className="p-1.5 bg-[#F7C7D3]/20 rounded-lg border border-[#73856B]/20">
                  <FaTruck className="w-4 h-4 text-[#73856B]" />
                </div>
                Default Delivery Cost (৳)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#73856B] font-semibold">৳</span>
                <input
                  type="text"
                  name="deliveryCost"
                  value={settings.deliveryCost}
                  onChange={handleNumberChange}
                  onBlur={handleBlur}
                  placeholder="Enter default delivery cost"
                  className="w-full pl-8 pr-4 py-3 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent transition-all bg-white hover:border-[#73856B]/30"
                />
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#73856B]"></span>
                Default delivery cost per unit for all new products
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-[#F7C7D3]/40">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#73856B]  text-white rounded-lg hover:shadow-lg hover:shadow-[#73856B]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md font-medium"
              >
                {saving ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                disabled={resetting}
                className="px-4 py-3 bg-[#F7C7D3]/20 text-[#2D1B2E] rounded-lg hover:bg-[#F7C7D3]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium border border-[#73856B]/20"
              >
                {resetting ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaUndo className="w-4 h-4" />
                )}
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}

// ========== MAIN EXPORT WITH SUSPENSE ==========
export default function ProductCostSettingsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#73856B] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading product cost settings...</p>
        </div>
      </div>
    }>
      <ProductCostSettingsContent />
    </Suspense>
  );
}