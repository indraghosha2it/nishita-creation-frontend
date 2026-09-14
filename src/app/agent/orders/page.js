// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
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
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaCheckDouble,
//   FaBan,
//   FaFileInvoice,
//   FaExclamationTriangle,
//   FaSave,
//   FaTimes,
//   FaCreditCard,
//   FaMobileAlt,
//   FaCity,
//   FaMapPin,
//   FaHome,
//   FaChevronDown,
//   FaEnvelope,
//   FaPhone,
//   FaTruck,
//   FaInfoCircle,
//   FaPhoneAlt,
//   FaUserCircle,
//   FaHeadset,
//   FaClipboardList,
//   FaFilter,
//   FaSortAmountDown,
//   FaSortAmountUp,
//   FaUndo,
//   FaReply,
//   FaCheck,
//   FaTimes as FaTimesIcon,
//   FaUserCheck,
//   FaUserTimes,
//   FaPrint,
//   FaPalette
// } from 'react-icons/fa';
// import { MdOutlinePendingActions } from 'react-icons/md';

// // ========== ORDER STATUSES ==========
// const ORDER_STATUSES = [
//   { value: 'follow_up', label: 'Follow Up', color: 'bg-pink-600/10 text-pink-600 border-pink-600/30', icon: FaHeadset },
//   { value: 'reminder', label: 'Reminder', color: 'bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/30', icon: FaClock },
//   { value: 'accepted', label: 'Accepted', color: 'bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/30', icon: FaCheckCircle },
//   { value: 'cancelled', label: 'Rejected', color: 'bg-red-50 text-red-600 border-red-200', icon: FaBan },
// ];

// const PAYMENT_STATUSES = [
//   { value: 'pending', label: 'Pending', color: 'bg-[#E2E7EA] text-pink-800 border-pink-600/30' },
//   { value: 'paid', label: 'Paid', color: 'bg-pink-600/10 text-pink-600 border-pink-600/30' },
//   { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-600 border-red-200' },
//   { value: 'refunded', label: 'Refunded', color: 'bg-[#E2E7EA] text-pink-800 border-pink-600/30' }
// ];

// // ========== STATUS UPDATE MODAL ==========
// const StatusUpdateModal = ({ isOpen, onClose, order, onUpdate }) => {
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [cancellationReason, setCancellationReason] = useState('');
//   const [statusNote, setStatusNote] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (order) {
//       setSelectedStatus(order.orderStatus);
//       setCancellationReason(order.cancellationReason || '');
//       setStatusNote('');
//     }
//   }, [order]);

//   const currentStatusInfo = ORDER_STATUSES.find(s => s.value === order?.orderStatus);
  
//   const getAvailableNextStatuses = () => {
//     if (!order) return [];
//     const currentStatus = order.orderStatus;
//     if (currentStatus === 'follow_up') {
//       return ['accepted', 'cancelled', 'reminder'];
//     }
//     if (currentStatus === 'reminder') {
//       return ['accepted', 'cancelled'];
//     }
//     return [];
//   };

//   const availableNextStatuses = getAvailableNextStatuses();
//   const isRejecting = selectedStatus === 'cancelled';
//   const canChange = availableNextStatuses.length > 0;

//   const handleSubmit = async () => {
//     if (!selectedStatus || selectedStatus === order.orderStatus) {
//       toast.error('Please select a different status');
//       return;
//     }

//     if (isRejecting && !cancellationReason.trim()) {
//       toast.error('Please provide a rejection reason');
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/orders/agent/${order._id}/status`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           orderStatus: selectedStatus,
//           cancellationReason: isRejecting ? cancellationReason : undefined,
//           statusNote: statusNote.trim() || undefined
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         const statusLabel = ORDER_STATUSES.find(s => s.value === selectedStatus)?.label || selectedStatus;
//         toast.success(`Order status updated to ${statusLabel}`);
//         onUpdate();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to update status');
//       }
//     } catch (error) {
//       console.error('Status update error:', error);
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
//         className="relative bg-white rounded-2xl border border-pink-600/30 shadow-2xl w-full max-w-md overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-pink-600 to-pink-800 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaEdit className="w-5 h-5" />
//               <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Update Order Status</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
//           <div>
//             <label className="block text-xs font-medium text-pink-800 mb-1">Current Status</label>
//             <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${currentStatusInfo?.color || 'bg-[#E2E7EA] text-pink-800 border-pink-600/30'}`}>
//               {currentStatusInfo?.icon && <currentStatusInfo.icon className="w-3 h-3" />}
//               <span>{currentStatusInfo?.label || order?.orderStatus}</span>
//             </div>
//           </div>

//           {canChange ? (
//             <>
//               <div>
//                 <label className="block text-xs font-medium text-pink-800 mb-1">Change Status To</label>
//                 <select
//                   value={selectedStatus}
//                   onChange={(e) => {
//                     setSelectedStatus(e.target.value);
//                     if (e.target.value !== 'cancelled') {
//                       setCancellationReason('');
//                     }
//                   }}
//                   className="w-full px-3 py-1.5 text-sm border border-pink-600/30 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent bg-white text-pink-800"
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
//                 <div className="bg-[#E2E7EA]/50 rounded-xl p-2 border border-pink-600/30">
//                   <p className="text-xs text-pink-600">
//                     <span className="font-medium">Will change to:</span> {ORDER_STATUSES.find(s => s.value === selectedStatus)?.label}
//                   </p>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-xs font-medium text-pink-800 mb-1">
//                   Status Note <span className="text-[#64748B] text-[10px] font-normal">(Optional)</span>
//                 </label>
//                 <textarea
//                   value={statusNote}
//                   onChange={(e) => setStatusNote(e.target.value)}
//                   rows="2"
//                   placeholder="Add a note about this status change..."
//                   className="w-full px-3 py-1.5 text-sm border border-pink-600/30 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent bg-white text-pink-800 placeholder:text-[#64748B]"
//                 />
//                 <p className="text-xs text-[#64748B] mt-1">This note will be visible in the order history</p>
//               </div>

//               {isRejecting && (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-3">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FaExclamationTriangle className="w-4 h-4 text-red-600" />
//                     <label className="text-xs font-medium text-pink-800">
//                       Rejection Reason <span className="text-red-500">*</span>
//                     </label>
//                   </div>
//                   <textarea
//                     value={cancellationReason}
//                     onChange={(e) => setCancellationReason(e.target.value)}
//                     rows="3"
//                     placeholder="Please provide a reason for rejection..."
//                     className="w-full px-3 py-1.5 text-sm border border-pink-600/30 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent bg-white text-pink-800 placeholder:text-[#64748B]"
//                     required
//                   />
//                   <p className="text-xs text-red-600 mt-1">This reason will be saved with the order</p>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-pink-600/30">
//               <p className="text-xs text-[#64748B] flex items-center gap-2">
//                 <FaInfoCircle className="w-4 h-4" />
//                 {order?.orderStatus === 'accepted' && 'This order has been accepted. No further changes allowed.'}
//                 {order?.orderStatus === 'cancelled' && 'This order has been rejected. No further changes allowed.'}
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t border-pink-600/30 bg-[#E2E7EA]/20 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-pink-600/30 text-[#64748B] rounded-xl hover:bg-white transition-colors text-sm">
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading || !canChange || selectedStatus === order?.orderStatus}
//             className="flex-1 px-3 py-2 bg-gradient-to-r from-pink-600 to-pink-800 text-white rounded-xl hover:shadow-lg hover:shadow-pink-600/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//           >
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
//             Update Status
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER DETAILS MODAL ==========
// const OrderDetailsModal = ({ isOpen, onClose, order }) => {
//   if (!isOpen || !order) return null;

//   const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
//   const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);

