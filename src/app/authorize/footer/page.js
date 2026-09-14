

// // app/authorize/footer-management/page.js
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Save,
//   ArrowLeft,
//   Loader2,
//   Plus,
//   X,
//   Trash2,
//   Eye,
//   RefreshCw,
//   Upload,
//   Globe,
//   Facebook,
//   Instagram,
//   Twitter,
//   Youtube,
//   Linkedin,
//   MapPin,
//   Phone,
//   Mail,
//   Clock,
//   Shield,
//   Truck,
//   BadgeCheck,
//   ChevronDown,
//   ChevronUp,
//   GripVertical,
//   MoveUp,
//   MoveDown,
//   Package,
//   Sparkles,
//   CreditCard,
//   Settings
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ============================================================
// // 1. HELPER FUNCTIONS
// // ============================================================

// // Helper function to generate unique ID
// const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// // ============================================================
// // 1a. IMAGE COMPRESSION FUNCTIONS
// // ============================================================

// // For general images (banners, backgrounds) - JPEG with lossy compression
// const compressImageSmart = async (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
    
//     reader.onload = (event) => {
//       const img = new window.Image();
//       img.src = event.target.result;
      
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;
        
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
//         let quality = 0.4;
//         if (file.size > 5 * 1024 * 1024) quality = 0.25;
//         else if (file.size > 2 * 1024 * 1024) quality = 0.3;
//         else if (file.size > 1 * 1024 * 1024) quality = 0.35;
//         else if (file.size > 500 * 1024) quality = 0.45;
//         else quality = 0.55;
        
//         canvas.toBlob(
//           (blob) => {
//             const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
//               type: 'image/jpeg',
//               lastModified: Date.now(),
//             });
//             resolve(compressedFile);
//           },
//           'image/jpeg',
//           quality
//         );
//       };
//       img.onerror = () => reject(new Error('Failed to load image'));
//     };
//     reader.onerror = () => reject(new Error('Failed to read file'));
//   });
// };

// // ✅ Preserve transparency for logos - PNG format
// const compressImagePreserveTransparency = async (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = (event) => {
//       const img = new window.Image();
//       img.src = event.target.result;

//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;

//         const ctx = canvas.getContext('2d');
//         // ✅ DO NOT fill the canvas background — leave it transparent
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//         // ✅ Keep PNG so alpha channel survives
//         canvas.toBlob(
//           (blob) => {
//             const compressedFile = new File(
//               [blob],
//               file.name.replace(/\.[^/.]+$/, '.png'),
//               { type: 'image/png', lastModified: Date.now() }
//             );
//             resolve(compressedFile);
//           },
//           'image/png' // ✅ PNG is lossless, preserves transparency
//         );
//       };
//       img.onerror = () => reject(new Error('Failed to load image'));
//     };
//     reader.onerror = () => reject(new Error('Failed to read file'));
//   });
// };

// // ============================================================
// // 1b. UPLOAD FUNCTIONS
// // ============================================================

// // For general images (JPEG)
// const uploadToCloudinary = async (file) => {
//   const compressedFile = await compressImageSmart(file);
  
//   const formData = new FormData();
//   formData.append('file', compressedFile);
//   formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
  
//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );
    
//     const data = await response.json();
//     if (data.secure_url) {
//       return {
//         url: data.secure_url,
//         publicId: data.public_id,
//       };
//     } else {
//       throw new Error(data.error?.message || 'Upload failed');
//     }
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

// // ✅ For logos (PNG with transparency preserved)
// const uploadLogoToCloudinary = async (file) => {
//   const compressedFile = await compressImagePreserveTransparency(file);

//   const formData = new FormData();
//   formData.append('file', compressedFile);
//   formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');

//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       { method: 'POST', body: formData }
//     );

//     const data = await response.json();
//     if (data.secure_url) {
//       return { url: data.secure_url, publicId: data.public_id };
//     }
//     throw new Error(data.error?.message || 'Upload failed');
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

// // ============================================================
// // 2. DATA CONFIGURATIONS - SMART GADGET BRANDING
// // ============================================================

// // Social media platform options
// const SOCIAL_PLATFORMS = [
//   { value: 'facebook', label: 'Facebook', icon: Facebook, color: '#1877F2' },
//   { value: 'instagram', label: 'Instagram', icon: Instagram, color: '#E4405F' },
//   { value: 'twitter', label: 'Twitter', icon: Twitter, color: '#1DA1F2' },
//   { value: 'youtube', label: 'YouTube', icon: Youtube, color: '#FF0000' },
//   { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
//   { value: 'whatsapp', label: 'WhatsApp', icon: null, color: '#25D366' },
// ];

// // Trust badge options - Smart Gadget focused
// const TRUST_BADGES = [
//   { value: 'authentic', label: '100% Authentic', icon: BadgeCheck, color: '#3B82F6' },
//   { value: 'warranty', label: 'Official Warranty', icon: Shield, color: '#22C55E' },
//   { value: 'delivery', label: 'Fast Delivery', icon: Truck, color: '#F59E0B' },
//   { value: 'secure', label: 'Secure Payment', icon: Shield, color: '#8B5CF6' },
//   { value: 'trusted', label: 'Trusted Seller', icon: BadgeCheck, color: '#EC4899' },
//   { value: 'return', label: 'Easy Returns', icon: RefreshCw, color: '#3B82F6' },
//   { value: 'support', label: '24/7 Support', icon: Package, color: '#3B82F6' },
// ];

// // Payment method options
// const PAYMENT_METHODS = [
//   { value: 'visa', label: 'Visa' },
//   { value: 'mastercard', label: 'Mastercard' },
//   { value: 'paypal', label: 'PayPal' },
//   { value: 'applepay', label: 'Apple Pay' },
//   { value: 'googlepay', label: 'Google Pay' },
//   { value: 'amex', label: 'American Express' },
//   { value: 'bkash', label: 'bKash' },
//   { value: 'nagad', label: 'Nagad' },
//   { value: 'rocket', label: 'Rocket' },
// ];

// // ============================================================
// // ✅ UPDATED DEFAULT FOOTER - Removed duplicate "Connect With Us" column
// // ============================================================

// const DEFAULT_FOOTER = {
//   company: {
//     name: 'Smart Gadget',
//     tagline: 'Premium Gadgets at Your Fingertips',
//     description: 'Discover the latest technology with premium quality gadgets, expert support, and fast delivery across Bangladesh.',
//     logoUrl: '',
//     address: 'Dhaka, Bangladesh',
//     phone: '+880 1XXXXXXXXX',
//     email: 'support@smartproductbuy.com',
//     hours: 'Always Open • 24/7 Online Ordering • Quick Response',
//   },
//   columns: [
//     {
//       id: generateId(),
//       title: 'Quick Links',
//       type: 'links',
//       items: [
//         { id: generateId(), label: 'Home', url: '/' },
//         { id: generateId(), label: 'Products', url: '/products' },
//         { id: generateId(), label: 'Track Order', url: '/track' },
//         { id: generateId(), label: 'About Us', url: '/about' },
//         { id: generateId(), label: 'Contact', url: '/contact' },
//       ]
//     },
//     {
//       id: generateId(),
//       title: 'Support',
//       type: 'support',
//       items: [
//         { id: generateId(), label: 'Contact Us', url: '/contact' },
//         { id: generateId(), label: 'Terms & Conditions', url: '/terms' },
//         { id: generateId(), label: 'Privacy Policy', url: '/privacy' },
//         { id: generateId(), label: 'Warranty Policy', url: '/warranty' },
//       ],
//       socialLinks: [
//         { platform: 'facebook', url: 'https://facebook.com/smartgadget', active: true },
//         { platform: 'instagram', url: 'https://instagram.com/smartgadget', active: true },
//         { platform: 'youtube', url: 'https://youtube.com/smartgadget', active: true },
//       ]
//     },
//     {
//       id: generateId(),
//       title: 'Contact Us',
//       type: 'contact',
//       items: [
//         { id: generateId(), type: 'address', label: 'Address', value: 'Dhaka, Bangladesh' },
//         { id: generateId(), type: 'phone', label: 'Phone', value: '+880 1XXXXXXXXX' },
//         { id: generateId(), type: 'email', label: 'Email', value: 'support@smartproductbuy.com' },
//         { id: generateId(), type: 'hours', label: 'Hours', value: 'Always Open • 24/7 Online Ordering' },
//       ]
//     }
//     // ❌ REMOVED: The duplicate "Connect With Us" column
//     // Social links are now only in the "Support" column above
//   ],
//   trustBadges: [
//     { type: 'authentic', label: '100% Authentic', active: true },
//     { type: 'warranty', label: 'Official Warranty', active: true },
//     { type: 'delivery', label: 'Fast Delivery', active: true },
//   ],
//   paymentMethods: [
//     { method: 'visa', active: true },
//     { method: 'mastercard', active: true },
//     { method: 'paypal', active: true },
//     { method: 'applepay', active: true },
//   ],
//   footerText: 'All rights reserved.',
//   showCopyright: true,
//   showTrustBadges: true,
//   showPaymentMethods: true,
//   isActive: true,
// };

// // ============================================================
// // 3. REACT COMPONENTS
// // ============================================================

// // ✅ UPDATED: Logo Upload Component with PNG support
// const LogoUpload = ({ logoUrl, onLogoChange, onLogoRemove, label = 'Company Logo' }) => {
//   const fileInputRef = useRef(null);
//   const [error, setError] = useState('');
//   const [isUploading, setIsUploading] = useState(false);
//   const [preview, setPreview] = useState(logoUrl || '');

//   useEffect(() => {
//     setPreview(logoUrl || '');
//   }, [logoUrl]);

