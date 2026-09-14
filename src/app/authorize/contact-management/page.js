


// // app/admin/contact/page.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Save,
//   ArrowLeft,
//   Loader2,
//   Plus,
//   X,
//   Trash2,
//   RefreshCw,
//   GripVertical,
//   MoveUp,
//   MoveDown,
//   Eye as EyeIcon,
//   EyeOff,
//   CheckCircle,
//   XCircle,
//   ChevronDown,
//   ChevronUp,
//   Pencil,
//   Zap,
//   Shield,
//   Users,
//   Star,
//   Clock,
//   Award,
//   Truck,
//   Headphones,
//   Phone,
//   Mail,
//   MapPin,
//   MessageCircle,
//   Globe,
//   Map,
//   Settings,
//   Upload,
//   Image as ImageIcon,
//   Info,
//   AlertTriangle
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';
// import { toast } from 'sonner';

// // Import social icons from react-icons
// import { 
//   FaFacebookF, 
//   FaInstagram, 
//   FaTwitter, 
//   FaLinkedinIn, 
//   FaYoutube,
//   FaTiktok,
//   FaPinterest,
//   FaSnapchat,
//   FaTelegram,
//   FaGithub,
//   FaViber,
//   FaFacebookMessenger
// } from 'react-icons/fa';

// // ============================================================
// // CLOUDINARY HELPER FUNCTIONS
// // ============================================================

// const compressImageSmart = async (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
    
//     reader.onload = (event) => {
//       const img = new window.Image();
//       img.src = event.target.result;
      
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;
        
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
//         let quality = 0.4;
//         if (file.size > 5 * 1024 * 1024) quality = 0.25;
//         else if (file.size > 2 * 1024 * 1024) quality = 0.3;
//         else if (file.size > 1 * 1024 * 1024) quality = 0.35;
//         else if (file.size > 500 * 1024) quality = 0.45;
//         else quality = 0.55;
        
//         canvas.toBlob(
//           (blob) => {
//             const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
//               type: 'image/jpeg',
//               lastModified: Date.now(),
//             });
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

// const uploadToCloudinary = async (file) => {
//   const compressedFile = await compressImageSmart(file);
  
//   const formData = new FormData();
//   formData.append('file', compressedFile);
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

// // ============================================================
// // IMAGE UPLOAD COMPONENT
// // ============================================================

// const ImageUpload = ({ imageUrl, onImageChange, onImageRemove, label = 'Image', aspectRatio = '16/9' }) => {
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
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
      
//       {preview ? (
//         <div className="relative inline-block">
//           <div className={`rounded-lg overflow-hidden border-2 border-blue-500/30 bg-gray-100`}
//                style={{ width: '200px', aspectRatio: aspectRatio }}>
//             <img 
//               src={preview} 
//               alt={label} 
//               className="w-full h-full object-cover"
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
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
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
//       {error && <p className="text-xs text-red-500">{error}</p>}
//     </div>
//   );
// };

// // ============================================================
// // ICON OPTIONS
// // ============================================================

// const QUICK_CONTACT_ICONS = [
//   { value: 'FaWhatsapp', label: 'WhatsApp', icon: MessageCircle },
//   { value: 'FaPhone', label: 'Phone', icon: Phone },
//   { value: 'FaEnvelope', label: 'Email', icon: Mail },
//   { value: 'FaMapMarkerAlt', label: 'Location', icon: MapPin },
// ];

// const SOCIAL_PLATFORMS = [
//   { value: 'facebook', label: 'Facebook', icon: 'FaFacebookF', component: FaFacebookF, color: 'hover:bg-[#1877F2] hover:text-white', bgColor: '#1877F2' },
//   { value: 'instagram', label: 'Instagram', icon: 'FaInstagram', component: FaInstagram, color: 'hover:bg-[#E4405F] hover:text-white', bgColor: '#E4405F' },
//   { value: 'x', label: 'X (Twitter)', icon: 'FaTwitter', component: FaTwitter, color: 'hover:bg-[#000000] hover:text-white', bgColor: '#000000' },
//   { value: 'linkedin', label: 'LinkedIn', icon: 'FaLinkedinIn', component: FaLinkedinIn, color: 'hover:bg-[#0A66C2] hover:text-white', bgColor: '#0A66C2' },
//   { value: 'youtube', label: 'YouTube', icon: 'FaYoutube', component: FaYoutube, color: 'hover:bg-[#FF0000] hover:text-white', bgColor: '#FF0000' },
//   { value: 'tiktok', label: 'TikTok', icon: 'FaTiktok', component: FaTiktok, color: 'hover:bg-[#000000] hover:text-white', bgColor: '#000000' },
//   { value: 'pinterest', label: 'Pinterest', icon: 'FaPinterest', component: FaPinterest, color: 'hover:bg-[#E60023] hover:text-white', bgColor: '#E60023' },
//   { value: 'snapchat', label: 'Snapchat', icon: 'FaSnapchat', component: FaSnapchat, color: 'hover:bg-[#FFFC00] hover:text-black', bgColor: '#FFFC00' },
//   { value: 'telegram', label: 'Telegram', icon: 'FaTelegram', component: FaTelegram, color: 'hover:bg-[#26A5E4] hover:text-white', bgColor: '#26A5E4' },
//   { value: 'github', label: 'GitHub', icon: 'FaGithub', component: FaGithub, color: 'hover:bg-[#181717] hover:text-white', bgColor: '#181717' },
//   { value: 'viber', label: 'Viber', icon: 'FaViber', component: FaViber, color: 'hover:bg-[#7360F2] hover:text-white', bgColor: '#7360F2' },
//   { value: 'messenger', label: 'Messenger', icon: 'FaFacebookMessenger', component: FaFacebookMessenger, color: 'hover:bg-[#00B2FF] hover:text-white', bgColor: '#00B2FF' },
// ];

// // ============================================================
// // DELETE CONFIRMATION MODAL
// // ============================================================

// const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName, itemType }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
//         <div className="p-6">
//           <div className="flex items-center gap-3 text-red-600 mb-4">
//             <Trash2 className="w-6 h-6" />
//             <h3 className="text-lg font-semibold">Delete {itemType}</h3>
//           </div>
//           <p className="text-sm text-gray-600 mb-4">
//             Are you sure you want to delete <strong className="text-blue-600">"{itemName}"</strong>? This action cannot be undone.
//           </p>
//           <div className="flex gap-3 justify-end">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-500/10 rounded-lg transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onConfirm}
//               className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
//             >
//               <Trash2 className="w-4 h-4" />
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // ✅ RESET CONFIRMATION MODAL
// // ============================================================

// const ResetConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-orange-100">
//         <div className="p-6">
//           <div className="flex items-center gap-3 text-orange-600 mb-4">
//             <RefreshCw className="w-6 h-6" />
//             <h3 className="text-lg font-semibold">Reset Contact Page</h3>
//           </div>
//           <div className="flex items-start gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 mb-4">
//             <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
//             <p className="text-sm text-orange-700">
//               This will <strong>permanently delete</strong> all custom content and restore 
//               the default settings. This action <strong>cannot be undone</strong>.
//             </p>
//           </div>
//           <p className="text-sm text-gray-600 mb-4">
//             Are you sure you want to reset the contact page to default configuration?
//           </p>
//           <div className="flex gap-3 justify-end">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onConfirm}
//               className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
//             >
//               <RefreshCw className="w-4 h-4" />
//               Reset
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // QUICK CONTACT ITEM COMPONENT
// // ============================================================

