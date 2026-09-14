
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Search, 
//   Eye, 
//   Edit, 
//   Trash2, 
//   CheckCircle, 
//   XCircle, 
//   Clock, 
//   Star,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   RefreshCw,
//   MessageSquare,
//   Mail,
//   User,
//   Calendar,
//   ExternalLink,
//   ImageIcon,
//   Video,
//   X,
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Link from 'next/link';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // EditReviewModal Component
// const EditReviewModal = ({ 
//   isOpen, 
//   onClose, 
//   review, 
//   onSave,
//   saving 
// }) => {
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const imageInputRef = useRef(null);
//   const videoInputRef = useRef(null);
//   const uploadAbortControllers = useRef({});
  
//   const [editForm, setEditForm] = useState({
//     rating: 5,
//     title: '',
//     comment: '',
//     status: 'pending',
//     isAnonymous: false,
//     isFeatured: false,
//     existingImages: [],
//     newImages: [],
//     imagesToDelete: [],
//     existingVideo: null,
//     newVideo: null,
//     videoToDelete: null
//   });

//   const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
//   const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset';

//   const compressImageSmart = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
      
//       reader.onload = (event) => {
//         const img = new Image();
//         img.src = event.target.result;
        
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           canvas.width = img.width;
//           canvas.height = img.height;
          
//           const ctx = canvas.getContext('2d');
//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
//           let quality = 0.4;
          
//           if (file.size > 5 * 1024 * 1024) {
//             quality = 0.25;
//           } else if (file.size > 2 * 1024 * 1024) {
//             quality = 0.3;
//           } else if (file.size > 1 * 1024 * 1024) {
//             quality = 0.35;
//           } else if (file.size > 500 * 1024) {
//             quality = 0.45;
//           } else {
//             quality = 0.55;
//           }
          
//           canvas.toBlob(
//             (blob) => {
//               const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
//                 type: 'image/jpeg',
//                 lastModified: Date.now(),
//               });
//               resolve(compressedFile);
//             },
//             'image/jpeg',
//             quality
//           );
//         };
        
//         img.onerror = () => reject(new Error('Failed to load image'));
//       };
      
//       reader.onerror = () => reject(new Error('Failed to read file'));
//     });
//   };

//   useEffect(() => {
//     if (review && isOpen) {
//       setEditForm({
//         rating: review.rating || 5,
//         title: review.title || '',
//         comment: review.comment || '',
//         status: review.status || 'pending',
//         isAnonymous: review.isAnonymous || false,
//         isFeatured: review.isFeatured || false,
//         existingImages: review.images || [],
//         newImages: [],
//         imagesToDelete: [],
//         existingVideo: review.video || null,
//         newVideo: null,
//         videoToDelete: null
//       });
//     }
//   }, [review, isOpen]);

//   useEffect(() => {
//     return () => {
//       editForm.newImages.forEach(img => {
//         if (img.preview) URL.revokeObjectURL(img.preview);
//       });
//       if (editForm.newVideo?.preview) URL.revokeObjectURL(editForm.newVideo.preview);
//     };
//   }, []);

//   const uploadToCloudinary = async (file, type, fileId) => {
//     let fileToUpload = file;
    
//     if (type === 'image') {
//       try {
//         fileToUpload = await compressImageSmart(file);
//       } catch (error) {
//         console.error('Compression error, using original file:', error);
//         fileToUpload = file;
//       }
//     }
    
//     const formData = new FormData();
//     formData.append('file', fileToUpload);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
//     const folder = type === 'image' ? 'reviews/images' : 'reviews/videos';
//     formData.append('folder', folder);

//     const abortController = new AbortController();
//     uploadAbortControllers.current[fileId] = abortController;

//     try {
//       const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${type === 'image' ? 'image' : 'video'}/upload`, {
//         method: 'POST',
//         body: formData,
//         signal: abortController.signal
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error?.message || 'Upload failed');
//       }

//       const data = await response.json();
//       return {
//         url: data.secure_url,
//         publicId: data.public_id
//       };
//     } catch (error) {
//       if (error.name === 'AbortError') {
//         return null;
//       }
//       throw error;
//     } finally {
//       delete uploadAbortControllers.current[fileId];
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
    
//     if (editForm.newImages.length + files.length > 4) {
//       toast.error('You can upload up to 4 images total');
//       return;
//     }

//     setUploading(true);

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
      
//       const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
//       if (!validTypes.includes(file.type)) {
//         toast.error('Please upload a valid image file');
//         setUploading(false);
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Image size must be less than 5MB');
//         setUploading(false);
//         return;
//       }

//       const imageId = Date.now() + i;
      
//       try {
//         const previewUrl = URL.createObjectURL(file);
//         const tempImage = {
//           id: imageId,
//           file,
//           preview: previewUrl,
//           uploading: true,
//           progress: 0,
//           isNew: true
//         };
        
//         setEditForm(prev => ({
//           ...prev,
//           newImages: [...prev.newImages, tempImage]
//         }));

//         const progressInterval = setInterval(() => {
//           setEditForm(prev => ({
//             ...prev,
//             newImages: prev.newImages.map(img =>
//               img.id === imageId
//                 ? { ...img, progress: Math.min((img.progress || 0) + 10, 90) }
//                 : img
//             )
//           }));
//         }, 100);

//         const result = await uploadToCloudinary(file, 'image', imageId);
        
//         clearInterval(progressInterval);
        
//         if (result) {
//           setEditForm(prev => ({
//             ...prev,
//             newImages: prev.newImages.map(img =>
//               img.id === imageId
//                 ? { ...img, url: result.url, publicId: result.publicId, uploading: false, progress: 100 }
//                 : img
//             )
//           }));
//         } else {
//           setEditForm(prev => ({
//             ...prev,
//             newImages: prev.newImages.filter(img => img.id !== imageId)
//           }));
//         }
//       } catch (error) {
//         toast.error(`Failed to upload ${file.name}`);
//         setEditForm(prev => ({
//           ...prev,
//           newImages: prev.newImages.filter(img => img.id !== imageId)
//         }));
//       }
//     }

//     setUploading(false);
//     if (imageInputRef.current) imageInputRef.current.value = '';
//   };

//   const handleVideoUpload = async (e) => {
//     const file = e.target.files[0];
    
//     if (!file) return;
    
//     if (editForm.newVideo) {
//       toast.error('You can upload only 1 video');
//       return;
//     }

//     const validTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm'];
//     if (!validTypes.includes(file.type)) {
//       toast.error('Please upload a valid video file');
//       return;
//     }
//     if (file.size > 50 * 1024 * 1024) {
//       toast.error('Video size must be less than 50MB');
//       return;
//     }

//     setUploading(true);

//     const videoId = Date.now();

//     try {
//       const previewUrl = URL.createObjectURL(file);
//       const tempVideo = {
//         id: videoId,
//         file,
//         preview: previewUrl,
//         uploading: true,
//         progress: 0,
//         isNew: true
//       };
      
//       setEditForm(prev => ({ ...prev, newVideo: tempVideo }));

//       const progressInterval = setInterval(() => {
//         setEditForm(prev => ({
//           ...prev,
//           newVideo: prev.newVideo && prev.newVideo.id === videoId
//             ? { ...prev.newVideo, progress: Math.min((prev.newVideo.progress || 0) + 10, 90) }
//             : prev.newVideo
//         }));
//       }, 100);

//       const result = await uploadToCloudinary(file, 'video', videoId);
      
//       clearInterval(progressInterval);
      
//       if (result) {
//         setEditForm(prev => ({
//           ...prev,
//           newVideo: {
//             ...tempVideo,
//             url: result.url,
//             publicId: result.publicId,
//             uploading: false,
//             progress: 100
//           }
//         }));
//       } else {
//         setEditForm(prev => ({ ...prev, newVideo: null }));
//       }
//     } catch (error) {
//       toast.error(`Failed to upload video`);
//       setEditForm(prev => ({ ...prev, newVideo: null }));
//     }

//     setUploading(false);
//     if (videoInputRef.current) videoInputRef.current.value = '';
//   };

//   const removeExistingImage = (index) => {
//     const imageToRemove = editForm.existingImages[index];
//     if (imageToRemove && imageToRemove.publicId) {
//       setEditForm(prev => ({
//         ...prev,
//         imagesToDelete: [...prev.imagesToDelete, imageToRemove.publicId],
//         existingImages: prev.existingImages.filter((_, i) => i !== index)
//       }));
//     } else {
//       setEditForm(prev => ({
//         ...prev,
//         existingImages: prev.existingImages.filter((_, i) => i !== index)
//       }));
//       toast.warning('Image removed from UI but publicId not found for Cloudinary deletion');
//     }
//   };