//   const validateImage = (file) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
//     if (!allowedTypes.includes(file.type)) {
//       return { valid: false, message: 'Only JPG, PNG, WebP, and SVG formats are allowed.' };
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       return { valid: false, message: 'Image size must be less than 10MB.' };
//     }
//     return { valid: true };
//   };

//   const handleFileSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validation = validateImage(file);
//     if (!validation.valid) {
//       setError(validation.message);
//       toast.error(validation.message);
//       return;
//     }

//     setError('');
//     setIsUploading(true);
    
//     try {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setPreview(event.target.result);
//       };
//       reader.readAsDataURL(file);
      
//       // ✅ Use the logo upload function that preserves transparency
//       const result = await uploadLogoToCloudinary(file);
      
//       if (result && result.url) {
//         onLogoChange(result.url);
//         toast.success('Logo uploaded successfully!');
//       } else {
//         throw new Error('Upload failed');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       setError('Failed to upload image to Cloudinary');
//       toast.error('Failed to upload logo');
//       setPreview('');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleRemove = () => {
//     setPreview('');
//     onLogoRemove();
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">
//         {label} <span className="text-xs text-gray-400">(PNG with transparency recommended)</span>
//       </label>
      
//       {preview ? (
//         <div className="relative inline-block">
//           <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-blue-400/30 bg-white flex items-center justify-center">
//             <img 
//               src={preview} 
//               alt="Logo" 
//               className="w-full h-full object-contain p-1"
//             />
//           </div>
//           {isUploading && (
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
//               <Loader2 className="w-6 h-6 text-white animate-spin" />
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={handleRemove}
//             className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//           >
//             <X className="w-3 h-3" />
//           </button>
//         </div>
//       ) : (
//         <div className="flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             disabled={isUploading}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
//           >
//             {isUploading ? (
//               <Loader2 className="w-4 h-4 animate-spin" />
//             ) : (
//               <Upload className="w-4 h-4" />
//             )}
//             {isUploading ? 'Uploading...' : 'Upload Logo'}
//           </button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
//             className="hidden"
//             onChange={handleFileSelect}
//             disabled={isUploading}
//           />
//           <span className="text-xs text-gray-400">JPG, PNG, WebP, SVG (max 10MB)</span>
//         </div>
//       )}
//       {error && <p className="text-xs text-red-500">{error}</p>}
//       {preview && (
//         <p className="text-xs text-green-600">✅ Transparent PNG preserved</p>
//       )}
//     </div>
//   );
// };

// // Social Links Manager
// const SocialLinksManager = ({ socialLinks, onAdd, onRemove, onToggle, onUpdateUrl }) => {
//   return (
//     <div className="space-y-3">
//       <div className="flex items-center justify-between">
//         <label className="text-xs font-medium text-gray-600">Social Media Links</label>
//         <select
//           onChange={(e) => {
//             if (e.target.value) {
//               onAdd(e.target.value);
//               e.target.value = '';
//             }
//           }}
//           className="px-2 py-1 text-xs border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//         >
//           <option value="">Add Social Platform...</option>
//           {SOCIAL_PLATFORMS.map(platform => (
//             <option key={platform.value} value={platform.value}>
//               {platform.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="space-y-2">
//         {socialLinks.map((link) => {
//           const platformData = SOCIAL_PLATFORMS.find(p => p.value === link.platform);
//           const IconComponent = platformData?.icon;
          
//           return (
//             <div key={link.platform} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
//               <div className="flex-shrink-0">
//                 {IconComponent ? (
//                   <IconComponent className="w-4 h-4" style={{ color: platformData?.color }} />
//                 ) : (
//                   <Globe className="w-4 h-4 text-gray-400" />
//                 )}
//               </div>
//               <span className="text-xs font-medium text-gray-700 w-16">
//                 {platformData?.label || link.platform}
//               </span>
//               <input
//                 type="url"
//                 value={link.url}
//                 onChange={(e) => onUpdateUrl(link.platform, e.target.value)}
//                 placeholder={`https://${link.platform}.com/your-page`}
//                 className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//               <label className="flex items-center gap-1 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={link.active}
//                   onChange={() => onToggle(link.platform)}
//                   className="w-3 h-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="text-[10px] text-gray-500">Active</span>
//               </label>
//               <button
//                 type="button"
//                 onClick={() => onRemove(link.platform)}
//                 className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//               >
//                 <X className="w-3 h-3" />
//               </button>
//             </div>
//           );
//         })}

//         {socialLinks.length === 0 && (
//           <p className="text-xs text-gray-400 text-center py-3">
//             No social links added. Use the dropdown above to add some.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// // Column Item Component
// const ColumnItem = ({ item, index, onUpdate, onRemove, onMoveUp, onMoveDown, isFirst, isLast, type }) => {
//   if (type === 'contact') {
//     const contactTypes = [
//       { value: 'address', label: 'Address', icon: MapPin },
//       { value: 'phone', label: 'Phone', icon: Phone },
//       { value: 'email', label: 'Email', icon: Mail },
//       { value: 'hours', label: 'Hours', icon: Clock },
//     ];

//     return (
//       <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 group hover:border-blue-400/50 transition-colors">
//         <div className="flex-shrink-0 text-gray-400">
//           <GripVertical className="w-4 h-4" />
//         </div>
//         <div className="flex-1 flex items-center gap-2">
//           <select
//             value={item.type}
//             onChange={(e) => onUpdate(index, { ...item, type: e.target.value })}
//             className="px-2 py-1 text-xs border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//           >
//             {contactTypes.map(type => (
//               <option key={type.value} value={type.value}>{type.label}</option>
//             ))}
//           </select>
//           <input
//             type="text"
//             value={item.label}
//             onChange={(e) => onUpdate(index, { ...item, label: e.target.value })}
//             placeholder="Label"
//             className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//           />
//           <input
//             type="text"
//             value={item.value}
//             onChange={(e) => onUpdate(index, { ...item, value: e.target.value })}
//             placeholder="Value"
//             className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//           />
//         </div>
//         <div className="flex items-center gap-1">
//           <button
//             type="button"
//             onClick={() => onMoveUp(index)}
//             disabled={isFirst}
//             className={`p-1 rounded hover:bg-gray-200 transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
//           >
//             <MoveUp className="w-3.5 h-3.5" />
//           </button>
//           <button
//             type="button"
//             onClick={() => onMoveDown(index)}
//             disabled={isLast}
//             className={`p-1 rounded hover:bg-gray-200 transition-colors ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
//           >
//             <MoveDown className="w-3.5 h-3.5" />
//           </button>
//           <button
//             type="button"
//             onClick={() => onRemove(index)}
//             className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//           >
//             <Trash2 className="w-3.5 h-3.5" />
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Links type
//   return (
//     <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 group hover:border-blue-400/50 transition-colors">
//       <div className="flex-shrink-0 text-gray-400">
//         <GripVertical className="w-4 h-4" />
//       </div>
//       <div className="flex-1 flex items-center gap-2">
//         <input
//           type="text"
//           value={item.label}
//           onChange={(e) => onUpdate(index, { ...item, label: e.target.value })}
//           placeholder="Link Label"
//           className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//         />
//         <input
//           type="text"
//           value={item.url}
//           onChange={(e) => onUpdate(index, { ...item, url: e.target.value })}
//           placeholder="/page-url"
//           className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//         />
//       </div>
//       <div className="flex items-center gap-1">
//         <button
//           type="button"
//           onClick={() => onMoveUp(index)}
//           disabled={isFirst}
//           className={`p-1 rounded hover:bg-gray-200 transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
//         >
//           <MoveUp className="w-3.5 h-3.5" />
//         </button>
//         <button
//           type="button"
//           onClick={() => onMoveDown(index)}
//           disabled={isLast}
//           className={`p-1 rounded hover:bg-gray-200 transition-colors ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
//         >
//           <MoveDown className="w-3.5 h-3.5" />
//         </button>
//         <button
//           type="button"
//           onClick={() => onRemove(index)}
//           className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//         >
//           <Trash2 className="w-3.5 h-3.5" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Column Component
// const FooterColumn = ({ column, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
//   const [isExpanded, setIsExpanded] = useState(true);

//   const addItem = () => {
//     const newItem = column.type === 'contact'
//       ? { id: generateId(), type: 'address', label: '', value: '' }
//       : { id: generateId(), label: '', url: '' };
//     const updatedItems = [...column.items, newItem];
//     onUpdate(index, { ...column, items: updatedItems });
//   };

//   const updateItem = (itemIndex, updatedItem) => {
//     const updatedItems = [...column.items];
//     updatedItems[itemIndex] = updatedItem;
//     onUpdate(index, { ...column, items: updatedItems });
//   };

//   const removeItem = (itemIndex) => {
//     const updatedItems = column.items.filter((_, i) => i !== itemIndex);
//     onUpdate(index, { ...column, items: updatedItems });
//   };

//   const moveItemUp = (itemIndex) => {
//     if (itemIndex === 0) return;
//     const updatedItems = [...column.items];
//     [updatedItems[itemIndex - 1], updatedItems[itemIndex]] = [updatedItems[itemIndex], updatedItems[itemIndex - 1]];
//     onUpdate(index, { ...column, items: updatedItems });
//   };

//   const moveItemDown = (itemIndex) => {
//     if (itemIndex === column.items.length - 1) return;
//     const updatedItems = [...column.items];
//     [updatedItems[itemIndex + 1], updatedItems[itemIndex]] = [updatedItems[itemIndex], updatedItems[itemIndex + 1]];
//     onUpdate(index, { ...column, items: updatedItems });
//   };

//   const addSocialLink = (platform) => {
//     if (!column.socialLinks) {
//       column.socialLinks = [];
//     }
//     if (column.socialLinks.some(link => link.platform === platform)) {
//       toast.error(`${platform} is already added`);
//       return;
//     }
//     const updatedColumn = {
//       ...column,
//       socialLinks: [...(column.socialLinks || []), { platform, url: '', active: true }]
//     };
//     onUpdate(index, updatedColumn);
//   };

