// 'use client';

// import { useState, useEffect, useCallback, Suspense } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import {
//   FaShieldAlt,
//   FaGlobe,
//   FaPhone,
//   FaEnvelope,
//   FaPlus,
//   FaTrash,
//   FaSave,
//   FaTimes,
//   FaSpinner,
//   FaInfoCircle,
//   FaExclamationTriangle,
//   FaCheckCircle,
//   FaClock,
//   FaBan,
//   FaUserSlash,
//   FaUsers,
//   FaServer,
//   FaDatabase,
//   FaToggleOn,
//   FaToggleOff
// } from 'react-icons/fa';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ========== DELETE CONFIRM MODAL ==========
// const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message, item, deleting }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-md overflow-hidden"
//       >
//         <div className="p-5 bg-gradient-to-r from-red-500 to-red-600 text-white">
//           <div className="flex items-center gap-2">
//             <FaExclamationTriangle className="w-5 h-5" />
//             <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
//               {title || 'Confirm Delete'}
//             </h2>
//           </div>
//         </div>

//         <div className="p-6 text-center">
//           <p className="text-gray-900 text-sm mb-2">
//             {message || 'Are you sure you want to delete this item?'}
//           </p>
//           {item && (
//             <div className="bg-gray-50 rounded-lg p-3 mb-3">
//               <p className="text-sm font-medium text-gray-900">{item}</p>
//             </div>
//           )}
//           <p className="text-xs text-red-500">⚠️ This action cannot be undone!</p>
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
//           <button
//             onClick={onClose}
//             disabled={deleting}
//             className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-white transition-colors text-sm font-medium disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={deleting}
//             className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
//           >
//             {deleting ? (
//               <>
//                 <FaSpinner className="w-4 h-4 animate-spin" />
//                 Deleting...
//               </>
//             ) : (
//               <>
//                 <FaTrash className="w-4 h-4" />
//                 Delete
//               </>
//             )}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== MAIN CONTENT COMPONENT ==========
// function OrderRestrictionsContent() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [userRole, setUserRole] = useState('');

//   // Delete Confirm Modal States
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteItem, setDeleteItem] = useState(null);
//   const [deleteType, setDeleteType] = useState('');
//   const [deleteItemLabel, setDeleteItemLabel] = useState('');
//   const [deleting, setDeleting] = useState(false);

//   // IP Restrictions
//   const [ipTimeEnabled, setIpTimeEnabled] = useState(false);
//   const [ipTimeValue, setIpTimeValue] = useState(5);
//   const [ipTimeUnit, setIpTimeUnit] = useState('min');
//   const [blockedIPs, setBlockedIPs] = useState([]);
//   const [newIP, setNewIP] = useState('');
//   const [newIPReason, setNewIPReason] = useState('');

//   // Phone Restrictions
//   const [phoneTimeEnabled, setPhoneTimeEnabled] = useState(false);
//   const [phoneTimeValue, setPhoneTimeValue] = useState(10);
//   const [phoneTimeUnit, setPhoneTimeUnit] = useState('min');
//   const [blockedPhones, setBlockedPhones] = useState([]);
//   const [newPhone, setNewPhone] = useState('');
//   const [newPhoneReason, setNewPhoneReason] = useState('');

//   // Email Restrictions
//   const [blockedEmails, setBlockedEmails] = useState([]);
//   const [newEmail, setNewEmail] = useState('');
//   const [newEmailReason, setNewEmailReason] = useState('');

//   // Get user role
//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUserRole(parsedUser.role || '');
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//       }
//     }
//   }, []);

//   const fetchRestrictions = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/order-restrictions', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
//       if (data.success) {
//         const restrictions = data.data;
        
//         // IP Restrictions
//         setIpTimeEnabled(restrictions.ipRestrictions?.timeInterval?.enabled || false);
//         setIpTimeValue(restrictions.ipRestrictions?.timeInterval?.value || 5);
//         setIpTimeUnit(restrictions.ipRestrictions?.timeInterval?.unit || 'min');
//         setBlockedIPs(restrictions.ipRestrictions?.blockedIPs || []);
        
//         // Phone Restrictions
//         setPhoneTimeEnabled(restrictions.phoneRestrictions?.timeInterval?.enabled || false);
//         setPhoneTimeValue(restrictions.phoneRestrictions?.timeInterval?.value || 10);
//         setPhoneTimeUnit(restrictions.phoneRestrictions?.timeInterval?.unit || 'min');
//         setBlockedPhones(restrictions.phoneRestrictions?.blockedPhones || []);
        
//         // Email Restrictions
//         setBlockedEmails(restrictions.emailRestrictions?.blockedEmails || []);
//       } else {
//         toast.error(data.error || 'Failed to fetch restrictions');
//       }
//     } catch (error) {
//       console.error('Fetch restrictions error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   }, [router]);

//   useEffect(() => {
//     fetchRestrictions();
//   }, [fetchRestrictions]);

//   // ========== OPEN DELETE MODAL ==========
//   const openDeleteModal = (type, item, label) => {
//     setDeleteType(type);
//     setDeleteItem(item);
//     setDeleteItemLabel(label);
//     setShowDeleteModal(true);
//   };

