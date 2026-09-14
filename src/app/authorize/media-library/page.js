// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   ArrowLeft, 
//   Search, 
//   Upload, 
//   Trash2, 
//   Copy, 
//   X, 
//   Loader2, 
//   FolderOpen, 
//   FolderTree,
//   RefreshCw,
//   Image as ImageIcon,
//   Video,
//   CheckCircle,
//   AlertCircle,
//   Grid3x3,
//   List,
//   ChevronDown,
//   ChevronRight,
//   FileText,
//   Calendar,
//   HardDrive,
//   Eye,
//   Filter,
//   AlertTriangle
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// const ROOT_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'smart-gadget';

// // Helper to get user role
// const getUserRole = () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload.role || '';
//     }
//   } catch (error) {
//     console.error('Error getting user role:', error);
//   }
//   return '';
// };

// // ============================================================
// // DELETE CONFIRMATION MODAL
// // ============================================================
// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemCount, itemName, isSingle = false }) => {
//   if (!isOpen) return null;
  
//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-red-100">
//         <div className="flex items-center gap-3 text-red-600 mb-4">
//           <div className="p-2 bg-red-100 rounded-full">
//             <AlertTriangle className="w-6 h-6" />
//           </div>
//           <h3 className="text-lg font-semibold">
//             {isSingle ? 'Delete Item' : `Delete ${itemCount} Items`}
//           </h3>
//         </div>
        
//         <p className="text-gray-600 mb-2">
//           {isSingle ? (
//             <>Are you sure you want to delete <span className="font-semibold text-[#708268]">"{itemName}"</span>?</>
//           ) : (
//             <>Are you sure you want to delete <span className="font-semibold text-[#708268]">{itemCount}</span> items?</>
//           )}
//         </p>
//         <p className="text-sm text-gray-500 mb-6">
//           This action cannot be undone. The media will be permanently removed from Cloudinary.
//         </p>

//         <div className="flex items-center justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-200/50 flex items-center gap-2"
//           >
//             <Trash2 className="w-4 h-4" />
//             {isSingle ? 'Delete' : `Delete ${itemCount} Items`}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function MediaLibrary() {
//   const router = useRouter();
//   const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
//   const [items, setItems] = useState([]);
//   const [folders, setFolders] = useState([]);
//   const [folder, setFolder] = useState(ROOT_FOLDER);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [nextCursor, setNextCursor] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [selected, setSelected] = useState(new Set());
//   const [deleting, setDeleting] = useState(false);
//   const [hoverId, setHoverId] = useState(null);
//   const [previewItem, setPreviewItem] = useState(null);
//   const [viewMode, setViewMode] = useState('grid');
//   const [stats, setStats] = useState({ total: 0, images: 0, videos: 0 });
//   const [mediaType, setMediaType] = useState('all'); // 'all' | 'image' | 'video'
  
//   // ✅ Delete Modal State
//   const [deleteModal, setDeleteModal] = useState({
//     isOpen: false,
//     isSingle: false,
//     itemCount: 0,
//     itemName: '',
//     itemsToDelete: [],
//     onConfirm: null
//   });
  
//   const searchTimer = useRef(null);
//   const fileInputRef = useRef(null);
//   const userRole = getUserRole();
//   // ✅ Allow super_admin, admin, and moderator to delete
//   const canDelete = userRole === 'super_admin' || userRole === 'admin' || userRole === 'moderator';

//   // Load folders
//   const loadFolders = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API}/api/admin/media/folders`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       const folderList = data.folders || [];
//       // Only show smart-gadget related folders
//       const filteredFolders = folderList.filter(f => f.startsWith(ROOT_FOLDER) || f === ROOT_FOLDER);
//       if (!filteredFolders.includes(ROOT_FOLDER)) {
//         filteredFolders.unshift(ROOT_FOLDER);
//       }
//       setFolders(filteredFolders);
//     } catch (error) {
//       console.error('Error loading folders:', error);
//       setFolders([ROOT_FOLDER]);
//     }
//   }, [API]);

//   // Load media items
//   const loadItems = useCallback(async (reset = true) => {
//     if (loading) return;
    
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const params = new URLSearchParams();
      
//       params.set('folder', ROOT_FOLDER);
//       if (searchTerm) params.set('q', searchTerm);
//       if (!reset && nextCursor) params.set('next_cursor', nextCursor);
      
//       const response = await fetch(`${API}/api/admin/media?${params}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
//       let newItems = data.items || [];
      
//       // Filter by media type if selected
//       if (mediaType === 'image') {
//         newItems = newItems.filter(item => item.resource_type === 'image');
//       } else if (mediaType === 'video') {
//         newItems = newItems.filter(item => item.resource_type === 'video');
//       }
      
//       const images = newItems.filter(i => i.resource_type === 'image');
//       const videos = newItems.filter(i => i.resource_type === 'video');
      
//       setStats({
//         total: newItems.length,
//         images: images.length,
//         videos: videos.length,
//       });
      
//       setItems(prev => reset ? newItems : [...prev, ...newItems]);
//       setNextCursor(data.next_cursor || null);
      
//       if (reset) setSelected(new Set());
//     } catch (error) {
//       console.error('Error loading items:', error);
//       toast.error('Failed to load media');
//     } finally {
//       setLoading(false);
//     }
//   }, [API, searchTerm, nextCursor, loading, mediaType]);

//   // Initial load
//   useEffect(() => {
//     loadFolders();
//   }, [loadFolders]);

