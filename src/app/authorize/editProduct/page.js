


// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import NextLink from 'next/link';
// import { 
//   Plus, 
//   X, 
//   Save, 
//   ArrowLeft,
//   Image as ImageIcon,
//   XCircle,
//   AlertCircle,
//   Loader2,
//   Trash2,
//   Upload,
//   Package,
//   DollarSign,
//   Tag,
//   Info,
//   Star,
//   Search,
//   Hash,
//   Layers,
//   Box,
//   ChevronDown,
//   GripVertical,
//   Palette,
//   TrendingUp,
//   Zap,
//   Clock,
//   Flame,
//   Gift,
//   CheckCircle,
//   RefreshCw,
//   Building2,
//   Video,
//   Youtube,
//   Scale,
//   FolderTree,
//   HelpCircle,
//   LinkIcon,
//   ChevronRight,
//   Grid,
//   List,
//   Circle
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { MantineProvider } from '@mantine/core';
// import { RichTextEditor } from '@mantine/tiptap';
// import { useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import TextAlign from '@tiptap/extension-text-align';
// import TiptapLink from '@tiptap/extension-link';
// import { SketchPicker } from 'react-color';

// import '@mantine/tiptap/styles.css';
// import '@mantine/core/styles.css';
// import MediaLibraryPicker from '@/app/components/MediaLibraryPicker';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // Unit options
// const UNIT_OPTIONS = [
//   { value: 'pcs', label: 'Pieces (pcs)' },
//   { value: 'ton', label: 'Ton (ton)' },
//   { value: 'other', label: 'Other' }
// ];

// // Variant Type options
// const VARIANT_TYPE_OPTIONS = [
//   { value: 'color', label: 'Color' },
//   { value: 'size', label: 'Size' },
//   { value: 'material', label: 'Material' },
//   { value: 'style', label: 'Style' },
//   { value: 'custom', label: 'Custom' }
// ];

// // Color presets
// const COLOR_PRESETS = [
//   '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
//   '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
//   '#008000', '#FFC0CB', '#A52A2A', '#808080', '#C0C0C0',
//   '#4A90E2', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
//   '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE'
// ];

// // ============================================================
// // COMPONENTS
// // ============================================================

// // Add Brand Modal Component
// const AddBrandModal = ({ isOpen, onClose, onBrandAdded }) => {
//   const [brandName, setBrandName] = useState('');
//   const [brandLogo, setBrandLogo] = useState(null);
//   const [brandLogoPreview, setBrandLogoPreview] = useState('');
//   const [brandDescription, setBrandDescription] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleLogoChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Please upload a valid image (JPG, PNG, WebP)');
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('Logo must be less than 2MB');
//       return;
//     }

//     setBrandLogo(file);
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setBrandLogoPreview(e.target.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const uploadLogoToCloudinary = async (file) => {
//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );
//       const data = await response.json();
//       if (data.secure_url) {
//         return {
//           url: data.secure_url,
//           publicId: data.public_id,
//         };
//       } else {
//         throw new Error(data.error?.message || 'Upload failed');
//       }
//     } catch (error) {
//       console.error('Logo upload error:', error);
//       throw error;
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!brandName.trim()) {
//       toast.error('Please enter a brand name');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       let logoUrl = '';
//       let logoPublicId = '';
      
//       if (brandLogo) {
//         const result = await uploadLogoToCloudinary(brandLogo);
//         logoUrl = result.url;
//         logoPublicId = result.publicId;
//       }

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/brands`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: brandName.trim(),
//           logo: logoUrl,
//           description: brandDescription.trim()
//         })
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Brand added successfully');
//         setBrandName('');
//         setBrandLogo(null);
//         setBrandLogoPreview('');
//         setBrandDescription('');
//         if (fileInputRef.current) fileInputRef.current.value = '';
//         onBrandAdded(data.data);
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to add brand');
//       }
//     } catch (error) {
//       console.error('Error adding brand:', error);
//       toast.error('Failed to add brand');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//             <Building2 className="w-5 h-5 text-[#72846A]" />
//             Add New Brand
//           </h3>
//           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Brand Logo <span className="text-gray-400 text-xs">(Optional)</span>
//             </label>
//             <div className="flex items-center gap-4">
//               {brandLogoPreview ? (
//                 <div className="relative">
//                   <img 
//                     src={brandLogoPreview} 
//                     alt="Brand Logo" 
//                     className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setBrandLogo(null);
//                       setBrandLogoPreview('');
//                       if (fileInputRef.current) fileInputRef.current.value = '';
//                     }}
//                     className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </div>
//               ) : (
//                 <div 
//                   className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#72846A] transition-colors"
//                   onClick={() => fileInputRef.current?.click()}
//                 >
//                   <Upload className="w-5 h-5 text-gray-400" />
//                 </div>
//               )}
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/jpeg,image/jpg,image/png,image/webp"
//                 className="hidden"
//                 onChange={handleLogoChange}
//               />
//               <div>
//                 <p className="text-xs text-gray-500">Upload a brand logo</p>
//                 <p className="text-[10px] text-gray-400">JPG, PNG, WebP (max 2MB)</p>
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Brand Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={brandName}
//               onChange={(e) => setBrandName(e.target.value)}
//               placeholder="e.g., Apple, Samsung, Sony"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               autoFocus
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description <span className="text-gray-400 text-xs">(Optional)</span>
//             </label>
//             <textarea
//               value={brandDescription}
//               onChange={(e) => setBrandDescription(e.target.value)}
//               placeholder="Brief description of the brand"
//               rows={2}
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition resize-none"
//             />
//           </div>
          
//           <div className="flex gap-3 mt-4">
//             <button
//               onClick={onClose}
//               className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={isSubmitting || isUploading}
//               className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#738769] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//             >
//               {isSubmitting || isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
//               Add Brand
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Color Picker Component
// const ColorPicker = ({ colors, onChange }) => {
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [currentColorIndex, setCurrentColorIndex] = useState(null);
//   const colorPickerRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
//         setShowColorPicker(false);
//         setCurrentColorIndex(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const addColor = () => {
//     onChange([...colors, { code: '#000000' }]);
//   };

//   const removeColor = (index) => {
//     const updatedColors = colors.filter((_, i) => i !== index);
//     onChange(updatedColors);
//   };

//   const openColorPicker = (index, event) => {
//     event.stopPropagation();
//     setCurrentColorIndex(index);
//     setShowColorPicker(true);
//   };

//   const handleColorChange = (index, color) => {
//     const updatedColors = [...colors];
//     updatedColors[index] = { code: color.hex };
//     onChange(updatedColors);
//   };

//   return (
//     <div className="space-y-3">
//       <div className="flex flex-wrap gap-2">
//         {COLOR_PRESETS.slice(0, 8).map(color => (
//           <button
//             key={color}
//             type="button"
//             onClick={() => {
//               if (colors.length === 0) {
//                 onChange([{ code: color }]);
//               } else {
//                 const updatedColors = [...colors];
//                 updatedColors[0] = { code: color };
//                 onChange(updatedColors);
//               }
//             }}
//             className="w-8 h-8 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform shadow-sm"
//             style={{ backgroundColor: color }}
//             title={color}
//           />
//         ))}
//       </div>
      
//       <div className="space-y-2">
//         {colors.map((color, index) => (
//           <div key={index} className="relative">
//             <div className="flex items-center gap-2 w-full">
//               <div 
//                 className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-2 cursor-pointer hover:border-[#72846A] transition-colors"
//                 onClick={(e) => openColorPicker(index, e)}
//               >
//                 <div 
//                   className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
//                   style={{ backgroundColor: color.code }}
//                 />
//                 <div className="flex-1 font-mono text-sm text-gray-600">
//                   {color.code}
//                 </div>
//                 <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
//               </div>
              
//               <button
//                 type="button"
//                 onClick={() => removeColor(index)}
//                 className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
//                 title="Remove Color"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </div>

//             {showColorPicker && currentColorIndex === index && (
//               <div ref={colorPickerRef} className="absolute right-0 mt-2 z-50">
//                 <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
//                   <SketchPicker
//                     color={color.code}
//                     onChange={(newColor) => handleColorChange(index, newColor)}
//                     presetColors={COLOR_PRESETS}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
        
//         <button
//           type="button"
//           onClick={addColor}
//           className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium text-[#72846A] border border-dashed border-[#72846A]/40 rounded-lg hover:bg-[#72846A]/5 transition-colors"
//         >
//           <Plus className="w-3.5 h-3.5" />
//           Add Color
//         </button>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // VARIANT COLOR PICKER COMPONENT
// // // ============================================================
// // const VariantColorPicker = ({ color, onChange, onRemove }) => {
// //   const [showPicker, setShowPicker] = useState(false);
// //   const pickerRef = useRef(null);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (pickerRef.current && !pickerRef.current.contains(event.target)) {
// //         setShowPicker(false);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   return (
// //     <div className="relative">
// //       <div className="flex items-center gap-2">
// //         <div 
// //           className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-[#72846A] transition-colors flex-shrink-0"
// //           style={{ backgroundColor: color }}
// //           onClick={() => setShowPicker(!showPicker)}
// //         />
// //         <input
// //           type="text"
// //           value={color}
// //           onChange={(e) => onChange(e.target.value)}
// //           className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition font-mono"
// //           placeholder="#000000"
// //         />
// //         {onRemove && (
// //           <button
// //             type="button"
// //             onClick={onRemove}
// //             className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
// //           >
// //             <X className="w-4 h-4" />
// //           </button>
// //         )}
// //       </div>

// //       {showPicker && (
// //         <div ref={pickerRef} className="absolute right-0 mt-2 z-50">
// //           <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
// //             <div className="flex flex-wrap gap-2 max-w-[240px]">
// //               {COLOR_PRESETS.map(preset => (
// //                 <button
// //                   key={preset}
// //                   type="button"
// //                   onClick={() => {
// //                     onChange(preset);
// //                     setShowPicker(false);
// //                   }}
// //                   className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${
// //                     color === preset ? 'border-[#72846A] ring-2 ring-[#72846A] ring-offset-2' : 'border-gray-200'
// //                   }`}
// //                   style={{ backgroundColor: preset }}
// //                 />
// //               ))}
// //             </div>
// //             <div className="mt-2 flex gap-2">
// //               <input
// //                 type="color"
// //                 value={color}
// //                 onChange={(e) => onChange(e.target.value)}
// //                 className="w-full h-10 rounded border border-gray-200 cursor-pointer"
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // ============================================================
// // VARIANT COLOR PICKER COMPONENT - FIXED
// // ============================================================
// const VariantColorPicker = ({ color, onChange, onRemove }) => {
//   const [showPicker, setShowPicker] = useState(false);
//   const [localColor, setLocalColor] = useState(color || '#000000');
//   const pickerRef = useRef(null);

//   // ✅ Sync local color when prop changes
//   useEffect(() => {
//     setLocalColor(color || '#000000');
//   }, [color]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (pickerRef.current && !pickerRef.current.contains(event.target)) {
//         setShowPicker(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleColorChange = (newColor) => {
//     console.log('VariantColorPicker onChange:', newColor); 
//     setLocalColor(newColor);
//     onChange(newColor);
//   };

//   return (
//     <div className="relative">
//       <div className="flex items-center gap-2">
//         <div 
//           className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-[#72846A] transition-colors flex-shrink-0"
//           style={{ backgroundColor: localColor }}
//           onClick={() => setShowPicker(!showPicker)}
//         />
//         <input
//           type="text"
//           value={localColor}
//           onChange={(e) => handleColorChange(e.target.value)}
//           className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition font-mono"
//           placeholder="#000000"
//         />
//         {onRemove && (
//           <button
//             type="button"
//             onClick={() => {
//               handleColorChange('');
//               onRemove();
//             }}
//             className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       {showPicker && (
//         <div ref={pickerRef} className="absolute right-0 mt-2 z-50">
//           <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
//             <div className="flex flex-wrap gap-2 max-w-[240px]">
//               {COLOR_PRESETS.map(preset => (
//                 <button
//                   key={preset}
//                   type="button"
//                   onClick={() => {
//                     handleColorChange(preset);
//                     setShowPicker(false);
//                   }}
//                   className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${
//                     localColor === preset ? 'border-[#72846A] ring-2 ring-[#72846A] ring-offset-2' : 'border-gray-200'
//                   }`}
//                   style={{ backgroundColor: preset }}
//                 />
//               ))}
//             </div>
//             <div className="mt-2 flex gap-2">
//               <input
//                 type="color"
//                 value={localColor}
//                 onChange={(e) => {
//                   handleColorChange(e.target.value);
//                 }}
//                 className="w-full h-10 rounded border border-gray-200 cursor-pointer"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// const SubVariantItem = ({ 
//   subVariant, 
//   index, 
//   variantIndex, 
//   onUpdate, 
//   onRemove,
//   isAdminOrSuperAdmin,
//   defaultPackagingCost,
//   defaultDeliveryCost,
//   expandedSubVariant,
//   setExpandedSubVariant
// }) => {
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const [subVariantImages, setSubVariantImages] = useState(subVariant.images || [null, null, null, null]);
//   const [subVariantImagePreviews, setSubVariantImagePreviews] = useState(subVariant.imagePreviews || [null, null, null, null]);
//   const [showColorPicker, setShowColorPicker] = useState(!!subVariant.color);

//   // ✅ Sync local state when subVariant prop changes
//   useEffect(() => {
//     setSubVariantImages(subVariant.images || [null, null, null, null]);
//     setSubVariantImagePreviews(subVariant.imagePreviews || [null, null, null, null]);
//     setShowColorPicker(!!subVariant.color);
//   }, [subVariant]);

//   const isExpanded = expandedSubVariant === index;

//   const calculateCost = (buyingPrice, packagingCost, deliveryCost) => {
//     const bp = parseFloat(buyingPrice) || 0;
//     const pc = parseFloat(packagingCost) || 0;
//     const dc = parseFloat(deliveryCost) || 0;
//     return bp + pc + dc;
//   };

//   const getFilledCount = (images) => {
//     return (images || []).filter(Boolean).length;
//   };

//   const validateImageFile = (file) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//     const maxSize = 5 * 1024 * 1024;
//     if (!allowedTypes.includes(file.type)) {
//       return { valid: false, message: 'Invalid format. Allowed: JPG, PNG, WebP, GIF' };
//     }
//     if (file.size > maxSize) {
//       return { valid: false, message: 'File too large. Max: 5MB' };
//     }
//     return { valid: true };
//   };

//   const uploadMultipleVariantImages = async (files) => {
//     const uploadedUrls = [];
//     const uploadedPreviews = [];

//     for (const file of files) {
//       const validation = validateImageFile(file);
//       if (!validation.valid) {
//         toast.error(`${file.name}: ${validation.message}`);
//         continue;
//       }

//       try {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
        
//         const response = await fetch(
//           `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//           {
//             method: 'POST',
//             body: formData,
//           }
//         );
        
//         const data = await response.json();
//         if (data.secure_url) {
//           uploadedUrls.push(data.secure_url);
//           uploadedPreviews.push(data.secure_url);
//         } else {
//           throw new Error(data.error?.message || 'Upload failed');
//         }
//       } catch (error) {
//         console.error('Upload error:', error);
//         toast.error(`Failed to upload ${file.name}`);
//       }
//     }

//     return { uploadedUrls, uploadedPreviews };
//   };

//   const updateField = (field, value) => {
//     console.log(`Updating field: ${field} to:`, value);
//     const updated = { ...subVariant, [field]: value };
//     if (['buyingPrice', 'packagingCost', 'deliveryCost'].includes(field)) {
//       updated.costPerItem = calculateCost(
//         field === 'buyingPrice' ? value : subVariant.buyingPrice,
//         field === 'packagingCost' ? value : subVariant.packagingCost,
//         field === 'deliveryCost' ? value : subVariant.deliveryCost
//       );
//     }
//     // ✅ FIX: Pass variantIndex, index, and updated
//     onUpdate(variantIndex, index, updated);
//   };

//   const handleMultipleImageSelect = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     const emptySlots = subVariantImages.reduce((acc, v, i) => (v == null ? [...acc, i] : acc), []);
    
//     if (files.length > emptySlots.length) {
//       toast.error(`You can only upload ${emptySlots.length} more image(s). Maximum 4 images total.`);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//       return;
//     }

//     setIsUploading(true);
//     try {
//       const { uploadedUrls, uploadedPreviews } = await uploadMultipleVariantImages(files);
      
//       const updatedImages = [...subVariantImages];
//       const updatedPreviews = [...subVariantImagePreviews];
      
//       uploadedUrls.forEach((url, i) => {
//         updatedImages[emptySlots[i]] = url;
//       });
//       uploadedPreviews.forEach((url, i) => {
//         updatedPreviews[emptySlots[i]] = url;
//       });
      
//       setSubVariantImages(updatedImages);
//       setSubVariantImagePreviews(updatedPreviews);
      
//       const updated = { ...subVariant, images: updatedImages, imagePreviews: updatedPreviews };
//       // ✅ FIX: Pass variantIndex, index, and updated
//       onUpdate(variantIndex, index, updated);
      
//       toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload images');
//     } finally {
//       setIsUploading(false);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   const removeImage = (slotIdx) => {
//     const updatedImages = [...subVariantImages];
//     const updatedPreviews = [...subVariantImagePreviews];
    
//     if (updatedPreviews[slotIdx]?.startsWith('blob:')) {
//       URL.revokeObjectURL(updatedPreviews[slotIdx]);
//     }
    
//     updatedImages[slotIdx] = null;
//     updatedPreviews[slotIdx] = null;
    
//     setSubVariantImages(updatedImages);
//     setSubVariantImagePreviews(updatedPreviews);
    
//     const updated = { ...subVariant, images: updatedImages, imagePreviews: updatedPreviews };
//     // ✅ FIX: Pass variantIndex, index, and updated
//     onUpdate(variantIndex, index, updated);
//   };

//   const toggleExpand = () => {
//     setExpandedSubVariant(isExpanded ? null : index);
//   };

//   const toggleColorPicker = () => {
//     if (showColorPicker) {
//       updateField('color', '');
//       setShowColorPicker(false);
//     } else {
//       setShowColorPicker(true);
//       if (!subVariant.color) {
//         updateField('color', '#000000');
//       }
//     }
//   };

 



//   return (
//     <div className="border border-[#72846A]/30 rounded-lg overflow-hidden bg-pink-50/30">
//       <div 
//         className="flex items-center justify-between p-3 cursor-pointer hover:bg-pink-50 transition-colors"
//         onClick={toggleExpand}
//       >
//         <div className="flex items-center gap-3">
//           <div className="flex-shrink-0">
//             {subVariantImagePreviews && subVariantImagePreviews[0] ? (
//               <img 
//                 src={subVariantImagePreviews[0]} 
//                 alt={subVariant.name} 
//                 className="w-10 h-10 rounded-lg object-cover border border-gray-200"
//               />
//             ) : subVariant.color ? (
//               <div 
//                 className="w-10 h-10 rounded-lg border-2 border-gray-200"
//                 style={{ backgroundColor: subVariant.color }}
//               />
//             ) : (
//               <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
//                 <Package className="w-5 h-5 text-gray-400" />
//               </div>
//             )}
//           </div>
//           <div>
//             <p className="font-medium text-sm text-gray-900">{subVariant.name || 'Untitled Sub Variant'}</p>
//             <div className="flex items-center gap-3 text-xs text-gray-500">
//               <span>৳{subVariant.regularPrice || 0}</span>
//               {subVariant.discountPrice > 0 && (
//                 <span className="text-green-600">৳{subVariant.discountPrice}</span>
//               )}
//               <span className="text-gray-400">Stock: {subVariant.stockQuantity || 0}</span>
//               <span className="text-gray-400">Images: {getFilledCount(subVariantImages)}/4</span>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
//         </div>
//       </div>

//       {isExpanded && (
//         <div className="p-4 border-t border-[#72846A]/20 space-y-3">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Sub Variant Name *</label>
//               <input
//                 type="text"
//                 value={subVariant.name || ''}
//                 onChange={(e) => updateField('name', e.target.value)}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                 placeholder="e.g., Red, Large, Cotton"
//               />
//             </div>

//             <div>
//               <div className="flex items-center justify-between mb-1">
//                 <label className="block text-xs font-medium text-gray-700">Color</label>
//                 <button
//                   type="button"
//                   onClick={toggleColorPicker}
//                   className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1"
//                 >
//                   {showColorPicker ? (
//                     <>
//                       <X className="w-3 h-3" />
//                       Remove Color
//                     </>
//                   ) : (
//                     <>
//                       <Plus className="w-3 h-3" />
//                       Add Color
//                     </>
//                   )}
//                 </button>
//               </div>
//               {/* {showColorPicker && (
//                 <VariantColorPicker
//                   color={subVariant.color || '#000000'}
//                   onChange={(color) => updateField('color', color)}
//                   onRemove={() => {}}
//                 />
//               )} */}

//               {/* In SubVariantItem render */}
// {showColorPicker && (
//   <VariantColorPicker
//     color={subVariant.color || '#000000'}
//     onChange={(color) => {
//        console.log('Color picked in SubVariantItem:', color);  // ✅ Debug log
//       updateField('color', color);
//     }}
//     onRemove={() => {
//       updateField('color', '');
//       setShowColorPicker(false);
//     }}
//   />
// )}
//             </div>

     

//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
//               <input
//                 type="number"
//                 value={subVariant.regularPrice || ''}
//                 onChange={(e) => updateField('regularPrice', e.target.value)}
//                 onWheel={(e) => e.target.blur()}
//                 min="0"
//                 step="1"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                 placeholder="0"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400">(Optional)</span></label>
//               <input
//                 type="number"
//                 value={subVariant.discountPrice || ''}
//                 onChange={(e) => updateField('discountPrice', e.target.value)}
//                 onWheel={(e) => e.target.blur()}
//                 min="0"
//                 step="1"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                 placeholder="0"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Stock Quantity *</label>
//               <input
//                 type="number"
//                 value={subVariant.stockQuantity || ''}
//                 onChange={(e) => updateField('stockQuantity', e.target.value)}
//                 onWheel={(e) => e.target.blur()}
//                 min="0"
//                 step="1"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                 placeholder="0"
//               />
//             </div>

//             {isAdminOrSuperAdmin && (
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span></label>
//                 <input
//                   type="number"
//                   value={subVariant.buyingPrice || ''}
//                   onChange={(e) => updateField('buyingPrice', e.target.value)}
//                   onWheel={(e) => e.target.blur()}
//                   min="0"
//                   step="1"
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                   placeholder="0"
//                 />
//               </div>
//             )}

//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Packaging Cost (৳) <span className="text-gray-400">(Optional)</span></label>
//               <input
//                 type="number"
//                 value={subVariant.packagingCost || ''}
//                 onChange={(e) => updateField('packagingCost', e.target.value)}
//                 onWheel={(e) => e.target.blur()}
//                 min="0"
//                 step="1"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                 placeholder={defaultPackagingCost || '0'}
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Cost (৳) <span className="text-gray-400">(Optional)</span></label>
//               <input
//                 type="number"
//                 value={subVariant.deliveryCost || ''}
//                 onChange={(e) => updateField('deliveryCost', e.target.value)}
//                 onWheel={(e) => e.target.blur()}
//                 min="0"
//                 step="1"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                 placeholder={defaultDeliveryCost || '0'}
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Cost Per Item (Auto-calculated)</label>
//               <input
//                 type="text"
//                 value={subVariant.costPerItem || 0}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
//                 readOnly
//                 disabled
//               />
//             </div>

//             <div className="md:col-span-2">
//               <div className="flex items-center justify-between mb-2">
//                 <label className="block text-xs font-medium text-gray-700">Sub Variant Images <span className="text-gray-400">(Max 4)</span></label>
//                 {getFilledCount(subVariantImages) < 4 && (
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     disabled={isUploading}
//                     className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1 disabled:opacity-50"
//                   >
//                     {isUploading ? (
//                       <Loader2 className="w-3 h-3 animate-spin" />
//                     ) : (
//                       <Upload className="w-3 h-3" />
//                     )}
//                     {isUploading ? 'Uploading...' : 'Add Images'}
//                   </button>
//                 )}
//               </div>
              
//               <div className="grid grid-cols-4 gap-2">
//                 {[0, 1, 2, 3].map((slotIdx) => {
//                   const imageUrl = subVariantImagePreviews && subVariantImagePreviews[slotIdx];
                  
//                   return (
//                     <div
//                       key={slotIdx}
//                       className={`border-2 border-dashed rounded-lg p-2 text-center h-28 flex flex-col items-center justify-center transition-colors ${
//                         imageUrl 
//                           ? 'border-gray-200 bg-gray-100' 
//                           : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'
//                       }`}
//                     >
//                       {imageUrl ? (
//                         <div className="relative w-full h-full">
//                           <img 
//                             src={imageUrl} 
//                             alt={`Sub variant ${slotIdx + 1}`} 
//                             className="w-full h-full object-contain pointer-events-none select-none"
//                             draggable="false"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(slotIdx)}
//                             className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                           <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-[10px] rounded">
//                             {slotIdx + 1}
//                           </span>
//                         </div>
//                       ) : (
//                         <>
//                           <ImageIcon className="w-6 h-6 text-gray-400" />
//                           <p className="text-[10px] text-gray-400 mt-1">Empty</p>
//                         </>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/jpeg,image/jpg,image/png,image/webp"
//                 multiple
//                 className="hidden"
//                 onChange={handleMultipleImageSelect}
//                 disabled={isUploading}
//               />
//               <p className="text-xs text-gray-400 mt-1">Select multiple images at once (up to 4 total)</p>
//               {getFilledCount(subVariantImages) > 0 && (
//                 <p className="text-xs text-[#72846A] mt-1">{getFilledCount(subVariantImages)} of 4 images uploaded</p>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={() => onRemove(index)}
//               className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
//             >
//               <Trash2 className="w-3 h-3" />
//               Remove Sub Variant
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============================================================
// // VARIANT TYPE SECTION COMPONENT
// // ============================================================
// const VariantTypeSection = ({ 
//   variantType, 
//   onVariantTypeChange, 
//   variants, 
//   onVariantsChange,
//   onRemoveType,
//   defaultPackagingCost,
//   defaultDeliveryCost,
//   isAdminOrSuperAdmin
// }) => {
//   const [showAddVariant, setShowAddVariant] = useState(false);
//   const [showAddSubVariant, setShowAddSubVariant] = useState(null);
//   const [newVariantName, setNewVariantName] = useState('');
//   const [newVariantColor, setNewVariantColor] = useState('#000000');
//   const [newVariantPrice, setNewVariantPrice] = useState('');
//   const [newVariantDiscountPrice, setNewVariantDiscountPrice] = useState('');
//   const [newVariantBuyingPrice, setNewVariantBuyingPrice] = useState('');
//   const [newVariantPackagingCost, setNewVariantPackagingCost] = useState(defaultPackagingCost || '');
//   const [newVariantDeliveryCost, setNewVariantDeliveryCost] = useState(defaultDeliveryCost || '');
//   const [newVariantStock, setNewVariantStock] = useState('');
//   const [newVariantImages, setNewVariantImages] = useState([null, null, null, null]);
//   const [newVariantImagePreviews, setNewVariantImagePreviews] = useState([null, null, null, null]);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const [expandedVariant, setExpandedVariant] = useState(null);
//   const [expandedSubVariant, setExpandedSubVariant] = useState(null);
  
//   const [newVariantSubVariants, setNewVariantSubVariants] = useState([]);
//   const [showAddSubVariantInForm, setShowAddSubVariantInForm] = useState(false);
  
//   const [newSubVariant, setNewSubVariant] = useState({
//     name: '',
//     color: '',
//     regularPrice: '',
//     discountPrice: '',
//     stockQuantity: '',
//     buyingPrice: '',
//     packagingCost: defaultPackagingCost || '',
//     deliveryCost: defaultDeliveryCost || '',
//     costPerItem: 0,
//     images: [null, null, null, null],
//     imagePreviews: [null, null, null, null]
//   });
//   const [isSubVariantUploading, setIsSubVariantUploading] = useState(false);
//   const subVariantFileInputRef = useRef(null);

//   const [draggedItem, setDraggedItem] = useState(null);
//   const [dragOverItem, setDragOverItem] = useState(null);

//   const calculateVariantCost = (buyingPrice, packagingCost, deliveryCost) => {
//     const bp = parseFloat(buyingPrice) || 0;
//     const pc = parseFloat(packagingCost) || 0;
//     const dc = parseFloat(deliveryCost) || 0;
//     return bp + pc + dc;
//   };

//   const getFilledCount = (images) => {
//     return (images || []).filter(Boolean).length;
//   };

//   const validateImageFile = (file) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//     const maxSize = 5 * 1024 * 1024;
//     if (!allowedTypes.includes(file.type)) {
//       return { valid: false, message: 'Invalid format. Allowed: JPG, PNG, WebP, GIF' };
//     }
//     if (file.size > maxSize) {
//       return { valid: false, message: 'File too large. Max: 5MB' };
//     }
//     return { valid: true };
//   };

//   const uploadMultipleVariantImages = async (files) => {
//     const uploadedUrls = [];
//     const uploadedPreviews = [];

//     for (const file of files) {
//       const validation = validateImageFile(file);
//       if (!validation.valid) {
//         toast.error(`${file.name}: ${validation.message}`);
//         continue;
//       }

//       try {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
        
//         const response = await fetch(
//           `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//           {
//             method: 'POST',
//             body: formData,
//           }
//         );
        
//         const data = await response.json();
//         if (data.secure_url) {
//           uploadedUrls.push(data.secure_url);
//           uploadedPreviews.push(data.secure_url);
//         } else {
//           throw new Error(data.error?.message || 'Upload failed');
//         }
//       } catch (error) {
//         console.error('Upload error:', error);
//         toast.error(`Failed to upload ${file.name}`);
//       }
//     }

//     return { uploadedUrls, uploadedPreviews };
//   };

//   // const addSubVariantToForm = () => {
//   //   if (!newSubVariant.name.trim()) {
//   //     toast.error('Please enter a sub variant name');
//   //     return;
//   //   }

//   //   const subVariantToAdd = {
//   //     id: Date.now().toString(),
//   //     ...newSubVariant,
//   //     costPerItem: calculateVariantCost(
//   //       newSubVariant.buyingPrice,
//   //       newSubVariant.packagingCost,
//   //       newSubVariant.deliveryCost
//   //     ),
//   //     images: [...newSubVariant.images],
//   //     imagePreviews: [...newSubVariant.imagePreviews]
//   //   };

//   //   setNewVariantSubVariants([...newVariantSubVariants, subVariantToAdd]);
//   //   setExpandedSubVariant(newVariantSubVariants.length);

//   //   setNewSubVariant({
//   //     name: '',
//   //     color: '',
//   //     regularPrice: '',
//   //     discountPrice: '',
//   //     stockQuantity: '',
//   //     buyingPrice: '',
//   //     packagingCost: defaultPackagingCost || '',
//   //     deliveryCost: defaultDeliveryCost || '',
//   //     costPerItem: 0,
//   //     images: [null, null, null, null],
//   //     imagePreviews: [null, null, null, null]
//   //   });
//   //   setShowAddSubVariantInForm(false);
//   //   toast.success('Sub variant added to variant');
//   // };

//   const addSubVariantToForm = () => {
//   if (!newSubVariant.name.trim()) {
//     toast.error('Please enter a sub variant name');
//     return;
//   }

//   const subVariantToAdd = {
//     id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // ✅ More unique ID
//     ...newSubVariant,
//     costPerItem: calculateVariantCost(
//       newSubVariant.buyingPrice,
//       newSubVariant.packagingCost,
//       newSubVariant.deliveryCost
//     ),
//     images: [...newSubVariant.images],
//     imagePreviews: [...newSubVariant.imagePreviews]
//   };

//   setNewVariantSubVariants([...newVariantSubVariants, subVariantToAdd]);
//   setExpandedSubVariant(newVariantSubVariants.length);

//   setNewSubVariant({
//     name: '',
//     color: '',
//     regularPrice: '',
//     discountPrice: '',
//     stockQuantity: '',
//     buyingPrice: '',
//     packagingCost: defaultPackagingCost || '',
//     deliveryCost: defaultDeliveryCost || '',
//     costPerItem: 0,
//     images: [null, null, null, null],
//     imagePreviews: [null, null, null, null]
//   });
//   setShowAddSubVariantInForm(false);
//   toast.success('Sub variant added to variant');
// };







//   const removeSubVariantFromForm = (index) => {
//     const updated = newVariantSubVariants.filter((_, i) => i !== index);
//     setNewVariantSubVariants(updated);
//     toast.success('Sub variant removed');
//   };

//   const handleSubVariantImageSelectForForm = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     const emptySlots = newSubVariant.images.reduce((acc, v, i) => (v == null ? [...acc, i] : acc), []);
    
//     if (files.length > emptySlots.length) {
//       toast.error(`You can only upload ${emptySlots.length} more image(s). Maximum 4 images total.`);
//       if (subVariantFileInputRef.current) subVariantFileInputRef.current.value = '';
//       return;
//     }

//     setIsSubVariantUploading(true);
//     try {
//       const { uploadedUrls, uploadedPreviews } = await uploadMultipleVariantImages(files);
      
//       const updatedImages = [...newSubVariant.images];
//       const updatedPreviews = [...newSubVariant.imagePreviews];
      
//       uploadedUrls.forEach((url, i) => {
//         updatedImages[emptySlots[i]] = url;
//       });
//       uploadedPreviews.forEach((url, i) => {
//         updatedPreviews[emptySlots[i]] = url;
//       });
      
//       setNewSubVariant(prev => ({
//         ...prev,
//         images: updatedImages,
//         imagePreviews: updatedPreviews
//       }));
      
//       toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload images');
//     } finally {
//       setIsSubVariantUploading(false);
//       if (subVariantFileInputRef.current) subVariantFileInputRef.current.value = '';
//     }
//   };

//   const removeSubVariantImageFromForm = (slotIdx) => {
//     const updatedImages = [...newSubVariant.images];
//     const updatedPreviews = [...newSubVariant.imagePreviews];
    
//     if (updatedPreviews[slotIdx]?.startsWith('blob:')) {
//       URL.revokeObjectURL(updatedPreviews[slotIdx]);
//     }
    
//     updatedImages[slotIdx] = null;
//     updatedPreviews[slotIdx] = null;
    
//     setNewSubVariant(prev => ({
//       ...prev,
//       images: updatedImages,
//       imagePreviews: updatedPreviews
//     }));
//   };

//   // const addSubVariant = (variantIndex) => {
//   //   if (!newSubVariant.name.trim()) {
//   //     toast.error('Please enter a sub variant name');
//   //     return;
//   //   }

//   //   const updatedVariants = [...variants];
//   //   const variant = { ...updatedVariants[variantIndex] };
    
//   //   if (!variant.subVariants) {
//   //     variant.subVariants = [];
//   //   }

//   //   const subVariantToAdd = {
//   //     id: Date.now().toString(),
//   //     ...newSubVariant,
//   //     costPerItem: calculateVariantCost(
//   //       newSubVariant.buyingPrice,
//   //       newSubVariant.packagingCost,
//   //       newSubVariant.deliveryCost
//   //     ),
//   //     images: [...newSubVariant.images],
//   //     imagePreviews: [...newSubVariant.imagePreviews]
//   //   };

//   //   const newIndex = variant.subVariants.length;
//   //   variant.subVariants.push(subVariantToAdd);
//   //   updatedVariants[variantIndex] = variant;
//   //   onVariantsChange(updatedVariants);
//   //   setExpandedSubVariant(newIndex);

//   //   setNewSubVariant({
//   //     name: '',
//   //     color: '',
//   //     regularPrice: '',
//   //     discountPrice: '',
//   //     stockQuantity: '',
//   //     buyingPrice: '',
//   //     packagingCost: defaultPackagingCost || '',
//   //     deliveryCost: defaultDeliveryCost || '',
//   //     costPerItem: 0,
//   //     images: [null, null, null, null],
//   //     imagePreviews: [null, null, null, null]
//   //   });
//   //   setShowAddSubVariant(null);
//   //   toast.success('Sub variant added successfully');
//   // };



//   // In addSubVariant function
// const addSubVariant = (variantIndex) => {
//   if (!newSubVariant.name.trim()) {
//     toast.error('Please enter a sub variant name');
//     return;
//   }

//   const updatedVariants = [...variants];
//   const variant = { ...updatedVariants[variantIndex] };
  
//   if (!variant.subVariants) {
//     variant.subVariants = [];
//   }

//   const subVariantToAdd = {
//     id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // ✅ More unique ID
//     ...newSubVariant,
//     costPerItem: calculateVariantCost(
//       newSubVariant.buyingPrice,
//       newSubVariant.packagingCost,
//       newSubVariant.deliveryCost
//     ),
//     images: [...newSubVariant.images],
//     imagePreviews: [...newSubVariant.imagePreviews]
//   };

//   const newIndex = variant.subVariants.length;
//   variant.subVariants.push(subVariantToAdd);
//   updatedVariants[variantIndex] = variant;
//   onVariantsChange(updatedVariants);
//   setExpandedSubVariant(newIndex);

//   setNewSubVariant({
//     name: '',
//     color: '',
//     regularPrice: '',
//     discountPrice: '',
//     stockQuantity: '',
//     buyingPrice: '',
//     packagingCost: defaultPackagingCost || '',
//     deliveryCost: defaultDeliveryCost || '',
//     costPerItem: 0,
//     images: [null, null, null, null],
//     imagePreviews: [null, null, null, null]
//   });
//   setShowAddSubVariant(null);
//   toast.success('Sub variant added successfully');
// };


//   // const updateSubVariant = (variantIndex, subVariantIndex, updatedSubVariant) => {
//   //   const updatedVariants = [...variants];
//   //   const variant = { ...updatedVariants[variantIndex] };
    
//   //   if (!variant.subVariants) {
//   //     variant.subVariants = [];
//   //   }
    
//   //   if (subVariantIndex >= variant.subVariants.length) {
//   //     variant.subVariants.push(updatedSubVariant);
//   //   } else {
//   //     variant.subVariants[subVariantIndex] = updatedSubVariant;
//   //   }
    
//   //   updatedVariants[variantIndex] = variant;
//   //   onVariantsChange(updatedVariants);
//   // };
// // In VariantTypeSection - make sure this function is correct
// const updateSubVariant = (variantIndex, subVariantIndex, updatedSubVariant) => {
//   console.log('Updating sub-variant:', variantIndex, subVariantIndex, updatedSubVariant); // Debug log
  
//   const updatedVariants = [...variants];
//   const variant = { ...updatedVariants[variantIndex] };
  
//   if (!variant.subVariants) {
//     variant.subVariants = [];
//   }
  
//   if (subVariantIndex >= variant.subVariants.length) {
//     variant.subVariants.push(updatedSubVariant);
//   } else {
//     // ✅ Use a new object to ensure React detects the change
//     variant.subVariants[subVariantIndex] = { ...updatedSubVariant };
//   }
  
//   updatedVariants[variantIndex] = variant;
  
//   // ✅ This should trigger the parent state update
//   onVariantsChange(updatedVariants);
// };

//   const removeSubVariant = (variantIndex, subVariantIndex) => {
//     if (!confirm('Remove this sub variant?')) return;
    
//     const updatedVariants = [...variants];
//     const variant = { ...updatedVariants[variantIndex] };
//     variant.subVariants.splice(subVariantIndex, 1);
//     updatedVariants[variantIndex] = variant;
//     onVariantsChange(updatedVariants);
//     toast.success('Sub variant removed');
//   };

//   const handleMultipleImageSelect = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     const emptySlots = newVariantImages.reduce((acc, v, i) => (v == null ? [...acc, i] : acc), []);
    
//     if (files.length > emptySlots.length) {
//       toast.error(`You can only upload ${emptySlots.length} more image(s). Maximum 4 images total.`);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//       return;
//     }

//     setIsUploading(true);
//     try {
//       const { uploadedUrls, uploadedPreviews } = await uploadMultipleVariantImages(files);
      
//       const updatedImages = [...newVariantImages];
//       const updatedPreviews = [...newVariantImagePreviews];
      
//       uploadedUrls.forEach((url, i) => {
//         updatedImages[emptySlots[i]] = url;
//       });
//       uploadedPreviews.forEach((url, i) => {
//         updatedPreviews[emptySlots[i]] = url;
//       });
      
//       setNewVariantImages(updatedImages);
//       setNewVariantImagePreviews(updatedPreviews);
      
//       toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload images');
//     } finally {
//       setIsUploading(false);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   const removeNewVariantImage = (index) => {
//     const updatedImages = [...newVariantImages];
//     const updatedPreviews = [...newVariantImagePreviews];
    
//     if (updatedPreviews[index]?.startsWith('blob:')) {
//       URL.revokeObjectURL(updatedPreviews[index]);
//     }
    
//     updatedImages[index] = null;
//     updatedPreviews[index] = null;
    
//     setNewVariantImages(updatedImages);
//     setNewVariantImagePreviews(updatedPreviews);
//   };

//   const moveVariantImage = (variantIndex, fromIndex, toIndex) => {
//     const updatedVariants = [...variants];
//     const variant = { ...updatedVariants[variantIndex] };

//     const images = [...(variant.images || [null, null, null, null])];
//     const imagePreviews = [...(variant.imagePreviews || [null, null, null, null])];

//     const [movedImage] = images.splice(fromIndex, 1);
//     images.splice(toIndex, 0, movedImage);

//     const [movedPreview] = imagePreviews.splice(fromIndex, 1);
//     imagePreviews.splice(toIndex, 0, movedPreview);

//     variant.images = images;
//     variant.imagePreviews = imagePreviews;
//     updatedVariants[variantIndex] = variant;
//     onVariantsChange(updatedVariants);
//   };

//   const handleDragStart = (e, variantIndex, imageIndex) => {
//     e.stopPropagation();
//     const variant = variants[variantIndex];
//     if (variant.imagePreviews && variant.imagePreviews[imageIndex]) {
//       setDraggedItem({ variantIndex, imageIndex });
//       e.dataTransfer.effectAllowed = 'move';
//       e.dataTransfer.setData('text/plain', `${variantIndex}-${imageIndex}`);
//       e.dataTransfer.dropEffect = 'move';
//     } else {
//       e.preventDefault();
//     }
//   };

//   const handleDragOver = (e, variantIndex, imageIndex) => {
//     e.preventDefault();
//     e.stopPropagation();
//     e.dataTransfer.dropEffect = 'move';
    
//     if (draggedItem) {
//       const { variantIndex: srcV, imageIndex: srcI } = draggedItem;
//       if (srcV === variantIndex && srcI !== imageIndex) {
//         setDragOverItem({ variantIndex, imageIndex });
//       }
//     }
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragOverItem(null);
//   };

//   const handleDrop = (e, targetVariantIndex, targetImageIndex) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!draggedItem) {
//       setDragOverItem(null);
//       return;
//     }

//     const { variantIndex: srcV, imageIndex: srcI } = draggedItem;

//     if (srcV !== targetVariantIndex || srcI === targetImageIndex) {
//       setDraggedItem(null);
//       setDragOverItem(null);
//       return;
//     }

//     moveVariantImage(targetVariantIndex, srcI, targetImageIndex);
//     setDraggedItem(null);
//     setDragOverItem(null);
//   };

//   const handleDragEnd = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDraggedItem(null);
//     setDragOverItem(null);
//   };

//   // const handleAddVariant = async () => {
//   //   if (!newVariantName.trim()) {
//   //     toast.error('Please enter a variant name');
//   //     return;
//   //   }

//   //   const paddedImages = [0, 1, 2, 3].map(i => newVariantImages[i] ?? null);
//   //   const paddedPreviews = [0, 1, 2, 3].map(i => newVariantImagePreviews[i] ?? null);

//   //   const newVariant = {
//   //     id: Date.now().toString(),
//   //     name: newVariantName.trim(),
//   //     color: variantType.type === 'color' ? newVariantColor : undefined,
//   //     regularPrice: parseFloat(newVariantPrice) || 0,
//   //     discountPrice: parseFloat(newVariantDiscountPrice) || 0,
//   //     buyingPrice: parseFloat(newVariantBuyingPrice) || 0,
//   //     packagingCost: parseFloat(newVariantPackagingCost) || 0,
//   //     deliveryCost: parseFloat(newVariantDeliveryCost) || 0,
//   //     costPerItem: calculateVariantCost(newVariantBuyingPrice, newVariantPackagingCost, newVariantDeliveryCost),
//   //     stockQuantity: parseFloat(newVariantStock) || 0,
//   //     images: paddedImages,
//   //     imagePreviews: paddedPreviews,
//   //     subVariants: [...newVariantSubVariants]
//   //   };

//   //   onVariantsChange([...variants, newVariant]);

//   //   setNewVariantName('');
//   //   setNewVariantColor('#000000');
//   //   setNewVariantPrice('');
//   //   setNewVariantDiscountPrice('');
//   //   setNewVariantBuyingPrice('');
//   //   setNewVariantPackagingCost(defaultPackagingCost || '');
//   //   setNewVariantDeliveryCost(defaultDeliveryCost || '');
//   //   setNewVariantStock('');
//   //   setNewVariantImages([null, null, null, null]);
//   //   setNewVariantImagePreviews([null, null, null, null]);
//   //   setNewVariantSubVariants([]);
//   //   setShowAddSubVariantInForm(false);
//   //   setShowAddVariant(false);
//   //   toast.success(`Variant added successfully with ${newVariantSubVariants.length} sub-variant(s)`);
//   // };

//   const handleAddVariant = async () => {
//   if (!newVariantName.trim()) {
//     toast.error('Please enter a variant name');
//     return;
//   }

//   const paddedImages = [0, 1, 2, 3].map(i => newVariantImages[i] ?? null);
//   const paddedPreviews = [0, 1, 2, 3].map(i => newVariantImagePreviews[i] ?? null);

//   const newVariant = {
//     id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // ✅ More unique ID
//     name: newVariantName.trim(),
//     color: variantType.type === 'color' ? newVariantColor : undefined,
//     regularPrice: parseFloat(newVariantPrice) || 0,
//     discountPrice: parseFloat(newVariantDiscountPrice) || 0,
//     buyingPrice: parseFloat(newVariantBuyingPrice) || 0,
//     packagingCost: parseFloat(newVariantPackagingCost) || 0,
//     deliveryCost: parseFloat(newVariantDeliveryCost) || 0,
//     costPerItem: calculateVariantCost(newVariantBuyingPrice, newVariantPackagingCost, newVariantDeliveryCost),
//     stockQuantity: parseFloat(newVariantStock) || 0,
//     images: paddedImages,
//     imagePreviews: paddedPreviews,
//     subVariants: [...newVariantSubVariants]
//   };

//   onVariantsChange([...variants, newVariant]);

//   // Reset form
//   setNewVariantName('');
//   setNewVariantColor('#000000');
//   setNewVariantPrice('');
//   setNewVariantDiscountPrice('');
//   setNewVariantBuyingPrice('');
//   setNewVariantPackagingCost(defaultPackagingCost || '');
//   setNewVariantDeliveryCost(defaultDeliveryCost || '');
//   setNewVariantStock('');
//   setNewVariantImages([null, null, null, null]);
//   setNewVariantImagePreviews([null, null, null, null]);
//   setNewVariantSubVariants([]);
//   setShowAddSubVariantInForm(false);
//   setShowAddVariant(false);
//   toast.success(`Variant added successfully with ${newVariantSubVariants.length} sub-variant(s)`);
// };

//   const removeVariant = (index) => {
//     const updatedVariants = variants.filter((_, i) => i !== index);
//     onVariantsChange(updatedVariants);
//     toast.success('Variant removed');
//   };

//   const updateVariantField = (index, field, value) => {
//     const updatedVariants = [...variants];
//     const variant = { ...updatedVariants[index] };
    
//     variant[field] = value;
    
//     if (['buyingPrice', 'packagingCost', 'deliveryCost'].includes(field)) {
//       const bp = field === 'buyingPrice' ? parseFloat(value) || 0 : parseFloat(variant.buyingPrice) || 0;
//       const pc = field === 'packagingCost' ? parseFloat(value) || 0 : parseFloat(variant.packagingCost) || 0;
//       const dc = field === 'deliveryCost' ? parseFloat(value) || 0 : parseFloat(variant.deliveryCost) || 0;
//       variant.costPerItem = bp + pc + dc;
//     }
    
//     updatedVariants[index] = variant;
//     onVariantsChange(updatedVariants);
//   };

//   const updateVariantColor = (index, color) => {
//     const updatedVariants = [...variants];
//     updatedVariants[index] = { ...updatedVariants[index], color };
//     onVariantsChange(updatedVariants);
//   };

//   const updateVariantImages = async (variantIndex, files) => {
//     if (!files || files.length === 0) return;

//     const variant = variants[variantIndex];
//     const images = variant.images && variant.images.length === 4 ? [...variant.images] : [null, null, null, null];
//     const imagePreviews = variant.imagePreviews && variant.imagePreviews.length === 4 ? [...variant.imagePreviews] : [null, null, null, null];

//     const emptySlots = images.reduce((acc, v, i) => (v == null ? [...acc, i] : acc), []);
//     if (files.length > emptySlots.length) {
//       toast.error(`You can only upload ${emptySlots.length} more image(s). Maximum 4 images total.`);
//       return;
//     }

//     setIsUploading(true);
//     try {
//       const { uploadedUrls, uploadedPreviews } = await uploadMultipleVariantImages(files);
//       uploadedUrls.forEach((url, i) => { images[emptySlots[i]] = url; });
//       uploadedPreviews.forEach((url, i) => { imagePreviews[emptySlots[i]] = url; });

//       const updatedVariants = [...variants];
//       updatedVariants[variantIndex] = { ...variant, images, imagePreviews };
//       onVariantsChange(updatedVariants);
//       toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload images');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const removeVariantImage = (variantIndex, imageIndex) => {
//     const updatedVariants = [...variants];
//     const variant = { ...updatedVariants[variantIndex] };

//     const images = [...(variant.images || [null, null, null, null])];
//     const imagePreviews = [...(variant.imagePreviews || [null, null, null, null])];

//     if (imagePreviews[imageIndex]?.startsWith('blob:')) {
//       URL.revokeObjectURL(imagePreviews[imageIndex]);
//     }

//     images[imageIndex] = null;
//     imagePreviews[imageIndex] = null;

//     variant.images = images;
//     variant.imagePreviews = imagePreviews;
//     updatedVariants[variantIndex] = variant;
//     onVariantsChange(updatedVariants);
//     toast.success('Image removed');
//   };

//   const toggleVariantExpand = (index) => {
//     setExpandedVariant(expandedVariant === index ? null : index);
//   };

//   const getTypeLabel = (type) => {
//     const option = VARIANT_TYPE_OPTIONS.find(opt => opt.value === type);
//     return option ? option.label : type;
//   };

//   const renderSubVariantFormInAddVariant = () => {
//     return (
//       <div className="border border-[#72846A]/40 rounded-lg p-4 bg-[#72846A]/5 mt-3">
//         <div className="flex items-center justify-between mb-3">
//           <h4 className="text-sm font-medium text-[#004767]">Add Sub Variant</h4>
//           <button
//             type="button"
//             onClick={() => setShowAddSubVariantInForm(false)}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Sub Variant Name *</label>
//             <input
//               type="text"
//               value={newSubVariant.name}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, name: e.target.value }))}
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder="e.g., Red, Large, Cotton"
//             />
//           </div>

//           <div>
//             <div className="flex items-center justify-between mb-1">
//               <label className="block text-xs font-medium text-gray-700">Color <span className="text-gray-400">(add if needed)</span></label>
//               <button
//                 type="button"
//                 onClick={() => {
//                   if (newSubVariant.color) {
//                     setNewSubVariant(prev => ({ ...prev, color: '' }));
//                   } else {
//                     setNewSubVariant(prev => ({ ...prev, color: '#000000' }));
//                   }
//                 }}
//                 className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1"
//               >
//                 {newSubVariant.color ? (
//                   <>
//                     <X className="w-3 h-3" />
//                     Remove 
//                   </>
//                 ) : (
//                   <>
//                     <Plus className="w-3 h-3" />
//                     Add Color
//                   </>
//                 )}
//               </button>
//             </div>
//             {newSubVariant.color && (
//               <VariantColorPicker
//                 color={newSubVariant.color || '#000000'}
//                 onChange={(color) => setNewSubVariant(prev => ({ ...prev, color }))}
//                 onRemove={() => {}}
//               />
//             )}
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
//             <input
//               type="number"
//               value={newSubVariant.regularPrice}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, regularPrice: e.target.value }))}
//               onWheel={(e) => e.target.blur()}
//               min="0"
//               step="1"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder="0"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400">(Optional)</span></label>
//             <input
//               type="number"
//               value={newSubVariant.discountPrice}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, discountPrice: e.target.value }))}
//               onWheel={(e) => e.target.blur()}
//               min="0"
//               step="1"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder="0"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Stock Quantity *</label>
//             <input
//               type="number"
//               value={newSubVariant.stockQuantity}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, stockQuantity: e.target.value }))}
//               onWheel={(e) => e.target.blur()}
//               min="0"
//               step="1"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder="0"
//             />
//           </div>

//           {isAdminOrSuperAdmin && (
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span></label>
//               <input
//                 type="number"
//                 value={newSubVariant.buyingPrice}
//                 onChange={(e) => setNewSubVariant(prev => ({ ...prev, buyingPrice: e.target.value }))}
//                 onWheel={(e) => e.target.blur()}
//                 min="0"
//                 step="1"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                 placeholder="0"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Packaging Cost (৳) <span className="text-gray-400">(Optional)</span></label>
//             <input
//               type="number"
//               value={newSubVariant.packagingCost}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, packagingCost: e.target.value }))}
//               onWheel={(e) => e.target.blur()}
//               min="0"
//               step="1"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder={defaultPackagingCost || '0'}
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Cost (৳) <span className="text-gray-400">(Optional)</span></label>
//             <input
//               type="number"
//               value={newSubVariant.deliveryCost}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, deliveryCost: e.target.value }))}
//               onWheel={(e) => e.target.blur()}
//               min="0"
//               step="1"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder={defaultDeliveryCost || '0'}
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Cost Per Item (Auto-calculated)</label>
//             <input
//               type="text"
//               value={calculateVariantCost(
//                 newSubVariant.buyingPrice,
//                 newSubVariant.packagingCost,
//                 newSubVariant.deliveryCost
//               )}
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
//               readOnly
//               disabled
//             />
//           </div>

//           <div className="md:col-span-2">
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-xs font-medium text-gray-700">Sub Variant Images <span className="text-gray-400">(Max 4, Optional)</span></label>
//               {getFilledCount(newSubVariant.images) < 4 && (
//                 <button
//                   type="button"
//                   onClick={() => subVariantFileInputRef.current?.click()}
//                   disabled={isSubVariantUploading}
//                   className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1 disabled:opacity-50"
//                 >
//                   {isSubVariantUploading ? (
//                     <Loader2 className="w-3 h-3 animate-spin" />
//                   ) : (
//                     <Upload className="w-3 h-3" />
//                   )}
//                   {isSubVariantUploading ? 'Uploading...' : 'Select Images'}
//                 </button>
//               )}
//             </div>
            
//             <div className="grid grid-cols-4 gap-2">
//               {[0, 1, 2, 3].map((slotIdx) => {
//                 const imageUrl = newSubVariant.imagePreviews && newSubVariant.imagePreviews[slotIdx];
                
//                 return (
//                   <div
//                     key={slotIdx}
//                     className={`border-2 border-dashed rounded-lg p-2 text-center h-28 flex flex-col items-center justify-center transition-colors ${
//                       imageUrl 
//                         ? 'border-gray-200 bg-gray-100' 
//                         : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'
//                     }`}
//                   >
//                     {imageUrl ? (
//                       <div className="relative w-full h-full">
//                         <img 
//                           src={imageUrl} 
//                           alt={`Sub variant ${slotIdx + 1}`} 
//                           className="w-full h-full object-contain pointer-events-none select-none"
//                           draggable="false"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeSubVariantImageFromForm(slotIdx)}
//                           className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                         <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-[10px] rounded">
//                           {slotIdx + 1}
//                         </span>
//                       </div>
//                     ) : (
//                       <>
//                         <ImageIcon className="w-6 h-6 text-gray-400" />
//                         <p className="text-[10px] text-gray-400 mt-1">Empty</p>
//                       </>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//             <input
//               ref={subVariantFileInputRef}
//               type="file"
//               accept="image/jpeg,image/jpg,image/png,image/webp"
//               multiple
//               className="hidden"
//               onChange={handleSubVariantImageSelectForForm}
//               disabled={isSubVariantUploading}
//             />
//             <p className="text-xs text-gray-400 mt-1">Select multiple images at once (up to 4 total)</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 mt-4">
//           <button
//             type="button"
//             onClick={addSubVariantToForm}
//             className="px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#738769] transition-colors"
//           >
//             <Plus className="w-4 h-4 inline mr-1" />
//             Add Sub Variant
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               setShowAddSubVariantInForm(false);
//               setNewSubVariant({
//                 name: '',
//                 color: '',
//                 regularPrice: '',
//                 discountPrice: '',
//                 stockQuantity: '',
//                 buyingPrice: '',
//                 packagingCost: defaultPackagingCost || '',
//                 deliveryCost: defaultDeliveryCost || '',
//                 costPerItem: 0,
//                 images: [null, null, null, null],
//                 imagePreviews: [null, null, null, null]
//               });
//             }}
//             className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderSubVariantForm = (variantIndex) => {
//     return (
//       <div className="border border-[#72846A]/40 rounded-lg p-4 bg-[#72846A]/5 mt-3">
//         <div className="flex items-center justify-between mb-3">
//           <h4 className="text-sm font-medium text-[#004767]">Add Sub Variant</h4>
//           <button
//             type="button"
//             onClick={() => setShowAddSubVariant(null)}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Sub Variant Name *</label>
//             <input
//               type="text"
//               value={newSubVariant.name}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, name: e.target.value }))}
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder="e.g., Red, Large, Cotton"
//             />
//           </div>

//           <div>
//             <div className="flex items-center justify-between mb-1">
//               <label className="block text-xs font-medium text-gray-700">Color</label>
//               <button
//                 type="button"
//                 onClick={() => {
//                   if (newSubVariant.color) {
//                     setNewSubVariant(prev => ({ ...prev, color: '' }));
//                   } else {
//                     setNewSubVariant(prev => ({ ...prev, color: '#000000' }));
//                   }
//                 }}
//                 className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1"
//               >
//                 {newSubVariant.color ? (
//                   <>
//                     <X className="w-3 h-3" />
//                     Remove Color
//                   </>
//                 ) : (
//                   <>
//                     <Plus className="w-3 h-3" />
//                     Add Color
//                   </>
//                 )}
//               </button>
//             </div>
//             {newSubVariant.color && (
//               <VariantColorPicker
//                 color={newSubVariant.color || '#000000'}
//                 onChange={(color) => setNewSubVariant(prev => ({ ...prev, color }))}
//                 onRemove={() => {}}
//               />
//             )}
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
//             <input
//               type="number"
//               value={newSubVariant.regularPrice}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, regularPrice: e.target.value }))}
//               onWheel={(e) => e.target.blur()}
//               min="0"
//               step="1"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder="0"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400">(Optional)</span></label>
//             <input
//               type="number"
//               value={newSubVariant.discountPrice}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, discountPrice: e.target.value }))}
//               onWheel={(e) => e.target.blur()}
//               min="0"
//               step="1"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder="0"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Stock Quantity *</label>
//             <input
//               type="number"
//               value={newSubVariant.stockQuantity}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, stockQuantity: e.target.value }))}
//               onWheel={(e) => e.target.blur()}
//               min="0"
//               step="1"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder="0"
//             />
//           </div>

//           {isAdminOrSuperAdmin && (
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span></label>
//               <input
//                 type="number"
//                 value={newSubVariant.buyingPrice}
//                 onChange={(e) => setNewSubVariant(prev => ({ ...prev, buyingPrice: e.target.value }))}
//                 onWheel={(e) => e.target.blur()}
//                 min="0"
//                 step="1"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                 placeholder="0"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Packaging Cost (৳) <span className="text-gray-400">(Optional)</span></label>
//             <input
//               type="number"
//               value={newSubVariant.packagingCost}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, packagingCost: e.target.value }))}
//               onWheel={(e) => e.target.blur()}
//               min="0"
//               step="1"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder={defaultPackagingCost || '0'}
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Cost (৳) <span className="text-gray-400">(Optional)</span></label>
//             <input
//               type="number"
//               value={newSubVariant.deliveryCost}
//               onChange={(e) => setNewSubVariant(prev => ({ ...prev, deliveryCost: e.target.value }))}
//               onWheel={(e) => e.target.blur()}
//               min="0"
//               step="1"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               placeholder={defaultDeliveryCost || '0'}
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Cost Per Item (Auto-calculated)</label>
//             <input
//               type="text"
//               value={calculateVariantCost(
//                 newSubVariant.buyingPrice,
//                 newSubVariant.packagingCost,
//                 newSubVariant.deliveryCost
//               )}
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
//               readOnly
//               disabled
//             />
//           </div>

//           <div className="md:col-span-2">
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-xs font-medium text-gray-700">Sub Variant Images <span className="text-gray-400">(Max 4, Optional)</span></label>
//               {getFilledCount(newSubVariant.images) < 4 && (
//                 <button
//                   type="button"
//                   onClick={() => subVariantFileInputRef.current?.click()}
//                   disabled={isSubVariantUploading}
//                   className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1 disabled:opacity-50"
//                 >
//                   {isSubVariantUploading ? (
//                     <Loader2 className="w-3 h-3 animate-spin" />
//                   ) : (
//                     <Upload className="w-3 h-3" />
//                   )}
//                   {isSubVariantUploading ? 'Uploading...' : 'Select Images'}
//                 </button>
//               )}
//             </div>
            
//             <div className="grid grid-cols-4 gap-2">
//               {[0, 1, 2, 3].map((slotIdx) => {
//                 const imageUrl = newSubVariant.imagePreviews && newSubVariant.imagePreviews[slotIdx];
                
//                 return (
//                   <div
//                     key={slotIdx}
//                     className={`border-2 border-dashed rounded-lg p-2 text-center h-28 flex flex-col items-center justify-center transition-colors ${
//                       imageUrl 
//                         ? 'border-gray-200 bg-gray-100' 
//                         : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'
//                     }`}
//                   >
//                     {imageUrl ? (
//                       <div className="relative w-full h-full">
//                         <img 
//                           src={imageUrl} 
//                           alt={`Sub variant ${slotIdx + 1}`} 
//                           className="w-full h-full object-contain pointer-events-none select-none"
//                           draggable="false"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeSubVariantImageFromForm(slotIdx)}
//                           className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                         <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-[10px] rounded">
//                           {slotIdx + 1}
//                         </span>
//                       </div>
//                     ) : (
//                       <>
//                         <ImageIcon className="w-6 h-6 text-gray-400" />
//                         <p className="text-[10px] text-gray-400 mt-1">Empty</p>
//                       </>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//             <input
//               ref={subVariantFileInputRef}
//               type="file"
//               accept="image/jpeg,image/jpg,image/png,image/webp"
//               multiple
//               className="hidden"
//               onChange={handleSubVariantImageSelectForForm}
//               disabled={isSubVariantUploading}
//             />
//             <p className="text-xs text-gray-400 mt-1">Select multiple images at once (up to 4 total)</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 mt-4">
//           <button
//             type="button"
//             onClick={() => addSubVariant(variantIndex)}
//             className="px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#738769] transition-colors"
//           >
//             <Plus className="w-4 h-4 inline mr-1" />
//             Add Sub Variant
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               setShowAddSubVariant(null);
//               setNewSubVariant({
//                 name: '',
//                 color: '',
//                 regularPrice: '',
//                 discountPrice: '',
//                 stockQuantity: '',
//                 buyingPrice: '',
//                 packagingCost: defaultPackagingCost || '',
//                 deliveryCost: defaultDeliveryCost || '',
//                 costPerItem: 0,
//                 images: [null, null, null, null],
//                 imagePreviews: [null, null, null, null]
//               });
//             }}
//             className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20 mb-6">
//       <div className="p-5 border-b border-[#72846A]/20 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-[#72846A]/10 rounded-lg">
//             <Grid className="w-5 h-5 text-[#72846A]" />
//           </div>
//           <div>
//             <h3 className="font-semibold text-[#004767]">
//               {getTypeLabel(variantType.type)} Variants
//             </h3>
//             <p className="text-xs text-gray-500">
//               {variants.length} variant(s) • Type: {variantType.type}
//             </p>
//           </div>
//         </div>
//         <button
//           type="button"
//           onClick={onRemoveType}
//           className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//         >
//           <Trash2 className="w-4 h-4" />
//         </button>
//       </div>

//       <div className="p-5">
//         {variants.length > 0 && (
//           <div className="space-y-3 mb-4">
//             {variants.map((variant, index) => {
//               const filledCount = getFilledCount(variant.images);
//               const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
              
//               return (
//                 <div 
//                   key={variant.id || index} 
//                   className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#72846A]/40 transition-colors"
//                 >
//                   <div 
//                     className="flex items-center gap-3 p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
//                     onClick={() => toggleVariantExpand(index)}
//                   >
//                     <div className="flex-shrink-0">
//                       {variant.imagePreviews && variant.imagePreviews[0] ? (
//                         <img 
//                           src={variant.imagePreviews[0]} 
//                           alt={variant.name} 
//                           className="w-12 h-12 rounded-lg object-cover border border-gray-200 pointer-events-none"
//                         />
//                       ) : variant.color ? (
//                         <div 
//                           className="w-12 h-12 rounded-lg border-2 border-gray-200"
//                           style={{ backgroundColor: variant.color }}
//                         />
//                       ) : (
//                         <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
//                           <Package className="w-6 h-6 text-gray-400" />
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-gray-900 truncate">{variant.name}</p>
//                       <div className="flex items-center gap-3 text-xs text-gray-500">
//                         {!hasSubVariants ? (
//                           <>
//                             <span>৳{variant.regularPrice || 0}</span>
//                             {variant.discountPrice > 0 && (
//                               <span className="text-green-600">৳{variant.discountPrice}</span>
//                             )}
//                             <span className="text-gray-400">Stock: {variant.stockQuantity || 0}</span>
//                           </>
//                         ) : (
//                           <span className="text-[#72846A]">Has {variant.subVariants.length} sub-variant(s)</span>
//                         )}
//                         <span className="text-gray-400">Images: {filledCount}/4</span>
//                       </div>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         removeVariant(index);
//                       }}
//                       className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>

//                   {expandedVariant === index && (
//                     <div className="p-4 border-t border-gray-200 space-y-3">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">Variant Name</label>
//                           <input
//                             type="text"
//                             value={variant.name}
//                             onChange={(e) => updateVariantField(index, 'name', e.target.value)}
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                           />
//                         </div>

//                         {variantType.type === 'color' && (
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
//                             <VariantColorPicker
//                               color={variant.color || '#000000'}
//                               onChange={(color) => updateVariantColor(index, color)}
//                               onRemove={() => {}}
//                             />
//                           </div>
//                         )}

//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
//                           <input
//                             type="number"
//                             value={variant.regularPrice || ''}
//                             onChange={(e) => updateVariantField(index, 'regularPrice', e.target.value)}
//                             onWheel={(e) => e.target.blur()}
//                             min="0"
//                             step="1"
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                             placeholder="0"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400">(Optional)</span></label>
//                           <input
//                             type="number"
//                             value={variant.discountPrice || ''}
//                             onChange={(e) => updateVariantField(index, 'discountPrice', e.target.value)}
//                             onWheel={(e) => e.target.blur()}
//                             min="0"
//                             step="1"
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                             placeholder="0"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">Stock Quantity *</label>
//                           <input
//                             type="number"
//                             value={variant.stockQuantity || ''}
//                             onChange={(e) => updateVariantField(index, 'stockQuantity', e.target.value)}
//                             onWheel={(e) => e.target.blur()}
//                             min="0"
//                             step="1"
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                             placeholder="0"
//                           />
//                         </div>

//                         {isAdminOrSuperAdmin && (
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span></label>
//                             <input
//                               type="number"
//                               value={variant.buyingPrice || ''}
//                               onChange={(e) => updateVariantField(index, 'buyingPrice', e.target.value)}
//                               onWheel={(e) => e.target.blur()}
//                               min="0"
//                               step="1"
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                               placeholder="0"
//                             />
//                           </div>
//                         )}

//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">Packaging Cost (৳) <span className="text-gray-400">(Optional)</span></label>
//                           <input
//                             type="number"
//                             value={variant.packagingCost || ''}
//                             onChange={(e) => updateVariantField(index, 'packagingCost', e.target.value)}
//                             onWheel={(e) => e.target.blur()}
//                             min="0"
//                             step="1"
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                             placeholder="0"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Cost (৳) <span className="text-gray-400">(Optional)</span></label>
//                           <input
//                             type="number"
//                             value={variant.deliveryCost || ''}
//                             onChange={(e) => updateVariantField(index, 'deliveryCost', e.target.value)}
//                             onWheel={(e) => e.target.blur()}
//                             min="0"
//                             step="1"
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                             placeholder="0"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">Cost Per Item (৳) <span className="text-gray-400 text-xs">(Auto-calculated)</span></label>
//                           <input
//                             type="text"
//                             value={variant.costPerItem || 0}
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
//                             readOnly
//                             disabled
//                           />
//                         </div>

//                         <div className="md:col-span-2">
//                           <div className="flex items-center justify-between mb-2">
//                             <label className="block text-xs font-medium text-gray-700">Variant Images <span className="text-gray-400">(Max 4)</span></label>
//                             {getFilledCount(variant.images) < 4 && (
//                               <button
//                                 type="button"
//                                 onClick={() => {
//                                   const input = document.createElement('input');
//                                   input.type = 'file';
//                                   input.accept = 'image/jpeg,image/jpg,image/png,image/webp';
//                                   input.multiple = true;
//                                   input.onchange = (e) => {
//                                     const files = e.target.files;
//                                     if (files) updateVariantImages(index, Array.from(files));
//                                   };
//                                   input.click();
//                                 }}
//                                 disabled={isUploading}
//                                 className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1 disabled:opacity-50"
//                               >
//                                 {isUploading ? (
//                                   <Loader2 className="w-3 h-3 animate-spin" />
//                                 ) : (
//                                   <Upload className="w-3 h-3" />
//                                 )}
//                                 {isUploading ? 'Uploading...' : 'Add Images'}
//                               </button>
//                             )}
//                           </div>
                          
//                           <div className="grid grid-cols-4 gap-2">
//                             {[0, 1, 2, 3].map((slotIdx) => {
//                               const imageUrl = variant.imagePreviews && variant.imagePreviews[slotIdx];
//                               const isDragging = draggedItem && 
//                                 draggedItem.variantIndex === index && 
//                                 draggedItem.imageIndex === slotIdx;
//                               const isDragOver = dragOverItem && 
//                                 dragOverItem.variantIndex === index && 
//                                 dragOverItem.imageIndex === slotIdx && 
//                                 !isDragging;
                              
//                               return (
//                                 <div 
//                                   key={slotIdx}
//                                   draggable={!!imageUrl}
//                                   onDragStart={(e) => {
//                                     if (imageUrl) {
//                                       handleDragStart(e, index, slotIdx);
//                                     } else {
//                                       e.preventDefault();
//                                     }
//                                   }}
//                                   onDragOver={(e) => {
//                                     handleDragOver(e, index, slotIdx);
//                                   }}
//                                   onDragLeave={handleDragLeave}
//                                   onDrop={(e) => {
//                                     handleDrop(e, index, slotIdx);
//                                   }}
//                                   onDragEnd={handleDragEnd}
//                                   style={{ 
//                                     zIndex: isDragging ? 9999 : 'auto',
//                                     position: 'relative'
//                                   }}
//                                   className={`transition-all duration-200 ${
//                                     isDragging ? 'opacity-50 scale-95' : ''
//                                   } ${
//                                     isDragOver ? 'ring-2 ring-[#72846A] ring-offset-2 rounded-lg' : ''
//                                   }`}
//                                 >
//                                   {imageUrl ? (
//                                     <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 h-32 hover:border-[#72846A] transition-colors cursor-grab active:cursor-grabbing bg-gray-100">
//                                       <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10">
//                                         <GripVertical className="w-3 h-3 text-white" />
//                                       </div>
//                                       <img 
//                                         src={imageUrl} 
//                                         alt={`Variant ${slotIdx + 1}`} 
//                                         className="w-full h-full object-contain bg-gray-100 pointer-events-none select-none"
//                                         draggable="false"
//                                       />
//                                       <button
//                                         type="button"
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           removeVariantImage(index, slotIdx);
//                                         }}
//                                         className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-20"
//                                       >
//                                         <X className="w-3 h-3" />
//                                       </button>
//                                       <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded z-10">
//                                         {slotIdx + 1}
//                                       </span>
//                                     </div>
//                                   ) : (
//                                     <div className={`border-2 border-dashed rounded-lg p-2 text-center h-32 flex flex-col items-center justify-center transition-colors ${
//                                       isDragOver ? 'border-[#72846A] bg-pink-50' : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'
//                                     }`}>
//                                       <ImageIcon className="w-6 h-6 text-gray-400" />
//                                       <p className="text-xs text-gray-600">Slot {slotIdx + 1}</p>
//                                       <p className="text-[10px] text-gray-400 mt-1">Empty</p>
//                                     </div>
//                                   )}
//                                 </div>
//                               );
//                             })}
//                           </div>
//                           <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
//                             <GripVertical className="w-3 h-3" />
//                             Drag and drop to reorder images
//                           </p>
//                           {getFilledCount(variant.images) > 0 && (
//                             <p className="text-xs text-[#72846A] mt-1">{getFilledCount(variant.images)} of 4 images uploaded</p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="mt-4 pt-4 border-t border-gray-200">
//                         <div className="flex items-center justify-between mb-3">
//                           <h4 className="text-sm font-medium text-gray-700">
//                             Sub Variants {variant.subVariants && variant.subVariants.length > 0 && `(${variant.subVariants.length})`}
//                           </h4>
//                           <button
//                             type="button"
//                             onClick={() => setShowAddSubVariant(index)}
//                             className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1"
//                           >
//                             <Plus className="w-3 h-3" />
//                             Add Sub Variant
//                           </button>
//                         </div>

//                         {variant.subVariants && variant.subVariants.length > 0 ? (
//                           <div className="space-y-2">
//                             {variant.subVariants.map((subVariant, subIndex) => (
//                               <SubVariantItem
//                                 key={subVariant.id || subIndex}
//                                 subVariant={subVariant}
//                                 index={subIndex}
//                                 variantIndex={index}
//                                 onUpdate={updateSubVariant}
//                                 onRemove={removeSubVariant}
//                                 isAdminOrSuperAdmin={isAdminOrSuperAdmin}
//                                 defaultPackagingCost={defaultPackagingCost}
//                                 defaultDeliveryCost={defaultDeliveryCost}
//                                 expandedSubVariant={expandedSubVariant}
//                                 setExpandedSubVariant={setExpandedSubVariant}
//                               />
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
//                             <p className="text-sm text-gray-500">No sub variants added yet</p>
//                             <p className="text-xs text-gray-400 mt-1">Click "Add Sub Variant" to add one</p>
//                           </div>
//                         )}

//                         {showAddSubVariant === index && renderSubVariantForm(index)}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {showAddVariant ? (
//           <div className="border border-[#72846A]/40 rounded-lg p-4 bg-[#72846A]/5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Variant Name *</label>
//                 <input
//                   type="text"
//                   value={newVariantName}
//                   onChange={(e) => setNewVariantName(e.target.value)}
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                   placeholder={`Enter ${getTypeLabel(variantType.type).toLowerCase()} name`}
//                 />
//               </div>

//               {variantType.type === 'color' && (
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
//                   <VariantColorPicker
//                     color={newVariantColor}
//                     onChange={setNewVariantColor}
//                     onRemove={() => {}}
//                   />
//                 </div>
//               )}

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
//                 <input
//                   type="number"
//                   value={newVariantPrice}
//                   onChange={(e) => setNewVariantPrice(e.target.value)}
//                   onWheel={(e) => e.target.blur()}
//                   min="0"
//                   step="1"
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                   placeholder="0"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400">(Optional)</span></label>
//                 <input
//                   type="number"
//                   value={newVariantDiscountPrice}
//                   onChange={(e) => setNewVariantDiscountPrice(e.target.value)}
//                   onWheel={(e) => e.target.blur()}
//                   min="0"
//                   step="1"
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                   placeholder="0"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Stock Quantity *</label>
//                 <input
//                   type="number"
//                   value={newVariantStock}
//                   onChange={(e) => setNewVariantStock(e.target.value)}
//                   onWheel={(e) => e.target.blur()}
//                   min="0"
//                   step="1"
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                   placeholder="0"
//                 />
//               </div>

//               {isAdminOrSuperAdmin && (
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span></label>
//                   <input
//                     type="number"
//                     value={newVariantBuyingPrice}
//                     onChange={(e) => setNewVariantBuyingPrice(e.target.value)}
//                     onWheel={(e) => e.target.blur()}
//                     min="0"
//                     step="1"
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                     placeholder="0"
//                   />
//                 </div>
//               )}

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Packaging Cost (৳) <span className="text-gray-400">(Optional)</span></label>
//                 <input
//                   type="number"
//                   value={newVariantPackagingCost}
//                   onChange={(e) => setNewVariantPackagingCost(e.target.value)}
//                   onWheel={(e) => e.target.blur()}
//                   min="0"
//                   step="1"
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                   placeholder={defaultPackagingCost || '0'}
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Cost (৳) <span className="text-gray-400">(Optional)</span></label>
//                 <input
//                   type="number"
//                   value={newVariantDeliveryCost}
//                   onChange={(e) => setNewVariantDeliveryCost(e.target.value)}
//                   onWheel={(e) => e.target.blur()}
//                   min="0"
//                   step="1"
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                   placeholder={defaultDeliveryCost || '0'}
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Cost Per Item (Auto-calculated)</label>
//                 <input
//                   type="text"
//                   value={calculateVariantCost(newVariantBuyingPrice, newVariantPackagingCost, newVariantDeliveryCost)}
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
//                   readOnly
//                   disabled
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-xs font-medium text-gray-700">Variant Images <span className="text-gray-400">(Max 4, Optional)</span></label>
//                   {getFilledCount(newVariantImages) < 4 && (
//                     <button
//                       type="button"
//                       onClick={() => fileInputRef.current?.click()}
//                       disabled={isUploading}
//                       className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1 disabled:opacity-50"
//                     >
//                       {isUploading ? (
//                         <Loader2 className="w-3 h-3 animate-spin" />
//                       ) : (
//                         <Upload className="w-3 h-3" />
//                       )}
//                       {isUploading ? 'Uploading...' : 'Select Images'}
//                     </button>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-4 gap-2">
//                   {[0, 1, 2, 3].map((slotIdx) => {
//                     const imageUrl = newVariantImagePreviews[slotIdx];
                    
//                     return (
//                       <div
//                         key={slotIdx}
//                         className={`border-2 border-dashed rounded-lg p-2 text-center h-32 flex flex-col items-center justify-center transition-colors ${
//                           imageUrl 
//                             ? 'border-gray-200 bg-gray-100' 
//                             : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'
//                         }`}
//                       >
//                         {imageUrl ? (
//                           <div className="relative w-full h-full">
//                             <img 
//                               src={imageUrl} 
//                               alt={`Variant ${slotIdx + 1}`} 
//                               className="w-full h-full object-contain pointer-events-none select-none"
//                               draggable="false"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeNewVariantImage(slotIdx)}
//                               className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                             >
//                               <X className="w-3 h-3" />
//                             </button>
//                             <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded">
//                               {slotIdx + 1}
//                             </span>
//                           </div>
//                         ) : (
//                           <>
//                             <ImageIcon className="w-6 h-6 text-gray-400" />
//                             <p className="text-xs text-gray-600">Slot {slotIdx + 1}</p>
//                             <p className="text-[10px] text-gray-400 mt-1">Empty</p>
//                           </>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/jpeg,image/jpg,image/png,image/webp"
//                   multiple
//                   className="hidden"
//                   onChange={handleMultipleImageSelect}
//                   disabled={isUploading}
//                 />
//                 <p className="text-xs text-gray-400 mt-1">Select multiple images at once (up to 4 total)</p>
//                 {getFilledCount(newVariantImages) > 0 && (
//                   <p className="text-xs text-[#72846A] mt-1">{getFilledCount(newVariantImages)} of 4 images selected</p>
//                 )}
//               </div>
//             </div>

//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <div className="flex items-center justify-between mb-3">
//                 <h4 className="text-sm font-medium text-gray-700">
//                   Sub Variants {newVariantSubVariants.length > 0 && `(${newVariantSubVariants.length})`}
//                 </h4>
//                 <button
//                   type="button"
//                   onClick={() => setShowAddSubVariantInForm(!showAddSubVariantInForm)}
//                   className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1"
//                 >
//                   <Plus className="w-3 h-3" />
//                   Add Sub Variant
//                 </button>
//               </div>

//               {newVariantSubVariants.length > 0 && (
//                 <div className="space-y-2 mb-3">
//                   {newVariantSubVariants.map((subVariant, subIndex) => (
//                     <div key={subVariant.id || subIndex} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-sm text-gray-900">{subVariant.name}</p>
//                           <div className="flex items-center gap-3 text-xs text-gray-500">
//                             <span>৳{subVariant.regularPrice || 0}</span>
//                             {subVariant.discountPrice > 0 && (
//                               <span className="text-green-600">৳{subVariant.discountPrice}</span>
//                             )}
//                             <span className="text-gray-400">Stock: {subVariant.stockQuantity || 0}</span>
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeSubVariantFromForm(subIndex)}
//                           className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {showAddSubVariantInForm && renderSubVariantFormInAddVariant()}
//             </div>

//             <div className="flex items-center gap-3 mt-4">
//               <button
//                 type="button"
//                 onClick={handleAddVariant}
//                 className="px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#738769] transition-colors"
//               >
//                 <Plus className="w-4 h-4 inline mr-1" />
//                 Add Variant {newVariantSubVariants.length > 0 && `with ${newVariantSubVariants.length} sub-variant(s)`}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowAddVariant(false);
//                   setNewVariantName('');
//                   setNewVariantColor('#000000');
//                   setNewVariantPrice('');
//                   setNewVariantDiscountPrice('');
//                   setNewVariantBuyingPrice('');
//                   setNewVariantPackagingCost(defaultPackagingCost || '');
//                   setNewVariantDeliveryCost(defaultDeliveryCost || '');
//                   setNewVariantStock('');
//                   setNewVariantImages([null, null, null, null]);
//                   setNewVariantImagePreviews([null, null, null, null]);
//                   setNewVariantSubVariants([]);
//                   setShowAddSubVariantInForm(false);
//                 }}
//                 className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ) : (
//           <button
//             type="button"
//             onClick={() => setShowAddVariant(true)}
//             className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#72846A] border-2 border-dashed border-[#72846A]/40 rounded-lg hover:bg-[#72846A]/5 transition-colors"
//           >
//             <Plus className="w-4 h-4" />
//             Add {getTypeLabel(variantType.type)} Variant
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // ADD-ONES SECTION COMPONENT
// // ============================================================
// const AddOnesSection = ({ 
//   addOnes, 
//   onAddProduct, 
//   onRemoveProduct,
//   maxProducts = 5 
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const searchTimeoutRef = useRef(null);

//   const searchProducts = async (query) => {
//     if (!query.trim() || query.length < 2) {
//       setSearchResults([]);
//       setShowResults(false);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products?search=${encodeURIComponent(query)}&limit=10`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data.filter(
//           product => !addOnes.some(rp => rp._id === product._id)
//         );
//         setSearchResults(filtered);
//         setShowResults(true);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       toast.error('Failed to search products');
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
    
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }
    
//     searchTimeoutRef.current = setTimeout(() => {
//       searchProducts(value);
//     }, 500);
//   };

//   const handleAddProduct = (product) => {
//     if (addOnes.length >= maxProducts) {
//       toast.error(`Maximum ${maxProducts} add-ones allowed`);
//       return;
//     }
//     onAddProduct(product);
//     setSearchTerm('');
//     setSearchResults([]);
//     setShowResults(false);
//     toast.success(`"${product.productName}" added as add-on`);
//   };

//   const handleRemoveProduct = (productId) => {
//     onRemoveProduct(productId);
//     toast.success('Add-on removed');
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//       <div className="p-5 border-b border-[#72846A]/20">
//         <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//           <LinkIcon className="w-5 h-5 text-[#72846A]" />
//           Add-Ones <span className="text-gray-400 text-xs">(Optional, Max {maxProducts})</span>
//         </h2>
//         <p className="text-xs text-gray-500 mt-1">Search and add products that can be purchased as add-ons with this product</p>
//       </div>
//       <div className="p-5">
//         <div className="relative mb-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder="Search products by name, SKU, or brand..."
//               className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//               disabled={addOnes.length >= maxProducts}
//             />
//             {isSearching && (
//               <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#72846A] animate-spin" />
//             )}
//           </div>
          
//           {showResults && searchResults.length > 0 && (
//             <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//               {searchResults.map(product => (
//                 <div
//                   key={product._id}
//                   onClick={() => handleAddProduct(product)}
//                   className="w-full flex items-center gap-3 px-4 py-3 hover:bg-pink-50 transition-colors text-left border-b border-gray-100 last:border-0 cursor-pointer"
//                 >
//                   {product.images && product.images.length > 0 ? (
//                     <img 
//                       src={product.images[0].url} 
//                       alt={product.productName}
//                       className="w-10 h-10 rounded-lg object-cover border border-gray-200"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
//                       <Package className="w-5 h-5 text-gray-400" />
//                     </div>
//                   )}
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 truncate">{product.productName}</p>
//                     <div className="flex items-center gap-3 text-xs text-gray-500">
//                       <span>৳{product.regularPrice}</span>
//                       {product.brand && <span>• {product.brand}</span>}
//                       {product.skuCode && <span>• {product.skuCode}</span>}
//                     </div>
//                   </div>
//                   <div className="p-1 text-[#72846A] hover:bg-pink-100 rounded">
//                     <Plus className="w-4 h-4" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           {showResults && searchResults.length === 0 && searchTerm.length >= 2 && (
//             <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center">
//               <p className="text-sm text-gray-500">No products found matching "{searchTerm}"</p>
//             </div>
//           )}
//         </div>

//         {addOnes.length > 0 ? (
//           <div className="space-y-2">
//             {addOnes.map((product, index) => (
//               <div 
//                 key={product._id || index}
//                 className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#72846A]/40 transition-colors"
//               >
//                 {product.images && product.images.length > 0 ? (
//                   <img 
//                     src={product.images[0].url} 
//                     alt={product.productName}
//                     className="w-12 h-12 rounded-lg object-cover border border-gray-200"
//                   />
//                 ) : (
//                   <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
//                     <Package className="w-6 h-6 text-gray-400" />
//                   </div>
//                 )}
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-900 truncate">{product.productName}</p>
//                   <div className="flex items-center gap-3 text-xs text-gray-500">
//                     <span>৳{product.regularPrice}</span>
//                     {product.brand && <span>• {product.brand}</span>}
//                     {product.skuCode && <span>• {product.skuCode}</span>}
//                     <span className="text-gray-400">• Added as add-on</span>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveProduct(product._id)}
//                   className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
//             <LinkIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//             <p className="text-sm text-gray-500">No add-ones added yet</p>
//             <p className="text-xs text-gray-400 mt-1">Search and add up to {maxProducts} add-on products</p>
//           </div>
//         )}
        
//         {addOnes.length > 0 && (
//           <p className="text-xs text-gray-400 mt-3 text-center">
//             {addOnes.length} of {maxProducts} add-ones added
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // IMAGE UPLOAD HELPERS
// // ============================================================

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
        
//         const isTransparent = file.type === 'image/png' || 
//                              file.type === 'image/webp' || 
//                              file.type === 'image/gif';
        
//         if (isTransparent) {
//           ctx.clearRect(0, 0, canvas.width, canvas.height);
//         }
        
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
//         let outputFormat = 'image/jpeg';
//         let quality = 0.4;
        
//         if (isTransparent) {
//           outputFormat = 'image/png';
//           quality = 0.9;
//         } else {
//           if (file.size > 5 * 1024 * 1024) quality = 0.25;
//           else if (file.size > 2 * 1024 * 1024) quality = 0.3;
//           else if (file.size > 1 * 1024 * 1024) quality = 0.35;
//           else if (file.size > 500 * 1024) quality = 0.45;
//           else quality = 0.55;
//         }
        
//         if (outputFormat === 'image/png') {
//           canvas.toBlob(
//             (blob) => {
//               const compressedFile = new File([blob], file.name, {
//                 type: 'image/png',
//                 lastModified: Date.now(),
//               });
//               resolve(compressedFile);
//             },
//             'image/png'
//           );
//         } else {
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
//         }
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
//   formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
  
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

// const uploadVideoToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
  
//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
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
//     console.error('Cloudinary video upload error:', error);
//     throw error;
//   }
// };

// const getYouTubeVideoId = (url) => {
//   const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// // ============================================================
// // Image Slot Picker Modal
// // ============================================================
// const ImageSlotPickerModal = ({ isOpen, onClose, onUploadFromDevice, onChooseFromLibrary }) => {
//   if (!isOpen) return null;
  
//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-[#72846A]/20">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-[#004767]">Add Image to Slot</h3>
//           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>
        
//         <p className="text-sm text-gray-500 mb-6">Choose how you want to add an image to this slot:</p>
        
//         <div className="space-y-3">
//           <button
//             onClick={onUploadFromDevice}
//             className="w-full flex items-center gap-4 px-4 py-4 bg-white border-2 border-[#72846A]/20 rounded-xl hover:border-[#72846A] hover:bg-[#72846A]/5 transition-all group"
//           >
//             <div className="w-12 h-12 rounded-full bg-[#72846A]/10 flex items-center justify-center group-hover:bg-[#72846A]/20 transition-colors">
//               <Upload className="w-6 h-6 text-[#72846A]" />
//             </div>
//             <div className="flex-1 text-left">
//               <p className="font-medium text-[#004767]">Upload from Device</p>
//               <p className="text-xs text-gray-400">Select an image from your computer</p>
//             </div>
//             <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#72846A] transition-colors" />
//           </button>
          
//           <button
//             onClick={onChooseFromLibrary}
//             className="w-full flex items-center gap-4 px-4 py-4 bg-white border-2 border-[#72846A]/20 rounded-xl hover:border-[#72846A] hover:bg-[#72846A]/5 transition-all group"
//           >
//             <div className="w-12 h-12 rounded-full bg-[#72846A]/10 flex items-center justify-center group-hover:bg-[#72846A]/20 transition-colors">
//               <ImageIcon className="w-6 h-6 text-[#72846A]" />
//             </div>
//             <div className="flex-1 text-left">
//               <p className="font-medium text-[#004767]">Choose from Media Library</p>
//               <p className="text-xs text-gray-400">Select an image from your media library</p>
//             </div>
//             <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#72846A] transition-colors" />
//           </button>
//         </div>
        
//         <button
//           onClick={onClose}
//           className="w-full mt-4 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // MAIN COMPONENT
// // ============================================================

// export default function EditProductPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('id');
  
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isGeneratingSku, setIsGeneratingSku] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [isMounted, setIsMounted] = useState(false);
//   const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
//   const [showMeta, setShowMeta] = useState(false);
//   const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
//   const [showFaqs, setShowFaqs] = useState(false);
//   const [showAddBrandModal, setShowAddBrandModal] = useState(false);
//   const [keywordInput, setKeywordInput] = useState('');
//   const [showCustomUnit, setShowCustomUnit] = useState(false);
//   const [imagesToDelete, setImagesToDelete] = useState([]);
//   const [originalProduct, setOriginalProduct] = useState(null);
//   const [originalBarcode, setOriginalBarcode] = useState(null);
//   const [isValidatingSku, setIsValidatingSku] = useState(false);
//   const [isSkuUnique, setIsSkuUnique] = useState(null);
//   const [ratingHover, setRatingHover] = useState(0);
//   const skuValidateTimeoutRef = useRef(null);
//   const [productTags, setProductTags] = useState([]);
//   const [isLoadingTags, setIsLoadingTags] = useState(false);
  
//   // Media Library States
//   const [showMediaPicker, setShowMediaPicker] = useState(false);
//   const [showSingleMediaPicker, setShowSingleMediaPicker] = useState(false);
//   const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
//   const [showSlotPicker, setShowSlotPicker] = useState(false);
//   const [slotPickerIndex, setSlotPickerIndex] = useState(null);
  
//   // Video Media Library States
//   const [showVideoMediaPicker, setShowVideoMediaPicker] = useState(false);
  
//   // ========== SLUG STATE ==========
//   const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
//   const [isCheckingSlug, setIsCheckingSlug] = useState(false);
//   const [isSlugAvailable, setIsSlugAvailable] = useState(null);
//   const slugCheckTimeoutRef = useRef(null);

//   // Video states
//   const [videoType, setVideoType] = useState('upload');
//   const [youtubeUrl, setYoutubeUrl] = useState('');
//   const [videoUpload, setVideoUpload] = useState({
//     file: null,
//     preview: null,
//     uploading: false,
//     error: '',
//     url: null,
//     publicId: null
//   });
//   const videoInputRef = useRef(null);

//   // ========== VARIANT STATES ==========
//   const [variantTypes, setVariantTypes] = useState([]);
//   const [newVariantType, setNewVariantType] = useState('');
//   const [showAddVariantType, setShowAddVariantType] = useState(false);
//   const [customVariantTypeName, setCustomVariantTypeName] = useState('');

//   // ========== ADD-ONES STATE ==========
//   const [addOnes, setAddOnes] = useState([]);

//   // Refs to track if editor content has been set
//   const shortDescContentSet = useRef(false);
//   const fullDescContentSet = useRef(false);
//   const deliveryInfoContentSet = useRef(false);

//   const fileInputRefs = useRef([]);
//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [dragOverIndex, setDragOverIndex] = useState(null);

//   // ============================================================
//   // FORM DATA
//   // ============================================================
//   const [formData, setFormData] = useState({
//     productName: '',
//     slug: '',
//     skuCode: '',
//     shortDescription: '',
//     fullDescription: '',
//     category: '',
//     subcategory: '',
//     childSubcategory: '',
//     brand: '',
//     stockQuantity: '',
//     stockAlertQuantity: '',
//     regularPrice: '',
//     costPerItem: '',
//     discountPrice: '',
//     buyingPrice: '',
//     packagingCost: '',
//     deliveryCost: '',
//     unit: 'pcs',
//     customUnit: '',
//     colors: [],
//     deliveryInfo: '',
//     additionalInfo: [],
//     tags: [],
//     isFeatured: false,
//     showOnBanner: false,
//     rating: 0,
//     faqs: [],
//     videoUrl: '',
//     videoPublicId: '',
//     videoType: 'upload',
//     metaSettings: {
//       metaTitle: '',
//       metaDescription: '',
//       metaKeywords: []
//     }
//   });

//   const [productImages, setProductImages] = useState([
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
//     { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null }
//   ]);

//   const [errors, setErrors] = useState({});

//   const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//   const maxFileSize = 5 * 1024 * 1024;

//   const shortDescEditor = useEditor({
//     extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
//     content: '',
//     onUpdate: ({ editor }) => setFormData(prev => ({ ...prev, shortDescription: editor.getHTML() })),
//     immediatelyRender: false,
//     editable: true,
//   });

//   const fullDescEditor = useEditor({
//     extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
//     content: '',
//     onUpdate: ({ editor }) => setFormData(prev => ({ ...prev, fullDescription: editor.getHTML() })),
//     immediatelyRender: false,
//     editable: true,
//   });

//   const deliveryInfoEditor = useEditor({
//     extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
//     content: '',
//     onUpdate: ({ editor }) => setFormData(prev => ({ ...prev, deliveryInfo: editor.getHTML() })),
//     immediatelyRender: false,
//     editable: true,
//   });

//   // ============================================================
//   // COST PER ITEM AUTO-CALCULATION
//   // ============================================================
//   const calculateCostPerItem = useCallback(() => {
//     const buyingPriceValue = formData.buyingPrice;
//     const packagingCostValue = formData.packagingCost;
//     const deliveryCostValue = formData.deliveryCost;
    
//     const buyingPrice = buyingPriceValue === '' || buyingPriceValue === null || buyingPriceValue === undefined 
//       ? 0 
//       : Number(buyingPriceValue);
      
//     const packagingCost = packagingCostValue === '' || packagingCostValue === null || packagingCostValue === undefined 
//       ? 0 
//       : Number(packagingCostValue);
      
//     const deliveryCost = deliveryCostValue === '' || deliveryCostValue === null || deliveryCostValue === undefined 
//       ? 0 
//       : Number(deliveryCostValue);
    
//     const hasBuyingPrice = buyingPriceValue !== '' && 
//                            buyingPriceValue !== null && 
//                            buyingPriceValue !== undefined && 
//                            buyingPrice > 0;
    
//     const hasPackagingCost = packagingCostValue !== '' && 
//                              packagingCostValue !== null && 
//                              packagingCostValue !== undefined && 
//                              packagingCost > 0;
    
//     const hasDeliveryCost = deliveryCostValue !== '' && 
//                             deliveryCostValue !== null && 
//                             deliveryCostValue !== undefined && 
//                             deliveryCost > 0;
    
//     const filledCount = [hasBuyingPrice, hasPackagingCost, hasDeliveryCost].filter(Boolean).length;
    
//     let displayValue = '';
    
//     if (filledCount === 0) {
//       displayValue = '';
//     } else if (filledCount < 3) {
//       const parts = [];
//       if (hasBuyingPrice) parts.push(`${buyingPrice}`);
//       if (hasPackagingCost) parts.push(`${packagingCost}`);
//       if (hasDeliveryCost) parts.push(`${deliveryCost}`);
//       while (parts.length < 3) {
//         parts.push('?');
//       }
//       displayValue = parts.join(' + ');
//     } else {
//       const total = buyingPrice + packagingCost + deliveryCost;
//       displayValue = total.toString();
//     }
    
//     setFormData(prev => {
//       if (prev.costPerItem === displayValue) return prev;
//       return { ...prev, costPerItem: displayValue };
//     });
//   }, [formData.buyingPrice, formData.packagingCost, formData.deliveryCost]);

//   useEffect(() => {
//     calculateCostPerItem();
//   }, [formData.buyingPrice, formData.packagingCost, formData.deliveryCost, calculateCostPerItem]);

//   // ============================================================
//   // FAQ HANDLERS
//   // ============================================================
//   const addFaq = () => {
//     setFormData(prev => ({
//       ...prev,
//       faqs: [...prev.faqs, { question: '', answer: '' }]
//     }));
//   };

//   const updateFaq = (index, field, value) => {
//     const updatedFaqs = [...formData.faqs];
//     updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
//     setFormData(prev => ({ ...prev, faqs: updatedFaqs }));
//   };

//   const removeFaq = (index) => {
//     const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, faqs: updatedFaqs }));
//   };

//   // ============================================================
//   // VARIANT HANDLERS
//   // ============================================================
//  const addVariantType = () => {
//   let typeName = newVariantType;
  
//   if (newVariantType === 'custom') {
//     if (!customVariantTypeName.trim()) {
//       toast.error('Please enter a custom variant type name');
//       return;
//     }
//     typeName = customVariantTypeName.trim().toLowerCase();
//   }

//   if (variantTypes.some(vt => vt.type === typeName)) {
//     toast.error(`Variant type "${typeName}" already exists`);
//     return;
//   }

//   setVariantTypes([
//     ...variantTypes,
//     {
//       id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // ✅ More unique ID
//       type: typeName,
//       variants: []
//     }
//   ]);

//   setNewVariantType('');
//   setCustomVariantTypeName('');
//   setShowAddVariantType(false);
//   toast.success(`Variant type "${typeName}" added`);
// };

//   const removeVariantType = (index) => {
//     if (confirm('Remove this variant type and all its variants?')) {
//       const updatedTypes = variantTypes.filter((_, i) => i !== index);
//       setVariantTypes(updatedTypes);
//       toast.success('Variant type removed');
//     }
//   };

//   const updateVariantTypeVariants = (index, variants) => {
//     const updatedTypes = [...variantTypes];
//     updatedTypes[index] = { ...updatedTypes[index], variants };
//     setVariantTypes(updatedTypes);
//   };

//   // ============================================================
//   // SLUG UNIQUENESS CHECK
//   // ============================================================
//   const checkSlugUniqueness = async (slug) => {
//     if (!slug || slug.length < 2) {
//       setIsSlugAvailable(null);
//       return;
//     }

//     if (originalProduct?.slug === slug) {
//       setIsSlugAvailable(true);
//       return;
//     }

//     setIsCheckingSlug(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/check-slug/${encodeURIComponent(slug)}`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const data = await response.json();
//       setIsSlugAvailable(data.data?.isAvailable !== false);
//     } catch (error) {
//       console.error('Error checking slug:', error);
//       setIsSlugAvailable(null);
//     } finally {
//       setIsCheckingSlug(false);
//     }
//   };

//   // ============================================================
//   // SLUG EFFECTS
//   // ============================================================
//   useEffect(() => {
//     if (formData.productName && !isSlugManuallyEdited) {
//       const generatedSlug = formData.productName
//         .toLowerCase()
//         .trim()
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/(^-|-$)+/g, '');
      
//       setFormData(prev => ({ ...prev, slug: generatedSlug }));
//     }
//   }, [formData.productName, isSlugManuallyEdited]);

//   useEffect(() => {
//     if (slugCheckTimeoutRef.current) {
//       clearTimeout(slugCheckTimeoutRef.current);
//     }
    
//     if (formData.slug && isSlugManuallyEdited) {
//       slugCheckTimeoutRef.current = setTimeout(() => {
//         checkSlugUniqueness(formData.slug);
//       }, 500);
//     } else if (formData.slug && !isSlugManuallyEdited) {
//       checkSlugUniqueness(formData.slug);
//     } else {
//       setIsSlugAvailable(null);
//     }
    
//     return () => {
//       if (slugCheckTimeoutRef.current) {
//         clearTimeout(slugCheckTimeoutRef.current);
//       }
//     };
//   }, [formData.slug, isSlugManuallyEdited]);

//   // ============================================================
//   // EDITOR EFFECTS
//   // ============================================================
//   useEffect(() => {
//     if (shortDescEditor && originalProduct?.shortDescription && !shortDescContentSet.current) {
//       const timer = setTimeout(() => {
//         shortDescEditor.commands.setContent(originalProduct.shortDescription);
//         shortDescContentSet.current = true;
//       }, 500);
//       return () => clearTimeout(timer);
//     }
//   }, [shortDescEditor, originalProduct?.shortDescription]);

//   useEffect(() => {
//     if (fullDescEditor && originalProduct?.fullDescription && !fullDescContentSet.current) {
//       const timer = setTimeout(() => {
//         fullDescEditor.commands.setContent(originalProduct.fullDescription);
//         fullDescContentSet.current = true;
//       }, 500);
//       return () => clearTimeout(timer);
//     }
//   }, [fullDescEditor, originalProduct?.fullDescription]);

//   useEffect(() => {
//     if (deliveryInfoEditor && originalProduct?.deliveryInfo && !deliveryInfoContentSet.current) {
//       const timer = setTimeout(() => {
//         deliveryInfoEditor.commands.setContent(originalProduct.deliveryInfo);
//         deliveryInfoContentSet.current = true;
//       }, 500);
//       return () => clearTimeout(timer);
//     }
//   }, [deliveryInfoEditor, originalProduct?.deliveryInfo]);

//   useEffect(() => {
//     setIsMounted(true);
//     fetchBrands();
//     fetchCategories();
//     fetchTags();
//   }, []);

//   useEffect(() => {
//     if (productId) {
//       fetchProduct();
//     } else {
//       toast.error('No product ID provided');
//       router.push('/authorize/all-products');
//     }
//   }, [productId]);

//   useEffect(() => {
//     if (formData.category) {
//       fetchSubcategories(formData.category);
//     } else {
//       setSubcategories([]);
//       setFormData(prev => ({ ...prev, subcategory: '', childSubcategory: '' }));
//       setChildSubcategories([]);
//     }
//   }, [formData.category]);

//   useEffect(() => {
//     if (formData.category && formData.subcategory) {
//       fetchChildSubcategories(formData.category, formData.subcategory);
//     } else {
//       setChildSubcategories([]);
//       setFormData(prev => ({ ...prev, childSubcategory: '' }));
//     }
//   }, [formData.subcategory]);

//   useEffect(() => {
//     if (skuValidateTimeoutRef.current) clearTimeout(skuValidateTimeoutRef.current);
//     skuValidateTimeoutRef.current = setTimeout(() => {
//       validateSku(formData.skuCode);
//     }, 500);
//     return () => { if (skuValidateTimeoutRef.current) clearTimeout(skuValidateTimeoutRef.current); };
//   }, [formData.skuCode]);

//   // ============================================================
//   // FORCE CALCULATION WHEN PRODUCT DATA IS FULLY LOADED
//   // ============================================================
//   useEffect(() => {
//     if (!isLoading && originalProduct) {
//       const hasValues = formData.buyingPrice !== '' || 
//                         formData.packagingCost !== '' || 
//                         formData.deliveryCost !== '';
      
//       if (hasValues) {
//         const timer = setTimeout(() => {
//           calculateCostPerItem();
//         }, 200);
//         return () => clearTimeout(timer);
//       }
//     }
//   }, [isLoading, originalProduct, formData.buyingPrice, formData.packagingCost, formData.deliveryCost]);

//   // ============================================================
//   // FETCH FUNCTIONS
//   // ============================================================
//   const fetchBrands = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/brands`, { headers: { 'Authorization': `Bearer ${token}` } });
//       const data = await response.json();
//       if (data.success) setBrands(data.data);
//     } catch (error) { console.error('Error fetching brands:', error); }
//   };

//   const fetchCategories = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories`, { headers: { 'Authorization': `Bearer ${token}` } });
//       const data = await response.json();
//       if (data.success) setCategories(data.data);
//     } catch (error) { toast.error('Failed to fetch categories'); }
//   };

//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories/${categoryId}/subcategories`, { headers: { 'Authorization': `Bearer ${token}` } });
//       const data = await response.json();
//       if (data.success) setSubcategories(data.data.subcategories);
//       else setSubcategories([]);
//     } catch (error) { setSubcategories([]); }
//   };

//   const fetchChildSubcategories = async (categoryId, subcategoryId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories/${categoryId}/subcategories/${subcategoryId}/children`, { headers: { 'Authorization': `Bearer ${token}` } });
//       const data = await response.json();
//       if (data.success) setChildSubcategories(data.data.children);
//       else setChildSubcategories([]);
//     } catch (error) { setChildSubcategories([]); }
//   };

//   const fetchTags = async () => {
//     setIsLoadingTags(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/tags?isActive=true`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setProductTags(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching tags:', error);
//       toast.error('Failed to fetch tags');
//     } finally {
//       setIsLoadingTags(false);
//     }
//   };

//   const validateSku = async (skuValue) => {
//     if (!skuValue || skuValue.length < 3) {
//       setIsSkuUnique(null);
//       return;
//     }
//     if (originalProduct?.skuCode === skuValue) {
//       setIsSkuUnique(true);
//       return;
//     }
//     setIsValidatingSku(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/validate-sku/${skuValue}?excludeId=${productId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setIsSkuUnique(data.data.isUnique);
//         if (!data.data.isUnique) setErrors(prev => ({ ...prev, skuCode: data.data.message }));
//         else setErrors(prev => ({ ...prev, skuCode: null }));
//       }
//     } catch (error) { console.error('SKU validation error:', error); }
//     finally { setIsValidatingSku(false); }
//   };

//   const generateSkuFromBackend = async () => {
//     setIsGeneratingSku(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/generate-sku`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setFormData(prev => ({ ...prev, skuCode: data.data.skuCode }));
//         toast.success('SKU generated successfully');
//       } else toast.error(data.error || 'Failed to generate SKU');
//     } catch (error) { toast.error('Failed to generate SKU'); }
//     finally { setIsGeneratingSku(false); }
//   };

//   const handleBrandAdded = (newBrand) => {
//     setBrands(prev => [...prev, newBrand]);
//     setFormData(prev => ({ ...prev, brand: newBrand.name }));
//   };

//   // ============================================================
//   // ADD-ONES HANDLERS
//   // ============================================================
//   const handleAddAddOne = (product) => {
//     if (addOnes.length >= 5) {
//       toast.error('Maximum 5 add-ones allowed');
//       return;
//     }
//     setAddOnes([...addOnes, product]);
//   };

//   const handleRemoveAddOne = (productId) => {
//     setAddOnes(addOnes.filter(p => p._id !== productId));
//   };

//   // ============================================================
//   // VIDEO HANDLERS
//   // ============================================================
//   const handleVideoFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (videoUpload.preview?.startsWith('blob:')) {
//       URL.revokeObjectURL(videoUpload.preview);
//     }

//     const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
//     const maxVideoSize = 100 * 1024 * 1024;

//     if (!allowedVideoTypes.includes(file.type)) {
//       setVideoUpload({ ...videoUpload, error: 'Invalid format. Allowed: MP4, WebM, OGG, MOV' });
//       toast.error('Invalid video format');
//       return;
//     }

//     if (file.size > maxVideoSize) {
//       setVideoUpload({ ...videoUpload, error: `File too large. Max: 100MB` });
//       toast.error('Video too large. Max 100MB');
//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
//     setVideoUpload({
//       file: file,
//       preview: previewUrl,
//       uploading: true,
//       error: '',
//       url: null,
//       publicId: null
//     });

//     try {
//       const { url, publicId } = await uploadVideoToCloudinary(file);
//       setVideoUpload({
//         file: file,
//         preview: previewUrl,
//         uploading: false,
//         error: '',
//         url: url,
//         publicId: publicId
//       });
//       setFormData(prev => ({ ...prev, videoUrl: url, videoPublicId: publicId, videoType: 'upload' }));
//       toast.success('Video uploaded successfully');
//     } catch (error) {
//       setVideoUpload({
//         ...videoUpload,
//         error: 'Failed to upload video',
//         uploading: false,
//         preview: null,
//         file: null
//       });
//       toast.error('Failed to upload video');
//     }
//   };

//   const handleYoutubeUrlChange = (url) => {
//     setYoutubeUrl(url);
//     const videoId = getYouTubeVideoId(url);
//     if (videoId) {
//       const embedUrl = `https://www.youtube.com/embed/${videoId}`;
//       setFormData(prev => ({ ...prev, videoUrl: embedUrl, videoType: 'youtube' }));
//       setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
//       toast.success('YouTube link added successfully');
//     } else if (url === '') {
//       setFormData(prev => ({ ...prev, videoUrl: '', videoType: 'upload' }));
//     }
//   };

//   const removeVideo = () => {
//     if (videoUpload.preview?.startsWith('blob:')) {
//       URL.revokeObjectURL(videoUpload.preview);
//     }
//     setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
//     setYoutubeUrl('');
//     setFormData(prev => ({ ...prev, videoUrl: '', videoPublicId: '', videoType: 'upload' }));
//     if (videoInputRef.current) videoInputRef.current.value = '';
//     toast.success('Video removed');
//   };

//   const getVideoPreview = () => {
//     if (videoUpload.url) {
//       return (
//         <div className="relative">
//           <video src={videoUpload.url} className="w-full rounded-lg" controls />
//           <button
//             type="button"
//             onClick={removeVideo}
//             className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       );
//     } else if (youtubeUrl && getYouTubeVideoId(youtubeUrl)) {
//       const videoId = getYouTubeVideoId(youtubeUrl);
//       return (
//         <div className="relative">
//           <iframe
//             src={`https://www.youtube.com/embed/${videoId}`}
//             className="w-full rounded-lg aspect-video"
//             allowFullScreen
//           />
//           <button
//             type="button"
//             onClick={removeVideo}
//             className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       );
//     }
//     return null;
//   };

//   // ============================================================
//   // MEDIA LIBRARY HANDLERS - IMAGES
//   // ============================================================
//   const handleMediaLibrarySelect = (selectedItems) => {
//     const emptySlotIndex = productImages.findIndex(img => !img.url && !img.uploading);
    
//     if (emptySlotIndex === -1) {
//       toast.error('All image slots are filled. Please remove some images first.');
//       return;
//     }

//     const updatedImages = [...productImages];
//     selectedItems.forEach((item, idx) => {
//       const slotIndex = emptySlotIndex + idx;
//       if (slotIndex < 6) {
//         updatedImages[slotIndex] = {
//           ...updatedImages[slotIndex],
//           url: item.url,
//           publicId: item.public_id,
//           preview: item.url,
//           uploading: false,
//           isNew: true,
//           file: null,
//           error: '',
//           uploadAborted: false,
//           uploadBatchId: null,
//           id: `media_${Date.now()}_${idx}`
//         };
//       }
//     });

//     setProductImages(updatedImages);
//     toast.success(`${selectedItems.length} image(s) added from media library`);
//   };

//   const handleSingleMediaLibrarySelect = (selectedItems) => {
//     if (selectedItems.length === 0) {
//       setShowSingleMediaPicker(false);
//       setSelectedSlotIndex(null);
//       return;
//     }
    
//     const item = selectedItems[0];
//     const index = selectedSlotIndex;
    
//     if (index === null || index === undefined) {
//       setShowSingleMediaPicker(false);
//       setSelectedSlotIndex(null);
//       return;
//     }
    
//     if (productImages[index].url) {
//       toast.error('This slot already has an image. Please remove it first.');
//       setShowSingleMediaPicker(false);
//       setSelectedSlotIndex(null);
//       return;
//     }

//     const updatedImages = [...productImages];
//     updatedImages[index] = {
//       ...updatedImages[index],
//       url: item.url,
//       publicId: item.public_id,
//       preview: item.url,
//       uploading: false,
//       isNew: true,
//       file: null,
//       error: '',
//       uploadAborted: false,
//       uploadBatchId: null,
//       id: `media_${Date.now()}_${index}`
//     };

//     setProductImages(updatedImages);
//     toast.success('Image added from media library');
    
//     setShowSingleMediaPicker(false);
//     setSelectedSlotIndex(null);
//   };

//   const handleSlotClick = (index) => {
//     if (productImages[index].url) {
//       return;
//     }
    
//     setSlotPickerIndex(index);
//     setShowSlotPicker(true);
//   };

//   const handleUploadFromDevice = () => {
//     const index = slotPickerIndex;
//     setShowSlotPicker(false);
//     setSlotPickerIndex(null);
    
//     setTimeout(() => {
//       if (fileInputRefs.current[index]) {
//         fileInputRefs.current[index].click();
//       }
//     }, 100);
//   };

//   const handleChooseFromLibrary = () => {
//     const index = slotPickerIndex;
//     setShowSlotPicker(false);
//     setSelectedSlotIndex(index);
//     setShowSingleMediaPicker(true);
//   };

//   // ============================================================
//   // MEDIA LIBRARY HANDLERS - VIDEOS
//   // ============================================================
//   const handleVideoMediaLibrarySelect = (selectedItems) => {
//     if (selectedItems.length === 0) {
//       setShowVideoMediaPicker(false);
//       return;
//     }
    
//     const item = selectedItems[0];
    
//     if (item.resource_type !== 'video') {
//       toast.error('Please select a video file from the media library');
//       setShowVideoMediaPicker(false);
//       return;
//     }
    
//     if (videoUpload.url) {
//       toast.error('A video is already added. Please remove it first.');
//       setShowVideoMediaPicker(false);
//       return;
//     }

//     setVideoUpload({
//       file: null,
//       preview: item.url,
//       uploading: false,
//       error: '',
//       url: item.url,
//       publicId: item.public_id
//     });
    
//     setFormData(prev => ({ 
//       ...prev, 
//       videoUrl: item.url, 
//       videoPublicId: item.public_id, 
//       videoType: 'upload' 
//     }));
    
//     toast.success('Video added from media library');
//     setShowVideoMediaPicker(false);
//   };

//   // ============================================================
//   // IMAGE HANDLERS
//   // ============================================================
//   const validateImageFile = (file) => {
//     if (!allowedImageTypes.includes(file.type)) return { valid: false, message: `Invalid format. Allowed: JPG, PNG, WebP, GIF` };
//     if (file.size > maxFileSize) return { valid: false, message: `File too large. Max: 5MB` };
//     return { valid: true };
//   };

//   const handleImageChange = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setShowSlotPicker(false);
//     setShowSingleMediaPicker(false);
//     setShowMediaPicker(false);
//     setSlotPickerIndex(null);
//     setSelectedSlotIndex(null);

//     if (productImages[index].preview?.startsWith('blob:')) {
//       URL.revokeObjectURL(productImages[index].preview);
//     }

//     const validation = validateImageFile(file);
//     if (!validation.valid) {
//       const updatedImages = [...productImages];
//       updatedImages[index] = { ...updatedImages[index], error: validation.message };
//       setProductImages(updatedImages);
//       toast.error(`Image ${index + 1}: ${validation.message}`);
//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
//     const batchId = Date.now();
//     const imageId = `new_${batchId}_${index}`;
    
//     setProductImages(prev => {
//       const updated = [...prev];
//       updated[index] = {
//         id: imageId,
//         file: file,
//         preview: previewUrl,
//         error: '',
//         uploading: true,
//         url: null,
//         publicId: null,
//         isNew: true,
//         uploadAborted: false,
//         uploadBatchId: batchId
//       };
//       return updated;
//     });

//     try {
//       const { url, publicId } = await uploadToCloudinary(file);
//       setProductImages(prev => {
//         const updated = [...prev];
//         if (updated[index] && updated[index].uploadBatchId === batchId && !updated[index].uploadAborted) {
//           updated[index] = { ...updated[index], url, publicId, uploading: false };
//         }
//         return updated;
//       });
//       toast.success(`Image ${index + 1} uploaded successfully`);
//     } catch (error) {
//       setProductImages(prev => {
//         const updated = [...prev];
//         if (updated[index] && updated[index].uploadBatchId === batchId) {
//           updated[index] = { ...updated[index], error: 'Failed to upload image', uploading: false, preview: null, file: null, isNew: false };
//         }
//         return updated;
//       });
//       toast.error(`Failed to upload image ${index + 1}`);
//     }
//   };

//   const handleMultipleImageSelect = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;
   
//     setShowMediaPicker(false);
//     setShowSlotPicker(false);
    
//     const currentImagesCount = productImages.filter(img => img.url !== null || img.uploading).length;
//     const availableSlots = 6 - currentImagesCount;
//     if (files.length > availableSlots) {
//       toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
//       if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
//       return;
//     }
    
//     const emptySlots = [];
//     for (let i = 0; i < productImages.length; i++) {
//       if (!productImages[i].url && !productImages[i].uploading && !productImages[i].preview) emptySlots.push(i);
//     }
    
//     if (files.length > emptySlots.length) {
//       toast.error(`Only ${emptySlots.length} slots available. Please remove some images first.`);
//       if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
//       return;
//     }
    
//     const batchId = Date.now();
//     for (let i = 0; i < files.length && i < emptySlots.length; i++) {
//       const file = files[i];
//       const slotIndex = emptySlots[i];
      
//       const validation = validateImageFile(file);
//       if (!validation.valid) {
//         toast.error(`Image ${i + 1}: ${validation.message}`);
//         continue;
//       }
      
//       const previewUrl = URL.createObjectURL(file);
//       const imageId = `new_${batchId}_${slotIndex}`;
      
//       setProductImages(prev => {
//         const updated = [...prev];
//         updated[slotIndex] = {
//           id: imageId,
//           file: file,
//           preview: previewUrl,
//           error: '',
//           uploading: true,
//           url: null,
//           publicId: null,
//           isNew: true,
//           uploadAborted: false,
//           uploadBatchId: batchId
//         };
//         return updated;
//       });
      
//       (async () => {
//         try {
//           const { url, publicId } = await uploadToCloudinary(file);
//           setProductImages(prev => {
//             const updated = [...prev];
//             if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId && !updated[slotIndex].uploadAborted) {
//               updated[slotIndex] = { ...updated[slotIndex], url, publicId, uploading: false };
//             }
//             return updated;
//           });
//           toast.success(`Image uploaded to slot ${slotIndex + 1}`);
//         } catch (error) {
//           setProductImages(prev => {
//             const updated = [...prev];
//             if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId) {
//               updated[slotIndex] = { ...updated[slotIndex], error: 'Failed to upload image', uploading: false, preview: null, file: null, isNew: false };
//             }
//             return updated;
//           });
//         }
//       })();
//     }
    
//     if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
//   };

//   const moveImage = (fromIndex, toIndex) => {
//     const updatedImages = [...productImages];
//     const [movedImage] = updatedImages.splice(fromIndex, 1);
//     updatedImages.splice(toIndex, 0, movedImage);
//     setProductImages(updatedImages);
//   };

//   const handleDragStart = (index) => {
//     if (productImages[index].preview && !productImages[index].uploading) setDraggedIndex(index);
//   };

//   const handleDragOverWithFeedback = (event, index) => {
//     event.preventDefault();
//     if (productImages[index].preview && !productImages[index].uploading) setDragOverIndex(index);
//   };

//   const handleDragLeave = () => setDragOverIndex(null);

//   const handleDropWithFeedback = (dropIndex) => {
//     if (draggedIndex === null || draggedIndex === dropIndex) {
//       setDragOverIndex(null);
//       setDraggedIndex(null);
//       return;
//     }
//     if (!productImages[draggedIndex]?.uploading && !productImages[dropIndex]?.uploading) moveImage(draggedIndex, dropIndex);
//     else toast.error('Cannot reorder images while uploading');
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//   };

//   const handleDragEnd = () => {
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//   };

//   const removeImage = (index) => {
//     const imageToRemove = productImages[index];
    
//     setProductImages(prev => {
//       const updated = [...prev];
//       if (updated[index]) updated[index].uploadAborted = true;
//       return updated;
//     });
    
//     if (!imageToRemove.isNew && imageToRemove.publicId) {
//       setImagesToDelete(prev => [...prev, imageToRemove.publicId]);
//     }
    
//     if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) URL.revokeObjectURL(imageToRemove.preview);
    
//     const updatedImages = [...productImages];
//     updatedImages[index] = { 
//       id: null, file: null, preview: null, error: '', url: null, publicId: null, 
//       uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null
//     };
//     setProductImages(updatedImages);
//     if (fileInputRefs.current[index]) fileInputRefs.current[index].value = '';
//     toast.success(`Image removed from slot ${index + 1}`);
//   };

//   // ============================================================
//   // FORM HANDLERS
//   // ============================================================
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleSlugChange = (e) => {
//     const { value } = e.target;
//     setIsSlugManuallyEdited(true);
//     setFormData(prev => ({ ...prev, slug: value }));
//     if (errors.slug) setErrors(prev => ({ ...prev, slug: null }));
//   };

//   const handleNumberChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value === '' ? '' : parseFloat(value) }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleUnitChange = (e) => {
//     const value = e.target.value;
//     setFormData(prev => ({ ...prev, unit: value }));
//     setShowCustomUnit(value === 'other');
//     if (value !== 'other') setFormData(prev => ({ ...prev, customUnit: '' }));
//   };

//   const handleTagSelect = (tagId) => {
//     if (formData.tags && formData.tags.length === 1 && formData.tags[0] === tagId) {
//       setFormData(prev => ({ ...prev, tags: [] }));
//     } else {
//       setFormData(prev => ({ ...prev, tags: [tagId] }));
//     }
//   };

//   const handleRatingClick = (rating) => {
//     setFormData(prev => ({ ...prev, rating }));
//   };

//   const clearRating = () => {
//     setFormData(prev => ({ ...prev, rating: 0 }));
//   };

//   const addAdditionalInfo = () => {
//     setFormData(prev => ({ ...prev, additionalInfo: [...prev.additionalInfo, { fieldName: '', fieldValue: '' }] }));
//   };

//   const updateAdditionalInfo = (index, field, value) => {
//     const updatedInfo = [...formData.additionalInfo];
//     updatedInfo[index] = { ...updatedInfo[index], [field]: value };
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
//   };

//   const removeAdditionalInfo = (index) => {
//     const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
//   };

//   const addKeyword = () => {
//     if (!keywordInput.trim()) return;
//     const keywordsToAdd = keywordInput.split(',').map(k => k.trim()).filter(k => k !== '');
//     setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd] } }));
//     setKeywordInput('');
//   };

//   const removeKeyword = (indexToRemove) => {
//     setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: prev.metaSettings.metaKeywords.filter((_, i) => i !== indexToRemove) } }));
//   };

//   const handleMetaChange = (field, value) => {
//     setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, [field]: value } }));
//   };

// // ============================================================
// // FETCH PRODUCT
// // ============================================================
// // const fetchProduct = async () => {
// //   setIsLoading(true);
// //   try {
// //     const token = localStorage.getItem('token');
// //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${productId}`, { 
// //       headers: { 'Authorization': `Bearer ${token}` } 
// //     });
// //     const data = await response.json();
    
// //     if (data.success) {
// //       const product = data.data.product;
// //       setOriginalProduct(product);
// //       setOriginalBarcode(product.barcode || '');
      
// //       // Handle video data
// //       if (product.videoUrl) {
// //         if (product.videoType === 'youtube') {
// //           setVideoType('youtube');
// //           const embedMatch = product.videoUrl.match(/embed\/([^?]+)/);
// //           if (embedMatch) {
// //             setYoutubeUrl(`https://www.youtube.com/watch?v=${embedMatch[1]}`);
// //           } else {
// //             setYoutubeUrl(product.videoUrl);
// //           }
// //         } else {
// //           setVideoType('upload');
// //           setVideoUpload({
// //             file: null,
// //             preview: null,
// //             uploading: false,
// //             error: '',
// //             url: product.videoUrl,
// //             publicId: product.videoPublicId || ''
// //           });
// //         }
// //       }
      
// //       // Extract tag IDs from populated tags
// //       let tagIds = [];
// //       if (product.tags && Array.isArray(product.tags)) {
// //         tagIds = product.tags.map(tag => {
// //           if (typeof tag === 'string') return tag;
// //           if (tag && typeof tag === 'object' && tag._id) {
// //             return tag._id;
// //           }
// //           return tag;
// //         });
// //       }
      
// //       // Extract FAQ data
// //       const faqData = product.faqs || [];
      
// //       // Load variant data
// //       let variantData = [];
// //       let hasVariants = false;
      
// //       if (product.variantTypes && product.variantTypes.length > 0) {
// //         hasVariants = true;
// //         variantData = product.variantTypes.map(vt => ({
// //           id: vt.id || Date.now().toString(),
// //           type: vt.type,
// //           variants: vt.variants ? vt.variants.map(v => ({
// //             id: v.id || Date.now().toString(),
// //             name: v.name || '',
// //             color: v.color || '',
// //             regularPrice: v.regularPrice || 0,
// //             discountPrice: v.discountPrice || 0,
// //             buyingPrice: v.buyingPrice || 0,
// //             packagingCost: v.packagingCost || 0,
// //             deliveryCost: v.deliveryCost || 0,
// //             costPerItem: v.costPerItem || 0,
// //             stockQuantity: v.stockQuantity || 0,
// //             images: v.images || [null, null, null, null],
// //             imagePreviews: v.imagePreviews || [null, null, null, null],
// //             subVariants: v.subVariants ? v.subVariants.map(sv => ({
// //               id: sv.id || Date.now().toString(),
// //               name: sv.name || '',
// //               color: sv.color || '',
// //               regularPrice: sv.regularPrice || 0,
// //               discountPrice: sv.discountPrice || 0,
// //               buyingPrice: sv.buyingPrice || 0,
// //               packagingCost: sv.packagingCost || 0,
// //               deliveryCost: sv.deliveryCost || 0,
// //               costPerItem: sv.costPerItem || 0,
// //               stockQuantity: sv.stockQuantity || 0,
// //               images: sv.images || [null, null, null, null],
// //               imagePreviews: sv.imagePreviews || [null, null, null, null]
// //             })) : []
// //           })) : []
// //         }));
// //       }
      
// //       setVariantTypes(variantData);
      
// //       // Load add-ones
// //       let addOnesData = [];
// //       if (product.addOnes && Array.isArray(product.addOnes)) {
// //         addOnesData = product.addOnes.map(item => {
// //           // If productId is populated with full product data
// //           if (item.productId && typeof item.productId === 'object') {
// //             return {
// //               _id: item.productId._id || item._id,
// //               productName: item.productName || item.productId.productName,
// //               regularPrice: item.regularPrice || item.productId.regularPrice,
// //               discountPrice: item.discountPrice || item.productId.discountPrice,
// //               images: item.images || item.productId.images || [],
// //               brand: item.brand || item.productId.brand || '',
// //               skuCode: item.skuCode || item.productId.skuCode || '',
// //               stockQuantity: item.stockQuantity || item.productId.stockQuantity || 0,
// //               slug: item.slug || item.productId.slug || ''
// //             };
// //           }
// //           return {
// //             _id: item.productId || item._id,
// //             productName: item.productName,
// //             regularPrice: item.regularPrice,
// //             discountPrice: item.discountPrice,
// //             images: item.images || [],
// //             brand: item.brand || '',
// //             skuCode: item.skuCode || '',
// //             stockQuantity: item.stockQuantity || 0,
// //             slug: item.slug || ''
// //           };
// //         });
// //       }
// //       setAddOnes(addOnesData);
      
// //       // Set all form data
// //       const newFormData = {
// //         productName: product.productName || '',
// //         slug: product.slug || '',
// //         skuCode: product.skuCode || '',
// //         shortDescription: product.shortDescription || '',
// //         fullDescription: product.fullDescription || '',
// //         category: product.category?._id || product.category || '',
// //         subcategory: product.subcategory || '',
// //         childSubcategory: product.childSubcategory || '',
// //         brand: product.brand || '',
// //         stockQuantity: product.stockQuantity || '',
// //         stockAlertQuantity: product.stockAlertQuantity || '',
// //         regularPrice: product.regularPrice || '',
// //         costPerItem: product.costPerItem || '',
// //         discountPrice: product.discountPrice || '',
// //         buyingPrice: product.buyingPrice || '',
// //         packagingCost: product.packagingCost || '',
// //         deliveryCost: product.deliveryCost || '',
// //         unit: product.unit || 'pcs',
// //         customUnit: (product.unit && !['pcs', 'ton'].includes(product.unit)) ? product.unit : '',
// //         colors: (product.colors || []).map(c => ({ code: c })),
// //         deliveryInfo: product.deliveryInfo || '',
// //         additionalInfo: product.additionalInfo || [],
// //         tags: tagIds,
// //         isFeatured: product.isFeatured || false,
// //         showOnBanner: product.showOnBanner || false,
// //         rating: product.rating || 0,
// //         faqs: faqData,
// //         videoUrl: product.videoUrl || '',
// //         videoPublicId: product.videoPublicId || '',
// //         videoType: product.videoType || 'upload',
// //         metaSettings: product.metaSettings || { metaTitle: '', metaDescription: '', metaKeywords: [] }
// //       };
      
// //       setFormData(newFormData);
      
// //       if (product.unit === 'other' || (product.unit && !['pcs', 'ton'].includes(product.unit))) {
// //         setShowCustomUnit(true);
// //       }
      
// //       // Set product images
// //       if (product.images && product.images.length > 0) {
// //         const updatedImages = [...productImages];
// //         product.images.forEach((image, idx) => {
// //           if (idx < 6) {
// //             updatedImages[idx] = {
// //               id: `existing_${idx}`,
// //               file: null,
// //               preview: image.url,
// //               error: '',
// //               url: image.url,
// //               publicId: image.publicId,
// //               uploading: false,
// //               isNew: false,
// //               uploadAborted: false,
// //               uploadBatchId: null
// //             };
// //           }
// //         });
// //         setProductImages(updatedImages);
// //       }
      
// //       // Fetch subcategories
// //       if (product.category?._id || product.category) {
// //         const categoryId = product.category?._id || product.category;
// //         await fetchSubcategories(categoryId);
// //         if (product.subcategory) {
// //           setFormData(prev => ({ ...prev, subcategory: product.subcategory }));
// //           await fetchChildSubcategories(categoryId, product.subcategory);
// //           if (product.childSubcategory) setFormData(prev => ({ ...prev, childSubcategory: product.childSubcategory }));
// //         }
// //       }
      
// //       // Set editor content
// //       setTimeout(() => {
// //         if (shortDescEditor && product.shortDescription) {
// //           shortDescEditor.commands.setContent(product.shortDescription);
// //         }
// //         if (fullDescEditor && product.fullDescription) {
// //           fullDescEditor.commands.setContent(product.fullDescription);
// //         }
// //         if (deliveryInfoEditor && product.deliveryInfo) {
// //           deliveryInfoEditor.commands.setContent(product.deliveryInfo);
// //         }
// //       }, 1000);
      
// //       // Validate SKU
// //       if (product.skuCode) validateSku(product.skuCode);
      
// //       // Calculate cost per item after all data is loaded
// //       setTimeout(() => {
// //         calculateCostPerItem();
// //       }, 200);
      
// //     } else {
// //       toast.error('Failed to fetch product details');
// //       router.push('/authorize/all-products');
// //     }
// //   } catch (error) {
// //     console.error('Error fetching product:', error);
// //     toast.error('Failed to fetch product details');
// //     router.push('/authorize/all-products');
// //   } finally {
// //     setIsLoading(false);
// //   }
// // };

// // ============================================================
// // FETCH PRODUCT - FIXED to preserve database IDs
// // ============================================================
// const fetchProduct = async () => {
//   setIsLoading(true);
//   try {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${productId}`, { 
//       headers: { 'Authorization': `Bearer ${token}` } 
//     });
//     const data = await response.json();
    
//     if (data.success) {
//       const product = data.data.product;
//       setOriginalProduct(product);
//       setOriginalBarcode(product.barcode || '');
      
//       // Handle video data
//       if (product.videoUrl) {
//         if (product.videoType === 'youtube') {
//           setVideoType('youtube');
//           const embedMatch = product.videoUrl.match(/embed\/([^?]+)/);
//           if (embedMatch) {
//             setYoutubeUrl(`https://www.youtube.com/watch?v=${embedMatch[1]}`);
//           } else {
//             setYoutubeUrl(product.videoUrl);
//           }
//         } else {
//           setVideoType('upload');
//           setVideoUpload({
//             file: null,
//             preview: null,
//             uploading: false,
//             error: '',
//             url: product.videoUrl,
//             publicId: product.videoPublicId || ''
//           });
//         }
//       }
      
//       // Extract tag IDs from populated tags
//       let tagIds = [];
//       if (product.tags && Array.isArray(product.tags)) {
//         tagIds = product.tags.map(tag => {
//           if (typeof tag === 'string') return tag;
//           if (tag && typeof tag === 'object' && tag._id) {
//             return tag._id;
//           }
//           return tag;
//         });
//       }
      
//       // Extract FAQ data
//       const faqData = product.faqs || [];
      
//       // ============================================================
//       // LOAD VARIANT DATA - PRESERVE DATABASE IDs
//       // ============================================================
//       let variantData = [];
//       let hasVariants = false;
      
//       if (product.variantTypes && product.variantTypes.length > 0) {
//         hasVariants = true;
        
//         // ✅ FIX: Use the IDs from the database directly
//         variantData = product.variantTypes.map((vt) => ({
//           id: vt.id || `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`, // Use existing ID or generate fallback
//           type: vt.type,
//           variants: vt.variants ? vt.variants.map((v) => ({
//             id: v.id || `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`, // Use existing ID or generate fallback
//             name: v.name || '',
//             color: v.color || '',
//             regularPrice: v.regularPrice || 0,
//             discountPrice: v.discountPrice || 0,
//             buyingPrice: v.buyingPrice || 0,
//             packagingCost: v.packagingCost || 0,
//             deliveryCost: v.deliveryCost || 0,
//             costPerItem: v.costPerItem || 0,
//             stockQuantity: v.stockQuantity || 0,
//             images: v.images || [null, null, null, null],
//             imagePreviews: v.imagePreviews || [null, null, null, null],
//             subVariants: v.subVariants ? v.subVariants.map((sv) => ({
//               id: sv.id || `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`, // Use existing ID or generate fallback
//               name: sv.name || '',
//               color: sv.color || '',
//               regularPrice: sv.regularPrice || 0,
//               discountPrice: sv.discountPrice || 0,
//               buyingPrice: sv.buyingPrice || 0,
//               packagingCost: sv.packagingCost || 0,
//               deliveryCost: sv.deliveryCost || 0,
//               costPerItem: sv.costPerItem || 0,
//               stockQuantity: sv.stockQuantity || 0,
//               images: sv.images || [null, null, null, null],
//               imagePreviews: sv.imagePreviews || [null, null, null, null]
//             })) : []
//           })) : []
//         }));
//       }
      
//       setVariantTypes(variantData);
      
//       // Load add-ones
//       let addOnesData = [];
//       if (product.addOnes && Array.isArray(product.addOnes)) {
//         addOnesData = product.addOnes.map(item => {
//           if (item.productId && typeof item.productId === 'object') {
//             return {
//               _id: item.productId._id || item._id,
//               productName: item.productName || item.productId.productName,
//               regularPrice: item.regularPrice || item.productId.regularPrice,
//               discountPrice: item.discountPrice || item.productId.discountPrice,
//               images: item.images || item.productId.images || [],
//               brand: item.brand || item.productId.brand || '',
//               skuCode: item.skuCode || item.productId.skuCode || '',
//               stockQuantity: item.stockQuantity || item.productId.stockQuantity || 0,
//               slug: item.slug || item.productId.slug || ''
//             };
//           }
//           return {
//             _id: item.productId || item._id,
//             productName: item.productName,
//             regularPrice: item.regularPrice,
//             discountPrice: item.discountPrice,
//             images: item.images || [],
//             brand: item.brand || '',
//             skuCode: item.skuCode || '',
//             stockQuantity: item.stockQuantity || 0,
//             slug: item.slug || ''
//           };
//         });
//       }
//       setAddOnes(addOnesData);
      
//       // Set all form data
//       const newFormData = {
//         productName: product.productName || '',
//         slug: product.slug || '',
//         skuCode: product.skuCode || '',
//         shortDescription: product.shortDescription || '',
//         fullDescription: product.fullDescription || '',
//         category: product.category?._id || product.category || '',
//         subcategory: product.subcategory || '',
//         childSubcategory: product.childSubcategory || '',
//         brand: product.brand || '',
//         stockQuantity: product.stockQuantity || '',
//         stockAlertQuantity: product.stockAlertQuantity || '',
//         regularPrice: product.regularPrice || '',
//         costPerItem: product.costPerItem || '',
//         discountPrice: product.discountPrice || '',
//         buyingPrice: product.buyingPrice || '',
//         packagingCost: product.packagingCost || '',
//         deliveryCost: product.deliveryCost || '',
//         unit: product.unit || 'pcs',
//         customUnit: (product.unit && !['pcs', 'ton'].includes(product.unit)) ? product.unit : '',
//         colors: (product.colors || []).map(c => ({ code: c })),
//         deliveryInfo: product.deliveryInfo || '',
//         additionalInfo: product.additionalInfo || [],
//         tags: tagIds,
//         isFeatured: product.isFeatured || false,
//         showOnBanner: product.showOnBanner || false,
//         rating: product.rating || 0,
//         faqs: faqData,
//         videoUrl: product.videoUrl || '',
//         videoPublicId: product.videoPublicId || '',
//         videoType: product.videoType || 'upload',
//         metaSettings: product.metaSettings || { metaTitle: '', metaDescription: '', metaKeywords: [] }
//       };
      
//       setFormData(newFormData);
      
//       if (product.unit === 'other' || (product.unit && !['pcs', 'ton'].includes(product.unit))) {
//         setShowCustomUnit(true);
//       }
      
//       // Set product images
//       if (product.images && product.images.length > 0) {
//         const updatedImages = [...productImages];
//         product.images.forEach((image, idx) => {
//           if (idx < 6) {
//             updatedImages[idx] = {
//               id: `existing_${idx}`,
//               file: null,
//               preview: image.url,
//               error: '',
//               url: image.url,
//               publicId: image.publicId,
//               uploading: false,
//               isNew: false,
//               uploadAborted: false,
//               uploadBatchId: null
//             };
//           }
//         });
//         setProductImages(updatedImages);
//       }
      
//       // Fetch subcategories
//       if (product.category?._id || product.category) {
//         const categoryId = product.category?._id || product.category;
//         await fetchSubcategories(categoryId);
//         if (product.subcategory) {
//           setFormData(prev => ({ ...prev, subcategory: product.subcategory }));
//           await fetchChildSubcategories(categoryId, product.subcategory);
//           if (product.childSubcategory) setFormData(prev => ({ ...prev, childSubcategory: product.childSubcategory }));
//         }
//       }
      
//       // Set editor content
//       setTimeout(() => {
//         if (shortDescEditor && product.shortDescription) {
//           shortDescEditor.commands.setContent(product.shortDescription);
//         }
//         if (fullDescEditor && product.fullDescription) {
//           fullDescEditor.commands.setContent(product.fullDescription);
//         }
//         if (deliveryInfoEditor && product.deliveryInfo) {
//           deliveryInfoEditor.commands.setContent(product.deliveryInfo);
//         }
//       }, 1000);
      
//       // Validate SKU
//       if (product.skuCode) validateSku(product.skuCode);
      
//       // Calculate cost per item after all data is loaded
//       setTimeout(() => {
//         calculateCostPerItem();
//       }, 200);
      
//     } else {
//       toast.error('Failed to fetch product details');
//       router.push('/authorize/all-products');
//     }
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     toast.error('Failed to fetch product details');
//     router.push('/authorize/all-products');
//   } finally {
//     setIsLoading(false);
//   }
// };

//   // ============================================================
//   // HAS CHANGES
//   // ============================================================
//   const hasChanges = () => {
//     if (!originalProduct) return false;
    
//     if (formData.productName !== originalProduct.productName) return true;
//     if (formData.slug !== (originalProduct.slug || '')) return true;
//     if (formData.skuCode !== (originalProduct.skuCode || '')) return true;
//     if (formData.shortDescription !== originalProduct.shortDescription) return true;
//     if (formData.fullDescription !== originalProduct.fullDescription) return true;
//     if (formData.category !== (originalProduct.category?._id || originalProduct.category)) return true;
//     if (formData.subcategory !== (originalProduct.subcategory || '')) return true;
//     if (formData.childSubcategory !== (originalProduct.childSubcategory || '')) return true;
//     if (formData.brand !== originalProduct.brand) return true;
//     if (Number(formData.stockQuantity) !== Number(originalProduct.stockQuantity)) return true;
//     if (Number(formData.regularPrice) !== Number(originalProduct.regularPrice)) return true;
//     if (Number(formData.costPerItem) !== Number(originalProduct.costPerItem || 0)) return true;
//     if (Number(formData.discountPrice) !== Number(originalProduct.discountPrice)) return true;
//     if (Number(formData.buyingPrice) !== Number(originalProduct.buyingPrice || 0)) return true;
//     if (Number(formData.packagingCost) !== Number(originalProduct.packagingCost || 0)) return true;
//     if (Number(formData.deliveryCost) !== Number(originalProduct.deliveryCost || 0)) return true;
//     if (formData.unit !== originalProduct.unit) return true;
//     if (JSON.stringify(formData.colors.map(c => c.code)) !== JSON.stringify(originalProduct.colors || [])) return true;
//     if (formData.deliveryInfo !== originalProduct.deliveryInfo) return true;
//     if (JSON.stringify(formData.tags) !== JSON.stringify(originalProduct.tags || [])) return true;
//     if (formData.isFeatured !== originalProduct.isFeatured) return true;
//     if (formData.showOnBanner !== originalProduct.showOnBanner) return true;
//     if (formData.rating !== (originalProduct.rating || 0)) return true;
//     if (formData.videoUrl !== (originalProduct.videoUrl || '')) return true;
//     if (formData.videoType !== (originalProduct.videoType || 'upload')) return true;
//     if (JSON.stringify(formData.additionalInfo) !== JSON.stringify(originalProduct.additionalInfo || [])) return true;
//     if (JSON.stringify(formData.metaSettings) !== JSON.stringify(originalProduct.metaSettings || {})) return true;
//     if (JSON.stringify(formData.faqs) !== JSON.stringify(originalProduct.faqs || [])) return true;
    
//     // Check variant changes
//     if (JSON.stringify(variantTypes) !== JSON.stringify(originalProduct.variantTypes || [])) return true;
    
//     // Check add-ones changes
//     const currentAddOnes = addOnes.map(p => p._id).sort();
//     const originalAddOnes = (originalProduct.addOnes || []).map(item => item.productId || item._id).sort();
//     if (JSON.stringify(currentAddOnes) !== JSON.stringify(originalAddOnes)) return true;
    
//     const currentImageUrls = productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted && !img.isNew).map(img => img.url);
//     const originalImageUrls = (originalProduct.images || []).map(img => img.url);
//     if (JSON.stringify(currentImageUrls) !== JSON.stringify(originalImageUrls)) return true;
    
//     if (productImages.some(img => img.isNew && img.url !== null)) return true;
//     if (imagesToDelete.length > 0) return true;
    
//     return false;
//   };

//   // ============================================================
//   // VALIDATION
//   // ============================================================
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.productName?.trim()) newErrors.productName = 'Product name is required';
//     if (!formData.skuCode?.trim()) newErrors.skuCode = 'SKU code is required';
//     if (!formData.fullDescription || formData.fullDescription === '<p></p>') newErrors.fullDescription = 'Full description is required';
//     if (!formData.category) newErrors.category = 'Category is required';
//     if (!formData.stockQuantity && formData.stockQuantity !== 0) newErrors.stockQuantity = 'Stock quantity is required';
//     else if (formData.stockQuantity !== '' && Number(formData.stockQuantity) < 0) newErrors.stockQuantity = 'Stock quantity cannot be negative';
//     if (!formData.regularPrice && formData.regularPrice !== 0) newErrors.regularPrice = 'Regular price is required';
//     else if (formData.regularPrice !== '' && Number(formData.regularPrice) <= 0) newErrors.regularPrice = 'Regular price must be greater than 0';
//     if (formData.discountPrice && Number(formData.discountPrice) > Number(formData.regularPrice)) newErrors.discountPrice = 'Discount price cannot exceed regular price';
//     if (!formData.unit) newErrors.unit = 'Unit is required';
//     if (formData.unit === 'other' && !formData.customUnit?.trim()) newErrors.customUnit = 'Please specify the unit';
//     if (formData.tags.length === 0) newErrors.tags = 'Please select one product tag';
//     if (formData.tags.length > 1) newErrors.tags = 'Please select only one tag';
    
//     if (formData.slug && isSlugManuallyEdited && isSlugAvailable === false) {
//       newErrors.slug = 'This slug is already taken. Please choose a different one.';
//     }
    
//     const hasImages = productImages.some(img => img.url !== null && !img.uploading);
//     if (!hasImages) newErrors.images = 'At least one product image is required';
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ============================================================
//   // SUBMIT HANDLER
//   // ============================================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const uploading = productImages.some(img => img.uploading) || videoUpload.uploading;
//     if (uploading) {
//       toast.error('Please wait for all uploads to complete');
//       return;
//     }
    
//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }
    
//     if (!hasChanges()) {
//       toast.info('No changes to save');
//       return;
//     }
    
//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const imageUrls = productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted).map(img => img.url);
//       const finalUnit = formData.unit === 'other' ? formData.customUnit : formData.unit;
//       const colorStrings = formData.colors.map(color => color.code);
      
//       // Build variant data
//       let variantData = [];
//       let hasVariants = false;
      
//       if (variantTypes.length > 0) {
//         hasVariants = true;
//         variantData = variantTypes.map(vt => ({
//           id: vt.id,
//           type: vt.type,
//           variants: vt.variants.map(v => ({
//             id: v.id || Date.now().toString(),
//             name: v.name || '',
//             color: v.color || '',
//             regularPrice: parseFloat(v.regularPrice) || 0,
//             discountPrice: parseFloat(v.discountPrice) || 0,
//             buyingPrice: parseFloat(v.buyingPrice) || 0,
//             packagingCost: parseFloat(v.packagingCost) || 0,
//             deliveryCost: parseFloat(v.deliveryCost) || 0,
//             costPerItem: parseFloat(v.costPerItem) || 0,
//             stockQuantity: parseFloat(v.stockQuantity) || 0,
//             images: v.images || [null, null, null, null],
//             imagePreviews: v.imagePreviews || [null, null, null, null],
//             subVariants: v.subVariants ? v.subVariants.map(sv => ({
//               id: sv.id || Date.now().toString(),
//               name: sv.name || '',
//               color: sv.color || '',
//               regularPrice: parseFloat(sv.regularPrice) || 0,
//               discountPrice: parseFloat(sv.discountPrice) || 0,
//               buyingPrice: parseFloat(sv.buyingPrice) || 0,
//               packagingCost: parseFloat(sv.packagingCost) || 0,
//               deliveryCost: parseFloat(sv.deliveryCost) || 0,
//               costPerItem: parseFloat(sv.costPerItem) || 0,
//               stockQuantity: parseFloat(sv.stockQuantity) || 0,
//               images: sv.images || [null, null, null, null],
//               imagePreviews: sv.imagePreviews || [null, null, null, null]
//             })) : []
//           }))
//         }));
//       }

//       const payload = {
//         productName: formData.productName,
//         slug: formData.slug || undefined,
//         skuCode: formData.skuCode,
//         shortDescription: formData.shortDescription || '',
//         fullDescription: formData.fullDescription,
//         category: formData.category,
//         subcategory: formData.subcategory || undefined,
//         childSubcategory: formData.childSubcategory || undefined,
//         brand: formData.brand || '',
//         stockQuantity: formData.stockQuantity === '' ? 0 : Number(formData.stockQuantity),
//         stockAlertQuantity: formData.stockAlertQuantity ? Number(formData.stockAlertQuantity) : 0,
//         regularPrice: formData.regularPrice === '' ? 0 : Number(formData.regularPrice),
//         discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
//         buyingPrice: formData.buyingPrice ? Number(formData.buyingPrice) : 0,
//         packagingCost: formData.packagingCost ? Number(formData.packagingCost) : 0,
//         deliveryCost: formData.deliveryCost ? Number(formData.deliveryCost) : 0,
//         unit: finalUnit,
//         colors: colorStrings,
//         deliveryInfo: formData.deliveryInfo || '',
//         additionalInfo: formData.additionalInfo.filter(info => info.fieldName && info.fieldValue),
//         tags: formData.tags,
//         isFeatured: formData.isFeatured,
//         showOnBanner: formData.showOnBanner,
//         rating: formData.rating || 0,
//         faqs: formData.faqs.filter(faq => faq.question.trim() && faq.answer.trim()),
//         videoUrl: formData.videoUrl || '',
//         videoPublicId: videoUpload.publicId || formData.videoPublicId || '',
//         videoType: formData.videoType || 'upload',
//         metaSettings: formData.metaSettings,
//         images: imageUrls,
//         imagesToDelete: imagesToDelete,
//         hasVariants: hasVariants,
//         variants: variantData,
//         addOnes: addOnes.map(p => p._id)
//       };

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${productId}`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         toast.success('Product updated successfully!');
//         window.location.href = '/authorize/all-products';
//       } else {
//         toast.error(data.error || 'Failed to update product');
//       }
//     } catch (error) {
//       console.error('Error updating product:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ============================================================
//   // GET USER ROLE
//   // ============================================================
//   const getUserRole = () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         return payload.role || '';
//       }
//     } catch (error) {
//       console.error('Error getting user role:', error);
//     }
//     return '';
//   };

//   const userRole = getUserRole();
//   const isAdminOrSuperAdmin = userRole === 'super_admin' || userRole === 'admin';

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-[#72846A] mx-auto mb-4" />
//           <p className="text-gray-600">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="create_products">
//       <MantineProvider>
//         <div className="min-h-screen bg-[#f0f7fa]">
//           <AddBrandModal isOpen={showAddBrandModal} onClose={() => setShowAddBrandModal(false)} onBrandAdded={handleBrandAdded} />

//           {/* Header */}
//           <div className="bg-white border-b border-[#72846A]/20 shadow-lg sticky top-0 z-10">
//             <div className="px-6 py-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <a href="/authorize/all-products" className="p-2 hover:bg-[#72846A]/20 rounded-lg transition-colors">
//                     <ArrowLeft className="w-5 h-5 text-black/80 hover:text-black" />
//                   </a>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <Package className="w-6 h-6 text-[#72846A]" />
//                       <h1 className="text-xl font-bold text-black">Edit Product</h1>
//                     </div>
//                     <p className="text-sm text-black/70 mt-1">Update product information</p>
//                   </div>
//                 </div>
//                 {!hasChanges() && originalProduct && (
//                   <span className="text-xs text-[#72846A] flex items-center gap-1 bg-[#72846A]/20 px-3 py-1 rounded-full">
//                     <Clock className="w-3 h-3" />
//                     No pending changes
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="p-6">
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Left Column */}
//                 <div className="lg:col-span-2 space-y-6">
//                   {/* Basic Information Card */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                         <Package className="w-5 h-5 text-[#72846A]" />
//                         Basic Information
//                       </h2>
//                     </div>
//                     <div className="p-5 space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
//                         <input type="text" name="productName" value={formData.productName} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.productName ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g., Wireless Headphones, Smart Watch Pro" />
//                         {errors.productName && <p className="text-xs text-red-600 mt-1">{errors.productName}</p>}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Slug <span className="text-gray-400 text-xs">(Auto-generated from product name)</span>
//                         </label>
//                         <div className="relative">
//                           <input 
//                             type="text" 
//                             name="slug" 
//                             value={formData.slug || ''} 
//                             onChange={handleSlugChange}
//                             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition font-mono ${
//                               errors.slug ? 'border-red-500' : 
//                               isSlugManuallyEdited && isSlugAvailable === true ? 'border-green-500' :
//                               isSlugManuallyEdited && isSlugAvailable === false ? 'border-red-500' : 'border-gray-300'
//                             }`} 
//                             placeholder="Auto-generated from product name..." 
//                           />
//                           <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
//                             {isCheckingSlug && (
//                               <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
//                             )}
//                             {!isCheckingSlug && formData.slug && isSlugManuallyEdited && isSlugAvailable === true && (
//                               <CheckCircle className="w-4 h-4 text-green-500" />
//                             )}
//                             {!isCheckingSlug && formData.slug && isSlugManuallyEdited && isSlugAvailable === false && (
//                               <X className="w-4 h-4 text-red-500" />
//                             )}
//                             {formData.slug && !isSlugManuallyEdited && (
//                               <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Auto</span>
//                             )}
//                             {formData.slug && isSlugManuallyEdited && isSlugAvailable !== false && (
//                               <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Custom</span>
//                             )}
//                           </div>
//                         </div>
//                         {errors.slug && (
//                           <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
//                             <AlertCircle className="w-3 h-3" />
//                             {errors.slug}
//                           </p>
//                         )}
//                         {!isCheckingSlug && formData.slug && isSlugManuallyEdited && isSlugAvailable === true && !errors.slug && (
//                           <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
//                             <CheckCircle className="w-3 h-3" />
//                             Slug is available!
//                           </p>
//                         )}
//                         {formData.slug && !errors.slug && (
//                           <p className="text-xs text-[#72846A] mt-1 flex items-center gap-1">
//                             <LinkIcon className="w-3 h-3" />
//                             <span>Product URL will be: /product/{formData.slug}</span>
//                           </p>
//                         )}
//                         {isSlugManuallyEdited && formData.productName && (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const generatedSlug = formData.productName
//                                 .toLowerCase()
//                                 .trim()
//                                 .replace(/[^a-z0-9]+/g, '-')
//                                 .replace(/(^-|-$)+/g, '');
//                               setFormData(prev => ({ ...prev, slug: generatedSlug }));
//                               setIsSlugManuallyEdited(false);
//                               setIsSlugAvailable(null);
//                               toast.info('Slug reset to auto-generated value');
//                             }}
//                             className="text-xs text-[#72846A] hover:text-[#0891B2] mt-1 flex items-center gap-1 transition-colors"
//                           >
//                             <RefreshCw className="w-3 h-3" />
//                             Reset to auto-generated
//                           </button>
//                         )}
//                         <p className="text-xs text-gray-400 mt-1">
//                           💡 The slug is automatically generated from the product name. Edit it if you want a custom URL.
//                         </p>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">SKU Code <span className="text-red-500">*</span></label>
//                         <div className="flex gap-2">
//                           <div className="relative flex-1">
//                             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                               {isValidatingSku ? (
//                                 <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
//                               ) : formData.skuCode && isSkuUnique === true && formData.skuCode !== originalProduct?.skuCode ? (
//                                 <CheckCircle className="w-4 h-4 text-green-500" />
//                               ) : formData.skuCode && isSkuUnique === true && formData.skuCode === originalProduct?.skuCode ? (
//                                 <CheckCircle className="w-4 h-4 text-blue-500" />
//                               ) : formData.skuCode && isSkuUnique === false ? (
//                                 <XCircle className="w-4 h-4 text-red-500" />
//                               ) : (
//                                 <Hash className="w-4 h-4 text-gray-400" />
//                               )}
//                             </div>
//                             <input
//                               type="text"
//                               name="skuCode"
//                               value={formData.skuCode}
//                               onChange={(e) => {
//                                 setFormData(prev => ({ ...prev, skuCode: e.target.value }));
//                                 if (errors.skuCode) setErrors(prev => ({ ...prev, skuCode: null }));
//                               }}
//                               className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.skuCode || isSkuUnique === false ? 'border-red-500' : 'border-gray-300'}`}
//                               placeholder="Enter SKU code"
//                             />
//                           </div>
//                           <button type="button" onClick={generateSkuFromBackend} disabled={isGeneratingSku} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2">
//                             {isGeneratingSku ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
//                             Generate New SKU
//                           </button>
//                         </div>
//                         {errors.skuCode && <p className="text-xs text-red-600 mt-1">{errors.skuCode}</p>}
//                         {isSkuUnique === true && formData.skuCode && formData.skuCode !== originalProduct?.skuCode && (
//                           <p className="text-xs text-green-600 mt-1">✓ SKU is available</p>
//                         )}
//                         {isSkuUnique === true && formData.skuCode === originalProduct?.skuCode && (
//                           <p className="text-xs text-[#72846A] mt-1">✓ Current SKU (no change)</p>
//                         )}
//                         <p className="text-xs text-gray-500 mt-1">Must be unique across all products. Format: letters, numbers, hyphens (4-20 chars)</p>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Short Description <span className="text-gray-400 text-xs">(Optional)</span></label>
//                         {isMounted && shortDescEditor && (
//                           <div className="border border-gray-300 rounded-lg overflow-hidden">
//                             <RichTextEditor editor={shortDescEditor}>
//                               <RichTextEditor.Toolbar>
//                                 <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /></RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
//                               </RichTextEditor.Toolbar>
//                               <RichTextEditor.Content />
//                             </RichTextEditor>
//                           </div>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Full Description <span className="text-red-500">*</span></label>
//                         {isMounted && fullDescEditor && (
//                           <div className={`border rounded-lg overflow-hidden ${errors.fullDescription ? 'border-red-500' : 'border-gray-300'}`}>
//                             <RichTextEditor editor={fullDescEditor}>
//                               <RichTextEditor.Toolbar>
//                                 <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.Underline /><RichTextEditor.Strikethrough /></RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.ControlsGroup><RichTextEditor.H1 /><RichTextEditor.H2 /><RichTextEditor.H3 /></RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.ControlsGroup><RichTextEditor.BulletList /><RichTextEditor.OrderedList /></RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.ControlsGroup><RichTextEditor.Link /><RichTextEditor.Unlink /></RichTextEditor.ControlsGroup>
//                               </RichTextEditor.Toolbar>
//                               <RichTextEditor.Content />
//                             </RichTextEditor>
//                           </div>
//                         )}
//                         {errors.fullDescription && <p className="text-xs text-red-600 mt-1">{errors.fullDescription}</p>}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Categories Card */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                         <Layers className="w-5 h-5 text-[#72846A]" />
//                         Categories & Classification
//                       </h2>
//                     </div>
//                     <div className="p-5">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
//                           <select name="category" value={formData.category} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.category ? 'border-red-500' : 'border-gray-300'}`}>
//                             <option value="">Select Category</option>
//                             {categories.map(cat => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
//                           </select>
//                           {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory <span className="text-gray-400 text-xs">(Optional)</span></label>
//                           <select name="subcategory" value={formData.subcategory} onChange={handleChange} disabled={!formData.category || subcategories.length === 0} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300">
//                             <option value="">Select Subcategory</option>
//                             {subcategories.map(sub => (<option key={sub._id} value={sub._id}>{sub.name}</option>))}
//                           </select>
//                         </div>

//                         {childSubcategories.length > 0 && (
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Child Subcategory <span className="text-gray-400 text-xs">(Optional)</span></label>
//                             <select name="childSubcategory" value={formData.childSubcategory} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition border-gray-300">
//                               <option value="">Select Child Subcategory</option>
//                               {childSubcategories.map(child => (<option key={child._id} value={child._id}>{child.name}</option>))}
//                             </select>
//                           </div>
//                         )}

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Brand <span className="text-gray-400 text-xs">(Optional)</span></label>
//                           <div className="flex gap-2">
//                             <select name="brand" value={formData.brand} onChange={handleChange} className={`flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.brand ? 'border-red-500' : 'border-gray-300'}`}>
//                               <option value="">Select Brand</option>
//                               {brands.map(brand => (<option key={brand._id} value={brand.name}>{brand.name}</option>))}
//                             </select>
//                             <button type="button" onClick={() => setShowAddBrandModal(true)} className="px-4 py-2 bg-[#72846A] text-white rounded-lg hover:bg-[#738769] transition-colors flex items-center gap-2 whitespace-nowrap font-semibold">
//                               <Plus className="w-4 h-4" /> Add Brand
//                             </button>
//                           </div>
//                           {errors.brand && <p className="text-xs text-red-600 mt-1">{errors.brand}</p>}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Pricing & Inventory Card */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                         <DollarSign className="w-5 h-5 text-[#72846A]" />
//                         Pricing & Inventory
//                       </h2>
//                     </div>
//                     <div className="p-5">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity <span className="text-red-500">*</span></label>
//                           <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.stockQuantity ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Stock Alert Quantity</label>
//                           <input type="number" name="stockAlertQuantity" value={formData.stockAlertQuantity} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" placeholder="Notify when stock reaches this level" />
//                           <p className="text-xs text-gray-500 mt-1">You'll be notified when stock reaches this level</p>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (৳) <span className="text-red-500">*</span></label>
//                           <input type="number" name="regularPrice" value={formData.regularPrice} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.regularPrice ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Cost Per Item (৳) <span className="text-gray-400 text-xs">(Auto-calculated)</span>
//                           </label>
//                           <div className="relative">
//                             <input 
//                               type="text" 
//                               name="costPerItem" 
//                               value={typeof formData.costPerItem === 'string' ? formData.costPerItem : (formData.costPerItem || '')} 
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-gray-100 border-gray-300 cursor-not-allowed ${
//                                 typeof formData.costPerItem === 'string' && formData.costPerItem.includes('?') ? 'text-[#72846A] font-medium' : 'text-gray-700'
//                               }`} 
//                               placeholder="Enter values above to calculate" 
//                               readOnly 
//                               disabled
//                             />
//                             <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
//                               Auto
//                             </div>
//                           </div>
//                           <p className="text-xs text-[#72846A] mt-1 flex items-center gap-1">
//                             <Info className="w-3 h-3" />
//                             {typeof formData.costPerItem === 'string' && formData.costPerItem.includes('?') 
//                               ? 'Fill in all three fields above to see the calculated cost' 
//                               : 'Cost Per Item = Buying Price + Packaging Cost + Delivery Cost'}
//                           </p>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400 text-xs">(Optional)</span></label>
//                           <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.discountPrice ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
//                           {formData.discountPrice > 0 && formData.regularPrice && (
//                             <p className="text-xs text-green-600 mt-1">Save: ৳{(formData.regularPrice - formData.discountPrice).toFixed(2)} ({Math.round(((formData.regularPrice - formData.discountPrice) / formData.regularPrice) * 100)}% off)</p>
//                           )}
//                         </div>

//                         {isAdminOrSuperAdmin && (
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span>
//                             </label>
//                             <input 
//                               type="number" 
//                               name="buyingPrice" 
//                               value={formData.buyingPrice || ''} 
//                               onChange={handleNumberChange} 
//                               onWheel={(e) => e.target.blur()} 
//                               min="0" 
//                               step="1" 
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" 
//                               placeholder="0" 
//                             />
//                             <p className="text-xs text-amber-600 mt-1">
//                               ⚠️ This field is only visible to Super Admins and Admins
//                             </p>
//                           </div>
//                         )}

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Packaging Cost (৳) <span className="text-gray-400 text-xs">(Optional)</span>
//                           </label>
//                           <input 
//                             type="number" 
//                             name="packagingCost" 
//                             value={formData.packagingCost || ''} 
//                             onChange={handleNumberChange} 
//                             onWheel={(e) => e.target.blur()} 
//                             min="0" 
//                             step="1" 
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" 
//                             placeholder="0" 
//                           />
//                           <p className="text-xs text-gray-500 mt-1">Cost of packaging materials per unit</p>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Delivery Cost (৳) <span className="text-gray-400 text-xs">(Optional)</span>
//                           </label>
//                           <input 
//                             type="number" 
//                             name="deliveryCost" 
//                             value={formData.deliveryCost || ''} 
//                             onChange={handleNumberChange} 
//                             onWheel={(e) => e.target.blur()} 
//                             min="0" 
//                             step="1" 
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" 
//                             placeholder="0" 
//                           />
//                           <p className="text-xs text-gray-500 mt-1">Cost of delivery per unit</p>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Unit <span className="text-red-500">*</span></label>
//                           <select name="unit" value={formData.unit} onChange={handleUnitChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.unit ? 'border-red-500' : 'border-gray-300'}`}>
//                             {UNIT_OPTIONS.map(unit => (<option key={unit.value} value={unit.value}>{unit.label}</option>))}
//                           </select>
//                           {errors.unit && <p className="text-xs text-red-600 mt-1">{errors.unit}</p>}
//                         </div>
//                       </div>

//                       {showCustomUnit && (
//                         <div className="mt-4">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Custom Unit <span className="text-red-500">*</span></label>
//                           <input type="text" name="customUnit" value={formData.customUnit} onChange={(e) => setFormData(prev => ({ ...prev, customUnit: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.customUnit ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g., pair, set, dozen" />
//                           {errors.customUnit && <p className="text-xs text-red-600 mt-1">{errors.customUnit}</p>}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* ============================================================ */}
//                   {/* VARIANT SECTION */}
//                   {/* ============================================================ */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                         <Grid className="w-5 h-5 text-[#72846A]" />
//                         Product Variants <span className="text-gray-400 text-xs">(Optional)</span>
//                       </h2>
//                       <p className="text-xs text-gray-500 mt-1">Add variant types like Color, Size, Material, etc. Each variant type can have multiple options with their own prices, stock, and images.</p>
//                     </div>
//                     <div className="p-5">
//                       {variantTypes.map((vt, index) => (
//                         <VariantTypeSection
//                           key={vt.id || index}
//                           variantType={vt}
//                           onVariantTypeChange={(type) => {
//                             const updated = [...variantTypes];
//                             updated[index].type = type;
//                             setVariantTypes(updated);
//                           }}
//                           variants={vt.variants}
//                           onVariantsChange={(variants) => updateVariantTypeVariants(index, variants)}
//                           onRemoveType={() => removeVariantType(index)}
//                           defaultPackagingCost={formData.packagingCost}
//                           defaultDeliveryCost={formData.deliveryCost}
//                           isAdminOrSuperAdmin={isAdminOrSuperAdmin}
//                         />
//                       ))}

//                       {!showAddVariantType ? (
//                         <button
//                           type="button"
//                           onClick={() => setShowAddVariantType(true)}
//                           className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#72846A] border-2 border-dashed border-[#72846A]/40 rounded-lg hover:bg-[#72846A]/5 transition-colors"
//                         >
//                           <Plus className="w-4 h-4" />
//                           Add Variant Type
//                         </button>
//                       ) : (
//                         <div className="border border-[#72846A]/40 rounded-lg p-4 bg-[#72846A]/5">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                             <div>
//                               <label className="block text-xs font-medium text-gray-700 mb-1">Variant Type <span className="text-red-500">*</span></label>
//                               <select
//                                 value={newVariantType}
//                                 onChange={(e) => setNewVariantType(e.target.value)}
//                                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                               >
//                                 <option value="">Select type...</option>
//                                 {VARIANT_TYPE_OPTIONS.map(opt => (
//                                   <option key={opt.value} value={opt.value}>{opt.label}</option>
//                                 ))}
//                               </select>
//                             </div>

//                             {newVariantType === 'custom' && (
//                               <div>
//                                 <label className="block text-xs font-medium text-gray-700 mb-1">Custom Type Name <span className="text-red-500">*</span></label>
//                                 <input
//                                   type="text"
//                                   value={customVariantTypeName}
//                                   onChange={(e) => setCustomVariantTypeName(e.target.value)}
//                                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                                   placeholder="e.g., Fabric, Finish, Pattern"
//                                 />
//                               </div>
//                             )}
//                           </div>

//                           <div className="flex items-center gap-3 mt-4">
//                             <button
//                               type="button"
//                               onClick={addVariantType}
//                               className="px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#738769] transition-colors"
//                             >
//                               <Plus className="w-4 h-4 inline mr-1" />
//                               Add Variant Type
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setShowAddVariantType(false);
//                                 setNewVariantType('');
//                                 setCustomVariantTypeName('');
//                               }}
//                               className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* ============================================================ */}
//                   {/* ADD-ONES SECTION */}
//                   {/* ============================================================ */}
//                   <AddOnesSection 
//                     addOnes={addOnes}
//                     onAddProduct={handleAddAddOne}
//                     onRemoveProduct={handleRemoveAddOne}
//                     maxProducts={5}
//                   />

//                   {/* Additional Information */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}>
//                         <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Info className="w-5 h-5 text-[#72846A]" /> Additional Information</h2>
//                         <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showAdditionalInfo ? 'rotate-180' : ''}`} />
//                       </div>
//                     </div>
//                     {showAdditionalInfo && (
//                       <div className="p-5">
//                         <div className="space-y-4">
//                           {formData.additionalInfo.map((info, index) => (
//                             <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                               <input type="text" placeholder="Field name" value={info.fieldName} onChange={(e) => updateAdditionalInfo(index, 'fieldName', e.target.value)} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none" />
//                               <input type="text" placeholder="Field value" value={info.fieldValue} onChange={(e) => updateAdditionalInfo(index, 'fieldValue', e.target.value)} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none" />
//                               <button type="button" onClick={() => removeAdditionalInfo(index)} className="p-2 text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
//                             </div>
//                           ))}
//                           <button type="button" onClick={addAdditionalInfo} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#72846A] border-2 border-dashed border-[#72846A]/40 rounded-lg hover:bg-[#72846A]/5"><Plus className="w-4 h-4" /> Add Additional Information</button>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Delivery Details */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}>
//                         <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Package className="w-5 h-5 text-[#72846A]" /> Delivery Details <span className="text-gray-400 text-xs">(Optional)</span></h2>
//                         <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showDeliveryInfo ? 'rotate-180' : ''}`} />
//                       </div>
//                     </div>
//                     {showDeliveryInfo && (
//                       <div className="p-5">
//                         {isMounted && deliveryInfoEditor && (
//                           <div className="border border-gray-300 rounded-lg overflow-hidden">
//                             <RichTextEditor editor={deliveryInfoEditor}>
//                               <RichTextEditor.Toolbar>
//                                 <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.Underline /></RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.ControlsGroup><RichTextEditor.BulletList /><RichTextEditor.OrderedList /></RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
//                               </RichTextEditor.Toolbar>
//                               <RichTextEditor.Content />
//                             </RichTextEditor>
//                           </div>
//                         )}
//                         <p className="text-xs text-gray-500 mt-2">Include shipping information, delivery time, and other delivery-related details</p>
//                       </div>
//                     )}
//                   </div>

//                   {/* FAQ SECTION */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowFaqs(!showFaqs)}>
//                         <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                           <HelpCircle className="w-5 h-5 text-[#72846A]" />
//                           Frequently Asked Questions <span className="text-gray-400 text-xs">(Optional)</span>
//                         </h2>
//                         <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showFaqs ? 'rotate-180' : ''}`} />
//                       </div>
//                     </div>
//                     {showFaqs && (
//                       <div className="p-5">
//                         <div className="space-y-4">
//                           {formData.faqs.map((faq, index) => (
//                             <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                               <div className="flex items-start justify-between mb-3">
//                                 <span className="text-sm font-medium text-gray-700">FAQ #{index + 1}</span>
//                                 <button
//                                   type="button"
//                                   onClick={() => removeFaq(index)}
//                                   className="p-1 text-gray-400 hover:text-red-500 transition-colors"
//                                 >
//                                   <X className="w-4 h-4" />
//                                 </button>
//                               </div>
                              
//                               <div className="space-y-3">
//                                 <div>
//                                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Question <span className="text-red-500">*</span>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={faq.question}
//                                     onChange={(e) => updateFaq(index, 'question', e.target.value)}
//                                     placeholder="e.g., What is the warranty period?"
//                                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
//                                   />
//                                 </div>
                                
//                                 <div>
//                                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Answer <span className="text-red-500">*</span>
//                                   </label>
//                                   <textarea
//                                     value={faq.answer}
//                                     onChange={(e) => updateFaq(index, 'answer', e.target.value)}
//                                     rows="3"
//                                     placeholder="e.g., This product comes with a 2-year warranty covering manufacturing defects..."
//                                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition resize-none"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
                          
//                           <button
//                             type="button"
//                             onClick={addFaq}
//                             className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#72846A] border-2 border-dashed border-[#72846A]/40 rounded-lg hover:bg-[#72846A]/5 transition-colors"
//                           >
//                             <Plus className="w-4 h-4" />
//                             Add FAQ
//                           </button>
                          
//                           {formData.faqs.length === 0 && (
//                             <p className="text-xs text-gray-500 text-center py-2">
//                               No FAQs added yet. Click the button above to add frequently asked questions about this product.
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* SEO & Meta Settings */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowMeta(!showMeta)}>
//                         <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Search className="w-5 h-5 text-[#72846A]" /> SEO & Meta Settings</h2>
//                         <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
//                       </div>
//                     </div>
//                     {showMeta && (
//                       <div className="p-5">
//                         <div className="space-y-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title <span className="text-xs text-gray-400 ml-2">(70 characters max)</span></label>
//                             <input type="text" value={formData.metaSettings.metaTitle} onChange={(e) => handleMetaChange('metaTitle', e.target.value)} maxLength="70" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" placeholder="e.g., Buy Wireless Headphones Online | Smart Gadget" />
//                             <div className="flex justify-end mt-1"><span className={`text-xs ${formData.metaSettings.metaTitle?.length > 70 ? 'text-red-500' : 'text-gray-400'}`}>{formData.metaSettings.metaTitle?.length || 0}/70</span></div>
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description <span className="text-xs text-gray-400 ml-2">(160 characters max)</span></label>
//                             <textarea value={formData.metaSettings.metaDescription} onChange={(e) => handleMetaChange('metaDescription', e.target.value)} maxLength="160" rows="3" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition resize-none" placeholder="Write a compelling description that appears in search engine results..." />
//                             <div className="flex justify-end mt-1"><span className={`text-xs ${formData.metaSettings.metaDescription?.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>{formData.metaSettings.metaDescription?.length || 0}/160</span></div>
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords <span className="text-xs text-gray-400 ml-2">(Comma separated)</span></label>
//                             <div className="flex gap-2">
//                               <input type="text" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(); } }} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" placeholder="e.g., wireless headphones, bluetooth earphones" />
//                               <button type="button" onClick={addKeyword} className="px-4 py-2 text-white rounded-lg bg-[#72846A] hover:bg-[#0891B2]"><Plus className="w-4 h-4" /> Add</button>
//                             </div>
//                             {formData.metaSettings.metaKeywords?.length > 0 && (
//                               <div className="mt-3 flex flex-wrap gap-2">
//                                 {formData.metaSettings.metaKeywords.map((keyword, index) => (
//                                   <div key={index} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-[#72846A]/10 text-[#004767]">
//                                     <span>{keyword}</span>
//                                     <button type="button" onClick={() => removeKeyword(index)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-6">
//                   {/* Product Images Card */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                         <ImageIcon className="w-5 h-5 text-[#72846A]" /> 
//                         Product Images <span className="text-red-500">*</span>
//                       </h2>
//                       <p className="text-xs text-gray-500 mt-1">Upload up to 6 images (JPG, PNG, WebP, max 5MB each) • Drag to reorder</p>
//                     </div>
//                     <div className="p-5">
//                       {errors.images && <p className="text-xs text-red-600 mb-4 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.images}</p>}
                      
//                       <div className="flex gap-3 mb-4">
//                         <button 
//                           type="button" 
//                           onClick={() => fileInputRefs.current['multiple']?.click()} 
//                           className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#72846A]/40 bg-[#72846A]/5 text-[#72846A] hover:bg-[#72846A]/10 transition-colors"
//                         >
//                           <Upload className="w-5 h-5" /> Upload from Device
//                         </button>
                        
//                         <button 
//                           type="button" 
//                           onClick={() => setShowMediaPicker(true)} 
//                           className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#72846A]/40 bg-[#72846A]/5 text-[#72846A] hover:bg-[#72846A]/10 transition-colors"
//                         >
//                           <ImageIcon className="w-5 h-5" /> Choose from Media Library
//                         </button>
//                       </div>

//                       <input type="file" id="multiple-images" className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp" multiple onChange={handleMultipleImageSelect} ref={el => { if (el) fileInputRefs.current['multiple'] = el; }} />

//                       <div className="grid grid-cols-2 gap-4">
//                         {productImages.map((img, index) => (
//                           <div key={index} draggable={img.preview !== null && !img.uploading} onDragStart={() => handleDragStart(index)} onDragOver={(e) => handleDragOverWithFeedback(e, index)} onDragLeave={handleDragLeave} onDrop={() => handleDropWithFeedback(index)} onDragEnd={handleDragEnd} className={`transition-all duration-200 ${draggedIndex === index ? 'opacity-50 scale-95' : ''} ${dragOverIndex === index && draggedIndex !== index && draggedIndex !== null ? 'ring-2 ring-[#72846A] ring-offset-2 rounded-lg' : ''}`}>
//                             {img.preview ? (
//                               <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 h-40 hover:border-[#72846A] transition-colors cursor-grab active:cursor-grabbing bg-gray-100">
//                                 <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10"><GripVertical className="w-3 h-3 text-white" /></div>
//                                 <img src={img.preview} alt={`Product ${index + 1}`} className="w-full h-full object-contain bg-gray-100" />
//                                 {img.uploading && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"><Loader2 className="w-6 h-6 text-white animate-spin" /></div>}
//                                 <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-20"><X className="w-3 h-3" /></button>
//                                 {index === 0 && img.url && !img.uploading && <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-green-500 text-white text-[10px] rounded z-10">Primary</span>}
//                               </div>
//                             ) : (
//                               <div className={`border-2 border-dashed rounded-lg p-4 text-center h-40 flex flex-col items-center justify-center cursor-pointer transition-colors ${img.error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'}`} onClick={() => handleSlotClick(index)}>
//                                 <input type="file" ref={el => fileInputRefs.current[index] = el} className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={(e) => handleImageChange(e, index)} />
//                                 <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${img.error ? 'text-red-400' : 'text-gray-400'}`} />
//                                 <p className={`text-xs ${img.error ? 'text-red-600' : 'text-gray-600'}`}>Slot {index + 1}</p>
//                                 <p className="text-[10px] text-gray-400 mt-1">Click to upload</p>
//                                 {img.error && <p className="text-xs text-red-600 mt-1">{img.error}</p>}
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                       <div className="mt-4 text-xs text-gray-500 text-center">{productImages.filter(img => img.url !== null && !img.uploading).length} of 6 images uploaded</div>
//                       {imagesToDelete.length > 0 && <div className="mt-2 text-xs text-red-500 text-center">{imagesToDelete.length} image(s) marked for deletion</div>}
//                     </div>
//                   </div>

//                   {/* Video Upload Card */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                         <Video className="w-5 h-5 text-[#72846A]" />
//                         Product Video <span className="text-gray-400 text-xs">(Optional)</span>
//                       </h2>
//                       <p className="text-xs text-gray-500 mt-1">Upload a video or add a YouTube link</p>
//                     </div>
//                     <div className="p-5">
//                       <div className="flex gap-2 mb-4">
//                         <button
//                           type="button"
//                           onClick={() => setVideoType('upload')}
//                           className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
//                             videoType === 'upload'
//                               ? 'bg-[#72846A] text-white'
//                               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                           }`}
//                         >
//                           <Upload className="w-4 h-4 inline mr-1" />
//                           Upload Video
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => setVideoType('youtube')}
//                           className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
//                             videoType === 'youtube'
//                               ? 'bg-[#72846A] text-[#004767]'
//                               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                           }`}
//                         >
//                           <Youtube className="w-4 h-4 inline mr-1" />
//                           YouTube Link
//                         </button>
//                       </div>

//                       {getVideoPreview()}

//                       {videoType === 'upload' && !videoUpload.url && !videoUpload.preview && (
//                         <div>
//                           <div className="flex flex-col sm:flex-row gap-3 mb-4">
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 if (videoInputRef.current) {
//                                   videoInputRef.current.click();
//                                 }
//                               }}
//                               className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#72846A]/40 bg-[#72846A]/5 text-[#72846A] hover:bg-[#72846A]/10 transition-colors"
//                             >
//                               <Upload className="w-5 h-5" />
//                               Upload from Device
//                             </button>
                            
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setShowVideoMediaPicker(true);
//                               }}
//                               className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#72846A]/40 bg-[#72846A]/5 text-[#72846A] hover:bg-[#72846A]/10 transition-colors"
//                             >
//                               <Video className="w-5 h-5" />
//                               Choose from Media Library
//                             </button>
//                           </div>

//                           <input
//                             type="file"
//                             ref={videoInputRef}
//                             className="hidden"
//                             accept="video/*"
//                             onChange={handleVideoFileChange}
//                           />

//                           <div className="text-xs text-gray-400 text-center">
//                             <p>MP4, WebM, MOV (Max 100MB)</p>
//                             <p className="mt-1">Click on a button above to add a video</p>
//                           </div>
//                         </div>
//                       )}

//                       {videoType === 'youtube' && !formData.videoUrl && (
//                         <div className="space-y-3">
//                           <div className="relative">
//                             <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
//                             <input
//                               type="text"
//                               value={youtubeUrl}
//                               onChange={(e) => handleYoutubeUrlChange(e.target.value)}
//                               placeholder="https://www.youtube.com/watch?v=..."
//                               className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none"
//                             />
//                           </div>
//                           <p className="text-xs text-gray-500">
//                             Paste any YouTube video URL. The video will be embedded on your product page.
//                           </p>
//                         </div>
//                       )}

//                       {videoUpload.error && (
//                         <p className="text-xs text-red-500 mt-2">{videoUpload.error}</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Colors */}
//                   {/* <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Palette className="w-5 h-5 text-[#72846A]" /> Colors <span className="text-gray-400 text-xs">(Optional)</span></h2>
//                     </div>
//                     <div className="p-5">
//                       <ColorPicker colors={formData.colors} onChange={(colors) => setFormData(prev => ({ ...prev, colors }))} />
//                     </div>
//                   </div> */}

//                   {/* Featured Product */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                         <Star className="w-5 h-5 text-[#72846A]" />
//                         Product Promotion
//                       </h2>
//                     </div>
//                     <div className="p-5 space-y-4">
//                       <label className="flex items-center gap-3 cursor-pointer">
//                         <input 
//                           type="checkbox" 
//                           checked={formData.isFeatured} 
//                           onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))} 
//                           className="w-5 h-5 rounded border-gray-300 text-[#72846A] focus:ring-[#72846A]" 
//                         />
//                         <div>
//                           <span className="text-sm font-medium text-gray-700">Mark as Featured Product</span>
//                           <p className="text-xs text-gray-500">Featured products will appear in special sections</p>
//                         </div>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Product Tag Selection */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                         <Tag className="w-5 h-5 text-[#72846A]" />
//                         Product Tag <span className="text-red-500">*</span>
//                       </h2>
//                       <p className="text-xs text-gray-500 mt-1">Select exactly one tag for your product</p>
//                     </div>
//                     <div className="p-5">
//                       {errors.tags && <p className="text-xs text-red-600 mb-4 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.tags}</p>}
                      
//                       {isLoadingTags ? (
//                         <div className="flex justify-center py-4">
//                           <Loader2 className="w-6 h-6 animate-spin text-[#72846A]" />
//                         </div>
//                       ) : productTags.length === 0 ? (
//                         <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
//                           <p className="text-sm text-gray-500">No tags available. Please create tags first.</p>
//                           <button
//                             type="button"
//                             onClick={() => router.push('/authorize/tags')}
//                             className="mt-2 text-sm text-[#72846A] hover:text-[#0891B2] font-medium"
//                           >
//                             Create Tags →
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
//                           {productTags.map(tag => {
//                             const isSelected = formData.tags && formData.tags.length === 1 && formData.tags[0] === tag._id;
//                             return (
//                               <button
//                                 key={tag._id}
//                                 type="button"
//                                 onClick={() => handleTagSelect(tag._id)}
//                                 className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-full transition-all border ${
//                                   isSelected
//                                     ? 'bg-[#72846A] text-white border-[#72846A] ring-2 ring-[#72846A] ring-offset-2 shadow-md'
//                                     : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
//                                 }`}
//                               >
//                                 {tag.image && tag.image.url && (
//                                   <img 
//                                     src={tag.image.url} 
//                                     alt={tag.name} 
//                                     className="w-4 h-4 rounded-full object-cover"
//                                   />
//                                 )}
//                                 {tag.name}
//                                 {isSelected && <CheckCircle className="w-3 h-3 ml-1" />}
//                               </button>
//                             );
//                           })}
//                         </div>
//                       )}

//                       {formData.tags && formData.tags.length > 0 && (
//                         <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
//                           <p className="text-xs font-medium text-green-700 flex items-center gap-1">
//                             <CheckCircle className="w-3 h-3" />
//                             Selected Tag:
//                           </p>
//                           <div className="flex flex-wrap gap-2 mt-1">
//                             {formData.tags.map(tagId => {
//                               const tag = productTags.find(t => t._id === tagId);
//                               return tag ? (
//                                 <span key={tagId} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-[#72846A] text-white shadow-sm">
//                                   {tag.image && tag.image.url && (
//                                     <img 
//                                       src={tag.image.url} 
//                                       alt={tag.name} 
//                                       className="w-4 h-4 rounded-full object-cover"
//                                     />
//                                   )}
//                                   {tag.name}
//                                   <button 
//                                     type="button" 
//                                     onClick={() => handleTagSelect(tagId)} 
//                                     className="hover:opacity-70 ml-1 transition-opacity"
//                                   >
//                                     <X className="w-3 h-3" />
//                                   </button>
//                                 </span>
//                               ) : null;
//                             })}
//                           </div>
//                         </div>
//                       )}
                      
//                       {(!formData.tags || formData.tags.length === 0) && !errors.tags && (
//                         <p className="text-xs text-gray-400 mt-3 text-center">
//                           Click on a tag above to select it. Click again to deselect.
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Rating Card */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                         <Star className="w-5 h-5 text-[#72846A]" />
//                         Product Rating <span className="text-gray-400 text-xs">(Optional)</span>
//                       </h2>
//                     </div>
//                     <div className="p-5">
//                       <div className="flex items-center gap-2">
//                         {[1, 2, 3, 4, 5].map(star => (
//                           <button
//                             key={star}
//                             type="button"
//                             onClick={() => handleRatingClick(star)}
//                             onMouseEnter={() => setRatingHover(star)}
//                             onMouseLeave={() => setRatingHover(0)}
//                             className="transition-transform hover:scale-110"
//                           >
//                             <Star 
//                               className={`w-8 h-8 ${
//                                 (ratingHover || formData.rating) >= star
//                                   ? 'fill-yellow-400 text-yellow-400'
//                                   : 'text-gray-300'
//                               }`}
//                             />
//                           </button>
//                         ))}
//                         <span className="ml-2 text-sm text-gray-500">
//                           {formData.rating > 0 ? `${formData.rating} out of 5 stars` : 'No rating set'}
//                         </span>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-3">Set the product rating (1-5 stars) - Optional</p>
//                       {formData.rating > 0 && (
//                         <button
//                           type="button"
//                           onClick={clearRating}
//                           className="mt-2 text-xs text-red-500 hover:text-red-600 transition-colors"
//                         >
//                           Clear Rating
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Status Card */}
//                   <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
//                     <div className="p-5 border-b border-[#72846A]/20">
//                       <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Box className="w-5 h-5 text-[#72846A]" /> Product Status</h2>
//                     </div>
//                     <div className="p-5">
//                       <label className="flex items-center gap-3 cursor-pointer">
//                         <input type="checkbox" checked={true} disabled className="w-5 h-5 rounded border-gray-300 text-[#72846A]" />
//                         <div><span className="text-sm font-medium text-gray-700">Active Product</span><p className="text-xs text-gray-500">Product will be visible to customers</p></div>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Update Product Button at Bottom */}
//               <div className="mt-8 flex justify-end gap-3">
//                 <a href="/authorize/all-products">
//                   <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">Cancel</button>
//                 </a>
//                 <button type="submit" disabled={isSubmitting || !hasChanges()} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#72846A] to-[#738769] text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg">
//                   {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                   {isSubmitting ? 'Updating...' : 'Update Product'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Media Library Picker - Multiple Images */}
//         <MediaLibraryPicker
//           isOpen={showMediaPicker}
//           onClose={() => setShowMediaPicker(false)}
//           onSelect={handleMediaLibrarySelect}
//           multiple={true}
//           maxSelect={6 - productImages.filter(img => img.url !== null && !img.uploading).length}
//           currentImages={productImages.filter(img => img.url !== null).map(img => img.url)}
//         />

//         {/* Media Library Picker - Single Image */}
//         <MediaLibraryPicker
//           isOpen={showSingleMediaPicker}
//           onClose={() => {
//             setShowSingleMediaPicker(false);
//             setSelectedSlotIndex(null);
//           }}
//           onSelect={handleSingleMediaLibrarySelect}
//           multiple={false}
//           maxSelect={1}
//           currentImages={productImages.filter(img => img.url !== null).map(img => img.url)}
//         />

//         {/* Media Library Picker - Video */}
//         <MediaLibraryPicker
//           isOpen={showVideoMediaPicker}
//           onClose={() => setShowVideoMediaPicker(false)}
//           onSelect={handleVideoMediaLibrarySelect}
//           multiple={false}
//           maxSelect={1}
//           currentImages={[]}
//           onlyVideos={true}
//         />

//         {/* Slot Picker Modal - Images */}
//         <ImageSlotPickerModal
//           isOpen={showSlotPicker}
//           onClose={() => {
//             setShowSlotPicker(false);
//             setSlotPickerIndex(null);
//           }}
//           onUploadFromDevice={handleUploadFromDevice}
//           onChooseFromLibrary={handleChooseFromLibrary}
//         />
//       </MantineProvider>
//     </ProtectedRoute>
//   );
// }


'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import { 
  Plus, 
  X, 
  Save, 
  ArrowLeft,
  Image as ImageIcon,
  XCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Upload,
  Package,
  DollarSign,
  Tag,
  Info,
  Star,
  Search,
  Hash,
  Layers,
  Box,
  ChevronDown,
  GripVertical,
  Palette,
  TrendingUp,
  Zap,
  Clock,
  Flame,
  Gift,
  CheckCircle,
  RefreshCw,
  Building2,
  Video,
  Youtube,
  Scale,
  FolderTree,
  HelpCircle,
  LinkIcon,
  ChevronRight,
  Grid,
  List,
  Circle
} from 'lucide-react';
import { toast } from 'sonner';
import { MantineProvider } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TiptapLink from '@tiptap/extension-link';
import { SketchPicker } from 'react-color';

import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import MediaLibraryPicker from '@/app/components/MediaLibraryPicker';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// Unit options
const UNIT_OPTIONS = [
  { value: 'pcs', label: 'Pieces (pcs)' },
  { value: 'ton', label: 'Ton (ton)' },
  { value: 'other', label: 'Other' }
];

// Variant Type options
const VARIANT_TYPE_OPTIONS = [
  { value: 'color', label: 'Color' },
  { value: 'size', label: 'Size' },
  { value: 'material', label: 'Material' },
  { value: 'style', label: 'Style' },
  { value: 'custom', label: 'Custom' }
];

// Color presets
const COLOR_PRESETS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#008000', '#FFC0CB', '#A52A2A', '#808080', '#C0C0C0',
  '#4A90E2', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE'
];

// ============================================================
// COMPONENTS
// ============================================================

// Add Brand Modal Component
const AddBrandModal = ({ isOpen, onClose, onBrandAdded }) => {
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState(null);
  const [brandLogoPreview, setBrandLogoPreview] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo must be less than 2MB');
      return;
    }

    setBrandLogo(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setBrandLogoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadLogoToCloudinary = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');

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
      console.error('Logo upload error:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!brandName.trim()) {
      toast.error('Please enter a brand name');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      let logoUrl = '';
      let logoPublicId = '';
      
      if (brandLogo) {
        const result = await uploadLogoToCloudinary(brandLogo);
        logoUrl = result.url;
        logoPublicId = result.publicId;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/brands`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: brandName.trim(),
          logo: logoUrl,
          description: brandDescription.trim()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Brand added successfully');
        setBrandName('');
        setBrandLogo(null);
        setBrandLogoPreview('');
        setBrandDescription('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        onBrandAdded(data.data);
        onClose();
      } else {
        toast.error(data.error || 'Failed to add brand');
      }
    } catch (error) {
      console.error('Error adding brand:', error);
      toast.error('Failed to add brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#72846A]" />
            Add New Brand
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand Logo <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <div className="flex items-center gap-4">
              {brandLogoPreview ? (
                <div className="relative">
                  <img 
                    src={brandLogoPreview} 
                    alt="Brand Logo" 
                    className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setBrandLogo(null);
                      setBrandLogoPreview('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div 
                  className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#72846A] transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={handleLogoChange}
              />
              <div>
                <p className="text-xs text-gray-500">Upload a brand logo</p>
                <p className="text-[10px] text-gray-400">JPG, PNG, WebP (max 2MB)</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g., Apple, Samsung, Sony"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <textarea
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              placeholder="Brief description of the brand"
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition resize-none"
            />
          </div>
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isUploading}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#738769] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting || isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add Brand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Color Picker Component
const ColorPicker = ({ colors, onChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(null);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
        setCurrentColorIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addColor = () => {
    onChange([...colors, { code: '#000000' }]);
  };

  const removeColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    onChange(updatedColors);
  };

  const openColorPicker = (index, event) => {
    event.stopPropagation();
    setCurrentColorIndex(index);
    setShowColorPicker(true);
  };

  const handleColorChange = (index, color) => {
    const updatedColors = [...colors];
    updatedColors[index] = { code: color.hex };
    onChange(updatedColors);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {COLOR_PRESETS.slice(0, 8).map(color => (
          <button
            key={color}
            type="button"
            onClick={() => {
              if (colors.length === 0) {
                onChange([{ code: color }]);
              } else {
                const updatedColors = [...colors];
                updatedColors[0] = { code: color };
                onChange(updatedColors);
              }
            }}
            className="w-8 h-8 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform shadow-sm"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      
      <div className="space-y-2">
        {colors.map((color, index) => (
          <div key={index} className="relative">
            <div className="flex items-center gap-2 w-full">
              <div 
                className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-2 cursor-pointer hover:border-[#72846A] transition-colors"
                onClick={(e) => openColorPicker(index, e)}
              >
                <div 
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: color.code }}
                />
                <div className="flex-1 font-mono text-sm text-gray-600">
                  {color.code}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </div>
              
              <button
                type="button"
                onClick={() => removeColor(index)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                title="Remove Color"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {showColorPicker && currentColorIndex === index && (
              <div ref={colorPickerRef} className="absolute right-0 mt-2 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
                  <SketchPicker
                    color={color.code}
                    onChange={(newColor) => handleColorChange(index, newColor)}
                    presetColors={COLOR_PRESETS}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addColor}
          className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium text-[#72846A] border border-dashed border-[#72846A]/40 rounded-lg hover:bg-[#72846A]/5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Color
        </button>
      </div>
    </div>
  );
};

// ============================================================
// VARIANT COLOR PICKER COMPONENT - FIXED
// ============================================================
const VariantColorPicker = ({ color, onChange, onRemove }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [localColor, setLocalColor] = useState(color || '#000000');
  const pickerRef = useRef(null);

  useEffect(() => {
    setLocalColor(color || '#000000');
  }, [color]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleColorChange = (newColor) => {
    setLocalColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div 
          className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-[#72846A] transition-colors flex-shrink-0"
          style={{ backgroundColor: localColor }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <input
          type="text"
          value={localColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition font-mono"
          placeholder="#000000"
        />
        {onRemove && (
          <button
            type="button"
            onClick={() => {
              handleColorChange('');
              onRemove();
            }}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showPicker && (
        <div ref={pickerRef} className="absolute right-0 mt-2 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
            <div className="flex flex-wrap gap-2 max-w-[240px]">
              {COLOR_PRESETS.map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    handleColorChange(preset);
                    setShowPicker(false);
                  }}
                  className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${
                    localColor === preset ? 'border-[#72846A] ring-2 ring-[#72846A] ring-offset-2' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: preset }}
                />
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                type="color"
                value={localColor}
                onChange={(e) => {
                  handleColorChange(e.target.value);
                }}
                className="w-full h-10 rounded border border-gray-200 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// SUB VARIANT COMPONENT
// ============================================================
const SubVariantItem = ({ 
  subVariant, 
  index, 
  variantIndex, 
  onUpdate, 
  onRemove,
  isAdminOrSuperAdmin,
  defaultPackagingCost,
  defaultDeliveryCost,
  expandedSubVariant,
  setExpandedSubVariant
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [subVariantImages, setSubVariantImages] = useState(subVariant.images || [null, null, null, null]);
  const [subVariantImagePreviews, setSubVariantImagePreviews] = useState(subVariant.imagePreviews || [null, null, null, null]);
  const [showColorPicker, setShowColorPicker] = useState(!!subVariant.color);

  useEffect(() => {
    setSubVariantImages(subVariant.images || [null, null, null, null]);
    setSubVariantImagePreviews(subVariant.imagePreviews || [null, null, null, null]);
    setShowColorPicker(!!subVariant.color);
  }, [subVariant]);

  const isExpanded = expandedSubVariant === index;

  const calculateCost = (buyingPrice, packagingCost, deliveryCost) => {
    const bp = parseFloat(buyingPrice) || 0;
    const pc = parseFloat(packagingCost) || 0;
    const dc = parseFloat(deliveryCost) || 0;
    return bp + pc + dc;
  };

  const getFilledCount = (images) => {
    return (images || []).filter(Boolean).length;
  };

  const validateImageFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: 'Invalid format. Allowed: JPG, PNG, WebP, GIF' };
    }
    if (file.size > maxSize) {
      return { valid: false, message: 'File too large. Max: 5MB' };
    }
    return { valid: true };
  };

  const uploadMultipleVariantImages = async (files) => {
    const uploadedUrls = [];
    const uploadedPreviews = [];

    for (const file of files) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast.error(`${file.name}: ${validation.message}`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
        
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        
        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
          uploadedPreviews.push(data.secure_url);
        } else {
          throw new Error(data.error?.message || 'Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    return { uploadedUrls, uploadedPreviews };
  };

  const updateField = (field, value) => {
    const updated = { ...subVariant, [field]: value };
    if (['buyingPrice', 'packagingCost', 'deliveryCost'].includes(field)) {
      updated.costPerItem = calculateCost(
        field === 'buyingPrice' ? value : subVariant.buyingPrice,
        field === 'packagingCost' ? value : subVariant.packagingCost,
        field === 'deliveryCost' ? value : subVariant.deliveryCost
      );
    }
    onUpdate(variantIndex, index, updated);
  };

  const handleMultipleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const emptySlots = subVariantImages.reduce((acc, v, i) => (v == null ? [...acc, i] : acc), []);
    
    if (files.length > emptySlots.length) {
      toast.error(`You can only upload ${emptySlots.length} more image(s). Maximum 4 images total.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    try {
      const { uploadedUrls, uploadedPreviews } = await uploadMultipleVariantImages(files);
      
      const updatedImages = [...subVariantImages];
      const updatedPreviews = [...subVariantImagePreviews];
      
      uploadedUrls.forEach((url, i) => {
        updatedImages[emptySlots[i]] = url;
      });
      uploadedPreviews.forEach((url, i) => {
        updatedPreviews[emptySlots[i]] = url;
      });
      
      setSubVariantImages(updatedImages);
      setSubVariantImagePreviews(updatedPreviews);
      
      const updated = { ...subVariant, images: updatedImages, imagePreviews: updatedPreviews };
      onUpdate(variantIndex, index, updated);
      
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (slotIdx) => {
    const updatedImages = [...subVariantImages];
    const updatedPreviews = [...subVariantImagePreviews];
    
    if (updatedPreviews[slotIdx]?.startsWith('blob:')) {
      URL.revokeObjectURL(updatedPreviews[slotIdx]);
    }
    
    updatedImages[slotIdx] = null;
    updatedPreviews[slotIdx] = null;
    
    setSubVariantImages(updatedImages);
    setSubVariantImagePreviews(updatedPreviews);
    
    const updated = { ...subVariant, images: updatedImages, imagePreviews: updatedPreviews };
    onUpdate(variantIndex, index, updated);
  };

  const toggleExpand = () => {
    setExpandedSubVariant(isExpanded ? null : index);
  };

  const toggleColorPicker = () => {
    if (showColorPicker) {
      updateField('color', '');
      setShowColorPicker(false);
    } else {
      setShowColorPicker(true);
      if (!subVariant.color) {
        updateField('color', '#000000');
      }
    }
  };

  return (
    <div className="border border-[#72846A]/30 rounded-lg overflow-hidden bg-pink-50/30">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-pink-50 transition-colors"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {subVariantImagePreviews && subVariantImagePreviews[0] ? (
              <img 
                src={subVariantImagePreviews[0]} 
                alt={subVariant.name} 
                className="w-10 h-10 rounded-lg object-cover border border-gray-200"
              />
            ) : subVariant.color ? (
              <div 
                className="w-10 h-10 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: subVariant.color }}
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                <Package className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-sm text-gray-900">{subVariant.name || 'Untitled Sub Variant'}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>৳{subVariant.regularPrice || 0}</span>
              {subVariant.discountPrice > 0 && (
                <span className="text-green-600">৳{subVariant.discountPrice}</span>
              )}
              <span className="text-gray-400">Stock: {subVariant.stockQuantity || 0}</span>
              <span className="text-gray-400">Images: {getFilledCount(subVariantImages)}/4</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-[#72846A]/20 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Sub Variant Name *</label>
              <input
                type="text"
                value={subVariant.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                placeholder="e.g., Red, Large, Cotton"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-gray-700">Color</label>
                <button
                  type="button"
                  onClick={toggleColorPicker}
                  className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1"
                >
                  {showColorPicker ? (
                    <>
                      <X className="w-3 h-3" />
                      Remove Color
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      Add Color
                    </>
                  )}
                </button>
              </div>
              {showColorPicker && (
                <VariantColorPicker
                  color={subVariant.color || '#000000'}
                  onChange={(color) => {
                    updateField('color', color);
                  }}
                  onRemove={() => {
                    updateField('color', '');
                    setShowColorPicker(false);
                  }}
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
              <input
                type="number"
                value={subVariant.regularPrice || ''}
                onChange={(e) => updateField('regularPrice', e.target.value)}
                onWheel={(e) => e.target.blur()}
                min="0"
                step="1"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400">(Optional)</span></label>
              <input
                type="number"
                value={subVariant.discountPrice || ''}
                onChange={(e) => updateField('discountPrice', e.target.value)}
                onWheel={(e) => e.target.blur()}
                min="0"
                step="1"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Stock Quantity *</label>
              <input
                type="number"
                value={subVariant.stockQuantity || ''}
                onChange={(e) => updateField('stockQuantity', e.target.value)}
                onWheel={(e) => e.target.blur()}
                min="0"
                step="1"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                placeholder="0"
              />
            </div>

            {isAdminOrSuperAdmin && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span></label>
                <input
                  type="number"
                  value={subVariant.buyingPrice || ''}
                  onChange={(e) => updateField('buyingPrice', e.target.value)}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                  placeholder="0"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Packaging Cost (৳) <span className="text-gray-400">(Optional)</span></label>
              <input
                type="number"
                value={subVariant.packagingCost || ''}
                onChange={(e) => updateField('packagingCost', e.target.value)}
                onWheel={(e) => e.target.blur()}
                min="0"
                step="1"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                placeholder={defaultPackagingCost || '0'}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Cost (৳) <span className="text-gray-400">(Optional)</span></label>
              <input
                type="number"
                value={subVariant.deliveryCost || ''}
                onChange={(e) => updateField('deliveryCost', e.target.value)}
                onWheel={(e) => e.target.blur()}
                min="0"
                step="1"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                placeholder={defaultDeliveryCost || '0'}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Cost Per Item (Auto-calculated)</label>
              <input
                type="text"
                value={
                  subVariant.costPerItem !== undefined && subVariant.costPerItem !== null
                    ? subVariant.costPerItem
                    : 0
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
                readOnly
                disabled
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-gray-700">Sub Variant Images <span className="text-gray-400">(Max 4)</span></label>
                {getFilledCount(subVariantImages) < 4 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Upload className="w-3 h-3" />
                    )}
                    {isUploading ? 'Uploading...' : 'Add Images'}
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((slotIdx) => {
                  const imageUrl = subVariantImagePreviews && subVariantImagePreviews[slotIdx];
                  
                  return (
                    <div
                      key={slotIdx}
                      className={`border-2 border-dashed rounded-lg p-2 text-center h-28 flex flex-col items-center justify-center transition-colors ${
                        imageUrl 
                          ? 'border-gray-200 bg-gray-100' 
                          : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'
                      }`}
                    >
                      {imageUrl ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={imageUrl} 
                            alt={`Sub variant ${slotIdx + 1}`} 
                            className="w-full h-full object-contain pointer-events-none select-none"
                            draggable="false"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(slotIdx)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-[10px] rounded">
                            {slotIdx + 1}
                          </span>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                          <p className="text-[10px] text-gray-400 mt-1">Empty</p>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleMultipleImageSelect}
                disabled={isUploading}
              />
              <p className="text-xs text-gray-400 mt-1">Select multiple images at once (up to 4 total)</p>
              {getFilledCount(subVariantImages) > 0 && (
                <p className="text-xs text-[#72846A] mt-1">{getFilledCount(subVariantImages)} of 4 images uploaded</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Remove Sub Variant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// VARIANT TYPE SECTION COMPONENT
// ============================================================
const VariantTypeSection = ({ 
  variantType, 
  onVariantTypeChange, 
  variants, 
  onVariantsChange,
  onRemoveType,
  defaultPackagingCost,
  defaultDeliveryCost,
  isAdminOrSuperAdmin
}) => {
  const [showAddVariant, setShowAddVariant] = useState(false);
  const [showAddSubVariant, setShowAddSubVariant] = useState(null);
  const [newVariantName, setNewVariantName] = useState('');
  const [newVariantColor, setNewVariantColor] = useState('#000000');
  const [newVariantPrice, setNewVariantPrice] = useState('');
  const [newVariantDiscountPrice, setNewVariantDiscountPrice] = useState('');
  const [newVariantBuyingPrice, setNewVariantBuyingPrice] = useState('');
  const [newVariantPackagingCost, setNewVariantPackagingCost] = useState(defaultPackagingCost || '');
  const [newVariantDeliveryCost, setNewVariantDeliveryCost] = useState(defaultDeliveryCost || '');
  const [newVariantStock, setNewVariantStock] = useState('');
  const [newVariantImages, setNewVariantImages] = useState([null, null, null, null]);
  const [newVariantImagePreviews, setNewVariantImagePreviews] = useState([null, null, null, null]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [expandedVariant, setExpandedVariant] = useState(null);
  const [expandedSubVariant, setExpandedSubVariant] = useState(null);
  
  const [newVariantSubVariants, setNewVariantSubVariants] = useState([]);
  const [showAddSubVariantInForm, setShowAddSubVariantInForm] = useState(false);
  
  const [newSubVariant, setNewSubVariant] = useState({
    name: '',
    color: '',
    regularPrice: '',
    discountPrice: '',
    stockQuantity: '',
    buyingPrice: '',
    packagingCost: defaultPackagingCost || '',
    deliveryCost: defaultDeliveryCost || '',
    costPerItem: 0,
    images: [null, null, null, null],
    imagePreviews: [null, null, null, null]
  });
  const [isSubVariantUploading, setIsSubVariantUploading] = useState(false);
  const subVariantFileInputRef = useRef(null);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const calculateVariantCost = (buyingPrice, packagingCost, deliveryCost) => {
    const bp = parseFloat(buyingPrice) || 0;
    const pc = parseFloat(packagingCost) || 0;
    const dc = parseFloat(deliveryCost) || 0;
    return bp + pc + dc;
  };

  const getFilledCount = (images) => {
    return (images || []).filter(Boolean).length;
  };

  const validateImageFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: 'Invalid format. Allowed: JPG, PNG, WebP, GIF' };
    }
    if (file.size > maxSize) {
      return { valid: false, message: 'File too large. Max: 5MB' };
    }
    return { valid: true };
  };

  const uploadMultipleVariantImages = async (files) => {
    const uploadedUrls = [];
    const uploadedPreviews = [];

    for (const file of files) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast.error(`${file.name}: ${validation.message}`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
        
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        
        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
          uploadedPreviews.push(data.secure_url);
        } else {
          throw new Error(data.error?.message || 'Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    return { uploadedUrls, uploadedPreviews };
  };

  const addSubVariantToForm = () => {
    if (!newSubVariant.name.trim()) {
      toast.error('Please enter a sub variant name');
      return;
    }

    const subVariantToAdd = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...newSubVariant,
      costPerItem: calculateVariantCost(
        newSubVariant.buyingPrice,
        newSubVariant.packagingCost,
        newSubVariant.deliveryCost
      ),
      images: [...newSubVariant.images],
      imagePreviews: [...newSubVariant.imagePreviews]
    };

    setNewVariantSubVariants([...newVariantSubVariants, subVariantToAdd]);
    setExpandedSubVariant(newVariantSubVariants.length);

    setNewSubVariant({
      name: '',
      color: '',
      regularPrice: '',
      discountPrice: '',
      stockQuantity: '',
      buyingPrice: '',
      packagingCost: defaultPackagingCost || '',
      deliveryCost: defaultDeliveryCost || '',
      costPerItem: 0,
      images: [null, null, null, null],
      imagePreviews: [null, null, null, null]
    });
    setShowAddSubVariantInForm(false);
    toast.success('Sub variant added to variant');
  };

  const removeSubVariantFromForm = (index) => {
    const updated = newVariantSubVariants.filter((_, i) => i !== index);
    setNewVariantSubVariants(updated);
    toast.success('Sub variant removed');
  };

  const handleSubVariantImageSelectForForm = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const emptySlots = newSubVariant.images.reduce((acc, v, i) => (v == null ? [...acc, i] : acc), []);
    
    if (files.length > emptySlots.length) {
      toast.error(`You can only upload ${emptySlots.length} more image(s). Maximum 4 images total.`);
      if (subVariantFileInputRef.current) subVariantFileInputRef.current.value = '';
      return;
    }

    setIsSubVariantUploading(true);
    try {
      const { uploadedUrls, uploadedPreviews } = await uploadMultipleVariantImages(files);
      
      const updatedImages = [...newSubVariant.images];
      const updatedPreviews = [...newSubVariant.imagePreviews];
      
      uploadedUrls.forEach((url, i) => {
        updatedImages[emptySlots[i]] = url;
      });
      uploadedPreviews.forEach((url, i) => {
        updatedPreviews[emptySlots[i]] = url;
      });
      
      setNewSubVariant(prev => ({
        ...prev,
        images: updatedImages,
        imagePreviews: updatedPreviews
      }));
      
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsSubVariantUploading(false);
      if (subVariantFileInputRef.current) subVariantFileInputRef.current.value = '';
    }
  };

  const removeSubVariantImageFromForm = (slotIdx) => {
    const updatedImages = [...newSubVariant.images];
    const updatedPreviews = [...newSubVariant.imagePreviews];
    
    if (updatedPreviews[slotIdx]?.startsWith('blob:')) {
      URL.revokeObjectURL(updatedPreviews[slotIdx]);
    }
    
    updatedImages[slotIdx] = null;
    updatedPreviews[slotIdx] = null;
    
    setNewSubVariant(prev => ({
      ...prev,
      images: updatedImages,
      imagePreviews: updatedPreviews
    }));
  };

  const addSubVariant = (variantIndex) => {
    if (!newSubVariant.name.trim()) {
      toast.error('Please enter a sub variant name');
      return;
    }

    const updatedVariants = [...variants];
    const variant = { ...updatedVariants[variantIndex] };
    
    if (!variant.subVariants) {
      variant.subVariants = [];
    }

    const subVariantToAdd = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...newSubVariant,
      costPerItem: calculateVariantCost(
        newSubVariant.buyingPrice,
        newSubVariant.packagingCost,
        newSubVariant.deliveryCost
      ),
      images: [...newSubVariant.images],
      imagePreviews: [...newSubVariant.imagePreviews]
    };

    const newIndex = variant.subVariants.length;
    variant.subVariants.push(subVariantToAdd);
    updatedVariants[variantIndex] = variant;
    onVariantsChange(updatedVariants);
    setExpandedSubVariant(newIndex);

    setNewSubVariant({
      name: '',
      color: '',
      regularPrice: '',
      discountPrice: '',
      stockQuantity: '',
      buyingPrice: '',
      packagingCost: defaultPackagingCost || '',
      deliveryCost: defaultDeliveryCost || '',
      costPerItem: 0,
      images: [null, null, null, null],
      imagePreviews: [null, null, null, null]
    });
    setShowAddSubVariant(null);
    toast.success('Sub variant added successfully');
  };

  const updateSubVariant = (variantIndex, subVariantIndex, updatedSubVariant) => {
    const updatedVariants = [...variants];
    const variant = { ...updatedVariants[variantIndex] };
    
    if (!variant.subVariants) {
      variant.subVariants = [];
    }
    
    if (subVariantIndex >= variant.subVariants.length) {
      variant.subVariants.push(updatedSubVariant);
    } else {
      variant.subVariants[subVariantIndex] = { ...updatedSubVariant };
    }
    
    updatedVariants[variantIndex] = variant;
    onVariantsChange(updatedVariants);
  };

  const removeSubVariant = (variantIndex, subVariantIndex) => {
    if (!confirm('Remove this sub variant?')) return;
    
    const updatedVariants = [...variants];
    const variant = { ...updatedVariants[variantIndex] };
    variant.subVariants.splice(subVariantIndex, 1);
    updatedVariants[variantIndex] = variant;
    onVariantsChange(updatedVariants);
    toast.success('Sub variant removed');
  };

  const handleMultipleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const emptySlots = newVariantImages.reduce((acc, v, i) => (v == null ? [...acc, i] : acc), []);
    
    if (files.length > emptySlots.length) {
      toast.error(`You can only upload ${emptySlots.length} more image(s). Maximum 4 images total.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    try {
      const { uploadedUrls, uploadedPreviews } = await uploadMultipleVariantImages(files);
      
      const updatedImages = [...newVariantImages];
      const updatedPreviews = [...newVariantImagePreviews];
      
      uploadedUrls.forEach((url, i) => {
        updatedImages[emptySlots[i]] = url;
      });
      uploadedPreviews.forEach((url, i) => {
        updatedPreviews[emptySlots[i]] = url;
      });
      
      setNewVariantImages(updatedImages);
      setNewVariantImagePreviews(updatedPreviews);
      
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeNewVariantImage = (index) => {
    const updatedImages = [...newVariantImages];
    const updatedPreviews = [...newVariantImagePreviews];
    
    if (updatedPreviews[index]?.startsWith('blob:')) {
      URL.revokeObjectURL(updatedPreviews[index]);
    }
    
    updatedImages[index] = null;
    updatedPreviews[index] = null;
    
    setNewVariantImages(updatedImages);
    setNewVariantImagePreviews(updatedPreviews);
  };

  const moveVariantImage = (variantIndex, fromIndex, toIndex) => {
    const updatedVariants = [...variants];
    const variant = { ...updatedVariants[variantIndex] };

    const images = [...(variant.images || [null, null, null, null])];
    const imagePreviews = [...(variant.imagePreviews || [null, null, null, null])];

    const [movedImage] = images.splice(fromIndex, 1);
    images.splice(toIndex, 0, movedImage);

    const [movedPreview] = imagePreviews.splice(fromIndex, 1);
    imagePreviews.splice(toIndex, 0, movedPreview);

    variant.images = images;
    variant.imagePreviews = imagePreviews;
    updatedVariants[variantIndex] = variant;
    onVariantsChange(updatedVariants);
  };

  const handleDragStart = (e, variantIndex, imageIndex) => {
    e.stopPropagation();
    const variant = variants[variantIndex];
    if (variant.imagePreviews && variant.imagePreviews[imageIndex]) {
      setDraggedItem({ variantIndex, imageIndex });
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', `${variantIndex}-${imageIndex}`);
      e.dataTransfer.dropEffect = 'move';
    } else {
      e.preventDefault();
    }
  };

  const handleDragOver = (e, variantIndex, imageIndex) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedItem) {
      const { variantIndex: srcV, imageIndex: srcI } = draggedItem;
      if (srcV === variantIndex && srcI !== imageIndex) {
        setDragOverItem({ variantIndex, imageIndex });
      }
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverItem(null);
  };

  const handleDrop = (e, targetVariantIndex, targetImageIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem) {
      setDragOverItem(null);
      return;
    }

    const { variantIndex: srcV, imageIndex: srcI } = draggedItem;

    if (srcV !== targetVariantIndex || srcI === targetImageIndex) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    moveVariantImage(targetVariantIndex, srcI, targetImageIndex);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleAddVariant = async () => {
    if (!newVariantName.trim()) {
      toast.error('Please enter a variant name');
      return;
    }

    const paddedImages = [0, 1, 2, 3].map(i => newVariantImages[i] ?? null);
    const paddedPreviews = [0, 1, 2, 3].map(i => newVariantImagePreviews[i] ?? null);

    const newVariant = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: newVariantName.trim(),
      color: variantType.type === 'color' ? newVariantColor : undefined,
      regularPrice: parseFloat(newVariantPrice) || 0,
      discountPrice: parseFloat(newVariantDiscountPrice) || 0,
      buyingPrice: parseFloat(newVariantBuyingPrice) || 0,
      packagingCost: parseFloat(newVariantPackagingCost) || 0,
      deliveryCost: parseFloat(newVariantDeliveryCost) || 0,
      costPerItem: calculateVariantCost(newVariantBuyingPrice, newVariantPackagingCost, newVariantDeliveryCost),
      stockQuantity: parseFloat(newVariantStock) || 0,
      images: paddedImages,
      imagePreviews: paddedPreviews,
      subVariants: [...newVariantSubVariants]
    };

    onVariantsChange([...variants, newVariant]);

    setNewVariantName('');
    setNewVariantColor('#000000');
    setNewVariantPrice('');
    setNewVariantDiscountPrice('');
    setNewVariantBuyingPrice('');
    setNewVariantPackagingCost(defaultPackagingCost || '');
    setNewVariantDeliveryCost(defaultDeliveryCost || '');
    setNewVariantStock('');
    setNewVariantImages([null, null, null, null]);
    setNewVariantImagePreviews([null, null, null, null]);
    setNewVariantSubVariants([]);
    setShowAddSubVariantInForm(false);
    setShowAddVariant(false);
    toast.success(`Variant added successfully with ${newVariantSubVariants.length} sub-variant(s)`);
  };

  const removeVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    onVariantsChange(updatedVariants);
    toast.success('Variant removed');
  };

  const updateVariantField = (index, field, value) => {
    const updatedVariants = [...variants];
    const variant = { ...updatedVariants[index] };
    
    variant[field] = value;
    
    if (['buyingPrice', 'packagingCost', 'deliveryCost'].includes(field)) {
      const bp = field === 'buyingPrice' ? parseFloat(value) || 0 : parseFloat(variant.buyingPrice) || 0;
      const pc = field === 'packagingCost' ? parseFloat(value) || 0 : parseFloat(variant.packagingCost) || 0;
      const dc = field === 'deliveryCost' ? parseFloat(value) || 0 : parseFloat(variant.deliveryCost) || 0;
      variant.costPerItem = bp + pc + dc;
    }
    
    updatedVariants[index] = variant;
    onVariantsChange(updatedVariants);
  };

  const updateVariantColor = (index, color) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], color };
    onVariantsChange(updatedVariants);
  };

  const updateVariantImages = async (variantIndex, files) => {
    if (!files || files.length === 0) return;

    const variant = variants[variantIndex];
    const images = variant.images && variant.images.length === 4 ? [...variant.images] : [null, null, null, null];
    const imagePreviews = variant.imagePreviews && variant.imagePreviews.length === 4 ? [...variant.imagePreviews] : [null, null, null, null];

    const emptySlots = images.reduce((acc, v, i) => (v == null ? [...acc, i] : acc), []);
    if (files.length > emptySlots.length) {
      toast.error(`You can only upload ${emptySlots.length} more image(s). Maximum 4 images total.`);
      return;
    }

    setIsUploading(true);
    try {
      const { uploadedUrls, uploadedPreviews } = await uploadMultipleVariantImages(files);
      uploadedUrls.forEach((url, i) => { images[emptySlots[i]] = url; });
      uploadedPreviews.forEach((url, i) => { imagePreviews[emptySlots[i]] = url; });

      const updatedVariants = [...variants];
      updatedVariants[variantIndex] = { ...variant, images, imagePreviews };
      onVariantsChange(updatedVariants);
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const removeVariantImage = (variantIndex, imageIndex) => {
    const updatedVariants = [...variants];
    const variant = { ...updatedVariants[variantIndex] };

    const images = [...(variant.images || [null, null, null, null])];
    const imagePreviews = [...(variant.imagePreviews || [null, null, null, null])];

    if (imagePreviews[imageIndex]?.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviews[imageIndex]);
    }

    images[imageIndex] = null;
    imagePreviews[imageIndex] = null;

    variant.images = images;
    variant.imagePreviews = imagePreviews;
    updatedVariants[variantIndex] = variant;
    onVariantsChange(updatedVariants);
    toast.success('Image removed');
  };

  const toggleVariantExpand = (index) => {
    setExpandedVariant(expandedVariant === index ? null : index);
  };

  const getTypeLabel = (type) => {
    const option = VARIANT_TYPE_OPTIONS.find(opt => opt.value === type);
    return option ? option.label : type;
  };

  const renderSubVariantFormInAddVariant = () => {
    return (
      <div className="border border-[#72846A]/40 rounded-lg p-4 bg-[#72846A]/5 mt-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-[#004767]">Add Sub Variant</h4>
          <button
            type="button"
            onClick={() => setShowAddSubVariantInForm(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Sub Variant Name *</label>
            <input
              type="text"
              value={newSubVariant.name}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder="e.g., Red, Large, Cotton"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-gray-700">Color <span className="text-gray-400">(add if needed)</span></label>
              <button
                type="button"
                onClick={() => {
                  if (newSubVariant.color) {
                    setNewSubVariant(prev => ({ ...prev, color: '' }));
                  } else {
                    setNewSubVariant(prev => ({ ...prev, color: '#000000' }));
                  }
                }}
                className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1"
              >
                {newSubVariant.color ? (
                  <>
                    <X className="w-3 h-3" />
                    Remove 
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3" />
                    Add Color
                  </>
                )}
              </button>
            </div>
            {newSubVariant.color && (
              <VariantColorPicker
                color={newSubVariant.color || '#000000'}
                onChange={(color) => setNewSubVariant(prev => ({ ...prev, color }))}
                onRemove={() => {}}
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
            <input
              type="number"
              value={newSubVariant.regularPrice}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, regularPrice: e.target.value }))}
              onWheel={(e) => e.target.blur()}
              min="0"
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400">(Optional)</span></label>
            <input
              type="number"
              value={newSubVariant.discountPrice}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, discountPrice: e.target.value }))}
              onWheel={(e) => e.target.blur()}
              min="0"
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Stock Quantity *</label>
            <input
              type="number"
              value={newSubVariant.stockQuantity}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, stockQuantity: e.target.value }))}
              onWheel={(e) => e.target.blur()}
              min="0"
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder="0"
            />
          </div>

          {isAdminOrSuperAdmin && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span></label>
              <input
                type="number"
                value={newSubVariant.buyingPrice}
                onChange={(e) => setNewSubVariant(prev => ({ ...prev, buyingPrice: e.target.value }))}
                onWheel={(e) => e.target.blur()}
                min="0"
                step="1"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                placeholder="0"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Packaging Cost (৳) <span className="text-gray-400">(Optional)</span></label>
            <input
              type="number"
              value={newSubVariant.packagingCost}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, packagingCost: e.target.value }))}
              onWheel={(e) => e.target.blur()}
              min="0"
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder={defaultPackagingCost || '0'}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Cost (৳) <span className="text-gray-400">(Optional)</span></label>
            <input
              type="number"
              value={newSubVariant.deliveryCost}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, deliveryCost: e.target.value }))}
              onWheel={(e) => e.target.blur()}
              min="0"
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder={defaultDeliveryCost || '0'}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Cost Per Item (Auto-calculated)</label>
            <input
              type="text"
              value={calculateVariantCost(
                newSubVariant.buyingPrice,
                newSubVariant.packagingCost,
                newSubVariant.deliveryCost
              )}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
              readOnly
              disabled
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-700">Sub Variant Images <span className="text-gray-400">(Max 4, Optional)</span></label>
              {getFilledCount(newSubVariant.images) < 4 && (
                <button
                  type="button"
                  onClick={() => subVariantFileInputRef.current?.click()}
                  disabled={isSubVariantUploading}
                  className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1 disabled:opacity-50"
                >
                  {isSubVariantUploading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Upload className="w-3 h-3" />
                  )}
                  {isSubVariantUploading ? 'Uploading...' : 'Select Images'}
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((slotIdx) => {
                const imageUrl = newSubVariant.imagePreviews && newSubVariant.imagePreviews[slotIdx];
                
                return (
                  <div
                    key={slotIdx}
                    className={`border-2 border-dashed rounded-lg p-2 text-center h-28 flex flex-col items-center justify-center transition-colors ${
                      imageUrl 
                        ? 'border-gray-200 bg-gray-100' 
                        : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'
                    }`}
                  >
                    {imageUrl ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={imageUrl} 
                          alt={`Sub variant ${slotIdx + 1}`} 
                          className="w-full h-full object-contain pointer-events-none select-none"
                          draggable="false"
                        />
                        <button
                          type="button"
                          onClick={() => removeSubVariantImageFromForm(slotIdx)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-[10px] rounded">
                          {slotIdx + 1}
                        </span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                        <p className="text-[10px] text-gray-400 mt-1">Empty</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <input
              ref={subVariantFileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleSubVariantImageSelectForForm}
              disabled={isSubVariantUploading}
            />
            <p className="text-xs text-gray-400 mt-1">Select multiple images at once (up to 4 total)</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={addSubVariantToForm}
            className="px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#738769] transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Add Sub Variant
          </button>
          <button
            type="button"
            onClick={() => {
              setShowAddSubVariantInForm(false);
              setNewSubVariant({
                name: '',
                color: '',
                regularPrice: '',
                discountPrice: '',
                stockQuantity: '',
                buyingPrice: '',
                packagingCost: defaultPackagingCost || '',
                deliveryCost: defaultDeliveryCost || '',
                costPerItem: 0,
                images: [null, null, null, null],
                imagePreviews: [null, null, null, null]
              });
            }}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderSubVariantForm = (variantIndex) => {
    return (
      <div className="border border-[#72846A]/40 rounded-lg p-4 bg-[#72846A]/5 mt-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-[#004767]">Add Sub Variant</h4>
          <button
            type="button"
            onClick={() => setShowAddSubVariant(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Sub Variant Name *</label>
            <input
              type="text"
              value={newSubVariant.name}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder="e.g., Red, Large, Cotton"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-gray-700">Color</label>
              <button
                type="button"
                onClick={() => {
                  if (newSubVariant.color) {
                    setNewSubVariant(prev => ({ ...prev, color: '' }));
                  } else {
                    setNewSubVariant(prev => ({ ...prev, color: '#000000' }));
                  }
                }}
                className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1"
              >
                {newSubVariant.color ? (
                  <>
                    <X className="w-3 h-3" />
                    Remove Color
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3" />
                    Add Color
                  </>
                )}
              </button>
            </div>
            {newSubVariant.color && (
              <VariantColorPicker
                color={newSubVariant.color || '#000000'}
                onChange={(color) => setNewSubVariant(prev => ({ ...prev, color }))}
                onRemove={() => {}}
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
            <input
              type="number"
              value={newSubVariant.regularPrice}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, regularPrice: e.target.value }))}
              onWheel={(e) => e.target.blur()}
              min="0"
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400">(Optional)</span></label>
            <input
              type="number"
              value={newSubVariant.discountPrice}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, discountPrice: e.target.value }))}
              onWheel={(e) => e.target.blur()}
              min="0"
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Stock Quantity *</label>
            <input
              type="number"
              value={newSubVariant.stockQuantity}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, stockQuantity: e.target.value }))}
              onWheel={(e) => e.target.blur()}
              min="0"
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder="0"
            />
          </div>

          {isAdminOrSuperAdmin && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span></label>
              <input
                type="number"
                value={newSubVariant.buyingPrice}
                onChange={(e) => setNewSubVariant(prev => ({ ...prev, buyingPrice: e.target.value }))}
                onWheel={(e) => e.target.blur()}
                min="0"
                step="1"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                placeholder="0"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Packaging Cost (৳) <span className="text-gray-400">(Optional)</span></label>
            <input
              type="number"
              value={newSubVariant.packagingCost}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, packagingCost: e.target.value }))}
              onWheel={(e) => e.target.blur()}
              min="0"
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder={defaultPackagingCost || '0'}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Cost (৳) <span className="text-gray-400">(Optional)</span></label>
            <input
              type="number"
              value={newSubVariant.deliveryCost}
              onChange={(e) => setNewSubVariant(prev => ({ ...prev, deliveryCost: e.target.value }))}
              onWheel={(e) => e.target.blur()}
              min="0"
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              placeholder={defaultDeliveryCost || '0'}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Cost Per Item (Auto-calculated)</label>
            <input
              type="text"
              value={calculateVariantCost(
                newSubVariant.buyingPrice,
                newSubVariant.packagingCost,
                newSubVariant.deliveryCost
              )}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
              readOnly
              disabled
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-700">Sub Variant Images <span className="text-gray-400">(Max 4, Optional)</span></label>
              {getFilledCount(newSubVariant.images) < 4 && (
                <button
                  type="button"
                  onClick={() => subVariantFileInputRef.current?.click()}
                  disabled={isSubVariantUploading}
                  className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1 disabled:opacity-50"
                >
                  {isSubVariantUploading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Upload className="w-3 h-3" />
                  )}
                  {isSubVariantUploading ? 'Uploading...' : 'Select Images'}
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((slotIdx) => {
                const imageUrl = newSubVariant.imagePreviews && newSubVariant.imagePreviews[slotIdx];
                
                return (
                  <div
                    key={slotIdx}
                    className={`border-2 border-dashed rounded-lg p-2 text-center h-28 flex flex-col items-center justify-center transition-colors ${
                      imageUrl 
                        ? 'border-gray-200 bg-gray-100' 
                        : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'
                    }`}
                  >
                    {imageUrl ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={imageUrl} 
                          alt={`Sub variant ${slotIdx + 1}`} 
                          className="w-full h-full object-contain pointer-events-none select-none"
                          draggable="false"
                        />
                        <button
                          type="button"
                          onClick={() => removeSubVariantImageFromForm(slotIdx)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-[10px] rounded">
                          {slotIdx + 1}
                        </span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                        <p className="text-[10px] text-gray-400 mt-1">Empty</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <input
              ref={subVariantFileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleSubVariantImageSelectForForm}
              disabled={isSubVariantUploading}
            />
            <p className="text-xs text-gray-400 mt-1">Select multiple images at once (up to 4 total)</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => addSubVariant(variantIndex)}
            className="px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#738769] transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Add Sub Variant
          </button>
          <button
            type="button"
            onClick={() => {
              setShowAddSubVariant(null);
              setNewSubVariant({
                name: '',
                color: '',
                regularPrice: '',
                discountPrice: '',
                stockQuantity: '',
                buyingPrice: '',
                packagingCost: defaultPackagingCost || '',
                deliveryCost: defaultDeliveryCost || '',
                costPerItem: 0,
                images: [null, null, null, null],
                imagePreviews: [null, null, null, null]
              });
            }}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20 mb-6">
      <div className="p-5 border-b border-[#72846A]/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#72846A]/10 rounded-lg">
            <Grid className="w-5 h-5 text-[#72846A]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#004767]">
              {getTypeLabel(variantType.type)} Variants
            </h3>
            <p className="text-xs text-gray-500">
              {variants.length} variant(s) • Type: {variantType.type}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemoveType}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5">
        {variants.length > 0 && (
          <div className="space-y-3 mb-4">
            {variants.map((variant, index) => {
              const filledCount = getFilledCount(variant.images);
              const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
              
              return (
                <div 
                  key={variant.id || index} 
                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#72846A]/40 transition-colors"
                >
                  <div 
                    className="flex items-center gap-3 p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleVariantExpand(index)}
                  >
                    <div className="flex-shrink-0">
                      {variant.imagePreviews && variant.imagePreviews[0] ? (
                        <img 
                          src={variant.imagePreviews[0]} 
                          alt={variant.name} 
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200 pointer-events-none"
                        />
                      ) : variant.color ? (
                        <div 
                          className="w-12 h-12 rounded-lg border-2 border-gray-200"
                          style={{ backgroundColor: variant.color }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{variant.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {!hasSubVariants ? (
                          <>
                            <span>৳{variant.regularPrice || 0}</span>
                            {variant.discountPrice > 0 && (
                              <span className="text-green-600">৳{variant.discountPrice}</span>
                            )}
                            <span className="text-gray-400">Stock: {variant.stockQuantity || 0}</span>
                          </>
                        ) : (
                          <span className="text-[#72846A]">Has {variant.subVariants.length} sub-variant(s)</span>
                        )}
                        <span className="text-gray-400">Images: {filledCount}/4</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeVariant(index);
                      }}
                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {expandedVariant === index && (
                    <div className="p-4 border-t border-gray-200 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Variant Name</label>
                          <input
                            type="text"
                            value={variant.name}
                            onChange={(e) => updateVariantField(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                          />
                        </div>

                        {variantType.type === 'color' && (
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                            <VariantColorPicker
                              color={variant.color || '#000000'}
                              onChange={(color) => updateVariantColor(index, color)}
                              onRemove={() => {}}
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
                          <input
                            type="number"
                            value={variant.regularPrice || ''}
                            onChange={(e) => updateVariantField(index, 'regularPrice', e.target.value)}
                            onWheel={(e) => e.target.blur()}
                            min="0"
                            step="1"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                            placeholder="0"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400">(Optional)</span></label>
                          <input
                            type="number"
                            value={variant.discountPrice || ''}
                            onChange={(e) => updateVariantField(index, 'discountPrice', e.target.value)}
                            onWheel={(e) => e.target.blur()}
                            min="0"
                            step="1"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                            placeholder="0"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Stock Quantity *</label>
                          <input
                            type="number"
                            value={variant.stockQuantity || ''}
                            onChange={(e) => updateVariantField(index, 'stockQuantity', e.target.value)}
                            onWheel={(e) => e.target.blur()}
                            min="0"
                            step="1"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                            placeholder="0"
                          />
                        </div>

                        {isAdminOrSuperAdmin && (
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span></label>
                            <input
                              type="number"
                              value={variant.buyingPrice || ''}
                              onChange={(e) => updateVariantField(index, 'buyingPrice', e.target.value)}
                              onWheel={(e) => e.target.blur()}
                              min="0"
                              step="1"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                              placeholder="0"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Packaging Cost (৳) <span className="text-gray-400">(Optional)</span></label>
                          <input
                            type="number"
                            value={variant.packagingCost || ''}
                            onChange={(e) => updateVariantField(index, 'packagingCost', e.target.value)}
                            onWheel={(e) => e.target.blur()}
                            min="0"
                            step="1"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                            placeholder="0"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Cost (৳) <span className="text-gray-400">(Optional)</span></label>
                          <input
                            type="number"
                            value={variant.deliveryCost || ''}
                            onChange={(e) => updateVariantField(index, 'deliveryCost', e.target.value)}
                            onWheel={(e) => e.target.blur()}
                            min="0"
                            step="1"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                            placeholder="0"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Cost Per Item (৳) <span className="text-gray-400 text-xs">(Auto-calculated)</span></label>
                          <input
                            type="text"
                            value={
                              variant.costPerItem !== undefined && variant.costPerItem !== null
                                ? variant.costPerItem
                                : 0
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
                            readOnly
                            disabled
                          />
                        </div>

                        <div className="md:col-span-2">
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs font-medium text-gray-700">Variant Images <span className="text-gray-400">(Max 4)</span></label>
                            {getFilledCount(variant.images) < 4 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const input = document.createElement('input');
                                  input.type = 'file';
                                  input.accept = 'image/jpeg,image/jpg,image/png,image/webp';
                                  input.multiple = true;
                                  input.onchange = (e) => {
                                    const files = e.target.files;
                                    if (files) updateVariantImages(index, Array.from(files));
                                  };
                                  input.click();
                                }}
                                disabled={isUploading}
                                className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1 disabled:opacity-50"
                              >
                                {isUploading ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <Upload className="w-3 h-3" />
                                )}
                                {isUploading ? 'Uploading...' : 'Add Images'}
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2">
                            {[0, 1, 2, 3].map((slotIdx) => {
                              const imageUrl = variant.imagePreviews && variant.imagePreviews[slotIdx];
                              const isDragging = draggedItem && 
                                draggedItem.variantIndex === index && 
                                draggedItem.imageIndex === slotIdx;
                              const isDragOver = dragOverItem && 
                                dragOverItem.variantIndex === index && 
                                dragOverItem.imageIndex === slotIdx && 
                                !isDragging;
                              
                              return (
                                <div 
                                  key={slotIdx}
                                  draggable={!!imageUrl}
                                  onDragStart={(e) => {
                                    if (imageUrl) {
                                      handleDragStart(e, index, slotIdx);
                                    } else {
                                      e.preventDefault();
                                    }
                                  }}
                                  onDragOver={(e) => {
                                    handleDragOver(e, index, slotIdx);
                                  }}
                                  onDragLeave={handleDragLeave}
                                  onDrop={(e) => {
                                    handleDrop(e, index, slotIdx);
                                  }}
                                  onDragEnd={handleDragEnd}
                                  style={{ 
                                    zIndex: isDragging ? 9999 : 'auto',
                                    position: 'relative'
                                  }}
                                  className={`transition-all duration-200 ${
                                    isDragging ? 'opacity-50 scale-95' : ''
                                  } ${
                                    isDragOver ? 'ring-2 ring-[#72846A] ring-offset-2 rounded-lg' : ''
                                  }`}
                                >
                                  {imageUrl ? (
                                    <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 h-32 hover:border-[#72846A] transition-colors cursor-grab active:cursor-grabbing bg-gray-100">
                                      <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10">
                                        <GripVertical className="w-3 h-3 text-white" />
                                      </div>
                                      <img 
                                        src={imageUrl} 
                                        alt={`Variant ${slotIdx + 1}`} 
                                        className="w-full h-full object-contain bg-gray-100 pointer-events-none select-none"
                                        draggable="false"
                                      />
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeVariantImage(index, slotIdx);
                                        }}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-20"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded z-10">
                                        {slotIdx + 1}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className={`border-2 border-dashed rounded-lg p-2 text-center h-32 flex flex-col items-center justify-center transition-colors ${
                                      isDragOver ? 'border-[#72846A] bg-pink-50' : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'
                                    }`}>
                                      <ImageIcon className="w-6 h-6 text-gray-400" />
                                      <p className="text-xs text-gray-600">Slot {slotIdx + 1}</p>
                                      <p className="text-[10px] text-gray-400 mt-1">Empty</p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <GripVertical className="w-3 h-3" />
                            Drag and drop to reorder images
                          </p>
                          {getFilledCount(variant.images) > 0 && (
                            <p className="text-xs text-[#72846A] mt-1">{getFilledCount(variant.images)} of 4 images uploaded</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-700">
                            Sub Variants {variant.subVariants && variant.subVariants.length > 0 && `(${variant.subVariants.length})`}
                          </h4>
                          <button
                            type="button"
                            onClick={() => setShowAddSubVariant(index)}
                            className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Add Sub Variant
                          </button>
                        </div>

                        {variant.subVariants && variant.subVariants.length > 0 ? (
                          <div className="space-y-2">
                            {variant.subVariants.map((subVariant, subIndex) => (
                              <SubVariantItem
                                key={subVariant.id || subIndex}
                                subVariant={subVariant}
                                index={subIndex}
                                variantIndex={index}
                                onUpdate={updateSubVariant}
                                onRemove={removeSubVariant}
                                isAdminOrSuperAdmin={isAdminOrSuperAdmin}
                                defaultPackagingCost={defaultPackagingCost}
                                defaultDeliveryCost={defaultDeliveryCost}
                                expandedSubVariant={expandedSubVariant}
                                setExpandedSubVariant={setExpandedSubVariant}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p className="text-sm text-gray-500">No sub variants added yet</p>
                            <p className="text-xs text-gray-400 mt-1">Click "Add Sub Variant" to add one</p>
                          </div>
                        )}

                        {showAddSubVariant === index && renderSubVariantForm(index)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {showAddVariant ? (
          <div className="border border-[#72846A]/40 rounded-lg p-4 bg-[#72846A]/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Variant Name *</label>
                <input
                  type="text"
                  value={newVariantName}
                  onChange={(e) => setNewVariantName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                  placeholder={`Enter ${getTypeLabel(variantType.type).toLowerCase()} name`}
                />
              </div>

              {variantType.type === 'color' && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                  <VariantColorPicker
                    color={newVariantColor}
                    onChange={setNewVariantColor}
                    onRemove={() => {}}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
                <input
                  type="number"
                  value={newVariantPrice}
                  onChange={(e) => setNewVariantPrice(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400">(Optional)</span></label>
                <input
                  type="number"
                  value={newVariantDiscountPrice}
                  onChange={(e) => setNewVariantDiscountPrice(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Stock Quantity *</label>
                <input
                  type="number"
                  value={newVariantStock}
                  onChange={(e) => setNewVariantStock(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                  placeholder="0"
                />
              </div>

              {isAdminOrSuperAdmin && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span></label>
                  <input
                    type="number"
                    value={newVariantBuyingPrice}
                    onChange={(e) => setNewVariantBuyingPrice(e.target.value)}
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    step="1"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                    placeholder="0"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Packaging Cost (৳) <span className="text-gray-400">(Optional)</span></label>
                <input
                  type="number"
                  value={newVariantPackagingCost}
                  onChange={(e) => setNewVariantPackagingCost(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                  placeholder={defaultPackagingCost || '0'}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Cost (৳) <span className="text-gray-400">(Optional)</span></label>
                <input
                  type="number"
                  value={newVariantDeliveryCost}
                  onChange={(e) => setNewVariantDeliveryCost(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                  placeholder={defaultDeliveryCost || '0'}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cost Per Item (Auto-calculated)</label>
                <input
                  type="text"
                  value={calculateVariantCost(newVariantBuyingPrice, newVariantPackagingCost, newVariantDeliveryCost)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
                  readOnly
                  disabled
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-gray-700">Variant Images <span className="text-gray-400">(Max 4, Optional)</span></label>
                  {getFilledCount(newVariantImages) < 4 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1 disabled:opacity-50"
                    >
                      {isUploading ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Upload className="w-3 h-3" />
                      )}
                      {isUploading ? 'Uploading...' : 'Select Images'}
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((slotIdx) => {
                    const imageUrl = newVariantImagePreviews[slotIdx];
                    
                    return (
                      <div
                        key={slotIdx}
                        className={`border-2 border-dashed rounded-lg p-2 text-center h-32 flex flex-col items-center justify-center transition-colors ${
                          imageUrl 
                            ? 'border-gray-200 bg-gray-100' 
                            : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'
                        }`}
                      >
                        {imageUrl ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={imageUrl} 
                              alt={`Variant ${slotIdx + 1}`} 
                              className="w-full h-full object-contain pointer-events-none select-none"
                              draggable="false"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewVariantImage(slotIdx)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded">
                              {slotIdx + 1}
                            </span>
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                            <p className="text-xs text-gray-600">Slot {slotIdx + 1}</p>
                            <p className="text-[10px] text-gray-400 mt-1">Empty</p>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={handleMultipleImageSelect}
                  disabled={isUploading}
                />
                <p className="text-xs text-gray-400 mt-1">Select multiple images at once (up to 4 total)</p>
                {getFilledCount(newVariantImages) > 0 && (
                  <p className="text-xs text-[#72846A] mt-1">{getFilledCount(newVariantImages)} of 4 images selected</p>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700">
                  Sub Variants {newVariantSubVariants.length > 0 && `(${newVariantSubVariants.length})`}
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddSubVariantInForm(!showAddSubVariantInForm)}
                  className="text-xs text-[#72846A] hover:text-[#738769] font-medium flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Sub Variant
                </button>
              </div>

              {newVariantSubVariants.length > 0 && (
                <div className="space-y-2 mb-3">
                  {newVariantSubVariants.map((subVariant, subIndex) => (
                    <div key={subVariant.id || subIndex} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm text-gray-900">{subVariant.name}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>৳{subVariant.regularPrice || 0}</span>
                            {subVariant.discountPrice > 0 && (
                              <span className="text-green-600">৳{subVariant.discountPrice}</span>
                            )}
                            <span className="text-gray-400">Stock: {subVariant.stockQuantity || 0}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSubVariantFromForm(subIndex)}
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddSubVariantInForm && renderSubVariantFormInAddVariant()}
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={handleAddVariant}
                className="px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#738769] transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-1" />
                Add Variant {newVariantSubVariants.length > 0 && `with ${newVariantSubVariants.length} sub-variant(s)`}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddVariant(false);
                  setNewVariantName('');
                  setNewVariantColor('#000000');
                  setNewVariantPrice('');
                  setNewVariantDiscountPrice('');
                  setNewVariantBuyingPrice('');
                  setNewVariantPackagingCost(defaultPackagingCost || '');
                  setNewVariantDeliveryCost(defaultDeliveryCost || '');
                  setNewVariantStock('');
                  setNewVariantImages([null, null, null, null]);
                  setNewVariantImagePreviews([null, null, null, null]);
                  setNewVariantSubVariants([]);
                  setShowAddSubVariantInForm(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddVariant(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#72846A] border-2 border-dashed border-[#72846A]/40 rounded-lg hover:bg-[#72846A]/5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add {getTypeLabel(variantType.type)} Variant
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================================
// ADD-ONES SECTION COMPONENT
// ============================================================
const AddOnesSection = ({ 
  addOnes, 
  onAddProduct, 
  onRemoveProduct,
  maxProducts = 5 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef(null);

  const searchProducts = async (query) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products?search=${encodeURIComponent(query)}&limit=10`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await response.json();
      
      if (data.success) {
        const filtered = data.data.filter(
          product => !addOnes.some(rp => rp._id === product._id)
        );
        setSearchResults(filtered);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search products');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(value);
    }, 500);
  };

  const handleAddProduct = (product) => {
    if (addOnes.length >= maxProducts) {
      toast.error(`Maximum ${maxProducts} add-ones allowed`);
      return;
    }
    onAddProduct(product);
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
    toast.success(`"${product.productName}" added as add-on`);
  };

  const handleRemoveProduct = (productId) => {
    onRemoveProduct(productId);
    toast.success('Add-on removed');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
      <div className="p-5 border-b border-[#72846A]/20">
        <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-[#72846A]" />
          Add-Ones <span className="text-gray-400 text-xs">(Optional, Max {maxProducts})</span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">Search and add products that can be purchased as add-ons with this product</p>
      </div>
      <div className="p-5">
        <div className="relative mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products by name, SKU, or brand..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
              disabled={addOnes.length >= maxProducts}
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#72846A] animate-spin" />
            )}
          </div>
          
          {showResults && searchResults.length > 0 && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map(product => (
                <div
                  key={product._id}
                  onClick={() => handleAddProduct(product)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-pink-50 transition-colors text-left border-b border-gray-100 last:border-0 cursor-pointer"
                >
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0].url} 
                      alt={product.productName}
                      className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.productName}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>৳{product.regularPrice}</span>
                      {product.brand && <span>• {product.brand}</span>}
                      {product.skuCode && <span>• {product.skuCode}</span>}
                    </div>
                  </div>
                  <div className="p-1 text-[#72846A] hover:bg-pink-100 rounded">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {showResults && searchResults.length === 0 && searchTerm.length >= 2 && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center">
              <p className="text-sm text-gray-500">No products found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

        {addOnes.length > 0 ? (
          <div className="space-y-2">
            {addOnes.map((product, index) => (
              <div 
                key={product._id || index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#72846A]/40 transition-colors"
              >
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[0].url} 
                    alt={product.productName}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.productName}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>৳{product.regularPrice}</span>
                    {product.brand && <span>• {product.brand}</span>}
                    {product.skuCode && <span>• {product.skuCode}</span>}
                    <span className="text-gray-400">• Added as add-on</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(product._id)}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <LinkIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No add-ones added yet</p>
            <p className="text-xs text-gray-400 mt-1">Search and add up to {maxProducts} add-on products</p>
          </div>
        )}
        
        {addOnes.length > 0 && (
          <p className="text-xs text-gray-400 mt-3 text-center">
            {addOnes.length} of {maxProducts} add-ones added
          </p>
        )}
      </div>
    </div>
  );
};

// ============================================================
// IMAGE UPLOAD HELPERS
// ============================================================

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
        
        const isTransparent = file.type === 'image/png' || 
                             file.type === 'image/webp' || 
                             file.type === 'image/gif';
        
        if (isTransparent) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        let outputFormat = 'image/jpeg';
        let quality = 0.4;
        
        if (isTransparent) {
          outputFormat = 'image/png';
          quality = 0.9;
        } else {
          if (file.size > 5 * 1024 * 1024) quality = 0.25;
          else if (file.size > 2 * 1024 * 1024) quality = 0.3;
          else if (file.size > 1 * 1024 * 1024) quality = 0.35;
          else if (file.size > 500 * 1024) quality = 0.45;
          else quality = 0.55;
        }
        
        if (outputFormat === 'image/png') {
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name, {
                type: 'image/png',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            'image/png'
          );
        } else {
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
        }
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
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
  
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

const uploadVideoToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
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
    console.error('Cloudinary video upload error:', error);
    throw error;
  }
};

const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// ============================================================
// Image Slot Picker Modal
// ============================================================
const ImageSlotPickerModal = ({ isOpen, onClose, onUploadFromDevice, onChooseFromLibrary }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-[#72846A]/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#004767]">Add Image to Slot</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mb-6">Choose how you want to add an image to this slot:</p>
        
        <div className="space-y-3">
          <button
            onClick={onUploadFromDevice}
            className="w-full flex items-center gap-4 px-4 py-4 bg-white border-2 border-[#72846A]/20 rounded-xl hover:border-[#72846A] hover:bg-[#72846A]/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-[#72846A]/10 flex items-center justify-center group-hover:bg-[#72846A]/20 transition-colors">
              <Upload className="w-6 h-6 text-[#72846A]" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-[#004767]">Upload from Device</p>
              <p className="text-xs text-gray-400">Select an image from your computer</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#72846A] transition-colors" />
          </button>
          
          <button
            onClick={onChooseFromLibrary}
            className="w-full flex items-center gap-4 px-4 py-4 bg-white border-2 border-[#72846A]/20 rounded-xl hover:border-[#72846A] hover:bg-[#72846A]/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-[#72846A]/10 flex items-center justify-center group-hover:bg-[#72846A]/20 transition-colors">
              <ImageIcon className="w-6 h-6 text-[#72846A]" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-[#004767]">Choose from Media Library</p>
              <p className="text-xs text-gray-400">Select an image from your media library</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#72846A] transition-colors" />
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingSku, setIsGeneratingSku] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const [showFaqs, setShowFaqs] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [showCustomUnit, setShowCustomUnit] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [originalProduct, setOriginalProduct] = useState(null);
  const [originalBarcode, setOriginalBarcode] = useState(null);
  const [isValidatingSku, setIsValidatingSku] = useState(false);
  const [isSkuUnique, setIsSkuUnique] = useState(null);
  const [ratingHover, setRatingHover] = useState(0);
  const skuValidateTimeoutRef = useRef(null);
  const [productTags, setProductTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  
  // Media Library States
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [showSingleMediaPicker, setShowSingleMediaPicker] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [showSlotPicker, setShowSlotPicker] = useState(false);
  const [slotPickerIndex, setSlotPickerIndex] = useState(null);
  
  // Video Media Library States
  const [showVideoMediaPicker, setShowVideoMediaPicker] = useState(false);
  
  // ========== SLUG STATE ==========
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [isSlugAvailable, setIsSlugAvailable] = useState(null);
  const slugCheckTimeoutRef = useRef(null);

  // Video states
  const [videoType, setVideoType] = useState('upload');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoUpload, setVideoUpload] = useState({
    file: null,
    preview: null,
    uploading: false,
    error: '',
    url: null,
    publicId: null
  });
  const videoInputRef = useRef(null);

  // ========== VARIANT STATES ==========
  const [variantTypes, setVariantTypes] = useState([]);
  const [newVariantType, setNewVariantType] = useState('');
  const [showAddVariantType, setShowAddVariantType] = useState(false);
  const [customVariantTypeName, setCustomVariantTypeName] = useState('');

  // ========== ADD-ONES STATE ==========
  const [addOnes, setAddOnes] = useState([]);

  // Refs to track if editor content has been set
  const shortDescContentSet = useRef(false);
  const fullDescContentSet = useRef(false);
  const deliveryInfoContentSet = useRef(false);

  const fileInputRefs = useRef([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // ============================================================
  // FORM DATA
  // ============================================================
  const [formData, setFormData] = useState({
    productName: '',
    slug: '',
    skuCode: '',
    shortDescription: '',
    fullDescription: '',
    category: '',
    subcategory: '',
    childSubcategory: '',
    brand: '',
    stockQuantity: '',
    stockAlertQuantity: '',
    regularPrice: '',
    costPerItem: '',
    discountPrice: '',
    buyingPrice: '',
    packagingCost: '',
    deliveryCost: '',
    unit: 'pcs',
    customUnit: '',
    colors: [],
    deliveryInfo: '',
    additionalInfo: [],
    tags: [],
    isFeatured: false,
    showOnBanner: false,
    rating: 0,
    faqs: [],
    videoUrl: '',
    videoPublicId: '',
    videoType: 'upload',
    metaSettings: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    }
  });

  const [productImages, setProductImages] = useState([
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null },
    { id: null, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null }
  ]);

  const [errors, setErrors] = useState({});

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxFileSize = 5 * 1024 * 1024;

  const shortDescEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: '',
    onUpdate: ({ editor }) => setFormData(prev => ({ ...prev, shortDescription: editor.getHTML() })),
    immediatelyRender: false,
    editable: true,
  });

  const fullDescEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: '',
    onUpdate: ({ editor }) => setFormData(prev => ({ ...prev, fullDescription: editor.getHTML() })),
    immediatelyRender: false,
    editable: true,
  });

  const deliveryInfoEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: '',
    onUpdate: ({ editor }) => setFormData(prev => ({ ...prev, deliveryInfo: editor.getHTML() })),
    immediatelyRender: false,
    editable: true,
  });

  // ============================================================
  // COST PER ITEM AUTO-CALCULATION
  // ============================================================
  // Simplified: total = buying + packaging + delivery
  // Only runs when at least one of the three source fields has a value.
  // This prevents the initial empty formData from overwriting the DB value.
  const calculateCostPerItem = useCallback(() => {
    const buyingPrice = Number(formData.buyingPrice) || 0;
    const packagingCost = Number(formData.packagingCost) || 0;
    const deliveryCost = Number(formData.deliveryCost) || 0;

    const total = buyingPrice + packagingCost + deliveryCost;

    setFormData(prev => {
      if (prev.costPerItem === total) return prev;
      return { ...prev, costPerItem: total };
    });
  }, [
    formData.buyingPrice,
    formData.packagingCost,
    formData.deliveryCost
  ]);

  useEffect(() => {
    // Only calculate when at least one pricing field has a value.
    // This prevents the initial empty state from overwriting
    // the costPerItem value loaded from the database.
    const hasPricingData =
      formData.buyingPrice !== '' ||
      formData.packagingCost !== '' ||
      formData.deliveryCost !== '';

    if (hasPricingData) {
      calculateCostPerItem();
    }
  }, [
    formData.buyingPrice,
    formData.packagingCost,
    formData.deliveryCost,
    calculateCostPerItem
  ]);

  // ============================================================
  // FAQ HANDLERS
  // ============================================================
  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const updateFaq = (index, field, value) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFormData(prev => ({ ...prev, faqs: updatedFaqs }));
  };

  const removeFaq = (index) => {
    const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, faqs: updatedFaqs }));
  };

  // ============================================================
  // VARIANT HANDLERS
  // ============================================================
  const addVariantType = () => {
    let typeName = newVariantType;
    
    if (newVariantType === 'custom') {
      if (!customVariantTypeName.trim()) {
        toast.error('Please enter a custom variant type name');
        return;
      }
      typeName = customVariantTypeName.trim().toLowerCase();
    }

    if (variantTypes.some(vt => vt.type === typeName)) {
      toast.error(`Variant type "${typeName}" already exists`);
      return;
    }

    setVariantTypes([
      ...variantTypes,
      {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: typeName,
        variants: []
      }
    ]);

    setNewVariantType('');
    setCustomVariantTypeName('');
    setShowAddVariantType(false);
    toast.success(`Variant type "${typeName}" added`);
  };

  const removeVariantType = (index) => {
    if (confirm('Remove this variant type and all its variants?')) {
      const updatedTypes = variantTypes.filter((_, i) => i !== index);
      setVariantTypes(updatedTypes);
      toast.success('Variant type removed');
    }
  };

  const updateVariantTypeVariants = (index, variants) => {
    const updatedTypes = [...variantTypes];
    updatedTypes[index] = { ...updatedTypes[index], variants };
    setVariantTypes(updatedTypes);
  };

  // ============================================================
  // SLUG UNIQUENESS CHECK
  // ============================================================
  const checkSlugUniqueness = async (slug) => {
    if (!slug || slug.length < 2) {
      setIsSlugAvailable(null);
      return;
    }

    if (originalProduct?.slug === slug) {
      setIsSlugAvailable(true);
      return;
    }

    setIsCheckingSlug(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/check-slug/${encodeURIComponent(slug)}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await response.json();
      setIsSlugAvailable(data.data?.isAvailable !== false);
    } catch (error) {
      console.error('Error checking slug:', error);
      setIsSlugAvailable(null);
    } finally {
      setIsCheckingSlug(false);
    }
  };

  // ============================================================
  // SLUG EFFECTS
  // ============================================================
  useEffect(() => {
    if (formData.productName && !isSlugManuallyEdited) {
      const generatedSlug = formData.productName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.productName, isSlugManuallyEdited]);

  useEffect(() => {
    if (slugCheckTimeoutRef.current) {
      clearTimeout(slugCheckTimeoutRef.current);
    }
    
    if (formData.slug && isSlugManuallyEdited) {
      slugCheckTimeoutRef.current = setTimeout(() => {
        checkSlugUniqueness(formData.slug);
      }, 500);
    } else if (formData.slug && !isSlugManuallyEdited) {
      checkSlugUniqueness(formData.slug);
    } else {
      setIsSlugAvailable(null);
    }
    
    return () => {
      if (slugCheckTimeoutRef.current) {
        clearTimeout(slugCheckTimeoutRef.current);
      }
    };
  }, [formData.slug, isSlugManuallyEdited]);

  // ============================================================
  // EDITOR EFFECTS
  // ============================================================
  useEffect(() => {
    if (shortDescEditor && originalProduct?.shortDescription && !shortDescContentSet.current) {
      const timer = setTimeout(() => {
        shortDescEditor.commands.setContent(originalProduct.shortDescription);
        shortDescContentSet.current = true;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [shortDescEditor, originalProduct?.shortDescription]);

  useEffect(() => {
    if (fullDescEditor && originalProduct?.fullDescription && !fullDescContentSet.current) {
      const timer = setTimeout(() => {
        fullDescEditor.commands.setContent(originalProduct.fullDescription);
        fullDescContentSet.current = true;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [fullDescEditor, originalProduct?.fullDescription]);

  useEffect(() => {
    if (deliveryInfoEditor && originalProduct?.deliveryInfo && !deliveryInfoContentSet.current) {
      const timer = setTimeout(() => {
        deliveryInfoEditor.commands.setContent(originalProduct.deliveryInfo);
        deliveryInfoContentSet.current = true;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [deliveryInfoEditor, originalProduct?.deliveryInfo]);

  useEffect(() => {
    setIsMounted(true);
    fetchBrands();
    fetchCategories();
    fetchTags();
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    } else {
      toast.error('No product ID provided');
      router.push('/authorize/all-products');
    }
  }, [productId]);

  useEffect(() => {
    if (formData.category) {
      fetchSubcategories(formData.category);
    } else {
      setSubcategories([]);
      setFormData(prev => ({ ...prev, subcategory: '', childSubcategory: '' }));
      setChildSubcategories([]);
    }
  }, [formData.category]);

  useEffect(() => {
    if (formData.category && formData.subcategory) {
      fetchChildSubcategories(formData.category, formData.subcategory);
    } else {
      setChildSubcategories([]);
      setFormData(prev => ({ ...prev, childSubcategory: '' }));
    }
  }, [formData.subcategory]);

  useEffect(() => {
    if (skuValidateTimeoutRef.current) clearTimeout(skuValidateTimeoutRef.current);
    skuValidateTimeoutRef.current = setTimeout(() => {
      validateSku(formData.skuCode);
    }, 500);
    return () => { if (skuValidateTimeoutRef.current) clearTimeout(skuValidateTimeoutRef.current); };
  }, [formData.skuCode]);

  // ============================================================
  // FETCH FUNCTIONS
  // ============================================================
  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/brands`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setBrands(data.data);
    } catch (error) { console.error('Error fetching brands:', error); }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setCategories(data.data);
    } catch (error) { toast.error('Failed to fetch categories'); }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories/${categoryId}/subcategories`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setSubcategories(data.data.subcategories);
      else setSubcategories([]);
    } catch (error) { setSubcategories([]); }
  };

  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories/${categoryId}/subcategories/${subcategoryId}/children`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setChildSubcategories(data.data.children);
      else setChildSubcategories([]);
    } catch (error) { setChildSubcategories([]); }
  };

  const fetchTags = async () => {
    setIsLoadingTags(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/tags?isActive=true`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProductTags(data.data);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast.error('Failed to fetch tags');
    } finally {
      setIsLoadingTags(false);
    }
  };

  const validateSku = async (skuValue) => {
    if (!skuValue || skuValue.length < 3) {
      setIsSkuUnique(null);
      return;
    }
    if (originalProduct?.skuCode === skuValue) {
      setIsSkuUnique(true);
      return;
    }
    setIsValidatingSku(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/validate-sku/${skuValue}?excludeId=${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setIsSkuUnique(data.data.isUnique);
        if (!data.data.isUnique) setErrors(prev => ({ ...prev, skuCode: data.data.message }));
        else setErrors(prev => ({ ...prev, skuCode: null }));
      }
    } catch (error) { console.error('SKU validation error:', error); }
    finally { setIsValidatingSku(false); }
  };

  const generateSkuFromBackend = async () => {
    setIsGeneratingSku(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/generate-sku`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, skuCode: data.data.skuCode }));
        toast.success('SKU generated successfully');
      } else toast.error(data.error || 'Failed to generate SKU');
    } catch (error) { toast.error('Failed to generate SKU'); }
    finally { setIsGeneratingSku(false); }
  };

  const handleBrandAdded = (newBrand) => {
    setBrands(prev => [...prev, newBrand]);
    setFormData(prev => ({ ...prev, brand: newBrand.name }));
  };

  // ============================================================
  // ADD-ONES HANDLERS
  // ============================================================
  const handleAddAddOne = (product) => {
    if (addOnes.length >= 5) {
      toast.error('Maximum 5 add-ones allowed');
      return;
    }
    setAddOnes([...addOnes, product]);
  };

  const handleRemoveAddOne = (productId) => {
    setAddOnes(addOnes.filter(p => p._id !== productId));
  };

  // ============================================================
  // VIDEO HANDLERS
  // ============================================================
  const handleVideoFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (videoUpload.preview?.startsWith('blob:')) {
      URL.revokeObjectURL(videoUpload.preview);
    }

    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    const maxVideoSize = 100 * 1024 * 1024;

    if (!allowedVideoTypes.includes(file.type)) {
      setVideoUpload({ ...videoUpload, error: 'Invalid format. Allowed: MP4, WebM, OGG, MOV' });
      toast.error('Invalid video format');
      return;
    }

    if (file.size > maxVideoSize) {
      setVideoUpload({ ...videoUpload, error: `File too large. Max: 100MB` });
      toast.error('Video too large. Max 100MB');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setVideoUpload({
      file: file,
      preview: previewUrl,
      uploading: true,
      error: '',
      url: null,
      publicId: null
    });

    try {
      const { url, publicId } = await uploadVideoToCloudinary(file);
      setVideoUpload({
        file: file,
        preview: previewUrl,
        uploading: false,
        error: '',
        url: url,
        publicId: publicId
      });
      setFormData(prev => ({ ...prev, videoUrl: url, videoPublicId: publicId, videoType: 'upload' }));
      toast.success('Video uploaded successfully');
    } catch (error) {
      setVideoUpload({
        ...videoUpload,
        error: 'Failed to upload video',
        uploading: false,
        preview: null,
        file: null
      });
      toast.error('Failed to upload video');
    }
  };

  const handleYoutubeUrlChange = (url) => {
    setYoutubeUrl(url);
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      setFormData(prev => ({ ...prev, videoUrl: embedUrl, videoType: 'youtube' }));
      setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
      toast.success('YouTube link added successfully');
    } else if (url === '') {
      setFormData(prev => ({ ...prev, videoUrl: '', videoType: 'upload' }));
    }
  };

  const removeVideo = () => {
    if (videoUpload.preview?.startsWith('blob:')) {
      URL.revokeObjectURL(videoUpload.preview);
    }
    setVideoUpload({ file: null, preview: null, uploading: false, error: '', url: null, publicId: null });
    setYoutubeUrl('');
    setFormData(prev => ({ ...prev, videoUrl: '', videoPublicId: '', videoType: 'upload' }));
    if (videoInputRef.current) videoInputRef.current.value = '';
    toast.success('Video removed');
  };

  const getVideoPreview = () => {
    if (videoUpload.url) {
      return (
        <div className="relative">
          <video src={videoUpload.url} className="w-full rounded-lg" controls />
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    } else if (youtubeUrl && getYouTubeVideoId(youtubeUrl)) {
      const videoId = getYouTubeVideoId(youtubeUrl);
      return (
        <div className="relative">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full rounded-lg aspect-video"
            allowFullScreen
          />
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }
    return null;
  };

  // ============================================================
  // MEDIA LIBRARY HANDLERS - IMAGES
  // ============================================================
  const handleMediaLibrarySelect = (selectedItems) => {
    const emptySlotIndex = productImages.findIndex(img => !img.url && !img.uploading);
    
    if (emptySlotIndex === -1) {
      toast.error('All image slots are filled. Please remove some images first.');
      return;
    }

    const updatedImages = [...productImages];
    selectedItems.forEach((item, idx) => {
      const slotIndex = emptySlotIndex + idx;
      if (slotIndex < 6) {
        updatedImages[slotIndex] = {
          ...updatedImages[slotIndex],
          url: item.url,
          publicId: item.public_id,
          preview: item.url,
          uploading: false,
          isNew: true,
          file: null,
          error: '',
          uploadAborted: false,
          uploadBatchId: null,
          id: `media_${Date.now()}_${idx}`
        };
      }
    });

    setProductImages(updatedImages);
    toast.success(`${selectedItems.length} image(s) added from media library`);
  };

  const handleSingleMediaLibrarySelect = (selectedItems) => {
    if (selectedItems.length === 0) {
      setShowSingleMediaPicker(false);
      setSelectedSlotIndex(null);
      return;
    }
    
    const item = selectedItems[0];
    const index = selectedSlotIndex;
    
    if (index === null || index === undefined) {
      setShowSingleMediaPicker(false);
      setSelectedSlotIndex(null);
      return;
    }
    
    if (productImages[index].url) {
      toast.error('This slot already has an image. Please remove it first.');
      setShowSingleMediaPicker(false);
      setSelectedSlotIndex(null);
      return;
    }

    const updatedImages = [...productImages];
    updatedImages[index] = {
      ...updatedImages[index],
      url: item.url,
      publicId: item.public_id,
      preview: item.url,
      uploading: false,
      isNew: true,
      file: null,
      error: '',
      uploadAborted: false,
      uploadBatchId: null,
      id: `media_${Date.now()}_${index}`
    };

    setProductImages(updatedImages);
    toast.success('Image added from media library');
    
    setShowSingleMediaPicker(false);
    setSelectedSlotIndex(null);
  };

  const handleSlotClick = (index) => {
    if (productImages[index].url) {
      return;
    }
    
    setSlotPickerIndex(index);
    setShowSlotPicker(true);
  };

  const handleUploadFromDevice = () => {
    const index = slotPickerIndex;
    setShowSlotPicker(false);
    setSlotPickerIndex(null);
    
    setTimeout(() => {
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index].click();
      }
    }, 100);
  };

  const handleChooseFromLibrary = () => {
    const index = slotPickerIndex;
    setShowSlotPicker(false);
    setSelectedSlotIndex(index);
    setShowSingleMediaPicker(true);
  };

  // ============================================================
  // MEDIA LIBRARY HANDLERS - VIDEOS
  // ============================================================
  const handleVideoMediaLibrarySelect = (selectedItems) => {
    if (selectedItems.length === 0) {
      setShowVideoMediaPicker(false);
      return;
    }
    
    const item = selectedItems[0];
    
    if (item.resource_type !== 'video') {
      toast.error('Please select a video file from the media library');
      setShowVideoMediaPicker(false);
      return;
    }
    
    if (videoUpload.url) {
      toast.error('A video is already added. Please remove it first.');
      setShowVideoMediaPicker(false);
      return;
    }

    setVideoUpload({
      file: null,
      preview: item.url,
      uploading: false,
      error: '',
      url: item.url,
      publicId: item.public_id
    });
    
    setFormData(prev => ({ 
      ...prev, 
      videoUrl: item.url, 
      videoPublicId: item.public_id, 
      videoType: 'upload' 
    }));
    
    toast.success('Video added from media library');
    setShowVideoMediaPicker(false);
  };

  // ============================================================
  // IMAGE HANDLERS
  // ============================================================
  const validateImageFile = (file) => {
    if (!allowedImageTypes.includes(file.type)) return { valid: false, message: `Invalid format. Allowed: JPG, PNG, WebP, GIF` };
    if (file.size > maxFileSize) return { valid: false, message: `File too large. Max: 5MB` };
    return { valid: true };
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setShowSlotPicker(false);
    setShowSingleMediaPicker(false);
    setShowMediaPicker(false);
    setSlotPickerIndex(null);
    setSelectedSlotIndex(null);

    if (productImages[index].preview?.startsWith('blob:')) {
      URL.revokeObjectURL(productImages[index].preview);
    }

    const validation = validateImageFile(file);
    if (!validation.valid) {
      const updatedImages = [...productImages];
      updatedImages[index] = { ...updatedImages[index], error: validation.message };
      setProductImages(updatedImages);
      toast.error(`Image ${index + 1}: ${validation.message}`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const batchId = Date.now();
    const imageId = `new_${batchId}_${index}`;
    
    setProductImages(prev => {
      const updated = [...prev];
      updated[index] = {
        id: imageId,
        file: file,
        preview: previewUrl,
        error: '',
        uploading: true,
        url: null,
        publicId: null,
        isNew: true,
        uploadAborted: false,
        uploadBatchId: batchId
      };
      return updated;
    });

    try {
      const { url, publicId } = await uploadToCloudinary(file);
      setProductImages(prev => {
        const updated = [...prev];
        if (updated[index] && updated[index].uploadBatchId === batchId && !updated[index].uploadAborted) {
          updated[index] = { ...updated[index], url, publicId, uploading: false };
        }
        return updated;
      });
      toast.success(`Image ${index + 1} uploaded successfully`);
    } catch (error) {
      setProductImages(prev => {
        const updated = [...prev];
        if (updated[index] && updated[index].uploadBatchId === batchId) {
          updated[index] = { ...updated[index], error: 'Failed to upload image', uploading: false, preview: null, file: null, isNew: false };
        }
        return updated;
      });
      toast.error(`Failed to upload image ${index + 1}`);
    }
  };

  const handleMultipleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
   
    setShowMediaPicker(false);
    setShowSlotPicker(false);
    
    const currentImagesCount = productImages.filter(img => img.url !== null || img.uploading).length;
    const availableSlots = 6 - currentImagesCount;
    if (files.length > availableSlots) {
      toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
      if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
      return;
    }
    
    const emptySlots = [];
    for (let i = 0; i < productImages.length; i++) {
      if (!productImages[i].url && !productImages[i].uploading && !productImages[i].preview) emptySlots.push(i);
    }
    
    if (files.length > emptySlots.length) {
      toast.error(`Only ${emptySlots.length} slots available. Please remove some images first.`);
      if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
      return;
    }
    
    const batchId = Date.now();
    for (let i = 0; i < files.length && i < emptySlots.length; i++) {
      const file = files[i];
      const slotIndex = emptySlots[i];
      
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast.error(`Image ${i + 1}: ${validation.message}`);
        continue;
      }
      
      const previewUrl = URL.createObjectURL(file);
      const imageId = `new_${batchId}_${slotIndex}`;
      
      setProductImages(prev => {
        const updated = [...prev];
        updated[slotIndex] = {
          id: imageId,
          file: file,
          preview: previewUrl,
          error: '',
          uploading: true,
          url: null,
          publicId: null,
          isNew: true,
          uploadAborted: false,
          uploadBatchId: batchId
        };
        return updated;
      });
      
      (async () => {
        try {
          const { url, publicId } = await uploadToCloudinary(file);
          setProductImages(prev => {
            const updated = [...prev];
            if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId && !updated[slotIndex].uploadAborted) {
              updated[slotIndex] = { ...updated[slotIndex], url, publicId, uploading: false };
            }
            return updated;
          });
          toast.success(`Image uploaded to slot ${slotIndex + 1}`);
        } catch (error) {
          setProductImages(prev => {
            const updated = [...prev];
            if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId) {
              updated[slotIndex] = { ...updated[slotIndex], error: 'Failed to upload image', uploading: false, preview: null, file: null, isNew: false };
            }
            return updated;
          });
        }
      })();
    }
    
    if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...productImages];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setProductImages(updatedImages);
  };

  const handleDragStart = (index) => {
    if (productImages[index].preview && !productImages[index].uploading) setDraggedIndex(index);
  };

  const handleDragOverWithFeedback = (event, index) => {
    event.preventDefault();
    if (productImages[index].preview && !productImages[index].uploading) setDragOverIndex(index);
  };

  const handleDragLeave = () => setDragOverIndex(null);

  const handleDropWithFeedback = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      setDraggedIndex(null);
      return;
    }
    if (!productImages[draggedIndex]?.uploading && !productImages[dropIndex]?.uploading) moveImage(draggedIndex, dropIndex);
    else toast.error('Cannot reorder images while uploading');
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const removeImage = (index) => {
    const imageToRemove = productImages[index];
    
    setProductImages(prev => {
      const updated = [...prev];
      if (updated[index]) updated[index].uploadAborted = true;
      return updated;
    });
    
    if (!imageToRemove.isNew && imageToRemove.publicId) {
      setImagesToDelete(prev => [...prev, imageToRemove.publicId]);
    }
    
    if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) URL.revokeObjectURL(imageToRemove.preview);
    
    const updatedImages = [...productImages];
    updatedImages[index] = { 
      id: null, file: null, preview: null, error: '', url: null, publicId: null, 
      uploading: false, isNew: false, uploadAborted: false, uploadBatchId: null
    };
    setProductImages(updatedImages);
    if (fileInputRefs.current[index]) fileInputRefs.current[index].value = '';
    toast.success(`Image removed from slot ${index + 1}`);
  };

  // ============================================================
  // FORM HANDLERS
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSlugChange = (e) => {
    const { value } = e.target;
    setIsSlugManuallyEdited(true);
    setFormData(prev => ({ ...prev, slug: value }));
    if (errors.slug) setErrors(prev => ({ ...prev, slug: null }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === '' ? '' : parseFloat(value) }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleUnitChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, unit: value }));
    setShowCustomUnit(value === 'other');
    if (value !== 'other') setFormData(prev => ({ ...prev, customUnit: '' }));
  };

  const handleTagSelect = (tagId) => {
    if (formData.tags && formData.tags.length === 1 && formData.tags[0] === tagId) {
      setFormData(prev => ({ ...prev, tags: [] }));
    } else {
      setFormData(prev => ({ ...prev, tags: [tagId] }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const clearRating = () => {
    setFormData(prev => ({ ...prev, rating: 0 }));
  };

  const addAdditionalInfo = () => {
    setFormData(prev => ({ ...prev, additionalInfo: [...prev.additionalInfo, { fieldName: '', fieldValue: '' }] }));
  };

  const updateAdditionalInfo = (index, field, value) => {
    const updatedInfo = [...formData.additionalInfo];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
  };

  const removeAdditionalInfo = (index) => {
    const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    const keywordsToAdd = keywordInput.split(',').map(k => k.trim()).filter(k => k !== '');
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd] } }));
    setKeywordInput('');
  };

  const removeKeyword = (indexToRemove) => {
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: prev.metaSettings.metaKeywords.filter((_, i) => i !== indexToRemove) } }));
  };

  const handleMetaChange = (field, value) => {
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, [field]: value } }));
  };

  // ============================================================
  // FETCH PRODUCT
  // ============================================================
  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${productId}`, { 
        headers: { 'Authorization': `Bearer ${token}` } 
      });
      const data = await response.json();
      
      if (data.success) {
        const product = data.data.product;
        setOriginalProduct(product);
        setOriginalBarcode(product.barcode || '');
        
        // Handle video data
        if (product.videoUrl) {
          if (product.videoType === 'youtube') {
            setVideoType('youtube');
            const embedMatch = product.videoUrl.match(/embed\/([^?]+)/);
            if (embedMatch) {
              setYoutubeUrl(`https://www.youtube.com/watch?v=${embedMatch[1]}`);
            } else {
              setYoutubeUrl(product.videoUrl);
            }
          } else {
            setVideoType('upload');
            setVideoUpload({
              file: null,
              preview: null,
              uploading: false,
              error: '',
              url: product.videoUrl,
              publicId: product.videoPublicId || ''
            });
          }
        }
        
        // Extract tag IDs from populated tags
        let tagIds = [];
        if (product.tags && Array.isArray(product.tags)) {
          tagIds = product.tags.map(tag => {
            if (typeof tag === 'string') return tag;
            if (tag && typeof tag === 'object' && tag._id) {
              return tag._id;
            }
            return tag;
          });
        }
        
        // Extract FAQ data
        const faqData = product.faqs || [];
        
        // ============================================================
        // LOAD VARIANT DATA - PRESERVE DATABASE IDs
        // ============================================================
        let variantData = [];
        let hasVariants = false;
        
        if (product.variantTypes && product.variantTypes.length > 0) {
          hasVariants = true;
          
          variantData = product.variantTypes.map((vt) => ({
            id: vt.id || `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            type: vt.type,
            variants: vt.variants ? vt.variants.map((v) => ({
              id: v.id || `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
              name: v.name || '',
              color: v.color || '',
              regularPrice: v.regularPrice || 0,
              discountPrice: v.discountPrice || 0,
              buyingPrice: v.buyingPrice || 0,
              packagingCost: v.packagingCost || 0,
              deliveryCost: v.deliveryCost || 0,
              costPerItem: v.costPerItem || 0,
              stockQuantity: v.stockQuantity || 0,
              images: v.images || [null, null, null, null],
              imagePreviews: v.imagePreviews || [null, null, null, null],
              subVariants: v.subVariants ? v.subVariants.map((sv) => ({
                id: sv.id || `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
                name: sv.name || '',
                color: sv.color || '',
                regularPrice: sv.regularPrice || 0,
                discountPrice: sv.discountPrice || 0,
                buyingPrice: sv.buyingPrice || 0,
                packagingCost: sv.packagingCost || 0,
                deliveryCost: sv.deliveryCost || 0,
                costPerItem: sv.costPerItem || 0,
                stockQuantity: sv.stockQuantity || 0,
                images: sv.images || [null, null, null, null],
                imagePreviews: sv.imagePreviews || [null, null, null, null]
              })) : []
            })) : []
          }));
        }
        
        setVariantTypes(variantData);
        
        // Load add-ones
        let addOnesData = [];
        if (product.addOnes && Array.isArray(product.addOnes)) {
          addOnesData = product.addOnes.map(item => {
            if (item.productId && typeof item.productId === 'object') {
              return {
                _id: item.productId._id || item._id,
                productName: item.productName || item.productId.productName,
                regularPrice: item.regularPrice || item.productId.regularPrice,
                discountPrice: item.discountPrice || item.productId.discountPrice,
                images: item.images || item.productId.images || [],
                brand: item.brand || item.productId.brand || '',
                skuCode: item.skuCode || item.productId.skuCode || '',
                stockQuantity: item.stockQuantity || item.productId.stockQuantity || 0,
                slug: item.slug || item.productId.slug || ''
              };
            }
            return {
              _id: item.productId || item._id,
              productName: item.productName,
              regularPrice: item.regularPrice,
              discountPrice: item.discountPrice,
              images: item.images || [],
              brand: item.brand || '',
              skuCode: item.skuCode || '',
              stockQuantity: item.stockQuantity || 0,
              slug: item.slug || ''
            };
          });
        }
        setAddOnes(addOnesData);
        
        // Set all form data
        // ✅ FIX: Use `!== undefined && !== null` checks so 0 values are preserved
        const newFormData = {
          productName: product.productName || '',
          slug: product.slug || '',
          skuCode: product.skuCode || '',
          shortDescription: product.shortDescription || '',
          fullDescription: product.fullDescription || '',
          category: product.category?._id || product.category || '',
          subcategory: product.subcategory || '',
          childSubcategory: product.childSubcategory || '',
          brand: product.brand || '',
          stockQuantity: product.stockQuantity || '',
          stockAlertQuantity: product.stockAlertQuantity || '',
          regularPrice: product.regularPrice || '',

          buyingPrice:
            product.buyingPrice !== undefined && product.buyingPrice !== null
              ? product.buyingPrice
              : '',

          packagingCost:
            product.packagingCost !== undefined && product.packagingCost !== null
              ? product.packagingCost
              : '',

          deliveryCost:
            product.deliveryCost !== undefined && product.deliveryCost !== null
              ? product.deliveryCost
              : '',

          costPerItem:
            product.costPerItem !== undefined && product.costPerItem !== null
              ? product.costPerItem
              : (
                  Number(product.buyingPrice || 0) +
                  Number(product.packagingCost || 0) +
                  Number(product.deliveryCost || 0)
                ),

          discountPrice: product.discountPrice || '',
          unit: product.unit || 'pcs',
          customUnit: (product.unit && !['pcs', 'ton'].includes(product.unit)) ? product.unit : '',
          colors: (product.colors || []).map(c => ({ code: c })),
          deliveryInfo: product.deliveryInfo || '',
          additionalInfo: product.additionalInfo || [],
          tags: tagIds,
          isFeatured: product.isFeatured || false,
          showOnBanner: product.showOnBanner || false,
          rating: product.rating || 0,
          faqs: faqData,
          videoUrl: product.videoUrl || '',
          videoPublicId: product.videoPublicId || '',
          videoType: product.videoType || 'upload',
          metaSettings: product.metaSettings || { metaTitle: '', metaDescription: '', metaKeywords: [] }
        };
        
        setFormData(newFormData);
        
        if (product.unit === 'other' || (product.unit && !['pcs', 'ton'].includes(product.unit))) {
          setShowCustomUnit(true);
        }
        
        // Set product images
        if (product.images && product.images.length > 0) {
          const updatedImages = [...productImages];
          product.images.forEach((image, idx) => {
            if (idx < 6) {
              updatedImages[idx] = {
                id: `existing_${idx}`,
                file: null,
                preview: image.url,
                error: '',
                url: image.url,
                publicId: image.publicId,
                uploading: false,
                isNew: false,
                uploadAborted: false,
                uploadBatchId: null
              };
            }
          });
          setProductImages(updatedImages);
        }
        
        // Fetch subcategories
        if (product.category?._id || product.category) {
          const categoryId = product.category?._id || product.category;
          await fetchSubcategories(categoryId);
          if (product.subcategory) {
            setFormData(prev => ({ ...prev, subcategory: product.subcategory }));
            await fetchChildSubcategories(categoryId, product.subcategory);
            if (product.childSubcategory) setFormData(prev => ({ ...prev, childSubcategory: product.childSubcategory }));
          }
        }
        
        // Set editor content
        setTimeout(() => {
          if (shortDescEditor && product.shortDescription) {
            shortDescEditor.commands.setContent(product.shortDescription);
          }
          if (fullDescEditor && product.fullDescription) {
            fullDescEditor.commands.setContent(product.fullDescription);
          }
          if (deliveryInfoEditor && product.deliveryInfo) {
            deliveryInfoEditor.commands.setContent(product.deliveryInfo);
          }
        }, 1000);
        
        // Validate SKU
        if (product.skuCode) validateSku(product.skuCode);
        
        // ✅ NO setTimeout to recalculate costPerItem here.
        // The effect with the `hasPricingData` guard handles it correctly.
        
      } else {
        toast.error('Failed to fetch product details');
        router.push('/authorize/all-products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to fetch product details');
      router.push('/authorize/all-products');
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // HAS CHANGES
  // ============================================================
  const hasChanges = () => {
    if (!originalProduct) return false;
    
    if (formData.productName !== originalProduct.productName) return true;
    if (formData.slug !== (originalProduct.slug || '')) return true;
    if (formData.skuCode !== (originalProduct.skuCode || '')) return true;
    if (formData.shortDescription !== originalProduct.shortDescription) return true;
    if (formData.fullDescription !== originalProduct.fullDescription) return true;
    if (formData.category !== (originalProduct.category?._id || originalProduct.category)) return true;
    if (formData.subcategory !== (originalProduct.subcategory || '')) return true;
    if (formData.childSubcategory !== (originalProduct.childSubcategory || '')) return true;
    if (formData.brand !== originalProduct.brand) return true;
    if (Number(formData.stockQuantity) !== Number(originalProduct.stockQuantity)) return true;
    if (Number(formData.regularPrice) !== Number(originalProduct.regularPrice)) return true;
    if (Number(formData.costPerItem) !== Number(originalProduct.costPerItem || 0)) return true;
    if (Number(formData.discountPrice) !== Number(originalProduct.discountPrice)) return true;
    if (Number(formData.buyingPrice) !== Number(originalProduct.buyingPrice || 0)) return true;
    if (Number(formData.packagingCost) !== Number(originalProduct.packagingCost || 0)) return true;
    if (Number(formData.deliveryCost) !== Number(originalProduct.deliveryCost || 0)) return true;
    if (formData.unit !== originalProduct.unit) return true;
    if (JSON.stringify(formData.colors.map(c => c.code)) !== JSON.stringify(originalProduct.colors || [])) return true;
    if (formData.deliveryInfo !== originalProduct.deliveryInfo) return true;
    if (JSON.stringify(formData.tags) !== JSON.stringify(originalProduct.tags || [])) return true;
    if (formData.isFeatured !== originalProduct.isFeatured) return true;
    if (formData.showOnBanner !== originalProduct.showOnBanner) return true;
    if (formData.rating !== (originalProduct.rating || 0)) return true;
    if (formData.videoUrl !== (originalProduct.videoUrl || '')) return true;
    if (formData.videoType !== (originalProduct.videoType || 'upload')) return true;
    if (JSON.stringify(formData.additionalInfo) !== JSON.stringify(originalProduct.additionalInfo || [])) return true;
    if (JSON.stringify(formData.metaSettings) !== JSON.stringify(originalProduct.metaSettings || {})) return true;
    if (JSON.stringify(formData.faqs) !== JSON.stringify(originalProduct.faqs || [])) return true;
    
    if (JSON.stringify(variantTypes) !== JSON.stringify(originalProduct.variantTypes || [])) return true;
    
    const currentAddOnes = addOnes.map(p => p._id).sort();
    const originalAddOnes = (originalProduct.addOnes || []).map(item => item.productId || item._id).sort();
    if (JSON.stringify(currentAddOnes) !== JSON.stringify(originalAddOnes)) return true;
    
    const currentImageUrls = productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted && !img.isNew).map(img => img.url);
    const originalImageUrls = (originalProduct.images || []).map(img => img.url);
    if (JSON.stringify(currentImageUrls) !== JSON.stringify(originalImageUrls)) return true;
    
    if (productImages.some(img => img.isNew && img.url !== null)) return true;
    if (imagesToDelete.length > 0) return true;
    
    return false;
  };

  // ============================================================
  // VALIDATION
  // ============================================================
  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName?.trim()) newErrors.productName = 'Product name is required';
    if (!formData.skuCode?.trim()) newErrors.skuCode = 'SKU code is required';
    if (!formData.fullDescription || formData.fullDescription === '<p></p>') newErrors.fullDescription = 'Full description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.stockQuantity && formData.stockQuantity !== 0) newErrors.stockQuantity = 'Stock quantity is required';
    else if (formData.stockQuantity !== '' && Number(formData.stockQuantity) < 0) newErrors.stockQuantity = 'Stock quantity cannot be negative';
    if (!formData.regularPrice && formData.regularPrice !== 0) newErrors.regularPrice = 'Regular price is required';
    else if (formData.regularPrice !== '' && Number(formData.regularPrice) <= 0) newErrors.regularPrice = 'Regular price must be greater than 0';
    if (formData.discountPrice && Number(formData.discountPrice) > Number(formData.regularPrice)) newErrors.discountPrice = 'Discount price cannot exceed regular price';
    if (!formData.unit) newErrors.unit = 'Unit is required';
    if (formData.unit === 'other' && !formData.customUnit?.trim()) newErrors.customUnit = 'Please specify the unit';
    if (formData.tags.length === 0) newErrors.tags = 'Please select one product tag';
    if (formData.tags.length > 1) newErrors.tags = 'Please select only one tag';
    
    if (formData.slug && isSlugManuallyEdited && isSlugAvailable === false) {
      newErrors.slug = 'This slug is already taken. Please choose a different one.';
    }
    
    const hasImages = productImages.some(img => img.url !== null && !img.uploading);
    if (!hasImages) newErrors.images = 'At least one product image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================================
  // SUBMIT HANDLER
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const uploading = productImages.some(img => img.uploading) || videoUpload.uploading;
    if (uploading) {
      toast.error('Please wait for all uploads to complete');
      return;
    }
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    if (!hasChanges()) {
      toast.info('No changes to save');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const imageUrls = productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted).map(img => img.url);
      const finalUnit = formData.unit === 'other' ? formData.customUnit : formData.unit;
      const colorStrings = formData.colors.map(color => color.code);
      
      let variantData = [];
      let hasVariants = false;
      
      if (variantTypes.length > 0) {
        hasVariants = true;
        variantData = variantTypes.map(vt => ({
          id: vt.id,
          type: vt.type,
          variants: vt.variants.map(v => ({
            id: v.id || Date.now().toString(),
            name: v.name || '',
            color: v.color || '',
            regularPrice: parseFloat(v.regularPrice) || 0,
            discountPrice: parseFloat(v.discountPrice) || 0,
            buyingPrice: parseFloat(v.buyingPrice) || 0,
            packagingCost: parseFloat(v.packagingCost) || 0,
            deliveryCost: parseFloat(v.deliveryCost) || 0,
            costPerItem: parseFloat(v.costPerItem) || 0,
            stockQuantity: parseFloat(v.stockQuantity) || 0,
            images: v.images || [null, null, null, null],
            imagePreviews: v.imagePreviews || [null, null, null, null],
            subVariants: v.subVariants ? v.subVariants.map(sv => ({
              id: sv.id || Date.now().toString(),
              name: sv.name || '',
              color: sv.color || '',
              regularPrice: parseFloat(sv.regularPrice) || 0,
              discountPrice: parseFloat(sv.discountPrice) || 0,
              buyingPrice: parseFloat(sv.buyingPrice) || 0,
              packagingCost: parseFloat(sv.packagingCost) || 0,
              deliveryCost: parseFloat(sv.deliveryCost) || 0,
              costPerItem: parseFloat(sv.costPerItem) || 0,
              stockQuantity: parseFloat(sv.stockQuantity) || 0,
              images: sv.images || [null, null, null, null],
              imagePreviews: sv.imagePreviews || [null, null, null, null]
            })) : []
          }))
        }));
      }

      const payload = {
        productName: formData.productName,
        slug: formData.slug || undefined,
        skuCode: formData.skuCode,
        shortDescription: formData.shortDescription || '',
        fullDescription: formData.fullDescription,
        category: formData.category,
        subcategory: formData.subcategory || undefined,
        childSubcategory: formData.childSubcategory || undefined,
        brand: formData.brand || '',
        stockQuantity: formData.stockQuantity === '' ? 0 : Number(formData.stockQuantity),
        stockAlertQuantity: formData.stockAlertQuantity ? Number(formData.stockAlertQuantity) : 0,
        regularPrice: formData.regularPrice === '' ? 0 : Number(formData.regularPrice),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
        buyingPrice: formData.buyingPrice ? Number(formData.buyingPrice) : 0,
        packagingCost: formData.packagingCost ? Number(formData.packagingCost) : 0,
        deliveryCost: formData.deliveryCost ? Number(formData.deliveryCost) : 0,
        costPerItem: formData.costPerItem ? Number(formData.costPerItem) : 0,
        unit: finalUnit,
        colors: colorStrings,
        deliveryInfo: formData.deliveryInfo || '',
        additionalInfo: formData.additionalInfo.filter(info => info.fieldName && info.fieldValue),
        tags: formData.tags,
        isFeatured: formData.isFeatured,
        showOnBanner: formData.showOnBanner,
        rating: formData.rating || 0,
        faqs: formData.faqs.filter(faq => faq.question.trim() && faq.answer.trim()),
        videoUrl: formData.videoUrl || '',
        videoPublicId: videoUpload.publicId || formData.videoPublicId || '',
        videoType: formData.videoType || 'upload',
        metaSettings: formData.metaSettings,
        images: imageUrls,
        imagesToDelete: imagesToDelete,
        hasVariants: hasVariants,
        variants: variantData,
        addOnes: addOnes.map(p => p._id)
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success('Product updated successfully!');
        window.location.href = '/authorize/all-products';
      } else {
        toast.error(data.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // GET USER ROLE
  // ============================================================
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

  const userRole = getUserRole();
  const isAdminOrSuperAdmin = userRole === 'super_admin' || userRole === 'admin';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#72846A] mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="create_products">
      <MantineProvider>
        <div className="min-h-screen bg-[#f0f7fa]">
          <AddBrandModal isOpen={showAddBrandModal} onClose={() => setShowAddBrandModal(false)} onBrandAdded={handleBrandAdded} />

          {/* Header */}
          <div className="bg-white border-b border-[#72846A]/20 shadow-lg sticky top-0 z-10">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <a href="/authorize/all-products" className="p-2 hover:bg-[#72846A]/20 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-black/80 hover:text-black" />
                  </a>
                  <div>
                    <div className="flex items-center gap-2">
                      <Package className="w-6 h-6 text-[#72846A]" />
                      <h1 className="text-xl font-bold text-black">Edit Product</h1>
                    </div>
                    <p className="text-sm text-black/70 mt-1">Update product information</p>
                  </div>
                </div>
                {!hasChanges() && originalProduct && (
                  <span className="text-xs text-[#72846A] flex items-center gap-1 bg-[#72846A]/20 px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    No pending changes
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Information Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#72846A]" />
                        Basic Information
                      </h2>
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                        <input type="text" name="productName" value={formData.productName} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.productName ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g., Wireless Headphones, Smart Watch Pro" />
                        {errors.productName && <p className="text-xs text-red-600 mt-1">{errors.productName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Slug <span className="text-gray-400 text-xs">(Auto-generated from product name)</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="slug" 
                            value={formData.slug || ''} 
                            onChange={handleSlugChange}
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition font-mono ${
                              errors.slug ? 'border-red-500' : 
                              isSlugManuallyEdited && isSlugAvailable === true ? 'border-green-500' :
                              isSlugManuallyEdited && isSlugAvailable === false ? 'border-red-500' : 'border-gray-300'
                            }`} 
                            placeholder="Auto-generated from product name..." 
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {isCheckingSlug && (
                              <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                            )}
                            {!isCheckingSlug && formData.slug && isSlugManuallyEdited && isSlugAvailable === true && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                            {!isCheckingSlug && formData.slug && isSlugManuallyEdited && isSlugAvailable === false && (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            {formData.slug && !isSlugManuallyEdited && (
                              <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Auto</span>
                            )}
                            {formData.slug && isSlugManuallyEdited && isSlugAvailable !== false && (
                              <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Custom</span>
                            )}
                          </div>
                        </div>
                        {errors.slug && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.slug}
                          </p>
                        )}
                        {!isCheckingSlug && formData.slug && isSlugManuallyEdited && isSlugAvailable === true && !errors.slug && (
                          <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Slug is available!
                          </p>
                        )}
                        {formData.slug && !errors.slug && (
                          <p className="text-xs text-[#72846A] mt-1 flex items-center gap-1">
                            <LinkIcon className="w-3 h-3" />
                            <span>Product URL will be: /product/{formData.slug}</span>
                          </p>
                        )}
                        {isSlugManuallyEdited && formData.productName && (
                          <button
                            type="button"
                            onClick={() => {
                              const generatedSlug = formData.productName
                                .toLowerCase()
                                .trim()
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/(^-|-$)+/g, '');
                              setFormData(prev => ({ ...prev, slug: generatedSlug }));
                              setIsSlugManuallyEdited(false);
                              setIsSlugAvailable(null);
                              toast.info('Slug reset to auto-generated value');
                            }}
                            className="text-xs text-[#72846A] hover:text-[#0891B2] mt-1 flex items-center gap-1 transition-colors"
                          >
                            <RefreshCw className="w-3 h-3" />
                            Reset to auto-generated
                          </button>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          💡 The slug is automatically generated from the product name. Edit it if you want a custom URL.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SKU Code <span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                              {isValidatingSku ? (
                                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                              ) : formData.skuCode && isSkuUnique === true && formData.skuCode !== originalProduct?.skuCode ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : formData.skuCode && isSkuUnique === true && formData.skuCode === originalProduct?.skuCode ? (
                                <CheckCircle className="w-4 h-4 text-blue-500" />
                              ) : formData.skuCode && isSkuUnique === false ? (
                                <XCircle className="w-4 h-4 text-red-500" />
                              ) : (
                                <Hash className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <input
                              type="text"
                              name="skuCode"
                              value={formData.skuCode}
                              onChange={(e) => {
                                setFormData(prev => ({ ...prev, skuCode: e.target.value }));
                                if (errors.skuCode) setErrors(prev => ({ ...prev, skuCode: null }));
                              }}
                              className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.skuCode || isSkuUnique === false ? 'border-red-500' : 'border-gray-300'}`}
                              placeholder="Enter SKU code"
                            />
                          </div>
                          <button type="button" onClick={generateSkuFromBackend} disabled={isGeneratingSku} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2">
                            {isGeneratingSku ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                            Generate New SKU
                          </button>
                        </div>
                        {errors.skuCode && <p className="text-xs text-red-600 mt-1">{errors.skuCode}</p>}
                        {isSkuUnique === true && formData.skuCode && formData.skuCode !== originalProduct?.skuCode && (
                          <p className="text-xs text-green-600 mt-1">✓ SKU is available</p>
                        )}
                        {isSkuUnique === true && formData.skuCode === originalProduct?.skuCode && (
                          <p className="text-xs text-[#72846A] mt-1">✓ Current SKU (no change)</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Must be unique across all products. Format: letters, numbers, hyphens (4-20 chars)</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description <span className="text-gray-400 text-xs">(Optional)</span></label>
                        {isMounted && shortDescEditor && (
                          <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <RichTextEditor editor={shortDescEditor}>
                              <RichTextEditor.Toolbar>
                                <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /></RichTextEditor.ControlsGroup>
                                <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
                              </RichTextEditor.Toolbar>
                              <RichTextEditor.Content />
                            </RichTextEditor>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Description <span className="text-red-500">*</span></label>
                        {isMounted && fullDescEditor && (
                          <div className={`border rounded-lg overflow-hidden ${errors.fullDescription ? 'border-red-500' : 'border-gray-300'}`}>
                            <RichTextEditor editor={fullDescEditor}>
                              <RichTextEditor.Toolbar>
                                <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.Underline /><RichTextEditor.Strikethrough /></RichTextEditor.ControlsGroup>
                                <RichTextEditor.ControlsGroup><RichTextEditor.H1 /><RichTextEditor.H2 /><RichTextEditor.H3 /></RichTextEditor.ControlsGroup>
                                <RichTextEditor.ControlsGroup><RichTextEditor.BulletList /><RichTextEditor.OrderedList /></RichTextEditor.ControlsGroup>
                                <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
                                <RichTextEditor.ControlsGroup><RichTextEditor.Link /><RichTextEditor.Unlink /></RichTextEditor.ControlsGroup>
                              </RichTextEditor.Toolbar>
                              <RichTextEditor.Content />
                            </RichTextEditor>
                          </div>
                        )}
                        {errors.fullDescription && <p className="text-xs text-red-600 mt-1">{errors.fullDescription}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Categories Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                        <Layers className="w-5 h-5 text-[#72846A]" />
                        Categories & Classification
                      </h2>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                          <select name="category" value={formData.category} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.category ? 'border-red-500' : 'border-gray-300'}`}>
                            <option value="">Select Category</option>
                            {categories.map(cat => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                          </select>
                          {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory <span className="text-gray-400 text-xs">(Optional)</span></label>
                          <select name="subcategory" value={formData.subcategory} onChange={handleChange} disabled={!formData.category || subcategories.length === 0} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300">
                            <option value="">Select Subcategory</option>
                            {subcategories.map(sub => (<option key={sub._id} value={sub._id}>{sub.name}</option>))}
                          </select>
                        </div>

                        {childSubcategories.length > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Child Subcategory <span className="text-gray-400 text-xs">(Optional)</span></label>
                            <select name="childSubcategory" value={formData.childSubcategory} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition border-gray-300">
                              <option value="">Select Child Subcategory</option>
                              {childSubcategories.map(child => (<option key={child._id} value={child._id}>{child.name}</option>))}
                            </select>
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Brand <span className="text-gray-400 text-xs">(Optional)</span></label>
                          <div className="flex gap-2">
                            <select name="brand" value={formData.brand} onChange={handleChange} className={`flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.brand ? 'border-red-500' : 'border-gray-300'}`}>
                              <option value="">Select Brand</option>
                              {brands.map(brand => (<option key={brand._id} value={brand.name}>{brand.name}</option>))}
                            </select>
                            <button type="button" onClick={() => setShowAddBrandModal(true)} className="px-4 py-2 bg-[#72846A] text-white rounded-lg hover:bg-[#738769] transition-colors flex items-center gap-2 whitespace-nowrap font-semibold">
                              <Plus className="w-4 h-4" /> Add Brand
                            </button>
                          </div>
                          {errors.brand && <p className="text-xs text-red-600 mt-1">{errors.brand}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Inventory Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-[#72846A]" />
                        Pricing & Inventory
                      </h2>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity <span className="text-red-500">*</span></label>
                          <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.stockQuantity ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Stock Alert Quantity</label>
                          <input type="number" name="stockAlertQuantity" value={formData.stockAlertQuantity} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" placeholder="Notify when stock reaches this level" />
                          <p className="text-xs text-gray-500 mt-1">You'll be notified when stock reaches this level</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (৳) <span className="text-red-500">*</span></label>
                          <input type="number" name="regularPrice" value={formData.regularPrice} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.regularPrice ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cost Per Item (৳) <span className="text-gray-400 text-xs">(Auto-calculated)</span>
                          </label>
                          <div className="relative">
                            <input 
                              type="text" 
                              name="costPerItem" 
                              value={
                                formData.costPerItem !== undefined &&
                                formData.costPerItem !== null
                                  ? formData.costPerItem
                                  : ''
                              }
                              className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-100 border-gray-300 cursor-not-allowed text-gray-700"
                              placeholder="0" 
                              readOnly 
                              disabled
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                              Auto
                            </div>
                          </div>
                          <p className="text-xs text-[#72846A] mt-1 flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            Cost Per Item = Buying Price + Packaging Cost + Delivery Cost
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400 text-xs">(Optional)</span></label>
                          <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.discountPrice ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
                          {formData.discountPrice > 0 && formData.regularPrice && (
                            <p className="text-xs text-green-600 mt-1">Save: ৳{(formData.regularPrice - formData.discountPrice).toFixed(2)} ({Math.round(((formData.regularPrice - formData.discountPrice) / formData.regularPrice) * 100)}% off)</p>
                          )}
                        </div>

                        {isAdminOrSuperAdmin && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Buying Price (৳) <span className="text-amber-600 text-xs">(Admin Only)</span>
                            </label>
                            <input 
                              type="number" 
                              name="buyingPrice" 
                              value={formData.buyingPrice || ''} 
                              onChange={handleNumberChange} 
                              onWheel={(e) => e.target.blur()} 
                              min="0" 
                              step="1" 
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" 
                              placeholder="0" 
                            />
                            <p className="text-xs text-amber-600 mt-1">
                              ⚠️ This field is only visible to Super Admins and Admins
                            </p>
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Packaging Cost (৳) <span className="text-gray-400 text-xs">(Optional)</span>
                          </label>
                          <input 
                            type="number" 
                            name="packagingCost" 
                            value={formData.packagingCost || ''} 
                            onChange={handleNumberChange} 
                            onWheel={(e) => e.target.blur()} 
                            min="0" 
                            step="1" 
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" 
                            placeholder="0" 
                          />
                          <p className="text-xs text-gray-500 mt-1">Cost of packaging materials per unit</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Delivery Cost (৳) <span className="text-gray-400 text-xs">(Optional)</span>
                          </label>
                          <input 
                            type="number" 
                            name="deliveryCost" 
                            value={formData.deliveryCost || ''} 
                            onChange={handleNumberChange} 
                            onWheel={(e) => e.target.blur()} 
                            min="0" 
                            step="1" 
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" 
                            placeholder="0" 
                          />
                          <p className="text-xs text-gray-500 mt-1">Cost of delivery per unit</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Unit <span className="text-red-500">*</span></label>
                          <select name="unit" value={formData.unit} onChange={handleUnitChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.unit ? 'border-red-500' : 'border-gray-300'}`}>
                            {UNIT_OPTIONS.map(unit => (<option key={unit.value} value={unit.value}>{unit.label}</option>))}
                          </select>
                          {errors.unit && <p className="text-xs text-red-600 mt-1">{errors.unit}</p>}
                        </div>
                      </div>

                      {showCustomUnit && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Custom Unit <span className="text-red-500">*</span></label>
                          <input type="text" name="customUnit" value={formData.customUnit} onChange={(e) => setFormData(prev => ({ ...prev, customUnit: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition ${errors.customUnit ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g., pair, set, dozen" />
                          {errors.customUnit && <p className="text-xs text-red-600 mt-1">{errors.customUnit}</p>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* VARIANT SECTION */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                        <Grid className="w-5 h-5 text-[#72846A]" />
                        Product Variants <span className="text-gray-400 text-xs">(Optional)</span>
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">Add variant types like Color, Size, Material, etc. Each variant type can have multiple options with their own prices, stock, and images.</p>
                    </div>
                    <div className="p-5">
                      {variantTypes.map((vt, index) => (
                        <VariantTypeSection
                          key={vt.id || index}
                          variantType={vt}
                          onVariantTypeChange={(type) => {
                            const updated = [...variantTypes];
                            updated[index].type = type;
                            setVariantTypes(updated);
                          }}
                          variants={vt.variants}
                          onVariantsChange={(variants) => updateVariantTypeVariants(index, variants)}
                          onRemoveType={() => removeVariantType(index)}
                          defaultPackagingCost={formData.packagingCost}
                          defaultDeliveryCost={formData.deliveryCost}
                          isAdminOrSuperAdmin={isAdminOrSuperAdmin}
                        />
                      ))}

                      {!showAddVariantType ? (
                        <button
                          type="button"
                          onClick={() => setShowAddVariantType(true)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#72846A] border-2 border-dashed border-[#72846A]/40 rounded-lg hover:bg-[#72846A]/5 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Variant Type
                        </button>
                      ) : (
                        <div className="border border-[#72846A]/40 rounded-lg p-4 bg-[#72846A]/5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Variant Type <span className="text-red-500">*</span></label>
                              <select
                                value={newVariantType}
                                onChange={(e) => setNewVariantType(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                              >
                                <option value="">Select type...</option>
                                {VARIANT_TYPE_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </div>

                            {newVariantType === 'custom' && (
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Custom Type Name <span className="text-red-500">*</span></label>
                                <input
                                  type="text"
                                  value={customVariantTypeName}
                                  onChange={(e) => setCustomVariantTypeName(e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                                  placeholder="e.g., Fabric, Finish, Pattern"
                                />
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-3 mt-4">
                            <button
                              type="button"
                              onClick={addVariantType}
                              className="px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#738769] transition-colors"
                            >
                              <Plus className="w-4 h-4 inline mr-1" />
                              Add Variant Type
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowAddVariantType(false);
                                setNewVariantType('');
                                setCustomVariantTypeName('');
                              }}
                              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ADD-ONES SECTION */}
                  <AddOnesSection 
                    addOnes={addOnes}
                    onAddProduct={handleAddAddOne}
                    onRemoveProduct={handleRemoveAddOne}
                    maxProducts={5}
                  />

                  {/* Additional Information */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}>
                        <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Info className="w-5 h-5 text-[#72846A]" /> Additional Information</h2>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showAdditionalInfo ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    {showAdditionalInfo && (
                      <div className="p-5">
                        <div className="space-y-4">
                          {formData.additionalInfo.map((info, index) => (
                            <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <input type="text" placeholder="Field name" value={info.fieldName} onChange={(e) => updateAdditionalInfo(index, 'fieldName', e.target.value)} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none" />
                              <input type="text" placeholder="Field value" value={info.fieldValue} onChange={(e) => updateAdditionalInfo(index, 'fieldValue', e.target.value)} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none" />
                              <button type="button" onClick={() => removeAdditionalInfo(index)} className="p-2 text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
                            </div>
                          ))}
                          <button type="button" onClick={addAdditionalInfo} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#72846A] border-2 border-dashed border-[#72846A]/40 rounded-lg hover:bg-[#72846A]/5"><Plus className="w-4 h-4" /> Add Additional Information</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Delivery Details */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}>
                        <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Package className="w-5 h-5 text-[#72846A]" /> Delivery Details <span className="text-gray-400 text-xs">(Optional)</span></h2>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showDeliveryInfo ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    {showDeliveryInfo && (
                      <div className="p-5">
                        {isMounted && deliveryInfoEditor && (
                          <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <RichTextEditor editor={deliveryInfoEditor}>
                              <RichTextEditor.Toolbar>
                                <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.Underline /></RichTextEditor.ControlsGroup>
                                <RichTextEditor.ControlsGroup><RichTextEditor.BulletList /><RichTextEditor.OrderedList /></RichTextEditor.ControlsGroup>
                                <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
                              </RichTextEditor.Toolbar>
                              <RichTextEditor.Content />
                            </RichTextEditor>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">Include shipping information, delivery time, and other delivery-related details</p>
                      </div>
                    )}
                  </div>

                  {/* FAQ SECTION */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowFaqs(!showFaqs)}>
                        <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                          <HelpCircle className="w-5 h-5 text-[#72846A]" />
                          Frequently Asked Questions <span className="text-gray-400 text-xs">(Optional)</span>
                        </h2>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showFaqs ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    {showFaqs && (
                      <div className="p-5">
                        <div className="space-y-4">
                          {formData.faqs.map((faq, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-start justify-between mb-3">
                                <span className="text-sm font-medium text-gray-700">FAQ #{index + 1}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFaq(index)}
                                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Question <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) => updateFaq(index, 'question', e.target.value)}
                                    placeholder="e.g., What is the warranty period?"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Answer <span className="text-red-500">*</span>
                                  </label>
                                  <textarea
                                    value={faq.answer}
                                    onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                                    rows="3"
                                    placeholder="e.g., This product comes with a 2-year warranty covering manufacturing defects..."
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition resize-none"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <button
                            type="button"
                            onClick={addFaq}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#72846A] border-2 border-dashed border-[#72846A]/40 rounded-lg hover:bg-[#72846A]/5 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Add FAQ
                          </button>
                          
                          {formData.faqs.length === 0 && (
                            <p className="text-xs text-gray-500 text-center py-2">
                              No FAQs added yet. Click the button above to add frequently asked questions about this product.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SEO & Meta Settings */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowMeta(!showMeta)}>
                        <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Search className="w-5 h-5 text-[#72846A]" /> SEO & Meta Settings</h2>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    {showMeta && (
                      <div className="p-5">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title <span className="text-xs text-gray-400 ml-2">(70 characters max)</span></label>
                            <input type="text" value={formData.metaSettings.metaTitle} onChange={(e) => handleMetaChange('metaTitle', e.target.value)} maxLength="70" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" placeholder="e.g., Buy Wireless Headphones Online | Smart Gadget" />
                            <div className="flex justify-end mt-1"><span className={`text-xs ${formData.metaSettings.metaTitle?.length > 70 ? 'text-red-500' : 'text-gray-400'}`}>{formData.metaSettings.metaTitle?.length || 0}/70</span></div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description <span className="text-xs text-gray-400 ml-2">(160 characters max)</span></label>
                            <textarea value={formData.metaSettings.metaDescription} onChange={(e) => handleMetaChange('metaDescription', e.target.value)} maxLength="160" rows="3" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition resize-none" placeholder="Write a compelling description that appears in search engine results..." />
                            <div className="flex justify-end mt-1"><span className={`text-xs ${formData.metaSettings.metaDescription?.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>{formData.metaSettings.metaDescription?.length || 0}/160</span></div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords <span className="text-xs text-gray-400 ml-2">(Comma separated)</span></label>
                            <div className="flex gap-2">
                              <input type="text" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(); } }} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition" placeholder="e.g., wireless headphones, bluetooth earphones" />
                              <button type="button" onClick={addKeyword} className="px-4 py-2 text-white rounded-lg bg-[#72846A] hover:bg-[#0891B2]"><Plus className="w-4 h-4" /> Add</button>
                            </div>
                            {formData.metaSettings.metaKeywords?.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {formData.metaSettings.metaKeywords.map((keyword, index) => (
                                  <div key={index} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-[#72846A]/10 text-[#004767]">
                                    <span>{keyword}</span>
                                    <button type="button" onClick={() => removeKeyword(index)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Product Images Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-[#72846A]" /> 
                        Product Images <span className="text-red-500">*</span>
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">Upload up to 6 images (JPG, PNG, WebP, max 5MB each) • Drag to reorder</p>
                    </div>
                    <div className="p-5">
                      {errors.images && <p className="text-xs text-red-600 mb-4 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.images}</p>}
                      
                      <div className="flex gap-3 mb-4">
                        <button 
                          type="button" 
                          onClick={() => fileInputRefs.current['multiple']?.click()} 
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#72846A]/40 bg-[#72846A]/5 text-[#72846A] hover:bg-[#72846A]/10 transition-colors"
                        >
                          <Upload className="w-5 h-5" /> Upload from Device
                        </button>
                        
                        <button 
                          type="button" 
                          onClick={() => setShowMediaPicker(true)} 
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#72846A]/40 bg-[#72846A]/5 text-[#72846A] hover:bg-[#72846A]/10 transition-colors"
                        >
                          <ImageIcon className="w-5 h-5" /> Choose from Media Library
                        </button>
                      </div>

                      <input type="file" id="multiple-images" className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp" multiple onChange={handleMultipleImageSelect} ref={el => { if (el) fileInputRefs.current['multiple'] = el; }} />

                      <div className="grid grid-cols-2 gap-4">
                        {productImages.map((img, index) => (
                          <div key={index} draggable={img.preview !== null && !img.uploading} onDragStart={() => handleDragStart(index)} onDragOver={(e) => handleDragOverWithFeedback(e, index)} onDragLeave={handleDragLeave} onDrop={() => handleDropWithFeedback(index)} onDragEnd={handleDragEnd} className={`transition-all duration-200 ${draggedIndex === index ? 'opacity-50 scale-95' : ''} ${dragOverIndex === index && draggedIndex !== index && draggedIndex !== null ? 'ring-2 ring-[#72846A] ring-offset-2 rounded-lg' : ''}`}>
                            {img.preview ? (
                              <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 h-40 hover:border-[#72846A] transition-colors cursor-grab active:cursor-grabbing bg-gray-100">
                                <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10"><GripVertical className="w-3 h-3 text-white" /></div>
                                <img src={img.preview} alt={`Product ${index + 1}`} className="w-full h-full object-contain bg-gray-100" />
                                {img.uploading && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"><Loader2 className="w-6 h-6 text-white animate-spin" /></div>}
                                <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-20"><X className="w-3 h-3" /></button>
                                {index === 0 && img.url && !img.uploading && <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-green-500 text-white text-[10px] rounded z-10">Primary</span>}
                              </div>
                            ) : (
                              <div className={`border-2 border-dashed rounded-lg p-4 text-center h-40 flex flex-col items-center justify-center cursor-pointer transition-colors ${img.error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-[#72846A] hover:bg-[#72846A]/5'}`} onClick={() => handleSlotClick(index)}>
                                <input type="file" ref={el => fileInputRefs.current[index] = el} className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={(e) => handleImageChange(e, index)} />
                                <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${img.error ? 'text-red-400' : 'text-gray-400'}`} />
                                <p className={`text-xs ${img.error ? 'text-red-600' : 'text-gray-600'}`}>Slot {index + 1}</p>
                                <p className="text-[10px] text-gray-400 mt-1">Click to upload</p>
                                {img.error && <p className="text-xs text-red-600 mt-1">{img.error}</p>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-xs text-gray-500 text-center">{productImages.filter(img => img.url !== null && !img.uploading).length} of 6 images uploaded</div>
                      {imagesToDelete.length > 0 && <div className="mt-2 text-xs text-red-500 text-center">{imagesToDelete.length} image(s) marked for deletion</div>}
                    </div>
                  </div>

                  {/* Video Upload Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                        <Video className="w-5 h-5 text-[#72846A]" />
                        Product Video <span className="text-gray-400 text-xs">(Optional)</span>
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">Upload a video or add a YouTube link</p>
                    </div>
                    <div className="p-5">
                      <div className="flex gap-2 mb-4">
                        <button
                          type="button"
                          onClick={() => setVideoType('upload')}
                          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                            videoType === 'upload'
                              ? 'bg-[#72846A] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Upload className="w-4 h-4 inline mr-1" />
                          Upload Video
                        </button>
                        <button
                          type="button"
                          onClick={() => setVideoType('youtube')}
                          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                            videoType === 'youtube'
                              ? 'bg-[#72846A] text-[#004767]'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Youtube className="w-4 h-4 inline mr-1" />
                          YouTube Link
                        </button>
                      </div>

                      {getVideoPreview()}

                      {videoType === 'upload' && !videoUpload.url && !videoUpload.preview && (
                        <div>
                          <div className="flex flex-col sm:flex-row gap-3 mb-4">
                            <button
                              type="button"
                              onClick={() => {
                                if (videoInputRef.current) {
                                  videoInputRef.current.click();
                                }
                              }}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#72846A]/40 bg-[#72846A]/5 text-[#72846A] hover:bg-[#72846A]/10 transition-colors"
                            >
                              <Upload className="w-5 h-5" />
                              Upload from Device
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => {
                                setShowVideoMediaPicker(true);
                              }}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-[#72846A]/40 bg-[#72846A]/5 text-[#72846A] hover:bg-[#72846A]/10 transition-colors"
                            >
                              <Video className="w-5 h-5" />
                              Choose from Media Library
                            </button>
                          </div>

                          <input
                            type="file"
                            ref={videoInputRef}
                            className="hidden"
                            accept="video/*"
                            onChange={handleVideoFileChange}
                          />

                          <div className="text-xs text-gray-400 text-center">
                            <p>MP4, WebM, MOV (Max 100MB)</p>
                            <p className="mt-1">Click on a button above to add a video</p>
                          </div>
                        </div>
                      )}

                      {videoType === 'youtube' && !formData.videoUrl && (
                        <div className="space-y-3">
                          <div className="relative">
                            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                            <input
                              type="text"
                              value={youtubeUrl}
                              onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                              placeholder="https://www.youtube.com/watch?v=..."
                              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            Paste any YouTube video URL. The video will be embedded on your product page.
                          </p>
                        </div>
                      )}

                      {videoUpload.error && (
                        <p className="text-xs text-red-500 mt-2">{videoUpload.error}</p>
                      )}
                    </div>
                  </div>

                  {/* Featured Product */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#72846A]" />
                        Product Promotion
                      </h2>
                    </div>
                    <div className="p-5 space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.isFeatured} 
                          onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))} 
                          className="w-5 h-5 rounded border-gray-300 text-[#72846A] focus:ring-[#72846A]" 
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-700">Mark as Featured Product</span>
                          <p className="text-xs text-gray-500">Featured products will appear in special sections</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Product Tag Selection */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                        <Tag className="w-5 h-5 text-[#72846A]" />
                        Product Tag <span className="text-red-500">*</span>
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">Select exactly one tag for your product</p>
                    </div>
                    <div className="p-5">
                      {errors.tags && <p className="text-xs text-red-600 mb-4 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.tags}</p>}
                      
                      {isLoadingTags ? (
                        <div className="flex justify-center py-4">
                          <Loader2 className="w-6 h-6 animate-spin text-[#72846A]" />
                        </div>
                      ) : productTags.length === 0 ? (
                        <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-500">No tags available. Please create tags first.</p>
                          <button
                            type="button"
                            onClick={() => router.push('/authorize/tags')}
                            className="mt-2 text-sm text-[#72846A] hover:text-[#0891B2] font-medium"
                          >
                            Create Tags →
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                          {productTags.map(tag => {
                            const isSelected = formData.tags && formData.tags.length === 1 && formData.tags[0] === tag._id;
                            return (
                              <button
                                key={tag._id}
                                type="button"
                                onClick={() => handleTagSelect(tag._id)}
                                className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-full transition-all border ${
                                  isSelected
                                    ? 'bg-[#72846A] text-white border-[#72846A] ring-2 ring-[#72846A] ring-offset-2 shadow-md'
                                    : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
                                }`}
                              >
                                {tag.image && tag.image.url && (
                                  <img 
                                    src={tag.image.url} 
                                    alt={tag.name} 
                                    className="w-4 h-4 rounded-full object-cover"
                                  />
                                )}
                                {tag.name}
                                {isSelected && <CheckCircle className="w-3 h-3 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {formData.tags && formData.tags.length > 0 && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-xs font-medium text-green-700 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Selected Tag:
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {formData.tags.map(tagId => {
                              const tag = productTags.find(t => t._id === tagId);
                              return tag ? (
                                <span key={tagId} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-[#72846A] text-white shadow-sm">
                                  {tag.image && tag.image.url && (
                                    <img 
                                      src={tag.image.url} 
                                      alt={tag.name} 
                                      className="w-4 h-4 rounded-full object-cover"
                                    />
                                  )}
                                  {tag.name}
                                  <button 
                                    type="button" 
                                    onClick={() => handleTagSelect(tagId)} 
                                    className="hover:opacity-70 ml-1 transition-opacity"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                      
                      {(!formData.tags || formData.tags.length === 0) && !errors.tags && (
                        <p className="text-xs text-gray-400 mt-3 text-center">
                          Click on a tag above to select it. Click again to deselect.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Rating Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#72846A]" />
                        Product Rating <span className="text-gray-400 text-xs">(Optional)</span>
                      </h2>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingClick(star)}
                            onMouseEnter={() => setRatingHover(star)}
                            onMouseLeave={() => setRatingHover(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star 
                              className={`w-8 h-8 ${
                                (ratingHover || formData.rating) >= star
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          {formData.rating > 0 ? `${formData.rating} out of 5 stars` : 'No rating set'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">Set the product rating (1-5 stars) - Optional</p>
                      {formData.rating > 0 && (
                        <button
                          type="button"
                          onClick={clearRating}
                          className="mt-2 text-xs text-red-500 hover:text-red-600 transition-colors"
                        >
                          Clear Rating
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Status Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-[#72846A]/20">
                    <div className="p-5 border-b border-[#72846A]/20">
                      <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2"><Box className="w-5 h-5 text-[#72846A]" /> Product Status</h2>
                    </div>
                    <div className="p-5">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={true} disabled className="w-5 h-5 rounded border-gray-300 text-[#72846A]" />
                        <div><span className="text-sm font-medium text-gray-700">Active Product</span><p className="text-xs text-gray-500">Product will be visible to customers</p></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Update Product Button at Bottom */}
              <div className="mt-8 flex justify-end gap-3">
                <a href="/authorize/all-products">
                  <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                </a>
                <button type="submit" disabled={isSubmitting || !hasChanges()} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#72846A] to-[#738769] text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSubmitting ? 'Updating...' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Media Library Picker - Multiple Images */}
        <MediaLibraryPicker
          isOpen={showMediaPicker}
          onClose={() => setShowMediaPicker(false)}
          onSelect={handleMediaLibrarySelect}
          multiple={true}
          maxSelect={6 - productImages.filter(img => img.url !== null && !img.uploading).length}
          currentImages={productImages.filter(img => img.url !== null).map(img => img.url)}
        />

        {/* Media Library Picker - Single Image */}
        <MediaLibraryPicker
          isOpen={showSingleMediaPicker}
          onClose={() => {
            setShowSingleMediaPicker(false);
            setSelectedSlotIndex(null);
          }}
          onSelect={handleSingleMediaLibrarySelect}
          multiple={false}
          maxSelect={1}
          currentImages={productImages.filter(img => img.url !== null).map(img => img.url)}
        />

        {/* Media Library Picker - Video */}
        <MediaLibraryPicker
          isOpen={showVideoMediaPicker}
          onClose={() => setShowVideoMediaPicker(false)}
          onSelect={handleVideoMediaLibrarySelect}
          multiple={false}
          maxSelect={1}
          currentImages={[]}
          onlyVideos={true}
        />

        {/* Slot Picker Modal - Images */}
        <ImageSlotPickerModal
          isOpen={showSlotPicker}
          onClose={() => {
            setShowSlotPicker(false);
            setSlotPickerIndex(null);
          }}
          onUploadFromDevice={handleUploadFromDevice}
          onChooseFromLibrary={handleChooseFromLibrary}
        />
      </MantineProvider>
    </ProtectedRoute>
  );
}