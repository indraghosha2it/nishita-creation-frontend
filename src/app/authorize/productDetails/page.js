
// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
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
//   ImageIcon,
//   Palette,
//   Play,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Gift,
//   Sparkles,
//   Users,
//   Package,
//   Tag,
//   Clock,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Mail,
//   Copy,
//   Check,
//   Loader2,
//   Eye,
//   MessageCircle,
//   FolderTree,
//   Maximize2,
//   Zap,
//   Edit,
//   Trash2,
//   ArrowLeft,
//   Calendar,
//   User,
//   DollarSign,
//   TrendingUp,
//   Building2,
//   Box,
//   Scale,
//   List,
//   Info,
//   Award,
//   Flame,
//   Clock as ClockIcon,
//   Flower2,
//   HelpCircle,
//   ChevronDown,
//   Hash,
//   FileText,
//   LinkIcon,
//   Layers
// } from 'lucide-react';

// import { toast } from 'sonner';

// // ========== HELPER FUNCTIONS ==========
// const getTagName = (tag) => {
//   if (!tag) return '';
//   if (typeof tag === 'string') return tag;
//   if (typeof tag === 'object' && tag.name) return tag.name;
//   return String(tag);
// };

// const formatPrice = (price) => (price || 0).toFixed(2);

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

// const getStockStatus = (quantity, alertQuantity) => {
//   if (quantity <= 0) return { label: 'Out of Stock', color: 'red', icon: AlertCircle };
//   if (alertQuantity > 0 && quantity <= alertQuantity) return { label: 'Low Stock', color: 'orange', icon: AlertCircle };
//   return { label: 'In Stock', color: 'green', icon: CheckCircle };
// };

// const formatBangladeshTime = (date) => {
//   if (!date) return 'N/A';
//   return new Date(date).toLocaleString('en-BD', {
//     timeZone: 'Asia/Dhaka',
//     hour12: false,
//     year: 'numeric',
//     month: 'short',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit'
//   });
// };

// const getUserRole = () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload.role || '';
//     }
//   } catch (error) {
//     console.error('Error getting user role:', error);
//   }
//   return '';
// };

// // ========== SKELETON ==========
// const ProductSkeleton = () => (
//   <div className="min-h-screen bg-white">
//     <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
//         <div className="animate-pulse">
//           <div className="bg-white rounded-2xl h-64 sm:h-96 w-full border border-gray-200"></div>
//         </div>
//         <div className="space-y-3 sm:space-y-4 animate-pulse">
//           <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4"></div>
//           <div className="h-4 sm:h-6 bg-gray-200 rounded w-1/2"></div>
//           <div className="h-16 sm:h-24 bg-gray-200 rounded"></div>
//           <div className="h-10 sm:h-12 bg-gray-200 rounded w-full"></div>
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

// // ========== MAIN COMPONENT ==========
// export default function AdminProductDetails() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('id');

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [showZoom, setShowZoom] = useState(false);
//   const [activeTab, setActiveTab] = useState('details');
//   const [isMobile, setIsMobile] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
//   const [imageLoaded, setImageLoaded] = useState({});
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [videoThumbnail, setVideoThumbnail] = useState(null);
//   const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
//   const [faqOpenStates, setFaqOpenStates] = useState({});

//   // Variant preview state
//   const [variantPreviewImages, setVariantPreviewImages] = useState(null);
//   const [previewVariantKey, setPreviewVariantKey] = useState(null);
//   const [previewSubVariantKey, setPreviewSubVariantKey] = useState(null);

//   const userRole = getUserRole();
//   const isAdminOrSuperAdmin = userRole === 'super_admin' || userRole === 'admin';
//   const isModerator = userRole === 'moderator';

//   const galleryRef = useRef(null);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     if (productId) {
//       fetchProductDetails();
//     } else {
//       toast.error('No product ID provided');
//       router.push('/authorize/all-products');
//     }
//   }, [productId]);

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
//     if (product && product.faqs && product.faqs.length > 0) {
//       const initialStates = {};
//       product.faqs.forEach((_, index) => {
//         initialStates[index] = false;
//       });
//       setFaqOpenStates(initialStates);
//     }
//   }, [product]);

//   const toggleFaq = (index) => {
//     setFaqOpenStates(prev => ({
//       ...prev,
//       [index]: !prev[index]
//     }));
//   };

//   const fetchProductDetails = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setProduct(data.data.product);
//       } else {
//         toast.error('Product not found');
//         router.push('/authorize/all-products');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to load product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     router.push(`/authorize/editProduct?id=${productId}`);
//   };

//   const handleDelete = async () => {
//     if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
//       return;
//     }
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         toast.success('Product deleted successfully');
//         router.push('/authorize/all-products');
//       } else {
//         toast.error(data.error || 'Failed to delete product');
//       }
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       toast.error('Failed to delete product');
//     }
//   };

//   const preloadImage = (src) => {
//     const img = new Image();
//     img.src = src;
//   };

//   const getYouTubeThumbnail = (url) => {
//     if (!url) return null;
//     const patterns = [
//       /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
//       /youtube\.com\/v\/([^&\s?#]+)/,
//       /youtube\.com\/live\/([^&\s?#]+)/
//     ];
//     for (const pattern of patterns) {
//       const match = url.match(pattern);
//       if (match && match[1]) return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
//     }
//     return null;
//   };

//   const generateVideoThumbnail = (videoUrl, callback) => {
//     const video = document.createElement('video');
//     video.crossOrigin = 'Anonymous';
//     video.src = videoUrl;
//     video.currentTime = 1.5;
//     video.addEventListener('loadeddata', () => {
//       setTimeout(() => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
//         canvas.width = 160;
//         canvas.height = 160;
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//         callback(canvas.toDataURL('image/jpeg', 0.8));
//       }, 100);
//     });
//     video.addEventListener('error', () => {
//       console.error('Error loading video for thumbnail generation');
//       callback(null);
//     });
//     video.load();
//   };

//   const getTagDisplayName = (tag) => {
//     if (!tag) return '';
//     if (typeof tag === 'string') return tag;
//     if (typeof tag === 'object' && tag.name) return tag.name;
//     return String(tag);
//   };

//   const getTagDisplayStyle = (tag) => {
//     const tagName = getTagDisplayName(tag);
//     const styles = {
//       'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
//       'Trending': 'bg-gradient-to-r from-[#2b2a2a] to-pink-800 text-white shadow-lg shadow-[#2b2a2a]/30',
//       'New Release': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
//       'Limited Offer': 'bg-gradient-to-r from-purple-500 to-[#2b2a2a] text-white shadow-lg shadow-purple-500/30',
//       'Flash Sale': 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/30',
//       'Clearance': 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg shadow-gray-500/30',
//     };
//     return styles[tagName] || 'bg-gradient-to-r from-[#2b2a2a] to-black text-white shadow-lg shadow-[#2b2a2a]/30';
//   };

//   const renderRichText = (html) => {
//     if (!html || html === '<p></p>') return null;
//     const cleanHtml = html.replace(/<p><\/p>/g, '');
//     if (!cleanHtml.trim()) return null;
//     return (
//       <div
//         className="rich-text-content text-[#64748B] text-sm sm:text-base leading-relaxed"
//         dangerouslySetInnerHTML={{ __html: cleanHtml }}
//       />
//     );
//   };

//   // Collect all product images + variant + sub-variant images (deduplicated)
//   const getAllImagesWithVariants = () => {
//     if (!product) return [];
//     const imageMap = new Map();

//     // Product images
//     (product.images || []).forEach((img) => {
//       const url = typeof img === 'string' ? img : img?.url;
//       if (url && !imageMap.has(url)) imageMap.set(url, { url, source: 'product' });
//     });

//     // Variant + sub-variant images
//     if (product.variantTypes) {
//       product.variantTypes.forEach((vt) => {
//         (vt.variants || []).forEach((variant) => {
//           const variantImgs = [
//             ...(variant.imagePreviews || []),
//             ...(variant.images || [])
//           ].filter(Boolean);
//           variantImgs.forEach((img) => {
//             const url = typeof img === 'string' ? img : img?.url;
//             if (url && !imageMap.has(url)) imageMap.set(url, { url, source: 'variant' });
//           });

//           (variant.subVariants || []).forEach((sub) => {
//             const subImgs = [
//               ...(sub.imagePreviews || []),
//               ...(sub.images || [])
//             ].filter(Boolean);
//             subImgs.forEach((img) => {
//               const url = typeof img === 'string' ? img : img?.url;
//               if (url && !imageMap.has(url)) imageMap.set(url, { url, source: 'subVariant' });
//             });
//           });
//         });
//       });
//     }

//     return Array.from(imageMap.values());
//   };

//   // Reset preview when clicking outside variant area
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const variantArea = document.getElementById('variant-table-area');
//       const galleryArea = document.getElementById('gallery-area');
//       if (
//         variantArea &&
//         !variantArea.contains(event.target) &&
//         galleryArea &&
//         !galleryArea.contains(event.target)
//       ) {
//         setVariantPreviewImages(null);
//         setPreviewVariantKey(null);
//         setPreviewSubVariantKey(null);
//         setActiveImageIndex(0);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   if (loading) return <ProductSkeleton />;
//   if (!product) return null;

//   const discountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
//   const currentPrice =
//     product.discountPrice && product.discountPrice < product.regularPrice
//       ? product.discountPrice
//       : product.regularPrice;
//   const stockStatus = getStockStatus(product.stockQuantity, product.stockAlertQuantity);
//   const StockIcon = stockStatus.icon;

//   const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';

//   // All images with variants
//   const allImagesWithVariants = getAllImagesWithVariants();

//   // Decide what images to display in the gallery/thumbnails
//   const productImages = (variantPreviewImages && variantPreviewImages.length > 0)
//     ? variantPreviewImages.map(url => ({ url }))
//     : allImagesWithVariants;

//   // Media items for main display
//   const mediaItems = [...productImages];
//   if (hasVideo) {
//     mediaItems.push({ type: 'video', url: product.videoUrl, videoType: product.videoType });
//   }
//   const mainMedia = mediaItems[activeImageIndex];
//   const isMainVideo = mainMedia?.type === 'video';
//   const mainImage = !isMainVideo ? mainMedia?.url : null;
//   const mainVideoUrl = isMainVideo ? mainMedia?.url : null;
//   const mainVideoType = isMainVideo ? mainMedia?.videoType : null;

//   const categoryHierarchy = [];
//   if (product.categoryName) categoryHierarchy.push(product.categoryName);
//   if (product.subcategoryName) categoryHierarchy.push(product.subcategoryName);
//   if (product.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

//   const getPromotionStyles = (promotion) => {
//     const styles = {
//       'flash-sale': { label: '🔥 Flash Sale', bg: 'bg-gradient-to-r from-red-500 to-orange-500', text: 'text-white', icon: Zap },
//       'new-arrival': { label: '✨ New Arrival', bg: 'bg-gradient-to-r from-emerald-500 to-teal-500', text: 'text-white', icon: Sparkles },
//       'trending': { label: '📈 Trending', bg: 'bg-gradient-to-r from-purple-500 to-pink-500', text: 'text-white', icon: TrendingUp },
//       'clearance': { label: '🏷️ Clearance', bg: 'bg-gradient-to-r from-yellow-500 to-orange-500', text: 'text-white', icon: Tag },
//       'holiday-special': { label: '🎄 Holiday Special', bg: 'bg-gradient-to-r from-red-600 to-green-600', text: 'text-white', icon: Gift },
//       'bundle-deal': { label: '📦 Bundle Deal', bg: 'bg-gradient-to-r from-pink-500 to-indigo-500', text: 'text-white', icon: Package },
//       'limited-stock': { label: '⚠️ Limited Stock', bg: 'bg-gradient-to-r from-orange-500 to-red-500', text: 'text-white', icon: AlertCircle }
//     };
//     return styles[promotion] || null;
//   };

//   const promotionStyle = product.promotion ? getPromotionStyles(product.promotion) : null;
//   const PromotionIcon = promotionStyle?.icon || Sparkles;

//   const hasColors = product.colors && product.colors.length > 0;
//   const hasVariants = product.hasVariants && product.variantTypes && product.variantTypes.length > 0;
//   const hasAddOns = product.addOnes && product.addOnes.length > 0;

//   // Variant click handlers
//   const handleVariantImageClick = (variant, variantKey) => {
//     const variantImgs = [
//       ...(variant.imagePreviews || []),
//       ...(variant.images || [])
//     ].filter(Boolean).map(img => typeof img === 'string' ? img : img?.url).filter(Boolean);