//   const removeSocialLink = (platform) => {
//     const updatedColumn = {
//       ...column,
//       socialLinks: (column.socialLinks || []).filter(link => link.platform !== platform)
//     };
//     onUpdate(index, updatedColumn);
//   };

//   const toggleSocialLink = (platform) => {
//     const updatedColumn = {
//       ...column,
//       socialLinks: (column.socialLinks || []).map(link =>
//         link.platform === platform
//           ? { ...link, active: !link.active }
//           : link
//       )
//     };
//     onUpdate(index, updatedColumn);
//   };

//   const updateSocialUrl = (platform, url) => {
//     const updatedColumn = {
//       ...column,
//       socialLinks: (column.socialLinks || []).map(link =>
//         link.platform === platform
//           ? { ...link, url }
//           : link
//       )
//     };
//     onUpdate(index, updatedColumn);
//   };

//   const columnTypes = [
//     { value: 'links', label: 'Links' },
//     { value: 'support', label: 'Support + Social' },
//     { value: 'contact', label: 'Contact Info' },
//     { value: 'social', label: 'Social Links Only' },
//     { value: 'custom', label: 'Custom Content' },
//   ];

//   const typeLabel = columnTypes.find(t => t.value === column.type)?.label || column.type;

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//       <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-gray-50 border-b border-gray-200">
//         <div className="flex items-center gap-3">
//           <div className="flex-shrink-0 text-gray-400">
//             <GripVertical className="w-4 h-4" />
//           </div>
//           <input
//             type="text"
//             value={column.title}
//             onChange={(e) => onUpdate(index, { ...column, title: e.target.value })}
//             placeholder="Column Title"
//             className="px-2 py-1 text-sm font-medium border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//           />
//           <span className="text-xs text-gray-400 bg-blue-100/50 px-2 py-0.5 rounded">
//             {typeLabel}
//           </span>
//           <span className="text-xs text-gray-400">
//             {column.items.length} item{column.items.length !== 1 ? 's' : ''}
//           </span>
//         </div>
//         <div className="flex items-center gap-1">
//           <button
//             type="button"
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200 transition-colors"
//           >
//             {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//           </button>
//           <button
//             type="button"
//             onClick={() => onMove(index, 'up')}
//             disabled={isFirst}
//             className={`p-1 rounded hover:bg-gray-200 transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
//           >
//             <MoveUp className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => onMove(index, 'down')}
//             disabled={isLast}
//             className={`p-1 rounded hover:bg-gray-200 transition-colors ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
//           >
//             <MoveDown className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => onRemove(index)}
//             className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {isExpanded && (
//         <div className="p-4 space-y-3">
//           <div className="flex items-center gap-3">
//             <label className="text-xs font-medium text-gray-600">Column Type:</label>
//             <select
//               value={column.type}
//               onChange={(e) => onUpdate(index, { ...column, type: e.target.value })}
//               className="px-2 py-1 text-xs border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             >
//               {columnTypes.map(type => (
//                 <option key={type.value} value={type.value}>{type.label}</option>
//               ))}
//             </select>
//           </div>

//           {column.type === 'links' && (
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <label className="text-xs font-medium text-gray-600">Links</label>
//                 <button
//                   type="button"
//                   onClick={addItem}
//                   className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
//                 >
//                   <Plus className="w-3 h-3" />
//                   Add Link
//                 </button>
//               </div>
//               <div className="space-y-1.5">
//                 {column.items.map((item, idx) => (
//                   <ColumnItem
//                     key={item.id}
//                     item={item}
//                     index={idx}
//                     onUpdate={updateItem}
//                     onRemove={removeItem}
//                     onMoveUp={moveItemUp}
//                     onMoveDown={moveItemDown}
//                     isFirst={idx === 0}
//                     isLast={idx === column.items.length - 1}
//                     type="links"
//                   />
//                 ))}
//                 {column.items.length === 0 && (
//                   <p className="text-xs text-gray-400 text-center py-4">No links added yet</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {column.type === 'support' && (
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <label className="text-xs font-medium text-gray-600">Support Links</label>
//                   <button
//                     type="button"
//                     onClick={addItem}
//                     className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
//                   >
//                     <Plus className="w-3 h-3" />
//                     Add Link
//                   </button>
//                 </div>
//                 <div className="space-y-1.5">
//                   {column.items.map((item, idx) => (
//                     <ColumnItem
//                       key={item.id}
//                       item={item}
//                       index={idx}
//                       onUpdate={updateItem}
//                       onRemove={removeItem}
//                       onMoveUp={moveItemUp}
//                       onMoveDown={moveItemDown}
//                       isFirst={idx === 0}
//                       isLast={idx === column.items.length - 1}
//                       type="links"
//                     />
//                   ))}
//                   {column.items.length === 0 && (
//                     <p className="text-xs text-gray-400 text-center py-2">No support links added yet</p>
//                   )}
//                 </div>
//               </div>

//               <div className="pt-3 border-t border-gray-200">
//                 <h4 className="text-xs font-medium text-gray-700 mb-2">Connect With Us</h4>
//                 <SocialLinksManager
//                   socialLinks={column.socialLinks || []}
//                   onAdd={addSocialLink}
//                   onRemove={removeSocialLink}
//                   onToggle={toggleSocialLink}
//                   onUpdateUrl={updateSocialUrl}
//                 />
//               </div>
//             </div>
//           )}

//           {column.type === 'contact' && (
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <label className="text-xs font-medium text-gray-600">Contact Items</label>
//                 <button
//                   type="button"
//                   onClick={addItem}
//                   className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
//                 >
//                   <Plus className="w-3 h-3" />
//                   Add Contact
//                 </button>
//               </div>
//               <div className="space-y-1.5">
//                 {column.items.map((item, idx) => (
//                   <ColumnItem
//                     key={item.id}
//                     item={item}
//                     index={idx}
//                     onUpdate={updateItem}
//                     onRemove={removeItem}
//                     onMoveUp={moveItemUp}
//                     onMoveDown={moveItemDown}
//                     isFirst={idx === 0}
//                     isLast={idx === column.items.length - 1}
//                     type="contact"
//                   />
//                 ))}
//                 {column.items.length === 0 && (
//                   <p className="text-xs text-gray-400 text-center py-4">No contact items added yet</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {column.type === 'social' && (
//             <div className="space-y-2">
//               <h4 className="text-xs font-medium text-gray-700">Social Media Links</h4>
//               <SocialLinksManager
//                 socialLinks={column.socialLinks || []}
//                 onAdd={addSocialLink}
//                 onRemove={removeSocialLink}
//                 onToggle={toggleSocialLink}
//                 onUpdateUrl={updateSocialUrl}
//               />
//             </div>
//           )}

//           {column.type === 'custom' && (
//             <div className="space-y-2">
//               <label className="text-xs font-medium text-gray-600">Custom Content</label>
//               <textarea
//                 value={column.customContent || ''}
//                 onChange={(e) => onUpdate(index, { ...column, customContent: e.target.value })}
//                 rows={3}
//                 placeholder="Enter custom HTML or content for this column..."
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//               <p className="text-xs text-gray-400">You can use HTML for custom formatting</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============================================================
// // 4. MAIN ADMIN COMPONENT
// // ============================================================

// export default function FooterManagement() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [footerData, setFooterData] = useState(DEFAULT_FOOTER);
//   const [activeTab, setActiveTab] = useState('columns');
//   const [user, setUser] = useState(null);
//   const [authorized, setAuthorized] = useState(false);

//   // Check user role and authorization
//   useEffect(() => {
//     const checkAuthorization = () => {
//       const token = localStorage.getItem('token');
//       const userData = localStorage.getItem('user');
      
//       if (!token || !userData) {
//         toast.error('Please login first');
//         router.push('/login');
//         return;
//       }

//       try {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
        
//         // Check if user has authorize role (admin, super_admin, moderator)
//         const authorizeRoles = ['admin', 'super_admin', 'moderator'];
//         if (!authorizeRoles.includes(parsedUser.role)) {
//           toast.error('You do not have permission to access this page');
//           router.push('/');
//           return;
//         }
        
//         setAuthorized(true);
//         fetchFooterData();
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         router.push('/login');
//       }
//     };
    
//     checkAuthorization();
//   }, [router]);

