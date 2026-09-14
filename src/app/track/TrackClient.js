

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { 
//   FaSearch, 
//   FaPhone, 
//   FaBox, 
//   FaClock, 
//   FaCheckCircle, 
//   FaTruck, 
//   FaMapMarkerAlt, 
//   FaShoppingBag,
//   FaChevronDown,
//   FaChevronUp,
//   FaMoneyBillWave,
//   FaCreditCard,
//   FaExclamationTriangle,
//   FaShippingFast,
//   FaCheckDouble,
//   FaBan,
//   FaSpinner,
//   FaGift,
//   FaUser,
//   FaCalendarAlt,
//   FaDownload,
//   FaFileInvoice,
//   FaHeart,
//   FaStar,
//   FaEnvelope,
//   FaWhatsapp,
//   FaShieldAlt,
//   FaExternalLinkAlt,
//   FaUndo,
//   FaPhoneAlt,
//   FaCheck,
//   FaBoxOpen,
//   FaClipboardCheck,
//   FaChevronLeft,
//   FaChevronRight,
//   FaPause
// } from 'react-icons/fa';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import { generateInvoicePDF } from '@/utils/invoicePDF';

// // ========== FONT CONSTANTS - BEAUTY BUCKET THEME ==========
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = " serif";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// // ========== FETCH FOOTER DATA ==========
// const fetchFooterData = async () => {
//   try {
//     const response = await fetch(`${API_URL}/api/footer`);
//     if (!response.ok) throw new Error('Failed to fetch footer data');
//     const data = await response.json();
//     if (data.success && data.data) {
//       return data.data;
//     }
//     return null;
//   } catch (error) {
//     console.error('Error fetching footer data:', error);
//     return null;
//   }
// };

// // ========== GET CONTACT ITEMS FROM FOOTER DATA ==========
// const getContactItemsFromFooter = (footerData) => {
//   if (!footerData) {
//     return [
//       { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#77896F]' },
//       { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#77896F]' },
//       { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
//     ];
//   }

//   const contacts = [];
//   const company = footerData.company || {};
//   const contactColumn = footerData.columns?.find(col => col.type === 'contact');
//   const items = contactColumn?.items || [];

//   const phoneItem = items.find(item => item.type === 'phone');
//   if (phoneItem) {
//     const cleanPhone = phoneItem.value.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaPhone,
//       label: 'Phone',
//       value: phoneItem.value,
//       link: `tel:${cleanPhone}`,
//       color: 'text-[#77896F]'
//     });
//   } else if (company.phone) {
//     const cleanPhone = company.phone.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaPhone,
//       label: 'Phone',
//       value: company.phone,
//       link: `tel:${cleanPhone}`,
//       color: 'text-[#77896F]'
//     });
//   }

//   const emailItem = items.find(item => item.type === 'email');
//   if (emailItem) {
//     contacts.push({
//       icon: FaEnvelope,
//       label: 'Email',
//       value: emailItem.value,
//       link: `mailto:${emailItem.value}`,
//       color: 'text-[#77896F]'
//     });
//   } else if (company.email) {
//     contacts.push({
//       icon: FaEnvelope,
//       label: 'Email',
//       value: company.email,
//       link: `mailto:${company.email}`,
//       color: 'text-[#77896F]'
//     });
//   }

//   const whatsappItem = items.find(item => item.type === 'whatsapp');
//   if (whatsappItem) {
//     const cleanPhone = whatsappItem.value.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaWhatsapp,
//       label: 'WhatsApp',
//       value: whatsappItem.value,
//       link: `https://wa.me/${cleanPhone}`,
//       color: 'text-green-500'
//     });
//   } else if (company.whatsapp) {
//     const cleanPhone = company.whatsapp.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaWhatsapp,
//       label: 'WhatsApp',
//       value: company.whatsapp,
//       link: `https://wa.me/${cleanPhone}`,
//       color: 'text-green-500'
//     });
//   }

//   if (contacts.length === 0) {
//     contacts.push(
//       { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#77896F]' },
//       { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#77896F]' },
//       { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
//     );
//   }

//   return contacts;
// };

// // ========== STATUS CONFIG - Green Theme ==========
// const STATUS_CONFIG = {
//   'placed': { 
//     label: 'Order Placed', 
//     icon: FaBox, 
//     color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', 
//     textColor: 'text-[#77896F]', 
//     bgColor: 'bg-[#f0f5ed]',
//     borderColor: 'border-[#77896F]/20'
//   },
//   'follow_up': { 
//     label: 'Follow Up', 
//     icon: FaPhoneAlt, 
//     color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', 
//     textColor: 'text-[#77896F]', 
//     bgColor: 'bg-[#f0f5ed]',
//     borderColor: 'border-[#77896F]/20'
//   },
//   'reminder': { 
//     label: 'Reminder', 
//     icon: FaClock, 
//     color: 'bg-yellow-500', 
//     textColor: 'text-yellow-600', 
//     bgColor: 'bg-yellow-50',
//     borderColor: 'border-yellow-200'
//   },
//   'accepted': { 
//     label: 'Accepted', 
//     icon: FaCheckCircle, 
//     color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', 
//     textColor: 'text-[#77896F]', 
//     bgColor: 'bg-[#f0f5ed]',
//     borderColor: 'border-[#77896F]/20'
//   },
//   'approved': { 
//     label: 'Approved', 
//     icon: FaClipboardCheck, 
//     color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', 
//     textColor: 'text-[#77896F]', 
//     bgColor: 'bg-[#f0f5ed]',
//     borderColor: 'border-[#77896F]/20'
//   },
//   'hold': { 
//     label: 'On Hold', 
//     icon: FaPause, 
//     color: 'bg-yellow-500', 
//     textColor: 'text-yellow-600', 
//     bgColor: 'bg-yellow-50',
//     borderColor: 'border-yellow-200'
//   },
//   'ready_to_ship': { 
//     label: 'Ready to Ship', 
//     icon: FaBoxOpen, 
//     color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', 
//     textColor: 'text-[#77896F]', 
//     bgColor: 'bg-[#f0f5ed]',
//     borderColor: 'border-[#77896F]/20'
//   },
//   'courier_assigned': { 
//     label: 'Assigned to Courier', 
//     icon: FaTruck, 
//     color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', 
//     textColor: 'text-[#77896F]', 
//     bgColor: 'bg-[#f0f5ed]',
//     borderColor: 'border-[#77896F]/20'
//   },
//   'processing': { 
//     label: 'Processing', 
//     icon: FaSpinner,
//     color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', 
//     textColor: 'text-[#77896F]', 
//     bgColor: 'bg-[#f0f5ed]',
//     borderColor: 'border-[#77896F]/20'
//   },
//   'shipped': { 
//     label: 'Shipped', 
//     icon: FaShippingFast, 
//     color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', 
//     textColor: 'text-[#77896F]', 
//     bgColor: 'bg-[#f0f5ed]',
//     borderColor: 'border-[#77896F]/20'
//   },
//   'out_for_delivery': { 
//     label: 'Out for Delivery', 
//     icon: FaTruck, 
//     color: 'bg-orange-500', 
//     textColor: 'text-orange-600', 
//     bgColor: 'bg-orange-50',
//     borderColor: 'border-orange-200'
//   },
//   'delivered': { 
//     label: 'Delivered', 
//     icon: FaCheckDouble, 
//     color: 'bg-green-500', 
//     textColor: 'text-green-600', 
//     bgColor: 'bg-green-50',
//     borderColor: 'border-green-200'
//   },
//   'cancelled': { 
//     label: 'Cancelled', 
//     icon: FaBan, 
//     color: 'bg-red-500', 
//     textColor: 'text-red-600', 
//     bgColor: 'bg-red-50',
//     borderColor: 'border-red-200'
//   },
//   'rejected': { 
//     label: 'Rejected', 
//     icon: FaBan, 
//     color: 'bg-red-500', 
//     textColor: 'text-red-600', 
//     bgColor: 'bg-red-50',
//     borderColor: 'border-red-200'
//   },
//   'refunded': { 
//     label: 'Refunded', 
//     icon: FaBan, 
//     color: 'bg-yellow-500', 
//     textColor: 'text-yellow-600', 
//     bgColor: 'bg-yellow-50',
//     borderColor: 'border-yellow-200'
//   },
//   'failed': { 
//     label: 'Failed', 
//     icon: FaExclamationTriangle, 
//     color: 'bg-red-500', 
//     textColor: 'text-red-600', 
//     bgColor: 'bg-red-50',
//     borderColor: 'border-red-200'
//   },
//   'returned': { 
//     label: 'Returned', 
//     icon: FaUndo, 
//     color: 'bg-purple-500', 
//     textColor: 'text-purple-600', 
//     bgColor: 'bg-purple-50',
//     borderColor: 'border-purple-200'
//   },
//   'partial_delivery': { 
//     label: 'Partial Delivery', 
//     icon: FaBox, 
//     color: 'bg-yellow-500', 
//     textColor: 'text-yellow-600', 
//     bgColor: 'bg-yellow-50',
//     borderColor: 'border-yellow-200'
//   }
// };

// // ========== GET STATUS BADGE COLOR ==========
// const getStatusBadgeColor = (status) => {
//   const colors = {
//     'placed': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'follow_up': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'reminder': 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     'accepted': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'approved': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'hold': 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     'ready_to_ship': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'courier_assigned': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'processing': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'shipped': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'out_for_delivery': 'text-orange-600 bg-orange-50 border-orange-200',
//     'delivered': 'text-green-600 bg-green-50 border-green-200',
//     'cancelled': 'text-red-600 bg-red-50 border-red-200',
//     'rejected': 'text-red-600 bg-red-50 border-red-200',
//     'refunded': 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     'failed': 'text-red-600 bg-red-50 border-red-200',
//     'returned': 'text-purple-600 bg-purple-50 border-purple-200',
//     'partial_delivery': 'text-yellow-600 bg-yellow-50 border-yellow-200'
//   };
//   return colors[status] || 'text-gray-600 bg-gray-100 border-gray-200';
// };

// // ========== GET STATUS LABEL ==========
// const getStatusLabel = (status) => {
//   return STATUS_CONFIG[status]?.label || status;
// };

// // ========== GET PAYMENT METHOD BADGE ==========
// const getPaymentMethodBadge = (method) => {
//   const methods = {
//     'cod': { label: 'Cash on Delivery', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaMoneyBillWave },
//     'online': { label: 'Online Payment', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaCreditCard },
//     'bkash': { label: 'bKash', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaMoneyBillWave },
//     'nagad': { label: 'Nagad', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaMoneyBillWave }
//   };
//   const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: FaMoneyBillWave };
//   const Icon = info.icon;
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${info.color}`} style={{ fontFamily: FONT_FAMILY }}>
//       <Icon className="w-3 h-3" />
//       {info.label}
//     </span>
//   );
// };

// // ========== GROUP ITEMS BY PRODUCT (WITH VARIANT/SUB-VARIANT SUPPORT) ==========
// const groupItemsByProduct = (items) => {
//   if (!items || items.length === 0) return [];

//   const grouped = {};

//   items.forEach((item, index) => {
//     let productId = item.productId;
//     if (productId && typeof productId === 'object' && productId._id) {
//       productId = productId._id.toString();
//     } else if (productId) {
//       productId = productId.toString();
//     } else {
//       productId = `item-${index}`;
//     }

//     const productName = item.productName || item.name || item.product?.name || 'Unknown Product';
//     const image = item.variantImage || item.image || item.product?.images?.[0]?.url || '';
//     const unit = item.unit || 'pcs';

//     if (!grouped[productId]) {
//       grouped[productId] = {
//         productId,
//         productName,
//         image,
//         unit,
//         basePrice: item.discountPrice || item.regularPrice || 0,
//         regularPrice: item.regularPrice || 0,
//         discountPrice: item.discountPrice || 0,
//         // Base (non-variant, non-color) rows
//         baseRows: [],
//         // Variant / sub-variant rows
//         variantRows: [],
//         // Color rows (for products with colors but no variants)
//         colors: [],
//         totalQuantity: 0
//       };
//     }

//     const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
//     const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');
//     const hasValidColor = item.selectedColor &&
//       item.selectedColor !== 'null' &&
//       item.selectedColor !== '' &&
//       item.selectedColor !== 'undefined';

//     // ---------- VARIANT / SUB-VARIANT ITEMS ----------
//     if (isVariant || isSubVariant) {
//       const variantPrice = item.variantDiscountPrice > 0
//         ? Number(item.variantDiscountPrice)
//         : Number(item.variantRegularPrice) > 0
//           ? Number(item.variantRegularPrice)
//           : Number(item.discountPrice) || Number(item.regularPrice) || 0;

//       const originalPrice = Number(item.variantRegularPrice) > 0
//         ? Number(item.variantRegularPrice)
//         : Number(item.regularPrice) || 0;

//       const hasDiscount = originalPrice > 0 && variantPrice > 0 && variantPrice < originalPrice;

//       grouped[productId].variantRows.push({
//         type: isSubVariant ? 'subVariant' : 'variant',
//         itemId: item._id,
//         variantId: item.variantId || null,
//         variantName: item.variantName || 'Variant',
//         subVariantId: item.subVariantId || null,
//         subVariantName: item.subVariantName || null,
//         selectedColor: hasValidColor ? item.selectedColor : null,
//         quantity: item.quantity || 0,
//         price: variantPrice,
//         originalPrice,
//         hasDiscount,
//         image: item.variantImage || item.image || '',
//         unit: item.unit || 'pcs',
//         isSubVariant,
//         isVariant: !isSubVariant
//       });

//       grouped[productId].totalQuantity += item.quantity || 0;
//       return;
//     }

//     // ---------- COLOR ITEMS (no variants) ----------
//     if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
//       const validColors = item.colors.filter(c =>
//         c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined'
//       );

//       if (validColors.length > 0) {
//         validColors.forEach(c => {
//           const qty = c.quantity || 0;
//           const p = c.price || item.discountPrice || item.regularPrice || 0;

//           const existing = grouped[productId].colors.find(gc => gc.color === c.color);
//           if (existing) {
//             existing.quantity += qty;
//           } else {
//             grouped[productId].colors.push({
//               color: c.color,
//               quantity: qty,
//               price: p
//             });
//           }
//           grouped[productId].totalQuantity += qty;
//         });
//         return;
//       }
//     }

//     if (hasValidColor) {
//       const qty = item.quantity || 0;
//       const p = item.discountPrice || item.regularPrice || 0;

//       const existing = grouped[productId].colors.find(gc => gc.color === item.selectedColor);
//       if (existing) {
//         existing.quantity += qty;
//       } else {
//         grouped[productId].colors.push({
//           color: item.selectedColor,
//           quantity: qty,
//           price: p
//         });
//       }
//       grouped[productId].totalQuantity += qty;
//       return;
//     }

//     // ---------- BASE (no color, no variant) ----------
//     grouped[productId].baseRows.push({
//       itemId: item._id,
//       quantity: item.quantity || 0,
//       price: item.discountPrice || item.regularPrice || 0
//     });
//     grouped[productId].totalQuantity += item.quantity || 0;
//   });

//   return Object.values(grouped);
// };

// // ========== ORDER CARD COMPONENT ==========
// const OrderCard = ({ order, index, contactItems }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [downloading, setDownloading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
  
//   const statusInfo = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG['placed'];
//   const StatusIcon = statusInfo.icon;

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const isTerminal = ['cancelled', 'rejected', 'refunded', 'failed'].includes(order.orderStatus);
//   const isDelivered = order.orderStatus === 'delivered';
//   const isReturned = order.orderStatus === 'returned';
//   const isPartialDelivery = order.orderStatus === 'partial_delivery';
//   const isHold = order.orderStatus === 'hold';
//   const hasDelivery = order.deliveryService?.courierOrderId;

//   const groupedItems = groupItemsByProduct(order.items || []);

//   const getStatusTimeline = () => {
//     if (!order.statusHistory || order.statusHistory.length === 0) {
//       return [
//         {
//           status: order.orderStatus,
//           label: getStatusLabel(order.orderStatus),
//           timestamp: order.createdAt,
//           isCurrent: true,
//           isCompleted: true,
//           color: getStatusBadgeColor(order.orderStatus)
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
//           color: getStatusBadgeColor(entry.status)
//         });
//       }
//     });
    
//     const hasCurrentStatus = uniqueStatuses.some(s => s.status === order.orderStatus);
//     if (!hasCurrentStatus) {
//       uniqueStatuses.push({
//         status: order.orderStatus,
//         label: getStatusLabel(order.orderStatus),
//         timestamp: order.updatedAt || order.createdAt,
//         color: getStatusBadgeColor(order.orderStatus)
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

//   const handleDownloadInvoice = async (e) => {
//     e.stopPropagation();
//     setDownloading(true);
//     try {
//       const orderId = order._id || order.id || order.orderId;
//       if (!orderId) {
//         toast.error('Order ID not found');
//         setDownloading(false);
//         return;
//       }

//       const response = await fetch(`${API_URL}/api/orders/public/${orderId}`, {
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       const data = await response.json();
//       if (data.success && data.data) {
//         await generateInvoicePDF(data.data);
//         toast.success('Invoice downloaded successfully!');
//       } else {
//         toast.error(data.error || 'Failed to fetch order details');
//       }
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.error('Failed to download invoice');
//     } finally {
//       setDownloading(false);
//     }
//   };

//   const getStatusMessage = () => {
//     const status = order.orderStatus;
//     const messages = {
//       'placed': 'Your order has been placed successfully.',
//       'follow_up': 'Your order is being reviewed by our team.',
//       'reminder': 'A reminder has been sent regarding your order.',
//       'accepted': 'Your order has been accepted and is being prepared.',
//       'approved': 'Your order has been approved and is ready for processing.',
//       'hold': 'Your order has been placed on hold. We will contact you shortly.',
//       'ready_to_ship': 'Your order is packed and ready to be shipped!',
//       'courier_assigned': 'A courier has been assigned to deliver your order.',
//       'processing': 'Your order is being processed by the courier service.',
//       'shipped': 'Your order has been shipped and is on its way!',
//       'out_for_delivery': 'Your order is out for delivery! Get ready to receive it.',
//       'delivered': 'Your order has been delivered! We hope you love your new products.',
//       'cancelled': 'Your order has been cancelled.',
//       'rejected': 'Your order has been rejected.',
//       'refunded': 'Your order has been refunded.',
//       'failed': 'Your order has failed.',
//       'returned': 'Your order has been returned.',
//       'partial_delivery': 'Part of your order has been delivered. The remaining items will be delivered soon.'
//     };
//     return messages[status] || 'Your order is being processed.';
//   };

//   const handleContactClick = (contact) => {
//     if (contact.label === 'Phone') {
//       window.location.href = contact.link;
//     } else if (contact.label === 'Email') {
//       const email = contact.link.replace('mailto:', '');
//       window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
//     } else if (contact.label === 'WhatsApp') {
//       window.open(contact.link, '_blank', 'noopener,noreferrer');
//     } else {
//       window.open(contact.link, '_blank');
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.08 }}
//       className="bg-white rounded-2xl border border-[#c5d5be]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
//     >
//       <div 
//         className="p-4 sm:p-5 cursor-pointer hover:bg-[#f0f5ed] transition-colors"
//         onClick={() => setExpanded(!expanded)}
//       >
//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-3 min-w-0">
//             <div className={`w-10 h-10 rounded-full ${statusInfo.bgColor} border ${statusInfo.borderColor} flex items-center justify-center flex-shrink-0`}>
//               <StatusIcon className={`w-5 h-5 ${statusInfo.textColor}`} />
//             </div>
//             <div className="min-w-0">
//               <p className="text-xs text-[#77896F] font-mono truncate" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>#{order.orderNumber}</p>
//               <p className="text-sm font-medium text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//                 {new Date(order.createdAt).toLocaleDateString('en-BD', {
//                   day: '2-digit',
//                   month: 'short',
//                   year: 'numeric'
//                 })}
//               </p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3 flex-shrink-0">
//             <div className="text-right">
//               <p className="text-sm font-bold text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>৳{order.total?.toFixed(2)}</p>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.orderStatus)}`} style={{ fontFamily: FONT_FAMILY }}>
//               {getStatusLabel(order.orderStatus)}
//             </div>
//             <button
//               onClick={handleDownloadInvoice}
//               disabled={downloading}
//               className="p-1.5 hover:bg-[#f0f5ed] rounded-full transition-colors text-[#77896F]/60 hover:text-[#77896F] disabled:opacity-50"
//               title="Download Invoice"
//             >
//               {downloading ? (
//                 <div className="w-4 h-4 border-2 border-[#77896F] border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <FaDownload className="w-4 h-4" />
//               )}
//             </button>
//             {expanded ? (
//               <FaChevronUp className="w-4 h-4 text-[#77896F]/60 flex-shrink-0" />
//             ) : (
//               <FaChevronDown className="w-4 h-4 text-[#77896F]/60 flex-shrink-0" />
//             )}
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {expanded && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden"
//           >
//             <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-[#c5d5be]/40 space-y-4">
//               {!isTerminal && statusTimeline.length > 0 && (
//                 <div className="mb-4">
//                   <h4 className="text-xs font-medium text-[#263b32] mb-3 flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <FaClock className="w-3.5 h-3.5 text-[#77896F]" />
//                     Order Progress
//                   </h4>
//                   <div className="relative">
//                     <div className="flex items-start justify-between overflow-x-auto pb-3 gap-1 sm:gap-2">
//                       {statusTimeline.map((step, index) => {
//                         const isLast = index === statusTimeline.length - 1;
//                         const isCompleted = step.isCompleted;
//                         const isCurrent = step.isCurrent;
//                         const formattedTime = step.timestamp ? new Date(step.timestamp).toLocaleString('en-BD', {
//                           day: '2-digit',
//                           month: 'short',
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         }) : '';
                        