//   // ========== HANDLE DELETE CONFIRMATION ==========
//   const handleDeleteConfirm = async () => {
//     setDeleting(true);
//     try {
//       if (deleteType === 'ip') {
//         await removeBlockedIP(deleteItem);
//       } else if (deleteType === 'phone') {
//         await removeBlockedPhone(deleteItem);
//       } else if (deleteType === 'email') {
//         await removeBlockedEmail(deleteItem);
//       }
//       setShowDeleteModal(false);
//       setDeleteItem(null);
//       setDeleteType('');
//       setDeleteItemLabel('');
//     } catch (error) {
//       console.error('Delete error:', error);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // ========== TOGGLE IP TIME INTERVAL ==========
//   const toggleIpTime = async () => {
//     const newValue = !ipTimeEnabled;
//     setIpTimeEnabled(newValue);
//     setSaving(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/order-restrictions/ip', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           timeInterval: {
//             enabled: newValue,
//             value: ipTimeValue,
//             unit: ipTimeUnit
//           },
//           blockedIPs: blockedIPs
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(newValue ? 'IP time restriction enabled' : 'IP time restriction disabled');
//       } else {
//         toast.error(data.error || 'Failed to update');
//         setIpTimeEnabled(!newValue); // Revert on error
//       }
//     } catch (error) {
//       console.error('Toggle IP error:', error);
//       toast.error('Network error');
//       setIpTimeEnabled(!newValue); // Revert on error
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ========== TOGGLE PHONE TIME INTERVAL ==========
//   const togglePhoneTime = async () => {
//     const newValue = !phoneTimeEnabled;
//     setPhoneTimeEnabled(newValue);
//     setSaving(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/order-restrictions/phone', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           timeInterval: {
//             enabled: newValue,
//             value: phoneTimeValue,
//             unit: phoneTimeUnit
//           },
//           blockedPhones: blockedPhones
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(newValue ? 'Phone time restriction enabled' : 'Phone time restriction disabled');
//       } else {
//         toast.error(data.error || 'Failed to update');
//         setPhoneTimeEnabled(!newValue); // Revert on error
//       }
//     } catch (error) {
//       console.error('Toggle phone error:', error);
//       toast.error('Network error');
//       setPhoneTimeEnabled(!newValue); // Revert on error
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ========== SAVE IP RESTRICTIONS (for value/unit changes) ==========
//   const saveIPRestrictions = async () => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/order-restrictions/ip', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           timeInterval: {
//             enabled: ipTimeEnabled,
//             value: ipTimeValue,
//             unit: ipTimeUnit
//           },
//           blockedIPs: blockedIPs
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('IP restrictions updated successfully');
//       } else {
//         toast.error(data.error || 'Failed to update IP restrictions');
//       }
//     } catch (error) {
//       console.error('Save IP restrictions error:', error);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ========== SAVE PHONE RESTRICTIONS (for value/unit changes) ==========
//   const savePhoneRestrictions = async () => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/order-restrictions/phone', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           timeInterval: {
//             enabled: phoneTimeEnabled,
//             value: phoneTimeValue,
//             unit: phoneTimeUnit
//           },
//           blockedPhones: blockedPhones
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Phone restrictions updated successfully');
//       } else {
//         toast.error(data.error || 'Failed to update phone restrictions');
//       }
//     } catch (error) {
//       console.error('Save phone restrictions error:', error);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ========== SAVE EMAIL RESTRICTIONS ==========
//   const saveEmailRestrictions = async () => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/order-restrictions/email', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           blockedEmails: blockedEmails
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Email restrictions updated successfully');
//       } else {
//         toast.error(data.error || 'Failed to update email restrictions');
//       }
//     } catch (error) {
//       console.error('Save email restrictions error:', error);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ========== ADD BLOCKED IP ==========
//   const addBlockedIP = async () => {
//     if (!newIP.trim()) {
//       toast.error('Please enter an IP address');
//       return;
//     }

//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/order-restrictions/ip/block', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           ip: newIP.trim(),
//           reason: newIPReason.trim()
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         setBlockedIPs(data.data.ipRestrictions.blockedIPs);
//         setNewIP('');
//         setNewIPReason('');
//         toast.success('IP added to blocklist');
//       } else {
//         toast.error(data.error || 'Failed to add IP');
//       }
//     } catch (error) {
//       console.error('Add blocked IP error:', error);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ========== REMOVE BLOCKED IP ==========
//   const removeBlockedIP = async (ip) => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/order-restrictions/ip/${encodeURIComponent(ip)}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setBlockedIPs(data.data.ipRestrictions.blockedIPs);
//         toast.success('IP removed from blocklist');
//         return true;
//       } else {
//         toast.error(data.error || 'Failed to remove IP');
//         return false;
//       }
//     } catch (error) {
//       console.error('Remove blocked IP error:', error);
//       toast.error('Network error');
//       return false;
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ========== ADD BLOCKED PHONE ==========
//   const addBlockedPhone = async () => {
//     if (!newPhone.trim()) {
//       toast.error('Please enter a phone number');
//       return;
//     }

//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/order-restrictions/phone/block', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           phone: newPhone.trim(),
//           reason: newPhoneReason.trim()
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         setBlockedPhones(data.data.phoneRestrictions.blockedPhones);
//         setNewPhone('');
//         setNewPhoneReason('');
//         toast.success('Phone added to blocklist');
//       } else {
//         toast.error(data.error || 'Failed to add phone');
//       }
//     } catch (error) {
//       console.error('Add blocked phone error:', error);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ========== REMOVE BLOCKED PHONE ==========
//   const removeBlockedPhone = async (phone) => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/order-restrictions/phone/${encodeURIComponent(phone)}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setBlockedPhones(data.data.phoneRestrictions.blockedPhones);
//         toast.success('Phone removed from blocklist');
//         return true;
//       } else {
//         toast.error(data.error || 'Failed to remove phone');
//         return false;
//       }
//     } catch (error) {
//       console.error('Remove blocked phone error:', error);
//       toast.error('Network error');
//       return false;
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ========== ADD BLOCKED EMAIL ==========
//   const addBlockedEmail = async () => {
//     if (!newEmail.trim()) {
//       toast.error('Please enter an email address');
//       return;
//     }

//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/order-restrictions/email/block', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           email: newEmail.trim(),
//           reason: newEmailReason.trim()
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         setBlockedEmails(data.data.emailRestrictions.blockedEmails);
//         setNewEmail('');
//         setNewEmailReason('');
//         toast.success('Email added to blocklist');
//       } else {
//         toast.error(data.error || 'Failed to add email');
//       }
//     } catch (error) {
//       console.error('Add blocked email error:', error);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ========== REMOVE BLOCKED EMAIL ==========
//   const removeBlockedEmail = async (email) => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/order-restrictions/email/${encodeURIComponent(email)}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setBlockedEmails(data.data.emailRestrictions.blockedEmails);
//         toast.success('Email removed from blocklist');
//         return true;
//       } else {
//         toast.error(data.error || 'Failed to remove email');
//         return false;
//       }
//     } catch (error) {
//       console.error('Remove blocked email error:', error);
//       toast.error('Network error');
//       return false;
//     } finally {
//       setSaving(false);
//     }
//   };

//   const canEdit = userRole === 'super_admin' || userRole === 'admin' || userRole === 'moderator';

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white pt-6 flex items-center justify-center">
//         <FaSpinner className="w-8 h-8 text-blue-600 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="order_restrictions">
//       <div className="min-h-screen bg-white pb-12 pt-6">
//         <div className="container mx-auto px-4 max-w-6xl">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
//                 <FaShieldAlt className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display"' }}>
//                   Order Restrictions
//                 </h1>
//                 <p className="text-sm text-gray-500 mt-0.5">Manage fraud prevention and order restrictions</p>
//               </div>
//             </div>
//             {!canEdit && (
//               <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Read Only</span>
//             )}
//           </div>

//           {!canEdit && (
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl mb-6">
//               <p className="text-sm text-yellow-700">You have read-only access to this page.</p>
//             </div>
//           )}

