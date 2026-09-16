
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import {
//   Save,
//   ArrowLeft,
//   Loader2,
//   Plus,
//   Trash2,
//   Upload,
//   X,
//   Image as ImageIcon,
//   Megaphone,
//   RefreshCw,
//   Eye,
//   GripVertical
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
// const ACCENT_RED = '#CC1C34';

// // ============================================================
// // CLOUDINARY UPLOAD
// // ============================================================
// const uploadToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append(
//     'upload_preset',
//     process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget'
//   );

//   const response = await fetch(
//     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//     { method: 'POST', body: formData }
//   );

//   const data = await response.json();
//   if (data.secure_url) {
//     return data.secure_url;
//   }
//   throw new Error(data.error?.message || 'Upload failed');
// };

// // ============================================================
// // ID GENERATOR
// // ============================================================
// const generateId = () =>
//   `tmp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// // ============================================================
// // IMAGE UPLOAD FIELD
// // ============================================================
// function ImageUploadField({ imageUrl, onChange, label }) {
//   const fileRef = useRef(null);
//   const [uploading, setUploading] = useState(false);

//   const handleFile = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('Max file size: 5MB');
//       return;
//     }

//     setUploading(true);
//     try {
//       const url = await uploadToCloudinary(file);
//       onChange(url);
//       toast.success('Image uploaded');
//     } catch (err) {
//       console.error(err);
//       toast.error('Upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <label className="mb-2 block text-xs font-medium text-gray-700">
//         {label}
//       </label>
//       {imageUrl ? (
//         <div className="relative inline-block">
//           <div className="h-28 w-48 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100">
//             <img
//               src={imageUrl}
//               alt="Banner"
//               className="h-full w-full object-cover"
//             />
//           </div>
//           {uploading && (
//             <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
//               <Loader2 className="h-6 w-6 animate-spin text-white" />
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={() => onChange('')}
//             className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow"
//           >
//             <X className="h-3 w-3" />
//           </button>
//         </div>
//       ) : (
//         <button
//           type="button"
//           onClick={() => fileRef.current?.click()}
//           disabled={uploading}
//           className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition hover:opacity-90 disabled:opacity-50"
//           style={{ backgroundColor: ACCENT_RED }}
//         >
//           {uploading ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <Upload className="h-4 w-4" />
//           )}
//           {uploading ? 'Uploading...' : 'Upload Image'}
//         </button>
//       )}
//       <input
//         ref={fileRef}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={handleFile}
//       />
//     </div>
//   );
// }

// // ============================================================
// // MAIN PAGE
// // ============================================================
// export default function BannerManagementPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [slides, setSlides] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);

//   // Drag state — track which item is being dragged
//   const [draggedSlideIndex, setDraggedSlideIndex] = useState(null);
//   const [draggedAnnIndex, setDraggedAnnIndex] = useState(null);
//   const [dragOverSlideIndex, setDragOverSlideIndex] = useState(null);
//   const [dragOverAnnIndex, setDragOverAnnIndex] = useState(null);

//   // ============================================================
//   // FETCH
//   // ============================================================
//   const fetchBanner = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_URL}/api/banners/admin`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.status === 401) {
//         router.push('/login');
//         return;
//       }

//       const data = await response.json();
//       if (data.success && data.data) {
//         // Sort by displayOrder to ensure correct initial order
//         const sortedSlides = (data.data.slides || [])
//           .map((s) => ({
//             ...s,
//             _id: s._id,
//             bgImage: s.bgImage || '',
//             ctaLabel: s.ctaLabel || '',
//             ctaHref: s.ctaHref || '/products',
//             isActive: s.isActive !== false
//           }))
//           .sort(
//             (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
//           );

//         const sortedAnns = (data.data.announcements || [])
//           .map((a) => ({
//             ...a,
//             _id: a._id,
//             text: a.text || '',
//             isActive: a.isActive !== false
//           }))
//           .sort((a, b) => (a.order || 0) - (b.order || 0));

//         setSlides(sortedSlides);
//         setAnnouncements(sortedAnns);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to load banner');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBanner();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ============================================================
//   // SLIDE HELPERS
//   // ============================================================
//   const addSlide = () => {
//     setSlides((prev) => [
//       ...prev,
//       {
//         tmpId: generateId(),
//         bgImage: '',
//         ctaLabel: '',
//         ctaHref: '/products',
//         isActive: true
//       }
//     ]);
//   };

//   const updateSlide = (i, field, value) => {
//     setSlides((prev) =>
//       prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
//     );
//   };

//   const removeSlide = (i) => {
//     if (!confirm('Delete this slide?')) return;
//     setSlides((prev) => prev.filter((_, idx) => idx !== i));
//   };

//   // ============================================================
//   // SLIDE DRAG & DROP
//   // ============================================================
//   const handleSlideDragStart = (e, index) => {
//     setDraggedSlideIndex(index);
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', index.toString());
//   };

//   const handleSlideDragOver = (e, index) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//     if (dragOverSlideIndex !== index) {
//       setDragOverSlideIndex(index);
//     }
//   };

//   const handleSlideDrop = (e, dropIndex) => {
//     e.preventDefault();
//     const dragIndex = draggedSlideIndex;

//     if (dragIndex === null || dragIndex === dropIndex) {
//       setDraggedSlideIndex(null);
//       setDragOverSlideIndex(null);
//       return;
//     }

//     setSlides((prev) => {
//       const updated = [...prev];
//       const [removed] = updated.splice(dragIndex, 1);
//       updated.splice(dropIndex, 0, removed);
//       return updated;
//     });

//     setDraggedSlideIndex(null);
//     setDragOverSlideIndex(null);
//     toast.success('Slide reordered');
//   };

//   const handleSlideDragEnd = () => {
//     setDraggedSlideIndex(null);
//     setDragOverSlideIndex(null);
//   };

//   // ============================================================
//   // ANNOUNCEMENT HELPERS
//   // ============================================================
//   const addAnnouncement = () => {
//     setAnnouncements((prev) => [
//       ...prev,
//       { tmpId: generateId(), text: '', isActive: true }
//     ]);
//   };

//   const updateAnnouncement = (i, field, value) => {
//     setAnnouncements((prev) =>
//       prev.map((a, idx) => (idx === i ? { ...a, [field]: value } : a))
//     );
//   };

//   const removeAnnouncement = (i) => {
//     if (!confirm('Delete this announcement?')) return;
//     setAnnouncements((prev) => prev.filter((_, idx) => idx !== i));
//   };

//   // ============================================================
//   // ANNOUNCEMENT DRAG & DROP
//   // ============================================================
//   const handleAnnDragStart = (e, index) => {
//     setDraggedAnnIndex(index);
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/plain', index.toString());
//   };

//   const handleAnnDragOver = (e, index) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//     if (dragOverAnnIndex !== index) {
//       setDragOverAnnIndex(index);
//     }
//   };

//   const handleAnnDrop = (e, dropIndex) => {
//     e.preventDefault();
//     const dragIndex = draggedAnnIndex;

//     if (dragIndex === null || dragIndex === dropIndex) {
//       setDraggedAnnIndex(null);
//       setDragOverAnnIndex(null);
//       return;
//     }

//     setAnnouncements((prev) => {
//       const updated = [...prev];
//       const [removed] = updated.splice(dragIndex, 1);
//       updated.splice(dropIndex, 0, removed);
//       return updated;
//     });

//     setDraggedAnnIndex(null);
//     setDragOverAnnIndex(null);
//     toast.success('Announcement reordered');
//   };

//   const handleAnnDragEnd = () => {
//     setDraggedAnnIndex(null);
//     setDragOverAnnIndex(null);
//   };

//   // ============================================================
//   // SAVE
//   // ============================================================
//   const handleSave = async () => {
//     // Validate slides
//     for (const [i, s] of slides.entries()) {
//       if (!s.bgImage) {
//         toast.error(`Slide ${i + 1}: background image is required`);
//         return;
//       }
//     }

//     // Validate announcements
//     for (const [i, a] of announcements.entries()) {
//       if (!a.text.trim()) {
//         toast.error(`Announcement ${i + 1}: text is required`);
//         return;
//       }
//     }

//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${API_URL}/api/banners/admin`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           // Order = current array index → drives carousel order on homepage
//           slides: slides.map((s, idx) => ({
//             _id: s._id || undefined,
//             bgImage: s.bgImage,
//             ctaLabel: s.ctaLabel?.trim() || '',
//             ctaHref: s.ctaHref?.trim() || '/products',
//             displayOrder: idx,
//             isActive: s.isActive !== false
//           })),
//           announcements: announcements.map((a, idx) => ({
//             _id: a._id || undefined,
//             text: a.text.trim(),
//             order: idx,
//             isActive: a.isActive !== false
//           }))
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Banner saved successfully');
//         fetchBanner();
//       } else {
//         toast.error(data.error || 'Save failed');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ============================================================
//   // LOADING
//   // ============================================================
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50">
//         <Loader2
//           className="h-8 w-8 animate-spin"
//           style={{ color: ACCENT_RED }}
//         />
//       </div>
//     );
//   }

//   // ============================================================
//   // RENDER
//   // ============================================================
//   return (
//     <ProtectedRoute pageKey="create_banner">
//       <div className="min-h-screen bg-gray-50">
//         {/* ==================================================
//             HEADER
//         ================================================== */}
//         <div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
//           <div className="flex items-center justify-between px-4 py-4 sm:px-6">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => router.push('/authorize/dashboard')}
//                 className="rounded-lg p-2 transition hover:bg-gray-100"
//               >
//                 <ArrowLeft className="h-5 w-5 text-gray-600" />
//               </button>
//               <div>
//                 <h1 className="flex items-center gap-2 text-xl font-bold text-gray-900">
//                   <ImageIcon
//                     className="h-5 w-5"
//                     style={{ color: ACCENT_RED }}
//                   />
//                   Hero Banner & Announcements
//                 </h1>
//                 <p className="mt-0.5 text-sm text-gray-500">
//                   Drag & drop to reorder slides and announcements
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={fetchBanner}
//                 className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
//                 title="Refresh"
//               >
//                 <RefreshCw className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={saving}
//                 className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
//                 style={{ backgroundColor: ACCENT_RED }}
//               >
//                 {saving ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <Save className="h-4 w-4" />
//                 )}
//                 {saving ? 'Saving...' : 'Save Changes'}
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
//           {/* ==========================================================
//               SLIDES — DRAGGABLE
//           ========================================================== */}
//           <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//             <div className="flex items-center justify-between border-b border-gray-200 p-4">
//               <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
//                 <ImageIcon
//                   className="h-5 w-5"
//                   style={{ color: ACCENT_RED }}
//                 />
//                 Banner Slides
//                 <span className="text-sm font-normal text-gray-400">
//                   ({slides.length})
//                 </span>
//               </h2>
//               <button
//                 onClick={addSlide}
//                 className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
//               >
//                 <Plus className="h-3.5 w-3.5" />
//                 Add Slide
//               </button>
//             </div>

//             <div className="space-y-4 p-4">
//               {slides.map((slide, i) => {
//                 const isDragging = draggedSlideIndex === i;
//                 const isDragOver =
//                   dragOverSlideIndex === i && draggedSlideIndex !== i;

//                 return (
//                   <div
//                     key={slide._id || slide.tmpId || i}
//                     draggable
//                     onDragStart={(e) => handleSlideDragStart(e, i)}
//                     onDragOver={(e) => handleSlideDragOver(e, i)}
//                     onDrop={(e) => handleSlideDrop(e, i)}
//                     onDragEnd={handleSlideDragEnd}
//                     className={`rounded-lg border-2 p-4 transition-all ${
//                       isDragging
//                         ? 'cursor-grabbing border-dashed opacity-50'
//                         : 'cursor-grab'
//                     } ${
//                       isDragOver
//                         ? 'border-dashed border-[#CC1C34] bg-red-50/40'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     <div className="mb-3 flex items-center justify-between">
//                       <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                         <GripVertical
//                           className="h-4 w-4 text-gray-400"
//                           title="Drag to reorder"
//                         />
//                         <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#CC1C34]/10 px-2 text-xs font-semibold text-[#CC1C34]">
//                           #{i + 1}
//                         </span>
//                         Slide {i + 1}
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <label className="flex items-center gap-2 text-xs text-gray-600">
//                           <input
//                             type="checkbox"
//                             checked={slide.isActive !== false}
//                             onChange={(e) =>
//                               updateSlide(i, 'isActive', e.target.checked)
//                             }
//                             className="rounded border-gray-300"
//                           />
//                           Active
//                         </label>
//                         <button
//                           onClick={() => removeSlide(i)}
//                           className="rounded p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                       <ImageUploadField
//                         imageUrl={slide.bgImage}
//                         onChange={(url) => updateSlide(i, 'bgImage', url)}
//                         label="Background Image * (1902 x 630 px)"
//                       />

//                       <div className="space-y-3">
//                         <div>
//                           <label className="mb-1 block text-xs font-medium text-gray-700">
//                             Button Label
//                             <span className="ml-1 text-gray-400">
//                               (leave empty for no button)
//                             </span>
//                           </label>
//                           <input
//                             type="text"
//                             value={slide.ctaLabel || ''}
//                             onChange={(e) =>
//                               updateSlide(i, 'ctaLabel', e.target.value)
//                             }
//                             placeholder="e.g., Shop Now"
//                             className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC1C34] focus:outline-none"
//                           />
//                         </div>

//                         <div>
//                           <label className="mb-1 block text-xs font-medium text-gray-700">
//                             Button Link
//                           </label>
//                           <input
//                             type="text"
//                             value={slide.ctaHref || ''}
//                             onChange={(e) =>
//                               updateSlide(i, 'ctaHref', e.target.value)
//                             }
//                             placeholder="/products"
//                             className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC1C34] focus:outline-none"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//               {slides.length === 0 && (
//                 <div className="py-10 text-center text-sm text-gray-400">
//                   No slides yet. Click &quot;Add Slide&quot; to get started.
//                 </div>
//               )}

//               {slides.length > 1 && (
//                 <p className="pt-1 text-center text-xs text-gray-400">
//                   💡 Drag cards to reorder. Slide #1 shows first in the carousel.
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* ==========================================================
//               ANNOUNCEMENTS — DRAGGABLE
//           ========================================================== */}
//           <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//             <div className="flex items-center justify-between border-b border-gray-200 p-4">
//               <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
//                 <Megaphone
//                   className="h-5 w-5"
//                   style={{ color: ACCENT_RED }}
//                 />
//                 Announcements
//                 <span className="text-sm font-normal text-gray-400">
//                   ({announcements.length})
//                 </span>
//               </h2>
//               <button
//                 onClick={addAnnouncement}
//                 className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
//               >
//                 <Plus className="h-3.5 w-3.5" />
//                 Add Announcement
//               </button>
//             </div>

//             <div className="space-y-3 p-4">
//               {announcements.map((a, i) => {
//                 const isDragging = draggedAnnIndex === i;
//                 const isDragOver =
//                   dragOverAnnIndex === i && draggedAnnIndex !== i;

//                 return (
//                   <div
//                     key={a._id || a.tmpId || i}
//                     draggable
//                     onDragStart={(e) => handleAnnDragStart(e, i)}
//                     onDragOver={(e) => handleAnnDragOver(e, i)}
//                     onDrop={(e) => handleAnnDrop(e, i)}
//                     onDragEnd={handleAnnDragEnd}
//                     className={`flex items-start gap-3 rounded-lg border-2 p-3 transition-all ${
//                       isDragging
//                         ? 'cursor-grabbing border-dashed opacity-50'
//                         : 'cursor-grab'
//                     } ${
//                       isDragOver
//                         ? 'border-dashed border-[#CC1C34] bg-red-50/40'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     <div className="mt-2 flex items-center gap-2 text-xs font-medium text-gray-500">
//                       <GripVertical
//                         className="h-4 w-4 text-gray-400"
//                         title="Drag to reorder"
//                       />
//                       <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#CC1C34]/10 px-2 text-xs font-semibold text-[#CC1C34]">
//                         {i + 1}
//                       </span>
//                     </div>

//                     <div className="flex-1">
//                       <input
//                         type="text"
//                         value={a.text}
//                         onChange={(e) =>
//                           updateAnnouncement(i, 'text', e.target.value)
//                         }
//                         placeholder="e.g., 🚚 Free Delivery on orders over ৳1000"
//                         maxLength={200}
//                         className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC1C34] focus:outline-none"
//                       />
//                       <div className="mt-1 flex items-center justify-between">
//                         <span className="text-xs text-gray-400">
//                           {a.text.length}/200
//                         </span>
//                       </div>
//                     </div>

//                     <label className="flex items-center gap-2 pt-2 text-xs text-gray-600">
//                       <input
//                         type="checkbox"
//                         checked={a.isActive !== false}
//                         onChange={(e) =>
//                           updateAnnouncement(i, 'isActive', e.target.checked)
//                         }
//                         className="rounded border-gray-300"
//                       />
//                       Active
//                     </label>

//                     <button
//                       onClick={() => removeAnnouncement(i)}
//                       className="mt-1.5 rounded p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 );
//               })}

//               {announcements.length === 0 && (
//                 <div className="py-10 text-center text-sm text-gray-400">
//                   No announcements yet. Click &quot;Add Announcement&quot; to get
//                   started.
//                 </div>
//               )}

//               {announcements.length > 1 && (
//                 <p className="pt-1 text-center text-xs text-gray-400">
//                   💡 Drag cards to reorder. Announcements appear left-to-right in
//                   this order.
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* ==========================================================
//               PREVIEW NOTE
//           ========================================================== */}
//           <div className="rounded-lg border border-dashed border-gray-300 bg-white/60 p-4 text-sm text-gray-500">
//             <p className="flex items-start gap-2">
//               <Eye className="mt-0.5 h-4 w-4 flex-shrink-0" />
//               <span>
//                 <strong className="text-gray-700">Preview:</strong> The order
//                 you set here drives the frontend display. Hero slides autoplay
//                 in this order every 5 seconds. Announcements scroll in this
//                 order from right to left. If a slide has no button label, no
//                 button will appear.
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Save,
  ArrowLeft,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
  Megaphone,
  RefreshCw,
  Eye,
  GripVertical
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const ACCENT_RED = '#CC1C34';

// ============================================================
// CLOUDINARY UPLOAD
// ============================================================
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget'
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  const data = await response.json();
  if (data.secure_url) {
    return data.secure_url;
  }
  throw new Error(data.error?.message || 'Upload failed');
};

