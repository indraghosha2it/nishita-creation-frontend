

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import {
//   FaCheckCircle,
//   FaPrint,
//   FaDownload,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaShoppingBag,
//   FaClock,
//   FaTruck,
//   FaFileInvoice,
//   FaHome,
//   FaStore,
//   FaUser,
//   FaSearch,
//   FaWhatsapp,
//   FaMapPin,
//   FaCity,
//   FaBuilding,
//   FaLocationArrow,
//   FaPalette,
//   FaHeadset
// } from 'react-icons/fa';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import { generateInvoicePDF } from '@/utils/invoicePDF';

// // ========== HELPER: Get color name ==========
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

// export default function ThankYouClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('orderId');
//   const sessionIdFromUrl = searchParams.get('sessionId');
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const invoiceRef = useRef(null);
  
//   const [footerData, setFooterData] = useState(null);
//   const [isFooterLoading, setIsFooterLoading] = useState(true);

//   // ========== FETCH FOOTER DATA ==========
//   useEffect(() => {
//     const fetchFooterData = async () => {
//       try {
//         setIsFooterLoading(true);
//         const response = await fetch('http://localhost:5000/api/footer');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch footer data');
//         }
        
//         const data = await response.json();
        
//         if (data.success && data.data) {
//           setFooterData(data.data);
//         } else {
//           throw new Error('Invalid footer data');
//         }
//       } catch (err) {
//         console.error('Error fetching footer data:', err);
//         setFooterData({
//           company: {
//             phone: '+880 1871 733305',
//             email: 'info@smartgadget.com',
//           },
//           columns: [
//             {
//               type: 'contact',
//               items: [
//                 { type: 'phone', value: '+880 1871 733305' },
//                 { type: 'email', value: 'info@smartgadget.com' },
//               ]
//             }
//           ]
//         });
//       } finally {
//         setIsFooterLoading(false);
//       }
//     };

//     fetchFooterData();
//   }, []);

//   // ========== GET CONTACT ITEMS ==========
//   const getContactItems = () => {
//     if (!footerData) return [];
    
//     const contactColumn = footerData.columns?.find(col => col.type === 'contact');
//     const items = contactColumn?.items || [];
//     const company = footerData.company || {};
    
//     const contacts = [];
    
//     const phoneItem = items.find(item => item.type === 'phone');
//     if (phoneItem) {
//       const cleanPhone = phoneItem.value.replace(/[^0-9+]/g, '');
//       contacts.push({
//         icon: 'FaPhone',
//         label: 'Phone',
//         value: phoneItem.value,
//         link: `tel:${cleanPhone}`,
//         cleanValue: cleanPhone,
//         color: 'text-blue-600'
//       });
//     } else if (company.phone) {
//       const cleanPhone = company.phone.replace(/[^0-9+]/g, '');
//       contacts.push({
//         icon: 'FaPhone',
//         label: 'Phone',
//         value: company.phone,
//         link: `tel:${cleanPhone}`,
//         cleanValue: cleanPhone,
//         color: 'text-blue-600'
//       });
//     }
    
//     const emailItem = items.find(item => item.type === 'email');
//     if (emailItem) {
//       contacts.push({
//         icon: 'FaEnvelope',
//         label: 'Email',
//         value: emailItem.value,
//         link: `mailto:${emailItem.value}`,
//         cleanValue: emailItem.value,
//         color: 'text-green-600'
//       });
//     } else if (company.email) {
//       contacts.push({
//         icon: 'FaEnvelope',
//         label: 'Email',
//         value: company.email,
//         link: `mailto:${company.email}`,
//         cleanValue: company.email,
//         color: 'text-green-600'
//       });
//     }
    
//     const whatsappItem = items.find(item => item.type === 'whatsapp');
//     if (whatsappItem) {
//       const cleanPhone = whatsappItem.value.replace(/[^0-9+]/g, '');
//       contacts.push({
//         icon: 'FaWhatsapp',
//         label: 'WhatsApp',
//         value: whatsappItem.value,
//         link: `https://wa.me/${cleanPhone}`,
//         cleanValue: cleanPhone,
//         color: 'text-green-500'
//       });
//     } else if (company.whatsapp) {
//       const cleanPhone = company.whatsapp.replace(/[^0-9+]/g, '');
//       contacts.push({
//         icon: 'FaWhatsapp',
//         label: 'WhatsApp',
//         value: company.whatsapp,
//         link: `https://wa.me/${cleanPhone}`,
//         cleanValue: cleanPhone,
//         color: 'text-green-500'
//       });
//     }
    
//     if (contacts.length === 0) {
//       contacts.push(
//         {
//           icon: 'FaPhone',
//           label: 'Phone',
//           value: '+880 1871 733305',
//           link: 'tel:+8801871733305',
//           cleanValue: '+8801871733305',
//           color: 'text-blue-600'
//         },
//         {
//           icon: 'FaEnvelope',
//           label: 'Email',
//           value: 'info@smartgadget.com',
//           link: 'mailto:info@smartgadget.com',
//           cleanValue: 'info@smartgadget.com',
//           color: 'text-green-600'
//         },
//         {
//           icon: 'FaWhatsapp',
//           label: 'WhatsApp',
//           value: '+880 1871 733305',
//           link: 'https://wa.me/8801871733305',
//           cleanValue: '+8801871733305',
//           color: 'text-green-500'
//         }
//       );
//     }
    
//     return contacts;
//   };

//   const handleContactClick = (contact) => {
//     if (contact.icon === 'FaPhone') {
//       const phoneNumber = contact.cleanValue || contact.link.replace('tel:', '');
//       try {
//         window.location.href = `tel:${phoneNumber}`;
//       } catch (err) {
//         try {
//           const link = document.createElement('a');
//           link.href = `tel:${phoneNumber}`;
//           link.style.display = 'none';
//           document.body.appendChild(link);
//           link.click();
//           setTimeout(() => {
//             document.body.removeChild(link);
//           }, 500);
//         } catch (err2) {
//           toast.info(`Call us at ${contact.value}`);
//         }
//       }
//     } else if (contact.icon === 'FaEnvelope') {
//       const email = contact.cleanValue || contact.link.replace('mailto:', '');
//       window.open(
//         `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
//         '_blank',
//         'noopener,noreferrer'
//       );
//     } else if (contact.icon === 'FaWhatsapp') {
//       window.open(contact.link, '_blank', 'noopener,noreferrer');
//     } else {
//       window.open(contact.link, '_blank');
//     }
//   };

//   useEffect(() => {
//     if (orderId) {
//       fetchOrderDetails();
//     } else {
//       setError('No order ID provided');
//       setLoading(false);
//     }
//   }, [orderId]);

//   const fetchOrderDetails = async () => {
//     try {
//       const sessionId = sessionIdFromUrl || localStorage.getItem('cartSessionId');
//       const token = localStorage.getItem('token');
      
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }
      
//       if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
//         headers
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setOrder(data.data);
//       } else {
//         if (data.error === 'Unauthorized to view this order' && !token) {
//           const retryResponse = await fetch(`http://localhost:5000/api/orders/${orderId}`);
//           const retryData = await retryResponse.json();
          
//           if (retryData.success) {
//             setOrder(retryData.data);
//             return;
//           }
//         }
        
//         setError(data.error || 'Failed to load order details');
//       }
//     } catch (error) {
//       console.error('Fetch order error:', error);
//       setError('Failed to load order details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadPDF = async () => {
//     if (!order || pdfLoading) return;

//     setPdfLoading(true);
//     try {
//       await generateInvoicePDF(order);
//       toast.success('Invoice downloaded successfully!');
//     } catch (error) {
//       console.error('PDF generation error:', error);
//       toast.error('Failed to generate PDF. Please try again.');
//     } finally {
//       setPdfLoading(false);
//     }
//   };

//   // ========== GET COLOR DISPLAY ==========
//   const getColorDisplay = (item) => {
//     if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
//       const hasValidColors = item.colors.some(c => 
//         c.color && 
//         c.color !== 'null' && 
//         c.color !== '' && 
//         c.color !== 'undefined'
//       );
      
//       if (hasValidColors) {
//         return item.colors
//           .filter(c => c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined')
//           .map(c => ({
//             color: c.color,
//             quantity: c.quantity || 0,
//             price: c.price || item.discountPrice || item.regularPrice
//           }));
//       }
//     }
    
//     if (item.selectedColor && 
//         item.selectedColor !== 'null' && 
//         item.selectedColor !== '' && 
//         item.selectedColor !== 'undefined') {
//       return [{
//         color: item.selectedColor,
//         quantity: item.quantity || 0,
//         price: item.discountPrice || item.regularPrice
//       }];
//     }
    
//     return [];
//   };

// // ============================================================
// // GROUP ITEMS WITH PROPER HIERARCHY - CORRECT TOTALS
// // ============================================================
// const groupItemsForDisplay = (items) => {
//   if (!items || items.length === 0) return [];
  
//   const productGroups = {};
  
//   items.forEach(item => {
//     const productId = item.productId?.toString() || 'unknown';
    
//     if (!productGroups[productId]) {
//       productGroups[productId] = {
//         productId: productId,
//         productName: item.productName,
//         productSlug: item.productSlug || '',
//         image: item.image || '',
//         regularPrice: item.regularPrice,
//         discountPrice: item.discountPrice || 0,
//         unit: item.unit || 'pcs',
//         stockQuantity: item.stockQuantity || 0,
//         hasVariants: false,
//         hasSubVariants: false,
//         items: [],
//         variantDetails: item.variantDetails || []
//       };
//     }
    
//     productGroups[productId].items.push(item);
    
//     if (item.isVariant || item.isSubVariant || (item.variantDetails && item.variantDetails.length > 0)) {
//       productGroups[productId].hasVariants = true;
//     }
    
//     if (item.isSubVariant) {
//       productGroups[productId].hasSubVariants = true;
//     }
    
//     if (item.variantDetails && item.variantDetails.length > 0) {
//       item.variantDetails.forEach(variant => {
//         if (variant.subVariants && variant.subVariants.length > 0) {
//           productGroups[productId].hasSubVariants = true;
//         }
//       });
//     }
//   });
  
//   const result = [];
  
//   Object.values(productGroups).forEach(group => {
//     const baseItems = group.items.filter(item => 
//       !item.isVariant && 
//       !item.isSubVariant && 
//       item.isBaseProduct !== false
//     );
    
//     const variantItems = group.items.filter(item => 
//       item.isVariant === true && 
//       !item.isSubVariant
//     );
    
//     const subVariantItems = group.items.filter(item => 
//       item.isSubVariant === true
//     );
    
//     const hasNestedVariants = group.variantDetails && group.variantDetails.length > 0;
    
//     const rows = [];
//     const hasAnyVariants = variantItems.length > 0 || subVariantItems.length > 0 || hasNestedVariants;
    
//     // ============================================================
//     // 1. Base product row - ALWAYS show product name
//     // ============================================================
//     if (baseItems.length > 0) {
//       let totalBaseQuantity = 0;
//       let totalBasePrice = 0;
//       let baseColor = null;
//       let hasBaseColor = false;
      
//       baseItems.forEach(item => {
//         const colorData = getColorDisplay(item);
//         const price = item.discountPrice || item.regularPrice || 0;
//         totalBaseQuantity += item.quantity || 0;
//         totalBasePrice += price * (item.quantity || 0);
        
//         if (colorData.length > 0 && !hasBaseColor) {
//           baseColor = colorData[0].color;
//           hasBaseColor = true;
//         }
//       });
      
//       // Calculate total from variants (for display in the base row)
//       let variantTotalQuantity = 0;
//       let variantTotalPrice = 0;
      
//       // From flat variant items
//       variantItems.forEach(v => {
//         const price = v.variantDiscountPrice > 0 ? v.variantDiscountPrice : 
//                      v.variantRegularPrice > 0 ? v.variantRegularPrice :
//                      v.discountPrice || v.regularPrice || 0;
//         variantTotalQuantity += v.quantity || 0;
//         variantTotalPrice += price * (v.quantity || 0);
//       });
      
//       // From flat sub-variant items
//       subVariantItems.forEach(s => {
//         const price = s.variantDiscountPrice > 0 ? s.variantDiscountPrice : 
//                      s.variantRegularPrice > 0 ? s.variantRegularPrice :
//                      s.discountPrice || s.regularPrice || 0;
//         variantTotalQuantity += s.quantity || 0;
//         variantTotalPrice += price * (s.quantity || 0);
//       });
      
