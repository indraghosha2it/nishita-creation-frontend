
// 'use client';

// import { useState, useEffect } from 'react';
// import { 
//   Save, 
//   Plus, 
//   Trash2, 
//   X, 
//   Loader2, 
//   Package,
//   Clock,
//   Eye,
//   Edit,
//   RefreshCw,
//   PlusCircle,
//   MinusCircle,
//   Globe,
//   CheckSquare,
//   Square
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Link from 'next/link';

// // Define available pages
// const AVAILABLE_PAGES = [
//   { path: '/', label: 'Home Page' },
//   { path: '/products', label: 'Products Page' },
//   { path: '/productDetails', label: 'Product Details Page' },
//   { path: '/about', label: 'About Us' },
//   { path: '/contact', label: 'Contact Us' },
//   { path: '/blog', label: 'Blog Listing' },
//   { path: '/blog/blogDetailsPage', label: 'Blog Details' },
//   { path: '/shipping', label: 'Shipping Info' },
//   { path: '/privacy', label: 'Privacy Policy' },
//   { path: '/terms', label: 'Terms of Service' },
//   { path: '/login', label: 'Login Page' },
//   { path: '/register', label: 'Register Page' }
// ];

// export default function PromotionalSettings() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [promotionalItems, setPromotionalItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showProductDropdown, setShowProductDropdown] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [selectAllPages, setSelectAllPages] = useState(true);
  
//   // Form for creating new promotional item
//   const [newItemForm, setNewItemForm] = useState({
//     productId: null,
//     product: null,
//     tag: '',
//     intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
//     maxShows: 3,
//     isActive: true,
//     showOnPages: AVAILABLE_PAGES.map(p => p.path) // Select all by default
//   });

//   // Edit form
//   const [editForm, setEditForm] = useState({
//     tag: '',
//     intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
//     maxShows: 3,
//     isActive: true,
//     showOnPages: AVAILABLE_PAGES.map(p => p.path)
//   });

//   // Fetch products and promotional items
//   useEffect(() => {
//     fetchProducts();
//     fetchPromotionalItems();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/products?limit=100', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setProducts(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       toast.error('Failed to fetch products');
//     }
//   };

//   const fetchPromotionalItems = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/promotional-settings', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setPromotionalItems(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching promotional items:', error);
//       toast.error('Failed to fetch promotional items');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Page selection handlers
//   const togglePageSelection = (formType, pagePath) => {
//     if (formType === 'new') {
//       const currentPages = [...newItemForm.showOnPages];
//       if (currentPages.includes(pagePath)) {
//         const updatedPages = currentPages.filter(p => p !== pagePath);
//         setNewItemForm({ ...newItemForm, showOnPages: updatedPages });
//         setSelectAllPages(updatedPages.length === AVAILABLE_PAGES.length);
//       } else {
//         const updatedPages = [...currentPages, pagePath];
//         setNewItemForm({ ...newItemForm, showOnPages: updatedPages });
//         setSelectAllPages(updatedPages.length === AVAILABLE_PAGES.length);
//       }
//     } else if (formType === 'edit') {
//       const currentPages = [...editForm.showOnPages];
//       if (currentPages.includes(pagePath)) {
//         setEditForm({ ...editForm, showOnPages: currentPages.filter(p => p !== pagePath) });
//       } else {
//         setEditForm({ ...editForm, showOnPages: [...currentPages, pagePath] });
//       }
//     }
//   };

//   const toggleSelectAllPages = (formType) => {
//     if (formType === 'new') {
//       if (selectAllPages) {
//         setNewItemForm({ ...newItemForm, showOnPages: [] });
//         setSelectAllPages(false);
//       } else {
//         setNewItemForm({ ...newItemForm, showOnPages: AVAILABLE_PAGES.map(p => p.path) });
//         setSelectAllPages(true);
//       }
//     } else if (formType === 'edit') {
//       if (editForm.showOnPages.length === AVAILABLE_PAGES.length) {
//         setEditForm({ ...editForm, showOnPages: [] });
//       } else {
//         setEditForm({ ...editForm, showOnPages: AVAILABLE_PAGES.map(p => p.path) });
//       }
//     }
//   };

//   // Interval management for new form
//   const addIntervalToNew = () => {
//     setNewItemForm({
//       ...newItemForm,
//       intervals: [...newItemForm.intervals, { delay: 15 }]
//     });
//   };

//   const removeIntervalFromNew = (index) => {
//     if (newItemForm.intervals.length <= 1) {
//       toast.error('At least one interval is required');
//       return;
//     }
//     const newIntervals = newItemForm.intervals.filter((_, i) => i !== index);
//     setNewItemForm({ ...newItemForm, intervals: newIntervals });
//   };

//   const updateIntervalInNew = (index, delay) => {
//     const newIntervals = [...newItemForm.intervals];
//     newIntervals[index] = { delay: parseInt(delay) || 0 };
//     setNewItemForm({ ...newItemForm, intervals: newIntervals });
//   };

//   // Interval management for edit form
//   const addIntervalToEdit = () => {
//     setEditForm({
//       ...editForm,
//       intervals: [...editForm.intervals, { delay: 15 }]
//     });
//   };

//   const removeIntervalFromEdit = (index) => {
//     if (editForm.intervals.length <= 1) {
//       toast.error('At least one interval is required');
//       return;
//     }
//     const newIntervals = editForm.intervals.filter((_, i) => i !== index);
//     setEditForm({ ...editForm, intervals: newIntervals });
//   };