//                         return (
//                           <div key={step.status} className="flex flex-col items-center flex-1 min-w-[60px] sm:min-w-[80px] relative">
//                             {!isLast && (
//                               <div className={`absolute top-3 sm:top-4 left-[55%] sm:left-[60%] w-[70%] sm:w-[80%] h-0.5 ${isCompleted ? 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]' : 'bg-[#c5d5be]'}`} />
//                             )}
                            
//                             <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[8px] sm:text-xs font-bold z-10 ${isCompleted ? 'bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white shadow-md shadow-[#77896F]/25' : 'bg-[#c5d5be]/30 text-[#77896F]/60 border border-[#c5d5be]/40'} ${isCurrent ? 'ring-2 sm:ring-4 ring-[#77896F]/30' : ''}`}>
//                               {isCompleted ? <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : index + 1}
//                             </div>
                            
//                             <span className={`text-[7px] sm:text-[9px] mt-1 sm:mt-1.5 text-center font-medium leading-tight ${isCompleted ? 'text-[#263b32]' : 'text-[#77896F]/40'}`} style={{ fontFamily: FONT_FAMILY }}>
//                               {step.label}
//                             </span>
                            
//                             {step.timestamp && (
//                               <span className="text-[6px] sm:text-[7px] text-[#77896F]/40 mt-0.5 text-center max-w-[50px] sm:max-w-[90px] leading-tight" style={{ fontFamily: FONT_FAMILY }}>
//                                 {formattedTime}
//                               </span>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {isTerminal && (
//                 <div className="mb-4 p-3 rounded-xl border bg-red-50 border-red-200">
//                   <div className="flex items-center gap-2 text-sm text-red-600">
//                     <FaExclamationTriangle className="w-4 h-4" />
//                     <span className="font-medium" style={{ fontFamily: FONT_FAMILY }}>
//                       {order.orderStatus === 'cancelled' ? 'Order Cancelled' : 
//                        order.orderStatus === 'rejected' ? 'Order Rejected' :
//                        order.orderStatus === 'refunded' ? 'Order Refunded' :
//                        'Order Failed'}
//                     </span>
//                   </div>
//                   {order.cancellationReason && (
//                     <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY }}>Reason: {order.cancellationReason}</p>
//                   )}
//                 </div>
//               )}