//   // Helper function to get color name
//   const getColorName = (color) => {
//     const colorMap = {
//       '#000000': 'Black',
//       '#FFFFFF': 'White',
//       '#FF0000': 'Red',
//       '#00FF00': 'Green',
//       '#0000FF': 'Blue',
//       '#FFFF00': 'Yellow',
//       '#FF00FF': 'Magenta',
//       '#00FFFF': 'Cyan',
//       '#FFA500': 'Orange',
//       '#800080': 'Purple',
//       '#008000': 'Dark Green',
//       '#FFC0CB': 'Pink',
//       '#A52A2A': 'Brown',
//       '#808080': 'Gray',
//       '#C0C0C0': 'Silver',
//       '#4A90E2': 'Blue',
//       '#FF6B6B': 'Red',
//       '#4ECDC4': 'Teal',
//       '#45B7D1': 'Sky Blue',
//       '#96CEB4': 'Mint',
//       '#FFEAA7': 'Cream',
//       '#DDA0DD': 'Plum',
//       '#98D8C8': 'Seafoam',
//       '#F7DC6F': 'Gold',
//       '#BB8FCE': 'Lavender'
//     };
//     return colorMap[color] || color;
//   };

//   // Group items by product and show colors
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
//       // Check if item has colors array or selectedColor
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
//         // No color - add as single item
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

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         className="relative bg-white rounded-2xl border border-pink-600/30 shadow-2xl w-full max-w-3xl my-8 overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-pink-600 to-pink-800 text-white sticky top-0 z-10">
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
//           {/* Status Badges */}
//           <div className="flex flex-wrap gap-2 mb-5">
//             <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${statusInfo?.color || 'bg-[#E2E7EA] text-pink-800 border-pink-600/30'}`}>
//               {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
//               Order: {statusInfo?.label || order.orderStatus}
//             </span>
//             <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${paymentInfo?.color || 'bg-[#E2E7EA] text-pink-800 border-pink-600/30'}`}>
//               <FaMoneyBillWave className="w-3 h-3" />
//               Payment: {paymentInfo?.label || order.paymentStatus}
//             </span>
//             <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border bg-[#E2E7EA] text-pink-800 border-pink-600/30">
//               <FaCreditCard className="w-3 h-3" />
//               {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
//             </span>
//           </div>

//           {/* Rejection Reason if cancelled */}
//           {order.orderStatus === 'cancelled' && order.cancellationReason && (
//             <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaExclamationTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-red-700">Rejection Reason</h4>
//                   <p className="text-xs text-red-600 mt-1">{order.cancellationReason}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Customer & Delivery Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-pink-600/30">
//               <h3 className="font-semibold text-pink-800 text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-pink-600" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#64748B]">Name:</span> <span className="text-pink-800 font-medium">{order.customerInfo?.fullName}</span></p>
//                 <p><span className="text-[#64748B]">Email:</span> <span className="text-pink-800">{order.customerInfo?.email}</span></p>
//                 <p><span className="text-[#64748B]">Phone:</span> <span className="text-pink-800">{order.customerInfo?.phone}</span></p>
//               </div>
//             </div>

//             <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-pink-600/30">
//               <h3 className="font-semibold text-pink-800 text-sm mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="w-3.5 h-3.5 text-pink-600" />
//                 Delivery Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#64748B]">Division:</span> <span className="font-medium text-pink-800">{order.customerInfo?.division || 'N/A'}</span></p>
//                 <p><span className="text-[#64748B]">District/City:</span> <span className="font-medium text-pink-800">{order.customerInfo?.city || 'N/A'}</span></p>
//                 <p><span className="text-[#64748B]">Upazila/Thana:</span> <span className="font-medium text-pink-800">{order.customerInfo?.zone || 'N/A'}</span></p>
//                 <p><span className="text-[#64748B]">Address:</span> <span className="text-pink-800">{order.customerInfo?.address}</span></p>
//               </div>
//             </div>
//           </div>

//           {/* Order Items with Colors */}
//           <div className="mb-5">
//             <h3 className="font-semibold text-pink-800 text-sm mb-2 flex items-center gap-1.5">
//               <FaBox className="w-3.5 h-3.5 text-pink-600" />
//               Order Items
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs">
//                 <thead className="bg-[#E2E7EA]">
//                   <tr>
//                     <th className="px-2 py-1.5 text-left text-pink-800">Product</th>
//                     <th className="px-2 py-1.5 text-center text-pink-800">Color</th>
//                     <th className="px-2 py-1.5 text-center text-pink-800">Qty</th>
//                     <th className="px-2 py-1.5 text-right text-pink-800">Price</th>
//                     <th className="px-2 py-1.5 text-right text-pink-800">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {groupedItems.map((group, idx) => {
//                     const hasColors = group.colors && group.colors.length > 0;
//                     const hasMultipleColors = hasColors && group.colors.length > 1;
                    
//                     return group.colors.map((colorObj, colorIdx) => {
//                       const isFirst = colorIdx === 0;
//                       const isOnly = group.colors.length === 1;
//                       const price = colorObj.price || group.discountPrice || group.regularPrice;
//                       const totalPrice = price * colorObj.quantity;
                      
//                       return (
//                         <tr key={`${idx}-${colorIdx}`} className="border-t border-pink-600/20">
//                           {isFirst && (
//                             <td className="px-2 py-2" rowSpan={hasMultipleColors ? group.colors.length : 1}>
//                               <div className="flex items-center gap-2">
//                                 <img 
//                                   src={group.image || 'https://via.placeholder.com/30'} 
//                                   alt={group.productName}
//                                   className="w-7 h-7 rounded object-cover border border-pink-600/30"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                                 />
//                                 <p className="font-medium text-xs text-pink-800">{group.productName}</p>
//                               </div>
//                             </td>
//                           )}
//                           <td className="px-2 py-2 text-center">
//   {colorObj.color ? (
//     <div className="flex items-center justify-center">
//       <div 
//         className="w-5 h-5 rounded-full border border-pink-600/30 shadow-sm"
//         style={{ backgroundColor: colorObj.color }}
//         title={colorObj.color}
//       />
//     </div>
//   ) : (
//     <span className="text-xs text-[#64748B]">-</span>
//   )}
// </td>
//                           <td className="px-2 py-2 text-center text-pink-800">{colorObj.quantity}</td>
//                           <td className="px-2 py-2 text-right text-pink-800">৳{price.toFixed(2)}</td>
//                           <td className="px-2 py-2 text-right font-medium text-pink-600">৳{totalPrice.toFixed(2)}</td>
//                         </tr>
//                       );
//                     });
//                   })}
//                 </tbody>
//                 <tfoot className="border-t border-pink-600/30">
//                   <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-pink-800">Subtotal:</td><td className="px-2 py-1 text-right text-pink-800">৳{order.subtotal?.toFixed(2)}</td></tr>
//                   <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-pink-800">Shipping:</td><td className="px-2 py-1 text-right text-pink-800">৳{order.shippingCost?.toFixed(2)}</td></tr>
//                   <tr className="text-sm font-bold">
//                     <td colSpan="4" className="px-2 py-1 text-right text-pink-800">Total:</td>
//                     <td className="px-2 py-1 text-right text-pink-600">৳{order.total?.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 border-t border-pink-600/30 bg-[#E2E7EA]/20 flex justify-end gap-2">
        
//           <button onClick={onClose} className="px-3 py-1.5 bg-gradient-to-r from-pink-600 to-pink-800 text-white rounded-xl hover:shadow-lg hover:shadow-pink-600/25 transition-all text-sm">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== MAIN AGENT ORDERS PAGE ==========
// export default function AgentOrdersPage() {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [sortBy, setSortBy] = useState('-createdAt');
//   const [activeStatusTab, setActiveStatusTab] = useState('all');
//   const [tabCounts, setTabCounts] = useState({
//     follow_up: 0,
//     reminder: 0,
//     accepted: 0,
//     cancelled: 0
//   });

