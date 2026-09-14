
// // src/app/authorize/dashboard/page.js
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';

// import {
//   FaBox,
//   FaShoppingCart,
//   FaMoneyBillWave,
//   FaUsers,
//   FaChartLine,
//   FaStar,
//   FaClock,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaTruck,
//   FaEye,
//   FaSpinner,
//   FaCalendarAlt,
//   FaChevronDown,
//   FaChevronUp,
//   FaDownload,
//   FaFilter,
//   FaPercent,
//   FaDollarSign,
//   FaStore,
//   FaArrowRight,
//   FaPhone,
//   FaUserCircle,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaTag,
//   FaFire,
//   FaRocket,
//   FaAward,
//   FaClipboardList,
//   FaChartBar
// } from 'react-icons/fa';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ============================================================
// // FONT CONSTANTS - BEAUTY BUCKET STYLE
// // ============================================================
// const FONT_FAMILY_SERIF = " serif";
// const FONT_FAMILY_CURSIVE = "'Courgette', cursive";

// // ============================================================
// // HELPER FUNCTIONS
// // ============================================================

// const getUserRole = () => {
//   try {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       const parsed = JSON.parse(userData);
//       return parsed.role || '';
//     }
//     return '';
//   } catch (error) {
//     return '';
//   }
// };

// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-BD', {
//     style: 'currency',
//     currency: 'BDT',
//     minimumFractionDigits: 0
//   }).format(amount || 0);
// };

// const formatDate = (date) => {
//   if (!date) return 'N/A';
//   return new Date(date).toLocaleDateString('en-BD', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// // ========== UPDATED: GET STATUS COLOR - BEAUTY BUCKET STYLE ==========
// const getStatusColor = (status) => {
//   const colors = {
//     placed: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30',
//     follow_up: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30',
//     reminder: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30',
//     accepted: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30',
//     approved: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30',
//     hold: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30',
//     ready_to_ship: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30',
//     courier_assigned: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30',
//     processing: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30',
//     shipped: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30',
//     out_for_delivery: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30',
//     delivered: 'bg-[#EE4275]/10 text-[#EE4275] border-[#EE4275]/20',
//     cancelled: 'bg-red-50 text-red-600 border-red-200',
//     rejected: 'bg-red-50 text-red-600 border-red-200',
//     returned: 'bg-purple-50 text-purple-600 border-purple-200',
//     refunded: 'bg-gray-100 text-gray-600 border-gray-200',
//     failed: 'bg-red-50 text-red-600 border-red-200',
//     partial_delivery: 'bg-[#FFF5F6] text-[#EE4275] border-[#F7C7D3]/30'
//   };
//   return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
// };

// // ========== UPDATED: GET STATUS LABEL ==========
// const getStatusLabel = (status) => {
//   const labels = {
//     placed: 'Placed',
//     follow_up: 'Follow Up',
//     reminder: 'Reminder',
//     accepted: 'Accepted',
//     approved: 'Approved',
//     hold: 'On Hold',
//     ready_to_ship: 'Ready to Ship',
//     courier_assigned: 'Courier Assigned',
//     processing: 'Processing',
//     shipped: 'Shipped',
//     out_for_delivery: 'Out for Delivery',
//     delivered: 'Delivered',
//     cancelled: 'Cancelled',
//     rejected: 'Rejected',
//     returned: 'Returned',
//     refunded: 'Refunded',
//     failed: 'Failed',
//     partial_delivery: 'Partial Delivery'
//   };
//   return labels[status] || status;
// };

// // ============================================================
// // STAT CARD COMPONENT - BEAUTY BUCKET STYLE
// // ============================================================

// const StatCard = ({ title, value, icon, color, subtitle, onClick, loading }) => {
//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F7C7D3]/30 animate-pulse">
//         <div className="h-3 bg-[#F7C7D3]/30 rounded w-1/2 mb-2"></div>
//         <div className="h-7 bg-[#F7C7D3]/30 rounded w-3/4"></div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className={`bg-white rounded-2xl p-4 shadow-sm border border-[#F7C7D3]/30 hover:shadow-[0_8px_25px_rgba(238,66,117,0.12)] transition-all ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
//       onClick={onClick}
//     >
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs text-gray-500 font-medium uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY_SERIF }}>{title}</p>
//           <p className="text-xl font-bold text-[#2D1B2E] mt-0.5" style={{ fontFamily: FONT_FAMILY_SERIF }}>{value}</p>
//           {subtitle && <p className="text-[10px] text-gray-500 mt-0.5" style={{ fontFamily: FONT_FAMILY_SERIF }}>{subtitle}</p>}
//         </div>
//         <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // ORDER STATUS CARD COMPONENT - BEAUTY BUCKET STYLE
// // ============================================================

// const OrderStatusCard = ({ status, count, totalOrders, onClick }) => {
//   const colorClass = getStatusColor(status);
//   const label = getStatusLabel(status);
//   const percentage = totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0;

//   return (
//     <div 
//       className={`p-2.5 rounded-xl border ${colorClass} hover:shadow-[0_4px_12px_rgba(238,66,117,0.1)] transition-all ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
//       onClick={onClick}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-[10px] font-medium" style={{ fontFamily: FONT_FAMILY_SERIF }}>{label}</p>
//           <p className="text-lg font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SERIF }}>{count}</p>
//         </div>
//         <div className="text-[10px] font-medium text-[#EE4275]">{percentage}%</div>
//       </div>
//       <div className="w-full bg-[#F7C7D3]/30 rounded-full h-1 mt-1">
//         <div 
//           className="h-1 rounded-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"
//           style={{ width: `${Math.min(percentage, 100)}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // TOP PRODUCTS COMPONENT - BEAUTY BUCKET STYLE
// // ============================================================

// const TopProductsList = ({ products, loading }) => {
//   if (loading) {
//     return (
//       <div className="space-y-2">
//         {[...Array(5)].map((_, i) => (
//           <div key={`loading-${i}`} className="flex items-center gap-2 animate-pulse">
//             <div className="w-2 h-2 bg-[#F7C7D3]/30 rounded-full"></div>
//             <div className="flex-1">
//               <div className="h-2.5 bg-[#F7C7D3]/30 rounded w-3/4 mb-1"></div>
//               <div className="h-2 bg-[#F7C7D3]/30 rounded w-1/2"></div>
//             </div>
//             <div className="h-3.5 bg-[#F7C7D3]/30 rounded w-14"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <div className="text-center py-6 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//         <FaBox className="w-6 h-6 mx-auto mb-1 text-[#F7C7D3]" />
//         No sales data available
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-2">
//       {products.map((product, index) => {
//         const isTop = index < 3;
//         const icon = isTop ? (
//           index === 0 ? <FaFire className="w-2.5 h-2.5 text-[#EE4275]" /> :
//           index === 1 ? <FaChartBar className="w-2.5 h-2.5 text-[#FF6B9D]" /> :
//           <FaAward className="w-2.5 h-2.5 text-[#EE4275]" />
//         ) : null;

//         const sellingPrice = product.discountPrice || product.regularPrice || 0;
//         const uniqueKey = product.id && product.id !== 'unknown' 
//           ? `product-${product.id}` 
//           : `product-${index}-${Date.now()}`;

