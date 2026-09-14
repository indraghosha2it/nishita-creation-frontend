// // D:\power-bank\power-bank-frontend\src\app\components\CourierHistoryLookup.jsx
// "use client";

// import { useState } from 'react';

// export default function CourierHistoryLookup() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [history, setHistory] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSearch = async (e) => {
//     e.preventDefault();
    
//     const cleanPhone = phoneNumber.replace(/[\s\-\(\)\+]/g, '');
//     if (!cleanPhone || cleanPhone.length < 11) {
//       setError('Please enter a valid 11-digit phone number.');
//       return;
//     }

//     setError('');
//     setLoading(true);
//     setHistory(null);

//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${API_URL}/api/courier-lifetime?phone=${cleanPhone}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.success) {
//         setHistory(data.data);
//       } else {
//         setError(data.error || 'No data found for this phone number.');
//       }
//     } catch (err) {
//       console.error('Search error:', err);
//       setError(`Failed to fetch courier history: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getSuccessColor = (rate) => {
//     if (rate >= 90) return 'text-green-600';
//     if (rate >= 70) return 'text-yellow-600';
//     if (rate >= 50) return 'text-orange-600';
//     return 'text-red-600';
//   };

//   const COURIER_DISPLAY = [
//     { key: 'pathao', name: 'Pathao', color: 'bg-red-500' },
//     { key: 'steadfast', name: 'SteadFast Courier', color: 'bg-orange-500' },
//     { key: 'redx', name: 'REDX', color: 'bg-rose-600' },
//   ];

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
//         Courier History
//       </h1>
//       <p className="text-gray-500 mb-6">
//         Check a customer's delivery history across Pathao, Steadfast, and RedX networks
//       </p>
      
//       <form onSubmit={handleSearch} className="mb-8">
//         <div className="flex gap-3">
//           <input
//             type="text"
//             placeholder="Enter phone number (e.g., 01712345678)"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 placeholder:text-gray-400"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 min-w-[120px] font-medium shadow-md hover:shadow-lg"
//           >
//             {loading ? 'Checking...' : 'Check History'}
//           </button>
//         </div>
//         {error && (
//           <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-600 text-sm">{error}</p>
//           </div>
//         )}
//       </form>

//       {history && (
//         <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
//           <div className="px-5 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-black">
//             <div>
//               <h2 className="text-lg font-bold text-white">Courier Score</h2>
//               <p className="text-xs text-white/80 mt-0.5">
//                 Mobile <span className="font-mono font-semibold">{history.phone}</span> — All shops/platforms combined
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={() => handleSearch(new Event('submit'))}
//               disabled={loading}
//               className="px-3 py-1.5 text-sm border border-gray-300 text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
//             >
//               {loading ? 'Refreshing…' : 'Refresh'}
//             </button>
//           </div>

//           {!history.anyConfigured && (
//             <div className="m-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-600">
//               Courier not configured. Add credentials to see real data.
//             </div>
//           )}

//           <div className="p-5 grid lg:grid-cols-[1fr_auto] gap-6">
//             <div className="grid sm:grid-cols-3 gap-3">
//               <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
//                 <span className="text-2xl">📦</span>
//                 <div>
//                   <p className="text-xs text-gray-500">Total Parcels</p>
//                   <p className="text-2xl font-bold text-gray-900">{history.summary.totalParcels}</p>
//                 </div>
//               </div>
//               <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
//                 <span className="text-2xl">🚚</span>
//                 <div>
//                   <p className="text-xs text-gray-500">Successful</p>
//                   <p className="text-2xl font-bold text-green-700">{history.summary.totalDelivered}</p>
//                 </div>
//               </div>
//               <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
//                 <span className="text-2xl">✕</span>
//                 <div>
//                   <p className="text-xs text-gray-500">Cancelled</p>
//                   <p className="text-2xl font-bold text-red-700">{history.summary.totalCancelled}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex flex-col items-center justify-center">
//               <div className="text-3xl font-bold text-blue-600">{history.summary.deliverySuccessRate}%</div>
//               <p className="text-xs text-gray-500 font-medium">Success Ratio</p>
//             </div>
//           </div>