//               <div className="flex flex-wrap gap-3 items-center">
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>Payment:</span>
//                   {getPaymentMethodBadge(order.paymentMethod)}
//                 </div>
//                 {order.trackingNumber && (
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Tracking:</span>
//                     <span className="text-xs font-mono text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>{order.trackingNumber}</span>
//                   </div>
//                 )}
//               </div>

//               {hasDelivery && (
//                 <div className="bg-gradient-to-r from-[#f0f5ed] to-[#c5d5be]/20 border border-[#77896F]/20 rounded-xl p-3">
//                   <h4 className="text-xs font-medium text-[#263b32] flex items-center gap-2 mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <FaTruck className="w-3.5 h-3.5 text-[#77896F]" />
//                     Courier Delivery Information
//                   </h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
//                     <div>
//                       <span className="text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Courier Service:</span>
//                       <span className="font-medium text-[#263b32] ml-1" style={{ fontFamily: FONT_FAMILY }}>{order.deliveryService?.courierName || 'N/A'}</span>
//                     </div>
//                     <div>
//                       <span className="text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Tracking Number:</span>
//                       <span className="font-mono text-[#77896F] ml-1" style={{ fontFamily: FONT_FAMILY }}>{order.deliveryService?.trackingNumber || 'N/A'}</span>
//                     </div>
//                     {order.deliveryService?.trackingUrl && (
//                       <div className="col-span-1 sm:col-span-2 mt-1 pt-1.5 border-t border-[#77896F]/10">
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#77896F]/60 text-xs" style={{ fontFamily: FONT_FAMILY }}>Track your parcel:</span>
//                           <a
//                             href={order.deliveryService.trackingUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#77896F]/25 transition-all"
//                             style={{ fontFamily: FONT_FAMILY }}
//                           >
//                             <FaExternalLinkAlt className="w-3 h-3" />
//                             Track on {order.deliveryService?.courierName || 'Courier'}
//                           </a>
//                         </div>
//                         <p className="text-[10px] text-[#77896F]/40 mt-1" style={{ fontFamily: FONT_FAMILY }}>
//                           Click the button above to track your parcel
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="text-xs font-medium text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <FaShoppingBag className="w-3.5 h-3.5 text-[#77896F]" />
//                     Order Items ({groupedItems.length} products)
//                   </h4>
//                   <span className="text-[10px] text-[#77896F]/40" style={{ fontFamily: FONT_FAMILY }}>
//                     Total: {order.items?.length || 0} items
//                   </span>
//                 </div>
                
//             <div className="bg-[#f0f5ed] rounded-xl border border-[#c5d5be]/40 overflow-hidden">
//   <div className="grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-[#c5d5be]/20 border-b border-[#c5d5be]/40 text-[8px] sm:text-[10px] font-medium text-[#465641] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
//     <div className="col-span-1 text-center">#</div>
//     <div className="col-span-4 sm:col-span-5">Product / Variant</div>
//     <div className="col-span-2 text-center">Color</div>
//     <div className="col-span-1 text-center">Qty</div>
//     <div className="col-span-1 text-center hidden sm:block">Unit</div>
//     <div className="col-span-1 text-right hidden sm:block">Price</div>
//     <div className="col-span-2 sm:col-span-1 text-right">Total</div>
//   </div>

//   <div className="max-h-60 overflow-y-auto">
//     {groupedItems.length === 0 ? (
//       <div className="text-center py-4 text-xs text-[#77896F]/40" style={{ fontFamily: FONT_FAMILY }}>
//         No items found
//       </div>
//     ) : (
//       groupedItems.map((group, idx) => {
//         // Build a flat list of rows for this product:
//         //   1. Base rows (if any)
//         //   2. Color rows (if any)
//         //   3. Variant rows + their sub-variant rows
//         const rows = [];

//         // -- Base rows --
//         group.baseRows.forEach((br) => {
//           rows.push({
//             kind: 'base',
//             name: group.productName,
//             color: null,
//             quantity: br.quantity,
//             price: br.price,
//             unit: group.unit,
//             isFirstOfGroup: rows.length === 0,
//             indent: 0,
//             badge: null,
//             image: group.image
//           });
//         });

//         // -- Color rows --
//         group.colors.forEach((c) => {
//           rows.push({
//             kind: 'color',
//             name: group.productName,
//             color: c.color,
//             quantity: c.quantity,
//             price: c.price,
//             unit: group.unit,
//             isFirstOfGroup: rows.length === 0,
//             indent: 0,
//             badge: null,
//             image: group.image
//           });
//         });

//         // -- Variant rows (grouped by variantId) --
//         const variantGroups = {};
//         group.variantRows.forEach(v => {
//           const key = v.variantId || 'unknown';
//           if (!variantGroups[key]) variantGroups[key] = [];
//           variantGroups[key].push(v);
//         });

//         Object.values(variantGroups).forEach(variants => {
//           // Sort: direct variant row first, then sub-variants
//           variants.sort((a, b) => {
//             if (!a.isSubVariant && b.isSubVariant) return -1;
//             if (a.isSubVariant && !b.isSubVariant) return 1;
//             return 0;
//           });

//           variants.forEach((v) => {
//             rows.push({
//               kind: v.isSubVariant ? 'subVariant' : 'variant',
//               name: v.isSubVariant ? v.subVariantName : v.variantName,
//               parentVariantName: v.variantName,
//               color: v.selectedColor,
//               quantity: v.quantity,
//               price: v.price,
//               originalPrice: v.originalPrice,
//               hasDiscount: v.hasDiscount,
//               unit: v.unit,
//               isFirstOfGroup: rows.length === 0,
//               indent: v.isSubVariant ? 2 : 1,
//               badge: v.isSubVariant ? 'Sub' : 'Variant',
//               image: v.image || group.image
//             });
//           });
//         });

//         // Render all rows for this product
//         return rows.map((row, rowIndex) => {
//           const isFirstOfGroup = row.isFirstOfGroup;
//           const indent = row.indent;
//           const paddingLeft = indent === 0 ? 'pl-0' : indent === 1 ? 'pl-3' : 'pl-6';
//           const hasColor = !!row.color;
//           const hasDiscount = row.hasDiscount;
//           const totalForRow = row.price * row.quantity;

//           return (
//             <div
//               key={`${idx}-${rowIndex}`}
//               className={`grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 items-center border-b border-[#c5d5be]/20 last:border-0 hover:bg-gradient-to-r hover:from-[#f0f5ed] hover:to-[#c5d5be]/10 transition-colors ${
//                 rowIndex > 0 && !isFirstOfGroup && indent > 0
//                   ? indent === 2 ? 'bg-blue-50/20' : 'bg-purple-50/20'
//                   : ''
//               }`}
//             >
//               {/* # */}
//               <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-black" style={{ fontFamily: FONT_FAMILY }}>
//                 {isFirstOfGroup ? idx + 1 : ''}
//               </div>

//               {/* Product / Variant name */}
//               <div className={`col-span-4 sm:col-span-5 flex items-center gap-1.5 sm:gap-2 min-w-0 ${paddingLeft}`}>
//                 {/* Image only on first row of group */}
//                 {isFirstOfGroup && row.image ? (
//                   <img
//                     src={row.image || 'https://via.placeholder.com/32'}
//                     alt={group.productName}
//                     className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover flex-shrink-0 bg-white border border-[#c5d5be]/40"
//                     onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=P'; }}
//                   />
//                 ) : (
//                   !isFirstOfGroup && (
//                     <span className="w-6 sm:w-7 flex-shrink-0 text-[#77896F]/40 text-[10px] text-center">
//                       {indent === 2 ? '→' : '▸'}
//                     </span>
//                   )
//                 )}

//                 <div className="min-w-0 flex flex-wrap items-center gap-1">
//                   {isFirstOfGroup ? (
//                     <p
//                       className="text-[9px] sm:text-xs font-medium text-[#263b32] truncate"
//                       title={group.productName}
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       {group.productName}
//                     </p>
//                   ) : (
//                     <p
//                       className={`text-[8px] sm:text-xs truncate ${
//                         indent === 1 ? 'font-medium text-purple-700' : 'text-gray-600'
//                       }`}
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       {row.name}
//                     </p>
//                   )}

//                   {row.badge && (
//                     <span
//                       className={`text-[7px] sm:text-[8px] px-1 py-0.5 rounded ${
//                         row.badge === 'Variant'
//                           ? 'bg-purple-100 text-purple-700'
//                           : 'bg-blue-100 text-blue-700'
//                       }`}
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       {row.badge}
//                     </span>
//                   )}

//                   {hasDiscount && (
//                     <span
//                       className="text-[7px] sm:text-[8px] text-green-600 bg-green-50 px-1 py-0.5 rounded"
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       Save {Math.round(((row.originalPrice - row.price) / row.originalPrice) * 100)}%
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Color swatch */}
//               <div className="col-span-2 flex justify-center items-center">
//                 {hasColor ? (
//                   <div
//                     className="w-5 h-5 rounded-full border-2 border-[#c5d5be]/50 shadow-sm"
//                     style={{ backgroundColor: row.color }}
//                     title={row.color}
//                   />
//                 ) : (
//                   <span className="text-[8px] sm:text-[10px] text-[#77896F]/40" style={{ fontFamily: FONT_FAMILY }}>
//                     —
//                   </span>
//                 )}
//               </div>