//   // Search with debounce
//   useEffect(() => {
//     clearTimeout(searchTimer.current);
//     searchTimer.current = setTimeout(() => {
//       loadItems(true);
//     }, 300);
//     return () => clearTimeout(searchTimer.current);
//   }, [searchTerm, mediaType]);

//   // Handle upload
//   const handleUpload = async (e) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length === 0) return;
    
//     setUploading(true);
//     const uploadFolder = folder || ROOT_FOLDER;
//     let successCount = 0;
    
//     for (const file of files) {
//       try {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
//         formData.append('folder', uploadFolder);
        
//         const response = await fetch(
//           `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
//           { method: 'POST', body: formData }
//         );
        
//         const data = await response.json();
//         if (data.secure_url) {
//           successCount++;
//         } else {
//           toast.error(`Failed to upload ${file.name}: ${data.error?.message || 'Unknown error'}`);
//         }
//       } catch (error) {
//         toast.error(`Error uploading ${file.name}`);
//         console.error('Upload error:', error);
//       }
//     }
    
//     if (successCount > 0) {
//       toast.success(`${successCount} file(s) uploaded successfully`);
//     }
    
//     e.target.value = '';
//     setUploading(false);
//     loadItems(true);
//   };

//   // Toggle selection
//   const toggleSelect = (id) => {
//     setSelected(prev => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };

//   // Select all / Clear selection
//   const selectAll = () => setSelected(new Set(items.map(i => i.public_id)));
//   const clearSelection = () => setSelected(new Set());

//   // ✅ Show delete confirmation modal for multiple items
//   const handleDeleteSelected = () => {
//     if (selected.size === 0) return;
    
//     setDeleteModal({
//       isOpen: true,
//       isSingle: false,
//       itemCount: selected.size,
//       itemName: '',
//       itemsToDelete: [...selected],
//       onConfirm: async () => {
//         await performDelete([...selected]);
//         setDeleteModal({ isOpen: false, isSingle: false, itemCount: 0, itemName: '', itemsToDelete: [], onConfirm: null });
//       }
//     });
//   };

//   // ✅ Show delete confirmation modal for single item
//   const handleDeleteSingle = (item, e) => {
//     e.stopPropagation();
//     const filename = item.filename || item.public_id.split('/').pop();
    
//     setDeleteModal({
//       isOpen: true,
//       isSingle: true,
//       itemCount: 1,
//       itemName: filename,
//       itemsToDelete: [item.public_id],
//       onConfirm: async () => {
//         await performDelete([item.public_id], item.resource_type);
//         setDeleteModal({ isOpen: false, isSingle: false, itemCount: 0, itemName: '', itemsToDelete: [], onConfirm: null });
//       }
//     });
//   };

//   // ✅ Perform the actual deletion
//   const performDelete = async (publicIds, resourceType = null) => {
//     setDeleting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API}/api/admin/media`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ 
//           public_ids: publicIds,
//           resource_type: resourceType 
//         })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Deleted ${data.deleted} item(s)`);
//         setItems(prev => prev.filter(i => !publicIds.includes(i.public_id)));
//         setSelected(new Set());
//         if (previewItem && publicIds.includes(previewItem.public_id)) {
//           setPreviewItem(null);
//         }
//         // Update stats
//         const remainingItems = items.filter(i => !publicIds.includes(i.public_id));
//         setStats({
//           total: remainingItems.length,
//           images: remainingItems.filter(i => i.resource_type === 'image').length,
//           videos: remainingItems.filter(i => i.resource_type === 'video').length,
//         });
//       } else {
//         toast.error('Failed to delete items');
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//       toast.error('Network error during deletion');
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // Copy URL
//   const copyUrl = (url, e) => {
//     e.stopPropagation();
//     navigator.clipboard.writeText(url).then(() => {
//       toast.success('URL copied to clipboard');
//     }).catch(() => {
//       const textArea = document.createElement('textarea');
//       textArea.value = url;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand('copy');
//       document.body.removeChild(textArea);
//       toast.success('URL copied to clipboard');
//     });
//   };

//   // Format file size
//   const formatFileSize = (bytes) => {
//     if (!bytes) return '—';
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(1024));
//     return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return '—';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <ProtectedRoute pageKey="media_library">
//     <div className="min-h-screen bg-gradient-to-br from-[#004767]/5 via-white to-[#708268]/5">
//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmationModal
//         isOpen={deleteModal.isOpen}
//         onClose={() => setDeleteModal({ isOpen: false, isSingle: false, itemCount: 0, itemName: '', itemsToDelete: [], onConfirm: null })}
//         onConfirm={deleteModal.onConfirm}
//         itemCount={deleteModal.itemCount}
//         itemName={deleteModal.itemName}
//         isSingle={deleteModal.isSingle}
//       />

//       {/* Header */}
//       <div className="bg-white border-b border-[#708268]/20 sticky top-0 z-10 shadow-lg">
//         <div className="px-4 sm:px-6 py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div className="flex items-center gap-2 sm:gap-4">
            
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
//                   <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black flex items-center gap-2">
//                     <FolderTree className="w-5 h-5 sm:w-6 sm:h-6 text-[#708268]" />
//                     Media Library
//                   </h1>
//                 </div>
//                 <p className="text-xs sm:text-sm text-black/70 mt-0.5 sm:mt-1 truncate">
//                   Manage all images and videos in smart-gadget folder
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2 flex-wrap">
//               <button
//                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                 className="p-2 text-[#708268]/70 hover:bg-[#708268]/20 rounded-lg transition-colors hover:text-[#708268]"
//                 title={viewMode === 'grid' ? 'List view' : 'Grid view'}
//               >
//                 {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
//               </button>
              