//   const removeExistingVideo = () => {
//     if (editForm.existingVideo && editForm.existingVideo.publicId) {
//       setEditForm(prev => ({
//         ...prev,
//         videoToDelete: prev.existingVideo.publicId,
//         existingVideo: null
//       }));
//     } else {
//       setEditForm(prev => ({
//         ...prev,
//         existingVideo: null
//       }));
//       toast.warning('Video removed from UI but publicId not found for Cloudinary deletion');
//     }
//   };

//   const removeNewImage = (id) => {
//     if (uploadAbortControllers.current[id]) {
//       uploadAbortControllers.current[id].abort();
//     }
//     const imgToRemove = editForm.newImages.find(img => img.id === id);
//     if (imgToRemove?.preview) URL.revokeObjectURL(imgToRemove.preview);
//     setEditForm(prev => ({
//       ...prev,
//       newImages: prev.newImages.filter(img => img.id !== id)
//     }));
//   };

//   const removeNewVideo = () => {
//     if (uploadAbortControllers.current[editForm.newVideo?.id]) {
//       uploadAbortControllers.current[editForm.newVideo.id].abort();
//     }
//     if (editForm.newVideo?.preview) URL.revokeObjectURL(editForm.newVideo.preview);
//     setEditForm(prev => ({ ...prev, newVideo: null }));
//   };

//   const handleSave = () => {
//     onSave({
//       rating: editForm.rating,
//       title: editForm.title,
//       comment: editForm.comment,
//       status: editForm.status,
//       isAnonymous: editForm.isAnonymous,
//       isFeatured: editForm.isFeatured,
//       imagesToDelete: editForm.imagesToDelete,
//       videoToDelete: editForm.videoToDelete,
//       newImages: editForm.newImages.filter(img => img.url).map(img => ({
//         url: img.url,
//         publicId: img.publicId
//       })),
//       newVideo: editForm.newVideo?.url ? {
//         url: editForm.newVideo.url,
//         publicId: editForm.newVideo.publicId
//       } : null
//     });
//   };

//   const renderStars = (rating, setRating = false) => {
//     const currentRating = rating || 0;
//     return (
//       <div className="flex gap-2">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             onClick={() => setRating && setEditForm({ ...editForm, rating: star })}
//             className="focus:outline-none transition-transform hover:scale-110"
//           >
//             <Star
//               className={`w-8 h-8 ${
//                 star <= currentRating
//                   ? 'fill-[#FFD93D] text-[#FFD93D]'
//                   : 'text-gray-300'
//               } transition-colors`}
//             />
//           </button>
//         ))}
//       </div>
//     );
//   };

//   if (!isOpen || !review) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && review && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen px-4 py-8">
//             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-6 py-4 rounded-t-2xl z-10">
//                 <h2 className="text-xl font-bold text-white">Edit Review</h2>
//                 <p className="text-white/80 text-sm mt-1">Customer: {review.userName}</p>
//               </div>
              
//               <div className="p-6 space-y-5">
//                 {/* Rating */}
//                 <div>
//                   <label className="block text-sm font-semibold text-[#2D1B2E] mb-2">
//                     Rating <span className="text-[#EE4275]">*</span>
//                   </label>
//                   {renderStars(editForm.rating, true)}
//                 </div>
                
//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-semibold text-[#2D1B2E] mb-2">Review Title</label>
//                   <input
//                     type="text"
//                     value={editForm.title}
//                     onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
//                     className="w-full px-4 py-2.5 border-2 border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none bg-white hover:border-[#EE4275]/30"
//                     placeholder="Review title"
//                     maxLength={100}
//                   />
//                 </div>
                
//                 {/* Comment */}
//                 <div>
//                   <label className="block text-sm font-semibold text-[#2D1B2E] mb-2">Comment <span className="text-[#EE4275]">*</span></label>
//                   <textarea
//                     value={editForm.comment}
//                     onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
//                     rows={4}
//                     className="w-full px-4 py-2.5 border-2 border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none resize-none bg-white hover:border-[#EE4275]/30"
//                     placeholder="Review comment"
//                   />
//                 </div>
                
//                 {/* Status */}
//                 <div>
//                   <label className="block text-sm font-semibold text-[#2D1B2E] mb-2">Status</label>
//                   <div className="flex gap-3">
//                     {['pending', 'approved', 'rejected'].map((status) => (
//                       <label key={status} className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="status"
//                           value={status}
//                           checked={editForm.status === status}
//                           onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
//                           className="w-4 h-4 text-[#EE4275] focus:ring-[#EE4275]"
//                         />
//                         <span className="text-sm capitalize text-[#2D1B2E]">{status}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Media Attachments Section */}
//                 <div className="border-2 border-dashed border-[#F7C7D3]/50 rounded-xl p-4 bg-[#FFF5F6]">
//                   <label className="block text-sm font-semibold text-[#2D1B2E] mb-3">
//                     Media Attachments
//                   </label>
                  
//                   {/* Existing Images */}
//                   {editForm.existingImages.length > 0 && (
//                     <div className="mb-4">
//                       <p className="text-xs text-[#EE4275]/60 mb-2">Current Images ({editForm.existingImages.length})</p>
//                       <div className="grid grid-cols-4 gap-3">
//                         {editForm.existingImages.map((img, idx) => (
//                           <div key={idx} className="relative group">
//                             <img
//                               src={img.url}
//                               alt={`Review image ${idx + 1}`}
//                               className="w-full h-20 object-cover rounded-lg"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeExistingImage(idx)}
//                               className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <Trash2 className="w-3 h-3" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* New Images */}
//                   {editForm.newImages.length > 0 && (
//                     <div className="mb-4">
//                       <p className="text-xs text-[#EE4275]/60 mb-2">New Images ({editForm.newImages.length})</p>
//                       <div className="grid grid-cols-4 gap-3">
//                         {editForm.newImages.map((img) => (
//                           <div key={img.id} className="relative group">
//                             <div className="relative">
//                               <img
//                                 src={img.preview}
//                                 alt="New review image"
//                                 className="w-full h-20 object-cover rounded-lg"
//                               />
//                               {img.uploading && (
//                                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
//                                   <Loader2 className="w-4 h-4 animate-spin text-white" />
//                                 </div>
//                               )}
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeNewImage(img.id)}
//                               className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <Trash2 className="w-3 h-3" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Add Image Button */}
//                   <div
//                     onClick={() => imageInputRef.current?.click()}
//                     className="border-2 border-dashed border-[#F7C7D3]/50 rounded-xl p-3 text-center cursor-pointer hover:border-[#EE4275] hover:bg-white transition-all mb-4"
//                   >
//                     <input
//                       ref={imageInputRef}
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       disabled={uploading}
//                     />
//                     <ImageIcon className="w-5 h-5 text-[#EE4275]/40 mx-auto mb-1" />
//                     <p className="text-xs text-[#EE4275]/60">Add more images (Max 4 total)</p>
//                   </div>
                  
//                   {/* Existing Video */}
//                   {editForm.existingVideo && (
//                     <div className="mb-4">
//                       <p className="text-xs text-[#EE4275]/60 mb-2">Current Video</p>
//                       <div className="relative group">
//                         <video
//                           src={editForm.existingVideo.url}
//                           controls
//                           className="w-full rounded-lg max-h-32"
//                         />
//                         <button
//                           type="button"
//                           onClick={removeExistingVideo}
//                           className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <Trash2 className="w-3 h-3" />
//                         </button>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* New Video */}
//                   {editForm.newVideo && (
//                     <div className="mb-4">
//                       <p className="text-xs text-[#EE4275]/60 mb-2">New Video</p>
//                       <div className="relative group">
//                         <video
//                           src={editForm.newVideo.preview}
//                           controls
//                           className="w-full rounded-lg max-h-32"
//                         />
//                         {editForm.newVideo.uploading && (
//                           <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
//                             <Loader2 className="w-6 h-6 animate-spin text-white" />
//                           </div>
//                         )}
//                         <button
//                           type="button"
//                           onClick={removeNewVideo}
//                           className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <Trash2 className="w-3 h-3" />
//                         </button>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Add Video Button */}
//                   {!editForm.existingVideo && !editForm.newVideo && (
//                     <div
//                       onClick={() => videoInputRef.current?.click()}
//                       className="border-2 border-dashed border-[#F7C7D3]/50 rounded-xl p-3 text-center cursor-pointer hover:border-[#EE4275] hover:bg-white transition-all"
//                     >
//                       <input
//                         ref={videoInputRef}
//                         type="file"
//                         accept="video/*"
//                         onChange={handleVideoUpload}
//                         className="hidden"
//                         disabled={uploading}
//                       />
//                       <Video className="w-5 h-5 text-[#EE4275]/40 mx-auto mb-1" />
//                       <p className="text-xs text-[#EE4275]/60">Add video (Max 1)</p>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Anonymous Flag */}
//                 {!review.isGuest && (
//                   <div>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={editForm.isAnonymous}
//                         onChange={(e) => setEditForm({ ...editForm, isAnonymous: e.target.checked })}
//                         className="w-4 h-4 text-[#EE4275] rounded focus:ring-[#EE4275]"
//                       />
//                       <span className="text-sm text-[#2D1B2E]">Post as anonymous</span>
//                     </label>
//                   </div>
//                 )}
                