//         return (
//           <div 
//             key={uniqueKey}
//             className="flex items-center gap-2 p-1.5 bg-[#FFF5F6] rounded-lg hover:bg-[#F7C7D3]/20 transition-colors"
//           >
//             <div className="flex-shrink-0 w-5 text-center font-bold text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//               #{index + 1}
//             </div>
//             {product.image ? (
//               <img 
//                 src={product.image} 
//                 alt={product.name} 
//                 className="w-7 h-7 rounded-lg object-cover border border-[#F7C7D3]/30"
//               />
//             ) : (
//               <div className="w-7 h-7 rounded-lg bg-[#FFF5F6] flex items-center justify-center">
//                 <FaBox className="w-3.5 h-3.5 text-[#F7C7D3]" />
//               </div>
//             )}
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-1">
//                 <p className="text-[11px] font-medium text-[#2D1B2E] truncate" style={{ fontFamily: FONT_FAMILY_SERIF }}>{product.name}</p>
//                 {icon}
//               </div>
//               <div className="flex items-center gap-1.5 flex-wrap">
//                 <p className="text-[9px] text-gray-500" style={{ fontFamily: FONT_FAMILY_SERIF }}>{product.sales || 0} sales</p>
//                 <p className="text-[9px] font-semibold text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_SERIF }}>@{formatCurrency(sellingPrice)}</p>
//                 {product.discountPrice && product.discountPrice < product.regularPrice && (
//                   <span className="text-[8px] text-[#EE4275] bg-[#FFF5F6] px-1 rounded">
//                     -{Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}%
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ============================================================
// // RECENT ORDERS COMPONENT - BEAUTY BUCKET STYLE
// // ============================================================

// const RecentOrdersList = ({ orders, loading, onViewOrder }) => {
//   if (loading) {
//     return (
//       <div className="space-y-1.5">
//         {[...Array(5)].map((_, i) => (
//           <div key={`recent-loading-${i}`} className="flex items-center gap-2 animate-pulse p-1.5 border-b border-[#F7C7D3]/20">
//             <div className="h-2.5 bg-[#F7C7D3]/30 rounded w-16"></div>
//             <div className="flex-1">
//               <div className="h-2.5 bg-[#F7C7D3]/30 rounded w-1/3 mb-0.5"></div>
//               <div className="h-2 bg-[#F7C7D3]/30 rounded w-1/4"></div>
//             </div>
//             <div className="h-3.5 bg-[#F7C7D3]/30 rounded w-14"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="text-center py-6 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//         <FaShoppingCart className="w-6 h-6 mx-auto mb-1 text-[#F7C7D3]" />
//         No recent orders
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-1.5">
//       {orders.slice(0, 10).map((order) => {
//         const statusColor = getStatusColor(order.orderStatus);
//         const statusLabel = getStatusLabel(order.orderStatus);
//         const isPaid = order.paymentStatus === 'paid';

//         return (
//           <div 
//             key={order._id || `order-${Math.random()}`}
//             className="flex items-center gap-2 p-1.5 hover:bg-[#FFF5F6] rounded-lg transition-colors cursor-pointer border-b border-[#F7C7D3]/20 last:border-0"
//             onClick={() => onViewOrder && onViewOrder(order._id)}
//           >
//             <div className="flex-shrink-0">
//               <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium ${statusColor}`} style={{ fontFamily: FONT_FAMILY_SERIF }}>
//                 {statusLabel}
//               </span>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-[11px] font-medium text-[#2D1B2E] truncate" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//                 {order.orderNumber || order._id?.slice(-8).toUpperCase()}
//               </p>
//               <p className="text-[9px] text-gray-500 truncate" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//                 {order.customerInfo?.fullName || 'Guest'} • {order.customerInfo?.phone || 'N/A'}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-[11px] font-semibold text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_SERIF }}>{formatCurrency(order.total)}</p>
//               <p className="text-[8px] text-gray-500" style={{ fontFamily: FONT_FAMILY_SERIF }}>{formatDate(order.createdAt)}</p>
//               {isPaid && (
//                 <span className="text-[7px] text-[#EE4275] bg-[#FFF5F6] px-1 py-0.5 rounded">Paid</span>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ============================================================
// // MAIN DASHBOARD COMPONENT
// // ============================================================

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [userRole, setUserRole] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // Dashboard data states
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     totalProfit: 0,
//     totalProducts: 0,
//     totalReviews: 0,
//     paidOrders: 0,
//     pendingPayment: 0,
//     orderStatuses: {},
//     recentOrders: [],
//     topProducts: [],
//     averageProfitMargin: 0,
//     totalCost: 0,
//     totalQuantity: 0
//   });

//   // Filter states - Default to current month
//   const [filterType, setFilterType] = useState('month');
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   const isAdminOrSuperAdmin = ['super_admin', 'admin'].includes(userRole);
//   const isModerator = userRole === 'moderator';

//   // Months array
//   const months = [
//     { value: 1, name: 'January' },
//     { value: 2, name: 'February' },
//     { value: 3, name: 'March' },
//     { value: 4, name: 'April' },
//     { value: 5, name: 'May' },
//     { value: 6, name: 'June' },
//     { value: 7, name: 'July' },
//     { value: 8, name: 'August' },
//     { value: 9, name: 'September' },
//     { value: 10, name: 'October' },
//     { value: 11, name: 'November' },
//     { value: 12, name: 'December' }
//   ];

//   // Years array
//   const getYears = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear; i >= currentYear - 5; i--) {
//       years.push(i);
//     }
//     return years;
//   };

//   // ============================================================
//   // FETCH DASHBOARD DATA
//   // ============================================================

//   const fetchDashboardData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/auth/login');
//         return;
//       }

//       // Build date range
//       let startDate, endDate;
//       let dateParams = {};

//       if (filterType === 'all') {
//         // No date filter - all time
//       } else if (filterType === 'month') {
//         startDate = new Date(selectedYear, selectedMonth - 1, 1);
//         startDate.setHours(0, 0, 0, 0);
//         endDate = new Date(selectedYear, selectedMonth, 0);
//         endDate.setHours(23, 59, 59, 999);
//         dateParams = {
//           startDate: startDate.toISOString(),
//           endDate: endDate.toISOString()
//         };
//       } else if (filterType === 'year') {
//         startDate = new Date(selectedYear, 0, 1);
//         startDate.setHours(0, 0, 0, 0);
//         endDate = new Date(selectedYear, 11, 31);
//         endDate.setHours(23, 59, 59, 999);
//         dateParams = {
//           startDate: startDate.toISOString(),
//           endDate: endDate.toISOString()
//         };
//       }

//       // ============================================================
//       // 1. FETCH FILTERED ORDER STATS
//       // ============================================================
//       let statsUrl = 'http://localhost:5000/api/orders/admin/stats/filtered';
//       if (filterType !== 'all' && dateParams.startDate && dateParams.endDate) {
//         statsUrl += `?startDate=${encodeURIComponent(dateParams.startDate)}&endDate=${encodeURIComponent(dateParams.endDate)}`;
//       }
      
//       const statsResponse = await fetch(statsUrl, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const statsData = await statsResponse.json();
//       const orderStats = statsData.success ? statsData.data : {};

//       // ============================================================
//       // 2. FETCH PROFIT MARGIN DATA (For revenue & profit)
//       // ============================================================
//       const profitParams = new URLSearchParams({
//         orderStatus: 'delivered',
//         paymentStatus: 'paid'
//       });

//       if (filterType !== 'all' && dateParams.startDate && dateParams.endDate) {
//         profitParams.append('startDate', dateParams.startDate);
//         profitParams.append('endDate', dateParams.endDate);
//       }