//     if (previewVariantKey === variantKey && !previewSubVariantKey) {
//       setVariantPreviewImages(null);
//       setPreviewVariantKey(null);
//       setPreviewSubVariantKey(null);
//       setActiveImageIndex(0);
//       return;
//     }

//     setPreviewVariantKey(variantKey);
//     setPreviewSubVariantKey(null);
//     setVariantPreviewImages(variantImgs.length > 0 ? variantImgs : null);
//     setActiveImageIndex(0);
//   };

//   const handleSubVariantImageClick = (subVariant, variant, variantKey, subKey) => {
//     const subImgs = [
//       ...(subVariant.imagePreviews || []),
//       ...(subVariant.images || [])
//     ].filter(Boolean).map(img => typeof img === 'string' ? img : img?.url).filter(Boolean);

//     const variantImgs = [
//       ...(variant.imagePreviews || []),
//       ...(variant.images || [])
//     ].filter(Boolean).map(img => typeof img === 'string' ? img : img?.url).filter(Boolean);

//     if (previewSubVariantKey === subKey) {
//       setPreviewSubVariantKey(null);
//       setVariantPreviewImages(variantImgs.length > 0 ? variantImgs : null);
//       setActiveImageIndex(0);
//       return;
//     }

//     setPreviewVariantKey(variantKey);
//     setPreviewSubVariantKey(subKey);
//     setVariantPreviewImages(subImgs.length > 0 ? subImgs : (variantImgs.length > 0 ? variantImgs : null));
//     setActiveImageIndex(0);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6 lg:py-8 max-w-7xl">

//         {/* Header */}
//         <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
//           <div className="flex items-center gap-2 sm:gap-3">
//             <button
//               onClick={() => window.location.href = '/authorize/all-products'}
//               className="p-2 bg-white rounded-xl border border-gray-200 hover:border-[#2b2a2a] transition-all shadow-sm hover:shadow-md"
//             >
//               <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-[#2b2a2a]" />
//             </button>
//             <div>
//               <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
//                 Product Details
//               </h1>
//               <p className="text-xs sm:text-sm text-gray-500 mt-0.5">View complete product information</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 sm:gap-3">
//             <button
//               onClick={handleEdit}
//               className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2b2a2a] text-white font-semibold rounded-lg hover:bg-black transition-all text-xs sm:text-sm shadow-md hover:shadow-lg"
//             >
//               <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               Edit Product
//             </button>
//             <button
//               onClick={handleDelete}
//               className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all text-xs sm:text-sm shadow-md hover:shadow-lg"
//             >
//               <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm mb-4 sm:mb-6 overflow-x-auto pb-1 sm:pb-2 scrollbar-hide">
//           <Link href="/authorize/dashboard" className="text-gray-500 hover:text-[#2b2a2a] transition whitespace-nowrap">Dashboard</Link>
//           <span className="text-gray-300">/</span>
//           <Link href="/authorize/all-products" className="text-gray-500 hover:text-[#2b2a2a] transition whitespace-nowrap">Products</Link>
//           <span className="text-gray-300">/</span>
//           <span className="text-gray-900 font-medium truncate max-w-[100px] sm:max-w-[150px]">
//             {product.productName}
//           </span>
//         </nav>

//         {/* Product Title Bar */}
//         <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 shadow-sm">
//           <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
//             <div>
//               <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
//                 {product.productName}
//               </h2>
//               <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1">
//                 <p className="text-[10px] sm:text-xs text-gray-500">SKU: {product.skuCode}</p>
//                 {product.brand && (
//                   <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-gray-500">
//                     <Building2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                     {product.brand}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
//               <span className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium ${
//                 product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//               }`}>
//                 {product.isActive ? (
//                   <><CheckCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> Active</>
//                 ) : (
//                   <><X className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> Inactive</>
//                 )}
//               </span>
//               <span className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium ${
//                 stockStatus.color === 'green' ? 'bg-green-100 text-green-700' :
//                 stockStatus.color === 'orange' ? 'bg-orange-100 text-orange-700' :
//                 'bg-red-100 text-red-700'
//               }`}>
//                 <StockIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                 {stockStatus.label}
//               </span>
//               {product.isFeatured && (
//                 <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium bg-yellow-100 text-yellow-700">
//                   <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                   Featured
//                 </span>
//               )}
//               {product.showOnBanner && (
//                 <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium bg-purple-100 text-purple-700">
//                   <ImageIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                   On Banner
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
//           {/* LEFT COLUMN: Gallery + Variant Table */}
//           <div className="lg:col-span-3" ref={galleryRef} id="gallery-area">
//             <div className="sticky top-20 lg:top-24 space-y-4">
//               {/* Main image */}
//               <div className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
//                 <div
//                   className="relative bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden cursor-crosshair"
//                   style={{ height: 'auto', minHeight: '280px' }}
//                   onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
//                   onMouseLeave={() => setIsZoomed(false)}
//                   onMouseMove={(e) => {
//                     if (!isZoomed || isMainVideo || isMobile) return;
//                     const rect = e.currentTarget.getBoundingClientRect();
//                     const x = ((e.clientX - rect.left) / rect.width) * 100;
//                     const y = ((e.clientY - rect.top) / rect.height) * 100;
//                     setZoomPosition({
//                       x: Math.min(Math.max(x, 0), 100),
//                       y: Math.min(Math.max(y, 0), 100)
//                     });
//                   }}
//                 >
//                   <div className="relative w-full pt-[100%]">
//                     {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
//                       <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-gray-50 animate-pulse z-10" />
//                     )}

//                     <div className="absolute inset-0 w-full h-full overflow-hidden">
//                       {!isMainVideo && mainImage ? (
//                         <img
//                           key={activeImageIndex}
//                           src={mainImage}
//                           alt={product.productName}
//                           className={`w-full h-full object-contain p-3 sm:p-4 bg-white transition-opacity duration-300 ${
//                             imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
//                           }`}
//                           style={{
//                             transform: isZoomed && !isMobile ? 'scale(2.2)' : 'scale(1)',
//                             transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                             transition: 'transform 0.15s ease-out'
//                           }}
//                           onLoad={() => {
//                             setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                             setTimeout(() => setIsTransitioning(false), 100);
//                           }}
//                           loading={activeImageIndex === 0 ? "eager" : "lazy"}
//                           fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
//                           decoding="async"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
//                             setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                           }}
//                         />
//                       ) : isMainVideo && mainVideoUrl ? (
//                         mainVideoType === 'youtube' ? (
//                           <iframe src={mainVideoUrl} className="w-full h-full aspect-square" allowFullScreen title="Product Video" />
//                         ) : (
//                           <video src={mainVideoUrl} controls className="w-full h-full object-contain bg-white" />
//                         )
//                       ) : null}
//                     </div>
//                   </div>

//                   {!isMainVideo && !isMobile && !isZoomed && (
//                     <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none">
//                       <div className="bg-white/80 backdrop-blur-sm text-gray-700 text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 hover:opacity-100 transition-opacity shadow-lg border border-gray-200">
//                         <ZoomIn className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
//                         <span className="hidden xs:inline font-medium">Hover to zoom</span>
//                       </div>
//                     </div>
//                   )}

//                   <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex gap-1 sm:gap-2 z-20">
//                     {!isMainVideo && (
//                       <button
//                         onClick={() => setShowZoom(true)}
//                         className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
//                         aria-label="View fullscreen"
//                       >
//                         <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#2b2a2a]" />
//                       </button>
//                     )}
//                   </div>

//                   <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-20">
//                     {activeImageIndex + 1} / {productImages.length}
//                   </div>
//                 </div>

//                 {discountPercent > 0 && (
//                   <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#2b2a2a] text-white text-[8px] sm:text-[10px] md:text-sm font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
//                     <Tag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                     {discountPercent}% OFF
//                   </div>
//                 )}
//                 {product.tags?.[0] && (
//                   <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getTagDisplayStyle(product.tags[0])} text-[7px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1`}>
//                     <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                     {getTagDisplayName(product.tags[0])}
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnails — all images including variant + sub-variant */}
//               <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-thin justify-start">
//                 {productImages.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       if (activeImageIndex !== idx) {
//                         setActiveImageIndex(idx);
//                         setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                         setIsZoomed(false);
//                       }
//                     }}
//                     onMouseEnter={() => {
//                       preloadImage(img.url);
//                       if (activeImageIndex !== idx) {
//                         setActiveImageIndex(idx);
//                         setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                         setIsZoomed(false);
//                       }
//                     }}
//                     className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
//                       activeImageIndex === idx ? 'border-[#2b2a2a] shadow-[0_0_0_3px_rgba(236,72,153,0.2)]' : 'border-gray-200 hover:border-pink-400'
//                     }`}
//                   >
//                     <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}

//                 {hasVideo && (
//                   <button
//                     onClick={() => {
//                       if (activeImageIndex !== productImages.length) {
//                         setActiveImageIndex(productImages.length);
//                         setIsZoomed(false);
//                       }
//                     }}
//                     className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
//                       activeImageIndex === productImages.length ? 'border-[#2b2a2a] shadow-[0_0_0_3px_rgba(236,72,153,0.2)]' : 'border-gray-200 hover:border-pink-400'
//                     }`}
//                   >
//                     {product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl) ? (
//                       <img src={getYouTubeThumbnail(product.videoUrl)} alt="Video thumbnail" className="w-full h-full object-cover" />
//                     ) : product.videoType !== 'youtube' && videoThumbnail ? (
//                       <img src={videoThumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
//                     ) : null}
//                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                       <Play className="w-4 h-4 text-white" />
//                     </div>
//                   </button>
//                 )}
//               </div>

//               {/* ============ VARIANT TABLE (under gallery) ============ */}
//               {hasVariants && (
//                 <div id="variant-table-area" className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//                   <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50/60">
//                     <div className="flex items-center gap-2">
//                       <Layers className="w-4 h-4 text-[#2b2a2a]" />
//                       <h3 className="text-sm font-bold text-gray-900">Product Variants</h3>
//                     </div>
//                     <span className="text-[10px] text-gray-500">
//                       Click a variant to preview its image
//                     </span>
//                   </div>

//                   <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
//                     {product.variantTypes.map((vt, vti) => {
//                       const variants = vt.variants || [];
//                       if (variants.length === 0) return null;

//                       return (
//                         <div key={vt.id || vt._id || vti} className="p-3">
//                           <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
//                             {vt.type} ({variants.length})
//                           </p>

//                           <div className="space-y-2">
//                             {variants.map((variant, vi) => {
//                               const variantKey = `v-${vti}-${vi}`;
//                               const vImage = variant.imagePreviews?.[0] || variant.images?.[0] || null;
//                               const vColor = variant.color || null;
//                               const vRegular = variant.regularPrice || 0;
//                               const vDiscount = variant.discountPrice || 0;
//                               const vHasDiscount = vDiscount > 0 && vDiscount < vRegular;
//                               const isPreviewed = previewVariantKey === variantKey && !previewSubVariantKey;
//                               const hasSubs = variant.subVariants && variant.subVariants.length > 0;

//                               return (
//                                 <div key={variant.id || variant._id || vi} className="space-y-1">
//                                   {/* Variant row */}
//                                   <button
//                                     type="button"
//                                     onClick={() => handleVariantImageClick(variant, variantKey)}
//                                     className={`w-full flex items-center gap-2 p-2 rounded-lg border transition-all text-left ${
//                                       isPreviewed
//                                         ? 'border-pink-500 [#c4d1be]/40 shadow-sm'
//                                         : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-gray-50'
//                                     }`}
//                                   >
//                                     <div className="flex-shrink-0">
//                                       {vImage ? (
//                                         <img src={vImage} alt={variant.name} className="w-10 h-10 rounded-md object-cover border border-gray-200 bg-white" />
//                                       ) : vColor ? (
//                                         <div className="w-10 h-10 rounded-md border border-gray-200" style={{ backgroundColor: vColor }} />
//                                       ) : (
//                                         <div className="w-10 h-10 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center">
//                                           <Package className="w-4 h-4 text-gray-300" />
//                                         </div>
//                                       )}
//                                     </div>

