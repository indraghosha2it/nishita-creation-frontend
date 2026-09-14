// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import {
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   ArrowRight,
//   AlertCircle,
//   Check,
//   Loader2,
//   Palette,
//   Zap,
//   Layers,
//   Plus,
//   Minus,
//   Trash2,
//   X,
//   Circle,
//   ChevronDown,
//   ChevronUp,
//   Scale,
//   Package
// } from 'lucide-react';

// import { 
//   FaChevronDown, 
//   FaCheckCircle, 
//   FaTimes, 
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaFileAlt,
//   FaMoneyBillWave,
//   FaTruck,
//   FaShoppingBag,
//   FaClock,
//   FaShieldAlt,
//   FaArrowLeft,
//   FaBox,
//   FaShippingFast,
//   FaCreditCard,
//   FaStore,
//   FaBuilding,
//   FaSearch,
//   FaHome,
//   FaCity,
//   FaMapPin,
//   FaMinus,
//   FaPlus,
//   FaTrash
// } from 'react-icons/fa';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Font family constants - Beauty Bucket Theme
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = " serif";

// // Helper function for unit label
// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// // Helper function to get color name
// const getColorName = (color) => {
//   const colorMap = {
//     '#000000': 'Black',
//     '#FFFFFF': 'White',
//     '#FF0000': 'Red',
//     '#00FF00': 'Green',
//     '#0000FF': 'Blue',
//     '#FFFF00': 'Yellow',
//     '#FF00FF': 'Magenta',
//     '#00FFFF': 'Cyan',
//     '#FFA500': 'Orange',
//     '#800080': 'Purple',
//     '#008000': 'Dark Green',
//     '#FFC0CB': 'Pink',
//     '#A52A2A': 'Brown',
//     '#808080': 'Gray',
//     '#C0C0C0': 'Silver',
//     '#4A90E2': 'Blue',
//     '#FF6B6B': 'Red',
//     '#4ECDC4': 'Teal',
//     '#45B7D1': 'Sky Blue',
//     '#96CEB4': 'Mint',
//     '#FFEAA7': 'Cream',
//     '#DDA0DD': 'Plum',
//     '#98D8C8': 'Seafoam',
//     '#F7DC6F': 'Gold',
//     '#BB8FCE': 'Lavender'
//   };
//   return colorMap[color] || color;
// };

// // Searchable Select Component - Original Size
// const SearchableSelect = ({ name, value, onChange, options, placeholder, required, disabled, error }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef(null);

//   const filteredOptions = options.filter(option =>
//     option.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSelect = (selectedValue) => {
//     onChange({ target: { name, value: selectedValue } });
//     setIsOpen(false);
//     setSearchTerm('');
//   };

