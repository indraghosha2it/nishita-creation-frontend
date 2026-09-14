

// // app/admin/barcode-scanner/page.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { toast } from 'sonner';
// import { 
//   Package, Loader2, Info, AlertCircle, CheckCircle, Search, 
//   Star, Truck, ShieldCheck, RotateCcw, Tag, Users, FolderTree,
//   Sparkles, Heart, ShoppingCart, Share2, ClipboardList
// } from 'lucide-react';

// export default function BarcodeScannerPage() {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [lastScanned, setLastScanned] = useState(null);
//   const [scanHistory, setScanHistory] = useState([]);
//   const [manualMode, setManualMode] = useState(false);
//   const [activeTab, setActiveTab] = useState('description');
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
  
//   // For collecting keystrokes from USB scanner
//   const barcodeBuffer = useRef('');
//   const scanTimeout = useRef(null);
//   const scannerActive = useRef(true);

//   // Fetch product details by barcode/SKU
//   const fetchProductByBarcode = async (barcodeValue) => {
//     if (!barcodeValue || barcodeValue.trim() === '') return;
    
//     setLoading(true);
//     setActiveImageIndex(0);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/products/barcode/${barcodeValue}`, {
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setProduct(data.data);
//         setLastScanned(barcodeValue);
        
//         // Add to scan history
//         setScanHistory(prev => [
//           { 
//             barcode: barcodeValue, 
//             productName: data.data.productName,
//             timestamp: new Date(),
//             sku: data.data.skuCode
//           },
//           ...prev.slice(0, 9)
//         ]);
        
//         toast.success(`✓ Product found: ${data.data.productName}`);
//         playBeep('success');
//       } else {
//         toast.error(`Product not found for barcode: ${barcodeValue}`);
//         setProduct(null);
//         playBeep('error');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to fetch product details');
//       setProduct(null);
//       playBeep('error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Play beep sound for scanner feedback
//   const playBeep = (type) => {
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
    
//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);
    
//     oscillator.frequency.value = type === 'success' ? 880 : 440;
//     gainNode.gain.value = 0.1;
    
//     oscillator.start();
//     gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
//     oscillator.stop(audioContext.currentTime + 0.2);
//   };

//   // Handle USB Barcode Scanner Input
//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (manualMode && document.activeElement?.tagName === 'INPUT') {
//         return;
//       }
      
//       if (scanTimeout.current) {
//         clearTimeout(scanTimeout.current);
//       }
      
//       if (event.key === 'Enter') {
//         if (barcodeBuffer.current.trim()) {
//           console.log('Barcode scanned:', barcodeBuffer.current);
//           fetchProductByBarcode(barcodeBuffer.current.trim());
//           barcodeBuffer.current = '';
//         }
//         return;
//       }
      
//       if (event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt' || 
//           event.key === 'Meta' || event.key.length > 1) {
//         return;
//       }
      
//       barcodeBuffer.current += event.key;
      
//       scanTimeout.current = setTimeout(() => {
//         if (barcodeBuffer.current && barcodeBuffer.current.length > 0) {
//           console.log('Buffer cleared (timeout):', barcodeBuffer.current);
//           barcodeBuffer.current = '';
//         }
//       }, 100);
//     };
    
//     window.addEventListener('keydown', handleKeyPress);
    
//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//       if (scanTimeout.current) {
//         clearTimeout(scanTimeout.current);
//       }
//     };
//   }, [manualMode]);

//   // Handle manual SKU input
//   const handleManualSubmit = (e) => {
//     e.preventDefault();
//     const input = e.target.elements.sku.value;
//     if (input.trim()) {
//       fetchProductByBarcode(input.trim());
//       e.target.reset();
//     }
//   };

//   // Clear current product
//   const clearProduct = () => {
//     setProduct(null);
//     setLastScanned(null);
//     setActiveTab('description');
//     setActiveImageIndex(0);
//   };

//   // Helper function to get age badge
//   const getAgeBadge = (ageGroup) => {
//     const styles = {
//       '0-2': { bg: 'bg-pink-100', text: 'text-pink-600', icon: '👶' },
//       '3-5': { bg: 'bg-blue-100', text: 'text-blue-600', icon: '🧒' },
//       '6-10': { bg: 'bg-green-100', text: 'text-green-600', icon: '👧' },
//       '11-14': { bg: 'bg-purple-100', text: 'text-purple-600', icon: '🧑' },
//       '': { bg: 'bg-teal-100', text: 'text-teal-600', icon: '🎈' }
//     };
//     return styles[ageGroup] || { bg: 'bg-gray-100', text: 'text-gray-600', icon: '🎈' };
//   };