//               {/* ✅ Use canDelete instead of isAdmin */}
//               {selected.size > 0 && canDelete && (
//                 <button
//                   onClick={handleDeleteSelected}
//                   disabled={deleting}
//                   className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
//                 >
//                   {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
//                   Delete {selected.size}
//                 </button>
//               )}
              
//               <button
//                 onClick={() => loadItems(true)}
//                 disabled={loading}
//                 className="p-2 text-[#708268]/70 hover:bg-[#708268]/20 rounded-lg transition-colors hover:text-[#708268] disabled:opacity-50"
//                 title="Refresh"
//               >
//                 <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//               </button>
              
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 disabled={uploading}
//                 className="flex items-center gap-1.5 px-3 py-1.5 bg-[#708268] text-white text-xs font-semibold rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50"
//               >
//                 {uploading ? (
//                   <Loader2 className="w-3.5 h-3.5 animate-spin" />
//                 ) : (
//                   <Upload className="w-3.5 h-3.5" />
//                 )}
//                 Upload
//               </button>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*,video/*"
//                 multiple
//                 hidden
//                 onChange={handleUpload}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-4 sm:p-6">
//         {/* Stats Bar */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#708268]/20 p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-4 text-sm">
//             <span className="text-gray-500">Total: <strong className="text-[#004767]">{stats.total}</strong></span>
//             <span className="text-gray-500">Images: <strong className="text-[#708268]">{stats.images}</strong></span>
//             <span className="text-gray-500">Videos: <strong className="text-purple-600">{stats.videos}</strong></span>
//           </div>
//           <div className="flex items-center gap-2 text-xs text-gray-500">
//             <HardDrive className="w-3.5 h-3.5" />
//             <span>Folder: <strong className="text-[#708268]">{ROOT_FOLDER}</strong></span>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#708268]/20 p-4 mb-6">
//           <div className="flex flex-wrap items-center gap-3">
//             {/* Search */}
//             <div className="relative flex-1 min-w-[200px]">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="search"
//                 placeholder="Search by filename..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 text-sm border border-[#708268]/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none bg-white hover:border-[#708268]/40 transition-colors"
//               />
//             </div>

//             {/* Media Type Filter - Image/Video */}
//             <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => setMediaType('all')}
//                 className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
//                   mediaType === 'all'
//                     ? 'bg-white text-[#004767] shadow-sm'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 All
//               </button>
//               <button
//                 onClick={() => setMediaType('image')}
//                 className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
//                   mediaType === 'image'
//                     ? 'bg-white text-[#004767] shadow-sm'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <ImageIcon className="w-3.5 h-3.5" />
//                 Images
//               </button>
//               <button
//                 onClick={() => setMediaType('video')}
//                 className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
//                   mediaType === 'video'
//                     ? 'bg-white text-[#004767] shadow-sm'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <Video className="w-3.5 h-3.5" />
//                 Videos
//               </button>
//             </div>

//             {/* Folder Select */}
//             <div className="relative min-w-[150px]">
//               <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <select
//                 value={folder}
//                 onChange={(e) => setFolder(e.target.value)}
//                 className="w-full pl-10 pr-8 py-2 text-sm border border-[#708268]/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none bg-white hover:border-[#708268]/40 appearance-none cursor-pointer"
//               >
//                 {folders.map(f => (
//                   <option key={f} value={f}>{f}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//             </div>

//             {/* Selection controls */}
//             {items.length > 0 && (
//               <div className="flex items-center gap-2 ml-auto">
//                 {/* ✅ Use canDelete instead of isAdmin */}
//                 {canDelete && (
//                   <button
//                     onClick={selectAll}
//                     className="px-3 py-1.5 text-xs text-[#708268] hover:bg-[#708268]/10 rounded-lg transition-colors"
//                   >
//                     Select All
//                   </button>
//                 )}
//                 {selected.size > 0 && (
//                   <button
//                     onClick={clearSelection}
//                     className="px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     Clear ({selected.size})
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Media Grid / List */}
//         {items.length === 0 && !loading ? (
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#708268]/20 p-12 text-center">
//             <div className="flex flex-col items-center gap-3">
//               <FolderTree className="w-16 h-16 text-[#708268]/30" />
//               <h3 className="text-lg font-semibold text-gray-700">No media found</h3>
//               <p className="text-sm text-gray-500">
//                 {searchTerm 
//                   ? `No results for "${searchTerm}"` 
//                   : 'Upload your first image or video to get started'}
//               </p>
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="mt-3 px-4 py-2 bg-[#708268] text-[#004767] font-semibold rounded-lg hover:bg-[#0891B2] transition-colors flex items-center gap-2"
//               >
//                 <Upload className="w-4 h-4" />
//                 Upload Media
//               </button>
//             </div>
//           </div>
//         ) : viewMode === 'grid' ? (
//           /* Grid View */
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
//             {items.map((item) => {
//               const isSelected = selected.has(item.public_id);
//               const isHovered = hoverId === item.public_id;
//               const isVideo = item.resource_type === 'video';
//               const filename = item.filename || item.public_id.split('/').pop();
              