//           {/* IP Restrictions Section */}
//           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
//             <div className="p-6 border-b border-gray-200 bg-gray-50">
//               <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                 <FaGlobe className="w-5 h-5 text-blue-600" />
//                 IP Address Restrictions
//               </h2>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Time Interval */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                   <FaClock className="w-4 h-4 text-blue-600" />
//                   Time Interval Restriction
//                   <span className="text-xs font-normal text-gray-500 ml-2">
//                     (Same IP cannot place orders within this time)
//                   </span>
//                 </h3>
//                 <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
//                   <button
//                     onClick={toggleIpTime}
//                     disabled={!canEdit || saving}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
//                       ipTimeEnabled 
//                         ? 'bg-green-500 text-white' 
//                         : 'bg-gray-200 text-gray-600'
//                     } ${(!canEdit || saving) && 'opacity-50 cursor-not-allowed'}`}
//                   >
//                     {ipTimeEnabled ? (
//                       <FaToggleOn className="w-5 h-5" />
//                     ) : (
//                       <FaToggleOff className="w-5 h-5" />
//                     )}
//                     {ipTimeEnabled ? 'Enabled' : 'Disabled'}
//                     {saving && <FaSpinner className="w-4 h-4 animate-spin ml-1" />}
//                   </button>

//                   <div className="flex items-center gap-2">
//                     <input
//                       type="number"
//                       min="1"
//                       max="999"
//                       value={ipTimeValue}
//                       onChange={(e) => setIpTimeValue(parseInt(e.target.value) || 1)}
//                       disabled={!ipTimeEnabled || !canEdit || saving}
//                       className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
//                     />
//                     <select
//                       value={ipTimeUnit}
//                       onChange={(e) => setIpTimeUnit(e.target.value)}
//                       disabled={!ipTimeEnabled || !canEdit || saving}
//                       className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <option value="min">Minutes</option>
//                       <option value="hr">Hours</option>
//                     </select>
//                   </div>

//                   {canEdit && ipTimeEnabled && (
//                     <button
//                       onClick={saveIPRestrictions}
//                       disabled={saving}
//                       className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium disabled:opacity-50"
//                     >
//                       {saving ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaSave className="w-4 h-4" />}
//                       Save
//                     </button>
//                   )}
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                   {ipTimeEnabled 
//                     ? `Users from the same IP must wait ${ipTimeValue} ${ipTimeUnit === 'min' ? 'minute(s)' : 'hour(s)'} between orders`
//                     : 'Time interval restriction is disabled'}
//                 </p>
//               </div>

//               {/* Blocked IPs */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                   <FaBan className="w-4 h-4 text-red-500" />
//                   Blocked IP Addresses
//                 </h3>
//                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
//                   {/* Add IP Form */}
//                   {canEdit && (
//                     <div className="flex flex-wrap items-end gap-3 mb-4">
//                       <div className="flex-1 min-w-[200px]">
//                         <label className="block text-xs text-gray-500 mb-1">IP Address</label>
//                         <input
//                           type="text"
//                           value={newIP}
//                           onChange={(e) => setNewIP(e.target.value)}
//                           placeholder="e.g., 192.168.1.1"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 text-sm"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[200px]">
//                         <label className="block text-xs text-gray-500 mb-1">Reason (Optional)</label>
//                         <input
//                           type="text"
//                           value={newIPReason}
//                           onChange={(e) => setNewIPReason(e.target.value)}
//                           placeholder="Why this IP is blocked"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 text-sm"
//                         />
//                       </div>
//                       <button
//                         onClick={addBlockedIP}
//                         disabled={saving || !newIP.trim()}
//                         className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium disabled:opacity-50 flex items-center gap-2"
//                       >
//                         <FaPlus className="w-3 h-3" />
//                         Add IP
//                       </button>
//                     </div>
//                   )}

//                   {/* Blocked IPs List */}
//                   {blockedIPs.length === 0 ? (
//                     <p className="text-center text-gray-500 text-sm py-4">No IP addresses blocked</p>
//                   ) : (
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm">
//                         <thead className="bg-gray-100">
//                           <tr>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">IP Address</th>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">Reason</th>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">Added By</th>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">Added At</th>
//                             {canEdit && <th className="px-3 py-2 text-center text-gray-600 font-medium">Action</th>}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {blockedIPs.map((item, index) => (
//                             <tr key={index} className="border-b border-gray-200">
//                               <td className="px-3 py-2 font-mono text-gray-900">{item.ip}</td>
//                               <td className="px-3 py-2 text-gray-600">{item.reason || '-'}</td>
//                               <td className="px-3 py-2 text-gray-600">{item.addedBy?.name || 'System'}</td>
//                               <td className="px-3 py-2 text-gray-600">{new Date(item.addedAt).toLocaleDateString()}</td>
//                               {canEdit && (
//                                 <td className="px-3 py-2 text-center">
//                                   <button
//                                     onClick={() => openDeleteModal('ip', item.ip, `IP: ${item.ip}`)}
//                                     disabled={saving}
//                                     className="text-red-500 hover:text-red-600 transition-colors"
//                                   >
//                                     <FaTrash className="w-4 h-4" />
//                                   </button>
//                                 </td>
//                               )}
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Phone Restrictions Section */}
//           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
//             <div className="p-6 border-b border-gray-200 bg-gray-50">
//               <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                 <FaPhone className="w-5 h-5 text-blue-600" />
//                 Phone Number Restrictions
//               </h2>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Time Interval */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                   <FaClock className="w-4 h-4 text-blue-600" />
//                   Time Interval Restriction
//                   <span className="text-xs font-normal text-gray-500 ml-2">
//                     (Same phone cannot place orders within this time)
//                   </span>
//                 </h3>
//                 <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
//                   <button
//                     onClick={togglePhoneTime}
//                     disabled={!canEdit || saving}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
//                       phoneTimeEnabled 
//                         ? 'bg-green-500 text-white' 
//                         : 'bg-gray-200 text-gray-600'
//                     } ${(!canEdit || saving) && 'opacity-50 cursor-not-allowed'}`}
//                   >
//                     {phoneTimeEnabled ? (
//                       <FaToggleOn className="w-5 h-5" />
//                     ) : (
//                       <FaToggleOff className="w-5 h-5" />
//                     )}
//                     {phoneTimeEnabled ? 'Enabled' : 'Disabled'}
//                     {saving && <FaSpinner className="w-4 h-4 animate-spin ml-1" />}
//                   </button>

//                   <div className="flex items-center gap-2">
//                     <input
//                       type="number"
//                       min="1"
//                       max="999"
//                       value={phoneTimeValue}
//                       onChange={(e) => setPhoneTimeValue(parseInt(e.target.value) || 1)}
//                       disabled={!phoneTimeEnabled || !canEdit || saving}
//                       className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
//                     />
//                     <select
//                       value={phoneTimeUnit}
//                       onChange={(e) => setPhoneTimeUnit(e.target.value)}
//                       disabled={!phoneTimeEnabled || !canEdit || saving}
//                       className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <option value="min">Minutes</option>
//                       <option value="hr">Hours</option>
//                     </select>
//                   </div>

