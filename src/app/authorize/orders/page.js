
// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';

// import { 
//   FaBox,
//   FaSearch,
//   FaEye,
//   FaEdit,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaClock,
//   FaMoneyBillWave,
//   FaUser,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaDownload,
//   FaPrint,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaShippingFast,
//   FaCheckDouble,
//   FaBan,
//   FaUndo,
//   FaFileInvoice,
//   FaExclamationTriangle,
//   FaTrash,
//   FaSave,
//   FaTimes,
//   FaCreditCard,
//   FaMobileAlt,
//   FaCity,
//   FaMapPin,
//   FaHome,
//   FaChevronDown,
//   FaHeart,
//   FaStar,
//   FaEnvelope,
//   FaPhone,
//   FaWhatsapp,
//   FaShieldAlt,
//   FaGlobe,
//   FaLaptop,
//   FaTablet,
//   FaMobile,
//   FaDesktop,
//   FaInfoCircle,
//   FaPhoneAlt,
//   FaUserCircle,
//   FaTruck,
//   FaStore,
//   FaBuilding,
//   FaTag,
//   FaPercent,
//   FaUserTag,
//   FaClipboardList,
//   FaHeadset,
//   FaCheckSquare,
//   FaSquare,
//   FaExternalLinkAlt,
//   FaWeightHanging,
//   FaFileAlt,
//   FaChartLine,
//   FaPlus,
//   FaMinus,
//   FaSync
// } from 'react-icons/fa';
// import { generateInvoicePDF } from '@/utils/invoicePDF';
// import QuickDeliveryModal from '@/app/components/QuickDeliveryModal';
// import CourierScoreModal from '@/app/components/CourierScoreModal';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ========== ORDER STATUSES - UPDATED ==========
// const ORDER_STATUSES = [
//   // Initial statuses
//   { value: 'placed', label: 'Placed', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaClock, nextStatuses: ['follow_up', 'approved', 'hold', 'processing', 'cancelled'] },
//   { value: 'follow_up', label: 'Follow Up', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaHeadset, nextStatuses: ['accepted', 'rejected', 'cancelled', 'reminder'] },
//   { value: 'reminder', label: 'Reminder', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaClock, nextStatuses: ['accepted', 'rejected', 'cancelled'] },
  
//   // Main statuses
//   { value: 'accepted', label: 'Accepted', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaCheckCircle, nextStatuses: ['approved', 'processing', 'hold', 'cancelled'] },
//   { value: 'approved', label: 'Approved', color: 'bg-[#82947A]/10 text-[#82947A] border-[#82947A]/30', icon: FaCheckDouble, nextStatuses: ['processing', 'hold', 'cancelled', 'courier_assigned'] },
  
//   // HOLD status
//   { value: 'hold', label: 'On Hold', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', icon: FaClock, nextStatuses: ['approved', 'processing', 'cancelled', 'courier_assigned'] },
  
//   // PROCESSING
//   { value: 'processing', label: 'Processing', color: 'bg-blue-50 text-[#82947A] border-blue-200', icon: FaSpinner, nextStatuses: ['hold', 'cancelled', 'courier_assigned'] },
  
//   // COURIER ASSIGNED
//   { value: 'courier_assigned', label: 'Courier Assigned', color: 'bg-[#82947A]/10 text-[#82947A] border-[#82947A]/30', icon: FaTruck, nextStatuses: ['ready_to_ship', 'partial_delivery', 'delivered', 'returned', 'cancelled'] },
  
//   // PARTIAL DELIVERY
//   { value: 'partial_delivery', label: 'Partial Delivery', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: FaCheckDouble, nextStatuses: ['delivered', 'returned', 'cancelled'] },
  
//   { value: 'ready_to_ship', label: 'Ready to Ship', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaBox, nextStatuses: ['partial_delivery', 'delivered', 'returned', 'cancelled'] },
  
//   // Terminal statuses - NO nextStatuses allowed
//   { value: 'rejected', label: 'Rejected', color: 'bg-orange-50 text-orange-600 border-orange-200', icon: FaTimesCircle, nextStatuses: [] },
//   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-600 border-red-200', icon: FaBan, nextStatuses: [] },
//   { value: 'delivered', label: 'Delivered', color: 'bg-green-50 text-green-600 border-green-200', icon: FaCheckDouble, nextStatuses: [] },
//   { value: 'returned', label: 'Returned', color: 'bg-purple-50 text-purple-600 border-purple-200', icon: FaUndo, nextStatuses: [] },
  
//   // Courier handled - not shown in manual dropdown
//   { value: 'shipped', label: 'Shipped', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaShippingFast, nextStatuses: [] },
//   { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaTruck, nextStatuses: [] },
// ];

// const PAYMENT_STATUSES = [
//   { value: 'pending', label: 'Pending', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30' },
//   { value: 'paid', label: 'Paid', color: 'bg-[#82947A]/10 text-[#82947A] border-[#82947A]/30' },
//   { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-600 border-red-200' },
//   { value: 'refunded', label: 'Refunded', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30' }
// ];

// // ========== DELIVERY STATUSES ==========
// const DELIVERY_STATUSES = [
//   { value: 'pending', label: 'Pending', color: 'bg-gray-100 text-gray-800' },
//   { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-[#485442]' },
//   { value: 'picked_up', label: 'Picked Up', color: 'bg-cyan-100 text-cyan-800' },
//   { value: 'in_transit', label: 'In Transit', color: 'bg-purple-100 text-purple-800' },
//   { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-orange-100 text-orange-800' },
//   { value: 'delivered', label: 'Delivered ✅', color: 'bg-green-100 text-green-800' },
//   { value: 'cancelled', label: 'Cancelled ❌', color: 'bg-red-100 text-red-800' },
//   { value: 'failed', label: 'Failed ❌', color: 'bg-red-200 text-red-900' },
//   { value: 'returned', label: 'Returned 🔄', color: 'bg-gray-200 text-gray-800' },
//   { value: 'accepted', label: 'Accepted', color: 'bg-blue-100 text-[#485442]' },
//   { value: 'pickup', label: 'Picked Up', color: 'bg-cyan-100 text-cyan-800' },
//   { value: 'pickup.requested', label: 'Pickup Requested', color: 'bg-blue-100 text-[#485442]' },
//   { value: 'assigned.for.pickup', label: 'Assigned For Pickup', color: 'bg-blue-100 text-[#485442]' },
//   { value: 'pickup.failed', label: 'Pickup Failed', color: 'bg-red-100 text-red-800' },
//   { value: 'pickup.cancelled', label: 'Pickup Cancelled', color: 'bg-red-100 text-red-800' },
//   { value: 'at.the.sorting.hub', label: 'At Sorting Hub', color: 'bg-purple-100 text-purple-800' },
//   { value: 'in.transit', label: 'In Transit', color: 'bg-purple-100 text-purple-800' },
//   { value: 'received.at.last.mile.hub', label: 'Received at Last Mile Hub', color: 'bg-purple-100 text-purple-800' },
//   { value: 'assigned.for.delivery', label: 'Assigned for Delivery', color: 'bg-orange-100 text-orange-800' },
//   { value: 'partial.delivery', label: 'Partial Delivery', color: 'bg-yellow-100 text-yellow-800' },
//   { value: 'delivery.failed', label: 'Delivery Failed', color: 'bg-red-100 text-red-800' },
//   { value: 'on.hold', label: 'On Hold', color: 'bg-yellow-100 text-yellow-800' },
//   { value: 'return', label: 'Return', color: 'bg-gray-200 text-gray-800' },
//   { value: 'paid.return', label: 'Paid Return', color: 'bg-gray-200 text-gray-800' },
//   { value: 'exchange', label: 'Exchange', color: 'bg-blue-100 text-[#485442]' },
//   { value: 'returned.to.merchant', label: 'Returned To Merchant', color: 'bg-gray-200 text-gray-800' },
//   { value: 'ready-for-delivery', label: 'Ready for Delivery', color: 'bg-blue-100 text-[#485442]' },
//   { value: 'delivery-in-progress', label: 'Delivery In Progress', color: 'bg-orange-100 text-orange-800' },
//   { value: 'agent-hold', label: 'Agent Hold', color: 'bg-yellow-100 text-yellow-800' },
//   { value: 'agent-returning', label: 'Agent Returning', color: 'bg-gray-200 text-gray-800' },
//   { value: 'agent-area-change', label: 'Agent Area Change', color: 'bg-blue-100 text-[#485442]' },
//   { value: 'partial_delivered', label: 'Partial Delivered', color: 'bg-yellow-100 text-yellow-800' },
//   { value: 'unknown', label: 'Unknown', color: 'bg-gray-100 text-gray-800' },
// ];

// // ========== STATUS DISPLAY MAPPING ==========
// const STATUS_DISPLAY = {
//   'order.created': 'Order Created',
//   'order.updated': 'Order Updated',
//   'pickup.requested': 'Pickup Requested',
//   'assigned.for.pickup': 'Assigned For Pickup',
//   'pickup': 'Picked',
//   'pickup.failed': 'Pickup Failed',
//   'pickup.cancelled': 'Pickup Cancelled',
//   'at.the.sorting.hub': 'At Sorting Hub',
//   'in.transit': 'In Transit',
//   'received.at.last.mile.hub': 'Received at Last Mile Hub',
//   'assigned.for.delivery': 'Assigned for Delivery',
//   'delivered': 'Delivered ✅',
//   'partial.delivery': 'Partial Delivery',
//   'return': 'Return',
//   'delivery.failed': 'Delivery Failed',
//   'on.hold': 'On Hold',
//   'payment.invoice': 'Payment Invoice',
//   'paid.return': 'Paid Return',
//   'exchange': 'Exchange',
//   'return.id.created': 'Return ID Created',
//   'return.in.transit': 'Return In Transit',
//   'returned.to.merchant': 'Returned To Merchant',
//   'ready-for-delivery': 'Ready for Delivery',
//   'delivery-in-progress': 'Delivery In Progress',
//   'agent-hold': 'Agent Hold',
//   'agent-returning': 'Agent Returning',
//   'returned': 'Returned',
//   'agent-area-change': 'Agent Area Change',
//   'pending': 'Pending',
//   'partial_delivered': 'Partial Delivered',
//   'cancelled': 'Cancelled',
//   'unknown': 'Unknown',
// };

// // ========== STATUS COLOR MAPPING ==========
// const STATUS_COLORS = {
//   'order.created': 'bg-blue-100 text-[#485442]',
//   'order.updated': 'bg-blue-100 text-[#485442]',
//   'pickup.requested': 'bg-blue-100 text-[#485442]',
//   'assigned.for.pickup': 'bg-blue-100 text-[#485442]',
//   'ready-for-delivery': 'bg-blue-100 text-[#485442]',
//   'agent-area-change': 'bg-blue-100 text-[#485442]',
//   'pending': 'bg-gray-100 text-gray-800',
//   'unknown': 'bg-gray-100 text-gray-800',
//   'pickup': 'bg-cyan-100 text-cyan-800',
//   'at.the.sorting.hub': 'bg-purple-100 text-purple-800',
//   'in.transit': 'bg-purple-100 text-purple-800',
//   'received.at.last.mile.hub': 'bg-purple-100 text-purple-800',
//   'assigned.for.delivery': 'bg-orange-100 text-orange-800',
//   'delivery-in-progress': 'bg-orange-100 text-orange-800',
//   'delivered': 'bg-green-100 text-green-800',
//   'partial.delivery': 'bg-green-100 text-green-800',
//   'partial_delivered': 'bg-green-100 text-green-800',
//   'pickup.failed': 'bg-red-100 text-red-800',
//   'pickup.cancelled': 'bg-red-100 text-red-800',
//   'delivery.failed': 'bg-red-100 text-red-800',
//   'cancelled': 'bg-red-100 text-red-800',
//   'return': 'bg-gray-200 text-gray-800',
//   'returned': 'bg-gray-200 text-gray-800',
//   'agent-returning': 'bg-gray-200 text-gray-800',
//   'paid.return': 'bg-gray-200 text-gray-800',
//   'return.id.created': 'bg-gray-200 text-gray-800',
//   'return.in.transit': 'bg-gray-200 text-gray-800',
//   'returned.to.merchant': 'bg-gray-200 text-gray-800',
//   'on.hold': 'bg-yellow-100 text-yellow-800',
//   'agent-hold': 'bg-yellow-100 text-yellow-800',
// };

// // Helper function to get display status
// const getStatusDisplay = (status) => {
//   if (!status) return 'Unknown';
//   const found = DELIVERY_STATUSES.find(s => s.value === status);
//   if (found) return found.label;
//   if (STATUS_DISPLAY[status]) return STATUS_DISPLAY[status];
//   return status
//     .replace(/\./g, ' ')
//     .replace(/_/g, ' ')
//     .replace(/-/g, ' ')
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };

// // Helper function to get status color
// const getStatusColor = (status) => {
//   if (!status) return 'bg-gray-100 text-gray-800';
//   const found = DELIVERY_STATUSES.find(s => s.value === status);
//   if (found) return found.color;
//   if (STATUS_COLORS[status]) return STATUS_COLORS[status];
//   const statusLower = status.toLowerCase();
//   if (statusLower.includes('delivered')) return 'bg-green-100 text-green-800';
//   if (statusLower.includes('cancel')) return 'bg-red-100 text-red-800';
//   if (statusLower.includes('fail')) return 'bg-red-100 text-red-800';
//   if (statusLower.includes('return')) return 'bg-gray-200 text-gray-800';
//   if (statusLower.includes('transit') || statusLower.includes('sorting')) return 'bg-purple-100 text-purple-800';
//   if (statusLower.includes('pickup') || statusLower.includes('picked')) return 'bg-cyan-100 text-cyan-800';
//   if (statusLower.includes('delivery')) return 'bg-orange-100 text-orange-800';
//   if (statusLower.includes('hold')) return 'bg-yellow-100 text-yellow-800';
//   return 'bg-gray-100 text-gray-800';
// };

// // ========== SEARCHABLE SELECT ==========
// const SearchableSelect = ({ name, value, onChange, options, placeholder, required, disabled, error }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef(null);

//   const filteredOptions = options.filter(option =>
//     option.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSelect = (selectedValue) => {
//     onChange({ target: { name, value: selectedValue } });
//     setIsOpen(false);
//     setSearchTerm('');
//   };

//   const handleClear = () => {
//     onChange({ target: { name, value: '' } });
//     setSearchTerm('');
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const selectedOption = value && options.includes(value) ? value : '';

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className={`w-full px-3 py-2 border rounded-xl focus-within:ring-2 focus-within:ring-[#82947A] focus-within:border-transparent cursor-pointer flex items-center justify-between transition-all text-sm ${
//           disabled ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white'
//         } ${error ? 'border-red-500' : 'border-[#82947A]/30 hover:border-[#82947A]/60'}`}
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//       >
//         <span className={`text-sm ${selectedOption ? 'text-black font-medium' : 'text-[#64748B]'}`}>
//           {selectedOption || placeholder}
//         </span>
//         <div className="flex items-center gap-2 flex-shrink-0">
//           {selectedOption && !disabled && (
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleClear();
//               }}
//               className="text-[#64748B] hover:text-[#82947A]"
//             >
//               <FaTimes className="w-3 h-3" />
//             </button>
//           )}
//           <FaChevronDown className={`w-3 h-3 text-[#64748B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//         </div>
//       </div>

//       {isOpen && !disabled && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-[#82947A]/30 rounded-xl shadow-lg max-h-60 overflow-hidden">
//           <div className="p-2 border-b border-[#82947A]/20">
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-3.5 h-3.5" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 className="w-full pl-9 pr-3 py-1.5 border border-[#82947A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82947A] text-sm"
//                 onClick={(e) => e.stopPropagation()}
//               />
//             </div>
//           </div>
//           <div className="overflow-y-auto max-h-48">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option, idx) => (
//                 <button
//                   key={idx}
//                   type="button"
//                   onClick={() => handleSelect(option)}
//                   className="w-full px-4 py-2 text-left hover:bg-[#E2E7EA] transition-colors text-sm text-black"
//                 >
//                   {option}
//                 </button>
//               ))
//             ) : (
//               <div className="px-4 py-3 text-sm text-[#64748B] text-center">
//                 No results found
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ========== DELETE CONFIRM MODAL ==========
// const DeleteConfirmModal = ({ isOpen, onClose, order, onDelete }) => {
//   const [loading, setLoading] = useState(false);

//   const handleDelete = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/orders/${order._id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Order deleted successfully');
//         onDelete();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to delete order');
//       }
//     } catch (error) {
//       console.error('Delete order error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
//           <div className="flex items-center gap-2">
//             <FaExclamationTriangle className="w-5 h-5" />
//             <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Delete Order</h2>
//           </div>
//         </div>

//         <div className="p-5 text-center">
//           <p className="text-black text-sm mb-2">Are you sure you want to delete this order?</p>
//           <p className="text-xs text-[#64748B]">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
//           <p className="text-xs text-red-500 mt-3">⚠️ This action cannot be undone!</p>
//         </div>

//         <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
//             Cancel
//           </button>
//           <button onClick={handleDelete} disabled={loading} className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaTrash className="w-3 h-3" />}
//             Delete Order
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== BULK DELETE MODAL ==========
// const BulkDeleteModal = ({ isOpen, onClose, selectedOrders, onDelete }) => {
//   const [loading, setLoading] = useState(false);
//   const [deleteCount, setDeleteCount] = useState(0);

//   useEffect(() => {
//     if (selectedOrders) {
//       setDeleteCount(selectedOrders.length);
//     }
//   }, [selectedOrders]);

//   const handleBulkDelete = async () => {
//     if (selectedOrders.length === 0) {
//       toast.error('No orders selected');
//       return;
//     }

//     setLoading(true);
//     let successCount = 0;
//     let failCount = 0;

//     try {
//       const token = localStorage.getItem('token');
      
//       for (const order of selectedOrders) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/orders/${order._id}`, {
//             method: 'DELETE',
//             headers: { 'Authorization': `Bearer ${token}` }
//           });
          
//           const data = await response.json();
//           if (data.success) {
//             successCount++;
//           } else {
//             failCount++;
//           }
//         } catch (err) {
//           failCount++;
//         }
//       }

//       if (successCount > 0) {
//         toast.success(`${successCount} order(s) deleted successfully`);
//       }
//       if (failCount > 0) {
//         toast.error(`${failCount} order(s) failed to delete`);
//       }
      
//       onDelete();
//       onClose();
//     } catch (error) {
//       console.error('Bulk delete error:', error);
//       toast.error('Failed to delete orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
//           <div className="flex items-center gap-2">
//             <FaExclamationTriangle className="w-5 h-5" />
//             <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Delete Multiple Orders</h2>
//           </div>
//         </div>

//         <div className="p-5 text-center">
//           <p className="text-black text-sm mb-2">
//             Are you sure you want to delete <span className="font-bold text-red-600">{deleteCount}</span> order(s)?
//           </p>
//           <p className="text-xs text-[#64748B] mb-2">This action cannot be undone!</p>
//           <div className="bg-[#E2E7EA]/50 rounded-lg p-2 max-h-[150px] overflow-y-auto">
//             {selectedOrders.map((order, index) => (
//               <p key={order._id} className="text-xs text-black py-0.5 border-b border-[#82947A]/10 last:border-0">
//                 #{order.orderNumber || order._id.slice(-8).toUpperCase()} - {order.customerInfo?.fullName}
//               </p>
//             ))}
//           </div>
//         </div>

//         <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
//             Cancel
//           </button>
//           <button onClick={handleBulkDelete} disabled={loading} className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
//             {loading ? (
//               <>
//                 <FaSpinner className="w-3 h-3 animate-spin" />
//                 Deleting...
//               </>
//             ) : (
//               <>
//                 <FaTrash className="w-3 h-3" />
//                 Delete All
//               </>
//             )}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== TRACKING MODAL ==========
// const TrackingModal = ({ isOpen, onClose, trackingInfo, order, onRefreshTracking, refreshLoading }) => {
//   if (!isOpen) return null;

//   const displayData = trackingInfo || order?.deliveryService || {};

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-[#82947A] to-black text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaTruck className="w-5 h-5" />
//               <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
//                 Tracking Information
//               </h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">
//             Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
//           </p>
//         </div>

//         <div className="p-4 space-y-3">
//           <div className="bg-[#E2E7EA]/30 rounded-xl p-3">
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-[#64748B]">Tracking Number:</span>
//                 <span className="font-mono text-black font-medium">
//                   {displayData?.trackingNumber || 'N/A'}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-[#64748B]">Courier:</span>
//                 <span className="text-black font-medium">
//                   {displayData?.courierName || 'N/A'}
//                 </span>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <span className="text-[#64748B]">Status:</span>
//                 <div className="flex items-center gap-2">
//                   <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getStatusColor(displayData?.deliveryStatus)}`}>
//                     {getStatusDisplay(displayData?.deliveryStatus)}
//                   </span>
//                   <button
//                     onClick={onRefreshTracking}
//                     disabled={refreshLoading}
//                     className="text-[#82947A] hover:text-[#0891B2] transition-colors"
//                     title="Refresh tracking"
//                   >
//                     {refreshLoading ? (
//                       <FaSpinner className="w-3 h-3 animate-spin" />
//                     ) : (
//                       <FaSync className="w-3 h-3" />
//                     )}
//                   </button>
//                 </div>
//               </div>
              
//               {displayData?.trackingUrl && (
//                 <div className="flex justify-between">
//                   <span className="text-[#64748B]">Track Link:</span>
//                   <a
//                     href={displayData.trackingUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-[#82947A] hover:underline flex items-center gap-1"
//                   >
//                     <FaExternalLinkAlt className="w-3 h-3" />
//                     Track on {displayData?.courierName || 'Courier'}
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>

//           {displayData?.history && displayData.history.length > 0 && (
//             <div>
//               <h3 className="text-sm font-semibold text-black mb-2 flex items-center gap-2">
//                 <FaClock className="w-4 h-4 text-[#82947A]" />
//                 Tracking History
//               </h3>
//               <div className="space-y-2 max-h-[200px] overflow-y-auto">
//                 {displayData.history.map((entry, index) => (
//                   <div key={index} className="flex items-start gap-3 text-xs border-b border-[#82947A]/10 pb-2 last:border-0">
//                     <div className="w-2 h-2 rounded-full bg-[#82947A] mt-1.5 flex-shrink-0"></div>
//                     <div>
//                       <p className="text-black">{entry.message || entry.status}</p>
//                       <p className="text-[#64748B] text-[10px]">
//                         {entry.timestamp ? new Date(entry.timestamp).toLocaleString('en-BD', {
//                           day: '2-digit',
//                           month: 'short',
//                           year: 'numeric',
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         }) : 'N/A'}
//                       </p>
//                       {entry.location && (
//                         <p className="text-[#64748B] text-[10px]">📍 {entry.location}</p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {displayData?.error && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
//               <p className="text-xs text-yellow-700">
//                 <FaExclamationTriangle className="inline w-3 h-3 mr-1" />
//                 {displayData.error}
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex justify-end">
//           <button onClick={onClose} className="px-4 py-2 bg-[#82947A] text-white rounded-xl hover:bg-[#0891B2] transition-colors text-sm">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== STATUS UPDATE MODAL - UPDATED ==========
// const StatusUpdateModal = ({ isOpen, onClose, order, onUpdate, userRole }) => {
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [trackingNumber, setTrackingNumber] = useState('');
//   const [deliveryNote, setDeliveryNote] = useState('');
//   const [cancellationReason, setCancellationReason] = useState('');
//   const [rejectionReason, setRejectionReason] = useState('');
//   const [courierService, setCourierService] = useState('');
//   const [weight, setWeight] = useState(0.5);
//   const [loading, setLoading] = useState(false);
  
//   const [connectedCouriers, setConnectedCouriers] = useState([]);
//   const [loadingCouriers, setLoadingCouriers] = useState(false);

//   const fetchConnectedCouriers = useCallback(async () => {
//     setLoadingCouriers(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/couriers`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         const connected = data.data.filter(c => c.apiEnabled && c.configured);
//         setConnectedCouriers(connected);
//       }
//     } catch (error) {
//       console.error('Fetch connected couriers error:', error);
//     } finally {
//       setLoadingCouriers(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       fetchConnectedCouriers();
//     }
//   }, [isOpen, fetchConnectedCouriers]);

//   useEffect(() => {
//     if (order) {
//       setSelectedStatus(order.orderStatus);
//       setTrackingNumber(order.trackingNumber || '');
//       setDeliveryNote(order.deliveryNote || '');
//       setCancellationReason(order.cancellationReason || '');
//       setRejectionReason(order.rejectionReason || '');
//       setCourierService(order.deliveryService?.courierName || '');
      
//       if (order.items && order.items.length > 0) {
//         const totalWeight = order.items.reduce((sum, item) => {
//           const itemWeight = item.weight || item.itemWeight || 0.5;
//           return sum + (itemWeight * (item.quantity || 1));
//         }, 0);
//         setWeight(Math.max(0.5, totalWeight));
//       }
//     }
//   }, [order]);

//   const currentStatusInfo = ORDER_STATUSES.find(s => s.value === order?.orderStatus);
//   const selectedStatusInfo = ORDER_STATUSES.find(s => s.value === selectedStatus);

//   // ========== UPDATED: getAvailableNextStatuses ==========
//   const getAvailableNextStatuses = () => {
//     if (!order || !currentStatusInfo) return [];
//     const currentStatus = order.orderStatus;
    
//     const statusTransitions = {
//       'placed': ['follow_up', 'approved', 'hold', 'processing', 'cancelled'],
//       'follow_up': ['accepted', 'rejected', 'cancelled', 'reminder'],
//       'reminder': ['accepted', 'rejected', 'cancelled'],
//       'accepted': ['approved', 'processing', 'hold', 'cancelled'],
//       'approved': ['processing', 'hold', 'cancelled', 'courier_assigned'],
//       'hold': ['approved', 'processing', 'cancelled', 'courier_assigned'],
//       'processing': ['hold', 'cancelled', 'courier_assigned'],
//       'courier_assigned': ['ready_to_ship', 'partial_delivery', 'delivered', 'returned', 'cancelled'],
//       'partial_delivery': ['delivered', 'returned', 'cancelled'],
//       'ready_to_ship': ['delivered', 'partial_delivery', 'returned', 'cancelled'],
//       'rejected': [],
//       'cancelled': [],
//       'delivered': [],
//       'returned': [],
//       'shipped': [],
//       'out_for_delivery': []
//     };
    
//     let nextStatuses = statusTransitions[currentStatus] || [];
    
//     if (userRole === 'moderator') {
//       const readOnlyForModerator = ['follow_up', 'reminder', 'accepted'];
//       if (readOnlyForModerator.includes(currentStatus)) {
//         return [];
//       }
//       return nextStatuses;
//     }
    
//     return nextStatuses;
//   };

//   // ========== UPDATED: showCourierOption ==========
//   const showCourierOption = () => {
//     const sourceStatuses = ['approved', 'hold', 'processing', 'ready_to_ship'];
//     const isSourceValid = sourceStatuses.includes(order?.orderStatus);
//     const isTargetCourierAssign = selectedStatus === 'courier_assigned';
//     return isSourceValid && isTargetCourierAssign;
//   };

//   // ========== UPDATED: canUpdateStatus ==========
//   const canUpdateStatus = () => {
//     if (!order) return false;
//     const currentStatus = order.orderStatus;
    
//     const terminalStatuses = ['cancelled', 'delivered', 'returned', 'rejected'];
//     if (terminalStatuses.includes(currentStatus)) {
//       return false;
//     }
    
//     if (['shipped', 'out_for_delivery'].includes(currentStatus)) {
//       return false;
//     }
    
//     if (userRole === 'moderator') {
//       const readOnlyForModerator = ['follow_up', 'reminder', 'accepted'];
//       if (readOnlyForModerator.includes(currentStatus)) {
//         return false;
//       }
//       return true;
//     }
    
//     return true;
//   };
  
//   const availableNextStatuses = getAvailableNextStatuses();
//   const isCancelling = selectedStatus === 'cancelled';
//   const isRejecting = selectedStatus === 'rejected';
//   const isCourierAssign = selectedStatus === 'courier_assigned';
//   const isDelivered = selectedStatus === 'delivered';
//   const isReturned = selectedStatus === 'returned';
//   const isPartialDelivery = selectedStatus === 'partial_delivery';

//   const canChange = availableNextStatuses.length > 0 && 
//                   order?.orderStatus !== 'delivered' && 
//                   order?.orderStatus !== 'cancelled' &&
//                   order?.orderStatus !== 'returned' &&
//                   order?.orderStatus !== 'rejected' &&
//                   !['shipped', 'out_for_delivery'].includes(order?.orderStatus) &&
//                   canUpdateStatus();

//   const createDeliveryWithCourier = async (courierSlug) => {
//     try {
//       const token = localStorage.getItem('token');
//       const selectedCourier = connectedCouriers.find(c => c.name === courierSlug);
//       if (!selectedCourier) {
//         return { 
//           success: false, 
//           error: 'Selected courier not found. Please refresh and try again.' 
//         };
//       }

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/delivery`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           courierSlug: selectedCourier.slug,
//           weight: weight || 0.5,
//           deliveryNote: deliveryNote || ''
//         })
//       });

//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         const text = await response.text();
//         console.error('❌ Non-JSON response:', text);
//         return { 
//           success: false, 
//           error: 'Server returned an invalid response. Please try again.' 
//         };
//       }

//       const data = await response.json();
//       console.log('📦 Delivery response:', data);
      
//       if (data.success) {
//         toast.success(`✅ Delivery order created with ${selectedCourier.name}`);
//         return { success: true, data: data.data || data };
//       } else {
//         return { 
//           success: false, 
//           error: data.error || data.message || 'Failed to create delivery order' 
//         };
//       }
//     } catch (error) {
//       console.error('❌ Create delivery error:', error);
//       return { 
//         success: false, 
//         error: error.message || 'Network error. Please try again.' 
//       };
//     }
//   };

//   const handleSubmit = async () => {
//     if (!selectedStatus) {
//       toast.error('Please select a status');
//       return;
//     }

//     if (selectedStatus === order.orderStatus) {
//       toast.error('Please select a different status');
//       return;
//     }

//     if (isCancelling && !cancellationReason.trim()) {
//       toast.error('Please provide a cancellation reason');
//       return;
//     }

//     if (isRejecting && !rejectionReason.trim()) {
//       toast.error('Please provide a rejection reason');
//       return;
//     }

//     if (isCourierAssign && !courierService.trim()) {
//       toast.error('Please select a courier service');
//       return;
//     }

//     if (isCourierAssign && (!weight || weight <= 0)) {
//       toast.error('Please enter a valid weight');
//       return;
//     }

//     setLoading(true);

//     try {
//       if (isCourierAssign) {
//         const deliveryResult = await createDeliveryWithCourier(courierService);
        
//         if (!deliveryResult.success) {
//           toast.error(deliveryResult.error || 'Failed to create delivery order');
//           setLoading(false);
//           return;
//         }

//         toast.success(`✅ Delivery created with ${courierService}`);
//         onUpdate();
//         onClose();
//         setLoading(false);
//         return;
//       }

//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/status`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           orderStatus: selectedStatus,
//           trackingNumber,
//           deliveryNote,
//           cancellationReason: isCancelling ? cancellationReason : undefined,
//           rejectionReason: isRejecting ? rejectionReason : undefined
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(`Order status updated to ${selectedStatusInfo?.label}`);
//         onUpdate();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to update status');
//       }
//     } catch (error) {
//       console.error('Status update error:', error);
//       toast.error(error.message || 'Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   const getRoleLabel = () => {
//     const roleMap = {
//       super_admin: 'Super Admin',
//       admin: 'Admin',
//       moderator: 'Moderator'
//     };
//     return roleMap[userRole] || 'User';
//   };

//   const getRoleColor = () => {
//     const colorMap = {
//       super_admin: 'bg-gradient-to-r from-[#82947A] to-black',
//       admin: 'bg-gradient-to-r from-[#82947A] to-[#0891B2]',
//       moderator: 'bg-gradient-to-r from-black to-[#82947A]'
//     };
//     return colorMap[userRole] || 'bg-gradient-to-r from-[#82947A] to-black';
//   };

//   const getRoleBadgeColor = () => {
//     const colorMap = {
//       super_admin: 'bg-[#82947A]/10 border-[#82947A]/30 text-[#82947A]',
//       admin: 'bg-[#82947A]/10 border-[#82947A]/30 text-[#82947A]',
//       moderator: 'bg-[#E2E7EA] border-[#82947A]/30 text-black'
//     };
//     return colorMap[userRole] || 'bg-[#E2E7EA] border-[#82947A]/30 text-black';
//   };

//   const getPermissionMessage = () => {
//     const currentStatus = order?.orderStatus;
    
//     if (['cancelled', 'delivered', 'returned', 'rejected'].includes(currentStatus)) {
//       return 'This order is final. No further changes allowed.';
//     }
    
//     if (currentStatus === 'partial_delivery') {
//       return 'This order has been partially delivered. You can mark as Delivered, Returned, or Cancelled.';
//     }
    
//     if (currentStatus === 'courier_assigned' || currentStatus === 'processing') {
//       return 'This order is with courier. You can update to Partial Delivery, Delivered, Returned, or Cancelled.';
//     }
    
//     if (['shipped', 'out_for_delivery'].includes(currentStatus)) {
//       return 'This order is being handled by the courier service.';
//     }
    
//     if (userRole === 'moderator') {
//       if (['follow_up', 'reminder', 'accepted'].includes(currentStatus)) {
//         return 'Read-only access for this status.';
//       }
//       return 'You can update status for this order.';
//     }
    
//     return 'You have full access to change order status.';
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
//       >
//         <div className={`p-4 text-white ${getRoleColor()}`}>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaEdit className="w-5 h-5" />
//               <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
//                 Update Order Status
//               </h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <div className="flex items-center justify-between mt-1">
//             <p className="text-xs text-white/80">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
//             <span className={`text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-medium`}>
//               {getRoleLabel()}
//             </span>
//           </div>
//         </div>

//         <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
//           <div className={`text-xs px-3 py-2 rounded-lg border ${getRoleBadgeColor()}`}>
//             <div className="flex items-center gap-2">
//               <FaInfoCircle className="w-3.5 h-3.5" />
//               <span>{getPermissionMessage()}</span>
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-black mb-1">Current Status</label>
//             <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${currentStatusInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'}`}>
//               {currentStatusInfo?.icon && <currentStatusInfo.icon className="w-3 h-3" />}
//               <span>{currentStatusInfo?.label || order?.orderStatus}</span>
//             </div>
//             {!canChange && order?.orderStatus !== 'delivered' && order?.orderStatus !== 'cancelled' && order?.orderStatus !== 'courier_assigned' && !['processing', 'shipped', 'out_for_delivery'].includes(order?.orderStatus) && (
//               <p className="text-xs text-[#64748B] mt-1">⚠️ No further status changes allowed for this order</p>
//             )}
//           </div>

//           {canChange && (
//             <>
//               <div>
//                 <label className="block text-xs font-medium text-black mb-1">Change Status To</label>
//                 <select
//                   value={selectedStatus}
//                   onChange={(e) => {
//                     setSelectedStatus(e.target.value);
//                     if (e.target.value !== 'cancelled' && e.target.value !== 'rejected') {
//                       setCancellationReason('');
//                       setRejectionReason('');
//                     }
//                   }}
//                   className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
//                 >
//                   <option value={order.orderStatus}>Current: {currentStatusInfo?.label}</option>
//                   {availableNextStatuses.map(statusValue => {
//                     const statusInfo = ORDER_STATUSES.find(s => s.value === statusValue);
//                     return (
//                       <option key={statusValue} value={statusValue}>
//                         → {statusInfo?.label}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>

//               {selectedStatus !== order.orderStatus && (
//                 <div className="bg-[#E2E7EA]/50 rounded-xl p-2 border border-[#82947A]/30">
//                   <p className="text-xs text-[#82947A]">
//                     <span className="font-medium">Will change to:</span> {selectedStatusInfo?.label}
//                   </p>
//                 </div>
//               )}

//               {/* ========== COURIER ASSIGNMENT SECTION ========== */}
//               {showCourierOption() && (
//                 <div className="bg-[#82947A]/10 border border-[#82947A]/30 rounded-xl p-3 space-y-3">
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       <FaTruck className="w-4 h-4 text-[#82947A]" />
//                       <label className="text-xs font-medium text-black">
//                         Select Courier Service <span className="text-red-500">*</span>
//                       </label>
//                     </div>
                    
//                     {loadingCouriers ? (
//                       <div className="flex items-center justify-center py-2">
//                         <FaSpinner className="w-4 h-4 animate-spin text-[#82947A]" />
//                         <span className="ml-2 text-xs text-[#64748B]">Loading couriers...</span>
//                       </div>
//                     ) : connectedCouriers.length === 0 ? (
//                       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs text-yellow-700">
//                         <FaInfoCircle className="inline w-3 h-3 mr-1" />
//                         No connected courier services found. Please configure courier settings first.
//                       </div>
//                     ) : (
//                       <select
//                         value={courierService}
//                         onChange={(e) => setCourierService(e.target.value)}
//                         className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
//                         required
//                       >
//                         <option value="">Select a courier...</option>
//                         {connectedCouriers.map((courier) => (
//                           <option key={courier.slug} value={courier.name}>
//                             {courier.name} {courier.integrationStatus?.lastTestOk ? '✅' : '⚠️'}
//                           </option>
//                         ))}
//                       </select>
//                     )}
                    
//                     {connectedCouriers.length > 0 && (
//                       <p className="text-xs text-[#82947A] mt-1">
//                         <FaCheckCircle className="inline w-3 h-3 mr-1" />
//                         {connectedCouriers.length} courier service(s) connected
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-black mb-1">
//                       Weight (kg) <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <FaWeightHanging className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
//                       <input
//                         type="number"
//                         value={weight}
//                         onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
//                         min="0.1"
//                         step="0.1"
//                         className="w-full pl-10 pr-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
//                         placeholder="Enter package weight"
//                       />
//                     </div>
//                     <p className="text-[10px] text-[#64748B] mt-1">
//                       Calculated from order items: {order?.items?.reduce((sum, item) => {
//                         const w = item.weight || item.itemWeight || 0.5;
//                         return sum + (w * (item.quantity || 1));
//                       }, 0).toFixed(1)} kg
//                     </p>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-black mb-1">
//                       Delivery Note (Optional)
//                     </label>
//                     <div className="relative">
//                       <FaFileAlt className="absolute left-3 top-3 text-[#64748B] w-4 h-4" />
//                       <textarea
//                         value={deliveryNote}
//                         onChange={(e) => setDeliveryNote(e.target.value)}
//                         rows="2"
//                         className="w-full pl-10 pr-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black placeholder:text-[#64748B] resize-none"
//                         placeholder="Add any delivery notes or special instructions..."
//                       />
//                     </div>
//                   </div>

//                   <div className="text-[10px] text-[#64748B] bg-blue-50 p-2 rounded-lg border border-blue-200">
//                     <FaInfoCircle className="inline w-3 h-3 text-blue-500 mr-1" />
//                     <span>This will create a delivery order with the selected courier service.</span>
//                   </div>
//                 </div>
//               )}

//               {/* ========== INFO BOX FOR COURIER ASSIGNED → DELIVERED/RETURNED ========== */}
//               {order?.orderStatus === 'courier_assigned' && (selectedStatus === 'delivered' || selectedStatus === 'returned' || selectedStatus === 'partial_delivery') && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
//                   <p className="text-xs text-[#82947A] flex items-center gap-2">
//                     <FaInfoCircle className="w-3.5 h-3.5" />
//                     This order is currently with courier. Marking as {selectedStatusInfo?.label} will update the order status.
//                   </p>
//                 </div>
//               )}

//               {/* ========== TERMINAL STATUS WARNING ========== */}
//               {(selectedStatus === 'delivered' || selectedStatus === 'returned' || selectedStatus === 'cancelled' || selectedStatus === 'rejected') && (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-2">
//                   <p className="text-[10px] text-red-600 flex items-center gap-1.5">
//                     <FaExclamationTriangle className="w-3 h-3" />
//                     <span>This is a <strong>final status</strong>. No further changes will be allowed after this.</span>
//                   </p>
//                 </div>
//               )}

//               {isCancelling && (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-3">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FaExclamationTriangle className="w-4 h-4 text-red-600" />
//                     <label className="text-xs font-medium text-black">
//                       Cancellation Reason <span className="text-red-500">*</span>
//                     </label>
//                   </div>
//                   <textarea
//                     value={cancellationReason}
//                     onChange={(e) => setCancellationReason(e.target.value)}
//                     rows="3"
//                     placeholder="Please provide a reason for cancellation..."
//                     className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black placeholder:text-[#64748B]"
//                     required
//                   />
//                   <p className="text-xs text-red-600 mt-1">This reason will be saved with the order</p>
//                 </div>
//               )}

//               {isRejecting && (
//                 <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FaTimesCircle className="w-4 h-4 text-orange-600" />
//                     <label className="text-xs font-medium text-black">
//                       Rejection Reason <span className="text-orange-500">*</span>
//                     </label>
//                   </div>
//                   <textarea
//                     value={rejectionReason}
//                     onChange={(e) => setRejectionReason(e.target.value)}
//                     rows="3"
//                     placeholder="Please provide a reason for rejection..."
//                     className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black placeholder:text-[#64748B]"
//                     required
//                   />
//                   <p className="text-xs text-orange-600 mt-1">This reason will be saved with the order</p>
//                 </div>
//               )}

//               {!isCourierAssign && (
//                 <div>
//                   <label className="block text-xs font-medium text-black mb-1">Order Delivery Note (Optional)</label>
//                   <textarea
//                     value={deliveryNote}
//                     onChange={(e) => setDeliveryNote(e.target.value)}
//                     rows="2"
//                     placeholder="Add any delivery notes or special instructions"
//                     className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black placeholder:text-[#64748B]"
//                   />
//                 </div>
//               )}

//               {isDelivered && order.paymentStatus !== 'paid' && (
//                 <div className="bg-[#82947A]/10 border border-[#82947A]/30 rounded-xl p-2">
//                   <p className="text-xs text-[#82947A] flex items-center gap-2">
//                     <FaCheckCircle className="w-3 h-3" />
//                     Payment status will be automatically updated to "Paid"
//                   </p>
//                 </div>
//               )}
//             </>
//           )}

//           {!canChange && order?.orderStatus === 'delivered' && (
//             <div className="bg-[#82947A]/10 border border-[#82947A]/30 rounded-xl p-3">
//               <p className="text-xs text-[#82947A] flex items-center gap-2">
//                 <FaCheckDouble className="w-4 h-4" />
//                 This order has been delivered. No further changes allowed.
//               </p>
//             </div>
//           )}

//           {!canChange && order?.orderStatus === 'cancelled' && (
//             <div className="bg-red-50 border border-red-200 rounded-xl p-3">
//               <p className="text-xs text-red-600 flex items-center gap-2">
//                 <FaBan className="w-4 h-4" />
//                 This order has been cancelled. No further changes allowed.
//               </p>
//             </div>
//           )}

//           {!canChange && order?.orderStatus === 'returned' && (
//             <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
//               <p className="text-xs text-purple-600 flex items-center gap-2">
//                 <FaUndo className="w-4 h-4" />
//                 This order has been returned. No further changes allowed.
//               </p>
//             </div>
//           )}

//           {!canChange && order?.orderStatus === 'rejected' && (
//             <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
//               <p className="text-xs text-orange-600 flex items-center gap-2">
//                 <FaTimesCircle className="w-4 h-4" />
//                 This order has been rejected. No further changes allowed.
//               </p>
//             </div>
//           )}

//           {!canChange && order?.orderStatus === 'courier_assigned' && (
//             <div className="bg-[#82947A]/10 border border-[#82947A]/30 rounded-xl p-3">
//               <p className="text-xs text-[#82947A] flex items-center gap-2">
//                 <FaTruck className="w-4 h-4" />
//                 This order has been assigned to courier.
//               </p>
//             </div>
//           )}

//           {!canChange && ['processing', 'shipped', 'out_for_delivery'].includes(order?.orderStatus) && (
//             <div className="bg-[#82947A]/10 border border-[#82947A]/30 rounded-xl p-3">
//               <p className="text-xs text-[#82947A] flex items-center gap-2">
//                 <FaShippingFast className="w-4 h-4" />
//                 This order is being handled by the courier service.
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading || !canChange || selectedStatus === order?.orderStatus}
//             className="flex-1 px-3 py-2 bg-gradient-to-r from-[#82947A] to-black text-white rounded-xl hover:shadow-lg hover:shadow-[#82947A]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//           >
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : 
//               isCourierAssign ? <FaTruck className="w-3 h-3" /> : <FaCheckCircle className="w-3 h-3" />
//             }
//             {isCourierAssign ? 'Create Delivery' : 'Update Status'}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== PAYMENT STATUS MODAL ==========
// // const PaymentStatusModal = ({ isOpen, onClose, order, onUpdate }) => {
// //   const [selectedStatus, setSelectedStatus] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (order) {
// //       setSelectedStatus(order.paymentStatus);
// //     }
// //   }, [order]);

// //   const handleSubmit = async () => {
// //     if (!selectedStatus) {
// //       toast.error('Please select a payment status');
// //       return;
// //     }

// //     if (selectedStatus === order.paymentStatus) {
// //       toast.error('Please select a different status');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch(`http://localhost:5000/api/orders/${order._id}/payment`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify({ paymentStatus: selectedStatus })
// //       });

// //       const data = await response.json();
// //       if (data.success) {
// //         toast.success(`Payment status updated to ${selectedStatus}`);
// //         onUpdate();
// //         onClose();
// //       } else {
// //         toast.error(data.error || 'Failed to update payment status');
// //       }
// //     } catch (error) {
// //       console.error('Payment status update error:', error);
// //       toast.error('Network error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const currentPaymentInfo = PAYMENT_STATUSES.find(p => p.value === order?.paymentStatus);
  
// //   const getAvailableStatuses = () => {
// //     const currentStatus = order?.paymentStatus;
// //     const orderStatus = order?.orderStatus;
// //     const paymentMethod = order?.paymentMethod;
    
// //     switch (currentStatus) {
// //       case 'pending':
// //         return PAYMENT_STATUSES.filter(status => 
// //           status.value === 'paid' || status.value === 'failed'
// //         );
// //       case 'failed':
// //         return PAYMENT_STATUSES.filter(status => 
// //           status.value === 'paid'
// //         );
// //       case 'paid':
// //         if (paymentMethod === 'cod') {
// //           if (orderStatus === 'cancelled') {
// //             return PAYMENT_STATUSES.filter(status => 
// //               status.value === 'refunded'
// //             );
// //           }
// //           return [];
// //         } else {
// //           return PAYMENT_STATUSES.filter(status => 
// //             status.value === 'refunded'
// //           );
// //         }
// //       case 'refunded':
// //         return [];
// //       default:
// //         return [];
// //     }
// //   };

// //   const availableStatuses = getAvailableStatuses();
// //   const canChange = availableStatuses.length > 0;

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
// //       <motion.div 
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         exit={{ opacity: 0, scale: 0.95 }}
// //         className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
// //       >
// //         <div className="p-4 bg-gradient-to-r from-[#82947A] to-black text-white">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-2">
// //               <FaMoneyBillWave className="w-5 h-5" />
// //               <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Update Payment Status</h2>
// //             </div>
// //             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
// //               <FaTimes className="w-4 h-4" />
// //             </button>
// //           </div>
// //           <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
// //         </div>

// //         <div className="p-4 space-y-3">
// //           <div>
// //             <label className="block text-xs font-medium text-black mb-1">Current Payment Status</label>
// //             <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${currentPaymentInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'}`}>
// //               <FaMoneyBillWave className="w-3 h-3" />
// //               <span>{currentPaymentInfo?.label || order?.paymentStatus}</span>
// //             </div>
// //             <div className="mt-1 text-xs text-[#64748B]">
// //               Order Status: <span className="font-medium text-black">{order?.orderStatus}</span> | 
// //               Payment Method: <span className="font-medium text-black">{order?.paymentMethod === 'cod' ? 'COD' : 'Online'}</span>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-xs font-medium text-black mb-1">Change Payment Status To</label>
// //             {canChange ? (
// //               <select
// //                 value={selectedStatus}
// //                 onChange={(e) => setSelectedStatus(e.target.value)}
// //                 className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
// //               >
// //                 <option value={order.paymentStatus}>Current: {currentPaymentInfo?.label}</option>
// //                 {availableStatuses.map(status => (
// //                   <option key={status.value} value={status.value}>
// //                     → {status.label}
// //                   </option>
// //                 ))}
// //               </select>
// //             ) : (
// //               <div className="px-3 py-1.5 text-sm bg-[#E2E7EA] text-[#64748B] rounded-xl border border-[#82947A]/30">
// //                 No further changes allowed
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
// //           <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleSubmit}
// //             disabled={loading || !canChange || selectedStatus === order?.paymentStatus}
// //             className="flex-1 px-3 py-2 bg-gradient-to-r from-[#82947A] to-black text-white rounded-xl hover:shadow-lg hover:shadow-[#82947A]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
// //           >
// //             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
// //             Update Payment
// //           </button>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// const PaymentStatusModal = ({ isOpen, onClose, order, onUpdate }) => {
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (order) {
//       setSelectedStatus(order.paymentStatus);
//     }
//   }, [order]);

//   const getAvailableStatuses = () => {
//     const currentStatus = order?.paymentStatus;
//     const orderStatus = order?.orderStatus;
//     const paymentMethod = order?.paymentMethod;
    
//     // ✅ If order is cancelled, no payment changes allowed
//     if (orderStatus === 'cancelled') {
//       return [];
//     }
    
//     // If order is delivered, only allow refund for non-COD orders
//     if (orderStatus === 'delivered') {
//       if (paymentMethod === 'cod') {
//         return []; // COD already auto-paid, no changes allowed
//       } else {
//         // Online payment - can only refund
//         return PAYMENT_STATUSES.filter(status => 
//           status.value === 'refunded'
//         );
//       }
//     }
    
//     switch (currentStatus) {
//       case 'pending':
//         return PAYMENT_STATUSES.filter(status => 
//           status.value === 'paid' || status.value === 'failed'
//         );
//       case 'failed':
//         return PAYMENT_STATUSES.filter(status => 
//           status.value === 'paid'
//         );
//       case 'paid':
//         if (paymentMethod === 'cod') {
//           if (orderStatus === 'cancelled') {
//             return PAYMENT_STATUSES.filter(status => 
//               status.value === 'refunded'
//             );
//           }
//           return [];
//         } else {
//           return PAYMENT_STATUSES.filter(status => 
//             status.value === 'refunded'
//           );
//         }
//       case 'refunded':
//         return [];
//       default:
//         return [];
//     }
//   };

//   const handleSubmit = async () => {
//     if (!selectedStatus) {
//       toast.error('Please select a payment status');
//       return;
//     }

//     if (selectedStatus === order.paymentStatus) {
//       toast.error('Please select a different status');
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/orders/${order._id}/payment`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ paymentStatus: selectedStatus })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(`Payment status updated to ${selectedStatus}`);
//         onUpdate();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to update payment status');
//       }
//     } catch (error) {
//       console.error('Payment status update error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const currentPaymentInfo = PAYMENT_STATUSES.find(p => p.value === order?.paymentStatus);
//   const availableStatuses = getAvailableStatuses();
//   const canChange = availableStatuses.length > 0 && order?.orderStatus !== 'cancelled';

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-[#82947A] to-black text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaMoneyBillWave className="w-5 h-5" />
//               <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Update Payment Status</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-4 space-y-3">
//           <div>
//             <label className="block text-xs font-medium text-black mb-1">Current Payment Status</label>
//             <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${currentPaymentInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'}`}>
//               <FaMoneyBillWave className="w-3 h-3" />
//               <span>{currentPaymentInfo?.label || order?.paymentStatus}</span>
//             </div>
//             <div className="mt-1 text-xs text-[#64748B]">
//               Order Status: <span className="font-medium text-black">{order?.orderStatus}</span> | 
//               Payment Method: <span className="font-medium text-black">{order?.paymentMethod === 'cod' ? 'COD' : 'Online'}</span>
//             </div>
//           </div>

//           {/* ✅ Warning message for cancelled orders */}
//           {order?.orderStatus === 'cancelled' && (
//             <div className="bg-red-50 border border-red-200 rounded-xl p-3">
//               <p className="text-xs text-red-600 flex items-center gap-2">
//                 <FaBan className="w-4 h-4" />
//                 This order is <strong>cancelled</strong>. Payment status cannot be changed.
//               </p>
//             </div>
//           )}

//           <div>
//             <label className="block text-xs font-medium text-black mb-1">Change Payment Status To</label>
//             {canChange ? (
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
//               >
//                 <option value={order.paymentStatus}>Current: {currentPaymentInfo?.label}</option>
//                 {availableStatuses.map(status => (
//                   <option key={status.value} value={status.value}>
//                     → {status.label}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <div className="px-3 py-1.5 text-sm bg-[#E2E7EA] text-[#64748B] rounded-xl border border-[#82947A]/30">
//                 {order?.orderStatus === 'cancelled' 
//                   ? 'Payment cannot be changed for cancelled orders' 
//                   : 'No further changes allowed'}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading || !canChange || selectedStatus === order?.paymentStatus || order?.orderStatus === 'cancelled'}
//             className="flex-1 px-3 py-2 bg-gradient-to-r from-[#82947A] to-black text-white rounded-xl hover:shadow-lg hover:shadow-[#82947A]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//           >
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
//             Update Payment
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER DETAILS MODAL ==========
// const OrderDetailsModal = ({ isOpen, onClose, order, onStatusUpdate, onPaymentUpdate, onDownloadInvoice }) => {
//   const [downloading, setDownloading] = useState(false);

//   if (!isOpen || !order) return null;

//   const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
//   const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
  
//   // Check if status can be changed
//   const terminalStatuses = ['cancelled', 'delivered', 'returned', 'rejected'];
//   const canChangeStatus = !terminalStatuses.includes(order.orderStatus) && 
//                           order.orderStatus !== 'courier_assigned' &&
//                           !['processing', 'shipped', 'out_for_delivery'].includes(order.orderStatus);
  
//   const isCancelled = order.orderStatus === 'cancelled';
//   const isDelivered = order.orderStatus === 'delivered';
//   const isCourierAssigned = order.orderStatus === 'courier_assigned';
//   const isRejected = order.orderStatus === 'rejected';
//   const isReturned = order.orderStatus === 'returned';
//   const isPartialDelivery = order.orderStatus === 'partial_delivery';

//   const handleDownload = async () => {
//     setDownloading(true);
//     try {
//       await onDownloadInvoice(order);
//       toast.success('Invoice downloaded successfully!');
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.error('Failed to download invoice');
//     } finally {
//       setDownloading(false);
//     }
//   };

//   const getDeviceIcon = (deviceType) => {
//     switch(deviceType?.toLowerCase()) {
//       case 'mobile': return <FaMobile className="w-3.5 h-3.5" />;
//       case 'tablet': return <FaTablet className="w-3.5 h-3.5" />;
//       case 'desktop': return <FaDesktop className="w-3.5 h-3.5" />;
//       default: return <FaLaptop className="w-3.5 h-3.5" />;
//     }
//   };

//   const getDeviceInfo = (deviceInfo) => {
//     if (!deviceInfo) return null;
//     const parts = [];
//     if (deviceInfo.deviceType) parts.push(deviceInfo.deviceType);
//     if (deviceInfo.browser) parts.push(deviceInfo.browser);
//     if (deviceInfo.os) parts.push(deviceInfo.os);
//     return parts.join(' • ');
//   };

//   const getGroupedItems = () => {
//     if (!order.items) return [];
//     const grouped = {};
//     order.items.forEach(item => {
//       const key = item.productId.toString();
//       if (!grouped[key]) {
//         grouped[key] = {
//           ...item,
//           colors: []
//         };
//       }
//       if (item.colors && item.colors.length > 0) {
//         item.colors.forEach(colorObj => {
//           grouped[key].colors.push({
//             color: colorObj.color,
//             quantity: colorObj.quantity,
//             price: colorObj.price || item.discountPrice || item.regularPrice
//           });
//         });
//       } else if (item.selectedColor) {
//         grouped[key].colors.push({
//           color: item.selectedColor,
//           quantity: item.quantity,
//           price: item.discountPrice || item.regularPrice
//         });
//       } else {
//         grouped[key].colors.push({
//           color: null,
//           quantity: item.quantity,
//           price: item.discountPrice || item.regularPrice
//         });
//       }
//     });
//     return Object.values(grouped);
//   };

//   const groupedItems = getGroupedItems();

//   const getStatusNotes = () => {
//     if (!order.statusHistory || order.statusHistory.length === 0) {
//       return [];
//     }
//     const notes = order.statusHistory
//       .filter(entry => entry.note && entry.note.trim() !== '')
//       .map(entry => {
//         let userEmail = null;
//         let userName = null;
//         if (entry.updatedBy) {
//           if (typeof entry.updatedBy === 'object') {
//             userEmail = entry.updatedBy.email || null;
//             userName = entry.updatedBy.contactPerson || entry.updatedBy.name || null;
//           }
//         }
//         return {
//           status: entry.status,
//           note: entry.note,
//           timestamp: entry.timestamp,
//           updatedByRole: entry.updatedByRole || 'system',
//           updatedByEmail: userEmail,
//           updatedByName: userName
//         };
//       });
//     return notes;
//   };

//   const statusNotes = getStatusNotes();

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-[#82947A] to-[#708268] text-white sticky top-0 z-10">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFileInvoice className="w-5 h-5" />
//               <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Order Details</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-5 max-h-[60vh] overflow-y-auto">
//           <div className="flex flex-wrap gap-2 mb-5">
//             <button
//               onClick={() => {
//                 onClose();
//                 canChangeStatus && onStatusUpdate();
//               }}
//               className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border transition-all ${statusInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'} ${canChangeStatus ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
//               title={canChangeStatus ? 'Click to update status' : 'Status cannot be changed'}
//             >
//               {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
//               <span className="font-medium">Order: {statusInfo?.label || order.orderStatus}</span>
//               {canChangeStatus && <FaEdit className="w-2.5 h-2.5 ml-1" />}
//             </button>
//             <button
//               onClick={() => {
//                 onClose();
//                 onPaymentUpdate();
//               }}
//               className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border transition-all ${paymentInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'} cursor-pointer hover:opacity-80`}
//               title="Click to update payment status"
//             >
//               <FaMoneyBillWave className="w-3 h-3" />
//               <span className="font-medium">Payment: {paymentInfo?.label || order.paymentStatus}</span>
//               <FaEdit className="w-2.5 h-2.5 ml-1" />
//             </button>
//             <button
//               onClick={handleDownload}
//               disabled={downloading}
//               className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border bg-[#E2E7EA] text-[#82947A] border-[#82947A]/30 hover:bg-white transition-colors disabled:opacity-50"
//             >
//               {downloading ? (
//                 <FaSpinner className="w-3 h-3 animate-spin" />
//               ) : (
//                 <FaDownload className="w-3 h-3" />
//               )}
//               Invoice
//             </button>
//           </div>

//           {order.deviceInfo && (
//             <div className="mb-5 bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
//               <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
//                 <FaGlobe className="w-3.5 h-3.5 text-[#82947A]" />
//                 Device & Location Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">IP Address:</span>
//                   <span className="font-mono text-black">{order.deviceInfo.ipAddress || 'N/A'}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Device:</span>
//                   <span className="flex items-center gap-1 text-black">
//                     {getDeviceIcon(order.deviceInfo.deviceType)}
//                     {getDeviceInfo(order.deviceInfo) || 'N/A'}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Browser:</span>
//                   <span className="text-black">{order.deviceInfo.browser || 'N/A'} {order.deviceInfo.browserVersion || ''}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">OS:</span>
//                   <span className="text-black">{order.deviceInfo.os || 'N/A'} {order.deviceInfo.osVersion || ''}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Screen:</span>
//                   <span className="text-black">{order.deviceInfo.screenResolution || 'N/A'}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Connection:</span>
//                   <span className="text-black">{order.deviceInfo.connectionType || 'N/A'}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Timezone:</span>
//                   <span className="text-black">{order.deviceInfo.timezone || 'N/A'}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Language:</span>
//                   <span className="text-black">{order.deviceInfo.language || 'N/A'}</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isDelivered && order.deliveredAt && (
//             <div className="mb-5 bg-[#82947A]/10 border-l-4 border-[#82947A] rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaCheckDouble className="w-4 h-4 text-[#82947A] mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-[#82947A]">Order Delivered</h4>
//                   <p className="text-xs text-[#82947A]/80 mt-1">
//                     <span className="font-medium">Delivered on:</span> {new Date(order.deliveredAt).toLocaleDateString('en-BD', {
//                       day: '2-digit',
//                       month: 'long',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isPartialDelivery && (
//             <div className="mb-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaCheckDouble className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-yellow-700">Partial Delivery</h4>
//                   <p className="text-xs text-yellow-600 mt-1">
//                     Only part of this order has been delivered.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isCancelled && order.cancellationReason && (
//             <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaExclamationTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
//                   <p className="text-xs text-red-600 mt-1">
//                     <span className="font-medium">Reason:</span> {order.cancellationReason}
//                   </p>
//                   {order.cancelledAt && (
//                     <p className="text-xs text-red-500 mt-1">
//                       <span className="font-medium">Cancelled on:</span> {new Date(order.cancelledAt).toLocaleDateString('en-BD', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {isRejected && order.rejectionReason && (
//             <div className="mb-5 bg-orange-50 border-l-4 border-orange-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaTimesCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-orange-700">Order Rejected</h4>
//                   <p className="text-xs text-orange-600 mt-1">
//                     <span className="font-medium">Reason:</span> {order.rejectionReason}
//                   </p>
//                   {order.cancelledAt && (
//                     <p className="text-xs text-orange-500 mt-1">
//                       <span className="font-medium">Rejected on:</span> {new Date(order.cancelledAt).toLocaleDateString('en-BD', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {isReturned && (
//             <div className="mb-5 bg-purple-50 border-l-4 border-purple-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaUndo className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-purple-700">Order Returned</h4>
//                   <p className="text-xs text-purple-600 mt-1">
//                     This order has been returned.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isCourierAssigned && order.deliveryService && (
//             <div className="mb-5 bg-[#82947A]/10 border-l-4 border-[#82947A] rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaTruck className="w-4 h-4 text-[#82947A] mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-[#82947A]">Courier Assigned</h4>
//                   <p className="text-xs text-[#82947A]/80 mt-1">
//                     <span className="font-medium">Courier:</span> {order.deliveryService.courierName || 'N/A'}
//                   </p>
//                   {order.deliveryService.trackingNumber && (
//                     <p className="text-xs text-[#82947A]/80 mt-1">
//                       <span className="font-medium">Tracking:</span> {order.deliveryService.trackingNumber}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
//               <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-[#82947A]" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#64748B]">Name:</span> <span className="text-black font-medium">{order.customerInfo?.fullName}</span></p>
//                 <p><span className="text-[#64748B]">Email:</span> <span className="text-black">{order.customerInfo?.email}</span></p>
//                 <p><span className="text-[#64748B]">Phone:</span> <span className="text-black">{order.customerInfo?.phone}</span></p>
//                 {order.customerInfo?.note && (
//                   <p><span className="text-[#64748B]">Note:</span> <span className="text-black">{order.customerInfo.note}</span></p>
//                 )}
//               </div>
//             </div>

//             <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
//               <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#82947A]" />
//                 Delivery Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#64748B]">Division:</span> <span className="font-medium text-black">{order.customerInfo?.division || 'N/A'}</span></p>
//                 <p><span className="text-[#64748B]">District/City:</span> <span className="font-medium text-black">{order.customerInfo?.city || 'N/A'}</span></p>
//                 <p><span className="text-[#64748B]">Upazila/Thana:</span> <span className="font-medium text-black">{order.customerInfo?.zone || 'N/A'}</span></p>
//                 {order.customerInfo?.area && (
//                   <p><span className="text-[#64748B]">Union/Area:</span> <span className="font-medium text-black">{order.customerInfo.area}</span></p>
//                 )}
//                 <p><span className="text-[#64748B]">Address:</span> <span className="text-black">{order.customerInfo?.address}</span></p>
//                 {order.trackingNumber && (
//                   <p><span className="text-[#64748B]">Tracking:</span> <span className="font-mono text-[#82947A]">{order.trackingNumber}</span></p>
//                 )}
//                 {order.deliveryService?.trackingUrl && (
//                   <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#82947A]/20">
//                     <span className="text-[#64748B]">Track Link:</span>
//                     <a
//                       href={order.deliveryService.trackingUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#82947A] hover:underline flex items-center gap-1"
//                     >
//                       <FaExternalLinkAlt className="w-3 h-3" />
//                       Track on {order.deliveryService.courierName || 'Courier'}
//                     </a>
//                   </div>
//                 )}
//                 {order.deliveryNote && (
//                   <p><span className="text-[#64748B]">Order Note:</span> <span className="text-black">{order.deliveryNote}</span></p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="mb-5">
//             <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
//               <FaBox className="w-3.5 h-3.5 text-[#82947A]" />
//               Order Items
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs">
//                 <thead className="bg-[#E2E7EA]">
//                   <tr>
//                     <th className="px-2 py-1.5 text-left text-black">Product</th>
//                     <th className="px-2 py-1.5 text-center text-black">Color</th>
//                     <th className="px-2 py-1.5 text-center text-black">Qty</th>
//                     <th className="px-2 py-1.5 text-right text-black">Price</th>
//                     <th className="px-2 py-1.5 text-right text-black">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {groupedItems.map((group, idx) => {
//                     const hasMultipleColors = group.colors && group.colors.length > 1;
                    
//                     return group.colors.map((colorObj, colorIdx) => {
//                       const isFirst = colorIdx === 0;
//                       const price = colorObj.price || group.discountPrice || group.regularPrice;
//                       const totalPrice = price * colorObj.quantity;
                      
//                       return (
//                         <tr key={`${idx}-${colorIdx}`} className="border-t border-[#82947A]/20">
//                           {isFirst && (
//                             <td className="px-2 py-2" rowSpan={hasMultipleColors ? group.colors.length : 1}>
//                               <div className="flex items-center gap-2">
//                                 <img 
//                                   src={group.image || 'https://via.placeholder.com/30'} 
//                                   alt={group.productName}
//                                   className="w-7 h-7 rounded object-cover border border-[#82947A]/30"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                                 />
//                                 <p className="font-medium text-xs text-black">{group.productName}</p>
//                               </div>
//                             </td>
//                           )}
//                           <td className="px-2 py-2 text-center">
//                             {colorObj.color ? (
//                               <div className="flex items-center justify-center">
//                                 <div 
//                                   className="w-5 h-5 rounded-full border border-[#82947A]/30 shadow-sm"
//                                   style={{ backgroundColor: colorObj.color }}
//                                   title={colorObj.color}
//                                 />
//                               </div>
//                             ) : (
//                               <span className="text-xs text-[#64748B]">-</span>
//                             )}
//                           </td>
//                           <td className="px-2 py-2 text-center text-black">{colorObj.quantity}</td>
//                           <td className="px-2 py-2 text-right text-black">৳{price.toFixed(2)}</td>
//                           <td className="px-2 py-2 text-right font-medium text-[#82947A]">৳{totalPrice.toFixed(2)}</td>
//                         </tr>
//                       );
//                     });
//                   })}
//                 </tbody>
//                 <tfoot className="border-t border-[#82947A]/30">
//                   <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-black">Subtotal:</td><td className="px-2 py-1 text-right text-black">৳{order.subtotal?.toFixed(2)}</td></tr>
//                   <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-black">Shipping:</td><td className="px-2 py-1 text-right text-black">৳{order.shippingCost?.toFixed(2)}</td></tr>
//                   {order.discount > 0 && (
//                     <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-green-600">Discount:</td><td className="px-2 py-1 text-right text-green-600">- ৳{order.discount.toFixed(2)}</td></tr>
//                   )}
//                   <tr className="text-sm font-bold">
//                     <td colSpan="4" className="px-2 py-1 text-right text-black">Total:</td>
//                     <td className="px-2 py-1 text-right text-[#82947A]">৳{order.total?.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//           <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
//             <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
//               <FaInfoCircle className="w-3.5 h-3.5 text-[#82947A]" />
//               Additional Information
//             </h3>
            
//             {order.couponCode && (
//               <div className="mb-2">
//                 <p className="text-xs">
//                   <span className="text-[#64748B]">Coupon Applied:</span> 
//                   <span className="text-[#82947A] font-medium ml-1">{order.couponCode}</span>
//                 </p>
//               </div>
//             )}

//             {order.deliveryNote && (
//               <div className="mb-2">
//                 <p className="text-xs">
//                   <span className="text-[#64748B]">Order Note:</span>
//                   <span className="text-black font-medium ml-1 whitespace-pre-wrap">{order.deliveryNote}</span>
//                 </p>
//               </div>
//             )}

//             {statusNotes.length > 0 && (
//               <div>
//                 <p className="text-xs font-medium text-black mb-1.5 flex items-center gap-1">
//                   <FaClipboardList className="w-3 h-3 text-[#82947A]" />
//                   Status History Notes
//                 </p>
//                 <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">
//                   {statusNotes.map((note, index) => {
//                     const statusLabel = ORDER_STATUSES.find(s => s.value === note.status)?.label || note.status;
//                     const formattedDate = note.timestamp ? new Date(note.timestamp).toLocaleString('en-BD', {
//                       day: '2-digit',
//                       month: 'short',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     }) : '';
                    
//                     let updatedByDisplay = 'System';
//                     if (note.updatedByEmail) {
//                       updatedByDisplay = note.updatedByEmail;
//                     } else if (note.updatedByName) {
//                       updatedByDisplay = note.updatedByName;
//                     } else if (note.updatedByRole && note.updatedByRole !== 'system') {
//                       updatedByDisplay = note.updatedByRole;
//                     }
                    
//                     return (
//                       <div key={index} className="bg-white rounded-lg p-2 border border-[#82947A]/20">
//                         <div className="flex items-center justify-between gap-2">
//                           <span className="text-xs font-medium text-black">
//                             {statusLabel}
//                           </span>
//                           <span className="text-[10px] text-[#64748B]">
//                             {formattedDate}
//                           </span>
//                         </div>
//                         <p className="text-xs text-[#64748B] mt-0.5 break-words">
//                           {note.note}
//                         </p>
//                         {updatedByDisplay && (
//                           <span className="text-[10px] text-[#64748B]/60 mt-0.5 block">
//                             Updated by: {updatedByDisplay}
//                           </span>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {!order.couponCode && !order.deliveryNote && statusNotes.length === 0 && (
//               <p className="text-xs text-[#64748B]">No additional information available</p>
//             )}
//           </div>
//         </div>

//         <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex justify-end gap-2">
         
//           <button onClick={onClose} className="px-3 py-1.5 bg-gradient-to-r from-[#82947A] to-[#708268] text-white rounded-xl hover:shadow-lg hover:shadow-[#82947A]/25 transition-all text-sm">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };


// // ========== EDIT ORDER MODAL ==========
// const EditOrderModal = ({ isOpen, onClose, order, onUpdate, userRole }) => {
//   // ========== LOCAL ORDER STATE ==========
//   const [localOrder, setLocalOrder] = useState(null);
//   const [localItems, setLocalItems] = useState([]);
//   const [localDiscount, setLocalDiscount] = useState(0);
//   const [localSubtotal, setLocalSubtotal] = useState(0);
//   const [localTotal, setLocalTotal] = useState(0);
//   const [shippingCost, setShippingCost] = useState(0);
//   const [hasChanges, setHasChanges] = useState(false);

//   // ========== CUSTOMER INFO STATE ==========
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     division: '',
//     address: '',
//     city: '',
//     zone: '',
//     area: '',
//     deliveryNote: '',
//     discountNote: ''
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [locationData, setLocationData] = useState({});
//   const [divisions, setDivisions] = useState({});
//   const [divisionList, setDivisionList] = useState([]);
//   const [citiesByDivision, setCitiesByDivision] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [locationLoading, setLocationLoading] = useState(true);

//   // ========== PRODUCT SEARCH STATE ==========
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searching, setSearching] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedColorsWithQty, setSelectedColorsWithQty] = useState([]);
//   const [showAddProduct, setShowAddProduct] = useState(false);
//   const [addingProduct, setAddingProduct] = useState(false);
//   const [removingItem, setRemovingItem] = useState(null);
//   const [addQuantity, setAddQuantity] = useState(1);
  
//   // ========== PRODUCT COLORS CACHE ==========
//   const [productColorsCache, setProductColorsCache] = useState({});
  
//   // ========== CONFIRMATION MODAL STATE ==========
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [confirmConfig, setConfirmConfig] = useState({
//     title: '',
//     message: '',
//     onConfirm: null,
//     confirmText: 'Confirm',
//     cancelText: 'Cancel',
//     type: 'warning'
//   });
  
//   // ========== CHECK PERMISSIONS ==========
//   const isSuperAdmin = userRole === 'super_admin';
//   const isAdmin = userRole === 'admin';
//   const isModerator = userRole === 'moderator';
//   const isAdminOrSuperAdmin = isSuperAdmin || isAdmin;

//   // ===== PERMISSION MATRIX =====
//   const canEditSensitiveInfo = isSuperAdmin || isAdmin;
//   const canEditEmail = isSuperAdmin;
//   const canEditAddress = isAdminOrSuperAdmin || isModerator;
//   const canEditDeliveryNote = isAdminOrSuperAdmin || isModerator;
//   const canEditProducts = isAdminOrSuperAdmin || isModerator;
//   const canEditDiscount = isAdminOrSuperAdmin || isModerator;
  
//   // ========== CHECK IF ORDER IS EDITABLE ==========
//   const nonEditableStatuses = [
//     'courier_assigned',
//     'ready_to_ship',
//     'shipped',
//     'out_for_delivery',
//     'delivered',
//     'cancelled',
//     'rejected',
//     'refunded',
//     'returned',
//     'partial_delivery'
//   ];
  
//   const isEditable = order && 
//     !nonEditableStatuses.includes(order.orderStatus) && 
//     (isAdminOrSuperAdmin || isModerator);

//   // ========== RECALCULATE TOTALS ==========
//   const recalculateTotals = useCallback((items, discount) => {
//     const subtotal = items.reduce((sum, item) => {
//       const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//       return sum + (price * item.quantity);
//     }, 0);
    
//     const shipping = order?.shippingCost || 0;
//     const total = subtotal + shipping - (discount || 0);
    
//     return { subtotal, shipping, total };
//   }, [order]);

//   // ========== UPDATE LOCAL TOTALS ==========
//   const updateTotals = useCallback(() => {
//     const { subtotal, shipping, total } = recalculateTotals(localItems, localDiscount);
//     setLocalSubtotal(subtotal);
//     setShippingCost(shipping);
//     setLocalTotal(total);
//   }, [localItems, localDiscount, recalculateTotals]);

//   // ========== HELPER: GET REMAINING STOCK FOR A PRODUCT COLOR ==========
//   const getRemainingStock = useCallback((productId, currentItemId) => {
//     const currentItem = localItems.find(i => i._id === currentItemId);
//     if (!currentItem) return 0;

//     // Calculate total quantity used by all other items of the same product
//     const usedByOthers = localItems
//       .filter(
//         i =>
//           i.productId === productId &&
//           i._id !== currentItemId
//       )
//       .reduce((sum, i) => sum + Number(i.quantity || 0), 0);

//     return Math.max(0, currentItem.stockQuantity - usedByOthers);
//   }, [localItems]);

//   // ========== HELPER: GET TOTAL QUANTITY USED FOR A PRODUCT ==========
//   const getTotalUsedQuantity = useCallback((productId, excludeItemId = null) => {
//     return localItems
//       .filter(i => 
//         i.productId === productId && 
//         (excludeItemId ? i._id !== excludeItemId : true)
//       )
//       .reduce((sum, i) => sum + Number(i.quantity || 0), 0);
//   }, [localItems]);

//   // ========== FETCH PRODUCT COLORS ==========
//   const fetchProductColors = useCallback(async (productId) => {
//     if (productColorsCache[productId]) {
//       return productColorsCache[productId];
//     }
    
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`);
//       const data = await response.json();
//       if (data.success && data.data.product.colors) {
//         const colors = data.data.product.colors;
//         setProductColorsCache(prev => ({
//           ...prev,
//           [productId]: colors
//         }));
//         return colors;
//       }
//       return [];
//     } catch (error) {
//       console.error('Error fetching product colors:', error);
//       return [];
//     }
//   }, [productColorsCache]);

//   // ========== FLATTEN ORDER ITEMS FOR EDIT MODAL ==========
//   const flattenOrderItems = useCallback((items) => {
//     const flattenedItems = [];
    
//     items.forEach(item => {
//       // Check if item has colors array (from checkout)
//       if (item.colors && item.colors.length > 0) {
//         // Flatten each color into separate item
//         item.colors.forEach(colorItem => {
//           flattenedItems.push({
//             ...item,
//             // Generate a unique ID for each color variant
//             _id: `${item._id || item.productId}_${colorItem.color}_${Date.now()}`,
//             quantity: colorItem.quantity,
//             selectedColor: colorItem.color,
//             // Remove the colors array since we're flattening
//             colors: []
//           });
//         });
//       } else {
//         // If no colors array, keep as is
//         flattenedItems.push({
//           ...item,
//           _id: item._id || `temp_${Date.now()}_${Math.random()}`
//         });
//       }
//     });
    
//     return flattenedItems;
//   }, []);

//   // ========== RESET MODAL STATE ==========
//   const resetModal = useCallback(() => {
//     setLocalItems([]);
//     setLocalDiscount(0);
//     setLocalSubtotal(0);
//     setLocalTotal(0);
//     setShippingCost(0);
//     setHasChanges(false);
//     setLocalOrder(null);
//     setSelectedColorsWithQty([]);
//     setShowAddProduct(false);
//     setSearchQuery('');
//     setSearchResults([]);
//     setSelectedProduct(null);
//     setAddQuantity(1);
//     setProductColorsCache({});
//   }, []);

//   // ========== INITIALIZE LOCAL STATE FROM ORDER ==========
//   useEffect(() => {
//     if (order && isOpen) {
//       // Don't re-initialize if we already have changes
//       if (hasChanges) return;
      
//       // Flatten the order items to handle color-wise quantities
//       const flattenedItems = flattenOrderItems(order.items);
      
//       setLocalOrder({ ...order });
//       setLocalItems(flattenedItems);
//       setLocalDiscount(order.discount || 0);
      
//       const { subtotal, shipping, total } = recalculateTotals(flattenedItems, order.discount || 0);
//       setLocalSubtotal(subtotal);
//       setShippingCost(shipping);
//       setLocalTotal(total);
      
//       setHasChanges(false);
      
//       setFormData({
//         fullName: order.customerInfo?.fullName || '',
//         email: order.customerInfo?.email || '',
//         phone: order.customerInfo?.phone || '',
//         division: order.customerInfo?.division || '',
//         address: order.customerInfo?.address || '',
//         city: order.customerInfo?.city || '',
//         zone: order.customerInfo?.zone || '',
//         area: order.customerInfo?.area || '',
//         deliveryNote: order.deliveryNote || '',
//         discountNote: ''
//       });
      
//       setSelectedColorsWithQty([]);
//       setShowAddProduct(false);
//       setSearchQuery('');
//       setSearchResults([]);
//       setSelectedProduct(null);
//       setAddQuantity(1);
      
//       // Fetch colors for all products in the order
//       const uniqueProductIds = [...new Set(flattenedItems.map(item => item.productId))];
//       uniqueProductIds.forEach(productId => {
//         fetchProductColors(productId);
//       });
//     }
//   }, [order, isOpen, recalculateTotals, fetchProductColors, flattenOrderItems, hasChanges]);

//   // Update totals when items or discount change
//   useEffect(() => {
//     updateTotals();
//   }, [localItems, localDiscount, updateTotals]);

//   // ========== SEARCH PRODUCTS ==========
//   const searchProducts = useCallback(async (query) => {
//     if (!query || query.length < 1) {
//       setSearchResults([]);
//       return;
//     }

//     setSearching(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `http://localhost:5000/api/orders/search-products?query=${encodeURIComponent(query)}&limit=10`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setSearchResults(data.data);
//       } else {
//         setSearchResults([]);
//       }
//     } catch (error) {
//       console.error('Search products error:', error);
//       setSearchResults([]);
//     } finally {
//       setSearching(false);
//     }
//   }, []);

//   // Debounced search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchQuery) {
//         searchProducts(searchQuery);
//       } else {
//         setSearchResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery, searchProducts]);

//   // ========== FETCH LOCATIONS ==========
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch('/api/locations');
//         const data = await response.json();
//         setLocationData(data.locationData || {});
        
//         const divisions = data.divisions || {};
//         const filteredDivisions = {};
//         const divisionKeys = [];
        
//         Object.keys(divisions).forEach(key => {
//           if (key !== 'Other') {
//             filteredDivisions[key] = divisions[key];
//             divisionKeys.push(key);
//           }
//         });
        
//         setDivisions(filteredDivisions);
//         setDivisionList(divisionKeys.sort());
//         setLocationLoading(false);
//       } catch (error) {
//         console.error('Failed to load location data:', error);
//         setLocationLoading(false);
//       }
//     };
//     fetchLocations();
//   }, []);

//   useEffect(() => {
//     if (formData.division && divisions[formData.division]) {
//       setCitiesByDivision(divisions[formData.division]);
//       setZones([]);
//       setAreas([]);
//     } else {
//       setCitiesByDivision([]);
//     }
//   }, [formData.division, divisions]);

//   useEffect(() => {
//     const selectedCity = formData.city;
//     if (selectedCity && locationData[selectedCity]) {
//       const availableZones = Object.keys(locationData[selectedCity].zones || {});
//       setZones(availableZones);
//       setAreas([]);
//     } else {
//       setZones([]);
//       setAreas([]);
//     }
//   }, [formData.city, locationData]);

//   useEffect(() => {
//     const selectedCity = formData.city;
//     const selectedZone = formData.zone;
//     if (selectedCity && selectedZone && locationData[selectedCity]) {
//       const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
//       setAreas(availableAreas);
//     } else {
//       setAreas([]);
//     }
//   }, [formData.zone, formData.city, locationData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     setHasChanges(true);
    
//     if (name === 'division') {
//       setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
//       setZones([]);
//       setAreas([]);
//     }
//     if (name === 'city') {
//       setFormData(prev => ({ ...prev, zone: '', area: '' }));
//       setAreas([]);
//     }
//     if (name === 'zone') {
//       setFormData(prev => ({ ...prev, area: '' }));
//     }
//   };

//   // ========== TOGGLE COLOR SELECTION ==========
//   const toggleColorSelection = (color) => {
//     setHasChanges(true);
//     setSelectedColorsWithQty(prev => {
//       const exists = prev.find(c => c.color === color);
//       if (exists) {
//         return prev.filter(c => c.color !== color);
//       } else {
//         return [...prev, { color, quantity: 1 }];
//       }
//     });
//   };

//   // ========== UPDATE QUANTITY FOR A SELECTED COLOR (PRODUCT-LEVEL STOCK) ==========
//   const updateSelectedColorQuantity = (color, newQuantity) => {
//     if (newQuantity < 1) return;
    
//     // Calculate total quantity already selected for this product (excluding current color)
//     const totalSelectedOthers = selectedColorsWithQty
//       .filter(c => c.color !== color)
//       .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
    
//     const totalWithNew = totalSelectedOthers + newQuantity;
    
//     // Check if total exceeds stock
//     if (selectedProduct && totalWithNew > selectedProduct.stockQuantity) {
//       toast.warning(`Total quantity (${totalWithNew}) cannot exceed available stock (${selectedProduct.stockQuantity}).`);
//       return;
//     }
    
//     setHasChanges(true);
//     setSelectedColorsWithQty(prev => 
//       prev.map(c => 
//         c.color === color ? { ...c, quantity: newQuantity } : c
//       )
//     );
//   };

//   // ========== HANDLE QUANTITY INPUT CHANGE FOR SELECTED COLORS (PRODUCT-LEVEL STOCK) ==========
//   const handleColorQuantityInputChange = (color, value) => {
//     if (value === '') {
//       setSelectedColorsWithQty(prev => 
//         prev.map(c => 
//           c.color === color ? { ...c, quantity: '' } : c
//         )
//       );
//       return;
//     }
    
//     let qty = parseInt(value);
//     if (isNaN(qty)) return;
    
//     qty = Math.max(1, qty);
    
//     // Calculate total quantity already selected for this product (excluding current color)
//     const totalSelectedOthers = selectedColorsWithQty
//       .filter(c => c.color !== color)
//       .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
    
//     const maxAllowed = selectedProduct ? selectedProduct.stockQuantity - totalSelectedOthers : Infinity;
    
//     if (qty > maxAllowed) {
//       toast.warning(`Only ${maxAllowed} more item(s) can be assigned to this color.`);
//       qty = Math.max(1, maxAllowed);
//     }
    
//     setSelectedColorsWithQty(prev => 
//       prev.map(c => 
//         c.color === color ? { ...c, quantity: qty } : c
//       )
//     );
//     setHasChanges(true);
//   };

//   // ========== GROUP ITEMS BY PRODUCT ==========
//   const getGroupedItems = useCallback(() => {
//     if (!localItems || localItems.length === 0) return [];
    
//     const grouped = {};
//     localItems.forEach(item => {
//       const key = item.productId.toString();
//       if (!grouped[key]) {
//         grouped[key] = {
//           productId: item.productId,
//           productName: item.productName,
//           productSlug: item.productSlug || '',
//           image: item.image || '',
//           regularPrice: item.regularPrice,
//           discountPrice: item.discountPrice || 0,
//           costPerItem: item.costPerItem || 0,
//           buyingPrice: item.buyingPrice || 0,
//           unit: item.unit || 'pcs',
//           stockQuantity: item.stockQuantity || 0,
//           colors: [],
//           totalQuantity: 0
//         };
//       }
//       const hasColor = item.selectedColor && item.selectedColor !== 'null' && item.selectedColor !== '';
//       grouped[key].colors.push({
//         color: hasColor ? item.selectedColor : null,
//         quantity: item.quantity,
//         itemId: item._id,
//         price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice,
//         stockQuantity: item.stockQuantity || 0,
//         isTempItem: item._id?.startsWith('temp_'),
//         productName: item.productName,
//         image: item.image
//       });
//       grouped[key].totalQuantity += item.quantity;
//     });
//     return Object.values(grouped);
//   }, [localItems]);

//   const groupedItems = getGroupedItems();

//   // ========== ADD PRODUCT TO LOCAL ORDER (WITH PRODUCT-LEVEL STOCK VALIDATION) ==========
//   const handleAddProduct = async () => {
//     if (!selectedProduct) {
//       toast.error('Please select a product');
//       return;
//     }

//     const hasColors = selectedProduct.colors && selectedProduct.colors.length > 0;
    
//     if (hasColors && selectedColorsWithQty.length === 0) {
//       toast.error('Please select at least one color with quantity');
//       return;
//     }

//     if (!hasColors && addQuantity < 1) {
//       toast.error('Please enter a valid quantity');
//       return;
//     }

//     // Validate all selected colors have valid quantities
//     const invalidColors = selectedColorsWithQty.filter(c => !c.quantity || c.quantity < 1);
//     if (invalidColors.length > 0) {
//       toast.error(`Please set valid quantities for all selected colors`);
//       return;
//     }

//     // ========== PRODUCT-LEVEL STOCK VALIDATION FOR COLORS ==========
//     if (hasColors) {
//       const totalSelectedQty = selectedColorsWithQty.reduce(
//         (sum, c) => sum + Number(c.quantity || 0),
//         0
//       );

//       if (totalSelectedQty > selectedProduct.stockQuantity) {
//         toast.error(
//           `Total quantity (${totalSelectedQty}) cannot exceed available stock (${selectedProduct.stockQuantity}).`
//         );
//         return;
//       }
//     }

//     // Check if adding this product would exceed stock (considering existing items)
//     if (!hasColors && addQuantity > selectedProduct.stockQuantity) {
//       toast.error(`Only ${selectedProduct.stockQuantity} item(s) available in stock.`);
//       return;
//     }

//     setAddingProduct(true);
    
//     try {
//       const colorsToAdd = hasColors ? selectedColorsWithQty : [{ color: null, quantity: addQuantity }];
//       const newItems = [];

//       // Build the new items array
//       for (const colorQty of colorsToAdd) {
//         const color = colorQty.color;
//         const quantity = colorQty.quantity;
        
//         // Check if adding this specific color would exceed stock (considering existing)
//         const existingTotal = localItems
//           .filter(item => item.productId === selectedProduct._id)
//           .reduce((sum, item) => sum + item.quantity, 0);
        
//         if (existingTotal + quantity > selectedProduct.stockQuantity) {
//           toast.warning(
//             `Cannot add more ${selectedProduct.productName}${color ? ` (${color})` : ''}. ` +
//             `Only ${selectedProduct.stockQuantity - existingTotal} more available.`
//           );
//           setAddingProduct(false);
//           return;
//         }
        
//         const newItem = {
//           _id: `temp_${Date.now()}_${Math.random()}`,
//           productId: selectedProduct._id,
//           productName: selectedProduct.productName,
//           productSlug: selectedProduct.slug || '',
//           image: selectedProduct.images?.[0]?.url || '',
//           regularPrice: selectedProduct.regularPrice,
//           discountPrice: selectedProduct.discountPrice || 0,
//           costPerItem: selectedProduct.costPerItem || 0,
//           buyingPrice: selectedProduct.buyingPrice || 0,
//           quantity: quantity,
//           stockQuantity: selectedProduct.stockQuantity,
//           unit: selectedProduct.unit || 'pcs',
//           selectedColor: color || null,
//           colors: []
//         };
//         newItems.push(newItem);
//       }

//       // Update local items with functional update
//       setLocalItems(prevItems => {
//         // Create a map of existing items by their unique key (productId + color)
//         const existingMap = new Map();
//         prevItems.forEach(item => {
//           const key = `${item.productId}_${item.selectedColor || 'null'}`;
//           existingMap.set(key, item);
//         });

//         // Update or add new items
//         const updatedItems = [...prevItems];
//         const itemsToAdd = [];

//         newItems.forEach(newItem => {
//           const key = `${newItem.productId}_${newItem.selectedColor || 'null'}`;
//           const existingItem = existingMap.get(key);
          
//           if (existingItem) {
//             // Check if adding would exceed stock (product-level)
//             const totalUsedByOthers = prevItems
//               .filter(item => 
//                 item.productId === newItem.productId && 
//                 item._id !== existingItem._id
//               )
//               .reduce((sum, item) => sum + item.quantity, 0);
            
//             const newTotal = totalUsedByOthers + existingItem.quantity + newItem.quantity;
            
//             if (newTotal > newItem.stockQuantity) {
//               toast.warning(
//                 `Cannot add more ${existingItem.productName}${existingItem.selectedColor ? ` (${existingItem.selectedColor})` : ''}. ` +
//                 `Stock limit (${newItem.stockQuantity}) would be exceeded.`
//               );
//               return;
//             }
            
//             // Update existing item quantity
//             const index = updatedItems.findIndex(item => item._id === existingItem._id);
//             if (index !== -1) {
//               updatedItems[index] = {
//                 ...existingItem,
//                 quantity: existingItem.quantity + newItem.quantity
//               };
//             }
//           } else {
//             // Add new item
//             itemsToAdd.push(newItem);
//           }
//         });

//         return [...updatedItems, ...itemsToAdd];
//       });

//       // Cache the product colors
//       if (selectedProduct.colors && selectedProduct.colors.length > 0) {
//         setProductColorsCache(prev => ({
//           ...prev,
//           [selectedProduct._id]: selectedProduct.colors
//         }));
//       }

//       setHasChanges(true);
//       toast.success(`Added ${selectedProduct.productName} to order`);
      
//       // Reset selection
//       setShowAddProduct(false);
//       setSelectedProduct(null);
//       setSearchQuery('');
//       setSearchResults([]);
//       setSelectedColorsWithQty([]);
//       setAddQuantity(1);
      
//     } catch (error) {
//       console.error('Add product error:', error);
//       toast.error('Failed to add product');
//     } finally {
//       setAddingProduct(false);
//     }
//   };

//   // ========== UPDATE QUANTITY FOR A SPECIFIC COLOR IN ORDER (PRODUCT-LEVEL STOCK) ==========
//   const updateColorQuantity = (itemId, newQuantity) => {
//     const item = localItems.find(i => i._id === itemId);

//     if (!item) return;

//     if (newQuantity < 1) {
//       showConfirmDialog(
//         'Remove Item',
//         `Are you sure you want to remove "${item.productName}"${item.selectedColor ? ` (${item.selectedColor})` : ''} from this order?`,
//         () => {
//           setLocalItems(prev => prev.filter(i => i._id !== itemId));
//           setHasChanges(true);
//           toast.success(`Removed ${item.productName} from order`);
//         },
//         'Remove',
//         'Cancel',
//         'danger'
//       );
//       return;
//     }

//     // Check product-level stock
//     const maxAllowed = getRemainingStock(item.productId, itemId);

//     if (newQuantity > maxAllowed) {
//       toast.warning(
//         `Only ${maxAllowed} more item(s) can be assigned to this color. ` +
//         `Other colors of this product already use ${getTotalUsedQuantity(item.productId, itemId)} items.`
//       );
//       return;
//     }

//     setHasChanges(true);
//     setLocalItems(prev => prev.map(item => {
//       if (item._id === itemId) {
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     }));
//   };

//   // ========== HANDLE ORDER ITEM QUANTITY INPUT (PRODUCT-LEVEL STOCK) ==========
//   const handleItemQuantityInputChange = (itemId, value) => {
//     const item = localItems.find(i => i._id === itemId);

//     if (!item) return;

//     if (value === '') {
//       setLocalItems(prev => prev.map(i => 
//         i._id === itemId ? { ...i, quantity: '' } : i
//       ));
//       return;
//     }

//     let qty = parseInt(value);
//     if (isNaN(qty)) return;

//     qty = Math.max(1, qty);
    
//     // Apply product-level stock constraint
//     const maxAllowed = getRemainingStock(item.productId, itemId);
//     qty = Math.min(qty, maxAllowed);

//     setLocalItems(prev => prev.map(i => 
//       i._id === itemId ? { ...i, quantity: qty } : i
//     ));

//     if (parseInt(value) > maxAllowed) {
//       toast.warning(`Only ${maxAllowed} more item(s) can be assigned to this color.`);
//     }

//     setHasChanges(true);
//   };

//   // ========== REMOVE ITEM WITH CONFIRMATION ==========
//   const handleRemoveItem = (itemId, productName, colorName) => {
//     const displayName = colorName ? `${productName} (${colorName})` : productName;
//     showConfirmDialog(
//       'Remove Item',
//       `Are you sure you want to remove "${displayName}" from this order?`,
//       () => {
//         setLocalItems(prev => prev.filter(item => item._id !== itemId));
//         setHasChanges(true);
//         toast.success(`Removed ${displayName} from order`);
//       },
//       'Remove',
//       'Cancel',
//       'danger'
//     );
//   };

//   // ========== UPDATE LOCAL DISCOUNT ==========
//   const handleDiscountChange = (e) => {
//     const value = parseFloat(e.target.value) || 0;
//     const maxDiscount = localSubtotal + shippingCost;
    
//     if (value > maxDiscount) {
//       toast.warning('Discount cannot exceed subtotal + shipping');
//       setLocalDiscount(maxDiscount);
//     } else {
//       setLocalDiscount(value);
//     }
//     setHasChanges(true);
//     setFormData(prev => ({ ...prev, discountNote: '' }));
//   };

//   // ========== CONFIRMATION DIALOG ==========
//   const showConfirmDialog = (title, message, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel', type = 'warning') => {
//     setConfirmConfig({
//       title,
//       message,
//       onConfirm: () => {
//         setShowConfirmModal(false);
//         if (onConfirm) onConfirm();
//       },
//       confirmText,
//       cancelText,
//       type
//     });
//     setShowConfirmModal(true);
//   };

//   // ========== HANDLE MODAL CLOSE ==========
//   const handleModalClose = () => {
//     if (hasChanges) {
//       showConfirmDialog(
//         'Discard Changes',
//         'You have unsaved changes. Are you sure you want to discard them?',
//         () => {
//           resetModal();
//           onClose();
//         },
//         'Discard',
//         'Keep Editing',
//         'warning'
//       );
//     } else {
//       resetModal();
//       onClose();
//     }
//   };

//   // ========== SAVE ALL CHANGES TO DATABASE WITH PRODUCT-LEVEL STOCK VALIDATION ==========
//  // ========== SAVE ALL CHANGES - USING BULK UPDATE ==========
// const handleSaveChanges = async () => {
//   if (!hasChanges) {
//     toast.info('No changes to save');
//     return;
//   }

//   // Validate product-level stock
//   const productGroups = {};
//   localItems.forEach(item => {
//     if (!productGroups[item.productId]) {
//       productGroups[item.productId] = {
//         productName: item.productName,
//         stockQuantity: item.stockQuantity,
//         totalQuantity: 0
//       };
//     }
//     productGroups[item.productId].totalQuantity += item.quantity;
//   });

//   for (const [productId, group] of Object.entries(productGroups)) {
//     if (group.totalQuantity > group.stockQuantity) {
//       toast.error(
//         `${group.productName}: Total quantity (${group.totalQuantity}) exceeds available stock (${group.stockQuantity}).`
//       );
//       setLoading(false);
//       return;
//     }
//   }

//   setLoading(true);
  
//   try {
//     const token = localStorage.getItem('token');
    
//     // ========== PROCESS ITEMS WITH SAFE DEFAULTS ==========
//     const processedItems = localItems.map(item => {
//       // Generate a slug from product name if not provided
//       let productSlug = item.productSlug;
//       if (!productSlug && item.productName) {
//         productSlug = item.productName
//           .toLowerCase()
//           .replace(/[^a-z0-9]+/g, '-')
//           .replace(/^-+|-+$/g, '');
//       }
//       if (!productSlug) {
//         productSlug = 'unknown-product';
//       }
      
//       return {
//         productId: item.productId,
//         productName: item.productName || 'Unknown Product',
//         productSlug: productSlug,
//         image: item.image || '',
//         regularPrice: item.regularPrice || 0,
//         discountPrice: item.discountPrice || 0,
//         costPerItem: item.costPerItem || 0,
//         buyingPrice: item.buyingPrice || 0,
//         quantity: item.quantity || 1,
//         stockQuantity: item.stockQuantity || 0,
//         unit: item.unit || 'pcs',
//         selectedColor: item.selectedColor || null,
//         colors: item.colors || []
//       };
//     });

//     // Prepare the data for bulk update
//     const updateData = {
//       customerInfo: {
//         fullName: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         division: formData.division,
//         address: formData.address,
//         city: formData.city,
//         zone: formData.zone,
//         area: formData.area
//       },
//       deliveryNote: formData.deliveryNote,
//       discount: localDiscount,
//       discountNote: formData.discountNote || 'Updated by admin',
//       items: processedItems
//     };

//     // ========== SINGLE API CALL ==========
//     const response = await fetch(`http://localhost:5000/api/orders/${order._id}/bulk-update`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(updateData)
//     });

//     const data = await response.json();
    
//     if (data.success) {
//       toast.success('Order updated successfully!');
//       setHasChanges(false);
//       resetModal();
//       onUpdate();
//       onClose();
//     } else {
//       toast.error(data.error || 'Failed to update order');
//     }
    
//   } catch (error) {
//     console.error('Save changes error:', error);
//     toast.error('Failed to save changes. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };

//   if (!isOpen) return null;

//   const statusInfo = ORDER_STATUSES.find(s => s.value === order?.orderStatus);
  
//   const getStatusLabel = (status) => {
//     const found = ORDER_STATUSES.find(s => s.value === status);
//     return found?.label || status;
//   };

//   const getRoleLabel = () => {
//     if (isSuperAdmin) return 'Super Admin';
//     if (isAdmin) return 'Admin';
//     if (isModerator) return 'Moderator';
//     return 'User';
//   };

//   return (
//     <>
//       {/* Main Modal */}
//       <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
//         >
//           <div className="p-4 bg-gradient-to-r from-[#82947A] to-[#485442] text-white sticky top-0 z-10">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <FaEdit className="w-5 h-5" />
//                 <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Edit Order</h2>
//               </div>
//               <button onClick={handleModalClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//                 <FaTimes className="w-4 h-4" />
//               </button>
//             </div>
//             <div className="flex items-center gap-3 mt-1 flex-wrap">
//               <p className="text-xs text-white/80">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
//               <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${statusInfo?.color || 'bg-white/20 text-white'}`}>
//                 {statusInfo?.icon && <statusInfo.icon className="w-2.5 h-2.5" />}
//                 {statusInfo?.label || order?.orderStatus}
//               </span>
//               <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">
//                 {getRoleLabel()}
//               </span>
//               {!isEditable && (
//                 <span className="text-xs bg-red-500/80 px-2 py-0.5 rounded-full text-white">
//                   Read-only
//                 </span>
//               )}
//               {isEditable && (
//                 <span className="text-xs bg-green-500/80 px-2 py-0.5 rounded-full text-white">
//                   Editable
//                 </span>
//               )}
//               {hasChanges && isEditable && (
//                 <span className="text-xs bg-yellow-500/80 px-2 py-0.5 rounded-full text-white animate-pulse">
//                   Unsaved Changes
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="p-5 max-h-[60vh] overflow-y-auto">
//             {/* ========== STATUS NOTE ========== */}
//             {!isEditable && (
//               <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-xl">
//                 <p className="text-xs text-yellow-700">
//                   ⚠️ This order is <strong>{getStatusLabel(order?.orderStatus)}</strong>. No changes are allowed.
//                 </p>
//               </div>
//             )}
            
//             {isEditable && (
//               <div className="mb-4 bg-[#82947A]/10 border-l-4 border-[#82947A] p-3 rounded-xl">
//                 <p className="text-xs text-[#82947A]">
//                   ✅ Order is <strong>{getStatusLabel(order?.orderStatus)}</strong>. 
//                   <span className="block text-[11px] mt-1">
//                     🔒 <strong>Full Name & Phone:</strong> Only Super Admin & Admin can edit
//                   </span>
//                   <span className="block text-[11px]">
//                     📧 <strong>Email:</strong> Only Super Admin can edit
//                   </span>
//                   <span className="block text-[11px]">
//                     📝 <strong>Address & Notes:</strong> All authorized users can edit
//                   </span>
//                   <span className="block text-[11px] font-semibold mt-1">
//                     ⚡ All changes are local until you click "Save Changes"
//                   </span>
//                   <span className="block text-[11px] text-green-600 mt-1">
//                     ✅ Editable statuses: Placed, Follow Up, Reminder, Accepted, Approved, Ready to Ship
//                   </span>
//                 </p>
//               </div>
//             )}

//             {/* ========== CUSTOMER INFORMATION ========== */}
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {/* ===== FULL NAME ===== */}
//                 <div>
//                   <label className="block text-xs font-medium text-black mb-1">
//                     Full Name *
//                     {!canEditSensitiveInfo && isEditable && (
//                       <span className="ml-1 text-[10px] text-[#64748B] font-normal">(read-only)</span>
//                     )}
//                     {canEditSensitiveInfo && isEditable && (
//                       <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
//                     )}
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     readOnly={!canEditSensitiveInfo || !isEditable}
//                     className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
//                       !canEditSensitiveInfo || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
//                     } border-[#82947A]/30 text-black`}
//                   />
//                   {!canEditSensitiveInfo && isEditable && (
//                     <p className="text-[10px] text-[#64748B] mt-0.5">Only Super Admin & Admin can edit name</p>
//                   )}
//                 </div>

//                 {/* ===== PHONE ===== */}
//                 <div>
//                   <label className="block text-xs font-medium text-black mb-1">
//                     Phone *
//                     {!canEditSensitiveInfo && isEditable && (
//                       <span className="ml-1 text-[10px] text-[#64748B] font-normal">(read-only)</span>
//                     )}
//                     {canEditSensitiveInfo && isEditable && (
//                       <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
//                     )}
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     readOnly={!canEditSensitiveInfo || !isEditable}
//                     className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
//                       !canEditSensitiveInfo || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
//                     } border-[#82947A]/30 text-black`}
//                   />
//                   {!canEditSensitiveInfo && isEditable && (
//                     <p className="text-[10px] text-[#64748B] mt-0.5">Only Super Admin & Admin can edit phone</p>
//                   )}
//                 </div>

//                 {/* ===== EMAIL ===== */}
//                 <div>
//                   <label className="block text-xs font-medium text-black mb-1">
//                     Email
//                     {isSuperAdmin && isEditable && (
//                       <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
//                     )}
//                     {!isSuperAdmin && isEditable && (
//                       <span className="ml-1 text-[10px] text-[#64748B] font-normal">(read-only)</span>
//                     )}
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     readOnly={!isSuperAdmin || !isEditable}
//                     className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
//                       !isSuperAdmin || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
//                     } border-[#82947A]/30 text-black`}
//                   />
//                   {!isSuperAdmin && isEditable && (
//                     <p className="text-[10px] text-[#64748B] mt-0.5">Only Super Admin can edit email</p>
//                   )}
//                 </div>

//                 {/* ===== DIVISION ===== */}
//                 <div>
//                   <label className="block text-xs font-medium text-black mb-1">
//                     Division *
//                     {canEditAddress && isEditable && (
//                       <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
//                     )}
//                   </label>
//                   <SearchableSelect
//                     name="division"
//                     value={formData.division}
//                     onChange={handleInputChange}
//                     options={divisionList}
//                     placeholder="Select Division"
//                     disabled={!canEditAddress || !isEditable || locationLoading}
//                     error={!formData.division && false}
//                   />
//                 </div>

//                 {/* ===== DISTRICT/CITY ===== */}
//                 <div>
//                   <label className="block text-xs font-medium text-black mb-1">
//                     District/City *
//                     {canEditAddress && isEditable && (
//                       <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
//                     )}
//                   </label>
//                   <SearchableSelect
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     options={citiesByDivision}
//                     placeholder={formData.division ? "Select District" : "Select Division First"}
//                     disabled={!canEditAddress || !isEditable || !formData.division || locationLoading}
//                     error={!formData.city && false}
//                   />
//                 </div>

//                 {/* ===== UPAZILA/THANA ===== */}
//                 <div>
//                   <label className="block text-xs font-medium text-black mb-1">
//                     Upazila/Thana *
//                     {canEditAddress && isEditable && (
//                       <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
//                     )}
//                   </label>
//                   <SearchableSelect
//                     name="zone"
//                     value={formData.zone}
//                     onChange={handleInputChange}
//                     options={zones}
//                     placeholder={formData.city ? "Select Upazila/Thana" : "Select District First"}
//                     disabled={!canEditAddress || !isEditable || !formData.city || locationLoading}
//                     error={!formData.zone && false}
//                   />
//                 </div>

//                 {/* ===== UNION/AREA ===== */}
//                 <div>
//                   <label className="block text-xs font-medium text-black mb-1">
//                     Union/Area
//                     {canEditAddress && isEditable && (
//                       <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
//                     )}
//                   </label>
//                   <SearchableSelect
//                     name="area"
//                     value={formData.area}
//                     onChange={handleInputChange}
//                     options={areas}
//                     placeholder={formData.zone ? "Select Union/Area" : "Select Upazila First"}
//                     disabled={!canEditAddress || !isEditable || !formData.zone || locationLoading}
//                   />
//                 </div>

//                 {/* ===== ADDRESS ===== */}
//                 <div className="md:col-span-2">
//                   <label className="block text-xs font-medium text-black mb-1">
//                     Address *
//                     {canEditAddress && isEditable && (
//                       <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
//                     )}
//                   </label>
//                   <textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     readOnly={!canEditAddress || !isEditable}
//                     rows="2"
//                     className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
//                       !canEditAddress || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
//                     } border-[#82947A]/30 text-black`}
//                   />
//                 </div>
//               </div>

//               {/* ========== ORDER ITEMS ========== */}
//               <div className="border-t border-[#82947A]/30 pt-4 mt-2">
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="text-sm font-medium text-black flex items-center gap-2">
//                     <FaBox className="w-4 h-4 text-[#82947A]" />
//                     Order Items ({localItems.length})
//                     {canEditProducts && isEditable && (
//                       <span className="text-[10px] text-[#82947A] font-normal">(add/remove products)</span>
//                     )}
//                   </label>
//                   {canEditProducts && isEditable && (
//                     <button
//                       onClick={() => setShowAddProduct(!showAddProduct)}
//                       className="px-3 py-1.5 bg-[#82947A]/10 text-[#82947A] rounded-xl hover:bg-[#82947A]/20 transition-colors text-sm flex items-center gap-1.5 border border-[#82947A]/30"
//                     >
//                       <FaPlus className="w-3 h-3" />
//                       Add Product
//                     </button>
//                   )}
//                 </div>

//                 {/* ========== ADD PRODUCT SECTION ========== */}
//                 {showAddProduct && canEditProducts && isEditable && (
//                   <div className="mb-4 p-4 bg-[#E2E7EA]/30 rounded-xl border border-[#82947A]/30">
//                     <h4 className="text-sm font-medium text-black mb-3">Add Product to Order</h4>
                    
//                     <div className="relative mb-3">
//                       <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
//                       <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Start typing product name, SKU, or barcode..."
//                         className="w-full pl-10 pr-3 py-2 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
//                         autoFocus
//                       />
//                       {searching && (
//                         <FaSpinner className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-[#82947A]" />
//                       )}
//                       {searchQuery && !searching && (
//                         <button
//                           onClick={() => setSearchQuery('')}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#82947A]"
//                         >
//                           <FaTimes className="w-3 h-3" />
//                         </button>
//                       )}
//                     </div>

//                     {searchQuery.length > 0 && (
//                       <div className="mb-3 max-h-48 overflow-y-auto border border-[#82947A]/20 rounded-xl bg-white">
//                         {searching ? (
//                           <div className="flex items-center justify-center py-4">
//                             <FaSpinner className="w-4 h-4 animate-spin text-[#82947A]" />
//                             <span className="ml-2 text-xs text-[#64748B]">Searching...</span>
//                           </div>
//                         ) : searchResults.length > 0 ? (
//                           searchResults.map((product) => (
//                             <div
//                               key={product._id}
//                               onClick={() => {
//                                 setSelectedProduct(product);
//                                 setSelectedColorsWithQty([]);
//                                 setAddQuantity(1);
//                               }}
//                               className={`p-2 border-b border-[#82947A]/10 cursor-pointer hover:bg-[#E2E7EA]/50 transition-colors flex items-center gap-3 ${
//                                 selectedProduct?._id === product._id ? 'bg-[#82947A]/10 border-l-4 border-l-[#82947A]' : ''
//                               }`}
//                             >
//                               <img
//                                 src={product.images?.[0]?.url || 'https://via.placeholder.com/40'}
//                                 alt={product.productName}
//                                 className="w-10 h-10 rounded-lg object-cover border border-[#82947A]/20 flex-shrink-0"
//                                 onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                               />
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-xs font-medium text-black truncate">{product.productName}</p>
//                                 <div className="flex items-center gap-2 text-xs flex-wrap">
//                                   <span className="text-[#82947A] font-bold">৳{(product.discountPrice || product.regularPrice).toFixed(2)}</span>
//                                   {product.discountPrice > 0 && (
//                                     <span className="text-[#64748B] line-through">৳{product.regularPrice.toFixed(2)}</span>
//                                   )}
//                                   <span className="text-[#64748B]">Stock: {product.stockQuantity}</span>
//                                   {product.colors && product.colors.length > 0 && (
//                                     <span className="text-[10px] text-[#82947A] bg-[#82947A]/10 px-1.5 py-0.5 rounded-full">
//                                       {product.colors.length} colors
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                               {selectedProduct?._id === product._id && (
//                                 <FaCheckCircle className="w-4 h-4 text-[#82947A]" />
//                               )}
//                             </div>
//                           ))
//                         ) : (
//                           <div className="p-4 text-center">
//                             <p className="text-xs text-[#64748B]">No products found matching "{searchQuery}"</p>
//                             <p className="text-[10px] text-[#64748B]/60 mt-1">Try searching by name, SKU, or barcode</p>
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {selectedProduct && (
//                       <div className="p-3 bg-white rounded-xl border border-[#82947A]/20">
//                         <p className="text-xs font-medium text-black mb-2">
//                           Selected: {selectedProduct.productName}
//                           <span className="ml-2 text-[10px] text-[#64748B]">(Stock: {selectedProduct.stockQuantity})</span>
//                         </p>
                        
//                         {selectedProduct.colors && selectedProduct.colors.length > 0 ? (
//                           <div className="space-y-3">
//                             <p className="text-xs text-[#64748B]">Click on a color to select it, then set quantity:</p>
                            
//                             {selectedProduct.colors.map((color) => {
//                               const selected = selectedColorsWithQty.find(c => c.color === color);
//                               const isSelected = !!selected;
//                               const quantity = selected?.quantity || 1;
                              
//                               // Calculate max allowed for this color based on product-level stock
//                               const totalSelectedOthers = selectedColorsWithQty
//                                 .filter(c => c.color !== color)
//                                 .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
//                               const maxAllowed = selectedProduct.stockQuantity - totalSelectedOthers;
                              
//                               return (
//                                 <div key={color} className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${
//                                   isSelected 
//                                     ? 'bg-[#82947A]/5 border-[#82947A]' 
//                                     : 'bg-[#E2E7EA]/30 border-[#82947A]/15 hover:border-[#82947A]/30'
//                                 }`}>
//                                   <div 
//                                     className="w-8 h-8 rounded-full border-2 flex-shrink-0"
//                                     style={{ 
//                                       backgroundColor: color,
//                                       borderColor: isSelected ? '#06B6D4' : '#E2E7EA'
//                                     }}
//                                   />
//                                   <span className="text-xs font-medium text-black min-w-[60px]">{color}</span>
                                  
//                                   <button
//                                     onClick={() => toggleColorSelection(color)}
//                                     className={`px-3 py-1 text-xs rounded-lg transition-colors ${
//                                       isSelected 
//                                         ? 'bg-red-500 text-white hover:bg-red-600' 
//                                         : 'bg-[#82947A] text-white hover:bg-[#0891B2]'
//                                     }`}
//                                   >
//                                     {isSelected ? 'Deselect' : 'Select'}
//                                   </button>
                                  
//                                   {isSelected && (
//                                     <div className="flex items-center gap-1 ml-auto">
//                                       <button
//                                         onClick={() => updateSelectedColorQuantity(color, quantity - 1)}
//                                         disabled={quantity <= 1}
//                                         className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#E2E7EA] disabled:opacity-50 text-[#64748B]"
//                                       >
//                                         <FaMinus className="w-2.5 h-2.5" />
//                                       </button>
//                                       <input
//                                         type="number"
//                                         min="1"
//                                         max={maxAllowed}
//                                         value={quantity}
//                                         onChange={(e) => handleColorQuantityInputChange(color, e.target.value)}
//                                         className="w-12 text-center text-sm font-medium text-black border border-[#82947A]/20 rounded-lg focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white py-1"
//                                       />
//                                       <button
//                                         onClick={() => updateSelectedColorQuantity(color, quantity + 1)}
//                                         disabled={quantity >= maxAllowed || maxAllowed <= 0}
//                                         className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#E2E7EA] disabled:opacity-50 text-[#64748B]"
//                                       >
//                                         <FaPlus className="w-2.5 h-2.5" />
//                                       </button>
//                                     </div>
//                                   )}
//                                 </div>
//                               );
//                             })}
                            
//                             <div className="mt-2 text-[10px] text-[#64748B]">
//                               {selectedColorsWithQty.length > 0 ? (
//                                 <span className="text-[#82947A]">
//                                   ✓ {selectedColorsWithQty.length} color{selectedColorsWithQty.length > 1 ? 's' : ''} selected
//                                   {' | Total: '}
//                                   {selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0)} / {selectedProduct.stockQuantity}
//                                 </span>
//                               ) : (
//                                 <span className="text-orange-500">Click "Select" on a color above to add it</span>
//                               )}
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="flex items-center gap-3">
//                             <span className="text-xs text-[#64748B]">Quantity:</span>
//                             <div className="flex items-center border border-[#82947A]/30 rounded-lg overflow-hidden">
//                               <button
//                                 onClick={() => setAddQuantity(prev => Math.max(1, prev - 1))}
//                                 className="px-2 py-1 hover:bg-[#E2E7EA] transition-colors"
//                               >
//                                 <FaMinus className="w-2.5 h-2.5 text-[#64748B]" />
//                               </button>
//                               <input
//                                 type="number"
//                                 value={addQuantity}
//                                 onChange={(e) => setAddQuantity(Math.max(1, Math.min(selectedProduct.stockQuantity, parseInt(e.target.value) || 1)))}
//                                 min="1"
//                                 max={selectedProduct.stockQuantity}
//                                 className="w-12 text-center text-xs py-1 bg-white focus:outline-none text-black"
//                               />
//                               <button
//                                 onClick={() => setAddQuantity(prev => Math.min(selectedProduct.stockQuantity, prev + 1))}
//                                 disabled={addQuantity >= selectedProduct.stockQuantity}
//                                 className="px-2 py-1 hover:bg-[#E2E7EA] disabled:opacity-50 transition-colors"
//                               >
//                                 <FaPlus className="w-2.5 h-2.5 text-[#64748B]" />
//                               </button>
//                             </div>
//                             <span className="text-xs text-[#64748B]">/ {selectedProduct.stockQuantity} available</span>
//                           </div>
//                         )}

//                         <button
//                           onClick={handleAddProduct}
//                           disabled={addingProduct || (selectedProduct.colors?.length > 0 && selectedColorsWithQty.length === 0)}
//                           className="mt-3 w-full px-4 py-2 bg-[#82947A] text-white rounded-lg hover:bg-[#485442] transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2"
//                         >
//                           {addingProduct ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaPlus className="w-3 h-3" />}
//                           Add to Order
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* ========== ITEMS LIST - GROUPED BY PRODUCT WITH COLORS ========== */}
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-xs">
//                     <thead className="bg-[#E2E7EA]">
//                       <tr>
//                         <th className="px-2 py-1.5 text-left text-black">Product</th>
//                         <th className="px-2 py-1.5 text-center text-black">Color</th>
//                         <th className="px-2 py-1.5 text-center text-black">Qty</th>
//                         <th className="px-2 py-1.5 text-right text-black">Price</th>
//                         <th className="px-2 py-1.5 text-right text-black">Total</th>
//                         {canEditProducts && isEditable && <th className="px-2 py-1.5 text-center text-black">Action</th>}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {groupedItems.length === 0 ? (
//                         <tr>
//                           <td colSpan={canEditProducts && isEditable ? 6 : 5} className="text-center py-4 text-[#64748B]">
//                             No items in this order
//                           </td>
//                         </tr>
//                       ) : (
//                         groupedItems.map((group) => {
//                           const hasMultipleColors = group.colors && group.colors.length > 1;
//                           const totalUsed = group.colors.reduce((sum, c) => sum + c.quantity, 0);
//                           const isOverStock = totalUsed > group.stockQuantity;
                          
//                           return group.colors.map((colorInfo, colorIdx) => {
//                             const isFirst = colorIdx === 0;
//                             const price = colorInfo.price || group.discountPrice || group.regularPrice;
//                             const totalPrice = price * colorInfo.quantity;
//                             const isTempItem = colorInfo.isTempItem;
//                             const hasColor = colorInfo.color !== null;
                            
//                             // Calculate max allowed for this color based on product-level stock
//                             const usedByOthers = group.colors
//                               .filter(c => c.itemId !== colorInfo.itemId)
//                               .reduce((sum, c) => sum + c.quantity, 0);
//                             const maxAllowed = group.stockQuantity - usedByOthers;
                            
//                             return (
//                               <tr key={colorInfo.itemId || `color-${colorIdx}`} className={`border-t border-[#82947A]/20 ${isTempItem ? 'bg-[#82947A]/5' : ''} ${isOverStock ? 'bg-red-50' : ''}`}>
//                                 {isFirst && (
//                                   <td className="px-2 py-2" rowSpan={hasMultipleColors ? group.colors.length : 1}>
//                                     <div className="flex items-center gap-2">
//                                       <img 
//                                         src={group.image || 'https://via.placeholder.com/30'} 
//                                         alt={group.productName}
//                                         className="w-7 h-7 rounded object-cover border border-[#82947A]/30 flex-shrink-0"
//                                         onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                                       />
//                                       <div>
//                                         <p className="font-medium text-xs text-black truncate max-w-[120px]" title={group.productName}>
//                                           {group.productName}
//                                           {isTempItem && (
//                                             <span className="ml-1 text-[10px] text-green-500 font-normal">(new)</span>
//                                           )}
//                                           {isOverStock && (
//                                             <span className="ml-1 text-[10px] text-red-500 font-normal">(exceeds stock!)</span>
//                                           )}
//                                         </p>
//                                         {hasMultipleColors && (
//                                           <p className="text-[9px] text-[#64748B]">{group.colors.length} colors</p>
//                                         )}
//                                         <p className={`text-[9px] ${isOverStock ? 'text-red-500 font-medium' : 'text-[#64748B]'}`}>
//                                           Stock: {group.stockQuantity} | Used: {totalUsed}
//                                           {isOverStock && ` (${totalUsed - group.stockQuantity} over)`}
//                                         </p>
//                                       </div>
//                                     </div>
//                                   </td>
//                                 )}
                                
//                                 {/* ===== COLOR COLUMN ===== */}
//                                 <td className="px-2 py-2 text-center">
//                                   {hasColor ? (
//                                     <div className="flex items-center justify-center">
//                                       <div 
//                                         className="w-5 h-5 rounded-full border border-[#82947A]/30 shadow-sm"
//                                         style={{ backgroundColor: colorInfo.color }}
//                                         title={colorInfo.color}
//                                       />
//                                     </div>
//                                   ) : (
//                                     <span className="text-xs text-[#64748B]">-</span>
//                                   )}
//                                 </td>
                                
//                                 <td className="px-2 py-2 text-center">
//                                   {canEditProducts && isEditable ? (
//                                     <div className="flex items-center justify-center gap-1">
//                                       <button
//                                         onClick={() => updateColorQuantity(colorInfo.itemId, colorInfo.quantity - 1)}
//                                         disabled={colorInfo.quantity <= 1}
//                                         className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#E2E7EA] disabled:opacity-50 text-[#64748B]"
//                                       >
//                                         <FaMinus className="w-2.5 h-2.5" />
//                                       </button>
//                                       <input
//                                         type="number"
//                                         min="1"
//                                         max={maxAllowed}
//                                         value={colorInfo.quantity}
//                                         onChange={(e) => handleItemQuantityInputChange(colorInfo.itemId, e.target.value)}
//                                         className={`w-10 text-center text-xs font-medium border rounded focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white py-0.5 ${
//                                           isOverStock ? 'border-red-500 text-red-600' : 'border-[#82947A]/30 text-black'
//                                         }`}
//                                       />
//                                       <button
//                                         onClick={() => updateColorQuantity(colorInfo.itemId, colorInfo.quantity + 1)}
//                                         disabled={colorInfo.quantity >= maxAllowed || maxAllowed <= 0}
//                                         className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#E2E7EA] disabled:opacity-50 text-[#64748B]"
//                                       >
//                                         <FaPlus className="w-2.5 h-2.5" />
//                                       </button>
//                                     </div>
//                                   ) : (
//                                     <span className={`font-medium ${isOverStock ? 'text-red-600' : 'text-black'}`}>{colorInfo.quantity}</span>
//                                   )}
//                                 </td>
//                                 <td className="px-2 py-2 text-right text-black">৳{price.toFixed(2)}</td>
//                                 <td className="px-2 py-2 text-right font-medium text-[#82947A]">৳{totalPrice.toFixed(2)}</td>
//                                 {canEditProducts && isEditable && (
//                                   <td className="px-2 py-2 text-center">
//                                     <button
//                                       onClick={() => handleRemoveItem(colorInfo.itemId, group.productName, colorInfo.color)}
//                                       disabled={removingItem === colorInfo.itemId}
//                                       className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
//                                       title="Remove item"
//                                     >
//                                       {removingItem === colorInfo.itemId ? (
//                                         <FaSpinner className="w-3.5 h-3.5 animate-spin" />
//                                       ) : (
//                                         <FaTrash className="w-3.5 h-3.5" />
//                                       )}
//                                     </button>
//                                   </td>
//                                 )}
//                               </tr>
//                             );
//                           });
//                         })
//                       )}
//                     </tbody>
//                     <tfoot className="border-t border-[#82947A]/30 bg-[#E2E7EA]/30">
//                       <tr>
//                         <td colSpan={canEditProducts && isEditable ? 4 : 3} className="px-2 py-1 text-right font-medium text-black">Subtotal:</td>
//                         <td className="px-2 py-1 text-right font-medium text-black">৳{localSubtotal.toFixed(2)}</td>
//                         {canEditProducts && isEditable && <td></td>}
//                       </tr>
//                       <tr>
//                         <td colSpan={canEditProducts && isEditable ? 4 : 3} className="px-2 py-1 text-right font-medium text-black">Shipping:</td>
//                         <td className="px-2 py-1 text-right text-black">৳{shippingCost.toFixed(2)}</td>
//                         {canEditProducts && isEditable && <td></td>}
//                       </tr>
//                       <tr className="text-green-600">
//                         <td colSpan={canEditProducts && isEditable ? 4 : 3} className="px-2 py-1 text-right font-medium">Discount:</td>
//                         <td className="px-2 py-1 text-right font-medium">- ৳{localDiscount.toFixed(2)}</td>
//                         {canEditProducts && isEditable && <td></td>}
//                       </tr>
//                       <tr className="text-sm font-bold text-[#82947A]">
//                         <td colSpan={canEditProducts && isEditable ? 4 : 3} className="px-2 py-1 text-right text-black">Total:</td>
//                         <td className="px-2 py-1 text-right text-[#82947A]">৳{localTotal.toFixed(2)}</td>
//                         {canEditProducts && isEditable && <td></td>}
//                       </tr>
//                     </tfoot>
//                   </table>
//                 </div>
//               </div>

//               {/* ========== DISCOUNT SECTION ========== */}
//               <div className="border-t border-[#82947A]/30 pt-4 mt-2">
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="text-sm font-medium text-black flex items-center gap-2">
             
//                     Order Discount amount
//                     {canEditDiscount && isEditable && (
//                       <span className="text-[10px] text-[#82947A] font-normal">(editable)</span>
//                     )}
//                   </label>
//                 </div>
//                 <div className="flex flex-wrap items-center gap-3">
//                   <div className="flex-1 min-w-[120px]">
//                     <input
//                       type="number"
//                       name="discount"
//                       value={localDiscount}
//                       onChange={handleDiscountChange}
//                       disabled={!canEditDiscount || !isEditable}
//                       min="0"
//                       step="0.5"
//                       className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
//                         !canEditDiscount || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
//                       } border-[#82947A]/30 text-black`}
//                       placeholder="0.00"
//                     />
//                   </div>
//                   <div className="flex-1 min-w-[150px]">
//                     <input
//                       type="text"
//                       name="discountNote"
//                       value={formData.discountNote}
//                       onChange={handleInputChange}
//                       disabled={!canEditDiscount || !isEditable}
//                       placeholder="Discount reason (optional)"
//                       className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
//                         !canEditDiscount || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
//                       } border-[#82947A]/30 text-black`}
//                     />
//                   </div>
//                 </div>
//                 <div className="mt-2 p-2 bg-[#E2E7EA]/30 rounded-lg border border-[#82947A]/20">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-[#64748B]">After Discount:</span>
//                     <span className="font-bold text-[#82947A]">৳{localTotal.toFixed(2)}</span>
//                   </div>
//                   {localDiscount > 0 && (
//                     <div className="flex justify-between text-xs text-green-600">
//                       <span>You saved:</span>
//                       <span>৳{localDiscount.toFixed(2)}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* ========== DELIVERY NOTE ========== */}
//               <div className="border-t border-[#82947A]/30 pt-4 mt-2">
//                 <label className="block text-xs font-medium text-black mb-1">
//                   Delivery Note
//                   {canEditDeliveryNote && isEditable && (
//                     <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
//                   )}
//                 </label>
//                 <textarea
//                   name="deliveryNote"
//                   value={formData.deliveryNote}
//                   onChange={handleInputChange}
//                   readOnly={!canEditDeliveryNote || !isEditable}
//                   rows="2"
//                   className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
//                     !canEditDeliveryNote || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
//                   } border-[#82947A]/30 text-black`}
//                   placeholder="Add delivery notes or special instructions"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
//             <button onClick={handleModalClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
//               Cancel
//             </button>
//             <button
//               onClick={handleSaveChanges}
//               disabled={loading || !isEditable}
//               className={`flex-1 px-3 py-2 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm ${
//                 hasChanges && isEditable
//                   ? 'bg-gradient-to-r from-[#82947A] to-black text-white hover:shadow-lg hover:shadow-[#82947A]/25'
//                   : 'bg-[#E2E7EA] text-[#64748B] cursor-not-allowed'
//               }`}
//             >
//               {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
//               {loading ? 'Saving...' : hasChanges ? 'Save Changes' : 'No Changes'}
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       {/* ========== CONFIRMATION MODAL ========== */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#82947A]/20"
//           >
//             <div className={`p-4 ${
//               confirmConfig.type === 'danger' ? 'bg-gradient-to-r from-red-500 to-red-600' :
//               confirmConfig.type === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
//               'bg-gradient-to-r from-[#82947A] to-black'
//             } text-white`}>
//               <div className="flex items-center gap-3">
//                 {confirmConfig.type === 'danger' && <FaExclamationTriangle className="w-5 h-5" />}
//                 {confirmConfig.type === 'warning' && <FaExclamationTriangle className="w-5 h-5" />}
//                 {confirmConfig.type === 'info' && <FaInfoCircle className="w-5 h-5" />}
//                 <h3 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
//                   {confirmConfig.title}
//                 </h3>
//               </div>
//             </div>

//             <div className="p-6">
//               <p className="text-black text-sm">{confirmConfig.message}</p>
//             </div>

//             <div className="p-4 border-t border-[#82947A]/20 bg-[#E2E7EA]/20 flex gap-3">
//               <button
//                 onClick={() => setShowConfirmModal(false)}
//                 className="flex-1 px-4 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm"
//               >
//                 {confirmConfig.cancelText || 'Cancel'}
//               </button>
//               <button
//                 onClick={confirmConfig.onConfirm}
//                 className={`flex-1 px-4 py-2 rounded-xl text-white text-sm transition-all hover:shadow-lg ${
//                   confirmConfig.type === 'danger' 
//                     ? 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-red-500/25' 
//                     : confirmConfig.type === 'warning'
//                     ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:shadow-yellow-500/25'
//                     : 'bg-gradient-to-r from-[#82947A] to-black hover:shadow-[#82947A]/25'
//                 }`}
//               >
//                 {confirmConfig.confirmText || 'Confirm'}
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </>
//   );
// };

// // ========== MAIN ADMIN ORDERS PAGE ==========
// export default function AdminOrdersPage() {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [paymentFilter, setPaymentFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
//   const [stats, setStats] = useState(null);
//   const [sortBy, setSortBy] = useState('-createdAt');
//   const [activeStatusTab, setActiveStatusTab] = useState('all');
//   const [downloadingOrders, setDownloadingOrders] = useState({});
//   const [userRole, setUserRole] = useState('');
  
//   // Delivery related states
//   const [showDeliveryModal, setShowDeliveryModal] = useState(false);
//   const [showTrackingModal, setShowTrackingModal] = useState(false);
//   const [trackingInfo, setTrackingInfo] = useState(null);
//   const [trackingLoading, setTrackingLoading] = useState({});
//   const [refreshLoading, setRefreshLoading] = useState(false);
//   const [refreshingOrders, setRefreshingOrders] = useState({});
//   const [deliveryStatuses, setDeliveryStatuses] = useState({});

//   const [showCourierScoreModal, setShowCourierScoreModal] = useState(false);
//   const [selectedOrderForScore, setSelectedOrderForScore] = useState(null);
  
//   // Bulk selection states
//   const [selectedOrdersList, setSelectedOrdersList] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [showCheckboxes, setShowCheckboxes] = useState(false);
//   const isAdminOrSuperAdmin = userRole === 'super_admin' || userRole === 'admin';

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

//   // Handle select all
//   useEffect(() => {
//     if (selectAll) {
//       setSelectedOrdersList(orders);
//     } else {
//       setSelectedOrdersList([]);
//     }
//   }, [selectAll, orders]);

//   const statusTabs = [
//     { value: 'all', label: 'All', count: stats?.totalOrders || 0, color: 'bg-[#82947A]' },
//     { value: 'placed', label: 'Placed', count: stats?.placedOrders || 0, color: 'bg-[#82947A]' },
//     { value: 'follow_up', label: 'Follow Up', count: stats?.followUpOrders || 0, color: 'bg-[#82947A]' },
//     { value: 'reminder', label: 'Reminder', count: stats?.reminderOrders || 0, color: 'bg-[#FFC107]' },
//     { value: 'accepted', label: 'Accepted', count: stats?.acceptedOrders || 0, color: 'bg-[#82947A]' },
//     { value: 'approved', label: 'Approved', count: stats?.approvedOrders || 0, color: 'bg-[#82947A]' },
//     { value: 'hold', label: 'On Hold', count: stats?.holdOrders || 0, color: 'bg-yellow-500' },
//     { value: 'processing', label: 'Processing', count: stats?.processingOrders || 0, color: 'bg-blue-500' },
//     { value: 'courier_assigned', label: 'Courier Assigned', count: stats?.courierAssignedOrders || 0, color: 'bg-[#82947A]' },
//     { value: 'partial_delivery', label: 'Partial Delivery', count: stats?.partialDeliveryOrders || 0, color: 'bg-yellow-500' },
//     { value: 'ready_to_ship', label: 'Ready to Ship', count: stats?.readyToShipOrders || 0, color: 'bg-[#82947A]' },
//     { value: 'rejected', label: 'Rejected', count: stats?.rejectedOrders || 0, color: 'bg-orange-500' },
//     { value: 'delivered', label: 'Delivered', count: stats?.deliveredOrders || 0, color: 'bg-[#82947A]' },
//     { value: 'returned', label: 'Returned', count: stats?.returnedOrders || 0, color: 'bg-purple-500' },
//     { value: 'cancelled', label: 'Cancelled', count: stats?.cancelledOrders || 0, color: 'bg-red-500' }
//   ];

// // In AdminOrdersPage component - Ensure fetchOrders gets delivery status

// const fetchOrders = useCallback(async () => {
//   setLoading(true);
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//       return;
//     }

//     const queryParams = new URLSearchParams({
//       page: currentPage,
//       limit: 20,
//       sort: sortBy
//     });
//     if (searchTerm) queryParams.append('search', searchTerm);
//     if (activeStatusTab !== 'all') queryParams.append('orderStatus', activeStatusTab);
//     if (statusFilter) queryParams.append('orderStatus', statusFilter);
//     if (paymentFilter) queryParams.append('paymentStatus', paymentFilter);

//     const response = await fetch(`http://localhost:5000/api/orders/admin/all?${queryParams}`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     const data = await response.json();
//     if (data.success) {
//       console.log('📦 Orders received:', data.data);
//       // ✅ Log delivery status for debugging
//       data.data.forEach(order => {
//         if (order.deliveryService) {
//           console.log(`📦 Order ${order.orderNumber} deliveryStatus:`, order.deliveryService.deliveryStatus);
//         }
//       });
      
//       setOrders(data.data);
//       setTotalPages(data.pagination.pages);
//       setTotalOrders(data.pagination.total);
//       setSelectAll(false);
//       setSelectedOrdersList([]);
//     } else {
//       toast.error(data.error || 'Failed to fetch orders');
//     }
//   } catch (error) {
//     console.error('Fetch orders error:', error);
//     toast.error('Network error');
//   } finally {
//     setLoading(false);
//   }
// }, [currentPage, searchTerm, activeStatusTab, statusFilter, paymentFilter, sortBy, router]);

//   const fetchStats = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/orders/admin/stats', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setStats(data.data);
//       }
//     } catch (error) {
//       console.error('Fetch stats error:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();
//     fetchStats();
//   }, [fetchOrders, fetchStats]);

//   // ========== AUTO-REFRESH DELIVERY STATUSES ==========
// // In AdminOrdersPage component - Updated auto-refresh

// useEffect(() => {
//   const autoRefreshInterval = setInterval(() => {
//     // ✅ Only refresh orders that are in courier_assigned status
//     const ordersToRefresh = orders.filter(order => 
//       order.deliveryService?.trackingNumber && 
//       order.orderStatus === 'courier_assigned' &&
//       order.deliveryService.deliveryStatus !== 'delivered' &&
//       order.deliveryService.deliveryStatus !== 'cancelled' &&
//       order.deliveryService.deliveryStatus !== 'returned'
//     );
    
//     console.log('🔄 Auto-refreshing delivery statuses for:', ordersToRefresh.length, 'orders');
    
//     if (ordersToRefresh.length > 0 && ordersToRefresh.length < 10) {
//       ordersToRefresh.forEach(order => {
//         refreshSingleOrderDelivery(order._id);
//       });
//     }
//   }, 60000); // ✅ Changed to 1 minute for testing
  
//   return () => clearInterval(autoRefreshInterval);
// }, [orders]);

// // In AdminOrdersPage component - Fix refreshSingleOrderDelivery

// // In AdminOrdersPage component - Updated refreshSingleOrderDelivery

// const refreshSingleOrderDelivery = async (orderId) => {
//   setRefreshingOrders(prev => ({ ...prev, [orderId]: true }));
  
//   try {
//     const token = localStorage.getItem('token');
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${orderId}/tracking`,
//       {
//         headers: { 'Authorization': `Bearer ${token}` }
//       }
//     );
    
//     const data = await response.json();
//     console.log('📦 Tracking response:', data);
    
//     if (data.success) {
//       // ✅ Get the delivery status from the response
//       const newDeliveryStatus = data.data?.deliveryStatus || 
//                                 data.data?.trackingStatus || 
//                                 data.data?.status || 
//                                 'pending';
      
//       console.log('📌 New delivery status from tracking:', newDeliveryStatus);
      
//       // ✅ Update the order in the state
//       setOrders(prevOrders => 
//         prevOrders.map(order => {
//           if (order._id === orderId) {
//             let newOrderStatus = order.orderStatus;
            
//             // ✅ If delivered, update order status
//             if (newDeliveryStatus === 'delivered' && order.orderStatus !== 'delivered') {
//               newOrderStatus = 'delivered';
//               toast.success(`✅ Order ${order.orderNumber || order._id.slice(-8).toUpperCase()} delivered!`);
//             }
            
//             // ✅ If courier_assigned, keep it as courier_assigned
//             if (order.orderStatus === 'courier_assigned' && newDeliveryStatus !== 'delivered') {
//               newOrderStatus = 'courier_assigned';
//             }
            
//             return {
//               ...order,
//               orderStatus: newOrderStatus,
//               deliveryService: {
//                 ...order.deliveryService,
//                 deliveryStatus: newDeliveryStatus,
//                 history: data.data?.history || order.deliveryService?.deliveryStatusHistory || [],
//                 ...data.data
//               }
//             };
//           }
//           return order;
//         })
//       );
      
//       setDeliveryStatuses(prev => ({
//         ...prev,
//         [orderId]: newDeliveryStatus
//       }));
      
//       toast.success('Delivery status refreshed');
//     } else {
//       toast.warning(data.error || 'Failed to refresh delivery status');
//     }
//   } catch (error) {
//     console.error('Refresh delivery status error:', error);
//     toast.error('Failed to refresh delivery status');
//   } finally {
//     setRefreshingOrders(prev => ({ ...prev, [orderId]: false }));
//   }
// };

//   const toggleOrderSelection = (order) => {
//     setSelectedOrdersList(prev => {
//       const exists = prev.find(o => o._id === order._id);
//       if (exists) {
//         return prev.filter(o => o._id !== order._id);
//       } else {
//         return [...prev, order];
//       }
//     });
//   };

//   const toggleBulkDeleteMode = () => {
//     if (showCheckboxes) {
//       setShowCheckboxes(false);
//       setSelectedOrdersList([]);
//       setSelectAll(false);
//     } else {
//       setShowCheckboxes(true);
//       setSelectedOrdersList([]);
//       setSelectAll(false);
//     }
//   };

//   const handleBulkDeleteSuccess = () => {
//     fetchOrders();
//     fetchStats();
//     setSelectedOrdersList([]);
//     setSelectAll(false);
//     setShowCheckboxes(false);
//   };

//   const handleStatusUpdate = () => {
//     fetchOrders();
//     fetchStats();
//   };

//   const handlePaymentUpdate = () => {
//     fetchOrders();
//     fetchStats();
//   };

//   const handleEditOrder = () => {
//     fetchOrders();
//     fetchStats();
//   };

//   const handleDeleteOrder = () => {
//     fetchOrders();
//     fetchStats();
//   };

//   const handleDownloadInvoice = async (order) => {
//     setDownloadingOrders(prev => ({ ...prev, [order._id]: true }));
//     try {
//       await generateInvoicePDF(order);
//       toast.success('Invoice downloaded successfully!');
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.error('Failed to download invoice');
//     } finally {
//       setDownloadingOrders(prev => ({ ...prev, [order._id]: false }));
//     }
//   };

//   const handleRefreshTracking = async (orderId) => {
//     setRefreshLoading(true);
//     try {
//       await refreshSingleOrderDelivery(orderId);
//       const updatedOrder = orders.find(o => o._id === orderId);
//       if (updatedOrder && updatedOrder.deliveryService) {
//         setTrackingInfo({
//           ...trackingInfo,
//           deliveryStatus: updatedOrder.deliveryService.deliveryStatus,
//           ...updatedOrder.deliveryService
//         });
//       }
//     } finally {
//       setRefreshLoading(false);
//     }
//   };

//   const handleTrackDelivery = async (order) => {
//     if (!order.deliveryService?.trackingNumber) {
//       toast.error('No tracking number available');
//       return;
//     }

//     setTrackingLoading(prev => ({ ...prev, [order._id]: true }));

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/tracking`,
//         {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }
//       );

//       const data = await response.json();
      
//       if (data.success) {
//         setTrackingInfo({
//           ...data.data,
//           trackingNumber: order.deliveryService.trackingNumber,
//           courierName: order.deliveryService.courierName,
//           courierSlug: order.deliveryService.courierSlug,
//           trackingUrl: order.deliveryService.trackingUrl,
//           deliveryStatus: data.data.deliveryStatus || order.deliveryService.deliveryStatus
//         });
//         setShowTrackingModal(true);
//       } else {
//         setTrackingInfo({
//           trackingNumber: order.deliveryService.trackingNumber,
//           courierName: order.deliveryService.courierName,
//           courierSlug: order.deliveryService.courierSlug,
//           trackingUrl: order.deliveryService.trackingUrl,
//           deliveryStatus: order.deliveryService.deliveryStatus,
//           history: [],
//           message: data.message || 'Tracking info not available'
//         });
//         setShowTrackingModal(true);
//         toast.warning('Showing basic tracking info. API details not available.');
//       }
//     } catch (error) {
//       console.error('Track delivery error:', error);
//       setTrackingInfo({
//         trackingNumber: order.deliveryService.trackingNumber,
//         courierName: order.deliveryService.courierName,
//         courierSlug: order.deliveryService.courierSlug,
//         trackingUrl: order.deliveryService.trackingUrl,
//         deliveryStatus: order.deliveryService.deliveryStatus,
//         history: [],
//         error: error.message
//       });
//       setShowTrackingModal(true);
//       toast.error('Failed to get tracking details, showing basic info');
//     } finally {
//       setTrackingLoading(prev => ({ ...prev, [order._id]: false }));
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-BD', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const exportToCSV = () => {
//     const headers = ['Order ID', 'Customer', 'Phone', 'Division', 'City', 'Upazila/Thana', 'Total', 'Status', 'Payment Status', 'Payment Method', 'Date'];
//     const rows = orders.map(order => [
//       order.orderNumber || order._id.slice(-8).toUpperCase(),
//       order.customerInfo?.fullName || '',
//       order.customerInfo?.phone || '',
//       order.customerInfo?.division || '',
//       order.customerInfo?.city || '',
//       order.customerInfo?.zone || '',
//       order.total || 0,
//       ORDER_STATUSES.find(s => s.value === order.orderStatus)?.label || order.orderStatus,
//       PAYMENT_STATUSES.find(p => p.value === order.paymentStatus)?.label || order.paymentStatus,
//       order.paymentMethod === 'cod' ? 'COD' : order.paymentMethod === 'online' ? 'Online' : order.paymentMethod,
//       formatDate(order.createdAt)
//     ]);
    
//     const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//     toast.success('CSV exported successfully');
//   };

//   const getStatusBadge = (status) => {
//     const statusInfo = ORDER_STATUSES.find(s => s.value === status);
//     if (!statusInfo) return <span className="px-1.5 py-0.5 rounded-full text-xs bg-[#E2E7EA] text-black border border-[#82947A]/30">{status}</span>;
//     return (
//       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${statusInfo.color}`}>
//         <statusInfo.icon className="w-2.5 h-2.5" />
//         {statusInfo.label}
//       </span>
//     );
//   };

//   const getPaymentBadge = (status) => {
//     const paymentInfo = PAYMENT_STATUSES.find(p => p.value === status);
//     return (
//       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${paymentInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'}`}>
//         <FaMoneyBillWave className="w-2.5 h-2.5" />
//         {paymentInfo?.label || status}
//       </span>
//     );
//   };

//   const getPaymentMethodBadge = (method) => {
//     const methods = {
//       'cod': { label: 'COD', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaMoneyBillWave },
//       'online': { label: 'Online', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaCreditCard },
//       'bkash': { label: 'bKash', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaMobileAlt },
//       'nagad': { label: 'Nagad', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaMobileAlt }
//     };
    
//     const info = methods[method] || { label: method || 'Unknown', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaMoneyBillWave };
//     const Icon = info.icon;
    
//     return (
//       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${info.color}`}>
//         <Icon className="w-2.5 h-2.5" />
//         {info.label}
//       </span>
//     );
//   };

//   const StatCard = ({ title, value, icon, color }) => (
//     <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#82947A]/20">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-xs text-[#64748B] font-medium">{title}</p>
//           <p className="text-xl font-bold text-black">{value?.toLocaleString() || 0}</p>
//         </div>
//         <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <ProtectedRoute pageKey="all_orders">
//     <>
//       <div className="min-h-screen bg-pink-100/20 pb-12 pt-6">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-[#82947A] rounded-xl flex items-center justify-center shadow-lg shadow-[#82947A]/25">
//                 <FaBox className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: '"Playfair Display"' }}>
//                   Order Management
//                 </h1>
//                 <p className="text-sm text-[#64748B] mt-0.5">Manage and track all orders</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={exportToCSV}
//                 className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#82947A] to-[#485442] text-white rounded-xl hover:shadow-lg hover:shadow-[#82947A]/25 transition-all text-sm font-medium shadow-sm"
//               >
//                 <FaDownload className="w-4 h-4" />
//                 Export CSV
//               </button>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           {stats ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
//               <StatCard title="Total Orders" value={stats.totalOrders} icon={<FaBox className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
//               <StatCard title="Placed" value={stats.placedOrders || 0} icon={<FaClock className="w-5 h-5 text-black" />} color="bg-[#E2E7EA]" />
//               <StatCard title="Follow Up" value={stats.followUpOrders || 0} icon={<FaHeadset className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
//               <StatCard title="Accepted" value={stats.acceptedOrders || 0} icon={<FaCheckCircle className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
//               <StatCard title="Approved" value={stats.approvedOrders || 0} icon={<FaCheckDouble className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
//               <StatCard title="On Hold" value={stats.holdOrders || 0} icon={<FaClock className="w-5 h-5 text-yellow-600" />} color="bg-yellow-100" />
//               <StatCard title="Processing" value={stats.processingOrders || 0} icon={<FaSpinner className="w-5 h-5 text-[#82947A]" />} color="bg-blue-100" />
//               <StatCard title="Courier Assigned" value={stats.courierAssignedOrders || 0} icon={<FaTruck className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
//               <StatCard title="Partial Delivery" value={stats.partialDeliveryOrders || 0} icon={<FaCheckDouble className="w-5 h-5 text-yellow-600" />} color="bg-yellow-100" />
//               <StatCard title="Delivered" value={stats.deliveredOrders || 0} icon={<FaCheckDouble className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
//               <StatCard title="Cancelled" value={stats.cancelledOrders || 0} icon={<FaBan className="w-5 h-5 text-red-500" />} color="bg-red-50" />
//               <StatCard title="Returned" value={stats.returnedOrders || 0} icon={<FaUndo className="w-5 h-5 text-purple-500" />} color="bg-purple-50" />
//               <StatCard title="Revenue" value={stats.totalRevenue} icon={<FaMoneyBillWave className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-13 gap-4 mb-6">
//               {[...Array(13)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-[#82947A]/20 animate-pulse">
//                   <div className="h-4 bg-[#E2E7EA] rounded w-1/2 mb-2"></div>
//                   <div className="h-8 bg-[#E2E7EA] rounded w-3/4"></div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Filters */}
//           <div className="bg-white rounded-2xl border border-[#82947A]/30 p-4 mb-6 shadow-sm">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search by Order ID, Customer Name, Email or Phone..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-10 pr-10 py-2 border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black placeholder:text-[#64748B]"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => {
//                       setSearchTerm('');
//                       setCurrentPage(1);
//                     }}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] hover:text-[#82947A]"
//                   >
//                     <FaTimes className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => {
//                   setStatusFilter(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="px-4 py-2 border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black text-sm"
//               >
//                 <option value="">All Order Status</option>
//                 {ORDER_STATUSES.map(status => (
//                   <option key={status.value} value={status.value}>{status.label}</option>
//                 ))}
//               </select>
              
//               <select
//                 value={paymentFilter}
//                 onChange={(e) => {
//                   setPaymentFilter(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="px-4 py-2 border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black text-sm"
//               >
//                 <option value="">All Payment Status</option>
//                 {PAYMENT_STATUSES.map(status => (
//                   <option key={status.value} value={status.value}>{status.label}</option>
//                 ))}
//               </select>
              
//               <select
//                 value={sortBy}
//                 onChange={(e) => {
//                   setSortBy(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="px-4 py-2 border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black text-sm"
//               >
//                 <option value="-createdAt">Newest First</option>
//                 <option value="createdAt_asc">Oldest First</option>
//                 <option value="-total">Highest Total</option>
//                 <option value="total_asc">Lowest Total</option>
//               </select>
//             </div>
//           </div>

//           {/* Status Tabs */}
//           <div className="mb-6">
//             <div className="flex flex-wrap gap-2 border-b border-[#82947A]/30 pb-2">
//               {statusTabs.map((tab) => (
//                 <button
//                   key={tab.value}
//                   onClick={() => {
//                     setActiveStatusTab(tab.value);
//                     setCurrentPage(1);
//                   }}
//                   className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${
//                     activeStatusTab === tab.value
//                       ? 'bg-gradient-to-r from-[#82947A] to-[#485442] text-white shadow-lg shadow-[#82947A]/25'
//                       : 'bg-white text-[#64748B] hover:bg-[#E2E7EA] border border-[#82947A]/30'
//                   }`}
//                 >
//                   <span className={`w-2 h-2 rounded-full ${tab.color}`}></span>
//                   {tab.label}
//                   <span className={`px-1.5 py-0.5 rounded-full text-xs ${
//                     activeStatusTab === tab.value
//                       ? 'bg-white/20 text-white'
//                       : 'bg-[#E2E7EA] text-[#64748B]'
//                   }`}>
//                     {tab.count}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Orders Table */}
//           <div className="bg-white rounded-2xl border border-[#82947A]/30 shadow-sm overflow-hidden">
//             {/* Bulk Delete Toolbar */}
//             {isAdminOrSuperAdmin && (
//               <div className="px-4 py-3 border-b border-[#82947A]/30 bg-[#E2E7EA]/30 flex flex-wrap items-center justify-between gap-3">
//                 <div className="flex items-center gap-3">
//                   {showCheckboxes ? (
//                     <>
//                       <button
//                         onClick={toggleBulkDeleteMode}
//                         className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all text-sm font-medium"
//                       >
//                         <FaTimes className="w-4 h-4" />
//                         Cancel Selection
//                       </button>
//                       <span className="text-sm text-[#64748B]">
//                         {selectedOrdersList.length} order{selectedOrdersList.length !== 1 ? 's' : ''} selected
//                       </span>
//                       {selectedOrdersList.length > 0 && (
//                         <button
//                           onClick={() => setShowBulkDeleteModal(true)}
//                           className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all text-sm font-medium"
//                         >
//                           <FaTrash className="w-4 h-4" />
//                           Delete Selected ({selectedOrdersList.length})
//                         </button>
//                       )}
//                     </>
//                   ) : (
//                     <button
//                       onClick={toggleBulkDeleteMode}
//                       className="flex items-center gap-2 px-4 py-2 bg-[#E2E7EA] text-black rounded-xl hover:bg-[#82947A]/10 transition-all text-sm font-medium"
//                     >
//                       <FaTrash className="w-4 h-4" />
//                       Delete Multiple
//                     </button>
//                   )}
//                 </div>
                
//                 {showCheckboxes && selectedOrdersList.length > 0 && (
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setSelectAll(!selectAll)}
//                       className="text-sm text-[#82947A] hover:underline"
//                     >
//                       {selectAll ? 'Deselect All' : 'Select All'}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
            
//             {/* Table Container */}
//             <div className="w-full overflow-x-auto">
//               <table className="w-full min-w-[1200px] lg:min-w-full">
//                 <thead className="bg-[#E2E7EA]/50 border-b border-[#82947A]/30">
//                   <tr>
//                     {isAdminOrSuperAdmin && showCheckboxes && (
//                       <th className="px-2 py-2 text-center sticky left-0 bg-[#E2E7EA]/50 z-10">
//                         <button
//                           onClick={() => setSelectAll(!selectAll)}
//                           className="text-[#64748B] hover:text-[#82947A] transition-colors"
//                         >
//                           {selectAll ? (
//                             <FaCheckSquare className="w-4 h-4 text-[#82947A]" />
//                           ) : (
//                             <FaSquare className="w-4 h-4" />
//                           )}
//                         </button>
//                       </th>
//                     )}
//                     <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">Order ID</th>
//                     <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">Customer</th>
//                     <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">Phone</th>
//                     <th className="px-2 py-2 text-right text-xs font-semibold text-[#64748B] whitespace-nowrap">Total</th>
//                     <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">Status</th>
//                     <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">Payment</th>
//                     <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">Method</th>
//                     <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">Delivery</th>
//                     <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">Date</th>
//                     <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr><td colSpan={isAdminOrSuperAdmin && showCheckboxes ? 11 : 10} className="px-4 py-8 text-center"><div className="flex justify-center"><div className="w-6 h-6 border-3 border-[#82947A] border-t-transparent rounded-full animate-spin"></div></div></td></tr>
//                   ) : orders.length === 0 ? (
//                     <tr><td colSpan={isAdminOrSuperAdmin && showCheckboxes ? 11 : 10} className="px-4 py-8 text-center text-[#64748B] text-sm">No orders found</td></tr>
//                   ) : (
//                     orders.map((order) => {
//                       const isSelected = selectedOrdersList.some(o => o._id === order._id);
//                       const hasDelivery = order.deliveryService?.courierOrderId;
//                       const isCancelled = order.orderStatus === 'cancelled';
//                       const canCreateDelivery = order.orderStatus === 'ready_to_ship' && !hasDelivery && !isCancelled;
//                       const isTerminal = ['cancelled', 'delivered', 'returned', 'rejected'].includes(order.orderStatus);
                      
//                       return (
//                         <tr key={order._id} className="border-b border-[#82947A]/20 hover:bg-[#E2E7EA]/30 transition-colors">
//                           {isAdminOrSuperAdmin && showCheckboxes && (
//                             <td className="px-2 py-2 text-center sticky left-0 bg-white z-10">
//                               <button
//                                 onClick={() => toggleOrderSelection(order)}
//                                 className="text-[#64748B] hover:text-[#82947A] transition-colors"
//                               >
//                                 {isSelected ? (
//                                   <FaCheckSquare className="w-4 h-4 text-[#82947A]" />
//                                 ) : (
//                                   <FaSquare className="w-4 h-4" />
//                                 )}
//                               </button>
//                             </td>
//                           )}
//                           <td className="px-2 py-2 text-xs font-mono text-black whitespace-nowrap">{order.orderNumber || order._id.slice(-8).toUpperCase()}</td>
//                           <td className="px-2 py-2 text-xs">
//                             <div className="font-medium truncate max-w-[150px] text-black">{order.customerInfo?.fullName}</div>
//                             <div className="text-[#64748B] text-xs truncate max-w-[150px]">{order.customerInfo?.email}</div>
//                           </td>
//                           <td className="px-2 py-2 text-xs text-black whitespace-nowrap">{order.customerInfo?.phone}</td>
//                           <td className="px-2 py-2 text-xs text-right font-bold text-[#82947A] whitespace-nowrap">৳{order.total?.toFixed(2)}</td>
//                           <td className="px-2 py-2 text-center">
//                             <button 
//                               onClick={() => { 
//                                 setSelectedOrder(order); 
//                                 setShowStatusModal(true); 
//                               }} 
//                               className="hover:opacity-80 transition-opacity"
//                               disabled={isTerminal}
//                             >
//                               {getStatusBadge(order.orderStatus)}
//                             </button>
//                             {isTerminal && (
//                               <span className="block text-[8px] text-[#64748B]">(Final)</span>
//                             )}
//                           </td>
//                           <td className="px-2 py-2 text-center">
//                             <button onClick={() => { setSelectedOrder(order); setShowPaymentModal(true); }} className="hover:opacity-80 transition-opacity">
//                               {getPaymentBadge(order.paymentStatus)}
//                             </button>
//                           </td>
//                           <td className="px-2 py-2 text-center">{getPaymentMethodBadge(order.paymentMethod)}</td>
                          
                          
//                           {/* ========== DELIVERY COLUMN ========== */}
// <td className="px-2 py-2 text-center">
//   {hasDelivery ? (
//     <div className="flex flex-col items-center gap-0.5 min-w-[100px]">
//       <span className="text-xs font-medium text-black">
//         {order.deliveryService.courierName}
//       </span>
      
//       <div className="flex items-center gap-1">
//         <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] ${getStatusColor(order.deliveryService.deliveryStatus)}`}>
//           {getStatusDisplay(order.deliveryService.deliveryStatus)}
//         </span>
        
//         <button
//           onClick={() => refreshSingleOrderDelivery(order._id)}
//           className="text-[10px] text-[#82947A] hover:text-[#0891B2] transition-colors"
//           disabled={refreshingOrders[order._id]}
//           title="Refresh delivery status"
//         >
//           {refreshingOrders[order._id] ? (
//             <FaSpinner className="w-2.5 h-2.5 animate-spin" />
//           ) : (
//             <FaSync className="w-2.5 h-2.5" />
//           )}
//         </button>
        
//         {order.deliveryService.trackingNumber && (
//           <button
//             onClick={() => {
//               setSelectedOrder(order);
//               handleTrackDelivery(order);
//             }}
//             className="text-[10px] text-[#82947A] hover:underline flex items-center gap-1"
//             disabled={trackingLoading[order._id]}
//           >
//             {trackingLoading[order._id] ? (
//               <FaSpinner className="w-3 h-3 animate-spin" />
//             ) : (
//               <>
//                 <FaSearch className="w-2.5 h-2.5" />
//                 Track
//               </>
//             )}
//           </button>
//         )}
//       </div>
      
//       {order.deliveryService.trackingUrl && (
//         <a
//           href={order.deliveryService.trackingUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-[10px] text-[#64748B] hover:text-[#82947A] flex items-center gap-1"
//           title={`Track on ${order.deliveryService.courierName}`}
//         >
//           <FaExternalLinkAlt className="w-2.5 h-2.5" />
//           <span>Track on {order.deliveryService.courierName}</span>
//         </a>
//       )}
//     </div>
//   ) : (
//     (() => {
//       // ========== STATUSES THAT CAN CREATE DELIVERY ==========
//       const canCreateDeliveryStatuses = ['approved', 'processing', 'hold', 'ready_to_ship', 'accepted'];
//       const canCreate = canCreateDeliveryStatuses.includes(order.orderStatus) && !isCancelled;
      
//       if (canCreate) {
//         return (
//           <button
//             onClick={() => { setSelectedOrder(order); setShowDeliveryModal(true); }}
//             className="inline-flex items-center gap-1 px-2 py-1 bg-[#82947A] text-white text-[10px] rounded hover:bg-[#485442] transition-colors whitespace-nowrap"
//           >
//             <FaTruck className="w-3 h-3" />
//             Create Delivery
//           </button>
//         );
//       } else if (isCancelled) {
//         return <span className="text-xs text-gray-400">Cancelled</span>;
//       } else {
//         return <span className="text-xs text-gray-400 whitespace-nowrap">Not available</span>;
//       }
//     })()
//   )}
// </td>
                          
//                           <td className="px-2 py-2 text-xs text-[#64748B] whitespace-nowrap">
//                             {formatDate(order.createdAt)}
//                           </td>
//                           <td className="px-2 py-2 text-center">
//                             <div className="flex items-center justify-center gap-1 whitespace-nowrap">
//                               <button onClick={() => { setSelectedOrder(order); setShowDetailsModal(true); }} className="p-1 text-[#82947A] hover:bg-[#E2E7EA] rounded transition-colors" title="View Details">
//                                 <FaEye className="w-3.5 h-3.5" />
//                               </button>
                              
//                               <button
//                                 onClick={() => handleDownloadInvoice(order)}
//                                 disabled={downloadingOrders[order._id]}
//                                 className="p-1 text-[#82947A] hover:bg-[#E2E7EA] rounded transition-colors disabled:opacity-50" title="Download Invoice"
//                               >
//                                 {downloadingOrders[order._id] ? (
//                                   <FaSpinner className="w-3.5 h-3.5 animate-spin" />
//                                 ) : (
//                                   <FaDownload className="w-3.5 h-3.5" />
//                                 )}
//                               </button>
//                               <button onClick={() => { setSelectedOrder(order); setShowEditModal(true); }} className="p-1 text-black hover:bg-[#E2E7EA] rounded transition-colors" title="Edit Order">
//                                 <FaEdit className="w-3.5 h-3.5" />
//                               </button>

//                               <button
//                                 onClick={() => {
//                                   setSelectedOrderForScore(order);
//                                   setShowCourierScoreModal(true);
//                                 }}
//                                 className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
//                                 title="View Courier Score"
//                               >
//                                 <FaChartLine className="w-3.5 h-3.5" />
//                               </button>
//                               {isAdminOrSuperAdmin && !showCheckboxes && (
//                                 <button 
//                                   onClick={() => { setSelectedOrder(order); setShowDeleteModal(true); }} 
//                                   className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors" 
//                                   title="Delete Order"
//                                 >
//                                   <FaTrash className="w-3.5 h-3.5" />
//                                 </button>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-3 py-2 border-t border-[#82947A]/30 flex flex-wrap items-center justify-between gap-3 bg-[#E2E7EA]/20">
//                 <p className="text-xs text-[#64748B]">Showing {orders.length} of {totalOrders} orders</p>
//                 <div className="flex gap-1">
//                   <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 border border-[#82947A]/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-black">
//                     <FaChevronLeft className="w-3 h-3" />
//                   </button>
//                   <span className="px-2 py-1 text-xs text-black">Page {currentPage} of {totalPages}</span>
//                   <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 border border-[#82947A]/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-black">
//                     <FaChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <StatusUpdateModal 
//         isOpen={showStatusModal} 
//         onClose={() => setShowStatusModal(false)} 
//         order={selectedOrder} 
//         onUpdate={handleStatusUpdate}
//         userRole={userRole}
//       />
      
//       <PaymentStatusModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} order={selectedOrder} onUpdate={handlePaymentUpdate} />
      
//       <OrderDetailsModal 
//         isOpen={showDetailsModal} 
//         onClose={() => setShowDetailsModal(false)} 
//         order={selectedOrder} 
//         onStatusUpdate={() => { setShowDetailsModal(false); setShowStatusModal(true); }} 
//         onPaymentUpdate={() => { setShowDetailsModal(false); setShowPaymentModal(true); }}
//         onDownloadInvoice={handleDownloadInvoice}
//       />
      
//       <EditOrderModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} order={selectedOrder} onUpdate={handleEditOrder} userRole={userRole} />
      
//       <DeleteConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} order={selectedOrder} onDelete={handleDeleteOrder} />
      
//       <BulkDeleteModal 
//         isOpen={showBulkDeleteModal} 
//         onClose={() => setShowBulkDeleteModal(false)} 
//         selectedOrders={selectedOrdersList}
//         onDelete={handleBulkDeleteSuccess}
//       />

//       <QuickDeliveryModal
//         isOpen={showDeliveryModal}
//         onClose={() => setShowDeliveryModal(false)}
//         order={selectedOrder}
//         onDeliveryCreated={() => {
//           setShowDeliveryModal(false);
//           fetchOrders();
//           fetchStats();
//         }}
//       />

//       <TrackingModal
//         isOpen={showTrackingModal}
//         onClose={() => setShowTrackingModal(false)}
//         trackingInfo={trackingInfo}
//         order={selectedOrder}
//         onRefreshTracking={() => handleRefreshTracking(selectedOrder?._id)}
//         refreshLoading={refreshLoading}
//       />

//       <CourierScoreModal
//         isOpen={showCourierScoreModal}
//         onClose={() => {
//           setShowCourierScoreModal(false);
//           setSelectedOrderForScore(null);
//         }}
//         order={selectedOrderForScore}
//       />
//     </>
//     </ProtectedRoute>
//   );
// }



'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

import { 
  FaBox,
  FaSearch,
  FaEye,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMoneyBillWave,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDownload,
  FaPrint,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaShippingFast,
  FaCheckDouble,
  FaBan,
  FaUndo,
  FaFileInvoice,
  FaExclamationTriangle,
  FaTrash,
  FaSave,
  FaTimes,
  FaCreditCard,
  FaMobileAlt,
  FaCity,
  FaMapPin,
  FaHome,
  FaChevronDown,
  FaHeart,
  FaStar,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaShieldAlt,
  FaGlobe,
  FaLaptop,
  FaTablet,
  FaMobile,
  FaDesktop,
  FaInfoCircle,
  FaPhoneAlt,
  FaUserCircle,
  FaTruck,
  FaStore,
  FaBuilding,
  FaTag,
  FaPercent,
  FaUserTag,
  FaClipboardList,
  FaHeadset,
  FaCheckSquare,
  FaSquare,
  FaExternalLinkAlt,
  FaWeightHanging,
  FaFileAlt,
  FaChartLine,
  FaPlus,
  FaMinus,
  FaSync
} from 'react-icons/fa';
import { generateInvoicePDF } from '@/utils/invoicePDF';
import QuickDeliveryModal from '@/app/components/QuickDeliveryModal';
import CourierScoreModal from '@/app/components/CourierScoreModal';
import ProtectedRoute from '@/app/components/ProtectedRoute';



// ========== ORDER STATUSES - UPDATED ==========
const ORDER_STATUSES = [
  // Initial statuses
  { value: 'placed', label: 'Placed', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaClock, nextStatuses: ['follow_up', 'approved', 'hold', 'processing', 'cancelled'] },
  { value: 'follow_up', label: 'Follow Up', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaHeadset, nextStatuses: ['accepted', 'rejected', 'cancelled', 'reminder'] },
  { value: 'reminder', label: 'Reminder', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaClock, nextStatuses: ['accepted', 'rejected', 'cancelled'] },
  
  // Main statuses
  { value: 'accepted', label: 'Accepted', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaCheckCircle, nextStatuses: ['approved', 'processing', 'hold', 'cancelled'] },
  { value: 'approved', label: 'Approved', color: 'bg-[#82947A]/10 text-[#82947A] border-[#82947A]/30', icon: FaCheckDouble, nextStatuses: ['processing', 'hold', 'cancelled', 'courier_assigned'] },
  
  // HOLD status
  { value: 'hold', label: 'On Hold', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', icon: FaClock, nextStatuses: ['approved', 'processing', 'cancelled', 'courier_assigned'] },
  
  // PROCESSING
  { value: 'processing', label: 'Processing', color: 'bg-blue-50 text-[#82947A] border-blue-200', icon: FaSpinner, nextStatuses: ['hold', 'cancelled', 'courier_assigned'] },
  
  // COURIER ASSIGNED
  { value: 'courier_assigned', label: 'Courier Assigned', color: 'bg-[#82947A]/10 text-[#82947A] border-[#82947A]/30', icon: FaTruck, nextStatuses: ['ready_to_ship', 'partial_delivery', 'delivered', 'returned', 'cancelled'] },
  
  // PARTIAL DELIVERY
  { value: 'partial_delivery', label: 'Partial Delivery', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: FaCheckDouble, nextStatuses: ['delivered', 'returned', 'cancelled'] },
  
  { value: 'ready_to_ship', label: 'Ready to Ship', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaBox, nextStatuses: ['partial_delivery', 'delivered', 'returned', 'cancelled'] },
  
  // Terminal statuses - NO nextStatuses allowed
  { value: 'rejected', label: 'Rejected', color: 'bg-orange-50 text-orange-600 border-orange-200', icon: FaTimesCircle, nextStatuses: [] },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-600 border-red-200', icon: FaBan, nextStatuses: [] },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-50 text-green-600 border-green-200', icon: FaCheckDouble, nextStatuses: [] },
  { value: 'returned', label: 'Returned', color: 'bg-purple-50 text-purple-600 border-purple-200', icon: FaUndo, nextStatuses: [] },
  
  // Courier handled - not shown in manual dropdown
  { value: 'shipped', label: 'Shipped', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaShippingFast, nextStatuses: [] },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaTruck, nextStatuses: [] },
];

const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30' },
  { value: 'paid', label: 'Paid', color: 'bg-[#82947A]/10 text-[#82947A] border-[#82947A]/30' },
  { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-600 border-red-200' },
  { value: 'refunded', label: 'Refunded', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30' }
];

// ========== DELIVERY STATUSES ==========
const DELIVERY_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-gray-100 text-gray-800' },
  { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-[#485442]' },
  { value: 'picked_up', label: 'Picked Up', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'in_transit', label: 'In Transit', color: 'bg-purple-100 text-purple-800' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-orange-100 text-orange-800' },
  { value: 'delivered', label: 'Delivered ✅', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled ❌', color: 'bg-red-100 text-red-800' },
  { value: 'failed', label: 'Failed ❌', color: 'bg-red-200 text-red-900' },
  { value: 'returned', label: 'Returned 🔄', color: 'bg-gray-200 text-gray-800' },
  { value: 'accepted', label: 'Accepted', color: 'bg-blue-100 text-[#485442]' },
  { value: 'pickup', label: 'Picked Up', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'pickup.requested', label: 'Pickup Requested', color: 'bg-blue-100 text-[#485442]' },
  { value: 'assigned.for.pickup', label: 'Assigned For Pickup', color: 'bg-blue-100 text-[#485442]' },
  { value: 'pickup.failed', label: 'Pickup Failed', color: 'bg-red-100 text-red-800' },
  { value: 'pickup.cancelled', label: 'Pickup Cancelled', color: 'bg-red-100 text-red-800' },
  { value: 'at.the.sorting.hub', label: 'At Sorting Hub', color: 'bg-purple-100 text-purple-800' },
  { value: 'in.transit', label: 'In Transit', color: 'bg-purple-100 text-purple-800' },
  { value: 'received.at.last.mile.hub', label: 'Received at Last Mile Hub', color: 'bg-purple-100 text-purple-800' },
  { value: 'assigned.for.delivery', label: 'Assigned for Delivery', color: 'bg-orange-100 text-orange-800' },
  { value: 'partial.delivery', label: 'Partial Delivery', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'delivery.failed', label: 'Delivery Failed', color: 'bg-red-100 text-red-800' },
  { value: 'on.hold', label: 'On Hold', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'return', label: 'Return', color: 'bg-gray-200 text-gray-800' },
  { value: 'paid.return', label: 'Paid Return', color: 'bg-gray-200 text-gray-800' },
  { value: 'exchange', label: 'Exchange', color: 'bg-blue-100 text-[#485442]' },
  { value: 'returned.to.merchant', label: 'Returned To Merchant', color: 'bg-gray-200 text-gray-800' },
  { value: 'ready-for-delivery', label: 'Ready for Delivery', color: 'bg-blue-100 text-[#485442]' },
  { value: 'delivery-in-progress', label: 'Delivery In Progress', color: 'bg-orange-100 text-orange-800' },
  { value: 'agent-hold', label: 'Agent Hold', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'agent-returning', label: 'Agent Returning', color: 'bg-gray-200 text-gray-800' },
  { value: 'agent-area-change', label: 'Agent Area Change', color: 'bg-blue-100 text-[#485442]' },
  { value: 'partial_delivered', label: 'Partial Delivered', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'unknown', label: 'Unknown', color: 'bg-gray-100 text-gray-800' },
];

// ========== STATUS DISPLAY MAPPING ==========
const STATUS_DISPLAY = {
  'order.created': 'Order Created',
  'order.updated': 'Order Updated',
  'pickup.requested': 'Pickup Requested',
  'assigned.for.pickup': 'Assigned For Pickup',
  'pickup': 'Picked',
  'pickup.failed': 'Pickup Failed',
  'pickup.cancelled': 'Pickup Cancelled',
  'at.the.sorting.hub': 'At Sorting Hub',
  'in.transit': 'In Transit',
  'received.at.last.mile.hub': 'Received at Last Mile Hub',
  'assigned.for.delivery': 'Assigned for Delivery',
  'delivered': 'Delivered ✅',
  'partial.delivery': 'Partial Delivery',
  'return': 'Return',
  'delivery.failed': 'Delivery Failed',
  'on.hold': 'On Hold',
  'payment.invoice': 'Payment Invoice',
  'paid.return': 'Paid Return',
  'exchange': 'Exchange',
  'return.id.created': 'Return ID Created',
  'return.in.transit': 'Return In Transit',
  'returned.to.merchant': 'Returned To Merchant',
  'ready-for-delivery': 'Ready for Delivery',
  'delivery-in-progress': 'Delivery In Progress',
  'agent-hold': 'Agent Hold',
  'agent-returning': 'Agent Returning',
  'returned': 'Returned',
  'agent-area-change': 'Agent Area Change',
  'pending': 'Pending',
  'partial_delivered': 'Partial Delivered',
  'cancelled': 'Cancelled',
  'unknown': 'Unknown',
};

// ========== STATUS COLOR MAPPING ==========
const STATUS_COLORS = {
  'order.created': 'bg-blue-100 text-[#485442]',
  'order.updated': 'bg-blue-100 text-[#485442]',
  'pickup.requested': 'bg-blue-100 text-[#485442]',
  'assigned.for.pickup': 'bg-blue-100 text-[#485442]',
  'ready-for-delivery': 'bg-blue-100 text-[#485442]',
  'agent-area-change': 'bg-blue-100 text-[#485442]',
  'pending': 'bg-gray-100 text-gray-800',
  'unknown': 'bg-gray-100 text-gray-800',
  'pickup': 'bg-cyan-100 text-cyan-800',
  'at.the.sorting.hub': 'bg-purple-100 text-purple-800',
  'in.transit': 'bg-purple-100 text-purple-800',
  'received.at.last.mile.hub': 'bg-purple-100 text-purple-800',
  'assigned.for.delivery': 'bg-orange-100 text-orange-800',
  'delivery-in-progress': 'bg-orange-100 text-orange-800',
  'delivered': 'bg-green-100 text-green-800',
  'partial.delivery': 'bg-green-100 text-green-800',
  'partial_delivered': 'bg-green-100 text-green-800',
  'pickup.failed': 'bg-red-100 text-red-800',
  'pickup.cancelled': 'bg-red-100 text-red-800',
  'delivery.failed': 'bg-red-100 text-red-800',
  'cancelled': 'bg-red-100 text-red-800',
  'return': 'bg-gray-200 text-gray-800',
  'returned': 'bg-gray-200 text-gray-800',
  'agent-returning': 'bg-gray-200 text-gray-800',
  'paid.return': 'bg-gray-200 text-gray-800',
  'return.id.created': 'bg-gray-200 text-gray-800',
  'return.in.transit': 'bg-gray-200 text-gray-800',
  'returned.to.merchant': 'bg-gray-200 text-gray-800',
  'on.hold': 'bg-yellow-100 text-yellow-800',
  'agent-hold': 'bg-yellow-100 text-yellow-800',
};

// Helper function to get display status
const getStatusDisplay = (status) => {
  if (!status) return 'Unknown';
  const found = DELIVERY_STATUSES.find(s => s.value === status);
  if (found) return found.label;
  if (STATUS_DISPLAY[status]) return STATUS_DISPLAY[status];
  return status
    .replace(/\./g, ' ')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to get status color
const getStatusColor = (status) => {
  if (!status) return 'bg-gray-100 text-gray-800';
  const found = DELIVERY_STATUSES.find(s => s.value === status);
  if (found) return found.color;
  if (STATUS_COLORS[status]) return STATUS_COLORS[status];
  const statusLower = status.toLowerCase();
  if (statusLower.includes('delivered')) return 'bg-green-100 text-green-800';
  if (statusLower.includes('cancel')) return 'bg-red-100 text-red-800';
  if (statusLower.includes('fail')) return 'bg-red-100 text-red-800';
  if (statusLower.includes('return')) return 'bg-gray-200 text-gray-800';
  if (statusLower.includes('transit') || statusLower.includes('sorting')) return 'bg-purple-100 text-purple-800';
  if (statusLower.includes('pickup') || statusLower.includes('picked')) return 'bg-cyan-100 text-cyan-800';
  if (statusLower.includes('delivery')) return 'bg-orange-100 text-orange-800';
  if (statusLower.includes('hold')) return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-800';
};

// ========== SEARCHABLE SELECT ==========
const SearchableSelect = ({ name, value, onChange, options, placeholder, required, disabled, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (selectedValue) => {
    onChange({ target: { name, value: selectedValue } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onChange({ target: { name, value: '' } });
    setSearchTerm('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = value && options.includes(value) ? value : '';

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full px-3 py-2 border rounded-xl focus-within:ring-2 focus-within:ring-[#82947A] focus-within:border-transparent cursor-pointer flex items-center justify-between transition-all text-sm ${
          disabled ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white'
        } ${error ? 'border-red-500' : 'border-[#82947A]/30 hover:border-[#82947A]/60'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`text-sm ${selectedOption ? 'text-black font-medium' : 'text-[#64748B]'}`}>
          {selectedOption || placeholder}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {selectedOption && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-[#64748B] hover:text-[#82947A]"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          )}
          <FaChevronDown className={`w-3 h-3 text-[#64748B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#82947A]/30 rounded-xl shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-[#82947A]/20">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-3.5 h-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-1.5 border border-[#82947A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82947A] text-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-48">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-4 py-2 text-left hover:bg-[#E2E7EA] transition-colors text-sm text-black"
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-[#64748B] text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ========== DELETE CONFIRM MODAL ==========
const DeleteConfirmModal = ({ isOpen, onClose, order, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${order._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Order deleted successfully');
        onDelete();
        onClose();
      } else {
        toast.error(data.error || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Delete order error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="w-5 h-5" />
            <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Delete Order</h2>
          </div>
        </div>

        <div className="p-5 text-center">
          <p className="text-black text-sm mb-2">Are you sure you want to delete this order?</p>
          <p className="text-xs text-[#64748B]">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
          <p className="text-xs text-red-500 mt-3">⚠️ This action cannot be undone!</p>
        </div>

        <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
            Cancel
          </button>
          <button onClick={handleDelete} disabled={loading} className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaTrash className="w-3 h-3" />}
            Delete Order
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== BULK DELETE MODAL ==========
const BulkDeleteModal = ({ isOpen, onClose, selectedOrders, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [deleteCount, setDeleteCount] = useState(0);

  useEffect(() => {
    if (selectedOrders) {
      setDeleteCount(selectedOrders.length);
    }
  }, [selectedOrders]);

  const handleBulkDelete = async () => {
    if (selectedOrders.length === 0) {
      toast.error('No orders selected');
      return;
    }

    setLoading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      const token = localStorage.getItem('token');
      
      for (const order of selectedOrders) {
        try {
          const response = await fetch(`http://localhost:5000/api/orders/${order._id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          const data = await response.json();
          if (data.success) {
            successCount++;
          } else {
            failCount++;
          }
        } catch (err) {
          failCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`${successCount} order(s) deleted successfully`);
      }
      if (failCount > 0) {
        toast.error(`${failCount} order(s) failed to delete`);
      }
      
      onDelete();
      onClose();
    } catch (error) {
      console.error('Bulk delete error:', error);
      toast.error('Failed to delete orders');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="w-5 h-5" />
            <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Delete Multiple Orders</h2>
          </div>
        </div>

        <div className="p-5 text-center">
          <p className="text-black text-sm mb-2">
            Are you sure you want to delete <span className="font-bold text-red-600">{deleteCount}</span> order(s)?
          </p>
          <p className="text-xs text-[#64748B] mb-2">This action cannot be undone!</p>
          <div className="bg-[#E2E7EA]/50 rounded-lg p-2 max-h-[150px] overflow-y-auto">
            {selectedOrders.map((order, index) => (
              <p key={order._id} className="text-xs text-black py-0.5 border-b border-[#82947A]/10 last:border-0">
                #{order.orderNumber || order._id.slice(-8).toUpperCase()} - {order.customerInfo?.fullName}
              </p>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
            Cancel
          </button>
          <button onClick={handleBulkDelete} disabled={loading} className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
            {loading ? (
              <>
                <FaSpinner className="w-3 h-3 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <FaTrash className="w-3 h-3" />
                Delete All
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== TRACKING MODAL ==========
const TrackingModal = ({ isOpen, onClose, trackingInfo, order, onRefreshTracking, refreshLoading }) => {
  if (!isOpen) return null;

  const displayData = trackingInfo || order?.deliveryService || {};

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-[#82947A] to-black text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaTruck className="w-5 h-5" />
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
                Tracking Information
              </h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">
            Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
          </p>
        </div>

        <div className="p-4 space-y-3">
          <div className="bg-[#E2E7EA]/30 rounded-xl p-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Tracking Number:</span>
                <span className="font-mono text-black font-medium">
                  {displayData?.trackingNumber || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Courier:</span>
                <span className="text-black font-medium">
                  {displayData?.courierName || 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[#64748B]">Status:</span>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getStatusColor(displayData?.deliveryStatus)}`}>
                    {getStatusDisplay(displayData?.deliveryStatus)}
                  </span>
                  <button
                    onClick={onRefreshTracking}
                    disabled={refreshLoading}
                    className="text-[#82947A] hover:text-[#0891B2] transition-colors"
                    title="Refresh tracking"
                  >
                    {refreshLoading ? (
                      <FaSpinner className="w-3 h-3 animate-spin" />
                    ) : (
                      <FaSync className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
              
              {displayData?.trackingUrl && (
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Track Link:</span>
                  <a
                    href={displayData.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#82947A] hover:underline flex items-center gap-1"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                    Track on {displayData?.courierName || 'Courier'}
                  </a>
                </div>
              )}
            </div>
          </div>

          {displayData?.history && displayData.history.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-black mb-2 flex items-center gap-2">
                <FaClock className="w-4 h-4 text-[#82947A]" />
                Tracking History
              </h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {displayData.history.map((entry, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs border-b border-[#82947A]/10 pb-2 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-[#82947A] mt-1.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-black">{entry.message || entry.status}</p>
                      <p className="text-[#64748B] text-[10px]">
                        {entry.timestamp ? new Date(entry.timestamp).toLocaleString('en-BD', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'N/A'}
                      </p>
                      {entry.location && (
                        <p className="text-[#64748B] text-[10px]">📍 {entry.location}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {displayData?.error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <p className="text-xs text-yellow-700">
                <FaExclamationTriangle className="inline w-3 h-3 mr-1" />
                {displayData.error}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-[#82947A] text-white rounded-xl hover:bg-[#0891B2] transition-colors text-sm">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== STATUS UPDATE MODAL - UPDATED ==========
const StatusUpdateModal = ({ isOpen, onClose, order, onUpdate, userRole }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [courierService, setCourierService] = useState('');
  const [weight, setWeight] = useState(0.5);
  const [loading, setLoading] = useState(false);
  
  const [connectedCouriers, setConnectedCouriers] = useState([]);
  const [loadingCouriers, setLoadingCouriers] = useState(false);

  const fetchConnectedCouriers = useCallback(async () => {
    setLoadingCouriers(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/couriers`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        const connected = data.data.filter(c => c.apiEnabled && c.configured);
        setConnectedCouriers(connected);
      }
    } catch (error) {
      console.error('Fetch connected couriers error:', error);
    } finally {
      setLoadingCouriers(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchConnectedCouriers();
    }
  }, [isOpen, fetchConnectedCouriers]);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.orderStatus);
      setTrackingNumber(order.trackingNumber || '');
      setDeliveryNote(order.deliveryNote || '');
      setCancellationReason(order.cancellationReason || '');
      setRejectionReason(order.rejectionReason || '');
      setCourierService(order.deliveryService?.courierName || '');
      
      if (order.items && order.items.length > 0) {
        const totalWeight = order.items.reduce((sum, item) => {
          const itemWeight = item.weight || item.itemWeight || 0.5;
          return sum + (itemWeight * (item.quantity || 1));
        }, 0);
        setWeight(Math.max(0.5, totalWeight));
      }
    }
  }, [order]);

  const currentStatusInfo = ORDER_STATUSES.find(s => s.value === order?.orderStatus);
  const selectedStatusInfo = ORDER_STATUSES.find(s => s.value === selectedStatus);

  // ========== UPDATED: getAvailableNextStatuses ==========
  const getAvailableNextStatuses = () => {
    if (!order || !currentStatusInfo) return [];
    const currentStatus = order.orderStatus;
    
    const statusTransitions = {
      'placed': ['follow_up', 'approved', 'hold', 'processing', 'cancelled'],
      'follow_up': ['accepted', 'rejected', 'cancelled', 'reminder'],
      'reminder': ['accepted', 'rejected', 'cancelled'],
      'accepted': ['approved', 'processing', 'hold', 'cancelled'],
      'approved': ['processing', 'hold', 'cancelled', 'courier_assigned'],
      'hold': ['approved', 'processing', 'cancelled', 'courier_assigned'],
      'processing': ['hold', 'cancelled', 'courier_assigned'],
      'courier_assigned': ['ready_to_ship', 'partial_delivery', 'delivered', 'returned', 'cancelled'],
      'partial_delivery': ['delivered', 'returned', 'cancelled'],
      'ready_to_ship': ['delivered', 'partial_delivery', 'returned', 'cancelled'],
      'rejected': [],
      'cancelled': [],
      'delivered': [],
      'returned': [],
      'shipped': [],
      'out_for_delivery': []
    };
    
    let nextStatuses = statusTransitions[currentStatus] || [];
    
    if (userRole === 'moderator') {
      const readOnlyForModerator = ['follow_up', 'reminder', 'accepted'];
      if (readOnlyForModerator.includes(currentStatus)) {
        return [];
      }
      return nextStatuses;
    }
    
    return nextStatuses;
  };

  // ========== UPDATED: showCourierOption ==========
  const showCourierOption = () => {
    const sourceStatuses = ['approved', 'hold', 'processing', 'ready_to_ship'];
    const isSourceValid = sourceStatuses.includes(order?.orderStatus);
    const isTargetCourierAssign = selectedStatus === 'courier_assigned';
    return isSourceValid && isTargetCourierAssign;
  };

  // ========== UPDATED: canUpdateStatus ==========
  const canUpdateStatus = () => {
    if (!order) return false;
    const currentStatus = order.orderStatus;
    
    const terminalStatuses = ['cancelled', 'delivered', 'returned', 'rejected'];
    if (terminalStatuses.includes(currentStatus)) {
      return false;
    }
    
    if (['shipped', 'out_for_delivery'].includes(currentStatus)) {
      return false;
    }
    
    if (userRole === 'moderator') {
      const readOnlyForModerator = ['follow_up', 'reminder', 'accepted'];
      if (readOnlyForModerator.includes(currentStatus)) {
        return false;
      }
      return true;
    }
    
    return true;
  };
  
  const availableNextStatuses = getAvailableNextStatuses();
  const isCancelling = selectedStatus === 'cancelled';
  const isRejecting = selectedStatus === 'rejected';
  const isCourierAssign = selectedStatus === 'courier_assigned';
  const isDelivered = selectedStatus === 'delivered';
  const isReturned = selectedStatus === 'returned';
  const isPartialDelivery = selectedStatus === 'partial_delivery';

  const canChange = availableNextStatuses.length > 0 && 
                  order?.orderStatus !== 'delivered' && 
                  order?.orderStatus !== 'cancelled' &&
                  order?.orderStatus !== 'returned' &&
                  order?.orderStatus !== 'rejected' &&
                  !['shipped', 'out_for_delivery'].includes(order?.orderStatus) &&
                  canUpdateStatus();

  const createDeliveryWithCourier = async (courierSlug) => {
    try {
      const token = localStorage.getItem('token');
      const selectedCourier = connectedCouriers.find(c => c.name === courierSlug);
      if (!selectedCourier) {
        return { 
          success: false, 
          error: 'Selected courier not found. Please refresh and try again.' 
        };
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courierSlug: selectedCourier.slug,
          weight: weight || 0.5,
          deliveryNote: deliveryNote || ''
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text);
        return { 
          success: false, 
          error: 'Server returned an invalid response. Please try again.' 
        };
      }

      const data = await response.json();
      console.log('📦 Delivery response:', data);
      
      if (data.success) {
        toast.success(`✅ Delivery order created with ${selectedCourier.name}`);
        return { success: true, data: data.data || data };
      } else {
        return { 
          success: false, 
          error: data.error || data.message || 'Failed to create delivery order' 
        };
      }
    } catch (error) {
      console.error('❌ Create delivery error:', error);
      return { 
        success: false, 
        error: error.message || 'Network error. Please try again.' 
      };
    }
  };

  const handleSubmit = async () => {
    if (!selectedStatus) {
      toast.error('Please select a status');
      return;
    }

    if (selectedStatus === order.orderStatus) {
      toast.error('Please select a different status');
      return;
    }

    if (isCancelling && !cancellationReason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    if (isRejecting && !rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    if (isCourierAssign && !courierService.trim()) {
      toast.error('Please select a courier service');
      return;
    }

    if (isCourierAssign && (!weight || weight <= 0)) {
      toast.error('Please enter a valid weight');
      return;
    }

    setLoading(true);

    try {
      if (isCourierAssign) {
        const deliveryResult = await createDeliveryWithCourier(courierService);
        
        if (!deliveryResult.success) {
          toast.error(deliveryResult.error || 'Failed to create delivery order');
          setLoading(false);
          return;
        }

        toast.success(`✅ Delivery created with ${courierService}`);
        onUpdate();
        onClose();
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderStatus: selectedStatus,
          trackingNumber,
          deliveryNote,
          cancellationReason: isCancelling ? cancellationReason : undefined,
          rejectionReason: isRejecting ? rejectionReason : undefined
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Order status updated to ${selectedStatusInfo?.label}`);
        onUpdate();
        onClose();
      } else {
        toast.error(data.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Status update error:', error);
      toast.error(error.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getRoleLabel = () => {
    const roleMap = {
      super_admin: 'Super Admin',
      admin: 'Admin',
      moderator: 'Moderator'
    };
    return roleMap[userRole] || 'User';
  };

  const getRoleColor = () => {
    const colorMap = {
      super_admin: 'bg-gradient-to-r from-[#82947A] to-black',
      admin: 'bg-gradient-to-r from-[#82947A] to-[#0891B2]',
      moderator: 'bg-gradient-to-r from-black to-[#82947A]'
    };
    return colorMap[userRole] || 'bg-gradient-to-r from-[#82947A] to-black';
  };

  const getRoleBadgeColor = () => {
    const colorMap = {
      super_admin: 'bg-[#82947A]/10 border-[#82947A]/30 text-[#82947A]',
      admin: 'bg-[#82947A]/10 border-[#82947A]/30 text-[#82947A]',
      moderator: 'bg-[#E2E7EA] border-[#82947A]/30 text-black'
    };
    return colorMap[userRole] || 'bg-[#E2E7EA] border-[#82947A]/30 text-black';
  };

  const getPermissionMessage = () => {
    const currentStatus = order?.orderStatus;
    
    if (['cancelled', 'delivered', 'returned', 'rejected'].includes(currentStatus)) {
      return 'This order is final. No further changes allowed.';
    }
    
    if (currentStatus === 'partial_delivery') {
      return 'This order has been partially delivered. You can mark as Delivered, Returned, or Cancelled.';
    }
    
    if (currentStatus === 'courier_assigned' || currentStatus === 'processing') {
      return 'This order is with courier. You can update to Partial Delivery, Delivered, Returned, or Cancelled.';
    }
    
    if (['shipped', 'out_for_delivery'].includes(currentStatus)) {
      return 'This order is being handled by the courier service.';
    }
    
    if (userRole === 'moderator') {
      if (['follow_up', 'reminder', 'accepted'].includes(currentStatus)) {
        return 'Read-only access for this status.';
      }
      return 'You can update status for this order.';
    }
    
    return 'You have full access to change order status.';
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className={`p-4 text-white ${getRoleColor()}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaEdit className="w-5 h-5" />
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
                Update Order Status
              </h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-white/80">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-medium`}>
              {getRoleLabel()}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          <div className={`text-xs px-3 py-2 rounded-lg border ${getRoleBadgeColor()}`}>
            <div className="flex items-center gap-2">
              <FaInfoCircle className="w-3.5 h-3.5" />
              <span>{getPermissionMessage()}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-black mb-1">Current Status</label>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${currentStatusInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'}`}>
              {currentStatusInfo?.icon && <currentStatusInfo.icon className="w-3 h-3" />}
              <span>{currentStatusInfo?.label || order?.orderStatus}</span>
            </div>
            {!canChange && order?.orderStatus !== 'delivered' && order?.orderStatus !== 'cancelled' && order?.orderStatus !== 'courier_assigned' && !['processing', 'shipped', 'out_for_delivery'].includes(order?.orderStatus) && (
              <p className="text-xs text-[#64748B] mt-1">⚠️ No further status changes allowed for this order</p>
            )}
          </div>

          {canChange && (
            <>
              <div>
                <label className="block text-xs font-medium text-black mb-1">Change Status To</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    if (e.target.value !== 'cancelled' && e.target.value !== 'rejected') {
                      setCancellationReason('');
                      setRejectionReason('');
                    }
                  }}
                  className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
                >
                  <option value={order.orderStatus}>Current: {currentStatusInfo?.label}</option>
                  {availableNextStatuses.map(statusValue => {
                    const statusInfo = ORDER_STATUSES.find(s => s.value === statusValue);
                    return (
                      <option key={statusValue} value={statusValue}>
                        → {statusInfo?.label}
                      </option>
                    );
                  })}
                </select>
              </div>

              {selectedStatus !== order.orderStatus && (
                <div className="bg-[#E2E7EA]/50 rounded-xl p-2 border border-[#82947A]/30">
                  <p className="text-xs text-[#82947A]">
                    <span className="font-medium">Will change to:</span> {selectedStatusInfo?.label}
                  </p>
                </div>
              )}

              {/* ========== COURIER ASSIGNMENT SECTION ========== */}
              {showCourierOption() && (
                <div className="bg-[#82947A]/10 border border-[#82947A]/30 rounded-xl p-3 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FaTruck className="w-4 h-4 text-[#82947A]" />
                      <label className="text-xs font-medium text-black">
                        Select Courier Service <span className="text-red-500">*</span>
                      </label>
                    </div>
                    
                    {loadingCouriers ? (
                      <div className="flex items-center justify-center py-2">
                        <FaSpinner className="w-4 h-4 animate-spin text-[#82947A]" />
                        <span className="ml-2 text-xs text-[#64748B]">Loading couriers...</span>
                      </div>
                    ) : connectedCouriers.length === 0 ? (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs text-yellow-700">
                        <FaInfoCircle className="inline w-3 h-3 mr-1" />
                        No connected courier services found. Please configure courier settings first.
                      </div>
                    ) : (
                      <select
                        value={courierService}
                        onChange={(e) => setCourierService(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
                        required
                      >
                        <option value="">Select a courier...</option>
                        {connectedCouriers.map((courier) => (
                          <option key={courier.slug} value={courier.name}>
                            {courier.name} {courier.integrationStatus?.lastTestOk ? '✅' : '⚠️'}
                          </option>
                        ))}
                      </select>
                    )}
                    
                    {connectedCouriers.length > 0 && (
                      <p className="text-xs text-[#82947A] mt-1">
                        <FaCheckCircle className="inline w-3 h-3 mr-1" />
                        {connectedCouriers.length} courier service(s) connected
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-black mb-1">
                      Weight (kg) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaWeightHanging className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                        min="0.1"
                        step="0.1"
                        className="w-full pl-10 pr-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
                        placeholder="Enter package weight"
                      />
                    </div>
                    <p className="text-[10px] text-[#64748B] mt-1">
                      Calculated from order items: {order?.items?.reduce((sum, item) => {
                        const w = item.weight || item.itemWeight || 0.5;
                        return sum + (w * (item.quantity || 1));
                      }, 0).toFixed(1)} kg
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-black mb-1">
                      Delivery Note (Optional)
                    </label>
                    <div className="relative">
                      <FaFileAlt className="absolute left-3 top-3 text-[#64748B] w-4 h-4" />
                      <textarea
                        value={deliveryNote}
                        onChange={(e) => setDeliveryNote(e.target.value)}
                        rows="2"
                        className="w-full pl-10 pr-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black placeholder:text-[#64748B] resize-none"
                        placeholder="Add any delivery notes or special instructions..."
                      />
                    </div>
                  </div>

                  <div className="text-[10px] text-[#64748B] bg-blue-50 p-2 rounded-lg border border-blue-200">
                    <FaInfoCircle className="inline w-3 h-3 text-blue-500 mr-1" />
                    <span>This will create a delivery order with the selected courier service.</span>
                  </div>
                </div>
              )}

              {/* ========== INFO BOX FOR COURIER ASSIGNED → DELIVERED/RETURNED ========== */}
              {order?.orderStatus === 'courier_assigned' && (selectedStatus === 'delivered' || selectedStatus === 'returned' || selectedStatus === 'partial_delivery') && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="text-xs text-[#82947A] flex items-center gap-2">
                    <FaInfoCircle className="w-3.5 h-3.5" />
                    This order is currently with courier. Marking as {selectedStatusInfo?.label} will update the order status.
                  </p>
                </div>
              )}

              {/* ========== TERMINAL STATUS WARNING ========== */}
              {(selectedStatus === 'delivered' || selectedStatus === 'returned' || selectedStatus === 'cancelled' || selectedStatus === 'rejected') && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-2">
                  <p className="text-[10px] text-red-600 flex items-center gap-1.5">
                    <FaExclamationTriangle className="w-3 h-3" />
                    <span>This is a <strong>final status</strong>. No further changes will be allowed after this.</span>
                  </p>
                </div>
              )}

              {isCancelling && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FaExclamationTriangle className="w-4 h-4 text-red-600" />
                    <label className="text-xs font-medium text-black">
                      Cancellation Reason <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <textarea
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    rows="3"
                    placeholder="Please provide a reason for cancellation..."
                    className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black placeholder:text-[#64748B]"
                    required
                  />
                  <p className="text-xs text-red-600 mt-1">This reason will be saved with the order</p>
                </div>
              )}

              {isRejecting && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTimesCircle className="w-4 h-4 text-orange-600" />
                    <label className="text-xs font-medium text-black">
                      Rejection Reason <span className="text-orange-500">*</span>
                    </label>
                  </div>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows="3"
                    placeholder="Please provide a reason for rejection..."
                    className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black placeholder:text-[#64748B]"
                    required
                  />
                  <p className="text-xs text-orange-600 mt-1">This reason will be saved with the order</p>
                </div>
              )}

              {!isCourierAssign && (
                <div>
                  <label className="block text-xs font-medium text-black mb-1">Order Delivery Note (Optional)</label>
                  <textarea
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    rows="2"
                    placeholder="Add any delivery notes or special instructions"
                    className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black placeholder:text-[#64748B]"
                  />
                </div>
              )}

              {isDelivered && order.paymentStatus !== 'paid' && (
                <div className="bg-[#82947A]/10 border border-[#82947A]/30 rounded-xl p-2">
                  <p className="text-xs text-[#82947A] flex items-center gap-2">
                    <FaCheckCircle className="w-3 h-3" />
                    Payment status will be automatically updated to "Paid"
                  </p>
                </div>
              )}
            </>
          )}

          {!canChange && order?.orderStatus === 'delivered' && (
            <div className="bg-[#82947A]/10 border border-[#82947A]/30 rounded-xl p-3">
              <p className="text-xs text-[#82947A] flex items-center gap-2">
                <FaCheckDouble className="w-4 h-4" />
                This order has been delivered. No further changes allowed.
              </p>
            </div>
          )}

          {!canChange && order?.orderStatus === 'cancelled' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-xs text-red-600 flex items-center gap-2">
                <FaBan className="w-4 h-4" />
                This order has been cancelled. No further changes allowed.
              </p>
            </div>
          )}

          {!canChange && order?.orderStatus === 'returned' && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
              <p className="text-xs text-purple-600 flex items-center gap-2">
                <FaUndo className="w-4 h-4" />
                This order has been returned. No further changes allowed.
              </p>
            </div>
          )}

          {!canChange && order?.orderStatus === 'rejected' && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
              <p className="text-xs text-orange-600 flex items-center gap-2">
                <FaTimesCircle className="w-4 h-4" />
                This order has been rejected. No further changes allowed.
              </p>
            </div>
          )}

          {!canChange && order?.orderStatus === 'courier_assigned' && (
            <div className="bg-[#82947A]/10 border border-[#82947A]/30 rounded-xl p-3">
              <p className="text-xs text-[#82947A] flex items-center gap-2">
                <FaTruck className="w-4 h-4" />
                This order has been assigned to courier.
              </p>
            </div>
          )}

          {!canChange && ['processing', 'shipped', 'out_for_delivery'].includes(order?.orderStatus) && (
            <div className="bg-[#82947A]/10 border border-[#82947A]/30 rounded-xl p-3">
              <p className="text-xs text-[#82947A] flex items-center gap-2">
                <FaShippingFast className="w-4 h-4" />
                This order is being handled by the courier service.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !canChange || selectedStatus === order?.orderStatus}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-[#82947A] to-black text-white rounded-xl hover:shadow-lg hover:shadow-[#82947A]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : 
              isCourierAssign ? <FaTruck className="w-3 h-3" /> : <FaCheckCircle className="w-3 h-3" />
            }
            {isCourierAssign ? 'Create Delivery' : 'Update Status'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== PAYMENT STATUS MODAL ==========
// const PaymentStatusModal = ({ isOpen, onClose, order, onUpdate }) => {
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (order) {
//       setSelectedStatus(order.paymentStatus);
//     }
//   }, [order]);

//   const handleSubmit = async () => {
//     if (!selectedStatus) {
//       toast.error('Please select a payment status');
//       return;
//     }

//     if (selectedStatus === order.paymentStatus) {
//       toast.error('Please select a different status');
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/orders/${order._id}/payment`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ paymentStatus: selectedStatus })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(`Payment status updated to ${selectedStatus}`);
//         onUpdate();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to update payment status');
//       }
//     } catch (error) {
//       console.error('Payment status update error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const currentPaymentInfo = PAYMENT_STATUSES.find(p => p.value === order?.paymentStatus);
  
//   const getAvailableStatuses = () => {
//     const currentStatus = order?.paymentStatus;
//     const orderStatus = order?.orderStatus;
//     const paymentMethod = order?.paymentMethod;
    
//     switch (currentStatus) {
//       case 'pending':
//         return PAYMENT_STATUSES.filter(status => 
//           status.value === 'paid' || status.value === 'failed'
//         );
//       case 'failed':
//         return PAYMENT_STATUSES.filter(status => 
//           status.value === 'paid'
//         );
//       case 'paid':
//         if (paymentMethod === 'cod') {
//           if (orderStatus === 'cancelled') {
//             return PAYMENT_STATUSES.filter(status => 
//               status.value === 'refunded'
//             );
//           }
//           return [];
//         } else {
//           return PAYMENT_STATUSES.filter(status => 
//             status.value === 'refunded'
//           );
//         }
//       case 'refunded':
//         return [];
//       default:
//         return [];
//     }
//   };

//   const availableStatuses = getAvailableStatuses();
//   const canChange = availableStatuses.length > 0;

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-[#82947A] to-black text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaMoneyBillWave className="w-5 h-5" />
//               <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Update Payment Status</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-4 space-y-3">
//           <div>
//             <label className="block text-xs font-medium text-black mb-1">Current Payment Status</label>
//             <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${currentPaymentInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'}`}>
//               <FaMoneyBillWave className="w-3 h-3" />
//               <span>{currentPaymentInfo?.label || order?.paymentStatus}</span>
//             </div>
//             <div className="mt-1 text-xs text-[#64748B]">
//               Order Status: <span className="font-medium text-black">{order?.orderStatus}</span> | 
//               Payment Method: <span className="font-medium text-black">{order?.paymentMethod === 'cod' ? 'COD' : 'Online'}</span>
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-black mb-1">Change Payment Status To</label>
//             {canChange ? (
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
//               >
//                 <option value={order.paymentStatus}>Current: {currentPaymentInfo?.label}</option>
//                 {availableStatuses.map(status => (
//                   <option key={status.value} value={status.value}>
//                     → {status.label}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <div className="px-3 py-1.5 text-sm bg-[#E2E7EA] text-[#64748B] rounded-xl border border-[#82947A]/30">
//                 No further changes allowed
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading || !canChange || selectedStatus === order?.paymentStatus}
//             className="flex-1 px-3 py-2 bg-gradient-to-r from-[#82947A] to-black text-white rounded-xl hover:shadow-lg hover:shadow-[#82947A]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//           >
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
//             Update Payment
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

const PaymentStatusModal = ({ isOpen, onClose, order, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.paymentStatus);
    }
  }, [order]);

  const getAvailableStatuses = () => {
    const currentStatus = order?.paymentStatus;
    const orderStatus = order?.orderStatus;
    const paymentMethod = order?.paymentMethod;
    
    // ✅ If order is cancelled, no payment changes allowed
    if (orderStatus === 'cancelled') {
      return [];
    }
    
    // If order is delivered, only allow refund for non-COD orders
    if (orderStatus === 'delivered') {
      if (paymentMethod === 'cod') {
        return []; // COD already auto-paid, no changes allowed
      } else {
        // Online payment - can only refund
        return PAYMENT_STATUSES.filter(status => 
          status.value === 'refunded'
        );
      }
    }
    
    switch (currentStatus) {
      case 'pending':
        return PAYMENT_STATUSES.filter(status => 
          status.value === 'paid' || status.value === 'failed'
        );
      case 'failed':
        return PAYMENT_STATUSES.filter(status => 
          status.value === 'paid'
        );
      case 'paid':
        if (paymentMethod === 'cod') {
          if (orderStatus === 'cancelled') {
            return PAYMENT_STATUSES.filter(status => 
              status.value === 'refunded'
            );
          }
          return [];
        } else {
          return PAYMENT_STATUSES.filter(status => 
            status.value === 'refunded'
          );
        }
      case 'refunded':
        return [];
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    if (!selectedStatus) {
      toast.error('Please select a payment status');
      return;
    }

    if (selectedStatus === order.paymentStatus) {
      toast.error('Please select a different status');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${order._id}/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ paymentStatus: selectedStatus })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Payment status updated to ${selectedStatus}`);
        onUpdate();
        onClose();
      } else {
        toast.error(data.error || 'Failed to update payment status');
      }
    } catch (error) {
      console.error('Payment status update error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const currentPaymentInfo = PAYMENT_STATUSES.find(p => p.value === order?.paymentStatus);
  const availableStatuses = getAvailableStatuses();
  const canChange = availableStatuses.length > 0 && order?.orderStatus !== 'cancelled';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-[#82947A] to-black text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="w-5 h-5" />
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Update Payment Status</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-black mb-1">Current Payment Status</label>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${currentPaymentInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'}`}>
              <FaMoneyBillWave className="w-3 h-3" />
              <span>{currentPaymentInfo?.label || order?.paymentStatus}</span>
            </div>
            <div className="mt-1 text-xs text-[#64748B]">
              Order Status: <span className="font-medium text-black">{order?.orderStatus}</span> | 
              Payment Method: <span className="font-medium text-black">{order?.paymentMethod === 'cod' ? 'COD' : 'Online'}</span>
            </div>
          </div>

          {/* ✅ Warning message for cancelled orders */}
          {order?.orderStatus === 'cancelled' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-xs text-red-600 flex items-center gap-2">
                <FaBan className="w-4 h-4" />
                This order is <strong>cancelled</strong>. Payment status cannot be changed.
              </p>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-black mb-1">Change Payment Status To</label>
            {canChange ? (
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
              >
                <option value={order.paymentStatus}>Current: {currentPaymentInfo?.label}</option>
                {availableStatuses.map(status => (
                  <option key={status.value} value={status.value}>
                    → {status.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="px-3 py-1.5 text-sm bg-[#E2E7EA] text-[#64748B] rounded-xl border border-[#82947A]/30">
                {order?.orderStatus === 'cancelled' 
                  ? 'Payment cannot be changed for cancelled orders' 
                  : 'No further changes allowed'}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !canChange || selectedStatus === order?.paymentStatus || order?.orderStatus === 'cancelled'}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-[#82947A] to-black text-white rounded-xl hover:shadow-lg hover:shadow-[#82947A]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
            Update Payment
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== ORDER DETAILS MODAL ==========
// const OrderDetailsModal = ({ isOpen, onClose, order, onStatusUpdate, onPaymentUpdate, onDownloadInvoice }) => {
//   const [downloading, setDownloading] = useState(false);

//   if (!isOpen || !order) return null;

//   const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
//   const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
  
//   // Check if status can be changed
//   const terminalStatuses = ['cancelled', 'delivered', 'returned', 'rejected'];
//   const canChangeStatus = !terminalStatuses.includes(order.orderStatus) && 
//                           order.orderStatus !== 'courier_assigned' &&
//                           !['processing', 'shipped', 'out_for_delivery'].includes(order.orderStatus);
  
//   const isCancelled = order.orderStatus === 'cancelled';
//   const isDelivered = order.orderStatus === 'delivered';
//   const isCourierAssigned = order.orderStatus === 'courier_assigned';
//   const isRejected = order.orderStatus === 'rejected';
//   const isReturned = order.orderStatus === 'returned';
//   const isPartialDelivery = order.orderStatus === 'partial_delivery';

//   const handleDownload = async () => {
//     setDownloading(true);
//     try {
//       await onDownloadInvoice(order);
//       toast.success('Invoice downloaded successfully!');
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.error('Failed to download invoice');
//     } finally {
//       setDownloading(false);
//     }
//   };

//   const getDeviceIcon = (deviceType) => {
//     switch(deviceType?.toLowerCase()) {
//       case 'mobile': return <FaMobile className="w-3.5 h-3.5" />;
//       case 'tablet': return <FaTablet className="w-3.5 h-3.5" />;
//       case 'desktop': return <FaDesktop className="w-3.5 h-3.5" />;
//       default: return <FaLaptop className="w-3.5 h-3.5" />;
//     }
//   };

//   const getDeviceInfo = (deviceInfo) => {
//     if (!deviceInfo) return null;
//     const parts = [];
//     if (deviceInfo.deviceType) parts.push(deviceInfo.deviceType);
//     if (deviceInfo.browser) parts.push(deviceInfo.browser);
//     if (deviceInfo.os) parts.push(deviceInfo.os);
//     return parts.join(' • ');
//   };

//   const getGroupedItems = () => {
//     if (!order.items) return [];
//     const grouped = {};
//     order.items.forEach(item => {
//       const key = item.productId.toString();
//       if (!grouped[key]) {
//         grouped[key] = {
//           ...item,
//           colors: []
//         };
//       }
//       if (item.colors && item.colors.length > 0) {
//         item.colors.forEach(colorObj => {
//           grouped[key].colors.push({
//             color: colorObj.color,
//             quantity: colorObj.quantity,
//             price: colorObj.price || item.discountPrice || item.regularPrice
//           });
//         });
//       } else if (item.selectedColor) {
//         grouped[key].colors.push({
//           color: item.selectedColor,
//           quantity: item.quantity,
//           price: item.discountPrice || item.regularPrice
//         });
//       } else {
//         grouped[key].colors.push({
//           color: null,
//           quantity: item.quantity,
//           price: item.discountPrice || item.regularPrice
//         });
//       }
//     });
//     return Object.values(grouped);
//   };

//   const groupedItems = getGroupedItems();

//   const getStatusNotes = () => {
//     if (!order.statusHistory || order.statusHistory.length === 0) {
//       return [];
//     }
//     const notes = order.statusHistory
//       .filter(entry => entry.note && entry.note.trim() !== '')
//       .map(entry => {
//         let userEmail = null;
//         let userName = null;
//         if (entry.updatedBy) {
//           if (typeof entry.updatedBy === 'object') {
//             userEmail = entry.updatedBy.email || null;
//             userName = entry.updatedBy.contactPerson || entry.updatedBy.name || null;
//           }
//         }
//         return {
//           status: entry.status,
//           note: entry.note,
//           timestamp: entry.timestamp,
//           updatedByRole: entry.updatedByRole || 'system',
//           updatedByEmail: userEmail,
//           updatedByName: userName
//         };
//       });
//     return notes;
//   };

//   const statusNotes = getStatusNotes();

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-[#82947A] to-[#708268] text-white sticky top-0 z-10">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFileInvoice className="w-5 h-5" />
//               <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Order Details</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-5 max-h-[60vh] overflow-y-auto">
//           <div className="flex flex-wrap gap-2 mb-5">
//             <button
//               onClick={() => {
//                 onClose();
//                 canChangeStatus && onStatusUpdate();
//               }}
//               className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border transition-all ${statusInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'} ${canChangeStatus ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
//               title={canChangeStatus ? 'Click to update status' : 'Status cannot be changed'}
//             >
//               {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
//               <span className="font-medium">Order: {statusInfo?.label || order.orderStatus}</span>
//               {canChangeStatus && <FaEdit className="w-2.5 h-2.5 ml-1" />}
//             </button>
//             <button
//               onClick={() => {
//                 onClose();
//                 onPaymentUpdate();
//               }}
//               className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border transition-all ${paymentInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'} cursor-pointer hover:opacity-80`}
//               title="Click to update payment status"
//             >
//               <FaMoneyBillWave className="w-3 h-3" />
//               <span className="font-medium">Payment: {paymentInfo?.label || order.paymentStatus}</span>
//               <FaEdit className="w-2.5 h-2.5 ml-1" />
//             </button>
//             <button
//               onClick={handleDownload}
//               disabled={downloading}
//               className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border bg-[#E2E7EA] text-[#82947A] border-[#82947A]/30 hover:bg-white transition-colors disabled:opacity-50"
//             >
//               {downloading ? (
//                 <FaSpinner className="w-3 h-3 animate-spin" />
//               ) : (
//                 <FaDownload className="w-3 h-3" />
//               )}
//               Invoice
//             </button>
//           </div>

//           {order.deviceInfo && (
//             <div className="mb-5 bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
//               <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
//                 <FaGlobe className="w-3.5 h-3.5 text-[#82947A]" />
//                 Device & Location Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">IP Address:</span>
//                   <span className="font-mono text-black">{order.deviceInfo.ipAddress || 'N/A'}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Device:</span>
//                   <span className="flex items-center gap-1 text-black">
//                     {getDeviceIcon(order.deviceInfo.deviceType)}
//                     {getDeviceInfo(order.deviceInfo) || 'N/A'}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Browser:</span>
//                   <span className="text-black">{order.deviceInfo.browser || 'N/A'} {order.deviceInfo.browserVersion || ''}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">OS:</span>
//                   <span className="text-black">{order.deviceInfo.os || 'N/A'} {order.deviceInfo.osVersion || ''}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Screen:</span>
//                   <span className="text-black">{order.deviceInfo.screenResolution || 'N/A'}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Connection:</span>
//                   <span className="text-black">{order.deviceInfo.connectionType || 'N/A'}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Timezone:</span>
//                   <span className="text-black">{order.deviceInfo.timezone || 'N/A'}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[#64748B]">Language:</span>
//                   <span className="text-black">{order.deviceInfo.language || 'N/A'}</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isDelivered && order.deliveredAt && (
//             <div className="mb-5 bg-[#82947A]/10 border-l-4 border-[#82947A] rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaCheckDouble className="w-4 h-4 text-[#82947A] mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-[#82947A]">Order Delivered</h4>
//                   <p className="text-xs text-[#82947A]/80 mt-1">
//                     <span className="font-medium">Delivered on:</span> {new Date(order.deliveredAt).toLocaleDateString('en-BD', {
//                       day: '2-digit',
//                       month: 'long',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isPartialDelivery && (
//             <div className="mb-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaCheckDouble className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-yellow-700">Partial Delivery</h4>
//                   <p className="text-xs text-yellow-600 mt-1">
//                     Only part of this order has been delivered.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isCancelled && order.cancellationReason && (
//             <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaExclamationTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
//                   <p className="text-xs text-red-600 mt-1">
//                     <span className="font-medium">Reason:</span> {order.cancellationReason}
//                   </p>
//                   {order.cancelledAt && (
//                     <p className="text-xs text-red-500 mt-1">
//                       <span className="font-medium">Cancelled on:</span> {new Date(order.cancelledAt).toLocaleDateString('en-BD', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {isRejected && order.rejectionReason && (
//             <div className="mb-5 bg-orange-50 border-l-4 border-orange-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaTimesCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-orange-700">Order Rejected</h4>
//                   <p className="text-xs text-orange-600 mt-1">
//                     <span className="font-medium">Reason:</span> {order.rejectionReason}
//                   </p>
//                   {order.cancelledAt && (
//                     <p className="text-xs text-orange-500 mt-1">
//                       <span className="font-medium">Rejected on:</span> {new Date(order.cancelledAt).toLocaleDateString('en-BD', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {isReturned && (
//             <div className="mb-5 bg-purple-50 border-l-4 border-purple-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaUndo className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-purple-700">Order Returned</h4>
//                   <p className="text-xs text-purple-600 mt-1">
//                     This order has been returned.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isCourierAssigned && order.deliveryService && (
//             <div className="mb-5 bg-[#82947A]/10 border-l-4 border-[#82947A] rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaTruck className="w-4 h-4 text-[#82947A] mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-[#82947A]">Courier Assigned</h4>
//                   <p className="text-xs text-[#82947A]/80 mt-1">
//                     <span className="font-medium">Courier:</span> {order.deliveryService.courierName || 'N/A'}
//                   </p>
//                   {order.deliveryService.trackingNumber && (
//                     <p className="text-xs text-[#82947A]/80 mt-1">
//                       <span className="font-medium">Tracking:</span> {order.deliveryService.trackingNumber}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
//               <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-[#82947A]" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#64748B]">Name:</span> <span className="text-black font-medium">{order.customerInfo?.fullName}</span></p>
//                 <p><span className="text-[#64748B]">Email:</span> <span className="text-black">{order.customerInfo?.email}</span></p>
//                 <p><span className="text-[#64748B]">Phone:</span> <span className="text-black">{order.customerInfo?.phone}</span></p>
//                 {order.customerInfo?.note && (
//                   <p><span className="text-[#64748B]">Note:</span> <span className="text-black">{order.customerInfo.note}</span></p>
//                 )}
//               </div>
//             </div>

//             <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
//               <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#82947A]" />
//                 Delivery Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#64748B]">Division:</span> <span className="font-medium text-black">{order.customerInfo?.division || 'N/A'}</span></p>
//                 <p><span className="text-[#64748B]">District/City:</span> <span className="font-medium text-black">{order.customerInfo?.city || 'N/A'}</span></p>
//                 <p><span className="text-[#64748B]">Upazila/Thana:</span> <span className="font-medium text-black">{order.customerInfo?.zone || 'N/A'}</span></p>
//                 {order.customerInfo?.area && (
//                   <p><span className="text-[#64748B]">Union/Area:</span> <span className="font-medium text-black">{order.customerInfo.area}</span></p>
//                 )}
//                 <p><span className="text-[#64748B]">Address:</span> <span className="text-black">{order.customerInfo?.address}</span></p>
//                 {order.trackingNumber && (
//                   <p><span className="text-[#64748B]">Tracking:</span> <span className="font-mono text-[#82947A]">{order.trackingNumber}</span></p>
//                 )}
//                 {order.deliveryService?.trackingUrl && (
//                   <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#82947A]/20">
//                     <span className="text-[#64748B]">Track Link:</span>
//                     <a
//                       href={order.deliveryService.trackingUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#82947A] hover:underline flex items-center gap-1"
//                     >
//                       <FaExternalLinkAlt className="w-3 h-3" />
//                       Track on {order.deliveryService.courierName || 'Courier'}
//                     </a>
//                   </div>
//                 )}
//                 {order.deliveryNote && (
//                   <p><span className="text-[#64748B]">Order Note:</span> <span className="text-black">{order.deliveryNote}</span></p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="mb-5">
//             <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
//               <FaBox className="w-3.5 h-3.5 text-[#82947A]" />
//               Order Items
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs">
//                 <thead className="bg-[#E2E7EA]">
//                   <tr>
//                     <th className="px-2 py-1.5 text-left text-black">Product</th>
//                     <th className="px-2 py-1.5 text-center text-black">Color</th>
//                     <th className="px-2 py-1.5 text-center text-black">Qty</th>
//                     <th className="px-2 py-1.5 text-right text-black">Price</th>
//                     <th className="px-2 py-1.5 text-right text-black">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {groupedItems.map((group, idx) => {
//                     const hasMultipleColors = group.colors && group.colors.length > 1;
                    
//                     return group.colors.map((colorObj, colorIdx) => {
//                       const isFirst = colorIdx === 0;
//                       const price = colorObj.price || group.discountPrice || group.regularPrice;
//                       const totalPrice = price * colorObj.quantity;
                      
//                       return (
//                         <tr key={`${idx}-${colorIdx}`} className="border-t border-[#82947A]/20">
//                           {isFirst && (
//                             <td className="px-2 py-2" rowSpan={hasMultipleColors ? group.colors.length : 1}>
//                               <div className="flex items-center gap-2">
//                                 <img 
//                                   src={group.image || 'https://via.placeholder.com/30'} 
//                                   alt={group.productName}
//                                   className="w-7 h-7 rounded object-cover border border-[#82947A]/30"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                                 />
//                                 <p className="font-medium text-xs text-black">{group.productName}</p>
//                               </div>
//                             </td>
//                           )}
//                           <td className="px-2 py-2 text-center">
//                             {colorObj.color ? (
//                               <div className="flex items-center justify-center">
//                                 <div 
//                                   className="w-5 h-5 rounded-full border border-[#82947A]/30 shadow-sm"
//                                   style={{ backgroundColor: colorObj.color }}
//                                   title={colorObj.color}
//                                 />
//                               </div>
//                             ) : (
//                               <span className="text-xs text-[#64748B]">-</span>
//                             )}
//                           </td>
//                           <td className="px-2 py-2 text-center text-black">{colorObj.quantity}</td>
//                           <td className="px-2 py-2 text-right text-black">৳{price.toFixed(2)}</td>
//                           <td className="px-2 py-2 text-right font-medium text-[#82947A]">৳{totalPrice.toFixed(2)}</td>
//                         </tr>
//                       );
//                     });
//                   })}
//                 </tbody>
//                 <tfoot className="border-t border-[#82947A]/30">
//                   <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-black">Subtotal:</td><td className="px-2 py-1 text-right text-black">৳{order.subtotal?.toFixed(2)}</td></tr>
//                   <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-black">Shipping:</td><td className="px-2 py-1 text-right text-black">৳{order.shippingCost?.toFixed(2)}</td></tr>
//                   {order.discount > 0 && (
//                     <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-green-600">Discount:</td><td className="px-2 py-1 text-right text-green-600">- ৳{order.discount.toFixed(2)}</td></tr>
//                   )}
//                   <tr className="text-sm font-bold">
//                     <td colSpan="4" className="px-2 py-1 text-right text-black">Total:</td>
//                     <td className="px-2 py-1 text-right text-[#82947A]">৳{order.total?.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//           <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
//             <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
//               <FaInfoCircle className="w-3.5 h-3.5 text-[#82947A]" />
//               Additional Information
//             </h3>
            
//             {order.couponCode && (
//               <div className="mb-2">
//                 <p className="text-xs">
//                   <span className="text-[#64748B]">Coupon Applied:</span> 
//                   <span className="text-[#82947A] font-medium ml-1">{order.couponCode}</span>
//                 </p>
//               </div>
//             )}

//             {order.deliveryNote && (
//               <div className="mb-2">
//                 <p className="text-xs">
//                   <span className="text-[#64748B]">Order Note:</span>
//                   <span className="text-black font-medium ml-1 whitespace-pre-wrap">{order.deliveryNote}</span>
//                 </p>
//               </div>
//             )}

//             {statusNotes.length > 0 && (
//               <div>
//                 <p className="text-xs font-medium text-black mb-1.5 flex items-center gap-1">
//                   <FaClipboardList className="w-3 h-3 text-[#82947A]" />
//                   Status History Notes
//                 </p>
//                 <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">
//                   {statusNotes.map((note, index) => {
//                     const statusLabel = ORDER_STATUSES.find(s => s.value === note.status)?.label || note.status;
//                     const formattedDate = note.timestamp ? new Date(note.timestamp).toLocaleString('en-BD', {
//                       day: '2-digit',
//                       month: 'short',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     }) : '';
                    
//                     let updatedByDisplay = 'System';
//                     if (note.updatedByEmail) {
//                       updatedByDisplay = note.updatedByEmail;
//                     } else if (note.updatedByName) {
//                       updatedByDisplay = note.updatedByName;
//                     } else if (note.updatedByRole && note.updatedByRole !== 'system') {
//                       updatedByDisplay = note.updatedByRole;
//                     }
                    
//                     return (
//                       <div key={index} className="bg-white rounded-lg p-2 border border-[#82947A]/20">
//                         <div className="flex items-center justify-between gap-2">
//                           <span className="text-xs font-medium text-black">
//                             {statusLabel}
//                           </span>
//                           <span className="text-[10px] text-[#64748B]">
//                             {formattedDate}
//                           </span>
//                         </div>
//                         <p className="text-xs text-[#64748B] mt-0.5 break-words">
//                           {note.note}
//                         </p>
//                         {updatedByDisplay && (
//                           <span className="text-[10px] text-[#64748B]/60 mt-0.5 block">
//                             Updated by: {updatedByDisplay}
//                           </span>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {!order.couponCode && !order.deliveryNote && statusNotes.length === 0 && (
//               <p className="text-xs text-[#64748B]">No additional information available</p>
//             )}
//           </div>
//         </div>

//         <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex justify-end gap-2">
         
//           <button onClick={onClose} className="px-3 py-1.5 bg-gradient-to-r from-[#82947A] to-[#708268] text-white rounded-xl hover:shadow-lg hover:shadow-[#82947A]/25 transition-all text-sm">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };


// ========== ORDER DETAILS MODAL ==========
const OrderDetailsModal = ({ isOpen, onClose, order, onStatusUpdate, onPaymentUpdate, onDownloadInvoice }) => {
  const [downloading, setDownloading] = useState(false);

  // ========== HELPER: Get color name ==========
  const getColorName = (color) => {
    const colorMap = {
      '#000000': 'Black',
      '#FFFFFF': 'White',
      '#FF0000': 'Red',
      '#00FF00': 'Green',
      '#0000FF': 'Blue',
      '#FFFF00': 'Yellow',
      '#FF00FF': 'Magenta',
      '#00FFFF': 'Cyan',
      '#FFA500': 'Orange',
      '#800080': 'Purple',
      '#008000': 'Dark Green',
      '#FFC0CB': 'Pink',
      '#A52A2A': 'Brown',
      '#808080': 'Gray',
      '#C0C0C0': 'Silver',
      '#4A90E2': 'Blue',
      '#FF6B6B': 'Red',
      '#4ECDC4': 'Teal',
      '#45B7D1': 'Sky Blue',
      '#96CEB4': 'Mint',
      '#FFEAA7': 'Cream',
      '#DDA0DD': 'Plum',
      '#98D8C8': 'Seafoam',
      '#F7DC6F': 'Gold',
      '#BB8FCE': 'Lavender'
    };
    return colorMap[color] || color;
  };

  // ========== GET COLOR DISPLAY ==========
  const getColorDisplay = (item) => {
    if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
      const hasValidColors = item.colors.some(c => 
        c.color && 
        c.color !== 'null' && 
        c.color !== '' && 
        c.color !== 'undefined'
      );
      
      if (hasValidColors) {
        return item.colors
          .filter(c => c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined')
          .map(c => ({
            color: c.color,
            quantity: c.quantity || 0,
            price: c.price || item.discountPrice || item.regularPrice
          }));
      }
    }
    
    if (item.selectedColor && 
        item.selectedColor !== 'null' && 
        item.selectedColor !== '' && 
        item.selectedColor !== 'undefined') {
      return [{
        color: item.selectedColor,
        quantity: item.quantity || 0,
        price: item.discountPrice || item.regularPrice
      }];
    }
    
    return [];
  };

  // ========== GROUP ITEMS WITH PROPER HIERARCHY ==========
  const groupItemsForDisplay = (items) => {
    if (!items || items.length === 0) return [];
    
    const productGroups = {};
    
    items.forEach(item => {
      const productId = item.productId?.toString() || 'unknown';
      
      if (!productGroups[productId]) {
        productGroups[productId] = {
          productId: productId,
          productName: item.productName,
          productSlug: item.productSlug || '',
          image: item.image || '',
          regularPrice: item.regularPrice,
          discountPrice: item.discountPrice || 0,
          unit: item.unit || 'pcs',
          stockQuantity: item.stockQuantity || 0,
          hasVariants: false,
          hasSubVariants: false,
          items: [],
          variantDetails: item.variantDetails || []
        };
      }
      
      productGroups[productId].items.push(item);
      
      if (item.isVariant || item.isSubVariant || (item.variantDetails && item.variantDetails.length > 0)) {
        productGroups[productId].hasVariants = true;
      }
      
      if (item.isSubVariant) {
        productGroups[productId].hasSubVariants = true;
      }
      
      if (item.variantDetails && item.variantDetails.length > 0) {
        item.variantDetails.forEach(variant => {
          if (variant.subVariants && variant.subVariants.length > 0) {
            productGroups[productId].hasSubVariants = true;
          }
        });
      }
    });
    
    const result = [];
    
    Object.values(productGroups).forEach(group => {
      const baseItems = group.items.filter(item => 
        !item.isVariant && 
        !item.isSubVariant && 
        item.isBaseProduct !== false
      );
      
      const variantItems = group.items.filter(item => 
        item.isVariant === true && 
        !item.isSubVariant
      );
      
      const subVariantItems = group.items.filter(item => 
        item.isSubVariant === true
      );
      
      const hasNestedVariants = group.variantDetails && group.variantDetails.length > 0;
      
      const rows = [];
      const hasAnyVariants = variantItems.length > 0 || subVariantItems.length > 0 || hasNestedVariants;
      
      // Base product row
      if (baseItems.length > 0) {
        let totalBaseQuantity = 0;
        let totalBasePrice = 0;
        let baseColor = null;
        let hasBaseColor = false;
        
        baseItems.forEach(item => {
          const colorData = getColorDisplay(item);
          const price = item.discountPrice || item.regularPrice || 0;
          totalBaseQuantity += item.quantity || 0;
          totalBasePrice += price * (item.quantity || 0);
          
          if (colorData.length > 0 && !hasBaseColor) {
            baseColor = colorData[0].color;
            hasBaseColor = true;
          }
        });
        
        let variantTotalQuantity = 0;
        let variantTotalPrice = 0;
        
        variantItems.forEach(v => {
          const price = v.variantDiscountPrice > 0 ? v.variantDiscountPrice : 
                       v.variantRegularPrice > 0 ? v.variantRegularPrice :
                       v.discountPrice || v.regularPrice || 0;
          variantTotalQuantity += v.quantity || 0;
          variantTotalPrice += price * (v.quantity || 0);
        });
        
        subVariantItems.forEach(s => {
          const price = s.variantDiscountPrice > 0 ? s.variantDiscountPrice : 
                       s.variantRegularPrice > 0 ? s.variantRegularPrice :
                       s.discountPrice || s.regularPrice || 0;
          variantTotalQuantity += s.quantity || 0;
          variantTotalPrice += price * (s.quantity || 0);
        });
        
        if (hasNestedVariants) {
          group.variantDetails.forEach(v => {
            if (v.subVariants && v.subVariants.length > 0) {
              v.subVariants.forEach(s => {
                const price = s.subVariantDiscountPrice > 0 ? s.subVariantDiscountPrice :
                             s.subVariantRegularPrice > 0 ? s.subVariantRegularPrice :
                             v.variantRegularPrice || 0;
                variantTotalQuantity += s.quantity || 0;
                variantTotalPrice += price * (s.quantity || 0);
              });
            } else {
              const price = v.variantDiscountPrice > 0 ? v.variantDiscountPrice :
                           v.variantRegularPrice > 0 ? v.variantRegularPrice : 0;
              variantTotalQuantity += v.quantity || 0;
              variantTotalPrice += price * (v.quantity || 0);
            }
          });
        }
        
        const finalQuantity = hasAnyVariants ? variantTotalQuantity : totalBaseQuantity;
        const finalTotal = hasAnyVariants ? variantTotalPrice : totalBasePrice;
        
        rows.push({
          type: 'base',
          id: 'base',
          name: group.productName,
          displayName: group.productName,
          image: group.image,
          price: finalQuantity > 0 ? (finalTotal / finalQuantity) : 0,
          quantity: finalQuantity,
          total: finalTotal,
          unit: group.unit || 'pcs',
          color: baseColor,
          hasColor: hasBaseColor,
          isBase: true,
          isVariant: false,
          isSubVariant: false,
          indent: 0,
          badge: 'Product',
          parentName: null,
          grandParentName: null,
          variantId: null,
          subVariantId: null,
          originalPrice: null,
          hasDiscount: false,
          variantName: null,
          subVariantName: null,
          showPrice: !hasAnyVariants
        });
      }
      
      // Variant rows
      variantItems.forEach(item => {
        const colorData = getColorDisplay(item);
        const hasColor = colorData.length > 0;
        const price = item.variantDiscountPrice > 0 ? item.variantDiscountPrice : 
                     item.variantRegularPrice > 0 ? item.variantRegularPrice :
                     item.discountPrice || item.regularPrice || 0;
        const quantity = item.quantity || 0;
        const total = price * quantity;
        const originalPrice = item.variantRegularPrice > 0 && item.variantDiscountPrice > 0 ? item.variantRegularPrice : null;
        const hasDiscount = originalPrice && originalPrice > price;
        
        rows.push({
          type: 'variant',
          id: item.variantId || `variant-${rows.length}`,
          name: item.variantName || 'Variant',
          displayName: item.variantName || 'Variant',
          image: item.image || group.image,
          price: price,
          originalPrice: originalPrice,
          hasDiscount: hasDiscount,
          quantity: quantity,
          total: total,
          unit: group.unit || 'pcs',
          color: hasColor ? colorData[0].color : null,
          hasColor: hasColor,
          isBase: false,
          isVariant: true,
          isSubVariant: false,
          indent: 1,
          parentName: group.productName,
          badge: 'Variant',
          variantId: item.variantId,
          subVariantId: null,
          grandParentName: null,
          variantName: item.variantName,
          subVariantName: null,
          showPrice: true
        });
      });
      
      // Sub-variant rows
      subVariantItems.forEach(item => {
        const colorData = getColorDisplay(item);
        const hasColor = colorData.length > 0;
        const price = item.variantDiscountPrice > 0 ? item.variantDiscountPrice : 
                     item.variantRegularPrice > 0 ? item.variantRegularPrice :
                     item.discountPrice || item.regularPrice || 0;
        const quantity = item.quantity || 0;
        const total = price * quantity;
        const originalPrice = item.variantRegularPrice > 0 && item.variantDiscountPrice > 0 ? item.variantRegularPrice : null;
        const hasDiscount = originalPrice && originalPrice > price;
        
        let parentVariantName = item.variantName || 'Variant';
        const parentVariant = variantItems.find(v => v.variantId === item.variantId);
        if (parentVariant) {
          parentVariantName = parentVariant.variantName || 'Variant';
        }
        
        rows.push({
          type: 'subVariant',
          id: item.subVariantId || `sub-${rows.length}`,
          name: item.subVariantName || 'Sub-Variant',
          displayName: item.subVariantName || 'Sub-Variant',
          image: item.image || group.image,
          price: price,
          originalPrice: originalPrice,
          hasDiscount: hasDiscount,
          quantity: quantity,
          total: total,
          unit: group.unit || 'pcs',
          color: hasColor ? colorData[0].color : null,
          hasColor: hasColor,
          isBase: false,
          isVariant: false,
          isSubVariant: true,
          indent: 2,
          parentName: parentVariantName,
          grandParentName: group.productName,
          badge: 'Sub',
          variantId: item.variantId,
          subVariantId: item.subVariantId,
          variantName: parentVariantName,
          subVariantName: item.subVariantName,
          showPrice: true
        });
      });
      
      // Process nested variantDetails
      if (hasNestedVariants && rows.filter(r => r.isVariant || r.isSubVariant).length === 0) {
        group.variantDetails.forEach(variant => {
          const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
          
          if (hasSubVariants) {
            rows.push({
              type: 'variant',
              id: variant.variantId || `variant-${rows.length}`,
              name: variant.variantName || 'Variant',
              displayName: variant.variantName || 'Variant',
              image: variant.image || group.image,
              price: 0,
              originalPrice: null,
              hasDiscount: false,
              quantity: 0,
              total: 0,
              unit: group.unit || 'pcs',
              color: variant.selectedColor || null,
              hasColor: !!variant.selectedColor,
              isBase: false,
              isVariant: true,
              isSubVariant: false,
              indent: 1,
              parentName: group.productName,
              badge: 'Variant',
              variantId: variant.variantId,
              subVariantId: null,
              grandParentName: null,
              variantName: variant.variantName,
              subVariantName: null,
              isHeader: true,
              showPrice: false
            });
            
            variant.subVariants.forEach(sub => {
              const subPrice = sub.subVariantDiscountPrice > 0 ? sub.subVariantDiscountPrice :
                              sub.subVariantRegularPrice > 0 ? sub.subVariantRegularPrice :
                              variant.variantRegularPrice || 0;
              const subQuantity = sub.quantity || 0;
              const subTotal = subPrice * subQuantity;
              const subOriginalPrice = sub.subVariantRegularPrice > 0 && sub.subVariantDiscountPrice > 0 ? sub.subVariantRegularPrice : null;
              const subHasDiscount = subOriginalPrice && subOriginalPrice > subPrice;
              
              rows.push({
                type: 'subVariant',
                id: sub.subVariantId || `sub-${rows.length}`,
                name: sub.subVariantName || 'Sub-Variant',
                displayName: sub.subVariantName || 'Sub-Variant',
                image: sub.image || variant.image || group.image,
                price: subPrice,
                originalPrice: subOriginalPrice,
                hasDiscount: subHasDiscount,
                quantity: subQuantity,
                total: subTotal,
                unit: group.unit || 'pcs',
                color: sub.selectedColor || variant.selectedColor || null,
                hasColor: !!(sub.selectedColor || variant.selectedColor),
                isBase: false,
                isVariant: false,
                isSubVariant: true,
                indent: 2,
                parentName: variant.variantName || 'Variant',
                grandParentName: group.productName,
                badge: 'Sub',
                variantId: variant.variantId,
                subVariantId: sub.subVariantId,
                variantName: variant.variantName,
                subVariantName: sub.subVariantName,
                showPrice: true
              });
            });
          } else {
            const price = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice :
                         variant.variantRegularPrice > 0 ? variant.variantRegularPrice : 0;
            const quantity = variant.quantity || 1;
            const total = price * quantity;
            const originalPrice = variant.variantRegularPrice > 0 && variant.variantDiscountPrice > 0 ? variant.variantRegularPrice : null;
            const hasDiscount = originalPrice && originalPrice > price;
            
            rows.push({
              type: 'variant',
              id: variant.variantId || `variant-${rows.length}`,
              name: variant.variantName || 'Variant',
              displayName: variant.variantName || 'Variant',
              image: variant.image || group.image,
              price: price,
              originalPrice: originalPrice,
              hasDiscount: hasDiscount,
              quantity: quantity,
              total: total,
              unit: group.unit || 'pcs',
              color: variant.selectedColor || null,
              hasColor: !!variant.selectedColor,
              isBase: false,
              isVariant: true,
              isSubVariant: false,
              indent: 1,
              parentName: group.productName,
              badge: 'Variant',
              variantId: variant.variantId,
              subVariantId: null,
              grandParentName: null,
              variantName: variant.variantName,
              subVariantName: null,
              showPrice: true
            });
          }
        });
      }
      
      // Fallback
      if (rows.length === 0 && group.items.length > 0) {
        const firstItem = group.items[0];
        const colorData = getColorDisplay(firstItem);
        const hasColor = colorData.length > 0;
        const price = firstItem.discountPrice || firstItem.regularPrice || 0;
        const quantity = firstItem.quantity || 0;
        const total = price * quantity;
        
        rows.push({
          type: 'base',
          id: 'base',
          name: group.productName,
          displayName: group.productName,
          image: group.image,
          price: price,
          quantity: quantity,
          total: total,
          unit: group.unit || 'pcs',
          color: hasColor ? colorData[0].color : null,
          hasColor: hasColor,
          isBase: true,
          isVariant: false,
          isSubVariant: false,
          indent: 0,
          badge: 'Product',
          parentName: null,
          grandParentName: null,
          variantId: null,
          subVariantId: null,
          originalPrice: null,
          hasDiscount: false,
          variantName: null,
          subVariantName: null,
          showPrice: true
        });
      }
      
      result.push({
        productId: group.productId,
        productName: group.productName,
        image: group.image,
        hasVariants: group.hasVariants,
        hasSubVariants: group.hasSubVariants,
        rows: rows,
        totalQuantity: rows.reduce((sum, row) => sum + row.quantity, 0),
        subtotal: rows.reduce((sum, row) => sum + row.total, 0)
      });
    });
    
    return result;
  };

  if (!isOpen || !order) return null;

  const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
  const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
  
  // Check if status can be changed
  const terminalStatuses = ['cancelled', 'delivered', 'returned', 'rejected'];
  const canChangeStatus = !terminalStatuses.includes(order.orderStatus) && 
                          order.orderStatus !== 'courier_assigned' &&
                          !['processing', 'shipped', 'out_for_delivery'].includes(order.orderStatus);
  
  const isCancelled = order.orderStatus === 'cancelled';
  const isDelivered = order.orderStatus === 'delivered';
  const isCourierAssigned = order.orderStatus === 'courier_assigned';
  const isRejected = order.orderStatus === 'rejected';
  const isReturned = order.orderStatus === 'returned';
  const isPartialDelivery = order.orderStatus === 'partial_delivery';

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await onDownloadInvoice(order);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download invoice');
    } finally {
      setDownloading(false);
    }
  };

  const getDeviceIcon = (deviceType) => {
    switch(deviceType?.toLowerCase()) {
      case 'mobile': return <FaMobile className="w-3.5 h-3.5" />;
      case 'tablet': return <FaTablet className="w-3.5 h-3.5" />;
      case 'desktop': return <FaDesktop className="w-3.5 h-3.5" />;
      default: return <FaLaptop className="w-3.5 h-3.5" />;
    }
  };

  const getDeviceInfo = (deviceInfo) => {
    if (!deviceInfo) return null;
    const parts = [];
    if (deviceInfo.deviceType) parts.push(deviceInfo.deviceType);
    if (deviceInfo.browser) parts.push(deviceInfo.browser);
    if (deviceInfo.os) parts.push(deviceInfo.os);
    return parts.join(' • ');
  };

  const getStatusNotes = () => {
    if (!order.statusHistory || order.statusHistory.length === 0) {
      return [];
    }
    const notes = order.statusHistory
      .filter(entry => entry.note && entry.note.trim() !== '')
      .map(entry => {
        let userEmail = null;
        let userName = null;
        if (entry.updatedBy) {
          if (typeof entry.updatedBy === 'object') {
            userEmail = entry.updatedBy.email || null;
            userName = entry.updatedBy.contactPerson || entry.updatedBy.name || null;
          }
        }
        return {
          status: entry.status,
          note: entry.note,
          timestamp: entry.timestamp,
          updatedByRole: entry.updatedByRole || 'system',
          updatedByEmail: userEmail,
          updatedByName: userName
        };
      });
    return notes;
  };

  const statusNotes = getStatusNotes();
  const groupedItems = groupItemsForDisplay(order.items || []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-[#82947A] to-[#708268] text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileInvoice className="w-5 h-5" />
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Order Details</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <button
              onClick={() => {
                onClose();
                canChangeStatus && onStatusUpdate();
              }}
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border transition-all ${statusInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'} ${canChangeStatus ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
              title={canChangeStatus ? 'Click to update status' : 'Status cannot be changed'}
            >
              {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
              <span className="font-medium">Order: {statusInfo?.label || order.orderStatus}</span>
              {canChangeStatus && <FaEdit className="w-2.5 h-2.5 ml-1" />}
            </button>
            <button
              onClick={() => {
                onClose();
                onPaymentUpdate();
              }}
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border transition-all ${paymentInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'} cursor-pointer hover:opacity-80`}
              title="Click to update payment status"
            >
              <FaMoneyBillWave className="w-3 h-3" />
              <span className="font-medium">Payment: {paymentInfo?.label || order.paymentStatus}</span>
              <FaEdit className="w-2.5 h-2.5 ml-1" />
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border bg-[#E2E7EA] text-[#82947A] border-[#82947A]/30 hover:bg-white transition-colors disabled:opacity-50"
            >
              {downloading ? (
                <FaSpinner className="w-3 h-3 animate-spin" />
              ) : (
                <FaDownload className="w-3 h-3" />
              )}
              Invoice
            </button>
          </div>

          {order.deviceInfo && (
            <div className="mb-5 bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
              <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
                <FaGlobe className="w-3.5 h-3.5 text-[#82947A]" />
                Device & Location Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">IP Address:</span>
                  <span className="font-mono text-black">{order.deviceInfo.ipAddress || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">Device:</span>
                  <span className="flex items-center gap-1 text-black">
                    {getDeviceIcon(order.deviceInfo.deviceType)}
                    {getDeviceInfo(order.deviceInfo) || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">Browser:</span>
                  <span className="text-black">{order.deviceInfo.browser || 'N/A'} {order.deviceInfo.browserVersion || ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">OS:</span>
                  <span className="text-black">{order.deviceInfo.os || 'N/A'} {order.deviceInfo.osVersion || ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">Screen:</span>
                  <span className="text-black">{order.deviceInfo.screenResolution || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">Connection:</span>
                  <span className="text-black">{order.deviceInfo.connectionType || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">Timezone:</span>
                  <span className="text-black">{order.deviceInfo.timezone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">Language:</span>
                  <span className="text-black">{order.deviceInfo.language || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}

          {isDelivered && order.deliveredAt && (
            <div className="mb-5 bg-[#82947A]/10 border-l-4 border-[#82947A] rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaCheckDouble className="w-4 h-4 text-[#82947A] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-[#82947A]">Order Delivered</h4>
                  <p className="text-xs text-[#82947A]/80 mt-1">
                    <span className="font-medium">Delivered on:</span> {new Date(order.deliveredAt).toLocaleDateString('en-BD', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isPartialDelivery && (
            <div className="mb-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaCheckDouble className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-yellow-700">Partial Delivery</h4>
                  <p className="text-xs text-yellow-600 mt-1">
                    Only part of this order has been delivered.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isCancelled && order.cancellationReason && (
            <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaExclamationTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
                  <p className="text-xs text-red-600 mt-1">
                    <span className="font-medium">Reason:</span> {order.cancellationReason}
                  </p>
                  {order.cancelledAt && (
                    <p className="text-xs text-red-500 mt-1">
                      <span className="font-medium">Cancelled on:</span> {new Date(order.cancelledAt).toLocaleDateString('en-BD', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {isRejected && order.rejectionReason && (
            <div className="mb-5 bg-orange-50 border-l-4 border-orange-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaTimesCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-orange-700">Order Rejected</h4>
                  <p className="text-xs text-orange-600 mt-1">
                    <span className="font-medium">Reason:</span> {order.rejectionReason}
                  </p>
                  {order.cancelledAt && (
                    <p className="text-xs text-orange-500 mt-1">
                      <span className="font-medium">Rejected on:</span> {new Date(order.cancelledAt).toLocaleDateString('en-BD', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {isReturned && (
            <div className="mb-5 bg-purple-50 border-l-4 border-purple-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaUndo className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-purple-700">Order Returned</h4>
                  <p className="text-xs text-purple-600 mt-1">
                    This order has been returned.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isCourierAssigned && order.deliveryService && (
            <div className="mb-5 bg-[#82947A]/10 border-l-4 border-[#82947A] rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaTruck className="w-4 h-4 text-[#82947A] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-[#82947A]">Courier Assigned</h4>
                  <p className="text-xs text-[#82947A]/80 mt-1">
                    <span className="font-medium">Courier:</span> {order.deliveryService.courierName || 'N/A'}
                  </p>
                  {order.deliveryService.trackingNumber && (
                    <p className="text-xs text-[#82947A]/80 mt-1">
                      <span className="font-medium">Tracking:</span> {order.deliveryService.trackingNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
              <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
                <FaUser className="w-3.5 h-3.5 text-[#82947A]" />
                Customer Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#64748B]">Name:</span> <span className="text-black font-medium">{order.customerInfo?.fullName}</span></p>
                <p><span className="text-[#64748B]">Email:</span> <span className="text-black">{order.customerInfo?.email}</span></p>
                <p><span className="text-[#64748B]">Phone:</span> <span className="text-black">{order.customerInfo?.phone}</span></p>
                {order.customerInfo?.note && (
                  <p><span className="text-[#64748B]">Note:</span> <span className="text-black">{order.customerInfo.note}</span></p>
                )}
              </div>
            </div>

            <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
              <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#82947A]" />
                Delivery Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#64748B]">Division:</span> <span className="font-medium text-black">{order.customerInfo?.division || 'N/A'}</span></p>
                <p><span className="text-[#64748B]">District/City:</span> <span className="font-medium text-black">{order.customerInfo?.city || 'N/A'}</span></p>
                <p><span className="text-[#64748B]">Upazila/Thana:</span> <span className="font-medium text-black">{order.customerInfo?.zone || 'N/A'}</span></p>
                {order.customerInfo?.area && (
                  <p><span className="text-[#64748B]">Union/Area:</span> <span className="font-medium text-black">{order.customerInfo.area}</span></p>
                )}
                <p><span className="text-[#64748B]">Address:</span> <span className="text-black">{order.customerInfo?.address}</span></p>
                {order.trackingNumber && (
                  <p><span className="text-[#64748B]">Tracking:</span> <span className="font-mono text-[#82947A]">{order.trackingNumber}</span></p>
                )}
                {order.deliveryService?.trackingUrl && (
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#82947A]/20">
                    <span className="text-[#64748B]">Track Link:</span>
                    <a
                      href={order.deliveryService.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#82947A] hover:underline flex items-center gap-1"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                      Track on {order.deliveryService.courierName || 'Courier'}
                    </a>
                  </div>
                )}
                {order.deliveryNote && (
                  <p><span className="text-[#64748B]">Order Note:</span> <span className="text-black">{order.deliveryNote}</span></p>
                )}
              </div>
            </div>
          </div>

          {/* ========== ORDER ITEMS TABLE - UPDATED ========== */}
          <div className="mb-5">
            <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
              <FaBox className="w-3.5 h-3.5 text-[#82947A]" />
              Order Items
            </h3>
            
            {groupedItems.length === 0 ? (
              <p className="text-sm text-[#64748B]">No items found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-[#E2E7EA]">
                    <tr>
                      <th className="px-2 py-1.5 text-left text-black">#</th>
                      <th className="px-2 py-1.5 text-left text-black">Product / Variant</th>
                      <th className="px-2 py-1.5 text-center text-black">Qty</th>
                      <th className="px-2 py-1.5 text-center text-black hidden sm:table-cell">Unit</th>
                      <th className="px-2 py-1.5 text-right text-black hidden sm:table-cell">Price</th>
                      <th className="px-2 py-1.5 text-right text-black">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedItems.map((productGroup, groupIndex) => {
                      const rows = productGroup.rows || [];
                      const hasVariants = productGroup.hasVariants;
                      
                      if (rows.length === 0) return null;
                      
                      let rowNumber = groupIndex + 1;
                      
                      return rows.map((row, rowIndex) => {
                        const indent = row.indent || 0;
                        const paddingLeft = indent === 0 ? 'pl-1' : indent === 1 ? 'pl-4 sm:pl-5' : 'pl-7 sm:pl-9';
                        
                        const showRowNumber = row.isBase ? rowNumber : '';
                        
                        let badgeDisplay = null;
                        if (row.badge) {
                          badgeDisplay = (
                            <span className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded ml-1 ${
                              row.badge === 'Product' ? 'bg-gray-100 text-gray-500' :
                              row.badge === 'Variant' ? 'bg-purple-50 text-purple-600' :
                              row.badge === 'Sub' ? 'bg-blue-50 text-blue-600' : ''
                            }`}>
                              {row.badge}
                            </span>
                          );
                        }
                        
                        let discountDisplay = null;
                        if (row.hasDiscount && row.originalPrice && row.originalPrice > row.price && row.showPrice !== false && !row.isHeader) {
                          discountDisplay = (
                            <span className="text-[8px] sm:text-[9px] text-green-600 bg-green-50 px-1 py-0.5 rounded">
                              Save {Math.round(((row.originalPrice - row.price) / row.originalPrice) * 100)}%
                            </span>
                          );
                        }
                        
                        const hasColor = row.hasColor && row.color;
                        const color = row.color;
                        
                        const showPrice = row.showPrice !== false && !row.isHeader && !(row.isBase && hasVariants);
                        const price = row.price || 0;
                        const originalPrice = row.originalPrice || null;
                        const hasDiscount = row.hasDiscount || (originalPrice && originalPrice > price);
                        const quantity = row.quantity || 0;
                        const total = row.total || (price * quantity);
                        
                        let displayName = row.displayName || row.name || 'Product';
                        let fullDisplay = displayName;
                        
                        const isHeaderRow = row.isHeader === true;
                        const isBaseRow = row.isBase === true;
                        const isVariantRow = row.isVariant === true && !row.isHeader;
                        const isSubVariantRow = row.isSubVariant === true;
                        
                        const rowImage = row.image || null;
                        
                        return (
                          <tr 
                            key={`${groupIndex}-${rowIndex}`} 
                            className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                              rowIndex === 0 ? 'border-t border-gray-200' : ''
                            } ${isHeaderRow ? 'bg-gray-50/30' : ''}`}
                          >
                            <td className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 text-[8px] sm:text-xs align-middle">
                              {showRowNumber}
                            </td>
                            <td className={`py-1.5 sm:py-2 px-1.5 sm:px-2 ${paddingLeft} align-middle`}>
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                {rowImage ? (
                                  <img 
                                    src={rowImage} 
                                    alt={displayName}
                                    className={`rounded object-cover border border-gray-200 flex-shrink-0 ${
                                      indent === 0 ? 'w-6 h-6 sm:w-8 sm:h-8' : 
                                      indent === 1 ? 'w-5 h-5 sm:w-6 sm:h-6' : 
                                      'w-4 h-4 sm:w-5 sm:h-5'
                                    }`}
                                    onError={(e) => { 
                                      e.target.src = 'https://via.placeholder.com/32?text=No+Image'; 
                                    }}
                                  />
                                ) : (
                                  indent > 0 && (
                                    <span className="text-gray-400 text-[10px] sm:text-xs flex-shrink-0">▸</span>
                                  )
                                )}
                                <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
                                  <span className={`break-words ${
                                    isHeaderRow ? 'font-bold text-purple-700' :
                                    isBaseRow ? 'font-semibold text-gray-900' : 
                                    isVariantRow ? 'font-medium text-gray-800' : 
                                    'text-gray-700'
                                  } ${isHeaderRow ? 'text-xs sm:text-sm' : 'text-[9px] sm:text-xs'}`}>
                                    {fullDisplay}
                                  </span>
                                  {badgeDisplay}
                                  {discountDisplay}
                                  {isHeaderRow && row.quantity === 0 && (
                                    <span className="text-[8px] text-gray-400 ml-1">(See sub variants below)</span>
                                  )}
                                  {isBaseRow && hasVariants && (
                                    <span className="text-[8px] text-gray-400 ml-1">(See variants below)</span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-700 text-[9px] sm:text-xs font-medium align-middle">
                              {isHeaderRow ? '-' : quantity}
                            </td>
                            <td className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 text-[8px] sm:text-xs hidden sm:table-cell align-middle">
                              {row.unit || 'pcs'}
                            </td>
                            <td className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-700 text-[8px] sm:text-xs hidden sm:table-cell align-middle">
                              {isHeaderRow || !showPrice ? '-' : (
                                hasDiscount ? (
                                  <>
                                    <span className="text-green-600 font-medium">৳{price.toFixed(2)}</span>
                                    <span className="text-gray-400 line-through ml-1 text-[7px] sm:text-[8px]">৳{originalPrice.toFixed(2)}</span>
                                  </>
                                ) : (
                                  <>৳{price.toFixed(2)}</>
                                )
                              )}
                            </td>
                            <td className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 font-medium text-gray-900 text-[9px] sm:text-xs align-middle">
                              {isHeaderRow ? '-' : `৳${total.toFixed(2)}`}
                            </td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                  <tfoot className="border-t border-[#82947A]/30">
                    <tr>
                      <td colSpan="5" className="px-2 py-1 text-right font-medium text-black">Subtotal:</td>
                      <td className="px-2 py-1 text-right text-black">৳{order.subtotal?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="px-2 py-1 text-right font-medium text-black">Shipping:</td>
                      <td className="px-2 py-1 text-right text-black">৳{order.shippingCost?.toFixed(2)}</td>
                    </tr>
                    {order.discount > 0 && (
                      <tr className="text-green-600">
                        <td colSpan="5" className="px-2 py-1 text-right font-medium">Discount:</td>
                        <td className="px-2 py-1 text-right font-medium">- ৳{order.discount.toFixed(2)}</td>
                      </tr>
                    )}
                    <tr className="text-sm font-bold">
                      <td colSpan="5" className="px-2 py-1 text-right text-black">Total:</td>
                      <td className="px-2 py-1 text-right text-[#82947A]">৳{order.total?.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-[#82947A]/30">
            <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
              <FaInfoCircle className="w-3.5 h-3.5 text-[#82947A]" />
              Additional Information
            </h3>
            
            {order.couponCode && (
              <div className="mb-2">
                <p className="text-xs">
                  <span className="text-[#64748B]">Coupon Applied:</span> 
                  <span className="text-[#82947A] font-medium ml-1">{order.couponCode}</span>
                </p>
              </div>
            )}

            {order.deliveryNote && (
              <div className="mb-2">
                <p className="text-xs">
                  <span className="text-[#64748B]">Order Note:</span>
                  <span className="text-black font-medium ml-1 whitespace-pre-wrap">{order.deliveryNote}</span>
                </p>
              </div>
            )}

            {statusNotes.length > 0 && (
              <div>
                <p className="text-xs font-medium text-black mb-1.5 flex items-center gap-1">
                  <FaClipboardList className="w-3 h-3 text-[#82947A]" />
                  Status History Notes
                </p>
                <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">
                  {statusNotes.map((note, index) => {
                    const statusLabel = ORDER_STATUSES.find(s => s.value === note.status)?.label || note.status;
                    const formattedDate = note.timestamp ? new Date(note.timestamp).toLocaleString('en-BD', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : '';
                    
                    let updatedByDisplay = 'System';
                    if (note.updatedByEmail) {
                      updatedByDisplay = note.updatedByEmail;
                    } else if (note.updatedByName) {
                      updatedByDisplay = note.updatedByName;
                    } else if (note.updatedByRole && note.updatedByRole !== 'system') {
                      updatedByDisplay = note.updatedByRole;
                    }
                    
                    return (
                      <div key={index} className="bg-white rounded-lg p-2 border border-[#82947A]/20">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-black">
                            {statusLabel}
                          </span>
                          <span className="text-[10px] text-[#64748B]">
                            {formattedDate}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5 break-words">
                          {note.note}
                        </p>
                        {updatedByDisplay && (
                          <span className="text-[10px] text-[#64748B]/60 mt-0.5 block">
                            Updated by: {updatedByDisplay}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {!order.couponCode && !order.deliveryNote && statusNotes.length === 0 && (
              <p className="text-xs text-[#64748B]">No additional information available</p>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 bg-gradient-to-r from-[#82947A] to-[#708268] text-white rounded-xl hover:shadow-lg hover:shadow-[#82947A]/25 transition-all text-sm">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};


// ========== EDIT ORDER MODAL ==========
const EditOrderModal = ({ isOpen, onClose, order, onUpdate, userRole }) => {
  // ========== LOCAL ORDER STATE ==========
  const [localOrder, setLocalOrder] = useState(null);
  const [localItems, setLocalItems] = useState([]);
  const [localDiscount, setLocalDiscount] = useState(0);
  const [localSubtotal, setLocalSubtotal] = useState(0);
  const [localTotal, setLocalTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  
  // ========== EXPANDED SECTIONS FOR ORDER ITEMS ==========
  const [expandedOrderItems, setExpandedOrderItems] = useState({});

  // ========== CUSTOMER INFO STATE ==========
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    division: '',
    address: '',
    city: '',
    zone: '',
    area: '',
    deliveryNote: '',
    discountNote: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState({});
  const [divisions, setDivisions] = useState({});
  const [divisionList, setDivisionList] = useState([]);
  const [citiesByDivision, setCitiesByDivision] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);

  // ========== PRODUCT SEARCH STATE ==========
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariantsWithQty, setSelectedVariantsWithQty] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);
  const [addQuantity, setAddQuantity] = useState(1);
  const [selectedColorsWithQty, setSelectedColorsWithQty] = useState([]);
  
  // ========== PRODUCT COLORS & VARIANTS CACHE ==========
  const [productColorsCache, setProductColorsCache] = useState({});
  const [productVariantsCache, setProductVariantsCache] = useState({});
  
  // ========== CONFIRMATION MODAL STATE ==========
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    title: '',
    message: '',
    onConfirm: null,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'warning'
  });
  
  // ========== CHECK PERMISSIONS ==========
  const isSuperAdmin = userRole === 'super_admin';
  const isAdmin = userRole === 'admin';
  const isModerator = userRole === 'moderator';
  const isAdminOrSuperAdmin = isSuperAdmin || isAdmin;

  // ===== PERMISSION MATRIX =====
  const canEditSensitiveInfo = isSuperAdmin || isAdmin;
  const canEditEmail = isSuperAdmin;
  const canEditAddress = isAdminOrSuperAdmin || isModerator;
  const canEditDeliveryNote = isAdminOrSuperAdmin || isModerator;
  const canEditProducts = isAdminOrSuperAdmin || isModerator;
  const canEditDiscount = isAdminOrSuperAdmin || isModerator;
  
  // ========== CHECK IF ORDER IS EDITABLE ==========
  const nonEditableStatuses = [
    'courier_assigned',
    'ready_to_ship',
    'shipped',
    'out_for_delivery',
    'delivered',
    'cancelled',
    'rejected',
    'refunded',
    'returned',
    'partial_delivery'
  ];
  
  const isEditable = order && 
    !nonEditableStatuses.includes(order.orderStatus) && 
    (isAdminOrSuperAdmin || isModerator);

  // ========== RECALCULATE TOTALS ==========
  const recalculateTotals = useCallback((items, discount) => {
    const subtotal = items.reduce((sum, item) => {
      // Handle variants and sub-variants
      if (item.variantId) {
        const price = item.variantDiscountPrice > 0 ? item.variantDiscountPrice : item.variantRegularPrice || item.regularPrice;
        return sum + (price * item.quantity);
      }
      // Handle colors
      if (item.selectedColor) {
        const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
        return sum + (price * item.quantity);
      }
      const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
      return sum + (price * item.quantity);
    }, 0);
    
    const shipping = order?.shippingCost || 0;
    const total = subtotal + shipping - (discount || 0);
    
    return { subtotal, shipping, total };
  }, [order]);

  // ========== UPDATE LOCAL TOTALS ==========
  const updateTotals = useCallback(() => {
    const { subtotal, shipping, total } = recalculateTotals(localItems, localDiscount);
    setLocalSubtotal(subtotal);
    setShippingCost(shipping);
    setLocalTotal(total);
  }, [localItems, localDiscount, recalculateTotals]);

  // ========== FETCH PRODUCT COLORS ==========
  const fetchProductColors = useCallback(async (productId) => {
    if (productColorsCache[productId]) {
      return productColorsCache[productId];
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      if (data.success && data.data.product.colors) {
        const colors = data.data.product.colors;
        setProductColorsCache(prev => ({
          ...prev,
          [productId]: colors
        }));
        return colors;
      }
      return [];
    } catch (error) {
      console.error('Error fetching product colors:', error);
      return [];
    }
  }, [productColorsCache]);

  // ========== FETCH PRODUCT VARIANT TYPES ==========
  const fetchProductVariantTypes = useCallback(async (productId) => {
    if (productVariantsCache[productId]) {
      return productVariantsCache[productId];
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      if (data.success && data.data.product.hasVariants && data.data.product.variantTypes) {
        const variantTypes = data.data.product.variantTypes;
        setProductVariantsCache(prev => ({
          ...prev,
          [productId]: variantTypes
        }));
        return variantTypes;
      }
      return [];
    } catch (error) {
      console.error('Error fetching product variant types:', error);
      return [];
    }
  }, [productVariantsCache]);

  // ========== FETCH LOCATIONS ==========
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        const data = await response.json();
        setLocationData(data.locationData || {});
        
        const divisions = data.divisions || {};
        const filteredDivisions = {};
        const divisionKeys = [];
        
        Object.keys(divisions).forEach(key => {
          if (key !== 'Other') {
            filteredDivisions[key] = divisions[key];
            divisionKeys.push(key);
          }
        });
        
        setDivisions(filteredDivisions);
        setDivisionList(divisionKeys.sort());
        setLocationLoading(false);
      } catch (error) {
        console.error('Failed to load location data:', error);
        setLocationLoading(false);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    if (formData.division && divisions[formData.division]) {
      setCitiesByDivision(divisions[formData.division]);
      setZones([]);
      setAreas([]);
    } else {
      setCitiesByDivision([]);
    }
  }, [formData.division, divisions]);

  useEffect(() => {
    const selectedCity = formData.city;
    if (selectedCity && locationData[selectedCity]) {
      const availableZones = Object.keys(locationData[selectedCity].zones || {});
      setZones(availableZones);
      setAreas([]);
    } else {
      setZones([]);
      setAreas([]);
    }
  }, [formData.city, locationData]);

  useEffect(() => {
    const selectedCity = formData.city;
    const selectedZone = formData.zone;
    if (selectedCity && selectedZone && locationData[selectedCity]) {
      const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
      setAreas(availableAreas);
    } else {
      setAreas([]);
    }
  }, [formData.zone, formData.city, locationData]);

  // ========== FLATTEN ORDER ITEMS - NORMALIZES ALL SHAPES ==========
  const flattenOrderItems = useCallback((items) => {
    const flattenedItems = [];

    items.forEach(item => {
      const hasNestedVariantDetails = item.variantDetails && item.variantDetails.length > 0;

      if (hasNestedVariantDetails) {
        // ===== NESTED FORMAT: item.variantDetails[].subVariants[] =====
        item.variantDetails.forEach((variant, vIdx) => {
          const hasSub = variant.subVariants && variant.subVariants.length > 0;

          if (hasSub) {
            variant.subVariants.forEach((sub, sIdx) => {
              flattenedItems.push({
                _id: sub._id || `${item._id || item.productId}_v${vIdx}_s${sIdx}`,
                productId: item.productId,
                productName: item.productName,
                productSlug: item.productSlug || '',
                image: item.image || '',
                regularPrice: item.regularPrice,
                discountPrice: item.discountPrice || 0,
                costPerItem: item.costPerItem || 0,
                buyingPrice: item.buyingPrice || 0,
                unit: item.unit || 'pcs',
                stockQuantity: sub.stockQuantity || variant.stockQuantity || item.stockQuantity || 0,
                variantId: variant.variantId,
                variantName: variant.variantName || 'Variant',
                variantType: variant.variantType || variant.type || null,
                subVariantId: sub.subVariantId,
                subVariantName: sub.subVariantName || 'Sub-Variant',
                variantRegularPrice: sub.subVariantRegularPrice || variant.variantRegularPrice || 0,
                variantDiscountPrice: sub.subVariantDiscountPrice || variant.variantDiscountPrice || 0,
                variantImage: sub.image || variant.image || item.image || '',
                selectedColor: sub.selectedColor || variant.selectedColor || null,
                quantity: sub.quantity || 0,
                colors: []
              });
            });
          } else {
            flattenedItems.push({
              _id: variant._id || `${item._id || item.productId}_v${vIdx}`,
              productId: item.productId,
              productName: item.productName,
              productSlug: item.productSlug || '',
              image: item.image || '',
              regularPrice: item.regularPrice,
              discountPrice: item.discountPrice || 0,
              costPerItem: item.costPerItem || 0,
              buyingPrice: item.buyingPrice || 0,
              unit: item.unit || 'pcs',
              stockQuantity: variant.stockQuantity || item.stockQuantity || 0,
              variantId: variant.variantId,
              variantName: variant.variantName || 'Variant',
              variantType: variant.variantType || variant.type || null,
              subVariantId: null,
              subVariantName: null,
              variantRegularPrice: variant.variantRegularPrice || 0,
              variantDiscountPrice: variant.variantDiscountPrice || 0,
              variantImage: variant.image || item.image || '',
              selectedColor: variant.selectedColor || null,
              quantity: variant.quantity || 0,
              colors: []
            });
          }
        });

      } else if (item.variantId) {
        // ===== FLAT FORMAT (create-order / manual-order): variantId already on the item =====
        flattenedItems.push({
          ...item,
          _id: item._id || `temp_${Date.now()}_${Math.random()}`,
          colors: []
        });

      } else if (item.colors && item.colors.length > 0) {
        // ===== COLOR PRODUCT =====
        item.colors.forEach(colorItem => {
          flattenedItems.push({
            ...item,
            _id: `${item._id || item.productId}_${colorItem.color}_${Date.now()}_${Math.random()}`,
            quantity: colorItem.quantity,
            selectedColor: colorItem.color,
            colors: []
          });
        });

      } else {
        // ===== PLAIN PRODUCT =====
        flattenedItems.push({
          ...item,
          _id: item._id || `temp_${Date.now()}_${Math.random()}`
        });
      }
    });

    return flattenedItems;
  }, []);

  // ========== RESET MODAL STATE ==========
  const resetModal = useCallback(() => {
    setLocalItems([]);
    setLocalDiscount(0);
    setLocalSubtotal(0);
    setLocalTotal(0);
    setShippingCost(0);
    setHasChanges(false);
    setLocalOrder(null);
    setSelectedColorsWithQty([]);
    setSelectedVariantsWithQty([]);
    setShowAddProduct(false);
    setSearchQuery('');
    setSearchResults([]);
    setSelectedProduct(null);
    setAddQuantity(1);
    setProductColorsCache({});
    setExpandedOrderItems({});
  }, []);

  // ========== INITIALIZE LOCAL STATE FROM ORDER ==========
  useEffect(() => {
    if (order && isOpen) {
      // Don't re-initialize if we already have changes
      if (hasChanges) return;
      
      // Flatten the order items - this now handles nested variantDetails too
      const flattenedItems = flattenOrderItems(order.items);
      
      setLocalOrder({ ...order });
      setLocalItems(flattenedItems);
      setLocalDiscount(order.discount || 0);
      
      const { subtotal, shipping, total } = recalculateTotals(flattenedItems, order.discount || 0);
      setLocalSubtotal(subtotal);
      setShippingCost(shipping);
      setLocalTotal(total);
      
      setHasChanges(false);
      
      setFormData({
        fullName: order.customerInfo?.fullName || '',
        email: order.customerInfo?.email || '',
        phone: order.customerInfo?.phone || '',
        division: order.customerInfo?.division || '',
        address: order.customerInfo?.address || '',
        city: order.customerInfo?.city || '',
        zone: order.customerInfo?.zone || '',
        area: order.customerInfo?.area || '',
        deliveryNote: order.deliveryNote || '',
        discountNote: ''
      });
      
      setSelectedVariantsWithQty([]);
      setSelectedColorsWithQty([]);
      setShowAddProduct(false);
      setSearchQuery('');
      setSearchResults([]);
      setSelectedProduct(null);
      setAddQuantity(1);
      
      // Fetch details for all products in the order
      const uniqueProductIds = [...new Set(flattenedItems.map(item => item.productId))];
      uniqueProductIds.forEach(productId => {
        fetchProductColors(productId);
        fetchProductVariantTypes(productId);
      });
    }
  }, [order, isOpen, recalculateTotals, fetchProductColors, fetchProductVariantTypes, flattenOrderItems, hasChanges]);

  // Update totals when items or discount change
  useEffect(() => {
    updateTotals();
  }, [localItems, localDiscount, updateTotals]);

  // ========== SEARCH PRODUCTS ==========
  const searchProducts = useCallback(async (query) => {
    if (!query || query.length < 1) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/orders/search-products?query=${encodeURIComponent(query)}&limit=10`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search products error:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchProducts(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchProducts]);

  // ========== HANDLE SELECT PRODUCT ==========
  const handleSelectProduct = async (product) => {
    setSelectedColorsWithQty([]);
    setSelectedVariantsWithQty([]);
    setAddQuantity(1);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${product._id}`);
      const data = await response.json();
      setSelectedProduct(data.success ? data.data.product : product);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setSelectedProduct(product);
    }
  };

  // ========== VARIANT FUNCTIONS ==========
  const toggleVariantSelection = (variantType, variant) => {
    const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
    
    if (hasSubVariants) {
      const firstSubVariant = variant.subVariants[0];
      const exists = selectedVariantsWithQty.find(
        v => v.variantId === variant.id && v.subVariantId === firstSubVariant.id
      );
      if (exists) {
        setSelectedVariantsWithQty(prev => 
          prev.filter(v => !(v.variantId === variant.id && v.subVariantId === firstSubVariant.id))
        );
      } else {
        setSelectedVariantsWithQty(prev => [...prev, {
          variantId: variant.id,
          variantName: variant.name,
          variantType: variantType.type,
          subVariantId: firstSubVariant.id,
          subVariantName: firstSubVariant.name,
          regularPrice: firstSubVariant.regularPrice || 0,
          discountPrice: firstSubVariant.discountPrice || 0,
          image: firstSubVariant.images?.[0] || variant.images?.[0] || '',
          stockQuantity: firstSubVariant.stockQuantity || variant.stockQuantity || 0,
          quantity: 1
        }]);
      }
      setHasChanges(true);
      return;
    }
    
    setSelectedVariantsWithQty(prev => {
      const exists = prev.find(v => v.variantId === variant.id && !v.subVariantId);
      if (exists) {
        return prev.filter(v => !(v.variantId === variant.id && !v.subVariantId));
      }
      return [...prev, {
        variantId: variant.id,
        variantName: variant.name,
        variantType: variantType.type,
        subVariantId: null,
        subVariantName: null,
        regularPrice: variant.regularPrice || 0,
        discountPrice: variant.discountPrice || 0,
        image: variant.images?.[0] || '',
        stockQuantity: variant.stockQuantity || 0,
        quantity: 1
      }];
    });
    setHasChanges(true);
  };

  const toggleSubVariantSelection = (variantType, variant, subVariant) => {
    setSelectedVariantsWithQty(prev => {
      const exists = prev.find(v => v.variantId === variant.id && v.subVariantId === subVariant.id);
      if (exists) {
        return prev.filter(v => !(v.variantId === variant.id && v.subVariantId === subVariant.id));
      }
      return [...prev, {
        variantId: variant.id,
        variantName: variant.name,
        variantType: variantType.type,
        subVariantId: subVariant.id,
        subVariantName: subVariant.name,
        regularPrice: subVariant.regularPrice || 0,
        discountPrice: subVariant.discountPrice || 0,
        image: subVariant.images?.[0] || '',
        stockQuantity: subVariant.stockQuantity || 0,
        quantity: 1
      }];
    });
    setHasChanges(true);
  };

  const updateNewVariantQty = (variantId, subVariantId, newQty) => {
    if (newQty < 1) return;
    setSelectedVariantsWithQty(prev => prev.map(v => {
      if (v.variantId === variantId && v.subVariantId === subVariantId) {
        const max = v.stockQuantity || 999;
        return { ...v, quantity: Math.min(newQty, max) };
      }
      return v;
    }));
  };

  // ========== COLOR FUNCTIONS ==========
  const toggleColorSelection = (color) => {
    setSelectedColorsWithQty(prev => {
      const exists = prev.find(c => c.color === color);
      if (exists) return prev.filter(c => c.color !== color);
      return [...prev, { color, quantity: 1 }];
    });
  };

  const updateSelectedColorQuantity = (color, newQuantity) => {
    if (newQuantity < 1) return;
    
    const totalSelectedOthers = selectedColorsWithQty
      .filter(c => c.color !== color)
      .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
    
    if (selectedProduct && totalSelectedOthers + newQuantity > selectedProduct.stockQuantity) {
      toast.warning(`Total quantity cannot exceed available stock (${selectedProduct.stockQuantity})`);
      return;
    }
    
    setSelectedColorsWithQty(prev => 
      prev.map(c => 
        c.color === color ? { ...c, quantity: newQuantity } : c
      )
    );
  };

  const handleColorQuantityInputChange = (color, value) => {
    if (value === '') {
      setSelectedColorsWithQty(prev => 
        prev.map(c => 
          c.color === color ? { ...c, quantity: '' } : c
        )
      );
      return;
    }
    
    let qty = parseInt(value);
    if (isNaN(qty)) return;
    qty = Math.max(1, qty);
    
    const totalSelectedOthers = selectedColorsWithQty
      .filter(c => c.color !== color)
      .reduce((sum, c) => sum + Number(c.quantity || 0), 0);
    
    const maxAllowed = selectedProduct ? selectedProduct.stockQuantity - totalSelectedOthers : Infinity;
    
    if (qty > maxAllowed) {
      toast.warning(`Only ${maxAllowed} more item(s) can be assigned to this color.`);
      qty = Math.max(1, maxAllowed);
    }
    
    setSelectedColorsWithQty(prev => 
      prev.map(c => 
        c.color === color ? { ...c, quantity: qty } : c
      )
    );
  };

  // ========== ADD VARIANT TO ORDER GROUP ==========
  const addVariantToOrderGroup = (group, variant, variantTypeName) => {
    const hasSub = variant.subVariants && variant.subVariants.length > 0;
    if (hasSub) {
      addSubVariantToOrderGroup(group, variant.id, variant.subVariants[0], variant.name, variantTypeName);
      return;
    }
    
    const newItem = {
      _id: `temp_${Date.now()}_${Math.random()}`,
      productId: group.productId,
      productName: group.productName,
      productSlug: group.productSlug || '',
      image: variant.images?.[0] || group.image,
      regularPrice: group.regularPrice,
      discountPrice: group.discountPrice,
      costPerItem: group.costPerItem || 0,
      buyingPrice: group.buyingPrice || 0,
      stockQuantity: variant.stockQuantity || group.stockQuantity,
      unit: group.unit,
      variantId: variant.id,
      variantName: variant.name,
      variantType: variantTypeName,
      subVariantId: null,
      subVariantName: null,
      variantRegularPrice: variant.regularPrice || 0,
      variantDiscountPrice: variant.discountPrice || 0,
      variantImage: variant.images?.[0] || '',
      selectedColor: null,
      quantity: 1,
      colors: []
    };
    setLocalItems(prev => [...prev, newItem]);
    setHasChanges(true);
    toast.success(`Added ${variant.name} to ${group.productName}`);
  };

  const addSubVariantToOrderGroup = (group, variantId, subVariant, parentVariantName, variantTypeName) => {
    const newItem = {
      _id: `temp_${Date.now()}_${Math.random()}`,
      productId: group.productId,
      productName: group.productName,
      productSlug: group.productSlug || '',
      image: subVariant.images?.[0] || group.image,
      regularPrice: group.regularPrice,
      discountPrice: group.discountPrice,
      costPerItem: group.costPerItem || 0,
      buyingPrice: group.buyingPrice || 0,
      stockQuantity: subVariant.stockQuantity || group.stockQuantity,
      unit: group.unit,
      variantId: variantId,
      variantName: parentVariantName,
      variantType: variantTypeName,
      subVariantId: subVariant.id,
      subVariantName: subVariant.name,
      variantRegularPrice: subVariant.regularPrice || 0,
      variantDiscountPrice: subVariant.discountPrice || 0,
      variantImage: subVariant.images?.[0] || '',
      selectedColor: subVariant.color || null,
      quantity: 1,
      colors: []
    };
    setLocalItems(prev => [...prev, newItem]);
    setHasChanges(true);
    toast.success(`Added ${subVariant.name} to ${group.productName}`);
  };

  // ========== UPDATE VARIANT ITEM QUANTITY ==========
  const updateVariantItemQuantity = (itemId, newQuantity) => {
    const item = localItems.find(i => i._id === itemId);
    if (!item) return;

    if (newQuantity < 1) {
      showConfirmDialog(
        'Remove Item',
        `Are you sure you want to remove "${item.productName}"${
          item.subVariantName ? ` - ${item.subVariantName}` : item.variantName ? ` - ${item.variantName}` : ''
        } from this order?`,
        () => {
          setLocalItems(prev => prev.filter(i => i._id !== itemId));
          setHasChanges(true);
          toast.success('Removed item from order');
        },
        'Remove', 'Cancel', 'danger'
      );
      return;
    }

    const maxAllowed = item.stockQuantity || 999;
    if (newQuantity > maxAllowed) {
      toast.warning(`Only ${maxAllowed} item(s) available for this variant.`);
      return;
    }

    setHasChanges(true);
    setLocalItems(prev => prev.map(i => i._id === itemId ? { ...i, quantity: newQuantity } : i));
  };

  const handleVariantItemQuantityInputChange = (itemId, value) => {
    const item = localItems.find(i => i._id === itemId);
    if (!item) return;

    if (value === '') {
      setLocalItems(prev => prev.map(i => i._id === itemId ? { ...i, quantity: '' } : i));
      return;
    }

    let qty = parseInt(value);
    if (isNaN(qty)) return;
    qty = Math.max(1, qty);

    const maxAllowed = item.stockQuantity || 999;
    qty = Math.min(qty, maxAllowed);

    setLocalItems(prev => prev.map(i => i._id === itemId ? { ...i, quantity: qty } : i));
    if (parseInt(value) > maxAllowed) {
      toast.warning(`Only ${maxAllowed} item(s) available for this variant.`);
    }
    setHasChanges(true);
  };

  // ========== ADD PRODUCT TO LOCAL ORDER ==========
  const handleAddProduct = async () => {
    if (!selectedProduct) {
      toast.error('Please select a product');
      return;
    }

    const hasVariants = selectedProduct.hasVariants && selectedProduct.variantTypes?.length > 0;
    const hasColors = !hasVariants && selectedProduct.colors && selectedProduct.colors.length > 0;

    if (hasVariants && selectedVariantsWithQty.length === 0) {
      toast.error('Please select at least one variant');
      return;
    }
    if (hasColors && selectedColorsWithQty.length === 0) {
      toast.error('Please select at least one color with quantity');
      return;
    }
    if (!hasVariants && !hasColors && addQuantity < 1) {
      toast.error('Please enter a valid quantity');
      return;
    }
    if (hasColors) {
      const invalidColors = selectedColorsWithQty.filter(c => !c.quantity || c.quantity < 1);
      if (invalidColors.length > 0) {
        toast.error('Please set valid quantities for all selected colors');
        return;
      }
      const totalSelectedQty = selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0);
      if (totalSelectedQty > selectedProduct.stockQuantity) {
        toast.error(`Total quantity (${totalSelectedQty}) cannot exceed available stock (${selectedProduct.stockQuantity}).`);
        return;
      }
    }
    if (!hasVariants && !hasColors && addQuantity > selectedProduct.stockQuantity) {
      toast.error(`Only ${selectedProduct.stockQuantity} item(s) available in stock.`);
      return;
    }

    setAddingProduct(true);

    try {
      let productSlug = selectedProduct.slug;
      if (!productSlug && selectedProduct.productName) {
        productSlug = selectedProduct.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      }
      if (!productSlug) productSlug = 'unknown-product';

      // ========== VARIANTS ==========
      if (hasVariants) {
        const newItems = selectedVariantsWithQty.map(v => ({
          _id: `temp_${Date.now()}_${Math.random()}`,
          productId: selectedProduct._id,
          productName: selectedProduct.productName,
          productSlug,
          image: v.image || selectedProduct.images?.[0]?.url || '',
          regularPrice: selectedProduct.regularPrice,
          discountPrice: selectedProduct.discountPrice || 0,
          costPerItem: selectedProduct.costPerItem || 0,
          buyingPrice: selectedProduct.buyingPrice || 0,
          stockQuantity: v.stockQuantity || selectedProduct.stockQuantity,
          unit: selectedProduct.unit || 'pcs',
          variantId: v.variantId,
          variantName: v.variantName || 'Variant',
          variantType: v.variantType,
          subVariantId: v.subVariantId,
          subVariantName: v.subVariantName,
          variantRegularPrice: v.regularPrice || 0,
          variantDiscountPrice: v.discountPrice || 0,
          variantImage: v.image || '',
          selectedColor: null,
          quantity: v.quantity || 1,
          colors: []
        }));

        let blocked = false;
        setLocalItems(prev => {
          const updated = [...prev];
          const toAdd = [];
          newItems.forEach(newItem => {
            const existingIndex = updated.findIndex(i =>
              i.productId === newItem.productId &&
              i.variantId === newItem.variantId &&
              (i.subVariantId || null) === (newItem.subVariantId || null)
            );
            if (existingIndex !== -1) {
              const combinedQty = updated[existingIndex].quantity + newItem.quantity;
              if (combinedQty > newItem.stockQuantity) {
                toast.warning(
                  `Cannot add more ${newItem.variantName}${newItem.subVariantName ? ` - ${newItem.subVariantName}` : ''}. ` +
                  `Stock limit (${newItem.stockQuantity}) would be exceeded.`
                );
                blocked = true;
                return;
              }
              updated[existingIndex] = { ...updated[existingIndex], quantity: combinedQty };
            } else {
              toAdd.push(newItem);
            }
          });
          return [...updated, ...toAdd];
        });

        if (selectedProduct.variantTypes) {
          setProductVariantsCache(prev => ({ ...prev, [selectedProduct._id]: selectedProduct.variantTypes }));
        }

        setHasChanges(true);
        if (!blocked) toast.success(`Added ${newItems.length} variant(s) of ${selectedProduct.productName}`);

      // ========== COLORS ==========
      } else if (hasColors) {
        const colorsToAdd = selectedColorsWithQty;
        const newItems = [];
        for (const colorQty of colorsToAdd) {
          const { color, quantity } = colorQty;
          const existingTotal = localItems
            .filter(item => item.productId === selectedProduct._id)
            .reduce((sum, item) => sum + item.quantity, 0);
          if (existingTotal + quantity > selectedProduct.stockQuantity) {
            toast.warning(
              `Cannot add more ${selectedProduct.productName}${color ? ` (${color})` : ''}. ` +
              `Only ${selectedProduct.stockQuantity - existingTotal} more available.`
            );
            setAddingProduct(false);
            return;
          }
          newItems.push({
            _id: `temp_${Date.now()}_${Math.random()}`,
            productId: selectedProduct._id,
            productName: selectedProduct.productName,
            productSlug: selectedProduct.slug || '',
            image: selectedProduct.images?.[0]?.url || '',
            regularPrice: selectedProduct.regularPrice,
            discountPrice: selectedProduct.discountPrice || 0,
            costPerItem: selectedProduct.costPerItem || 0,
            buyingPrice: selectedProduct.buyingPrice || 0,
            quantity,
            stockQuantity: selectedProduct.stockQuantity,
            unit: selectedProduct.unit || 'pcs',
            selectedColor: color || null,
            colors: []
          });
        }

        setLocalItems(prevItems => {
          const existingMap = new Map();
          prevItems.forEach(item => {
            const key = `${item.productId}_${item.selectedColor || 'null'}`;
            existingMap.set(key, item);
          });
          const updatedItems = [...prevItems];
          const itemsToAdd = [];
          newItems.forEach(newItem => {
            const key = `${newItem.productId}_${newItem.selectedColor || 'null'}`;
            const existingItem = existingMap.get(key);
            if (existingItem) {
              const totalUsedByOthers = prevItems
                .filter(item => item.productId === newItem.productId && item._id !== existingItem._id)
                .reduce((sum, item) => sum + item.quantity, 0);
              const newTotal = totalUsedByOthers + existingItem.quantity + newItem.quantity;
              if (newTotal > newItem.stockQuantity) {
                toast.warning(
                  `Cannot add more ${existingItem.productName}${existingItem.selectedColor ? ` (${existingItem.selectedColor})` : ''}. ` +
                  `Stock limit (${newItem.stockQuantity}) would be exceeded.`
                );
                return;
              }
              const index = updatedItems.findIndex(item => item._id === existingItem._id);
              if (index !== -1) {
                updatedItems[index] = { ...existingItem, quantity: existingItem.quantity + newItem.quantity };
              }
            } else {
              itemsToAdd.push(newItem);
            }
          });
          return [...updatedItems, ...itemsToAdd];
        });

        if (selectedProduct.colors && selectedProduct.colors.length > 0) {
          setProductColorsCache(prev => ({ ...prev, [selectedProduct._id]: selectedProduct.colors }));
        }

        setHasChanges(true);
        toast.success(`Added ${selectedProduct.productName} to order`);

      // ========== PLAIN PRODUCT ==========
      } else {
        const existing = localItems.find(item => item.productId === selectedProduct._id && !item.selectedColor && !item.variantId);
        if (existing) {
          const newQty = existing.quantity + addQuantity;
          if (newQty > selectedProduct.stockQuantity) {
            toast.error(`Only ${selectedProduct.stockQuantity} item(s) available in stock.`);
            setAddingProduct(false);
            return;
          }
          setLocalItems(prev => prev.map(i => i._id === existing._id ? { ...i, quantity: newQty } : i));
        } else {
          setLocalItems(prev => [...prev, {
            _id: `temp_${Date.now()}_${Math.random()}`,
            productId: selectedProduct._id,
            productName: selectedProduct.productName,
            productSlug: selectedProduct.slug || '',
            image: selectedProduct.images?.[0]?.url || '',
            regularPrice: selectedProduct.regularPrice,
            discountPrice: selectedProduct.discountPrice || 0,
            costPerItem: selectedProduct.costPerItem || 0,
            buyingPrice: selectedProduct.buyingPrice || 0,
            quantity: addQuantity,
            stockQuantity: selectedProduct.stockQuantity,
            unit: selectedProduct.unit || 'pcs',
            selectedColor: null,
            colors: []
          }]);
        }
        setHasChanges(true);
        toast.success(`Added ${selectedProduct.productName} to order`);
      }

      setShowAddProduct(false);
      setSelectedProduct(null);
      setSearchQuery('');
      setSearchResults([]);
      setSelectedColorsWithQty([]);
      setSelectedVariantsWithQty([]);
      setAddQuantity(1);
    } catch (error) {
      console.error('Add product error:', error);
      toast.error('Failed to add product');
    } finally {
      setAddingProduct(false);
    }
  };

  // ========== HANDLE INPUT CHANGES ==========
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setHasChanges(true);
    
    if (name === 'division') {
      setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
      setZones([]);
      setAreas([]);
    }
    if (name === 'city') {
      setFormData(prev => ({ ...prev, zone: '', area: '' }));
      setAreas([]);
    }
    if (name === 'zone') {
      setFormData(prev => ({ ...prev, area: '' }));
    }
  };

  // ========== DISCOUNT CHANGE ==========
  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    const maxDiscount = localSubtotal + shippingCost;
    
    if (value > maxDiscount) {
      toast.warning('Discount cannot exceed subtotal + shipping');
      setLocalDiscount(maxDiscount);
    } else {
      setLocalDiscount(value);
    }
    setHasChanges(true);
  };

  // ========== CONFIRMATION DIALOG ==========
  const showConfirmDialog = (title, message, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel', type = 'warning') => {
    setConfirmConfig({
      title,
      message,
      onConfirm: () => {
        setShowConfirmModal(false);
        if (onConfirm) onConfirm();
      },
      confirmText,
      cancelText,
      type
    });
    setShowConfirmModal(true);
  };

  // ========== HANDLE MODAL CLOSE ==========
  const handleModalClose = () => {
    if (hasChanges) {
      showConfirmDialog(
        'Discard Changes',
        'You have unsaved changes. Are you sure you want to discard them?',
        () => {
          resetModal();
          onClose();
        },
        'Discard',
        'Keep Editing',
        'warning'
      );
    } else {
      resetModal();
      onClose();
    }
  };

  // ========== SAVE CHANGES ==========
  const handleSaveChanges = async () => {
    if (!hasChanges) {
      toast.info('No changes to save');
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      // Product-level stock check — only for plain/color lines (no variantId)
      const productGroups = {};
      localItems.forEach(item => {
        if (item.variantId) return; // variant stock is checked separately below
        if (!productGroups[item.productId]) {
          productGroups[item.productId] = {
            productName: item.productName,
            stockQuantity: item.stockQuantity,
            totalQuantity: 0
          };
        }
        productGroups[item.productId].totalQuantity += item.quantity;
      });

      for (const [productId, group] of Object.entries(productGroups)) {
        if (group.totalQuantity > group.stockQuantity) {
          toast.error(`${group.productName}: Total quantity (${group.totalQuantity}) exceeds available stock (${group.stockQuantity}).`);
          setLoading(false);
          return;
        }
      }

      // Variant-level stock check — each variant/sub-variant line checked against its own stock
      for (const item of localItems) {
        if (item.variantId && item.quantity > (item.stockQuantity || 0)) {
          toast.error(
            `${item.productName} - ${item.subVariantName || item.variantName}: quantity (${item.quantity}) exceeds available stock (${item.stockQuantity}).`
          );
          setLoading(false);
          return;
        }
      }

      const processedItems = localItems.map(item => {
        let productSlug = item.productSlug;
        if (!productSlug && item.productName) {
          productSlug = item.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        }
        if (!productSlug) productSlug = 'unknown-product';

        return {
          productId: item.productId,
          productName: item.productName || 'Unknown Product',
          productSlug,
          image: item.image || '',
          regularPrice: item.regularPrice || 0,
          discountPrice: item.discountPrice || 0,
          costPerItem: item.costPerItem || 0,
          buyingPrice: item.buyingPrice || 0,
          quantity: item.quantity || 1,
          stockQuantity: item.stockQuantity || 0,
          unit: item.unit || 'pcs',
          selectedColor: item.selectedColor || null,
          colors: item.colors || [],
          variantId: item.variantId || null,
          variantName: item.variantName || null,
          variantType: item.variantType || null,
          subVariantId: item.subVariantId || null,
          subVariantName: item.subVariantName || null,
          variantRegularPrice: item.variantRegularPrice || 0,
          variantDiscountPrice: item.variantDiscountPrice || 0,
          variantImage: item.variantImage || ''
        };
      });

      const updateData = {
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          division: formData.division,
          address: formData.address,
          city: formData.city,
          zone: formData.zone,
          area: formData.area
        },
        deliveryNote: formData.deliveryNote,
        discount: localDiscount,
        discountNote: formData.discountNote || 'Updated by admin',
        items: processedItems
      };

      const response = await fetch(`http://localhost:5000/api/orders/${order._id}/bulk-update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Order updated successfully!');
        setHasChanges(false);
        resetModal();
        onUpdate();
        onClose();
      } else {
        toast.error(data.error || 'Failed to update order');
      }
      
    } catch (error) {
      console.error('Save changes error:', error);
      toast.error('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ========== HELPERS FOR GROUPED ITEMS ==========
  const getGroupedItems = useCallback(() => {
    if (!localItems || localItems.length === 0) return [];

    const grouped = {};
    localItems.forEach(item => {
      const key = item.productId.toString();
      if (!grouped[key]) {
        grouped[key] = {
          productId: item.productId,
          productName: item.productName,
          productSlug: item.productSlug || '',
          image: item.image || '',
          regularPrice: item.regularPrice,
          discountPrice: item.discountPrice || 0,
          costPerItem: item.costPerItem || 0,
          buyingPrice: item.buyingPrice || 0,
          unit: item.unit || 'pcs',
          stockQuantity: item.stockQuantity || 0,
          hasVariants: false,
          colors: [],
          variantItems: [],
          totalQuantity: 0,
          variantTypes: item.variantTypes || []
        };
      }

      const isVariantItem = !!item.variantId;

      if (isVariantItem) {
        grouped[key].hasVariants = true;
        grouped[key].variantItems.push({
          itemId: item._id,
          variantId: item.variantId,
          variantName: item.variantName,
          variantType: item.variantType,
          subVariantId: item.subVariantId || null,
          subVariantName: item.subVariantName || null,
          variantRegularPrice: item.variantRegularPrice || item.regularPrice || 0,
          variantDiscountPrice: item.variantDiscountPrice || 0,
          variantImage: item.variantImage || item.image,
          selectedColor: item.selectedColor || null,
          quantity: item.quantity,
          stockQuantity: item.stockQuantity || 0,
          isSubVariant: !!item.subVariantId
        });
        if (item.variantTypes) {
          grouped[key].variantTypes = item.variantTypes;
        }
      } else {
        const hasColor = item.selectedColor && item.selectedColor !== 'null' && item.selectedColor !== '';
        grouped[key].colors.push({
          color: hasColor ? item.selectedColor : null,
          quantity: item.quantity,
          itemId: item._id,
          price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice,
          stockQuantity: item.stockQuantity || 0,
          isTempItem: item._id?.startsWith('temp_'),
          productName: item.productName,
          image: item.image
        });
      }

      grouped[key].totalQuantity += item.quantity;
    });
    return Object.values(grouped);
  }, [localItems]);

  const groupedItems = getGroupedItems();

  // ========== GET AVAILABLE VARIANTS FOR GROUP ==========
  const getAvailableVariantsForGroup = (group) => {
    const variantTypes = productVariantsCache[group.productId];
    if (!variantTypes) return [];
    const usedVariantIds = group.variantItems.filter(v => !v.subVariantId).map(v => v.variantId);
    const available = [];
    variantTypes.forEach(vt => {
      vt.variants.forEach(v => {
        const hasSub = v.subVariants && v.subVariants.length > 0;
        if (!hasSub && !usedVariantIds.includes(v.id)) {
          available.push({ ...v, type: vt.type });
        }
        if (hasSub) {
          const anyUsed = group.variantItems.some(vi => vi.variantId === v.id);
          if (!anyUsed) {
            available.push({ ...v, type: vt.type });
          }
        }
      });
    });
    return available;
  };

  // ========== GET AVAILABLE SUB-VARIANTS FOR GROUP ==========
  const getAvailableSubVariantsForGroup = (group, variantId) => {
    const variantTypes = productVariantsCache[group.productId];
    if (!variantTypes) return [];
    let targetVariant = null;
    variantTypes.forEach(vt => {
      vt.variants.forEach(v => { if (v.id === variantId) targetVariant = v; });
    });
    if (!targetVariant || !targetVariant.subVariants) return [];
    const usedSubIds = group.variantItems
      .filter(v => v.variantId === variantId && v.subVariantId)
      .map(v => v.subVariantId);
    return targetVariant.subVariants.filter(sv => !usedSubIds.includes(sv.id));
  };

  // ========== GET VARIANTS WITH SUB-VARIANTS TO SHOW FOR ADDING ==========
  const getVariantsWithSubVariantsToShowForAdding = (group) => {
    const variantIdsUsedWithSub = [...new Set(
      group.variantItems.filter(v => v.subVariantId).map(v => v.variantId)
    )];
    const results = [];
    variantIdsUsedWithSub.forEach(vid => {
      const avail = getAvailableSubVariantsForGroup(group, vid);
      if (avail.length > 0) {
        const variantTypes = productVariantsCache[group.productId] || [];
        let parentVariant = null, parentType = null;
        variantTypes.forEach(vt => vt.variants.forEach(v => {
          if (v.id === vid) { parentVariant = v; parentType = vt.type; }
        }));
        results.push({ variantId: vid, subVariants: avail, parentVariant, parentType });
      }
    });
    return results;
  };

  // ========== BUILD ORDER ITEM ROWS ==========
  const buildOrderItemRows = () => {
    const allRows = [];

    groupedItems.forEach((group) => {
      const colorRows = group.colors || [];
      const variantRows = group.variantItems || [];
      const totalRowsInGroup = colorRows.length + variantRows.length;
      const totalUsed = group.totalQuantity;
      const isOverStock = !group.hasVariants && totalUsed > group.stockQuantity;

      let rowIndexInGroup = 0;

      // ----- plain / color rows -----
      colorRows.forEach((colorInfo) => {
        const isFirst = rowIndexInGroup === 0;
        const price = colorInfo.price || group.discountPrice || group.regularPrice;
        const totalPrice = price * colorInfo.quantity;
        const isTempItem = colorInfo.isTempItem;
        const hasColor = colorInfo.color !== null;
        const usedByOthers = group.colors
          .filter(c => c.itemId !== colorInfo.itemId)
          .reduce((sum, c) => sum + c.quantity, 0);
        const maxAllowed = group.stockQuantity - usedByOthers;

        allRows.push(
          <tr key={colorInfo.itemId} className={`border-t border-[#82947A]/20 ${isTempItem ? 'bg-[#82947A]/5' : ''} ${isOverStock ? 'bg-red-50' : ''}`}>
            {isFirst && (
              <td className="px-2 py-2" rowSpan={totalRowsInGroup}>
                <div className="flex items-center gap-2">
                  <img
                    src={group.image || 'https://via.placeholder.com/30'}
                    alt={group.productName}
                    className="w-7 h-7 rounded object-cover border border-[#82947A]/30 flex-shrink-0"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
                  />
                  <div>
                    <p className="font-medium text-xs text-black truncate max-w-[120px]" title={group.productName}>
                      {group.productName}
                      {isTempItem && <span className="ml-1 text-[10px] text-green-500 font-normal">(new)</span>}
                      {isOverStock && <span className="ml-1 text-[10px] text-red-500 font-normal">(exceeds stock!)</span>}
                    </p>
                    {colorRows.length > 1 && <p className="text-[9px] text-[#64748B]">{colorRows.length} colors</p>}
                    <p className={`text-[9px] ${isOverStock ? 'text-red-500 font-medium' : 'text-[#64748B]'}`}>
                      Stock: {group.stockQuantity} | Used: {totalUsed}
                      {isOverStock && ` (${totalUsed - group.stockQuantity} over)`}
                    </p>
                  </div>
                </div>
              </td>
            )}
            <td className="px-2 py-2 text-center">
              {hasColor ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border border-[#82947A]/30 shadow-sm" style={{ backgroundColor: colorInfo.color }} title={colorInfo.color} />
                </div>
              ) : <span className="text-xs text-[#64748B]">-</span>}
            </td>
            <td className="px-2 py-2 text-center">
              {canEditProducts && isEditable ? (
                <div className="flex items-center justify-center gap-1">
                  <button onClick={() => updateColorQuantity(colorInfo.itemId, colorInfo.quantity - 1)} disabled={colorInfo.quantity <= 1} className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#E2E7EA] disabled:opacity-50 text-[#64748B]">
                    <FaMinus className="w-2.5 h-2.5" />
                  </button>
                  <input
                    type="number" min="1" max={maxAllowed} value={colorInfo.quantity}
                    onChange={(e) => handleItemQuantityInputChange(colorInfo.itemId, e.target.value)}
                    className={`w-10 text-center text-xs font-medium border rounded focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white py-0.5 ${isOverStock ? 'border-red-500 text-red-600' : 'border-[#82947A]/30 text-black'}`}
                  />
                  <button onClick={() => updateColorQuantity(colorInfo.itemId, colorInfo.quantity + 1)} disabled={colorInfo.quantity >= maxAllowed || maxAllowed <= 0} className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#E2E7EA] disabled:opacity-50 text-[#64748B]">
                    <FaPlus className="w-2.5 h-2.5" />
                  </button>
                </div>
              ) : <span className={`font-medium ${isOverStock ? 'text-red-600' : 'text-black'}`}>{colorInfo.quantity}</span>}
            </td>
            <td className="px-2 py-2 text-right text-black">৳{price.toFixed(2)}</td>
            <td className="px-2 py-2 text-right font-medium text-[#82947A]">৳{totalPrice.toFixed(2)}</td>
            {canEditProducts && isEditable && (
              <td className="px-2 py-2 text-center">
                <button onClick={() => handleRemoveItem(colorInfo.itemId, group.productName, colorInfo.color)} disabled={removingItem === colorInfo.itemId} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50" title="Remove item">
                  {removingItem === colorInfo.itemId ? <FaSpinner className="w-3.5 h-3.5 animate-spin" /> : <FaTrash className="w-3.5 h-3.5" />}
                </button>
              </td>
            )}
          </tr>
        );
        rowIndexInGroup++;
      });

      // ----- variant / sub-variant rows -----
      variantRows.forEach((v) => {
        const isFirst = rowIndexInGroup === 0;
        const price = v.variantDiscountPrice > 0 ? v.variantDiscountPrice : (v.variantRegularPrice || group.regularPrice || 0);
        const totalPrice = price * v.quantity;
        const isTempItem = v.itemId?.startsWith('temp_');
        const maxAllowed = v.stockQuantity || 999;

        allRows.push(
          <tr key={v.itemId} className={`border-t border-[#82947A]/20 ${isTempItem ? 'bg-[#82947A]/5' : ''}`}>
            {isFirst && (
              <td className="px-2 py-2" rowSpan={totalRowsInGroup}>
                <div className="flex items-center gap-2">
                  <img
                    src={group.image || 'https://via.placeholder.com/30'}
                    alt={group.productName}
                    className="w-7 h-7 rounded object-cover border border-[#82947A]/30 flex-shrink-0"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
                  />
                  <div>
                    <p className="font-medium text-xs text-black truncate max-w-[120px]" title={group.productName}>
                      {group.productName}
                      <span className="ml-1 text-[9px] bg-blue-100 text-blue-700 px-1 py-0.5 rounded-full">
                        {variantRows.length} variant{variantRows.length > 1 ? 's' : ''}
                      </span>
                    </p>
                  </div>
                </div>
              </td>
            )}
            <td className="px-2 py-2 text-center">
              <div className="flex items-center justify-center gap-1">
                {v.isSubVariant && <span className="text-gray-400 text-[10px]">→</span>}
                {v.selectedColor && (
                  <span className="inline-block w-3.5 h-3.5 rounded-full border border-gray-300" style={{ backgroundColor: v.selectedColor }} title={v.selectedColor} />
                )}
                <span className="text-[10px] text-gray-700 font-medium">
                  {v.isSubVariant ? v.subVariantName : v.variantName}
                </span>
                <span className={`text-[8px] px-1 py-0.5 rounded ${v.isSubVariant ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                  {v.isSubVariant ? 'Sub' : 'Variant'}
                </span>
              </div>
              {v.isSubVariant && <p className="text-[8px] text-gray-400 mt-0.5">{v.variantName}</p>}
            </td>
            <td className="px-2 py-2 text-center">
              {canEditProducts && isEditable ? (
                <div className="flex items-center justify-center gap-1">
                  <button onClick={() => updateVariantItemQuantity(v.itemId, v.quantity - 1)} disabled={v.quantity <= 1} className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#E2E7EA] disabled:opacity-50 text-[#64748B]">
                    <FaMinus className="w-2.5 h-2.5" />
                  </button>
                  <input
                    type="number" min="1" max={maxAllowed} value={v.quantity}
                    onChange={(e) => handleVariantItemQuantityInputChange(v.itemId, e.target.value)}
                    className="w-10 text-center text-xs font-medium border border-[#82947A]/30 rounded focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white py-0.5 text-black"
                  />
                  <button onClick={() => updateVariantItemQuantity(v.itemId, v.quantity + 1)} disabled={v.quantity >= maxAllowed} className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#E2E7EA] disabled:opacity-50 text-[#64748B]">
                    <FaPlus className="w-2.5 h-2.5" />
                  </button>
                </div>
              ) : <span className="font-medium text-black">{v.quantity}</span>}
              <p className="text-[8px] text-gray-400 mt-0.5">/ {maxAllowed}</p>
            </td>
            <td className="px-2 py-2 text-right text-black">৳{price.toFixed(2)}</td>
            <td className="px-2 py-2 text-right font-medium text-[#82947A]">৳{totalPrice.toFixed(2)}</td>
            {canEditProducts && isEditable && (
              <td className="px-2 py-2 text-center">
                <button onClick={() => updateVariantItemQuantity(v.itemId, 0)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Remove item">
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              </td>
            )}
          </tr>
        );
        rowIndexInGroup++;
      });

      // ----- "add more variants/sub-variants" row -----
      if (canEditProducts && isEditable && group.hasVariants) {
        const availableVariants = getAvailableVariantsForGroup(group);
        const subVariantGroups = getVariantsWithSubVariantsToShowForAdding(group);

        if (availableVariants.length > 0 || subVariantGroups.length > 0) {
          allRows.push(
            <tr key={`${group.productId}-add-more`} className="border-t border-dashed border-gray-300 bg-gray-50/40">
              <td></td>
              <td colSpan={canEditProducts && isEditable ? 5 : 4} className="px-2 py-2">
                <div className="space-y-1.5">
                  {subVariantGroups.map(sg => (
                    <div key={sg.variantId} className="flex flex-wrap items-center gap-1">
                      <span className="text-[9px] text-gray-500">Add {sg.parentVariant?.name || 'variant'} sub-option:</span>
                      {sg.subVariants.map(sv => (
                        <button
                          key={sv.id}
                          type="button"
                          onClick={() => addSubVariantToOrderGroup(group, sg.variantId, sv, sg.parentVariant?.name || 'Variant', sg.parentType || 'Variant')}
                          className="text-[9px] px-2 py-1 rounded-full border border-gray-300 hover:border-[#82947A] text-gray-700 hover:bg-white transition-all flex items-center gap-1 bg-white/70"
                        >
                          <FaPlus className="w-2 h-2" />
                          {sv.name}
                        </button>
                      ))}
                    </div>
                  ))}
                  {availableVariants.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[9px] text-gray-500">Add variant:</span>
                      {availableVariants.map(v => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => addVariantToOrderGroup(group, v, v.type)}
                          className={`text-[9px] px-2 py-1 rounded-full border transition-all flex items-center gap-1 ${
                            v.subVariants && v.subVariants.length > 0
                              ? 'border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-400'
                              : 'border-gray-300 hover:border-[#82947A] text-gray-700 hover:bg-white bg-white/70'
                          }`}
                        >
                          <FaPlus className="w-2 h-2" />
                          {v.name}
                          {v.subVariants && v.subVariants.length > 0 && (
                            <span className="text-[8px] bg-amber-200 text-amber-700 px-1 py-0.5 rounded-full">{v.subVariants.length} sub</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          );
        }
      }
    });

    return allRows;
  };

  // ========== HELPERS FOR QUANTITY UPDATES ==========
  const updateColorQuantity = (itemId, newQuantity) => {
    const item = localItems.find(i => i._id === itemId);
    if (!item) return;

    if (newQuantity < 1) {
      showConfirmDialog(
        'Remove Item',
        `Are you sure you want to remove "${item.productName}"${item.selectedColor ? ` (${item.selectedColor})` : ''} from this order?`,
        () => {
          setLocalItems(prev => prev.filter(i => i._id !== itemId));
          setHasChanges(true);
          toast.success(`Removed from order`);
        },
        'Remove',
        'Cancel',
        'danger'
      );
      return;
    }

    setLocalItems(prev => prev.map(i => i._id === itemId ? { ...i, quantity: newQuantity } : i));
    setHasChanges(true);
  };

  const handleItemQuantityInputChange = (itemId, value) => {
    const item = localItems.find(i => i._id === itemId);
    if (!item) return;

    if (value === '') {
      setLocalItems(prev => prev.map(i => i._id === itemId ? { ...i, quantity: '' } : i));
      return;
    }

    let qty = parseInt(value);
    if (isNaN(qty)) return;
    qty = Math.max(1, qty);
    
    setLocalItems(prev => prev.map(i => i._id === itemId ? { ...i, quantity: qty } : i));
    setHasChanges(true);
  };

  const handleRemoveItem = (itemId, productName, colorName) => {
    const displayName = colorName ? `${productName} (${colorName})` : productName;
    showConfirmDialog(
      'Remove Item',
      `Are you sure you want to remove "${displayName}" from this order?`,
      () => {
        setLocalItems(prev => prev.filter(item => item._id !== itemId));
        setHasChanges(true);
        toast.success(`Removed ${displayName} from order`);
      },
      'Remove',
      'Cancel',
      'danger'
    );
  };

  if (!isOpen) return null;

  const statusInfo = ORDER_STATUSES.find(s => s.value === order?.orderStatus);
  
  const getStatusLabel = (status) => {
    const found = ORDER_STATUSES.find(s => s.value === status);
    return found?.label || status;
  };

  const getRoleLabel = () => {
    if (isSuperAdmin) return 'Super Admin';
    if (isAdmin) return 'Admin';
    if (isModerator) return 'Moderator';
    return 'User';
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl border border-[#82947A]/30 shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
        >
          <div className="p-4 bg-gradient-to-r from-[#82947A] to-[#485442] text-white sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaEdit className="w-5 h-5" />
                <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Edit Order</h2>
              </div>
              <button onClick={handleModalClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <p className="text-xs text-white/80">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${statusInfo?.color || 'bg-white/20 text-white'}`}>
                {statusInfo?.icon && <statusInfo.icon className="w-2.5 h-2.5" />}
                {statusInfo?.label || order?.orderStatus}
              </span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">
                {getRoleLabel()}
              </span>
              {!isEditable && (
                <span className="text-xs bg-red-500/80 px-2 py-0.5 rounded-full text-white">
                  Read-only
                </span>
              )}
              {isEditable && (
                <span className="text-xs bg-green-500/80 px-2 py-0.5 rounded-full text-white">
                  Editable
                </span>
              )}
              {hasChanges && isEditable && (
                <span className="text-xs bg-yellow-500/80 px-2 py-0.5 rounded-full text-white animate-pulse">
                  Unsaved Changes
                </span>
              )}
            </div>
          </div>

          <div className="p-5 max-h-[60vh] overflow-y-auto">
            {/* Status Note */}
            {!isEditable && (
              <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-xl">
                <p className="text-xs text-yellow-700">
                  ⚠️ This order is <strong>{getStatusLabel(order?.orderStatus)}</strong>. No changes are allowed.
                </p>
              </div>
            )}
            
            {isEditable && (
              <div className="mb-4 bg-[#82947A]/10 border-l-4 border-[#82947A] p-3 rounded-xl">
                <p className="text-xs text-[#82947A]">
                  ✅ Order is <strong>{getStatusLabel(order?.orderStatus)}</strong>. 
                  <span className="block text-[11px] mt-1">
                    🔒 <strong>Full Name & Phone:</strong> Only Super Admin & Admin can edit
                  </span>
                  <span className="block text-[11px]">
                    📧 <strong>Email:</strong> Only Super Admin can edit
                  </span>
                  <span className="block text-[11px]">
                    📝 <strong>Address & Notes:</strong> All authorized users can edit
                  </span>
                  <span className="block text-[11px] font-semibold mt-1">
                    ⚡ All changes are local until you click "Save Changes"
                  </span>
                  <span className="block text-[11px] text-green-600 mt-1">
                    ✅ Supports variants, sub-variants, and colors
                  </span>
                </p>
              </div>
            )}

            {/* ========== CUSTOMER INFORMATION ========== */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-black mb-1">
                    Full Name *
                    {!canEditSensitiveInfo && isEditable && (
                      <span className="ml-1 text-[10px] text-[#64748B] font-normal">(read-only)</span>
                    )}
                    {canEditSensitiveInfo && isEditable && (
                      <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    readOnly={!canEditSensitiveInfo || !isEditable}
                    className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
                      !canEditSensitiveInfo || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
                    } border-[#82947A]/30 text-black`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1">
                    Phone *
                    {!canEditSensitiveInfo && isEditable && (
                      <span className="ml-1 text-[10px] text-[#64748B] font-normal">(read-only)</span>
                    )}
                    {canEditSensitiveInfo && isEditable && (
                      <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
                    )}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    readOnly={!canEditSensitiveInfo || !isEditable}
                    className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
                      !canEditSensitiveInfo || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
                    } border-[#82947A]/30 text-black`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1">
                    Email
                    {isSuperAdmin && isEditable && (
                      <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
                    )}
                    {!isSuperAdmin && isEditable && (
                      <span className="ml-1 text-[10px] text-[#64748B] font-normal">(read-only)</span>
                    )}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly={!isSuperAdmin || !isEditable}
                    className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
                      !isSuperAdmin || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
                    } border-[#82947A]/30 text-black`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1">
                    Division *
                    {canEditAddress && isEditable && (
                      <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
                    )}
                  </label>
                  <SearchableSelect
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    options={divisionList}
                    placeholder="Select Division"
                    disabled={!canEditAddress || !isEditable || locationLoading}
                    error={!formData.division && false}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1">
                    District/City *
                    {canEditAddress && isEditable && (
                      <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
                    )}
                  </label>
                  <SearchableSelect
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    options={citiesByDivision}
                    placeholder={formData.division ? "Select District" : "Select Division First"}
                    disabled={!canEditAddress || !isEditable || !formData.division || locationLoading}
                    error={!formData.city && false}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1">
                    Upazila/Thana *
                    {canEditAddress && isEditable && (
                      <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
                    )}
                  </label>
                  <SearchableSelect
                    name="zone"
                    value={formData.zone}
                    onChange={handleInputChange}
                    options={zones}
                    placeholder={formData.city ? "Select Upazila/Thana" : "Select District First"}
                    disabled={!canEditAddress || !isEditable || !formData.city || locationLoading}
                    error={!formData.zone && false}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1">
                    Union/Area
                    {canEditAddress && isEditable && (
                      <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
                    )}
                  </label>
                  <SearchableSelect
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    options={areas}
                    placeholder={formData.zone ? "Select Union/Area" : "Select Upazila First"}
                    disabled={!canEditAddress || !isEditable || !formData.zone || locationLoading}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-black mb-1">
                    Address *
                    {canEditAddress && isEditable && (
                      <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
                    )}
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    readOnly={!canEditAddress || !isEditable}
                    rows="2"
                    className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
                      !canEditAddress || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
                    } border-[#82947A]/30 text-black`}
                  />
                </div>
              </div>

              {/* ========== ORDER ITEMS ========== */}
              <div className="border-t border-[#82947A]/30 pt-4 mt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-black flex items-center gap-2">
                    <FaBox className="w-4 h-4 text-[#82947A]" />
                    Order Items ({localItems.length})
                    {canEditProducts && isEditable && (
                      <span className="text-[10px] text-[#82947A] font-normal">(add/remove items)</span>
                    )}
                  </label>
                  {canEditProducts && isEditable && (
                    <button
                      onClick={() => setShowAddProduct(!showAddProduct)}
                      className="px-3 py-1.5 bg-[#82947A]/10 text-[#82947A] rounded-xl hover:bg-[#82947A]/20 transition-colors text-sm flex items-center gap-1.5 border border-[#82947A]/30"
                    >
                      <FaPlus className="w-3 h-3" />
                      Add Product
                    </button>
                  )}
                </div>

                {/* ========== ADD PRODUCT SECTION ========== */}
                {showAddProduct && canEditProducts && isEditable && (
                  <div className="mb-4 p-4 bg-[#E2E7EA]/30 rounded-xl border border-[#82947A]/30">
                    <h4 className="text-sm font-medium text-black mb-3">Add Product to Order</h4>
                    
                    <div className="relative mb-3">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Start typing product name, SKU, or barcode..."
                        className="w-full pl-10 pr-3 py-2 text-sm border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-white text-black"
                        autoFocus
                      />
                      {searching && (
                        <FaSpinner className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-[#82947A]" />
                      )}
                      {searchQuery && !searching && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#82947A]"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {searchQuery.length > 0 && (
                      <div className="mb-3 max-h-48 overflow-y-auto border border-[#82947A]/20 rounded-xl bg-white">
                        {searching ? (
                          <div className="flex items-center justify-center py-4">
                            <FaSpinner className="w-4 h-4 animate-spin text-[#82947A]" />
                            <span className="ml-2 text-xs text-[#64748B]">Searching...</span>
                          </div>
                        ) : searchResults.length > 0 ? (
                          searchResults.map((product) => (
                            <div
                              key={product._id}
                              onClick={() => handleSelectProduct(product)}
                              className={`p-2 border-b border-[#82947A]/10 cursor-pointer hover:bg-[#E2E7EA]/50 transition-colors flex items-center gap-3 ${
                                selectedProduct?._id === product._id ? 'bg-[#82947A]/10 border-l-4 border-l-[#82947A]' : ''
                              }`}
                            >
                              <img
                                src={product.images?.[0]?.url || 'https://via.placeholder.com/40'}
                                alt={product.productName}
                                className="w-10 h-10 rounded-lg object-cover border border-[#82947A]/20 flex-shrink-0"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-black truncate">{product.productName}</p>
                                <div className="flex items-center gap-2 text-xs flex-wrap">
                                  <span className="text-[#82947A] font-bold">৳{(product.discountPrice || product.regularPrice).toFixed(2)}</span>
                                  {product.discountPrice > 0 && (
                                    <span className="text-[#64748B] line-through">৳{product.regularPrice.toFixed(2)}</span>
                                  )}
                                  <span className="text-[#64748B]">Stock: {product.stockQuantity}</span>
                                  {product.hasVariants && (
                                    <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                                      Has Variants
                                    </span>
                                  )}
                                  {product.colors && product.colors.length > 0 && (
                                    <span className="text-[10px] text-[#82947A] bg-[#82947A]/10 px-1.5 py-0.5 rounded-full">
                                      {product.colors.length} colors
                                    </span>
                                  )}
                                </div>
                              </div>
                              {selectedProduct?._id === product._id && (
                                <FaCheckCircle className="w-4 h-4 text-[#82947A]" />
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center">
                            <p className="text-xs text-[#64748B]">No products found matching "{searchQuery}"</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ========== SELECTED PRODUCT PANEL ========== */}
                    {selectedProduct && (
                      <div className="p-3 bg-white rounded-xl border border-[#82947A]/20">
                        <p className="text-xs font-medium text-black mb-2">
                          Selected: {selectedProduct.productName}
                          <span className="ml-2 text-[10px] text-[#64748B]">(Stock: {selectedProduct.stockQuantity})</span>
                        </p>
                        
                        {/* ===== VARIANTS SECTION ===== */}
                        {selectedProduct.hasVariants && selectedProduct.variantTypes?.length > 0 && (
                          <div className="space-y-3">
                            {selectedProduct.variantTypes.map((vt) => (
                              <div key={vt.id || vt.type} className="space-y-2">
                                <p className="text-xs font-medium text-gray-700">
                                  {vt.type.charAt(0).toUpperCase() + vt.type.slice(1)} Variants:
                                </p>
                                <div className="space-y-2">
                                  {vt.variants.map((v) => {
                                    const hasSub = v.subVariants && v.subVariants.length > 0;
                                    const isSelected = hasSub
                                      ? selectedVariantsWithQty.some(sv => sv.variantId === v.id && sv.subVariantId !== null)
                                      : selectedVariantsWithQty.some(sv => sv.variantId === v.id && !sv.subVariantId);

                                    return (
                                      <div key={v.id} className="border rounded-lg p-2 bg-white">
                                        <div className="flex items-center gap-2">
                                          {v.images?.[0] && (
                                            <img src={v.images[0]} className="w-8 h-8 rounded object-cover border border-gray-200" alt={v.name} />
                                          )}
                                          <span className="text-sm font-medium text-gray-800">{v.name}</span>
                                          <span className="text-xs text-gray-500 ml-auto">
                                            ৳{(v.discountPrice || v.regularPrice || 0).toFixed(2)}
                                          </span>
                                          <button
                                            onClick={() => toggleVariantSelection(vt, v)}
                                            className={`px-2 py-0.5 text-xs rounded ${isSelected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-[#82947A] text-white hover:bg-[#485442]'}`}
                                          >
                                            {isSelected ? 'Remove' : 'Add'}
                                          </button>
                                          {hasSub && (
                                            <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
                                              {v.subVariants.length} sub
                                            </span>
                                          )}
                                        </div>

                                        {hasSub && (
                                          <div className="mt-2 pl-3 space-y-1 border-l-2 border-gray-200">
                                            {v.subVariants.map((sv) => {
                                              const selectedSub = selectedVariantsWithQty.find(x => x.variantId === v.id && x.subVariantId === sv.id);
                                              const isSubSelected = !!selectedSub;
                                              return (
                                                <div key={sv.id} className="flex items-center gap-2 py-1">
                                                  {sv.images?.[0] && (
                                                    <img src={sv.images[0]} className="w-5 h-5 rounded object-cover border border-gray-200" alt={sv.name} />
                                                  )}
                                                  <span className="text-xs text-gray-700">{sv.name}</span>
                                                  <span className="text-[10px] text-gray-500">
                                                    ৳{(sv.discountPrice || sv.regularPrice || 0).toFixed(2)}
                                                  </span>
                                                  <button
                                                    onClick={() => toggleSubVariantSelection(vt, v, sv)}
                                                    className={`px-1.5 py-0.5 text-[10px] rounded ${isSubSelected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-[#82947A] text-white hover:bg-[#485442]'}`}
                                                  >
                                                    {isSubSelected ? 'Remove' : 'Add'}
                                                  </button>
                                                  {isSubSelected && (
                                                    <div className="flex items-center gap-1">
                                                      <button
                                                        onClick={() => updateNewVariantQty(v.id, sv.id, Math.max(1, (selectedSub?.quantity || 1) - 1))}
                                                        className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                                                        disabled={selectedSub?.quantity <= 1}
                                                      >
                                                        <FaMinus className="w-2.5 h-2.5" />
                                                      </button>
                                                      <input
                                                        type="number"
                                                        min="1"
                                                        max={sv.stockQuantity || 999}
                                                        value={selectedSub?.quantity || 1}
                                                        onChange={(e) => {
                                                          const val = parseInt(e.target.value);
                                                          if (!isNaN(val)) updateNewVariantQty(v.id, sv.id, Math.max(1, val));
                                                        }}
                                                        className="w-12 text-center text-[10px] py-0.5 bg-white focus:outline-none border border-gray-200 rounded"
                                                      />
                                                      <button
                                                        onClick={() => updateNewVariantQty(v.id, sv.id, Math.min(sv.stockQuantity || 999, (selectedSub?.quantity || 1) + 1))}
                                                        className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                                                        disabled={selectedSub?.quantity >= (sv.stockQuantity || 999)}
                                                      >
                                                        <FaPlus className="w-2.5 h-2.5" />
                                                      </button>
                                                    </div>
                                                  )}
                                                </div>
                                              );
                                            })}
                                          </div>
                                        )}

                                        {!hasSub && isSelected && (
                                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                                            <span className="text-xs text-gray-500">Qty:</span>
                                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                                              <button
                                                onClick={() => {
                                                  const cur = selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1;
                                                  updateNewVariantQty(v.id, null, Math.max(1, cur - 1));
                                                }}
                                                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                                              >
                                                <FaMinus className="w-3 h-3" />
                                              </button>
                                              <input
                                                type="number"
                                                min="1"
                                                max={v.stockQuantity || 999}
                                                value={selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1}
                                                onChange={(e) => {
                                                  const val = parseInt(e.target.value);
                                                  if (!isNaN(val)) updateNewVariantQty(v.id, null, Math.max(1, val));
                                                }}
                                                className="w-10 text-center text-xs py-0.5 bg-white focus:outline-none border border-gray-200 rounded"
                                              />
                                              <button
                                                onClick={() => {
                                                  const cur = selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1;
                                                  updateNewVariantQty(v.id, null, Math.min(v.stockQuantity || 999, cur + 1));
                                                }}
                                                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                                              >
                                                <FaPlus className="w-3 h-3" />
                                              </button>
                                            </div>
                                            <span className="text-[10px] text-gray-400">max {v.stockQuantity || 0}</span>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}

                            {selectedVariantsWithQty.length > 0 && (
                              <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-blue-700 font-medium">
                                    {selectedVariantsWithQty.length} variant(s) selected
                                  </span>
                                  <span className="text-blue-700 font-medium">
                                    Total: {selectedVariantsWithQty.reduce((s, v) => s + v.quantity, 0)} items • ৳
                                    {selectedVariantsWithQty.reduce((s, v) => s + ((v.discountPrice > 0 ? v.discountPrice : v.regularPrice) * v.quantity), 0).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* ===== COLORS SECTION ===== */}
                        {!selectedProduct.hasVariants && selectedProduct.colors && selectedProduct.colors.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-700">Select Colors:</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedProduct.colors.map((color) => {
                                const selected = selectedColorsWithQty.find(c => c.color === color);
                                const isSelected = !!selected;
                                const quantity = selected?.quantity || 1;
                                
                                return (
                                  <div key={color} className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white">
                                    <div 
                                      className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                                      style={{ backgroundColor: color }}
                                      title={color}
                                    />
                                    <button
                                      onClick={() => toggleColorSelection(color)}
                                      className={`px-2 py-0.5 text-xs rounded ${
                                        isSelected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-[#82947A] text-white hover:bg-[#485442]'
                                      }`}
                                    >
                                      {isSelected ? 'Remove' : 'Add'}
                                    </button>
                                    {isSelected && (
                                      <div className="flex items-center gap-1">
                                        <button
                                          onClick={() => {
                                            const currentQty = selectedColorsWithQty.find(c => c.color === color)?.quantity || 1;
                                            updateSelectedColorQuantity(color, Math.max(1, currentQty - 1));
                                          }}
                                          className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                                          disabled={quantity <= 1}
                                        >
                                          <FaMinus className="w-3 h-3" />
                                        </button>
                                        <input
                                          type="text"
                                          inputMode="numeric"
                                          pattern="[0-9]*"
                                          value={quantity}
                                          onChange={(e) => handleColorQuantityInputChange(color, e.target.value)}
                                          onBlur={() => {
                                            const currentQty = selectedColorsWithQty.find(c => c.color === color)?.quantity;
                                            let numValue = typeof currentQty === 'string' ? parseInt(currentQty) : currentQty;
                                            if (isNaN(numValue) || numValue < 1) {
                                              updateSelectedColorQuantity(color, 1);
                                            } else if (numValue > (selectedProduct.stockQuantity || 999)) {
                                              updateSelectedColorQuantity(color, selectedProduct.stockQuantity || 999);
                                            }
                                          }}
                                          className="w-10 text-center text-xs py-0.5 bg-white focus:outline-none border border-gray-200 rounded"
                                        />
                                        <button
                                          onClick={() => {
                                            const currentQty = selectedColorsWithQty.find(c => c.color === color)?.quantity || 1;
                                            updateSelectedColorQuantity(color, Math.min(selectedProduct.stockQuantity || 999, currentQty + 1));
                                          }}
                                          className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                                          disabled={quantity >= selectedProduct.stockQuantity}
                                        >
                                          <FaPlus className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {/* ===== PLAIN PRODUCT ===== */}
                        {!selectedProduct.hasVariants && (!selectedProduct.colors || selectedProduct.colors.length === 0) && (
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-600">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                              <button
                                onClick={() => setAddQuantity(prev => Math.max(1, prev - 1))}
                                className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                disabled={addQuantity <= 1}
                              >
                                <FaMinus className="w-3 h-3" />
                              </button>
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={addQuantity}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value === '') {
                                    setAddQuantity('');
                                    return;
                                  }
                                  if (/^\d+$/.test(value)) {
                                    const numValue = parseInt(value);
                                    if (numValue <= (selectedProduct.stockQuantity || 999)) {
                                      setAddQuantity(numValue);
                                    }
                                  }
                                }}
                                onBlur={() => {
                                  let numValue = typeof addQuantity === 'string' ? parseInt(addQuantity) : addQuantity;
                                  if (isNaN(numValue) || numValue < 1) {
                                    setAddQuantity(1);
                                  } else if (numValue > (selectedProduct.stockQuantity || 999)) {
                                    setAddQuantity(selectedProduct.stockQuantity || 999);
                                  }
                                }}
                                className="w-14 text-center text-sm py-1 bg-white focus:outline-none"
                              />
                              <button
                                onClick={() => {
                                  const currentQty = typeof addQuantity === 'string' ? parseInt(addQuantity) || 1 : addQuantity;
                                  setAddQuantity(Math.min(selectedProduct.stockQuantity || 999, currentQty + 1));
                                }}
                                className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                                disabled={addQuantity >= (selectedProduct.stockQuantity || 999)}
                              >
                                <FaPlus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-xs text-gray-500">/ {selectedProduct.stockQuantity || 0}</span>
                          </div>
                        )}

                        <button
                          onClick={handleAddProduct}
                          disabled={
                            addingProduct ||
                            (selectedProduct.hasVariants && selectedVariantsWithQty.length === 0) ||
                            (!selectedProduct.hasVariants && selectedProduct.colors?.length > 0 && selectedColorsWithQty.length === 0)
                          }
                          className="mt-3 w-full px-4 py-2 bg-[#82947A] text-white rounded-lg hover:bg-[#485442] transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {addingProduct ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaPlus className="w-3 h-3" />}
                          {selectedProduct.hasVariants ? `Add ${selectedVariantsWithQty.length} Variant(s) to Order` : 'Add to Order'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ===== ORDER ITEMS TABLE ===== */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-[#E2E7EA]">
                      <tr>
                        <th className="px-2 py-1.5 text-left text-black">Product</th>
                        <th className="px-2 py-1.5 text-center text-black">Variant / Color</th>
                        {/* <th className="px-2 py-1.5 text-center text-black">Qty</th> */}
                        <th className="px-2 py-1.5 text-center text-black hidden sm:table-cell">Unit</th>
                        <th className="px-2 py-1.5 text-right text-black hidden sm:table-cell">Price</th>
                        <th className="px-2 py-1.5 text-right text-black">Total</th>
                        {canEditProducts && isEditable && <th className="px-2 py-1.5 text-center text-black">Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {groupedItems.length === 0 ? (
                        <tr>
                          <td colSpan={canEditProducts && isEditable ? 7 : 6} className="text-center py-4 text-[#64748B]">
                            No items in this order
                          </td>
                        </tr>
                      ) : (
                        buildOrderItemRows()
                      )}
                    </tbody>
                    <tfoot className="border-t border-[#82947A]/30 bg-[#E2E7EA]/30">
                      <tr>
                        <td colSpan={canEditProducts && isEditable ? 5 : 4} className="px-2 py-1 text-right font-medium text-black">Subtotal:</td>
                        <td className="px-2 py-1 text-right font-medium text-black">৳{localSubtotal.toFixed(2)}</td>
                        {canEditProducts && isEditable && <td></td>}
                      </tr>
                      <tr>
                        <td colSpan={canEditProducts && isEditable ? 5 : 4} className="px-2 py-1 text-right font-medium text-black">Shipping:</td>
                        <td className="px-2 py-1 text-right text-black">৳{shippingCost.toFixed(2)}</td>
                        {canEditProducts && isEditable && <td></td>}
                      </tr>
                      <tr className="text-green-600">
                        <td colSpan={canEditProducts && isEditable ? 5 : 4} className="px-2 py-1 text-right font-medium">Discount:</td>
                        <td className="px-2 py-1 text-right font-medium">- ৳{localDiscount.toFixed(2)}</td>
                        {canEditProducts && isEditable && <td></td>}
                      </tr>
                      <tr className="text-sm font-bold text-[#82947A]">
                        <td colSpan={canEditProducts && isEditable ? 5 : 4} className="px-2 py-1 text-right text-black">Total:</td>
                        <td className="px-2 py-1 text-right text-[#82947A]">৳{localTotal.toFixed(2)}</td>
                        {canEditProducts && isEditable && <td></td>}
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* ========== DISCOUNT SECTION ========== */}
              <div className="border-t border-[#82947A]/30 pt-4 mt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-black flex items-center gap-2">
                    Order Discount amount
                    {canEditDiscount && isEditable && (
                      <span className="text-[10px] text-[#82947A] font-normal">(editable)</span>
                    )}
                  </label>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-[120px]">
                    <input
                      type="number"
                      name="discount"
                      value={localDiscount}
                      onChange={handleDiscountChange}
                      disabled={!canEditDiscount || !isEditable}
                      min="0"
                      step="0.5"
                      className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
                        !canEditDiscount || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
                      } border-[#82947A]/30 text-black`}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <input
                      type="text"
                      name="discountNote"
                      value={formData.discountNote}
                      onChange={handleInputChange}
                      disabled={!canEditDiscount || !isEditable}
                      placeholder="Discount reason (optional)"
                      className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
                        !canEditDiscount || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
                      } border-[#82947A]/30 text-black`}
                    />
                  </div>
                </div>
                <div className="mt-2 p-2 bg-[#E2E7EA]/30 rounded-lg border border-[#82947A]/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">After Discount:</span>
                    <span className="font-bold text-[#82947A]">৳{localTotal.toFixed(2)}</span>
                  </div>
                  {localDiscount > 0 && (
                    <div className="flex justify-between text-xs text-green-600">
                      <span>You saved:</span>
                      <span>৳{localDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ========== DELIVERY NOTE ========== */}
              <div className="border-t border-[#82947A]/30 pt-4 mt-2">
                <label className="block text-xs font-medium text-black mb-1">
                  Delivery Note
                  {canEditDeliveryNote && isEditable && (
                    <span className="ml-1 text-[10px] text-[#82947A] font-normal">(editable)</span>
                  )}
                </label>
                <textarea
                  name="deliveryNote"
                  value={formData.deliveryNote}
                  onChange={handleInputChange}
                  readOnly={!canEditDeliveryNote || !isEditable}
                  rows="2"
                  className={`w-full px-3 py-1.5 text-sm border rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent ${
                    !canEditDeliveryNote || !isEditable ? 'bg-[#E2E7EA] cursor-not-allowed' : 'bg-white hover:border-[#82947A]/60'
                  } border-[#82947A]/30 text-black`}
                  placeholder="Add delivery notes or special instructions"
                />
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-[#82947A]/30 bg-[#E2E7EA]/20 flex gap-3">
            <button onClick={handleModalClose} className="flex-1 px-3 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={loading || !isEditable}
              className={`flex-1 px-3 py-2 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm ${
                hasChanges && isEditable
                  ? 'bg-gradient-to-r from-[#82947A] to-black text-white hover:shadow-lg hover:shadow-[#82947A]/25'
                  : 'bg-[#E2E7EA] text-[#64748B] cursor-not-allowed'
              }`}
            >
              {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
              {loading ? 'Saving...' : hasChanges ? 'Save Changes' : 'No Changes'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* ========== CONFIRMATION MODAL ========== */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#82947A]/20"
          >
            <div className={`p-4 ${
              confirmConfig.type === 'danger' ? 'bg-gradient-to-r from-red-500 to-red-600' :
              confirmConfig.type === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              'bg-gradient-to-r from-[#82947A] to-black'
            } text-white`}>
              <div className="flex items-center gap-3">
                {confirmConfig.type === 'danger' && <FaExclamationTriangle className="w-5 h-5" />}
                {confirmConfig.type === 'warning' && <FaExclamationTriangle className="w-5 h-5" />}
                {confirmConfig.type === 'info' && <FaInfoCircle className="w-5 h-5" />}
                <h3 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
                  {confirmConfig.title}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-black text-sm">{confirmConfig.message}</p>
            </div>

            <div className="p-4 border-t border-[#82947A]/20 bg-[#E2E7EA]/20 flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-[#82947A]/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm"
              >
                {confirmConfig.cancelText || 'Cancel'}
              </button>
              <button
                onClick={confirmConfig.onConfirm}
                className={`flex-1 px-4 py-2 rounded-xl text-white text-sm transition-all hover:shadow-lg ${
                  confirmConfig.type === 'danger' 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-red-500/25' 
                    : confirmConfig.type === 'warning'
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:shadow-yellow-500/25'
                    : 'bg-gradient-to-r from-[#82947A] to-black hover:shadow-[#82947A]/25'
                }`}
              >
                {confirmConfig.confirmText || 'Confirm'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
// ========== MAIN ADMIN ORDERS PAGE ==========
export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [stats, setStats] = useState(null);
  const [sortBy, setSortBy] = useState('-createdAt');
  const [activeStatusTab, setActiveStatusTab] = useState('all');
  const [downloadingOrders, setDownloadingOrders] = useState({});
  const [userRole, setUserRole] = useState('');
  
  // Delivery related states
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState({});
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [refreshingOrders, setRefreshingOrders] = useState({});
  const [deliveryStatuses, setDeliveryStatuses] = useState({});

  const [showCourierScoreModal, setShowCourierScoreModal] = useState(false);
  const [selectedOrderForScore, setSelectedOrderForScore] = useState(null);
  
  // Bulk selection states
  const [selectedOrdersList, setSelectedOrdersList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const isAdminOrSuperAdmin = userRole === 'super_admin' || userRole === 'admin';

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

  // Handle select all
  useEffect(() => {
    if (selectAll) {
      setSelectedOrdersList(orders);
    } else {
      setSelectedOrdersList([]);
    }
  }, [selectAll, orders]);

  const statusTabs = [
    { value: 'all', label: 'All', count: stats?.totalOrders || 0, color: 'bg-[#82947A]' },
    { value: 'placed', label: 'Placed', count: stats?.placedOrders || 0, color: 'bg-[#82947A]' },
    { value: 'follow_up', label: 'Follow Up', count: stats?.followUpOrders || 0, color: 'bg-[#82947A]' },
    { value: 'reminder', label: 'Reminder', count: stats?.reminderOrders || 0, color: 'bg-[#FFC107]' },
    { value: 'accepted', label: 'Accepted', count: stats?.acceptedOrders || 0, color: 'bg-[#82947A]' },
    { value: 'approved', label: 'Approved', count: stats?.approvedOrders || 0, color: 'bg-[#82947A]' },
    { value: 'hold', label: 'On Hold', count: stats?.holdOrders || 0, color: 'bg-yellow-500' },
    { value: 'processing', label: 'Processing', count: stats?.processingOrders || 0, color: 'bg-blue-500' },
    { value: 'courier_assigned', label: 'Courier Assigned', count: stats?.courierAssignedOrders || 0, color: 'bg-[#82947A]' },
    { value: 'partial_delivery', label: 'Partial Delivery', count: stats?.partialDeliveryOrders || 0, color: 'bg-yellow-500' },
    { value: 'ready_to_ship', label: 'Ready to Ship', count: stats?.readyToShipOrders || 0, color: 'bg-[#82947A]' },
    { value: 'rejected', label: 'Rejected', count: stats?.rejectedOrders || 0, color: 'bg-orange-500' },
    { value: 'delivered', label: 'Delivered', count: stats?.deliveredOrders || 0, color: 'bg-[#82947A]' },
    { value: 'returned', label: 'Returned', count: stats?.returnedOrders || 0, color: 'bg-purple-500' },
    { value: 'cancelled', label: 'Cancelled', count: stats?.cancelledOrders || 0, color: 'bg-red-500' }
  ];

// In AdminOrdersPage component - Ensure fetchOrders gets delivery status

const fetchOrders = useCallback(async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: 20,
      sort: sortBy
    });
    if (searchTerm) queryParams.append('search', searchTerm);
    if (activeStatusTab !== 'all') queryParams.append('orderStatus', activeStatusTab);
    if (statusFilter) queryParams.append('orderStatus', statusFilter);
    if (paymentFilter) queryParams.append('paymentStatus', paymentFilter);

    const response = await fetch(`http://localhost:5000/api/orders/admin/all?${queryParams}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    if (data.success) {
      console.log('📦 Orders received:', data.data);
      // ✅ Log delivery status for debugging
      data.data.forEach(order => {
        if (order.deliveryService) {
          console.log(`📦 Order ${order.orderNumber} deliveryStatus:`, order.deliveryService.deliveryStatus);
        }
      });
      
      setOrders(data.data);
      setTotalPages(data.pagination.pages);
      setTotalOrders(data.pagination.total);
      setSelectAll(false);
      setSelectedOrdersList([]);
    } else {
      toast.error(data.error || 'Failed to fetch orders');
    }
  } catch (error) {
    console.error('Fetch orders error:', error);
    toast.error('Network error');
  } finally {
    setLoading(false);
  }
}, [currentPage, searchTerm, activeStatusTab, statusFilter, paymentFilter, sortBy, router]);

  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/orders/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [fetchOrders, fetchStats]);

  // ========== AUTO-REFRESH DELIVERY STATUSES ==========
// In AdminOrdersPage component - Updated auto-refresh

useEffect(() => {
  const autoRefreshInterval = setInterval(() => {
    // ✅ Only refresh orders that are in courier_assigned status
    const ordersToRefresh = orders.filter(order => 
      order.deliveryService?.trackingNumber && 
      order.orderStatus === 'courier_assigned' &&
      order.deliveryService.deliveryStatus !== 'delivered' &&
      order.deliveryService.deliveryStatus !== 'cancelled' &&
      order.deliveryService.deliveryStatus !== 'returned'
    );
    
    console.log('🔄 Auto-refreshing delivery statuses for:', ordersToRefresh.length, 'orders');
    
    if (ordersToRefresh.length > 0 && ordersToRefresh.length < 10) {
      ordersToRefresh.forEach(order => {
        refreshSingleOrderDelivery(order._id);
      });
    }
  }, 60000); // ✅ Changed to 1 minute for testing
  
  return () => clearInterval(autoRefreshInterval);
}, [orders]);

// In AdminOrdersPage component - Fix refreshSingleOrderDelivery

// In AdminOrdersPage component - Updated refreshSingleOrderDelivery

const refreshSingleOrderDelivery = async (orderId) => {
  setRefreshingOrders(prev => ({ ...prev, [orderId]: true }));
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${orderId}/tracking`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    
    const data = await response.json();
    console.log('📦 Tracking response:', data);
    
    if (data.success) {
      // ✅ Get the delivery status from the response
      const newDeliveryStatus = data.data?.deliveryStatus || 
                                data.data?.trackingStatus || 
                                data.data?.status || 
                                'pending';
      
      console.log('📌 New delivery status from tracking:', newDeliveryStatus);
      
      // ✅ Update the order in the state
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order._id === orderId) {
            let newOrderStatus = order.orderStatus;
            
            // ✅ If delivered, update order status
            if (newDeliveryStatus === 'delivered' && order.orderStatus !== 'delivered') {
              newOrderStatus = 'delivered';
              toast.success(`✅ Order ${order.orderNumber || order._id.slice(-8).toUpperCase()} delivered!`);
            }
            
            // ✅ If courier_assigned, keep it as courier_assigned
            if (order.orderStatus === 'courier_assigned' && newDeliveryStatus !== 'delivered') {
              newOrderStatus = 'courier_assigned';
            }
            
            return {
              ...order,
              orderStatus: newOrderStatus,
              deliveryService: {
                ...order.deliveryService,
                deliveryStatus: newDeliveryStatus,
                history: data.data?.history || order.deliveryService?.deliveryStatusHistory || [],
                ...data.data
              }
            };
          }
          return order;
        })
      );
      
      setDeliveryStatuses(prev => ({
        ...prev,
        [orderId]: newDeliveryStatus
      }));
      
      toast.success('Delivery status refreshed');
    } else {
      toast.warning(data.error || 'Failed to refresh delivery status');
    }
  } catch (error) {
    console.error('Refresh delivery status error:', error);
    toast.error('Failed to refresh delivery status');
  } finally {
    setRefreshingOrders(prev => ({ ...prev, [orderId]: false }));
  }
};

  const toggleOrderSelection = (order) => {
    setSelectedOrdersList(prev => {
      const exists = prev.find(o => o._id === order._id);
      if (exists) {
        return prev.filter(o => o._id !== order._id);
      } else {
        return [...prev, order];
      }
    });
  };

  const toggleBulkDeleteMode = () => {
    if (showCheckboxes) {
      setShowCheckboxes(false);
      setSelectedOrdersList([]);
      setSelectAll(false);
    } else {
      setShowCheckboxes(true);
      setSelectedOrdersList([]);
      setSelectAll(false);
    }
  };

  const handleBulkDeleteSuccess = () => {
    fetchOrders();
    fetchStats();
    setSelectedOrdersList([]);
    setSelectAll(false);
    setShowCheckboxes(false);
  };

  const handleStatusUpdate = () => {
    fetchOrders();
    fetchStats();
  };

  const handlePaymentUpdate = () => {
    fetchOrders();
    fetchStats();
  };

  const handleEditOrder = () => {
    fetchOrders();
    fetchStats();
  };

  const handleDeleteOrder = () => {
    fetchOrders();
    fetchStats();
  };

  const handleDownloadInvoice = async (order) => {
    setDownloadingOrders(prev => ({ ...prev, [order._id]: true }));
    try {
      await generateInvoicePDF(order);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download invoice');
    } finally {
      setDownloadingOrders(prev => ({ ...prev, [order._id]: false }));
    }
  };

  const handleRefreshTracking = async (orderId) => {
    setRefreshLoading(true);
    try {
      await refreshSingleOrderDelivery(orderId);
      const updatedOrder = orders.find(o => o._id === orderId);
      if (updatedOrder && updatedOrder.deliveryService) {
        setTrackingInfo({
          ...trackingInfo,
          deliveryStatus: updatedOrder.deliveryService.deliveryStatus,
          ...updatedOrder.deliveryService
        });
      }
    } finally {
      setRefreshLoading(false);
    }
  };

  const handleTrackDelivery = async (order) => {
    if (!order.deliveryService?.trackingNumber) {
      toast.error('No tracking number available');
      return;
    }

    setTrackingLoading(prev => ({ ...prev, [order._id]: true }));

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/tracking`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setTrackingInfo({
          ...data.data,
          trackingNumber: order.deliveryService.trackingNumber,
          courierName: order.deliveryService.courierName,
          courierSlug: order.deliveryService.courierSlug,
          trackingUrl: order.deliveryService.trackingUrl,
          deliveryStatus: data.data.deliveryStatus || order.deliveryService.deliveryStatus
        });
        setShowTrackingModal(true);
      } else {
        setTrackingInfo({
          trackingNumber: order.deliveryService.trackingNumber,
          courierName: order.deliveryService.courierName,
          courierSlug: order.deliveryService.courierSlug,
          trackingUrl: order.deliveryService.trackingUrl,
          deliveryStatus: order.deliveryService.deliveryStatus,
          history: [],
          message: data.message || 'Tracking info not available'
        });
        setShowTrackingModal(true);
        toast.warning('Showing basic tracking info. API details not available.');
      }
    } catch (error) {
      console.error('Track delivery error:', error);
      setTrackingInfo({
        trackingNumber: order.deliveryService.trackingNumber,
        courierName: order.deliveryService.courierName,
        courierSlug: order.deliveryService.courierSlug,
        trackingUrl: order.deliveryService.trackingUrl,
        deliveryStatus: order.deliveryService.deliveryStatus,
        history: [],
        error: error.message
      });
      setShowTrackingModal(true);
      toast.error('Failed to get tracking details, showing basic info');
    } finally {
      setTrackingLoading(prev => ({ ...prev, [order._id]: false }));
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer', 'Phone', 'Division', 'City', 'Upazila/Thana', 'Total', 'Status', 'Payment Status', 'Payment Method', 'Date'];
    const rows = orders.map(order => [
      order.orderNumber || order._id.slice(-8).toUpperCase(),
      order.customerInfo?.fullName || '',
      order.customerInfo?.phone || '',
      order.customerInfo?.division || '',
      order.customerInfo?.city || '',
      order.customerInfo?.zone || '',
      order.total || 0,
      ORDER_STATUSES.find(s => s.value === order.orderStatus)?.label || order.orderStatus,
      PAYMENT_STATUSES.find(p => p.value === order.paymentStatus)?.label || order.paymentStatus,
      order.paymentMethod === 'cod' ? 'COD' : order.paymentMethod === 'online' ? 'Online' : order.paymentMethod,
      formatDate(order.createdAt)
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  const getStatusBadge = (status) => {
    const statusInfo = ORDER_STATUSES.find(s => s.value === status);
    if (!statusInfo) return <span className="px-1.5 py-0.5 rounded-full text-xs bg-[#E2E7EA] text-black border border-[#82947A]/30">{status}</span>;
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${statusInfo.color}`}>
        <statusInfo.icon className="w-2.5 h-2.5" />
        {statusInfo.label}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const paymentInfo = PAYMENT_STATUSES.find(p => p.value === status);
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${paymentInfo?.color || 'bg-[#E2E7EA] text-black border-[#82947A]/30'}`}>
        <FaMoneyBillWave className="w-2.5 h-2.5" />
        {paymentInfo?.label || status}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const methods = {
      'cod': { label: 'COD', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaMoneyBillWave },
      'online': { label: 'Online', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaCreditCard },
      'bkash': { label: 'bKash', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaMobileAlt },
      'nagad': { label: 'Nagad', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaMobileAlt }
    };
    
    const info = methods[method] || { label: method || 'Unknown', color: 'bg-[#E2E7EA] text-black border-[#82947A]/30', icon: FaMoneyBillWave };
    const Icon = info.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${info.color}`}>
        <Icon className="w-2.5 h-2.5" />
        {info.label}
      </span>
    );
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#82947A]/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[#64748B] font-medium">{title}</p>
          <p className="text-xl font-bold text-black">{value?.toLocaleString() || 0}</p>
        </div>
        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <ProtectedRoute pageKey="all_orders">
    <>
      <div className="min-h-screen bg-pink-100/20 pb-12 pt-6">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#82947A] rounded-xl flex items-center justify-center shadow-lg shadow-[#82947A]/25">
                <FaBox className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: '"Playfair Display"' }}>
                  Order Management
                </h1>
                <p className="text-sm text-[#64748B] mt-0.5">Manage and track all orders</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#82947A] to-[#485442] text-white rounded-xl hover:shadow-lg hover:shadow-[#82947A]/25 transition-all text-sm font-medium shadow-sm"
              >
                <FaDownload className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          {stats ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
              <StatCard title="Total Orders" value={stats.totalOrders} icon={<FaBox className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
              <StatCard title="Placed" value={stats.placedOrders || 0} icon={<FaClock className="w-5 h-5 text-black" />} color="bg-[#E2E7EA]" />
              <StatCard title="Follow Up" value={stats.followUpOrders || 0} icon={<FaHeadset className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
              <StatCard title="Accepted" value={stats.acceptedOrders || 0} icon={<FaCheckCircle className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
              <StatCard title="Approved" value={stats.approvedOrders || 0} icon={<FaCheckDouble className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
              <StatCard title="On Hold" value={stats.holdOrders || 0} icon={<FaClock className="w-5 h-5 text-yellow-600" />} color="bg-yellow-100" />
              <StatCard title="Processing" value={stats.processingOrders || 0} icon={<FaSpinner className="w-5 h-5 text-[#82947A]" />} color="bg-blue-100" />
              <StatCard title="Courier Assigned" value={stats.courierAssignedOrders || 0} icon={<FaTruck className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
              <StatCard title="Partial Delivery" value={stats.partialDeliveryOrders || 0} icon={<FaCheckDouble className="w-5 h-5 text-yellow-600" />} color="bg-yellow-100" />
              <StatCard title="Delivered" value={stats.deliveredOrders || 0} icon={<FaCheckDouble className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
              <StatCard title="Cancelled" value={stats.cancelledOrders || 0} icon={<FaBan className="w-5 h-5 text-red-500" />} color="bg-red-50" />
              <StatCard title="Returned" value={stats.returnedOrders || 0} icon={<FaUndo className="w-5 h-5 text-purple-500" />} color="bg-purple-50" />
              <StatCard title="Revenue" value={stats.totalRevenue} icon={<FaMoneyBillWave className="w-5 h-5 text-[#82947A]" />} color="bg-[#82947A]/10" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-13 gap-4 mb-6">
              {[...Array(13)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-[#82947A]/20 animate-pulse">
                  <div className="h-4 bg-[#E2E7EA] rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-[#E2E7EA] rounded w-3/4"></div>
                </div>
              ))}
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-[#82947A]/30 p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer Name, Email or Phone..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-10 py-2 border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black placeholder:text-[#64748B]"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] hover:text-[#82947A]"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black text-sm"
              >
                <option value="">All Order Status</option>
                {ORDER_STATUSES.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
              
              <select
                value={paymentFilter}
                onChange={(e) => {
                  setPaymentFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black text-sm"
              >
                <option value="">All Payment Status</option>
                {PAYMENT_STATUSES.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-[#82947A]/30 rounded-xl focus:ring-2 focus:ring-[#82947A] focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black text-sm"
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt_asc">Oldest First</option>
                <option value="-total">Highest Total</option>
                <option value="total_asc">Lowest Total</option>
              </select>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 border-b border-[#82947A]/30 pb-2">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveStatusTab(tab.value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${
                    activeStatusTab === tab.value
                      ? 'bg-gradient-to-r from-[#82947A] to-[#485442] text-white shadow-lg shadow-[#82947A]/25'
                      : 'bg-white text-[#64748B] hover:bg-[#E2E7EA] border border-[#82947A]/30'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${tab.color}`}></span>
                  {tab.label}
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeStatusTab === tab.value
                      ? 'bg-white/20 text-white'
                      : 'bg-[#E2E7EA] text-[#64748B]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-[#82947A]/30 shadow-sm overflow-hidden">
            {/* Bulk Delete Toolbar */}
            {isAdminOrSuperAdmin && (
              <div className="px-4 py-3 border-b border-[#82947A]/30 bg-[#E2E7EA]/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {showCheckboxes ? (
                    <>
                      <button
                        onClick={toggleBulkDeleteMode}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all text-sm font-medium"
                      >
                        <FaTimes className="w-4 h-4" />
                        Cancel Selection
                      </button>
                      <span className="text-sm text-[#64748B]">
                        {selectedOrdersList.length} order{selectedOrdersList.length !== 1 ? 's' : ''} selected
                      </span>
                      {selectedOrdersList.length > 0 && (
                        <button
                          onClick={() => setShowBulkDeleteModal(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all text-sm font-medium"
                        >
                          <FaTrash className="w-4 h-4" />
                          Delete Selected ({selectedOrdersList.length})
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={toggleBulkDeleteMode}
                      className="flex items-center gap-2 px-4 py-2 bg-[#E2E7EA] text-black rounded-xl hover:bg-[#82947A]/10 transition-all text-sm font-medium"
                    >
                      <FaTrash className="w-4 h-4" />
                      Delete Multiple
                    </button>
                  )}
                </div>
                
                {showCheckboxes && selectedOrdersList.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectAll(!selectAll)}
                      className="text-sm text-[#82947A] hover:underline"
                    >
                      {selectAll ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Table Container */}
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1200px] lg:min-w-full">
                <thead className="bg-[#E2E7EA]/50 border-b border-[#82947A]/30">
                  <tr>
                    {isAdminOrSuperAdmin && showCheckboxes && (
                      <th className="px-2 py-2 text-center sticky left-0 bg-[#E2E7EA]/50 z-10">
                        <button
                          onClick={() => setSelectAll(!selectAll)}
                          className="text-[#64748B] hover:text-[#82947A] transition-colors"
                        >
                          {selectAll ? (
                            <FaCheckSquare className="w-4 h-4 text-[#82947A]" />
                          ) : (
                            <FaSquare className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                    )}
                    <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">Order ID</th>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">Customer</th>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">Phone</th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-[#64748B] whitespace-nowrap">Total</th>
                    <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">Status</th>
                    <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">Payment</th>
                    <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">Method</th>
                    <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">Delivery</th>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">Date</th>
                    <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={isAdminOrSuperAdmin && showCheckboxes ? 11 : 10} className="px-4 py-8 text-center"><div className="flex justify-center"><div className="w-6 h-6 border-3 border-[#82947A] border-t-transparent rounded-full animate-spin"></div></div></td></tr>
                  ) : orders.length === 0 ? (
                    <tr><td colSpan={isAdminOrSuperAdmin && showCheckboxes ? 11 : 10} className="px-4 py-8 text-center text-[#64748B] text-sm">No orders found</td></tr>
                  ) : (
                    orders.map((order) => {
                      const isSelected = selectedOrdersList.some(o => o._id === order._id);
                      const hasDelivery = order.deliveryService?.courierOrderId;
                      const isCancelled = order.orderStatus === 'cancelled';
                      const canCreateDelivery = order.orderStatus === 'ready_to_ship' && !hasDelivery && !isCancelled;
                      const isTerminal = ['cancelled', 'delivered', 'returned', 'rejected'].includes(order.orderStatus);
                      
                      return (
                        <tr key={order._id} className="border-b border-[#82947A]/20 hover:bg-[#E2E7EA]/30 transition-colors">
                          {isAdminOrSuperAdmin && showCheckboxes && (
                            <td className="px-2 py-2 text-center sticky left-0 bg-white z-10">
                              <button
                                onClick={() => toggleOrderSelection(order)}
                                className="text-[#64748B] hover:text-[#82947A] transition-colors"
                              >
                                {isSelected ? (
                                  <FaCheckSquare className="w-4 h-4 text-[#82947A]" />
                                ) : (
                                  <FaSquare className="w-4 h-4" />
                                )}
                              </button>
                            </td>
                          )}
                          <td className="px-2 py-2 text-xs font-mono text-black whitespace-nowrap">{order.orderNumber || order._id.slice(-8).toUpperCase()}</td>
                          <td className="px-2 py-2 text-xs">
                            <div className="font-medium truncate max-w-[150px] text-black">{order.customerInfo?.fullName}</div>
                            <div className="text-[#64748B] text-xs truncate max-w-[150px]">{order.customerInfo?.email}</div>
                          </td>
                          <td className="px-2 py-2 text-xs text-black whitespace-nowrap">{order.customerInfo?.phone}</td>
                          <td className="px-2 py-2 text-xs text-right font-bold text-[#82947A] whitespace-nowrap">৳{order.total?.toFixed(2)}</td>
                          <td className="px-2 py-2 text-center">
                            <button 
                              onClick={() => { 
                                setSelectedOrder(order); 
                                setShowStatusModal(true); 
                              }} 
                              className="hover:opacity-80 transition-opacity"
                              disabled={isTerminal}
                            >
                              {getStatusBadge(order.orderStatus)}
                            </button>
                            {isTerminal && (
                              <span className="block text-[8px] text-[#64748B]">(Final)</span>
                            )}
                          </td>
                          <td className="px-2 py-2 text-center">
                            <button onClick={() => { setSelectedOrder(order); setShowPaymentModal(true); }} className="hover:opacity-80 transition-opacity">
                              {getPaymentBadge(order.paymentStatus)}
                            </button>
                          </td>
                          <td className="px-2 py-2 text-center">{getPaymentMethodBadge(order.paymentMethod)}</td>
                          
                          
                          {/* ========== DELIVERY COLUMN ========== */}
<td className="px-2 py-2 text-center">
  {hasDelivery ? (
    <div className="flex flex-col items-center gap-0.5 min-w-[100px]">
      <span className="text-xs font-medium text-black">
        {order.deliveryService.courierName}
      </span>
      
      <div className="flex items-center gap-1">
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] ${getStatusColor(order.deliveryService.deliveryStatus)}`}>
          {getStatusDisplay(order.deliveryService.deliveryStatus)}
        </span>
        
        <button
          onClick={() => refreshSingleOrderDelivery(order._id)}
          className="text-[10px] text-[#82947A] hover:text-[#0891B2] transition-colors"
          disabled={refreshingOrders[order._id]}
          title="Refresh delivery status"
        >
          {refreshingOrders[order._id] ? (
            <FaSpinner className="w-2.5 h-2.5 animate-spin" />
          ) : (
            <FaSync className="w-2.5 h-2.5" />
          )}
        </button>
        
        {order.deliveryService.trackingNumber && (
          <button
            onClick={() => {
              setSelectedOrder(order);
              handleTrackDelivery(order);
            }}
            className="text-[10px] text-[#82947A] hover:underline flex items-center gap-1"
            disabled={trackingLoading[order._id]}
          >
            {trackingLoading[order._id] ? (
              <FaSpinner className="w-3 h-3 animate-spin" />
            ) : (
              <>
                <FaSearch className="w-2.5 h-2.5" />
                Track
              </>
            )}
          </button>
        )}
      </div>
      
      {order.deliveryService.trackingUrl && (
        <a
          href={order.deliveryService.trackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-[#64748B] hover:text-[#82947A] flex items-center gap-1"
          title={`Track on ${order.deliveryService.courierName}`}
        >
          <FaExternalLinkAlt className="w-2.5 h-2.5" />
          <span>Track on {order.deliveryService.courierName}</span>
        </a>
      )}
    </div>
  ) : (
    (() => {
      // ========== STATUSES THAT CAN CREATE DELIVERY ==========
      const canCreateDeliveryStatuses = ['approved', 'processing', 'hold', 'ready_to_ship', 'accepted'];
      const canCreate = canCreateDeliveryStatuses.includes(order.orderStatus) && !isCancelled;
      
      if (canCreate) {
        return (
          <button
            onClick={() => { setSelectedOrder(order); setShowDeliveryModal(true); }}
            className="inline-flex items-center gap-1 px-2 py-1 bg-[#82947A] text-white text-[10px] rounded hover:bg-[#485442] transition-colors whitespace-nowrap"
          >
            <FaTruck className="w-3 h-3" />
            Create Delivery
          </button>
        );
      } else if (isCancelled) {
        return <span className="text-xs text-gray-400">Cancelled</span>;
      } else {
        return <span className="text-xs text-gray-400 whitespace-nowrap">Not available</span>;
      }
    })()
  )}
</td>
                          
                          <td className="px-2 py-2 text-xs text-[#64748B] whitespace-nowrap">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="px-2 py-2 text-center">
                            <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                              <button onClick={() => { setSelectedOrder(order); setShowDetailsModal(true); }} className="p-1 text-[#82947A] hover:bg-[#E2E7EA] rounded transition-colors" title="View Details">
                                <FaEye className="w-3.5 h-3.5" />
                              </button>
                              
                              <button
                                onClick={() => handleDownloadInvoice(order)}
                                disabled={downloadingOrders[order._id]}
                                className="p-1 text-[#82947A] hover:bg-[#E2E7EA] rounded transition-colors disabled:opacity-50" title="Download Invoice"
                              >
                                {downloadingOrders[order._id] ? (
                                  <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <FaDownload className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button onClick={() => { setSelectedOrder(order); setShowEditModal(true); }} className="p-1 text-black hover:bg-[#E2E7EA] rounded transition-colors" title="Edit Order">
                                <FaEdit className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedOrderForScore(order);
                                  setShowCourierScoreModal(true);
                                }}
                                className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                                title="View Courier Score"
                              >
                                <FaChartLine className="w-3.5 h-3.5" />
                              </button>
                              {isAdminOrSuperAdmin && !showCheckboxes && (
                                <button 
                                  onClick={() => { setSelectedOrder(order); setShowDeleteModal(true); }} 
                                  className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors" 
                                  title="Delete Order"
                                >
                                  <FaTrash className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-3 py-2 border-t border-[#82947A]/30 flex flex-wrap items-center justify-between gap-3 bg-[#E2E7EA]/20">
                <p className="text-xs text-[#64748B]">Showing {orders.length} of {totalOrders} orders</p>
                <div className="flex gap-1">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 border border-[#82947A]/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-black">
                    <FaChevronLeft className="w-3 h-3" />
                  </button>
                  <span className="px-2 py-1 text-xs text-black">Page {currentPage} of {totalPages}</span>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 border border-[#82947A]/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-black">
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <StatusUpdateModal 
        isOpen={showStatusModal} 
        onClose={() => setShowStatusModal(false)} 
        order={selectedOrder} 
        onUpdate={handleStatusUpdate}
        userRole={userRole}
      />
      
      <PaymentStatusModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} order={selectedOrder} onUpdate={handlePaymentUpdate} />
      
      <OrderDetailsModal 
        isOpen={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)} 
        order={selectedOrder} 
        onStatusUpdate={() => { setShowDetailsModal(false); setShowStatusModal(true); }} 
        onPaymentUpdate={() => { setShowDetailsModal(false); setShowPaymentModal(true); }}
        onDownloadInvoice={handleDownloadInvoice}
      />
      
      <EditOrderModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} order={selectedOrder} onUpdate={handleEditOrder} userRole={userRole} />
      
      <DeleteConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} order={selectedOrder} onDelete={handleDeleteOrder} />
      
      <BulkDeleteModal 
        isOpen={showBulkDeleteModal} 
        onClose={() => setShowBulkDeleteModal(false)} 
        selectedOrders={selectedOrdersList}
        onDelete={handleBulkDeleteSuccess}
      />

      <QuickDeliveryModal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        order={selectedOrder}
        onDeliveryCreated={() => {
          setShowDeliveryModal(false);
          fetchOrders();
          fetchStats();
        }}
      />

      <TrackingModal
        isOpen={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
        trackingInfo={trackingInfo}
        order={selectedOrder}
        onRefreshTracking={() => handleRefreshTracking(selectedOrder?._id)}
        refreshLoading={refreshLoading}
      />

      <CourierScoreModal
        isOpen={showCourierScoreModal}
        onClose={() => {
          setShowCourierScoreModal(false);
          setSelectedOrderForScore(null);
        }}
        order={selectedOrderForScore}
      />
    </>
    </ProtectedRoute>
  );
}