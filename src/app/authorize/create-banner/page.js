
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import NextLink from 'next/link';
// import { 
//   Save, 
//   ArrowLeft,
//   Image as ImageIcon,
//   Loader2,
//   Trash2,
//   Upload,
//   Eye,
//   Link as LinkIcon,
//   Sparkles,
//   Type,
//   AlignLeft,
//   CheckSquare,
//   Settings,
//   X,
//   Hash
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';
// import { FaArrowRight } from 'react-icons/fa';

// const DEFAULT_BG_IMAGE = '/images/hh.PNG';

// // Cloudinary Upload
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

// // Image Upload Component - Alternative with ref
// const ImageUploadField = ({ 
//   imageUrl, 
//   onImageChange, 
//   onImageRemove, 
//   label, 
//   required = false,
//   helpText = '',
//   defaultImage = ''
// }) => {
//   const fileInputRef = useRef(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [preview, setPreview] = useState(imageUrl || defaultImage || '');
//   const [error, setError] = useState('');
//   const isRemovedRef = useRef(false); // ✅ Track if removed

//   // ✅ Update preview when imageUrl changes, unless it was explicitly removed
//   useEffect(() => {
//     if (isRemovedRef.current) {
//       // If removed, keep preview empty
//       return;
//     }
    
//     if (imageUrl) {
//       setPreview(imageUrl);
//     } else if (defaultImage && !imageUrl) {
//       setPreview(defaultImage);
//     } else {
//       setPreview('');
//     }
//   }, [imageUrl, defaultImage]);

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
//     isRemovedRef.current = false; // ✅ Reset removed flag
    
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

//   // ✅ Fixed handleRemove with ref
//   const handleRemove = () => {
//     isRemovedRef.current = true; // ✅ Mark as removed
//     setPreview(''); // Immediately clear preview
//     onImageRemove(); // Call parent's remove function
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ''; // Reset file input
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
      
//       {preview ? (
//         <div className="relative inline-block">
//           <div className="rounded-lg overflow-hidden border-2 border-[#8B9D83]/30 bg-gray-100 w-48 h-32">
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
//             className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
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
//             className="flex items-center gap-2 px-4 py-2 bg-[#8B9D83] text-white rounded-lg hover:bg-[#7A8A73] transition-colors text-sm disabled:opacity-50"
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

// // Preview Component
// const PreviewBanner = ({ slide }) => {
//   const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

//   if (!slide) return null;

//   return (
//     <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url('${slide.bgImage || DEFAULT_BG_IMAGE}')`,
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/5" />
//       </div>

//       <div className="container mx-auto px-4 md:px-6 h-full relative z-10">
//         <div className="flex flex-col justify-end h-full pb-6 md:pb-8 max-w-2xl">
          
