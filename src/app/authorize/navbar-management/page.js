
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
//   Sparkles,
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
//   { value: 'Sparkles', label: 'Sparkles', icon: Sparkles },
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
//     <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:border-blue-300 transition-colors">
//       <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-gray-50">
//         <div className="flex items-center gap-3 flex-1">
//           <div className="flex-shrink-0 text-gray-400">
//             <GripVertical className="w-4 h-4" />
//           </div>
//           <div className="flex items-center gap-2 flex-1">
//             <span className="text-sm font-medium text-gray-900">
//               {item.name || 'Unnamed Item'}
//             </span>
//             <span className="text-xs text-gray-400">|</span>
//             <span className="text-xs text-gray-400">{item.href || '/'}</span>
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
//             <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
//               {ROLE_OPTIONS.find(r => r.value === item.requiredRole)?.label || 'All Users'}
//             </span>
//           </div>
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
//             onClick={() => onMoveUp(index)}
//             disabled={isFirst}
//             className={`p-1 rounded hover:bg-gray-200 transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
//           >
//             <MoveUp className="w-4 h-4" />
//           </button>
//           <button
//             type="button"
//             onClick={() => onMoveDown(index)}
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
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Item Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={item.name}
//                 onChange={(e) => onUpdate(index, { ...item, name: e.target.value })}
//                 placeholder="e.g., Products"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 URL <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={item.href}
//                 onChange={(e) => onUpdate(index, { ...item, href: e.target.value })}
//                 placeholder="e.g., /products"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Icon
//               </label>
//               <select
//                 value={item.icon || 'Home'}
//                 onChange={(e) => onUpdate(index, { ...item, icon: e.target.value })}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//               >
//                 {ICON_OPTIONS.map(icon => (
//                   <option key={icon.value} value={icon.value}>
//                     {icon.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {/* <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Access Role
//               </label>
//               <select
//                 value={item.requiredRole || 'all'}
//                 onChange={(e) => onUpdate(index, { ...item, requiredRole: e.target.value })}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//               >
//                 {ROLE_OPTIONS.map(role => (
//                   <option key={role.value} value={role.value}>
//                     {role.label}
//                   </option>
//                 ))}
//               </select>
//             </div> */}
//           </div>

//           <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={item.isActive}
//                 onChange={(e) => onUpdate(index, { ...item, isActive: e.target.checked })}
//                 className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//               />
//               <span className="text-sm text-gray-700">Active</span>
//             </label>
//             <span className="text-xs text-gray-400">Order: {item.order || index}</span>
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
//           <div className="w-32 h-16 rounded-lg overflow-hidden border-2 border-blue-300 bg-gray-100 flex items-center justify-center">
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

//       // Handle 401 Unauthorized
//       if (response.status === 401) {
//         toast.error('Session expired. Please login again.');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         router.push('/login');
//         return;
//       }

//       // Handle 403 Forbidden
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
//         // Set default items if API fails
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

//       // Handle 401 Unauthorized
//       if (response.status === 401) {
//         toast.error('Session expired. Please login again.');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         router.push('/login');
//         setIsSubmitting(false);
//         return;
//       }

//       // Handle 403 Forbidden
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
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
//           <p className="text-gray-500 mt-2">Loading navbar data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="manage_navbar">
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={goBack}
//             className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <Menu className="w-6 h-6 text-blue-600" />
//               Navbar Management
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Manage navigation menu - Left: Logo, Center: Menu Items, Right: Actions
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={handleReset}
//             className="flex items-center gap-2 px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
//           >
//             <RefreshCw className="w-4 h-4" />
//             Reset
//           </button>
//           <button
//             onClick={fetchNavbarData}
//             className="p-2 text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
//           >
//             <RefreshCw className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Navbar Sections */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="p-4 bg-gradient-to-r from-blue-50 to-gray-50 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//               <Menu className="w-5 h-5 text-blue-600" />
//               Navbar Structure
//               <span className="text-sm font-normal text-gray-400 ml-2">
//                 Left | Center | Right
//               </span>
//             </h2>
//           </div>

