

// // src/app/authorize/navbar-management/page.js
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   Save, 
//   ArrowLeft, 
//   Loader2, 
//   Plus, 
//   X, 
//   Trash2,
//   RefreshCw,
//   GripVertical,
//   MoveUp,
//   MoveDown,
//   Home,
//   Zap,
//   MapPin,
//   Info,
//   Phone,
//   Package,
//   User,
//   Heart,
//   ChevronDown,
//   ChevronUp,
//   CheckCircle,
//   XCircle,
//   Upload,
//   Menu,
//   Search,
//   ShoppingCart,
//   UserCircle,
//   LogOut,
//   LayoutDashboard,
//   ChevronRight,
//   AlignLeft,
//   AlignCenter,
//   AlignRight
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // Icon options for navbar items
// const ICON_OPTIONS = [
//   { value: 'Home', label: 'Home', icon: Home },
//   { value: 'Zap', label: 'Zap', icon: Zap },
//   { value: 'MapPin', label: 'MapPin', icon: MapPin },
//   { value: 'Info', label: 'Info', icon: Info },
//   { value: 'Phone', label: 'Phone', icon: Phone },
//   { value: 'Package', label: 'Package', icon: Package },
//   { value: 'User', label: 'User', icon: User },
//   { value: 'Heart', label: 'Heart', icon: Heart },
 
// ];

// // Role options for navbar items
// const ROLE_OPTIONS = [
//   { value: 'all', label: 'All Users (Public)' },
//   { value: 'authenticated', label: 'Authenticated Users Only' },
//   { value: 'admin', label: 'Admin Only' },
//   { value: 'moderator', label: 'Moderator Only' },
//   { value: 'call_center_agent', label: 'Call Center Agent Only' },
//   { value: 'super_admin', label: 'Super Admin Only' },
// ];

// // Helper function to generate unique ID
// const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// // Default navbar items for Beauty Bucket
// const DEFAULT_ITEMS = [
//   { id: generateId(), name: 'Home', href: '/', icon: 'Home', order: 0, isActive: true, requiredRole: 'all' },
//   { id: generateId(), name: 'Products', href: '/products', icon: 'Package', order: 1, isActive: true, requiredRole: 'all' },
//   { id: generateId(), name: 'Track Order', href: '/track', icon: 'MapPin', order: 2, isActive: true, requiredRole: 'all' },
//   { id: generateId(), name: 'About', href: '/about', icon: 'Info', order: 3, isActive: true, requiredRole: 'all' },
//   { id: generateId(), name: 'Contact', href: '/contact', icon: 'Phone', order: 4, isActive: true, requiredRole: 'all' },
// ];

// // Navbar Item Component
// const NavbarItem = ({ item, index, onUpdate, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div className="bg-white rounded-lg border border-[#F7C7D3]/40 shadow-sm overflow-hidden hover:border-[#73856B]/40 transition-colors">
//       <div className="flex items-center justify-between p-3 bg-white">
//         <div className="flex items-center gap-3 flex-1">
//           <div className="flex-shrink-0 text-[#73856B]">
//             <GripVertical className="w-4 h-4" />
//           </div>
//           <div className="flex items-center gap-2 flex-1">
//             <span className="text-sm font-medium text-[#2D1B2E]">
//               {item.name || 'Unnamed Item'}
//             </span>
//             <span className="text-xs text-[#73856B]">|</span>
//             <span className="text-xs text-[#73856B]/60">{item.href || '/'}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             {item.isActive ? (
//               <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
//                 <CheckCircle className="w-3 h-3" />
//                 Active
//               </span>
//             ) : (
//               <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
//                 <XCircle className="w-3 h-3" />
//                 Inactive
//               </span>
//             )}
//             <span className="text-xs text-[#73856B] bg-[#F7C7D3]/20 px-2 py-0.5 rounded">
//               {ROLE_OPTIONS.find(r => r.value === item.requiredRole)?.label || 'All Users'}
//             </span>
//           </div>
//         </div>
//         <div className="flex items-center gap-1">
//           <button
//             type="button"
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="p-1 text-[#73856B] hover:text-[#73856B] rounded hover:bg-[#F7C7D3]/30 transition-colors"
//           >
//             {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//           </button>
//           <button
//             type="button"
//             onClick={() => onMoveUp(index)}
//             disabled={isFirst}
//             className={`p-1 rounded hover:bg-[#F7C7D3]/30 transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-[#73856B]'}`}
//           >
//             <MoveUp className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => onMoveDown(index)}
//             disabled={isLast}
//             className={`p-1 rounded hover:bg-[#F7C7D3]/30 transition-colors ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-[#73856B]'}`}
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
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div>
//               <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                 Item Name <span className="text-[#73856B]">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={item.name}
//                 onChange={(e) => onUpdate(index, { ...item, name: e.target.value })}
//                 placeholder="e.g., Products"
//                 className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition bg-white hover:border-[#73856B]/30"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                 URL <span className="text-[#73856B]">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={item.href}
//                 onChange={(e) => onUpdate(index, { ...item, href: e.target.value })}
//                 placeholder="e.g., /products"
//                 className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition bg-white hover:border-[#73856B]/30"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div>
//               <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                 Icon
//               </label>
//               <select
//                 value={item.icon || 'Home'}
//                 onChange={(e) => onUpdate(index, { ...item, icon: e.target.value })}
//                 className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition bg-white hover:border-[#73856B]/30"
//               >
//                 {ICON_OPTIONS.map(icon => (
//                   <option key={icon.value} value={icon.value}>
//                     {icon.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 pt-2 border-t border-[#F7C7D3]/30">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={item.isActive}
//                 onChange={(e) => onUpdate(index, { ...item, isActive: e.target.checked })}
//                 className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#73856B] focus:ring-[#73856B]"
//               />
//               <span className="text-sm text-[#2D1B2E]">Active</span>
//             </label>
//             <span className="text-xs text-[#73856B]/60">Order: {item.order || index}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Logo Upload Component
// const LogoUpload = ({ logoUrl, onLogoChange, onLogoRemove }) => {
//   const fileInputRef = useRef(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [preview, setPreview] = useState(logoUrl || '');