//               {/* Qty */}
//               <div className="col-span-1 text-center text-[9px] sm:text-xs font-medium text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//                 {row.quantity || 0}
//               </div>

//               {/* Unit */}
//               <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-[#77896F] hidden sm:block" style={{ fontFamily: FONT_FAMILY }}>
//                 {row.unit || 'pcs'}
//               </div>

//               {/* Price */}
//               <div className="col-span-1 text-right text-[8px] sm:text-[10px] text-[#77896F] hidden sm:block" style={{ fontFamily: FONT_FAMILY }}>
//                 <span className={hasDiscount ? 'text-green-600 font-medium' : ''}>
//                   ৳{row.price.toFixed(2)}
//                 </span>
//                 {hasDiscount && (
//                   <span className="text-[#77896F]/40 line-through ml-1">
//                     ৳{row.originalPrice.toFixed(2)}
//                   </span>
//                 )}
//               </div>

//               {/* Total */}
//               <div className="col-span-2 sm:col-span-1 text-right text-[9px] sm:text-xs font-medium text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>
//                 ৳{totalForRow.toFixed(2)}
//               </div>
//             </div>
//           );
//         });
//       })
//     )}
//   </div>

//   <div className="border-t border-[#c5d5be]/40 bg-gradient-to-r from-[#c5d5be]/10 to-[#f0f5ed] px-2 sm:px-3 py-2">
//     <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-6 text-[9px] sm:text-xs" style={{ fontFamily: FONT_FAMILY }}>
//       <div>
//         <span className="text-[#77896F]">Subtotal:</span>
//         <span className="font-medium text-[#263b32] ml-1">৳{order.subtotal?.toFixed(2)}</span>
//       </div>
//       <div>
//         <span className="text-[#77896F]">Shipping:</span>
//         <span className="font-medium text-[#263b32] ml-1">৳{order.shippingCost?.toFixed(2)}</span>
//       </div>
//       {order.discount > 0 && (
//         <div>
//           <span className="text-green-600">Discount:</span>
//           <span className="font-medium text-green-600 ml-1">- ৳{order.discount?.toFixed(2)}</span>
//         </div>
//       )}
//       <div className="pl-2 sm:pl-4 border-l-2 border-[#c5d5be]/40">
//         <span className="font-bold text-[#263b32]">Total:</span>
//         <span className="font-bold text-[#77896F] ml-1">৳{order.total?.toFixed(2)}</span>
//       </div>
//     </div>
//   </div>
// </div>
//               </div>

//               {order.timeline && order.timeline.length > 0 && (
//                 <div>
//                   <h4 className="text-xs font-medium text-[#263b32] mb-2 flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <FaClock className="w-3.5 h-3.5 text-[#77896F]" />
//                     Status History
//                   </h4>
//                   <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
//                     {order.timeline.map((entry, idx) => {
//                       const entryStatusInfo = STATUS_CONFIG[entry.status] || STATUS_CONFIG['placed'];
//                       const isCurrent = entry.status === order.orderStatus;
//                       const displayLabel = entryStatusInfo.label || entry.status;
                      
//                       return (
//                         <div key={idx} className="flex items-start gap-2.5">
//                           <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isCurrent ? 'bg-gradient-to-r from-[#77896F] to-[#6b7d63] ring-2 ring-[#77896F]/30' : 'bg-[#c5d5be]'}`} />
//                           <div className="flex-1">
//                             <div className="flex flex-wrap items-center gap-1.5">
//                               <span className={`text-xs font-medium ${isCurrent ? 'text-[#77896F]' : 'text-[#263b32]'}`} style={{ fontFamily: FONT_FAMILY }}>
//                                 {displayLabel}
//                               </span>
//                               <span className="text-[9px] text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>{entry.formattedDate}</span>
//                             </div>
//                             {entry.note && (
//                               <p className="text-[10px] text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>{entry.note}</p>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <button
//                 onClick={handleDownloadInvoice}
//                 disabled={downloading}
//                 className="w-full py-2.5 bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#77896F]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 {downloading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Generating Invoice...
//                   </>
//                 ) : (
//                   <>
//                     <FaFileInvoice className="w-4 h-4" />
//                     Download Invoice
//                   </>
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// // ========== MAIN TRACK PAGE ==========
// export default function TrackPage() {
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [trackingData, setTrackingData] = useState(null);
//   const [error, setError] = useState(null);
//   const [searched, setSearched] = useState(false);
//   const [footerData, setFooterData] = useState(null);
//   const [contactItems, setContactItems] = useState([]);

//   useEffect(() => {
//     const loadFooterData = async () => {
//       const data = await fetchFooterData();
//       if (data) {
//         setFooterData(data);
//         const contacts = getContactItemsFromFooter(data);
//         setContactItems(contacts);
//       } else {
//         setContactItems([
//           { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#77896F]' },
//           { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#77896F]' },
//           { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
//         ]);
//       }
//     };
//     loadFooterData();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();
    
//     if (!phone.trim()) {
//       toast.error('Please enter a phone number');
//       return;
//     }
    
//     const phoneRegex = /^01[3-9]\d{8}$/;
//     if (!phoneRegex.test(phone.trim())) {
//       toast.error('Please enter a valid Bangladesh phone number (01XXXXXXXXX)');
//       return;
//     }
    
//     setLoading(true);
//     setError(null);
//     setSearched(true);
    
//     try {
//       const response = await fetch(`${API_URL}/api/orders/track/${phone.trim()}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setTrackingData(data.data);
//         toast.success(`Found ${data.data.totalOrders} order(s)`);
//       } else {
//         setError(data.error || 'No orders found for this phone number');
//         setTrackingData(null);
//       }
//     } catch (error) {
//       console.error('Track error:', error);
//       setError('Network error. Please try again.');
//       setTrackingData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleContactClick = (contact) => {
//     if (contact.label === 'Phone') {
//       window.location.href = contact.link;
//     } else if (contact.label === 'Email') {
//       const email = contact.link.replace('mailto:', '');
//       window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
//     } else if (contact.label === 'WhatsApp') {
//       window.open(contact.link, '_blank', 'noopener,noreferrer');
//     } else {
//       window.open(contact.link, '_blank');
//     }
//   };

//   const getIcon = (IconComponent, className = "w-3 h-3 sm:w-4 sm:h-4") => {
//     return <IconComponent className={className} />;
//   };

//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-[#f8f7f2] pt-12 lg:pt-10 pb-8">
//         <div className="container mx-auto px-4 max-w-4xl">
//           {/* Header - Green Theme with Lottie Animation */}
//           <div className="text-center mb-6 sm:mb-8">
//             <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3">
//               <DotLottieReact
//                 src="/animations/track.lottie"
//                 loop
//                 autoplay
//                 className="w-full h-full"
//               />
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//               Track Your Orders
//             </h1>
//             <p className="text-sm text-[#77896F]/60 mt-1" style={{ fontFamily: FONT_FAMILY }}>Enter your phone number to see all your orders</p>
//           </div>

//           {/* Search Form - Green Theme */}
//           <div className="bg-white rounded-2xl border border-[#c5d5be]/40 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
//             <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
//               <div className="flex-1 relative">
//                 <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#77896F]/40" />
//                 <input
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="Enter your phone number (01XXXXXXXXX)"
//                   className="w-full pl-10 pr-3 py-2.5 border border-[#c5d5be]/50 rounded-xl focus:ring-2 focus:ring-[#77896F] focus:border-transparent outline-none text-sm sm:text-base text-[#263b32] placeholder:text-[#77896F]/40"
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2.5 bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#77896F]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <FaSearch className="w-4 h-4" />
//                     Track Orders
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>

//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 mb-6"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <FaExclamationTriangle className="w-4 h-4 text-red-500" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-red-700 font-medium" style={{ fontFamily: FONT_FAMILY }}>No Orders Found</p>
//                   <p className="text-xs text-red-600" style={{ fontFamily: FONT_FAMILY }}>{error}</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {trackingData && (
//             <div className="space-y-4">
//               <div className="bg-gradient-to-r from-[#77896F] to-[#6b7d63] rounded-2xl p-4 text-white shadow-lg shadow-[#77896F]/25">
//                 <div className="flex flex-wrap items-center justify-between gap-3">
//                   <div>
//                     <p className="text-xs text-white/80" style={{ fontFamily: FONT_FAMILY }}>Phone Number</p>
//                     <p className="text-lg font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{trackingData.phone}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-white/80" style={{ fontFamily: FONT_FAMILY }}>Total Orders</p>
//                     <p className="text-2xl font-light" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{trackingData.totalOrders}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 {trackingData.orders.map((order, index) => (
//                   <OrderCard key={order.orderNumber || index} order={order} index={index} contactItems={contactItems} />
//                 ))}
//               </div>