//           <div className="p-4 space-y-4">
//             {/* LEFT - Logo Section */}
//             <div className="border border-gray-200 rounded-lg p-4">
//               <div className="flex items-center gap-2 mb-3">
//                 <AlignLeft className="w-4 h-4 text-blue-600" />
//                 <h3 className="text-sm font-semibold text-gray-900">Left Section</h3>
//                 <span className="text-xs text-gray-400">Logo & Brand</span>
//               </div>
              
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">
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
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Brand Name
//                     </label>
//                     <input
//                       type="text"
//                       value={logoData.text}
//                       onChange={(e) => setLogoData({ ...logoData, text: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//                       placeholder="e.g., Beauty Bucket"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Highlight Text (Optional)
//                     </label>
//                     <input
//                       type="text"
//                       value={logoData.highlightText}
//                       onChange={(e) => setLogoData({ ...logoData, highlightText: e.target.value })}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white hover:border-gray-400"
//                       placeholder="e.g., Bucket"
//                     />
//                   </div>
//                 </div>

//                 {/* Live Preview */}
//                 <div className="mt-2 p-3 bg-gray-200 rounded-lg flex items-center">
//                   {logoData.logoUrl ? (
//                     <img src={logoData.logoUrl} alt="Logo Preview" className="h-8 w-auto object-contain" />
//                   ) : (
//                     <div className="flex items-center gap-2">
//                       <Package className="w-5 h-5 text-pink-400" />
//                       <span className="text-sm font-bold text-white">
//                         {logoData.text || 'Beauty'}<span className="text-pink-400">{logoData.highlightText || ' Bucket'}</span>
//                       </span>
//                     </div>
//                   )}
//                   <span className="text-xs text-black ml-3">Preview</span>
//                 </div>
//               </div>
//             </div>

//             {/* CENTER - Navigation Items */}
//             <div className="border border-gray-200 rounded-lg p-4">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-2">
//                   <AlignCenter className="w-4 h-4 text-blue-600" />
//                   <h3 className="text-sm font-semibold text-gray-900">Center Section</h3>
//                   <span className="text-xs text-gray-400">Navigation Items</span>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={addItem}
//                   className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold"
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
//                 <div className="text-center py-4 text-gray-400 text-sm">
//                   No navigation items added. Click "Add Item" to create one.
//                 </div>
//               )}
//             </div>

//             {/* RIGHT - Fixed Actions */}
//             <div className="border border-gray-200 rounded-lg p-4">
//               <div className="flex items-center gap-2 mb-3">
//                 <AlignRight className="w-4 h-4 text-blue-600" />
//                 <h3 className="text-sm font-semibold text-gray-900">Right Section</h3>
//                 <span className="text-xs text-gray-400">Fixed Actions (Always Visible)</span>
//               </div>
              
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Search className="w-4 h-4 text-blue-600" />
//                     <span>Search</span>
//                   </div>
//                   <p className="text-xs text-gray-400 mt-1">Search products</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <ShoppingCart className="w-4 h-4 text-blue-600" />
//                     <span>Cart</span>
//                   </div>
//                   <p className="text-xs text-gray-400 mt-1">Shopping cart icon with count</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <UserCircle className="w-4 h-4 text-blue-600" />
//                     <span>User Menu</span>
//                   </div>
//                   <p className="text-xs text-gray-400 mt-1">Sign In / User profile</p>
//                 </div>
//               </div>
//               <p className="text-xs text-gray-400 mt-3">
//                 These elements are always visible and managed separately. They cannot be edited here.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Status */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
//           <div className="flex items-center gap-3">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={isActive}
//                 onChange={(e) => setIsActive(e.target.checked)}
//                 className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//               />
//               <span className="text-sm font-medium text-gray-700">Navbar Active</span>
//             </label>
//             <span className="text-xs text-gray-400">
//               {isActive ? 'Visible on website' : 'Hidden from website'}
//             </span>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-gray-900 text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
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



