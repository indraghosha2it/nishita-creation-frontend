
// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import Link from 'next/link';
// import { 
//   Search, 
//   Grid, 
//   List, 
//   SlidersHorizontal, 
//   X, 
//   Filter,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   Tag,
//   Users,
//   DollarSign,
//   Sparkles,
//   Eye, 
//   ShoppingCart,
//   ArrowLeft,
//   Package,
//   TrendingUp,
//   Palette,
//   Ruler,
//   FolderTree,
//   Gift,
//   Heart,
//   Truck,
//   Star,
//   Clock,
//   Zap,
//   Building2,
//   Box,
//   Scale,
//   AlertTriangle,
//   Flower2,
//   Flame
// } from 'lucide-react';
// import { toast } from 'sonner';
// import CartSidebar from '../components/CartSidebar';

// // Font constants - Beauty Bucket Style
// const FONT_FAMILY = " serif";
// const FONT_FAMILY_CURSIVE = "'Courgette', cursive";

// // Loading Bar Component
// const LoadingBar = ({ isVisible }) => {
//   return (
//     <div className={`fixed top-0 left-0 w-full h-0.5 bg-gray-200 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//       <div className="h-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] animate-loading-bar"></div>
//     </div>
//   );
// };

// // Helper functions
// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// const truncateText = (text, limit = 40) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// // ============================================================
// //  PRODUCT GRID CARD - Beauty Bucket Style
// // ============================================================
// // const ProductGridCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [cartStatusLoading, setCartStatusLoading] = useState(false);
// //   const [isMobile, setIsMobile] = useState(false);
// //   const [isInCart, setIsInCart] = useState(propIsInCart || false);
// //   const [imageErrors, setImageErrors] = useState({});
// //   const [isCartHovered, setIsCartHovered] = useState(false);

// //   // Safe data extraction
// //   const productId = product?._id || product?.id || 'unknown';
// //   const productName = product?.productName || product?.name || 'Product';
// //   const regularPrice = Number(product?.regularPrice || product?.price || 0);
// //   const discountPrice = Number(product?.discountPrice || 0);
// //   const stockQuantity = Number(product?.stockQuantity || 0);

// //   // Brand
// //   const brand = product?.brand
// //     ? typeof product.brand === 'string'
// //       ? product.brand
// //       : product.brand?.name || product.brand?.title || 'General'
// //     : product?.brandName || 'General';

// //   // Images
// //   let productImages = [];
// //   if (product?.images && Array.isArray(product.images)) {
// //     productImages = product.images
// //       .map((img) => {
// //         if (typeof img === 'string') return img;
// //         if (img?.url) return img.url;
// //         return null;
// //       })
// //       .filter(Boolean);
// //   }
// //   if (productImages.length === 0 && product?.image) {
// //     productImages = [typeof product.image === 'string' ? product.image : product.image?.url || ''].filter(Boolean);
// //   }
// //   if (productImages.length === 0) {
// //     productImages = ['/placeholder-product.jpg'];
// //   }

// //   // Tags
// //   let tagNames = [];
// //   if (product?.tags && Array.isArray(product.tags)) {
// //     tagNames = product.tags
// //       .map((tag) => {
// //         if (typeof tag === 'string') return tag;
// //         if (tag?.name) return tag.name;
// //         return null;
// //       })
// //       .filter(Boolean);
// //   }
// //   const primaryTag = tagNames[0] || null;

// //   // Price & discount
// //   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
// //   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
// //   const originalPrice = regularPrice;

// //   // Stock
// //   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
// //   const isOutOfStock = stockQuantity <= 0;

// //   // Rating
// //   const rating = product?.rating ? Number(product.rating) : 4.7;
// //   const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
// //   const fullStars = Math.floor(rating);
// //   const hasHalfStar = rating - fullStars >= 0.5;

// //   const hasMultipleImages = productImages.length > 1;

// //   // Mobile detection
// //   useEffect(() => {
// //     const checkMobile = () => {
// //       setIsMobile(window.innerWidth < 768);
// //     };
// //     checkMobile();
// //     window.addEventListener('resize', checkMobile);
// //     return () => window.removeEventListener('resize', checkMobile);
// //   }, []);

// //   useEffect(() => {
// //     setIsInCart(propIsInCart || false);
// //   }, [propIsInCart]);

// //   // Image navigation
// //   const nextImage = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (hasMultipleImages) {
// //       setActiveIndex((prev) => (prev + 1) % productImages.length);
// //     }
// //   };

// //   const prevImage = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (hasMultipleImages) {
// //       setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
// //     }
// //   };

// //   const goToImage = (e, index) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setActiveIndex(index);
// //   };

// //   const handleImageError = (index) => {
// //     setImageErrors((prev) => ({ ...prev, [index]: true }));
// //   };

// //   const getCurrentImage = () => {
// //     const image = productImages[activeIndex] || productImages[0];
// //     if (imageErrors[activeIndex]) {
// //       return '/placeholder-product.jpg';
// //     }
// //     return image;
// //   };

// //   // Add to cart
// //   const handleAddToCart = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();

// //     if (isInCart) {
// //       if (onViewInCart) onViewInCart();
// //       return;
// //     }

// //     if (isOutOfStock) {
// //       toast.error('Product is out of stock!');
// //       return;
// //     }

// //     setCartStatusLoading(true);
// //     const toastId = toast.loading('Adding to cart...');

// //     try {
// //       const token = localStorage.getItem('token');
// //       let sessionId = localStorage.getItem('cartSessionId');

// //       const headers = { 'Content-Type': 'application/json' };

// //       if (!token && !sessionId) {
// //         sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
// //         localStorage.setItem('cartSessionId', sessionId);
// //       }

// //       if (token) {
// //         headers['Authorization'] = `Bearer ${token}`;
// //       } else if (sessionId) {
// //         headers['x-session-id'] = sessionId;
// //       }

// //       const response = await fetch('http://localhost:5000/api/cart', {
// //         method: 'POST',
// //         headers,
// //         body: JSON.stringify({ productId: productId, quantity: 1 })
// //       });

// //       const data = await response.json();

// //       if (data.success) {
// //         if (data.sessionId && !token) {
// //           localStorage.setItem('cartSessionId', data.sessionId);
// //         }
// //         toast.success('Added to cart!', { id: toastId });
// //         setIsInCart(true);
// //         window.dispatchEvent(new Event('cart-update'));
// //       } else {
// //         toast.error(data.error || 'Failed to add to cart', { id: toastId });
// //       }
// //     } catch (error) {
// //       console.error('Add to cart error:', error);
// //       toast.error('Network error. Please try again.', { id: toastId });
// //     } finally {
// //       setCartStatusLoading(false);
// //     }
// //   };

// //   // Render stars
// //   const renderStars = () => {
// //     const stars = [];
// //     for (let i = 0; i < 5; i++) {
// //       if (i < fullStars) {
// //         stars.push(<Star key={i} className="h-3 w-3 fill-current text-yellow-400" />);
// //       } else if (i === fullStars && hasHalfStar) {
// //         stars.push(
// //           <div key={i} className="relative h-3 w-3">
// //             <Star className="absolute h-3 w-3 text-gray-200" />
// //             <div className="absolute left-0 top-0 h-3 w-1/2 overflow-hidden">
// //               <Star className="h-3 w-3 fill-current text-yellow-400" />
// //             </div>
// //           </div>
// //         );
// //       } else {
// //         stars.push(<Star key={i} className="h-3 w-3 text-[#F7C7D3]" />);
// //       }
// //     }
// //     return stars;
// //   };

// //   // Navigate to product page
// //   const navigateToProduct = () => {
// //     router.push(`/product/${product.slug || product._id}`);
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true }}
// //       transition={{ duration: 0.4 }}
// //       className="group w-full"
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //     >
// //       <Link
// //         href={`/product/${product.slug || product._id}`}
// //         className="block h-full"
// //       >
// //         <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#F7C7D3]/30 bg-white p-2 shadow-[0_2px_9px_rgba(238,66,117,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EE4275]/50 hover:shadow-[0_18px_40px_rgba(238,66,117,0.12)]">
          
// //           {/* ===== IMAGE SECTION ===== */}
// //           <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#F7C7D3]/10 to-[#EE4275]/5">
// //             <div className="relative aspect-square w-full overflow-hidden">
// //               <img
// //                 src={getCurrentImage()}
// //                 alt={productName}
// //                 className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
// //                 onError={() => handleImageError(activeIndex)}
// //                 loading="lazy"
// //               />

// //               {/* Discount Badge - Zigzag with shimmer */}
// //               {discountPercent > 0 && (
// //                 <motion.div
// //                   className="absolute left-2 top-2 z-10"
// //                   animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
// //                   transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
// //                 >
// //                   <div
// //                     className="relative flex h-12 w-10 items-start justify-center overflow-hidden bg-[#EE4275] px-1 pt-2 text-center text-[9px] font-bold uppercase leading-[0.9] tracking-wide text-white"
// //                     style={{
// //                       clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
// //                       fontFamily: FONT_FAMILY
// //                     }}
// //                   >
// //                     {isHovered && (
// //                       <motion.div
// //                         className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
// //                         initial={{ x: '-100%' }}
// //                         animate={{ x: '200%' }}
// //                         transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
// //                       />
// //                     )}
// //                     <span className="relative z-10 block leading-tight">
// //                       {discountPercent}%<br />OFF
// //                     </span>
// //                   </div>
// //                 </motion.div>
// //               )}

// //               {/* Tag Badge */}
// //               {primaryTag && (
// //                 <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded bg-gradient-to-r from-[#EE4275]/80 to-[#FF6B9D]/80 px-2 py-1 text-[9px] font-medium text-white backdrop-blur-sm">
// //                   <Sparkles className="h-2.5 w-2.5" />
// //                   <span style={{ fontFamily: FONT_FAMILY }}>{primaryTag}</span>
// //                 </div>
// //               )}

// //               {/* Out of Stock Overlay */}
// //               {isOutOfStock && (
// //                 <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/60">
// //                   <span className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
// //                     Out of Stock
// //                   </span>
// //                 </div>
// //               )}

// //               {/* Low Stock Badge */}
// //               {!isOutOfStock && isLowStock && (
// //                 <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded bg-orange-500 px-2 py-1 text-[9px] font-medium text-white">
// //                   <AlertTriangle className="h-2.5 w-2.5" />
// //                   <span style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
// //                 </div>
// //               )}

// //               {/* Desktop Hover Actions */}
// //               {!isMobile && (
// //                 <div className={`absolute right-2 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}>
// //                   <motion.button
// //                     type="button"
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.9 }}
// //                     onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToProduct(); }}
// //                     className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white text-gray-700 shadow-md transition-all hover:bg-[#EE4275] hover:text-white"
// //                     aria-label="View product"
// //                   >
// //                     <Eye className="h-3.5 w-3.5" />
// //                   </motion.button>
// //                   <motion.button
// //                     type="button"
// //                     onClick={handleAddToCart}
// //                     disabled={isOutOfStock || cartStatusLoading}
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.9 }}
// //                     className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white shadow-md transition-all hover:bg-[#EE4275] hover:text-white ${cartStatusLoading ? 'pointer-events-none opacity-50' : ''}`}
// //                     aria-label="Add to cart"
// //                   >
// //                     {cartStatusLoading ? (
// //                       <Loader2 className="h-3.5 w-3.5 animate-spin" />
// //                     ) : isInCart ? (
// //                       <ShoppingCart className="h-3.5 w-3.5 text-green-500" />
// //                     ) : (
// //                       <ShoppingCart className="h-3.5 w-3.5" />
// //                     )}
// //                   </motion.button>
// //                 </div>
// //               )}

// //               {/* Mobile Actions */}
// //               {isMobile && (
// //                 <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-2">
// //                   <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white/90 shadow-md backdrop-blur-sm">
// //                     <Eye className="h-3.5 w-3.5 text-gray-700" />
// //                   </div>
// //                   <div
// //                     onClick={handleAddToCart}
// //                     className={`flex h-8 w-8 items-center justify-center rounded-full border bg-white/90 shadow-md backdrop-blur-sm ${isOutOfStock ? 'border-gray-200 bg-gray-100' : 'border-[#F7C7D3]/30'}`}
// //                   >
// //                     {cartStatusLoading ? (
// //                       <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-500" />
// //                     ) : (
// //                       <ShoppingCart className={`h-3.5 w-3.5 ${isInCart ? 'text-[#EE4275]' : 'text-black'}`} />
// //                     )}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Image Navigation - Arrows & Dots */}
// //               {hasMultipleImages && (
// //                 <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
// //                   <motion.button
// //                     type="button"
// //                     onClick={prevImage}
// //                     className="rounded-full p-0.5"
// //                     aria-label="Previous image"
// //                     whileHover={{ scale: 1.2 }}
// //                     whileTap={{ scale: 0.9 }}
// //                   >
// //                     <ChevronLeft className="h-4 w-4 text-[#EE4275]" />
// //                   </motion.button>
// //                   <div className="flex items-center gap-1.5">
// //                     {productImages.map((_, index) => (
// //                       <motion.button
// //                         key={index}
// //                         type="button"
// //                         onClick={(e) => goToImage(e, index)}
// //                         className={`rounded-full transition-all duration-200 ${activeIndex === index ? 'h-2 w-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]' : 'h-1.5 w-1.5 bg-[#F7C7D3]/60 hover:bg-[#EE4275]/50'}`}
// //                         whileHover={{ scale: 1.3 }}
// //                         aria-label={`Go to image ${index + 1}`}
// //                       />
// //                     ))}
// //                   </div>
// //                   <motion.button
// //                     type="button"
// //                     onClick={nextImage}
// //                     className="rounded-full p-0.5"
// //                     aria-label="Next image"
// //                     whileHover={{ scale: 1.2 }}
// //                     whileTap={{ scale: 0.9 }}
// //                   >
// //                     <ChevronRight className="h-4 w-4 text-[#FF6B9D]" />
// //                   </motion.button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* ===== PRODUCT INFO ===== */}
// //           <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
// //             {/* Brand + Stock Status */}
// //             <div className="mb-1 flex items-center justify-between gap-2">
// //               <span className="min-w-0 truncate text-[8px] font-semibold uppercase tracking-[0.12em] text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
// //                 {brand}
// //               </span>
// //               <div className="flex shrink-0 items-center gap-1">
// //                 <span className={`h-1.5 w-1.5 rounded-full ${stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
// //                 <span className={`text-[8px] font-medium ${stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`} style={{ fontFamily: FONT_FAMILY }}>
// //                   {stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Product Name */}
// //             <h3
// //               className="min-h-[34px] line-clamp-2 text-[13px] font-semibold leading-[1.3] text-gray-800 transition-colors group-hover:text-[#EE4275]"
// //               style={{ fontFamily: FONT_FAMILY }}
// //               title={productName}
// //             >
// //               {truncateText(productName, 45)}
// //             </h3>

// //             {/* Rating */}
// //             <div className="mt-2 flex items-center gap-1.5">
// //               <div className="flex items-center gap-0.5">{renderStars()}</div>
// //               <span className="text-[9px] font-medium text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
// //                 {rating.toFixed(1)}
// //               </span>
// //               {reviewCount > 0 && (
// //                 <>
// //                   <span className="text-gray-300">•</span>
// //                   <span className="text-[9px] text-gray-400" style={{ fontFamily: FONT_FAMILY }}>
// //                     {reviewCount} reviews
// //                   </span>
// //                 </>
// //               )}
// //             </div>

// //             {/* Divider */}
// //             <div className="my-2.5 h-px bg-gradient-to-r from-[#F7C7D3]/30 to-transparent" />

// //             {/* Price + Cart */}
// //             <div className="mt-auto flex items-center justify-between gap-2 pt-1">
// //               <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap">
// //                 <span className="text-[15px] font-bold tracking-tight text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
// //                   ৳{formatPrice(currentPrice)}
// //                 </span>
// //                 {discountPercent > 0 && (
// //                   <span className="text-[8px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
// //                     ৳{formatPrice(originalPrice)}
// //                   </span>
// //                 )}
// //                 {discountPercent > 0 && (
// //                   <span className="text-[8px] font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-1 py-0.5 rounded" style={{ fontFamily: FONT_FAMILY }}>
// //                     Save {discountPercent}%
// //                   </span>
// //                 )}
// //               </div>
// //               <motion.button
// //                 type="button"
// //                 onClick={handleAddToCart}
// //                 disabled={isOutOfStock || cartStatusLoading}
// //                 onMouseEnter={() => setIsCartHovered(true)}
// //                 onMouseLeave={() => setIsCartHovered(false)}
// //                 whileHover={!isOutOfStock ? { scale: 1.08 } : {}}
// //                 whileTap={!isOutOfStock ? { scale: 0.92 } : {}}
// //                 animate={isCartHovered && !isOutOfStock ? { rotate: [0, -10, 10, -6, 6, 0] } : {}}
// //                 transition={{ duration: 0.5 }}
// //                 aria-label={isInCart ? 'View cart' : 'Add to cart'}
// //                 className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
// //                   isInCart
// //                     ? 'bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white shadow-[0_4px_12px_rgba(168,8,131,0.22)]'
// //                     : isOutOfStock
// //                     ? 'cursor-not-allowed bg-gray-100 text-gray-300'
// //                     : 'border border-[#F7C7D3] bg-white text-[#EE4275] hover:border-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:shadow-[0_4px_12px_rgba(238,66,117,0.18)]'
// //                 }`}
// //               >
// //                 {cartStatusLoading ? (
// //                   <Loader2 className="h-3.5 w-3.5 animate-spin" />
// //                 ) : (
// //                   <ShoppingCart className="h-3.5 w-3.5" />
// //                 )}
// //               </motion.button>
// //             </div>
// //           </div>
// //         </article>
// //       </Link>
// //     </motion.div>
// //   );
// // };

// const ProductGridCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [imageErrors, setImageErrors] = useState({});
//   const [isCartHovered, setIsCartHovered] = useState(false);

//   // Safe data extraction
//   const productId = product?._id || product?.id || 'unknown';
//   const productName = product?.productName || product?.name || 'Product';
//   const regularPrice = Number(product?.regularPrice || product?.price || 0);
//   const discountPrice = Number(product?.discountPrice || 0);
//   const stockQuantity = Number(product?.stockQuantity || 0);

//   // Brand
//   const brand = product?.brand
//     ? typeof product.brand === 'string'
//       ? product.brand
//       : product.brand?.name || product.brand?.title || 'General'
//     : product?.brandName || 'General';

//   // Images
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

//   // Tags
//   let tagNames = [];
//   if (product?.tags && Array.isArray(product.tags)) {
//     tagNames = product.tags
//       .map((tag) => {
//         if (typeof tag === 'string') return tag;
//         if (tag?.name) return tag.name;
//         return null;
//       })
//       .filter(Boolean);
//   }
//   const primaryTag = tagNames[0] || null;

//   // Price & discount
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;

//   // Stock
//   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;

//   // Rating
//   const rating = product?.rating ? Number(product.rating) : 4.7;
//   const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;

//   const hasMultipleImages = productImages.length > 1;

//   // Mobile detection
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

//   // Image navigation
//   const nextImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev + 1) % productImages.length);
//     }
//   };

//   const prevImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
//     }
//   };

//   const goToImage = (e, index) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setActiveIndex(index);
//   };

//   const handleImageError = (index) => {
//     setImageErrors((prev) => ({ ...prev, [index]: true }));
//   };

//   const getCurrentImage = () => {
//     const image = productImages[activeIndex] || productImages[0];
//     if (imageErrors[activeIndex]) {
//       return '/placeholder-product.jpg';
//     }
//     return image;
//   };

//   // Add to cart
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