//   // Helper function to format price
//   const formatPrice = (price) => {
//     return (price || 0).toFixed(2);
//   };

//   const ageBadge = product ? getAgeBadge(product.ageGroup) : { bg: '', text: '', icon: '' };
//   const productImages = product?.images || [];
//   const averageRating = product?.rating || 0;
  
//   // Category hierarchy
//   const categoryHierarchy = [];
//   if (product?.categoryName) categoryHierarchy.push(product.categoryName);
//   if (product?.subcategoryName) categoryHierarchy.push(product.subcategoryName);
//   if (product?.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

//   return (
//     <div className="min-h-screen p-6" style={{ backgroundColor: '#FFF9F0' }}>
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//             <Package className="w-6 h-6" style={{ color: '#4A8A90' }} />
//             Barcode Scanner System
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Use your USB barcode scanner to scan products - details will appear automatically
//           </p>
//         </div>

//         {/* Scanner Status Bar */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//           <div className="flex items-center justify-between flex-wrap gap-3">
//             <div className="flex items-center gap-3">
//               <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
//               <span className="text-sm font-medium text-gray-700">
//                 Scanner Ready - Point your barcode scanner at any product
//               </span>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setManualMode(!manualMode)}
//                 className={`px-3 py-1 rounded-lg text-sm transition-colors ${
//                   manualMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//                 }`}
//               >
//                 {manualMode ? 'Manual Mode ON' : 'Switch to Manual'}
//               </button>
//               {product && (
//                 <button
//                   onClick={clearProduct}
//                   className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>
//           </div>
          
//           {manualMode && (
//             <form onSubmit={handleManualSubmit} className="mt-3 flex gap-2">
//               <input
//                 type="text"
//                 name="sku"
//                 placeholder="Or enter SKU/Barcode manually..."
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90]"
//                 autoFocus
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3a7a80] flex items-center gap-2"
//               >
//                 <Search className="w-4 h-4" />
//                 Search
//               </button>
//             </form>
//           )}
//         </div>

//         {/* Last Scanned Indicator */}
//         {lastScanned && (
//           <div className="mb-4 p-2 bg-blue-50 rounded-lg text-center">
//             <span className="text-sm text-blue-700">
//               Last scanned: <strong>{lastScanned}</strong>
//             </span>
//           </div>
//         )}

//         {/* Loading State */}
//         {loading && (
//           <div className="flex items-center justify-center py-12 bg-white rounded-xl">
//             <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#4A8A90' }} />
//             <span className="ml-2 text-gray-600">Fetching product details...</span>
//           </div>
//         )}

//         {/* Product Details Display */}
//         {product && !loading && (
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             {/* Success Banner */}
//             <div className="bg-green-50 p-3 border-b border-green-200 flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-600" />
//               <span className="text-green-700 font-medium">Product found! Details below:</span>
//             </div>

//             {/* Product Header */}
//             <div className="relative h-36 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A8] p-6 text-white">
//               <h2 className="text-2xl font-bold mb-2">{product.productName}</h2>
//               <p className="opacity-90">{product.brand}</p>
//               <div className="flex flex-wrap items-center gap-2 mt-2">
//                 {product.ageGroup && (
//                   <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-sm">
//                     Age: {product.ageGroup} years
//                   </span>
//                 )}
//                 {product.codAvailable && (
//                   <span className="inline-block px-2 py-1 bg-green-500/30 rounded-full text-sm">
//                     COD Available
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Product Content with Grid Layout */}
//             <div className="p-6">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Left Column - Product Gallery */}
//                 <div>
//                   {/* Main Image */}
//                   <div className="bg-gray-100 rounded-xl overflow-hidden border border-[#FFE0E6]">
//                     {productImages.length > 0 && (
//                       <img
//                         src={productImages[activeImageIndex]?.url}
//                         alt={product.productName}
//                         className="w-full h-80 object-contain p-4"
//                       />
//                     )}
//                   </div>
                  