// ============================================================
// ID GENERATOR
// ============================================================
const generateId = () =>
  `tmp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// ============================================================
// IMAGE UPLOAD FIELD
// ============================================================
function ImageUploadField({ imageUrl, onChange, label }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Max file size: 5MB');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
      toast.success('Image uploaded');
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-700">
        {label}
      </label>
      {imageUrl ? (
        <div className="relative inline-block">
          <div className="h-28 w-48 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100">
            <img
              src={imageUrl}
              alt="Banner"
              className="h-full w-full object-cover"
            />
          </div>
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: ACCENT_RED }}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function BannerManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [slides, setSlides] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Drag state
  const [draggedSlideIndex, setDraggedSlideIndex] = useState(null);
  const [draggedAnnIndex, setDraggedAnnIndex] = useState(null);
  const [dragOverSlideIndex, setDragOverSlideIndex] = useState(null);
  const [dragOverAnnIndex, setDragOverAnnIndex] = useState(null);

  // ============================================================
  // FETCH
  // ============================================================
  const fetchBanner = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/banners/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 401) {
        router.push('/login');
        return;
      }

      const data = await response.json();
      if (data.success && data.data) {
        const sortedSlides = (data.data.slides || [])
          .map((s) => ({
            ...s,
            _id: s._id,
            title: s.title || '', // ✅ per-slide title
            bgImage: s.bgImage || '',
            ctaLabel: s.ctaLabel || '',
            ctaHref: s.ctaHref || '/products',
            isActive: s.isActive !== false
          }))
          .sort(
            (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
          );

        const sortedAnns = (data.data.announcements || [])
          .map((a) => ({
            ...a,
            _id: a._id,
            text: a.text || '',
            isActive: a.isActive !== false
          }))
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        setSlides(sortedSlides);
        setAnnouncements(sortedAnns);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load banner');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================================================
  // SLIDE HELPERS
  // ============================================================
  const addSlide = () => {
    setSlides((prev) => [
      ...prev,
      {
        tmpId: generateId(),
        title: '', // ✅ per-slide title
        bgImage: '',
        ctaLabel: '',
        ctaHref: '/products',
        isActive: true
      }
    ]);
  };

  const updateSlide = (i, field, value) => {
    setSlides((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );
  };

  const removeSlide = (i) => {
    if (!confirm('Delete this slide?')) return;
    setSlides((prev) => prev.filter((_, idx) => idx !== i));
  };

  // ============================================================
  // SLIDE DRAG & DROP
  // ============================================================
  const handleSlideDragStart = (e, index) => {
    setDraggedSlideIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleSlideDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverSlideIndex !== index) {
      setDragOverSlideIndex(index);
    }
  };

  const handleSlideDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = draggedSlideIndex;

    if (dragIndex === null || dragIndex === dropIndex) {
      setDraggedSlideIndex(null);
      setDragOverSlideIndex(null);
      return;
    }

    setSlides((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(dropIndex, 0, removed);
      return updated;
    });

    setDraggedSlideIndex(null);
    setDragOverSlideIndex(null);
    toast.success('Slide reordered');
  };

  const handleSlideDragEnd = () => {
    setDraggedSlideIndex(null);
    setDragOverSlideIndex(null);
  };

  // ============================================================
  // ANNOUNCEMENT HELPERS
  // ============================================================
  const addAnnouncement = () => {
    setAnnouncements((prev) => [
      ...prev,
      { tmpId: generateId(), text: '', isActive: true }
    ]);
  };

  const updateAnnouncement = (i, field, value) => {
    setAnnouncements((prev) =>
      prev.map((a, idx) => (idx === i ? { ...a, [field]: value } : a))
    );
  };

  const removeAnnouncement = (i) => {
    if (!confirm('Delete this announcement?')) return;
    setAnnouncements((prev) => prev.filter((_, idx) => idx !== i));
  };

  // ============================================================
  // ANNOUNCEMENT DRAG & DROP
  // ============================================================
  const handleAnnDragStart = (e, index) => {
    setDraggedAnnIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleAnnDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverAnnIndex !== index) {
      setDragOverAnnIndex(index);
    }
  };

  const handleAnnDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = draggedAnnIndex;

    if (dragIndex === null || dragIndex === dropIndex) {
      setDraggedAnnIndex(null);
      setDragOverAnnIndex(null);
      return;
    }

    setAnnouncements((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(dropIndex, 0, removed);
      return updated;
    });

    setDraggedAnnIndex(null);
    setDragOverAnnIndex(null);
    toast.success('Announcement reordered');
  };

  const handleAnnDragEnd = () => {
    setDraggedAnnIndex(null);
    setDragOverAnnIndex(null);
  };

  // ============================================================
  // SAVE
  // ============================================================
  const handleSave = async () => {
    // Validate slides
    for (const [i, s] of slides.entries()) {
      if (!s.bgImage) {
        toast.error(`Slide ${i + 1}: background image is required`);
        return;
      }
    }

    // Validate announcements
    for (const [i, a] of announcements.entries()) {
      if (!a.text.trim()) {
        toast.error(`Announcement ${i + 1}: text is required`);
        return;
      }
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/banners/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          slides: slides.map((s, idx) => ({
            _id: s._id || undefined,
            title: s.title?.trim() || '', // ✅ per-slide title
            bgImage: s.bgImage,
            ctaLabel: s.ctaLabel?.trim() || '',
            ctaHref: s.ctaHref?.trim() || '/products',
            displayOrder: idx,
            isActive: s.isActive !== false
          })),
          announcements: announcements.map((a, idx) => ({
            _id: a._id || undefined,
            text: a.text.trim(),
            order: idx,
            isActive: a.isActive !== false
          }))
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Banner saved successfully');
        fetchBanner();
      } else {
        toast.error(data.error || 'Save failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: ACCENT_RED }}
        />
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <ProtectedRoute pageKey="create_banner">
      <div className="min-h-screen bg-gray-50">
        {/* ==================================================
            HEADER
        ================================================== */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/authorize/dashboard')}
                className="rounded-lg p-2 transition hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <ImageIcon
                    className="h-5 w-5"
                    style={{ color: ACCENT_RED }}
                  />
                  Hero Banner & Announcements
                </h1>
                <p className="mt-0.5 text-sm text-gray-500">
                  Drag & drop to reorder slides and announcements
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchBanner}
                className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
                title="Refresh"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: ACCENT_RED }}
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
          {/* ==========================================================
              SLIDES — DRAGGABLE
          ========================================================== */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <ImageIcon
                  className="h-5 w-5"
                  style={{ color: ACCENT_RED }}
                />
                Banner Slides
                <span className="text-sm font-normal text-gray-400">
                  ({slides.length})
                </span>
              </h2>
              <button
                onClick={addSlide}
                className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Slide
              </button>
            </div>

            <div className="space-y-4 p-4">
              {slides.map((slide, i) => {
                const isDragging = draggedSlideIndex === i;
                const isDragOver =
                  dragOverSlideIndex === i && draggedSlideIndex !== i;

                return (
                  <div
                    key={slide._id || slide.tmpId || i}
                    draggable
                    onDragStart={(e) => handleSlideDragStart(e, i)}
                    onDragOver={(e) => handleSlideDragOver(e, i)}
                    onDrop={(e) => handleSlideDrop(e, i)}
                    onDragEnd={handleSlideDragEnd}
                    className={`rounded-lg border-2 p-4 transition-all ${
                      isDragging
                        ? 'cursor-grabbing border-dashed opacity-50'
                        : 'cursor-grab'
                    } ${
                      isDragOver
                        ? 'border-dashed border-[#CC1C34] bg-red-50/40'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <GripVertical
                          className="h-4 w-4 text-gray-400"
                          title="Drag to reorder"
                        />
                        <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#CC1C34]/10 px-2 text-xs font-semibold text-[#CC1C34]">
                          #{i + 1}
                        </span>
                        Slide {i + 1}
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-xs text-gray-600">
                          <input
                            type="checkbox"
                            checked={slide.isActive !== false}
                            onChange={(e) =>
                              updateSlide(i, 'isActive', e.target.checked)
                            }
                            className="rounded border-gray-300"
                          />
                          Active
                        </label>
                        <button
                          onClick={() => removeSlide(i)}
                          className="rounded p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <ImageUploadField
                        imageUrl={slide.bgImage}
                        onChange={(url) => updateSlide(i, 'bgImage', url)}
                        label="Background Image * (1902 x 630 px)"
                      />

                      <div className="space-y-3">
                        {/* ✅ NEW: per-slide title */}
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-700">
                            Title
                            <span className="ml-1 text-gray-400">
                              (optional — leave empty to hide)
                            </span>
                          </label>
                          <input
                            type="text"
                            value={slide.title || ''}
                            onChange={(e) =>
                              updateSlide(i, 'title', e.target.value)
                            }
                            placeholder="e.g., Winter Collection 2025"
                            maxLength={120}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC1C34] focus:outline-none"
                          />
                          <span className="mt-0.5 block text-right text-[10px] text-gray-400">
                            {(slide.title || '').length}/120
                          </span>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-700">
                            Button Label
                            <span className="ml-1 text-gray-400">
                              (leave empty for no button)
                            </span>
                          </label>
                          <input
                            type="text"
                            value={slide.ctaLabel || ''}
                            onChange={(e) =>
                              updateSlide(i, 'ctaLabel', e.target.value)
                            }
                            placeholder="e.g., Shop Now"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC1C34] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-700">
                            Button Link
                          </label>
                          <input
                            type="text"
                            value={slide.ctaHref || ''}
                            onChange={(e) =>
                              updateSlide(i, 'ctaHref', e.target.value)
                            }
                            placeholder="/products"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC1C34] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {slides.length === 0 && (
                <div className="py-10 text-center text-sm text-gray-400">
                  No slides yet. Click &quot;Add Slide&quot; to get started.
                </div>
              )}

              {slides.length > 1 && (
                <p className="pt-1 text-center text-xs text-gray-400">
                  💡 Drag cards to reorder. Slide #1 shows first in the carousel.
                </p>
              )}
            </div>
          </div>

          {/* ==========================================================
              ANNOUNCEMENTS — DRAGGABLE
          ========================================================== */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Megaphone
                  className="h-5 w-5"
                  style={{ color: ACCENT_RED }}
                />
                Announcements
                <span className="text-sm font-normal text-gray-400">
                  ({announcements.length})
                </span>
              </h2>
              <button
                onClick={addAnnouncement}
                className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Announcement
              </button>
            </div>

            <div className="space-y-3 p-4">
              {announcements.map((a, i) => {
                const isDragging = draggedAnnIndex === i;
                const isDragOver =
                  dragOverAnnIndex === i && draggedAnnIndex !== i;

                return (
                  <div
                    key={a._id || a.tmpId || i}
                    draggable
                    onDragStart={(e) => handleAnnDragStart(e, i)}
                    onDragOver={(e) => handleAnnDragOver(e, i)}
                    onDrop={(e) => handleAnnDrop(e, i)}
                    onDragEnd={handleAnnDragEnd}
                    className={`flex items-start gap-3 rounded-lg border-2 p-3 transition-all ${
                      isDragging
                        ? 'cursor-grabbing border-dashed opacity-50'
                        : 'cursor-grab'
                    } ${
                      isDragOver
                        ? 'border-dashed border-[#CC1C34] bg-red-50/40'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="mt-2 flex items-center gap-2 text-xs font-medium text-gray-500">
                      <GripVertical
                        className="h-4 w-4 text-gray-400"
                        title="Drag to reorder"
                      />
                      <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#CC1C34]/10 px-2 text-xs font-semibold text-[#CC1C34]">
                        {i + 1}
                      </span>
                    </div>

                    <div className="flex-1">
                      <input
                        type="text"
                        value={a.text}
                        onChange={(e) =>
                          updateAnnouncement(i, 'text', e.target.value)
                        }
                        placeholder="e.g., 🚚 Free Delivery on orders over ৳1000"
                        maxLength={200}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#CC1C34] focus:outline-none"
                      />
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {a.text.length}/200
                        </span>
                      </div>
                    </div>

                    <label className="flex items-center gap-2 pt-2 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        checked={a.isActive !== false}
                        onChange={(e) =>
                          updateAnnouncement(i, 'isActive', e.target.checked)
                        }
                        className="rounded border-gray-300"
                      />
                      Active
                    </label>

                    <button
                      onClick={() => removeAnnouncement(i)}
                      className="mt-1.5 rounded p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}

              {announcements.length === 0 && (
                <div className="py-10 text-center text-sm text-gray-400">
                  No announcements yet. Click &quot;Add Announcement&quot; to get
                  started.
                </div>
              )}

              {announcements.length > 1 && (
                <p className="pt-1 text-center text-xs text-gray-400">
                  💡 Drag cards to reorder. Announcements appear left-to-right in
                  this order.
                </p>
              )}
            </div>
          </div>

          {/* ==========================================================
              PREVIEW NOTE
          ========================================================== */}
          <div className="rounded-lg border border-dashed border-gray-300 bg-white/60 p-4 text-sm text-gray-500">
            <p className="flex items-start gap-2">
              <Eye className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>
                <strong className="text-gray-700">Preview:</strong> Each slide
                can have its own optional title. Title appears on the banner
                (top-left) when set. Hero slides autoplay in this order every 5
                seconds. Announcements scroll in this order from right to left.
                Leave title or button label empty to hide them.
              </span>
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}