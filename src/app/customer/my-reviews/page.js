
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Eye, 
//   Edit, 
//   Star,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   RefreshCw,
//   MessageSquare,
//   Clock,
//   CheckCircle,
//   XCircle,
//   X,
//   Search,
//   ImageIcon,
//   Video,
//   Trash2,
//   Upload,
//   Plus
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Link from 'next/link';

// // Edit Review Modal for Customer (with full media management)
// const EditReviewModal = ({ 
//   isOpen, 
//   onClose, 
//   review, 
//   onSave,
//   saving 
// }) => {
//   const [uploading, setUploading] = useState(false);
//   const [editForm, setEditForm] = useState({
//     rating: 5,
//     title: '',
//     comment: '',
//     existingImages: [],
//     newImages: [],
//     imagesToDelete: [],
//     existingVideo: null,
//     newVideo: null,
//     videoToDelete: null
//   });
  
//   const imageInputRef = useRef(null);
//   const videoInputRef = useRef(null);
//   const uploadAbortControllers = useRef({});

//   // Cloudinary configuration
//   const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
//   const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset';

//   // Add this function after the Cloudinary configuration
// const compressImageSmart = async (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
    
//     reader.onload = (event) => {
//       const img = new Image();
//       img.src = event.target.result;
      
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;
        
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
//         // MORE AGGRESSIVE compression - target under 300KB
//         let quality = 0.4; // Default 40% quality
        
//         if (file.size > 5 * 1024 * 1024) {
//           quality = 0.25; // 25% quality for 5MB+ files
//         } else if (file.size > 2 * 1024 * 1024) {
//           quality = 0.3; // 30% quality for 2-5MB files
//         } else if (file.size > 1 * 1024 * 1024) {
//           quality = 0.35; // 35% quality for 1-2MB files
//         } else if (file.size > 500 * 1024) {
//           quality = 0.45; // 45% quality for 500KB-1MB files
//         } else {
//           quality = 0.55; // 55% quality for smaller files
//         }
        
//         canvas.toBlob(
//           (blob) => {
//             const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
//               type: 'image/jpeg',
//               lastModified: Date.now(),
//             });
//             const reduction = ((file.size - blob.size) / file.size * 100).toFixed(1);
//             console.log(`📸 Review Image Compressed: ${(file.size / 1024).toFixed(0)}KB → ${(blob.size / 1024).toFixed(0)}KB (${reduction}% reduction)`);
//             resolve(compressedFile);
//           },
//           'image/jpeg',
//           quality
//         );
//       };
      
//       img.onerror = () => reject(new Error('Failed to load image'));
//     };
    
//     reader.onerror = () => reject(new Error('Failed to read file'));
//   });
// };

//   // Initialize form when review changes
//   useEffect(() => {
//     if (review && isOpen) {
//       setEditForm({
//         rating: review.rating || 5,
//         title: review.title || '',
//         comment: review.comment || '',
//         existingImages: review.images || [],
//         newImages: [],
//         imagesToDelete: [],
//         existingVideo: review.video || null,
//         newVideo: null,
//         videoToDelete: null
//       });
//     }
//   }, [review, isOpen]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       editForm.newImages.forEach(img => {
//         if (img.preview) URL.revokeObjectURL(img.preview);
//       });
//       if (editForm.newVideo?.preview) URL.revokeObjectURL(editForm.newVideo.preview);
//     };
//   }, []);

//   // Upload to Cloudinary with compression
// const uploadToCloudinary = async (file, type, fileId) => {
//   let fileToUpload = file;
  
//   // Compress images before upload
//   if (type === 'image') {
//     try {
//       fileToUpload = await compressImageSmart(file);
//     } catch (error) {
//       console.error('Compression error, using original file:', error);
//       fileToUpload = file;
//     }
//   }
  
//   const formData = new FormData();
//   formData.append('file', fileToUpload);
//   formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
//   const folder = type === 'image' ? 'reviews/images' : 'reviews/videos';
//   formData.append('folder', folder);

