
// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ShoppingCart,
//   Trash2,
//   ArrowLeft,
//   Loader2,
//   Heart,
//   Gift,
//   Eye,
//   Star,
//   Package,
//   Truck,
//   ShieldCheck,
//   RefreshCw,
//   Sparkles,
//   Zap,
//   Users,
//   Tag
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import WhatsAppButton from '../components/layout/WhatsAppButton';

// const TOY_COLORS = {
//   primary: '#4A8A90',
//   secondary: '#FFB6C1',
//   accent: '#FFD93D',
//   lightBg: '#FFF9F0',
//   border: '#FFE0E6'
// };

// // Helper functions
// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

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

// const getAgeGroupBadge = (ageGroup) => {
//   const styles = {
//     '0-2': 'bg-pink-100 text-pink-600',
//     '3-5': 'bg-blue-100 text-blue-600',
//     '6-10': 'bg-green-100 text-green-600',
//     '11-14': 'bg-purple-100 text-purple-600',
//   };
//   return styles[ageGroup] || 'bg-gray-100 text-gray-600';
// };

// const getTagStyles = (tag) => {
//   const styles = {
//     'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
//     'New Arrival': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
//     'Limited Edition': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white',
//     'Eco-Friendly': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
//     'Educational': 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
//     'STEM Toy': 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white',
//     'Trending': 'bg-gradient-to-r from-rose-500 to-red-600 text-white',
//   };
//   return styles[tag] || 'bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white';
// };

// // Wishlist Grid Card Component - Exactly matching ProductGridCard design
// // Wishlist Grid Card Component - Matching ProductGridCard design with mobile responsiveness
// const WishlistGridCard = ({ item, router, onRemove, isInCart, onAddToCart, onViewCart }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isRemoving, setIsRemoving] = useState(false);
  
//   const regularPrice = item.regularPrice || 0;
//   const discountPrice = item.discountPrice || 0;
//   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
  