// const QuickContactItem = ({ item, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const IconComponent = QUICK_CONTACT_ICONS.find(i => i.value === item.icon)?.icon || Phone;

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
//       className={`bg-gray-50 rounded-lg border border-gray-200 p-4 transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//       draggable={true}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <div className="flex items-center gap-3">
//         <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
//           <GripVertical className="w-4 h-4" />
//         </div>
//         <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Icon <span className="text-red-500">*</span></label>
//             <select
//               value={item.icon}
//               onChange={(e) => onUpdate(index, { ...item, icon: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//             >
//               {QUICK_CONTACT_ICONS.map(icon => (
//                 <option key={icon.value} value={icon.value}>{icon.label}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Label <span className="text-red-500">*</span></label>
//             <input
//               type="text"
//               value={item.label}
//               onChange={(e) => onUpdate(index, { ...item, label: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Phone"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Value <span className="text-red-500">*</span></label>
//             <input
//               type="text"
//               value={item.value}
//               onChange={(e) => onUpdate(index, { ...item, value: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="+880 1XXXXXXX"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Link <span className="text-red-500">*</span></label>
//             <input
//               type="text"
//               value={item.link}
//               onChange={(e) => onUpdate(index, { ...item, link: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="tel:+8801XXXXXXX"
//             />
//           </div>
//           <div className="col-span-2 flex items-center gap-3">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={item.isActive}
//                 onChange={(e) => onUpdate(index, { ...item, isActive: e.target.checked })}
//                 className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
//               />
//               <span className="text-xs text-gray-700">Active</span>
//             </label>
//             <span className="text-xs text-gray-400">Order: {index + 1}</span>
//             <button
//               type="button"
//               onClick={() => onRemove(index)}
//               className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // SOCIAL LINK ITEM COMPONENT
// // ============================================================

// const SocialLinkItem = ({ link, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const platformData = SOCIAL_PLATFORMS.find(p => p.value === link.platform);
//   const PlatformIcon = platformData?.component || FaFacebookF;

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
//       className={`bg-gray-50 rounded-lg border border-gray-200 p-4 transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//       draggable={true}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <div className="flex items-center gap-3">
//         <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
//           <GripVertical className="w-4 h-4" />
//         </div>
//         <div className="flex-1 grid grid-cols-3 gap-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Platform <span className="text-red-500">*</span></label>
//             <select
//               value={link.platform}
//               onChange={(e) => {
//                 const platform = SOCIAL_PLATFORMS.find(p => p.value === e.target.value);
//                 onUpdate(index, {
//                   ...link,
//                   platform: e.target.value,
//                   icon: platform?.icon || 'FaFacebookF',
//                   color: platform?.color || 'hover:bg-[#1877F2]'
//                 });
//               }}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//             >
//               {SOCIAL_PLATFORMS.map(platform => (
//                 <option key={platform.value} value={platform.value}>
//                   {platform.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">URL <span className="text-red-500">*</span></label>
//             <input
//               type="text"
//               value={link.url}
//               onChange={(e) => onUpdate(index, { ...link, url: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="https://facebook.com/smartgadget"
//             />
//           </div>
//           <div className="flex items-center gap-3">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={link.isActive}
//                 onChange={(e) => onUpdate(index, { ...link, isActive: e.target.checked })}
//                 className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
//               />
//               <span className="text-xs text-gray-700">Active</span>
//             </label>
//             <span className="text-xs text-gray-400">Order: {index + 1}</span>
//             <button
//               type="button"
//               onClick={() => onRemove(index)}
//               className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="mt-2 pt-2 border-t border-gray-200 flex items-center gap-3">
//         <span className="text-xs text-gray-400">Preview:</span>
//         <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
//           <PlatformIcon className="w-4 h-4 text-blue-600" />
//         </div>
//         <span className="text-xs text-gray-500 font-medium">{link.platform}</span>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // FEATURE ITEM COMPONENT
// // ============================================================

// const FeatureItem = ({ feature, index, onUpdate, onRemove }) => {
//   return (
//     <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
//       <div className="flex items-center gap-3">
//         <div className="flex-1 grid grid-cols-3 gap-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Icon <span className="text-red-500">*</span></label>
//             <select
//               value={feature.icon}
//               onChange={(e) => onUpdate(index, { ...feature, icon: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//             >
//               <option value="CheckCircle">Check Circle</option>
//               <option value="Shield">Shield</option>
//               <option value="Truck">Truck</option>
//               <option value="Headphones">Headphones</option>
//               <option value="Clock">Clock</option>
//               <option value="Star">Star</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
//             <input
//               type="text"
//               value={feature.title}
//               onChange={(e) => onUpdate(index, { ...feature, title: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="Quick Response"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
//             <input
//               type="text"
//               value={feature.description}
//               onChange={(e) => onUpdate(index, { ...feature, description: e.target.value })}
//               className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
//               placeholder="We reply within 24 hours"
//             />
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={() => onRemove(index)}
//               className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // MAIN ADMIN COMPONENT
// // ============================================================

// export default function ContactManagement() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [contactData, setContactData] = useState(null);
//   const [activeTab, setActiveTab] = useState('hero');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   // ✅ State for reset modal
//   const [showResetModal, setShowResetModal] = useState(false);

//   // Fetch contact data
//   useEffect(() => {
//     fetchContactData();
//   }, []);

//   const fetchContactData = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/contact/admin', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.status === 403) {
//         const errorData = await response.json().catch(() => ({}));
//         toast.error(errorData.error || 'You do not have permission to manage contact page');
//         setIsLoading(false);
//         return;
//       }

//       if (response.ok) {
//         const result = await response.json();
//         if (result.success && result.data) {
//           const data = result.data;
//           if (!data.leftSide) {
//             data.leftSide = {
//               badge: 'Why Contact Us',
//               title: "We're Here to",
//               subtitle: 'Help You',
//               description: 'Whether you have questions about a product, need assistance with an order, or just want some tech advice - our team is ready to help you.',
//               quickContactTitle: 'Quick Contact',
//               socialTitle: 'Follow Us',
//               features: [
//                 { icon: 'CheckCircle', title: 'Quick Response', description: 'We reply within 24 hours' },
//                 { icon: 'Shield', title: 'Expert Advice', description: 'Get guidance from tech experts' },
//                 { icon: 'Truck', title: 'Order Support', description: 'Track and manage your orders' }
//               ]
//             };
//           }
//           setContactData(data);
//           toast.success('Contact data loaded successfully');
//         }
//       } else {
//         const errorData = await response.json().catch(() => ({}));
//         toast.error(errorData.error || 'Failed to load contact data');
//       }
//     } catch (error) {
//       console.error('Error fetching contact data:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Update contact data
//   const updateContactData = (section, data) => {
//     setContactData(prev => ({
//       ...prev,
//       [section]: data
//     }));
//   };

//   // Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         setIsSubmitting(false);
//         return;
//       }

//       const submitData = {
//         ...contactData,
//         rightSide: contactData.leftSide
//       };
//       delete submitData.leftSide;

//       const response = await fetch('http://localhost:5000/api/contact/admin', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(submitData)
//       });

//       if (response.status === 403) {
//         const errorData = await response.json().catch(() => ({}));
//         toast.error(errorData.error || 'You do not have permission to update contact page');
//         setIsSubmitting(false);
//         return;
//       }

//       const result = await response.json();