//       const profitResponse = await fetch(
//         `http://localhost:5000/api/orders/admin/profit-margin?${profitParams.toString()}`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const profitData = await profitResponse.json();

//       // ============================================================
//       // 3. FETCH RECENT ORDERS (ALL ORDERS - NOT JUST PAID)
//       // ============================================================
//       let ordersParams = new URLSearchParams({
//         limit: 10,
//         sort: '-createdAt'
//       });

//       if (filterType !== 'all' && dateParams.startDate && dateParams.endDate) {
//         ordersParams.append('startDate', dateParams.startDate);
//         ordersParams.append('endDate', dateParams.endDate);
//       }

//       const recentOrdersResponse = await fetch(
//         `http://localhost:5000/api/orders/admin/all?${ordersParams.toString()}`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const recentOrdersData = await recentOrdersResponse.json();
//       const recentOrders = recentOrdersData.success ? recentOrdersData.data : [];

//       // ============================================================
//       // 4. FETCH PRODUCT STATS
//       // ============================================================
//       const productsResponse = await fetch(
//         `http://localhost:5000/api/products/admin/all?limit=999`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const productsData = await productsResponse.json();
//       const products = productsData.success ? productsData.data : [];
//       const totalProducts = products.length;

//       // ============================================================
//       // 5. FETCH REVIEWS COUNT
//       // ============================================================
//       const reviewsResponse = await fetch(
//         `http://localhost:5000/api/reviews`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const reviewsData = await reviewsResponse.json();
//       const totalReviews = reviewsData.success ? reviewsData.data?.length || 0 : 0;

//       // ============================================================
//       // PROCESS DATA
//       // ============================================================
      
//       // Order stats from filtered endpoint
//       const totalOrders = orderStats.totalOrders || 0;
//       const pendingPayment = orderStats.pendingPayment || 0;

//       // Order status distribution (FILTERED)
//       const orderStatuses = {
//         placed: orderStats.placedOrders || 0,
//         follow_up: orderStats.followUpOrders || 0,
//         reminder: orderStats.reminderOrders || 0,
//         accepted: orderStats.acceptedOrders || 0,
//         approved: orderStats.approvedOrders || 0,
//         hold: orderStats.holdOrders || 0,
//         ready_to_ship: orderStats.readyToShipOrders || 0,
//         courier_assigned: orderStats.courierAssignedOrders || 0,
//         processing: orderStats.processingOrders || 0,
//         shipped: orderStats.shippedOrders || 0,
//         out_for_delivery: orderStats.outForDeliveryOrders || 0,
//         delivered: orderStats.deliveredOrders || 0,
//         cancelled: orderStats.cancelledOrders || 0,
//         rejected: orderStats.rejectedOrders || 0,
//         returned: orderStats.returnedOrders || 0,
//         partial_delivery: orderStats.partialDeliveryOrders || 0,
//         refunded: orderStats.refundedOrders || 0,
//         failed: orderStats.failedOrders || 0
//       };

//       // Profit data
//       const profitSummary = profitData.success ? profitData.data.summary : {};
//       const totalRevenue = profitSummary.totalRevenue || 0;
//       const totalProfit = profitSummary.totalProfit || 0;
//       const averageProfitMargin = profitSummary.averageProfitMargin || 0;
//       const paidOrders = profitSummary.totalOrders || 0;

//       // Top products from profit data
//       const productDetails = profitData.success ? profitData.data.productProfitDetails || [] : [];
//       const topProducts = productDetails
//         .sort((a, b) => b.totalRevenue - a.totalRevenue)
//         .slice(0, 5)
//         .map(p => ({
//           id: p.productId || `product-${Math.random()}`,
//           name: p.productName || 'Unknown Product',
//           sales: p.totalQuantity || 0,
//           revenue: p.totalRevenue || 0,
//           image: p.image || '',
//           discountPrice: p.averageSellingPrice || 0,
//           regularPrice: p.averageSellingPrice || 0
//         }));

//       // ============================================================
//       // SET STATE
//       // ============================================================

//       setStats({
//         totalOrders,
//         totalRevenue,
//         totalProfit,
//         totalProducts,
//         totalReviews,
//         paidOrders: paidOrders,
//         pendingPayment: pendingPayment,
//         orderStatuses,
//         recentOrders: recentOrders,
//         topProducts,
//         averageProfitMargin: averageProfitMargin
//       });

//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       toast.error('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [filterType, selectedMonth, selectedYear, router]);

//   // ============================================================
//   // EFFECTS
//   // ============================================================

//   useEffect(() => {
//     const role = getUserRole();
//     setUserRole(role);
//   }, []);

//   useEffect(() => {
//     if (userRole) {
//       fetchDashboardData();
//     }
//   }, [userRole, fetchDashboardData]);

//   // ============================================================
//   // HANDLERS
//   // ============================================================

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchDashboardData();
//   };

//   const getFilterLabel = () => {
//     if (filterType === 'all') return 'All Time';
//     if (filterType === 'month') {
//       const month = months.find(m => m.value === selectedMonth);
//       return `${month?.name} ${selectedYear}`;
//     }
//     return `Year ${selectedYear}`;
//   };

//   const orderStatuses = stats.orderStatuses || {};

//   const activeStatuses = Object.entries(orderStatuses)
//     .filter(([_, count]) => count > 0)
//     .sort((a, b) => b[1] - a[1]);

//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (
//     <ProtectedRoute pageKey="dashboard">
//       <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF5F6]/30 to-white p-4 md:p-6">
//         <div className="max-w-7xl mx-auto">

//           {/* ============================================================
//               HEADER
//               ============================================================ */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-xl flex items-center justify-center shadow-lg shadow-[#EE4275]/20">
//                 <FaChartLine className="w-4 h-4 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//                   Dashboard
//                 </h1>
//                 <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//                   Welcome back! Here's what's happening.
//                   <span className="ml-1.5 text-[10px] text-[#EE4275] font-medium bg-[#FFF5F6] px-2 py-0.5 rounded-full border border-[#F7C7D3]/30">
//                     {getFilterLabel()}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#F7C7D3]/30 text-[#2D1B2E] rounded-lg hover:bg-[#FFF5F6] transition-colors text-xs disabled:opacity-50"
//             >
//               <FaSpinner className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
//               Refresh
//             </button>
//           </div>

//           {/* ============================================================
//               COMPACT FILTERS - ALWAYS VISIBLE
//               ============================================================ */}
//           <div className="bg-white rounded-xl border border-[#F7C7D3]/30 shadow-sm overflow-hidden mb-4">
//             <div className="flex flex-wrap items-center gap-2 p-2.5">
//               <span className="text-[10px] font-medium text-gray-500 mr-1" style={{ fontFamily: FONT_FAMILY_SERIF }}>View:</span>
              
//               <button
//                 onClick={() => setFilterType('all')}
//                 className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
//                   filterType === 'all' ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-sm' : 'bg-white text-gray-500 hover:bg-[#FFF5F6] border border-[#F7C7D3]/30'
//                 }`}
//                 style={{ fontFamily: FONT_FAMILY_SERIF }}
//               >
//                 All
//               </button>
              
