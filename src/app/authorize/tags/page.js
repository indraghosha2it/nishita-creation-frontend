
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   Plus, 
//   X, 
//   Trash2,
//   Edit,
//   Check,
//   RefreshCw,
//   Loader2,
//   Tag,
//   AlertCircle,
//   ArrowLeft,
//   Upload,
//   Image as ImageIcon
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ============================================
// // API URL CONFIGURATION
// // ============================================

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// // ============================================
// // CLOUDINARY UPLOAD FUNCTION
// // ============================================

// const uploadToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
  
//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );
    
//     const data = await response.json();
//     if (data.secure_url) {
//       return {
//         url: data.secure_url,
//         publicId: data.public_id,
//       };
//     } else {
//       throw new Error(data.error?.message || 'Upload failed');
//     }
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

// // ============================================
// // IMAGE UPLOAD COMPONENT
// // ============================================

// const ImageUploadField = ({ 
//   imageUrl, 
//   onImageChange, 
//   onImageRemove, 
//   label, 
//   required = false,
//   helpText = ''
// }) => {
//   const fileInputRef = useRef(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [preview, setPreview] = useState(imageUrl || '');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setPreview(imageUrl || '');
//   }, [imageUrl]);

//   const validateImage = (file) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       return { valid: false, message: 'Only JPG, PNG, and WebP formats are allowed.' };
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       return { valid: false, message: 'Image size must be less than 5MB.' };
//     }
//     return { valid: true };
//   };

//   const handleFileSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validation = validateImage(file);
//     if (!validation.valid) {
//       setError(validation.message);
//       toast.error(validation.message);
//       return;
//     }

//     setError('');
//     setIsUploading(true);
    
//     try {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setPreview(event.target.result);
//       };
//       reader.readAsDataURL(file);
      
//       const result = await uploadToCloudinary(file);
      
//       if (result && result.url) {
//         onImageChange(result.url);
//         toast.success('Image uploaded successfully!');
//       } else {
//         throw new Error('Upload failed');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       setError('Failed to upload image');
//       toast.error('Failed to upload image');
//       setPreview('');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleRemove = () => {
//     setPreview('');
//     onImageRemove();
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
      
//       {preview ? (
//         <div className="relative inline-block">
//           <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-[#87997F]/30 bg-gray-100">
//             <img 
//               src={preview} 
//               alt={label} 
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = '';
//                 e.target.alt = 'No image';
//               }}
//             />
//           </div>
//           {isUploading && (
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
//               <Loader2 className="w-6 h-6 text-white animate-spin" />
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={handleRemove}
//             className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//           >
//             <X className="w-3 h-3" />
//           </button>
//         </div>
//       ) : (
//         <div className="flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             disabled={isUploading}
//             className="flex items-center gap-2 px-4 py-2 bg-[#72846A] text-white rounded-lg hover:bg-[#354030] transition-colors text-sm disabled:opacity-50"
//           >
//             {isUploading ? (
//               <Loader2 className="w-4 h-4 animate-spin" />
//             ) : (
//               <Upload className="w-4 h-4" />
//             )}
//             {isUploading ? 'Uploading...' : 'Upload Image'}
//           </button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/jpeg,image/jpg,image/png,image/webp"
//             className="hidden"
//             onChange={handleFileSelect}
//             disabled={isUploading}
//           />
//           <span className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</span>
//         </div>
//       )}
//       {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
//       {error && <p className="text-xs text-red-500">{error}</p>}
//     </div>
//   );
// };

// // ============================================
// // DELETE CONFIRMATION MODAL
// // ============================================
// const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, tagName, isDeleting }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-red-100">
//         <div className="flex items-center gap-3 text-red-600 mb-4">
//           <div className="p-2 bg-red-100 rounded-full">
//             <AlertCircle className="w-6 h-6" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900">Delete Tag</h3>
//         </div>
        
//         <p className="text-gray-600 mb-2">
//           Are you sure you want to delete <span className="font-semibold text-[#72846A]">"{tagName}"</span>?
//         </p>
//         <p className="text-sm text-gray-500 mb-6">
//           This action cannot be undone. The tag will be permanently removed.
//         </p>

