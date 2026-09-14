
// // app/authorize/banner-management/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import NextLink from 'next/link';
// import {
//   Plus,
//   Pencil,
//   Trash2,
//   Eye,
//   EyeOff,
//   ArrowLeft,
//   CheckCircle,
//   XCircle,
//   Loader2,
//   RefreshCw,
//   Search,
//   Filter,
//   Calendar,
//   Image as ImageIcon,
//   GripVertical,
//   Sparkles,
//   Bug,
//   Save,
//   ChevronDown,
//   ChevronUp,
//   X,
//   AlertTriangle 
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';


// // ============================================================
// // API SERVICE FUNCTIONS
// // ============================================================

// // app/authorize/banner-management/page.jsx
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
// const getBanners = async () => {
//   const token = localStorage.getItem('token');
//   const response = await fetch(`${API_URL}/api/banners/admin/all?sort=displayOrder_asc&limit=100`, {
//     headers: { 'Authorization': `Bearer ${token}` },
//     cache: 'no-store'
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to fetch banners');
//   return data;
// };



// const deleteBanner = async (id) => {
//   const token = localStorage.getItem('token');
//   const response = await fetch(`http://localhost:5000/api/banners/${id}`, {
//     method: 'DELETE',
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to delete banner');
//   return data;
// };

// const reorderBanners = async (banners) => {
//   const token = localStorage.getItem('token');
//   const response = await fetch('http://localhost:5000/api/banners/reorder', {
//     method: 'PUT',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ banners })
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to reorder banners');
//   return data;
// };

// const getBannerStats = async () => {
//   const token = localStorage.getItem('token');
//   const response = await fetch(`${API_URL}/api/banners/admin/stats`, {
//     headers: { 'Authorization': `Bearer ${token}` },
//     cache: 'no-store'
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to fetch stats');
//   return data;
// };

// // ============================================================
// // DELETE CONFIRMATION MODAL
// // ============================================================

// const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, bannerTitle }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
//         <div className="flex items-center gap-3 text-red-600 mb-4">
//           <AlertTriangle className="w-6 h-6" />
//           <h3 className="text-lg font-semibold">Delete Banner</h3>
//         </div>
//         <p className="text-sm text-gray-600 mb-4">
//           Are you sure you want to delete <strong>"{bannerTitle}"</strong>? This action cannot be undone.
//         </p>
//         <div className="flex gap-3 justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
//           >
//             <Trash2 className="w-4 h-4" />
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // BANNER ITEM COMPONENT - With Drag & Drop
// // ============================================================

// const BannerItem = ({ banner, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);

//   const getStatusBadge = () => {
//     return (
//       <div className="flex items-center gap-2 flex-wrap">
//         {banner.isActive ? (
//           <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
//             <CheckCircle className="w-3 h-3" />
//             Active
//           </span>
//         ) : (
//           <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
//             <XCircle className="w-3 h-3" />
//             Inactive
//           </span>
//         )}
//         {banner.isPublished ? (
//           <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
//             <Eye className="w-3 h-3" />
//             Published
//           </span>
//         ) : (
//           <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
//             <EyeOff className="w-3 h-3" />
//             Draft
//           </span>
//         )}
//       </div>
//     );
//   };

//   // ✅ FIXED: Use banner._id instead of index
//   const handleToggleStatus = () => {
//     const newStatus = !banner.isActive;
//     onUpdate(banner._id, { isActive: newStatus });
//     toast.success(`Banner "${banner.title}" ${newStatus ? 'activated' : 'deactivated'}`);
//   };

//   // ✅ FIXED: Use banner._id instead of index
//   const handleTogglePublish = () => {
//     const newStatus = !banner.isPublished;
//     onUpdate(banner._id, { isPublished: newStatus });
//     toast.success(`Banner "${banner.title}" ${newStatus ? 'published' : 'unpublished'}`);
//   };

//   // Drag and drop handlers
//   const handleDragStart = (e) => {
//     setIsDragging(true);
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', index.toString());
//     setTimeout(() => {
//       e.target.classList.add('opacity-50');
//     }, 0);
//   };

//   const handleDragEnd = (e) => {
//     setIsDragging(false);
//     e.target.classList.remove('opacity-50');
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
//     if (draggedIndex !== index) {
//       onMove(draggedIndex, index);
//     }
//   };

