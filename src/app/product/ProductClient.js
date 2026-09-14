

// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Star,
//   ShoppingCart,
//   Truck,
//   ShieldCheck,
//   RotateCcw,
//   AlertCircle,
//   CheckCircle,
//   Minus,
//   Plus,
//   ZoomIn,
//   Sparkles,
//   Play,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Package,
//   Tag,
//   Clock,
//   Copy,
//   Check,
//   Loader2,
//   Eye,
//   FolderTree,
//   Maximize2,
//   Zap,
//   Info,
//   Award,
//   TrendingUp,
//   Flame,
//   Clock as ClockIcon,
//   Building2,
//   Box,
//   Scale,
//   List,
//   FileText,
//   AlertTriangle,
//   Palette,
//   HelpCircle,
//   ChevronDown,
//   Share2,
//   Heart,
//   Link as LinkIcon,
//   ShoppingBag,
//   MessageSquare,
//   ThumbsUp,
//   Filter,
//   Image as ImageIcon,
//   Video,
//   Flower2,
//   Grid,
//   Layers,
//   GripVertical,
//   Circle,
//   Gift

// } from 'lucide-react';

// import { toast } from 'sonner';
// import Footer from '../components/layout/Footer';
// import Navbar from '../components/layout/Navbar';
// import MetadataUpdater from '../product/MetadataUpdater';
// import CartSidebar from '../components/CartSidebar';
// import ReviewModal from '../components/home/ReviewModal';
// import ReviewMediaModal from '../components/ReviewMediaModal';

// // ========== FONT CONSTANTS (Beauty Bucket Theme) ==========
// const FONT_FAMILY_SANS = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_SERIF = "'Playfair Display', Georgia, serif";
// const FONT_FAMILY_CURSIVE = "'Playfair Display', Georgia, serif";

// // ========== COLOR PALETTE (Beauty Bucket) ==========
// // Primary sage:    #8B9D83
// // Primary dark:    #465641
// // Cream background:#FDF7EF
// // Deep text:       #2D1B2E
// // Deep secondary:  #3A4A3F
// // Border light:    #8B9D83/20

// // ========== HELPER FUNCTIONS ==========

// const getTagName = (tag) => {
//   if (!tag) return '';
//   if (typeof tag === 'string') {
//     if (/^[0-9a-fA-F]{24}$/.test(tag)) return '';
//     return tag;
//   }
//   if (typeof tag === 'object') {
//     if (tag.name) return tag.name;
//     if (tag._id && typeof tag._id === 'object' && tag._id.name) return tag._id.name;
//     if (tag.title) return tag.title;
//     if (tag.label) return tag.label;
//     if (Array.isArray(tag) && tag.length > 0) return getTagName(tag[0]);
//     if (tag._id) {
//       if (typeof tag._id === 'string' && /^[0-9a-fA-F]{24}$/.test(tag._id)) return '';
//       if (typeof tag._id === 'object' && tag._id.name) return tag._id.name;
//     }
//     for (const key of ['value', 'text', 'display', 'title', 'label', 'name']) {
//       if (tag[key] && typeof tag[key] === 'string') return tag[key];
//     }
//   }
//   return String(tag);
// };

// const getTagStyles = (tag) => {
//   const tagName = getTagName(tag);
//   const styles = {
//     'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
//     'Trending': 'bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white shadow-lg shadow-[#8B9D83]/30',
//     'New Release': 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-500/30',
//     'Limited Offer': 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg shadow-purple-500/30',
//     'Flash Sale': 'bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white shadow-lg shadow-[#8B9D83]/30',
//     'Clearance': 'bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg shadow-gray-500/30',
//   };
//   return styles[tagName] || 'bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white shadow-lg shadow-[#8B9D83]/30';
// };

// const formatPrice = (price) => {
//   return (price || 0).toFixed(2);
// };

// const calculateDiscount = (regular, discount) => {
//   if (regular && discount && discount < regular) {
//     return Math.round(((regular - discount) / regular) * 100);
//   }
//   return 0;
// };

// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// const getStockStatus = (quantity, alertQuantity) => {
//   if (quantity <= 0) return { label: 'Out of Stock', color: 'red', icon: AlertCircle };
//   if (alertQuantity > 0 && quantity <= alertQuantity) return { label: 'Low Stock', color: 'orange', icon: AlertCircle };
//   return { label: 'In Stock', color: 'green', icon: CheckCircle };
// };

// const truncateText = (text, limit = 35) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// // ========== VIDEO HELPER FUNCTIONS ==========

// const getYouTubeThumbnail = (url) => {
//   if (!url) return null;
//   const patterns = [
//     /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
//     /youtube\.com\/v\/([^&\s?#]+)/,
//     /youtube\.com\/live\/([^&\s?#]+)/
//   ];
//   for (const pattern of patterns) {
//     const match = url.match(pattern);
//     if (match && match[1]) {
//       return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
//     }
//   }
//   return null;
// };

// const generateVideoThumbnail = (videoUrl, callback) => {
//   const video = document.createElement('video');
//   video.crossOrigin = 'Anonymous';
//   video.src = videoUrl;
//   video.currentTime = 1.5;
//   video.addEventListener('loadeddata', () => {
//     setTimeout(() => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       canvas.width = 160;
//       canvas.height = 160;
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
//       callback(thumbnailUrl);
//     }, 100);
//   });
//   video.addEventListener('error', () => {
//     console.error('Error loading video for thumbnail generation');
//     callback(null);
//   });
//   video.load();
// };

// const processHtmlLinks = (html) => {
//   if (!html) return '';
//   const div = document.createElement('div');
//   div.innerHTML = html;
//   const links = div.querySelectorAll('a');
//   links.forEach(link => {
//     link.setAttribute('target', '_blank');
//     link.setAttribute('rel', 'noopener noreferrer');
//   });
//   return div.innerHTML;
// };

// // ========== LOADING SKELETON ==========

// const ProductSkeleton = () => (
//   <div className="min-h-screen bg-[#FDF7EF]">
//     <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
//         <div className="animate-pulse">
//           <div className="bg-[#8B9D83]/10 rounded-2xl h-80 sm:h-96 md:h-[500px] w-full"></div>
//           <div className="flex gap-2 mt-3 md:mt-4">
//             {[1, 2, 3, 4].map(i => (
//               <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 bg-[#8B9D83]/10 rounded-lg"></div>
//             ))}
//           </div>
//         </div>
//         <div className="space-y-3 md:space-y-4 animate-pulse">
//           <div className="h-6 sm:h-7 md:h-8 bg-[#8B9D83]/10 rounded w-3/4"></div>
//           <div className="h-5 sm:h-5 md:h-6 bg-[#8B9D83]/10 rounded w-1/2"></div>
//           <div className="h-20 sm:h-24 md:h-24 bg-[#8B9D83]/10 rounded"></div>
//           <div className="h-10 bg-[#8B9D83]/10 rounded w-full"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // ========== ZOOM MODAL ==========

// const ZoomModal = ({ images, currentIndex, onClose, onImageChange }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
//     onClick={onClose}
//   >
//     <div className="relative w-full h-full flex items-center justify-center">
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onImageChange((currentIndex - 1 + images.length) % images.length);
//         }}
//         className="absolute left-2 sm:left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
//       <motion.div
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.9 }}
//         className="relative max-w-5xl w-full mx-2 sm:mx-4"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <img
//           src={images[currentIndex]?.url}
//           alt="Zoomed product"
//           className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-2xl"
//         />
//       </motion.div>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onImageChange((currentIndex + 1) % images.length);
//         }}
//         className="absolute right-2 sm:right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
//         {currentIndex + 1} / {images.length}
//       </div>
//     </div>
//   </motion.div>
// );


// // const VariantSelector = ({
// //   variantType,
// //   variants,
// //   selectedVariants,
// //   onVariantSelect,
// //   onVariantQuantityChange,
// //   onVariantRemove,
// //   stockQuantity,
// //   onVariantImageSelect,
// //   clearPreviewTrigger,
// //   onPreviewCleared
// // }) => {
// //   const [expandedVariant, setExpandedVariant] = useState(null);
// //   const [expandedSubVariant, setExpandedSubVariant] = useState(null);
// //   const [previewVariantId, setPreviewVariantId] = useState(null);
// //   const [previewSubVariantId, setPreviewSubVariantId] = useState(null);

// //   useEffect(() => {
// //     if (clearPreviewTrigger) {
// //       setPreviewVariantId(null);
// //       setPreviewSubVariantId(null);
// //       if (onPreviewCleared) {
// //         onPreviewCleared();
// //       }
// //     }
// //   }, [clearPreviewTrigger, onPreviewCleared]);

// //   const getVariantImage = (variant) => {
// //     if (variant.imagePreviews && variant.imagePreviews[0]) {
// //       return variant.imagePreviews[0];
// //     }
// //     if (variant.images && variant.images[0]) {
// //       return variant.images[0];
// //     }
// //     if (variant.color) {
// //       return null;
// //     }
// //     return null;
// //   };

// //   const getVariantColor = (variant) => {
// //     return variant.color || null;
// //   };

// //   const getVariantDisplayName = (variant) => {
// //     if (variantType.type === 'color' && variant.color) {
// //       return variant.name;
// //     }
// //     return variant.name;
// //   };

// //   const getVariantImages = (variant) => {
// //     if (variant.imagePreviews && variant.imagePreviews.filter(Boolean).length > 0) {
// //       return variant.imagePreviews.filter(Boolean);
// //     }
// //     if (variant.images && variant.images.filter(Boolean).length > 0) {
// //       return variant.images.filter(Boolean);
// //     }
// //     return [];
// //   };

// //   const getSubVariantImages = (subVariant) => {
// //     if (subVariant.imagePreviews && subVariant.imagePreviews.filter(Boolean).length > 0) {
// //       return subVariant.imagePreviews.filter(Boolean);
// //     }
// //     if (subVariant.images && subVariant.images.filter(Boolean).length > 0) {
// //       return subVariant.images.filter(Boolean);
// //     }
// //     return [];
// //   };

// //   const getVariantId = (variant, index) => {
// //     if (variant.id) return String(variant.id);
// //     if (variant._id) return String(variant._id);
// //     return `variant-${index}-${variant.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
// //   };

// //   const getSubVariantId = (subVariant, subIndex, variantIndex) => {
// //     if (subVariant.id) return String(subVariant.id);
// //     if (subVariant._id) return String(subVariant._id);
// //     return `sub-${variantIndex}-${subIndex}-${subVariant.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
// //   };

// //   const toggleVariantExpand = (e, index) => {
// //     e.stopPropagation();
// //     e.preventDefault();
// //     setExpandedVariant(expandedVariant === index ? null : index);
// //   };

// //   const handleVariantPreview = (e, variant, index) => {
// //     e.stopPropagation();
// //     e.preventDefault();
    
// //     const variantId = getVariantId(variant, index);
// //     const variantImages = getVariantImages(variant);
    
// //     if (previewVariantId === variantId) {
// //       setPreviewVariantId(null);
// //       setPreviewSubVariantId(null);
// //       if (onVariantImageSelect) {
// //         onVariantImageSelect(null, null);
// //       }
// //       return;
// //     }
    
// //     setPreviewVariantId(variantId);
// //     setPreviewSubVariantId(null);
    
// //     if (onVariantImageSelect) {
// //       const variantInfo = {
// //         regularPrice: variant.regularPrice || 0,
// //         discountPrice: variant.discountPrice || 0,
// //         stockQuantity: variant.stockQuantity || 0,
// //         name: variant.name,
// //         type: 'variant'
// //       };
      
// //       if (variantImages.length > 0) {
// //         onVariantImageSelect(variantImages, variantInfo);
// //       } else {
// //         onVariantImageSelect(null, variantInfo);
// //       }
// //     }
// //   };

// //   const handleSubVariantPreview = (e, variant, subVariant, index, subIndex) => {
// //     e.stopPropagation();
// //     e.preventDefault();
    
// //     const variantId = getVariantId(variant, index);
// //     const subVariantId = getSubVariantId(subVariant, subIndex, index);
// //     const subImages = getSubVariantImages(subVariant);
// //     const variantImages = getVariantImages(variant);
    
// //     if (previewSubVariantId === subVariantId) {
// //       setPreviewSubVariantId(null);
// //       setPreviewVariantId(null);
// //       if (onVariantImageSelect) {
// //         onVariantImageSelect(null, null);
// //       }
// //       return;
// //     }
    
// //     setPreviewSubVariantId(subVariantId);
// //     setPreviewVariantId(variantId);
    
// //     const infoSource = {
// //       regularPrice: subVariant.regularPrice || variant.regularPrice || 0,
// //       discountPrice: subVariant.discountPrice || variant.discountPrice || 0,
// //       stockQuantity: subVariant.stockQuantity || variant.stockQuantity || 0,
// //       name: subVariant.name,
// //       type: 'subVariant'
// //     };
    
// //     if (onVariantImageSelect) {
// //       if (subImages.length > 0) {
// //         onVariantImageSelect(subImages, infoSource);
// //       } else if (variantImages.length > 0) {
// //         onVariantImageSelect(variantImages, infoSource);
// //       } else {
// //         onVariantImageSelect(null, infoSource);
// //       }
// //     }
// //   };

// //   const handleVariantToggle = (e, variant, index) => {
// //     e.stopPropagation();
// //     e.preventDefault();

// //     const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
    
// //     if (hasSubVariants) {
// //       toast.info('Please select from the sub-variants below');
// //       return;
// //     }

// //     const variantId = getVariantId(variant, index);
// //     const isSelected = selectedVariants.some(sv => sv.variantId === variantId);
    
// //     if (isSelected) {
// //       onVariantRemove(variantId);
// //     } else {
// //       const maxVariants = 10;
// //       if (selectedVariants.length >= maxVariants) {
// //         toast.error(`You can select up to ${maxVariants} variants`);
// //         return;
// //       }
      
// //       const variantImages = getVariantImages(variant);
      
// //       const newVariant = {
// //         variantType: variantType.type,
// //         variantId: variantId,
// //         variantName: variant.name || 'Variant',
// //         regularPrice: variant.regularPrice || 0,
// //         discountPrice: variant.discountPrice || 0,
// //         buyingPrice: variant.buyingPrice || 0,
// //         packagingCost: variant.packagingCost || 0,
// //         deliveryCost: variant.deliveryCost || 0,
// //         costPerItem: variant.costPerItem || 0,
// //         stockQuantity: variant.stockQuantity || 0,
// //         quantity: 1,
// //         subVariants: [],
// //         variantImages: variantImages
// //       };
      
// //       onVariantSelect(variantType.type, variant, newVariant);
// //     }
// //   };

// //   const handleSubVariantToggle = (e, variant, subVariant, variantIndex, subIndex) => {
// //     e.stopPropagation();
// //     e.preventDefault();

// //     const variantId = getVariantId(variant, variantIndex);
// //     const subVariantId = getSubVariantId(subVariant, subIndex, variantIndex);
// //     const selectedVariant = selectedVariants.find(sv => sv.variantId === variantId);
    
// //     if (!selectedVariant) {
// //       const maxVariants = 10;
// //       if (selectedVariants.length >= maxVariants) {
// //         toast.error(`You can select up to ${maxVariants} variants`);
// //         return;
// //       }
      
// //       const subImages = getSubVariantImages(subVariant);
// //       const variantImages = getVariantImages(variant);
      
// //       const newVariant = {
// //         variantType: variantType.type,
// //         variantId: variantId,
// //         variantName: variant.name || 'Variant',
// //         regularPrice: variant.regularPrice || 0,
// //         discountPrice: variant.discountPrice || 0,
// //         buyingPrice: variant.buyingPrice || 0,
// //         packagingCost: variant.packagingCost || 0,
// //         deliveryCost: variant.deliveryCost || 0,
// //         costPerItem: variant.costPerItem || 0,
// //         stockQuantity: variant.stockQuantity || 0,
// //         quantity: 0,
// //         subVariants: [{ 
// //           ...subVariant, 
// //           id: subVariantId,
// //           quantity: 1,
// //           subVariantImages: subImages
// //         }],
// //         variantImages: variantImages
// //       };
      
// //       onVariantSelect(variantType.type, variant, newVariant);
// //       return;
// //     }

// //     const currentSubVariants = selectedVariant.subVariants || [];
// //     const isSubSelected = currentSubVariants.some(sv => {
// //       const svId = sv.id || sv._id || sv.subVariantId || String(sv.name).toLowerCase().replace(/\s+/g, '-');
// //       return svId === subVariantId;
// //     });

// //     let updatedSubVariants;
// //     if (isSubSelected) {
// //       updatedSubVariants = currentSubVariants.filter(sv => {
// //         const svId = sv.id || sv._id || sv.subVariantId || String(sv.name).toLowerCase().replace(/\s+/g, '-');
// //         return svId !== subVariantId;
// //       });
// //     } else {
// //       if (currentSubVariants.length >= 5) {
// //         toast.error(`Maximum 5 sub-variants per variant`);
// //         return;
// //       }
// //       const subImages = getSubVariantImages(subVariant);
// //       updatedSubVariants = [...currentSubVariants, { 
// //         ...subVariant, 
// //         id: subVariantId,
// //         quantity: 1,
// //         subVariantImages: subImages
// //       }];
// //     }

// //     const updatedVariant = {
// //       ...selectedVariant,
// //       quantity: 0,
// //       subVariants: updatedSubVariants
// //     };

// //     onVariantSelect(variantType.type, variant, updatedVariant);
// //   };

// //   const handleSubVariantQuantityChange = (e, variant, subVariant, variantIndex, subIndex, newQuantity) => {
// //     e.stopPropagation();
// //     e.preventDefault();

// //     const variantId = getVariantId(variant, variantIndex);
// //     const subVariantId = getSubVariantId(subVariant, subIndex, variantIndex);
// //     const selectedVariant = selectedVariants.find(sv => sv.variantId === variantId);
// //     if (!selectedVariant) return;

// //     const updatedSubVariants = selectedVariant.subVariants.map(sv => {
// //       const svId = sv.id || sv._id || sv.subVariantId || String(sv.name).toLowerCase().replace(/\s+/g, '-');
// //       return svId === subVariantId ? { ...sv, quantity: Math.max(1, newQuantity) } : sv;
// //     });

// //     const updatedVariant = {
// //       ...selectedVariant,
// //       subVariants: updatedSubVariants
// //     };

// //     onVariantSelect(variantType.type, variant, updatedVariant);
// //   };

// //   const getTotalSelectedQuantity = () => {
// //     return selectedVariants.reduce((sum, sv) => {
// //       if (sv.subVariants && sv.subVariants.length > 0) {
// //         const subTotal = sv.subVariants.reduce((s, sub) => s + (sub.quantity || 0), 0);
// //         return sum + subTotal;
// //       }
// //       return sum + (sv.quantity || 0);
// //     }, 0);
// //   };

// //   const renderColorCircle = (color, size = 'w-4 h-4') => {
// //     if (!color) return null;
// //     return (
// //       <div 
// //         className={`${size} rounded-full border border-[#8B9D83]/30 flex-shrink-0 shadow-sm`}
// //         style={{ backgroundColor: color }}
// //         title={color}
// //       />
// //     );
// //   };

// //   return (
// //     <div className="bg-[#FDF7EF] rounded-xl border border-[#8B9D83]/20 p-3 sm:p-4">
// //       <div className="flex items-center justify-between mb-2">
// //         <h3 className="text-sm font-semibold text-[#2D1B2E] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_SANS }}>
// //           <Grid className="w-4 h-4 text-[#8B9D83]" />
// //           {variantType.type.charAt(0).toUpperCase() + variantType.type.slice(1)} Variants
// //           <span className="text-xs text-[#4B5563] font-normal">
// //             ({selectedVariants.filter(sv => sv.variantType === variantType.type).length} selected)
// //           </span>
// //         </h3>
// //       </div>

// //       <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#8B9D83]">
// //         {variants.map((variant, index) => {
// //           const variantId = getVariantId(variant, index);
// //           const selectedVariant = selectedVariants.find(sv => sv.variantId === variantId);
// //           const isSelected = !!selectedVariant;
// //           const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
// //           const isExpanded = expandedVariant === index;
// //           const variantKey = `variant-${index}-${variant.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
// //           const variantImages = getVariantImages(variant);
// //           const isPreviewed = previewVariantId === variantId;
// //           const variantColor = getVariantColor(variant);
// //           const hasSubSelected = selectedVariant?.subVariants && selectedVariant.subVariants.length > 0;

// //           return (
// //             <div
// //               key={variantKey}
// //               className={`border rounded-lg transition-all duration-200 ${
// //                 isSelected || hasSubSelected
// //                   ? 'border-[#8B9D83] bg-white shadow-md shadow-[#8B9D83]/10'
// //                   : isPreviewed
// //                   ? 'border-[#8B9D83] bg-[#FDF7EF]/80 shadow-md shadow-[#8B9D83]/10'
// //                   : 'border-[#8B9D83]/20 bg-white hover:border-[#8B9D83]/50'
// //               }`}
// //             >
// //               <div
// //                 className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#FDF7EF] transition-colors"
// //                 onClick={(e) => {
// //                   handleVariantPreview(e, variant, index);
// //                   if (hasSubVariants) {
// //                     toggleVariantExpand(e, index);
// //                   }
// //                 }}
// //               >
// //                 <div className="flex-shrink-0">
// //                   {getVariantImage(variant) ? (
// //                     <img
// //                       src={getVariantImage(variant)}
// //                       alt={variant.name}
// //                       className="w-8 h-8 rounded-lg object-cover border border-[#8B9D83]/20"
// //                     />
// //                   ) : variantColor ? (
// //                     <div
// //                       className="w-8 h-8 rounded-lg border-2 border-[#8B9D83]/30"
// //                       style={{ backgroundColor: variantColor }}
// //                     />
// //                   ) : (
// //                     <div className="w-8 h-8 rounded-lg bg-[#FDF7EF] flex items-center justify-center">
// //                       <Package className="w-4 h-4 text-[#8B9D83]" />
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="flex-1 min-w-0">
// //                   <div className="flex items-center gap-2">
// //                       {variantColor && renderColorCircle(variantColor, 'w-4 h-4')}

// //                     <p className="text-sm font-medium text-[#2D1B2E] truncate">
// //                       {getVariantDisplayName(variant)}
// //                     </p>
                  
// //                     {hasSubVariants && (
// //                       <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
// //                         <Layers className="w-2.5 h-2.5" />
// //                         {variant.subVariants.length}
// //                       </span>
// //                     )}
// //                   </div>
// //                   <div className="flex items-center gap-2 text-xs text-[#4B5563]">
// //                     {variant.discountPrice > 0 && variant.discountPrice < variant.regularPrice ? (
// //                       <>
// //                         <span className="text-[#465641] font-semibold">৳{formatPrice(variant.discountPrice)}</span>
// //                         <span className="text-[#9CA3AF] line-through">৳{formatPrice(variant.regularPrice)}</span>
// //                       </>
// //                     ) : (
// //                       <span className="text-[#3A4A3F] font-medium">৳{formatPrice(variant.regularPrice || 0)}</span>
// //                     )}
// //                     <span className="text-[#6B7280]">Stock: {variant.stockQuantity || 0}</span>
// //                   </div>
// //                 </div>

// //                 {!hasSubVariants ? (
// //                   <button
// //                     onClick={(e) => handleVariantToggle(e, variant, index)}
// //                     className={`flex-shrink-0 p-1.5 rounded-full transition-all ${
// //                       isSelected
// //                         ? 'bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white'
// //                         : 'bg-[#FDF7EF] text-[#8B9D83] hover:bg-[#8B9D83] hover:text-white'
// //                     }`}
// //                   >
// //                     {isSelected ? (
// //                       <Check className="w-3.5 h-3.5" />
// //                     ) : (
// //                       <Plus className="w-3.5 h-3.5" />
// //                     )}
// //                   </button>
// //                 ) : (
// //                   <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">
// //                     <ChevronDown
// //                       className={`w-4 h-4 text-[#8B9D83] transition-transform flex-shrink-0 ${
// //                         isExpanded ? 'rotate-180' : ''
// //                       }`}
// //                       onClick={(e) => toggleVariantExpand(e, index)}
// //                     />
// //                   </div>
// //                 )}
// //               </div>

// //               {hasSubVariants && isExpanded && (
// //                 <div className="px-3 pb-3 pt-2 border-t border-[#8B9D83]/20">
// //                   <div className="flex items-center justify-between mb-2">
// //                     <h4 className="text-xs font-medium text-[#3A4A3F] flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_SANS }}>
// //                       <Layers className="w-3 h-3 text-[#8B9D83]" />
// //                       Select Sub-Variants
// //                       {selectedVariant?.subVariants && selectedVariant.subVariants.length > 0 && (
// //                         <span className="text-[10px] text-[#8B9D83] ml-1 font-semibold">
// //                           ({selectedVariant.subVariants.length} selected)
// //                         </span>
// //                       )}
// //                     </h4>
// //                     {selectedVariant?.subVariants && selectedVariant.subVariants.length > 0 && (
// //                       <span className="text-[10px] text-[#465641] flex items-center gap-0.5 font-medium">
// //                         <CheckCircle className="w-3 h-3" />
// //                         Added to cart
// //                       </span>
// //                     )}
// //                   </div>
// //                   <div className="space-y-2">
// //                     {variant.subVariants.map((subVariant, subIndex) => {
// //                       const subVariantId = getSubVariantId(subVariant, subIndex, index);
// //                       const isSubSelected = selectedVariant?.subVariants?.some(sv => {
// //                         const svId = sv.id || sv._id || sv.subVariantId || String(sv.name).toLowerCase().replace(/\s+/g, '-');
// //                         return svId === subVariantId;
// //                       }) || false;
// //                       const subVariantKey = `sub-${index}-${subIndex}-${subVariant.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
// //                       const subImages = getSubVariantImages(subVariant);
// //                       const isSubPreviewed = previewSubVariantId === subVariantId;
// //                       const subColor = subVariant.color || null;

// //                       const subDiscountPrice = subVariant.discountPrice || 0;
// //                       const subRegularPrice = subVariant.regularPrice || 0;
// //                       const hasSubDiscount = subDiscountPrice > 0 && subDiscountPrice < subRegularPrice;

// //                       return (
// //                         <div
// //                           key={subVariantKey}
// //                           className={`border rounded-lg transition-all duration-200 ${
// //                             isSubSelected
// //                               ? 'border-[#8B9D83] bg-[#FDF7EF]/50'
// //                               : isSubPreviewed
// //                               ? 'border-[#8B9D83] bg-[#FDF7EF]/30'
// //                               : 'border-[#8B9D83]/20 bg-white hover:border-[#8B9D83]/40'
// //                           }`}
// //                         >
// //                           <div
// //                             className="flex items-center gap-2 p-2 hover:bg-[#FDF7EF]/50 transition-colors cursor-pointer"
// //                             onClick={(e) => handleSubVariantPreview(e, variant, subVariant, index, subIndex)}
// //                           >
// //                             <div className="flex-shrink-0">
// //                               {subVariant.images && subVariant.images[0] ? (
// //                                 <img
// //                                   src={subVariant.images[0]}
// //                                   alt={subVariant.name}
// //                                   className="w-6 h-6 rounded-lg object-cover border border-[#8B9D83]/20"
// //                                 />
// //                               ) : subColor ? (
// //                                 <div
// //                                   className="w-6 h-6 rounded-lg border border-[#8B9D83]/20"
// //                                   style={{ backgroundColor: subColor }}
// //                                 />
// //                               ) : (
// //                                 <div className="w-6 h-6 rounded-lg bg-[#FDF7EF] flex items-center justify-center">
// //                                   <Box className="w-3 h-3 text-[#8B9D83]" />
// //                                 </div>
// //                               )}
// //                             </div>
// //                             <div className="flex-1 min-w-0">
// //                               <div className="flex items-center gap-1.5">
// //                                  {subColor && renderColorCircle(subColor, 'w-3 h-3')}
// //                                 <p className="text-xs font-medium text-[#2D1B2E] truncate">
// //                                   {subVariant.name}
// //                                 </p>
                               
// //                               </div>
// //                               <div className="flex items-center gap-1.5 text-[10px] text-[#4B5563]">
// //                                 {hasSubDiscount ? (
// //                                   <>
// //                                     <span className="text-[#465641] font-semibold">৳{formatPrice(subDiscountPrice)}</span>
// //                                     <span className="text-[#9CA3AF] line-through">৳{formatPrice(subRegularPrice)}</span>
// //                                   </>
// //                                 ) : (
// //                                   <span className="text-[#3A4A3F] font-medium">৳{formatPrice(subRegularPrice)}</span>
// //                                 )}
// //                                 <span className="text-[#6B7280]">Stock: {subVariant.stockQuantity || 0}</span>
// //                               </div>
// //                             </div>
// //                             <button
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 handleSubVariantToggle(e, variant, subVariant, index, subIndex);
// //                               }}
// //                               className={`flex-shrink-0 p-1 rounded-full transition-all ${
// //                                 isSubSelected
// //                                   ? 'bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white'
// //                                   : 'bg-[#FDF7EF] text-[#8B9D83] hover:bg-[#8B9D83] hover:text-white'
// //                               }`}
// //                             >
// //                               {isSubSelected ? (
// //                                 <Check className="w-3 h-3" />
// //                               ) : (
// //                                 <Plus className="w-3 h-3" />
// //                               )}
// //                             </button>
// //                           </div>

// //                           {isSubSelected && (
// //                             <div className="px-3 pb-2 pt-0 border-t border-[#8B9D83]/20">
// //                               <div className="flex items-center justify-between mt-1.5">
// //                                 <span className="text-[10px] text-[#4B5563]" style={{ fontFamily: FONT_FAMILY_SANS }}>
// //                                   Qty:
// //                                 </span>
// //                                 <div className="flex items-center rounded-lg border border-[#8B9D83]/20 overflow-hidden bg-white">
// //                                   <button
// //                                     onClick={(e) => {
// //                                       e.stopPropagation();
// //                                       const currentSub = selectedVariant?.subVariants?.find(sv => {
// //                                         const svId = sv.id || sv._id || sv.subVariantId || String(sv.name).toLowerCase().replace(/\s+/g, '-');
// //                                         return svId === subVariantId;
// //                                       });
// //                                       const currentQty = currentSub?.quantity || 1;
// //                                       handleSubVariantQuantityChange(e, variant, subVariant, index, subIndex, currentQty - 1);
// //                                     }}
// //                                     className="w-6 h-6 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF]"
// //                                   >
// //                                     <Minus className="w-2.5 h-2.5" />
// //                                   </button>
// //                                   <span className="w-8 text-center font-semibold text-[#2D1B2E] text-xs">
// //                                     {selectedVariant?.subVariants?.find(sv => {
// //                                       const svId = sv.id || sv._id || sv.subVariantId || String(sv.name).toLowerCase().replace(/\s+/g, '-');
// //                                       return svId === subVariantId;
// //                                     })?.quantity || 1}
// //                                   </span>
// //                                   <button
// //                                     onClick={(e) => {
// //                                       e.stopPropagation();
// //                                       const currentSub = selectedVariant?.subVariants?.find(sv => {
// //                                         const svId = sv.id || sv._id || sv.subVariantId || String(sv.name).toLowerCase().replace(/\s+/g, '-');
// //                                         return svId === subVariantId;
// //                                       });
// //                                       const currentQty = currentSub?.quantity || 1;
// //                                       if (currentQty < (subVariant.stockQuantity || 999)) {
// //                                         handleSubVariantQuantityChange(e, variant, subVariant, index, subIndex, currentQty + 1);
// //                                       } else {
// //                                         toast.error(`Only ${subVariant.stockQuantity} items available`);
// //                                       }
// //                                     }}
// //                                     disabled={(selectedVariant?.subVariants?.find(sv => {
// //                                       const svId = sv.id || sv._id || sv.subVariantId || String(sv.name).toLowerCase().replace(/\s+/g, '-');
// //                                       return svId === subVariantId;
// //                                     })?.quantity || 0) >= (subVariant.stockQuantity || 0)}
// //                                     className="w-6 h-6 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF] disabled:opacity-50"
// //                                   >
// //                                     <Plus className="w-2.5 h-2.5" />
// //                                   </button>
// //                                 </div>
// //                                 <span className="text-[10px] text-[#6B7280]">
// //                                   max {subVariant.stockQuantity || 0}
// //                                 </span>
// //                               </div>
// //                             </div>
// //                           )}
// //                         </div>
// //                       );
// //                     })}
// //                   </div>
                  
// //                   {(!selectedVariant?.subVariants || selectedVariant.subVariants.length === 0) && (
// //                     <div className="mt-2 text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded-lg border border-amber-200 flex items-center gap-1">
// //                       <AlertCircle className="w-3 h-3 flex-shrink-0" />
// //                       Select at least one sub-variant to add to cart
// //                     </div>
// //                   )}
// //                 </div>
// //               )}