//                   {canEdit && phoneTimeEnabled && (
//                     <button
//                       onClick={savePhoneRestrictions}
//                       disabled={saving}
//                       className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium disabled:opacity-50"
//                     >
//                       {saving ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaSave className="w-4 h-4" />}
//                       Save
//                     </button>
//                   )}
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                   {phoneTimeEnabled 
//                     ? `Users with the same phone number must wait ${phoneTimeValue} ${phoneTimeUnit === 'min' ? 'minute(s)' : 'hour(s)'} between orders`
//                     : 'Time interval restriction is disabled'}
//                 </p>
//               </div>

//               {/* Blocked Phones */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                   <FaBan className="w-4 h-4 text-red-500" />
//                   Blocked Phone Numbers
//                 </h3>
//                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
//                   {canEdit && (
//                     <div className="flex flex-wrap items-end gap-3 mb-4">
//                       <div className="flex-1 min-w-[200px]">
//                         <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
//                         <input
//                           type="text"
//                           value={newPhone}
//                           onChange={(e) => setNewPhone(e.target.value)}
//                           placeholder="e.g., 017XXXXXXXX"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 text-sm"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[200px]">
//                         <label className="block text-xs text-gray-500 mb-1">Reason (Optional)</label>
//                         <input
//                           type="text"
//                           value={newPhoneReason}
//                           onChange={(e) => setNewPhoneReason(e.target.value)}
//                           placeholder="Why this number is blocked"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 text-sm"
//                         />
//                       </div>
//                       <button
//                         onClick={addBlockedPhone}
//                         disabled={saving || !newPhone.trim()}
//                         className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium disabled:opacity-50 flex items-center gap-2"
//                       >
//                         <FaPlus className="w-3 h-3" />
//                         Add Phone
//                       </button>
//                     </div>
//                   )}

//                   {blockedPhones.length === 0 ? (
//                     <p className="text-center text-gray-500 text-sm py-4">No phone numbers blocked</p>
//                   ) : (
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm">
//                         <thead className="bg-gray-100">
//                           <tr>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">Phone Number</th>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">Reason</th>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">Added By</th>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">Added At</th>
//                             {canEdit && <th className="px-3 py-2 text-center text-gray-600 font-medium">Action</th>}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {blockedPhones.map((item, index) => (
//                             <tr key={index} className="border-b border-gray-200">
//                               <td className="px-3 py-2 font-mono text-gray-900">{item.phone}</td>
//                               <td className="px-3 py-2 text-gray-600">{item.reason || '-'}</td>
//                               <td className="px-3 py-2 text-gray-600">{item.addedBy?.name || 'System'}</td>
//                               <td className="px-3 py-2 text-gray-600">{new Date(item.addedAt).toLocaleDateString()}</td>
//                               {canEdit && (
//                                 <td className="px-3 py-2 text-center">
//                                   <button
//                                     onClick={() => openDeleteModal('phone', item.phone, `Phone: ${item.phone}`)}
//                                     disabled={saving}
//                                     className="text-red-500 hover:text-red-600 transition-colors"
//                                   >
//                                     <FaTrash className="w-4 h-4" />
//                                   </button>
//                                 </td>
//                               )}
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Email Restrictions Section */}
//           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//             <div className="p-6 border-b border-gray-200 bg-gray-50">
//               <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                 <FaEnvelope className="w-5 h-5 text-blue-600" />
//                 Email Address Restrictions
//               </h2>
//             </div>

//             <div className="p-6">
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                   <FaBan className="w-4 h-4 text-red-500" />
//                   Blocked Email Addresses
//                 </h3>
//                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
//                   {canEdit && (
//                     <div className="flex flex-wrap items-end gap-3 mb-4">
//                       <div className="flex-1 min-w-[200px]">
//                         <label className="block text-xs text-gray-500 mb-1">Email Address</label>
//                         <input
//                           type="email"
//                           value={newEmail}
//                           onChange={(e) => setNewEmail(e.target.value)}
//                           placeholder="user@example.com"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 text-sm"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-[200px]">
//                         <label className="block text-xs text-gray-500 mb-1">Reason (Optional)</label>
//                         <input
//                           type="text"
//                           value={newEmailReason}
//                           onChange={(e) => setNewEmailReason(e.target.value)}
//                           placeholder="Why this email is blocked"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 text-sm"
//                         />
//                       </div>
//                       <button
//                         onClick={addBlockedEmail}
//                         disabled={saving || !newEmail.trim()}
//                         className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium disabled:opacity-50 flex items-center gap-2"
//                       >
//                         <FaPlus className="w-3 h-3" />
//                         Add Email
//                       </button>
//                     </div>
//                   )}

//                   {blockedEmails.length === 0 ? (
//                     <p className="text-center text-gray-500 text-sm py-4">No email addresses blocked</p>
//                   ) : (
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm">
//                         <thead className="bg-gray-100">
//                           <tr>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">Email Address</th>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">Reason</th>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">Added By</th>
//                             <th className="px-3 py-2 text-left text-gray-600 font-medium">Added At</th>
//                             {canEdit && <th className="px-3 py-2 text-center text-gray-600 font-medium">Action</th>}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {blockedEmails.map((item, index) => (
//                             <tr key={index} className="border-b border-gray-200">
//                               <td className="px-3 py-2 text-gray-900">{item.email}</td>
//                               <td className="px-3 py-2 text-gray-600">{item.reason || '-'}</td>
//                               <td className="px-3 py-2 text-gray-600">{item.addedBy?.name || 'System'}</td>
//                               <td className="px-3 py-2 text-gray-600">{new Date(item.addedAt).toLocaleDateString()}</td>
//                               {canEdit && (
//                                 <td className="px-3 py-2 text-center">
//                                   <button
//                                     onClick={() => openDeleteModal('email', item.email, `Email: ${item.email}`)}
//                                     disabled={saving}
//                                     className="text-red-500 hover:text-red-600 transition-colors"
//                                   >
//                                     <FaTrash className="w-4 h-4" />
//                                   </button>
//                                 </td>
//                               )}
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Delete Confirmation Modal */}
//         <DeleteConfirmModal
//           isOpen={showDeleteModal}
//           onClose={() => {
//             setShowDeleteModal(false);
//             setDeleteItem(null);
//             setDeleteType('');
//             setDeleteItemLabel('');
//           }}
//           onConfirm={handleDeleteConfirm}
//           title="Delete Item"
//           message={`Are you sure you want to remove ${deleteItemLabel} from the blocklist?`}
//           item={deleteItemLabel}
//           deleting={deleting}
//         />
//       </div>
//     </ProtectedRoute>
//   );
// }

// // ========== MAIN EXPORT WITH SUSPENSE ==========
// export default function OrderRestrictionsPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500 text-sm">Loading order restrictions...</p>
//         </div>
//       </div>
//     }>
//       <OrderRestrictionsContent />
//     </Suspense>
//   );
// }