//   const abortController = new AbortController();
//   uploadAbortControllers.current[fileId] = abortController;

//   try {
//     const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${type === 'image' ? 'image' : 'video'}/upload`, {
//       method: 'POST',
//       body: formData,
//       signal: abortController.signal
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error?.message || 'Upload failed');
//     }

//     const data = await response.json();
    
//     if (type === 'video') {
//       console.log(`🎥 Video uploaded successfully`);
//     }
    
//     return {
//       url: data.secure_url,
//       publicId: data.public_id
//     };
//   } catch (error) {
//     if (error.name === 'AbortError') {
//       return null;
//     }
//     throw error;
//   } finally {
//     delete uploadAbortControllers.current[fileId];
//   }
// };
//   // Handle image upload
//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
    
//     if (editForm.existingImages.length + editForm.newImages.length + files.length > 4) {
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

//   // Handle video upload
//   const handleVideoUpload = async (e) => {
//     const file = e.target.files[0];
    
//     if (!file) return;
    
//     if (editForm.existingVideo || editForm.newVideo) {
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

//   // Remove existing image
//   const removeExistingImage = (index) => {
//     setEditForm(prev => ({
//       ...prev,
//       imagesToDelete: [...prev.imagesToDelete, prev.existingImages[index]],
//       existingImages: prev.existingImages.filter((_, i) => i !== index)
//     }));
//   };

//   // Remove new image
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

//   // Remove existing video
//   const removeExistingVideo = () => {
//     setEditForm(prev => ({
//       ...prev,
//       videoToDelete: prev.existingVideo,
//       existingVideo: null
//     }));
//   };

//   // Remove new video
//   const removeNewVideo = () => {
//     if (uploadAbortControllers.current[editForm.newVideo?.id]) {
//       uploadAbortControllers.current[editForm.newVideo.id].abort();
//     }
//     if (editForm.newVideo?.preview) URL.revokeObjectURL(editForm.newVideo.preview);
//     setEditForm(prev => ({ ...prev, newVideo: null }));
//   };

//   const handleSave = () => {
//     if (!editForm.comment.trim() || editForm.comment.trim().length < 10) {
//       toast.error('Comment must be at least 10 characters long');
//       return;
//     }
    
//     // Prepare data for save
//     const saveData = {
//       rating: editForm.rating,
//       title: editForm.title,
//       comment: editForm.comment,
//       imagesToDelete: editForm.imagesToDelete.map(img => img.publicId),
//       videoToDelete: editForm.videoToDelete?.publicId || null,
//       newImages: editForm.newImages.filter(img => img.url).map(img => ({
//         url: img.url,
//         publicId: img.publicId
//       })),
//       newVideo: editForm.newVideo?.url ? {
//         url: editForm.newVideo.url,
//         publicId: editForm.newVideo.publicId
//       } : null
//     };
    
//     onSave(saveData);
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

//   const totalImages = editForm.existingImages.length + editForm.newImages.length;
//   const hasVideo = editForm.existingVideo || editForm.newVideo;

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
//               className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#F7C7D3]/40"
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-6 py-4 rounded-t-2xl z-10">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-xl font-bold text-white">Edit Your Review</h2>
//                     <p className="text-white/80 text-sm mt-1">Update your feedback</p>
//                   </div>
//                   <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6 space-y-5">
//                 {/* Product Info */}
//                 <div className="bg-[#FFF5F6] rounded-xl p-3 border border-[#F7C7D3]/40">
//                   <p className="text-xs text-[#EE4275]/60 mb-1">Product</p>
//                   <p className="font-medium text-[#2D1B2E]">{review.productName || 'N/A'}</p>
//                 </div>
                
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
//                   <p className="text-xs text-[#EE4275]/40 mt-1">{editForm.title.length}/100 characters</p>
//                 </div>
                