//   useEffect(() => {
//     setPreview(logoUrl || '');
//   }, [logoUrl]);

//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
    
//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );
      
//       const data = await response.json();
//       if (data.secure_url) {
//         return {
//           url: data.secure_url,
//           publicId: data.public_id,
//         };
//       } else {
//         throw new Error(data.error?.message || 'Upload failed');
//       }
//     } catch (error) {
//       console.error('Cloudinary upload error:', error);
//       throw error;
//     }
//   };

//   const handleFileSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Invalid format. Allowed: JPG, PNG, WebP');
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File too large. Max: 5MB');
//       return;
//     }

//     setIsUploading(true);
//     try {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setPreview(event.target.result);
//       };
//       reader.readAsDataURL(file);
      
//       const result = await uploadToCloudinary(file);
//       if (result && result.url) {
//         onLogoChange(result.url);
//         toast.success('Logo uploaded successfully!');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
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
//       {preview ? (
//         <div className="relative inline-block">
//           <div className="w-32 h-16 rounded-lg overflow-hidden border-2 border-[#73856B]/30 bg-gray-100 flex items-center justify-center">
//             <img 
//               src={preview} 
//               alt="Logo" 
//               className="max-w-full max-h-full object-contain"
//               style={{ background: 'transparent' }}
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
//             className="flex items-center gap-2 px-4 py-2 bg-[#73856B] text-white rounded-lg hover:bg-[#73856B]/80 transition-colors text-sm disabled:opacity-50"
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
//             accept="image/jpeg,image/jpg,image/png,image/webp"
//             className="hidden"
//             onChange={handleFileSelect}
//             disabled={isUploading}
//           />
//           <span className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</span>
//         </div>
//       )}
//     </div>
//   );
// };

// // Main Navbar Management Component
// export default function NavbarManagement() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [navbarItems, setNavbarItems] = useState(DEFAULT_ITEMS);
//   const [logoData, setLogoData] = useState({
//     text: 'Beauty Bucket',
//     highlightText: '',
//     icon: 'Package',
//     logoUrl: ''
//   });
//   const [isActive, setIsActive] = useState(true);
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
//         fetchNavbarData();
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         router.push('/login');
//       }
//     };
    
//     checkAuthorization();
//   }, [router]);

