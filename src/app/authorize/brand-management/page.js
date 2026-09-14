// // app/admin/brand-management/page.js
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Plus,
//   X,
//   Edit,
//   Trash2,
//   Search,
//   Upload,
//   Image as ImageIcon,
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   Building2,
//   Eye,
//   EyeOff,
//   ArrowLeft,
//   RefreshCw,
//   Save,
//   Filter
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// export default function BrandManagementPage() {
//   const router = useRouter();
//   const [brands, setBrands] = useState([]);
//   const [filteredBrands, setFilteredBrands] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [filterActive, setFilterActive] = useState('all');
//   const [userRole, setUserRole] = useState(''); 

//   // Form data for add/edit
//   const [formData, setFormData] = useState({
//     name: '',
//     logo: '',
//     description: ''
//   });

//   const [logoFile, setLogoFile] = useState(null);
//   const [logoPreview, setLogoPreview] = useState('');
//   const [isUploadingLogo, setIsUploadingLogo] = useState(false);
//   const fileInputRef = useRef(null);


//    useEffect(() => {
//     const getUserRole = () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           const payload = JSON.parse(atob(token.split('.')[1]));
//           setUserRole(payload.role || '');
//         }
//       } catch (error) {
//         console.error('Error getting user role:', error);
//       }
//     };
//     getUserRole();
//   }, []);

//   const canDelete = userRole === 'super_admin' || userRole === 'admin';

//   // ✅ REMOVED admin access restriction - all roles can access
//   // All admin roles (super_admin, admin, moderator, call_center_agent) can access this page

//   // Fetch brands
//   const fetchBrands = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/brands', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setBrands(data.data);
//         setFilteredBrands(data.data);
//       } else {
//         toast.error(data.error || 'Failed to fetch brands');
//       }
//     } catch (error) {
//       console.error('Error fetching brands:', error);
//       toast.error('Failed to fetch brands');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBrands();
//   }, []);

