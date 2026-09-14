// // components/CourierScoreLookup.jsx
// "use client";

// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FaSearch,
//   FaUser,
//   FaPhone,
//   FaTruck,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaUndo,
//   FaClock,
//   FaMoneyBillWave,
//   FaStar,
//   FaSpinner,
//   FaExclamationTriangle,
//   FaInfoCircle,
//   FaChartLine,
//   FaBox,
//   FaShippingFast,
//   FaCalendarAlt
// } from 'react-icons/fa';

// const CourierScoreLookup = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [scoreData, setScoreData] = useState(null);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');

//   const handleSearch = async (e) => {
//     e.preventDefault();
    
//     if (!phoneNumber || phoneNumber.length < 11) {
//       setError('Please enter a valid phone number');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setScoreData(null);

//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/courier-score/${phoneNumber}`
//       );
      
//       if (response.data.success) {
//         setScoreData(response.data);
//       } else {
//         setError(response.data.error || 'Failed to fetch courier score');
//       }
//     } catch (err) {
//       console.error('Courier score lookup error:', err);
//       setError(err.response?.data?.error || 'Failed to fetch courier score');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTrustLevelBadge = (level) => {
//     const config = {
//       very_high: { color: 'bg-green-500', label: 'Very High Trust' },
//       high: { color: 'bg-green-400', label: 'High Trust' },
//       medium: { color: 'bg-yellow-400', label: 'Medium Trust' },
//       low: { color: 'bg-red-400', label: 'Low Trust' }
//     };
//     const info = config[level] || config.medium;
//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${info.color}`}>
//         <FaStar className="w-3 h-3" />
//         {info.label}
//       </span>
//     );
//   };