//   // Agent-specific status tabs with counts
//   const statusTabs = [
//     { value: 'all', label: 'All', count: totalOrders, color: 'bg-pink-600' },
//     { value: 'follow_up', label: 'Follow Up', count: tabCounts.follow_up, color: 'bg-pink-600' },
//     { value: 'reminder', label: 'Reminder', count: tabCounts.reminder, color: 'bg-[#FFC107]' },
//     { value: 'accepted', label: 'Accepted', count: tabCounts.accepted, color: 'bg-[#4CAF50]' },
//     { value: 'cancelled', label: 'Rejected', count: tabCounts.cancelled, color: 'bg-red-500' }
//   ];

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: 20,
//         sort: sortBy
//       });
//       if (searchTerm) queryParams.append('search', searchTerm);
//       if (activeStatusTab !== 'all') queryParams.append('orderStatus', activeStatusTab);
//       if (statusFilter) queryParams.append('orderStatus', statusFilter);

//       const response = await fetch(`http://localhost:5000/api/orders/agent/orders?${queryParams}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setOrders(data.data);
//         setTotalPages(data.pagination.pages);
//         setTotalOrders(data.pagination.total);
        
//         // Update tab counts correctly
//         const counts = {
//           follow_up: 0,
//           reminder: 0,
//           accepted: 0,
//           cancelled: 0
//         };
//         data.data.forEach(order => {
//           if (counts[order.orderStatus] !== undefined) {
//             counts[order.orderStatus]++;
//           }
//         });
//         setTabCounts(counts);
//       } else {
//         toast.error(data.error || 'Failed to fetch orders');
//       }
//     } catch (error) {
//       console.error('Fetch orders error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchTerm, activeStatusTab, statusFilter, sortBy, router]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const handleStatusUpdate = () => {
//     fetchOrders();
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

//   const getStatusBadge = (status) => {
//     const statusInfo = ORDER_STATUSES.find(s => s.value === status);
//     if (!statusInfo) return <span className="px-1.5 py-0.5 rounded-full text-xs bg-[#E2E7EA] text-pink-800 border border-pink-600/30">{status}</span>;
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
//       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${paymentInfo?.color || 'bg-[#E2E7EA] text-pink-800 border-pink-600/30'}`}>
//         <FaMoneyBillWave className="w-2.5 h-2.5" />
//         {paymentInfo?.label || status}
//       </span>
//     );
//   };

//   const getPaymentMethodBadge = (method) => {
//     const methods = {
//       'cod': { label: 'COD', color: 'bg-[#E2E7EA] text-pink-800 border-pink-600/30', icon: FaMoneyBillWave },
//       'online': { label: 'Online', color: 'bg-[#E2E7EA] text-pink-800 border-pink-600/30', icon: FaCreditCard },
//       'bkash': { label: 'bKash', color: 'bg-[#E2E7EA] text-pink-800 border-pink-600/30', icon: FaMobileAlt },
//       'nagad': { label: 'Nagad', color: 'bg-[#E2E7EA] text-pink-800 border-pink-600/30', icon: FaMobileAlt }
//     };
    
//     const info = methods[method] || { label: method || 'Unknown', color: 'bg-[#E2E7EA] text-pink-800 border-pink-600/30', icon: FaMoneyBillWave };
//     const Icon = info.icon;
    
//     return (
//       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${info.color}`}>
//         <Icon className="w-2.5 h-2.5" />
//         {info.label}
//       </span>
//     );
//   };

//   const StatCard = ({ title, value, icon, color }) => (
//     <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-600/20">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-xs text-[#64748B] font-medium">{title}</p>
//           <p className="text-xl font-bold text-pink-800">{value?.toLocaleString() || 0}</p>
//         </div>
//         <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );

//   // Calculate stats
//   const stats = {
//     total: orders.length,
//     followUp: orders.filter(o => o.orderStatus === 'follow_up').length,
//     reminder: orders.filter(o => o.orderStatus === 'reminder').length,
//     accepted: orders.filter(o => o.orderStatus === 'accepted').length,
//     rejected: orders.filter(o => o.orderStatus === 'cancelled').length
//   };

//   return (
//     <div className="min-h-screen bg-[#E2E7EA]/20 pb-12 pt-6">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-pink-800 rounded-xl flex items-center justify-center shadow-lg shadow-pink-600/25">
//               <FaHeadset className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: '"Playfair Display"' }}>
//                 Agent Orders
//               </h1>
//               <p className="text-sm text-[#64748B] mt-0.5">Manage and track customer orders</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
//           <StatCard title="Total Orders" value={stats.total} icon={<FaBox className="w-5 h-5 text-pink-600" />} color="bg-pink-600/10" />
//           <StatCard title="Follow Up" value={stats.followUp} icon={<FaHeadset className="w-5 h-5 text-pink-600" />} color="bg-pink-600/10" />
//           <StatCard title="Reminder" value={stats.reminder} icon={<FaClock className="w-5 h-5 text-[#FFC107]" />} color="bg-[#FFC107]/10" />
//           <StatCard title="Accepted" value={stats.accepted} icon={<FaCheckCircle className="w-5 h-5 text-[#4CAF50]" />} color="bg-[#4CAF50]/10" />
//           <StatCard title="Rejected" value={stats.rejected} icon={<FaBan className="w-5 h-5 text-red-500" />} color="bg-red-50" />
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-2xl border border-pink-600/30 p-4 mb-6 shadow-sm">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search by Order ID, Customer Name, Email or Phone..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-10 pr-10 py-2 border border-pink-600/30 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-pink-800 placeholder:text-[#64748B]"
//               />
//               {searchTerm && (
//                 <button
//                   onClick={() => {
//                     setSearchTerm('');
//                     setCurrentPage(1);
//                   }}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] hover:text-pink-600"
//                 >
//                   <FaTimes className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="px-4 py-2 border border-pink-600/30 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-pink-800 text-sm"
//             >
//               <option value="">All Status</option>
//               {ORDER_STATUSES.map(status => (
//                 <option key={status.value} value={status.value}>{status.label}</option>
//               ))}
//             </select>
            
//             <select
//               value={sortBy}
//               onChange={(e) => {
//                 setSortBy(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="px-4 py-2 border border-pink-600/30 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-pink-800 text-sm"
//             >
//               <option value="-createdAt">Newest First</option>
//               <option value="createdAt_asc">Oldest First</option>
//               <option value="-total">Highest Total</option>
//               <option value="total_asc">Lowest Total</option>
//             </select>
//           </div>
//         </div>