//       // From nested variantDetails
//       if (hasNestedVariants) {
//         group.variantDetails.forEach(v => {
//           if (v.subVariants && v.subVariants.length > 0) {
//             v.subVariants.forEach(s => {
//               const price = s.subVariantDiscountPrice > 0 ? s.subVariantDiscountPrice :
//                            s.subVariantRegularPrice > 0 ? s.subVariantRegularPrice :
//                            v.variantRegularPrice || 0;
//               variantTotalQuantity += s.quantity || 0;
//               variantTotalPrice += price * (s.quantity || 0);
//             });
//           } else {
//             const price = v.variantDiscountPrice > 0 ? v.variantDiscountPrice :
//                          v.variantRegularPrice > 0 ? v.variantRegularPrice : 0;
//             variantTotalQuantity += v.quantity || 0;
//             variantTotalPrice += price * (v.quantity || 0);
//           }
//         });
//       }
      
//       // Use the sum of variants if there are variants, otherwise use base
//       const finalQuantity = hasAnyVariants ? variantTotalQuantity : totalBaseQuantity;
//       const finalTotal = hasAnyVariants ? variantTotalPrice : totalBasePrice;
      
//       rows.push({
//         type: 'base',
//         id: 'base',
//         name: group.productName,
//         displayName: group.productName,
//         image: group.image,
//         price: finalQuantity > 0 ? (finalTotal / finalQuantity) : 0,
//         quantity: finalQuantity,
//         total: finalTotal, // This will be the sum of all variants or base price
//         unit: group.unit || 'pcs',
//         color: baseColor,
//         hasColor: hasBaseColor,
//         isBase: true,
//         isVariant: false,
//         isSubVariant: false,
//         indent: 0,
//         badge: 'Product',
//         parentName: null,
//         grandParentName: null,
//         variantId: null,
//         subVariantId: null,
//         originalPrice: null,
//         hasDiscount: false,
//         variantName: null,
//         subVariantName: null,
//         showPrice: !hasAnyVariants // Show price only if NO variants exist
//       });
//     }
    
//     // ============================================================
//     // 2. Variant rows - show ONLY variant name
//     // ============================================================
//     variantItems.forEach(item => {
//       const colorData = getColorDisplay(item);
//       const hasColor = colorData.length > 0;
//       const price = item.variantDiscountPrice > 0 ? item.variantDiscountPrice : 
//                    item.variantRegularPrice > 0 ? item.variantRegularPrice :
//                    item.discountPrice || item.regularPrice || 0;
//       const quantity = item.quantity || 0;
//       const total = price * quantity;
//       const originalPrice = item.variantRegularPrice > 0 && item.variantDiscountPrice > 0 ? item.variantRegularPrice : null;
//       const hasDiscount = originalPrice && originalPrice > price;
      
//       rows.push({
//         type: 'variant',
//         id: item.variantId || `variant-${rows.length}`,
//         name: item.variantName || 'Variant',
//         displayName: item.variantName || 'Variant',
//         image: item.image || group.image,
//         price: price,
//         originalPrice: originalPrice,
//         hasDiscount: hasDiscount,
//         quantity: quantity,
//         total: total,
//         unit: group.unit || 'pcs',
//         color: hasColor ? colorData[0].color : null,
//         hasColor: hasColor,
//         isBase: false,
//         isVariant: true,
//         isSubVariant: false,
//         indent: 1,
//         parentName: group.productName,
//         badge: 'Variant',
//         variantId: item.variantId,
//         subVariantId: null,
//         grandParentName: null,
//         variantName: item.variantName,
//         subVariantName: null,
//         showPrice: true
//       });
//     });
    
//     // ============================================================
//     // 3. Sub-variant rows
//     // ============================================================
//     subVariantItems.forEach(item => {
//       const colorData = getColorDisplay(item);
//       const hasColor = colorData.length > 0;
//       const price = item.variantDiscountPrice > 0 ? item.variantDiscountPrice : 
//                    item.variantRegularPrice > 0 ? item.variantRegularPrice :
//                    item.discountPrice || item.regularPrice || 0;
//       const quantity = item.quantity || 0;
//       const total = price * quantity;
//       const originalPrice = item.variantRegularPrice > 0 && item.variantDiscountPrice > 0 ? item.variantRegularPrice : null;
//       const hasDiscount = originalPrice && originalPrice > price;
      
//       let parentVariantName = item.variantName || 'Variant';
//       const parentVariant = variantItems.find(v => v.variantId === item.variantId);
//       if (parentVariant) {
//         parentVariantName = parentVariant.variantName || 'Variant';
//       }
      
//       rows.push({
//         type: 'subVariant',
//         id: item.subVariantId || `sub-${rows.length}`,
//         name: item.subVariantName || 'Sub-Variant',
//         displayName: item.subVariantName || 'Sub-Variant',
//         image: item.image || group.image,
//         price: price,
//         originalPrice: originalPrice,
//         hasDiscount: hasDiscount,
//         quantity: quantity,
//         total: total,
//         unit: group.unit || 'pcs',
//         color: hasColor ? colorData[0].color : null,
//         hasColor: hasColor,
//         isBase: false,
//         isVariant: false,
//         isSubVariant: true,
//         indent: 2,
//         parentName: parentVariantName,
//         grandParentName: group.productName,
//         badge: 'Sub',
//         variantId: item.variantId,
//         subVariantId: item.subVariantId,
//         variantName: parentVariantName,
//         subVariantName: item.subVariantName,
//         showPrice: true
//       });
//     });
    
//     // ============================================================
//     // 4. Process nested variantDetails structure
//     // ============================================================
//     if (hasNestedVariants && rows.filter(r => r.isVariant || r.isSubVariant).length === 0) {
//       group.variantDetails.forEach(variant => {
//         const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
        
//         if (hasSubVariants) {
//           // Variant with sub-variants - show as header
//           rows.push({
//             type: 'variant',
//             id: variant.variantId || `variant-${rows.length}`,
//             name: variant.variantName || 'Variant',
//             displayName: variant.variantName || 'Variant',
//             image: variant.image || group.image,
//             price: 0,
//             originalPrice: null,
//             hasDiscount: false,
//             quantity: 0,
//             total: 0,
//             unit: group.unit || 'pcs',
//             color: variant.selectedColor || null,
//             hasColor: !!variant.selectedColor,
//             isBase: false,
//             isVariant: true,
//             isSubVariant: false,
//             indent: 1,
//             parentName: group.productName,
//             badge: 'Variant',
//             variantId: variant.variantId,
//             subVariantId: null,
//             grandParentName: null,
//             variantName: variant.variantName,
//             subVariantName: null,
//             isHeader: true,
//             showPrice: false
//           });
          
//           // Add sub-variants with prices
//           variant.subVariants.forEach(sub => {
//             const subPrice = sub.subVariantDiscountPrice > 0 ? sub.subVariantDiscountPrice :
//                             sub.subVariantRegularPrice > 0 ? sub.subVariantRegularPrice :
//                             variant.variantRegularPrice || 0;
//             const subQuantity = sub.quantity || 0;
//             const subTotal = subPrice * subQuantity;
//             const subOriginalPrice = sub.subVariantRegularPrice > 0 && sub.subVariantDiscountPrice > 0 ? sub.subVariantRegularPrice : null;
//             const subHasDiscount = subOriginalPrice && subOriginalPrice > subPrice;
            
//             rows.push({
//               type: 'subVariant',
//               id: sub.subVariantId || `sub-${rows.length}`,
//               name: sub.subVariantName || 'Sub-Variant',
//               displayName: sub.subVariantName || 'Sub-Variant',
//               image: sub.image || variant.image || group.image,
//               price: subPrice,
//               originalPrice: subOriginalPrice,
//               hasDiscount: subHasDiscount,
//               quantity: subQuantity,
//               total: subTotal,
//               unit: group.unit || 'pcs',
//               color: sub.selectedColor || variant.selectedColor || null,
//               hasColor: !!(sub.selectedColor || variant.selectedColor),
//               isBase: false,
//               isVariant: false,
//               isSubVariant: true,
//               indent: 2,
//               parentName: variant.variantName || 'Variant',
//               grandParentName: group.productName,
//               badge: 'Sub',
//               variantId: variant.variantId,
//               subVariantId: sub.subVariantId,
//               variantName: variant.variantName,
//               subVariantName: sub.subVariantName,
//               showPrice: true
//             });
//           });
//         } else {
//           // Variant without sub-variants
//           const price = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice :
//                        variant.variantRegularPrice > 0 ? variant.variantRegularPrice : 0;
//           const quantity = variant.quantity || 1;
//           const total = price * quantity;
//           const originalPrice = variant.variantRegularPrice > 0 && variant.variantDiscountPrice > 0 ? variant.variantRegularPrice : null;
//           const hasDiscount = originalPrice && originalPrice > price;
          
//           rows.push({
//             type: 'variant',
//             id: variant.variantId || `variant-${rows.length}`,
//             name: variant.variantName || 'Variant',
//             displayName: variant.variantName || 'Variant',
//             image: variant.image || group.image,
//             price: price,
//             originalPrice: originalPrice,
//             hasDiscount: hasDiscount,
//             quantity: quantity,
//             total: total,
//             unit: group.unit || 'pcs',
//             color: variant.selectedColor || null,
//             hasColor: !!variant.selectedColor,
//             isBase: false,
//             isVariant: true,
//             isSubVariant: false,
//             indent: 1,
//             parentName: group.productName,
//             badge: 'Variant',
//             variantId: variant.variantId,
//             subVariantId: null,
//             grandParentName: null,
//             variantName: variant.variantName,
//             subVariantName: null,
//             showPrice: true
//           });
//         }
//       });
//     }
    
//     // ============================================================
//     // ✅ If NO rows, add a default row
//     // ============================================================
//     if (rows.length === 0 && group.items.length > 0) {
//       const firstItem = group.items[0];
//       const colorData = getColorDisplay(firstItem);
//       const hasColor = colorData.length > 0;
//       const price = firstItem.discountPrice || firstItem.regularPrice || 0;
//       const quantity = firstItem.quantity || 0;
//       const total = price * quantity;
      
//       rows.push({
//         type: 'base',
//         id: 'base',
//         name: group.productName,
//         displayName: group.productName,
//         image: group.image,
//         price: price,
//         quantity: quantity,
//         total: total,
//         unit: group.unit || 'pcs',
//         color: hasColor ? colorData[0].color : null,
//         hasColor: hasColor,
//         isBase: true,
//         isVariant: false,
//         isSubVariant: false,
//         indent: 0,
//         badge: 'Product',
//         parentName: null,
//         grandParentName: null,
//         variantId: null,
//         subVariantId: null,
//         originalPrice: null,
//         hasDiscount: false,
//         variantName: null,
//         subVariantName: null,
//         showPrice: true
//       });
//     }
    
//     result.push({
//       productId: group.productId,
//       productName: group.productName,
//       image: group.image,
//       hasVariants: group.hasVariants,
//       hasSubVariants: group.hasSubVariants,
//       rows: rows,
//       totalQuantity: rows.reduce((sum, row) => sum + row.quantity, 0),
//       subtotal: rows.reduce((sum, row) => sum + row.total, 0)
//     });
//   });
  
//   return result;
// };
//   // ========== GET STATUS LABEL ==========
//   const getStatusLabel = (status) => {
//     const labels = {
//       'placed': 'Order Placed',
//       'follow_up': 'Follow Up',
//       'accepted': 'Accepted',
//       'approved': 'Approved',
//       'hold': 'On Hold',
//       'ready_to_ship': 'Ready to Ship',
//       'courier_assigned': 'Courier Assigned',
//       'rejected': 'Rejected',
//       'cancelled': 'Cancelled',
//       'reminder': 'Reminder',
//       'processing': 'Processing',
//       'shipped': 'Shipped',
//       'out_for_delivery': 'Out for Delivery',
//       'delivered': 'Delivered',
//       'refunded': 'Refunded',
//       'failed': 'Failed',
//       'returned': 'Returned',
//       'partial_delivery': 'Partial Delivery'
//     };
//     return labels[status] || status;
//   };

