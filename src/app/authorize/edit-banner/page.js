
// // app/authorize/edit-banner/page.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import NextLink from 'next/link';
// import { 
//   ArrowLeft, 
//   Save, 
//   Loader2, 
//   X,
//   Upload,
//   Image as ImageIcon,
//   Trash2,
//   Eye,
//   CheckCircle,
//   AlertCircle,
//   Link as LinkIcon,
//   Sparkles,
//   Settings,
//   EyeOff
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';
// import { FaArrowRight } from 'react-icons/fa';

// // Default images
// const DEFAULT_LEFT_IMAGE = '/images/lbg9.PNG';

// // ============================================================
// // CLOUDINARY UPLOAD FUNCTION
// // ============================================================

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

// // ============================================================
// // IMAGE UPLOAD COMPONENT
// // ============================================================

// const ImageUploadField = ({ 
//   imageUrl, 
//   onImageChange, 
//   onImageRemove, 
//   label, 
//   required = false,
//   aspectRatio = '16/9',
//   helpText = '',
//   defaultImage = ''
// }) => {
//   const fileInputRef = useRef(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [preview, setPreview] = useState(imageUrl || defaultImage || '');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setPreview(imageUrl || defaultImage || '');
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
//           <div className={`rounded-lg overflow-hidden border-2 border-pink-500/30 bg-gray-100`}
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
//             className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm disabled:opacity-50"
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

// // ============================================================
// // PREVIEW BANNER COMPONENT
// // ============================================================

// const PreviewBanner = ({ slide }) => {
//   const FONT_FAMILY = "'Courgette', cursive";
//   const FONT_FAMILY_INTER = "'Inter', sans-serif";

//   if (!slide) return null;

//   return (
//     <div className="relative overflow-hidden bg-[#F8F1F4]">
//       <div className="relative grid lg:grid-cols-[1.05fr_1fr] min-h-[400px] lg:min-h-[460px]">

//         {/* Left Panel */}
//         <div
//           className="relative flex items-center px-6 sm:px-10 lg:px-16 py-12 lg:py-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: `url('${slide.leftPanelBgImage || DEFAULT_LEFT_IMAGE}')`,
//           }}
//         >
//           <div className="absolute inset-0 bg-black/50" />
//           <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-[#EE4275]/20 blur-3xl pointer-events-none" />
//           <div
//             className="absolute inset-0 opacity-[0.04] pointer-events-none"
//             style={{
//               backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
//               backgroundSize: '28px 28px',
//             }}
//           />

//           <div className="relative z-10 max-w-xl">
//             <div className="inline-flex items-center gap-2 mb-4">
//               <span className="h-px w-8 bg-[#EE4275]" />
//               <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#F0A6BE]" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                 {slide.eyebrow || 'New In — Beauty Edit'}
//               </span>
//             </div>

//             <h1 className="text-2xl sm:text-3xl lg:text-[2.8rem] leading-[1.08] font-bold text-white mb-4" style={{ fontFamily: FONT_FAMILY }}>
//               {slide.title || 'Your Beauty Title'}
//             </h1>

//             <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-md mb-6" style={{ fontFamily: FONT_FAMILY }}>
//               {slide.subtitle || 'Your beauty description'}
//             </p>

//             <div className="flex flex-wrap items-center gap-4">
//               <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EE4275] text-white rounded-full font-medium text-sm hover:bg-[#d63868] transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                 {slide.ctaLabel || 'Shop Now'}
//                 <FaArrowRight className="w-3.5 h-3.5" />
//               </button>
//               <span className="text-white/70 text-sm font-medium border-b border-white/20 pb-0.5" style={{ fontFamily: FONT_FAMILY }}>
//                 {slide.secondaryLabel || 'Our story'}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="relative min-h-[200px] lg:min-h-0 overflow-hidden">
//           <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${slide.rightPanelBgImage || '/images/login.jpg'}')` }} />
//         </div>

//         {/* Center Circle */}
//         <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 hidden sm:block" style={{ left: '51.22%' }}>
//           <div className="w-[200px] h-[200px] lg:w-[280px] lg:h-[280px] rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/20 shadow-2xl">
//             <div className="w-[88%] h-[88%] rounded-full overflow-hidden relative bg-black/10">
//               <img
//                 src={slide.circleImage || '/images/f.PNG'}
//                 alt="Product"
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = '/images/f.PNG';
//                 }}
//               />
//             </div>
//           </div>

