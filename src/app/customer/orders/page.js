
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  FaBox,
  FaEye,
  FaClock,
  FaMoneyBillWave,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPrint,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaFileInvoice,
  FaTruck,
  FaCheckDouble,
  FaCreditCard,
  FaMobileAlt,
  FaSearch,
  FaFilter,
  FaTimes,
  FaShoppingBag,
  FaArrowRight,
  FaDownload,
  FaHeart,
  FaStar,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaHome,
  FaCity,
  FaMapPin,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaExclamationTriangle,
  FaPause,
  FaUndo
} from 'react-icons/fa';
import { generateInvoicePDF } from '@/utils/invoicePDF';

// ========== ORDER STATUSES - Green Theme ==========
const ORDER_STATUSES = [
  { value: 'placed', label: 'Placed', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: FaClock },
  { value: 'follow_up', label: 'Follow Up', color: 'bg-[#f0f5ed] text-[#8B9D83] border-[#8B9D83]/30', icon: FaClock },
  { value: 'reminder', label: 'Reminder', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: FaClock },
  { value: 'accepted', label: 'Accepted', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: FaCheckCircle },
  { value: 'approved', label: 'Approved', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: FaCheckCircle },
  { value: 'hold', label: 'On Hold', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: FaPause },
  { value: 'ready_to_ship', label: 'Ready to Ship', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: FaBox },
  { value: 'courier_assigned', label: 'Courier Assigned', color: 'bg-[#c5d5be]/20 text-[#8B9D83] border-[#8B9D83]/20', icon: FaTruck },
  { value: 'processing', label: 'Processing', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FaSpinner },
  { value: 'partial_delivery', label: 'Partial Delivery', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: FaCheckDouble },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-50 text-green-700 border-green-200', icon: FaCheckDouble },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: FaBan },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200', icon: FaBan },
  { value: 'refunded', label: 'Refunded', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: FaBan },
  { value: 'returned', label: 'Returned', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: FaUndo }
];

const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { value: 'paid', label: 'Paid', color: 'bg-green-50 text-green-700 border-green-200' },
  { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-700 border-red-200' },
  { value: 'refunded', label: 'Refunded', color: 'bg-gray-50 text-gray-700 border-gray-200' }
];

