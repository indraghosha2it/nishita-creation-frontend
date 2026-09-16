
// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   EyeOff,
//   GripVertical,
//   X,
//   Video,
//   Upload,
//   Loader2,
//   Youtube,
//   Facebook,
//   Instagram,
//   Link as LinkIcon
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';
// import MediaLibraryPicker from '@/app/components/MediaLibraryPicker';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// // ============================================================
// // VIDEO UPLOAD COMPONENT (mirrors Create Product page + live preview)
// // ============================================================
// const VideoUploadField = ({ videoUrl, embedUrl, sourceType, onChange, onRemove }) => {
//   const fileInputRef = useRef(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState('');
//   const [showVideoMediaPicker, setShowVideoMediaPicker] = useState(false);

//   const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
//   const maxVideoSize = 100 * 1024 * 1024;

//   // ---- Extract YouTube video ID (handles watch, youtu.be, embed, and shorts links) ----
//   const getYouTubeVideoId = (url) => {
//     const regex =
//       /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   // ---- Build embeddable URL for preview ----
//   const getEmbedUrl = (url, type) => {
//     if (!url) return '';
//     if (type === 'youtube') {
//       const id = getYouTubeVideoId(url);
//       return id ? `https://www.youtube.com/embed/${id}` : '';
//     }
//     if (type === 'facebook') {
//       return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
//         url
//       )}&show_text=false&width=560`;
//     }
//     if (type === 'instagram') {
//       // Instagram: strip trailing slash and append /embed
//       const clean = url.replace(/\/+$/, '').split('?')[0];
//       return `${clean}/embed`;
//     }
//     return '';
//   };

//   // ---- Upload to Cloudinary ----
//   const uploadVideoToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append(
//       'upload_preset',
//       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket'
//     );
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
//       { method: 'POST', body: formData }
//     );
//     const data = await response.json();
//     if (data.secure_url) return { url: data.secure_url, publicId: data.public_id };
//     throw new Error(data.error?.message || 'Upload failed');
//   };

//   // ---- Handle file select ----
//   const handleFileSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!allowedVideoTypes.includes(file.type)) {
//       const msg = 'Invalid format. Allowed: MP4, WebM, OGG, MOV';
//       setError(msg);
//       toast.error(msg);
//       return;
//     }
//     if (file.size > maxVideoSize) {
//       const msg = 'File too large. Max: 100MB';
//       setError(msg);
//       toast.error(msg);
//       return;
//     }

//     setError('');
//     setIsUploading(true);
//     try {
//       const { url, publicId } = await uploadVideoToCloudinary(file);
//       onChange({ videoUrl: url, videoPublicId: publicId, embedUrl: '', sourceType: 'upload' });
//       toast.success('Video uploaded successfully');
//     } catch (err) {
//       console.error('Upload error:', err);
//       setError('Failed to upload video');
//       toast.error('Failed to upload video');
//     } finally {
//       setIsUploading(false);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   // ---- Media library select ----
//   const handleMediaLibrarySelect = (items) => {
//     if (!items || items.length === 0) return;
//     const item = items[0];
//     if (item.resource_type !== 'video') {
//       toast.error('Please select a video from the media library');
//       return;
//     }
//     onChange({
//       videoUrl: item.url,
//       videoPublicId: item.public_id,
//       embedUrl: '',
//       sourceType: 'upload'
//     });
//     toast.success('Video added from media library');
//     setShowVideoMediaPicker(false);
//   };

//   // ---- Remove ----
//   const handleRemove = () => {
//     if (fileInputRef.current) fileInputRef.current.value = '';
//     onRemove();
//   };

//   // ✅ Whether we have a video to preview
//   const hasUploadedVideo = sourceType === 'upload' && videoUrl;
//   const hasExternalVideo =
//     sourceType !== 'upload' && embedUrl && getEmbedUrl(embedUrl, sourceType);

//   return (
//     <div className="space-y-3">
//       {/* Source type tabs */}
//       <div className="flex flex-wrap gap-2">
//         {[
//           { key: 'upload', label: 'Upload', icon: Upload },
//           { key: 'youtube', label: 'YouTube', icon: Youtube },
//           { key: 'facebook', label: 'Facebook', icon: Facebook },
//           { key: 'instagram', label: 'Instagram', icon: Instagram }
//         ].map(({ key, label, icon: Icon }) => (
//           <button
//             key={key}
//             type="button"
//             onClick={() =>
//               onChange({ sourceType: key, videoUrl: '', videoPublicId: '', embedUrl: '' })
//             }
//             className={`flex-1 min-w-[100px] py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
//               sourceType === key
//                 ? 'bg-[#8B9D83] text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             <Icon className="w-4 h-4" />
//             {label}
//           </button>
//         ))}
//       </div>