//         <div className="flex items-center justify-end gap-3">
//           <button
//             onClick={onClose}
//             disabled={isDeleting}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={isDeleting}
//             className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-200/50 flex items-center gap-2 disabled:opacity-50"
//           >
//             {isDeleting ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Deleting...
//               </>
//             ) : (
//               <>
//                 <Trash2 className="w-4 h-4" />
//                 Delete Tag
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function TagsManagementPage() {
//   const router = useRouter();
//   const [tags, setTags] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingTag, setEditingTag] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [userRole, setUserRole] = useState('');
  
//   // Delete Modal State
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [tagToDelete, setTagToDelete] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);
  
//   // Form state
//   const [tagName, setTagName] = useState('');
//   const [tagImage, setTagImage] = useState('');

//   // Get user role on mount
//   useEffect(() => {
//     const getUserRole = () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           const payload = JSON.parse(atob(token.split('.')[1]));
//           setUserRole(payload.role || '');
//         }
//       } catch (error) {
//         console.error('Error getting user role:', error);
//       }
//     };
//     getUserRole();
//   }, []);

//   // Check if user can delete (Super Admin and Admin only)
//   const canDelete = userRole === 'super_admin' || userRole === 'admin';

//   // ✅ UPDATED: fetchTags with no-store cache
//   const fetchTags = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_URL}/api/tags`, {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Cache-Control': 'no-cache'
//         },
//         cache: 'no-store' // ✅ ADDED: Prevent browser caching
//       });
//       const data = await response.json();
//       if (data.success) {
//         setTags(data.data);
//       }
//     } catch (error) {
//       toast.error('Failed to fetch tags');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTags();
//   }, []);

//   const resetForm = () => {
//     setTagName('');
//     setTagImage('');
//     setEditingTag(null);
//   };

//   // ✅ UPDATED: handleCreateTag with API_URL
//   const handleCreateTag = async () => {
//     if (!tagName.trim()) {
//       toast.error('Tag name is required');
//       return;
//     }

//     if (!tagImage) {
//       toast.error('Tag image is required');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_URL}/api/tags`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: tagName.trim(),
//           image: tagImage
//         })
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Tag created successfully');
//         setShowCreateModal(false);
//         resetForm();
//         fetchTags();
//       } else {
//         toast.error(data.error || 'Failed to create tag');
//       }
//     } catch (error) {
//       toast.error('Failed to create tag');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditClick = (tag) => {
//     setEditingTag(tag);
//     setTagName(tag.name);
//     setTagImage(tag.image || '');
//     setShowEditModal(true);
//   };

//   // ✅ UPDATED: handleUpdateTag with API_URL
//   const handleUpdateTag = async () => {
//     if (!tagName.trim()) {
//       toast.error('Tag name is required');
//       return;
//     }

//     if (!tagImage) {
//       toast.error('Tag image is required');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_URL}/api/tags/${editingTag._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: tagName.trim(),
//           image: tagImage
//         })
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Tag updated successfully');
//         setShowEditModal(false);
//         resetForm();
//         fetchTags();
//       } else {
//         toast.error(data.error || 'Failed to update tag');
//       }
//     } catch (error) {
//       toast.error('Failed to update tag');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ✅ UPDATED: handleToggleStatus with API_URL
//   const handleToggleStatus = async (tagId, currentStatus) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_URL}/api/tags/${tagId}/toggle`, {
//         method: 'PUT',
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Cache-Control': 'no-cache'
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         toast.success(`Tag ${data.data.isActive ? 'activated' : 'deactivated'}`);
//         fetchTags();
//       }
//     } catch (error) {
//       toast.error('Failed to toggle tag status');
//     }
//   };

//   const handleDeleteClick = (tag) => {
//     setTagToDelete(tag);
//     setShowDeleteModal(true);
//   };

//   // ✅ UPDATED: handleDeleteConfirm with API_URL
//   const handleDeleteConfirm = async () => {
//     if (!tagToDelete) return;
    
//     setIsDeleting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_URL}/api/tags/${tagToDelete._id}`, {
//         method: 'DELETE',
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Cache-Control': 'no-cache'
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         toast.success('Tag deleted successfully');
//         setShowDeleteModal(false);
//         setTagToDelete(null);
//         fetchTags();
//       } else {
//         toast.error(data.error || 'Failed to delete tag');
//       }
//     } catch (error) {
//       toast.error('Failed to delete tag');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <ProtectedRoute pageKey="manage_tags">
//       <div className="min-h-screen bg-white">
//         {/* Delete Confirmation Modal */}
//         <DeleteConfirmModal
//           isOpen={showDeleteModal}
//           onClose={() => {
//             setShowDeleteModal(false);
//             setTagToDelete(null);
//           }}
//           onConfirm={handleDeleteConfirm}
//           tagName={tagToDelete?.name || ''}
//           isDeleting={isDeleting}
//         />