//   return (
//     <div
//       className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
//         banner.isActive 
//           ? 'border-pink-500/20 hover:border-pink-500/40' 
//           : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
//       } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//       draggable={true}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <div className={`flex items-center justify-between p-4 border-b ${
//         banner.isActive 
//           ? 'bg-gradient-to-r from-pink-500/5 to-black/5 border-pink-500/20' 
//           : 'bg-gray-100 border-gray-200'
//       }`}>
//         <div className="flex items-center gap-3 flex-1 min-w-0">
//           <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
//             <GripVertical className="w-4 h-4" />
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
//               {banner.circleImage ? (
//                 <img
//                   src={banner.circleImage}
//                   alt={banner.title}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23d1d5db" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpath d="M21 15l-5-5L5 21"%3E%3C/path%3E%3C/svg%3E';
//                   }}
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center">
//                   <ImageIcon className="w-5 h-5 text-gray-400" />
//                 </div>
//               )}
//             </div>
//             <div className="min-w-0">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <span className={`text-sm font-medium ${banner.isActive ? 'text-black' : 'text-gray-500'}`}>
//                   {banner.title}
//                 </span>
//                 <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
//                   #{banner.displayOrder !== undefined ? banner.displayOrder : index + 1}
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 truncate">{banner.eyebrow || 'No eyebrow'}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-1">
//             {getStatusBadge()}
//           </div>
//         </div>
//         <div className="flex items-center gap-1 flex-shrink-0">
//           {/* ✅ FIXED: Use handleToggleStatus */}
//           <button
//             type="button"
//             onClick={handleToggleStatus}
//             className={`p-1 rounded transition-colors ${
//               banner.isActive
//                 ? 'text-green-600 hover:bg-green-100'
//                 : 'text-gray-500 hover:bg-gray-200'
//             }`}
//             title={banner.isActive ? 'Deactivate' : 'Activate'}
//           >
//             {banner.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
//           </button>
          
//           {/* ✅ FIXED: Use handleTogglePublish */}
//           <button
//             type="button"
//             onClick={handleTogglePublish}
//             className={`p-1 rounded transition-colors ${
//               banner.isPublished
//                 ? 'text-blue-600 hover:bg-blue-100'
//                 : 'text-gray-500 hover:bg-gray-200'
//             }`}
//             title={banner.isPublished ? 'Unpublish' : 'Publish'}
//           >
//             {banner.isPublished ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
//           </button>
          
//           <button
//             type="button"
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200 transition-colors"
//           >
//             {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//           </button>
//            <NextLink 
//     href={`/authorize/edit-banner?id=${banner._id}`}
//     className="p-1 rounded transition-colors text-blue-600 hover:bg-blue-100"
//     title="Edit Banner"
//   >
//     <Pencil className="w-4 h-4" />
//   </NextLink>
          
//           {/* ✅ FIXED: Pass banner._id and banner.title */}
//           <button
//             type="button"
//             onClick={() => onRemove(banner._id, banner.title)}
//             className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//             title="Delete"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {isExpanded && (
//         <div className={`p-4 space-y-3 ${!banner.isActive ? 'opacity-75' : ''}`}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
//               {/* ✅ FIXED: Use banner._id */}
//               <input
//                 type="text"
//                 value={banner.title || ''}
//                 onChange={(e) => onUpdate(banner._id, { title: e.target.value })}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Eyebrow</label>
//               {/* ✅ FIXED: Use banner._id */}
//               <input
//                 type="text"
//                 value={banner.eyebrow || ''}
//                 onChange={(e) => onUpdate(banner._id, { eyebrow: e.target.value })}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white"
//                 placeholder="New In — Beauty Edit"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle / Description</label>
//             {/* ✅ FIXED: Use banner._id */}
//             <textarea
//               value={banner.subtitle || ''}
//               onChange={(e) => onUpdate(banner._id, { subtitle: e.target.value })}
//               rows={2}
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white resize-none"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Badge Text</label>
//               {/* ✅ FIXED: Use banner._id */}
//               <input
//                 type="text"
//                 value={banner.badgeText || ''}
//                 onChange={(e) => onUpdate(banner._id, { badgeText: e.target.value })}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white"
//                 placeholder="Up to 30% off"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Display Order</label>
//               {/* ✅ FIXED: Use banner._id */}
//               <input
//                 type="number"
//                 value={banner.displayOrder !== undefined ? banner.displayOrder : index}
//                 onChange={(e) => onUpdate(banner._id, { displayOrder: parseInt(e.target.value) })}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white"
//                 min="0"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">CTA Label</label>
//               {/* ✅ FIXED: Use banner._id */}
//               <input
//                 type="text"
//                 value={banner.ctaLabel || ''}
//                 onChange={(e) => onUpdate(banner._id, { ctaLabel: e.target.value })}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white"
//                 placeholder="Shop the edit"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">CTA Link</label>
//               {/* ✅ FIXED: Use banner._id */}
//               <input
//                 type="text"
//                 value={banner.ctaHref || ''}
//                 onChange={(e) => onUpdate(banner._id, { ctaHref: e.target.value })}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white"
//                 placeholder="/products"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Secondary Label</label>
//               {/* ✅ FIXED: Use banner._id */}
//               <input
//                 type="text"
//                 value={banner.secondaryLabel || ''}
//                 onChange={(e) => onUpdate(banner._id, { secondaryLabel: e.target.value })}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white"
//                 placeholder="Our story"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Secondary Link</label>
//               {/* ✅ FIXED: Use banner._id */}
//               <input
//                 type="text"
//                 value={banner.secondaryHref || ''}
//                 onChange={(e) => onUpdate(banner._id, { secondaryHref: e.target.value })}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white"
//                 placeholder="/about"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-200">
//             <span>Created: {new Date(banner.createdAt).toLocaleDateString()}</span>
//             <span>ID: {banner._id}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============================================================
// // MAIN COMPONENT
// // ============================================================

