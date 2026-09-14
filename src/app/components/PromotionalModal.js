

// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { X, ShoppingCart, Eye, Star, Package, Sparkles, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';

// const PromotionalModal = ({ products = [], onClose, currentProductIndex = 0, onProductChange }) => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [imageErrors, setImageErrors] = useState({});
//   const [localCurrentIndex, setLocalCurrentIndex] = useState(currentProductIndex);
//   const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

//   const handleClose = () => {
//     setIsVisible(false);
//     onClose();
//   };

//   const handleImageError = (productId, imageUrl) => {
//     console.log(`Image failed to load: ${imageUrl}`);
//     setImageErrors(prev => ({ ...prev, [productId]: true }));
//   };

//   const nextProduct = (e) => {
//     e.stopPropagation();
//     if (products.length > 1) {
//       const newIndex = (localCurrentIndex + 1) % products.length;
//       setLocalCurrentIndex(newIndex);
//       setCurrentImageIndex(0);
//       setHoveredImageIndex(null);
//       if (onProductChange) onProductChange(newIndex);
//     }
//   };

//   const prevProduct = (e) => {
//     e.stopPropagation();
//     if (products.length > 1) {
//       const newIndex = (localCurrentIndex - 1 + products.length) % products.length;
//       setLocalCurrentIndex(newIndex);
//       setCurrentImageIndex(0);
//       setHoveredImageIndex(null);
//       if (onProductChange) onProductChange(newIndex);
//     }
//   };

//   const nextImage = (e) => {
//     e.stopPropagation();
//     const product = products[localCurrentIndex];
//     if (product?.images?.length) {
//       setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
//       setHoveredImageIndex(null);
//     }
//   };

//   const prevImage = (e) => {
//     e.stopPropagation();
//     const product = products[localCurrentIndex];
//     if (product?.images?.length) {
//       setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
//       setHoveredImageIndex(null);
//     }
//   };

//   // Handle thumbnail hover - show image on main image
//   const handleThumbnailHover = (index) => {
//     setHoveredImageIndex(index);
//     setCurrentImageIndex(index);
//   };

//   const handleThumbnailLeave = () => {
//     setHoveredImageIndex(null);
//     // Reset to the original image index (optional - you can keep it)
//     // setCurrentImageIndex(currentImageIndex);
//   };

//   if (!isVisible) return null;

//   const product = products[localCurrentIndex];
//   if (!product) return null;

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(price || 0);
//   };

//   const getUnitLabel = (orderUnit) => {
//     switch(orderUnit) {
//       case 'kg': return 'kg';
//       case 'ton': return 'MT';
//       default: return 'pc';
//     }
//   };

//   const unitLabel = getUnitLabel(product.orderUnit);
//   const productImages = product.images || [];
//   const currentImage = productImages[currentImageIndex]?.url || product.image;
//   const hasImageError = imageErrors[product.productId];
//   const productTag = product.tag || product.promoTag;
//   const hasMultipleImages = productImages.length > 1;
//   const hasMultipleProducts = products.length > 1;

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
//           {/* Animated Backdrop */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={handleClose}
//           />
          
//           {/* Animated Modal Content */}
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9, y: 50 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 50 }}
//             transition={{ 
//               type: "spring", 
//               damping: 25, 
//               stiffness: 300,
//               duration: 0.4 
//             }}
//             className="relative bg-white rounded-2xl shadow-2xl max-w-[95%] sm:max-w-md md:max-w-2xl lg:max-w-3xl w-full overflow-hidden"
//           >
//             {/* Animated Header with Shine Effect */}
//             <div className="relative bg-gradient-to-r from-[#6B4F3A] via-[#8B6B51] to-[#6B4F3A] px-3 py-1.5 sm:px-5 sm:py-2 overflow-hidden">
//               <motion.div 
//                 initial={{ x: "-100%" }}
//                 animate={{ x: "200%" }}
//                 transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
//               />
//               <div className="flex items-center justify-between relative z-10">
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   <motion.div
//                     animate={{ rotate: [0, 10, -10, 0] }}
//                     transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//                   >
//                     <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                   </motion.div>
//                   <h2 className="text-white font-semibold text-[10px] sm:text-xs font-serif tracking-wide">
//                     Limited Time Offer
//                   </h2>
//                 </div>
              
//               </div>
//             </div>