// src/app/authorize/navbar-management/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  ArrowLeft, 
  Loader2, 
  Plus, 
  X, 
  Trash2,
  RefreshCw,
  GripVertical,
  MoveUp,
  MoveDown,
  Home,
  Zap,
  MapPin,
  Info,
  Phone,
  Package,
  User,
  Heart,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Upload,
  Menu,
  Search,
  ShoppingCart,
  UserCircle,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// Icon options for navbar items
const ICON_OPTIONS = [
  { value: 'Home', label: 'Home', icon: Home },
  { value: 'Zap', label: 'Zap', icon: Zap },
  { value: 'MapPin', label: 'MapPin', icon: MapPin },
  { value: 'Info', label: 'Info', icon: Info },
  { value: 'Phone', label: 'Phone', icon: Phone },
  { value: 'Package', label: 'Package', icon: Package },
  { value: 'User', label: 'User', icon: User },
  { value: 'Heart', label: 'Heart', icon: Heart },
 
];

// Role options for navbar items
const ROLE_OPTIONS = [
  { value: 'all', label: 'All Users (Public)' },
  { value: 'authenticated', label: 'Authenticated Users Only' },
  { value: 'admin', label: 'Admin Only' },
  { value: 'moderator', label: 'Moderator Only' },
  { value: 'call_center_agent', label: 'Call Center Agent Only' },
  { value: 'super_admin', label: 'Super Admin Only' },
];

// Helper function to generate unique ID
const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// Default navbar items for Beauty Bucket
const DEFAULT_ITEMS = [
  { id: generateId(), name: 'Home', href: '/', icon: 'Home', order: 0, isActive: true, requiredRole: 'all' },
  { id: generateId(), name: 'Products', href: '/products', icon: 'Package', order: 1, isActive: true, requiredRole: 'all' },
  { id: generateId(), name: 'Track Order', href: '/track', icon: 'MapPin', order: 2, isActive: true, requiredRole: 'all' },
  { id: generateId(), name: 'About', href: '/about', icon: 'Info', order: 3, isActive: true, requiredRole: 'all' },
  { id: generateId(), name: 'Contact', href: '/contact', icon: 'Phone', order: 4, isActive: true, requiredRole: 'all' },
];