//                   {/* Thumbnail Gallery */}
//                   {productImages.length > 1 && (
//                     <div className="flex gap-2 mt-3 overflow-x-auto pb-2 justify-center">
//                       {productImages.map((img, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => setActiveImageIndex(idx)}
//                           className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
//                             activeImageIndex === idx 
//                               ? 'border-[#4A8A90] shadow-md' 
//                               : 'border-gray-200 hover:border-[#FFB6C1]'
//                           }`}
//                         >
//                           <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Right Column - Product Info */}
//                 <div className="space-y-4">
//                   {/* Category Hierarchy */}
//                   {categoryHierarchy.length > 0 && (
//                     <div className="flex flex-wrap items-center gap-2">
//                       {categoryHierarchy.map((cat, idx) => (
//                         <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-[#4A8A90]/10 text-[#4A8A90] border border-[#4A8A90]/20">
//                           <FolderTree className="w-3 h-3" />
//                           {cat}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {/* Rating */}
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center">
//                       {[1, 2, 3, 4, 5].map(star => (
//                         <Star key={star} className={`w-4 h-4 ${star <= Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-600">{averageRating.toFixed(1)}</span>
//                     {product.ageGroup && (
//                       <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${ageBadge.bg} ${ageBadge.text}`}>
//                         <span>{ageBadge.icon}</span>
//                         <span>Ages {product.ageGroup}</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* SKU & Barcode */}
//                   <div className="bg-gray-50 rounded-lg p-3">
//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <p className="text-xs text-gray-500">SKU Code</p>
//                         <p className="font-mono font-semibold text-sm">{product.skuCode}</p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500">Barcode</p>
//                         <p className="font-mono text-sm">{product.barcode || 'N/A'}</p>
//                       </div>
//                     </div>
//                     {product.barcodeImageUrl && (
//                       <div className="mt-2 pt-2 border-t border-gray-200">
//                         <img src={product.barcodeImageUrl} alt="Barcode" className="h-10 object-contain" />
//                       </div>
//                     )}
//                   </div>

//                   {/* Pricing */}
//                   <div className="flex items-baseline gap-3">
//                     {product.discountPrice > 0 && product.discountPrice < product.regularPrice ? (
//                       <>
//                         <span className="text-3xl font-bold text-green-600">
//                           ৳{formatPrice(product.discountPrice)}
//                         </span>
//                         <span className="text-lg text-gray-400 line-through">
//                           ৳{formatPrice(product.regularPrice)}
//                         </span>
//                         <span className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-medium">
//                           {Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}% OFF
//                         </span>
//                       </>
//                     ) : (
//                       <span className="text-3xl font-bold text-gray-900">
//                         ৳{formatPrice(product.regularPrice)}
//                       </span>
//                     )}
//                   </div>

//                   {/* Stock Status */}
//                   <div className="flex items-center gap-2">
//                     <div className={`w-3 h-3 rounded-full ${
//                       product.stockQuantity > 10 ? 'bg-green-500' :
//                       product.stockQuantity > 0 ? 'bg-yellow-500' : 'bg-red-500'
//                     }`} />
//                     <span className={`font-medium ${
//                       product.stockQuantity > 10 ? 'text-green-700' :
//                       product.stockQuantity > 0 ? 'text-yellow-700' : 'text-red-700'
//                     }`}>
//                       {product.stockQuantity > 10 ? 'In Stock' :
//                        product.stockQuantity > 0 ? `Low Stock (${product.stockQuantity} left)` : 'Out of Stock'}
//                     </span>
//                   </div>

//                   {/* Tags */}
//                   {product.tags && product.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-2">
//                       {product.tags.slice(0, 5).map((tag, idx) => (
//                         <span key={idx} className="px-2 py-1 bg-[#D4EDEE] text-[#4A8A90] rounded-full text-xs">
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Tabs Section - Description, Specifications, Delivery Info */}
//               <div className="mt-8">
//                 <div className="flex flex-wrap gap-1 border-b border-[#FFE0E6]">
//                   {['description', 'specifications', 'delivery'].map(tab => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-all ${
//                         activeTab === tab 
//                           ? 'bg-white text-[#4A8A90] border-t-2 border-l-2 border-r-2 border-[#FFE0E6] border-b-white' 
//                           : 'text-gray-500 hover:text-[#4A8A90]'
//                       }`}
//                     >
//                       {tab === 'description' && 'Product Description'}
//                       {tab === 'specifications' && 'Specifications'}
//                       {tab === 'delivery' && 'Delivery Info'}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-[#FFE0E6] p-5">
//                   {/* Description Tab */}
//                   {activeTab === 'description' && (
//                     <div className="prose prose-sm max-w-none">
//                       <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
//                     </div>
//                   )}

//                   {/* Specifications Tab */}
//                   {activeTab === 'specifications' && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       {[
//                         { label: 'Brand', value: product.brand, icon: Tag },
//                         { label: 'Age Group', value: product.ageGroup ? `Ages ${product.ageGroup} years` : 'All Kids', icon: Users },
//                         { label: 'SKU', value: product.skuCode, icon: Package },
//                         { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
//                         { label: 'Category', value: product.categoryName, icon: Tag },
//                         { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
//                         { label: 'COD Available', value: product.codAvailable ? 'Yes' : 'No', icon: Truck },
//                       ].filter(item => item.value).map((item, idx) => (
//                         <div key={idx} className="flex items-center gap-3 p-3 bg-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
//                           <item.icon className="w-5 h-5 text-[#4A8A90]" />
//                           <div>
//                             <p className="text-xs text-gray-500">{item.label}</p>
//                             <p className="font-medium text-[#2D3A5C] text-sm">{item.value || 'N/A'}</p>
//                           </div>
//                         </div>
//                       ))}
                      