// export default function BannerManagementPage() {
//   const router = useRouter();
//   const [banners, setBanners] = useState([]);
//   const [filteredBanners, setFilteredBanners] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [isDebugOpen, setIsDebugOpen] = useState(false);

//   // Load banners on mount
//   useEffect(() => {
//     loadBanners();
//     loadStats();
//   }, []);

//   const loadBanners = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getBanners();
//       if (response.success) {
//         setBanners(response.data);
//         setFilteredBanners(response.data);
//       }
//     } catch (error) {
//       console.error('Error loading banners:', error);
//       toast.error('Failed to load banners');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loadStats = async () => {
//     try {
//       const response = await getBannerStats();
//       if (response.success) {
//         setStats(response.data);
//       }
//     } catch (error) {
//       console.error('Error loading stats:', error);
//     }
//   };

//   // Filter banners
//   useEffect(() => {
//     let filtered = banners;

//     if (searchTerm) {
//       filtered = filtered.filter(banner =>
//         banner.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         banner.eyebrow?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         banner.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (filterStatus === 'active') {
//       filtered = filtered.filter(b => b.isActive === true);
//     } else if (filterStatus === 'inactive') {
//       filtered = filtered.filter(b => b.isActive === false);
//     } else if (filterStatus === 'published') {
//       filtered = filtered.filter(b => b.isPublished === true);
//     } else if (filterStatus === 'draft') {
//       filtered = filtered.filter(b => b.isPublished === false);
//     }

//     setFilteredBanners(filtered);
//   }, [searchTerm, filterStatus, banners]);

//   // ✅ FIXED: Update banner by _id
//   const updateBanner = (bannerId, updatedFields) => {
//     setBanners(prev =>
//       prev.map(b => (b._id === bannerId ? { ...b, ...updatedFields } : b))
//     );
//     setFilteredBanners(prev =>
//       prev.map(b => (b._id === bannerId ? { ...b, ...updatedFields } : b))
//     );
//   };

//   // ✅ FIXED: Remove banner by _id
//   const removeBanner = (bannerId, bannerTitle) => {
//     setDeleteTarget({ id: bannerId, title: bannerTitle });
//     setShowDeleteModal(true);
//   };

//   // ✅ FIXED: Confirm delete by _id
//   const confirmDelete = async () => {
//     if (!deleteTarget) return;
//     try {
//       await deleteBanner(deleteTarget.id);
//       toast.success('Banner deleted successfully');
//       setShowDeleteModal(false);
//       setDeleteTarget(null);
//       // Reload to refresh both arrays
//       await loadBanners();
//       await loadStats();
//     } catch (error) {
//       toast.error(error.message || 'Failed to delete banner');
//     }
//   };

//   // ✅ FIXED: Move banner (drag and drop)
//   const moveBanner = (fromFilteredIndex, toFilteredIndex) => {
//     if (fromFilteredIndex === toFilteredIndex) return;

//     const draggedBanner = filteredBanners[fromFilteredIndex];
//     const targetBanner = filteredBanners[toFilteredIndex];
//     if (!draggedBanner || !targetBanner) return;

//     // Update banners array
//     setBanners(prevBanners => {
//       const updated = [...prevBanners];
//       const fromIndex = updated.findIndex(b => b._id === draggedBanner._id);
//       const toIndex = updated.findIndex(b => b._id === targetBanner._id);
//       if (fromIndex === -1 || toIndex === -1) return prevBanners;

//       const [removed] = updated.splice(fromIndex, 1);
//       updated.splice(toIndex, 0, removed);

//       // Update displayOrder based on new position
//       const reordered = updated.map((banner, idx) => ({ ...banner, displayOrder: idx }));
      
//       // Save reorder to backend
//       saveReorder(reordered);
//       return reordered;
//     });

//     // Also update filteredBanners
//     setFilteredBanners(prev => {
//       const updated = [...prev];
//       const [removed] = updated.splice(fromFilteredIndex, 1);
//       updated.splice(toFilteredIndex, 0, removed);
//       return updated.map((banner, idx) => ({ ...banner, displayOrder: idx }));
//     });
//   };