//                                     <div className="flex-1 min-w-0">
//                                       <div className="flex items-center gap-1.5">
//                                         {vColor && (
//                                           <div className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ backgroundColor: vColor }} />
//                                         )}
//                                         <p className="text-xs font-semibold text-gray-900 truncate">{variant.name}</p>
//                                         {hasSubs && (
//                                           <span className="text-[9px] font-semibold text-black [#c4d1be] border border-black px-1.5 rounded-full flex items-center gap-0.5">
//                                             <Layers className="w-2 h-2" />
//                                             {variant.subVariants.length}
//                                           </span>
//                                         )}
//                                       </div>
//                                       <div className="flex items-center gap-2 mt-0.5 text-[10px]">
//                                         {vHasDiscount ? (
//                                           <>
//                                             <span className="text-[#2b2a2a] font-bold">৳{formatPrice(vDiscount)}</span>
//                                             <span className="text-gray-400 line-through">৳{formatPrice(vRegular)}</span>
//                                           </>
//                                         ) : (
//                                           <span className="text-gray-900 font-bold">৳{formatPrice(vRegular)}</span>
//                                         )}
//                                         <span className="text-gray-500">Stock: {variant.stockQuantity || 0}</span>
//                                       </div>
//                                     </div>
//                                   </button>

//                                   {/* Sub-variants */}
//                                   {hasSubs && (
//                                     <div className="pl-4 space-y-1">
//                                       {variant.subVariants.map((sub, si) => {
//                                         const subKey = `v-${vti}-${vi}-s-${si}`;
//                                         const sImage = sub.imagePreviews?.[0] || sub.images?.[0] || null;
//                                         const sColor = sub.color || null;
//                                         const sRegular = sub.regularPrice || 0;
//                                         const sDiscount = sub.discountPrice || 0;
//                                         const sHasDiscount = sDiscount > 0 && sDiscount < sRegular;
//                                         const isSubPreviewed = previewSubVariantKey === subKey;

//                                         return (
//                                           <button
//                                             key={sub.id || sub._id || si}
//                                             type="button"
//                                             onClick={() => handleSubVariantImageClick(sub, variant, variantKey, subKey)}
//                                             className={`w-full flex items-center gap-2 p-1.5 rounded-md border transition-all text-left ${
//                                               isSubPreviewed
//                                                 ? 'border-pink-500 [#c4d1be]/40'
//                                                 : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-gray-50'
//                                             }`}
//                                           >
//                                             <div className="flex-shrink-0">
//                                               {sImage ? (
//                                                 <img src={sImage} alt={sub.name} className="w-8 h-8 rounded-md object-cover border border-gray-200 bg-white" />
//                                               ) : sColor ? (
//                                                 <div className="w-8 h-8 rounded-md border border-gray-200" style={{ backgroundColor: sColor }} />
//                                               ) : (
//                                                 <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center">
//                                                   <Package className="w-3.5 h-3.5 text-gray-300" />
//                                                 </div>
//                                               )}
//                                             </div>
//                                             <div className="flex-1 min-w-0">
//                                               <div className="flex items-center gap-1">
//                                                 {sColor && (
//                                                   <div className="w-2 h-2 rounded-full border border-gray-300" style={{ backgroundColor: sColor }} />
//                                                 )}
//                                                 <p className="text-[11px] font-medium text-gray-800 truncate">{sub.name}</p>
//                                               </div>
//                                               <div className="flex items-center gap-1.5 text-[10px]">
//                                                 {sHasDiscount ? (
//                                                   <>
//                                                     <span className="text-[#2b2a2a] font-bold">৳{formatPrice(sDiscount)}</span>
//                                                     <span className="text-gray-400 line-through">৳{formatPrice(sRegular)}</span>
//                                                   </>
//                                                 ) : (
//                                                   <span className="text-gray-900 font-bold">৳{formatPrice(sRegular)}</span>
//                                                 )}
//                                                 <span className="text-gray-500">Stock: {sub.stockQuantity || 0}</span>
//                                               </div>
//                                             </div>
//                                           </button>
//                                         );
//                                       })}
//                                     </div>
//                                   )}
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Info */}
//           <div className="lg:col-span-4 bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
//             {/* Category hierarchy + brand + promotion */}
//             <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-3 sm:mb-4">
//               {categoryHierarchy.map((cat, idx) => (
//                 <span key={idx} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs font-medium rounded-full [#c4d1be] text-black border border-black">
//                   <FolderTree className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//                   {cat}
//                 </span>
//               ))}
//               {product.brand && (
//                 <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs font-medium rounded-full [#c4d1be] text-black border border-black">
//                   <Building2 className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//                   {product.brand}
//                 </span>
//               )}
//               {promotionStyle && (
//                 <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[7px] sm:text-[10px] font-semibold ${promotionStyle.bg} ${promotionStyle.text} shadow-sm`}>
//                   <PromotionIcon className="w-2 h-2 sm:w-3 sm:h-3" />
//                   {promotionStyle.label}
//                 </span>
//               )}
//             </div>

//             {/* Title */}
//             <div className="mb-3 sm:mb-4">
//               <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">
//                 {product.productName}
//               </h1>
//             </div>

//             {/* Price */}
//             <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-r from-pink-50 to-gray-50 rounded-xl border border-black">
//               <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
//                 <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2b2a2a]">
//                   ৳{formatPrice(currentPrice)}
//                 </span>
//                 {discountPercent > 0 && (
//                   <>
//                     <span className="text-sm sm:text-base text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
//                     <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white bg-[#2b2a2a] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
//                       <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
//                       Save {discountPercent}%
//                     </span>
//                   </>
//                 )}
//               </div>
//               {product.codAvailable && (
//                 <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-green-600 text-[10px] sm:text-xs bg-green-50 inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
//                   <Truck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                   <span>Cash on Delivery available</span>
//                 </div>
//               )}
//             </div>

//             {/* Short description */}
//             <div className="mb-4 sm:mb-5 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200">
//               {product.shortDescription && product.shortDescription !== '<p></p>' ? (
//                 <div
//                   className="text-[11px] sm:text-sm text-gray-600 leading-relaxed rich-text-content"
//                   dangerouslySetInnerHTML={{ __html: product.shortDescription }}
//                 />
//               ) : (
//                 <p className="text-[11px] sm:text-sm text-gray-400 italic">
//                   No short description available.
//                 </p>
//               )}
//             </div>

//             {/* Stock status */}
//             <div className="flex items-center gap-2 mb-4">
//               <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full ${
//                 stockStatus.color === 'green' ? 'bg-green-50 text-green-600' :
//                 stockStatus.color === 'orange' ? 'bg-orange-50 text-orange-600' :
//                 'bg-red-50 text-red-600'
//               }`}>
//                 <StockIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                 <span>{stockStatus.label}</span>
//                 {stockStatus.label === 'In Stock' && (
//                   <span className="text-[8px] sm:text-[10px] text-gray-500">({product.stockQuantity} available)</span>
//                 )}
//                 {stockStatus.label === 'Low Stock' && (
//                   <span className="text-[8px] sm:text-[10px] text-orange-500">
//                     (Only {product.stockQuantity} left - Alert at {product.stockAlertQuantity})
//                   </span>
//                 )}
//               </div>
//             </div>

//             {product.stockAlertQuantity > 0 && (
//               <div className="mb-4 p-2 bg-gray-50 rounded-lg border border-gray-200">
//                 <p className="text-[10px] sm:text-xs text-gray-600 flex items-center gap-1.5">
//                   <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
//                   Stock Alert: Notify when stock reaches {product.stockAlertQuantity}
//                 </p>
//               </div>
//             )}

//             {/* Pricing summary */}
//             <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
//               {product.packagingCost !== undefined && product.packagingCost !== null && (
//                 <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
//                   <p className="text-[8px] sm:text-[10px] text-gray-500 flex items-center gap-1">
//                     <Box className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
//                     Packaging Cost
//                   </p>
//                   <p className="text-sm sm:text-base font-bold text-gray-900">
//                     ৳{formatPrice(product.packagingCost)}
//                   </p>
//                 </div>
//               )}
//               {product.deliveryCost !== undefined && product.deliveryCost !== null && (
//                 <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
//                   <p className="text-[8px] sm:text-[10px] text-gray-500 flex items-center gap-1">
//                     <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
//                     Delivery Cost
//                   </p>
//                   <p className="text-sm sm:text-base font-bold text-gray-900">
//                     ৳{formatPrice(product.deliveryCost)}
//                   </p>
//                 </div>
//               )}
//               {isAdminOrSuperAdmin && product.buyingPrice > 0 && (
//                 <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-2 sm:p-3 border border-amber-200">
//                   <p className="text-[8px] sm:text-[10px] text-amber-700 flex items-center gap-1">
//                     <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" />
//                     Buying Price
//                   </p>
//                   <p className="text-sm sm:text-base font-bold text-amber-800">
//                     ৳{formatPrice(product.buyingPrice)}
//                   </p>
//                 </div>
//               )}
//               {!isModerator && product.costPerItem > 0 && (
//                 <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
//                   <p className="text-[8px] sm:text-[10px] text-gray-500 flex items-center gap-1">
//                     <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
//                     Cost Per Item
//                   </p>
//                   <p className="text-sm sm:text-base font-bold text-gray-900">
//                     ৳{formatPrice(product.costPerItem)}
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Specs summary */}
//             <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-4">
//               <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
//                 <p className="text-[8px] sm:text-[10px] text-gray-500">Unit</p>
//                 <p className="text-xs sm:text-sm font-medium text-gray-900">{product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A'}</p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
//                 <p className="text-[8px] sm:text-[10px] text-gray-500">SKU</p>
//                 <p className="text-xs sm:text-sm font-medium text-gray-900 font-mono">{product.skuCode}</p>
//               </div>
//             </div>

//             {/* Delivery info */}
//             {product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '' && (
//               <div className="bg-gradient-to-r from-pink-50 to-gray-50 rounded-xl p-3 sm:p-4 border border-black mb-4">
//                 <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
//                   <Truck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#2b2a2a]" />
//                   <span className="font-semibold text-gray-900 text-sm sm:text-base">
//                     Delivery Information
//                   </span>
//                 </div>
//                 <div className="rich-text-content text-gray-600 text-[10px] sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} />
//                 <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-black/50">
//                   <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-gray-500">
//                     <RotateCcw className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                     <span>7 Days Return Policy</span>
//                   </div>
//                   <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-gray-500">
//                     <ShieldCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                     <span>Safe &amp; Secure</span>
//                   </div>
//                   <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-gray-500">
//                     <Award className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                     <span>Genuine Products</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Tracking info */}
//             {isAdminOrSuperAdmin && (
//               <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
//                 <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
//                   <ClockIcon className="w-3.5 h-3.5 text-[#2b2a2a]" />
//                   Product Tracking Information
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
//                   <div className="flex items-start gap-1.5">
//                     <User className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="text-[10px] text-gray-500">Created By</p>
//                       <p className="font-medium text-gray-900 text-[11px]">
//                         {product.createdBy?.name || product.createdBy?.email || 'Unknown'}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-1.5">
//                     <Calendar className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="text-[10px] text-gray-500">Created At</p>
//                       <p className="font-medium text-gray-900 text-[11px]">
//                         {formatBangladeshTime(product.createdAt)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-1.5">
//                     <User className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="text-[10px] text-gray-500">Last Updated By</p>
//                       <p className="font-medium text-gray-900 text-[11px]">
//                         {product.updatedBy?.name || product.updatedBy?.email || 'Not updated yet'}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-1.5">
//                     <ClockIcon className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="text-[10px] text-gray-500">Last Updated At</p>
//                       <p className="font-medium text-gray-900 text-[11px]">
//                         {product.lastUpdatedAt ? formatBangladeshTime(product.lastUpdatedAt) : 'Never updated'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-2 pt-2 border-t border-gray-200">
//                   <div className="flex items-start gap-1.5">
//                     <Building2 className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="text-[10px] text-gray-500">Product ID</p>
//                       <p className="font-mono text-[10px] text-gray-400">{product._id}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ============ ADD-ONS SECTION ============ */}
//         {hasAddOns && (
//           <div className="mt-6 sm:mt-10">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="p-2 bg-[#2b2a2a] rounded-xl">
//                 <Gift className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-lg sm:text-xl font-bold text-gray-900">
//                   Add-On Products
//                 </h2>
//                 <p className="text-xs sm:text-sm text-gray-500">
//                   Products offered as add-ons with this item
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
//               <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
//                 {product.addOnes.map((addOn, idx) => {
//                   const addOnProduct = addOn.productId || addOn;
//                   const id = addOnProduct._id || addOn.productId;
//                   const image = addOnProduct.images?.[0]?.url || addOnProduct.images?.[0] || null;
//                   const regular = Number(addOnProduct.regularPrice || 0);
//                   const discount = Number(addOnProduct.discountPrice || 0);
//                   const hasDiscount = discount > 0 && discount < regular;
//                   const displayPrice = hasDiscount ? discount : regular;