'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaPlus,
  FaTrash,
  FaSave,
  FaTimes,
  FaSpinner,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaBan,
  FaUserSlash,
  FaUsers,
  FaServer,
  FaDatabase,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ========== DELETE CONFIRM MODAL ==========
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message, item, deleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-[#F7C7D3]/40 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-5 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="w-5 h-5" />
            <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
              {title || 'Confirm Delete'}
            </h2>
          </div>
        </div>

        <div className="p-6 text-center">
          <p className="text-[#2D1B2E] text-sm mb-2">
            {message || 'Are you sure you want to delete this item?'}
          </p>
          {item && (
            <div className="bg-[#f1f7eb] rounded-lg p-3 mb-3">
              <p className="text-sm font-medium text-[#2D1B2E]">{item}</p>
            </div>
          )}
          <p className="text-xs text-red-500">⚠️ This action cannot be undone!</p>
        </div>

        <div className="p-4 border-t border-[#F7C7D3]/40 bg-[#f1f7eb] flex gap-3">
          <button
            onClick={onClose}
            disabled={deleting}
            className="flex-1 px-4 py-2.5 border border-[#F7C7D3]/50 text-[#2D1B2E] rounded-xl hover:bg-white transition-colors text-sm font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
          >
            {deleting ? (
              <>
                <FaSpinner className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <FaTrash className="w-4 h-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== MAIN CONTENT COMPONENT ==========
function OrderRestrictionsContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Delete Confirm Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState('');
  const [deleteItemLabel, setDeleteItemLabel] = useState('');
  const [deleting, setDeleting] = useState(false);

  // IP Restrictions
  const [ipTimeEnabled, setIpTimeEnabled] = useState(false);
  const [ipTimeValue, setIpTimeValue] = useState(5);
  const [ipTimeUnit, setIpTimeUnit] = useState('min');
  const [blockedIPs, setBlockedIPs] = useState([]);
  const [newIP, setNewIP] = useState('');
  const [newIPReason, setNewIPReason] = useState('');

  // Phone Restrictions
  const [phoneTimeEnabled, setPhoneTimeEnabled] = useState(false);
  const [phoneTimeValue, setPhoneTimeValue] = useState(10);
  const [phoneTimeUnit, setPhoneTimeUnit] = useState('min');
  const [blockedPhones, setBlockedPhones] = useState([]);
  const [newPhone, setNewPhone] = useState('');
  const [newPhoneReason, setNewPhoneReason] = useState('');

  // Email Restrictions
  const [blockedEmails, setBlockedEmails] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [newEmailReason, setNewEmailReason] = useState('');

  // Get user role
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserRole(parsedUser.role || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const fetchRestrictions = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/order-restrictions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        const restrictions = data.data;
        
        // IP Restrictions
        setIpTimeEnabled(restrictions.ipRestrictions?.timeInterval?.enabled || false);
        setIpTimeValue(restrictions.ipRestrictions?.timeInterval?.value || 5);
        setIpTimeUnit(restrictions.ipRestrictions?.timeInterval?.unit || 'min');
        setBlockedIPs(restrictions.ipRestrictions?.blockedIPs || []);
        
        // Phone Restrictions
        setPhoneTimeEnabled(restrictions.phoneRestrictions?.timeInterval?.enabled || false);
        setPhoneTimeValue(restrictions.phoneRestrictions?.timeInterval?.value || 10);
        setPhoneTimeUnit(restrictions.phoneRestrictions?.timeInterval?.unit || 'min');
        setBlockedPhones(restrictions.phoneRestrictions?.blockedPhones || []);
        
        // Email Restrictions
        setBlockedEmails(restrictions.emailRestrictions?.blockedEmails || []);
      } else {
        toast.error(data.error || 'Failed to fetch restrictions');
      }
    } catch (error) {
      console.error('Fetch restrictions error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchRestrictions();
  }, [fetchRestrictions]);

  // ========== OPEN DELETE MODAL ==========
  const openDeleteModal = (type, item, label) => {
    setDeleteType(type);
    setDeleteItem(item);
    setDeleteItemLabel(label);
    setShowDeleteModal(true);
  };

  // ========== HANDLE DELETE CONFIRMATION ==========
  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      if (deleteType === 'ip') {
        await removeBlockedIP(deleteItem);
      } else if (deleteType === 'phone') {
        await removeBlockedPhone(deleteItem);
      } else if (deleteType === 'email') {
        await removeBlockedEmail(deleteItem);
      }
      setShowDeleteModal(false);
      setDeleteItem(null);
      setDeleteType('');
      setDeleteItemLabel('');
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDeleting(false);
    }
  };

  // ========== TOGGLE IP TIME INTERVAL ==========
  const toggleIpTime = async () => {
    const newValue = !ipTimeEnabled;
    setIpTimeEnabled(newValue);
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/order-restrictions/ip', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          timeInterval: {
            enabled: newValue,
            value: ipTimeValue,
            unit: ipTimeUnit
          },
          blockedIPs: blockedIPs
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(newValue ? 'IP time restriction enabled' : 'IP time restriction disabled');
      } else {
        toast.error(data.error || 'Failed to update');
        setIpTimeEnabled(!newValue); // Revert on error
      }
    } catch (error) {
      console.error('Toggle IP error:', error);
      toast.error('Network error');
      setIpTimeEnabled(!newValue); // Revert on error
    } finally {
      setSaving(false);
    }
  };

  // ========== TOGGLE PHONE TIME INTERVAL ==========
  const togglePhoneTime = async () => {
    const newValue = !phoneTimeEnabled;
    setPhoneTimeEnabled(newValue);
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/order-restrictions/phone', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          timeInterval: {
            enabled: newValue,
            value: phoneTimeValue,
            unit: phoneTimeUnit
          },
          blockedPhones: blockedPhones
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(newValue ? 'Phone time restriction enabled' : 'Phone time restriction disabled');
      } else {
        toast.error(data.error || 'Failed to update');
        setPhoneTimeEnabled(!newValue); // Revert on error
      }
    } catch (error) {
      console.error('Toggle phone error:', error);
      toast.error('Network error');
      setPhoneTimeEnabled(!newValue); // Revert on error
    } finally {
      setSaving(false);
    }
  };

  // ========== SAVE IP RESTRICTIONS (for value/unit changes) ==========
  const saveIPRestrictions = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/order-restrictions/ip', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          timeInterval: {
            enabled: ipTimeEnabled,
            value: ipTimeValue,
            unit: ipTimeUnit
          },
          blockedIPs: blockedIPs
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('IP restrictions updated successfully');
      } else {
        toast.error(data.error || 'Failed to update IP restrictions');
      }
    } catch (error) {
      console.error('Save IP restrictions error:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  // ========== SAVE PHONE RESTRICTIONS (for value/unit changes) ==========
  const savePhoneRestrictions = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/order-restrictions/phone', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          timeInterval: {
            enabled: phoneTimeEnabled,
            value: phoneTimeValue,
            unit: phoneTimeUnit
          },
          blockedPhones: blockedPhones
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Phone restrictions updated successfully');
      } else {
        toast.error(data.error || 'Failed to update phone restrictions');
      }
    } catch (error) {
      console.error('Save phone restrictions error:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  // ========== SAVE EMAIL RESTRICTIONS ==========
  const saveEmailRestrictions = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/order-restrictions/email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          blockedEmails: blockedEmails
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Email restrictions updated successfully');
      } else {
        toast.error(data.error || 'Failed to update email restrictions');
      }
    } catch (error) {
      console.error('Save email restrictions error:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  // ========== ADD BLOCKED IP ==========
  const addBlockedIP = async () => {
    if (!newIP.trim()) {
      toast.error('Please enter an IP address');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/order-restrictions/ip/block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ip: newIP.trim(),
          reason: newIPReason.trim()
        })
      });

      const data = await response.json();
      if (data.success) {
        setBlockedIPs(data.data.ipRestrictions.blockedIPs);
        setNewIP('');
        setNewIPReason('');
        toast.success('IP added to blocklist');
      } else {
        toast.error(data.error || 'Failed to add IP');
      }
    } catch (error) {
      console.error('Add blocked IP error:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  // ========== REMOVE BLOCKED IP ==========
  const removeBlockedIP = async (ip) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/order-restrictions/ip/${encodeURIComponent(ip)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setBlockedIPs(data.data.ipRestrictions.blockedIPs);
        toast.success('IP removed from blocklist');
        return true;
      } else {
        toast.error(data.error || 'Failed to remove IP');
        return false;
      }
    } catch (error) {
      console.error('Remove blocked IP error:', error);
      toast.error('Network error');
      return false;
    } finally {
      setSaving(false);
    }
  };

  // ========== ADD BLOCKED PHONE ==========
  const addBlockedPhone = async () => {
    if (!newPhone.trim()) {
      toast.error('Please enter a phone number');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/order-restrictions/phone/block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          phone: newPhone.trim(),
          reason: newPhoneReason.trim()
        })
      });

      const data = await response.json();
      if (data.success) {
        setBlockedPhones(data.data.phoneRestrictions.blockedPhones);
        setNewPhone('');
        setNewPhoneReason('');
        toast.success('Phone added to blocklist');
      } else {
        toast.error(data.error || 'Failed to add phone');
      }
    } catch (error) {
      console.error('Add blocked phone error:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  // ========== REMOVE BLOCKED PHONE ==========
  const removeBlockedPhone = async (phone) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/order-restrictions/phone/${encodeURIComponent(phone)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setBlockedPhones(data.data.phoneRestrictions.blockedPhones);
        toast.success('Phone removed from blocklist');
        return true;
      } else {
        toast.error(data.error || 'Failed to remove phone');
        return false;
      }
    } catch (error) {
      console.error('Remove blocked phone error:', error);
      toast.error('Network error');
      return false;
    } finally {
      setSaving(false);
    }
  };

  // ========== ADD BLOCKED EMAIL ==========
  const addBlockedEmail = async () => {
    if (!newEmail.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/order-restrictions/email/block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: newEmail.trim(),
          reason: newEmailReason.trim()
        })
      });

      const data = await response.json();
      if (data.success) {
        setBlockedEmails(data.data.emailRestrictions.blockedEmails);
        setNewEmail('');
        setNewEmailReason('');
        toast.success('Email added to blocklist');
      } else {
        toast.error(data.error || 'Failed to add email');
      }
    } catch (error) {
      console.error('Add blocked email error:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  // ========== REMOVE BLOCKED EMAIL ==========
  const removeBlockedEmail = async (email) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/order-restrictions/email/${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setBlockedEmails(data.data.emailRestrictions.blockedEmails);
        toast.success('Email removed from blocklist');
        return true;
      } else {
        toast.error(data.error || 'Failed to remove email');
        return false;
      }
    } catch (error) {
      console.error('Remove blocked email error:', error);
      toast.error('Network error');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const canEdit = userRole === 'super_admin' || userRole === 'admin' || userRole === 'moderator';

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-6 flex items-center justify-center">
        <FaSpinner className="w-8 h-8 text-[#5f6b56] animate-spin" />
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="order_restrictions">
      <div className="min-h-screen bg-white pb-12 pt-6">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-r from-[#5f6b56] to-[#708268] rounded-xl flex items-center justify-center shadow-lg shadow-[#5f6b56]/25">
                <FaShieldAlt className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#2D1B2E]" style={{ fontFamily: '"Playfair Display"' }}>
                  Order Restrictions
                </h1>
                <p className="text-sm text-[#5f6b56]/60 mt-0.5">Manage fraud prevention and order restrictions</p>
              </div>
            </div>
            {!canEdit && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Read Only</span>
            )}
          </div>

          {!canEdit && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl mb-6">
              <p className="text-sm text-yellow-700">You have read-only access to this page.</p>
            </div>
          )}

          {/* IP Restrictions Section */}
          <div className="bg-white rounded-2xl border border-[#F7C7D3]/40 shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-[#F7C7D3]/40 bg-[#f1f7eb]">
              <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2">
                <FaGlobe className="w-5 h-5 text-[#5f6b56]" />
                IP Address Restrictions
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Time Interval */}
              <div>
                <h3 className="text-sm font-semibold text-[#2D1B2E] mb-3 flex items-center gap-2">
                  <FaClock className="w-4 h-4 text-[#5f6b56]" />
                  Time Interval Restriction
                  <span className="text-xs font-normal text-[#5f6b56]/60 ml-2">
                    (Same IP cannot place orders within this time)
                  </span>
                </h3>
                <div className="flex flex-wrap items-center gap-4 bg-[#f1f7eb] p-4 rounded-xl border border-[#F7C7D3]/40">
                  <button
                    onClick={toggleIpTime}
                    disabled={!canEdit || saving}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      ipTimeEnabled 
                        ? 'bg-green-500 text-white' 
                        : 'bg-[#F7C7D3] text-[#2D1B2E]'
                    } ${(!canEdit || saving) && 'opacity-50 cursor-not-allowed'}`}
                  >
                    {ipTimeEnabled ? (
                      <FaToggleOn className="w-5 h-5" />
                    ) : (
                      <FaToggleOff className="w-5 h-5" />
                    )}
                    {ipTimeEnabled ? 'Enabled' : 'Disabled'}
                    {saving && <FaSpinner className="w-4 h-4 animate-spin ml-1" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="999"
                      value={ipTimeValue}
                      onChange={(e) => setIpTimeValue(parseInt(e.target.value) || 1)}
                      disabled={!ipTimeEnabled || !canEdit || saving}
                      className="w-20 px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#5f6b56] focus:border-transparent outline-none text-[#2D1B2E] disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                    />
                    <select
                      value={ipTimeUnit}
                      onChange={(e) => setIpTimeUnit(e.target.value)}
                      disabled={!ipTimeEnabled || !canEdit || saving}
                      className="px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#5f6b56] focus:border-transparent outline-none text-[#2D1B2E] disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                    >
                      <option value="min">Minutes</option>
                      <option value="hr">Hours</option>
                    </select>
                  </div>

                  {canEdit && ipTimeEnabled && (
                    <button
                      onClick={saveIPRestrictions}
                      disabled={saving}
                      className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5f6b56] to-[#708268] text-white rounded-lg hover:shadow-lg hover:shadow-[#5f6b56]/25 transition-all text-sm font-medium disabled:opacity-50"
                    >
                      {saving ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaSave className="w-4 h-4" />}
                      Save
                    </button>
                  )}
                </div>
                <p className="text-xs text-[#5f6b56]/60 mt-2">
                  {ipTimeEnabled 
                    ? `Users from the same IP must wait ${ipTimeValue} ${ipTimeUnit === 'min' ? 'minute(s)' : 'hour(s)'} between orders`
                    : 'Time interval restriction is disabled'}
                </p>
              </div>

              {/* Blocked IPs */}
              <div>
                <h3 className="text-sm font-semibold text-[#2D1B2E] mb-3 flex items-center gap-2">
                  <FaBan className="w-4 h-4 text-red-500" />
                  Blocked IP Addresses
                </h3>
                <div className="bg-[#f1f7eb] p-4 rounded-xl border border-[#F7C7D3]/40">
                  {/* Add IP Form */}
                  {canEdit && (
                    <div className="flex flex-wrap items-end gap-3 mb-4">
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs text-[#5f6b56]/60 mb-1">IP Address</label>
                        <input
                          type="text"
                          value={newIP}
                          onChange={(e) => setNewIP(e.target.value)}
                          placeholder="e.g., 192.168.1.1"
                          className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#5f6b56] focus:border-transparent outline-none text-[#2D1B2E] text-sm bg-white"
                        />
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs text-[#5f6b56]/60 mb-1">Reason (Optional)</label>
                        <input
                          type="text"
                          value={newIPReason}
                          onChange={(e) => setNewIPReason(e.target.value)}
                          placeholder="Why this IP is blocked"
                          className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#5f6b56] focus:border-transparent outline-none text-[#2D1B2E] text-sm bg-white"
                        />
                      </div>
                      <button
                        onClick={addBlockedIP}
                        disabled={saving || !newIP.trim()}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium disabled:opacity-50 flex items-center gap-2"
                      >
                        <FaPlus className="w-3 h-3" />
                        Add IP
                      </button>
                    </div>
                  )}

                  {/* Blocked IPs List */}
                  {blockedIPs.length === 0 ? (
                    <p className="text-center text-[#5f6b56]/60 text-sm py-4">No IP addresses blocked</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-[#F7C7D3]/20">
                          <tr>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">IP Address</th>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">Reason</th>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">Added By</th>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">Added At</th>
                            {canEdit && <th className="px-3 py-2 text-center text-[#2D1B2E] font-medium">Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {blockedIPs.map((item, index) => (
                            <tr key={index} className="border-b border-[#F7C7D3]/20">
                              <td className="px-3 py-2 font-mono text-[#2D1B2E]">{item.ip}</td>
                              <td className="px-3 py-2 text-[#5f6b56]/60">{item.reason || '-'}</td>
                              <td className="px-3 py-2 text-[#5f6b56]/60">{item.addedBy?.name || 'System'}</td>
                              <td className="px-3 py-2 text-[#5f6b56]/60">{new Date(item.addedAt).toLocaleDateString()}</td>
                              {canEdit && (
                                <td className="px-3 py-2 text-center">
                                  <button
                                    onClick={() => openDeleteModal('ip', item.ip, `IP: ${item.ip}`)}
                                    disabled={saving}
                                    className="text-red-500 hover:text-red-600 transition-colors"
                                  >
                                    <FaTrash className="w-4 h-4" />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Phone Restrictions Section */}
          <div className="bg-white rounded-2xl border border-[#F7C7D3]/40 shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-[#F7C7D3]/40 bg-[#f1f7eb]">
              <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2">
                <FaPhone className="w-5 h-5 text-[#5f6b56]" />
                Phone Number Restrictions
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Time Interval */}
              <div>
                <h3 className="text-sm font-semibold text-[#2D1B2E] mb-3 flex items-center gap-2">
                  <FaClock className="w-4 h-4 text-[#5f6b56]" />
                  Time Interval Restriction
                  <span className="text-xs font-normal text-[#5f6b56]/60 ml-2">
                    (Same phone cannot place orders within this time)
                  </span>
                </h3>
                <div className="flex flex-wrap items-center gap-4 bg-[#f1f7eb] p-4 rounded-xl border border-[#F7C7D3]/40">
                  <button
                    onClick={togglePhoneTime}
                    disabled={!canEdit || saving}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      phoneTimeEnabled 
                        ? 'bg-green-500 text-white' 
                        : 'bg-[#F7C7D3] text-[#2D1B2E]'
                    } ${(!canEdit || saving) && 'opacity-50 cursor-not-allowed'}`}
                  >
                    {phoneTimeEnabled ? (
                      <FaToggleOn className="w-5 h-5" />
                    ) : (
                      <FaToggleOff className="w-5 h-5" />
                    )}
                    {phoneTimeEnabled ? 'Enabled' : 'Disabled'}
                    {saving && <FaSpinner className="w-4 h-4 animate-spin ml-1" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="999"
                      value={phoneTimeValue}
                      onChange={(e) => setPhoneTimeValue(parseInt(e.target.value) || 1)}
                      disabled={!phoneTimeEnabled || !canEdit || saving}
                      className="w-20 px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#5f6b56] focus:border-transparent outline-none text-[#2D1B2E] disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                    />
                    <select
                      value={phoneTimeUnit}
                      onChange={(e) => setPhoneTimeUnit(e.target.value)}
                      disabled={!phoneTimeEnabled || !canEdit || saving}
                      className="px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#5f6b56] focus:border-transparent outline-none text-[#2D1B2E] disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                    >
                      <option value="min">Minutes</option>
                      <option value="hr">Hours</option>
                    </select>
                  </div>

                  {canEdit && phoneTimeEnabled && (
                    <button
                      onClick={savePhoneRestrictions}
                      disabled={saving}
                      className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5f6b56] to-[#708268] text-white rounded-lg hover:shadow-lg hover:shadow-[#5f6b56]/25 transition-all text-sm font-medium disabled:opacity-50"
                    >
                      {saving ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaSave className="w-4 h-4" />}
                      Save
                    </button>
                  )}
                </div>
                <p className="text-xs text-[#5f6b56]/60 mt-2">
                  {phoneTimeEnabled 
                    ? `Users with the same phone number must wait ${phoneTimeValue} ${phoneTimeUnit === 'min' ? 'minute(s)' : 'hour(s)'} between orders`
                    : 'Time interval restriction is disabled'}
                </p>
              </div>

              {/* Blocked Phones */}
              <div>
                <h3 className="text-sm font-semibold text-[#2D1B2E] mb-3 flex items-center gap-2">
                  <FaBan className="w-4 h-4 text-red-500" />
                  Blocked Phone Numbers
                </h3>
                <div className="bg-[#f1f7eb] p-4 rounded-xl border border-[#F7C7D3]/40">
                  {canEdit && (
                    <div className="flex flex-wrap items-end gap-3 mb-4">
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs text-[#5f6b56]/60 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          placeholder="e.g., 017XXXXXXXX"
                          className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#5f6b56] focus:border-transparent outline-none text-[#2D1B2E] text-sm bg-white"
                        />
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs text-[#5f6b56]/60 mb-1">Reason (Optional)</label>
                        <input
                          type="text"
                          value={newPhoneReason}
                          onChange={(e) => setNewPhoneReason(e.target.value)}
                          placeholder="Why this number is blocked"
                          className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#5f6b56] focus:border-transparent outline-none text-[#2D1B2E] text-sm bg-white"
                        />
                      </div>
                      <button
                        onClick={addBlockedPhone}
                        disabled={saving || !newPhone.trim()}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium disabled:opacity-50 flex items-center gap-2"
                      >
                        <FaPlus className="w-3 h-3" />
                        Add Phone
                      </button>
                    </div>
                  )}

                  {blockedPhones.length === 0 ? (
                    <p className="text-center text-[#5f6b56]/60 text-sm py-4">No phone numbers blocked</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-[#F7C7D3]/20">
                          <tr>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">Phone Number</th>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">Reason</th>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">Added By</th>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">Added At</th>
                            {canEdit && <th className="px-3 py-2 text-center text-[#2D1B2E] font-medium">Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {blockedPhones.map((item, index) => (
                            <tr key={index} className="border-b border-[#F7C7D3]/20">
                              <td className="px-3 py-2 font-mono text-[#2D1B2E]">{item.phone}</td>
                              <td className="px-3 py-2 text-[#5f6b56]/60">{item.reason || '-'}</td>
                              <td className="px-3 py-2 text-[#5f6b56]/60">{item.addedBy?.name || 'System'}</td>
                              <td className="px-3 py-2 text-[#5f6b56]/60">{new Date(item.addedAt).toLocaleDateString()}</td>
                              {canEdit && (
                                <td className="px-3 py-2 text-center">
                                  <button
                                    onClick={() => openDeleteModal('phone', item.phone, `Phone: ${item.phone}`)}
                                    disabled={saving}
                                    className="text-red-500 hover:text-red-600 transition-colors"
                                  >
                                    <FaTrash className="w-4 h-4" />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Email Restrictions Section */}
          <div className="bg-white rounded-2xl border border-[#F7C7D3]/40 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#F7C7D3]/40 bg-[#f1f7eb]">
              <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2">
                <FaEnvelope className="w-5 h-5 text-[#5f6b56]" />
                Email Address Restrictions
              </h2>
            </div>

            <div className="p-6">
              <div>
                <h3 className="text-sm font-semibold text-[#2D1B2E] mb-3 flex items-center gap-2">
                  <FaBan className="w-4 h-4 text-red-500" />
                  Blocked Email Addresses
                </h3>
                <div className="bg-[#f1f7eb] p-4 rounded-xl border border-[#F7C7D3]/40">
                  {canEdit && (
                    <div className="flex flex-wrap items-end gap-3 mb-4">
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs text-[#5f6b56]/60 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="user@example.com"
                          className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#5f6b56] focus:border-transparent outline-none text-[#2D1B2E] text-sm bg-white"
                        />
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs text-[#5f6b56]/60 mb-1">Reason (Optional)</label>
                        <input
                          type="text"
                          value={newEmailReason}
                          onChange={(e) => setNewEmailReason(e.target.value)}
                          placeholder="Why this email is blocked"
                          className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#5f6b56] focus:border-transparent outline-none text-[#2D1B2E] text-sm bg-white"
                        />
                      </div>
                      <button
                        onClick={addBlockedEmail}
                        disabled={saving || !newEmail.trim()}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium disabled:opacity-50 flex items-center gap-2"
                      >
                        <FaPlus className="w-3 h-3" />
                        Add Email
                      </button>
                    </div>
                  )}

                  {blockedEmails.length === 0 ? (
                    <p className="text-center text-[#5f6b56]/60 text-sm py-4">No email addresses blocked</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-[#F7C7D3]/20">
                          <tr>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">Email Address</th>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">Reason</th>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">Added By</th>
                            <th className="px-3 py-2 text-left text-[#2D1B2E] font-medium">Added At</th>
                            {canEdit && <th className="px-3 py-2 text-center text-[#2D1B2E] font-medium">Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {blockedEmails.map((item, index) => (
                            <tr key={index} className="border-b border-[#F7C7D3]/20">
                              <td className="px-3 py-2 text-[#2D1B2E]">{item.email}</td>
                              <td className="px-3 py-2 text-[#5f6b56]/60">{item.reason || '-'}</td>
                              <td className="px-3 py-2 text-[#5f6b56]/60">{item.addedBy?.name || 'System'}</td>
                              <td className="px-3 py-2 text-[#5f6b56]/60">{new Date(item.addedAt).toLocaleDateString()}</td>
                              {canEdit && (
                                <td className="px-3 py-2 text-center">
                                  <button
                                    onClick={() => openDeleteModal('email', item.email, `Email: ${item.email}`)}
                                    disabled={saving}
                                    className="text-red-500 hover:text-red-600 transition-colors"
                                  >
                                    <FaTrash className="w-4 h-4" />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteItem(null);
            setDeleteType('');
            setDeleteItemLabel('');
          }}
          onConfirm={handleDeleteConfirm}
          title="Delete Item"
          message={`Are you sure you want to remove ${deleteItemLabel} from the blocklist?`}
          item={deleteItemLabel}
          deleting={deleting}
        />
      </div>
    </ProtectedRoute>
  );
}

// ========== MAIN EXPORT WITH SUSPENSE ==========
export default function OrderRestrictionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f1f7eb] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#5f6b56] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#5f6b56]/60 text-sm">Loading order restrictions...</p>
        </div>
      </div>
    }>
      <OrderRestrictionsContent />
    </Suspense>
  );
}