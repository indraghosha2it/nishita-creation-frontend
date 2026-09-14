

// 'use client';

// import { useState, useEffect } from 'react';
// import { 
//   Barcode, 
//   Plus, 
//   Search, 
//   Trash2, 
//   CheckCircle, 
//   Loader2,
//   RefreshCw,
//   Package,
//   Copy,
//   Check,
//   Printer
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Script from 'next/script';

// export default function BarcodeManagement() {
//   const [barcodes, setBarcodes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('available');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [generateModalOpen, setGenerateModalOpen] = useState(false);
//   const [generateCount, setGenerateCount] = useState(100);
//   const [generating, setGenerating] = useState(false);
//   const [stats, setStats] = useState(null);
//   const [copiedBarcode, setCopiedBarcode] = useState(null);
//   const [viewMode, setViewMode] = useState('grid');
//   const [selectedProducts, setSelectedProducts] = useState([]);

//   const fetchBarcodes = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const endpoint = activeTab === 'available' 
//         ? 'http://localhost:5000/api/barcodes/available'
//         : 'http://localhost:5000/api/barcodes/assigned';
      
//       const url = searchTerm 
//         ? `${endpoint}?search=${searchTerm}&limit=100`
//         : `${endpoint}?limit=100`;
      
//       const response = await fetch(url, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setBarcodes(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching barcodes:', error);
//       toast.error('Failed to fetch barcodes');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/barcodes/stats', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setStats(data.data.stats);
//       }
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   useEffect(() => {
//     fetchBarcodes();
//     fetchStats();
//   }, [activeTab, searchTerm]);

//   const handleGenerateBarcodes = async () => {
//     if (generateCount < 1 || generateCount > 1000) {
//       toast.error('Please enter a number between 1 and 1000');
//       return;
//     }
    
//     setGenerating(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         setGenerating(false);
//         return;
//       }
      
//       const response = await fetch('http://localhost:5000/api/barcodes/generate', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           count: generateCount
//         })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Generated ${data.data.generatedCount} barcodes`);
//         setGenerateModalOpen(false);
//         fetchBarcodes();
//         fetchStats();
//       } else {
//         toast.error(data.error || 'Failed to generate barcodes');
//       }
//     } catch (error) {
//       console.error('Error generating barcodes:', error);
//       toast.error('Failed to generate barcodes. Make sure backend is running.');
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const handleReleaseBarcode = async (barcodeNumber, productName) => {
//     if (!confirm(`Release barcode ${barcodeNumber} from "${productName}"?`)) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/barcodes/${barcodeNumber}/release`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Barcode ${barcodeNumber} released`);
//         fetchBarcodes();
//         fetchStats();
//       } else {
//         toast.error(data.error);
//       }
//     } catch (error) {
//       console.error('Error releasing barcode:', error);
//       toast.error('Failed to release barcode');
//     }
//   };

//   const handleDeleteBarcode = async (barcodeNumber) => {
//     if (!confirm(`Delete barcode ${barcodeNumber}? This action cannot be undone.`)) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/barcodes/${barcodeNumber}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Barcode ${barcodeNumber} deleted`);
//         fetchBarcodes();
//         fetchStats();
//       } else {
//         toast.error(data.error);
//       }
//     } catch (error) {
//       console.error('Error deleting barcode:', error);
//       toast.error('Failed to delete barcode');
//     }
//   };

//   const copyToClipboard = (barcodeNumber) => {
//     navigator.clipboard.writeText(barcodeNumber);
//     setCopiedBarcode(barcodeNumber);
//     setTimeout(() => setCopiedBarcode(null), 2000);
//     toast.success('Barcode copied to clipboard');
//   };

//   const handlePrintBarcode = (barcode) => {
//     const printWindow = window.open('', '_blank');
//     const barcodeNumber = barcode.barcodeNumber;
//     const barcodeImageUrl = barcode.barcodeImageUrl;
    
//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Barcode - ${barcodeNumber}</title>
//           <style>
//             @page {
//               size: 80mm 40mm;
//               margin: 5mm;
//             }
//             body {
//               font-family: 'Courier New', monospace;
//               margin: 0;
//               padding: 10px;
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               min-height: 100vh;
//               background: white;
//             }
//             .barcode-container {
//               text-align: center;
//               padding: 15px;
//               border: 1px solid #ddd;
//               border-radius: 8px;
//               background: white;
//             }
//             .barcode-image {
//               max-width: 250px;
//               height: auto;
//             }
//             .barcode-number {
//               font-size: 14px;
//               font-family: 'Courier New', monospace;
//               letter-spacing: 1px;
//               margin-top: 10px;
//               color: #333;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="barcode-container">
//             ${barcodeImageUrl ? 
//               `<img src="${barcodeImageUrl}" class="barcode-image" alt="Barcode" />` :
//               `<div id="barcode-print"></div>`
//             }
//             <div class="barcode-number">${barcodeNumber}</div>
//           </div>
//           ${!barcodeImageUrl ? `
//             <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\/script>
//             <script>
//               JsBarcode("#barcode-print", "${barcodeNumber}", {
//                 format: "CODE128",
//                 lineColor: "#000000",
//                 width: 2,
//                 height: 60,
//                 displayValue: false,
//                 fontSize: 14,
//                 margin: 10
//               });
//               setTimeout(() => { window.print(); }, 500);
//             <\/script>
//           ` : '<script>setTimeout(() => { window.print(); }, 500);<\/script>'}
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   const handlePrintMultiple = () => {
//     const selectedBarcodes = barcodes.filter(b => selectedProducts.includes(b._id));
//     const printWindow = window.open('', '_blank');
    
//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Multiple Barcodes</title>
//           <style>
//             @page {
//               size: A4;
//               margin: 10mm;
//             }
//             body {
//               font-family: 'Courier New', monospace;
//               margin: 0;
//               padding: 20px;
//               background: white;
//             }
//             .barcode-grid {
//               display: grid;
//               grid-template-columns: repeat(3, 1fr);
//               gap: 20px;
//             }
//             .barcode-item {
//               text-align: center;
//               border: 1px solid #ddd;
//               padding: 15px;
//               border-radius: 8px;
//               break-inside: avoid;
//               background: white;
//             }
//             .barcode-number {
//               font-size: 11px;
//               font-family: 'Courier New', monospace;
//               margin-top: 8px;
//               color: #666;
//             }
//             @media print {
//               .barcode-item {
//                 break-inside: avoid;
//               }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="barcode-grid">
//             ${selectedBarcodes.map(barcode => {
//               return `
//                 <div class="barcode-item">
//                   <svg id="barcode-${barcode._id}-print" width="200" height="70"></svg>
//                   <div class="barcode-number">${barcode.barcodeNumber}</div>
//                 </div>
//               `;
//             }).join('')}
//           </div>
//           <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\/script>
//           <script>
//             ${selectedBarcodes.map(barcode => {
//               return `
//                 JsBarcode("#barcode-${barcode._id}-print", "${barcode.barcodeNumber}", {
//                   format: "CODE128",
//                   lineColor: "#000000",
//                   width: 2,
//                   height: 60,
//                   displayValue: false,
//                   fontSize: 12,
//                   margin: 8
//                 });
//               `;
//             }).join('')}
//             setTimeout(() => {
//               window.print();
//             }, 500);
//           <\/script>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   const toggleProductSelection = (barcodeId) => {
//     setSelectedProducts(prev => 
//       prev.includes(barcodeId) 
//         ? prev.filter(id => id !== barcodeId)
//         : [...prev, barcodeId]
//     );
//   };

//   const selectAll = () => {
//     if (selectedProducts.length === barcodes.length) {
//       setSelectedProducts([]);
//     } else {
//       setSelectedProducts(barcodes.map(b => b._id));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF9F0]">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-[#2D3A5C] flex items-center gap-2">
//               <Barcode className="w-6 h-6 text-[#4A8A90]" />
//               Barcode Management
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">Generate and manage numeric CODE-128 barcodes</p>
//           </div>
//           <div className="flex gap-3">
//             <div className="flex rounded-lg border border-gray-200 bg-white overflow-hidden">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`px-3 py-2 text-sm transition ${
//                   viewMode === 'grid' ? 'bg-[#4A8A90] text-white' : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 Grid View
//               </button>
//               <button
//                 onClick={() => setViewMode('table')}
//                 className={`px-3 py-2 text-sm transition ${
//                   viewMode === 'table' ? 'bg-[#4A8A90] text-white' : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 Table View
//               </button>
//             </div>
//             <button
//               onClick={() => setGenerateModalOpen(true)}
//               className="flex items-center gap-2 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition"
//             >
//               <Plus className="w-4 h-4" />
//               Generate Barcodes
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         {stats && (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
//               <p className="text-xs text-gray-500">Total Barcodes</p>
//               <p className="text-2xl font-bold text-[#2D3A5C]">{stats.total}</p>
//             </div>
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200">
//               <p className="text-xs text-gray-500">Available</p>
//               <p className="text-2xl font-bold text-green-600">{stats.available}</p>
//             </div>
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
//               <p className="text-xs text-gray-500">Assigned</p>
//               <p className="text-2xl font-bold text-blue-600">{stats.assigned}</p>
//             </div>
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-200">
//               <p className="text-xs text-gray-500">Usage Rate</p>
//               <p className="text-2xl font-bold text-purple-600">{stats.usageRate}%</p>
//             </div>
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="flex gap-2 mb-6 border-b border-gray-200">
//           <button
//             onClick={() => setActiveTab('available')}
//             className={`px-4 py-2 font-medium transition ${
//               activeTab === 'available'
//                 ? 'text-[#4A8A90] border-b-2 border-[#4A8A90]'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             Available Barcodes ({stats?.available || 0})
//           </button>
//           <button
//             onClick={() => setActiveTab('assigned')}
//             className={`px-4 py-2 font-medium transition ${
//               activeTab === 'assigned'
//                 ? 'text-[#4A8A90] border-b-2 border-[#4A8A90]'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             Assigned Barcodes ({stats?.assigned || 0})
//           </button>
//         </div>

//         {/* Search */}
//         <div className="mb-6">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search barcodes..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
//             />
//           </div>
//         </div>

//         {/* Select All Button */}
//         {barcodes.length > 0 && (
//           <div className="mb-4 flex justify-end">
//             <button
//               onClick={selectAll}
//               className="text-sm text-[#4A8A90] hover:underline"
//             >
//               {selectedProducts.length === barcodes.length ? 'Deselect All' : 'Select All'}
//             </button>
//             {selectedProducts.length > 0 && (
//               <button
//                 onClick={handlePrintMultiple}
//                 className="ml-3 text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
//               >
//                 Print Selected ({selectedProducts.length})
//               </button>
//             )}
//           </div>
//         )}

//         {/* Loading State */}
//         {loading ? (
//           <div className="flex justify-center py-12">
//             <Loader2 className="w-8 h-8 animate-spin text-[#4A8A90]" />
//           </div>
//         ) : barcodes.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
//             <Barcode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//             <p className="text-gray-500">No barcodes found</p>
//             <button
//               onClick={() => setGenerateModalOpen(true)}
//               className="mt-3 text-[#4A8A90] hover:underline"
//             >
//               Generate some barcodes
//             </button>
//           </div>
//         ) : viewMode === 'grid' ? (
//           /* GRID VIEW */
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
//             {barcodes.map((barcode) => (
//               <div
//                 key={barcode._id}
//                 className={`bg-white rounded-xl shadow-sm border-2 p-4 transition-all hover:shadow-md ${
//                   selectedProducts.includes(barcode._id) 
//                     ? 'border-[#4A8A90] bg-[#D4EDEE]/20' 
//                     : 'border-gray-200 hover:border-[#FFB6C1]'
//                 }`}
//               >
//                 <div className="text-center">
//                   {/* Checkbox */}
//                   <div className="flex justify-end mb-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.includes(barcode._id)}
//                       onChange={() => toggleProductSelection(barcode._id)}
//                       onClick={(e) => e.stopPropagation()}
//                       className="w-4 h-4 rounded border-gray-300 text-[#4A8A90]"
//                     />
//                   </div>

//                   {/* Barcode Image */}
//                   <div className="mb-3 p-3 bg-gray-50 rounded-lg min-h-[120px] flex items-center justify-center">
//                     {barcode.barcodeImageUrl ? (
//                       <img 
//                         src={barcode.barcodeImageUrl} 
//                         alt={`Barcode ${barcode.barcodeNumber}`}
//                         className="mx-auto"
//                         style={{ maxWidth: '200px', height: 'auto' }}
//                         onError={(e) => {
//                           e.target.style.display = 'none';
//                         }}
//                       />
//                     ) : null}
//                     <svg 
//                       id={`barcode-svg-${barcode._id}`} 
//                       className="mx-auto"
//                       style={{ display: barcode.barcodeImageUrl ? 'none' : 'block' }}
//                       width="200" 
//                       height="90"
//                     ></svg>
//                   </div>
                  
//                   {/* Barcode Number */}
//                   <div className="mt-2">
//                     <code className="text-sm font-mono font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded">
//                       {barcode.barcodeNumber}
//                     </code>
//                   </div>
                  
//                   {/* Status */}
//                   <div className="mt-2">
//                     {barcode.status === 'available' ? (
//                       <span className="flex items-center justify-center gap-1 text-xs text-green-600">
//                         <CheckCircle className="w-3 h-3" />
//                         Available
//                       </span>
//                     ) : (
//                       <span className="flex items-center justify-center gap-1 text-xs text-blue-600">
//                         <Package className="w-3 h-3" />
//                         Assigned
//                       </span>
//                     )}
//                   </div>
                  
//                   {/* Assigned Product Name */}
//                   {barcode.status === 'assigned' && barcode.productName && (
//                     <p className="text-xs text-gray-500 mt-1 truncate">
//                       Product: {barcode.productName}
//                     </p>
//                   )}
                  
//                   {/* Generated Date */}
//                   <p className="text-xs text-gray-400 mt-2">
//                     Created: {new Date(barcode.createdAt).toLocaleDateString()}
//                   </p>
                  
//                   {/* Action Buttons */}
//                   <div className="flex justify-center gap-2 mt-3 pt-2 border-t border-gray-100">
//                     <button
//                       onClick={() => handlePrintBarcode(barcode)}
//                       className="p-1.5 rounded hover:bg-gray-100 transition-colors"
//                       title="Print Barcode"
//                     >
//                       <Printer className="w-4 h-4 text-gray-600" />
//                     </button>
//                     <button
//                       onClick={() => copyToClipboard(barcode.barcodeNumber)}
//                       className="p-1.5 rounded hover:bg-gray-100 transition-colors"
//                       title="Copy Barcode Number"
//                     >
//                       {copiedBarcode === barcode.barcodeNumber ? (
//                         <Check className="w-4 h-4 text-green-500" />
//                       ) : (
//                         <Copy className="w-4 h-4 text-gray-600" />
//                       )}
//                     </button>
//                     {activeTab === 'assigned' && (
//                       <button
//                         onClick={() => handleReleaseBarcode(barcode.barcodeNumber, barcode.productName)}
//                         className="p-1.5 rounded hover:bg-gray-100 transition-colors"
//                         title="Release Barcode"
//                       >
//                         <RefreshCw className="w-4 h-4 text-blue-500" />
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDeleteBarcode(barcode.barcodeNumber)}
//                       className="p-1.5 rounded hover:bg-gray-100 transition-colors"
//                       title="Delete Barcode"
//                     >
//                       <Trash2 className="w-4 h-4 text-red-500" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           /* TABLE VIEW */
//           <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       <input
//                         type="checkbox"
//                         checked={selectedProducts.length === barcodes.length && barcodes.length > 0}
//                         onChange={selectAll}
//                         className="w-4 h-4 rounded border-gray-300 text-[#4A8A90]"
//                       />
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barcode Image</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barcode Number</th>
//                     {activeTab === 'assigned' && (
//                       <>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
//                       </>
//                     )}
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
//                     <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {barcodes.map((barcode) => (
//                     <tr key={barcode._id} className="hover:bg-gray-50">
//                       <td className="px-4 py-3">
//                         <input
//                           type="checkbox"
//                           checked={selectedProducts.includes(barcode._id)}
//                           onChange={() => toggleProductSelection(barcode._id)}
//                           className="w-4 h-4 rounded border-gray-300 text-[#4A8A90]"
//                         />
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="w-32">
//                           {barcode.barcodeImageUrl ? (
//                             <img 
//                               src={barcode.barcodeImageUrl} 
//                               alt={`Barcode ${barcode.barcodeNumber}`}
//                               style={{ maxWidth: '120px', height: 'auto' }}
//                             />
//                           ) : (
//                             <svg
//                               id={`barcode-svg-table-${barcode._id}`}
//                               width="120"
//                               height="50"
//                               style={{ display: 'block' }}
//                             ></svg>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <code className="font-mono text-sm font-medium">{barcode.barcodeNumber}</code>
//                           <button
//                             onClick={() => copyToClipboard(barcode.barcodeNumber)}
//                             className="p-1 hover:bg-gray-100 rounded"
//                           >
//                             {copiedBarcode === barcode.barcodeNumber ? (
//                               <Check className="w-3 h-3 text-green-500" />
//                             ) : (
//                               <Copy className="w-3 h-3 text-gray-400" />
//                             )}
//                           </button>
//                         </div>
//                       </td>
//                       {activeTab === 'assigned' && (
//                         <>
//                           <td className="px-4 py-3">
//                             <div className="flex items-center gap-2">
//                               {barcode.productId?.images?.[0]?.url && (
//                                 <img 
//                                   src={barcode.productId.images[0].url} 
//                                   alt="" 
//                                   className="w-6 h-6 rounded object-cover"
//                                 />
//                               )}
//                               <span className="text-sm truncate max-w-[200px]">
//                                 {barcode.productName || barcode.productId?.productName}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3">
//                             <code className="text-xs text-gray-500">{barcode.productSku || barcode.productId?.skuCode}</code>
//                           </td>
//                         </>
//                       )}
//                       <td className="px-4 py-3">
//                         {barcode.status === 'available' ? (
//                           <span className="flex items-center gap-1 text-xs text-green-600">
//                             <CheckCircle className="w-3 h-3" />
//                             Available
//                           </span>
//                         ) : (
//                           <span className="flex items-center gap-1 text-xs text-blue-600">
//                             <Package className="w-3 h-3" />
//                             Assigned
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-4 py-3 text-xs text-gray-500">
//                         {new Date(barcode.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-4 py-3 text-right">
//                         <div className="flex justify-end gap-2">
//                           <button
//                             onClick={() => handlePrintBarcode(barcode)}
//                             className="p-1 text-gray-500 hover:text-gray-700"
//                             title="Print barcode"
//                           >
//                             <Printer className="w-4 h-4" />
//                           </button>
//                           {activeTab === 'assigned' && (
//                             <button
//                               onClick={() => handleReleaseBarcode(barcode.barcodeNumber, barcode.productName)}
//                               className="p-1 text-blue-500 hover:text-blue-700"
//                               title="Release barcode"
//                             >
//                               <RefreshCw className="w-4 h-4" />
//                             </button>
//                           )}
//                           <button
//                             onClick={() => handleDeleteBarcode(barcode.barcodeNumber)}
//                             className="p-1 text-red-500 hover:text-red-700"
//                             title="Delete barcode"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Generate Modal */}
//       {generateModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
//             <h2 className="text-xl font-bold text-[#2D3A5C] mb-4">Generate Barcodes</h2>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Number of Barcodes
//                 </label>
//                 <input
//                   type="number"
//                   value={generateCount}
//                   onChange={(e) => setGenerateCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
//                   min="1"
//                   max="1000"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Generate 1 to 1000 barcodes at a time</p>
//               </div>
              
//               <div className="bg-blue-50 p-3 rounded-lg">
//                 <p className="text-sm text-blue-800 font-medium mb-1">Numeric Barcode Format</p>
//                 <p className="text-xs text-blue-700">
//                   • Format: <strong>8XXXXXXXXX</strong> (10 digits total)
//                   <br />• Example: 8000000001, 8000000002, 8000000003, etc.
//                   <br />• First digit: 8 (toy category)
//                   <br />• Last digit: Check digit for validation
//                   <br />• Each barcode is unique and scannable
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => setGenerateModalOpen(false)}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleGenerateBarcodes}
//                 disabled={generating}
//                 className="flex-1 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Barcode className="w-4 h-4" />}
//                 {generating ? 'Generating...' : 'Generate'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Script to generate fallback SVGs */}
//       <Script 
//         src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"
//         strategy="afterInteractive"
//         onLoad={() => {
//           setTimeout(() => {
//             barcodes.forEach(barcode => {
//               if (typeof window !== 'undefined' && window.JsBarcode) {
//                 try {
//                   const gridSvg = document.getElementById(`barcode-svg-${barcode._id}`);
//                   if (gridSvg && (!barcode.barcodeImageUrl || gridSvg.style.display !== 'none')) {
//                     window.JsBarcode(`#barcode-svg-${barcode._id}`, barcode.barcodeNumber, {
//                       format: "CODE128",
//                       lineColor: "#000000",
//                       width: 2,
//                       height: 60,
//                       displayValue: true,
//                       fontSize: 12,
//                       margin: 10
//                     });
//                   }
                  
//                   const tableSvg = document.getElementById(`barcode-svg-table-${barcode._id}`);
//                   if (tableSvg) {
//                     window.JsBarcode(`#barcode-svg-table-${barcode._id}`, barcode.barcodeNumber, {
//                       format: "CODE128",
//                       lineColor: "#000000",
//                       width: 1.5,
//                       height: 40,
//                       displayValue: false,
//                       fontSize: 10,
//                       margin: 5
//                     });
//                   }
//                 } catch (e) {
//                   console.error('SVG barcode generation failed:', e);
//                 }
//               }
//             });
//           }, 500);
//         }}
//       />
//     </div>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Barcode, 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle, 
  Loader2,
  RefreshCw,
  Package,
  Copy,
  Check,
  Printer,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import Script from 'next/script';

export default function BarcodeManagement() {
  const router = useRouter();
  const [barcodes, setBarcodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [generateCount, setGenerateCount] = useState(100);
  const [generating, setGenerating] = useState(false);
  const [stats, setStats] = useState(null);
  const [copiedBarcode, setCopiedBarcode] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  // Barcode Scanner State
  const [isScannerActive, setIsScannerActive] = useState(false);
  const barcodeBuffer = useRef('');
  const scanTimeout = useRef(null);

  const fetchBarcodes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const endpoint = activeTab === 'available' 
        ? 'http://localhost:5000/api/barcodes/available'
        : 'http://localhost:5000/api/barcodes/assigned';
      
      const url = searchTerm 
        ? `${endpoint}?search=${searchTerm}&limit=100`
        : `${endpoint}?limit=100`;
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setBarcodes(data.data);
      }
    } catch (error) {
      console.error('Error fetching barcodes:', error);
      toast.error('Failed to fetch barcodes');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/barcodes/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchBarcodes();
    fetchStats();
  }, [activeTab, searchTerm]);

  // Barcode Scanner Listener - Opens product page when barcode is scanned
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if scanner is active (you can make it always active or add a toggle)
      // For now, it's always listening for barcode scans
      
      // Clear previous timeout
      if (scanTimeout.current) {
        clearTimeout(scanTimeout.current);
      }
      
      // Check for Enter key (scanner termination)
      if (event.key === 'Enter') {
        if (barcodeBuffer.current.trim()) {
          const scannedBarcode = barcodeBuffer.current.trim();
          console.log('Barcode scanned:', scannedBarcode);
          handleScannedBarcode(scannedBarcode);
          barcodeBuffer.current = '';
        }
        return;
      }
      
      // Ignore modifier keys
      if (event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt' || 
          event.key === 'Meta' || event.key.length > 1) {
        return;
      }
      
      // Add character to buffer (only digits for barcodes)
      if (/[0-9]/.test(event.key)) {
        barcodeBuffer.current += event.key;
      }
      
      // Set timeout to clear buffer if scan is incomplete
      scanTimeout.current = setTimeout(() => {
        barcodeBuffer.current = '';
      }, 100);
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    // toast.success('Barcode scanner ready! Scan any barcode to view product', {
    //   duration: 3000,
    //   icon: '📷'
    // });
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (scanTimeout.current) {
        clearTimeout(scanTimeout.current);
      }
    };
  }, []);

  // Handle scanned barcode - navigate to product page
  const handleScannedBarcode = async (barcode) => {
    const toastId = toast.loading(`Searching for product with barcode: ${barcode}...`);
    
    try {
      // First check if this barcode exists in our current list
      const foundBarcode = barcodes.find(b => b.barcodeNumber === barcode);
      
      if (foundBarcode && foundBarcode.status === 'assigned' && foundBarcode.productId) {
        // Barcode is assigned to a product, navigate to product page
        const productId = foundBarcode.productId._id || foundBarcode.productId;
        toast.success(`Product found! Redirecting...`, { id: toastId });
        router.push(`/productDetails?id=${productId}`);
        return;
      }
      
      // If not found in current list or not assigned, try API
      const response = await fetch(`http://localhost:5000/api/products/barcode/${encodeURIComponent(barcode)}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        toast.success(`Product found: ${data.data.productName}`, { id: toastId });
        router.push(`/productDetails?id=${data.data._id}`);
      } else {
        toast.error(`No product found for barcode: ${barcode}`, { id: toastId });
      }
    } catch (error) {
      console.error('Error finding product:', error);
      toast.error('Failed to find product. Please try again.', { id: toastId });
    }
  };

  // Handle click on barcode card - navigate to product page if assigned
  const handleBarcodeClick = (barcode) => {
    if (barcode.status === 'assigned' && barcode.productId) {
      const productId = barcode.productId._id || barcode.productId;
      router.push(`/productDetails?id=${productId}`);
    } else if (barcode.status === 'assigned' && barcode.productName) {
      // If productId is not populated but we have product info, try to find by name
      toast.info('Product details not fully loaded, please refresh');
    } else {
      toast.info('This barcode is not assigned to any product yet');
    }
  };

  const handleGenerateBarcodes = async () => {
    if (generateCount < 1 || generateCount > 1000) {
      toast.error('Please enter a number between 1 and 1000');
      return;
    }
    
    setGenerating(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setGenerating(false);
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/barcodes/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          count: generateCount
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Generated ${data.data.generatedCount} barcodes`);
        setGenerateModalOpen(false);
        fetchBarcodes();
        fetchStats();
      } else {
        toast.error(data.error || 'Failed to generate barcodes');
      }
    } catch (error) {
      console.error('Error generating barcodes:', error);
      toast.error('Failed to generate barcodes. Make sure backend is running.');
    } finally {
      setGenerating(false);
    }
  };

  const handleReleaseBarcode = async (barcodeNumber, productName) => {
    if (!confirm(`Release barcode ${barcodeNumber} from "${productName}"?`)) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/barcodes/${barcodeNumber}/release`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Barcode ${barcodeNumber} released`);
        fetchBarcodes();
        fetchStats();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error releasing barcode:', error);
      toast.error('Failed to release barcode');
    }
  };

  const handleDeleteBarcode = async (barcodeNumber) => {
    if (!confirm(`Delete barcode ${barcodeNumber}? This action cannot be undone.`)) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/barcodes/${barcodeNumber}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Barcode ${barcodeNumber} deleted`);
        fetchBarcodes();
        fetchStats();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error deleting barcode:', error);
      toast.error('Failed to delete barcode');
    }
  };

  const copyToClipboard = (barcodeNumber) => {
    navigator.clipboard.writeText(barcodeNumber);
    setCopiedBarcode(barcodeNumber);
    setTimeout(() => setCopiedBarcode(null), 2000);
    toast.success('Barcode copied to clipboard');
  };

  // const handlePrintBarcode = (barcode) => {
  //   const printWindow = window.open('', '_blank');
  //   const barcodeNumber = barcode.barcodeNumber;
  //   const barcodeImageUrl = barcode.barcodeImageUrl;
    
  //   printWindow.document.write(`
  //     <!DOCTYPE html>
  //     <html>
  //       <head>
  //         <title>Barcode - ${barcodeNumber}</title>
  //         <style>
  //           @page {
  //             size: 80mm 40mm;
  //             margin: 5mm;
  //           }
  //           body {
  //             font-family: 'Courier New', monospace;
  //             margin: 0;
  //             padding: 10px;
  //             display: flex;
  //             justify-content: center;
  //             align-items: center;
  //             min-height: 100vh;
  //             background: white;
  //           }
  //           .barcode-container {
  //             text-align: center;
  //             padding: 15px;
  //             border: 1px solid #ddd;
  //             border-radius: 8px;
  //             background: white;
  //           }
  //           .barcode-image {
  //             max-width: 250px;
  //             height: auto;
  //           }
  //           .barcode-number {
  //             font-size: 14px;
  //             font-family: 'Courier New', monospace;
  //             letter-spacing: 1px;
  //             margin-top: 10px;
  //             color: #333;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="barcode-container">
  //           ${barcodeImageUrl ? 
  //             `<img src="${barcodeImageUrl}" class="barcode-image" alt="Barcode" />` :
  //             `<div id="barcode-print"></div>`
  //           }
  //           <div class="barcode-number">${barcodeNumber}</div>
  //         </div>
  //         ${!barcodeImageUrl ? `
  //           <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\/script>
  //           <script>
  //             JsBarcode("#barcode-print", "${barcodeNumber}", {
  //               format: "CODE128",
  //               lineColor: "#000000",
  //               width: 2,
  //               height: 60,
  //               displayValue: false,
  //               fontSize: 14,
  //               margin: 10
  //             });
  //             setTimeout(() => { window.print(); }, 500);
  //           <\/script>
  //         ` : '<script>setTimeout(() => { window.print(); }, 500);<\/script>'}
  //       </body>
  //     </html>
  //   `);
  //   printWindow.document.close();
  // };

const handlePrintBarcode = (barcode) => {
  const printWindow = window.open('', '_blank');
  const barcodeNumber = barcode.barcodeNumber;
  const barcodeImageUrl = barcode.barcodeImageUrl;
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Barcode - ${barcodeNumber}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            size: auto;
            margin: 10mm;
          }
          
          body {
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: white;
          }
          
          .barcode-container {
            text-align: center;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: white;
            page-break-inside: avoid;
            break-inside: avoid;
            width: 300px;
            margin: 0 auto;
          }
          
          .barcode-image {
            max-width: 280px;
            height: auto;
            display: block;
            margin: 0 auto;
          }
          
          .barcode-number {
            font-size: 14px;
            font-family: 'Courier New', monospace;
            letter-spacing: 1px;
            margin-top: 15px;
            color: #333;
            text-align: center;
          }
          
          .format {
            font-size: 10px;
            color: #999;
            margin-top: 8px;
            text-align: center;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .barcode-container {
              border: none;
              padding: 10px;
              page-break-inside: avoid;
              break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="barcode-container">
          ${barcodeImageUrl ? 
            `<img src="${barcodeImageUrl}" class="barcode-image" alt="Barcode" />` :
            `<div id="barcode-print" style="margin: 0 auto;"></div>`
          }
          <div class="barcode-number">${barcodeNumber}</div>
          <div class="format">CODE-128</div>
        </div>
        ${!barcodeImageUrl ? `
          <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\/script>
          <script>
            JsBarcode("#barcode-print", "${barcodeNumber}", {
              format: "CODE128",
              lineColor: "#000000",
              width: 2,
              height: 60,
              displayValue: false,
              fontSize: 14,
              margin: 10
            });
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 500);
            }, 500);
          <\/script>
        ` : `
          <script>
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 500);
            }, 500);
          <\/script>
        `}
      </body>
    </html>
  `);
  printWindow.document.close();
};

  // const handlePrintMultiple = () => {
  //   const selectedBarcodes = barcodes.filter(b => selectedProducts.includes(b._id));
  //   const printWindow = window.open('', '_blank');
    
  //   printWindow.document.write(`
  //     <!DOCTYPE html>
  //     <html>
  //       <head>
  //         <title>Multiple Barcodes</title>
  //         <style>
  //           @page {
  //             size: A4;
  //             margin: 10mm;
  //           }
  //           body {
  //             font-family: 'Courier New', monospace;
  //             margin: 0;
  //             padding: 20px;
  //             background: white;
  //           }
  //           .barcode-grid {
  //             display: grid;
  //             grid-template-columns: repeat(3, 1fr);
  //             gap: 20px;
  //           }
  //           .barcode-item {
  //             text-align: center;
  //             border: 1px solid #ddd;
  //             padding: 15px;
  //             border-radius: 8px;
  //             break-inside: avoid;
  //             background: white;
  //           }
  //           .barcode-number {
  //             font-size: 11px;
  //             font-family: 'Courier New', monospace;
  //             margin-top: 8px;
  //             color: #666;
  //           }
  //           @media print {
  //             .barcode-item {
  //               break-inside: avoid;
  //             }
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="barcode-grid">
  //           ${selectedBarcodes.map(barcode => {
  //             return `
  //               <div class="barcode-item">
  //                 <svg id="barcode-${barcode._id}-print" width="200" height="70"></svg>
  //                 <div class="barcode-number">${barcode.barcodeNumber}</div>
  //               </div>
  //             `;
  //           }).join('')}
  //         </div>
  //         <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\/script>
  //         <script>
  //           ${selectedBarcodes.map(barcode => {
  //             return `
  //               JsBarcode("#barcode-${barcode._id}-print", "${barcode.barcodeNumber}", {
  //                 format: "CODE128",
  //                 lineColor: "#000000",
  //                 width: 2,
  //                 height: 60,
  //                 displayValue: false,
  //                 fontSize: 12,
  //                 margin: 8
  //               });
  //             `;
  //           }).join('')}
  //           setTimeout(() => {
  //             window.print();
  //           }, 500);
  //         <\/script>
  //       </body>
  //     </html>
  //   `);
  //   printWindow.document.close();
  // };

  const handlePrintMultiple = () => {
  const selectedBarcodes = barcodes.filter(b => selectedProducts.includes(b._id));
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Multiple Barcodes</title>
        <style>
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 20px;
            background: white;
          }
          .barcode-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
          }
          .barcode-item {
            text-align: center;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 8px;
            break-inside: avoid;
            page-break-inside: avoid;
            background: white;
          }
          .barcode-number {
            font-size: 11px;
            font-family: 'Courier New', monospace;
            margin-top: 8px;
            color: #666;
          }
          @media print {
            .barcode-item {
              break-inside: avoid;
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="barcode-grid">
          ${selectedBarcodes.map(barcode => {
            return `
              <div class="barcode-item">
                <svg id="barcode-${barcode._id}-print" width="200" height="70"></svg>
                <div class="barcode-number">${barcode.barcodeNumber}</div>
              </div>
            `;
          }).join('')}
        </div>
        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\/script>
        <script>
          ${selectedBarcodes.map(barcode => {
            return `
              JsBarcode("#barcode-${barcode._id}-print", "${barcode.barcodeNumber}", {
                format: "CODE128",
                lineColor: "#000000",
                width: 2,
                height: 60,
                displayValue: false,
                fontSize: 12,
                margin: 8
              });
            `;
          }).join('')}
          setTimeout(() => {
            window.print();
            setTimeout(() => window.close(), 500);
          }, 500);
        <\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
};
  const toggleProductSelection = (barcodeId) => {
    setSelectedProducts(prev => 
      prev.includes(barcodeId) 
        ? prev.filter(id => id !== barcodeId)
        : [...prev, barcodeId]
    );
  };

  const selectAll = () => {
    if (selectedProducts.length === barcodes.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(barcodes.map(b => b._id));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <div className="container mx-auto px-4 py-8">
        {/* Scanner Status Bar */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700 font-medium">
              🔍 Barcode Scanner Active - Scan any assigned barcode to view product
            </span>
            <span className="text-xs text-gray-500">
              (USB barcode scanner)
            </span>
          </div>
          <div className="text-xs text-gray-500">
            💡 Tip: Click on any assigned barcode card to view product details
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#2D3A5C] flex items-center gap-2">
              <Barcode className="w-6 h-6 text-[#4A8A90]" />
              Barcode Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">Generate and manage numeric CODE-128 barcodes</p>
          </div>
          <div className="flex gap-3">
            <div className="flex rounded-lg border border-gray-200 bg-white overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm transition ${
                  viewMode === 'grid' ? 'bg-[#4A8A90] text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 text-sm transition ${
                  viewMode === 'table' ? 'bg-[#4A8A90] text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Table View
              </button>
            </div>
            <button
              onClick={() => setGenerateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition"
            >
              <Plus className="w-4 h-4" />
              Generate Barcodes
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500">Total Barcodes</p>
              <p className="text-2xl font-bold text-[#2D3A5C]">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200">
              <p className="text-xs text-gray-500">Available</p>
              <p className="text-2xl font-bold text-green-600">{stats.available}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
              <p className="text-xs text-gray-500">Assigned</p>
              <p className="text-2xl font-bold text-blue-600">{stats.assigned}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-200">
              <p className="text-xs text-gray-500">Usage Rate</p>
              <p className="text-2xl font-bold text-purple-600">{stats.usageRate}%</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-4 py-2 font-medium transition ${
              activeTab === 'available'
                ? 'text-[#4A8A90] border-b-2 border-[#4A8A90]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Available Barcodes ({stats?.available || 0})
          </button>
          <button
            onClick={() => setActiveTab('assigned')}
            className={`px-4 py-2 font-medium transition ${
              activeTab === 'assigned'
                ? 'text-[#4A8A90] border-b-2 border-[#4A8A90]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Assigned Barcodes ({stats?.assigned || 0})
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search barcodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Select All Button */}
        {barcodes.length > 0 && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={selectAll}
              className="text-sm text-[#4A8A90] hover:underline"
            >
              {selectedProducts.length === barcodes.length ? 'Deselect All' : 'Select All'}
            </button>
            {selectedProducts.length > 0 && (
              <button
                onClick={handlePrintMultiple}
                className="ml-3 text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                Print Selected ({selectedProducts.length})
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#4A8A90]" />
          </div>
        ) : barcodes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Barcode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No barcodes found</p>
            <button
              onClick={() => setGenerateModalOpen(true)}
              className="mt-3 text-[#4A8A90] hover:underline"
            >
              Generate some barcodes
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {barcodes.map((barcode) => (
              <div
                key={barcode._id}
                onClick={() => handleBarcodeClick(barcode)}
                className={`cursor-pointer transition-all duration-200 ${
                  barcode.status === 'assigned' 
                    ? 'hover:scale-105 hover:shadow-lg' 
                    : 'opacity-70'
                }`}
              >
                <div
                  className={`bg-white rounded-xl shadow-sm border-2 p-4 transition-all hover:shadow-md ${
                    selectedProducts.includes(barcode._id) 
                      ? 'border-[#4A8A90] bg-[#D4EDEE]/20' 
                      : 'border-gray-200 hover:border-[#FFB6C1]'
                  } ${barcode.status === 'assigned' ? 'hover:border-[#4A8A90]' : ''}`}
                >
                  <div className="text-center">
                    {/* Checkbox */}
                    <div className="flex justify-end mb-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(barcode._id)}
                        onChange={() => toggleProductSelection(barcode._id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#4A8A90]"
                      />
                    </div>

                    {/* Barcode Image */}
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg min-h-[120px] flex items-center justify-center">
                      {barcode.barcodeImageUrl ? (
                        <img 
                          src={barcode.barcodeImageUrl} 
                          alt={`Barcode ${barcode.barcodeNumber}`}
                          className="mx-auto"
                          style={{ maxWidth: '200px', height: 'auto' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : null}
                      <svg 
                        id={`barcode-svg-${barcode._id}`} 
                        className="mx-auto"
                        style={{ display: barcode.barcodeImageUrl ? 'none' : 'block' }}
                        width="200" 
                        height="90"
                      ></svg>
                    </div>
                    
                    {/* Barcode Number */}
                    <div className="mt-2">
                      <code className="text-sm font-mono font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded">
                        {barcode.barcodeNumber}
                      </code>
                    </div>
                    
                    {/* Status with View Action */}
                    <div className="mt-2">
                      {barcode.status === 'available' ? (
                        <span className="flex items-center justify-center gap-1 text-xs text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          Available
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1 text-xs text-blue-600">
                          <Package className="w-3 h-3" />
                          Assigned
                          <Eye className="w-3 h-3 ml-1" />
                        </span>
                      )}
                    </div>
                    
                    {/* Assigned Product Name */}
                    {barcode.status === 'assigned' && barcode.productName && (
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        Product: {barcode.productName}
                      </p>
                    )}
                    
                    {/* Generated Date */}
                    <p className="text-xs text-gray-400 mt-2">
                      Created: {new Date(barcode.createdAt).toLocaleDateString()}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-center gap-2 mt-3 pt-2 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
                      {barcode.status === 'assigned' && (
                        <button
                          onClick={() => handleBarcodeClick(barcode)}
                          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                          title="View Product"
                        >
                          <Eye className="w-4 h-4 text-[#4A8A90]" />
                        </button>
                      )}
                      <button
                        onClick={() => handlePrintBarcode(barcode)}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                        title="Print Barcode"
                      >
                        <Printer className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(barcode.barcodeNumber)}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                        title="Copy Barcode Number"
                      >
                        {copiedBarcode === barcode.barcodeNumber ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                      {activeTab === 'assigned' && (
                        <button
                          onClick={() => handleReleaseBarcode(barcode.barcodeNumber, barcode.productName)}
                          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                          title="Release Barcode"
                        >
                          <RefreshCw className="w-4 h-4 text-blue-500" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteBarcode(barcode.barcodeNumber)}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                        title="Delete Barcode"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === barcodes.length && barcodes.length > 0}
                        onChange={selectAll}
                        className="w-4 h-4 rounded border-gray-300 text-[#4A8A90]"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barcode Image</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barcode Number</th>
                    {activeTab === 'assigned' && (
                      <>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                      </>
                    )}
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {barcodes.map((barcode) => (
                    <tr 
                      key={barcode._id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleBarcodeClick(barcode)}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(barcode._id)}
                          onChange={() => toggleProductSelection(barcode._id)}
                          className="w-4 h-4 rounded border-gray-300 text-[#4A8A90]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-32">
                          {barcode.barcodeImageUrl ? (
                            <img 
                              src={barcode.barcodeImageUrl} 
                              alt={`Barcode ${barcode.barcodeNumber}`}
                              style={{ maxWidth: '120px', height: 'auto' }}
                            />
                          ) : (
                            <svg
                              id={`barcode-svg-table-${barcode._id}`}
                              width="120"
                              height="50"
                              style={{ display: 'block' }}
                            ></svg>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-sm font-medium">{barcode.barcodeNumber}</code>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(barcode.barcodeNumber);
                            }}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            {copiedBarcode === barcode.barcodeNumber ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </td>
                      {activeTab === 'assigned' && (
                        <>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {barcode.productId?.images?.[0]?.url && (
                                <img 
                                  src={barcode.productId.images[0].url} 
                                  alt="" 
                                  className="w-6 h-6 rounded object-cover"
                                />
                              )}
                              <span className="text-sm truncate max-w-[200px]">
                                {barcode.productName || barcode.productId?.productName}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <code className="text-xs text-gray-500">{barcode.productSku || barcode.productId?.skuCode}</code>
                          </td>
                        </>
                      )}
                      <td className="px-4 py-3">
                        {barcode.status === 'available' ? (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle className="w-3 h-3" />
                            Available
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-blue-600">
                            <Package className="w-3 h-3" />
                            Assigned
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {new Date(barcode.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          {barcode.status === 'assigned' && (
                            <button
                              onClick={() => handleBarcodeClick(barcode)}
                              className="p-1 text-[#4A8A90] hover:text-[#3A7A80]"
                              title="View Product"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handlePrintBarcode(barcode)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            title="Print barcode"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          {activeTab === 'assigned' && (
                            <button
                              onClick={() => handleReleaseBarcode(barcode.barcodeNumber, barcode.productName)}
                              className="p-1 text-blue-500 hover:text-blue-700"
                              title="Release barcode"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteBarcode(barcode.barcodeNumber)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Delete barcode"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Generate Modal */}
      {generateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-bold text-[#2D3A5C] mb-4">Generate Barcodes</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Barcodes
                </label>
                <input
                  type="number"
                  value={generateCount}
                  onChange={(e) => setGenerateCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                  min="1"
                  max="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Generate 1 to 1000 barcodes at a time</p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-1">Numeric Barcode Format</p>
                <p className="text-xs text-blue-700">
                  • Format: <strong>8XXXXXXXXX</strong> (10 digits total)
                  <br />• Example: 8000000001, 8000000002, 8000000003, etc.
                  <br />• First digit: 8 (toy category)
                  <br />• Last digit: Check digit for validation
                  <br />• Each barcode is unique and scannable
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setGenerateModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateBarcodes}
                disabled={generating}
                className="flex-1 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Barcode className="w-4 h-4" />}
                {generating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Script to generate fallback SVGs */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          setTimeout(() => {
            barcodes.forEach(barcode => {
              if (typeof window !== 'undefined' && window.JsBarcode) {
                try {
                  const gridSvg = document.getElementById(`barcode-svg-${barcode._id}`);
                  if (gridSvg && (!barcode.barcodeImageUrl || gridSvg.style.display !== 'none')) {
                    window.JsBarcode(`#barcode-svg-${barcode._id}`, barcode.barcodeNumber, {
                      format: "CODE128",
                      lineColor: "#000000",
                      width: 2,
                      height: 60,
                      displayValue: true,
                      fontSize: 12,
                      margin: 10
                    });
                  }
                  
                  const tableSvg = document.getElementById(`barcode-svg-table-${barcode._id}`);
                  if (tableSvg) {
                    window.JsBarcode(`#barcode-svg-table-${barcode._id}`, barcode.barcodeNumber, {
                      format: "CODE128",
                      lineColor: "#000000",
                      width: 1.5,
                      height: 40,
                      displayValue: false,
                      fontSize: 10,
                      margin: 5
                    });
                  }
                } catch (e) {
                  console.error('SVG barcode generation failed:', e);
                }
              }
            });
          }, 500);
        }}
      />
    </div>
  );
}