//                       {product.additionalInfo && product.additionalInfo.map((info, idx) => (
//                         <div key={`additional-${idx}`} className="flex items-center gap-3 p-3 bg-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
//                           <Sparkles className="w-5 h-5 text-[#FFD93D]" />
//                           <div>
//                             <p className="text-xs text-gray-500">{info.fieldName}</p>
//                             <p className="font-medium text-[#2D3A5C] text-sm">{info.fieldValue}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Delivery Info Tab */}
//                   {activeTab === 'delivery' && (
//                     <div>
//                       {/* Main Delivery Info */}
//                       <div className="mb-6">
//                         <h3 className="font-semibold text-[#2D3A5C] mb-3 flex items-center gap-2 text-base">
//                           <Truck className="w-5 h-5 text-[#4A8A90]" />
//                           Delivery Information
//                         </h3>
//                         <div className="prose prose-sm max-w-none bg-gray-50 rounded-lg p-4">
//                           <div dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} />
//                         </div>
//                       </div>

//                       {/* COD Status */}
//                       {product.codAvailable && (
//                         <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
//                           <div className="flex items-center gap-2 mb-2">
//                             <CheckCircle className="w-5 h-5 text-green-600" />
//                             <span className="font-semibold text-green-700">Cash on Delivery Available</span>
//                           </div>
//                           <p className="text-sm text-green-600">
//                             Pay when you receive your product. No advance payment required.
//                           </p>
//                         </div>
//                       )}

//                       {/* Return & Security Info */}
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                           <RotateCcw className="w-5 h-5 text-blue-600" />
//                           <div>
//                             <p className="font-semibold text-blue-700 text-sm">7 Days Return Policy</p>
//                             <p className="text-xs text-blue-600">Easy returns within 7 days of delivery</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
//                           <ShieldCheck className="w-5 h-5 text-purple-600" />
//                           <div>
//                             <p className="font-semibold text-purple-700 text-sm">Safe & Secure</p>
//                             <p className="text-xs text-purple-600">100% secure payment and delivery</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Waiting State */}
//         {!product && !loading && (
//           <div className="text-center py-16 bg-white rounded-xl">
//             <div className="mb-4">
//               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
//                 <Package className="w-10 h-10 text-gray-400" />
//               </div>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Ready to Scan
//             </h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               Use your USB barcode scanner to scan any product barcode.
//               <br />
//               Product details will appear automatically on this page.
//             </p>
//             <div className="mt-4 p-3 bg-blue-50 rounded-lg inline-block">
//               <p className="text-sm text-blue-700">
//                 💡 Tip: Make sure your cursor is not in any input field while scanning
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Scan History */}
//         {scanHistory.length > 0 && (
//           <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
//             <h3 className="font-semibold text-gray-900 mb-3">Recent Scans</h3>
//             <div className="space-y-2">
//               {scanHistory.map((scan, idx) => (
//                 <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => fetchProductByBarcode(scan.barcode)}>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">{scan.productName}</p>
//                     <p className="text-xs text-gray-500">SKU: {scan.sku} | Barcode: {scan.barcode}</p>
//                   </div>
//                   <div className="text-xs text-gray-400">
//                     {scan.timestamp.toLocaleTimeString()}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Global Styles for Rich Text */}
//       <style jsx global>{`
//         .prose {
//           max-width: none;
//         }
        
//         .prose h1 {
//           font-size: 1.5em;
//           font-weight: 600;
//           margin: 0.75em 0 0.5em;
//           color: #2D3A5C;
//         }
        
//         .prose h2 {
//           font-size: 1.3em;
//           font-weight: 600;
//           margin: 0.7em 0 0.4em;
//           color: #2D3A5C;
//         }
        
//         .prose h3 {
//           font-size: 1.1em;
//           font-weight: 600;
//           margin: 0.6em 0 0.3em;
//           color: #2D3A5C;
//         }
        
//         .prose p {
//           margin: 0.5em 0;
//           line-height: 1.6;
//         }
        
//         .prose ul {
//           list-style-type: disc;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
        
//         .prose ol {
//           list-style-type: decimal;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
        
//         .prose li {
//           margin: 0.2em 0;
//         }
        
//         .prose a {
//           color: #4A8A90;
//           text-decoration: underline;
//         }
        
