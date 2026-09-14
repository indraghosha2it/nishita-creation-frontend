
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { toast } from 'sonner';
// import {
//   FaChartLine,
//   FaMoneyBillWave,
//   FaShoppingCart,
//   FaBox,
//   FaFilter,
//   FaCalendarAlt,
//   FaChevronDown,
//   FaChevronUp,
//   FaSpinner,
//   FaPercentage,
//   FaDollarSign,
//   FaEye,
//   FaInfoCircle,
//   FaCalendarDay,
//   FaCalendarWeek,
//   FaCalendar
// } from 'react-icons/fa';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// export default function ProfitMarginPage() {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(null);
//   const [period, setPeriod] = useState('month');
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedDay, setSelectedDay] = useState(new Date().getDate());
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortBy, setSortBy] = useState('profit_desc');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showOrderDetails, setShowOrderDetails] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

//   const getMonthName = (month) => {
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     return months[month];
//   };

//   const formatDateLocal = (date) => {
//     const y = date.getFullYear();
//     const m = String(date.getMonth() + 1).padStart(2, '0');
//     const d = String(date.getDate()).padStart(2, '0');
//     return `${y}-${m}-${d}`;
//   };

//   const getDateRange = useCallback(() => {
//     const year = selectedYear;
//     const month = selectedMonth;
//     const day = selectedDay;

//     switch (period) {
//       case 'day': {
//         const date = new Date(year, month, day);
//         const dateStr = formatDateLocal(date);
//         return { startDate: dateStr, endDate: dateStr };
//       }
//       case 'week': {
//         const today = new Date(year, month, day);
//         const dayOfWeek = today.getDay();
//         const start = new Date(today);
//         start.setDate(today.getDate() - dayOfWeek);
//         const end = new Date(today);
//         end.setDate(today.getDate() + (6 - dayOfWeek));
//         return { startDate: formatDateLocal(start), endDate: formatDateLocal(end) };
//       }
//       case 'month': {
//         const start = new Date(year, month, 1);
//         const end = new Date(year, month + 1, 0);
//         return { startDate: formatDateLocal(start), endDate: formatDateLocal(end) };
//       }
//       case 'year': {
//         const start = new Date(year, 0, 1);
//         const end = new Date(year, 11, 31);
//         return { startDate: formatDateLocal(start), endDate: formatDateLocal(end) };
//       }
//       case 'custom':
//         return { startDate, endDate };
//       default:
//         return { startDate: '', endDate: '' };
//     }
//   }, [period, selectedYear, selectedMonth, selectedDay, startDate, endDate]);

//   const fetchProfitMargin = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const params = new URLSearchParams({
//         orderStatus: 'delivered',
//         paymentStatus: 'paid'
//       });

//       const dateRange = getDateRange();
//       if (dateRange.startDate && dateRange.endDate) {
//         params.append('startDate', dateRange.startDate);
//         params.append('endDate', dateRange.endDate);
//       }

//       const response = await fetch(
//         `http://localhost:5000/api/orders/admin/profit-margin?${params}`,
//         {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }
//       );

//       const result = await response.json();
//       if (result.success) {
//         setData(result.data);
//       } else {
//         toast.error(result.error || 'Failed to fetch profit data');
//       }
//     } catch (error) {
//       console.error('Fetch profit margin error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   }, [getDateRange]);

//   useEffect(() => {
//     fetchProfitMargin();
//   }, [fetchProfitMargin]);

//   const formatCurrency = (amount) => {
//     return `৳${parseFloat(amount || 0).toFixed(2)}`;
//   };

//   const getSortedProducts = () => {
//     if (!data?.productProfitDetails) return [];
//     const sorted = [...data.productProfitDetails];
//     switch (sortBy) {
//       case 'profit_desc':
//         return sorted.sort((a, b) => b.totalProfit - a.totalProfit);
//       case 'profit_asc':
//         return sorted.sort((a, b) => a.totalProfit - b.totalProfit);
//       case 'revenue_desc':
//         return sorted.sort((a, b) => b.totalRevenue - a.totalRevenue);
//       case 'revenue_asc':
//         return sorted.sort((a, b) => a.totalRevenue - b.totalRevenue);
//       case 'margin_desc':
//         return sorted.sort((a, b) => parseFloat(b.profitMargin) - parseFloat(a.profitMargin));
//       case 'margin_asc':
//         return sorted.sort((a, b) => parseFloat(a.profitMargin) - parseFloat(b.profitMargin));
//       case 'quantity_desc':
//         return sorted.sort((a, b) => b.totalQuantity - a.totalQuantity);
//       default:
//         return sorted;
//     }
//   };

//   const getFilteredProducts = () => {
//     const products = getSortedProducts();
//     if (!searchTerm.trim()) return products;
//     return products.filter(p =>
//       p.productName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   const filteredProducts = getFilteredProducts();

//   const getPeriodLabel = () => {
//     const dateRange = getDateRange();
//     if (!dateRange.startDate || !dateRange.endDate) return 'All Time';

//     const start = new Date(dateRange.startDate + 'T00:00:00');
//     const end = new Date(dateRange.endDate + 'T00:00:00');

//     switch (period) {
//       case 'day':
//         return start.toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' });
//       case 'week':
//         return `${start.toLocaleDateString('en-BD', { day: '2-digit', month: 'short' })} - ${end.toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' })}`;
//       case 'month':
//         return `${getMonthName(selectedMonth)} ${selectedYear}`;
//       case 'year':
//         return selectedYear;
//       case 'custom':
//         return `${dateRange.startDate} to ${dateRange.endDate}`;
//       default:
//         return 'All Time';
//     }
//   };