//           {slide.tagline && (
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-[#8B9D83]/30 mb-2 w-fit">
//               <span className="w-1 h-1 rounded-full bg-[#8B9D83]" />
//               <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-white/80">
//                 {slide.tagline}
//               </span>
//             </div>
//           )}

//           {slide.title && (
//             <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-[1.1] tracking-wide text-white mb-1.5">
//               {slide.title}
//               {slide.highlightedText && (
//                 <>
//                   <br />
//                   <span className="text-[#8B9D83] font-medium">
//                     {slide.highlightedText}
//                   </span>
//                 </>
//               )}
//             </h1>
//           )}

//           {slide.description && (
//             <p className="text-sm md:text-base text-white/70 max-w-lg leading-relaxed mb-4">
//               {slide.description}
//             </p>
//           )}

//           {slide.ctaLabel && (
//             <div>
//               <button className="inline-flex items-center gap-1.5 px-5 py-2 md:px-6 md:py-2.5 bg-[#8B9D83] text-white text-xs md:text-sm font-medium transition-all duration-300 shadow-lg">
//                 {slide.ctaLabel}
//                 <FaArrowRight className="w-3.5 h-3.5" />
//               </button>
//             </div>
//           )}

//           {slide.trustIndicators && slide.trustIndicators.length > 0 && (
//             <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/10 flex-wrap">
//               {slide.trustIndicators.map((indicator, i) => (
//                 <React.Fragment key={i}>
//                   <span className="text-[10px] md:text-xs text-white/50 font-medium tracking-[0.15em] uppercase">
//                     {indicator}
//                   </span>
//                   {i < slide.trustIndicators.length - 1 && (
//                     <span className="w-px h-3 bg-white/15" />
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Create Banner Page
// export default function CreateBannerPage() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSavingDraft, setIsSavingDraft] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const [isLoadingOrder, setIsLoadingOrder] = useState(true);

//   const [formData, setFormData] = useState({
//     tagline: '',
//     title: '',
//     highlightedText: '',
//     description: '',
//     bgImage: DEFAULT_BG_IMAGE,
//     ctaLabel: 'Explore the Collection',
//     ctaHref: '/collection',
//     trustIndicators: ['Heirloom Quality', 'Sustainably Made', 'Lifetime Care'],
//     displayOrder: 0, // ✅ Will be auto-filled
//     isActive: true,
//     isPublished: true,
//     showOnHomepage: true
//   });

//   const [errors, setErrors] = useState({});
//   const [trustInput, setTrustInput] = useState('');

//   const BANNER_DRAFT_KEY = 'hero_banner_draft';

//   // ✅ Fetch the next display order on component mount
//   useEffect(() => {
//     const fetchNextOrder = async () => {
//       try {
//         setIsLoadingOrder(true);
//         const token = localStorage.getItem('token');
//         const response = await fetch('http://localhost:5000/api/banners/admin/all?limit=1&sort=displayOrder_desc', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         const data = await response.json();
//         if (data.success && data.data.length > 0) {
//           const nextOrder = data.data[0].displayOrder + 1;
//           setFormData(prev => ({ ...prev, displayOrder: nextOrder }));
//         } else {
//           setFormData(prev => ({ ...prev, displayOrder: 0 }));
//         }
//       } catch (error) {
//         console.error('Error fetching next order:', error);
//         setFormData(prev => ({ ...prev, displayOrder: 0 }));
//       } finally {
//         setIsLoadingOrder(false);
//       }
//     };

//     fetchNextOrder();
//   }, []);

//   useEffect(() => {
//     setIsMounted(true);
//     const loadDraft = () => {
//       try {
//         const savedDraft = localStorage.getItem(BANNER_DRAFT_KEY);
//         if (savedDraft) {
//           const draft = JSON.parse(savedDraft);
//           if (draft.bgImage) {
//             setFormData(draft);
//           }
//         }
//       } catch (error) {
//         console.error('Error loading draft:', error);
//       }
//     };
//     loadDraft();
//   }, []);

//   useEffect(() => {
//     if (isMounted) {
//       try {
//         localStorage.setItem(BANNER_DRAFT_KEY, JSON.stringify(formData));
//       } catch (error) {
//         console.error('Error saving draft:', error);
//       }
//     }
//   }, [formData, isMounted]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const addTrustIndicator = () => {
//     if (trustInput.trim() && formData.trustIndicators.length < 6) {
//       setFormData(prev => ({
//         ...prev,
//         trustIndicators: [...prev.trustIndicators, trustInput.trim()]
//       }));
//       setTrustInput('');
//     }
//   };

//   const removeTrustIndicator = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       trustIndicators: prev.trustIndicators.filter((_, i) => i !== index)
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.bgImage) {
//       newErrors.bgImage = 'Background image is required';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error('Please upload a background image');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const payload = {
//         tagline: formData.tagline,
//         title: formData.title,
//         highlightedText: formData.highlightedText,
//         description: formData.description,
//         bgImage: formData.bgImage,
//         ctaLabel: formData.ctaLabel,
//         ctaHref: formData.ctaHref,
//         trustIndicators: formData.trustIndicators,
//         displayOrder: parseInt(formData.displayOrder) || 0, // ✅ Send displayOrder
//         isActive: formData.isActive,
//         isPublished: formData.isPublished,
//         showOnHomepage: formData.showOnHomepage
//       };

//       const response = await fetch('http://localhost:5000/api/banners', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Banner created successfully! (Order: ${data.data.displayOrder})`);
//         localStorage.removeItem(BANNER_DRAFT_KEY);
//         router.push('/authorize/banner-management');
//       } else {
//         toast.error(data.error || 'Failed to create banner');
//       }
//     } catch (error) {
//       console.error('Error creating banner:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleClearDraft = () => {
//     if (confirm('Are you sure you want to clear the draft?')) {
//       localStorage.removeItem(BANNER_DRAFT_KEY);
//       setFormData({
//         tagline: '',
//         title: '',
//         highlightedText: '',
//         description: '',
//         bgImage: DEFAULT_BG_IMAGE,
//         ctaLabel: 'Explore the Collection',
//         ctaHref: '/collection',
//         trustIndicators: ['Heirloom Quality', 'Sustainably Made', 'Lifetime Care'],
//         displayOrder: 0,
//         isActive: true,
//         isPublished: true,
//         showOnHomepage: true
//       });
//       toast.success('Draft cleared');
//     }
//   };

//   const handleSaveDraft = () => {
//     setIsSavingDraft(true);
//     try {
//       localStorage.setItem(BANNER_DRAFT_KEY, JSON.stringify(formData));
//       setTimeout(() => {
//         setIsSavingDraft(false);
//         toast.success('Draft saved successfully!');
//       }, 500);
//     } catch (error) {
//       setIsSavingDraft(false);
//       toast.error('Failed to save draft');
//     }
//   };

//   const generatePreview = () => ({
//     tagline: formData.tagline,
//     title: formData.title,
//     highlightedText: formData.highlightedText,
//     description: formData.description,
//     bgImage: formData.bgImage || DEFAULT_BG_IMAGE,
//     ctaLabel: formData.ctaLabel,
//     ctaHref: formData.ctaHref,
//     trustIndicators: formData.trustIndicators
//   });

//   return (
//     <ProtectedRoute pageKey="create_banner">
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <div className="bg-white border-b shadow-sm sticky top-0 z-10">
//           <div className="px-4 sm:px-6 py-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 <NextLink href="/authorize/banner-management" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </NextLink>
//                 <div>
//                   <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//                     <Sparkles className="w-5 h-5 text-[#8B9D83]" />
//                     Create Hero Banner
//                   </h1>
//                   <p className="text-sm text-gray-500 mt-0.5">Only background image is required</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={handleClearDraft}
//                   className="flex items-center gap-1.5 px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   Clear Draft
//                 </button>
//                 <button
//                   onClick={handleSaveDraft}
//                   disabled={isSavingDraft}
//                   className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#8B9D83] text-white rounded-lg hover:bg-[#7A8A73] transition-colors disabled:opacity-50"
//                 >
//                   {isSavingDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                   Save Draft
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-4 sm:p-6">
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Left Column - Form Fields */}
//               <div className="space-y-6">
//                 {/* Content Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <Type className="w-5 h-5 text-[#8B9D83]" />
//                       Banner Content
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">All text fields are optional</p>
//                   </div>
//                   <div className="p-5 space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Tagline / Badge</label>
//                       <input
//                         type="text"
//                         name="tagline"
//                         value={formData.tagline}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
//                         placeholder="e.g., Timeless Collection"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Main Heading</label>
//                       <input
//                         type="text"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
//                         placeholder="e.g., Timeless Comfort,"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Highlighted Text</label>
//                       <input
//                         type="text"
//                         name="highlightedText"
//                         value={formData.highlightedText}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
//                         placeholder="e.g., Modern Craftsmanship. (shows in green)"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                       <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows={2}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition resize-none"
//                         placeholder="Describe your collection..."
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Buttons Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <LinkIcon className="w-5 h-5 text-[#8B9D83]" />
//                       CTA Button
//                     </h2>
//                   </div>
//                   <div className="p-5 space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Button Label</label>
//                       <input
//                         type="text"
//                         name="ctaLabel"
//                         value={formData.ctaLabel}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
//                         placeholder="Explore the Collection"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
//                       <input
//                         type="text"
//                         name="ctaHref"
//                         value={formData.ctaHref}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
//                         placeholder="/collection"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Trust Indicators Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <CheckSquare className="w-5 h-5 text-[#8B9D83]" />
//                       Trust Indicators
//                     </h2>
//                   </div>
//                   <div className="p-5 space-y-3">
//                     <div className="flex flex-wrap gap-2">
//                       {formData.trustIndicators.map((indicator, index) => (
//                         <span
//                           key={index}
//                           className="inline-flex items-center gap-1 px-3 py-1 bg-[#8B9D83]/10 text-[#8B9D83] rounded-full text-sm"
//                         >
//                           {indicator}
//                           <button
//                             type="button"
//                             onClick={() => removeTrustIndicator(index)}
//                             className="hover:text-red-500 transition-colors"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="text"
//                         value={trustInput}
//                         onChange={(e) => setTrustInput(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && addTrustIndicator()}
//                         placeholder="Add trust indicator..."
//                         className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
//                       />
//                       <button
//                         type="button"
//                         onClick={addTrustIndicator}
//                         className="px-4 py-2 bg-[#8B9D83] text-white rounded-lg hover:bg-[#7A8A73] transition-colors text-sm"
//                       >
//                         Add
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Display Settings - WITH Display Order Field */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <Settings className="w-5 h-5 text-[#8B9D83]" />
//                       Display Settings
//                     </h2>
//                   </div>
//                   <div className="p-5 space-y-4">
//                     {/* ✅ Display Order Field - Now Showing */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Display Order
//                         <span className="text-xs text-gray-400 ml-2">(Auto-filled based on last banner)</span>
//                       </label>
//                       <div className="relative">
//                         <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           type="number"
//                           name="displayOrder"
//                           value={formData.displayOrder}
//                           onChange={handleChange}
//                           className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
//                           min="0"
//                           disabled={isLoadingOrder}
//                         />
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">
//                         {isLoadingOrder ? 'Loading next available order...' : 'Lower number appears first in the carousel'}
//                       </p>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="isActive"
//                           checked={formData.isActive}
//                           onChange={handleChange}
//                           className="w-4 h-4 rounded border-gray-300 text-[#8B9D83] focus:ring-[#8B9D83]"
//                         />
//                         <span className="text-sm text-gray-700">Active</span>
//                       </label>
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="isPublished"
//                           checked={formData.isPublished}
//                           onChange={handleChange}
//                           className="w-4 h-4 rounded border-gray-300 text-[#8B9D83] focus:ring-[#8B9D83]"
//                         />
//                         <span className="text-sm text-gray-700">Published</span>
//                       </label>
//                       <label className="flex items-center gap-2 cursor-pointer col-span-2">
//                         <input
//                           type="checkbox"
//                           name="showOnHomepage"
//                           checked={formData.showOnHomepage}
//                           onChange={handleChange}
//                           className="w-4 h-4 rounded border-gray-300 text-[#8B9D83] focus:ring-[#8B9D83]"
//                         />
//                         <span className="text-sm text-gray-700">Show on Homepage</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Images */}
//               <div className="space-y-6">
//                 {/* Background Image Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-20">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <ImageIcon className="w-5 h-5 text-[#8B9D83]" />
//                       Background Image <span className="text-red-500">*</span>
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">Main background image for the hero banner</p>
//                   </div>
//                   <div className="p-5">
//                     <ImageUploadField
//                       imageUrl={formData.bgImage}
//                       onImageChange={(url) => setFormData(prev => ({ ...prev, bgImage: url }))}
//                       onImageRemove={() => setFormData(prev => ({ ...prev, bgImage: '' }))}
//                       label="Upload Background Image"
//                       required={true}
//                       helpText="Recommended: 1896x807px, JPG or WebP"
//                       defaultImage={DEFAULT_BG_IMAGE}
//                     />
//                     {errors.bgImage && <p className="text-xs text-red-600 mt-1">{errors.bgImage}</p>}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Preview Section */}
//             <div className="mt-8">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <Eye className="w-5 h-5 text-[#8B9D83]" />
//                   Live Preview
//                 </h2>
//                 <span className="text-xs text-gray-500">How your banner will appear on the homepage</span>
//               </div>

//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                 <PreviewBanner slide={generatePreview()} />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6 flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B9D83] to-[#7A8A73] text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Creating Banner...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Sparkles className="w-4 h-4" />
//                     <span>Create Banner</span>
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

  // Drag state — track which item is being dragged
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
        // Sort by displayOrder to ensure correct initial order
        const sortedSlides = (data.data.slides || [])
          .map((s) => ({
            ...s,
            _id: s._id,
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
          // Order = current array index → drives carousel order on homepage
          slides: slides.map((s, idx) => ({
            _id: s._id || undefined,
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
                <strong className="text-gray-700">Preview:</strong> The order
                you set here drives the frontend display. Hero slides autoplay
                in this order every 5 seconds. Announcements scroll in this
                order from right to left. If a slide has no button label, no
                button will appear.
              </span>
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}