//   // Handle multiple images from product data
//   const productImages = item.images && item.images.length > 0 
//     ? item.images 
//     : [{ url: item.image }];
//   const hasMultipleImages = productImages.length > 1;
//   const primaryTag = item.tags?.[0] || null;
//   const tagStyle = primaryTag ? getTagStyles(primaryTag) : '';

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const handleRemove = async (e) => {
//     e.stopPropagation();
//     setIsRemoving(true);
//     await onRemove(item._id);
//     setIsRemoving(false);
//   };
  
//   const addToCart = async (e) => {
//     e.stopPropagation();
    
//     if (isInCart) {
//       onViewCart(e);
//       return;
//     }
    
//     setCartStatusLoading(true);
//     await onAddToCart(item.productId);
//     setCartStatusLoading(false);
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{
//         layout: { type: "spring", stiffness: 100, damping: 15 },
//         opacity: { duration: 0.3 }
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group bg-white rounded-xl border border-[#FFE0E6] hover:border-[#FFB6C1] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md overflow-hidden"
//       onClick={() => {
//         if (isMobile) {
//           window.location.href = `/productDetails?id=${item.productId}`;
//         } else {
//           window.open(`/productDetails?id=${item.productId}`, '_blank');
//         }
//       }}
//     >
//       {/* Image Container */}
//       <div className="relative w-full h-32 sm:h-36 md:h-40 overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6]">
//         <motion.img
//           src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300'}
//           alt={item.productName}
//           className="w-full h-full object-contain p-2"
//           whileHover={{ scale: 1.08 }}
//           transition={{ duration: 0.4 }}
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://via.placeholder.com/300?text=Toy';
//           }}
//           loading="lazy"
//         />
        
//         {/* Discount Badge - Reduced size for mobile */}
//         {discountPercent > 0 && (
//           <div className="absolute top-0.5 left-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[7px] sm:text-[9px] font-bold px-1 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
//             <Zap className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//             {discountPercent}% OFF
//           </div>
//         )}
        
//         {/* Tag Badge - Top Right */}
//         {primaryTag && (
//           <motion.div 
//             initial={{ x: 10, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.1 }}
//             className={`absolute top-0.5 right-0.5 ${tagStyle} text-[6px] sm:text-[7px] md:text-[8px] px-1 py-0.5 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg`}
//           >
//             <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//             <span className="truncate max-w-[40px] sm:max-w-[60px]">{primaryTag}</span>
//           </motion.div>
//         )}
        
//         {/* Remove Button - Only if no tag (for desktop) */}
//         {!primaryTag && (
//           <motion.button
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: isHovered && !isMobile ? 1 : 0, opacity: isHovered && !isMobile ? 1 : 0 }}
//             transition={{ delay: 0.1, duration: 0.2 }}
//             onClick={handleRemove}
//             disabled={isRemoving}
//             className="absolute top-0.5 right-0.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-red-50 transition-all z-30"
//           >
//             {isRemoving ? (
//               <Loader2 className="w-3 h-3 animate-spin text-red-500" />
//             ) : (
//               <Trash2 className="w-3 h-3 text-red-500" />
//             )}
//           </motion.button>
//         )}
        
//         {/* Desktop Hover Icons - Appear from Right Side (for large devices) */}
//         <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30 hidden sm:flex">
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ 
//               x: isHovered && !isMobile ? 0 : 40, 
//               opacity: isHovered && !isMobile ? 1 : 0 
//             }}
//             transition={{ duration: 0.15, ease: "easeOut" }}
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${item.productId}`, '_blank');
//             }}
//             className="w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#4A8A90] flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
//           >
//             <Eye className="w-3.5 h-3.5 text-[#4A8A90] hover:text-white transition-colors duration-200" />
//           </motion.div>
          
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ 
//               x: isHovered && !isMobile ? 0 : 40, 
//               opacity: isHovered && !isMobile ? 1 : 0 
//             }}
//             transition={{ duration: 0.15, ease: "easeOut", delay: 0.03 }}
//             onClick={addToCart}
//             className="w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#4A8A90] flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4A8A90] hover:text-white" />
//             ) : isInCart ? (
//               <ShoppingCart className="w-3.5 h-3.5 text-green-500" />
//             ) : (
//               <ShoppingCart className="w-3.5 h-3.5 text-[#FFB6C1] hover:text-white transition-colors duration-200" />
//             )}
//           </motion.div>
          
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ 
//               x: isHovered && !isMobile ? 0 : 40, 
//               opacity: isHovered && !isMobile ? 1 : 0 
//             }}
//             transition={{ duration: 0.15, ease: "easeOut", delay: 0.06 }}
//             onClick={handleRemove}
//             className="w-7 h-7 rounded-full bg-white shadow-md hover:bg-red-500 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
//           >
//             {isRemoving ? (
//               <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500 hover:text-white" />
//             ) : (
//               <Trash2 className="w-3.5 h-3.5 text-red-500 hover:text-white transition-colors duration-200" />
//             )}
//           </motion.div>
//         </div>
        
//         {/* Mobile Action Icons - Bottom Center (only visible on mobile) */}
//         <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-30 px-2 sm:hidden">
//           {/* View Details Button */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${item.productId}`, '_blank');
//             }}
//             className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
//           >
//             <Eye className="w-3 h-3 text-[#4A8A90]" />
//           </motion.button>
          
//           {/* Add to Cart Button */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={addToCart}
//             className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="w-3 h-3 animate-spin text-[#4A8A90]" />
//             ) : isInCart ? (
//               <ShoppingCart className="w-3 h-3 text-green-500" />
//             ) : (
//               <ShoppingCart className="w-3 h-3 text-[#FFB6C1]" />
//             )}
//           </motion.button>
          
//           {/* Remove from Wishlist Button */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={handleRemove}
//             className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
//           >
//             {isRemoving ? (
//               <Loader2 className="w-3 h-3 animate-spin text-red-500" />
//             ) : (
//               <Trash2 className="w-3 h-3 text-red-500" />
//             )}
//           </motion.button>
//         </div>
//       </div>
      
//       {/* Thumbnail Images - Reduced size for mobile */}
//       {hasMultipleImages && (
//         <div className="flex justify-center items-center gap-1 py-1 bg-[#FFF9F0] border-b border-[#FFE0E6]">
//           {productImages.slice(0, 4).map((image, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 overflow-hidden rounded transition-all duration-200 ${
//                 activeIndex === index 
//                   ? 'ring-1 ring-[#4A8A90] ring-offset-0.5 scale-110' 
//                   : 'opacity-60 hover:opacity-100'
//               }`}
//               onMouseEnter={() => setActiveIndex(index)}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setActiveIndex(index);
//               }}
//             >
//               <img src={image.url} alt="" className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Content */}
//       <div className="p-1.5 sm:p-2">
//         {/* Product Name - Smaller on mobile */}
//         <h3 className="text-[10px] sm:text-xs font-bold text-[#2D3A5C] line-clamp-2 hover:text-[#4A8A90] transition-colors duration-200 mb-1" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }} title={item.productName}>
//           {truncateText(item.productName, isMobile ? 12 : 20)}
//         </h3>
        
