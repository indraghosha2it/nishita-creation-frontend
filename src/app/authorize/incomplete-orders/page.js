
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import {
//   FaShoppingCart,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaClock,
//   FaMoneyBillWave,
//   FaEye,
//   FaTrash,
//   FaSearch,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaMapMarkerAlt,
//   FaBox,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaExclamationTriangle,
//   FaFileInvoice,
//   FaDownload,
//   FaWhatsapp,
//   FaUserCircle,
//   FaInfoCircle,
//   FaStore,
//   FaBuilding,
//   FaMapPin,
//   FaCity,
//   FaHome,
//   FaTag,
//   FaPercent,
//   FaCalendarAlt,
//   FaTimes,
//   FaPalette,
//   FaCheckSquare,
//   FaSquare,
//   FaGlobe
// } from 'react-icons/fa';
// import { motion as framerMotion } from 'framer-motion';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// export default function IncompleteOrdersPage() {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [userRole, setUserRole] = useState('');

//   // ========== BULK SELECTION STATES ==========
//   const [selectedOrdersList, setSelectedOrdersList] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [showCheckboxes, setShowCheckboxes] = useState(false);
//   const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
//   const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
//   const [orderToDelete, setOrderToDelete] = useState(null);

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

//   // Check if user can delete (Super Admin or Admin only)
//   const canDelete = userRole === 'super_admin' || userRole === 'admin';

//   const fetchStats = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/incomplete-orders/admin/stats', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setStats(data.data);
//       }
//     } catch (error) {
//       console.error('Fetch stats error:', error);
//     }
//   }, [router]);

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
//         sort: '-lastInteractionAt'
//       });
      
//       if (searchTerm) queryParams.append('search', searchTerm);
//       if (statusFilter !== 'all') queryParams.append('status', statusFilter);

//       const response = await fetch(`http://localhost:5000/api/incomplete-orders/admin/all?${queryParams}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setOrders(data.data);
//         setTotalPages(data.pagination.pages);
//         setTotalOrders(data.pagination.total);
//         setSelectAll(false);
//         setSelectedOrdersList([]);
//       } else {
//         toast.error(data.error || 'Failed to fetch incomplete orders');
//       }
//     } catch (error) {
//       console.error('Fetch incomplete orders error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchTerm, statusFilter, router]);

//   useEffect(() => {
//     fetchStats();
//     fetchOrders();
//   }, [fetchStats, fetchOrders]);

//   // Handle select all
//   useEffect(() => {
//     if (selectAll) {
//       setSelectedOrdersList(orders);
//     } else {
//       setSelectedOrdersList([]);
//     }
//   }, [selectAll, orders]);

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

//   const handleBulkDelete = async () => {
//     if (selectedOrdersList.length === 0) {
//       toast.error('No orders selected');
//       return;
//     }

//     setDeleting(true);
//     let successCount = 0;
//     let failCount = 0;

//     try {
//       const token = localStorage.getItem('token');
      
//       for (const order of selectedOrdersList) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/incomplete-orders/admin/${order._id}`, {
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
      
//       fetchOrders();
//       fetchStats();
//       setSelectedOrdersList([]);
//       setSelectAll(false);
//       setShowCheckboxes(false);
//       setShowBulkDeleteModal(false);
//     } catch (error) {
//       console.error('Bulk delete error:', error);
//       toast.error('Failed to delete orders');
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleSingleDelete = async () => {
//     if (!orderToDelete) return;

//     setDeleting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/incomplete-orders/admin/${orderToDelete._id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Incomplete order deleted successfully');
//         fetchOrders();
//         fetchStats();
//         setShowDeleteConfirmModal(false);
//         setOrderToDelete(null);
//       } else {
//         toast.error(data.error || 'Failed to delete');
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//       toast.error('Network error');
//     } finally {
//       setDeleting(false);
//     }
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

//   const getStepLabel = (step) => {
//     const steps = {
//       'cart': '🛒 Cart',
//       'information': '📝 Information',
//       'shipping': '🚚 Shipping',
//       'payment': '💳 Payment',
//       'placed': '✅ Placed'
//     };
//     return steps[step] || step;
//   };

//   const getStepColor = (step) => {
//     const colors = {
//       'cart': 'bg-gray-100 text-gray-600',
//       'information': 'bg-blue-100 text-blue-600',
//       'shipping': 'bg-purple-100 text-purple-600',
//       'payment': 'bg-yellow-100 text-yellow-600',
//       'placed': 'bg-green-100 text-green-600'
//     };
//     return colors[step] || 'bg-gray-100 text-gray-600';
//   };

//   // ========== GET UNIQUE PRODUCT COUNT ==========
//   const getUniqueProductCount = (items) => {
//     if (!items || items.length === 0) return 0;
//     const uniqueProductIds = new Set();
//     items.forEach(item => {
//       uniqueProductIds.add(item.productId?.toString() || item.productId);
//     });
//     return uniqueProductIds.size;
//   };

//   const StatCard = ({ title, value, icon, color, subtitle }) => (
//     <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{title}</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">{value?.toLocaleString() || 0}</p>
//           {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
//         </div>
//         <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <ProtectedRoute pageKey="incomplete_orders">
//     <div className="min-h-screen bg-white pb-12 pt-6">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
//               <FaShoppingCart className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display"' }}>
//                 Abandoned Checkouts
//               </h1>
//               <p className="text-sm text-gray-500 mt-0.5">Track and recover incomplete orders</p>
//             </div>
//           </div>
//           {canDelete && (
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={toggleBulkDeleteMode}
//                 className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm font-medium shadow-sm ${
//                   showCheckboxes
//                     ? 'bg-red-500 text-white hover:shadow-lg hover:shadow-red-500/25'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 {showCheckboxes ? (
//                   <>
//                     <FaTimes className="w-4 h-4" />
//                     Cancel Selection
//                   </>
//                 ) : (
//                   <>
//                     <FaTrash className="w-4 h-4" />
//                     Delete Multiple
//                   </>
//                 )}
//               </button>

//               {showCheckboxes && selectedOrdersList.length > 0 && (
//                 <button
//                   onClick={() => setShowBulkDeleteModal(true)}
//                   className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all text-sm font-medium shadow-sm"
//                 >
//                   <FaTrash className="w-4 h-4" />
//                   Delete Selected ({selectedOrdersList.length})
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Stats Cards */}
//         {stats ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
//             <StatCard 
//               title="Total Abandoned" 
//               value={stats.totalIncomplete} 
//               icon={<FaShoppingCart className="w-5 h-5 text-blue-600" />} 
//               color="bg-blue-50"
//               subtitle="All time"
//             />
//             <StatCard 
//               title="Active (7 days)" 
//               value={stats.activeIncomplete} 
//               icon={<FaClock className="w-5 h-5 text-blue-600" />} 
//               color="bg-blue-50"
//               subtitle="Last 7 days"
//             />
//             <StatCard 
//               title="Today" 
//               value={stats.todayIncomplete} 
//               icon={<FaClock className="w-5 h-5 text-gray-700" />} 
//               color="bg-gray-100"
//               subtitle="New today"
//             />
//             <StatCard 
//               title="This Month" 
//               value={stats.monthIncomplete} 
//               icon={<FaCalendarAlt className="w-5 h-5 text-blue-600" />} 
//               color="bg-blue-50"
//               subtitle="This month"
//             />
//             <StatCard 
//               title="Potential Revenue" 
//               value={`৳${stats.totalRevenue?.toFixed(0) || 0}`} 
//               icon={<FaMoneyBillWave className="w-5 h-5 text-green-600" />} 
//               color="bg-green-50"
//               subtitle="Lost opportunities"
//             />
//             <StatCard 
//               title="Avg. Cart Value" 
//               value={`৳${stats.totalRevenue && stats.totalIncomplete ? (stats.totalRevenue / stats.totalIncomplete).toFixed(0) : 0}`} 
//               icon={<FaTag className="w-5 h-5 text-gray-700" />} 
//               color="bg-gray-100"
//               subtitle="Per abandoned cart"
//             />
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 animate-pulse">
//                 <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
//                 <div className="h-8 bg-gray-200 rounded w-3/4"></div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Filters */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-sm">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search by name, phone, email or product..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-50 hover:bg-white transition text-gray-900 placeholder:text-gray-400 text-sm"
//               />
//               {searchTerm && (
//                 <button
//                   onClick={() => {
//                     setSearchTerm('');
//                     setCurrentPage(1);
//                   }}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
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
//               className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-50 hover:bg-white transition text-gray-900 text-sm"
//             >
//               <option value="all">All Status</option>
//               <option value="active">Active</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//         </div>

//         {/* Orders Table */}
//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//           <div className="w-full overflow-x-visible">
//             <table className="w-full min-w-[900px] lg:min-w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   {canDelete && showCheckboxes && (
//                     <th className="px-4 py-3 text-center">
//                       <button
//                         onClick={() => setSelectAll(!selectAll)}
//                         className="text-gray-400 hover:text-blue-600 transition-colors"
//                       >
//                         {selectAll ? (
//                           <FaCheckSquare className="w-5 h-5 text-blue-600" />
//                         ) : (
//                           <FaSquare className="w-5 h-5" />
//                         )}
//                       </button>
//                     </th>
//                   )}
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
//                   <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Activity</th>
//                   <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr><td colSpan={canDelete && showCheckboxes ? 8 : 7} className="px-4 py-12 text-center">
//                     <div className="flex justify-center">
//                       <FaSpinner className="w-6 h-6 text-blue-600 animate-spin" />
//                     </div>
//                   </td></tr>
//                 ) : orders.length === 0 ? (
//                   <tr><td colSpan={canDelete && showCheckboxes ? 8 : 7} className="px-4 py-12 text-center text-gray-500">
//                     <div className="flex flex-col items-center gap-2">
//                       <FaShoppingCart className="w-12 h-12 text-gray-300" />
//                       <p className="text-sm">No incomplete orders found</p>
//                     </div>
//                   </td></tr>
//                 ) : (
//                   orders.map((order) => {
//                     const isSelected = selectedOrdersList.some(o => o._id === order._id);
//                     const uniqueItemCount = getUniqueProductCount(order.items);
                    
//                     return (
//                       <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                         {canDelete && showCheckboxes && (
//                           <td className="px-4 py-3 text-center">
//                             <button
//                               onClick={() => toggleOrderSelection(order)}
//                               className="text-gray-400 hover:text-blue-600 transition-colors"
//                             >
//                               {isSelected ? (
//                                 <FaCheckSquare className="w-5 h-5 text-blue-600" />
//                               ) : (
//                                 <FaSquare className="w-5 h-5" />
//                               )}
//                             </button>
//                           </td>
//                         )}
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-2">
//                             <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
//                               <FaUserCircle className="w-4 h-4 text-blue-600" />
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-900 text-sm">
//                                 {order.customerInfo?.fullName || 'Guest User'}
//                               </p>
//                               {order.userId && (
//                                 <span className="text-[10px] text-blue-600">Registered</span>
//                               )}
//                               {!order.userId && order.sessionId && (
//                                 <span className="text-[10px] text-gray-500">Guest</span>
//                               )}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="space-y-0.5">
//                             {order.customerInfo?.phone && (
//                               <p className="text-xs text-gray-900 flex items-center gap-1">
//                                 <FaPhone className="w-3 h-3 text-gray-400" />
//                                 {order.customerInfo.phone}
//                               </p>
//                             )}
//                             {order.customerInfo?.email && (
//                               <p className="text-xs text-gray-500 flex items-center gap-1">
//                                 <FaEnvelope className="w-3 h-3 text-gray-400" />
//                                 {order.customerInfo.email}
//                               </p>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <p className="text-sm text-gray-900">
//                             {uniqueItemCount}  product{uniqueItemCount !== 1 ? 's' : ''}
//                           </p>
//                           {order.items && order.items.length > 0 && (
//                             <p className="text-[10px] text-gray-500 truncate max-w-[150px]">
//                               {order.items.slice(0, 2).map(i => i.productName).join(', ')}
//                               {order.items.length > 2 && ` +${order.items.length - 2} more`}
//                             </p>
//                           )}
//                         </td>
//                         <td className="px-4 py-3 text-right">
//                           <p className="font-bold text-blue-600">৳{order.total?.toFixed(2) || '0.00'}</p>
//                         </td>
                      
//                         <td className="px-4 py-3">
//                           <div className="text-xs text-gray-500">
//                             <p>{formatDate(order.lastInteractionAt)}</p>
//                             <p className="text-[10px]">
//                               Started: {formatDate(order.startedAt)}
//                             </p>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-center">
//                           <div className="flex items-center justify-center gap-1">
//                             <button
//                               onClick={() => {
//                                 setSelectedOrder(order);
//                                 setShowDetailsModal(true);
//                               }}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                               title="View Details"
//                             >
//                               <FaEye className="w-4 h-4" />
//                             </button>
//                             {order.customerInfo?.phone && (
//                               <a
//                                 href={`https://wa.me/88${order.customerInfo.phone.replace(/\D/g, '')}`}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                                 title="Message on WhatsApp"
//                               >
//                                 <FaWhatsapp className="w-4 h-4" />
//                               </a>
//                             )}
//                             {canDelete && !showCheckboxes && (
//                               <button
//                                 onClick={() => {
//                                   setOrderToDelete(order);
//                                   setShowDeleteConfirmModal(true);
//                                 }}
//                                 disabled={deleting}
//                                 className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
//                                 title="Delete"
//                               >
//                                 <FaTrash className="w-4 h-4" />
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
//             <div className="px-4 py-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-gray-50">
//               <p className="text-xs text-gray-500">Showing {orders.length} of {totalOrders} incomplete orders</p>
//               <div className="flex gap-1">
//                 <button
//                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 border border-gray-200 rounded-xl hover:bg-white disabled:opacity-50 transition text-gray-700"
//                 >
//                   <FaChevronLeft className="w-3 h-3" />
//                 </button>
//                 <span className="px-3 py-1.5 text-xs text-gray-700">Page {currentPage} of {totalPages}</span>
//                 <button
//                   onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                   disabled={currentPage === totalPages}
//                   className="p-2 border border-gray-200 rounded-xl hover:bg-white disabled:opacity-50 transition text-gray-700"
//                 >
//                   <FaChevronRight className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Details Modal */}
//       {showDetailsModal && selectedOrder && (
//         <IncompleteOrderDetailsModal
//           isOpen={showDetailsModal}
//           onClose={() => {
//             setShowDetailsModal(false);
//             setSelectedOrder(null);
//           }}
//           order={selectedOrder}
//           formatDate={formatDate}
//           canDelete={canDelete}
//           onDelete={() => {
//             setOrderToDelete(selectedOrder);
//             setShowDeleteConfirmModal(true);
//             setShowDetailsModal(false);
//           }}
//           deleting={deleting}
//         />
//       )}

//       {/* Bulk Delete Modal */}
//       {showBulkDeleteModal && (
//         <BulkDeleteModal
//           isOpen={showBulkDeleteModal}
//           onClose={() => setShowBulkDeleteModal(false)}
//           selectedOrders={selectedOrdersList}
//           onDelete={handleBulkDelete}
//           deleting={deleting}
//         />
//       )}

//       {/* Delete Confirm Modal */}
//       {showDeleteConfirmModal && orderToDelete && (
//         <DeleteConfirmModal
//           isOpen={showDeleteConfirmModal}
//           onClose={() => {
//             setShowDeleteConfirmModal(false);
//             setOrderToDelete(null);
//           }}
//           order={orderToDelete}
//           onDelete={handleSingleDelete}
//           deleting={deleting}
//         />
//       )}
//     </div>
//     </ProtectedRoute>
//   );
// }

// // ========== DELETE CONFIRM MODAL ==========
// function DeleteConfirmModal({ isOpen, onClose, order, onDelete, deleting }) {
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
//               Delete Incomplete Order
//             </h2>
//           </div>
//         </div>

//         <div className="p-6 text-center">
//           <p className="text-gray-900 text-sm mb-2">
//             Are you sure you want to delete this incomplete order?
//           </p>
//           <div className="bg-gray-50 rounded-lg p-3 mb-3">
//             <p className="text-sm font-medium text-gray-900">
//               {order.customerInfo?.fullName || 'Guest User'}
//             </p>
//             <p className="text-xs text-gray-500">
//               Total: ৳{order.total?.toFixed(2) || '0.00'} • {order.items?.length || 0} items
//             </p>
//           </div>
//           <p className="text-xs text-red-500">⚠️ This action cannot be undone!</p>
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-white transition-colors text-sm font-medium"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onDelete}
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
//                 Delete Order
//               </>
//             )}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // ========== BULK DELETE MODAL ==========
// function BulkDeleteModal({ isOpen, onClose, selectedOrders, onDelete, deleting }) {
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
//               Delete Multiple Orders
//             </h2>
//           </div>
//         </div>

//         <div className="p-6 text-center">
//           <p className="text-gray-900 text-sm mb-2">
//             Are you sure you want to delete <span className="font-bold text-red-600">{selectedOrders?.length || 0}</span> incomplete order(s)?
//           </p>
//           <p className="text-xs text-gray-500 mb-3">This action cannot be undone!</p>
//           <div className="bg-gray-50 rounded-lg p-3 max-h-[150px] overflow-y-auto">
//             {selectedOrders?.map((order, index) => (
//               <p key={order._id} className="text-xs text-gray-700 py-1 border-b border-gray-200 last:border-0">
//                 {order.customerInfo?.fullName || 'Guest'} - ৳{order.total?.toFixed(2) || '0.00'}
//               </p>
//             ))}
//           </div>
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-white transition-colors text-sm font-medium">
//             Cancel
//           </button>
//           <button onClick={onDelete} disabled={deleting} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium">
//             {deleting ? (
//               <>
//                 <FaSpinner className="w-4 h-4 animate-spin" />
//                 Deleting...
//               </>
//             ) : (
//               <>
//                 <FaTrash className="w-4 h-4" />
//                 Delete All
//               </>
//             )}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // ========== INCOMPLETE ORDER DETAILS MODAL ==========
// function IncompleteOrderDetailsModal({ isOpen, onClose, order, formatDate, canDelete, onDelete, deleting }) {
//   const getStepLabel = (step) => {
//     const steps = {
//       'cart': '🛒 Cart',
//       'information': '📝 Information',
//       'shipping': '🚚 Shipping',
//       'payment': '💳 Payment',
//       'placed': '✅ Placed'
//     };
//     return steps[step] || step;
//   };

//   const getStepColor = (step) => {
//     const colors = {
//       'cart': 'bg-gray-100 text-gray-600 border-gray-200',
//       'information': 'bg-blue-50 text-blue-600 border-blue-200',
//       'shipping': 'bg-purple-50 text-purple-600 border-purple-200',
//       'payment': 'bg-yellow-50 text-yellow-600 border-yellow-200',
//       'placed': 'bg-green-50 text-green-600 border-green-200'
//     };
//     return colors[step] || 'bg-gray-100 text-gray-600 border-gray-200';
//   };

//   // ========== GROUP ITEMS BY PRODUCT (same as OrderDetailsModal) ==========
//   const getGroupedItems = () => {
//     if (!order.items || order.items.length === 0) return [];
    
//     const grouped = {};
//     order.items.forEach(item => {
//       const key = item.productId?.toString() || item.productId;
//       if (!grouped[key]) {
//         grouped[key] = {
//           ...item,
//           colors: []
//         };
//       }
//       // Check if item has colors array or individual color
//       if (item.colors && item.colors.length > 0) {
//         item.colors.forEach(colorObj => {
//           grouped[key].colors.push({
//             color: colorObj.color,
//             quantity: colorObj.quantity,
//             price: colorObj.price || item.discountPrice || item.regularPrice
//           });
//         });
//       } else if (item.selectedColor && item.selectedColor !== 'null') {
//         grouped[key].colors.push({
//           color: item.selectedColor,
//           quantity: item.quantity,
//           price: item.discountPrice || item.regularPrice
//         });
//       } else {
//         // No color - add null color
//         grouped[key].colors.push({
//           color: null,
//           quantity: item.quantity,
//           price: item.discountPrice || item.regularPrice
//         });
//       }
//     });
//     return Object.values(grouped);
//   };

//   if (!isOpen || !order) return null;

//   const groupedItems = getGroupedItems();

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
//       >
//         <div className="p-5 bg-black text-white sticky top-0 z-10">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFileInvoice className="w-5 h-5" />
//               <h2 className="text-xl font-bold" style={{ fontFamily: '"Playfair Display"' }}>
//                 Abandoned Checkout Details
//               </h2>
//             </div>
//             <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">
//             Started {formatDate(order.startedAt)} • Last active {formatDate(order.lastInteractionAt)}
//           </p>
//         </div>

//         <div className="p-6 max-h-[60vh] overflow-y-auto">
//           <div className="flex flex-wrap gap-2 mb-5">
//             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border bg-gray-50 text-gray-700 border-gray-200">
//               <FaShoppingCart className="w-3 h-3" />
//               <span className="font-medium">Step: {getStepLabel(order.checkoutStep)}</span>
//             </span>
//             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border bg-gray-50 text-gray-700 border-gray-200">
//               <FaMoneyBillWave className="w-3 h-3" />
//               <span className="font-medium">Total: ৳{order.total?.toFixed(2) || '0.00'}</span>
//             </span>
//           </div>

//           {/* Customer & Delivery Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//               <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-blue-600" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-gray-500">Name:</span> <span className="text-gray-900 font-medium">{order.customerInfo?.fullName || 'N/A'}</span></p>
//                 <p><span className="text-gray-500">Email:</span> <span className="text-gray-700">{order.customerInfo?.email || 'N/A'}</span></p>
//                 <p><span className="text-gray-500">Phone:</span> <span className="text-gray-700">{order.customerInfo?.phone || 'N/A'}</span></p>
//                 <p><span className="text-gray-500">User Type:</span> 
//                   <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${order.userId ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
//                     {order.userId ? 'Registered' : 'Guest'}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//               <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="w-3.5 h-3.5 text-blue-600" />
//                 Delivery Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-gray-500">Division:</span> <span className="font-medium text-gray-900">{order.customerInfo?.division || 'N/A'}</span></p>
//                 <p><span className="text-gray-500">District/City:</span> <span className="font-medium text-gray-900">{order.customerInfo?.city || 'N/A'}</span></p>
//                 <p><span className="text-gray-500">Upazila/Thana:</span> <span className="font-medium text-gray-900">{order.customerInfo?.zone || 'N/A'}</span></p>
//                 {order.customerInfo?.area && (
//                   <p><span className="text-gray-500">Union/Area:</span> <span className="font-medium text-gray-900">{order.customerInfo.area}</span></p>
//                 )}
//                 <p><span className="text-gray-500">Address:</span> <span className="text-gray-700">{order.customerInfo?.address}</span></p>
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 p-3 bg-gray-50 rounded-lg border border-gray-200">
//             <div>
//               <p className="text-[10px] text-gray-500 uppercase tracking-wider">Subtotal</p>
//               <p className="text-sm font-bold text-gray-900">৳{order.subtotal?.toFixed(2) || '0.00'}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-gray-500 uppercase tracking-wider">Shipping</p>
//               <p className="text-sm font-bold text-gray-900">৳{order.shippingCost?.toFixed(2) || '0.00'}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-gray-500 uppercase tracking-wider">Total</p>
//               <p className="text-sm font-bold text-blue-600">৳{order.total?.toFixed(2) || '0.00'}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-gray-500 uppercase tracking-wider">Checkout Step</p>
//               <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${getStepColor(order.checkoutStep)}`}>
//                 {getStepLabel(order.checkoutStep)}
//               </span>
//             </div>
//           </div>

//           {/* Items Table - Same style as OrderDetailsModal */}
//           {groupedItems.length > 0 && (
//             <div className="mb-5">
//               <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//                 <FaBox className="w-3.5 h-3.5 text-blue-600" />
//                 Cart Items ({groupedItems.length} unique products)
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-xs">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-2 py-1.5 text-left text-gray-700">Product</th>
//                       <th className="px-2 py-1.5 text-center text-gray-700">Color</th>
//                       <th className="px-2 py-1.5 text-center text-gray-700">Qty</th>
//                       <th className="px-2 py-1.5 text-right text-gray-700">Price</th>
//                       <th className="px-2 py-1.5 text-right text-gray-700">Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {groupedItems.map((group, idx) => {
//                       const hasMultipleColors = group.colors && group.colors.length > 1;
                      
//                       return group.colors.map((colorObj, colorIdx) => {
//                         const isFirst = colorIdx === 0;
//                         const price = colorObj.price || group.discountPrice || group.regularPrice;
//                         const totalPrice = price * colorObj.quantity;
                        
//                         return (
//                           <tr key={`${idx}-${colorIdx}`} className="border-t border-gray-200">
//                             {isFirst && (
//                               <td className="px-2 py-2" rowSpan={hasMultipleColors ? group.colors.length : 1}>
//                                 <div className="flex items-center gap-2">
//                                   <img 
//                                     src={group.image || 'https://via.placeholder.com/30'} 
//                                     alt={group.productName}
//                                     className="w-7 h-7 rounded object-cover border border-gray-200"
//                                     onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                                   />
//                                   <p className="font-medium text-xs text-gray-900">{group.productName}</p>
//                                 </div>
//                               </td>
//                             )}
//                             <td className="px-2 py-2 text-center">
//                               {colorObj.color ? (
//                                 <div className="flex items-center justify-center">
//                                   <div 
//                                     className="w-5 h-5 rounded-full border border-gray-200 shadow-sm"
//                                     style={{ backgroundColor: colorObj.color }}
//                                     title={colorObj.color}
//                                   />
//                                 </div>
//                               ) : (
//                                 <span className="text-xs text-gray-500">-</span>
//                               )}
//                             </td>
//                             <td className="px-2 py-2 text-center text-gray-700">{colorObj.quantity}</td>
//                             <td className="px-2 py-2 text-right text-gray-700">৳{price.toFixed(2)}</td>
//                             <td className="px-2 py-2 text-right font-medium text-blue-600">৳{totalPrice.toFixed(2)}</td>
//                           </tr>
//                         );
//                       });
//                     })}
//                   </tbody>
//                   <tfoot className="border-t border-gray-300">
//                     <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-gray-700">Subtotal:</td><td className="px-2 py-1 text-right text-gray-700">৳{order.subtotal?.toFixed(2)}</td></tr>
//                     <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-gray-700">Shipping:</td><td className="px-2 py-1 text-right text-gray-700">৳{order.shippingCost?.toFixed(2)}</td></tr>
//                     <tr className="text-sm font-bold">
//                       <td colSpan="4" className="px-2 py-1 text-right text-gray-700">Total:</td>
//                       <td className="px-2 py-1 text-right text-blue-600">৳{order.total?.toFixed(2)}</td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Recovery Actions */}
//           <div className="mt-4 pt-4 border-t border-gray-200">
//             <h3 className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1.5">
//               <FaInfoCircle className="w-3.5 h-3.5 text-blue-600" />
//               Recovery Actions
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {order.customerInfo?.phone && (
//                 <a
//                   href={`https://wa.me/88${order.customerInfo.phone.replace(/\D/g, '')}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
//                 >
//                   <FaWhatsapp className="w-3.5 h-3.5" />
//                   WhatsApp
//                 </a>
//               )}
//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(JSON.stringify(order, null, 2));
//                   toast.success('Order data copied to clipboard');
//                 }}
//                 className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium"
//               >
//                 <FaFileInvoice className="w-3.5 h-3.5" />
//                 Copy Data
//               </button>
//               {canDelete && onDelete && (
//                 <button
//                   onClick={onDelete}
//                   disabled={deleting}
//                   className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-medium disabled:opacity-50"
//                 >
//                   <FaTrash className="w-3.5 h-3.5" />
//                   Delete Order
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-medium shadow-md hover:shadow-lg">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  FaShoppingCart,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMoneyBillWave,
  FaEye,
  FaTrash,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaMapMarkerAlt,
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaFileInvoice,
  FaDownload,
  FaWhatsapp,
  FaUserCircle,
  FaInfoCircle,
  FaStore,
  FaBuilding,
  FaMapPin,
  FaCity,
  FaHome,
  FaTag,
  FaPercent,
  FaCalendarAlt,
  FaTimes,
  FaPalette,
  FaCheckSquare,
  FaSquare,
  FaGlobe
} from 'react-icons/fa';
import { motion as framerMotion } from 'framer-motion';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function IncompleteOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [userRole, setUserRole] = useState('');

  // ========== BULK SELECTION STATES ==========
  const [selectedOrdersList, setSelectedOrdersList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

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

  // Check if user can delete (Super Admin or Admin only)
  const canDelete = userRole === 'super_admin' || userRole === 'admin';

  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/incomplete-orders/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  }, [router]);

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
        sort: '-lastInteractionAt'
      });
      
      if (searchTerm) queryParams.append('search', searchTerm);
      if (statusFilter !== 'all') queryParams.append('status', statusFilter);

      const response = await fetch(`http://localhost:5000/api/incomplete-orders/admin/all?${queryParams}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.pagination.pages);
        setTotalOrders(data.pagination.total);
        setSelectAll(false);
        setSelectedOrdersList([]);
      } else {
        toast.error(data.error || 'Failed to fetch incomplete orders');
      }
    } catch (error) {
      console.error('Fetch incomplete orders error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, router]);

  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, [fetchStats, fetchOrders]);

  // Handle select all
  useEffect(() => {
    if (selectAll) {
      setSelectedOrdersList(orders);
    } else {
      setSelectedOrdersList([]);
    }
  }, [selectAll, orders]);

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

  const handleBulkDelete = async () => {
    if (selectedOrdersList.length === 0) {
      toast.error('No orders selected');
      return;
    }

    setDeleting(true);
    let successCount = 0;
    let failCount = 0;

    try {
      const token = localStorage.getItem('token');
      
      for (const order of selectedOrdersList) {
        try {
          const response = await fetch(`http://localhost:5000/api/incomplete-orders/admin/${order._id}`, {
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
      
      fetchOrders();
      fetchStats();
      setSelectedOrdersList([]);
      setSelectAll(false);
      setShowCheckboxes(false);
      setShowBulkDeleteModal(false);
    } catch (error) {
      console.error('Bulk delete error:', error);
      toast.error('Failed to delete orders');
    } finally {
      setDeleting(false);
    }
  };

  const handleSingleDelete = async () => {
    if (!orderToDelete) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/incomplete-orders/admin/${orderToDelete._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Incomplete order deleted successfully');
        fetchOrders();
        fetchStats();
        setShowDeleteConfirmModal(false);
        setOrderToDelete(null);
      } else {
        toast.error(data.error || 'Failed to delete');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Network error');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStepLabel = (step) => {
    const steps = {
      'cart': '🛒 Cart',
      'information': '📝 Information',
      'shipping': '🚚 Shipping',
      'payment': '💳 Payment',
      'placed': '✅ Placed'
    };
    return steps[step] || step;
  };

  const getStepColor = (step) => {
    const colors = {
      'cart': 'bg-gray-100 text-gray-600',
      'information': 'bg-blue-100 text-blue-600',
      'shipping': 'bg-purple-100 text-purple-600',
      'payment': 'bg-yellow-100 text-yellow-600',
      'placed': 'bg-green-100 text-green-600'
    };
    return colors[step] || 'bg-gray-100 text-gray-600';
  };

  // ========== GET UNIQUE PRODUCT COUNT ==========
  const getUniqueProductCount = (items) => {
    if (!items || items.length === 0) return 0;
    const uniqueProductIds = new Set();
    items.forEach(item => {
      uniqueProductIds.add(item.productId?.toString() || item.productId);
    });
    return uniqueProductIds.size;
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#708268]/40">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[[#8e9c87]]/60 font-medium uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-[#2D1B2E] mt-1">{value?.toLocaleString() || 0}</p>
          {subtitle && <p className="text-xs text-[[#8e9c87]]/60 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <ProtectedRoute pageKey="incomplete_orders">
    <div className="min-h-screen bg-white pb-12 pt-6">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-r from-[#85977D] to-[#718369] rounded-xl flex items-center justify-center shadow-lg shadow-[[#8e9c87]]/25">
              <FaShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#2D1B2E]" style={{ fontFamily: '"Playfair Display"' }}>
                Abandoned Checkouts
              </h1>
              <p className="text-sm text-[[#8e9c87]]/60 mt-0.5">Track and recover incomplete orders</p>
            </div>
          </div>
          {canDelete && (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleBulkDeleteMode}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm font-medium shadow-sm ${
                  showCheckboxes
                    ? 'bg-red-500 text-white hover:shadow-lg hover:shadow-red-500/25'
                    : 'bg-[#708268]/30 text-[#2D1B2E] hover:bg-[#708268]/50'
                }`}
              >
                {showCheckboxes ? (
                  <>
                    <FaTimes className="w-4 h-4" />
                    Cancel Selection
                  </>
                ) : (
                  <>
                    <FaTrash className="w-4 h-4" />
                    Delete Multiple
                  </>
                )}
              </button>

              {showCheckboxes && selectedOrdersList.length > 0 && (
                <button
                  onClick={() => setShowBulkDeleteModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all text-sm font-medium shadow-sm"
                >
                  <FaTrash className="w-4 h-4" />
                  Delete Selected ({selectedOrdersList.length})
                </button>
              )}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        {stats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            <StatCard 
              title="Total Abandoned" 
              value={stats.totalIncomplete} 
              icon={<FaShoppingCart className="w-5 h-5 text-[[#8e9c87]]" />} 
              color="bg-[#e6ede1]"
              subtitle="All time"
            />
            <StatCard 
              title="Active (7 days)" 
              value={stats.activeIncomplete} 
              icon={<FaClock className="w-5 h-5 text-[[#8e9c87]]" />} 
              color="bg-[#e6ede1]"
              subtitle="Last 7 days"
            />
            <StatCard 
              title="Today" 
              value={stats.todayIncomplete} 
              icon={<FaClock className="w-5 h-5 text-[#2D1B2E]/60" />} 
              color="bg-[#708268]/10"
              subtitle="New today"
            />
            <StatCard 
              title="This Month" 
              value={stats.monthIncomplete} 
              icon={<FaCalendarAlt className="w-5 h-5 text-[[#8e9c87]]" />} 
              color="bg-[#e6ede1]"
              subtitle="This month"
            />
            <StatCard 
              title="Potential Revenue" 
              value={`৳${stats.totalRevenue?.toFixed(0) || 0}`} 
              icon={<FaMoneyBillWave className="w-5 h-5 text-green-600" />} 
              color="bg-green-50"
              subtitle="Lost opportunities"
            />
            <StatCard 
              title="Avg. Cart Value" 
              value={`৳${stats.totalRevenue && stats.totalIncomplete ? (stats.totalRevenue / stats.totalIncomplete).toFixed(0) : 0}`} 
              icon={<FaTag className="w-5 h-5 text-[#2D1B2E]/60" />} 
              color="bg-[#708268]/10"
              subtitle="Per abandoned cart"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-[#708268]/40 animate-pulse">
                <div className="h-4 bg-[#708268]/30 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-[#708268]/30 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#708268]/40 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8e9c87]/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, phone, email or product..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-10 py-2.5 border border-[#708268]/50 rounded-xl focus:ring-2 focus:ring-[[#8e9c87]] focus:border-transparent bg-[#e6ede1] hover:bg-white transition text-[#2D1B2E] placeholder:text-[[#8e9c87]]/40 text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[[#8e9c87]]/40 hover:text-[[#8e9c87]]"
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
              className="px-4 py-2.5 border border-[#708268]/50 rounded-xl focus:ring-2 focus:ring-[[#8e9c87]] focus:border-transparent bg-[#e6ede1] hover:bg-white transition text-[#2D1B2E] text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-[#708268]/40 shadow-sm overflow-hidden">
          <div className="w-full overflow-x-visible">
            <table className="w-full min-w-[900px] lg:min-w-full">
              <thead className="bg-[#e6ede1] border-b border-[#708268]/40">
                <tr>
                  {canDelete && showCheckboxes && (
                    <th className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectAll(!selectAll)}
                        className="text-[[#8e9c87]]/40 hover:text-[[#8e9c87]] transition-colors"
                      >
                        {selectAll ? (
                          <FaCheckSquare className="w-5 h-5 text-[[#8e9c87]]" />
                        ) : (
                          <FaSquare className="w-5 h-5" />
                        )}
                      </button>
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">Items</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">Last Activity</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={canDelete && showCheckboxes ? 8 : 7} className="px-4 py-12 text-center">
                    <div className="flex justify-center">
                      <FaSpinner className="w-6 h-6 text-[[#8e9c87]] animate-spin" />
                    </div>
                  </td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan={canDelete && showCheckboxes ? 8 : 7} className="px-4 py-12 text-center text-[[#8e9c87]]/60">
                    <div className="flex flex-col items-center gap-2">
                      <FaShoppingCart className="w-12 h-12 text-[[#8e9c87]]/30" />
                      <p className="text-sm">No incomplete orders found</p>
                    </div>
                  </td></tr>
                ) : (
                  orders.map((order) => {
                    const isSelected = selectedOrdersList.some(o => o._id === order._id);
                    const uniqueItemCount = getUniqueProductCount(order.items);
                    
                    return (
                      <tr key={order._id} className="border-b border-[#708268]/20 hover:bg-[#e6ede1] transition-colors">
                        {canDelete && showCheckboxes && (
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => toggleOrderSelection(order)}
                              className="text-[[#8e9c87]]/40 hover:text-[[#8e9c87]] transition-colors"
                            >
                              {isSelected ? (
                                <FaCheckSquare className="w-5 h-5 text-[[#8e9c87]]" />
                              ) : (
                                <FaSquare className="w-5 h-5" />
                              )}
                            </button>
                          </td>
                        )}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#e6ede1] rounded-full flex items-center justify-center flex-shrink-0">
                              <FaUserCircle className="w-4 h-4 text-[[#8e9c87]]" />
                            </div>
                            <div>
                              <p className="font-medium text-[#2D1B2E] text-sm">
                                {order.customerInfo?.fullName || 'Guest User'}
                              </p>
                              {order.userId && (
                                <span className="text-[10px] text-[[#8e9c87]]">Registered</span>
                              )}
                              {!order.userId && order.sessionId && (
                                <span className="text-[10px] text-[[#8e9c87]]/60">Guest</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-0.5">
                            {order.customerInfo?.phone && (
                              <p className="text-xs text-[#2D1B2E] flex items-center gap-1">
                                <FaPhone className="w-3 h-3 text-[[#8e9c87]]/40" />
                                {order.customerInfo.phone}
                              </p>
                            )}
                            {order.customerInfo?.email && (
                              <p className="text-xs text-[[#8e9c87]]/60 flex items-center gap-1">
                                <FaEnvelope className="w-3 h-3 text-[[#8e9c87]]/40" />
                                {order.customerInfo.email}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-[#2D1B2E]">
                            {uniqueItemCount}  product{uniqueItemCount !== 1 ? 's' : ''}
                          </p>
                          {order.items && order.items.length > 0 && (
                            <p className="text-[10px] text-[[#8e9c87]]/60 truncate max-w-[150px]">
                              {order.items.slice(0, 2).map(i => i.productName).join(', ')}
                              {order.items.length > 2 && ` +${order.items.length - 2} more`}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <p className="font-bold text-[[#8e9c87]]">৳{order.total?.toFixed(2) || '0.00'}</p>
                        </td>
                      
                        <td className="px-4 py-3">
                          <div className="text-xs text-[[#8e9c87]]/60">
                            <p>{formatDate(order.lastInteractionAt)}</p>
                            <p className="text-[10px]">
                              Started: {formatDate(order.startedAt)}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowDetailsModal(true);
                              }}
                              className="p-2 text-[[#8e9c87]] hover:bg-[#e6ede1] rounded-lg transition-colors"
                              title="View Details"
                            >
                              <FaEye className="w-4 h-4" />
                            </button>
                            {order.customerInfo?.phone && (
                              <a
                                href={`https://wa.me/88${order.customerInfo.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Message on WhatsApp"
                              >
                                <FaWhatsapp className="w-4 h-4" />
                              </a>
                            )}
                            {canDelete && !showCheckboxes && (
                              <button
                                onClick={() => {
                                  setOrderToDelete(order);
                                  setShowDeleteConfirmModal(true);
                                }}
                                disabled={deleting}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Delete"
                              >
                                <FaTrash className="w-4 h-4" />
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
            <div className="px-4 py-3 border-t border-[#708268]/40 flex flex-wrap items-center justify-between gap-3 bg-[#e6ede1]">
              <p className="text-xs text-[[#8e9c87]]/60">Showing {orders.length} of {totalOrders} incomplete orders</p>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-[#708268]/50 rounded-xl hover:bg-white disabled:opacity-50 transition text-[#2D1B2E]"
                >
                  <FaChevronLeft className="w-3 h-3" />
                </button>
                <span className="px-3 py-1.5 text-xs text-[#2D1B2E]">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-[#708268]/50 rounded-xl hover:bg-white disabled:opacity-50 transition text-[#2D1B2E]"
                >
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedOrder && (
        <IncompleteOrderDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
          formatDate={formatDate}
          canDelete={canDelete}
          onDelete={() => {
            setOrderToDelete(selectedOrder);
            setShowDeleteConfirmModal(true);
            setShowDetailsModal(false);
          }}
          deleting={deleting}
        />
      )}

      {/* Bulk Delete Modal */}
      {showBulkDeleteModal && (
        <BulkDeleteModal
          isOpen={showBulkDeleteModal}
          onClose={() => setShowBulkDeleteModal(false)}
          selectedOrders={selectedOrdersList}
          onDelete={handleBulkDelete}
          deleting={deleting}
        />
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirmModal && orderToDelete && (
        <DeleteConfirmModal
          isOpen={showDeleteConfirmModal}
          onClose={() => {
            setShowDeleteConfirmModal(false);
            setOrderToDelete(null);
          }}
          order={orderToDelete}
          onDelete={handleSingleDelete}
          deleting={deleting}
        />
      )}
    </div>
    </ProtectedRoute>
  );
}

// ========== DELETE CONFIRM MODAL ==========
function DeleteConfirmModal({ isOpen, onClose, order, onDelete, deleting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-[#708268]/40 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-5 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="w-5 h-5" />
            <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
              Delete Incomplete Order
            </h2>
          </div>
        </div>

        <div className="p-6 text-center">
          <p className="text-[#2D1B2E] text-sm mb-2">
            Are you sure you want to delete this incomplete order?
          </p>
          <div className="bg-[#e6ede1] rounded-lg p-3 mb-3">
            <p className="text-sm font-medium text-[#2D1B2E]">
              {order.customerInfo?.fullName || 'Guest User'}
            </p>
            <p className="text-xs text-[[#8e9c87]]/60">
              Total: ৳{order.total?.toFixed(2) || '0.00'} • {order.items?.length || 0} items
            </p>
          </div>
          <p className="text-xs text-red-500">⚠️ This action cannot be undone!</p>
        </div>

        <div className="p-4 border-t border-[#708268]/40 bg-[#e6ede1] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-[#708268]/50 text-[#2D1B2E] rounded-xl hover:bg-white transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
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
                Delete Order
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ========== BULK DELETE MODAL ==========
function BulkDeleteModal({ isOpen, onClose, selectedOrders, onDelete, deleting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-[#708268]/40 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-5 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="w-5 h-5" />
            <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
              Delete Multiple Orders
            </h2>
          </div>
        </div>

        <div className="p-6 text-center">
          <p className="text-[#2D1B2E] text-sm mb-2">
            Are you sure you want to delete <span className="font-bold text-red-600">{selectedOrders?.length || 0}</span> incomplete order(s)?
          </p>
          <p className="text-xs text-[[#8e9c87]]/60 mb-3">This action cannot be undone!</p>
          <div className="bg-[#e6ede1] rounded-lg p-3 max-h-[150px] overflow-y-auto">
            {selectedOrders?.map((order, index) => (
              <p key={order._id} className="text-xs text-[#2D1B2E] py-1 border-b border-[#708268]/20 last:border-0">
                {order.customerInfo?.fullName || 'Guest'} - ৳{order.total?.toFixed(2) || '0.00'}
              </p>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-[#708268]/40 bg-[#e6ede1] flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-[#708268]/50 text-[#2D1B2E] rounded-xl hover:bg-white transition-colors text-sm font-medium">
            Cancel
          </button>
          <button onClick={onDelete} disabled={deleting} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium">
            {deleting ? (
              <>
                <FaSpinner className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <FaTrash className="w-4 h-4" />
                Delete All
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ========== INCOMPLETE ORDER DETAILS MODAL ==========
// function IncompleteOrderDetailsModal({ isOpen, onClose, order, formatDate, canDelete, onDelete, deleting }) {
//   const getStepLabel = (step) => {
//     const steps = {
//       'cart': '🛒 Cart',
//       'information': '📝 Information',
//       'shipping': '🚚 Shipping',
//       'payment': '💳 Payment',
//       'placed': '✅ Placed'
//     };
//     return steps[step] || step;
//   };

//   const getStepColor = (step) => {
//     const colors = {
//       'cart': 'bg-gray-100 text-gray-600 border-gray-200',
//       'information': 'bg-blue-50 text-blue-600 border-blue-200',
//       'shipping': 'bg-purple-50 text-purple-600 border-purple-200',
//       'payment': 'bg-yellow-50 text-yellow-600 border-yellow-200',
//       'placed': 'bg-green-50 text-green-600 border-green-200'
//     };
//     return colors[step] || 'bg-gray-100 text-gray-600 border-gray-200';
//   };

//   // ========== GROUP ITEMS BY PRODUCT (same as OrderDetailsModal) ==========
//   const getGroupedItems = () => {
//     if (!order.items || order.items.length === 0) return [];
    
//     const grouped = {};
//     order.items.forEach(item => {
//       const key = item.productId?.toString() || item.productId;
//       if (!grouped[key]) {
//         grouped[key] = {
//           ...item,
//           colors: []
//         };
//       }
//       // Check if item has colors array or individual color
//       if (item.colors && item.colors.length > 0) {
//         item.colors.forEach(colorObj => {
//           grouped[key].colors.push({
//             color: colorObj.color,
//             quantity: colorObj.quantity,
//             price: colorObj.price || item.discountPrice || item.regularPrice
//           });
//         });
//       } else if (item.selectedColor && item.selectedColor !== 'null') {
//         grouped[key].colors.push({
//           color: item.selectedColor,
//           quantity: item.quantity,
//           price: item.discountPrice || item.regularPrice
//         });
//       } else {
//         // No color - add null color
//         grouped[key].colors.push({
//           color: null,
//           quantity: item.quantity,
//           price: item.discountPrice || item.regularPrice
//         });
//       }
//     });
//     return Object.values(grouped);
//   };

//   if (!isOpen || !order) return null;

//   const groupedItems = getGroupedItems();

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-[#708268]/40 shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
//       >
//         <div className="p-5 bg-gradient-to-r from-[[#8e9c87]] to-[#FF6B9D] text-white sticky top-0 z-10">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFileInvoice className="w-5 h-5" />
//               <h2 className="text-xl font-bold" style={{ fontFamily: '"Playfair Display"' }}>
//                 Abandoned Checkout Details
//               </h2>
//             </div>
//             <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">
//             Started {formatDate(order.startedAt)} • Last active {formatDate(order.lastInteractionAt)}
//           </p>
//         </div>

//         <div className="p-6 max-h-[60vh] overflow-y-auto">
//           <div className="flex flex-wrap gap-2 mb-5">
//             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border bg-[#e6ede1] text-[#2D1B2E] border-[#708268]/40">
//               <FaShoppingCart className="w-3 h-3 text-[[#8e9c87]]" />
//               <span className="font-medium">Step: {getStepLabel(order.checkoutStep)}</span>
//             </span>
//             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border bg-[#e6ede1] text-[#2D1B2E] border-[#708268]/40">
//               <FaMoneyBillWave className="w-3 h-3 text-[[#8e9c87]]" />
//               <span className="font-medium">Total: ৳{order.total?.toFixed(2) || '0.00'}</span>
//             </span>
//           </div>

//           {/* Customer & Delivery Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-[#e6ede1] rounded-xl p-4 border border-[#708268]/40">
//               <h3 className="font-semibold text-[#2D1B2E] text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-[[#8e9c87]]" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[[#8e9c87]]/60">Name:</span> <span className="text-[#2D1B2E] font-medium">{order.customerInfo?.fullName || 'N/A'}</span></p>
//                 <p><span className="text-[[#8e9c87]]/60">Email:</span> <span className="text-[#2D1B2E]">{order.customerInfo?.email || 'N/A'}</span></p>
//                 <p><span className="text-[[#8e9c87]]/60">Phone:</span> <span className="text-[#2D1B2E]">{order.customerInfo?.phone || 'N/A'}</span></p>
//                 <p><span className="text-[[#8e9c87]]/60">User Type:</span> 
//                   <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${order.userId ? 'bg-[#e6ede1] text-[[#8e9c87]]' : 'bg-[#708268]/20 text-[[#8e9c87]]/60'}`}>
//                     {order.userId ? 'Registered' : 'Guest'}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <div className="bg-[#e6ede1] rounded-xl p-4 border border-[#708268]/40">
//               <h3 className="font-semibold text-[#2D1B2E] text-sm mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="w-3.5 h-3.5 text-[[#8e9c87]]" />
//                 Delivery Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-[[#8e9c87]]/60">Division:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo?.division || 'N/A'}</span></p>
//                 <p><span className="text-[[#8e9c87]]/60">District/City:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo?.city || 'N/A'}</span></p>
//                 <p><span className="text-[[#8e9c87]]/60">Upazila/Thana:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo?.zone || 'N/A'}</span></p>
//                 {order.customerInfo?.area && (
//                   <p><span className="text-[[#8e9c87]]/60">Union/Area:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo.area}</span></p>
//                 )}
//                 <p><span className="text-[[#8e9c87]]/60">Address:</span> <span className="text-[#2D1B2E]">{order.customerInfo?.address}</span></p>
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 p-3 bg-[#e6ede1] rounded-lg border border-[#708268]/40">
//             <div>
//               <p className="text-[10px] text-[[#8e9c87]]/60 uppercase tracking-wider">Subtotal</p>
//               <p className="text-sm font-bold text-[#2D1B2E]">৳{order.subtotal?.toFixed(2) || '0.00'}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-[[#8e9c87]]/60 uppercase tracking-wider">Shipping</p>
//               <p className="text-sm font-bold text-[#2D1B2E]">৳{order.shippingCost?.toFixed(2) || '0.00'}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-[[#8e9c87]]/60 uppercase tracking-wider">Total</p>
//               <p className="text-sm font-bold text-[[#8e9c87]]">৳{order.total?.toFixed(2) || '0.00'}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-[[#8e9c87]]/60 uppercase tracking-wider">Checkout Step</p>
//               <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${getStepColor(order.checkoutStep)}`}>
//                 {getStepLabel(order.checkoutStep)}
//               </span>
//             </div>
//           </div>

//           {/* Items Table */}
//           {groupedItems.length > 0 && (
//             <div className="mb-5">
//               <h3 className="font-semibold text-[#2D1B2E] text-sm mb-2 flex items-center gap-1.5">
//                 <FaBox className="w-3.5 h-3.5 text-[[#8e9c87]]" />
//                 Cart Items ({groupedItems.length} unique products)
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-xs">
//                   <thead className="bg-[#708268]/20">
//                     <tr>
//                       <th className="px-2 py-1.5 text-left text-[#2D1B2E]">Product</th>
//                       <th className="px-2 py-1.5 text-center text-[#2D1B2E]">Color</th>
//                       <th className="px-2 py-1.5 text-center text-[#2D1B2E]">Qty</th>
//                       <th className="px-2 py-1.5 text-right text-[#2D1B2E]">Price</th>
//                       <th className="px-2 py-1.5 text-right text-[#2D1B2E]">Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {groupedItems.map((group, idx) => {
//                       const hasMultipleColors = group.colors && group.colors.length > 1;
                      
//                       return group.colors.map((colorObj, colorIdx) => {
//                         const isFirst = colorIdx === 0;
//                         const price = colorObj.price || group.discountPrice || group.regularPrice;
//                         const totalPrice = price * colorObj.quantity;
                        
//                         return (
//                           <tr key={`${idx}-${colorIdx}`} className="border-t border-[#708268]/20">
//                             {isFirst && (
//                               <td className="px-2 py-2" rowSpan={hasMultipleColors ? group.colors.length : 1}>
//                                 <div className="flex items-center gap-2">
//                                   <img 
//                                     src={group.image || 'https://via.placeholder.com/30'} 
//                                     alt={group.productName}
//                                     className="w-7 h-7 rounded object-cover border border-[#708268]/40"
//                                     onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                                   />
//                                   <p className="font-medium text-xs text-[#2D1B2E]">{group.productName}</p>
//                                 </div>
//                               </td>
//                             )}
//                             <td className="px-2 py-2 text-center">
//                               {colorObj.color ? (
//                                 <div className="flex items-center justify-center">
//                                   <div 
//                                     className="w-5 h-5 rounded-full border border-[#708268]/40 shadow-sm"
//                                     style={{ backgroundColor: colorObj.color }}
//                                     title={colorObj.color}
//                                   />
//                                 </div>
//                               ) : (
//                                 <span className="text-xs text-[[#8e9c87]]/60">-</span>
//                               )}
//                             </td>
//                             <td className="px-2 py-2 text-center text-[#2D1B2E]">{colorObj.quantity}</td>
//                             <td className="px-2 py-2 text-right text-[#2D1B2E]">৳{price.toFixed(2)}</td>
//                             <td className="px-2 py-2 text-right font-medium text-[[#8e9c87]]">৳{totalPrice.toFixed(2)}</td>
//                           </tr>
//                         );
//                       });
//                     })}
//                   </tbody>
//                   <tfoot className="border-t border-[#708268]/40">
//                     <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-[#2D1B2E]">Subtotal:</td><td className="px-2 py-1 text-right text-[#2D1B2E]">৳{order.subtotal?.toFixed(2)}</td></tr>
//                     <tr><td colSpan="4" className="px-2 py-1 text-right font-medium text-[#2D1B2E]">Shipping:</td><td className="px-2 py-1 text-right text-[#2D1B2E]">৳{order.shippingCost?.toFixed(2)}</td></tr>
//                     <tr className="text-sm font-bold">
//                       <td colSpan="4" className="px-2 py-1 text-right text-[#2D1B2E]">Total:</td>
//                       <td className="px-2 py-1 text-right text-[[#8e9c87]]">৳{order.total?.toFixed(2)}</td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Recovery Actions */}
//           <div className="mt-4 pt-4 border-t border-[#708268]/40">
//             <h3 className="text-xs font-medium text-[#2D1B2E] mb-2 flex items-center gap-1.5">
//               <FaInfoCircle className="w-3.5 h-3.5 text-[[#8e9c87]]" />
//               Recovery Actions
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {order.customerInfo?.phone && (
//                 <a
//                   href={`https://wa.me/88${order.customerInfo.phone.replace(/\D/g, '')}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
//                 >
//                   <FaWhatsapp className="w-3.5 h-3.5" />
//                   WhatsApp
//                 </a>
//               )}
//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(JSON.stringify(order, null, 2));
//                   toast.success('Order data copied to clipboard');
//                 }}
//                 className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#708268]/50 text-[#2D1B2E] rounded-lg hover:bg-[#e6ede1] transition-colors text-xs font-medium"
//               >
//                 <FaFileInvoice className="w-3.5 h-3.5" />
//                 Copy Data
//               </button>
//               {canDelete && onDelete && (
//                 <button
//                   onClick={onDelete}
//                   disabled={deleting}
//                   className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-medium disabled:opacity-50"
//                 >
//                   <FaTrash className="w-3.5 h-3.5" />
//                   Delete Order
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="p-4 border-t border-[#708268]/40 bg-[#e6ede1] flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gradient-to-r from-[[#8e9c87]] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[[#8e9c87]]/25 transition-all text-sm font-medium shadow-md">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// ========== INCOMPLETE ORDER DETAILS MODAL ==========
function IncompleteOrderDetailsModal({ isOpen, onClose, order, formatDate, canDelete, onDelete, deleting }) {
  const getStepLabel = (step) => {
    const steps = {
      'cart': '🛒 Cart',
      'information': '📝 Information',
      'shipping': '🚚 Shipping',
      'payment': '💳 Payment',
      'placed': '✅ Placed'
    };
    return steps[step] || step;
  };

  const getStepColor = (step) => {
    const colors = {
      'cart': 'bg-gray-100 text-gray-600 border-gray-200',
      'information': 'bg-blue-50 text-blue-600 border-blue-200',
      'shipping': 'bg-purple-50 text-purple-600 border-purple-200',
      'payment': 'bg-yellow-50 text-yellow-600 border-yellow-200',
      'placed': 'bg-green-50 text-green-600 border-green-200'
    };
    return colors[step] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  // ========== HELPER: Get color name ==========
  const getColorName = (color) => {
    const colorMap = {
      '#000000': 'Black', '#FFFFFF': 'White', '#FF0000': 'Red',
      '#00FF00': 'Green', '#0000FF': 'Blue', '#FFFF00': 'Yellow',
      '#FF00FF': 'Magenta', '#00FFFF': 'Cyan', '#FFA500': 'Orange',
      '#800080': 'Purple', '#008000': 'Dark Green', '#FFC0CB': 'Pink',
      '#A52A2A': 'Brown', '#808080': 'Gray', '#C0C0C0': 'Silver',
      '#4A90E2': 'Blue', '#FF6B6B': 'Red', '#4ECDC4': 'Teal',
      '#45B7D1': 'Sky Blue', '#96CEB4': 'Mint', '#FFEAA7': 'Cream',
      '#DDA0DD': 'Plum', '#98D8C8': 'Seafoam', '#F7DC6F': 'Gold',
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
    const productId = (item.productId?._id || item.productId || item._id || 'unknown').toString();

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

    if (item.isVariant || item.isSubVariant || item.variantId || item.subVariantId) {
      productGroups[productId].hasVariants = true;
    }
    if (item.isSubVariant || item.subVariantId) {
      productGroups[productId].hasSubVariants = true;
    }
  });

  const result = [];

  Object.values(productGroups).forEach(group => {
    const baseItems = group.items.filter(item =>
      !item.variantId &&
      !item.subVariantId &&
      !item.isVariant &&
      !item.isSubVariant
    );

    const variantItems = group.items.filter(item =>
      (item.variantId || item.isVariant === true) &&
      !item.subVariantId &&
      !item.isSubVariant
    );

    const subVariantItems = group.items.filter(item =>
      item.subVariantId || item.isSubVariant === true
    );

    const rows = [];
    const hasAnyVariants = variantItems.length > 0 || subVariantItems.length > 0;

    // ==================== BASE PRODUCT ROW ====================
    if (baseItems.length > 0 || hasAnyVariants) {
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

      // Aggregate totals from variants AND sub-variants
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
        showPrice: !hasAnyVariants
      });
    }

    // ==================== GROUP ALL CHILD ITEMS BY VARIANT ID ====================
    // Every variantId becomes one "variant group" that may contain:
    //   - a direct variant row (variantItems)
    //   - sub-variant rows (subVariantItems)
    const variantGroups = {};

    // Add direct variant rows
    variantItems.forEach(v => {
      const vid = v.variantId || 'unknown-variant';
      if (!variantGroups[vid]) {
        variantGroups[vid] = {
          variantId: vid,
          variantName: v.variantName || 'Variant',
          directVariant: null,
          subVariants: []
        };
      }
      variantGroups[vid].directVariant = v;
      if (v.variantName) variantGroups[vid].variantName = v.variantName;
    });

    // Add sub-variant rows (they carry their own variantName)
    subVariantItems.forEach(s => {
      const vid = s.variantId || 'unknown-variant';
      if (!variantGroups[vid]) {
        variantGroups[vid] = {
          variantId: vid,
          variantName: s.variantName || 'Variant',
          directVariant: null,
          subVariants: []
        };
      }
      variantGroups[vid].subVariants.push(s);
      // Prefer the sub-variant's variantName if the group doesn't have one yet
      if (!variantGroups[vid].directVariant && s.variantName) {
        variantGroups[vid].variantName = s.variantName;
      }
    });

    // ==================== EMIT ROWS FOR EACH VARIANT GROUP ====================
    Object.values(variantGroups).forEach(vg => {
      const hasDirectVariant = !!vg.directVariant;

      if (hasDirectVariant) {
        // ---------- VARIANT WITH OWN QTY/PRICE ----------
        const item = vg.directVariant;
        const colorData = getColorDisplay(item);
        const hasColor = colorData.length > 0;
        const price = item.variantDiscountPrice > 0 ? item.variantDiscountPrice :
                     item.variantRegularPrice > 0 ? item.variantRegularPrice :
                     item.discountPrice || item.regularPrice || 0;
        const quantity = item.quantity || 0;
        const total = price * quantity;
        const originalPrice =
          item.variantRegularPrice > 0 &&
          item.variantDiscountPrice > 0 &&
          item.variantRegularPrice > item.variantDiscountPrice
            ? item.variantRegularPrice : null;
        const hasDiscount = originalPrice && originalPrice > price;

        rows.push({
          type: 'variant',
          id: vg.variantId,
          name: vg.variantName,
          displayName: vg.variantName,
          image: item.variantImage || item.image || group.image,
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
          showPrice: true
        });
      } else if (vg.subVariants.length > 0) {
        // ---------- VARIANT WITH ONLY SUB-VARIANTS (header row) ----------
        const firstSub = vg.subVariants[0];
        const colorData = getColorDisplay(firstSub);
        const hasColor = colorData.length > 0;

        rows.push({
          type: 'variant',
          id: vg.variantId,
          name: vg.variantName,
          displayName: vg.variantName,
          image: firstSub.variantImage || firstSub.image || group.image,
          price: 0,
          originalPrice: null,
          hasDiscount: false,
          quantity: 0,
          total: 0,
          unit: group.unit || 'pcs',
          color: hasColor ? colorData[0].color : null,
          hasColor: hasColor,
          isBase: false,
          isVariant: true,
          isSubVariant: false,
          indent: 1,
          badge: 'Variant',
          isHeader: true,      // ✅ renders as plain header row
          showPrice: false
        });
      }

      // ---------- SUB-VARIANT ROWS (always indent 2, always follow their variant) ----------
      vg.subVariants.forEach(s => {
        const colorData = getColorDisplay(s);
        const hasColor = colorData.length > 0;
        const price = s.variantDiscountPrice > 0 ? s.variantDiscountPrice :
                     s.variantRegularPrice > 0 ? s.variantRegularPrice :
                     s.discountPrice || s.regularPrice || 0;
        const quantity = s.quantity || 0;
        const total = price * quantity;
        const originalPrice =
          s.variantRegularPrice > 0 &&
          s.variantDiscountPrice > 0 &&
          s.variantRegularPrice > s.variantDiscountPrice
            ? s.variantRegularPrice : null;
        const hasDiscount = originalPrice && originalPrice > price;

        rows.push({
          type: 'subVariant',
          id: s.subVariantId || `sub-${rows.length}`,
          name: s.subVariantName || 'Sub-Variant',
          displayName: s.subVariantName || 'Sub-Variant',
          image: s.variantImage || s.image || group.image,
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
          showPrice: true
        });
      });
    });

    // ==================== FALLBACK ====================
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
        showPrice: true
      });
    }

    result.push({
      productId: group.productId,
      productName: group.productName,
      image: group.image,
      hasVariants: group.hasVariants,
      hasSubVariants: group.hasSubVariants,
      rows: rows
    });
  });

  return result;
};

  if (!isOpen || !order) return null;

  const groupedItems = groupItemsForDisplay(order.items || []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-[#708268]/40 shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
      >
        <div className="p-5 bg-[#73856B] text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileInvoice className="w-5 h-5" />
              <h2 className="text-xl font-bold" style={{ fontFamily: '"Playfair Display"' }}>
                Abandoned Checkout Details
              </h2>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">
            Started {formatDate(order.startedAt)} • Last active {formatDate(order.lastInteractionAt)}
          </p>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border bg-[#e6ede1] text-[#2D1B2E] border-[#708268]/40">
              <FaShoppingCart className="w-3 h-3 text-[[#8e9c87]]" />
              <span className="font-medium">Step: {getStepLabel(order.checkoutStep)}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border bg-[#e6ede1] text-[#2D1B2E] border-[#708268]/40">
              <FaMoneyBillWave className="w-3 h-3 text-[[#8e9c87]]" />
              <span className="font-medium">Total: ৳{order.total?.toFixed(2) || '0.00'}</span>
            </span>
          </div>

          {/* Customer & Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#e6ede1] rounded-xl p-4 border border-[#708268]/40">
              <h3 className="font-semibold text-[#2D1B2E] text-sm mb-2 flex items-center gap-1.5">
                <FaUser className="w-3.5 h-3.5 text-[[#8e9c87]]" />
                Customer Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[[#8e9c87]]/60">Name:</span> <span className="text-[#2D1B2E] font-medium">{order.customerInfo?.fullName || 'N/A'}</span></p>
                <p><span className="text-[[#8e9c87]]/60">Email:</span> <span className="text-[#2D1B2E]">{order.customerInfo?.email || 'N/A'}</span></p>
                <p><span className="text-[[#8e9c87]]/60">Phone:</span> <span className="text-[#2D1B2E]">{order.customerInfo?.phone || 'N/A'}</span></p>
                <p><span className="text-[[#8e9c87]]/60">User Type:</span>
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${order.userId ? 'bg-[#e6ede1] text-[[#8e9c87]]' : 'bg-[#708268]/20 text-[[#8e9c87]]/60'}`}>
                    {order.userId ? 'Registered' : 'Guest'}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-[#e6ede1] rounded-xl p-4 border border-[#708268]/40">
              <h3 className="font-semibold text-[#2D1B2E] text-sm mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-[[#8e9c87]]" />
                Delivery Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[[#8e9c87]]/60">Division:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo?.division || 'N/A'}</span></p>
                <p><span className="text-[[#8e9c87]]/60">District/City:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo?.city || 'N/A'}</span></p>
                <p><span className="text-[[#8e9c87]]/60">Upazila/Thana:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo?.zone || 'N/A'}</span></p>
                {order.customerInfo?.area && (
                  <p><span className="text-[[#8e9c87]]/60">Union/Area:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo.area}</span></p>
                )}
                <p><span className="text-[[#8e9c87]]/60">Address:</span> <span className="text-[#2D1B2E]">{order.customerInfo?.address}</span></p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 p-3 bg-[#e6ede1] rounded-lg border border-[#708268]/40">
            <div>
              <p className="text-[10px] text-[[#8e9c87]]/60 uppercase tracking-wider">Subtotal</p>
              <p className="text-sm font-bold text-[#2D1B2E]">৳{order.subtotal?.toFixed(2) || '0.00'}</p>
            </div>
            <div>
              <p className="text-[10px] text-[[#8e9c87]]/60 uppercase tracking-wider">Shipping</p>
              <p className="text-sm font-bold text-[#2D1B2E]">৳{order.shippingCost?.toFixed(2) || '0.00'}</p>
            </div>
            <div>
              <p className="text-[10px] text-[[#8e9c87]]/60 uppercase tracking-wider">Total</p>
              <p className="text-sm font-bold text-[[#8e9c87]]">৳{order.total?.toFixed(2) || '0.00'}</p>
            </div>
            <div>
              <p className="text-[10px] text-[[#8e9c87]]/60 uppercase tracking-wider">Checkout Step</p>
              <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${getStepColor(order.checkoutStep)}`}>
                {getStepLabel(order.checkoutStep)}
              </span>
            </div>
          </div>

          {/* ========== ITEMS TABLE ========== */}
          {groupedItems.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold text-[#2D1B2E] text-sm mb-2 flex items-center gap-1.5">
                <FaBox className="w-3.5 h-3.5 text-[[#8e9c87]]" />
                Cart Items ({groupedItems.length} products)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[#708268]/40">
                <table className="w-full text-xs">
                  <thead className="bg-[#e6ede1] border-b border-[#708268]/40">
                    <tr>
                      <th className="py-1.5 px-2 text-left text-[10px] font-semibold text-[#2D1B2E] uppercase tracking-wider w-8">#</th>
                      <th className="py-1.5 px-2 text-left text-[10px] font-semibold text-[#2D1B2E] uppercase tracking-wider">Product / Variant</th>
                      <th className="py-1.5 px-2 text-center text-[10px] font-semibold text-[#2D1B2E] uppercase tracking-wider w-16">Color</th>
                      <th className="py-1.5 px-2 text-center text-[10px] font-semibold text-[#2D1B2E] uppercase tracking-wider w-14">Qty</th>
                      <th className="py-1.5 px-2 text-right text-[10px] font-semibold text-[#2D1B2E] uppercase tracking-wider hidden sm:table-cell">Price</th>
                      <th className="py-1.5 px-2 text-right text-[10px] font-semibold text-[#2D1B2E] uppercase tracking-wider w-24">Total</th>
                    </tr>
                  </thead>
                <tbody>
  {groupedItems.map((productGroup, groupIndex) => {
    const rows = productGroup.rows || [];
    if (rows.length === 0) return null;

    return (
      <React.Fragment key={productGroup.productId || groupIndex}>
        {rows.map((row, rowIndex) => {
          const indent = row.indent || 0;
          const paddingLeft = indent === 0 ? 'pl-1' : indent === 1 ? 'pl-4' : 'pl-7';

          const isBaseRow = row.isBase === true;
          const isVariantRow = row.isVariant === true;
          const isSubVariantRow = row.isSubVariant === true;
          const isHeaderRow = row.isHeader === true;

          const showRowNumber = isBaseRow ? groupIndex + 1 : '';

          const showPrice = row.showPrice !== false && !isHeaderRow;
          const price = row.price || 0;
          const originalPrice = row.originalPrice || null;
          const hasDiscount = row.hasDiscount || (originalPrice && originalPrice > price);
          const quantity = row.quantity || 0;
          const total = row.total || (price * quantity);

          // Badge
          let badgeDisplay = null;
          if (row.badge && !isBaseRow) {
            badgeDisplay = (
              <span className={`text-[8px] px-1.5 py-0.5 rounded ml-1 ${
                row.badge === 'Variant' ? 'bg-purple-50 text-purple-600' :
                row.badge === 'Sub' ? 'bg-blue-50 text-blue-600' : ''
              }`}>
                {row.badge}
              </span>
            );
          }

          // Discount badge
          let discountDisplay = null;
          if (showPrice && hasDiscount && originalPrice && originalPrice > price) {
            discountDisplay = (
              <span className="text-[8px] text-green-600 bg-green-50 px-1 py-0.5 rounded ml-1">
                Save {Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </span>
            );
          }

          const rowImage = row.image || null;

          return (
            <tr
              key={`${productGroup.productId}-${rowIndex}`}
              className={`border-b border-[#708268]/20 hover:bg-[#e6ede1]/50 transition-colors ${
                isHeaderRow ? 'bg-purple-50/30' : ''
              }`}
            >
              {/* # */}
              <td className="py-1.5 px-2 text-[10px] text-[[#8e9c87]]/60 align-middle">
                {showRowNumber}
              </td>

              {/* Product / Variant column */}
              <td className={`py-1.5 px-2 ${paddingLeft} align-middle`}>
                <div className="flex items-center gap-1.5">
                  {rowImage ? (
                    <img
                      src={rowImage}
                      alt={row.displayName || 'Item'}
                      className={`rounded object-cover border border-[#708268]/40 flex-shrink-0 ${
                        indent === 0 ? 'w-7 h-7' :
                        indent === 1 ? 'w-5 h-5' : 'w-4 h-4'
                      }`}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/28?text=P'; }}
                    />
                  ) : (
                    indent > 0 && (
                      <span className="text-[[#8e9c87]]/40 text-[10px] flex-shrink-0">
                        {indent === 1 ? '▸' : '→'}
                      </span>
                    )
                  )}
                  <div className="flex flex-wrap items-center gap-0.5">
                    <span className={`break-words ${
                      isHeaderRow ? 'font-bold text-purple-700' :
                      isBaseRow ? 'font-semibold text-[#2D1B2E]' :
                      isVariantRow ? 'font-medium text-[#2D1B2E]' :
                      'text-[#2D1B2E]'
                    } ${isHeaderRow ? 'text-xs' : 'text-[10px]'}`}>
                      {row.displayName || row.name || 'Item'}
                    </span>
                    {badgeDisplay}
                    {discountDisplay}
                  </div>
                </div>
              </td>

              {/* Color */}
              <td className="py-1.5 px-2 text-center align-middle">
                {row.hasColor && row.color ? (
                  <div className="flex items-center justify-center">
                    <div
                      className="w-4 h-4 rounded-full border border-[#708268]/40 shadow-sm"
                      style={{ backgroundColor: row.color }}
                      title={row.color}
                    />
                  </div>
                ) : (
                  <span className="text-[10px] text-[[#8e9c87]]/40">-</span>
                )}
              </td>

              {/* Qty */}
              <td className="py-1.5 px-2 text-center text-[10px] font-medium text-[#2D1B2E] align-middle">
                {isHeaderRow ? '—' : quantity}
              </td>

              {/* Price */}
              <td className="py-1.5 px-2 text-right text-[10px] text-[[#8e9c87]]/60 hidden sm:table-cell align-middle">
                {isHeaderRow || !showPrice ? (
                  <span className="text-[[#8e9c87]]/30 italic">—</span>
                ) : hasDiscount ? (
                  <>
                    <span className="text-green-600 font-medium">৳{price.toFixed(2)}</span>
                    <span className="text-[[#8e9c87]]/40 line-through ml-1 text-[8px]">৳{originalPrice.toFixed(2)}</span>
                  </>
                ) : (
                  <>৳{price.toFixed(2)}</>
                )}
              </td>

              {/* Total */}
              <td className="py-1.5 px-2 text-right font-medium text-[10px] text-[#2D1B2E] align-middle">
                {isHeaderRow || !showPrice ? (
                  <span className="text-[[#8e9c87]]/30 italic">—</span>
                ) : (
                  `৳${total.toFixed(2)}`
                )}
              </td>
            </tr>
          );
        })}
      </React.Fragment>
    );
  })}
</tbody>
                  <tfoot className="border-t-2 border-[#708268]/40 bg-[#e6ede1]/50">
                    <tr>
                      <td colSpan="5" className="py-1.5 px-2 text-right text-[10px] font-medium text-[[#8e9c87]]/60">Subtotal:</td>
                      <td className="py-1.5 px-2 text-right text-[10px] text-[#2D1B2E]">৳{order.subtotal?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="py-0.5 px-2 text-right text-[10px] font-medium text-[[#8e9c87]]/60">Shipping:</td>
                      <td className="py-0.5 px-2 text-right text-[10px] text-[#2D1B2E]">৳{order.shippingCost?.toFixed(2)}</td>
                    </tr>
                    {order.discount > 0 && (
                      <tr className="text-green-600">
                        <td colSpan="5" className="py-0.5 px-2 text-right text-[10px] font-medium">Discount:</td>
                        <td className="py-0.5 px-2 text-right text-[10px] font-medium">- ৳{order.discount.toFixed(2)}</td>
                      </tr>
                    )}
                    <tr className="border-t border-[#708268]/40">
                      <td colSpan="5" className="py-1.5 px-2 text-right text-xs font-bold text-[#2D1B2E]">Total:</td>
                      <td className="py-1.5 px-2 text-right text-sm font-bold text-[[#8e9c87]]">৳{order.total?.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Recovery Actions */}
          <div className="mt-4 pt-4 border-t border-[#708268]/40">
            <h3 className="text-xs font-medium text-[#2D1B2E] mb-2 flex items-center gap-1.5">
              <FaInfoCircle className="w-3.5 h-3.5 text-[[#8e9c87]]" />
              Recovery Actions
            </h3>
            <div className="flex flex-wrap gap-2">
              {order.customerInfo?.phone && (
                <a
                  href={`https://wa.me/88${order.customerInfo.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              )}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(order, null, 2));
                  toast.success('Order data copied to clipboard');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#708268]/50 text-[#2D1B2E] rounded-lg hover:bg-[#e6ede1] transition-colors text-xs font-medium"
              >
                <FaFileInvoice className="w-3.5 h-3.5" />
                Copy Data
              </button>
              {canDelete && onDelete && (
                <button
                  onClick={onDelete}
                  disabled={deleting}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-medium disabled:opacity-50"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                  Delete Order
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#708268]/40 bg-[#e6ede1] flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-[#6E8066] text-white rounded-xl hover:shadow-lg hover:shadow-[[#8e9c87]]/25 transition-all text-sm font-medium shadow-md">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}