//           {slide.badgeText && (
//             <div className="absolute z-30 -top-4 -right-6 lg:-right-8 bg-white rounded-full w-20 h-20 lg:w-24 lg:h-24 flex flex-col items-center justify-center text-center shadow-sm rotate-6">
//               <span className="block text-[#EE4275] font-bold text-xs sm:text-sm leading-none" style={{ fontFamily: FONT_FAMILY }}>
//                 {slide.badgeText.match(/[\d+]+%|\d\+\d/)?.[0] || slide.badgeText.split(' ')[0]}
//               </span>
//               <span className="block text-[8px] sm:text-[9px] text-[#8B7A8C] uppercase tracking-wide mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                 {slide.badgeText.replace(/[\d+]+%|\d\+\d/, '').trim() || 'Limited time'}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // MAIN EDIT BANNER COMPONENT
// // ============================================================

// export default function EditBannerPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const bannerId = searchParams.get('id');
  
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSavingDraft, setIsSavingDraft] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   const [formData, setFormData] = useState({
//     eyebrow: '',
//     title: '',
//     subtitle: '',
//     description: '',
//     badgeText: '',
//     leftPanelBgImage: DEFAULT_LEFT_IMAGE,
//     circleImage: '',
//     rightPanelBgImage: '',
//     ctaLabel: 'Shop the edit',
//     ctaHref: '/products',
//     secondaryLabel: 'Our story',
//     secondaryHref: '/about',
//     displayOrder: 0,
//     isActive: true,
//     isPublished: true,
//     showOnHomepage: true,
//     showOnMobile: true
//   });

//   const [errors, setErrors] = useState({});
//   const [originalBanner, setOriginalBanner] = useState(null);

//   const BANNER_DRAFT_KEY = `beauty_banner_draft_${bannerId}`;

//   useEffect(() => {
//     setIsMounted(true);
//     if (!bannerId) {
//       toast.error('No banner ID provided');
//       router.push('/authorize/banner-management');
//       return;
//     }
//     loadBanner();
//   }, [bannerId]);

//   const loadBanner = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/banners/${bannerId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         const banner = data.data;
//         setOriginalBanner(banner);
        
//         // Check for saved draft
//         try {
//           const savedDraft = localStorage.getItem(BANNER_DRAFT_KEY);
//           if (savedDraft) {
//             const draft = JSON.parse(savedDraft);
//             if (draft.title || draft.eyebrow) {
//               setFormData(draft);
//               toast.info('Loaded from draft');
//               return;
//             }
//           }
//         } catch (error) {
//           console.error('Error loading draft:', error);
//         }

//         setFormData({
//           eyebrow: banner.eyebrow || '',
//           title: banner.title || '',
//           subtitle: banner.subtitle || '',
//           description: banner.description || '',
//           badgeText: banner.badgeText || '',
//           leftPanelBgImage: banner.leftPanelBgImage || DEFAULT_LEFT_IMAGE,
//           circleImage: banner.circleImage || '',
//           rightPanelBgImage: banner.rightPanelBgImage || '',
//           ctaLabel: banner.ctaLabel || 'Shop the edit',
//           ctaHref: banner.ctaHref || '/products',
//           secondaryLabel: banner.secondaryLabel || 'Our story',
//           secondaryHref: banner.secondaryHref || '/about',
//           displayOrder: banner.displayOrder || 0,
//           isActive: banner.isActive !== undefined ? banner.isActive : true,
//           isPublished: banner.isPublished !== undefined ? banner.isPublished : true,
//           showOnHomepage: banner.showOnHomepage !== undefined ? banner.showOnHomepage : true,
//           showOnMobile: banner.showOnMobile !== undefined ? banner.showOnMobile : true
//         });
//       } else {
//         toast.error(data.error || 'Failed to load banner');
//         router.push('/authorize/banner-management');
//       }
//     } catch (error) {
//       console.error('Error loading banner:', error);
//       toast.error('Failed to load banner');
//       router.push('/authorize/banner-management');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Auto-save draft
//   useEffect(() => {
//     if (isMounted && !isLoading && originalBanner) {
//       try {
//         localStorage.setItem(BANNER_DRAFT_KEY, JSON.stringify(formData));
//       } catch (error) {
//         console.error('Error saving draft:', error);
//       }
//     }
//   }, [formData, isMounted, isLoading, originalBanner]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.title?.trim()) newErrors.title = 'Title is required';
//     if (!formData.circleImage) newErrors.circleImage = 'Circle image is required';
//     if (!formData.rightPanelBgImage) newErrors.rightPanelBgImage = 'Right panel background image is required';
//     if (!formData.ctaLabel?.trim()) newErrors.ctaLabel = 'CTA label is required';
//     if (!formData.ctaHref?.trim()) newErrors.ctaHref = 'CTA link is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       const firstError = Object.keys(errors)[0];
//       if (firstError) {
//         const element = document.querySelector(`[name="${firstError}"]`);
//         if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const payload = {
//         eyebrow: formData.eyebrow,
//         title: formData.title,
//         subtitle: formData.subtitle,
//         description: formData.description,
//         badgeText: formData.badgeText,
//         leftPanelBgImage: formData.leftPanelBgImage || DEFAULT_LEFT_IMAGE,
//         circleImage: formData.circleImage,
//         rightPanelBgImage: formData.rightPanelBgImage,
//         ctaLabel: formData.ctaLabel,
//         ctaHref: formData.ctaHref,
//         secondaryLabel: formData.secondaryLabel,
//         secondaryHref: formData.secondaryHref,
//         displayOrder: formData.displayOrder,
//         isActive: formData.isActive,
//         isPublished: formData.isPublished,
//         showOnHomepage: formData.showOnHomepage,
//         showOnMobile: formData.showOnMobile
//       };

//       const response = await fetch(`http://localhost:5000/api/banners/${bannerId}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Banner updated successfully!');
//         localStorage.removeItem(BANNER_DRAFT_KEY);
//         router.push('/authorize/banner-management');
//       } else {
//         toast.error(data.error || 'Failed to update banner');
//         console.error('Banner update error:', data);
//       }
//     } catch (error) {
//       console.error('Error updating banner:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleClearDraft = () => {
//     if (confirm('Are you sure you want to clear the draft? All unsaved data will be lost.')) {
//       localStorage.removeItem(BANNER_DRAFT_KEY);
//       if (originalBanner) {
//         setFormData({
//           eyebrow: originalBanner.eyebrow || '',
//           title: originalBanner.title || '',
//           subtitle: originalBanner.subtitle || '',
//           description: originalBanner.description || '',
//           badgeText: originalBanner.badgeText || '',
//           leftPanelBgImage: originalBanner.leftPanelBgImage || DEFAULT_LEFT_IMAGE,
//           circleImage: originalBanner.circleImage || '',
//           rightPanelBgImage: originalBanner.rightPanelBgImage || '',
//           ctaLabel: originalBanner.ctaLabel || 'Shop the edit',
//           ctaHref: originalBanner.ctaHref || '/products',
//           secondaryLabel: originalBanner.secondaryLabel || 'Our story',
//           secondaryHref: originalBanner.secondaryHref || '/about',
//           displayOrder: originalBanner.displayOrder || 0,
//           isActive: originalBanner.isActive !== undefined ? originalBanner.isActive : true,
//           isPublished: originalBanner.isPublished !== undefined ? originalBanner.isPublished : true,
//           showOnHomepage: originalBanner.showOnHomepage !== undefined ? originalBanner.showOnHomepage : true,
//           showOnMobile: originalBanner.showOnMobile !== undefined ? originalBanner.showOnMobile : true
//         });
//       }
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

//   // Generate preview
//   const generatePreview = () => {
//     return {
//       eyebrow: formData.eyebrow || 'New In — Beauty Edit',
//       title: formData.title || 'Your Beauty Title',
//       subtitle: formData.subtitle || formData.description || 'Your beauty description',
//       badgeText: formData.badgeText || 'Up to 30% off',
//       leftPanelBgImage: formData.leftPanelBgImage || DEFAULT_LEFT_IMAGE,
//       circleImage: formData.circleImage || '/images/f.PNG',
//       rightPanelBgImage: formData.rightPanelBgImage || '/images/login.jpg',
//       ctaLabel: formData.ctaLabel || 'Shop Now',
//       ctaHref: formData.ctaHref || '/products',
//       secondaryLabel: formData.secondaryLabel || 'Our story',
//       secondaryHref: formData.secondaryHref || '/about'
//     };
//   };

//   // Get status badges
//   const getStatusBadges = () => {
//     const badges = [];
//     if (formData.isActive) {
//       badges.push({ label: 'Active', color: 'bg-green-100 text-green-700' });
//     } else {
//       badges.push({ label: 'Inactive', color: 'bg-gray-100 text-gray-500' });
//     }
//     if (formData.isPublished) {
//       badges.push({ label: 'Published', color: 'bg-blue-100 text-blue-700' });
//     } else {
//       badges.push({ label: 'Draft', color: 'bg-gray-100 text-gray-500' });
//     }
//     return badges;
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-pink-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-500">Loading banner...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="edit_banner">
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <div className="bg-white border-b shadow-sm sticky top-0 z-10">
//           <div className="px-4 sm:px-6 py-3 sm:py-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div className="flex items-center gap-2 sm:gap-4">
//                 <NextLink href="/authorize/banner-management" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </NextLink>
//                 <div className="min-w-0 flex-1">
//                   <div className="flex items-center gap-2">
//                     <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
//                     <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
//                       Edit Banner
//                     </h1>
//                   </div>
//                   <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
//                     {formData.title || 'Untitled Banner'}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
//                 <div className="flex items-center gap-1.5">
//                   {getStatusBadges().map((badge, idx) => (
//                     <span key={idx} className={`px-2 py-0.5 text-xs rounded-full ${badge.color}`}>
//                       {badge.label}
//                     </span>
//                   ))}
//                 </div>
//                 <button
//                   onClick={handleClearDraft}
//                   className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   Clear Draft
//                 </button>
//                 <button
//                   onClick={handleSaveDraft}
//                   disabled={isSavingDraft}
//                   className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50"
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
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Left Column - Form Fields */}
//               <div className="lg:col-span-2 space-y-6">
//                 {/* Basic Information Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-4 sm:p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <Sparkles className="w-5 h-5 text-pink-600" />
//                       Banner Content
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">All text fields are optional except Title</p>
//                   </div>
//                   <div className="p-4 sm:p-5 space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Eyebrow</label>
//                       <input
//                         type="text"
//                         name="eyebrow"
//                         value={formData.eyebrow}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
//                         placeholder="e.g., New In — Beauty Edit"
//                       />
//                       <p className="text-xs text-gray-400 mt-1">Small tagline above the title</p>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
//                       <input
//                         type="text"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="e.g., Skin that speaks before you do"
//                       />
//                       {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Description</label>
//                       <textarea
//                         name="subtitle"
//                         value={formData.subtitle}
//                         onChange={handleChange}
//                         rows={2}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition resize-none"
//                         placeholder="Describe your beauty product or collection..."
//                       />
//                     </div>

//                     {/* <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
//                       <input
//                         type="text"
//                         name="badgeText"
//                         value={formData.badgeText}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
//                         placeholder="e.g., Up to 30% off"
//                       />
//                       <p className="text-xs text-gray-400 mt-1">Shown on the circle badge</p>
//                     </div> */}
//                   </div>
//                 </div>

//                 {/* Buttons Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-4 sm:p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <LinkIcon className="w-5 h-5 text-pink-600" />
//                       Buttons
//                     </h2>
//                   </div>
//                   <div className="p-4 sm:p-5 space-y-4">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Label <span className="text-red-500">*</span></label>
//                         <input
//                           type="text"
//                           name="ctaLabel"
//                           value={formData.ctaLabel}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.ctaLabel ? 'border-red-500' : 'border-gray-300'}`}
//                           placeholder="Shop the edit"
//                         />
//                         {errors.ctaLabel && <p className="text-xs text-red-600 mt-1">{errors.ctaLabel}</p>}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Link <span className="text-red-500">*</span></label>
//                         <input
//                           type="text"
//                           name="ctaHref"
//                           value={formData.ctaHref}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition ${errors.ctaHref ? 'border-red-500' : 'border-gray-300'}`}
//                           placeholder="/products"
//                         />
//                         {errors.ctaHref && <p className="text-xs text-red-600 mt-1">{errors.ctaHref}</p>}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Label</label>
//                         <input
//                           type="text"
//                           name="secondaryLabel"
//                           value={formData.secondaryLabel}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
//                           placeholder="Our story"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Link</label>
//                         <input
//                           type="text"
//                           name="secondaryHref"
//                           value={formData.secondaryHref}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
//                           placeholder="/about"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Images */}
//               <div className="space-y-6">
//                 {/* Circle Image Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-4 sm:p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <ImageIcon className="w-5 h-5 text-pink-600" />
//                       Circle Image <span className="text-red-500 text-sm">*</span>
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Main product image in the center circle</p>
//                   </div>
//                   <div className="p-4 sm:p-5">
//                     <ImageUploadField
//                       imageUrl={formData.circleImage}
//                       onImageChange={(url) => setFormData(prev => ({ ...prev, circleImage: url }))}
//                       onImageRemove={() => setFormData(prev => ({ ...prev, circleImage: '' }))}
//                       label="Upload Circle Image"
//                       required={true}
//                       aspectRatio="1/1"
//                       helpText="Recommended: Square image, 400x400px"
//                     />
//                     {errors.circleImage && <p className="text-xs text-red-600 mt-1">{errors.circleImage}</p>}
//                   </div>
//                 </div>

//                 {/* Right Panel Image Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-4 sm:p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <ImageIcon className="w-5 h-5 text-pink-600" />
//                       Right Panel Image <span className="text-red-500 text-sm">*</span>
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Full background image for the right panel</p>
//                   </div>
//                   <div className="p-4 sm:p-5">
//                     <ImageUploadField
//                       imageUrl={formData.rightPanelBgImage}
//                       onImageChange={(url) => setFormData(prev => ({ ...prev, rightPanelBgImage: url }))}
//                       onImageRemove={() => setFormData(prev => ({ ...prev, rightPanelBgImage: '' }))}
//                       label="Upload Right Panel Image"
//                       required={true}
//                       aspectRatio="16/9"
//                       helpText="Recommended: 1920x1080px, JPG or WebP"
//                     />
//                     {errors.rightPanelBgImage && <p className="text-xs text-red-600 mt-1">{errors.rightPanelBgImage}</p>}
//                   </div>
//                 </div>

//                 {/* Left Panel Image Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-4 sm:p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <ImageIcon className="w-5 h-5 text-pink-600" />
//                       Left Panel Image
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Background image for the left panel (optional)</p>
//                   </div>
//                   <div className="p-4 sm:p-5">
//                     <ImageUploadField
//                       imageUrl={formData.leftPanelBgImage}
//                       onImageChange={(url) => setFormData(prev => ({ ...prev, leftPanelBgImage: url }))}
//                       onImageRemove={() => setFormData(prev => ({ ...prev, leftPanelBgImage: DEFAULT_LEFT_IMAGE }))}
//                       label="Upload Left Panel Image"
//                       required={false}
//                       aspectRatio="16/9"
//                       helpText="Default image will be used if not uploaded"
//                       defaultImage={DEFAULT_LEFT_IMAGE}
//                     />
//                   </div>
//                 </div>

//                 {/* Display Settings */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-4 sm:p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <Settings className="w-5 h-5 text-pink-600" />
//                       Display Settings
//                     </h2>
//                   </div>
//                   <div className="p-4 sm:p-5 space-y-3">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
//                       <input
//                         type="number"
//                         name="displayOrder"
//                         value={formData.displayOrder}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none transition"
//                         min="0"
//                       />
//                       <p className="text-xs text-gray-400 mt-1">Lower number appears first</p>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="isActive"
//                           checked={formData.isActive}
//                           onChange={handleChange}
//                           className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
//                         />
//                         <span className="text-sm text-gray-700">Active</span>
//                       </label>
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="isPublished"
//                           checked={formData.isPublished}
//                           onChange={handleChange}
//                           className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
//                         />
//                         <span className="text-sm text-gray-700">Published</span>
//                       </label>
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="showOnHomepage"
//                           checked={formData.showOnHomepage}
//                           onChange={handleChange}
//                           className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
//                         />
//                         <span className="text-sm text-gray-700">Show on Homepage</span>
//                       </label>
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="showOnMobile"
//                           checked={formData.showOnMobile}
//                           onChange={handleChange}
//                           className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
//                         />
//                         <span className="text-sm text-gray-700">Show on Mobile</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Preview Section */}
//             <div className="mt-8">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <Eye className="w-5 h-5 text-pink-600" />
//                   Live Preview
//                 </h2>
//                 <span className="text-xs text-gray-500">This is how your banner will appear on the homepage</span>
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
//                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Updating Banner...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>Update Banner</span>
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

// app/authorize/edit-banner/page.jsx
'use client';

import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon,
  Sparkles,
  Settings,
  EyeOff,
  Type,
  Hash,
  AlignLeft,
  CheckSquare
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { FaArrowRight } from 'react-icons/fa';

// Default images
const DEFAULT_BG_IMAGE = '/images/hh.PNG';

// ============================================================
// CLOUDINARY UPLOAD FUNCTION
// ============================================================

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

// ============================================================
// IMAGE UPLOAD COMPONENT - FIXED
// ============================================================

const ImageUploadField = ({ 
  imageUrl, 
  onImageChange, 
  onImageRemove, 
  label, 
  required = false,
  aspectRatio = '16/9',
  helpText = '',
  defaultImage = ''
}) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(imageUrl || defaultImage || '');
  const [error, setError] = useState('');
  const isRemovedRef = useRef(false);

  useEffect(() => {
    if (isRemovedRef.current) {
      return;
    }
    setPreview(imageUrl || defaultImage || '');
  }, [imageUrl, defaultImage]);

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
    isRemovedRef.current = false;
    
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
    isRemovedRef.current = true;
    setPreview('');
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {preview ? (
        <div className="relative inline-block">
          <div className={`rounded-lg overflow-hidden border-2 border-[#8B9D83]/30 bg-gray-100`}
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
            className="flex items-center gap-2 px-4 py-2 bg-[#8B9D83] text-white rounded-lg hover:bg-[#7A8A73] transition-colors text-sm disabled:opacity-50"
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
      {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

// ============================================================
// PREVIEW BANNER COMPONENT - Updated for new design
// ============================================================

const PreviewBanner = ({ slide }) => {
  const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

  if (!slide) return null;

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${slide.bgImage || DEFAULT_BG_IMAGE}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/5" />
      </div>

      <div className="container mx-auto px-4 md:px-6 h-full relative z-10">
        <div className="flex flex-col justify-end h-full pb-6 md:pb-8 max-w-2xl">
          
          {slide.tagline && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-[#8B9D83]/30 mb-2 w-fit">
              <span className="w-1 h-1 rounded-full bg-[#8B9D83]" />
              <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-white/80">
                {slide.tagline}
              </span>
            </div>
          )}

          {slide.title && (
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-[1.1] tracking-wide text-white mb-1.5">
              {slide.title}
              {slide.highlightedText && (
                <>
                  <br />
                  <span className="text-[#8B9D83] font-medium">
                    {slide.highlightedText}
                  </span>
                </>
              )}
            </h1>
          )}

          {slide.description && (
            <p className="text-sm md:text-base text-white/70 max-w-lg leading-relaxed mb-4">
              {slide.description}
            </p>
          )}

          {slide.ctaLabel && (
            <div>
              <button className="inline-flex items-center gap-1.5 px-5 py-2 md:px-6 md:py-2.5 bg-[#8B9D83] text-white text-xs md:text-sm font-medium transition-all duration-300 shadow-lg">
                {slide.ctaLabel}
                <FaArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {slide.trustIndicators && slide.trustIndicators.length > 0 && (
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/10 flex-wrap">
              {slide.trustIndicators.map((indicator, i) => (
                <Fragment key={i}>
                  <span className="text-[10px] md:text-xs text-white/50 font-medium tracking-[0.15em] uppercase">
                    {indicator}
                  </span>
                  {i < slide.trustIndicators.length - 1 && (
                    <span className="w-px h-3 bg-white/15" />
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN EDIT BANNER COMPONENT
// ============================================================

export default function EditBannerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bannerId = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    tagline: '',
    title: '',
    highlightedText: '',
    description: '',
    bgImage: DEFAULT_BG_IMAGE,
    ctaLabel: 'Explore the Collection',
    ctaHref: '/collection',
    trustIndicators: ['Heirloom Quality', 'Sustainably Made', 'Lifetime Care'],
    displayOrder: 0,
    isActive: true,
    isPublished: true,
    showOnHomepage: true
  });

  const [errors, setErrors] = useState({});
  const [originalBanner, setOriginalBanner] = useState(null);
  const [trustInput, setTrustInput] = useState('');

  const BANNER_DRAFT_KEY = `hero_banner_draft_${bannerId}`;

  useEffect(() => {
    setIsMounted(true);
    if (!bannerId) {
      toast.error('No banner ID provided');
      router.push('/authorize/banner-management');
      return;
    }
    loadBanner();
  }, [bannerId]);

  const loadBanner = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/banners/${bannerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        const banner = data.data;
        setOriginalBanner(banner);
        
        // Check for saved draft
        try {
          const savedDraft = localStorage.getItem(BANNER_DRAFT_KEY);
          if (savedDraft) {
            const draft = JSON.parse(savedDraft);
            if (draft.title || draft.tagline) {
              setFormData(draft);
              toast.info('Loaded from draft');
              return;
            }
          }
        } catch (error) {
          console.error('Error loading draft:', error);
        }

        setFormData({
          tagline: banner.tagline || '',
          title: banner.title || '',
          highlightedText: banner.highlightedText || '',
          description: banner.description || '',
          bgImage: banner.bgImage || DEFAULT_BG_IMAGE,
          ctaLabel: banner.ctaLabel || 'Explore the Collection',
          ctaHref: banner.ctaHref || '/collection',
          trustIndicators: banner.trustIndicators || ['Heirloom Quality', 'Sustainably Made', 'Lifetime Care'],
          displayOrder: banner.displayOrder || 0,
          isActive: banner.isActive !== undefined ? banner.isActive : true,
          isPublished: banner.isPublished !== undefined ? banner.isPublished : true,
          showOnHomepage: banner.showOnHomepage !== undefined ? banner.showOnHomepage : true
        });
      } else {
        toast.error(data.error || 'Failed to load banner');
        router.push('/authorize/banner-management');
      }
    } catch (error) {
      console.error('Error loading banner:', error);
      toast.error('Failed to load banner');
      router.push('/authorize/banner-management');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-save draft
  useEffect(() => {
    if (isMounted && !isLoading && originalBanner) {
      try {
        localStorage.setItem(BANNER_DRAFT_KEY, JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    }
  }, [formData, isMounted, isLoading, originalBanner]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const addTrustIndicator = () => {
    if (trustInput.trim() && formData.trustIndicators.length < 6) {
      setFormData(prev => ({
        ...prev,
        trustIndicators: [...prev.trustIndicators, trustInput.trim()]
      }));
      setTrustInput('');
    }
  };

  const removeTrustIndicator = (index) => {
    setFormData(prev => ({
      ...prev,
      trustIndicators: prev.trustIndicators.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.bgImage) {
      newErrors.bgImage = 'Background image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please upload a background image');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        tagline: formData.tagline || '',
        title: formData.title || '',
        highlightedText: formData.highlightedText || '',
        description: formData.description || '',
        bgImage: formData.bgImage || DEFAULT_BG_IMAGE,
        ctaLabel: formData.ctaLabel || 'Explore the Collection',
        ctaHref: formData.ctaHref || '/collection',
        trustIndicators: formData.trustIndicators || ['Heirloom Quality', 'Sustainably Made', 'Lifetime Care'],
        displayOrder: parseInt(formData.displayOrder) || 0,
        isActive: formData.isActive,
        isPublished: formData.isPublished,
        showOnHomepage: formData.showOnHomepage
      };

      const response = await fetch(`http://localhost:5000/api/banners/${bannerId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Banner updated successfully!');
        localStorage.removeItem(BANNER_DRAFT_KEY);
        router.push('/authorize/banner-management');
      } else {
        toast.error(data.error || 'Failed to update banner');
        console.error('Banner update error:', data);
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearDraft = () => {
    if (confirm('Are you sure you want to clear the draft? All unsaved data will be lost.')) {
      localStorage.removeItem(BANNER_DRAFT_KEY);
      if (originalBanner) {
        setFormData({
          tagline: originalBanner.tagline || '',
          title: originalBanner.title || '',
          highlightedText: originalBanner.highlightedText || '',
          description: originalBanner.description || '',
          bgImage: originalBanner.bgImage || DEFAULT_BG_IMAGE,
          ctaLabel: originalBanner.ctaLabel || 'Explore the Collection',
          ctaHref: originalBanner.ctaHref || '/collection',
          trustIndicators: originalBanner.trustIndicators || ['Heirloom Quality', 'Sustainably Made', 'Lifetime Care'],
          displayOrder: originalBanner.displayOrder || 0,
          isActive: originalBanner.isActive !== undefined ? originalBanner.isActive : true,
          isPublished: originalBanner.isPublished !== undefined ? originalBanner.isPublished : true,
          showOnHomepage: originalBanner.showOnHomepage !== undefined ? originalBanner.showOnHomepage : true
        });
      }
      toast.success('Draft cleared');
    }
  };

  const handleSaveDraft = () => {
    setIsSavingDraft(true);
    try {
      localStorage.setItem(BANNER_DRAFT_KEY, JSON.stringify(formData));
      setTimeout(() => {
        setIsSavingDraft(false);
        toast.success('Draft saved successfully!');
      }, 500);
    } catch (error) {
      setIsSavingDraft(false);
      toast.error('Failed to save draft');
    }
  };

  // Generate preview
  const generatePreview = () => {
    return {
      tagline: formData.tagline || '',
      title: formData.title || '',
      highlightedText: formData.highlightedText || '',
      description: formData.description || '',
      bgImage: formData.bgImage || DEFAULT_BG_IMAGE,
      ctaLabel: formData.ctaLabel || 'Explore the Collection',
      ctaHref: formData.ctaHref || '/collection',
      trustIndicators: formData.trustIndicators || ['Heirloom Quality', 'Sustainably Made', 'Lifetime Care']
    };
  };

  // Get status badges
  const getStatusBadges = () => {
    const badges = [];
    if (formData.isActive) {
      badges.push({ label: 'Active', color: 'bg-green-100 text-green-700' });
    } else {
      badges.push({ label: 'Inactive', color: 'bg-gray-100 text-gray-500' });
    }
    if (formData.isPublished) {
      badges.push({ label: 'Published', color: 'bg-blue-100 text-blue-700' });
    } else {
      badges.push({ label: 'Draft', color: 'bg-gray-100 text-gray-500' });
    }
    return badges;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#8B9D83] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading banner...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="edit_banner">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4">
                <NextLink href="/authorize/banner-management" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </NextLink>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B9D83]" />
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                      Edit Banner
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                    {formData.title || 'Untitled Banner'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  {getStatusBadges().map((badge, idx) => (
                    <span key={idx} className={`px-2 py-0.5 text-xs rounded-full ${badge.color}`}>
                      {badge.label}
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleClearDraft}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Draft
                </button>
                <button
                  onClick={handleSaveDraft}
                  disabled={isSavingDraft}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-[#8B9D83] text-white rounded-lg hover:bg-[#7A8A73] transition-colors disabled:opacity-50"
                >
                  {isSavingDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                {/* Content Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Type className="w-5 h-5 text-[#8B9D83]" />
                      Banner Content
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">All text fields are optional</p>
                  </div>
                  <div className="p-4 sm:p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tagline / Badge</label>
                      <input
                        type="text"
                        name="tagline"
                        value={formData.tagline}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
                        placeholder="e.g., Timeless Collection"
                      />
                      <p className="text-xs text-gray-400 mt-1">Small badge/tag above the title</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Main Heading</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
                        placeholder="e.g., Timeless Comfort,"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Highlighted Text</label>
                      <input
                        type="text"
                        name="highlightedText"
                        value={formData.highlightedText}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
                        placeholder="e.g., Modern Craftsmanship. (shows in green)"
                      />
                      <p className="text-xs text-gray-400 mt-1">Text that will be highlighted in green</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition resize-none"
                        placeholder="Describe your collection..."
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-[#8B9D83]" />
                      CTA Button
                    </h2>
                  </div>
                  <div className="p-4 sm:p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Button Label</label>
                      <input
                        type="text"
                        name="ctaLabel"
                        value={formData.ctaLabel}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
                        placeholder="Explore the Collection"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                      <input
                        type="text"
                        name="ctaHref"
                        value={formData.ctaHref}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
                        placeholder="/collection"
                      />
                    </div>
                  </div>
                </div>

                {/* Trust Indicators Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <CheckSquare className="w-5 h-5 text-[#8B9D83]" />
                      Trust Indicators
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Shown below the CTA button</p>
                  </div>
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {formData.trustIndicators.map((indicator, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-[#8B9D83]/10 text-[#8B9D83] rounded-full text-sm"
                        >
                          {indicator}
                          <button
                            type="button"
                            onClick={() => removeTrustIndicator(index)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={trustInput}
                        onChange={(e) => setTrustInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTrustIndicator()}
                        placeholder="Add trust indicator..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={addTrustIndicator}
                        className="px-4 py-2 bg-[#8B9D83] text-white rounded-lg hover:bg-[#7A8A73] transition-colors text-sm"
                      >
                        Add
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">Press Enter to add or click the Add button</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Images & Settings */}
              <div className="space-y-6">
                {/* Background Image Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-[#8B9D83]" />
                      Background Image <span className="text-red-500 text-sm">*</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Main background image for the hero banner</p>
                  </div>
                  <div className="p-4 sm:p-5">
                    <ImageUploadField
                      imageUrl={formData.bgImage}
                      onImageChange={(url) => setFormData(prev => ({ ...prev, bgImage: url }))}
                      onImageRemove={() => setFormData(prev => ({ ...prev, bgImage: '' }))}
                      label="Upload Background Image"
                      required={true}
                      aspectRatio="16/9"
                      helpText="Recommended: 1896x807px, JPG or WebP"
                      defaultImage={DEFAULT_BG_IMAGE}
                    />
                    {errors.bgImage && <p className="text-xs text-red-600 mt-1">{errors.bgImage}</p>}
                  </div>
                </div>

                {/* Display Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-[#8B9D83]" />
                      Display Settings
                    </h2>
                  </div>
                  <div className="p-4 sm:p-5 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                      <input
                        type="number"
                        name="displayOrder"
                        value={formData.displayOrder}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none transition"
                        min="0"
                      />
                      <p className="text-xs text-gray-400 mt-1">Lower number appears first in the carousel</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-[#8B9D83] focus:ring-[#8B9D83]"
                        />
                        <span className="text-sm text-gray-700">Active</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isPublished"
                          checked={formData.isPublished}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-[#8B9D83] focus:ring-[#8B9D83]"
                        />
                        <span className="text-sm text-gray-700">Published</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer col-span-2">
                        <input
                          type="checkbox"
                          name="showOnHomepage"
                          checked={formData.showOnHomepage}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-[#8B9D83] focus:ring-[#8B9D83]"
                        />
                        <span className="text-sm text-gray-700">Show on Homepage</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#8B9D83]" />
                  Live Preview
                </h2>
                <span className="text-xs text-gray-500">This is how your banner will appear on the homepage</span>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <PreviewBanner slide={generatePreview()} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B9D83] to-[#7A8A73] text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Banner...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Banner</span>
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