//   // Fetch footer data
//   const fetchFooterData = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         router.push('/login');
//         return;
//       }
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/footer`, {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.status === 401) {
//         toast.error('Session expired. Please login again.');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         router.push('/login');
//         return;
//       }

//       if (response.status === 403) {
//         toast.error('You do not have permission to manage footer');
//         router.push('/authorize/dashboard');
//         return;
//       }

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success && data.data) {
//           setFooterData(data.data);
//           toast.success('Footer data loaded successfully');
//         } else {
//           toast.error(data.error || 'Failed to load footer data');
//         }
//       } else {
//         const errorData = await response.json().catch(() => ({}));
//         toast.error(errorData.error || 'Failed to load footer data');
//         setFooterData(DEFAULT_FOOTER);
//       }
//     } catch (error) {
//       console.error('Error fetching footer data:', error);
//       toast.error('Network error. Please try again.');
//       setFooterData(DEFAULT_FOOTER);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogoChange = (cloudinaryUrl) => {
//     setFooterData(prev => ({
//       ...prev,
//       company: {
//         ...prev.company,
//         logoUrl: cloudinaryUrl,
//       }
//     }));
//   };

//   const handleLogoRemove = () => {
//     setFooterData(prev => ({
//       ...prev,
//       company: {
//         ...prev.company,
//         logoUrl: '',
//       }
//     }));
//   };

//   // Company Info Handlers
//   const updateCompanyInfo = (field, value) => {
//     setFooterData(prev => ({
//       ...prev,
//       company: {
//         ...prev.company,
//         [field]: value
//       }
//     }));
//   };

//   // Column Handlers
//   const addColumn = () => {
//     const newColumn = {
//       id: generateId(),
//       title: 'New Column',
//       type: 'links',
//       items: []
//     };
//     setFooterData(prev => ({
//       ...prev,
//       columns: [...prev.columns, newColumn]
//     }));
//   };

//   const updateColumn = (index, updatedColumn) => {
//     setFooterData(prev => ({
//       ...prev,
//       columns: prev.columns.map((col, i) => i === index ? updatedColumn : col)
//     }));
//   };

//   const removeColumn = (index) => {
//     if (footerData.columns.length <= 1) {
//       toast.error('You must have at least one column');
//       return;
//     }
//     setFooterData(prev => ({
//       ...prev,
//       columns: prev.columns.filter((_, i) => i !== index)
//     }));
//   };

//   const moveColumn = (index, direction) => {
//     const newIndex = direction === 'up' ? index - 1 : index + 1;
//     if (newIndex < 0 || newIndex >= footerData.columns.length) return;
//     const updatedColumns = [...footerData.columns];
//     [updatedColumns[index], updatedColumns[newIndex]] = [updatedColumns[newIndex], updatedColumns[index]];
//     setFooterData(prev => ({
//       ...prev,
//       columns: updatedColumns
//     }));
//   };

//   // Trust Badges Handlers
//   const toggleTrustBadge = (type) => {
//     setFooterData(prev => ({
//       ...prev,
//       trustBadges: prev.trustBadges.map(badge =>
//         badge.type === type
//           ? { ...badge, active: !badge.active }
//           : badge
//       )
//     }));
//   };

//   const addTrustBadge = (type) => {
//     if (footerData.trustBadges.some(badge => badge.type === type)) {
//       toast.error('This badge is already added');
//       return;
//     }
//     const badgeData = TRUST_BADGES.find(b => b.value === type);
//     setFooterData(prev => ({
//       ...prev,
//       trustBadges: [...prev.trustBadges, { type, label: badgeData?.label || type, active: true }]
//     }));
//   };

//   const removeTrustBadge = (type) => {
//     setFooterData(prev => ({
//       ...prev,
//       trustBadges: prev.trustBadges.filter(badge => badge.type !== type)
//     }));
//   };

//   // Payment Methods Handlers
//   const togglePaymentMethod = (method) => {
//     setFooterData(prev => ({
//       ...prev,
//       paymentMethods: prev.paymentMethods.map(pm =>
//         pm.method === method
//           ? { ...pm, active: !pm.active }
//           : pm
//       )
//     }));
//   };

//   const addPaymentMethod = (method) => {
//     if (footerData.paymentMethods.some(pm => pm.method === method)) {
//       toast.error('This payment method is already added');
//       return;
//     }
//     setFooterData(prev => ({
//       ...prev,
//       paymentMethods: [...prev.paymentMethods, { method, active: true }]
//     }));
//   };

//   const removePaymentMethod = (method) => {
//     setFooterData(prev => ({
//       ...prev,
//       paymentMethods: prev.paymentMethods.filter(pm => pm.method !== method)
//     }));
//   };

//   // Submit Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         setIsSubmitting(false);
//         router.push('/login');
//         return;
//       }
      
//       const submitData = {
//         ...footerData,
//         company: {
//           ...footerData.company,
//         }
//       };

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/footer`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(submitData)
//       });

//       if (response.status === 401) {
//         toast.error('Session expired. Please login again.');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         router.push('/login');
//         setIsSubmitting(false);
//         return;
//       }

//       if (response.status === 403) {
//         toast.error('You do not have permission to update footer.');
//         setIsSubmitting(false);
//         return;
//       }

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Footer updated successfully!');
//         fetchFooterData();
//       } else {
//         toast.error(data.error || 'Failed to update footer');
//       }
//     } catch (error) {
//       console.error('Error saving footer:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Reset to default
//   const handleReset = () => {
//     if (confirm('Are you sure you want to reset to default footer configuration?')) {
//       setFooterData(DEFAULT_FOOTER);
//       toast.success('Reset to default configuration');
//     }
//   };

//   // Go back to dashboard
//   const goBack = () => {
//     router.push('/authorize/dashboard');
//   };

//   // If not authorized, show nothing (will redirect)
//   if (!authorized && !isLoading) {
//     return null;
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
//           <p className="text-gray-500 mt-2">Loading footer data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="manage_footer">
//     <div className="min-h-screen bg-gray-50">
//       {/* Header - Smart Gadget Theme */}
//       <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
//         <div className="px-4 sm:px-6 py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div className="flex items-center gap-2 sm:gap-4">
             
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
//                   <div className="flex items-center gap-2">
//                     <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
//                     <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
//                       Footer Management
//                     </h1>
//                   </div>
//                   <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
//                     Smart Gadget
//                   </span>
//                 </div>
//                 <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">
//                   Customize footer content for Smart Gadget
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
//               <button
//                 onClick={handleReset}
//                 className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Reset
//               </button>
//               <button
//                 onClick={fetchFooterData}
//                 className="p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors hover:text-gray-700"
//                 title="Refresh"
//               >
//                 <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-4 sm:p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Tabs */}
//           <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
//             {[
//               { id: 'columns', label: 'Columns & Content' },
//               { id: 'company', label: 'Company Info' },
//               { id: 'trust', label: 'Trust Badges' },
//               { id: 'payment', label: 'Payment Methods' },
//               { id: 'settings', label: 'Settings' },
//             ].map(tab => (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   activeTab === tab.id
//                     ? 'bg-blue-600 text-white'
//                     : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           <div className="space-y-6">
//             {/* Columns Tab */}
//             {activeTab === 'columns' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <Package className="w-5 h-5 text-blue-600" />
//                       Footer Columns
//                     </h2>
//                     <p className="text-sm text-gray-500">
//                       Manage the columns displayed in the footer. Social links are now only in the "Support" column.
//                     </p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={addColumn}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Column
//                   </button>
//                 </div>

//                 <div className="space-y-3">
//                   {footerData.columns.map((column, index) => (
//                     <FooterColumn
//                       key={column.id}
//                       column={column}
//                       index={index}
//                       onUpdate={updateColumn}
//                       onRemove={removeColumn}
//                       onMove={moveColumn}
//                       isFirst={index === 0}
//                       isLast={index === footerData.columns.length - 1}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Company Info Tab */}
//             {activeTab === 'company' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
//                 <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
//                   <Sparkles className="w-5 h-5 text-blue-600" />
//                   Company Information
//                 </h2>
//                 <div className="space-y-4">
//                   <LogoUpload
//                     logoUrl={footerData.company?.logoUrl}
//                     onLogoChange={handleLogoChange}
//                     onLogoRemove={handleLogoRemove}
//                     label="Company Logo"
//                   />

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Company Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={footerData.company?.name || ''}
//                       onChange={(e) => updateCompanyInfo('name', e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//                       placeholder="e.g., Smart Gadget"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Tagline
//                     </label>
//                     <input
//                       type="text"
//                       value={footerData.company?.tagline || ''}
//                       onChange={(e) => updateCompanyInfo('tagline', e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//                       placeholder="e.g., Premium Gadgets at Your Fingertips"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Description
//                     </label>
//                     <textarea
//                       value={footerData.company?.description || ''}
//                       onChange={(e) => updateCompanyInfo('description', e.target.value)}
//                       rows={3}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400 resize-none"
//                       placeholder="Brief description of your company..."
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Address
//                       </label>
//                       <input
//                         type="text"
//                         value={footerData.company?.address || ''}
//                         onChange={(e) => updateCompanyInfo('address', e.target.value)}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//                         placeholder="e.g., Dhaka, Bangladesh"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Phone
//                       </label>
//                       <input
//                         type="text"
//                         value={footerData.company?.phone || ''}
//                         onChange={(e) => updateCompanyInfo('phone', e.target.value)}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//                         placeholder="e.g., +880 1XXXXXXXXX"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         value={footerData.company?.email || ''}
//                         onChange={(e) => updateCompanyInfo('email', e.target.value)}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//                         placeholder="e.g., support@smartproductbuy.com"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Hours
//                       </label>
//                       <input
//                         type="text"
//                         value={footerData.company?.hours || ''}
//                         onChange={(e) => updateCompanyInfo('hours', e.target.value)}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//                         placeholder="e.g., Always Open • 24/7 Online Ordering"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Trust Badges Tab */}
//             {activeTab === 'trust' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <Shield className="w-5 h-5 text-blue-600" />
//                       Trust Badges
//                     </h2>
//                     <p className="text-sm text-gray-500">Display trust badges to build customer confidence</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <select
//                       onChange={(e) => {
//                         if (e.target.value) {
//                           addTrustBadge(e.target.value);
//                           e.target.value = '';
//                         }
//                       }}
//                       className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white hover:border-gray-400"
//                     >
//                       <option value="">Add Badge...</option>
//                       {TRUST_BADGES.map(badge => (
//                         <option key={badge.value} value={badge.value}>
//                           {badge.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-3">
//                   {footerData.trustBadges.map((badge) => {
//                     const badgeData = TRUST_BADGES.find(b => b.value === badge.type);
//                     const IconComponent = badgeData?.icon;
                    