//                 {/* Actions */}
//                 <div className="flex gap-3 pt-4">
//                   <button
//                     onClick={onClose}
//                     className="flex-1 px-4 py-2.5 border-2 border-[#F7C7D3]/50 text-[#2D1B2E] font-semibold rounded-xl hover:bg-[#FFF5F6] transition-all"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSave}
//                     disabled={saving || uploading}
//                     className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all disabled:opacity-50"
//                   >
//                     {saving ? (
//                       <div className="flex items-center justify-center gap-2">
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Saving...
//                       </div>
//                     ) : (
//                       'Save Changes'
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Main ManageReviews Component
// export default function ManageReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [ratingFilter, setRatingFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalReviews, setTotalReviews] = useState(0);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [replyText, setReplyText] = useState('');
//   const [isReplying, setIsReplying] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [userRole, setUserRole] = useState('');
  
//   const itemsPerPage = 10;

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

//   // Fetch reviews
//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login to manage reviews');
//         setLoading(false);
//         return;
//       }
      
//       let url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?page=${currentPage}&limit=${itemsPerPage}`;
      
//       if (statusFilter !== 'all') {
//         url += `&status=${statusFilter}`;
//       }
      
//       if (ratingFilter !== 'all') {
//         url += `&rating=${ratingFilter}`;
//       }
      
//       if (searchTerm) {
//         url += `&search=${encodeURIComponent(searchTerm)}`;
//       }
      
//       const response = await fetch(url, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setReviews(data.data || []);
//         setTotalPages(data.pagination?.pages || 1);
//         setTotalReviews(data.pagination?.total || 0);
//       } else {
//         toast.error(data.error || 'Failed to fetch reviews');
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       toast.error('Failed to load reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [currentPage, statusFilter, ratingFilter]);

//   // Handle search with debounce
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchTerm !== undefined) {
//         setCurrentPage(1);
//         fetchReviews();
//       }
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // Update review status
//   const updateReviewStatus = async (reviewId, status) => {
//     try {
//       const token = localStorage.getItem('token');
//       const endpoint = status === 'approved' 
//         ? `/api/reviews/${reviewId}/approve`
//         : `/api/reviews/${reviewId}/reject`;
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: status === 'rejected' ? JSON.stringify({ moderationNote: 'Review rejected by admin' }) : undefined
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Review ${status} successfully`);
//         fetchReviews();
//       } else {
//         toast.error(data.error || `Failed to ${status} review`);
//       }
//     } catch (error) {
//       console.error('Error updating review status:', error);
//       toast.error('Failed to update review status');
//     }
//   };

//   const toggleFeatured = async (reviewId, currentStatus) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${reviewId}/featured`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(data.message);
//         fetchReviews();
//       } else {
//         toast.error(data.error || 'Failed to update featured status');
//       }
//     } catch (error) {
//       console.error('Error toggling featured:', error);
//       toast.error('Failed to update featured status');
//     }
//   };

//   // Delete review
//   const deleteReview = async () => {
//     if (!selectedReview) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Review deleted successfully');
//         setIsDeleteModalOpen(false);
//         setSelectedReview(null);
//         fetchReviews();
//       } else {
//         toast.error(data.error || 'Failed to delete review');
//       }
//     } catch (error) {
//       console.error('Error deleting review:', error);
//       toast.error('Failed to delete review');
//     }
//   };

//   // Reply to review
//   const replyToReview = async () => {
//     if (!selectedReview || !replyText.trim()) {
//       toast.error('Please enter a reply');
//       return;
//     }
    
//     setIsReplying(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}/reply`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ replyText: replyText.trim() })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Reply added successfully');
//         setReplyText('');
//         setIsViewModalOpen(false);
//         fetchReviews();
//       } else {
//         toast.error(data.error || 'Failed to add reply');
//       }
//     } catch (error) {
//       console.error('Error replying to review:', error);
//       toast.error('Failed to add reply');
//     } finally {
//       setIsReplying(false);
//     }
//   };

//   const handleSaveEdit = async (editForm) => {
//     if (!selectedReview) {
//       toast.error('No review selected');
//       return;
//     }
    
//     if (!editForm.comment.trim() || editForm.comment.trim().length < 10) {
//       toast.error('Comment must be at least 10 characters long');
//       return;
//     }
    
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const updateData = {
//         rating: editForm.rating,
//         title: editForm.title,
//         comment: editForm.comment,
//         status: editForm.status,
//         isAnonymous: editForm.isAnonymous,
//         isFeatured: editForm.isFeatured,
//         imagesToDelete: editForm.imagesToDelete,
//         videoToDelete: editForm.videoToDelete,
//         newImages: editForm.newImages.filter(img => img.url).map(img => ({
//           url: img.url,
//           publicId: img.publicId
//         })),
//         newVideo: editForm.newVideo?.url ? {
//           url: editForm.newVideo.url,
//           publicId: editForm.newVideo.publicId
//         } : null
//       };
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updateData)
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Review updated successfully');
//         setIsEditModalOpen(false);
//         fetchReviews();
//       } else {
//         toast.error(data.error || 'Failed to update review');
//       }
//     } catch (error) {
//       console.error('Error updating review:', error);
//       toast.error('Failed to update review');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'approved':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
//             <CheckCircle className="w-3 h-3" />
//             Approved
//           </span>
//         );
//       case 'rejected':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
//             <XCircle className="w-3 h-3" />
//             Rejected
//           </span>
//         );
//       default:
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
//             <Clock className="w-3 h-3" />
//             Pending
//           </span>
//         );
//     }
//   };

//   // Render stars
//   const renderStars = (rating) => {
//     return (
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`w-3.5 h-3.5 ${star <= rating ? 'fill-[#FFD93D] text-[#FFD93D]' : 'text-gray-300'}`}
//           />
//         ))}
//       </div>
//     );
//   };

//   // View Review Modal
//   const ViewReviewModal = () => {
//     const [imageViewerOpen, setImageViewerOpen] = useState(false);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [viewerImages, setViewerImages] = useState([]);

//     const openImageViewer = (images, index) => {
//       const imgArray = images.map(img => img.url);
//       setViewerImages(imgArray);
//       setCurrentImageIndex(index);
//       setImageViewerOpen(true);
//     };

//     const closeImageViewer = () => {
//       setImageViewerOpen(false);
//       setViewerImages([]);
//       setCurrentImageIndex(0);
//     };

//     const goToPrevious = (e) => {
//       e.stopPropagation();
//       setCurrentImageIndex((prev) => (prev - 1 + viewerImages.length) % viewerImages.length);
//     };

//     const goToNext = (e) => {
//       e.stopPropagation();
//       setCurrentImageIndex((prev) => (prev + 1) % viewerImages.length);
//     };

//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') closeImageViewer();
//       if (e.key === 'ArrowLeft') goToPrevious(e);
//       if (e.key === 'ArrowRight') goToNext(e);
//     };

//     useEffect(() => {
//       if (imageViewerOpen) {
//         document.addEventListener('keydown', handleKeyDown);
//         document.body.style.overflow = 'hidden';
//       } else {
//         document.body.style.overflow = 'auto';
//       }
//       return () => {
//         document.removeEventListener('keydown', handleKeyDown);
//         document.body.style.overflow = 'auto';
//       };
//     }, [imageViewerOpen]);

//     return (
//       <>
//         <AnimatePresence>
//           {isViewModalOpen && selectedReview && (
//             <div className="fixed inset-0 z-50 overflow-y-auto">
//               <div className="flex items-center justify-center min-h-screen px-4 py-8">
//                 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)} />
                
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95, y: 20 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.95, y: 20 }}
//                   className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
//                 >
//                   <div className="sticky top-0 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
//                     <div>
//                       <h2 className="text-xl font-bold text-white">Review Details</h2>
//                       <p className="text-white/80 text-sm">Review #{selectedReview._id?.slice(-8)}</p>
//                     </div>
//                     <button
//                       onClick={() => setIsViewModalOpen(false)}
//                       className="p-2 hover:bg-white/20 rounded-full transition-colors"
//                     >
//                       <XCircle className="w-5 h-5 text-white" />
//                     </button>
//                   </div>
                  