// //               {isSelected && !hasSubVariants && (
// //                 <div className="px-3 pb-2 pt-0 border-t border-[#8B9D83]/20">
// //                   <div className="flex items-center justify-between mt-2">
// //                     <span className="text-xs text-[#3A4A3F] font-medium" style={{ fontFamily: FONT_FAMILY_SANS }}>
// //                       Quantity:
// //                     </span>
// //                     <div className="flex items-center rounded-lg border border-[#8B9D83]/20 overflow-hidden bg-white">
// //                       <button
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           const newQty = Math.max(1, (selectedVariant?.quantity || 1) - 1);
// //                           onVariantQuantityChange(variantId, newQty);
// //                         }}
// //                         className="w-7 h-7 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF] disabled:opacity-50 transition"
// //                       >
// //                         <Minus className="w-3 h-3" />
// //                       </button>
// //                       <input
// //                         type="text"
// //                         value={selectedVariant?.quantity || 1}
// //                         onChange={(e) => {
// //                           const value = e.target.value;
// //                           if (value === '') return;
// //                           if (/^\d+$/.test(value)) {
// //                             const numValue = parseInt(value);
// //                             if (numValue >= 1 && numValue <= (variant.stockQuantity || 999)) {
// //                               onVariantQuantityChange(variantId, numValue);
// //                             }
// //                           }
// //                         }}
// //                         className="w-10 text-center font-semibold text-[#2D1B2E] text-sm outline-none border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
// //                       />
// //                       <button
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           const newQty = (selectedVariant?.quantity || 1) + 1;
// //                           if (newQty <= (variant.stockQuantity || 999)) {
// //                             onVariantQuantityChange(variantId, newQty);
// //                           } else {
// //                             toast.error(`Only ${variant.stockQuantity} items available`);
// //                           }
// //                         }}
// //                         disabled={(selectedVariant?.quantity || 0) >= (variant.stockQuantity || 0)}
// //                         className="w-7 h-7 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF] disabled:opacity-50 transition"
// //                       >
// //                         <Plus className="w-3 h-3" />
// //                       </button>
// //                     </div>
// //                     <span className="text-xs text-[#6B7280]">
// //                       max {variant.stockQuantity || 0}
// //                     </span>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {selectedVariants.length > 0 && (
// //         <div className="mt-3 pt-3 border-t border-[#8B9D83]/20">
// //           <div className="flex items-center justify-between text-xs">
// //             <span className="text-[#3A4A3F]" style={{ fontFamily: FONT_FAMILY_SANS }}>
// //               Selected: <span className="font-semibold text-[#465641]">{selectedVariants.length}</span> variants
// //             </span>
// //             <span className="text-[#3A4A3F]" style={{ fontFamily: FONT_FAMILY_SANS }}>
// //               Total: <span className="font-semibold text-[#465641]">{getTotalSelectedQuantity()}</span> items
// //             </span>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// const VariantSelector = ({
//   variantType,
//   variants,
//   selectedVariants,
//   onVariantSelect,
//   onVariantQuantityChange,
//   onVariantRemove,
//   stockQuantity,
//   onVariantImageSelect,
//   clearPreviewTrigger,
//   onPreviewCleared
// }) => {
//   const [expandedVariantId, setExpandedVariantId] = useState(null);
//   const [previewVariantId, setPreviewVariantId] = useState(null);
//   const [previewSubVariantId, setPreviewSubVariantId] = useState(null);

//   useEffect(() => {
//     if (clearPreviewTrigger) {
//       setExpandedVariantId(null);
//       setPreviewVariantId(null);
//       setPreviewSubVariantId(null);
//       if (onPreviewCleared) onPreviewCleared();
//     }
//   }, [clearPreviewTrigger, onPreviewCleared]);

//   // ---------- Helpers ----------
//   const getVariantImage = (v) => v.imagePreviews?.[0] || v.images?.[0] || null;
//   const getVariantColor = (v) => v.color || null;

//   const getVariantImages = (v) => {
//     if (v.imagePreviews?.filter(Boolean).length > 0) return v.imagePreviews.filter(Boolean);
//     if (v.images?.filter(Boolean).length > 0) return v.images.filter(Boolean);
//     return [];
//   };

//   const getSubVariantImages = (sv) => {
//     if (sv.imagePreviews?.filter(Boolean).length > 0) return sv.imagePreviews.filter(Boolean);
//     if (sv.images?.filter(Boolean).length > 0) return sv.images.filter(Boolean);
//     return [];
//   };

//   const getVariantId = (v, i) => {
//     if (v.id) return String(v.id);
//     if (v._id) return String(v._id);
//     return `variant-${i}-${v.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
//   };

//   const getSubVariantId = (sv, si, vi) => {
//     if (sv.id) return String(sv.id);
//     if (sv._id) return String(sv._id);
//     return `sub-${vi}-${si}-${sv.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
//   };

//   const getSubVariantKey = (sv) =>
//     sv.id || sv._id || sv.subVariantId || String(sv.name).toLowerCase().replace(/\s+/g, '-');

//   const renderColorCircle = (color, size = 'w-2.5 h-2.5') => {
//     if (!color) return null;
//     return (
//       <div
//         className={`${size} rounded-full border border-[#8B9D83]/40 flex-shrink-0 shadow-sm`}
//         style={{ backgroundColor: color }}
//         title={color}
//       />
//     );
//   };

//   // ---------- Preview handlers ----------
//   const handleVariantClick = (e, variant, index) => {
//     e.stopPropagation();
//     e.preventDefault();

//     const variantId = getVariantId(variant, index);
//     const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
//     const variantImages = getVariantImages(variant);

//     // Toggle expand for variants with sub-variants
//     if (hasSubVariants) {
//       setExpandedVariantId(prev => (prev === variantId ? null : variantId));
//     }

//     // Toggle preview highlight
//     if (previewVariantId === variantId) {
//       setPreviewVariantId(null);
//       setPreviewSubVariantId(null);
//       if (onVariantImageSelect) onVariantImageSelect(null, null);
//       return;
//     }

//     setPreviewVariantId(variantId);
//     setPreviewSubVariantId(null);

//     if (onVariantImageSelect) {
//       const info = {
//         regularPrice: variant.regularPrice || 0,
//         discountPrice: variant.discountPrice || 0,
//         stockQuantity: variant.stockQuantity || 0,
//         name: variant.name,
//         type: 'variant'
//       };
//       if (variantImages.length > 0) onVariantImageSelect(variantImages, info);
//       else onVariantImageSelect(null, info);
//     }
//   };

//   const handleSubVariantClick = (e, variant, subVariant, index, subIndex) => {
//     e.stopPropagation();
//     e.preventDefault();

//     const variantId = getVariantId(variant, index);
//     const subVariantId = getSubVariantId(subVariant, subIndex, index);
//     const subImages = getSubVariantImages(subVariant);
//     const variantImages = getVariantImages(variant);

//     if (previewSubVariantId === subVariantId) {
//       setPreviewSubVariantId(null);
//       if (onVariantImageSelect) onVariantImageSelect(null, null);
//       return;
//     }

//     setPreviewVariantId(variantId);
//     setPreviewSubVariantId(subVariantId);

//     const info = {
//       regularPrice: subVariant.regularPrice || variant.regularPrice || 0,
//       discountPrice: subVariant.discountPrice || variant.discountPrice || 0,
//       stockQuantity: subVariant.stockQuantity || variant.stockQuantity || 0,
//       name: subVariant.name,
//       type: 'subVariant'
//     };

//     if (onVariantImageSelect) {
//       if (subImages.length > 0) onVariantImageSelect(subImages, info);
//       else if (variantImages.length > 0) onVariantImageSelect(variantImages, info);
//       else onVariantImageSelect(null, info);
//     }
//   };

//   // ---------- Add/Remove ----------
//   const handleVariantToggle = (e, variant, index) => {
//     e.stopPropagation();
//     e.preventDefault();

//     const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
//     if (hasSubVariants) return;

//     const variantId = getVariantId(variant, index);
//     const isSelected = selectedVariants.some(sv => sv.variantId === variantId);

//     if (isSelected) {
//       onVariantRemove(variantId);
//     } else {
//       if (selectedVariants.length >= 10) {
//         toast.error('You can select up to 10 variants');
//         return;
//       }
//       const variantImages = getVariantImages(variant);
//       const newVariant = {
//         variantType: variantType.type,
//         variantId,
//         variantName: variant.name || 'Variant',
//         regularPrice: variant.regularPrice || 0,
//         discountPrice: variant.discountPrice || 0,
//         buyingPrice: variant.buyingPrice || 0,
//         packagingCost: variant.packagingCost || 0,
//         deliveryCost: variant.deliveryCost || 0,
//         costPerItem: variant.costPerItem || 0,
//         stockQuantity: variant.stockQuantity || 0,
//         quantity: 1,
//         subVariants: [],
//         variantImages,
//         selectedColor: variant.color || null
//       };
//       onVariantSelect(variantType.type, variant, newVariant);
//     }
//   };

//   const handleSubVariantToggle = (e, variant, subVariant, variantIndex, subIndex) => {
//     e.stopPropagation();
//     e.preventDefault();

//     const variantId = getVariantId(variant, variantIndex);
//     const subVariantId = getSubVariantId(subVariant, subIndex, variantIndex);
//     const selectedVariant = selectedVariants.find(sv => sv.variantId === variantId);

//     if (!selectedVariant) {
//       if (selectedVariants.length >= 10) {
//         toast.error('You can select up to 10 variants');
//         return;
//       }
//       const subImages = getSubVariantImages(subVariant);
//       const variantImages = getVariantImages(variant);

//       const newVariant = {
//         variantType: variantType.type,
//         variantId,
//         variantName: variant.name || 'Variant',
//         regularPrice: variant.regularPrice || 0,
//         discountPrice: variant.discountPrice || 0,
//         buyingPrice: variant.buyingPrice || 0,
//         packagingCost: variant.packagingCost || 0,
//         deliveryCost: variant.deliveryCost || 0,
//         costPerItem: variant.costPerItem || 0,
//         stockQuantity: variant.stockQuantity || 0,
//         quantity: 0,
//         subVariants: [{
//           ...subVariant,
//           id: subVariantId,
//           quantity: 1,
//           subVariantImages: subImages
//         }],
//         variantImages
//       };
//       onVariantSelect(variantType.type, variant, newVariant);
//       return;
//     }

//     const currentSubVariants = selectedVariant.subVariants || [];
//     const isSubSelected = currentSubVariants.some(sv => getSubVariantKey(sv) === subVariantId);

//     let updatedSubVariants;
//     if (isSubSelected) {
//       updatedSubVariants = currentSubVariants.filter(sv => getSubVariantKey(sv) !== subVariantId);
//     } else {
//       if (currentSubVariants.length >= 5) {
//         toast.error('Maximum 5 sub-variants per variant');
//         return;
//       }
//       const subImages = getSubVariantImages(subVariant);
//       updatedSubVariants = [...currentSubVariants, {
//         ...subVariant,
//         id: subVariantId,
//         quantity: 1,
//         subVariantImages: subImages
//       }];
//     }

//     onVariantSelect(variantType.type, variant, {
//       ...selectedVariant,
//       quantity: 0,
//       subVariants: updatedSubVariants
//     });
//   };

//   // ---------- Render ----------
//   return (
//     <div className="bg-[#FDF7EF] rounded-xl border border-[#8B9D83]/20 p-3 sm:p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">
//         <h3
//           className="text-sm font-bold text-[#2D1B2E] flex items-center gap-1.5"
//           style={{ fontFamily: FONT_FAMILY_SANS }}
//         >
//           <Grid className="w-4 h-4 text-[#8B9D83]" />
//           {variantType.type.charAt(0).toUpperCase() + variantType.type.slice(1)} Variants
//           <span className="text-xs text-[#6B7280] font-normal">
//             ({selectedVariants.filter(sv => sv.variantType === variantType.type).length} selected)
//           </span>
//         </h3>
//       </div>

//       {/* Variants Row */}
//       <div className="flex flex-wrap gap-3 sm:gap-4">
//         {variants.map((variant, index) => {
//           const variantId = getVariantId(variant, index);
//           const selectedVariant = selectedVariants.find(sv => sv.variantId === variantId);
//           const isSelected = !!selectedVariant;
//           const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
//           const isExpanded = expandedVariantId === variantId;
//           const isPreviewed = previewVariantId === variantId;
//           const variantImage = getVariantImage(variant);
//           const variantColor = getVariantColor(variant);
//           const variantKey = `variant-block-${index}`;

//           const selectedSubCount = selectedVariant?.subVariants?.length || 0;
//           const vRegular = variant.regularPrice || 0;
//           const vDiscount = variant.discountPrice || 0;
//           const vHasDiscount = vDiscount > 0 && vDiscount < vRegular;

//           return (
//             <div key={variantKey} className="flex flex-col items-center">
//               {/* Variant Card */}
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={(e) => handleVariantClick(e, variant, index)}
//                   className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
//                     isPreviewed
//                       ? 'border-[#8B9D83] shadow-[0_0_0_3px_rgba(139,157,131,0.20)]'
//                       : isSelected || selectedSubCount > 0
//                       ? 'border-[#8B9D83]/70 shadow-md shadow-[#8B9D83]/10'
//                       : isExpanded
//                       ? 'border-[#8B9D83]/70'
//                       : 'border-[#8B9D83]/20 hover:border-[#8B9D83]/60'
//                   } bg-white`}
//                   title={variant.name}
//                 >
//                   {variantImage ? (
//                     <img src={variantImage} alt={variant.name} className="w-full h-full object-cover" />
//                   ) : variantColor ? (
//                     <div className="w-full h-full" style={{ backgroundColor: variantColor }} />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-[#FDF7EF]">
//                       <Package className="w-6 h-6 text-[#8B9D83]/60" />
//                     </div>
//                   )}

//                   {/* Selected tick (only if no sub-variants) */}
//                   {!hasSubVariants && isSelected && (
//                     <span className="absolute bottom-1 left-1 bg-[#8B9D83] text-white rounded-full p-0.5 shadow-md">
//                       <Check className="w-3 h-3" />
//                     </span>
//                   )}

//                   {/* Sub-variant count badge */}
//                   {hasSubVariants && (
//                     <span className="absolute bottom-1 right-1 text-[9px] font-bold bg-[#2D1B2E]/80 text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
//                       <Layers className="w-2.5 h-2.5" />
//                       {variant.subVariants.length}
//                     </span>
//                   )}

//                   {/* Chevron for expandable variants */}
//                   {hasSubVariants && (
//                     <span className={`absolute bottom-1 left-1 bg-white/90 rounded-full p-0.5 shadow transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
//                       <ChevronDown className="w-3 h-3 text-[#465641]" />
//                     </span>
//                   )}
//                 </button>

//                 {/* + icon ONLY if variant has NO sub-variants */}
//                 {!hasSubVariants && (
//                   <button
//                     type="button"
//                     onClick={(e) => handleVariantToggle(e, variant, index)}
//                     className={`absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full flex items-center justify-center shadow-md transition-all duration-200 border ${
//                       isSelected
//                         ? 'bg-[#465641] border-[#465641] text-white'
//                         : 'bg-white border-[#8B9D83]/40 text-[#465641] hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83]'
//                     }`}
//                     aria-label={isSelected ? 'Remove variant' : 'Add variant'}
//                   >
//                     {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
//                   </button>
//                 )}
//               </div>

//               {/* Name + color + prices */}
//               <div className="mt-1 flex flex-col items-center max-w-[80px]">
//                 <div className="flex items-center gap-1">
//                   {variantColor && renderColorCircle(variantColor)}
//                   <p className="text-[10px] font-medium text-[#2D1B2E] truncate text-center" title={variant.name}>
//                     {variant.name}
//                   </p>
//                 </div>
//                 {vHasDiscount ? (
//                   <>
//                     <p className="text-[9px] font-semibold text-[#465641] mt-0.5 leading-tight">
//                       ৳{formatPrice(vDiscount)}
//                     </p>
//                     <p className="text-[8px] text-gray-400 line-through leading-tight">
//                       ৳{formatPrice(vRegular)}
//                     </p>
//                   </>
//                 ) : (
//                   <p className="text-[9px] font-semibold text-[#465641] mt-0.5 leading-tight">
//                     ৳{formatPrice(vRegular)}
//                   </p>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Expand panel — sub-variants in the SAME card style */}
//       <AnimatePresence initial={false}>
//         {expandedVariantId && (() => {
//           const parentIndex = variants.findIndex(
//             (v, i) => getVariantId(v, i) === expandedVariantId
//           );
//           if (parentIndex === -1) return null;
//           const parent = variants[parentIndex];
//           if (!parent.subVariants || parent.subVariants.length === 0) return null;

//           const selectedParent = selectedVariants.find(
//             sv => sv.variantId === expandedVariantId
//           );

//           return (
//             <motion.div
//               key={`expand-${expandedVariantId}`}
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.25, ease: 'easeOut' }}
//               className="overflow-hidden"
//             >
//               <div className="mt-3 pt-3 border-t border-[#8B9D83]/20">
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="text-xs font-semibold text-[#2D1B2E] flex items-center gap-1">
//                     <Layers className="w-3.5 h-3.5 text-[#8B9D83]" />
//                     {parent.name} — Sub-Variants
//                   </h4>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setExpandedVariantId(null);
//                     }}
//                     className="p-0.5 rounded-full hover:bg-white text-[#6B7280]"
//                     aria-label="Close"
//                   >
//                     <X className="w-3.5 h-3.5" />
//                   </button>
//                 </div>

//                 <div className="flex flex-wrap gap-3 sm:gap-4">
//                   {parent.subVariants.map((subVariant, subIndex) => {
//                     const subVariantId = getSubVariantId(subVariant, subIndex, parentIndex);
//                     const isSubSelected =
//                       selectedParent?.subVariants?.some(
//                         sv => getSubVariantKey(sv) === subVariantId
//                       ) || false;
//                     const isSubPreviewed = previewSubVariantId === subVariantId;
//                     const subImage = subVariant.images?.[0] || subVariant.imagePreviews?.[0] || null;
//                     const subColor = subVariant.color || null;
//                     const subDiscount = subVariant.discountPrice || 0;
//                     const subRegular = subVariant.regularPrice || 0;
//                     const hasSubDiscount = subDiscount > 0 && subDiscount < subRegular;

//                     return (
//                       <div key={`sub-${parentIndex}-${subIndex}`} className="flex flex-col items-center">
//                         <div className="relative">
//                           <button
//                             type="button"
//                             onClick={(e) =>
//                               handleSubVariantClick(e, parent, subVariant, parentIndex, subIndex)
//                             }
//                             className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
//                               isSubPreviewed
//                                 ? 'border-[#8B9D83] shadow-[0_0_0_3px_rgba(139,157,131,0.20)]'
//                                 : isSubSelected
//                                 ? 'border-[#8B9D83]/70 shadow-md shadow-[#8B9D83]/10'
//                                 : 'border-[#8B9D83]/20 hover:border-[#8B9D83]/60'
//                             } bg-white`}
//                             title={subVariant.name}
//                           >
//                             {subImage ? (
//                               <img src={subImage} alt={subVariant.name} className="w-full h-full object-cover" />
//                             ) : subColor ? (
//                               <div className="w-full h-full" style={{ backgroundColor: subColor }} />
//                             ) : (
//                               <div className="w-full h-full flex items-center justify-center bg-[#FDF7EF]">
//                                 <Box className="w-6 h-6 text-[#8B9D83]/60" />
//                               </div>
//                             )}

//                             {isSubSelected && (
//                               <span className="absolute bottom-1 left-1 bg-[#8B9D83] text-white rounded-full p-0.5 shadow-md">
//                                 <Check className="w-3 h-3" />
//                               </span>
//                             )}
//                           </button>

//                           {/* + icon on sub-variant */}
//                           <button
//                             type="button"
//                             onClick={(e) =>
//                               handleSubVariantToggle(e, parent, subVariant, parentIndex, subIndex)
//                             }
//                             className={`absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full flex items-center justify-center shadow-md transition-all duration-200 border ${
//                               isSubSelected
//                                 ? 'bg-[#465641] border-[#465641] text-white'
//                                 : 'bg-white border-[#8B9D83]/40 text-[#465641] hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83]'
//                             }`}
//                             aria-label={isSubSelected ? 'Remove' : 'Add'}
//                           >
//                             {isSubSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
//                           </button>
//                         </div>

//                         {/* Name + color + prices */}
//                         <div className="mt-1 flex flex-col items-center max-w-[80px]">
//                           <div className="flex items-center gap-1">
//                             {subColor && renderColorCircle(subColor)}
//                             <p className="text-[10px] font-medium text-[#2D1B2E] truncate text-center" title={subVariant.name}>
//                               {subVariant.name}
//                             </p>
//                           </div>
//                           {hasSubDiscount ? (
//                             <>
//                               <p className="text-[9px] font-semibold text-[#465641] mt-0.5 leading-tight">
//                                 ৳{formatPrice(subDiscount)}
//                               </p>
//                               <p className="text-[8px] text-gray-400 line-through leading-tight">
//                                 ৳{formatPrice(subRegular)}
//                               </p>
//                             </>
//                           ) : (
//                             <p className="text-[9px] font-semibold text-[#465641] mt-0.5 leading-tight">
//                               ৳{formatPrice(subRegular)}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })()}
//       </AnimatePresence>
//     </div>
//   );
// };

// // ============================================================
// // ADD-ONS SECTION COMPONENT
// // ============================================================

// const AddOnsSection = ({ addOns, onAddToCart }) => {
//   const [selectedAddOns, setSelectedAddOns] = useState({});
//   const [quantities, setQuantities] = useState({});
//   const [addingToCart, setAddingToCart] = useState({});

//   const handleAddOnToggle = (addOn) => {
//     const id = addOn.productId?._id || addOn.productId;
//     if (selectedAddOns[id]) {
//       setSelectedAddOns(prev => {
//         const newState = { ...prev };
//         delete newState[id];
//         return newState;
//       });
//       setQuantities(prev => {
//         const newState = { ...prev };
//         delete newState[id];
//         return newState;
//       });
//     } else {
//       setSelectedAddOns(prev => ({ ...prev, [id]: addOn }));
//       setQuantities(prev => ({ ...prev, [id]: 1 }));
//     }
//   };

//   const updateQuantity = (id, newQty) => {
//     if (newQty >= 1) {
//       setQuantities(prev => ({ ...prev, [id]: newQty }));
//     }
//   };

//   const handleAddToCart = async (addOn) => {
//     const id = addOn.productId?._id || addOn.productId;
//     const quantity = quantities[id] || 1;

//     setAddingToCart(prev => ({ ...prev, [id]: true }));
//     const toastId = toast.loading(`Adding ${addOn.productName} to cart...`);

//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;

//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           productId: id,
//           quantity: quantity,
//           selectedColor: null
//         })
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success(`${addOn.productName} added to cart!`, { id: toastId });
//         window.dispatchEvent(new Event('cart-update'));
//         setSelectedAddOns(prev => {
//           const newState = { ...prev };
//           delete newState[id];
//           return newState;
//         });
//         setQuantities(prev => {
//           const newState = { ...prev };
//           delete newState[id];
//           return newState;
//         });
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     } finally {
//       setAddingToCart(prev => ({ ...prev, [id]: false }));
//     }
//   };

//   const handleAddAllToCart = async () => {
//     const addOnIds = Object.keys(selectedAddOns);
//     if (addOnIds.length === 0) {
//       toast.error('No add-ons selected');
//       return;
//     }

//     let successCount = 0;
//     let errorCount = 0;

//     for (const id of addOnIds) {
//       const addOn = selectedAddOns[id];
//       const quantity = quantities[id] || 1;

//       try {
//         const token = localStorage.getItem('token');
//         const sessionId = localStorage.getItem('cartSessionId');
//         const headers = { 'Content-Type': 'application/json' };
//         if (token) headers['Authorization'] = `Bearer ${token}`;
//         else if (sessionId) headers['x-session-id'] = sessionId;

//         const response = await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({
//             productId: id,
//             quantity: quantity,
//             selectedColor: null
//           })
//         });

//         const data = await response.json();
//         if (data.success) {
//           successCount++;
//           if (data.sessionId && !token) {
//             localStorage.setItem('cartSessionId', data.sessionId);
//           }
//         } else {
//           errorCount++;
//         }
//       } catch (error) {
//         console.error('Add to cart error:', error);
//         errorCount++;
//       }
//     }

//     if (successCount > 0) {
//       toast.success(`${successCount} add-on(s) added to cart!`);
//       window.dispatchEvent(new Event('cart-update'));
//       setSelectedAddOns({});
//       setQuantities({});
//     } else if (errorCount > 0) {
//       toast.error('Failed to add add-ons to cart');
//     }
//   };

//   if (!addOns || addOns.length === 0) {
//     return null;
//   }

//   const totalSelected = Object.keys(selectedAddOns).length;
//   const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

//   return (
//     <div className="mt-6 p-4 bg-gradient-to-r from-[#FDF7EF] to-[#8B9D83]/20 rounded-xl border border-[#8B9D83]/20">
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <Gift className="w-5 h-5 text-[#8B9D83]" />
//           <h3 className="text-sm font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SANS }}>
//             Add-Ons
//           </h3>
//           <span className="text-xs text-[#6B7280]">
//             (Select add-on products to purchase together)
//           </span>
//         </div>
//         {totalSelected > 0 && (
//           <button
//             onClick={handleAddAllToCart}
//             className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-[#8B9D83] to-[#465641] rounded-lg hover:shadow-lg transition-all flex items-center gap-1"
//           >
//             <ShoppingCart className="w-3 h-3" />
//             Add {totalSelected} ({totalItems} items)
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
//         {addOns.map((addOn, index) => {
//           const product = addOn.productId || addOn;
//           const id = product._id || addOn.productId;
//           const isSelected = !!selectedAddOns[id];
//           const quantity = quantities[id] || 1;
//           const isAdding = addingToCart[id] || false;

//           return (
//             <div
//               key={id || index}
//               className={`border rounded-lg p-2 transition-all duration-200 ${
//                 isSelected
//                   ? 'border-[#8B9D83] bg-white shadow-md shadow-[#8B9D83]/10'
//                   : 'border-[#8B9D83]/20 bg-white hover:border-[#8B9D83]/50'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <div className="flex-shrink-0">
//                   {product.images && product.images[0] ? (
//                     <img
//                       src={product.images[0].url || product.images[0]}
//                       alt={product.productName}
//                       className="w-10 h-10 rounded-lg object-cover border border-[#8B9D83]/20"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-lg bg-[#FDF7EF] flex items-center justify-center">
//                       <Package className="w-5 h-5 text-[#8B9D83]" />
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs font-medium text-[#2D1B2E] truncate">
//                     {product.productName}
//                   </p>
//                   <p className="text-xs text-[#465641] font-semibold">
//                     ৳{formatPrice(product.discountPrice || product.regularPrice || 0)}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => handleAddOnToggle(addOn)}
//                   className={`flex-shrink-0 p-1.5 rounded-full transition-all ${
//                     isSelected
//                       ? 'bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white'
//                       : 'bg-[#FDF7EF] text-[#8B9D83] hover:bg-[#8B9D83] hover:text-white'
//                   }`}
//                 >
//                   {isSelected ? (
//                     <Check className="w-3 h-3" />
//                   ) : (
//                     <Plus className="w-3 h-3" />
//                   )}
//                 </button>
//               </div>

//               {isSelected && (
//                 <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#8B9D83]/20">
//                   <div className="flex items-center rounded-lg border border-[#8B9D83]/20 overflow-hidden bg-white">
//                     <button
//                       onClick={() => updateQuantity(id, quantity - 1)}
//                       className="w-6 h-6 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF]"
//                     >
//                       <Minus className="w-2.5 h-2.5" />
//                     </button>
//                     <span className="w-7 text-center font-semibold text-[#2D1B2E] text-xs">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => updateQuantity(id, quantity + 1)}
//                       className="w-6 h-6 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF]"
//                     >
//                       <Plus className="w-2.5 h-2.5" />
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => handleAddToCart(addOn)}
//                     disabled={isAdding}
//                     className="px-2 py-0.5 text-[10px] font-medium text-white bg-gradient-to-r from-[#8B9D83] to-[#465641] rounded-lg hover:shadow-lg transition-all flex items-center gap-1 disabled:opacity-50"
//                   >
//                     {isAdding ? (
//                       <Loader2 className="w-2.5 h-2.5 animate-spin" />
//                     ) : (
//                       <ShoppingCart className="w-2.5 h-2.5" />
//                     )}
//                     Add
//                   </button>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // RELATED PRODUCT CARD - Beauty Bucket Style
// // ============================================================

// const RelatedProductCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [imageErrors, setImageErrors] = useState({});
//   const [hasUserNavigated, setHasUserNavigated] = useState(false);

//   const productId = product?._id || product?.id || 'unknown';
//   const productName = product?.productName || product?.name || 'Product';
//   const regularPrice = Number(product?.regularPrice || product?.price || 0);
//   const discountPrice = Number(product?.discountPrice || 0);
//   const stockQuantity = Number(product?.stockQuantity || 0);

//   const brand = product?.brand
//     ? typeof product.brand === 'string'
//       ? product.brand
//       : product.brand?.name || product.brand?.title || 'General'
//     : product?.brandName || 'General';

//   let productImages = [];
//   if (product?.images && Array.isArray(product.images)) {
//     productImages = product.images
//       .map((img) => {
//         if (typeof img === 'string') return img;
//         if (img?.url) return img.url;
//         return null;
//       })
//       .filter(Boolean);
//   }
//   if (productImages.length === 0 && product?.image) {
//     productImages = [typeof product.image === 'string' ? product.image : product.image?.url || ''].filter(Boolean);
//   }
//   if (productImages.length === 0) {
//     productImages = ['/placeholder-product.jpg'];
//   }

//   const hasHoverImage = productImages.length > 1;
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const hasMultipleImages = productImages.length > 1;
//   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;

//   const isOutOfStock = stockQuantity <= 0;
//   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;

//   const rating = product?.rating ? Number(product.rating) : 0;
//   const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     setIsInCart(propIsInCart || false);
//   }, [propIsInCart]);

//   useEffect(() => {
//     if (!isHovered) {
//       setHasUserNavigated(false);
//       setActiveIndex(0);
//     }
//   }, [isHovered]);

//   const nextImage = (e) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev + 1) % productImages.length);
//       setHasUserNavigated(true);
//     }
//   };

//   const prevImage = (e) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
//       setHasUserNavigated(true);
//     }
//   };

//   const goToImage = (e, index) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     setActiveIndex(index);
//     setHasUserNavigated(true);
//   };

//   const handleImageError = (index) => {
//     setImageErrors((prev) => ({ ...prev, [index]: true }));
//   };

//   const getCurrentImage = () => {
//     if (isHovered && hasHoverImage && !isMobile && !hasUserNavigated) {
//       const hoverIndex = 1;
//       const image = productImages[hoverIndex] || productImages[0];
//       if (imageErrors[hoverIndex]) {
//         return productImages[0] || '/placeholder-product.jpg';
//       }
//       return image;
//     }

//     const image = productImages[activeIndex] || productImages[0];
//     if (imageErrors[activeIndex]) {
//       return '/placeholder-product.jpg';
//     }
//     return image;
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     setHasUserNavigated(false);
//     setActiveIndex(0);
//   };

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isInCart) {
//       if (onViewInCart) onViewInCart();
//       return;
//     }

//     if (isOutOfStock) {
//       toast.error('Product is out of stock!');
//       return;
//     }

//     setCartStatusLoading(true);
//     const toastId = toast.loading('Adding to cart...');

//     try {
//       const token = localStorage.getItem('token');
//       let sessionId = localStorage.getItem('cartSessionId');

//       const headers = { 'Content-Type': 'application/json' };

//       if (!token && !sessionId) {
//         sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//         localStorage.setItem('cartSessionId', sessionId);
//       }

//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }

//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId: productId, quantity: 1 })
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success('Added to cart!', { id: toastId });
//         setIsInCart(true);
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     } finally {
//       setCartStatusLoading(false);
//     }
//   };

//   const renderStars = () => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Star key={i} className="h-2.5 w-2.5 fill-current text-[#8B9D83]" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-2.5 w-2.5">
//             <Star className="absolute h-2.5 w-2.5 text-gray-200" />
//             <div className="absolute left-0 top-0 h-2.5 w-1/2 overflow-hidden">
//               <Star className="h-2.5 w-2.5 fill-current text-[#8B9D83]" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-2.5 w-2.5 text-[#8B9D83]/30" />);
//       }
//     }
//     return stars;
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className="group w-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//     >
//       <Link href={`/product/${product?.slug || productId}`} className="block h-full">
//         <article
//           className={`
//             group
//             relative
//             flex
//             w-full
//             flex-col
//             rounded-[3px]
//             bg-[#FDF7EF]
//             px-2.5
//             pb-3
//             pt-2
//             transition-all
//             duration-300
//             ${isHovered ? '-translate-y-1 shadow-[0_5px_20px_rgba(139,157,131,0.15)]' : ''}
//           `}
//         >
//           {/* DISCOUNT BADGE */}
//           {discountPercent > 0 && (
//             <motion.div
//               className="absolute left-2.5 top-2 z-10"
//               animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
//               transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
//             >
//               <span className="relative flex items-center justify-center overflow-hidden rounded-full bg-[#8B9D83] px-2 py-[3px] text-[7px] font-semibold tracking-wide text-white sm:text-[8px]" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                 {isHovered && (
//                   <motion.div
//                     className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                     initial={{ x: '-100%' }}
//                     animate={{ x: '200%' }}
//                     transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
//                   />
//                 )}
//                 <span className="relative z-10">{discountPercent}% OFF</span>
//               </span>
//             </motion.div>
//           )}

//           {/* SHOPPING BAG ICON */}
//           <button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={isOutOfStock || cartStatusLoading}
//             aria-label="Add to cart"
//             className={`
//               absolute
//               right-2.5
//               top-2
//               z-10
//               flex
//               h-6
//               w-6
//               items-center
//               justify-center
//               rounded-full
//               text-[#3A4A3F]
//               transition-all
//               duration-200
//               hover:bg-white
//               hover:text-[#8B9D83]
//               disabled:opacity-50
//               disabled:cursor-not-allowed
//               ${isHovered ? 'opacity-100' : 'opacity-70'}
//             `}
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="h-3.5 w-3.5 animate-spin" />
//             ) : (
//               <ShoppingCart size={15} strokeWidth={1.7} />
//             )}
//           </button>

//           {/* PRODUCT IMAGE */}
//           <div
//             className="
//               flex
//               h-[145px]
//               w-full
//               items-center
//               justify-center
//               overflow-hidden
//               rounded-sm
//               bg-[#FDF7EF]
//               relative
//               sm:h-[165px]
//               lg:h-[180px]
//             "
//           >
//             <motion.img
//               src={getCurrentImage()}
//               alt={productName}
//               className="
//                 h-full
//                 w-full
//                 object-contain
//                 p-2
//                 transition-transform
//                 duration-500
//               "
//               animate={{ scale: isHovered ? 1.06 : 1 }}
//               transition={{ duration: 0.5, ease: 'easeOut' }}
//               onError={() => handleImageError(isHovered && hasHoverImage && !isMobile && !hasUserNavigated ? 1 : activeIndex)}
//               loading="lazy"
//             />

//             {/* Image Navigation Arrows */}
//             {hasMultipleImages && (
//               <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
//                 <motion.button
//                   type="button"
//                   onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
//                   onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(e); }}
//                   className="rounded-full bg-white/80 p-0.5 shadow-sm hover:bg-white"
//                   aria-label="Previous image"
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <ChevronLeft className="h-3 w-3 text-[#8B9D83]" />
//                 </motion.button>

//                 <div className="flex items-center gap-0.5">
//                   {productImages.map((_, index) => (
//                     <motion.button
//                       key={index}
//                       type="button"
//                       onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
//                       onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToImage(e, index); }}
//                       className={`rounded-full transition-all duration-200 ${
//                         activeIndex === index
//                           ? 'h-1.5 w-1.5 bg-[#8B9D83]'
//                           : 'h-1 w-1 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/60'
//                       }`}
//                       whileHover={{ scale: 1.3 }}
//                       aria-label={`Go to image ${index + 1}`}
//                     />
//                   ))}
//                 </div>

//                 <motion.button
//                   type="button"
//                   onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
//                   onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(e); }}
//                   className="rounded-full bg-white/80 p-0.5 shadow-sm hover:bg-white"
//                   aria-label="Next image"
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <ChevronRight className="h-3 w-3 text-[#8B9D83]" />
//                 </motion.button>
//               </div>
//             )}

//             {/* Out of Stock Overlay */}
//             {isOutOfStock && (
//               <div className="absolute inset-0 z-20 flex items-center justify-center rounded-sm bg-black/50">
//                 <span className="rounded-full bg-black px-3 py-1 text-[10px] font-medium text-white" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                   Out of Stock
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* PRODUCT NAME */}
//           <h3
//             className="
//               mt-1
//               truncate
//               text-center
//               text-[11px]
//               font-semibold
//               text-[#2D1B2E]
//               transition-colors
//               duration-300
//               group-hover:text-[#465641]
//               sm:text-xs
//             "
//             style={{ fontFamily: FONT_FAMILY_SANS }}
//             title={productName}
//           >
//             {truncateText(productName, 25)}
//           </h3>