//   // ========== GET STATUS COLOR ==========
//   const getStatusColor = (status) => {
//     const colors = {
//       'placed': 'bg-blue-100 text-blue-700 border-blue-200',
//       'follow_up': 'bg-blue-50 text-blue-600 border-blue-200',
//       'accepted': 'bg-green-100 text-green-700 border-green-200',
//       'approved': 'bg-green-100 text-green-700 border-green-200',
//       'hold': 'bg-yellow-100 text-yellow-700 border-yellow-200',
//       'ready_to_ship': 'bg-purple-100 text-purple-700 border-purple-200',
//       'courier_assigned': 'bg-indigo-100 text-indigo-700 border-indigo-200',
//       'rejected': 'bg-red-100 text-red-700 border-red-200',
//       'cancelled': 'bg-red-100 text-red-700 border-red-200',
//       'reminder': 'bg-orange-100 text-orange-700 border-orange-200',
//       'processing': 'bg-blue-100 text-blue-700 border-blue-200',
//       'shipped': 'bg-purple-100 text-purple-700 border-purple-200',
//       'out_for_delivery': 'bg-orange-100 text-orange-700 border-orange-200',
//       'delivered': 'bg-green-100 text-green-700 border-green-200',
//       'refunded': 'bg-gray-100 text-gray-700 border-gray-200',
//       'failed': 'bg-red-100 text-red-700 border-red-200',
//       'returned': 'bg-purple-100 text-purple-700 border-purple-200',
//       'partial_delivery': 'bg-yellow-100 text-yellow-700 border-yellow-200'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
//   };

//   // ========== GET ICON COMPONENT ==========
//   const getIconComponent = (iconName, className = "w-3 h-3 sm:w-4 sm:h-4") => {
//     const icons = {
//       'FaPhone': <FaPhone className={className} />,
//       'FaEnvelope': <FaEnvelope className={className} />,
//       'FaWhatsapp': <FaWhatsapp className={className} />,
//       'FaMapMarkerAlt': <FaMapMarkerAlt className={className} />,
//       'FaHeadset': <FaHeadset className={className} />
//     };
//     return icons[iconName] || <FaPhone className={className} />;
//   };

//   // ========== GET ICON COLOR ==========
//   const getIconColor = (iconName) => {
//     const colors = {
//       'FaPhone': 'text-blue-600',
//       'FaEnvelope': 'text-green-600',
//       'FaWhatsapp': 'text-green-500',
//       'FaMapMarkerAlt': 'text-red-600',
//       'FaHeadset': 'text-blue-600'
//     };
//     return colors[iconName] || 'text-blue-600';
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
//           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (error || !order) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white pt-20">
//           <div className="container mx-auto px-4 max-w-3xl text-center py-16">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
//               <div className="w-20 h-20 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
//                 <FaCheckCircle className="w-10 h-10 text-red-500" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Playfair Display"' }}>
//                 Order Not Found
//               </h2>
//               <p className="text-gray-500 mb-6">{error || 'Unable to load order details'}</p>
//               <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                 <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg">
//                   <FaHome className="w-4 h-4" />
//                   Return Home
//                 </Link>
//                 <Link href="/track" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
//                   <FaSearch className="w-4 h-4" />
//                   Track Order
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const isCancelled = order.orderStatus === 'cancelled';
//   const isRejected = order.orderStatus === 'rejected';
  
//   const getStatusTimeline = () => {
//     if (!order.statusHistory || order.statusHistory.length === 0) {
//       return [
//         {
//           status: order.orderStatus,
//           label: getStatusLabel(order.orderStatus),
//           timestamp: order.createdAt,
//           isCurrent: true,
//           isCompleted: true,
//           color: getStatusColor(order.orderStatus)
//         }
//       ];
//     }
    
//     const uniqueStatuses = [];
//     const seen = new Set();
    
//     order.statusHistory.forEach(entry => {
//       if (!seen.has(entry.status)) {
//         seen.add(entry.status);
//         uniqueStatuses.push({
//           status: entry.status,
//           label: getStatusLabel(entry.status),
//           timestamp: entry.timestamp,
//           color: getStatusColor(entry.status)
//         });
//       }
//     });
    
//     const hasCurrentStatus = uniqueStatuses.some(s => s.status === order.orderStatus);
//     if (!hasCurrentStatus) {
//       uniqueStatuses.push({
//         status: order.orderStatus,
//         label: getStatusLabel(order.orderStatus),
//         timestamp: order.updatedAt || order.createdAt,
//         color: getStatusColor(order.orderStatus)
//       });
//     }
    
//     if (uniqueStatuses.length > 0) {
//       uniqueStatuses[uniqueStatuses.length - 1].isCurrent = true;
//       uniqueStatuses[uniqueStatuses.length - 1].isCompleted = true;
//     }
    
//     uniqueStatuses.forEach((s, index) => {
//       s.isCompleted = true;
//       if (index === uniqueStatuses.length - 1) {
//         s.isCurrent = true;
//       }
//     });
    
//     return uniqueStatuses;
//   };

//   const statusTimeline = getStatusTimeline();
//   const contactItems = getContactItems();
  
//   // ============================================================
//   // ✅ GROUPED ITEMS
//   // ============================================================
//   const groupedItems = groupItemsForDisplay(order.items || []);

//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-white py-4 sm:py-8">
//         <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
//           {/* Success Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mb-6 sm:mb-8"
//           >
//             <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-3 sm:mb-4 border-4 border-blue-200">
//               <FaCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display"' }}>
//               Thank You for Your Order! ⚡
//             </h1>
//             <p className="text-sm sm:text-base text-gray-500 mt-2">
//               Your order has been placed successfully. We'll notify you when it ships.
//             </p>
//           </motion.div>

//           {/* Order Reference */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
//               <div className="text-center sm:text-left">
//                 <p className="text-xs sm:text-sm text-gray-500">Order Reference</p>
//                 <p className="text-lg sm:text-xl font-bold text-gray-900">
//                   #{order.orderNumber || order._id.slice(-8).toUpperCase()}
//                 </p>
//                 <p className="text-[10px] sm:text-xs text-gray-500">
//                   Placed on {new Date(order.createdAt).toLocaleDateString('en-BD', {
//                     day: '2-digit',
//                     month: 'short',
//                     year: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </p>
//               </div>
//               <div className="flex gap-2 flex-wrap justify-center">
//                 <button
//                   onClick={downloadPDF}
//                   disabled={pdfLoading}
//                   className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {pdfLoading ? (
//                     <>
//                       <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
//                       <span className="hidden sm:inline">Generating...</span>
//                     </>
//                   ) : (
//                     <>
//                       <FaDownload className="w-3 h-3 sm:w-4 h-4" />
//                       <span className="hidden sm:inline">Download Invoice</span>
//                       <span className="sm:hidden">Invoice</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Tracking Section */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                 <FaTruck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h2 className="text-xs sm:text-sm font-bold text-gray-900" style={{ fontFamily: '"Playfair Display"' }}>
//                   Track Your Order
//                 </h2>
//                 <p className="text-[10px] sm:text-xs text-gray-500 truncate">
//                   Track your order status using your phone number
//                 </p>
//               </div>
//               <Link
//                 href="/track"
//                 className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-[10px] sm:text-sm whitespace-nowrap font-medium shadow-md hover:shadow-lg"
//               >
//                 <FaSearch className="w-3 h-3 sm:w-4 sm:h-4" />
//                 <span className="hidden xs:inline">Track Order</span>
//                 <span className="xs:hidden">Track</span>
//               </Link>
//             </div>
//           </div>

//           {/* Order Details */}
//           <div ref={invoiceRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
//             <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
//               <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2" style={{ fontFamily: '"Playfair Display"' }}>
//                 <FaFileInvoice className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
//                 Order Details
//               </h2>
//               <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
//                 isCancelled || isRejected ? 'bg-red-50 text-red-600 border border-red-200' :
//                 order.orderStatus === 'delivered' ? 'bg-green-50 text-green-600 border border-green-200' :
//                 'bg-blue-50 text-blue-600 border border-blue-200'
//               }`}>
//                 {isRejected ? 'REJECTED' : isCancelled ? 'CANCELLED' : order.orderStatus.toUpperCase()}
//               </span>
//             </div>

//             {/* Status Timeline */}
//             {!isCancelled && !isRejected && statusTimeline.length > 0 && (
//               <div className="mb-6">
//                 <div className="relative">
//                   <div className="flex items-start justify-between overflow-x-auto pb-3 gap-1 sm:gap-2">
//                     {statusTimeline.map((step, index) => {
//                       const isLast = index === statusTimeline.length - 1;
//                       const isCompleted = step.isCompleted;
//                       const isCurrent = step.isCurrent;
//                       const formattedTime = step.timestamp ? new Date(step.timestamp).toLocaleString('en-BD', {
//                         day: '2-digit',
//                         month: 'short',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       }) : '';
                      
//                       return (
//                         <div key={step.status} className="flex flex-col items-center flex-1 min-w-[70px] sm:min-w-[80px] relative">
//                           {!isLast && (
//                             <div className={`absolute top-3 sm:top-4 left-[55%] sm:left-[60%] w-[70%] sm:w-[80%] h-0.5 ${
//                               isCompleted ? 'bg-blue-600' : 'bg-gray-200'
//                             }`} />
//                           )}
                          
//                           <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[8px] sm:text-xs font-bold z-10 ${
//                             isCompleted ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-gray-200 text-gray-500 border border-gray-300'
//                           } ${isCurrent ? 'ring-2 sm:ring-4 ring-blue-200' : ''}`}>
//                             {index + 1}
//                           </div>
                          
//                           <span className={`text-[7px] sm:text-[9px] mt-1 sm:mt-1.5 text-center font-medium leading-tight ${
//                             isCompleted ? 'text-gray-900' : 'text-gray-400'
//                           }`}>
//                             {step.label}
//                           </span>
                          
//                           {step.timestamp && (
//                             <span className="text-[6px] sm:text-[8px] text-gray-400 mt-0.5 text-center max-w-[65px] sm:max-w-[90px] leading-tight">
//                               {formattedTime}
//                             </span>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Customer & Delivery Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
//               <div className="p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
//                 <p className="text-[10px] sm:text-xs text-gray-700 uppercase tracking-wider font-bold mb-2 sm:mb-3">Customer Information</p>
//                 <div className="space-y-1.5 sm:space-y-2">
//                   <div>
//                     <p className="text-[10px] sm:text-xs text-gray-500">Full Name</p>
//                     <p className="text-xs sm:text-sm font-medium text-gray-900 break-words">{order.customerInfo.fullName}</p>
//                   </div>
//                   {order.customerInfo.email && (
//                     <div>
//                       <p className="text-[10px] sm:text-xs text-gray-500">Email</p>
//                       <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.email}</p>
//                     </div>
//                   )}
//                   <div>
//                     <p className="text-[10px] sm:text-xs text-gray-500">Phone</p>
//                     <p className="text-xs sm:text-sm text-gray-700">{order.customerInfo.phone}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] sm:text-xs text-gray-500">Full Address</p>
//                     <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.address}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
//                 <p className="text-[10px] sm:text-xs text-gray-700 uppercase tracking-wider font-bold mb-2 sm:mb-3">Delivery Address</p>
//                 <div className="space-y-1.5 sm:space-y-2">
//                   {order.customerInfo.area && (
//                     <div>
//                       <p className="text-[10px] sm:text-xs text-gray-500">Area/Union</p>
//                       <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.area}</p>
//                     </div>
//                   )}
//                   <div>
//                     <p className="text-[10px] sm:text-xs text-gray-500">Upazila/Thana</p>
//                     <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.zone}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] sm:text-xs text-gray-500">District/City</p>
//                     <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.city}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] sm:text-xs text-gray-500">Division</p>
//                     <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.division}</p>
//                   </div>
//                   {order.customerInfo.zipCode && (
//                     <div>
//                       <p className="text-[10px] sm:text-xs text-gray-500">Zip Code</p>
//                       <p className="text-xs sm:text-sm text-gray-700">{order.customerInfo.zipCode}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
//               <div>
//                 <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Order ID</p>
//                 <p className="text-[10px] sm:text-sm font-mono font-bold text-gray-900 break-words">
//                   {order.orderNumber || order._id.slice(-8).toUpperCase()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Date</p>
//                 <p className="text-[10px] sm:text-sm font-medium text-gray-900">
//                   {new Date(order.createdAt).toLocaleDateString('en-BD')}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Payment</p>
//                 <p className="text-[10px] sm:text-sm font-medium text-gray-900 capitalize">{order.paymentMethod}</p>
//               </div>
//               <div>
//                 <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Status</p>
//                 <p className="text-[10px] sm:text-sm font-medium text-gray-900 capitalize">{order.orderStatus}</p>
//               </div>
//             </div>

//  {/* ITEMS TABLE - HIERARCHICAL VIEW (KEEPS PRODUCT NAME, HIDES PRICES) */}