//               return (
//                 <div
//                   key={item.public_id}
//                   className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-white shadow-sm ${
//                     isSelected
//                       ? 'border-[#708268] ring-2 ring-[#708268]/50 shadow-lg'
//                       : 'border-[#708268]/20 hover:border-[#708268]/50 hover:shadow-md'
//                   }`}
//                   // ✅ Use canDelete instead of isAdmin
//                   onClick={() => canDelete && toggleSelect(item.public_id)}
//                   onMouseEnter={() => setHoverId(item.public_id)}
//                   onMouseLeave={() => setHoverId(null)}
//                 >
//                   {isVideo ? (
//                     <video
//                       src={item.url}
//                       className="w-full h-full object-cover bg-gray-100"
//                       muted
//                       playsInline
//                     />
//                   ) : (
//                     <img
//                       src={item.url}
//                       alt={filename}
//                       className="w-full h-full object-cover bg-gray-100"
//                       loading="lazy"
//                       onError={(e) => {
//                         e.currentTarget.src = '/placeholder-image.jpg';
//                       }}
//                     />
//                   )}

//                   {/* Resource type badge */}
//                   <div className="absolute top-2 left-2">
//                     {isVideo ? (
//                       <span className="px-1.5 py-0.5 bg-black/70 text-white text-[10px] rounded flex items-center gap-0.5">
//                         <Video className="w-3 h-3" /> Video
//                       </span>
//                     ) : (
//                       <span className="px-1.5 py-0.5 bg-black/70 text-white text-[10px] rounded flex items-center gap-0.5">
//                         <ImageIcon className="w-3 h-3" /> Image
//                       </span>
//                     )}
//                   </div>

//                   {/* Selection indicator */}
//                   {canDelete && (
//                     <div className="absolute top-2 right-2">
//                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                         isSelected
//                           ? 'bg-[#708268] border-[#708268] text-white'
//                           : 'border-white/70 bg-black/30'
//                       }`}>
//                         {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
//                       </div>
//                     </div>
//                   )}

//                   {/* Hover overlay */}
//                   {(isHovered || isSelected) && (
//                     <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-2">
//                       <div className="flex justify-end gap-1">
//                         <button
//                           title="Preview"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setPreviewItem(item);
//                           }}
//                           className="bg-white/90 hover:bg-white rounded-md w-7 h-7 flex items-center justify-center text-gray-700 transition-colors"
//                         >
//                           <Eye className="w-3.5 h-3.5" />
//                         </button>
//                         <button
//                           title="Copy URL"
//                           onClick={(e) => copyUrl(item.url, e)}
//                           className="bg-white/90 hover:bg-white rounded-md w-7 h-7 flex items-center justify-center text-gray-700 transition-colors"
//                         >
//                           <Copy className="w-3.5 h-3.5" />
//                         </button>
//                         {/* ✅ Use canDelete instead of isAdmin */}
//                         {canDelete && (
//                           <button
//                             title="Delete"
//                             onClick={(e) => handleDeleteSingle(item, e)}
//                             className="bg-red-500 hover:bg-red-600 rounded-md w-7 h-7 flex items-center justify-center text-white transition-colors"
//                           >
//                             <Trash2 className="w-3.5 h-3.5" />
//                           </button>
//                         )}
//                       </div>
//                       <p className="text-white text-[10px] leading-tight truncate bg-black/50 px-1.5 py-0.5 rounded">
//                         {filename}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           /* List View */
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#708268]/20 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gradient-to-r from-[#708268]/5 to-[#004767]/5">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
//                     <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-[#708268]/10">
//                   {items.map((item) => {
//                     const isSelected = selected.has(item.public_id);
//                     const filename = item.filename || item.public_id.split('/').pop();
//                     const isVideo = item.resource_type === 'video';
                    
//                     return (
//                       <tr 
//                         key={item.public_id}
//                         className={`hover:bg-[#708268]/5 transition-colors ${isSelected ? 'bg-[#708268]/10' : ''}`}
//                         // ✅ Use canDelete instead of isAdmin
//                         onClick={() => canDelete && toggleSelect(item.public_id)}
//                       >
//                         <td className="px-4 py-3">
//                           <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#708268]/20 bg-gray-100 flex-shrink-0">
//                             {isVideo ? (
//                               <video src={item.url} className="w-full h-full object-cover" muted playsInline />
//                             ) : (
//                               <img src={item.url} alt={filename} className="w-full h-full object-cover" loading="lazy" />
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-2">
//                             {canDelete && (
//                               <div className={`w-4 h-4 rounded border ${isSelected ? 'bg-[#708268] border-[#708268]' : 'border-gray-300'}`}>
//                                 {isSelected && <CheckCircle className="w-3 h-3 text-white m-0.5" />}
//                               </div>
//                             )}
//                             <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]" title={filename}>
//                               {filename}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <span className={`text-xs font-medium px-2 py-1 rounded-full ${
//                             isVideo 
//                               ? 'bg-purple-100 text-purple-700 border border-purple-200' 
//                               : 'bg-blue-100 text-pink-700 border border-blue-200'
//                           }`}>
//                             {isVideo ? 'Video' : 'Image'}
//                           </span>
//                           {item.format && (
//                             <span className="text-xs text-gray-400 ml-1">.{item.format}</span>
//                           )}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-500">
//                           {formatFileSize(item.bytes)}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-500">
//                           {formatDate(item.created_at)}
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center justify-end gap-1">
//                             <button
//                               title="Preview"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setPreviewItem(item);
//                               }}
//                               className="p-1.5 text-gray-400 hover:text-[#708268] hover:bg-[#708268]/10 rounded-lg transition-colors"
//                             >
//                               <Eye className="w-4 h-4" />
//                             </button>
//                             <button
//                               title="Copy URL"
//                               onClick={(e) => copyUrl(item.url, e)}
//                               className="p-1.5 text-gray-400 hover:text-[#708268] hover:bg-[#708268]/10 rounded-lg transition-colors"
//                             >
//                               <Copy className="w-4 h-4" />
//                             </button>
//                             {/* ✅ Use canDelete instead of isAdmin */}
//                             {canDelete && (
//                               <button
//                                 title="Delete"
//                                 onClick={(e) => handleDeleteSingle(item, e)}
//                                 className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Load More */}
//         {nextCursor && (
//           <div className="mt-6 flex justify-center">
//             <button
//               onClick={() => loadItems(false)}
//               disabled={loading}
//               className="px-6 py-2.5 bg-white border border-[#708268]/20 text-[#004767] rounded-xl text-sm font-medium hover:bg-[#708268]/10 transition-colors disabled:opacity-50 shadow-sm"
//             >
//               {loading ? (
//                 <span className="flex items-center gap-2">
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Loading...
//                 </span>
//               ) : (
//                 'Load More'
//               )}
//             </button>
//           </div>
//         )}