//   const renderPeriodControls = () => {
//     switch (period) {
//       case 'day':
//         return (
//           <div className="grid grid-cols-3 gap-3">
//             <div>
//               <label className="block text-xs font-medium text-[#EE4275]/60 mb-1">Day</label>
//               <select
//                 value={selectedDay}
//                 onChange={(e) => setSelectedDay(parseInt(e.target.value))}
//                 className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
//               >
//                 {[...Array(getDaysInMonth(selectedYear, selectedMonth))].map((_, i) => (
//                   <option key={i + 1} value={i + 1}>{i + 1}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-[#EE4275]/60 mb-1">Month</label>
//               <select
//                 value={selectedMonth}
//                 onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//                 className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
//               >
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i} value={i}>{getMonthName(i)}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-[#EE4275]/60 mb-1">Year</label>
//               <select
//                 value={selectedYear}
//                 onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                 className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
//               >
//                 {[...Array(5)].map((_, i) => {
//                   const year = new Date().getFullYear() - i;
//                   return <option key={year} value={year}>{year}</option>;
//                 })}
//               </select>
//             </div>
//           </div>
//         );

//       case 'month':
//         return (
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-xs font-medium text-[#EE4275]/60 mb-1">Month</label>
//               <select
//                 value={selectedMonth}
//                 onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//                 className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
//               >
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i} value={i}>{getMonthName(i)}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-[#EE4275]/60 mb-1">Year</label>
//               <select
//                 value={selectedYear}
//                 onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                 className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
//               >
//                 {[...Array(5)].map((_, i) => {
//                   const year = new Date().getFullYear() - i;
//                   return <option key={year} value={year}>{year}</option>;
//                 })}
//               </select>
//             </div>
//           </div>
//         );

//       case 'year':
//         return (
//           <div className="grid grid-cols-1 gap-3">
//             <div>
//               <label className="block text-xs font-medium text-[#EE4275]/60 mb-1">Year</label>
//               <select
//                 value={selectedYear}
//                 onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                 className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
//               >
//                 {[...Array(10)].map((_, i) => {
//                   const year = new Date().getFullYear() - i;
//                   return <option key={year} value={year}>{year}</option>;
//                 })}
//               </select>
//             </div>
//           </div>
//         );

//       case 'custom':
//         return (
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-xs font-medium text-[#EE4275]/60 mb-1">Start Date</label>
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-[#EE4275]/60 mb-1">End Date</label>
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
//               />
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   const SummaryCard = ({ title, value, subtitle, icon, color }) => (
//     <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F7C7D3]/40 hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-sm text-[#EE4275]/60 font-medium">{title}</p>
//           <p className="text-2xl font-bold text-[#2D1B2E] mt-1">{value}</p>
//           {subtitle && (
//             <p className="text-xs text-[#EE4275]/60 mt-1">{subtitle}</p>
//           )}
//         </div>
//         <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );

//   // ============================================================
//   // RENDER: Variant breakdown table (used in View modal)
//   // ============================================================
//   const renderVariantBreakdown = (product) => {
//     const breakdown = product.variantBreakdown || [];
//     if (breakdown.length === 0) return null;

//     // Group by variantId for hierarchical display
//     const grouped = {};
//     breakdown.forEach(row => {
//       if (!grouped[row.variantId]) grouped[row.variantId] = [];
//       grouped[row.variantId].push(row);
//     });

//     const allRows = [];
//     Object.values(grouped).forEach(variantRows => {
//       // Sort: variant row first, then sub-variant rows
//       variantRows.sort((a, b) => {
//         if (a.isVariantRow && !b.isVariantRow) return -1;
//         if (!a.isVariantRow && b.isVariantRow) return 1;
//         return 0;
//       });
//       allRows.push(...variantRows);
//     });

//     return (
//       <div className="overflow-x-auto rounded-xl border border-[#F7C7D3]/40">
//         <table className="w-full text-xs">
//           <thead className="bg-[#FFF5F6]">
//             <tr>
//               <th className="px-3 py-2 text-left text-[10px] font-medium text-[#EE4275]/60 uppercase tracking-wider">Variant / Sub-Variant</th>
//               <th className="px-3 py-2 text-center text-[10px] font-medium text-[#EE4275]/60 uppercase tracking-wider">Qty</th>
//               <th className="px-3 py-2 text-right text-[10px] font-medium text-[#EE4275]/60 uppercase tracking-wider">Revenue</th>
//               <th className="px-3 py-2 text-right text-[10px] font-medium text-[#EE4275]/60 uppercase tracking-wider">Cost</th>
//               <th className="px-3 py-2 text-right text-[10px] font-medium text-[#EE4275]/60 uppercase tracking-wider">Profit</th>
//               <th className="px-3 py-2 text-center text-[10px] font-medium text-[#EE4275]/60 uppercase tracking-wider">Margin</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allRows.map((row, idx) => {
//               const isSubRow = row.isSubVariantRow;
//               const rowProfit = row.profit;
//               const rowMargin = parseFloat(row.profitMargin);

//               return (
//                 <tr
//                   key={`${row.variantId}-${row.subVariantId || 'main'}-${idx}`}
//                   className={`border-b border-[#F7C7D3]/20 ${
//                     isSubRow ? 'bg-blue-50/20' : 'bg-purple-50/20'
//                   }`}
//                 >
//                   <td className={`px-3 py-2 ${isSubRow ? 'pl-8' : 'pl-4'}`}>
//                     <div className="flex items-center gap-1.5">
//                       <span className="text-[10px] text-[#EE4275]/40">
//                         {isSubRow ? '→' : '▸'}
//                       </span>
//                       <span className={`text-xs ${
//                         isSubRow ? 'text-gray-600' : 'font-medium text-purple-700'
//                       }`}>
//                         {isSubRow ? row.subVariantName : row.variantName}
//                       </span>
//                       {!isSubRow && (
//                         <span className="text-[8px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-600">
//                           Variant
//                         </span>
//                       )}
//                       {isSubRow && (
//                         <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
//                           Sub
//                         </span>
//                       )}
//                     </div>
//                     {isSubRow && (
//                       <p className="text-[9px] text-[#EE4275]/50 ml-4 mt-0.5">
//                         {row.variantName}
//                       </p>
//                     )}
//                   </td>
//                   <td className="px-3 py-2 text-center text-xs text-[#2D1B2E]">
//                     {row.quantity}
//                   </td>
//                   <td className="px-3 py-2 text-right text-xs text-emerald-600">
//                     {formatCurrency(row.revenue)}
//                   </td>
//                   <td className="px-3 py-2 text-right text-xs text-orange-600">
//                     {formatCurrency(row.cost)}
//                   </td>
//                   <td className="px-3 py-2 text-right text-xs font-medium">
//                     <span className={rowProfit > 0 ? 'text-emerald-600' : rowProfit < 0 ? 'text-red-600' : 'text-[#EE4275]/60'}>
//                       {formatCurrency(rowProfit)}
//                     </span>
//                   </td>
//                   <td className="px-3 py-2 text-center">
//                     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
//                       rowMargin > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
//                       rowMargin < 0 ? 'bg-red-50 text-red-700 border border-red-200' :
//                       'bg-[#F7C7D3]/20 text-[#EE4275]/60 border border-[#F7C7D3]/40'
//                     }`}>
//                       <FaPercentage className="w-2 h-2" />
//                       {row.profitMargin}%
//                     </span>
//                   </td>
//                 </tr>
//               );
//             })}
//             {/* Product Total Row */}
//             <tr className="border-t-2 border-[#F7C7D3]/50 bg-[#FFF5F6]">
//               <td className="px-3 py-2 text-xs font-bold text-[#2D1B2E]">Product Total</td>
//               <td className="px-3 py-2 text-center text-xs font-bold text-[#2D1B2E]">
//                 {product.totalQuantity}
//               </td>
//               <td className="px-3 py-2 text-right text-xs font-bold text-emerald-600">
//                 {formatCurrency(product.totalRevenue)}
//               </td>
//               <td className="px-3 py-2 text-right text-xs font-bold text-orange-600">
//                 {formatCurrency(product.totalCost)}
//               </td>
//               <td className="px-3 py-2 text-right text-xs font-bold">
//                 <span className={product.totalProfit > 0 ? 'text-emerald-600' : 'text-red-600'}>
//                   {formatCurrency(product.totalProfit)}
//                 </span>
//               </td>
//               <td className="px-3 py-2 text-center">
//                 <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
//                   parseFloat(product.profitMargin) > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
//                 }`}>
//                   <FaPercentage className="w-2 h-2" />
//                   {product.profitMargin}%
//                 </span>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <ProtectedRoute pageKey="profit_margin">
//       <div className="min-h-screen bg-[#FFF5F6] p-4 md:p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-11 h-11 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-xl flex items-center justify-center shadow-lg shadow-[#EE4275]/25">
//                 <FaChartLine className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-[#2D1B2E]">Profit Margin</h1>
//                 <p className="text-sm text-[#EE4275]/60">
//                   Track profitability of delivered & paid orders
//                   <span className="ml-2 text-xs text-[#EE4275] font-medium bg-[#FFF5F6] px-2 py-0.5 rounded-full border border-[#EE4275]/20">
//                     {getPeriodLabel()}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 flex-wrap">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-colors text-sm ${
//                   showFilters ? 'bg-[#EE4275] text-white border-[#EE4275]' : 'bg-white border-[#F7C7D3]/50 text-[#2D1B2E] hover:bg-[#FFF5F6]'
//                 }`}
//               >
//                 <FaFilter className="w-4 h-4" />
//                 Filters
//                 {showFilters ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
//               </button>
//             </div>
//           </div>

//           {/* Filters */}
//           {showFilters && (
//             <div className="bg-white rounded-2xl border border-[#F7C7D3]/40 shadow-sm overflow-hidden mb-6">
//               {/* Period Type Tabs */}
//               <div className="p-4 border-b border-[#F7C7D3]/40 bg-[#FFF5F6]">
//                 <div className="flex flex-wrap items-center gap-2">
//                   <span className="text-xs font-medium text-[#EE4275]/60 mr-2">View by:</span>
//                   <button
//                     onClick={() => setPeriod('day')}
//                     className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
//                       period === 'day' ? 'bg-[#EE4275] text-white shadow-sm' : 'bg-white text-[#2D1B2E] hover:bg-[#FFF5F6] border border-[#F7C7D3]/50'
//                     }`}
//                   >
//                     <FaCalendarDay className="w-3 h-3" />
//                     Day
//                   </button>
//                   <button
//                     onClick={() => setPeriod('week')}
//                     className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
//                       period === 'week' ? 'bg-[#EE4275] text-white shadow-sm' : 'bg-white text-[#2D1B2E] hover:bg-[#FFF5F6] border border-[#F7C7D3]/50'
//                     }`}
//                   >
//                     <FaCalendarWeek className="w-3 h-3" />
//                     Week
//                   </button>
//                   <button
//                     onClick={() => setPeriod('month')}
//                     className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
//                       period === 'month' ? 'bg-[#EE4275] text-white shadow-sm' : 'bg-white text-[#2D1B2E] hover:bg-[#FFF5F6] border border-[#F7C7D3]/50'
//                     }`}
//                   >
//                     <FaCalendarAlt className="w-3 h-3" />
//                     Month
//                   </button>
//                   <button
//                     onClick={() => setPeriod('year')}
//                     className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
//                       period === 'year' ? 'bg-[#EE4275] text-white shadow-sm' : 'bg-white text-[#2D1B2E] hover:bg-[#FFF5F6] border border-[#F7C7D3]/50'
//                     }`}
//                   >
//                     <FaCalendar className="w-3 h-3" />
//                     Year
//                   </button>
//                   <button
//                     onClick={() => setPeriod('custom')}
//                     className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
//                       period === 'custom' ? 'bg-[#EE4275] text-white shadow-sm' : 'bg-white text-[#2D1B2E] hover:bg-[#FFF5F6] border border-[#F7C7D3]/50'
//                     }`}
//                   >
//                     Custom
//                   </button>
//                 </div>
//               </div>

//               {/* Period Controls */}
//               <div className="p-4">
//                 {renderPeriodControls()}
//               </div>

//               {/* Quick Stats */}
//               {data && (
//                 <div className="px-4 py-3 bg-[#FFF5F6] border-t border-[#F7C7D3]/40 grid grid-cols-2 md:grid-cols-4 gap-3">
//                   <div className="text-center">
//                     <p className="text-[10px] text-[#EE4275]/60 uppercase tracking-wide">Period</p>
//                     <p className="text-sm font-semibold text-[#2D1B2E]">{getPeriodLabel()}</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-[10px] text-[#EE4275]/60 uppercase tracking-wide">Product Orders</p>
//                     <p className="text-sm font-semibold text-[#2D1B2E]">{data.summary.totalOrders}</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-[10px] text-[#EE4275]/60 uppercase tracking-wide">Revenue</p>
//                     <p className="text-sm font-semibold text-emerald-600">{formatCurrency(data.summary.totalRevenue)}</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-[10px] text-[#EE4275]/60 uppercase tracking-wide">Profit</p>
//                     <p className={`text-sm font-semibold ${data.summary.totalProfit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
//                       {formatCurrency(data.summary.totalProfit)}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && (
//             <div className="bg-white rounded-2xl p-12 text-center border border-[#F7C7D3]/40">
//               <FaSpinner className="w-8 h-8 text-[#EE4275] animate-spin mx-auto mb-4" />
//               <p className="text-[#EE4275]/60">Calculating profit margins...</p>
//             </div>
//           )}

//           {/* Data Display */}
//           {!loading && data && (
//             <>
//               {/* Summary Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                 <SummaryCard
//                   title="Total Product Orders"
//                   value={data.summary.totalOrders}
//                   icon={<FaShoppingCart className="w-5 h-5 text-[#EE4275]" />}
//                   color="bg-[#FFF5F6]"
//                 />
//                 <SummaryCard
//                   title="Total Revenue"
//                   value={formatCurrency(data.summary.totalRevenue)}
//                   icon={<FaDollarSign className="w-5 h-5 text-emerald-500" />}
//                   color="bg-emerald-50"
//                 />
//                 <SummaryCard
//                   title="Total Cost"
//                   value={formatCurrency(data.summary.totalCost)}
//                   icon={<FaMoneyBillWave className="w-5 h-5 text-orange-500" />}
//                   color="bg-orange-50"
//                 />
//                 <SummaryCard
//                   title="Total Profit"
//                   value={formatCurrency(data.summary.totalProfit)}
//                   subtitle={`${data.summary.averageProfitMargin}% average margin`}
//                   icon={<FaChartLine className="w-5 h-5 text-[#EE4275]" />}
//                   color="bg-[#FFF5F6]"
//                 />
//               </div>

//               {/* Product Profit Breakdown */}
//               <div className="bg-white rounded-2xl border border-[#F7C7D3]/40 shadow-sm overflow-hidden">
//                 <div className="p-4 border-b border-[#F7C7D3]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//                   <div className="flex items-center gap-2">
//                     <FaBox className="w-5 h-5 text-[#EE4275]" />
//                     <h2 className="text-lg font-semibold text-[#2D1B2E]">Product Profit Breakdown</h2>
//                     <span className="text-xs text-[#EE4275]/60 bg-[#FFF5F6] px-2 py-1 rounded-full border border-[#F7C7D3]/40">
//                       {data.productProfitDetails.length} products
//                     </span>
//                     <span className="text-xs text-[#EE4275] bg-[#FFF5F6] px-2 py-1 rounded-full border border-[#EE4275]/20">
//                       {getPeriodLabel()}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2 w-full sm:w-auto">
//                     <input
//                       type="text"
//                       placeholder="Search products..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="flex-1 sm:w-48 px-3 py-1.5 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-[#FFF5F6] text-sm text-[#2D1B2E] placeholder:text-[#EE4275]/40"
//                     />
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="px-3 py-1.5 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-[#FFF5F6] text-sm text-[#2D1B2E]"
//                     >
//                       <option value="profit_desc">Highest Profit</option>
//                       <option value="profit_asc">Lowest Profit</option>
//                       <option value="margin_desc">Highest Margin</option>
//                       <option value="margin_asc">Lowest Margin</option>
//                       <option value="revenue_desc">Highest Revenue</option>
//                       <option value="quantity_desc">Most Sold</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-[#FFF5F6]">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-[#EE4275]/60">Product</th>
//                         <th className="px-4 py-3 text-center text-xs font-medium text-[#EE4275]/60">Qty Sold</th>
//                         <th className="px-4 py-3 text-right text-xs font-medium text-[#EE4275]/60">Revenue</th>
//                         <th className="px-4 py-3 text-right text-xs font-medium text-[#EE4275]/60">Cost</th>
//                         <th className="px-4 py-3 text-right text-xs font-medium text-[#EE4275]/60">Profit</th>
//                         <th className="px-4 py-3 text-center text-xs font-medium text-[#EE4275]/60">Margin</th>
//                         <th className="px-4 py-3 text-center text-xs font-medium text-[#EE4275]/60">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProducts.length === 0 ? (
//                         <tr>
//                           <td colSpan="7" className="px-4 py-8 text-center text-[#EE4275]/60 text-sm">
//                             No products found
//                           </td>
//                         </tr>
//                       ) : (
//                         filteredProducts.map((product, index) => {
//                           const profitMargin = parseFloat(product.profitMargin);
//                           const isPositive = profitMargin > 0;
//                           const isNegative = profitMargin < 0;
//                           const variantCount = (product.variantBreakdown || []).length;

//                           return (
//                             <tr key={index} className="border-b border-[#F7C7D3]/20 hover:bg-[#FFF5F6] transition-colors">
//                               <td className="px-4 py-3">
//                                 <div className="flex items-center gap-3">
//                                   {product.image ? (
//                                     <img
//                                       src={product.image}
//                                       alt={product.productName}
//                                       className="w-8 h-8 rounded-lg object-cover border border-[#F7C7D3]/40"
//                                     />
//                                   ) : (
//                                     <div className="w-8 h-8 rounded-lg bg-[#FFF5F6] flex items-center justify-center">
//                                       <FaBox className="w-4 h-4 text-[#EE4275]/40" />
//                                     </div>
//                                   )}
//                                   <div>
//                                     <div className="flex items-center gap-2">
//                                       <p className="text-sm font-medium text-[#2D1B2E] truncate max-w-[200px]">
//                                         {product.productName}
//                                       </p>
//                                       {product.hasVariants && variantCount > 0 && (
//                                         <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-200 whitespace-nowrap">
//                                           {variantCount} variant{variantCount > 1 ? 's' : ''}
//                                         </span>
//                                       )}
//                                     </div>
//                                     <p className="text-xs text-[#EE4275]/60">
//                                       Avg: {formatCurrency(product.averageSellingPrice)} / {formatCurrency(product.averageBuyingPrice)}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-4 py-3 text-center text-sm text-[#2D1B2E]">
//                                 {product.totalQuantity}
//                               </td>
//                               <td className="px-4 py-3 text-right text-sm text-emerald-600">
//                                 {formatCurrency(product.totalRevenue)}
//                               </td>
//                               <td className="px-4 py-3 text-right text-sm text-orange-600">
//                                 {formatCurrency(product.totalCost)}
//                               </td>
//                               <td className="px-4 py-3 text-right text-sm font-semibold">
//                                 <span className={isPositive ? 'text-emerald-600' : isNegative ? 'text-red-600' : 'text-[#EE4275]/60'}>
//                                   {formatCurrency(product.totalProfit)}
//                                 </span>
//                               </td>
//                               <td className="px-4 py-3 text-center">
//                                 <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
//                                   isPositive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
//                                   isNegative ? 'bg-red-50 text-red-700 border border-red-200' :
//                                   'bg-[#F7C7D3]/20 text-[#EE4275]/60 border border-[#F7C7D3]/40'
//                                 }`}>
//                                   <FaPercentage className="w-2.5 h-2.5" />
//                                   {profitMargin.toFixed(2)}%
//                                 </span>
//                               </td>
//                               <td className="px-4 py-3 text-center">
//                                 <button
//                                   onClick={() => {
//                                     setSelectedProduct(product);
//                                     setShowOrderDetails(true);
//                                   }}
//                                   className="text-[#EE4275] hover:text-[#EE4275]/80 transition-colors text-xs flex items-center gap-1 mx-auto"
//                                 >
//                                   <FaEye className="w-3 h-3" />
//                                   View
//                                 </button>
//                               </td>
//                             </tr>
//                           );
//                         })
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Period Summary */}
//               {data.periodSummary && data.periodSummary.length > 0 && (
//                 <div className="bg-white rounded-2xl border border-[#F7C7D3]/40 shadow-sm overflow-hidden mt-6">
//                   <div className="p-4 border-b border-[#F7C7D3]/40">
//                     <h3 className="text-lg font-semibold text-[#2D1B2E] flex items-center gap-2">
//                       <FaCalendarAlt className="w-5 h-5 text-[#EE4275]" />
//                       Daily Performance
//                       <span className="text-xs text-[#EE4275]/60 font-normal bg-[#FFF5F6] px-2 py-0.5 rounded-full border border-[#F7C7D3]/40">
//                         {getPeriodLabel()}
//                       </span>
//                     </h3>
//                   </div>
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="bg-[#FFF5F6]">
//                         <tr>
//                           <th className="px-4 py-2 text-left text-xs font-medium text-[#EE4275]/60">Date</th>
//                           <th className="px-4 py-2 text-center text-xs font-medium text-[#EE4275]/60">Orders</th>
//                           <th className="px-4 py-2 text-center text-xs font-medium text-[#EE4275]/60">Items</th>
//                           <th className="px-4 py-2 text-right text-xs font-medium text-[#EE4275]/60">Revenue</th>
//                           <th className="px-4 py-2 text-right text-xs font-medium text-[#EE4275]/60">Cost</th>
//                           <th className="px-4 py-2 text-right text-xs font-medium text-[#EE4275]/60">Profit</th>
//                           <th className="px-4 py-2 text-center text-xs font-medium text-[#EE4275]/60">Margin</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {data.periodSummary.map((day, index) => (
//                           <tr key={index} className="border-b border-[#F7C7D3]/20 hover:bg-[#FFF5F6] transition-colors">
//                             <td className="px-4 py-2 text-sm text-[#2D1B2E]">
//                               {new Date(day.date).toLocaleDateString('en-BD', {
//                                 day: '2-digit',
//                                 month: 'short',
//                                 year: 'numeric'
//                               })}
//                             </td>
//                             <td className="px-4 py-2 text-center text-sm text-[#2D1B2E]">{day.orders}</td>
//                             <td className="px-4 py-2 text-center text-sm text-[#EE4275]/60">{day.itemsSold}</td>
//                             <td className="px-4 py-2 text-right text-sm text-emerald-600">{formatCurrency(day.revenue)}</td>
//                             <td className="px-4 py-2 text-right text-sm text-orange-600">{formatCurrency(day.cost)}</td>
//                             <td className="px-4 py-2 text-right text-sm font-semibold">
//                               <span className={day.profit > 0 ? 'text-emerald-600' : day.profit < 0 ? 'text-red-600' : 'text-[#EE4275]/60'}>
//                                 {formatCurrency(day.profit)}
//                               </span>
//                             </td>
//                             <td className="px-4 py-2 text-center">
//                               <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
//                                 day.profitMargin > 10 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
//                                 day.profitMargin > 0 ? 'bg-[#FFF5F6] text-[#EE4275] border border-[#EE4275]/20' :
//                                 day.profitMargin === 0 ? 'bg-[#F7C7D3]/20 text-[#EE4275]/60 border border-[#F7C7D3]/40' :
//                                 'bg-red-50 text-red-700 border border-red-200'
//                               }`}>
//                                 <FaPercentage className="w-2.5 h-2.5" />
//                                 {day.profitMargin}%
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               {/* Product Details Modal */}
//               {showOrderDetails && selectedProduct && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//                   <div className="bg-white rounded-2xl border border-[#F7C7D3]/40 shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden">
//                     <div className="p-4 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white flex items-center justify-between">
//                       <div>
//                         <h3 className="text-lg font-bold">Product Profit Details</h3>
//                         <p className="text-sm text-white/80">{selectedProduct.productName}</p>
//                       </div>
//                       <button
//                         onClick={() => setShowOrderDetails(false)}
//                         className="p-1 hover:bg-white/20 rounded-lg transition-colors"
//                       >
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </div>

//                     <div className="p-6 overflow-y-auto max-h-[65vh]">
//                       {/* Top summary cards */}
//                       <div className="grid grid-cols-2 gap-4 mb-6">
//                         <div className="bg-[#FFF5F6] rounded-xl p-3 text-center border border-[#F7C7D3]/40">
//                           <p className="text-xs text-[#EE4275]/60">Total Revenue</p>
//                           <p className="text-xl font-bold text-emerald-600">{formatCurrency(selectedProduct.totalRevenue)}</p>
//                         </div>
//                         <div className="bg-[#FFF5F6] rounded-xl p-3 text-center border border-[#F7C7D3]/40">
//                           <p className="text-xs text-[#EE4275]/60">Total Profit</p>
//                           <p className={`text-xl font-bold ${selectedProduct.totalProfit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
//                             {formatCurrency(selectedProduct.totalProfit)}
//                           </p>
//                         </div>
//                         <div className="bg-[#FFF5F6] rounded-xl p-3 text-center border border-[#F7C7D3]/40">
//                           <p className="text-xs text-[#EE4275]/60">Quantity Sold</p>
//                           <p className="text-xl font-bold text-[#2D1B2E]">{selectedProduct.totalQuantity}</p>
//                         </div>
//                         <div className="bg-[#FFF5F6] rounded-xl p-3 text-center border border-[#F7C7D3]/40">
//                           <p className="text-xs text-[#EE4275]/60">Profit Margin</p>
//                           <p className={`text-xl font-bold ${parseFloat(selectedProduct.profitMargin) > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
//                             {selectedProduct.profitMargin}%
//                           </p>
//                         </div>
//                       </div>

//                       {/* Avg prices */}
//                       <div className="bg-[#FFF5F6] rounded-xl p-3 mb-4 border border-[#F7C7D3]/40">
//                         <div className="grid grid-cols-2 gap-2 text-sm">
//                           <div>
//                             <span className="text-[#EE4275]/60">Avg Selling Price:</span>
//                             <span className="font-medium text-[#2D1B2E] ml-1">{formatCurrency(selectedProduct.averageSellingPrice)}</span>
//                           </div>
//                           <div>
//                             <span className="text-[#EE4275]/60">Avg Cost Per Item:</span>
//                             <span className="font-medium text-[#2D1B2E] ml-1">{formatCurrency(selectedProduct.averageBuyingPrice)}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Variant / Sub-variant breakdown */}
//                       {selectedProduct.hasVariants && selectedProduct.variantBreakdown && selectedProduct.variantBreakdown.length > 0 ? (
//                         <div className="mb-4">
//                           <h4 className="text-sm font-semibold text-[#2D1B2E] mb-3 flex items-center gap-2">
//                             <span className="w-1.5 h-4 bg-[#EE4275] rounded-full"></span>
//                             Variant / Sub-Variant Breakdown
//                           </h4>
//                           {renderVariantBreakdown(selectedProduct)}
//                         </div>
//                       ) : (
//                         /* Non-variant: single-line calculation */
//                         <div className="text-xs text-[#EE4275]/60 bg-[#FFF5F6] p-3 rounded-lg border border-[#EE4275]/20">
//                           <p className="font-medium text-[#EE4275]">Calculation</p>
//                           <p>Revenue: {formatCurrency(selectedProduct.totalRevenue)}</p>
//                           <p>Cost: {formatCurrency(selectedProduct.totalCost)}</p>
//                           <p>Profit: {formatCurrency(selectedProduct.totalProfit)}</p>
//                           <p>Margin: {selectedProduct.profitMargin}%</p>
//                         </div>
//                       )}
//                     </div>

//                     <div className="p-4 border-t border-[#F7C7D3]/40 bg-[#FFF5F6] flex justify-end">
//                       <button
//                         onClick={() => setShowOrderDetails(false)}
//                         className="px-4 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all text-sm shadow-md"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
  FaChartLine,
  FaMoneyBillWave,
  FaShoppingCart,
  FaBox,
  FaFilter,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaSpinner,
  FaPercentage,
  FaDollarSign,
  FaEye,
  FaInfoCircle,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendar
} from 'react-icons/fa';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function ProfitMarginPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('profit_desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getMonthName = (month) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
  };

  const formatDateLocal = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getDateRange = useCallback(() => {
    const year = selectedYear;
    const month = selectedMonth;
    const day = selectedDay;

    switch (period) {
      case 'day': {
        const date = new Date(year, month, day);
        const dateStr = formatDateLocal(date);
        return { startDate: dateStr, endDate: dateStr };
      }
      case 'week': {
        const today = new Date(year, month, day);
        const dayOfWeek = today.getDay();
        const start = new Date(today);
        start.setDate(today.getDate() - dayOfWeek);
        const end = new Date(today);
        end.setDate(today.getDate() + (6 - dayOfWeek));
        return { startDate: formatDateLocal(start), endDate: formatDateLocal(end) };
      }
      case 'month': {
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);
        return { startDate: formatDateLocal(start), endDate: formatDateLocal(end) };
      }
      case 'year': {
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);
        return { startDate: formatDateLocal(start), endDate: formatDateLocal(end) };
      }
      case 'custom':
        return { startDate, endDate };
      default:
        return { startDate: '', endDate: '' };
    }
  }, [period, selectedYear, selectedMonth, selectedDay, startDate, endDate]);

  const fetchProfitMargin = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        orderStatus: 'delivered',
        paymentStatus: 'paid'
      });

      const dateRange = getDateRange();
      if (dateRange.startDate && dateRange.endDate) {
        params.append('startDate', dateRange.startDate);
        params.append('endDate', dateRange.endDate);
      }

      const response = await fetch(
        `http://localhost:5000/api/orders/admin/profit-margin?${params}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        toast.error(result.error || 'Failed to fetch profit data');
      }
    } catch (error) {
      console.error('Fetch profit margin error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [getDateRange]);

  useEffect(() => {
    fetchProfitMargin();
  }, [fetchProfitMargin]);

  const formatCurrency = (amount) => {
    return `৳${parseFloat(amount || 0).toFixed(2)}`;
  };

  const getSortedProducts = () => {
    if (!data?.productProfitDetails) return [];
    const sorted = [...data.productProfitDetails];
    switch (sortBy) {
      case 'profit_desc':
        return sorted.sort((a, b) => b.totalProfit - a.totalProfit);
      case 'profit_asc':
        return sorted.sort((a, b) => a.totalProfit - b.totalProfit);
      case 'revenue_desc':
        return sorted.sort((a, b) => b.totalRevenue - a.totalRevenue);
      case 'revenue_asc':
        return sorted.sort((a, b) => a.totalRevenue - b.totalRevenue);
      case 'margin_desc':
        return sorted.sort((a, b) => parseFloat(b.profitMargin) - parseFloat(a.profitMargin));
      case 'margin_asc':
        return sorted.sort((a, b) => parseFloat(a.profitMargin) - parseFloat(b.profitMargin));
      case 'quantity_desc':
        return sorted.sort((a, b) => b.totalQuantity - a.totalQuantity);
      default:
        return sorted;
    }
  };

  const getFilteredProducts = () => {
    const products = getSortedProducts();
    if (!searchTerm.trim()) return products;
    return products.filter(p =>
      p.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredProducts = getFilteredProducts();

  const getPeriodLabel = () => {
    const dateRange = getDateRange();
    if (!dateRange.startDate || !dateRange.endDate) return 'All Time';

    const start = new Date(dateRange.startDate + 'T00:00:00');
    const end = new Date(dateRange.endDate + 'T00:00:00');

    switch (period) {
      case 'day':
        return start.toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' });
      case 'week':
        return `${start.toLocaleDateString('en-BD', { day: '2-digit', month: 'short' })} - ${end.toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' })}`;
      case 'month':
        return `${getMonthName(selectedMonth)} ${selectedYear}`;
      case 'year':
        return selectedYear;
      case 'custom':
        return `${dateRange.startDate} to ${dateRange.endDate}`;
      default:
        return 'All Time';
    }
  };

  const renderPeriodControls = () => {
    switch (period) {
      case 'day':
        return (
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#465641]/70 mb-1">Day</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
              >
                {[...Array(getDaysInMonth(selectedYear, selectedMonth))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#465641]/70 mb-1">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i}>{getMonthName(i)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#465641]/70 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
              >
                {[...Array(5)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>
        );

      case 'month':
        return (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#465641]/70 mb-1">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i}>{getMonthName(i)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#465641]/70 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
              >
                {[...Array(5)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>
        );

      case 'year':
        return (
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#465641]/70 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
              >
                {[...Array(10)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>
        );

      case 'custom':
        return (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#465641]/70 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#465641]/70 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white text-[#2D1B2E] text-sm"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const SummaryCard = ({ title, value, subtitle, icon, color }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#8B9D83]/20 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#465641]/70 font-medium">{title}</p>
          <p className="text-2xl font-bold text-[#2D1B2E] mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-[#465641]/70 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  // ============================================================
  // RENDER: Variant breakdown table (used in View modal)
  // ============================================================
  const renderVariantBreakdown = (product) => {
    const breakdown = product.variantBreakdown || [];
    if (breakdown.length === 0) return null;

    const grouped = {};
    breakdown.forEach(row => {
      if (!grouped[row.variantId]) grouped[row.variantId] = [];
      grouped[row.variantId].push(row);
    });

    const allRows = [];
    Object.values(grouped).forEach(variantRows => {
      variantRows.sort((a, b) => {
        if (a.isVariantRow && !b.isVariantRow) return -1;
        if (!a.isVariantRow && b.isVariantRow) return 1;
        return 0;
      });
      allRows.push(...variantRows);
    });

    return (
      <div className="overflow-x-auto rounded-xl border border-[#8B9D83]/20">
        <table className="w-full text-xs">
          <thead className="bg-[#FDF7EF]">
            <tr>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-[#465641]/70 uppercase tracking-wider">Variant / Sub-Variant</th>
              <th className="px-3 py-2 text-center text-[10px] font-medium text-[#465641]/70 uppercase tracking-wider">Qty</th>
              <th className="px-3 py-2 text-right text-[10px] font-medium text-[#465641]/70 uppercase tracking-wider">Revenue</th>
              <th className="px-3 py-2 text-right text-[10px] font-medium text-[#465641]/70 uppercase tracking-wider">Cost</th>
              <th className="px-3 py-2 text-right text-[10px] font-medium text-[#465641]/70 uppercase tracking-wider">Profit</th>
              <th className="px-3 py-2 text-center text-[10px] font-medium text-[#465641]/70 uppercase tracking-wider">Margin</th>
            </tr>
          </thead>
          <tbody>
            {allRows.map((row, idx) => {
              const isSubRow = row.isSubVariantRow;
              const rowProfit = row.profit;
              const rowMargin = parseFloat(row.profitMargin);

              return (
                <tr
                  key={`${row.variantId}-${row.subVariantId || 'main'}-${idx}`}
                  className={`border-b border-[#8B9D83]/10 ${
                    isSubRow ? 'bg-blue-50/20' : 'bg-[#FDF7EF]/50'
                  }`}
                >
                  <td className={`px-3 py-2 ${isSubRow ? 'pl-8' : 'pl-4'}`}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[#8B9D83]/60">
                        {isSubRow ? '→' : '▸'}
                      </span>
                      <span className={`text-xs ${
                        isSubRow ? 'text-gray-600' : 'font-medium text-[#465641]'
                      }`}>
                        {isSubRow ? row.subVariantName : row.variantName}
                      </span>
                      {!isSubRow && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#8B9D83]/15 text-[#465641]">
                          Variant
                        </span>
                      )}
                      {isSubRow && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
                          Sub
                        </span>
                      )}
                    </div>
                    {isSubRow && (
                      <p className="text-[9px] text-[#8B9D83]/70 ml-4 mt-0.5">
                        {row.variantName}
                      </p>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-[#2D1B2E]">
                    {row.quantity}
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-emerald-600">
                    {formatCurrency(row.revenue)}
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-orange-600">
                    {formatCurrency(row.cost)}
                  </td>
                  <td className="px-3 py-2 text-right text-xs font-medium">
                    <span className={rowProfit > 0 ? 'text-emerald-600' : rowProfit < 0 ? 'text-red-600' : 'text-[#465641]/70'}>
                      {formatCurrency(rowProfit)}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      rowMargin > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      rowMargin < 0 ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-[#8B9D83]/15 text-[#465641] border border-[#8B9D83]/30'
                    }`}>
                      <FaPercentage className="w-2 h-2" />
                      {row.profitMargin}%
                    </span>
                  </td>
                </tr>
              );
            })}
            <tr className="border-t-2 border-[#8B9D83]/40 bg-[#FDF7EF]">
              <td className="px-3 py-2 text-xs font-bold text-[#2D1B2E]">Product Total</td>
              <td className="px-3 py-2 text-center text-xs font-bold text-[#2D1B2E]">
                {product.totalQuantity}
              </td>
              <td className="px-3 py-2 text-right text-xs font-bold text-emerald-600">
                {formatCurrency(product.totalRevenue)}
              </td>
              <td className="px-3 py-2 text-right text-xs font-bold text-orange-600">
                {formatCurrency(product.totalCost)}
              </td>
              <td className="px-3 py-2 text-right text-xs font-bold">
                <span className={product.totalProfit > 0 ? 'text-emerald-600' : 'text-red-600'}>
                  {formatCurrency(product.totalProfit)}
                </span>
              </td>
              <td className="px-3 py-2 text-center">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  parseFloat(product.profitMargin) > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  <FaPercentage className="w-2 h-2" />
                  {product.profitMargin}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <ProtectedRoute pageKey="profit_margin">
      <div className="min-h-screen bg-[#FDF7EF] p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-r from-[#8B9D83] to-[#465641] rounded-xl flex items-center justify-center shadow-lg shadow-[#8B9D83]/25">
                <FaChartLine className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#2D1B2E]">Profit Margin</h1>
                <p className="text-sm text-[#465641]/70">
                  Track profitability of delivered & paid orders
                  <span className="ml-2 text-xs text-[#465641] font-medium bg-[#FDF7EF] px-2 py-0.5 rounded-full border border-[#8B9D83]/30">
                    {getPeriodLabel()}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-colors text-sm ${
                  showFilters ? 'bg-[#8B9D83] text-white border-[#8B9D83]' : 'bg-white border-[#8B9D83]/30 text-[#2D1B2E] hover:bg-[#FDF7EF]'
                }`}
              >
                <FaFilter className="w-4 h-4" />
                Filters
                {showFilters ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white rounded-2xl border border-[#8B9D83]/20 shadow-sm overflow-hidden mb-6">
              {/* Period Type Tabs */}
              <div className="p-4 border-b border-[#8B9D83]/20 bg-[#FDF7EF]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-[#465641]/70 mr-2">View by:</span>
                  <button
                    onClick={() => setPeriod('day')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      period === 'day' ? 'bg-[#8B9D83] text-white shadow-sm' : 'bg-white text-[#2D1B2E] hover:bg-[#FDF7EF] border border-[#8B9D83]/30'
                    }`}
                  >
                    <FaCalendarDay className="w-3 h-3" />
                    Day
                  </button>
                  <button
                    onClick={() => setPeriod('week')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      period === 'week' ? 'bg-[#8B9D83] text-white shadow-sm' : 'bg-white text-[#2D1B2E] hover:bg-[#FDF7EF] border border-[#8B9D83]/30'
                    }`}
                  >
                    <FaCalendarWeek className="w-3 h-3" />
                    Week
                  </button>
                  <button
                    onClick={() => setPeriod('month')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      period === 'month' ? 'bg-[#8B9D83] text-white shadow-sm' : 'bg-white text-[#2D1B2E] hover:bg-[#FDF7EF] border border-[#8B9D83]/30'
                    }`}
                  >
                    <FaCalendarAlt className="w-3 h-3" />
                    Month
                  </button>
                  <button
                    onClick={() => setPeriod('year')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      period === 'year' ? 'bg-[#8B9D83] text-white shadow-sm' : 'bg-white text-[#2D1B2E] hover:bg-[#FDF7EF] border border-[#8B9D83]/30'
                    }`}
                  >
                    <FaCalendar className="w-3 h-3" />
                    Year
                  </button>
                  <button
                    onClick={() => setPeriod('custom')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      period === 'custom' ? 'bg-[#8B9D83] text-white shadow-sm' : 'bg-white text-[#2D1B2E] hover:bg-[#FDF7EF] border border-[#8B9D83]/30'
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {/* Period Controls */}
              <div className="p-4">
                {renderPeriodControls()}
              </div>

              {/* Quick Stats */}
              {data && (
                <div className="px-4 py-3 bg-[#FDF7EF] border-t border-[#8B9D83]/20 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center">
                    <p className="text-[10px] text-[#465641]/70 uppercase tracking-wide">Period</p>
                    <p className="text-sm font-semibold text-[#2D1B2E]">{getPeriodLabel()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[#465641]/70 uppercase tracking-wide">Product Orders</p>
                    <p className="text-sm font-semibold text-[#2D1B2E]">{data.summary.totalOrders}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[#465641]/70 uppercase tracking-wide">Revenue</p>
                    <p className="text-sm font-semibold text-emerald-600">{formatCurrency(data.summary.totalRevenue)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[#465641]/70 uppercase tracking-wide">Profit</p>
                    <p className={`text-sm font-semibold ${data.summary.totalProfit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatCurrency(data.summary.totalProfit)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#8B9D83]/20">
              <FaSpinner className="w-8 h-8 text-[#8B9D83] animate-spin mx-auto mb-4" />
              <p className="text-[#465641]/70">Calculating profit margins...</p>
            </div>
          )}

          {/* Data Display */}
          {!loading && data && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <SummaryCard
                  title="Total Product Orders"
                  value={data.summary.totalOrders}
                  icon={<FaShoppingCart className="w-5 h-5 text-[#465641]" />}
                  color="bg-[#FDF7EF]"
                />
                <SummaryCard
                  title="Total Revenue"
                  value={formatCurrency(data.summary.totalRevenue)}
                  icon={<FaDollarSign className="w-5 h-5 text-emerald-500" />}
                  color="bg-emerald-50"
                />
                <SummaryCard
                  title="Total Cost"
                  value={formatCurrency(data.summary.totalCost)}
                  icon={<FaMoneyBillWave className="w-5 h-5 text-orange-500" />}
                  color="bg-orange-50"
                />
                <SummaryCard
                  title="Total Profit"
                  value={formatCurrency(data.summary.totalProfit)}
                  subtitle={`${data.summary.averageProfitMargin}% average margin`}
                  icon={<FaChartLine className="w-5 h-5 text-[#465641]" />}
                  color="bg-[#FDF7EF]"
                />
              </div>

              {/* Product Profit Breakdown */}
              <div className="bg-white rounded-2xl border border-[#8B9D83]/20 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-[#8B9D83]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <FaBox className="w-5 h-5 text-[#465641]" />
                    <h2 className="text-lg font-semibold text-[#2D1B2E]">Product Profit Breakdown</h2>
                    <span className="text-xs text-[#465641]/70 bg-[#FDF7EF] px-2 py-1 rounded-full border border-[#8B9D83]/20">
                      {data.productProfitDetails.length} products
                    </span>
                    <span className="text-xs text-[#465641] bg-[#FDF7EF] px-2 py-1 rounded-full border border-[#8B9D83]/30">
                      {getPeriodLabel()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 sm:w-48 px-3 py-1.5 border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-[#FDF7EF] text-sm text-[#2D1B2E] placeholder:text-[#8B9D83]/60"
                    />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1.5 border border-[#8B9D83]/30 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-[#FDF7EF] text-sm text-[#2D1B2E]"
                    >
                      <option value="profit_desc">Highest Profit</option>
                      <option value="profit_asc">Lowest Profit</option>
                      <option value="margin_desc">Highest Margin</option>
                      <option value="margin_asc">Lowest Margin</option>
                      <option value="revenue_desc">Highest Revenue</option>
                      <option value="quantity_desc">Most Sold</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#FDF7EF]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#465641]/70">Product</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-[#465641]/70">Qty Sold</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-[#465641]/70">Revenue</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-[#465641]/70">Cost</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-[#465641]/70">Profit</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-[#465641]/70">Margin</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-[#465641]/70">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-[#465641]/70 text-sm">
                            No products found
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((product, index) => {
                          const profitMargin = parseFloat(product.profitMargin);
                          const isPositive = profitMargin > 0;
                          const isNegative = profitMargin < 0;
                          const variantCount = (product.variantBreakdown || []).length;

                          return (
                            <tr key={index} className="border-b border-[#8B9D83]/10 hover:bg-[#FDF7EF] transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  {product.image ? (
                                    <img
                                      src={product.image}
                                      alt={product.productName}
                                      className="w-8 h-8 rounded-lg object-cover border border-[#8B9D83]/20"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 rounded-lg bg-[#FDF7EF] flex items-center justify-center">
                                      <FaBox className="w-4 h-4 text-[#8B9D83]/60" />
                                    </div>
                                  )}
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm font-medium text-[#2D1B2E] truncate max-w-[200px]">
                                        {product.productName}
                                      </p>
                                      {product.hasVariants && variantCount > 0 && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#8B9D83]/15 text-[#465641] border border-[#8B9D83]/30 whitespace-nowrap">
                                          {variantCount} variant{variantCount > 1 ? 's' : ''}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-[#465641]/70">
                                      Avg: {formatCurrency(product.averageSellingPrice)} / {formatCurrency(product.averageBuyingPrice)}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center text-sm text-[#2D1B2E]">
                                {product.totalQuantity}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-emerald-600">
                                {formatCurrency(product.totalRevenue)}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-orange-600">
                                {formatCurrency(product.totalCost)}
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-semibold">
                                <span className={isPositive ? 'text-emerald-600' : isNegative ? 'text-red-600' : 'text-[#465641]/70'}>
                                  {formatCurrency(product.totalProfit)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                  isPositive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                  isNegative ? 'bg-red-50 text-red-700 border border-red-200' :
                                  'bg-[#8B9D83]/15 text-[#465641] border border-[#8B9D83]/30'
                                }`}>
                                  <FaPercentage className="w-2.5 h-2.5" />
                                  {profitMargin.toFixed(2)}%
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() => {
                                    setSelectedProduct(product);
                                    setShowOrderDetails(true);
                                  }}
                                  className="text-[#465641] hover:text-[#8B9D83] transition-colors text-xs flex items-center gap-1 mx-auto"
                                >
                                  <FaEye className="w-3 h-3" />
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Period Summary */}
              {data.periodSummary && data.periodSummary.length > 0 && (
                <div className="bg-white rounded-2xl border border-[#8B9D83]/20 shadow-sm overflow-hidden mt-6">
                  <div className="p-4 border-b border-[#8B9D83]/20">
                    <h3 className="text-lg font-semibold text-[#2D1B2E] flex items-center gap-2">
                      <FaCalendarAlt className="w-5 h-5 text-[#465641]" />
                      Daily Performance
                      <span className="text-xs text-[#465641]/70 font-normal bg-[#FDF7EF] px-2 py-0.5 rounded-full border border-[#8B9D83]/20">
                        {getPeriodLabel()}
                      </span>
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#FDF7EF]">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-[#465641]/70">Date</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-[#465641]/70">Orders</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-[#465641]/70">Items</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-[#465641]/70">Revenue</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-[#465641]/70">Cost</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-[#465641]/70">Profit</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-[#465641]/70">Margin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.periodSummary.map((day, index) => (
                          <tr key={index} className="border-b border-[#8B9D83]/10 hover:bg-[#FDF7EF] transition-colors">
                            <td className="px-4 py-2 text-sm text-[#2D1B2E]">
                              {new Date(day.date).toLocaleDateString('en-BD', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="px-4 py-2 text-center text-sm text-[#2D1B2E]">{day.orders}</td>
                            <td className="px-4 py-2 text-center text-sm text-[#465641]/70">{day.itemsSold}</td>
                            <td className="px-4 py-2 text-right text-sm text-emerald-600">{formatCurrency(day.revenue)}</td>
                            <td className="px-4 py-2 text-right text-sm text-orange-600">{formatCurrency(day.cost)}</td>
                            <td className="px-4 py-2 text-right text-sm font-semibold">
                              <span className={day.profit > 0 ? 'text-emerald-600' : day.profit < 0 ? 'text-red-600' : 'text-[#465641]/70'}>
                                {formatCurrency(day.profit)}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                day.profitMargin > 10 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                day.profitMargin > 0 ? 'bg-[#FDF7EF] text-[#465641] border border-[#8B9D83]/30' :
                                day.profitMargin === 0 ? 'bg-[#8B9D83]/15 text-[#465641] border border-[#8B9D83]/30' :
                                'bg-red-50 text-red-700 border border-red-200'
                              }`}>
                                <FaPercentage className="w-2.5 h-2.5" />
                                {day.profitMargin}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Product Details Modal */}
              {showOrderDetails && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                  <div className="bg-white rounded-2xl border border-[#8B9D83]/20 shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">Product Profit Details</h3>
                        <p className="text-sm text-white/80">{selectedProduct.productName}</p>
                      </div>
                      <button
                        onClick={() => setShowOrderDetails(false)}
                        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[65vh]">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-[#FDF7EF] rounded-xl p-3 text-center border border-[#8B9D83]/20">
                          <p className="text-xs text-[#465641]/70">Total Revenue</p>
                          <p className="text-xl font-bold text-emerald-600">{formatCurrency(selectedProduct.totalRevenue)}</p>
                        </div>
                        <div className="bg-[#FDF7EF] rounded-xl p-3 text-center border border-[#8B9D83]/20">
                          <p className="text-xs text-[#465641]/70">Total Profit</p>
                          <p className={`text-xl font-bold ${selectedProduct.totalProfit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {formatCurrency(selectedProduct.totalProfit)}
                          </p>
                        </div>
                        <div className="bg-[#FDF7EF] rounded-xl p-3 text-center border border-[#8B9D83]/20">
                          <p className="text-xs text-[#465641]/70">Quantity Sold</p>
                          <p className="text-xl font-bold text-[#2D1B2E]">{selectedProduct.totalQuantity}</p>
                        </div>
                        <div className="bg-[#FDF7EF] rounded-xl p-3 text-center border border-[#8B9D83]/20">
                          <p className="text-xs text-[#465641]/70">Profit Margin</p>
                          <p className={`text-xl font-bold ${parseFloat(selectedProduct.profitMargin) > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {selectedProduct.profitMargin}%
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#FDF7EF] rounded-xl p-3 mb-4 border border-[#8B9D83]/20">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-[#465641]/70">Avg Selling Price:</span>
                            <span className="font-medium text-[#2D1B2E] ml-1">{formatCurrency(selectedProduct.averageSellingPrice)}</span>
                          </div>
                          <div>
                            <span className="text-[#465641]/70">Avg Cost Per Item:</span>
                            <span className="font-medium text-[#2D1B2E] ml-1">{formatCurrency(selectedProduct.averageBuyingPrice)}</span>
                          </div>
                        </div>
                      </div>

                      {selectedProduct.hasVariants && selectedProduct.variantBreakdown && selectedProduct.variantBreakdown.length > 0 ? (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-[#2D1B2E] mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-4 bg-[#8B9D83] rounded-full"></span>
                            Variant / Sub-Variant Breakdown
                          </h4>
                          {renderVariantBreakdown(selectedProduct)}
                        </div>
                      ) : (
                        <div className="text-xs text-[#465641]/70 bg-[#FDF7EF] p-3 rounded-lg border border-[#8B9D83]/30">
                          <p className="font-medium text-[#465641]">Calculation</p>
                          <p>Revenue: {formatCurrency(selectedProduct.totalRevenue)}</p>
                          <p>Cost: {formatCurrency(selectedProduct.totalCost)}</p>
                          <p>Profit: {formatCurrency(selectedProduct.totalProfit)}</p>
                          <p>Margin: {selectedProduct.profitMargin}%</p>
                        </div>
                      )}
                    </div>

                    <div className="p-4 border-t border-[#8B9D83]/20 bg-[#FDF7EF] flex justify-end">
                      <button
                        onClick={() => setShowOrderDetails(false)}
                        className="px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all text-sm shadow-md"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}