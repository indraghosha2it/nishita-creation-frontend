
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import {
//   ShoppingCart,
//   Trash2,
//   Plus,
//   Minus,
//   X,
//   CreditCard,
//   ShieldCheck,
//   Loader2,
//   ChevronRight,
//   AlertCircle,
//   AlertTriangle,
//   ShoppingBag,
//   Scale,
//   Check,
//   Palette,
//   Zap,
//   Package,
//   Layers,
//   Circle,
//   ChevronDown,
//   ChevronUp,
//   Gift,
//   Tag,
//   Eye,
//   ShoppingBasket,
//   Image as ImageIcon,
//   ChevronLeft
// } from 'lucide-react';
// import { toast } from 'sonner';

// // Font constants
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

// // Helper function to get unit label
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

// // ========== HELPER: Recalculate Cart Totals ==========
// const recalculateTotals = (items) => {
//   const validItems = items.filter(item => typeof item.quantity === 'number' && item.quantity > 0);
//   const totalItems = validItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
//   const subtotal = validItems.reduce((sum, item) => {
//     let price = 0;
    
//     if (item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '') {
//       if (item.variantDiscountPrice > 0) {
//         price = item.variantDiscountPrice;
//       } else if (item.variantRegularPrice > 0) {
//         price = item.variantRegularPrice;
//       }
//     } else if (item.variantId && item.variantId !== 'null' && item.variantId !== '') {
//       if (item.variantDiscountPrice > 0) {
//         price = item.variantDiscountPrice;
//       } else if (item.variantRegularPrice > 0) {
//         price = item.variantRegularPrice;
//       }
//     }
    
//     if (price === 0) {
//       if (item.discountPrice > 0) {
//         price = item.discountPrice;
//       } else {
//         price = item.regularPrice || 0;
//       }
//     }
    
//     return sum + (price * (item.quantity || 0));
//   }, 0);
//   return { totalItems, subtotal };
// };

// // ========== GROUP ITEMS BY PRODUCT ==========
// const groupItemsByProduct = (items) => {
//   const grouped = {};
  
//   items.forEach(item => {
//     const productId = item.productId.toString();
    
//     if (!grouped[productId]) {
//       grouped[productId] = {
//         productId: item.productId,
//         productName: item.productName,
//         productSlug: item.productSlug,
//         image: item.image,
//         regularPrice: item.regularPrice,
//         discountPrice: item.discountPrice,
//         unit: item.unit || 'pcs',
//         hasVariants: item.hasVariants || false,
//         variants: [],
//         totalQuantity: 0,
//         subtotal: 0,
//         variantTypes: item.variantTypes || []
//       };
//     }
    
//     const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
//     const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');
    
//     let price = 0;
    
//     if (isSubVariant) {
//       if (item.variantDiscountPrice > 0) {
//         price = Number(item.variantDiscountPrice);
//       } else if (item.variantRegularPrice > 0) {
//         price = Number(item.variantRegularPrice);
//       }
//     } else if (isVariant) {
//       if (item.variantDiscountPrice > 0) {
//         price = Number(item.variantDiscountPrice);
//       } else if (item.variantRegularPrice > 0) {
//         price = Number(item.variantRegularPrice);
//       }
//     }
    
//     if (price === 0) {
//       if (item.discountPrice > 0) {
//         price = Number(item.discountPrice);
//       } else {
//         price = Number(item.regularPrice) || 0;
//       }
//     }
    
//     let imageToUse = null;
    
//     if (isSubVariant) {
//       if (item.variantImage && item.variantImage !== '' && item.variantImage !== 'https://via.placeholder.com/32') {
//         imageToUse = item.variantImage;
//       } else if (item.image && item.image !== '' && item.image !== 'https://via.placeholder.com/32') {
//         imageToUse = item.image;
//       }
//     } else if (isVariant) {
//       if (item.variantImage && item.variantImage !== '' && item.variantImage !== 'https://via.placeholder.com/32') {
//         imageToUse = item.variantImage;
//       } else if (item.image && item.image !== '' && item.image !== 'https://via.placeholder.com/32') {
//         imageToUse = item.image;
//       }
//     }
    
//     if (!imageToUse) {
//       imageToUse = item.image || null;
//     }
    
//     const variantInfo = {
//       itemId: item._id,
//       quantity: item.quantity,
//       selectedColor: item.selectedColor || null,
//       variantId: item.variantId || null,
//       variantName: item.variantName || null,
//       variantType: item.variantType || null,
//       subVariantId: item.subVariantId || null,
//       subVariantName: item.subVariantName || null,
//       variantRegularPrice: Number(item.variantRegularPrice) || 0,
//       variantDiscountPrice: Number(item.variantDiscountPrice) || 0,
//       stockQuantity: item.stockQuantity || 0,
//       image: imageToUse,
//       price: price,
//       productImage: item.image,
//       regularPrice: item.regularPrice,
//       discountPrice: item.discountPrice,
//       hasVariants: item.hasVariants || false,
//       isSubVariant: isSubVariant,
//       isVariant: isVariant,
//       isBaseProduct: !isVariant && !isSubVariant
//     };
    
//     grouped[productId].variants.push(variantInfo);
//     grouped[productId].totalQuantity += item.quantity;
//     grouped[productId].subtotal += price * item.quantity;
//   });
  
//   return Object.values(grouped);
// };

// // ========== CART ITEM COMPONENT ==========
// const CartItem = ({ 
//   variant, 
//   onUpdate, 
//   onRemove, 
//   isUpdating,
//   productImage 
// }) => {
//   const getDisplayName = () => {
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
//     <div className="bg-white rounded-lg border border-[#8B9D83]/15 p-2 hover:border-[#8B9D83]/30 transition-all">
//       <div className="flex items-center gap-2">
//         <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#8B9D83]/20 flex-shrink-0 bg-[#f0f5ed]">
//           {variantImage ? (
//             <img
//               src={variantImage}
//               alt={getDisplayName()}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 if (productImage && productImage !== variantImage) {
//                   e.target.src = productImage;
//                 } else {
//                   e.target.src = 'https://via.placeholder.com/40?text=V';
//                 }
//               }}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-[#f0f5ed]">
//               <Package className="w-4 h-4 text-[#8B9D83]/40" />
//             </div>
//           )}
//         </div>

//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-1.5 flex-wrap">
//             <span className="text-xs font-medium text-[#263b32]">
//               {getDisplayName()}
//             </span>
//             {variant.selectedColor && (
//               <span className="inline-flex items-center gap-0.5 text-[9px] text-[#8B9D83]">
//                 <Circle 
//                   className="w-2.5 h-2.5" 
//                   style={{ color: variant.selectedColor, fill: variant.selectedColor }} 
//                 />
//                 {getColorName(variant.selectedColor)}
//               </span>
//             )}
//             {variant.isSubVariant && (
//               <span className="text-[8px] bg-blue-50 text-blue-600 px-1 py-0.5 rounded">Sub</span>
//             )}
//             {variant.isVariant && !variant.isSubVariant && (
//               <span className="text-[8px] bg-purple-50 text-purple-600 px-1 py-0.5 rounded">Variant</span>
//             )}
//           </div>
//           <div className="flex items-center gap-1.5 mt-0.5">
//             <span className="text-xs font-semibold text-[#8B9D83]">
//               ৳{price.toFixed(2)}
//             </span>
//             {hasDiscount && (
//               <span className="text-[9px] text-gray-400 line-through">
//                 ৳{originalPrice.toFixed(2)}
//               </span>
//             )}
//             {hasDiscount && (
//               <span className="text-[8px] text-green-600 font-medium bg-green-50 px-1 py-0.5 rounded">
//                 {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center border border-[#8B9D83]/20 rounded-lg overflow-hidden bg-white flex-shrink-0">
//           <button
//             onClick={() => handleQuantityChange(variant.quantity - 1)}
//             disabled={isUpdating || variant.quantity <= 1}
//             className="w-6 h-6 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
//           >
//             <Minus className="w-2.5 h-2.5" />
//           </button>
          
//           <span className="w-7 text-center text-xs font-medium text-[#263b32]">
//             {variant.quantity}
//           </span>
          
//           <button
//             onClick={() => handleQuantityChange(variant.quantity + 1)}
//             disabled={isUpdating || variant.quantity >= variant.stockQuantity}
//             className="w-6 h-6 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
//           >
//             <Plus className="w-2.5 h-2.5" />
//           </button>
//         </div>

//         <button
//           onClick={onRemove}
//           disabled={isUpdating}
//           className="p-1 text-gray-400/40 hover:text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0 disabled:opacity-50"
//           title="Remove"
//         >
//           <X className="w-3 h-3" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // ========== MAIN CART SIDEBAR COMPONENT ==========
// export default function CartSidebar({ isOpen, onClose }) {
//   const router = useRouter();
//   const [cart, setCart] = useState({ items: [], totalItems: 0, subtotal: 0 });
//   const [loading, setLoading] = useState(true);
//   const [updatingItems, setUpdatingItems] = useState({});
//   const [isClearing, setIsClearing] = useState(false);
//   const [showClearModal, setShowClearModal] = useState(false);
//   const [productVariants, setProductVariants] = useState({});
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [addingVariant, setAddingVariant] = useState({});
//   const [expandedProducts, setExpandedProducts] = useState({});
//   const [expandedVariants, setExpandedVariants] = useState({});
  
//   const isMounted = useRef(true);

//   // Check if user is logged in
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   // Listen for auth changes
//   useEffect(() => {
//     const handleAuthChange = () => {
//       const token = localStorage.getItem('token');
//       const newIsLoggedIn = !!token;
//       setIsLoggedIn(newIsLoggedIn);
//       if (newIsLoggedIn && isOpen) {
//         fetchCart();
//       }
//     };

//     window.addEventListener('auth-change', handleAuthChange);
//     window.addEventListener('storage', (e) => {
//       if (e.key === 'token') {
//         handleAuthChange();
//       }
//     });

//     return () => {
//       window.removeEventListener('auth-change', handleAuthChange);
//       window.removeEventListener('storage', handleAuthChange);
//     };
//   }, [isOpen]);

//   // Fetch product variants
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

//   // ========== FETCH CART ==========
//   const fetchCart = async () => {
//     if (!isMounted.current) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       let sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (!token && !sessionId) {
//         sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//         localStorage.setItem('cartSessionId', sessionId);
//       }
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//         const response = await fetch('http://localhost:5000/api/cart/user', { headers });
//         const data = await response.json();
        
//         if (!isMounted.current) return;
        
//         if (data.success) {
//           setCart(data.data);
//           const details = await fetchProductDetails(data.data.items || []);
//           setProductVariants(details);
//         } else {
//           setCart({ items: [], totalItems: 0, subtotal: 0 });
//         }
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//         const response = await fetch('http://localhost:5000/api/cart', { headers });
//         const data = await response.json();
        
//         if (!isMounted.current) return;
        
//         if (data.success) {
//           setCart(data.data);
//           const details = await fetchProductDetails(data.data.items || []);
//           setProductVariants(details);
//         } else {
//           if (data.error === 'Session not found' || data.error === 'Invalid session') {
//             localStorage.removeItem('cartSessionId');
//             await fetchCart();
//             return;
//           }
//           setCart({ items: [], totalItems: 0, subtotal: 0 });
//         }
//       }
//     } catch (error) {
//       console.error('Fetch cart error:', error);
//       if (isMounted.current) {
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
//       }
//     } finally {
//       if (isMounted.current) {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     isMounted.current = true;
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       setLoading(true);
//       fetchCart();
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (isOpen) {
//         fetchCart();
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [isOpen]);

//   // ========== UPDATE QUANTITY ==========
//   const updateQuantity = async (itemId, newQuantity) => {
//     if (isNaN(newQuantity) || newQuantity === null || newQuantity === '') {
//       return;
//     }
    
//     const parsedQuantity = parseInt(newQuantity, 10);
    
//     if (parsedQuantity < 1) {
//       removeItem(itemId);
//       return;
//     }
    
//     const currentItem = cart.items.find(item => item._id === itemId);
//     if (currentItem && parsedQuantity > currentItem.stockQuantity) {
//       toast.error(`Only ${currentItem.stockQuantity} items available`);
//       return;
//     }
    
//     setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
//     const previousCart = { ...cart };
    
//     setCart(prevCart => {
//       const updatedItems = prevCart.items.map(item => {
//         if (item._id === itemId) {
//           return { ...item, quantity: parsedQuantity };
//         }
//         return item;
//       });
//       const { totalItems, subtotal } = recalculateTotals(updatedItems);
//       return { ...prevCart, items: updatedItems, totalItems, subtotal };
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
//         body: JSON.stringify({ quantity: parsedQuantity })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         setCart(previousCart);
//         toast.error(data.error || 'Failed to update');
//       }
//     } catch (error) {
//       console.error('Update error:', error);
//       setCart(previousCart);
//       toast.error('Failed to update');
//     } finally {
//       setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
//     }
//   };

//   // ========== REMOVE ITEM ==========
//   const removeItem = async (itemId) => {
//     setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
//     const previousCart = { ...cart };
    
//     setCart(prevCart => {
//       const updatedItems = prevCart.items.filter(item => item._id !== itemId);
//       const { totalItems, subtotal } = recalculateTotals(updatedItems);
//       return { ...prevCart, items: updatedItems, totalItems, subtotal };
//     });
    
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
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Item removed');
//       } else {
//         setCart(previousCart);
//         toast.error(data.error || 'Failed to remove');
//       }
//     } catch (error) {
//       console.error('Remove error:', error);
//       setCart(previousCart);
//       toast.error('Failed to remove');
//     } finally {
//       setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
//     }
//   };

//   // ========== REMOVE ALL VARIANTS OF A PRODUCT ==========
//   const removeProduct = async (productId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/product/${productId}`, {
//         method: 'DELETE',
//         headers
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Product removed from cart');
//       } else {
//         toast.error(data.error || 'Failed to remove product');
//       }
//     } catch (error) {
//       console.error('Remove product error:', error);
//       toast.error('Failed to remove product');
//     }
//   };

//   // ========== ADD NEW VARIANT TO CART ==========
//   const addVariantToCart = async (productId, variant) => {
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
      
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           productId: productId,
//           quantity: 1,
//           variantId: variant.id,
//           variantName: variant.name,
//           variantType: variant.type,
//           selectedColor: variant.color || null,
//           variantRegularPrice: variantRegularPrice,
//           variantDiscountPrice: variantDiscountPrice,
//           image: variantImage,
//           variantImage: variantImage
//         })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success(`${variant.name} added to cart`);
//       } else {
//         toast.error(data.error || 'Failed to add variant');
//       }
//     } catch (error) {
//       console.error('Add variant error:', error);
//       toast.error('Failed to add variant');
//     } finally {
//       setAddingVariant(prev => ({ ...prev, [key]: false }));
//     }
//   };

//   // ========== ADD SUB-VARIANT TO CART ==========
//   const addSubVariantToCart = async (productId, variantId, subVariant, parentVariantName, parentVariantType) => {
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
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success(`${subVariant.name} added to cart`);
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

//   // ========== CLEAR CART ==========
//   const clearCart = async () => {
//     setIsClearing(true);
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       } else {
//         toast.error('No session found');
//         setIsClearing(false);
//         return;
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'DELETE',
//         headers
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Cart cleared successfully');
//         setShowClearModal(false);
//       } else {
//         toast.error(data.error || 'Failed to clear cart');
//       }
//     } catch (error) {
//       console.error('Clear cart error:', error);
//       toast.error('Failed to clear cart');
//     } finally {
//       setIsClearing(false);
//     }
//   };

//   // ========== CHECKOUT ==========
//   const proceedToCheckout = () => {
//     if (!cart?.items?.length) {
//       toast.error('Your cart is empty');
//       return;
//     }
    
//     const itemsNeedingColor = cart.items.filter(item => {
//       const productDetail = productVariants[item.productId];
//       if (!productDetail || !productDetail.colors || productDetail.colors.length === 0) return false;
      
//       const hasValidColor = item.selectedColor && 
//                            item.selectedColor !== '' && 
//                            item.selectedColor !== null && 
//                            item.selectedColor !== 'null' && 
//                            item.selectedColor !== 'undefined';
      
//       return !hasValidColor;
//     });
    
//     const itemsNeedingVariant = cart.items.filter(item => {
//       const productDetail = productVariants[item.productId];
//       if (productDetail && productDetail.hasVariants) {
//         return !item.variantId || item.variantId === '' || item.variantId === 'null';
//       }
//       return false;
//     });
    
//     const outOfStockItems = cart.items.filter(item => item.stockQuantity <= 0);
    
//     if (itemsNeedingColor.length > 0) {
//       toast.error(
//         <div className="space-y-1">
//           <p className="font-semibold">Please select colors for:</p>
//           <ul className="text-xs space-y-0.5 list-disc list-inside">
//             {itemsNeedingColor.slice(0, 3).map((item, i) => (
//               <li key={i}>{item.productName}</li>
//             ))}
//             {itemsNeedingColor.length > 3 && (
//               <li>And {itemsNeedingColor.length - 3} more item(s)...</li>
//             )}
//           </ul>
//           <p className="text-xs text-gray-500 mt-1">Click on a color swatch to select</p>
//         </div>,
//         { duration: 5000 }
//       );
//       return;
//     }
    
//     if (itemsNeedingVariant.length > 0) {
//       toast.error(
//         <div className="space-y-1">
//           <p className="font-semibold">Please select variants for:</p>
//           <ul className="text-xs space-y-0.5 list-disc list-inside">
//             {itemsNeedingVariant.slice(0, 3).map((item, i) => (
//               <li key={i}>{item.productName}</li>
//             ))}
//             {itemsNeedingVariant.length > 3 && (
//               <li>And {itemsNeedingVariant.length - 3} more item(s)...</li>
//             )}
//           </ul>
//           <p className="text-xs text-gray-500 mt-1">Please update variant selections in product page</p>
//         </div>,
//         { duration: 5000 }
//       );
//       return;
//     }
    
//     if (outOfStockItems.length > 0) {
//       toast.error(
//         <div className="space-y-1">
//           <p className="font-semibold">Some items are out of stock:</p>
//           <ul className="text-xs space-y-0.5 list-disc list-inside">
//             {outOfStockItems.slice(0, 3).map((item, i) => (
//               <li key={i}>{item.productName}</li>
//             ))}
//             {outOfStockItems.length > 3 && (
//               <li>And {outOfStockItems.length - 3} more item(s)...</li>
//             )}
//           </ul>
//           <p className="text-xs text-gray-500 mt-1">Please remove these items to proceed</p>
//         </div>,
//         { duration: 5000 }
//       );
//       return;
//     }
    
//     onClose();
//     router.push('/checkout');
//   };

//   const handleShopNow = () => {
//     onClose();
//     router.push('/products');
//   };

//   // ========== GROUP ITEMS ==========
//   const groupedProducts = cart.items.length > 0 ? groupItemsByProduct(cart.items) : [];
  
//   const hasMissingColors = cart.items.some(item => {
//     const productDetail = productVariants[item.productId];
//     if (!productDetail || !productDetail.colors || productDetail.colors.length === 0) return false;
    
//     const hasValidColor = item.selectedColor && 
//                          item.selectedColor !== '' && 
//                          item.selectedColor !== null && 
//                          item.selectedColor !== 'null' && 
//                          item.selectedColor !== 'undefined';
    
//     return !hasValidColor;
//   });

//   const hasMissingVariants = cart.items.some(item => {
//     const productDetail = productVariants[item.productId];
//     if (productDetail && productDetail.hasVariants) {
//       return !item.variantId || item.variantId === '' || item.variantId === 'null';
//     }
//     return false;
//   });

//   const hasOutOfStockItems = cart.items.some(item => item.stockQuantity <= 0);
//   const canCheckout = !hasMissingColors && !hasMissingVariants && !hasOutOfStockItems && cart.items.length > 0;

//   const toggleProductExpand = (productId) => {
//     setExpandedProducts(prev => ({ ...prev, [productId]: !prev[productId] }));
//   };

//   const toggleVariantExpand = (variantId) => {
//     setExpandedVariants(prev => ({ ...prev, [variantId]: !prev[variantId] }));
//   };

//   const getAvailableVariants = (productId, productDetail) => {
//     if (!productDetail?.variantTypes) return [];
    
//     const cartVariantIds = cart.items
//       .filter(item => item.productId.toString() === productId)
//       .map(item => item.variantId)
//       .filter(id => id);
    
//     const available = [];
//     productDetail.variantTypes.forEach(vt => {
//       vt.variants.forEach(v => {
//         if (!cartVariantIds.includes(v.id)) {
//           available.push({ ...v, type: vt.type });
//         }
//       });
//     });
//     return available;
//   };

//   const getAvailableSubVariants = (productId, variantId, productDetail) => {
//     if (!productDetail?.variantTypes) return [];
    
//     let targetVariant = null;
//     productDetail.variantTypes.forEach(vt => {
//       vt.variants.forEach(v => {
//         if (v.id === variantId) {
//           targetVariant = v;
//         }
//       });
//     });
    
//     if (!targetVariant || !targetVariant.subVariants) return [];
    
//     const cartSubVariantIds = cart.items
//       .filter(item => 
//         item.productId.toString() === productId && 
//         item.variantId === variantId
//       )
//       .map(item => item.subVariantId)
//       .filter(id => id);
    
//     return targetVariant.subVariants.filter(sv => !cartSubVariantIds.includes(sv.id));
//   };

//   const productHasVariants = (productId) => {
//     const detail = productVariants[productId];
//     return detail?.hasVariants || false;
//   };

//   return (
//     <>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '100%' }}
//             transition={{ type: 'tween', duration: 0.3 }}
//             className="fixed right-0 top-0 h-full bg-white shadow-2xl z-[9999] flex flex-col w-[85%] sm:w-[400px] md:w-[450px] lg:w-[33.333%]"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-3 sm:p-4 border-b border-[#8B9D83]/20 bg-white flex-shrink-0">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] flex items-center justify-center shadow-lg shadow-[#8B9D83]/25">
//                   <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-base sm:text-lg font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//                     Your Shopping Bag
//                   </h2>
//                   <p className="text-[8px] sm:text-[9px] text-[#8B9D83] -mt-0.5" style={{ fontFamily: FONT_FAMILY }}>
//                     Beauty Bucket
//                   </p>
//                 </div>
//                 {cart.totalItems > 0 && (
//                   <span className="bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
//                     {cart.totalItems}
//                   </span>
//                 )}
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-1.5 sm:p-2 rounded-full hover:bg-[#c5d5be]/20 transition-colors"
//               >
//                 <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-[#263b32] transition-colors" />
//               </button>
//             </div>

//             {/* Cart Items */}
//             <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-[#f0f5ed]">
//               {loading ? (
//                 <div className="flex items-center justify-center py-20">
//                   <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#8B9D83] animate-spin" />
//                 </div>
//               ) : cart.items.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-1 md:mb-1 md:ml-32">
//                     <DotLottieReact
//                       src="/animations/shopping-cart.lottie"
//                       loop
//                       autoplay
//                       className="w-20 h-20 md:w-28 md:h-28"
//                     />
//                   </div>
//                   <p className="text-sm sm:text-base text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                     Your Shopping Bag is empty
//                   </p>
//                   <p className="text-xs text-[#8B9D83]/60 mb-4 sm:mb-6" style={{ fontFamily: FONT_FAMILY }}>
//                     Start shopping for amazing beauty products!
//                   </p>
//                   <button
//                     onClick={handleShopNow}
//                     className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/30 transition-all transform hover:scale-105"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
//                     Start Shopping
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-3 sm:space-y-4">
//                   {groupedProducts.map((productGroup) => {
//                     const productDetail = productVariants[productGroup.productId];
//                     const productImage = productDetail?.images?.[0]?.url || productGroup.image || null;
//                     const availableVariants = getAvailableVariants(productGroup.productId, productDetail);
//                     const hasVariants = productHasVariants(productGroup.productId);
//                     const isProductExpanded = expandedProducts[productGroup.productId] !== false;
                    
//                     // ✅ Filter out base product items (no variant selected)
//                     const variantItems = productGroup.variants.filter(v => !v.isBaseProduct);
                    
//                     // ✅ If there are no variant items and no available variants, skip this product
//                     if (variantItems.length === 0 && availableVariants.length === 0) {
//                       return null;
//                     }
                    
//                     return (
//                       <div
//                         key={productGroup.productId}
//                         className="bg-white rounded-xl border border-[#8B9D83]/15 overflow-hidden hover:border-[#8B9D83]/40 transition-all shadow-sm hover:shadow-md"
//                       >
//                         {/* Product Header */}
//                         <div className="flex items-start gap-2 p-2 sm:p-3 bg-[#f0f5ed]/80 border-b border-[#8B9D83]/10">
//                           <Link href={`/product/${productGroup.productSlug || productGroup.productId}`}>
//                             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#c5d5be]/20 rounded-lg overflow-hidden border border-[#8B9D83]/20 flex-shrink-0">
//                               <img
//                                 src={productImage || 'https://via.placeholder.com/64?text=Product'}
//                                 alt={productGroup.productName}
//                                 className="w-full h-full object-contain p-0.5 sm:p-1"
//                                 onError={(e) => {
//                                   e.target.src = 'https://via.placeholder.com/64?text=Product';
//                                 }}
//                               />
//                             </div>
//                           </Link>
                          
//                           <div className="flex-1 min-w-0">
//                             <Link href={`/product/${productGroup.productSlug || productGroup.productId}`}>
//                               <h3 className="font-semibold text-xs sm:text-sm text-[#263b32] hover:text-[#8B9D83] transition-colors line-clamp-2" title={productGroup.productName}>
//                                 {productGroup.productName}
//                               </h3>
//                             </Link>
                            
//                             <div className="flex items-center gap-2 mt-0.5 flex-wrap">
//                               <span className="text-sm sm:text-base font-bold text-[#8B9D83]">
//                                 ৳{productGroup.subtotal.toFixed(2)}
//                               </span>
//                               {productGroup.discountPrice > 0 && productGroup.discountPrice < productGroup.regularPrice && (
//                                 <span className="text-[10px] sm:text-xs text-gray-400 line-through">
//                                   ৳{productGroup.regularPrice.toFixed(2)}
//                                 </span>
//                               )}
//                               <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-gray-500 bg-[#c5d5be]/20 px-1.5 py-0.5 rounded-full">
//                                 <Scale className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//                                 /{getUnitLabel(productGroup.unit)}
//                               </span>
//                               {variantItems.length > 0 && (
//                                 <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-[#8B9D83] bg-[#c5d5be]/20 px-1.5 py-0.5 rounded-full">
//                                   <Layers className="w-2.5 h-2.5" />
//                                   {variantItems.length} {variantItems.length > 1 ? 'variants' : 'variant'}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
                          
//                           <div className="flex items-center gap-1">
//                             {hasVariants && (
//                               <button
//                                 onClick={() => toggleProductExpand(productGroup.productId)}
//                                 className="p-1 text-gray-400 hover:text-[#8B9D83] transition-colors"
//                               >
//                                 {isProductExpanded ? (
//                                   <ChevronUp className="w-4 h-4" />
//                                 ) : (
//                                   <ChevronDown className="w-4 h-4" />
//                                 )}
//                               </button>
//                             )}
//                             <button
//                               onClick={() => removeProduct(productGroup.productId)}
//                               className="p-1 text-gray-400/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
//                               title="Remove product"
//                             >
//                               <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             </button>
//                           </div>
//                         </div>

//                       {/* Variants Section */}



// {/* Variants Section */}
// {(!hasVariants || isProductExpanded) && (
//   <div className="p-2 sm:p-3 space-y-2.5">
//     {/* Group items by variantId so sub-variants nest under their parent variant */}
//     {Object.entries(
//       variantItems.reduce((acc, v) => {
//         const key = v.variantId || 'no-variant';
//         if (!acc[key]) acc[key] = [];
//         acc[key].push(v);
//         return acc;
//       }, {})
//     ).map(([variantId, items]) => {
//       const representative = items[0];
//       const availableSubVariants = getAvailableSubVariants(
//         productGroup.productId,
//         variantId,
//         productDetail
//       );

//       // ✅ Check if this variant has sub-variants (from product data)
//       const hasSubVariants = productDetail?.variantTypes?.some(vt =>
//         vt.variants?.some(v => 
//           v.id === variantId && v.subVariants && v.subVariants.length > 0
//         )
//       ) || false;

//       return (
//         <div
//           key={variantId}
//           className="rounded-lg border border-[#8B9D83]/20 bg-[#faf8f5] overflow-hidden"
//         >
//           {/* Variant group header - NO quantity selector here */}
//           <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#8B9D83]/8 border-b border-[#8B9D83]/10">
//             <Layers className="w-3 h-3 text-[#8B9D83] flex-shrink-0" />
//             <span className="text-[11px] font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//               {representative.variantName || 'Variant'}
//             </span>
//             {representative.selectedColor && (
//               <Circle
//                 className="w-2.5 h-2.5 flex-shrink-0"
//                 style={{ color: representative.selectedColor, fill: representative.selectedColor }}
//               />
//             )}
//             {hasSubVariants && (
//               <span className="text-[9px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
//                 Select sub-variants below
//               </span>
//             )}
//             <span className="text-[9px] text-gray-400 ml-auto">
//               {items.filter(i => !i.isBaseProduct).length} {items.filter(i => !i.isBaseProduct).length > 1 ? 'options' : 'option'} added
//             </span>
//           </div>

//           <div className="p-1.5 space-y-1.5">
//             {/* Each added line — sub-variants get an indent + connector to show hierarchy */}
//             {items
//               .filter(v => !v.isBaseProduct) // ✅ Filter out base product items
//               .map((variant, index) => (
//                 <div
//                   key={variant.itemId || `variant-${index}-${variant.variantId}`}
//                   className={variant.isSubVariant ? 'ml-3 pl-2 border-l-2 border-[#8B9D83]/25' : ''}
//                 >
//                   {/* ✅ Only show CartItem for actual added items, not headers */}
//                   <CartItem
//                     variant={variant}
//                     onUpdate={(newQuantity) => updateQuantity(variant.itemId, newQuantity)}
//                     onRemove={() => removeItem(variant.itemId)}
//                     isUpdating={updatingItems[variant.itemId] || false}
//                     productImage={productImage}
//                   />
//                 </div>
//               ))}

//             {/* ✅ Available sub-variants that can be added */}
//             {hasSubVariants && availableSubVariants.length > 0 && (
//               <div className="ml-3 pl-2 border-l-2 border-dashed border-[#8B9D83]/20 pt-1">
//                 <p className="text-[9px] text-gray-400 mb-1" style={{ fontFamily: FONT_FAMILY }}>
//                   Add sub-variant:
//                 </p>
//                 <div className="flex flex-wrap gap-1">
//                   {availableSubVariants.map((subVariant) => {
//                     const isAdding = addingVariant[`${productGroup.productId}_${variantId}_${subVariant.id}`];
//                     return (
//                       <button
//                         key={subVariant.id}
//                         onClick={() =>
//                           addSubVariantToCart(
//                             productGroup.productId,
//                             variantId,
//                             subVariant,
//                             representative.variantName,
//                             representative.variantType
//                           )
//                         }
//                         disabled={isAdding}
//                         className="text-[9px] px-2 py-1 rounded-full border border-[#8B9D83]/30 hover:border-[#8B9D83] text-[#263b32] hover:bg-white transition-all flex items-center gap-1 disabled:opacity-50 bg-white/60"
//                       >
//                         {isAdding ? (
//                           <Loader2 className="w-2 h-2 animate-spin" />
//                         ) : (
//                           <Plus className="w-2 h-2" />
//                         )}
//                         {subVariant.name}
//                         {subVariant.color && (
//                           <span
//                             className="inline-block w-2 h-2 rounded-full"
//                             style={{ backgroundColor: subVariant.color }}
//                           />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     })}

//     {/* Add a whole new variant (e.g. a new color the user hasn't picked yet) */}
//     {hasVariants && availableVariants.length > 0 && (
//       <div className={variantItems.filter(v => !v.isBaseProduct).length > 0 ? 'pt-1 border-t border-[#8B9D83]/10' : ''}>
//         <p className="text-[9px] text-gray-400 mb-1.5" style={{ fontFamily: FONT_FAMILY }}>
//           {variantItems.filter(v => !v.isBaseProduct).length === 0 ? 'Select a variant:' : 'Add more variants:'}
//         </p>
//         <div className="flex flex-wrap gap-1">
//           {availableVariants.map((v) => {
//             const isAdding = addingVariant[`${productGroup.productId}_${v.id}`];
//             // ✅ Check if this variant has sub-variants
//             const hasSubVariants = v.subVariants && v.subVariants.length > 0;
//             return (
//               <button
//                 key={v.id}
//                 onClick={() => {
//                   if (hasSubVariants) {
//                     toast.info('Please select sub-variants for this variant');
//                     // Expand the variant to show sub-variants
//                     toggleVariantExpand(v.id);
//                     return;
//                   }
//                   addVariantToCart(productGroup.productId, {
//                     id: v.id,
//                     name: v.name,
//                     type: v.type,
//                     color: v.color,
//                     regularPrice: v.regularPrice || 0,
//                     discountPrice: v.discountPrice || 0,
//                     image: v.images?.[0] || null,
//                     images: v.images || []
//                   });
//                 }}
//                 disabled={isAdding}
//                 className={`text-[9px] px-2 py-1 rounded-full border transition-all flex items-center gap-1 disabled:opacity-50 ${
//                   hasSubVariants
//                     ? 'border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-400'
//                     : 'border-[#8B9D83]/30 hover:border-[#8B9D83] text-[#263b32] hover:bg-[#f0f5ed]'
//                 }`}
//               >
//                 {isAdding ? (
//                   <Loader2 className="w-2 h-2 animate-spin" />
//                 ) : (
//                   <Plus className="w-2 h-2" />
//                 )}
//                 {v.name}
//                 {v.color && (
//                   <span
//                     className="inline-block w-2 h-2 rounded-full"
//                     style={{ backgroundColor: v.color }}
//                   />
//                 )}
//                 {hasSubVariants && (
//                   <span className="text-[8px] bg-amber-200 text-amber-700 px-1 py-0.5 rounded-full">
//                     {v.subVariants.length} sub
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     )}

