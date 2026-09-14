// 'use client';

// import React from "react";
// import Link from "next/link";
// import { FaTruck, FaInfoCircle, FaExternalLinkAlt } from 'react-icons/fa';

// const COURIER_DISPLAY = [
//   { key: "pathao", name: "Pathao", color: "bg-red-500", dashboard: "https://merchant.pathao.com/" },
//   { key: "steadfast", name: "SteadFast", color: "bg-orange-500", dashboard: "https://portal.packzy.com/" },
//   { key: "redx", name: "RedX", color: "bg-rose-600", dashboard: "https://merchant.redx.com.bd/" },
// ];

// // ========== SUCCESS GAUGE ==========
// function SuccessGauge({ percent = 0 }) {
//   const p = Math.min(100, Math.max(0, Number(percent) || 0));
//   const r = 52;
//   const c = 2 * Math.PI * r;
//   const offset = c - (p / 100) * c;
  
//   let color = '#3b82f6';
//   if (p >= 80) color = '#22c55e';
//   else if (p >= 60) color = '#eab308';
//   else if (p >= 40) color = '#f97316';
//   else color = '#ef4444';

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <svg width="140" height="90" viewBox="0 0 140 90" className="overflow-visible">
//         <path d="M 18 78 A 52 52 0 0 1 122 78" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
//         <path d="M 18 78 A 52 52 0 0 1 122 78" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.5s ease" }} />
//       </svg>
//       <p className="text-2xl font-bold text-blue-600 -mt-2">{p}%</p>
//       <p className="text-xs text-gray-500 font-medium">Success Ratio</p>
//     </div>
//   );
// }

// // ========== SUMMARY CARD ==========
// function SummaryCard({ icon, label, value, tint, color }) {
//   return (
//     <div className={`rounded-xl border p-4 flex items-center gap-3 ${tint}`}>
//       <div className="text-2xl">{icon}</div>
//       <div>
//         <p className="text-xs text-gray-500">{label}</p>
//         <p className={`text-2xl font-bold ${color || 'text-gray-900'}`}>{value}</p>
//       </div>
//     </div>
//   );
// }

// // ========== MAIN COMPONENT ==========
// export default function CourierScorePanel({
//   lifetime,
//   phone,
//   customerName,
//   loading,
//   onRefresh,
// }) {
//   if (!phone) {
//     return (
//       <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
//         Customer's mobile number required — enter a phone number to check courier score.
//       </div>
//     );
//   }

//   if (loading && !lifetime) {
//     return (
//       <div className="rounded-2xl border bg-white p-10 text-center text-gray-400 text-sm">
//         Loading courier history...
//       </div>
//     );
//   }

//   if (lifetime?.error) {
//     return (
//       <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
//         {lifetime.error}
//       </div>
//     );
//   }

//   if (!lifetime) return null;

//   const summary = lifetime.summary || {};
//   const couriers = lifetime.couriers || {};

//   // Get rating style
//   const getRatingStyle = (rating) => {
//     const styles = {
//       new_customer: 'bg-gray-100 text-gray-600',
//       good_customer: 'bg-emerald-100 text-emerald-700',
//       regular_customer: 'bg-blue-100 text-blue-700',
//       bad_customer: 'bg-red-100 text-red-700',
//       blocked: 'bg-red-200 text-red-800'
//     };
//     return styles[rating] || 'bg-gray-100 text-gray-600';
//   };

//   return (
//     <div className="rounded-2xl border border-[#06B6D4]/30 bg-white shadow-sm overflow-hidden">
//       {/* Header */}
//       <div className="px-5 py-4 border-b flex flex-wrap items-center justify-between gap-3 bg-[#E2E7EA]/30">
//         <div>
//           <h2 className="text-lg font-bold text-[#004767] flex items-center gap-2">
//             <FaTruck className="text-[#06B6D4]" />
//             Courier Score
//           </h2>
//           <p className="text-xs text-[#64748B] mt-0.5">
//             Customer: <span className="font-semibold text-[#004767]">{customerName || 'Unknown'}</span> — 
//             Phone: <span className="font-mono font-semibold">{phone}</span>
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           {/* Courier Dashboard Links */}
//           <div className="flex gap-1">
//             {COURIER_DISPLAY.map(({ key, name, dashboard }) => (
//               <a
//                 key={key}
//                 href={dashboard}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-xs bg-white border border-[#06B6D4]/30 rounded-lg px-2 py-1 hover:bg-[#E2E7EA] transition-colors flex items-center gap-1"
//                 title={`View ${name} dashboard`}
//               >
//                 <FaExternalLinkAlt className="w-2.5 h-2.5" />
//                 {name}
//               </a>
//             ))}
//           </div>
//           <button
//             type="button"
//             onClick={onRefresh}
//             disabled={loading}
//             className="px-3 py-1.5 text-sm border border-[#06B6D4]/30 rounded-lg hover:bg-white disabled:opacity-50"
//           >
//             {loading ? "Loading..." : "Refresh"}
//           </button>
//         </div>
//       </div>