//           <div className="px-5 pb-5 overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-xs text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                   <th className="text-left py-3 px-3 font-semibold">Courier Name</th>
//                   <th className="text-center py-3 px-2">Total Parcels</th>
//                   <th className="text-center py-3 px-2">Successful</th>
//                   <th className="text-center py-3 px-2">Cancelled</th>
//                   <th className="text-left py-3 px-4 min-w-[10rem]">Success Rate</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {COURIER_DISPLAY.map(({ key, name, color }) => {
//                   const row = history.couriers[key] || {};
//                   const configured = row.configured;
//                   const total = row.total || 0;
//                   const delivered = row.delivered || 0;
//                   const cancelled = row.cancelled || 0;
//                   const rate = row.successRate || 0;
//                   const barColor = rate >= 70 ? 'bg-emerald-500' : rate >= 40 ? 'bg-amber-500' : 'bg-gray-300';

//                   return (
//                     <tr key={key} className="hover:bg-gray-50 transition-colors">
//                       <td className="py-3 px-3 font-medium text-gray-900">{name}</td>
//                       <td className="py-3 px-2 text-center font-semibold text-gray-900">
//                         {configured ? total : '—'}
//                       </td>
//                       <td className="py-3 px-2 text-center text-emerald-700">
//                         {configured ? delivered : '—'}
//                       </td>
//                       <td className="py-3 px-2 text-center text-red-600">
//                         {configured ? cancelled : '—'}
//                       </td>
//                       <td className="py-3 px-4">
//                         {!configured ? (
//                           <span className="text-xs text-gray-500">Not connected</span>
//                         ) : row.error ? (
//                           <span className="text-xs text-red-600">Error: {row.error}</span>
//                         ) : row.ratingBased ? (
//                           <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full w-fit 
//                             ${row.rating === 'good_customer' ? 'bg-emerald-100 text-emerald-700' :
//                               row.rating === 'regular_customer' ? 'bg-blue-100 text-blue-700' :
//                               row.rating === 'bad_customer' ? 'bg-red-100 text-red-700' :
//                               row.rating === 'blocked' ? 'bg-red-200 text-red-800' :
//                               'bg-gray-100 text-gray-500'}`}>
//                             {row.rating?.replace('_', ' ')}
//                           </span>
//                         ) : (
//                           <div className="flex items-center gap-2">
//                             <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
//                               <div className={`h-full rounded-full ${barColor}`} style={{ width: `${rate}%` }} />
//                             </div>
//                             <span className={`text-xs font-bold w-10 text-right ${getSuccessColor(rate)}`}>
//                               {rate}%
//                             </span>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//             <p className="text-[11px] text-gray-400 mt-3">
//               {history.fetchedAt ? `Updated ${new Date(history.fetchedAt).toLocaleString()}` : ''}
//               {history.cached ? ' (cached)' : ''}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// D:\power-bank\power-bank-frontend\src\app\components\CourierHistoryLookup.jsx
"use client";

import { useState } from 'react';