//   // Fetch navbar data
//   const fetchNavbarData = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('Please login first');
//         router.push('/login');
//         return;
//       }
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar/admin`, {
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
//         toast.error('You do not have permission to manage navbar');
//         router.push('/authorize/dashboard');
//         return;
//       }

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success && data.data) {
//           setNavbarItems(data.data.items || DEFAULT_ITEMS);
//           setLogoData(data.data.logo || {
//             text: 'Beauty Bucket',
//             highlightText: '',
//             icon: 'Package',
//             logoUrl: ''
//           });
//           setIsActive(data.data.isActive !== false);
//           toast.success('Navbar data loaded successfully');
//         } else {
//           toast.error(data.error || 'Failed to load navbar data');
//         }
//       } else {
//         const errorData = await response.json().catch(() => ({}));
//         toast.error(errorData.error || 'Failed to load navbar data');
//         setNavbarItems(DEFAULT_ITEMS);
//       }
//     } catch (error) {
//       console.error('Error fetching navbar data:', error);
//       toast.error('Network error. Please try again.');
//       setNavbarItems(DEFAULT_ITEMS);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Add new item
//   const addItem = () => {
//     const newItem = {
//       id: generateId(),
//       name: 'New Item',
//       href: '/',
//       icon: 'Package',
//       order: navbarItems.length,
//       isActive: true,
//       requiredRole: 'all'
//     };
//     setNavbarItems([...navbarItems, newItem]);
//   };

//   // Update item
//   const updateItem = (index, updatedItem) => {
//     const updatedItems = [...navbarItems];
//     updatedItems[index] = updatedItem;
//     setNavbarItems(updatedItems);
//   };

//   // Remove item
//   const removeItem = (index) => {
//     if (navbarItems.length <= 1) {
//       toast.error('You must have at least one navbar item');
//       return;
//     }
//     const updatedItems = navbarItems.filter((_, i) => i !== index);
//     setNavbarItems(updatedItems);
//   };

//   // Move item up
//   const moveItemUp = (index) => {
//     if (index === 0) return;
//     const updatedItems = [...navbarItems];
//     [updatedItems[index - 1], updatedItems[index]] = [updatedItems[index], updatedItems[index - 1]];
//     updatedItems.forEach((item, idx) => item.order = idx);
//     setNavbarItems(updatedItems);
//   };

//   // Move item down
//   const moveItemDown = (index) => {
//     if (index === navbarItems.length - 1) return;
//     const updatedItems = [...navbarItems];
//     [updatedItems[index + 1], updatedItems[index]] = [updatedItems[index], updatedItems[index + 1]];
//     updatedItems.forEach((item, idx) => item.order = idx);
//     setNavbarItems(updatedItems);
//   };

//   // Reset to default
//   const handleReset = () => {
//     if (confirm('Are you sure you want to reset to default navbar configuration?')) {
//       setNavbarItems(DEFAULT_ITEMS);
//       setLogoData({
//         text: 'Beauty Bucket',
//         highlightText: '',
//         icon: 'Package',
//         logoUrl: ''
//       });
//       setIsActive(true);
//       toast.success('Reset to default configuration');
//     }
//   };

//   // Submit handler
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
      
//       const itemsWithOrder = navbarItems.map((item, index) => ({
//         ...item,
//         order: index
//       }));

//       const submitData = {
//         items: itemsWithOrder,
//         logo: logoData,
//         isActive: isActive
//       };

//       console.log('📤 Submitting navbar data:', submitData);

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar/admin`, {
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
//         toast.error('You do not have permission to update navbar.');
//         setIsSubmitting(false);
//         return;
//       }

//       const responseText = await response.text();
//       console.log('📡 Raw response:', responseText);

//       let data = {};
//       if (responseText) {
//         try {
//           data = JSON.parse(responseText);
//         } catch (parseError) {
//           console.error('Failed to parse response:', parseError);
//         }
//       }

//       if (response.ok && data.success) {
//         toast.success('Navbar updated successfully!');
//         fetchNavbarData();
//       } else {
//         toast.error(data.error || 'Failed to update navbar');
//       }
//     } catch (error) {
//       console.error('Error saving navbar:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
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
//       <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-[#73856B] mx-auto" />
//           <p className="text-gray-500 mt-2">Loading navbar data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="manage_navbar">
//     <div className="min-h-screen bg-white p-4 sm:p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={goBack}
//             className="p-2 text-[#73856B] hover:bg-[#F7C7D3]/30 rounded-lg transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-[#2D1B2E] flex items-center gap-2">
//               <Menu className="w-6 h-6 text-[#73856B]" />
//               Navbar Management
//             </h1>
//             <p className="text-sm text-[#73856B]/60 mt-1">
//               Manage navigation menu - Left: Logo, Center: Menu Items, Right: Actions
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={handleReset}
//             className="flex items-center gap-2 px-4 py-2 text-sm bg-[#73856B]/30 text-[#73856B] rounded-lg hover:bg-[#73856B]/50 transition-colors border border-[#73856B]/20"
//           >
//             <RefreshCw className="w-4 h-4" />
//             Reset
//           </button>
//           <button
//             onClick={fetchNavbarData}
//             className="p-2 text-[#73856B] hover:bg-[#F7C7D3]/30 rounded-lg transition-colors"
//           >
//             <RefreshCw className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Navbar Sections */}
//         <div className="bg-white rounded-xl shadow-sm border border-[#F7C7D3]/40 overflow-hidden">
//           <div className="p-4 bg-white border-b border-[#F7C7D3]/40">
//             <h2 className="text-lg font-semibold text-[#2D1B2E] flex items-center gap-2">
//               <Menu className="w-5 h-5 text-[#73856B]" />
//               Navbar Structure
//               <span className="text-sm font-normal text-[#73856B]/60 ml-2">
//                 Left | Center | Right
//               </span>
//             </h2>
//           </div>

//           <div className="p-4 space-y-4">
//             {/* LEFT - Logo Section */}
//             <div className="border border-[#F7C7D3]/40 rounded-lg p-4">
//               <div className="flex items-center gap-2 mb-3">
//                 <AlignLeft className="w-4 h-4 text-[#73856B]" />
//                 <h3 className="text-sm font-semibold text-[#2D1B2E]">Left Section</h3>
//                 <span className="text-xs text-[#73856B]/60">Logo & Brand</span>
//               </div>
              
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                     Logo Upload
//                   </label>
//                   <LogoUpload
//                     logoUrl={logoData.logoUrl}
//                     onLogoChange={(url) => setLogoData({ ...logoData, logoUrl: url })}
//                     onLogoRemove={() => setLogoData({ ...logoData, logoUrl: '' })}
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                       Brand Name
//                     </label>
//                     <input
//                       type="text"
//                       value={logoData.text}
//                       onChange={(e) => setLogoData({ ...logoData, text: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition bg-white hover:border-[#73856B]/30"
//                       placeholder="e.g., Beauty Bucket"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                       Highlight Text (Optional)
//                     </label>
//                     <input
//                       type="text"
//                       value={logoData.highlightText}
//                       onChange={(e) => setLogoData({ ...logoData, highlightText: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition bg-white hover:border-[#73856B]/30"
//                       placeholder="e.g., Bucket"
//                     />
//                   </div>
//                 </div>

//                 {/* Live Preview */}
//                 <div className="mt-2 p-3 bg-[#FFF5F6] rounded-lg flex items-center border border-[#F7C7D3]/30">
//                   {logoData.logoUrl ? (
//                     <img src={logoData.logoUrl} alt="Logo Preview" className="h-8 w-auto object-contain" />
//                   ) : (
//                     <div className="flex items-center gap-2">
//                       <Package className="w-5 h-5 text-[#73856B]" />
//                       <span className="text-sm font-bold text-[#2D1B2E]">
//                         {logoData.text || 'Beauty'}<span className="text-[#73856B]">{logoData.highlightText || ' Bucket'}</span>
//                       </span>
//                     </div>
//                   )}
//                   <span className="text-xs text-[#73856B]/60 ml-3">Preview</span>
//                 </div>
//               </div>
//             </div>

//             {/* CENTER - Navigation Items */}
//             <div className="border border-[#F7C7D3]/40 rounded-lg p-4">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-2">
//                   <AlignCenter className="w-4 h-4 text-[#73856B]" />
//                   <h3 className="text-sm font-semibold text-[#2D1B2E]">Center Section</h3>
//                   <span className="text-xs text-[#73856B]/60">Navigation Items</span>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={addItem}
//                   className="flex items-center gap-1.5 px-3 py-1.5 bg-[#73856B] text-white rounded-lg hover:bg-[#73856B]/80 transition-colors text-xs font-semibold"
//                 >
//                   <Plus className="w-3.5 h-3.5" />
//                   Add Item
//                 </button>
//               </div>

//               <div className="space-y-2">
//                 {navbarItems.map((item, index) => (
//                   <NavbarItem
//                     key={item.id}
//                     item={item}
//                     index={index}
//                     onUpdate={updateItem}
//                     onRemove={removeItem}
//                     onMoveUp={moveItemUp}
//                     onMoveDown={moveItemDown}
//                     isFirst={index === 0}
//                     isLast={index === navbarItems.length - 1}
//                   />
//                 ))}
//               </div>

//               {navbarItems.length === 0 && (
//                 <div className="text-center py-4 text-[#73856B]/60 text-sm">
//                   No navigation items added. Click "Add Item" to create one.
//                 </div>
//               )}
//             </div>

//             {/* RIGHT - Fixed Actions */}
//             <div className="border border-[#F7C7D3]/40 rounded-lg p-4">
//               <div className="flex items-center gap-2 mb-3">
//                 <AlignRight className="w-4 h-4 text-[#73856B]" />
//                 <h3 className="text-sm font-semibold text-[#2D1B2E]">Right Section</h3>
//                 <span className="text-xs text-[#73856B]/60">Fixed Actions (Always Visible)</span>
//               </div>
              
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 <div className="bg-[#FFF5F6] rounded-lg p-3 border border-[#F7C7D3]/30">
//                   <div className="flex items-center gap-2 text-sm text-[#2D1B2E]">
//                     <Search className="w-4 h-4 text-[#73856B]" />
//                     <span>Search</span>
//                   </div>
//                   <p className="text-xs text-[#73856B]/60 mt-1">Search products</p>
//                 </div>
//                 <div className="bg-[#FFF5F6] rounded-lg p-3 border border-[#F7C7D3]/30">
//                   <div className="flex items-center gap-2 text-sm text-[#2D1B2E]">
//                     <ShoppingCart className="w-4 h-4 text-[#73856B]" />
//                     <span>Cart</span>
//                   </div>
//                   <p className="text-xs text-[#73856B]/60 mt-1">Shopping cart icon with count</p>
//                 </div>
//                 <div className="bg-[#FFF5F6] rounded-lg p-3 border border-[#F7C7D3]/30">
//                   <div className="flex items-center gap-2 text-sm text-[#2D1B2E]">
//                     <UserCircle className="w-4 h-4 text-[#73856B]" />
//                     <span>User Menu</span>
//                   </div>
//                   <p className="text-xs text-[#73856B]/60 mt-1">Sign In / User profile</p>
//                 </div>
//               </div>
//               <p className="text-xs text-[#73856B]/60 mt-3">
//                 These elements are always visible and managed separately. They cannot be edited here.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Status */}
//         <div className="bg-white rounded-xl shadow-sm border border-[#F7C7D3]/40 p-4">
//           <div className="flex items-center gap-3">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={isActive}
//                 onChange={(e) => setIsActive(e.target.checked)}
//                 className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#73856B] focus:ring-[#73856B]"
//               />
//               <span className="text-sm font-medium text-[#2D1B2E]">Navbar Active</span>
//             </label>
//             <span className="text-xs text-[#73856B]/60">
//               {isActive ? 'Visible on website' : 'Hidden from website'}
//             </span>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="flex items-center gap-2 px-6 py-3 bg-[#73856B]  text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#73856B]/25 transition-all duration-300 disabled:opacity-50 text-sm shadow-md"
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 <span>Saving...</span>
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4" />
//                 <span>Save Navbar</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//     </ProtectedRoute>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Plus,
  Trash2,
  GripVertical,
  Save,
  RotateCcw,
  Phone,
  MapPin,
  Truck,
  Palette,
  Store,
  ChevronDown,
  ChevronRight,
  FolderTree,
  Link2,
  Menu,
  Loader2,
  X,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Search,
  ShoppingCart,
  UserCircle,
  ArrowLeft,
  RefreshCw,
  Home,
  Zap,
  Info,
  Package,
  User,
  Heart,
  Sparkles,
  Flower2,
  ShoppingBag,
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================================
// ICON OPTIONS
// ============================================================
const ICON_OPTIONS = [
  { value: 'Home', label: 'Home', icon: Home },
  { value: 'Zap', label: 'Zap', icon: Zap },
  { value: 'MapPin', label: 'MapPin', icon: MapPin },
  { value: 'Info', label: 'Info', icon: Info },
  { value: 'Phone', label: 'Phone', icon: Phone },
  { value: 'Package', label: 'Package', icon: Package },
  { value: 'User', label: 'User', icon: User },
  { value: 'Heart', label: 'Heart', icon: Heart },
  { value: 'Sparkles', label: 'Sparkles', icon: Sparkles },
  { value: 'Flower2', label: 'Flower2', icon: Flower2 },
  { value: 'ShoppingBag', label: 'ShoppingBag', icon: ShoppingBag },
  { value: 'Truck', label: 'Truck', icon: Truck },
  { value: 'Store', label: 'Store', icon: Store },
];

// ============================================================
// LOGO UPLOAD COMPONENT
// ============================================================
const LogoUpload = ({ logoUrl, onLogoChange, onLogoRemove }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(logoUrl || '');

  useEffect(() => {
    setPreview(logoUrl || '');
  }, [logoUrl]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'nishats-collection'
    );

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

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid format. Allowed: JPG, PNG, WebP, SVG');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Max: 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);

      const result = await uploadToCloudinary(file);
      if (result && result.url) {
        onLogoChange(result.url);
        toast.success('Logo uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
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
      {preview ? (
        <div className="relative inline-block">
          <div className="flex h-20 w-40 items-center justify-center overflow-hidden rounded-lg border-2 border-[#8B9D83]/30 bg-gray-50">
            <img
              src={preview}
              alt="Logo"
              className="max-h-full max-w-full object-contain"
              style={{ background: 'transparent' }}
            />
          </div>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 rounded-lg bg-[#8B9D83] px-4 py-2 text-sm text-white transition-colors hover:bg-[#6B7D63] disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
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
          <span className="text-xs text-gray-400">JPG, PNG, WebP, SVG (max 5MB)</span>
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function NavbarManagement() {
  const router = useRouter();
  const [navbar, setNavbar] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  // ============================================================
  // CHECK AUTHORIZATION & FETCH DATA
  // ============================================================
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

        const authorizeRoles = ['admin', 'super_admin', 'moderator'];
        if (!authorizeRoles.includes(parsedUser.role)) {
          toast.error('You do not have permission to access this page');
          router.push('/');
          return;
        }

        setAuthorized(true);
        fetchNavbarData();
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
      }
    };

    checkAuthorization();
  }, [router]);

  // ============================================================
  // FETCH NAVBAR DATA
  // ============================================================
  const fetchNavbarData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Please login first');
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/navbar/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }

      if (response.status === 403) {
        toast.error('You do not have permission to manage navbar');
        router.push('/authorize/dashboard');
        return;
      }

      const data = await response.json();

      if (data.success && data.data) {
        setNavbar(data.data);
        setCategories(data.data.availableCategories || []);
        setIsActive(data.data.isActive !== false);
      } else {
        toast.error(data.error || 'Failed to load navbar data');
      }
    } catch (error) {
      console.error('Error fetching navbar:', error);
      toast.error('Failed to load navbar data');
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SAVE NAVBAR
  // ============================================================
  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');

      // Clean items before sending - remove populated category data
      const cleanItems = (navbar.items || []).map((item) => ({
        id: item.id,
        name: item.name,
        href: item.href || '',
        type: item.type || 'link',
        categoryId: item.categoryId || null,
        subcategoryId: item.subcategoryId || null,
        icon: item.icon || 'Package',
        order: item.order || 0,
        isActive: item.isActive !== false,
        showInMobile: item.showInMobile !== false,
        highlight: item.highlight === true,
        requiredRole: item.requiredRole || 'all',
      }));

      const response = await fetch(`${API_URL}/api/navbar/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cleanItems,
          logo: navbar.logo,
          topBar: navbar.topBar,
          outlet: navbar.outlet,
          isActive: isActive,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Navbar updated successfully!');
        fetchNavbarData();
      } else {
        toast.error(data.error || 'Failed to update navbar');
      }
    } catch (error) {
      console.error('Error saving navbar:', error);
      toast.error('Failed to save navbar');
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // RESET NAVBAR
  // ============================================================
  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset the navbar to default?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/navbar/admin/reset`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setNavbar(data.data);
        setCategories(data.data.availableCategories || []);
        toast.success('Navbar reset to default!');
      }
    } catch (error) {
      console.error('Error resetting navbar:', error);
      toast.error('Failed to reset navbar');
    }
  };

  // ============================================================
  // ADD NAV ITEM
  // ============================================================
  const addNavItem = (type = 'link') => {
    const newItem = {
      id: `id_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: type === 'category' ? 'New Category' : 'New Link',
      href: type === 'category' ? '' : '/new-link',
      type,
      categoryId: null,
      subcategoryId: null,
      icon: 'Package',
      order: navbar.items?.length || 0,
      isActive: true,
      showInMobile: true,
      highlight: false,
      requiredRole: 'all',
    };

    setNavbar((prev) => ({
      ...prev,
      items: [...(prev.items || []), newItem],
    }));
  };

  // ============================================================
  // UPDATE NAV ITEM
  // ============================================================
  const updateNavItem = (index, field, value) => {
    setNavbar((prev) => {
      const newItems = [...prev.items];

      if (field === 'type') {
        if (value === 'category') {
          newItems[index] = {
            ...newItems[index],
            [field]: value,
            href: '',
            categoryId: null,
            category: null,
          };
        } else {
          newItems[index] = {
            ...newItems[index],
            [field]: value,
            categoryId: null,
            category: null,
          };
        }
      } else if (field === 'categoryId') {
        const selectedCategory = categories.find((c) => c._id === value);
        newItems[index] = {
          ...newItems[index],
          [field]: value,
          name: selectedCategory ? selectedCategory.name : newItems[index].name,
          href: selectedCategory ? `/products?category=${selectedCategory.slug}` : '',
          category: selectedCategory || null,
        };
      } else {
        newItems[index] = { ...newItems[index], [field]: value };
      }

      return { ...prev, items: newItems };
    });
  };

  // ============================================================
  // REMOVE NAV ITEM
  // ============================================================
  const removeNavItem = (index) => {
    setNavbar((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // ============================================================
  // GET SELECTED CATEGORY
  // ============================================================
  const getSelectedCategory = (categoryId) => {
    return categories.find((c) => c._id === categoryId);
  };

  // ============================================================
  // GO BACK
  // ============================================================
  const goBack = () => {
    router.push('/authorize/dashboard');
  };

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (!authorized && !loading) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#8B9D83]" />
          <p className="mt-2 text-gray-500">Loading navbar data...</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <ProtectedRoute pageKey="manage_navbar">
      <div className="min-h-screen bg-white p-4 sm:p-6">
        {/* ==================================================
            HEADER
        ================================================== */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={goBack}
              className="rounded-lg p-2 text-[#8B9D83] transition-colors hover:bg-[#F2F5F0]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold text-[#2D1B2E]">
                <Menu className="h-6 w-6 text-[#8B9D83]" />
                Navbar Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage navigation menu - Left: Logo, Center: Menu Items, Right: Actions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-lg border border-[#8B9D83]/20 bg-[#F2F5F0] px-4 py-2 text-sm text-[#8B9D83] transition-colors hover:bg-[#8B9D83]/20"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              onClick={fetchNavbarData}
              className="rounded-lg p-2 text-[#8B9D83] transition-colors hover:bg-[#F2F5F0]"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ==================================================
            LOGO SETTINGS
        ================================================== */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#2D1B2E]">
              <AlignLeft className="h-5 w-5 text-[#8B9D83]" />
              Logo Settings
              <span className="ml-2 text-sm font-normal text-gray-400">
                Left Section - Logo & Brand
              </span>
            </h2>
          </div>

          <div className="space-y-4 p-4">
            {/* Logo Upload */}
            <div>
              <label className="mb-2 block text-xs font-medium text-[#2D1B2E]">
                Logo Image
              </label>
              <LogoUpload
                logoUrl={navbar?.logo?.logoUrl}
                onLogoChange={(url) =>
                  setNavbar((prev) => ({
                    ...prev,
                    logo: { ...prev.logo, logoUrl: url },
                  }))
                }
                onLogoRemove={() =>
                  setNavbar((prev) => ({
                    ...prev,
                    logo: { ...prev.logo, logoUrl: '' },
                  }))
                }
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={navbar?.logo?.text || "Nishat's Collection"}
                  onChange={(e) =>
                    setNavbar((prev) => ({
                      ...prev,
                      logo: { ...prev.logo, text: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                  placeholder="e.g., Nishat's Collection"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Highlight Text (Optional)
                </label>
                <input
                  type="text"
                  value={navbar?.logo?.highlightText || ''}
                  onChange={(e) =>
                    setNavbar((prev) => ({
                      ...prev,
                      logo: { ...prev.logo, highlightText: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                  placeholder="e.g., BEAUTY"
                />
              </div>
            </div>

            {/* Live Preview */}
            <div className="mt-2 flex items-center rounded-lg border border-gray-200 bg-gray-50 p-3">
              {navbar?.logo?.logoUrl ? (
                <img
                  src={navbar.logo.logoUrl}
                  alt="Logo Preview"
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Flower2 className="h-5 w-5 text-[#8B9D83]" />
                  <span className="text-sm font-bold text-[#2D1B2E]">
                    {navbar?.logo?.text || "Nishat's Collection"}
                    {navbar?.logo?.highlightText && (
                      <span className="text-[#8B9D83]">
                        {' '}
                        {navbar.logo.highlightText}
                      </span>
                    )}
                  </span>
                </div>
              )}
              <span className="ml-3 text-xs text-gray-400">Preview</span>
            </div>
          </div>
        </div>

        {/* ==================================================
            TOP BAR SETTINGS
        ================================================== */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#2D1B2E]">
              <Phone className="h-5 w-5 text-[#8B9D83]" />
              Top Bar Settings
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                <Phone className="mr-1 inline h-4 w-4" /> Phone Number
              </label>
              <input
                type="text"
                value={navbar?.topBar?.phone || ''}
                onChange={(e) =>
                  setNavbar((prev) => ({
                    ...prev,
                    topBar: { ...prev.topBar, phone: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                placeholder="+880 1XXXXXXXXX"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone Link
              </label>
              <input
                type="text"
                value={navbar?.topBar?.phoneLink || ''}
                onChange={(e) =>
                  setNavbar((prev) => ({
                    ...prev,
                    topBar: { ...prev.topBar, phoneLink: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                placeholder="/contact"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Track Order Link
              </label>
              <input
                type="text"
                value={navbar?.topBar?.trackOrderLink || ''}
                onChange={(e) =>
                  setNavbar((prev) => ({
                    ...prev,
                    topBar: { ...prev.topBar, trackOrderLink: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                placeholder="/track"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Track Order Text
              </label>
              <input
                type="text"
                value={navbar?.topBar?.trackOrderText || ''}
                onChange={(e) =>
                  setNavbar((prev) => ({
                    ...prev,
                    topBar: { ...prev.topBar, trackOrderText: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                placeholder="Track Order"
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            OUTLET SETTINGS
        ================================================== */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#2D1B2E]">
              <Store className="h-5 w-5 text-[#8B9D83]" />
              Outlet Settings
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Outlet Name
              </label>
              <input
                type="text"
                value={navbar?.outlet?.name || ''}
                onChange={(e) =>
                  setNavbar((prev) => ({
                    ...prev,
                    outlet: { ...prev.outlet, name: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                placeholder="Nishat's Collection Main Outlet"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                value={navbar?.outlet?.address || ''}
                onChange={(e) =>
                  setNavbar((prev) => ({
                    ...prev,
                    outlet: { ...prev.outlet, address: e.target.value },
                  }))
                }
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                placeholder="123 Beauty Street, Gulshan-2, Dhaka 1212, Bangladesh"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                value={navbar?.outlet?.phone || ''}
                onChange={(e) =>
                  setNavbar((prev) => ({
                    ...prev,
                    outlet: { ...prev.outlet, phone: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                placeholder="+880 1712-345678"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                value={navbar?.outlet?.email || ''}
                onChange={(e) =>
                  setNavbar((prev) => ({
                    ...prev,
                    outlet: { ...prev.outlet, email: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                placeholder="hello@nishatscollection.com"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Google Maps Embed URL (iframe src)
              </label>
              <textarea
                value={navbar?.outlet?.googleMapsEmbedUrl || ''}
                onChange={(e) =>
                  setNavbar((prev) => ({
                    ...prev,
                    outlet: { ...prev.outlet, googleMapsEmbedUrl: e.target.value },
                  }))
                }
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
              <p className="mt-1 text-xs text-gray-400">
                Get this from Google Maps → Share → Embed a map → Copy the src URL
              </p>
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Google Maps Link (Open in Maps button)
              </label>
              <input
                type="text"
                value={navbar?.outlet?.googleMapsLink || ''}
                onChange={(e) =>
                  setNavbar((prev) => ({
                    ...prev,
                    outlet: { ...prev.outlet, googleMapsLink: e.target.value },
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                placeholder="https://maps.google.com/?q=..."
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            NAVIGATION ITEMS
        ================================================== */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-[#2D1B2E]">
                <AlignCenter className="h-5 w-5 text-[#8B9D83]" />
                Navigation Items
                <span className="ml-2 text-sm font-normal text-gray-400">
                  Center Section - Menu Items
                </span>
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => addNavItem('link')}
                  className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <Link2 className="h-3 w-3" /> Add Link
                </button>
                <button
                  onClick={() => addNavItem('category')}
                  className="flex items-center gap-1 rounded-lg bg-[#8B9D83] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#6B7D63]"
                >
                  <FolderTree className="h-3 w-3" /> Add Category
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4">
            {(navbar?.items || []).map((item, index) => {
              const selectedCategory = getSelectedCategory(item.categoryId);

              return (
                <div
                  key={item.id || index}
                  className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-[#8B9D83]/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 cursor-grab text-gray-400">
                      <GripVertical className="h-5 w-5" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Name
                          </label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateNavItem(index, 'name', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                          />
                        </div>

                        <div className="w-40">
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Type
                          </label>
                          <select
                            value={item.type || 'link'}
                            onChange={(e) => updateNavItem(index, 'type', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                          >
                            <option value="link">Link</option>
                            <option value="category">Category</option>
                          </select>
                        </div>
                      </div>

                      {item.type === 'category' ? (
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Select Category
                          </label>
                          <select
                            value={item.categoryId || ''}
                            onChange={(e) => updateNavItem(index, 'categoryId', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                          >
                            <option value="">-- Select Category --</option>
                            {categories.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.name}
                                {cat.subcategories?.length > 0
                                  ? ` (${cat.subcategories.length} subcategories)`
                                  : ''}
                              </option>
                            ))}
                          </select>

                          {/* Category Structure Preview */}
                          {selectedCategory && (
                            <div className="mt-2 rounded-lg bg-gray-50 p-3">
                              <p className="mb-1 text-xs font-medium text-gray-500">
                                Category Preview:
                              </p>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                  <FolderTree className="h-3.5 w-3.5 text-[#8B9D83]" />
                                  {selectedCategory.name}
                                </div>
                                {selectedCategory.subcategories?.map((sub) => (
                                  <div key={sub._id} className="ml-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                      <ChevronRight className="h-3 w-3" />
                                      {sub.name}
                                    </div>
                                    {sub.children?.map((child) => (
                                      <div
                                        key={child._id}
                                        className="ml-4 flex items-center gap-2 text-xs text-gray-400"
                                      >
                                        <ChevronRight className="h-2.5 w-2.5" />
                                        {child.name}
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Link (href)
                          </label>
                          <input
                            type="text"
                            value={item.href || ''}
                            onChange={(e) => updateNavItem(index, 'href', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#8B9D83] focus:outline-none"
                            placeholder="/products"
                          />
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-4">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={item.isActive !== false}
                            onChange={(e) => updateNavItem(index, 'isActive', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          Active
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={item.showInMobile !== false}
                            onChange={(e) =>
                              updateNavItem(index, 'showInMobile', e.target.checked)
                            }
                            className="rounded border-gray-300"
                          />
                          Show in Mobile
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={item.highlight === true}
                            onChange={(e) => updateNavItem(index, 'highlight', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          Highlight (Red)
                        </label>
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-500">Order:</label>
                          <input
                            type="number"
                            value={item.order || 0}
                            onChange={(e) =>
                              updateNavItem(index, 'order', parseInt(e.target.value) || 0)
                            }
                            onWheel={(e) => e.target.blur()}
                            className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeNavItem(index)}
                      className="mt-1 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {(!navbar?.items || navbar.items.length === 0) && (
              <div className="py-12 text-center text-gray-500">
                <p>
                  No navigation items yet. Click &quot;Add Link&quot; or &quot;Add
                  Category&quot; to get started.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ==================================================
            RIGHT SECTION - FIXED ACTIONS INFO
        ================================================== */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#2D1B2E]">
              <AlignRight className="h-5 w-5 text-[#8B9D83]" />
              Right Section
              <span className="ml-2 text-sm font-normal text-gray-400">
                Fixed Actions (Always Visible)
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-2 text-sm text-[#2D1B2E]">
                <Search className="h-4 w-4 text-[#8B9D83]" />
                <span>Search</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">Search products</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-2 text-sm text-[#2D1B2E]">
                <ShoppingCart className="h-4 w-4 text-[#8B9D83]" />
                <span>Cart</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">Shopping cart icon with count</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-2 text-sm text-[#2D1B2E]">
                <UserCircle className="h-4 w-4 text-[#8B9D83]" />
                <span>User Menu</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">Sign In / User profile</p>
            </div>
          </div>
          <p className="px-4 pb-4 text-xs text-gray-500">
            These elements are always visible and managed separately. They cannot be edited here.
          </p>
        </div>

        {/* ==================================================
            STATUS
        ================================================== */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#8B9D83] focus:ring-[#8B9D83]"
              />
              <span className="text-sm font-medium text-[#2D1B2E]">Navbar Active</span>
            </label>
            <span className="text-xs text-gray-500">
              {isActive ? 'Visible on website' : 'Hidden from website'}
            </span>
          </div>
        </div>

        {/* ==================================================
            SAVE BUTTON
        ================================================== */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#8B9D83] px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-[#6B7D63] hover:shadow-lg disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Navbar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}