//                   <div className="p-6 space-y-4">
//                     {/* Customer Info */}
//                     <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#F7C7D3]/40">
//                       <h3 className="font-semibold text-[#2D1B2E] mb-3">Customer Information</h3>
//                       <div className="grid grid-cols-2 gap-3">
//                         <div className="flex items-center gap-2">
//                           <User className="w-4 h-4 text-[#EE4275]" />
//                           <span className="text-sm text-[#2D1B2E]">{selectedReview.userName}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Mail className="w-4 h-4 text-[#EE4275]" />
//                           <span className="text-sm text-[#2D1B2E]">{selectedReview.email || 'N/A'}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-[#EE4275]" />
//                           <span className="text-sm text-[#2D1B2E]">
//                             {new Date(selectedReview.createdAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {getStatusBadge(selectedReview.status)}
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Product Info */}
//                     {selectedReview.product && (
//                       <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#F7C7D3]/40">
//                         <h3 className="font-semibold text-[#2D1B2E] mb-3">Product Information</h3>
//                         <Link
//                           href={`/product/${selectedReview.product.slug || selectedReview.product._id}`}
//                           target="_blank"
//                           className="flex items-center gap-3 hover:bg-white p-2 rounded-lg transition-colors"
//                         >
//                           <div className="flex-1">
//                             <p className="font-medium text-[#2D1B2E]">{selectedReview.productName}</p>
//                             <p className="text-xs text-[#EE4275]/60">Product ID: {selectedReview.product._id}</p>
//                           </div>
//                         </Link>
//                       </div>
//                     )}
                    
//                     {/* Review Content */}
//                     <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#F7C7D3]/40">
//                       <h3 className="font-semibold text-[#2D1B2E] mb-3">Review Content</h3>
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm text-[#EE4275]/60">Rating:</span>
//                           {renderStars(selectedReview.rating)}
//                         </div>
//                         {selectedReview.title && (
//                           <div>
//                             <span className="text-sm text-[#EE4275]/60">Title:</span>
//                             <p className="font-medium text-[#2D1B2E] mt-1">{selectedReview.title}</p>
//                           </div>
//                         )}
//                         <div>
//                           <span className="text-sm text-[#EE4275]/60">Comment:</span>
//                           <p className="text-[#2D1B2E] mt-1 whitespace-pre-wrap">{selectedReview.comment}</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Media */}
//                     {(selectedReview.images?.length > 0 || selectedReview.video?.url) && (
//                       <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#F7C7D3]/40">
//                         <h3 className="font-semibold text-[#2D1B2E] mb-3">Media Attachments</h3>
//                         {selectedReview.images?.length > 0 && (
//                           <div className="mb-3">
//                             <p className="text-sm text-[#EE4275]/60 mb-2">Images ({selectedReview.images.length})</p>
//                             <div className="grid grid-cols-4 gap-2">
//                               {selectedReview.images.slice(0, 4).map((img, idx) => (
//                                 <img
//                                   key={idx}
//                                   src={img.url}
//                                   alt={`Review image ${idx + 1}`}
//                                   className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-[#F7C7D3]/40 hover:border-[#EE4275]"
//                                   onClick={() => openImageViewer(selectedReview.images, idx)}
//                                 />
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                         {selectedReview.video?.url && (
//                           <div>
//                             <p className="text-sm text-[#EE4275]/60 mb-2">Video</p>
//                             <video
//                               src={selectedReview.video.url}
//                               controls
//                               className="w-full rounded-lg max-h-48 border-2 border-[#F7C7D3]/40 hover:border-[#EE4275] transition-colors"
//                             />
//                           </div>
//                         )}
//                       </div>
//                     )}
                    
//                     {/* Admin Reply */}
//                     {selectedReview.reply?.text && (
//                       <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#EE4275]/20">
//                         <h3 className="font-semibold text-[#EE4275] mb-2">Admin Reply</h3>
//                         <p className="text-[#2D1B2E]">{selectedReview.reply.text}</p>
//                         <p className="text-xs text-[#EE4275]/60 mt-2">
//                           Replied on {new Date(selectedReview.reply.repliedAt).toLocaleString()}
//                         </p>
//                       </div>
//                     )}
                    
//                     {/* Actions */}
//                     <div className="flex gap-3 pt-4">
//                       <button
//                         onClick={() => {
//                           setIsViewModalOpen(false);
//                           setIsEditModalOpen(true);
//                         }}
//                         className="flex-1 px-4 py-2 border-2 border-[#EE4275] text-[#EE4275] font-semibold rounded-xl hover:bg-[#EE4275] hover:text-white transition-all"
//                       >
//                         <Edit className="w-4 h-4 inline mr-2" />
//                         Edit Review
//                       </button>
//                       {selectedReview.status === 'pending' && (
//                         <>
//                           <button
//                             onClick={() => updateReviewStatus(selectedReview._id, 'approved')}
//                             className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all"
//                           >
//                             <CheckCircle className="w-4 h-4 inline mr-2" />
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => updateReviewStatus(selectedReview._id, 'rejected')}
//                             className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
//                           >
//                             <XCircle className="w-4 h-4 inline mr-2" />
//                             Reject
//                           </button>
//                         </>
//                       )}
//                       <button
//                         onClick={() => {
//                           setIsViewModalOpen(false);
//                           setIsDeleteModalOpen(true);
//                         }}
//                         className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* Image Viewer Modal */}
//         <AnimatePresence>
//           {imageViewerOpen && viewerImages.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
//               onClick={closeImageViewer}
//             >
//               <button
//                 onClick={closeImageViewer}
//                 className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white"
//               >
//                 <X className="w-6 h-6 sm:w-8 sm:h-8" />
//               </button>

//               <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
//                 {currentImageIndex + 1} / {viewerImages.length}
//               </div>

//               <div 
//                 className="relative w-full h-full flex items-center justify-center px-4 sm:px-12"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <img
//                   src={viewerImages[currentImageIndex]}
//                   alt={`Review image ${currentImageIndex + 1}`}
//                   className="max-w-full max-h-[85vh] object-contain rounded-lg"
//                 />
//               </div>

//               {viewerImages.length > 1 && (
//                 <>
//                   <button
//                     onClick={goToPrevious}
//                     className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white hover:scale-110"
//                   >
//                     <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
//                   </button>
//                   <button
//                     onClick={goToNext}
//                     className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white hover:scale-110"
//                   >
//                     <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
//                   </button>
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 overflow-x-auto max-w-[90%] px-4 py-2 scrollbar-thin scrollbar-thumb-white/30">
//                     {viewerImages.map((img, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setCurrentImageIndex(idx)}
//                         className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
//                           idx === currentImageIndex 
//                             ? 'border-[#EE4275] shadow-[0_0_20px_rgba(238,66,117,0.3)]' 
//                             : 'border-white/30 hover:border-white/60'
//                         }`}
//                       >
//                         <img
//                           src={img}
//                           alt={`Thumbnail ${idx + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </>
//     );
//   };

//   // Delete Confirmation Modal
//   const DeleteConfirmationModal = () => (
//     <AnimatePresence>
//       {isDeleteModalOpen && selectedReview && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen px-4 py-8">
//             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
            
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-red-100"
//             >
//               <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 rounded-t-2xl">
//                 <h2 className="text-xl font-bold text-white">Delete Review</h2>
//               </div>
              
//               <div className="p-6">
//                 <p className="text-[#2D1B2E] mb-4">
//                   Are you sure you want to delete this review from <strong className="text-[#EE4275]">{selectedReview.userName}</strong>?
//                 </p>
//                 <p className="text-sm text-[#EE4275]/60 mb-6">This action cannot be undone.</p>
                
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setIsDeleteModalOpen(false)}
//                     className="flex-1 px-4 py-2 border-2 border-[#F7C7D3]/50 text-[#2D1B2E] font-semibold rounded-xl hover:bg-[#FFF5F6] transition-all"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={deleteReview}
//                     className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <ProtectedRoute pageKey="manage_reviews">
//     <div className="min-h-screen bg-[#FFF5F6]">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-[#2D1B2E] mb-2">Manage Reviews</h1>
//           <p className="text-[#EE4275]/60">View, moderate, and manage customer reviews</p>
//         </div>
        
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F7C7D3]/40">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-[#EE4275]/60">Total Reviews</p>
//                 <p className="text-2xl font-bold text-[#2D1B2E]">{totalReviews}</p>
//               </div>
//               <MessageSquare className="w-8 h-8 text-[#EE4275] opacity-50" />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F7C7D3]/40">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-[#EE4275]/60">Pending</p>
//                 <p className="text-2xl font-bold text-yellow-600">
//                   {reviews.filter(r => r.status === 'pending').length}
//                 </p>
//               </div>
//               <Clock className="w-8 h-8 text-yellow-500 opacity-50" />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F7C7D3]/40">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-[#EE4275]/60">Approved</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {reviews.filter(r => r.status === 'approved').length}
//                 </p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F7C7D3]/40">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-[#EE4275]/60">Rejected</p>
//                 <p className="text-2xl font-bold text-red-600">
//                   {reviews.filter(r => r.status === 'rejected').length}
//                 </p>
//               </div>
//               <XCircle className="w-8 h-8 text-red-500 opacity-50" />
//             </div>
//           </div>
//         </div>
        