//               <button
//                 onClick={() => setFilterType('month')}
//                 className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
//                   filterType === 'month' ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-sm' : 'bg-white text-gray-500 hover:bg-[#FFF5F6] border border-[#F7C7D3]/30'
//                 }`}
//                 style={{ fontFamily: FONT_FAMILY_SERIF }}
//               >
//                 Monthly
//               </button>
              
//               <button
//                 onClick={() => setFilterType('year')}
//                 className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
//                   filterType === 'year' ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-sm' : 'bg-white text-gray-500 hover:bg-[#FFF5F6] border border-[#F7C7D3]/30'
//                 }`}
//                 style={{ fontFamily: FONT_FAMILY_SERIF }}
//               >
//                 Yearly
//               </button>

//               <div className="h-5 w-px bg-[#F7C7D3]/30 mx-1"></div>

//               {filterType === 'month' && (
//                 <div className="flex items-center gap-1.5">
//                   <select
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//                     className="px-2 py-1 text-[10px] border border-[#F7C7D3]/30 rounded-lg focus:ring-1 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E]"
//                     style={{ fontFamily: FONT_FAMILY_SERIF }}
//                   >
//                     {months.map(month => (
//                       <option key={month.value} value={month.value}>{month.name}</option>
//                     ))}
//                   </select>
//                   <select
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                     className="px-2 py-1 text-[10px] border border-[#F7C7D3]/30 rounded-lg focus:ring-1 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E]"
//                     style={{ fontFamily: FONT_FAMILY_SERIF }}
//                   >
//                     {getYears().map(year => (
//                       <option key={year} value={year}>{year}</option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {filterType === 'year' && (
//                 <select
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                   className="px-2 py-1 text-[10px] border border-[#F7C7D3]/30 rounded-lg focus:ring-1 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E]"
//                   style={{ fontFamily: FONT_FAMILY_SERIF }}
//                 >
//                   {getYears().map(year => (
//                     <option key={year} value={year}>{year}</option>
//                   ))}
//                 </select>
//               )}

//               <button
//                 onClick={handleRefresh}
//                 disabled={refreshing}
//                 className="ml-auto px-2.5 py-1 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[10px] font-medium rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all disabled:opacity-50"
//                 style={{ fontFamily: FONT_FAMILY_SERIF }}
//               >
//                 Apply
//               </button>
//             </div>
//           </div>

//           {/* ============================================================
//               STATS CARDS - ROLE BASED
//               ============================================================ */}

//           {/* ADMIN/SUPER ADMIN: Full stats */}
//           {isAdminOrSuperAdmin && (
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
//               <StatCard
//                 title="Revenue"
//                 value={formatCurrency(stats.totalRevenue)}
//                 icon={<FaMoneyBillWave className="w-3.5 h-3.5 text-[#EE4275]" />}
//                 color="bg-[#FFF5F6]"
//                 subtitle={`${getFilterLabel()}`}
//                 loading={loading}
//               />
//               <StatCard
//                 title="Profit"
//                 value={formatCurrency(stats.totalProfit)}
//                 icon={<FaChartLine className="w-3.5 h-3.5 text-[#EE4275]" />}
//                 color="bg-[#FFF5F6]"
//                 subtitle={`${stats.averageProfitMargin?.toFixed(1) || 0}% margin`}
//                 loading={loading}
//               />
//               <StatCard
//                 title="Orders"
//                 value={stats.totalOrders}
//                 icon={<FaShoppingCart className="w-3.5 h-3.5 text-[#EE4275]" />}
//                 color="bg-[#FFF5F6]"
//                 subtitle={`${stats.paidOrders} delivered & paid`}
//                 loading={loading}
//               />
//               <StatCard
//                 title="Products"
//                 value={stats.totalProducts}
//                 icon={<FaBox className="w-3.5 h-3.5 text-[#EE4275]" />}
//                 color="bg-[#FFF5F6]"
//                 loading={loading}
//               />
//             </div>
//           )}

//           {/* MODERATOR: Limited stats */}
//           {isModerator && (
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
//               <StatCard
//                 title="Orders"
//                 value={stats.totalOrders}
//                 icon={<FaShoppingCart className="w-3.5 h-3.5 text-[#EE4275]" />}
//                 color="bg-[#FFF5F6]"
//                 subtitle={`${getFilterLabel()}`}
//                 loading={loading}
//               />
//               <StatCard
//                 title="Products"
//                 value={stats.totalProducts}
//                 icon={<FaBox className="w-3.5 h-3.5 text-[#EE4275]" />}
//                 color="bg-[#FFF5F6]"
//                 loading={loading}
//               />
//               <StatCard
//                 title="Reviews"
//                 value={stats.totalReviews}
//                 icon={<FaStar className="w-3.5 h-3.5 text-[#EE4275]" />}
//                 color="bg-[#FFF5F6]"
//                 loading={loading}
//               />
//             </div>
//           )}