//       if (result.success) {
//         toast.success('✅ Contact page updated successfully!');
//         await fetchContactData();
//       } else {
//         toast.error(result.error || 'Failed to update contact page');
//       }
//     } catch (error) {
//       console.error('Error saving contact data:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ✅ Updated Reset handler - shows modal instead of confirm()
//   const handleResetClick = () => {
//     setShowResetModal(true);
//   };

//   const handleResetConfirm = async () => {
//     setShowResetModal(false);
    
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/contact/admin/reset', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const result = await response.json();

//       if (response.status === 403) {
//         toast.error('You do not have permission to reset contact page');
//         return;
//       }

//       if (result.success) {
//         toast.success('Contact page reset to default');
//         await fetchContactData();
//       } else {
//         toast.error(result.error || 'Failed to reset contact page');
//       }
//     } catch (error) {
//       console.error('Error resetting contact:', error);
//       toast.error('Network error. Please try again.');
//     }
//   };

//   // Quick Contact handlers
//   const addQuickContact = () => {
//     const currentItems = contactData?.quickContacts || [];
//     if (currentItems.length >= 4) {
//       toast.error('Maximum 4 quick contact items allowed');
//       return;
//     }
//     const newItem = {
//       icon: 'FaPhone',
//       label: '',
//       value: '',
//       link: '',
//       color: 'bg-blue-600',
//       displayOrder: currentItems.length,
//       isActive: true
//     };
//     updateContactData('quickContacts', [...currentItems, newItem]);
//   };

//   const updateQuickContact = (index, updatedItem) => {
//     const updatedItems = [...contactData.quickContacts];
//     updatedItems[index] = updatedItem;
//     updateContactData('quickContacts', updatedItems);
//   };

//   const removeQuickContact = (index) => {
//     const updatedItems = contactData.quickContacts.filter((_, i) => i !== index);
//     updateContactData('quickContacts', updatedItems);
//   };

//   const moveQuickContact = (fromIndex, toIndex) => {
//     const updatedItems = [...contactData.quickContacts];
//     const [removed] = updatedItems.splice(fromIndex, 1);
//     updatedItems.splice(toIndex, 0, removed);
//     updatedItems.forEach((item, idx) => item.displayOrder = idx);
//     updateContactData('quickContacts', updatedItems);
//   };

//   // Social Links handlers
//   const addSocialLink = () => {
//     const currentLinks = contactData?.socialLinks || [];
//     const newLink = {
//       platform: 'facebook',
//       url: '',
//       icon: 'FaFacebookF',
//       color: 'hover:bg-[#1877F2]',
//       displayOrder: currentLinks.length,
//       isActive: true
//     };
//     updateContactData('socialLinks', [...currentLinks, newLink]);
//   };

//   const updateSocialLink = (index, updatedLink) => {
//     const updatedLinks = [...contactData.socialLinks];
//     updatedLinks[index] = updatedLink;
//     updateContactData('socialLinks', updatedLinks);
//   };

//   const removeSocialLink = (index) => {
//     const updatedLinks = contactData.socialLinks.filter((_, i) => i !== index);
//     updateContactData('socialLinks', updatedLinks);
//   };

//   const moveSocialLink = (fromIndex, toIndex) => {
//     const updatedLinks = [...contactData.socialLinks];
//     const [removed] = updatedLinks.splice(fromIndex, 1);
//     updatedLinks.splice(toIndex, 0, removed);
//     updatedLinks.forEach((item, idx) => item.displayOrder = idx);
//     updateContactData('socialLinks', updatedLinks);
//   };

//   // Features handlers (left side)
//   const addFeature = () => {
//     const currentFeatures = contactData?.leftSide?.features || [];
//     const newFeature = {
//       icon: 'CheckCircle',
//       title: '',
//       description: ''
//     };
//     updateContactData('leftSide', {
//       ...contactData.leftSide,
//       features: [...currentFeatures, newFeature]
//     });
//   };

//   const updateFeature = (index, updatedFeature) => {
//     const updatedFeatures = [...contactData.leftSide.features];
//     updatedFeatures[index] = updatedFeature;
//     updateContactData('leftSide', {
//       ...contactData.leftSide,
//       features: updatedFeatures
//     });
//   };

//   const removeFeature = (index) => {
//     const updatedFeatures = contactData.leftSide.features.filter((_, i) => i !== index);
//     updateContactData('leftSide', {
//       ...contactData.leftSide,
//       features: updatedFeatures
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
//           <p className="text-gray-500 mt-2">Loading contact data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!contactData) {
//     return null;
//   }

//   const { hero, quickContacts, leftSide, socialLinks, map, cta } = contactData;

//   return (
//     <ProtectedRoute pageKey="contact_management">
//       <div className="min-h-screen bg-gray-50">
//         <DeleteConfirmModal
//           isOpen={showDeleteModal}
//           onClose={() => {
//             setShowDeleteModal(false);
//             setDeleteTarget(null);
//           }}
//           onConfirm={() => {
//             if (deleteTarget) {
//               const { type, index } = deleteTarget;
//               if (type === 'quick') removeQuickContact(index);
//               else if (type === 'social') removeSocialLink(index);
//               else if (type === 'feature') removeFeature(index);
//               setShowDeleteModal(false);
//               setDeleteTarget(null);
//               toast.success('Item deleted successfully');
//             }
//           }}
//           itemName={deleteTarget?.name || ''}
//           itemType={deleteTarget?.type || ''}
//         />

//         {/* ✅ Reset Confirmation Modal */}
//         <ResetConfirmationModal
//           isOpen={showResetModal}
//           onClose={() => setShowResetModal(false)}
//           onConfirm={handleResetConfirm}
//         />

//         {/* Header */}
//         <div className="bg-white border-b border-blue-500/20 shadow-lg sticky top-0 z-10">
//           <div className="px-4 sm:px-6 py-3 sm:py-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div className="flex items-center gap-2 sm:gap-4">
               