//   const updateIntervalInEdit = (index, delay) => {
//     const newIntervals = [...editForm.intervals];
//     newIntervals[index] = { delay: parseInt(delay) || 0 };
//     setEditForm({ ...editForm, intervals: newIntervals });
//   };

//   const createPromotionalItem = async () => {
//     // Validate
//     if (!newItemForm.productId) {
//       toast.error('Please select a product');
//       return;
//     }
//     if (!newItemForm.tag.trim()) {
//       toast.error('Please enter a tag');
//       return;
//     }
//     if (newItemForm.intervals.length === 0) {
//       toast.error('At least one interval is required');
//       return;
//     }
//     if (newItemForm.showOnPages.length === 0) {
//       toast.error('Please select at least one page to show the popup');
//       return;
//     }

//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/promotional-settings', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           productId: newItemForm.productId,
//           tag: newItemForm.tag,
//           intervals: newItemForm.intervals,
//           maxShows: newItemForm.maxShows,
//           isActive: newItemForm.isActive,
//           showOnPages: newItemForm.showOnPages
//         })
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Promotional item created successfully!');
//         await fetchPromotionalItems();
//         // Reset form
//         setNewItemForm({
//           productId: null,
//           product: null,
//           tag: '',
//           intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
//           maxShows: 3,
//           isActive: true,
//           showOnPages: AVAILABLE_PAGES.map(p => p.path)
//         });
//         setSelectAllPages(true);
//         setShowProductDropdown(false);
//         setSearchTerm('');
//       } else {
//         toast.error(data.error || 'Failed to create promotional item');
//       }
//     } catch (error) {
//       console.error('Error creating promotional item:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const updatePromotionalItem = async () => {
//     if (!editingItem) return;
    
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/promotional-settings/${editingItem._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(editForm)
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Promotional item updated successfully!');
//         await fetchPromotionalItems();
//         setEditingItem(null);
//         setEditForm({
//           tag: '',
//           intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
//           maxShows: 3,
//           isActive: true,
//           showOnPages: AVAILABLE_PAGES.map(p => p.path)
//         });
//       } else {
//         toast.error(data.error || 'Failed to update promotional item');
//       }
//     } catch (error) {
//       console.error('Error updating promotional item:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const deletePromotionalItem = async (id) => {
//     if (!confirm('Are you sure you want to delete this promotional item?')) return;
    
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/promotional-settings/${id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Promotional item deleted successfully!');
//         await fetchPromotionalItems();
//       } else {
//         toast.error(data.error || 'Failed to delete promotional item');
//       }
//     } catch (error) {
//       console.error('Error deleting promotional item:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const startEditing = (item) => {
//     setEditingItem(item);
//     setEditForm({
//       tag: item.tag,
//       intervals: item.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
//       maxShows: item.maxShows || 3,
//       isActive: item.isActive,
//       showOnPages: item.showOnPages || AVAILABLE_PAGES.map(p => p.path)
//     });
//   };

//   const cancelEditing = () => {
//     setEditingItem(null);
//     setEditForm({
//       tag: '',
//       intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
//       maxShows: 3,
//       isActive: true,
//       showOnPages: AVAILABLE_PAGES.map(p => p.path)
//     });
//   };

//   const selectProduct = (product) => {
//     setNewItemForm({
//       ...newItemForm,
//       productId: product._id,
//       product: product
//     });
//     setShowProductDropdown(false);
//     setSearchTerm('');
//   };

//   const filteredProducts = products.filter(product =>
//     product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     !promotionalItems.some(item => item.productId?._id === product._id)
//   );

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 2
//     }).format(price || 0);
//   };

//   const getUnitLabel = (orderUnit) => {
//     switch(orderUnit) {
//       case 'kg': return 'kg';
//       case 'ton': return 'MT';
//       default: return 'pc';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FAF7F2] p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-[#6B4F3A] font-serif">Promotional Popup Settings</h1>
//           <p className="text-sm text-gray-600 mt-1">
//             Create promotional posts with custom timing, tags, and page targeting
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Left Column - Create New Promotional Item */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Plus className="w-5 h-5 text-[#6B4F3A]" />
//               Create New Promotional Post
//             </h2>

//             {/* Product Selection */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select Product <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 {newItemForm.product ? (
//                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                     <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
//                       {newItemForm.product.images?.[0]?.url ? (
//                         <img
//                           src={newItemForm.product.images[0].url}
//                           alt={newItemForm.product.productName}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <Package className="w-6 h-6 text-gray-400 m-3" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900 text-sm">{newItemForm.product.productName}</p>
//                       <p className="text-xs text-gray-500">{formatPrice(newItemForm.product.pricePerUnit)} / {getUnitLabel(newItemForm.product.orderUnit)}</p>
//                     </div>
//                     <button
//                       onClick={() => setNewItemForm({ ...newItemForm, product: null, productId: null })}
//                       className="p-1 text-red-500 hover:bg-red-50 rounded"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <button
//                       type="button"
//                       onClick={() => setShowProductDropdown(!showProductDropdown)}
//                       className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-[#6B4F3A] rounded-lg text-[#6B4F3A] hover:bg-[#F5E6D3] transition-colors"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Select Product
//                     </button>

//                     {showProductDropdown && (
//                       <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
//                         <div className="p-3 border-b border-gray-200">
//                           <input
//                             type="text"
//                             placeholder="Search products..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
//                             autoFocus
//                           />
//                         </div>
//                         <div className="max-h-64 overflow-y-auto">
//                           {filteredProducts.length === 0 ? (
//                             <p className="text-center text-gray-500 py-4 text-sm">No products found</p>
//                           ) : (
//                             filteredProducts.map(product => (
//                               <button
//                                 key={product._id}
//                                 onClick={() => selectProduct(product)}
//                                 className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors flex items-center gap-3"
//                               >
//                                 <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
//                                   {product.images?.[0]?.url ? (
//                                     <img
//                                       src={product.images[0].url}
//                                       alt={product.productName}
//                                       className="w-full h-full object-cover"
//                                     />
//                                   ) : (
//                                     <Package className="w-5 h-5 text-gray-400 m-2.5" />
//                                   )}
//                                 </div>
//                                 <div className="flex-1">
//                                   <p className="text-sm font-medium text-gray-900">{product.productName}</p>
//                                   <p className="text-xs text-gray-500">{formatPrice(product.pricePerUnit)} / {getUnitLabel(product.orderUnit)}</p>
//                                 </div>
//                               </button>
//                             ))
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Tag Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Tag <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={newItemForm.tag}
//                 onChange={(e) => setNewItemForm({ ...newItemForm, tag: e.target.value })}
//                 placeholder="e.g., Limited Time Offer, Best Seller, Hot Deal"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
//               />
//               <p className="text-xs text-gray-500 mt-1">This tag will appear on the popup badge</p>
//             </div>

//             {/* Page Selection */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Show on Pages <span className="text-red-500">*</span>
//               </label>
//               <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
//                 <button
//                   type="button"
//                   onClick={() => toggleSelectAllPages('new')}
//                   className="flex items-center gap-2 text-sm text-[#6B4F3A] hover:underline mb-2"
//                 >
//                   {selectAllPages ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
//                   {selectAllPages ? 'Deselect All' : 'Select All Pages'}
//                 </button>
//                 <div className="grid grid-cols-2 gap-2">
//                   {AVAILABLE_PAGES.map((page) => (
//                     <label key={page.path} className="flex items-center gap-2 cursor-pointer text-sm">
//                       <input
//                         type="checkbox"
//                         checked={newItemForm.showOnPages.includes(page.path)}
//                         onChange={() => togglePageSelection('new', page.path)}
//                         className="rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
//                       />
//                       <span className="text-gray-700">{page.label}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Select where this promotional popup should appear</p>
//             </div>

//             {/* Intervals Configuration */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Timing Intervals (seconds)
//               </label>
//               <p className="text-xs text-gray-500 mb-3">
//                 First interval is the delay before first popup. Subsequent intervals are delays after each close.
//               </p>
//               <div className="space-y-2">
//                 {newItemForm.intervals.map((interval, idx) => (
//                   <div key={idx} className="flex items-center gap-2">
//                     <span className="text-sm text-gray-600 w-32">
//                       {idx === 0 ? 'Initial delay:' : `After close ${idx}:`}
//                     </span>
//                     <input
//                       type="number"
//                       value={interval.delay}
//                       onChange={(e) => updateIntervalInNew(idx, e.target.value)}
//                       min="0"
//                       step="1"
//                       className="w-24 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
//                     />
//                     <span className="text-sm text-gray-500">seconds</span>
//                     {idx > 0 && (
//                       <button
//                         onClick={() => removeIntervalFromNew(idx)}
//                         className="p-1 text-red-500 hover:bg-red-50 rounded"
//                       >
//                         <MinusCircle className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={addIntervalToNew}
//                 className="mt-2 text-sm text-[#6B4F3A] hover:underline flex items-center gap-1"
//               >
//                 <PlusCircle className="w-4 h-4" />
//                 Add Another Interval
//               </button>
//             </div>

//             {/* Max Shows */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Maximum number of times to show
//               </label>
//               <select
//                 value={newItemForm.maxShows}
//                 onChange={(e) => setNewItemForm({ ...newItemForm, maxShows: parseInt(e.target.value) })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
//               >
//                 {[1,2,3,4,5,6,7,8,9,10].map(num => (
//                   <option key={num} value={num}>{num} time{num > 1 ? 's' : ''}</option>
//                 ))}
//               </select>
//               <p className="text-xs text-gray-500 mt-1">Popup will not appear after this many total shows</p>
//             </div>

//             {/* Active Status */}
//             <div className="mb-6">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={newItemForm.isActive}
//                   onChange={(e) => setNewItemForm({ ...newItemForm, isActive: e.target.checked })}
//                   className="w-4 h-4 rounded focus:ring-[#6B4F3A]"
//                 />
//                 <span className="text-sm text-gray-700">Active (immediately start showing)</span>
//               </label>
//             </div>

//             {/* Create Button */}
//             <button
//               onClick={createPromotionalItem}
//               disabled={saving || !newItemForm.productId || !newItemForm.tag || newItemForm.showOnPages.length === 0}
//               className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50"
//             >
//               {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
//               Create Promotional Post
//             </button>
//           </div>

//           {/* Right Column - List of Promotional Items */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                 <Package className="w-5 h-5 text-[#6B4F3A]" />
//                 Promotional Posts ({promotionalItems.length})
//               </h2>
//               <button
//                 onClick={fetchPromotionalItems}
//                 className="p-2 text-gray-400 hover:text-[#6B4F3A] transition-colors"
//               >
//                 <RefreshCw className="w-4 h-4" />
//               </button>
//             </div>

//             {promotionalItems.length === 0 ? (
//               <div className="text-center py-12 bg-gray-50 rounded-lg">
//                 <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500 text-sm">No promotional posts created yet</p>
//                 <p className="text-xs text-gray-400 mt-1">Use the form to create your first promotional post</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {promotionalItems.map((item) => {
//                   const product = item.productId;
//                   if (!product) return null;
                  
//                   return (
//                     <div key={item._id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
//                       <div className="p-4">
//                         <div className="flex items-start gap-4">
//                           {/* Product Image */}
//                           <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
//                             {product.images?.[0]?.url ? (
//                               <img
//                                 src={product.images[0].url}
//                                 alt={product.productName}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <Package className="w-6 h-6 text-gray-400 m-5" />
//                             )}
//                           </div>
                          
//                           {/* Product Details */}
//                           <div className="flex-1">
//                             <h3 className="font-semibold text-gray-900 text-sm">{product.productName}</h3>
//                             <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
//                               <span>{formatPrice(product.pricePerUnit)}/{getUnitLabel(product.orderUnit)}</span>
//                               <span>•</span>
//                               <span>MOQ: {product.moq}</span>
//                             </div>
//                             <div className="mt-2 flex flex-wrap gap-2">
//                               <span className="inline-flex items-center px-2 py-0.5 bg-[#F5E6D3] text-[#6B4F3A] text-xs rounded-full">
//                                 Tag: {item.tag}
//                               </span>
//                               <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
//                                 Max Shows: {item.maxShows}
//                               </span>
//                               <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                                 {item.isActive ? 'Active' : 'Inactive'}
//                               </span>
//                             </div>
//                             <div className="mt-2 text-xs text-gray-500">
//                               Pages: {item.showOnPages?.length || AVAILABLE_PAGES.length} page(s) selected
//                             </div>
//                             <div className="mt-2 text-xs text-gray-500">
//                               Intervals: {item.intervals.map((i, idx) => (
//                                 <span key={idx} className="inline-block mr-2">
//                                   {idx === 0 ? 'First: ' : `${idx}th close: `}{i.delay}s
//                                 </span>
//                               ))}
//                             </div>
//                             <div className="text-xs text-gray-400 mt-1">
//                               Created: {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
//                             </div>
//                           </div>
                          
//                           {/* Actions */}
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => startEditing(item)}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => deletePromotionalItem(item._id)}
//                               className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>