//           {/* RATING */}
//           <div className="mt-1 flex items-center justify-center gap-[2px]">
//             <div className="flex">{renderStars()}</div>
//             {reviewCount > 0 && (
//               <span className="ml-1 text-[9px] text-[#465641] sm:text-[10px]" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                 ({reviewCount})
//               </span>
//             )}
//           </div>

//           {/* PRICE */}
//           <div className="mt-1 text-center">
//             {discountPercent > 0 ? (
//               <>
//                 <span className="text-[12px] font-bold text-[#465641] sm:text-sm" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                   ৳{formatPrice(currentPrice)}
//                 </span>
//                 <span className="ml-1.5 text-[10px] text-[#9CA3AF] line-through sm:text-[11px]" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                   ৳{formatPrice(originalPrice)}
//                 </span>
//               </>
//             ) : (
//               <span className="text-[12px] font-bold text-[#2D1B2E] sm:text-sm" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                 ৳{formatPrice(currentPrice)}
//               </span>
//             )}
//           </div>

//           {/* ADD TO BAG BUTTON */}
//           <motion.button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={isOutOfStock || cartStatusLoading}
//             whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
//             whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
//             className={`
//               mt-2
//               h-[29px]
//               w-full
//               rounded-[2px]
//               border
//               text-[9px]
//               font-medium
//               uppercase
//               tracking-wide
//               transition-all
//               duration-200
//               sm:h-[31px]
//               sm:text-[10px]
//               ${isInCart
//                 ? 'border-[#8B9D83] bg-[#8B9D83] text-white'
//                 : isOutOfStock
//                 ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
//                 : 'border-[#8B9D83]/30 bg-white text-[#2D1B2E] hover:border-[#8B9D83] hover:bg-[#8B9D83] hover:text-white'
//               }
//             `}
//             style={{ fontFamily: FONT_FAMILY_SANS }}
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="mx-auto h-3 w-3 animate-spin" />
//             ) : isInCart ? (
//               'IN BAG'
//             ) : isOutOfStock ? (
//               'OUT OF STOCK'
//             ) : (
//               'ADD TO BAG'
//             )}
//           </motion.button>
//         </article>
//       </Link>
//     </motion.div>
//   );
// };

// // ============================================================
// // REVIEW COMPONENT
// // ============================================================

// const ReviewItem = ({ review, isOwner }) => {
//   const [helpfulCount, setHelpfulCount] = useState(review.helpful || 0);
//   const [isHelpful, setIsHelpful] = useState(false);
//   const [markingHelpful, setMarkingHelpful] = useState(false);
//   const [mediaModalOpen, setMediaModalOpen] = useState(false);
//   const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
//   const [videoThumbnails, setVideoThumbnails] = useState({});
//   const [generatingThumbnails, setGeneratingThumbnails] = useState({});
//   const [mediaItems, setMediaItems] = useState([]);
//   const thumbnailGeneratedRef = useRef({});

//   const handleHelpful = async () => {
//     if (isHelpful) return;
//     setMarkingHelpful(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('Please login to mark reviews as helpful');
//         return;
//       }
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${review._id}/helpful`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setHelpfulCount(prev => prev + 1);
//         setIsHelpful(true);
//         toast.success('Thanks for your feedback!');
//       }
//     } catch (error) {
//       console.error('Error marking helpful:', error);
//     } finally {
//       setMarkingHelpful(false);
//     }
//   };

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const renderStars = (rating) => {
//     return (
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`w-3.5 h-3.5 ${star <= rating ? 'fill-[#8B9D83] text-[#8B9D83]' : 'text-gray-300'}`}
//           />
//         ))}
//       </div>
//     );
//   };

//   const generateVideoThumbnail = useCallback((videoUrl, videoId) => {
//     if (thumbnailGeneratedRef.current[videoId] || generatingThumbnails[videoId]) return;
//     thumbnailGeneratedRef.current[videoId] = true;
//     setGeneratingThumbnails(prev => ({ ...prev, [videoId]: true }));
//     const video = document.createElement('video');
//     video.crossOrigin = 'Anonymous';
//     video.src = videoUrl;
//     video.currentTime = 1.5;
//     const handleLoadedData = () => {
//       setTimeout(() => {
//         try {
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');
//           canvas.width = 160;
//           canvas.height = 160;
//           ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//           const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
//           setVideoThumbnails(prev => ({ ...prev, [videoId]: thumbnailUrl }));
//           setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
//         } catch (error) {
//           console.error('Error generating thumbnail:', error);
//           setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
//         }
//       }, 100);
//     };
//     const handleError = () => {
//       console.error('Error loading video for thumbnail generation');
//       setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
//     };
//     video.addEventListener('loadeddata', handleLoadedData);
//     video.addEventListener('error', handleError);
//     video.load();
//     return () => {
//       video.removeEventListener('loadeddata', handleLoadedData);
//       video.removeEventListener('error', handleError);
//     };
//   }, [generatingThumbnails]);

//   useEffect(() => {
//     const items = [];
//     if (review.images && review.images.length > 0) {
//       review.images.forEach(img => {
//         items.push({
//           type: 'image',
//           url: img.url,
//           thumbnail: img.url,
//           id: `img-${Date.now()}-${Math.random()}`
//         });
//       });
//     }
//     if (review.video && review.video.url) {
//       const videoId = `video-${Date.now()}-${Math.random()}`;
//       const isYouTube = review.videoType === 'youtube' || review.video.url?.includes('youtube.com') || review.video.url?.includes('youtu.be');
//       items.push({
//         type: 'video',
//         url: review.video.url,
//         videoType: review.videoType || 'upload',
//         thumbnail: review.video.thumbnail || review.video.url,
//         id: videoId,
//         isYouTube: isYouTube
//       });
//       if (!isYouTube && !videoThumbnails[videoId] && !thumbnailGeneratedRef.current[videoId]) {
//         generateVideoThumbnail(review.video.url, videoId);
//       }
//     }
//     setMediaItems(items);
//   }, [review]);

//   const handleMediaClick = (index) => {
//     setSelectedMediaIndex(index);
//     setMediaModalOpen(true);
//   };

//   return (
//     <>
//       <div className={`border-b border-[#8B9D83]/20 last:border-0 py-4 last:pb-0 ${review.status === 'pending' ? 'opacity-80 bg-[#FDF7EF]/50 rounded-lg px-3 -mx-3' : ''}`}>
//         <div className="flex items-start gap-3">
//           <div className="flex-shrink-0">
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${review.status === 'pending' ? 'bg-[#8B9D83]' : 'bg-[#2D1B2E]'}`}>
//               {review.isAnonymous ? 'A' : getInitials(review.userName)}
//             </div>
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-start justify-between gap-2">
//               <div>
//                 <p className="font-medium text-[#2D1B2E] text-sm" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                   {review.isAnonymous ? 'Anonymous User' : review.userName}
//                 </p>
//                 <div className="flex items-center gap-2 mt-0.5 flex-wrap">
//                   {renderStars(review.rating)}
//                   <span className="text-xs text-[#6B7280]">{formatDate(review.createdAt)}</span>
//                   {review.isVerifiedPurchase && (
//                     <span className="text-[10px] bg-[#8B9D83]/20 text-[#465641] px-1.5 py-0.5 rounded-full font-medium">Verified</span>
//                   )}
//                   {isOwner && (
//                     <span className="text-[10px] bg-[#8B9D83]/20 text-[#465641] px-1.5 py-0.5 rounded-full font-medium">Your Review</span>
//                   )}
//                   {review.status === 'pending' && (
//                     <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1">
//                       <Clock className="w-3 h-3" /> Pending Approval
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//             {review.title && (
//               <h4 className="font-semibold text-[#2D1B2E] text-sm mt-1.5" style={{ fontFamily: FONT_FAMILY_SANS }}>{review.title}</h4>
//             )}
//             <p className="text-[#3A4A3F] text-sm mt-1 leading-relaxed">{review.comment}</p>
//             {review.status === 'pending' && isOwner && (
//               <div className="mt-2 text-xs text-yellow-800 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
//                 <Clock className="w-3 h-3 inline mr-1" />
//                 This review is awaiting moderation. It will be visible to others once approved.
//               </div>
//             )}
//             {review.status === 'approved' && mediaItems.length > 0 && (
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {mediaItems.map((item, idx) => {
//                   if (item.type === 'image') {
//                     return (
//                       <img
//                         key={item.id || idx}
//                         src={item.url}
//                         alt={`Review image ${idx + 1}`}
//                         className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-[#8B9D83]/20 hover:border-[#8B9D83]"
//                         onClick={() => handleMediaClick(idx)}
//                       />
//                     );
//                   } else if (item.type === 'video') {
//                     const isYouTube = item.isYouTube;
//                     const thumbUrl = isYouTube ? getYouTubeThumbnail(item.url) : (videoThumbnails[item.id] || item.thumbnail);
//                     return (
//                       <button
//                         key={item.id || idx}
//                         onClick={() => handleMediaClick(idx)}
//                         className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative border-[#8B9D83]/20 hover:border-[#8B9D83]"
//                       >
//                         {thumbUrl ? (
//                           <img src={thumbUrl} alt="Video thumbnail" className="w-full h-full object-cover" />
//                         ) : (
//                           <div className="w-full h-full bg-[#FDF7EF] flex items-center justify-center">
//                             {generatingThumbnails[item.id] ? (
//                               <Loader2 className="w-4 h-4 text-[#8B9D83] animate-spin" />
//                             ) : (
//                               <Play className="w-4 h-4 text-[#8B9D83]" />
//                             )}
//                           </div>
//                         )}
//                         <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
//                           <Play className="w-5 h-5 text-white" />
//                         </div>
//                       </button>
//                     );
//                   }
//                   return null;
//                 })}
//               </div>
//             )}
//             {review.status === 'approved' && review.reply?.text && (
//               <div className="mt-3 bg-[#FDF7EF] rounded-lg p-3 border border-[#8B9D83]/20">
//                 <p className="text-xs font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY_SANS }}>Seller Response</p>
//                 <p className="text-sm text-[#3A4A3F]">{review.reply.text}</p>
//                 <p className="text-xs text-[#6B7280] mt-1">{new Date(review.reply.repliedAt).toLocaleDateString()}</p>
//               </div>
//             )}
//             {review.status === 'approved' && (
//               <button
//                 onClick={handleHelpful}
//                 disabled={markingHelpful || isHelpful}
//                 className={`mt-2 flex items-center gap-1.5 text-xs transition-colors ${isHelpful ? 'text-[#465641]' : 'text-[#6B7280] hover:text-[#465641]'} disabled:opacity-50`}
//               >
//                 <ThumbsUp className={`w-3.5 h-3.5 ${isHelpful ? 'fill-[#465641]' : ''}`} />
//                 <span>Helpful ({helpfulCount})</span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <ReviewMediaModal
//         isOpen={mediaModalOpen}
//         onClose={() => setMediaModalOpen(false)}
//         mediaItems={mediaItems}
//         initialIndex={selectedMediaIndex}
//         reviewTitle={review.title || review.comment?.slice(0, 50)}
//       />
//     </>
//   );
// };

// // ============================================================
// // MAIN PRODUCT CLIENT COMPONENT
// // ============================================================

// export default function ProductClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();

//   const [productIdentifier, setProductIdentifier] = useState(null);
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [zoomImageIndex, setZoomImageIndex] = useState(0);
//   const [isInCart, setIsInCart] = useState(false);
//   const [addingToCart, setAddingToCart] = useState(false);
//   const [showZoom, setShowZoom] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
//   const [imageLoaded, setImageLoaded] = useState({});
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [videoThumbnail, setVideoThumbnail] = useState(null);
//   const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
//   const [checkingCart, setCheckingCart] = useState(true);
//   const [carouselIndex, setCarouselIndex] = useState(0);
//   const [carouselItemsPerView, setCarouselItemsPerView] = useState(6);
//   const [isAutoScrolling, setIsAutoScrolling] = useState(true);
//   const autoScrollIntervalRef = useRef(null);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [activeTab, setActiveTab] = useState('description');
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [faqOpenStates, setFaqOpenStates] = useState({});

//   // ========== VARIANT STATE ==========
//   const [selectedVariants, setSelectedVariants] = useState([]);
//   const [variantErrors, setVariantErrors] = useState([]);
//   const [variantImages, setVariantImages] = useState(null);
//   const [activeVariantDiscount, setActiveVariantDiscount] = useState(null);
//   const [activeVariantPrice, setActiveVariantPrice] = useState(null);
//   const [activeVariantRegularPrice, setActiveVariantRegularPrice] = useState(null);

//   // ========== REVIEW STATE ==========
//   const [reviews, setReviews] = useState([]);
//   const [reviewStats, setReviewStats] = useState(null);
//   const [loadingReviews, setLoadingReviews] = useState(false);
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [reviewPage, setReviewPage] = useState(1);
//   const [reviewTotalPages, setReviewTotalPages] = useState(1);
//   const [reviewTotal, setReviewTotal] = useState(0);
//   const [reviewFilter, setReviewFilter] = useState('all');
//   const [reviewSort, setReviewSort] = useState('newest');
//   const [userReview, setUserReview] = useState(null);
//   const [checkingUserReview, setCheckingUserReview] = useState(false);

//   // For single product without variants
//   const [singleQuantity, setSingleQuantity] = useState(1);

//   const galleryRef = useRef(null);
//   const variantContainerRef = useRef(null);

//   const [clearPreviewTrigger, setClearPreviewTrigger] = useState(false);
//   const [previewCleared, setPreviewCleared] = useState(false);

//   // ========== CART FUNCTIONS ==========

//   const openCartSidebar = () => setIsCartOpen(true);
//   const closeCartSidebar = () => setIsCartOpen(false);

//   const checkCartStatus = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
//       else { setIsInCart(false); setCheckingCart(false); return; }
//       if (!product || !product._id) { setCheckingCart(false); return; }
//       const response = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
//       const data = await response.json();
//       if (data.success) setIsInCart(data.data.inCart || false);
//       else setIsInCart(false);
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//       setIsInCart(false);
//     } finally {
//       setCheckingCart(false);
//     }
//   };

//   // ========== REVIEW FUNCTIONS ==========

//   const fetchReviews = async (page = 1) => {
//     if (!product?._id) return;
//     setLoadingReviews(true);
//     try {
//       const token = localStorage.getItem('token');
//       const headers = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       const params = new URLSearchParams({
//         productId: product._id,
//         page: page,
//         limit: 5,
//         status: 'approved'
//       });
//       if (reviewSort === 'newest') params.append('sort', '-createdAt');
//       else if (reviewSort === 'oldest') params.append('sort', 'createdAt');
//       else if (reviewSort === 'highest') params.append('sort', '-rating');
//       else if (reviewSort === 'lowest') params.append('sort', 'rating');
//       if (token) params.append('includeUserPending', 'true');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?${params}`, { headers });
//       const data = await response.json();
//       if (data.success) {
//         let reviewData = data.data || [];
//         if (reviewFilter === 'with_media') {
//           reviewData = reviewData.filter(r => (r.images && r.images.length > 0) || (r.video && r.video.url));
//         }
//         reviewData.sort((a, b) => {
//           if (a.status === 'pending' && b.status !== 'pending') return -1;
//           if (a.status !== 'pending' && b.status === 'pending') return 1;
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         });
//         setReviews(reviewData);
//         setReviewStats(data.stats || null);
//         setReviewTotal(data.pagination?.total || 0);
//         setReviewTotalPages(data.pagination?.pages || 1);
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     } finally {
//       setLoadingReviews(false);
//     }
//   };

//   const checkUserReview = async () => {
//     const token = localStorage.getItem('token');
//     if (!token || !product?._id) return;
//     setCheckingUserReview(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?productId=${product._id}&userId=me`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success && data.data.length > 0) setUserReview(data.data[0]);
//       else setUserReview(null);
//     } catch (error) {
//       console.error('Error checking user review:', error);
//     } finally {
//       setCheckingUserReview(false);
//     }
//   };

//   // ========== VARIANT FUNCTIONS ==========

//   const handleVariantSelect = (variantType, variant, updatedSelected) => {
//     if (!updatedSelected) return;

//     const variantId = updatedSelected.variantId;
    
//     const existingIndex = selectedVariants.findIndex(sv => sv.variantId === variantId);

//     let updatedVariants;
    
//     if (existingIndex >= 0) {
//       updatedVariants = [...selectedVariants];
//       updatedVariants[existingIndex] = { 
//         ...updatedVariants[existingIndex], 
//         ...updatedSelected 
//       };
//     } else {
//       updatedVariants = [...selectedVariants, updatedSelected];
//     }
    
//     setSelectedVariants(updatedVariants);
//     setVariantErrors([]);
//   };

//   const handleVariantQuantityChange = (variantId, newQuantity) => {
//     setSelectedVariants(prev =>
//       prev.map(sv =>
//         sv.variantId === variantId
//           ? { ...sv, quantity: Math.max(1, Math.min(newQuantity, sv.stockQuantity || 999)) }
//           : sv
//       )
//     );
//   };

//   const handleVariantRemove = (variantId) => {
//     setSelectedVariants(prev => prev.filter(sv => sv.variantId !== variantId));
//     if (selectedVariants.length <= 1) {
//       setVariantImages(null);
//       setActiveVariantDiscount(null);
//       setActiveVariantPrice(null);
//       setActiveVariantRegularPrice(null);
//     }
//   };

//   const handleVariantImageSelect = (images, variantInfo = null) => {
//     if (images && images.length > 0) {
//       setVariantImages(images);
//     } else {
//       setVariantImages(null);
//     }
    
//     if (variantInfo) {
//       const regular = variantInfo.regularPrice || 0;
//       const discount = variantInfo.discountPrice || 0;
      
//       setActiveVariantRegularPrice(regular);
      
//       if (discount > 0 && discount < regular) {
//         const pct = Math.round(((regular - discount) / regular) * 100);
//         setActiveVariantDiscount(pct);
//         setActiveVariantPrice(discount);
//       } else {
//         setActiveVariantDiscount(null);
//         setActiveVariantPrice(null);
//       }
//     } else {
//       setActiveVariantDiscount(null);
//       setActiveVariantPrice(null);
//       setActiveVariantRegularPrice(null);
//     }
    
//     setActiveImageIndex(0);
//   };

//   const getCurrentImages = () => {
//     if (variantImages && variantImages.length > 0) {
//       return variantImages.map(url => ({ url }));
//     }
//     return product?.images || [];
//   };

//   const getAllImagesWithVariants = () => {
//     const imageMap = new Map();
    
//     (product?.images || []).forEach(img => {
//       const url = typeof img === 'string' ? img : img?.url;
//       if (url && !imageMap.has(url)) {
//         imageMap.set(url, { url, source: 'product' });
//       }
//     });
    
//     if (product?.variantTypes) {
//       product.variantTypes.forEach(vt => {
//         (vt.variants || []).forEach(variant => {
//           const variantImgs = [
//             ...(variant.imagePreviews || []),
//             ...(variant.images || [])
//           ].filter(Boolean);
          
//           variantImgs.forEach(img => {
//             const url = typeof img === 'string' ? img : img?.url;
//             if (url && !imageMap.has(url)) {
//               imageMap.set(url, { url, source: 'variant' });
//             }
//           });
          
//           (variant.subVariants || []).forEach(sub => {
//             const subImgs = [
//               ...(sub.imagePreviews || []),
//               ...(sub.images || [])
//             ].filter(Boolean);
            
//             subImgs.forEach(img => {
//               const url = typeof img === 'string' ? img : img?.url;
//               if (url && !imageMap.has(url)) {
//                 imageMap.set(url, { url, source: 'subVariant' });
//               }
//             });
//           });
//         });
//       });
//     }
    
//     return Array.from(imageMap.values());
//   };

//   const getTotalVariantQuantity = () => {
//     return selectedVariants.reduce((sum, sv) => {
//       if (sv.subVariants && sv.subVariants.length > 0) {
//         const subTotal = sv.subVariants.reduce((s, sub) => s + (sub.quantity || 0), 0);
//         return sum + subTotal;
//       }
//       return sum + (sv.quantity || 0);
//     }, 0);
//   };

//   const getTotalVariantPrice = () => {
//     return selectedVariants.reduce((sum, sv) => {
//       if (sv.subVariants && sv.subVariants.length > 0) {
//         const subTotal = sv.subVariants.reduce((s, sub) => {
//           const subPrice = sub.discountPrice > 0 && sub.discountPrice < sub.regularPrice 
//             ? sub.discountPrice 
//             : sub.regularPrice;
//           return s + (subPrice * (sub.quantity || 0));
//         }, 0);
//         return sum + subTotal;
//       }
      
//       const price = sv.discountPrice > 0 && sv.discountPrice < sv.regularPrice 
//         ? sv.discountPrice 
//         : sv.regularPrice;
//       return sum + (price * (sv.quantity || 0));
//     }, 0);
//   };

//   const hasVariantSelections = () => {
//     return selectedVariants.length > 0;
//   };

//   // ========== EFFECTS ==========

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (variantContainerRef.current && !variantContainerRef.current.contains(event.target)) {
//         setVariantImages(null);
//         setActiveVariantDiscount(null);
//         setActiveVariantPrice(null);
//         setActiveVariantRegularPrice(null);
//         setActiveImageIndex(0);
//         setClearPreviewTrigger(prev => !prev);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     let id = searchParams.get('id');
//     if (!id) {
//       const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
//       const segments = cleanPath.split('/');
//       if (segments[0] === 'product' && segments[1]) id = segments[1];
//     }
//     if (id && id !== productIdentifier) setProductIdentifier(id);
//   }, [searchParams, pathname]);

//   useEffect(() => {
//     if (productIdentifier) fetchProductDetails();
//   }, [productIdentifier]);

//   useEffect(() => {
//     if (product?.videoUrl && product?.videoType !== 'youtube' && !videoThumbnail && !generatingThumbnail) {
//       setGeneratingThumbnail(true);
//       generateVideoThumbnail(product.videoUrl, (thumbnail) => {
//         if (thumbnail) setVideoThumbnail(thumbnail);
//         setGeneratingThumbnail(false);
//       });
//     }
//   }, [product?.videoUrl, product?.videoType]);

//   useEffect(() => {
//     if (product && product._id) {
//       checkCartStatus();
//       checkUserReview();
//     }
//   }, [product]);

//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (product && product._id) { setCheckingCart(true); checkCartStatus(); }
//     };
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [product]);

//   useEffect(() => {
//     const handleAuthChange = () => {
//       if (product && product._id) {
//         setIsInCart(false);
//         setCheckingCart(true);
//         setTimeout(() => { checkCartStatus(); checkUserReview(); }, 100);
//       }
//     };
//     window.addEventListener('auth-change', handleAuthChange);
//     return () => window.removeEventListener('auth-change', handleAuthChange);
//   }, [product]);

//   useEffect(() => {
//     const handleFocus = () => {
//       if (product && product._id) checkCartStatus();
//     };
//     window.addEventListener('focus', handleFocus);
//     return () => window.removeEventListener('focus', handleFocus);
//   }, [product]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) setCarouselItemsPerView(2);
//       else if (window.innerWidth < 768) setCarouselItemsPerView(2);
//       else if (window.innerWidth < 1024) setCarouselItemsPerView(3);
//       else setCarouselItemsPerView(6);
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (isAutoScrolling && relatedProducts.length > carouselItemsPerView) {
//       autoScrollIntervalRef.current = setInterval(() => {
//         setCarouselIndex((prev) => {
//           const totalSlides = Math.ceil(relatedProducts.length / carouselItemsPerView);
//           if (prev >= totalSlides - 1) return 0;
//           return prev + 1;
//         });
//       }, 5000);
//     }
//     return () => {
//       if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
//     };
//   }, [isAutoScrolling, relatedProducts.length, carouselItemsPerView]);

//   useEffect(() => {
//     if (product && product.faqs && product.faqs.length > 0) {
//       const initialStates = {};
//       product.faqs.forEach((_, index) => { initialStates[index] = false; });
//       setFaqOpenStates(initialStates);
//     }
//   }, [product]);

//   useEffect(() => {
//     const refreshRelatedProductsStatus = async () => {
//       if (relatedProducts.length === 0) return;
//       const productIds = relatedProducts.map(p => p._id);
//       const token = localStorage.getItem('token');
//       const cartSessionId = localStorage.getItem('cartSessionId');
//       const cartHeaders = {};
//       if (token) cartHeaders['Authorization'] = `Bearer ${token}`;
//       else if (cartSessionId) cartHeaders['x-session-id'] = cartSessionId;
//       try {
//         const cartResponse = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...cartHeaders, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds })
//         });
//         const cartData = await cartResponse.json();
//         if (cartData.success) setProductsInCart(cartData.data);
//       } catch (error) {
//         console.error('Error refreshing cart status:', error);
//       }
//     };
//     refreshRelatedProductsStatus();
//     const handleCartUpdate = () => refreshRelatedProductsStatus();
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [relatedProducts]);

//   useEffect(() => {
//     if (product?._id && activeTab === 'reviews') {
//       fetchReviews(reviewPage);
//     }
//   }, [product?._id, activeTab, reviewPage, reviewFilter, reviewSort]);

//   // ========== FETCH PRODUCT DETAILS ==========

//   const fetchProductDetails = async () => {
//     if (!productIdentifier) {
//       toast.error('Product not found');
//       router.push('/products');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${encodeURIComponent(productIdentifier)}`);
//       const data = await response.json();
//       if (data.success) {
//         const productData = data.data.product;
//         setProduct(productData);
//         setRelatedProducts(data.data.relatedProducts || []);
//         if (productData.slug) {
//           const currentPath = window.location.pathname;
//           const normalizedCurrentPath = currentPath.replace(/\/+$/, '');
//           const expectedPath = `/product/${productData.slug}`;
//           if (normalizedCurrentPath !== expectedPath) {
//             window.history.replaceState({}, '', expectedPath);
//           }
//         }
//         if (productData.hasVariants && productData.variantTypes) {
//           setSelectedVariants([]);
//         }
//       } else {
//         toast.error('Product not found');
//         router.push('/products');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to load product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ========== ADD TO CART WITH VARIANTS ==========
//   const handleAddToCart = async () => {
//     const hasVariants = product?.hasVariants && product?.variantTypes && product.variantTypes.length > 0;

//     if (hasVariants) {
//       if (!hasVariantSelections()) {
//         toast.error('Please select at least one variant before adding to cart');
//         return;
//       }

//       for (const sv of selectedVariants) {
//         if (sv.subVariants && sv.subVariants.length > 0) {
//           for (const sub of sv.subVariants) {
//             if (sub.quantity > sub.stockQuantity) {
//               toast.error(`Not enough stock for ${sub.name}. Available: ${sub.stockQuantity}`);
//               return;
//             }
//           }
//         } else {
//           if (sv.quantity > sv.stockQuantity) {
//             toast.error(`Not enough stock for ${sv.variantName}. Available: ${sv.stockQuantity}`);
//             return;
//           }
//         }
//       }
//     }

//     if (product.stockQuantity <= 0 && !hasVariants) {
//       toast.error('Out of stock');
//       return;
//     }

//     setAddingToCart(true);
//     const toastId = toast.loading('Adding items to cart...');

//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;

//       let successCount = 0;
//       let errorCount = 0;
//       let lastResponseData = null;

//       if (!hasVariants) {
//         const finalQuantity = singleQuantity === '' || singleQuantity === null ? 1 : singleQuantity;
//         const response = await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({ productId: product._id, quantity: finalQuantity, selectedColor: null })
//         });
//         const data = await response.json();
//         lastResponseData = data;
//         if (data.success) successCount++;
//         else errorCount++;
//       } else {
//         for (const sv of selectedVariants) {
//           if (sv.subVariants && sv.subVariants.length > 0) {
//             for (const sub of sv.subVariants) {
//               let actualVariantName = sv.variantName || sv.name || 'Variant';
              
//               if (product.variantTypes) {
//                 for (const vt of product.variantTypes) {
//                   for (const v of vt.variants || []) {
//                     if (v.id === sv.variantId || v._id?.toString() === sv.variantId) {
//                       actualVariantName = v.name || actualVariantName;
//                       break;
//                     }
//                   }
//                 }
//               }
              
//               const subResponse = await fetch('http://localhost:5000/api/cart', {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                   productId: product._id,
//                   quantity: sub.quantity || 1,
//                   variantId: sv.variantId,
//                   variantName: actualVariantName,
//                   variantType: sv.variantType || sv.type || 'default',
//                   subVariantId: sub.id || sub._id,
//                   subVariantName: sub.name || 'Sub-Variant',
//                   selectedColor: sub.color || sv.selectedColor || null,
//                   variantRegularPrice: sub.regularPrice || sv.variantRegularPrice || 0,
//                   variantDiscountPrice: sub.discountPrice || sv.variantDiscountPrice || 0,
//                   image: sub.images?.[0] || sub.subVariantImages?.[0] || sv.variantImages?.[0] || null,
//                   variantImage: sub.images?.[0] || sub.subVariantImages?.[0] || sv.variantImages?.[0] || null
//                 })
//               });
//               const subData = await subResponse.json();
//               if (subData.success) {
//                 successCount++;
//                 if (subData.sessionId && !token) localStorage.setItem('cartSessionId', subData.sessionId);
//               } else {
//                 errorCount++;
//               }
//             }
//           } else {
//             let actualVariantName = sv.variantName || sv.name || 'Variant';
            
//             if (product.variantTypes) {
//               for (const vt of product.variantTypes) {
//                 for (const v of vt.variants || []) {
//                   if (v.id === sv.variantId || v._id?.toString() === sv.variantId) {
//                     actualVariantName = v.name || actualVariantName;
//                     break;
//                   }
//                 }
//               }
//             }
            
//             const response = await fetch('http://localhost:5000/api/cart', {
//               method: 'POST',
//               headers,
//               body: JSON.stringify({
//                 productId: product._id,
//                 quantity: sv.quantity || 1,
//                 variantId: sv.variantId,
//                 variantName: actualVariantName,
//                 variantType: sv.variantType || sv.type || 'default',
//                 selectedColor: sv.selectedColor || null,
//                 variantRegularPrice: sv.variantRegularPrice || sv.regularPrice || 0,
//                 variantDiscountPrice: sv.variantDiscountPrice || sv.discountPrice || 0,
//                 image: sv.variantImages?.[0] || null,
//                 variantImage: sv.variantImages?.[0] || null
//               })
//             });
//             const data = await response.json();
//             lastResponseData = data;
//             if (data.success) {
//               successCount++;
//               if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
//             } else {
//               errorCount++;
//             }
//           }
//         }
//       }

//       if (successCount > 0) {
//         if (lastResponseData?.sessionId && !token) {
//           localStorage.setItem('cartSessionId', lastResponseData.sessionId);
//         }
//         setIsInCart(true);
//         toast.success(`${successCount} item(s) added to cart!`, { id: toastId });
//         window.dispatchEvent(new Event('cart-update'));
//         setTimeout(() => window.dispatchEvent(new Event('cart-update')), 500);

//         if (hasVariants) {
//           setSelectedVariants([]);
//           setVariantImages(null);
//           setActiveVariantDiscount(null);
//           setActiveVariantPrice(null);
//           setActiveVariantRegularPrice(null);
//         } else {
//           setSingleQuantity(1);
//         }
//       } else {
//         toast.error('Failed to add items to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error', { id: toastId });
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   // ========== BUY NOW ==========
//   const handleBuyNow = async () => {
//     const hasVariants = product?.hasVariants && product?.variantTypes && product.variantTypes.length > 0;

//     if (hasVariants) {
//       if (!hasVariantSelections()) {
//         toast.error('Please select at least one variant before proceeding');
//         return;
//       }
//       for (const sv of selectedVariants) {
//         if (sv.subVariants && sv.subVariants.length > 0) {
//           for (const sub of sv.subVariants) {
//             if (sub.quantity > sub.stockQuantity) {
//               toast.error(`Not enough stock for ${sub.name}. Available: ${sub.stockQuantity}`);
//               return;
//             }
//           }
//         } else {
//           if (sv.quantity > sv.stockQuantity) {
//             toast.error(`Not enough stock for ${sv.variantName}. Available: ${sv.stockQuantity}`);
//             return;
//           }
//         }
//       }
//     }

//     if (product.stockQuantity <= 0 && !hasVariants) {
//       toast.error('Out of stock');
//       return;
//     }

//     setAddingToCart(true);
//     const toastId = toast.loading('Processing...');

//     try {
//       const token = localStorage.getItem('token');
//       let sessionId = localStorage.getItem('cartSessionId');
//       if (!token && !sessionId) {
//         sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//         localStorage.setItem('cartSessionId', sessionId);
//       }
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;

//       let successCount = 0;
//       let lastResponseData = null;

//       if (!hasVariants) {
//         const finalQuantity = singleQuantity === '' || singleQuantity === null ? 1 : singleQuantity;
//         const response = await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({ productId: product._id, quantity: finalQuantity, selectedColor: null })
//         });
//         const data = await response.json();
//         lastResponseData = data;
//         if (data.success) {
//           successCount++;
//           if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
//         }
//       } else {
//         for (const sv of selectedVariants) {
//           if (sv.subVariants && sv.subVariants.length > 0) {
//             for (const sub of sv.subVariants) {
//               let actualVariantName = sv.variantName || sv.name || 'Variant';
//               if (product.variantTypes) {
//                 for (const vt of product.variantTypes) {
//                   for (const v of vt.variants || []) {
//                     if (v.id === sv.variantId || v._id?.toString() === sv.variantId) {
//                       actualVariantName = v.name || actualVariantName;
//                       break;
//                     }
//                   }
//                 }
//               }
              
//               const subResponse = await fetch('http://localhost:5000/api/cart', {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                   productId: product._id,
//                   quantity: sub.quantity || 1,
//                   variantId: sv.variantId,
//                   variantName: actualVariantName,
//                   variantType: sv.variantType || sv.type || 'default',
//                   subVariantId: sub.id || sub._id,
//                   subVariantName: sub.name || 'Sub-Variant',
//                   selectedColor: sub.color || sv.selectedColor || null,
//                   variantRegularPrice: sub.regularPrice || sv.variantRegularPrice || 0,
//                   variantDiscountPrice: sub.discountPrice || sv.variantDiscountPrice || 0,
//                   image: sub.images?.[0] || sub.subVariantImages?.[0] || sv.variantImages?.[0] || null,
//                   variantImage: sub.images?.[0] || sub.subVariantImages?.[0] || sv.variantImages?.[0] || null
//                 })
//               });
//               const subData = await subResponse.json();
//               if (subData.success) successCount++;
//             }
//           } else {
//             let actualVariantName = sv.variantName || sv.name || 'Variant';
//             if (product.variantTypes) {
//               for (const vt of product.variantTypes) {
//                 for (const v of vt.variants || []) {
//                   if (v.id === sv.variantId || v._id?.toString() === sv.variantId) {
//                     actualVariantName = v.name || actualVariantName;
//                     break;
//                   }
//                 }
//               }
//             }
            
//             const response = await fetch('http://localhost:5000/api/cart', {
//               method: 'POST',
//               headers,
//               body: JSON.stringify({
//                 productId: product._id,
//                 quantity: sv.quantity || 1,
//                 variantId: sv.variantId,
//                 variantName: actualVariantName,
//                 variantType: sv.variantType || sv.type || 'default',
//                 selectedColor: sv.selectedColor || null,
//                 variantRegularPrice: sv.variantRegularPrice || sv.regularPrice || 0,
//                 variantDiscountPrice: sv.variantDiscountPrice || sv.discountPrice || 0,
//                 image: sv.variantImages?.[0] || null,
//                 variantImage: sv.variantImages?.[0] || null
//               })
//             });
//             const data = await response.json();
//             lastResponseData = data;
//             if (data.success) {
//               successCount++;
//               if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
//             }
//           }
//         }
//       }

//       if (successCount > 0) {
//         setIsInCart(true);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Redirecting to checkout...', { id: toastId });
//         setTimeout(() => router.push('/checkout'), 500);
//       } else {
//         toast.error(lastResponseData?.error || 'Failed to process', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Buy now error:', error);
//       toast.error('Network error', { id: toastId });
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   // ========== ADD-ON HANDLER ==========

//   const handleAddOnToCart = async (addOn) => {
//     const id = addOn.productId?._id || addOn.productId;
//     const toastId = toast.loading(`Adding ${addOn.productName} to cart...`);
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;

//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId: id, quantity: 1 })
//       });
//       const data = await response.json();
//       if (data.success) {
//         if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
//         toast.success(`${addOn.productName} added to cart!`, { id: toastId });
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     }
//   };