//           {/* ============================================================
//               ORDER STATUS OVERVIEW (FILTERED)
//               ============================================================ */}

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
//             {/* Order Status Cards */}
//             <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm border border-[#F7C7D3]/30">
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-sm font-semibold text-[#2D1B2E] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//                   <FaClock className="w-4 h-4 text-[#EE4275]" />
//                   Order Status
//                   <span className="text-[10px] font-normal text-gray-500 bg-[#FFF5F6] px-1.5 py-0.5 rounded-full border border-[#F7C7D3]/30">
//                     {getFilterLabel()}
//                   </span>
//                 </h2>
//                 <button
//                   onClick={() => router.push('/authorize/orders')}
//                   className="text-[10px] text-[#EE4275] hover:text-[#ca4f74] flex items-center gap-0.5 transition-colors"
//                   style={{ fontFamily: FONT_FAMILY_SERIF }}
//                 >
//                   View All <FaArrowRight className="w-2.5 h-2.5" />
//                 </button>
//               </div>

//               {loading ? (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                   {[...Array(4)].map((_, i) => (
//                     <div key={`status-loading-${i}`} className="p-2 rounded-xl border border-[#F7C7D3]/30 animate-pulse">
//                       <div className="h-2.5 bg-[#F7C7D3]/30 rounded w-1/2 mb-1.5"></div>
//                       <div className="h-5 bg-[#F7C7D3]/30 rounded w-1/3"></div>
//                     </div>
//                   ))}
//                 </div>
//               ) : activeStatuses.length === 0 ? (
//                 <div className="text-center py-4 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//                   <FaClipboardList className="w-5 h-5 mx-auto mb-1 text-[#F7C7D3]" />
//                   No orders found for {getFilterLabel()}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                   {activeStatuses.slice(0, 8).map(([status, count]) => (
//                     <OrderStatusCard
//                       key={`status-${status}`}
//                       status={status}
//                       count={count}
//                       totalOrders={stats.totalOrders}
//                       onClick={() => router.push(`/authorize/orders?status=${status}`)}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Top Selling Products */}
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F7C7D3]/30">
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-sm font-semibold text-[#2D1B2E] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//                   <FaFire className="w-4 h-4 text-[#EE4275]" />
//                   Top Products
//                 </h2>
//                 <button
//                   onClick={() => router.push('/authorize/all-products')}
//                   className="text-[10px] text-[#EE4275] hover:text-[#ca4f74] flex items-center gap-0.5 transition-colors"
//                   style={{ fontFamily: FONT_FAMILY_SERIF }}
//                 >
//                   View All <FaArrowRight className="w-2.5 h-2.5" />
//                 </button>
//               </div>

//               <TopProductsList
//                 products={stats.topProducts}
//                 loading={loading}
//               />
//             </div>
//           </div>

//           {/* ============================================================
//               ADDITIONAL STATS - ADMIN ONLY
//               ============================================================ */}

//           {isAdminOrSuperAdmin && (
//             <div className="grid grid-cols-2 gap-3 mb-4">
//               <StatCard
//                 title="Delivered & Paid Orders"
//                 value={stats.paidOrders}
//                 icon={<FaCheckCircle className="w-3.5 h-3.5 text-[#EE4275]" />}
//                 color="bg-[#FFF5F6]"
//                 subtitle={`${getFilterLabel()}`}
//                 loading={loading}
//                 onClick={() => router.push('/authorize/orders?status=delivered')}
//               />
//               <StatCard
//                 title="Pending Payments"
//                 value={stats.pendingPayment}
//                 icon={<FaClock className="w-3.5 h-3.5 text-[#EE4275]" />}
//                 color="bg-[#FFF5F6]"
//                 loading={loading}
//                 onClick={() => router.push('/authorize/orders?payment=pending')}
//               />
//             </div>
//           )}

//           {/* ============================================================
//               RECENT ORDERS (ALL ORDERS - NOT JUST PAID)
//               ============================================================ */}

//           <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F7C7D3]/30">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-sm font-semibold text-[#2D1B2E] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//                 <FaTruck className="w-4 h-4 text-[#EE4275]" />
//                 Recent Orders
//                 <span className="text-[10px] font-normal text-gray-500 bg-[#FFF5F6] px-1.5 py-0.5 rounded-full border border-[#F7C7D3]/30">
//                   {getFilterLabel()}
//                 </span>
//               </h2>
//               <button
//                 onClick={() => router.push('/authorize/orders')}
//                 className="text-[10px] text-[#EE4275] hover:text-[#ca4f74] flex items-center gap-0.5 transition-colors"
//                 style={{ fontFamily: FONT_FAMILY_SERIF }}
//               >
//                 View All <FaArrowRight className="w-2.5 h-2.5" />
//               </button>
//             </div>

//             <RecentOrdersList
//               orders={stats.recentOrders}
//               loading={loading}
//               onViewOrder={(orderId) => router.push(`/authorize/orders?view=${orderId}`)}
//             />
//           </div>

//           {/* ============================================================
//               ROLE INDICATOR
//               ============================================================ */}

//           <div className="mt-4 text-center text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//             <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white rounded-full border border-[#F7C7D3]/30">
//               <FaUserCircle className="w-3 h-3 text-[#EE4275]" />
//               Role: <span className="font-medium text-[#2D1B2E]">
//                 {userRole ? userRole.replace('_', ' ').toUpperCase() : 'Unknown'}
//               </span>
//               {isAdminOrSuperAdmin && (
//                 <span className="text-[8px] text-[#EE4275] bg-[#FFF5F6] px-1 py-0.5 rounded-full border border-[#F7C7D3]/30">
//                   Full Access
//                 </span>
//               )}
//               {isModerator && (
//                 <span className="text-[8px] text-[#EE4275] bg-[#FFF5F6] px-1 py-0.5 rounded-full border border-[#F7C7D3]/30">
//                   Limited
//                 </span>
//               )}
//             </span>
//           </div>

//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }


// src/app/authorize/dashboard/page.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

import {
  FaBox,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUsers,
  FaChartLine,
  FaStar,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaEye,
  FaSpinner,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
  FaFilter,
  FaPercent,
  FaDollarSign,
  FaStore,
  FaArrowRight,
  FaPhone,
  FaUserCircle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTag,
  FaFire,
  FaRocket,
  FaAward,
  FaClipboardList,
  FaChartBar
} from 'react-icons/fa';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================================
// FONT CONSTANTS - MATCHING ABOUT PAGE
// ============================================================
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

// ============================================================
// COLOR PALETTE - MATCHING ABOUT PAGE
// ============================================================
const COLORS = {
  primary: '#52665a',
  primaryDark: '#405347',
  primaryLight: '#71816F',
  accent: '#B88C8D',
  accentLight: '#E8C8C7',
  accentDark: '#9C7072',
  bgCream: '#f7f4ef',
  bgWarm: '#F8F5F0',
  bgLight: '#faf9f5',
  textDark: '#29362f',
  textMedium: '#526257',
  textLight: '#687169',
  textMuted: '#85827B',
  borderLight: '#e2e3dd',
  borderMedium: '#DED8D1',
  borderAccent: '#bfc5bd',
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const getUserRole = () => {
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed.role || '';
    }
    return '';
  } catch (error) {
    return '';
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0
  }).format(amount || 0);
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