//                         {/* Edit Form */}
//                         {editingItem?._id === item._id && (
//                           <div className="border-t border-gray-200 mt-3 pt-3">
//                             <h4 className="font-medium text-gray-900 text-sm mb-3">Edit Configuration</h4>
                            
//                             {/* Tag */}
//                             <div className="mb-3">
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Tag</label>
//                               <input
//                                 type="text"
//                                 value={editForm.tag}
//                                 onChange={(e) => setEditForm({ ...editForm, tag: e.target.value })}
//                                 className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#6B4F3A] focus:border-[#6B4F3A] outline-none"
//                               />
//                             </div>
                            
//                             {/* Page Selection in Edit */}
//                             <div className="mb-3">
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Show on Pages</label>
//                               <div className="border border-gray-200 rounded-lg p-2 bg-gray-50">
//                                 <div className="grid grid-cols-2 gap-1">
//                                   {AVAILABLE_PAGES.map((page) => (
//                                     <label key={page.path} className="flex items-center gap-2 cursor-pointer text-xs">
//                                       <input
//                                         type="checkbox"
//                                         checked={editForm.showOnPages?.includes(page.path) || false}
//                                         onChange={() => togglePageSelection('edit', page.path)}
//                                         className="rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
//                                       />
//                                       <span className="text-gray-700">{page.label}</span>
//                                     </label>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
                            