//   // ========== RENDER FUNCTIONS ==========

//   const renderStarsForReview = (rating, size = 'small') => {
//     const starSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';
//     return (
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`${starSize} ${star <= rating ? 'fill-[#8B9D83] text-[#8B9D83]' : 'text-gray-300'}`}
//           />
//         ))}
//       </div>
//     );
//   };

//   const preloadImage = (src) => {
//     const img = new Image();
//     img.src = src;
//   };

//   const handleCarouselInteraction = () => {
//     setIsAutoScrolling(false);
//     setTimeout(() => setIsAutoScrolling(true), 5000);
//   };

//   const handlePrevSlide = () => {
//     handleCarouselInteraction();
//     setCarouselIndex((prev) => Math.max(0, prev - 1));
//   };

//   const handleNextSlide = () => {
//     handleCarouselInteraction();
//     const totalSlides = Math.ceil(relatedProducts.length / carouselItemsPerView);
//     setCarouselIndex((prev) => Math.min(prev + 1, totalSlides - 1));
//   };

//   const toggleFaq = (index) => {
//     setFaqOpenStates(prev => ({ ...prev, [index]: !prev[index] }));
//   };

//   // ========== LOADING STATES ==========

//   if (!productIdentifier) {
//     return (
//       <div className="min-h-screen bg-[#FDF7EF] flex items-center justify-center">
//         <div className="text-center">
//           <Package className="w-16 h-16 text-[#8B9D83]/40 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-[#2D1B2E] mb-2">Product Not Found</h2>
//           <p className="text-[#4B5563] mb-4">The product you're looking for doesn't exist.</p>
//           <Link href="/products" className="inline-block px-6 py-2 bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all">
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (loading) return <ProductSkeleton />;

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-[#FDF7EF] flex items-center justify-center">
//         <div className="text-center">
//           <Package className="w-16 h-16 text-[#8B9D83]/40 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-[#2D1B2E] mb-2">Product Not Found</h2>
//           <p className="text-[#4B5563] mb-4">The product you're looking for doesn't exist.</p>
//           <Link href="/products" className="inline-block px-6 py-2 bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all">
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // ========== COMPUTED VALUES ==========

//   const baseDiscountPercent = calculateDiscount(product.regularPrice, product.discountPrice);

//   const discountPercent = activeVariantDiscount !== null 
//     ? activeVariantDiscount 
//     : baseDiscountPercent;

//   const baseCurrentPrice = product.discountPrice && product.discountPrice < product.regularPrice 
//     ? product.discountPrice 
//     : product.regularPrice;

//   const currentPrice = activeVariantPrice !== null 
//     ? activeVariantPrice 
//     : baseCurrentPrice;

//   const displayRegularPrice = activeVariantRegularPrice !== null 
//     ? activeVariantRegularPrice 
//     : product.regularPrice;

//   const stockStatus = getStockStatus(product.stockQuantity, product.stockAlertQuantity);
//   const StockIcon = stockStatus.icon;
  
//   const currentImages = getCurrentImages();

//   const allImagesWithVariants = getAllImagesWithVariants();

//   const productImages = (variantImages && variantImages.length > 0)
//     ? currentImages
//     : allImagesWithVariants;

//   const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';
//   const mediaItems = [...productImages];
//   if (hasVideo) mediaItems.push({ type: 'video', url: product.videoUrl, videoType: product.videoType });
//   const mainMedia = mediaItems[activeImageIndex];
//   const isMainVideo = mainMedia?.type === 'video';
//   const mainImage = !isMainVideo ? mainMedia?.url : null;
//   const mainVideoUrl = isMainVideo ? mainMedia?.url : null;
//   const mainVideoType = isMainVideo ? mainMedia?.videoType : null;

//   const categoryHierarchy = [];
//   if (product.categoryName) categoryHierarchy.push(product.categoryName);
//   if (product.subcategoryName) categoryHierarchy.push(product.subcategoryName);
//   if (product.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

//   const hasDeliveryInfo = product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '';

//   const specifications = [
//     { label: 'Brand', value: product.brand, icon: Building2 },
//     { label: 'SKU', value: product.skuCode, icon: Package },
//     { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
//     { label: 'Category', value: product.categoryName, icon: FolderTree },
//     { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
//     { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
//   ].filter(item => item.value);

//   if (product.additionalInfo && product.additionalInfo.length > 0) {
//     product.additionalInfo.forEach(info => {
//       if (info.fieldName && info.fieldValue) {
//         specifications.push({ label: info.fieldName, value: info.fieldValue, icon: Info });
//       }
//     });
//   }

//   const hasVariants = product.hasVariants && product.variantTypes && product.variantTypes.length > 0;
//   const totalVariantQuantity = getTotalVariantQuantity();
//   const totalVariantPrice = getTotalVariantPrice();

//   const primaryTag = product.tags?.[0];
//   const primaryTagName = getTagName(primaryTag);

//   const averageRating = product.rating || 0;
//   const totalReviews = product.reviewStats?.totalReviews || 0;

//   // ============================================================
//   // MAIN RENDER
//   // ============================================================

//   return (
//     <>
//       {product && <MetadataUpdater product={product} />}
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-b from-[#FDF7EF] via-[#FDF7EF] to-[#FDF7EF]">
//         <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8 max-w-7xl">
//           {/* Breadcrumb */}
//           <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 md:mb-6 overflow-x-auto pb-2">
//             <Link href="/" className="text-[#3A4A3F] hover:text-[#465641] transition whitespace-nowrap font-medium" style={{ fontFamily: FONT_FAMILY_SANS }}>Home</Link>
//             <span className="text-[#8B9D83]/50">/</span>
//             <Link href="/products" className="text-[#3A4A3F] hover:text-[#465641] transition whitespace-nowrap font-medium" style={{ fontFamily: FONT_FAMILY_SANS }}>Products</Link>
//             {categoryHierarchy.map((cat, idx) => (
//               <React.Fragment key={idx}>
//                 <span className="text-[#8B9D83]/50">/</span>
//                 <span className="text-[#3A4A3F] truncate max-w-[100px] sm:max-w-none" style={{ fontFamily: FONT_FAMILY_SANS }}>{cat}</span>
//               </React.Fragment>
//             ))}
//             <span className="text-[#8B9D83]/50">/</span>
//             <span className="text-[#465641] font-semibold truncate max-w-[150px] sm:max-w-none" style={{ fontFamily: FONT_FAMILY_SANS }}>{product.productName}</span>
//           </nav>

//           <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
//             {/* Left Column - Product Gallery */}
//             <div className="lg:col-span-3" ref={galleryRef}>
//               <div className="sticky top-20 lg:top-24">
//                 <div className="relative bg-white rounded-2xl border border-[#8B9D83]/20 overflow-hidden shadow-[0_2px_9px_rgba(139,157,131,0.08)]">
//                   <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-2 sm:p-3">
//                     {/* Thumbnails */}
//                     <div className="flex sm:flex-col gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[450px] order-2 sm:order-1 flex-shrink-0 sm:w-16 md:w-20">
//                       {productImages.map((img, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => {
//                             if (activeImageIndex !== idx) {
//                               setActiveImageIndex(idx);
//                               setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                               setIsZoomed(false);
//                             }
//                           }}
//                           onMouseEnter={() => {
//                             preloadImage(img.url);
//                             if (activeImageIndex !== idx) {
//                               setActiveImageIndex(idx);
//                               setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                               setIsZoomed(false);
//                             }
//                           }}
//                           className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
//                             activeImageIndex === idx
//                               ? 'border-[#8B9D83] shadow-[0_0_0_2px_rgba(139,157,131,0.25)] sm:shadow-[0_0_0_3px_rgba(139,157,131,0.25)]'
//                               : 'border-[#8B9D83]/20 hover:border-[#8B9D83]/50'
//                           }`}
//                         >
//                           <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
//                         </button>
//                       ))}
//                       {hasVideo && (
//                         <button
//                           onClick={() => {
//                             if (activeImageIndex !== productImages.length) {
//                               setActiveImageIndex(productImages.length);
//                               setIsZoomed(false);
//                             }
//                           }}
//                           className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
//                             activeImageIndex === productImages.length
//                               ? 'border-[#8B9D83] shadow-[0_0_0_2px_rgba(139,157,131,0.25)] sm:shadow-[0_0_0_3px_rgba(139,157,131,0.25)]'
//                               : 'border-[#8B9D83]/20 hover:border-[#8B9D83]/50'
//                           }`}
//                         >
//                           {product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl) ? (
//                             <img src={getYouTubeThumbnail(product.videoUrl)} alt="Video thumbnail" className="w-full h-full object-cover" />
//                           ) : product.videoType !== 'youtube' && videoThumbnail ? (
//                             <img src={videoThumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
//                           ) : null}
//                           <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//                             <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                           </div>
//                         </button>
//                       )}
//                     </div>

//                     {/* Main Image */}
//                     <div className="flex-1 order-1 sm:order-2 relative">
                   
//                       <div
//                         className="relative bg-[#FDF7EF] rounded-xl overflow-hidden border border-[#8B9D83]/20 shadow-sm w-full"
//                         style={{ height: 'auto', minHeight: '450px' }}
//                         onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
//                         onMouseLeave={() => setIsZoomed(false)}
//                         onMouseMove={(e) => {
//                           if (!isZoomed || isMainVideo || isMobile) return;
//                           const rect = e.currentTarget.getBoundingClientRect();
//                           const x = ((e.clientX - rect.left) / rect.width) * 100;
//                           const y = ((e.clientY - rect.top) / rect.height) * 100;
//                           setZoomPosition({ x: Math.min(Math.max(x, 0), 100), y: Math.min(Math.max(y, 0), 100) });
//                         }}
//                       >
//                         <div className="relative w-full h-full min-h-[400px] sm:min-h-[450px] flex items-center justify-center">
//                           {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
//                             <div className="absolute inset-0 bg-gradient-to-br from-[#8B9D83]/10 to-[#FDF7EF] animate-pulse z-10" />
//                           )}
//                           <div className="absolute inset-0 w-full h-full overflow-hidden">
//                             {!isMainVideo && mainImage ? (
//                               <>
//                                 <img
//                                   key={activeImageIndex}
//                                   src={mainImage}
//                                   alt={product.productName}
//                                   className={`w-full h-full object-cover transition-opacity duration-300 ${
//                                     imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
//                                   }`}
//                                   style={{
//                                     transform: isZoomed && !isMobile ? 'scale(1.8)' : 'scale(1)',
//                                     transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                                     transition: 'transform 0.15s ease-out'
//                                   }}
//                                   onLoad={() => {
//                                     setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                                     setTimeout(() => setIsTransitioning(false), 100);
//                                   }}
//                                   loading={activeImageIndex === 0 ? "eager" : "lazy"}
//                                   fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
//                                   decoding="async"
//                                   onError={(e) => {
//                                     e.target.onerror = null;
//                                     e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
//                                     setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                                   }}
//                                 />
//                                 {isZoomed && !isMobile && !isMainVideo && (
//                                   <div className="absolute inset-0 bg-[#FDF7EF]/30 backdrop-blur-[1px] pointer-events-none z-10" />
//                                 )}
//                               </>
//                             ) : isMainVideo && mainVideoUrl && (
//                               mainVideoType === 'youtube' ? (
//                                 <iframe src={mainVideoUrl} className="w-full h-full aspect-square" allowFullScreen title="Product Video" />
//                               ) : (
//                                 <video src={mainVideoUrl} controls className="w-full h-full object-contain bg-white" />
//                               )
//                             )}
//                           </div>
//                         </div>

//                         {!isMainVideo && !isMobile && !isZoomed && (
//                           <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none z-20">
//                             <div className="bg-white/80 backdrop-blur-sm text-[#2D1B2E] text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 hover:opacity-100 transition-opacity shadow-lg border border-[#8B9D83]/20">
//                               <ZoomIn className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#8B9D83]" />
//                               <span className="hidden xs:inline font-medium">Hover to zoom</span>
//                             </div>
//                           </div>
//                         )}

//                         <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex gap-1 sm:gap-2 z-30">
//                           {!isMainVideo && (
//                           <button
//   onClick={() => {
//     const currentUrl = isMainVideo ? null : mainImage;
//     if (currentUrl) {
//       const idx = allImagesWithVariants.findIndex(img => img.url === currentUrl);
//       setZoomImageIndex(idx >= 0 ? idx : 0);
//     } else {
//       setZoomImageIndex(0);
//     }
//     setShowZoom(true);
//   }}
//   className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
//   aria-label="View fullscreen"
// >
//   <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#8B9D83]" />
// </button>
//                           )}
//                         </div>

//                         <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full z-30">
//                           {activeImageIndex + 1} / {productImages.length}
//                         </div>
//                       </div>

//                       {/* DYNAMIC DISCOUNT BADGE */}
//                       {discountPercent > 0 && (
//                         <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 z-40">
//                           <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
//                           {discountPercent}% OFF
//                         </div>
//                       )}
//                       {product.tags?.[0] && (
//                         <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getTagStyles(product.tags[0])} text-[7px] sm:text-[9px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 z-40`}>
//                           <Sparkles className="w-2 h-2 sm:w-3 sm:h-3" />
//                           {getTagName(product.tags[0])}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Product Info */}
//             <div className="lg:col-span-4 bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-2xl shadow-[0_2px_9px_rgba(139,157,131,0.08)] border border-[#8B9D83]/20">
//               {/* Category Hierarchy */}
//               <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
//                 {categoryHierarchy.map((cat, idx) => (
//                   <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-[#FDF7EF] text-[#465641] border border-[#8B9D83]/20" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                     <FolderTree className="w-2 h-2 sm:w-3 sm:h-3" />
//                     {cat}
//                   </span>
//                 ))}
//                 {product.brand && (
//                   <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-[#FDF7EF] text-[#465641] border border-[#8B9D83]/20">
//                     <Building2 className="w-2 h-2 sm:w-3 sm:h-3" />
//                     {product.brand}
//                   </span>
//                 )}
//               </div>

//               {/* Title */}
//               <div className="mb-3 sm:mb-4">
//                 <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//                   {product.productName}
//                 </h1>
//               </div>

//               {/* Price Card */}
//               <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-r from-[#FDF7EF] to-[#8B9D83]/10 rounded-xl border border-[#8B9D83]/20">
//                 <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
//                   <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#465641]" style={{ fontFamily: FONT_FAMILY_SERIF }}>
//                     ৳{formatPrice(currentPrice)}
//                   </span>
//                   {discountPercent > 0 && (
//                     <>
//                       <span className="text-sm sm:text-base text-[#9CA3AF] line-through">
//                         ৳{formatPrice(displayRegularPrice)}
//                       </span>
//                       <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#8B9D83] to-[#465641] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
//                         <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
//                         Save {discountPercent}%
//                       </span>
//                     </>
//                   )}
//                 </div>
//                 {product.codAvailable && (
//                   <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-[#465641] text-xs sm:text-sm bg-[#8B9D83]/15 inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
//                     <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                     <span style={{ fontFamily: FONT_FAMILY_SANS }}>Cash on Delivery available</span>
//                   </div>
//                 )}
//               </div>

//               {/* Short Description */}
//               <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-white rounded-xl border border-[#8B9D83]/20">
//                 {product.shortDescription && product.shortDescription !== '<p></p>' ? (
//                   <div className="text-xs sm:text-sm text-[#3A4A3F] prose-short" style={{ fontFamily: FONT_FAMILY_SANS }} dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
//                 ) : (
//                   <p className="text-xs sm:text-sm text-[#6B7280] italic" style={{ fontFamily: FONT_FAMILY_SANS }}>No short description available.</p>
//                 )}
//               </div>

//               {/* VARIANT SELECTORS */}
//               {hasVariants && (
//                 <div className="space-y-4 mb-4" ref={variantContainerRef}>
//                   {product.variantTypes.map((vt, index) => (
//                     <VariantSelector
//                       key={vt.id || index}
//                       variantType={vt}
//                       variants={vt.variants || []}
//                       selectedVariants={selectedVariants.filter(sv => sv.variantType === vt.type)}
//                       onVariantSelect={handleVariantSelect}
//                       onVariantQuantityChange={handleVariantQuantityChange}
//                       onVariantRemove={handleVariantRemove}
//                       stockQuantity={product.stockQuantity}
//                       onVariantImageSelect={handleVariantImageSelect}
//                       clearPreviewTrigger={clearPreviewTrigger}
//                       onPreviewCleared={() => setPreviewCleared(true)}
//                     />
//                   ))}
// {selectedVariants.length > 0 && (
//   <div className="p-3 bg-white rounded-xl border border-[#8B9D83] shadow-sm">
//     <div className="flex items-center justify-between mb-2">
//       <h4 className="text-sm font-semibold text-[#2D1B2E] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_SANS }}>
//         <CheckCircle className="w-4 h-4 text-[#465641]" />
//         Selected Items
//       </h4>
//       <span className="text-xs text-[#465641] font-semibold">
//         Total: {totalVariantQuantity} items | ৳{formatPrice(totalVariantPrice)}
//       </span>
//     </div>
//     <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
//       {selectedVariants.map((sv, idx) => {
//         // ----- CASE 1: Variant has sub-variants -----
//         if (sv.subVariants && sv.subVariants.length > 0) {
//           return sv.subVariants.map((sub, subIdx) => {
//             const subId = sub.id || sub._id || sub.subVariantId || String(sub.name).toLowerCase().replace(/\s+/g, '-');
//             const price = sub.discountPrice > 0
//               ? Number(sub.discountPrice)
//               : Number(sub.regularPrice) || 0;
//             const originalPrice = Number(sub.regularPrice) || 0;
//             const hasDiscount = sub.discountPrice > 0 && sub.discountPrice < sub.regularPrice;
//             const maxStock = sub.stockQuantity || 999;
//             const qty = Number(sub.quantity) || 1;

//             const subImage =
//               sub.subVariantImages?.[0] ||
//               sub.images?.[0] ||
//               sv.variantImages?.[0] ||
//               null;
//             const subColor = sub.color || null;

//             // Helper to apply new qty for this sub-variant
//             const applySubQty = (newQty) => {
//               const updatedSubVariants = sv.subVariants.map(s => {
//                 const sId = s.id || s._id || s.subVariantId || String(s.name).toLowerCase().replace(/\s+/g, '-');
//                 return sId === subId ? { ...s, quantity: newQty } : s;
//               });
//               const updatedVariant = { ...sv, subVariants: updatedSubVariants };
//               const originalVariant = product.variantTypes
//                 .flatMap(vt => vt.variants || [])
//                 .find(v => {
//                   const vId = v.id || v._id || String(v.name).toLowerCase().replace(/\s+/g, '-');
//                   return vId === sv.variantId;
//                 });
//               if (originalVariant) {
//                 handleVariantSelect(sv.variantType, originalVariant, updatedVariant);
//               }
//             };

//             return (
//               <div
//                 key={`${idx}-${subIdx}`}
//                 className="flex items-center justify-between gap-2 text-xs p-2 bg-[#FDF7EF] rounded-lg"
//               >
//                 {/* Image */}
//                 <div className="flex-shrink-0">
//                   {subImage ? (
//                     <img
//                       src={subImage}
//                       alt={sub.name}
//                       className="w-10 h-10 rounded-lg object-cover border border-[#8B9D83]/20 bg-white"
//                     />
//                   ) : subColor ? (
//                     <div
//                       className="w-10 h-10 rounded-lg border border-[#8B9D83]/20"
//                       style={{ backgroundColor: subColor }}
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-lg bg-white border border-[#8B9D83]/20 flex items-center justify-center">
//                       <Package className="w-5 h-5 text-[#8B9D83]/60" />
//                     </div>
//                   )}
//                 </div>

//                 {/* Left: name + price */}
//                 <div className="flex flex-col min-w-0 flex-1">
//                   <span className="font-medium text-[#2D1B2E] truncate">
//                     {sv.variantName} - {sub.name}
//                   </span>
//                   <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
//                     <span className="text-[#465641] font-semibold">
//                       ৳{formatPrice(price)}
//                     </span>
//                     {hasDiscount && (
//                       <span className="text-[10px] text-gray-400 line-through">
//                         ৳{formatPrice(originalPrice)}
//                       </span>
//                     )}
//                     {hasDiscount && (
//                       <span className="text-[9px] text-green-600 font-medium bg-green-50 px-1 py-0.5 rounded">
//                         {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right: qty selector + remove */}
//                 <div className="flex items-center gap-1.5 flex-shrink-0">
//                   <div className="flex items-center border border-[#8B9D83]/30 rounded-lg overflow-hidden bg-white">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newQty = Math.max(1, qty - 1);
//                         applySubQty(newQty);
//                       }}
//                       disabled={qty <= 1}
//                       className="w-5 h-5 flex items-center justify-center text-[#465641] hover:bg-[#F2F5F0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                     >
//                       <Minus className="w-2.5 h-2.5" />
//                     </button>

//                     {/* ✅ Editable quantity input */}
//                     <input
//                       type="text"
//                       inputMode="numeric"
//                       value={sub.quantity === '' ? '' : (sub.quantity ?? 1)}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         if (value === '') {
//                           applySubQty('');
//                           return;
//                         }
//                         if (/^\d+$/.test(value)) {
//                           const numValue = parseInt(value, 10);
//                           if (numValue >= 1 && numValue <= maxStock) {
//                             applySubQty(numValue);
//                           } else if (numValue > maxStock) {
//                             applySubQty(maxStock);
//                           }
//                         }
//                       }}
//                       onBlur={() => {
//                         if (sub.quantity === '' || sub.quantity === null || sub.quantity === undefined) {
//                           applySubQty(1);
//                         }
//                       }}
//                       className="w-8 text-center text-xs font-medium text-[#2D1B2E] outline-none bg-transparent border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                     />

//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newQty = Math.min(maxStock, qty + 1);
//                         applySubQty(newQty);
//                       }}
//                       disabled={qty >= maxStock}
//                       className="w-5 h-5 flex items-center justify-center text-[#465641] hover:bg-[#F2F5F0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                     >
//                       <Plus className="w-2.5 h-2.5" />
//                     </button>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       const updatedSubVariants = sv.subVariants.filter(s => {
//                         const sId = s.id || s._id || s.subVariantId || String(s.name).toLowerCase().replace(/\s+/g, '-');
//                         return sId !== subId;
//                       });
//                       if (updatedSubVariants.length === 0) {
//                         handleVariantRemove(sv.variantId);
//                       } else {
//                         const updatedVariant = { ...sv, subVariants: updatedSubVariants };
//                         const originalVariant = product.variantTypes
//                           .flatMap(vt => vt.variants || [])
//                           .find(v => {
//                             const vId = v.id || v._id || String(v.name).toLowerCase().replace(/\s+/g, '-');
//                             return vId === sv.variantId;
//                           });
//                         if (originalVariant) {
//                           handleVariantSelect(sv.variantType, originalVariant, updatedVariant);
//                         }
//                       }
//                     }}
//                     className="text-red-500 hover:text-red-700 p-0.5"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             );
//           });
//         }

//         // ----- CASE 2: Variant without sub-variants -----
//         const price = sv.discountPrice > 0
//           ? Number(sv.discountPrice)
//           : Number(sv.regularPrice) || 0;
//         const originalPrice = Number(sv.regularPrice) || 0;
//         const hasDiscount = sv.discountPrice > 0 && sv.discountPrice < sv.regularPrice;
//         const maxStock = sv.stockQuantity || 999;
//         const qty = Number(sv.quantity) || 1;

//         const variantImage = sv.variantImages?.[0] || null;
//         const variantColor = sv.selectedColor || null;

//         // Helper to apply new qty for this variant
//         const applyVariantQty = (newQty) => {
//           const updatedVariant = { ...sv, quantity: newQty };
//           const originalVariant = product.variantTypes
//             .flatMap(vt => vt.variants || [])
//             .find(v => {
//               const vId = v.id || v._id || String(v.name).toLowerCase().replace(/\s+/g, '-');
//               return vId === sv.variantId;
//             });
//           if (originalVariant) {
//             handleVariantSelect(sv.variantType, originalVariant, updatedVariant);
//           }
//         };

//         return (
//           <div
//             key={idx}
//             className="flex items-center justify-between gap-2 text-xs p-2 bg-[#FDF7EF] rounded-lg"
//           >
//             {/* Image */}
//             <div className="flex-shrink-0">
//               {variantImage ? (
//                 <img
//                   src={variantImage}
//                   alt={sv.variantName}
//                   className="w-10 h-10 rounded-lg object-cover border border-[#8B9D83]/20 bg-white"
//                 />
//               ) : variantColor ? (
//                 <div
//                   className="w-10 h-10 rounded-lg border border-[#8B9D83]/20"
//                   style={{ backgroundColor: variantColor }}
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-lg bg-white border border-[#8B9D83]/20 flex items-center justify-center">
//                   <Package className="w-5 h-5 text-[#8B9D83]/60" />
//                 </div>
//               )}
//             </div>

//             {/* Left: name + price */}
//             <div className="flex flex-col min-w-0 flex-1">
//               <span className="font-medium text-[#2D1B2E] truncate">
//                 {sv.variantName}
//               </span>
//               <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
//                 <span className="text-[#465641] font-semibold">
//                   ৳{formatPrice(price)}
//                 </span>
//                 {hasDiscount && (
//                   <span className="text-[10px] text-gray-400 line-through">
//                     ৳{formatPrice(originalPrice)}
//                   </span>
//                 )}
//                 {hasDiscount && (
//                   <span className="text-[9px] text-green-600 font-medium bg-green-50 px-1 py-0.5 rounded">
//                     {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Right: qty selector + remove */}
//             <div className="flex items-center gap-1.5 flex-shrink-0">
//               <div className="flex items-center border border-[#8B9D83]/30 rounded-lg overflow-hidden bg-white">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const newQty = Math.max(1, qty - 1);
//                     applyVariantQty(newQty);
//                   }}
//                   disabled={qty <= 1}
//                   className="w-5 h-5 flex items-center justify-center text-[#465641] hover:bg-[#F2F5F0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <Minus className="w-2.5 h-2.5" />
//                 </button>

//                 {/* ✅ Editable quantity input */}
//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   value={sv.quantity === '' ? '' : (sv.quantity ?? 1)}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value === '') {
//                       applyVariantQty('');
//                       return;
//                     }
//                     if (/^\d+$/.test(value)) {
//                       const numValue = parseInt(value, 10);
//                       if (numValue >= 1 && numValue <= maxStock) {
//                         applyVariantQty(numValue);
//                       } else if (numValue > maxStock) {
//                         applyVariantQty(maxStock);
//                       }
//                     }
//                   }}
//                   onBlur={() => {
//                     if (sv.quantity === '' || sv.quantity === null || sv.quantity === undefined) {
//                       applyVariantQty(1);
//                     }
//                   }}
//                   className="w-8 text-center text-xs font-medium text-[#2D1B2E] outline-none bg-transparent border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => {
//                     const newQty = Math.min(maxStock, qty + 1);
//                     applyVariantQty(newQty);
//                   }}
//                   disabled={qty >= maxStock}
//                   className="w-5 h-5 flex items-center justify-center text-[#465641] hover:bg-[#F2F5F0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <Plus className="w-2.5 h-2.5" />
//                 </button>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => handleVariantRemove(sv.variantId)}
//                 className="text-red-500 hover:text-red-700 p-0.5"
//               >
//                 <X className="w-3 h-3" />
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// )}
//                 </div>
//               )}

//               {/* SINGLE PRODUCT QUANTITY (No Variants) */}
//               {!hasVariants && (
//                 <div className="mb-4 p-3 sm:p-4 bg-[#FDF7EF] rounded-xl border border-[#8B9D83]/20">
//                   <label className="block text-xs font-medium text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                     Quantity
//                   </label>
//                   <div className="flex items-center rounded-lg border-2 border-[#8B9D83]/20 overflow-hidden bg-white w-fit">
//                     <button onClick={() => setSingleQuantity(prev => Math.max(1, prev - 1))} disabled={singleQuantity <= 1} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF] disabled:opacity-50 transition">
//                       <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
//                     </button>
//                     <input
//                       type="text"
//                       value={singleQuantity === '' ? '' : singleQuantity}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         if (value === '') { setSingleQuantity(''); return; }
//                         if (/^\d+$/.test(value)) {
//                           const numValue = parseInt(value);
//                           if (numValue >= 1 && numValue <= product.stockQuantity) {
//                             setSingleQuantity(numValue);
//                           }
//                         }
//                       }}
//                       onBlur={() => {
//                         if (singleQuantity === '' || singleQuantity === null) setSingleQuantity(1);
//                       }}
//                       min="1"
//                       max={product.stockQuantity}
//                       className="w-12 sm:w-14 md:w-16 text-center font-semibold text-[#2D1B2E] text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#8B9D83]/20 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                     />
//                     <button onClick={() => setSingleQuantity(prev => Math.min(product.stockQuantity, prev + 1))} disabled={singleQuantity >= product.stockQuantity} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF] disabled:opacity-50 transition">
//                       <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
//                     </button>
//                   </div>
//                   <p className="text-[10px] text-[#6B7280] mt-1.5" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                     {product.stockQuantity} items available
//                   </p>
//                 </div>
//               )}

//               {/* Stock Status */}
//               <div className="flex items-center gap-2 mb-4">
//                 <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium text-${stockStatus.color}-700 bg-${stockStatus.color}-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full`}>
//                   <StockIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${stockStatus.color}-600`} />
//                   <span style={{ fontFamily: FONT_FAMILY_SANS }}>{stockStatus.label}</span>
//                   {stockStatus.label === 'Low Stock' && <span className="text-[10px] sm:text-xs text-orange-600">(Only {product.stockQuantity} left)</span>}
//                 </div>
//                 {hasVariants && selectedVariants.length > 0 && (
//                   <div className="text-xs text-[#3A4A3F] font-medium" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                     Selected: {totalVariantQuantity} items
//                   </div>
//                 )}
//               </div>

//               {/* Add to Cart / Buy Now Buttons */}
//               <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
//                 {isInCart ? (
//                   <button
//                     onClick={openCartSidebar}
//                     className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-[#465641] to-[#2D1B2E] text-white font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm hover:shadow-lg hover:shadow-[#465641]/25"
//                     style={{ fontFamily: FONT_FAMILY_SANS }}
//                   >
//                     <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
//                     View in Cart
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={addingToCart || product.stockQuantity <= 0 || (hasVariants && !hasVariantSelections())}
//                     className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
//                     style={{ fontFamily: FONT_FAMILY_SANS }}
//                   >
//                     {addingToCart ? <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
//                     {addingToCart ? 'Adding...' : hasVariants ? 'Add Selected Variants' : 'Add to Cart'}
//                   </button>
//                 )}

//                 <button
//                   onClick={handleBuyNow}
//                   disabled={addingToCart || product.stockQuantity <= 0 || (hasVariants && !hasVariantSelections())}
//                   className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-[#465641] to-[#2D1B2E] text-white font-bold rounded-lg hover:from-[#3A4A3F] hover:to-[#1F1420] transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
//                   style={{ fontFamily: FONT_FAMILY_SANS }}
//                 >
//                   <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   Buy Now
//                 </button>
//               </div>

//               {/* ADD-ONS SECTION */}
//               {product.addOnes && product.addOnes.length > 0 && (
//                 <AddOnsSection
//                   addOns={product.addOnes}
//                   onAddToCart={handleAddOnToCart}
//                 />
//               )}

//               {/* Delivery Info */}
//               {hasDeliveryInfo && (
//                 <div className="bg-gradient-to-r from-[#FDF7EF] to-[#8B9D83]/10 rounded-xl p-3 sm:p-4 border border-[#8B9D83]/20 mt-4">
//                   <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
//                     <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B9D83]" />
//                     <span className="font-semibold text-[#2D1B2E] text-sm sm:text-base" style={{ fontFamily: FONT_FAMILY_SANS }}>Delivery Information</span>
//                   </div>
//                   <div className="prose prose-sm max-w-none text-[#3A4A3F]" style={{ fontSize: '0.875rem', lineHeight: '1.6', fontFamily: FONT_FAMILY_SANS }} dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} />
//                   <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#8B9D83]/20">
//                     <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[#3A4A3F]">
//                       <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B9D83]" />
//                       <span style={{ fontFamily: FONT_FAMILY_SANS }}>7 Days Return Policy</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[#3A4A3F]">
//                       <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B9D83]" />
//                       <span style={{ fontFamily: FONT_FAMILY_SANS }}>Safe & Secure</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[#3A4A3F]">
//                       <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B9D83]" />
//                       <span style={{ fontFamily: FONT_FAMILY_SANS }}>Genuine Products</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* TABS SECTION */}
//           <div className="mt-8 sm:mt-12">
//             <div className="flex flex-nowrap gap-1 sm:gap-2 border-b border-[#8B9D83]/20 overflow-x-auto pb-0.5 scrollbar-thin scrollbar-thumb-[#8B9D83]">
//               <button
//                 onClick={() => setActiveTab('description')}
//                 className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'description' ? 'bg-white text-[#465641] border-t-2 border-l-2 border-r-2 border-[#8B9D83]/30 border-b-white' : 'text-[#3A4A3F] hover:text-[#465641]'}`}
//                 style={{ fontFamily: FONT_FAMILY_SANS }}
//               >
//                 <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 Description
//               </button>
//               <button
//                 onClick={() => setActiveTab('specifications')}
//                 className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'specifications' ? 'bg-white text-[#465641] border-t-2 border-l-2 border-r-2 border-[#8B9D83]/30 border-b-white' : 'text-[#3A4A3F] hover:text-[#465641]'}`}
//                 style={{ fontFamily: FONT_FAMILY_SANS }}
//               >
//                 <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 Specifications
//               </button>
//               {hasDeliveryInfo && (
//                 <button
//                   onClick={() => setActiveTab('delivery')}
//                   className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'delivery' ? 'bg-white text-[#465641] border-t-2 border-l-2 border-r-2 border-[#8B9D83]/30 border-b-white' : 'text-[#3A4A3F] hover:text-[#465641]'}`}
//                   style={{ fontFamily: FONT_FAMILY_SANS }}
//                 >
//                   <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   Delivery
//                 </button>
//               )}
//               {product.faqs && product.faqs.length > 0 && (
//                 <button
//                   onClick={() => setActiveTab('faqs')}
//                   className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'faqs' ? 'bg-white text-[#465641] border-t-2 border-l-2 border-r-2 border-[#8B9D83]/30 border-b-white' : 'text-[#3A4A3F] hover:text-[#465641]'}`}
//                   style={{ fontFamily: FONT_FAMILY_SANS }}
//                 >
//                   <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   FAQs
//                 </button>
//               )}
//               <button
//                 onClick={() => setActiveTab('reviews')}
//                 className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'reviews' ? 'bg-white text-[#465641] border-t-2 border-l-2 border-r-2 border-[#8B9D83]/30 border-b-white' : 'text-[#3A4A3F] hover:text-[#465641]'}`}
//                 style={{ fontFamily: FONT_FAMILY_SANS }}
//               >
//                 <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 Reviews
//               </button>
//             </div>

//             <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-[#8B9D83]/20 p-4 sm:p-5 md:p-6">
//               {activeTab === 'description' && (
//                 <div className="prose prose-sm max-w-none text-[#3A4A3F]">
//                   {product.fullDescription && product.fullDescription !== '<p></p>' ? (
//                     <div dangerouslySetInnerHTML={{ __html: processHtmlLinks(product.fullDescription) }} />
//                   ) : (
//                     <p className="text-[#6B7280] italic" style={{ fontFamily: FONT_FAMILY_SANS }}>No description available.</p>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'specifications' && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                   {specifications.map((item, idx) => (
//                     <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#FDF7EF] rounded-xl border border-[#8B9D83]/20">
//                       <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B9D83]" />
//                       <div>
//                         <p className="text-[10px] sm:text-xs text-[#6B7280]" style={{ fontFamily: FONT_FAMILY_SANS }}>{item.label}</p>
//                         <p className="font-semibold text-[#2D1B2E] text-xs sm:text-sm" style={{ fontFamily: FONT_FAMILY_SANS }}>{item.value || 'N/A'}</p>
//                       </div>
//                     </div>
//                   ))}
//                   {specifications.length === 0 && (
//                     <div className="col-span-2 text-center py-8 text-[#6B7280]">
//                       <Package className="w-8 h-8 mx-auto mb-2 text-[#8B9D83]/40" />
//                       <p style={{ fontFamily: FONT_FAMILY_SANS }}>No specifications available</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'delivery' && hasDeliveryInfo && (
//                 <div className="prose prose-sm max-w-none text-[#3A4A3F]">
//                   <div className="flex items-center gap-2 mb-4">
//                     <Truck className="w-5 h-5 text-[#8B9D83]" />
//                     <h3 className="text-lg font-semibold text-[#2D1B2E] m-0" style={{ fontFamily: FONT_FAMILY_SERIF }}>Delivery Information</h3>
//                   </div>
//                   <div className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY_SANS }} dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} />
//                   <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-[#8B9D83]/20">
//                     <div className="flex items-center gap-1.5 text-sm text-[#3A4A3F]">
//                       <RotateCcw className="w-4 h-4 text-[#8B9D83]" />
//                       <span style={{ fontFamily: FONT_FAMILY_SANS }}>7 Days Return Policy</span>
//                     </div>
//                     <div className="flex items-center gap-1.5 text-sm text-[#3A4A3F]">
//                       <ShieldCheck className="w-4 h-4 text-[#8B9D83]" />
//                       <span style={{ fontFamily: FONT_FAMILY_SANS }}>Safe & Secure</span>
//                     </div>
//                     <div className="flex items-center gap-1.5 text-sm text-[#3A4A3F]">
//                       <Award className="w-4 h-4 text-[#8B9D83]" />
//                       <span style={{ fontFamily: FONT_FAMILY_SANS }}>Genuine Products</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'faqs' && product.faqs && product.faqs.length > 0 && (
//                 <div>
//                   <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#8B9D83]/20">
//                     <div className="p-2 bg-gradient-to-r from-[#8B9D83] to-[#465641] rounded-xl">
//                       <HelpCircle className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SERIF }}>Frequently Asked Questions</h3>
//                       <p className="text-sm text-[#3A4A3F]" style={{ fontFamily: FONT_FAMILY_SANS }}>Everything you need to know about this product</p>
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     {product.faqs.map((faq, index) => {
//                       const isOpen = faqOpenStates[index] || false;
//                       return (
//                         <div key={index} className={`border rounded-xl transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#8B9D83] shadow-md shadow-[#8B9D83]/10' : 'border-[#8B9D83]/20 hover:border-[#8B9D83]/50'}`}>
//                           <button onClick={() => toggleFaq(index)} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#FDF7EF] transition-colors">
//                             <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#8B9D83]/15 text-[#465641] flex items-center justify-center text-sm font-bold">{index + 1}</span>
//                             <span className="flex-1 font-semibold text-[#2D1B2E] text-sm sm:text-base" style={{ fontFamily: FONT_FAMILY_SANS }}>{faq.question}</span>
//                             <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
//                               <ChevronDown className="w-5 h-5 text-[#8B9D83]" />
//                             </div>
//                           </button>
//                           <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
//                             <div className="px-5 pb-4 pt-1 border-t border-[#8B9D83]/20">
//                               <div className="flex items-start gap-3 pl-11">
//                                 <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8B9D83] mt-2" />
//                                 <p className="text-[#3A4A3F] text-sm sm:text-base leading-relaxed" style={{ fontFamily: FONT_FAMILY_SANS }}>{faq.answer}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'reviews' && (
//                 <div>
//                   {reviewStats && reviewStats.totalReviews > 0 && (
//                     <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-[#8B9D83]/20">
//                       <div className="flex items-center gap-3">
//                         <div className="text-3xl font-bold text-[#465641]" style={{ fontFamily: FONT_FAMILY_SERIF }}>{reviewStats.averageRating.toFixed(1)}</div>
//                         <div>
//                           {renderStarsForReview(Math.round(reviewStats.averageRating), 'large')}
//                           <p className="text-sm text-[#3A4A3F] mt-0.5" style={{ fontFamily: FONT_FAMILY_SANS }}>Based on all reviews</p>
//                         </div>
//                       </div>
//                       <div className="flex-1 max-w-xs">
//                         {[5, 4, 3, 2, 1].map((star) => {
//                           const count = reviewStats.ratingDistribution?.[star] || 0;
//                           const percentage = reviewStats.totalReviews > 0 ? (count / reviewStats.totalReviews) * 100 : 0;
//                           return (
//                             <div key={star} className="flex items-center gap-2 text-xs">
//                               <span className="w-5 text-[#3A4A3F]">{star}</span>
//                               <Star className="w-3 h-3 fill-[#8B9D83] text-[#8B9D83]" />
//                               <div className="flex-1 h-1.5 bg-[#8B9D83]/15 rounded-full overflow-hidden">
//                                 <div className="h-full bg-gradient-to-r from-[#8B9D83] to-[#465641] rounded-full" style={{ width: `${percentage}%` }} />
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
//                     <div className="flex items-center gap-2">
//                       <Filter className="w-4 h-4 text-[#8B9D83]" />
//                       <select value={reviewFilter} onChange={(e) => setReviewFilter(e.target.value)} className="text-sm border border-[#8B9D83]/20 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none bg-white text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                         <option value="all">All Reviews</option>
//                         <option value="with_media">With Photos/Videos</option>
//                       </select>
//                       <select value={reviewSort} onChange={(e) => setReviewSort(e.target.value)} className="text-sm border border-[#8B9D83]/20 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none bg-white text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                         <option value="newest">Newest First</option>
//                         <option value="oldest">Oldest First</option>
//                         <option value="highest">Highest Rating</option>
//                         <option value="lowest">Lowest Rating</option>
//                       </select>
//                     </div>
//                     <button
//                       onClick={() => setIsReviewModalOpen(true)}
//                       disabled={!!userReview}
//                       className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${userReview ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white hover:shadow-lg hover:shadow-[#8B9D83]/25'}`}
//                       style={{ fontFamily: FONT_FAMILY_SANS }}
//                     >
//                       {userReview ? (
//                         userReview.status === 'pending' ? (
//                           <><Clock className="w-4 h-4" /> Pending Review</>
//                         ) : (
//                           <><CheckCircle className="w-4 h-4" /> Already Reviewed</>
//                         )
//                       ) : (
//                         <><MessageSquare className="w-4 h-4" /> Write a Review</>
//                       )}
//                     </button>
//                   </div>

//                   {loadingReviews ? (
//                     <div className="flex items-center justify-center py-12">
//                       <Loader2 className="w-8 h-8 animate-spin text-[#8B9D83]" />
//                     </div>
//                   ) : reviews.length === 0 ? (
//                     <div className="text-center py-12 bg-[#FDF7EF] rounded-xl">
//                       <MessageSquare className="w-16 h-16 text-[#8B9D83]/30 mx-auto mb-3" />
//                       <p className="text-[#3A4A3F]" style={{ fontFamily: FONT_FAMILY_SANS }}>No reviews yet</p>
//                       <button onClick={() => setIsReviewModalOpen(true)} className="mt-3 text-[#465641] font-semibold hover:underline" style={{ fontFamily: FONT_FAMILY_SANS }}>Be the first to review this product</button>
//                     </div>
//                   ) : (
//                     <div className="space-y-1">
//                       {reviews.map((review) => (
//                         <ReviewItem key={review._id} review={review} isOwner={userReview?._id === review._id} />
//                       ))}
//                     </div>
//                   )}

//                   {reviewTotalPages > 1 && (
//                     <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#8B9D83]/20">
//                       <div className="text-sm text-[#3A4A3F]" style={{ fontFamily: FONT_FAMILY_SANS }}>
//                         Showing {((reviewPage - 1) * 5) + 1} - {Math.min(reviewPage * 5, reviewTotal)} of {reviewTotal} reviews
//                       </div>
//                       <div className="flex gap-2">
//                         <button onClick={() => setReviewPage(prev => Math.max(1, prev - 1))} disabled={reviewPage === 1} className="p-2 text-[#3A4A3F] hover:bg-[#FDF7EF] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
//                           <ChevronLeft className="w-5 h-5" />
//                         </button>
//                         <button onClick={() => setReviewPage(prev => Math.min(reviewTotalPages, prev + 1))} disabled={reviewPage === reviewTotalPages} className="p-2 text-[#3A4A3F] hover:bg-[#FDF7EF] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
//                           <ChevronRight className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RELATED PRODUCTS */}
//           {relatedProducts.length > 0 && (
//             <div className="mt-8 sm:mt-12">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B9D83]" />
//                   <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SERIF }}>You May Also Like</h2>
//                 </div>
//                 {relatedProducts.length > carouselItemsPerView && (
//                   <div className="flex items-center gap-1 sm:gap-2">
//                     <button onClick={handlePrevSlide} disabled={carouselIndex === 0} className={`p-1.5 sm:p-2 rounded-full transition-all ${carouselIndex === 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border border-[#8B9D83]/20 text-[#8B9D83] hover:bg-[#8B9D83] hover:text-white hover:scale-110'}`}>
//                       <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                     <button onClick={handleNextSlide} disabled={carouselIndex >= Math.ceil(relatedProducts.length / carouselItemsPerView) - 1} className={`p-1.5 sm:p-2 rounded-full transition-all ${carouselIndex >= Math.ceil(relatedProducts.length / carouselItemsPerView) - 1 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border border-[#8B9D83]/20 text-[#8B9D83] hover:bg-[#8B9D83] hover:text-white hover:scale-110'}`}>
//                       <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//               <div className="relative overflow-hidden">
//                 <div className="flex gap-2 sm:gap-3 md:gap-4">
//                   {relatedProducts
//                     .slice(carouselIndex * carouselItemsPerView, carouselIndex * carouselItemsPerView + carouselItemsPerView)
//                     .map((relProduct) => (
//                       <div key={relProduct._id} className="flex-shrink-0 flex-grow-0" style={{ width: `calc((100% - ${(carouselItemsPerView - 1) * 16}px) / ${carouselItemsPerView})` }}>
//                         <RelatedProductCard product={relProduct} router={router} isInCart={productsInCart[relProduct._id] || false} onViewInCart={openCartSidebar} />
//                       </div>
//                     ))}
//                 </div>
//               </div>
//               {relatedProducts.length > carouselItemsPerView && (
//                 <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
//                   {Array.from({ length: Math.ceil(relatedProducts.length / carouselItemsPerView) }).map((_, idx) => {
//                     const isActive = carouselIndex === idx;
//                     return (
//                       <button key={idx} onClick={() => { handleCarouselInteraction(); setCarouselIndex(idx); }} className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${isActive ? 'w-4 sm:w-6 bg-[#8B9D83]' : 'w-1.5 sm:w-2 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/50'}`} />
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
// <AnimatePresence>
//   {showZoom && (
//     <ZoomModal 
//       images={allImagesWithVariants} 
//       currentIndex={zoomImageIndex} 
//       onClose={() => setShowZoom(false)} 
//       onImageChange={(index) => { setZoomImageIndex(index); }} 
//     />
//   )}
// </AnimatePresence>

//       <ReviewModal
//         isOpen={isReviewModalOpen}
//         onClose={() => {
//           setIsReviewModalOpen(false);
//           if (activeTab === 'reviews') { fetchReviews(reviewPage); checkUserReview(); }
//         }}
//         productId={product._id}
//         productName={product.productName}
//         onReviewSubmitted={() => { fetchReviews(reviewPage); checkUserReview(); }}
//       />

//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
//       <Footer />

//       <style jsx global>{`
//         .prose {
//           max-width: none;
//         }
//         .prose h1 {
//           font-size: 1.5em;
//           font-weight: 600;
//           margin: 0.75em 0 0.5em;
//           color: #2D1B2E;
//           font-family: ${FONT_FAMILY_SANS};
//         }
//         .prose h2 {
//           font-size: 1.3em;
//           font-weight: 600;
//           margin: 0.7em 0 0.4em;
//           color: #2D1B2E;
//           font-family: ${FONT_FAMILY_SANS};
//         }
//         .prose h3 {
//           font-size: 1.1em;
//           font-weight: 600;
//           margin: 0.6em 0 0.3em;
//           color: #2D1B2E;
//           font-family: ${FONT_FAMILY_SANS};
//         }
//         .prose p {
//           margin: 0.5em 0;
//           line-height: 1.6;
//           color: #3A4A3F;
//           font-family: ${FONT_FAMILY_SANS};
//         }
//         .prose ul {
//           list-style-type: disc;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
//         .prose ol {
//           list-style-type: decimal;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
//         .prose li {
//           margin: 0.2em 0;
//           color: #3A4A3F;
//           font-family: ${FONT_FAMILY_SANS};
//         }
//         .prose a {
//           color: #465641;
//           text-decoration: underline;
//         }
//         .prose strong {
//           font-weight: 600;
//           color: #2D1B2E;
//         }
//         .prose em {
//           font-style: italic;
//         }
//         .prose blockquote {
//           border-left: 3px solid #8B9D83;
//           padding-left: 1em;
//           margin: 0.5em 0;
//           color: #3A4A3F;
//           font-style: italic;
//         }
//         .prose img {
//           max-width: 100%;
//           height: auto;
//           border-radius: 0.5rem;
//         }
//         .prose table {
//           width: 100%;
//           border-collapse: collapse;
//           margin: 1em 0;
//         }
//         .prose th,
//         .prose td {
//           border: 1px solid #E5E7EB;
//           padding: 0.5em;
//           text-align: left;
//         }
//         .prose th {
//           background-color: #FDF7EF;
//           font-weight: 600;
//           color: #2D1B2E;
//         }
//         .scrollbar-thin::-webkit-scrollbar {
//           height: 2px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: #8B9D83;
//           border-radius: 10px;
//         }
//         .scrollbar-thumb-[#8B9D83]::-webkit-scrollbar-thumb {
//           background: #8B9D83;
//         }
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 3px;
//           height: 3px;
//         }
//       `}</style>
//     </>
//   );
// }


'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Minus,
  Plus,
  ZoomIn,
  Sparkles,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  Clock,
  Check,
  Loader2,
  FolderTree,
  Maximize2,
  Zap,
  Info,
  Award,
  TrendingUp,
  Building2,
  Box,
  Scale,
  List,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  ThumbsUp,
  Filter,
  Grid,
  Layers,
  Gift,
  Eye
} from 'lucide-react';

import { toast } from 'sonner';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import MetadataUpdater from '../product/MetadataUpdater';
import CartSidebar from '../components/CartSidebar';
import ReviewModal from '../components/home/ReviewModal';
import ReviewMediaModal from '../components/ReviewMediaModal';

// ========== FONT CONSTANTS ==========
const FONT_FAMILY_SANS = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_SERIF = "'Playfair Display', Georgia, serif";

// ========== HELPER FUNCTIONS ==========
const getTagName = (tag) => {
  if (!tag) return '';
  if (typeof tag === 'string') {
    if (/^[0-9a-fA-F]{24}$/.test(tag)) return '';
    return tag;
  }
  if (typeof tag === 'object') {
    if (tag.name) return tag.name;
    if (tag._id && typeof tag._id === 'object' && tag._id.name) return tag._id.name;
    if (tag.title) return tag.title;
    if (tag.label) return tag.label;
    if (Array.isArray(tag) && tag.length > 0) return getTagName(tag[0]);
    if (tag._id) {
      if (typeof tag._id === 'string' && /^[0-9a-fA-F]{24}$/.test(tag._id)) return '';
      if (typeof tag._id === 'object' && tag._id.name) return tag._id.name;
    }
    for (const key of ['value', 'text', 'display', 'title', 'label', 'name']) {
      if (tag[key] && typeof tag[key] === 'string') return tag[key];
    }
  }
  return String(tag);
};

const getTagStyles = (tag) => {
  const tagName = getTagName(tag);
  const styles = {
    'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
    'Trending': 'bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white shadow-lg shadow-[#8B9D83]/30',
    'New Release': 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-500/30',
    'Limited Offer': 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg shadow-purple-500/30',
    'Flash Sale': 'bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white shadow-lg shadow-[#8B9D83]/30',
    'Clearance': 'bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg shadow-gray-500/30',
  };
  return styles[tagName] || 'bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white shadow-lg shadow-[#8B9D83]/30';
};

const formatPrice = (price) => {
  return (price || 0).toFixed(2);
};

const calculateDiscount = (regular, discount) => {
  if (regular && discount && discount < regular) {
    return Math.round(((regular - discount) / regular) * 100);
  }
  return 0;
};

const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const getStockStatus = (quantity, alertQuantity) => {
  if (quantity <= 0) return { label: 'Out of Stock', color: 'red', icon: AlertCircle };
  if (alertQuantity > 0 && quantity <= alertQuantity) return { label: 'Low Stock', color: 'orange', icon: AlertCircle };
  return { label: 'In Stock', color: 'green', icon: CheckCircle };
};

const truncateText = (text, limit = 35) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const getYouTubeThumbnail = (url) => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
    /youtube\.com\/v\/([^&\s?#]+)/,
    /youtube\.com\/live\/([^&\s?#]+)/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
    }
  }
  return null;
};

const generateVideoThumbnail = (videoUrl, callback) => {
  const video = document.createElement('video');
  video.crossOrigin = 'Anonymous';
  video.src = videoUrl;
  video.currentTime = 1.5;
  video.addEventListener('loadeddata', () => {
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 160;
      canvas.height = 160;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
      callback(thumbnailUrl);
    }, 100);
  });
  video.addEventListener('error', () => {
    console.error('Error loading video for thumbnail generation');
    callback(null);
  });
  video.load();
};

const processHtmlLinks = (html) => {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  const links = div.querySelectorAll('a');
  links.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
  return div.innerHTML;
};

// ========== SKELETON ==========
const ProductSkeleton = () => (
  <div className="min-h-screen bg-[#FDF7EF]">
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <div className="animate-pulse">
          <div className="bg-[#8B9D83]/10 rounded-2xl h-80 sm:h-96 md:h-[500px] w-full"></div>
          <div className="flex gap-2 mt-3 md:mt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 bg-[#8B9D83]/10 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="space-y-3 md:space-y-4 animate-pulse">
          <div className="h-6 sm:h-7 md:h-8 bg-[#8B9D83]/10 rounded w-3/4"></div>
          <div className="h-5 sm:h-5 md:h-6 bg-[#8B9D83]/10 rounded w-1/2"></div>
          <div className="h-20 sm:h-24 md:h-24 bg-[#8B9D83]/10 rounded"></div>
          <div className="h-10 bg-[#8B9D83]/10 rounded w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// ========== ZOOM MODAL ==========
const ZoomModal = ({ images, currentIndex, onClose, onImageChange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <div className="relative w-full h-full flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-2 sm:left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-5xl w-full mx-2 sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]?.url}
          alt="Zoomed product"
          className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-2xl"
        />
      </motion.div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex + 1) % images.length);
        }}
        className="absolute right-2 sm:right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  </motion.div>
);

// ========== VARIANT SELECTOR ==========
const VariantSelector = ({
  variantType,
  variants,
  selectedVariants,
  onVariantSelect,
  onVariantQuantityChange,
  onVariantRemove,
  stockQuantity,
  onVariantImageSelect,
  clearPreviewTrigger,
  onPreviewCleared
}) => {
  const [expandedVariantId, setExpandedVariantId] = useState(null);
  const [previewVariantId, setPreviewVariantId] = useState(null);
  const [previewSubVariantId, setPreviewSubVariantId] = useState(null);

  useEffect(() => {
    if (clearPreviewTrigger) {
      setExpandedVariantId(null);
      setPreviewVariantId(null);
      setPreviewSubVariantId(null);
      if (onPreviewCleared) onPreviewCleared();
    }
  }, [clearPreviewTrigger, onPreviewCleared]);

  const getVariantImage = (v) => v.imagePreviews?.[0] || v.images?.[0] || null;
  const getVariantColor = (v) => v.color || null;

  const getVariantImages = (v) => {
    if (v.imagePreviews?.filter(Boolean).length > 0) return v.imagePreviews.filter(Boolean);
    if (v.images?.filter(Boolean).length > 0) return v.images.filter(Boolean);
    return [];
  };

  const getSubVariantImages = (sv) => {
    if (sv.imagePreviews?.filter(Boolean).length > 0) return sv.imagePreviews.filter(Boolean);
    if (sv.images?.filter(Boolean).length > 0) return sv.images.filter(Boolean);
    return [];
  };

  const getVariantId = (v, i) => {
    if (v.id) return String(v.id);
    if (v._id) return String(v._id);
    return `variant-${i}-${v.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
  };

  const getSubVariantId = (sv, si, vi) => {
    if (sv.id) return String(sv.id);
    if (sv._id) return String(sv._id);
    return `sub-${vi}-${si}-${sv.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
  };

  const getSubVariantKey = (sv) =>
    sv.id || sv._id || sv.subVariantId || String(sv.name).toLowerCase().replace(/\s+/g, '-');

  const renderColorCircle = (color, size = 'w-2.5 h-2.5') => {
    if (!color) return null;
    return (
      <div
        className={`${size} rounded-full border border-[#8B9D83]/40 flex-shrink-0 shadow-sm`}
        style={{ backgroundColor: color }}
        title={color}
      />
    );
  };

  const handleVariantClick = (e, variant, index) => {
    e.stopPropagation();
    e.preventDefault();

    const variantId = getVariantId(variant, index);
    const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
    const variantImages = getVariantImages(variant);

    if (hasSubVariants) {
      setExpandedVariantId(prev => (prev === variantId ? null : variantId));
    }

    if (previewVariantId === variantId) {
      setPreviewVariantId(null);
      setPreviewSubVariantId(null);
      if (onVariantImageSelect) onVariantImageSelect(null, null);
      return;
    }

    setPreviewVariantId(variantId);
    setPreviewSubVariantId(null);

    if (onVariantImageSelect) {
      const info = {
        regularPrice: variant.regularPrice || 0,
        discountPrice: variant.discountPrice || 0,
        stockQuantity: variant.stockQuantity || 0,
        name: variant.name,
        type: 'variant'
      };
      if (variantImages.length > 0) onVariantImageSelect(variantImages, info);
      else onVariantImageSelect(null, info);
    }
  };

  const handleSubVariantClick = (e, variant, subVariant, index, subIndex) => {
    e.stopPropagation();
    e.preventDefault();

    const variantId = getVariantId(variant, index);
    const subVariantId = getSubVariantId(subVariant, subIndex, index);
    const subImages = getSubVariantImages(subVariant);
    const variantImages = getVariantImages(variant);

    if (previewSubVariantId === subVariantId) {
      setPreviewSubVariantId(null);
      if (onVariantImageSelect) onVariantImageSelect(null, null);
      return;
    }

    setPreviewVariantId(variantId);
    setPreviewSubVariantId(subVariantId);

    const info = {
      regularPrice: subVariant.regularPrice || variant.regularPrice || 0,
      discountPrice: subVariant.discountPrice || variant.discountPrice || 0,
      stockQuantity: subVariant.stockQuantity || variant.stockQuantity || 0,
      name: subVariant.name,
      type: 'subVariant'
    };

    if (onVariantImageSelect) {
      if (subImages.length > 0) onVariantImageSelect(subImages, info);
      else if (variantImages.length > 0) onVariantImageSelect(variantImages, info);
      else onVariantImageSelect(null, info);
    }
  };

  const handleVariantToggle = (e, variant, index) => {
    e.stopPropagation();
    e.preventDefault();

    const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
    if (hasSubVariants) return;

    const variantId = getVariantId(variant, index);
    const isSelected = selectedVariants.some(sv => sv.variantId === variantId);

    if (isSelected) {
      onVariantRemove(variantId);
    } else {
      if (selectedVariants.length >= 10) {
        toast.error('You can select up to 10 variants');
        return;
      }
      const variantImages = getVariantImages(variant);
      const newVariant = {
        variantType: variantType.type,
        variantId,
        variantName: variant.name || 'Variant',
        regularPrice: variant.regularPrice || 0,
        discountPrice: variant.discountPrice || 0,
        buyingPrice: variant.buyingPrice || 0,
        packagingCost: variant.packagingCost || 0,
        deliveryCost: variant.deliveryCost || 0,
        costPerItem: variant.costPerItem || 0,
        stockQuantity: variant.stockQuantity || 0,
        quantity: 1,
        subVariants: [],
        variantImages,
        selectedColor: variant.color || null
      };
      onVariantSelect(variantType.type, variant, newVariant);
    }
  };

  const handleSubVariantToggle = (e, variant, subVariant, variantIndex, subIndex) => {
    e.stopPropagation();
    e.preventDefault();

    const variantId = getVariantId(variant, variantIndex);
    const subVariantId = getSubVariantId(subVariant, subIndex, variantIndex);
    const selectedVariant = selectedVariants.find(sv => sv.variantId === variantId);

    if (!selectedVariant) {
      if (selectedVariants.length >= 10) {
        toast.error('You can select up to 10 variants');
        return;
      }
      const subImages = getSubVariantImages(subVariant);
      const variantImages = getVariantImages(variant);

      const newVariant = {
        variantType: variantType.type,
        variantId,
        variantName: variant.name || 'Variant',
        regularPrice: variant.regularPrice || 0,
        discountPrice: variant.discountPrice || 0,
        buyingPrice: variant.buyingPrice || 0,
        packagingCost: variant.packagingCost || 0,
        deliveryCost: variant.deliveryCost || 0,
        costPerItem: variant.costPerItem || 0,
        stockQuantity: variant.stockQuantity || 0,
        quantity: 0,
        subVariants: [{
          ...subVariant,
          id: subVariantId,
          quantity: 1,
          subVariantImages: subImages
        }],
        variantImages
      };
      onVariantSelect(variantType.type, variant, newVariant);
      return;
    }

    const currentSubVariants = selectedVariant.subVariants || [];
    const isSubSelected = currentSubVariants.some(sv => getSubVariantKey(sv) === subVariantId);

    let updatedSubVariants;
    if (isSubSelected) {
      updatedSubVariants = currentSubVariants.filter(sv => getSubVariantKey(sv) !== subVariantId);
    } else {
      if (currentSubVariants.length >= 5) {
        toast.error('Maximum 5 sub-variants per variant');
        return;
      }
      const subImages = getSubVariantImages(subVariant);
      updatedSubVariants = [...currentSubVariants, {
        ...subVariant,
        id: subVariantId,
        quantity: 1,
        subVariantImages: subImages
      }];
    }

    onVariantSelect(variantType.type, variant, {
      ...selectedVariant,
      quantity: 0,
      subVariants: updatedSubVariants
    });
  };

  return (
    <div className="bg-white rounded-xl border border-[#8B9D83]/20 p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-sm font-bold text-[#2D1B2E] flex items-center gap-1.5"
          style={{ fontFamily: FONT_FAMILY_SANS }}
        >
          <Grid className="w-4 h-4 text-[#8B9D83]" />
          {variantType.type.charAt(0).toUpperCase() + variantType.type.slice(1)} Variants
          <span className="text-xs text-[#6B7280] font-normal">
            ({selectedVariants.filter(sv => sv.variantType === variantType.type).length} selected)
          </span>
        </h3>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4">
        {variants.map((variant, index) => {
          const variantId = getVariantId(variant, index);
          const selectedVariant = selectedVariants.find(sv => sv.variantId === variantId);
          const isSelected = !!selectedVariant;
          const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
          const isExpanded = expandedVariantId === variantId;
          const isPreviewed = previewVariantId === variantId;
          const variantImage = getVariantImage(variant);
          const variantColor = getVariantColor(variant);
          const variantKey = `variant-block-${index}`;

          const selectedSubCount = selectedVariant?.subVariants?.length || 0;
          const vRegular = variant.regularPrice || 0;
          const vDiscount = variant.discountPrice || 0;
          const vHasDiscount = vDiscount > 0 && vDiscount < vRegular;

          return (
            <div key={variantKey} className="flex flex-col items-center">
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => handleVariantClick(e, variant, index)}
                  className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                    isPreviewed
                      ? 'border-[#8B9D83] shadow-[0_0_0_3px_rgba(139,157,131,0.20)]'
                      : isSelected || selectedSubCount > 0
                      ? 'border-[#8B9D83]/70 shadow-md shadow-[#8B9D83]/10'
                      : isExpanded
                      ? 'border-[#8B9D83]/70'
                      : 'border-[#8B9D83]/20 hover:border-[#8B9D83]/60'
                  } bg-white`}
                  title={variant.name}
                >
                  {variantImage ? (
                    <img src={variantImage} alt={variant.name} className="w-full h-full object-cover" />
                  ) : variantColor ? (
                    <div className="w-full h-full" style={{ backgroundColor: variantColor }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#FDF7EF]">
                      <Package className="w-6 h-6 text-[#8B9D83]/60" />
                    </div>
                  )}

                  {!hasSubVariants && isSelected && (
                    <span className="absolute bottom-1 left-1 bg-[#8B9D83] text-white rounded-full p-0.5 shadow-md">
                      <Check className="w-3 h-3" />
                    </span>
                  )}

                  {hasSubVariants && (
                    <span className="absolute bottom-1 right-1 text-[9px] font-bold bg-[#2D1B2E]/80 text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Layers className="w-2.5 h-2.5" />
                      {variant.subVariants.length}
                    </span>
                  )}

                  {hasSubVariants && (
                    <span className={`absolute bottom-1 left-1 bg-white/90 rounded-full p-0.5 shadow transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-3 h-3 text-[#465641]" />
                    </span>
                  )}
                </button>

                {!hasSubVariants && (
                  <button
                    type="button"
                    onClick={(e) => handleVariantToggle(e, variant, index)}
                    className={`absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full flex items-center justify-center shadow-md transition-all duration-200 border ${
                      isSelected
                        ? 'bg-[#465641] border-[#465641] text-white'
                        : 'bg-white border-[#8B9D83]/40 text-[#465641] hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83]'
                    }`}
                    aria-label={isSelected ? 'Remove variant' : 'Add variant'}
                  >
                    {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </button>
                )}
              </div>

              <div className="mt-1 flex flex-col items-center max-w-[80px]">
                <div className="flex items-center gap-1">
                  {variantColor && renderColorCircle(variantColor)}
                  <p className="text-[10px] font-medium text-[#2D1B2E] truncate text-center" title={variant.name}>
                    {variant.name}
                  </p>
                </div>
                {vHasDiscount ? (
                  <>
                    <p className="text-[9px] font-semibold text-[#465641] mt-0.5 leading-tight">
                      ৳{formatPrice(vDiscount)}
                    </p>
                    <p className="text-[8px] text-gray-400 line-through leading-tight">
                      ৳{formatPrice(vRegular)}
                    </p>
                  </>
                ) : (
                  <p className="text-[9px] font-semibold text-[#465641] mt-0.5 leading-tight">
                    ৳{formatPrice(vRegular)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {expandedVariantId && (() => {
          const parentIndex = variants.findIndex(
            (v, i) => getVariantId(v, i) === expandedVariantId
          );
          if (parentIndex === -1) return null;
          const parent = variants[parentIndex];
          if (!parent.subVariants || parent.subVariants.length === 0) return null;

          const selectedParent = selectedVariants.find(
            sv => sv.variantId === expandedVariantId
          );

          return (
            <motion.div
              key={`expand-${expandedVariantId}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-[#8B9D83]/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-[#2D1B2E] flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#8B9D83]" />
                    {parent.name} - Sub-Variants
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedVariantId(null);
                    }}
                    className="p-0.5 rounded-full hover:bg-white text-[#6B7280]"
                    aria-label="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {parent.subVariants.map((subVariant, subIndex) => {
                    const subVariantId = getSubVariantId(subVariant, subIndex, parentIndex);
                    const isSubSelected =
                      selectedParent?.subVariants?.some(
                        sv => getSubVariantKey(sv) === subVariantId
                      ) || false;
                    const isSubPreviewed = previewSubVariantId === subVariantId;
                    const subImage = subVariant.images?.[0] || subVariant.imagePreviews?.[0] || null;
                    const subColor = subVariant.color || null;
                    const subDiscount = subVariant.discountPrice || 0;
                    const subRegular = subVariant.regularPrice || 0;
                    const hasSubDiscount = subDiscount > 0 && subDiscount < subRegular;

                    return (
                      <div key={`sub-${parentIndex}-${subIndex}`} className="flex flex-col items-center">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) =>
                              handleSubVariantClick(e, parent, subVariant, parentIndex, subIndex)
                            }
                            className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                              isSubPreviewed
                                ? 'border-[#8B9D83] shadow-[0_0_0_3px_rgba(139,157,131,0.20)]'
                                : isSubSelected
                                ? 'border-[#8B9D83]/70 shadow-md shadow-[#8B9D83]/10'
                                : 'border-[#8B9D83]/20 hover:border-[#8B9D83]/60'
                            } bg-white`}
                            title={subVariant.name}
                          >
                            {subImage ? (
                              <img src={subImage} alt={subVariant.name} className="w-full h-full object-cover" />
                            ) : subColor ? (
                              <div className="w-full h-full" style={{ backgroundColor: subColor }} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[#FDF7EF]">
                                <Box className="w-6 h-6 text-[#8B9D83]/60" />
                              </div>
                            )}

                            {isSubSelected && (
                              <span className="absolute bottom-1 left-1 bg-[#8B9D83] text-white rounded-full p-0.5 shadow-md">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={(e) =>
                              handleSubVariantToggle(e, parent, subVariant, parentIndex, subIndex)
                            }
                            className={`absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full flex items-center justify-center shadow-md transition-all duration-200 border ${
                              isSubSelected
                                ? 'bg-[#465641] border-[#465641] text-white'
                                : 'bg-white border-[#8B9D83]/40 text-[#465641] hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83]'
                            }`}
                            aria-label={isSubSelected ? 'Remove' : 'Add'}
                          >
                            {isSubSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          </button>
                        </div>

                        <div className="mt-1 flex flex-col items-center max-w-[80px]">
                          <div className="flex items-center gap-1">
                            {subColor && renderColorCircle(subColor)}
                            <p className="text-[10px] font-medium text-[#2D1B2E] truncate text-center" title={subVariant.name}>
                              {subVariant.name}
                            </p>
                          </div>
                          {hasSubDiscount ? (
                            <>
                              <p className="text-[9px] font-semibold text-[#465641] mt-0.5 leading-tight">
                                ৳{formatPrice(subDiscount)}
                              </p>
                              <p className="text-[8px] text-gray-400 line-through leading-tight">
                                ৳{formatPrice(subRegular)}
                              </p>
                            </>
                          ) : (
                            <p className="text-[9px] font-semibold text-[#465641] mt-0.5 leading-tight">
                              ৳{formatPrice(subRegular)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};

// ========== ADD-ONS SECTION ==========
// const AddOnsSection = ({ addOns, onAddToCart }) => {
//   const [selectedAddOns, setSelectedAddOns] = useState({});
//   const [quantities, setQuantities] = useState({});
//   const [addingToCart, setAddingToCart] = useState({});

//   const handleAddOnToggle = (addOn) => {
//     const id = addOn.productId?._id || addOn.productId;
//     if (selectedAddOns[id]) {
//       setSelectedAddOns(prev => {
//         const newState = { ...prev };
//         delete newState[id];
//         return newState;
//       });
//       setQuantities(prev => {
//         const newState = { ...prev };
//         delete newState[id];
//         return newState;
//       });
//     } else {
//       setSelectedAddOns(prev => ({ ...prev, [id]: addOn }));
//       setQuantities(prev => ({ ...prev, [id]: 1 }));
//     }
//   };

//   const updateQuantity = (id, newQty) => {
//     if (newQty >= 1) {
//       setQuantities(prev => ({ ...prev, [id]: newQty }));
//     }
//   };

//   const handleAddToCart = async (addOn) => {
//     const id = addOn.productId?._id || addOn.productId;
//     const quantity = quantities[id] || 1;

//     setAddingToCart(prev => ({ ...prev, [id]: true }));
//     const toastId = toast.loading(`Adding ${addOn.productName} to cart...`);

//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;

//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           productId: id,
//           quantity: quantity,
//           selectedColor: null
//         })
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success(`${addOn.productName} added to cart!`, { id: toastId });
//         window.dispatchEvent(new Event('cart-update'));
//         setSelectedAddOns(prev => {
//           const newState = { ...prev };
//           delete newState[id];
//           return newState;
//         });
//         setQuantities(prev => {
//           const newState = { ...prev };
//           delete newState[id];
//           return newState;
//         });
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     } finally {
//       setAddingToCart(prev => ({ ...prev, [id]: false }));
//     }
//   };

//   const handleAddAllToCart = async () => {
//     const addOnIds = Object.keys(selectedAddOns);
//     if (addOnIds.length === 0) {
//       toast.error('No add-ons selected');
//       return;
//     }

//     let successCount = 0;
//     let errorCount = 0;

//     for (const id of addOnIds) {
//       const addOn = selectedAddOns[id];
//       const quantity = quantities[id] || 1;

//       try {
//         const token = localStorage.getItem('token');
//         const sessionId = localStorage.getItem('cartSessionId');
//         const headers = { 'Content-Type': 'application/json' };
//         if (token) headers['Authorization'] = `Bearer ${token}`;
//         else if (sessionId) headers['x-session-id'] = sessionId;

//         const response = await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({
//             productId: id,
//             quantity: quantity,
//             selectedColor: null
//           })
//         });

//         const data = await response.json();
//         if (data.success) {
//           successCount++;
//           if (data.sessionId && !token) {
//             localStorage.setItem('cartSessionId', data.sessionId);
//           }
//         } else {
//           errorCount++;
//         }
//       } catch (error) {
//         console.error('Add to cart error:', error);
//         errorCount++;
//       }
//     }

//     if (successCount > 0) {
//       toast.success(`${successCount} add-on(s) added to cart!`);
//       window.dispatchEvent(new Event('cart-update'));
//       setSelectedAddOns({});
//       setQuantities({});
//     } else if (errorCount > 0) {
//       toast.error('Failed to add add-ons to cart');
//     }
//   };

//   if (!addOns || addOns.length === 0) {
//     return null;
//   }

//   const totalSelected = Object.keys(selectedAddOns).length;
//   const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

//   return (
//     <div className="mt-6 p-4 bg-white rounded-xl border border-[#8B9D83]/20">
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <Gift className="w-5 h-5 text-[#8B9D83]" />
//           <h3 className="text-sm font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SANS }}>
//             Add-Ons
//           </h3>
//           <span className="text-xs text-[#6B7280]">
//             (Select add-on products to purchase together)
//           </span>
//         </div>
//         {totalSelected > 0 && (
//           <button
//             onClick={handleAddAllToCart}
//             className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-[#8B9D83] to-[#465641] rounded-lg hover:shadow-lg transition-all flex items-center gap-1"
//           >
//             <ShoppingCart className="w-3 h-3" />
//             Add {totalSelected} ({totalItems} items)
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
//         {addOns.map((addOn, index) => {
//           const product = addOn.productId || addOn;
//           const id = product._id || addOn.productId;
//           const isSelected = !!selectedAddOns[id];
//           const quantity = quantities[id] || 1;
//           const isAdding = addingToCart[id] || false;

//           return (
//             <div
//               key={id || index}
//               className={`border rounded-lg p-2 transition-all duration-200 ${
//                 isSelected
//                   ? 'border-[#8B9D83] bg-white shadow-md shadow-[#8B9D83]/10'
//                   : 'border-[#8B9D83]/20 bg-white hover:border-[#8B9D83]/50'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <div className="flex-shrink-0">
//                   {product.images && product.images[0] ? (
//                     <img
//                       src={product.images[0].url || product.images[0]}
//                       alt={product.productName}
//                       className="w-10 h-10 rounded-lg object-cover border border-[#8B9D83]/20"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-lg bg-[#FDF7EF] flex items-center justify-center">
//                       <Package className="w-5 h-5 text-[#8B9D83]" />
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs font-medium text-[#2D1B2E] truncate">
//                     {product.productName}
//                   </p>
//                   <p className="text-xs text-[#465641] font-semibold">
//                     ৳{formatPrice(product.discountPrice || product.regularPrice || 0)}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => handleAddOnToggle(addOn)}
//                   className={`flex-shrink-0 p-1.5 rounded-full transition-all ${
//                     isSelected
//                       ? 'bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white'
//                       : 'bg-[#FDF7EF] text-[#8B9D83] hover:bg-[#8B9D83] hover:text-white'
//                   }`}
//                 >
//                   {isSelected ? (
//                     <Check className="w-3 h-3" />
//                   ) : (
//                     <Plus className="w-3 h-3" />
//                   )}
//                 </button>
//               </div>

//               {isSelected && (
//                 <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#8B9D83]/20">
//                   <div className="flex items-center rounded-lg border border-[#8B9D83]/20 overflow-hidden bg-white">
//                     <button
//                       onClick={() => updateQuantity(id, quantity - 1)}
//                       className="w-6 h-6 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF]"
//                     >
//                       <Minus className="w-2.5 h-2.5" />
//                     </button>
//                     <span className="w-7 text-center font-semibold text-[#2D1B2E] text-xs">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => updateQuantity(id, quantity + 1)}
//                       className="w-6 h-6 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF]"
//                     >
//                       <Plus className="w-2.5 h-2.5" />
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => handleAddToCart(addOn)}
//                     disabled={isAdding}
//                     className="px-2 py-0.5 text-[10px] font-medium text-white bg-gradient-to-r from-[#8B9D83] to-[#465641] rounded-lg hover:shadow-lg transition-all flex items-center gap-1 disabled:opacity-50"
//                   >
//                     {isAdding ? (
//                       <Loader2 className="w-2.5 h-2.5 animate-spin" />
//                     ) : (
//                       <ShoppingCart className="w-2.5 h-2.5" />
//                     )}
//                     Add
//                   </button>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// ========== ADD-ONS SECTION ==========
const AddOnsSection = ({ addOns, onAddToCart }) => {
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [quantities, setQuantities] = useState({});
  const [addingToCart, setAddingToCart] = useState({});

  const handleAddOnToggle = (addOn) => {
    const id = addOn.productId?._id || addOn.productId;
    if (selectedAddOns[id]) {
      setSelectedAddOns(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
      setQuantities(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    } else {
      setSelectedAddOns(prev => ({ ...prev, [id]: addOn }));
      setQuantities(prev => ({ ...prev, [id]: 1 }));
    }
  };

  const updateQuantity = (id, newQty) => {
    if (newQty >= 1) {
      setQuantities(prev => ({ ...prev, [id]: newQty }));
    }
  };

  const handleAddToCart = async (addOn) => {
    const id = addOn.productId?._id || addOn.productId;
    const quantity = quantities[id] || 1;

    setAddingToCart(prev => ({ ...prev, [id]: true }));
    const toastId = toast.loading(`Adding ${addOn.productName} to cart...`);

    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          productId: id,
          quantity: quantity,
          selectedColor: null
        })
      });

      const data = await response.json();

      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        toast.success(`${addOn.productName} added to cart!`, { id: toastId });
        window.dispatchEvent(new Event('cart-update'));
        setSelectedAddOns(prev => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
        setQuantities(prev => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      } else {
        toast.error(data.error || 'Failed to add to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error. Please try again.', { id: toastId });
    } finally {
      setAddingToCart(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleAddAllToCart = async () => {
    const addOnIds = Object.keys(selectedAddOns);
    if (addOnIds.length === 0) {
      toast.error('No add-ons selected');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const id of addOnIds) {
      const addOn = selectedAddOns[id];
      const quantity = quantities[id] || 1;

      try {
        const token = localStorage.getItem('token');
        const sessionId = localStorage.getItem('cartSessionId');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        else if (sessionId) headers['x-session-id'] = sessionId;

        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            productId: id,
            quantity: quantity,
            selectedColor: null
          })
        });

        const data = await response.json();
        if (data.success) {
          successCount++;
          if (data.sessionId && !token) {
            localStorage.setItem('cartSessionId', data.sessionId);
          }
        } else {
          errorCount++;
        }
      } catch (error) {
        console.error('Add to cart error:', error);
        errorCount++;
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} add-on(s) added to cart!`);
      window.dispatchEvent(new Event('cart-update'));
      setSelectedAddOns({});
      setQuantities({});
    } else if (errorCount > 0) {
      toast.error('Failed to add add-ons to cart');
    }
  };

  if (!addOns || addOns.length === 0) {
    return null;
  }

  const totalSelected = Object.keys(selectedAddOns).length;
  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="mt-6 p-4 bg-white rounded-xl border border-[#8B9D83]/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#8B9D83]" />
          <h3 className="text-sm font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SANS }}>
            Add-Ons
          </h3>
          <span className="text-xs text-[#6B7280]">
            (Select add-on products to purchase together)
          </span>
        </div>
        {totalSelected > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-[#8B9D83] to-[#465641] rounded-lg hover:shadow-lg transition-all flex items-center gap-1"
          >
            <ShoppingCart className="w-3 h-3" />
            Add {totalSelected} ({totalItems} items)
          </button>
        )}
      </div>

      {/* Vertical list with scrollbar — ~2 rows visible */}
      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#8B9D83]">
        {addOns.map((addOn, index) => {
          const product = addOn.productId || addOn;
          const id = product._id || addOn.productId;
          const isSelected = !!selectedAddOns[id];
          const quantity = quantities[id] || 1;
          const isAdding = addingToCart[id] || false;

          return (
            <div
              key={id || index}
              className={`border rounded-lg p-2 transition-all duration-200 ${
                isSelected
                  ? 'border-[#8B9D83] bg-white shadow-md shadow-[#8B9D83]/10'
                  : 'border-[#8B9D83]/20 bg-white hover:border-[#8B9D83]/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0].url || product.images[0]}
                      alt={product.productName}
                      className="w-10 h-10 rounded-lg object-cover border border-[#8B9D83]/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#FDF7EF] flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#8B9D83]" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#2D1B2E] truncate">
                    {product.productName}
                  </p>
                  <p className="text-xs text-[#465641] font-semibold">
                    ৳{formatPrice(product.discountPrice || product.regularPrice || 0)}
                  </p>
                </div>

                <button
                  onClick={() => handleAddOnToggle(addOn)}
                  className={`flex-shrink-0 p-1.5 rounded-full transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white'
                      : 'bg-[#FDF7EF] text-[#8B9D83] hover:bg-[#8B9D83] hover:text-white'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Plus className="w-3 h-3" />
                  )}
                </button>
              </div>

              {isSelected && (
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#8B9D83]/20">
                  <div className="flex items-center rounded-lg border border-[#8B9D83]/20 overflow-hidden bg-white">
                    <button
                      onClick={() => updateQuantity(id, quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF]"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="w-7 text-center font-semibold text-[#2D1B2E] text-xs">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(id, quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-[#3A4A3F] hover:bg-[#FDF7EF]"
                    >
                      <Plus className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(addOn)}
                    disabled={isAdding}
                    className="px-2 py-0.5 text-[10px] font-medium text-white bg-gradient-to-r from-[#8B9D83] to-[#465641] rounded-lg hover:shadow-lg transition-all flex items-center gap-1 disabled:opacity-50"
                  >
                    {isAdding ? (
                      <Loader2 className="w-2.5 h-2.5 animate-spin" />
                    ) : (
                      <ShoppingCart className="w-2.5 h-2.5" />
                    )}
                    Add
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ========== RELATED PRODUCT CARD ==========
const RelatedProductCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const [imageErrors, setImageErrors] = useState({});
  const [hasUserNavigated, setHasUserNavigated] = useState(false);

  const productId = product?._id || product?.id || 'unknown';
  const productName = product?.productName || product?.name || 'Product';
  const regularPrice = Number(product?.regularPrice || product?.price || 0);
  const discountPrice = Number(product?.discountPrice || 0);
  const stockQuantity = Number(product?.stockQuantity || 0);

  let productImages = [];
  if (product?.images && Array.isArray(product.images)) {
    productImages = product.images
      .map((img) => {
        if (typeof img === 'string') return img;
        if (img?.url) return img.url;
        return null;
      })
      .filter(Boolean);
  }
  if (productImages.length === 0 && product?.image) {
    productImages = [typeof product.image === 'string' ? product.image : product.image?.url || ''].filter(Boolean);
  }
  if (productImages.length === 0) {
    productImages = ['/placeholder-product.jpg'];
  }

  const hasHoverImage = productImages.length > 1;
  const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
  const hasMultipleImages = productImages.length > 1;
  const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
  const originalPrice = regularPrice;

  const isOutOfStock = stockQuantity <= 0;

  const rating = product?.rating ? Number(product.rating) : 0;
  const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsInCart(propIsInCart || false);
  }, [propIsInCart]);

  useEffect(() => {
    if (!isHovered) {
      setHasUserNavigated(false);
      setActiveIndex(0);
    }
  }, [isHovered]);

  const nextImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (hasMultipleImages) {
      setActiveIndex((prev) => (prev + 1) % productImages.length);
      setHasUserNavigated(true);
    }
  };

  const prevImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (hasMultipleImages) {
      setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
      setHasUserNavigated(true);
    }
  };

  const goToImage = (e, index) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveIndex(index);
    setHasUserNavigated(true);
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const getCurrentImage = () => {
    if (isHovered && hasHoverImage && !isMobile && !hasUserNavigated) {
      const hoverIndex = 1;
      const image = productImages[hoverIndex] || productImages[0];
      if (imageErrors[hoverIndex]) {
        return productImages[0] || '/placeholder-product.jpg';
      }
      return image;
    }

    const image = productImages[activeIndex] || productImages[0];
    if (imageErrors[activeIndex]) {
      return '/placeholder-product.jpg';
    }
    return image;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHasUserNavigated(false);
    setActiveIndex(0);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      if (onViewInCart) onViewInCart();
      return;
    }

    if (isOutOfStock) {
      toast.error('Product is out of stock!');
      return;
    }

    setCartStatusLoading(true);
    const toastId = toast.loading('Adding to cart...');

    try {
      const token = localStorage.getItem('token');
      let sessionId = localStorage.getItem('cartSessionId');

      const headers = { 'Content-Type': 'application/json' };

      if (!token && !sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('cartSessionId', sessionId);
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId: productId, quantity: 1 })
      });

      const data = await response.json();

      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        toast.success('Added to cart!', { id: toastId });
        setIsInCart(true);
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to add to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error. Please try again.', { id: toastId });
    } finally {
      setCartStatusLoading(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-2.5 w-2.5 fill-current text-[#8B9D83]" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-2.5 w-2.5">
            <Star className="absolute h-2.5 w-2.5 text-gray-200" />
            <div className="absolute left-0 top-0 h-2.5 w-1/2 overflow-hidden">
              <Star className="h-2.5 w-2.5 fill-current text-[#8B9D83]" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-2.5 w-2.5 text-[#8B9D83]/30" />);
      }
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/product/${product?.slug || productId}`} className="block h-full">
        <article
          className={`group relative flex w-full flex-col rounded-[3px] bg-[#FDF7EF] px-2.5 pb-3 pt-2 transition-all duration-300 ${
            isHovered ? '-translate-y-1 shadow-[0_5px_20px_rgba(139,157,131,0.15)]' : ''
          }`}
        >
          {/* DISCOUNT BADGE */}
          {discountPercent > 0 && (
            <motion.div
              className="absolute left-2.5 top-2 z-10"
              animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
              transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
            >
              <span
                className="relative flex items-center justify-center overflow-hidden rounded-full bg-[#8B9D83] px-2 py-[3px] text-[7px] font-semibold tracking-wide text-white sm:text-[8px]"
                style={{ fontFamily: FONT_FAMILY_SANS }}
              >
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <span className="relative z-10">{discountPercent}% OFF</span>
              </span>
            </motion.div>
          )}

          {/* HOVER ACTION ICONS — Eye + Cart (appear on hover only) */}
          <div
            className={`absolute right-2.5 top-2 z-10 flex items-center gap-1 transition-all duration-300 ${
              isHovered
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-2 pointer-events-none'
            }`}
          >
            {/* Eye / View icon */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/product/${product?.slug || productId}`);
              }}
              aria-label="View product"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#3A4A3F] shadow-sm transition-all duration-200 hover:bg-[#8B9D83] hover:text-white"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>

            {/* Cart icon */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock || cartStatusLoading}
              aria-label={isInCart ? 'View in cart' : 'Add to cart'}
              className={`flex h-6 w-6 items-center justify-center rounded-full backdrop-blur-sm shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                isInCart
                  ? 'bg-[#8B9D83] text-white'
                  : 'bg-white/90 text-[#3A4A3F] hover:bg-[#8B9D83] hover:text-white'
              }`}
            >
              {cartStatusLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <ShoppingCart size={14} strokeWidth={1.9} />
              )}
            </button>
          </div>

          {/* PRODUCT IMAGE */}
          <div className="relative flex h-[145px] w-full items-center justify-center overflow-hidden rounded-sm bg-[#FDF7EF] sm:h-[165px] lg:h-[180px]">
            <motion.img
              src={getCurrentImage()}
              alt={productName}
              className="h-full w-full object-contain p-2 transition-transform duration-500"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onError={() =>
                handleImageError(
                  isHovered && hasHoverImage && !isMobile && !hasUserNavigated ? 1 : activeIndex
                )
              }
              loading="lazy"
            />

            {/* Image Navigation Arrows */}
            {hasMultipleImages && (
              <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
                <motion.button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prevImage(e);
                  }}
                  className="rounded-full bg-white/80 p-0.5 shadow-sm hover:bg-white"
                  aria-label="Previous image"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-3 w-3 text-[#8B9D83]" />
                </motion.button>

                <div className="flex items-center gap-0.5">
                  {productImages.map((_, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        goToImage(e, index);
                      }}
                      className={`rounded-full transition-all duration-200 ${
                        activeIndex === index
                          ? 'h-1.5 w-1.5 bg-[#8B9D83]'
                          : 'h-1 w-1 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/60'
                      }`}
                      whileHover={{ scale: 1.3 }}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextImage(e);
                  }}
                  className="rounded-full bg-white/80 p-0.5 shadow-sm hover:bg-white"
                  aria-label="Next image"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-3 w-3 text-[#8B9D83]" />
                </motion.button>
              </div>
            )}

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-sm bg-black/50">
                <span
                  className="rounded-full bg-black px-3 py-1 text-[10px] font-medium text-white"
                  style={{ fontFamily: FONT_FAMILY_SANS }}
                >
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* PRODUCT NAME */}
          <h3
            className="mt-1 truncate text-center text-[11px] font-semibold text-[#2D1B2E] transition-colors duration-300 group-hover:text-[#465641] sm:text-xs"
            style={{ fontFamily: FONT_FAMILY_SANS }}
            title={productName}
          >
            {truncateText(productName, 25)}
          </h3>

          {/* RATING */}
          <div className="mt-1 flex items-center justify-center gap-[2px]">
            <div className="flex">{renderStars()}</div>
            {reviewCount > 0 && (
              <span
                className="ml-1 text-[9px] text-[#465641] sm:text-[10px]"
                style={{ fontFamily: FONT_FAMILY_SANS }}
              >
                ({reviewCount})
              </span>
            )}
          </div>

          {/* PRICE */}
          <div className="mt-1 text-center">
            {discountPercent > 0 ? (
              <>
                <span
                  className="text-[12px] font-bold text-[#465641] sm:text-sm"
                  style={{ fontFamily: FONT_FAMILY_SANS }}
                >
                  ৳{formatPrice(currentPrice)}
                </span>
                <span
                  className="ml-1.5 text-[10px] text-[#9CA3AF] line-through sm:text-[11px]"
                  style={{ fontFamily: FONT_FAMILY_SANS }}
                >
                  ৳{formatPrice(originalPrice)}
                </span>
              </>
            ) : (
              <span
                className="text-[12px] font-bold text-[#2D1B2E] sm:text-sm"
                style={{ fontFamily: FONT_FAMILY_SANS }}
              >
                ৳{formatPrice(currentPrice)}
              </span>
            )}
          </div>

          {/* ADD TO BAG BUTTON */}
          <motion.button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || cartStatusLoading}
            whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
            whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
            className={`mt-2 h-[29px] w-full rounded-[2px] border text-[9px] font-medium uppercase tracking-wide transition-all duration-200 sm:h-[31px] sm:text-[10px] ${
              isInCart
                ? 'border-[#8B9D83] bg-[#8B9D83] text-white'
                : isOutOfStock
                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border-[#8B9D83]/30 bg-white text-[#2D1B2E] hover:border-[#8B9D83] hover:bg-[#8B9D83] hover:text-white'
            }`}
            style={{ fontFamily: FONT_FAMILY_SANS }}
          >
            {cartStatusLoading ? (
              <Loader2 className="mx-auto h-3 w-3 animate-spin" />
            ) : isInCart ? (
              'IN BAG'
            ) : isOutOfStock ? (
              'OUT OF STOCK'
            ) : (
              'ADD TO BAG'
            )}
          </motion.button>
        </article>
      </Link>
    </motion.div>
  );
};

// ========== REVIEW ITEM ==========
const ReviewItem = ({ review, isOwner }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful || 0);
  const [isHelpful, setIsHelpful] = useState(false);
  const [markingHelpful, setMarkingHelpful] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [videoThumbnails, setVideoThumbnails] = useState({});
  const [generatingThumbnails, setGeneratingThumbnails] = useState({});
  const [mediaItems, setMediaItems] = useState([]);
  const thumbnailGeneratedRef = useRef({});

  const handleHelpful = async () => {
    if (isHelpful) return;
    setMarkingHelpful(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to mark reviews as helpful');
        return;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/${review._id}/helpful`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setHelpfulCount(prev => prev + 1);
        setIsHelpful(true);
        toast.success('Thanks for your feedback!');
      }
    } catch (error) {
      console.error('Error marking helpful:', error);
    } finally {
      setMarkingHelpful(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${star <= rating ? 'fill-[#8B9D83] text-[#8B9D83]' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const generateVideoThumbnail = useCallback((videoUrl, videoId) => {
    if (thumbnailGeneratedRef.current[videoId] || generatingThumbnails[videoId]) return;
    thumbnailGeneratedRef.current[videoId] = true;
    setGeneratingThumbnails(prev => ({ ...prev, [videoId]: true }));
    const video = document.createElement('video');
    video.crossOrigin = 'Anonymous';
    video.src = videoUrl;
    video.currentTime = 1.5;
    const handleLoadedData = () => {
      setTimeout(() => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 160;
          canvas.height = 160;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
          setVideoThumbnails(prev => ({ ...prev, [videoId]: thumbnailUrl }));
          setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
        } catch (error) {
          console.error('Error generating thumbnail:', error);
          setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
        }
      }, 100);
    };
    const handleError = () => {
      console.error('Error loading video for thumbnail generation');
      setGeneratingThumbnails(prev => ({ ...prev, [videoId]: false }));
    };
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.load();
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [generatingThumbnails]);

  useEffect(() => {
    const items = [];
    if (review.images && review.images.length > 0) {
      review.images.forEach(img => {
        items.push({
          type: 'image',
          url: img.url,
          thumbnail: img.url,
          id: `img-${Date.now()}-${Math.random()}`
        });
      });
    }
    if (review.video && review.video.url) {
      const videoId = `video-${Date.now()}-${Math.random()}`;
      const isYouTube = review.videoType === 'youtube' || review.video.url?.includes('youtube.com') || review.video.url?.includes('youtu.be');
      items.push({
        type: 'video',
        url: review.video.url,
        videoType: review.videoType || 'upload',
        thumbnail: review.video.thumbnail || review.video.url,
        id: videoId,
        isYouTube: isYouTube
      });
      if (!isYouTube && !videoThumbnails[videoId] && !thumbnailGeneratedRef.current[videoId]) {
        generateVideoThumbnail(review.video.url, videoId);
      }
    }
    setMediaItems(items);
  }, [review]);

  const handleMediaClick = (index) => {
    setSelectedMediaIndex(index);
    setMediaModalOpen(true);
  };

  return (
    <>
      <div className={`border-b border-[#8B9D83]/20 last:border-0 py-4 last:pb-0 ${review.status === 'pending' ? 'opacity-80 bg-[#FDF7EF]/50 rounded-lg px-3 -mx-3' : ''}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${review.status === 'pending' ? 'bg-[#8B9D83]' : 'bg-[#2D1B2E]'}`}>
              {review.isAnonymous ? 'A' : getInitials(review.userName)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-[#2D1B2E] text-sm" style={{ fontFamily: FONT_FAMILY_SANS }}>
                  {review.isAnonymous ? 'Anonymous User' : review.userName}
                </p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  {renderStars(review.rating)}
                  <span className="text-xs text-[#6B7280]">{formatDate(review.createdAt)}</span>
                  {review.isVerifiedPurchase && (
                    <span className="text-[10px] bg-[#8B9D83]/20 text-[#465641] px-1.5 py-0.5 rounded-full font-medium">Verified</span>
                  )}
                  {isOwner && (
                    <span className="text-[10px] bg-[#8B9D83]/20 text-[#465641] px-1.5 py-0.5 rounded-full font-medium">Your Review</span>
                  )}
                  {review.status === 'pending' && (
                    <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Pending Approval
                    </span>
                  )}
                </div>
              </div>
            </div>
            {review.title && (
              <h4 className="font-semibold text-[#2D1B2E] text-sm mt-1.5" style={{ fontFamily: FONT_FAMILY_SANS }}>{review.title}</h4>
            )}
            <p className="text-[#3A4A3F] text-sm mt-1 leading-relaxed">{review.comment}</p>
            {review.status === 'pending' && isOwner && (
              <div className="mt-2 text-xs text-yellow-800 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                <Clock className="w-3 h-3 inline mr-1" />
                This review is awaiting moderation. It will be visible to others once approved.
              </div>
            )}
            {review.status === 'approved' && mediaItems.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {mediaItems.map((item, idx) => {
                  if (item.type === 'image') {
                    return (
                      <img
                        key={item.id || idx}
                        src={item.url}
                        alt={`Review image ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-[#8B9D83]/20 hover:border-[#8B9D83]"
                        onClick={() => handleMediaClick(idx)}
                      />
                    );
                  } else if (item.type === 'video') {
                    const isYouTube = item.isYouTube;
                    const thumbUrl = isYouTube ? getYouTubeThumbnail(item.url) : (videoThumbnails[item.id] || item.thumbnail);
                    return (
                      <button
                        key={item.id || idx}
                        onClick={() => handleMediaClick(idx)}
                        className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative border-[#8B9D83]/20 hover:border-[#8B9D83]"
                      >
                        {thumbUrl ? (
                          <img src={thumbUrl} alt="Video thumbnail" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#FDF7EF] flex items-center justify-center">
                            {generatingThumbnails[item.id] ? (
                              <Loader2 className="w-4 h-4 text-[#8B9D83] animate-spin" />
                            ) : (
                              <Play className="w-4 h-4 text-[#8B9D83]" />
                            )}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            {review.status === 'approved' && review.reply?.text && (
              <div className="mt-3 bg-[#FDF7EF] rounded-lg p-3 border border-[#8B9D83]/20">
                <p className="text-xs font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY_SANS }}>Seller Response</p>
                <p className="text-sm text-[#3A4A3F]">{review.reply.text}</p>
                <p className="text-xs text-[#6B7280] mt-1">{new Date(review.reply.repliedAt).toLocaleDateString()}</p>
              </div>
            )}
            {review.status === 'approved' && (
              <button
                onClick={handleHelpful}
                disabled={markingHelpful || isHelpful}
                className={`mt-2 flex items-center gap-1.5 text-xs transition-colors ${isHelpful ? 'text-[#465641]' : 'text-[#6B7280] hover:text-[#465641]'} disabled:opacity-50`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${isHelpful ? 'fill-[#465641]' : ''}`} />
                <span>Helpful ({helpfulCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <ReviewMediaModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        mediaItems={mediaItems}
        initialIndex={selectedMediaIndex}
        reviewTitle={review.title || review.comment?.slice(0, 50)}
      />
    </>
  );
};

// ========== PRODUCT INFO SIDEBAR ==========
function ProductInfoSidebar({
  type,
  onClose,
  product,
  specifications,
  hasDeliveryInfo,
  reviews,
  reviewStats,
  loadingReviews,
  reviewPage,
  reviewTotalPages,
  reviewTotal,
  reviewFilter,
  reviewSort,
  setReviewFilter,
  setReviewSort,
  setReviewPage,
  onWriteReview,
  userReview,
  renderStarsForReview
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [type]);

  if (!type) return null;

  const titles = {
    description: 'Product Description',
    specifications: 'Specifications',
    delivery: 'Delivery Information',
    faqs: 'Frequently Asked Questions',
    reviews: 'Reviews'
  };

  return (
    <div className="fixed inset-0 z-[9999]">
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/40 backdrop-blur-[1px]"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col bg-white shadow-2xl animate-[slideIn_0.35s_ease-out]">
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-[#8B9D83]/30 px-5 sm:px-6">
          <h2
            className="text-base sm:text-lg font-bold tracking-tight text-[#2D1B2E]"
            style={{ fontFamily: FONT_FAMILY_SERIF }}
          >
            {titles[type] || ''}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#FDF7EF]"
          >
            <X size={22} strokeWidth={1.6} className="text-[#465641]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6">
        {type === 'description' && (
  <div className="space-y-6">
    {/* Short Description */}
    {product?.shortDescription && product.shortDescription !== '<p></p>' && (
      <div>
        <h3
          className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#8B9D83]"
          style={{ fontFamily: FONT_FAMILY_SANS }}
        >
          Short Description
        </h3>
        <div
          className="prose prose-sm max-w-none text-[#3A4A3F] leading-relaxed"
          style={{ fontFamily: FONT_FAMILY_SANS }}
          dangerouslySetInnerHTML={{ __html: processHtmlLinks(product.shortDescription) }}
        />
      </div>
    )}

    {/* Full Description */}
    {product?.fullDescription && product.fullDescription !== '<p></p>' && (
      <div>
        <h3
          className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#8B9D83]"
          style={{ fontFamily: FONT_FAMILY_SANS }}
        >
          Product Description
        </h3>
        <div
          className="prose prose-sm max-w-none text-[#3A4A3F]"
          dangerouslySetInnerHTML={{ __html: processHtmlLinks(product.fullDescription) }}
        />
      </div>
    )}

    {/* Fallback — nothing available */}
    {(!product?.shortDescription || product.shortDescription === '<p></p>') &&
      (!product?.fullDescription || product.fullDescription === '<p></p>') && (
        <p
          className="text-sm italic text-[#6B7280]"
          style={{ fontFamily: FONT_FAMILY_SANS }}
        >
          No description available.
        </p>
      )}
  </div>
)}

          {type === 'specifications' && (
            <div className="space-y-3">
              {specifications && specifications.length > 0 ? (
                specifications.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-xl border border-[#8B9D83]/20 bg-[#FDF7EF] p-3"
                  >
                    <item.icon className="h-5 w-5 shrink-0 text-[#8B9D83]" />
                    <div className="min-w-0">
                      <p
                        className="text-[10px] uppercase tracking-wide text-[#6B7280]"
                        style={{ fontFamily: FONT_FAMILY_SANS }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="truncate text-sm font-semibold text-[#2D1B2E]"
                        style={{ fontFamily: FONT_FAMILY_SANS }}
                      >
                        {item.value || 'N/A'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm italic text-[#6B7280]" style={{ fontFamily: FONT_FAMILY_SANS }}>
                  No specifications available.
                </p>
              )}
            </div>
          )}

          {type === 'delivery' && hasDeliveryInfo && (
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-[#8B9D83]" />
                <h3
                  className="text-base font-semibold text-[#2D1B2E]"
                  style={{ fontFamily: FONT_FAMILY_SERIF }}
                >
                  Delivery Information
                </h3>
              </div>

              <div
                className="prose prose-sm max-w-none text-sm leading-relaxed text-[#3A4A3F]"
                style={{ fontFamily: FONT_FAMILY_SANS }}
                dangerouslySetInnerHTML={{ __html: product.deliveryInfo }}
              />

              <div className="flex flex-wrap items-center gap-4 border-t border-[#8B9D83]/20 pt-4">
                <div className="flex items-center gap-1.5 text-xs text-[#3A4A3F]">
                  <RotateCcw className="h-4 w-4 text-[#8B9D83]" />
                  <span style={{ fontFamily: FONT_FAMILY_SANS }}>7 Days Return Policy</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#3A4A3F]">
                  <ShieldCheck className="h-4 w-4 text-[#8B9D83]" />
                  <span style={{ fontFamily: FONT_FAMILY_SANS }}>Safe &amp; Secure</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#3A4A3F]">
                  <Award className="h-4 w-4 text-[#8B9D83]" />
                  <span style={{ fontFamily: FONT_FAMILY_SANS }}>Genuine Products</span>
                </div>
              </div>
            </div>
          )}

          {type === 'faqs' && product?.faqs && product.faqs.length > 0 && (
            <div className="space-y-3">
              {product.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? 'border-[#8B9D83] shadow-md shadow-[#8B9D83]/10'
                        : 'border-[#8B9D83]/20 hover:border-[#8B9D83]/50'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-[#FDF7EF]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#8B9D83]/15 text-sm font-bold text-[#465641]">
                        {index + 1}
                      </span>
                      <span
                        className="flex-1 text-sm font-semibold text-[#2D1B2E] sm:text-base"
                        style={{ fontFamily: FONT_FAMILY_SANS }}
                      >
                        {faq.question}
                      </span>
                      <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-5 w-5 text-[#8B9D83]" />
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="border-t border-[#8B9D83]/20 px-5 pb-4 pt-3">
                        <p
                          className="text-sm leading-relaxed text-[#3A4A3F]"
                          style={{ fontFamily: FONT_FAMILY_SANS }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {type === 'reviews' && (
            <div>
              {reviewStats && reviewStats.totalReviews > 0 && (
                <div className="mb-5 flex flex-wrap items-center gap-4 border-b border-[#8B9D83]/20 pb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="text-3xl font-bold text-[#465641]"
                      style={{ fontFamily: FONT_FAMILY_SERIF }}
                    >
                      {reviewStats.averageRating.toFixed(1)}
                    </div>
                    <div>
                      {renderStarsForReview(Math.round(reviewStats.averageRating), 'large')}
                      <p
                        className="mt-0.5 text-xs text-[#3A4A3F]"
                        style={{ fontFamily: FONT_FAMILY_SANS }}
                      >
                        Based on all reviews
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#8B9D83]" />
                  <select
                    value={reviewFilter}
                    onChange={(e) => setReviewFilter(e.target.value)}
                    className="rounded-lg border border-[#8B9D83]/20 bg-white px-3 py-1.5 text-sm text-[#2D1B2E] outline-none focus:ring-2 focus:ring-[#8B9D83]"
                    style={{ fontFamily: FONT_FAMILY_SANS }}
                  >
                    <option value="all">All Reviews</option>
                    <option value="with_media">With Photos/Videos</option>
                  </select>
                  <select
                    value={reviewSort}
                    onChange={(e) => setReviewSort(e.target.value)}
                    className="rounded-lg border border-[#8B9D83]/20 bg-white px-3 py-1.5 text-sm text-[#2D1B2E] outline-none focus:ring-2 focus:ring-[#8B9D83]"
                    style={{ fontFamily: FONT_FAMILY_SANS }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>

                <button
                  onClick={onWriteReview}
                  disabled={!!userReview}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    userReview
                      ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                      : 'bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white hover:shadow-lg hover:shadow-[#8B9D83]/25'
                  }`}
                  style={{ fontFamily: FONT_FAMILY_SANS }}
                >
                  {userReview ? (
                    userReview.status === 'pending' ? (
                      <>
                        <Clock className="h-4 w-4" /> Pending
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" /> Reviewed
                      </>
                    )
                  ) : (
                    <>
                      <MessageSquare className="h-4 w-4" /> Write
                    </>
                  )}
                </button>
              </div>

              {loadingReviews ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-7 w-7 animate-spin text-[#8B9D83]" />
                </div>
              ) : reviews.length === 0 ? (
                <div className="rounded-xl bg-[#FDF7EF] py-10 text-center">
                  <MessageSquare className="mx-auto mb-2 h-12 w-12 text-[#8B9D83]/30" />
                  <p className="text-sm text-[#3A4A3F]" style={{ fontFamily: FONT_FAMILY_SANS }}>
                    No reviews yet
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {reviews.map((review) => (
                    <ReviewItem
                      key={review._id}
                      review={review}
                      isOwner={userReview?._id === review._id}
                    />
                  ))}
                </div>
              )}

              {reviewTotalPages > 1 && (
                <div className="mt-5 flex items-center justify-between border-t border-[#8B9D83]/20 pt-4">
                  <div className="text-xs text-[#3A4A3F]" style={{ fontFamily: FONT_FAMILY_SANS }}>
                    {((reviewPage - 1) * 5) + 1}–{Math.min(reviewPage * 5, reviewTotal)} of {reviewTotal}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReviewPage((prev) => Math.max(1, prev - 1))}
                      disabled={reviewPage === 1}
                      className="rounded-lg p-1.5 text-[#3A4A3F] transition-colors hover:bg-[#FDF7EF] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setReviewPage((prev) => Math.min(reviewTotalPages, prev + 1))}
                      disabled={reviewPage === reviewTotalPages}
                      className="rounded-lg p-1.5 text-[#3A4A3F] transition-colors hover:bg-[#FDF7EF] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ========== MAIN PRODUCT CLIENT ==========
export default function ProductClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [productIdentifier, setProductIdentifier] = useState(null);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomImageIndex, setZoomImageIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
  const [checkingCart, setCheckingCart] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselItemsPerView, setCarouselItemsPerView] = useState(6);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef(null);
  const [productsInCart, setProductsInCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [infoSidebar, setInfoSidebar] = useState(null);

  const [selectedVariants, setSelectedVariants] = useState([]);
  const [variantErrors, setVariantErrors] = useState([]);
  const [variantImages, setVariantImages] = useState(null);
  const [activeVariantDiscount, setActiveVariantDiscount] = useState(null);
  const [activeVariantPrice, setActiveVariantPrice] = useState(null);
  const [activeVariantRegularPrice, setActiveVariantRegularPrice] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewTotalPages, setReviewTotalPages] = useState(1);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [reviewSort, setReviewSort] = useState('newest');
  const [userReview, setUserReview] = useState(null);
  const [checkingUserReview, setCheckingUserReview] = useState(false);

  const [singleQuantity, setSingleQuantity] = useState(1);

  const galleryRef = useRef(null);
  const variantContainerRef = useRef(null);

  const [clearPreviewTrigger, setClearPreviewTrigger] = useState(false);
  const [previewCleared, setPreviewCleared] = useState(false);

  const openCartSidebar = () => setIsCartOpen(true);
  const closeCartSidebar = () => setIsCartOpen(false);

  const checkCartStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      else { setIsInCart(false); setCheckingCart(false); return; }
      if (!product || !product._id) { setCheckingCart(false); return; }
      const response = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
      const data = await response.json();
      if (data.success) setIsInCart(data.data.inCart || false);
      else setIsInCart(false);
    } catch (error) {
      console.error('Error checking cart status:', error);
      setIsInCart(false);
    } finally {
      setCheckingCart(false);
    }
  };

  const fetchReviews = async (page = 1) => {
    if (!product?._id) return;
    setLoadingReviews(true);
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const params = new URLSearchParams({
        productId: product._id,
        page: page,
        limit: 5,
        status: 'approved'
      });
      if (reviewSort === 'newest') params.append('sort', '-createdAt');
      else if (reviewSort === 'oldest') params.append('sort', 'createdAt');
      else if (reviewSort === 'highest') params.append('sort', '-rating');
      else if (reviewSort === 'lowest') params.append('sort', 'rating');
      if (token) params.append('includeUserPending', 'true');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?${params}`, { headers });
      const data = await response.json();
      if (data.success) {
        let reviewData = data.data || [];
        if (reviewFilter === 'with_media') {
          reviewData = reviewData.filter(r => (r.images && r.images.length > 0) || (r.video && r.video.url));
        }
        reviewData.sort((a, b) => {
          if (a.status === 'pending' && b.status !== 'pending') return -1;
          if (a.status !== 'pending' && b.status === 'pending') return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setReviews(reviewData);
        setReviewStats(data.stats || null);
        setReviewTotal(data.pagination?.total || 0);
        setReviewTotalPages(data.pagination?.pages || 1);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const checkUserReview = async () => {
    const token = localStorage.getItem('token');
    if (!token || !product?._id) return;
    setCheckingUserReview(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?productId=${product._id}&userId=me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success && data.data.length > 0) setUserReview(data.data[0]);
      else setUserReview(null);
    } catch (error) {
      console.error('Error checking user review:', error);
    } finally {
      setCheckingUserReview(false);
    }
  };

  const handleVariantSelect = (variantType, variant, updatedSelected) => {
    if (!updatedSelected) return;
    const variantId = updatedSelected.variantId;
    const existingIndex = selectedVariants.findIndex(sv => sv.variantId === variantId);
    let updatedVariants;
    if (existingIndex >= 0) {
      updatedVariants = [...selectedVariants];
      updatedVariants[existingIndex] = { ...updatedVariants[existingIndex], ...updatedSelected };
    } else {
      updatedVariants = [...selectedVariants, updatedSelected];
    }
    setSelectedVariants(updatedVariants);
    setVariantErrors([]);
  };

  const handleVariantQuantityChange = (variantId, newQuantity) => {
    setSelectedVariants(prev =>
      prev.map(sv =>
        sv.variantId === variantId
          ? { ...sv, quantity: Math.max(1, Math.min(newQuantity, sv.stockQuantity || 999)) }
          : sv
      )
    );
  };

  const handleVariantRemove = (variantId) => {
    setSelectedVariants(prev => prev.filter(sv => sv.variantId !== variantId));
    if (selectedVariants.length <= 1) {
      setVariantImages(null);
      setActiveVariantDiscount(null);
      setActiveVariantPrice(null);
      setActiveVariantRegularPrice(null);
    }
  };

  const handleVariantImageSelect = (images, variantInfo = null) => {
    if (images && images.length > 0) setVariantImages(images);
    else setVariantImages(null);

    if (variantInfo) {
      const regular = variantInfo.regularPrice || 0;
      const discount = variantInfo.discountPrice || 0;
      setActiveVariantRegularPrice(regular);
      if (discount > 0 && discount < regular) {
        const pct = Math.round(((regular - discount) / regular) * 100);
        setActiveVariantDiscount(pct);
        setActiveVariantPrice(discount);
      } else {
        setActiveVariantDiscount(null);
        setActiveVariantPrice(null);
      }
    } else {
      setActiveVariantDiscount(null);
      setActiveVariantPrice(null);
      setActiveVariantRegularPrice(null);
    }
    setActiveImageIndex(0);
  };

  const getCurrentImages = () => {
    if (variantImages && variantImages.length > 0) {
      return variantImages.map(url => ({ url }));
    }
    return product?.images || [];
  };

  const getAllImagesWithVariants = () => {
    const imageMap = new Map();
    (product?.images || []).forEach(img => {
      const url = typeof img === 'string' ? img : img?.url;
      if (url && !imageMap.has(url)) imageMap.set(url, { url, source: 'product' });
    });
    if (product?.variantTypes) {
      product.variantTypes.forEach(vt => {
        (vt.variants || []).forEach(variant => {
          const variantImgs = [...(variant.imagePreviews || []), ...(variant.images || [])].filter(Boolean);
          variantImgs.forEach(img => {
            const url = typeof img === 'string' ? img : img?.url;
            if (url && !imageMap.has(url)) imageMap.set(url, { url, source: 'variant' });
          });
          (variant.subVariants || []).forEach(sub => {
            const subImgs = [...(sub.imagePreviews || []), ...(sub.images || [])].filter(Boolean);
            subImgs.forEach(img => {
              const url = typeof img === 'string' ? img : img?.url;
              if (url && !imageMap.has(url)) imageMap.set(url, { url, source: 'subVariant' });
            });
          });
        });
      });
    }
    return Array.from(imageMap.values());
  };

  const getTotalVariantQuantity = () => {
    return selectedVariants.reduce((sum, sv) => {
      if (sv.subVariants && sv.subVariants.length > 0) {
        const subTotal = sv.subVariants.reduce((s, sub) => s + (sub.quantity || 0), 0);
        return sum + subTotal;
      }
      return sum + (sv.quantity || 0);
    }, 0);
  };

  const getTotalVariantPrice = () => {
    return selectedVariants.reduce((sum, sv) => {
      if (sv.subVariants && sv.subVariants.length > 0) {
        const subTotal = sv.subVariants.reduce((s, sub) => {
          const subPrice = sub.discountPrice > 0 && sub.discountPrice < sub.regularPrice ? sub.discountPrice : sub.regularPrice;
          return s + (subPrice * (sub.quantity || 0));
        }, 0);
        return sum + subTotal;
      }
      const price = sv.discountPrice > 0 && sv.discountPrice < sv.regularPrice ? sv.discountPrice : sv.regularPrice;
      return sum + (price * (sv.quantity || 0));
    }, 0);
  };

  const hasVariantSelections = () => selectedVariants.length > 0;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (variantContainerRef.current && !variantContainerRef.current.contains(event.target)) {
        setVariantImages(null);
        setActiveVariantDiscount(null);
        setActiveVariantPrice(null);
        setActiveVariantRegularPrice(null);
        setActiveImageIndex(0);
        setClearPreviewTrigger(prev => !prev);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let id = searchParams.get('id');
    if (!id) {
      const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      const segments = cleanPath.split('/');
      if (segments[0] === 'product' && segments[1]) id = segments[1];
    }
    if (id && id !== productIdentifier) setProductIdentifier(id);
  }, [searchParams, pathname]);

  useEffect(() => {
    if (productIdentifier) fetchProductDetails();
  }, [productIdentifier]);

  useEffect(() => {
    if (product?.videoUrl && product?.videoType !== 'youtube' && !videoThumbnail && !generatingThumbnail) {
      setGeneratingThumbnail(true);
      generateVideoThumbnail(product.videoUrl, (thumbnail) => {
        if (thumbnail) setVideoThumbnail(thumbnail);
        setGeneratingThumbnail(false);
      });
    }
  }, [product?.videoUrl, product?.videoType]);

  useEffect(() => {
    if (product && product._id) {
      checkCartStatus();
      checkUserReview();
    }
  }, [product]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (product && product._id) { setCheckingCart(true); checkCartStatus(); }
    };
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [product]);

  useEffect(() => {
    const handleAuthChange = () => {
      if (product && product._id) {
        setIsInCart(false);
        setCheckingCart(true);
        setTimeout(() => { checkCartStatus(); checkUserReview(); }, 100);
      }
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, [product]);

  useEffect(() => {
    const handleFocus = () => {
      if (product && product._id) checkCartStatus();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [product]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCarouselItemsPerView(2);
      else if (window.innerWidth < 768) setCarouselItemsPerView(2);
      else if (window.innerWidth < 1024) setCarouselItemsPerView(3);
      else setCarouselItemsPerView(6);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isAutoScrolling && relatedProducts.length > carouselItemsPerView) {
      autoScrollIntervalRef.current = setInterval(() => {
        setCarouselIndex((prev) => {
          const totalSlides = Math.ceil(relatedProducts.length / carouselItemsPerView);
          if (prev >= totalSlides - 1) return 0;
          return prev + 1;
        });
      }, 5000);
    }
    return () => {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    };
  }, [isAutoScrolling, relatedProducts.length, carouselItemsPerView]);

  useEffect(() => {
    const refreshRelatedProductsStatus = async () => {
      if (relatedProducts.length === 0) return;
      const productIds = relatedProducts.map(p => p._id);
      const token = localStorage.getItem('token');
      const cartSessionId = localStorage.getItem('cartSessionId');
      const cartHeaders = {};
      if (token) cartHeaders['Authorization'] = `Bearer ${token}`;
      else if (cartSessionId) cartHeaders['x-session-id'] = cartSessionId;
      try {
        const cartResponse = await fetch('http://localhost:5000/api/cart/check-status', {
          method: 'POST',
          headers: { ...cartHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        const cartData = await cartResponse.json();
        if (cartData.success) setProductsInCart(cartData.data);
      } catch (error) {
        console.error('Error refreshing cart status:', error);
      }
    };
    refreshRelatedProductsStatus();
    const handleCartUpdate = () => refreshRelatedProductsStatus();
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [relatedProducts]);

  useEffect(() => {
    if (product?._id && infoSidebar === 'reviews') {
      fetchReviews(reviewPage);
    }
  }, [product?._id, infoSidebar, reviewPage, reviewFilter, reviewSort]);

  const fetchProductDetails = async () => {
    if (!productIdentifier) {
      toast.error('Product not found');
      router.push('/products');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${encodeURIComponent(productIdentifier)}`);
      const data = await response.json();
      if (data.success) {
        const productData = data.data.product;
        setProduct(productData);
        setRelatedProducts(data.data.relatedProducts || []);
        if (productData.slug) {
          const currentPath = window.location.pathname;
          const normalizedCurrentPath = currentPath.replace(/\/+$/, '');
          const expectedPath = `/product/${productData.slug}`;
          if (normalizedCurrentPath !== expectedPath) {
            window.history.replaceState({}, '', expectedPath);
          }
        }
        if (productData.hasVariants && productData.variantTypes) setSelectedVariants([]);
      } else {
        toast.error('Product not found');
        router.push('/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const hasVariants = product?.hasVariants && product?.variantTypes && product.variantTypes.length > 0;

    if (hasVariants) {
      if (!hasVariantSelections()) {
        toast.error('Please select at least one variant before adding to cart');
        return;
      }
      for (const sv of selectedVariants) {
        if (sv.subVariants && sv.subVariants.length > 0) {
          for (const sub of sv.subVariants) {
            if (sub.quantity > sub.stockQuantity) {
              toast.error(`Not enough stock for ${sub.name}. Available: ${sub.stockQuantity}`);
              return;
            }
          }
        } else {
          if (sv.quantity > sv.stockQuantity) {
            toast.error(`Not enough stock for ${sv.variantName}. Available: ${sv.stockQuantity}`);
            return;
          }
        }
      }
    }

    if (product.stockQuantity <= 0 && !hasVariants) {
      toast.error('Out of stock');
      return;
    }

    setAddingToCart(true);
    const toastId = toast.loading('Adding items to cart...');

    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      let successCount = 0;
      let errorCount = 0;
      let lastResponseData = null;

      if (!hasVariants) {
        const finalQuantity = singleQuantity === '' || singleQuantity === null ? 1 : singleQuantity;
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers,
          body: JSON.stringify({ productId: product._id, quantity: finalQuantity, selectedColor: null })
        });
        const data = await response.json();
        lastResponseData = data;
        if (data.success) successCount++;
        else errorCount++;
      } else {
        for (const sv of selectedVariants) {
          if (sv.subVariants && sv.subVariants.length > 0) {
            for (const sub of sv.subVariants) {
              let actualVariantName = sv.variantName || sv.name || 'Variant';
              if (product.variantTypes) {
                for (const vt of product.variantTypes) {
                  for (const v of vt.variants || []) {
                    if (v.id === sv.variantId || v._id?.toString() === sv.variantId) {
                      actualVariantName = v.name || actualVariantName;
                      break;
                    }
                  }
                }
              }
              const subResponse = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                  productId: product._id,
                  quantity: sub.quantity || 1,
                  variantId: sv.variantId,
                  variantName: actualVariantName,
                  variantType: sv.variantType || sv.type || 'default',
                  subVariantId: sub.id || sub._id,
                  subVariantName: sub.name || 'Sub-Variant',
                  selectedColor: sub.color || sv.selectedColor || null,
                  variantRegularPrice: sub.regularPrice || sv.variantRegularPrice || 0,
                  variantDiscountPrice: sub.discountPrice || sv.variantDiscountPrice || 0,
                  image: sub.images?.[0] || sub.subVariantImages?.[0] || sv.variantImages?.[0] || null,
                  variantImage: sub.images?.[0] || sub.subVariantImages?.[0] || sv.variantImages?.[0] || null
                })
              });
              const subData = await subResponse.json();
              if (subData.success) {
                successCount++;
                if (subData.sessionId && !token) localStorage.setItem('cartSessionId', subData.sessionId);
              } else {
                errorCount++;
              }
            }
          } else {
            let actualVariantName = sv.variantName || sv.name || 'Variant';
            if (product.variantTypes) {
              for (const vt of product.variantTypes) {
                for (const v of vt.variants || []) {
                  if (v.id === sv.variantId || v._id?.toString() === sv.variantId) {
                    actualVariantName = v.name || actualVariantName;
                    break;
                  }
                }
              }
            }
            const response = await fetch('http://localhost:5000/api/cart', {
              method: 'POST',
              headers,
              body: JSON.stringify({
                productId: product._id,
                quantity: sv.quantity || 1,
                variantId: sv.variantId,
                variantName: actualVariantName,
                variantType: sv.variantType || sv.type || 'default',
                selectedColor: sv.selectedColor || null,
                variantRegularPrice: sv.variantRegularPrice || sv.regularPrice || 0,
                variantDiscountPrice: sv.variantDiscountPrice || sv.discountPrice || 0,
                image: sv.variantImages?.[0] || null,
                variantImage: sv.variantImages?.[0] || null
              })
            });
            const data = await response.json();
            lastResponseData = data;
            if (data.success) {
              successCount++;
              if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
            } else {
              errorCount++;
            }
          }
        }
      }

      if (successCount > 0) {
        if (lastResponseData?.sessionId && !token) {
          localStorage.setItem('cartSessionId', lastResponseData.sessionId);
        }
        setIsInCart(true);
        toast.success(`${successCount} item(s) added to cart!`, { id: toastId });
        window.dispatchEvent(new Event('cart-update'));
        setTimeout(() => window.dispatchEvent(new Event('cart-update')), 500);

        if (hasVariants) {
          setSelectedVariants([]);
          setVariantImages(null);
          setActiveVariantDiscount(null);
          setActiveVariantPrice(null);
          setActiveVariantRegularPrice(null);
        } else {
          setSingleQuantity(1);
        }
      } else {
        toast.error('Failed to add items to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error', { id: toastId });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    const hasVariants = product?.hasVariants && product?.variantTypes && product.variantTypes.length > 0;

    if (hasVariants) {
      if (!hasVariantSelections()) {
        toast.error('Please select at least one variant before proceeding');
        return;
      }
      for (const sv of selectedVariants) {
        if (sv.subVariants && sv.subVariants.length > 0) {
          for (const sub of sv.subVariants) {
            if (sub.quantity > sub.stockQuantity) {
              toast.error(`Not enough stock for ${sub.name}. Available: ${sub.stockQuantity}`);
              return;
            }
          }
        } else {
          if (sv.quantity > sv.stockQuantity) {
            toast.error(`Not enough stock for ${sv.variantName}. Available: ${sv.stockQuantity}`);
            return;
          }
        }
      }
    }

    if (product.stockQuantity <= 0 && !hasVariants) {
      toast.error('Out of stock');
      return;
    }

    setAddingToCart(true);
    const toastId = toast.loading('Processing...');

    try {
      const token = localStorage.getItem('token');
      let sessionId = localStorage.getItem('cartSessionId');
      if (!token && !sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('cartSessionId', sessionId);
      }
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      let successCount = 0;
      let lastResponseData = null;

      if (!hasVariants) {
        const finalQuantity = singleQuantity === '' || singleQuantity === null ? 1 : singleQuantity;
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers,
          body: JSON.stringify({ productId: product._id, quantity: finalQuantity, selectedColor: null })
        });
        const data = await response.json();
        lastResponseData = data;
        if (data.success) {
          successCount++;
          if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
        }
      } else {
        for (const sv of selectedVariants) {
          if (sv.subVariants && sv.subVariants.length > 0) {
            for (const sub of sv.subVariants) {
              let actualVariantName = sv.variantName || sv.name || 'Variant';
              if (product.variantTypes) {
                for (const vt of product.variantTypes) {
                  for (const v of vt.variants || []) {
                    if (v.id === sv.variantId || v._id?.toString() === sv.variantId) {
                      actualVariantName = v.name || actualVariantName;
                      break;
                    }
                  }
                }
              }
              const subResponse = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                  productId: product._id,
                  quantity: sub.quantity || 1,
                  variantId: sv.variantId,
                  variantName: actualVariantName,
                  variantType: sv.variantType || sv.type || 'default',
                  subVariantId: sub.id || sub._id,
                  subVariantName: sub.name || 'Sub-Variant',
                  selectedColor: sub.color || sv.selectedColor || null,
                  variantRegularPrice: sub.regularPrice || sv.variantRegularPrice || 0,
                  variantDiscountPrice: sub.discountPrice || sv.variantDiscountPrice || 0,
                  image: sub.images?.[0] || sub.subVariantImages?.[0] || sv.variantImages?.[0] || null,
                  variantImage: sub.images?.[0] || sub.subVariantImages?.[0] || sv.variantImages?.[0] || null
                })
              });
              const subData = await subResponse.json();
              if (subData.success) successCount++;
            }
          } else {
            let actualVariantName = sv.variantName || sv.name || 'Variant';
            if (product.variantTypes) {
              for (const vt of product.variantTypes) {
                for (const v of vt.variants || []) {
                  if (v.id === sv.variantId || v._id?.toString() === sv.variantId) {
                    actualVariantName = v.name || actualVariantName;
                    break;
                  }
                }
              }
            }
            const response = await fetch('http://localhost:5000/api/cart', {
              method: 'POST',
              headers,
              body: JSON.stringify({
                productId: product._id,
                quantity: sv.quantity || 1,
                variantId: sv.variantId,
                variantName: actualVariantName,
                variantType: sv.variantType || sv.type || 'default',
                selectedColor: sv.selectedColor || null,
                variantRegularPrice: sv.variantRegularPrice || sv.regularPrice || 0,
                variantDiscountPrice: sv.variantDiscountPrice || sv.discountPrice || 0,
                image: sv.variantImages?.[0] || null,
                variantImage: sv.variantImages?.[0] || null
              })
            });
            const data = await response.json();
            lastResponseData = data;
            if (data.success) {
              successCount++;
              if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
            }
          }
        }
      }

      if (successCount > 0) {
        setIsInCart(true);
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Redirecting to checkout...', { id: toastId });
        setTimeout(() => router.push('/checkout'), 500);
      } else {
        toast.error(lastResponseData?.error || 'Failed to process', { id: toastId });
      }
    } catch (error) {
      console.error('Buy now error:', error);
      toast.error('Network error', { id: toastId });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddOnToCart = async (addOn) => {
    const id = addOn.productId?._id || addOn.productId;
    const toastId = toast.loading(`Adding ${addOn.productName} to cart...`);
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId: id, quantity: 1 })
      });
      const data = await response.json();
      if (data.success) {
        if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
        toast.success(`${addOn.productName} added to cart!`, { id: toastId });
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to add to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error. Please try again.', { id: toastId });
    }
  };

  const renderStarsForReview = (rating, size = 'small') => {
    const starSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${star <= rating ? 'fill-[#8B9D83] text-[#8B9D83]' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  const handleCarouselInteraction = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const handlePrevSlide = () => {
    handleCarouselInteraction();
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    handleCarouselInteraction();
    const totalSlides = Math.ceil(relatedProducts.length / carouselItemsPerView);
    setCarouselIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  if (!productIdentifier) {
    return (
      <div className="min-h-screen bg-[#FDF7EF] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-[#8B9D83]/40 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#2D1B2E] mb-2">Product Not Found</h2>
          <p className="text-[#4B5563] mb-4">The product you are looking for does not exist.</p>
          <Link href="/products" className="inline-block px-6 py-2 bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <ProductSkeleton />;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDF7EF] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-[#8B9D83]/40 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#2D1B2E] mb-2">Product Not Found</h2>
          <p className="text-[#4B5563] mb-4">The product you are looking for does not exist.</p>
          <Link href="/products" className="inline-block px-6 py-2 bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const baseDiscountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
  const discountPercent = activeVariantDiscount !== null ? activeVariantDiscount : baseDiscountPercent;
  const baseCurrentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const currentPrice = activeVariantPrice !== null ? activeVariantPrice : baseCurrentPrice;
  const displayRegularPrice = activeVariantRegularPrice !== null ? activeVariantRegularPrice : product.regularPrice;

  const stockStatus = getStockStatus(product.stockQuantity, product.stockAlertQuantity);
  const StockIcon = stockStatus.icon;

  const currentImages = getCurrentImages();
  const allImagesWithVariants = getAllImagesWithVariants();
  const productImages = (variantImages && variantImages.length > 0) ? currentImages : allImagesWithVariants;

  const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';
  const mediaItems = [...productImages];
  if (hasVideo) mediaItems.push({ type: 'video', url: product.videoUrl, videoType: product.videoType });
  const mainMedia = mediaItems[activeImageIndex];
  const isMainVideo = mainMedia?.type === 'video';
  const mainImage = !isMainVideo ? mainMedia?.url : null;
  const mainVideoUrl = isMainVideo ? mainMedia?.url : null;
  const mainVideoType = isMainVideo ? mainMedia?.videoType : null;

  const categoryHierarchy = [];
  if (product.categoryName) categoryHierarchy.push(product.categoryName);
  if (product.subcategoryName) categoryHierarchy.push(product.subcategoryName);
  if (product.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

  const hasDeliveryInfo = product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '';

  const specifications = [
    { label: 'Brand', value: product.brand, icon: Building2 },
    { label: 'SKU', value: product.skuCode, icon: Package },
    { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
    { label: 'Category', value: product.categoryName, icon: FolderTree },
    { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
    { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
  ].filter(item => item.value);

  if (product.additionalInfo && product.additionalInfo.length > 0) {
    product.additionalInfo.forEach(info => {
      if (info.fieldName && info.fieldValue) {
        specifications.push({ label: info.fieldName, value: info.fieldValue, icon: Info });
      }
    });
  }

  const hasVariants = product.hasVariants && product.variantTypes && product.variantTypes.length > 0;
  const totalVariantQuantity = getTotalVariantQuantity();
  const totalVariantPrice = getTotalVariantPrice();

  const accordionItems = [
    { key: 'description', label: 'Product Description' },
    { key: 'specifications', label: 'Specifications' },
    ...(hasDeliveryInfo ? [{ key: 'delivery', label: 'Delivery Information' }] : []),
    ...(product.faqs && product.faqs.length > 0 ? [{ key: 'faqs', label: 'FAQs' }] : []),
    { key: 'reviews', label: 'Reviews' },
  ];

  return (
    <>
      {product && <MetadataUpdater product={product} />}
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8 max-w-7xl">
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 md:mb-6 overflow-x-auto pb-2">
            <Link href="/" className="text-[#3A4A3F] hover:text-[#465641] transition whitespace-nowrap font-medium" style={{ fontFamily: FONT_FAMILY_SANS }}>Home</Link>
            <span className="text-[#8B9D83]/50">/</span>
            <Link href="/products" className="text-[#3A4A3F] hover:text-[#465641] transition whitespace-nowrap font-medium" style={{ fontFamily: FONT_FAMILY_SANS }}>Products</Link>
            {categoryHierarchy.map((cat, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[#8B9D83]/50">/</span>
                <span className="text-[#3A4A3F] truncate max-w-[100px] sm:max-w-none" style={{ fontFamily: FONT_FAMILY_SANS }}>{cat}</span>
              </React.Fragment>
            ))}
            <span className="text-[#8B9D83]/50">/</span>
            <span className="text-[#465641] font-semibold truncate max-w-[150px] sm:max-w-none" style={{ fontFamily: FONT_FAMILY_SANS }}>{product.productName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
            <div className="lg:col-span-3" ref={galleryRef}>
              <div className="sticky top-20 lg:top-24">
                <div className="relative bg-white rounded-2xl border border-[#8B9D83]/20 overflow-hidden shadow-[0_2px_9px_rgba(139,157,131,0.08)]">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-2 sm:p-3">
                    <div className="flex sm:flex-col gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[450px] order-2 sm:order-1 flex-shrink-0 sm:w-16 md:w-20">
                      {productImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (activeImageIndex !== idx) {
                              setActiveImageIndex(idx);
                              setImageLoaded(prev => ({ ...prev, [idx]: false }));
                              setIsZoomed(false);
                            }
                          }}
                          onMouseEnter={() => {
                            preloadImage(img.url);
                            if (activeImageIndex !== idx) {
                              setActiveImageIndex(idx);
                              setImageLoaded(prev => ({ ...prev, [idx]: false }));
                              setIsZoomed(false);
                            }
                          }}
                          className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            activeImageIndex === idx
                              ? 'border-[#8B9D83] shadow-[0_0_0_2px_rgba(139,157,131,0.25)] sm:shadow-[0_0_0_3px_rgba(139,157,131,0.25)]'
                              : 'border-[#8B9D83]/20 hover:border-[#8B9D83]/50'
                          }`}
                        >
                          <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        </button>
                      ))}
                      {hasVideo && (
                        <button
                          onClick={() => {
                            if (activeImageIndex !== productImages.length) {
                              setActiveImageIndex(productImages.length);
                              setIsZoomed(false);
                            }
                          }}
                          className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                            activeImageIndex === productImages.length
                              ? 'border-[#8B9D83] shadow-[0_0_0_2px_rgba(139,157,131,0.25)] sm:shadow-[0_0_0_3px_rgba(139,157,131,0.25)]'
                              : 'border-[#8B9D83]/20 hover:border-[#8B9D83]/50'
                          }`}
                        >
                          {product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl) ? (
                            <img src={getYouTubeThumbnail(product.videoUrl)} alt="Video thumbnail" className="w-full h-full object-cover" />
                          ) : product.videoType !== 'youtube' && videoThumbnail ? (
                            <img src={videoThumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
                          ) : null}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        </button>
                      )}
                    </div>

                    <div className="flex-1 order-1 sm:order-2 relative">
                      <div
                        className="relative bg-[#FDF7EF] rounded-xl overflow-hidden border border-[#8B9D83]/20 shadow-sm w-full"
                        style={{ height: 'auto', minHeight: '450px' }}
                        onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        onMouseMove={(e) => {
                          if (!isZoomed || isMainVideo || isMobile) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 100;
                          const y = ((e.clientY - rect.top) / rect.height) * 100;
                          setZoomPosition({ x: Math.min(Math.max(x, 0), 100), y: Math.min(Math.max(y, 0), 100) });
                        }}
                      >
                        <div className="relative w-full h-full min-h-[400px] sm:min-h-[450px] flex items-center justify-center">
                          {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8B9D83]/10 to-[#FDF7EF] animate-pulse z-10" />
                          )}
                          <div className="absolute inset-0 w-full h-full overflow-hidden">
                            {!isMainVideo && mainImage ? (
                              <>
                                <img
                                  key={activeImageIndex}
                                  src={mainImage}
                                  alt={product.productName}
                                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                                    imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
                                  }`}
                                  style={{
                                    transform: isZoomed && !isMobile ? 'scale(1.8)' : 'scale(1)',
                                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                    transition: 'transform 0.15s ease-out'
                                  }}
                                  onLoad={() => {
                                    setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
                                    setTimeout(() => setIsTransitioning(false), 100);
                                  }}
                                  loading={activeImageIndex === 0 ? "eager" : "lazy"}
                                  fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
                                  decoding="async"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
                                    setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
                                  }}
                                />
                                {isZoomed && !isMobile && !isMainVideo && (
                                  <div className="absolute inset-0 bg-[#FDF7EF]/30 backdrop-blur-[1px] pointer-events-none z-10" />
                                )}
                              </>
                            ) : isMainVideo && mainVideoUrl && (
                              mainVideoType === 'youtube' ? (
                                <iframe src={mainVideoUrl} className="w-full h-full aspect-square" allowFullScreen title="Product Video" />
                              ) : (
                                <video src={mainVideoUrl} controls className="w-full h-full object-contain bg-white" />
                              )
                            )}
                          </div>
                        </div>

                        {!isMainVideo && !isMobile && !isZoomed && (
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none z-20">
                            <div className="bg-white/80 backdrop-blur-sm text-[#2D1B2E] text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 hover:opacity-100 transition-opacity shadow-lg border border-[#8B9D83]/20">
                              <ZoomIn className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#8B9D83]" />
                              <span className="hidden xs:inline font-medium">Hover to zoom</span>
                            </div>
                          </div>
                        )}

                        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex gap-1 sm:gap-2 z-30">
                          {!isMainVideo && (
                            <button
                              onClick={() => {
                                const currentUrl = isMainVideo ? null : mainImage;
                                if (currentUrl) {
                                  const idx = allImagesWithVariants.findIndex(img => img.url === currentUrl);
                                  setZoomImageIndex(idx >= 0 ? idx : 0);
                                } else {
                                  setZoomImageIndex(0);
                                }
                                setShowZoom(true);
                              }}
                              className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
                              aria-label="View fullscreen"
                            >
                              <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#8B9D83]" />
                            </button>
                          )}
                        </div>

                        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full z-30">
                          {activeImageIndex + 1} / {productImages.length}
                        </div>
                      </div>

                      {discountPercent > 0 && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 z-40">
                          <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
                          {discountPercent}% OFF
                        </div>
                      )}
                      {product.tags?.[0] && (
                        <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getTagStyles(product.tags[0])} text-[7px] sm:text-[9px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 z-40`}>
                          <Sparkles className="w-2 h-2 sm:w-3 sm:h-3" />
                          {getTagName(product.tags[0])}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* right side */}
<div className="lg:col-span-4 bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-2xl ">
  {/* shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 */}
  {/* CATEGORY + BRAND PILLS */}
  {/* <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
    {categoryHierarchy.map((cat, idx) => (
      <span
        key={idx}
        className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-white text-[#465641] border border-gray-200"
        style={{ fontFamily: FONT_FAMILY_SANS }}
      >
        <FolderTree className="w-2 h-2 sm:w-3 sm:h-3" />
        {cat}
      </span>
    ))}
    {product.brand && (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-white text-[#465641] border border-gray-200">
        <Building2 className="w-2 h-2 sm:w-3 sm:h-3" />
        {product.brand}
      </span>
    )}
  </div> */}

  {/* TITLE */}
  <div className="mb-3 sm:mb-4">
    <h1
      className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D1B2E]"
      style={{ fontFamily: FONT_FAMILY_SANS }}
    >
      {product.productName}
    </h1>
  </div>

  {/* PRICE — NO BG, NO BORDER */}
  <div className=" pb-4 sm:pb-5 border-b border-gray-100">
    <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
      <span
        className="text-3xl sm:text-4xl md:text-4xl font-semibold text-[#2D1B2E] tracking-tight"
       
      >
        ৳{formatPrice(currentPrice)}
      </span>
      {discountPercent > 0 && (
        <>
          <span className="text-sm sm:text-base text-[#9CA3AF] line-through font-light">
            ৳{formatPrice(displayRegularPrice)}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-white bg-[#8B9D83] px-2 py-1 rounded-full tracking-wide uppercase">
            <Zap className="w-3 h-3" />
            Save {discountPercent}%
          </span>
        </>
      )}
    </div>
    {product.codAvailable && (
      <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-[#465641] text-xs sm:text-sm">
        <Truck className="w-3.5 h-3.5" />
        <span style={{ fontFamily: FONT_FAMILY_SANS }}>Cash on Delivery available</span>
      </div>
    )}
  </div>

  {/* SHORT DESCRIPTION — NO BG, NO BORDER */}
  {/* <div className="mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-gray-100">
    {product.shortDescription && product.shortDescription !== '<p></p>' ? (
      <div
        className="text-xs sm:text-sm text-[#3A4A3F] prose-short leading-relaxed"
        style={{ fontFamily: FONT_FAMILY_SANS }}
        dangerouslySetInnerHTML={{ __html: product.shortDescription }}
      />
    ) : (
      <p
        className="text-xs sm:text-sm text-[#6B7280] italic"
        style={{ fontFamily: FONT_FAMILY_SANS }}
      >
        No short description available.
      </p>
    )}
  </div> */}

  {/* VARIANTS */}
  {hasVariants && (
    <div className="space-y-4 mb-5" ref={variantContainerRef}>
      {product.variantTypes.map((vt, index) => (
        <VariantSelector
          key={vt.id || index}
          variantType={vt}
          variants={vt.variants || []}
          selectedVariants={selectedVariants.filter(sv => sv.variantType === vt.type)}
          onVariantSelect={handleVariantSelect}
          onVariantQuantityChange={handleVariantQuantityChange}
          onVariantRemove={handleVariantRemove}
          stockQuantity={product.stockQuantity}
          onVariantImageSelect={handleVariantImageSelect}
          clearPreviewTrigger={clearPreviewTrigger}
          onPreviewCleared={() => setPreviewCleared(true)}
        />
      ))}

      {selectedVariants.length > 0 && (
        <div className="p-3 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4
              className="text-sm font-semibold text-[#2D1B2E] flex items-center gap-1.5"
              style={{ fontFamily: FONT_FAMILY_SANS }}
            >
              <CheckCircle className="w-4 h-4 text-[#465641]" />
              Selected Items
            </h4>
            <span className="text-xs text-[#465641] font-semibold">
              Total: {totalVariantQuantity} items | ৳{formatPrice(totalVariantPrice)}
            </span>
          </div>
          <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
            {selectedVariants.map((sv, idx) => {
              if (sv.subVariants && sv.subVariants.length > 0) {
                return sv.subVariants.map((sub, subIdx) => {
                  const subId =
                    sub.id ||
                    sub._id ||
                    sub.subVariantId ||
                    String(sub.name).toLowerCase().replace(/\s+/g, '-');
                  const price =
                    sub.discountPrice > 0
                      ? Number(sub.discountPrice)
                      : Number(sub.regularPrice) || 0;
                  const originalPrice = Number(sub.regularPrice) || 0;
                  const hasDiscount =
                    sub.discountPrice > 0 && sub.discountPrice < sub.regularPrice;
                  const maxStock = sub.stockQuantity || 999;
                  const qty = Number(sub.quantity) || 1;
                  const subImage =
                    sub.subVariantImages?.[0] ||
                    sub.images?.[0] ||
                    sv.variantImages?.[0] ||
                    null;
                  const subColor = sub.color || null;

                  const applySubQty = (newQty) => {
                    const updatedSubVariants = sv.subVariants.map(s => {
                      const sId =
                        s.id ||
                        s._id ||
                        s.subVariantId ||
                        String(s.name).toLowerCase().replace(/\s+/g, '-');
                      return sId === subId ? { ...s, quantity: newQty } : s;
                    });
                    const updatedVariant = { ...sv, subVariants: updatedSubVariants };
                    const originalVariant = product.variantTypes
                      .flatMap(vt => vt.variants || [])
                      .find(v => {
                        const vId =
                          v.id ||
                          v._id ||
                          String(v.name).toLowerCase().replace(/\s+/g, '-');
                        return vId === sv.variantId;
                      });
                    if (originalVariant)
                      handleVariantSelect(sv.variantType, originalVariant, updatedVariant);
                  };

                  return (
                    <div
                      key={`${idx}-${subIdx}`}
                      className="flex items-center justify-between gap-2 text-xs p-2 bg-white border border-gray-100 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {subImage ? (
                          <img
                            src={subImage}
                            alt={sub.name}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-200 bg-white"
                          />
                        ) : subColor ? (
                          <div
                            className="w-10 h-10 rounded-lg border border-gray-200"
                            style={{ backgroundColor: subColor }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-300" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-medium text-[#2D1B2E] truncate">
                          {sv.variantName} - {sub.name}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <span className="text-[#465641] font-semibold">
                            ৳{formatPrice(price)}
                          </span>
                          {hasDiscount && (
                            <span className="text-[10px] text-gray-400 line-through">
                              ৳{formatPrice(originalPrice)}
                            </span>
                          )}
                          {hasDiscount && (
                            <span className="text-[9px] text-green-600 font-medium bg-green-50 px-1 py-0.5 rounded">
                              {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button
                            type="button"
                            onClick={() => applySubQty(Math.max(1, qty - 1))}
                            disabled={qty <= 1}
                            className="w-5 h-5 flex items-center justify-center text-[#465641] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={sub.quantity === '' ? '' : sub.quantity ?? 1}
                            onChange={e => {
                              const value = e.target.value;
                              if (value === '') {
                                applySubQty('');
                                return;
                              }
                              if (/^\d+$/.test(value)) {
                                const numValue = parseInt(value, 10);
                                if (numValue >= 1 && numValue <= maxStock)
                                  applySubQty(numValue);
                                else if (numValue > maxStock) applySubQty(maxStock);
                              }
                            }}
                            onBlur={() => {
                              if (
                                sub.quantity === '' ||
                                sub.quantity === null ||
                                sub.quantity === undefined
                              )
                                applySubQty(1);
                            }}
                            className="w-8 text-center text-xs font-medium text-[#2D1B2E] outline-none bg-transparent border-0"
                          />
                          <button
                            type="button"
                            onClick={() => applySubQty(Math.min(maxStock, qty + 1))}
                            disabled={qty >= maxStock}
                            className="w-5 h-5 flex items-center justify-center text-[#465641] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const updatedSubVariants = sv.subVariants.filter(s => {
                              const sId =
                                s.id ||
                                s._id ||
                                s.subVariantId ||
                                String(s.name).toLowerCase().replace(/\s+/g, '-');
                              return sId !== subId;
                            });
                            if (updatedSubVariants.length === 0) {
                              handleVariantRemove(sv.variantId);
                            } else {
                              const updatedVariant = {
                                ...sv,
                                subVariants: updatedSubVariants
                              };
                              const originalVariant = product.variantTypes
                                .flatMap(vt => vt.variants || [])
                                .find(v => {
                                  const vId =
                                    v.id ||
                                    v._id ||
                                    String(v.name).toLowerCase().replace(/\s+/g, '-');
                                  return vId === sv.variantId;
                                });
                              if (originalVariant)
                                handleVariantSelect(
                                  sv.variantType,
                                  originalVariant,
                                  updatedVariant
                                );
                            }
                          }}
                          className="text-red-500 hover:text-red-700 p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                });
              }

              const price =
                sv.discountPrice > 0
                  ? Number(sv.discountPrice)
                  : Number(sv.regularPrice) || 0;
              const originalPrice = Number(sv.regularPrice) || 0;
              const hasDiscount =
                sv.discountPrice > 0 && sv.discountPrice < sv.regularPrice;
              const maxStock = sv.stockQuantity || 999;
              const qty = Number(sv.quantity) || 1;
              const variantImage = sv.variantImages?.[0] || null;
              const variantColor = sv.selectedColor || null;

              const applyVariantQty = (newQty) => {
                const updatedVariant = { ...sv, quantity: newQty };
                const originalVariant = product.variantTypes
                  .flatMap(vt => vt.variants || [])
                  .find(v => {
                    const vId =
                      v.id ||
                      v._id ||
                      String(v.name).toLowerCase().replace(/\s+/g, '-');
                    return vId === sv.variantId;
                  });
                if (originalVariant)
                  handleVariantSelect(sv.variantType, originalVariant, updatedVariant);
              };

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 text-xs p-2 bg-white border border-gray-100 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    {variantImage ? (
                      <img
                        src={variantImage}
                        alt={sv.variantName}
                        className="w-10 h-10 rounded-lg object-cover border border-gray-200 bg-white"
                      />
                    ) : variantColor ? (
                      <div
                        className="w-10 h-10 rounded-lg border border-gray-200"
                        style={{ backgroundColor: variantColor }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        <Package className="w-5 h-5 text-gray-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium text-[#2D1B2E] truncate">
                      {sv.variantName}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <span className="text-[#465641] font-semibold">
                        ৳{formatPrice(price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-[10px] text-gray-400 line-through">
                          ৳{formatPrice(originalPrice)}
                        </span>
                      )}
                      {hasDiscount && (
                        <span className="text-[9px] text-green-600 font-medium bg-green-50 px-1 py-0.5 rounded">
                          {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => applyVariantQty(Math.max(1, qty - 1))}
                        disabled={qty <= 1}
                        className="w-5 h-5 flex items-center justify-center text-[#465641] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={sv.quantity === '' ? '' : sv.quantity ?? 1}
                        onChange={e => {
                          const value = e.target.value;
                          if (value === '') {
                            applyVariantQty('');
                            return;
                          }
                          if (/^\d+$/.test(value)) {
                            const numValue = parseInt(value, 10);
                            if (numValue >= 1 && numValue <= maxStock)
                              applyVariantQty(numValue);
                            else if (numValue > maxStock) applyVariantQty(maxStock);
                          }
                        }}
                        onBlur={() => {
                          if (
                            sv.quantity === '' ||
                            sv.quantity === null ||
                            sv.quantity === undefined
                          )
                            applyVariantQty(1);
                        }}
                        className="w-8 text-center text-xs font-medium text-[#2D1B2E] outline-none bg-transparent border-0"
                      />
                      <button
                        type="button"
                        onClick={() => applyVariantQty(Math.min(maxStock, qty + 1))}
                        disabled={qty >= maxStock}
                        className="w-5 h-5 flex items-center justify-center text-[#465641] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleVariantRemove(sv.variantId)}
                      className="text-red-500 hover:text-red-700 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  )}

  {/* SINGLE QUANTITY (NO VARIANTS) */}
  {!hasVariants && (
    <div className="mb-5">
      <label
        className="block text-xs font-medium text-[#2D1B2E] mb-2 uppercase tracking-wide"
        style={{ fontFamily: FONT_FAMILY_SANS }}
      >
        Quantity
      </label>
      <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden bg-white w-fit">
        <button
          onClick={() => setSingleQuantity(prev => Math.max(1, prev - 1))}
          disabled={singleQuantity <= 1}
          className="w-9 h-9 flex items-center justify-center text-[#3A4A3F] hover:bg-gray-50 disabled:opacity-50 transition"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <input
          type="text"
          value={singleQuantity === '' ? '' : singleQuantity}
          onChange={e => {
            const value = e.target.value;
            if (value === '') {
              setSingleQuantity('');
              return;
            }
            if (/^\d+$/.test(value)) {
              const numValue = parseInt(value);
              if (numValue >= 1 && numValue <= product.stockQuantity)
                setSingleQuantity(numValue);
            }
          }}
          onBlur={() => {
            if (singleQuantity === '' || singleQuantity === null) setSingleQuantity(1);
          }}
          className="w-14 text-center font-semibold text-[#2D1B2E] text-sm outline-none border-0"
        />
        <button
          onClick={() =>
            setSingleQuantity(prev => Math.min(product.stockQuantity, prev + 1))
          }
          disabled={singleQuantity >= product.stockQuantity}
          className="w-9 h-9 flex items-center justify-center text-[#3A4A3F] hover:bg-gray-50 disabled:opacity-50 transition"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
      <p
        className="text-[10px] text-[#6B7280] mt-1.5"
        style={{ fontFamily: FONT_FAMILY_SANS }}
      >
        {product.stockQuantity} items available
      </p>
    </div>
  )}

  {/* STOCK STATUS */}
  <div className="flex items-center gap-2 mb-4">
    <div
      className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium text-${stockStatus.color}-700 bg-${stockStatus.color}-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full`}
    >
      <StockIcon
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${stockStatus.color}-600`}
      />
      <span style={{ fontFamily: FONT_FAMILY_SANS }}>{stockStatus.label}</span>
      {stockStatus.label === 'Low Stock' && (
        <span className="text-[10px] sm:text-xs text-orange-600">
          (Only {product.stockQuantity} left)
        </span>
      )}
    </div>
    {hasVariants && selectedVariants.length > 0 && (
      <div
        className="text-xs text-[#3A4A3F] font-medium"
        style={{ fontFamily: FONT_FAMILY_SANS }}
      >
        Selected: {totalVariantQuantity} items
      </div>
    )}
  </div>

  {/* ACTION BUTTONS */}
  <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6">
    {isInCart ? (
      <button
        onClick={openCartSidebar}
        className="flex-1 py-3 px-3 sm:px-6 bg-gradient-to-r from-[#465641] to-[#2D1B2E] text-white font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm hover:shadow-lg"
        style={{ fontFamily: FONT_FAMILY_SANS }}
      >
        <ShoppingCart className="w-4 h-4" />
        View in Cart
      </button>
    ) : (
      <button
        onClick={handleAddToCart}
        disabled={
          addingToCart ||
          product.stockQuantity <= 0 ||
          (hasVariants && !hasVariantSelections())
        }
        className="flex-1 py-3 px-3 sm:px-6 bg-gradient-to-r from-[#8B9D83] to-[#465641] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#8B9D83]/30 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 text-xs sm:text-sm"
        style={{ fontFamily: FONT_FAMILY_SANS }}
      >
        {addingToCart ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ShoppingCart className="w-4 h-4" />
        )}
        {addingToCart
          ? 'Adding...'
          : hasVariants
          ? 'Add Selected Variants'
          : 'Add to Cart'}
      </button>
    )}

    <button
      onClick={handleBuyNow}
      disabled={
        addingToCart ||
        product.stockQuantity <= 0 ||
        (hasVariants && !hasVariantSelections())
      }
      className="flex-1 py-3 px-3 sm:px-6 bg-gradient-to-r from-[#C9A567] to-[#B8935A] hover:from-[#B8935A] hover:to-[#9E7D45] text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg hover:shadow-[#B8935A]/30 flex items-center justify-center gap-2 disabled:opacity-50 text-xs sm:text-sm"
      style={{ fontFamily: FONT_FAMILY_SANS }}
    >
      <Zap className="w-4 h-4" />
      Buy Now
    </button>
  </div>

  {/* ADD-ONS */}
  {product.addOnes && product.addOnes.length > 0 && (
    <AddOnsSection addOns={product.addOnes} onAddToCart={handleAddOnToCart} />
  )}

  {/* ACCORDION */}
  <div className="mt-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
    {accordionItems.map((item, idx) => (
      <button
        key={item.key}
        type="button"
        onClick={() => setInfoSidebar(item.key)}
        className={`group flex w-full items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 text-left transition-all hover:bg-gray-50 ${
          idx !== accordionItems.length - 1 ? 'border-b border-gray-200' : ''
        }`}
      >
        <span
          className="text-sm sm:text-[15px] font-semibold text-[#2D1B2E]"
          style={{ fontFamily: FONT_FAMILY_SANS }}
        >
          {item.label}
        </span>
        <ChevronRight
          size={20}
          strokeWidth={1.6}
          className="text-[#8B9D83] transition-transform duration-200 group-hover:translate-x-1"
        />
      </button>
    ))}
  </div>
</div>
        
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-8 sm:mt-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B9D83]" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY_SERIF }}>You May Also Like</h2>
                </div>
                {relatedProducts.length > carouselItemsPerView && (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button onClick={handlePrevSlide} disabled={carouselIndex === 0} className={`p-1.5 sm:p-2 rounded-full transition-all ${carouselIndex === 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border border-[#8B9D83]/20 text-[#8B9D83] hover:bg-[#8B9D83] hover:text-white hover:scale-110'}`}>
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onClick={handleNextSlide} disabled={carouselIndex >= Math.ceil(relatedProducts.length / carouselItemsPerView) - 1} className={`p-1.5 sm:p-2 rounded-full transition-all ${carouselIndex >= Math.ceil(relatedProducts.length / carouselItemsPerView) - 1 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border border-[#8B9D83]/20 text-[#8B9D83] hover:bg-[#8B9D83] hover:text-white hover:scale-110'}`}>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                )}
              </div>
              <div className="relative overflow-hidden">
                <div className="flex gap-2 sm:gap-3 md:gap-4">
                  {relatedProducts
                    .slice(carouselIndex * carouselItemsPerView, carouselIndex * carouselItemsPerView + carouselItemsPerView)
                    .map((relProduct) => (
                      <div key={relProduct._id} className="flex-shrink-0 flex-grow-0" style={{ width: `calc((100% - ${(carouselItemsPerView - 1) * 16}px) / ${carouselItemsPerView})` }}>
                        <RelatedProductCard product={relProduct} router={router} isInCart={productsInCart[relProduct._id] || false} onViewInCart={openCartSidebar} />
                      </div>
                    ))}
                </div>
              </div>
              {relatedProducts.length > carouselItemsPerView && (
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                  {Array.from({ length: Math.ceil(relatedProducts.length / carouselItemsPerView) }).map((_, idx) => {
                    const isActive = carouselIndex === idx;
                    return (
                      <button key={idx} onClick={() => { handleCarouselInteraction(); setCarouselIndex(idx); }} className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${isActive ? 'w-4 sm:w-6 bg-[#8B9D83]' : 'w-1.5 sm:w-2 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/50'}`} />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showZoom && (
          <ZoomModal
            images={allImagesWithVariants}
            currentIndex={zoomImageIndex}
            onClose={() => setShowZoom(false)}
            onImageChange={(index) => { setZoomImageIndex(index); }}
          />
        )}
      </AnimatePresence>

      <ProductInfoSidebar
        type={infoSidebar}
        onClose={() => setInfoSidebar(null)}
        product={product}
        specifications={specifications}
        hasDeliveryInfo={hasDeliveryInfo}
        reviews={reviews}
        reviewStats={reviewStats}
        loadingReviews={loadingReviews}
        reviewPage={reviewPage}
        reviewTotalPages={reviewTotalPages}
        reviewTotal={reviewTotal}
        reviewFilter={reviewFilter}
        reviewSort={reviewSort}
        setReviewFilter={setReviewFilter}
        setReviewSort={setReviewSort}
        setReviewPage={setReviewPage}
        onWriteReview={() => setIsReviewModalOpen(true)}
        userReview={userReview}
        renderStarsForReview={renderStarsForReview}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          if (infoSidebar === 'reviews') { fetchReviews(reviewPage); checkUserReview(); }
        }}
        productId={product._id}
        productName={product.productName}
        onReviewSubmitted={() => { fetchReviews(reviewPage); checkUserReview(); }}
      />

      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
      <Footer />

      <style jsx global>{`
        .prose { max-width: none; }
        .prose h1 {
          font-size: 1.5em; font-weight: 600; margin: 0.75em 0 0.5em;
          color: #2D1B2E; font-family: ${FONT_FAMILY_SANS};
        }
        .prose h2 {
          font-size: 1.3em; font-weight: 600; margin: 0.7em 0 0.4em;
          color: #2D1B2E; font-family: ${FONT_FAMILY_SANS};
        }
        .prose h3 {
          font-size: 1.1em; font-weight: 600; margin: 0.6em 0 0.3em;
          color: #2D1B2E; font-family: ${FONT_FAMILY_SANS};
        }
        .prose p {
          margin: 0.5em 0; line-height: 1.6; color: #3A4A3F;
          font-family: ${FONT_FAMILY_SANS};
        }
        .prose ul { list-style-type: disc; padding-left: 1.5em; margin: 0.5em 0; }
        .prose ol { list-style-type: decimal; padding-left: 1.5em; margin: 0.5em 0; }
        .prose li { margin: 0.2em 0; color: #3A4A3F; font-family: ${FONT_FAMILY_SANS}; }
        .prose a { color: #465641; text-decoration: underline; }
        .prose strong { font-weight: 600; color: #2D1B2E; }
        .prose em { font-style: italic; }
        .prose blockquote {
          border-left: 3px solid #8B9D83; padding-left: 1em;
          margin: 0.5em 0; color: #3A4A3F; font-style: italic;
        }
        .prose img { max-width: 100%; height: auto; border-radius: 0.5rem; }
        .prose table { width: 100%; border-collapse: collapse; margin: 1em 0; }
        .prose th, .prose td {
          border: 1px solid #E5E7EB; padding: 0.5em; text-align: left;
        }
        .prose th { background-color: #FDF7EF; font-weight: 600; color: #2D1B2E; }
        .scrollbar-thin::-webkit-scrollbar { height: 2px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #8B9D83; border-radius: 10px; }
        .scrollbar-thin::-webkit-scrollbar { width: 3px; height: 3px; }
      `}</style>
    </>
  );
}