//                   return (
//                     <div key={id || idx} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-pink-300 transition-colors">
//                       <div className="flex-shrink-0">
//                         {image ? (
//                           <img src={image} alt={addOnProduct.productName} className="w-14 h-14 rounded-lg object-cover border border-gray-200" />
//                         ) : (
//                           <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
//                             <Package className="w-6 h-6 text-gray-300" />
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-semibold text-gray-900 truncate">
//                           {addOnProduct.productName}
//                         </p>
//                         {addOnProduct.skuCode && (
//                           <p className="text-[10px] text-gray-500 mt-0.5 font-mono">SKU: {addOnProduct.skuCode}</p>
//                         )}
//                         <div className="flex items-center gap-2 mt-1 flex-wrap">
//                           {hasDiscount ? (
//                             <>
//                               <span className="text-sm font-bold text-[#2b2a2a]">৳{formatPrice(discount)}</span>
//                               <span className="text-xs text-gray-400 line-through">৳{formatPrice(regular)}</span>
//                               <span className="text-[9px] font-semibold text-white bg-[#2b2a2a] px-1.5 py-0.5 rounded">
//                                 {calculateDiscountPercentage(regular, discount)}% OFF
//                               </span>
//                             </>
//                           ) : (
//                             <span className="text-sm font-bold text-gray-900">৳{formatPrice(regular)}</span>
//                           )}
//                         </div>
//                       </div>

//                       {addOnProduct.stockQuantity !== undefined && (
//                         <div className="flex-shrink-0 text-right">
//                           <p className="text-[10px] text-gray-500">Stock</p>
//                           <p className={`text-sm font-bold ${addOnProduct.stockQuantity > 0 ? 'text-gray-900' : 'text-red-600'}`}>
//                             {addOnProduct.stockQuantity || 0}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="mt-6 sm:mt-10 md:mt-14">
//           <div className="flex flex-wrap gap-0.5 sm:gap-1 border-b border-gray-200">
//             {['details', 'specifications', 'additional', 'meta', 'faqs'].map(tab => {
//               const labels = {
//                 details: 'Description',
//                 specifications: 'Specifications',
//                 additional: 'Additional Info',
//                 meta: 'SEO & Meta',
//                 faqs: 'FAQs'
//               };
//               const icons = {
//                 details: <FileText className="w-3.5 h-3.5" />,
//                 specifications: <List className="w-3.5 h-3.5" />,
//                 additional: <Info className="w-3.5 h-3.5" />,
//                 meta: <Tag className="w-3.5 h-3.5" />,
//                 faqs: <HelpCircle className="w-3.5 h-3.5" />
//               };
//               return (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 font-semibold text-[10px] sm:text-xs md:text-sm rounded-t-lg sm:rounded-t-xl transition-all flex items-center gap-1.5 ${
//                     activeTab === tab
//                       ? 'bg-white text-[#2b2a2a] border-t-2 border-l-2 border-r-2 border-black border-b-white shadow-sm'
//                       : 'text-gray-500 hover:text-gray-900'
//                   }`}
//                 >
//                   {icons[tab]}
//                   {labels[tab]}
//                   {tab === 'faqs' && product.faqs && product.faqs.length > 0 && (
//                     <span className="bg-pink-100 text-[#2b2a2a] text-[10px] px-1.5 py-0.5 rounded-full ml-1">
//                       {product.faqs.length}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           <div className="bg-white rounded-b-lg sm:rounded-b-xl rounded-tr-lg sm:rounded-tr-xl border border-t-0 border-gray-200 p-3 sm:p-4 md:p-6">
//             {activeTab === 'details' && (
//               <div className="rich-text-content text-gray-600 text-sm sm:text-base leading-relaxed">
//                 {product.fullDescription && product.fullDescription !== '<p></p>' ? (
//                   renderRichText(product.fullDescription)
//                 ) : (
//                   <p className="text-gray-400 italic">No description available.</p>
//                 )}
//               </div>
//             )}

//             {activeTab === 'specifications' && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
//                 {[
//                   { label: 'Brand', value: product.brand, icon: Building2 },
//                   { label: 'Slug', value: product.slug || 'N/A', icon: LinkIcon },
//                   { label: 'SKU', value: product.skuCode, icon: Package },
//                   { label: 'Barcode', value: product.barcode || 'N/A', icon: Hash },
//                   { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
//                   { label: 'Stock Alert', value: product.stockAlertQuantity > 0 ? `${product.stockAlertQuantity} units` : 'Not set', icon: AlertCircle },
//                   { label: 'Category', value: product.categoryName, icon: FolderTree },
//                   { label: 'Subcategory', value: product.subcategoryName || 'N/A', icon: FolderTree },
//                   { label: 'Child Subcategory', value: product.childSubcategoryName || 'N/A', icon: FolderTree },
//                   { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
//                   { label: 'Regular Price', value: `৳${formatPrice(product.regularPrice)}`, icon: DollarSign },
//                   { label: 'Discount Price', value: product.discountPrice > 0 ? `৳${formatPrice(product.discountPrice)}` : 'N/A', icon: Tag },
//                   { label: 'Status', value: product.isActive ? 'Active' : 'Inactive', icon: CheckCircle },
//                   { label: 'Featured', value: product.isFeatured ? 'Yes' : 'No', icon: Star },
//                   { label: 'Promotion', value: product.promotion || 'None', icon: Zap },
//                   { label: 'Rating', value: product.rating > 0 ? `${product.rating} ⭐` : 'Not rated', icon: Star },
//                   { label: 'Purchase Count', value: product.purchaseCount || 0, icon: ShoppingCart },
//                   ...(isAdminOrSuperAdmin && product.buyingPrice > 0 ? [
//                     { label: 'Buying Price', value: `৳${formatPrice(product.buyingPrice)}`, icon: DollarSign, isAdminOnly: true }
//                   ] : []),
//                   { label: 'Created At', value: formatBangladeshTime(product.createdAt), icon: Calendar },
//                   { label: 'Created By', value: product.createdBy?.name || product.createdBy?.email || 'Unknown', icon: User },
//                   { label: 'Last Updated', value: formatBangladeshTime(product.updatedAt), icon: ClockIcon },
//                   ...(product.lastUpdatedAt ? [
//                     { label: 'Last Updated By', value: product.updatedBy?.name || product.updatedBy?.email || 'Unknown', icon: User },
//                     { label: 'Last Updated At', value: formatBangladeshTime(product.lastUpdatedAt), icon: ClockIcon }
//                   ] : []),
//                 ].filter(item => item.value && item.value !== 'N/A').map((item, idx) => (
//                   <div key={idx} className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 ${item.isAdminOnly ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'} rounded-lg sm:rounded-xl border`}>
//                     <div className={`p-1.5 sm:p-2 ${item.isAdminOnly ? 'bg-amber-100' : 'bg-pink-100'} rounded-full`}>
//                       <item.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${item.isAdminOnly ? 'text-amber-600' : 'text-[#2b2a2a]'}`} />
//                     </div>
//                     <div>
//                       <p className="text-[8px] sm:text-[10px] text-gray-500">{item.label}</p>
//                       <p className={`font-medium ${item.isAdminOnly ? 'text-amber-700' : 'text-gray-900'} text-[10px] sm:text-xs md:text-sm`}>
//                         {item.value || 'N/A'}
//                       </p>
//                       {item.isAdminOnly && (
//                         <span className="text-[7px] sm:text-[8px] text-amber-500 bg-amber-100 px-1.5 py-0.5 rounded-full">Admin Only</span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === 'additional' && (
//               <>
//                 {product.additionalInfo && product.additionalInfo.length > 0 ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
//                     {product.additionalInfo.map((info, idx) => (
//                       <div key={`additional-${idx}`} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
//                         <div className="p-1.5 sm:p-2 bg-pink-100 rounded-full">
//                           <Info className="w-3 h-3 sm:w-4 sm:h-4 text-[#2b2a2a]" />
//                         </div>
//                         <div>
//                           <p className="text-[8px] sm:text-[10px] text-gray-500">{info.fieldName}</p>
//                           <p className="font-medium text-gray-900 text-[10px] sm:text-xs md:text-sm">{info.fieldValue}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-6 sm:py-8">
//                     <Info className="w-8 h-8 sm:w-12 sm:h-12 text-pink-300 mx-auto mb-2 sm:mb-3" />
//                     <p className="text-gray-500 text-sm">No additional information available</p>
//                   </div>
//                 )}
//               </>
//             )}

//             {activeTab === 'meta' && (
//               <div className="space-y-3 sm:space-y-4">
//                 {product.metaSettings?.metaTitle && (
//                   <div className="p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
//                     <p className="text-[8px] sm:text-[10px] text-gray-500 mb-0.5 sm:mb-1">Meta Title</p>
//                     <p className="font-medium text-gray-900 text-xs sm:text-sm">{product.metaSettings.metaTitle}</p>
//                   </div>
//                 )}
//                 {product.metaSettings?.metaDescription && (
//                   <div className="p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
//                     <p className="text-[8px] sm:text-[10px] text-gray-500 mb-0.5 sm:mb-1">Meta Description</p>
//                     <p className="font-medium text-gray-900 text-xs sm:text-sm">{product.metaSettings.metaDescription}</p>
//                   </div>
//                 )}
//                 {product.metaSettings?.metaKeywords && product.metaSettings.metaKeywords.length > 0 && (
//                   <div className="p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
//                     <p className="text-[8px] sm:text-[10px] text-gray-500 mb-1 sm:mb-2">Meta Keywords</p>
//                     <div className="flex flex-wrap gap-1 sm:gap-2">
//                       {product.metaSettings.metaKeywords.map((keyword, idx) => (
//                         <span key={idx} className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white rounded-md text-[8px] sm:text-xs text-gray-700 border border-gray-200">
//                           {keyword}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {!product.metaSettings?.metaTitle && !product.metaSettings?.metaDescription && (!product.metaSettings?.metaKeywords || product.metaSettings.metaKeywords.length === 0) && (
//                   <div className="text-center py-6 sm:py-8">
//                     <Package className="w-8 h-8 sm:w-12 sm:h-12 text-pink-300 mx-auto mb-2 sm:mb-3" />
//                     <p className="text-gray-500 text-sm">No SEO &amp; Meta settings available</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === 'faqs' && (
//               <div>
//                 {product.faqs && product.faqs.length > 0 ? (
//                   <div>
//                     <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-[#2b2a2a] rounded-xl shadow-lg shadow-black">
//                           <HelpCircle className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h3>
//                           <p className="text-sm text-gray-500">Customer questions and answers about this product</p>
//                         </div>
//                       </div>
//                       <div className="hidden sm:flex items-center gap-1 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
//                         <FileText className="w-4 h-4 text-[#2b2a2a]" />
//                         <span>{product.faqs.length} questions</span>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       {product.faqs.map((faq, index) => {
//                         const isOpen = faqOpenStates[index] || false;
//                         return (
//                           <div key={index} className={`border rounded-xl transition-all duration-300 overflow-hidden ${
//                             isOpen ? 'border-[#a2b897] shadow-md shadow-[#cee0c5] bg-white' : 'border-gray-200 hover:border-black bg-white'
//                           }`}>
//                             <button
//                               onClick={() => toggleFaq(index)}
//                               className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
//                             >
//                               <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#cee0c5] text-[#2b2a2a] flex items-center justify-center text-sm font-bold">
//                                 {index + 1}
//                               </span>
//                               <span className="flex-1 font-semibold text-gray-900 text-base sm:text-lg">
//                                 {faq.question}
//                               </span>
//                               <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
//                                 <ChevronDown className="w-5 h-5 text-[#2b2a2a]" />
//                               </div>
//                             </button>