//                             {/* Intervals */}
//                             <div className="mb-3">
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Intervals (seconds)</label>
//                               <div className="space-y-1">
//                                 {editForm.intervals.map((interval, idx) => (
//                                   <div key={idx} className="flex items-center gap-2">
//                                     <span className="text-xs text-gray-500 w-28">
//                                       {idx === 0 ? 'Initial:' : `After close ${idx}:`}
//                                     </span>
//                                     <input
//                                       type="number"
//                                       value={interval.delay}
//                                       onChange={(e) => updateIntervalInEdit(idx, e.target.value)}
//                                       min="0"
//                                       step="1"
//                                       className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#6B4F3A] outline-none"
//                                     />
//                                     <span className="text-xs text-gray-500">seconds</span>
//                                     {idx > 0 && (
//                                       <button
//                                         onClick={() => removeIntervalFromEdit(idx)}
//                                         className="p-0.5 text-red-500 hover:bg-red-50 rounded"
//                                       >
//                                         <MinusCircle className="w-3.5 h-3.5" />
//                                       </button>
//                                     )}
//                                   </div>
//                                 ))}
//                               </div>
//                               <button
//                                 onClick={addIntervalToEdit}
//                                 className="mt-1 text-xs text-[#6B4F3A] hover:underline flex items-center gap-0.5"
//                               >
//                                 <PlusCircle className="w-3 h-3" />
//                                 Add Interval
//                               </button>
//                             </div>
                            
//                             {/* Max Shows */}
//                             <div className="mb-3">
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Max Shows</label>
//                               <select
//                                 value={editForm.maxShows}
//                                 onChange={(e) => setEditForm({ ...editForm, maxShows: parseInt(e.target.value) })}
//                                 className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#6B4F3A] outline-none"
//                               >
//                                 {[1,2,3,4,5,6,7,8,9,10].map(num => (
//                                   <option key={num} value={num}>{num} time{num > 1 ? 's' : ''}</option>
//                                 ))}
//                               </select>
//                             </div>
                            
