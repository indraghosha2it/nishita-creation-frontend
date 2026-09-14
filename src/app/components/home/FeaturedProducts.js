

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ArrowRight, 
//   ShoppingBag,
//   Loader2,
//   ShoppingCart,
//   Zap,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle,
//   Clock,
//   Flame,
//   Star,
//   Sparkles,
//   Package,
//   AlertTriangle,
//   ChevronDown,
//   ChevronUp,
//   Tag,
//   Hash,
//   Heart,
//   Truck,
//   Flower2,
//   Leaf
// } from 'lucide-react';
// import { toast } from 'sonner';
// import CartSidebar from '../CartSidebar';

// // Font constants matching site theme
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// // Helper functions
// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// const truncateText = (text, limit = 25) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// // Product Card Component
// const FeaturedProductCard = ({
//   product,
//   isInCart: propIsInCart,
//   onCartStatusChange,
//   onViewInCart,
//   featured = false
// }) => {
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});
//   const [isCartHovered, setIsCartHovered] = useState(false);
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
//     productImages = product.images.map((img) => {
//       if (typeof img === 'string') return img;
//       if (img?.url) return img.url;
//       return null;
//     }).filter(Boolean);
//   }
//   if (productImages.length === 0 && product?.image) {
//     productImages = [typeof product.image === 'string' ? product.image : product.image?.url || ''].filter(Boolean);
//   }
//   if (productImages.length === 0) {
//     productImages = ['/placeholder-product.jpg'];
//   }

//   // Determine if we should show hover image (only if more than 1 image)
//   const hasHoverImage = productImages.length > 1;

//   let tagNames = [];
//   if (product?.tags && Array.isArray(product.tags)) {
//     tagNames = product.tags.map((tag) => {
//       if (typeof tag === 'string') return tag;
//       if (tag?.name) return tag.name;
//       return null;
//     }).filter(Boolean);
//   }
//   const primaryTag = tagNames[0] || null;

//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;

//   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;

//   const rating = product?.rating ? Number(product.rating) : 4.7;
//   const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;
//   const hasMultipleImages = productImages.length > 1;

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

//   // Reset navigation state and active index when hover ends
//   useEffect(() => {
//     if (!isHovered) {
//       setHasUserNavigated(false);
//       setActiveIndex(0);
//     }
//   }, [isHovered]);

//   // Update the nextImage function
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

//   // Update the prevImage function
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

//   // Update the goToImage function
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
    
//     // Otherwise show the active index
//     const image = productImages[activeIndex] || productImages[0];
//     if (imageErrors[activeIndex]) {
//       return '/placeholder-product.jpg';
//     }
//     return image;
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
//         headers.Authorization = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }

//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId, quantity: 1 })
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success('Added to cart!', { id: toastId });
//         setIsInCart(true);
//         if (onCartStatusChange) onCartStatusChange(productId, true);
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
//         stars.push(<Star key={i} className="h-2.5 sm:h-3 w-2.5 sm:w-3 fill-current text-yellow-400" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-2.5 sm:h-3 w-2.5 sm:w-3">
//             <Star className="absolute h-2.5 sm:h-3 w-2.5 sm:w-3 text-gray-200" />
//             <div className="absolute left-0 top-0 h-2.5 sm:h-3 w-1/2 overflow-hidden">
//               <Star className="h-2.5 sm:h-3 w-2.5 sm:w-3 fill-current text-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-2.5 sm:h-3 w-2.5 sm:w-3 text-[#8B9D83]/30" />);
//       }
//     }
//     return stars;
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     setHasUserNavigated(false);
//     setActiveIndex(0);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className="group w-full h-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//     >
//       <Link href={`/product/${product?.slug || productId}`} className="block h-full">
//         <article
//           className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#FDF7EF] p-1.5 sm:p-2 transition-all duration-300 hover:-translate-y-1.5 ${
//             featured
//               ? 'border-[#8B9D83]/40 shadow-[0_20px_45px_rgba(139,157,131,0.20)] hover:shadow-[0_24px_50px_rgba(139,157,131,0.26)]'
//               : 'border-[#8B9D83]/20 shadow-[0_2px_9px_rgba(139,157,131,0.06)] hover:border-[#8B9D83] hover:shadow-[0_18px_40px_rgba(139,157,131,0.12)]'
//           }`}
//         >
          
//           {/* PRODUCT IMAGE SECTION */}
//           <div className="relative overflow-hidden rounded-xl bg-[#FDF7EF]">
//             <div className="relative aspect-square w-full overflow-hidden">
//               <Image
//                 src={getCurrentImage()}
//                 alt={productName}
//                 fill
//                 sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 22vw"
//                 className={`object-contain p-2 sm:p-4 transition-transform duration-500 ease-out ${
//                   isHovered ? 'scale-[1.06]' : 'scale-100'
//                 }`}
//                 onError={() => handleImageError(isHovered && hasHoverImage && !isMobile && !hasUserNavigated ? 1 : activeIndex)}
//                 priority={featured}
//                 quality={90}
//               />

//               {/* DISCOUNT BADGE */}
//               {discountPercent > 0 && (
//                 <motion.div
//                   className="absolute left-1.5 sm:left-2 top-1.5 sm:top-2 z-10"
//                   animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
//                   transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
//                 >
//                   <div
//                     className="relative flex h-9 sm:h-12 w-7 sm:w-10 items-start justify-center overflow-hidden bg-[#8B9D83] px-0.5 sm:px-1 pt-1 sm:pt-2 text-center text-[7px] sm:text-[9px] font-bold uppercase leading-[0.8] sm:leading-[0.9] tracking-wide text-white"
//                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)', fontFamily: FONT_FAMILY }}
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

//               {/* TAG BADGE - moved to right side on mobile to avoid overlap */}
//               {primaryTag && (
//                 <div className={`absolute z-10 flex items-center gap-0.5 sm:gap-1 rounded bg-black/80 px-1 sm:px-2 py-0.5 sm:py-1 text-[7px] sm:text-[9px] font-medium text-white backdrop-blur-sm ${
//                   isMobile ? 'right-1.5 top-1.5' : 'right-1.5 sm:right-2 top-1.5 sm:top-2'
//                 }`}>
//                   <Sparkles className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" />
//                   <span className="truncate max-w-[25px] sm:max-w-none" style={{ fontFamily: FONT_FAMILY }}>
//                     {primaryTag}
//                   </span>
//                 </div>
//               )}

//               {/* OUT OF STOCK */}
//               {isOutOfStock && (
//                 <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/60">
//                   <span className="rounded-full bg-black px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
//                     Out of Stock
//                   </span>
//                 </div>
//               )}