//                 <div className="min-w-0 flex-1">
//                   <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
//                     <div className="flex items-center gap-2">
//                       <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
//                       <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black truncate">
//                         Contact Page Management
//                       </h1>
//                     </div>
//                     <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
//                       Smart Gadget
//                     </span>
//                   </div>
//                   <p className="text-xs sm:text-sm text-black/70 mt-0.5 sm:mt-1 truncate">
//                     Manage contact page content, quick contacts, and more
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
//                 {/* ✅ Updated Reset button - shows modal */}
//                 <button
//                   onClick={handleResetClick}
//                   className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-orange-500/10 text-orange-600 rounded-lg hover:bg-orange-500/30 transition-colors border border-orange-500/20"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   Reset
//                 </button>
//                 <button
//                   onClick={fetchContactData}
//                   className="p-1.5 sm:p-2 text-black/70 hover:bg-blue-500/20 rounded-lg transition-colors hover:text-black"
//                   title="Refresh"
//                 >
//                   <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-4 sm:p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Tabs */}
//             <div className="flex flex-wrap gap-2 border-b border-blue-500/20 pb-2 bg-white rounded-t-xl shadow-sm border border-blue-500/20 p-4">
//               {[
//                 { id: 'hero', label: 'Hero Section', icon: ImageIcon },
//                 { id: 'quick', label: 'Quick Contact', icon: Phone },
//                 { id: 'left', label: 'Left Side', icon: Settings },
//                 { id: 'social', label: 'Social Links', icon: Globe },
//                 { id: 'map', label: 'Map', icon: Map },
//                 { id: 'cta', label: 'CTA', icon: Zap },
//               ].map(tab => (
//                 <button
//                   key={tab.id}
//                   type="button"
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
//                     activeTab === tab.id
//                       ? 'bg-blue-600 text-white'
//                       : 'text-gray-600 hover:bg-blue-500/10 hover:text-black'
//                   }`}
//                 >
//                   <tab.icon className="w-4 h-4" />
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             {/* Hero Section Tab */}
//             {activeTab === 'hero' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-500/20 p-4 sm:p-6">
//                 <h2 className="text-lg font-semibold text-black flex items-center gap-2 mb-4">
//                   <ImageIcon className="w-5 h-5 text-blue-600" />
//                   Hero Section Settings
//                 </h2>
//                 <div className="grid grid-cols-1 gap-4">
//                   <ImageUpload
//                     imageUrl={hero?.bgImage || ''}
//                     onImageChange={(url) => updateContactData('hero', { ...hero, bgImage: url })}
//                     onImageRemove={() => updateContactData('hero', { ...hero, bgImage: '' })}
//                     label="Background Image"
//                     aspectRatio="16/9"
//                   />
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Badge Text <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={hero?.badge || ''}
//                       onChange={(e) => updateContactData('hero', { ...hero, badge: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                       placeholder="Get in Touch"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={hero?.title || ''}
//                       onChange={(e) => updateContactData('hero', { ...hero, title: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                       placeholder="We'd Love to"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Highlight Text <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={hero?.highlightText || ''}
//                       onChange={(e) => updateContactData('hero', { ...hero, highlightText: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                       placeholder="Hear From You"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Description <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       value={hero?.description || ''}
//                       onChange={(e) => updateContactData('hero', { ...hero, description: e.target.value })}
//                       rows={3}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40 resize-none"
//                       placeholder="Have questions about products, orders, or anything else?"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Quick Contact Tab */}
//             {activeTab === 'quick' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-500/20 p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-lg font-semibold text-black flex items-center gap-2">
//                       <Phone className="w-5 h-5 text-blue-600" />
//                       Quick Contact <span className="text-xs font-normal text-gray-400">(Max 4)</span>
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Manage quick contact cards on the contact page</p>
//                   </div>
//                   {quickContacts?.length < 4 && (
//                     <button
//                       type="button"
//                       onClick={addQuickContact}
//                       className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Add Quick Contact
//                     </button>
//                   )}
//                 </div>

//                 <div className="space-y-3">
//                   {quickContacts?.map((item, index) => (
//                     <QuickContactItem
//                       key={index}
//                       item={item}
//                       index={index}
//                       onUpdate={updateQuickContact}
//                       onRemove={removeQuickContact}
//                       onMove={moveQuickContact}
//                       isFirst={index === 0}
//                       isLast={index === quickContacts.length - 1}
//                     />
//                   ))}
//                 </div>
//                 {quickContacts?.length === 0 && (
//                   <div className="text-center py-8 text-gray-500">
//                     <Phone className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//                     <p>No quick contact items added</p>
//                     <p className="text-sm">Add up to 4 items</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Left Side Tab */}
//             {activeTab === 'left' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-500/20 p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-lg font-semibold text-black flex items-center gap-2">
//                       <Settings className="w-5 h-5 text-blue-600" />
//                       Left Side Content
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Manage the left side content on contact page</p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={addFeature}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Feature
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Badge Text <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={leftSide?.badge || ''}
//                       onChange={(e) => updateContactData('leftSide', { ...leftSide, badge: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                       placeholder="Why Contact Us"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={leftSide?.title || ''}
//                       onChange={(e) => updateContactData('leftSide', { ...leftSide, title: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                       placeholder="We're Here to"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Subtitle <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={leftSide?.subtitle || ''}
//                       onChange={(e) => updateContactData('leftSide', { ...leftSide, subtitle: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                       placeholder="Help You"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Description <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       value={leftSide?.description || ''}
//                       onChange={(e) => updateContactData('leftSide', { ...leftSide, description: e.target.value })}
//                       rows={3}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40 resize-none"
//                       placeholder="Whether you have questions about a product..."
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Quick Contact Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={leftSide?.quickContactTitle || ''}
//                       onChange={(e) => updateContactData('leftSide', { ...leftSide, quickContactTitle: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                       placeholder="Quick Contact"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Social Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={leftSide?.socialTitle || ''}
//                       onChange={(e) => updateContactData('leftSide', { ...leftSide, socialTitle: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                       placeholder="Follow Us"
//                     />
//                   </div>

//                   <div className="border-t border-gray-200 pt-4">
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3">Features</h3>
//                     <div className="space-y-3">
//                       {leftSide?.features && leftSide.features.map((feature, index) => (
//                         <FeatureItem
//                           key={index}
//                           feature={feature}
//                           index={index}
//                           onUpdate={updateFeature}
//                           onRemove={removeFeature}
//                         />
//                       ))}
//                     </div>
//                     {leftSide?.features?.length === 0 && (
//                       <p className="text-gray-400 text-sm py-4 text-center">No features added</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Social Links Tab */}
//             {activeTab === 'social' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-500/20 p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-lg font-semibold text-black flex items-center gap-2">
//                       <Globe className="w-5 h-5 text-blue-600" />
//                       Social Links
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Manage social media links - icon preview shows the actual platform icon</p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={addSocialLink}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Social Link
//                   </button>
//                 </div>

//                 <div className="space-y-3">
//                   {socialLinks?.map((link, index) => (
//                     <SocialLinkItem
//                       key={index}
//                       link={link}
//                       index={index}
//                       onUpdate={updateSocialLink}
//                       onRemove={removeSocialLink}
//                       onMove={moveSocialLink}
//                       isFirst={index === 0}
//                       isLast={index === socialLinks.length - 1}
//                     />
//                   ))}
//                 </div>
//                 {socialLinks?.length === 0 && (
//                   <div className="text-center py-8 text-gray-500">
//                     <Globe className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//                     <p>No social links added</p>
//                   </div>
//                 )}
//               </div>
//             )}

   

// {activeTab === 'map' && (
//   <div className="bg-white rounded-xl shadow-sm border border-blue-500/20 p-4 sm:p-6">
//     <h2 className="text-lg font-semibold text-black flex items-center gap-2 mb-4">
//       <Map className="w-5 h-5 text-blue-600" />
//       Map Settings
//     </h2>
//     <div className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Map Title <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           value={map?.title || ''}
//           onChange={(e) => updateContactData('map', { ...map, title: e.target.value })}
//           className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//           placeholder="Find Us"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Google Maps Embed URL <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           value={map?.embedCode || ''}
//           onChange={(e) => updateContactData('map', { ...map, embedCode: e.target.value })}
//           rows={4}
//           className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40 resize-none"
//           placeholder="https://www.google.com/maps/embed?pb=... or full iframe code"
//         />
//         <p className="text-xs text-gray-400 mt-1">
//           💡 You can paste either the URL or the full iframe code. We'll extract the URL automatically.
//         </p>
//       </div>
//       {/* Preview the map */}
//       {map?.embedCode && (
//         <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
//           <div className="p-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
//             <span className="text-xs text-gray-500">Map Preview</span>
//             <span className="text-xs text-green-600 flex items-center gap-1">
//               <CheckCircle className="w-3 h-3" />
//               Valid
//             </span>
//           </div>
//           <div className="p-2 bg-gray-100">
//             {(() => {
//               // Extract URL from iframe if full code is provided
//               let mapSrc = map.embedCode;
              