//                     return (
//                       <div
//                         key={badge.type}
//                         className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
//                           badge.active
//                             ? 'bg-blue-50/50 border-blue-300'
//                             : 'bg-gray-50 border-gray-200 opacity-50'
//                         }`}
//                       >
//                         {IconComponent && (
//                           <IconComponent className="w-4 h-4" style={{ color: badgeData?.color || '#3B82F6' }} />
//                         )}
//                         <span className="text-sm font-medium text-gray-700">
//                           {badge.label}
//                         </span>
//                         <label className="flex items-center gap-2 cursor-pointer ml-2">
//                           <input
//                             type="checkbox"
//                             checked={badge.active}
//                             onChange={() => toggleTrustBadge(badge.type)}
//                             className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                           />
//                         </label>
//                         <button
//                           type="button"
//                           onClick={() => removeTrustBadge(badge.type)}
//                           className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//                         >
//                           <X className="w-3.5 h-3.5" />
//                         </button>
//                       </div>
//                     );
//                   })}

//                   {footerData.trustBadges.length === 0 && (
//                     <p className="text-sm text-gray-400 text-center py-8 w-full">
//                       No trust badges added. Use the dropdown above to add some.
//                     </p>
//                   )}
//                 </div>

//                 <div className="mt-4">
//                   <label className="flex items-center gap-3 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={footerData.showTrustBadges}
//                       onChange={(e) => setFooterData(prev => ({
//                         ...prev,
//                         showTrustBadges: e.target.checked
//                       }))}
//                       className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-sm text-gray-700">Show Trust Badges in Footer</span>
//                   </label>
//                 </div>
//               </div>
//             )}

//             {/* Payment Methods Tab */}
//             {activeTab === 'payment' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <CreditCard className="w-5 h-5 text-blue-600" />
//                       Payment Methods
//                     </h2>
//                     <p className="text-sm text-gray-500">Display accepted payment methods in the footer</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <select
//                       onChange={(e) => {
//                         if (e.target.value) {
//                           addPaymentMethod(e.target.value);
//                           e.target.value = '';
//                         }
//                       }}
//                       className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white hover:border-gray-400"
//                     >
//                       <option value="">Add Payment Method...</option>
//                       {PAYMENT_METHODS.map(method => (
//                         <option key={method.value} value={method.value}>
//                           {method.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-3">
//                   {footerData.paymentMethods.map((pm) => {
//                     const methodData = PAYMENT_METHODS.find(m => m.value === pm.method);
                    
//                     return (
//                       <div
//                         key={pm.method}
//                         className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
//                           pm.active
//                             ? 'bg-gray-50 border-gray-200'
//                             : 'bg-gray-50 border-gray-200 opacity-40'
//                         }`}
//                       >
//                         <span className="text-sm font-medium text-gray-700">
//                           {methodData?.label || pm.method}
//                         </span>
//                         <label className="flex items-center gap-2 cursor-pointer ml-2">
//                           <input
//                             type="checkbox"
//                             checked={pm.active}
//                             onChange={() => togglePaymentMethod(pm.method)}
//                             className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                           />
//                         </label>
//                         <button
//                           type="button"
//                           onClick={() => removePaymentMethod(pm.method)}
//                           className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//                         >
//                           <X className="w-3.5 h-3.5" />
//                         </button>
//                       </div>
//                     );
//                   })}

//                   {footerData.paymentMethods.length === 0 && (
//                     <p className="text-sm text-gray-400 text-center py-8 w-full">
//                       No payment methods added. Use the dropdown above to add some.
//                     </p>
//                   )}
//                 </div>

//                 <div className="mt-4">
//                   <label className="flex items-center gap-3 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={footerData.showPaymentMethods}
//                       onChange={(e) => setFooterData(prev => ({
//                         ...prev,
//                         showPaymentMethods: e.target.checked
//                       }))}
//                       className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-sm text-gray-700">Show Payment Methods in Footer</span>
//                   </label>
//                 </div>
//               </div>
//             )}

//             {/* Settings Tab */}
//             {activeTab === 'settings' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
//                 <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
//                   <Settings className="w-5 h-5 text-blue-600" />
//                   Footer Settings
//                 </h2>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Footer Text
//                     </label>
//                     <input
//                       type="text"
//                       value={footerData.footerText || ''}
//                       onChange={(e) => setFooterData(prev => ({
//                         ...prev,
//                         footerText: e.target.value
//                       }))}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//                       placeholder="All rights reserved."
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={footerData.showCopyright}
//                         onChange={(e) => setFooterData(prev => ({
//                           ...prev,
//                           showCopyright: e.target.checked
//                         }))}
//                         className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                       <span className="text-sm text-gray-700">Show Copyright Text</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end pt-4 border-t border-gray-200">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 text-sm shadow-sm"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   <span>Saving...</span>
//                 </>
//               ) : (
//                 <>
//                   <Save className="w-4 h-4" />
//                   <span>Save Footer</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </ProtectedRoute>
//   );
// }

// app/authorize/footer-management/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Save,
  ArrowLeft,
  Loader2,
  Plus,
  X,
  Trash2,
  Eye,
  RefreshCw,
  Upload,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Truck,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  GripVertical,
  MoveUp,
  MoveDown,
  Package,
  Sparkles,
  CreditCard,
  Settings,
  Image as ImageIcon,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================================
// 1. HELPER FUNCTIONS
// ============================================================

const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// ============================================================
// 1a. IMAGE COMPRESSION FUNCTIONS
// ============================================================

const compressImageSmart = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        let quality = 0.4;
        if (file.size > 5 * 1024 * 1024) quality = 0.25;
        else if (file.size > 2 * 1024 * 1024) quality = 0.3;
        else if (file.size > 1 * 1024 * 1024) quality = 0.35;
        else if (file.size > 500 * 1024) quality = 0.45;
        else quality = 0.55;
        
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
};

const compressImagePreserveTransparency = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, '.png'),
              { type: 'image/png', lastModified: Date.now() }
            );
            resolve(compressedFile);
          },
          'image/png'
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
};

// ============================================================
// 1b. UPLOAD FUNCTIONS
// ============================================================