//         {/* Age Group and Rating Row - Smaller on mobile */}
//         <div className="flex items-center justify-between mb-1">
//           {item.ageGroup ? (
//             <div className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[6px] sm:text-[8px] font-semibold ${getAgeGroupBadge(item.ageGroup)}`}>
//               <Users className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//               Ages {item.ageGroup}
//             </div>
//           ) : (
//             <div className="text-[6px] sm:text-[8px] text-gray-400">✨ Wishlist</div>
//           )}
          
//           <div className="flex items-center gap-0.5">
//             <div className="flex items-center">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 ${
//                     star <= (item.rating || 5)
//                       ? 'fill-yellow-400 text-yellow-400'
//                       : 'text-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-[6px] sm:text-[8px] text-gray-500">({item.rating || 5})</span>
//           </div>
//         </div>

//         {/* Price Section */}
//         <div className="flex items-baseline gap-1 mb-1">
//           <span className="text-xs sm:text-sm font-bold text-[#4A8A90]">
//             ৳{formatPrice(currentPrice)}
//           </span>
//           {discountPercent > 0 && (
//             <>
//               <span className="text-[6px] sm:text-[8px] text-gray-400 line-through">
//                 ৳{formatPrice(originalPrice)}
//               </span>
//               <span className="text-[5px] sm:text-[7px] font-semibold text-red-500 bg-red-100 px-0.5 py-0.5 rounded">
//                 -{discountPercent}%
//               </span>
//             </>
//           )}
//         </div>

//         {/* Category and Stock Status Row */}
//         <div className="flex items-center justify-between gap-1">
//           {item.category?.name ? (
//             <div className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-[#8B9DC3]">
//               <Package className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5" />
//               <span className="truncate max-w-[40px] sm:max-w-[70px]">{item.category.name}</span>
//             </div>
//           ) : (
//             <div className="text-[5px] sm:text-[7px] text-gray-400">🎁 Toy</div>
//           )}
          
//           <div className="flex-shrink-0">
//             {item.stockQuantity > 0 ? (
//               <span className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-green-600 font-medium">
//                 <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="hidden sm:inline">In Stock ({item.stockQuantity})</span>
//                 <span className="sm:hidden">Stock</span>
//               </span>
//             ) : (
//               <span className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-red-500 font-medium">
//                 <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-red-500 rounded-full"></div>
//                 <span className="hidden sm:inline">Out of Stock</span>
//                 <span className="sm:hidden">Out</span>
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Add to Cart / View Cart Button - Smaller on mobile */}
//       {cartStatusLoading ? (
//         <button
//           disabled
//           className="w-full py-1 sm:py-1.5 text-center text-[8px] sm:text-[9px] font-bold bg-gray-300 text-gray-500 flex items-center justify-center gap-1"
//         >
//           <Loader2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 animate-spin" />
//           Loading...
//         </button>
//       ) : isInCart ? (
//         <button
//           onClick={onViewCart}
//           className="w-full py-1 sm:py-1.5 text-center text-[8px] sm:text-[9px] font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-1"
//         >
//           <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//           <span className="sm:inline">View in Cart</span>
//         </button>
//       ) : (
//         <button
//           onClick={addToCart}
//           className="w-full py-1 sm:py-1.5 text-center text-[8px] sm:text-[9px] font-bold bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white hover:from-[#3A7A80] hover:to-[#5B9399] transition-all duration-200 flex items-center justify-center gap-1"
//         >
//           <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//           <span className="sm:inline">Add to Cart</span>
//         </button>
//       )}
//     </motion.div>
//   );
// };
// // Main Wishlist Page Component
// export default function WishlistPage() {
//   const router = useRouter();
//   const [wishlist, setWishlist] = useState({ items: [], totalItems: 0 });
//   const [loading, setLoading] = useState(true);
//   const [removingItems, setRemovingItems] = useState({});
//   const [isClearing, setIsClearing] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const fetchInProgress = useRef(false);