// ========== UPDATED: GET STATUS COLOR - SAGE GREEN STYLE ==========
const getStatusColor = (status) => {
  const colors = {
    placed: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60',
    follow_up: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60',
    reminder: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60',
    accepted: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60',
    approved: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60',
    hold: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60',
    ready_to_ship: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60',
    courier_assigned: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60',
    processing: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60',
    shipped: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60',
    out_for_delivery: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60',
    delivered: 'bg-[#52665a]/10 text-[#52665a] border-[#52665a]/20',
    cancelled: 'bg-red-50 text-red-600 border-red-200',
    rejected: 'bg-red-50 text-red-600 border-red-200',
    returned: 'bg-purple-50 text-purple-600 border-purple-200',
    refunded: 'bg-gray-100 text-gray-600 border-gray-200',
    failed: 'bg-red-50 text-red-600 border-red-200',
    partial_delivery: 'bg-[#f7f4ef] text-[#52665a] border-[#e2e3dd]/60'
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

// ========== UPDATED: GET STATUS LABEL ==========
const getStatusLabel = (status) => {
  const labels = {
    placed: 'Placed',
    follow_up: 'Follow Up',
    reminder: 'Reminder',
    accepted: 'Accepted',
    approved: 'Approved',
    hold: 'On Hold',
    ready_to_ship: 'Ready to Ship',
    courier_assigned: 'Courier Assigned',
    processing: 'Processing',
    shipped: 'Shipped',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    rejected: 'Rejected',
    returned: 'Returned',
    refunded: 'Refunded',
    failed: 'Failed',
    partial_delivery: 'Partial Delivery'
  };
  return labels[status] || status;
};

// ============================================================
// STAT CARD COMPONENT - SAGE GREEN STYLE
// ============================================================

const StatCard = ({ title, value, icon, color, subtitle, onClick, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e3dd]/60 animate-pulse">
        <div className="h-3 bg-[#e2e3dd]/60 rounded w-1/2 mb-2"></div>
        <div className="h-7 bg-[#e2e3dd]/60 rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white rounded-2xl p-4 shadow-sm border border-[#e2e3dd]/60 hover:shadow-[0_8px_25px_rgba(82,102,90,0.12)] transition-all ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY_INTER }}>{title}</p>
          <p className="text-xl font-bold text-[#29362f] mt-0.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{value}</p>
          {subtitle && <p className="text-[10px] text-gray-500 mt-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}>{subtitle}</p>}
        </div>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ORDER STATUS CARD COMPONENT - SAGE GREEN STYLE
// ============================================================

const OrderStatusCard = ({ status, count, totalOrders, onClick }) => {
  const colorClass = getStatusColor(status);
  const label = getStatusLabel(status);
  const percentage = totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0;

  return (
    <div 
      className={`p-2.5 rounded-xl border ${colorClass} hover:shadow-[0_4px_12px_rgba(82,102,90,0.1)] transition-all ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium" style={{ fontFamily: FONT_FAMILY_INTER }}>{label}</p>
          <p className="text-lg font-bold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{count}</p>
        </div>
        <div className="text-[10px] font-medium text-[#52665a]">{percentage}%</div>
      </div>
      <div className="w-full bg-[#e2e3dd]/60 rounded-full h-1 mt-1">
        <div 
          className="h-1 rounded-full bg-gradient-to-r from-[#52665a] to-[#71816F]"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

// ============================================================
// TOP PRODUCTS COMPONENT - SAGE GREEN STYLE
// ============================================================

const TopProductsList = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={`loading-${i}`} className="flex items-center gap-2 animate-pulse">
            <div className="w-2 h-2 bg-[#e2e3dd]/60 rounded-full"></div>
            <div className="flex-1">
              <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-3/4 mb-1"></div>
              <div className="h-2 bg-[#e2e3dd]/60 rounded w-1/2"></div>
            </div>
            <div className="h-3.5 bg-[#e2e3dd]/60 rounded w-14"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_INTER }}>
        <FaBox className="w-6 h-6 mx-auto mb-1 text-[#e2e3dd]" />
        No sales data available
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {products.map((product, index) => {
        const isTop = index < 3;
        const icon = isTop ? (
          index === 0 ? <FaFire className="w-2.5 h-2.5 text-[#52665a]" /> :
          index === 1 ? <FaChartBar className="w-2.5 h-2.5 text-[#71816F]" /> :
          <FaAward className="w-2.5 h-2.5 text-[#52665a]" />
        ) : null;

        const sellingPrice = product.discountPrice || product.regularPrice || 0;
        const uniqueKey = product.id && product.id !== 'unknown' 
          ? `product-${product.id}` 
          : `product-${index}-${Date.now()}`;

        return (
          <div 
            key={uniqueKey}
            className="flex items-center gap-2 p-1.5 bg-[#f7f4ef] rounded-lg hover:bg-[#e2e3dd]/40 transition-colors"
          >
            <div className="flex-shrink-0 w-5 text-center font-bold text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>
              #{index + 1}
            </div>
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-7 h-7 rounded-lg object-cover border border-[#e2e3dd]/60"
              />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-[#f7f4ef] flex items-center justify-center">
                <FaBox className="w-3.5 h-3.5 text-[#e2e3dd]" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-[11px] font-medium text-[#29362f] truncate" style={{ fontFamily: FONT_FAMILY_INTER }}>{product.name}</p>
                {icon}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-[9px] text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>{product.sales || 0} sales</p>
                <p className="text-[9px] font-semibold text-[#52665a]" style={{ fontFamily: FONT_FAMILY_INTER }}>@{formatCurrency(sellingPrice)}</p>
                {product.discountPrice && product.discountPrice < product.regularPrice && (
                  <span className="text-[8px] text-[#52665a] bg-[#f7f4ef] px-1 rounded">
                    -{Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// RECENT ORDERS COMPONENT - SAGE GREEN STYLE
// ============================================================

const RecentOrdersList = ({ orders, loading, onViewOrder }) => {
  if (loading) {
    return (
      <div className="space-y-1.5">
        {[...Array(5)].map((_, i) => (
          <div key={`recent-loading-${i}`} className="flex items-center gap-2 animate-pulse p-1.5 border-b border-[#e2e3dd]/30">
            <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-16"></div>
            <div className="flex-1">
              <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-1/3 mb-0.5"></div>
              <div className="h-2 bg-[#e2e3dd]/60 rounded w-1/4"></div>
            </div>
            <div className="h-3.5 bg-[#e2e3dd]/60 rounded w-14"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_INTER }}>
        <FaShoppingCart className="w-6 h-6 mx-auto mb-1 text-[#e2e3dd]" />
        No recent orders
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {orders.slice(0, 10).map((order) => {
        const statusColor = getStatusColor(order.orderStatus);
        const statusLabel = getStatusLabel(order.orderStatus);
        const isPaid = order.paymentStatus === 'paid';

        return (
          <div 
            key={order._id || `order-${Math.random()}`}
            className="flex items-center gap-2 p-1.5 hover:bg-[#f7f4ef] rounded-lg transition-colors cursor-pointer border-b border-[#e2e3dd]/30 last:border-0"
            onClick={() => onViewOrder && onViewOrder(order._id)}
          >
            <div className="flex-shrink-0">
              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium ${statusColor}`} style={{ fontFamily: FONT_FAMILY_INTER }}>
                {statusLabel}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-[#29362f] truncate" style={{ fontFamily: FONT_FAMILY_INTER }}>
                {order.orderNumber || order._id?.slice(-8).toUpperCase()}
              </p>
              <p className="text-[9px] text-gray-500 truncate" style={{ fontFamily: FONT_FAMILY_INTER }}>
                {order.customerInfo?.fullName || 'Guest'} • {order.customerInfo?.phone || 'N/A'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-[#52665a]" style={{ fontFamily: FONT_FAMILY_INTER }}>{formatCurrency(order.total)}</p>
              <p className="text-[8px] text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>{formatDate(order.createdAt)}</p>
              {isPaid && (
                <span className="text-[7px] text-[#52665a] bg-[#f7f4ef] px-1 py-0.5 rounded">Paid</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// MAIN DASHBOARD COMPONENT
// ============================================================

export default function AdminDashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Dashboard data states
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProfit: 0,
    totalProducts: 0,
    totalReviews: 0,
    paidOrders: 0,
    pendingPayment: 0,
    orderStatuses: {},
    recentOrders: [],
    topProducts: [],
    averageProfitMargin: 0,
    totalCost: 0,
    totalQuantity: 0
  });

  // Filter states - Default to current month
  const [filterType, setFilterType] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const isAdminOrSuperAdmin = ['super_admin', 'admin'].includes(userRole);
  const isModerator = userRole === 'moderator';

  // Months array
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  // Years array
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
      years.push(i);
    }
    return years;
  };

  // ============================================================
  // FETCH DASHBOARD DATA
  // ============================================================

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      // Build date range
      let startDate, endDate;
      let dateParams = {};

      if (filterType === 'all') {
        // No date filter - all time
      } else if (filterType === 'month') {
        startDate = new Date(selectedYear, selectedMonth - 1, 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(selectedYear, selectedMonth, 0);
        endDate.setHours(23, 59, 59, 999);
        dateParams = {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        };
      } else if (filterType === 'year') {
        startDate = new Date(selectedYear, 0, 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(selectedYear, 11, 31);
        endDate.setHours(23, 59, 59, 999);
        dateParams = {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        };
      }

      // ============================================================
      // 1. FETCH FILTERED ORDER STATS
      // ============================================================
      let statsUrl = 'http://localhost:5000/api/orders/admin/stats/filtered';
      if (filterType !== 'all' && dateParams.startDate && dateParams.endDate) {
        statsUrl += `?startDate=${encodeURIComponent(dateParams.startDate)}&endDate=${encodeURIComponent(dateParams.endDate)}`;
      }
      
      const statsResponse = await fetch(statsUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsResponse.json();
      const orderStats = statsData.success ? statsData.data : {};

      // ============================================================
      // 2. FETCH PROFIT MARGIN DATA (For revenue & profit)
      // ============================================================
      const profitParams = new URLSearchParams({
        orderStatus: 'delivered',
        paymentStatus: 'paid'
      });

      if (filterType !== 'all' && dateParams.startDate && dateParams.endDate) {
        profitParams.append('startDate', dateParams.startDate);
        profitParams.append('endDate', dateParams.endDate);
      }

      const profitResponse = await fetch(
        `http://localhost:5000/api/orders/admin/profit-margin?${profitParams.toString()}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const profitData = await profitResponse.json();

      // ============================================================
      // 3. FETCH RECENT ORDERS (ALL ORDERS - NOT JUST PAID)
      // ============================================================
      let ordersParams = new URLSearchParams({
        limit: 10,
        sort: '-createdAt'
      });

      if (filterType !== 'all' && dateParams.startDate && dateParams.endDate) {
        ordersParams.append('startDate', dateParams.startDate);
        ordersParams.append('endDate', dateParams.endDate);
      }

      const recentOrdersResponse = await fetch(
        `http://localhost:5000/api/orders/admin/all?${ordersParams.toString()}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const recentOrdersData = await recentOrdersResponse.json();
      const recentOrders = recentOrdersData.success ? recentOrdersData.data : [];

      // ============================================================
      // 4. FETCH PRODUCT STATS
      // ============================================================
      const productsResponse = await fetch(
        `http://localhost:5000/api/products/admin/all?limit=999`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const productsData = await productsResponse.json();
      const products = productsData.success ? productsData.data : [];
      const totalProducts = products.length;

      // ============================================================
      // 5. FETCH REVIEWS COUNT
      // ============================================================
      const reviewsResponse = await fetch(
        `http://localhost:5000/api/reviews`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const reviewsData = await reviewsResponse.json();
      const totalReviews = reviewsData.success ? reviewsData.data?.length || 0 : 0;

      // ============================================================
      // PROCESS DATA
      // ============================================================
      
      // Order stats from filtered endpoint
      const totalOrders = orderStats.totalOrders || 0;
      const pendingPayment = orderStats.pendingPayment || 0;

      // Order status distribution (FILTERED)
      const orderStatuses = {
        placed: orderStats.placedOrders || 0,
        follow_up: orderStats.followUpOrders || 0,
        reminder: orderStats.reminderOrders || 0,
        accepted: orderStats.acceptedOrders || 0,
        approved: orderStats.approvedOrders || 0,
        hold: orderStats.holdOrders || 0,
        ready_to_ship: orderStats.readyToShipOrders || 0,
        courier_assigned: orderStats.courierAssignedOrders || 0,
        processing: orderStats.processingOrders || 0,
        shipped: orderStats.shippedOrders || 0,
        out_for_delivery: orderStats.outForDeliveryOrders || 0,
        delivered: orderStats.deliveredOrders || 0,
        cancelled: orderStats.cancelledOrders || 0,
        rejected: orderStats.rejectedOrders || 0,
        returned: orderStats.returnedOrders || 0,
        partial_delivery: orderStats.partialDeliveryOrders || 0,
        refunded: orderStats.refundedOrders || 0,
        failed: orderStats.failedOrders || 0
      };

      // Profit data
      const profitSummary = profitData.success ? profitData.data.summary : {};
      const totalRevenue = profitSummary.totalRevenue || 0;
      const totalProfit = profitSummary.totalProfit || 0;
      const averageProfitMargin = profitSummary.averageProfitMargin || 0;
      const paidOrders = profitSummary.totalOrders || 0;

      // Top products from profit data
      const productDetails = profitData.success ? profitData.data.productProfitDetails || [] : [];
      const topProducts = productDetails
        .sort((a, b) => b.totalRevenue - a.totalRevenue)
        .slice(0, 5)
        .map(p => ({
          id: p.productId || `product-${Math.random()}`,
          name: p.productName || 'Unknown Product',
          sales: p.totalQuantity || 0,
          revenue: p.totalRevenue || 0,
          image: p.image || '',
          discountPrice: p.averageSellingPrice || 0,
          regularPrice: p.averageSellingPrice || 0
        }));

      // ============================================================
      // SET STATE
      // ============================================================

      setStats({
        totalOrders,
        totalRevenue,
        totalProfit,
        totalProducts,
        totalReviews,
        paidOrders: paidOrders,
        pendingPayment: pendingPayment,
        orderStatuses,
        recentOrders: recentOrders,
        topProducts,
        averageProfitMargin: averageProfitMargin
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filterType, selectedMonth, selectedYear, router]);

  // ============================================================
  // EFFECTS
  // ============================================================

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  useEffect(() => {
    if (userRole) {
      fetchDashboardData();
    }
  }, [userRole, fetchDashboardData]);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const getFilterLabel = () => {
    if (filterType === 'all') return 'All Time';
    if (filterType === 'month') {
      const month = months.find(m => m.value === selectedMonth);
      return `${month?.name} ${selectedYear}`;
    }
    return `Year ${selectedYear}`;
  };

  const orderStatuses = stats.orderStatuses || {};

  const activeStatuses = Object.entries(orderStatuses)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <ProtectedRoute pageKey="dashboard">
      <div className="min-h-screen bg-gradient-to-b from-white via-[#f7f4ef]/30 to-white p-4 md:p-6">
        <div className="max-w-7xl mx-auto">

          {/* ============================================================
              HEADER
              ============================================================ */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#52665a] to-[#71816F] rounded-xl flex items-center justify-center shadow-lg shadow-[#52665a]/20">
                <FaChartLine className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                  Dashboard
                </h1>
                <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Welcome back! Here's what's happening.
                  <span className="ml-1.5 text-[10px] text-[#52665a] font-medium bg-[#f7f4ef] px-2 py-0.5 rounded-full border border-[#e2e3dd]/60">
                    {getFilterLabel()}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e2e3dd]/60 text-[#29362f] rounded-lg hover:bg-[#f7f4ef] transition-colors text-xs disabled:opacity-50"
            >
              <FaSpinner className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* ============================================================
              COMPACT FILTERS - ALWAYS VISIBLE
              ============================================================ */}
          <div className="bg-white rounded-xl border border-[#e2e3dd]/60 shadow-sm overflow-hidden mb-4">
            <div className="flex flex-wrap items-center gap-2 p-2.5">
              <span className="text-[10px] font-medium text-gray-500 mr-1" style={{ fontFamily: FONT_FAMILY_INTER }}>View:</span>
              
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
                  filterType === 'all' ? 'bg-gradient-to-r from-[#52665a] to-[#71816F] text-white shadow-sm' : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
                }`}
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                All
              </button>
              
              <button
                onClick={() => setFilterType('month')}
                className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
                  filterType === 'month' ? 'bg-gradient-to-r from-[#52665a] to-[#71816F] text-white shadow-sm' : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
                }`}
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                Monthly
              </button>
              
              <button
                onClick={() => setFilterType('year')}
                className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
                  filterType === 'year' ? 'bg-gradient-to-r from-[#52665a] to-[#71816F] text-white shadow-sm' : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
                }`}
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                Yearly
              </button>

              <div className="h-5 w-px bg-[#e2e3dd]/60 mx-1"></div>

              {filterType === 'month' && (
                <div className="flex items-center gap-1.5">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="px-2 py-1 text-[10px] border border-[#e2e3dd]/60 rounded-lg focus:ring-1 focus:ring-[#52665a] focus:border-transparent bg-white text-[#29362f]"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    {months.map(month => (
                      <option key={month.value} value={month.value}>{month.name}</option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="px-2 py-1 text-[10px] border border-[#e2e3dd]/60 rounded-lg focus:ring-1 focus:ring-[#52665a] focus:border-transparent bg-white text-[#29362f]"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    {getYears().map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              )}

              {filterType === 'year' && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-2 py-1 text-[10px] border border-[#e2e3dd]/60 rounded-lg focus:ring-1 focus:ring-[#52665a] focus:border-transparent bg-white text-[#29362f]"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  {getYears().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              )}

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="ml-auto px-2.5 py-1 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white text-[10px] font-medium rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all disabled:opacity-50"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                Apply
              </button>
            </div>
          </div>

          {/* ============================================================
              STATS CARDS - ROLE BASED
              ============================================================ */}

          {/* ADMIN/SUPER ADMIN: Full stats */}
          {isAdminOrSuperAdmin && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <StatCard
                title="Revenue"
                value={formatCurrency(stats.totalRevenue)}
                icon={<FaMoneyBillWave className="w-3.5 h-3.5 text-[#52665a]" />}
                color="bg-[#f7f4ef]"
                subtitle={`${getFilterLabel()}`}
                loading={loading}
              />
              <StatCard
                title="Profit"
                value={formatCurrency(stats.totalProfit)}
                icon={<FaChartLine className="w-3.5 h-3.5 text-[#52665a]" />}
                color="bg-[#f7f4ef]"
                subtitle={`${stats.averageProfitMargin?.toFixed(1) || 0}% margin`}
                loading={loading}
              />
              <StatCard
                title="Orders"
                value={stats.totalOrders}
                icon={<FaShoppingCart className="w-3.5 h-3.5 text-[#52665a]" />}
                color="bg-[#f7f4ef]"
                subtitle={`${stats.paidOrders} delivered & paid`}
                loading={loading}
              />
              <StatCard
                title="Products"
                value={stats.totalProducts}
                icon={<FaBox className="w-3.5 h-3.5 text-[#52665a]" />}
                color="bg-[#f7f4ef]"
                loading={loading}
              />
            </div>
          )}

          {/* MODERATOR: Limited stats */}
          {isModerator && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              <StatCard
                title="Orders"
                value={stats.totalOrders}
                icon={<FaShoppingCart className="w-3.5 h-3.5 text-[#52665a]" />}
                color="bg-[#f7f4ef]"
                subtitle={`${getFilterLabel()}`}
                loading={loading}
              />
              <StatCard
                title="Products"
                value={stats.totalProducts}
                icon={<FaBox className="w-3.5 h-3.5 text-[#52665a]" />}
                color="bg-[#f7f4ef]"
                loading={loading}
              />
              <StatCard
                title="Reviews"
                value={stats.totalReviews}
                icon={<FaStar className="w-3.5 h-3.5 text-[#52665a]" />}
                color="bg-[#f7f4ef]"
                loading={loading}
              />
            </div>
          )}

          {/* ============================================================
              ORDER STATUS OVERVIEW (FILTERED)
              ============================================================ */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* Order Status Cards */}
            <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-[#29362f] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                  <FaClock className="w-4 h-4 text-[#52665a]" />
                  Order Status
                  <span className="text-[10px] font-normal text-gray-500 bg-[#f7f4ef] px-1.5 py-0.5 rounded-full border border-[#e2e3dd]/60">
                    {getFilterLabel()}
                  </span>
                </h2>
                <button
                  onClick={() => router.push('/authorize/orders')}
                  className="text-[10px] text-[#52665a] hover:text-[#405347] flex items-center gap-0.5 transition-colors"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  View All <FaArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={`status-loading-${i}`} className="p-2 rounded-xl border border-[#e2e3dd]/60 animate-pulse">
                      <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-1/2 mb-1.5"></div>
                      <div className="h-5 bg-[#e2e3dd]/60 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              ) : activeStatuses.length === 0 ? (
                <div className="text-center py-4 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  <FaClipboardList className="w-5 h-5 mx-auto mb-1 text-[#e2e3dd]" />
                  No orders found for {getFilterLabel()}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {activeStatuses.slice(0, 8).map(([status, count]) => (
                    <OrderStatusCard
                      key={`status-${status}`}
                      status={status}
                      count={count}
                      totalOrders={stats.totalOrders}
                      onClick={() => router.push(`/authorize/orders?status=${status}`)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Top Selling Products */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-[#29362f] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                  <FaFire className="w-4 h-4 text-[#52665a]" />
                  Top Products
                </h2>
                <button
                  onClick={() => router.push('/authorize/all-products')}
                  className="text-[10px] text-[#52665a] hover:text-[#405347] flex items-center gap-0.5 transition-colors"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  View All <FaArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>

              <TopProductsList
                products={stats.topProducts}
                loading={loading}
              />
            </div>
          </div>

          {/* ============================================================
              ADDITIONAL STATS - ADMIN ONLY
              ============================================================ */}

          {isAdminOrSuperAdmin && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <StatCard
                title="Delivered & Paid Orders"
                value={stats.paidOrders}
                icon={<FaCheckCircle className="w-3.5 h-3.5 text-[#52665a]" />}
                color="bg-[#f7f4ef]"
                subtitle={`${getFilterLabel()}`}
                loading={loading}
                onClick={() => router.push('/authorize/orders?status=delivered')}
              />
              <StatCard
                title="Pending Payments"
                value={stats.pendingPayment}
                icon={<FaClock className="w-3.5 h-3.5 text-[#52665a]" />}
                color="bg-[#f7f4ef]"
                loading={loading}
                onClick={() => router.push('/authorize/orders?payment=pending')}
              />
            </div>
          )}

          {/* ============================================================
              RECENT ORDERS (ALL ORDERS - NOT JUST PAID)
              ============================================================ */}

          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#29362f] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                <FaTruck className="w-4 h-4 text-[#52665a]" />
                Recent Orders
                <span className="text-[10px] font-normal text-gray-500 bg-[#f7f4ef] px-1.5 py-0.5 rounded-full border border-[#e2e3dd]/60">
                  {getFilterLabel()}
                </span>
              </h2>
              <button
                onClick={() => router.push('/authorize/orders')}
                className="text-[10px] text-[#52665a] hover:text-[#405347] flex items-center gap-0.5 transition-colors"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                View All <FaArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>

            <RecentOrdersList
              orders={stats.recentOrders}
              loading={loading}
              onViewOrder={(orderId) => router.push(`/authorize/orders?view=${orderId}`)}
            />
          </div>

          {/* ============================================================
              ROLE INDICATOR
              ============================================================ */}

          <div className="mt-4 text-center text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white rounded-full border border-[#e2e3dd]/60">
              <FaUserCircle className="w-3 h-3 text-[#52665a]" />
              Role: <span className="font-medium text-[#29362f]">
                {userRole ? userRole.replace('_', ' ').toUpperCase() : 'Unknown'}
              </span>
              {isAdminOrSuperAdmin && (
                <span className="text-[8px] text-[#52665a] bg-[#f7f4ef] px-1 py-0.5 rounded-full border border-[#e2e3dd]/60">
                  Full Access
                </span>
              )}
              {isModerator && (
                <span className="text-[8px] text-[#52665a] bg-[#f7f4ef] px-1 py-0.5 rounded-full border border-[#e2e3dd]/60">
                  Limited
                </span>
              )}
            </span>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}