const uploadToCloudinary = async (file) => {
  const compressedFile = await compressImageSmart(file);
  
  const formData = new FormData();
  formData.append('file', compressedFile);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } else {
      throw new Error(data.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

const uploadLogoToCloudinary = async (file) => {
  const compressedFile = await compressImagePreserveTransparency(file);

  const formData = new FormData();
  formData.append('file', compressedFile);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );

    const data = await response.json();
    if (data.secure_url) {
      return { url: data.secure_url, publicId: data.public_id };
    }
    throw new Error(data.error?.message || 'Upload failed');
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// ============================================================
// 2. IMAGE UPLOAD COMPONENT
// ============================================================

const ImageUpload = ({ imageUrl, onImageChange, onImageRemove, label = 'Image', aspectRatio = '16/9' }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(imageUrl || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setPreview(imageUrl || '');
  }, [imageUrl]);

  const validateImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: 'Only JPG, PNG, and WebP formats are allowed.' };
    }
    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, message: 'Image size must be less than 5MB.' };
    }
    return { valid: true };
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.message);
      toast.error(validation.message);
      return;
    }

    setError('');
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      const result = await uploadToCloudinary(file);
      
      if (result && result.url) {
        onImageChange(result.url);
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image');
      toast.error('Failed to upload image');
      setPreview('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageRemove();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {preview ? (
        <div className="relative inline-block">
          <div className={`rounded-lg overflow-hidden border-2 border-pink-500/30 bg-gray-100`}
               style={{ width: '200px', aspectRatio: aspectRatio }}>
            <img 
              src={preview} 
              alt={label} 
              className="w-full h-full object-cover"
            />
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 px-4 py-2 bg-[#72846A] text-white rounded-lg hover:bg-[#414d3c] transition-colors text-sm disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
            <span className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</span>
          </div>
          {!preview && (
            <div className="text-xs text-gray-400">
              <p>No image uploaded. The footer will use a solid color background.</p>
            </div>
          )}
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

// ============================================================
// 3. LOGO UPLOAD COMPONENT
// ============================================================

const LogoUpload = ({ logoUrl, onLogoChange, onLogoRemove, label = 'Company Logo' }) => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(logoUrl || '');

  useEffect(() => {
    setPreview(logoUrl || '');
  }, [logoUrl]);

  const validateImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: 'Only JPG, PNG, WebP, and SVG formats are allowed.' };
    }
    if (file.size > 10 * 1024 * 1024) {
      return { valid: false, message: 'Image size must be less than 10MB.' };
    }
    return { valid: true };
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.message);
      toast.error(validation.message);
      return;
    }

    setError('');
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      const result = await uploadLogoToCloudinary(file);
      
      if (result && result.url) {
        onLogoChange(result.url);
        toast.success('Logo uploaded successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image');
      toast.error('Failed to upload logo');
      setPreview('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onLogoRemove();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-xs text-gray-400">(PNG with transparency recommended)</span>
      </label>
      
      {preview ? (
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-[#72846A]/30 bg-white flex items-center justify-center">
            <img 
              src={preview} 
              alt="Logo" 
              className="w-full h-full object-contain p-1"
            />
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-[#72846A] text-white rounded-lg hover:bg-[#414d3c] transition-colors text-sm disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {isUploading ? 'Uploading...' : 'Upload Logo'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <span className="text-xs text-gray-400">JPG, PNG, WebP, SVG (max 10MB)</span>
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
      {preview && (
        <p className="text-xs text-green-600">✅ Transparent PNG preserved</p>
      )}
    </div>
  );
};

// ============================================================
// 4. DATA CONFIGURATIONS
// ============================================================

const SOCIAL_PLATFORMS = [
  { value: 'facebook', label: 'Facebook', icon: Facebook, color: '#1877F2' },
  { value: 'instagram', label: 'Instagram', icon: Instagram, color: '#E4405F' },
  { value: 'twitter', label: 'Twitter', icon: Twitter, color: '#1DA1F2' },
  { value: 'youtube', label: 'YouTube', icon: Youtube, color: '#FF0000' },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
  { value: 'whatsapp', label: 'WhatsApp', icon: null, color: '#25D366' },
  { value: 'pinterest', label: 'Pinterest', icon: null, color: '#BD081C' },
  { value: 'tiktok', label: 'TikTok', icon: null, color: '#000000' },
];

const TRUST_BADGES = [
  { value: 'authentic', label: '100% Authentic', icon: BadgeCheck, color: '#3B82F6' },
  { value: 'warranty', label: 'Official Warranty', icon: Shield, color: '#22C55E' },
  { value: 'delivery', label: 'Fast Delivery', icon: Truck, color: '#F59E0B' },
  { value: 'secure', label: 'Secure Payment', icon: Shield, color: '#8B5CF6' },
  { value: 'trusted', label: 'Trusted Seller', icon: BadgeCheck, color: '#EC4899' },
  { value: 'return', label: 'Easy Returns', icon: RefreshCw, color: '#3B82F6' },
  { value: 'support', label: '24/7 Support', icon: Package, color: '#3B82F6' },
];

const PAYMENT_METHODS = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'applepay', label: 'Apple Pay' },
  { value: 'googlepay', label: 'Google Pay' },
  { value: 'amex', label: 'American Express' },
  { value: 'bkash', label: 'bKash' },
  { value: 'nagad', label: 'Nagad' },
  { value: 'rocket', label: 'Rocket' },
];

// ============================================================
// 5. DEFAULT FOOTER DATA
// ============================================================

const DEFAULT_FOOTER = {
  backgroundImage: '',
  backgroundPublicId: '',
  company: {
    name: 'Beauty Bucket',
    tagline: 'Premium Beauty Essentials',
    description: 'Discover premium beauty products with expert care, fast delivery, and a touch of luxury across Bangladesh.',
    address: 'Dhaka, Bangladesh',
    phone: '+880 1XXXXXXXXX',
    email: 'support@beautybucket.com',
    hours: 'Always Open • 24/7 Online Ordering • Quick Response',
    logoUrl: '/images/logo3.png',
    logoPublicId: ''
  },
  columns: [
    {
      id: generateId(),
      title: 'Company',
      type: 'links',
      items: [
        { id: generateId(), label: 'Home', url: '/' },
        { id: generateId(), label: 'Products', url: '/products' },
        { id: generateId(), label: 'Track Order', url: '/track' },
        { id: generateId(), label: 'About Us', url: '/about' },
      ]
    },
    {
      id: generateId(),
      title: 'Support',
      type: 'support',
      items: [
        { id: generateId(), label: 'Contact Us', url: '/contact' },
        { id: generateId(), label: 'Register', url: '/register' },
        { id: generateId(), label: 'Terms & Conditions', url: '/terms' },
        { id: generateId(), label: 'Privacy Policy', url: '/privacy' },
      ],
      socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/beautybucket', active: true },
        { platform: 'instagram', url: 'https://instagram.com/beautybucket', active: true },
        { platform: 'youtube', url: 'https://youtube.com/beautybucket', active: true },
      ]
    },
    {
      id: generateId(),
      title: 'Contact Us',
      type: 'contact',
      items: [
        { id: generateId(), type: 'address', label: 'Address', value: 'Dhaka, Bangladesh' },
        { id: generateId(), type: 'phone', label: 'Phone', value: '+880 1XXXXXXXXX' },
        { id: generateId(), type: 'email', label: 'Email', value: 'support@beautybucket.com' },
        { id: generateId(), type: 'hours', label: 'Hours', value: 'Always Open • 24/7 Online Ordering' },
      ]
    }
  ],
  trustBadges: [
    { type: 'authentic', label: '100% Authentic', active: true },
    { type: 'warranty', label: 'Official Warranty', active: true },
    { type: 'delivery', label: 'Fast Delivery', active: true },
  ],
  paymentMethods: [
    { method: 'visa', active: true },
    { method: 'mastercard', active: true },
    { method: 'bkash', active: true },
    { method: 'nagad', active: true },
  ],
  footerText: 'All rights reserved.',
  showCopyright: true,
  showTrustBadges: true,
  showPaymentMethods: true,
  isActive: true,
};

// ============================================================
// 6. SUB-COMPONENTS
// ============================================================

// Column Item Component
const ColumnItem = ({ item, index, onUpdate, onRemove, onMoveUp, onMoveDown, isFirst, isLast, type }) => {
  if (type === 'contact') {
    const contactTypes = [
      { value: 'address', label: 'Address', icon: MapPin },
      { value: 'phone', label: 'Phone', icon: Phone },
      { value: 'email', label: 'Email', icon: Mail },
      { value: 'hours', label: 'Hours', icon: Clock },
    ];

    return (
      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 group hover:border-pink-400/50 transition-colors">
        <div className="flex-shrink-0 text-gray-400">
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex-1 flex items-center gap-2">
          <select
            value={item.type}
            onChange={(e) => onUpdate(index, { ...item, type: e.target.value })}
            className="px-2 py-1 text-xs border border-gray-300 rounded bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
          >
            {contactTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <input
            type="text"
            value={item.label}
            onChange={(e) => onUpdate(index, { ...item, label: e.target.value })}
            placeholder="Label"
            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
          />
          <input
            type="text"
            value={item.value}
            onChange={(e) => onUpdate(index, { ...item, value: e.target.value })}
            placeholder="Value"
            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMoveUp(index)}
            disabled={isFirst}
            className={`p-1 rounded hover:bg-gray-200 transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
          >
            <MoveUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onMoveDown(index)}
            disabled={isLast}
            className={`p-1 rounded hover:bg-gray-200 transition-colors ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
          >
            <MoveDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Links type
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 group hover:border-pink-400/50 transition-colors">
      <div className="flex-shrink-0 text-gray-400">
        <GripVertical className="w-4 h-4" />
      </div>
      <div className="flex-1 flex items-center gap-2">
        <input
          type="text"
          value={item.label}
          onChange={(e) => onUpdate(index, { ...item, label: e.target.value })}
          placeholder="Link Label"
          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
        />
        <input
          type="text"
          value={item.url}
          onChange={(e) => onUpdate(index, { ...item, url: e.target.value })}
          placeholder="/page-url"
          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
        />
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onMoveUp(index)}
          disabled={isFirst}
          className={`p-1 rounded hover:bg-gray-200 transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
        >
          <MoveUp className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onMoveDown(index)}
          disabled={isLast}
          className={`p-1 rounded hover:bg-gray-200 transition-colors ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
        >
          <MoveDown className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// Social Links Manager
const SocialLinksManager = ({ socialLinks, onAdd, onRemove, onToggle, onUpdateUrl }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-600">Social Media Links</label>
        <select
          onChange={(e) => {
            if (e.target.value) {
              onAdd(e.target.value);
              e.target.value = '';
            }
          }}
          className="px-2 py-1 text-xs border border-gray-300 rounded bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
        >
          <option value="">Add Social Platform...</option>
          {SOCIAL_PLATFORMS.map(platform => (
            <option key={platform.value} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {socialLinks.map((link) => {
          const platformData = SOCIAL_PLATFORMS.find(p => p.value === link.platform);
          const IconComponent = platformData?.icon;
          
          return (
            <div key={link.platform} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-shrink-0">
                {IconComponent ? (
                  <IconComponent className="w-4 h-4" style={{ color: platformData?.color }} />
                ) : (
                  <Globe className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <span className="text-xs font-medium text-gray-700 w-16">
                {platformData?.label || link.platform}
              </span>
              <input
                type="url"
                value={link.url}
                onChange={(e) => onUpdateUrl(link.platform, e.target.value)}
                placeholder={`https://${link.platform}.com/your-page`}
                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              />
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={link.active}
                  onChange={() => onToggle(link.platform)}
                  className="w-3 h-3 rounded border-gray-300 text-[#72846A] focus:ring-pink-500"
                />
                <span className="text-[10px] text-gray-500">Active</span>
              </label>
              <button
                type="button"
                onClick={() => onRemove(link.platform)}
                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        {socialLinks.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-3">
            No social links added. Use the dropdown above to add some.
          </p>
        )}
      </div>
    </div>
  );
};

// Footer Column Component
const FooterColumn = ({ column, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const addItem = () => {
    const newItem = column.type === 'contact'
      ? { id: generateId(), type: 'address', label: '', value: '' }
      : { id: generateId(), label: '', url: '' };
    const updatedItems = [...column.items, newItem];
    onUpdate(index, { ...column, items: updatedItems });
  };

  const updateItem = (itemIndex, updatedItem) => {
    const updatedItems = [...column.items];
    updatedItems[itemIndex] = updatedItem;
    onUpdate(index, { ...column, items: updatedItems });
  };

  const removeItem = (itemIndex) => {
    const updatedItems = column.items.filter((_, i) => i !== itemIndex);
    onUpdate(index, { ...column, items: updatedItems });
  };

  const moveItemUp = (itemIndex) => {
    if (itemIndex === 0) return;
    const updatedItems = [...column.items];
    [updatedItems[itemIndex - 1], updatedItems[itemIndex]] = [updatedItems[itemIndex], updatedItems[itemIndex - 1]];
    onUpdate(index, { ...column, items: updatedItems });
  };

  const moveItemDown = (itemIndex) => {
    if (itemIndex === column.items.length - 1) return;
    const updatedItems = [...column.items];
    [updatedItems[itemIndex + 1], updatedItems[itemIndex]] = [updatedItems[itemIndex], updatedItems[itemIndex + 1]];
    onUpdate(index, { ...column, items: updatedItems });
  };

  const addSocialLink = (platform) => {
    if (!column.socialLinks) {
      column.socialLinks = [];
    }
    if (column.socialLinks.some(link => link.platform === platform)) {
      toast.error(`${platform} is already added`);
      return;
    }
    const updatedColumn = {
      ...column,
      socialLinks: [...(column.socialLinks || []), { platform, url: '', active: true }]
    };
    onUpdate(index, updatedColumn);
  };

  const removeSocialLink = (platform) => {
    const updatedColumn = {
      ...column,
      socialLinks: (column.socialLinks || []).filter(link => link.platform !== platform)
    };
    onUpdate(index, updatedColumn);
  };

  const toggleSocialLink = (platform) => {
    const updatedColumn = {
      ...column,
      socialLinks: (column.socialLinks || []).map(link =>
        link.platform === platform
          ? { ...link, active: !link.active }
          : link
      )
    };
    onUpdate(index, updatedColumn);
  };

  const updateSocialUrl = (platform, url) => {
    const updatedColumn = {
      ...column,
      socialLinks: (column.socialLinks || []).map(link =>
        link.platform === platform
          ? { ...link, url }
          : link
      )
    };
    onUpdate(index, updatedColumn);
  };

  const columnTypes = [
    { value: 'links', label: 'Links' },
    { value: 'support', label: 'Support + Social' },
    { value: 'contact', label: 'Contact Info' },
    { value: 'social', label: 'Social Links Only' },
    { value: 'custom', label: 'Custom Content' },
  ];

  const typeLabel = columnTypes.find(t => t.value === column.type)?.label || column.type;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 text-gray-400">
            <GripVertical className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={column.title}
            onChange={(e) => onUpdate(index, { ...column, title: e.target.value })}
            placeholder="Column Title"
            className="px-2 py-1 text-sm font-medium border border-gray-300 rounded bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
          />
          <span className="text-xs text-gray-400 bg-pink-100/50 px-2 py-0.5 rounded">
            {typeLabel}
          </span>
          <span className="text-xs text-gray-400">
            {column.items.length} item{column.items.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => onMove(index, 'up')}
            disabled={isFirst}
            className={`p-1 rounded hover:bg-gray-200 transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
          >
            <MoveUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onMove(index, 'down')}
            disabled={isLast}
            className={`p-1 rounded hover:bg-gray-200 transition-colors ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
          >
            <MoveDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-gray-600">Column Type:</label>
            <select
              value={column.type}
              onChange={(e) => onUpdate(index, { ...column, type: e.target.value })}
              className="px-2 py-1 text-xs border border-gray-300 rounded bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
            >
              {columnTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {column.type === 'links' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-600">Links</label>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-[#72846A] hover:bg-pink-50 rounded transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add Link
                </button>
              </div>
              <div className="space-y-1.5">
                {column.items.map((item, idx) => (
                  <ColumnItem
                    key={item.id}
                    item={item}
                    index={idx}
                    onUpdate={updateItem}
                    onRemove={removeItem}
                    onMoveUp={moveItemUp}
                    onMoveDown={moveItemDown}
                    isFirst={idx === 0}
                    isLast={idx === column.items.length - 1}
                    type="links"
                  />
                ))}
                {column.items.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">No links added yet</p>
                )}
              </div>
            </div>
          )}

          {column.type === 'support' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-600">Support Links</label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-[#72846A] hover:bg-pink-50 rounded transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Add Link
                  </button>
                </div>
                <div className="space-y-1.5">
                  {column.items.map((item, idx) => (
                    <ColumnItem
                      key={item.id}
                      item={item}
                      index={idx}
                      onUpdate={updateItem}
                      onRemove={removeItem}
                      onMoveUp={moveItemUp}
                      onMoveDown={moveItemDown}
                      isFirst={idx === 0}
                      isLast={idx === column.items.length - 1}
                      type="links"
                    />
                  ))}
                  {column.items.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-2">No support links added yet</p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Connect With Us</h4>
                <SocialLinksManager
                  socialLinks={column.socialLinks || []}
                  onAdd={addSocialLink}
                  onRemove={removeSocialLink}
                  onToggle={toggleSocialLink}
                  onUpdateUrl={updateSocialUrl}
                />
              </div>
            </div>
          )}

          {column.type === 'contact' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-600">Contact Items</label>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-[#72846A] hover:bg-pink-50 rounded transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add Contact
                </button>
              </div>
              <div className="space-y-1.5">
                {column.items.map((item, idx) => (
                  <ColumnItem
                    key={item.id}
                    item={item}
                    index={idx}
                    onUpdate={updateItem}
                    onRemove={removeItem}
                    onMoveUp={moveItemUp}
                    onMoveDown={moveItemDown}
                    isFirst={idx === 0}
                    isLast={idx === column.items.length - 1}
                    type="contact"
                  />
                ))}
                {column.items.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">No contact items added yet</p>
                )}
              </div>
            </div>
          )}

          {column.type === 'social' && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-700">Social Media Links</h4>
              <SocialLinksManager
                socialLinks={column.socialLinks || []}
                onAdd={addSocialLink}
                onRemove={removeSocialLink}
                onToggle={toggleSocialLink}
                onUpdateUrl={updateSocialUrl}
              />
            </div>
          )}

          {column.type === 'custom' && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Custom Content</label>
              <textarea
                value={column.customContent || ''}
                onChange={(e) => onUpdate(index, { ...column, customContent: e.target.value })}
                rows={3}
                placeholder="Enter custom HTML or content for this column..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-400">You can use HTML for custom formatting</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================
// 7. MAIN COMPONENT
// ============================================================

export default function FooterManagement() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [footerData, setFooterData] = useState(DEFAULT_FOOTER);
  const [activeTab, setActiveTab] = useState('appearance');
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  // Check user role
  useEffect(() => {
    const checkAuthorization = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        toast.error('Please login first');
        router.push('/login');
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        const authorizeRoles = ['admin', 'super_admin', 'moderator'];
        if (!authorizeRoles.includes(parsedUser.role)) {
          toast.error('You do not have permission to access this page');
          router.push('/');
          return;
        }
        
        setAuthorized(true);
        fetchFooterData();
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
      }
    };
    
    checkAuthorization();
  }, [router]);

  // Fetch footer data
  const fetchFooterData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        router.push('/login');
        return;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/footer`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }

      if (response.status === 403) {
        toast.error('You do not have permission to manage footer');
        router.push('/authorize/dashboard');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setFooterData(data.data);
          toast.success('Footer data loaded successfully');
        } else {
          toast.error(data.error || 'Failed to load footer data');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to load footer data');
        setFooterData(DEFAULT_FOOTER);
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
      toast.error('Network error. Please try again.');
      setFooterData(DEFAULT_FOOTER);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackgroundChange = (url) => {
    setFooterData(prev => ({
      ...prev,
      backgroundImage: url
    }));
  };

  const handleBackgroundRemove = () => {
    setFooterData(prev => ({
      ...prev,
      backgroundImage: ''
    }));
  };

  const handleLogoChange = (url) => {
    setFooterData(prev => ({
      ...prev,
      company: {
        ...prev.company,
        logoUrl: url
      }
    }));
  };

  const handleLogoRemove = () => {
    setFooterData(prev => ({
      ...prev,
      company: {
        ...prev.company,
        logoUrl: ''
      }
    }));
  };

  // Company Info Handlers
  const updateCompanyInfo = (field, value) => {
    setFooterData(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value
      }
    }));
  };

  // Column Handlers
  const addColumn = () => {
    const newColumn = {
      id: generateId(),
      title: 'New Column',
      type: 'links',
      items: []
    };
    setFooterData(prev => ({
      ...prev,
      columns: [...prev.columns, newColumn]
    }));
  };

  const updateColumn = (index, updatedColumn) => {
    setFooterData(prev => ({
      ...prev,
      columns: prev.columns.map((col, i) => i === index ? updatedColumn : col)
    }));
  };

  const removeColumn = (index) => {
    if (footerData.columns.length <= 1) {
      toast.error('You must have at least one column');
      return;
    }
    setFooterData(prev => ({
      ...prev,
      columns: prev.columns.filter((_, i) => i !== index)
    }));
  };

  const moveColumn = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= footerData.columns.length) return;
    const updatedColumns = [...footerData.columns];
    [updatedColumns[index], updatedColumns[newIndex]] = [updatedColumns[newIndex], updatedColumns[index]];
    setFooterData(prev => ({
      ...prev,
      columns: updatedColumns
    }));
  };

  // Trust Badges Handlers
  const toggleTrustBadge = (type) => {
    setFooterData(prev => ({
      ...prev,
      trustBadges: prev.trustBadges.map(badge =>
        badge.type === type
          ? { ...badge, active: !badge.active }
          : badge
      )
    }));
  };

  const addTrustBadge = (type) => {
    if (footerData.trustBadges.some(badge => badge.type === type)) {
      toast.error('This badge is already added');
      return;
    }
    const badgeData = TRUST_BADGES.find(b => b.value === type);
    setFooterData(prev => ({
      ...prev,
      trustBadges: [...prev.trustBadges, { type, label: badgeData?.label || type, active: true }]
    }));
  };

  const removeTrustBadge = (type) => {
    setFooterData(prev => ({
      ...prev,
      trustBadges: prev.trustBadges.filter(badge => badge.type !== type)
    }));
  };

  // Payment Methods Handlers
  const togglePaymentMethod = (method) => {
    setFooterData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(pm =>
        pm.method === method
          ? { ...pm, active: !pm.active }
          : pm
      )
    }));
  };

  const addPaymentMethod = (method) => {
    if (footerData.paymentMethods.some(pm => pm.method === method)) {
      toast.error('This payment method is already added');
      return;
    }
    setFooterData(prev => ({
      ...prev,
      paymentMethods: [...prev.paymentMethods, { method, active: true }]
    }));
  };

  const removePaymentMethod = (method) => {
    setFooterData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(pm => pm.method !== method)
    }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setIsSubmitting(false);
        router.push('/login');
        return;
      }
      
      const submitData = {
        ...footerData,
        company: {
          ...footerData.company,
        }
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/footer`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (response.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        setIsSubmitting(false);
        return;
      }

      if (response.status === 403) {
        toast.error('You do not have permission to update footer.');
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();

      if (data.success) {
        toast.success('Footer updated successfully!');
        fetchFooterData();
      } else {
        toast.error(data.error || 'Failed to update footer');
      }
    } catch (error) {
      console.error('Error saving footer:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset to default
  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset to default footer configuration?')) return;

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/footer/reset`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setFooterData(data.data);
          toast.success('Footer reset to default');
        }
      } else {
        toast.error('Failed to reset footer');
      }
    } catch (error) {
      console.error('Reset error:', error);
      toast.error('Network error. Please try again.');
    }
  };

  if (!authorized && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#72846A] mx-auto" />
          <p className="text-gray-500 mt-2">Loading footer data...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="manage_footer">
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-pink-200 shadow-sm sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#72846A]" />
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                      Footer Management
                    </h1>
                  </div>
                  <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-pink-100 text-[#414d3c] text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
                    Beauty Bucket
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">
                  Customize footer appearance and content
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={fetchFooterData}
                className="p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors hover:text-gray-700"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-pink-200 pb-2">
            {[
              { id: 'appearance', label: 'Appearance', icon: ImageIcon },
              { id: 'company', label: 'Company Info', icon: Settings },
              { id: 'columns', label: 'Columns', icon: Package },
              { id: 'trust', label: 'Trust Badges', icon: Shield },
              { id: 'payment', label: 'Payment Methods', icon: CreditCard },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#72846A] text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Appearance Tab - With Background Image */}
            {activeTab === 'appearance' && (
              <div className="bg-white rounded-xl shadow-sm border border-pink-200 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-[#72846A]" />
                  Footer Appearance
                </h2>
                <div className="space-y-4">
                  <ImageUpload
                    imageUrl={footerData.backgroundImage || ''}
                    onImageChange={handleBackgroundChange}
                    onImageRemove={handleBackgroundRemove}
                    label="Footer Background Image"
                    aspectRatio="16/9"
                  />
                  <p className="text-xs text-gray-400">This image will appear behind the footer. Recommended size: 1920x1080px</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Footer Text
                    </label>
                    <input
                      type="text"
                      value={footerData.footerText || ''}
                      onChange={(e) => setFooterData(prev => ({
                        ...prev,
                        footerText: e.target.value
                      }))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
                      placeholder="All rights reserved."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={footerData.showCopyright}
                        onChange={(e) => setFooterData(prev => ({
                          ...prev,
                          showCopyright: e.target.checked
                        }))}
                        className="w-4 h-4 rounded border-gray-300 text-[#72846A] focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-700">Show Copyright Text</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={footerData.showTrustBadges}
                        onChange={(e) => setFooterData(prev => ({
                          ...prev,
                          showTrustBadges: e.target.checked
                        }))}
                        className="w-4 h-4 rounded border-gray-300 text-[#72846A] focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-700">Show Trust Badges</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={footerData.showPaymentMethods}
                        onChange={(e) => setFooterData(prev => ({
                          ...prev,
                          showPaymentMethods: e.target.checked
                        }))}
                        className="w-4 h-4 rounded border-gray-300 text-[#72846A] focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-700">Show Payment Methods</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Company Info Tab */}
            {activeTab === 'company' && (
              <div className="bg-white rounded-xl shadow-sm border border-pink-200 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-[#72846A]" />
                  Company Information
                </h2>
                <div className="space-y-4">
                  <LogoUpload
                    logoUrl={footerData.company?.logoUrl}
                    onLogoChange={handleLogoChange}
                    onLogoRemove={handleLogoRemove}
                    label="Company Logo"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={footerData.company?.name || ''}
                      onChange={(e) => updateCompanyInfo('name', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
                      placeholder="e.g., Beauty Bucket"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={footerData.company?.tagline || ''}
                      onChange={(e) => updateCompanyInfo('tagline', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
                      placeholder="e.g., Premium Beauty Essentials"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={footerData.company?.description || ''}
                      onChange={(e) => updateCompanyInfo('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400 resize-none"
                      placeholder="Brief description of your company..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={footerData.company?.address || ''}
                        onChange={(e) => updateCompanyInfo('address', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
                        placeholder="e.g., Dhaka, Bangladesh"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={footerData.company?.phone || ''}
                        onChange={(e) => updateCompanyInfo('phone', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
                        placeholder="e.g., +880 1XXXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={footerData.company?.email || ''}
                        onChange={(e) => updateCompanyInfo('email', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
                        placeholder="e.g., support@beautybucket.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hours
                      </label>
                      <input
                        type="text"
                        value={footerData.company?.hours || ''}
                        onChange={(e) => updateCompanyInfo('hours', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
                        placeholder="e.g., Always Open • 24/7 Online Ordering"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Columns Tab - Fixed with full UI */}
            {activeTab === 'columns' && (
              <div className="bg-white rounded-xl shadow-sm border border-pink-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#72846A]" />
                      Footer Columns
                    </h2>
                    <p className="text-sm text-gray-500">
                      Manage the columns displayed in the footer
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addColumn}
                    className="flex items-center gap-2 px-4 py-2 bg-[#72846A] text-white rounded-lg hover:bg-[#414d3c] transition-colors text-sm font-semibold shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Column
                  </button>
                </div>

                <div className="space-y-3">
                  {footerData.columns.map((column, index) => (
                    <FooterColumn
                      key={column.id}
                      column={column}
                      index={index}
                      onUpdate={updateColumn}
                      onRemove={removeColumn}
                      onMove={moveColumn}
                      isFirst={index === 0}
                      isLast={index === footerData.columns.length - 1}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Trust Badges Tab - Fixed */}
            {activeTab === 'trust' && (
              <div className="bg-white rounded-xl shadow-sm border border-pink-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#72846A]" />
                      Trust Badges
                    </h2>
                    <p className="text-sm text-gray-500">Display trust badges to build customer confidence</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addTrustBadge(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white hover:border-gray-400"
                    >
                      <option value="">Add Badge...</option>
                      {TRUST_BADGES.map(badge => (
                        <option key={badge.value} value={badge.value}>
                          {badge.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {footerData.trustBadges.map((badge) => {
                    const badgeData = TRUST_BADGES.find(b => b.value === badge.type);
                    const IconComponent = badgeData?.icon;
                    
                    return (
                      <div
                        key={badge.type}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                          badge.active
                            ? 'bg-pink-50/50 border-pink-300'
                            : 'bg-gray-50 border-gray-200 opacity-50'
                        }`}
                      >
                        {IconComponent && (
                          <IconComponent className="w-4 h-4" style={{ color: badgeData?.color || '#3B82F6' }} />
                        )}
                        <span className="text-sm font-medium text-gray-700">
                          {badge.label}
                        </span>
                        <label className="flex items-center gap-2 cursor-pointer ml-2">
                          <input
                            type="checkbox"
                            checked={badge.active}
                            onChange={() => toggleTrustBadge(badge.type)}
                            className="w-3.5 h-3.5 rounded border-gray-300 text-[#72846A] focus:ring-pink-500"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => removeTrustBadge(badge.type)}
                          className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}

                  {footerData.trustBadges.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-8 w-full">
                      No trust badges added. Use the dropdown above to add some.
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={footerData.showTrustBadges}
                      onChange={(e) => setFooterData(prev => ({
                        ...prev,
                        showTrustBadges: e.target.checked
                      }))}
                      className="w-4 h-4 rounded border-gray-300 text-[#72846A] focus:ring-pink-500"
                    />
                    <span className="text-sm text-gray-700">Show Trust Badges in Footer</span>
                  </label>
                </div>
              </div>
            )}

            {/* Payment Methods Tab - Fixed */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-xl shadow-sm border border-pink-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#72846A]" />
                      Payment Methods
                    </h2>
                    <p className="text-sm text-gray-500">Display accepted payment methods in the footer</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addPaymentMethod(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white hover:border-gray-400"
                    >
                      <option value="">Add Payment Method...</option>
                      {PAYMENT_METHODS.map(method => (
                        <option key={method.value} value={method.value}>
                          {method.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {footerData.paymentMethods.map((pm) => {
                    const methodData = PAYMENT_METHODS.find(m => m.value === pm.method);
                    
                    return (
                      <div
                        key={pm.method}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                          pm.active
                            ? 'bg-gray-50 border-gray-200'
                            : 'bg-gray-50 border-gray-200 opacity-40'
                        }`}
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {methodData?.label || pm.method}
                        </span>
                        <label className="flex items-center gap-2 cursor-pointer ml-2">
                          <input
                            type="checkbox"
                            checked={pm.active}
                            onChange={() => togglePaymentMethod(pm.method)}
                            className="w-3.5 h-3.5 rounded border-gray-300 text-[#72846A] focus:ring-pink-500"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => removePaymentMethod(pm.method)}
                          className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}

                  {footerData.paymentMethods.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-8 w-full">
                      No payment methods added. Use the dropdown above to add some.
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={footerData.showPaymentMethods}
                      onChange={(e) => setFooterData(prev => ({
                        ...prev,
                        showPaymentMethods: e.target.checked
                      }))}
                      className="w-4 h-4 rounded border-gray-300 text-[#72846A] focus:ring-pink-500"
                    />
                    <span className="text-sm text-gray-700">Show Payment Methods in Footer</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-pink-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-[#72846A] hover:bg-[#414d3c] text-white font-medium rounded-lg transition-colors disabled:opacity-50 text-sm shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Footer</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </ProtectedRoute>
  );
}