//             {/* Close Button */}
//             <motion.button
//               whileHover={{ scale: 1.1, rotate: 90 }}
//               whileTap={{ scale: 0.9 }}
//               transition={{ type: "spring", stiffness: 400 }}
//               onClick={handleClose}
//               className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 bg-white rounded-full shadow-md hover:bg-[#F5E6D3] transition-all z-20"
//               aria-label="Close"
//             >
//               <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6B4F3A]" />
//             </motion.button>

//             {/* Main Content - Responsive Layout */}
//             <div className="flex flex-col md:flex-row">
//               {/* Left Side - Image Gallery */}
//               <div className="md:w-2/5 bg-[#FAF7F2] relative">
//                 {/* Product Navigation Arrows */}
//                 {/* {hasMultipleProducts && (
//                   <>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={prevProduct}
//                       className="absolute left-1 top-1/2 -translate-y-1/2 p-1 bg-white/90 rounded-full shadow-md hover:bg-[#F5E6D3] transition-all z-20"
//                     >
//                       <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6B4F3A]" />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={nextProduct}
//                       className="absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-white/90 rounded-full shadow-md hover:bg-[#F5E6D3] transition-all z-20"
//                     >
//                       <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6B4F3A]" />
//                     </motion.button>
//                   </>
//                 )} */}
                
//                 {/* Main Image Container */}
//                 <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-white">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={`${product.productId}-${currentImageIndex}-${hoveredImageIndex}`}
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       transition={{ duration: 0.3 }}
//                       className="w-full h-full"
//                     >
//                       {!hasImageError && currentImage ? (
//                         <img
//                           src={currentImage}
//                           alt={product.productName}
//                           className="w-full h-full object-contain p-2 sm:p-3 transition-transform duration-300 hover:scale-105"
//                           onError={() => handleImageError(product.productId, currentImage)}
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//                           <Package className="w-8 h-8 sm:w-12 sm:h-12 text-[#6B4F3A]/30" />
//                         </div>
//                       )}
//                     </motion.div>
//                   </AnimatePresence>
                  
//                   {/* Custom Tag Badge */}
//                   {productTag && (
//                     <motion.div 
//                       initial={{ x: -50, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: 0.2, type: "spring" }}
//                       className="absolute top-2 left-2"
//                     >
//                       <motion.span 
//                         whileHover={{ scale: 1.05 }}
//                         className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-[#3A7D44] text-white text-[8px] sm:text-[9px] font-semibold rounded-full shadow-lg tracking-wide flex items-center gap-0.5"
//                       >
//                         <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//                         {productTag}
//                       </motion.span>
//                     </motion.div>
//                   )}
                  
//                   {/* Image Navigation Arrows */}
//                   {hasMultipleImages && (
//                     <>
//                       <motion.button
//                         whileHover={{ scale: 1.1, x: -2 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={prevImage}
//                         className="absolute left-1 top-1/2 -translate-y-1/2 p-1 bg-white/90 rounded-full shadow-md hover:bg-[#F5E6D3] transition-all z-10"
//                       >
//                         <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6B4F3A]" />
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.1, x: 2 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={nextImage}
//                         className="absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-white/90 rounded-full shadow-md hover:bg-[#F5E6D3] transition-all z-10"
//                       >
//                         <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6B4F3A]" />
//                       </motion.button>
//                     </>
//                   )}
                  
//                   {/* Image Counter */}
//                   {hasMultipleImages && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-medium"
//                     >
//                       {currentImageIndex + 1}/{productImages.length}
//                     </motion.div>
//                   )}
//                 </div>
                