//               {/* LOW STOCK */}
//               {!isOutOfStock && isLowStock && (
//                 <div className="absolute bottom-2 left-2 z-10 flex items-center gap-0.5 sm:gap-1 rounded bg-orange-500 px-1 sm:px-2 py-0.5 sm:py-1 text-[7px] sm:text-[9px] font-medium text-white">
//                   <AlertTriangle className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" />
//                   <span className="hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
//                   <span className="xs:hidden" style={{ fontFamily: FONT_FAMILY }}>{stockQuantity} left</span>
//                 </div>
//               )}

//               {/* DESKTOP HOVER ACTIONS - Always visible on mobile with smaller icons */}
//               <div className={`absolute right-2 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5 sm:gap-2 transition-all duration-300 ${
//                 isMobile 
//                   ? 'opacity-100 translate-x-0' 
//                   : isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
//               }`}>
//                 <motion.button
//                   type="button"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     window.location.href = `/product/${product?.slug || productId}`;
//                   }}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className={`flex items-center justify-center rounded-full border border-[#8B9D83]/30 bg-white text-gray-700 shadow-md transition-all hover:bg-[#8B9D83] hover:text-white ${
//                     isMobile ? 'h-6 w-6' : 'h-8 w-8'
//                   }`}
//                   aria-label="View product"
//                 >
//                   <Eye className={isMobile ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'} />
//                 </motion.button>

//                 <motion.button
//                   type="button"
//                   onClick={handleAddToCart}
//                   disabled={isOutOfStock || cartStatusLoading}
//                   whileHover={!isOutOfStock ? { scale: 1.1 } : {}}
//                   whileTap={!isOutOfStock ? { scale: 0.9 } : {}}
//                   className={`flex items-center justify-center rounded-full border shadow-md transition-all ${
//                     isInCart
//                       ? 'border-[#8B9D83] bg-[#8B9D83] text-white'
//                       : isOutOfStock
//                       ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
//                       : 'border-[#8B9D83]/30 bg-white text-gray-700 hover:bg-[#8B9D83] hover:text-white'
//                   } ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}
//                   aria-label={isInCart ? 'In Cart' : 'Add to cart'}
//                 >
//                   {cartStatusLoading ? (
//                     <Loader2 className={isMobile ? 'h-2.5 w-2.5 animate-spin' : 'h-3.5 w-3.5 animate-spin'} />
//                   ) : (
//                     <ShoppingCart className={isMobile ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'} />
//                   )}
//                 </motion.button>
//               </div>