//         .prose strong {
//           font-weight: 600;
//           color: #2D3A5C;
//         }
        
//         .prose em {
//           font-style: italic;
//         }
        
//         .prose blockquote {
//           border-left: 3px solid #4A8A90;
//           padding-left: 1em;
//           margin: 0.5em 0;
//           color: #666;
//           font-style: italic;
//         }
//       `}</style>
//     </div>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { 
  Package, Loader2, Info, AlertCircle, CheckCircle, Search, 
  Star, Truck, ShieldCheck, RotateCcw, Tag, Users, FolderTree,
  Sparkles, Heart, ShoppingCart, Share2, ClipboardList, Barcode,
  Scan, Eye, Copy, Check, Printer
} from 'lucide-react';
import Script from 'next/script';

export default function BarcodeScannerPage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastScanned, setLastScanned] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [manualMode, setManualMode] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedBarcode, setCopiedBarcode] = useState(null);
  
  // For collecting keystrokes from USB scanner
  const barcodeBuffer = useRef('');
  const scanTimeout = useRef(null);

  // Generate barcode SVG for fallback
  const generateBarcodeSVG = (barcodeNumber) => {
    if (typeof window !== 'undefined' && window.JsBarcode) {
      try {
        window.JsBarcode("#scanner-barcode-svg", barcodeNumber, {
          format: "CODE128",
          lineColor: "#000000",
          width: 2,
          height: 50,
          displayValue: true,
          fontSize: 12,
          margin: 10
        });
      } catch (e) {
        console.error('Barcode generation failed:', e);
      }
    }
  };

  // Fetch product details by barcode/SKU
  const fetchProductByBarcode = async (barcodeValue) => {
    if (!barcodeValue || barcodeValue.trim() === '') return;
    
    setLoading(true);
    setActiveImageIndex(0);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/products/barcode/${barcodeValue}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
        setLastScanned(barcodeValue);
        
        // Generate barcode if no image exists
        if (!data.data.barcodeImageUrl && data.data.barcode) {
          setTimeout(() => generateBarcodeSVG(data.data.barcode), 100);
        }
        
        // Add to scan history
        setScanHistory(prev => [
          { 
            barcode: barcodeValue, 
            productName: data.data.productName,
            timestamp: new Date(),
            sku: data.data.skuCode,
            productId: data.data._id
          },
          ...prev.slice(0, 9)
        ]);
        
        toast.success(`✓ Product found: ${data.data.productName}`);
        playBeep('success');
      } else {
        toast.error(`Product not found for: ${barcodeValue}`);
        setProduct(null);
        playBeep('error');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to fetch product details');
      setProduct(null);
      playBeep('error');
    } finally {
      setLoading(false);
    }
  };

  // Play beep sound for scanner feedback
  const playBeep = (type) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = type === 'success' ? 880 : 440;
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log('Beep failed:', e);
    }
  };

  // Handle USB Barcode Scanner Input
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (manualMode && document.activeElement?.tagName === 'INPUT') {
        return;
      }
      
      if (scanTimeout.current) {
        clearTimeout(scanTimeout.current);
      }
      
      if (event.key === 'Enter') {
        if (barcodeBuffer.current.trim()) {
          const scannedValue = barcodeBuffer.current.trim();
          console.log('Barcode scanned:', scannedValue);
          fetchProductByBarcode(scannedValue);
          barcodeBuffer.current = '';
        }
        return;
      }
      
      if (/[0-9]/.test(event.key)) {
        barcodeBuffer.current += event.key;
      }
      
      scanTimeout.current = setTimeout(() => {
        if (barcodeBuffer.current && barcodeBuffer.current.length > 0) {
          console.log('Buffer cleared (timeout):', barcodeBuffer.current);
          barcodeBuffer.current = '';
        }
      }, 100);
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (scanTimeout.current) {
        clearTimeout(scanTimeout.current);
      }
    };
  }, [manualMode]);

  // Handle manual SKU/barcode input
  const handleManualSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.searchInput.value;
    if (input.trim()) {
      fetchProductByBarcode(input.trim());
      e.target.reset();
    }
  };

  // Clear current product
  const clearProduct = () => {
    setProduct(null);
    setLastScanned(null);
    setActiveTab('description');
    setActiveImageIndex(0);
  };

  // Navigate to product details page
  const goToProductPage = () => {
    if (product && product._id) {
      router.push(`/productDetails?id=${product._id}`);
    }
  };

  // Copy barcode to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedBarcode(text);
    setTimeout(() => setCopiedBarcode(null), 2000);
    toast.success('Barcode copied to clipboard');
  };

  // Helper function to get age badge
  const getAgeBadge = (ageGroup) => {
    const styles = {
      '0-2': { bg: 'bg-pink-100', text: 'text-pink-600', icon: '👶' },
      '3-5': { bg: 'bg-blue-100', text: 'text-blue-600', icon: '🧒' },
      '6-10': { bg: 'bg-green-100', text: 'text-green-600', icon: '👧' },
      '11-14': { bg: 'bg-purple-100', text: 'text-purple-600', icon: '🧑' },
      '': { bg: 'bg-teal-100', text: 'text-teal-600', icon: '🎈' }
    };
    return styles[ageGroup] || { bg: 'bg-gray-100', text: 'text-gray-600', icon: '🎈' };
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return (price || 0).toFixed(2);
  };

  const ageBadge = product ? getAgeBadge(product.ageGroup) : { bg: '', text: '', icon: '' };
  const productImages = product?.images || [];
  const averageRating = product?.rating || 0;
  
  // Category hierarchy
  const categoryHierarchy = [];
  if (product?.categoryName) categoryHierarchy.push(product.categoryName);
  if (product?.subcategoryName) categoryHierarchy.push(product.subcategoryName);
  if (product?.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

  return (
    <>
      {/* Load JsBarcode library for fallback */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"
        strategy="afterInteractive"
      />
      
      <div className="min-h-screen p-6" style={{ backgroundColor: '#FFF9F0' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Scan className="w-6 h-6" style={{ color: '#4A8A90' }} />
              Barcode Scanner System
            </h1>
            <p className="text-gray-500 mt-1">
              Use your USB barcode scanner to scan products - details will appear automatically
            </p>
          </div>

          {/* Scanner Status Bar */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">
                  🔍 Scanner Active - Ready to scan
                </span>
                <span className="text-xs text-gray-500">
                  (Point scanner at barcode)
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setManualMode(!manualMode)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    manualMode ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  {manualMode ? 'Manual Mode ON' : 'Switch to Manual'}
                </button>
                {product && (
                  <>
                    <button
                      onClick={goToProductPage}
                      className="px-3 py-1.5 bg-[#4A8A90] text-white rounded-lg text-sm hover:bg-[#3a7a80] flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View Full Details
                    </button>
                    <button
                      onClick={clearProduct}
                      className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                    >
                      Clear
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {manualMode && (
              <form onSubmit={handleManualSubmit} className="mt-3 flex gap-2">
                <input
                  type="text"
                  name="searchInput"
                  placeholder="Enter Barcode or SKU number..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3a7a80] flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </form>
            )}
          </div>

          {/* Last Scanned Indicator */}
          {lastScanned && (
            <div className="mb-4 p-2 bg-blue-50 rounded-lg text-center border border-blue-200">
              <span className="text-sm text-blue-700">
                Last scanned: <strong className="font-mono">{lastScanned}</strong>
              </span>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12 bg-white rounded-xl shadow-sm">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#4A8A90' }} />
              <span className="ml-2 text-gray-600">Fetching product details...</span>
            </div>
          )}

          {/* Product Details Display */}
          {product && !loading && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Success Banner */}
              <div className="bg-green-50 p-3 border-b border-green-200 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Product found! Details below:</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.barcode && (
                    <>
                      <code className="text-xs bg-white px-2 py-1 rounded font-mono">{product.barcode}</code>
                      <button
                        onClick={() => copyToClipboard(product.barcode)}
                        className="p-1 hover:bg-green-100 rounded"
                      >
                        {copiedBarcode === product.barcode ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-green-600" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Product Header */}
              <div className="relative h-36 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A8] p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{product.productName}</h2>
                <p className="opacity-90">{product.brand}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {product.ageGroup && (
                    <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-sm">
                      Age: {product.ageGroup} years
                    </span>
                  )}
                  {product.codAvailable && (
                    <span className="inline-block px-2 py-1 bg-green-500/30 rounded-full text-sm">
                      COD Available
                    </span>
                  )}
                </div>
              </div>

              {/* Product Content with Grid Layout */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Product Gallery */}
                  <div>
                    {/* Main Image */}
                    <div className="bg-gray-100 rounded-xl overflow-hidden border border-[#FFE0E6]">
                      {productImages.length > 0 ? (
                        <img
                          src={productImages[activeImageIndex]?.url}
                          alt={product.productName}
                          className="w-full h-80 object-contain p-4"
                        />
                      ) : (
                        <div className="w-full h-80 flex items-center justify-center bg-gray-100">
                          <Package className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Thumbnail Gallery */}
                    {productImages.length > 1 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto pb-2 justify-center">
                        {productImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                              activeImageIndex === idx 
                                ? 'border-[#4A8A90] shadow-md ring-2 ring-[#4A8A90]/20' 
                                : 'border-gray-200 hover:border-[#FFB6C1]'
                            }`}
                          >
                            <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column - Product Info */}
                  <div className="space-y-4">
                    {/* Category Hierarchy */}
                    {categoryHierarchy.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        {categoryHierarchy.map((cat, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-[#4A8A90]/10 text-[#4A8A90] border border-[#4A8A90]/20">
                            <FolderTree className="w-3 h-3" />
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className={`w-4 h-4 ${star <= Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : star - 0.5 <= averageRating ? 'fill-yellow-400 text-yellow-400 opacity-50' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{averageRating.toFixed(1)}</span>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${ageBadge.bg} ${ageBadge.text}`}>
                        <span>{ageBadge.icon}</span>
                        <span>Ages {product.ageGroup || 'All Kids'}</span>
                      </div>
                    </div>

                    {/* SKU & Barcode with Image - UPDATED SECTION */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">SKU Code</p>
                          <p className="font-mono font-semibold text-sm">{product.skuCode}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Barcode</p>
                          <p className="font-mono text-sm">{product.barcode || 'N/A'}</p>
                        </div>
                      </div>
                      
                      {/* Barcode Image Display */}
                      {product.barcode && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">Scannable Barcode:</p>
                          {product.barcodeImageUrl ? (
                            <div className="bg-white p-2 rounded-lg text-center">
                              <img 
                                src={product.barcodeImageUrl} 
                                alt={`Barcode ${product.barcode}`}
                                className="mx-auto"
                                style={{ maxWidth: '200px', height: 'auto' }}
                              />
                              <p className="text-xs text-green-600 mt-1">✓ Scannable barcode image</p>
                            </div>
                          ) : (
                            <div className="bg-white p-2 rounded-lg text-center">
                              <svg id="scanner-barcode-svg" width="200" height="60" className="mx-auto"></svg>
                              <p className="text-xs text-gray-400 mt-1">Generated barcode</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-3">
                      {product.discountPrice > 0 && product.discountPrice < product.regularPrice ? (
                        <>
                          <span className="text-3xl font-bold text-green-600">
                            ৳{formatPrice(product.discountPrice)}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            ৳{formatPrice(product.regularPrice)}
                          </span>
                          <span className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-medium">
                            {Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}% OFF
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-[#4A8A90]">
                          ৳{formatPrice(product.regularPrice)}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        product.stockQuantity > 10 ? 'bg-green-500' :
                        product.stockQuantity > 0 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className={`font-medium ${
                        product.stockQuantity > 10 ? 'text-green-700' :
                        product.stockQuantity > 0 ? 'text-yellow-700' : 'text-red-700'
                      }`}>
                        {product.stockQuantity > 10 ? 'In Stock' :
                         product.stockQuantity > 0 ? `Low Stock (${product.stockQuantity} left)` : 'Out of Stock'}
                      </span>
                    </div>

                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {product.tags.slice(0, 5).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-[#D4EDEE] text-[#4A8A90] rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={goToProductPage}
                        className="flex-1 py-2 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-semibold rounded-lg hover:from-[#3A7A80] hover:to-[#5B9399] transition flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Full Product Page
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tabs Section - Description, Specifications, Delivery Info */}
                <div className="mt-8">
                  <div className="flex flex-wrap gap-1 border-b border-[#FFE0E6]">
                    {['description', 'specifications', 'delivery'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-all ${
                          activeTab === tab 
                            ? 'bg-white text-[#4A8A90] border-t-2 border-l-2 border-r-2 border-[#FFE0E6] border-b-white' 
                            : 'text-gray-500 hover:text-[#4A8A90]'
                        }`}
                      >
                        {tab === 'description' && 'Product Description'}
                        {tab === 'specifications' && 'Specifications'}
                        {tab === 'delivery' && 'Delivery Info'}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-[#FFE0E6] p-5">
                    {/* Description Tab */}
                    {activeTab === 'description' && (
                      <div className="prose prose-sm max-w-none">
                        {product.fullDescription && product.fullDescription !== '<p></p>' ? (
                          <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
                        ) : (
                          <p className="text-gray-400 italic">No description available.</p>
                        )}
                      </div>
                    )}

                    {/* Specifications Tab */}
                    {activeTab === 'specifications' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { label: 'Brand', value: product.brand, icon: Tag },
                          { label: 'Age Group', value: product.ageGroup ? `Ages ${product.ageGroup} years` : 'All Kids', icon: Users },
                          { label: 'SKU', value: product.skuCode, icon: Package },
                          { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
                          { label: 'Category', value: product.categoryName, icon: Tag },
                          { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
                          { label: 'COD Available', value: product.codAvailable ? 'Yes' : 'No', icon: Truck },
                        ].filter(item => item.value).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
                            <item.icon className="w-5 h-5 text-[#4A8A90]" />
                            <div>
                              <p className="text-xs text-gray-500">{item.label}</p>
                              <p className="font-medium text-[#2D3A5C] text-sm">{item.value || 'N/A'}</p>
                            </div>
                          </div>
                        ))}
                        
                        {product.additionalInfo && product.additionalInfo.map((info, idx) => (
                          <div key={`additional-${idx}`} className="flex items-center gap-3 p-3 bg-[#FFF9F0] rounded-xl border border-[#FFE0E6]">
                            <Sparkles className="w-5 h-5 text-[#FFD93D]" />
                            <div>
                              <p className="text-xs text-gray-500">{info.fieldName}</p>
                              <p className="font-medium text-[#2D3A5C] text-sm">{info.fieldValue}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Delivery Info Tab */}
                    {activeTab === 'delivery' && (
                      <div>
                        <div className="mb-6">
                          <h3 className="font-semibold text-[#2D3A5C] mb-3 flex items-center gap-2 text-base">
                            <Truck className="w-5 h-5 text-[#4A8A90]" />
                            Delivery Information
                          </h3>
                          <div className="prose prose-sm max-w-none bg-gray-50 rounded-lg p-4">
                            {product.deliveryInfo && product.deliveryInfo !== '<p></p>' ? (
                              <div dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} />
                            ) : (
                              <p className="text-gray-400 italic">No delivery information available.</p>
                            )}
                          </div>
                        </div>

                        {product.codAvailable && (
                          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="font-semibold text-green-700">Cash on Delivery Available</span>
                            </div>
                            <p className="text-sm text-green-600">Pay when you receive your product. No advance payment required.</p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <RotateCcw className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-semibold text-blue-700 text-sm">7 Days Return Policy</p>
                              <p className="text-xs text-blue-600">Easy returns within 7 days of delivery</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <ShieldCheck className="w-5 h-5 text-purple-600" />
                            <div>
                              <p className="font-semibold text-purple-700 text-sm">Safe & Secure</p>
                              <p className="text-xs text-purple-600">100% secure payment and delivery</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Waiting State */}
          {!product && !loading && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="mb-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Scan className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Scan</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Use your USB barcode scanner to scan any product barcode.
                <br />
                Product details will appear automatically on this page.
              </p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg inline-block">
                <p className="text-sm text-blue-700">💡 Tip: Make sure your cursor is not in any input field while scanning</p>
              </div>
            </div>
          )}

          {/* Scan History */}
          {scanHistory.length > 0 && (
            <div className="mt-6 bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-[#4A8A90]" />
                Recent Scans
              </h3>
              <div className="space-y-2">
                {scanHistory.map((scan, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => fetchProductByBarcode(scan.barcode)}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{scan.productName}</p>
                      <p className="text-xs text-gray-500">SKU: {scan.sku} | Barcode: {scan.barcode}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{new Date(scan.timestamp).toLocaleTimeString()}</span>
                      <Eye className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Global Styles for Rich Text */}
        <style jsx global>{`
          .prose {
            max-width: none;
          }
          .prose h1 {
            font-size: 1.5em;
            font-weight: 600;
            margin: 0.75em 0 0.5em;
            color: #2D3A5C;
          }
          .prose h2 {
            font-size: 1.3em;
            font-weight: 600;
            margin: 0.7em 0 0.4em;
            color: #2D3A5C;
          }
          .prose h3 {
            font-size: 1.1em;
            font-weight: 600;
            margin: 0.6em 0 0.3em;
            color: #2D3A5C;
          }
          .prose p {
            margin: 0.5em 0;
            line-height: 1.6;
          }
          .prose ul {
            list-style-type: disc;
            padding-left: 1.5em;
            margin: 0.5em 0;
          }
          .prose ol {
            list-style-type: decimal;
            padding-left: 1.5em;
            margin: 0.5em 0;
          }
          .prose li {
            margin: 0.2em 0;
          }
          .prose a {
            color: #4A8A90;
            text-decoration: underline;
          }
          .prose strong {
            font-weight: 600;
            color: #2D3A5C;
          }
          .prose em {
            font-style: italic;
          }
          .prose blockquote {
            border-left: 3px solid #4A8A90;
            padding-left: 1em;
            margin: 0.5em 0;
            color: #666;
            font-style: italic;
          }
        `}</style>
      </div>
    </>
  );
}