//   // Fetch wishlist function
// //   const fetchWishlist = useCallback(async (silent = false) => {
// //     if (fetchInProgress.current) {
// //       console.log('Fetch already in progress, skipping');
// //       return;
// //     }
    
// //     fetchInProgress.current = true;
// //     if (!silent) setLoading(true);
    
// //     try {
// //       const token = localStorage.getItem('token');
// //       const sessionId = localStorage.getItem('wishlistSessionId');
// //       const headers = {};
      
// //       if (token) {
// //         headers['Authorization'] = `Bearer ${token}`;
// //       } else if (sessionId) {
// //         headers['x-session-id'] = sessionId;
// //       }
      
// //       // Also fetch product details for each wishlist item to get images and tags
// //       const response = await fetch('http://localhost:5000/api/wishlist', { headers });
// //       const data = await response.json();
      
// //       if (data.success && data.data.items.length > 0) {
// //         // Fetch product details for each wishlist item to get full product data
// //         const enrichedItems = await Promise.all(
// //           data.data.items.map(async (item) => {
// //             try {
// //               const productResponse = await fetch(`http://localhost:5000/api/products/${item.productId}`);
// //               const productData = await productResponse.json();
// //               if (productData.success) {
// //                 return {
// //                   ...item,
// //                   ...productData.data,
// //                   images: productData.data.images || [{ url: item.image }],
// //                   tags: productData.data.tags || [],
// //                   ageGroup: productData.data.ageGroup,
// //                   category: productData.data.category
// //                 };
// //               }
// //               return item;
// //             } catch (error) {
// //               console.error('Error fetching product details:', error);
// //               return item;
// //             }
// //           })
// //         );
        
// //         setWishlist({ ...data.data, items: enrichedItems });
// //       } else {
// //         setWishlist({ items: [], totalItems: 0 });
// //       }
// //     } catch (error) {
// //       console.error('Fetch wishlist error:', error);
// //       if (!silent) toast.error('Failed to load wishlist');
// //     } finally {
// //       fetchInProgress.current = false;
// //       if (!silent) setLoading(false);
// //     }
// //   }, []);

// // Fetch wishlist function - simplified (no need for separate product fetching)
// const fetchWishlist = useCallback(async (silent = false) => {
//   if (fetchInProgress.current) {
//     console.log('Fetch already in progress, skipping');
//     return;
//   }
  
//   fetchInProgress.current = true;
//   if (!silent) setLoading(true);
  
//   try {
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('wishlistSessionId');
//     const headers = {};
    
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     }
    
//     const response = await fetch('http://localhost:5000/api/wishlist', { headers });
//     const data = await response.json();
    
//     if (data.success) {
//       setWishlist(data.data);
//     } else {
//       setWishlist({ items: [], totalItems: 0 });
//     }
//   } catch (error) {
//     console.error('Fetch wishlist error:', error);
//     if (!silent) toast.error('Failed to load wishlist');
//   } finally {
//     fetchInProgress.current = false;
//     if (!silent) setLoading(false);
//   }
// }, []);

//   // Fetch cart status for wishlist items
//   const fetchCartStatus = useCallback(async () => {
//     if (wishlist.items.length === 0) return;
    
//     const productIds = wishlist.items.map(item => item.productId);
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
    
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
//   }, [wishlist.items]);

//   // Fetch wishlist on mount
//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   // Fetch cart status when wishlist loads
//   useEffect(() => {
//     if (wishlist.items.length > 0) {
//       fetchCartStatus();
//     }
//   }, [wishlist.items, fetchCartStatus]);

//   // Refresh cart status when cart updates
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       fetchCartStatus();
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     window.addEventListener('wishlist-update', fetchWishlist);
    
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//       window.removeEventListener('wishlist-update', fetchWishlist);
//     };
//   }, [fetchWishlist, fetchCartStatus]);

//   // Add to cart function
//   const addToCart = async (productId) => {
//     const toastId = toast.loading('Adding to cart...');
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
      
//       const headers = {
//         'Content-Type': 'application/json'
//       };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify({ productId, quantity: 1 })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success('Added to cart!', { id: toastId });
//         window.dispatchEvent(new Event('cart-update'));
//         fetchCartStatus();
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     }
//   };