//   // Render stars
//   const renderStars = () => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Star key={i} className="h-3 w-3 fill-current text-yellow-400" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-3 w-3">
//             <Star className="absolute h-3 w-3 text-gray-200" />
//             <div className="absolute left-0 top-0 h-3 w-1/2 overflow-hidden">
//               <Star className="h-3 w-3 fill-current text-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-3 w-3 text-[#F7C7D3]" />);
//       }
//     }
//     return stars;
//   };

//   // Navigate to product page
//   const navigateToProduct = () => {
//     router.push(`/product/${product.slug || product._id}`);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className="group w-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Link
//         href={`/product/${product.slug || product._id}`}
//         className="block h-full"
//       >
//         <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#EE4275]/20 bg-white p-2 shadow-[0_2px_9px_rgba(238,66,117,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EE4275]/50 hover:shadow-[0_18px_40px_rgba(238,66,117,0.12)]">
          
//           {/* ===== IMAGE SECTION ===== */}
//           <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#F7C7D3]/10 to-[#EE4275]/5">
//             <div className="relative aspect-square w-full overflow-hidden">
//               <img
//                 src={getCurrentImage()}
//                 alt={productName}
//                 className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
//                 onError={() => handleImageError(activeIndex)}
//                 loading="lazy"
//               />

//               {/* Discount Badge - Always visible on image */}
//               {discountPercent > 0 && (
//                 <motion.div
//                   className="absolute left-1.5 top-1.5 z-10"
//                   animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
//                   transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
//                 >
//                   <div
//                     className="relative flex h-10 sm:h-12 w-8 sm:w-10 items-start justify-center overflow-hidden bg-[#EE4275] px-0.5 sm:px-1 pt-1 sm:pt-2 text-center text-[7px] sm:text-[9px] font-bold uppercase leading-[0.8] sm:leading-[0.9] tracking-wide text-white"
//                     style={{
//                       clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
//                       fontFamily: FONT_FAMILY
//                     }}
//                   >
//                     {isHovered && (
//                       <motion.div
//                         className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                         initial={{ x: '-100%' }}
//                         animate={{ x: '200%' }}
//                         transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
//                       />
//                     )}
//                     <span className="relative z-10 block leading-tight">
//                       {discountPercent}%<br />OFF
//                     </span>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Tag Badge - Make smaller on mobile */}
//               {primaryTag && (
//                 <div className="absolute right-1.5 top-1.5 z-10 flex items-center gap-0.5 sm:gap-1 rounded bg-gradient-to-r from-[#EE4275]/80 to-[#FF6B9D]/80 px-1 sm:px-2 py-0.5 sm:py-1 text-[6px] sm:text-[9px] font-medium text-white backdrop-blur-sm">
//                   <Sparkles className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" />
//                   <span className="truncate max-w-[25px] sm:max-w-none" style={{ fontFamily: FONT_FAMILY }}>
//                     {primaryTag}
//                   </span>
//                 </div>
//               )}

//               {/* Out of Stock Overlay */}
//               {isOutOfStock && (
//                 <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/60">
//                   <span className="rounded-full bg-black px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
//                     Out of Stock
//                   </span>
//                 </div>
//               )}

//               {/* Low Stock Badge - Make smaller on mobile */}
//               {!isOutOfStock && isLowStock && (
//                 <div className="absolute bottom-2 left-2 z-10 flex items-center gap-0.5 sm:gap-1 rounded bg-orange-500 px-1 sm:px-2 py-0.5 sm:py-1 text-[7px] sm:text-[9px] font-medium text-white">
//                   <AlertTriangle className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" />
//                   <span className="hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
//                   <span className="xs:hidden" style={{ fontFamily: FONT_FAMILY }}>{stockQuantity} left</span>
//                 </div>
//               )}

//               {/* Desktop Hover Actions - Keep as is */}
//               {!isMobile && (
//                 <div className={`absolute right-2 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}>
//                   <motion.button
//                     type="button"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToProduct(); }}
//                     className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white text-gray-700 shadow-md transition-all hover:bg-[#EE4275] hover:text-white"
//                     aria-label="View product"
//                   >
//                     <Eye className="h-3.5 w-3.5" />
//                   </motion.button>
//                   <motion.button
//                     type="button"
//                     onClick={handleAddToCart}
//                     disabled={isOutOfStock || cartStatusLoading}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white shadow-md transition-all hover:bg-[#EE4275] hover:text-white ${cartStatusLoading ? 'pointer-events-none opacity-50' : ''}`}
//                     aria-label="Add to cart"
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                     ) : isInCart ? (
//                       <ShoppingCart className="h-3.5 w-3.5 text-green-500" />
//                     ) : (
//                       <ShoppingCart className="h-3.5 w-3.5" />
//                     )}
//                   </motion.button>
//                 </div>
//               )}

//               {/* Mobile Actions - Smaller & Positioned Lower */}
//               {isMobile && (
//                 <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-2">
//                   <button
//                     type="button"
//                     onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToProduct(); }}
//                     className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm border border-[#F7C7D3]/30"
//                     aria-label="View product"
//                   >
//                     <Eye className="h-2.5 w-2.5 text-gray-700" />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleAddToCart}
//                     disabled={isOutOfStock || cartStatusLoading}
//                     className={`flex h-6 w-6 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm border ${isOutOfStock ? 'border-gray-200 bg-gray-100/80' : 'border-[#F7C7D3]/30'}`}
//                     aria-label="Add to cart"
//                   >
//                     {cartStatusLoading ? (
//                       <Loader2 className="h-2.5 w-2.5 animate-spin text-gray-500" />
//                     ) : (
//                       <ShoppingCart className={`h-2.5 w-2.5 ${isInCart ? 'text-[#EE4275]' : 'text-gray-700'}`} />
//                     )}
//                   </button>
//                 </div>
//               )}

//               {/* Image Navigation - Arrows & Dots */}
//               {hasMultipleImages && (
//                 <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 sm:gap-2">
//                   <motion.button
//                     type="button"
//                     onClick={prevImage}
//                     className="rounded-full p-0.5"
//                     aria-label="Previous image"
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-[#EE4275]" />
//                   </motion.button>
//                   <div className="flex items-center gap-1 sm:gap-1.5">
//                     {productImages.map((_, index) => (
//                       <motion.button
//                         key={index}
//                         type="button"
//                         onClick={(e) => goToImage(e, index)}
//                         className={`rounded-full transition-all duration-200 ${activeIndex === index ? 'h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]' : 'h-1 w-1 sm:h-1.5 sm:w-1.5 bg-[#F7C7D3]/60 hover:bg-[#EE4275]/50'}`}
//                         whileHover={{ scale: 1.3 }}
//                         aria-label={`Go to image ${index + 1}`}
//                       />
//                     ))}
//                   </div>
//                   <motion.button
//                     type="button"
//                     onClick={nextImage}
//                     className="rounded-full p-0.5"
//                     aria-label="Next image"
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-[#FF6B9D]" />
//                   </motion.button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ===== PRODUCT INFO ===== */}
//           <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
//             {/* Brand + Stock Status */}
//             <div className="mb-1 flex items-center justify-between gap-2">
//               <span className="min-w-0 truncate text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.12em] text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
//                 {brand}
//               </span>
//               <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
//                 <span className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full ${stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
//                 <span className={`text-[6px] sm:text-[8px] font-medium ${stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`} style={{ fontFamily: FONT_FAMILY }}>
//                   {stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>
//             </div>

//             {/* Product Name */}
//             <h3
//               className="min-h-[30px] sm:min-h-[34px] line-clamp-2 text-[11px] sm:text-[13px] font-semibold leading-[1.3] text-gray-800 transition-colors group-hover:text-[#EE4275]"
//               style={{ fontFamily: FONT_FAMILY }}
//               title={productName}
//             >
//               {truncateText(productName, 35)}
//             </h3>

//             {/* Rating */}
//             <div className="mt-1.5 sm:mt-2 flex items-center gap-1 sm:gap-1.5">
//               <div className="flex items-center gap-0.5">
//                 {renderStars().map((star, index) => (
//                   <span key={index} className="scale-75 sm:scale-100">
//                     {star}
//                   </span>
//                 ))}
//               </div>
//               <span className="text-[8px] sm:text-[9px] font-medium text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
//                 {rating.toFixed(1)}
//               </span>
//               {reviewCount > 0 && (
//                 <>
//                   <span className="text-gray-300 hidden xs:inline">•</span>
//                   <span className="text-[7px] sm:text-[9px] text-gray-400 hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>
//                     {reviewCount} reviews
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* Divider */}
//             <div className="my-2 sm:my-2.5 h-px bg-gradient-to-r from-[#F7C7D3]/30 to-transparent" />

//             {/* Price + Cart - Hide discount badge on mobile in details */}
//             <div className="mt-auto flex items-center justify-between gap-2 pt-1">
//               <div className="flex min-w-0 items-center gap-1 sm:gap-1.5 whitespace-nowrap">
//                 <span className="text-[13px] sm:text-[15px] font-bold tracking-tight text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
//                   ৳{formatPrice(currentPrice)}
//                 </span>
//                 {discountPercent > 0 && (
//                   <>
//                     <span className="text-[6px] sm:text-[8px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
//                       ৳{formatPrice(originalPrice)}
//                     </span>
//                     {/* "Save" badge - hidden on mobile, visible on desktop */}
//                     <span className="text-[6px] sm:text-[8px] font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-0.5 sm:px-1 py-0.5 rounded hidden sm:inline-block" style={{ fontFamily: FONT_FAMILY }}>
//                       Save {discountPercent}%
//                     </span>
//                   </>
//                 )}
//               </div>
//               <motion.button
//                 type="button"
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock || cartStatusLoading}
//                 onMouseEnter={() => setIsCartHovered(true)}
//                 onMouseLeave={() => setIsCartHovered(false)}
//                 whileHover={!isOutOfStock ? { scale: 1.08 } : {}}
//                 whileTap={!isOutOfStock ? { scale: 0.92 } : {}}
//                 animate={isCartHovered && !isOutOfStock ? { rotate: [0, -10, 10, -6, 6, 0] } : {}}
//                 transition={{ duration: 0.5 }}
//                 aria-label={isInCart ? 'View cart' : 'Add to cart'}
//                 className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
//                   isInCart
//                     ? 'bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white shadow-[0_4px_12px_rgba(168,8,131,0.22)]'
//                     : isOutOfStock
//                     ? 'cursor-not-allowed bg-gray-100 text-gray-300'
//                     : 'border border-[#F7C7D3] bg-white text-[#EE4275] hover:border-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:shadow-[0_4px_12px_rgba(238,66,117,0.18)]'
//                 }`}
//               >
//                 {cartStatusLoading ? (
//                   <Loader2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-spin" />
//                 ) : (
//                   <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </article>
//       </Link>
//     </motion.div>
//   );
// };

// const ProductListCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});
//   const [isCartHovered, setIsCartHovered] = useState(false);

//   // Safe data extraction
//   const productId = product?._id || product?.id || 'unknown';
//   const productName = product?.productName || product?.name || 'Product';
//   const regularPrice = Number(product?.regularPrice || product?.price || 0);
//   const discountPrice = Number(product?.discountPrice || 0);
//   const stockQuantity = Number(product?.stockQuantity || 0);

//   // Brand
//   const brand = product?.brand
//     ? typeof product.brand === 'string'
//       ? product.brand
//       : product.brand?.name || product.brand?.title || 'General'
//     : product?.brandName || 'General';

//   // Category name
//   const categoryName = product?.category?.name || product?.categoryName || '';

//   // Images
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

//   // Tags
//   let tagNames = [];
//   if (product?.tags && Array.isArray(product.tags)) {
//     tagNames = product.tags
//       .map((tag) => {
//         if (typeof tag === 'string') return tag;
//         if (tag?.name) return tag.name;
//         return null;
//       })
//       .filter(Boolean);
//   }
//   const primaryTag = tagNames[0] || null;

//   // Price & discount
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;

//   // Stock
//   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;

//   // Rating
//   const rating = product?.rating ? Number(product.rating) : 4.7;
//   const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;

//   const hasMultipleImages = productImages.length > 1;

//   // Mobile detection
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

//   // Image navigation
//   const nextImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev + 1) % productImages.length);
//     }
//   };

//   const prevImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
//     }
//   };

//   const goToImage = (e, index) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setActiveIndex(index);
//   };

//   const handleImageError = (index) => {
//     setImageErrors((prev) => ({ ...prev, [index]: true }));
//   };

//   const getCurrentImage = () => {
//     const image = productImages[activeIndex] || productImages[0];
//     if (imageErrors[activeIndex]) {
//       return '/placeholder-product.jpg';
//     }
//     return image;
//   };

//   // Add to cart
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

//   // Render stars
//   const renderStars = () => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Star key={i} className="h-3 w-3 fill-current text-yellow-400" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-3 w-3">
//             <Star className="absolute h-3 w-3 text-gray-200" />
//             <div className="absolute left-0 top-0 h-3 w-1/2 overflow-hidden">
//               <Star className="h-3 w-3 fill-current text-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-3 w-3 text-[#F7C7D3]" />);
//       }
//     }
//     return stars;
//   };

//   // Navigate to product page
//   const navigateToProduct = () => {
//     router.push(`/product/${product.slug || product._id}`);
//   };

//   // Get description - clean HTML and limit to ~150 chars for 2 lines
//   const getDescription = () => {
//     const fullDesc = product.fullDescription?.replace(/<[^>]*>/g, '') || '';
//     const shortDesc = product.shortDescription?.replace(/<[^>]*>/g, '') || '';
//     const desc = fullDesc || shortDesc || 'No description available';
//     // Limit to ~150 characters for 2 lines
//     return desc.length > 150 ? desc.substring(0, 150) + '...' : desc;
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className="group w-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Link
//         href={`/product/${product.slug || product._id}`}
//         className="block h-full"
//       >
//         <article className="relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-[#F7C7D3]/30 bg-white p-3 shadow-[0_2px_9px_rgba(238,66,117,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EE4275]/50 hover:shadow-[0_18px_40px_rgba(238,66,117,0.12)]">
          
//           {/* ===== IMAGE SECTION (Left) ===== */}
//           <div className="sm:w-48 md:w-56 lg:w-64 relative flex-shrink-0">
//             <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#F7C7D3]/10 to-[#EE4275]/5">
//               <div className="relative aspect-square w-full overflow-hidden">
//                 <img
//                   src={getCurrentImage()}
//                   alt={productName}
//                   className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
//                   onError={() => handleImageError(activeIndex)}
//                   loading="lazy"
//                 />

//                 {/* Discount Badge - Zigzag with shimmer */}
//                 {discountPercent > 0 && (
//                   <motion.div
//                     className="absolute left-2 top-2 z-10"
//                     animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
//                     transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
//                   >
//                     <div
//                       className="relative flex h-12 w-10 items-start justify-center overflow-hidden bg-[#EE4275] px-1 pt-2 text-center text-[9px] font-bold uppercase leading-[0.9] tracking-wide text-white"
//                       style={{
//                         clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
//                         fontFamily: FONT_FAMILY
//                       }}
//                     >
//                       {isHovered && (
//                         <motion.div
//                           className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                           initial={{ x: '-100%' }}
//                           animate={{ x: '200%' }}
//                           transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
//                         />
//                       )}
//                       <span className="relative z-10 block leading-tight">
//                         {discountPercent}%<br />OFF
//                       </span>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Tag Badge */}
//                 {primaryTag && (
//                   <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded bg-gradient-to-r from-[#EE4275]/80 to-[#FF6B9D]/80 px-2 py-1 text-[9px] font-medium text-white backdrop-blur-sm">
//                     <Sparkles className="h-2.5 w-2.5" />
//                     <span style={{ fontFamily: FONT_FAMILY }}>{primaryTag}</span>
//                   </div>
//                 )}

//                 {/* Out of Stock Overlay */}
//                 {isOutOfStock && (
//                   <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/60">
//                     <span className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
//                       Out of Stock
//                     </span>
//                   </div>
//                 )}

//                 {/* Low Stock Badge */}
//                 {!isOutOfStock && isLowStock && (
//                   <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded bg-orange-500 px-2 py-1 text-[9px] font-medium text-white">
//                     <AlertTriangle className="h-2.5 w-2.5" />
//                     <span style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
//                   </div>
//                 )}

//                 {/* Desktop Hover Actions */}
//                 {!isMobile && (
//                   <div className={`absolute right-2 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}>
//                     <motion.button
//                       type="button"
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToProduct(); }}
//                       className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white text-gray-700 shadow-md transition-all hover:bg-[#EE4275] hover:text-white"
//                       aria-label="View product"
//                     >
//                       <Eye className="h-3.5 w-3.5" />
//                     </motion.button>
//                     <motion.button
//                       type="button"
//                       onClick={handleAddToCart}
//                       disabled={isOutOfStock || cartStatusLoading}
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white shadow-md transition-all hover:bg-[#EE4275] hover:text-white ${cartStatusLoading ? 'pointer-events-none opacity-50' : ''}`}
//                       aria-label="Add to cart"
//                     >
//                       {cartStatusLoading ? (
//                         <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                       ) : isInCart ? (
//                         <ShoppingCart className="h-3.5 w-3.5 text-green-500" />
//                       ) : (
//                         <ShoppingCart className="h-3.5 w-3.5" />
//                       )}
//                     </motion.button>
//                   </div>
//                 )}

//                 {/* Mobile Actions */}
//                 {isMobile && (
//                   <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-2">
//                     <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F7C7D3]/30 bg-white/90 shadow-md backdrop-blur-sm">
//                       <Eye className="h-3.5 w-3.5 text-gray-700" />
//                     </div>
//                     <div
//                       onClick={handleAddToCart}
//                       className={`flex h-8 w-8 items-center justify-center rounded-full border bg-white/90 shadow-md backdrop-blur-sm ${isOutOfStock ? 'border-gray-200 bg-gray-100' : 'border-[#F7C7D3]/30'}`}
//                     >
//                       {cartStatusLoading ? (
//                         <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-500" />
//                       ) : (
//                         <ShoppingCart className={`h-3.5 w-3.5 ${isInCart ? 'text-[#EE4275]' : 'text-black'}`} />
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Image Navigation - Arrows & Dots */}
//                 {hasMultipleImages && (
//                   <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
//                     <motion.button
//                       type="button"
//                       onClick={prevImage}
//                       className="rounded-full p-0.5"
//                       aria-label="Previous image"
//                       whileHover={{ scale: 1.2 }}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       <ChevronLeft className="h-4 w-4 text-[#EE4275]" />
//                     </motion.button>
//                     <div className="flex items-center gap-1.5">
//                       {productImages.map((_, index) => (
//                         <motion.button
//                           key={index}
//                           type="button"
//                           onClick={(e) => goToImage(e, index)}
//                           className={`rounded-full transition-all duration-200 ${activeIndex === index ? 'h-2 w-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]' : 'h-1.5 w-1.5 bg-[#F7C7D3]/60 hover:bg-[#EE4275]/50'}`}
//                           whileHover={{ scale: 1.3 }}
//                           aria-label={`Go to image ${index + 1}`}
//                         />
//                       ))}
//                     </div>
//                     <motion.button
//                       type="button"
//                       onClick={nextImage}
//                       className="rounded-full p-0.5"
//                       aria-label="Next image"
//                       whileHover={{ scale: 1.2 }}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       <ChevronRight className="h-4 w-4 text-[#FF6B9D]" />
//                     </motion.button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ===== PRODUCT INFO (Right) ===== */}
//           <div className="flex-1 flex flex-col p-3 sm:p-4">
//             {/* Brand - Premium styling with icon */}
//             <div className="flex items-center gap-2 mb-1.5">
//               <div className="flex items-center gap-1.5">
//                 <Building2 className="w-3 h-3 text-[#EE4275]" />
//                 <span className="text-[10px] sm:text-[11px] font-medium text-[#EE4275] tracking-wide" style={{ fontFamily: FONT_FAMILY }}>
//                   {brand}
//                 </span>
//               </div>
              
