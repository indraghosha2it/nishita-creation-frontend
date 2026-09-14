

// // utils/invoicePDF.js
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// // Helper function to format currency (BDT)
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-BD', {
//     style: 'currency',
//     currency: 'BDT',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(price || 0);
// };

// // Helper function to format date
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-BD', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// // ========== BEAUTY BUCKET COLORS - ALL PINK THEME ==========
// const COLORS = {
//   primary: '#EE4275',
//   primaryLight: '#FF6B9D',
//   primaryDark: '#D63A6A',
//   secondary: '#FF6B9D',
//   accent: '#FF8FAB',
//   blush: '#FFD2DB',
//   white: '#FFFFFF',
//   lightGray: '#FFF5F6',
//   border: '#FFD2DB',
//   text: '#2D1B2E',
//   textLight: '#8B7A8C',
//   textMuted: '#C4B5C5',
//   paid: '#4CAF50',
//   unpaid: '#EF4444',
//   partial: '#FF8C00'
// };

// // ========== GET COLOR HEX - SUPPORTS BOTH HEX AND COLOR NAMES ==========
// // (kept for compatibility, though no longer used in the table)
// const getColorHex = (color) => {
//   if (!color) return '#CCCCCC';
//   if (color.startsWith('#')) return color;

//   const colorMap = {
//     'red': '#FF0000', 'blue': '#0000FF', 'green': '#00FF00', 'yellow': '#FFFF00',
//     'black': '#000000', 'white': '#FFFFFF', 'gray': '#808080', 'grey': '#808080',
//     'orange': '#FFA500', 'purple': '#800080', 'pink': '#FFC0CB', 'brown': '#A52A2A',
//     'cyan': '#00FFFF', 'magenta': '#FF00FF', 'lime': '#00FF00', 'maroon': '#800000',
//     'navy': '#000080', 'olive': '#808000', 'teal': '#008080', 'silver': '#C0C0C0',
//     'gold': '#FFD700', 'coral': '#FF7F50', 'crimson': '#DC143C', 'indigo': '#4B0082',
//     'lavender': '#E6E6FA', 'salmon': '#FA8072', 'tan': '#D2B48C', 'violet': '#EE82EE',
//     'turquoise': '#40E0D0', 'beige': '#F5F5DC', 'chocolate': '#D2691E', 'fuchsia': '#FF00FF',
//     'ivory': '#FFFFF0', 'khaki': '#F0E68C', 'moccasin': '#FFE4B5', 'orchid': '#DA70D6',
//     'peach': '#FFDAB9', 'plum': '#DDA0DD', 'rose': '#FF007F', 'ruby': '#E0115F',
//     'sapphire': '#0F52BA', 'scarlet': '#FF2400', 'sky blue': '#87CEEB', 'skyblue': '#87CEEB',
//     'spring green': '#00FF7F', 'springgreen': '#00FF7F', 'steel blue': '#4682B4',
//     'steelblue': '#4682B4', 'tomato': '#FF6347', 'wheat': '#F5DEB3',
//     'midnight blue': '#191970', 'midnightblue': '#191970', 'dark blue': '#00008B',
//     'darkblue': '#00008B', 'dark green': '#006400', 'darkgreen': '#006400',
//     'dark red': '#8B0000', 'darkred': '#8B0000', 'dark gray': '#A9A9A9',
//     'darkgray': '#A9A9A9', 'light blue': '#ADD8E6', 'lightblue': '#ADD8E6',
//     'light green': '#90EE90', 'lightgreen': '#90EE90', 'light gray': '#D3D3D3',
//     'lightgray': '#D3D3D3', 'light pink': '#FFB6C1', 'lightpink': '#FFB6C1',
//     'dark pink': '#FF1493', 'darkpink': '#FF1493',
//   };

//   const lowerColor = color.toLowerCase().trim();
//   if (colorMap[lowerColor]) return colorMap[lowerColor];

//   for (const [key, value] of Object.entries(colorMap)) {
//     if (lowerColor.includes(key) || key.includes(lowerColor)) return value;
//   }

//   return '#CCCCCC';
// };

// // ========== FETCH NAVBAR DATA FOR LOGO ==========
// const fetchNavbarData = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const headers = {};
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }

//     const cacheBuster = `?t=${Date.now()}`;
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar${cacheBuster}`, {
//       headers,
//       cache: 'no-store'
//     });
//     const data = await response.json();

//     if (data.success && data.data && data.data.logo) {
//       return data.data.logo;
//     }
//     return null;
//   } catch (error) {
//     console.error('Error fetching navbar logo:', error);
//     return null;
//   }
// };

// // ========== CONVERT IMAGE TO BASE64 ==========
// const imageToBase64 = async (imageUrl) => {
//   try {
//     if (imageUrl?.startsWith('data:image')) {
//       return imageUrl;
//     }
//     if (!imageUrl) return null;

//     let fullUrl = imageUrl;
//     if (imageUrl.startsWith('/')) {
//       fullUrl = `${window.location.origin}${imageUrl}`;
//     }

//     const cacheBuster = `?t=${Date.now()}`;
//     const urlWithCacheBust = fullUrl.includes('?')
//       ? `${fullUrl}&t=${Date.now()}`
//       : `${fullUrl}${cacheBuster}`;

//     const response = await fetch(urlWithCacheBust, {
//       headers: {
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0'
//       }
//     });

//     if (!response.ok) {
//       console.warn(`Failed to fetch image: ${fullUrl}`);
//       return null;
//     }
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error('Error converting image to base64:', error);
//     return null;
//   }
// };

// // Helper to get item price
// const getItemPrice = (item) => {
//   return item.discountPrice || item.regularPrice || 0;
// };

// // Get company initials for logo fallback
// const getCompanyInitials = (companyName) => {
//   if (!companyName) return 'BB';
//   return companyName
//     .split(' ')
//     .map(word => word[0])
//     .join('')
//     .toUpperCase()
//     .substring(0, 2);
// };

// // ============================================================
// // ✅ GROUP ITEMS BY PRODUCT WITH NESTED VARIANTS
// // Mirrors the frontend grouping logic (ThankYouClient / TrackPage)
// // ============================================================
// const groupItemsForPDF = (items) => {
//   if (!items || items.length === 0) return [];

//   const productGroups = {};

//   items.forEach((item) => {
//     // Resolve productId
//     let productId = item.productId;
//     if (productId && typeof productId === 'object' && productId._id) {
//       productId = productId._id.toString();
//     } else if (productId) {
//       productId = productId.toString();
//     } else {
//       productId = `item-${Math.random()}`;
//     }

//     const productName = item.productName || item.name || 'Unknown Product';
//     const image = item.image || '';
//     const unit = item.unit || 'pcs';
//     const regularPrice = item.regularPrice || 0;
//     const discountPrice = item.discountPrice || 0;

//     if (!productGroups[productId]) {
//       productGroups[productId] = {
//         productId,
//         productName,
//         image,
//         unit,
//         regularPrice,
//         discountPrice,
//         baseRows: [],
//         colorRows: [],
//         variantRows: [],
//         totalQuantity: 0,
//         hasVariants: false,
//         hasSale: discountPrice > 0 && discountPrice < regularPrice
//       };
//     }

//     const group = productGroups[productId];
//     const hasValidColor = item.selectedColor &&
//       item.selectedColor !== 'null' &&
//       item.selectedColor !== '' &&
//       item.selectedColor !== 'undefined';

//     // ============================================================
//     // CASE 1: NESTED variantDetails[] (from Order schema)
//     // ============================================================
//     if (item.variantDetails && Array.isArray(item.variantDetails) && item.variantDetails.length > 0) {
//       group.hasVariants = true;

//       item.variantDetails.forEach((variant) => {
//         const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;

//         const variantPrice = variant.variantDiscountPrice > 0
//           ? Number(variant.variantDiscountPrice)
//           : Number(variant.variantRegularPrice) || 0;
//         const variantOriginalPrice = Number(variant.variantRegularPrice) || 0;
//         const variantHasDiscount = variantPrice > 0 && variantOriginalPrice > variantPrice;

//         if (hasSubVariants) {
//           const isHeaderOnly = (variant.quantity || 0) === 0;

//           group.variantRows.push({
//             type: 'variant',
//             variantId: variant.variantId,
//             variantName: variant.variantName || 'Variant',
//             subVariantId: null,
//             subVariantName: null,
//             selectedColor: variant.selectedColor || null,
//             quantity: variant.quantity || 0,
//             price: variantPrice,
//             originalPrice: variantOriginalPrice,
//             hasDiscount: variantHasDiscount,
//             image: variant.image || '',
//             unit: unit,
//             isSubVariant: false,
//             isVariant: true,
//             isHeader: isHeaderOnly
//           });

//           if (variant.quantity > 0) {
//             group.totalQuantity += variant.quantity;
//           }

//           variant.subVariants.forEach((sub) => {
//             const subPrice = sub.subVariantDiscountPrice > 0
//               ? Number(sub.subVariantDiscountPrice)
//               : Number(sub.subVariantRegularPrice) || 0;
//             const subOriginalPrice = Number(sub.subVariantRegularPrice) || 0;
//             const subHasDiscount = subPrice > 0 && subOriginalPrice > subPrice;

//             group.variantRows.push({
//               type: 'subVariant',
//               variantId: variant.variantId,
//               variantName: variant.variantName || 'Variant',
//               subVariantId: sub.subVariantId,
//               subVariantName: sub.subVariantName || 'Sub-Variant',
//               selectedColor: sub.selectedColor || variant.selectedColor || null,
//               quantity: sub.quantity || 0,
//               price: subPrice,
//               originalPrice: subOriginalPrice,
//               hasDiscount: subHasDiscount,
//               image: sub.image || variant.image || '',
//               unit: unit,
//               isSubVariant: true,
//               isVariant: false
//             });

//             group.totalQuantity += sub.quantity || 0;
//           });
//         } else {
//           group.variantRows.push({
//             type: 'variant',
//             variantId: variant.variantId,
//             variantName: variant.variantName || 'Variant',
//             subVariantId: null,
//             subVariantName: null,
//             selectedColor: variant.selectedColor || null,
//             quantity: variant.quantity || 0,
//             price: variantPrice,
//             originalPrice: variantOriginalPrice,
//             hasDiscount: variantHasDiscount,
//             image: variant.image || '',
//             unit: unit,
//             isSubVariant: false,
//             isVariant: true
//           });

//           group.totalQuantity += variant.quantity || 0;
//         }
//       });

//       return;
//     }

//     // ============================================================
//     // CASE 2: FLAT VARIANT FIELDS (fallback for older data)
//     // ============================================================
//     const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
//     const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');

//     if (isVariant || isSubVariant) {
//       group.hasVariants = true;

//       const variantPrice = item.variantDiscountPrice > 0
//         ? Number(item.variantDiscountPrice)
//         : Number(item.variantRegularPrice) > 0
//           ? Number(item.variantRegularPrice)
//           : Number(item.discountPrice) || Number(item.regularPrice) || 0;

//       const originalPrice = Number(item.variantRegularPrice) > 0
//         ? Number(item.variantRegularPrice)
//         : Number(item.regularPrice) || 0;

//       const hasDiscount = originalPrice > 0 && variantPrice > 0 && variantPrice < originalPrice;

//       group.variantRows.push({
//         type: isSubVariant ? 'subVariant' : 'variant',
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
//         unit: unit,
//         isSubVariant,
//         isVariant: !isSubVariant
//       });

//       group.totalQuantity += item.quantity || 0;
//       return;
//     }

//     // ============================================================
//     // CASE 3: COLOR ITEMS (no variants)
//     // ============================================================
//     if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
//       const validColors = item.colors.filter(c =>
//         c && c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined'
//       );

//       if (validColors.length > 0) {
//         validColors.forEach(c => {
//           const qty = c.quantity || 0;
//           const p = c.price || item.discountPrice || item.regularPrice || 0;

//           const existing = group.colorRows.find(gc => gc.color === c.color);
//           if (existing) {
//             existing.quantity += qty;
//           } else {
//             group.colorRows.push({
//               color: c.color,
//               quantity: qty,
//               price: p
//             });
//           }
//           group.totalQuantity += qty;
//         });
//         return;
//       }
//     }

//     if (hasValidColor) {
//       const qty = item.quantity || 0;
//       const p = item.discountPrice || item.regularPrice || 0;

//       const existing = group.colorRows.find(gc => gc.color === item.selectedColor);
//       if (existing) {
//         existing.quantity += qty;
//       } else {
//         group.colorRows.push({
//           color: item.selectedColor,
//           quantity: qty,
//           price: p
//         });
//       }
//       group.totalQuantity += qty;
//       return;
//     }

//     // ============================================================
//     // CASE 4: BASE (no color, no variant)
//     // ============================================================
//     group.baseRows.push({
//       quantity: item.quantity || 0,
//       price: item.discountPrice || item.regularPrice || 0
//     });
//     group.totalQuantity += item.quantity || 0;
//   });

//   return Object.values(productGroups);
// };

// // ============================================================
// // ✅ BUILD FLAT ROW LIST FOR A PRODUCT GROUP
// // ============================================================
// const buildRowsForGroup = (group) => {
//   const rows = [];
//   const hasVariants = group.variantRows.length > 0;

//   // ------------------------------------------------------------
//   // CASE A: Product HAS variants
//   // ------------------------------------------------------------
//   if (hasVariants) {
//     let productTotal = 0;
//     let productQty = 0;

//     group.baseRows.forEach(br => {
//       productTotal += br.price * br.quantity;
//       productQty += br.quantity;
//     });
//     group.colorRows.forEach(c => {
//       productTotal += c.price * c.quantity;
//       productQty += c.quantity;
//     });
//     group.variantRows.forEach(v => {
//       productTotal += v.price * v.quantity;
//       productQty += v.quantity;
//     });

//     rows.push({
//       name: group.productName,
//       badge: 'Product',
//       indent: 0,
//       color: null,
//       quantity: productQty,
//       unit: group.unit,
//       price: productQty > 0 ? productTotal / productQty : 0,
//       originalPrice: null,
//       hasDiscount: false,
//       isHeaderOnly: false,
//       showPrice: false,
//       showTotal: false,
//       rowTotal: productTotal,
//       isProductHeader: true,
//       image: group.image
//     });

//     // Base rows (rare alongside variants)
//     group.baseRows.forEach((br) => {
//       rows.push({
//         name: group.productName,
//         badge: null,
//         indent: 1,
//         color: null,
//         quantity: br.quantity,
//         unit: group.unit,
//         price: br.price,
//         originalPrice: null,
//         hasDiscount: false,
//         isHeaderOnly: false,
//         showPrice: true,
//         showTotal: true,
//         rowTotal: br.price * br.quantity,
//         image: null
//       });
//     });

//     // Color rows (rare alongside variants)
//     group.colorRows.forEach((c) => {
//       rows.push({
//         name: group.productName,
//         badge: null,
//         indent: 1,
//         color: c.color,
//         quantity: c.quantity,
//         unit: group.unit,
//         price: c.price,
//         originalPrice: null,
//         hasDiscount: false,
//         isHeaderOnly: false,
//         showPrice: true,
//         showTotal: true,
//         rowTotal: c.price * c.quantity,
//         image: null
//       });
//     });

//     // Group variant rows by variantId
//     const variantGroups = {};
//     group.variantRows.forEach(v => {
//       const key = v.variantId || 'unknown';
//       if (!variantGroups[key]) variantGroups[key] = [];
//       variantGroups[key].push(v);
//     });

//     Object.values(variantGroups).forEach(variants => {
//       variants.sort((a, b) => {
//         if (!a.isSubVariant && b.isSubVariant) return -1;
//         if (a.isSubVariant && !b.isSubVariant) return 1;
//         return 0;
//       });

//       const hasSubVariantInGroup = variants.some(v => v.isSubVariant);

//       variants.forEach((v) => {
//         const isVariantRow = !v.isSubVariant;
//         const isHeaderOnly = isVariantRow
//           && hasSubVariantInGroup
//           && (v.quantity || 0) === 0;

//         rows.push({
//           name: isVariantRow ? v.variantName : v.subVariantName,
//           badge: null,
//           indent: isVariantRow ? 1 : 2,
//           color: v.selectedColor,
//           quantity: v.quantity,
//           unit: v.unit,
//           price: v.price,
//           originalPrice: v.originalPrice,
//           hasDiscount: v.hasDiscount,
//           isHeaderOnly,
//           showPrice: !isHeaderOnly,
//           showTotal: !isHeaderOnly,
//           rowTotal: v.price * v.quantity,
//           image: null
//         });
//       });
//     });
//   }
//   // ------------------------------------------------------------
//   // CASE B: Product has NO variants
//   // ------------------------------------------------------------
//   else {
//     group.baseRows.forEach((br) => {
//       rows.push({
//         name: group.productName,
//         badge: null,
//         indent: 0,
//         color: null,
//         quantity: br.quantity,
//         unit: group.unit,
//         price: br.price,
//         originalPrice: null,
//         hasDiscount: false,
//         isHeaderOnly: false,
//         showPrice: true,
//         showTotal: true,
//         rowTotal: br.price * br.quantity,
//         image: group.image,
//         isFirstOfGroup: rows.length === 0
//       });
//     });

//     group.colorRows.forEach((c) => {
//       rows.push({
//         name: group.productName,
//         badge: null,
//         indent: 0,
//         color: c.color,
//         quantity: c.quantity,
//         unit: group.unit,
//         price: c.price,
//         originalPrice: null,
//         hasDiscount: false,
//         isHeaderOnly: false,
//         showPrice: true,
//         showTotal: true,
//         rowTotal: c.price * c.quantity,
//         image: group.image,
//         isFirstOfGroup: rows.length === 0
//       });
//     });
//   }

//   return rows;
// };

// export const generateInvoicePDF = async (order) => {
//   try {
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const margin = 15;
//     const contentWidth = pageWidth - (2 * margin);
//     let yPos = margin;

//     // ========== FETCH DYNAMIC LOGO FROM NAVBAR ==========
//     let companyLogoBase64 = null;

//     try {
//       const navbarLogo = await fetchNavbarData();
//       if (navbarLogo && navbarLogo.logoUrl) {
//         const result = await imageToBase64(navbarLogo.logoUrl);
//         if (result) {
//           companyLogoBase64 = result;
//           console.log('✅ Logo loaded from navbar successfully');
//         }
//       }
//     } catch (error) {
//       console.warn('Failed to load logo from navbar:', error);
//     }

//     // ==================== HEADER ====================
//     doc.setFillColor(238, 66, 117);
//     doc.rect(0, 0, pageWidth, 32, 'F');

//     doc.setFillColor(COLORS.white);
//     doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'F');

//     const logoSize = 18;
//     const logoX = margin + 5;
//     const logoY = yPos + 4;

//     // Logo or initials
//     if (companyLogoBase64) {
//       try {
//         const img = new Image();
//         img.src = companyLogoBase64;

//         await new Promise((resolve) => {
//           img.onload = resolve;
//         });

//         let imgWidth = img.width;
//         let imgHeight = img.height;
//         let finalWidth = logoSize;
//         let finalHeight = logoSize;

//         const aspectRatio = imgWidth / imgHeight;

//         if (aspectRatio > 1) {
//           finalWidth = logoSize;
//           finalHeight = logoSize / aspectRatio;
//         } else {
//           finalHeight = logoSize;
//           finalWidth = logoSize * aspectRatio;
//         }

//         const offsetX = (logoSize - finalWidth) / 2;
//         const offsetY = (logoSize - finalHeight) / 2;

//         doc.addImage(companyLogoBase64, 'PNG', logoX + offsetX, logoY + offsetY, finalWidth, finalHeight);
//         console.log('✅ Logo added to PDF');
//       } catch (error) {
//         console.error('Error adding logo to PDF:', error);
//         const initials = getCompanyInitials('Beauty Bucket');
//         doc.setFillColor(238, 66, 117);
//         doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
//         doc.setFontSize(9);
//         doc.setFont('helvetica', 'bold');
//         doc.setTextColor(COLORS.white);
//         doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
//       }
//     } else {
//       const initials = getCompanyInitials('Beauty Bucket');
//       doc.setFillColor(238, 66, 117);
//       doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
//       doc.setFontSize(9);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.white);
//       doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
//     }

//     const companyX = logoX + logoSize + 8;

//     // ========== BEAUTY BUCKET COMPANY NAME ==========
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');

//     doc.setTextColor(45, 27, 46);
//     doc.text('Beauty', companyX, logoY + 4);

//     const beautyWidth = doc.getTextWidth('Beauty');
//     doc.setTextColor(238, 66, 117);
//     doc.text('Bucket', companyX + beautyWidth, logoY + 4);

//     doc.setFontSize(7);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textLight);

//     doc.setFont('helvetica', 'bold');
//     doc.text('Contact: ', companyX, logoY + 9);
//     const contactLabelWidth = doc.getTextWidth('Contact: ');
//     doc.setFont('helvetica', 'normal');
//     doc.text('+8801XXXXXXXXX', companyX + contactLabelWidth, logoY + 9);

//     doc.setFontSize(6.5);
//     doc.text('info@beautybucket.com', companyX, logoY + 13);

//     doc.setFontSize(6);
//     const companyAddressLines = doc.splitTextToSize('Mirpur DOHS, Dhaka, Bangladesh', 70);
//     doc.text(companyAddressLines, companyX, logoY + 17);

//     const rightAlignX = pageWidth - margin - 5;

//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     const invoiceNoText = `INVOICE NO: `;
//     const orderNumber = order.orderNumber || order._id.slice(-8).toUpperCase();
//     doc.text(invoiceNoText, rightAlignX - doc.getTextWidth(invoiceNoText + orderNumber), yPos + 8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.text);
//     doc.text(orderNumber, rightAlignX, yPos + 8, { align: 'right' });

//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textLight);

//     const orderDate = formatDate(order.createdAt);
//     const status = order.orderStatus?.toUpperCase() || 'PLACED';
//     const paymentMethod = order.paymentMethod?.toUpperCase() || 'COD';

//     doc.text(`Date: ${orderDate}`, rightAlignX, yPos + 11.5, { align: 'right' });

//     let statusColor = COLORS.unpaid;
//     if (status === 'DELIVERED') statusColor = COLORS.paid;
//     else if (status === 'CANCELLED') statusColor = COLORS.unpaid;
//     doc.setTextColor(statusColor);
//     doc.text(`Status: ${status}`, rightAlignX, yPos + 15.5, { align: 'right' });
//     doc.setTextColor(COLORS.textLight);

//     doc.text(`Payment: ${paymentMethod}`, rightAlignX, yPos + 19.5, { align: 'right' });

//     // ==================== CUSTOMER & DELIVERY INFO SECTION ====================
//     yPos += 34;

//     const customerColWidth = (contentWidth / 2) - 3;
//     const addressColWidth = (contentWidth / 2) - 3;

//     let leftColHeight = 25;
//     let rightColHeight = 25;

//     const customerInfoLines = [
//       `Name: ${order.customerInfo.fullName || 'N/A'}`,
//       order.customerInfo.email ? `Email: ${order.customerInfo.email}` : null,
//       `Phone: ${order.customerInfo.phone || 'N/A'}`,
//       `Address: ${order.customerInfo.address || 'N/A'}`
//     ].filter(Boolean);
//     leftColHeight = Math.max(leftColHeight, 10 + (customerInfoLines.length * 4.5));

//     const deliveryAddressLines = [
//       order.customerInfo.area ? `Area/Union: ${order.customerInfo.area}` : null,
//       order.customerInfo.zone ? `Upazila/Thana: ${order.customerInfo.zone}` : null,
//       order.customerInfo.city ? `District/City: ${order.customerInfo.city}` : null,
//       order.customerInfo.division ? `Division: ${order.customerInfo.division}` : null,
//     ].filter(Boolean);
//     rightColHeight = Math.max(rightColHeight, 10 + (deliveryAddressLines.length * 4.5));

//     const colHeight = Math.max(leftColHeight, rightColHeight, 35);

//     // Left Column - Customer Info
//     doc.setFillColor(255, 245, 246);
//     doc.roundedRect(margin, yPos, customerColWidth, colHeight, 2, 2, 'F');

//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('CUSTOMER INFO', margin + 5, yPos + 5);

//     let leftY = yPos + 10;
//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.text);

//     doc.setFont('helvetica', 'bold');
//     doc.text('Name:', margin + 5, leftY);
//     doc.setFont('helvetica', 'normal');
//     doc.text(order.customerInfo.fullName || 'N/A', margin + 30, leftY);
//     leftY += 4.5;

//     if (order.customerInfo.email) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Email:', margin + 5, leftY);
//       doc.setFont('helvetica', 'normal');
//       doc.text(order.customerInfo.email, margin + 30, leftY);
//       leftY += 4.5;
//     }

//     doc.setFont('helvetica', 'bold');
//     doc.text('Phone:', margin + 5, leftY);
//     doc.setFont('helvetica', 'normal');
//     doc.text(order.customerInfo.phone || 'N/A', margin + 30, leftY);
//     leftY += 4.5;

//     doc.setFont('helvetica', 'bold');
//     doc.text('Address:', margin + 5, leftY);
//     doc.setFont('helvetica', 'normal');
//     const addressValue = order.customerInfo.address || 'N/A';
//     const addressLines = doc.splitTextToSize(addressValue, customerColWidth - 35);
//     for (let i = 0; i < addressLines.length; i++) {
//       const xPos = i === 0 ? margin + 30 : margin + 5 + 5;
//       doc.text(addressLines[i], xPos, leftY + (i * 4));
//     }

//     // Right Column - Delivery Address
//     const addressColX = margin + customerColWidth + 6;
//     doc.setFillColor(255, 245, 246);
//     doc.roundedRect(addressColX, yPos, addressColWidth, colHeight, 2, 2, 'F');

//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('DELIVERY ADDRESS', addressColX + 5, yPos + 5);

//     let rightY = yPos + 10;
//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.text);

//     if (order.customerInfo.area) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Area/Union:', addressColX + 5, rightY);
//       doc.setFont('helvetica', 'normal');
//       doc.text(order.customerInfo.area, addressColX + 40, rightY);
//       rightY += 4.5;
//     }

//     if (order.customerInfo.zone) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Upazila/Thana:', addressColX + 5, rightY);
//       doc.setFont('helvetica', 'normal');
//       doc.text(order.customerInfo.zone, addressColX + 40, rightY);
//       rightY += 4.5;
//     }

//     if (order.customerInfo.city) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('District/City:', addressColX + 5, rightY);
//       doc.setFont('helvetica', 'normal');
//       doc.text(order.customerInfo.city, addressColX + 40, rightY);
//       rightY += 4.5;
//     }

//     if (order.customerInfo.division) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Division:', addressColX + 5, rightY);
//       doc.setFont('helvetica', 'normal');
//       doc.text(order.customerInfo.division, addressColX + 40, rightY);
//       rightY += 4.5;
//     }

//     yPos += colHeight + 10;

//     // ==================== ITEMS TABLE ====================
//     doc.setFontSize(9);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.text);
//     doc.text('ORDER ITEMS', margin, yPos);
//     yPos += 5;

//     // ========== NEW COLUMN POSITIONS (no Color column) ==========
//     // Product column is now wider; Color column removed.
//     const colPositions = {
//       item: margin + 3,
//       product: margin + 10,
//       unit: margin + contentWidth - 70,
//       qty: margin + contentWidth - 55,
//       price: margin + contentWidth - 35,
//       total: margin + contentWidth - 8
//     };

//     // Draw table header function (used for page breaks)
//     const drawTableHeader = () => {
//       doc.setFillColor(238, 66, 117);
//       doc.rect(margin, yPos, contentWidth, 7, 'F');

//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.white);

//       doc.text('#', colPositions.item, yPos + 4.5);
//       doc.text('Product', colPositions.product, yPos + 4.5);
//       doc.text('Unit', colPositions.unit, yPos + 4.5);
//       doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//       doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
//       doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });

//       yPos += 10;
//     };

//     drawTableHeader();

//     let rowCount = 0;
//     let productIndex = 0;

//     // ========== GROUP ITEMS BY PRODUCT ==========
//     const groupedItems = groupItemsForPDF(order.items || []);

//     groupedItems.forEach((group) => {
//       productIndex++;
//       const groupRows = buildRowsForGroup(group);

//       const rowHeight = 7;

//       groupRows.forEach((row) => {
//         // Page break check
//         if (yPos + rowHeight > pageHeight - 55) {
//           doc.addPage();
//           yPos = margin + 10;
//           rowCount = 0;
//           drawTableHeader();
//         }

//         const indent = row.indent || 0;
//         const isProductHeader = row.isProductHeader === true;
//         const isHeaderOnly = row.isHeaderOnly === true;
//         const hidePrice = row.showPrice === false || isHeaderOnly;
//         const hideTotal = row.showTotal === false || isHeaderOnly;

//         // Row background (alternating)
//         if (rowCount % 2 === 0) {
//           doc.setFillColor(255, 245, 246);
//           doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
//         }

//         // Indent-based tint
//         if (indent === 2) {
//           doc.setFillColor(248, 244, 255);
//           doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
//         } else if (indent === 1) {
//           doc.setFillColor(255, 250, 252);
//           doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
//         }

//         const textY = yPos + 4;

//         // ===== # column =====
//         doc.setFontSize(6.5);
//         doc.setFont('helvetica', 'normal');
//         doc.setTextColor(COLORS.text);
//         if (indent === 0 || isProductHeader) {
//           doc.text(productIndex.toString(), colPositions.item, textY);
//         }

//         // ===== Product / Variant column =====
//         let nameX = colPositions.product;
//         if (indent === 1) nameX += 4;
//         if (indent === 2) nameX += 8;

//         // Arrow marker for indent (ASCII only — jsPDF helvetica can't render ▸ / →)
//         if (indent > 0) {
//           doc.setTextColor(COLORS.textMuted);
//           doc.setFontSize(6);
//           doc.text(indent === 2 ? '>>' : '>', nameX - 3, textY);
//           doc.setTextColor(COLORS.text);
//           doc.setFontSize(6.5);
//         }

//         // Product name (truncated to fit)
//         const nameFont = isProductHeader ? 'bold' : 'normal';
//         doc.setFont('helvetica', nameFont);
//         doc.setTextColor(
//           isProductHeader ? COLORS.text :
//           indent === 1 ? '#7C3AED' :
//           indent === 2 ? '#6B7280' :
//           COLORS.text
//         );

//         // Wider max width now that Color column is gone
//         const maxNameWidth = indent === 0 ? 90 : indent === 1 ? 85 : 80;
//         let displayName = row.name || '';
//         while (doc.getTextWidth(displayName) > maxNameWidth && displayName.length > 3) {
//           displayName = displayName.substring(0, displayName.length - 1);
//         }
//         if (displayName !== (row.name || '')) {
//           displayName = displayName.substring(0, displayName.length - 3) + '...';
//         }
//         doc.text(displayName, nameX, textY);

//         // "See variants below" note (only for product header of variant product)
//         if (isProductHeader) {
//           const nameWidth = doc.getTextWidth(displayName);
//           const noteX = nameX + nameWidth + 2;
//           doc.setFontSize(5);
//           doc.setFont('helvetica', 'italic');
//           doc.setTextColor(COLORS.textMuted);
//           doc.text('', noteX, textY);
//           doc.setFontSize(6.5);
//           doc.setFont('helvetica', 'normal');
//           doc.setTextColor(COLORS.text);
//         }

//         // ===== Unit column =====
//         if (!isHeaderOnly) {
//           doc.setFont('helvetica', 'normal');
//           doc.setTextColor(COLORS.textLight);
//           doc.text(row.unit || 'pcs', colPositions.unit, textY);
//           doc.setTextColor(COLORS.text);
//         }

//         // ===== Qty column =====
//         if (isHeaderOnly) {
//           doc.setTextColor(COLORS.textMuted);
//           doc.text('-', colPositions.qty, textY, { align: 'right' });
//           doc.setTextColor(COLORS.text);
//         } else {
//           doc.setFont('helvetica', 'normal');
//           doc.setTextColor(COLORS.text);
//           doc.text((row.quantity || 0).toString(), colPositions.qty, textY, { align: 'right' });
//         }

//         // ===== Price column (only discounted price, no strikethrough) =====
//         if (hidePrice) {
//           doc.setTextColor(COLORS.textMuted);
//           doc.text('-', colPositions.price, textY, { align: 'right' });
//           doc.setTextColor(COLORS.text);
//         } else {
//           doc.setFont('helvetica', 'normal');
//           doc.setTextColor(COLORS.text);
//           doc.text(formatPrice(row.price), colPositions.price, textY, { align: 'right' });
//         }

//         // ===== Total column =====
//         if (hideTotal) {
//           doc.setTextColor(COLORS.textMuted);
//           doc.text('-', colPositions.total, textY, { align: 'right' });
//           doc.setTextColor(COLORS.text);
//         } else {
//           doc.setFont('helvetica', 'bold');
//           doc.setTextColor(COLORS.primary);
//           doc.text(formatPrice(row.rowTotal), colPositions.total, textY, { align: 'right' });
//           doc.setTextColor(COLORS.text);
//         }

//         yPos += rowHeight;
//         rowCount++;
//       });
//     });

//     yPos += 5;

//     // ==================== SUMMARY SECTION ====================
//     const summaryWidth = 85;
//     const summaryX = pageWidth - margin - summaryWidth;

//     // Page break if summary wouldn't fit
//     if (yPos + 55 > pageHeight - 20) {
//       doc.addPage();
//       yPos = margin + 10;
//     }

//     doc.setFillColor(255, 245, 246);
//     doc.setDrawColor(COLORS.primary);
//     doc.setLineWidth(0.3);
//     doc.roundedRect(summaryX, yPos, summaryWidth, 45, 2, 2, 'FD');

//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('SUMMARY', summaryX + 3, yPos + 5);

//     let summaryY = yPos + 9;
//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.text);

//     const subtotal = order.subtotal || 0;
//     const shippingCost = order.shippingCost || 0;
//     const discount = order.discount || 0;
//     const total = order.total || 0;

//     doc.text('Subtotal:', summaryX + 3, summaryY);
//     doc.text(formatPrice(subtotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//     summaryY += 4.5;

//     doc.text('Shipping:', summaryX + 3, summaryY);
//     doc.text(formatPrice(shippingCost), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//     summaryY += 4.5;

//     if (discount > 0) {
//       doc.setTextColor(COLORS.paid);
//       doc.text('Discount:', summaryX + 3, summaryY);
//       doc.text(`-${formatPrice(discount)}`, summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//       doc.setTextColor(COLORS.text);
//       summaryY += 4.5;
//     }

//     doc.setDrawColor(COLORS.primary);
//     doc.setLineWidth(0.3);
//     doc.line(summaryX + 3, summaryY - 1, summaryX + summaryWidth - 3, summaryY - 1);

//     summaryY += 2;

//     doc.setFontSize(9);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('TOTAL:', summaryX + 3, summaryY);
//     doc.text(formatPrice(total), summaryX + summaryWidth - 3, summaryY, { align: 'right' });

//     yPos += 55;

//     // ==================== ORDER NOTES ====================
//     if (order.customerInfo?.note) {
//       if (yPos > pageHeight - 35) {
//         doc.addPage();
//         yPos = margin + 10;
//       }

//       doc.setDrawColor(COLORS.primary);
//       doc.setLineWidth(0.3);
//       doc.line(margin, yPos, pageWidth - margin, yPos);
//       yPos += 5;

//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.primary);
//       doc.text('ORDER NOTES:', margin, yPos);

//       doc.setFontSize(6);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(COLORS.textLight);

//       const noteLines = doc.splitTextToSize(order.customerInfo.note, contentWidth);
//       doc.text(noteLines, margin, yPos + 4);
//       yPos += (noteLines.length * 4) + 10;
//     }

//     // ==================== FOOTER ====================
//     const footerY = pageHeight - 8;

//     doc.setDrawColor(COLORS.primary);
//     doc.setLineWidth(0.3);
//     doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

//     doc.setFontSize(5.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textMuted);

//     doc.text('Thank you for shopping with Beauty Bucket!', pageWidth / 2, footerY, { align: 'center' });
//     doc.text('For any queries, contact us at support@beautybucket.com', pageWidth / 2, footerY + 4, { align: 'center' });

//     // ==================== SAVE PDF ====================
//     const pdfBlob = doc.output('blob');
//     const url = URL.createObjectURL(pdfBlob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Invoice_${orderNumber}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);

//     return { success: true, fileName: `Invoice_${orderNumber}.pdf` };

//   } catch (error) {
//     console.error('PDF Generation Error:', error);
//     throw error;
//   }
// };


// utils/invoicePDF.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Helper function to format currency (BDT)
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price || 0);
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// ========== BEAUTY BUCKET COLORS - SAGE / CREAM THEME ==========
// Palette matched to About + Featured Products pages:
//   - sage / olive green  : #8B9D83, #65705d, #53604f, #465641, #52665a
//   - warm cream / beige  : #FDF7EF, #faf9f5, #f7f4ef, #dfe1d7
//   - deep text           : #263b32, #29362f, #303b34
const COLORS = {
  primary: '#65705d',         // Deep sage green (main brand)
  primaryLight: '#8B9D83',    // Lighter sage (accents, "In Stock")
  primaryDark: '#465641',     // Darkest olive (headers, emphasis)
  secondary: '#8B9D83',       // Sage
  accent: '#a9afa5',          // Muted sage-gray
  blush: '#e2e3dd',           // Very soft sage-tinted border
  white: '#FFFFFF',
  lightGray: '#FDF7EF',       // Warm cream background (cards)
  border: '#e2e3dd',          // Soft sage border
  text: '#263b32',            // Deep forest text (readable)
  textLight: '#53645a',       // Muted deep sage
  textMuted: '#8a9284',       // Soft muted sage
  paid: '#5b7d4f',            // Deep natural green (Paid / success)
  unpaid: '#a14b3a',          // Deep terracotta (Unpaid / cancel)
  partial: '#a67a2e'          // Deep amber (Partial)
};

// ========== GET COLOR HEX - SUPPORTS BOTH HEX AND COLOR NAMES ==========
// (kept for compatibility, though no longer used in the table)
const getColorHex = (color) => {
  if (!color) return '#CCCCCC';
  if (color.startsWith('#')) return color;

  const colorMap = {
    'red': '#FF0000', 'blue': '#0000FF', 'green': '#00FF00', 'yellow': '#FFFF00',
    'black': '#000000', 'white': '#FFFFFF', 'gray': '#808080', 'grey': '#808080',
    'orange': '#FFA500', 'purple': '#800080', 'pink': '#FFC0CB', 'brown': '#A52A2A',
    'cyan': '#00FFFF', 'magenta': '#FF00FF', 'lime': '#00FF00', 'maroon': '#800000',
    'navy': '#000080', 'olive': '#808000', 'teal': '#008080', 'silver': '#C0C0C0',
    'gold': '#FFD700', 'coral': '#FF7F50', 'crimson': '#DC143C', 'indigo': '#4B0082',
    'lavender': '#E6E6FA', 'salmon': '#FA8072', 'tan': '#D2B48C', 'violet': '#EE82EE',
    'turquoise': '#40E0D0', 'beige': '#F5F5DC', 'chocolate': '#D2691E', 'fuchsia': '#FF00FF',
    'ivory': '#FFFFF0', 'khaki': '#F0E68C', 'moccasin': '#FFE4B5', 'orchid': '#DA70D6',
    'peach': '#FFDAB9', 'plum': '#DDA0DD', 'rose': '#FF007F', 'ruby': '#E0115F',
    'sapphire': '#0F52BA', 'scarlet': '#FF2400', 'sky blue': '#87CEEB', 'skyblue': '#87CEEB',
    'spring green': '#00FF7F', 'springgreen': '#00FF7F', 'steel blue': '#4682B4',
    'steelblue': '#4682B4', 'tomato': '#FF6347', 'wheat': '#F5DEB3',
    'midnight blue': '#191970', 'midnightblue': '#191970', 'dark blue': '#00008B',
    'darkblue': '#00008B', 'dark green': '#006400', 'darkgreen': '#006400',
    'dark red': '#8B0000', 'darkred': '#8B0000', 'dark gray': '#A9A9A9',
    'darkgray': '#A9A9A9', 'light blue': '#ADD8E6', 'lightblue': '#ADD8E6',
    'light green': '#90EE90', 'lightgreen': '#90EE90', 'light gray': '#D3D3D3',
    'lightgray': '#D3D3D3', 'light pink': '#FFB6C1', 'lightpink': '#FFB6C1',
    'dark pink': '#FF1493', 'darkpink': '#FF1493',
  };

  const lowerColor = color.toLowerCase().trim();
  if (colorMap[lowerColor]) return colorMap[lowerColor];

  for (const [key, value] of Object.entries(colorMap)) {
    if (lowerColor.includes(key) || key.includes(lowerColor)) return value;
  }

  return '#CCCCCC';
};

// ========== FETCH NAVBAR DATA FOR LOGO ==========
const fetchNavbarData = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const cacheBuster = `?t=${Date.now()}`;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar${cacheBuster}`, {
      headers,
      cache: 'no-store'
    });
    const data = await response.json();

    if (data.success && data.data && data.data.logo) {
      return data.data.logo;
    }
    return null;
  } catch (error) {
    console.error('Error fetching navbar logo:', error);
    return null;
  }
};