//               <div className="text-center pt-4">
//                 <Link href="/products" className="inline-flex items-center gap-2 text-[#77896F] hover:text-[#6b7d63] transition-colors text-sm font-medium" style={{ fontFamily: FONT_FAMILY }}>
//                   <span>←</span> Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           )}

//           {!trackingData && !error && !loading && searched && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-white rounded-2xl border border-[#c5d5be]/40 p-8 sm:p-12 text-center shadow-sm"
//             >
//               <div className="w-16 h-16 mx-auto mb-4 bg-[#f0f5ed] rounded-full flex items-center justify-center border border-[#c5d5be]/40">
//                 <FaSearch className="w-8 h-8 text-[#77896F]/40" />
//               </div>
//               <h3 className="text-lg font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                 No Orders Found
//               </h3>
//               <p className="text-sm text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>We couldn't find any orders with this phone number.</p>
//               <p className="text-xs text-[#77896F]/40 mt-2" style={{ fontFamily: FONT_FAMILY }}>Please check the number and try again.</p>
//             </motion.div>
//           )}

//           <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#77896F]/60">
//             <div className="flex items-center gap-2">
//               <FaShieldAlt className="w-4 h-4 text-[#77896F]" />
//               <span style={{ fontFamily: FONT_FAMILY }}>Secure Tracking</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaClock className="w-4 h-4 text-[#77896F]" />
//               <span style={{ fontFamily: FONT_FAMILY }}>Real-time Updates</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaStar className="w-4 h-4 text-[#77896F]" />
//               <span style={{ fontFamily: FONT_FAMILY }}>Premium Quality</span>
//             </div>
//           </div>

//           <div className="mt-6 sm:mt-8 text-center">
//             <p className="text-xs text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Need help? Contact our support team</p>
//             <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
//               {contactItems.map((contact, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleContactClick(contact)}
//                   className={`text-sm hover:opacity-80 transition-colors flex items-center gap-1 ${contact.color}`}
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   {getIcon(contact.icon)}
//                   <span>{contact.value}</span>
//                 </button>
//               ))}
//               {contactItems.length > 0 && contactItems.map((_, index) => {
//                 if (index < contactItems.length - 1) {
//                   return <span key={`sep-${index}`} className="text-[#77896F]/20 hidden sm:inline">|</span>;
//                 }
//                 return null;
//               })}
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
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { 
  FaSearch, 
  FaPhone, 
  FaBox, 
  FaClock, 
  FaCheckCircle, 
  FaTruck, 
  FaMapMarkerAlt, 
  FaShoppingBag,
  FaChevronDown,
  FaChevronUp,
  FaMoneyBillWave,
  FaCreditCard,
  FaExclamationTriangle,
  FaShippingFast,
  FaCheckDouble,
  FaBan,
  FaSpinner,
  FaGift,
  FaUser,
  FaCalendarAlt,
  FaDownload,
  FaFileInvoice,
  FaHeart,
  FaStar,
  FaEnvelope,
  FaWhatsapp,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaUndo,
  FaPhoneAlt,
  FaCheck,
  FaBoxOpen,
  FaClipboardCheck,
  FaChevronLeft,
  FaChevronRight,
  FaPause
} from 'react-icons/fa';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { generateInvoicePDF } from '@/utils/invoicePDF';