//               {/* Separator dot */}
//               <span className="w-1 h-1 rounded-full bg-[#F7C7D3]"></span>
              
//               {/* Category - Premium styling with muted color */}
//               {categoryName && (
//                 <div className="flex items-center gap-1.5">
//                   <FolderTree className="w-3 h-3 text-[#8B7A8C]" />
//                   <span className="text-[10px] sm:text-[11px] font-medium text-[#8B7A8C] tracking-wide" style={{ fontFamily: FONT_FAMILY }}>
//                     {categoryName}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Product Name */}
//             <h3
//               className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1.5 line-clamp-1 transition-colors group-hover:text-[#EE4275]"
//               style={{ fontFamily: FONT_FAMILY }}
//               title={productName}
//             >
//               {productName}
//             </h3>

//             {/* Description - 2 lines with premium styling */}
//             <p className="text-[11px] sm:text-xs text-gray-500 mb-2.5 line-clamp-2 leading-relaxed tracking-wide">
//               {getDescription()}
//             </p>

//             {/* Rating */}
//             <div className="flex items-center gap-1.5 mb-2.5">
//               <div className="flex items-center gap-0.5">{renderStars()}</div>
//               <span className="text-[9px] font-medium text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
//                 {rating.toFixed(1)}
//               </span>
//               {reviewCount > 0 && (
//                 <>
//                   <span className="text-gray-300">•</span>
//                   <span className="text-[9px] text-gray-400" style={{ fontFamily: FONT_FAMILY }}>
//                     {reviewCount} reviews
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* Divider */}
//             <div className="my-2 h-px bg-gradient-to-r from-[#F7C7D3]/30 to-transparent" />

//             {/* Price + Cart */}
//             <div className="mt-auto flex items-center justify-between gap-2 pt-1 flex-wrap">
//               <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap flex-wrap">
//                 <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>
//                   ৳{formatPrice(currentPrice)}
//                 </span>
//                 {discountPercent > 0 && (
//                   <span className="text-[9px] sm:text-xs text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
//                     ৳{formatPrice(originalPrice)}
//                   </span>
//                 )}
//                 {discountPercent > 0 && (
//                   <span className="text-[8px] sm:text-[9px] font-medium text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-1.5 py-0.5 rounded" style={{ fontFamily: FONT_FAMILY }}>
//                     -{discountPercent}%
//                   </span>
//                 )}
//                 <span className="text-[9px] sm:text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
//                   /{getUnitLabel(product.unit)}
//                 </span>
//               </div>

//               <motion.button
//                 type="button"
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock || cartStatusLoading}
//                 onMouseEnter={() => setIsCartHovered(true)}
//                 onMouseLeave={() => setIsCartHovered(false)}
//                 whileHover={!isOutOfStock ? { scale: 1.05 } : {}}
//                 whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
//                 animate={isCartHovered && !isOutOfStock ? { rotate: [0, -10, 10, -6, 6, 0] } : {}}
//                 transition={{ duration: 0.5 }}
//                 aria-label={isInCart ? 'View cart' : 'Add to cart'}
//                 className={`flex h-9 sm:h-10 px-4 sm:px-5 items-center justify-center gap-1.5 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-200 ${
//                   isInCart
//                     ? 'bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white shadow-[0_4px_12px_rgba(168,8,131,0.22)] hover:shadow-[0_6px_20px_rgba(168,8,131,0.3)]'
//                     : isOutOfStock
//                     ? 'cursor-not-allowed bg-gray-100 text-gray-400'
//                     : 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25'
//                 }`}
//               >
//                 {cartStatusLoading ? (
//                   <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                 ) : isInCart ? (
//                   <>
//                     <ShoppingCart className="h-3.5 w-3.5" />
//                     View in Cart
//                   </>
//                 ) : (
//                   <>
//                     <ShoppingCart className="h-3.5 w-3.5" />
//                     Add to Cart
//                   </>
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </article>
//       </Link>
//     </motion.div>
//   );
// };


// // ============================================================
// //  FILTER SIDEBAR - Beauty Bucket Style (Fixed Keys)
// // ============================================================
// const FilterSidebar = ({ 
//   expandedSections, 
//   toggleSection, 
//   categories, 
//   subcategories,
//   childSubcategories,
//   brands,
//   filters, 
//   handleCategoryChange, 
//   handleRemoveCategory,
//   handleSubcategoryChange,
//   handleRemoveSubcategory,
//   handleChildSubcategoryChange,
//   handleRemoveChildSubcategory,
//   handleBrandChange,
//   handleRemoveBrand,
//   handleUnitChange,
//   handleRemoveUnit,
//   minPriceInput,
//   maxPriceInput,
//   setMinPriceInput,
//   setMaxPriceInput,
//   applyPriceRange,
//   clearPriceRange,
//   getActiveFilterCount,
//   clearFilters,
//   selectedCategory,
//   selectedSubcategory,
//   showChildSubcategory,
//   availableUnits,      
//   unitsLoading   
// }) => (
//   <div className="bg-white border border-[#F7C7D3]/30 rounded-2xl p-4 sticky top-24 shadow-[0_2px_9px_rgba(238,66,117,0.06)]">
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-base font-semibold text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//         <Filter className="w-4 h-4 text-[#EE4275]" />
//         Filters
//       </h3>
//       {getActiveFilterCount() > 0 && (
//         <button onClick={clearFilters} className="text-[11px] text-[#EE4275] hover:text-[#ca4f74] transition-colors">
//           Clear All ({getActiveFilterCount()})
//         </button>
//       )}
//     </div>

//     {/* Price Range */}
//     <div className="mb-4 border-b border-[#F7C7D3]/20 pb-4">
//       <button onClick={() => toggleSection('price')} className="flex items-center justify-between w-full text-left mb-3">
//         <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//           <DollarSign className="w-3.5 h-3.5 text-[#EE4275]" />
//           Price Range
//         </h4>
//         {expandedSections.price ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//       </button>
      
//       {expandedSections.price && (
//         <div className="space-y-3">
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY }}>Min (৳)</span>
//               <input
//                 type="text"
//                 inputMode="decimal"
//                 value={minPriceInput}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (value === '' || /^\d*\.?\d*$/.test(value)) setMinPriceInput(value);
//                 }}
//                 placeholder="0"
//                 className="w-24 px-2 py-1 text-right text-xs border border-[#F7C7D3]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EE4275]"
//               />
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY }}>Max (৳)</span>
//               <input
//                 type="text"
//                 inputMode="decimal"
//                 value={maxPriceInput}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (value === '' || /^\d*\.?\d*$/.test(value)) setMaxPriceInput(value);
//                 }}
//                 placeholder="Any"
//                 className="w-24 px-2 py-1 text-right text-xs border border-[#F7C7D3]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EE4275]"
//               />
//             </div>
//           </div>
          
//           <button
//             onClick={applyPriceRange}
//             disabled={!minPriceInput && !maxPriceInput}
//             className="w-full py-1.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Apply Price Range
//           </button>

//           {(filters.priceRange.min || filters.priceRange.max) && (
//             <div className="flex items-center justify-between bg-[#FFF5F6] p-2 rounded-lg border border-[#F7C7D3]/30">
//               <span className="text-xs font-medium text-[#EE4275]" style={{ fontFamily: FONT_FAMILY }}>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
//               <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>

//     {/* Categories */}
//     <div className="mb-4 border-b border-[#F7C7D3]/20 pb-4">
//       <button onClick={() => toggleSection('categories')} className="flex items-center justify-between w-full text-left mb-3">
//         <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//           <Tag className="w-3.5 h-3.5 text-[#EE4275]" />
//           Categories
//         </h4>
//         {expandedSections.categories ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//       </button>
      
//       {expandedSections.categories && (
//         <div className="space-y-2">
//           {filters.categories.length > 0 && (
//             <div className="mb-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/30">
//               <p className="text-[10px] text-gray-500 mb-1.5" style={{ fontFamily: FONT_FAMILY }}>Selected Categories:</p>
//               {filters.categories.map(catId => {
//                 const category = categories.find(c => c._id === catId);
//                 return category ? (
//                   <div key={catId} className="flex items-center justify-between py-1">
//                     <span className="text-xs text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>{category.name}</span>
//                     <button onClick={() => handleRemoveCategory(catId)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
//                   </div>
//                 ) : null;
//               })}
//             </div>
//           )}
          
//           <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
//             {categories.map(category => (
//               <label key={category._id} className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={filters.categories.includes(category._id)}
//                   onChange={() => handleCategoryChange(category._id)}
//                   className="w-3.5 h-3.5 rounded border-[#F7C7D3]/40 text-[#EE4275] focus:ring-[#EE4275]"
//                 />
//                 <span className="text-xs text-gray-700 hover:text-[#EE4275] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{category.name}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Subcategories */}
//     {selectedCategory && subcategories.length > 0 && (
//       <div className="mb-4 border-b border-[#F7C7D3]/20 pb-4">
//         <button onClick={() => toggleSection('subcategories')} className="flex items-center justify-between w-full text-left mb-3">
//           <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//             <FolderTree className="w-3.5 h-3.5 text-[#EE4275]" />
//             Subcategories
//           </h4>
//           {expandedSections.subcategories ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//         </button>
        
//         {expandedSections.subcategories && (
//           <div className="space-y-2">
//             {filters.subcategories.length > 0 && (
//               <div className="mb-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/30">
//                 <p className="text-[10px] text-gray-500 mb-1.5" style={{ fontFamily: FONT_FAMILY }}>Selected Subcategories:</p>
//                 {filters.subcategories.map(subId => {
//                   const subcategory = subcategories.find(s => s._id === subId);
//                   return subcategory ? (
//                     <div key={subId} className="flex items-center justify-between py-1">
//                       <span className="text-xs text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>{subcategory.name}</span>
//                       <button onClick={() => handleRemoveSubcategory(subId)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
//                     </div>
//                   ) : null;
//                 })}
//               </div>
//             )}
            
//             <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
//               {subcategories.map(sub => (
//                 <label key={sub._id} className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={filters.subcategories.includes(sub._id)}
//                     onChange={() => handleSubcategoryChange(sub._id)}
//                     className="w-3.5 h-3.5 rounded border-[#F7C7D3]/40 text-[#EE4275] focus:ring-[#EE4275]"
//                   />
//                   <span className="text-xs text-gray-700 hover:text-[#EE4275] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{sub.name}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     )}

//     {/* Child Subcategories */}
//     {showChildSubcategory && childSubcategories.length > 0 && (
//       <div className="mb-4 border-b border-[#F7C7D3]/20 pb-4">
//         <button onClick={() => toggleSection('childSubcategories')} className="flex items-center justify-between w-full text-left mb-3">
//           <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//             <FolderTree className="w-3.5 h-3.5 text-[#EE4275]" />
//             Child Subcategories
//           </h4>
//           {expandedSections.childSubcategories ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//         </button>
        
//         {expandedSections.childSubcategories && (
//           <div className="space-y-2">
//             {filters.childSubcategories.length > 0 && (
//               <div className="mb-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/30">
//                 <p className="text-[10px] text-gray-500 mb-1.5" style={{ fontFamily: FONT_FAMILY }}>Selected Child Subcategories:</p>
//                 {filters.childSubcategories.map(childId => {
//                   const child = childSubcategories.find(c => c._id === childId);
//                   return child ? (
//                     <div key={childId} className="flex items-center justify-between py-1">
//                       <span className="text-xs text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>{child.name}</span>
//                       <button onClick={() => handleRemoveChildSubcategory(childId)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
//                     </div>
//                   ) : null;
//                 })}
//               </div>
//             )}
            
//             <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
//               {childSubcategories.map(child => (
//                 <label key={child._id} className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={filters.childSubcategories.includes(child._id)}
//                     onChange={() => handleChildSubcategoryChange(child._id)}
//                     className="w-3.5 h-3.5 rounded border-[#F7C7D3]/40 text-[#EE4275] focus:ring-[#EE4275]"
//                   />
//                   <span className="text-xs text-gray-700 hover:text-[#EE4275] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{child.name}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     )}

//     {/* Brands - Fixed Key Issue */}
//     <div className="mb-4 border-b border-[#F7C7D3]/20 pb-4">
//       <button onClick={() => toggleSection('brands')} className="flex items-center justify-between w-full text-left mb-3">
//         <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//           <Building2 className="w-3.5 h-3.5 text-[#EE4275]" />
//           Brands
//         </h4>
//         {expandedSections.brands ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//       </button>
      
//       {expandedSections.brands && (
//         <div className="space-y-2">
//           {filters.brands.length > 0 && (
//             <div className="mb-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/30">
//               <p className="text-[10px] text-gray-500 mb-1.5" style={{ fontFamily: FONT_FAMILY }}>Selected Brands:</p>
//               {filters.brands.map((brand, index) => (
//                 <div key={brand || index} className="flex items-center justify-between py-1">
//                   <span className="text-xs text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>{brand}</span>
//                   <button onClick={() => handleRemoveBrand(brand)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
//             {brands.map((brand, index) => (
//               <label key={brand._id || brand.name || index} className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={filters.brands.includes(brand.name)}
//                   onChange={() => handleBrandChange(brand.name)}
//                   className="w-3.5 h-3.5 rounded border-[#F7C7D3]/40 text-[#EE4275] focus:ring-[#EE4275]"
//                 />
//                 <span className="text-xs text-gray-700 hover:text-[#EE4275] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{brand.name}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Unit Filter - Fixed Key Issue */}
//     <div className="mb-4">
//       <button onClick={() => toggleSection('unit')} className="flex items-center justify-between w-full text-left mb-3">
//         <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//           <Scale className="w-3.5 h-3.5 text-[#EE4275]" />
//           Unit
//         </h4>
//         {expandedSections.unit ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//       </button>
      
//       {expandedSections.unit && (
//         <div className="space-y-2">
//           {filters.units.length > 0 && (
//             <div className="mb-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/30">
//               <p className="text-[10px] text-gray-500 mb-1.5" style={{ fontFamily: FONT_FAMILY }}>Selected Units:</p>
//               {filters.units.map((unit, index) => {
//                 const unitLabel = availableUnits.find(u => u.value === unit)?.label || unit;
//                 return (
//                   <div key={unit || index} className="flex items-center justify-between py-1">
//                     <span className="text-xs text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>{unitLabel}</span>
//                     <button onClick={() => handleRemoveUnit(unit)} className="text-gray-400 hover:text-gray-600">
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
          
//           <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
//             {availableUnits.length === 0 ? (
//               <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY }}>No units available</p>
//             ) : (
//               availableUnits.map((unit, index) => (
//                 <label key={unit.value || index} className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={filters.units.includes(unit.value)}
//                     onChange={() => handleUnitChange(unit.value)}
//                     className="w-3.5 h-3.5 rounded border-[#F7C7D3]/40 text-[#EE4275] focus:ring-[#EE4275]"
//                   />
//                   <span className="text-xs text-gray-700 hover:text-[#EE4275] transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                     {unit.label}
//                   </span>
//                 </label>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

// // ============================================================
// //  MAIN PRODUCTS PAGE
// // ============================================================
// export default function ProductsClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('grid');
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [showChildSubcategory, setShowChildSubcategory] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [forceFetch, setForceFetch] = useState(0);
//   const [brands, setBrands] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const [availableUnits, setAvailableUnits] = useState([]);
//   const [unitsLoading, setUnitsLoading] = useState(true);
  
//   const [expandedSections, setExpandedSections] = useState({
//     price: true,
//     categories: true,
//     subcategories: true,
//     childSubcategories: true,
//     brands: true,
//     unit: true
//   });

//   const productsContainerRef = useRef(null);
//   const scrollPositionRef = useRef(0);
//   const searchTimerRef = useRef(null);

//   const [filters, setFilters] = useState({
//     search: '',
//     categories: [],
//     subcategories: [],
//     childSubcategories: [],
//     brands: [],
//     units: [],
//     priceRange: { min: '', max: '' },
//     sortBy: 'newest'
//   });

//   const [searchInput, setSearchInput] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [minPriceInput, setMinPriceInput] = useState('');
//   const [maxPriceInput, setMaxPriceInput] = useState('');
//   const [initialCategorySet, setInitialCategorySet] = useState(false);

//   const openCartSidebar = () => {
//     setIsCartOpen(true);
//   };

//   const closeCartSidebar = () => {
//     setIsCartOpen(false);
//   };

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const saveScrollPosition = () => {
//     scrollPositionRef.current = window.scrollY;
//   };

//   const restoreScrollPosition = () => {
//     if (scrollPositionRef.current > 0) {
//       window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
//     }
//   };

//   const debouncedSearch = useCallback((searchValue) => {
//     if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
//     searchTimerRef.current = setTimeout(() => {
//       saveScrollPosition();
//       setFilters(prev => ({ ...prev, search: searchValue }));
//       setCurrentPage(1);
//     }, 500);
//   }, []);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     debouncedSearch(value);
//   };

//   const handleClearSearch = () => {
//     setSearchInput('');
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, search: '' }));
//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchBrands();
//   }, []);

//   useEffect(() => {
//     const fetchUnits = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/products/units/all');
//         const data = await response.json();
//         if (data.success) {
//           setAvailableUnits(data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching units:', error);
//       } finally {
//         setUnitsLoading(false);
//       }
//     };
//     fetchUnits();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/categories/with-products');
//       const data = await response.json();
//       if (data.success) {
//         setCategories(data.data);
//       }
//       setCategoriesLoaded(true);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setCategoriesLoaded(true);
//     }
//   };

//   const fetchBrands = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/products/brands/with-products');
//       const data = await response.json();
//       if (data.success) {
//         setBrands(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching brands:', error);
//     }
//   };

//   useEffect(() => {
//     if (categories.length > 0 && !initialCategorySet) {
//       const categoryParam = searchParams.get('category');
//       if (categoryParam && categories.some(cat => cat._id === categoryParam)) {
//         setFilters(prev => ({ ...prev, categories: [categoryParam] }));
//       }
//       setInitialCategorySet(true);
//     }
//   }, [categories, searchParams]);

//   useEffect(() => {
//     if (filters.categories.length === 1) {
//       const categoryId = filters.categories[0];
//       setSelectedCategory(categoryId);
//       fetchSubcategories(categoryId);
//     } else {
//       setSubcategories([]);
//       setSelectedCategory(null);
//       setChildSubcategories([]);
//       setSelectedSubcategory(null);
//       setShowChildSubcategory(false);
//       if (filters.subcategories.length > 0) setFilters(prev => ({ ...prev, subcategories: [] }));
//       if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
//     }
//   }, [filters.categories]);

//   useEffect(() => {
//     if (filters.subcategories.length === 1 && selectedCategory) {
//       const subcategoryId = filters.subcategories[0];
//       setSelectedSubcategory(subcategoryId);
//       fetchChildSubcategories(selectedCategory, subcategoryId);
//     } else {
//       setChildSubcategories([]);
//       setSelectedSubcategory(null);
//       setShowChildSubcategory(false);
//       if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
//     }
//   }, [filters.subcategories, selectedCategory]);

//   useEffect(() => {
//     if (initialCategorySet) fetchProducts();
//   }, [filters.categories, filters.subcategories, filters.childSubcategories, filters.brands, filters.units, filters.priceRange, filters.search, filters.sortBy, currentPage, initialCategorySet, forceFetch]);

//   useEffect(() => {
//     if (!loading) restoreScrollPosition();
//   }, [loading]);

//   const checkAllProductsCartStatus = async (productIds) => {
//     if (!productIds || productIds.length === 0) return;
    
//     const token = localStorage.getItem('token');
//     let sessionId = localStorage.getItem('cartSessionId');
    
//     if (!token && !sessionId) {
//       sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//       localStorage.setItem('cartSessionId', sessionId);
//     }
    
//     const headers = {};
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     }
    
//     try {
//       const response = await fetch('http://localhost:5000/api/cart/check-status', {
//         method: 'POST',
//         headers: { ...headers, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productIds })
//       });
//       const data = await response.json();
//       if (data.success) {
//         setProductsInCart(data.data);
//       }
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//     }
//   };