//       {/* ---------- UPLOAD SOURCE ---------- */}
//       {sourceType === 'upload' && (
//         <>
//           {hasUploadedVideo ? (
//             <div className="relative">
//               <video src={videoUrl} className="w-full rounded-lg max-h-64" controls />
//               <button
//                 type="button"
//                 onClick={handleRemove}
//                 className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           ) : (
//             <div>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   type="button"
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={isUploading}
//                   className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#8B9D83]/40 bg-[#8B9D83]/5 text-[#8B9D83] hover:bg-[#8B9D83]/10 transition-colors disabled:opacity-50"
//                 >
//                   {isUploading ? (
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                   ) : (
//                     <Upload className="w-5 h-5" />
//                   )}
//                   {isUploading ? 'Uploading...' : 'Upload from Device'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowVideoMediaPicker(true)}
//                   className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#8B9D83]/40 bg-[#8B9D83]/5 text-[#8B9D83] hover:bg-[#8B9D83]/10 transition-colors"
//                 >
//                   <Video className="w-5 h-5" />
//                   Media Library
//                 </button>
//               </div>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="video/*"
//                 className="hidden"
//                 onChange={handleFileSelect}
//                 disabled={isUploading}
//               />
//               <p className="text-xs text-gray-400 mt-2 text-center">
//                 MP4, WebM, MOV (Max 100MB)
//               </p>
//             </div>
//           )}
//         </>
//       )}

//       {/* ---------- EXTERNAL LINK SOURCES ---------- */}
//       {sourceType !== 'upload' && (
//         <div className="space-y-3">
//           {/* URL input */}
//           <div className="relative">
//             <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               value={embedUrl}
//               onChange={(e) => onChange({ embedUrl: e.target.value })}
//               placeholder={
//                 sourceType === 'youtube'
//                   ? 'https://www.youtube.com/watch?v=...'
//                   : sourceType === 'facebook'
//                   ? 'https://www.facebook.com/.../videos/...'
//                   : 'https://www.instagram.com/reel/...'
//               }
//               className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
//             />
//           </div>
//           <p className="text-xs text-gray-400">
//             Paste the {sourceType} video link. Preview appears below.
//           </p>

//           {/* ✅ LIVE PREVIEW IFRAME */}
//           {hasExternalVideo && (
//             <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-black">
//               <iframe
//                 src={getEmbedUrl(embedUrl, sourceType)}
//                 className="w-full aspect-video"
//                 allow="autoplay; encrypted-media; picture-in-picture"
//                 allowFullScreen
//                 title="Video preview"
//               />
//               <button
//                 type="button"
//                 onClick={handleRemove}
//                 className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-10"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           )}

//           {/* Invalid link warning */}
//           {embedUrl && !hasExternalVideo && (
//             <p className="text-xs text-amber-600">
//               ⚠️ Could not detect a valid {sourceType} video from this link. Please
//               check the URL.
//             </p>
//           )}
//         </div>
//       )}

//       {error && <p className="text-xs text-red-500">{error}</p>}

//       {/* Media Library Picker */}
//       <MediaLibraryPicker
//         isOpen={showVideoMediaPicker}
//         onClose={() => setShowVideoMediaPicker(false)}
//         onSelect={handleMediaLibrarySelect}
//         multiple={false}
//         maxSelect={1}
//         currentImages={[]}
//         onlyVideos={true}
//       />
//     </div>
//   );
// };

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function VideoManagementPage() {
//   const [videos, setVideos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingVideo, setEditingVideo] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     type: 'promotional',
//     sourceType: 'upload',
//     videoUrl: '',
//     videoPublicId: '',
//     embedUrl: '',
//     displayOrder: 0,
//     isActive: true
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [dragIndex, setDragIndex] = useState(null);
//   const [dragOverIndex, setDragOverIndex] = useState(null);

//   // ============================================================
//   // FETCH
//   // ============================================================
//   const fetchVideos = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_URL}/api/videos/admin`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (!response.ok) throw new Error('Failed to fetch videos');
//       const data = await response.json();
//       if (data.success) setVideos(data.data);
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       toast.error('Failed to load videos');
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchVideos();
//   }, [fetchVideos]);

//   // ============================================================
//   // FORM
//   // ============================================================
//   const resetForm = () => {
//     setFormData({
//       title: '',
//       type: 'promotional',
//       sourceType: 'upload',
//       videoUrl: '',
//       videoPublicId: '',
//       embedUrl: '',
//       displayOrder: videos.length,
//       isActive: true
//     });
//     setEditingVideo(null);
//   };

//   const openModal = (video = null) => {
//     if (video) {
//       setEditingVideo(video);
//       setFormData({
//         title: video.title || '',
//         type: video.type || 'promotional',
//         sourceType: video.sourceType || 'upload',
//         videoUrl: video.videoUrl || '',
//         videoPublicId: video.videoPublicId || '',
//         embedUrl: video.embedUrl || '',
//         displayOrder: video.displayOrder || 0,
//         isActive: video.isActive !== undefined ? video.isActive : true
//       });
//     } else {
//       resetForm();
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     resetForm();
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleVideoFieldChange = (patch) => {
//     setFormData((prev) => ({ ...prev, ...patch }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.type) {
//       toast.error('Video type is required');
//       return;
//     }
//     if (formData.sourceType === 'upload' && !formData.videoUrl) {
//       toast.error('Please upload a video');
//       return;
//     }
//     if (formData.sourceType !== 'upload' && !formData.embedUrl) {
//       toast.error('Please paste the video link');
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       const token = localStorage.getItem('token');

//       const url = editingVideo
//         ? `${API_URL}/api/videos/admin/${editingVideo._id}`
//         : `${API_URL}/api/videos/admin`;
//       const method = editingVideo ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.error || 'Failed to save video');
//       }

//       const data = await response.json();
//       if (data.success) {
//         await fetchVideos();
//         closeModal();
//         toast.success(editingVideo ? 'Video updated!' : 'Video created!');
//       }
//     } catch (error) {
//       console.error('Save video error:', error);
//       toast.error(error.message || 'Failed to save video');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ============================================================
//   // DELETE / TOGGLE
//   // ============================================================
//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this video?')) return;
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_URL}/api/videos/admin/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (!response.ok) throw new Error('Failed to delete video');
//       await fetchVideos();
//       toast.success('Video deleted!');
//     } catch (error) {
//       console.error('Delete video error:', error);
//       toast.error('Failed to delete video');
//     }
//   };

//   const handleToggleStatus = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_URL}/api/videos/admin/${id}/toggle`, {
//         method: 'PATCH',
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (!response.ok) throw new Error('Failed to toggle status');
//       await fetchVideos();
//     } catch (error) {
//       console.error('Toggle error:', error);
//       toast.error('Failed to toggle video status');
//     }
//   };

//   // ============================================================
//   // DRAG & DROP
//   // ============================================================
//   const handleDragStart = (e, index) => {
//     setDragIndex(index);
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', index.toString());
//   };

//   const handleDragOver = (e, index) => {
//     e.preventDefault();
//     if (dragOverIndex !== index) setDragOverIndex(index);
//   };

//   const handleDragEnd = () => {
//     setDragIndex(null);
//     setDragOverIndex(null);
//   };

//   const handleDrop = async (e, dropIndex) => {
//     e.preventDefault();
//     if (dragIndex === null || dragIndex === dropIndex) {
//       setDragIndex(null);
//       setDragOverIndex(null);
//       return;
//     }
//     const reordered = [...videos];
//     const [draggedItem] = reordered.splice(dragIndex, 1);
//     reordered.splice(dropIndex, 0, draggedItem);
//     const withNewOrder = reordered.map((item, i) => ({ ...item, displayOrder: i }));
//     setVideos(withNewOrder);
//     setDragIndex(null);
//     setDragOverIndex(null);

//     try {
//       const token = localStorage.getItem('token');
//       const orders = withNewOrder.map((v) => ({ id: v._id, displayOrder: v.displayOrder }));
//       const response = await fetch(`${API_URL}/api/videos/admin/reorder`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ orders })
//       });
//       if (!response.ok) throw new Error('Failed to reorder');
//       const data = await response.json();
//       if (data.success) {
//         setVideos(data.data);
//         toast.success('Videos reordered');
//       }
//     } catch (error) {
//       console.error('Reorder error:', error);
//       toast.error('Failed to reorder videos');
//       await fetchVideos();
//     }
//   };

//   // ============================================================
//   // HELPERS
//   // ============================================================
//   const getPreviewSrc = (video) => {
//     if (video.sourceType === 'upload') return video.videoUrl;
//     return null;
//   };

//   const getSourceIcon = (sourceType) => {
//     if (sourceType === 'youtube') return <Youtube className="w-4 h-4 text-red-500" />;
//     if (sourceType === 'facebook') return <Facebook className="w-4 h-4 text-blue-600" />;
//     if (sourceType === 'instagram') return <Instagram className="w-4 h-4 text-pink-500" />;
//     return <Video className="w-4 h-4 text-[#8B9D83]" />;
//   };

//   if (isLoading) {
//     return (
//       <ProtectedRoute pageKey="video_management">
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="text-center">
//             <Loader2 className="w-12 h-12 animate-spin text-[#8B9D83] mx-auto mb-4" />
//             <p className="text-gray-500">Loading videos...</p>
//           </div>
//         </div>
//       </ProtectedRoute>
//     );
//   }

//   // ============================================================
//   // RENDER
//   // ============================================================
//   return (
//     <ProtectedRoute pageKey="video_management">
//       <div className="p-4 md:p-6 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-[#263b32] flex items-center gap-2">
//               <Video className="w-7 h-7 text-[#8B9D83]" />
//               Video Management
//             </h1>
//             <p className="text-gray-500 text-sm mt-1">
//               Manage videos — drag cards to reorder
//             </p>
//           </div>
//           <button
//             onClick={() => openModal()}
//             className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg transition-all"
//           >
//             <Plus className="w-5 h-5" />
//             Add New Video
//           </button>
//         </div>

//         {/* Grid */}
//         {videos.length === 0 ? (
//           <div className="text-center py-12 bg-[#f0f5ed] rounded-2xl border-2 border-dashed border-[#c5d5be]">
//             <Video className="w-16 h-16 text-[#8B9D83]/50 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-[#263b32]">No videos yet</h3>
//             <p className="text-gray-500 text-sm mt-1">
//               Click &quot;Add New Video&quot; to create your first video
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {videos.map((video, index) => {
//               const isDragging = dragIndex === index;
//               const isDragOver = dragOverIndex === index && dragIndex !== index;
//               const previewSrc = getPreviewSrc(video);

//               return (
//                 <div
//                   key={video._id}
//                   draggable
//                   onDragStart={(e) => handleDragStart(e, index)}
//                   onDragOver={(e) => handleDragOver(e, index)}
//                   onDragEnd={handleDragEnd}
//                   onDrop={(e) => handleDrop(e, index)}
//                   className={`group relative bg-white rounded-xl border overflow-hidden transition-all ${
//                     isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'
//                   } ${
//                     isDragOver
//                       ? 'border-[#8B9D83] ring-2 ring-[#8B9D83]/30 shadow-lg'
//                       : 'border-[#c5d5be]/40 hover:shadow-lg'
//                   } ${!video.isActive ? 'opacity-60' : ''}`}
//                 >
//                   {/* Drag Handle */}
//                   <div className="absolute top-2 left-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/90 rounded p-0.5">
//                     <GripVertical className="w-5 h-5 text-gray-500" />
//                   </div>

//                   {/* Order Badge */}
//                   <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
//                     #{index + 1}
//                   </div>

//                   {/* Video preview */}
//                   <div className="relative aspect-video bg-black">
//                     {previewSrc ? (
//                       <video
//                         src={previewSrc}
//                         className="w-full h-full object-cover"
//                         muted
//                         preload="metadata"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-[#f0f5ed]">
//                         {getSourceIcon(video.sourceType)}
//                       </div>
//                     )}

//                     {/* Type badge */}
//                     <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white bg-[#A4222C] capitalize">
//                       {video.type}
//                     </div>

//                     {/* Status badge */}
//                     <div
//                       className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-medium ${
//                         video.isActive
//                           ? 'bg-green-100 text-green-700'
//                           : 'bg-gray-100 text-gray-500'
//                       }`}
//                     >
//                       {video.isActive ? 'Active' : 'Inactive'}
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-4">
//                     <div className="flex items-center gap-2 mb-1">
//                       {getSourceIcon(video.sourceType)}
//                       <span className="text-xs text-gray-500 capitalize">
//                         {video.sourceType}
//                       </span>
//                     </div>
//                     <h3 className="font-semibold text-[#263b32] text-base truncate">
//                       {video.title || 'Untitled Video'}
//                     </h3>

//                     {/* Actions */}
//                     <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#c5d5be]/40">
//                       <button
//                         onClick={() => openModal(video)}
//                         className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-[#8B9D83] hover:bg-[#f0f5ed] rounded-lg transition-colors"
//                       >
//                         <Edit className="w-4 h-4" />
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleToggleStatus(video._id)}
//                         className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
//                           video.isActive
//                             ? 'text-yellow-600 hover:bg-yellow-50'
//                             : 'text-green-600 hover:bg-green-50'
//                         }`}
//                       >
//                         {video.isActive ? (
//                           <>
//                             <EyeOff className="w-4 h-4" />
//                             Hide
//                           </>
//                         ) : (
//                           <>
//                             <Eye className="w-4 h-4" />
//                             Show
//                           </>
//                         )}
//                       </button>
//                       <button
//                         onClick={() => handleDelete(video._id)}
//                         className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Create/Edit Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div
//               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//               onClick={closeModal}
//             />

//             <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               {/* Modal Header */}
//               <div className="sticky top-0 bg-white border-b border-[#c5d5be]/40 p-4 flex items-center justify-between z-10">
//                 <h2 className="text-xl font-bold text-[#263b32]">
//                   {editingVideo ? 'Edit Video' : 'Create New Video'}
//                 </h2>
//                 <button
//                   onClick={closeModal}
//                   className="p-1 hover:bg-[#f0f5ed] rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="p-4 space-y-4">
//                 {/* Type */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Video Type *
//                   </label>
//                   <select
//                     name="type"
//                     value={formData.type}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none transition"
//                   >
//                     <option value="promotional">Promotional</option>
//                     <option value="workshop">Workshop</option>
//                     <option value="review">Review</option>
//                   </select>
//                 </div>

//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Title <span className="text-gray-400 text-xs">(Optional)</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Summer Collection Promo"
//                     className="w-full px-4 py-2 border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none transition"
//                   />
//                 </div>

//                 {/* Video Source */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Video Source *
//                   </label>
//                   <VideoUploadField
//                     videoUrl={formData.videoUrl}
//                     embedUrl={formData.embedUrl}
//                     sourceType={formData.sourceType}
//                     onChange={handleVideoFieldChange}
//                     onRemove={() =>
//                       handleVideoFieldChange({
//                         videoUrl: '',
//                         videoPublicId: '',
//                         embedUrl: ''
//                       })
//                     }
//                   />
//                 </div>

//                 {/* Display Order & Active */}
//                 <div className="flex items-center gap-4">
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Display Order
//                     </label>
//                     <input
//                       type="number"
//                       name="displayOrder"
//                       value={formData.displayOrder}
//                       onChange={handleInputChange}
//                       min="0"
//                       className="w-full px-4 py-2 border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none transition"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 pt-6">
//                     <input
//                       type="checkbox"
//                       id="isActive"
//                       name="isActive"
//                       checked={formData.isActive}
//                       onChange={handleInputChange}
//                       className="w-5 h-5 rounded border-[#c5d5be] text-[#8B9D83] focus:ring-[#8B9D83]/30"
//                     />
//                     <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
//                       Active
//                     </label>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-3 pt-4 border-t border-[#c5d5be]/40">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="flex-1 px-4 py-2 border border-[#c5d5be] text-[#263b32] rounded-xl hover:bg-[#f0f5ed] transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex-1 px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Saving...
//                       </span>
//                     ) : editingVideo ? (
//                       'Update Video'
//                     ) : (
//                       'Create Video'
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </ProtectedRoute>
//   );
// }

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Plus, Edit, Trash2, Eye, EyeOff, GripVertical, X, Video, Upload,
  Loader2, Youtube, Facebook, Instagram, Link as LinkIcon,
  Star, Calendar, Clock, Radio
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import MediaLibraryPicker from '@/app/components/MediaLibraryPicker';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================================
// EMBED HELPERS — SAME logic as the edit modal preview
// ============================================================
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Same resolver the modal uses for its preview iframe
const getEmbedUrl = (url, type) => {
  if (!url) return '';
  if (type === 'youtube') {
    const id = getYouTubeVideoId(url);
    return id ? `https://www.youtube.com/embed/${id}` : '';
  }
  if (type === 'facebook') {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      url
    )}&show_text=false&width=560`;
  }
  if (type === 'instagram') {
    const clean = url.replace(/\/+$/, '').split('?')[0];
    return `${clean}/embed`;
  }
  return '';
};

// ============================================================
// VIDEO UPLOAD FIELD (unchanged)
// ============================================================
const VideoUploadField = ({ videoUrl, embedUrl, sourceType, onChange, onRemove }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [showVideoMediaPicker, setShowVideoMediaPicker] = useState(false);

  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
  const maxVideoSize = 100 * 1024 * 1024;

  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getEmbedUrl = (url, type) => {
    if (!url) return '';
    if (type === 'youtube') {
      const id = getYouTubeVideoId(url);
      return id ? `https://www.youtube.com/embed/${id}` : '';
    }
    if (type === 'facebook') {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`;
    }
    if (type === 'instagram') {
      const clean = url.replace(/\/+$/, '').split('?')[0];
      return `${clean}/embed`;
    }
    return '';
  };

  const uploadVideoToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      { method: 'POST', body: formData }
    );
    const data = await response.json();
    if (data.secure_url) return { url: data.secure_url, publicId: data.public_id };
    throw new Error(data.error?.message || 'Upload failed');
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!allowedVideoTypes.includes(file.type)) {
      const msg = 'Invalid format. Allowed: MP4, WebM, OGG, MOV';
      setError(msg); toast.error(msg); return;
    }
    if (file.size > maxVideoSize) {
      const msg = 'File too large. Max: 100MB';
      setError(msg); toast.error(msg); return;
    }
    setError(''); setIsUploading(true);
    try {
      const { url, publicId } = await uploadVideoToCloudinary(file);
      onChange({ videoUrl: url, videoPublicId: publicId, embedUrl: '', sourceType: 'upload' });
      toast.success('Video uploaded successfully');
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload video');
      toast.error('Failed to upload video');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleMediaLibrarySelect = (items) => {
    if (!items || items.length === 0) return;
    const item = items[0];
    if (item.resource_type !== 'video') {
      toast.error('Please select a video from the media library');
      return;
    }
    onChange({ videoUrl: item.url, videoPublicId: item.public_id, embedUrl: '', sourceType: 'upload' });
    toast.success('Video added from media library');
    setShowVideoMediaPicker(false);
  };

  const handleRemove = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    onRemove();
  };

  const hasUploadedVideo = sourceType === 'upload' && videoUrl;
  const hasExternalVideo = sourceType !== 'upload' && embedUrl && getEmbedUrl(embedUrl, sourceType);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'upload', label: 'Upload', icon: Upload },
          { key: 'youtube', label: 'YouTube', icon: Youtube },
          { key: 'facebook', label: 'Facebook', icon: Facebook },
          // { key: 'instagram', label: 'Instagram', icon: Instagram }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange({ sourceType: key, videoUrl: '', videoPublicId: '', embedUrl: '' })}
            className={`flex-1 min-w-[100px] py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              sourceType === key ? 'bg-[#8B9D83] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {sourceType === 'upload' && (
        <>
          {hasUploadedVideo ? (
            <div className="relative">
              <video src={videoUrl} className="w-full rounded-lg max-h-64" controls />
              <button type="button" onClick={handleRemove} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#8B9D83]/40 bg-[#8B9D83]/5 text-[#8B9D83] hover:bg-[#8B9D83]/10 transition-colors disabled:opacity-50"
                >
                  {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                  {isUploading ? 'Uploading...' : 'Upload from Device'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowVideoMediaPicker(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#8B9D83]/40 bg-[#8B9D83]/5 text-[#8B9D83] hover:bg-[#8B9D83]/10 transition-colors"
                >
                  <Video className="w-5 h-5" />
                  Media Library
                </button>
              </div>
              <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileSelect} disabled={isUploading} />
              <p className="text-xs text-gray-400 mt-2 text-center">MP4, WebM, MOV (Max 100MB)</p>
            </div>
          )}
        </>
      )}

      {sourceType !== 'upload' && (
        <div className="space-y-3">
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={embedUrl}
              onChange={(e) => onChange({ embedUrl: e.target.value })}
              placeholder={
                sourceType === 'youtube' ? 'https://www.youtube.com/watch?v=...'
                : sourceType === 'facebook' ? 'https://www.facebook.com/.../videos/...'
                : 'https://www.instagram.com/reel/...'
              }
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
            />
          </div>
          <p className="text-xs text-gray-400">Paste the {sourceType} video link. Preview appears below.</p>

          {hasExternalVideo && (
            <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-black">
              <iframe
                src={getEmbedUrl(embedUrl, sourceType)}
                className="w-full aspect-video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Video preview"
              />
              <button type="button" onClick={handleRemove} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-10">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {embedUrl && !hasExternalVideo && (
            <p className="text-xs text-amber-600">
              ⚠️ Could not detect a valid {sourceType} video from this link. Please check the URL.
            </p>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      <MediaLibraryPicker
        isOpen={showVideoMediaPicker}
        onClose={() => setShowVideoMediaPicker(false)}
        onSelect={handleMediaLibrarySelect}
        multiple={false}
        maxSelect={1}
        currentImages={[]}
        onlyVideos={true}
      />
    </div>
  );
};

// ============================================================
// LIVE SESSION INLINE FORM
// ============================================================
const LiveSessionForm = ({ onCreated }) => {
  const [data, setData] = useState({ title: '', scheduledAt: '', link: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.scheduledAt) {
      toast.error('Date & time is required');
      return;
    }
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/videos/admin/live-sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: data.title,
          scheduledAt: new Date(data.scheduledAt).toISOString(),
          link: data.link
        })
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Failed to create live session');
      }
      toast.success('Live session added!');
      setData({ title: '', scheduledAt: '', link: '' });
      onCreated && onCreated();
    } catch (err) {
      console.error('Create live session error:', err);
      toast.error(err.message || 'Failed to create live session');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-2xl bg-white border border-[#c5d5be]/40 space-y-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData((p) => ({ ...p, title: e.target.value }))}
            placeholder="e.g., Product Launch Live"
            className="w-full px-3 py-2 text-sm border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Date &amp; Time *
          </label>
          <input
            type="datetime-local"
            value={data.scheduledAt}
            onChange={(e) => setData((p) => ({ ...p, scheduledAt: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
            <LinkIcon className="w-3.5 h-3.5" /> Live Link
          </label>
          <input
            type="url"
            value={data.link}
            onChange={(e) => setData((p) => ({ ...p, link: e.target.value }))}
            placeholder="https://..."
            className="w-full px-3 py-2 text-sm border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add Live Session
        </button>
      </div>
    </form>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function VideoManagementPage() {
  const [videos, setVideos] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveLoading, setIsLiveLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '', type: 'promotional', sourceType: 'upload',
    videoUrl: '', videoPublicId: '', embedUrl: '',
    thumbnail: '',
    isFeatured: false, displayOrder: 0, isActive: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // ============================================================
  // FETCH VIDEOS
  // ============================================================
  const fetchVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/videos/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch videos');
      const data = await response.json();
      if (data.success) setVideos(data.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast.error('Failed to load videos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============================================================
  // FETCH LIVE SESSIONS
  // ============================================================
  const fetchLiveSessions = useCallback(async () => {
    try {
      setIsLiveLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/videos/admin/live-sessions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch live sessions');
      const data = await response.json();
      if (data.success) setLiveSessions(data.data);
    } catch (error) {
      console.error('Error fetching live sessions:', error);
      toast.error('Failed to load live sessions');
    } finally {
      setIsLiveLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
    fetchLiveSessions();
  }, [fetchVideos, fetchLiveSessions]);

  // ============================================================
  // VIDEO FORM
  // ============================================================
  const resetForm = () => {
    setFormData({
      title: '', type: 'promotional', sourceType: 'upload',
      videoUrl: '', videoPublicId: '', embedUrl: '',
      thumbnail: '',
      isFeatured: false, displayOrder: videos.length, isActive: true
    });
    setEditingVideo(null);
  };

  const openModal = (video = null) => {
    if (video) {
      setEditingVideo(video);
      setFormData({
        title: video.title || '',
        type: video.type || 'promotional',
        sourceType: video.sourceType || 'upload',
        videoUrl: video.videoUrl || '',
        videoPublicId: video.videoPublicId || '',
        embedUrl: video.embedUrl || '',
        thumbnail: video.thumbnail || '',
        isFeatured: video.isFeatured || false,
        displayOrder: video.displayOrder || 0,
        isActive: video.isActive !== undefined ? video.isActive : true
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleVideoFieldChange = (patch) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type) { toast.error('Video type is required'); return; }
    if (formData.sourceType === 'upload' && !formData.videoUrl) { toast.error('Please upload a video'); return; }
    if (formData.sourceType !== 'upload' && !formData.embedUrl) { toast.error('Please paste the video link'); return; }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      const url = editingVideo
        ? `${API_URL}/api/videos/admin/${editingVideo._id}`
        : `${API_URL}/api/videos/admin`;
      const method = editingVideo ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save video');
      }
      const data = await response.json();
      if (data.success) {
        await fetchVideos();
        closeModal();
        toast.success(editingVideo ? 'Video updated!' : 'Video created!');
      }
    } catch (error) {
      console.error('Save video error:', error);
      toast.error(error.message || 'Failed to save video');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // VIDEO ACTIONS
  // ============================================================
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/videos/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete video');
      await fetchVideos();
      toast.success('Video deleted!');
    } catch (error) {
      console.error('Delete video error:', error);
      toast.error('Failed to delete video');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/videos/admin/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to toggle status');
      await fetchVideos();
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Failed to toggle video status');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/videos/admin/${id}/toggle-featured`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to toggle featured');
      await fetchVideos();
    } catch (error) {
      console.error('Toggle featured error:', error);
      toast.error('Failed to toggle featured status');
    }
  };

  // ============================================================
  // LIVE SESSION ACTIONS
  // ============================================================
  const handleDeleteLiveSession = async (id) => {
    if (!confirm('Delete this live session?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/videos/admin/live-sessions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete live session');
      await fetchLiveSessions();
      toast.success('Live session deleted');
    } catch (error) {
      console.error('Delete live session error:', error);
      toast.error('Failed to delete live session');
    }
  };

  const handleToggleLiveStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/videos/admin/live-sessions/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to toggle live session');
      await fetchLiveSessions();
    } catch (error) {
      console.error('Toggle live session error:', error);
      toast.error('Failed to toggle live session');
    }
  };

  // ============================================================
  // DRAG & DROP
  // ============================================================
  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragOverIndex !== index) setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null); setDragOverIndex(null); return;
    }
    const reordered = [...videos];
    const [draggedItem] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, draggedItem);
    const withNewOrder = reordered.map((item, i) => ({ ...item, displayOrder: i }));
    setVideos(withNewOrder);
    setDragIndex(null); setDragOverIndex(null);

    try {
      const token = localStorage.getItem('token');
      const orders = withNewOrder.map((v) => ({ id: v._id, displayOrder: v.displayOrder }));
      const response = await fetch(`${API_URL}/api/videos/admin/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orders })
      });
      if (!response.ok) throw new Error('Failed to reorder');
      const data = await response.json();
      if (data.success) {
        setVideos(data.data);
        toast.success('Videos reordered');
      }
    } catch (error) {
      console.error('Reorder error:', error);
      toast.error('Failed to reorder videos');
      await fetchVideos();
    }
  };

  // ============================================================
  // HELPERS
  // ============================================================
  const getSourceIcon = (sourceType) => {
    if (sourceType === 'youtube') return <Youtube className="w-4 h-4 text-red-500" />;
    if (sourceType === 'facebook') return <Facebook className="w-4 h-4 text-blue-600" />;
    if (sourceType === 'instagram') return <Instagram className="w-4 h-4 text-pink-500" />;
    return <Video className="w-4 h-4 text-[#8B9D83]" />;
  };

  return (
    <ProtectedRoute pageKey="video_management">
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-10">

        {/* ============================================================
            SECTION 1 — LIVE SESSION SCHEDULE
            ============================================================ */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#263b32] flex items-center gap-2">
                <Radio className="w-6 h-6 text-[#A4222C]" />
                Live Session Schedule
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Add and manage upcoming live sessions (optional)
              </p>
            </div>
          </div>

          <LiveSessionForm onCreated={fetchLiveSessions} />

          <div className="mt-4">
            {isLiveLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#8B9D83]" />
              </div>
            ) : liveSessions.length === 0 ? (
              <div className="text-center py-8 bg-[#f0f5ed] rounded-2xl border-2 border-dashed border-[#c5d5be]">
                <Calendar className="w-12 h-12 text-[#8B9D83]/50 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No live sessions scheduled yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {liveSessions.map((s) => (
                  <div
                    key={s._id}
                    className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl border bg-white transition-all ${
                      s.isActive
                        ? 'border-[#c5d5be]/60 hover:shadow-sm'
                        : 'border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#A4222C]/5 text-[#A4222C] shrink-0">
                      <div className="text-center leading-none">
                        <div className="text-lg font-bold">
                          {new Date(s.scheduledAt).getDate()}
                        </div>
                        <div className="text-[10px] uppercase font-semibold">
                          {new Date(s.scheduledAt).toLocaleString('en-US', { month: 'short' })}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#263b32] truncate">
                        {s.title || 'Untitled Session'}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(s.scheduledAt).toLocaleString()}
                        </span>
                        {s.link && (
                          <a
                            href={s.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[#A4222C] hover:underline font-medium"
                          >
                            <LinkIcon className="w-3.5 h-3.5" />
                            Join link
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleLiveStatus(s._id)}
                        className={`p-2 rounded-lg transition-colors ${
                          s.isActive ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={s.isActive ? 'Hide' : 'Show'}
                      >
                        {s.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteLiveSession(s._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ============================================================
            SECTION 2 — VIDEOS
            ============================================================ */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#263b32] flex items-center gap-2">
                <Video className="w-6 h-6 text-[#8B9D83]" />
                Videos
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Manage videos — drag cards to reorder
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Add New Video
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#8B9D83]" />
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12 bg-[#f0f5ed] rounded-2xl border-2 border-dashed border-[#c5d5be]">
              <Video className="w-16 h-16 text-[#8B9D83]/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#263b32]">No videos yet</h3>
              <p className="text-gray-500 text-sm mt-1">
                Click &quot;Add New Video&quot; to create your first video
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video, index) => {
                const isDragging = dragIndex === index;
                const isDragOver = dragOverIndex === index && dragIndex !== index;
                const isUploadVideo = video.sourceType === 'upload' && video.videoUrl;
                const embedSrc =
                  video.sourceType !== 'upload' && video.embedUrl
                    ? getEmbedUrl(video.embedUrl, video.sourceType)
                    : '';

                return (
                  <div
                    key={video._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`group relative bg-white rounded-xl border overflow-hidden transition-all ${
                      isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'
                    } ${
                      isDragOver
                        ? 'border-[#8B9D83] ring-2 ring-[#8B9D83]/30 shadow-lg'
                        : 'border-[#c5d5be]/40 hover:shadow-lg'
                    } ${!video.isActive ? 'opacity-60' : ''}`}
                  >
                    <div className="absolute top-2 left-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/90 rounded p-0.5">
                      <GripVertical className="w-5 h-5 text-gray-500" />
                    </div>

                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      #{index + 1}
                    </div>

                    {video.isFeatured && (
                      <div className="absolute top-2 right-2 z-10 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3" fill="currentColor" />
                        Featured
                      </div>
                    )}

                    {/* ==================================================
                        VIDEO PREVIEW — same logic as edit-modal preview
                        (upload → <video>, others → iframe embed)
                        ================================================== */}

                    <div className="relative aspect-video bg-black">
                      {isUploadVideo ? (
                        <video
                          src={video.videoUrl}
                          className="w-full h-full object-cover"
                          muted
                          preload="metadata"
                          playsInline
                        />
                      ) : embedSrc ? (
                        <iframe
                          src={embedSrc}
                          className="w-full h-full border-0"
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          title={video.title || 'Video preview'}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#8B9D83] to-[#6b7d63] flex items-center justify-center">
                          <span className="text-white/90">
                            {getSourceIcon(video.sourceType)}
                          </span>
                        </div>
                      )}

                      {/* Type badge */}
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white bg-[#A4222C] capitalize pointer-events-none">
                        {video.type}
                      </div>

                      {/* Status badge */}
                      <div
                        className={`absolute right-2 px-2 py-1 rounded-lg text-xs font-medium pointer-events-none ${
                          video.isFeatured ? 'top-10' : 'top-2'
                        } ${
                          video.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {video.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        {getSourceIcon(video.sourceType)}
                        <span className="text-xs text-gray-500 capitalize">{video.sourceType}</span>
                      </div>
                      <h3 className="font-semibold text-[#263b32] text-base truncate">
                        {video.title || 'Untitled Video'}
                      </h3>

                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#c5d5be]/40">
                        <button
                          onClick={() => openModal(video)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-[#8B9D83] hover:bg-[#f0f5ed] rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(video._id)}
                          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            video.isFeatured
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          <Star className="w-4 h-4" fill={video.isFeatured ? 'currentColor' : 'none'} />
                          {video.isFeatured ? 'Featured' : 'Feature'}
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#c5d5be]/40">
                        <button
                          onClick={() => handleToggleStatus(video._id)}
                          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            video.isActive
                              ? 'text-yellow-600 hover:bg-yellow-50'
                              : 'text-green-600 hover:bg-green-50'
                          }`}
                        >
                          {video.isActive ? (
                            <><EyeOff className="w-4 h-4" /> Hide</>
                          ) : (
                            <><Eye className="w-4 h-4" /> Show</>
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(video._id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ============================================================
            VIDEO CREATE/EDIT MODAL
            ============================================================ */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />

            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-[#c5d5be]/40 p-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-[#263b32]">
                  {editingVideo ? 'Edit Video' : 'Create New Video'}
                </h2>
                <button onClick={closeModal} className="p-1 hover:bg-[#f0f5ed] rounded-lg transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none transition"
                  >
                    <option value="promotional">Promotional</option>
                    <option value="workshop">Workshop</option>
                    <option value="review">Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Summer Collection Promo"
                    className="w-full px-4 py-2 border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Source *</label>
                  <VideoUploadField
                    videoUrl={formData.videoUrl}
                    embedUrl={formData.embedUrl}
                    sourceType={formData.sourceType}
                    onChange={handleVideoFieldChange}
                    onRemove={() =>
                      handleVideoFieldChange({ videoUrl: '', videoPublicId: '', embedUrl: '' })
                    }
                  />
                </div>

                {/* Optional thumbnail — still supported for reference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thumbnail URL{' '}
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    placeholder="https://example.com/thumbnail.jpg"
                    className="w-full px-4 py-2 border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none transition"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#c5d5be]/40">
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      name="displayOrder"
                      value={formData.displayOrder}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none transition"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-[#c5d5be] text-[#8B9D83] focus:ring-[#8B9D83]/30"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-[#c5d5be] text-amber-500 focus:ring-amber-300"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
                      Featured
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-[#c5d5be]/40">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-[#c5d5be] text-[#263b32] rounded-xl hover:bg-[#f0f5ed] transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </span>
                    ) : editingVideo ? 'Update Video' : 'Create Video'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}