//                 {/* Thumbnail Strip - With Hover Effect */}
//                 {hasMultipleImages && (
//                   <div className="flex justify-center gap-1 p-1.5 sm:p-2 overflow-x-auto bg-[#FAF7F2] border-t border-[#E8D5C0]">
//                     {productImages.map((img, idx) => (
//                       <motion.button
//                         key={idx}
//                         whileHover={{ scale: 1.05, y: -2 }}
//                         whileTap={{ scale: 0.95 }}
//                         onMouseEnter={() => handleThumbnailHover(idx)}
//                         onMouseLeave={handleThumbnailLeave}
//                         onClick={() => {
//                           setCurrentImageIndex(idx);
//                           setHoveredImageIndex(null);
//                         }}
//                         className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-md overflow-hidden border-2 transition-all ${
//                           currentImageIndex === idx 
//                             ? 'border-[#6B4F3A] ring-1 ring-[#6B4F3A]/20' 
//                             : 'border-gray-200 hover:border-[#6B4F3A]'
//                         }`}
//                       >
//                         <img
//                           src={img.url}
//                           alt={`Thumbnail ${idx + 1}`}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
//                           }}
//                         />
//                       </motion.button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Right Side - Product Details */}
//               <div className="md:w-3/5 p-3 sm:p-4 overflow-y-auto max-h-[350px] sm:max-h-[380px] bg-white">
//                 {/* Product Name */}
//                 <Link href={`/productDetails?id=${product.productId}`} onClick={handleClose}>
//                   <motion.h3 
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="font-bold text-gray-900 text-sm sm:text-base mb-1 line-clamp-2 hover:text-[#6B4F3A] transition-colors font-serif"
//                   >
//                     {product.productName}
//                   </motion.h3>
//                 </Link>
                
//                 {/* Fabric / Material */}
//                 <motion.p 
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.15 }}
//                   className="text-[9px] sm:text-[10px] text-gray-500 mb-2 font-sans"
//                 >
//                   {product.fabric || 'Premium Quality Jute Product'}
//                 </motion.p>
                
//                 {/* Colors Display */}
//                 {product.colors && product.colors.length > 0 && (
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                     className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap"
//                   >
//                     <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium">Colors:</span>
//                     <div className="flex gap-1">
//                       {product.colors.slice(0, 4).map((color, idx) => (
//                         <motion.div
//                           key={idx}
//                           whileHover={{ scale: 1.2 }}
//                           transition={{ type: "spring", stiffness: 400 }}
//                           className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-200 shadow-sm cursor-pointer"
//                           style={{ backgroundColor: color.code }}
//                           title={color.name || color.code}
//                         />
//                       ))}
//                       {product.colors.length > 4 && (
//                         <span className="text-[7px] sm:text-[8px] text-gray-400 self-center">+{product.colors.length - 4}</span>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}
                
//                 {/* Sizes Display */}
//                 {product.sizes && product.sizes.filter(s => s.trim()).length > 0 && (
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.25 }}
//                     className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap"
//                   >
//                     <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium">Sizes:</span>
//                     <div className="flex gap-1 flex-wrap">
//                       {product.sizes.filter(s => s.trim()).slice(0, 4).map((size, idx) => (
//                         <span key={idx} className="text-[8px] sm:text-[9px] bg-[#F5E6D3] text-[#6B4F3A] px-1.5 py-0.5 rounded-full font-medium">
//                           {size}
//                         </span>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
                
//                 {/* Rating Stars */}
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="flex items-center gap-0.5 mb-2"
//                 >
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#F39C12] text-[#F39C12]" />
//                   ))}
//                   <span className="text-[8px] sm:text-[9px] text-gray-500 ml-1">(128 reviews)</span>
//                 </motion.div>
                
//                 {/* Price and MOQ */}
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.35, type: "spring" }}
//                   className="flex items-center justify-between mb-3 p-2 bg-[#F5E6D3] rounded-lg"
//                 >
//                   <div>
//                     <span className="text-[8px] sm:text-[9px] text-gray-500">Starting from</span>
//                     <motion.p 
//                       whileHover={{ scale: 1.02 }}
//                       className="text-base sm:text-lg font-bold text-[#6B4F3A]"
//                     >
//                       {formatPrice(product.pricePerUnit)}
//                       <span className="text-[8px] sm:text-[10px] font-normal text-gray-400">/{unitLabel}</span>
//                     </motion.p>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-[8px] sm:text-[9px] text-gray-500">Minimum Order</span>
//                     <p className="text-xs sm:text-sm font-semibold text-gray-800">{product.moq} {unitLabel}</p>
//                   </div>
//                 </motion.div>
                
//                 {/* Bulk Pricing Hint */}
//                 {product.quantityBasedPricing && product.quantityBasedPricing.length > 0 && (
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                     className="mb-3 p-1.5 bg-gray-50 rounded-lg border border-gray-100"
//                   >
//                     <p className="text-[8px] sm:text-[9px] text-gray-500 mb-0.5">📦 Bulk Discounts</p>
//                     <div className="flex gap-1 flex-wrap">
//                       {product.quantityBasedPricing.slice(0, 2).map((tier, idx) => (
//                         <span key={idx} className="text-[7px] sm:text-[8px] text-[#6B4F3A] font-medium">
//                           {tier.range}: {formatPrice(tier.price)}/{unitLabel === 'pcs' ? 'pc' : unitLabel}
//                         </span>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
                