//         {/* Status Tabs */}
//         <div className="mb-6">
//           <div className="flex flex-wrap gap-2 border-b border-pink-600/30 pb-2">
//             {statusTabs.map((tab) => (
//               <button
//                 key={tab.value}
//                 onClick={() => {
//                   setActiveStatusTab(tab.value);
//                   setCurrentPage(1);
//                 }}
//                 className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${
//                   activeStatusTab === tab.value
//                     ? 'bg-gradient-to-r from-pink-600 to-pink-800 text-white shadow-lg shadow-pink-600/25'
//                     : 'bg-white text-[#64748B] hover:bg-[#E2E7EA] border border-pink-600/30'
//                 }`}
//               >
//                 <span className={`w-2 h-2 rounded-full ${tab.color}`}></span>
//                 {tab.label}
//                 <span className={`px-1.5 py-0.5 rounded-full text-xs ${
//                   activeStatusTab === tab.value
//                     ? 'bg-white/20 text-white'
//                     : 'bg-[#E2E7EA] text-[#64748B]'
//                 }`}>
//                   {tab.count}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Orders Table */}
//         <div className="bg-white rounded-2xl border border-pink-600/30 shadow-sm overflow-hidden">
//           <div className="w-full overflow-x-visible">
//             <table className="w-full min-w-[800px] lg:min-w-full">
//               <thead className="bg-[#E2E7EA]/50 border-b border-pink-600/30">
//                 <tr>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B]">Order ID</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B]">Customer</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B]">Phone</th>
//                   <th className="px-2 py-2 text-right text-xs font-semibold text-[#64748B]">Total</th>
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B]">Status</th>
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B]">Payment</th>
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B]">Method</th>
//                   <th className="px-2 py-2 text-left text-xs font-semibold text-[#64748B]">Date</th>
//                   <th className="px-2 py-2 text-center text-xs font-semibold text-[#64748B]">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr><td colSpan="9" className="px-4 py-8 text-center"><div className="flex justify-center"><div className="w-6 h-6 border-3 border-pink-600 border-t-transparent rounded-full animate-spin"></div></div></td></tr>
//                 ) : orders.length === 0 ? (
//                   <tr><td colSpan="9" className="px-4 py-8 text-center text-[#64748B] text-sm">No orders found</td></tr>
//                 ) : (
//                   orders.map((order) => {
//                     const canUpdate = ['follow_up', 'reminder'].includes(order.orderStatus);
//                     return (
//                       <tr key={order._id} className="border-b border-pink-600/20 hover:bg-[#E2E7EA]/30 transition-colors">
//                         <td className="px-2 py-2 text-xs font-mono text-black">{order.orderNumber || order._id.slice(-8).toUpperCase()}</td>
//                         <td className="px-2 py-2 text-xs">
//                           <div className="font-medium truncate max-w-[150px] text-pink-800">{order.customerInfo?.fullName}</div>
//                           <div className="text-[#64748B] text-xs truncate max-w-[150px]">{order.customerInfo?.email}</div>
//                         </td>
//                         <td className="px-2 py-2 text-xs text-black">{order.customerInfo?.phone}</td>
//                         <td className="px-2 py-2 text-xs text-right font-bold text-green-600">৳{order.total?.toFixed(2)}</td>
//                         <td className="px-2 py-2 text-center">
//                           {canUpdate ? (
//                             <button 
//                               onClick={() => { setSelectedOrder(order); setShowStatusModal(true); }} 
//                               className="hover:opacity-80 transition-opacity cursor-pointer"
//                               title="Click to update status"
//                             >
//                               {getStatusBadge(order.orderStatus)}
//                             </button>
//                           ) : (
//                             <span className="cursor-default">
//                               {getStatusBadge(order.orderStatus)}
//                             </span>
//                           )}
//                         </td>
//                         <td className="px-2 py-2 text-center">{getPaymentBadge(order.paymentStatus)}</td>
//                         <td className="px-2 py-2 text-center">{getPaymentMethodBadge(order.paymentMethod)}</td>
//                         <td className="px-2 py-2 text-xs text-[#64748B] whitespace-nowrap">
//                           {formatDate(order.createdAt)}
//                         </td>
//                         <td className="px-2 py-2 text-center">
//                           <div className="flex items-center justify-center gap-1">
//                             <button 
//                               onClick={() => { setSelectedOrder(order); setShowDetailsModal(true); }} 
//                               className="p-1 text-pink-600 hover:bg-[#E2E7EA] rounded transition-colors" 
//                               title="View Details"
//                             >
//                               <FaEye className="w-3.5 h-3.5" />
//                             </button>
//                             {canUpdate && (
//                               <button 
//                                 onClick={() => { setSelectedOrder(order); setShowStatusModal(true); }} 
//                                 className="p-1 text-pink-800 hover:bg-[#E2E7EA] rounded transition-colors" 
//                                 title="Update Status"
//                               >
//                                 <FaEdit className="w-3.5 h-3.5" />
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="px-3 py-2 border-t border-pink-600/30 flex flex-wrap items-center justify-between gap-3 bg-[#E2E7EA]/20">
//               <p className="text-xs text-[#64748B]">Showing {orders.length} of {totalOrders} orders</p>
//               <div className="flex gap-1">
//                 <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 border border-pink-600/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-pink-800">
//                   <FaChevronLeft className="w-3 h-3" />
//                 </button>
//                 <span className="px-2 py-1 text-xs text-pink-800">Page {currentPage} of {totalPages}</span>
//                 <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 border border-pink-600/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-pink-800">
//                   <FaChevronRight className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       <StatusUpdateModal 
//         isOpen={showStatusModal} 
//         onClose={() => setShowStatusModal(false)} 
//         order={selectedOrder} 
//         onUpdate={handleStatusUpdate}
//       />
//       <OrderDetailsModal 
//         isOpen={showDetailsModal} 
//         onClose={() => setShowDetailsModal(false)} 
//         order={selectedOrder}
//       />
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaCheckDouble,
  FaBan,
  FaFileInvoice,
  FaExclamationTriangle,
  FaSave,
  FaTimes,
  FaCreditCard,
  FaMobileAlt,
  FaCity,
  FaMapPin,
  FaHome,
  FaChevronDown,
  FaEnvelope,
  FaPhone,
  FaTruck,
  FaInfoCircle,
  FaPhoneAlt,
  FaUserCircle,
  FaHeadset,
  FaClipboardList,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaUndo,
  FaReply,
  FaCheck,
  FaTimes as FaTimesIcon,
  FaUserCheck,
  FaUserTimes,
  FaPrint,
  FaPalette
} from 'react-icons/fa';
import { MdOutlinePendingActions } from 'react-icons/md';

// ========== ORDER STATUSES - GREEN THEME ==========
const ORDER_STATUSES = [
  { value: 'follow_up', label: 'Follow Up', color: 'bg-[#f0f5ed] text-[#8B9D83] border-[#c5d5be]/30', icon: FaHeadset },
  { value: 'reminder', label: 'Reminder', color: 'bg-[#f0f5ed] text-[#8B9D83] border-[#c5d5be]/30', icon: FaClock },
  { value: 'accepted', label: 'Accepted', color: 'bg-[#8B9D83]/10 text-[#8B9D83] border-[#8B9D83]/20', icon: FaCheckCircle },
  { value: 'cancelled', label: 'Rejected', color: 'bg-red-50 text-red-600 border-red-200', icon: FaBan },
];