// {/* ITEMS TABLE - HIERARCHICAL VIEW WITH ROW-SPECIFIC IMAGES */}
// <div className="overflow-x-auto">
//   <table className="w-full text-[10px] sm:text-sm">
//     <thead>
//       <tr className="border-b border-gray-200">
//         <th className="text-left py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium">#</th>
//         <th className="text-left py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium">Product / Variant</th>
//         {/* <th className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium">Color</th> */}
//         <th className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium">Qty</th>
//         <th className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium hidden sm:table-cell">Unit</th>
//         <th className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium hidden sm:table-cell">Price</th>
//         <th className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 font-medium">Total</th>
//       </tr>
//     </thead>
//     <tbody>
//       {groupedItems.map((productGroup, groupIndex) => {
//         const rows = productGroup.rows || [];
//         const hasVariants = productGroup.hasVariants;
        
//         if (rows.length === 0) return null;
        
//         let rowNumber = groupIndex + 1;
        
//         return rows.map((row, rowIndex) => {
//           const indent = row.indent || 0;
//           const prefix = indent === 0 ? '' : indent === 1 ? '▸ ' : '  ↳ ';
//           const paddingLeft = indent === 0 ? 'pl-1' : indent === 1 ? 'pl-4 sm:pl-5' : 'pl-7 sm:pl-9';
          
//           // Show row number only for base rows
//           const showRowNumber = row.isBase ? rowNumber : '';
          
//           // Badge display
//           let badgeDisplay = null;
//           if (row.badge) {
//             badgeDisplay = (
//               <span className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded ml-1 ${
//                 row.badge === 'Product' ? 'bg-gray-100 text-gray-500' :
//                 row.badge === 'Variant' ? 'bg-purple-50 text-purple-600' :
//                 row.badge === 'Sub' ? 'bg-blue-50 text-blue-600' : ''
//               }`}>
//                 {row.badge}
//               </span>
//             );
//           }
          
//           // Discount display
//           let discountDisplay = null;
//           if (row.hasDiscount && row.originalPrice && row.originalPrice > row.price && row.showPrice !== false && !row.isHeader) {
//             discountDisplay = (
//               <span className="text-[8px] sm:text-[9px] text-green-600 bg-green-50 px-1 py-0.5 rounded">
//                 Save {Math.round(((row.originalPrice - row.price) / row.originalPrice) * 100)}%
//               </span>
//             );
//           }
          
//           // Color display
//           const hasColor = row.hasColor && row.color;
//           const color = row.color;
          
//           // Price display
//           const showPrice = row.showPrice !== false && !row.isHeader && !(row.isBase && hasVariants);
//           const price = row.price || 0;
//           const originalPrice = row.originalPrice || null;
//           const hasDiscount = row.hasDiscount || (originalPrice && originalPrice > price);
//           const quantity = row.quantity || 0;
//           const total = row.total || (price * quantity);
          
//           // Display name - just show the name without parent prefix
//           let displayName = row.displayName || row.name || 'Product';
//           let fullDisplay = displayName;
          
//           const isHeaderRow = row.isHeader === true;
//           const isBaseRow = row.isBase === true;
//           const isVariantRow = row.isVariant === true && !row.isHeader;
//           const isSubVariantRow = row.isSubVariant === true;
          
//           // ✅ Use the row's own image - this is the key change
//           // Each row should have its own image from the item data
//           const rowImage = row.image || null;
          
//           return (
//             <tr 
//               key={`${groupIndex}-${rowIndex}`} 
//               className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
//                 rowIndex === 0 ? 'border-t border-gray-200' : ''
//               } ${isHeaderRow ? 'bg-gray-50/30' : ''}`}
//             >
//               <td className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 text-[8px] sm:text-xs align-middle">
//                 {showRowNumber}
//               </td>
//               <td className={`py-1.5 sm:py-2 px-1.5 sm:px-2 ${paddingLeft} align-middle`}>
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   {/* ✅ Show row's own image if available */}
//                   {rowImage ? (
//                     <img 
//                       src={rowImage} 
//                       alt={displayName}
//                       className={`rounded object-cover border border-gray-200 flex-shrink-0 ${
//                         indent === 0 ? 'w-6 h-6 sm:w-8 sm:h-8' : 
//                         indent === 1 ? 'w-5 h-5 sm:w-6 sm:h-6' : 
//                         'w-4 h-4 sm:w-5 sm:h-5'
//                       }`}
//                       onError={(e) => { 
//                         e.target.src = 'https://via.placeholder.com/32?text=No+Image'; 
//                       }}
//                     />
//                   ) : (
//                     // If no image, show prefix for indented items
//                     indent > 0 && (
//                       <span className="text-gray-400 text-[10px] sm:text-xs flex-shrink-0">{prefix}</span>
//                     )
//                   )}
//                   <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
//                     <span className={`break-words ${
//                       isHeaderRow ? 'font-bold text-purple-700' :
//                       isBaseRow ? 'font-semibold text-gray-900' : 
//                       isVariantRow ? 'font-medium text-gray-800' : 
//                       'text-gray-700'
//                     } ${isHeaderRow ? 'text-xs sm:text-sm' : 'text-[9px] sm:text-xs'}`}>
//                       {fullDisplay}
//                     </span>
//                     {badgeDisplay}
//                     {discountDisplay}
//                     {isHeaderRow && row.quantity === 0 && (
//                       <span className="text-[8px] text-gray-400 ml-1">(See sub variants below)</span>
//                     )}
//                     {isBaseRow && hasVariants && (
//                       <span className="text-[8px] text-gray-400 ml-1">(See variants below)</span>
//                     )}
//                   </div>
//                 </div>
//               </td>
//               {/* <td className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 align-middle">
//                 {hasColor ? (
//                   <div className="flex items-center justify-center">
//                     <div 
//                       className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-200 flex-shrink-0 shadow-sm"
//                       style={{ backgroundColor: color }}
//                       title={color}
//                     />
//                   </div>
//                 ) : (
//                   <span className="text-gray-300 text-[8px]">-</span>
//                 )}
//               </td> */}
//               <td className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-700 text-[9px] sm:text-xs font-medium align-middle">
//                 {isHeaderRow ? '-' : quantity}
//               </td>
//               <td className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-500 text-[8px] sm:text-xs hidden sm:table-cell align-middle">
//                 {row.unit || 'pcs'}
//               </td>
//               <td className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 text-gray-700 text-[8px] sm:text-xs hidden sm:table-cell align-middle">
//                 {isHeaderRow || !showPrice ? '-' : (
//                   hasDiscount ? (
//                     <>
//                       <span className="text-green-600 font-medium">৳{price.toFixed(2)}</span>
//                       <span className="text-gray-400 line-through ml-1 text-[7px] sm:text-[8px]">৳{originalPrice.toFixed(2)}</span>
//                     </>
//                   ) : (
//                     <>৳{price.toFixed(2)}</>
//                   )
//                 )}
//               </td>
//               <td className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 font-medium text-gray-900 text-[9px] sm:text-xs align-middle">
//                 {isHeaderRow ? '-' : `৳${total.toFixed(2)}`}
//               </td>
//             </tr>
//           );
//         });
//       })}
//     </tbody>
//     <tfoot>
//       <tr className="border-t border-gray-200">
//         <td colSpan="5" className="py-1.5 sm:py-2 px-1.5 sm:px-2 hidden sm:table-cell"></td>
//         <td colSpan="2" className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right text-[9px] sm:text-xs text-gray-500">Subtotal:</td>
//         <td className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right text-[9px] sm:text-xs text-gray-700">৳{order.subtotal.toFixed(2)}</td>
//       </tr>
//       <tr>
//         <td colSpan="5" className="py-0.5 sm:py-1 px-1.5 sm:px-2 hidden sm:table-cell"></td>
//         <td colSpan="2" className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-gray-500">Shipping:</td>
//         <td className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-gray-700">৳{order.shippingCost.toFixed(2)}</td>
//       </tr>
//       {order.discount > 0 && (
//         <tr>
//           <td colSpan="5" className="py-0.5 sm:py-1 px-1.5 sm:px-2 hidden sm:table-cell"></td>
//           <td colSpan="2" className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-green-600">Discount:</td>
//           <td className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-green-600">-৳{order.discount.toFixed(2)}</td>
//         </tr>
//       )}
//       <tr className="border-t-2 border-blue-600">
//         <td colSpan="5" className="py-1.5 sm:py-2 px-1.5 sm:px-2 hidden sm:table-cell"></td>
//         <td colSpan="2" className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right font-bold text-[9px] sm:text-sm text-gray-900">Total:</td>
//         <td className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right font-bold text-blue-600 text-[10px] sm:text-lg">৳{order.total.toFixed(2)}</td>
//       </tr>
//     </tfoot>
//   </table>
// </div>

//             {/* Payment Info */}
//             <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between text-[10px] sm:text-sm gap-1 sm:gap-0">
//               <div>
//                 <span className="text-gray-500">Payment Method: </span>
//                 <span className="font-medium text-gray-900 capitalize">{order.paymentMethod}</span>
//               </div>
//               <div>
//                 <span className="text-gray-500">Payment Status: </span>
//                 <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-gray-900'}`}>
//                   {order.paymentStatus.toUpperCase()}
//                 </span>
//               </div>
//             </div>

//             {order.customerInfo.note && (
//               <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200">
//                 <p className="text-[10px] sm:text-xs text-gray-500">Order Note</p>
//                 <p className="text-xs sm:text-sm text-gray-700 break-words">{order.customerInfo.note}</p>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
//             <Link href="/products" className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg text-sm sm:text-base">
//               <FaHome className="w-4 h-4 sm:w-5 sm:h-5" />
//               Continue Shopping
//             </Link>
//           </div>

//           {/* Support Info */}
//           <div className="mt-6 text-center text-[10px] sm:text-sm text-gray-500">
//             <p>Need help? Contact our support team</p>
//             <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2">
//               {contactItems.map((contact, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleContactClick(contact)}
//                   className={`flex items-center gap-1 hover:underline text-xs sm:text-sm transition-colors ${getIconColor(contact.icon)}`}
//                 >
//                   {getIconComponent(contact.icon, "w-3 h-3 sm:w-4 sm:h-4")}
//                   <span className="hidden xs:inline">{contact.label}</span>
//                   <span className="xs:hidden">
//                     {contact.label === 'Phone' ? 'Call' : 
//                      contact.label === 'Email' ? 'Email' : 
//                      contact.label === 'WhatsApp' ? 'WhatsApp' : contact.label}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaPrint,
  FaDownload,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaClock,
  FaTruck,
  FaFileInvoice,
  FaHome,
  FaStore,
  FaUser,
  FaSearch,
  FaWhatsapp,
  FaMapPin,
  FaCity,
  FaBuilding,
  FaLocationArrow,
  FaPalette,
  FaHeadset,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaExclamationTriangle,
  FaArrowRight,
  FaGift,
  FaHeart,
  FaStar,
  FaShieldAlt,
  FaLeaf,
  FaRocket,
  FaTrophy,
  FaSparkles,
  FaUsers,
  FaAward,
  FaGlobe,
  FaSmile,
  FaGem,
  FaHands,
  FaSeedling,
  FaCalendarAlt,
  FaShippingFast
} from 'react-icons/fa';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { generateInvoicePDF } from '@/utils/invoicePDF';

// ============================================================
// FONTS - Beauty Theme
// ============================================================
const FONT_FAMILY = "'Raleway'";
const FONT_FAMILY_PLAYFAIR = " serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

// ============================================================
// COLOR PALETTE - Beauty Theme (Deeper text for readability)
// ============================================================
const COLORS = {
  primary: '#8B9D83',
  primaryLight: '#A8B8A0',
  primaryDark: '#6B7D63',
  primaryBg: '#F2F5F0',
  skin: '#F5EDE3',
  skinMedium: '#E8DCD0',
  skinDark: '#D4C4B4',
  text: '#1A1A1A',        // Deeper for readability
  textSecondary: '#2D2D2D', // Secondary text
  textLight: '#4A4A4A',    // Lighter but still readable
  textMuted: '#6B6B6B',    // Muted but readable
  white: '#FFFFFF',
  border: '#E8E0D8',
  success: '#8B9D83',
  successBg: '#F2F5F0',
  accent: '#A8B8A0',
};

// ============================================================
// HELPER: Get color name
// ============================================================
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

// ============================================================
// ICON MAP
// ============================================================
const ICON_MAP = {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaHeadset,
  FaHeart,
  FaLeaf,
  FaShippingFast,
  FaShieldAlt,
  FaStar,
  FaUsers,
  FaAward,
  FaGlobe,
  FaCheckCircle,
  FaGift,
  FaSmile,
  FaRocket,
  FaStore,
  FaTrophy,
  FaGem,
  FaHands,
  FaSeedling,
  FaCalendarAlt,
  FaMapPin,
  FaTruck,
};