//                 {/* Comment */}
//                 <div>
//                   <label className="block text-sm font-semibold text-[#2D1B2E] mb-2">Comment <span className="text-[#EE4275]">*</span></label>
//                   <textarea
//                     value={editForm.comment}
//                     onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
//                     rows={4}
//                     className="w-full px-4 py-2.5 border-2 border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none resize-none bg-white hover:border-[#EE4275]/30"
//                     placeholder="Share your experience..."
//                   />
//                   <p className="text-xs text-[#EE4275]/40 mt-1">{editForm.comment.length}/500 characters (minimum 10)</p>
//                 </div>
                 
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

// // View Review Modal for Customer
// const ViewReviewModal = ({ isOpen, onClose, review }) => {
//   const renderStars = (rating) => {
//     return (
//       <div className="flex gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`w-4 h-4 ${star <= rating ? 'fill-[#FFD93D] text-[#FFD93D]' : 'text-gray-300'}`}
//           />
//         ))}
//       </div>
//     );
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
//               className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#F7C7D3]/40"
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-6 py-4 rounded-t-2xl">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h2 className="text-xl font-bold text-white">Your Review</h2>
//                     <p className="text-white/80 text-sm mt-1">Review Details</p>
//                   </div>
//                   <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6 space-y-4">
//                 {/* Product Info */}
//                 <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#F7C7D3]/40">
//                   <h3 className="font-semibold text-[#2D1B2E] mb-2">Product</h3>
//                   <Link
//                     href={`/product/${review.product?.slug || review.product?._id}`}
//                     target="_blank"
//                     className="text-[#EE4275] hover:underline font-medium"
//                   >
//                     {review.productName || 'N/A'}
//                   </Link>
//                 </div>
                