//                             <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
//                               <div className="px-5 pb-4 pt-1 border-t border-pink-100/50">
//                                 <div className="flex items-start gap-3 pl-11">
//                                   <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#728269] mt-2"></div>
//                                   <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
//                                     {faq.answer}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <HelpCircle className="w-8 h-8 text-gray-300" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs Available</h3>
//                     <p className="text-gray-500 text-sm">This product doesn't have any frequently asked questions yet.</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Tags */}
//         {product.tags && product.tags.length > 0 && (
//           <div className="mt-4 sm:mt-6">
//             <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm">
//               <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
//                 <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2b2a2a]" />
//                 Product Tags
//               </h3>
//               <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                 {product.tags.map((tag, idx) => {
//                   const tagName = getTagDisplayName(tag);
//                   const tagStyle = getTagDisplayStyle(tag);
//                   return (
//                     <span key={idx} className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-semibold ${tagStyle}`}>
//                       <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//                       {tagName}
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Colors */}
//         {hasColors && (
//           <div className="mt-4 sm:mt-6">
//             <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm">
//               <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
//                 <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2b2a2a]" />
//                 Available Colors
//               </h3>
//               <div className="flex flex-wrap gap-2 sm:gap-3">
//                 {product.colors.map((color, idx) => (
//                   <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
//                     <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-gray-200 shadow-sm" style={{ backgroundColor: color }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {showZoom && (
//           <ZoomModal
//             images={productImages}
//             currentIndex={activeImageIndex}
//             onClose={() => setShowZoom(false)}
//             onImageChange={(index) => {
//               setActiveImageIndex(index);
//               setShowZoom(true);
//             }}
//           />
//         )}
//       </AnimatePresence>

//       <style jsx global>{`
//         .rich-text-content { max-width: none; }
//         .rich-text-content h1 { font-size: 1.3em; font-weight: 600; margin: 0.5em 0 0.3em; color: #111827; }
//         .rich-text-content h2 { font-size: 1.1em; font-weight: 600; margin: 0.4em 0 0.2em; color: #111827; }
//         .rich-text-content h3 { font-size: 1em; font-weight: 600; margin: 0.3em 0 0.2em; color: #111827; }
//         .rich-text-content p { margin: 0.3em 0; line-height: 1.6; color: #4B5563; }
//         .rich-text-content ul, .rich-text-content ol { padding-left: 1.2em; margin: 0.3em 0; }
//         .rich-text-content li { margin: 0.1em 0; color: #4B5563; }
//         .rich-text-content a { color: #2563EB; text-decoration: underline; }
//         .rich-text-content strong { font-weight: 600; color: #111827; }
//         .rich-text-content em { font-style: italic; }
//         .rich-text-content blockquote { border-left: 3px solid #2563EB; padding-left: 0.8em; margin: 0.3em 0; color: #4B5563; font-style: italic; }
//         .rich-text-content img { max-width: 100%; height: auto; border-radius: 0.5rem; }
//         .rich-text-content table { width: 100%; border-collapse: collapse; margin: 0.5em 0; font-size: 0.9em; }
//         .rich-text-content th, .rich-text-content td { border: 1px solid #E5E7EB; padding: 0.3em 0.5em; text-align: left; color: #4B5563; }
//         .rich-text-content th { background-color: #F9FAFB; font-weight: 600; color: #111827; }
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }



'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  ImageIcon,
  Palette,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Gift,
  Sparkles,
  Users,
  Package,
  Tag,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
  Loader2,
  Eye,
  MessageCircle,
  FolderTree,
  Maximize2,
  Zap,
  Edit,
  Trash2,
  ArrowLeft,
  Calendar,
  User,
  DollarSign,
  TrendingUp,
  Building2,
  Box,
  Scale,
  List,
  Info,
  Award,
  Flame,
  Clock as ClockIcon,
  Flower2,
  HelpCircle,
  ChevronDown,
  Hash,
  FileText,
  LinkIcon,
  Layers,
  Barcode,
  Scan,
  Printer
} from 'lucide-react';

import { toast } from 'sonner';
import Script from 'next/script';

// ========== HELPER FUNCTIONS ==========
const getTagName = (tag) => {
  if (!tag) return '';
  if (typeof tag === 'string') return tag;
  if (typeof tag === 'object' && tag.name) return tag.name;
  return String(tag);
};

const formatPrice = (price) => (price || 0).toFixed(2);

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

const formatBangladeshTime = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-BD', {
    timeZone: 'Asia/Dhaka',
    hour12: false,
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

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

// ========== SKELETON ==========
const ProductSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <div className="animate-pulse">
          <div className="bg-white rounded-2xl h-64 sm:h-96 w-full border border-gray-200"></div>
        </div>
        <div className="space-y-3 sm:space-y-4 animate-pulse">
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 sm:h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-16 sm:h-24 bg-gray-200 rounded"></div>
          <div className="h-10 sm:h-12 bg-gray-200 rounded w-full"></div>
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