const getIcon = (iconName) => {
  const Icon = ICON_MAP[iconName];
  return Icon || FaStar;
};

export default function ThankYouClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const sessionIdFromUrl = searchParams.get('sessionId');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const invoiceRef = useRef(null);
  const [expandedSections, setExpandedSections] = useState({
    items: true,
    details: false
  });
  
  const [footerData, setFooterData] = useState(null);
  const [isFooterLoading, setIsFooterLoading] = useState(true);

  // ============================================================
  // FETCH FOOTER DATA
  // ============================================================
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setIsFooterLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/footer`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch footer data');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          setFooterData(data.data);
        } else {
          throw new Error('Invalid footer data');
        }
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setFooterData({
          company: {
            phone: '+880 1871 733305',
            email: 'info@smartgadget.com',
          },
          columns: [
            {
              type: 'contact',
              items: [
                { type: 'phone', value: '+880 1871 733305' },
                { type: 'email', value: 'info@smartgadget.com' },
              ]
            }
          ]
        });
      } finally {
        setIsFooterLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // ============================================================
  // GET CONTACT ITEMS
  // ============================================================
  const getContactItems = () => {
    if (!footerData) return [];
    
    const contactColumn = footerData.columns?.find(col => col.type === 'contact');
    const items = contactColumn?.items || [];
    const company = footerData.company || {};
    
    const contacts = [];
    
    const phoneItem = items.find(item => item.type === 'phone');
    if (phoneItem) {
      const cleanPhone = phoneItem.value.replace(/[^0-9+]/g, '');
      contacts.push({
        icon: 'FaPhone',
        label: 'Phone',
        value: phoneItem.value,
        link: `tel:${cleanPhone}`,
        cleanValue: cleanPhone,
        color: 'text-[#8B9D83]'
      });
    } else if (company.phone) {
      const cleanPhone = company.phone.replace(/[^0-9+]/g, '');
      contacts.push({
        icon: 'FaPhone',
        label: 'Phone',
        value: company.phone,
        link: `tel:${cleanPhone}`,
        cleanValue: cleanPhone,
        color: 'text-[#8B9D83]'
      });
    }
    
    const emailItem = items.find(item => item.type === 'email');
    if (emailItem) {
      contacts.push({
        icon: 'FaEnvelope',
        label: 'Email',
        value: emailItem.value,
        link: `mailto:${emailItem.value}`,
        cleanValue: emailItem.value,
        color: 'text-[#8B9D83]'
      });
    } else if (company.email) {
      contacts.push({
        icon: 'FaEnvelope',
        label: 'Email',
        value: company.email,
        link: `mailto:${company.email}`,
        cleanValue: company.email,
        color: 'text-[#8B9D83]'
      });
    }
    
    const whatsappItem = items.find(item => item.type === 'whatsapp');
    if (whatsappItem) {
      const cleanPhone = whatsappItem.value.replace(/[^0-9+]/g, '');
      contacts.push({
        icon: 'FaWhatsapp',
        label: 'WhatsApp',
        value: whatsappItem.value,
        link: `https://wa.me/${cleanPhone}`,
        cleanValue: cleanPhone,
        color: 'text-green-500'
      });
    } else if (company.whatsapp) {
      const cleanPhone = company.whatsapp.replace(/[^0-9+]/g, '');
      contacts.push({
        icon: 'FaWhatsapp',
        label: 'WhatsApp',
        value: company.whatsapp,
        link: `https://wa.me/${cleanPhone}`,
        cleanValue: cleanPhone,
        color: 'text-green-500'
      });
    }
    
    if (contacts.length === 0) {
      contacts.push(
        {
          icon: 'FaPhone',
          label: 'Phone',
          value: '+880 1871 733305',
          link: 'tel:+8801871733305',
          cleanValue: '+8801871733305',
          color: 'text-[#8B9D83]'
        },
        {
          icon: 'FaEnvelope',
          label: 'Email',
          value: 'info@smartgadget.com',
          link: 'mailto:info@smartgadget.com',
          cleanValue: 'info@smartgadget.com',
          color: 'text-[#8B9D83]'
        },
        {
          icon: 'FaWhatsapp',
          label: 'WhatsApp',
          value: '+880 1871 733305',
          link: 'https://wa.me/8801871733305',
          cleanValue: '+8801871733305',
          color: 'text-green-500'
        }
      );
    }
    
    return contacts;
  };

  const handleContactClick = (contact) => {
    if (contact.icon === 'FaPhone') {
      const phoneNumber = contact.cleanValue || contact.link.replace('tel:', '');
      try {
        window.location.href = `tel:${phoneNumber}`;
      } catch (err) {
        try {
          const link = document.createElement('a');
          link.href = `tel:${phoneNumber}`;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
          }, 500);
        } catch (err2) {
          toast.info(`Call us at ${contact.value}`);
        }
      }
    } else if (contact.icon === 'FaEnvelope') {
      const email = contact.cleanValue || contact.link.replace('mailto:', '');
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else if (contact.icon === 'FaWhatsapp') {
      window.open(contact.link, '_blank', 'noopener,noreferrer');
    } else {
      window.open(contact.link, '_blank');
    }
  };

  // ============================================================
  // FETCH ORDER DETAILS
  // ============================================================
  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    } else {
      setError('No order ID provided');
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const sessionId = sessionIdFromUrl || localStorage.getItem('cartSessionId');
      const token = localStorage.getItem('token');
      
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`${apiUrl}/api/orders/${orderId}`, {
        headers
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrder(data.data);
      } else {
        if (data.error === 'Unauthorized to view this order' && !token) {
          const retryResponse = await fetch(`${apiUrl}/api/orders/${orderId}`);
          const retryData = await retryResponse.json();
          
          if (retryData.success) {
            setOrder(retryData.data);
            return;
          }
        }
        
        setError(data.error || 'Failed to load order details');
      }
    } catch (error) {
      console.error('Fetch order error:', error);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // DOWNLOAD PDF
  // ============================================================
  const downloadPDF = async () => {
    if (!order || pdfLoading) return;

    setPdfLoading(true);
    try {
      await generateInvoicePDF(order);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };

  // ============================================================
  // GET COLOR DISPLAY
  // ============================================================
  const getColorDisplay = (item) => {
    if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
      const hasValidColors = item.colors.some(c => 
        c.color && 
        c.color !== 'null' && 
        c.color !== '' && 
        c.color !== 'undefined'
      );
      
      if (hasValidColors) {
        return item.colors
          .filter(c => c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined')
          .map(c => ({
            color: c.color,
            quantity: c.quantity || 0,
            price: c.price || item.discountPrice || item.regularPrice
          }));
      }
    }
    
    if (item.selectedColor && 
        item.selectedColor !== 'null' && 
        item.selectedColor !== '' && 
        item.selectedColor !== 'undefined') {
      return [{
        color: item.selectedColor,
        quantity: item.quantity || 0,
        price: item.discountPrice || item.regularPrice
      }];
    }
    
    return [];
  };

  // ============================================================
  // GROUP ITEMS WITH PROPER HIERARCHY
  // ============================================================
  const groupItemsForDisplay = (items) => {
    if (!items || items.length === 0) return [];
    
    const productGroups = {};
    
    items.forEach(item => {
      const productId = item.productId?.toString() || 'unknown';
      
      if (!productGroups[productId]) {
        productGroups[productId] = {
          productId: productId,
          productName: item.productName,
          productSlug: item.productSlug || '',
          image: item.image || '',
          regularPrice: item.regularPrice,
          discountPrice: item.discountPrice || 0,
          unit: item.unit || 'pcs',
          stockQuantity: item.stockQuantity || 0,
          hasVariants: false,
          hasSubVariants: false,
          items: [],
          variantDetails: item.variantDetails || []
        };
      }
      
      productGroups[productId].items.push(item);
      
      if (item.isVariant || item.isSubVariant || (item.variantDetails && item.variantDetails.length > 0)) {
        productGroups[productId].hasVariants = true;
      }
      
      if (item.isSubVariant) {
        productGroups[productId].hasSubVariants = true;
      }
      
      if (item.variantDetails && item.variantDetails.length > 0) {
        item.variantDetails.forEach(variant => {
          if (variant.subVariants && variant.subVariants.length > 0) {
            productGroups[productId].hasSubVariants = true;
          }
        });
      }
    });
    
    const result = [];
    
    Object.values(productGroups).forEach(group => {
      const baseItems = group.items.filter(item => 
        !item.isVariant && 
        !item.isSubVariant && 
        item.isBaseProduct !== false
      );
      
      const variantItems = group.items.filter(item => 
        item.isVariant === true && 
        !item.isSubVariant
      );
      
      const subVariantItems = group.items.filter(item => 
        item.isSubVariant === true
      );
      
      const hasNestedVariants = group.variantDetails && group.variantDetails.length > 0;
      
      const rows = [];
      const hasAnyVariants = variantItems.length > 0 || subVariantItems.length > 0 || hasNestedVariants;
      
      // Base product row
      if (baseItems.length > 0) {
        let totalBaseQuantity = 0;
        let totalBasePrice = 0;
        let baseColor = null;
        let hasBaseColor = false;
        
        baseItems.forEach(item => {
          const colorData = getColorDisplay(item);
          const price = item.discountPrice || item.regularPrice || 0;
          totalBaseQuantity += item.quantity || 0;
          totalBasePrice += price * (item.quantity || 0);
          
          if (colorData.length > 0 && !hasBaseColor) {
            baseColor = colorData[0].color;
            hasBaseColor = true;
          }
        });
        
        let variantTotalQuantity = 0;
        let variantTotalPrice = 0;
        
        variantItems.forEach(v => {
          const price = v.variantDiscountPrice > 0 ? v.variantDiscountPrice : 
                       v.variantRegularPrice > 0 ? v.variantRegularPrice :
                       v.discountPrice || v.regularPrice || 0;
          variantTotalQuantity += v.quantity || 0;
          variantTotalPrice += price * (v.quantity || 0);
        });
        
        subVariantItems.forEach(s => {
          const price = s.variantDiscountPrice > 0 ? s.variantDiscountPrice : 
                       s.variantRegularPrice > 0 ? s.variantRegularPrice :
                       s.discountPrice || s.regularPrice || 0;
          variantTotalQuantity += s.quantity || 0;
          variantTotalPrice += price * (s.quantity || 0);
        });
        
        if (hasNestedVariants) {
          group.variantDetails.forEach(v => {
            if (v.subVariants && v.subVariants.length > 0) {
              v.subVariants.forEach(s => {
                const price = s.subVariantDiscountPrice > 0 ? s.subVariantDiscountPrice :
                             s.subVariantRegularPrice > 0 ? s.subVariantRegularPrice :
                             v.variantRegularPrice || 0;
                variantTotalQuantity += s.quantity || 0;
                variantTotalPrice += price * (s.quantity || 0);
              });
            } else {
              const price = v.variantDiscountPrice > 0 ? v.variantDiscountPrice :
                           v.variantRegularPrice > 0 ? v.variantRegularPrice : 0;
              variantTotalQuantity += v.quantity || 0;
              variantTotalPrice += price * (v.quantity || 0);
            }
          });
        }
        
        const finalQuantity = hasAnyVariants ? variantTotalQuantity : totalBaseQuantity;
        const finalTotal = hasAnyVariants ? variantTotalPrice : totalBasePrice;
        
        rows.push({
          type: 'base',
          id: 'base',
          name: group.productName,
          displayName: group.productName,
          image: group.image,
          price: finalQuantity > 0 ? (finalTotal / finalQuantity) : 0,
          quantity: finalQuantity,
          total: finalTotal,
          unit: group.unit || 'pcs',
          color: baseColor,
          hasColor: hasBaseColor,
          isBase: true,
          isVariant: false,
          isSubVariant: false,
          indent: 0,
          badge: 'Product',
          parentName: null,
          grandParentName: null,
          variantId: null,
          subVariantId: null,
          originalPrice: null,
          hasDiscount: false,
          variantName: null,
          subVariantName: null,
          showPrice: !hasAnyVariants
        });
      }
      
      // Variant rows
      variantItems.forEach(item => {
        const colorData = getColorDisplay(item);
        const hasColor = colorData.length > 0;
        const price = item.variantDiscountPrice > 0 ? item.variantDiscountPrice : 
                     item.variantRegularPrice > 0 ? item.variantRegularPrice :
                     item.discountPrice || item.regularPrice || 0;
        const quantity = item.quantity || 0;
        const total = price * quantity;
        const originalPrice = item.variantRegularPrice > 0 && item.variantDiscountPrice > 0 ? item.variantRegularPrice : null;
        const hasDiscount = originalPrice && originalPrice > price;
        
        rows.push({
          type: 'variant',
          id: item.variantId || `variant-${rows.length}`,
          name: item.variantName || 'Variant',
          displayName: item.variantName || 'Variant',
          image: item.image || group.image,
          price: price,
          originalPrice: originalPrice,
          hasDiscount: hasDiscount,
          quantity: quantity,
          total: total,
          unit: group.unit || 'pcs',
          color: hasColor ? colorData[0].color : null,
          hasColor: hasColor,
          isBase: false,
          isVariant: true,
          isSubVariant: false,
          indent: 1,
          parentName: group.productName,
          badge: 'Variant',
          variantId: item.variantId,
          subVariantId: null,
          grandParentName: null,
          variantName: item.variantName,
          subVariantName: null,
          showPrice: true
        });
      });
      
      // Sub-variant rows
      subVariantItems.forEach(item => {
        const colorData = getColorDisplay(item);
        const hasColor = colorData.length > 0;
        const price = item.variantDiscountPrice > 0 ? item.variantDiscountPrice : 
                     item.variantRegularPrice > 0 ? item.variantRegularPrice :
                     item.discountPrice || item.regularPrice || 0;
        const quantity = item.quantity || 0;
        const total = price * quantity;
        const originalPrice = item.variantRegularPrice > 0 && item.variantDiscountPrice > 0 ? item.variantRegularPrice : null;
        const hasDiscount = originalPrice && originalPrice > price;
        
        let parentVariantName = item.variantName || 'Variant';
        const parentVariant = variantItems.find(v => v.variantId === item.variantId);
        if (parentVariant) {
          parentVariantName = parentVariant.variantName || 'Variant';
        }
        
        rows.push({
          type: 'subVariant',
          id: item.subVariantId || `sub-${rows.length}`,
          name: item.subVariantName || 'Sub-Variant',
          displayName: item.subVariantName || 'Sub-Variant',
          image: item.image || group.image,
          price: price,
          originalPrice: originalPrice,
          hasDiscount: hasDiscount,
          quantity: quantity,
          total: total,
          unit: group.unit || 'pcs',
          color: hasColor ? colorData[0].color : null,
          hasColor: hasColor,
          isBase: false,
          isVariant: false,
          isSubVariant: true,
          indent: 2,
          parentName: parentVariantName,
          grandParentName: group.productName,
          badge: 'Sub',
          variantId: item.variantId,
          subVariantId: item.subVariantId,
          variantName: parentVariantName,
          subVariantName: item.subVariantName,
          showPrice: true
        });
      });
      
      // Process nested variantDetails
      if (hasNestedVariants && rows.filter(r => r.isVariant || r.isSubVariant).length === 0) {
        group.variantDetails.forEach(variant => {
          const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
          
          if (hasSubVariants) {
            rows.push({
              type: 'variant',
              id: variant.variantId || `variant-${rows.length}`,
              name: variant.variantName || 'Variant',
              displayName: variant.variantName || 'Variant',
              image: variant.image || group.image,
              price: 0,
              originalPrice: null,
              hasDiscount: false,
              quantity: 0,
              total: 0,
              unit: group.unit || 'pcs',
              color: variant.selectedColor || null,
              hasColor: !!variant.selectedColor,
              isBase: false,
              isVariant: true,
              isSubVariant: false,
              indent: 1,
              parentName: group.productName,
              badge: 'Variant',
              variantId: variant.variantId,
              subVariantId: null,
              grandParentName: null,
              variantName: variant.variantName,
              subVariantName: null,
              isHeader: true,
              showPrice: false
            });
            
            variant.subVariants.forEach(sub => {
              const subPrice = sub.subVariantDiscountPrice > 0 ? sub.subVariantDiscountPrice :
                              sub.subVariantRegularPrice > 0 ? sub.subVariantRegularPrice :
                              variant.variantRegularPrice || 0;
              const subQuantity = sub.quantity || 0;
              const subTotal = subPrice * subQuantity;
              const subOriginalPrice = sub.subVariantRegularPrice > 0 && sub.subVariantDiscountPrice > 0 ? sub.subVariantRegularPrice : null;
              const subHasDiscount = subOriginalPrice && subOriginalPrice > subPrice;
              
              rows.push({
                type: 'subVariant',
                id: sub.subVariantId || `sub-${rows.length}`,
                name: sub.subVariantName || 'Sub-Variant',
                displayName: sub.subVariantName || 'Sub-Variant',
                image: sub.image || variant.image || group.image,
                price: subPrice,
                originalPrice: subOriginalPrice,
                hasDiscount: subHasDiscount,
                quantity: subQuantity,
                total: subTotal,
                unit: group.unit || 'pcs',
                color: sub.selectedColor || variant.selectedColor || null,
                hasColor: !!(sub.selectedColor || variant.selectedColor),
                isBase: false,
                isVariant: false,
                isSubVariant: true,
                indent: 2,
                parentName: variant.variantName || 'Variant',
                grandParentName: group.productName,
                badge: 'Sub',
                variantId: variant.variantId,
                subVariantId: sub.subVariantId,
                variantName: variant.variantName,
                subVariantName: sub.subVariantName,
                showPrice: true
              });
            });
          } else {
            const price = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice :
                         variant.variantRegularPrice > 0 ? variant.variantRegularPrice : 0;
            const quantity = variant.quantity || 1;
            const total = price * quantity;
            const originalPrice = variant.variantRegularPrice > 0 && variant.variantDiscountPrice > 0 ? variant.variantRegularPrice : null;
            const hasDiscount = originalPrice && originalPrice > price;
            
            rows.push({
              type: 'variant',
              id: variant.variantId || `variant-${rows.length}`,
              name: variant.variantName || 'Variant',
              displayName: variant.variantName || 'Variant',
              image: variant.image || group.image,
              price: price,
              originalPrice: originalPrice,
              hasDiscount: hasDiscount,
              quantity: quantity,
              total: total,
              unit: group.unit || 'pcs',
              color: variant.selectedColor || null,
              hasColor: !!variant.selectedColor,
              isBase: false,
              isVariant: true,
              isSubVariant: false,
              indent: 1,
              parentName: group.productName,
              badge: 'Variant',
              variantId: variant.variantId,
              subVariantId: null,
              grandParentName: null,
              variantName: variant.variantName,
              subVariantName: null,
              showPrice: true
            });
          }
        });
      }
      
      // Fallback
      if (rows.length === 0 && group.items.length > 0) {
        const firstItem = group.items[0];
        const colorData = getColorDisplay(firstItem);
        const hasColor = colorData.length > 0;
        const price = firstItem.discountPrice || firstItem.regularPrice || 0;
        const quantity = firstItem.quantity || 0;
        const total = price * quantity;
        
        rows.push({
          type: 'base',
          id: 'base',
          name: group.productName,
          displayName: group.productName,
          image: group.image,
          price: price,
          quantity: quantity,
          total: total,
          unit: group.unit || 'pcs',
          color: hasColor ? colorData[0].color : null,
          hasColor: hasColor,
          isBase: true,
          isVariant: false,
          isSubVariant: false,
          indent: 0,
          badge: 'Product',
          parentName: null,
          grandParentName: null,
          variantId: null,
          subVariantId: null,
          originalPrice: null,
          hasDiscount: false,
          variantName: null,
          subVariantName: null,
          showPrice: true
        });
      }
      
      result.push({
        productId: group.productId,
        productName: group.productName,
        image: group.image,
        hasVariants: group.hasVariants,
        hasSubVariants: group.hasSubVariants,
        rows: rows,
        totalQuantity: rows.reduce((sum, row) => sum + row.quantity, 0),
        subtotal: rows.reduce((sum, row) => sum + row.total, 0)
      });
    });
    
    return result;
  };

  // ============================================================
  // GET STATUS LABEL
  // ============================================================
  const getStatusLabel = (status) => {
    const labels = {
      'placed': 'Order Placed',
      'follow_up': 'Follow Up',
      'accepted': 'Accepted',
      'approved': 'Approved',
      'hold': 'On Hold',
      'ready_to_ship': 'Ready to Ship',
      'courier_assigned': 'Courier Assigned',
      'rejected': 'Rejected',
      'cancelled': 'Cancelled',
      'reminder': 'Reminder',
      'processing': 'Processing',
      'shipped': 'Shipped',
      'out_for_delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'refunded': 'Refunded',
      'failed': 'Failed',
      'returned': 'Returned',
      'partial_delivery': 'Partial Delivery'
    };
    return labels[status] || status;
  };

  // ============================================================
  // GET STATUS COLOR - Beauty Theme
  // ============================================================
  const getStatusColor = (status) => {
    const colors = {
      'placed': 'bg-[#F2F5F0] text-[#1A1A1A] border-[#A8B8A0]',
      'follow_up': 'bg-[#F2F5F0] text-[#1A1A1A] border-[#A8B8A0]',
      'accepted': 'bg-[#F2F5F0] text-[#1A1A1A] border-[#A8B8A0]',
      'approved': 'bg-[#F2F5F0] text-[#1A1A1A] border-[#A8B8A0]',
      'hold': 'bg-yellow-50 text-[#1A1A1A] border-yellow-200',
      'ready_to_ship': 'bg-[#F2F5F0] text-[#1A1A1A] border-[#A8B8A0]',
      'courier_assigned': 'bg-[#F2F5F0] text-[#1A1A1A] border-[#A8B8A0]',
      'rejected': 'bg-red-50 text-[#1A1A1A] border-red-200',
      'cancelled': 'bg-red-50 text-[#1A1A1A] border-red-200',
      'reminder': 'bg-orange-50 text-[#1A1A1A] border-orange-200',
      'processing': 'bg-[#F2F5F0] text-[#1A1A1A] border-[#A8B8A0]',
      'shipped': 'bg-[#F2F5F0] text-[#1A1A1A] border-[#A8B8A0]',
      'out_for_delivery': 'bg-orange-50 text-[#1A1A1A] border-orange-200',
      'delivered': 'bg-[#F2F5F0] text-[#1A1A1A] border-[#A8B8A0]',
      'refunded': 'bg-gray-50 text-[#1A1A1A] border-gray-200',
      'failed': 'bg-red-50 text-[#1A1A1A] border-red-200',
      'returned': 'bg-purple-50 text-[#1A1A1A] border-purple-200',
      'partial_delivery': 'bg-yellow-50 text-[#1A1A1A] border-yellow-200'
    };
    return colors[status] || 'bg-gray-50 text-[#1A1A1A] border-gray-200';
  };

  // ============================================================
  // GET ICON COMPONENT
  // ============================================================
  const getIconComponent = (iconName, className = "w-3 h-3 sm:w-4 sm:h-4") => {
    const icons = {
      'FaPhone': <FaPhone className={className} />,
      'FaEnvelope': <FaEnvelope className={className} />,
      'FaWhatsapp': <FaWhatsapp className={className} />,
      'FaMapMarkerAlt': <FaMapMarkerAlt className={className} />,
      'FaHeadset': <FaHeadset className={className} />
    };
    return icons[iconName] || <FaPhone className={className} />;
  };

  // ============================================================
  // GET ICON COLOR
  // ============================================================
  const getIconColor = (iconName) => {
    const colors = {
      'FaPhone': 'text-[#8B9D83]',
      'FaEnvelope': 'text-[#8B9D83]',
      'FaWhatsapp': 'text-green-500',
      'FaMapMarkerAlt': 'text-[#8B9D83]',
      'FaHeadset': 'text-[#8B9D83]'
    };
    return colors[iconName] || 'text-[#8B9D83]';
  };

  // ============================================================
  // ANIMATIONS
  // ============================================================
  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  };

  const scaleFade = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#F8F7F2] pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-[3px] border-[#8B9D83] border-t-transparent" />
            <p className="mt-4 text-xs tracking-wide text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>
              Loading your order...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================
  if (error || !order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#F8F7F2] pt-20">
          <div className="container mx-auto px-4 max-w-3xl text-center py-16">
            <div className="bg-white rounded-2xl border border-[#E8E0D8] p-8 sm:p-12 shadow-sm">
              <div className="w-20 h-20 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
                <FaExclamationTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-light text-[#1A1A1A] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                Order Not Found
              </h2>
              <p className="text-sm text-[#4A4A4A] mb-6" style={{ fontFamily: FONT_FAMILY_INTER }}>
                {error || 'Unable to load order details'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#8B9D83] text-white rounded-xl hover:bg-[#6B7D63] transition-colors font-medium shadow-md hover:shadow-lg text-sm"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  <FaHome className="w-4 h-4" />
                  Return Home
                </Link>
                <Link 
                  href="/track" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#E8E0D8] text-[#1A1A1A] rounded-xl hover:bg-[#F2F5F0] transition-colors font-medium text-sm"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  <FaSearch className="w-4 h-4" />
                  Track Order
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  const isCancelled = order.orderStatus === 'cancelled';
  const isRejected = order.orderStatus === 'rejected';
  
  const getStatusTimeline = () => {
    if (!order.statusHistory || order.statusHistory.length === 0) {
      return [
        {
          status: order.orderStatus,
          label: getStatusLabel(order.orderStatus),
          timestamp: order.createdAt,
          isCurrent: true,
          isCompleted: true,
          color: getStatusColor(order.orderStatus)
        }
      ];
    }
    
    const uniqueStatuses = [];
    const seen = new Set();
    
    order.statusHistory.forEach(entry => {
      if (!seen.has(entry.status)) {
        seen.add(entry.status);
        uniqueStatuses.push({
          status: entry.status,
          label: getStatusLabel(entry.status),
          timestamp: entry.timestamp,
          color: getStatusColor(entry.status)
        });
      }
    });
    
    const hasCurrentStatus = uniqueStatuses.some(s => s.status === order.orderStatus);
    if (!hasCurrentStatus) {
      uniqueStatuses.push({
        status: order.orderStatus,
        label: getStatusLabel(order.orderStatus),
        timestamp: order.updatedAt || order.createdAt,
        color: getStatusColor(order.orderStatus)
      });
    }
    
    if (uniqueStatuses.length > 0) {
      uniqueStatuses[uniqueStatuses.length - 1].isCurrent = true;
      uniqueStatuses[uniqueStatuses.length - 1].isCompleted = true;
    }
    
    uniqueStatuses.forEach((s, index) => {
      s.isCompleted = true;
      if (index === uniqueStatuses.length - 1) {
        s.isCurrent = true;
      }
    });
    
    return uniqueStatuses;
  };

  const statusTimeline = getStatusTimeline();
  const contactItems = getContactItems();
  const groupedItems = groupItemsForDisplay(order.items || []);

  // Toggle section
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      <Navbar />
      
      <main className="relative min-h-screen bg-[#F8F7F2] pt-16 pb-8 overflow-hidden">
        {/* Soft background shapes */}
        <div className="pointer-events-none absolute left-[-180px] top-[100px] h-[400px] w-[400px] rounded-full bg-[#d7dfd2]/30 blur-[100px]" />
        <div className="pointer-events-none absolute right-[-160px] top-[-80px] h-[450px] w-[450px] rounded-full bg-[#e7d9d0]/30 blur-[100px]" />

        <div className="relative z-10 container mx-auto px-3 sm:px-4 max-w-4xl">
          
          {/* ============================================================
              SUCCESS HEADER - Beauty Theme
          ============================================================ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#F2F5F0] rounded-full mb-3 sm:mb-4 border-4 border-[#A8B8A0]">
              <FaCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#8B9D83]" />
            </div>
          
            
            <h1 
              className="text-2xl sm:text-3xl font-light text-[#1A1A1A]" 
              style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
            >
              Thank You for Your Order! ✨
            </h1>
            
            <p 
              className="text-xs sm:text-sm text-[#4A4A4A] mt-2 max-w-md mx-auto"
              style={{ fontFamily: FONT_FAMILY_INTER }}
            >
              Your order has been placed successfully. We'll notify you when it ships.
            </p>
          </motion.div>

          {/* ============================================================
              ORDER REFERENCE
          ============================================================ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-white rounded-2xl border border-[#E8E0D8] p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left">
                <p className="text-[10px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Order Reference
                </p>
                <p 
                  className="text-base sm:text-lg font-medium text-[#1A1A1A]" 
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  #{order.orderNumber || order._id.slice(-8).toUpperCase()}
                </p>
                <p 
                  className="text-[9px] sm:text-xs text-[#4A4A4A]" 
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-BD', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className="flex gap-2 flex-wrap justify-center">
                <button
                  onClick={downloadPDF}
                  disabled={pdfLoading}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F2F5F0] text-[#1A1A1A] rounded-xl hover:bg-[#E8E0D8] transition-colors border border-[#A8B8A0] text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  {pdfLoading ? (
                    <>
                      <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></span>
                      <span className="hidden sm:inline">Generating...</span>
                    </>
                  ) : (
                    <>
                      <FaDownload className="w-3 h-3 sm:w-4 h-4" />
                      <span className="hidden sm:inline">Download Invoice</span>
                      <span className="sm:hidden">Invoice</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* ============================================================
              TRACKING SECTION
          ============================================================ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-white rounded-2xl border border-[#E8E0D8] p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#8B9D83] rounded-full flex items-center justify-center flex-shrink-0">
                <FaTruck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 
                  className="text-xs sm:text-sm font-medium text-[#1A1A1A]" 
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  Track Your Order
                </h2>
                <p 
                  className="text-[9px] sm:text-xs text-[#4A4A4A] truncate"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  Track your order status using your phone number
                </p>
              </div>
              <Link
                href="/track"
                className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#8B9D83] text-white rounded-xl hover:bg-[#6B7D63] transition-all text-[10px] sm:text-sm whitespace-nowrap font-medium shadow-md hover:shadow-lg"
                style={{ fontFamily: FONT_FAMILY }}
              >
                <FaSearch className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Track Order</span>
                <span className="xs:hidden">Track</span>
              </Link>
            </div>
          </motion.div>

          {/* ============================================================
              ORDER DETAILS
          ============================================================ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-white rounded-2xl border border-[#E8E0D8] p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm"
            ref={invoiceRef}
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h2 
                className="text-base sm:text-lg font-medium text-[#1A1A1A] flex items-center gap-2" 
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                <FaFileInvoice className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B9D83]" />
                Order Details
              </h2>
              <span className={`px-3 py-1 rounded-full text-[9px] sm:text-xs font-medium border ${getStatusColor(order.orderStatus)}`} style={{ fontFamily: FONT_FAMILY_INTER }}>
                {isRejected ? 'REJECTED' : isCancelled ? 'CANCELLED' : order.orderStatus.toUpperCase()}
              </span>
            </div>

            {/* Status Timeline */}
            {!isCancelled && !isRejected && statusTimeline.length > 0 && (
              <div className="mb-6">
                <div className="relative">
                  <div className="flex items-start justify-between overflow-x-auto pb-3 gap-1 sm:gap-2">
                    {statusTimeline.map((step, index) => {
                      const isLast = index === statusTimeline.length - 1;
                      const isCompleted = step.isCompleted;
                      const isCurrent = step.isCurrent;
                      const formattedTime = step.timestamp ? new Date(step.timestamp).toLocaleString('en-BD', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : '';
                      
                      return (
                        <div key={step.status} className="flex flex-col items-center flex-1 min-w-[70px] sm:min-w-[80px] relative">
                          {!isLast && (
                            <div className={`absolute top-3 sm:top-4 left-[55%] sm:left-[60%] w-[70%] sm:w-[80%] h-0.5 ${isCompleted ? 'bg-[#8B9D83]' : 'bg-[#E8E0D8]'}`} />
                          )}
                          
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[8px] sm:text-xs font-bold z-10 ${isCompleted ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/25' : 'bg-[#E8E0D8] text-[#4A4A4A] border border-[#D4C4B4]'} ${isCurrent ? 'ring-2 sm:ring-4 ring-[#A8B8A0]/40' : ''}`}>
                            {isCompleted ? <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : index + 1}
                          </div>
                          
                          <span className={`text-[7px] sm:text-[9px] mt-1 sm:mt-1.5 text-center font-medium leading-tight ${isCompleted ? 'text-[#1A1A1A]' : 'text-[#4A4A4A]/40'}`} style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {step.label}
                          </span>
                          
                          {step.timestamp && (
                            <span className="text-[6px] sm:text-[7px] text-[#4A4A4A]/40 mt-0.5 text-center max-w-[65px] sm:max-w-[90px] leading-tight" style={{ fontFamily: FONT_FAMILY_INTER }}>
                              {formattedTime}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Customer & Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div className="p-3 sm:p-4 bg-[#F2F5F0] rounded-xl border border-[#E8E0D8]">
                <p className="text-[10px] sm:text-xs text-[#4A4A4A] uppercase tracking-wider font-semibold mb-2 sm:mb-3" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Customer Information
                </p>
                <div className="space-y-1.5 sm:space-y-2">
                  <div>
                    <p className="text-[9px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Full Name</p>
                    <p className="text-xs sm:text-sm font-medium text-[#1A1A1A] break-words" style={{ fontFamily: FONT_FAMILY }}>{order.customerInfo.fullName}</p>
                  </div>
                  {order.customerInfo.email && (
                    <div>
                      <p className="text-[9px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Email</p>
                      <p className="text-xs sm:text-sm text-[#1A1A1A] break-words" style={{ fontFamily: FONT_FAMILY }}>{order.customerInfo.email}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[9px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Phone</p>
                    <p className="text-xs sm:text-sm text-[#1A1A1A]" style={{ fontFamily: FONT_FAMILY }}>{order.customerInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Full Address</p>
                    <p className="text-xs sm:text-sm text-[#1A1A1A] break-words" style={{ fontFamily: FONT_FAMILY }}>{order.customerInfo.address}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-[#F2F5F0] rounded-xl border border-[#E8E0D8]">
                <p className="text-[10px] sm:text-xs text-[#4A4A4A] uppercase tracking-wider font-semibold mb-2 sm:mb-3" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Delivery Address
                </p>
                <div className="space-y-1.5 sm:space-y-2">
                  {order.customerInfo.area && (
                    <div>
                      <p className="text-[9px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Area/Union</p>
                      <p className="text-xs sm:text-sm text-[#1A1A1A] break-words" style={{ fontFamily: FONT_FAMILY }}>{order.customerInfo.area}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[9px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Upazila/Thana</p>
                    <p className="text-xs sm:text-sm text-[#1A1A1A] break-words" style={{ fontFamily: FONT_FAMILY }}>{order.customerInfo.zone}</p>
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>District/City</p>
                    <p className="text-xs sm:text-sm text-[#1A1A1A] break-words" style={{ fontFamily: FONT_FAMILY }}>{order.customerInfo.city}</p>
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Division</p>
                    <p className="text-xs sm:text-sm text-[#1A1A1A] break-words" style={{ fontFamily: FONT_FAMILY }}>{order.customerInfo.division}</p>
                  </div>
                  {order.customerInfo.zipCode && (
                    <div>
                      <p className="text-[9px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Zip Code</p>
                      <p className="text-xs sm:text-sm text-[#1A1A1A]" style={{ fontFamily: FONT_FAMILY }}>{order.customerInfo.zipCode}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 p-2 sm:p-3 bg-[#F2F5F0] rounded-lg border border-[#E8E0D8]">
              <div>
                <p className="text-[8px] sm:text-[10px] text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>Order ID</p>
                <p className="text-[10px] sm:text-sm font-mono font-medium text-[#1A1A1A] break-words" style={{ fontFamily: FONT_FAMILY }}>
                  {order.orderNumber || order._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>Date</p>
                <p className="text-[10px] sm:text-sm font-medium text-[#1A1A1A]" style={{ fontFamily: FONT_FAMILY }}>
                  {new Date(order.createdAt).toLocaleDateString('en-BD')}
                </p>
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>Payment</p>
                <p className="text-[10px] sm:text-sm font-medium text-[#1A1A1A] capitalize" style={{ fontFamily: FONT_FAMILY }}>{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>Status</p>
                <p className="text-[10px] sm:text-sm font-medium text-[#1A1A1A] capitalize" style={{ fontFamily: FONT_FAMILY }}>{order.orderStatus}</p>
              </div>
            </div>

            {/* ============================================================
                ITEMS TABLE - Toggleable
            ============================================================ */}
            <div className="mt-2">
              <button
                onClick={() => toggleSection('items')}
                className="flex items-center justify-between w-full py-2 text-left border-b border-[#E8E0D8]"
              >
                <span className="text-sm font-medium text-[#1A1A1A] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                  <FaShoppingBag className="w-4 h-4 text-[#8B9D83]" />
                  Order Items ({groupedItems.reduce((acc, g) => acc + g.rows.length, 0)} items)
                </span>
                {expandedSections.items ? (
                  <FaChevronUp className="w-4 h-4 text-[#4A4A4A]" />
                ) : (
                  <FaChevronDown className="w-4 h-4 text-[#4A4A4A]" />
                )}
              </button>
              
              {expandedSections.items && (
                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-[10px] sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#E8E0D8]">
                        <th className="text-left py-1.5 sm:py-2 px-1.5 sm:px-2 text-[#1A1A1A] font-medium" style={{ fontFamily: FONT_FAMILY_INTER }}>#</th>
                        <th className="text-left py-1.5 sm:py-2 px-1.5 sm:px-2 text-[#1A1A1A] font-medium" style={{ fontFamily: FONT_FAMILY_INTER }}>Product / Variant</th>
                        <th className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-[#1A1A1A] font-medium" style={{ fontFamily: FONT_FAMILY_INTER }}>Qty</th>
                        <th className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-[#1A1A1A] font-medium hidden sm:table-cell" style={{ fontFamily: FONT_FAMILY_INTER }}>Unit</th>
                        <th className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 text-[#1A1A1A] font-medium hidden sm:table-cell" style={{ fontFamily: FONT_FAMILY_INTER }}>Price</th>
                        <th className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 text-[#1A1A1A] font-medium" style={{ fontFamily: FONT_FAMILY_INTER }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedItems.map((productGroup, groupIndex) => {
                        const rows = productGroup.rows || [];
                        const hasVariants = productGroup.hasVariants;
                        
                        if (rows.length === 0) return null;
                        
                        let rowNumber = groupIndex + 1;
                        
                        return rows.map((row, rowIndex) => {
                          const indent = row.indent || 0;
                          const paddingLeft = indent === 0 ? 'pl-1' : indent === 1 ? 'pl-4 sm:pl-5' : 'pl-7 sm:pl-9';
                          
                          const showRowNumber = row.isBase ? rowNumber : '';
                          
                          let badgeDisplay = null;
                          if (row.badge) {
                            badgeDisplay = (
                              <span className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded ml-1 ${
                                row.badge === 'Product' ? 'bg-[#F2F5F0] text-[#1A1A1A]' :
                                row.badge === 'Variant' ? 'bg-[#F2F5F0] text-[#1A1A1A]' :
                                row.badge === 'Sub' ? 'bg-[#F5EDE3] text-[#1A1A1A]' : ''
                              }`} style={{ fontFamily: FONT_FAMILY_INTER }}>
                                {row.badge}
                              </span>
                            );
                          }
                          
                          let discountDisplay = null;
                          if (row.hasDiscount && row.originalPrice && row.originalPrice > row.price && row.showPrice !== false && !row.isHeader) {
                            discountDisplay = (
                              <span className="text-[8px] sm:text-[9px] text-[#1A1A1A] bg-[#F2F5F0] px-1 py-0.5 rounded" style={{ fontFamily: FONT_FAMILY_INTER }}>
                                Save {Math.round(((row.originalPrice - row.price) / row.originalPrice) * 100)}%
                              </span>
                            );
                          }
                          
                          const hasColor = row.hasColor && row.color;
                          const color = row.color;
                          
                          const showPrice = row.showPrice !== false && !row.isHeader && !(row.isBase && hasVariants);
                          const price = row.price || 0;
                          const originalPrice = row.originalPrice || null;
                          const hasDiscount = row.hasDiscount || (originalPrice && originalPrice > price);
                          const quantity = row.quantity || 0;
                          const total = row.total || (price * quantity);
                          
                          let displayName = row.displayName || row.name || 'Product';
                          let fullDisplay = displayName;
                          
                          const isHeaderRow = row.isHeader === true;
                          const isBaseRow = row.isBase === true;
                          const isVariantRow = row.isVariant === true && !row.isHeader;
                          const isSubVariantRow = row.isSubVariant === true;
                          
                          const rowImage = row.image || null;
                          
                          return (
                            <tr 
                              key={`${groupIndex}-${rowIndex}`} 
                              className={`border-b border-[#E8E0D8] hover:bg-[#F2F5F0]/50 transition-colors ${
                                rowIndex === 0 ? 'border-t border-[#E8E0D8]' : ''
                              } ${isHeaderRow ? 'bg-[#F2F5F0]/30' : ''}`}
                            >
                              <td className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-[#1A1A1A] text-[8px] sm:text-xs align-middle" style={{ fontFamily: FONT_FAMILY_INTER }}>
                                {showRowNumber}
                              </td>
                              <td className={`py-1.5 sm:py-2 px-1.5 sm:px-2 ${paddingLeft} align-middle`}>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  {rowImage ? (
                                    <img 
                                      src={rowImage} 
                                      alt={displayName}
                                      className={`rounded object-cover border border-[#E8E0D8] flex-shrink-0 ${
                                        indent === 0 ? 'w-6 h-6 sm:w-8 sm:h-8' : 
                                        indent === 1 ? 'w-5 h-5 sm:w-6 sm:h-6' : 
                                        'w-4 h-4 sm:w-5 sm:h-5'
                                      }`}
                                      onError={(e) => { 
                                        e.target.src = 'https://via.placeholder.com/32?text=No+Image'; 
                                      }}
                                    />
                                  ) : (
                                    indent > 0 && (
                                      <span className="text-[#1A1A1A]/40 text-[10px] sm:text-xs flex-shrink-0">▸</span>
                                    )
                                  )}
                                  <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
                                    <span className={`break-words ${
                                      isHeaderRow ? 'font-bold text-[#1A1A1A]' :
                                      isBaseRow ? 'font-semibold text-[#1A1A1A]' : 
                                      isVariantRow ? 'font-medium text-[#1A1A1A]' : 
                                      'text-[#1A1A1A]'
                                    } ${isHeaderRow ? 'text-xs sm:text-sm' : 'text-[9px] sm:text-xs'}`} style={{ fontFamily: FONT_FAMILY }}>
                                      {fullDisplay}
                                    </span>
                                    {badgeDisplay}
                                    {discountDisplay}
                                    {isHeaderRow && row.quantity === 0 && (
                                      <span className="text-[8px] text-[#4A4A4A]/40 ml-1" style={{ fontFamily: FONT_FAMILY_INTER }}>(See sub variants below)</span>
                                    )}
                                    {isBaseRow && hasVariants && (
                                      <span className="text-[8px] text-[#4A4A4A]/40 ml-1" style={{ fontFamily: FONT_FAMILY_INTER }}>(See variants below)</span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-[#1A1A1A] text-[9px] sm:text-xs font-medium align-middle" style={{ fontFamily: FONT_FAMILY_INTER }}>
                                {isHeaderRow ? '-' : quantity}
                              </td>
                              <td className="text-center py-1.5 sm:py-2 px-1.5 sm:px-2 text-[#1A1A1A] text-[8px] sm:text-xs hidden sm:table-cell align-middle" style={{ fontFamily: FONT_FAMILY_INTER }}>
                                {row.unit || 'pcs'}
                              </td>
                              <td className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 text-[#1A1A1A] text-[8px] sm:text-xs hidden sm:table-cell align-middle" style={{ fontFamily: FONT_FAMILY_INTER }}>
                                {isHeaderRow || !showPrice ? '-' : (
                                  hasDiscount ? (
                                    <>
                                      <span className="text-[#1A1A1A] font-medium">৳{price.toFixed(2)}</span>
                                      <span className="text-[#4A4A4A]/40 line-through ml-1 text-[7px] sm:text-[8px]">৳{originalPrice.toFixed(2)}</span>
                                    </>
                                  ) : (
                                    <>৳{price.toFixed(2)}</>
                                  )
                                )}
                              </td>
                              <td className="text-right py-1.5 sm:py-2 px-1.5 sm:px-2 font-medium text-[#1A1A1A] text-[9px] sm:text-xs align-middle" style={{ fontFamily: FONT_FAMILY_INTER }}>
                                {isHeaderRow ? '-' : `৳${total.toFixed(2)}`}
                              </td>
                            </tr>
                          );
                        });
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-[#E8E0D8]">
                        <td colSpan="5" className="py-1.5 sm:py-2 px-1.5 sm:px-2 hidden sm:table-cell"></td>
                        <td colSpan="2" className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right text-[9px] sm:text-xs text-[#1A1A1A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Subtotal:</td>
                        <td className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right text-[9px] sm:text-xs text-[#1A1A1A]" style={{ fontFamily: FONT_FAMILY_INTER }}>৳{order.subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colSpan="5" className="py-0.5 sm:py-1 px-1.5 sm:px-2 hidden sm:table-cell"></td>
                        <td colSpan="2" className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-[#1A1A1A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Shipping:</td>
                        <td className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-[#1A1A1A]" style={{ fontFamily: FONT_FAMILY_INTER }}>৳{order.shippingCost.toFixed(2)}</td>
                      </tr>
                      {order.discount > 0 && (
                        <tr>
                          <td colSpan="5" className="py-0.5 sm:py-1 px-1.5 sm:px-2 hidden sm:table-cell"></td>
                          <td colSpan="2" className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY_INTER }}>Discount:</td>
                          <td className="py-0.5 sm:py-1 px-1.5 sm:px-2 text-right text-[8px] sm:text-xs text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY_INTER }}>-৳{order.discount.toFixed(2)}</td>
                        </tr>
                      )}
                      <tr className="border-t-2 border-[#8B9D83]">
                        <td colSpan="5" className="py-1.5 sm:py-2 px-1.5 sm:px-2 hidden sm:table-cell"></td>
                        <td colSpan="2" className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right font-bold text-[9px] sm:text-sm text-[#1A1A1A]" style={{ fontFamily: FONT_FAMILY }}>Total:</td>
                        <td className="py-1.5 sm:py-2 px-1.5 sm:px-2 text-right font-bold text-[#8B9D83] text-[10px] sm:text-lg" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>৳{order.total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            {/* Payment Info */}
            <div className="mt-3 pt-3 border-t border-[#E8E0D8] flex flex-col sm:flex-row justify-between text-[10px] sm:text-sm gap-1 sm:gap-0">
              <div>
                <span className="text-[#1A1A1A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Payment Method: </span>
                <span className="font-medium text-[#1A1A1A] capitalize" style={{ fontFamily: FONT_FAMILY }}>{order.paymentMethod}</span>
              </div>
              <div>
                <span className="text-[#1A1A1A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Payment Status: </span>
                <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-[#8B9D83]' : 'text-[#1A1A1A]'}`} style={{ fontFamily: FONT_FAMILY }}>
                  {order.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>

            {order.customerInfo.note && (
              <div className="mt-3 p-2 sm:p-3 bg-[#F2F5F0] rounded-xl border border-[#E8E0D8]">
                <p className="text-[10px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>Order Note</p>
                <p className="text-xs sm:text-sm text-[#1A1A1A] break-words" style={{ fontFamily: FONT_FAMILY }}>{order.customerInfo.note}</p>
              </div>
            )}
          </motion.div>

          {/* ============================================================
              ACTION BUTTONS
          ============================================================ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Link 
              href="/products" 
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#8B9D83] text-white rounded-xl hover:bg-[#6B7D63] transition-all font-medium shadow-md hover:shadow-lg text-sm sm:text-base"
              style={{ fontFamily: FONT_FAMILY }}
            >
              <FaShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              Continue Shopping
            </Link>
          </motion.div>

          {/* ============================================================
              SUPPORT INFO - Beauty Theme
          ============================================================ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 text-center"
          >
            <p className="text-[10px] sm:text-xs text-[#4A4A4A]" style={{ fontFamily: FONT_FAMILY_INTER }}>
              Need help? Contact our support team
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2">
              {contactItems.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleContactClick(contact)}
                  className={`flex items-center gap-1 hover:underline text-xs sm:text-sm transition-colors ${getIconColor(contact.icon)}`}
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  {getIconComponent(contact.icon, "w-3 h-3 sm:w-4 sm:h-4")}
                  <span className="hidden xs:inline">{contact.label}</span>
                  <span className="xs:hidden">
                    {contact.label === 'Phone' ? 'Call' : 
                     contact.label === 'Email' ? 'Email' : 
                     contact.label === 'WhatsApp' ? 'WhatsApp' : contact.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ============================================================
              BRAND FOOTER
          ============================================================ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]" style={{ fontFamily: FONT_FAMILY_INTER }}>
              <FaHeart className="text-[#8B9D83] text-[10px] sm:text-xs" />
              <span>Beauty • Care • Confidence</span>
              <FaHeart className="text-[#8B9D83] text-[10px] sm:text-xs" />
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}