// Navbar Item Component
const NavbarItem = ({ item, index, onUpdate, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-[#F7C7D3]/40 shadow-sm overflow-hidden hover:border-[#73856B]/40 transition-colors">
      <div className="flex items-center justify-between p-3 bg-white">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-shrink-0 text-[#73856B]">
            <GripVertical className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm font-medium text-[#2D1B2E]">
              {item.name || 'Unnamed Item'}
            </span>
            <span className="text-xs text-[#73856B]">|</span>
            <span className="text-xs text-[#73856B]/60">{item.href || '/'}</span>
          </div>
          <div className="flex items-center gap-2">
            {item.isActive ? (
              <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                <CheckCircle className="w-3 h-3" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
                <XCircle className="w-3 h-3" />
                Inactive
              </span>
            )}
            <span className="text-xs text-[#73856B] bg-[#F7C7D3]/20 px-2 py-0.5 rounded">
              {ROLE_OPTIONS.find(r => r.value === item.requiredRole)?.label || 'All Users'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-[#73856B] hover:text-[#73856B] rounded hover:bg-[#F7C7D3]/30 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => onMoveUp(index)}
            disabled={isFirst}
            className={`p-1 rounded hover:bg-[#F7C7D3]/30 transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-[#73856B]'}`}
          >
            <MoveUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onMoveDown(index)}
            disabled={isLast}
            className={`p-1 rounded hover:bg-[#F7C7D3]/30 transition-colors ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-[#73856B]'}`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
                Item Name <span className="text-[#73856B]">*</span>
              </label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => onUpdate(index, { ...item, name: e.target.value })}
                placeholder="e.g., Products"
                className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition bg-white hover:border-[#73856B]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
                URL <span className="text-[#73856B]">*</span>
              </label>
              <input
                type="text"
                value={item.href}
                onChange={(e) => onUpdate(index, { ...item, href: e.target.value })}
                placeholder="e.g., /products"
                className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition bg-white hover:border-[#73856B]/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
                Icon
              </label>
              <select
                value={item.icon || 'Home'}
                onChange={(e) => onUpdate(index, { ...item, icon: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition bg-white hover:border-[#73856B]/30"
              >
                {ICON_OPTIONS.map(icon => (
                  <option key={icon.value} value={icon.value}>
                    {icon.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2 border-t border-[#F7C7D3]/30">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.isActive}
                onChange={(e) => onUpdate(index, { ...item, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#73856B] focus:ring-[#73856B]"
              />
              <span className="text-sm text-[#2D1B2E]">Active</span>
            </label>
            <span className="text-xs text-[#73856B]/60">Order: {item.order || index}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Logo Upload Component
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

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid format. Allowed: JPG, PNG, WebP');
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
          <div className="w-32 h-16 rounded-lg overflow-hidden border-2 border-[#73856B]/30 bg-gray-100 flex items-center justify-center">
            <img 
              src={preview} 
              alt="Logo" 
              className="max-w-full max-h-full object-contain"
              style={{ background: 'transparent' }}
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
            className="flex items-center gap-2 px-4 py-2 bg-[#73856B] text-white rounded-lg hover:bg-[#73856B]/80 transition-colors text-sm disabled:opacity-50"
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
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <span className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</span>
        </div>
      )}
    </div>
  );
};

// Main Navbar Management Component
export default function NavbarManagement() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [navbarItems, setNavbarItems] = useState(DEFAULT_ITEMS);
  const [logoData, setLogoData] = useState({
    text: 'Beauty Bucket',
    highlightText: '',
    icon: 'Package',
    logoUrl: ''
  });
  const [isActive, setIsActive] = useState(true);
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  // Check user role and authorization
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
        
        // Check if user has authorize role (admin, super_admin, moderator)
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

  // Fetch navbar data
  const fetchNavbarData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        router.push('/login');
        return;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar/admin`, {
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
        toast.error('You do not have permission to manage navbar');
        router.push('/authorize/dashboard');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setNavbarItems(data.data.items || DEFAULT_ITEMS);
          setLogoData(data.data.logo || {
            text: 'Beauty Bucket',
            highlightText: '',
            icon: 'Package',
            logoUrl: ''
          });
          setIsActive(data.data.isActive !== false);
          toast.success('Navbar data loaded successfully');
        } else {
          toast.error(data.error || 'Failed to load navbar data');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to load navbar data');
        setNavbarItems(DEFAULT_ITEMS);
      }
    } catch (error) {
      console.error('Error fetching navbar data:', error);
      toast.error('Network error. Please try again.');
      setNavbarItems(DEFAULT_ITEMS);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new item
  const addItem = () => {
    const newItem = {
      id: generateId(),
      name: 'New Item',
      href: '/',
      icon: 'Package',
      order: navbarItems.length,
      isActive: true,
      requiredRole: 'all'
    };
    setNavbarItems([...navbarItems, newItem]);
  };

  // Update item
  const updateItem = (index, updatedItem) => {
    const updatedItems = [...navbarItems];
    updatedItems[index] = updatedItem;
    setNavbarItems(updatedItems);
  };

  // Remove item
  const removeItem = (index) => {
    if (navbarItems.length <= 1) {
      toast.error('You must have at least one navbar item');
      return;
    }
    const updatedItems = navbarItems.filter((_, i) => i !== index);
    setNavbarItems(updatedItems);
  };

  // Move item up
  const moveItemUp = (index) => {
    if (index === 0) return;
    const updatedItems = [...navbarItems];
    [updatedItems[index - 1], updatedItems[index]] = [updatedItems[index], updatedItems[index - 1]];
    updatedItems.forEach((item, idx) => item.order = idx);
    setNavbarItems(updatedItems);
  };

  // Move item down
  const moveItemDown = (index) => {
    if (index === navbarItems.length - 1) return;
    const updatedItems = [...navbarItems];
    [updatedItems[index + 1], updatedItems[index]] = [updatedItems[index], updatedItems[index + 1]];
    updatedItems.forEach((item, idx) => item.order = idx);
    setNavbarItems(updatedItems);
  };

  // Reset to default
  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default navbar configuration?')) {
      setNavbarItems(DEFAULT_ITEMS);
      setLogoData({
        text: 'Beauty Bucket',
        highlightText: '',
        icon: 'Package',
        logoUrl: ''
      });
      setIsActive(true);
      toast.success('Reset to default configuration');
    }
  };

  // Submit handler
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
      
      const itemsWithOrder = navbarItems.map((item, index) => ({
        ...item,
        order: index
      }));

      const submitData = {
        items: itemsWithOrder,
        logo: logoData,
        isActive: isActive
      };

      console.log('📤 Submitting navbar data:', submitData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar/admin`, {
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
        toast.error('You do not have permission to update navbar.');
        setIsSubmitting(false);
        return;
      }

      const responseText = await response.text();
      console.log('📡 Raw response:', responseText);

      let data = {};
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse response:', parseError);
        }
      }

      if (response.ok && data.success) {
        toast.success('Navbar updated successfully!');
        fetchNavbarData();
      } else {
        toast.error(data.error || 'Failed to update navbar');
      }
    } catch (error) {
      console.error('Error saving navbar:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Go back to dashboard
  const goBack = () => {
    router.push('/authorize/dashboard');
  };

  // If not authorized, show nothing (will redirect)
  if (!authorized && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#73856B] mx-auto" />
          <p className="text-gray-500 mt-2">Loading navbar data...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="manage_navbar">
    <div className="min-h-screen bg-white p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2 text-[#73856B] hover:bg-[#F7C7D3]/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B2E] flex items-center gap-2">
              <Menu className="w-6 h-6 text-[#73856B]" />
              Navbar Management
            </h1>
            <p className="text-sm text-[#73856B]/60 mt-1">
              Manage navigation menu - Left: Logo, Center: Menu Items, Right: Actions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-[#73856B]/30 text-[#73856B] rounded-lg hover:bg-[#73856B]/50 transition-colors border border-[#73856B]/20"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={fetchNavbarData}
            className="p-2 text-[#73856B] hover:bg-[#F7C7D3]/30 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Navbar Sections */}
        <div className="bg-white rounded-xl shadow-sm border border-[#F7C7D3]/40 overflow-hidden">
          <div className="p-4 bg-white border-b border-[#F7C7D3]/40">
            <h2 className="text-lg font-semibold text-[#2D1B2E] flex items-center gap-2">
              <Menu className="w-5 h-5 text-[#73856B]" />
              Navbar Structure
              <span className="text-sm font-normal text-[#73856B]/60 ml-2">
                Left | Center | Right
              </span>
            </h2>
          </div>

          <div className="p-4 space-y-4">
            {/* LEFT - Logo Section */}
            <div className="border border-[#F7C7D3]/40 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlignLeft className="w-4 h-4 text-[#73856B]" />
                <h3 className="text-sm font-semibold text-[#2D1B2E]">Left Section</h3>
                <span className="text-xs text-[#73856B]/60">Logo & Brand</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
                    Logo Upload
                  </label>
                  <LogoUpload
                    logoUrl={logoData.logoUrl}
                    onLogoChange={(url) => setLogoData({ ...logoData, logoUrl: url })}
                    onLogoRemove={() => setLogoData({ ...logoData, logoUrl: '' })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={logoData.text}
                      onChange={(e) => setLogoData({ ...logoData, text: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition bg-white hover:border-[#73856B]/30"
                      placeholder="e.g., Beauty Bucket"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
                      Highlight Text (Optional)
                    </label>
                    <input
                      type="text"
                      value={logoData.highlightText}
                      onChange={(e) => setLogoData({ ...logoData, highlightText: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition bg-white hover:border-[#73856B]/30"
                      placeholder="e.g., Bucket"
                    />
                  </div>
                </div>

                {/* Live Preview */}
                <div className="mt-2 p-3 bg-[#FFF5F6] rounded-lg flex items-center border border-[#F7C7D3]/30">
                  {logoData.logoUrl ? (
                    <img src={logoData.logoUrl} alt="Logo Preview" className="h-8 w-auto object-contain" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#73856B]" />
                      <span className="text-sm font-bold text-[#2D1B2E]">
                        {logoData.text || 'Beauty'}<span className="text-[#73856B]">{logoData.highlightText || ' Bucket'}</span>
                      </span>
                    </div>
                  )}
                  <span className="text-xs text-[#73856B]/60 ml-3">Preview</span>
                </div>
              </div>
            </div>

            {/* CENTER - Navigation Items */}
            <div className="border border-[#F7C7D3]/40 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlignCenter className="w-4 h-4 text-[#73856B]" />
                  <h3 className="text-sm font-semibold text-[#2D1B2E]">Center Section</h3>
                  <span className="text-xs text-[#73856B]/60">Navigation Items</span>
                </div>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#73856B] text-white rounded-lg hover:bg-[#73856B]/80 transition-colors text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Item
                </button>
              </div>

              <div className="space-y-2">
                {navbarItems.map((item, index) => (
                  <NavbarItem
                    key={item.id}
                    item={item}
                    index={index}
                    onUpdate={updateItem}
                    onRemove={removeItem}
                    onMoveUp={moveItemUp}
                    onMoveDown={moveItemDown}
                    isFirst={index === 0}
                    isLast={index === navbarItems.length - 1}
                  />
                ))}
              </div>

              {navbarItems.length === 0 && (
                <div className="text-center py-4 text-[#73856B]/60 text-sm">
                  No navigation items added. Click "Add Item" to create one.
                </div>
              )}
            </div>

            {/* RIGHT - Fixed Actions */}
            <div className="border border-[#F7C7D3]/40 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlignRight className="w-4 h-4 text-[#73856B]" />
                <h3 className="text-sm font-semibold text-[#2D1B2E]">Right Section</h3>
                <span className="text-xs text-[#73856B]/60">Fixed Actions (Always Visible)</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-[#FFF5F6] rounded-lg p-3 border border-[#F7C7D3]/30">
                  <div className="flex items-center gap-2 text-sm text-[#2D1B2E]">
                    <Search className="w-4 h-4 text-[#73856B]" />
                    <span>Search</span>
                  </div>
                  <p className="text-xs text-[#73856B]/60 mt-1">Search products</p>
                </div>
                <div className="bg-[#FFF5F6] rounded-lg p-3 border border-[#F7C7D3]/30">
                  <div className="flex items-center gap-2 text-sm text-[#2D1B2E]">
                    <ShoppingCart className="w-4 h-4 text-[#73856B]" />
                    <span>Cart</span>
                  </div>
                  <p className="text-xs text-[#73856B]/60 mt-1">Shopping cart icon with count</p>
                </div>
                <div className="bg-[#FFF5F6] rounded-lg p-3 border border-[#F7C7D3]/30">
                  <div className="flex items-center gap-2 text-sm text-[#2D1B2E]">
                    <UserCircle className="w-4 h-4 text-[#73856B]" />
                    <span>User Menu</span>
                  </div>
                  <p className="text-xs text-[#73856B]/60 mt-1">Sign In / User profile</p>
                </div>
              </div>
              <p className="text-xs text-[#73856B]/60 mt-3">
                These elements are always visible and managed separately. They cannot be edited here.
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl shadow-sm border border-[#F7C7D3]/40 p-4">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#73856B] focus:ring-[#73856B]"
              />
              <span className="text-sm font-medium text-[#2D1B2E]">Navbar Active</span>
            </label>
            <span className="text-xs text-[#73856B]/60">
              {isActive ? 'Visible on website' : 'Hidden from website'}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-[#73856B]  text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#73856B]/25 transition-all duration-300 disabled:opacity-50 text-sm shadow-md"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Navbar</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
    </ProtectedRoute>
  );
}