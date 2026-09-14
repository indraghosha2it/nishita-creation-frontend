


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import { 
//   Search, 
//   Users, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Globe,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   RefreshCw,
//   AlertTriangle,
//   X,
//   UserX,
//   Eye,
//   Calendar,
//   UserPlus,
//   CheckCircle,
//   Edit2,
//   Save,
//   Lock,
//   Bell,
//   BellOff,
//   Smartphone,
//   Briefcase,
//   Sparkles,
//   Heart,
//   Store,
//   ArrowLeft,
//   Zap,
//   EyeOff
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // Helper to get user role
// const getUserRole = () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload.role || '';
//     }
//   } catch (error) {
//     console.error('Error getting user role:', error);
//   }
//   return '';
// };

// export default function AllCustomers() {
//   const router = useRouter();
//   const userRole = getUserRole();
  
//   // ✅ Permission checks
//   const canDelete = userRole === 'super_admin' || userRole === 'admin';
//   const canEdit = userRole === 'super_admin' || userRole === 'admin' || userRole === 'moderator';
//   const canView = userRole === 'super_admin' || userRole === 'admin' || userRole === 'moderator';
  
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState('all');
//   const [selectedSubscription, setSelectedSubscription] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [deleteModal, setDeleteModal] = useState({ isOpen: false, customerId: null, customerName: '' });
//   const [viewModal, setViewModal] = useState({ isOpen: false, customer: null });
//   const [createModal, setCreateModal] = useState({ isOpen: false });
//   const [editModal, setEditModal] = useState({ isOpen: false, customer: null });
//   const [countries, setCountries] = useState([]);
//   const [isCreating, setIsCreating] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
//   const [isResettingPassword, setIsResettingPassword] = useState(false);
//   const [passwordModal, setPasswordModal] = useState({ isOpen: false, customerId: null, customerEmail: '' });
//   const [updatingSubscription, setUpdatingSubscription] = useState(null);

//   const customersPerPage = 10;

//   // Form data for creating customer
//   const [createForm, setCreateForm] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     password: '',
//     confirmPassword: '',
//     subscribeToNewsletter: false
//   });

//   // Form data for editing customer
//   const [editForm, setEditForm] = useState({
//     contactPerson: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     isActive: true,
//     isSubscribedToNewsletter: false
//   });

//   // Password reset form
//   const [passwordForm, setPasswordForm] = useState({
//     newPassword: '',
//     confirmPassword: ''
//   });

//   // Fetch customers
//   useEffect(() => {
//     if (canView) {
//       fetchCustomers();
//     }
//   }, [currentPage, searchTerm, selectedCountry, selectedSubscription, canView]);

//   const fetchCustomers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const params = new URLSearchParams({
//         page: currentPage,
//         limit: customersPerPage,
//         role: 'customer',
//         search: searchTerm,
//         country: selectedCountry !== 'all' ? selectedCountry : '',
//         subscription: selectedSubscription !== 'all' ? selectedSubscription : ''
//       });

//       const response = await fetch(`http://localhost:5000/api/auth/admin/customers?${params}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setCustomers(data.customers || []);
//         setTotalPages(data.totalPages || 1);
        
//         if (data.customers && data.customers.length > 0) {
//           const uniqueCountries = [...new Set(data.customers.map(c => c.country).filter(Boolean))];
//           setCountries(uniqueCountries);
//         }
//       } else {
//         toast.error(data.error || 'Failed to fetch customers');
//       }
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//       toast.error('Connection Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete customer
//   const handleDelete = async () => {
//     if (!canDelete) {
//       toast.error('You do not have permission to delete customers');
//       return;
//     }
    
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:5000/api/auth/admin/customers/${deleteModal.customerId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Customer Deleted', {
//           description: `${deleteModal.customerName} has been removed successfully`
//         });
//         fetchCustomers();
//         setDeleteModal({ isOpen: false, customerId: null, customerName: '' });
//       } else {
//         toast.error(data.error || 'Delete Failed');
//       }
//     } catch (error) {
//       console.error('Error deleting customer:', error);
//       toast.error('Connection Error');
//     }
//   };

//   // Handle edit click
//   const handleEditClick = (customer) => {
//     if (!canEdit) {
//       toast.error('You do not have permission to edit customers');
//       return;
//     }
    
//     setEditForm({
//       contactPerson: customer.contactPerson || '',
//       phone: customer.phone || '',
//       whatsapp: customer.whatsapp || '',
//       country: customer.country || '',
//       address: customer.address || '',
//       city: customer.city || '',
//       zipCode: customer.zipCode || '',
//       isActive: customer.isActive !== undefined ? customer.isActive : true,
//       isSubscribedToNewsletter: customer.isSubscribedToNewsletter || false
//     });
//     setEditModal({ isOpen: true, customer: customer });
//   };

//   // Handle edit form changes
//   const handleEditChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // Handle edit customer submission
//   const handleEditCustomer = async (e) => {
//     e.preventDefault();
    
//     if (!canEdit) {
//       toast.error('You do not have permission to edit customers');
//       return;
//     }
    
//     const requiredFields = ['contactPerson', 'phone', 'country', 'address', 'city', 'zipCode'];
//     const missingFields = requiredFields.filter(field => !editForm[field]);
    
//     if (missingFields.length > 0) {
//       toast.error('Missing Fields', {
//         description: `Please fill in: ${missingFields.join(', ')}`
//       });
//       return;
//     }

//     setIsEditing(true);
    
//     const loadingToast = toast.loading('Updating customer information...');

//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:5000/api/auth/admin/customers/${editModal.customer._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           contactPerson: editForm.contactPerson,
//           phone: editForm.phone,
//           whatsapp: editForm.whatsapp,
//           country: editForm.country,
//           address: editForm.address,
//           city: editForm.city,
//           zipCode: editForm.zipCode,
//           isActive: editForm.isActive,
//           isSubscribedToNewsletter: editForm.isSubscribedToNewsletter
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (response.ok) {
//         toast.success('Customer Updated!', {
//           description: `Customer information for ${editForm.contactPerson} has been updated.`,
//           duration: 4000,
//         });

//         setEditModal({ isOpen: false, customer: null });
//         fetchCustomers();
//       } else {
//         toast.error(data.error || 'Update Failed');
//       }
//     } catch (error) {
//       console.error('Error updating customer:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error');
//     } finally {
//       setIsEditing(false);
//     }
//   };

//   // Handle password reset modal
//   const handlePasswordResetClick = (customer) => {
//     if (!canEdit) {
//       toast.error('You do not have permission to reset passwords');
//       return;
//     }
    
//     setPasswordForm({ newPassword: '', confirmPassword: '' });
//     setPasswordModal({ isOpen: true, customerId: customer._id, customerEmail: customer.email });
//   };

//   // Handle password reset submission
//   const handleResetPassword = async (e) => {
//     e.preventDefault();
    
//     if (!canEdit) {
//       toast.error('You do not have permission to reset passwords');
//       return;
//     }
    
//     if (passwordForm.newPassword !== passwordForm.confirmPassword) {
//       toast.error('Password Mismatch');
//       return;
//     }

//     if (passwordForm.newPassword.length < 8) {
//       toast.error('Weak Password', {
//         description: 'Password must be at least 8 characters long.'
//       });
//       return;
//     }

//     setIsResettingPassword(true);
    
//     const loadingToast = toast.loading('Resetting password...');

//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:5000/api/auth/admin/customers/${passwordModal.customerId}/reset-password`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           newPassword: passwordForm.newPassword
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (response.ok) {
//         toast.success('Password Reset Successfully!', {
//           description: `Password has been reset for ${passwordModal.customerEmail}`,
//           duration: 4000,
//         });

//         setPasswordModal({ isOpen: false, customerId: null, customerEmail: '' });
//         setPasswordForm({ newPassword: '', confirmPassword: '' });
//       } else {
//         toast.error(data.error || 'Password Reset Failed');
//       }
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error');
//     } finally {
//       setIsResettingPassword(false);
//     }
//   };

//   // Handle create customer form changes
//   const handleCreateChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setCreateForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // Handle create customer submission
//   const handleCreateCustomer = async (e) => {
//     e.preventDefault();
    
//     if (createForm.password !== createForm.confirmPassword) {
//       toast.error('Password Mismatch');
//       return;
//     }

//     if (createForm.password.length < 8) {
//       toast.error('Weak Password', {
//         description: 'Password must be at least 8 characters long.'
//       });
//       return;
//     }

//     const requiredFields = ['contactPerson', 'email', 'phone', 'country', 'address', 'city', 'zipCode'];
//     const missingFields = requiredFields.filter(field => !createForm[field]);
    
//     if (missingFields.length > 0) {
//       toast.error('Missing Fields', {
//         description: `Please fill in: ${missingFields.join(', ')}`
//       });
//       return;
//     }

//     setIsCreating(true);
    
//     const loadingToast = toast.loading('Creating customer account...');

//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:5000/api/auth/admin/create-customer', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           contactPerson: createForm.contactPerson,
//           email: createForm.email,
//           phone: createForm.phone,
//           whatsapp: createForm.whatsapp || '',
//           country: createForm.country,
//           address: createForm.address,
//           city: createForm.city,
//           zipCode: createForm.zipCode,
//           password: createForm.password
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (response.ok) {
//         toast.success('Customer Created Successfully!', {
//           description: `Customer account for ${createForm.contactPerson} has been created.`,
//           duration: 5000,
//         });

//         setCreateForm({
//           contactPerson: '',
//           email: '',
//           phone: '',
//           whatsapp: '',
//           country: '',
//           address: '',
//           city: '',
//           zipCode: '',
//           password: '',
//           confirmPassword: '',
//           subscribeToNewsletter: false
//         });
//         setCreateModal({ isOpen: false });
//         fetchCustomers();
//       } else {
//         toast.error(data.error || 'Creation Failed');
//       }
//     } catch (error) {
//       console.error('Error creating customer:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error');
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Never';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric'
//     });
//   };

//   // If user doesn't have permission to view
//   if (!canView) {
//     return (
//       <ProtectedRoute pageKey="manage_customers">
//         <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border border-[#F7C7D3]/40">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <EyeOff className="w-8 h-8 text-red-500" />
//             </div>
//             <h2 className="text-xl font-bold text-[#2D1B2E] mb-2">Access Denied</h2>
//             <p className="text-[#2D1B2E]/70 text-sm">
//               You don't have permission to view customer management.
//               Please contact your administrator.
//             </p>
//             <Link
//               href="/authorize/dashboard"
//               className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all font-semibold"
//             >
//               Go to Dashboard
//             </Link>
//           </div>
//         </div>
//       </ProtectedRoute>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="manage_customers">
//     <div className="min-h-screen bg-[#FFF5F6]">
//       {/* Header - Pink Theme */}
//       <div className="bg-white border-b border-[#EE4275]/20 shadow-lg sticky top-0 z-10">
//         <div className="px-6 py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold text-[#2D1B2E] flex items-center gap-2">
//                   <Users className="w-7 h-7 text-[#EE4275]" />
//                   All Customers
//                 </h1>
//                 <p className="text-sm text-[#EE4275]/60 mt-1">
//                   View and manage all customer accounts
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3">
//               {canEdit && (
//                 <button
//                   onClick={() => setCreateModal({ isOpen: true })}
//                   className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-300 shadow-md font-semibold"
//                 >
//                   <UserPlus className="w-4 h-4" />
//                   Add Customer
//                 </button>
//               )}
//               <span className="text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-[#EE4275]/20 text-[#2D1B2E]">
//                 Total: <span className="font-semibold text-[#EE4275]">{customers.length}</span>
//               </span>
//               {userRole && (
//                 <span className={`text-xs px-2 py-1 rounded-full ${
//                   userRole === 'super_admin' ? 'bg-yellow-500/30 text-yellow-900' :
//                   userRole === 'admin' ? 'bg-[#F7C7D3]/30 text-[#EE4275]' :
//                   'bg-green-500/30 text-green-900'
//                 }`}>
//                   {userRole.replace('_', ' ').toUpperCase()}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         {/* Filters and Search */}
//         <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
//           <div className="md:col-span-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]" />
//             <input
//               type="text"
//               placeholder="Search by name, email, phone..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//             />
//           </div>
          
//           <select
//             value={selectedCountry}
//             onChange={(e) => setSelectedCountry(e.target.value)}
//             className="px-3 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 text-sm"
//           >
//             <option value="all">All Countries</option>
//             {countries.map(country => (
//               <option key={country} value={country}>{country}</option>
//             ))}
//           </select>

//           <button
//             onClick={fetchCustomers}
//             className="px-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg hover:bg-[#FFF5F6] transition-all flex items-center justify-center gap-2 bg-white hover:border-[#EE4275]/30"
//           >
//             <RefreshCw className="w-4 h-4 text-[#EE4275]" />
//             <span className="hidden sm:inline text-sm text-[#2D1B2E]">Refresh</span>
//           </button>
//         </div>

//         {/* Customers Table */}
//         <div className="bg-white rounded-xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-[#FFF5F6] border-b border-[#F7C7D3]/40">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">
//                     Customer
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">
//                     Location
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">
//                     Joined
//                   </th>
//                   <th className="px-4 py-3 text-right text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#F7C7D3]/20">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="5" className="px-4 py-12 text-center">
//                       <div className="flex justify-center items-center gap-2">
//                         <RefreshCw className="w-5 h-5 animate-spin text-[#EE4275]" />
//                         <span className="text-[#EE4275]/60">Loading customers...</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : customers.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="px-4 py-12 text-center">
//                       <div className="text-[#EE4275]/60">
//                         <Users className="w-12 h-12 mx-auto mb-3 text-[#EE4275]/30" />
//                         <p className="text-lg font-medium text-[#2D1B2E]">No customers found</p>
//                         <p className="text-sm mt-1">Try adjusting your search or filters</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   customers.map((customer) => (
//                     <tr key={customer._id} className="hover:bg-[#FFF5F6] transition-colors">
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] flex items-center justify-center text-white font-semibold text-sm shadow-md">
//                             {customer.contactPerson?.charAt(0) || '?'}
//                           </div>
//                           <div>
//                             <div className="font-medium text-[#2D1B2E] text-sm">
//                               {customer.contactPerson}
//                             </div>
//                             <div className="text-xs text-[#EE4275]/40">
//                               ID: {customer._id.slice(-6)}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-1.5 text-xs text-[#2D1B2E]">
//                             <Mail className="w-3.5 h-3.5 text-[#EE4275]" />
//                             <span className="truncate max-w-[150px]">{customer.email}</span>
//                           </div>
//                           <div className="flex items-center gap-1.5 text-xs text-[#2D1B2E]">
//                             <Phone className="w-3.5 h-3.5 text-[#EE4275]" />
//                             <span>{customer.phone}</span>
//                           </div>
//                           {customer.whatsapp && (
//                             <div className="flex items-center gap-1.5 text-xs text-green-600">
//                               <Smartphone className="w-3.5 h-3.5" />
//                               <span>WhatsApp</span>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-1.5 text-xs text-[#2D1B2E]">
//                             <Globe className="w-3.5 h-3.5 text-[#EE4275]" />
//                             <span>{customer.country}</span>
//                           </div>
//                           <div className="flex items-center gap-1.5 text-xs text-[#2D1B2E]">
//                             <MapPin className="w-3.5 h-3.5 text-[#EE4275]" />
//                             <span>{customer.city}</span>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-1.5 text-xs text-[#EE4275]/60">
//                           <Calendar className="w-3.5 h-3.5 text-[#EE4275]" />
//                           <span>{formatDate(customer.createdAt)}</span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 text-right">
//                         <div className="flex items-center justify-end gap-1">
//                           <button
//                             onClick={() => setViewModal({ isOpen: true, customer })}
//                             className="p-1.5 text-[#EE4275]/60 hover:text-[#EE4275] hover:bg-[#FFF5F6] rounded-lg transition-colors"
//                             title="View details"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           {canEdit && (
//                             <button
//                               onClick={() => handleEditClick(customer)}
//                               className="p-1.5 text-[#EE4275]/60 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                               title="Edit customer"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                             </button>
//                           )}
//                           {canDelete && (
//                             <button
//                               onClick={() => setDeleteModal({ 
//                                 isOpen: true, 
//                                 customerId: customer._id, 
//                                 customerName: customer.contactPerson 
//                               })}
//                               className="p-1.5 text-[#EE4275]/60 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
//                               title="Delete customer"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {!loading && customers.length > 0 && (
//             <div className="px-4 py-3 border-t border-[#F7C7D3]/40 flex items-center justify-between bg-[#FFF5F6]">
//               <p className="text-xs text-[#EE4275]/60">
//                 Showing page <span className="font-medium text-[#EE4275]">{currentPage}</span> of <span className="font-medium text-[#EE4275]">{totalPages}</span>
//               </p>
//               <div className="flex items-center gap-1">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="p-1.5 border border-[#F7C7D3]/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] transition-colors bg-white"
//                 >
//                   <ChevronLeft className="w-4 h-4 text-[#EE4275]" />
//                 </button>
//                 <span className="px-3 py-1.5 bg-white border border-[#F7C7D3]/50 rounded-lg text-xs font-medium text-[#EE4275]">
//                   {currentPage}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="p-1.5 border border-[#F7C7D3]/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] transition-colors bg-white"
//                 >
//                   <ChevronRight className="w-4 h-4 text-[#EE4275]" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Delete Confirmation Modal - Only shown for admins */}
//         {canDelete && deleteModal.isOpen && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden border border-rose-100"
//             >
//               <div className="px-5 py-3 bg-rose-50 border-b border-rose-100 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
//                     <AlertTriangle className="w-4 h-4 text-rose-600" />
//                   </div>
//                   <h3 className="text-sm font-semibold text-[#2D1B2E]">Delete Customer</h3>
//                 </div>
//                 <button
//                   onClick={() => setDeleteModal({ isOpen: false, customerId: null, customerName: '' })}
//                   className="text-[#EE4275]/40 hover:text-[#EE4275]"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="p-5">
//                 <p className="text-sm text-[#2D1B2E]/70 mb-3">
//                   Are you sure you want to delete <span className="font-semibold text-[#EE4275]">{deleteModal.customerName}</span>? 
//                   This will permanently remove all customer data.
//                 </p>

//                 <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
//                   <p className="text-xs text-amber-800 flex items-start gap-1.5">
//                     <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
//                     <span>This action cannot be undone. All customer history will be lost.</span>
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setDeleteModal({ isOpen: false, customerId: null, customerName: '' })}
//                     className="flex-1 px-4 py-2 border border-[#F7C7D3]/50 rounded-lg hover:bg-[#FFF5F6] text-sm font-medium text-[#2D1B2E]"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-1.5 shadow-md"
//                   >
//                     <UserX className="w-3.5 h-3.5" />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* View Customer Details Modal - Pink Theme */}
//         {viewModal.isOpen && viewModal.customer && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-2xl w-full shadow-xl overflow-hidden border border-[#F7C7D3]/40"
//             >
//               <div className="px-5 py-3 bg-[#FFF5F6] border-b border-[#F7C7D3]/40 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] flex items-center justify-center">
//                     <Eye className="w-4 h-4 text-white" />
//                   </div>
//                   <h3 className="text-base font-semibold text-[#2D1B2E]">Customer Details</h3>
//                 </div>
//                 <button
//                   onClick={() => setViewModal({ isOpen: false, customer: null })}
//                   className="text-[#EE4275]/40 hover:text-[#EE4275]"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="p-5 max-h-[70vh] overflow-y-auto">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="col-span-2">
//                     <h4 className="text-xs font-semibold text-[#EE4275] uppercase tracking-wider mb-2">Basic Information</h4>
//                     <div className="bg-[#FFF5F6] rounded-lg p-3 border border-[#F7C7D3]/40">
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <p className="text-xs text-[#EE4275]/60">Contact Person</p>
//                           <p className="text-sm font-medium text-[#2D1B2E]">{viewModal.customer.contactPerson}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-[#EE4275]/60">Status</p>
//                           <p className={`text-sm font-medium ${viewModal.customer.isActive ? 'text-green-600' : 'text-red-600'}`}>
//                             {viewModal.customer.isActive ? 'Active' : 'Inactive'}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-span-2 md:col-span-1">
//                     <h4 className="text-xs font-semibold text-[#EE4275] uppercase tracking-wider mb-2">Contact Information</h4>
//                     <div className="bg-[#FFF5F6] rounded-lg p-3 border border-[#F7C7D3]/40 space-y-2">
//                       <div className="flex items-center gap-2">
//                         <Mail className="w-4 h-4 text-[#EE4275]" />
//                         <div>
//                           <p className="text-xs text-[#EE4275]/60">Email</p>
//                           <p className="text-sm text-[#2D1B2E]">{viewModal.customer.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Phone className="w-4 h-4 text-[#EE4275]" />
//                         <div>
//                           <p className="text-xs text-[#EE4275]/60">Phone</p>
//                           <p className="text-sm text-[#2D1B2E]">{viewModal.customer.phone}</p>
//                         </div>
//                       </div>
//                       {viewModal.customer.whatsapp && (
//                         <div className="flex items-center gap-2">
//                           <Smartphone className="w-4 h-4 text-green-500" />
//                           <div>
//                             <p className="text-xs text-[#EE4275]/60">WhatsApp</p>
//                             <p className="text-sm text-[#2D1B2E]">{viewModal.customer.whatsapp}</p>
//                           </div>
//                         </div>
//                       )}
//                       <div className="flex items-center gap-2">
//                         <Bell className="w-4 h-4 text-[#EE4275]" />
//                         <div>
//                           <p className="text-xs text-[#EE4275]/60">Newsletter</p>
//                           <p className={`text-sm font-medium ${viewModal.customer.isSubscribedToNewsletter ? 'text-green-600' : 'text-[#EE4275]/60'}`}>
//                             {viewModal.customer.isSubscribedToNewsletter ? 'Subscribed' : 'Not Subscribed'}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-span-2 md:col-span-1">
//                     <h4 className="text-xs font-semibold text-[#EE4275] uppercase tracking-wider mb-2">Address</h4>
//                     <div className="bg-[#FFF5F6] rounded-lg p-3 border border-[#F7C7D3]/40 space-y-2">
//                       <div className="flex items-start gap-2">
//                         <MapPin className="w-4 h-4 text-[#EE4275]" />
//                         <div>
//                           <p className="text-xs text-[#EE4275]/60">Address</p>
//                           <p className="text-sm text-[#2D1B2E]">{viewModal.customer.address}</p>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-3 gap-2 pl-6">
//                         <div>
//                           <p className="text-xs text-[#EE4275]/60">City</p>
//                           <p className="text-sm text-[#2D1B2E]">{viewModal.customer.city}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-[#EE4275]/60">Country</p>
//                           <p className="text-sm text-[#2D1B2E]">{viewModal.customer.country}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-[#EE4275]/60">ZIP</p>
//                           <p className="text-sm text-[#2D1B2E]">{viewModal.customer.zipCode}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-span-2">
//                     <h4 className="text-xs font-semibold text-[#EE4275] uppercase tracking-wider mb-2">Account Information</h4>
//                     <div className="bg-[#FFF5F6] rounded-lg p-3 border border-[#F7C7D3]/40">
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <p className="text-xs text-[#EE4275]/60">Joined Date</p>
//                           <p className="text-sm text-[#2D1B2E] flex items-center gap-1">
//                             <Calendar className="w-3.5 h-3.5 text-[#EE4275]" />
//                             {formatDate(viewModal.customer.createdAt)}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-[#EE4275]/60">Last Login</p>
//                           <p className="text-sm text-[#2D1B2E]">
//                             {viewModal.customer.lastLogin ? formatDate(viewModal.customer.lastLogin) : 'Never'}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="px-5 py-3 border-t border-[#F7C7D3]/40 flex justify-end gap-2 bg-[#FFF5F6]">
//                 {canEdit && (
//                   <button
//                     onClick={() => {
//                       setViewModal({ isOpen: false, customer: null });
//                       handleEditClick(viewModal.customer);
//                     }}
//                     className="px-4 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-300 text-sm font-medium flex items-center gap-2 shadow-md"
//                   >
//                     <Edit2 className="w-4 h-4" />
//                     Edit Customer
//                   </button>
//                 )}
//                 <button
//                   onClick={() => setViewModal({ isOpen: false, customer: null })}
//                   className="px-4 py-2 bg-[#F7C7D3]/20 text-[#2D1B2E] rounded-lg hover:bg-[#F7C7D3]/40 text-sm font-medium"
//                 >
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* Edit Customer Modal - Pink Theme */}
//         {canEdit && editModal.isOpen && editModal.customer && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-3xl w-full shadow-xl overflow-hidden max-h-[90vh] flex flex-col border border-[#F7C7D3]/40"
//             >
//               <div className="px-5 py-3 bg-[#FFF5F6] border-b border-[#F7C7D3]/40 flex items-center justify-between flex-shrink-0">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] flex items-center justify-center">
//                     <Edit2 className="w-4 h-4 text-white" />
//                   </div>
//                   <h3 className="text-base font-semibold text-[#2D1B2E]">Edit Customer</h3>
//                 </div>
//                 <button
//                   onClick={() => setEditModal({ isOpen: false, customer: null })}
//                   className="text-[#EE4275]/40 hover:text-[#EE4275]"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-5">
//                 <form onSubmit={handleEditCustomer}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Contact Person <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="contactPerson"
//                         value={editForm.contactPerson}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                       />
//                     </div>

//                     <div className="col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         value={editModal.customer.email}
//                         disabled
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg bg-[#FFF5F6] text-[#EE4275]/60 cursor-not-allowed"
//                       />
//                       <p className="text-xs text-[#EE4275]/40 mt-1">Email cannot be changed</p>
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Phone Number <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={editForm.phone}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                       />
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         WhatsApp Number
//                       </label>
//                       <input
//                         type="tel"
//                         name="whatsapp"
//                         value={editForm.whatsapp}
//                         onChange={handleEditChange}
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                       />
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Country <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="country"
//                         value={editForm.country}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                       />
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         City <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         value={editForm.city}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                       />
//                     </div>

//                     <div className="col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Street Address <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         value={editForm.address}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                       />
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         ZIP Code <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="zipCode"
//                         value={editForm.zipCode}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                       />
//                     </div>

//                     <div className="col-span-2">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="isActive"
//                           checked={editForm.isActive}
//                           onChange={handleEditChange}
//                           className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#EE4275] focus:ring-[#EE4275]"
//                         />
//                         <span className="text-sm text-[#2D1B2E]">Account Active</span>
//                       </label>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-[#F7C7D3]/40">
//                     <button
//                       type="button"
//                       onClick={() => setEditModal({ isOpen: false, customer: null })}
//                       className="px-4 py-2 border border-[#F7C7D3]/50 rounded-lg text-sm font-medium text-[#2D1B2E] hover:bg-[#FFF5F6] transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={isEditing}
//                       className="px-4 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
//                     >
//                       {isEditing ? (
//                         <>
//                           <RefreshCw className="w-4 h-4 animate-spin" />
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <Save className="w-4 h-4" />
//                           Save Changes
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* Create Customer Modal - Pink Theme */}
//         {canEdit && createModal.isOpen && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-3xl w-full shadow-xl overflow-hidden max-h-[90vh] flex flex-col border border-[#F7C7D3]/40"
//             >
//               <div className="px-5 py-3 bg-[#FFF5F6] border-b border-[#F7C7D3]/40 flex items-center justify-between flex-shrink-0">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] flex items-center justify-center">
//                     <UserPlus className="w-4 h-4 text-white" />
//                   </div>
//                   <h3 className="text-base font-semibold text-[#2D1B2E]">Create New Customer</h3>
//                 </div>
//                 <button
//                   onClick={() => setCreateModal({ isOpen: false })}
//                   className="text-[#EE4275]/40 hover:text-[#EE4275]"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-5">
//                 <form onSubmit={handleCreateCustomer}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Contact Person <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="contactPerson"
//                         value={createForm.contactPerson}
//                         onChange={handleCreateChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                         placeholder="Your full name"
//                       />
//                     </div>

//                     <div className="col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Email Address <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={createForm.email}
//                         onChange={handleCreateChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                         placeholder="your@email.com"
//                       />
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Phone Number <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={createForm.phone}
//                         onChange={handleCreateChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                         placeholder="+1 234 567 8900"
//                       />
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         WhatsApp Number
//                       </label>
//                       <input
//                         type="tel"
//                         name="whatsapp"
//                         value={createForm.whatsapp}
//                         onChange={handleCreateChange}
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                         placeholder="+1 234 567 8900"
//                       />
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Country <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="country"
//                         value={createForm.country}
//                         onChange={handleCreateChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                         placeholder="Bangladesh"
//                       />
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         City <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         value={createForm.city}
//                         onChange={handleCreateChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                         placeholder="Dhaka"
//                       />
//                     </div>

//                     <div className="col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Street Address <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         value={createForm.address}
//                         onChange={handleCreateChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                         placeholder="Your street address"
//                       />
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         ZIP Code <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="zipCode"
//                         value={createForm.zipCode}
//                         onChange={handleCreateChange}
//                         required
//                         className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                         placeholder="10001"
//                       />
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Password <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           name="password"
//                           value={createForm.password}
//                           onChange={handleCreateChange}
//                           required
//                           minLength="8"
//                           className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent pr-10 transition-all bg-white hover:border-[#EE4275]/30"
//                           placeholder="Min. 8 characters"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-2 top-1/2 -translate-y-1/2 text-[#EE4275]/40 hover:text-[#EE4275]"
//                         >
//                           {showPassword ? (
//                             <EyeOff className="w-4 h-4" />
//                           ) : (
//                             <Eye className="w-4 h-4" />
//                           )}
//                         </button>
//                       </div>
//                     </div>

//                     <div className="col-span-2 md:col-span-1">
//                       <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                         Confirm Password <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showConfirmPassword ? "text" : "password"}
//                           name="confirmPassword"
//                           value={createForm.confirmPassword}
//                           onChange={handleCreateChange}
//                           required
//                           minLength="8"
//                           className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent pr-10 transition-all bg-white hover:border-[#EE4275]/30"
//                           placeholder="Re-enter password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-2 top-1/2 -translate-y-1/2 text-[#EE4275]/40 hover:text-[#EE4275]"
//                         >
//                           {showConfirmPassword ? (
//                             <EyeOff className="w-4 h-4" />
//                           ) : (
//                             <Eye className="w-4 h-4" />
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-[#F7C7D3]/40">
//                     <button
//                       type="button"
//                       onClick={() => setCreateModal({ isOpen: false })}
//                       className="px-4 py-2 border border-[#F7C7D3]/50 rounded-lg text-sm font-medium text-[#2D1B2E] hover:bg-[#FFF5F6] transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={isCreating}
//                       className="px-4 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
//                     >
//                       {isCreating ? (
//                         <>
//                           <RefreshCw className="w-4 h-4 animate-spin" />
//                           Creating...
//                         </>
//                       ) : (
//                         <>
//                           <UserPlus className="w-4 h-4" />
//                           Create Customer
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* Password Reset Modal - Pink Theme */}
//         {canEdit && passwordModal.isOpen && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden border border-amber-100"
//             >
//               <div className="px-5 py-3 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
//                     <Lock className="w-4 h-4 text-amber-600" />
//                   </div>
//                   <h3 className="text-sm font-semibold text-[#2D1B2E]">Reset Password</h3>
//                 </div>
//                 <button
//                   onClick={() => setPasswordModal({ isOpen: false, customerId: null, customerEmail: '' })}
//                   className="text-[#EE4275]/40 hover:text-[#EE4275]"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               <form onSubmit={handleResetPassword}>
//                 <div className="p-5 space-y-4">
//                   <div>
//                     <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                       New Password <span className="text-[#EE4275]">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showNewPassword ? "text" : "password"}
//                         value={passwordForm.newPassword}
//                         onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
//                         required
//                         minLength="8"
//                         className="w-full px-3 py-2 text-sm border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-10 transition-all bg-amber-50/30 hover:bg-white"
//                         placeholder="Min. 8 characters"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowNewPassword(!showNewPassword)}
//                         className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600"
//                       >
//                         {showNewPassword ? (
//                           <EyeOff className="w-4 h-4" />
//                         ) : (
//                           <Eye className="w-4 h-4" />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                       Confirm Password <span className="text-[#EE4275]">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showConfirmNewPassword ? "text" : "password"}
//                         value={passwordForm.confirmPassword}
//                         onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
//                         required
//                         minLength="8"
//                         className="w-full px-3 py-2 text-sm border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-10 transition-all bg-amber-50/30 hover:bg-white"
//                         placeholder="Re-enter password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
//                         className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600"
//                       >
//                         {showConfirmNewPassword ? (
//                           <EyeOff className="w-4 h-4" />
//                         ) : (
//                           <Eye className="w-4 h-4" />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="p-3 bg-[#FFF5F6] rounded-lg border border-[#EE4275]/20">
//                     <p className="text-xs text-[#2D1B2E] flex items-start gap-1.5">
//                       <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#EE4275]" />
//                       <span>Customer will need to use this new password to login.</span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="px-5 py-3 border-t border-amber-100 flex items-center justify-end gap-2">
//                   <button
//                     type="button"
//                     onClick={() => setPasswordModal({ isOpen: false, customerId: null, customerEmail: '' })}
//                     className="px-4 py-2 border border-amber-200 rounded-lg text-sm font-medium text-[#2D1B2E] hover:bg-amber-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isResettingPassword}
//                     className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
//                   >
//                     {isResettingPassword ? (
//                       <>
//                         <RefreshCw className="w-4 h-4 animate-spin" />
//                         Resetting...
//                       </>
//                     ) : (
//                       <>
//                         <Lock className="w-4 h-4" />
//                         Reset Password
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </div>
//     </ProtectedRoute>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  Search, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  X,
  UserX,
  Eye,
  Calendar,
  UserPlus,
  CheckCircle,
  Edit2,
  Save,
  Lock,
  Bell,
  BellOff,
  Smartphone,
  Briefcase,
  Sparkles,
  Heart,
  Store,
  ArrowLeft,
  Zap,
  EyeOff
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================================
// FONT CONSTANTS - MATCHING ABOUT PAGE
// ============================================================
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

// Helper to get user role
const getUserRole = () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || '';
    }
  } catch (error) {
    console.error('Error getting user role:', error);
  }
  return '';
};