// ========== CONVERT IMAGE TO BASE64 ==========
const imageToBase64 = async (imageUrl) => {
  try {
    if (imageUrl?.startsWith('data:image')) {
      return imageUrl;
    }
    if (!imageUrl) return null;

    let fullUrl = imageUrl;
    if (imageUrl.startsWith('/')) {
      fullUrl = `${window.location.origin}${imageUrl}`;
    }

    const cacheBuster = `?t=${Date.now()}`;
    const urlWithCacheBust = fullUrl.includes('?')
      ? `${fullUrl}&t=${Date.now()}`
      : `${fullUrl}${cacheBuster}`;

    const response = await fetch(urlWithCacheBust, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    if (!response.ok) {
      console.warn(`Failed to fetch image: ${fullUrl}`);
      return null;
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

// Helper to get item price
const getItemPrice = (item) => {
  return item.discountPrice || item.regularPrice || 0;
};

// Get company initials for logo fallback
const getCompanyInitials = (companyName) => {
  if (!companyName) return 'BB';
  return companyName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// ============================================================
// ✅ GROUP ITEMS BY PRODUCT WITH NESTED VARIANTS
// Mirrors the frontend grouping logic (ThankYouClient / TrackPage)
// ============================================================
const groupItemsForPDF = (items) => {
  if (!items || items.length === 0) return [];

  const productGroups = {};

  items.forEach((item) => {
    // Resolve productId
    let productId = item.productId;
    if (productId && typeof productId === 'object' && productId._id) {
      productId = productId._id.toString();
    } else if (productId) {
      productId = productId.toString();
    } else {
      productId = `item-${Math.random()}`;
    }

    const productName = item.productName || item.name || 'Unknown Product';
    const image = item.image || '';
    const unit = item.unit || 'pcs';
    const regularPrice = item.regularPrice || 0;
    const discountPrice = item.discountPrice || 0;

    if (!productGroups[productId]) {
      productGroups[productId] = {
        productId,
        productName,
        image,
        unit,
        regularPrice,
        discountPrice,
        baseRows: [],
        colorRows: [],
        variantRows: [],
        totalQuantity: 0,
        hasVariants: false,
        hasSale: discountPrice > 0 && discountPrice < regularPrice
      };
    }

    const group = productGroups[productId];
    const hasValidColor = item.selectedColor &&
      item.selectedColor !== 'null' &&
      item.selectedColor !== '' &&
      item.selectedColor !== 'undefined';

    // ============================================================
    // CASE 1: NESTED variantDetails[] (from Order schema)
    // ============================================================
    if (item.variantDetails && Array.isArray(item.variantDetails) && item.variantDetails.length > 0) {
      group.hasVariants = true;

      item.variantDetails.forEach((variant) => {
        const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;

        const variantPrice = variant.variantDiscountPrice > 0
          ? Number(variant.variantDiscountPrice)
          : Number(variant.variantRegularPrice) || 0;
        const variantOriginalPrice = Number(variant.variantRegularPrice) || 0;
        const variantHasDiscount = variantPrice > 0 && variantOriginalPrice > variantPrice;

        if (hasSubVariants) {
          const isHeaderOnly = (variant.quantity || 0) === 0;

          group.variantRows.push({
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
            unit: unit,
            isSubVariant: false,
            isVariant: true,
            isHeader: isHeaderOnly
          });

          if (variant.quantity > 0) {
            group.totalQuantity += variant.quantity;
          }

          variant.subVariants.forEach((sub) => {
            const subPrice = sub.subVariantDiscountPrice > 0
              ? Number(sub.subVariantDiscountPrice)
              : Number(sub.subVariantRegularPrice) || 0;
            const subOriginalPrice = Number(sub.subVariantRegularPrice) || 0;
            const subHasDiscount = subPrice > 0 && subOriginalPrice > subPrice;

            group.variantRows.push({
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
              unit: unit,
              isSubVariant: true,
              isVariant: false
            });

            group.totalQuantity += sub.quantity || 0;
          });
        } else {
          group.variantRows.push({
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
            unit: unit,
            isSubVariant: false,
            isVariant: true
          });

          group.totalQuantity += variant.quantity || 0;
        }
      });

      return;
    }

    // ============================================================
    // CASE 2: FLAT VARIANT FIELDS (fallback for older data)
    // ============================================================
    const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
    const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');

    if (isVariant || isSubVariant) {
      group.hasVariants = true;

      const variantPrice = item.variantDiscountPrice > 0
        ? Number(item.variantDiscountPrice)
        : Number(item.variantRegularPrice) > 0
          ? Number(item.variantRegularPrice)
          : Number(item.discountPrice) || Number(item.regularPrice) || 0;

      const originalPrice = Number(item.variantRegularPrice) > 0
        ? Number(item.variantRegularPrice)
        : Number(item.regularPrice) || 0;

      const hasDiscount = originalPrice > 0 && variantPrice > 0 && variantPrice < originalPrice;

      group.variantRows.push({
        type: isSubVariant ? 'subVariant' : 'variant',
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
        unit: unit,
        isSubVariant,
        isVariant: !isSubVariant
      });

      group.totalQuantity += item.quantity || 0;
      return;
    }

    // ============================================================
    // CASE 3: COLOR ITEMS (no variants)
    // ============================================================
    if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
      const validColors = item.colors.filter(c =>
        c && c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined'
      );

      if (validColors.length > 0) {
        validColors.forEach(c => {
          const qty = c.quantity || 0;
          const p = c.price || item.discountPrice || item.regularPrice || 0;

          const existing = group.colorRows.find(gc => gc.color === c.color);
          if (existing) {
            existing.quantity += qty;
          } else {
            group.colorRows.push({
              color: c.color,
              quantity: qty,
              price: p
            });
          }
          group.totalQuantity += qty;
        });
        return;
      }
    }

    if (hasValidColor) {
      const qty = item.quantity || 0;
      const p = item.discountPrice || item.regularPrice || 0;

      const existing = group.colorRows.find(gc => gc.color === item.selectedColor);
      if (existing) {
        existing.quantity += qty;
      } else {
        group.colorRows.push({
          color: item.selectedColor,
          quantity: qty,
          price: p
        });
      }
      group.totalQuantity += qty;
      return;
    }

    // ============================================================
    // CASE 4: BASE (no color, no variant)
    // ============================================================
    group.baseRows.push({
      quantity: item.quantity || 0,
      price: item.discountPrice || item.regularPrice || 0
    });
    group.totalQuantity += item.quantity || 0;
  });

  return Object.values(productGroups);
};

// ============================================================
// ✅ BUILD FLAT ROW LIST FOR A PRODUCT GROUP
// ============================================================
const buildRowsForGroup = (group) => {
  const rows = [];
  const hasVariants = group.variantRows.length > 0;

  // ------------------------------------------------------------
  // CASE A: Product HAS variants
  // ------------------------------------------------------------
  if (hasVariants) {
    let productTotal = 0;
    let productQty = 0;

    group.baseRows.forEach(br => {
      productTotal += br.price * br.quantity;
      productQty += br.quantity;
    });
    group.colorRows.forEach(c => {
      productTotal += c.price * c.quantity;
      productQty += c.quantity;
    });
    group.variantRows.forEach(v => {
      productTotal += v.price * v.quantity;
      productQty += v.quantity;
    });

    rows.push({
      name: group.productName,
      badge: 'Product',
      indent: 0,
      color: null,
      quantity: productQty,
      unit: group.unit,
      price: productQty > 0 ? productTotal / productQty : 0,
      originalPrice: null,
      hasDiscount: false,
      isHeaderOnly: false,
      showPrice: false,
      showTotal: false,
      rowTotal: productTotal,
      isProductHeader: true,
      image: group.image
    });

    // Base rows (rare alongside variants)
    group.baseRows.forEach((br) => {
      rows.push({
        name: group.productName,
        badge: null,
        indent: 1,
        color: null,
        quantity: br.quantity,
        unit: group.unit,
        price: br.price,
        originalPrice: null,
        hasDiscount: false,
        isHeaderOnly: false,
        showPrice: true,
        showTotal: true,
        rowTotal: br.price * br.quantity,
        image: null
      });
    });

    // Color rows (rare alongside variants)
    group.colorRows.forEach((c) => {
      rows.push({
        name: group.productName,
        badge: null,
        indent: 1,
        color: c.color,
        quantity: c.quantity,
        unit: group.unit,
        price: c.price,
        originalPrice: null,
        hasDiscount: false,
        isHeaderOnly: false,
        showPrice: true,
        showTotal: true,
        rowTotal: c.price * c.quantity,
        image: null
      });
    });

    // Group variant rows by variantId
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
          name: isVariantRow ? v.variantName : v.subVariantName,
          badge: null,
          indent: isVariantRow ? 1 : 2,
          color: v.selectedColor,
          quantity: v.quantity,
          unit: v.unit,
          price: v.price,
          originalPrice: v.originalPrice,
          hasDiscount: v.hasDiscount,
          isHeaderOnly,
          showPrice: !isHeaderOnly,
          showTotal: !isHeaderOnly,
          rowTotal: v.price * v.quantity,
          image: null
        });
      });
    });
  }
  // ------------------------------------------------------------
  // CASE B: Product has NO variants
  // ------------------------------------------------------------
  else {
    group.baseRows.forEach((br) => {
      rows.push({
        name: group.productName,
        badge: null,
        indent: 0,
        color: null,
        quantity: br.quantity,
        unit: group.unit,
        price: br.price,
        originalPrice: null,
        hasDiscount: false,
        isHeaderOnly: false,
        showPrice: true,
        showTotal: true,
        rowTotal: br.price * br.quantity,
        image: group.image,
        isFirstOfGroup: rows.length === 0
      });
    });

    group.colorRows.forEach((c) => {
      rows.push({
        name: group.productName,
        badge: null,
        indent: 0,
        color: c.color,
        quantity: c.quantity,
        unit: group.unit,
        price: c.price,
        originalPrice: null,
        hasDiscount: false,
        isHeaderOnly: false,
        showPrice: true,
        showTotal: true,
        rowTotal: c.price * c.quantity,
        image: group.image,
        isFirstOfGroup: rows.length === 0
      });
    });
  }

  return rows;
};