//     {/* Nothing selected yet, nothing to select */}
//     {hasVariants && variantItems.filter(v => !v.isBaseProduct).length === 0 && availableVariants.length === 0 && (
//       <div className="text-center py-4 text-gray-400 text-xs" style={{ fontFamily: FONT_FAMILY }}>
//         <AlertCircle className="w-5 h-5 mx-auto mb-1 text-gray-300" />
//         <p>No variants available for this product</p>
//       </div>
//     )}
//   </div>
// )}
//                       </div>
//                     );
//                   })}
                  
//                   {/* Clear Cart Button */}
//                   <button
//                     onClick={() => setShowClearModal(true)}
//                     disabled={isClearing}
//                     className="text-gray-400/60 hover:text-red-500 text-xs sm:text-sm transition-colors mt-2 block text-center w-full py-1.5 sm:py-2 hover:bg-red-50 rounded-lg"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     {isClearing ? (
//                       <span className="flex items-center justify-center gap-1.5 sm:gap-2">
//                         <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-[#8B9D83]" />
//                         Clearing...
//                       </span>
//                     ) : (
//                       'Clear Cart'
//                     )}
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Order Summary */}
//             {cart.items.length > 0 && (
//               <div className="border-t border-[#8B9D83]/20 p-3 sm:p-4 bg-white flex-shrink-0">
//                 {(hasMissingColors || hasMissingVariants || hasOutOfStockItems) && (
//                   <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
//                     {hasMissingColors && (
//                       <div className="flex items-start gap-2 mb-1.5">
//                         <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
//                         <div>
//                           <p className="text-[10px] sm:text-xs text-orange-600 font-medium" style={{ fontFamily: FONT_FAMILY }}>
//                             Please select colors for all items
//                           </p>
//                           <p className="text-[9px] sm:text-[10px] text-orange-500" style={{ fontFamily: FONT_FAMILY }}>
//                             Click on color swatches above to select
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                     {hasMissingVariants && (
//                       <div className="flex items-start gap-2 mb-1.5">
//                         <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
//                         <div>
//                           <p className="text-[10px] sm:text-xs text-orange-600 font-medium" style={{ fontFamily: FONT_FAMILY }}>
//                             Please select variants for all items
//                           </p>
//                           <p className="text-[9px] sm:text-[10px] text-orange-500" style={{ fontFamily: FONT_FAMILY }}>
//                             Update variant selections in product page
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                     {hasOutOfStockItems && (
//                       <div className="flex items-start gap-2">
//                         <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
//                         <div>
//                           <p className="text-[10px] sm:text-xs text-red-600 font-medium" style={{ fontFamily: FONT_FAMILY }}>
//                             Some items are out of stock
//                           </p>
//                           <p className="text-[9px] sm:text-[10px] text-red-500" style={{ fontFamily: FONT_FAMILY }}>
//                             Please remove out of stock items to proceed
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <div className="flex justify-between items-center mb-4">
//                   <span className="font-semibold text-[#263b32] text-base sm:text-lg" style={{ fontFamily: FONT_FAMILY }}>
//                     Total Amount
//                   </span>
//                   <span className="font-bold text-xl sm:text-2xl text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
//                     ৳{cart.subtotal.toFixed(2)}
//                   </span>
//                 </div>
                
//                 <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
//                   <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-green-600" style={{ fontFamily: FONT_FAMILY }}>
//                     <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
//                     <span>Secure checkout &amp; 7-day returns</span>
//                   </div>
//                   <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
//                     <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
//                     <span>Free shipping on orders over ৳3000</span>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={proceedToCheckout}
//                   disabled={!canCheckout}
//                   className={`w-full mt-3 sm:mt-4 py-2.5 sm:py-3 font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
//                     !canCheckout 
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                       : 'bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white hover:shadow-lg hover:shadow-[#8B9D83]/30 transition-all hover:scale-[1.02]'
//                   }`}
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   {!canCheckout ? 'Please Fix Issues' : 'Proceed to Checkout'}
//                   {canCheckout && <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Clear Cart Confirmation Modal */}
//       <AnimatePresence>
//         {showClearModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
//             onClick={() => setShowClearModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: 'spring', damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border border-[#8B9D83]/20"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
//                     <AlertTriangle className="w-7 h-7 text-red-500" />
//                   </div>
//                 </div>
                
//                 <h3 className="text-xl font-bold text-center text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                   Clear Bag?
//                 </h3>
                
//                 <p className="text-[#8B9D83]/60 text-center mb-6 text-sm" style={{ fontFamily: FONT_FAMILY }}>
//                   Are you sure you want to remove all items from your Bag? This action cannot be undone.
//                 </p>
                
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setShowClearModal(false)}
//                     className="flex-1 px-4 py-2.5 border border-[#8B9D83]/30 text-[#263b32] font-medium rounded-full hover:bg-[#f0f5ed] transition-colors"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={clearCart}
//                     disabled={isClearing}
//                     className="flex-1 px-4 py-2.5 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     {isClearing ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Clearing...
//                       </>
//                     ) : (
//                       'Yes, Clear Cart'
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  X,
  CreditCard,
  ShieldCheck,
  Loader2,
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  ShoppingBag,
  Scale,
  Check,
  Palette,
  Zap,
  Package,
  Layers,
  Circle,
  ChevronDown,
  ChevronUp,
  Gift,
  Tag,
  Eye,
  ShoppingBasket,
  Image as ImageIcon,
  ChevronLeft
} from 'lucide-react';
import { toast } from 'sonner';

// Font constants
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

// Helper function to get unit label
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

// ========== HELPER: Recalculate Cart Totals ==========
const recalculateTotals = (items) => {
  const validItems = items.filter(item => typeof item.quantity === 'number' && item.quantity > 0);
  const totalItems = validItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = validItems.reduce((sum, item) => {
    let price = 0;
    
    const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
    const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');
    
    if (isSubVariant) {
      if (item.variantDiscountPrice > 0) {
        price = item.variantDiscountPrice;
      } else if (item.variantRegularPrice > 0) {
        price = item.variantRegularPrice;
      }
    } else if (isVariant) {
      if (item.variantDiscountPrice > 0) {
        price = item.variantDiscountPrice;
      } else if (item.variantRegularPrice > 0) {
        price = item.variantRegularPrice;
      }
    }
    
    if (price === 0) {
      if (item.discountPrice > 0) {
        price = item.discountPrice;
      } else {
        price = item.regularPrice || 0;
      }
    }
    
    return sum + (price * (item.quantity || 0));
  }, 0);
  return { totalItems, subtotal };
};

// ========== GROUP ITEMS BY PRODUCT ==========
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
        variantTypes: item.variantTypes || []
      };
    }
    
    const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
    const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');
    
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
    
    // const variantInfo = {
    //   itemId: item._id,
    //   quantity: item.quantity,
    //   selectedColor: item.selectedColor || null,
    //   variantId: item.variantId || null,
    //   variantName: item.variantName || null,
    //   variantType: item.variantType || null,
    //   subVariantId: item.subVariantId || null,
    //   subVariantName: item.subVariantName || null,
    //   variantRegularPrice: Number(item.variantRegularPrice) || 0,
    //   variantDiscountPrice: Number(item.variantDiscountPrice) || 0,
    //   stockQuantity: item.stockQuantity || 0,
    //   image: imageToUse,
    //   price: price,
    //   productImage: item.image,
    //   regularPrice: item.regularPrice,
    //   discountPrice: item.discountPrice,
    //   hasVariants: item.hasVariants || false,
    //   isSubVariant: isSubVariant,
    //   isVariant: isVariant,
    //   isBaseProduct: !isVariant && !isSubVariant
    // };
    // ✅ Determine display prices:
// - If variant / sub-variant: use variantRegularPrice / variantDiscountPrice
// - If base product: fall back to product regularPrice / discountPrice
const isVariantOrSub = isVariant || isSubVariant;

const displayRegularPrice = isVariantOrSub
  ? Number(item.variantRegularPrice) || 0
  : Number(item.regularPrice) || 0;

const displayDiscountPrice = isVariantOrSub
  ? Number(item.variantDiscountPrice) || 0
  : Number(item.discountPrice) || 0;

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
  // ✅ Use the display prices we just resolved
  regularPrice: displayRegularPrice,
  discountPrice: displayDiscountPrice,
  hasVariants: item.hasVariants || false,
  isSubVariant: isSubVariant,
  isVariant: isVariant,
  isBaseProduct: !isVariant && !isSubVariant
};
    
    grouped[productId].variants.push(variantInfo);
    grouped[productId].totalQuantity += item.quantity;
    grouped[productId].subtotal += price * item.quantity;
  });
  
  return Object.values(grouped);
};

// ========== MAIN CART SIDEBAR COMPONENT ==========
export default function CartSidebar({ isOpen, onClose }) {
  const router = useRouter();
  const [cart, setCart] = useState({ items: [], totalItems: 0, subtotal: 0 });
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState({});
  const [isClearing, setIsClearing] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [productVariants, setProductVariants] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addingVariant, setAddingVariant] = useState({});
  const [expandedProducts, setExpandedProducts] = useState({});
  
  const isMounted = useRef(true);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('token');
      const newIsLoggedIn = !!token;
      setIsLoggedIn(newIsLoggedIn);
      if (newIsLoggedIn && isOpen) {
        fetchCart();
      }
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'token') {
        handleAuthChange();
      }
    });

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [isOpen]);

  // Fetch product variants
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

  // ========== FETCH CART ==========
  const fetchCart = async () => {
    if (!isMounted.current) return;
    
    try {
      const token = localStorage.getItem('token');
      let sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (!token && !sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('cartSessionId', sessionId);
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        const response = await fetch('http://localhost:5000/api/cart/user', { headers });
        const data = await response.json();
        
        if (!isMounted.current) return;
        
        if (data.success) {
          setCart(data.data);
          const details = await fetchProductDetails(data.data.items || []);
          setProductVariants(details);
        } else {
          setCart({ items: [], totalItems: 0, subtotal: 0 });
        }
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
        const response = await fetch('http://localhost:5000/api/cart', { headers });
        const data = await response.json();
        
        if (!isMounted.current) return;
        
        if (data.success) {
          setCart(data.data);
          const details = await fetchProductDetails(data.data.items || []);
          setProductVariants(details);
        } else {
          if (data.error === 'Session not found' || data.error === 'Invalid session') {
            localStorage.removeItem('cartSessionId');
            await fetchCart();
            return;
          }
          setCart({ items: [], totalItems: 0, subtotal: 0 });
        }
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
      if (isMounted.current) {
        setCart({ items: [], totalItems: 0, subtotal: 0 });
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchCart();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (isOpen) {
        fetchCart();
      }
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [isOpen]);

  // ========== UPDATE QUANTITY ==========
  const updateQuantity = async (itemId, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity === null || newQuantity === '') {
      return;
    }
    
    const parsedQuantity = parseInt(newQuantity, 10);
    
    if (parsedQuantity < 1) {
      removeItem(itemId);
      return;
    }
    
    const currentItem = cart.items.find(item => item._id === itemId);
    if (currentItem && parsedQuantity > currentItem.stockQuantity) {
      toast.error(`Only ${currentItem.stockQuantity} items available`);
      return;
    }
    
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
    const previousCart = { ...cart };
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity: parsedQuantity };
        }
        return item;
      });
      const { totalItems, subtotal } = recalculateTotals(updatedItems);
      return { ...prevCart, items: updatedItems, totalItems, subtotal };
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
        body: JSON.stringify({ quantity: parsedQuantity })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
      } else {
        setCart(previousCart);
        toast.error(data.error || 'Failed to update');
      }
    } catch (error) {
      console.error('Update error:', error);
      setCart(previousCart);
      toast.error('Failed to update');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // ========== REMOVE ITEM ==========
  const removeItem = async (itemId) => {
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
    const previousCart = { ...cart };
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item._id !== itemId);
      const { totalItems, subtotal } = recalculateTotals(updatedItems);
      return { ...prevCart, items: updatedItems, totalItems, subtotal };
    });
    
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
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Item removed');
      } else {
        setCart(previousCart);
        toast.error(data.error || 'Failed to remove');
      }
    } catch (error) {
      console.error('Remove error:', error);
      setCart(previousCart);
      toast.error('Failed to remove');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // ========== REMOVE ALL VARIANTS OF A PRODUCT ==========
  const removeProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/product/${productId}`, {
        method: 'DELETE',
        headers
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Product removed from cart');
      } else {
        toast.error(data.error || 'Failed to remove product');
      }
    } catch (error) {
      console.error('Remove product error:', error);
      toast.error('Failed to remove product');
    }
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
          setCart(data.data);
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
          setCart(data.data);
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
        setCart(data.data);
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

  // ========== CLEAR CART ==========
  const clearCart = async () => {
    setIsClearing(true);
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      } else {
        toast.error('No session found');
        setIsClearing(false);
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'DELETE',
        headers
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart({ items: [], totalItems: 0, subtotal: 0 });
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Cart cleared successfully');
        setShowClearModal(false);
      } else {
        toast.error(data.error || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      toast.error('Failed to clear cart');
    } finally {
      setIsClearing(false);
    }
  };

  // ========== CHECKOUT ==========
  const proceedToCheckout = () => {
    if (!cart?.items?.length) {
      toast.error('Your cart is empty');
      return;
    }
    
    const itemsNeedingColor = cart.items.filter(item => {
      const productDetail = productVariants[item.productId];
      if (!productDetail || !productDetail.colors || productDetail.colors.length === 0) return false;
      
      const hasValidColor = item.selectedColor && 
                           item.selectedColor !== '' && 
                           item.selectedColor !== null && 
                           item.selectedColor !== 'null' && 
                           item.selectedColor !== 'undefined';
      
      return !hasValidColor;
    });
    
    const itemsNeedingVariant = cart.items.filter(item => {
      const productDetail = productVariants[item.productId];
      if (productDetail && productDetail.hasVariants) {
        return !item.variantId || item.variantId === '' || item.variantId === 'null';
      }
      return false;
    });
    
    const outOfStockItems = cart.items.filter(item => item.stockQuantity <= 0);
    
    if (itemsNeedingColor.length > 0) {
      toast.error(
        <div className="space-y-1">
          <p className="font-semibold">Please select colors for:</p>
          <ul className="text-xs space-y-0.5 list-disc list-inside">
            {itemsNeedingColor.slice(0, 3).map((item, i) => (
              <li key={i}>{item.productName}</li>
            ))}
            {itemsNeedingColor.length > 3 && (
              <li>And {itemsNeedingColor.length - 3} more item(s)...</li>
            )}
          </ul>
          <p className="text-xs text-gray-500 mt-1">Click on a color swatch to select</p>
        </div>,
        { duration: 5000 }
      );
      return;
    }
    
    if (itemsNeedingVariant.length > 0) {
      toast.error(
        <div className="space-y-1">
          <p className="font-semibold">Please select variants for:</p>
          <ul className="text-xs space-y-0.5 list-disc list-inside">
            {itemsNeedingVariant.slice(0, 3).map((item, i) => (
              <li key={i}>{item.productName}</li>
            ))}
            {itemsNeedingVariant.length > 3 && (
              <li>And {itemsNeedingVariant.length - 3} more item(s)...</li>
            )}
          </ul>
          <p className="text-xs text-gray-500 mt-1">Please update variant selections in product page</p>
        </div>,
        { duration: 5000 }
      );
      return;
    }
    
    if (outOfStockItems.length > 0) {
      toast.error(
        <div className="space-y-1">
          <p className="font-semibold">Some items are out of stock:</p>
          <ul className="text-xs space-y-0.5 list-disc list-inside">
            {outOfStockItems.slice(0, 3).map((item, i) => (
              <li key={i}>{item.productName}</li>
            ))}
            {outOfStockItems.length > 3 && (
              <li>And {outOfStockItems.length - 3} more item(s)...</li>
            )}
          </ul>
          <p className="text-xs text-gray-500 mt-1">Please remove these items to proceed</p>
        </div>,
        { duration: 5000 }
      );
      return;
    }
    
    onClose();
    router.push('/checkout');
  };

  const handleShopNow = () => {
    onClose();
    router.push('/products');
  };

  // ========== GROUP ITEMS ==========
  const groupedProducts = cart.items.length > 0 ? groupItemsByProduct(cart.items) : [];
  
  const hasMissingColors = cart.items.some(item => {
    const productDetail = productVariants[item.productId];
    if (!productDetail || !productDetail.colors || productDetail.colors.length === 0) return false;
    
    const hasValidColor = item.selectedColor && 
                         item.selectedColor !== '' && 
                         item.selectedColor !== null && 
                         item.selectedColor !== 'null' && 
                         item.selectedColor !== 'undefined';
    
    return !hasValidColor;
  });

  // const hasMissingVariants = cart.items.some(item => {
  //   const productDetail = productVariants[item.productId];
  //   if (productDetail && productDetail.hasVariants) {
  //     return !item.variantId || item.variantId === '' || item.variantId === 'null';
  //   }
  //   return false;
  // });

  // In CartSidebar.jsx, update hasMissingVariants
const hasMissingVariants = cart.items.some(item => {
  const productDetail = productVariants[item.productId];
  if (productDetail && productDetail.hasVariants) {
    // ✅ Ignore items that are base/orphaned (no variantId)
    if (!item.variantId || item.variantId === '' || item.variantId === 'null') {
      // If this item has no variantId, it might be an orphaned base item
      // Check if there's any other item for this product with a variantId
      const hasValidVariant = cart.items.some(other => 
        other.productId.toString() === item.productId.toString() && 
        other.variantId && 
        other.variantId !== '' && 
        other.variantId !== 'null'
      );
      // If there's a valid variant, this base item is an orphan and should be ignored
      if (hasValidVariant) {
        return false; // ✅ Ignore orphaned base item
      }
      // If no valid variant exists, this is the only item and needs a variant
      return true;
    }
    return false; // Has valid variantId
  }
  return false; // Product doesn't have variants
});

  const hasOutOfStockItems = cart.items.some(item => item.stockQuantity <= 0);
  const canCheckout = !hasMissingColors && !hasMissingVariants && !hasOutOfStockItems && cart.items.length > 0;

  const toggleProductExpand = (productId) => {
    setExpandedProducts(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const getAvailableVariants = (productId, productDetail) => {
    if (!productDetail?.variantTypes) return [];
    
    const cartVariantIds = cart.items
      .filter(item => item.productId.toString() === productId)
      .map(item => item.variantId)
      .filter(id => id);
    
    const available = [];
    productDetail.variantTypes.forEach(vt => {
      vt.variants.forEach(v => {
        if (!cartVariantIds.includes(v.id)) {
          available.push({ ...v, type: vt.type });
        }
      });
    });
    return available;
  };

  const getAvailableSubVariants = (productId, variantId, productDetail) => {
    if (!productDetail?.variantTypes) return [];
    
    let targetVariant = null;
    productDetail.variantTypes.forEach(vt => {
      vt.variants.forEach(v => {
        if (v.id === variantId) {
          targetVariant = v;
        }
      });
    });
    
    if (!targetVariant || !targetVariant.subVariants) return [];
    
    const cartSubVariantIds = cart.items
      .filter(item => 
        item.productId.toString() === productId && 
        item.variantId === variantId &&
        item.subVariantId
      )
      .map(item => item.subVariantId)
      .filter(id => id && id !== 'null' && id !== '');
    
    return targetVariant.subVariants.filter(sv => !cartSubVariantIds.includes(sv.id));
  };

  const productHasVariants = (productId) => {
    const detail = productVariants[productId];
    return detail?.hasVariants || false;
  };

  const variantHasSubVariants = (variantId, productDetail) => {
    if (!productDetail?.variantTypes) return false;
    
    for (const vt of productDetail.variantTypes) {
      for (const v of vt.variants || []) {
        if (v.id === variantId && v.subVariants && v.subVariants.length > 0) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full bg-white shadow-2xl z-[9999] flex flex-col w-[85%] sm:w-[400px] md:w-[450px] lg:w-[33.333%]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-[#8B9D83]/20 bg-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] flex items-center justify-center shadow-lg shadow-[#8B9D83]/25">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
                    Your Shopping Bag
                  </h2>
                  <p className="text-[8px] sm:text-[9px] text-[#8B9D83] -mt-0.5" style={{ fontFamily: FONT_FAMILY }}>
                    Beauty Bucket
                  </p>
                </div>
                {cart.totalItems > 0 && (
                  <span className="bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
                    {cart.totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full hover:bg-[#c5d5be]/20 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-[#263b32] transition-colors" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-[#f0f5ed]">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#8B9D83] animate-spin" />
                </div>
              ) : cart.items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-1 md:mb-1 md:ml-32">
                    <DotLottieReact
                      src="/animations/shopping-cart.lottie"
                      loop
                      autoplay
                      className="w-20 h-20 md:w-28 md:h-28"
                    />
                  </div>
                  <p className="text-sm sm:text-base text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                    Your Shopping Bag is empty
                  </p>
                  <p className="text-xs text-[#8B9D83]/60 mb-4 sm:mb-6" style={{ fontFamily: FONT_FAMILY }}>
                    Start shopping for amazing beauty products!
                  </p>
                  <button
                    onClick={handleShopNow}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/30 transition-all transform hover:scale-105"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {groupedProducts.map((productGroup) => {
                    const productDetail = productVariants[productGroup.productId];
                    const productImage = productDetail?.images?.[0]?.url || productGroup.image || null;
                    const availableVariants = getAvailableVariants(productGroup.productId, productDetail);
                    const hasVariants = productHasVariants(productGroup.productId);
                    const isProductExpanded = expandedProducts[productGroup.productId] !== false;
                    
                    // ✅ For products WITHOUT variants, show the product directly with quantity selector
                    // For products WITH variants, filter out base product items
                    const variantItems = hasVariants 
                      ? productGroup.variants.filter(v => !v.isBaseProduct)
                      : productGroup.variants;
                    
                    if (variantItems.length === 0 && availableVariants.length === 0) {
                      return null;
                    }
                    
                    // ✅ For non-variant products, we don't need a separate product header row
                    // We show the product with quantity selector directly
                    const showProductHeader = hasVariants;
                    
                    return (
                      <div
                        key={productGroup.productId}
                        className="bg-white rounded-xl border border-[#8B9D83]/15 overflow-hidden hover:border-[#8B9D83]/40 transition-all shadow-sm hover:shadow-md"
                      >
                        {/* ✅ Only show Product Header for products WITH variants */}
                        {showProductHeader && (
                          <div className="flex items-start gap-2 p-2 sm:p-3 bg-[#f0f5ed]/80 border-b border-[#8B9D83]/10">
                            <Link href={`/product/${productGroup.productSlug || productGroup.productId}`}>
                              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#c5d5be]/20 rounded-lg overflow-hidden border border-[#8B9D83]/20 flex-shrink-0">
                                <img
                                  src={productImage || 'https://via.placeholder.com/64?text=Product'}
                                  alt={productGroup.productName}
                                  className="w-full h-full object-contain p-0.5 sm:p-1"
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/64?text=Product';
                                  }}
                                />
                              </div>
                            </Link>
                            
                            <div className="flex-1 min-w-0">
                              <Link href={`/product/${productGroup.productSlug || productGroup.productId}`}>
                                <h3 className="font-semibold text-xs sm:text-sm text-[#263b32] hover:text-[#8B9D83] transition-colors line-clamp-2" title={productGroup.productName}>
                                  {productGroup.productName}
                                </h3>
                              </Link>
                              
                              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                <span className="text-sm sm:text-base font-bold text-[#8B9D83]">
                                  ৳{productGroup.subtotal.toFixed(2)}
                                </span>
                                {productGroup.discountPrice > 0 && productGroup.discountPrice < productGroup.regularPrice && (
                                  <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                                    ৳{productGroup.regularPrice.toFixed(2)}
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-gray-500 bg-[#c5d5be]/20 px-1.5 py-0.5 rounded-full">
                                  <Scale className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                                  /{getUnitLabel(productGroup.unit)}
                                </span>
                                {variantItems.length > 0 && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-[#8B9D83] bg-[#c5d5be]/20 px-1.5 py-0.5 rounded-full">
                                    <Layers className="w-2.5 h-2.5" />
                                    {variantItems.length} {variantItems.length > 1 ? 'items' : 'item'}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              {hasVariants && (
                                <button
                                  onClick={() => toggleProductExpand(productGroup.productId)}
                                  className="p-1 text-gray-400 hover:text-[#8B9D83] transition-colors"
                                >
                                  {isProductExpanded ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                              <button
                                onClick={() => removeProduct(productGroup.productId)}
                                className="p-1 text-gray-400/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                title="Remove product"
                              >
                                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Items Section */}
                        {(!hasVariants || isProductExpanded) && (
                          <div className="p-2 sm:p-3 space-y-2.5">
                            {/* ✅ For products WITHOUT variants - show main product with quantity selector (NO header) */}
                            {!hasVariants && (
                              <div className="space-y-1.5">
                                {variantItems.map((variant) => {
                                  // const price = variant.discountPrice > 0 && variant.discountPrice < variant.regularPrice 
                                  //   ? variant.discountPrice 
                                  //   : variant.regularPrice;
                                  // const hasDiscount = variant.discountPrice > 0 && variant.discountPrice < variant.regularPrice;
                                  // const originalPrice = variant.regularPrice;

                                  const price = variant.discountPrice > 0 && variant.discountPrice < variant.regularPrice 
  ? variant.discountPrice 
  : variant.regularPrice;
const hasDiscount = variant.discountPrice > 0 && variant.discountPrice < variant.regularPrice;
const originalPrice = variant.regularPrice;
                                  
                                  return (
                                    <div key={variant.itemId} className="bg-white rounded-lg border border-[#8B9D83]/15 p-2 hover:border-[#8B9D83]/30 transition-all">
                                      <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#8B9D83]/20 flex-shrink-0 bg-[#f0f5ed]">
                                          <img
                                            src={variant.image || productImage || 'https://via.placeholder.com/40?text=P'}
                                            alt={productGroup.productName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                              e.target.src = 'https://via.placeholder.com/40?text=P';
                                            }}
                                          />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="text-xs font-medium text-[#263b32]">
                                              {productGroup.productName}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="text-xs font-semibold text-[#8B9D83]">
                                              ৳{Number(price).toFixed(2)}
                                            </span>
                                            {hasDiscount && (
                                              <span className="text-[9px] text-gray-400 line-through">
                                                ৳{Number(originalPrice).toFixed(2)}
                                              </span>
                                            )}
                                            {hasDiscount && (
                                              <span className="text-[8px] text-green-600 font-medium bg-green-50 px-1 py-0.5 rounded">
                                                {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        <div className="flex items-center border border-[#8B9D83]/20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                          <button
                                            onClick={() => {
                                              const newQty = Math.max(1, variant.quantity - 1);
                                              updateQuantity(variant.itemId, newQty);
                                            }}
                                            disabled={updatingItems[variant.itemId] || variant.quantity <= 1}
                                            className="w-6 h-6 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
                                          >
                                            <Minus className="w-2.5 h-2.5" />
                                          </button>
                                          
                                          <span className="w-7 text-center text-xs font-medium text-[#263b32]">
                                            {variant.quantity}
                                          </span>
                                          
                                          <button
                                            onClick={() => {
                                              const newQty = variant.quantity + 1;
                                              if (newQty <= variant.stockQuantity) {
                                                updateQuantity(variant.itemId, newQty);
                                              } else {
                                                toast.error(`Only ${variant.stockQuantity} items available`);
                                              }
                                            }}
                                            disabled={updatingItems[variant.itemId] || variant.quantity >= variant.stockQuantity}
                                            className="w-6 h-6 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
                                          >
                                            <Plus className="w-2.5 h-2.5" />
                                          </button>
                                        </div>

                                        <button
                                          onClick={() => removeItem(variant.itemId)}
                                          disabled={updatingItems[variant.itemId]}
                                          className="p-1 text-gray-400/40 hover:text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0 disabled:opacity-50"
                                          title="Remove"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* ✅ For products WITH variants - group by variantId */}
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
                                  const availableSubVariants = getAvailableSubVariants(
                                    productGroup.productId,
                                    variantId,
                                    productDetail
                                  );
                                  const hasSubVariants = variantHasSubVariants(variantId, productDetail);

                                  return (
                                    <div
                                      key={variantId}
                                      className="rounded-lg border border-[#8B9D83]/20 bg-[#faf8f5] overflow-hidden"
                                    >
                                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#8B9D83]/8 border-b border-[#8B9D83]/10">
                                        <Layers className="w-3 h-3 text-[#8B9D83] flex-shrink-0" />
                                        <span className="text-[11px] font-semibold text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
                                          {representative.variantName || 'Variant'}
                                        </span>
                                        {representative.selectedColor && (
                                          <Circle
                                            className="w-2.5 h-2.5 flex-shrink-0"
                                            style={{ color: representative.selectedColor, fill: representative.selectedColor }}
                                          />
                                        )}
                                        <span className="text-[9px] text-gray-400 ml-auto">
                                          {items.filter(i => !i.isBaseProduct).length} {items.filter(i => !i.isBaseProduct).length > 1 ? 'options' : 'option'} added
                                        </span>
                                      </div>

                                      <div className="p-1.5 space-y-1.5">
                                        {items
                                          .filter(v => !v.isBaseProduct)
                                          .map((variant, index) => {
                                            const isSubVariant = variant.isSubVariant;
                                            return (
                                              <div
                                                key={variant.itemId || `variant-${index}-${variant.variantId}`}
                                                className={isSubVariant ? 'ml-3 pl-2 border-l-2 border-[#8B9D83]/25' : ''}
                                              >
                                                <div className="bg-white rounded-lg border border-[#8B9D83]/15 p-2 hover:border-[#8B9D83]/30 transition-all">
                                                  <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#8B9D83]/20 flex-shrink-0 bg-[#f0f5ed]">
                                                      <img
                                                        src={variant.image || productImage || 'https://via.placeholder.com/40?text=V'}
                                                        alt={variant.variantName || 'Variant'}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                          e.target.src = 'https://via.placeholder.com/40?text=V';
                                                        }}
                                                      />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                      <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span className="text-xs font-medium text-[#263b32]">
                                                          {variant.isSubVariant ? variant.subVariantName : variant.variantName}
                                                        </span>
                                                        {variant.selectedColor && (
                                                          <span className="inline-flex items-center gap-0.5 text-[9px] text-[#8B9D83]">
                                                            <Circle 
                                                              className="w-2.5 h-2.5" 
                                                              style={{ color: variant.selectedColor, fill: variant.selectedColor }} 
                                                            />
                                                            {getColorName(variant.selectedColor)}
                                                          </span>
                                                        )}
                                                        {variant.isSubVariant && (
                                                          <span className="text-[8px] bg-blue-50 text-blue-600 px-1 py-0.5 rounded">Sub</span>
                                                        )}
                                                        {variant.isVariant && !variant.isSubVariant && (
                                                          <span className="text-[8px] bg-purple-50 text-purple-600 px-1 py-0.5 rounded">Variant</span>
                                                        )}
                                                      </div>
                                                      <div className="flex items-center gap-1.5 mt-0.5">
                                                        <span className="text-xs font-semibold text-[#8B9D83]">
                                                          ৳{Number(variant.price).toFixed(2)}
                                                        </span>
                                                        {variant.discountPrice > 0 && variant.discountPrice < variant.regularPrice && (
                                                          <span className="text-[9px] text-gray-400 line-through">
                                                            ৳{Number(variant.regularPrice).toFixed(2)}
                                                          </span>
                                                        )}
                                                        {variant.discountPrice > 0 && variant.discountPrice < variant.regularPrice && (
                                                          <span className="text-[8px] text-green-600 font-medium bg-green-50 px-1 py-0.5 rounded">
                                                            {Math.round(((variant.regularPrice - variant.discountPrice) / variant.regularPrice) * 100)}% off
                                                          </span>
                                                        )}
                                                      </div>
                                                    </div>

                                                    <div className="flex items-center border border-[#8B9D83]/20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                                      <button
                                                        onClick={() => {
                                                          const newQty = Math.max(1, variant.quantity - 1);
                                                          updateQuantity(variant.itemId, newQty);
                                                        }}
                                                        disabled={updatingItems[variant.itemId] || variant.quantity <= 1}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
                                                      >
                                                        <Minus className="w-2.5 h-2.5" />
                                                      </button>
                                                      
                                                      <span className="w-7 text-center text-xs font-medium text-[#263b32]">
                                                        {variant.quantity}
                                                      </span>
                                                      
                                                      <button
                                                        onClick={() => {
                                                          const newQty = variant.quantity + 1;
                                                          if (newQty <= variant.stockQuantity) {
                                                            updateQuantity(variant.itemId, newQty);
                                                          } else {
                                                            toast.error(`Only ${variant.stockQuantity} items available`);
                                                          }
                                                        }}
                                                        disabled={updatingItems[variant.itemId] || variant.quantity >= variant.stockQuantity}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-[#c5d5be]/20 disabled:opacity-50 transition-colors text-gray-500 hover:text-[#8B9D83]"
                                                      >
                                                        <Plus className="w-2.5 h-2.5" />
                                                      </button>
                                                    </div>

                                                    <button
                                                      onClick={() => removeItem(variant.itemId)}
                                                      disabled={updatingItems[variant.itemId]}
                                                      className="p-1 text-gray-400/40 hover:text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0 disabled:opacity-50"
                                                      title="Remove"
                                                    >
                                                      <X className="w-3 h-3" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })}

                                        {/* Available sub-variants */}
                                        {hasSubVariants && availableSubVariants.length > 0 && (
                                          <div className="ml-3 pl-2 border-l-2 border-dashed border-[#8B9D83]/20 pt-1">
                                            <p className="text-[9px] text-gray-400 mb-1" style={{ fontFamily: FONT_FAMILY }}>
                                              Add sub-variant:
                                            </p>
                                            <div className="flex flex-wrap gap-1">
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
                                                    className="text-[9px] px-2 py-1 rounded-full border border-[#8B9D83]/30 hover:border-[#8B9D83] text-[#263b32] hover:bg-white transition-all flex items-center gap-1 disabled:opacity-50 bg-white/60"
                                                  >
                                                    {isAdding ? (
                                                      <Loader2 className="w-2 h-2 animate-spin" />
                                                    ) : (
                                                      <Plus className="w-2 h-2" />
                                                    )}
                                                    {subVariant.name}
                                                    {subVariant.color && (
                                                      <span
                                                        className="inline-block w-2 h-2 rounded-full"
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
                              </>
                            )}

                            {/* Add more variants - only for products with variants */}
                            {hasVariants && availableVariants.length > 0 && (
                              <div className={variantItems.filter(v => !v.isBaseProduct).length > 0 ? 'pt-1 border-t border-[#8B9D83]/10' : ''}>
                                <p className="text-[9px] text-gray-400 mb-1.5" style={{ fontFamily: FONT_FAMILY }}>
                                  {variantItems.filter(v => !v.isBaseProduct).length === 0 ? 'Select a variant:' : 'Add more variants:'}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {availableVariants.map((v) => {
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
                                        className={`text-[9px] px-2 py-1 rounded-full border transition-all flex items-center gap-1 disabled:opacity-50 ${
                                          hasSubVariants
                                            ? 'border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-400'
                                            : 'border-[#8B9D83]/30 hover:border-[#8B9D83] text-[#263b32] hover:bg-[#f0f5ed]'
                                        }`}
                                      >
                                        {isAdding ? (
                                          <Loader2 className="w-2 h-2 animate-spin" />
                                        ) : (
                                          <Plus className="w-2 h-2" />
                                        )}
                                        {v.name}
                                        {v.color && (
                                          <span
                                            className="inline-block w-2 h-2 rounded-full"
                                            style={{ backgroundColor: v.color }}
                                          />
                                        )}
                                        {hasSubVariants && (
                                          <span className="text-[8px] bg-amber-200 text-amber-700 px-1 py-0.5 rounded-full">
                                            {v.subVariants.length} sub
                                          </span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* No variants available message */}
                            {hasVariants && variantItems.filter(v => !v.isBaseProduct).length === 0 && availableVariants.length === 0 && (
                              <div className="text-center py-4 text-gray-400 text-xs" style={{ fontFamily: FONT_FAMILY }}>
                                <AlertCircle className="w-5 h-5 mx-auto mb-1 text-gray-300" />
                                <p>No variants available for this product</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  <button
                    onClick={() => setShowClearModal(true)}
                    disabled={isClearing}
                    className="text-gray-400/60 hover:text-red-500 text-xs sm:text-sm transition-colors mt-2 block text-center w-full py-1.5 sm:py-2 hover:bg-red-50 rounded-lg"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {isClearing ? (
                      <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-[#8B9D83]" />
                        Clearing...
                      </span>
                    ) : (
                      'Clear Cart'
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {cart.items.length > 0 && (
              <div className="border-t border-[#8B9D83]/20 p-3 sm:p-4 bg-white flex-shrink-0">
                {(hasMissingColors || hasMissingVariants || hasOutOfStockItems) && (
                  <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                    {hasMissingColors && (
                      <div className="flex items-start gap-2 mb-1.5">
                        <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] sm:text-xs text-orange-600 font-medium" style={{ fontFamily: FONT_FAMILY }}>
                            Please select colors for all items
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-orange-500" style={{ fontFamily: FONT_FAMILY }}>
                            Click on color swatches above to select
                          </p>
                        </div>
                      </div>
                    )}
                    {hasMissingVariants && (
                      <div className="flex items-start gap-2 mb-1.5">
                        <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] sm:text-xs text-orange-600 font-medium" style={{ fontFamily: FONT_FAMILY }}>
                            Please select variants for all items
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-orange-500" style={{ fontFamily: FONT_FAMILY }}>
                            Update variant selections in product page
                          </p>
                        </div>
                      </div>
                    )}
                    {hasOutOfStockItems && (
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] sm:text-xs text-red-600 font-medium" style={{ fontFamily: FONT_FAMILY }}>
                            Some items are out of stock
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-red-500" style={{ fontFamily: FONT_FAMILY }}>
                            Please remove out of stock items to proceed
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-[#263b32] text-base sm:text-lg" style={{ fontFamily: FONT_FAMILY }}>
                    Total Amount
                  </span>
                  <span className="font-bold text-xl sm:text-2xl text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
                    ৳{cart.subtotal.toFixed(2)}
                  </span>
                </div>
                
                <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-green-600" style={{ fontFamily: FONT_FAMILY }}>
                    <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span>Secure checkout &amp; 7-day returns</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
                    <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span>Fast shipping</span>
                  </div>
                </div>
                
                <button
                  onClick={proceedToCheckout}
                  disabled={!canCheckout}
                  className={`w-full mt-3 sm:mt-4 py-2.5 sm:py-3 font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
                    !canCheckout 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white hover:shadow-lg hover:shadow-[#8B9D83]/30 transition-all hover:scale-[1.02]'
                  }`}
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {!canCheckout ? 'Complete Your Selection' : 'Proceed to Checkout'}
                  {canCheckout && <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear Cart Confirmation Modal */}
      <AnimatePresence>
        {showClearModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
            onClick={() => setShowClearModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border border-[#8B9D83]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
                    <AlertTriangle className="w-7 h-7 text-red-500" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-center text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                  Clear Bag?
                </h3>
                
                <p className="text-[#8B9D83]/60 text-center mb-6 text-sm" style={{ fontFamily: FONT_FAMILY }}>
                  Are you sure you want to remove all items from your Bag? This action cannot be undone.
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClearModal(false)}
                    className="flex-1 px-4 py-2.5 border border-[#8B9D83]/30 text-[#263b32] font-medium rounded-full hover:bg-[#f0f5ed] transition-colors"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={clearCart}
                    disabled={isClearing}
                    className="flex-1 px-4 py-2.5 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {isClearing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Clearing...
                      </>
                    ) : (
                      'Yes, Clear Cart'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}