//                 {/* CTA Buttons */}
//                 <div className="flex gap-2 mt-3">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => {
//                       window.location.href = `/productDetails?id=${product.productId}`;
//                       handleClose();
//                     }}
//                     className="flex-1 px-2 py-1.5 sm:px-3 sm:py-1.5 bg-[#6B4F3A] text-white text-[10px] sm:text-xs font-semibold rounded-lg hover:bg-[#8B6B51] transition-all flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
//                   >
//                     <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                     <span>View Details</span>
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       window.location.href = `/productDetails?id=${product.productId}#inquiry-form`;
//                     }}
//                     className="px-2 py-1.5 sm:px-3 sm:py-1.5 border-2 border-[#6B4F3A] text-[#6B4F3A] text-[10px] sm:text-xs font-semibold rounded-lg hover:bg-[#F5E6D3] transition-all flex items-center justify-center gap-1"
//                   >
//                     <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                     <span className="hidden sm:inline">Add to Cart</span>
//                     <span className="sm:hidden">Add</span>
//                   </motion.button>
//                 </div>

//                 {/* Animated Pulse Effect on CTA */}
//                {/* Animated Pulse Effect on CTA */}
// <motion.div 
//   animate={{ opacity: [0.5, 1, 0.5] }}
//   transition={{ duration: 2, repeat: Infinity }}
//   className="text-center mt-2"
// >
//   <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-500">
//     🚀 Offer ends soon!
//   </p>
// </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Hook to use the modal - Shows ONLY the latest uploaded promotional data
// // export const usePromotionalModal = () => {
// //   const [showModal, setShowModal] = useState(false);
// //   const [modalProducts, setModalProducts] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [currentShowNumber, setCurrentShowNumber] = useState(1);
// //   const [currentProductIndex, setCurrentProductIndex] = useState(0);
// //   const [intervals, setIntervals] = useState([]);
// //   const [maxShows, setMaxShows] = useState(3);
// //   const timerRef = useRef(null);

// //   // Fetch promotional settings from API
// //   const fetchPromotionalSettings = async () => {
// //     try {
// //       console.log('🔍 Fetching promotional settings...');
// //       const response = await fetch('http://localhost:5000/api/promotional');
// //       const data = await response.json();
      
// //       console.log('📦 API Response:', data);
      
// //       if (data.success && data.data && data.data.isActive && data.data.products && data.data.products.length > 0) {
// //         console.log('📊 Total products from API:', data.data.products.length);
// //         console.log('📊 Products data with createdAt:', data.data.products.map(p => ({ name: p.productName, createdAt: p.createdAt })));
        
// //         setIntervals(data.data.intervals);
// //         setMaxShows(data.data.maxShows);
        
// //         // IMPORTANT: Sort by createdAt and take ONLY the LATEST ONE
// //         // First, ensure each product has a createdAt field
// //         const productsWithDates = data.data.products.map(product => ({
// //           ...product,
// //           createdAt: product.createdAt || new Date(0) // Fallback for old data
// //         }));
        
// //         // Sort by createdAt in descending order (newest first)
// //         const sortedProducts = productsWithDates.sort((a, b) => {
// //           const dateA = new Date(a.createdAt);
// //           const dateB = new Date(b.createdAt);
// //           return dateB - dateA; // Descending - newest first
// //         });
        
// //         console.log('📊 Sorted products by createdAt (newest first):', sortedProducts.map(p => ({ 
// //           name: p.productName, 
// //           createdAt: p.createdAt 
// //         })));
        
// //         // Take ONLY the latest product (first item after sorting)
// //         const latestProduct = sortedProducts.slice(0, 1);
        
// //         console.log('📊 Latest product (only 1):', latestProduct.length);
// //         console.log('📊 Latest product name:', latestProduct[0]?.productName);
// //         console.log('📊 Latest product createdAt:', latestProduct[0]?.createdAt);
        