// ========== MAIN COMPONENT ==========
export default function AdminProductDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [isMobile, setIsMobile] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
  const [faqOpenStates, setFaqOpenStates] = useState({});
  const [copiedBarcode, setCopiedBarcode] = useState(false);
  const [jsBarcodeReady, setJsBarcodeReady] = useState(false);

  // Variant preview state
  const [variantPreviewImages, setVariantPreviewImages] = useState(null);
  const [previewVariantKey, setPreviewVariantKey] = useState(null);
  const [previewSubVariantKey, setPreviewSubVariantKey] = useState(null);

  const userRole = getUserRole();
  const isAdminOrSuperAdmin = userRole === 'super_admin' || userRole === 'admin';
  const isModerator = userRole === 'moderator';

  const galleryRef = useRef(null);
  const productDetailsBarcodeSvgRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ Track JsBarcode load
  useEffect(() => {
    const checkJsBarcode = () => {
      if (typeof window !== 'undefined' && window.JsBarcode) {
        setJsBarcodeReady(true);
      } else {
        setTimeout(checkJsBarcode, 200);
      }
    };
    checkJsBarcode();
  }, []);

  // ✅ Render fallback barcode in product details page
  useEffect(() => {
    if (!product?.barcode || product?.barcodeImageUrl) return;
    if (!jsBarcodeReady) return;
    if (!productDetailsBarcodeSvgRef.current) return;

    const renderBarcode = () => {
      if (typeof window !== 'undefined' && window.JsBarcode && productDetailsBarcodeSvgRef.current) {
        try {
          productDetailsBarcodeSvgRef.current.innerHTML = '';
          window.JsBarcode(productDetailsBarcodeSvgRef.current, product.barcode, {
            format: "CODE128",
            lineColor: "#000000",
            width: 2,
            height: 50,
            displayValue: true,
            fontSize: 12,
            margin: 10
          });
        } catch (e) {
          console.error('Barcode render failed:', e);
        }
      }
    };

    const timer = setTimeout(renderBarcode, 150);
    return () => clearTimeout(timer);
  }, [product?.barcode, product?.barcodeImageUrl, jsBarcodeReady]);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    } else {
      toast.error('No product ID provided');
      router.push('/authorize/all-products');
    }
  }, [productId]);

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
    if (product && product.faqs && product.faqs.length > 0) {
      const initialStates = {};
      product.faqs.forEach((_, index) => {
        initialStates[index] = false;
      });
      setFaqOpenStates(initialStates);
    }
  }, [product]);

  const toggleFaq = (index) => {
    setFaqOpenStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProduct(data.data.product);
      } else {
        toast.error('Product not found');
        router.push('/authorize/all-products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/authorize/editProduct?id=${productId}`);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Product deleted successfully');
        router.push('/authorize/all-products');
      } else {
        toast.error(data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const copyBarcodeToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedBarcode(true);
    setTimeout(() => setCopiedBarcode(false), 2000);
    toast.success('Barcode copied to clipboard');
  };

  const printBarcode = () => {
    if (!product?.barcode) return;
    
    const printWindow = window.open('', '_blank', 'width=500,height=400');
    if (!printWindow) {
      toast.error('Please allow popups to print');
      return;
    }

    const barcodeImageHtml = product.barcodeImageUrl
      ? `<img src="${product.barcodeImageUrl}" style="max-width:300px;height:auto;" />`
      : `<svg id="print-barcode"></svg>`;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode - ${product.productName}</title>
          <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\/script>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .product-name { font-size: 16px; font-weight: bold; margin-bottom: 10px; }
            .sku { font-size: 12px; color: #666; margin-bottom: 15px; }
            .barcode-container { margin: 20px 0; }
            .barcode-number { font-family: monospace; font-size: 14px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="product-name">${product.productName}</div>
          <div class="sku">SKU: ${product.skuCode || 'N/A'}</div>
          <div class="barcode-container">
            ${barcodeImageHtml}
          </div>
          <div class="barcode-number">${product.barcode}</div>
          <script>
            window.onload = function() {
              ${!product.barcodeImageUrl ? `
                if (window.JsBarcode) {
                  JsBarcode("#print-barcode", "${product.barcode}", {
                    format: "CODE128",
                    lineColor: "#000000",
                    width: 2,
                    height: 60,
                    displayValue: true,
                    fontSize: 14,
                    margin: 10
                  });
                }
              ` : ''}
              setTimeout(function() { window.print(); }, 500);
            };
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
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
      if (match && match[1]) return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
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
        callback(canvas.toDataURL('image/jpeg', 0.8));
      }, 100);
    });
    video.addEventListener('error', () => {
      console.error('Error loading video for thumbnail generation');
      callback(null);
    });
    video.load();
  };

  const getTagDisplayName = (tag) => {
    if (!tag) return '';
    if (typeof tag === 'string') return tag;
    if (typeof tag === 'object' && tag.name) return tag.name;
    return String(tag);
  };

  const getTagDisplayStyle = (tag) => {
    const tagName = getTagDisplayName(tag);
    const styles = {
      'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
      'Trending': 'bg-gradient-to-r from-[#2b2a2a] to-pink-800 text-white shadow-lg shadow-[#2b2a2a]/30',
      'New Release': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
      'Limited Offer': 'bg-gradient-to-r from-purple-500 to-[#2b2a2a] text-white shadow-lg shadow-purple-500/30',
      'Flash Sale': 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/30',
      'Clearance': 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg shadow-gray-500/30',
    };
    return styles[tagName] || 'bg-gradient-to-r from-[#2b2a2a] to-black text-white shadow-lg shadow-[#2b2a2a]/30';
  };

  const renderRichText = (html) => {
    if (!html || html === '<p></p>') return null;
    const cleanHtml = html.replace(/<p><\/p>/g, '');
    if (!cleanHtml.trim()) return null;
    return (
      <div
        className="rich-text-content text-[#64748B] text-sm sm:text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    );
  };

  const getAllImagesWithVariants = () => {
    if (!product) return [];
    const imageMap = new Map();

    (product.images || []).forEach((img) => {
      const url = typeof img === 'string' ? img : img?.url;
      if (url && !imageMap.has(url)) imageMap.set(url, { url, source: 'product' });
    });

    if (product.variantTypes) {
      product.variantTypes.forEach((vt) => {
        (vt.variants || []).forEach((variant) => {
          const variantImgs = [
            ...(variant.imagePreviews || []),
            ...(variant.images || [])
          ].filter(Boolean);
          variantImgs.forEach((img) => {
            const url = typeof img === 'string' ? img : img?.url;
            if (url && !imageMap.has(url)) imageMap.set(url, { url, source: 'variant' });
          });

          (variant.subVariants || []).forEach((sub) => {
            const subImgs = [
              ...(sub.imagePreviews || []),
              ...(sub.images || [])
            ].filter(Boolean);
            subImgs.forEach((img) => {
              const url = typeof img === 'string' ? img : img?.url;
              if (url && !imageMap.has(url)) imageMap.set(url, { url, source: 'subVariant' });
            });
          });
        });
      });
    }

    return Array.from(imageMap.values());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const variantArea = document.getElementById('variant-table-area');
      const galleryArea = document.getElementById('gallery-area');
      if (
        variantArea &&
        !variantArea.contains(event.target) &&
        galleryArea &&
        !galleryArea.contains(event.target)
      ) {
        setVariantPreviewImages(null);
        setPreviewVariantKey(null);
        setPreviewSubVariantKey(null);
        setActiveImageIndex(0);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) return <ProductSkeleton />;
  if (!product) return null;

  const discountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
  const currentPrice =
    product.discountPrice && product.discountPrice < product.regularPrice
      ? product.discountPrice
      : product.regularPrice;
  const stockStatus = getStockStatus(product.stockQuantity, product.stockAlertQuantity);
  const StockIcon = stockStatus.icon;

  const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';

  const allImagesWithVariants = getAllImagesWithVariants();

  const productImages = (variantPreviewImages && variantPreviewImages.length > 0)
    ? variantPreviewImages.map(url => ({ url }))
    : allImagesWithVariants;

  const mediaItems = [...productImages];
  if (hasVideo) {
    mediaItems.push({ type: 'video', url: product.videoUrl, videoType: product.videoType });
  }
  const mainMedia = mediaItems[activeImageIndex];
  const isMainVideo = mainMedia?.type === 'video';
  const mainImage = !isMainVideo ? mainMedia?.url : null;
  const mainVideoUrl = isMainVideo ? mainMedia?.url : null;
  const mainVideoType = isMainVideo ? mainMedia?.videoType : null;

  const categoryHierarchy = [];
  if (product.categoryName) categoryHierarchy.push(product.categoryName);
  if (product.subcategoryName) categoryHierarchy.push(product.subcategoryName);
  if (product.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

  const getPromotionStyles = (promotion) => {
    const styles = {
      'flash-sale': { label: '🔥 Flash Sale', bg: 'bg-gradient-to-r from-red-500 to-orange-500', text: 'text-white', icon: Zap },
      'new-arrival': { label: '✨ New Arrival', bg: 'bg-gradient-to-r from-emerald-500 to-teal-500', text: 'text-white', icon: Sparkles },
      'trending': { label: '📈 Trending', bg: 'bg-gradient-to-r from-purple-500 to-pink-500', text: 'text-white', icon: TrendingUp },
      'clearance': { label: '🏷️ Clearance', bg: 'bg-gradient-to-r from-yellow-500 to-orange-500', text: 'text-white', icon: Tag },
      'holiday-special': { label: '🎄 Holiday Special', bg: 'bg-gradient-to-r from-red-600 to-green-600', text: 'text-white', icon: Gift },
      'bundle-deal': { label: '📦 Bundle Deal', bg: 'bg-gradient-to-r from-pink-500 to-indigo-500', text: 'text-white', icon: Package },
      'limited-stock': { label: '⚠️ Limited Stock', bg: 'bg-gradient-to-r from-orange-500 to-red-500', text: 'text-white', icon: AlertCircle }
    };
    return styles[promotion] || null;
  };

  const promotionStyle = product.promotion ? getPromotionStyles(product.promotion) : null;
  const PromotionIcon = promotionStyle?.icon || Sparkles;

  const hasColors = product.colors && product.colors.length > 0;
  const hasVariants = product.hasVariants && product.variantTypes && product.variantTypes.length > 0;
  const hasAddOns = product.addOnes && product.addOnes.length > 0;

  const handleVariantImageClick = (variant, variantKey) => {
    const variantImgs = [
      ...(variant.imagePreviews || []),
      ...(variant.images || [])
    ].filter(Boolean).map(img => typeof img === 'string' ? img : img?.url).filter(Boolean);

    if (previewVariantKey === variantKey && !previewSubVariantKey) {
      setVariantPreviewImages(null);
      setPreviewVariantKey(null);
      setPreviewSubVariantKey(null);
      setActiveImageIndex(0);
      return;
    }

    setPreviewVariantKey(variantKey);
    setPreviewSubVariantKey(null);
    setVariantPreviewImages(variantImgs.length > 0 ? variantImgs : null);
    setActiveImageIndex(0);
  };

  const handleSubVariantImageClick = (subVariant, variant, variantKey, subKey) => {
    const subImgs = [
      ...(subVariant.imagePreviews || []),
      ...(subVariant.images || [])
    ].filter(Boolean).map(img => typeof img === 'string' ? img : img?.url).filter(Boolean);

    const variantImgs = [
      ...(variant.imagePreviews || []),
      ...(variant.images || [])
    ].filter(Boolean).map(img => typeof img === 'string' ? img : img?.url).filter(Boolean);

    if (previewSubVariantKey === subKey) {
      setPreviewSubVariantKey(null);
      setVariantPreviewImages(variantImgs.length > 0 ? variantImgs : null);
      setActiveImageIndex(0);
      return;
    }

    setPreviewVariantKey(variantKey);
    setPreviewSubVariantKey(subKey);
    setVariantPreviewImages(subImgs.length > 0 ? subImgs : (variantImgs.length > 0 ? variantImgs : null));
    setActiveImageIndex(0);
  };

  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"
        strategy="afterInteractive"
        onLoad={() => setJsBarcodeReady(true)}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6 lg:py-8 max-w-7xl">

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => window.location.href = '/authorize/all-products'}
                className="p-2 bg-white rounded-xl border border-gray-200 hover:border-[#2b2a2a] transition-all shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-[#2b2a2a]" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Product Details
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">View complete product information</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleEdit}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2b2a2a] text-white font-semibold rounded-lg hover:bg-black transition-all text-xs sm:text-sm shadow-md hover:shadow-lg"
              >
                <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Edit Product
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all text-xs sm:text-sm shadow-md hover:shadow-lg"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm mb-4 sm:mb-6 overflow-x-auto pb-1 sm:pb-2 scrollbar-hide">
            <Link href="/authorize/dashboard" className="text-gray-500 hover:text-[#2b2a2a] transition whitespace-nowrap">Dashboard</Link>
            <span className="text-gray-300">/</span>
            <Link href="/authorize/all-products" className="text-gray-500 hover:text-[#2b2a2a] transition whitespace-nowrap">Products</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium truncate max-w-[100px] sm:max-w-[150px]">
              {product.productName}
            </span>
          </nav>

          {/* Product Title Bar */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  {product.productName}
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1">
                  <p className="text-[10px] sm:text-xs text-gray-500">SKU: {product.skuCode}</p>
                  {product.brand && (
                    <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-gray-500">
                      <Building2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      {product.brand}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium ${
                  product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {product.isActive ? (
                    <><CheckCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> Active</>
                  ) : (
                    <><X className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> Inactive</>
                  )}
                </span>

                {product.comingSoon ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium bg-amber-100 text-amber-700 border border-amber-300">
                    <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    Coming Soon
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-300">
                    <CheckCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    Available
                  </span>
                )}

                <span className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium ${
                  stockStatus.color === 'green' ? 'bg-green-100 text-green-700' :
                  stockStatus.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  <StockIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  {stockStatus.label}
                </span>
                {product.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium bg-yellow-100 text-yellow-700">
                    <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    Featured
                  </span>
                )}
                {product.showOnBanner && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium bg-purple-100 text-purple-700">
                    <ImageIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    On Banner
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
            {/* LEFT COLUMN: Gallery + Variant Table */}
            <div className="lg:col-span-3" ref={galleryRef} id="gallery-area">
              <div className="sticky top-20 lg:top-24 space-y-4">
                {/* Main image */}
                <div className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div
                    className="relative bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden cursor-crosshair"
                    style={{ height: 'auto', minHeight: '280px' }}
                    onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={(e) => {
                      if (!isZoomed || isMainVideo || isMobile) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      setZoomPosition({
                        x: Math.min(Math.max(x, 0), 100),
                        y: Math.min(Math.max(y, 0), 100)
                      });
                    }}
                  >
                    <div className="relative w-full pt-[100%]">
                      {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-gray-50 animate-pulse z-10" />
                      )}

                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        {!isMainVideo && mainImage ? (
                          <img
                            key={activeImageIndex}
                            src={mainImage}
                            alt={product.productName}
                            className={`w-full h-full object-contain p-3 sm:p-4 bg-white transition-opacity duration-300 ${
                              imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{
                              transform: isZoomed && !isMobile ? 'scale(2.2)' : 'scale(1)',
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
                        ) : isMainVideo && mainVideoUrl ? (
                          mainVideoType === 'youtube' ? (
                            <iframe src={mainVideoUrl} className="w-full h-full aspect-square" allowFullScreen title="Product Video" />
                          ) : (
                            <video src={mainVideoUrl} controls className="w-full h-full object-contain bg-white" />
                          )
                        ) : null}
                      </div>
                    </div>

                    {!isMainVideo && !isMobile && !isZoomed && (
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/80 backdrop-blur-sm text-gray-700 text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 hover:opacity-100 transition-opacity shadow-lg border border-gray-200">
                          <ZoomIn className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
                          <span className="hidden xs:inline font-medium">Hover to zoom</span>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex gap-1 sm:gap-2 z-20">
                      {!isMainVideo && (
                        <button
                          onClick={() => setShowZoom(true)}
                          className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
                          aria-label="View fullscreen"
                        >
                          <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#2b2a2a]" />
                        </button>
                      )}
                    </div>

                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-20">
                      {activeImageIndex + 1} / {productImages.length}
                    </div>
                  </div>

                  {discountPercent > 0 && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#2b2a2a] text-white text-[8px] sm:text-[10px] md:text-sm font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
                      <Tag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      {discountPercent}% OFF
                    </div>
                  )}
                  {product.tags?.[0] && (
                    <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getTagDisplayStyle(product.tags[0])} text-[7px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1`}>
                      <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      {getTagDisplayName(product.tags[0])}
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-thin justify-start">
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
                      className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        activeImageIndex === idx ? 'border-[#2b2a2a] shadow-[0_0_0_3px_rgba(236,72,153,0.2)]' : 'border-gray-200 hover:border-pink-400'
                      }`}
                    >
                      <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
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
                      className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                        activeImageIndex === productImages.length ? 'border-[#2b2a2a] shadow-[0_0_0_3px_rgba(236,72,153,0.2)]' : 'border-gray-200 hover:border-pink-400'
                      }`}
                    >
                      {product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl) ? (
                        <img src={getYouTubeThumbnail(product.videoUrl)} alt="Video thumbnail" className="w-full h-full object-cover" />
                      ) : product.videoType !== 'youtube' && videoThumbnail ? (
                        <img src={videoThumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
                      ) : null}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  )}
                </div>

                {/* VARIANT TABLE */}
                {hasVariants && (
                  <div id="variant-table-area" className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50/60">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#2b2a2a]" />
                        <h3 className="text-sm font-bold text-gray-900">Product Variants</h3>
                      </div>
                      <span className="text-[10px] text-gray-500">
                        Click a variant to preview its image
                      </span>
                    </div>

                    <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                      {product.variantTypes.map((vt, vti) => {
                        const variants = vt.variants || [];
                        if (variants.length === 0) return null;

                        return (
                          <div key={vt.id || vt._id || vti} className="p-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                              {vt.type} ({variants.length})
                            </p>

                            <div className="space-y-2">
                              {variants.map((variant, vi) => {
                                const variantKey = `v-${vti}-${vi}`;
                                const vImage = variant.imagePreviews?.[0] || variant.images?.[0] || null;
                                const vColor = variant.color || null;
                                const vRegular = variant.regularPrice || 0;
                                const vDiscount = variant.discountPrice || 0;
                                const vHasDiscount = vDiscount > 0 && vDiscount < vRegular;
                                const isPreviewed = previewVariantKey === variantKey && !previewSubVariantKey;
                                const hasSubs = variant.subVariants && variant.subVariants.length > 0;

                                return (
                                  <div key={variant.id || variant._id || vi} className="space-y-1">
                                    <button
                                      type="button"
                                      onClick={() => handleVariantImageClick(variant, variantKey)}
                                      className={`w-full flex items-center gap-2 p-2 rounded-lg border transition-all text-left ${
                                        isPreviewed
                                          ? 'border-pink-500 [#c4d1be]/40 shadow-sm'
                                          : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-gray-50'
                                      }`}
                                    >
                                      <div className="flex-shrink-0">
                                        {vImage ? (
                                          <img src={vImage} alt={variant.name} className="w-10 h-10 rounded-md object-cover border border-gray-200 bg-white" />
                                        ) : vColor ? (
                                          <div className="w-10 h-10 rounded-md border border-gray-200" style={{ backgroundColor: vColor }} />
                                        ) : (
                                          <div className="w-10 h-10 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center">
                                            <Package className="w-4 h-4 text-gray-300" />
                                          </div>
                                        )}
                                      </div>

                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                          {vColor && (
                                            <div className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ backgroundColor: vColor }} />
                                          )}
                                          <p className="text-xs font-semibold text-gray-900 truncate">{variant.name}</p>
                                          {hasSubs && (
                                            <span className="text-[9px] font-semibold text-black [#c4d1be] border border-black px-1.5 rounded-full flex items-center gap-0.5">
                                              <Layers className="w-2 h-2" />
                                              {variant.subVariants.length}
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                                          {vHasDiscount ? (
                                            <>
                                              <span className="text-[#2b2a2a] font-bold">৳{formatPrice(vDiscount)}</span>
                                              <span className="text-gray-400 line-through">৳{formatPrice(vRegular)}</span>
                                            </>
                                          ) : (
                                            <span className="text-gray-900 font-bold">৳{formatPrice(vRegular)}</span>
                                          )}
                                          <span className="text-gray-500">Stock: {variant.stockQuantity || 0}</span>
                                        </div>
                                      </div>
                                    </button>

                                    {hasSubs && (
                                      <div className="pl-4 space-y-1">
                                        {variant.subVariants.map((sub, si) => {
                                          const subKey = `v-${vti}-${vi}-s-${si}`;
                                          const sImage = sub.imagePreviews?.[0] || sub.images?.[0] || null;
                                          const sColor = sub.color || null;
                                          const sRegular = sub.regularPrice || 0;
                                          const sDiscount = sub.discountPrice || 0;
                                          const sHasDiscount = sDiscount > 0 && sDiscount < sRegular;
                                          const isSubPreviewed = previewSubVariantKey === subKey;

                                          return (
                                            <button
                                              key={sub.id || sub._id || si}
                                              type="button"
                                              onClick={() => handleSubVariantImageClick(sub, variant, variantKey, subKey)}
                                              className={`w-full flex items-center gap-2 p-1.5 rounded-md border transition-all text-left ${
                                                isSubPreviewed
                                                  ? 'border-pink-500 [#c4d1be]/40'
                                                  : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-gray-50'
                                              }`}
                                            >
                                              <div className="flex-shrink-0">
                                                {sImage ? (
                                                  <img src={sImage} alt={sub.name} className="w-8 h-8 rounded-md object-cover border border-gray-200 bg-white" />
                                                ) : sColor ? (
                                                  <div className="w-8 h-8 rounded-md border border-gray-200" style={{ backgroundColor: sColor }} />
                                                ) : (
                                                  <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center">
                                                    <Package className="w-3.5 h-3.5 text-gray-300" />
                                                  </div>
                                                )}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1">
                                                  {sColor && (
                                                    <div className="w-2 h-2 rounded-full border border-gray-300" style={{ backgroundColor: sColor }} />
                                                  )}
                                                  <p className="text-[11px] font-medium text-gray-800 truncate">{sub.name}</p>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px]">
                                                  {sHasDiscount ? (
                                                    <>
                                                      <span className="text-[#2b2a2a] font-bold">৳{formatPrice(sDiscount)}</span>
                                                      <span className="text-gray-400 line-through">৳{formatPrice(sRegular)}</span>
                                                    </>
                                                  ) : (
                                                    <span className="text-gray-900 font-bold">৳{formatPrice(sRegular)}</span>
                                                  )}
                                                  <span className="text-gray-500">Stock: {sub.stockQuantity || 0}</span>
                                                </div>
                                              </div>
                                            </button>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Info */}
            <div className="lg:col-span-4 bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
              {/* Category hierarchy + brand + promotion */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                {categoryHierarchy.map((cat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs font-medium rounded-full [#c4d1be] text-black border border-black">
                    <FolderTree className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                    {cat}
                  </span>
                ))}
                {product.brand && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs font-medium rounded-full [#c4d1be] text-black border border-black">
                    <Building2 className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                    {product.brand}
                  </span>
                )}
                {promotionStyle && (
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[7px] sm:text-[10px] font-semibold ${promotionStyle.bg} ${promotionStyle.text} shadow-sm`}>
                    <PromotionIcon className="w-2 h-2 sm:w-3 sm:h-3" />
                    {promotionStyle.label}
                  </span>
                )}
              </div>

              {/* Title */}
              <div className="mb-3 sm:mb-4">
                <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">
                  {product.productName}
                </h1>
              </div>

              {/* Price */}
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-r from-pink-50 to-gray-50 rounded-xl border border-black">
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2b2a2a]">
                    ৳{formatPrice(currentPrice)}
                  </span>
                  {discountPercent > 0 && (
                    <>
                      <span className="text-sm sm:text-base text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white bg-[#2b2a2a] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                        <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
                        Save {discountPercent}%
                      </span>
                    </>
                  )}
                </div>
                {product.codAvailable && (
                  <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-green-600 text-[10px] sm:text-xs bg-green-50 inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                    <Truck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    <span>Cash on Delivery available</span>
                  </div>
                )}
              </div>

              {/* Short description */}
              <div className="mb-4 sm:mb-5 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200">
                {product.shortDescription && product.shortDescription !== '<p></p>' ? (
                  <div
                    className="text-[11px] sm:text-sm text-gray-600 leading-relaxed rich-text-content"
                    dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                  />
                ) : (
                  <p className="text-[11px] sm:text-sm text-gray-400 italic">
                    No short description available.
                  </p>
                )}
              </div>

              {/* Stock status */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full ${
                  stockStatus.color === 'green' ? 'bg-green-50 text-green-600' :
                  stockStatus.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                  'bg-red-50 text-red-600'
                }`}>
                  <StockIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{stockStatus.label}</span>
                  {stockStatus.label === 'In Stock' && (
                    <span className="text-[8px] sm:text-[10px] text-gray-500">({product.stockQuantity} available)</span>
                  )}
                  {stockStatus.label === 'Low Stock' && (
                    <span className="text-[8px] sm:text-[10px] text-orange-500">
                      (Only {product.stockQuantity} left - Alert at {product.stockAlertQuantity})
                    </span>
                  )}
                </div>
              </div>

              {product.stockAlertQuantity > 0 && (
                <div className="mb-4 p-2 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-[10px] sm:text-xs text-gray-600 flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
                    Stock Alert: Notify when stock reaches {product.stockAlertQuantity}
                  </p>
                </div>
              )}

           

              {/* Pricing summary */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                {product.packagingCost !== undefined && product.packagingCost !== null && (
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
                    <p className="text-[8px] sm:text-[10px] text-gray-500 flex items-center gap-1">
                      <Box className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
                      Packaging Cost
                    </p>
                    <p className="text-sm sm:text-base font-bold text-gray-900">
                      ৳{formatPrice(product.packagingCost)}
                    </p>
                  </div>
                )}
                {product.deliveryCost !== undefined && product.deliveryCost !== null && (
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
                    <p className="text-[8px] sm:text-[10px] text-gray-500 flex items-center gap-1">
                      <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
                      Delivery Cost
                    </p>
                    <p className="text-sm sm:text-base font-bold text-gray-900">
                      ৳{formatPrice(product.deliveryCost)}
                    </p>
                  </div>
                )}
                {isAdminOrSuperAdmin && product.buyingPrice > 0 && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-2 sm:p-3 border border-amber-200">
                    <p className="text-[8px] sm:text-[10px] text-amber-700 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" />
                      Buying Price
                    </p>
                    <p className="text-sm sm:text-base font-bold text-amber-800">
                      ৳{formatPrice(product.buyingPrice)}
                    </p>
                  </div>
                )}
                {!isModerator && product.costPerItem > 0 && (
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-200">
                    <p className="text-[8px] sm:text-[10px] text-gray-500 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
                      Cost Per Item
                    </p>
                    <p className="text-sm sm:text-base font-bold text-gray-900">
                      ৳{formatPrice(product.costPerItem)}
                    </p>
                  </div>
                )}
              </div>


                {/* Specs summary */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <p className="text-[8px] sm:text-[10px] text-gray-500">Unit</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <p className="text-[8px] sm:text-[10px] text-gray-500">SKU</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 font-mono">{product.skuCode}</p>
                </div>
              </div>

                 {/* ✅ BARCODE SECTION — Matches Scanner Page Style */}
              {product.barcode && (
                <div className="mb-4 p-3 sm:p-4 bg-gradient-to-r from-pink-50 to-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="p-1.5 bg-[#2b2a2a]/10 rounded-lg">
                        <Barcode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2b2a2a]" />
                      </div>
                      <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                        Product Barcode
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => copyBarcodeToClipboard(product.barcode)}
                        className="p-1.5 bg-white hover:bg-[#2b2a2a]/10 rounded-lg border border-black transition-colors"
                        title="Copy barcode"
                      >
                        {copiedBarcode ? (
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={printBarcode}
                        className="p-1.5 bg-white hover:bg-[#2b2a2a]/10 rounded-lg border border-black transition-colors"
                        title="Print barcode"
                      >
                        <Printer className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2b2a2a]" />
                      </button>
                    </div>
                  </div>

                  {/* Barcode Image — Same style as scanner page */}
                  <div className="bg-white p-3 sm:p-4 rounded-lg text-center border border-black/50">
                    {product.barcodeImageUrl ? (
                      <>
                        <img
                          src={product.barcodeImageUrl}
                          alt={`Barcode ${product.barcode}`}
                          className="mx-auto block"
                          style={{ maxWidth: '280px', height: 'auto' }}
                          onError={(e) => {
                            // If backend image fails, hide it so SVG can show
                            e.target.style.display = 'none';
                            const svg = document.getElementById('product-details-barcode-svg');
                            if (svg && window.JsBarcode) {
                              svg.style.display = 'block';
                              try {
                                window.JsBarcode(svg, product.barcode, {
                                  format: "CODE128",
                                  lineColor: "#000000",
                                  width: 2,
                                  height: 50,
                                  displayValue: true,
                                  fontSize: 12,
                                  margin: 10
                                });
                              } catch (err) {
                                console.error('Fallback barcode render failed:', err);
                              }
                            }
                          }}
                        />
                        <p className="text-[10px] sm:text-xs text-green-600 mt-2 font-medium">✓ Scannable barcode image</p>
                      </>
                    ) : (
                      <>
                        <svg
                          ref={productDetailsBarcodeSvgRef}
                          id="product-details-barcode-svg"
                          className="mx-auto block"
                          style={{ maxWidth: '280px' }}
                        ></svg>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-2">
                          {jsBarcodeReady ? 'Generated barcode' : 'Loading barcode...'}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Barcode number */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <code className="font-mono text-xs sm:text-sm font-semibold text-[#2b2a2a] bg-white px-2.5 py-1.5 rounded-lg border border-black">
                      {product.barcode}
                    </code>
                  </div>
                </div>
              )}

            

              {/* Delivery info */}
              {product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '' && (
                <div className="bg-gradient-to-r from-pink-50 to-gray-50 rounded-xl p-3 sm:p-4 border border-black mb-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Truck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#2b2a2a]" />
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      Delivery Information
                    </span>
                  </div>
                  <div className="rich-text-content text-gray-600 text-[10px] sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} />
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-black/50">
                    <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-gray-500">
                      <RotateCcw className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      <span>7 Days Return Policy</span>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-gray-500">
                      <ShieldCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      <span>Safe &amp; Secure</span>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-gray-500">
                      <Award className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      <span>Genuine Products</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tracking info */}
              {isAdminOrSuperAdmin && (
                <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                    <ClockIcon className="w-3.5 h-3.5 text-[#2b2a2a]" />
                    Product Tracking Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-start gap-1.5">
                      <User className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500">Created By</p>
                        <p className="font-medium text-gray-900 text-[11px]">
                          {product.createdBy?.name || product.createdBy?.email || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Calendar className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500">Created At</p>
                        <p className="font-medium text-gray-900 text-[11px]">
                          {formatBangladeshTime(product.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <User className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500">Last Updated By</p>
                        <p className="font-medium text-gray-900 text-[11px]">
                          {product.updatedBy?.name || product.updatedBy?.email || 'Not updated yet'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <ClockIcon className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500">Last Updated At</p>
                        <p className="font-medium text-gray-900 text-[11px]">
                          {product.lastUpdatedAt ? formatBangladeshTime(product.lastUpdatedAt) : 'Never updated'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-start gap-1.5">
                      <Building2 className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500">Product ID</p>
                        <p className="font-mono text-[10px] text-gray-400">{product._id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ADD-ONS SECTION */}
          {hasAddOns && (
            <div className="mt-6 sm:mt-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-[#2b2a2a] rounded-xl">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Add-On Products
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Products offered as add-ons with this item
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {product.addOnes.map((addOn, idx) => {
                    const addOnProduct = addOn.productId || addOn;
                    const id = addOnProduct._id || addOn.productId;
                    const image = addOnProduct.images?.[0]?.url || addOnProduct.images?.[0] || null;
                    const regular = Number(addOnProduct.regularPrice || 0);
                    const discount = Number(addOnProduct.discountPrice || 0);
                    const hasDiscount = discount > 0 && discount < regular;
                    const displayPrice = hasDiscount ? discount : regular;

                    return (
                      <div key={id || idx} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-pink-300 transition-colors">
                        <div className="flex-shrink-0">
                          {image ? (
                            <img src={image} alt={addOnProduct.productName} className="w-14 h-14 rounded-lg object-cover border border-gray-200" />
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-300" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {addOnProduct.productName}
                          </p>
                          {addOnProduct.skuCode && (
                            <p className="text-[10px] text-gray-500 mt-0.5 font-mono">SKU: {addOnProduct.skuCode}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {hasDiscount ? (
                              <>
                                <span className="text-sm font-bold text-[#2b2a2a]">৳{formatPrice(discount)}</span>
                                <span className="text-xs text-gray-400 line-through">৳{formatPrice(regular)}</span>
                                <span className="text-[9px] font-semibold text-white bg-[#2b2a2a] px-1.5 py-0.5 rounded">
                                  {calculateDiscountPercentage(regular, discount)}% OFF
                                </span>
                              </>
                            ) : (
                              <span className="text-sm font-bold text-gray-900">৳{formatPrice(regular)}</span>
                            )}
                          </div>
                        </div>

                        {addOnProduct.stockQuantity !== undefined && (
                          <div className="flex-shrink-0 text-right">
                            <p className="text-[10px] text-gray-500">Stock</p>
                            <p className={`text-sm font-bold ${addOnProduct.stockQuantity > 0 ? 'text-gray-900' : 'text-red-600'}`}>
                              {addOnProduct.stockQuantity || 0}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mt-6 sm:mt-10 md:mt-14">
            <div className="flex flex-wrap gap-0.5 sm:gap-1 border-b border-gray-200">
              {['details', 'specifications', 'additional', 'meta', 'faqs'].map(tab => {
                const labels = {
                  details: 'Description',
                  specifications: 'Specifications',
                  additional: 'Additional Info',
                  meta: 'SEO & Meta',
                  faqs: 'FAQs'
                };
                const icons = {
                  details: <FileText className="w-3.5 h-3.5" />,
                  specifications: <List className="w-3.5 h-3.5" />,
                  additional: <Info className="w-3.5 h-3.5" />,
                  meta: <Tag className="w-3.5 h-3.5" />,
                  faqs: <HelpCircle className="w-3.5 h-3.5" />
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 font-semibold text-[10px] sm:text-xs md:text-sm rounded-t-lg sm:rounded-t-xl transition-all flex items-center gap-1.5 ${
                      activeTab === tab
                        ? 'bg-white text-[#2b2a2a] border-t-2 border-l-2 border-r-2 border-black border-b-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {icons[tab]}
                    {labels[tab]}
                    {tab === 'faqs' && product.faqs && product.faqs.length > 0 && (
                      <span className="bg-pink-100 text-[#2b2a2a] text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                        {product.faqs.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-b-lg sm:rounded-b-xl rounded-tr-lg sm:rounded-tr-xl border border-t-0 border-gray-200 p-3 sm:p-4 md:p-6">
              {activeTab === 'details' && (
                <div className="rich-text-content text-gray-600 text-sm sm:text-base leading-relaxed">
                  {product.fullDescription && product.fullDescription !== '<p></p>' ? (
                    renderRichText(product.fullDescription)
                  ) : (
                    <p className="text-gray-400 italic">No description available.</p>
                  )}
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {[
                    { label: 'Brand', value: product.brand, icon: Building2 },
                    { label: 'Slug', value: product.slug || 'N/A', icon: LinkIcon },
                    { label: 'SKU', value: product.skuCode, icon: Package },
                    { label: 'Barcode', value: product.barcode || 'N/A', icon: Barcode },
                    { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
                    { label: 'Stock Alert', value: product.stockAlertQuantity > 0 ? `${product.stockAlertQuantity} units` : 'Not set', icon: AlertCircle },
                    { label: 'Category', value: product.categoryName, icon: FolderTree },
                    { label: 'Subcategory', value: product.subcategoryName || 'N/A', icon: FolderTree },
                    { label: 'Child Subcategory', value: product.childSubcategoryName || 'N/A', icon: FolderTree },
                    { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
                    { label: 'Regular Price', value: `৳${formatPrice(product.regularPrice)}`, icon: DollarSign },
                    { label: 'Discount Price', value: product.discountPrice > 0 ? `৳${formatPrice(product.discountPrice)}` : 'N/A', icon: Tag },
                    { label: 'Status', value: product.isActive ? 'Active' : 'Inactive', icon: CheckCircle },
                    { label: 'Availability', value: product.comingSoon ? 'Coming Soon' : 'Available', icon: Clock },
                    { label: 'Featured', value: product.isFeatured ? 'Yes' : 'No', icon: Star },
                    { label: 'Promotion', value: product.promotion || 'None', icon: Zap },
                    { label: 'Rating', value: product.rating > 0 ? `${product.rating} ⭐` : 'Not rated', icon: Star },
                    { label: 'Purchase Count', value: product.purchaseCount || 0, icon: ShoppingCart },
                    ...(isAdminOrSuperAdmin && product.buyingPrice > 0 ? [
                      { label: 'Buying Price', value: `৳${formatPrice(product.buyingPrice)}`, icon: DollarSign, isAdminOnly: true }
                    ] : []),
                    { label: 'Created At', value: formatBangladeshTime(product.createdAt), icon: Calendar },
                    { label: 'Created By', value: product.createdBy?.name || product.createdBy?.email || 'Unknown', icon: User },
                    { label: 'Last Updated', value: formatBangladeshTime(product.updatedAt), icon: ClockIcon },
                    ...(product.lastUpdatedAt ? [
                      { label: 'Last Updated By', value: product.updatedBy?.name || product.updatedBy?.email || 'Unknown', icon: User },
                      { label: 'Last Updated At', value: formatBangladeshTime(product.lastUpdatedAt), icon: ClockIcon }
                    ] : []),
                  ].filter(item => item.value && item.value !== 'N/A').map((item, idx) => (
                    <div key={idx} className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 ${item.isAdminOnly ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'} rounded-lg sm:rounded-xl border`}>
                      <div className={`p-1.5 sm:p-2 ${item.isAdminOnly ? 'bg-amber-100' : 'bg-pink-100'} rounded-full`}>
                        <item.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${item.isAdminOnly ? 'text-amber-600' : 'text-[#2b2a2a]'}`} />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-[10px] text-gray-500">{item.label}</p>
                        <p className={`font-medium ${item.isAdminOnly ? 'text-amber-700' : 'text-gray-900'} text-[10px] sm:text-xs md:text-sm`}>
                          {item.value || 'N/A'}
                        </p>
                        {item.isAdminOnly && (
                          <span className="text-[7px] sm:text-[8px] text-amber-500 bg-amber-100 px-1.5 py-0.5 rounded-full">Admin Only</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'additional' && (
                <>
                  {product.additionalInfo && product.additionalInfo.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                      {product.additionalInfo.map((info, idx) => (
                        <div key={`additional-${idx}`} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
                          <div className="p-1.5 sm:p-2 bg-pink-100 rounded-full">
                            <Info className="w-3 h-3 sm:w-4 sm:h-4 text-[#2b2a2a]" />
                          </div>
                          <div>
                            <p className="text-[8px] sm:text-[10px] text-gray-500">{info.fieldName}</p>
                            <p className="font-medium text-gray-900 text-[10px] sm:text-xs md:text-sm">{info.fieldValue}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 sm:py-8">
                      <Info className="w-8 h-8 sm:w-12 sm:h-12 text-pink-300 mx-auto mb-2 sm:mb-3" />
                      <p className="text-gray-500 text-sm">No additional information available</p>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'meta' && (
                <div className="space-y-3 sm:space-y-4">
                  {product.metaSettings?.metaTitle && (
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
                      <p className="text-[8px] sm:text-[10px] text-gray-500 mb-0.5 sm:mb-1">Meta Title</p>
                      <p className="font-medium text-gray-900 text-xs sm:text-sm">{product.metaSettings.metaTitle}</p>
                    </div>
                  )}
                  {product.metaSettings?.metaDescription && (
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
                      <p className="text-[8px] sm:text-[10px] text-gray-500 mb-0.5 sm:mb-1">Meta Description</p>
                      <p className="font-medium text-gray-900 text-xs sm:text-sm">{product.metaSettings.metaDescription}</p>
                    </div>
                  )}
                  {product.metaSettings?.metaKeywords && product.metaSettings.metaKeywords.length > 0 && (
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
                      <p className="text-[8px] sm:text-[10px] text-gray-500 mb-1 sm:mb-2">Meta Keywords</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {product.metaSettings.metaKeywords.map((keyword, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white rounded-md text-[8px] sm:text-xs text-gray-700 border border-gray-200">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {!product.metaSettings?.metaTitle && !product.metaSettings?.metaDescription && (!product.metaSettings?.metaKeywords || product.metaSettings.metaKeywords.length === 0) && (
                    <div className="text-center py-6 sm:py-8">
                      <Package className="w-8 h-8 sm:w-12 sm:h-12 text-pink-300 mx-auto mb-2 sm:mb-3" />
                      <p className="text-gray-500 text-sm">No SEO &amp; Meta settings available</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'faqs' && (
                <div>
                  {product.faqs && product.faqs.length > 0 ? (
                    <div>
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#2b2a2a] rounded-xl shadow-lg shadow-black">
                            <HelpCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h3>
                            <p className="text-sm text-gray-500">Customer questions and answers about this product</p>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                          <FileText className="w-4 h-4 text-[#2b2a2a]" />
                          <span>{product.faqs.length} questions</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {product.faqs.map((faq, index) => {
                          const isOpen = faqOpenStates[index] || false;
                          return (
                            <div key={index} className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                              isOpen ? 'border-[#a2b897] shadow-md shadow-[#cee0c5] bg-white' : 'border-gray-200 hover:border-black bg-white'
                            }`}>
                              <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                              >
                                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#cee0c5] text-[#2b2a2a] flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </span>
                                <span className="flex-1 font-semibold text-gray-900 text-base sm:text-lg">
                                  {faq.question}
                                </span>
                                <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                  <ChevronDown className="w-5 h-5 text-[#2b2a2a]" />
                                </div>
                              </button>

                              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-5 pb-4 pt-1 border-t border-pink-100/50">
                                  <div className="flex items-start gap-3 pl-11">
                                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#728269] mt-2"></div>
                                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-8 h-8 text-gray-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs Available</h3>
                      <p className="text-gray-500 text-sm">This product doesn't have any frequently asked questions yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mt-4 sm:mt-6">
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                  <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2b2a2a]" />
                  Product Tags
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {product.tags.map((tag, idx) => {
                    const tagName = getTagDisplayName(tag);
                    const tagStyle = getTagDisplayStyle(tag);
                    return (
                      <span key={idx} className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-semibold ${tagStyle}`}>
                        <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                        {tagName}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Colors */}
          {hasColors && (
            <div className="mt-4 sm:mt-6">
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                  <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2b2a2a]" />
                  Available Colors
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.colors.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-gray-200 shadow-sm" style={{ backgroundColor: color }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <AnimatePresence>
          {showZoom && (
            <ZoomModal
              images={productImages}
              currentIndex={activeImageIndex}
              onClose={() => setShowZoom(false)}
              onImageChange={(index) => {
                setActiveImageIndex(index);
                setShowZoom(true);
              }}
            />
          )}
        </AnimatePresence>

        <style jsx global>{`
          .rich-text-content { max-width: none; }
          .rich-text-content h1 { font-size: 1.3em; font-weight: 600; margin: 0.5em 0 0.3em; color: #111827; }
          .rich-text-content h2 { font-size: 1.1em; font-weight: 600; margin: 0.4em 0 0.2em; color: #111827; }
          .rich-text-content h3 { font-size: 1em; font-weight: 600; margin: 0.3em 0 0.2em; color: #111827; }
          .rich-text-content p { margin: 0.3em 0; line-height: 1.6; color: #4B5563; }
          .rich-text-content ul, .rich-text-content ol { padding-left: 1.2em; margin: 0.3em 0; }
          .rich-text-content li { margin: 0.1em 0; color: #4B5563; }
          .rich-text-content a { color: #2563EB; text-decoration: underline; }
          .rich-text-content strong { font-weight: 600; color: #111827; }
          .rich-text-content em { font-style: italic; }
          .rich-text-content blockquote { border-left: 3px solid #2563EB; padding-left: 0.8em; margin: 0.3em 0; color: #4B5563; font-style: italic; }
          .rich-text-content img { max-width: 100%; height: auto; border-radius: 0.5rem; }
          .rich-text-content table { width: 100%; border-collapse: collapse; margin: 0.5em 0; font-size: 0.9em; }
          .rich-text-content th, .rich-text-content td { border: 1px solid #E5E7EB; padding: 0.3em 0.5em; text-align: left; color: #4B5563; }
          .rich-text-content th { background-color: #F9FAFB; font-weight: 600; color: #111827; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </>
  );
}