export default function CourierHistoryLookup() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const cleanPhone = phoneNumber.replace(/[\s\-\(\)\+]/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      setError('Please enter a valid 11-digit phone number.');
      return;
    }

    setError('');
    setLoading(true);
    setHistory(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/courier-lifetime?phone=${cleanPhone}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setHistory(data.data);
      } else {
        setError(data.error || 'No data found for this phone number.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(`Failed to fetch courier history: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getSuccessColor = (rate) => {
    if (rate >= 90) return 'text-[#708268]';
    if (rate >= 70) return 'text-yellow-600';
    if (rate >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const COURIER_DISPLAY = [
    { key: 'pathao', name: 'Pathao', color: 'bg-red-500' },
    { key: 'steadfast', name: 'SteadFast Courier', color: 'bg-orange-500' },
    { key: 'redx', name: 'REDX', color: 'bg-rose-600' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}>
        Courier History
      </h1>
      <p className="text-[#708268]/80 mb-6">
        Check a customer's delivery history across Pathao, Steadfast, and RedX networks
      </p>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter phone number (e.g., 01712345678)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1 px-4 py-3 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none text-[#2D1B2E] placeholder:text-[#708268]/40 bg-white hover:border-[#708268]/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#708268]  text-white rounded-xl hover:shadow-lg hover:shadow-[#708268]/25 transition-all disabled:opacity-50 min-w-[120px] font-medium shadow-md"
          >
            {loading ? 'Checking...' : 'Check History'}
          </button>
        </div>
        {error && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </form>

      {history && (
        <div className="rounded-2xl border border-[#F7C7D3]/40 bg-white shadow-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F7C7D3]/40 flex flex-wrap items-center justify-between gap-3 bg-[#708268] ">
            <div>
              <h2 className="text-lg font-bold text-white">Courier Score</h2>
              <p className="text-xs text-white/80 mt-0.5">
                Mobile <span className="font-mono font-semibold">{history.phone}</span> — All shops/platforms combined
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSearch(new Event('submit'))}
              disabled={loading}
              className="px-3 py-1.5 text-sm border border-white/30 text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          {!history.anyConfigured && (
            <div className="m-5 rounded-xl border border-[#708268]/20 bg-[#FFF5F6] p-4 text-sm text-[#708268]">
              Courier not configured. Add credentials to see real data.
            </div>
          )}

          <div className="p-5 grid lg:grid-cols-[1fr_auto] gap-6">
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-[#FFF5F6] border border-[#F7C7D3]/40 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="text-xs text-[#708268]/60">Total Parcels</p>
                  <p className="text-2xl font-bold text-[#2D1B2E]">{history.summary.totalParcels}</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">🚚</span>
                <div>
                  <p className="text-xs text-[#708268]/60">Successful</p>
                  <p className="text-2xl font-bold text-green-700">{history.summary.totalDelivered}</p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">✕</span>
                <div>
                  <p className="text-xs text-[#708268]/60">Cancelled</p>
                  <p className="text-2xl font-bold text-red-700">{history.summary.totalCancelled}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-[#708268]">{history.summary.deliverySuccessRate}%</div>
              <p className="text-xs text-[#708268]/60 font-medium">Success Ratio</p>
            </div>
          </div>

          <div className="px-5 pb-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#708268]/60 uppercase border-b border-[#F7C7D3]/40 bg-[#FFF5F6]">
                  <th className="text-left py-3 px-3 font-semibold">Courier Name</th>
                  <th className="text-center py-3 px-2">Total Parcels</th>
                  <th className="text-center py-3 px-2">Successful</th>
                  <th className="text-center py-3 px-2">Cancelled</th>
                  <th className="text-left py-3 px-4 min-w-[10rem]">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7C7D3]/20">
                {COURIER_DISPLAY.map(({ key, name, color }) => {
                  const row = history.couriers[key] || {};
                  const configured = row.configured;
                  const total = row.total || 0;
                  const delivered = row.delivered || 0;
                  const cancelled = row.cancelled || 0;
                  const rate = row.successRate || 0;
                  const barColor = rate >= 70 ? 'bg-[#708268]' : rate >= 40 ? 'bg-amber-500' : 'bg-gray-300';

                  return (
                    <tr key={key} className="hover:bg-[#FFF5F6] transition-colors">
                      <td className="py-3 px-3 font-medium text-[#2D1B2E]">{name}</td>
                      <td className="py-3 px-2 text-center font-semibold text-[#2D1B2E]">
                        {configured ? total : '—'}
                      </td>
                      <td className="py-3 px-2 text-center text-emerald-700">
                        {configured ? delivered : '—'}
                      </td>
                      <td className="py-3 px-2 text-center text-red-600">
                        {configured ? cancelled : '—'}
                      </td>
                      <td className="py-3 px-4">
                        {!configured ? (
                          <span className="text-xs text-[#708268]/40">Not connected</span>
                        ) : row.error ? (
                          <span className="text-xs text-red-600">Error: {row.error}</span>
                        ) : row.ratingBased ? (
                          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full w-fit 
                            ${row.rating === 'good_customer' ? 'bg-emerald-100 text-emerald-700' :
                              row.rating === 'regular_customer' ? 'bg-blue-100 text-blue-700' :
                              row.rating === 'bad_customer' ? 'bg-red-100 text-red-700' :
                              row.rating === 'blocked' ? 'bg-red-200 text-red-800' :
                              'bg-gray-100 text-gray-500'}`}>
                            {row.rating?.replace('_', ' ')}
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                              <div className={`h-full rounded-full ${barColor}`} style={{ width: `${rate}%` }} />
                            </div>
                            <span className={`text-xs font-bold w-10 text-right ${getSuccessColor(rate)}`}>
                              {rate}%
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-[11px] text-[#708268]/40 mt-3">
              {history.fetchedAt ? `Updated ${new Date(history.fetchedAt).toLocaleString()}` : ''}
              {history.cached ? ' (cached)' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}