//         {/* Preview Modal */}
//         {previewItem && (
//           <div
//             className="fixed inset-0 z-[9998] bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
//             onClick={() => setPreviewItem(null)}
//           >
//             <div
//               className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col border border-[#708268]/20"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between px-6 py-4 border-b border-[#708268]/20 bg-gradient-to-r from-[#708268]/5 to-[#004767]/5">
//                 <div className="flex items-center gap-3 min-w-0">
//                   <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#708268]/20 flex-shrink-0">
//                     {previewItem.resource_type === 'video' ? (
//                       <video src={previewItem.url} className="w-full h-full object-cover" muted />
//                     ) : (
//                       <img src={previewItem.url} alt="" className="w-full h-full object-cover" />
//                     )}
//                   </div>
//                   <div className="min-w-0">
//                     <h3 className="font-semibold text-gray-800 text-sm truncate">
//                       {previewItem.filename || previewItem.public_id.split('/').pop()}
//                     </h3>
//                     <p className="text-xs text-gray-500">
//                       {previewItem.resource_type} • {formatFileSize(previewItem.bytes)}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setPreviewItem(null)}
//                   className="p-2 hover:bg-[#708268]/10 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Content */}
//               <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-4 min-h-[300px]">
//                 {previewItem.resource_type === 'video' ? (
//                   <video
//                     src={previewItem.url}
//                     controls
//                     className="w-full max-h-[60vh] object-contain rounded-lg"
//                     autoPlay
//                   />
//                 ) : (
//                   <img
//                     src={previewItem.url}
//                     alt={previewItem.public_id}
//                     className="w-full max-h-[60vh] object-contain rounded-lg"
//                   />
//                 )}
//               </div>

//               {/* Footer */}
//               <div className="px-6 py-4 border-t border-[#708268]/20 bg-gradient-to-r from-[#708268]/5 to-[#004767]/5 flex flex-wrap items-center justify-between gap-3">
//                 <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
//                   <span>
//                     <span className="font-medium text-gray-700">Type:</span>{' '}
//                     {previewItem.resource_type === 'video' ? 'Video' : 'Image'}
//                   </span>
//                   {previewItem.format && (
//                     <span>
//                       <span className="font-medium text-gray-700">Format:</span>{' '}
//                       {previewItem.format.toUpperCase()}
//                     </span>
//                   )}
//                   {previewItem.width && previewItem.height && (
//                     <span>
//                       <span className="font-medium text-gray-700">Dimensions:</span>{' '}
//                       {previewItem.width} × {previewItem.height}
//                     </span>
//                   )}
//                   <span>
//                     <span className="font-medium text-gray-700">Size:</span>{' '}
//                     {formatFileSize(previewItem.bytes)}
//                   </span>
//                   <span>
//                     <span className="font-medium text-gray-700">Uploaded:</span>{' '}
//                     {formatDate(previewItem.created_at)}
//                   </span>
//                   {previewItem.folder && (
//                     <span>
//                       <span className="font-medium text-gray-700">Folder:</span>{' '}
//                       <span className="text-[#708268]">{previewItem.folder}</span>
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={(e) => copyUrl(previewItem.url, e)}
//                     className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300 transition-colors flex items-center gap-1.5"
//                   >
//                     <Copy className="w-3.5 h-3.5" />
//                     Copy URL
//                   </button>
//                   {/* ✅ Use canDelete instead of isAdmin */}
//                   {canDelete && (
//                     <button
//                       onClick={(e) => handleDeleteSingle(previewItem, e)}
//                       className="px-4 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors flex items-center gap-1.5"
//                     >
//                       <Trash2 className="w-3.5 h-3.5" />
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//     </ProtectedRoute>
//   );
// }

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Upload, 
  Trash2, 
  Copy, 
  X, 
  Loader2, 
  FolderOpen, 
  FolderTree,
  RefreshCw,
  Image as ImageIcon,
  Video,
  CheckCircle,
  AlertCircle,
  Grid3x3,
  List,
  ChevronDown,
  ChevronRight,
  FileText,
  Calendar,
  HardDrive,
  Eye,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const ROOT_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'smart-gadget';

// Helper to get user role
const getUserRole = () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || '';
    }
  } catch (error) {
    console.error('Error getting user role:', error);
  }
  return '';
};