//   // Remove from wishlist function
//   const removeFromWishlist = async (itemId) => {
//     setRemovingItems(prev => ({ ...prev, [itemId]: true }));
    
//     const previousWishlist = { ...wishlist };
    
//     setWishlist(prev => ({
//       ...prev,
//       items: prev.items.filter(item => item._id !== itemId),
//       totalItems: prev.totalItems - 1
//     }));
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('wishlistSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/wishlist/${itemId}`, {
//         method: 'DELETE',
//         headers
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setWishlist(data.data);
//         window.dispatchEvent(new Event('wishlist-update'));
//         toast.success('Removed from wishlist');
//       } else {
//         setWishlist(previousWishlist);
//         toast.error(data.error || 'Failed to remove item');
//       }
//     } catch (error) {
//       console.error('Remove from wishlist error:', error);
//       setWishlist(previousWishlist);
//       toast.error('Failed to remove item');
//     } finally {
//       setRemovingItems(prev => ({ ...prev, [itemId]: false }));
//     }
//   };

//   // Clear wishlist function
//   const clearWishlist = async () => {
//     if (!confirm('Are you sure you want to clear your wishlist?')) return;
    
//     setIsClearing(true);
//     const previousWishlist = { ...wishlist };
//     setWishlist({ items: [], totalItems: 0 });
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('wishlistSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/wishlist', {
//         method: 'DELETE',
//         headers
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         window.dispatchEvent(new Event('wishlist-update'));
//         toast.success('Wishlist cleared');
//       } else {
//         setWishlist(previousWishlist);
//         toast.error(data.error || 'Failed to clear wishlist');
//       }
//     } catch (error) {
//       console.error('Clear wishlist error:', error);
//       setWishlist(previousWishlist);
//       toast.error('Failed to clear wishlist');
//     } finally {
//       setIsClearing(false);
//     }
//   };

//   // View cart function
//   const viewCart = (e) => {
//     e.stopPropagation();
//     router.push('/cart');
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#FFF9F0] pt-24">
//           <div className="container mx-auto px-4 max-w-7xl">
//             <div className="flex items-center justify-center py-20">
//               <Loader2 className="w-8 h-8 text-[#4A8A90] animate-spin" />
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const hasItems = wishlist?.items?.length > 0;

//   return (
//     <>
//       <Navbar />
      
//       {/* Hero Banner Section */}
//       <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFE0E6] pt-10 ">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A8A90] mb-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                 My Wishlist 
//               </h1>
//               <p className="text-[#4A8A90]/80 text-sm md:text-base">
//                 Your collection of favorite toys
//               </p>
//             </div>
//             {hasItems && (
//               <button
//                 onClick={clearWishlist}
//                 disabled={isClearing}
//                 className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all disabled:opacity-50 text-sm font-medium"
//               >
//                 {isClearing ? (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 ) : (
//                   <Trash2 className="w-4 h-4" />
//                 )}
//                 Clear All
//               </button>
//             )}
//           </div>
          
//           {/* Wishlist Stats */}
//           {hasItems && (
//             <div className="mt-4 flex flex-wrap items-center gap-4">
//               <div className="bg-white rounded-full px-4 py-1.5 shadow-sm">
//                 <span className="text-sm font-medium text-[#4A8A90]">
//                   🎁 {wishlist.totalItems} {wishlist.totalItems === 1 ? 'item' : 'items'} in wishlist
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="min-h-screen bg-[#FFF9F0] pb-12">
//         <div className="container mx-auto px-4 max-w-7xl py-8">
//           {!hasItems ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl border-2 border-[#FFE0E6] p-12 text-center shadow-md"
//             >
//               <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#D4EDEE] to-[#FFE0E6] rounded-full flex items-center justify-center">
//                 <Heart className="w-16 h-16 text-[#FFB6C1]" />
//               </div>
//               <h2 className="text-2xl font-bold text-[#2D3A5C] mb-2">Your Wishlist is Empty!</h2>
//               <p className="text-gray-500 mb-6">Looks like you haven't added any toys to your wishlist yet.</p>
//               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//                 <Link
//                   href="/products"
//                   className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white font-bold rounded-full hover:from-[#3A7A80] hover:to-[#5B9399] transition-all shadow-md"
//                 >
//                   <Gift className="w-4 h-4" />
//                   Browse Toys
//                 </Link>
//                 <Link
//                   href="/flash-sale"
//                   className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD93D] to-[#FF7B54] text-white font-bold rounded-full hover:opacity-90 transition-all shadow-md"
//                 >
//                   <Zap className="w-4 h-4" />
//                   View Flash Sale
//                 </Link>
//               </div>
//             </motion.div>
//           ) : (
//             <>
//              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-5">
//                 <AnimatePresence>
//                   {wishlist.items.map((item) => (
//                     <WishlistGridCard
//                       key={item._id}
//                       item={item}
//                       router={router}
//                       onRemove={removeFromWishlist}
//                       isInCart={productsInCart[item.productId] || false}
//                       onAddToCart={addToCart}
//                       onViewCart={viewCart}
//                     />
//                   ))}
//                 </AnimatePresence>
//               </div>
              
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="mt-12 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-2xl p-6 text-center shadow-lg"
//               >
//                 <div className="flex flex-wrap justify-center gap-4 md:gap-6">
//                   <div className="flex items-center gap-2 text-white">
//                     <Truck className="w-4 h-4 md:w-5 md:h-5" />
//                     <span className="text-xs md:text-sm font-medium">Free Delivery</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-white">
//                     <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
//                     <span className="text-xs md:text-sm font-medium">Secure Shopping</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-white">
//                     <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
//                     <span className="text-xs md:text-sm font-medium">7-Day Returns</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-white">
//                     <Heart className="w-4 h-4 md:w-5 md:h-5" />
//                     <span className="text-xs md:text-sm font-medium">Save for Later</span>
//                   </div>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </div>
//       </div>
      
//       <Footer />
//       <WhatsAppButton />
//     </>
//   );
// }


import { Suspense } from 'react';
import WishlistClient from './WishlistClient';

// Loading fallback component for Wishlist page
function WishlistLoading() {
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <Navbar />
      <div className="container mx-auto px-4 max-w-7xl pt-24 py-8">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#4A8A90] animate-spin" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Import Navbar and Footer for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Loader2 } from 'lucide-react';

// ToyMart Wishlist SEO Metadata
export const metadata = {
  title: "My Wishlist | Save Your Favorite Kids Toys",
  description: "View and manage your saved toys on ToyMart wishlist. Save educational toys, RC cars, dolls, and more for later purchase. Easy checkout when you're ready!",
  keywords: [
    // Wishlist specific
    "toy wishlist bangladesh",
    "saved toys list",
    "favorite toys bd",
    "toymart wishlist",
    "my toy collection",
    
    // Shopping intent
    "save toys for later",
    "wishlist gift ideas",
    "kids toy favorites",
    "birthday gift wishlist",
    "toy shopping list bd",
    
    // Product categories for wishlist
    "educational toys wishlist",
    "rc cars saved list",
    "dolls wishlist bd",
    "montessori toys save",
    "stem kits favorites",
    "baby toys wishlist",
    
    // User intent
    "save items for later purchase",
    "toy gift registry",
    "kids birthday list",
    "shopping wishlist bd",
    "online toy store favorites"
  ],
  openGraph: {
    title: "My Wishlist - ToyMart | Save Your Favorite Kids Toys",
    description: "Your personal wishlist of favorite toys from ToyMart Bangladesh. Save educational toys, RC cars, dolls, outdoor toys & more. Easy checkout when you're ready to buy!",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/wishlist' || 'https://toymart.com.bd/wishlist',
    siteName: "ToyMart",
    images: [
      {
        url: '/wishlist-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Wishlist - Save Your Favorite Kids Toys',
      },
    ],
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ToyMartBD',
    creator: '@ToyMartBD',
    title: "My Wishlist | ToyMart Bangladesh",
    description: "Save and manage your favorite toys. Perfect for gift planning and shopping later!",
    images: ['/wishlist-twitter.jpg'],
  },
  alternates: {
    canonical: '/wishlist',
    languages: {
      'en': '/wishlist',
      'bn': '/bn/wishlist',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata for better SEO
  other: {
    'application-name': 'ToyMart Wishlist',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'page-type': 'user-wishlist',
    'user-action': 'save-favorites',
  },
};

// Server component with Suspense
export default function WishlistPage() {
  return (
    <Suspense fallback={<WishlistLoading />}>
      <WishlistClient />
    </Suspense>
  );
}