//                 {/* Review Content */}
//                 <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#F7C7D3]/40">
//                   <h3 className="font-semibold text-[#2D1B2E] mb-3">Review Content</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-[#EE4275]/60">Rating:</span>
//                       {renderStars(review.rating)}
//                     </div>
//                     {review.title && (
//                       <div>
//                         <span className="text-sm text-[#EE4275]/60">Title:</span>
//                         <p className="font-medium text-[#2D1B2E] mt-1">{review.title}</p>
//                       </div>
//                     )}
//                     <div>
//                       <span className="text-sm text-[#EE4275]/60">Comment:</span>
//                       <p className="text-[#2D1B2E] mt-1 whitespace-pre-wrap">{review.comment}</p>
//                     </div>
//                     <div className="flex items-center justify-between pt-2 border-t border-[#F7C7D3]/40">
//                       <span className="text-sm text-[#EE4275]/60">Status:</span>
//                       {getStatusBadge(review.status)}
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-[#EE4275]/60">Submitted:</span>
//                       <span className="text-sm text-[#2D1B2E]">
//                         {new Date(review.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Media */}
//                 {(review.images?.length > 0 || review.video?.url) && (
//                   <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#F7C7D3]/40">
//                     <h3 className="font-semibold text-[#2D1B2E] mb-3">Your Media</h3>
//                     {review.images?.length > 0 && (
//                       <div className="mb-3">
//                         <p className="text-xs text-[#EE4275]/60 mb-2">Images ({review.images.length})</p>
//                         <div className="grid grid-cols-4 gap-2">
//                           {review.images.slice(0, 4).map((img, idx) => (
//                             <img
//                               key={idx}
//                               src={img.url}
//                               alt={`Review image ${idx + 1}`}
//                               className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border border-[#F7C7D3]/40"
//                               onClick={() => window.open(img.url, '_blank')}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                     {review.video?.url && (
//                       <div>
//                         <p className="text-xs text-[#EE4275]/60 mb-2">Video</p>
//                         <video
//                           src={review.video.url}
//                           controls
//                           className="w-full rounded-lg max-h-48"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 )}
                
//                 {/* Admin Reply */}
//                 {review.reply?.text && (
//                   <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#EE4275]/20">
//                     <h3 className="font-semibold text-[#EE4275] mb-2">Admin Response</h3>
//                     <p className="text-[#2D1B2E]">{review.reply.text}</p>
//                     <p className="text-xs text-[#EE4275]/60 mt-2">
//                       Replied on {new Date(review.reply.repliedAt).toLocaleString()}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default function CustomerMyReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [filteredReviews, setFilteredReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalReviews, setTotalReviews] = useState(0);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [ratingFilter, setRatingFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const itemsPerPage = 10;

//   // Fetch user's reviews
//   const fetchMyReviews = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login to view your reviews');
//         setLoading(false);
//         return;
//       }
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/my-reviews`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setReviews(data.data || []);
//         setTotalReviews(data.data?.length || 0);
//         applyFilters(data.data || [], statusFilter, ratingFilter, searchTerm);
//       } else {
//         toast.error(data.error || 'Failed to fetch your reviews');
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       toast.error('Failed to load your reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Apply all filters
//   const applyFilters = (reviewsList, status, rating, search) => {
//     let filtered = [...reviewsList];
    
//     if (status !== 'all') {
//       filtered = filtered.filter(r => r.status === status);
//     }
    
//     if (rating !== 'all') {
//       const ratingNum = parseInt(rating);
//       filtered = filtered.filter(r => r.rating === ratingNum);
//     }
    
//     if (search.trim()) {
//       const searchLower = search.toLowerCase();
//       filtered = filtered.filter(r => 
//         r.productName?.toLowerCase().includes(searchLower) ||
//         r.title?.toLowerCase().includes(searchLower) ||
//         r.comment?.toLowerCase().includes(searchLower)
//       );
//     }
    
//     setFilteredReviews(filtered);
//     setTotalPages(Math.ceil(filtered.length / itemsPerPage));
//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     applyFilters(reviews, statusFilter, ratingFilter, searchTerm);
//   }, [statusFilter, ratingFilter, searchTerm, reviews]);

//   useEffect(() => {
//     fetchMyReviews();
//   }, []);

//   // Update review with media changes
// const handleUpdateReview = async (saveData) => {
//   if (!selectedReview) return;
  
//   setSaving(true);
//   try {
//     const token = localStorage.getItem('token');
    
//     console.log('Sending update data:', saveData); // Debug log
    
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}`, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(saveData)
//     });
    
//     const data = await response.json();
//     console.log('Update response:', data); // Debug log
    
//     if (data.success) {
//       toast.success('Review updated successfully');
//       setIsEditModalOpen(false);
//       fetchMyReviews(); // Refresh the list
//     } else {
//       toast.error(data.error || 'Failed to update review');
//     }
//   } catch (error) {
//     console.error('Error updating review:', error);
//     toast.error('Failed to update review');
//   } finally {
//     setSaving(false);
//   }
// };

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

//   const paginatedReviews = filteredReviews.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const resetFilters = () => {
//     setStatusFilter('all');
//     setRatingFilter('all');
//     setSearchTerm('');
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF5F6]">
//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-[#2D1B2E] mb-2">My Reviews</h1>
//           <p className="text-[#EE4275]/60">View and manage all the reviews you've written</p>
//         </div>
        
//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F7C7D3]/40">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-[#EE4275]/60">Total Reviews</p>
//                 <p className="text-2xl font-bold text-[#2D1B2E]">{reviews.length}</p>
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
//                 <p className="text-sm text-[#EE4275]/60">Avg Rating</p>
//                 <p className="text-2xl font-bold text-[#FFD93D]">
//                   {reviews.length > 0 
//                     ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
//                     : '0'}
//                 </p>
//               </div>
//               <Star className="w-8 h-8 text-[#FFD93D] opacity-50 fill-[#FFD93D]" />
//             </div>
//           </div>
//         </div>
        
//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-sm border border-[#F7C7D3]/40 p-4 mb-6">
//           <div className="flex flex-wrap gap-4 items-center justify-between">
//             <div className="flex flex-wrap gap-3">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                 <input
//                   type="text"
//                   placeholder="Search by product or review..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-9 pr-4 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none w-64 bg-white hover:border-[#EE4275]/30"
//                 />
//               </div>
              
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
              
//               {(statusFilter !== 'all' || ratingFilter !== 'all' || searchTerm) && (
//                 <button
//                   onClick={resetFilters}
//                   className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                 >
//                   Clear Filters
//                 </button>
//               )}
//             </div>
            