//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-sm border border-[#F7C7D3]/40 p-4 mb-6">
//           <div className="flex flex-wrap gap-4 items-center justify-between">
//             <div className="flex flex-wrap gap-3">
//               {/* Search */}
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                 <input
//                   type="text"
//                   placeholder="Search reviews..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-9 pr-4 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none w-64 bg-white hover:border-[#EE4275]/30"
//                 />
//               </div>
              
//               {/* Status Filter */}
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="px-4 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none bg-white hover:border-[#EE4275]/30"
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="approved">Approved</option>
//                 <option value="rejected">Rejected</option>
//               </select>
              
//               {/* Rating Filter */}
//               <select
//                 value={ratingFilter}
//                 onChange={(e) => setRatingFilter(e.target.value)}
//                 className="px-4 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none bg-white hover:border-[#EE4275]/30"
//               >
//                 <option value="all">All Ratings</option>
//                 <option value="5">5 Stars</option>
//                 <option value="4">4 Stars</option>
//                 <option value="3">3 Stars</option>
//                 <option value="2">2 Stars</option>
//                 <option value="1">1 Star</option>
//               </select>
//             </div>
//           </div>
//         </div>
        
//         {/* Reviews Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-[#F7C7D3]/40 overflow-hidden">
//           {loading ? (
//             <div className="flex items-center justify-center py-20">
//               <Loader2 className="w-8 h-8 animate-spin text-[#EE4275]" />
//             </div>
//           ) : reviews.length === 0 ? (
//             <div className="text-center py-20">
//               <MessageSquare className="w-16 h-16 text-[#EE4275]/30 mx-auto mb-4" />
//               <p className="text-[#EE4275]/60">No reviews found</p>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[800px]">
//                   <thead className="bg-[#FFF5F6] border-b border-[#F7C7D3]/40">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase whitespace-nowrap">Customer</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase whitespace-nowrap">Product</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase whitespace-nowrap">Rating</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase whitespace-nowrap">Review</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase whitespace-nowrap">Status</th>
//                       <th className="px-4 py-3 text-right text-xs font-semibold text-[#2D1B2E] uppercase whitespace-nowrap">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-[#F7C7D3]/20">
//                     {reviews.map((review) => (
//                       <tr key={review._id} className="hover:bg-[#FFF5F6] transition-colors">
//                         <td className="px-4 py-3">
//                           <div className="flex flex-col">
//                             <span className="font-medium text-[#2D1B2E] text-sm truncate max-w-[150px]">{review.userName}</span>
//                             <span className="text-xs text-[#EE4275]/60 truncate max-w-[150px]">{review.email || 'N/A'}</span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <span className="text-sm text-[#2D1B2E] truncate max-w-[100px] block">
//                             {review.productName || 'N/A'}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3">
//                           {renderStars(review.rating)}
//                         </td>
//                         <td className="px-4 py-3">
//                           <p className="text-sm text-[#2D1B2E] truncate max-w-[150px]">{review.title || review.comment}</p>
//                         </td>
//                         <td className="px-4 py-3">
//                           {getStatusBadge(review.status)}
//                         </td>
//                         <td className="px-4 py-3 text-right">
//                           <div className="flex items-center justify-end gap-1">
//                             <button
//                               onClick={() => {
//                                 setSelectedReview(review);
//                                 setReplyText(review.reply?.text || '');
//                                 setIsViewModalOpen(true);
//                               }}
//                               className="p-1.5 text-[#EE4275] hover:bg-[#FFF5F6] rounded-lg transition-colors"
//                               title="View"
//                             >
//                               <Eye className="w-4 h-4" />
//                             </button>
                            
//                             {review.status === 'pending' && (
//                               <>
//                                 <button
//                                   onClick={() => updateReviewStatus(review._id, 'approved')}
//                                   className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                                   title="Approve"
//                                 >
//                                   <CheckCircle className="w-4 h-4" />
//                                 </button>
//                                 <button
//                                   onClick={() => updateReviewStatus(review._id, 'rejected')}
//                                   className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                   title="Reject"
//                                 >
//                                   <XCircle className="w-4 h-4" />
//                                 </button>
//                               </>
//                             )}
                            
//                             <button
//                               onClick={() => {
//                                 setSelectedReview(review);
//                                 setTimeout(() => {
//                                   setIsEditModalOpen(true);
//                                 }, 0);
//                               }}
//                               className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
//                               title="Edit"
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
                            
//                             <button
//                               onClick={() => canDelete && setSelectedReview(review) && setIsDeleteModalOpen(true)}
//                               disabled={!canDelete}
//                               className={`p-1.5 rounded-lg transition-colors ${
//                                 canDelete 
//                                   ? 'text-red-600 hover:bg-red-50' 
//                                   : 'text-gray-300 cursor-not-allowed'
//                               }`}
//                               title={canDelete ? 'Delete' : 'Delete disabled for Moderator'}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex items-center justify-between px-6 py-4 border-t border-[#F7C7D3]/40">
//                   <div className="text-sm text-[#EE4275]/60">
//                     Page {currentPage} of {totalPages}
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                       disabled={currentPage === 1}
//                       className="p-2 text-[#EE4275]/60 hover:bg-[#FFF5F6] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                       <ChevronLeft className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                       disabled={currentPage === totalPages}
//                       className="p-2 text-[#EE4275]/60 hover:bg-[#FFF5F6] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
      
//       {/* Modals */}
//       <ViewReviewModal />
//       <EditReviewModal 
//         key={selectedReview?._id || 'edit-modal'}
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         review={selectedReview}
//         onSave={handleSaveEdit}
//         saving={saving}
//       />
//       <DeleteConfirmationModal />
//     </div>
//     </ProtectedRoute>
//   );
// }
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  MessageSquare,
  Mail,
  User,
  Calendar,
  ExternalLink,
  ImageIcon,
  Video,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================================
// FONT CONSTANTS - MATCHING ABOUT PAGE
// ============================================================
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

