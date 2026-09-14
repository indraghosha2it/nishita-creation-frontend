// // SmartBuy-BD-frontend/components/dashboard/orders/CourierSettings.jsx

// import { useState, useEffect } from 'react';
// import { toast } from 'sonner';
// import { FaEdit, FaSave, FaTrash, FaCheckCircle, FaTimesCircle, FaSpinner, FaTruck } from 'react-icons/fa';

// const CREDENTIAL_FIELDS = {
//   pathao: [
//     { name: 'clientId', label: 'Client ID', type: 'text' },
//     { name: 'clientSecret', label: 'Client Secret', type: 'password' },
//     { name: 'username', label: 'Username', type: 'text' },
//     { name: 'password', label: 'Password', type: 'password' },
//     { name: 'storeId', label: 'Store ID', type: 'text' }
//   ],
//   steadfast: [
//     { name: 'apiKey', label: 'API Key', type: 'text' },
//     { name: 'secretKey', label: 'Secret Key', type: 'password' },
//     { name: 'storeId', label: 'Store ID', type: 'text' }
//   ]
// };

// export default function CourierSettings() {
//   const [couriers, setCouriers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingCourier, setEditingCourier] = useState(null);
//   const [credentials, setCredentials] = useState({});
//   const [storeConfig, setStoreConfig] = useState({});
//   const [apiEnabled, setApiEnabled] = useState(false);
//   const [testing, setTesting] = useState({});

//   useEffect(() => {
//     fetchCouriers();
//   }, []);

//   const fetchCouriers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/admin/couriers', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setCouriers(data.data);
//       }
//     } catch (error) {
//       console.error('Fetch couriers error:', error);
//       toast.error('Failed to fetch couriers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (courier) => {
//     setEditingCourier(courier);
//     setApiEnabled(courier.apiEnabled || false);
//     setCredentials({});
//     setStoreConfig(courier.storeConfig || {});
//   };

//   const handleSave = async (courierId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/admin/couriers/${courierId}/integration`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           apiEnabled,
//           credentials,
//           storeConfig
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Courier settings saved successfully');
//         setEditingCourier(null);
//         fetchCouriers();
//       } else {
//         toast.error(data.error || 'Failed to save settings');
//       }
//     } catch (error) {
//       console.error('Save courier error:', error);
//       toast.error('Network error');
//     }
//   };

//   const handleTest = async (courier) => {
//     setTesting(prev => ({ ...prev, [courier.slug]: true }));
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/admin/couriers/${courier._id}/test-connection`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(data.message || 'Connection test successful');
//       } else {
//         toast.error(data.error || 'Connection test failed');
//       }
//       fetchCouriers();
//     } catch (error) {
//       console.error('Test courier error:', error);
//       toast.error('Network error');
//     } finally {
//       setTesting(prev => ({ ...prev, [courier.slug]: false }));
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center py-8"><FaSpinner className="w-8 h-8 animate-spin text-[#4A8A90]" /></div>;
//   }

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//         <FaTruck className="text-[#4A8A90]" />
//         Courier Service Settings
//       </h2>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {couriers.map((courier) => {
//           const isEditing = editingCourier?._id === courier._id;
//           const fields = CREDENTIAL_FIELDS[courier.slug] || [];
//           const isTesting = testing[courier.slug];

//           return (
//             <div key={courier._id} className="bg-white rounded-xl border-2 border-[#FFE0E6] p-5 shadow-md">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900">{courier.name}</h3>
//                   <div className="flex items-center gap-2 mt-1">
//                     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
//                       courier.apiEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
//                     }`}>
//                       {courier.apiEnabled ? 'Active' : 'Inactive'}
//                     </span>
//                     {courier.integrationStatus?.lastTestOk ? (
//                       <span className="text-green-600 text-xs flex items-center gap-1">
//                         <FaCheckCircle className="w-3 h-3" /> Connected
//                       </span>
//                     ) : courier.integrationStatus?.lastTestedAt ? (
//                       <span className="text-red-600 text-xs flex items-center gap-1">
//                         <FaTimesCircle className="w-3 h-3" /> Failed
//                       </span>
//                     ) : null}
//                   </div>
//                 </div>
//                 {!isEditing && (
//                   <button
//                     onClick={() => handleEdit(courier)}
//                     className="p-2 text-gray-500 hover:text-[#4A8A90] hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     <FaEdit className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               {isEditing ? (
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       id={`api-enabled-${courier.slug}`}
//                       checked={apiEnabled}
//                       onChange={(e) => setApiEnabled(e.target.checked)}
//                       className="w-4 h-4 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
//                     />
//                     <label htmlFor={`api-enabled-${courier.slug}`} className="text-sm font-medium text-gray-700">
//                       Enable API Integration
//                     </label>
//                   </div>

//                   <div className="space-y-3">
//                     {fields.map((field) => (
//                       <div key={field.name}>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {field.label}
//                         </label>
//                         <input
//                           type={field.type}
//                           value={credentials[field.name] || ''}
//                           onChange={(e) => setCredentials(prev => ({
//                             ...prev,
//                             [field.name]: e.target.value
//                           }))}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//                           placeholder={`Enter ${field.label}`}
//                         />
//                       </div>
//                     ))}
//                   </div>

//                   <div className="flex gap-2 pt-2">
//                     <button
//                       onClick={() => handleSave(courier._id)}
//                       className="flex-1 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] flex items-center justify-center gap-2"
//                     >
//                       <FaSave className="w-4 h-4" />
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditingCourier(null)}
//                       className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div>
//                   {courier.configured ? (
//                     <div className="text-sm text-green-600 flex items-center gap-1">
//                       <FaCheckCircle className="w-4 h-4" />
//                       Credentials configured
//                     </div>
//                   ) : (
//                     <div className="text-sm text-gray-400">Not configured</div>
//                   )}
                  
//                   <button
//                     onClick={() => handleTest(courier)}
//                     disabled={isTesting || !courier.configured}
//                     className="mt-3 px-4 py-2 border border-[#4A8A90] text-[#4A8A90] rounded-lg hover:bg-[#4A8A90] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
//                   >
//                     {isTesting ? (
//                       <>
//                         <FaSpinner className="w-4 h-4 animate-spin" />
//                         Testing...
//                       </>
//                     ) : (
//                       'Test Connection'
//                     )}
//                   </button>
                  
//                   {courier.integrationStatus?.lastTestedAt && (
//                     <p className="text-xs text-gray-400 mt-2">
//                       Last tested: {new Date(courier.integrationStatus.lastTestedAt).toLocaleString()}
//                       <br />
//                       Status: {courier.integrationStatus.lastTestMessage || 'Unknown'}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