export default function AllCustomers() {
  const router = useRouter();
  const userRole = getUserRole();
  
  // ✅ Permission checks
  const canDelete = userRole === 'super_admin' || userRole === 'admin';
  const canEdit = userRole === 'super_admin' || userRole === 'admin' || userRole === 'moderator';
  const canView = userRole === 'super_admin' || userRole === 'admin' || userRole === 'moderator';
  
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSubscription, setSelectedSubscription] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, customerId: null, customerName: '' });
  const [viewModal, setViewModal] = useState({ isOpen: false, customer: null });
  const [createModal, setCreateModal] = useState({ isOpen: false });
  const [editModal, setEditModal] = useState({ isOpen: false, customer: null });
  const [countries, setCountries] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [passwordModal, setPasswordModal] = useState({ isOpen: false, customerId: null, customerEmail: '' });
  const [updatingSubscription, setUpdatingSubscription] = useState(null);

  const customersPerPage = 10;

  // Form data for creating customer
  const [createForm, setCreateForm] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    subscribeToNewsletter: false
  });

  // Form data for editing customer
  const [editForm, setEditForm] = useState({
    contactPerson: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    isActive: true,
    isSubscribedToNewsletter: false
  });

  // Password reset form
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // Fetch customers
  useEffect(() => {
    if (canView) {
      fetchCustomers();
    }
  }, [currentPage, searchTerm, selectedCountry, selectedSubscription, canView]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: customersPerPage,
        role: 'customer',
        search: searchTerm,
        country: selectedCountry !== 'all' ? selectedCountry : '',
        subscription: selectedSubscription !== 'all' ? selectedSubscription : ''
      });

      const response = await fetch(`http://localhost:5000/api/auth/admin/customers?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setCustomers(data.customers || []);
        setTotalPages(data.totalPages || 1);
        
        if (data.customers && data.customers.length > 0) {
          const uniqueCountries = [...new Set(data.customers.map(c => c.country).filter(Boolean))];
          setCountries(uniqueCountries);
        }
      } else {
        toast.error(data.error || 'Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Connection Error');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete customer
  const handleDelete = async () => {
    if (!canDelete) {
      toast.error('You do not have permission to delete customers');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/auth/admin/customers/${deleteModal.customerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Customer Deleted', {
          description: `${deleteModal.customerName} has been removed successfully`
        });
        fetchCustomers();
        setDeleteModal({ isOpen: false, customerId: null, customerName: '' });
      } else {
        toast.error(data.error || 'Delete Failed');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Connection Error');
    }
  };

  // Handle edit click
  const handleEditClick = (customer) => {
    if (!canEdit) {
      toast.error('You do not have permission to edit customers');
      return;
    }
    
    setEditForm({
      contactPerson: customer.contactPerson || '',
      phone: customer.phone || '',
      whatsapp: customer.whatsapp || '',
      country: customer.country || '',
      address: customer.address || '',
      city: customer.city || '',
      zipCode: customer.zipCode || '',
      isActive: customer.isActive !== undefined ? customer.isActive : true,
      isSubscribedToNewsletter: customer.isSubscribedToNewsletter || false
    });
    setEditModal({ isOpen: true, customer: customer });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle edit customer submission
  const handleEditCustomer = async (e) => {
    e.preventDefault();
    
    if (!canEdit) {
      toast.error('You do not have permission to edit customers');
      return;
    }
    
    const requiredFields = ['contactPerson', 'phone', 'country', 'address', 'city', 'zipCode'];
    const missingFields = requiredFields.filter(field => !editForm[field]);
    
    if (missingFields.length > 0) {
      toast.error('Missing Fields', {
        description: `Please fill in: ${missingFields.join(', ')}`
      });
      return;
    }

    setIsEditing(true);
    
    const loadingToast = toast.loading('Updating customer information...');

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/auth/admin/customers/${editModal.customer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactPerson: editForm.contactPerson,
          phone: editForm.phone,
          whatsapp: editForm.whatsapp,
          country: editForm.country,
          address: editForm.address,
          city: editForm.city,
          zipCode: editForm.zipCode,
          isActive: editForm.isActive,
          isSubscribedToNewsletter: editForm.isSubscribedToNewsletter
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success('Customer Updated!', {
          description: `Customer information for ${editForm.contactPerson} has been updated.`,
          duration: 4000,
        });

        setEditModal({ isOpen: false, customer: null });
        fetchCustomers();
      } else {
        toast.error(data.error || 'Update Failed');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error');
    } finally {
      setIsEditing(false);
    }
  };

  // Handle password reset modal
  const handlePasswordResetClick = (customer) => {
    if (!canEdit) {
      toast.error('You do not have permission to reset passwords');
      return;
    }
    
    setPasswordForm({ newPassword: '', confirmPassword: '' });
    setPasswordModal({ isOpen: true, customerId: customer._id, customerEmail: customer.email });
  };

  // Handle password reset submission
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!canEdit) {
      toast.error('You do not have permission to reset passwords');
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Password Mismatch');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error('Weak Password', {
        description: 'Password must be at least 8 characters long.'
      });
      return;
    }

    setIsResettingPassword(true);
    
    const loadingToast = toast.loading('Resetting password...');

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/auth/admin/customers/${passwordModal.customerId}/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          newPassword: passwordForm.newPassword
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success('Password Reset Successfully!', {
          description: `Password has been reset for ${passwordModal.customerEmail}`,
          duration: 4000,
        });

        setPasswordModal({ isOpen: false, customerId: null, customerEmail: '' });
        setPasswordForm({ newPassword: '', confirmPassword: '' });
      } else {
        toast.error(data.error || 'Password Reset Failed');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error');
    } finally {
      setIsResettingPassword(false);
    }
  };

  // Handle create customer form changes
  const handleCreateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle create customer submission
  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    
    if (createForm.password !== createForm.confirmPassword) {
      toast.error('Password Mismatch');
      return;
    }

    if (createForm.password.length < 8) {
      toast.error('Weak Password', {
        description: 'Password must be at least 8 characters long.'
      });
      return;
    }

    const requiredFields = ['contactPerson', 'email', 'phone', 'country', 'address', 'city', 'zipCode'];
    const missingFields = requiredFields.filter(field => !createForm[field]);
    
    if (missingFields.length > 0) {
      toast.error('Missing Fields', {
        description: `Please fill in: ${missingFields.join(', ')}`
      });
      return;
    }

    setIsCreating(true);
    
    const loadingToast = toast.loading('Creating customer account...');

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/auth/admin/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactPerson: createForm.contactPerson,
          email: createForm.email,
          phone: createForm.phone,
          whatsapp: createForm.whatsapp || '',
          country: createForm.country,
          address: createForm.address,
          city: createForm.city,
          zipCode: createForm.zipCode,
          password: createForm.password
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success('Customer Created Successfully!', {
          description: `Customer account for ${createForm.contactPerson} has been created.`,
          duration: 5000,
        });

        setCreateForm({
          contactPerson: '',
          email: '',
          phone: '',
          whatsapp: '',
          country: '',
          address: '',
          city: '',
          zipCode: '',
          password: '',
          confirmPassword: '',
          subscribeToNewsletter: false
        });
        setCreateModal({ isOpen: false });
        fetchCustomers();
      } else {
        toast.error(data.error || 'Creation Failed');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error');
    } finally {
      setIsCreating(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  // If user doesn't have permission to view
  if (!canView) {
    return (
      <ProtectedRoute pageKey="manage_customers">
        <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border border-[#e2e3dd]/60">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <EyeOff className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-[#29362f] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Access Denied</h2>
            <p className="text-[#29362f]/70 text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}>
              You don't have permission to view customer management.
              Please contact your administrator.
            </p>
            <Link
              href="/authorize/dashboard"
              className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all font-semibold"
              style={{ fontFamily: FONT_FAMILY_INTER }}
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute pageKey="manage_customers">
    <div className="min-h-screen bg-[#f7f4ef]">
      {/* Header - Sage Green Theme */}
      <div className="bg-white border-b border-[#52665a]/20 shadow-lg sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#29362f] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                  <Users className="w-7 h-7 text-[#52665a]" />
                  All Customers
                </h1>
                <p className="text-sm text-[#52665a]/60 mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  View and manage all customer accounts
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {canEdit && (
                <button
                  onClick={() => setCreateModal({ isOpen: true })}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all duration-300 shadow-md font-semibold"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  <UserPlus className="w-4 h-4" />
                  Add Customer
                </button>
              )}
              <span className="text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-[#52665a]/20 text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                Total: <span className="font-semibold text-[#52665a]">{customers.length}</span>
              </span>
              {userRole && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  userRole === 'super_admin' ? 'bg-yellow-500/30 text-yellow-900' :
                  userRole === 'admin' ? 'bg-[#e2e3dd]/60 text-[#52665a]' :
                  'bg-green-500/30 text-green-900'
                }`} style={{ fontFamily: FONT_FAMILY_INTER }}>
                  {userRole.replace('_', ' ').toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Filters and Search */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52665a]" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
              style={{ fontFamily: FONT_FAMILY_INTER }}
            />
          </div>
          
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent bg-white hover:border-[#52665a]/30 text-sm"
            style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            <option value="all">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <button
            onClick={fetchCustomers}
            className="px-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg hover:bg-[#f7f4ef] transition-all flex items-center justify-center gap-2 bg-white hover:border-[#52665a]/30"
          >
            <RefreshCw className="w-4 h-4 text-[#52665a]" />
            <span className="hidden sm:inline text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>Refresh</span>
          </button>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl shadow-lg border border-[#e2e3dd]/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f7f4ef] border-b border-[#e2e3dd]/60">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#29362f] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#29362f] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#29362f] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#29362f] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Joined
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[#29362f] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e3dd]/30">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-12 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin text-[#52665a]" />
                        <span className="text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Loading customers...</span>
                      </div>
                    </td>
                  </tr>
                ) : customers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-12 text-center">
                      <div className="text-[#52665a]/60">
                        <Users className="w-12 h-12 mx-auto mb-3 text-[#52665a]/30" />
                        <p className="text-lg font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>No customers found</p>
                        <p className="text-sm mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer._id} className="hover:bg-[#f7f4ef] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#52665a] to-[#71816F] flex items-center justify-center text-white font-semibold text-sm shadow-md" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {customer.contactPerson?.charAt(0) || '?'}
                          </div>
                          <div>
                            <div className="font-medium text-[#29362f] text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}>
                              {customer.contactPerson}
                            </div>
                            <div className="text-xs text-[#52665a]/40" style={{ fontFamily: FONT_FAMILY_INTER }}>
                              ID: {customer._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            <Mail className="w-3.5 h-3.5 text-[#52665a]" />
                            <span className="truncate max-w-[150px]">{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            <Phone className="w-3.5 h-3.5 text-[#52665a]" />
                            <span>{customer.phone}</span>
                          </div>
                          {customer.whatsapp && (
                            <div className="flex items-center gap-1.5 text-xs text-green-600" style={{ fontFamily: FONT_FAMILY_INTER }}>
                              <Smartphone className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            <Globe className="w-3.5 h-3.5 text-[#52665a]" />
                            <span>{customer.country}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            <MapPin className="w-3.5 h-3.5 text-[#52665a]" />
                            <span>{customer.city}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>
                          <Calendar className="w-3.5 h-3.5 text-[#52665a]" />
                          <span>{formatDate(customer.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewModal({ isOpen: true, customer })}
                            className="p-1.5 text-[#52665a]/60 hover:text-[#52665a] hover:bg-[#f7f4ef] rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {canEdit && (
                            <button
                              onClick={() => handleEditClick(customer)}
                              className="p-1.5 text-[#52665a]/60 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit customer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          {canDelete && (
                            <button
                              onClick={() => setDeleteModal({ 
                                isOpen: true, 
                                customerId: customer._id, 
                                customerName: customer.contactPerson 
                              })}
                              className="p-1.5 text-[#52665a]/60 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete customer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && customers.length > 0 && (
            <div className="px-4 py-3 border-t border-[#e2e3dd]/60 flex items-center justify-between bg-[#f7f4ef]">
              <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>
                Showing page <span className="font-medium text-[#52665a]">{currentPage}</span> of <span className="font-medium text-[#52665a]">{totalPages}</span>
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 border border-[#e2e3dd]/60 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f7f4ef] transition-colors bg-white"
                >
                  <ChevronLeft className="w-4 h-4 text-[#52665a]" />
                </button>
                <span className="px-3 py-1.5 bg-white border border-[#e2e3dd]/60 rounded-lg text-xs font-medium text-[#52665a]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 border border-[#e2e3dd]/60 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f7f4ef] transition-colors bg-white"
                >
                  <ChevronRight className="w-4 h-4 text-[#52665a]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {canDelete && deleteModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden border border-rose-100"
            >
              <div className="px-5 py-3 bg-rose-50 border-b border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Delete Customer</h3>
                </div>
                <button
                  onClick={() => setDeleteModal({ isOpen: false, customerId: null, customerName: '' })}
                  className="text-[#52665a]/40 hover:text-[#52665a]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5">
                <p className="text-sm text-[#29362f]/70 mb-3" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Are you sure you want to delete <span className="font-semibold text-[#52665a]">{deleteModal.customerName}</span>? 
                  This will permanently remove all customer data.
                </p>

                <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-800 flex items-start gap-1.5" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>This action cannot be undone. All customer history will be lost.</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDeleteModal({ isOpen: false, customerId: null, customerName: '' })}
                    className="flex-1 px-4 py-2 border border-[#e2e3dd]/60 rounded-lg hover:bg-[#f7f4ef] text-sm font-medium text-[#29362f]"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-1.5 shadow-md"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    <UserX className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* View Customer Details Modal */}
        {viewModal.isOpen && viewModal.customer && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-2xl w-full shadow-xl overflow-hidden border border-[#e2e3dd]/60"
            >
              <div className="px-5 py-3 bg-[#f7f4ef] border-b border-[#e2e3dd]/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#52665a] to-[#71816F] flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Customer Details</h3>
                </div>
                <button
                  onClick={() => setViewModal({ isOpen: false, customer: null })}
                  className="text-[#52665a]/40 hover:text-[#52665a]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <h4 className="text-xs font-semibold text-[#52665a] uppercase tracking-wider mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Basic Information</h4>
                    <div className="bg-[#f7f4ef] rounded-lg p-3 border border-[#e2e3dd]/60">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Contact Person</p>
                          <p className="text-sm font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{viewModal.customer.contactPerson}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Status</p>
                          <p className={`text-sm font-medium ${viewModal.customer.isActive ? 'text-green-600' : 'text-red-600'}`} style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {viewModal.customer.isActive ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <h4 className="text-xs font-semibold text-[#52665a] uppercase tracking-wider mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Contact Information</h4>
                    <div className="bg-[#f7f4ef] rounded-lg p-3 border border-[#e2e3dd]/60 space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#52665a]" />
                        <div>
                          <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Email</p>
                          <p className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{viewModal.customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#52665a]" />
                        <div>
                          <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Phone</p>
                          <p className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{viewModal.customer.phone}</p>
                        </div>
                      </div>
                      {viewModal.customer.whatsapp && (
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-green-500" />
                          <div>
                            <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>WhatsApp</p>
                            <p className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{viewModal.customer.whatsapp}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#52665a]" />
                        <div>
                          <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Newsletter</p>
                          <p className={`text-sm font-medium ${viewModal.customer.isSubscribedToNewsletter ? 'text-green-600' : 'text-[#52665a]/60'}`} style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {viewModal.customer.isSubscribedToNewsletter ? 'Subscribed' : 'Not Subscribed'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <h4 className="text-xs font-semibold text-[#52665a] uppercase tracking-wider mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Address</h4>
                    <div className="bg-[#f7f4ef] rounded-lg p-3 border border-[#e2e3dd]/60 space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#52665a]" />
                        <div>
                          <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Address</p>
                          <p className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{viewModal.customer.address}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pl-6">
                        <div>
                          <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>City</p>
                          <p className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{viewModal.customer.city}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Country</p>
                          <p className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{viewModal.customer.country}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>ZIP</p>
                          <p className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{viewModal.customer.zipCode}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h4 className="text-xs font-semibold text-[#52665a] uppercase tracking-wider mb-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Account Information</h4>
                    <div className="bg-[#f7f4ef] rounded-lg p-3 border border-[#e2e3dd]/60">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Joined Date</p>
                          <p className="text-sm text-[#29362f] flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            <Calendar className="w-3.5 h-3.5 text-[#52665a]" />
                            {formatDate(viewModal.customer.createdAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Last Login</p>
                          <p className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {viewModal.customer.lastLogin ? formatDate(viewModal.customer.lastLogin) : 'Never'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-[#e2e3dd]/60 flex justify-end gap-2 bg-[#f7f4ef]">
                {canEdit && (
                  <button
                    onClick={() => {
                      setViewModal({ isOpen: false, customer: null });
                      handleEditClick(viewModal.customer);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all duration-300 text-sm font-medium flex items-center gap-2 shadow-md"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Customer
                  </button>
                )}
                <button
                  onClick={() => setViewModal({ isOpen: false, customer: null })}
                  className="px-4 py-2 bg-[#e2e3dd]/40 text-[#29362f] rounded-lg hover:bg-[#e2e3dd]/60 text-sm font-medium"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Customer Modal */}
        {canEdit && editModal.isOpen && editModal.customer && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-3xl w-full shadow-xl overflow-hidden max-h-[90vh] flex flex-col border border-[#e2e3dd]/60"
            >
              <div className="px-5 py-3 bg-[#f7f4ef] border-b border-[#e2e3dd]/60 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#52665a] to-[#71816F] flex items-center justify-center">
                    <Edit2 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Edit Customer</h3>
                </div>
                <button
                  onClick={() => setEditModal({ isOpen: false, customer: null })}
                  className="text-[#52665a]/40 hover:text-[#52665a]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <form onSubmit={handleEditCustomer}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Contact Person <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={editForm.contactPerson}
                        onChange={handleEditChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editModal.customer.email}
                        disabled
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg bg-[#f7f4ef] text-[#52665a]/60 cursor-not-allowed"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      />
                      <p className="text-xs text-[#52665a]/40 mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>Email cannot be changed</p>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Phone Number <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleEditChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={editForm.whatsapp}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Country <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={editForm.country}
                        onChange={handleEditChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        City <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={editForm.city}
                        onChange={handleEditChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Street Address <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={editForm.address}
                        onChange={handleEditChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        ZIP Code <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={editForm.zipCode}
                        onChange={handleEditChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={editForm.isActive}
                          onChange={handleEditChange}
                          className="w-4 h-4 rounded border-[#e2e3dd]/60 text-[#52665a] focus:ring-[#52665a]"
                        />
                        <span className="text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>Account Active</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-[#e2e3dd]/60">
                    <button
                      type="button"
                      onClick={() => setEditModal({ isOpen: false, customer: null })}
                      className="px-4 py-2 border border-[#e2e3dd]/60 rounded-lg text-sm font-medium text-[#29362f] hover:bg-[#f7f4ef] transition-colors"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isEditing}
                      className="px-4 py-2 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    >
                      {isEditing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* Create Customer Modal */}
        {canEdit && createModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-3xl w-full shadow-xl overflow-hidden max-h-[90vh] flex flex-col border border-[#e2e3dd]/60"
            >
              <div className="px-5 py-3 bg-[#f7f4ef] border-b border-[#e2e3dd]/60 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#52665a] to-[#71816F] flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Create New Customer</h3>
                </div>
                <button
                  onClick={() => setCreateModal({ isOpen: false })}
                  className="text-[#52665a]/40 hover:text-[#52665a]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <form onSubmit={handleCreateCustomer}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Contact Person <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={createForm.contactPerson}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Email Address <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={createForm.email}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Phone Number <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={createForm.phone}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={createForm.whatsapp}
                        onChange={handleCreateChange}
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Country <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={createForm.country}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                        placeholder="Bangladesh"
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        City <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={createForm.city}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                        placeholder="Dhaka"
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Street Address <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={createForm.address}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                        placeholder="Your street address"
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        ZIP Code <span className="text-[#52665a]">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={createForm.zipCode}
                        onChange={handleCreateChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                        placeholder="10001"
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Password <span className="text-[#52665a]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={createForm.password}
                          onChange={handleCreateChange}
                          required
                          minLength="8"
                          className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent pr-10 transition-all bg-white hover:border-[#52665a]/30"
                          style={{ fontFamily: FONT_FAMILY_INTER }}
                          placeholder="Min. 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#52665a]/40 hover:text-[#52665a]"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Confirm Password <span className="text-[#52665a]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={createForm.confirmPassword}
                          onChange={handleCreateChange}
                          required
                          minLength="8"
                          className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent pr-10 transition-all bg-white hover:border-[#52665a]/30"
                          style={{ fontFamily: FONT_FAMILY_INTER }}
                          placeholder="Re-enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#52665a]/40 hover:text-[#52665a]"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-[#e2e3dd]/60">
                    <button
                      type="button"
                      onClick={() => setCreateModal({ isOpen: false })}
                      className="px-4 py-2 border border-[#e2e3dd]/60 rounded-lg text-sm font-medium text-[#29362f] hover:bg-[#f7f4ef] transition-colors"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="px-4 py-2 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    >
                      {isCreating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Create Customer
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* Password Reset Modal */}
        {canEdit && passwordModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden border border-amber-100"
            >
              <div className="px-5 py-3 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-amber-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Reset Password</h3>
                </div>
                <button
                  onClick={() => setPasswordModal({ isOpen: false, customerId: null, customerEmail: '' })}
                  className="text-[#52665a]/40 hover:text-[#52665a]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleResetPassword}>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                      New Password <span className="text-[#52665a]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        required
                        minLength="8"
                        className="w-full px-3 py-2 text-sm border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-10 transition-all bg-amber-50/30 hover:bg-white"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                        placeholder="Min. 8 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                      Confirm Password <span className="text-[#52665a]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmNewPassword ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                        minLength="8"
                        className="w-full px-3 py-2 text-sm border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-10 transition-all bg-amber-50/30 hover:bg-white"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                        placeholder="Re-enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600"
                      >
                        {showConfirmNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-[#f7f4ef] rounded-lg border border-[#52665a]/20">
                    <p className="text-xs text-[#29362f] flex items-start gap-1.5" style={{ fontFamily: FONT_FAMILY_INTER }}>
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#52665a]" />
                      <span>Customer will need to use this new password to login.</span>
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-amber-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setPasswordModal({ isOpen: false, customerId: null, customerEmail: '' })}
                    className="px-4 py-2 border border-amber-200 rounded-lg text-sm font-medium text-[#29362f] hover:bg-amber-50 transition-colors"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isResettingPassword}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    {isResettingPassword ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Reset Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}