//         {/* Header - Beauty Theme */}
//         <div className="bg-white border-b border-pink-200 shadow-lg sticky top-0 z-10">
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <a href="/authorize/dashboard" className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5 text-black/80 hover:text-[#72846A]" />
//                 </a>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <Tag className="w-6 h-6 text-[#87997F]" />
//                     <h1 className="text-xl font-bold text-black">Product Tags</h1>
//                   </div>
//                   <p className="text-sm text-black/70 mt-1">Manage product tags with images for your store</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-[#72846A] text-white rounded-lg hover:bg-[#354030] transition-colors font-semibold shadow-md hover:shadow-lg"
//               >
//                 <Plus className="w-4 h-4" />
//                 Create Tag
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Refresh Button */}
//           <div className="flex justify-end mb-4">
//             <button
//               onClick={fetchTags}
//               className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-[#72846A]"
//             >
//               <RefreshCw className="w-4 h-4" />
//               Refresh
//             </button>
//           </div>

//           {loading ? (
//             <div className="flex justify-center py-12">
//               <Loader2 className="w-8 h-8 animate-spin text-[#72846A]" />
//             </div>
//           ) : tags.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
//               <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//               <p className="text-gray-500">No tags created yet</p>
//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 className="mt-3 text-[#72846A] hover:text-[#354030] font-medium"
//               >
//                 Create your first tag
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {tags.map(tag => (
//                 <div key={tag._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
//                   <div className="flex items-center gap-3">
//                     {/* Tag Image */}
//                     <div className="w-12 h-12 rounded-lg overflow-hidden bg-pink-100 flex-shrink-0 border border-gray-200">
//                       {tag.image ? (
//                         <img 
//                           src={tag.image} 
//                           alt={tag.name} 
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             const parent = e.target.parentElement;
//                             parent.innerHTML = `
//                               <div class="w-full h-full flex items-center justify-center">
//                                 <svg class="w-5 h-5 text-pink-400" ...>
//                               </div>
//                             `;
//                           }}
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <Tag className="w-5 h-5 text-pink-400" />
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-medium text-gray-900 truncate">{tag.name}</h3>
//                       <p className="text-xs text-gray-500">
//                         {tag.isActive ? (
//                           <span className="text-green-600 flex items-center gap-1">
//                             <Check className="w-3 h-3" /> Active
//                           </span>
//                         ) : (
//                           <span className="text-gray-400 flex items-center gap-1">
//                             <X className="w-3 h-3" /> Inactive
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <button
//                         onClick={() => handleEditClick(tag)}
//                         className="p-1.5 text-[#72846A] hover:bg-pink-50 rounded-lg transition-colors"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleToggleStatus(tag._id, tag.isActive)}
//                         className={`p-1.5 rounded-lg transition-colors ${
//                           tag.isActive 
//                             ? 'text-yellow-600 hover:bg-yellow-50' 
//                             : 'text-green-600 hover:bg-green-50'
//                         }`}
//                         title={tag.isActive ? 'Deactivate' : 'Activate'}
//                       >
//                         {tag.isActive ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
//                       </button>
//                       <button
//                         onClick={() => canDelete && handleDeleteClick(tag)}
//                         disabled={!canDelete}
//                         className={`p-1.5 rounded-lg transition-colors ${
//                           canDelete 
//                             ? 'text-red-500 hover:bg-red-50' 
//                             : 'text-gray-300 cursor-not-allowed'
//                         }`}
//                         title={canDelete ? 'Delete' : 'Delete disabled for Moderator'}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Create Tag Modal */}
//         {showCreateModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 border border-pink-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <Plus className="w-5 h-5 text-[#72846A]" />
//                   Create New Tag
//                 </h3>
//                 <button 
//                   onClick={() => {
//                     setShowCreateModal(false);
//                     resetForm();
//                   }} 
//                   className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Tag Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={tagName}
//                     onChange={(e) => setTagName(e.target.value)}
//                     placeholder="e.g., Best Seller, Trending, New Release"
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-white hover:border-pink-400"
//                     autoFocus
//                   />
//                   <p className="text-xs text-gray-400 mt-1">Enter a unique tag name for categorizing products</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Tag Image <span className="text-red-500">*</span>
//                   </label>
//                   <ImageUploadField
//                     imageUrl={tagImage}
//                     onImageChange={(url) => setTagImage(url)}
//                     onImageRemove={() => setTagImage('')}
//                     label="Upload Tag Image"
//                     required={true}
//                     helpText="Recommended: Square image, 100x100px"
//                   />
//                 </div>
                
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => {
//                       setShowCreateModal(false);
//                       resetForm();
//                     }}
//                     className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateTag}
//                     disabled={isSubmitting}
//                     className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#354030] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
//                   >
//                     {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
//                     Create Tag
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Edit Tag Modal */}
//         {showEditModal && editingTag && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 border border-pink-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <Edit className="w-5 h-5 text-[#72846A]" />
//                   Edit Tag
//                 </h3>
//                 <button 
//                   onClick={() => {
//                     setShowEditModal(false);
//                     resetForm();
//                   }} 
//                   className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Tag Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={tagName}
//                     onChange={(e) => setTagName(e.target.value)}
//                     placeholder="e.g., Best Seller, Trending, New Release"
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-white hover:border-pink-400"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Tag Image <span className="text-red-500">*</span>
//                   </label>
//                   <ImageUploadField
//                     imageUrl={tagImage}
//                     onImageChange={(url) => setTagImage(url)}
//                     onImageRemove={() => setTagImage('')}
//                     label="Upload Tag Image"
//                     required={true}
//                     helpText="Recommended: Square image, 100x100px"
//                   />
//                 </div>
                
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => {
//                       setShowEditModal(false);
//                       resetForm();
//                     }}
//                     className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUpdateTag}
//                     disabled={isSubmitting}
//                     className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#354030] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
//                   >
//                     {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
//                     Update Tag
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </ProtectedRoute>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, 
  X, 
  Trash2,
  Edit,
  Check,
  RefreshCw,
  Loader2,
  Tag,
  AlertCircle,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================
// API URL CONFIGURATION
// ============================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================
// CLOUDINARY UPLOAD FUNCTION
// ============================================

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } else {
      throw new Error(data.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// ============================================
// IMAGE UPLOAD COMPONENT
// ============================================

const ImageUploadField = ({ 
  imageUrl, 
  onImageChange, 
  onImageRemove, 
  label, 
  required = false,
  helpText = '',
  sizePreference = ''
}) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(imageUrl || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setPreview(imageUrl || '');
  }, [imageUrl]);

  const validateImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: 'Only JPG, PNG, and WebP formats are allowed.' };
    }
    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, message: 'Image size must be less than 5MB.' };
    }
    return { valid: true };
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.message);
      toast.error(validation.message);
      return;
    }

    setError('');
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      const result = await uploadToCloudinary(file);
      
      if (result && result.url) {
        onImageChange(result.url);
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image');
      toast.error('Failed to upload image');
      setPreview('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageRemove();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {preview ? (
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-[#87997F]/30 bg-gray-100">
            <img 
              src={preview} 
              alt={label} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '';
                e.target.alt = 'No image';
              }}
            />
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-[#72846A] text-white rounded-lg hover:bg-[#354030] transition-colors text-sm disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <span className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</span>
        </div>
      )}
      {sizePreference && (
        <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
          📐 Recommended size: {sizePreference}
        </p>
      )}
      {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

// ============================================
// DELETE CONFIRMATION MODAL
// ============================================
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, tagName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-red-100">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Delete Tag</h3>
        </div>
        
        <p className="text-gray-600 mb-2">
          Are you sure you want to delete <span className="font-semibold text-[#72846A]">"{tagName}"</span>?
        </p>
        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone. The tag will be permanently removed.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-200/50 flex items-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Tag
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TagsManagementPage() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRole, setUserRole] = useState('');
  
  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Form state
  const [tagName, setTagName] = useState('');
  const [tagImage, setTagImage] = useState('');
  const [tagImageMobile, setTagImageMobile] = useState('');

  // Get user role on mount
  useEffect(() => {
    const getUserRole = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUserRole(payload.role || '');
        }
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    };
    getUserRole();
  }, []);

  // Check if user can delete (Super Admin and Admin only)
  const canDelete = userRole === 'super_admin' || userRole === 'admin';

  // Check if a tag is the first tag (order 0)
  const isFirstTag = (tag) => tag.order === 0;

  // Fetch tags
  const fetchTags = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/tags`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
      });
      const data = await response.json();
      if (data.success) {
        setTags(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const resetForm = () => {
    setTagName('');
    setTagImage('');
    setTagImageMobile('');
    setEditingTag(null);
  };

  // Handle Create Tag
  const handleCreateTag = async () => {
    if (!tagName.trim()) {
      toast.error('Tag name is required');
      return;
    }

    if (!tagImage) {
      toast.error('Tag image is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/tags`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: tagName.trim(),
          image: tagImage,
          imageMobile: tagImageMobile || ''
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Tag created successfully');
        setShowCreateModal(false);
        resetForm();
        fetchTags();
      } else {
        toast.error(data.error || 'Failed to create tag');
      }
    } catch (error) {
      toast.error('Failed to create tag');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setTagImage(tag.image || '');
    setTagImageMobile(tag.imageMobile || '');
    setShowEditModal(true);
  };

  // Handle Update Tag
  const handleUpdateTag = async () => {
    if (!tagName.trim()) {
      toast.error('Tag name is required');
      return;
    }

    if (!tagImage) {
      toast.error('Tag image is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/tags/${editingTag._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: tagName.trim(),
          image: tagImage,
          imageMobile: tagImageMobile || ''
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Tag updated successfully');
        setShowEditModal(false);
        resetForm();
        fetchTags();
      } else {
        toast.error(data.error || 'Failed to update tag');
      }
    } catch (error) {
      toast.error('Failed to update tag');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Toggle Status
  const handleToggleStatus = async (tagId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/tags/${tagId}/toggle`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Tag ${data.data.isActive ? 'activated' : 'deactivated'}`);
        fetchTags();
      }
    } catch (error) {
      toast.error('Failed to toggle tag status');
    }
  };

  const handleDeleteClick = (tag) => {
    if (isFirstTag(tag)) {
      toast.error('The first tag cannot be deleted. You can only edit it.');
      return;
    }
    setTagToDelete(tag);
    setShowDeleteModal(true);
  };

  // Handle Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!tagToDelete) return;
    
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/tags/${tagToDelete._id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Tag deleted successfully');
        setShowDeleteModal(false);
        setTagToDelete(null);
        fetchTags();
      } else {
        toast.error(data.error || 'Failed to delete tag');
      }
    } catch (error) {
      toast.error('Failed to delete tag');
    } finally {
      setIsDeleting(false);
    }
  };

  // Check if the tag being edited is the first tag
  const isEditingFirstTag = editingTag && isFirstTag(editingTag);

  return (
    <ProtectedRoute pageKey="manage_tags">
      <div className="min-h-screen bg-white">
        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setTagToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          tagName={tagToDelete?.name || ''}
          isDeleting={isDeleting}
        />

        {/* Header */}
        <div className="bg-white border-b border-pink-200 shadow-lg sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <a href="/authorize/dashboard" className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-black/80 hover:text-[#72846A]" />
                </a>
                <div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-6 h-6 text-[#87997F]" />
                    <h1 className="text-xl font-bold text-black">Product Tags</h1>
                  </div>
                  <p className="text-sm text-black/70 mt-1">Manage product tags with images for your store</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#72846A] text-white rounded-lg hover:bg-[#354030] transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Create Tag
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info Banner */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>ℹ️ Note:</strong> The first tag is the center/featured tag and requires both desktop and mobile images. It cannot be deleted, only edited.
            </p>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={fetchTags}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-[#72846A]"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#72846A]" />
            </div>
          ) : tags.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
              <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No tags created yet</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-3 text-[#72846A] hover:text-[#354030] font-medium"
              >
                Create your first tag
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tags.map(tag => (
                <div 
                  key={tag._id} 
                  className={`bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow ${
                    isFirstTag(tag) ? 'border-[#72846A] border-2' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Tag Image */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-pink-100 flex-shrink-0 border border-gray-200 relative">
                      {tag.image ? (
                        <img 
                          src={tag.image} 
                          alt={tag.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Tag className="w-5 h-5 text-pink-400" />
                        </div>
                      )}
                      {isFirstTag(tag) && (
                        <div className="absolute -top-1 -right-1 bg-[#72846A] text-white text-[8px] px-1 rounded-full">
                          ★
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 truncate">{tag.name}</h3>
                        {isFirstTag(tag) && (
                          <span className="text-[10px] bg-[#72846A]/10 text-[#72846A] px-1.5 py-0.5 rounded font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Order: {tag.order}</span>
                        <span>•</span>
                        {tag.isActive ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Active
                          </span>
                        ) : (
                          <span className="text-gray-400 flex items-center gap-1">
                            <X className="w-3 h-3" /> Inactive
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditClick(tag)}
                        className="p-1.5 text-[#72846A] hover:bg-pink-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(tag._id, tag.isActive)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          tag.isActive 
                            ? 'text-yellow-600 hover:bg-yellow-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={tag.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {tag.isActive ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => canDelete && handleDeleteClick(tag)}
                        disabled={!canDelete || isFirstTag(tag)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          !canDelete || isFirstTag(tag)
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-red-500 hover:bg-red-50'
                        }`}
                        title={
                          isFirstTag(tag) 
                            ? 'First tag cannot be deleted' 
                            : canDelete 
                              ? 'Delete' 
                              : 'Delete disabled for Moderator'
                        }
                      >
                        {isFirstTag(tag) ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Tag Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 border border-pink-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#72846A]" />
                  Create New Tag
                </h3>
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }} 
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Info about tag order */}
              <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  {tags.length === 0 ? (
                    <>🎯 This will be the <strong>first/featured tag</strong> (center position). It requires both desktop and mobile images and cannot be deleted.</>
                  ) : (
                    <>📌 This tag will be added as <strong>Order {tags.length}</strong> (regular position).</>
                  )}
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tag Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="e.g., Best Seller, Trending, New Release"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-white hover:border-pink-400"
                    autoFocus
                  />
                  <p className="text-xs text-gray-400 mt-1">Enter a unique tag name for categorizing products</p>
                </div>

                {/* Desktop/Regular Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {tags.length === 0 ? 'Desktop Image (Large)' : 'Tag Image'} <span className="text-red-500">*</span>
                  </label>
                  <ImageUploadField
                    imageUrl={tagImage}
                    onImageChange={(url) => setTagImage(url)}
                    onImageRemove={() => setTagImage('')}
                    label={tags.length === 0 ? 'Upload Desktop Image' : 'Upload Tag Image'}
                    required={true}
                    sizePreference={tags.length === 0 ? '580 × 600 px' : '579 × 288 px'}
                    helpText={tags.length === 0 ? 'This image shows on desktop/large screens' : ''}
                  />
                </div>

                {/* Mobile Image - Only for first tag */}
                {tags.length === 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Image (Small) <span className="text-red-500">*</span>
                    </label>
                    <ImageUploadField
                      imageUrl={tagImageMobile}
                      onImageChange={(url) => setTagImageMobile(url)}
                      onImageRemove={() => setTagImageMobile('')}
                      label="Upload Mobile Image"
                      required={true}
                      sizePreference="579 × 288 px"
                      helpText="This image shows on mobile/small screens"
                    />
                  </div>
                )}
                
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateTag}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#354030] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    Create Tag
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Tag Modal */}
        {showEditModal && editingTag && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 border border-pink-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-[#72846A]" />
                  Edit Tag
                  {isEditingFirstTag && (
                    <span className="text-[10px] bg-[#72846A]/10 text-[#72846A] px-2 py-0.5 rounded-full font-medium">
                      Featured
                    </span>
                  )}
                </h3>
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }} 
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {isEditingFirstTag && (
                <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-800">
                    ⭐ This is the <strong>featured/center tag</strong>. It requires both desktop and mobile images.
                  </p>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tag Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="e.g., Best Seller, Trending, New Release"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-white hover:border-pink-400"
                  />
                </div>

                {/* Desktop/Regular Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isEditingFirstTag ? 'Desktop Image (Large)' : 'Tag Image'} <span className="text-red-500">*</span>
                  </label>
                  <ImageUploadField
                    imageUrl={tagImage}
                    onImageChange={(url) => setTagImage(url)}
                    onImageRemove={() => setTagImage('')}
                    label={isEditingFirstTag ? 'Upload Desktop Image' : 'Upload Tag Image'}
                    required={true}
                    sizePreference={isEditingFirstTag ? '580 × 600 px' : '579 × 288 px'}
                    helpText={isEditingFirstTag ? 'This image shows on desktop/large screens' : ''}
                  />
                </div>

                {/* Mobile Image - Only for first tag */}
                {isEditingFirstTag && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Image (Small) <span className="text-red-500">*</span>
                    </label>
                    <ImageUploadField
                      imageUrl={tagImageMobile}
                      onImageChange={(url) => setTagImageMobile(url)}
                      onImageRemove={() => setTagImageMobile('')}
                      label="Upload Mobile Image"
                      required={true}
                      sizePreference="579 × 288 px"
                      helpText="This image shows on mobile/small screens"
                    />
                  </div>
                )}
                
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateTag}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#354030] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Update Tag
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}