//   useEffect(() => {
//     if (products.length > 0) {
//       const productIds = products.map(p => p._id);
//       checkAllProductsCartStatus(productIds);
//     }
//   }, [products]);

//   useEffect(() => {
//     const refreshCartStatus = async () => {
//       if (products.length === 0) return;
//       const productIds = products.map(p => p._id);
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
      
//       try {
//         const response = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds })
//         });
//         const data = await response.json();
//         if (data.success) setProductsInCart(data.data);
//       } catch (error) { console.error('Error refreshing cart status:', error); }
//     };
//     const handleCartUpdate = () => refreshCartStatus();
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [products]);

//   useEffect(() => {
//     const handleCategoryFilterChange = (event) => {
//       const categoryId = event.detail?.categoryId;
//       if (categoryId) {
//         saveScrollPosition();
//         setFilters(prev => ({ ...prev, categories: [categoryId], subcategories: [], childSubcategories: [] }));
//         setCurrentPage(1);
//         setForceFetch(prev => prev + 1);
//         const url = new URL(window.location.href);
//         url.searchParams.set('category', categoryId);
//         window.history.pushState({}, '', url);
//       } else if (event.detail?.categoryId === null) {
//         saveScrollPosition();
//         setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
//         setCurrentPage(1);
//         setForceFetch(prev => prev + 1);
//         const url = new URL(window.location.href);
//         url.searchParams.delete('category');
//         window.history.pushState({}, '', url);
//       }
//     };
//     window.addEventListener('categoryFilterChanged', handleCategoryFilterChange);
//     return () => window.removeEventListener('categoryFilterChanged', handleCategoryFilterChange);
//   }, []);

//   useEffect(() => {
//     const handlePopState = () => {
//       const categoryParam = new URLSearchParams(window.location.search).get('category');
//       if (categoryParam) setFilters(prev => ({ ...prev, categories: [categoryParam], subcategories: [], childSubcategories: [] }));
//       else setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
//       setCurrentPage(1);
//     };
//     window.addEventListener('popstate', handlePopState);
//     return () => window.removeEventListener('popstate', handlePopState);
//   }, []);

//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
//       const data = await response.json();
//       if (data.success && Array.isArray(data.data.subcategories)) {
//         setSubcategories(data.data.subcategories);
//         return data.data.subcategories;
//       } else {
//         setSubcategories([]);
//         return [];
//       }
//     } catch (error) { console.error('Error fetching subcategories:', error); setSubcategories([]); return []; }
//   };

//   const fetchChildSubcategories = async (categoryId, subcategoryId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`);
//       const data = await response.json();
//       if (data.success && Array.isArray(data.data.children)) {
//         setChildSubcategories(data.data.children);
//         setShowChildSubcategory(data.data.children.length > 0);
//         return data.data.children;
//       } else {
//         setChildSubcategories([]);
//         setShowChildSubcategory(false);
//         return [];
//       }
//     } catch (error) { console.error('Error fetching child subcategories:', error); setChildSubcategories([]); setShowChildSubcategory(false); return []; }
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams();
//       queryParams.append('page', currentPage);
//       queryParams.append('limit', 16);
//       if (filters.search) queryParams.append('search', filters.search);
//       if (filters.categories.length > 0) filters.categories.forEach(cat => queryParams.append('category', cat));
//       if (filters.subcategories.length > 0) filters.subcategories.forEach(sub => queryParams.append('subcategory', sub));
//       if (filters.childSubcategories.length > 0) filters.childSubcategories.forEach(child => queryParams.append('childSubcategory', child));
//       if (filters.brands.length > 0) filters.brands.forEach(brand => queryParams.append('brand', brand));
//       if (filters.units.length > 0) filters.units.forEach(unit => queryParams.append('unit', unit));
//       if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
//       if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
//       let sortParam = '-createdAt';
//       switch (filters.sortBy) {
//         case 'price_low': sortParam = 'price_asc'; break;
//         case 'price_high': sortParam = 'price_desc'; break;
//         case 'name_asc': sortParam = 'name_asc'; break;
//         default: sortParam = 'newest';
//       }
//       queryParams.append('sort', sortParam);

//       const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
//       const data = await response.json();
//       if (data.success) {
//         setProducts(data.data || []);
//         setTotalPages(data.pagination?.pages || 1);
//         setTotalProducts(data.pagination?.total || 0);
//       }
//     } catch (error) { console.error('Error fetching products:', error); } finally { setLoading(false); }
//   };

//   const handleCategoryChange = (categoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newCategories = prev.categories.includes(categoryId) ? prev.categories.filter(id => id !== categoryId) : [...prev.categories, categoryId];
//       return { ...prev, categories: newCategories, subcategories: [], childSubcategories: [] };
//     });
//     setCurrentPage(1);
    
//     const isSelected = !filters.categories.includes(categoryId);
//     const newCategory = isSelected ? categoryId : null;
//     const params = new URLSearchParams(window.location.search);
//     if (newCategory) params.set('category', newCategory);
//     else params.delete('category');
//     window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
//     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: newCategory } }));
//   };

//   const handleRemoveCategory = (categoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, categories: prev.categories.filter(id => id !== categoryId), subcategories: [], childSubcategories: [] }));
//     setCurrentPage(1);
//     const params = new URLSearchParams(window.location.search);
//     params.delete('category');
//     window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
//     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
//   };

//   const handleSubcategoryChange = (subcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newSubcategories = prev.subcategories.includes(subcategoryId) ? prev.subcategories.filter(id => id !== subcategoryId) : [...prev.subcategories, subcategoryId];
//       return { ...prev, subcategories: newSubcategories, childSubcategories: [] };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveSubcategory = (subcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, subcategories: prev.subcategories.filter(id => id !== subcategoryId), childSubcategories: [] }));
//     setCurrentPage(1);
//   };

//   const handleChildSubcategoryChange = (childSubcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newChildSubcategories = prev.childSubcategories.includes(childSubcategoryId) ? prev.childSubcategories.filter(id => id !== childSubcategoryId) : [...prev.childSubcategories, childSubcategoryId];
//       return { ...prev, childSubcategories: newChildSubcategories };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveChildSubcategory = (childSubcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, childSubcategories: prev.childSubcategories.filter(id => id !== childSubcategoryId) }));
//     setCurrentPage(1);
//   };

//   const handleBrandChange = (brand) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newBrands = prev.brands.includes(brand) ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand];
//       return { ...prev, brands: newBrands };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveBrand = (brand) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== brand) }));
//     setCurrentPage(1);
//   };

//   const handleUnitChange = (unit) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newUnits = prev.units.includes(unit) ? prev.units.filter(u => u !== unit) : [...prev.units, unit];
//       return { ...prev, units: newUnits };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveUnit = (unit) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, units: prev.units.filter(u => u !== unit) }));
//     setCurrentPage(1);
//   };

//   const applyPriceRange = () => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, priceRange: { min: minPriceInput || '', max: maxPriceInput || '' } }));
//     setCurrentPage(1);
//   };

//   const clearPriceRange = () => {
//     saveScrollPosition();
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
//   };

//   const clearFilters = () => {
//     saveScrollPosition();
//     setSearchInput('');
//     setFilters({
//       search: '',
//       categories: [],
//       subcategories: [],
//       childSubcategories: [],
//       brands: [],
//       units: [],
//       priceRange: { min: '', max: '' },
//       sortBy: 'newest'
//     });
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setCurrentPage(1);
//     window.history.pushState({}, '', window.location.pathname);
//     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
//   };

//   const handleFilterChange = (filterType, value) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, [filterType]: value }));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     saveScrollPosition();
//     setCurrentPage(newPage);
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   const getActiveFilterCount = () => {
//     let count = 0;
//     if (filters.search) count++;
//     if (filters.categories.length > 0) count += filters.categories.length;
//     if (filters.subcategories.length > 0) count += filters.subcategories.length;
//     if (filters.childSubcategories.length > 0) count += filters.childSubcategories.length;
//     if (filters.brands.length > 0) count += filters.brands.length;
//     if (filters.units.length > 0) count += filters.units.length;
//     if (filters.priceRange.min || filters.priceRange.max) count++;
//     return count;
//   };

//   useEffect(() => {
//     return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); };
//   }, []);

//   return (
//     <>
//       <LoadingBar isVisible={loading} />
//       <Navbar />
//   {/* Hero Section - With Clear Background Image */}
// <div className="relative overflow-hidden ">
//   {/* Background Image - No fixed attachment for better clarity */}
//   <div 
//     className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//     style={{ 
//       backgroundImage: `url('/images/a1.jpg')`
//     }}
//   />
  
//   {/* Black Overlay - Lighter opacity, no blur */}
//   <div className="absolute inset-0 bg-black/40" />
  
//   {/* Subtle gradient overlay for depth - Keep but lighter */}
//   <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
  
//   {/* Decorative Elements */}
//   <div className="absolute inset-0 pointer-events-none overflow-hidden">
//     <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#EE4275]/5 rounded-full blur-3xl" />
//     <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#EE4275]/5 rounded-full blur-3xl" />
//   </div>

//   <div className="relative z-10 container mx-auto px-4 max-w-7xl py-8 md:py-12 lg:py-12">
//     <div className="flex flex-col items-center text-center">
//       {/* Decorative line above */}
//       <div className="flex items-center gap-3 mb-3">
//         <div className="w-8 md:w-10 h-px bg-gradient-to-r from-transparent to-[#EE4275]" />
//         <Flower2 className="w-4 h-4 md:w-5 md:h-5 text-[#EE4275]" />
//         <div className="w-8 md:w-10 h-px bg-gradient-to-l from-transparent to-[#EE4275]" />
//       </div>
      
//       <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
//         Beauty <span className="text-[#EE4275]">Collection</span>
//       </h1>
      
//       <p className="text-white/80 text-center text-xs md:text-sm max-w-2xl" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
//         Discover our curated collection of premium beauty products
//       </p>
      
//       {/* Search Bar */}
//       <div className="w-full max-w-xl mt-4 md:mt-5">
//         <div className="relative flex items-center bg-white/15 backdrop-blur-sm border border-white/20 rounded-full shadow-lg overflow-hidden focus-within:border-[#EE4275] focus-within:ring-2 focus-within:ring-[#EE4275]/30 transition-all">
//           <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-white/60" />
//           <input
//             type="text"
//             placeholder="Search beauty products..."
//             value={searchInput}
//             onChange={handleSearchChange}
//             className="w-full pl-9 md:pl-11 pr-20 md:pr-24 py-2 md:py-2.5 text-xs md:text-sm border-0 focus:outline-none bg-transparent text-white placeholder:text-white/50"
//             style={{ fontFamily: FONT_FAMILY }}
//           />
//           {searchInput && (
//             <button onClick={handleClearSearch} className="absolute right-2 md:right-3 p-1 text-white/40 hover:text-white rounded-full transition-colors">
//               <X className="w-3 h-3 md:w-3.5 md:h-3.5" />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//     <div className="min-h-screen" style={{ 
//   background: 'linear-gradient(to right, #FFD2DB 0%, #FFF5F6 25%, #FFFFFF 50%, #FFF5F6 75%, #FFD2DB 100%)'
// }}>
//         <div className="container mx-auto px-4 max-w-7xl py-6">
//           {/* Filter and Sort Bar */}
//           <div className="mb-6">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setShowMobileFilters(true)}
//                   className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-white border border-[#F7C7D3]/30 rounded-full hover:bg-[#FFF5F6] transition-colors text-xs font-medium text-gray-700"
//                 >
//                   <SlidersHorizontal className="w-3.5 h-3.5 text-[#EE4275]" />
//                   Filters
//                   {getActiveFilterCount() > 0 && (
//                     <span className="ml-1 px-1 py-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[9px] rounded-full min-w-[16px] text-center">{getActiveFilterCount()}</span>
//                   )}
//                 </button>

//                 <select
//                   value={filters.sortBy}
//                   onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                   className="px-3 py-1.5 text-xs border border-[#EE4275]/30 rounded-full bg-white  focus:outline-none focus:ring-1 focus:ring-[#EE4275]"
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="price_low">Price: Low to High</option>
//                   <option value="price_high">Price: High to Low</option>
//                   <option value="name_asc">Name: A to Z</option>
//                 </select>

//                 {/* Desktop view toggle */}
//                 {!isMobile && (
//                   <div className="hidden md:flex items-center gap-1 bg-white border border-[#EE4275]/30 rounded-full p-0.5">
//                     <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-full transition-all ${viewMode === 'grid' ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/20' : 'text-gray-500 hover:bg-[#FFF5F6]'}`} title="Grid View">
//                       <Grid className="w-3.5 h-3.5" />
//                     </button>
//                     <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/20' : 'text-gray-500 hover:bg-[#FFF5F6]'}`} title="List View">
//                       <List className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               {/* Search Bar */}
//               <div className="relative w-full md:w-72">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchInput}
//                   onChange={handleSearchChange}
//                   className="w-full pl-9 pr-8 py-1.5 text-xs border border-[#EE4275]/30 rounded-full focus:outline-none focus:ring-1 focus:ring-[#EE4275] bg-white"
//                   style={{ fontFamily: FONT_FAMILY }}
//                 />
//                 {searchInput && (
//                   <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
//                     <X className="w-3 h-3 text-gray-400 hover:text-[#EE4275] transition-colors" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Active Filters Display */}
//             {getActiveFilterCount() > 0 && (
//               <div className="mt-3 flex items-center gap-1.5 flex-wrap">
//                 {filters.search && (
//                   <div className="flex items-center gap-1 px-2 py-1 bg-[#FFF5F6] text-gray-700 text-[10px] rounded-full border border-[#F7C7D3]/30">
//                     <span>🔍 "{filters.search}"</span>
//                     <button onClick={handleClearSearch} className="ml-1 hover:text-[#EE4275] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 )}
//                 {filters.categories.map(catId => {
//                   const category = categories.find(c => c._id === catId);
//                   return category ? (
//                     <div key={catId} className="flex items-center gap-1 px-2 py-1 bg-[#FFF5F6] text-gray-700 text-[10px] rounded-full border border-[#F7C7D3]/30">
//                       <Tag className="w-2.5 h-2.5 text-[#EE4275]" />
//                       <span style={{ fontFamily: FONT_FAMILY }}>{category.name}</span>
//                       <button onClick={() => handleRemoveCategory(catId)} className="ml-1 hover:text-[#EE4275] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                     </div>
//                   ) : null;
//                 })}
//                 {filters.subcategories.map(subId => {
//                   const sub = subcategories.find(s => s._id === subId);
//                   return sub ? (
//                     <div key={subId} className="flex items-center gap-1 px-2 py-1 bg-[#FFF5F6] text-gray-700 text-[10px] rounded-full border border-[#F7C7D3]/30">
//                       <FolderTree className="w-2.5 h-2.5 text-[#EE4275]" />
//                       <span style={{ fontFamily: FONT_FAMILY }}>{sub.name}</span>
//                       <button onClick={() => handleRemoveSubcategory(subId)} className="ml-1 hover:text-[#EE4275] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                     </div>
//                   ) : null;
//                 })}
//                 {filters.brands.map(brand => (
//                   <div key={brand} className="flex items-center gap-1 px-2 py-1 bg-[#FFF5F6] text-gray-700 text-[10px] rounded-full border border-[#F7C7D3]/30">
//                     <Building2 className="w-2.5 h-2.5 text-[#EE4275]" />
//                     <span style={{ fontFamily: FONT_FAMILY }}>{brand}</span>
//                     <button onClick={() => handleRemoveBrand(brand)} className="ml-1 hover:text-[#EE4275] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 ))}
//                 {filters.units.map(unit => (
//                   <div key={unit} className="flex items-center gap-1 px-2 py-1 bg-[#FFF5F6] text-gray-700 text-[10px] rounded-full border border-[#F7C7D3]/30">
//                     <Scale className="w-2.5 h-2.5 text-[#EE4275]" />
//                     <span style={{ fontFamily: FONT_FAMILY }}>{unit === 'pcs' ? 'Pieces' : 'Ton'}</span>
//                     <button onClick={() => handleRemoveUnit(unit)} className="ml-1 hover:text-[#EE4275] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 ))}
//                 {(filters.priceRange.min || filters.priceRange.max) && (
//                   <div className="flex items-center gap-1 px-2 py-1 bg-[#FFF5F6] text-gray-700 text-[10px] rounded-full border border-[#F7C7D3]/30">
//                     <DollarSign className="w-2.5 h-2.5 text-[#EE4275]" />
//                     <span style={{ fontFamily: FONT_FAMILY }}>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
//                     <button onClick={clearPriceRange} className="ml-1 hover:text-[#EE4275] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 )}
//                 {getActiveFilterCount() > 0 && (
//                   <button onClick={clearFilters} className="px-2 py-1 text-[10px] text-[#EE4275] hover:text-[#ca4f74] underline transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                     Clear All
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Main Content */}
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Desktop Filters */}
//             {!isMobile && (
//               <div className="hidden md:block md:w-72 flex-shrink-0">
//                 <FilterSidebar 
//                   expandedSections={expandedSections}
//                   toggleSection={toggleSection}
//                   categories={categories}
//                   subcategories={subcategories}
//                   childSubcategories={childSubcategories}
//                   brands={brands}
//                   filters={filters}
//                   handleCategoryChange={handleCategoryChange}
//                   handleRemoveCategory={handleRemoveCategory}
//                   handleSubcategoryChange={handleSubcategoryChange}
//                   handleRemoveSubcategory={handleRemoveSubcategory}
//                   handleChildSubcategoryChange={handleChildSubcategoryChange}
//                   handleRemoveChildSubcategory={handleRemoveChildSubcategory}
//                   handleBrandChange={handleBrandChange}
//                   handleRemoveBrand={handleRemoveBrand}
//                   handleUnitChange={handleUnitChange}
//                   handleRemoveUnit={handleRemoveUnit}
//                   minPriceInput={minPriceInput}
//                   maxPriceInput={maxPriceInput}
//                   setMinPriceInput={setMinPriceInput}
//                   setMaxPriceInput={setMaxPriceInput}
//                   applyPriceRange={applyPriceRange}
//                   clearPriceRange={clearPriceRange}
//                   getActiveFilterCount={getActiveFilterCount}
//                   clearFilters={clearFilters}
//                   selectedCategory={selectedCategory}
//                   selectedSubcategory={selectedSubcategory}
//                   showChildSubcategory={showChildSubcategory}
//                   availableUnits={availableUnits}
//                   unitsLoading={unitsLoading}
//                 />
//               </div>
//             )}

//             {/* Products */}
//             <div className="flex-1" ref={productsContainerRef}>
//               {loading ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//                   {[...Array(12)].map((_, index) => (
//                     <div key={index} className="bg-white rounded-2xl border border-[#F7C7D3]/30 overflow-hidden animate-pulse">
//                       <div className="h-40 bg-gradient-to-br from-[#F7C7D3]/10 to-[#EE4275]/5"></div>
//                       <div className="p-3">
//                         <div className="h-3 bg-gray-100 rounded mb-2 w-3/4"></div>
//                         <div className="h-4 bg-gray-100 rounded mb-2 w-1/2"></div>
//                         <div className="h-2 bg-gray-100 rounded w-1/3"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <>
//                   {products.length === 0 ? (
//                     <div className="text-center py-16 bg-white rounded-2xl border border-[#F7C7D3]/30">
//                       <Package className="w-12 h-12 text-[#F7C7D3] mx-auto mb-3" />
//                       <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: FONT_FAMILY }}>No products found</p>
//                       <button onClick={clearFilters} className="px-4 py-1.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-xs font-medium rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all" style={{ fontFamily: FONT_FAMILY }}>
//                         Clear Filters
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       {/* <div className="mb-3 text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY }}>Found {totalProducts} product{totalProducts !== 1 ? 's' : ''}</div> */}
                      