//       {/* Info Note */}
//       <div className="mx-5 mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3">
//         <p className="text-xs text-blue-700 flex items-start gap-2">
//           <FaInfoCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
//           <span>
//             Showing orders placed through <strong>your store</strong> only. 
//             For complete courier history, check the respective courier dashboards via the links above.
//           </span>
//         </p>
//       </div>

//       {!lifetime.anyConfigured ? (
//         <div className="m-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
//           No courier orders found for this customer. 
//           <Link href="/dashboard/shipment-tracking/settings" className="font-semibold underline ml-1">
//             Configure Courier Settings
//           </Link>
//         </div>
//       ) : null}

//       {/* Summary Cards */}
//       <div className="p-5 grid lg:grid-cols-[1fr_auto] gap-6">
//         <div className="grid sm:grid-cols-4 gap-3">
//           <SummaryCard
//             icon="📦"
//             label="Total Parcels"
//             value={summary.totalParcels ?? 0}
//             tint="bg-violet-50 border-violet-100"
//             color="text-violet-600"
//           />
//           <SummaryCard
//             icon="✅"
//             label="Successful"
//             value={summary.totalDelivered ?? 0}
//             tint="bg-emerald-50 border-emerald-100"
//             color="text-emerald-600"
//           />
//           <SummaryCard
//             icon="❌"
//             label="Cancelled"
//             value={summary.totalCancelled ?? 0}
//             tint="bg-red-50 border-red-100"
//             color="text-red-600"
//           />
//           <SummaryCard
//             icon="🔄"
//             label="In Progress"
//             value={summary.totalProcessing ?? 0}
//             tint="bg-blue-50 border-blue-100"
//             color="text-blue-600"
//           />
//         </div>
//         <SuccessGauge percent={summary.deliverySuccessRate ?? 0} />
//       </div>

//       {/* Courier Table */}
//       <div className="px-5 pb-5 overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-xs text-gray-500 uppercase border-b bg-[#E2E7EA]/30">
//               <th className="text-left py-3 px-3 font-semibold">Courier</th>
//               <th className="text-center py-3 px-2">Total</th>
//               <th className="text-center py-3 px-2">✅ Delivered</th>
//               <th className="text-center py-3 px-2">❌ Cancelled</th>
//               <th className="text-center py-3 px-2">🔄 Processing</th>
//               <th className="text-left py-3 px-4 min-w-[10rem]">Rating</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {COURIER_DISPLAY.map(({ key, name }) => {
//               const row = couriers[key] || {};
//               const configured = row.configured;
//               const total = row.total ?? 0;
//               const delivered = row.delivered ?? 0;
//               const cancelled = row.cancelled ?? 0;
//               const processing = row.processing ?? 0;
//               const rate = row.successRate ?? 0;
//               const ratingStyle = getRatingStyle(row.rating);
              
//               const barColor = rate >= 70 ? "bg-emerald-500" : rate >= 40 ? "bg-amber-500" : "bg-gray-300";

//               return (
//                 <tr key={key} className="hover:bg-[#E2E7EA]/30 transition-colors">
//                   <td className="py-3 px-3 font-medium text-[#004767]">{name}</td>
//                   <td className="py-3 px-2 text-center font-semibold text-[#004767]">
//                     {configured ? total : "—"}
//                   </td>
//                   <td className="py-3 px-2 text-center text-emerald-600 font-medium">
//                     {configured ? delivered : "—"}
//                   </td>
//                   <td className="py-3 px-2 text-center text-red-500">
//                     {configured ? cancelled : "—"}
//                   </td>
//                   <td className="py-3 px-2 text-center text-blue-500">
//                     {configured ? processing : "—"}
//                   </td>
//                   <td className="py-3 px-4">
//                     {!configured ? (
//                       <span className="text-xs text-gray-400">No orders</span>
//                     ) : row.error ? (
//                       <span className="text-xs text-red-600">
//                         Error
//                         <span className="block text-[10px] text-red-400 font-normal max-w-50 leading-tight mt-0.5">
//                           {row.error}
//                         </span>
//                       </span>
//                     ) : row.ratingBased ? (
//                       <div className="flex flex-col gap-1">
//                         <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${ratingStyle}`}>
//                           {row.ratingLabel || row.rating}
//                         </span>
//                         {row.addressCount > 0 && (
//                           <span className="text-[10px] text-gray-400">
//                             {row.addressCount} address{row.addressCount !== 1 ? "es" : ""} on record
//                           </span>
//                         )}
//                         {/* Success Bar */}
//                         <div className="flex items-center gap-2 mt-1">
//                           <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
//                             <div className={`h-full rounded-full ${barColor}`} style={{ width: `${rate}%` }} />
//                           </div>
//                           <span className="text-[10px] font-bold text-gray-600 w-8 text-right">{rate}%</span>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
//                           <div className={`h-full rounded-full ${barColor}`} style={{ width: `${rate}%` }} />
//                         </div>
//                         <span className="text-xs font-bold text-gray-700 w-10 text-right">{rate}%</span>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <p className="text-[11px] text-gray-400 mt-3">
//           {lifetime.fetchedAt ? `Updated ${new Date(lifetime.fetchedAt).toLocaleString()}` : ""}
//           {lifetime.cached ? " (cached)" : ""}
//         </p>
//       </div>
//     </div>
//   );
// }