const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30' },
  { value: 'paid', label: 'Paid', color: 'bg-[#8B9D83]/10 text-[#8B9D83] border-[#8B9D83]/20' },
  { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-600 border-red-200' },
  { value: 'refunded', label: 'Refunded', color: 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30' }
];

// ========== STATUS UPDATE MODAL - GREEN THEME ==========
const StatusUpdateModal = ({ isOpen, onClose, order, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.orderStatus);
      setCancellationReason(order.cancellationReason || '');
      setStatusNote('');
    }
  }, [order]);

  const currentStatusInfo = ORDER_STATUSES.find(s => s.value === order?.orderStatus);
  
  const getAvailableNextStatuses = () => {
    if (!order) return [];
    const currentStatus = order.orderStatus;
    if (currentStatus === 'follow_up') {
      return ['accepted', 'cancelled', 'reminder'];
    }
    if (currentStatus === 'reminder') {
      return ['accepted', 'cancelled'];
    }
    return [];
  };

  const availableNextStatuses = getAvailableNextStatuses();
  const isRejecting = selectedStatus === 'cancelled';
  const canChange = availableNextStatuses.length > 0;

  const handleSubmit = async () => {
    if (!selectedStatus || selectedStatus === order.orderStatus) {
      toast.error('Please select a different status');
      return;
    }

    if (isRejecting && !cancellationReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/agent/${order._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderStatus: selectedStatus,
          cancellationReason: isRejecting ? cancellationReason : undefined,
          statusNote: statusNote.trim() || undefined
        })
      });

      const data = await response.json();
      if (data.success) {
        const statusLabel = ORDER_STATUSES.find(s => s.value === selectedStatus)?.label || selectedStatus;
        toast.success(`Order status updated to ${statusLabel}`);
        onUpdate();
        onClose();
      } else {
        toast.error(data.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Status update error:', error);
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
        className="relative bg-white rounded-2xl border border-[#8B9D83]/30 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaEdit className="w-5 h-5" />
              <h2 className="text-lg font-light" style={{ fontFamily: "'Raleway', 'Inter', sans-serif" }}>Update Order Status</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-medium text-[#263b32] mb-1">Current Status</label>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${currentStatusInfo?.color || 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30'}`}>
              {currentStatusInfo?.icon && <currentStatusInfo.icon className="w-3 h-3" />}
              <span>{currentStatusInfo?.label || order?.orderStatus}</span>
            </div>
          </div>

          {canChange ? (
            <>
              <div>
                <label className="block text-xs font-medium text-[#263b32] mb-1">Change Status To</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    if (e.target.value !== 'cancelled') {
                      setCancellationReason('');
                    }
                  }}
                  className="w-full px-3 py-1.5 text-sm border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#263b32]"
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
                <div className="bg-[#c5d5be]/20 rounded-xl p-2 border border-[#8B9D83]/30">
                  <p className="text-xs text-[#8B9D83]">
                    <span className="font-medium">Will change to:</span> {ORDER_STATUSES.find(s => s.value === selectedStatus)?.label}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#263b32] mb-1">
                  Status Note <span className="text-[#53645a] text-[10px] font-normal">(Optional)</span>
                </label>
                <textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  rows="2"
                  placeholder="Add a note about this status change..."
                  className="w-full px-3 py-1.5 text-sm border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#263b32] placeholder:text-[#53645a]"
                />
                <p className="text-xs text-[#53645a] mt-1">This note will be visible in the order history</p>
              </div>

              {isRejecting && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FaExclamationTriangle className="w-4 h-4 text-red-600" />
                    <label className="text-xs font-medium text-[#263b32]">
                      Rejection Reason <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <textarea
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    rows="3"
                    placeholder="Please provide a reason for rejection..."
                    className="w-full px-3 py-1.5 text-sm border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#263b32] placeholder:text-[#53645a]"
                    required
                  />
                  <p className="text-xs text-red-600 mt-1">This reason will be saved with the order</p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-[#c5d5be]/20 rounded-xl p-3 border border-[#8B9D83]/30">
              <p className="text-xs text-[#53645a] flex items-center gap-2">
                <FaInfoCircle className="w-4 h-4" />
                {order?.orderStatus === 'accepted' && 'This order has been accepted. No further changes allowed.'}
                {order?.orderStatus === 'cancelled' && 'This order has been rejected. No further changes allowed.'}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#8B9D83]/30 bg-[#c5d5be]/20 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#8B9D83]/30 text-[#53645a] rounded-xl hover:bg-white transition-colors text-sm">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !canChange || selectedStatus === order?.orderStatus}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
            Update Status
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== ORDER DETAILS MODAL - GREEN THEME ==========
// const OrderDetailsModal = ({ isOpen, onClose, order }) => {
//   if (!isOpen || !order) return null;

//   const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
//   const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);

//   const getColorName = (color) => {
//     const colorMap = {
//       '#000000': 'Black',
//       '#FFFFFF': 'White',
//       '#FF0000': 'Red',
//       '#00FF00': 'Green',
//       '#0000FF': 'Blue',
//       '#FFFF00': 'Yellow',
//       '#FF00FF': 'Magenta',
//       '#00FFFF': 'Cyan',
//       '#FFA500': 'Orange',
//       '#800080': 'Purple',
//       '#008000': 'Dark Green',
//       '#FFC0CB': 'Pink',
//       '#A52A2A': 'Brown',
//       '#808080': 'Gray',
//       '#C0C0C0': 'Silver',
//       '#4A90E2': 'Blue',
//       '#FF6B6B': 'Red',
//       '#4ECDC4': 'Teal',
//       '#45B7D1': 'Sky Blue',
//       '#96CEB4': 'Mint',
//       '#FFEAA7': 'Cream',
//       '#DDA0DD': 'Plum',
//       '#98D8C8': 'Seafoam',
//       '#F7DC6F': 'Gold',
//       '#BB8FCE': 'Lavender'
//     };
//     return colorMap[color] || color;
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

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         className="relative bg-white rounded-2xl border border-[#8B9D83]/30 shadow-2xl w-full max-w-3xl my-8 overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white sticky top-0 z-10">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFileInvoice className="w-5 h-5" />
//               <h2 className="text-lg font-light" style={{ fontFamily: "'Raleway', 'Inter', sans-serif" }}>Order Details</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-5 max-h-[60vh] overflow-y-auto">
//           {/* Status Badges */}
//           <div className="flex flex-wrap gap-2 mb-5">
//             <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${statusInfo?.color || 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30'}`}>
//               {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
//               Order: {statusInfo?.label || order.orderStatus}
//             </span>
//             <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${paymentInfo?.color || 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30'}`}>
//               <FaMoneyBillWave className="w-3 h-3" />
//               Payment: {paymentInfo?.label || order.paymentStatus}
//             </span>
//             <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30">
//               <FaCreditCard className="w-3 h-3" />
//               {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
//             </span>
//           </div>

//           {/* Rejection Reason if cancelled */}
//           {order.orderStatus === 'cancelled' && order.cancellationReason && (
//             <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaExclamationTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-medium text-red-700">Rejection Reason</h4>
//                   <p className="text-xs text-red-600 mt-1">{order.cancellationReason}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Customer & Delivery Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-[#c5d5be]/20 rounded-xl p-3 border border-[#8B9D83]/30">
//               <h3 className="font-medium text-[#263b32] text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-[#8B9D83]" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#53645a]">Name:</span> <span className="text-[#263b32] font-medium">{order.customerInfo?.fullName}</span></p>
//                 <p><span className="text-[#53645a]">Email:</span> <span className="text-[#263b32]">{order.customerInfo?.email}</span></p>
//                 <p><span className="text-[#53645a]">Phone:</span> <span className="text-[#263b32]">{order.customerInfo?.phone}</span></p>
//               </div>
//             </div>

//             <div className="bg-[#c5d5be]/20 rounded-xl p-3 border border-[#8B9D83]/30">
//               <h3 className="font-medium text-[#263b32] text-sm mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#8B9D83]" />
//                 Delivery Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#53645a]">Division:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.division || 'N/A'}</span></p>
//                 <p><span className="text-[#53645a]">District/City:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.city || 'N/A'}</span></p>
//                 <p><span className="text-[#53645a]">Upazila/Thana:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.zone || 'N/A'}</span></p>
//                 <p><span className="text-[#53645a]">Address:</span> <span className="text-[#263b32]">{order.customerInfo?.address}</span></p>
//               </div>
//             </div>
//           </div>

//           {/* Order Items with Colors */}
//           <div className="mb-5">
//             <h3 className="font-medium text-[#263b32] text-sm mb-2 flex items-center gap-1.5">
//               <FaBox className="w-3.5 h-3.5 text-[#8B9D83]" />
//               Order Items
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs">
//                 <thead className="bg-[#c5d5be]/20">
//                   <tr>
//                     <th className="px-2 py-1.5 text-left text-[#263b32]">Product</th>
//                     <th className="px-2 py-1.5 text-center text-[#263b32]">Color</th>
//                     <th className="px-2 py-1.5 text-center text-[#263b32]">Qty</th>
//                     <th className="px-2 py-1.5 text-right text-[#263b32]">Price</th>
//                     <th className="px-2 py-1.5 text-right text-[#263b32]">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {groupedItems.map((group, idx) => {
//                     const hasColors = group.colors && group.colors.length > 0;
//                     const hasMultipleColors = hasColors && group.colors.length > 1;
                    
//                     return group.colors.map((colorObj, colorIdx) => {
//                       const isFirst = colorIdx === 0;
//                       const isOnly = group.colors.length === 1;
//                       const price = colorObj.price || group.discountPrice || group.regularPrice;
//                       const totalPrice = price * colorObj.quantity;
                      
//                       return (
//                         <tr key={`${idx}-${colorIdx}`} className="border-t border-[#c5d5be]/20">
//                           {isFirst && (
//                             <td className="px-2 py-2" rowSpan={hasMultipleColors ? group.colors.length : 1}>
//                               <div className="flex items-center gap-2">
//                                 <img 
//                                   src={group.image || 'https://via.placeholder.com/30'} 
//                                   alt={group.productName}
//                                   className="w-7 h-7 rounded object-cover border border-[#c5d5be]/30"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                                 />
//                                 <p className="font-medium text-xs text-[#263b32]">{group.productName}</p>
//                               </div>
//                             </td>
//                           )}
//                           <td className="px-2 py-2 text-center">
//                             {colorObj.color ? (
//                               <div className="flex items-center justify-center">
//                                 <div 
//                                   className="w-5 h-5 rounded-full border border-[#c5d5be]/30 shadow-sm"
//                                   style={{ backgroundColor: colorObj.color }}
//                                   title={colorObj.color}
//                                 />
//                               </div>
//                             ) : (
//                               <span className="text-xs text-[#53645a]">-</span>
//                             )}
//                           </td>
//                           <td className="px-2 py-2 text-center text-[#263b32]">{colorObj.quantity}</td>
//                           <td className="px-2 py-2 text-right text-[#263b32]">৳{price.toFixed(2)}</td>
//                           <td className="px-2 py-2 text-right font-medium text-[#8B9D83]">৳{totalPrice.toFixed(2)}</td>
//                         </tr>
//                       );
//                     });
//                   })}
//                 </tbody>
//                 <tfoot className="border-t border-[#c5d5be]/30">
//                   <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-[#263b32]">Subtotal:</td><td className="px-2 py-1 text-right text-[#263b32]">৳{order.subtotal?.toFixed(2)}</td></tr>
//                   <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-[#263b32]">Shipping:</td><td className="px-2 py-1 text-right text-[#263b32]">৳{order.shippingCost?.toFixed(2)}</td></tr>
//                   <tr className="text-sm font-bold">
//                     <td colSpan="4" className="px-2 py-1 text-right text-[#263b32]">Total:</td>
//                     <td className="px-2 py-1 text-right text-[#8B9D83]">৳{order.total?.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 border-t border-[#8B9D83]/30 bg-[#c5d5be]/20 flex justify-end gap-2">
//           <button onClick={onClose} className="px-3 py-1.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all text-sm">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// ========== ORDER DETAILS MODAL - WITH VARIANT SUPPORT ==========
const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
  const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);

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
        c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined'
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
    if (item.selectedColor && item.selectedColor !== 'null' && item.selectedColor !== '' && item.selectedColor !== 'undefined') {
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

      if (item.isVariant || item.isSubVariant || item.variantId || item.subVariantId ||
          (item.variantDetails && item.variantDetails.length > 0)) {
        productGroups[productId].hasVariants = true;
      }

      if (item.isSubVariant || item.subVariantId) {
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
        !item.variantId &&
        !item.subVariantId &&
        !item.isVariant &&
        !item.isSubVariant &&
        item.isBaseProduct !== false
      );

      const variantItems = group.items.filter(item =>
        (item.variantId || item.isVariant === true) &&
        !item.subVariantId &&
        !item.isSubVariant
      );

      const subVariantItems = group.items.filter(item =>
        item.subVariantId || item.isSubVariant === true
      );

      const hasNestedVariants = group.variantDetails && group.variantDetails.length > 0;

      const rows = [];
      const hasAnyVariants = variantItems.length > 0 || subVariantItems.length > 0 || hasNestedVariants;

      // ===== BASE PRODUCT ROW =====
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
          variantId: null,
          subVariantId: null,
          originalPrice: null,
          hasDiscount: false,
          variantName: null,
          subVariantName: null,
          showPrice: !hasAnyVariants
        });
      }

      // ===== VARIANT ROWS =====
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
          badge: 'Variant',
          variantId: item.variantId,
          subVariantId: null,
          variantName: item.variantName,
          subVariantName: null,
          showPrice: true
        });
      });

      // ===== SUB-VARIANT ROWS =====
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
          badge: 'Sub',
          variantId: item.variantId,
          subVariantId: item.subVariantId,
          variantName: parentVariantName,
          subVariantName: item.subVariantName,
          showPrice: true
        });
      });

      // ===== NESTED VARIANT DETAILS =====
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
              badge: 'Variant',
              variantId: variant.variantId,
              subVariantId: null,
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
              badge: 'Variant',
              variantId: variant.variantId,
              subVariantId: null,
              variantName: variant.variantName,
              subVariantName: null,
              showPrice: true
            });
          }
        });
      }

      // ===== FALLBACK =====
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

  const groupedItems = groupItemsForDisplay(order.items || []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative bg-white rounded-2xl border border-[#8B9D83]/30 shadow-2xl w-full max-w-3xl my-8 overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileInvoice className="w-5 h-5" />
              <h2 className="text-lg font-light" style={{ fontFamily: "'Raleway', 'Inter', sans-serif" }}>Order Details</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${statusInfo?.color || 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30'}`}>
              {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
              Order: {statusInfo?.label || order.orderStatus}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${paymentInfo?.color || 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30'}`}>
              <FaMoneyBillWave className="w-3 h-3" />
              Payment: {paymentInfo?.label || order.paymentStatus}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30">
              <FaCreditCard className="w-3 h-3" />
              {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
            </span>
          </div>

          {/* Rejection Reason if cancelled */}
          {order.orderStatus === 'cancelled' && order.cancellationReason && (
            <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaExclamationTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-red-700">Rejection Reason</h4>
                  <p className="text-xs text-red-600 mt-1">{order.cancellationReason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Customer & Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#c5d5be]/20 rounded-xl p-3 border border-[#8B9D83]/30">
              <h3 className="font-medium text-[#263b32] text-sm mb-2 flex items-center gap-1.5">
                <FaUser className="w-3.5 h-3.5 text-[#8B9D83]" />
                Customer Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#53645a]">Name:</span> <span className="text-[#263b32] font-medium">{order.customerInfo?.fullName}</span></p>
                <p><span className="text-[#53645a]">Email:</span> <span className="text-[#263b32]">{order.customerInfo?.email}</span></p>
                <p><span className="text-[#53645a]">Phone:</span> <span className="text-[#263b32]">{order.customerInfo?.phone}</span></p>
              </div>
            </div>

            <div className="bg-[#c5d5be]/20 rounded-xl p-3 border border-[#8B9D83]/30">
              <h3 className="font-medium text-[#263b32] text-sm mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#8B9D83]" />
                Delivery Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#53645a]">Division:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.division || 'N/A'}</span></p>
                <p><span className="text-[#53645a]">District/City:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.city || 'N/A'}</span></p>
                <p><span className="text-[#53645a]">Upazila/Thana:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.zone || 'N/A'}</span></p>
                <p><span className="text-[#53645a]">Address:</span> <span className="text-[#263b32]">{order.customerInfo?.address}</span></p>
              </div>
            </div>
          </div>

          {/* ========== ORDER ITEMS TABLE - WITH VARIANT SUPPORT ========== */}
          <div className="mb-5">
            <h3 className="font-medium text-[#263b32] text-sm mb-2 flex items-center gap-1.5">
              <FaBox className="w-3.5 h-3.5 text-[#8B9D83]" />
              Order Items
            </h3>
            <div className="overflow-x-auto rounded-xl border border-[#c5d5be]/40">
              <table className="w-full text-xs">
                <thead className="bg-[#f0f5ed] border-b border-[#c5d5be]/40">
                  <tr>
                    <th className="py-1.5 px-2 text-left text-[10px] font-semibold text-[#53645a] uppercase tracking-wider">#</th>
                    <th className="py-1.5 px-2 text-left text-[10px] font-semibold text-[#53645a] uppercase tracking-wider">Product / Variant</th>
                    {/* <th className="py-1.5 px-2 text-center text-[10px] font-semibold text-[#53645a] uppercase tracking-wider">Variant / Color</th> */}
                    <th className="py-1.5 px-2 text-center text-[10px] font-semibold text-[#53645a] uppercase tracking-wider">Qty</th>
                    <th className="py-1.5 px-2 text-right text-[10px] font-semibold text-[#53645a] uppercase tracking-wider hidden sm:table-cell">Price</th>
                    <th className="py-1.5 px-2 text-right text-[10px] font-semibold text-[#53645a] uppercase tracking-wider">Total</th>
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
                      const paddingLeft = indent === 0 ? 'pl-1' : indent === 1 ? 'pl-4' : 'pl-7';

                      const showRowNumber = row.isBase ? rowNumber : '';

                      let badgeDisplay = null;
                      if (row.badge) {
                        badgeDisplay = (
                          <span className={`text-[8px] px-1.5 py-0.5 rounded ml-1 ${
                            row.badge === 'Product' ? 'bg-[#c5d5be]/20 text-[#53645a]' :
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
                          <span className="text-[8px] text-green-600 bg-green-50 px-1 py-0.5 rounded">
                            Save {Math.round(((row.originalPrice - row.price) / row.originalPrice) * 100)}%
                          </span>
                        );
                      }

                      const showPrice = row.showPrice !== false && !row.isHeader && !(row.isBase && hasVariants);
                      const price = row.price || 0;
                      const originalPrice = row.originalPrice || null;
                      const hasDiscount = row.hasDiscount || (originalPrice && originalPrice > price);
                      const quantity = row.quantity || 0;
                      const total = row.total || (price * quantity);

                      let displayName = row.displayName || row.name || 'Product';

                      const isHeaderRow = row.isHeader === true;
                      const isBaseRow = row.isBase === true;
                      const isVariantRow = row.isVariant === true && !row.isHeader;
                      const isSubVariantRow = row.isSubVariant === true;
                      const rowImage = row.image || null;

                      return (
                        <tr
                          key={`${groupIndex}-${rowIndex}`}
                          className={`border-b border-[#c5d5be]/20 hover:bg-[#f0f5ed]/50 transition-colors ${
                            isHeaderRow ? 'bg-[#f0f5ed]/40' : ''
                          }`}
                        >
                          <td className="py-1.5 px-2 text-[10px] text-[#53645a] align-middle">
                            {showRowNumber}
                          </td>
                          <td className={`py-1.5 px-2 ${paddingLeft} align-middle`}>
                            <div className="flex items-center gap-1.5">
                              {rowImage ? (
                                <img
                                  src={rowImage}
                                  alt={displayName}
                                  className={`rounded object-cover border border-[#c5d5be]/40 flex-shrink-0 ${
                                    indent === 0 ? 'w-7 h-7' :
                                    indent === 1 ? 'w-5 h-5' : 'w-4 h-4'
                                  }`}
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/28?text=P'; }}
                                />
                              ) : (
                                indent > 0 && (
                                  <span className="text-[#53645a]/40 text-[10px] flex-shrink-0">
                                    {indent === 1 ? '▸' : '→'}
                                  </span>
                                )
                              )}
                              <div className="flex flex-wrap items-center gap-0.5">
                                <span className={`break-words ${
                                  isHeaderRow ? 'font-bold text-purple-700' :
                                  isBaseRow ? 'font-semibold text-[#263b32]' :
                                  isVariantRow ? 'font-medium text-[#263b32]' :
                                  'text-[#263b32]'
                                } ${isHeaderRow ? 'text-xs' : 'text-[10px]'}`}>
                                  {displayName}
                                </span>
                                {badgeDisplay}
                                {discountDisplay}
                              </div>
                            </div>
                          </td>
                          {/* <td className="py-1.5 px-2 text-center align-middle">
                            {row.hasColor && row.color ? (
                              <div className="flex items-center justify-center">
                                <div
                                  className="w-4 h-4 rounded-full border border-[#c5d5be]/40 shadow-sm"
                                  style={{ backgroundColor: row.color }}
                                  title={row.color}
                                />
                              </div>
                            ) : (
                              <span className="text-[10px] text-[#53645a]">-</span>
                            )}
                          </td> */}
                          <td className="py-1.5 px-2 text-center text-[10px] font-medium text-[#263b32] align-middle">
                            {isHeaderRow ? '-' : quantity}
                          </td>
                          <td className="py-1.5 px-2 text-right text-[10px] text-[#53645a] hidden sm:table-cell align-middle">
                            {isHeaderRow || !showPrice ? '-' : (
                              hasDiscount ? (
                                <>
                                  <span className="text-green-600 font-medium">৳{price.toFixed(2)}</span>
                                  <span className="text-[#53645a]/50 line-through ml-1 text-[8px]">৳{originalPrice.toFixed(2)}</span>
                                </>
                              ) : (
                                <>৳{price.toFixed(2)}</>
                              )
                            )}
                          </td>
                          <td className="py-1.5 px-2 text-right font-medium text-[10px] text-[#263b32] align-middle">
                            {isHeaderRow ? '-' : `৳${total.toFixed(2)}`}
                          </td>
                        </tr>
                      );
                    });
                  })}
                </tbody>
                <tfoot className="border-t-2 border-[#c5d5be]/40 bg-[#f0f5ed]/50">
                  <tr>
                    <td colSpan="4" className="py-1.5 px-2 text-right text-[10px] font-medium text-[#53645a]">Subtotal:</td>
                    <td className="py-1.5 px-2 text-right text-[10px] text-[#263b32]">৳{order.subtotal?.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="py-0.5 px-2 text-right text-[10px] font-medium text-[#53645a]">Shipping:</td>
                    <td className="py-0.5 px-2 text-right text-[10px] text-[#263b32]">৳{order.shippingCost?.toFixed(2)}</td>
                  </tr>
                  {order.discount > 0 && (
                    <tr className="text-green-600">
                      <td colSpan="4" className="py-0.5 px-2 text-right text-[10px] font-medium">Discount:</td>
                      <td className="py-0.5 px-2 text-right text-[10px] font-medium">- ৳{order.discount.toFixed(2)}</td>
                    </tr>
                  )}
                  <tr className="border-t border-[#c5d5be]/40">
                    <td colSpan="4" className="py-1.5 px-2 text-right text-xs font-bold text-[#263b32]">Total:</td>
                    <td className="py-1.5 px-2 text-right text-sm font-bold text-[#8B9D83]">৳{order.total?.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#8B9D83]/30 bg-[#c5d5be]/20 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all text-sm">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== MAIN AGENT ORDERS PAGE ==========
export default function AgentOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sortBy, setSortBy] = useState('-createdAt');
  const [activeStatusTab, setActiveStatusTab] = useState('all');
  const [tabCounts, setTabCounts] = useState({
    follow_up: 0,
    reminder: 0,
    accepted: 0,
    cancelled: 0
  });

  const statusTabs = [
    { value: 'all', label: 'All', count: totalOrders, color: 'bg-[#8B9D83]' },
    { value: 'follow_up', label: 'Follow Up', count: tabCounts.follow_up, color: 'bg-[#8B9D83]' },
    { value: 'reminder', label: 'Reminder', count: tabCounts.reminder, color: 'bg-[#8B9D83]' },
    { value: 'accepted', label: 'Accepted', count: tabCounts.accepted, color: 'bg-[#8B9D83]' },
    { value: 'cancelled', label: 'Rejected', count: tabCounts.cancelled, color: 'bg-red-500' }
  ];

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

      const response = await fetch(`http://localhost:5000/api/orders/agent/orders?${queryParams}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.pagination.pages);
        setTotalOrders(data.pagination.total);
        
        const counts = {
          follow_up: 0,
          reminder: 0,
          accepted: 0,
          cancelled: 0
        };
        data.data.forEach(order => {
          if (counts[order.orderStatus] !== undefined) {
            counts[order.orderStatus]++;
          }
        });
        setTabCounts(counts);
      } else {
        toast.error(data.error || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, activeStatusTab, statusFilter, sortBy, router]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusUpdate = () => {
    fetchOrders();
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

  const getStatusBadge = (status) => {
    const statusInfo = ORDER_STATUSES.find(s => s.value === status);
    if (!statusInfo) return <span className="px-1.5 py-0.5 rounded-full text-xs bg-[#c5d5be]/20 text-[#53645a] border border-[#c5d5be]/30">{status}</span>;
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
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${paymentInfo?.color || 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30'}`}>
        <FaMoneyBillWave className="w-2.5 h-2.5" />
        {paymentInfo?.label || status}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const methods = {
      'cod': { label: 'COD', color: 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30', icon: FaMoneyBillWave },
      'online': { label: 'Online', color: 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30', icon: FaCreditCard },
      'bkash': { label: 'bKash', color: 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30', icon: FaMobileAlt },
      'nagad': { label: 'Nagad', color: 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30', icon: FaMobileAlt }
    };
    
    const info = methods[method] || { label: method || 'Unknown', color: 'bg-[#c5d5be]/20 text-[#53645a] border-[#c5d5be]/30', icon: FaMoneyBillWave };
    const Icon = info.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border ${info.color}`}>
        <Icon className="w-2.5 h-2.5" />
        {info.label}
      </span>
    );
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#c5d5be]/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[#53645a] font-medium">{title}</p>
          <p className="text-xl font-light text-[#263b32]">{value?.toLocaleString() || 0}</p>
        </div>
        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const stats = {
    total: orders.length,
    followUp: orders.filter(o => o.orderStatus === 'follow_up').length,
    reminder: orders.filter(o => o.orderStatus === 'reminder').length,
    accepted: orders.filter(o => o.orderStatus === 'accepted').length,
    rejected: orders.filter(o => o.orderStatus === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-[#f8f7f2] pb-12 pt-6">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B9D83] to-[#6b7d63] rounded-xl flex items-center justify-center shadow-lg shadow-[#8B9D83]/25">
              <FaHeadset className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-light text-[#263b32]" style={{ fontFamily: "'Raleway', 'Inter', sans-serif" }}>
                Agent Orders
              </h1>
              <p className="text-sm text-[#53645a] mt-0.5">Manage and track customer orders</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <StatCard title="Total Orders" value={stats.total} icon={<FaBox className="w-5 h-5 text-[#8B9D83]" />} color="bg-[#c5d5be]/20" />
          <StatCard title="Follow Up" value={stats.followUp} icon={<FaHeadset className="w-5 h-5 text-[#8B9D83]" />} color="bg-[#c5d5be]/20" />
          <StatCard title="Reminder" value={stats.reminder} icon={<FaClock className="w-5 h-5 text-[#8B9D83]" />} color="bg-[#c5d5be]/20" />
          <StatCard title="Accepted" value={stats.accepted} icon={<FaCheckCircle className="w-5 h-5 text-[#8B9D83]" />} color="bg-[#c5d5be]/20" />
          <StatCard title="Rejected" value={stats.rejected} icon={<FaBan className="w-5 h-5 text-red-500" />} color="bg-red-50" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#c5d5be]/30 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#53645a] w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Order ID, Customer Name, Email or Phone..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-10 py-2 border border-[#c5d5be]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-[#f0f5ed] hover:bg-white transition text-[#263b32] placeholder:text-[#53645a]"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#53645a] hover:text-[#8B9D83]"
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
              className="px-4 py-2 border border-[#c5d5be]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-[#f0f5ed] hover:bg-white transition text-[#263b32] text-sm"
            >
              <option value="">All Status</option>
              {ORDER_STATUSES.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-[#c5d5be]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-[#f0f5ed] hover:bg-white transition text-[#263b32] text-sm"
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
          <div className="flex flex-wrap gap-2 border-b border-[#c5d5be]/30 pb-2">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveStatusTab(tab.value);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  activeStatusTab === tab.value
                    ? 'bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white shadow-lg shadow-[#8B9D83]/25'
                    : 'bg-white text-[#53645a] hover:bg-[#f0f5ed] border border-[#c5d5be]/30'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${tab.color}`}></span>
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeStatusTab === tab.value
                    ? 'bg-white/20 text-white'
                    : 'bg-[#c5d5be]/20 text-[#53645a]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-[#c5d5be]/30 shadow-sm overflow-hidden">
          <div className="w-full overflow-x-visible">
            <table className="w-full min-w-[800px] lg:min-w-full">
              <thead className="bg-[#f0f5ed] border-b border-[#c5d5be]/30">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-[#53645a]">Order ID</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-[#53645a]">Customer</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-[#53645a]">Phone</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-[#53645a]">Total</th>
                  <th className="px-2 py-2 text-center text-xs font-medium text-[#53645a]">Status</th>
                  <th className="px-2 py-2 text-center text-xs font-medium text-[#53645a]">Payment</th>
                  <th className="px-2 py-2 text-center text-xs font-medium text-[#53645a]">Method</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-[#53645a]">Date</th>
                  <th className="px-2 py-2 text-center text-xs font-medium text-[#53645a]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="9" className="px-4 py-8 text-center"><div className="flex justify-center"><div className="w-6 h-6 border-3 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div></div></td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan="9" className="px-4 py-8 text-center text-[#53645a] text-sm">No orders found</td></tr>
                ) : (
                  orders.map((order) => {
                    const canUpdate = ['follow_up', 'reminder'].includes(order.orderStatus);
                    return (
                      <tr key={order._id} className="border-b border-[#c5d5be]/20 hover:bg-[#f0f5ed] transition-colors">
                        <td className="px-2 py-2 text-xs font-mono text-[#263b32]">{order.orderNumber || order._id.slice(-8).toUpperCase()}</td>
                        <td className="px-2 py-2 text-xs">
                          <div className="font-medium truncate max-w-[150px] text-[#263b32]">{order.customerInfo?.fullName}</div>
                          <div className="text-[#53645a] text-xs truncate max-w-[150px]">{order.customerInfo?.email}</div>
                        </td>
                        <td className="px-2 py-2 text-xs text-[#263b32]">{order.customerInfo?.phone}</td>
                        <td className="px-2 py-2 text-xs text-right font-bold text-[#8B9D83]">৳{order.total?.toFixed(2)}</td>
                        <td className="px-2 py-2 text-center">
                          {canUpdate ? (
                            <button 
                              onClick={() => { setSelectedOrder(order); setShowStatusModal(true); }} 
                              className="hover:opacity-80 transition-opacity cursor-pointer"
                              title="Click to update status"
                            >
                              {getStatusBadge(order.orderStatus)}
                            </button>
                          ) : (
                            <span className="cursor-default">
                              {getStatusBadge(order.orderStatus)}
                            </span>
                          )}
                        </td>
                        <td className="px-2 py-2 text-center">{getPaymentBadge(order.paymentStatus)}</td>
                        <td className="px-2 py-2 text-center">{getPaymentMethodBadge(order.paymentMethod)}</td>
                        <td className="px-2 py-2 text-xs text-[#53645a] whitespace-nowrap">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-2 py-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button 
                              onClick={() => { setSelectedOrder(order); setShowDetailsModal(true); }} 
                              className="p-1 text-[#8B9D83] hover:bg-[#f0f5ed] rounded transition-colors" 
                              title="View Details"
                            >
                              <FaEye className="w-3.5 h-3.5" />
                            </button>
                            {canUpdate && (
                              <button 
                                onClick={() => { setSelectedOrder(order); setShowStatusModal(true); }} 
                                className="p-1 text-[#263b32] hover:bg-[#f0f5ed] rounded transition-colors" 
                                title="Update Status"
                              >
                                <FaEdit className="w-3.5 h-3.5" />
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
            <div className="px-3 py-2 border-t border-[#c5d5be]/30 flex flex-wrap items-center justify-between gap-3 bg-[#f0f5ed]">
              <p className="text-xs text-[#53645a]">Showing {orders.length} of {totalOrders} orders</p>
              <div className="flex gap-1">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 border border-[#c5d5be]/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-[#263b32]">
                  <FaChevronLeft className="w-3 h-3" />
                </button>
                <span className="px-2 py-1 text-xs text-[#263b32]">Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 border border-[#c5d5be]/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-[#263b32]">
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <StatusUpdateModal 
        isOpen={showStatusModal} 
        onClose={() => setShowStatusModal(false)} 
        order={selectedOrder} 
        onUpdate={handleStatusUpdate}
      />
      <OrderDetailsModal 
        isOpen={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)} 
        order={selectedOrder}
      />
    </div>
  );
}