//                       {(isMobile || viewMode === 'grid') ? (
//                         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 ">
//                           {products.map(product => (
//                             <ProductGridCard key={product._id} product={product} router={router} isInCart={productsInCart[product._id] || false} onViewInCart={openCartSidebar} />
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="space-y-3">
//                           {products.map(product => (
//                             <ProductListCard key={product._id} product={product} router={router} isInCart={productsInCart[product._id] || false} onViewInCart={openCartSidebar} />
//                           ))}
//                         </div>
//                       )}

//                       {/* Pagination */}
//                       {totalPages > 1 && (
//                         <div className="flex justify-center items-center gap-1.5 mt-8">
//                           <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="px-2 py-1 border border-[#F7C7D3]/30 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] text-xs transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                             Prev
//                           </button>
//                           {[...Array(totalPages)].map((_, i) => {
//                             const pageNum = i + 1;
//                             if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
//                               return (
//                                 <button key={i} onClick={() => handlePageChange(pageNum)} className={`min-w-[28px] h-7 text-xs font-medium rounded-full transition-all ${currentPage === pageNum ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/25' : 'border border-[#F7C7D3]/30 text-gray-700 hover:bg-[#FFF5F6]'}`} style={{ fontFamily: FONT_FAMILY }}>
//                                   {pageNum}
//                                 </button>
//                               );
//                             } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
//                               return <span key={i} className="text-xs text-gray-400">...</span>;
//                             }
//                             return null;
//                           })}
//                           <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="px-2 py-1 border border-[#F7C7D3]/30 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] text-xs transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                             Next
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filters Modal */}
//       {showMobileFilters && (
//         <div className="fixed inset-0 z-50 md:hidden">
//           <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
//           <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto shadow-xl">
//             <div className="sticky top-0 bg-white p-3 border-b border-[#F7C7D3]/30 flex items-center justify-between">
//               <h3 className="text-sm font-semibold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>Filters</h3>
//               <button onClick={() => setShowMobileFilters(false)} className="p-1.5 hover:bg-[#FFF5F6] rounded-full transition-colors">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//             <div className="p-3">
//               <FilterSidebar 
//                 expandedSections={expandedSections}
//                 toggleSection={toggleSection}
//                 categories={categories}
//                 subcategories={subcategories}
//                 childSubcategories={childSubcategories}
//                 brands={brands}
//                 filters={filters}
//                 handleCategoryChange={handleCategoryChange}
//                 handleRemoveCategory={handleRemoveCategory}
//                 handleSubcategoryChange={handleSubcategoryChange}
//                 handleRemoveSubcategory={handleRemoveSubcategory}
//                 handleChildSubcategoryChange={handleChildSubcategoryChange}
//                 handleRemoveChildSubcategory={handleRemoveChildSubcategory}
//                 handleBrandChange={handleBrandChange}
//                 handleRemoveBrand={handleRemoveBrand}
//                 handleUnitChange={handleUnitChange}
//                 handleRemoveUnit={handleRemoveUnit}
//                 minPriceInput={minPriceInput}
//                 maxPriceInput={maxPriceInput}
//                 setMinPriceInput={setMinPriceInput}
//                 setMaxPriceInput={setMaxPriceInput}
//                 applyPriceRange={applyPriceRange}
//                 clearPriceRange={clearPriceRange}
//                 getActiveFilterCount={getActiveFilterCount}
//                 clearFilters={clearFilters}
//                 selectedCategory={selectedCategory}
//                 selectedSubcategory={selectedSubcategory}
//                 showChildSubcategory={showChildSubcategory}
//                 availableUnits={availableUnits}
//                 unitsLoading={unitsLoading}
//               />
//             </div>
//             <div className="sticky bottom-0 bg-white p-3 border-t border-[#F7C7D3]/30">
//               <button onClick={() => setShowMobileFilters(false)} className="w-full py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-xs font-medium rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all" style={{ fontFamily: FONT_FAMILY }}>
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />

//       <Footer />