// ========== FONT CONSTANTS - BEAUTY BUCKET THEME ==========
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = " serif";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ========== FETCH FOOTER DATA ==========
const fetchFooterData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/footer`);
    if (!response.ok) throw new Error('Failed to fetch footer data');
    const data = await response.json();
    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return null;
  }
};

// ========== GET CONTACT ITEMS FROM FOOTER DATA ==========
const getContactItemsFromFooter = (footerData) => {
  if (!footerData) {
    return [
      { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#77896F]' },
      { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#77896F]' },
      { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
    ];
  }

  const contacts = [];
  const company = footerData.company || {};
  const contactColumn = footerData.columns?.find(col => col.type === 'contact');
  const items = contactColumn?.items || [];

  const phoneItem = items.find(item => item.type === 'phone');
  if (phoneItem) {
    const cleanPhone = phoneItem.value.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaPhone,
      label: 'Phone',
      value: phoneItem.value,
      link: `tel:${cleanPhone}`,
      color: 'text-[#77896F]'
    });
  } else if (company.phone) {
    const cleanPhone = company.phone.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaPhone,
      label: 'Phone',
      value: company.phone,
      link: `tel:${cleanPhone}`,
      color: 'text-[#77896F]'
    });
  }

  const emailItem = items.find(item => item.type === 'email');
  if (emailItem) {
    contacts.push({
      icon: FaEnvelope,
      label: 'Email',
      value: emailItem.value,
      link: `mailto:${emailItem.value}`,
      color: 'text-[#77896F]'
    });
  } else if (company.email) {
    contacts.push({
      icon: FaEnvelope,
      label: 'Email',
      value: company.email,
      link: `mailto:${company.email}`,
      color: 'text-[#77896F]'
    });
  }

  const whatsappItem = items.find(item => item.type === 'whatsapp');
  if (whatsappItem) {
    const cleanPhone = whatsappItem.value.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: whatsappItem.value,
      link: `https://wa.me/${cleanPhone}`,
      color: 'text-green-500'
    });
  } else if (company.whatsapp) {
    const cleanPhone = company.whatsapp.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: company.whatsapp,
      link: `https://wa.me/${cleanPhone}`,
      color: 'text-green-500'
    });
  }

  if (contacts.length === 0) {
    contacts.push(
      { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#77896F]' },
      { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#77896F]' },
      { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
    );
  }

  return contacts;
};

// ========== STATUS CONFIG - Green Theme ==========
const STATUS_CONFIG = {
  'placed': { label: 'Order Placed', icon: FaBox, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
  'follow_up': { label: 'Follow Up', icon: FaPhoneAlt, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
  'reminder': { label: 'Reminder', icon: FaClock, color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  'accepted': { label: 'Accepted', icon: FaCheckCircle, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
  'approved': { label: 'Approved', icon: FaClipboardCheck, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
  'hold': { label: 'On Hold', icon: FaPause, color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  'ready_to_ship': { label: 'Ready to Ship', icon: FaBoxOpen, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
  'courier_assigned': { label: 'Assigned to Courier', icon: FaTruck, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
  'processing': { label: 'Processing', icon: FaSpinner, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
  'shipped': { label: 'Shipped', icon: FaShippingFast, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
  'out_for_delivery': { label: 'Out for Delivery', icon: FaTruck, color: 'bg-orange-500', textColor: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  'delivered': { label: 'Delivered', icon: FaCheckDouble, color: 'bg-green-500', textColor: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  'cancelled': { label: 'Cancelled', icon: FaBan, color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  'rejected': { label: 'Rejected', icon: FaBan, color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  'refunded': { label: 'Refunded', icon: FaBan, color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  'failed': { label: 'Failed', icon: FaExclamationTriangle, color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  'returned': { label: 'Returned', icon: FaUndo, color: 'bg-purple-500', textColor: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  'partial_delivery': { label: 'Partial Delivery', icon: FaBox, color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' }
};

// ========== GET STATUS BADGE COLOR ==========
const getStatusBadgeColor = (status) => {
  const colors = {
    'placed': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
    'follow_up': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
    'reminder': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'accepted': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
    'approved': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
    'hold': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'ready_to_ship': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
    'courier_assigned': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
    'processing': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
    'shipped': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
    'out_for_delivery': 'text-orange-600 bg-orange-50 border-orange-200',
    'delivered': 'text-green-600 bg-green-50 border-green-200',
    'cancelled': 'text-red-600 bg-red-50 border-red-200',
    'rejected': 'text-red-600 bg-red-50 border-red-200',
    'refunded': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'failed': 'text-red-600 bg-red-50 border-red-200',
    'returned': 'text-purple-600 bg-purple-50 border-purple-200',
    'partial_delivery': 'text-yellow-600 bg-yellow-50 border-yellow-200'
  };
  return colors[status] || 'text-gray-600 bg-gray-100 border-gray-200';
};

// ========== GET STATUS LABEL ==========
const getStatusLabel = (status) => {
  return STATUS_CONFIG[status]?.label || status;
};

// ========== GET PAYMENT METHOD BADGE ==========
const getPaymentMethodBadge = (method) => {
  const methods = {
    'cod': { label: 'Cash on Delivery', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaMoneyBillWave },
    'online': { label: 'Online Payment', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaCreditCard },
    'bkash': { label: 'bKash', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaMoneyBillWave },
    'nagad': { label: 'Nagad', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaMoneyBillWave }
  };
  const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: FaMoneyBillWave };
  const Icon = info.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${info.color}`} style={{ fontFamily: FONT_FAMILY }}>
      <Icon className="w-3 h-3" />
      {info.label}
    </span>
  );
};

// ========== GROUP ITEMS BY PRODUCT (NESTED variantDetails SUPPORT) ==========
const groupItemsByProduct = (items) => {
  if (!items || items.length === 0) return [];

  const grouped = {};

  items.forEach((item, index) => {
    let productId = item.productId;
    if (productId && typeof productId === 'object' && productId._id) {
      productId = productId._id.toString();
    } else if (productId) {
      productId = productId.toString();
    } else {
      productId = `item-${index}`;
    }

    const productName = item.productName || item.name || item.product?.name || 'Unknown Product';
    const image = item.image || item.product?.images?.[0]?.url || '';
    const unit = item.unit || 'pcs';

    if (!grouped[productId]) {
      grouped[productId] = {
        productId,
        productName,
        image,
        unit,
        basePrice: item.discountPrice || item.regularPrice || 0,
        regularPrice: item.regularPrice || 0,
        discountPrice: item.discountPrice || 0,
        baseRows: [],
        variantRows: [],
        colors: [],
        totalQuantity: 0
      };
    }

    const hasValidColor = item.selectedColor &&
      item.selectedColor !== 'null' &&
      item.selectedColor !== '' &&
      item.selectedColor !== 'undefined';

    // ============================================================
    // ✅ CASE 1: NESTED variantDetails[] (from Order schema)
    // ============================================================
    if (item.variantDetails && Array.isArray(item.variantDetails) && item.variantDetails.length > 0) {
      item.variantDetails.forEach(variant => {
        const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;

        const variantPrice = variant.variantDiscountPrice > 0
          ? Number(variant.variantDiscountPrice)
          : Number(variant.variantRegularPrice) || 0;
        const variantOriginalPrice = Number(variant.variantRegularPrice) || 0;
        const variantHasDiscount = variantPrice > 0 && variantOriginalPrice > variantPrice;

        if (hasSubVariants) {
          // Variant header row (only shows if it has its own quantity OR acts as header)
          const isHeaderOnly = (variant.quantity || 0) === 0;

          grouped[productId].variantRows.push({
            type: 'variant',
            variantId: variant.variantId,
            variantName: variant.variantName || 'Variant',
            subVariantId: null,
            subVariantName: null,
            selectedColor: variant.selectedColor || null,
            quantity: variant.quantity || 0,
            price: variantPrice,
            originalPrice: variantOriginalPrice,
            hasDiscount: variantHasDiscount,
            image: variant.image || '',
            unit: item.unit || 'pcs',
            isSubVariant: false,
            isVariant: true,
            isHeader: isHeaderOnly
          });

          if (variant.quantity > 0) {
            grouped[productId].totalQuantity += variant.quantity;
          }

          // Sub-variant rows
          variant.subVariants.forEach(sub => {
            const subPrice = sub.subVariantDiscountPrice > 0
              ? Number(sub.subVariantDiscountPrice)
              : Number(sub.subVariantRegularPrice) || 0;
            const subOriginalPrice = Number(sub.subVariantRegularPrice) || 0;
            const subHasDiscount = subPrice > 0 && subOriginalPrice > subPrice;

            grouped[productId].variantRows.push({
              type: 'subVariant',
              variantId: variant.variantId,
              variantName: variant.variantName || 'Variant',
              subVariantId: sub.subVariantId,
              subVariantName: sub.subVariantName || 'Sub-Variant',
              selectedColor: sub.selectedColor || variant.selectedColor || null,
              quantity: sub.quantity || 0,
              price: subPrice,
              originalPrice: subOriginalPrice,
              hasDiscount: subHasDiscount,
              image: sub.image || variant.image || '',
              unit: item.unit || 'pcs',
              isSubVariant: true,
              isVariant: false
            });

            grouped[productId].totalQuantity += sub.quantity || 0;
          });
        } else {
          // Plain variant
          grouped[productId].variantRows.push({
            type: 'variant',
            variantId: variant.variantId,
            variantName: variant.variantName || 'Variant',
            subVariantId: null,
            subVariantName: null,
            selectedColor: variant.selectedColor || null,
            quantity: variant.quantity || 0,
            price: variantPrice,
            originalPrice: variantOriginalPrice,
            hasDiscount: variantHasDiscount,
            image: variant.image || '',
            unit: item.unit || 'pcs',
            isSubVariant: false,
            isVariant: true
          });

          grouped[productId].totalQuantity += variant.quantity || 0;
        }
      });

      return;
    }

    // ============================================================
    // ✅ CASE 2: FLAT VARIANT FIELDS (fallback for older data)
    // ============================================================
    const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
    const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');

    if (isVariant || isSubVariant) {
      const variantPrice = item.variantDiscountPrice > 0
        ? Number(item.variantDiscountPrice)
        : Number(item.variantRegularPrice) > 0
          ? Number(item.variantRegularPrice)
          : Number(item.discountPrice) || Number(item.regularPrice) || 0;

      const originalPrice = Number(item.variantRegularPrice) > 0
        ? Number(item.variantRegularPrice)
        : Number(item.regularPrice) || 0;

      const hasDiscount = originalPrice > 0 && variantPrice > 0 && variantPrice < originalPrice;

      grouped[productId].variantRows.push({
        type: isSubVariant ? 'subVariant' : 'variant',
        itemId: item._id,
        variantId: item.variantId || null,
        variantName: item.variantName || 'Variant',
        subVariantId: item.subVariantId || null,
        subVariantName: item.subVariantName || null,
        selectedColor: hasValidColor ? item.selectedColor : null,
        quantity: item.quantity || 0,
        price: variantPrice,
        originalPrice,
        hasDiscount,
        image: item.variantImage || item.image || '',
        unit: item.unit || 'pcs',
        isSubVariant,
        isVariant: !isSubVariant
      });

      grouped[productId].totalQuantity += item.quantity || 0;
      return;
    }

    // ============================================================
    // ✅ CASE 3: COLOR ITEMS (no variants)
    // ============================================================
    if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
      const validColors = item.colors.filter(c =>
        c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined'
      );

      if (validColors.length > 0) {
        validColors.forEach(c => {
          const qty = c.quantity || 0;
          const p = c.price || item.discountPrice || item.regularPrice || 0;

          const existing = grouped[productId].colors.find(gc => gc.color === c.color);
          if (existing) {
            existing.quantity += qty;
          } else {
            grouped[productId].colors.push({
              color: c.color,
              quantity: qty,
              price: p
            });
          }
          grouped[productId].totalQuantity += qty;
        });
        return;
      }
    }

    if (hasValidColor) {
      const qty = item.quantity || 0;
      const p = item.discountPrice || item.regularPrice || 0;

      const existing = grouped[productId].colors.find(gc => gc.color === item.selectedColor);
      if (existing) {
        existing.quantity += qty;
      } else {
        grouped[productId].colors.push({
          color: item.selectedColor,
          quantity: qty,
          price: p
        });
      }
      grouped[productId].totalQuantity += qty;
      return;
    }

    // ============================================================
    // ✅ CASE 4: BASE (no color, no variant)
    // ============================================================
    grouped[productId].baseRows.push({
      itemId: item._id,
      quantity: item.quantity || 0,
      price: item.discountPrice || item.regularPrice || 0
    });
    grouped[productId].totalQuantity += item.quantity || 0;
  });

  return Object.values(grouped);
};

// ========== ORDER CARD COMPONENT ==========
const OrderCard = ({ order, index, contactItems }) => {
  const [expanded, setExpanded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const statusInfo = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG['placed'];
  const StatusIcon = statusInfo.icon;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isTerminal = ['cancelled', 'rejected', 'refunded', 'failed'].includes(order.orderStatus);
  const isDelivered = order.orderStatus === 'delivered';
  const isReturned = order.orderStatus === 'returned';
  const isPartialDelivery = order.orderStatus === 'partial_delivery';
  const isHold = order.orderStatus === 'hold';
  const hasDelivery = order.deliveryService?.courierOrderId;

  const groupedItems = groupItemsByProduct(order.items || []);

  const getStatusTimeline = () => {
    if (!order.statusHistory || order.statusHistory.length === 0) {
      return [
        {
          status: order.orderStatus,
          label: getStatusLabel(order.orderStatus),
          timestamp: order.createdAt,
          isCurrent: true,
          isCompleted: true,
          color: getStatusBadgeColor(order.orderStatus)
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
          color: getStatusBadgeColor(entry.status)
        });
      }
    });
    
    const hasCurrentStatus = uniqueStatuses.some(s => s.status === order.orderStatus);
    if (!hasCurrentStatus) {
      uniqueStatuses.push({
        status: order.orderStatus,
        label: getStatusLabel(order.orderStatus),
        timestamp: order.updatedAt || order.createdAt,
        color: getStatusBadgeColor(order.orderStatus)
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

  const handleDownloadInvoice = async (e) => {
    e.stopPropagation();
    setDownloading(true);
    try {
      const orderId = order._id || order.id || order.orderId;
      if (!orderId) {
        toast.error('Order ID not found');
        setDownloading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/orders/public/${orderId}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      if (data.success && data.data) {
        await generateInvoicePDF(data.data);
        toast.success('Invoice downloaded successfully!');
      } else {
        toast.error(data.error || 'Failed to fetch order details');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download invoice');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-[#c5d5be]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div 
        className="p-4 sm:p-5 cursor-pointer hover:bg-[#f0f5ed] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-full ${statusInfo.bgColor} border ${statusInfo.borderColor} flex items-center justify-center flex-shrink-0`}>
              <StatusIcon className={`w-5 h-5 ${statusInfo.textColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#77896F] font-mono truncate" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>#{order.orderNumber}</p>
              <p className="text-sm font-medium text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
                {new Date(order.createdAt).toLocaleDateString('en-BD', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-sm font-bold text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>৳{order.total?.toFixed(2)}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.orderStatus)}`} style={{ fontFamily: FONT_FAMILY }}>
              {getStatusLabel(order.orderStatus)}
            </div>
            <button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className="p-1.5 hover:bg-[#f0f5ed] rounded-full transition-colors text-[#77896F]/60 hover:text-[#77896F] disabled:opacity-50"
              title="Download Invoice"
            >
              {downloading ? (
                <div className="w-4 h-4 border-2 border-[#77896F] border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaDownload className="w-4 h-4" />
              )}
            </button>
            {expanded ? (
              <FaChevronUp className="w-4 h-4 text-[#77896F]/60 flex-shrink-0" />
            ) : (
              <FaChevronDown className="w-4 h-4 text-[#77896F]/60 flex-shrink-0" />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-[#c5d5be]/40 space-y-4">
              {!isTerminal && statusTimeline.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-[#263b32] mb-3 flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                    <FaClock className="w-3.5 h-3.5 text-[#77896F]" />
                    Order Progress
                  </h4>
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
                          <div key={step.status} className="flex flex-col items-center flex-1 min-w-[60px] sm:min-w-[80px] relative">
                            {!isLast && (
                              <div className={`absolute top-3 sm:top-4 left-[55%] sm:left-[60%] w-[70%] sm:w-[80%] h-0.5 ${isCompleted ? 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]' : 'bg-[#c5d5be]'}`} />
                            )}
                            
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[8px] sm:text-xs font-bold z-10 ${isCompleted ? 'bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white shadow-md shadow-[#77896F]/25' : 'bg-[#c5d5be]/30 text-[#77896F]/60 border border-[#c5d5be]/40'} ${isCurrent ? 'ring-2 sm:ring-4 ring-[#77896F]/30' : ''}`}>
                              {isCompleted ? <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : index + 1}
                            </div>
                            
                            <span className={`text-[7px] sm:text-[9px] mt-1 sm:mt-1.5 text-center font-medium leading-tight ${isCompleted ? 'text-[#263b32]' : 'text-[#77896F]/40'}`} style={{ fontFamily: FONT_FAMILY }}>
                              {step.label}
                            </span>
                            
                            {step.timestamp && (
                              <span className="text-[6px] sm:text-[7px] text-[#77896F]/40 mt-0.5 text-center max-w-[50px] sm:max-w-[90px] leading-tight" style={{ fontFamily: FONT_FAMILY }}>
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

              {isTerminal && (
                <div className="mb-4 p-3 rounded-xl border bg-red-50 border-red-200">
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <FaExclamationTriangle className="w-4 h-4" />
                    <span className="font-medium" style={{ fontFamily: FONT_FAMILY }}>
                      {order.orderStatus === 'cancelled' ? 'Order Cancelled' : 
                       order.orderStatus === 'rejected' ? 'Order Rejected' :
                       order.orderStatus === 'refunded' ? 'Order Refunded' :
                       'Order Failed'}
                    </span>
                  </div>
                  {order.cancellationReason && (
                    <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY }}>Reason: {order.cancellationReason}</p>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>Payment:</span>
                  {getPaymentMethodBadge(order.paymentMethod)}
                </div>
                {order.trackingNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Tracking:</span>
                    <span className="text-xs font-mono text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>{order.trackingNumber}</span>
                  </div>
                )}
              </div>

              {hasDelivery && (
                <div className="bg-gradient-to-r from-[#f0f5ed] to-[#c5d5be]/20 border border-[#77896F]/20 rounded-xl p-3">
                  <h4 className="text-xs font-medium text-[#263b32] flex items-center gap-2 mb-2" style={{ fontFamily: FONT_FAMILY }}>
                    <FaTruck className="w-3.5 h-3.5 text-[#77896F]" />
                    Courier Delivery Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                    <div>
                      <span className="text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Courier Service:</span>
                      <span className="font-medium text-[#263b32] ml-1" style={{ fontFamily: FONT_FAMILY }}>{order.deliveryService?.courierName || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Tracking Number:</span>
                      <span className="font-mono text-[#77896F] ml-1" style={{ fontFamily: FONT_FAMILY }}>{order.deliveryService?.trackingNumber || 'N/A'}</span>
                    </div>
                    {order.deliveryService?.trackingUrl && (
                      <div className="col-span-1 sm:col-span-2 mt-1 pt-1.5 border-t border-[#77896F]/10">
                        <div className="flex items-center gap-2">
                          <span className="text-[#77896F]/60 text-xs" style={{ fontFamily: FONT_FAMILY }}>Track your parcel:</span>
                          <a
                            href={order.deliveryService.trackingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#77896F]/25 transition-all"
                            style={{ fontFamily: FONT_FAMILY }}
                          >
                            <FaExternalLinkAlt className="w-3 h-3" />
                            Track on {order.deliveryService?.courierName || 'Courier'}
                          </a>
                        </div>
                        <p className="text-[10px] text-[#77896F]/40 mt-1" style={{ fontFamily: FONT_FAMILY }}>
                          Click the button above to track your parcel
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ============================================================
                  ORDER ITEMS TABLE - WITH VARIANT/SUB-VARIANT SUPPORT
              ============================================================ */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-medium text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                    <FaShoppingBag className="w-3.5 h-3.5 text-[#77896F]" />
                    Order Items ({groupedItems.length} products)
                  </h4>
                  <span className="text-[10px] text-[#77896F]/40" style={{ fontFamily: FONT_FAMILY }}>
                    Total: {order.items?.length || 0} items
                  </span>
                </div>

                <div className="bg-[#f0f5ed] rounded-xl border border-[#c5d5be]/40 overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-[#c5d5be]/20 border-b border-[#c5d5be]/40 text-[8px] sm:text-[10px] font-medium text-[#465641] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-4 sm:col-span-5">Product / Variant</div>
                    <div className="col-span-2 text-center">Color</div>
                    <div className="col-span-1 text-center">Qty</div>
                    <div className="col-span-1 text-center hidden sm:block">Unit</div>
                    <div className="col-span-1 text-right hidden sm:block">Price</div>
                    <div className="col-span-2 sm:col-span-1 text-right">Total</div>
                  </div>

               <div className="max-h-60 overflow-y-auto">
  {groupedItems.length === 0 ? (
    <div className="text-center py-4 text-xs text-[#77896F]/40" style={{ fontFamily: FONT_FAMILY }}>
      No items found
    </div>
  ) : (
    groupedItems.map((group, idx) => {
      // ============================================================
      // Build a flat list of rows for this product
      // ============================================================
      const rows = [];

      const hasVariants = group.variantRows.length > 0;

      // ------------------------------------------------------------
      // CASE A: Product HAS variants
      //   → Push a "product header" row that shows the product name,
      //     then push variant/sub-variant rows below.
      // ------------------------------------------------------------
      if (hasVariants) {
        // Compute product total = sum of ALL children (base + colors + variants + subs)
        let productTotal = 0;
        let productQty = 0;

        group.baseRows.forEach(br => {
          productTotal += br.price * br.quantity;
          productQty += br.quantity;
        });
        group.colors.forEach(c => {
          productTotal += c.price * c.quantity;
          productQty += c.quantity;
        });
        group.variantRows.forEach(v => {
          productTotal += v.price * v.quantity;
          productQty += v.quantity;
        });

        rows.push({
          kind: 'product-header',
          name: group.productName,
          color: null,
          quantity: productQty,
          price: productQty > 0 ? productTotal / productQty : 0,
          originalPrice: null,
          hasDiscount: false,
          unit: group.unit,
          indent: 0,
          badge: 'Product',
          image: group.image,
          isHeaderOnly: false,
          rowTotal: productTotal,
          showVariantsNote: true
        });

        // Add base rows (rare, but possible alongside variants)
        group.baseRows.forEach((br) => {
          rows.push({
            kind: 'base',
            name: group.productName,
            color: null,
            quantity: br.quantity,
            price: br.price,
            originalPrice: null,
            hasDiscount: false,
            unit: group.unit,
            indent: 1,
            badge: null,
            image: null,
            isHeaderOnly: false,
            rowTotal: br.price * br.quantity
          });
        });

        // Add color rows (rare alongside variants)
        group.colors.forEach((c) => {
          rows.push({
            kind: 'color',
            name: group.productName,
            color: c.color,
            quantity: c.quantity,
            price: c.price,
            originalPrice: null,
            hasDiscount: false,
            unit: group.unit,
            indent: 1,
            badge: null,
            image: null,
            isHeaderOnly: false,
            rowTotal: c.price * c.quantity
          });
        });

        // Add variant rows grouped by variantId
        const variantGroups = {};
        group.variantRows.forEach(v => {
          const key = v.variantId || 'unknown';
          if (!variantGroups[key]) variantGroups[key] = [];
          variantGroups[key].push(v);
        });

        Object.values(variantGroups).forEach(variants => {
          variants.sort((a, b) => {
            if (!a.isSubVariant && b.isSubVariant) return -1;
            if (a.isSubVariant && !b.isSubVariant) return 1;
            return 0;
          });

          const hasSubVariantInGroup = variants.some(v => v.isSubVariant);

          variants.forEach((v) => {
            const isVariantRow = !v.isSubVariant;
            const isHeaderOnly = isVariantRow
              && hasSubVariantInGroup
              && (v.quantity || 0) === 0;

            rows.push({
              kind: isVariantRow ? 'variant' : 'subVariant',
              name: isVariantRow ? v.variantName : v.subVariantName,
              parentVariantName: v.variantName,
              color: v.selectedColor,
              quantity: v.quantity,
              price: v.price,
              originalPrice: v.originalPrice,
              hasDiscount: v.hasDiscount,
              unit: v.unit,
              indent: isVariantRow ? 1 : 2,
              badge: isVariantRow ? 'Variant' : 'Sub',
              image: null,
              isHeaderOnly,
              rowTotal: v.price * v.quantity
            });
          });
        });
      }
      // ------------------------------------------------------------
      // CASE B: Product has NO variants
      //   → No separate product header. Just render the base/color rows
      //     using the product's own info (image, name, unit) on the FIRST row.
      // ------------------------------------------------------------
      else {
        // Base rows
        group.baseRows.forEach((br, i) => {
          rows.push({
            kind: 'base',
            name: group.productName,
            color: null,
            quantity: br.quantity,
            price: br.price,
            originalPrice: null,
            hasDiscount: false,
            unit: group.unit,
            indent: 0,
            badge: null,
            image: group.image,
            isHeaderOnly: false,
            isFirstOfGroup: rows.length === 0,
            rowTotal: br.price * br.quantity
          });
        });

        // Color rows
        group.colors.forEach((c) => {
          rows.push({
            kind: 'color',
            name: group.productName,
            color: c.color,
            quantity: c.quantity,
            price: c.price,
            originalPrice: null,
            hasDiscount: false,
            unit: group.unit,
            indent: 0,
            badge: null,
            image: group.image,
            isHeaderOnly: false,
            isFirstOfGroup: rows.length === 0,
            rowTotal: c.price * c.quantity
          });
        });
      }

      // ============================================================
      // Render
      // ============================================================
      return rows.map((row, rowIndex) => {
        const indent = row.indent || 0;
        const paddingLeft = indent === 0 ? 'pl-0' : indent === 1 ? 'pl-3' : 'pl-6';
        const hasColor = !!row.color;
        const isHeaderOnly = row.isHeaderOnly;
        const isProductRow = row.kind === 'product-header';
        const isBaseOrColorRow = row.kind === 'base' || row.kind === 'color';

        // For a product row in CASE B (base/color), the first row of the group
        // should show the image. Subsequent color rows also show the image only on the first one.
        const isFirstOfGroup = row.isFirstOfGroup || isProductRow;

        const rowTotal = row.rowTotal !== undefined
          ? row.rowTotal
          : row.price * row.quantity;

        return (
          <div
            key={`${idx}-${rowIndex}`}
            className={`grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 items-center border-b border-[#c5d5be]/20 last:border-0 hover:bg-gradient-to-r hover:from-[#f0f5ed] hover:to-[#c5d5be]/10 transition-colors ${
              indent === 2 ? 'bg-blue-50/20' :
              indent === 1 ? 'bg-purple-50/20' : ''
            }`}
          >
            {/* # Column */}
            <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-black" style={{ fontFamily: FONT_FAMILY }}>
              {isProductRow || isFirstOfGroup ? idx + 1 : ''}
            </div>

            {/* Product / Variant Column */}
            <div className={`col-span-4 sm:col-span-5 flex items-center gap-1.5 sm:gap-2 min-w-0 ${paddingLeft}`}>
              {/* Image — only on the first row of the group */}
              {isFirstOfGroup && row.image ? (
                <img
                  src={row.image}
                  alt={row.name}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover flex-shrink-0 bg-white border border-[#c5d5be]/40"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=P'; }}
                />
              ) : (
                !isFirstOfGroup && indent > 0 && (
                  <span className="w-6 sm:w-7 flex-shrink-0 text-[#77896F]/60 text-[10px] text-center font-medium">
                    {indent === 2 ? '→' : '▸'}
                  </span>
                )
              )}

              <div className="min-w-0 flex flex-wrap items-center gap-1">
                <p
                  className={`truncate ${
                    isProductRow ? 'text-[9px] sm:text-xs font-semibold text-[#263b32]' :
                    isBaseOrColorRow ? 'text-[9px] sm:text-xs font-medium text-[#263b32]' :
                    indent === 1 ? 'text-[8px] sm:text-xs font-medium text-purple-700' :
                    'text-[8px] sm:text-xs text-gray-600'
                  }`}
                  title={row.name}
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  {row.name}
                </p>

                {/* Badge */}
                {row.badge && (
                  <span
                    className={`text-[7px] sm:text-[8px] px-1 py-0.5 rounded flex-shrink-0 ${
                      row.badge === 'Product' ? 'bg-gray-100 text-gray-500' :
                      row.badge === 'Variant' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {row.badge}
                  </span>
                )}

                {/* "See variants below" note */}
                {row.showVariantsNote && (
                  <span className="text-[7px] sm:text-[8px] text-[#77896F]/60 italic flex-shrink-0" style={{ fontFamily: FONT_FAMILY }}>
                    (See variants below)
                  </span>
                )}

                {/* Discount badge */}
                {row.hasDiscount && !isHeaderOnly && !isProductRow && (
                  <span
                    className="text-[7px] sm:text-[8px] text-green-600 bg-green-50 px-1 py-0.5 rounded flex-shrink-0"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Save {Math.round(((row.originalPrice - row.price) / row.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Color Column */}
            <div className="col-span-2 flex justify-center items-center">
              {hasColor ? (
                <div
                  className="w-5 h-5 rounded-full border-2 border-[#c5d5be]/50 shadow-sm"
                  style={{ backgroundColor: row.color }}
                  title={row.color}
                />
              ) : (
                <span className="text-[8px] sm:text-[10px] text-[#77896F]/40" style={{ fontFamily: FONT_FAMILY }}>
                  —
                </span>
              )}
            </div>

            {/* Qty Column */}
            <div className="col-span-1 text-center text-[9px] sm:text-xs font-medium text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
              {isHeaderOnly ? (
                <span className="text-[#77896F]/40">—</span>
              ) : (
                row.quantity || 0
              )}
            </div>

            {/* Unit Column */}
            <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-[#77896F] hidden sm:block" style={{ fontFamily: FONT_FAMILY }}>
              {isHeaderOnly ? '' : (row.unit || 'pcs')}
            </div>

            {/* Price Column */}
            <div className="col-span-1 text-right text-[8px] sm:text-[10px] text-[#77896F] hidden sm:block" style={{ fontFamily: FONT_FAMILY }}>
              {isHeaderOnly ? (
                <span className="text-[#77896F]/40">—</span>
              ) : (
                <>
                  <span className={row.hasDiscount ? 'text-green-600 font-medium' : ''}>
                    ৳{row.price.toFixed(2)}
                  </span>
                  {row.hasDiscount && (
                    <span className="text-[#77896F]/40 line-through ml-1">
                      ৳{row.originalPrice.toFixed(2)}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Total Column */}
            <div className="col-span-2 sm:col-span-1 text-right text-[9px] sm:text-xs font-medium text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>
              {isHeaderOnly ? (
                <span className="text-[#77896F]/40">—</span>
              ) : (
                <>৳{rowTotal.toFixed(2)}</>
              )}
            </div>
          </div>
        );
      });
    })
  )}
</div>

                  {/* Footer */}
                  <div className="border-t border-[#c5d5be]/40 bg-gradient-to-r from-[#c5d5be]/10 to-[#f0f5ed] px-2 sm:px-3 py-2">
                    <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-6 text-[9px] sm:text-xs" style={{ fontFamily: FONT_FAMILY }}>
                      <div>
                        <span className="text-[#77896F]">Subtotal:</span>
                        <span className="font-medium text-[#263b32] ml-1">৳{order.subtotal?.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-[#77896F]">Shipping:</span>
                        <span className="font-medium text-[#263b32] ml-1">৳{order.shippingCost?.toFixed(2)}</span>
                      </div>
                      {order.discount > 0 && (
                        <div>
                          <span className="text-green-600">Discount:</span>
                          <span className="font-medium text-green-600 ml-1">- ৳{order.discount?.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="pl-2 sm:pl-4 border-l-2 border-[#c5d5be]/40">
                        <span className="font-bold text-[#263b32]">Total:</span>
                        <span className="font-bold text-[#77896F] ml-1">৳{order.total?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {order.timeline && order.timeline.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-[#263b32] mb-2 flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                    <FaClock className="w-3.5 h-3.5 text-[#77896F]" />
                    Status History
                  </h4>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
                    {order.timeline.map((entry, idx) => {
                      const entryStatusInfo = STATUS_CONFIG[entry.status] || STATUS_CONFIG['placed'];
                      const isCurrent = entry.status === order.orderStatus;
                      const displayLabel = entryStatusInfo.label || entry.status;
                      
                      return (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isCurrent ? 'bg-gradient-to-r from-[#77896F] to-[#6b7d63] ring-2 ring-[#77896F]/30' : 'bg-[#c5d5be]'}`} />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className={`text-xs font-medium ${isCurrent ? 'text-[#77896F]' : 'text-[#263b32]'}`} style={{ fontFamily: FONT_FAMILY }}>
                                {displayLabel}
                              </span>
                              <span className="text-[9px] text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>{entry.formattedDate}</span>
                            </div>
                            {entry.note && (
                              <p className="text-[10px] text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>{entry.note}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                onClick={handleDownloadInvoice}
                disabled={downloading}
                className="w-full py-2.5 bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#77896F]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
                style={{ fontFamily: FONT_FAMILY }}
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Invoice...
                  </>
                ) : (
                  <>
                    <FaFileInvoice className="w-4 h-4" />
                    Download Invoice
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ========== MAIN TRACK PAGE ==========
export default function TrackPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [footerData, setFooterData] = useState(null);
  const [contactItems, setContactItems] = useState([]);

  useEffect(() => {
    const loadFooterData = async () => {
      const data = await fetchFooterData();
      if (data) {
        setFooterData(data);
        const contacts = getContactItemsFromFooter(data);
        setContactItems(contacts);
      } else {
        setContactItems([
          { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#77896F]' },
          { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#77896F]' },
          { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
        ]);
      }
    };
    loadFooterData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      toast.error('Please enter a phone number');
      return;
    }
    
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      toast.error('Please enter a valid Bangladesh phone number (01XXXXXXXXX)');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      const response = await fetch(`${API_URL}/api/orders/track/${phone.trim()}`);
      const data = await response.json();
      
      if (data.success) {
        setTrackingData(data.data);
        toast.success(`Found ${data.data.totalOrders} order(s)`);
      } else {
        setError(data.error || 'No orders found for this phone number');
        setTrackingData(null);
      }
    } catch (error) {
      console.error('Track error:', error);
      setError('Network error. Please try again.');
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (contact) => {
    if (contact.label === 'Phone') {
      window.location.href = contact.link;
    } else if (contact.label === 'Email') {
      const email = contact.link.replace('mailto:', '');
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    } else if (contact.label === 'WhatsApp') {
      window.open(contact.link, '_blank', 'noopener,noreferrer');
    } else {
      window.open(contact.link, '_blank');
    }
  };

  const getIcon = (IconComponent, className = "w-3 h-3 sm:w-4 sm:h-4") => {
    return <IconComponent className={className} />;
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-[#f8f7f2] pt-12 lg:pt-10 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3">
              <DotLottieReact
                src="/animations/track.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
              Track Your Orders
            </h1>
            <p className="text-sm text-[#77896F]/60 mt-1" style={{ fontFamily: FONT_FAMILY }}>Enter your phone number to see all your orders</p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl border border-[#c5d5be]/40 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#77896F]/40" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number (01XXXXXXXXX)"
                  className="w-full pl-10 pr-3 py-2.5 border border-[#c5d5be]/50 rounded-xl focus:ring-2 focus:ring-[#77896F] focus:border-transparent outline-none text-sm sm:text-base text-[#263b32] placeholder:text-[#77896F]/40"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#77896F]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                style={{ fontFamily: FONT_FAMILY }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch className="w-4 h-4" />
                    Track Orders
                  </>
                )}
              </button>
            </form>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaExclamationTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-red-700 font-medium" style={{ fontFamily: FONT_FAMILY }}>No Orders Found</p>
                  <p className="text-xs text-red-600" style={{ fontFamily: FONT_FAMILY }}>{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {trackingData && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#77896F] to-[#6b7d63] rounded-2xl p-4 text-white shadow-lg shadow-[#77896F]/25">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-white/80" style={{ fontFamily: FONT_FAMILY }}>Phone Number</p>
                    <p className="text-lg font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{trackingData.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/80" style={{ fontFamily: FONT_FAMILY }}>Total Orders</p>
                    <p className="text-2xl font-light" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{trackingData.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {trackingData.orders.map((order, index) => (
                  <OrderCard key={order.orderNumber || index} order={order} index={index} contactItems={contactItems} />
                ))}
              </div>

              <div className="text-center pt-4">
                <Link href="/products" className="inline-flex items-center gap-2 text-[#77896F] hover:text-[#6b7d63] transition-colors text-sm font-medium" style={{ fontFamily: FONT_FAMILY }}>
                  <span>←</span> Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {!trackingData && !error && !loading && searched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-[#c5d5be]/40 p-8 sm:p-12 text-center shadow-sm"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-[#f0f5ed] rounded-full flex items-center justify-center border border-[#c5d5be]/40">
                <FaSearch className="w-8 h-8 text-[#77896F]/40" />
              </div>
              <h3 className="text-lg font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                No Orders Found
              </h3>
              <p className="text-sm text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>We couldn't find any orders with this phone number.</p>
              <p className="text-xs text-[#77896F]/40 mt-2" style={{ fontFamily: FONT_FAMILY }}>Please check the number and try again.</p>
            </motion.div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#77896F]/60">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="w-4 h-4 text-[#77896F]" />
              <span style={{ fontFamily: FONT_FAMILY }}>Secure Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4 text-[#77896F]" />
              <span style={{ fontFamily: FONT_FAMILY }}>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="w-4 h-4 text-[#77896F]" />
              <span style={{ fontFamily: FONT_FAMILY }}>Premium Quality</span>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Need help? Contact our support team</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              {contactItems.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleContactClick(contact)}
                  className={`text-sm hover:opacity-80 transition-colors flex items-center gap-1 ${contact.color}`}
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  {getIcon(contact.icon)}
                  <span>{contact.value}</span>
                </button>
              ))}
              {contactItems.length > 0 && contactItems.map((_, index) => {
                if (index < contactItems.length - 1) {
                  return <span key={`sep-${index}`} className="text-[#77896F]/20 hidden sm:inline">|</span>;
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}