//           </div>
//         </div>
        
//         {/* Reviews Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-[#F7C7D3]/40 overflow-hidden">
//           {loading ? (
//             <div className="flex items-center justify-center py-20">
//               <Loader2 className="w-8 h-8 animate-spin text-[#EE4275]" />
//             </div>
//           ) : filteredReviews.length === 0 ? (
//             <div className="text-center py-20">
//               <MessageSquare className="w-16 h-16 text-[#EE4275]/30 mx-auto mb-4" />
//               <p className="text-[#EE4275]/60 mb-2">
//                 {reviews.length === 0 
//                   ? "You haven't written any reviews yet" 
//                   : "No reviews match your filters"}
//               </p>
//               {reviews.length === 0 ? (
//                 <Link
//                   href="/products"
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all"
//                 >
//                   Browse Products
//                 </Link>
//               ) : (
//                 <button
//                   onClick={resetFilters}
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all"
//                 >
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[800px]">
//                   <thead className="bg-[#FFF5F6] border-b border-[#F7C7D3]/40">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-[#EE4275]/60 uppercase whitespace-nowrap">Product</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-[#EE4275]/60 uppercase whitespace-nowrap">Rating</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-[#EE4275]/60 uppercase whitespace-nowrap">Review</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-[#EE4275]/60 uppercase whitespace-nowrap">Status</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-[#EE4275]/60 uppercase whitespace-nowrap">Date</th>
//                       <th className="px-4 py-3 text-right text-xs font-semibold text-[#EE4275]/60 uppercase whitespace-nowrap">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-[#F7C7D3]/20">
//                     {paginatedReviews.map((review) => (
//                       <tr key={review._id} className="hover:bg-[#FFF5F6] transition-colors">
//                         <td className="px-4 py-3">
//                           <Link
//                             href={`/product/${review.product?.slug || review.product?._id}`}
//                             target="_blank"
//                             className="text-sm text-[#EE4275] hover:underline font-medium truncate max-w-[200px] block"
//                           >
//                             {review.productName || 'N/A'}
//                           </Link>
//                         </td>
//                         <td className="px-4 py-3">
//                           {renderStars(review.rating)}
//                         </td>
//                         <td className="px-4 py-3">
//                           <p className="text-sm text-[#2D1B2E] truncate max-w-[250px]">
//                             {review.title || review.comment}
//                           </p>
//                         </td>
//                         <td className="px-4 py-3">
//                           {getStatusBadge(review.status)}
//                         </td>
//                         <td className="px-4 py-3">
//                           <span className="text-sm text-[#EE4275]/60 whitespace-nowrap">
//                             {new Date(review.createdAt).toLocaleDateString()}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-right">
//                           <div className="flex items-center justify-end gap-2">
//                             <button
//                               onClick={() => {
//                                 setSelectedReview(review);
//                                 setIsViewModalOpen(true);
//                               }}
//                               className="p-1.5 text-[#EE4275] hover:bg-[#FFF5F6] rounded-lg transition-colors"
//                               title="View"
//                             >
//                               <Eye className="w-4 h-4" />
//                             </button>
//                             {review.status === 'pending' && (
//                               <button
//                                 onClick={() => {
//                                   setSelectedReview(review);
//                                   setIsEditModalOpen(true);
//                                 }}
//                                 className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
//                                 title="Edit"
//                               >
//                                 <Edit className="w-4 h-4" />
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               {totalPages > 1 && (
//                 <div className="flex items-center justify-between px-6 py-4 border-t border-[#F7C7D3]/40">
//                   <div className="text-sm text-[#EE4275]/60">
//                     Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredReviews.length)} of {filteredReviews.length} reviews
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
      
//       <ViewReviewModal
//         isOpen={isViewModalOpen}
//         onClose={() => setIsViewModalOpen(false)}
//         review={selectedReview}
//       />
      
//       <EditReviewModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         review={selectedReview}
//         onSave={handleUpdateReview}
//         saving={saving}
//       />
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Edit, 
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  X,
  Search,
  ImageIcon,
  Video,
  Trash2,
  Upload,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

// Edit Review Modal for Customer (with full media management)
const EditReviewModal = ({ 
  isOpen, 
  onClose, 
  review, 
  onSave,
  saving 
}) => {
  const [uploading, setUploading] = useState(false);
  const [editForm, setEditForm] = useState({
    rating: 5,
    title: '',
    comment: '',
    existingImages: [],
    newImages: [],
    imagesToDelete: [],
    existingVideo: null,
    newVideo: null,
    videoToDelete: null
  });
  
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const uploadAbortControllers = useRef({});

  // Cloudinary configuration
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
              console.log(`📸 Review Image Compressed: ${(file.size / 1024).toFixed(0)}KB → ${(blob.size / 1024).toFixed(0)}KB`);              resolve(compressedFile);
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
    
    if (editForm.existingImages.length + editForm.newImages.length + files.length > 4) {
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
    
    if (editForm.existingVideo || editForm.newVideo) {
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
    setEditForm(prev => ({
      ...prev,
      imagesToDelete: [...prev.imagesToDelete, prev.existingImages[index]],
      existingImages: prev.existingImages.filter((_, i) => i !== index)
    }));
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

  const removeExistingVideo = () => {
    setEditForm(prev => ({
      ...prev,
      videoToDelete: prev.existingVideo,
      existingVideo: null
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
    if (!editForm.comment.trim() || editForm.comment.trim().length < 10) {
      toast.error('Comment must be at least 10 characters long');
      return;
    }
    
    const saveData = {
      rating: editForm.rating,
      title: editForm.title,
      comment: editForm.comment,
      imagesToDelete: editForm.imagesToDelete.map(img => img.publicId),
      videoToDelete: editForm.videoToDelete?.publicId || null,
      newImages: editForm.newImages.filter(img => img.url).map(img => ({
        url: img.url,
        publicId: img.publicId
      })),
      newVideo: editForm.newVideo?.url ? {
        url: editForm.newVideo.url,
        publicId: editForm.newVideo.publicId
      } : null
    };
    
    onSave(saveData);
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
                  ? 'fill-[#FFD93D] text-[#FFD93D]'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (!isOpen || !review) return null;

  const totalImages = editForm.existingImages.length + editForm.newImages.length;
  const hasVideo = editForm.existingVideo || editForm.newVideo;

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
              className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#c5d5be]/40"
            >
              <div className="sticky top-0 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] px-6 py-4 rounded-t-2xl z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-light text-white">Edit Your Review</h2>
                    <p className="text-white/80 text-sm mt-1">Update your feedback</p>
                  </div>
                  <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-5">
                {/* Product Info */}
                <div className="bg-[#f0f5ed] rounded-xl p-3 border border-[#c5d5be]/40">
                  <p className="text-xs text-[#53645a] mb-1">Product</p>
                  <p className="font-medium text-[#263b32]">{review.productName || 'N/A'}</p>
                </div>
                
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-[#263b32] mb-2">
                    Rating <span className="text-[#8B9D83]">*</span>
                  </label>
                  {renderStars(editForm.rating, true)}
                </div>
                
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-[#263b32] mb-2">Review Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-[#c5d5be]/50 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                    placeholder="Review title"
                    maxLength={100}
                  />
                  <p className="text-xs text-[#53645a] mt-1">{editForm.title.length}/100 characters</p>
                </div>
                
                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-[#263b32] mb-2">Comment <span className="text-[#8B9D83]">*</span></label>
                  <textarea
                    value={editForm.comment}
                    onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 border-2 border-[#c5d5be]/50 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none resize-none bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                    placeholder="Share your experience..."
                  />
                  <p className="text-xs text-[#53645a] mt-1">{editForm.comment.length}/500 characters (minimum 10)</p>
                </div>
                 
                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border-2 border-[#c5d5be]/50 text-[#263b32] font-medium rounded-xl hover:bg-[#f0f5ed] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || uploading}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all disabled:opacity-50"
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

// View Review Modal for Customer
const ViewReviewModal = ({ isOpen, onClose, review }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-[#FFD93D] text-[#FFD93D]' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
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
              className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#c5d5be]/40"
            >
              <div className="sticky top-0 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-light text-white">Your Review</h2>
                    <p className="text-white/80 text-sm mt-1">Review Details</p>
                  </div>
                  <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Product Info */}
                <div className="bg-[#f0f5ed] rounded-xl p-4 border border-[#c5d5be]/40">
                  <h3 className="font-medium text-[#263b32] mb-2">Product</h3>
                  <Link
                    href={`/product/${review.product?.slug || review.product?._id}`}
                    target="_blank"
                    className="text-[#8B9D83] hover:underline font-medium"
                  >
                    {review.productName || 'N/A'}
                  </Link>
                </div>
                
                {/* Review Content */}
                <div className="bg-[#f0f5ed] rounded-xl p-4 border border-[#c5d5be]/40">
                  <h3 className="font-medium text-[#263b32] mb-3">Review Content</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#53645a]">Rating:</span>
                      {renderStars(review.rating)}
                    </div>
                    {review.title && (
                      <div>
                        <span className="text-sm text-[#53645a]">Title:</span>
                        <p className="font-medium text-[#263b32] mt-1">{review.title}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-[#53645a]">Comment:</span>
                      <p className="text-[#263b32] mt-1 whitespace-pre-wrap">{review.comment}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#c5d5be]/40">
                      <span className="text-sm text-[#53645a]">Status:</span>
                      {getStatusBadge(review.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#53645a]">Submitted:</span>
                      <span className="text-sm text-[#263b32]">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Media */}
                {(review.images?.length > 0 || review.video?.url) && (
                  <div className="bg-[#f0f5ed] rounded-xl p-4 border border-[#c5d5be]/40">
                    <h3 className="font-medium text-[#263b32] mb-3">Your Media</h3>
                    {review.images?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-[#53645a] mb-2">Images ({review.images.length})</p>
                        <div className="grid grid-cols-4 gap-2">
                          {review.images.slice(0, 4).map((img, idx) => (
                            <img
                              key={idx}
                              src={img.url}
                              alt={`Review image ${idx + 1}`}
                              className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border border-[#c5d5be]/40"
                              onClick={() => window.open(img.url, '_blank')}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {review.video?.url && (
                      <div>
                        <p className="text-xs text-[#53645a] mb-2">Video</p>
                        <video
                          src={review.video.url}
                          controls
                          className="w-full rounded-lg max-h-48"
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Admin Reply */}
                {review.reply?.text && (
                  <div className="bg-[#f0f5ed] rounded-xl p-4 border border-[#8B9D83]/20">
                    <h3 className="font-medium text-[#8B9D83] mb-2">Admin Response</h3>
                    <p className="text-[#263b32]">{review.reply.text}</p>
                    <p className="text-xs text-[#53645a] mt-2">
                      Replied on {new Date(review.reply.repliedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function CustomerMyReviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const itemsPerPage = 10;

  // Fetch user's reviews
  const fetchMyReviews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to view your reviews');
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/my-reviews`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data || []);
        setTotalReviews(data.data?.length || 0);
        applyFilters(data.data || [], statusFilter, ratingFilter, searchTerm);
      } else {
        toast.error(data.error || 'Failed to fetch your reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load your reviews');
    } finally {
      setLoading(false);
    }
  };

  // Apply all filters
  const applyFilters = (reviewsList, status, rating, search) => {
    let filtered = [...reviewsList];
    
    if (status !== 'all') {
      filtered = filtered.filter(r => r.status === status);
    }
    
    if (rating !== 'all') {
      const ratingNum = parseInt(rating);
      filtered = filtered.filter(r => r.rating === ratingNum);
    }
    
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(r => 
        r.productName?.toLowerCase().includes(searchLower) ||
        r.title?.toLowerCase().includes(searchLower) ||
        r.comment?.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredReviews(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters(reviews, statusFilter, ratingFilter, searchTerm);
  }, [statusFilter, ratingFilter, searchTerm, reviews]);

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const handleUpdateReview = async (saveData) => {
    if (!selectedReview) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${selectedReview._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saveData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Review updated successfully');
        setIsEditModalOpen(false);
        fetchMyReviews();
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

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${star <= rating ? 'fill-[#FFD93D] text-[#FFD93D]' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setStatusFilter('all');
    setRatingFilter('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-[#f8f7f2]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-[#263b32] mb-2">My Reviews</h1>
          <p className="text-[#53645a]">View and manage all the reviews you've written</p>
        </div>
        
        {/* Stats Cards - Green Theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c5d5be]/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#53645a]">Total Reviews</p>
                <p className="text-2xl font-bold text-[#263b32]">{reviews.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-[#8B9D83] opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c5d5be]/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#53645a]">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {reviews.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c5d5be]/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#53645a]">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {reviews.filter(r => r.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c5d5be]/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#53645a]">Avg Rating</p>
                <p className="text-2xl font-bold text-[#FFD93D]">
                  {reviews.length > 0 
                    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                    : '0'}
                </p>
              </div>
              <Star className="w-8 h-8 text-[#FFD93D] opacity-50 fill-[#FFD93D]" />
            </div>
          </div>
        </div>
        
        {/* Filters - Green Theme */}
        <div className="bg-white rounded-xl shadow-sm border border-[#c5d5be]/40 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8B9D83]/40" />
                <input
                  type="text"
                  placeholder="Search by product or review..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none w-64 bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-2 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              
              {(statusFilter !== 'all' || ratingFilter !== 'all' || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Reviews Table - Green Theme */}
        <div className="bg-white rounded-xl shadow-sm border border-[#c5d5be]/40 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#8B9D83]" />
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare className="w-16 h-16 text-[#8B9D83]/30 mx-auto mb-4" />
              <p className="text-[#53645a] mb-2">
                {reviews.length === 0 
                  ? "You haven't written any reviews yet" 
                  : "No reviews match your filters"}
              </p>
              {reviews.length === 0 ? (
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all"
                >
                  Browse Products
                </Link>
              ) : (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-[#f0f5ed] border-b border-[#c5d5be]/40">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#53645a] uppercase whitespace-nowrap">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#53645a] uppercase whitespace-nowrap">Rating</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#53645a] uppercase whitespace-nowrap">Review</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#53645a] uppercase whitespace-nowrap">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#53645a] uppercase whitespace-nowrap">Date</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-[#53645a] uppercase whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c5d5be]/20">
                    {paginatedReviews.map((review) => (
                      <tr key={review._id} className="hover:bg-[#f0f5ed] transition-colors">
                        <td className="px-4 py-3">
                          <Link
                            href={`/product/${review.product?.slug || review.product?._id}`}
                            target="_blank"
                            className="text-sm text-[#8B9D83] hover:underline font-medium truncate max-w-[200px] block"
                          >
                            {review.productName || 'N/A'}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          {renderStars(review.rating)}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-[#263b32] truncate max-w-[250px]">
                            {review.title || review.comment}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(review.status)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-[#53645a] whitespace-nowrap">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedReview(review);
                                setIsViewModalOpen(true);
                              }}
                              className="p-1.5 text-[#8B9D83] hover:bg-[#f0f5ed] rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {review.status === 'pending' && (
                              <button
                                onClick={() => {
                                  setSelectedReview(review);
                                  setIsEditModalOpen(true);
                                }}
                                className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#c5d5be]/40">
                  <div className="text-sm text-[#53645a]">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredReviews.length)} of {filteredReviews.length} reviews
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 text-[#53645a] hover:bg-[#f0f5ed] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 text-[#53645a] hover:bg-[#f0f5ed] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
      
      <ViewReviewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        review={selectedReview}
      />
      
      <EditReviewModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        review={selectedReview}
        onSave={handleUpdateReview}
        saving={saving}
      />
    </div>
  );
}