// //         // Format products - take only the latest
// //         const productsWithTags = latestProduct.map(product => ({
// //           productId: product.productId,
// //           productName: product.productName,
// //           pricePerUnit: product.pricePerUnit,
// //           images: product.images || [],
// //           fabric: product.fabric,
// //           moq: product.moq,
// //           orderUnit: product.orderUnit || 'piece',
// //           tag: product.tag || 'Special Offer',
// //           colors: product.colors || [],
// //           sizes: product.sizes || [],
// //           quantityBasedPricing: product.quantityBasedPricing || [],
// //           additionalInfo: product.additionalInfo || []
// //         }));
        
// //         console.log('✅ Products loaded:', productsWithTags.length);
// //         if (productsWithTags[0]) {
// //           console.log('✅ Product name:', productsWithTags[0]?.productName);
// //           console.log('✅ Product images count:', productsWithTags[0]?.images?.length);
// //         }
        
// //         setModalProducts(productsWithTags);
        
// //         // Show first modal
// //         const firstDelay = data.data.intervals[0]?.delay * 1000 || 5000;
// //         console.log(`⏰ Showing modal #1 in ${firstDelay/1000} seconds...`);
        
// //         if (timerRef.current) clearTimeout(timerRef.current);
// //         timerRef.current = setTimeout(() => {
// //           console.log('🎉 SHOWING MODAL #1!');
// //           setShowModal(true);
// //         }, firstDelay);
        
// //       } else {
// //         console.log('⚠️ No active promotional settings');
// //         setModalProducts([]);
// //       }
// //     } catch (error) {
// //       console.error('❌ Error fetching promotional settings:', error);
// //       setModalProducts([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Schedule next modal
// //   const scheduleNextModal = useCallback((currentShow) => {
// //     const nextShowNumber = currentShow + 1;
    
// //     if (nextShowNumber <= maxShows && intervals[nextShowNumber - 1]) {
// //       const delay = intervals[nextShowNumber - 1].delay * 1000;
// //       console.log(`⏰ Showing modal #${nextShowNumber} in ${delay/1000} seconds...`);
      
// //       if (timerRef.current) clearTimeout(timerRef.current);
// //       timerRef.current = setTimeout(() => {
// //         console.log(`🎉 SHOWING MODAL #${nextShowNumber}!`);
// //         setShowModal(true);
// //         setCurrentShowNumber(nextShowNumber);
// //       }, delay);
// //     } else {
// //       console.log('✅ All modals shown. No more modals will appear.');
// //     }
// //   }, [intervals, maxShows]);

// //   // Handle modal close
// //   const handleModalClose = useCallback(() => {
// //     console.log(`🔚 Modal #${currentShowNumber} closed`);
// //     setShowModal(false);
    
// //     // Schedule next modal if not at max
// //     if (currentShowNumber < maxShows) {
// //       scheduleNextModal(currentShowNumber);
// //     }
// //   }, [currentShowNumber, maxShows, scheduleNextModal]);

// //   // Cleanup on unmount
// //   useEffect(() => {
// //     return () => {
// //       if (timerRef.current) {
// //         clearTimeout(timerRef.current);
// //       }
// //     };
// //   }, []);

// //   // Initialize
// //   useEffect(() => {
// //     setCurrentShowNumber(1);
// //     fetchPromotionalSettings();
// //   }, []);

// //   const handleProductChange = (index) => {
// //     setCurrentProductIndex(index);
// //   };

// //   return {
// //     showModal,
// //     modalProducts,
// //     isLoading,
// //     currentProductIndex,
// //     handleModalClose,
// //     handleProductChange
// //   };
// // };

// // In PromotionalModal.js - Modify the usePromotionalModal hook
// // Add this to ensure the modal shows all intervals

// export const usePromotionalModal = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [modalProducts, setModalProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentShowNumber, setCurrentShowNumber] = useState(1);
//   const [currentProductIndex, setCurrentProductIndex] = useState(0);
//   const [maxShows, setMaxShows] = useState(3);
//   const timerRef = useRef(null);

//   // Fetch promotional settings from API
//   const fetchPromotionalSettings = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/promotional');
//       const data = await response.json();
      
//       if (data.success && data.data.isActive && data.data.products && data.data.products.length > 0) {
//         setModalProducts(data.data.products);
//         setMaxShows(data.data.maxShows);
        