//               {/* IMAGE NAVIGATION */}
//               {hasMultipleImages && (
//                 <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 sm:gap-2">
//                   <motion.button
//                     type="button"
//                     onMouseDown={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                     }}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       prevImage(e);
//                     }}
//                     className="rounded-full p-0.5"
//                     aria-label="Previous image"
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-[#8B9D83] drop-shadow-md" />
//                   </motion.button>

//                   <div className="flex items-center gap-0.5 sm:gap-1.5">
//                     {productImages.map((_, index) => (
//                       <motion.button
//                         key={index}
//                         type="button"
//                         onMouseDown={(e) => {
//                           e.preventDefault();
//                           e.stopPropagation();
//                         }}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           e.stopPropagation();
//                           goToImage(e, index);
//                         }}
//                         className={`rounded-full transition-all duration-200 ${
//                           activeIndex === index
//                             ? 'h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#8B9D83]'
//                             : 'h-1 w-1 sm:h-1.5 sm:w-1.5 bg-[#8B9D83]/40 hover:bg-[#8B9D83]/70'
//                         }`}
//                         whileHover={{ scale: 1.3 }}
//                         aria-label={`Go to image ${index + 1}`}
//                       />
//                     ))}
//                   </div>

//                   <motion.button
//                     type="button"
//                     onMouseDown={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                     }}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       nextImage(e);
//                     }}
//                     className="rounded-full p-0.5"
//                     aria-label="Next image"
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-[#8B9D83] drop-shadow-md" />
//                   </motion.button>
//                 </div>
//               )}

//               {/* HOVER IMAGE HINT */}
//               {hasHoverImage && !isMobile && !isHovered && (
//                 <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <span className="text-[8px] text-white/70 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
//                     Hover to view
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* PRODUCT INFORMATION */}
//           <div className="flex flex-1 flex-col px-1 sm:px-1.5 pb-1 pt-1.5 sm:pt-3">
//             <div className="mb-0.5 sm:mb-1 flex items-center justify-between gap-2">
//               <span className="min-w-0 truncate text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.12em] text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
//                 {brand}
//               </span>
//               <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
//                 <span className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full ${stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
//                 <span className={`text-[6px] sm:text-[8px] font-medium ${stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`} style={{ fontFamily: FONT_FAMILY }}>
//                   {stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>
//             </div>

//             <h3
//               className={`line-clamp-2 font-semibold leading-[1.2] sm:leading-[1.3] text-gray-800 transition-colors group-hover:text-[#8B9D83] ${
//                 featured
//                   ? 'min-h-[30px] sm:min-h-[40px] text-[13px] sm:text-[15px]'
//                   : 'min-h-[26px] sm:min-h-[34px] text-[11px] sm:text-[13px]'
//               }`}
//               style={{ fontFamily: FONT_FAMILY }}
//               title={productName}
//             >
//               {truncateText(productName, featured ? 45 : 35)}
//             </h3>

//             <div className="mt-1 sm:mt-2 flex items-center gap-0.5 sm:gap-1.5">
//               <div className="flex items-center gap-0.5">{renderStars()}</div>
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

//             <div className="my-1.5 sm:my-2.5 h-px bg-gradient-to-r from-[#8B9D83]/30 to-transparent" />

//             <div className="mt-auto flex items-center justify-between gap-2 pt-0.5 sm:pt-1">
//               <div className="flex min-w-0 flex-col whitespace-nowrap">
//                 <span
//                   className={`font-bold tracking-tight text-[#8B9D83] ${
//                     featured ? 'text-[16px] sm:text-[19px]' : 'text-[13px] sm:text-[15px]'
//                   }`}
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   ৳{formatPrice(currentPrice)}
//                 </span>
//                 {discountPercent > 0 && (
//                   <span className="text-[6px] sm:text-[8px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
//                     ৳{formatPrice(originalPrice)}
//                   </span>
//                 )}
//               </div>

//               {featured ? (
//                 <motion.button
//                   type="button"
//                   onClick={handleAddToCart}
//                   disabled={isOutOfStock || cartStatusLoading}
//                   whileHover={!isOutOfStock ? { scale: 1.03 } : {}}
//                   whileTap={!isOutOfStock ? { scale: 0.97 } : {}}
//                   aria-label={isInCart ? 'View cart' : 'Add to cart'}
//                   className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold transition-all duration-200 ${
//                     isInCart
//                       ? 'bg-[#8B9D83] text-white shadow-[0_4px_12px_rgba(139,157,131,0.25)]'
//                       : isOutOfStock
//                       ? 'cursor-not-allowed bg-gray-100 text-gray-300'
//                       : 'bg-[#8B9D83] text-white shadow-[0_4px_12px_rgba(139,157,131,0.25)] hover:bg-[#7a8c73]'
//                   }`}
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   {cartStatusLoading ? (
//                     <Loader2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-spin" />
//                   ) : (
//                     <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
//                   )}
//                   <span>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
//                 </motion.button>
//               ) : (
//                 <motion.button
//                   type="button"
//                   onClick={handleAddToCart}
//                   disabled={isOutOfStock || cartStatusLoading}
//                   onMouseEnter={() => setIsCartHovered(true)}
//                   onMouseLeave={() => setIsCartHovered(false)}
//                   whileHover={!isOutOfStock ? { scale: 1.08 } : {}}
//                   whileTap={!isOutOfStock ? { scale: 0.92 } : {}}
//                   animate={isCartHovered && !isOutOfStock ? { rotate: [0, -10, 10, -6, 6, 0] } : {}}
//                   transition={{ duration: 0.5 }}
//                   aria-label={isInCart ? 'View cart' : 'Add to cart'}
//                   className={`flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
//                     isInCart
//                       ? 'bg-[#8B9D83] text-white shadow-[0_4px_12px_rgba(139,157,131,0.22)]'
//                       : isOutOfStock
//                       ? 'cursor-not-allowed bg-gray-100 text-gray-300'
//                       : 'border border-[#8B9D83]/30 bg-white text-[#8B9D83] hover:border-[#8B9D83] hover:bg-[#8B9D83] hover:text-white hover:shadow-[0_4px_12px_rgba(139,157,131,0.18)]'
//                   }`}
//                 >
//                   {cartStatusLoading ? (
//                     <Loader2 className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 animate-spin" />
//                   ) : (
//                     <ShoppingCart className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
//                   )}
//                 </motion.button>
//               )}
//             </div>
//           </div>
//         </article>
//       </Link>
//     </motion.div>
//   );
// };

// // ============================================================
// // Coverflow slot sizing — center largest, tapering outward
// // ============================================================

// function getSlotConfig(distance, isMobile) {
//   if (isMobile) {
//     if (distance === 0) return { width: 180, opacity: 1, z: 30 };
//     if (distance === 1) return { width: 130, opacity: 0.9, z: 20 };
//     return { width: 0, opacity: 0, z: 0 };
//   }
//   if (distance === 0) return { width: 280, opacity: 1, z: 30 };
//   if (distance === 1) return { width: 230, opacity: 1, z: 20 };
//   return { width: 195, opacity: 0.88, z: 10 };
// }

// // Main Featured Products Component
// export default function FeaturedProducts() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [activeTag, setActiveTag] = useState('all');
//   const [availableTags, setAvailableTags] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);
//   const [allTags, setAllTags] = useState([]);
//   const [centerIndex, setCenterIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const fetchAllTags = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/tags');
//       const data = await response.json();
//       if (data.success) {
//         return data.data.filter(tag => tag.isActive !== false);
//       }
//       return [];
//     } catch (error) {
//       console.error('Error fetching tags:', error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         const productsResponse = await fetch('http://localhost:5000/api/products?limit=100&populateTags=true');
//         const productsData = await productsResponse.json();
        
//         if (productsData.success) {
//           const products = productsData.data.filter(p => p.isActive !== false);
//           setAllProducts(products);
//           setFilteredProducts(products);
          
//           const tags = await fetchAllTags();
//           setAllTags(tags);
          
//           const availableTagIds = new Set();
//           products.forEach(product => {
//             if (product.tags && Array.isArray(product.tags)) {
//               product.tags.forEach(tag => {
//                 if (tag && typeof tag === 'object' && tag._id) {
//                   availableTagIds.add(tag._id.toString());
//                 } else if (typeof tag === 'string') {
//                   availableTagIds.add(tag);
//                 }
//               });
//             }
//           });
          
//           const availableTagsFromBackend = tags.filter(tag => 
//             availableTagIds.has(tag._id.toString())
//           );
          
//           const allOption = {
//             _id: 'all',
//             name: 'All Products',
//             isActive: true
//           };
          
//           setAvailableTags([allOption, ...availableTagsFromBackend]);
//           await checkCartStatus(products);
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const checkCartStatus = async (productsList) => {
//     if (!productsList || productsList.length === 0) return;
//     const productIds = productsList.map(p => p._id || p.id).filter(Boolean);
//     if (productIds.length === 0) return;
    
//     const token = localStorage.getItem('token');
//     let sessionId = localStorage.getItem('cartSessionId');
//     const headers = {};
    
//     if (!token && !sessionId) {
//       sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//       localStorage.setItem('cartSessionId', sessionId);
//     }
    
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     } else {
//       const emptyCartStatus = {};
//       productIds.forEach(id => { emptyCartStatus[id] = false; });
//       setProductsInCart(emptyCartStatus);
//       return;
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
//       } else {
//         const emptyCartStatus = {};
//         productIds.forEach(id => { emptyCartStatus[id] = false; });
//         setProductsInCart(emptyCartStatus);
//       }
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//       const emptyCartStatus = {};
//       productIds.forEach(id => { emptyCartStatus[id] = false; });
//       setProductsInCart(emptyCartStatus);
//     }
//   };

//   const updateCartStatus = useCallback(async () => {
//     if (allProducts.length === 0) return;
//     const productIds = allProducts.map(p => p._id || p.id).filter(Boolean);
//     if (productIds.length === 0) return;
    
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
//     const headers = {};
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     } else {
//       const emptyCartStatus = {};
//       productIds.forEach(id => { emptyCartStatus[id] = false; });
//       setProductsInCart(emptyCartStatus);
//       return;
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
//       } else { 
//         const emptyCartStatus = {}; 
//         productIds.forEach(id => { emptyCartStatus[id] = false; }); 
//         setProductsInCart(emptyCartStatus); 
//       } 
//     } catch (error) { 
//       console.error('Error refreshing cart status:', error); 
//     } 
//   }, [allProducts]); 
 
//   useEffect(() => { 
//     const handleCartUpdate = () => { updateCartStatus(); }; 
//     window.addEventListener('cart-update', handleCartUpdate); 
//     window.addEventListener('auth-change', handleCartUpdate); 
//     return () => { 
//       window.removeEventListener('cart-update', handleCartUpdate); 
//       window.removeEventListener('auth-change', handleCartUpdate); 
//     }; 
//   }, [updateCartStatus]); 
 
//   useEffect(() => { 
//     if (activeTag === 'all') { 
//       setFilteredProducts(allProducts); 
//     } else { 
//       setFilteredProducts(allProducts.filter(p => { 
//         const tags = p.tags || []; 
//         return tags.some(t => { 
//           if (typeof t === 'object' && t._id) { 
//             return t._id.toString() === activeTag; 
//           } 
//           if (typeof t === 'string') { 
//             return t === activeTag; 
//           } 
//           return false; 
//         }); 
//       })); 
//     } 
//     setCenterIndex(0);
//   }, [activeTag, allProducts]); 
 
//   const onCartStatusChange = useCallback((productId, isInCart) => { 
//     setProductsInCart(prev => ({ ...prev, [productId]: isInCart })); 
//   }, []); 
 
//   const openCartSidebar = () => { setIsCartOpen(true); }; 
//   const closeCartSidebar = () => { setIsCartOpen(false); }; 

//   const total = filteredProducts.length;

//   const goToSlide = (index) => {
//     if (total === 0) return;
//     setCenterIndex(((index % total) + total) % total);
//   };

//   const nextSlide = () => goToSlide(centerIndex + 1);
//   const prevSlide = () => goToSlide(centerIndex - 1);

//   useEffect(() => {
//     if (total <= 1 || isPaused) return;
//     const timer = setTimeout(() => {
//       setCenterIndex((prev) => ((prev + 1) % total + total) % total);
//     }, 4000);
//     return () => clearTimeout(timer);
//   }, [centerIndex, total, isPaused]);

//   const getProductAt = (offset) => {
//     if (total === 0) return null;
//     const idx = (((centerIndex + offset) % total) + total) % total;
//     return filteredProducts[idx];
//   };

//   const offsetPriority = isMobile ? [0, -1, 1] : [0, -1, 1, -2, 2];

//   const getVisibleSlots = () => {
//     if (total === 0) return [];
//     const usedIdx = new Set();
//     const slots = [];
//     offsetPriority.forEach((offset) => {
//       const idx = (((centerIndex + offset) % total) + total) % total;
//       if (usedIdx.has(idx)) return;
//       usedIdx.add(idx);
//       slots.push({ offset, idx, product: filteredProducts[idx] });
//     });
//     return slots.sort((a, b) => a.offset - b.offset);
//   };
 
//   if (isLoading) { 
//     return ( 
//       <div className="min-h-screen bg-gradient-to-b from-[#f8f7f2] to-white"> 
//         <div className="container mx-auto px-4 py-16 flex justify-center items-center"> 
//           <Loader2 className="w-8 h-8 animate-spin text-[#8B9D83]" /> 
//         </div> 
//       </div> 
//     ); 
//   } 
 
//   if (allProducts.length === 0) return null; 
 
//   return ( 
//     <> 
//       <div className="min-h-screen bg-gradient-to-b from-[#f8f7f2] via-white to-[#f8f7f2] -mb-44 md:-mb-1">
//         {/* Top Decorative Border */}
//         <div className="w-full h-0.5 sm:h-1 bg-gradient-to-r from-[#8B9D83]/20 via-[#8B9D83]/40 to-[#8B9D83]/20"></div>

//         {/* Main Content */}
//         <div className="bg-white/80 backdrop-blur-sm min-h-screen px-2 sm:px-8 pt-3 sm:pt-4 pb-8 sm:pb-16">
//           <div className="container mx-auto max-w-7xl">
            
//             {/* Header with Dynamic Tags */}
//             <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2 mb-4 sm:mb-14">
//               {/* Trending Badge */}
//               <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 mt-1 sm:mt-2 bg-[#8B9D83]/20 rounded-full border border-[#8B9D83]/30">
//                 <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B9D83]" />
//                 <span className="text-[9px] sm:text-xs font-medium text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
//                   Trending Now
//                 </span>
//               </div>
//               {/* Featured Products */}
//               <h1 className="text-xl sm:text-2xl md:text-4xl font-light text-[#263b32] leading-tight" style={{ fontFamily: FONT_FAMILY }}>
//                 <span className="text-[#8B9D83] font-medium">Featured</span> Products
//               </h1>
//               <p className="text-xs sm:text-sm text-[#53645a]" style={{ fontFamily: FONT_FAMILY }}>
//                 Explore our most popular items loved by customers
//               </p>

//               {/* Professional Tabs - Mobile optimized */}
//               <nav className="flex gap-0 sm:gap-1 text-[10px] sm:text-xs md:text-sm font-medium overflow-x-auto pb-0 w-full sm:w-auto scrollbar-hide border-b border-[#8B9D83]/20 mt-2 sm:mt-4">
//                 {availableTags.map((tag) => (
//                   <button
//                     key={tag._id}
//                     onClick={() => setActiveTag(tag._id)}
//                     className={`px-2 sm:px-5 py-1.5 sm:py-2.5 transition-all duration-300 whitespace-nowrap relative flex items-center gap-1 sm:gap-1.5 ${
//                       activeTag === tag._id
//                         ? 'text-[#8B9D83] font-semibold'
//                         : 'text-[#53645a] hover:text-[#263b32]'
//                     }`}
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     <span>{tag.name}</span>
//                     {activeTag === tag._id && (
//                       <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B9D83] rounded-full"></span>
//                     )}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {/* Coverflow Carousel */}
//             <div className="flex flex-col">
//               {filteredProducts.length === 0 ? (
//                 <div className="text-center py-8 sm:py-16 bg-white rounded-2xl border border-[#8B9D83]/20">
//                   <Package className="w-8 h-8 sm:w-12 sm:h-12 text-[#8B9D83]/40 mx-auto mb-2 sm:mb-3" />
//                   <p className="text-xs sm:text-sm text-[#53645a]" style={{ fontFamily: FONT_FAMILY }}>No products found in this category</p>
//                 </div>
//               ) : (
//                 <>
//                   <div
//                     className="relative"
//                     onMouseEnter={() => setIsPaused(true)}
//                     onMouseLeave={() => setIsPaused(false)}
//                   >
//                     {/* Left Arrow - Mobile optimized */}
//                     {total > 1 && (
//                       <button
//                         type="button"
//                         onClick={prevSlide}
//                         aria-label="Previous product"
//                         className="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 z-40 flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 sm:bg-white border border-[#8B9D83]/30 shadow-md sm:shadow-lg hover:bg-[#8B9D83] hover:border-[#8B9D83] transition-colors group"
//                       >
//                         <ChevronLeft className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-[#8B9D83] group-hover:text-white" />
//                       </button>
//                     )}

//                     {/* Right Arrow - Mobile optimized */}
//                     {total > 1 && (
//                       <button
//                         type="button"
//                         onClick={nextSlide}
//                         aria-label="Next product"
//                         className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-40 flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 sm:bg-white border border-[#8B9D83]/30 shadow-md sm:shadow-lg hover:bg-[#8B9D83] hover:border-[#8B9D83] transition-colors group"
//                       >
//                         <ChevronRight className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-[#8B9D83] group-hover:text-white" />
//                       </button>
//                     )}

//                     {/* Slot Row - Mobile optimized */}
//                     <div className="flex items-center justify-center gap-1.5 sm:gap-4 px-6 sm:px-14 overflow-hidden">
//                       <AnimatePresence initial={false} mode="popLayout">
//                         {getVisibleSlots().map(({ offset, product }) => {
//                           if (!product) return null;
//                           const distance = Math.abs(offset);
//                           const { width, opacity, z } = getSlotConfig(distance, isMobile);
//                           if (width === 0) return null;
//                           const key = product._id || product.id;

//                           return (
//                             <motion.div
//                               key={key}
//                               layout
//                               initial={{ opacity: 0 }}
//                               animate={{ width, opacity }}
//                               exit={{ opacity: 0, width: 0 }}
//                               transition={{ duration: 0.35, ease: 'easeOut' }}
//                               style={{ zIndex: z }}
//                               className="shrink-0"
//                             >
//                               <FeaturedProductCard
//                                 product={product}
//                                 isInCart={productsInCart[product._id || product.id] || false}
//                                 onCartStatusChange={onCartStatusChange}
//                                 onViewInCart={openCartSidebar}
//                                 featured={offset === 0}
//                               />
//                             </motion.div>
//                           );
//                         })}
//                       </AnimatePresence>
//                     </div>
//                   </div>

//                   {/* Dot Indicator - Mobile optimized */}
//                   {total > 1 && total <= 12 && (
//                     <div className="flex justify-center items-center gap-1 sm:gap-1.5 mt-4 sm:mt-8">
//                       {filteredProducts.map((product, i) => (
//                         <button
//                           key={product._id || product.id || i}
//                           type="button"
//                           onClick={() => goToSlide(i)}
//                           aria-label={`Go to product ${i + 1}`}
//                           className={`rounded-full transition-all duration-300 ${
//                             i === centerIndex
//                               ? 'w-3 sm:w-5 h-1 sm:h-1.5 bg-[#8B9D83]'
//                               : 'w-1 sm:w-1.5 h-1 sm:h-1.5 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/60'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Decorative Border */}
//         <div className="w-full h-0.5 sm:h-1 bg-gradient-to-r from-[#8B9D83]/20 via-[#8B9D83]/40 to-[#8B9D83]/20"></div>
//       </div>

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
//     </>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ShoppingBag,
  Loader2,
  ShoppingCart,
  Zap,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Flame,
  Star,
  Sparkles,
  Package,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Tag,
  Hash,
  Heart,
  Truck,
  Flower2,
  Leaf
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

// Font constants matching site theme
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// Helper functions
const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const truncateText = (text, limit = 25) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

// Product Card Component
const FeaturedProductCard = ({
  product,
  isInCart: propIsInCart,
  onCartStatusChange,
  onViewInCart,
  featured = false
}) => {
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [hasUserNavigated, setHasUserNavigated] = useState(false);

  const productId = product?._id || product?.id || 'unknown';
  const productName = product?.productName || product?.name || 'Product';
  const regularPrice = Number(product?.regularPrice || product?.price || 0);
  const discountPrice = Number(product?.discountPrice || 0);
  const stockQuantity = Number(product?.stockQuantity || 0);

  const brand = product?.brand
    ? typeof product.brand === 'string'
      ? product.brand
      : product.brand?.name || product.brand?.title || 'General'
    : product?.brandName || 'General';

  let productImages = [];
  if (product?.images && Array.isArray(product.images)) {
    productImages = product.images.map((img) => {
      if (typeof img === 'string') return img;
      if (img?.url) return img.url;
      return null;
    }).filter(Boolean);
  }
  if (productImages.length === 0 && product?.image) {
    productImages = [typeof product.image === 'string' ? product.image : product.image?.url || ''].filter(Boolean);
  }
  if (productImages.length === 0) {
    productImages = ['/placeholder-product.jpg'];
  }

  // Determine if we should show hover image (only if more than 1 image)
  const hasHoverImage = productImages.length > 1;

  let tagNames = [];
  if (product?.tags && Array.isArray(product.tags)) {
    tagNames = product.tags.map((tag) => {
      if (typeof tag === 'string') return tag;
      if (tag?.name) return tag.name;
      return null;
    }).filter(Boolean);
  }
  const primaryTag = tagNames[0] || null;

  const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
  const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
  const originalPrice = regularPrice;

  const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = stockQuantity <= 0;

  const rating = product?.rating ? Number(product.rating) : 4.7;
  const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const hasMultipleImages = productImages.length > 1;

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

  // Reset navigation state and active index when hover ends
  useEffect(() => {
    if (!isHovered) {
      setHasUserNavigated(false);
      setActiveIndex(0);
    }
  }, [isHovered]);

  // Update the nextImage function
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

  // Update the prevImage function
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

  // Update the goToImage function
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
    
    // Otherwise show the active index
    const image = productImages[activeIndex] || productImages[0];
    if (imageErrors[activeIndex]) {
      return '/placeholder-product.jpg';
    }
    return image;
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
        headers.Authorization = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId, quantity: 1 })
      });

      const data = await response.json();

      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        toast.success('Added to cart!', { id: toastId });
        setIsInCart(true);
        if (onCartStatusChange) onCartStatusChange(productId, true);
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

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHasUserNavigated(false);
    setActiveIndex(0);
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
      <Link href={`/product/${product?.slug || productId}`} className="block h-full">
        <article
          className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#FDF7EF] p-1.5 sm:p-2 transition-all duration-300 hover:-translate-y-1.5 ${
            featured
              ? 'border-[#8B9D83]/40 shadow-[0_20px_45px_rgba(139,157,131,0.20)] hover:shadow-[0_24px_50px_rgba(139,157,131,0.26)]'
              : 'border-[#8B9D83]/20 shadow-[0_2px_9px_rgba(139,157,131,0.06)] hover:border-[#8B9D83] hover:shadow-[0_18px_40px_rgba(139,157,131,0.12)]'
          }`}
        >
          
          {/* PRODUCT IMAGE SECTION */}
          <div className="relative overflow-hidden rounded-xl bg-[#FDF7EF]">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={getCurrentImage()}
                alt={productName}
                fill
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 22vw"
                className={`object-contain p-2 sm:p-4 transition-transform duration-500 ease-out ${
                  isHovered ? 'scale-[1.06]' : 'scale-100'
                }`}
                onError={() => handleImageError(isHovered && hasHoverImage && !isMobile && !hasUserNavigated ? 1 : activeIndex)}
                priority={featured}
                quality={90}
              />

              {/* DISCOUNT BADGE */}
              {discountPercent > 0 && (
                <motion.div
                  className="absolute left-1.5 sm:left-2 top-1.5 sm:top-2 z-10"
                  animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}  
                  transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                >
                  <div
                    className="relative flex h-9 sm:h-12 w-7 sm:w-10 items-start justify-center overflow-hidden bg-[#8B9D83] px-0.5 sm:px-1 pt-1 sm:pt-2 text-center text-[7px] sm:text-[9px] font-bold uppercase leading-[0.8] sm:leading-[0.9] tracking-wide text-white"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)', fontFamily: FONT_FAMILY }}
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

              {/* TAG BADGE - moved to right side on mobile to avoid overlap */}
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

              {/* OUT OF STOCK */}
              {isOutOfStock && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/60">
                  <span className="rounded-full bg-black px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
                    Out of Stock
                  </span>
                </div>
              )}

              {/* LOW STOCK */}
              {!isOutOfStock && isLowStock && (
                <div className="absolute bottom-2 left-2 z-10 flex items-center gap-0.5 sm:gap-1 rounded bg-orange-500 px-1 sm:px-2 py-0.5 sm:py-1 text-[7px] sm:text-[9px] font-medium text-white">
                  <AlertTriangle className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" />
                  <span className="hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
                  <span className="xs:hidden" style={{ fontFamily: FONT_FAMILY }}>{stockQuantity} left</span>
                </div>
              )}

              {/* DESKTOP HOVER ACTIONS - Always visible on mobile with smaller icons */}
              <div className={`absolute right-2 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5 sm:gap-2 transition-all duration-300 ${
                isMobile 
                  ? 'opacity-100 translate-x-0' 
                  : isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
              }`}>
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/product/${product?.slug || productId}`;
                  }}
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

              {/* IMAGE NAVIGATION */}
              {hasMultipleImages && (
                <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 sm:gap-2">
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
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      nextImage(e);
                    }}
                    className="rounded-full p-0.5"
                    aria-label="Next image"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-[#8B9D83] drop-shadow-md" />
                  </motion.button>
                </div>
              )}

              {/* HOVER IMAGE HINT */}
              {hasHoverImage && !isMobile && !isHovered && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[8px] text-white/70 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Hover to view
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="flex flex-1 flex-col px-1 sm:px-1.5 pb-1 pt-1.5 sm:pt-3">
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

            <h3
              className={`line-clamp-2 font-semibold leading-[1.2] sm:leading-[1.3] text-gray-800 transition-colors group-hover:text-[#616b5d] ${
                featured
                  ? 'min-h-[30px] sm:min-h-[40px] text-[13px] sm:text-[15px]'
                  : 'min-h-[26px] sm:min-h-[34px] text-[11px] sm:text-[13px]'
              }`}
              style={{ fontFamily: FONT_FAMILY }}
              title={productName}
            >
              {truncateText(productName, featured ? 45 : 35)}
            </h3>

            <div className="mt-1 sm:mt-2 flex items-center gap-0.5 sm:gap-1.5">
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

            <div className="my-1.5 sm:my-2.5 h-px bg-gradient-to-r from-[#8B9D83]/30 to-transparent" />

            <div className="mt-auto flex items-center justify-between gap-2 pt-0.5 sm:pt-1">
              <div className="flex min-w-0 flex-col whitespace-nowrap">
                <span
                  className={`font-bold tracking-tight text-[#8B9D83] ${
                    featured ? 'text-[16px] sm:text-[19px]' : 'text-[13px] sm:text-[15px]'
                  }`}
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  ৳{formatPrice(currentPrice)}
                </span>
                {discountPercent > 0 && (
                  <span className="text-[6px] sm:text-[8px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
                    ৳{formatPrice(originalPrice)}
                  </span>
                )}
              </div>

              {featured ? (
                <motion.button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || cartStatusLoading}
                  whileHover={!isOutOfStock ? { scale: 1.03 } : {}}
                  whileTap={!isOutOfStock ? { scale: 0.97 } : {}}
                  aria-label={isInCart ? 'View cart' : 'Add to cart'}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold transition-all duration-200 ${
                    isInCart
                      ? 'bg-[#8B9D83] text-white shadow-[0_4px_12px_rgba(139,157,131,0.25)]'
                      : isOutOfStock
                      ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                      : 'bg-[#8B9D83] text-white shadow-[0_4px_12px_rgba(139,157,131,0.25)] hover:bg-[#7a8c73]'
                  }`}
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  {cartStatusLoading ? (
                    <Loader2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-spin" />
                  ) : (
                    <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  )}
                  <span>{isInCart ? 'In Bag' : 'Add to Bag'}</span>
                </motion.button>
              ) : (
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
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

// ============================================================
// Coverflow slot sizing — center largest, tapering outward
// ============================================================

function getSlotConfig(distance, isMobile) {
  if (isMobile) {
    if (distance === 0) return { width: 180, opacity: 1, z: 30 };
    if (distance === 1) return { width: 130, opacity: 0.9, z: 20 };
    return { width: 0, opacity: 0, z: 0 };
  }
  if (distance === 0) return { width: 280, opacity: 1, z: 30 };
  if (distance === 1) return { width: 230, opacity: 1, z: 20 };
  return { width: 195, opacity: 0.88, z: 10 };
}

// Main Featured Products Component - Background changed to match TreatmentSection
export default function FeaturedProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [activeTag, setActiveTag] = useState('all');
  const [availableTags, setAvailableTags] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchAllTags = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tags');
      const data = await response.json();
      if (data.success) {
        return data.data.filter(tag => tag.isActive !== false);
      }
      return [];
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsResponse = await fetch('http://localhost:5000/api/products?limit=100&populateTags=true');
        const productsData = await productsResponse.json();
        
        if (productsData.success) {
          const products = productsData.data.filter(p => p.isActive !== false);
          setAllProducts(products);
          setFilteredProducts(products);
          
          const tags = await fetchAllTags();
          setAllTags(tags);
          
          const availableTagIds = new Set();
          products.forEach(product => {
            if (product.tags && Array.isArray(product.tags)) {
              product.tags.forEach(tag => {
                if (tag && typeof tag === 'object' && tag._id) {
                  availableTagIds.add(tag._id.toString());
                } else if (typeof tag === 'string') {
                  availableTagIds.add(tag);
                }
              });
            }
          });
          
          const availableTagsFromBackend = tags.filter(tag => 
            availableTagIds.has(tag._id.toString())
          );
          
          const allOption = {
            _id: 'all',
            name: 'All Products',
            isActive: true
          };
          
          setAvailableTags([allOption, ...availableTagsFromBackend]);
          await checkCartStatus(products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const checkCartStatus = async (productsList) => {
    if (!productsList || productsList.length === 0) return;
    const productIds = productsList.map(p => p._id || p.id).filter(Boolean);
    if (productIds.length === 0) return;
    
    const token = localStorage.getItem('token');
    let sessionId = localStorage.getItem('cartSessionId');
    const headers = {};
    
    if (!token && !sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('cartSessionId', sessionId);
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    } else {
      const emptyCartStatus = {};
      productIds.forEach(id => { emptyCartStatus[id] = false; });
      setProductsInCart(emptyCartStatus);
      return;
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
      } else {
        const emptyCartStatus = {};
        productIds.forEach(id => { emptyCartStatus[id] = false; });
        setProductsInCart(emptyCartStatus);
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
      const emptyCartStatus = {};
      productIds.forEach(id => { emptyCartStatus[id] = false; });
      setProductsInCart(emptyCartStatus);
    }
  };

  const updateCartStatus = useCallback(async () => {
    if (allProducts.length === 0) return;
    const productIds = allProducts.map(p => p._id || p.id).filter(Boolean);
    if (productIds.length === 0) return;
    
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    } else {
      const emptyCartStatus = {};
      productIds.forEach(id => { emptyCartStatus[id] = false; });
      setProductsInCart(emptyCartStatus);
      return;
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
      } else { 
        const emptyCartStatus = {}; 
        productIds.forEach(id => { emptyCartStatus[id] = false; }); 
        setProductsInCart(emptyCartStatus); 
      } 
    } catch (error) { 
      console.error('Error refreshing cart status:', error); 
    } 
  }, [allProducts]); 
 
  useEffect(() => { 
    const handleCartUpdate = () => { updateCartStatus(); }; 
    window.addEventListener('cart-update', handleCartUpdate); 
    window.addEventListener('auth-change', handleCartUpdate); 
    return () => { 
      window.removeEventListener('cart-update', handleCartUpdate); 
      window.removeEventListener('auth-change', handleCartUpdate); 
    }; 
  }, [updateCartStatus]); 
 
  useEffect(() => { 
    if (activeTag === 'all') { 
      setFilteredProducts(allProducts); 
    } else { 
      setFilteredProducts(allProducts.filter(p => { 
        const tags = p.tags || []; 
        return tags.some(t => { 
          if (typeof t === 'object' && t._id) { 
            return t._id.toString() === activeTag; 
          } 
          if (typeof t === 'string') { 
            return t === activeTag; 
          } 
          return false; 
        }); 
      })); 
    } 
    setCenterIndex(0);
  }, [activeTag, allProducts]); 
 
  const onCartStatusChange = useCallback((productId, isInCart) => { 
    setProductsInCart(prev => ({ ...prev, [productId]: isInCart })); 
  }, []); 
 
  const openCartSidebar = () => { setIsCartOpen(true); }; 
  const closeCartSidebar = () => { setIsCartOpen(false); }; 

  const total = filteredProducts.length;

  const goToSlide = (index) => {
    if (total === 0) return;
    setCenterIndex(((index % total) + total) % total);
  };

  const nextSlide = () => goToSlide(centerIndex + 1);
  const prevSlide = () => goToSlide(centerIndex - 1);

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const timer = setTimeout(() => {
      setCenterIndex((prev) => ((prev + 1) % total + total) % total);
    }, 4000);
    return () => clearTimeout(timer);
  }, [centerIndex, total, isPaused]);

  const getProductAt = (offset) => {
    if (total === 0) return null;
    const idx = (((centerIndex + offset) % total) + total) % total;
    return filteredProducts[idx];
  };

  const offsetPriority = isMobile ? [0, -1, 1] : [0, -1, 1, -2, 2];

  const getVisibleSlots = () => {
    if (total === 0) return [];
    const usedIdx = new Set();
    const slots = [];
    offsetPriority.forEach((offset) => {
      const idx = (((centerIndex + offset) % total) + total) % total;
      if (usedIdx.has(idx)) return;
      usedIdx.add(idx);
      slots.push({ offset, idx, product: filteredProducts[idx] });
    });
    return slots.sort((a, b) => a.offset - b.offset);
  };
 
  if (isLoading) { 
    return ( 
      <div className="min-h-screen bg-[#dfe1d7] flex justify-center items-center"> 
        <Loader2 className="w-8 h-8 animate-spin text-[#8B9D83]" /> 
      </div> 
    ); 
  } 
 
  if (allProducts.length === 0) return null; 
 
 return ( 
  <> 
    <div className="relative overflow-hidden bg-[#dfe1d7]">
      
    <div className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 opacity-[0.09] 
       h-[300px] w-[400px] 
       sm:h-[400px] sm:w-[500px] 
       md:h-[550px] md:w-[600px] 
       lg:h-[700px] lg:w-[700px]">
    <svg
      viewBox="0 0 300 600"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main stem */}
      <path
        d="M150 620
           C148 530 150 450 151 370
           C152 290 146 210 151 125
           C153 85 150 45 155 0"
        stroke="#53604f"
        strokeWidth="1.4"
      />

      {/* Left branches */}
      <path
        d="M150 470 C120 430 92 410 58 405"
        stroke="#53604f"
        strokeWidth="1.2"
      />

      <path
        d="M151 390 C118 350 88 330 50 325"
        stroke="#53604f"
        strokeWidth="1.2"
      />

      <path
        d="M150 310 C118 275 88 250 57 245"
        stroke="#53604f"
        strokeWidth="1.2"
      />

      <path
        d="M150 225 C125 185 95 165 70 160"
        stroke="#53604f"
        strokeWidth="1.2"
      />

      <path
        d="M151 145 C130 110 110 88 88 75"
        stroke="#53604f"
        strokeWidth="1.2"
      />

      {/* Right branches */}
      <path
        d="M150 440 C180 400 210 380 245 375"
        stroke="#53604f"
        strokeWidth="1.2"
      />

      <path
        d="M151 350 C184 315 215 295 250 290"
        stroke="#53604f"
        strokeWidth="1.2"
      />

      <path
        d="M150 270 C182 235 215 215 248 210"
        stroke="#53604f"
        strokeWidth="1.2"
      />

      <path
        d="M151 190 C177 150 202 130 232 125"
        stroke="#53604f"
        strokeWidth="1.2"
      />

      <path
        d="M153 110 C174 75 195 52 220 40"
        stroke="#53604f"
        strokeWidth="1.2"
      />

      {/* Leaves */}
      <ellipse
        cx="78"
        cy="398"
        rx="45"
        ry="13"
        transform="rotate(28 78 398)"
        fill="#65705d"
      />

      <ellipse
        cx="220"
        cy="370"
        rx="45"
        ry="13"
        transform="rotate(-28 220 370)"
        fill="#65705d"
      />

      <ellipse
        cx="70"
        cy="320"
        rx="42"
        ry="12"
        transform="rotate(28 70 320)"
        fill="#65705d"
      />

      <ellipse
        cx="225"
        cy="285"
        rx="43"
        ry="12"
        transform="rotate(-28 225 285)"
        fill="#65705d"
      />

      <ellipse
        cx="78"
        cy="240"
        rx="40"
        ry="12"
        transform="rotate(30 78 240)"
        fill="#65705d"
      />

      <ellipse
        cx="222"
        cy="208"
        rx="40"
        ry="12"
        transform="rotate(-28 222 208)"
        fill="#65705d"
      />

      <ellipse
        cx="92"
        cy="155"
        rx="36"
        ry="11"
        transform="rotate(30 92 155)"
        fill="#65705d"
      />

      <ellipse
        cx="205"
        cy="125"
        rx="38"
        ry="11"
        transform="rotate(-30 205 125)"
        fill="#65705d"
      />

      <ellipse
        cx="112"
        cy="82"
        rx="32"
        ry="10"
        transform="rotate(35 112 82)"
        fill="#65705d"
      />

      <ellipse
        cx="190"
        cy="48"
        rx="32"
        ry="10"
        transform="rotate(-30 190 48)"
        fill="#65705d"
      />

    </svg>
  </div>

      {/* Top Decorative Border */}
      <div className="relative z-20 h-px w-full bg-[#53604f]/20 sm:h-0.5"></div>

      {/* Main Content - Reduced padding on mobile */}
      <div className="relative z-10 px-2 sm:px-8 pt-2 sm:pt-4 pb-4 sm:pb-8">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header with less margin on mobile */}
          <div className="flex flex-col items-center text-center gap-1 sm:gap-2 mb-3 sm:mb-8">
            {/* Trending Badge - Smaller on mobile */}
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-0.5 sm:py-1.5 mt-0.5 sm:mt-1 border border-[#53604f]/50 bg-[#dfe1d7]/60">
              <Flame className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#465641]" />
              <span className="text-[7px] sm:text-xs font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>
                Trending Now
              </span>
            </div>
            
            {/* Featured Products - Smaller on mobile */}
            <h1 className="text-lg sm:text-2xl -mb-1 md:-mb-5 md:text-4xl font-light text-[#4e594c] leading-tight" style={{ fontFamily: FONT_FAMILY }}>
              <span className="text-[#465641] font-medium">Featured</span> Products
            </h1>
            {/* <p className="text-[10px] sm:text-sm text-[#647060]" style={{ fontFamily: FONT_FAMILY }}>
              Explore our most popular items loved by customers
            </p> */}

            {/* Tabs - Smaller on mobile */}
            <nav className="flex justify-center gap-0 sm:gap-1 text-[8px] sm:text-xs md:text-sm font-medium overflow-x-auto pb-0 w-full scrollbar-hide border-b border-[#8B9D83]/20 mt-1 sm:mt-4">
              {availableTags.map((tag) => (
                <button
                  key={tag._id}
                  onClick={() => setActiveTag(tag._id)}
                  className={`px-1.5 sm:px-5 py-1 sm:py-2.5 transition-all duration-300 whitespace-nowrap relative flex items-center gap-0.5 sm:gap-1.5 ${
                    activeTag === tag._id
                      ? 'text-[#8B9D83] font-semibold'
                      : 'text-[#53645a] hover:text-[#263b32]'
                  }`}
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  <span>{tag.name}</span>
                  {activeTag === tag._id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B9D83] rounded-full"></span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Coverflow Carousel - Reduced gap on mobile */}
         {/* Coverflow Carousel - Reduced gap on mobile */}
<div className="flex flex-col">
  {filteredProducts.length === 0 ? (
    <div className="text-center py-6 sm:py-16 bg-white/80 rounded-2xl border border-[#8B9D83]/20">
      <Package className="w-8 h-8 sm:w-12 sm:h-12 text-[#8B9D83]/40 mx-auto mb-2 sm:mb-3" />
      <p className="text-xs sm:text-sm text-[#53645a]" style={{ fontFamily: FONT_FAMILY }}>No products found in this category</p>
    </div>
  ) : (
    <>
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ============================================================
            INVISIBLE SPACER — locks the row height to featured card size
            ============================================================ */}
        <div aria-hidden="true" className="invisible pointer-events-none">
          <div className="shrink-0" style={{ width: isMobile ? 180 : 280 }}>
            {filteredProducts[centerIndex] && (
              <FeaturedProductCard
                product={filteredProducts[centerIndex]}
                featured={true}
                isInCart={false}
                onCartStatusChange={() => {}}
                onViewInCart={() => {}}
              />
            )}
          </div>
        </div>

        {/* Left Arrow - Smaller on mobile */}
        {total > 1 && (
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous product"
            className="absolute left-0 sm:-left-2 top-1/2 md:-ml-6 -translate-y-1/2 z-40 flex h-6 w-6 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 sm:bg-white border border-[#8B9D83]/30 shadow-md sm:shadow-lg hover:bg-[#8B9D83] hover:border-[#8B9D83] transition-colors group"
          >
            <ChevronLeft className="h-3 w-3 sm:h-5 sm:w-5 text-[#8B9D83] group-hover:text-white" />
          </button>
        )}

        {/* Right Arrow - Smaller on mobile */}
        {total > 1 && (
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next product"
            className="absolute right-0 md:-mr-6 sm:-right-2 top-1/2 -translate-y-1/2 z-40 flex h-6 w-6 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 sm:bg-white border border-[#8B9D83]/30 shadow-md sm:shadow-lg hover:bg-[#8B9D83] hover:border-[#8B9D83] transition-colors group"
          >
            <ChevronRight className="h-3 w-3 sm:h-5 sm:w-5 text-[#8B9D83] group-hover:text-white" />
          </button>
        )}

        {/* Slot Row — absolutely positioned over the spacer */}
        <div className="absolute inset-0 flex items-center justify-center gap-1 sm:gap-4 px-5 sm:px-14 overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {getVisibleSlots().map(({ offset, product }) => {
              if (!product) return null;
              const distance = Math.abs(offset);
              const { width, opacity, z } = getSlotConfig(distance, isMobile);
              if (width === 0) return null;
              const key = product._id || product.id;

              return (
                <motion.div
                  key={key}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ width, opacity }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ zIndex: z }}
                  className="shrink-0"
                >
                  <FeaturedProductCard
                    product={product}
                    isInCart={productsInCart[product._id || product.id] || false}
                    onCartStatusChange={onCartStatusChange}
                    onViewInCart={openCartSidebar}
                    featured={offset === 0}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dot Indicator - Smaller gap on mobile */}
      {total > 1 && total <= 12 && (
        <div className="flex justify-center items-center gap-0.5 sm:gap-1.5 mt-2 sm:mt-8">
          {filteredProducts.map((product, i) => (
            <button
              key={product._id || product.id || i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to product ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === centerIndex
                  ? 'w-2 sm:w-5 h-0.5 sm:h-1.5 bg-[#8B9D83]'
                  : 'w-0.5 sm:w-1.5 h-0.5 sm:h-1.5 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/60'
              }`}
            />
          ))}
        </div>
      )}
    </>
  )}
</div>
        </div>
      </div>

      {/* Bottom Decorative Border */}
      <div className="relative z-20 h-px w-full bg-[#53604f]/20 sm:h-0.5"></div>

    </div>

    {/* Cart Sidebar */}
    <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
  </>
);
}