// ============================================================
// DELETE CONFIRMATION MODAL
// ============================================================
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemCount, itemName, isSingle = false }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-red-100">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">
            {isSingle ? 'Delete Item' : `Delete ${itemCount} Items`}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-2">
          {isSingle ? (
            <>Are you sure you want to delete <span className="font-semibold text-[#708268]">"{itemName}"</span>?</>
          ) : (
            <>Are you sure you want to delete <span className="font-semibold text-[#708268]">{itemCount}</span> items?</>
          )}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone. The media will be permanently removed from Cloudinary.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-200/50 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {isSingle ? 'Delete' : `Delete ${itemCount} Items`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MediaLibrary() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  const [items, setItems] = useState([]);
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState(ROOT_FOLDER);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [deleting, setDeleting] = useState(false);
  const [hoverId, setHoverId] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [stats, setStats] = useState({ total: 0, images: 0, videos: 0 });
  const [mediaType, setMediaType] = useState('all');
  
  const searchTimer = useRef(null);
  const fileInputRef = useRef(null);
  const userRole = getUserRole();
  const canDelete = userRole === 'super_admin' || userRole === 'admin' || userRole === 'moderator';

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    isSingle: false,
    itemCount: 0,
    itemName: '',
    itemsToDelete: [],
    onConfirm: null
  });

  // Load folders
  const loadFolders = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API}/api/admin/media/folders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      const folderList = data.folders || [];
      const filteredFolders = folderList.filter(f => f.startsWith(ROOT_FOLDER) || f === ROOT_FOLDER);
      if (!filteredFolders.includes(ROOT_FOLDER)) {
        filteredFolders.unshift(ROOT_FOLDER);
      }
      setFolders(filteredFolders);
    } catch (error) {
      console.error('Error loading folders:', error);
      setFolders([ROOT_FOLDER]);
    }
  }, [API]);

  // Load media items - ALL at once (no pagination)
  const loadItems = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      
      params.set('folder', ROOT_FOLDER);
      if (searchTerm) params.set('q', searchTerm);
      
      console.log('📡 Fetching ALL media with params:', params.toString());
      
      const response = await fetch(`${API}/api/admin/media?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      console.log('📥 Media response:', { itemsCount: data.items?.length, total: data.total });
      
      let newItems = data.items || [];
      
      // Filter by media type if selected
      if (mediaType === 'image') {
        newItems = newItems.filter(item => item.resource_type === 'image');
      } else if (mediaType === 'video') {
        newItems = newItems.filter(item => item.resource_type === 'video');
      }
      
      const images = newItems.filter(i => i.resource_type === 'image');
      const videos = newItems.filter(i => i.resource_type === 'video');
      
      setStats({
        total: newItems.length,
        images: images.length,
        videos: videos.length,
      });
      
      setItems(newItems);
      setSelected(new Set());
    } catch (error) {
      console.error('Error loading items:', error);
      toast.error('Failed to load media');
    } finally {
      setLoading(false);
    }
  }, [API, searchTerm, mediaType, loading]);

  // Initial load
  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  // Search with debounce
  useEffect(() => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      loadItems();
    }, 300);
    return () => clearTimeout(searchTimer.current);
  }, [searchTerm, mediaType]);

  // Handle upload
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setUploading(true);
    const uploadFolder = folder || ROOT_FOLDER;
    let successCount = 0;
    
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
        formData.append('folder', uploadFolder);
        
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          { method: 'POST', body: formData }
        );
        
        const data = await response.json();
        if (data.secure_url) {
          successCount++;
        } else {
          toast.error(`Failed to upload ${file.name}: ${data.error?.message || 'Unknown error'}`);
        }
      } catch (error) {
        toast.error(`Error uploading ${file.name}`);
        console.error('Upload error:', error);
      }
    }
    
    if (successCount > 0) {
      toast.success(`${successCount} file(s) uploaded successfully`);
    }
    
    e.target.value = '';
    setUploading(false);
    loadItems();
  };

  // Toggle selection
  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Select all / Clear selection
  const selectAll = () => setSelected(new Set(items.map(i => i.public_id)));
  const clearSelection = () => setSelected(new Set());

  // Show delete confirmation modal for multiple items
  const handleDeleteSelected = () => {
    if (selected.size === 0) return;
    
    setDeleteModal({
      isOpen: true,
      isSingle: false,
      itemCount: selected.size,
      itemName: '',
      itemsToDelete: [...selected],
      onConfirm: async () => {
        await performDelete([...selected]);
        setDeleteModal({ isOpen: false, isSingle: false, itemCount: 0, itemName: '', itemsToDelete: [], onConfirm: null });
      }
    });
  };

  // Show delete confirmation modal for single item
  const handleDeleteSingle = (item, e) => {
    e.stopPropagation();
    const filename = item.filename || item.public_id.split('/').pop();
    
    setDeleteModal({
      isOpen: true,
      isSingle: true,
      itemCount: 1,
      itemName: filename,
      itemsToDelete: [item.public_id],
      onConfirm: async () => {
        await performDelete([item.public_id], item.resource_type);
        setDeleteModal({ isOpen: false, isSingle: false, itemCount: 0, itemName: '', itemsToDelete: [], onConfirm: null });
      }
    });
  };

  // Perform the actual deletion
  const performDelete = async (publicIds, resourceType = null) => {
    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API}/api/admin/media`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          public_ids: publicIds,
          resource_type: resourceType 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Deleted ${data.deleted} item(s)`);
        setItems(prev => prev.filter(i => !publicIds.includes(i.public_id)));
        setSelected(new Set());
        if (previewItem && publicIds.includes(previewItem.public_id)) {
          setPreviewItem(null);
        }
        // Update stats
        const remainingItems = items.filter(i => !publicIds.includes(i.public_id));
        setStats({
          total: remainingItems.length,
          images: remainingItems.filter(i => i.resource_type === 'image').length,
          videos: remainingItems.filter(i => i.resource_type === 'video').length,
        });
      } else {
        toast.error('Failed to delete items');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Network error during deletion');
    } finally {
      setDeleting(false);
    }
  };

  // Copy URL
  const copyUrl = (url, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      toast.success('URL copied to clipboard');
    }).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('URL copied to clipboard');
    });
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '—';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ProtectedRoute pageKey="media_library">
    <div className="min-h-screen bg-gradient-to-br from-[#004767]/5 via-white to-[#708268]/5">
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, isSingle: false, itemCount: 0, itemName: '', itemsToDelete: [], onConfirm: null })}
        onConfirm={deleteModal.onConfirm}
        itemCount={deleteModal.itemCount}
        itemName={deleteModal.itemName}
        isSingle={deleteModal.isSingle}
      />

      {/* Header */}
      <div className="bg-white border-b border-[#708268]/20 sticky top-0 z-10 shadow-lg">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black flex items-center gap-2">
                    <FolderTree className="w-5 h-5 sm:w-6 sm:h-6 text-[#708268]" />
                    Media Library
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-black/70 mt-0.5 sm:mt-1 truncate">
                  Manage all images and videos in smart-gadget folder
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 text-[#708268]/70 hover:bg-[#708268]/20 rounded-lg transition-colors hover:text-[#708268]"
                title={viewMode === 'grid' ? 'List view' : 'Grid view'}
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
              </button>
              
              {selected.size > 0 && canDelete && (
                <button
                  onClick={handleDeleteSelected}
                  disabled={deleting}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  Delete {selected.size}
                </button>
              )}
              
              <button
                onClick={loadItems}
                disabled={loading}
                className="p-2 text-[#708268]/70 hover:bg-[#708268]/20 rounded-lg transition-colors hover:text-[#708268] disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#708268] text-white text-xs font-semibold rounded-lg hover:bg-[#404a3c] transition-colors disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                Upload
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                hidden
                onChange={handleUpload}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        {/* Stats Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#708268]/20 p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">Total: <strong className="text-[#004767]">{stats.total}</strong></span>
            <span className="text-gray-500">Images: <strong className="text-[#708268]">{stats.images}</strong></span>
            <span className="text-gray-500">Videos: <strong className="text-purple-600">{stats.videos}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Folder: <strong className="text-[#708268]">{ROOT_FOLDER}</strong></span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#708268]/20 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search by filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-[#708268]/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none bg-white hover:border-[#708268]/40 transition-colors"
              />
            </div>

            {/* Media Type Filter */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMediaType('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  mediaType === 'all'
                    ? 'bg-white text-[#004767] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setMediaType('image')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
                  mediaType === 'image'
                    ? 'bg-white text-[#004767] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Images
              </button>
              <button
                onClick={() => setMediaType('video')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
                  mediaType === 'video'
                    ? 'bg-white text-[#004767] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                Videos
              </button>
            </div>

            {/* Folder Select */}
            <div className="relative min-w-[150px]">
              <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-sm border border-[#708268]/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none bg-white hover:border-[#708268]/40 appearance-none cursor-pointer"
              >
                {folders.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Selection controls */}
            {items.length > 0 && (
              <div className="flex items-center gap-2 ml-auto">
                {canDelete && (
                  <button
                    onClick={selectAll}
                    className="px-3 py-1.5 text-xs text-[#708268] hover:bg-[#708268]/10 rounded-lg transition-colors"
                  >
                    Select All
                  </button>
                )}
                {selected.size > 0 && (
                  <button
                    onClick={clearSelection}
                    className="px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Clear ({selected.size})
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Media Grid / List */}
        {items.length === 0 && !loading ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#708268]/20 p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <FolderTree className="w-16 h-16 text-[#708268]/30" />
              <h3 className="text-lg font-semibold text-gray-700">No media found</h3>
              <p className="text-sm text-gray-500">
                {searchTerm 
                  ? `No results for "${searchTerm}"` 
                  : 'Upload your first image or video to get started'}
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 px-4 py-2 bg-[#708268] text-[#004767] font-semibold rounded-lg hover:bg-[#0891B2] transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Media
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {items.map((item) => {
              const isSelected = selected.has(item.public_id);
              const isHovered = hoverId === item.public_id;
              const isVideo = item.resource_type === 'video';
              const filename = item.filename || item.public_id.split('/').pop();
              
              // Create a unique key using public_id + created_at
              const uniqueKey = `${item.public_id}_${item.created_at || Date.now()}`;
              
              return (
                <div
                  key={uniqueKey}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-white shadow-sm ${
                    isSelected
                      ? 'border-[#708268] ring-2 ring-[#708268]/50 shadow-lg'
                      : 'border-[#708268]/20 hover:border-[#708268]/50 hover:shadow-md'
                  }`}
                  onClick={() => canDelete && toggleSelect(item.public_id)}
                  onMouseEnter={() => setHoverId(item.public_id)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  {isVideo ? (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover bg-gray-100"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={filename}
                      className="w-full h-full object-cover bg-gray-100"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                  )}

                  {/* Resource type badge */}
                  <div className="absolute top-2 left-2">
                    {isVideo ? (
                      <span className="px-1.5 py-0.5 bg-black/70 text-white text-[10px] rounded flex items-center gap-0.5">
                        <Video className="w-3 h-3" /> Video
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-black/70 text-white text-[10px] rounded flex items-center gap-0.5">
                        <ImageIcon className="w-3 h-3" /> Image
                      </span>
                    )}
                  </div>

                  {/* Selection indicator */}
                  {canDelete && (
                    <div className="absolute top-2 right-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#708268] border-[#708268] text-white'
                          : 'border-white/70 bg-black/30'
                      }`}>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  {(isHovered || isSelected) && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-2">
                      <div className="flex justify-end gap-1">
                        <button
                          title="Preview"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewItem(item);
                          }}
                          className="bg-white/90 hover:bg-white rounded-md w-7 h-7 flex items-center justify-center text-gray-700 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Copy URL"
                          onClick={(e) => copyUrl(item.url, e)}
                          className="bg-white/90 hover:bg-white rounded-md w-7 h-7 flex items-center justify-center text-gray-700 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {canDelete && (
                          <button
                            title="Delete"
                            onClick={(e) => handleDeleteSingle(item, e)}
                            className="bg-red-500 hover:bg-red-600 rounded-md w-7 h-7 flex items-center justify-center text-white transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <p className="text-white text-[10px] leading-tight truncate bg-black/50 px-1.5 py-0.5 rounded">
                        {filename}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#708268]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#708268]/5 to-[#004767]/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#708268]/10">
                  {items.map((item) => {
                    const isSelected = selected.has(item.public_id);
                    const filename = item.filename || item.public_id.split('/').pop();
                    const isVideo = item.resource_type === 'video';
                    
                    const uniqueKey = `${item.public_id}_${item.created_at || Date.now()}`;
                    
                    return (
                      <tr 
                        key={uniqueKey}
                        className={`hover:bg-[#708268]/5 transition-colors ${isSelected ? 'bg-[#708268]/10' : ''}`}
                        onClick={() => canDelete && toggleSelect(item.public_id)}
                      >
                        <td className="px-4 py-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#708268]/20 bg-gray-100 flex-shrink-0">
                            {isVideo ? (
                              <video src={item.url} className="w-full h-full object-cover" muted playsInline />
                            ) : (
                              <img src={item.url} alt={filename} className="w-full h-full object-cover" loading="lazy" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {canDelete && (
                              <div className={`w-4 h-4 rounded border ${isSelected ? 'bg-[#708268] border-[#708268]' : 'border-gray-300'}`}>
                                {isSelected && <CheckCircle className="w-3 h-3 text-white m-0.5" />}
                              </div>
                            )}
                            <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]" title={filename}>
                              {filename}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            isVideo 
                              ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                              : 'bg-blue-100 text-pink-700 border border-blue-200'
                          }`}>
                            {isVideo ? 'Video' : 'Image'}
                          </span>
                          {item.format && (
                            <span className="text-xs text-gray-400 ml-1">.{item.format}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {formatFileSize(item.bytes)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {formatDate(item.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              title="Preview"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewItem(item);
                              }}
                              className="p-1.5 text-gray-400 hover:text-[#708268] hover:bg-[#708268]/10 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              title="Copy URL"
                              onClick={(e) => copyUrl(item.url, e)}
                              className="p-1.5 text-gray-400 hover:text-[#708268] hover:bg-[#708268]/10 rounded-lg transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            {canDelete && (
                              <button
                                title="Delete"
                                onClick={(e) => handleDeleteSingle(item, e)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewItem && (
          <div
            className="fixed inset-0 z-[9998] bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setPreviewItem(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col border border-[#708268]/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#708268]/20 bg-gradient-to-r from-[#708268]/5 to-[#004767]/5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#708268]/20 flex-shrink-0">
                    {previewItem.resource_type === 'video' ? (
                      <video src={previewItem.url} className="w-full h-full object-cover" muted />
                    ) : (
                      <img src={previewItem.url} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">
                      {previewItem.filename || previewItem.public_id.split('/').pop()}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {previewItem.resource_type} • {formatFileSize(previewItem.bytes)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-2 hover:bg-[#708268]/10 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-4 min-h-[300px]">
                {previewItem.resource_type === 'video' ? (
                  <video
                    src={previewItem.url}
                    controls
                    className="w-full max-h-[60vh] object-contain rounded-lg"
                    autoPlay
                  />
                ) : (
                  <img
                    src={previewItem.url}
                    alt={previewItem.public_id}
                    className="w-full max-h-[60vh] object-contain rounded-lg"
                  />
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-[#708268]/20 bg-gradient-to-r from-[#708268]/5 to-[#004767]/5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span>
                    <span className="font-medium text-gray-700">Type:</span>{' '}
                    {previewItem.resource_type === 'video' ? 'Video' : 'Image'}
                  </span>
                  {previewItem.format && (
                    <span>
                      <span className="font-medium text-gray-700">Format:</span>{' '}
                      {previewItem.format.toUpperCase()}
                    </span>
                  )}
                  {previewItem.width && previewItem.height && (
                    <span>
                      <span className="font-medium text-gray-700">Dimensions:</span>{' '}
                      {previewItem.width} × {previewItem.height}
                    </span>
                  )}
                  <span>
                    <span className="font-medium text-gray-700">Size:</span>{' '}
                    {formatFileSize(previewItem.bytes)}
                  </span>
                  <span>
                    <span className="font-medium text-gray-700">Uploaded:</span>{' '}
                    {formatDate(previewItem.created_at)}
                  </span>
                  {previewItem.folder && (
                    <span>
                      <span className="font-medium text-gray-700">Folder:</span>{' '}
                      <span className="text-[#708268]">{previewItem.folder}</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => copyUrl(previewItem.url, e)}
                    className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300 transition-colors flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy URL
                  </button>
                  {canDelete && (
                    <button
                      onClick={(e) => handleDeleteSingle(previewItem, e)}
                      className="px-4 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}