export const generateInvoicePDF = async (order) => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (2 * margin);
    let yPos = margin;

    // ========== FETCH DYNAMIC LOGO FROM NAVBAR ==========
    let companyLogoBase64 = null;

    try {
      const navbarLogo = await fetchNavbarData();
      if (navbarLogo && navbarLogo.logoUrl) {
        const result = await imageToBase64(navbarLogo.logoUrl);
        if (result) {
          companyLogoBase64 = result;
          console.log('✅ Logo loaded from navbar successfully');
        }
      }
    } catch (error) {
      console.warn('Failed to load logo from navbar:', error);
    }

    // ==================== HEADER ====================
    // Deep sage green header bar
    doc.setFillColor(101, 112, 93);   // #65705d
    doc.rect(0, 0, pageWidth, 32, 'F');

    doc.setFillColor(COLORS.white);
    doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'F');

    const logoSize = 18;
    const logoX = margin + 5;
    const logoY = yPos + 4;

    // Logo or initials
    if (companyLogoBase64) {
      try {
        const img = new Image();
        img.src = companyLogoBase64;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        let imgWidth = img.width;
        let imgHeight = img.height;
        let finalWidth = logoSize;
        let finalHeight = logoSize;

        const aspectRatio = imgWidth / imgHeight;

        if (aspectRatio > 1) {
          finalWidth = logoSize;
          finalHeight = logoSize / aspectRatio;
        } else {
          finalHeight = logoSize;
          finalWidth = logoSize * aspectRatio;
        }

        const offsetX = (logoSize - finalWidth) / 2;
        const offsetY = (logoSize - finalHeight) / 2;

        doc.addImage(companyLogoBase64, 'PNG', logoX + offsetX, logoY + offsetY, finalWidth, finalHeight);
        console.log('✅ Logo added to PDF');
      } catch (error) {
        console.error('Error adding logo to PDF:', error);
        const initials = getCompanyInitials('Beauty Bucket');
        doc.setFillColor(101, 112, 93);   // #65705d
        doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.white);
        doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
      }
    } else {
      const initials = getCompanyInitials('Beauty Bucket');
      doc.setFillColor(101, 112, 93);   // #65705d
      doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.white);
      doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
    }

    const companyX = logoX + logoSize + 8;

    // ========== BEAUTY BUCKET COMPANY NAME ==========
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');

    // "Beauty" in deep forest, "Bucket" in sage green
    doc.setTextColor(38, 59, 50);   // #263b32
    doc.text('Beauty', companyX, logoY + 4);

    const beautyWidth = doc.getTextWidth('Beauty');
    doc.setTextColor(101, 112, 93);   // #65705d
    doc.text('Bucket', companyX + beautyWidth, logoY + 4);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textLight);

    doc.setFont('helvetica', 'bold');
    doc.text('Contact: ', companyX, logoY + 9);
    const contactLabelWidth = doc.getTextWidth('Contact: ');
    doc.setFont('helvetica', 'normal');
    doc.text('+8801XXXXXXXXX', companyX + contactLabelWidth, logoY + 9);

    doc.setFontSize(6.5);
    doc.text('info@beautybucket.com', companyX, logoY + 13);

    doc.setFontSize(6);
    const companyAddressLines = doc.splitTextToSize('Mirpur DOHS, Dhaka, Bangladesh', 70);
    doc.text(companyAddressLines, companyX, logoY + 17);

    const rightAlignX = pageWidth - margin - 5;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    const invoiceNoText = `INVOICE NO: `;
    const orderNumber = order.orderNumber || order._id.slice(-8).toUpperCase();
    doc.text(invoiceNoText, rightAlignX - doc.getTextWidth(invoiceNoText + orderNumber), yPos + 8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.text);
    doc.text(orderNumber, rightAlignX, yPos + 8, { align: 'right' });

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textLight);

    const orderDate = formatDate(order.createdAt);
    const status = order.orderStatus?.toUpperCase() || 'PLACED';
    const paymentMethod = order.paymentMethod?.toUpperCase() || 'COD';

    doc.text(`Date: ${orderDate}`, rightAlignX, yPos + 11.5, { align: 'right' });

    let statusColor = COLORS.unpaid;
    if (status === 'DELIVERED') statusColor = COLORS.paid;
    else if (status === 'CANCELLED') statusColor = COLORS.unpaid;
    doc.setTextColor(statusColor);
    doc.text(`Status: ${status}`, rightAlignX, yPos + 15.5, { align: 'right' });
    doc.setTextColor(COLORS.textLight);

    doc.text(`Payment: ${paymentMethod}`, rightAlignX, yPos + 19.5, { align: 'right' });

    // ==================== CUSTOMER & DELIVERY INFO SECTION ====================
    yPos += 34;

    const customerColWidth = (contentWidth / 2) - 3;
    const addressColWidth = (contentWidth / 2) - 3;

    let leftColHeight = 25;
    let rightColHeight = 25;

    const customerInfoLines = [
      `Name: ${order.customerInfo.fullName || 'N/A'}`,
      order.customerInfo.email ? `Email: ${order.customerInfo.email}` : null,
      `Phone: ${order.customerInfo.phone || 'N/A'}`,
      `Address: ${order.customerInfo.address || 'N/A'}`
    ].filter(Boolean);
    leftColHeight = Math.max(leftColHeight, 10 + (customerInfoLines.length * 4.5));

    const deliveryAddressLines = [
      order.customerInfo.area ? `Area/Union: ${order.customerInfo.area}` : null,
      order.customerInfo.zone ? `Upazila/Thana: ${order.customerInfo.zone}` : null,
      order.customerInfo.city ? `District/City: ${order.customerInfo.city}` : null,
      order.customerInfo.division ? `Division: ${order.customerInfo.division}` : null,
    ].filter(Boolean);
    rightColHeight = Math.max(rightColHeight, 10 + (deliveryAddressLines.length * 4.5));

    const colHeight = Math.max(leftColHeight, rightColHeight, 35);

    // Left Column - Customer Info
    // Warm cream background (#FDF7EF)
    doc.setFillColor(253, 247, 239);
    doc.roundedRect(margin, yPos, customerColWidth, colHeight, 2, 2, 'F');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('CUSTOMER INFO', margin + 5, yPos + 5);

    let leftY = yPos + 10;
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);

    doc.setFont('helvetica', 'bold');
    doc.text('Name:', margin + 5, leftY);
    doc.setFont('helvetica', 'normal');
    doc.text(order.customerInfo.fullName || 'N/A', margin + 30, leftY);
    leftY += 4.5;

    if (order.customerInfo.email) {
      doc.setFont('helvetica', 'bold');
      doc.text('Email:', margin + 5, leftY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.email, margin + 30, leftY);
      leftY += 4.5;
    }

    doc.setFont('helvetica', 'bold');
    doc.text('Phone:', margin + 5, leftY);
    doc.setFont('helvetica', 'normal');
    doc.text(order.customerInfo.phone || 'N/A', margin + 30, leftY);
    leftY += 4.5;

    doc.setFont('helvetica', 'bold');
    doc.text('Address:', margin + 5, leftY);
    doc.setFont('helvetica', 'normal');
    const addressValue = order.customerInfo.address || 'N/A';
    const addressLines = doc.splitTextToSize(addressValue, customerColWidth - 35);
    for (let i = 0; i < addressLines.length; i++) {
      const xPos = i === 0 ? margin + 30 : margin + 5 + 5;
      doc.text(addressLines[i], xPos, leftY + (i * 4));
    }

    // Right Column - Delivery Address
    const addressColX = margin + customerColWidth + 6;
    doc.setFillColor(253, 247, 239);   // #FDF7EF
    doc.roundedRect(addressColX, yPos, addressColWidth, colHeight, 2, 2, 'F');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('DELIVERY ADDRESS', addressColX + 5, yPos + 5);

    let rightY = yPos + 10;
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);

    if (order.customerInfo.area) {
      doc.setFont('helvetica', 'bold');
      doc.text('Area/Union:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.area, addressColX + 40, rightY);
      rightY += 4.5;
    }

    if (order.customerInfo.zone) {
      doc.setFont('helvetica', 'bold');
      doc.text('Upazila/Thana:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.zone, addressColX + 40, rightY);
      rightY += 4.5;
    }

    if (order.customerInfo.city) {
      doc.setFont('helvetica', 'bold');
      doc.text('District/City:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.city, addressColX + 40, rightY);
      rightY += 4.5;
    }

    if (order.customerInfo.division) {
      doc.setFont('helvetica', 'bold');
      doc.text('Division:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.division, addressColX + 40, rightY);
      rightY += 4.5;
    }

    yPos += colHeight + 10;

    // ==================== ITEMS TABLE ====================
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.text);
    doc.text('ORDER ITEMS', margin, yPos);
    yPos += 5;

    // ========== COLUMN POSITIONS (no Color column) ==========
    const colPositions = {
      item: margin + 3,
      product: margin + 10,
      unit: margin + contentWidth - 70,
      qty: margin + contentWidth - 55,
      price: margin + contentWidth - 35,
      total: margin + contentWidth - 8
    };

    // Draw table header function (used for page breaks)
    const drawTableHeader = () => {
      // Deep sage green table header
      doc.setFillColor(101, 112, 93);   // #65705d
      doc.rect(margin, yPos, contentWidth, 7, 'F');

      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.white);

      doc.text('#', colPositions.item, yPos + 4.5);
      doc.text('Product', colPositions.product, yPos + 4.5);
      doc.text('Unit', colPositions.unit, yPos + 4.5);
      doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
      doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
      doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });

      yPos += 10;
    };

    drawTableHeader();

    let rowCount = 0;
    let productIndex = 0;

    // ========== GROUP ITEMS BY PRODUCT ==========
    const groupedItems = groupItemsForPDF(order.items || []);

    groupedItems.forEach((group) => {
      productIndex++;
      const groupRows = buildRowsForGroup(group);

      const rowHeight = 7;

      groupRows.forEach((row) => {
        // Page break check
        if (yPos + rowHeight > pageHeight - 55) {
          doc.addPage();
          yPos = margin + 10;
          rowCount = 0;
          drawTableHeader();
        }

        const indent = row.indent || 0;
        const isProductHeader = row.isProductHeader === true;
        const isHeaderOnly = row.isHeaderOnly === true;
        const hidePrice = row.showPrice === false || isHeaderOnly;
        const hideTotal = row.showTotal === false || isHeaderOnly;

        // Row background (alternating) — warm cream #FDF7EF
        if (rowCount % 2 === 0) {
          doc.setFillColor(253, 247, 239);   // #FDF7EF
          doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
        }

        // Indent-based tint (soft sage instead of purple)
        if (indent === 2) {
          doc.setFillColor(240, 243, 236);   // very soft sage tint
          doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
        } else if (indent === 1) {
          doc.setFillColor(247, 249, 244);   // lighter sage tint
          doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
        }

        const textY = yPos + 4;

        // ===== # column =====
        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(COLORS.text);
        if (indent === 0 || isProductHeader) {
          doc.text(productIndex.toString(), colPositions.item, textY);
        }

        // ===== Product / Variant column =====
        let nameX = colPositions.product;
        if (indent === 1) nameX += 4;
        if (indent === 2) nameX += 8;

        // Arrow marker for indent (ASCII only — jsPDF helvetica can't render ▸ / →)
        if (indent > 0) {
          doc.setTextColor(COLORS.textMuted);
          doc.setFontSize(6);
          doc.text(indent === 2 ? '>>' : '>', nameX - 3, textY);
          doc.setTextColor(COLORS.text);
          doc.setFontSize(6.5);
        }

        // Product name (truncated to fit)
        const nameFont = isProductHeader ? 'bold' : 'normal';
        doc.setFont('helvetica', nameFont);
        doc.setTextColor(
          isProductHeader ? COLORS.text :
          indent === 1 ? '#4e5b53' :   // deep sage for variant
          indent === 2 ? '#7a857a' :   // muted sage for sub-variant
          COLORS.text
        );

        // Wider max width now that Color column is gone
        const maxNameWidth = indent === 0 ? 90 : indent === 1 ? 85 : 80;
        let displayName = row.name || '';
        while (doc.getTextWidth(displayName) > maxNameWidth && displayName.length > 3) {
          displayName = displayName.substring(0, displayName.length - 1);
        }
        if (displayName !== (row.name || '')) {
          displayName = displayName.substring(0, displayName.length - 3) + '...';
        }
        doc.text(displayName, nameX, textY);

        // "See variants below" note (only for product header of variant product)
        if (isProductHeader) {
          const nameWidth = doc.getTextWidth(displayName);
          const noteX = nameX + nameWidth + 2;
          doc.setFontSize(5);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(COLORS.textMuted);
          doc.text('', noteX, textY);
          doc.setFontSize(6.5);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(COLORS.text);
        }

        // ===== Unit column =====
        if (!isHeaderOnly) {
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(COLORS.textLight);
          doc.text(row.unit || 'pcs', colPositions.unit, textY);
          doc.setTextColor(COLORS.text);
        }

        // ===== Qty column =====
        if (isHeaderOnly) {
          doc.setTextColor(COLORS.textMuted);
          doc.text('-', colPositions.qty, textY, { align: 'right' });
          doc.setTextColor(COLORS.text);
        } else {
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(COLORS.text);
          doc.text((row.quantity || 0).toString(), colPositions.qty, textY, { align: 'right' });
        }

        // ===== Price column (only discounted price, no strikethrough) =====
        if (hidePrice) {
          doc.setTextColor(COLORS.textMuted);
          doc.text('-', colPositions.price, textY, { align: 'right' });
          doc.setTextColor(COLORS.text);
        } else {
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(COLORS.text);
          doc.text(formatPrice(row.price), colPositions.price, textY, { align: 'right' });
        }

        // ===== Total column =====
        if (hideTotal) {
          doc.setTextColor(COLORS.textMuted);
          doc.text('-', colPositions.total, textY, { align: 'right' });
          doc.setTextColor(COLORS.text);
        } else {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(COLORS.primary);
          doc.text(formatPrice(row.rowTotal), colPositions.total, textY, { align: 'right' });
          doc.setTextColor(COLORS.text);
        }

        yPos += rowHeight;
        rowCount++;
      });
    });

    yPos += 5;

    // ==================== SUMMARY SECTION ====================
    const summaryWidth = 85;
    const summaryX = pageWidth - margin - summaryWidth;

    // Page break if summary wouldn't fit
    if (yPos + 55 > pageHeight - 20) {
      doc.addPage();
      yPos = margin + 10;
    }

    // Warm cream summary box with sage green border
    doc.setFillColor(253, 247, 239);   // #FDF7EF
    doc.setDrawColor(101, 112, 93);    // #65705d
    doc.setLineWidth(0.3);
    doc.roundedRect(summaryX, yPos, summaryWidth, 45, 2, 2, 'FD');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('SUMMARY', summaryX + 3, yPos + 5);

    let summaryY = yPos + 9;
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);

    const subtotal = order.subtotal || 0;
    const shippingCost = order.shippingCost || 0;
    const discount = order.discount || 0;
    const total = order.total || 0;

    doc.text('Subtotal:', summaryX + 3, summaryY);
    doc.text(formatPrice(subtotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
    summaryY += 4.5;

    doc.text('Shipping:', summaryX + 3, summaryY);
    doc.text(formatPrice(shippingCost), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
    summaryY += 4.5;

    if (discount > 0) {
      doc.setTextColor(COLORS.paid);
      doc.text('Discount:', summaryX + 3, summaryY);
      doc.text(`-${formatPrice(discount)}`, summaryX + summaryWidth - 3, summaryY, { align: 'right' });
      doc.setTextColor(COLORS.text);
      summaryY += 4.5;
    }

    doc.setDrawColor(COLORS.primary);
    doc.setLineWidth(0.3);
    doc.line(summaryX + 3, summaryY - 1, summaryX + summaryWidth - 3, summaryY - 1);

    summaryY += 2;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('TOTAL:', summaryX + 3, summaryY);
    doc.text(formatPrice(total), summaryX + summaryWidth - 3, summaryY, { align: 'right' });

    yPos += 55;

    // ==================== ORDER NOTES ====================
    if (order.customerInfo?.note) {
      if (yPos > pageHeight - 35) {
        doc.addPage();
        yPos = margin + 10;
      }

      doc.setDrawColor(COLORS.primary);
      doc.setLineWidth(0.3);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;

      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.primary);
      doc.text('ORDER NOTES:', margin, yPos);

      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLORS.textLight);

      const noteLines = doc.splitTextToSize(order.customerInfo.note, contentWidth);
      doc.text(noteLines, margin, yPos + 4);
      yPos += (noteLines.length * 4) + 10;
    }

    // ==================== FOOTER ====================
    const footerY = pageHeight - 8;

    doc.setDrawColor(COLORS.primary);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textMuted);

    doc.text('Thank you for shopping with Beauty Bucket!', pageWidth / 2, footerY, { align: 'center' });
    doc.text('For any queries, contact us at support@beautybucket.com', pageWidth / 2, footerY + 4, { align: 'center' });

    // ==================== SAVE PDF ====================
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${orderNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true, fileName: `Invoice_${orderNumber}.pdf` };

  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
};