//   // ✅ Save reorder to backend
//   const saveReorder = async (updatedBanners) => {
//     try {
//       const orderUpdates = updatedBanners.map(banner => ({
//         id: banner._id,
//         order: banner.displayOrder
//       }));
//       await reorderBanners(orderUpdates);
//       toast.success('Banners reordered successfully');
//     } catch (error) {
//       toast.error(error.message || 'Failed to save reorder');
//       loadBanners(); // revert to server truth on failure
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
      
//       // Save all banner updates
//       for (const banner of banners) {
//         const updateData = {
//           title: banner.title,
//           eyebrow: banner.eyebrow,
//           subtitle: banner.subtitle,
//           description: banner.description,
//           badgeText: banner.badgeText,
//           leftPanelBgImage: banner.leftPanelBgImage,
//           circleImage: banner.circleImage,
//           rightPanelBgImage: banner.rightPanelBgImage,
//           ctaLabel: banner.ctaLabel,
//           ctaHref: banner.ctaHref,
//           secondaryLabel: banner.secondaryLabel,
//           secondaryHref: banner.secondaryHref,
//           displayOrder: banner.displayOrder,
//           isActive: banner.isActive,
//           isPublished: banner.isPublished,
//           showOnHomepage: banner.showOnHomepage !== undefined ? banner.showOnHomepage : true,
//           showOnMobile: banner.showOnMobile !== undefined ? banner.showOnMobile : true
//         };

//         const response = await fetch(`http://localhost:5000/api/banners/${banner._id}`, {
//           method: 'PUT',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(updateData)
//         });

//         if (!response.ok) {
//           const data = await response.json();
//           throw new Error(data.error || `Failed to update banner: ${banner.title}`);
//         }
//       }

//       toast.success('All banners updated successfully!');
//       await loadBanners();
//       await loadStats();
//     } catch (error) {
//       console.error('Error saving banners:', error);
//       toast.error(error.message || 'Failed to save changes');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Debug functions
//   const debugLogBanners = () => {
//     console.log('📊 Current banners state:', banners);
//     banners.forEach((b, i) => {
//       console.log(`  ${i + 1}. ${b.title}: isActive = ${b.isActive}, displayOrder = ${b.displayOrder}`);
//     });
//     toast.info(`Current: ${banners.length} banners`);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#f8f5f6] flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-pink-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-500">Loading banners...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="manage_banner">
//       <div className="min-h-screen bg-[#f8f5f6]">
//         {/* Delete Confirmation Modal */}
//         <DeleteConfirmModal
//           isOpen={showDeleteModal}
//           onClose={() => {
//             setShowDeleteModal(false);
//             setDeleteTarget(null);
//           }}
//           onConfirm={confirmDelete}
//           bannerTitle={deleteTarget?.title || ''}
//         />

//         {/* Header */}
//         <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-10">
//           <div className="px-4 sm:px-6 py-3 sm:py-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div className="flex items-center gap-2 sm:gap-4">
//                 <a href="/authorize/dashboard" className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-pink-600" />
//                 </a>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
//                     <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
//                       Banner Management
//                     </h1>
//                   </div>
//                   <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
//                     Drag & drop to reorder banners • Click the arrow to expand details
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setIsDebugOpen(!isDebugOpen)}
//                   className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-colors border ${
//                     isDebugOpen 
//                       ? 'bg-yellow-100 text-yellow-700 border-yellow-300' 
//                       : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
//                   }`}
//                 >
//                   <Bug className="w-4 h-4" />
//                   Debug
//                 </button>
//                 <button
//                   onClick={loadBanners}
//                   className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                 </button>
//                 <a
//                   href="/authorize/create-banner"
//                   className="px-4 py-2 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-md"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Create Banner
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Debug Panel */}
//         {isDebugOpen && (
//           <div className="mx-4 sm:mx-6 mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-sm font-semibold text-yellow-800 flex items-center gap-2">
//                 <Bug className="w-4 h-4" />
//                 Debug Panel
//               </h3>
//               <button
//                 onClick={() => setIsDebugOpen(false)}
//                 className="text-yellow-600 hover:text-yellow-800"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={debugLogBanners}
//                 className="px-3 py-1.5 text-xs font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//               >
//                 Log Current State
//               </button>
//               <button
//                 onClick={loadBanners}
//                 className="px-3 py-1.5 text-xs font-medium bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
//               >
//                 Refresh Data
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Stats Cards */}
//         {stats && (
//           <div className="p-4 sm:p-6 pb-0 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
//             <div className="bg-white rounded-lg shadow-sm border border-pink-200 p-3 sm:p-4">
//               <p className="text-xs text-gray-500">Total</p>
//               <p className="text-xl font-bold text-gray-900">{stats.total}</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-pink-200 p-3 sm:p-4">
//               <p className="text-xs text-gray-500">Active</p>
//               <p className="text-xl font-bold text-green-600">{stats.active}</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-pink-200 p-3 sm:p-4">
//               <p className="text-xs text-gray-500">Published</p>
//               <p className="text-xl font-bold text-blue-600">{stats.published}</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-pink-200 p-3 sm:p-4">
//               <p className="text-xs text-gray-500">Views</p>
//               <p className="text-xl font-bold text-gray-900">{stats.views || 0}</p>
//             </div>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="p-4 sm:p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Filters */}
//             <div className="bg-white rounded-xl shadow-sm border border-pink-200 p-4">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="flex-1">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <input
//                       type="text"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       placeholder="Search banners by title or eyebrow..."
//                       className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white hover:border-pink-300"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Filter className="w-4 h-4 text-gray-400" />
//                   <select
//                     value={filterStatus}
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white hover:border-pink-300"
//                   >
//                     <option value="all">All Status</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                     <option value="published">Published</option>
//                     <option value="draft">Draft</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="mt-2 flex items-center justify-between">
//                 <span className="text-sm text-gray-500">
//                   {filteredBanners.length} banner{filteredBanners.length !== 1 ? 's' : ''} found
//                 </span>
//               </div>
//             </div>