// ========== DELIVERY STATUSES ==========
const DELIVERY_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-gray-100 text-gray-800' },
  { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
  { value: 'picked_up', label: 'Picked Up', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'in_transit', label: 'In Transit', color: 'bg-purple-100 text-purple-800' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-orange-100 text-orange-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  { value: 'failed', label: 'Failed', color: 'bg-red-200 text-red-900' },
  { value: 'returned', label: 'Returned', color: 'bg-gray-200 text-gray-800' }
];

// ========== CANCEL ORDER MODAL ==========
const CancelOrderModal = ({ isOpen, onClose, order, onCancel }) => {
  const [cancellationReason, setCancellationReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!cancellationReason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${order._id}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cancellationReason })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Order cancelled successfully');
        onCancel();
        onClose();
      } else {
        toast.error(data.error || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Cancel order error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-[#8B9D83]/20"
      >
        <div className="p-5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white">
          <div className="flex items-center gap-2">
            <FaBan className="w-5 h-5" />
            <h2 className="text-lg font-medium">Cancel Order</h2>
          </div>
        </div>

        <div className="p-5">
          <p className="text-[#263b32] text-sm mb-3">
            Are you sure you want to cancel this order?
          </p>
          <p className="text-xs text-[#53645a] mb-4">
            Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
          </p>
          
          <div>
            <label className="block text-xs font-medium text-[#263b32] mb-1">
              Cancellation Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              rows="3"
              placeholder="Please tell us why you're cancelling this order..."
              className="w-full px-3 py-2 text-sm border border-[#8B9D83]/20 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#263b32] placeholder:text-[#53645a]"
            />
          </div>
        </div>

        <div className="p-4 border-t border-[#8B9D83]/20 bg-[#f0f5ed] flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#8B9D83]/20 text-[#263b32] rounded-xl hover:bg-white transition-colors text-sm">
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaBan className="w-3 h-3" />}
            Confirm Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== TRACKING MODAL ==========
const TrackingModal = ({ isOpen, onClose, trackingInfo, order }) => {
  if (!isOpen) return null;

  const displayData = trackingInfo || order?.deliveryService || {};
  const statusHistory = displayData.history || displayData.deliveryStatusHistory || [];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-[#8B9D83]/20 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaTruck className="w-5 h-5" />
              <h2 className="text-lg font-medium">Tracking Information</h2>
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
          <div className="bg-[#f0f5ed] rounded-xl p-3 border border-[#c5d5be]/40">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#53645a]">Tracking Number:</span>
                <span className="font-mono text-[#263b32] font-medium">
                  {displayData?.trackingNumber || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#53645a]">Courier:</span>
                <span className="text-[#263b32] font-medium">
                  {displayData?.courierName || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#53645a]">Current Status:</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                  DELIVERY_STATUSES.find(s => s.value === displayData?.deliveryStatus)?.color || 'bg-[#c5d5be]/20'
                }`}>
                  {DELIVERY_STATUSES.find(s => s.value === displayData?.deliveryStatus)?.label || displayData?.deliveryStatus || 'N/A'}
                </span>
              </div>
              {displayData?.trackingUrl && (
                <div className="flex justify-between">
                  <span className="text-[#53645a]">Track Link:</span>
                  <a
                    href={displayData.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8B9D83] hover:underline flex items-center gap-1"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                    Track on {displayData?.courierName || 'Courier'}
                  </a>
                </div>
              )}
            </div>
          </div>

          {statusHistory && statusHistory.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-[#263b32] mb-2 flex items-center gap-2">
                <FaClock className="w-4 h-4 text-[#8B9D83]" />
                Tracking History
              </h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {statusHistory.map((entry, index) => {
                  const statusLabel = DELIVERY_STATUSES.find(s => s.value === entry.status)?.label || entry.status;
                  const isLatest = index === statusHistory.length - 1;
                  
                  return (
                    <div key={index} className={`flex items-start gap-3 text-xs border-b border-[#c5d5be]/20 pb-2 last:border-0 ${isLatest ? 'bg-[#c5d5be]/10 p-2 rounded-lg' : ''}`}>
                      <div className={`w-2 h-2 rounded-full ${isLatest ? 'bg-[#8B9D83]' : 'bg-[#8B9D83]/40'} mt-1.5 flex-shrink-0`}></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#263b32]">{statusLabel}</span>
                          {isLatest && <span className="text-[10px] text-[#8B9D83] font-medium">(Current)</span>}
                        </div>
                        {entry.message && <p className="text-[#53645a] mt-0.5">{entry.message}</p>}
                        <p className="text-[#53645a]/40 text-[10px] mt-0.5">
                          {entry.timestamp ? new Date(entry.timestamp).toLocaleString('en-BD', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'N/A'}
                        </p>
                        {entry.location && (
                          <p className="text-[#53645a]/40 text-[10px]">📍 {entry.location}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
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

        <div className="p-4 border-t border-[#8B9D83]/20 bg-[#f0f5ed] flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-colors text-sm">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== ORDER DETAILS MODAL ==========
// const OrderDetailsModal = ({ isOpen, onClose, order, onCancelOrder, onDownloadInvoice, onTrackDelivery }) => {
//   const [isClient, setIsClient] = useState(false);
//   const [downloading, setDownloading] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isOpen || !order) return null;

//   const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
//   const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
//   const isCancelled = order.orderStatus === 'cancelled';
//   const isDelivered = order.orderStatus === 'delivered';
//   const canCancel = order.orderStatus === 'placed' && order.paymentMethod === 'cod';
//   const hasDelivery = order.deliveryService?.courierOrderId;

//   const getGroupedItems = () => {
//     if (!order.items) return [];
//     const grouped = {};
//     order.items.forEach(item => {
//       const key = item.productId?.toString() || item._id?.toString() || Math.random().toString();
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
//       } 
//       else if (item.selectedColor) {
//         grouped[key].colors.push({
//           color: item.selectedColor,
//           quantity: item.quantity,
//           price: item.discountPrice || item.regularPrice
//         });
//       } 
//       else {
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

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     const d = new Date(date);
//     return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
//   };

//   const formatDateLong = (date) => {
//     if (!date) return 'N/A';
//     const d = new Date(date);
//     return d.toLocaleDateString('en-BD', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const handleDownload = async () => {
//     setDownloading(true);
//     try {
//       await onDownloadInvoice(order);
//     } finally {
//       setDownloading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden border border-[#8B9D83]/20"
//       >
//         <div className="p-5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white sticky top-0">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFileInvoice className="w-5 h-5" />
//               <h2 className="text-lg font-medium">Order Details</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimesCircle className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order Id: {order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-5 max-h-[60vh] overflow-y-auto">
//           <div className="flex flex-wrap gap-2 mb-5">
//             <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo?.color || 'bg-[#f0f5ed] text-[#263b32] border-[#c5d5be]/40'}`}>
//               {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
//               {statusInfo?.label || order.orderStatus}
//             </div>
//             <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${paymentInfo?.color || 'bg-[#f0f5ed] text-[#263b32] border-[#c5d5be]/40'}`}>
//               <FaMoneyBillWave className="w-3 h-3" />
//               {paymentInfo?.label || order.paymentStatus}
//             </div>
//             {order.paymentMethod === 'cod' && (
//               <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[#f0f5ed] text-[#8B9D83] border-[#8B9D83]/20">
//                 <FaMoneyBillWave className="w-3 h-3" />
//                 Cash on Delivery
//               </div>
//             )}
//             {order.paymentMethod === 'online' && (
//               <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[#f0f5ed] text-[#8B9D83] border-[#8B9D83]/20">
//                 <FaCreditCard className="w-3 h-3" />
//                 Online Payment
//               </div>
//             )}
//             {hasDelivery && (
//               <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[#f0f5ed] text-[#8B9D83] border-[#8B9D83]/20">
//                 <FaTruck className="w-3 h-3" />
//                 {order.deliveryService.courierName}
//               </div>
//             )}
//           </div>

//           <div className="flex flex-wrap gap-3 mb-5">
//             {canCancel && (
//               <button
//                 onClick={() => {
//                   onClose();
//                   onCancelOrder();
//                 }}
//                 className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
//               >
//                 <FaBan className="w-4 h-4" />
//                 Cancel Order
//               </button>
//             )}
//             {hasDelivery && (
//               <button
//                 onClick={() => {
//                   onClose();
//                   onTrackDelivery(order);
//                 }}
//                 className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-colors text-sm font-medium"
//               >
//                 <FaTruck className="w-4 h-4" />
//                 Track Delivery
//               </button>
//             )}
//             <button
//               onClick={handleDownload}
//               disabled={downloading}
//               className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all text-sm font-medium disabled:opacity-50"
//             >
//               {downloading ? (
//                 <>
//                   <FaSpinner className="w-4 h-4 animate-spin" />
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <FaDownload className="w-4 h-4" />
//                   Download Invoice
//                 </>
//               )}
//             </button>
//           </div>

//           {isDelivered && order.deliveredAt && isClient && (
//             <div className="mb-5 bg-green-50 border-l-4 border-green-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaCheckDouble className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-medium text-green-700">Order Delivered</h4>
//                   <p className="text-xs text-green-600 mt-1">
//                     <span className="font-medium">Delivered on:</span> {formatDateLong(order.deliveredAt)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {hasDelivery && (
//             <div className="mb-5 bg-[#f0f5ed] border border-[#8B9D83]/20 rounded-xl p-3">
//               <h4 className="text-sm font-medium text-[#263b32] flex items-center gap-2 mb-2">
//                 <FaTruck className="w-4 h-4 text-[#8B9D83]" />
//                 Delivery Information
//               </h4>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#53645a]">Courier:</span> <span className="font-medium text-[#263b32]">{order.deliveryService.courierName}</span></p>
//                 <p><span className="text-[#53645a]">Tracking Number:</span> <span className="font-mono text-[#8B9D83]">{order.deliveryService.trackingNumber}</span></p>
//                 <p><span className="text-[#53645a]">Status:</span> 
//                   <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ml-1 ${
//                     DELIVERY_STATUSES.find(s => s.value === order.deliveryService.deliveryStatus)?.color || 'bg-[#c5d5be]/20'
//                   }`}>
//                     {DELIVERY_STATUSES.find(s => s.value === order.deliveryService.deliveryStatus)?.label || order.deliveryService.deliveryStatus}
//                   </span>
//                 </p>
//                 {order.deliveryService.trackingUrl && (
//                   <p>
//                     <span className="text-[#53645a]">Track Link:</span>
//                     <a
//                       href={order.deliveryService.trackingUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#8B9D83] hover:underline ml-1"
//                     >
//                       <FaExternalLinkAlt className="inline w-3 h-3 mr-1" />
//                       Track on {order.deliveryService.courierName}
//                     </a>
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//           {isCancelled && order.cancellationReason && (
//             <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
//               <div className="flex items-start gap-2">
//                 <FaBan className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-medium text-red-700">Order Cancelled</h4>
//                   <p className="text-xs text-red-600 mt-1">
//                     <span className="font-medium">Reason:</span> {order.cancellationReason}
//                   </p>
//                   {order.cancelledAt && (
//                     <p className="text-xs text-red-500 mt-1">
//                       <span className="font-medium">Cancelled on:</span> {formatDate(order.cancelledAt)}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-[#f0f5ed] rounded-xl p-4 border border-[#c5d5be]/40">
//               <h3 className="font-medium text-[#263b32] text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-[#8B9D83]" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#53645a]">Name:</span> <span className="text-[#263b32]">{order.customerInfo?.fullName}</span></p>
//                 <p><span className="text-[#53645a]">Email:</span> <span className="text-[#263b32]">{order.customerInfo?.email}</span></p>
//                 <p><span className="text-[#53645a]">Phone:</span> <span className="text-[#263b32]">{order.customerInfo?.phone}</span></p>
//                 <p><span className="text-[#53645a]">Address:</span> <span className="text-[#263b32]">{order.customerInfo?.address}</span></p>
//               </div>
//             </div>

//             <div className="bg-[#f0f5ed] rounded-xl p-4 border border-[#c5d5be]/40">
//               <h3 className="font-medium text-[#263b32] text-sm mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#8B9D83]" />
//                 Delivery Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[#53645a]">Division:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.division || 'N/A'}</span></p>
//                 <p><span className="text-[#53645a]">District/City:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.city || 'N/A'}</span></p>
//                 <p><span className="text-[#53645a]">Upazila/Thana:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.zone || 'N/A'}</span></p>
//                 {order.customerInfo?.area && (
//                   <p><span className="text-[#53645a]">Union/Area:</span> <span className="font-medium text-[#263b32]">{order.customerInfo.area}</span></p>
//                 )}
//                 {order.trackingNumber && (
//                   <p><span className="text-[#53645a]">Tracking:</span> <span className="font-mono text-[#8B9D83]">{order.trackingNumber}</span></p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="mb-5">
//             <h3 className="font-medium text-[#263b32] text-sm mb-2 flex items-center gap-1.5">
//               <FaBox className="w-3.5 h-3.5 text-[#8B9D83]" />
//               Order Items
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs">
//                 <thead className="bg-[#f0f5ed]">
//                   <tr>
//                     <th className="px-3 py-2 text-left text-[#263b32]">Product</th>
//                     <th className="px-3 py-2 text-center text-[#263b32]">Color</th>
//                     <th className="px-3 py-2 text-center text-[#263b32]">Qty</th>
//                     <th className="px-3 py-2 text-right text-[#263b32]">Price</th>
//                     <th className="px-3 py-2 text-right text-[#263b32]">Total</th>
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
//                         <tr key={`${idx}-${colorIdx}`} className="border-t border-[#c5d5be]/20">
//                           {isFirst && (
//                             <td className="px-3 py-2" rowSpan={hasMultipleColors ? group.colors.length : 1}>
//                               <div className="flex items-center gap-3">
//                                 <img 
//                                   src={group.image || 'https://via.placeholder.com/40'} 
//                                   alt={group.productName}
//                                   className="w-10 h-10 rounded-lg object-cover border border-[#c5d5be]/40"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                                 />
//                                 <p className="font-medium text-sm text-[#263b32]">{group.productName}</p>
//                               </div>
//                             </td>
//                           )}
//                           <td className="px-3 py-2 text-center">
//                             {colorObj.color ? (
//                               <div className="flex items-center justify-center">
//                                 <div 
//                                   className="w-6 h-6 rounded-full border border-[#c5d5be]/40 shadow-sm"
//                                   style={{ backgroundColor: colorObj.color }}
//                                   title={colorObj.color}
//                                 />
//                               </div>
//                             ) : (
//                               <span className="text-xs text-[#53645a]">-</span>
//                             )}
//                           </td>
//                           <td className="px-3 py-2 text-center text-[#263b32]">{colorObj.quantity}</td>
//                           <td className="px-3 py-2 text-right text-[#263b32]">৳{price.toFixed(2)}</td>
//                           <td className="px-3 py-2 text-right font-medium text-[#263b32]">৳{totalPrice.toFixed(2)}</td>
//                         </tr>
//                       );
//                     });
//                   })}
//                 </tbody>
//                 <tfoot className="border-t border-[#c5d5be]/40">
//                   <tr>
//                     <td colSpan="4" className="px-3 py-1.5 text-right font-medium text-[#263b32]">Subtotal:</td>
//                     <td className="px-3 py-1.5 text-right text-[#263b32]">৳{order.subtotal?.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td colSpan="4" className="px-3 py-1.5 text-right font-medium text-[#263b32]">Shipping:</td>
//                     <td className="px-3 py-1.5 text-right text-[#263b32]">৳{order.shippingCost?.toFixed(2)}</td>
//                   </tr>
//                   {order.discount > 0 && (
//                     <tr>
//                       <td colSpan="4" className="px-3 py-1.5 text-right font-medium text-green-600">Discount:</td>
//                       <td className="px-3 py-1.5 text-right text-green-600">- ৳{order.discount.toFixed(2)}</td>
//                     </tr>
//                   )}
//                   <tr className="text-sm font-bold">
//                     <td colSpan="4" className="px-3 py-1.5 text-right text-[#263b32]">Total:</td>
//                     <td className="px-3 py-1.5 text-right text-[#8B9D83]">৳{order.total?.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//           {(order.couponCode || order.deliveryNote) && (
//             <div className="bg-[#f0f5ed] rounded-xl p-4 border border-[#c5d5be]/40">
//               <h3 className="font-medium text-[#263b32] text-sm mb-1.5">Additional Information</h3>
//               {order.couponCode && <p className="text-xs"><span className="text-[#53645a]">Coupon Applied:</span> <span className="text-[#8B9D83] font-medium">{order.couponCode}</span></p>}
//               {order.deliveryNote && <p className="text-xs"><span className="text-[#53645a]">Delivery Note:</span> <span className="text-[#263b32]">{order.deliveryNote}</span></p>}
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t border-[#8B9D83]/20 bg-[#f0f5ed] flex justify-end gap-2">
//           <button onClick={onClose} className="px-5 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all text-sm font-medium">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// ========== ORDER DETAILS MODAL - WITH VARIANT SUPPORT ==========
const OrderDetailsModal = ({ isOpen, onClose, order, onCancelOrder, onDownloadInvoice, onTrackDelivery }) => {
  const [isClient, setIsClient] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isOpen || !order) return null;

  const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
  const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
  const isCancelled = order.orderStatus === 'cancelled';
  const isDelivered = order.orderStatus === 'delivered';
  const canCancel = order.orderStatus === 'placed' && order.paymentMethod === 'cod';
  const hasDelivery = order.deliveryService?.courierOrderId;

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDateLong = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await onDownloadInvoice(order);
    } finally {
      setDownloading(false);
    }
  };

  const groupedItems = groupItemsForDisplay(order.items || []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden border border-[#8B9D83]/20"
      >
        <div className="p-5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileInvoice className="w-5 h-5" />
              <h2 className="text-lg font-medium">Order Details</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimesCircle className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order Id: {order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo?.color || 'bg-[#f0f5ed] text-[#263b32] border-[#c5d5be]/40'}`}>
              {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
              {statusInfo?.label || order.orderStatus}
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${paymentInfo?.color || 'bg-[#f0f5ed] text-[#263b32] border-[#c5d5be]/40'}`}>
              <FaMoneyBillWave className="w-3 h-3" />
              {paymentInfo?.label || order.paymentStatus}
            </div>
            {order.paymentMethod === 'cod' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[#f0f5ed] text-[#8B9D83] border-[#8B9D83]/20">
                <FaMoneyBillWave className="w-3 h-3" />
                Cash on Delivery
              </div>
            )}
            {order.paymentMethod === 'online' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[#f0f5ed] text-[#8B9D83] border-[#8B9D83]/20">
                <FaCreditCard className="w-3 h-3" />
                Online Payment
              </div>
            )}
            {hasDelivery && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[#f0f5ed] text-[#8B9D83] border-[#8B9D83]/20">
                <FaTruck className="w-3 h-3" />
                {order.deliveryService.courierName}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-5">
            {canCancel && (
              <button
                onClick={() => {
                  onClose();
                  onCancelOrder();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
              >
                <FaBan className="w-4 h-4" />
                Cancel Order
              </button>
            )}
            {hasDelivery && (
              <button
                onClick={() => {
                  onClose();
                  onTrackDelivery(order);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-colors text-sm font-medium"
              >
                <FaTruck className="w-4 h-4" />
                Track Delivery
              </button>
            )}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all text-sm font-medium disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FaDownload className="w-4 h-4" />
                  Download Invoice
                </>
              )}
            </button>
          </div>

          {isDelivered && order.deliveredAt && isClient && (
            <div className="mb-5 bg-green-50 border-l-4 border-green-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaCheckDouble className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-green-700">Order Delivered</h4>
                  <p className="text-xs text-green-600 mt-1">
                    <span className="font-medium">Delivered on:</span> {formatDateLong(order.deliveredAt)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {hasDelivery && (
            <div className="mb-5 bg-[#f0f5ed] border border-[#8B9D83]/20 rounded-xl p-3">
              <h4 className="text-sm font-medium text-[#263b32] flex items-center gap-2 mb-2">
                <FaTruck className="w-4 h-4 text-[#8B9D83]" />
                Delivery Information
              </h4>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#53645a]">Courier:</span> <span className="font-medium text-[#263b32]">{order.deliveryService.courierName}</span></p>
                <p><span className="text-[#53645a]">Tracking Number:</span> <span className="font-mono text-[#8B9D83]">{order.deliveryService.trackingNumber}</span></p>
                <p><span className="text-[#53645a]">Status:</span> 
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ml-1 ${
                    DELIVERY_STATUSES.find(s => s.value === order.deliveryService.deliveryStatus)?.color || 'bg-[#c5d5be]/20'
                  }`}>
                    {DELIVERY_STATUSES.find(s => s.value === order.deliveryService.deliveryStatus)?.label || order.deliveryService.deliveryStatus}
                  </span>
                </p>
                {order.deliveryService.trackingUrl && (
                  <p>
                    <span className="text-[#53645a]">Track Link:</span>
                    <a
                      href={order.deliveryService.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B9D83] hover:underline ml-1"
                    >
                      <FaExternalLinkAlt className="inline w-3 h-3 mr-1" />
                      Track on {order.deliveryService.courierName}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}

          {isCancelled && order.cancellationReason && (
            <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaBan className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-red-700">Order Cancelled</h4>
                  <p className="text-xs text-red-600 mt-1">
                    <span className="font-medium">Reason:</span> {order.cancellationReason}
                  </p>
                  {order.cancelledAt && (
                    <p className="text-xs text-red-500 mt-1">
                      <span className="font-medium">Cancelled on:</span> {formatDate(order.cancelledAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#f0f5ed] rounded-xl p-4 border border-[#c5d5be]/40">
              <h3 className="font-medium text-[#263b32] text-sm mb-2 flex items-center gap-1.5">
                <FaUser className="w-3.5 h-3.5 text-[#8B9D83]" />
                Customer Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#53645a]">Name:</span> <span className="text-[#263b32]">{order.customerInfo?.fullName}</span></p>
                <p><span className="text-[#53645a]">Email:</span> <span className="text-[#263b32]">{order.customerInfo?.email}</span></p>
                <p><span className="text-[#53645a]">Phone:</span> <span className="text-[#263b32]">{order.customerInfo?.phone}</span></p>
                <p><span className="text-[#53645a]">Address:</span> <span className="text-[#263b32]">{order.customerInfo?.address}</span></p>
              </div>
            </div>

            <div className="bg-[#f0f5ed] rounded-xl p-4 border border-[#c5d5be]/40">
              <h3 className="font-medium text-[#263b32] text-sm mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#8B9D83]" />
                Delivery Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#53645a]">Division:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.division || 'N/A'}</span></p>
                <p><span className="text-[#53645a]">District/City:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.city || 'N/A'}</span></p>
                <p><span className="text-[#53645a]">Upazila/Thana:</span> <span className="font-medium text-[#263b32]">{order.customerInfo?.zone || 'N/A'}</span></p>
                {order.customerInfo?.area && (
                  <p><span className="text-[#53645a]">Union/Area:</span> <span className="font-medium text-[#263b32]">{order.customerInfo.area}</span></p>
                )}
                {order.trackingNumber && (
                  <p><span className="text-[#53645a]">Tracking:</span> <span className="font-mono text-[#8B9D83]">{order.trackingNumber}</span></p>
                )}
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
                    <th className="py-1.5 px-2 text-left text-[10px] font-semibold text-[#53645a] uppercase tracking-wider">Product</th>
                    <th className="py-1.5 px-2 text-center text-[10px] font-semibold text-[#53645a] uppercase tracking-wider">Variant / Color</th>
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
                          <td className="py-1.5 px-2 text-center align-middle">
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
                          </td>
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
                    <td colSpan="3" className="py-1.5 px-2 text-right text-[10px] font-medium text-[#53645a]">Subtotal:</td>
                    <td className="py-1.5 px-2 text-right text-[10px] text-[#263b32]">৳{order.subtotal?.toFixed(2)}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="py-0.5 px-2 text-right text-[10px] font-medium text-[#53645a]">Shipping:</td>
                    <td className="py-0.5 px-2 text-right text-[10px] text-[#263b32]">৳{order.shippingCost?.toFixed(2)}</td>
                    <td></td>
                  </tr>
                  {order.discount > 0 && (
                    <tr className="text-green-600">
                      <td colSpan="3" className="py-0.5 px-2 text-right text-[10px] font-medium">Discount:</td>
                      <td className="py-0.5 px-2 text-right text-[10px] font-medium">- ৳{order.discount.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  )}
                  <tr className="border-t border-[#c5d5be]/40">
                    <td colSpan="3" className="py-1.5 px-2 text-right text-xs font-bold text-[#263b32]">Total:</td>
                    <td className="py-1.5 px-2 text-right text-sm font-bold text-[#8B9D83]">৳{order.total?.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {(order.couponCode || order.deliveryNote) && (
            <div className="bg-[#f0f5ed] rounded-xl p-4 border border-[#c5d5be]/40">
              <h3 className="font-medium text-[#263b32] text-sm mb-1.5">Additional Information</h3>
              {order.couponCode && <p className="text-xs"><span className="text-[#53645a]">Coupon Applied:</span> <span className="text-[#8B9D83] font-medium">{order.couponCode}</span></p>}
              {order.deliveryNote && <p className="text-xs"><span className="text-[#53645a]">Delivery Note:</span> <span className="text-[#263b32]">{order.deliveryNote}</span></p>}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#8B9D83]/20 bg-[#f0f5ed] flex justify-end gap-2">
          <button onClick={onClose} className="px-5 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all text-sm font-medium">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== MAIN CUSTOMER ORDERS PAGE ==========
export default function CustomerOrdersPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [downloadingOrders, setDownloadingOrders] = useState({});

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        limit: 10
      });
      if (searchTerm) queryParams.append('search', searchTerm);
      if (statusFilter) queryParams.append('orderStatus', statusFilter);
      if (paymentStatusFilter) queryParams.append('paymentStatus', paymentStatusFilter);
      if (paymentMethodFilter) queryParams.append('paymentMethod', paymentMethodFilter);

      const response = await fetch(`http://localhost:5000/api/orders?${queryParams}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.pagination.pages);
        setTotalOrders(data.pagination.total);
      } else {
        toast.error(data.error || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, paymentStatusFilter, paymentMethodFilter, router]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = () => {
    fetchOrders();
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

  const updateOrderDeliveryStatus = async (orderId, status, message, location) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${orderId}/delivery-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          status, 
          message: message || `Status updated to ${status}`,
          location: location || ''
        })
      });

      const data = await response.json();
      if (data.success) {
        if (data.data?.paymentStatus === 'paid') {
          toast.success('✅ Order delivered! Payment marked as Paid.');
        }
        fetchOrders();
        return data;
      } else {
        console.error('Update delivery status failed:', data.error);
        return null;
      }
    } catch (error) {
      console.error('Update delivery status error:', error);
      return null;
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
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/couriers/${order.deliveryService.courierSlug}/track/${order.deliveryService.trackingNumber}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      const data = await response.json();
      
      if (data.success) {
        const newStatus = data.data?.status || data.status || order.deliveryService.deliveryStatus;
        const statusMessage = data.data?.message || data.message || '';
        const location = data.data?.location || data.location || '';
        
        if (newStatus && newStatus !== order.deliveryService.deliveryStatus) {
          await updateOrderDeliveryStatus(order._id, newStatus, statusMessage, location);
        }
        
        setTrackingInfo({
          ...data.data,
          trackingNumber: order.deliveryService.trackingNumber,
          courierName: order.deliveryService.courierName,
          courierSlug: order.deliveryService.courierSlug,
          trackingUrl: order.deliveryService.trackingUrl,
          deliveryStatus: newStatus,
          history: data.data?.history || data.history || []
        });
        setShowTrackingModal(true);
        
      } else {
        setTrackingInfo({
          trackingNumber: order.deliveryService.trackingNumber,
          courierName: order.deliveryService.courierName,
          courierSlug: order.deliveryService.courierSlug,
          trackingUrl: order.deliveryService.trackingUrl,
          deliveryStatus: order.deliveryService.deliveryStatus,
          history: order.deliveryService.deliveryStatusHistory || [],
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
        history: order.deliveryService.deliveryStatusHistory || [],
        error: error.message
      });
      setShowTrackingModal(true);
      toast.error('Failed to get tracking details, showing basic info');
    } finally {
      setTrackingLoading(prev => ({ ...prev, [order._id]: false }));
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPaymentStatusFilter('');
    setPaymentMethodFilter('');
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatShortDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
  };

  const getStatusBadge = (status) => {
    const statusInfo = ORDER_STATUSES.find(s => s.value === status);
    if (!statusInfo) return <span className="px-2 py-0.5 rounded-full text-xs bg-[#c5d5be]/20 text-[#263b32] border border-[#c5d5be]/40">{status}</span>;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.color}`}>
        <statusInfo.icon className="w-2.5 h-2.5" />
        {statusInfo.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const paymentInfo = PAYMENT_STATUSES.find(p => p.value === status);
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${paymentInfo?.color || 'bg-[#f0f5ed] text-[#263b32] border-[#c5d5be]/40'}`}>
        <FaMoneyBillWave className="w-2.5 h-2.5" />
        {paymentInfo?.label || status}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const methods = {
      'cod': { label: 'COD', color: 'bg-[#f0f5ed] text-[#8B9D83] border-[#8B9D83]/20' },
      'online': { label: 'Online', color: 'bg-[#f0f5ed] text-[#8B9D83] border-[#8B9D83]/20' },
      'bkash': { label: 'bKash', color: 'bg-[#f0f5ed] text-[#8B9D83] border-[#8B9D83]/20' },
      'nagad': { label: 'Nagad', color: 'bg-[#f0f5ed] text-[#8B9D83] border-[#8B9D83]/20' }
    };
    
    const info = methods[method] || { label: method || 'Unknown', color: 'bg-[#c5d5be]/20 text-[#263b32] border-[#c5d5be]/40' };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${info.color}`}>
        {info.label}
      </span>
    );
  };

  const getDeliveryBadge = (order) => {
    if (!order.deliveryService?.courierOrderId) return null;
    
    const deliveryStatus = order.deliveryService.deliveryStatus;
    const statusInfo = DELIVERY_STATUSES.find(s => s.value === deliveryStatus);
    
    return (
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[10px] font-medium text-[#263b32]">
          {order.deliveryService.courierName}
        </span>
        
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] ${
          statusInfo?.color || 'bg-[#c5d5be]/20'
        }`}>
          {statusInfo?.label || deliveryStatus || 'Unknown'}
        </span>
        
        {order.deliveryService.trackingNumber && (
          <button
            onClick={() => {
              setSelectedOrder(order);
              handleTrackDelivery(order);
            }}
            className="text-[10px] text-[#8B9D83] hover:underline flex items-center gap-1 whitespace-nowrap"
            disabled={trackingLoading[order._id]}
          >
            {trackingLoading[order._id] ? (
              <FaSpinner className="w-3 h-3 animate-spin" />
            ) : (
              'Track'
            )}
          </button>
        )}
        
        {order.deliveryService.trackingUrl && (
          <a
            href={order.deliveryService.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#53645a] hover:text-[#8B9D83] flex items-center gap-1 whitespace-nowrap"
            title={`Track on ${order.deliveryService.courierName}`}
          >
            <FaExternalLinkAlt className="w-2.5 h-2.5" />
            <span>Track on {order.deliveryService.courierName}</span>
          </a>
        )}
      </div>
    );
  };

  const canCancelOrder = (order) => {
    return order.orderStatus === 'placed' && order.paymentMethod === 'cod';
  };

  return (
    <>
      <div className="min-h-screen bg-[#f8f7f2] pb-12 pt-6">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] rounded-xl flex items-center justify-center shadow-lg shadow-[#8B9D83]/25">
                  <FaShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-light text-[#263b32]">My Orders</h1>
                  <p className="text-sm text-[#53645a] mt-0.5">Track and manage all your orders</p>
                </div>
              </div>
            </div>
            <Link 
              href="/products" 
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all text-sm font-medium shadow-sm"
            >
              Continue Shopping
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl border border-[#8B9D83]/20 p-4 mb-6 shadow-sm">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B9D83]/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by Order ID..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-10 py-2 border border-[#8B9D83]/20 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-[#f0f5ed] hover:bg-white transition text-[#263b32] placeholder:text-[#53645a]"
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

              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex items-center gap-2">
                  <FaFilter className="w-4 h-4 text-[#8B9D83]/40" />
                  <span className="text-sm text-[#53645a]">Filters:</span>
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 text-sm border border-[#8B9D83]/20 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-[#f0f5ed] hover:bg-white transition text-[#263b32]"
                >
                  <option value="">All Order Status</option>
                  {ORDER_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                <select
                  value={paymentStatusFilter}
                  onChange={(e) => {
                    setPaymentStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 text-sm border border-[#8B9D83]/20 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-[#f0f5ed] hover:bg-white transition text-[#263b32]"
                >
                  <option value="">All Payment Status</option>
                  {PAYMENT_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                {(searchTerm || statusFilter || paymentStatusFilter || paymentMethodFilter) && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 text-sm text-[#8B9D83] hover:bg-[#f0f5ed] rounded-xl transition-colors flex items-center gap-1 font-medium"
                  >
                    <FaTimes className="w-3 h-3" />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-[#8B9D83]/20 shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[800px] lg:min-w-full text-sm">
                <thead className="bg-[#f0f5ed] border-b border-[#8B9D83]/20">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-[#53645a]">Order ID</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-[#53645a]">Date</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-[#53645a]">Total</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-[#53645a]">Status</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-[#53645a]">Payment</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-[#53645a]">Method</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-[#53645a]">Delivery</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-[#53645a]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center">
                        <div className="flex justify-center">
                          <div className="w-6 h-6 border-3 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-[#c5d5be]/20 flex items-center justify-center">
                            <FaBox className="w-6 h-6 text-[#8B9D83]/40" />
                          </div>
                          <p className="text-[#263b32] text-sm font-medium">No orders found</p>
                          <p className="text-xs text-[#53645a]">Start shopping to see your orders here</p>
                          <Link href="/products" className="text-[#8B9D83] hover:text-[#6b7d63] text-sm font-medium hover:underline">
                            Start Shopping →
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => {
                      const hasDelivery = order.deliveryService?.courierOrderId;
                      
                      return (
                        <tr key={order._id} className="border-b border-[#c5d5be]/20 hover:bg-[#f0f5ed] transition-colors">
                          <td className="px-3 py-2.5 text-xs font-mono font-medium text-[#263b32]">
                            {order.orderNumber || order._id.slice(-8).toUpperCase()}
                          </td>
                          <td className="px-3 py-2.5 text-xs text-[#53645a] whitespace-nowrap">
                            {isClient ? (
                              order.orderStatus === 'delivered' && order.deliveredAt ? (
                                <div className="flex flex-col gap-0.5">
                                  <div><span className="text-[#53645a] text-[10px]">Ordered:</span> {formatDate(order.createdAt)}</div>
                                  <div className="text-green-600"><span className="text-green-500 text-[10px]">Delivered:</span> {formatShortDate(order.deliveredAt)}</div>
                                </div>
                              ) : order.orderStatus === 'cancelled' && order.cancelledAt ? (
                                <div className="flex flex-col gap-0.5">
                                  <div><span className="text-[#53645a] text-[10px]">Ordered:</span> {formatDate(order.createdAt)}</div>
                                  <div className="text-red-600"><span className="text-red-500 text-[10px]">Cancelled:</span> {formatShortDate(order.cancelledAt)}</div>
                                </div>
                              ) : (
                                <div>{formatDate(order.createdAt)}</div>
                              )
                            ) : (
                              <div>Loading...</div>
                            )}
                          </td>
                          <td className="px-3 py-2.5 text-xs text-right font-bold text-[#8B9D83]">
                            ৳{order.total?.toFixed(2)}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {getStatusBadge(order.orderStatus)}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {getPaymentStatusBadge(order.paymentStatus)}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {getPaymentMethodBadge(order.paymentMethod)}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {hasDelivery ? getDeliveryBadge(order) : (
                              <span className="text-xs text-[#53645a]">N/A</span>
                            )}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowDetailsModal(true);
                                }}
                                className="inline-flex items-center gap-1 px-2 py-1 text-[#8B9D83] hover:bg-[#f0f5ed] rounded-lg transition-colors text-xs font-medium"
                                title="View Details"
                              >
                                <FaEye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDownloadInvoice(order)}
                                disabled={downloadingOrders[order._id]}
                                className="inline-flex items-center gap-1 px-2 py-1 text-[#8B9D83] hover:bg-[#f0f5ed] rounded-lg transition-colors text-xs font-medium disabled:opacity-50"
                                title="Download Invoice"
                              >
                                {downloadingOrders[order._id] ? (
                                  <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <FaDownload className="w-3.5 h-3.5" />
                                )}
                              </button>
                              {canCancelOrder(order) && (
                                <button
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setShowCancelModal(true);
                                  }}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs font-medium"
                                  title="Cancel Order"
                                >
                                  <FaBan className="w-3.5 h-3.5" />
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
              <div className="px-3 py-2 border-t border-[#8B9D83]/20 flex flex-wrap items-center justify-between gap-3 bg-[#f0f5ed]">
                <p className="text-xs text-[#53645a]">Showing {orders.length} of {totalOrders} orders</p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 border border-[#8B9D83]/20 rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition text-[#263b32]"
                  >
                    <FaChevronLeft className="w-3 h-3" />
                  </button>
                  <span className="px-3 py-1.5 text-xs font-medium text-[#263b32]">Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 border border-[#8B9D83]/20 rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition text-[#263b32]"
                  >
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Modals */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        order={selectedOrder}
        onCancelOrder={() => {
          setShowDetailsModal(false);
          setShowCancelModal(true);
        }}
        onDownloadInvoice={handleDownloadInvoice}
        onTrackDelivery={handleTrackDelivery}
      />

      <CancelOrderModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        order={selectedOrder}
        onCancel={handleCancelOrder}
      />

      <TrackingModal
        isOpen={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
        trackingInfo={trackingInfo}
        order={selectedOrder}
      />
    </>
  );
}