//   const handleClear = () => {
//     onChange({ target: { name, value: '' } });
//     setSearchTerm('');
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const selectedOption = value && options.includes(value) ? value : '';

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus-within:ring-2 focus-within:ring-[#53645A] focus-within:border-transparent cursor-pointer flex items-center justify-between transition-all ${
//           disabled ? 'bg-[#c5d5be]/20 cursor-not-allowed' : 'bg-white'
//         } ${error ? 'border-red-500' : 'border-[#c5d5be]/50 hover:border-[#53645A]/30'}`}
//         style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//       >
//         <span className={`text-sm ${selectedOption ? 'text-[#263b32] font-medium' : 'text-[#53645A]/60'}`}>
//           {selectedOption || placeholder}
//         </span>
//         <div className="flex items-center gap-2">
//           {selectedOption && !disabled && (
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleClear();
//               }}
//               className="text-[#53645A]/60 hover:text-[#263b32]"
//             >
//               <FaTimes className="w-3 h-3" />
//             </button>
//           )}
//           <FaChevronDown className={`w-3 h-3 text-[#53645A]/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//         </div>
//       </div>

//       {isOpen && !disabled && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-[#c5d5be]/50 rounded-xl shadow-lg max-h-60 overflow-hidden">
//           <div className="p-2 border-b border-[#c5d5be]/30">
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#53645A]/40 w-3.5 h-3.5" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 className="w-full pl-9 pr-3 py-2 border border-[#c5d5be]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#53645A] text-sm"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 onClick={(e) => e.stopPropagation()}
//               />
//             </div>
//           </div>
//           <div className="overflow-y-auto max-h-48">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option, idx) => (
//                 <button
//                   key={idx}
//                   type="button"
//                   onClick={() => handleSelect(option)}
//                   className="w-full px-4 py-2.5 text-left hover:bg-[#f0f5ed] transition-colors text-sm text-[#263b32]"
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 >
//                   {option}
//                 </button>
//               ))
//             ) : (
//               <div className="px-4 py-3 text-sm text-[#53645A]/60 text-center" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 No results found
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       {required && !disabled && (
//         <input type="hidden" name={name} value={value} required={required} />
//       )}
//     </div>
//   );
// };

// // Payment Selector - Original Size
// const PaymentSelector = ({ onSubmit, isSubmitting, disabled }) => {
//   return (
//     <div>
//       <div className="bg-gradient-to-r from-[#53645A]/10 to-[#6b7d63]/10 rounded-xl p-4 border-2 border-[#53645A]/30">
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 bg-gradient-to-r from-[#53645A] to-[#6b7d63] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#53645A]/25">
//             <FaMoneyBillWave className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <h4 className="font-bold text-[#263b32] text-sm" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//               Cash on Delivery
//             </h4>
//             <p className="text-xs text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//               Pay when you receive your order
//             </p>
//           </div>
//         </div>
//       </div>
      
//       {disabled ? (
//         <div className="w-full mt-4 bg-[#c5d5be]/20 text-[#53645A]/60 py-3 rounded-xl font-semibold text-center cursor-not-allowed flex items-center justify-center gap-2 text-sm border border-[#53645A]/20" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//           <FaShieldAlt className="w-4 h-4 text-[#53645A]" />
//           Checkout Disabled for Admin/Moderator
//         </div>
//       ) : (
//         <button
//           type="button"
//           onClick={onSubmit}
//           disabled={isSubmitting}
//           className="w-full mt-4 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#53645A]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
//           style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Placing Order...
//             </>
//           ) : (
//             <>
//               <Zap className="w-4 h-4" />
//               Place Order
//             </>
//           )}
//         </button>
//       )}
//     </div>
//   );
// };

// // Order Success Modal
// const OrderSuccessModal = ({ isOpen, onClose, orderId, isLoggedIn, customerEmail }) => {
//   const router = useRouter();
  
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-[#53645A]/20"
//           >
//             <div className="p-6 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white text-center">
//               <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
//                 <FaCheckCircle className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-xl font-bold" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 Order Placed Successfully! 🎉
//               </h2>
//               <p className="text-sm text-white/80 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 Your order has been confirmed
//               </p>
//             </div>
            
//             <div className="p-6 text-center">
//               <p className="text-[#263b32] mb-2 font-semibold" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 Thank you for your order!
//               </p>
//               <p className="text-sm text-[#53645A]/60 mb-4" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 We'll notify you when it ships.
//               </p>
//               {orderId && (
//                 <div className="bg-[#f0f5ed] rounded-lg p-3 mb-4 border border-[#c5d5be]/40">
//                   <p className="text-xs text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     Order Reference
//                   </p>
//                   <p className="text-sm font-mono font-bold text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     {orderId.slice(-8).toUpperCase()}
//                   </p>
//                 </div>
//               )}
//               {customerEmail ? (
//                 <div className="bg-[#53645A]/10 rounded-lg p-3 mb-4 flex items-start gap-2 text-left border border-[#53645A]/20">
//                   <FaCheckCircle className="w-4 h-4 text-[#53645A] mt-0.5 flex-shrink-0" />
//                   <p className="text-xs text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     A confirmation email has been sent to <span className="font-medium text-[#53645A]">{customerEmail}</span>
//                   </p>
//                 </div>
//               ) : (
//                 <div className="bg-[#f0f5ed] rounded-lg p-3 mb-4 flex items-start gap-2 text-left border border-[#c5d5be]/40">
//                   <FaCheckCircle className="w-4 h-4 text-[#53645A] mt-0.5 flex-shrink-0" />
//                   <p className="text-xs text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     Order placed successfully! Check your phone for updates.
//                   </p>
//                 </div>
//               )}
//             </div>
            
//             <div className="p-4 border-t border-[#53645A]/20 bg-[#f0f5ed] flex flex-col sm:flex-row gap-2">
//               <button 
//                 onClick={() => {
//                   onClose();
//                   if (isLoggedIn) {
//                     router.push('/customer/orders');
//                   }
//                 }} 
//                 className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#53645A]/25 transition-colors text-sm font-medium"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 {isLoggedIn ? 'View My Orders' : 'Continue Shopping'}
//               </button>
//               <button 
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2.5 border border-[#53645A]/30 text-[#263b32] rounded-xl hover:bg-[#f0f5ed] transition-colors text-sm font-medium"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Get client device info
// const getClientDeviceInfo = () => {
//   try {
//     return {
//       screenResolution: `${window.screen.width}x${window.screen.height}`,
//       viewportSize: `${window.innerWidth}x${window.innerHeight}`,
//       colorDepth: window.screen.colorDepth,
//       pixelRatio: window.devicePixelRatio,
//       timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//       language: navigator.language,
//       referrer: document.referrer || null,
//       doNotTrack: navigator.doNotTrack,
//       vendor: navigator.vendor,
//       connection: navigator.connection ? {
//         effectiveType: navigator.connection.effectiveType,
//         downlink: navigator.connection.downlink,
//         rtt: navigator.connection.rtt
//       } : null
//     };
//   } catch (error) {
//     console.error('Error getting client device info:', error);
//     return {};
//   }
// };

// // AnimatePresence wrapper for modals
// const AnimatePresence = ({ children }) => {
//   return <>{children}</>;
// };

// // ========== CART ITEM COMPONENT - COMPACT (Only for Order Summary) ==========
// const CartItem = ({ 
//   variant, 
//   onUpdate, 
//   onRemove, 
//   isUpdating,
//   productImage,
//   isBaseProduct = false,
//   productName = ''
// }) => {
//   const getDisplayName = () => {
//     if (isBaseProduct) {
//       return productName || 'Product';
//     }
//     if (variant.subVariantName) {
//       return variant.subVariantName;
//     } else if (variant.variantName) {
//       return variant.variantName;
//     }
//     return 'Variant';
//   };

//   const getPrice = () => {
//     const isSubVariant = !!(variant.subVariantId && variant.subVariantId !== 'null' && variant.subVariantId !== '');
//     const isVariant = !!(variant.variantId && variant.variantId !== 'null' && variant.variantId !== '');
    
//     if (isSubVariant) {
//       if (variant.variantDiscountPrice > 0) {
//         return Number(variant.variantDiscountPrice);
//       }
//       if (variant.variantRegularPrice > 0) {
//         return Number(variant.variantRegularPrice);
//       }
//     }
    
//     if (isVariant && !isSubVariant) {
//       if (variant.variantDiscountPrice > 0) {
//         return Number(variant.variantDiscountPrice);
//       }
//       if (variant.variantRegularPrice > 0) {
//         return Number(variant.variantRegularPrice);
//       }
//     }
    
//     if (variant.price && Number(variant.price) > 0) {
//       return Number(variant.price);
//     }
    
//     if (variant.discountPrice && Number(variant.discountPrice) > 0) {
//       return Number(variant.discountPrice);
//     }
    
//     return Number(variant.regularPrice) || 0;
//   };

//   const getOriginalPrice = () => {
//     const currentPrice = getPrice();
//     const isSubVariant = !!(variant.subVariantId && variant.subVariantId !== 'null' && variant.subVariantId !== '');
    
//     if (isSubVariant && variant.variantRegularPrice > 0 && variant.variantDiscountPrice > 0) {
//       if (variant.variantRegularPrice !== currentPrice) {
//         return variant.variantRegularPrice;
//       }
//     }
    
//     if (!isSubVariant && variant.variantRegularPrice > 0 && variant.variantDiscountPrice > 0) {
//       if (variant.variantRegularPrice !== currentPrice) {
//         return variant.variantRegularPrice;
//       }
//     }
    
//     if (variant.regularPrice > 0 && variant.regularPrice !== currentPrice) {
//       return variant.regularPrice;
//     }
    
//     return null;
//   };

//   const getVariantImage = () => {
//     const isSubVariant = !!(variant.subVariantId && variant.subVariantId !== 'null' && variant.subVariantId !== '');
    
//     if (isSubVariant) {
//       if (variant.image && variant.image !== '' && variant.image !== 'https://via.placeholder.com/32') {
//         return variant.image;
//       }
//       if (variant.variantImage && variant.variantImage !== '' && variant.variantImage !== 'https://via.placeholder.com/32') {
//         return variant.variantImage;
//       }
//     }
    
//     if (variant.image && variant.image !== '' && variant.image !== 'https://via.placeholder.com/32') {
//       return variant.image;
//     }
//     if (variant.variantImage && variant.variantImage !== '' && variant.variantImage !== 'https://via.placeholder.com/32') {
//       return variant.variantImage;
//     }
    
//     if (productImage && productImage !== '' && productImage !== 'https://via.placeholder.com/32') {
//       return productImage;
//     }
//     if (variant.productImage && variant.productImage !== '' && variant.productImage !== 'https://via.placeholder.com/32') {
//       return variant.productImage;
//     }
    
//     return null;
//   };

//   const price = getPrice();
//   const originalPrice = getOriginalPrice();
//   const hasDiscount = originalPrice && originalPrice > price;
//   const variantImage = getVariantImage();

//   const handleQuantityChange = (newQuantity) => {
//     if (newQuantity < 1) {
//       onRemove();
//       return;
//     }
//     if (newQuantity > variant.stockQuantity) {
//       toast.error(`Only ${variant.stockQuantity} items available`);
//       return;
//     }
//     onUpdate(newQuantity);
//   };

//   return (
//     <div className={`bg-white rounded-lg border ${isBaseProduct ? 'border-[#8B9D83]/30 bg-[#f0f5ed]/30' : 'border-[#8B9D83]/15'} p-1.5 hover:border-[#8B9D83]/30 transition-all`}>
//       <div className="flex items-center gap-1.5">
//         <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#8B9D83]/20 flex-shrink-0 bg-[#f0f5ed]">
//           {variantImage ? (
//             <img
//               src={variantImage}
//               alt={getDisplayName()}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 if (productImage && productImage !== variantImage) {
//                   e.target.src = productImage;
//                 } else {
//                   e.target.src = 'https://via.placeholder.com/32?text=V';
//                 }
//               }}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-[#f0f5ed]">
//               <Package className="w-3.5 h-3.5 text-[#8B9D83]/40" />
//             </div>
//           )}
//         </div>

//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-1 flex-wrap">
//             <span className="text-[10px] font-medium text-[#263b32]">
//               {getDisplayName()}
//             </span>
//             {variant.selectedColor && (
//               <span className="inline-flex items-center gap-0.5 text-[8px] text-[#8B9D83]">
//                 <Circle 
//                   className="w-2 h-2" 
//                   style={{ color: variant.selectedColor, fill: variant.selectedColor }} 
//                 />
//                 {getColorName(variant.selectedColor)}
//               </span>
//             )}
//             {variant.isSubVariant && (
//               <span className="text-[7px] bg-blue-50 text-blue-600 px-1 py-0.5 rounded">Sub</span>
//             )}
//             {variant.isVariant && !variant.isSubVariant && !isBaseProduct && (
//               <span className="text-[7px] bg-purple-50 text-purple-600 px-1 py-0.5 rounded">Var</span>
//             )}
//             {isBaseProduct && (
//               <span className="text-[7px] bg-gray-100 text-gray-500 px-1 py-0.5 rounded">Default</span>
//             )}
//           </div>
//           <div className="flex items-center gap-1 mt-0.5">
//             <span className="text-[10px] font-semibold text-[#8B9D83]">
//               ৳{price.toFixed(2)}
//             </span>
//             {hasDiscount && (
//               <span className="text-[8px] text-gray-400 line-through">
//                 ৳{originalPrice.toFixed(2)}
//               </span>
//             )}
//             {hasDiscount && (
//               <span className="text-[7px] text-green-600 font-medium bg-green-50 px-1 py-0.5 rounded">
//                 {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center border border-[#8B9D83]/20 rounded-lg overflow-hidden bg-white flex-shrink-0">
//           <button
//             onClick={() => {
//               const newQty = Math.max(1, variant.quantity - 1);
//               handleQuantityChange(newQty);
//             }}
//             disabled={isUpdating || variant.quantity <= 1}
//             className="w-5 h-5 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
//           >
//             <Minus className="w-2 h-2" />
//           </button>
          
//           <span className="w-5 text-center text-[10px] font-medium text-[#263b32]">
//             {variant.quantity}
//           </span>
          
//           <button
//             onClick={() => {
//               const newQty = variant.quantity + 1;
//               if (newQty <= variant.stockQuantity) {
//                 handleQuantityChange(newQty);
//               } else {
//                 toast.error(`Only ${variant.stockQuantity} items available`);
//               }
//             }}
//             disabled={isUpdating || variant.quantity >= variant.stockQuantity}
//             className="w-5 h-5 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
//           >
//             <Plus className="w-2 h-2" />
//           </button>
//         </div>

//         <button
//           onClick={onRemove}
//           disabled={isUpdating}
//           className="p-0.5 text-gray-400/40 hover:text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0 disabled:opacity-50"
//           title="Remove"
//         >
//           <X className="w-2.5 h-2.5" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function CheckoutClient() {
//   const router = useRouter();
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
//   const [lastOrderId, setLastOrderId] = useState(null);
//   const [shippingCost, setShippingCost] = useState(0);
//   const [isUpdatingCart, setIsUpdatingCart] = useState(false);
//   const [navigating, setNavigating] = useState(false);
//   const isPlacingOrder = useRef(false);
//   const [expandedProducts, setExpandedProducts] = useState({});
//   const [expandedVariants, setExpandedVariants] = useState({});

//   const [shippingRates, setShippingRates] = useState({
//     insideDhaka: 70,
//     outsideDhaka: 150
//   });

//   const [locationData, setLocationData] = useState({});
//   const [divisions, setDivisions] = useState({});
//   const [divisionList, setDivisionList] = useState([]);
//   const [citiesByDivision, setCitiesByDivision] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [locationLoading, setLocationLoading] = useState(true);
//   const [productColors, setProductColors] = useState({});
//   const [updatingColor, setUpdatingColor] = useState({});
//   const [productVariants, setProductVariants] = useState({});
//   const [addingVariant, setAddingVariant] = useState({});
//   const [availableVariants, setAvailableVariants] = useState({});

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     division: '',
//     address: '',
//     city: '',
//     zone: '',
//     area: '',
//     zipCode: '',
//     country: 'Bangladesh',
//     note: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [quantityInputs, setQuantityInputs] = useState({});
//   const [pendingQuantityUpdates, setPendingQuantityUpdates] = useState({});

//   useEffect(() => {
//     const checkCartAndRedirect = async () => {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
      
//       if (!token && !sessionId) {
//         const newSessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//         localStorage.setItem('cartSessionId', newSessionId);
//         console.log('🆕 Generated new session ID on checkout:', newSessionId);
//       }
      
//       fetchCart();
//     };
    
//     checkCartAndRedirect();
//   }, []);

//   useEffect(() => {
//     if (cart?.items) {
//       const initialQuantities = {};
//       cart.items.forEach(item => {
//         initialQuantities[item._id] = item.quantity;
//       });
//       setQuantityInputs(initialQuantities);
//     }
//   }, [cart]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
    
//     if (!token && !sessionId) {
//       const newSessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//       localStorage.setItem('cartSessionId', newSessionId);
//       console.log('🆕 Generated session ID:', newSessionId);
//     }
//   }, []);

//   const getShippingCost = useCallback(async (city, zone, area) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/delivery/calculate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ city, zone, area })
//       });
//       const data = await response.json();
//       if (data.success) {
//         return data.data.charge;
//       }
//       return 0;
//     } catch (error) {
//       console.error('Error calculating shipping:', error);
//       return 0;
//     }
//   }, []);

//   // ========== FETCH PRODUCT DETAILS ==========
//   const fetchProductDetails = async (items) => {
//     if (!items || items.length === 0) return {};
    
//     const uniqueProductIds = [...new Set(items.map(item => item.productId))];
//     if (uniqueProductIds.length === 0) return {};
    
//     try {
//       const productData = {};
//       for (const productId of uniqueProductIds) {
//         const response = await fetch(`http://localhost:5000/api/products/${productId}`);
//         const data = await response.json();
//         if (data.success) {
//           const product = data.data.product;
//           productData[productId] = {
//             colors: product.colors || [],
//             variantTypes: product.variantTypes || [],
//             hasVariants: product.hasVariants || false,
//             images: product.images || []
//           };
//         }
//       }
//       return productData;
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//       return {};
//     }
//   };

//   const fetchProductColors = async (items) => {
//     const colorMap = {};
//     for (const item of items) {
//       if (!colorMap[item.productId]) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/products/${item.productId}`);
//           const data = await response.json();
//           if (data.success && data.data.product.colors) {
//             colorMap[item.productId] = data.data.product.colors;
//           }
//         } catch (error) {
//           console.error('Error fetching product colors:', error);
//         }
//       }
//     }
//     return colorMap;
//   };

//   // ========== FETCH CART ==========
//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
      
//       const response = await fetch('http://localhost:5000/api/cart', { headers });
//       const data = await response.json();
      
//       if (data.success && data.data.items?.length > 0) {
//         setCart(data.data);
//         const colors = await fetchProductColors(data.data.items || []);
//         setProductColors(colors);
//         const variants = await fetchProductDetails(data.data.items || []);
//         setProductVariants(variants);
//         calculateAvailableVariants(data.data.items, variants);
//       } else {
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
//       }
//     } catch (error) {
//       console.error('Fetch cart error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ========== CALCULATE AVAILABLE VARIANTS ==========
//   const calculateAvailableVariants = (items, variants) => {
//     const available = {};
//     const allVariants = {};
    
//     items.forEach(item => {
//       const productId = item.productId.toString();
//       const productDetail = variants[productId];
      
//       if (productDetail?.hasVariants && productDetail.variantTypes) {
//         const cartVariantIds = items
//           .filter(i => i.productId.toString() === productId)
//           .map(i => i.variantId)
//           .filter(id => id);
        
//         const avail = [];
//         productDetail.variantTypes.forEach(vt => {
//           vt.variants.forEach(v => {
//             if (!cartVariantIds.includes(v.id)) {
//               avail.push({ ...v, type: vt.type });
//             }
//           });
//         });
//         available[productId] = avail;
//       }
//     });
    
//     setAvailableVariants(available);
//   };

//   // ========== ADD NEW VARIANT TO CART ==========
//   const addVariantToCart = async (productId, variant) => {
//     const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
//     const key = `${productId}_${variant.id}`;
//     setAddingVariant(prev => ({ ...prev, [key]: true }));
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const variantImage = variant.image || variant.images?.[0] || null;
//       const variantRegularPrice = variant.regularPrice || 0;
//       const variantDiscountPrice = variant.discountPrice || 0;
      
//       if (hasSubVariants && variant.subVariants.length > 0) {
//         const firstSubVariant = variant.subVariants[0];
        
//         const response = await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({
//             productId: productId,
//             quantity: 1,
//             variantId: variant.id,
//             variantName: variant.name,
//             variantType: variant.type,
//             subVariantId: firstSubVariant.id,
//             subVariantName: firstSubVariant.name,
//             selectedColor: firstSubVariant.color || variant.color || null,
//             variantRegularPrice: firstSubVariant.regularPrice || variantRegularPrice,
//             variantDiscountPrice: firstSubVariant.discountPrice || variantDiscountPrice,
//             image: firstSubVariant.images?.[0] || variantImage,
//             variantImage: firstSubVariant.images?.[0] || variantImage
//           })
//         });
        
//         const data = await response.json();
        
//         if (data.success) {
//           if (data.sessionId && !token) {
//             localStorage.setItem('cartSessionId', data.sessionId);
//           }
//           await fetchCart();
//           window.dispatchEvent(new Event('cart-update'));
//           toast.success(`${firstSubVariant.name} (${variant.name}) added to cart`);
//         } else {
//           toast.error(data.error || 'Failed to add variant');
//         }
//       } else {
//         const response = await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({
//             productId: productId,
//             quantity: 1,
//             variantId: variant.id,
//             variantName: variant.name,
//             variantType: variant.type,
//             selectedColor: variant.color || null,
//             variantRegularPrice: variantRegularPrice,
//             variantDiscountPrice: variantDiscountPrice,
//             image: variantImage,
//             variantImage: variantImage
//           })
//         });
        
//         const data = await response.json();
        
//         if (data.success) {
//           if (data.sessionId && !token) {
//             localStorage.setItem('cartSessionId', data.sessionId);
//           }
//           await fetchCart();
//           window.dispatchEvent(new Event('cart-update'));
//           toast.success(`${variant.name} added to cart`);
//         } else {
//           toast.error(data.error || 'Failed to add variant');
//         }
//       }
//     } catch (error) {
//       console.error('Add variant error:', error);
//       toast.error('Failed to add variant');
//     } finally {
//       setAddingVariant(prev => ({ ...prev, [key]: false }));
//     }
//   };

//   // ========== ADD SPECIFIC SUB-VARIANT TO CART ==========
//   const addSpecificSubVariantToCart = async (productId, variantId, subVariant, parentVariantName, parentVariantType) => {
//     const key = `${productId}_${variantId}_${subVariant.id}`;
//     setAddingVariant(prev => ({ ...prev, [key]: true }));
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const subVariantImage = subVariant.image || subVariant.images?.[0] || null;
//       const subVariantRegularPrice = subVariant.regularPrice || 0;
//       const subVariantDiscountPrice = subVariant.discountPrice || 0;
      
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           productId: productId,
//           quantity: 1,
//           variantId: variantId,
//           variantName: parentVariantName,
//           variantType: parentVariantType,
//           subVariantId: subVariant.id,
//           subVariantName: subVariant.name,
//           selectedColor: subVariant.color || null,
//           variantRegularPrice: subVariantRegularPrice,
//           variantDiscountPrice: subVariantDiscountPrice,
//           image: subVariantImage,
//           variantImage: subVariantImage
//         })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         await fetchCart();
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success(`${subVariant.name} (${parentVariantName}) added to cart`);
//       } else {
//         toast.error(data.error || 'Failed to add sub-variant');
//       }
//     } catch (error) {
//       console.error('Add sub-variant error:', error);
//       toast.error('Failed to add sub-variant');
//     } finally {
//       setAddingVariant(prev => ({ ...prev, [key]: false }));
//     }
//   };

//   // ========== UPDATE COLOR ==========
//   const updateColor = async (itemId, newColor) => {
//     setUpdatingColor(prev => ({ ...prev, [itemId]: true }));
    
//     const previousCart = { ...cart };
    
//     setCart(prevCart => {
//       const updatedItems = prevCart.items.map(item => {
//         if (item._id === itemId) {
//           return { ...item, selectedColor: newColor };
//         }
//         return item;
//       });
//       return { ...prevCart, items: updatedItems };
//     });
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
//         method: 'PUT',
//         headers,
//         body: JSON.stringify({ selectedColor: newColor })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Color updated!');
//       } else {
//         setCart(previousCart);
//         toast.error(data.error || 'Failed to update color');
//       }
//     } catch (error) {
//       console.error('Update color error:', error);
//       setCart(previousCart);
//       toast.error('Failed to update color');
//     } finally {
//       setUpdatingColor(prev => ({ ...prev, [itemId]: false }));
//     }
//   };

//   // ========== ADD NEW COLOR ==========
//   const addNewColorToCart = async (productId, color) => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const nullColorItem = cart.items.find(
//         item => item.productId === productId && 
//         (!item.selectedColor || item.selectedColor === '' || item.selectedColor === null || item.selectedColor === 'null')
//       );
      
//       if (nullColorItem) {
//         await fetch(`http://localhost:5000/api/cart/${nullColorItem._id}`, {
//           method: 'DELETE',
//           headers
//         });
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ 
//           productId: productId, 
//           quantity: 1,
//           selectedColor: color 
//         })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         await fetchCart();
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success(`Added ${color} to cart!`);
//       } else {
//         toast.error(data.error || 'Failed to add color');
//       }
//     } catch (error) {
//       console.error('Add color error:', error);
//       toast.error('Network error');
//     }
//   };

//   // ========== REMOVE ITEM ==========
//   const removeCartItem = async (itemId) => {
//     setIsUpdatingCart(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
//         method: 'DELETE',
//         headers
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         await fetchCart();
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Item removed');
//       } else {
//         toast.error(data.error || 'Failed to remove item');
//       }
//     } catch (error) {
//       console.error('Remove item error:', error);
//       toast.error('Failed to remove item');
//     } finally {
//       setIsUpdatingCart(false);
//     }
//   };

//   // ========== UPDATE QUANTITY ==========
//   const updateCartQuantity = async (itemId, newQuantity) => {
//     if (isUpdatingCart) return;
    
//     if (newQuantity < 1) {
//       removeCartItem(itemId);
//       return;
//     }
    
//     setIsUpdatingCart(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
//         method: 'PUT',
//         headers,
//         body: JSON.stringify({ quantity: newQuantity })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         await fetchCart();
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Quantity updated');
//       } else {
//         toast.error(data.error || 'Failed to update quantity');
//       }
//     } catch (error) {
//       console.error('Update quantity error:', error);
//       toast.error('Failed to update quantity');
//     } finally {
//       setIsUpdatingCart(false);
//     }
//   };

//   // ========== UPDATE QUANTITY WITH DEBOUNCE ==========
//   const updateQuantityWithDebounce = useCallback((itemId, newQuantity) => {
//     if (pendingQuantityUpdates[itemId]) {
//       clearTimeout(pendingQuantityUpdates[itemId]);
//     }

//     setQuantityInputs(prev => ({
//       ...prev,
//       [itemId]: newQuantity
//     }));

//     const timeoutId = setTimeout(() => {
//       updateCartQuantity(itemId, newQuantity);
//       setPendingQuantityUpdates(prev => {
//         const newState = { ...prev };
//         delete newState[itemId];
//         return newState;
//       });
//     }, 500);

//     setPendingQuantityUpdates(prev => ({
//       ...prev,
//       [itemId]: timeoutId
//     }));
//   }, [pendingQuantityUpdates]);

//   // Fetch locations
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch('/api/locations');
//         const data = await response.json();
//         setLocationData(data.locationData || {});
        
//         const divisions = data.divisions || {};
//         const filteredDivisions = {};
//         const divisionKeys = [];
        
//         Object.keys(divisions).forEach(key => {
//           if (key !== 'Other') {
//             filteredDivisions[key] = divisions[key];
//             divisionKeys.push(key);
//           }
//         });
        
//         setDivisions(filteredDivisions);
//         setDivisionList(divisionKeys.sort());
        
//         const cityList = data.locationData ? Object.keys(data.locationData) : [];
//         setCities(cityList);
//         setLocationLoading(false);
//       } catch (error) {
//         console.error('Failed to load location data:', error);
//         setLocationLoading(false);
//       }
//     };
//     fetchLocations();
//   }, []);

//   // Update cities when division changes
//   useEffect(() => {
//     if (formData.division && divisions[formData.division]) {
//       setCitiesByDivision(divisions[formData.division]);
//       setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
//       setZones([]);
//       setAreas([]);
//     } else {
//       setCitiesByDivision([]);
//     }
//   }, [formData.division, divisions]);

//   // Update zones when city changes with shipping calculation
//   useEffect(() => {
//     const selectedCity = formData.city;
//     const selectedZone = formData.zone;
//     const selectedArea = formData.area;
    
//     if (selectedCity && locationData[selectedCity]) {
//       const availableZones = Object.keys(locationData[selectedCity].zones || {});
//       setZones(availableZones);
//       setFormData(prev => ({ ...prev, zone: '', area: '' }));
//       setAreas([]);
      
//       const calculateShipping = async () => {
//         const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
//         setShippingCost(charge);
//       };
//       calculateShipping();
//     } else {
//       setZones([]);
//       setAreas([]);
//       setShippingCost(0);
//     }
//   }, [formData.city, locationData, getShippingCost]);

//   // Update areas when zone changes with shipping recalculation
//   useEffect(() => {
//     const selectedCity = formData.city;
//     const selectedZone = formData.zone;
//     const selectedArea = formData.area;
    
//     if (selectedCity && selectedZone && locationData[selectedCity]) {
//       const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
//       setAreas(availableAreas);
//       setFormData(prev => ({ ...prev, area: '' }));
      
//       const calculateShipping = async () => {
//         const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
//         setShippingCost(charge);
//       };
//       calculateShipping();
//     } else {
//       setAreas([]);
//     }
//   }, [formData.zone, formData.city, locationData, getShippingCost]);

//   // Recalculate shipping when area changes
//   useEffect(() => {
//     const selectedCity = formData.city;
//     const selectedZone = formData.zone;
//     const selectedArea = formData.area;
    
//     if (selectedCity && selectedZone && selectedArea && locationData[selectedCity]) {
//       const calculateShipping = async () => {
//         const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
//         setShippingCost(charge);
//       };
//       calculateShipping();
//     }
//   }, [formData.area, formData.city, formData.zone, locationData, getShippingCost]);

//   // Fetch cart, user, shipping rates on mount
//   useEffect(() => {
//     fetchCart();
//     fetchUser();
//     fetchShippingRates();
//   }, []);

//   // Autofill user data when user is loaded
//   useEffect(() => {
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         fullName: user.contactPerson || user.companyName || user.name || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         division: user.division || '',
//         address: user.address || '',
//         city: user.city || '',
//         zone: user.zone || '',
//         area: user.area || '',
//         zipCode: user.zipCode || '',
//         country: user.country || 'Bangladesh'
//       }));
      
//       if (user.division) {
//         setFormData(prev => ({ ...prev, division: user.division }));
//       }
      
//       if (user.city) {
//         setFormData(prev => ({ ...prev, city: user.city }));
//       }
      
//       if (user.zone) setFormData(prev => ({ ...prev, zone: user.zone }));
//       if (user.area) setFormData(prev => ({ ...prev, area: user.area }));
//     }
//   }, [user]);

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const response = await fetch('http://localhost:5000/api/auth/me', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const data = await response.json();
//         if (data.success) setUser(data.user);
//       }
//     } catch (error) {
//       console.error('Fetch user error:', error);
//     }
//   };

//   const fetchShippingRates = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/delivery/settings');
//       const data = await response.json();
//       if (data.success) {
//         setShippingRates({
//           insideDhaka: data.data.insideDhaka,
//           outsideDhaka: data.data.outsideDhaka
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching shipping rates:', error);
//     }
//   };

//   // Handle cart update events
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (!isPlacingOrder.current) {
//         fetchCart();
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, []);

//   // Cleanup timeouts on unmount
//   useEffect(() => {
//     return () => {
//       Object.values(pendingQuantityUpdates).forEach(timeoutId => {
//         clearTimeout(timeoutId);
//       });
//     };
//   }, [pendingQuantityUpdates]);

//   const validateBangladeshPhone = (phone) => {
//     const cleaned = phone.replace(/\D/g, '');
//     const bdPhoneRegex = /^(?:01|8801)\d{9}$/;
    
//     if (!bdPhoneRegex.test(cleaned)) {
//       return { valid: false, message: 'Please enter a valid Bangladeshi phone number (01XXXXXXXXX)' };
//     }
    
//     const prefix = cleaned.slice(0, 3);
//     const validPrefixes = ['013', '014', '015', '016', '017', '018', '019'];
    
//     if (!validPrefixes.includes(prefix)) {
//       return { valid: false, message: 'Please enter a valid Bangladeshi mobile number' };
//     }
    
//     return { valid: true, formatted: cleaned };
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    
//     if (name === 'division') {
//       setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
//       setZones([]);
//       setAreas([]);
//     }
    
//     if (name === 'city') {
//       setFormData(prev => ({ ...prev, zone: '', area: '' }));
//       setAreas([]);
//     }
    
//     if (name === 'zone') {
//       setFormData(prev => ({ ...prev, area: '' }));
//     }
    
//     if (name === 'phone' && value) {
//       const validation = validateBangladeshPhone(value);
//       if (!validation.valid) {
//         setErrors(prev => ({ ...prev, phone: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, phone: '' }));
//       }
//     }
//   };

//   // ========== COLOR VALIDATION ==========
//   const validateCartColors = () => {
//     if (!cart?.items?.length) {
//       toast.error('Your cart is empty');
//       return false;
//     }
    
//     const itemsWithoutColor = cart.items.filter(item => {
//       const availableColors = productColors[item.productId] || [];
//       const hasAvailableColors = availableColors.length > 0;
//       if (hasAvailableColors && (!item.selectedColor || item.selectedColor === '' || item.selectedColor === 'null')) {
//         return true;
//       }
//       return false;
//     });
    
//     if (itemsWithoutColor.length > 0) {
//       toast.error(
//         <div className="space-y-1">
//           <p className="font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Please select colors for:</p>
//           <ul className="text-xs space-y-0.5 list-disc list-inside text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//             {itemsWithoutColor.slice(0, 3).map((item, i) => (
//               <li key={i}>{item.productName}</li>
//             ))}
//             {itemsWithoutColor.length > 3 && (
//               <li>And {itemsWithoutColor.length - 3} more item(s)...</li>
//             )}
//           </ul>
//         </div>,
//         { duration: 5000 }
//       );
//       return false;
//     }
    
//     return true;
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.fullName?.trim()) {
//       errors.fullName = 'Full name is required';
//     }
    
//     if (formData.email?.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = 'Email is invalid';
//     }
    
//     if (!formData.phone?.trim()) {
//       errors.phone = 'Phone number is required';
//     } else {
//       const validation = validateBangladeshPhone(formData.phone);
//       if (!validation.valid) {
//         errors.phone = validation.message;
//       }
//     }
    
//     if (!formData.division?.trim()) {
//       errors.division = 'Please select a division';
//     }
    
//     if (!formData.address?.trim()) {
//       errors.address = 'Address is required';
//     }
    
//     if (!formData.city?.trim()) {
//       errors.city = 'Please select a district/city';
//     }
    
//     if (!formData.zone?.trim()) {
//       errors.zone = 'Please select an upazila/thana';
//     }
    
//     setErrors(errors);
//     return errors;
//   };

//   const calculateSubtotal = () => cart?.subtotal || 0;
//   const calculateTotal = () => calculateSubtotal() + shippingCost;
//   const isLoggedIn = !!user;
//   const isAdminOrModerator = user && (user.role === 'admin' || user.role === 'moderator');

//   const handleCODOrder = async () => {
//     if (isAdminOrModerator) {
//       toast.error('Admins and Moderators cannot place orders');
//       return;
//     }
    
//     if (navigating) return;
//     setNavigating(true);
//     setSubmitting(true);
//     isPlacingOrder.current = true;
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
      
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       console.log('📤 Sending order with sessionId:', sessionId || 'none');
      
//       const clientDeviceInfo = getClientDeviceInfo();
      
//       const groupedItems = {};
      
//       cart.items.forEach(item => {
//         const productId = item.productId || item._id;
//         const groupKey = item.variantId ? `${productId}_${item.variantId}` : productId;
        
//         if (!groupedItems[groupKey]) {
//           groupedItems[groupKey] = {
//             productId: productId,
//             productName: item.productName,
//             productSlug: item.productSlug || '',
//             image: item.image || '',
//             regularPrice: item.regularPrice,
//             discountPrice: item.discountPrice || 0,
//             buyingPrice: item.buyingPrice || 0, 
//             costPerItem: item.costPerItem || 0,
//             unit: item.unit || 'pcs',
//             stockQuantity: item.stockQuantity || 0,
//             variantId: item.variantId || null,
//             variantName: item.variantName || null,
//             variantType: item.variantType || null,
//             subVariantId: item.subVariantId || null,
//             subVariantName: item.subVariantName || null,
//             variantRegularPrice: item.variantRegularPrice || 0,
//             variantDiscountPrice: item.variantDiscountPrice || 0,
//             colors: [],
//             quantity: 0,
//             selectedColor: null
//           };
//         }
        
//         const hasValidColor = item.selectedColor && 
//                              item.selectedColor !== '' && 
//                              item.selectedColor !== null && 
//                              item.selectedColor !== 'null';
        
//         if (hasValidColor) {
//           const existingColor = groupedItems[groupKey].colors.find(c => c.color === item.selectedColor);
//           if (existingColor) {
//             existingColor.quantity += item.quantity;
//           } else {
//             groupedItems[groupKey].colors.push({
//               color: item.selectedColor,
//               quantity: item.quantity,
//               price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice
//             });
//           }
//           groupedItems[groupKey].quantity += item.quantity;
//         } else {
//           groupedItems[groupKey].quantity = item.quantity;
//         }
//       });
      
//       const groupedItemsArray = Object.values(groupedItems);
      
//       const validItems = groupedItemsArray.filter(item => {
//         const hasColors = item.colors && item.colors.length > 0;
//         const hasQuantity = item.quantity > 0;
//         return hasColors || hasQuantity;
//       });
      
//       if (validItems.length === 0) {
//         toast.error('No valid items in cart');
//         setNavigating(false);
//         return;
//       }
      
//       const orderData = {
//         items: validItems,
//         subtotal: calculateSubtotal(),
//         shippingCost,
//         discount: 0,
//         total: calculateTotal(),
//         paymentMethod: 'cod',
//         customerInfo: {
//           fullName: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           division: formData.division,
//           address: formData.address,
//           city: formData.city,
//           zone: formData.zone,
//           area: formData.area || '',
//           zipCode: formData.zipCode || '',
//           country: formData.country || 'Bangladesh',
//           note: formData.note || ''
//         },
//         couponCode: null,
//         couponDiscount: 0,
//         freeShipping: false,
//         clientDeviceInfo: clientDeviceInfo,
//         sessionId: sessionId
//       };
      
//       console.log('📦 Order Data:', JSON.stringify(orderData, null, 2));
      
//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(orderData)
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         const orderId = data.orderId || data.data?._id || data.data?.id;
        
//         try {
//           const deleteHeaders = { 'Content-Type': 'application/json' };
//           if (token) {
//             deleteHeaders['Authorization'] = `Bearer ${token}`;
//           } else if (sessionId) {
//             deleteHeaders['x-session-id'] = sessionId;
//           }
          
//           await fetch('http://localhost:5000/api/incomplete-orders/delete-on-place', {
//             method: 'POST',
//             headers: deleteHeaders,
//             body: JSON.stringify({ 
//               sessionId: sessionId,
//               orderId: orderId 
//             })
//           });
//           console.log('🗑️ Incomplete order deleted after successful placement');
//         } catch (deleteError) {
//           console.error('Error deleting incomplete order:', deleteError);
//         }
        
//         localStorage.removeItem('cartSessionId');
        
//         await fetch('http://localhost:5000/api/cart', { 
//           method: 'DELETE', 
//           headers 
//         });
        
//         window.dispatchEvent(new Event('cart-update'));
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
        
//         if (isLoggedIn) {
//           toast.success('Order placed successfully!');
//           window.location.href = '/customer/orders';
//         } else {
//           const sessionIdFromResponse = data.sessionId || sessionId;
//           window.location.href = `/thank-you?orderId=${orderId}&sessionId=${sessionIdFromResponse}`;
//         }
//       } else {
//         toast.error(data.error || 'Failed to place order');
//         setNavigating(false);
//       }
//     } catch (error) {
//       console.error('COD order error:', error);
//       toast.error('Network error. Please try again.');
//       setNavigating(false);
//     } finally {
//       setSubmitting(false);
//       isPlacingOrder.current = false;
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (isAdminOrModerator) {
//       toast.error('Admins and Moderators cannot place orders');
//       return;
//     }
    
//     if (!validateCartColors()) {
//       return;
//     }
    
//     const validationErrors = validateForm();
    
//     if (Object.keys(validationErrors).length > 0) {
//       const errorMessages = Object.values(validationErrors);
      
//       toast.error(
//         <div className="space-y-1">
//           <p className="font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Please fix the following errors:</p>
//           <ul className="text-xs space-y-0.5 list-disc list-inside text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//             {errorMessages.slice(0, 3).map((msg, i) => (
//               <li key={i}>{msg}</li>
//             ))}
//             {errorMessages.length > 3 && (
//               <li>And {errorMessages.length - 3} more error(s)...</li>
//             )}
//           </ul>
//         </div>,
//         { duration: 5000 }
//       );
      
//       const firstErrorField = document.querySelector('.border-red-500');
//       if (firstErrorField) {
//         firstErrorField.scrollIntoView({ 
//           behavior: 'smooth', 
//           block: 'center' 
//         });
//         const input = firstErrorField.querySelector('input, textarea, select');
//         if (input) {
//           setTimeout(() => input.focus(), 500);
//         }
//       }
      
//       return;
//     }
    
//     if (!cart?.items?.length) {
//       toast.error('Your cart is empty');
//       return;
//     }
    
//     await handleCODOrder();
//   };

//   // ========== SAVE INCOMPLETE ORDER ==========
//   const saveIncompleteOrder = useCallback(async () => {
//     try {
//       if (!cart?.items?.length) return;

//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }

//       const groupedItems = cart.items.map(item => ({
//         productId: item.productId,
//         productName: item.productName,
//         productSlug: item.productSlug || '',
//         image: item.image || '',
//         regularPrice: item.regularPrice,
//         discountPrice: item.discountPrice || 0,
//         quantity: item.quantity,
//         unit: item.unit || 'pcs',
//         selectedColor: item.selectedColor || null,
//         variantId: item.variantId || null,
//         variantName: item.variantName || null,
//         variantType: item.variantType || null,
//         subVariantId: item.subVariantId || null,
//         subVariantName: item.subVariantName || null,
//         variantRegularPrice: item.variantRegularPrice || 0,
//         variantDiscountPrice: item.variantDiscountPrice || 0,
//         colors: []
//       }));

//       const clientDeviceInfo = getClientDeviceInfo();

//       const response = await fetch('http://localhost:5000/api/incomplete-orders/save', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           customerInfo: formData,
//           items: groupedItems,
//           subtotal: calculateSubtotal(),
//           shippingCost: shippingCost,
//           discount: 0,
//           total: calculateTotal(),
//           paymentMethod: 'cod',
//           checkoutStep: 'information',
//           clientDeviceInfo,
//           sessionId: sessionId
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         console.log('✅ Incomplete order saved');
//       }
//     } catch (error) {
//       console.error('Save incomplete order error:', error);
//     }
//   }, [cart, formData, shippingCost]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (cart?.items?.length > 0) {
//         saveIncompleteOrder();
//       }
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [formData, cart, saveIncompleteOrder]);

//   // ========== VARIANT HELPERS ==========
//   const getAvailableVariants = (productId) => {
//     return availableVariants[productId] || [];
//   };

//   const getAvailableSubVariants = (productId, variantId) => {
//     if (!productVariants[productId]?.variantTypes) return [];
    
//     let targetVariant = null;
//     productVariants[productId].variantTypes.forEach(vt => {
//       vt.variants.forEach(v => {
//         if (v.id === variantId) {
//           targetVariant = v;
//         }
//       });
//     });
    
//     if (!targetVariant || !targetVariant.subVariants) return [];
    
//     const cartSubVariantIds = cart?.items
//       .filter(item => 
//         item.productId.toString() === productId && 
//         item.variantId === variantId &&
//         item.subVariantId
//       )
//       .map(item => item.subVariantId)
//       .filter(id => id && id !== 'null' && id !== '') || [];
    
//     return targetVariant.subVariants.filter(sv => !cartSubVariantIds.includes(sv.id));
//   };

//   const toggleVariantExpand = (variantId) => {
//     setExpandedVariants(prev => ({ ...prev, [variantId]: !prev[variantId] }));
//   };

//   if (loading || locationLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#f8f7f2] pt-20">
//           <div className="container mx-auto px-4 max-w-6xl">
//             <div className="flex items-center justify-center py-20">
//               <Loader2 className="w-8 h-8 text-[#53645A] animate-spin" />
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!cart?.items?.length) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#f8f7f2] py-16">
//           <div className="container mx-auto px-4 max-w-3xl text-center">
//             <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-12">
//               <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 sm:mb-4">
//                 <DotLottieReact
//                   src="/animations/shopping-cart.lottie"
//                   loop
//                   autoplay
//                   className="w-full h-full"
//                 />
//               </div>
//               <h2 className="text-2xl font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                 Your cart is empty
//               </h2>
//               <p className="text-[#53645A]/60 mb-6" style={{ fontFamily: FONT_FAMILY }}>
//                 Add some products to your cart and come back to checkout.
//               </p>
//               <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#53645A]/25 transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                 <FaArrowLeft className="w-4 h-4" />
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const subtotal = calculateSubtotal();
//   const total = calculateTotal();

//   const hasColorRequiredItems = cart.items.some(item => {
//     const availableColors = productColors[item.productId] || [];
//     return availableColors.length > 0 && (!item.selectedColor || item.selectedColor === '' || item.selectedColor === 'null');
//   });

//   // ========== GROUP ITEMS FOR DISPLAY ==========
//   const groupItemsByProduct = (items) => {
//     const grouped = {};
    
//     items.forEach(item => {
//       const productId = item.productId.toString();
      
//       if (!grouped[productId]) {
//         grouped[productId] = {
//           productId: item.productId,
//           productName: item.productName,
//           productSlug: item.productSlug,
//           image: item.image,
//           regularPrice: item.regularPrice,
//           discountPrice: item.discountPrice,
//           unit: item.unit || 'pcs',
//           hasVariants: item.hasVariants || false,
//           variants: [],
//           totalQuantity: 0,
//           subtotal: 0,
//           variantTypes: item.variantTypes || []
//         };
//       }
      
//       const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
//       const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');
      
//       let price = 0;
      
//       if (isSubVariant) {
//         if (item.variantDiscountPrice > 0) {
//           price = Number(item.variantDiscountPrice);
//         } else if (item.variantRegularPrice > 0) {
//           price = Number(item.variantRegularPrice);
//         }
//       } else if (isVariant) {
//         if (item.variantDiscountPrice > 0) {
//           price = Number(item.variantDiscountPrice);
//         } else if (item.variantRegularPrice > 0) {
//           price = Number(item.variantRegularPrice);
//         }
//       }
      
//       if (price === 0 && item.quantity > 0) {
//         if (item.discountPrice > 0) {
//           price = Number(item.discountPrice);
//         } else {
//           price = Number(item.regularPrice) || 0;
//         }
//       }
      
//       let imageToUse = null;
      
//       if (isSubVariant) {
//         if (item.variantImage && item.variantImage !== '' && item.variantImage !== 'https://via.placeholder.com/32') {
//           imageToUse = item.variantImage;
//         } else if (item.image && item.image !== '' && item.image !== 'https://via.placeholder.com/32') {
//           imageToUse = item.image;
//         }
//       } else if (isVariant) {
//         if (item.variantImage && item.variantImage !== '' && item.variantImage !== 'https://via.placeholder.com/32') {
//           imageToUse = item.variantImage;
//         } else if (item.image && item.image !== '' && item.image !== 'https://via.placeholder.com/32') {
//           imageToUse = item.image;
//         }
//       }
      
//       if (!imageToUse) {
//         imageToUse = item.image || null;
//       }
      
//       const variantInfo = {
//         itemId: item._id,
//         quantity: item.quantity,
//         selectedColor: item.selectedColor || null,
//         variantId: item.variantId || null,
//         variantName: item.variantName || null,
//         variantType: item.variantType || null,
//         subVariantId: item.subVariantId || null,
//         subVariantName: item.subVariantName || null,
//         variantRegularPrice: Number(item.variantRegularPrice) || 0,
//         variantDiscountPrice: Number(item.variantDiscountPrice) || 0,
//         stockQuantity: item.stockQuantity || 0,
//         image: imageToUse,
//         price: price,
//         productImage: item.image,
//         regularPrice: item.regularPrice,
//         discountPrice: item.discountPrice,
//         hasVariants: item.hasVariants || false,
//         isSubVariant: isSubVariant,
//         isVariant: isVariant,
//         isBaseProduct: !isVariant && !isSubVariant
//       };
      
//       grouped[productId].variants.push(variantInfo);
//       grouped[productId].totalQuantity += item.quantity;
//       grouped[productId].subtotal += price * item.quantity;
//     });
    
//     return Object.values(grouped);
//   };

//   const groupedProducts = groupItemsByProduct(cart.items);
  

//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-[#f8f7f2] py-8">
//         <div className="container mx-auto px-4 max-w-6xl">
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-[#53645A] to-[#6b7d63] rounded-xl flex items-center justify-center shadow-lg shadow-[#53645A]/25">
//                 <Zap className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//                   Checkout
//                 </h1>
//                 <p className="text-sm text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY }}>
//                   Complete your order securely
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Color Selection Warning */}
//           {hasColorRequiredItems && (
//             <div className="mb-6 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-xl">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm text-orange-700 font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     Color Selection Required
//                   </p>
//                   <p className="text-xs text-orange-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     Please select colors for all items before proceeding to checkout.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {isAdminOrModerator && (
//             <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl">
//               <div className="flex items-center gap-3">
//                 <FaShieldAlt className="w-5 h-5 text-yellow-600" />
//                 <div>
//                   <p className="text-sm text-yellow-700 font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     Checkout Disabled for Admin/Moderator Accounts
//                   </p>
//                   <p className="text-xs text-yellow-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     You are logged in as {user?.role}. Please switch to a customer account to place orders.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column - Forms (Original Size) */}
//             <div className="lg:col-span-2 space-y-5">
//               {/* Personal Information */}
//               <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-6">
//                 <div className="flex items-center justify-between mb-5">
//                   <h2 className="text-lg font-medium text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <FaUser className="w-5 h-5 text-[#53645A]" />
//                     Personal Information
//                   </h2>
//                   {isLoggedIn && (
//                     <span className="text-xs bg-[#53645A]/10 text-[#53645A] px-3 py-1 rounded-full flex items-center gap-1 font-medium border border-[#53645A]/20" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       <FaCheckCircle className="w-3 h-3" />
//                       Verified
//                     </span>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Full Name <span className="text-[#53645A]">*</span>
//                     </label>
//                     <div className="relative">
//                       <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#53645A]/40 w-4 h-4" />
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm ${
//                           isLoggedIn ? 'bg-[#f0f5ed] text-[#53645A]/60' : 'bg-white'
//                         } ${errors.fullName ? 'border-red-500' : 'border-[#c5d5be]/50'}`}
//                         placeholder="Enter your full name"
//                         disabled={isLoggedIn}
//                         style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                       />
//                     </div>
//                     {errors.fullName && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.fullName}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Email <span className="text-[#53645A]/60 text-xs">(Optional)</span>
//                     </label>
//                     <div className="relative">
//                       <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#53645A]/40 w-4 h-4" />
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm ${
//                           isLoggedIn ? 'bg-[#f0f5ed] text-[#53645A]/60' : 'bg-white'
//                         } ${errors.email ? 'border-red-500' : 'border-[#c5d5be]/50'}`}
//                         placeholder="your@email.com (optional)"
//                         disabled={isLoggedIn}
//                         style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                       />
//                     </div>
//                     {errors.email && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.email}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Phone Number <span className="text-[#53645A]">*</span>
//                     </label>
//                     <div className="relative">
//                       <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#53645A]/40 w-4 h-4" />
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm ${
//                           errors.phone ? 'border-red-500' : 'border-[#c5d5be]/50'
//                         }`}
//                         placeholder="01XXXXXXXXX"
//                         style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                       />
//                     </div>
//                     {errors.phone && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.phone}</p>}
//                     <p className="text-[10px] text-[#53645A]/60 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Enter a valid Bangladeshi mobile number</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Delivery Address */}
//               <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-6">
//                 <h2 className="text-lg font-medium text-[#263b32] flex items-center gap-2 mb-5" style={{ fontFamily: FONT_FAMILY }}>
//                   <FaMapMarkerAlt className="w-5 h-5 text-[#53645A]" />
//                   Delivery Address
//                 </h2>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Full Address <span className="text-[#53645A]">*</span>
//                     </label>
//                     <div className="relative">
//                       <FaHome className="absolute left-3 top-3 text-[#53645A]/40 w-4 h-4" />
//                       <textarea
//                         name="address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         rows="2"
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition bg-white text-sm resize-none ${
//                           errors.address ? 'border-red-500' : 'border-[#c5d5be]/50'
//                         }`}
//                         placeholder="House #, Road #, Area, City, Zip Code"
//                         style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                       />
//                     </div>
//                     {isLoggedIn && user?.address && (
//                       <p className="text-xs text-[#53645A] mt-1 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         <FaCheckCircle className="w-3 h-3" />
//                         Your saved address has been pre-filled
//                       </p>
//                     )}
//                     {errors.address && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.address}</p>}
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         Division <span className="text-[#53645A]">*</span>
//                       </label>
//                       <SearchableSelect
//                         name="division"
//                         value={formData.division}
//                         onChange={handleInputChange}
//                         options={divisionList}
//                         placeholder="Select Division"
//                         required
//                         disabled={false}
//                         error={errors.division}
//                       />
//                       {errors.division && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.division}</p>}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         District/City <span className="text-[#53645A]">*</span>
//                       </label>
//                       <SearchableSelect
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         options={citiesByDivision}
//                         placeholder={formData.division ? "Select District" : "Select Division First"}
//                         required
//                         disabled={!formData.division}
//                         error={errors.city}
//                       />
//                       {errors.city && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.city}</p>}
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         Upazila/Thana <span className="text-[#53645A]">*</span>
//                       </label>
//                       <SearchableSelect
//                         name="zone"
//                         value={formData.zone}
//                         onChange={handleInputChange}
//                         options={zones}
//                         placeholder={formData.city ? "Select Upazila/Thana" : "Select District First"}
//                         required
//                         disabled={!formData.city}
//                         error={errors.zone}
//                       />
//                       {errors.zone && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.zone}</p>}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         Union/Area
//                       </label>
//                       <SearchableSelect
//                         name="area"
//                         value={formData.area}
//                         onChange={handleInputChange}
//                         options={areas}
//                         placeholder={formData.zone ? "Select Union/Area" : "Select Upazila First"}
//                         disabled={!formData.zone}
//                         error={errors.area}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Notes */}
//               <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-6">
//                 <h2 className="text-lg font-medium text-[#263b32] flex items-center gap-2 mb-4" style={{ fontFamily: FONT_FAMILY}}>
//                   <FaFileAlt className="w-5 h-5 text-[#53645A]" />
//                   Order Notes <span className="text-sm font-normal text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY }}>(Optional)</span>
//                 </h2>
//                 <textarea
//                   name="note"
//                   value={formData.note}
//                   onChange={handleInputChange}
//                   rows="2"
//                   className="w-full px-4 py-3 border border-[#c5d5be]/50 rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm resize-none bg-white hover:border-[#53645A]/30"
//                   placeholder="Special instructions for delivery, gift message, etc."
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 />
//               </div>
//             </div>

//             {/* Right Column - Order Summary (COMPACT) */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-xl shadow-sm border border-[#c5d5be]/40 p-3 sticky top-24">
//                 <h2 className="text-sm font-medium text-[#263b32] flex items-center gap-1.5 mb-2.5" style={{ fontFamily: FONT_FAMILY }}>
//                   <FaShoppingBag className="w-3.5 h-3.5 text-[#53645A]" />
//                   Order Summary
//                 </h2>
                
//                 {/* Grouped Products List - COMPACT */}
//                 <div className="space-y-2 max-h-[350px] overflow-y-auto mb-3 pr-1">
//                   {groupedProducts.map((productGroup) => {
//                     const productDetail = productVariants[productGroup.productId];
//                     const productImage = productDetail?.images?.[0]?.url || productGroup.image || null;
//                     const hasVariants = productDetail?.hasVariants || false;
//                     const isProductExpanded = expandedProducts[productGroup.productId] !== false;
                    
//                     const variantItems = hasVariants 
//                       ? productGroup.variants.filter(v => !v.isBaseProduct)
//                       : productGroup.variants;
                    
//                     if (variantItems.length === 0) return null;
                    
//                     const availableVariantsList = getAvailableVariants(productGroup.productId);
                    
//                     return (
//                       <div
//                         key={productGroup.productId}
//                         className="bg-white rounded-lg border border-[#8B9D83]/15 overflow-hidden hover:border-[#8B9D83]/40 transition-all shadow-sm"
//                       >
//                         {/* Product Header - COMPACT */}
//                         {hasVariants && (
//                           <div className="flex items-start gap-1.5 p-1.5 bg-[#f0f5ed]/80 border-b border-[#8B9D83]/10">
//                             <div className="w-8 h-8 bg-[#c5d5be]/20 rounded-lg overflow-hidden border border-[#8B9D83]/20 flex-shrink-0">
//                               <img
//                                 src={productImage || 'https://via.placeholder.com/32?text=P'}
//                                 alt={productGroup.productName}
//                                 className="w-full h-full object-contain p-0.5"
//                                 onError={(e) => {
//                                   e.target.src = 'https://via.placeholder.com/32?text=P';
//                                 }}
//                               />
//                             </div>
                            
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-semibold text-[10px] text-[#263b32] line-clamp-1" title={productGroup.productName}>
//                                 {productGroup.productName}
//                               </h3>
                              
//                               <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
//                                 <span className="text-[10px] font-bold text-[#8B9D83]">
//                                   ৳{productGroup.subtotal.toFixed(2)}
//                                 </span>
//                                 {productGroup.discountPrice > 0 && productGroup.discountPrice < productGroup.regularPrice && (
//                                   <span className="text-[8px] text-gray-400 line-through">
//                                     ৳{productGroup.regularPrice.toFixed(2)}
//                                   </span>
//                                 )}
//                                 <span className="inline-flex items-center gap-0.5 text-[8px] text-gray-500 bg-[#c5d5be]/20 px-1 py-0.5 rounded-full">
//                                   <Scale className="w-2 h-2" />
//                                   /{getUnitLabel(productGroup.unit)}
//                                 </span>
//                                 {variantItems.length > 0 && (
//                                   <span className="inline-flex items-center gap-0.5 text-[8px] text-[#8B9D83] bg-[#c5d5be]/20 px-1 py-0.5 rounded-full">
//                                     <Layers className="w-2 h-2" />
//                                     {variantItems.length}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
                            
//                             <button
//                               onClick={() => setExpandedProducts(prev => ({ ...prev, [productGroup.productId]: !prev[productGroup.productId] }))}
//                               className="p-0.5 text-gray-400 hover:text-[#8B9D83] transition-colors"
//                             >
//                               {isProductExpanded ? (
//                                 <ChevronUp className="w-3 h-3" />
//                               ) : (
//                                 <ChevronDown className="w-3 h-3" />
//                               )}
//                             </button>
//                           </div>
//                         )}

//                         {/* Items Section - COMPACT */}
//                         {(!hasVariants || isProductExpanded) && (
//                           <div className="p-1.5 space-y-1.5">
//                             {!hasVariants && (
//                               <div className="space-y-1">
//                                 {variantItems.map((variant) => (
//                                   <CartItem
//                                     key={variant.itemId}
//                                     variant={variant}
//                                     onUpdate={(newQuantity) => updateCartQuantity(variant.itemId, newQuantity)}
//                                     onRemove={() => removeCartItem(variant.itemId)}
//                                     isUpdating={isUpdatingCart}
//                                     productImage={productImage}
//                                     isBaseProduct={true}
//                                     productName={productGroup.productName}
//                                   />
//                                 ))}
//                               </div>
//                             )}

//                             {hasVariants && (
//                               <>
//                                 {Object.entries(
//                                   variantItems.reduce((acc, v) => {
//                                     const key = v.variantId || 'no-variant';
//                                     if (!acc[key]) acc[key] = [];
//                                     acc[key].push(v);
//                                     return acc;
//                                   }, {})
//                                 ).map(([variantId, items]) => {
//                                   const representative = items[0];
//                                   const availableSubVariants = getAvailableSubVariants(productGroup.productId, variantId);
//                                   const hasSubVariants = productDetail?.variantTypes?.some(vt =>
//                                     vt.variants?.some(v => 
//                                       v.id === variantId && v.subVariants && v.subVariants.length > 0
//                                     )
//                                   ) || false;
                                  
//                                   return (
//                                     <div
//                                       key={variantId}
//                                       className="rounded-lg border border-[#8B9D83]/20 bg-[#faf8f5] overflow-hidden"
//                                     >
//                                       <div className="flex items-center gap-1 px-2 py-1 bg-[#8B9D83]/8 border-b border-[#8B9D83]/10">
//                                         <Layers className="w-2.5 h-2.5 text-[#8B9D83] flex-shrink-0" />
//                                         <span className="text-[9px] font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//                                           {representative.variantName || 'Variant'}
//                                         </span>
//                                         {representative.selectedColor && (
//                                           <Circle
//                                             className="w-2 h-2 flex-shrink-0"
//                                             style={{ color: representative.selectedColor, fill: representative.selectedColor }}
//                                           />
//                                         )}
//                                         {hasSubVariants && (
//                                           <span className="text-[8px] text-amber-600 bg-amber-50 px-1 py-0.5 rounded-full">
//                                             Has Subs
//                                           </span>
//                                         )}
//                                         <span className="text-[8px] text-gray-400 ml-auto">
//                                           {items.filter(i => !i.isBaseProduct).length}
//                                         </span>
//                                       </div>

//                                       <div className="p-1 space-y-1">
//                                         {items
//                                           .filter(v => !v.isBaseProduct)
//                                           .map((variant, index) => (
//                                             <div
//                                               key={variant.itemId || `variant-${index}-${variant.variantId}`}
//                                               className={variant.isSubVariant ? 'ml-2 pl-1.5 border-l border-[#8B9D83]/25' : ''}
//                                             >
//                                               <CartItem
//                                                 variant={variant}
//                                                 onUpdate={(newQuantity) => updateCartQuantity(variant.itemId, newQuantity)}
//                                                 onRemove={() => removeCartItem(variant.itemId)}
//                                                 isUpdating={isUpdatingCart}
//                                                 productImage={productImage}
//                                               />
//                                             </div>
//                                           ))}

//                                         {hasSubVariants && availableSubVariants.length > 0 && (
//                                           <div className="ml-2 pl-1.5 border-l border-dashed border-[#8B9D83]/20 pt-1">
//                                             <p className="text-[8px] text-gray-400 mb-0.5" style={{ fontFamily: FONT_FAMILY }}>
//                                               Add sub-variant:
//                                             </p>
//                                             <div className="flex flex-wrap gap-0.5">
//                                               {availableSubVariants.map((subVariant) => {
//                                                 const isAdding = addingVariant[`${productGroup.productId}_${variantId}_${subVariant.id}`];
//                                                 return (
//                                                   <button
//                                                     key={subVariant.id}
//                                                     onClick={() =>
//                                                       addSpecificSubVariantToCart(
//                                                         productGroup.productId,
//                                                         variantId,
//                                                         subVariant,
//                                                         representative.variantName,
//                                                         representative.variantType
//                                                       )
//                                                     }
//                                                     disabled={isAdding}
//                                                     className="text-[8px] px-1.5 py-0.5 rounded-full border border-[#8B9D83]/30 hover:border-[#8B9D83] text-[#263b32] hover:bg-white transition-all flex items-center gap-0.5 disabled:opacity-50 bg-white/60"
//                                                   >
//                                                     {isAdding ? (
//                                                       <Loader2 className="w-1.5 h-1.5 animate-spin" />
//                                                     ) : (
//                                                       <Plus className="w-1.5 h-1.5" />
//                                                     )}
//                                                     {subVariant.name}
//                                                     {subVariant.color && (
//                                                       <span
//                                                         className="inline-block w-1.5 h-1.5 rounded-full"
//                                                         style={{ backgroundColor: subVariant.color }}
//                                                       />
//                                                     )}
//                                                   </button>
//                                                 );
//                                               })}
//                                             </div>
//                                           </div>
//                                         )}
//                                       </div>
//                                     </div>
//                                   );
//                                 })}
                                
//                                 {availableVariantsList.length > 0 && (
//                                   <div className="pt-1 border-t border-[#8B9D83]/10">
//                                     <p className="text-[8px] text-gray-400 mb-0.5" style={{ fontFamily: FONT_FAMILY }}>
//                                       Add more variants:
//                                     </p>
//                                     <div className="flex flex-wrap gap-0.5">
//                                       {availableVariantsList.map((v) => {
//                                         const isAdding = addingVariant[`${productGroup.productId}_${v.id}`];
//                                         const hasSubVariants = v.subVariants && v.subVariants.length > 0;
//                                         return (
//                                           <button
//                                             key={v.id}
//                                             onClick={() => {
//                                               addVariantToCart(productGroup.productId, {
//                                                 id: v.id,
//                                                 name: v.name,
//                                                 type: v.type,
//                                                 color: v.color,
//                                                 regularPrice: v.regularPrice || 0,
//                                                 discountPrice: v.discountPrice || 0,
//                                                 image: v.images?.[0] || null,
//                                                 images: v.images || [],
//                                                 subVariants: v.subVariants || []
//                                               });
//                                             }}
//                                             disabled={isAdding}
//                                             className={`text-[8px] px-1.5 py-0.5 rounded-full border transition-all flex items-center gap-0.5 disabled:opacity-50 ${
//                                               hasSubVariants
//                                                 ? 'border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-400'
//                                                 : 'border-[#8B9D83]/30 hover:border-[#8B9D83] text-[#263b32] hover:bg-[#f0f5ed]'
//                                             }`}
//                                           >
//                                             {isAdding ? (
//                                               <Loader2 className="w-1.5 h-1.5 animate-spin" />
//                                             ) : (
//                                               <Plus className="w-1.5 h-1.5" />
//                                             )}
//                                             {v.name}
//                                             {v.color && (
//                                               <span
//                                                 className="inline-block w-1.5 h-1.5 rounded-full"
//                                                 style={{ backgroundColor: v.color }}
//                                               />
//                                             )}
//                                             {hasSubVariants && (
//                                               <span className="text-[7px] bg-amber-200 text-amber-700 px-0.5 py-0.5 rounded-full">
//                                                 {v.subVariants.length} sub
//                                               </span>
//                                             )}
//                                           </button>
//                                         );
//                                       })}
//                                     </div>
//                                   </div>
//                                 )}
//                               </>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {/* Totals - Compact */}
//                 <div className="space-y-1 border-t border-[#c5d5be]/40 pt-2.5">
//                   <div className="flex justify-between text-xs">
//                     <span className="text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Subtotal</span>
//                     <span className="font-medium text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{subtotal.toFixed(2)}</span>
//                   </div>
                  
//                   <div className="flex justify-between text-xs">
//                     <span className="text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Shipping</span>
//                     <span className="font-medium text-green-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{shippingCost.toFixed(2)}</span>
//                   </div>
                  
//                   <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#c5d5be]/40">
//                     <span className="text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Total</span>
//                     <span className="text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{total.toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 {/* Color Selection Warning - Compact */}
//                 {hasColorRequiredItems && (
//                   <div className="mt-2 p-1.5 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-1.5">
//                     <AlertCircle className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
//                     <p className="text-[9px] text-orange-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Select colors before placing order
//                     </p>
//                   </div>
//                 )}
                
//                 {/* Trust Badges - Compact */}
//                 <div className="mt-2.5 space-y-1 text-[9px]">
//                   <div className="flex items-center gap-1.5 text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     <FaShieldAlt className="w-3 h-3 text-[#53645A]" />
//                     <span>Safe & Secure Shopping</span>
//                   </div>
//                   <div className="flex items-center gap-1.5 text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     <FaClock className="w-3 h-3 text-[#53645A]" />
//                     <span>7-Day Return Policy</span>
//                   </div>
//                   <div className="flex items-center gap-1.5 text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     <Zap className="w-3 h-3 text-[#53645A]" />
//                     <span>Free shipping over ৳3000</span>
//                   </div>
//                 </div>
                
//                 {/* Payment & Place Order */}
//                 <div className="mt-3">
//                   <PaymentSelector
//                     onSubmit={handleSubmit}
//                     isSubmitting={submitting}
//                     disabled={isAdminOrModerator || hasColorRequiredItems}
//                   />
//                   {hasColorRequiredItems && (
//                     <p className="text-[9px] text-orange-500 text-center mt-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Select all colors before placing order
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <OrderSuccessModal
//         isOpen={showOrderSuccessModal}
//         onClose={() => {
//           setShowOrderSuccessModal(false);
//         }}
//         orderId={lastOrderId}
//         isLoggedIn={isLoggedIn}
//         customerEmail={formData.email}
//       />
      
//       <Footer />
//     </>
//   );
// }


'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Check,
  Loader2,
  Palette,
  Zap,
  Layers,
  Plus,
  Minus,
  Trash2,
  X,
  Circle,
  ChevronDown,
  ChevronUp,
  Scale,
  Package
} from 'lucide-react';

import { 
  FaChevronDown, 
  FaCheckCircle, 
  FaTimes, 
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileAlt,
  FaMoneyBillWave,
  FaTruck,
  FaShoppingBag,
  FaClock,
  FaShieldAlt,
  FaArrowLeft,
  FaBox,
  FaShippingFast,
  FaCreditCard,
  FaStore,
  FaBuilding,
  FaSearch,
  FaHome,
  FaCity,
  FaMapPin,
  FaMinus,
  FaPlus,
  FaTrash
} from 'react-icons/fa';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Font family constants - Beauty Bucket Theme
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = " serif";

// Helper function for unit label
const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

// Helper function to get color name
const getColorName = (color) => {
  const colorMap = {
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#FF0000': 'Red',
    '#00FF00': 'Green',
    '#0000FF': 'Blue',
    '#FFFF00': 'Yellow',
    '#FF00FF': 'Magenta',
    '#00FFFF': 'Cyan',
    '#FFA500': 'Orange',
    '#800080': 'Purple',
    '#008000': 'Dark Green',
    '#FFC0CB': 'Pink',
    '#A52A2A': 'Brown',
    '#808080': 'Gray',
    '#C0C0C0': 'Silver',
    '#4A90E2': 'Blue',
    '#FF6B6B': 'Red',
    '#4ECDC4': 'Teal',
    '#45B7D1': 'Sky Blue',
    '#96CEB4': 'Mint',
    '#FFEAA7': 'Cream',
    '#DDA0DD': 'Plum',
    '#98D8C8': 'Seafoam',
    '#F7DC6F': 'Gold',
    '#BB8FCE': 'Lavender'
  };
  return colorMap[color] || color;
};

// Searchable Select Component - Original Size
const SearchableSelect = ({ name, value, onChange, options, placeholder, required, disabled, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (selectedValue) => {
    onChange({ target: { name, value: selectedValue } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onChange({ target: { name, value: '' } });
    setSearchTerm('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = value && options.includes(value) ? value : '';

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus-within:ring-2 focus-within:ring-[#53645A] focus-within:border-transparent cursor-pointer flex items-center justify-between transition-all ${
          disabled ? 'bg-[#c5d5be]/20 cursor-not-allowed' : 'bg-white'
        } ${error ? 'border-red-500' : 'border-[#c5d5be]/50 hover:border-[#53645A]/30'}`}
        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`text-sm ${selectedOption ? 'text-[#263b32] font-medium' : 'text-[#53645A]/60'}`}>
          {selectedOption || placeholder}
        </span>
        <div className="flex items-center gap-2">
          {selectedOption && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-[#53645A]/60 hover:text-[#263b32]"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          )}
          <FaChevronDown className={`w-3 h-3 text-[#53645A]/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#c5d5be]/50 rounded-xl shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-[#c5d5be]/30">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#53645A]/40 w-3.5 h-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 border border-[#c5d5be]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#53645A] text-sm"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-48">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-4 py-2.5 text-left hover:bg-[#f0f5ed] transition-colors text-sm text-[#263b32]"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-[#53645A]/60 text-center" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                No results found
              </div>
            )}
          </div>
        </div>
      )}
      {required && !disabled && (
        <input type="hidden" name={name} value={value} required={required} />
      )}
    </div>
  );
};

// Payment Selector - Original Size
const PaymentSelector = ({ onSubmit, isSubmitting, disabled }) => {
  return (
    <div>
      <div className="bg-gradient-to-r from-[#53645A]/10 to-[#6b7d63]/10 rounded-xl p-4 border-2 border-[#53645A]/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#53645A] to-[#6b7d63] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#53645A]/25">
            <FaMoneyBillWave className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-[#263b32] text-sm" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
              Cash on Delivery
            </h4>
            <p className="text-xs text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
              Pay when you receive your order
            </p>
          </div>
        </div>
      </div>
      
      {disabled ? (
        <div className="w-full mt-4 bg-[#c5d5be]/20 text-[#53645A]/60 py-3 rounded-xl font-semibold text-center cursor-not-allowed flex items-center justify-center gap-2 text-sm border border-[#53645A]/20" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
          <FaShieldAlt className="w-4 h-4 text-[#53645A]" />
          Checkout Disabled for Admin/Moderator
        </div>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full mt-4 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#53645A]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Placing Order...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Place Order
            </>
          )}
        </button>
      )}
    </div>
  );
};

// Order Success Modal
const OrderSuccessModal = ({ isOpen, onClose, orderId, isLoggedIn, customerEmail }) => {
  const router = useRouter();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-[#53645A]/20"
          >
            <div className="p-6 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <FaCheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                Order Placed Successfully! 🎉
              </h2>
              <p className="text-sm text-white/80 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                Your order has been confirmed
              </p>
            </div>
            
            <div className="p-6 text-center">
              <p className="text-[#263b32] mb-2 font-semibold" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                Thank you for your order!
              </p>
              <p className="text-sm text-[#53645A]/60 mb-4" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                We'll notify you when it ships.
              </p>
              {orderId && (
                <div className="bg-[#f0f5ed] rounded-lg p-3 mb-4 border border-[#c5d5be]/40">
                  <p className="text-xs text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Order Reference
                  </p>
                  <p className="text-sm font-mono font-bold text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    {orderId.slice(-8).toUpperCase()}
                  </p>
                </div>
              )}
              {customerEmail ? (
                <div className="bg-[#53645A]/10 rounded-lg p-3 mb-4 flex items-start gap-2 text-left border border-[#53645A]/20">
                  <FaCheckCircle className="w-4 h-4 text-[#53645A] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    A confirmation email has been sent to <span className="font-medium text-[#53645A]">{customerEmail}</span>
                  </p>
                </div>
              ) : (
                <div className="bg-[#f0f5ed] rounded-lg p-3 mb-4 flex items-start gap-2 text-left border border-[#c5d5be]/40">
                  <FaCheckCircle className="w-4 h-4 text-[#53645A] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Order placed successfully! Check your phone for updates.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[#53645A]/20 bg-[#f0f5ed] flex flex-col sm:flex-row gap-2">
              <button 
                onClick={() => {
                  onClose();
                  if (isLoggedIn) {
                    router.push('/customer/orders');
                  }
                }} 
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#53645A]/25 transition-colors text-sm font-medium"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                {isLoggedIn ? 'View My Orders' : 'Continue Shopping'}
              </button>
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-[#53645A]/30 text-[#263b32] rounded-xl hover:bg-[#f0f5ed] transition-colors text-sm font-medium"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Get client device info
const getClientDeviceInfo = () => {
  try {
    return {
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      referrer: document.referrer || null,
      doNotTrack: navigator.doNotTrack,
      vendor: navigator.vendor,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null
    };
  } catch (error) {
    console.error('Error getting client device info:', error);
    return {};
  }
};

// AnimatePresence wrapper for modals
const AnimatePresence = ({ children }) => {
  return <>{children}</>;
};

// ========== CART ITEM COMPONENT - COMPACT (Only for Order Summary) ==========
const CartItem = ({ 
  variant, 
  onUpdate, 
  onRemove, 
  isUpdating,
  productImage,
  isBaseProduct = false,
  productName = ''
}) => {
  const getDisplayName = () => {
    if (isBaseProduct) {
      return productName || 'Product';
    }
    if (variant.subVariantName) {
      return variant.subVariantName;
    } else if (variant.variantName) {
      return variant.variantName;
    }
    return 'Variant';
  };

  const getPrice = () => {
    const isSubVariant = !!(variant.subVariantId && variant.subVariantId !== 'null' && variant.subVariantId !== '');
    const isVariant = !!(variant.variantId && variant.variantId !== 'null' && variant.variantId !== '');
    
    if (isSubVariant) {
      if (variant.variantDiscountPrice > 0) {
        return Number(variant.variantDiscountPrice);
      }
      if (variant.variantRegularPrice > 0) {
        return Number(variant.variantRegularPrice);
      }
    }
    
    if (isVariant && !isSubVariant) {
      if (variant.variantDiscountPrice > 0) {
        return Number(variant.variantDiscountPrice);
      }
      if (variant.variantRegularPrice > 0) {
        return Number(variant.variantRegularPrice);
      }
    }
    
    if (variant.price && Number(variant.price) > 0) {
      return Number(variant.price);
    }
    
    if (variant.discountPrice && Number(variant.discountPrice) > 0) {
      return Number(variant.discountPrice);
    }
    
    return Number(variant.regularPrice) || 0;
  };

  const getOriginalPrice = () => {
    const currentPrice = getPrice();
    const isSubVariant = !!(variant.subVariantId && variant.subVariantId !== 'null' && variant.subVariantId !== '');
    
    if (isSubVariant && variant.variantRegularPrice > 0 && variant.variantDiscountPrice > 0) {
      if (variant.variantRegularPrice !== currentPrice) {
        return variant.variantRegularPrice;
      }
    }
    
    if (!isSubVariant && variant.variantRegularPrice > 0 && variant.variantDiscountPrice > 0) {
      if (variant.variantRegularPrice !== currentPrice) {
        return variant.variantRegularPrice;
      }
    }
    
    if (variant.regularPrice > 0 && variant.regularPrice !== currentPrice) {
      return variant.regularPrice;
    }
    
    return null;
  };

  const getVariantImage = () => {
    const isSubVariant = !!(variant.subVariantId && variant.subVariantId !== 'null' && variant.subVariantId !== '');
    
    if (isSubVariant) {
      if (variant.image && variant.image !== '' && variant.image !== 'https://via.placeholder.com/32') {
        return variant.image;
      }
      if (variant.variantImage && variant.variantImage !== '' && variant.variantImage !== 'https://via.placeholder.com/32') {
        return variant.variantImage;
      }
    }
    
    if (variant.image && variant.image !== '' && variant.image !== 'https://via.placeholder.com/32') {
      return variant.image;
    }
    if (variant.variantImage && variant.variantImage !== '' && variant.variantImage !== 'https://via.placeholder.com/32') {
      return variant.variantImage;
    }
    
    if (productImage && productImage !== '' && productImage !== 'https://via.placeholder.com/32') {
      return productImage;
    }
    if (variant.productImage && variant.productImage !== '' && variant.productImage !== 'https://via.placeholder.com/32') {
      return variant.productImage;
    }
    
    return null;
  };

  const price = getPrice();
  const originalPrice = getOriginalPrice();
  const hasDiscount = originalPrice && originalPrice > price;
  const variantImage = getVariantImage();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove();
      return;
    }
    if (newQuantity > variant.stockQuantity) {
      toast.error(`Only ${variant.stockQuantity} items available`);
      return;
    }
    onUpdate(newQuantity);
  };

  return (
    <div className={`bg-white rounded-lg border ${isBaseProduct ? 'border-[#8B9D83]/30 bg-[#f0f5ed]/30' : 'border-[#8B9D83]/15'} p-1.5 hover:border-[#8B9D83]/30 transition-all`}>
      <div className="flex items-center gap-1.5">
        <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#8B9D83]/20 flex-shrink-0 bg-[#f0f5ed]">
          {variantImage ? (
            <img
              src={variantImage}
              alt={getDisplayName()}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (productImage && productImage !== variantImage) {
                  e.target.src = productImage;
                } else {
                  e.target.src = 'https://via.placeholder.com/32?text=V';
                }
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#f0f5ed]">
              <Package className="w-3.5 h-3.5 text-[#8B9D83]/40" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[10px] font-medium text-[#263b32]">
              {getDisplayName()}
            </span>
            {variant.selectedColor && (
              <span className="inline-flex items-center gap-0.5 text-[8px] text-[#8B9D83]">
                <Circle 
                  className="w-2 h-2" 
                  style={{ color: variant.selectedColor, fill: variant.selectedColor }} 
                />
                {getColorName(variant.selectedColor)}
              </span>
            )}
            {variant.isSubVariant && (
              <span className="text-[7px] bg-blue-50 text-blue-600 px-1 py-0.5 rounded">Sub</span>
            )}
            {variant.isVariant && !variant.isSubVariant && !isBaseProduct && (
              <span className="text-[7px] bg-purple-50 text-purple-600 px-1 py-0.5 rounded">Var</span>
            )}
            {isBaseProduct && (
              <span className="text-[7px] bg-gray-100 text-gray-500 px-1 py-0.5 rounded">Default</span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] font-semibold text-[#8B9D83]">
              ৳{price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-[8px] text-gray-400 line-through">
                ৳{originalPrice.toFixed(2)}
              </span>
            )}
            {hasDiscount && (
              <span className="text-[7px] text-green-600 font-medium bg-green-50 px-1 py-0.5 rounded">
                {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center border border-[#8B9D83]/20 rounded-lg overflow-hidden bg-white flex-shrink-0">
          <button
            onClick={() => {
              const newQty = Math.max(1, variant.quantity - 1);
              handleQuantityChange(newQty);
            }}
            disabled={isUpdating || variant.quantity <= 1}
            className="w-5 h-5 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
          >
            <Minus className="w-2 h-2" />
          </button>
          
          <span className="w-5 text-center text-[10px] font-medium text-[#263b32]">
            {variant.quantity}
          </span>
          
          <button
            onClick={() => {
              const newQty = variant.quantity + 1;
              if (newQty <= variant.stockQuantity) {
                handleQuantityChange(newQty);
              } else {
                toast.error(`Only ${variant.stockQuantity} items available`);
              }
            }}
            disabled={isUpdating || variant.quantity >= variant.stockQuantity}
            className="w-5 h-5 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
          >
            <Plus className="w-2 h-2" />
          </button>
        </div>

        <button
          onClick={onRemove}
          disabled={isUpdating}
          className="p-0.5 text-gray-400/40 hover:text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0 disabled:opacity-50"
          title="Remove"
        >
          <X className="w-2.5 h-2.5" />
        </button>
      </div>
    </div>
  );
};

export default function CheckoutClient() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const isPlacingOrder = useRef(false);
  const [expandedProducts, setExpandedProducts] = useState({});
  const [expandedVariants, setExpandedVariants] = useState({});

  const [shippingRates, setShippingRates] = useState({
    insideDhaka: 70,
    outsideDhaka: 150
  });

  const [locationData, setLocationData] = useState({});
  const [divisions, setDivisions] = useState({});
  const [divisionList, setDivisionList] = useState([]);
  const [citiesByDivision, setCitiesByDivision] = useState([]);
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);
  const [productColors, setProductColors] = useState({});
  const [updatingColor, setUpdatingColor] = useState({});
  const [productVariants, setProductVariants] = useState({});
  const [addingVariant, setAddingVariant] = useState({});
  const [availableVariants, setAvailableVariants] = useState({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    division: '',
    address: '',
    city: '',
    zone: '',
    area: '',
    zipCode: '',
    country: 'Bangladesh',
    note: ''
  });

  const [errors, setErrors] = useState({});
  const [quantityInputs, setQuantityInputs] = useState({});
  const [pendingQuantityUpdates, setPendingQuantityUpdates] = useState({});

  useEffect(() => {
    const checkCartAndRedirect = async () => {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      
      if (!token && !sessionId) {
        const newSessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('cartSessionId', newSessionId);
        console.log('🆕 Generated new session ID on checkout:', newSessionId);
      }
      
      fetchCart();
    };
    
    checkCartAndRedirect();
  }, []);

  useEffect(() => {
    if (cart?.items) {
      const initialQuantities = {};
      cart.items.forEach(item => {
        initialQuantities[item._id] = item.quantity;
      });
      setQuantityInputs(initialQuantities);
    }
  }, [cart]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    
    if (!token && !sessionId) {
      const newSessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('cartSessionId', newSessionId);
      console.log('🆕 Generated session ID:', newSessionId);
    }
  }, []);

  const getShippingCost = useCallback(async (city, zone, area) => {
    try {
      const response = await fetch('http://localhost:5000/api/delivery/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, zone, area })
      });
      const data = await response.json();
      if (data.success) {
        return data.data.charge;
      }
      return 0;
    } catch (error) {
      console.error('Error calculating shipping:', error);
      return 0;
    }
  }, []);

  // ========== FETCH PRODUCT DETAILS ==========
  const fetchProductDetails = async (items) => {
    if (!items || items.length === 0) return {};
    
    const uniqueProductIds = [...new Set(items.map(item => item.productId))];
    if (uniqueProductIds.length === 0) return {};
    
    try {
      const productData = {};
      for (const productId of uniqueProductIds) {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();
        if (data.success) {
          const product = data.data.product;
          productData[productId] = {
            colors: product.colors || [],
            variantTypes: product.variantTypes || [],
            hasVariants: product.hasVariants || false,
            images: product.images || []
          };
        }
      }
      return productData;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return {};
    }
  };

  const fetchProductColors = async (items) => {
    const colorMap = {};
    for (const item of items) {
      if (!colorMap[item.productId]) {
        try {
          const response = await fetch(`http://localhost:5000/api/products/${item.productId}`);
          const data = await response.json();
          if (data.success && data.data.product.colors) {
            colorMap[item.productId] = data.data.product.colors;
          }
        } catch (error) {
          console.error('Error fetching product colors:', error);
        }
      }
    }
    return colorMap;
  };

  // ========== FETCH CART ==========
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      const response = await fetch('http://localhost:5000/api/cart', { headers });
      const data = await response.json();
      
      if (data.success && data.data.items?.length > 0) {
        setCart(data.data);
        const colors = await fetchProductColors(data.data.items || []);
        setProductColors(colors);
        const variants = await fetchProductDetails(data.data.items || []);
        setProductVariants(variants);
        calculateAvailableVariants(data.data.items, variants);
      } else {
        setCart({ items: [], totalItems: 0, subtotal: 0 });
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========== CALCULATE AVAILABLE VARIANTS ==========
  const calculateAvailableVariants = (items, variants) => {
    const available = {};
    const allVariants = {};
    
    items.forEach(item => {
      const productId = item.productId.toString();
      const productDetail = variants[productId];
      
      if (productDetail?.hasVariants && productDetail.variantTypes) {
        const cartVariantIds = items
          .filter(i => i.productId.toString() === productId)
          .map(i => i.variantId)
          .filter(id => id);
        
        const avail = [];
        productDetail.variantTypes.forEach(vt => {
          vt.variants.forEach(v => {
            if (!cartVariantIds.includes(v.id)) {
              avail.push({ ...v, type: vt.type });
            }
          });
        });
        available[productId] = avail;
      }
    });
    
    setAvailableVariants(available);
  };

  // ========== ADD NEW VARIANT TO CART ==========
  const addVariantToCart = async (productId, variant) => {
    const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
    const key = `${productId}_${variant.id}`;
    setAddingVariant(prev => ({ ...prev, [key]: true }));
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const variantImage = variant.image || variant.images?.[0] || null;
      const variantRegularPrice = variant.regularPrice || 0;
      const variantDiscountPrice = variant.discountPrice || 0;
      
      if (hasSubVariants && variant.subVariants.length > 0) {
        const firstSubVariant = variant.subVariants[0];
        
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            productId: productId,
            quantity: 1,
            variantId: variant.id,
            variantName: variant.name,
            variantType: variant.type,
            subVariantId: firstSubVariant.id,
            subVariantName: firstSubVariant.name,
            selectedColor: firstSubVariant.color || variant.color || null,
            variantRegularPrice: firstSubVariant.regularPrice || variantRegularPrice,
            variantDiscountPrice: firstSubVariant.discountPrice || variantDiscountPrice,
            image: firstSubVariant.images?.[0] || variantImage,
            variantImage: firstSubVariant.images?.[0] || variantImage
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          if (data.sessionId && !token) {
            localStorage.setItem('cartSessionId', data.sessionId);
          }
          await fetchCart();
          window.dispatchEvent(new Event('cart-update'));
          toast.success(`${firstSubVariant.name} (${variant.name}) added to cart`);
        } else {
          toast.error(data.error || 'Failed to add variant');
        }
      } else {
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            productId: productId,
            quantity: 1,
            variantId: variant.id,
            variantName: variant.name,
            variantType: variant.type,
            selectedColor: variant.color || null,
            variantRegularPrice: variantRegularPrice,
            variantDiscountPrice: variantDiscountPrice,
            image: variantImage,
            variantImage: variantImage
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          if (data.sessionId && !token) {
            localStorage.setItem('cartSessionId', data.sessionId);
          }
          await fetchCart();
          window.dispatchEvent(new Event('cart-update'));
          toast.success(`${variant.name} added to cart`);
        } else {
          toast.error(data.error || 'Failed to add variant');
        }
      }
    } catch (error) {
      console.error('Add variant error:', error);
      toast.error('Failed to add variant');
    } finally {
      setAddingVariant(prev => ({ ...prev, [key]: false }));
    }
  };

  // ========== ADD SPECIFIC SUB-VARIANT TO CART ==========
  const addSpecificSubVariantToCart = async (productId, variantId, subVariant, parentVariantName, parentVariantType) => {
    const key = `${productId}_${variantId}_${subVariant.id}`;
    setAddingVariant(prev => ({ ...prev, [key]: true }));
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const subVariantImage = subVariant.image || subVariant.images?.[0] || null;
      const subVariantRegularPrice = subVariant.regularPrice || 0;
      const subVariantDiscountPrice = subVariant.discountPrice || 0;
      
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
          variantId: variantId,
          variantName: parentVariantName,
          variantType: parentVariantType,
          subVariantId: subVariant.id,
          subVariantName: subVariant.name,
          selectedColor: subVariant.color || null,
          variantRegularPrice: subVariantRegularPrice,
          variantDiscountPrice: subVariantDiscountPrice,
          image: subVariantImage,
          variantImage: subVariantImage
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        await fetchCart();
        window.dispatchEvent(new Event('cart-update'));
        toast.success(`${subVariant.name} (${parentVariantName}) added to cart`);
      } else {
        toast.error(data.error || 'Failed to add sub-variant');
      }
    } catch (error) {
      console.error('Add sub-variant error:', error);
      toast.error('Failed to add sub-variant');
    } finally {
      setAddingVariant(prev => ({ ...prev, [key]: false }));
    }
  };

  // ========== UPDATE COLOR ==========
  const updateColor = async (itemId, newColor) => {
    setUpdatingColor(prev => ({ ...prev, [itemId]: true }));
    
    const previousCart = { ...cart };
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => {
        if (item._id === itemId) {
          return { ...item, selectedColor: newColor };
        }
        return item;
      });
      return { ...prevCart, items: updatedItems };
    });
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ selectedColor: newColor })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Color updated!');
      } else {
        setCart(previousCart);
        toast.error(data.error || 'Failed to update color');
      }
    } catch (error) {
      console.error('Update color error:', error);
      setCart(previousCart);
      toast.error('Failed to update color');
    } finally {
      setUpdatingColor(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // ========== ADD NEW COLOR ==========
  const addNewColorToCart = async (productId, color) => {
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const nullColorItem = cart.items.find(
        item => item.productId === productId && 
        (!item.selectedColor || item.selectedColor === '' || item.selectedColor === null || item.selectedColor === 'null')
      );
      
      if (nullColorItem) {
        await fetch(`http://localhost:5000/api/cart/${nullColorItem._id}`, {
          method: 'DELETE',
          headers
        });
      }
      
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          productId: productId, 
          quantity: 1,
          selectedColor: color 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        await fetchCart();
        window.dispatchEvent(new Event('cart-update'));
        toast.success(`Added ${color} to cart!`);
      } else {
        toast.error(data.error || 'Failed to add color');
      }
    } catch (error) {
      console.error('Add color error:', error);
      toast.error('Network error');
    }
  };

  // ========== REMOVE ITEM ==========
  const removeCartItem = async (itemId) => {
    setIsUpdatingCart(true);
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'DELETE',
        headers
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchCart();
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Item removed');
      } else {
        toast.error(data.error || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Remove item error:', error);
      toast.error('Failed to remove item');
    } finally {
      setIsUpdatingCart(false);
    }
  };

  // ========== UPDATE QUANTITY ==========
  const updateCartQuantity = async (itemId, newQuantity) => {
    if (isUpdatingCart) return;
    
    if (newQuantity < 1) {
      removeCartItem(itemId);
      return;
    }
    
    setIsUpdatingCart(true);
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ quantity: newQuantity })
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchCart();
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Quantity updated');
      } else {
        toast.error(data.error || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Failed to update quantity');
    } finally {
      setIsUpdatingCart(false);
    }
  };

  // ========== UPDATE QUANTITY WITH DEBOUNCE ==========
  const updateQuantityWithDebounce = useCallback((itemId, newQuantity) => {
    if (pendingQuantityUpdates[itemId]) {
      clearTimeout(pendingQuantityUpdates[itemId]);
    }

    setQuantityInputs(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));

    const timeoutId = setTimeout(() => {
      updateCartQuantity(itemId, newQuantity);
      setPendingQuantityUpdates(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }, 500);

    setPendingQuantityUpdates(prev => ({
      ...prev,
      [itemId]: timeoutId
    }));
  }, [pendingQuantityUpdates]);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        const data = await response.json();
        setLocationData(data.locationData || {});
        
        const divisions = data.divisions || {};
        const filteredDivisions = {};
        const divisionKeys = [];
        
        Object.keys(divisions).forEach(key => {
          if (key !== 'Other') {
            filteredDivisions[key] = divisions[key];
            divisionKeys.push(key);
          }
        });
        
        setDivisions(filteredDivisions);
        setDivisionList(divisionKeys.sort());
        
        const cityList = data.locationData ? Object.keys(data.locationData) : [];
        setCities(cityList);
        setLocationLoading(false);
      } catch (error) {
        console.error('Failed to load location data:', error);
        setLocationLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Update cities when division changes
  useEffect(() => {
    if (formData.division && divisions[formData.division]) {
      setCitiesByDivision(divisions[formData.division]);
      setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
      setZones([]);
      setAreas([]);
    } else {
      setCitiesByDivision([]);
    }
  }, [formData.division, divisions]);

  // Update zones when city changes with shipping calculation
  useEffect(() => {
    const selectedCity = formData.city;
    const selectedZone = formData.zone;
    const selectedArea = formData.area;
    
    if (selectedCity && locationData[selectedCity]) {
      const availableZones = Object.keys(locationData[selectedCity].zones || {});
      setZones(availableZones);
      setFormData(prev => ({ ...prev, zone: '', area: '' }));
      setAreas([]);
      
      const calculateShipping = async () => {
        const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
        setShippingCost(charge);
      };
      calculateShipping();
    } else {
      setZones([]);
      setAreas([]);
      setShippingCost(0);
    }
  }, [formData.city, locationData, getShippingCost]);

  // Update areas when zone changes with shipping recalculation
  useEffect(() => {
    const selectedCity = formData.city;
    const selectedZone = formData.zone;
    const selectedArea = formData.area;
    
    if (selectedCity && selectedZone && locationData[selectedCity]) {
      const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
      setAreas(availableAreas);
      setFormData(prev => ({ ...prev, area: '' }));
      
      const calculateShipping = async () => {
        const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
        setShippingCost(charge);
      };
      calculateShipping();
    } else {
      setAreas([]);
    }
  }, [formData.zone, formData.city, locationData, getShippingCost]);

  // Recalculate shipping when area changes
  useEffect(() => {
    const selectedCity = formData.city;
    const selectedZone = formData.zone;
    const selectedArea = formData.area;
    
    if (selectedCity && selectedZone && selectedArea && locationData[selectedCity]) {
      const calculateShipping = async () => {
        const charge = await getShippingCost(selectedCity, selectedZone, selectedArea);
        setShippingCost(charge);
      };
      calculateShipping();
    }
  }, [formData.area, formData.city, formData.zone, locationData, getShippingCost]);

  // Fetch cart, user, shipping rates on mount
  useEffect(() => {
    fetchCart();
    fetchUser();
    fetchShippingRates();
  }, []);

  // Autofill user data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.contactPerson || user.companyName || user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        division: user.division || '',
        address: user.address || '',
        city: user.city || '',
        zone: user.zone || '',
        area: user.area || '',
        zipCode: user.zipCode || '',
        country: user.country || 'Bangladesh'
      }));
      
      if (user.division) {
        setFormData(prev => ({ ...prev, division: user.division }));
      }
      
      if (user.city) {
        setFormData(prev => ({ ...prev, city: user.city }));
      }
      
      if (user.zone) setFormData(prev => ({ ...prev, zone: user.zone }));
      if (user.area) setFormData(prev => ({ ...prev, area: user.area }));
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) setUser(data.user);
      }
    } catch (error) {
      console.error('Fetch user error:', error);
    }
  };

  const fetchShippingRates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/delivery/settings');
      const data = await response.json();
      if (data.success) {
        setShippingRates({
          insideDhaka: data.data.insideDhaka,
          outsideDhaka: data.data.outsideDhaka
        });
      }
    } catch (error) {
      console.error('Error fetching shipping rates:', error);
    }
  };

  // Handle cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      if (!isPlacingOrder.current) {
        fetchCart();
      }
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(pendingQuantityUpdates).forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
    };
  }, [pendingQuantityUpdates]);

  const validateBangladeshPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const bdPhoneRegex = /^(?:01|8801)\d{9}$/;
    
    if (!bdPhoneRegex.test(cleaned)) {
      return { valid: false, message: 'Please enter a valid Bangladeshi phone number (01XXXXXXXXX)' };
    }
    
    const prefix = cleaned.slice(0, 3);
    const validPrefixes = ['013', '014', '015', '016', '017', '018', '019'];
    
    if (!validPrefixes.includes(prefix)) {
      return { valid: false, message: 'Please enter a valid Bangladeshi mobile number' };
    }
    
    return { valid: true, formatted: cleaned };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    
    if (name === 'division') {
      setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
      setZones([]);
      setAreas([]);
    }
    
    if (name === 'city') {
      setFormData(prev => ({ ...prev, zone: '', area: '' }));
      setAreas([]);
    }
    
    if (name === 'zone') {
      setFormData(prev => ({ ...prev, area: '' }));
    }
    
    if (name === 'phone' && value) {
      const validation = validateBangladeshPhone(value);
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, phone: validation.message }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  };

  // ========== COLOR VALIDATION ==========
  const validateCartColors = () => {
    if (!cart?.items?.length) {
      toast.error('Your cart is empty');
      return false;
    }
    
    const itemsWithoutColor = cart.items.filter(item => {
      const availableColors = productColors[item.productId] || [];
      const hasAvailableColors = availableColors.length > 0;
      if (hasAvailableColors && (!item.selectedColor || item.selectedColor === '' || item.selectedColor === 'null')) {
        return true;
      }
      return false;
    });
    
    if (itemsWithoutColor.length > 0) {
      toast.error(
        <div className="space-y-1">
          <p className="font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Please select colors for:</p>
          <ul className="text-xs space-y-0.5 list-disc list-inside text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
            {itemsWithoutColor.slice(0, 3).map((item, i) => (
              <li key={i}>{item.productName}</li>
            ))}
            {itemsWithoutColor.length > 3 && (
              <li>And {itemsWithoutColor.length - 3} more item(s)...</li>
            )}
          </ul>
        </div>,
        { duration: 5000 }
      );
      return false;
    }
    
    return true;
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName?.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (formData.email?.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else {
      const validation = validateBangladeshPhone(formData.phone);
      if (!validation.valid) {
        errors.phone = validation.message;
      }
    }
    
    if (!formData.division?.trim()) {
      errors.division = 'Please select a division';
    }
    
    if (!formData.address?.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!formData.city?.trim()) {
      errors.city = 'Please select a district/city';
    }
    
    if (!formData.zone?.trim()) {
      errors.zone = 'Please select an upazila/thana';
    }
    
    setErrors(errors);
    return errors;
  };

  const calculateSubtotal = () => cart?.subtotal || 0;
  const calculateTotal = () => calculateSubtotal() + shippingCost;
  const isLoggedIn = !!user;
  const isAdminOrModerator = user && (user.role === 'admin' || user.role === 'moderator');

  const handleCODOrder = async () => {
  if (isAdminOrModerator) {
    toast.error('Admins and Moderators cannot place orders');
    return;
  }
  
  if (navigating) return;
  setNavigating(true);
  setSubmitting(true);
  isPlacingOrder.current = true;
  
  try {
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    }
    
    console.log('📤 Sending order with sessionId:', sessionId || 'none');
    
    const clientDeviceInfo = getClientDeviceInfo();
    
    const groupedItems = {};
    
    cart.items.forEach(item => {
      const productId = item.productId || item._id;
      
      // ✅ FIX: Include subVariantId in the group key for sub-variants
      let groupKey;
      if (item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '') {
        // For sub-variants, group by productId + variantId + subVariantId
        groupKey = `${productId}_${item.variantId || 'no-variant'}_${item.subVariantId}`;
      } else if (item.variantId && item.variantId !== 'null' && item.variantId !== '') {
        // For variants without sub-variants, group by productId + variantId
        groupKey = `${productId}_${item.variantId}`;
      } else {
        // For base products, group by productId
        groupKey = productId;
      }
      
      if (!groupedItems[groupKey]) {
        // ✅ Initialize with all variant/sub-variant fields
        groupedItems[groupKey] = {
          productId: productId,
          productName: item.productName,
          productSlug: item.productSlug || '',
          image: item.image || '',
          regularPrice: item.regularPrice,
          discountPrice: item.discountPrice || 0,
          buyingPrice: item.buyingPrice || 0,
          costPerItem: item.costPerItem || 0,
          unit: item.unit || 'pcs',
          stockQuantity: item.stockQuantity || 0,
          // ✅ Preserve variant/sub-variant information
          variantId: item.variantId || null,
          variantName: item.variantName || null,
          variantType: item.variantType || null,
          subVariantId: item.subVariantId || null,
          subVariantName: item.subVariantName || null,
          variantRegularPrice: item.variantRegularPrice || 0,
          variantDiscountPrice: item.variantDiscountPrice || 0,
          colors: [],
          quantity: 0,
          selectedColor: null,
          // ✅ Track if this is a sub-variant
          isSubVariant: !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== ''),
          isVariant: !!(item.variantId && item.variantId !== 'null' && item.variantId !== '')
        };
      }
      
      const hasValidColor = item.selectedColor && 
                           item.selectedColor !== '' && 
                           item.selectedColor !== null && 
                           item.selectedColor !== 'null';
      
      if (hasValidColor) {
        const existingColor = groupedItems[groupKey].colors.find(c => c.color === item.selectedColor);
        if (existingColor) {
          existingColor.quantity += item.quantity;
        } else {
          groupedItems[groupKey].colors.push({
            color: item.selectedColor,
            quantity: item.quantity,
            price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice
          });
        }
        groupedItems[groupKey].quantity += item.quantity;
      } else {
        groupedItems[groupKey].quantity = item.quantity;
      }
    });
    
    const groupedItemsArray = Object.values(groupedItems);
    
    // ✅ Filter out items with quantity 0 (pending parent variants)
    const validItems = groupedItemsArray.filter(item => {
      // For sub-variants, check quantity > 0
      if (item.isSubVariant) {
        return item.quantity > 0;
      }
      // For variants, check quantity > 0 or colors
      const hasColors = item.colors && item.colors.length > 0;
      const hasQuantity = item.quantity > 0;
      return hasColors || hasQuantity;
    });
    
    if (validItems.length === 0) {
      toast.error('No valid items in cart');
      setNavigating(false);
      return;
    }
    
    console.log('📦 Valid items being sent:', validItems.map(i => ({
      name: i.productName,
      variant: i.variantName,
      subVariant: i.subVariantName,
      quantity: i.quantity,
      colors: i.colors?.length || 0
    })));
    
    const orderData = {
      items: validItems,
      subtotal: calculateSubtotal(),
      shippingCost,
      discount: 0,
      total: calculateTotal(),
      paymentMethod: 'cod',
      customerInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        division: formData.division,
        address: formData.address,
        city: formData.city,
        zone: formData.zone,
        area: formData.area || '',
        zipCode: formData.zipCode || '',
        country: formData.country || 'Bangladesh',
        note: formData.note || ''
      },
      couponCode: null,
      couponDiscount: 0,
      freeShipping: false,
      clientDeviceInfo: clientDeviceInfo,
      sessionId: sessionId
    };
    
    console.log('📦 Order Data:', JSON.stringify(orderData, null, 2));
    
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      const orderId = data.orderId || data.data?._id || data.data?.id;
      
      try {
        const deleteHeaders = { 'Content-Type': 'application/json' };
        if (token) {
          deleteHeaders['Authorization'] = `Bearer ${token}`;
        } else if (sessionId) {
          deleteHeaders['x-session-id'] = sessionId;
        }
        
        await fetch('http://localhost:5000/api/incomplete-orders/delete-on-place', {
          method: 'POST',
          headers: deleteHeaders,
          body: JSON.stringify({ 
            sessionId: sessionId,
            orderId: orderId 
          })
        });
        console.log('🗑️ Incomplete order deleted after successful placement');
      } catch (deleteError) {
        console.error('Error deleting incomplete order:', deleteError);
      }
      
      localStorage.removeItem('cartSessionId');
      
      await fetch('http://localhost:5000/api/cart', { 
        method: 'DELETE', 
        headers 
      });
      
      window.dispatchEvent(new Event('cart-update'));
      setCart({ items: [], totalItems: 0, subtotal: 0 });
      
      if (isLoggedIn) {
        toast.success('Order placed successfully!');
        window.location.href = '/customer/orders';
      } else {
        const sessionIdFromResponse = data.sessionId || sessionId;
        window.location.href = `/thank-you?orderId=${orderId}&sessionId=${sessionIdFromResponse}`;
      }
    } else {
      toast.error(data.error || 'Failed to place order');
      setNavigating(false);
    }
  } catch (error) {
    console.error('COD order error:', error);
    toast.error('Network error. Please try again.');
    setNavigating(false);
  } finally {
    setSubmitting(false);
    isPlacingOrder.current = false;
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isAdminOrModerator) {
      toast.error('Admins and Moderators cannot place orders');
      return;
    }
    
    if (!validateCartColors()) {
      return;
    }
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      const errorMessages = Object.values(validationErrors);
      
      toast.error(
        <div className="space-y-1">
          <p className="font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Please fix the following errors:</p>
          <ul className="text-xs space-y-0.5 list-disc list-inside text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
            {errorMessages.slice(0, 3).map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
            {errorMessages.length > 3 && (
              <li>And {errorMessages.length - 3} more error(s)...</li>
            )}
          </ul>
        </div>,
        { duration: 5000 }
      );
      
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        const input = firstErrorField.querySelector('input, textarea, select');
        if (input) {
          setTimeout(() => input.focus(), 500);
        }
      }
      
      return;
    }
    
    if (!cart?.items?.length) {
      toast.error('Your cart is empty');
      return;
    }
    
    await handleCODOrder();
  };

  // ========== SAVE INCOMPLETE ORDER ==========
  // const saveIncompleteOrder = useCallback(async () => {
  //   try {
  //     if (!cart?.items?.length) return;

  //     const token = localStorage.getItem('token');
  //     const sessionId = localStorage.getItem('cartSessionId');
  //     const headers = { 'Content-Type': 'application/json' };
      
  //     if (token) {
  //       headers['Authorization'] = `Bearer ${token}`;
  //     } else if (sessionId) {
  //       headers['x-session-id'] = sessionId;
  //     }

  //     const groupedItems = cart.items.map(item => ({
  //       productId: item.productId,
  //       productName: item.productName,
  //       productSlug: item.productSlug || '',
  //       image: item.image || '',
  //       regularPrice: item.regularPrice,
  //       discountPrice: item.discountPrice || 0,
  //       quantity: item.quantity,
  //       unit: item.unit || 'pcs',
  //       selectedColor: item.selectedColor || null,
  //       variantId: item.variantId || null,
  //       variantName: item.variantName || null,
  //       variantType: item.variantType || null,
  //       subVariantId: item.subVariantId || null,
  //       subVariantName: item.subVariantName || null,
  //       variantRegularPrice: item.variantRegularPrice || 0,
  //       variantDiscountPrice: item.variantDiscountPrice || 0,
  //       colors: []
  //     }));

  //     const clientDeviceInfo = getClientDeviceInfo();

  //     const response = await fetch('http://localhost:5000/api/incomplete-orders/save', {
  //       method: 'POST',
  //       headers,
  //       body: JSON.stringify({
  //         customerInfo: formData,
  //         items: groupedItems,
  //         subtotal: calculateSubtotal(),
  //         shippingCost: shippingCost,
  //         discount: 0,
  //         total: calculateTotal(),
  //         paymentMethod: 'cod',
  //         checkoutStep: 'information',
  //         clientDeviceInfo,
  //         sessionId: sessionId
  //       })
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       console.log('✅ Incomplete order saved');
  //     }
  //   } catch (error) {
  //     console.error('Save incomplete order error:', error);
  //   }
  // }, [cart, formData, shippingCost]);

  // ========== SAVE INCOMPLETE ORDER ==========