//       <style jsx>{`
//         @keyframes loading-bar {
//           0% { transform: translateX(-100%); }
//           50% { transform: translateX(0); }
//           100% { transform: translateX(100%); }
//         }
//         .animate-loading-bar {
//           animation: loading-bar 1.5s ease-in-out infinite;
//         }
//       `}</style>
//     </>
//   );
// }

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Link from 'next/link';
import { 
  Search, 
  Grid, 
  List, 
  SlidersHorizontal, 
  X, 
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Tag,
  Users,
  DollarSign,
  Sparkles,
  Eye, 
  ShoppingCart,
  ArrowLeft,
  Package,
  TrendingUp,
  Palette,
  Ruler,
  FolderTree,
  Gift,
  Heart,
  Truck,
  Star,
  Clock,
  Zap,
  Building2,
  Box,
  Scale,
  AlertTriangle,
  Flower2,
  Flame,
  ShoppingBag
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../components/CartSidebar';

// Font constants - Beauty Bucket Green Theme
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// Loading Bar Component
const LoadingBar = ({ isVisible }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-0.5 bg-[#c5d5be] z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="h-full bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] animate-loading-bar"></div>
    </div>
  );
};

// Helper functions
const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

const truncateText = (text, limit = 40) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

// const ProductGridCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [imageErrors, setImageErrors] = useState({});
//   const [hasUserNavigated, setHasUserNavigated] = useState(false);
//   const [isCartHovered, setIsCartHovered] = useState(false);

//   // Safe data extraction
//   const productId = product?._id || product?.id || 'unknown';
//   const productName = product?.productName || product?.name || 'Product';
//   const regularPrice = Number(product?.regularPrice || product?.price || 0);
//   const discountPrice = Number(product?.discountPrice || 0);
//   const stockQuantity = Number(product?.stockQuantity || 0);

//   // Brand
//   const brand = product?.brand
//     ? typeof product.brand === 'string'
//       ? product.brand
//       : product.brand?.name || product.brand?.title || 'General'
//     : product?.brandName || 'General';

//   // Images
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

//   // Tags
//   let tagNames = [];
//   if (product?.tags && Array.isArray(product.tags)) {
//     tagNames = product.tags
//       .map((tag) => {
//         if (typeof tag === 'string') return tag;
//         if (tag?.name) return tag.name;
//         return null;
//       })
//       .filter(Boolean);
//   }
//   const primaryTag = tagNames[0] || null;

//   // Price & discount
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;

//   // Stock
//   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;

//   // Rating
//   const rating = product?.rating ? Number(product.rating) : 0;
//   const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;

//   const hasMultipleImages = productImages.length > 1;
//   const hasHoverImage = productImages.length > 1;

//   // Mobile detection
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

//   // Reset navigation state when hover ends
//   useEffect(() => {
//     if (!isHovered) {
//       setHasUserNavigated(false);
//       setActiveIndex(0);
//     }
//   }, [isHovered]);

//   // Image navigation
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
//     // If hovered AND user hasn't manually navigated, show the second image
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

//   // Add to cart
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

//   // Render stars
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

//   // Navigate to product page
//   const navigateToProduct = () => {
//     router.push(`/product/${product.slug || product._id}`);
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
//       <Link href={`/product/${product.slug || product._id}`} className="block h-full">
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
          
//           {/* =================================
//               DISCOUNT PERCENT BADGE - Top Left
//           ================================== */}
//           {discountPercent > 0 && (
//             <motion.div
//               className="absolute left-2.5 top-2 z-10"
//               animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
//               transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
//             >
//               <span className="relative flex items-center justify-center overflow-hidden rounded-full bg-[#8B9D83] px-2 py-[3px] text-[7px] font-semibold tracking-wide text-white sm:text-[8px]" style={{ fontFamily: FONT_FAMILY }}>
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

//           {/* =================================
//               BRAND BADGE - Top Right on Image
//           ================================== */}
//           <div className="absolute right-2.5 top-2 z-10">
//             <span className="rounded-full bg-black/70 px-2 py-[3px] text-[7px] font-medium uppercase tracking-wide text-white backdrop-blur-sm sm:text-[8px]" style={{ fontFamily: FONT_FAMILY }}>
//               {brand}
//             </span>
//           </div>

//           {/* =================================
//               PRODUCT IMAGE
//           ================================== */}
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

//             {/* Image Navigation Arrows - Only if multiple images */}
//             {hasMultipleImages && (
//               <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
//                 <motion.button
//                   type="button"
//                   onMouseDown={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                   }}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     prevImage(e);
//                   }}
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
//                       onMouseDown={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                       }}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         goToImage(e, index);
//                       }}
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
//                   onMouseDown={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                   }}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     nextImage(e);
//                   }}
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
//                 <span className="rounded-full bg-black px-3 py-1 text-[10px] font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
//                   Out of Stock
//                 </span>
//               </div>
//             )}

//             {/* =================================
//                 HOVER ACTIONS - Eye & Bag Icons (Desktop only)
//             ================================== */}
//             {!isMobile && (
//               <div className={`absolute right-2.5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 transition-all duration-300 ${
//                 isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
//               }`}>
//                 {/* View Icon */}
//                 <motion.button
//                   type="button"
//                   onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToProduct(); }}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-[#8B9D83] hover:text-white"
//                   aria-label="View product"
//                 >
//                   <Eye className="h-3.5 w-3.5" />
//                 </motion.button>

//                 {/* Add to Cart Icon */}
//                 <motion.button
//                   type="button"
//                   onClick={handleAddToCart}
//                   disabled={isOutOfStock || cartStatusLoading}
//                   whileHover={!isOutOfStock ? { scale: 1.1 } : {}}
//                   whileTap={!isOutOfStock ? { scale: 0.9 } : {}}
//                   className={`flex h-7 w-7 items-center justify-center rounded-full shadow-md transition-all ${
//                     isInCart
//                       ? 'bg-[#8B9D83] text-white'
//                       : isOutOfStock
//                       ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
//                       : 'bg-white text-gray-700 hover:bg-[#8B9D83] hover:text-white'
//                   }`}
//                   aria-label={isInCart ? 'In Cart' : 'Add to cart'}
//                 >
//                   {cartStatusLoading ? (
//                     <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                   ) : isInCart ? (
//                     <Check className="h-3.5 w-3.5" />
//                   ) : (
//                     <ShoppingBag className="h-3.5 w-3.5" />
//                   )}
//                 </motion.button>
//               </div>
//             )}
//           </div>

//           {/* =================================
//               PRODUCT NAME
//           ================================== */}
//           <h3
//             className="
//               mt-1.5
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
//             style={{ fontFamily: FONT_FAMILY }}
//           >
//             {truncateText(productName, 25)}
//           </h3>

//           {/* =================================
//               RATING - Shows actual rating from backend
//           ================================== */}
//           <div className="mt-1 flex items-center justify-center gap-[2px]">
//             <div className="flex">
//               {renderStars()}
//             </div>
//             {reviewCount > 0 && (
//               <span className="ml-1 text-[9px] text-[#8B9D83] sm:text-[10px]" style={{ fontFamily: FONT_FAMILY }}>
//                 ({reviewCount})
//               </span>
//             )}
//           </div>

//           {/* =================================
//               PRICE
//           ================================== */}
//           <div className="mt-1 text-center">
//             {discountPercent > 0 ? (
//               <>
//                 <span className="text-[12px] font-bold text-[#8B9D83] sm:text-sm" style={{ fontFamily: FONT_FAMILY }}>
//                   ৳{formatPrice(currentPrice)}
//                 </span>
//                 <span className="ml-1.5 text-[10px] text-gray-400 line-through sm:text-[11px]" style={{ fontFamily: FONT_FAMILY }}>
//                   ৳{formatPrice(originalPrice)}
//                 </span>
//               </>
//             ) : (
//               <span className="text-[12px] font-bold text-[#2D1B2E] sm:text-sm" style={{ fontFamily: FONT_FAMILY }}>
//                 ৳{formatPrice(currentPrice)}
//               </span>
//             )}
//           </div>

//           {/* =================================
//               STOCK STATUS - Below price
//           ================================== */}
//           <div className="mt-0.5 text-center">
//             <span className={`text-[7px] font-medium uppercase tracking-wide sm:text-[8px] ${
//               isOutOfStock ? 'text-red-500' : isLowStock ? 'text-orange-500' : 'text-emerald-600'
//             }`} style={{ fontFamily: FONT_FAMILY }}>
//               {isOutOfStock ? 'Out of Stock' : isLowStock ? `Only ${stockQuantity} left` : 'In Stock'}
//             </span>
//           </div>

//           {/* =================================
//               ADD TO BAG BUTTON
//           ================================== */}
//           <motion.button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={isOutOfStock || cartStatusLoading}
//             whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
//             whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
//             className={`
//               mt-1.5
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
//             style={{ fontFamily: FONT_FAMILY }}
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="mx-auto h-3 w-3 animate-spin" />
//             ) : isInCart ? (
//               'IN CART'
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


// ============================================================
//  PRODUCT GRID CARD - Green Theme
// ============================================================
const ProductGridCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const [imageErrors, setImageErrors] = useState({});
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [hasUserNavigated, setHasUserNavigated] = useState(false);

  // Safe data extraction
  const productId = product?._id || product?.id || 'unknown';
  const productName = product?.productName || product?.name || 'Product';
  const regularPrice = Number(product?.regularPrice || product?.price || 0);
  const discountPrice = Number(product?.discountPrice || 0);
  const stockQuantity = Number(product?.stockQuantity || 0);

  // Brand
  const brand = product?.brand
    ? typeof product.brand === 'string'
      ? product.brand
      : product.brand?.name || product.brand?.title || 'General'
    : product?.brandName || 'General';

  // Images
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

  // Tags
  let tagNames = [];
  if (product?.tags && Array.isArray(product.tags)) {
    tagNames = product.tags
      .map((tag) => {
        if (typeof tag === 'string') return tag;
        if (tag?.name) return tag.name;
        return null;
      })
      .filter(Boolean);
  }
  const primaryTag = tagNames[0] || null;

  // Price & discount
  const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
  const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
  const originalPrice = regularPrice;

  // Stock
  const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = stockQuantity <= 0;

  // Rating
  const rating = product?.rating ? Number(product.rating) : 4.7;
  const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const hasMultipleImages = productImages.length > 1;
  const hasHoverImage = productImages.length > 1;

  // Mobile detection
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

  // Reset navigation state when hover ends
  useEffect(() => {
    if (!isHovered) {
      setHasUserNavigated(false);
      setActiveIndex(0);
    }
  }, [isHovered]);

  // Image navigation
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
    // If hovered AND user hasn't manually navigated, show the second image
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

  // Add to cart
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

  // Render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-2.5 sm:h-3 w-2.5 sm:w-3 fill-current text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-2.5 sm:h-3 w-2.5 sm:w-3">
            <Star className="absolute h-2.5 sm:h-3 w-2.5 sm:w-3 text-gray-200" />
            <div className="absolute left-0 top-0 h-2.5 sm:h-3 w-1/2 overflow-hidden">
              <Star className="h-2.5 sm:h-3 w-2.5 sm:w-3 fill-current text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-2.5 sm:h-3 w-2.5 sm:w-3 text-[#8B9D83]/30" />);
      }
    }
    return stars;
  };

  // Navigate to product page
  const navigateToProduct = () => {
    router.push(`/product/${product.slug || product._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/product/${product.slug || product._id}`}
        className="block h-full"
      >
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#FDF7EF] p-1.5 sm:p-2 transition-all duration-300 hover:-translate-y-1.5 border-[#8B9D83]/20 shadow-[0_2px_9px_rgba(139,157,131,0.06)] hover:border-[#8B9D83] hover:shadow-[0_18px_40px_rgba(139,157,131,0.12)]">
          
          {/* ===== IMAGE SECTION ===== */}
          <div className="relative overflow-hidden rounded-xl bg-[#FDF7EF]">
            <div className="relative aspect-square w-full overflow-hidden">
              <img
                src={getCurrentImage()}
                alt={productName}
                className={`w-full h-full object-contain p-2 sm:p-4 transition-transform duration-500 ease-out ${
                  isHovered ? 'scale-[1.06]' : 'scale-100'
                }`}
                onError={() => handleImageError(isHovered && hasHoverImage && !isMobile && !hasUserNavigated ? 1 : activeIndex)}
                loading="lazy"
              />

              {/* Discount Badge - Sage Green */}
              {discountPercent > 0 && (
                <motion.div
                  className="absolute left-1.5 sm:left-2 top-1.5 sm:top-2 z-10"
                  animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
                  transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                >
                  <div
                    className="relative flex h-9 sm:h-12 w-7 sm:w-10 items-start justify-center overflow-hidden bg-[#8B9D83] px-0.5 sm:px-1 pt-1 sm:pt-2 text-center text-[7px] sm:text-[9px] font-bold uppercase leading-[0.8] sm:leading-[0.9] tracking-wide text-white"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
                      fontFamily: FONT_FAMILY
                    }}
                  >
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    <span className="relative z-10 block leading-tight">
                      {discountPercent}%<br />OFF
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Tag Badge - Black with white text, right side */}
              {primaryTag && (
                <div className={`absolute z-10 flex items-center gap-0.5 sm:gap-1 rounded bg-black/80 px-1 sm:px-2 py-0.5 sm:py-1 text-[7px] sm:text-[9px] font-medium text-white backdrop-blur-sm ${
                  isMobile ? 'right-1.5 top-1.5' : 'right-1.5 sm:right-2 top-1.5 sm:top-2'
                }`}>
                  <Sparkles className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" />
                  <span className="truncate max-w-[25px] sm:max-w-none" style={{ fontFamily: FONT_FAMILY }}>
                    {primaryTag}
                  </span>
                </div>
              )}

              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/60">
                  <span className="rounded-full bg-black px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
                    Out of Stock
                  </span>
                </div>
              )}

              {/* Low Stock Badge */}
              {!isOutOfStock && isLowStock && (
                <div className="absolute bottom-2 left-2 z-10 flex items-center gap-0.5 sm:gap-1 rounded bg-orange-500 px-1 sm:px-2 py-0.5 sm:py-1 text-[7px] sm:text-[9px] font-medium text-white">
                  <AlertTriangle className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" />
                  <span className="hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
                  <span className="xs:hidden" style={{ fontFamily: FONT_FAMILY }}>{stockQuantity} left</span>
                </div>
              )}

              {/* Desktop Hover Actions - Always visible on mobile */}
              <div className={`absolute right-2 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5 sm:gap-2 transition-all duration-300 ${
                isMobile 
                  ? 'opacity-100 translate-x-0' 
                  : isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
              }`}>
                <motion.button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToProduct(); }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex items-center justify-center rounded-full border border-[#8B9D83]/30 bg-white text-gray-700 shadow-md transition-all hover:bg-[#8B9D83] hover:text-white ${
                    isMobile ? 'h-6 w-6' : 'h-8 w-8'
                  }`}
                  aria-label="View product"
                >
                  <Eye className={isMobile ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'} />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || cartStatusLoading}
                  whileHover={!isOutOfStock ? { scale: 1.1 } : {}}
                  whileTap={!isOutOfStock ? { scale: 0.9 } : {}}
                  className={`flex items-center justify-center rounded-full border shadow-md transition-all ${
                    isInCart
                      ? 'border-[#8B9D83] bg-[#8B9D83] text-white'
                      : isOutOfStock
                      ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
                      : 'border-[#8B9D83]/30 bg-white text-gray-700 hover:bg-[#8B9D83] hover:text-white'
                  } ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}
                  aria-label={isInCart ? 'In Cart' : 'Add to cart'}
                >
                  {cartStatusLoading ? (
                    <Loader2 className={isMobile ? 'h-2.5 w-2.5 animate-spin' : 'h-3.5 w-3.5 animate-spin'} />
                  ) : (
                    <ShoppingBag className={isMobile ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'} />
                  )}
                </motion.button>
              </div>

              {/* Image Navigation - Arrows & Dots */}
              {hasMultipleImages && (
                <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 sm:gap-2">
                  <motion.button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(e); }}
                    className="rounded-full p-0.5"
                    aria-label="Previous image"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-[#8B9D83] drop-shadow-md" />
                  </motion.button>

                  <div className="flex items-center gap-0.5 sm:gap-1.5">
                    {productImages.map((_, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToImage(e, index); }}
                        className={`rounded-full transition-all duration-200 ${
                          activeIndex === index
                            ? 'h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#8B9D83]'
                            : 'h-1 w-1 sm:h-1.5 sm:w-1.5 bg-[#8B9D83]/40 hover:bg-[#8B9D83]/70'
                        }`}
                        whileHover={{ scale: 1.3 }}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>

                  <motion.button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(e); }}
                    className="rounded-full p-0.5"
                    aria-label="Next image"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-[#8B9D83] drop-shadow-md" />
                  </motion.button>
                </div>
              )}

              {/* Hover Image Hint */}
              {hasHoverImage && !isMobile && !isHovered && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[8px] text-white/70 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Hover to view
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ===== PRODUCT INFO ===== */}
          <div className="flex flex-1 flex-col px-1 sm:px-1.5 pb-1 pt-1.5 sm:pt-3">
            {/* Brand + Stock Status */}
            <div className="mb-0.5 sm:mb-1 flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.12em] text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
                {brand}
              </span>
              <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
                <span className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full ${stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className={`text-[6px] sm:text-[8px] font-medium ${stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`} style={{ fontFamily: FONT_FAMILY }}>
                  {stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h3
              className="min-h-[26px] sm:min-h-[34px] line-clamp-2 text-[11px] sm:text-[13px] font-semibold leading-[1.2] sm:leading-[1.3] text-[#263b32] transition-colors group-hover:text-[#8B9D83]"
              style={{ fontFamily: FONT_FAMILY }}
              title={productName}
            >
              {truncateText(productName, 50)}
            </h3>

            {/* Rating */}
            <div className="mt-1 flex items-center gap-0.5 sm:gap-1.5">
              <div className="flex items-center gap-0.5">{renderStars()}</div>
              <span className="text-[8px] sm:text-[9px] font-medium text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
                {rating.toFixed(1)}
              </span>
              {reviewCount > 0 && (
                <>
                  <span className="text-gray-300 hidden xs:inline">•</span>
                  <span className="text-[7px] sm:text-[9px] text-gray-400 hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>
                    {reviewCount} reviews
                  </span>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="my-1.5 sm:my-2.5 h-px bg-gradient-to-r from-[#8B9D83]/30 to-transparent" />

            {/* Price + Cart */}
            <div className="mt-auto flex items-center justify-between gap-2 pt-0.5 sm:pt-1">
              <div className="flex min-w-0 flex-col whitespace-nowrap">
                <span className="text-[13px] sm:text-[15px] font-bold tracking-tight text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
                  ৳{formatPrice(currentPrice)}
                </span>
                {discountPercent > 0 && (
                  <span className="text-[6px] sm:text-[8px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
                    ৳{formatPrice(originalPrice)}
                  </span>
                )}
              </div>

              <motion.button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || cartStatusLoading}
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
                whileHover={!isOutOfStock ? { scale: 1.08 } : {}}
                whileTap={!isOutOfStock ? { scale: 0.92 } : {}}
                animate={isCartHovered && !isOutOfStock ? { rotate: [0, -10, 10, -6, 6, 0] } : {}}
                transition={{ duration: 0.5 }}
                aria-label={isInCart ? 'View cart' : 'Add to cart'}
                className={`flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                  isInCart
                    ? 'bg-[#8B9D83] text-white shadow-[0_4px_12px_rgba(139,157,131,0.22)]'
                    : isOutOfStock
                    ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                    : 'border border-[#8B9D83]/30 bg-white text-[#8B9D83] hover:border-[#8B9D83] hover:bg-[#8B9D83] hover:text-white hover:shadow-[0_4px_12px_rgba(139,157,131,0.18)]'
                }`}
              >
                {cartStatusLoading ? (
                  <Loader2 className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 animate-spin" />
                ) : (
                  <ShoppingBag className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
                )}
              </motion.button>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

// ============================================================
//  PRODUCT LIST CARD - Green Theme
// ============================================================
const ProductListCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [isCartHovered, setIsCartHovered] = useState(false);

  // Safe data extraction
  const productId = product?._id || product?.id || 'unknown';
  const productName = product?.productName || product?.name || 'Product';
  const regularPrice = Number(product?.regularPrice || product?.price || 0);
  const discountPrice = Number(product?.discountPrice || 0);
  const stockQuantity = Number(product?.stockQuantity || 0);

  // Brand
  const brand = product?.brand
    ? typeof product.brand === 'string'
      ? product.brand
      : product.brand?.name || product.brand?.title || 'General'
    : product?.brandName || 'General';

  // Category name
  const categoryName = product?.category?.name || product?.categoryName || '';

  // Images
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

  // Tags
  let tagNames = [];
  if (product?.tags && Array.isArray(product.tags)) {
    tagNames = product.tags
      .map((tag) => {
        if (typeof tag === 'string') return tag;
        if (tag?.name) return tag.name;
        return null;
      })
      .filter(Boolean);
  }
  const primaryTag = tagNames[0] || null;

  // Price & discount
  const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
  const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
  const originalPrice = regularPrice;

  // Stock
  const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = stockQuantity <= 0;

  // Rating
  const rating = product?.rating ? Number(product.rating) : 4.7;
  const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const hasMultipleImages = productImages.length > 1;

  // Mobile detection
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

  // Image navigation
  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      setActiveIndex((prev) => (prev + 1) % productImages.length);
    }
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMultipleImages) {
      setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    }
  };

  const goToImage = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex(index);
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const getCurrentImage = () => {
    const image = productImages[activeIndex] || productImages[0];
    if (imageErrors[activeIndex]) {
      return '/placeholder-product.jpg';
    }
    return image;
  };

  // Add to cart
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

  // Render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-2.5 w-2.5 fill-current text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-2.5 w-2.5">
            <Star className="absolute h-2.5 w-2.5 text-gray-200" />
            <div className="absolute left-0 top-0 h-2.5 w-1/2 overflow-hidden">
              <Star className="h-2.5 w-2.5 fill-current text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-2.5 w-2.5 text-[#8B9D83]/30" />);
      }
    }
    return stars;
  };

  // Navigate to product page
  const navigateToProduct = () => {
    router.push(`/product/${product.slug || product._id}`);
  };

  // Get description
  const getDescription = () => {
    const fullDesc = product.fullDescription?.replace(/<[^>]*>/g, '') || '';
    const shortDesc = product.shortDescription?.replace(/<[^>]*>/g, '') || '';
    const desc = fullDesc || shortDesc || 'No description available';
    return desc.length > 120 ? desc.substring(0, 120) + '...' : desc;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/product/${product.slug || product._id}`}
        className="block h-full"
      >
        <article className="relative flex flex-col sm:flex-row overflow-hidden rounded-xl border border-[#c5d5be]/30 bg-white p-2 sm:p-3 shadow-[0_2px_9px_rgba(139,157,131,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8B9D83]/50 hover:shadow-[0_18px_40px_rgba(139,157,131,0.12)]">
          
          {/* IMAGE SECTION */}
          <div className="sm:w-32 md:w-40 lg:w-44 relative flex-shrink-0">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#c5d5be]/10 to-[#8B9D83]/5">
              <div className="relative aspect-square w-full overflow-hidden">
                <img
                  src={getCurrentImage()}
                  alt={productName}
                  className="w-full h-full object-contain p-2 sm:p-3 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  onError={() => handleImageError(activeIndex)}
                  loading="lazy"
                />

                {discountPercent > 0 && (
                  <motion.div
                    className="absolute left-1.5 top-1.5 z-10"
                    animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                  >
                    <div
                      className="relative flex h-9 w-8 items-start justify-center overflow-hidden bg-[#8B9D83] px-0.5 pt-1.5 text-center text-[7px] font-bold uppercase leading-[0.8] tracking-wide text-white"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
                        fontFamily: FONT_FAMILY
                      }}
                    >
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '200%' }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}
                      <span className="relative z-10 block leading-tight">
                        {discountPercent}%<br />OFF
                      </span>
                    </div>
                  </motion.div>
                )}

                {primaryTag && (
                  <div className="absolute right-1.5 top-1.5 z-10 flex items-center gap-0.5 rounded bg-black/80 px-1.5 py-0.5 text-[7px] font-medium text-white backdrop-blur-sm">
                    <Sparkles className="h-2 w-2" />
                    <span style={{ fontFamily: FONT_FAMILY }}>{primaryTag}</span>
                  </div>
                )}

                {isOutOfStock && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-black/60">
                    <span className="rounded-full bg-black px-2 py-1 text-[9px] font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
                      Out of Stock
                    </span>
                  </div>
                )}

                {!isOutOfStock && isLowStock && (
                  <div className="absolute bottom-1.5 left-1.5 z-10 flex items-center gap-0.5 rounded bg-orange-500 px-1.5 py-0.5 text-[7px] font-medium text-white">
                    <AlertTriangle className="h-2 w-2" />
                    <span style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
                  </div>
                )}

                {!isMobile && (
                  <div className={`absolute right-1.5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToProduct(); }}
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-[#c5d5be]/30 bg-white text-gray-700 shadow-md transition-all hover:bg-[#8B9D83] hover:text-white"
                      aria-label="View product"
                    >
                      <Eye className="h-3 w-3" />
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={isOutOfStock || cartStatusLoading}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex h-6 w-6 items-center justify-center rounded-full border border-[#c5d5be]/30 bg-white shadow-md transition-all hover:bg-[#8B9D83] hover:text-white ${cartStatusLoading ? 'pointer-events-none opacity-50' : ''}`}
                      aria-label="Add to cart"
                    >
                      {cartStatusLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : isInCart ? (
                        <ShoppingBag className="h-3 w-3 text-green-500" />
                      ) : (
                        <ShoppingBag className="h-3 w-3" />
                      )}
                    </motion.button>
                  </div>
                )}

                {hasMultipleImages && (
                  <div className="absolute bottom-1.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
                    <motion.button
                      type="button"
                      onClick={prevImage}
                      className="rounded-full p-0.5"
                      aria-label="Previous image"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="h-2.5 w-2.5 text-[#8B9D83]" />
                    </motion.button>
                    <div className="flex items-center gap-0.5">
                      {productImages.map((_, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={(e) => goToImage(e, index)}
                          className={`rounded-full transition-all duration-200 ${activeIndex === index ? 'h-1.5 w-1.5 bg-[#8B9D83]' : 'h-1 w-1 bg-[#c5d5be]/60 hover:bg-[#8B9D83]/50'}`}
                          whileHover={{ scale: 1.3 }}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                    <motion.button
                      type="button"
                      onClick={nextImage}
                      className="rounded-full p-0.5"
                      aria-label="Next image"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="h-2.5 w-2.5 text-[#8B9D83]" />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="flex-1 flex flex-col p-2 sm:p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="flex items-center gap-1">
                <Building2 className="w-2.5 h-2.5 text-[#8B9D83]" />
                <span className="text-[9px] sm:text-[10px] font-medium text-[#8B9D83] tracking-wide" style={{ fontFamily: FONT_FAMILY }}>
                  {brand}
                </span>
              </div>
              <span className="w-0.5 h-0.5 rounded-full bg-[#c5d5be]"></span>
              {categoryName && (
                <div className="flex items-center gap-1">
                  <FolderTree className="w-2.5 h-2.5 text-[#53645a]" />
                  <span className="text-[9px] sm:text-[10px] font-medium text-[#53645a] tracking-wide" style={{ fontFamily: FONT_FAMILY }}>
                    {categoryName}
                  </span>
                </div>
              )}
            </div>

            <h3
              className="text-xs sm:text-sm md:text-base font-semibold text-[#263b32] mb-0.5 line-clamp-1 transition-colors group-hover:text-[#8B9D83]"
              style={{ fontFamily: FONT_FAMILY }}
              title={productName}
            >
              {productName}
            </h3>

            <p className="text-[10px] sm:text-xs text-[#53645a] mb-1.5 line-clamp-2 leading-relaxed tracking-wide" style={{ fontFamily: FONT_FAMILY }}>
              {getDescription()}
            </p>

            <div className="flex items-center gap-1 mb-1.5">
              <div className="flex items-center gap-0.5">{renderStars()}</div>
              <span className="text-[8px] font-medium text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
                {rating.toFixed(1)}
              </span>
              {reviewCount > 0 && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-[8px] text-gray-400" style={{ fontFamily: FONT_FAMILY }}>
                    {reviewCount} reviews
                  </span>
                </>
              )}
            </div>

            <div className="my-1 h-px bg-gradient-to-r from-[#c5d5be]/30 to-transparent" />

            <div className="mt-auto flex items-center justify-between gap-2 pt-0.5 flex-wrap">
              <div className="flex min-w-0 items-center gap-1 whitespace-nowrap flex-wrap">
                <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
                  ৳{formatPrice(currentPrice)}
                </span>
                {discountPercent > 0 && (
                  <span className="text-[8px] sm:text-[9px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
                    ৳{formatPrice(originalPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-[7px] sm:text-[8px] font-medium text-white bg-[#8B9D83] px-1.5 py-0.5 rounded" style={{ fontFamily: FONT_FAMILY }}>
                    -{discountPercent}%
                  </span>
                )}
                <span className="text-[8px] sm:text-[9px] text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
                  /{getUnitLabel(product.unit)}
                </span>
              </div>

              <motion.button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || cartStatusLoading}
                whileHover={!isOutOfStock ? { scale: 1.05 } : {}}
                whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
                aria-label={isInCart ? 'View cart' : 'Add to cart'}
                className={`flex h-7 sm:h-8 px-3 sm:px-4 items-center justify-center gap-1 rounded-lg text-[9px] sm:text-[10px] md:text-xs font-medium transition-all duration-200 ${
                  isInCart
                    ? 'bg-[#465641] text-white shadow-[0_4px_12px_rgba(70,86,65,0.22)] hover:shadow-[0_6px_20px_rgba(70,86,65,0.3)]'
                    : isOutOfStock
                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                    : 'bg-[#8B9D83] text-white hover:shadow-lg hover:shadow-[#8B9D83]/25'
                }`}
              >
                {cartStatusLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : isInCart ? (
                  <>
                    <ShoppingBag className="h-3 w-3" />
                    <span className="hidden sm:inline">View in Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3 w-3" />
                    <span className="hidden sm:inline">Add to Bag</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

// ============================================================
//  FILTER SIDEBAR - Green Theme (Reduced Width)
// ============================================================
// const FilterSidebar = ({ 
//   isOpen,
//   onClose,
//   expandedSections, 
//   toggleSection, 
//   categories, 
//   subcategories,
//   childSubcategories,
//   brands,
//   filters, 
//   handleCategoryChange, 
//   handleRemoveCategory,
//   handleSubcategoryChange,
//   handleRemoveSubcategory,
//   handleChildSubcategoryChange,
//   handleRemoveChildSubcategory,
//   handleBrandChange,
//   handleRemoveBrand,
//   handleUnitChange,
//   handleRemoveUnit,
//   minPriceInput,
//   maxPriceInput,
//   setMinPriceInput,
//   setMaxPriceInput,
//   applyPriceRange,
//   clearPriceRange,
//   getActiveFilterCount,
//   clearFilters,
//   selectedCategory,
//   selectedSubcategory,
//   showChildSubcategory,
//   availableUnits,      
//   unitsLoading   
// }) => {
//   return (
//     <>
//       {/* Overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-50 bg-black/50"
//             onClick={onClose}
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar - Reduced Width */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ x: '-100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '-100%' }}
//             transition={{ type: 'tween', duration: 0.3 }}
//             className="fixed left-0 top-0 z-50 h-full w-72 md:w-80 bg-white overflow-y-auto shadow-2xl"
//           >
//             {/* Header */}
//             <div className="sticky top-0 bg-white z-10 p-3 border-b border-[#c5d5be]/30 flex items-center justify-between">
//               <h3 className="text-sm font-semibold text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                 <Filter className="w-4 h-4 text-[#8B9D83]" />
//                 Filters
//               </h3>
//               <div className="flex items-center gap-2">
//                 {getActiveFilterCount() > 0 && (
//                   <button onClick={clearFilters} className="text-[10px] text-[#8B9D83] hover:text-[#6b7d63] transition-colors">
//                     Clear All ({getActiveFilterCount()})
//                   </button>
//                 )}
//                 <button onClick={onClose} className="p-1 hover:bg-[#f0f5ed] rounded-full transition-colors">
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Content - Reduced padding */}
//             <div className="p-3">
//               {/* Price Range */}
//               <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
//                 <button onClick={() => toggleSection('price')} className="flex items-center justify-between w-full text-left mb-2">
//                   <h4 className="font-medium text-xs text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <DollarSign className="w-3.5 h-3.5 text-[#8B9D83]" />
//                     Price Range
//                   </h4>
//                   {expandedSections.price ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//                 </button>
                
//                 {expandedSections.price && (
//                   <div className="space-y-2">
//                     <div className="space-y-1.5">
//                       <div className="flex justify-between items-center">
//                         <span className="text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY }}>Min (৳)</span>
//                         <input
//                           type="text"
//                           inputMode="decimal"
//                           value={minPriceInput}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (value === '' || /^\d*\.?\d*$/.test(value)) setMinPriceInput(value);
//                           }}
//                           placeholder="0"
//                           className="w-20 px-2 py-1 text-right text-[10px] border border-[#c5d5be]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B9D83]"
//                         />
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY }}>Max (৳)</span>
//                         <input
//                           type="text"
//                           inputMode="decimal"
//                           value={maxPriceInput}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (value === '' || /^\d*\.?\d*$/.test(value)) setMaxPriceInput(value);
//                           }}
//                           placeholder="Any"
//                           className="w-20 px-2 py-1 text-right text-[10px] border border-[#c5d5be]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B9D83]"
//                         />
//                       </div>
//                     </div>
                    
//                     <button
//                       onClick={applyPriceRange}
//                       disabled={!minPriceInput && !maxPriceInput}
//                       className="w-full py-1 bg-[#8B9D83] text-white text-[10px] font-medium rounded-lg hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Apply Price Range
//                     </button>

//                     {(filters.priceRange.min || filters.priceRange.max) && (
//                       <div className="flex items-center justify-between bg-[#f0f5ed] p-1.5 rounded-lg border border-[#c5d5be]/30">
//                         <span className="text-[10px] font-medium text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
//                         <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600"><X className="w-2.5 h-2.5" /></button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Categories */}
//               <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
//                 <button onClick={() => toggleSection('categories')} className="flex items-center justify-between w-full text-left mb-2">
//                   <h4 className="font-medium text-xs text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <Tag className="w-3.5 h-3.5 text-[#8B9D83]" />
//                     Categories
//                   </h4>
//                   {expandedSections.categories ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//                 </button>
                
//                 {expandedSections.categories && (
//                   <div className="space-y-1.5">
//                     {filters.categories.length > 0 && (
//                       <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
//                         <p className="text-[9px] text-gray-500 mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Categories:</p>
//                         {filters.categories.map(catId => {
//                           const category = categories.find(c => c._id === catId);
//                           return category ? (
//                             <div key={catId} className="flex items-center justify-between py-0.5">
//                               <span className="text-[10px] text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>{category.name}</span>
//                               <button onClick={() => handleRemoveCategory(catId)} className="text-gray-400 hover:text-gray-600"><X className="w-2.5 h-2.5" /></button>
//                             </div>
//                           ) : null;
//                         })}
//                       </div>
//                     )}
                    
//                     <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
//                       {categories.map(category => (
//                         <label key={category._id} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={filters.categories.includes(category._id)}
//                             onChange={() => handleCategoryChange(category._id)}
//                             className="w-3 h-3 rounded border-[#c5d5be]/40 text-[#8B9D83] focus:ring-[#8B9D83]"
//                           />
//                           <span className="text-[10px] text-gray-700 hover:text-[#8B9D83] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{category.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Subcategories */}
//               {selectedCategory && subcategories.length > 0 && (
//                 <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
//                   <button onClick={() => toggleSection('subcategories')} className="flex items-center justify-between w-full text-left mb-2">
//                     <h4 className="font-medium text-xs text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                       <FolderTree className="w-3.5 h-3.5 text-[#8B9D83]" />
//                       Subcategories
//                     </h4>
//                     {expandedSections.subcategories ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//                   </button>
                  
//                   {expandedSections.subcategories && (
//                     <div className="space-y-1.5">
//                       {filters.subcategories.length > 0 && (
//                         <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
//                           <p className="text-[9px] text-gray-500 mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Subcategories:</p>
//                           {filters.subcategories.map(subId => {
//                             const subcategory = subcategories.find(s => s._id === subId);
//                             return subcategory ? (
//                               <div key={subId} className="flex items-center justify-between py-0.5">
//                                 <span className="text-[10px] text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>{subcategory.name}</span>
//                                 <button onClick={() => handleRemoveSubcategory(subId)} className="text-gray-400 hover:text-gray-600"><X className="w-2.5 h-2.5" /></button>
//                               </div>
//                             ) : null;
//                           })}
//                         </div>
//                       )}
                      
//                       <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
//                         {subcategories.map(sub => (
//                           <label key={sub._id} className="flex items-center gap-2 cursor-pointer">
//                             <input
//                               type="checkbox"
//                               checked={filters.subcategories.includes(sub._id)}
//                               onChange={() => handleSubcategoryChange(sub._id)}
//                               className="w-3 h-3 rounded border-[#c5d5be]/40 text-[#8B9D83] focus:ring-[#8B9D83]"
//                             />
//                             <span className="text-[10px] text-gray-700 hover:text-[#8B9D83] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{sub.name}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Child Subcategories */}
//               {showChildSubcategory && childSubcategories.length > 0 && (
//                 <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
//                   <button onClick={() => toggleSection('childSubcategories')} className="flex items-center justify-between w-full text-left mb-2">
//                     <h4 className="font-medium text-xs text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                       <FolderTree className="w-3.5 h-3.5 text-[#8B9D83]" />
//                       Child Subcategories
//                     </h4>
//                     {expandedSections.childSubcategories ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//                   </button>
                  
//                   {expandedSections.childSubcategories && (
//                     <div className="space-y-1.5">
//                       {filters.childSubcategories.length > 0 && (
//                         <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
//                           <p className="text-[9px] text-gray-500 mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Child Subcategories:</p>
//                           {filters.childSubcategories.map(childId => {
//                             const child = childSubcategories.find(c => c._id === childId);
//                             return child ? (
//                               <div key={childId} className="flex items-center justify-between py-0.5">
//                                 <span className="text-[10px] text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>{child.name}</span>
//                                 <button onClick={() => handleRemoveChildSubcategory(childId)} className="text-gray-400 hover:text-gray-600"><X className="w-2.5 h-2.5" /></button>
//                               </div>
//                             ) : null;
//                           })}
//                         </div>
//                       )}
                      
//                       <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
//                         {childSubcategories.map(child => (
//                           <label key={child._id} className="flex items-center gap-2 cursor-pointer">
//                             <input
//                               type="checkbox"
//                               checked={filters.childSubcategories.includes(child._id)}
//                               onChange={() => handleChildSubcategoryChange(child._id)}
//                               className="w-3 h-3 rounded border-[#c5d5be]/40 text-[#8B9D83] focus:ring-[#8B9D83]"
//                             />
//                             <span className="text-[10px] text-gray-700 hover:text-[#8B9D83] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{child.name}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Brands */}
//               <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
//                 <button onClick={() => toggleSection('brands')} className="flex items-center justify-between w-full text-left mb-2">
//                   <h4 className="font-medium text-xs text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <Building2 className="w-3.5 h-3.5 text-[#8B9D83]" />
//                     Brands
//                   </h4>
//                   {expandedSections.brands ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//                 </button>
                
//                 {expandedSections.brands && (
//                   <div className="space-y-1.5">
//                     {filters.brands.length > 0 && (
//                       <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
//                         <p className="text-[9px] text-gray-500 mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Brands:</p>
//                         {filters.brands.map((brand, index) => (
//                           <div key={brand || index} className="flex items-center justify-between py-0.5">
//                             <span className="text-[10px] text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>{brand}</span>
//                             <button onClick={() => handleRemoveBrand(brand)} className="text-gray-400 hover:text-gray-600"><X className="w-2.5 h-2.5" /></button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
                    
//                     <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
//                       {brands.map((brand, index) => (
//                         <label key={brand._id || brand.name || index} className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={filters.brands.includes(brand.name)}
//                             onChange={() => handleBrandChange(brand.name)}
//                             className="w-3 h-3 rounded border-[#c5d5be]/40 text-[#8B9D83] focus:ring-[#8B9D83]"
//                           />
//                           <span className="text-[10px] text-gray-700 hover:text-[#8B9D83] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{brand.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Unit Filter */}
//               <div className="mb-3">
//                 <button onClick={() => toggleSection('unit')} className="flex items-center justify-between w-full text-left mb-2">
//                   <h4 className="font-medium text-xs text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <Scale className="w-3.5 h-3.5 text-[#8B9D83]" />
//                     Unit
//                   </h4>
//                   {expandedSections.unit ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
//                 </button>
                
//                 {expandedSections.unit && (
//                   <div className="space-y-1.5">
//                     {filters.units.length > 0 && (
//                       <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
//                         <p className="text-[9px] text-gray-500 mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Units:</p>
//                         {filters.units.map((unit, index) => {
//                           const unitLabel = availableUnits.find(u => u.value === unit)?.label || unit;
//                           return (
//                             <div key={unit || index} className="flex items-center justify-between py-0.5">
//                               <span className="text-[10px] text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>{unitLabel}</span>
//                               <button onClick={() => handleRemoveUnit(unit)} className="text-gray-400 hover:text-gray-600">
//                                 <X className="w-2.5 h-2.5" />
//                               </button>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
                    
//                     <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
//                       {availableUnits.length === 0 ? (
//                         <p className="text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY }}>No units available</p>
//                       ) : (
//                         availableUnits.map((unit, index) => (
//                           <label key={unit.value || index} className="flex items-center gap-2 cursor-pointer">
//                             <input
//                               type="checkbox"
//                               checked={filters.units.includes(unit.value)}
//                               onChange={() => handleUnitChange(unit.value)}
//                               className="w-3 h-3 rounded border-[#c5d5be]/40 text-[#8B9D83] focus:ring-[#8B9D83]"
//                             />
//                             <span className="text-[10px] text-gray-700 hover:text-[#8B9D83] transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                               {unit.label}
//                             </span>
//                           </label>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// ============================================================
//  FILTER SIDEBAR - Green Theme (Reduced Width) - Better Text Visibility
// ============================================================
// ============================================================
//  FILTER SIDEBAR - Green Theme (Reduced Width) - #465641 Theme
// ============================================================
const FilterSidebar = ({ 
  isOpen,
  onClose,
  expandedSections, 
  toggleSection, 
  categories, 
  subcategories,
  childSubcategories,
  brands,
  filters, 
  handleCategoryChange, 
  handleRemoveCategory,
  handleSubcategoryChange,
  handleRemoveSubcategory,
  handleChildSubcategoryChange,
  handleRemoveChildSubcategory,
  handleBrandChange,
  handleRemoveBrand,
  handleUnitChange,
  handleRemoveUnit,
  minPriceInput,
  maxPriceInput,
  setMinPriceInput,
  setMaxPriceInput,
  applyPriceRange,
  clearPriceRange,
  getActiveFilterCount,
  clearFilters,
  selectedCategory,
  selectedSubcategory,
  showChildSubcategory,
  availableUnits,      
  unitsLoading   
}) => {
  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Reduced Width */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 z-50 h-full w-72 md:w-80 bg-white overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-3 border-b border-[#c5d5be]/30 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                <Filter className="w-4 h-4 text-[#8B9D83]" />
                Filters
              </h3>
              <div className="flex items-center gap-2">
                {getActiveFilterCount() > 0 && (
                  <button onClick={clearFilters} className="text-[10px] text-[#8B9D83] hover:text-[#465641] transition-colors font-medium">
                    Clear All ({getActiveFilterCount()})
                  </button>
                )}
                <button onClick={onClose} className="p-1 hover:bg-[#e8eee4] rounded-full transition-colors">
                  <X className="w-4 h-4 text-[#465641]" />
                </button>
              </div>
            </div>

            {/* Content - Reduced padding */}
            <div className="p-3">
              {/* Price Range */}
              <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
                <button onClick={() => toggleSection('price')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
                  <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                    <DollarSign className="w-3.5 h-3.5 text-[#8B9D83]" />
                    Price Range
                  </h4>
                  {expandedSections.price ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
                </button>
                
                {expandedSections.price && (
                  <div className="space-y-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>Min (৳)</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={minPriceInput}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^\d*\.?\d*$/.test(value)) setMinPriceInput(value);
                          }}
                          placeholder="0"
                          className="w-20 px-2 py-1 text-right text-[11px] text-[#465641] font-medium border border-[#c5d5be]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white hover:border-[#8B9D83]/60 transition-colors"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>Max (৳)</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={maxPriceInput}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^\d*\.?\d*$/.test(value)) setMaxPriceInput(value);
                          }}
                          placeholder="Any"
                          className="w-20 px-2 py-1 text-right text-[11px] text-[#465641] font-medium border border-[#c5d5be]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white hover:border-[#8B9D83]/60 transition-colors"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={applyPriceRange}
                      disabled={!minPriceInput && !maxPriceInput}
                      className="w-full py-1.5 bg-[#8B9D83] text-white text-[11px] font-medium rounded-lg hover:bg-[#465641] hover:shadow-lg hover:shadow-[#465641]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply Price Range
                    </button>

                    {(filters.priceRange.min || filters.priceRange.max) && (
                      <div className="flex items-center justify-between bg-[#f0f5ed] p-1.5 rounded-lg border border-[#c5d5be]/30">
                        <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
                        <button onClick={clearPriceRange} className="text-gray-500 hover:text-[#465641] transition-colors"><X className="w-2.5 h-2.5" /></button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Categories */}
              <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
                <button onClick={() => toggleSection('categories')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
                  <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                    <Tag className="w-3.5 h-3.5 text-[#8B9D83]" />
                    Categories
                  </h4>
                  {expandedSections.categories ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
                </button>
                
                {expandedSections.categories && (
                  <div className="space-y-1.5">
                    {filters.categories.length > 0 && (
                      <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
                        <p className="text-[10px] font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Categories:</p>
                        {filters.categories.map(catId => {
                          const category = categories.find(c => c._id === catId);
                          return category ? (
                            <div key={catId} className="flex items-center justify-between py-0.5">
                              <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>{category.name}</span>
                              <button onClick={() => handleRemoveCategory(catId)} className="text-gray-400 hover:text-[#465641] transition-colors"><X className="w-2.5 h-2.5" /></button>
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                    
                    <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
                      {categories.map(category => (
                        <label key={category._id} className="flex items-center gap-2 cursor-pointer hover:bg-[#e8eee4] px-1 py-0.5 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={filters.categories.includes(category._id)}
                            onChange={() => handleCategoryChange(category._id)}
                            className="w-3.5 h-3.5 rounded border-[#8B9D83]/40 text-[#8B9D83] focus:ring-[#8B9D83] focus:ring-offset-0 hover:border-[#465641] transition-colors"
                          />
                          <span className="text-[12px] font-medium text-[#1f251c] hover:text-[#030403] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{category.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Subcategories */}
              {selectedCategory && subcategories.length > 0 && (
                <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
                  <button onClick={() => toggleSection('subcategories')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
                    <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                      <FolderTree className="w-3.5 h-3.5 text-[#8B9D83]" />
                      Subcategories
                    </h4>
                    {expandedSections.subcategories ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
                  </button>
                  
                  {expandedSections.subcategories && (
                    <div className="space-y-1.5">
                      {filters.subcategories.length > 0 && (
                        <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
                          <p className="text-[10px] font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Subcategories:</p>
                          {filters.subcategories.map(subId => {
                            const subcategory = subcategories.find(s => s._id === subId);
                            return subcategory ? (
                              <div key={subId} className="flex items-center justify-between py-0.5">
                                <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>{subcategory.name}</span>
                                <button onClick={() => handleRemoveSubcategory(subId)} className="text-gray-400 hover:text-[#465641] transition-colors"><X className="w-2.5 h-2.5" /></button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                      
                      <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
                        {subcategories.map(sub => (
                          <label key={sub._id} className="flex items-center gap-2 cursor-pointer hover:bg-[#e8eee4] px-1 py-0.5 rounded transition-colors">
                            <input
                              type="checkbox"
                              checked={filters.subcategories.includes(sub._id)}
                              onChange={() => handleSubcategoryChange(sub._id)}
                              className="w-3.5 h-3.5 rounded border-[#8B9D83]/40 text-[#8B9D83] focus:ring-[#8B9D83] focus:ring-offset-0 hover:border-[#465641] transition-colors"
                            />
                            <span className="text-[12px] font-medium text-[#1f251c] hover:text-[#030403] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{sub.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Child Subcategories */}
              {showChildSubcategory && childSubcategories.length > 0 && (
                <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
                  <button onClick={() => toggleSection('childSubcategories')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
                    <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                      <FolderTree className="w-3.5 h-3.5 text-[#8B9D83]" />
                      Child Subcategories
                    </h4>
                    {expandedSections.childSubcategories ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
                  </button>
                  
                  {expandedSections.childSubcategories && (
                    <div className="space-y-1.5">
                      {filters.childSubcategories.length > 0 && (
                        <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
                          <p className="text-[10px] font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Child Subcategories:</p>
                          {filters.childSubcategories.map(childId => {
                            const child = childSubcategories.find(c => c._id === childId);
                            return child ? (
                              <div key={childId} className="flex items-center justify-between py-0.5">
                                <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>{child.name}</span>
                                <button onClick={() => handleRemoveChildSubcategory(childId)} className="text-gray-400 hover:text-[#465641] transition-colors"><X className="w-2.5 h-2.5" /></button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                      
                      <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
                        {childSubcategories.map(child => (
                          <label key={child._id} className="flex items-center gap-2 cursor-pointer hover:bg-[#e8eee4] px-1 py-0.5 rounded transition-colors">
                            <input
                              type="checkbox"
                              checked={filters.childSubcategories.includes(child._id)}
                              onChange={() => handleChildSubcategoryChange(child._id)}
                              className="w-3.5 h-3.5 rounded border-[#8B9D83]/40 text-[#8B9D83] focus:ring-[#8B9D83] focus:ring-offset-0 hover:border-[#465641] transition-colors"
                            />
                            <span className="text-[12px] font-medium text-[#465641] hover:text-[#8B9D83] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{child.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Brands */}
              <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
                <button onClick={() => toggleSection('brands')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
                  <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                    <Building2 className="w-3.5 h-3.5 text-[#8B9D83]" />
                    Brands
                  </h4>
                  {expandedSections.brands ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
                </button>
                
                {expandedSections.brands && (
                  <div className="space-y-1.5">
                    {filters.brands.length > 0 && (
                      <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
                        <p className="text-[10px] font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Brands:</p>
                        {filters.brands.map((brand, index) => (
                          <div key={brand || index} className="flex items-center justify-between py-0.5">
                            <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>{brand}</span>
                            <button onClick={() => handleRemoveBrand(brand)} className="text-gray-400 hover:text-[#465641] transition-colors"><X className="w-2.5 h-2.5" /></button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
                      {brands.map((brand, index) => (
                        <label key={brand._id || brand.name || index} className="flex items-center gap-2 cursor-pointer hover:bg-[#e8eee4] px-1 py-0.5 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={filters.brands.includes(brand.name)}
                            onChange={() => handleBrandChange(brand.name)}
                            className="w-3.5 h-3.5 rounded border-[#8B9D83]/40 text-[#8B9D83] focus:ring-[#8B9D83] focus:ring-offset-0 hover:border-[#465641] transition-colors"
                          />
                          <span className="text-[12px] font-medium text-[#465641] hover:text-[#8B9D83] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{brand.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Unit Filter */}
              <div className="mb-3">
                <button onClick={() => toggleSection('unit')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
                  <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                    <Scale className="w-3.5 h-3.5 text-[#8B9D83]" />
                    Unit
                  </h4>
                  {expandedSections.unit ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
                </button>
                
                {expandedSections.unit && (
                  <div className="space-y-1.5">
                    {filters.units.length > 0 && (
                      <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
                        <p className="text-[10px] font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Units:</p>
                        {filters.units.map((unit, index) => {
                          const unitLabel = availableUnits.find(u => u.value === unit)?.label || unit;
                          return (
                            <div key={unit || index} className="flex items-center justify-between py-0.5">
                              <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>{unitLabel}</span>
                              <button onClick={() => handleRemoveUnit(unit)} className="text-gray-400 hover:text-[#465641] transition-colors">
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                      {availableUnits.length === 0 ? (
                        <p className="text-[11px] text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>No units available</p>
                      ) : (
                        availableUnits.map((unit, index) => (
                          <label key={unit.value || index} className="flex items-center gap-2 cursor-pointer hover:bg-[#e8eee4] px-1 py-0.5 rounded transition-colors">
                            <input
                              type="checkbox"
                              checked={filters.units.includes(unit.value)}
                              onChange={() => handleUnitChange(unit.value)}
                              className="w-3.5 h-3.5 rounded border-[#8B9D83]/40 text-[#8B9D83] focus:ring-[#8B9D83] focus:ring-offset-0 hover:border-[#465641] transition-colors"
                            />
                            <span className="text-[12px] font-medium text-[#465641] hover:text-[#8B9D83] transition-colors" style={{ fontFamily: FONT_FAMILY }}>
                              {unit.label}
                            </span>
                          </label>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================================
//  MAIN PRODUCTS PAGE
// ============================================================
export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [forceFetch, setForceFetch] = useState(0);
  const [brands, setBrands] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const [availableUnits, setAvailableUnits] = useState([]);
  const [unitsLoading, setUnitsLoading] = useState(true);
  
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    categories: true,
    subcategories: true,
    childSubcategories: true,
    brands: true,
    unit: true
  });

  const productsContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const searchTimerRef = useRef(null);

  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    subcategories: [],
    childSubcategories: [],
    brands: [],
    units: [],
    priceRange: { min: '', max: '' },
    sortBy: 'newest'
  });

  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [initialCategorySet, setInitialCategorySet] = useState(false);

  // Items per page - 20
  const ITEMS_PER_PAGE = 20;

  const openCartSidebar = () => {
    setIsCartOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const saveScrollPosition = () => {
    scrollPositionRef.current = window.scrollY;
  };

  const restoreScrollPosition = () => {
    if (scrollPositionRef.current > 0) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
    }
  };

  const debouncedSearch = useCallback((searchValue) => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      saveScrollPosition();
      setFilters(prev => ({ ...prev, search: searchValue }));
      setCurrentPage(1);
    }, 500);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    saveScrollPosition();
    setFilters(prev => ({ ...prev, search: '' }));
    setCurrentPage(1);
  };

  // Category chip click handler
  const handleCategoryChipClick = (categoryId) => {
    saveScrollPosition();
    if (categoryId === 'all') {
      setActiveCategoryFilter('all');
      setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
      setCurrentPage(1);
      const params = new URLSearchParams(window.location.search);
      params.delete('category');
      window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
      window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
    } else {
      setActiveCategoryFilter(categoryId);
      setFilters(prev => ({ ...prev, categories: [categoryId], subcategories: [], childSubcategories: [] }));
      setCurrentPage(1);
      const params = new URLSearchParams(window.location.search);
      params.set('category', categoryId);
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
      window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId } }));
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/units/all');
        const data = await response.json();
        if (data.success) {
          setAvailableUnits(data.data);
        }
      } catch (error) {
        console.error('Error fetching units:', error);
      } finally {
        setUnitsLoading(false);
      }
    };
    fetchUnits();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories/with-products');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
      setCategoriesLoaded(true);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategoriesLoaded(true);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/brands/with-products');
      const data = await response.json();
      if (data.success) {
        setBrands(data.data);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !initialCategorySet) {
      const categoryParam = searchParams.get('category');
      if (categoryParam && categories.some(cat => cat._id === categoryParam)) {
        setFilters(prev => ({ ...prev, categories: [categoryParam] }));
        setActiveCategoryFilter(categoryParam);
      }
      setInitialCategorySet(true);
    }
  }, [categories, searchParams]);

  useEffect(() => {
    if (filters.categories.length === 1) {
      const categoryId = filters.categories[0];
      setSelectedCategory(categoryId);
      fetchSubcategories(categoryId);
    } else {
      setSubcategories([]);
      setSelectedCategory(null);
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.subcategories.length > 0) setFilters(prev => ({ ...prev, subcategories: [] }));
      if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
    }
  }, [filters.categories]);

  useEffect(() => {
    if (filters.subcategories.length === 1 && selectedCategory) {
      const subcategoryId = filters.subcategories[0];
      setSelectedSubcategory(subcategoryId);
      fetchChildSubcategories(selectedCategory, subcategoryId);
    } else {
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
    }
  }, [filters.subcategories, selectedCategory]);

  useEffect(() => {
    if (initialCategorySet) fetchProducts();
  }, [filters.categories, filters.subcategories, filters.childSubcategories, filters.brands, filters.units, filters.priceRange, filters.search, filters.sortBy, currentPage, initialCategorySet, forceFetch]);

  useEffect(() => {
    if (!loading) restoreScrollPosition();
  }, [loading]);

  const checkAllProductsCartStatus = async (productIds) => {
    if (!productIds || productIds.length === 0) return;
    
    const token = localStorage.getItem('token');
    let sessionId = localStorage.getItem('cartSessionId');
    
    if (!token && !sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('cartSessionId', sessionId);
    }
    
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/cart/check-status', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });
      const data = await response.json();
      if (data.success) {
        setProductsInCart(data.data);
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const productIds = products.map(p => p._id);
      checkAllProductsCartStatus(productIds);
    }
  }, [products]);

  useEffect(() => {
    const refreshCartStatus = async () => {
      if (products.length === 0) return;
      const productIds = products.map(p => p._id);
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      try {
        const response = await fetch('http://localhost:5000/api/cart/check-status', {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        const data = await response.json();
        if (data.success) setProductsInCart(data.data);
      } catch (error) { console.error('Error refreshing cart status:', error); }
    };
    const handleCartUpdate = () => refreshCartStatus();
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [products]);

  useEffect(() => {
    const handleCategoryFilterChange = (event) => {
      const categoryId = event.detail?.categoryId;
      if (categoryId) {
        saveScrollPosition();
        setFilters(prev => ({ ...prev, categories: [categoryId], subcategories: [], childSubcategories: [] }));
        setActiveCategoryFilter(categoryId);
        setCurrentPage(1);
        setForceFetch(prev => prev + 1);
        const url = new URL(window.location.href);
        url.searchParams.set('category', categoryId);
        window.history.pushState({}, '', url);
      } else if (event.detail?.categoryId === null) {
        saveScrollPosition();
        setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
        setActiveCategoryFilter('all');
        setCurrentPage(1);
        setForceFetch(prev => prev + 1);
        const url = new URL(window.location.href);
        url.searchParams.delete('category');
        window.history.pushState({}, '', url);
      }
    };
    window.addEventListener('categoryFilterChanged', handleCategoryFilterChange);
    return () => window.removeEventListener('categoryFilterChanged', handleCategoryFilterChange);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const categoryParam = new URLSearchParams(window.location.search).get('category');
      if (categoryParam) {
        setFilters(prev => ({ ...prev, categories: [categoryParam], subcategories: [], childSubcategories: [] }));
        setActiveCategoryFilter(categoryParam);
      } else {
        setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
        setActiveCategoryFilter('all');
      }
      setCurrentPage(1);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data.subcategories)) {
        setSubcategories(data.data.subcategories);
        return data.data.subcategories;
      } else {
        setSubcategories([]);
        return [];
      }
    } catch (error) { console.error('Error fetching subcategories:', error); setSubcategories([]); return []; }
  };

  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data.children)) {
        setChildSubcategories(data.data.children);
        setShowChildSubcategory(data.data.children.length > 0);
        return data.data.children;
      } else {
        setChildSubcategories([]);
        setShowChildSubcategory(false);
        return [];
      }
    } catch (error) { console.error('Error fetching child subcategories:', error); setChildSubcategories([]); setShowChildSubcategory(false); return []; }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', ITEMS_PER_PAGE);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.categories.length > 0) filters.categories.forEach(cat => queryParams.append('category', cat));
      if (filters.subcategories.length > 0) filters.subcategories.forEach(sub => queryParams.append('subcategory', sub));
      if (filters.childSubcategories.length > 0) filters.childSubcategories.forEach(child => queryParams.append('childSubcategory', child));
      if (filters.brands.length > 0) filters.brands.forEach(brand => queryParams.append('brand', brand));
      if (filters.units.length > 0) filters.units.forEach(unit => queryParams.append('unit', unit));
      if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
      if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
      let sortParam = '-createdAt';
      switch (filters.sortBy) {
        case 'price_low': sortParam = 'price_asc'; break;
        case 'price_high': sortParam = 'price_desc'; break;
        case 'name_asc': sortParam = 'name_asc'; break;
        default: sortParam = 'newest';
      }
      queryParams.append('sort', sortParam);

      const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);
      }
    } catch (error) { console.error('Error fetching products:', error); } finally { setLoading(false); }
  };

  const handleCategoryChange = (categoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newCategories = prev.categories.includes(categoryId) ? prev.categories.filter(id => id !== categoryId) : [...prev.categories, categoryId];
      return { ...prev, categories: newCategories, subcategories: [], childSubcategories: [] };
    });
    setCurrentPage(1);
    
    const isSelected = !filters.categories.includes(categoryId);
    const newCategory = isSelected ? categoryId : null;
    setActiveCategoryFilter(newCategory || 'all');
    const params = new URLSearchParams(window.location.search);
    if (newCategory) params.set('category', newCategory);
    else params.delete('category');
    window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: newCategory } }));
  };

  const handleRemoveCategory = (categoryId) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, categories: prev.categories.filter(id => id !== categoryId), subcategories: [], childSubcategories: [] }));
    setActiveCategoryFilter('all');
    setCurrentPage(1);
    const params = new URLSearchParams(window.location.search);
    params.delete('category');
    window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
  };

  const handleSubcategoryChange = (subcategoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newSubcategories = prev.subcategories.includes(subcategoryId) ? prev.subcategories.filter(id => id !== subcategoryId) : [...prev.subcategories, subcategoryId];
      return { ...prev, subcategories: newSubcategories, childSubcategories: [] };
    });
    setCurrentPage(1);
  };

  const handleRemoveSubcategory = (subcategoryId) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, subcategories: prev.subcategories.filter(id => id !== subcategoryId), childSubcategories: [] }));
    setCurrentPage(1);
  };

  const handleChildSubcategoryChange = (childSubcategoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newChildSubcategories = prev.childSubcategories.includes(childSubcategoryId) ? prev.childSubcategories.filter(id => id !== childSubcategoryId) : [...prev.childSubcategories, childSubcategoryId];
      return { ...prev, childSubcategories: newChildSubcategories };
    });
    setCurrentPage(1);
  };

  const handleRemoveChildSubcategory = (childSubcategoryId) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, childSubcategories: prev.childSubcategories.filter(id => id !== childSubcategoryId) }));
    setCurrentPage(1);
  };

  const handleBrandChange = (brand) => {
    saveScrollPosition();
    setFilters(prev => {
      const newBrands = prev.brands.includes(brand) ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand];
      return { ...prev, brands: newBrands };
    });
    setCurrentPage(1);
  };

  const handleRemoveBrand = (brand) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== brand) }));
    setCurrentPage(1);
  };

  const handleUnitChange = (unit) => {
    saveScrollPosition();
    setFilters(prev => {
      const newUnits = prev.units.includes(unit) ? prev.units.filter(u => u !== unit) : [...prev.units, unit];
      return { ...prev, units: newUnits };
    });
    setCurrentPage(1);
  };

  const handleRemoveUnit = (unit) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, units: prev.units.filter(u => u !== unit) }));
    setCurrentPage(1);
  };

  const applyPriceRange = () => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, priceRange: { min: minPriceInput || '', max: maxPriceInput || '' } }));
    setCurrentPage(1);
  };

  const clearPriceRange = () => {
    saveScrollPosition();
    setMinPriceInput('');
    setMaxPriceInput('');
    setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
  };

  const clearFilters = () => {
    saveScrollPosition();
    setSearchInput('');
    setFilters({
      search: '',
      categories: [],
      subcategories: [],
      childSubcategories: [],
      brands: [],
      units: [],
      priceRange: { min: '', max: '' },
      sortBy: 'newest'
    });
    setActiveCategoryFilter('all');
    setMinPriceInput('');
    setMaxPriceInput('');
    setCurrentPage(1);
    window.history.pushState({}, '', window.location.pathname);
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
  };

  const handleFilterChange = (filterType, value) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    saveScrollPosition();
    setCurrentPage(newPage);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.subcategories.length > 0) count += filters.subcategories.length;
    if (filters.childSubcategories.length > 0) count += filters.childSubcategories.length;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.units.length > 0) count += filters.units.length;
    if (filters.priceRange.min || filters.priceRange.max) count++;
    return count;
  };

  useEffect(() => {
    return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); };
  }, []);

  return (
    <>
      <LoadingBar isVisible={loading} />
      <Navbar />

      {/* Hero / Header Section */}
     <div className="bg-gradient-to-r from-[#f0f5ed] via-white to-[#f0f5ed] border-b border-[#c5d5be]/20">
  <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#263b32] mb-1" style={{ fontFamily: FONT_FAMILY }}>
        All <span className="text-[#8B9D83] font-medium">Products</span>
      </h1>
      
      <p className="text-[#53645a] text-sm mb-3" style={{ fontFamily: FONT_FAMILY }}>
        Curated essentials for your everyday beauty routine.
      </p>
      
      {/* Search Bar */}
      <div className="w-full max-w-md">
        <div className="relative flex items-center bg-white border border-[#8B9D83]/20 rounded-full shadow-sm overflow-hidden focus-within:border-[#8B9D83] focus-within:ring-2 focus-within:ring-[#8B9D83]/20 transition-all">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search beauty products..."
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-10 py-2 text-sm border-0 focus:outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
            style={{ fontFamily: FONT_FAMILY }}
          />
          {searchInput && (
            <button onClick={handleClearSearch} className="absolute right-3 p-1 text-gray-400 hover:text-[#8B9D83] rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="min-h-screen" style={{ 
        background: 'linear-gradient(to right, #c5d5be 0%, #f0f5ed 25%, #FFFFFF 50%, #f0f5ed 75%, #c5d5be 100%)'
      }}>
        <div className="container mx-auto px-4 max-w-7xl py-4">
          
          {/* Filter, Categories, Sort, Toggle - All on same row */}
       
     <div className="mb-4">
   <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
    {/* Filter Button - Always visible */}
    <button
      onClick={() => setIsFilterOpen(true)}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#8B9D83]/30 rounded-full hover:bg-[#f0f5ed] transition-colors text-xs font-medium text-gray-700 shadow-sm shrink-0"
    >
      <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B9D83]" />
      Filters
      {getActiveFilterCount() > 0 && (
        <span className="px-1.5 py-0.5 bg-[#8B9D83] text-white text-[9px] rounded-full min-w-[16px] text-center">
          {getActiveFilterCount()}
        </span>
      )}
    </button>

    {/* Category Chips - Hidden on mobile, visible on md and up */}
    <div className="hidden md:flex items-center gap-1.5 overflow-x-auto flex-1 justify-center min-w-0 pb-0.5 scrollbar-hide">
      <button
        onClick={() => handleCategoryChipClick('all')}
        className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-all shrink-0 ${
          activeCategoryFilter === 'all'
            ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/25'
            : 'bg-white border border-[#c5d5be]/30 text-gray-700 hover:border-[#8B9D83]/50 hover:text-[#8B9D83]'
        }`}
        style={{ fontFamily: FONT_FAMILY }}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category._id}
          onClick={() => handleCategoryChipClick(category._id)}
          className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-all shrink-0 ${
            activeCategoryFilter === category._id
              ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/25'
              : 'bg-white border border-[#c5d5be]/30 text-gray-700 hover:border-[#8B9D83]/50 hover:text-[#8B9D83]'
          }`}
          style={{ fontFamily: FONT_FAMILY }}
        >
          {category.name}
        </button>
      ))}
    </div>

    {/* Sort Dropdown - Always visible */}
    <select
      value={filters.sortBy}
      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
      className="px-2 py-1 text-xs border border-[#8B9D83]/30 rounded-full bg-white focus:outline-none focus:ring-1 focus:ring-[#8B9D83] shrink-0"
      style={{ fontFamily: FONT_FAMILY }}
    >
      <option value="newest">Newest</option>
      <option value="price_low">Price: Low</option>
      <option value="price_high">Price: High</option>
      <option value="name_asc">A to Z</option>
    </select>

    {/* View Toggle - Hidden on mobile, visible on md and up */}
    <div className="hidden md:flex items-center gap-0.5 bg-white border border-[#8B9D83]/30 rounded-full p-0.5 shrink-0">
      <button 
        onClick={() => setViewMode('grid')} 
        className={`p-1.5 rounded-full transition-all ${viewMode === 'grid' ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/20' : 'text-gray-500 hover:bg-[#f0f5ed]'}`} 
        title="Grid View"
      >
        <Grid className="w-3.5 h-3.5" />
      </button>
      <button 
        onClick={() => setViewMode('list')} 
        className={`p-1.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/20' : 'text-gray-500 hover:bg-[#f0f5ed]'}`} 
        title="List View"
      >
        <List className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                {filters.search && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
                    <span>🔍 "{filters.search}"</span>
                    <button onClick={handleClearSearch} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
                  </div>
                )}
                {filters.categories.map(catId => {
                  const category = categories.find(c => c._id === catId);
                  return category ? (
                    <div key={catId} className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
                      <Tag className="w-2.5 h-2.5 text-[#8B9D83]" />
                      <span style={{ fontFamily: FONT_FAMILY }}>{category.name}</span>
                      <button onClick={() => handleRemoveCategory(catId)} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
                    </div>
                  ) : null;
                })}
                {filters.subcategories.map(subId => {
                  const sub = subcategories.find(s => s._id === subId);
                  return sub ? (
                    <div key={subId} className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
                      <FolderTree className="w-2.5 h-2.5 text-[#8B9D83]" />
                      <span style={{ fontFamily: FONT_FAMILY }}>{sub.name}</span>
                      <button onClick={() => handleRemoveSubcategory(subId)} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
                    </div>
                  ) : null;
                })}
                {filters.brands.map(brand => (
                  <div key={brand} className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
                    <Building2 className="w-2.5 h-2.5 text-[#8B9D83]" />
                    <span style={{ fontFamily: FONT_FAMILY }}>{brand}</span>
                    <button onClick={() => handleRemoveBrand(brand)} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
                  </div>
                ))}
                {filters.units.map(unit => (
                  <div key={unit} className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
                    <Scale className="w-2.5 h-2.5 text-[#8B9D83]" />
                    <span style={{ fontFamily: FONT_FAMILY }}>{unit === 'pcs' ? 'Pieces' : 'Ton'}</span>
                    <button onClick={() => handleRemoveUnit(unit)} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
                  </div>
                ))}
                {(filters.priceRange.min || filters.priceRange.max) && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
                    <DollarSign className="w-2.5 h-2.5 text-[#8B9D83]" />
                    <span style={{ fontFamily: FONT_FAMILY }}>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
                    <button onClick={clearPriceRange} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
                  </div>
                )}
                {getActiveFilterCount() > 0 && (
                  <button onClick={clearFilters} className="px-2 py-0.5 text-[10px] text-[#8B9D83] hover:text-[#6b7d63] underline transition-colors" style={{ fontFamily: FONT_FAMILY }}>
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div ref={productsContainerRef}>
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {[...Array(15)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-[#c5d5be]/30 overflow-hidden animate-pulse">
                    <div className="h-40 bg-gradient-to-br from-[#c5d5be]/10 to-[#8B9D83]/5"></div>
                    <div className="p-3">
                      <div className="h-3 bg-gray-100 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-100 rounded mb-2 w-1/2"></div>
                      <div className="h-2 bg-gray-100 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-[#c5d5be]/30">
                    <Package className="w-12 h-12 text-[#c5d5be] mx-auto mb-3" />
                    <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: FONT_FAMILY }}>No products found</p>
                    <button onClick={clearFilters} className="px-4 py-1.5 bg-[#8B9D83] text-white text-xs font-medium rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all" style={{ fontFamily: FONT_FAMILY }}>
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <>
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {products.map(product => (
                          <ProductGridCard key={product._id} product={product} router={router} isInCart={productsInCart[product._id] || false} onViewInCart={openCartSidebar} />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {products.map(product => (
                          <ProductListCard key={product._id} product={product} router={router} isInCart={productsInCart[product._id] || false} onViewInCart={openCartSidebar} />
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-1.5 mt-8">
                        <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="px-2 py-1 border border-[#c5d5be]/30 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f0f5ed] text-xs transition-colors" style={{ fontFamily: FONT_FAMILY }}>
                          Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => {
                          const pageNum = i + 1;
                          if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                            return (
                              <button key={i} onClick={() => handlePageChange(pageNum)} className={`min-w-[28px] h-7 text-xs font-medium rounded-full transition-all ${currentPage === pageNum ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/25' : 'border border-[#c5d5be]/30 text-gray-700 hover:bg-[#f0f5ed]'}`} style={{ fontFamily: FONT_FAMILY }}>
                                {pageNum}
                              </button>
                            );
                          } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                            return <span key={i} className="text-xs text-gray-400">...</span>;
                          }
                          return null;
                        })}
                        <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="px-2 py-1 border border-[#c5d5be]/30 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f0f5ed] text-xs transition-colors" style={{ fontFamily: FONT_FAMILY }}>
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        categories={categories}
        subcategories={subcategories}
        childSubcategories={childSubcategories}
        brands={brands}
        filters={filters}
        handleCategoryChange={handleCategoryChange}
        handleRemoveCategory={handleRemoveCategory}
        handleSubcategoryChange={handleSubcategoryChange}
        handleRemoveSubcategory={handleRemoveSubcategory}
        handleChildSubcategoryChange={handleChildSubcategoryChange}
        handleRemoveChildSubcategory={handleRemoveChildSubcategory}
        handleBrandChange={handleBrandChange}
        handleRemoveBrand={handleRemoveBrand}
        handleUnitChange={handleUnitChange}
        handleRemoveUnit={handleRemoveUnit}
        minPriceInput={minPriceInput}
        maxPriceInput={maxPriceInput}
        setMinPriceInput={setMinPriceInput}
        setMaxPriceInput={setMaxPriceInput}
        applyPriceRange={applyPriceRange}
        clearPriceRange={clearPriceRange}
        getActiveFilterCount={getActiveFilterCount}
        clearFilters={clearFilters}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        showChildSubcategory={showChildSubcategory}
        availableUnits={availableUnits}
        unitsLoading={unitsLoading}
      />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />

      <Footer />

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}