// EditReviewModal Component
const EditReviewModal = ({ 
  isOpen, 
  onClose, 
  review, 
  onSave,
  saving 
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const uploadAbortControllers = useRef({});
  
  const [editForm, setEditForm] = useState({
    rating: 5,
    title: '',
    comment: '',
    status: 'pending',
    isAnonymous: false,
    isFeatured: false,
    existingImages: [],
    newImages: [],
    imagesToDelete: [],
    existingVideo: null,
    newVideo: null,
    videoToDelete: null
  });

  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset';

  const compressImageSmart = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          let quality = 0.4;
          
          if (file.size > 5 * 1024 * 1024) {
            quality = 0.25;
          } else if (file.size > 2 * 1024 * 1024) {
            quality = 0.3;
          } else if (file.size > 1 * 1024 * 1024) {
            quality = 0.35;
          } else if (file.size > 500 * 1024) {
            quality = 0.45;
          } else {
            quality = 0.55;
          }
          
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            'image/jpeg',
            quality
          );
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  useEffect(() => {
    if (review && isOpen) {
      setEditForm({
        rating: review.rating || 5,
        title: review.title || '',
        comment: review.comment || '',
        status: review.status || 'pending',
        isAnonymous: review.isAnonymous || false,
        isFeatured: review.isFeatured || false,
        existingImages: review.images || [],
        newImages: [],
        imagesToDelete: [],
        existingVideo: review.video || null,
        newVideo: null,
        videoToDelete: null
      });
    }
  }, [review, isOpen]);

  useEffect(() => {
    return () => {
      editForm.newImages.forEach(img => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
      if (editForm.newVideo?.preview) URL.revokeObjectURL(editForm.newVideo.preview);
    };
  }, []);

  const uploadToCloudinary = async (file, type, fileId) => {
    let fileToUpload = file;
    
    if (type === 'image') {
      try {
        fileToUpload = await compressImageSmart(file);
      } catch (error) {
        console.error('Compression error, using original file:', error);
        fileToUpload = file;
      }
    }
    
    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    const folder = type === 'image' ? 'reviews/images' : 'reviews/videos';
    formData.append('folder', folder);

    const abortController = new AbortController();
    uploadAbortControllers.current[fileId] = abortController;

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${type === 'image' ? 'image' : 'video'}/upload`, {
        method: 'POST',
        body: formData,
        signal: abortController.signal
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await response.json();
      return {
        url: data.secure_url,
        publicId: data.public_id
      };
    } catch (error) {
      if (error.name === 'AbortError') {
        return null;
      }
      throw error;
    } finally {
      delete uploadAbortControllers.current[fileId];
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (editForm.newImages.length + files.length > 4) {
      toast.error('You can upload up to 4 images total');
      return;
    }

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file');
        setUploading(false);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        setUploading(false);
        return;
      }

      const imageId = Date.now() + i;
      
      try {
        const previewUrl = URL.createObjectURL(file);
        const tempImage = {
          id: imageId,
          file,
          preview: previewUrl,
          uploading: true,
          progress: 0,
          isNew: true
        };
        
        setEditForm(prev => ({
          ...prev,
          newImages: [...prev.newImages, tempImage]
        }));

        const progressInterval = setInterval(() => {
          setEditForm(prev => ({
            ...prev,
            newImages: prev.newImages.map(img =>
              img.id === imageId
                ? { ...img, progress: Math.min((img.progress || 0) + 10, 90) }
                : img
            )
          }));
        }, 100);

        const result = await uploadToCloudinary(file, 'image', imageId);
        
        clearInterval(progressInterval);
        
        if (result) {
          setEditForm(prev => ({
            ...prev,
            newImages: prev.newImages.map(img =>
              img.id === imageId
                ? { ...img, url: result.url, publicId: result.publicId, uploading: false, progress: 100 }
                : img
            )
          }));
        } else {
          setEditForm(prev => ({
            ...prev,
            newImages: prev.newImages.filter(img => img.id !== imageId)
          }));
        }
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        setEditForm(prev => ({
          ...prev,
          newImages: prev.newImages.filter(img => img.id !== imageId)
        }));
      }
    }

    setUploading(false);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    if (editForm.newVideo) {
      toast.error('You can upload only 1 video');
      return;
    }

    const validTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid video file');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error('Video size must be less than 50MB');
      return;
    }

    setUploading(true);

    const videoId = Date.now();

    try {
      const previewUrl = URL.createObjectURL(file);
      const tempVideo = {
        id: videoId,
        file,
        preview: previewUrl,
        uploading: true,
        progress: 0,
        isNew: true
      };
      
      setEditForm(prev => ({ ...prev, newVideo: tempVideo }));

      const progressInterval = setInterval(() => {
        setEditForm(prev => ({
          ...prev,
          newVideo: prev.newVideo && prev.newVideo.id === videoId
            ? { ...prev.newVideo, progress: Math.min((prev.newVideo.progress || 0) + 10, 90) }
            : prev.newVideo
        }));
      }, 100);

      const result = await uploadToCloudinary(file, 'video', videoId);
      
      clearInterval(progressInterval);
      
      if (result) {
        setEditForm(prev => ({
          ...prev,
          newVideo: {
            ...tempVideo,
            url: result.url,
            publicId: result.publicId,
            uploading: false,
            progress: 100
          }
        }));
      } else {
        setEditForm(prev => ({ ...prev, newVideo: null }));
      }
    } catch (error) {
      toast.error(`Failed to upload video`);
      setEditForm(prev => ({ ...prev, newVideo: null }));
    }

    setUploading(false);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const removeExistingImage = (index) => {
    const imageToRemove = editForm.existingImages[index];
    if (imageToRemove && imageToRemove.publicId) {
      setEditForm(prev => ({
        ...prev,
        imagesToDelete: [...prev.imagesToDelete, imageToRemove.publicId],
        existingImages: prev.existingImages.filter((_, i) => i !== index)
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        existingImages: prev.existingImages.filter((_, i) => i !== index)
      }));
      toast.warning('Image removed from UI but publicId not found for Cloudinary deletion');
    }
  };

  const removeExistingVideo = () => {
    if (editForm.existingVideo && editForm.existingVideo.publicId) {
      setEditForm(prev => ({
        ...prev,
        videoToDelete: prev.existingVideo.publicId,
        existingVideo: null
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        existingVideo: null
      }));
      toast.warning('Video removed from UI but publicId not found for Cloudinary deletion');
    }
  };

  const removeNewImage = (id) => {
    if (uploadAbortControllers.current[id]) {
      uploadAbortControllers.current[id].abort();
    }
    const imgToRemove = editForm.newImages.find(img => img.id === id);
    if (imgToRemove?.preview) URL.revokeObjectURL(imgToRemove.preview);
    setEditForm(prev => ({
      ...prev,
      newImages: prev.newImages.filter(img => img.id !== id)
    }));
  };

  const removeNewVideo = () => {
    if (uploadAbortControllers.current[editForm.newVideo?.id]) {
      uploadAbortControllers.current[editForm.newVideo.id].abort();
    }
    if (editForm.newVideo?.preview) URL.revokeObjectURL(editForm.newVideo.preview);
    setEditForm(prev => ({ ...prev, newVideo: null }));
  };

  const handleSave = () => {
    onSave({
      rating: editForm.rating,
      title: editForm.title,
      comment: editForm.comment,
      status: editForm.status,
      isAnonymous: editForm.isAnonymous,
      isFeatured: editForm.isFeatured,
      imagesToDelete: editForm.imagesToDelete,
      videoToDelete: editForm.videoToDelete,
      newImages: editForm.newImages.filter(img => img.url).map(img => ({
        url: img.url,
        publicId: img.publicId
      })),
      newVideo: editForm.newVideo?.url ? {
        url: editForm.newVideo.url,
        publicId: editForm.newVideo.publicId
      } : null
    });
  };

  const renderStars = (rating, setRating = false) => {
    const currentRating = rating || 0;
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating && setEditForm({ ...editForm, rating: star })}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= currentRating
                  ? 'fill-[#B88C8D] text-[#B88C8D]'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (!isOpen || !review) return null;

  return (
    <AnimatePresence>
      {isOpen && review && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-gradient-to-r from-[#52665a] to-[#71816F] px-6 py-4 rounded-t-2xl z-10">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Edit Review</h2>
                <p className="text-white/80 text-sm mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>Customer: {review.userName}</p>
              </div>
              
              <div className="p-6 space-y-5">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-[#29362f] mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Rating <span className="text-[#52665a]">*</span>
                  </label>
                  {renderStars(editForm.rating, true)}
                </div>
                
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-[#29362f] mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Review Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-[#e2e3dd]/60 rounded-xl focus:ring-2 focus:ring-[#52665a] focus:border-transparent outline-none bg-white hover:border-[#52665a]/30"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                    placeholder="Review title"
                    maxLength={100}
                  />
                </div>
                
                {/* Comment */}
                <div>
                  <label className="block text-sm font-semibold text-[#29362f] mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Comment <span className="text-[#52665a]">*</span></label>
                  <textarea
                    value={editForm.comment}
                    onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 border-2 border-[#e2e3dd]/60 rounded-xl focus:ring-2 focus:ring-[#52665a] focus:border-transparent outline-none resize-none bg-white hover:border-[#52665a]/30"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                    placeholder="Review comment"
                  />
                </div>
                
                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-[#29362f] mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Status</label>
                  <div className="flex gap-3">
                    {['pending', 'approved', 'rejected'].map((status) => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={editForm.status === status}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          className="w-4 h-4 text-[#52665a] focus:ring-[#52665a]"
                        />
                        <span className="text-sm capitalize text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Media Attachments Section */}
                <div className="border-2 border-dashed border-[#e2e3dd]/60 rounded-xl p-4 bg-[#f7f4ef]">
                  <label className="block text-sm font-semibold text-[#29362f] mb-3" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Media Attachments
                  </label>
                  
                  {/* Existing Images */}
                  {editForm.existingImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-[#52665a]/60 mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Current Images ({editForm.existingImages.length})</p>
                      <div className="grid grid-cols-4 gap-3">
                        {editForm.existingImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img.url}
                              alt={`Review image ${idx + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* New Images */}
                  {editForm.newImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-[#52665a]/60 mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>New Images ({editForm.newImages.length})</p>
                      <div className="grid grid-cols-4 gap-3">
                        {editForm.newImages.map((img) => (
                          <div key={img.id} className="relative group">
                            <div className="relative">
                              <img
                                src={img.preview}
                                alt="New review image"
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              {img.uploading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeNewImage(img.id)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Add Image Button */}
                  <div
                    onClick={() => imageInputRef.current?.click()}
                    className="border-2 border-dashed border-[#e2e3dd]/60 rounded-xl p-3 text-center cursor-pointer hover:border-[#52665a] hover:bg-white transition-all mb-4"
                  >
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <ImageIcon className="w-5 h-5 text-[#52665a]/40 mx-auto mb-1" />
                    <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Add more images (Max 4 total)</p>
                  </div>
                  
                  {/* Existing Video */}
                  {editForm.existingVideo && (
                    <div className="mb-4">
                      <p className="text-xs text-[#52665a]/60 mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Current Video</p>
                      <div className="relative group">
                        <video
                          src={editForm.existingVideo.url}
                          controls
                          className="w-full rounded-lg max-h-32"
                        />
                        <button
                          type="button"
                          onClick={removeExistingVideo}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* New Video */}
                  {editForm.newVideo && (
                    <div className="mb-4">
                      <p className="text-xs text-[#52665a]/60 mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>New Video</p>
                      <div className="relative group">
                        <video
                          src={editForm.newVideo.preview}
                          controls
                          className="w-full rounded-lg max-h-32"
                        />
                        {editForm.newVideo.uploading && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={removeNewVideo}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Add Video Button */}
                  {!editForm.existingVideo && !editForm.newVideo && (
                    <div
                      onClick={() => videoInputRef.current?.click()}
                      className="border-2 border-dashed border-[#e2e3dd]/60 rounded-xl p-3 text-center cursor-pointer hover:border-[#52665a] hover:bg-white transition-all"
                    >
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      <Video className="w-5 h-5 text-[#52665a]/40 mx-auto mb-1" />
                      <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Add video (Max 1)</p>
                    </div>
                  )}
                </div>
                
                {/* Anonymous Flag */}
                {!review.isGuest && (
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.isAnonymous}
                        onChange={(e) => setEditForm({ ...editForm, isAnonymous: e.target.checked })}
                        className="w-4 h-4 text-[#52665a] rounded focus:ring-[#52665a]"
                      />
                      <span className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>Post as anonymous</span>
                    </label>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border-2 border-[#e2e3dd]/60 text-[#29362f] font-semibold rounded-xl hover:bg-[#f7f4ef] transition-all"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || uploading}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#52665a]/25 transition-all disabled:opacity-50"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    {saving ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Main ManageReviews Component
export default function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userRole, setUserRole] = useState('');
  
  const itemsPerPage = 10;

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

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to manage reviews');
        setLoading(false);
        return;
      }
      
      let url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?page=${currentPage}&limit=${itemsPerPage}`;
      
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }
      
      if (ratingFilter !== 'all') {
        url += `&rating=${ratingFilter}`;
      }
      
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalReviews(data.pagination?.total || 0);
      } else {
        toast.error(data.error || 'Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage, statusFilter, ratingFilter]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        setCurrentPage(1);
        fetchReviews();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update review status
  const updateReviewStatus = async (reviewId, status) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = status === 'approved' 
        ? `/api/reviews/${reviewId}/approve`
        : `/api/reviews/${reviewId}/reject`;
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: status === 'rejected' ? JSON.stringify({ moderationNote: 'Review rejected by admin' }) : undefined
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Review ${status} successfully`);
        fetchReviews();
      } else {
        toast.error(data.error || `Failed to ${status} review`);
      }
    } catch (error) {
      console.error('Error updating review status:', error);
      toast.error('Failed to update review status');
    }
  };

  const toggleFeatured = async (reviewId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${reviewId}/featured`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
        fetchReviews();
      } else {
        toast.error(data.error || 'Failed to update featured status');
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast.error('Failed to update featured status');
    }
  };

  // Delete review
  const deleteReview = async () => {
    if (!selectedReview) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Review deleted successfully');
        setIsDeleteModalOpen(false);
        setSelectedReview(null);
        fetchReviews();
      } else {
        toast.error(data.error || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  // Reply to review
  const replyToReview = async () => {
    if (!selectedReview || !replyText.trim()) {
      toast.error('Please enter a reply');
      return;
    }
    
    setIsReplying(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}/reply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ replyText: replyText.trim() })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Reply added successfully');
        setReplyText('');
        setIsViewModalOpen(false);
        fetchReviews();
      } else {
        toast.error(data.error || 'Failed to add reply');
      }
    } catch (error) {
      console.error('Error replying to review:', error);
      toast.error('Failed to add reply');
    } finally {
      setIsReplying(false);
    }
  };

  const handleSaveEdit = async (editForm) => {
    if (!selectedReview) {
      toast.error('No review selected');
      return;
    }
    
    if (!editForm.comment.trim() || editForm.comment.trim().length < 10) {
      toast.error('Comment must be at least 10 characters long');
      return;
    }
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      
      const updateData = {
        rating: editForm.rating,
        title: editForm.title,
        comment: editForm.comment,
        status: editForm.status,
        isAnonymous: editForm.isAnonymous,
        isFeatured: editForm.isFeatured,
        imagesToDelete: editForm.imagesToDelete,
        videoToDelete: editForm.videoToDelete,
        newImages: editForm.newImages.filter(img => img.url).map(img => ({
          url: img.url,
          publicId: img.publicId
        })),
        newVideo: editForm.newVideo?.url ? {
          url: editForm.newVideo.url,
          publicId: editForm.newVideo.publicId
        } : null
      };
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Review updated successfully');
        setIsEditModalOpen(false);
        fetchReviews();
      } else {
        toast.error(data.error || 'Failed to update review');
      }
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
    }
  };

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${star <= rating ? 'fill-[#B88C8D] text-[#B88C8D]' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // View Review Modal
  const ViewReviewModal = () => {
    const [imageViewerOpen, setImageViewerOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [viewerImages, setViewerImages] = useState([]);

    const openImageViewer = (images, index) => {
      const imgArray = images.map(img => img.url);
      setViewerImages(imgArray);
      setCurrentImageIndex(index);
      setImageViewerOpen(true);
    };

    const closeImageViewer = () => {
      setImageViewerOpen(false);
      setViewerImages([]);
      setCurrentImageIndex(0);
    };

    const goToPrevious = (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + viewerImages.length) % viewerImages.length);
    };

    const goToNext = (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % viewerImages.length);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeImageViewer();
      if (e.key === 'ArrowLeft') goToPrevious(e);
      if (e.key === 'ArrowRight') goToNext(e);
    };

    useEffect(() => {
      if (imageViewerOpen) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto';
      };
    }, [imageViewerOpen]);

    return (
      <>
        <AnimatePresence>
          {isViewModalOpen && selectedReview && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4 py-8">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)} />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                >
                  <div className="sticky top-0 bg-gradient-to-r from-[#52665a] to-[#71816F] px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
                    <div>
                      <h2 className="text-xl font-bold text-white" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Review Details</h2>
                      <p className="text-white/80 text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}>Review #{selectedReview._id?.slice(-8)}</p>
                    </div>
                    <button
                      onClick={() => setIsViewModalOpen(false)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <XCircle className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {/* Customer Info */}
                    <div className="bg-[#f7f4ef] rounded-xl p-4 border border-[#e2e3dd]/60">
                      <h3 className="font-semibold text-[#29362f] mb-3" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Customer Information</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#52665a]" />
                          <span className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{selectedReview.userName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#52665a]" />
                          <span className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{selectedReview.email || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#52665a]" />
                          <span className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {new Date(selectedReview.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(selectedReview.status)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    {selectedReview.product && (
                      <div className="bg-[#f7f4ef] rounded-xl p-4 border border-[#e2e3dd]/60">
                        <h3 className="font-semibold text-[#29362f] mb-3" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Product Information</h3>
                        <Link
                          href={`/product/${selectedReview.product.slug || selectedReview.product._id}`}
                          target="_blank"
                          className="flex items-center gap-3 hover:bg-white p-2 rounded-lg transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{selectedReview.productName}</p>
                            <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Product ID: {selectedReview.product._id}</p>
                          </div>
                        </Link>
                      </div>
                    )}
                    
                    {/* Review Content */}
                    <div className="bg-[#f7f4ef] rounded-xl p-4 border border-[#e2e3dd]/60">
                      <h3 className="font-semibold text-[#29362f] mb-3" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Review Content</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Rating:</span>
                          {renderStars(selectedReview.rating)}
                        </div>
                        {selectedReview.title && (
                          <div>
                            <span className="text-sm text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Title:</span>
                            <p className="font-medium text-[#29362f] mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>{selectedReview.title}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-sm text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Comment:</span>
                          <p className="text-[#29362f] mt-1 whitespace-pre-wrap" style={{ fontFamily: FONT_FAMILY_INTER }}>{selectedReview.comment}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Media */}
                    {(selectedReview.images?.length > 0 || selectedReview.video?.url) && (
                      <div className="bg-[#f7f4ef] rounded-xl p-4 border border-[#e2e3dd]/60">
                        <h3 className="font-semibold text-[#29362f] mb-3" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Media Attachments</h3>
                        {selectedReview.images?.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm text-[#52665a]/60 mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Images ({selectedReview.images.length})</p>
                            <div className="grid grid-cols-4 gap-2">
                              {selectedReview.images.slice(0, 4).map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img.url}
                                  alt={`Review image ${idx + 1}`}
                                  className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-[#e2e3dd]/60 hover:border-[#52665a]"
                                  onClick={() => openImageViewer(selectedReview.images, idx)}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {selectedReview.video?.url && (
                          <div>
                            <p className="text-sm text-[#52665a]/60 mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Video</p>
                            <video
                              src={selectedReview.video.url}
                              controls
                              className="w-full rounded-lg max-h-48 border-2 border-[#e2e3dd]/60 hover:border-[#52665a] transition-colors"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Admin Reply */}
                    {selectedReview.reply?.text && (
                      <div className="bg-[#f7f4ef] rounded-xl p-4 border border-[#52665a]/20">
                        <h3 className="font-semibold text-[#52665a] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Admin Reply</h3>
                        <p className="text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{selectedReview.reply.text}</p>
                        <p className="text-xs text-[#52665a]/60 mt-2" style={{ fontFamily: FONT_FAMILY_INTER }}>
                          Replied on {new Date(selectedReview.reply.repliedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => {
                          setIsViewModalOpen(false);
                          setIsEditModalOpen(true);
                        }}
                        className="flex-1 px-4 py-2 border-2 border-[#52665a] text-[#52665a] font-semibold rounded-xl hover:bg-[#52665a] hover:text-white transition-all"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      >
                        <Edit className="w-4 h-4 inline mr-2" />
                        Edit Review
                      </button>
                      {selectedReview.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateReviewStatus(selectedReview._id, 'approved')}
                            className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all"
                            style={{ fontFamily: FONT_FAMILY_INTER }}
                          >
                            <CheckCircle className="w-4 h-4 inline mr-2" />
                            Approve
                          </button>
                          <button
                            onClick={() => updateReviewStatus(selectedReview._id, 'rejected')}
                            className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
                            style={{ fontFamily: FONT_FAMILY_INTER }}
                          >
                            <XCircle className="w-4 h-4 inline mr-2" />
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setIsViewModalOpen(false);
                          setIsDeleteModalOpen(true);
                        }}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Image Viewer Modal */}
        <AnimatePresence>
          {imageViewerOpen && viewerImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
              onClick={closeImageViewer}
            >
              <button
                onClick={closeImageViewer}
                className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white"
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm" style={{ fontFamily: FONT_FAMILY_INTER }}>
                {currentImageIndex + 1} / {viewerImages.length}
              </div>

              <div 
                className="relative w-full h-full flex items-center justify-center px-4 sm:px-12"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={viewerImages[currentImageIndex]}
                  alt={`Review image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg"
                />
              </div>

              {viewerImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 overflow-x-auto max-w-[90%] px-4 py-2 scrollbar-thin scrollbar-thumb-white/30">
                    {viewerImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          idx === currentImageIndex 
                            ? 'border-[#B88C8D] shadow-[0_0_20px_rgba(184,140,141,0.4)]' 
                            : 'border-white/30 hover:border-white/60'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  // Delete Confirmation Modal
  const DeleteConfirmationModal = () => (
    <AnimatePresence>
      {isDeleteModalOpen && selectedReview && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-red-100"
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 rounded-t-2xl">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Delete Review</h2>
              </div>
              
              <div className="p-6">
                <p className="text-[#29362f] mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Are you sure you want to delete this review from <strong className="text-[#52665a]">{selectedReview.userName}</strong>?
                </p>
                <p className="text-sm text-[#52665a]/60 mb-6" style={{ fontFamily: FONT_FAMILY_INTER }}>This action cannot be undone.</p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 px-4 py-2 border-2 border-[#e2e3dd]/60 text-[#29362f] font-semibold rounded-xl hover:bg-[#f7f4ef] transition-all"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteReview}
                    className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <ProtectedRoute pageKey="manage_reviews">
    <div className="min-h-screen bg-[#f7f4ef]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#29362f] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Manage Reviews</h1>
          <p className="text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>View, moderate, and manage customer reviews</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Total Reviews</p>
                <p className="text-2xl font-bold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{totalReviews}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-[#52665a] opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Pending</p>
                <p className="text-2xl font-bold text-yellow-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                  {reviews.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Approved</p>
                <p className="text-2xl font-bold text-green-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                  {reviews.filter(r => r.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Rejected</p>
                <p className="text-2xl font-bold text-red-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                  {reviews.filter(r => r.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500 opacity-50" />
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e3dd]/60 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#52665a]/40" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent outline-none w-64 bg-white hover:border-[#52665a]/30"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                />
              </div>
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent outline-none bg-white hover:border-[#52665a]/30"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              {/* Rating Filter */}
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-2 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent outline-none bg-white hover:border-[#52665a]/30"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Reviews Table */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e3dd]/60 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#52665a]" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare className="w-16 h-16 text-[#52665a]/30 mx-auto mb-4" />
              <p className="text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>No reviews found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-[#f7f4ef] border-b border-[#e2e3dd]/60">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#29362f] uppercase whitespace-nowrap" style={{ fontFamily: FONT_FAMILY_INTER }}>Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#29362f] uppercase whitespace-nowrap" style={{ fontFamily: FONT_FAMILY_INTER }}>Product</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#29362f] uppercase whitespace-nowrap" style={{ fontFamily: FONT_FAMILY_INTER }}>Rating</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#29362f] uppercase whitespace-nowrap" style={{ fontFamily: FONT_FAMILY_INTER }}>Review</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#29362f] uppercase whitespace-nowrap" style={{ fontFamily: FONT_FAMILY_INTER }}>Status</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-[#29362f] uppercase whitespace-nowrap" style={{ fontFamily: FONT_FAMILY_INTER }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e3dd]/30">
                    {reviews.map((review) => (
                      <tr key={review._id} className="hover:bg-[#f7f4ef] transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#29362f] text-sm truncate max-w-[150px]" style={{ fontFamily: FONT_FAMILY_INTER }}>{review.userName}</span>
                            <span className="text-xs text-[#52665a]/60 truncate max-w-[150px]" style={{ fontFamily: FONT_FAMILY_INTER }}>{review.email || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-[#29362f] truncate max-w-[100px] block" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {review.productName || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {renderStars(review.rating)}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-[#29362f] truncate max-w-[150px]" style={{ fontFamily: FONT_FAMILY_INTER }}>{review.title || review.comment}</p>
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(review.status)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setSelectedReview(review);
                                setReplyText(review.reply?.text || '');
                                setIsViewModalOpen(true);
                              }}
                              className="p-1.5 text-[#52665a] hover:bg-[#f7f4ef] rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            
                            {review.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateReviewStatus(review._id, 'approved')}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Approve"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => updateReviewStatus(review._id, 'rejected')}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            
                            <button
                              onClick={() => {
                                setSelectedReview(review);
                                setTimeout(() => {
                                  setIsEditModalOpen(true);
                                }, 0);
                              }}
                              className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            
                            <button
                              onClick={() => canDelete && setSelectedReview(review) && setIsDeleteModalOpen(true)}
                              disabled={!canDelete}
                              className={`p-1.5 rounded-lg transition-colors ${
                                canDelete 
                                  ? 'text-red-600 hover:bg-red-50' 
                                  : 'text-gray-300 cursor-not-allowed'
                              }`}
                              title={canDelete ? 'Delete' : 'Delete disabled for Moderator'}
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
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#e2e3dd]/60">
                  <div className="text-sm text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 text-[#52665a]/60 hover:bg-[#f7f4ef] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 text-[#52665a]/60 hover:bg-[#f7f4ef] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Modals */}
      <ViewReviewModal />
      <EditReviewModal 
        key={selectedReview?._id || 'edit-modal'}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        review={selectedReview}
        onSave={handleSaveEdit}
        saving={saving}
      />
      <DeleteConfirmationModal />
    </div>
    </ProtectedRoute>
  );
}