const saveIncompleteOrder = useCallback(async () => {
  try {
    if (!cart?.items?.length) return;

    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    const headers = { 'Content-Type': 'application/json' };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    }

    // ========== MAP ITEMS WITH ALL VARIANT/SUB-VARIANT FIELDS ==========
    const mappedItems = cart.items.map(item => {
      const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
      const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');
      const hasValidColor = item.selectedColor && 
                            item.selectedColor !== '' && 
                            item.selectedColor !== null && 
                            item.selectedColor !== 'null';

      // Build colors array — if the item has a selected color, wrap it as a single-color entry
      let colorsArray = [];
      if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
        colorsArray = item.colors;
      } else if (hasValidColor) {
        colorsArray = [{
          color: item.selectedColor,
          quantity: item.quantity,
          price: item.discountPrice > 0 ? item.discountPrice : item.regularPrice
        }];
      }

      return {
        productId: item.productId,
        productName: item.productName,
        productSlug: item.productSlug || '',
        image: item.image || '',
        regularPrice: item.regularPrice || 0,
        discountPrice: item.discountPrice || 0,
        quantity: item.quantity || 1,
        unit: item.unit || 'pcs',
        selectedColor: hasValidColor ? item.selectedColor : null,
        colors: colorsArray,
        
        // ========== VARIANT/SUB-VARIANT FIELDS ==========
        variantId: item.variantId || null,
        variantName: item.variantName || null,
        variantType: item.variantType || null,
        subVariantId: item.subVariantId || null,
        subVariantName: item.subVariantName || null,
        variantRegularPrice: item.variantRegularPrice || 0,
        variantDiscountPrice: item.variantDiscountPrice || 0,
        variantImage: item.variantImage || '',
        isVariant: isVariant,
        isSubVariant: isSubVariant,
        isBaseProduct: !isVariant && !isSubVariant,
        stockQuantity: item.stockQuantity || 0
        // ================================================
      };
    });

    const clientDeviceInfo = getClientDeviceInfo();

    const response = await fetch('http://localhost:5000/api/incomplete-orders/save', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        customerInfo: formData,
        items: mappedItems,
        subtotal: calculateSubtotal(),
        shippingCost: shippingCost,
        discount: 0,
        total: calculateTotal(),
        paymentMethod: 'cod',
        checkoutStep: 'information',
        clientDeviceInfo,
        sessionId: sessionId
      })
    });

    const data = await response.json();
    if (data.success) {
      console.log('✅ Incomplete order saved with variant data');
    }
  } catch (error) {
    console.error('Save incomplete order error:', error);
  }
}, [cart, formData, shippingCost]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cart?.items?.length > 0) {
        saveIncompleteOrder();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [formData, cart, saveIncompleteOrder]);

  // ========== VARIANT HELPERS ==========
  const getAvailableVariants = (productId) => {
    return availableVariants[productId] || [];
  };

  const getAvailableSubVariants = (productId, variantId) => {
    if (!productVariants[productId]?.variantTypes) return [];
    
    let targetVariant = null;
    productVariants[productId].variantTypes.forEach(vt => {
      vt.variants.forEach(v => {
        if (v.id === variantId) {
          targetVariant = v;
        }
      });
    });
    
    if (!targetVariant || !targetVariant.subVariants) return [];
    
    const cartSubVariantIds = cart?.items
      .filter(item => 
        item.productId.toString() === productId && 
        item.variantId === variantId &&
        item.subVariantId
      )
      .map(item => item.subVariantId)
      .filter(id => id && id !== 'null' && id !== '') || [];
    
    return targetVariant.subVariants.filter(sv => !cartSubVariantIds.includes(sv.id));
  };

  const toggleVariantExpand = (variantId) => {
    setExpandedVariants(prev => ({ ...prev, [variantId]: !prev[variantId] }));
  };

  // ========== GROUP ITEMS FOR DISPLAY ==========
  const groupItemsByProduct = (items) => {
    const grouped = {};
    
    items.forEach(item => {
      const productId = item.productId.toString();
      
      if (!grouped[productId]) {
        grouped[productId] = {
          productId: item.productId,
          productName: item.productName,
          productSlug: item.productSlug,
          image: item.image,
          regularPrice: item.regularPrice,
          discountPrice: item.discountPrice,
          unit: item.unit || 'pcs',
          hasVariants: item.hasVariants || false,
          variants: [],
          totalQuantity: 0,
          subtotal: 0,
          variantTypes: item.variantTypes || [],
          hasMissingVariant: false
        };
      }
      
      const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
      const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');
      
      // Check if this item has a missing variant
      const productDetail = productVariants[productId];
      if (productDetail?.hasVariants && !isVariant && !isSubVariant) {
        grouped[productId].hasMissingVariant = true;
      }
      
      let price = 0;
      
      if (isSubVariant) {
        if (item.variantDiscountPrice > 0) {
          price = Number(item.variantDiscountPrice);
        } else if (item.variantRegularPrice > 0) {
          price = Number(item.variantRegularPrice);
        }
      } else if (isVariant) {
        if (item.variantDiscountPrice > 0) {
          price = Number(item.variantDiscountPrice);
        } else if (item.variantRegularPrice > 0) {
          price = Number(item.variantRegularPrice);
        }
      }
      
      if (price === 0 && item.quantity > 0) {
        if (item.discountPrice > 0) {
          price = Number(item.discountPrice);
        } else {
          price = Number(item.regularPrice) || 0;
        }
      }
      
      let imageToUse = null;
      
      if (isSubVariant) {
        if (item.variantImage && item.variantImage !== '' && item.variantImage !== 'https://via.placeholder.com/32') {
          imageToUse = item.variantImage;
        } else if (item.image && item.image !== '' && item.image !== 'https://via.placeholder.com/32') {
          imageToUse = item.image;
        }
      } else if (isVariant) {
        if (item.variantImage && item.variantImage !== '' && item.variantImage !== 'https://via.placeholder.com/32') {
          imageToUse = item.variantImage;
        } else if (item.image && item.image !== '' && item.image !== 'https://via.placeholder.com/32') {
          imageToUse = item.image;
        }
      }
      
      if (!imageToUse) {
        imageToUse = item.image || null;
      }
      
      const variantInfo = {
        itemId: item._id,
        quantity: item.quantity,
        selectedColor: item.selectedColor || null,
        variantId: item.variantId || null,
        variantName: item.variantName || null,
        variantType: item.variantType || null,
        subVariantId: item.subVariantId || null,
        subVariantName: item.subVariantName || null,
        variantRegularPrice: Number(item.variantRegularPrice) || 0,
        variantDiscountPrice: Number(item.variantDiscountPrice) || 0,
        stockQuantity: item.stockQuantity || 0,
        image: imageToUse,
        price: price,
        productImage: item.image,
        regularPrice: item.regularPrice,
        discountPrice: item.discountPrice,
        hasVariants: item.hasVariants || false,
        isSubVariant: isSubVariant,
        isVariant: isVariant,
        isBaseProduct: !isVariant && !isSubVariant,
        isMissingVariant: productDetail?.hasVariants && !isVariant && !isSubVariant
      };
      
      grouped[productId].variants.push(variantInfo);
      grouped[productId].totalQuantity += item.quantity;
      grouped[productId].subtotal += price * item.quantity;
    });
    
    return Object.values(grouped);
  };

  if (loading || locationLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f8f7f2] pt-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#53645A] animate-spin" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!cart?.items?.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f8f7f2] py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-12">
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 sm:mb-4">
                <DotLottieReact
                  src="/animations/shopping-cart.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
              <h2 className="text-2xl font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                Your cart is empty
              </h2>
              <p className="text-[#53645A]/60 mb-6" style={{ fontFamily: FONT_FAMILY }}>
                Add some products to your cart and come back to checkout.
              </p>
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#53645A] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#53645A]/25 transition-colors" style={{ fontFamily: FONT_FAMILY }}>
                <FaArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  const hasColorRequiredItems = cart.items.some(item => {
    const availableColors = productColors[item.productId] || [];
    return availableColors.length > 0 && (!item.selectedColor || item.selectedColor === '' || item.selectedColor === 'null');
  });

  // Check for missing variants
  const hasMissingVariants = cart.items.some(item => {
    const productDetail = productVariants[item.productId];
    if (productDetail?.hasVariants) {
      return !item.variantId || item.variantId === '' || item.variantId === 'null' || item.variantId === null;
    }
    return false;
  });

  const groupedProducts = groupItemsByProduct(cart.items);

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-[#f8f7f2] py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#53645A] to-[#6b7d63] rounded-xl flex items-center justify-center shadow-lg shadow-[#53645A]/25">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
                  Checkout
                </h1>
                <p className="text-sm text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY }}>
                  Complete your order securely
                </p>
              </div>
            </div>
          </div>

          {/* Color Selection Warning */}
          {hasColorRequiredItems && (
            <div className="mb-6 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-orange-700 font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Color Selection Required
                  </p>
                  <p className="text-xs text-orange-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Please select colors for all items before proceeding to checkout.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Missing Variants Warning */}
          {hasMissingVariants && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-700 font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Variant Selection Required
                  </p>
                  <p className="text-xs text-red-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Some products in your cart require variant selection. Please choose variants before checkout.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isAdminOrModerator && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-yellow-700 font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Checkout Disabled for Admin/Moderator Accounts
                  </p>
                  <p className="text-xs text-yellow-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    You are logged in as {user?.role}. Please switch to a customer account to place orders.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms (Original Size) */}
            <div className="lg:col-span-2 space-y-5">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-medium text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                    <FaUser className="w-5 h-5 text-[#53645A]" />
                    Personal Information
                  </h2>
                  {isLoggedIn && (
                    <span className="text-xs bg-[#53645A]/10 text-[#53645A] px-3 py-1 rounded-full flex items-center gap-1 font-medium border border-[#53645A]/20" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      <FaCheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Full Name <span className="text-[#53645A]">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#53645A]/40 w-4 h-4" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm ${
                          isLoggedIn ? 'bg-[#f0f5ed] text-[#53645A]/60' : 'bg-white'
                        } ${errors.fullName ? 'border-red-500' : 'border-[#c5d5be]/50'}`}
                        placeholder="Enter your full name"
                        disabled={isLoggedIn}
                        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Email <span className="text-[#53645A]/60 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#53645A]/40 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm ${
                          isLoggedIn ? 'bg-[#f0f5ed] text-[#53645A]/60' : 'bg-white'
                        } ${errors.email ? 'border-red-500' : 'border-[#c5d5be]/50'}`}
                        placeholder="your@email.com (optional)"
                        disabled={isLoggedIn}
                        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Phone Number <span className="text-[#53645A]">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#53645A]/40 w-4 h-4" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm ${
                          errors.phone ? 'border-red-500' : 'border-[#c5d5be]/50'
                        }`}
                        placeholder="01XXXXXXXXX"
                        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.phone}</p>}
                    <p className="text-[10px] text-[#53645A]/60 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Enter a valid Bangladeshi mobile number</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-6">
                <h2 className="text-lg font-medium text-[#263b32] flex items-center gap-2 mb-5" style={{ fontFamily: FONT_FAMILY }}>
                  <FaMapMarkerAlt className="w-5 h-5 text-[#53645A]" />
                  Delivery Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Full Address <span className="text-[#53645A]">*</span>
                    </label>
                    <div className="relative">
                      <FaHome className="absolute left-3 top-3 text-[#53645A]/40 w-4 h-4" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="2"
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition bg-white text-sm resize-none ${
                          errors.address ? 'border-red-500' : 'border-[#c5d5be]/50'
                        }`}
                        placeholder="House #, Road #, Area, City, Zip Code"
                        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                      />
                    </div>
                    {isLoggedIn && user?.address && (
                      <p className="text-xs text-[#53645A] mt-1 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                        <FaCheckCircle className="w-3 h-3" />
                        Your saved address has been pre-filled
                      </p>
                    )}
                    {errors.address && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                        Division <span className="text-[#53645A]">*</span>
                      </label>
                      <SearchableSelect
                        name="division"
                        value={formData.division}
                        onChange={handleInputChange}
                        options={divisionList}
                        placeholder="Select Division"
                        required
                        disabled={false}
                        error={errors.division}
                      />
                      {errors.division && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.division}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                        District/City <span className="text-[#53645A]">*</span>
                      </label>
                      <SearchableSelect
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        options={citiesByDivision}
                        placeholder={formData.division ? "Select District" : "Select Division First"}
                        required
                        disabled={!formData.division}
                        error={errors.city}
                      />
                      {errors.city && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.city}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                        Upazila/Thana <span className="text-[#53645A]">*</span>
                      </label>
                      <SearchableSelect
                        name="zone"
                        value={formData.zone}
                        onChange={handleInputChange}
                        options={zones}
                        placeholder={formData.city ? "Select Upazila/Thana" : "Select District First"}
                        required
                        disabled={!formData.city}
                        error={errors.zone}
                      />
                      {errors.zone && <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{errors.zone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                        Union/Area
                      </label>
                      <SearchableSelect
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        options={areas}
                        placeholder={formData.zone ? "Select Union/Area" : "Select Upazila First"}
                        disabled={!formData.zone}
                        error={errors.area}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#c5d5be]/40 p-6">
                <h2 className="text-lg font-medium text-[#263b32] flex items-center gap-2 mb-4" style={{ fontFamily: FONT_FAMILY}}>
                  <FaFileAlt className="w-5 h-5 text-[#53645A]" />
                  Order Notes <span className="text-sm font-normal text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY }}>(Optional)</span>
                </h2>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-3 border border-[#c5d5be]/50 rounded-xl focus:ring-2 focus:ring-[#53645A] focus:border-transparent outline-none transition text-sm resize-none bg-white hover:border-[#53645A]/30"
                  placeholder="Special instructions for delivery, gift message, etc."
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                />
              </div>
            </div>

            {/* Right Column - Order Summary (COMPACT) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-[#c5d5be]/40 p-3 sticky top-24">
                <h2 className="text-sm font-medium text-[#263b32] flex items-center gap-1.5 mb-2.5" style={{ fontFamily: FONT_FAMILY }}>
                  <FaShoppingBag className="w-3.5 h-3.5 text-[#53645A]" />
                  Order Summary
                </h2>
                
                {/* Grouped Products List - COMPACT */}
                <div className="space-y-2 max-h-[350px] overflow-y-auto mb-3 pr-1">
                  {groupedProducts.map((productGroup) => {
                    const productDetail = productVariants[productGroup.productId];
                    const productImage = productDetail?.images?.[0]?.url || productGroup.image || null;
                    const hasVariants = productDetail?.hasVariants || false;
                    const isProductExpanded = expandedProducts[productGroup.productId] !== false;
                    
                    const variantItems = hasVariants 
                      ? productGroup.variants.filter(v => !v.isBaseProduct)
                      : productGroup.variants;
                    
                    // Check if there's an incomplete selection
                    const hasIncompleteSelection = hasVariants && variantItems.length === 0 && productGroup.variants.length > 0;
                    
                    // If there's no variants and no incomplete selection, skip
                    if (variantItems.length === 0 && !hasIncompleteSelection) return null;
                    
                    const availableVariantsList = getAvailableVariants(productGroup.productId);
                    
                    return (
                      <div
                        key={productGroup.productId}
                        className={`bg-white rounded-lg border ${hasIncompleteSelection ? 'border-orange-400 bg-orange-50/30' : 'border-[#8B9D83]/15'} overflow-hidden hover:border-[#8B9D83]/40 transition-all shadow-sm`}
                      >
                        {/* Product Header - COMPACT */}
                        {hasVariants && (
                          <div className="flex items-start gap-1.5 p-1.5 bg-[#f0f5ed]/80 border-b border-[#8B9D83]/10">
                            <div className="w-8 h-8 bg-[#c5d5be]/20 rounded-lg overflow-hidden border border-[#8B9D83]/20 flex-shrink-0">
                              <img
                                src={productImage || 'https://via.placeholder.com/32?text=P'}
                                alt={productGroup.productName}
                                className="w-full h-full object-contain p-0.5"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/32?text=P';
                                }}
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-[10px] text-[#263b32] line-clamp-1" title={productGroup.productName}>
                                {productGroup.productName}
                              </h3>
                              
                              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                <span className="text-[10px] font-bold text-[#8B9D83]">
                                  ৳{productGroup.subtotal.toFixed(2)}
                                </span>
                                {productGroup.discountPrice > 0 && productGroup.discountPrice < productGroup.regularPrice && (
                                  <span className="text-[8px] text-gray-400 line-through">
                                    ৳{productGroup.regularPrice.toFixed(2)}
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-0.5 text-[8px] text-gray-500 bg-[#c5d5be]/20 px-1 py-0.5 rounded-full">
                                  <Scale className="w-2 h-2" />
                                  /{getUnitLabel(productGroup.unit)}
                                </span>
                                {variantItems.length > 0 && (
                                  <span className="inline-flex items-center gap-0.5 text-[8px] text-[#8B9D83] bg-[#c5d5be]/20 px-1 py-0.5 rounded-full">
                                    <Layers className="w-2 h-2" />
                                    {variantItems.length}
                                  </span>
                                )}
                                {hasIncompleteSelection && (
                                  <span className="inline-flex items-center gap-0.5 text-[8px] text-orange-600 bg-orange-100 px-1 py-0.5 rounded-full">
                                    <AlertCircle className="w-2 h-2" />
                                    Missing Variant
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <button
                              onClick={() => setExpandedProducts(prev => ({ ...prev, [productGroup.productId]: !prev[productGroup.productId] }))}
                              className="p-0.5 text-gray-400 hover:text-[#8B9D83] transition-colors"
                            >
                              {isProductExpanded ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        )}

                        {/* Items Section - COMPACT */}
                        {(!hasVariants || isProductExpanded) && (
                          <div className="p-1.5 space-y-1.5">
                            {/* Incomplete selection warning */}
                            {hasIncompleteSelection && (
                              <div className="p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs text-orange-700 font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                    {productGroup.productName} needs a variant selected
                                  </p>
                                  <Link
                                    href={`/product/${productGroup.productSlug || productGroup.productId}`}
                                    className="text-xs text-orange-600 underline hover:text-orange-800"
                                  >
                                    Go select a variant
                                  </Link>
                                </div>
                              </div>
                            )}

                            {!hasVariants && (
                              <div className="space-y-1">
                                {variantItems.map((variant) => (
                                  <CartItem
                                    key={variant.itemId}
                                    variant={variant}
                                    onUpdate={(newQuantity) => updateCartQuantity(variant.itemId, newQuantity)}
                                    onRemove={() => removeCartItem(variant.itemId)}
                                    isUpdating={isUpdatingCart}
                                    productImage={productImage}
                                    isBaseProduct={true}
                                    productName={productGroup.productName}
                                  />
                                ))}
                              </div>
                            )}

                            {hasVariants && (
                              <>
                                {Object.entries(
                                  variantItems.reduce((acc, v) => {
                                    const key = v.variantId || 'no-variant';
                                    if (!acc[key]) acc[key] = [];
                                    acc[key].push(v);
                                    return acc;
                                  }, {})
                                ).map(([variantId, items]) => {
                                  const representative = items[0];
                                  const availableSubVariants = getAvailableSubVariants(productGroup.productId, variantId);
                                  const hasSubVariants = productDetail?.variantTypes?.some(vt =>
                                    vt.variants?.some(v => 
                                      v.id === variantId && v.subVariants && v.subVariants.length > 0
                                    )
                                  ) || false;
                                  
                                  return (
                                    <div
                                      key={variantId}
                                      className="rounded-lg border border-[#8B9D83]/20 bg-[#faf8f5] overflow-hidden"
                                    >
                                      <div className="flex items-center gap-1 px-2 py-1 bg-[#8B9D83]/8 border-b border-[#8B9D83]/10">
                                        <Layers className="w-2.5 h-2.5 text-[#8B9D83] flex-shrink-0" />
                                        <span className="text-[9px] font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
                                          {representative.variantName || 'Variant'}
                                        </span>
                                        {representative.selectedColor && (
                                          <Circle
                                            className="w-2 h-2 flex-shrink-0"
                                            style={{ color: representative.selectedColor, fill: representative.selectedColor }}
                                          />
                                        )}
                                        {hasSubVariants && (
                                          <span className="text-[8px] text-amber-600 bg-amber-50 px-1 py-0.5 rounded-full">
                                            Has Subs
                                          </span>
                                        )}
                                        <span className="text-[8px] text-gray-400 ml-auto">
                                          {items.filter(i => !i.isBaseProduct).length}
                                        </span>
                                      </div>

                                      <div className="p-1 space-y-1">
                                        {items
                                          .filter(v => !v.isBaseProduct)
                                          .map((variant, index) => (
                                            <div
                                              key={variant.itemId || `variant-${index}-${variant.variantId}`}
                                              className={variant.isSubVariant ? 'ml-2 pl-1.5 border-l border-[#8B9D83]/25' : ''}
                                            >
                                              <CartItem
                                                variant={variant}
                                                onUpdate={(newQuantity) => updateCartQuantity(variant.itemId, newQuantity)}
                                                onRemove={() => removeCartItem(variant.itemId)}
                                                isUpdating={isUpdatingCart}
                                                productImage={productImage}
                                              />
                                            </div>
                                          ))}

                                        {hasSubVariants && availableSubVariants.length > 0 && (
                                          <div className="ml-2 pl-1.5 border-l border-dashed border-[#8B9D83]/20 pt-1">
                                            <p className="text-[8px] text-gray-400 mb-0.5" style={{ fontFamily: FONT_FAMILY }}>
                                              Add sub-variant:
                                            </p>
                                            <div className="flex flex-wrap gap-0.5">
                                              {availableSubVariants.map((subVariant) => {
                                                const isAdding = addingVariant[`${productGroup.productId}_${variantId}_${subVariant.id}`];
                                                return (
                                                  <button
                                                    key={subVariant.id}
                                                    onClick={() =>
                                                      addSpecificSubVariantToCart(
                                                        productGroup.productId,
                                                        variantId,
                                                        subVariant,
                                                        representative.variantName,
                                                        representative.variantType
                                                      )
                                                    }
                                                    disabled={isAdding}
                                                    className="text-[8px] px-1.5 py-0.5 rounded-full border border-[#8B9D83]/30 hover:border-[#8B9D83] text-[#263b32] hover:bg-white transition-all flex items-center gap-0.5 disabled:opacity-50 bg-white/60"
                                                  >
                                                    {isAdding ? (
                                                      <Loader2 className="w-1.5 h-1.5 animate-spin" />
                                                    ) : (
                                                      <Plus className="w-1.5 h-1.5" />
                                                    )}
                                                    {subVariant.name}
                                                    {subVariant.color && (
                                                      <span
                                                        className="inline-block w-1.5 h-1.5 rounded-full"
                                                        style={{ backgroundColor: subVariant.color }}
                                                      />
                                                    )}
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                                
                                {availableVariantsList.length > 0 && (
                                  <div className="pt-1 border-t border-[#8B9D83]/10">
                                    <p className="text-[8px] text-gray-400 mb-0.5" style={{ fontFamily: FONT_FAMILY }}>
                                      Add more variants:
                                    </p>
                                    <div className="flex flex-wrap gap-0.5">
                                      {availableVariantsList.map((v) => {
                                        const isAdding = addingVariant[`${productGroup.productId}_${v.id}`];
                                        const hasSubVariants = v.subVariants && v.subVariants.length > 0;
                                        return (
                                          <button
                                            key={v.id}
                                            onClick={() => {
                                              addVariantToCart(productGroup.productId, {
                                                id: v.id,
                                                name: v.name,
                                                type: v.type,
                                                color: v.color,
                                                regularPrice: v.regularPrice || 0,
                                                discountPrice: v.discountPrice || 0,
                                                image: v.images?.[0] || null,
                                                images: v.images || [],
                                                subVariants: v.subVariants || []
                                              });
                                            }}
                                            disabled={isAdding}
                                            className={`text-[8px] px-1.5 py-0.5 rounded-full border transition-all flex items-center gap-0.5 disabled:opacity-50 ${
                                              hasSubVariants
                                                ? 'border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-400'
                                                : 'border-[#8B9D83]/30 hover:border-[#8B9D83] text-[#263b32] hover:bg-[#f0f5ed]'
                                            }`}
                                          >
                                            {isAdding ? (
                                              <Loader2 className="w-1.5 h-1.5 animate-spin" />
                                            ) : (
                                              <Plus className="w-1.5 h-1.5" />
                                            )}
                                            {v.name}
                                            {v.color && (
                                              <span
                                                className="inline-block w-1.5 h-1.5 rounded-full"
                                                style={{ backgroundColor: v.color }}
                                              />
                                            )}
                                            {hasSubVariants && (
                                              <span className="text-[7px] bg-amber-200 text-amber-700 px-0.5 py-0.5 rounded-full">
                                                {v.subVariants.length} sub
                                              </span>
                                            )}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Totals - Compact */}
                <div className="space-y-1 border-t border-[#c5d5be]/40 pt-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Subtotal</span>
                    <span className="font-medium text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-[#53645A]/60" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Shipping</span>
                    <span className="font-medium text-green-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{shippingCost.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#c5d5be]/40">
                    <span className="text-[#263b32]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Total</span>
                    <span className="text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Color Selection Warning - Compact */}
                {hasColorRequiredItems && (
                  <div className="mt-2 p-1.5 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[9px] text-orange-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Select colors before placing order
                    </p>
                  </div>
                )}

                {/* Missing Variants Warning - Compact */}
                {hasMissingVariants && (
                  <div className="mt-2 p-1.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[9px] text-red-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Select variants before placing order
                    </p>
                  </div>
                )}
                
                {/* Trust Badges - Compact */}
                <div className="mt-2.5 space-y-1 text-[9px]">
                  <div className="flex items-center gap-1.5 text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    <FaShieldAlt className="w-3 h-3 text-[#53645A]" />
                    <span>Safe & Secure Shopping</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    <FaClock className="w-3 h-3 text-[#53645A]" />
                    <span>7-Day Return Policy</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#53645A]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    <Zap className="w-3 h-3 text-[#53645A]" />
                    <span>Free shipping over ৳3000</span>
                  </div>
                </div>
                
                {/* Payment & Place Order */}
                <div className="mt-3">
                  <PaymentSelector
                    onSubmit={handleSubmit}
                    isSubmitting={submitting}
                    disabled={isAdminOrModerator || hasColorRequiredItems || hasMissingVariants}
                  />
                  {(hasColorRequiredItems || hasMissingVariants) && (
                    <p className="text-[9px] text-orange-500 text-center mt-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      {hasMissingVariants ? 'Select all variants before placing order' : 'Select all colors before placing order'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <OrderSuccessModal
        isOpen={showOrderSuccessModal}
        onClose={() => {
          setShowOrderSuccessModal(false);
        }}
        orderId={lastOrderId}
        isLoggedIn={isLoggedIn}
        customerEmail={formData.email}
      />
      
      <Footer />
    </>
  );
}