//   // Filter brands
//   useEffect(() => {
//     let filtered = brands;

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(brand =>
//         brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (brand.description && brand.description.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }

//     // Active/Inactive filter
//     if (filterActive === 'active') {
//       filtered = filtered.filter(brand => brand.isActive === true);
//     } else if (filterActive === 'inactive') {
//       filtered = filtered.filter(brand => brand.isActive === false);
//     }

//     setFilteredBrands(filtered);
//   }, [searchTerm, filterActive, brands]);

  

//   // Handle logo upload
//   const handleLogoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Invalid file format. Allowed: JPG, PNG, WebP, GIF, SVG');
//       return;
//     }

//     // Validate file size (max 2MB)
//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('File too large. Max size: 2MB');
//       return;
//     }

//     setLogoFile(file);
//     setLogoPreview(URL.createObjectURL(file));

//     // Upload to Cloudinary
//     setIsUploadingLogo(true);
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       if (data.secure_url) {
//         setFormData(prev => ({ ...prev, logo: data.secure_url }));
//         toast.success('Logo uploaded successfully');
//       } else {
//         throw new Error(data.error?.message || 'Upload failed');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload logo');
//       setLogoFile(null);
//       setLogoPreview('');
//     } finally {
//       setIsUploadingLogo(false);
//     }
//   };

//   // Remove logo
//   const removeLogo = () => {
//     setLogoFile(null);
//     setLogoPreview('');
//     setFormData(prev => ({ ...prev, logo: '' }));
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       name: '',
//       logo: '',
//       description: ''
//     });
//     setLogoFile(null);
//     setLogoPreview('');
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Open add modal
//   const openAddModal = () => {
//     resetForm();
//     setShowAddModal(true);
//   };

//   // Open edit modal
//   const openEditModal = (brand) => {
//     setSelectedBrand(brand);
//     setFormData({
//       name: brand.name,
//       logo: brand.logo || '',
//       description: brand.description || ''
//     });
//     if (brand.logo) {
//       setLogoPreview(brand.logo);
//     }
//     setShowEditModal(true);
//   };

//   // Open delete modal
//   const openDeleteModal = (brand) => {
//     setSelectedBrand(brand);
//     setShowDeleteModal(true);
//   };

//   // Create brand
//   const handleCreateBrand = async (e) => {
//     e.preventDefault();
//     if (!formData.name.trim()) {
//       toast.error('Brand name is required');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/brands', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: formData.name.trim(),
//           logo: formData.logo,
//           description: formData.description
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Brand created successfully');
//         setShowAddModal(false);
//         resetForm();
//         fetchBrands();
//       } else {
//         toast.error(data.error || 'Failed to create brand');
//       }
//     } catch (error) {
//       console.error('Error creating brand:', error);
//       toast.error('Failed to create brand');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Update brand
//   const handleUpdateBrand = async (e) => {
//     e.preventDefault();
//     if (!formData.name.trim()) {
//       toast.error('Brand name is required');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/brands/${selectedBrand._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: formData.name.trim(),
//           logo: formData.logo,
//           description: formData.description
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Brand updated successfully');
//         setShowEditModal(false);
//         resetForm();
//         fetchBrands();
//       } else {
//         toast.error(data.error || 'Failed to update brand');
//       }
//     } catch (error) {
//       console.error('Error updating brand:', error);
//       toast.error('Failed to update brand');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Delete brand
//   const handleDeleteBrand = async () => {
//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/brands/${selectedBrand._id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Brand deleted successfully');
//         setShowDeleteModal(false);
//         setSelectedBrand(null);
//         fetchBrands();
//       } else {
//         toast.error(data.error || 'Failed to delete brand');
//       }
//     } catch (error) {
//       console.error('Error deleting brand:', error);
//       toast.error('Failed to delete brand');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Toggle brand active status
//   const toggleBrandStatus = async (brand) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/brands/${brand._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           isActive: !brand.isActive
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(`Brand ${brand.isActive ? 'deactivated' : 'activated'} successfully`);
//         fetchBrands();
//       } else {
//         toast.error(data.error || 'Failed to update brand status');
//       }
//     } catch (error) {
//       console.error('Error toggling brand status:', error);
//       toast.error('Failed to update brand status');
//     }
//   };

//   // Get status badge
//   const getStatusBadge = (isActive) => {
//     return isActive ? (
//       <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full border border-green-200">
//         <CheckCircle className="w-3 h-3" />
//         Active
//       </span>
//     ) : (
//       <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full border border-gray-200">
//         <EyeOff className="w-3 h-3" />
//         Inactive
//       </span>
//     );
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 className="w-10 h-10 text-[#06B6D4] animate-spin" />
//           <p className="text-gray-600 font-medium">Loading brands...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="manage_brands">
//     <div className="min-h-screen bg-[#f0f7fa]">
//       {/* Header - HyperVolt Theme */}
//       <div className="bg-[#004767] border-b border-[#06B6D4]/20 shadow-lg sticky top-0 z-10">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Link href="/authorize/dashboard" className="p-2 hover:bg-[#06B6D4]/20 rounded-lg transition-colors">
//                 <ArrowLeft className="w-5 h-5 text-white/80 hover:text-white" />
//               </Link>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <Building2 className="w-6 h-6 text-[#06B6D4]" />
//                   <h1 className="text-xl font-bold text-white">Brand Management</h1>
//                 </div>
//                 <p className="text-sm text-white/70 mt-1">Manage your product brands</p>
//               </div>
//             </div>
//             <button
//               onClick={openAddModal}
//               className="flex items-center gap-2 px-4 py-2 bg-[#06B6D4] text-[#004767] rounded-lg hover:bg-[#0891B2] transition-colors shadow-md hover:shadow-lg font-semibold"
//             >
//               <Plus className="w-4 h-4" />
//               Add Brand
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         {/* Filters - HyperVolt Theme */}
//         <div className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20 p-4 mb-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06B6D4]/60" />
//                 <input
//                   type="text"
//                   placeholder="Search brands..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <Filter className="w-4 h-4 text-[#06B6D4]/60" />
//               <select
//                 value={filterActive}
//                 onChange={(e) => setFilterActive(e.target.value)}
//                 className="px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//               >
//                 <option value="all">All Brands</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//               <button
//                 onClick={fetchBrands}
//                 className="p-2 text-gray-400 hover:text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//               >
//                 <RefreshCw className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//           <div className="mt-2 text-sm text-gray-500">
//             {filteredBrands.length} brand{filteredBrands.length !== 1 ? 's' : ''} found
//           </div>
//         </div>

//         {/* Brands Grid */}
//         {filteredBrands.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20 p-12 text-center">
//             <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">No brands found</h3>
//             <p className="text-sm text-gray-500 mb-4">
//               {searchTerm ? 'Try adjusting your search or filters' : 'Start by adding your first brand'}
//             </p>
//             {!searchTerm && (
//               <button
//                 onClick={openAddModal}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-[#06B6D4] text-[#004767] rounded-lg hover:bg-[#0891B2] transition-colors font-semibold shadow-md"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add Brand
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {filteredBrands.map((brand) => (
//               <div
//                 key={brand._id}
//                 className="bg-white rounded-xl shadow-sm border border-[#06B6D4]/20 hover:shadow-md transition-shadow overflow-hidden group"
//               >
//                 {/* Logo */}
//                 <div className="h-32 bg-gradient-to-br from-[#06B6D4]/5 to-[#004767]/5 flex items-center justify-center p-4 border-b border-[#06B6D4]/10">
//                   {brand.logo ? (
//                     <img
//                       src={brand.logo}
//                       alt={brand.name}
//                       className="max-h-full max-w-full object-contain"
//                     />
//                   ) : (
//                     <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
//                       <Building2 className="w-10 h-10 text-gray-400" />
//                     </div>
//                   )}
//                 </div>

//                 {/* Info */}
//                 <div className="p-4">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-gray-900 truncate">{brand.name}</h3>
//                       {brand.description && (
//                         <p className="text-xs text-gray-500 mt-1 line-clamp-2">{brand.description}</p>
//                       )}
                     
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="mt-3 pt-3 border-t border-[#06B6D4]/10 flex items-center justify-between">
//                     <div className="flex items-center gap-1">
//                       <button
//                         onClick={() => toggleBrandStatus(brand)}
//                         className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
//                         title={brand.isActive ? 'Deactivate' : 'Activate'}
//                       >
//                         {brand.isActive ? (
//                           <EyeOff className="w-4 h-4" />
//                         ) : (
//                           <Eye className="w-4 h-4" />
//                         )}
//                       </button>
//                       <button
//                         onClick={() => openEditModal(brand)}
//                         className="p-1.5 text-gray-400 hover:text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                         title="Edit"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                     <button
//   onClick={() => canDelete && openDeleteModal(brand)}
//   disabled={!canDelete}
//   className={`p-1.5 rounded-lg transition-colors ${
//     canDelete 
//       ? 'text-gray-400 hover:text-red-600 hover:bg-red-50' 
//       : 'text-gray-300 cursor-not-allowed'
//   }`}
//   title={canDelete ? 'Delete' : 'Delete disabled for Moderator'}
// >
//   <Trash2 className="w-4 h-4" />
// </button>
//                     </div>
//                     <span className="text-[10px] text-gray-400">
//                       {new Date(brand.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Add Brand Modal - HyperVolt Theme */}
//       {showAddModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto border border-[#06B6D4]/20">
//             <div className="p-6 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                   <Plus className="w-5 h-5 text-[#06B6D4]" />
//                   Add New Brand
//                 </h3>
//                 <button
//                   onClick={() => setShowAddModal(false)}
//                   className="p-1 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
//             </div>

//             <form onSubmit={handleCreateBrand} className="p-6 space-y-4">
//               {/* Brand Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Brand Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Apple, Samsung, Sony"
//                   className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//                   autoFocus
//                   required
//                 />
//               </div>

//               {/* Logo Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Logo <span className="text-xs text-gray-400">(Optional)</span>
//                 </label>
//                 <div className="flex items-center gap-4">
//                   <div className="flex-1">
//                     <div
//                       className="border-2 border-dashed border-[#06B6D4]/30 rounded-lg p-4 text-center cursor-pointer hover:border-[#06B6D4] hover:bg-[#06B6D4]/5 transition-colors"
//                       onClick={() => fileInputRef.current?.click()}
//                     >
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         className="hidden"
//                         accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml"
//                         onChange={handleLogoUpload}
//                       />
//                       {logoPreview ? (
//                         <div className="flex items-center justify-center gap-4">
//                           <img
//                             src={logoPreview}
//                             alt="Logo preview"
//                             className="h-16 w-16 object-contain"
//                           />
//                           <div className="text-left">
//                             <p className="text-sm text-gray-700">Logo uploaded</p>
//                             <button
//                               type="button"
//                               onClick={removeLogo}
//                               className="text-xs text-red-500 hover:text-red-600"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <div>
//                           <Upload className="w-8 h-8 mx-auto text-[#06B6D4]/60 mb-2" />
//                           <p className="text-sm text-gray-600">Click to upload logo</p>
//                           <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG up to 2MB</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   {isUploadingLogo && (
//                     <div className="flex items-center gap-2">
//                       <Loader2 className="w-5 h-5 animate-spin text-[#06B6D4]" />
//                       <span className="text-sm text-gray-500">Uploading...</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description <span className="text-xs text-gray-400">(Optional)</span>
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Brief description about the brand..."
//                   rows="3"
//                   className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40 resize-none"
//                 />
//               </div>

//               {/* Actions */}
//               <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#06B6D4]/20">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#06B6D4] to-[#004767] rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-[#06B6D4]/20"
//                 >
//                   {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                   {isSubmitting ? 'Creating...' : 'Create Brand'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Edit Brand Modal - HyperVolt Theme */}
//       {showEditModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto border border-[#06B6D4]/20">
//             <div className="p-6 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                   <Edit className="w-5 h-5 text-[#06B6D4]" />
//                   Edit Brand
//                 </h3>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="p-1 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
//             </div>

//             <form onSubmit={handleUpdateBrand} className="p-6 space-y-4">
//               {/* Brand Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Brand Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Apple, Samsung, Sony"
//                   className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40"
//                   required
//                 />
//               </div>

//               {/* Logo Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Logo <span className="text-xs text-gray-400">(Optional)</span>
//                 </label>
//                 <div className="flex items-center gap-4">
//                   <div className="flex-1">
//                     <div
//                       className="border-2 border-dashed border-[#06B6D4]/30 rounded-lg p-4 text-center cursor-pointer hover:border-[#06B6D4] hover:bg-[#06B6D4]/5 transition-colors"
//                       onClick={() => fileInputRef.current?.click()}
//                     >
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         className="hidden"
//                         accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml"
//                         onChange={handleLogoUpload}
//                       />
//                       {logoPreview ? (
//                         <div className="flex items-center justify-center gap-4">
//                           <img
//                             src={logoPreview}
//                             alt="Logo preview"
//                             className="h-16 w-16 object-contain"
//                           />
//                           <div className="text-left">
//                             <p className="text-sm text-gray-700">Logo uploaded</p>
//                             <button
//                               type="button"
//                               onClick={removeLogo}
//                               className="text-xs text-red-500 hover:text-red-600"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <div>
//                           <Upload className="w-8 h-8 mx-auto text-[#06B6D4]/60 mb-2" />
//                           <p className="text-sm text-gray-600">Click to upload logo</p>
//                           <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG up to 2MB</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   {isUploadingLogo && (
//                     <div className="flex items-center gap-2">
//                       <Loader2 className="w-5 h-5 animate-spin text-[#06B6D4]" />
//                       <span className="text-sm text-gray-500">Uploading...</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description <span className="text-xs text-gray-400">(Optional)</span>
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Brief description about the brand..."
//                   rows="3"
//                   className="w-full px-3 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none transition bg-white hover:border-[#06B6D4]/40 resize-none"
//                 />
//               </div>

//               {/* Actions */}
//               <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#06B6D4]/20">
//                 <button
//                   type="button"
//                   onClick={() => setShowEditModal(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#06B6D4] to-[#004767] rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-[#06B6D4]/20"
//                 >
//                   {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                   {isSubmitting ? 'Updating...' : 'Update Brand'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal - HyperVolt Theme */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
//             <div className="p-6">
//               <div className="flex items-center gap-3 text-red-600 mb-4">
//                 <AlertCircle className="w-6 h-6" />
//                 <h3 className="text-lg font-semibold">Delete Brand</h3>
//               </div>

//               <p className="text-sm text-gray-600 mb-2">
//                 Are you sure you want to delete the brand <span className="font-semibold text-[#06B6D4]">"{selectedBrand?.name}"</span>?
//               </p>
//               <p className="text-xs text-gray-500 mb-4">
//                 This action cannot be undone. Any products associated with this brand may be affected.
//               </p>

//               <div className="flex items-center justify-end gap-3">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteBrand}
//                   disabled={isSubmitting}
//                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-red-200/50"
//                 >
//                   {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
//                   {isSubmitting ? 'Deleting...' : 'Delete Brand'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </ProtectedRoute>
//   );
// }

// app/admin/brand-management/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Plus,
  X,
  Edit,
  Trash2,
  Search,
  Loader2,
  AlertCircle,
  CheckCircle,
  Building2,
  Eye,
  EyeOff,
  ArrowLeft,
  RefreshCw,
  Save,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function BrandManagementPage() {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterActive, setFilterActive] = useState('all');
  const [userRole, setUserRole] = useState(''); 

  // Form data for add/edit
  const [formData, setFormData] = useState({
    name: ''
  });

  useEffect(() => {
    const getUserRole = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUserRole(payload.role || '');
        }
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    };
    getUserRole();
  }, []);

  const canDelete = userRole === 'super_admin' || userRole === 'admin';

  // Fetch brands
  const fetchBrands = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/brands', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setBrands(data.data);
        setFilteredBrands(data.data);
      } else {
        toast.error(data.error || 'Failed to fetch brands');
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Failed to fetch brands');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Filter brands
  useEffect(() => {
    let filtered = brands;

    if (searchTerm) {
      filtered = filtered.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterActive === 'active') {
      filtered = filtered.filter(brand => brand.isActive === true);
    } else if (filterActive === 'inactive') {
      filtered = filtered.filter(brand => brand.isActive === false);
    }

    setFilteredBrands(filtered);
  }, [searchTerm, filterActive, brands]);

  // Reset form
  const resetForm = () => {
    setFormData({ name: '' });
  };

  // Open add modal
  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  // Open edit modal
  const openEditModal = (brand) => {
    setSelectedBrand(brand);
    setFormData({ name: brand.name });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (brand) => {
    setSelectedBrand(brand);
    setShowDeleteModal(true);
  };

  // Create brand
  const handleCreateBrand = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Brand name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/brands', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim()
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Brand created successfully');
        setShowAddModal(false);
        resetForm();
        fetchBrands();
      } else {
        toast.error(data.error || 'Failed to create brand');
      }
    } catch (error) {
      console.error('Error creating brand:', error);
      toast.error('Failed to create brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update brand
  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Brand name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/brands/${selectedBrand._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim()
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Brand updated successfully');
        setShowEditModal(false);
        resetForm();
        fetchBrands();
      } else {
        toast.error(data.error || 'Failed to update brand');
      }
    } catch (error) {
      console.error('Error updating brand:', error);
      toast.error('Failed to update brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete brand
  const handleDeleteBrand = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/brands/${selectedBrand._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Brand deleted successfully');
        setShowDeleteModal(false);
        setSelectedBrand(null);
        fetchBrands();
      } else {
        toast.error(data.error || 'Failed to delete brand');
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      toast.error('Failed to delete brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle brand active status
  const toggleBrandStatus = async (brand) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/brands/${brand._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isActive: !brand.isActive
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Brand ${brand.isActive ? 'deactivated' : 'activated'} successfully`);
        fetchBrands();
      } else {
        toast.error(data.error || 'Failed to update brand status');
      }
    } catch (error) {
      console.error('Error toggling brand status:', error);
      toast.error('Failed to update brand status');
    }
  };

  // Get status badge
  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full border border-green-200">
        <CheckCircle className="w-3 h-3" />
        Active
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full border border-gray-200">
        <EyeOff className="w-3 h-3" />
        Inactive
      </span>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading brands...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="manage_brands">
    <div className="min-h-screen bg-white">
      {/* Header - Black & White Theme */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/authorize/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-black" />
              </a>
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-black" />
                  <h1 className="text-xl font-bold text-gray-900">Brand Management</h1>
                </div>
                <p className="text-sm text-gray-500 mt-1">Manage your product brands</p>
              </div>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-md font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Brand
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Filters - Black & White Theme */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-white hover:border-gray-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-white hover:border-gray-400"
              >
                <option value="all">All Brands</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                onClick={fetchBrands}
                className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {filteredBrands.length} brand{filteredBrands.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Brands Grid */}
        {filteredBrands.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No brands found</h3>
            <p className="text-sm text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search or filters' : 'Start by adding your first brand'}
            </p>
            {!searchTerm && (
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add Brand
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBrands.map((brand) => (
              <div
                key={brand._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden group"
              >
                {/* Brand Name - Centered */}
                <div className="p-6 flex flex-col items-center justify-center min-h-[120px] bg-gray-50 border-b border-gray-200">
                  <Building2 className="w-10 h-10 text-gray-400 mb-2" />
                  <h3 className="font-semibold text-gray-900 text-center text-lg">{brand.name}</h3>
                  {getStatusBadge(brand.isActive)}
                </div>

                {/* Actions */}
                <div className="p-4 flex items-center justify-center gap-2">
                  <button
                    onClick={() => toggleBrandStatus(brand)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    title={brand.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {brand.isActive ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => openEditModal(brand)}
                    className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => canDelete && openDeleteModal(brand)}
                    disabled={!canDelete}
                    className={`p-2 rounded-lg transition-colors ${
                      canDelete 
                        ? 'text-gray-400 hover:text-red-600 hover:bg-red-50' 
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                    title={canDelete ? 'Delete' : 'Delete disabled for Moderator'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Brand Modal - Black & White Theme */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-black" />
                  Add New Brand
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateBrand} className="p-6 space-y-4">
              {/* Brand Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="e.g., Apple, Samsung, Sony"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-white hover:border-gray-400"
                  autoFocus
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 shadow-md"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSubmitting ? 'Creating...' : 'Create Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Brand Modal - Black & White Theme */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-black" />
                  Edit Brand
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateBrand} className="p-6 space-y-4">
              {/* Brand Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="e.g., Apple, Samsung, Sony"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-white hover:border-gray-400"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-800 transition-colors disabled:opacity-50 shadow-md"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSubmitting ? 'Updating...' : 'Update Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - Black & White Theme */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-200">
            <div className="p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Delete Brand</h3>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Are you sure you want to delete the brand <span className="font-semibold text-black">"{selectedBrand?.name}"</span>?
              </p>
              <p className="text-xs text-gray-500 mb-4">
                This action cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteBrand}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 shadow-md"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  {isSubmitting ? 'Deleting...' : 'Delete Brand'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}