//             {/* Banners List */}
//             <div className="bg-white rounded-xl shadow-sm border border-pink-200 p-4 sm:p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Sparkles className="w-5 h-5 text-pink-600" />
//                     Banners
//                     <span className="text-xs font-normal text-gray-400 ml-2">
//                       ({banners.filter(s => s.isActive === true).length} active, {banners.filter(s => s.isActive === false).length} inactive)
//                     </span>
//                   </h2>
//                   <p className="text-sm text-gray-500 mt-1">
//                     <span className="inline-flex items-center gap-1">
//                       <GripVertical className="w-4 h-4 text-gray-400" />
//                       Drag and drop to reorder
//                     </span>
//                     • Click the arrow to expand and edit details
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 {filteredBanners.map((banner, index) => (
//                   <BannerItem
//                     key={banner._id}
//                     banner={{
//                       ...banner,
//                       totalBanners: filteredBanners.length
//                     }}
//                     index={index}
//                     onUpdate={updateBanner}
//                     onRemove={removeBanner}
//                     onMove={moveBanner}
//                     isFirst={index === 0}
//                     isLast={index === filteredBanners.length - 1}
//                   />
//                 ))}
//               </div>

//               {filteredBanners.length === 0 && (
//                 <div className="text-center py-12 text-gray-500">
//                   <Sparkles className="w-12 h-12 mx-auto mb-3 text-pink-600/30" />
//                   <p>No banners found</p>
//                   <p className="text-sm">Create your first beauty banner to get started</p>
//                 </div>
//               )}
//             </div>

//             {/* Reorder instructions */}
//             {filteredBanners.length > 1 && (
//               <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-2">
//                 <GripVertical className="w-3 h-3" />
//                 Drag the handle on each banner card to reorder
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Saving Changes...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>Save All Changes</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }


// app/authorize/banner-management/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  Image as ImageIcon,
  GripVertical,
  Sparkles,
  Bug,
  Save,
  ChevronDown,
  ChevronUp,
  X,
  AlertTriangle,
  Hash,
  Type,
  AlignLeft,
  Link as LinkIcon,
  CheckSquare
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================================
// API SERVICE FUNCTIONS
// ============================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getBanners = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/banners/admin/all?sort=displayOrder_asc&limit=100`, {
    headers: { 'Authorization': `Bearer ${token}` },
    cache: 'no-store'
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch banners');
  return data;
};

const deleteBanner = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/banners/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || 'Failed to delete banner');
  return data;
};

const reorderBanners = async (banners) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/banners/reorder`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ banners })
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || 'Failed to reorder banners');
  return data;
};

const getBannerStats = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/banners/admin/stats`, {
    headers: { 'Authorization': `Bearer ${token}` },
    cache: 'no-store'
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch stats');
  return data;
};

const updateBannerApi = async (id, data) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/banners/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.error || 'Failed to update banner');
  return result;
};

// ============================================================
// DELETE CONFIRMATION MODAL
// ============================================================

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, bannerTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Delete Banner</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete <strong>"{bannerTitle}"</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// BANNER ITEM COMPONENT - With Drag & Drop
// ============================================================