//                             {/* Active Status */}
//                             <div className="mb-3">
//                               <label className="flex items-center gap-2 cursor-pointer">
//                                 <input
//                                   type="checkbox"
//                                   checked={editForm.isActive}
//                                   onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
//                                   className="w-3.5 h-3.5 rounded"
//                                 />
//                                 <span className="text-xs text-gray-700">Active</span>
//                               </label>
//                             </div>
                            
//                             {/* Action Buttons */}
//                             <div className="flex gap-2 mt-3">
//                               <button
//                                 onClick={updatePromotionalItem}
//                                 disabled={saving}
//                                 className="px-3 py-1 bg-[#6B4F3A] text-white text-sm rounded hover:bg-[#8B6B51] transition-colors"
//                               >
//                                 {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Save Changes'}
//                               </button>
//                               <button
//                                 onClick={cancelEditing}
//                                 className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
//                               >
//                                 Cancel
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  X, 
  Loader2, 
  Package,
  Clock,
  Eye,
  Edit,
  RefreshCw,
  PlusCircle,
  MinusCircle,
  Globe,
  CheckSquare,
  Square,
  FolderTree
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

// Define available pages
const AVAILABLE_PAGES = [
  { path: '/', label: 'Home Page' },
  { path: '/products', label: 'Products Page' },
  { path: '/productDetails', label: 'Product Details Page' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact Us' },
  { path: '/blog', label: 'Blog Listing' },
  { path: '/blog/blogDetailsPage', label: 'Blog Details' },
  { path: '/shipping', label: 'Shipping Info' },
  { path: '/privacy', label: 'Privacy Policy' },
  { path: '/terms', label: 'Terms of Service' },
  { path: '/login', label: 'Login Page' },
  { path: '/register', label: 'Register Page' }
];

export default function PromotionalSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [promotionalItems, setPromotionalItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectAllPages, setSelectAllPages] = useState(true);
  
  // Form for creating new promotional item
  const [newItemForm, setNewItemForm] = useState({
    productId: null,
    product: null,
    tag: '',
    intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
    maxShows: 3,
    isActive: true,
    showOnPages: AVAILABLE_PAGES.map(p => p.path),
    categoryId: null, // NEW: Selected category (optional)
    category: null
  });

  // Edit form
  const [editForm, setEditForm] = useState({
    tag: '',
    intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
    maxShows: 3,
    isActive: true,
    showOnPages: AVAILABLE_PAGES.map(p => p.path),
    categoryId: null,
    category: null
  });

  // Fetch products, categories, and promotional items
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchPromotionalItems();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/products?limit=100', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPromotionalItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/promotional-settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setPromotionalItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching promotional items:', error);
      toast.error('Failed to fetch promotional items');
    } finally {
      setLoading(false);
    }
  };

  // Page selection handlers
  const togglePageSelection = (formType, pagePath) => {
    if (formType === 'new') {
      const currentPages = [...newItemForm.showOnPages];
      if (currentPages.includes(pagePath)) {
        const updatedPages = currentPages.filter(p => p !== pagePath);
        setNewItemForm({ ...newItemForm, showOnPages: updatedPages });
        setSelectAllPages(updatedPages.length === AVAILABLE_PAGES.length);
      } else {
        const updatedPages = [...currentPages, pagePath];
        setNewItemForm({ ...newItemForm, showOnPages: updatedPages });
        setSelectAllPages(updatedPages.length === AVAILABLE_PAGES.length);
      }
    } else if (formType === 'edit') {
      const currentPages = [...editForm.showOnPages];
      if (currentPages.includes(pagePath)) {
        setEditForm({ ...editForm, showOnPages: currentPages.filter(p => p !== pagePath) });
      } else {
        setEditForm({ ...editForm, showOnPages: [...currentPages, pagePath] });
      }
    }
  };

  const toggleSelectAllPages = (formType) => {
    if (formType === 'new') {
      if (selectAllPages) {
        setNewItemForm({ ...newItemForm, showOnPages: [] });
        setSelectAllPages(false);
      } else {
        setNewItemForm({ ...newItemForm, showOnPages: AVAILABLE_PAGES.map(p => p.path) });
        setSelectAllPages(true);
      }
    } else if (formType === 'edit') {
      if (editForm.showOnPages.length === AVAILABLE_PAGES.length) {
        setEditForm({ ...editForm, showOnPages: [] });
      } else {
        setEditForm({ ...editForm, showOnPages: AVAILABLE_PAGES.map(p => p.path) });
      }
    }
  };

  // Interval management for new form
  const addIntervalToNew = () => {
    setNewItemForm({
      ...newItemForm,
      intervals: [...newItemForm.intervals, { delay: 15 }]
    });
  };

  const removeIntervalFromNew = (index) => {
    if (newItemForm.intervals.length <= 1) {
      toast.error('At least one interval is required');
      return;
    }
    const newIntervals = newItemForm.intervals.filter((_, i) => i !== index);
    setNewItemForm({ ...newItemForm, intervals: newIntervals });
  };

  const updateIntervalInNew = (index, delay) => {
    const newIntervals = [...newItemForm.intervals];
    newIntervals[index] = { delay: parseInt(delay) || 0 };
    setNewItemForm({ ...newItemForm, intervals: newIntervals });
  };

  // Interval management for edit form
  const addIntervalToEdit = () => {
    setEditForm({
      ...editForm,
      intervals: [...editForm.intervals, { delay: 15 }]
    });
  };

  const removeIntervalFromEdit = (index) => {
    if (editForm.intervals.length <= 1) {
      toast.error('At least one interval is required');
      return;
    }
    const newIntervals = editForm.intervals.filter((_, i) => i !== index);
    setEditForm({ ...editForm, intervals: newIntervals });
  };

  const updateIntervalInEdit = (index, delay) => {
    const newIntervals = [...editForm.intervals];
    newIntervals[index] = { delay: parseInt(delay) || 0 };
    setEditForm({ ...editForm, intervals: newIntervals });
  };

  const createPromotionalItem = async () => {
    // Validate
    if (!newItemForm.productId) {
      toast.error('Please select a product');
      return;
    }
    if (!newItemForm.tag.trim()) {
      toast.error('Please enter a tag');
      return;
    }
    if (newItemForm.intervals.length === 0) {
      toast.error('At least one interval is required');
      return;
    }
    if (newItemForm.showOnPages.length === 0) {
      toast.error('Please select at least one page to show the popup');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/promotional-settings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: newItemForm.productId,
          tag: newItemForm.tag,
          intervals: newItemForm.intervals,
          maxShows: newItemForm.maxShows,
          isActive: newItemForm.isActive,
          showOnPages: newItemForm.showOnPages,
          categoryId: newItemForm.categoryId // NEW: Send category ID
        })
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Promotional item created successfully!');
        await fetchPromotionalItems();
        // Reset form
        setNewItemForm({
          productId: null,
          product: null,
          tag: '',
          intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
          maxShows: 3,
          isActive: true,
          showOnPages: AVAILABLE_PAGES.map(p => p.path),
          categoryId: null,
          category: null
        });
        setSelectAllPages(true);
        setShowProductDropdown(false);
        setShowCategoryDropdown(false);
        setSearchTerm('');
      } else {
        toast.error(data.error || 'Failed to create promotional item');
      }
    } catch (error) {
      console.error('Error creating promotional item:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updatePromotionalItem = async () => {
    if (!editingItem) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/promotional-settings/${editingItem._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tag: editForm.tag,
          intervals: editForm.intervals,
          maxShows: editForm.maxShows,
          isActive: editForm.isActive,
          showOnPages: editForm.showOnPages,
          categoryId: editForm.categoryId // NEW: Update category ID
        })
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Promotional item updated successfully!');
        await fetchPromotionalItems();
        setEditingItem(null);
        setEditForm({
          tag: '',
          intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
          maxShows: 3,
          isActive: true,
          showOnPages: AVAILABLE_PAGES.map(p => p.path),
          categoryId: null,
          category: null
        });
      } else {
        toast.error(data.error || 'Failed to update promotional item');
      }
    } catch (error) {
      console.error('Error updating promotional item:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const deletePromotionalItem = async (id) => {
    if (!confirm('Are you sure you want to delete this promotional item?')) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/promotional-settings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Promotional item deleted successfully!');
        await fetchPromotionalItems();
      } else {
        toast.error(data.error || 'Failed to delete promotional item');
      }
    } catch (error) {
      console.error('Error deleting promotional item:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setEditForm({
      tag: item.tag,
      intervals: item.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
      maxShows: item.maxShows || 3,
      isActive: item.isActive,
      showOnPages: item.showOnPages || AVAILABLE_PAGES.map(p => p.path),
      categoryId: item.categoryId || null,
      category: item.categoryId ? categories.find(c => c._id === item.categoryId) : null
    });
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setEditForm({
      tag: '',
      intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
      maxShows: 3,
      isActive: true,
      showOnPages: AVAILABLE_PAGES.map(p => p.path),
      categoryId: null,
      category: null
    });
  };

  const selectProduct = (product) => {
    setNewItemForm({
      ...newItemForm,
      productId: product._id,
      product: product
    });
    setShowProductDropdown(false);
    setSearchTerm('');
  };

  const selectCategory = (category) => {
    setNewItemForm({
      ...newItemForm,
      categoryId: category._id,
      category: category
    });
    setShowCategoryDropdown(false);
  };

  const selectEditCategory = (category) => {
    setEditForm({
      ...editForm,
      categoryId: category._id,
      category: category
    });
    setShowCategoryDropdown(false);
  };

  const removeCategory = (formType) => {
    if (formType === 'new') {
      setNewItemForm({ ...newItemForm, categoryId: null, category: null });
    } else {
      setEditForm({ ...editForm, categoryId: null, category: null });
    }
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !promotionalItems.some(item => item.productId?._id === product._id)
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price || 0);
  };

  const getUnitLabel = (orderUnit) => {
    switch(orderUnit) {
      case 'kg': return 'kg';
      case 'ton': return 'MT';
      default: return 'pc';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#6B4F3A] font-serif">Promotional Popup Settings</h1>
          <p className="text-sm text-gray-600 mt-1">
            Create promotional posts with custom timing, tags, page targeting, and category filtering
          </p>
          <p className="text-xs text-gray-400 mt-1">
            <span className="font-medium">Note:</span> If you select a category, this popup will only show on product listing pages when that category is filtered. Leave empty to show on all pages (latest first).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Create New Promotional Item */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#6B4F3A]" />
              Create New Promotional Post
            </h2>

            {/* Product Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Product <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                {newItemForm.product ? (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      {newItemForm.product.images?.[0]?.url ? (
                        <img
                          src={newItemForm.product.images[0].url}
                          alt={newItemForm.product.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-gray-400 m-3" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{newItemForm.product.productName}</p>
                      <p className="text-xs text-gray-500">{formatPrice(newItemForm.product.pricePerUnit)} / {getUnitLabel(newItemForm.product.orderUnit)}</p>
                    </div>
                    <button
                      onClick={() => setNewItemForm({ ...newItemForm, product: null, productId: null })}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowProductDropdown(!showProductDropdown)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-[#6B4F3A] rounded-lg text-[#6B4F3A] hover:bg-[#F5E6D3] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Select Product
                    </button>

                    {showProductDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <div className="p-3 border-b border-gray-200">
                          <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
                            autoFocus
                          />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {filteredProducts.length === 0 ? (
                            <p className="text-center text-gray-500 py-4 text-sm">No products found</p>
                          ) : (
                            filteredProducts.map(product => (
                              <button
                                key={product._id}
                                onClick={() => selectProduct(product)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors flex items-center gap-3"
                              >
                                <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                  {product.images?.[0]?.url ? (
                                    <img
                                      src={product.images[0].url}
                                      alt={product.productName}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Package className="w-5 h-5 text-gray-400 m-2.5" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{product.productName}</p>
                                  <p className="text-xs text-gray-500">{formatPrice(product.pricePerUnit)} / {getUnitLabel(product.orderUnit)}</p>
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Category Selection - NEW */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <FolderTree className="w-4 h-4" />
                  Target Category <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                </div>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Select a category to show this popup only when that category is filtered on products page. Leave empty to show on all pages.
              </p>
              <div className="relative">
                {newItemForm.category ? (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                      <FolderTree className="w-4 h-4 text-[#6B4F3A]" />
                      <span className="text-sm text-gray-700">{newItemForm.category.name}</span>
                    </div>
                    <button
                      onClick={() => removeCategory('new')}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <FolderTree className="w-4 h-4" />
                      Select Category (Optional)
                    </button>

                    {showCategoryDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <div className="p-3 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-700">Select a category</p>
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          <button
                            onClick={() => {
                              setNewItemForm({ ...newItemForm, categoryId: null, category: null });
                              setShowCategoryDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                          >
                            <span className="text-sm text-gray-500">-- No Category (Show on all pages) --</span>
                          </button>
                          {categories.map(category => (
                            <button
                              key={category._id}
                              onClick={() => selectCategory(category)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                              <FolderTree className="w-4 h-4 text-[#6B4F3A]" />
                              <span className="text-sm text-gray-700">{category.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Tag Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newItemForm.tag}
                onChange={(e) => setNewItemForm({ ...newItemForm, tag: e.target.value })}
                placeholder="e.g., Limited Time Offer, Best Seller, Hot Deal"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">This tag will appear on the popup badge</p>
            </div>

            {/* Page Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Show on Pages <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <button
                  type="button"
                  onClick={() => toggleSelectAllPages('new')}
                  className="flex items-center gap-2 text-sm text-[#6B4F3A] hover:underline mb-2"
                >
                  {selectAllPages ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  {selectAllPages ? 'Deselect All' : 'Select All Pages'}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_PAGES.map((page) => (
                    <label key={page.path} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={newItemForm.showOnPages.includes(page.path)}
                        onChange={() => togglePageSelection('new', page.path)}
                        className="rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
                      />
                      <span className="text-gray-700">{page.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Select where this promotional popup should appear</p>
            </div>

            {/* Intervals Configuration */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timing Intervals (seconds)
              </label>
              <p className="text-xs text-gray-500 mb-3">
                First interval is the delay before first popup. Subsequent intervals are delays after each close.
              </p>
              <div className="space-y-2">
                {newItemForm.intervals.map((interval, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-32">
                      {idx === 0 ? 'Initial delay:' : `After close ${idx}:`}
                    </span>
                    <input
                      type="number"
                      value={interval.delay}
                      onChange={(e) => updateIntervalInNew(idx, e.target.value)}
                      min="0"
                      step="1"
                      className="w-24 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
                    />
                    <span className="text-sm text-gray-500">seconds</span>
                    {idx > 0 && (
                      <button
                        onClick={() => removeIntervalFromNew(idx)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <MinusCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addIntervalToNew}
                className="mt-2 text-sm text-[#6B4F3A] hover:underline flex items-center gap-1"
              >
                <PlusCircle className="w-4 h-4" />
                Add Another Interval
              </button>
            </div>

            {/* Max Shows */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum number of times to show
              </label>
              <select
                value={newItemForm.maxShows}
                onChange={(e) => setNewItemForm({ ...newItemForm, maxShows: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} time{num > 1 ? 's' : ''}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Popup will not appear after this many total shows</p>
            </div>

            {/* Active Status */}
            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItemForm.isActive}
                  onChange={(e) => setNewItemForm({ ...newItemForm, isActive: e.target.checked })}
                  className="w-4 h-4 rounded focus:ring-[#6B4F3A]"
                />
                <span className="text-sm text-gray-700">Active (immediately start showing)</span>
              </label>
            </div>

            {/* Create Button */}
            <button
              onClick={createPromotionalItem}
              disabled={saving || !newItemForm.productId || !newItemForm.tag || newItemForm.showOnPages.length === 0}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Create Promotional Post
            </button>
          </div>

          {/* Right Column - List of Promotional Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#6B4F3A]" />
                Promotional Posts ({promotionalItems.length})
              </h2>
              <button
                onClick={fetchPromotionalItems}
                className="p-2 text-gray-400 hover:text-[#6B4F3A] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {promotionalItems.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No promotional posts created yet</p>
                <p className="text-xs text-gray-400 mt-1">Use the form to create your first promotional post</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {promotionalItems.map((item) => {
                  const product = item.productId;
                  if (!product) return null;
                  
                  const categoryName = item.categoryId ? categories.find(c => c._id === item.categoryId)?.name : 'All Categories';
                  
                  return (
                    <div key={item._id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Product Image */}
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            {product.images?.[0]?.url ? (
                              <img
                                src={product.images[0].url}
                                alt={product.productName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-6 h-6 text-gray-400 m-5" />
                            )}
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm">{product.productName}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <span>{formatPrice(product.pricePerUnit)}/{getUnitLabel(product.orderUnit)}</span>
                              <span>•</span>
                              <span>MOQ: {product.moq}</span>
                            </div>
                            
                            {/* Category Filter Badge */}
                            <div className="mt-2">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                                <FolderTree className="w-3 h-3" />
                                Target Category: {categoryName}
                              </span>
                            </div>
                            
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-2 py-0.5 bg-[#F5E6D3] text-[#6B4F3A] text-xs rounded-full">
                                Tag: {item.tag}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                Max Shows: {item.maxShows}
                              </span>
                              <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {item.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              Pages: {item.showOnPages?.length || AVAILABLE_PAGES.length} page(s) selected
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              Intervals: {item.intervals.map((i, idx) => (
                                <span key={idx} className="inline-block mr-2">
                                  {idx === 0 ? 'First: ' : `${idx}th close: `}{i.delay}s
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Created: {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditing(item)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deletePromotionalItem(item._id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Edit Form */}
                        {editingItem?._id === item._id && (
                          <div className="border-t border-gray-200 mt-3 pt-3">
                            <h4 className="font-medium text-gray-900 text-sm mb-3">Edit Configuration</h4>
                            
                            {/* Tag */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Tag</label>
                              <input
                                type="text"
                                value={editForm.tag}
                                onChange={(e) => setEditForm({ ...editForm, tag: e.target.value })}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#6B4F3A] focus:border-[#6B4F3A] outline-none"
                              />
                            </div>
                            
                            {/* Category Selection in Edit */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                <div className="flex items-center gap-1">
                                  <FolderTree className="w-3 h-3" />
                                  Target Category (Optional)
                                </div>
                              </label>
                              {editForm.category ? (
                                <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                                  <div className="flex items-center gap-2">
                                    <FolderTree className="w-3 h-3 text-[#6B4F3A]" />
                                    <span className="text-xs text-gray-700">{editForm.category.name}</span>
                                  </div>
                                  <button
                                    onClick={() => removeCategory('edit')}
                                    className="p-0.5 text-red-500 hover:bg-red-50 rounded"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <select
                                  value={editForm.categoryId || ''}
                                  onChange={(e) => {
                                    const catId = e.target.value;
                                    if (catId) {
                                      const cat = categories.find(c => c._id === catId);
                                      setEditForm({ ...editForm, categoryId: catId, category: cat });
                                    } else {
                                      setEditForm({ ...editForm, categoryId: null, category: null });
                                    }
                                  }}
                                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#6B4F3A] outline-none"
                                >
                                  <option value="">-- No Category (Show on all pages) --</option>
                                  {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                            
                            {/* Page Selection in Edit */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Show on Pages</label>
                              <div className="border border-gray-200 rounded-lg p-2 bg-gray-50">
                                <div className="grid grid-cols-2 gap-1">
                                  {AVAILABLE_PAGES.map((page) => (
                                    <label key={page.path} className="flex items-center gap-2 cursor-pointer text-xs">
                                      <input
                                        type="checkbox"
                                        checked={editForm.showOnPages?.includes(page.path) || false}
                                        onChange={() => togglePageSelection('edit', page.path)}
                                        className="rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
                                      />
                                      <span className="text-gray-700">{page.label}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Intervals */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Intervals (seconds)</label>
                              <div className="space-y-1">
                                {editForm.intervals.map((interval, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 w-28">
                                      {idx === 0 ? 'Initial:' : `After close ${idx}:`}
                                    </span>
                                    <input
                                      type="number"
                                      value={interval.delay}
                                      onChange={(e) => updateIntervalInEdit(idx, e.target.value)}
                                      min="0"
                                      step="1"
                                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#6B4F3A] outline-none"
                                    />
                                    <span className="text-xs text-gray-500">seconds</span>
                                    {idx > 0 && (
                                      <button
                                        onClick={() => removeIntervalFromEdit(idx)}
                                        className="p-0.5 text-red-500 hover:bg-red-50 rounded"
                                      >
                                        <MinusCircle className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <button
                                onClick={addIntervalToEdit}
                                className="mt-1 text-xs text-[#6B4F3A] hover:underline flex items-center gap-0.5"
                              >
                                <PlusCircle className="w-3 h-3" />
                                Add Interval
                              </button>
                            </div>
                            
                            {/* Max Shows */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Max Shows</label>
                              <select
                                value={editForm.maxShows}
                                onChange={(e) => setEditForm({ ...editForm, maxShows: parseInt(e.target.value) })}
                                className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#6B4F3A] outline-none"
                              >
                                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                  <option key={num} value={num}>{num} time{num > 1 ? 's' : ''}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Active Status */}
                            <div className="mb-3">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editForm.isActive}
                                  onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                                  className="w-3.5 h-3.5 rounded"
                                />
                                <span className="text-xs text-gray-700">Active</span>
                              </label>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={updatePromotionalItem}
                                disabled={saving}
                                className="px-3 py-1 bg-[#6B4F3A] text-white text-sm rounded hover:bg-[#8B6B51] transition-colors"
                              >
                                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Save Changes'}
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