//               // If the embedCode contains iframe, extract the src
//               if (map.embedCode && map.embedCode.includes('src="')) {
//                 const srcMatch = map.embedCode.match(/src="([^"]+)"/);
//                 if (srcMatch && srcMatch[1]) {
//                   mapSrc = srcMatch[1];
//                 }
//               }
              
//               // If it's still the full embed code with src, try another pattern
//               if (mapSrc && mapSrc.includes('iframe') && mapSrc.includes('src=')) {
//                 const srcMatch = mapSrc.match(/src=["']([^"']+)["']/);
//                 if (srcMatch && srcMatch[1]) {
//                   mapSrc = srcMatch[1];
//                 }
//               }
              
//               // If it's a URL with http/https, use it directly
//               if (mapSrc && (mapSrc.startsWith('http://') || mapSrc.startsWith('https://'))) {
//                 return (
//                   <iframe
//                     src={mapSrc}
//                     width="100%"
//                     height="200"
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                     className="rounded"
//                     title="Map Preview"
//                   />
//                 );
//               } else {
//                 return (
//                   <div className="p-4 text-center text-red-500">
//                     <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
//                     <p className="text-sm">Invalid map URL format</p>
//                     <p className="text-xs text-gray-400 mt-1">Please paste a valid Google Maps embed URL or iframe code</p>
//                   </div>
//                 );
//               }
//             })()}
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// )}

//             {/* CTA Tab */}
//             {activeTab === 'cta' && (
//               <div className="bg-white rounded-xl shadow-sm border border-blue-500/20 p-4 sm:p-6">
//                 <h2 className="text-lg font-semibold text-black flex items-center gap-2 mb-4">
//                   <Zap className="w-5 h-5 text-blue-600" />
//                   Call to Action Settings
//                 </h2>
//                 <div className="grid grid-cols-1 gap-4">
//                   <ImageUpload
//                     imageUrl={cta?.bgImage || ''}
//                     onImageChange={(url) => updateContactData('cta', { ...cta, bgImage: url })}
//                     onImageRemove={() => updateContactData('cta', { ...cta, bgImage: '' })}
//                     label="CTA Background Image"
//                     aspectRatio="16/9"
//                   />
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Badge <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={cta?.badge || ''}
//                       onChange={(e) => updateContactData('cta', { ...cta, badge: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                       placeholder="Still Have Questions?"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={cta?.title || ''}
//                       onChange={(e) => updateContactData('cta', { ...cta, title: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                       placeholder="We're Here to Help"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Description <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       value={cta?.description || ''}
//                       onChange={(e) => updateContactData('cta', { ...cta, description: e.target.value })}
//                       rows={2}
//                       className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40 resize-none"
//                       placeholder="Our team is ready to assist you with any questions."
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Button Text <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         value={cta?.buttonText || ''}
//                         onChange={(e) => updateContactData('cta', { ...cta, buttonText: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                         placeholder="Call Now"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Button Link <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         value={cta?.buttonLink || ''}
//                         onChange={(e) => updateContactData('cta', { ...cta, buttonLink: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                         placeholder="tel:+8801XXXXXXX"
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Secondary Button Text <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         value={cta?.secondaryButtonText || ''}
//                         onChange={(e) => updateContactData('cta', { ...cta, secondaryButtonText: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                         placeholder="Browse Products"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Secondary Button Link <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         value={cta?.secondaryButtonLink || ''}
//                         onChange={(e) => updateContactData('cta', { ...cta, secondaryButtonLink: e.target.value })}
//                         className="w-full px-3 py-2 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
//                         placeholder="/products"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="flex justify-end pt-4 border-t border-blue-500/20">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>Save Contact Page</span>
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


// app/admin/contact/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Save,
  ArrowLeft,
  Loader2,
  Plus,
  X,
  Trash2,
  RefreshCw,
  GripVertical,
  MoveUp,
  MoveDown,
  Eye as EyeIcon,
  EyeOff,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Pencil,
  Zap,
  Shield,
  Users,
  Star,
  Clock,
  Award,
  Truck,
  Headphones,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Globe,
  Map,
  Settings,
  Upload,
  Image as ImageIcon,
  Info,
  AlertTriangle
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { toast } from 'sonner';

// Import social icons from react-icons
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedinIn, 
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaSnapchat,
  FaTelegram,
  FaGithub,
  FaViber,
  FaFacebookMessenger
} from 'react-icons/fa';

// ============================================================
// CLOUDINARY HELPER FUNCTIONS
// ============================================================

const compressImageSmart = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        let quality = 0.4;
        if (file.size > 5 * 1024 * 1024) quality = 0.25;
        else if (file.size > 2 * 1024 * 1024) quality = 0.3;
        else if (file.size > 1 * 1024 * 1024) quality = 0.35;
        else if (file.size > 500 * 1024) quality = 0.45;
        else quality = 0.55;
        
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