//   const getStatusBadge = (status) => {
//     const statusMap = {
//       'delivered': { color: 'bg-green-100 text-green-700', icon: FaCheckCircle },
//       'cancelled': { color: 'bg-red-100 text-red-700', icon: FaTimesCircle },
//       'returned': { color: 'bg-orange-100 text-orange-700', icon: FaUndo },
//       'processing': { color: 'bg-blue-100 text-blue-700', icon: FaClock },
//       'pending': { color: 'bg-yellow-100 text-yellow-700', icon: FaClock },
//       'in_transit': { color: 'bg-purple-100 text-purple-700', icon: FaShippingFast },
//       'shipped': { color: 'bg-cyan-100 text-cyan-700', icon: FaShippingFast },
//       'out_for_delivery': { color: 'bg-indigo-100 text-indigo-700', icon: FaTruck }
//     };
//     const info = statusMap[status] || { color: 'bg-gray-100 text-gray-700', icon: FaInfoCircle };
//     const Icon = info.icon;
//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${info.color}`}>
//         <Icon className="w-3 h-3" />
//         {status.replace('_', ' ').toUpperCase()}
//       </span>
//     );
//   };

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     return new Date(date).toLocaleDateString('en-BD', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getScoreColor = (score) => {
//     if (score >= 80) return 'text-green-600';
//     if (score >= 60) return 'text-yellow-600';
//     if (score >= 40) return 'text-orange-600';
//     return 'text-red-600';
//   };

//   return (
//     <div className="min-h-screen bg-[#E2E7EA]/20 py-8">
//       <div className="container mx-auto px-4 max-w-5xl">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-[#004767]" style={{ fontFamily: '"Playfair Display"' }}>
//             <FaTruck className="inline-block mr-2 text-[#06B6D4]" />
//             Courier Score Lookup
//           </h1>
//           <p className="text-[#64748B] mt-2">
//             Enter a phone number to view lifetime order history and courier performance
//           </p>
//         </div>

//         {/* Search Form */}
//         <div className="bg-white rounded-2xl border border-[#06B6D4]/30 p-6 shadow-sm mb-8">
//           <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
//               <input
//                 type="tel"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="Enter phone number (e.g., 017XXXXXXXX)"
//                 className="w-full pl-10 pr-4 py-3 border border-[#06B6D4]/30 rounded-xl focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-[#004767] placeholder:text-[#64748B]"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white rounded-xl hover:shadow-lg hover:shadow-[#06B6D4]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 min-w-[140px]"
//             >
//               {loading ? (
//                 <>
//                   <FaSpinner className="w-4 h-4 animate-spin" />
//                   Searching...
//                 </>
//               ) : (
//                 <>
//                   <FaSearch className="w-4 h-4" />
//                   Search
//                 </>
//               )}
//             </button>
//           </form>
          
//           {error && (
//             <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-start gap-2">
//               <FaExclamationTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
//               <span>{error}</span>
//             </div>
//           )}
//         </div>

//         {/* Results */}
//         <AnimatePresence>
//           {scoreData && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="space-y-6"
//             >
//               {/* Customer Info */}
//               <div className="bg-white rounded-2xl border border-[#06B6D4]/30 p-6 shadow-sm">
//                 <div className="flex flex-wrap items-center justify-between gap-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 bg-gradient-to-br from-[#06B6D4] to-[#004767] rounded-xl flex items-center justify-center shadow-lg shadow-[#06B6D4]/25">
//                       <FaUser className="w-7 h-7 text-white" />
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-bold text-[#004767]">
//                         {scoreData.customerInfo?.name || 'Unknown Customer'}
//                       </h2>
//                       <p className="text-sm text-[#64748B]">
//                         <FaPhone className="inline mr-1 w-3 h-3" />
//                         {scoreData.phoneNumber}
//                         {scoreData.customerInfo?.email && (
//                           <>
//                             <span className="mx-2">|</span>
//                             {scoreData.customerInfo.email}
//                           </>
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap items-center gap-3">
//                     {getTrustLevelBadge(scoreData.score?.trustLevel)}
//                     <div className="text-center">
//                       <div className={`text-2xl font-bold ${getScoreColor(scoreData.score?.value || 0)}`}>
//                         {scoreData.score?.value || 0}
//                       </div>
//                       <div className="text-xs text-[#64748B]">Score</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-4 text-xs text-[#64748B]">
//                   Last updated: {formatDate(scoreData.score?.lastUpdated)}
//                 </div>
//               </div>

//               {/* Tabs */}
//               <div className="flex flex-wrap gap-2 border-b border-[#06B6D4]/30 pb-2">
//                 <button
//                   onClick={() => setActiveTab('overview')}
//                   className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
//                     activeTab === 'overview'
//                       ? 'bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white shadow-lg shadow-[#06B6D4]/25'
//                       : 'text-[#64748B] hover:bg-[#E2E7EA]'
//                   }`}
//                 >
//                   <FaChartLine className="inline mr-2" />
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('couriers')}
//                   className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
//                     activeTab === 'couriers'
//                       ? 'bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white shadow-lg shadow-[#06B6D4]/25'
//                       : 'text-[#64748B] hover:bg-[#E2E7EA]'
//                   }`}
//                 >
//                   <FaTruck className="inline mr-2" />
//                   Courier Wise
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('history')}
//                   className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
//                     activeTab === 'history'
//                       ? 'bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white shadow-lg shadow-[#06B6D4]/25'
//                       : 'text-[#64748B] hover:bg-[#E2E7EA]'
//                   }`}
//                 >
//                   <FaClock className="inline mr-2" />
//                   Order History
//                 </button>
//               </div>

//               {/* Tab Content */}
//               <div className="bg-white rounded-2xl border border-[#06B6D4]/30 p-6 shadow-sm">
//                 {activeTab === 'overview' && (
//                   <div className="space-y-6">
//                     {/* Overall Stats */}
//                     <div>
//                       <h3 className="text-lg font-semibold text-[#004767] mb-4">Overall Statistics</h3>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div className="bg-[#E2E7EA]/30 rounded-xl p-4 text-center">
//                           <FaBox className="w-6 h-6 text-[#06B6D4] mx-auto mb-2" />
//                           <div className="text-2xl font-bold text-[#004767]">
//                             {scoreData.overallStats?.totalOrders || 0}
//                           </div>
//                           <div className="text-xs text-[#64748B]">Total Orders</div>
//                         </div>
//                         <div className="bg-[#E2E7EA]/30 rounded-xl p-4 text-center">
//                           <FaMoneyBillWave className="w-6 h-6 text-green-500 mx-auto mb-2" />
//                           <div className="text-2xl font-bold text-[#004767]">
//                             ৳{scoreData.overallStats?.totalSpent?.toFixed(2) || '0.00'}
//                           </div>
//                           <div className="text-xs text-[#64748B]">Total Spent</div>
//                         </div>
//                         <div className="bg-[#E2E7EA]/30 rounded-xl p-4 text-center">
//                           <FaCheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
//                           <div className="text-2xl font-bold text-[#004767]">
//                             {scoreData.overallStats?.successRate || 0}%
//                           </div>
//                           <div className="text-xs text-[#64748B]">Success Rate</div>
//                         </div>
//                         <div className="bg-[#E2E7EA]/30 rounded-xl p-4 text-center">
//                           <FaCalendarAlt className="w-6 h-6 text-[#06B6D4] mx-auto mb-2" />
//                           <div className="text-sm font-medium text-[#004767]">
//                             {formatDate(scoreData.overallStats?.firstOrderDate)}
//                           </div>
//                           <div className="text-xs text-[#64748B]">First Order</div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Status Breakdown */}
//                     <div>
//                       <h3 className="text-lg font-semibold text-[#004767] mb-4">Delivery Status Breakdown</h3>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
//                           <div className="text-sm text-green-600">Successful</div>
//                           <div className="text-xl font-bold text-green-700">
//                             {scoreData.overallStats?.successfulDeliveries || 0}
//                           </div>
//                         </div>
//                         <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
//                           <div className="text-sm text-red-600">Failed</div>
//                           <div className="text-xl font-bold text-red-700">
//                             {scoreData.overallStats?.failedDeliveries || 0}
//                           </div>
//                         </div>
//                         <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
//                           <div className="text-sm text-orange-600">Returned</div>
//                           <div className="text-xl font-bold text-orange-700">
//                             {scoreData.overallStats?.returnedOrders || 0}
//                           </div>
//                         </div>
//                         <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
//                           <div className="text-sm text-blue-600">Total</div>
//                           <div className="text-xl font-bold text-blue-700">
//                             {scoreData.overallStats?.totalOrders || 0}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'couriers' && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-[#004767] mb-4">Courier Wise Statistics</h3>
//                     {scoreData.courierStats?.length === 0 ? (
//                       <p className="text-sm text-[#64748B]">No courier data available</p>
//                     ) : (
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {scoreData.courierStats?.map((courier) => (
//                           <div
//                             key={courier.courierService}
//                             className="bg-[#E2E7EA]/30 rounded-xl p-4 border border-[#06B6D4]/20"
//                           >
//                             <div className="flex items-center justify-between mb-3">
//                               <h4 className="font-semibold text-[#004767] capitalize">
//                                 {courier.courierService}
//                               </h4>
//                               <span className="text-sm font-bold text-[#06B6D4]">
//                                 {courier.successRate}%
//                               </span>
//                             </div>
//                             <div className="space-y-1 text-sm">
//                               <div className="flex justify-between">
//                                 <span className="text-[#64748B]">Orders:</span>
//                                 <span className="font-medium text-[#004767]">{courier.totalOrders}</span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-[#64748B]">Successful:</span>
//                                 <span className="font-medium text-green-600">{courier.successfulDeliveries}</span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-[#64748B]">Failed:</span>
//                                 <span className="font-medium text-red-600">{courier.failedDeliveries}</span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-[#64748B]">Returned:</span>
//                                 <span className="font-medium text-orange-600">{courier.returnedOrders}</span>
//                               </div>
//                               <div className="flex justify-between border-t border-[#06B6D4]/20 pt-1 mt-1">
//                                 <span className="text-[#64748B]">Total Spent:</span>
//                                 <span className="font-medium text-[#004767]">
//                                   ৳{courier.totalSpent?.toFixed(2) || '0.00'}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === 'history' && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-[#004767] mb-4">Order History</h3>
//                     {scoreData.orderHistory?.orders?.length === 0 ? (
//                       <p className="text-sm text-[#64748B]">No order history found</p>
//                     ) : (
//                       <div className="overflow-x-auto">
//                         <table className="w-full text-sm">
//                           <thead className="bg-[#E2E7EA]">
//                             <tr>
//                               <th className="px-3 py-2 text-left text-[#004767]">Order #</th>
//                               <th className="px-3 py-2 text-left text-[#004767]">Courier</th>
//                               <th className="px-3 py-2 text-left text-[#004767]">Status</th>
//                               <th className="px-3 py-2 text-right text-[#004767]">Amount</th>
//                               <th className="px-3 py-2 text-left text-[#004767]">Date</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {scoreData.orderHistory.orders.map((order, index) => (
//                               <tr
//                                 key={order.orderId || index}
//                                 className="border-t border-[#06B6D4]/10 hover:bg-[#E2E7EA]/30 transition-colors"
//                               >
//                                 <td className="px-3 py-2 font-mono text-[#004767]">
//                                   {order.orderNumber || 'N/A'}
//                                 </td>
//                                 <td className="px-3 py-2 capitalize text-[#004767]">
//                                   {order.courierService || 'N/A'}
//                                 </td>
//                                 <td className="px-3 py-2">
//                                   {getStatusBadge(order.deliveryStatus || order.orderStatus)}
//                                 </td>
//                                 <td className="px-3 py-2 text-right font-medium text-[#06B6D4]">
//                                   ৳{order.totalAmount?.toFixed(2) || '0.00'}
//                                 </td>
//                                 <td className="px-3 py-2 text-[#64748B] text-xs">
//                                   {formatDate(order.orderDate)}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
                        
//                         {/* Pagination */}
//                         {scoreData.orderHistory.pagination && (
//                           <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
//                             <p className="text-xs text-[#64748B]">
//                               Showing {scoreData.orderHistory.orders.length} of {scoreData.orderHistory.pagination.total} orders
//                             </p>
//                             <div className="flex gap-1">
//                               <button
//                                 disabled={scoreData.orderHistory.pagination.page <= 1}
//                                 className="p-1.5 border border-[#06B6D4]/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-[#004767]"
//                               >
//                                 Previous
//                               </button>
//                               <span className="px-2 py-1 text-xs text-[#004767]">
//                                 Page {scoreData.orderHistory.pagination.page} of {scoreData.orderHistory.pagination.pages}
//                               </span>
//                               <button
//                                 disabled={scoreData.orderHistory.pagination.page >= scoreData.orderHistory.pagination.pages}
//                                 className="p-1.5 border border-[#06B6D4]/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-[#004767]"
//                               >
//                                 Next
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default CourierScoreLookup;