const BannerItem = ({ banner, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getStatusBadge = () => {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {banner.isActive ? (
          <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            <XCircle className="w-3 h-3" />
            Inactive
          </span>
        )}
        {banner.isPublished ? (
          <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
            <Eye className="w-3 h-3" />
            Published
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            <EyeOff className="w-3 h-3" />
            Draft
          </span>
        )}
      </div>
    );
  };

  const handleFieldUpdate = async (field, value) => {
    setIsSaving(true);
    try {
      const updateData = { [field]: value };
      await updateBannerApi(banner._id, updateData);
      onUpdate(banner._id, updateData);
      toast.success(`${field} updated successfully`);
    } catch (error) {
      toast.error(error.message || 'Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = () => {
    const newStatus = !banner.isActive;
    handleFieldUpdate('isActive', newStatus);
  };

  const handleTogglePublish = () => {
    const newStatus = !banner.isPublished;
    handleFieldUpdate('isPublished', newStatus);
  };

  const handleInputChange = (field, value) => {
    onUpdate(banner._id, { [field]: value });
  };

  const handleInputBlur = async (field, value) => {
    const currentValue = banner[field];
    if (value !== currentValue) {
      await handleFieldUpdate(field, value);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    setTimeout(() => {
      e.target.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    e.target.classList.remove('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (draggedIndex !== index) {
      onMove(draggedIndex, index);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
        banner.isActive 
          ? 'border-[#8B9D83]/30 hover:border-[#8B9D83]/60' 
          : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
      } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={`flex items-center justify-between p-4 border-b ${
        banner.isActive 
          ? 'bg-gradient-to-r from-[#8B9D83]/5 to-black/5 border-[#8B9D83]/20' 
          : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
            <GripVertical className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              {banner.bgImage ? (
                <img
                  src={banner.bgImage}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23d1d5db" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpath d="M21 15l-5-5L5 21"%3E%3C/path%3E%3C/svg%3E';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-sm font-medium ${banner.isActive ? 'text-black' : 'text-gray-500'}`}>
                  {banner.title || 'Untitled Banner'}
                </span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  #{banner.displayOrder !== undefined ? banner.displayOrder : index + 1}
                </span>
                {isSaving && <Loader2 className="w-3 h-3 animate-spin text-[#8B9D83]" />}
              </div>
              {banner.tagline && (
                <p className="text-xs text-gray-500 truncate">{banner.tagline}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {getStatusBadge()}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={handleToggleStatus}
            className={`p-1 rounded transition-colors ${
              banner.isActive
                ? 'text-green-600 hover:bg-green-100'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            title={banner.isActive ? 'Deactivate' : 'Activate'}
          >
            {banner.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          </button>
          
          <button
            type="button"
            onClick={handleTogglePublish}
            className={`p-1 rounded transition-colors ${
              banner.isPublished
                ? 'text-blue-600 hover:bg-blue-100'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            title={banner.isPublished ? 'Unpublish' : 'Publish'}
          >
            {banner.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          <NextLink 
            href={`/authorize/edit-banner?id=${banner._id}`}
            className="p-1 rounded transition-colors text-blue-600 hover:bg-blue-100"
            title="Edit Banner"
          >
            <Pencil className="w-4 h-4" />
          </NextLink>
          
          <button
            type="button"
            onClick={() => onRemove(banner._id, banner.title || 'Untitled')}
            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={`p-4 space-y-3 ${!banner.isActive ? 'opacity-75' : ''}`}>
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Type className="w-3 h-3" />
                Title
              </label>
              <input
                type="text"
                value={banner.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                onBlur={(e) => handleInputBlur('title', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition bg-white"
                placeholder="e.g., Timeless Comfort,"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Hash className="w-3 h-3" />
                Tagline / Badge
              </label>
              <input
                type="text"
                value={banner.tagline || ''}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                onBlur={(e) => handleInputBlur('tagline', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition bg-white"
                placeholder="e.g., Timeless Collection"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Type className="w-3 h-3" />
                Highlighted Text
              </label>
              <input
                type="text"
                value={banner.highlightedText || ''}
                onChange={(e) => handleInputChange('highlightedText', e.target.value)}
                onBlur={(e) => handleInputBlur('highlightedText', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition bg-white"
                placeholder="e.g., Modern Craftsmanship."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Hash className="w-3 h-3" />
                Display Order
              </label>
              <input
                type="number"
                value={banner.displayOrder !== undefined ? banner.displayOrder : index}
                onChange={(e) => handleInputChange('displayOrder', parseInt(e.target.value) || 0)}
                onBlur={(e) => handleInputBlur('displayOrder', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition bg-white"
                min="0"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
              <AlignLeft className="w-3 h-3" />
              Description
            </label>
            <textarea
              value={banner.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              onBlur={(e) => handleInputBlur('description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition bg-white resize-none"
              placeholder="Describe your collection..."
            />
          </div>

          {/* CTA Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <LinkIcon className="w-3 h-3" />
                CTA Label
              </label>
              <input
                type="text"
                value={banner.ctaLabel || ''}
                onChange={(e) => handleInputChange('ctaLabel', e.target.value)}
                onBlur={(e) => handleInputBlur('ctaLabel', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition bg-white"
                placeholder="Explore the Collection"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <LinkIcon className="w-3 h-3" />
                CTA Link
              </label>
              <input
                type="text"
                value={banner.ctaHref || ''}
                onChange={(e) => handleInputChange('ctaHref', e.target.value)}
                onBlur={(e) => handleInputBlur('ctaHref', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition bg-white"
                placeholder="/collection"
              />
            </div>
          </div>

          {/* Trust Indicators */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
              <CheckSquare className="w-3 h-3" />
              Trust Indicators
            </label>
            <div className="flex flex-wrap gap-2">
              {banner.trustIndicators && banner.trustIndicators.length > 0 ? (
                banner.trustIndicators.map((indicator, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-[#8B9D83]/10 text-[#8B9D83] rounded-full text-xs"
                  >
                    {indicator}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400">No trust indicators</span>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-200">
            <span>Created: {new Date(banner.createdAt).toLocaleDateString()}</span>
            <span>ID: {banner._id}</span>
            {banner.views > 0 && <span>👁️ {banner.views} views</span>}
            {banner.clicks > 0 && <span>🖱️ {banner.clicks} clicks</span>}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function BannerManagementPage() {
  const router = useRouter();
  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [stats, setStats] = useState(null);
  const [isDebugOpen, setIsDebugOpen] = useState(false);

  // Load banners on mount
  useEffect(() => {
    loadBanners();
    loadStats();
  }, []);

  const loadBanners = async () => {
    setIsLoading(true);
    try {
      const response = await getBanners();
      if (response.success) {
        setBanners(response.data);
        setFilteredBanners(response.data);
      }
    } catch (error) {
      console.error('Error loading banners:', error);
      toast.error('Failed to load banners');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await getBannerStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Filter banners
  useEffect(() => {
    let filtered = banners;

    if (searchTerm) {
      filtered = filtered.filter(banner =>
        banner.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.tagline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus === 'active') {
      filtered = filtered.filter(b => b.isActive === true);
    } else if (filterStatus === 'inactive') {
      filtered = filtered.filter(b => b.isActive === false);
    } else if (filterStatus === 'published') {
      filtered = filtered.filter(b => b.isPublished === true);
    } else if (filterStatus === 'draft') {
      filtered = filtered.filter(b => b.isPublished === false);
    }

    setFilteredBanners(filtered);
  }, [searchTerm, filterStatus, banners]);

  // Update banner
  const updateBanner = (bannerId, updatedFields) => {
    setBanners(prev =>
      prev.map(b => (b._id === bannerId ? { ...b, ...updatedFields } : b))
    );
    setFilteredBanners(prev =>
      prev.map(b => (b._id === bannerId ? { ...b, ...updatedFields } : b))
    );
  };

  // Remove banner
  const removeBanner = (bannerId, bannerTitle) => {
    setDeleteTarget({ id: bannerId, title: bannerTitle });
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteBanner(deleteTarget.id);
      toast.success('Banner deleted successfully');
      setShowDeleteModal(false);
      setDeleteTarget(null);
      await loadBanners();
      await loadStats();
    } catch (error) {
      toast.error(error.message || 'Failed to delete banner');
    }
  };

  // Move banner (drag and drop)
  const moveBanner = (fromFilteredIndex, toFilteredIndex) => {
    if (fromFilteredIndex === toFilteredIndex) return;

    const draggedBanner = filteredBanners[fromFilteredIndex];
    const targetBanner = filteredBanners[toFilteredIndex];
    if (!draggedBanner || !targetBanner) return;

    // Update banners array
    setBanners(prevBanners => {
      const updated = [...prevBanners];
      const fromIndex = updated.findIndex(b => b._id === draggedBanner._id);
      const toIndex = updated.findIndex(b => b._id === targetBanner._id);
      if (fromIndex === -1 || toIndex === -1) return prevBanners;

      const [removed] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, removed);

      // Update displayOrder based on new position
      const reordered = updated.map((banner, idx) => ({ ...banner, displayOrder: idx }));
      
      // Save reorder to backend
      saveReorder(reordered);
      return reordered;
    });

    // Also update filteredBanners
    setFilteredBanners(prev => {
      const updated = [...prev];
      const [removed] = updated.splice(fromFilteredIndex, 1);
      updated.splice(toFilteredIndex, 0, removed);
      return updated.map((banner, idx) => ({ ...banner, displayOrder: idx }));
    });
  };

  // Save reorder to backend
  const saveReorder = async (updatedBanners) => {
    try {
      const orderUpdates = updatedBanners.map(banner => ({
        id: banner._id,
        order: banner.displayOrder
      }));
      await reorderBanners(orderUpdates);
      toast.success('Banners reordered successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to save reorder');
      loadBanners(); // revert to server truth on failure
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      // Save all banner updates
      for (const banner of banners) {
        const updateData = {
          tagline: banner.tagline || '',
          title: banner.title || '',
          highlightedText: banner.highlightedText || '',
          description: banner.description || '',
          bgImage: banner.bgImage || '/images/hh.PNG',
          ctaLabel: banner.ctaLabel || 'Explore the Collection',
          ctaHref: banner.ctaHref || '/collection',
          trustIndicators: banner.trustIndicators || ['Heirloom Quality', 'Sustainably Made', 'Lifetime Care'],
          displayOrder: banner.displayOrder,
          isActive: banner.isActive,
          isPublished: banner.isPublished,
          showOnHomepage: banner.showOnHomepage !== undefined ? banner.showOnHomepage : true
        };

        const response = await fetch(`${API_URL}/api/banners/${banner._id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || `Failed to update banner: ${banner.title}`);
        }
      }

      toast.success('All banners updated successfully!');
      await loadBanners();
      await loadStats();
    } catch (error) {
      console.error('Error saving banners:', error);
      toast.error(error.message || 'Failed to save changes');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug functions
  const debugLogBanners = () => {
    console.log('📊 Current banners state:', banners);
    banners.forEach((b, i) => {
      console.log(`  ${i + 1}. ${b.title}: isActive = ${b.isActive}, displayOrder = ${b.displayOrder}`);
    });
    toast.info(`Current: ${banners.length} banners`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f5f6] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#8B9D83] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading banners...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="manage_banner">
      <div className="min-h-screen bg-[#f8f5f6]">
        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteTarget(null);
          }}
          onConfirm={confirmDelete}
          bannerTitle={deleteTarget?.title || ''}
        />

        {/* Header */}
        <div className="bg-white border-b border-[#8B9D83]/20 shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4">
                <a href="/authorize/dashboard" className="p-2 hover:bg-[#8B9D83]/10 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-[#8B9D83]" />
                </a>
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B9D83]" />
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                      Banner Management
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Drag & drop to reorder banners • Click the arrow to expand details
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDebugOpen(!isDebugOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-colors border ${
                    isDebugOpen 
                      ? 'bg-yellow-100 text-yellow-700 border-yellow-300' 
                      : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <Bug className="w-4 h-4" />
                  Debug
                </button>
                <button
                  onClick={loadBanners}
                  className="p-2 text-gray-400 hover:text-[#8B9D83] hover:bg-[#8B9D83]/10 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <a
                  href="/authorize/create-banner"
                  className="px-4 py-2 text-sm bg-[#8B9D83] text-white rounded-lg hover:bg-[#7A8A73] transition-colors flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Create Banner
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Panel */}
        {isDebugOpen && (
          <div className="mx-4 sm:mx-6 mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-yellow-800 flex items-center gap-2">
                <Bug className="w-4 h-4" />
                Debug Panel
              </h3>
              <button
                onClick={() => setIsDebugOpen(false)}
                className="text-yellow-600 hover:text-yellow-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={debugLogBanners}
                className="px-3 py-1.5 text-xs font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Log Current State
              </button>
              <button
                onClick={loadBanners}
                className="px-3 py-1.5 text-xs font-medium bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Refresh Data
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="p-4 sm:p-6 pb-0 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-[#8B9D83]/20 p-3 sm:p-4">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-[#8B9D83]/20 p-3 sm:p-4">
              <p className="text-xs text-gray-500">Active</p>
              <p className="text-xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-[#8B9D83]/20 p-3 sm:p-4">
              <p className="text-xs text-gray-500">Published</p>
              <p className="text-xl font-bold text-blue-600">{stats.published}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-[#8B9D83]/20 p-3 sm:p-4">
              <p className="text-xs text-gray-500">Views</p>
              <p className="text-xl font-bold text-gray-900">{stats.views || 0}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-[#8B9D83]/20 p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search banners by title or tagline..."
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition bg-white hover:border-[#8B9D83]/50"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition bg-white hover:border-[#8B9D83]/50"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {filteredBanners.length} banner{filteredBanners.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>

            {/* Banners List */}
            <div className="bg-white rounded-xl shadow-sm border border-[#8B9D83]/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#8B9D83]" />
                    Banners
                    <span className="text-xs font-normal text-gray-400 ml-2">
                      ({banners.filter(s => s.isActive === true).length} active, {banners.filter(s => s.isActive === false).length} inactive)
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      Drag and drop to reorder
                    </span>
                    • Click the arrow to expand and edit details
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {filteredBanners.map((banner, index) => (
                  <BannerItem
                    key={banner._id}
                    banner={banner}
                    index={index}
                    onUpdate={updateBanner}
                    onRemove={removeBanner}
                    onMove={moveBanner}
                    isFirst={index === 0}
                    isLast={index === filteredBanners.length - 1}
                  />
                ))}
              </div>

              {filteredBanners.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Sparkles className="w-12 h-12 mx-auto mb-3 text-[#8B9D83]/30" />
                  <p>No banners found</p>
                  <p className="text-sm">Create your first hero banner to get started</p>
                </div>
              )}
            </div>

            {/* Reorder instructions */}
            {filteredBanners.length > 1 && (
              <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                <GripVertical className="w-3 h-3" />
                Drag the handle on each banner card to reorder
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B9D83] to-[#7A8A73] text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save All Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}