//         // Store intervals in localStorage for the unified manager
//         localStorage.setItem('promotionalIntervals', JSON.stringify(data.data.intervals));
//         localStorage.setItem('promotionalMaxShows', data.data.maxShows);
//       }
//     } catch (error) {
//       console.error('Error fetching promotional settings:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPromotionalSettings();
//   }, []);

//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   return {
//     showModal,
//     modalProducts,
//     isLoading,
//     currentProductIndex,
//     handleModalClose,
//     handleProductChange: setCurrentProductIndex
//   };
// };

// export default PromotionalModal;



'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ShoppingCart, Eye, Star, Package, Sparkles, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const PromotionalModal = ({ products = [], onClose, currentProductIndex = 0, onProductChange }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [localCurrentIndex, setLocalCurrentIndex] = useState(currentProductIndex);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const handleImageError = (productId, imageUrl) => {
    console.log(`Image failed to load: ${imageUrl}`);
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const nextProduct = (e) => {
    e.stopPropagation();
    if (products.length > 1) {
      const newIndex = (localCurrentIndex + 1) % products.length;
      setLocalCurrentIndex(newIndex);
      setCurrentImageIndex(0);
      setHoveredImageIndex(null);
      if (onProductChange) onProductChange(newIndex);
    }
  };

  const prevProduct = (e) => {
    e.stopPropagation();
    if (products.length > 1) {
      const newIndex = (localCurrentIndex - 1 + products.length) % products.length;
      setLocalCurrentIndex(newIndex);
      setCurrentImageIndex(0);
      setHoveredImageIndex(null);
      if (onProductChange) onProductChange(newIndex);
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const product = products[localCurrentIndex];
    if (product?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      setHoveredImageIndex(null);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const product = products[localCurrentIndex];
    if (product?.images?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      setHoveredImageIndex(null);
    }
  };

  const handleThumbnailHover = (index) => {
    setHoveredImageIndex(index);
    setCurrentImageIndex(index);
  };

  const handleThumbnailLeave = () => {
    setHoveredImageIndex(null);
  };

  if (!isVisible) return null;

  const product = products[localCurrentIndex];
  if (!product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price || 0);
  };

  const getUnitLabel = (orderUnit) => {
    switch(orderUnit) {
      case 'kg': return 'kg';
      case 'ton': return 'MT';
      default: return 'pc';
    }
  };

  const unitLabel = getUnitLabel(product.orderUnit);
  const productImages = product.images || [];
  const currentImage = productImages[currentImageIndex]?.url || product.image;
  const hasImageError = imageErrors[product.productId];
  const productTag = product.tag || product.promoTag;
  const hasMultipleImages = productImages.length > 1;
  const hasMultipleProducts = products.length > 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Animated Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Animated Modal Content - Mobile Optimized */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.4 
            }}
            className="relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden
              max-w-[95%] sm:max-w-md md:max-w-2xl lg:max-w-3xl
              max-h-[90vh] sm:max-h-none"
          >
            {/* Animated Header with Shine Effect - Smaller on mobile */}
            <div className="relative bg-gradient-to-r from-[#6B4F3A] via-[#8B6B51] to-[#6B4F3A] 
              px-2 py-1 sm:px-5 sm:py-2 overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
              />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1 sm:gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Sparkles className="w-2 h-2 sm:w-4 sm:h-4 text-white" />
                  </motion.div>
                  <h2 className="text-white font-semibold text-[8px] sm:text-xs font-serif tracking-wide">
                    Limited Time Offer
                  </h2>
                </div>
              </div>
            </div>

            {/* Close Button - Smaller on mobile */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={handleClose}
              className="absolute top-1 right-1 sm:top-3 sm:right-3 p-1 sm:p-1.5 bg-white rounded-full shadow-md hover:bg-[#F5E6D3] transition-all z-20"
              aria-label="Close"
            >
              <X className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#6B4F3A]" />
            </motion.button>

            {/* Main Content - Mobile Optimized Layout */}
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Image Gallery - Smaller on mobile */}
              <div className="md:w-2/5 bg-[#FAF7F2] relative">
                {/* Main Image Container - Reduced height on mobile */}
                <div className="relative h-36 sm:h-48 md:h-56 lg:h-64 overflow-hidden bg-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${product.productId}-${currentImageIndex}-${hoveredImageIndex}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      {!hasImageError && currentImage ? (
                        <img
                          src={currentImage}
                          alt={product.productName}
                          className="w-full h-full object-contain p-1 sm:p-3 transition-transform duration-300 hover:scale-105"
                          onError={() => handleImageError(product.productId, currentImage)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                          <Package className="w-6 h-6 sm:w-12 sm:h-12 text-[#6B4F3A]/30" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Custom Tag Badge - Smaller on mobile */}
                  {productTag && (
                    <motion.div 
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="absolute top-1 left-1 sm:top-2 sm:left-2"
                    >
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="px-1 py-0.5 sm:px-2 sm:py-0.5 bg-[#3A7D44] text-white text-[6px] sm:text-[9px] font-semibold rounded-full shadow-lg tracking-wide flex items-center gap-0.5"
                      >
                        <Sparkles className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5" />
                        {productTag}
                      </motion.span>
                    </motion.div>
                  )}
                  
                  {/* Image Navigation Arrows - Smaller on mobile */}
                  {hasMultipleImages && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1, x: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevImage}
                        className="absolute left-0.5 top-1/2 -translate-y-1/2 p-0.5 sm:p-1 bg-white/90 rounded-full shadow-md hover:bg-[#F5E6D3] transition-all z-10"
                      >
                        <ChevronLeft className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#6B4F3A]" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, x: 2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextImage}
                        className="absolute right-0.5 top-1/2 -translate-y-1/2 p-0.5 sm:p-1 bg-white/90 rounded-full shadow-md hover:bg-[#F5E6D3] transition-all z-10"
                      >
                        <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#6B4F3A]" />
                      </motion.button>
                    </>
                  )}
                  
                  {/* Image Counter - Smaller on mobile */}
                  {hasMultipleImages && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-black/60 backdrop-blur-sm text-white text-[6px] sm:text-[9px] px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded-full font-medium"
                    >
                      {currentImageIndex + 1}/{productImages.length}
                    </motion.div>
                  )}
                </div>
                
                {/* Thumbnail Strip - Smaller on mobile */}
                {hasMultipleImages && (
                  <div className="flex justify-center gap-0.5 p-1 sm:p-2 overflow-x-auto bg-[#FAF7F2] border-t border-[#E8D5C0]">
                    {productImages.map((img, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => handleThumbnailHover(idx)}
                        onMouseLeave={handleThumbnailLeave}
                        onClick={() => {
                          setCurrentImageIndex(idx);
                          setHoveredImageIndex(null);
                        }}
                        className={`flex-shrink-0 w-5 h-5 sm:w-8 sm:h-8 rounded-md overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx 
                            ? 'border-[#6B4F3A] ring-1 ring-[#6B4F3A]/20' 
                            : 'border-gray-200 hover:border-[#6B4F3A]'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
                          }}
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Side - Product Details - Smaller text on mobile */}
              <div className="md:w-3/5 p-2 sm:p-4 overflow-y-auto max-h-[250px] sm:max-h-[380px] bg-white">
                {/* Product Name */}
                <Link href={`/productDetails?id=${product.productId}`} onClick={handleClose}>
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-bold text-gray-900 text-xs sm:text-base mb-0.5 sm:mb-1 line-clamp-2 hover:text-[#6B4F3A] transition-colors font-serif"
                  >
                    {product.productName}
                  </motion.h3>
                </Link>
                
                {/* Fabric / Material */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-[8px] sm:text-[10px] text-gray-500 mb-1 sm:mb-2 font-sans"
                >
                  {product.fabric || 'Premium Quality Jute Product'}
                </motion.p>
                
                {/* Colors Display */}
                {product.colors && product.colors.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 flex-wrap"
                  >
                    <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium">Colors:</span>
                    <div className="flex gap-0.5 sm:gap-1">
                      {product.colors.slice(0, 4).map((color, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-200 shadow-sm cursor-pointer"
                          style={{ backgroundColor: color.code }}
                          title={color.name || color.code}
                        />
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-[6px] sm:text-[8px] text-gray-400 self-center">+{product.colors.length - 4}</span>
                      )}
                    </div>
                  </motion.div>
                )}
                
                {/* Sizes Display */}
                {product.sizes && product.sizes.filter(s => s.trim()).length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 flex-wrap"
                  >
                    <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium">Sizes:</span>
                    <div className="flex gap-0.5 sm:gap-1 flex-wrap">
                      {product.sizes.filter(s => s.trim()).slice(0, 4).map((size, idx) => (
                        <span key={idx} className="text-[7px] sm:text-[9px] bg-[#F5E6D3] text-[#6B4F3A] px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded-full font-medium">
                          {size}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Rating Stars */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-0.5 mb-1 sm:mb-2"
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2 h-2 sm:w-3 sm:h-3 fill-[#F39C12] text-[#F39C12]" />
                  ))}
                  <span className="text-[7px] sm:text-[9px] text-gray-500 ml-0.5 sm:ml-1">(128 reviews)</span>
                </motion.div>
                
                {/* Price and MOQ - Smaller on mobile */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35, type: "spring" }}
                  className="flex items-center justify-between mb-2 sm:mb-3 p-1.5 sm:p-2 bg-[#F5E6D3] rounded-lg"
                >
                  <div>
                    <span className="text-[7px] sm:text-[9px] text-gray-500">Starting from</span>
                    <motion.p 
                      whileHover={{ scale: 1.02 }}
                      className="text-sm sm:text-lg font-bold text-[#6B4F3A]"
                    >
                      {formatPrice(product.pricePerUnit)}
                      <span className="text-[7px] sm:text-[10px] font-normal text-gray-400">/{unitLabel}</span>
                    </motion.p>
                  </div>
                  <div className="text-right">
                    <span className="text-[7px] sm:text-[9px] text-gray-500">Minimum Order</span>
                    <p className="text-[10px] sm:text-sm font-semibold text-gray-800">{product.moq} {unitLabel}</p>
                  </div>
                </motion.div>
                
                {/* Bulk Pricing Hint - Smaller on mobile */}
                {product.quantityBasedPricing && product.quantityBasedPricing.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-2 sm:mb-3 p-1 sm:p-1.5 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <p className="text-[7px] sm:text-[9px] text-gray-500 mb-0.5">📦 Bulk Discounts</p>
                    <div className="flex gap-0.5 sm:gap-1 flex-wrap">
                      {product.quantityBasedPricing.slice(0, 2).map((tier, idx) => (
                        <span key={idx} className="text-[6px] sm:text-[8px] text-[#6B4F3A] font-medium">
                          {tier.range}: {formatPrice(tier.price)}/{unitLabel === 'pcs' ? 'pc' : unitLabel}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* CTA Buttons - Smaller on mobile */}
                <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      window.location.href = `/productDetails?id=${product.productId}`;
                      handleClose();
                    }}
                    className="flex-1 px-1.5 py-1 sm:px-3 sm:py-1.5 bg-[#6B4F3A] text-white text-[9px] sm:text-xs font-semibold rounded-lg hover:bg-[#8B6B51] transition-all flex items-center justify-center gap-0.5 sm:gap-1 shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    <span>View Details</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/productDetails?id=${product.productId}#inquiry-form`;
                    }}
                    className="px-1.5 py-1 sm:px-3 sm:py-1.5 border-2 border-[#6B4F3A] text-[#6B4F3A] text-[9px] sm:text-xs font-semibold rounded-lg hover:bg-[#F5E6D3] transition-all flex items-center justify-center gap-0.5 sm:gap-1"
                  >
                    <ShoppingCart className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </motion.button>
                </div>

                {/* Animated Pulse Effect - Smaller text on mobile */}
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center mt-1.5 sm:mt-2"
                >
                  <p className="text-[8px] sm:text-xs md:text-sm font-medium text-gray-500">
                    🚀 Offer ends soon!
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const usePromotionalModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalProducts, setModalProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentShowNumber, setCurrentShowNumber] = useState(1);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [maxShows, setMaxShows] = useState(3);
  const timerRef = useRef(null);

  const fetchPromotionalSettings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/promotional');
      const data = await response.json();
      
      if (data.success && data.data.isActive && data.data.products && data.data.products.length > 0) {
        setModalProducts(data.data.products);
        setMaxShows(data.data.maxShows);
        
        localStorage.setItem('promotionalIntervals', JSON.stringify(data.data.intervals));
        localStorage.setItem('promotionalMaxShows', data.data.maxShows);
      }
    } catch (error) {
      console.error('Error fetching promotional settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotionalSettings();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
  };

  return {
    showModal,
    modalProducts,
    isLoading,
    currentProductIndex,
    handleModalClose,
    handleProductChange: setCurrentProductIndex
  };
};

export default PromotionalModal;