const uploadToCloudinary = async (file) => {
  const compressedFile = await compressImageSmart(file);
  
  const formData = new FormData();
  formData.append('file', compressedFile);
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

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================

const ImageUpload = ({ imageUrl, onImageChange, onImageRemove, label = 'Image', aspectRatio = '16/9', helpText = ''  }) => {
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
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {preview ? (
        <div className="relative inline-block">
          <div className={`rounded-lg overflow-hidden border-2 border-pink-500/30 bg-gray-100`}
               style={{ width: '200px', aspectRatio: aspectRatio }}>
            <img 
              src={preview} 
              alt={label} 
              className="w-full h-full object-cover"
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
            className="flex items-center gap-2 px-4 py-2 bg-[#74866C] text-white rounded-lg hover:bg-pink-700 transition-colors text-sm disabled:opacity-50"
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
      {error && <p className="text-xs text-red-500">{error}</p>}
      {helpText && <p className="text-xs text-gray-400 mt-1">{helpText}</p>}
    </div>
  );
};

// ============================================================
// ICON OPTIONS
// ============================================================

const QUICK_CONTACT_ICONS = [
  { value: 'FaWhatsapp', label: 'WhatsApp', icon: MessageCircle },
  { value: 'FaPhone', label: 'Phone', icon: Phone },
  { value: 'FaEnvelope', label: 'Email', icon: Mail },
  { value: 'FaMapMarkerAlt', label: 'Location', icon: MapPin },
];

const SOCIAL_PLATFORMS = [
  { value: 'facebook', label: 'Facebook', icon: 'FaFacebookF', component: FaFacebookF, color: 'hover:bg-[#1877F2] hover:text-white', bgColor: '#1877F2' },
  { value: 'instagram', label: 'Instagram', icon: 'FaInstagram', component: FaInstagram, color: 'hover:bg-[#E4405F] hover:text-white', bgColor: '#E4405F' },
  { value: 'x', label: 'X (Twitter)', icon: 'FaTwitter', component: FaTwitter, color: 'hover:bg-[#000000] hover:text-white', bgColor: '#000000' },
  { value: 'linkedin', label: 'LinkedIn', icon: 'FaLinkedinIn', component: FaLinkedinIn, color: 'hover:bg-[#0A66C2] hover:text-white', bgColor: '#0A66C2' },
  { value: 'youtube', label: 'YouTube', icon: 'FaYoutube', component: FaYoutube, color: 'hover:bg-[#FF0000] hover:text-white', bgColor: '#FF0000' },
  { value: 'tiktok', label: 'TikTok', icon: 'FaTiktok', component: FaTiktok, color: 'hover:bg-[#000000] hover:text-white', bgColor: '#000000' },
  { value: 'pinterest', label: 'Pinterest', icon: 'FaPinterest', component: FaPinterest, color: 'hover:bg-[#E60023] hover:text-white', bgColor: '#E60023' },
  { value: 'snapchat', label: 'Snapchat', icon: 'FaSnapchat', component: FaSnapchat, color: 'hover:bg-[#FFFC00] hover:text-black', bgColor: '#FFFC00' },
  { value: 'telegram', label: 'Telegram', icon: 'FaTelegram', component: FaTelegram, color: 'hover:bg-[#26A5E4] hover:text-white', bgColor: '#26A5E4' },
  { value: 'github', label: 'GitHub', icon: 'FaGithub', component: FaGithub, color: 'hover:bg-[#181717] hover:text-white', bgColor: '#181717' },
  { value: 'viber', label: 'Viber', icon: 'FaViber', component: FaViber, color: 'hover:bg-[#7360F2] hover:text-white', bgColor: '#7360F2' },
  { value: 'messenger', label: 'Messenger', icon: 'FaFacebookMessenger', component: FaFacebookMessenger, color: 'hover:bg-[#00B2FF] hover:text-white', bgColor: '#00B2FF' },
];

// ============================================================
// DELETE CONFIRMATION MODAL
// ============================================================

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName, itemType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
        <div className="p-6">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <Trash2 className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Delete {itemType}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete <strong className="text-[#74866C]">"{itemName}"</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-pink-500/10 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// RESET CONFIRMATION MODAL
// ============================================================

const ResetConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-orange-100">
        <div className="p-6">
          <div className="flex items-center gap-3 text-orange-600 mb-4">
            <RefreshCw className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Reset Contact Page</h3>
          </div>
          <div className="flex items-start gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-700">
              This will <strong>permanently delete</strong> all custom content and restore 
              the default settings. This action <strong>cannot be undone</strong>.
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to reset the contact page to default configuration?
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// QUICK CONTACT ITEM COMPONENT
// ============================================================

const QuickContactItem = ({ item, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
  const [isDragging, setIsDragging] = useState(false);
  const IconComponent = QUICK_CONTACT_ICONS.find(i => i.value === item.icon)?.icon || Phone;

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
      className={`bg-gray-50 rounded-lg border border-gray-200 p-4 transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Icon <span className="text-red-500">*</span></label>
            <select
              value={item.icon}
              onChange={(e) => onUpdate(index, { ...item, icon: e.target.value })}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white"
            >
              {QUICK_CONTACT_ICONS.map(icon => (
                <option key={icon.value} value={icon.value}>{icon.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Label <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={item.label}
              onChange={(e) => onUpdate(index, { ...item, label: e.target.value })}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white"
              placeholder="Phone"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Value <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={item.value}
              onChange={(e) => onUpdate(index, { ...item, value: e.target.value })}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white"
              placeholder="+880 1XXXXXXX"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Link <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={item.link}
              onChange={(e) => onUpdate(index, { ...item, link: e.target.value })}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white"
              placeholder="tel:+8801XXXXXXX"
            />
          </div>
          <div className="col-span-2 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.isActive}
                onChange={(e) => onUpdate(index, { ...item, isActive: e.target.checked })}
                className="w-3.5 h-3.5 rounded border-gray-300 text-[#74866C] focus:ring-pink-500"
              />
              <span className="text-xs text-gray-700">Active</span>
            </label>
            <span className="text-xs text-gray-400">Order: {index + 1}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SOCIAL LINK ITEM COMPONENT
// ============================================================

const SocialLinkItem = ({ link, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
  const [isDragging, setIsDragging] = useState(false);
  const platformData = SOCIAL_PLATFORMS.find(p => p.value === link.platform);
  const PlatformIcon = platformData?.component || FaFacebookF;

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
      className={`bg-gray-50 rounded-lg border border-gray-200 p-4 transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex-1 grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Platform <span className="text-red-500">*</span></label>
            <select
              value={link.platform}
              onChange={(e) => {
                const platform = SOCIAL_PLATFORMS.find(p => p.value === e.target.value);
                onUpdate(index, {
                  ...link,
                  platform: e.target.value,
                  icon: platform?.icon || 'FaFacebookF',
                  color: platform?.color || 'hover:bg-[#1877F2]'
                });
              }}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white"
            >
              {SOCIAL_PLATFORMS.map(platform => (
                <option key={platform.value} value={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">URL <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={link.url}
              onChange={(e) => onUpdate(index, { ...link, url: e.target.value })}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white"
              placeholder="https://facebook.com/smartgadget"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={link.isActive}
                onChange={(e) => onUpdate(index, { ...link, isActive: e.target.checked })}
                className="w-3.5 h-3.5 rounded border-gray-300 text-[#74866C] focus:ring-pink-500"
              />
              <span className="text-xs text-gray-700">Active</span>
            </label>
            <span className="text-xs text-gray-400">Order: {index + 1}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-200 flex items-center gap-3">
        <span className="text-xs text-gray-400">Preview:</span>
        <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center">
          <PlatformIcon className="w-4 h-4 text-[#74866C]" />
        </div>
        <span className="text-xs text-gray-500 font-medium">{link.platform}</span>
      </div>
    </div>
  );
};

// ============================================================
// FEATURE ITEM COMPONENT
// ============================================================

const FeatureItem = ({ feature, index, onUpdate, onRemove }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Icon <span className="text-red-500">*</span></label>
            <select
              value={feature.icon}
              onChange={(e) => onUpdate(index, { ...feature, icon: e.target.value })}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white"
            >
              <option value="CheckCircle">Check Circle</option>
              <option value="Shield">Shield</option>
              <option value="Truck">Truck</option>
              <option value="Headphones">Headphones</option>
              <option value="Clock">Clock</option>
              <option value="Star">Star</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={feature.title}
              onChange={(e) => onUpdate(index, { ...feature, title: e.target.value })}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white"
              placeholder="Quick Response"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={feature.description}
              onChange={(e) => onUpdate(index, { ...feature, description: e.target.value })}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white"
              placeholder="We reply within 24 hours"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN ADMIN COMPONENT
// ============================================================

export default function ContactManagement() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);

  // Fetch contact data
  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/contact/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to manage contact page');
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const data = result.data;
          if (!data.leftSide) {
            data.leftSide = {
              badge: 'Why Contact Us',
              title: "We're Here to",
              subtitle: 'Help You',
              description: 'Whether you have questions about a product, need assistance with an order, or just want some tech advice - our team is ready to help you.',
              quickContactTitle: 'Quick Contact',
              socialTitle: 'Follow Us',
              features: [
                { icon: 'CheckCircle', title: 'Quick Response', description: 'We reply within 24 hours' },
                { icon: 'Shield', title: 'Expert Advice', description: 'Get guidance from tech experts' },
                { icon: 'Truck', title: 'Order Support', description: 'Track and manage your orders' }
              ]
            };
          }
          setContactData(data);
          toast.success('Contact data loaded successfully');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to load contact data');
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update contact data
  const updateContactData = (section, data) => {
    setContactData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setIsSubmitting(false);
        return;
      }

      const submitData = {
        ...contactData,
        rightSide: contactData.leftSide
      };
      delete submitData.leftSide;

      const response = await fetch('http://localhost:5000/api/contact/admin', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to update contact page');
        setIsSubmitting(false);
        return;
      }

      const result = await response.json();

      if (result.success) {
        toast.success('✅ Contact page updated successfully!');
        await fetchContactData();
      } else {
        toast.error(result.error || 'Failed to update contact page');
      }
    } catch (error) {
      console.error('Error saving contact data:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = async () => {
    setShowResetModal(false);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        return;
      }

      const response = await fetch('http://localhost:5000/api/contact/admin/reset', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const result = await response.json();

      if (response.status === 403) {
        toast.error('You do not have permission to reset contact page');
        return;
      }

      if (result.success) {
        toast.success('Contact page reset to default');
        await fetchContactData();
      } else {
        toast.error(result.error || 'Failed to reset contact page');
      }
    } catch (error) {
      console.error('Error resetting contact:', error);
      toast.error('Network error. Please try again.');
    }
  };

  // Quick Contact handlers
  const addQuickContact = () => {
    const currentItems = contactData?.quickContacts || [];
    if (currentItems.length >= 4) {
      toast.error('Maximum 4 quick contact items allowed');
      return;
    }
    const newItem = {
      icon: 'FaPhone',
      label: '',
      value: '',
      link: '',
      color: 'bg-[#74866C]',
      displayOrder: currentItems.length,
      isActive: true
    };
    updateContactData('quickContacts', [...currentItems, newItem]);
  };

  const updateQuickContact = (index, updatedItem) => {
    const updatedItems = [...contactData.quickContacts];
    updatedItems[index] = updatedItem;
    updateContactData('quickContacts', updatedItems);
  };

  const removeQuickContact = (index) => {
    const updatedItems = contactData.quickContacts.filter((_, i) => i !== index);
    updateContactData('quickContacts', updatedItems);
  };

  const moveQuickContact = (fromIndex, toIndex) => {
    const updatedItems = [...contactData.quickContacts];
    const [removed] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, removed);
    updatedItems.forEach((item, idx) => item.displayOrder = idx);
    updateContactData('quickContacts', updatedItems);
  };

  // Social Links handlers
  const addSocialLink = () => {
    const currentLinks = contactData?.socialLinks || [];
    const newLink = {
      platform: 'facebook',
      url: '',
      icon: 'FaFacebookF',
      color: 'hover:bg-[#1877F2]',
      displayOrder: currentLinks.length,
      isActive: true
    };
    updateContactData('socialLinks', [...currentLinks, newLink]);
  };

  const updateSocialLink = (index, updatedLink) => {
    const updatedLinks = [...contactData.socialLinks];
    updatedLinks[index] = updatedLink;
    updateContactData('socialLinks', updatedLinks);
  };

  const removeSocialLink = (index) => {
    const updatedLinks = contactData.socialLinks.filter((_, i) => i !== index);
    updateContactData('socialLinks', updatedLinks);
  };

  const moveSocialLink = (fromIndex, toIndex) => {
    const updatedLinks = [...contactData.socialLinks];
    const [removed] = updatedLinks.splice(fromIndex, 1);
    updatedLinks.splice(toIndex, 0, removed);
    updatedLinks.forEach((item, idx) => item.displayOrder = idx);
    updateContactData('socialLinks', updatedLinks);
  };

  // Features handlers (left side)
  const addFeature = () => {
    const currentFeatures = contactData?.leftSide?.features || [];
    const newFeature = {
      icon: 'CheckCircle',
      title: '',
      description: ''
    };
    updateContactData('leftSide', {
      ...contactData.leftSide,
      features: [...currentFeatures, newFeature]
    });
  };

  const updateFeature = (index, updatedFeature) => {
    const updatedFeatures = [...contactData.leftSide.features];
    updatedFeatures[index] = updatedFeature;
    updateContactData('leftSide', {
      ...contactData.leftSide,
      features: updatedFeatures
    });
  };

  const removeFeature = (index) => {
    const updatedFeatures = contactData.leftSide.features.filter((_, i) => i !== index);
    updateContactData('leftSide', {
      ...contactData.leftSide,
      features: updatedFeatures
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#74866C] mx-auto" />
          <p className="text-gray-500 mt-2">Loading contact data...</p>
        </div>
      </div>
    );
  }

  if (!contactData) {
    return null;
  }

  const { hero, quickContacts, leftSide, socialLinks, map, cta } = contactData;

  return (
    <ProtectedRoute pageKey="contact_management">
      <div className="min-h-screen bg-gray-50">
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteTarget(null);
          }}
          onConfirm={() => {
            if (deleteTarget) {
              const { type, index } = deleteTarget;
              if (type === 'quick') removeQuickContact(index);
              else if (type === 'social') removeSocialLink(index);
              else if (type === 'feature') removeFeature(index);
              setShowDeleteModal(false);
              setDeleteTarget(null);
              toast.success('Item deleted successfully');
            }
          }}
          itemName={deleteTarget?.name || ''}
          itemType={deleteTarget?.type || ''}
        />

        <ResetConfirmationModal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          onConfirm={handleResetConfirm}
        />

        {/* Header */}
        <div className="bg-white border-b border-pink-500/20 shadow-lg sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#74866C]" />
                      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black truncate">
                        Contact Page Management
                      </h1>
                    </div>
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-pink-500/20 text-[#74866C] text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
                      Beauty Bucket
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/70 mt-0.5 sm:mt-1 truncate">
                    Manage contact page content, quick contacts, and more
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                <button
                  onClick={handleResetClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-orange-500/10 text-orange-600 rounded-lg hover:bg-orange-500/30 transition-colors border border-orange-500/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={fetchContactData}
                  className="p-1.5 sm:p-2 text-black/70 hover:bg-pink-500/20 rounded-lg transition-colors hover:text-black"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-pink-500/20 pb-2 bg-white rounded-t-xl shadow-sm border border-pink-500/20 p-4">
              {[
                { id: 'hero', label: 'Hero Section', icon: ImageIcon },
                { id: 'quick', label: 'Quick Contact', icon: Phone },
                { id: 'left', label: 'Left Side', icon: Settings },
                { id: 'social', label: 'Social Links', icon: Globe },
                { id: 'map', label: 'Map', icon: Map },
                { id: 'cta', label: 'CTA', icon: Zap },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-[#74866C] text-white'
                      : 'text-gray-600 hover:bg-pink-500/10 hover:text-black'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Hero Section Tab */}
            {activeTab === 'hero' && (
              <div className="bg-white rounded-xl shadow-sm border border-pink-500/20 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-black flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-[#74866C]" />
                  Hero Section Settings
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <ImageUpload
                    imageUrl={hero?.bgImage || ''}
                    onImageChange={(url) => updateContactData('hero', { ...hero, bgImage: url })}
                    onImageRemove={() => updateContactData('hero', { ...hero, bgImage: '' })}
                    label="Background Image"
                    aspectRatio="16/9"
                    helpText="Recommended: 1896x807px/ 16:9 ratio"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Badge Text <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={hero?.badge || ''}
                      onChange={(e) => updateContactData('hero', { ...hero, badge: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                      placeholder="Get in Touch"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={hero?.title || ''}
                      onChange={(e) => updateContactData('hero', { ...hero, title: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                      placeholder="We'd Love to"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Highlight Text <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={hero?.highlightText || ''}
                      onChange={(e) => updateContactData('hero', { ...hero, highlightText: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                      placeholder="Hear From You"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={hero?.description || ''}
                      onChange={(e) => updateContactData('hero', { ...hero, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40 resize-none"
                      placeholder="Have questions about products, orders, or anything else?"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Contact Tab */}
            {activeTab === 'quick' && (
              <div className="bg-white rounded-xl shadow-sm border border-pink-500/20 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                      <Phone className="w-5 h-5 text-[#74866C]" />
                      Quick Contact <span className="text-xs font-normal text-gray-400">(Max 4)</span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Manage quick contact cards on the contact page</p>
                  </div>
                  {quickContacts?.length < 4 && (
                    <button
                      type="button"
                      onClick={addQuickContact}
                      className="flex items-center gap-2 px-4 py-2 bg-[#74866C] text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      Add Quick Contact
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {quickContacts?.map((item, index) => (
                    <QuickContactItem
                      key={index}
                      item={item}
                      index={index}
                      onUpdate={updateQuickContact}
                      onRemove={removeQuickContact}
                      onMove={moveQuickContact}
                      isFirst={index === 0}
                      isLast={index === quickContacts.length - 1}
                    />
                  ))}
                </div>
                {quickContacts?.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Phone className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>No quick contact items added</p>
                    <p className="text-sm">Add up to 4 items</p>
                  </div>
                )}
              </div>
            )}

            {/* Left Side Tab */}
            {activeTab === 'left' && (
              <div className="bg-white rounded-xl shadow-sm border border-pink-500/20 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                      <Settings className="w-5 h-5 text-[#74866C]" />
                      Left Side Content
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Manage the left side content on contact page</p>
                  </div>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-2 px-4 py-2 bg-[#74866C] text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Badge Text <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={leftSide?.badge || ''}
                      onChange={(e) => updateContactData('leftSide', { ...leftSide, badge: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                      placeholder="Why Contact Us"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={leftSide?.title || ''}
                      onChange={(e) => updateContactData('leftSide', { ...leftSide, title: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                      placeholder="We're Here to"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={leftSide?.subtitle || ''}
                      onChange={(e) => updateContactData('leftSide', { ...leftSide, subtitle: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                      placeholder="Help You"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={leftSide?.description || ''}
                      onChange={(e) => updateContactData('leftSide', { ...leftSide, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40 resize-none"
                      placeholder="Whether you have questions about a product..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quick Contact Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={leftSide?.quickContactTitle || ''}
                      onChange={(e) => updateContactData('leftSide', { ...leftSide, quickContactTitle: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                      placeholder="Quick Contact"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Social Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={leftSide?.socialTitle || ''}
                      onChange={(e) => updateContactData('leftSide', { ...leftSide, socialTitle: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                      placeholder="Follow Us"
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Features</h3>
                    <div className="space-y-3">
                      {leftSide?.features && leftSide.features.map((feature, index) => (
                        <FeatureItem
                          key={index}
                          feature={feature}
                          index={index}
                          onUpdate={updateFeature}
                          onRemove={removeFeature}
                        />
                      ))}
                    </div>
                    {leftSide?.features?.length === 0 && (
                      <p className="text-gray-400 text-sm py-4 text-center">No features added</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Social Links Tab */}
            {activeTab === 'social' && (
              <div className="bg-white rounded-xl shadow-sm border border-pink-500/20 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#74866C]" />
                      Social Links
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Manage social media links - icon preview shows the actual platform icon</p>
                  </div>
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="flex items-center gap-2 px-4 py-2 bg-[#74866C] text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Social Link
                  </button>
                </div>

                <div className="space-y-3">
                  {socialLinks?.map((link, index) => (
                    <SocialLinkItem
                      key={index}
                      link={link}
                      index={index}
                      onUpdate={updateSocialLink}
                      onRemove={removeSocialLink}
                      onMove={moveSocialLink}
                      isFirst={index === 0}
                      isLast={index === socialLinks.length - 1}
                    />
                  ))}
                </div>
                {socialLinks?.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>No social links added</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'map' && (
              <div className="bg-white rounded-xl shadow-sm border border-pink-500/20 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-black flex items-center gap-2 mb-4">
                  <Map className="w-5 h-5 text-[#74866C]" />
                  Map Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Map Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={map?.title || ''}
                      onChange={(e) => updateContactData('map', { ...map, title: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                      placeholder="Find Us"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Google Maps Embed URL <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={map?.embedCode || ''}
                      onChange={(e) => updateContactData('map', { ...map, embedCode: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40 resize-none"
                      placeholder="https://www.google.com/maps/embed?pb=... or full iframe code"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      💡 You can paste either the URL or the full iframe code. We'll extract the URL automatically.
                    </p>
                  </div>
                  {map?.embedCode && (
                    <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                      <div className="p-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                        <span className="text-xs text-gray-500">Map Preview</span>
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Valid
                        </span>
                      </div>
                      <div className="p-2 bg-gray-100">
                        {(() => {
                          let mapSrc = map.embedCode;
                          
                          if (map.embedCode && map.embedCode.includes('src="')) {
                            const srcMatch = map.embedCode.match(/src="([^"]+)"/);
                            if (srcMatch && srcMatch[1]) {
                              mapSrc = srcMatch[1];
                            }
                          }
                          
                          if (mapSrc && mapSrc.includes('iframe') && mapSrc.includes('src=')) {
                            const srcMatch = mapSrc.match(/src=["']([^"']+)["']/);
                            if (srcMatch && srcMatch[1]) {
                              mapSrc = srcMatch[1];
                            }
                          }
                          
                          if (mapSrc && (mapSrc.startsWith('http://') || mapSrc.startsWith('https://'))) {
                            return (
                              <iframe
                                src={mapSrc}
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                className="rounded"
                                title="Map Preview"
                              />
                            );
                          } else {
                            return (
                              <div className="p-4 text-center text-red-500">
                                <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                                <p className="text-sm">Invalid map URL format</p>
                                <p className="text-xs text-gray-400 mt-1">Please paste a valid Google Maps embed URL or iframe code</p>
                              </div>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA Tab */}
            {activeTab === 'cta' && (
              <div className="bg-white rounded-xl shadow-sm border border-pink-500/20 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-black flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-[#74866C]" />
                  Call to Action Settings
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <ImageUpload
                    imageUrl={cta?.bgImage || ''}
                    onImageChange={(url) => updateContactData('cta', { ...cta, bgImage: url })}
                    onImageRemove={() => updateContactData('cta', { ...cta, bgImage: '' })}
                    label="CTA Background Image"
                    aspectRatio="16/9"
                    helpText="Recommended: 1895x597px"

                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Badge <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cta?.badge || ''}
                      onChange={(e) => updateContactData('cta', { ...cta, badge: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                      placeholder="Still Have Questions?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cta?.title || ''}
                      onChange={(e) => updateContactData('cta', { ...cta, title: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                      placeholder="We're Here to Help"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={cta?.description || ''}
                      onChange={(e) => updateContactData('cta', { ...cta, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40 resize-none"
                      placeholder="Our team is ready to assist you with any questions."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Button Text <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cta?.buttonText || ''}
                        onChange={(e) => updateContactData('cta', { ...cta, buttonText: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                        placeholder="Call Now"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Button Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cta?.buttonLink || ''}
                        onChange={(e) => updateContactData('cta', { ...cta, buttonLink: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                        placeholder="tel:+8801XXXXXXX"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Secondary Button Text <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cta?.secondaryButtonText || ''}
                        onChange={(e) => updateContactData('cta', { ...cta, secondaryButtonText: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                        placeholder="Browse Products"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Secondary Button Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cta?.secondaryButtonLink || ''}
                        onChange={(e) => updateContactData('cta', { ...cta, secondaryButtonLink: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#74866C] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                        placeholder="/products"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-pink-500/20">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-[#74866C]  text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Contact Page</span>
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