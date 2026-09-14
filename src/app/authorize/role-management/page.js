
// // app/authorize/role-management/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   ShieldCheck, 
//   Users, 
//   Settings, 
//   Check, 
//   X, 
//   ChevronDown,
//   Search,
//   Filter,
//   RefreshCw,
//   UserCog,
//   Shield,
//   UserPlus,
//   UsersRound,
//   Headphones,
//   Lock,
//   Unlock,
//   Edit,
//   Trash2,
//   AlertCircle,
//   Save,
//   XCircle,
//   CheckCircle,
//   Clock,
//   Mail,
//   Phone,
//   Calendar,
//   Crown,
//   UserCheck,
//   ArrowUpDown,
//   Download,
//   Printer,
//   LayoutDashboard,
//   MessageSquare,
//   ShoppingBag,
//   Box,
//   Gift,
//   FolderPlus,
//   Tag,
//   Layers,
//   LayoutTemplate,
//   PanelTop,
//   Store,
//   Globe,
//   FileText,
//   Building2,
//   Code2,
//   Database,
//   Star,
//   Truck,
//   Images,
//   Menu,
//   Ban,
//   CircleAlert,
//   Bike,
//   ChartLine,
//   ChevronUp,
//   Zap
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ============================================
// // COMPLETE PAGE PERMISSIONS LIST
// // ============================================

// const PAGE_PERMISSIONS = {
//   // Dashboard
//   dashboard: { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Dashboard' },
//   profitMargin: { key: 'profit_margin', label: 'Profit Margin', icon: ChartLine, category: 'Dashboard' },
  
//   // Orders Group
//     createOrder: { key: 'create_order', label: 'Create Order', icon: ShoppingBag, category: 'Orders' },
//   allOrders: { key: 'all_orders', label: 'All Orders', icon: MessageSquare, category: 'Orders' },
//   incompleteOrders: { key: 'incomplete_orders', label: 'Incomplete Orders', icon: CircleAlert, category: 'Orders' },
//   orderRestrictions: { key: 'order_restrictions', label: 'Order Restrictions', icon: Ban, category: 'Orders' },
//   courierSettings: { key: 'courier_settings', label: 'Courier Settings', icon: Bike, category: 'Orders' },
//   courierScore: { key: 'courier_score', label: 'Courier Score', icon: Bike, category: 'Orders' },
  
//   // Products Group
//   allProducts: { key: 'all_products', label: 'All Products', icon: ShoppingBag, category: 'Products' },
//   createProducts: { key: 'create_products', label: 'Create Products', icon: Gift, category: 'Products' },
//   productCost: { key: 'product_cost', label: 'Cost Settings', icon: Gift, category: 'Products' },
//   createCategory: { key: 'create_category', label: 'Create Category', icon: FolderPlus, category: 'Products' },
//   manageBrands: { key: 'manage_brands', label: 'Manage Brands', icon: Tag, category: 'Products' },
//   manageTags: { key: 'manage_tags', label: 'Manage Tags', icon: Layers, category: 'Products' },
  
//   // Website Layout Group
//   manageNavbar: { key: 'manage_navbar', label: 'Manage Navbar', icon: Menu, category: 'Website Layout' },
//   createBanner: { key: 'create_banner', label: 'Create Banner', icon: PanelTop, category: 'Website Layout' },
//   manageBanner: { key: 'manage_banner', label: 'Manage Banner', icon: LayoutTemplate, category: 'Website Layout' },
//   manageHomepage: { key: 'manage_homepage', label: 'Manage Homepage', icon: Store, category: 'Website Layout' },
//   manageFooter: { key: 'manage_footer', label: 'Manage Footer', icon: Globe, category: 'Website Layout' },
//   termsManagement: { key: 'terms_management', label: 'Terms Management', icon: FileText, category: 'Website Layout' },
//   privacyManagement: { key: 'privacy_management', label: 'Privacy Management', icon: Shield, category: 'Website Layout' },
//   contactManagement: { key: 'contact_management', label: 'Contact Management', icon: Phone, category: 'Website Layout' },
//   aboutManagement: { key: 'about_management', label: 'About Management', icon: Building2, category: 'Website Layout' },
  
//   // Pixel Group
//   pixelSettings: { key: 'pixel_settings', label: 'Pixel Settings', icon: Database, category: 'Pixel' },
//   customCode: { key: 'custom_code', label: 'Custom Code', icon: Code2, category: 'Pixel' },
  
//   // Reviews
//   manageReviews: { key: 'manage_reviews', label: 'Manage Reviews', icon: Star, category: 'Reviews' },
  
//   // User Management Group
//   createUsers: { key: 'create_users', label: 'Create Users', icon: UserPlus, category: 'User Management' },
//   manageUsers: { key: 'manage_users', label: 'Manage Users', icon: UserCog, category: 'User Management' },
//   manageCustomers: { key: 'manage_customers', label: 'Create & Manage Customers', icon: UsersRound, category: 'User Management' },
//   roleManagement: { key: 'role_management', label: 'Role Management', icon: ShieldCheck, category: 'User Management' },
  
//   // Settings
//   deliverySettings: { key: 'delivery_settings', label: 'Delivery Settings', icon: Truck, category: 'Settings' },
//   mediaLibrary: { key: 'media_library', label: 'Media Library', icon: Images, category: 'Settings' },
//   emailSettings: { key: 'email_settings', label: 'Email Settings', icon: Mail, category: 'Settings' },
//   settings: { key: 'settings', label: 'Settings', icon: Settings, category: 'Settings' }
// };

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// const getRoleColor = (role) => {
//   const colors = {
//     super_admin: 'text-purple-600 bg-purple-100 border-purple-200',
//     admin: 'text-blue-600 bg-blue-100 border-blue-200',
//     moderator: 'text-gray-600 bg-gray-100 border-gray-200',
//     call_center_agent: 'text-green-600 bg-green-100 border-green-200',
//     customer: 'text-gray-600 bg-gray-100 border-gray-200'
//   };
//   return colors[role] || colors.customer;
// };

// const getRoleBadge = (role) => {
//   const badges = {
//     super_admin: { icon: Crown, label: 'Super Admin', color: 'purple' },
//     admin: { icon: UsersRound, label: 'Admin', color: 'blue' },
//     moderator: { icon: Shield, label: 'Moderator', color: 'gray' },
//     call_center_agent: { icon: Headphones, label: 'Call Center', color: 'green' },
//     customer: { icon: Users, label: 'Customer', color: 'gray' }
//   };
//   return badges[role] || badges.customer;
// };

// const getStatusBadge = (isActive) => {
//   return {
//     icon: isActive ? CheckCircle : XCircle,
//     label: isActive ? 'Active' : 'Inactive',
//     color: isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
//   };
// };

// const formatDate = (date) => {
//   if (!date) return 'N/A';
//   return new Date(date).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// // ============================================
// // MAIN COMPONENT
// // ============================================

// export default function RoleManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRole, setSelectedRole] = useState('all');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [editingUser, setEditingUser] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deletingUser, setDeletingUser] = useState(null);
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [notification, setNotification] = useState(null);
//   const router = useRouter();

//   // ✅ ONLY these roles are allowed in Role Management
//   const ALLOWED_ROLES = ['super_admin', 'admin', 'moderator'];

//   // Role options
//   const roles = [
//     { value: 'super_admin', label: 'Super Admin', color: 'purple', icon: Crown, level: 5 },
//     { value: 'admin', label: 'Admin', color: 'blue', icon: UsersRound, level: 4 },
//     { value: 'moderator', label: 'Moderator', color: 'gray', icon: Shield, level: 3 }
//   ];

//   // Get all page keys for dashboard access
//   const allPageKeys = Object.values(PAGE_PERMISSIONS).map(p => p.key);
  
//   // Group permissions by category
//   const groupedPermissions = Object.values(PAGE_PERMISSIONS).reduce((acc, perm) => {
//     if (!acc[perm.category]) acc[perm.category] = [];
//     acc[perm.category].push(perm);
//     return acc;
//   }, {});

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles/users`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const allUsers = data.data || [];
//         const filteredUsers = allUsers.filter(user => 
//           ALLOWED_ROLES.includes(user.role)
//         );
//         setUsers(filteredUsers);
//       } else if (response.status === 403) {
//         showNotification('You do not have permission to manage roles', 'error');
//         router.push('/authorize/dashboard');
//       } else {
//         showNotification('Failed to fetch users', 'error');
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       showNotification('Error loading users', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUserRole = async (userId, updates) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles/update/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(updates)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUsers(users.map(u => u._id === userId ? data.data : u));
//         setShowEditModal(false);
//         setEditingUser(null);
//         showNotification('User permissions updated successfully!', 'success');
//       } else {
//         const error = await response.json();
//         showNotification(error.error || 'Failed to update user', 'error');
//       }
//     } catch (error) {
//       console.error('Error updating user:', error);
//       showNotification('Failed to update user', 'error');
//     }
//   };

//   const deleteUser = async (userId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         setUsers(users.filter(u => u._id !== userId));
//         setShowDeleteModal(false);
//         setDeletingUser(null);
//         showNotification('User deleted successfully', 'success');
//       } else {
//         const error = await response.json();
//         showNotification(error.error || 'Failed to delete user', 'error');
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       showNotification('Failed to delete user', 'error');
//     }
//   };

//   const toggleUserStatus = async (userId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}/toggle-status`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUsers(users.map(u => u._id === userId ? { ...u, isActive: data.data.isActive } : u));
//         showNotification(`User ${data.data.isActive ? 'activated' : 'deactivated'} successfully`, 'success');
//       } else {
//         const error = await response.json();
//         showNotification(error.error || 'Failed to toggle user status', 'error');
//       }
//     } catch (error) {
//       console.error('Error toggling user status:', error);
//       showNotification('Failed to toggle user status', 'error');
//     }
//   };

//   const showNotification = (message, type = 'info') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 5000);
//   };

//   const getFilteredUsers = () => {
//     return users
//       .filter(user => ALLOWED_ROLES.includes(user.role))
//       .filter(user => {
//         const matchesSearch = 
//           user.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.phone?.includes(searchTerm);
        
//         const matchesRole = selectedRole === 'all' || user.role === selectedRole;
//         const matchesStatus = selectedStatus === 'all' || 
//           (selectedStatus === 'active' && user.isActive) ||
//           (selectedStatus === 'inactive' && !user.isActive);
        
//         return matchesSearch && matchesRole && matchesStatus;
//       })
//       .sort((a, b) => {
//         if (sortBy === 'createdAt') {
//           return sortOrder === 'desc' 
//             ? new Date(b.createdAt) - new Date(a.createdAt)
//             : new Date(a.createdAt) - new Date(b.createdAt);
//         }
//         if (sortBy === 'contactPerson') {
//           return sortOrder === 'desc'
//             ? (b.contactPerson || '').localeCompare(a.contactPerson || '')
//             : (a.contactPerson || '').localeCompare(b.contactPerson || '');
//         }
//         return 0;
//       });
//   };

//   const filteredUsers = getFilteredUsers();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading users...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="role_management">
//       <div className="min-h-screen bg-white">
//         {/* Header - Black & Blue Theme */}
//         <div className="bg-white border-b border-blue-600/20 shadow-lg sticky top-0 z-10">
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
              
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <ShieldCheck className="w-6 h-6 text-blue-400" />
//                     <h1 className="text-xl font-bold text-black">Role Management</h1>
//                   </div>
//                   <p className="text-sm text-black/70 mt-1">Manage page-level permissions for admin and moderator roles</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="text-sm text-black/70 bg-blue-600/20 px-3 py-1 rounded-lg border border-blue-600/20">
//                   <Zap className="w-3 h-3 inline mr-1 text-blue-400" />
//                   {users.length} users • {Object.keys(PAGE_PERMISSIONS).length} pages
//                 </span>
//                 <a
//                   href="/authorize/create-users"
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-semibold"
//                 >
//                   <UserPlus className="w-4 h-4" />
//                   Create Staff
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Notification */}
//         {notification && (
//           <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-xl shadow-lg ${
//             notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
//             notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
//             'bg-blue-50 border-blue-200 text-blue-800'
//           } border`}>
//             <div className="flex items-center gap-3">
//               {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
//               {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
//               <p>{notification.message}</p>
//               <button 
//                 onClick={() => setNotification(null)}
//                 className="ml-auto text-gray-400 hover:text-gray-600"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="p-6">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {roles.map(role => {
//               const count = users.filter(u => u.role === role.value).length;
//               const activeCount = users.filter(u => u.role === role.value && u.isActive).length;
//               const Icon = role.icon;
//               const percentage = count > 0 ? Math.round((activeCount / count) * 100) : 0;
              
//               return (
//                 <div key={role.value} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
//                   <div className="flex items-center gap-3">
//                     <div className={`p-2 rounded-lg ${
//                       role.value === 'super_admin' ? 'bg-purple-50' :
//                       role.value === 'admin' ? 'bg-blue-50' :
//                       'bg-gray-50'
//                     }`}>
//                       <Icon className={`w-5 h-5 ${
//                         role.value === 'super_admin' ? 'text-purple-500' :
//                         role.value === 'admin' ? 'text-blue-500' :
//                         'text-gray-500'
//                       }`} />
//                     </div>
//                     <div>
//                       <p className="text-2xl font-bold text-gray-900">{count}</p>
//                       <p className="text-xs text-gray-500">{role.label}</p>
//                     </div>
//                   </div>
//                   {count > 0 && (
//                     <div className="mt-2 flex items-center gap-2">
//                       <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
//                         <div 
//                           className={`h-full ${
//                             role.value === 'super_admin' ? 'bg-purple-500' :
//                             role.value === 'admin' ? 'bg-blue-500' :
//                             'bg-gray-500'
//                           } rounded-full transition-all`}
//                           style={{ width: `${percentage}%` }}
//                         />
//                       </div>
//                       <span className="text-xs text-gray-500">{percentage}% active</span>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Filters */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
//             <div className="flex flex-col md:flex-row gap-3">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by name or email..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white hover:border-gray-400"
//                 />
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 <select
//                   value={selectedRole}
//                   onChange={(e) => setSelectedRole(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-sm"
//                 >
//                   <option value="all">All Roles</option>
//                   {roles.map(role => (
//                     <option key={role.value} value={role.value}>{role.label}</option>
//                   ))}
//                 </select>
//                 <select
//                   value={selectedStatus}
//                   onChange={(e) => setSelectedStatus(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-sm"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//                 <button
//                   onClick={fetchUsers}
//                   className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 hover:text-blue-600"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Users Table */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                       <div className="flex items-center gap-1 cursor-pointer" onClick={() => {
//                         if (sortBy === 'contactPerson') {
//                           setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
//                         } else {
//                           setSortBy('contactPerson');
//                           setSortOrder('asc');
//                         }
//                       }}>
//                         User
//                         <ArrowUpDown className="w-3 h-3" />
//                       </div>
//                     </th>
//                     <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Role</th>
//                     <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
//                     <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Joined</th>
//                     <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {filteredUsers.map((user) => {
//                     const roleBadge = getRoleBadge(user.role);
//                     const RoleIcon = roleBadge.icon;
//                     const statusBadge = getStatusBadge(user.isActive);
//                     const StatusIcon = statusBadge.icon;
//                     const isProtected = user.role === 'super_admin';
                    
//                     return (
//                       <tr key={user._id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-4 py-2.5">
//                           <div className="flex items-center gap-2">
//                             <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-xs ${
//                               user.role === 'super_admin' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
//                               user.role === 'admin' ? 'bg-blue-600' :
//                               'bg-gray-600'
//                             }`}>
//                               {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-900 text-sm">{user.contactPerson || 'Unknown'}</p>
//                               <p className="text-xs text-gray-500 truncate max-w-[150px]">{user.email}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-2.5">
//                           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
//                             <RoleIcon className="w-3 h-3" />
//                             {roleBadge.label}
//                           </span>
//                         </td>
//                         <td className="px-4 py-2.5">
//                           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusBadge.color}`}>
//                             <StatusIcon className="w-3 h-3" />
//                             {statusBadge.label}
//                           </span>
//                         </td>
//                         <td className="px-4 py-2.5 text-xs text-gray-500">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3" />
//                             {formatDate(user.createdAt)}
//                           </div>
//                         </td>
//                         <td className="px-4 py-2.5 text-right">
//                           <div className="flex items-center justify-end gap-1">
//                             <button
//                               onClick={() => toggleUserStatus(user._id)}
//                               className={`p-1.5 rounded-lg transition-colors ${
//                                 user.isActive 
//                                   ? 'text-red-500 hover:bg-red-100' 
//                                   : 'text-green-500 hover:bg-green-100'
//                               }`}
//                               title={user.isActive ? 'Deactivate' : 'Activate'}
//                               disabled={isProtected}
//                             >
//                               {user.isActive ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
//                             </button>
                            
//                             {!isProtected && (
//                               <>
//                                 <button
//                                   onClick={() => {
//                                     setEditingUser(user);
//                                     setShowEditModal(true);
//                                   }}
//                                   className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                   title="Edit Permissions"
//                                 >
//                                   <Edit className="w-3.5 h-3.5" />
//                                 </button>
//                                 <button
//                                   onClick={() => {
//                                     setDeletingUser(user);
//                                     setShowDeleteModal(true);
//                                   }}
//                                   className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
//                                   title="Delete User"
//                                 >
//                                   <Trash2 className="w-3.5 h-3.5" />
//                                 </button>
//                               </>
//                             )}
                            
//                             {isProtected && (
//                               <span className="text-xs text-gray-400 flex items-center gap-1">
//                                 <Crown className="w-3 h-3 text-yellow-500" />
//                                 Protected
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
            
//             {filteredUsers.length === 0 && (
//               <div className="text-center py-12">
//                 <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500 font-medium">No admin users found</p>
//                 <p className="text-gray-400 text-sm">Create a new admin or moderator account</p>
//               </div>
//             )}
            
//             {/* Table Footer */}
//             <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-xs">
//               <span className="text-gray-500">
//                 Showing {filteredUsers.length} of {users.length} admin users
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Edit Modal */}
//         {showEditModal && editingUser && (
//           <EditPermissionsModal
//             user={editingUser}
//             onClose={() => {
//               setShowEditModal(false);
//               setEditingUser(null);
//             }}
//             onSave={updateUserRole}
//             roles={roles}
//             groupedPermissions={groupedPermissions}
//             allPageKeys={allPageKeys}
//             getRoleColor={getRoleColor}
//           />
//         )}

//         {/* Delete Modal */}
//         {showDeleteModal && deletingUser && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
//             <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-red-100">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <AlertCircle className="w-8 h-8 text-red-500" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">Delete User</h3>
//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to delete <strong>{deletingUser.contactPerson}</strong>? 
//                   This action cannot be undone.
//                 </p>
//                 <div className="flex gap-3 justify-center">
//                   <button
//                     onClick={() => setShowDeleteModal(false)}
//                     className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => deleteUser(deletingUser._id)}
//                     className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                   >
//                     Delete User
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </ProtectedRoute>
//   );
// }

// // ============================================
// // EDIT PERMISSIONS MODAL - Black & Blue Theme
// // ============================================
// function EditPermissionsModal({ 
//   user, 
//   onClose, 
//   onSave, 
//   roles, 
//   groupedPermissions,
//   allPageKeys,
//   getRoleColor 
// }) {
//   const [selectedRole, setSelectedRole] = useState(user.role);
//   const [selectedPages, setSelectedPages] = useState(user.dashboardAccess || []);
//   const [isActive, setIsActive] = useState(user.isActive);
//   const [loading, setLoading] = useState(false);
//   const [expandedCategories, setExpandedCategories] = useState(
//     Object.keys(groupedPermissions).reduce((acc, cat) => ({ ...acc, [cat]: true }), {})
//   );

//   const toggleCategory = (category) => {
//     setExpandedCategories(prev => ({
//       ...prev,
//       [category]: !prev[category]
//     }));
//   };

//   const togglePage = (pageKey) => {
//     setSelectedPages(prev =>
//       prev.includes(pageKey)
//         ? prev.filter(p => p !== pageKey)
//         : [...prev, pageKey]
//     );
//   };

//   const toggleAllPages = () => {
//     if (selectedPages.length === allPageKeys.length) {
//       setSelectedPages([]);
//     } else {
//       setSelectedPages([...allPageKeys]);
//     }
//   };

//   const toggleCategoryPages = (category) => {
//     const categoryPages = groupedPermissions[category]?.map(p => p.key) || [];
//     const allSelected = categoryPages.every(key => selectedPages.includes(key));
    
//     if (allSelected) {
//       setSelectedPages(prev => prev.filter(key => !categoryPages.includes(key)));
//     } else {
//       const newPages = [...new Set([...selectedPages, ...categoryPages])];
//       setSelectedPages(newPages);
//     }
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     await onSave(user._id, {
//       role: selectedRole,
//       dashboardAccess: selectedPages,
//       isActive: isActive
//     });
//     setLoading(false);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col border border-gray-200">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 flex-shrink-0">
//           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//             <UserCog className="w-5 h-5 text-blue-600" />
//             Edit Permissions: {user.contactPerson}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Content area */}
//         <div className="flex-1 overflow-y-auto p-6 pb-8">
//           {/* User Info */}
//           <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200 flex-shrink-0">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
//                 {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-900 text-lg">{user.contactPerson || 'Unknown'}</p>
//                 <p className="text-sm text-gray-500">{user.email}</p>
//                 <p className="text-sm text-gray-400">Current role: {roles.find(r => r.value === user.role)?.label || user.role}</p>
//               </div>
//               <div className="ml-auto">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
//                   {selectedPages.length} pages selected
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Role Selection */}
//           <div className="mb-6 flex-shrink-0">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <Shield className="w-4 h-4 inline mr-1" />
//               Change Role
//             </label>
//             <div className="grid grid-cols-2 gap-2">
//               {roles.filter(r => r.value !== 'super_admin').map(role => (
//                 <button
//                   key={role.value}
//                   onClick={() => setSelectedRole(role.value)}
//                   className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
//                     selectedRole === role.value
//                       ? `border-${role.color === 'blue' ? 'blue' : 'gray'}-500 bg-${role.color === 'blue' ? 'blue' : 'gray'}-50 text-${role.color === 'blue' ? 'blue' : 'gray'}-700 shadow-sm`
//                       : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <role.icon className={`w-4 h-4 inline mr-2 ${
//                     selectedRole === role.value ? `text-${role.color === 'blue' ? 'blue' : 'gray'}-500` : 'text-gray-400'
//                   }`} />
//                   {role.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Account Status */}
//           <div className="mb-6 flex-shrink-0">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               <UserCheck className="w-4 h-4 inline mr-1" />
//               Account Status
//             </label>
//             <div className="flex gap-4">
//               <button
//                 onClick={() => setIsActive(true)}
//                 className={`flex-1 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
//                   isActive
//                     ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
//                     : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 <CheckCircle className="w-4 h-4" />
//                 Active
//               </button>
//               <button
//                 onClick={() => setIsActive(false)}
//                 className={`flex-1 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
//                   !isActive
//                     ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
//                     : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 <XCircle className="w-4 h-4" />
//                 Inactive
//               </button>
//             </div>
//           </div>

//           {/* Page Permissions */}
//           <div>
//             <div className="flex items-center justify-between mb-4">
//               <label className="text-lg font-semibold text-gray-900">
//                 <LayoutDashboard className="w-5 h-5 inline mr-2" />
//                 Page Access Permissions
//               </label>
//               <button
//                 onClick={toggleAllPages}
//                 className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
//               >
//                 {selectedPages.length === allPageKeys.length ? 'Deselect All' : 'Select All'}
//               </button>
//             </div>

//             <div className="space-y-4">
//               {Object.entries(groupedPermissions).map(([category, pages]) => {
//                 const categoryPageKeys = pages.map(p => p.key);
//                 const allSelected = categoryPageKeys.every(key => selectedPages.includes(key));
//                 const someSelected = categoryPageKeys.some(key => selectedPages.includes(key));
                
//                 return (
//                   <div key={category} className="border border-gray-200 rounded-xl overflow-hidden">
//                     <div
//                       onClick={() => toggleCategory(category)}
//                       className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className="font-medium text-gray-900">{category}</span>
//                         <span className={`text-xs px-2 py-0.5 rounded-full ${
//                           allSelected ? 'bg-green-100 text-green-700' :
//                           someSelected ? 'bg-yellow-100 text-yellow-700' :
//                           'bg-gray-100 text-gray-500'
//                         }`}>
//                           {categoryPageKeys.filter(k => selectedPages.includes(k)).length}/{categoryPageKeys.length}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleCategoryPages(category);
//                           }}
//                           className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
//                         >
//                           {allSelected ? 'Deselect All' : 'Select All'}
//                         </span>
//                         {expandedCategories[category] ? (
//                           <ChevronUp className="w-4 h-4 text-gray-400" />
//                         ) : (
//                           <ChevronDown className="w-4 h-4 text-gray-400" />
//                         )}
//                       </div>
//                     </div>
                    
//                     {expandedCategories[category] && (
//                       <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//                         {pages.map(page => {
//                           const IconComponent = page.icon;
//                           return (
//                             <label
//                               key={page.key}
//                               className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all ${
//                                 selectedPages.includes(page.key) 
//                                   ? 'border-blue-300 bg-blue-50 shadow-sm' 
//                                   : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                               }`}
//                             >
//                               <input
//                                 type="checkbox"
//                                 checked={selectedPages.includes(page.key)}
//                                 onChange={() => togglePage(page.key)}
//                                 className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600"
//                               />
//                               <span className="text-sm flex items-center gap-1.5">
//                                 {IconComponent && <IconComponent className="w-4 h-4 text-gray-500" />}
//                                 {page.label}
//                               </span>
//                             </label>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 flex justify-end gap-3 flex-shrink-0 z-10">
//           <button
//             onClick={onClose}
//             className="px-6 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium"
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-opacity shadow-md font-medium flex items-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4" />
//                 Save Permissions
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// app/authorize/role-management/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Settings, 
  Check, 
  X, 
  ChevronDown,
  Search,
  Filter,
  RefreshCw,
  UserCog,
  Shield,
  UserPlus,
  UsersRound,
  Headphones,
  Lock,
  Unlock,
  Edit,
  Trash2,
  AlertCircle,
  Save,
  XCircle,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Calendar,
  Crown,
  UserCheck,
  ArrowUpDown,
  Download,
  Printer,
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  Box,
  Gift,
  FolderPlus,
  Tag,
  Layers,
  LayoutTemplate,
  PanelTop,
  Store,
  Globe,
  FileText,
  Building2,
  Code2,
  Database,
  Star,
  Truck,
  Images,
  Menu,
  Ban,
  CircleAlert,
  Bike,
  ChartLine,
  ChevronUp,
  Zap,
  Award
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================
// COMPLETE PAGE PERMISSIONS LIST
// ============================================

const PAGE_PERMISSIONS = {
  // Dashboard
  dashboard: { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Dashboard' },
  profitMargin: { key: 'profit_margin', label: 'Profit Margin', icon: ChartLine, category: 'Dashboard' },
  
  // Orders Group
  createOrder: { key: 'create_order', label: 'Create Order', icon: ShoppingBag, category: 'Orders' },
  allOrders: { key: 'all_orders', label: 'All Orders', icon: MessageSquare, category: 'Orders' },
  incompleteOrders: { key: 'incomplete_orders', label: 'Incomplete Orders', icon: CircleAlert, category: 'Orders' },
  orderRestrictions: { key: 'order_restrictions', label: 'Order Restrictions', icon: Ban, category: 'Orders' },
  courierSettings: { key: 'courier_settings', label: 'Courier Settings', icon: Bike, category: 'Orders' },
  courierScore: { key: 'courier_score', label: 'Courier Score', icon: Bike, category: 'Orders' },
  
  // Products Group
  allProducts: { key: 'all_products', label: 'All Products', icon: ShoppingBag, category: 'Products' },
  createProducts: { key: 'create_products', label: 'Create Products', icon: Gift, category: 'Products' },
  productCost: { key: 'product_cost', label: 'Cost Settings', icon: Gift, category: 'Products' },
  createCategory: { key: 'create_category', label: 'Create Category', icon: FolderPlus, category: 'Products' },
  manageBrands: { key: 'manage_brands', label: 'Manage Brands', icon: Tag, category: 'Products' },
  manageTags: { key: 'manage_tags', label: 'Manage Tags', icon: Layers, category: 'Products' },
  
  // Website Layout Group
  manageNavbar: { key: 'manage_navbar', label: 'Manage Navbar', icon: Menu, category: 'Website Layout' },
  createBanner: { key: 'create_banner', label: 'Create Banner', icon: PanelTop, category: 'Website Layout' },
  manageBanner: { key: 'manage_banner', label: 'Manage Banner', icon: LayoutTemplate, category: 'Website Layout' },
  manageHomepage: { key: 'manage_homepage', label: 'Manage Homepage', icon: Store, category: 'Website Layout' },
  manageFooter: { key: 'manage_footer', label: 'Manage Footer', icon: Globe, category: 'Website Layout' },
   manageWhyChooseUs: { key: 'manage_why_choose_us', label: 'Manage Why Choose Us', icon: Shield, category: 'Website Layout' },
  termsManagement: { key: 'terms_management', label: 'Terms Management', icon: FileText, category: 'Website Layout' },
    trustResultsManagement: { 
    key: 'trust_results_management', 
    label: 'Trust Results', 
    icon: Award,  // or ShieldCheck, add to imports
    category: 'Website Layout' 
  },
  dealManagement: { 
    key: 'deal_management', 
    label: 'Deal Management', 
    icon: Gift,  // add GiftIcon or Gift to imports
    category: 'Website Layout' 
  },
  privacyManagement: { key: 'privacy_management', label: 'Privacy Management', icon: Shield, category: 'Website Layout' },
  contactManagement: { key: 'contact_management', label: 'Contact Management', icon: Phone, category: 'Website Layout' },
  aboutManagement: { key: 'about_management', label: 'About Management', icon: Building2, category: 'Website Layout' },
  
  // Pixel Group
  pixelSettings: { key: 'pixel_settings', label: 'Pixel Settings', icon: Database, category: 'Pixel' },
  customCode: { key: 'custom_code', label: 'Custom Code', icon: Code2, category: 'Pixel' },
  
  // Reviews
  manageReviews: { key: 'manage_reviews', label: 'Manage Reviews', icon: Star, category: 'Reviews' },
  
  // User Management Group
  createUsers: { key: 'create_users', label: 'Create Users', icon: UserPlus, category: 'User Management' },
  manageUsers: { key: 'manage_users', label: 'Manage Users', icon: UserCog, category: 'User Management' },
  manageCustomers: { key: 'manage_customers', label: 'Create & Manage Customers', icon: UsersRound, category: 'User Management' },
  roleManagement: { key: 'role_management', label: 'Role Management', icon: ShieldCheck, category: 'User Management' },
  
  // Settings
  deliverySettings: { key: 'delivery_settings', label: 'Delivery Settings', icon: Truck, category: 'Settings' },
  mediaLibrary: { key: 'media_library', label: 'Media Library', icon: Images, category: 'Settings' },
  emailSettings: { key: 'email_settings', label: 'Email Settings', icon: Mail, category: 'Settings' },
  settings: { key: 'settings', label: 'Settings', icon: Settings, category: 'Settings' }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const getRoleColor = (role) => {
  const colors = {
    super_admin: 'text-purple-600 bg-purple-100 border-purple-200',
    admin: 'text-[#718369] bg-[#FFF5F6] border-[#718369]/30',
    moderator: 'text-[#2D1B2E] bg-[#F7C7D3]/20 border-[#2D1B2E]/20',
    call_center_agent: 'text-green-600 bg-green-100 border-green-200',
    customer: 'text-gray-600 bg-gray-100 border-gray-200'
  };
  return colors[role] || colors.customer;
};

const getRoleBadge = (role) => {
  const badges = {
    super_admin: { icon: Crown, label: 'Super Admin', color: 'purple' },
    admin: { icon: UsersRound, label: 'Admin', color: 'pink' },
    moderator: { icon: Shield, label: 'Moderator', color: 'dark' },
    call_center_agent: { icon: Headphones, label: 'Call Center', color: 'green' },
    customer: { icon: Users, label: 'Customer', color: 'gray' }
  };
  return badges[role] || badges.customer;
};

const getStatusBadge = (isActive) => {
  return {
    icon: isActive ? CheckCircle : XCircle,
    label: isActive ? 'Active' : 'Inactive',
    color: isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
  };
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function RoleManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  // ✅ ONLY these roles are allowed in Role Management
  const ALLOWED_ROLES = ['super_admin', 'admin', 'moderator'];

  // Role options
  const roles = [
    { value: 'super_admin', label: 'Super Admin', color: 'purple', icon: Crown, level: 5 },
    { value: 'admin', label: 'Admin', color: 'pink', icon: UsersRound, level: 4 },
    { value: 'moderator', label: 'Moderator', color: 'dark', icon: Shield, level: 3 }
  ];

  // Get all page keys for dashboard access
  const allPageKeys = Object.values(PAGE_PERMISSIONS).map(p => p.key);
  
  // Group permissions by category
  const groupedPermissions = Object.values(PAGE_PERMISSIONS).reduce((acc, perm) => {
    if (!acc[perm.category]) acc[perm.category] = [];
    acc[perm.category].push(perm);
    return acc;
  }, {});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const allUsers = data.data || [];
        const filteredUsers = allUsers.filter(user => 
          ALLOWED_ROLES.includes(user.role)
        );
        setUsers(filteredUsers);
      } else if (response.status === 403) {
        showNotification('You do not have permission to manage roles', 'error');
        router.push('/authorize/dashboard');
      } else {
        showNotification('Failed to fetch users', 'error');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('Error loading users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, updates) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(users.map(u => u._id === userId ? data.data : u));
        setShowEditModal(false);
        setEditingUser(null);
        showNotification('User permissions updated successfully!', 'success');
      } else {
        const error = await response.json();
        showNotification(error.error || 'Failed to update user', 'error');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification('Failed to update user', 'error');
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setUsers(users.filter(u => u._id !== userId));
        setShowDeleteModal(false);
        setDeletingUser(null);
        showNotification('User deleted successfully', 'success');
      } else {
        const error = await response.json();
        showNotification(error.error || 'Failed to delete user', 'error');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification('Failed to delete user', 'error');
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}/toggle-status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(users.map(u => u._id === userId ? { ...u, isActive: data.data.isActive } : u));
        showNotification(`User ${data.data.isActive ? 'activated' : 'deactivated'} successfully`, 'success');
      } else {
        const error = await response.json();
        showNotification(error.error || 'Failed to toggle user status', 'error');
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      showNotification('Failed to toggle user status', 'error');
    }
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const getFilteredUsers = () => {
    return users
      .filter(user => ALLOWED_ROLES.includes(user.role))
      .filter(user => {
        const matchesSearch = 
          user.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone?.includes(searchTerm);
        
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        const matchesStatus = selectedStatus === 'all' || 
          (selectedStatus === 'active' && user.isActive) ||
          (selectedStatus === 'inactive' && !user.isActive);
        
        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'createdAt') {
          return sortOrder === 'desc' 
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt);
        }
        if (sortBy === 'contactPerson') {
          return sortOrder === 'desc'
            ? (b.contactPerson || '').localeCompare(a.contactPerson || '')
            : (a.contactPerson || '').localeCompare(b.contactPerson || '');
        }
        return 0;
      });
  };

  const filteredUsers = getFilteredUsers();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5F6]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#718369] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="role_management">
      <div className="min-h-screen bg-white">
        {/* Header - Pink Theme */}
        <div className="bg-white border-b border-[#718369]/20 shadow-lg sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-[#718369]" />
                    <h1 className="text-xl font-bold text-[#2D1B2E]">Role Management</h1>
                  </div>
                  <p className="text-sm text-[#718369]/60 mt-1">Manage page-level permissions for admin and moderator roles</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#2D1B2E]/70 bg-[#FFF5F6] px-3 py-1 rounded-lg border border-[#718369]/20">
                  <Zap className="w-3 h-3 inline mr-1 text-[#718369]" />
                  {users.length} users • {Object.keys(PAGE_PERMISSIONS).length} pages
                </span>
                <a
                  href="/authorize/create-users"
                  className="flex items-center gap-2 px-4 py-2 bg-[#718369] text-white rounded-lg hover:shadow-lg hover:shadow-[#718369]/25 transition-all shadow-md font-semibold"
                >
                  <UserPlus className="w-4 h-4" />
                  Create Staff
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-xl shadow-lg ${
            notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          } border`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
              <p>{notification.message}</p>
              <button 
                onClick={() => setNotification(null)}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {roles.map(role => {
              const count = users.filter(u => u.role === role.value).length;
              const activeCount = users.filter(u => u.role === role.value && u.isActive).length;
              const Icon = role.icon;
              const percentage = count > 0 ? Math.round((activeCount / count) * 100) : 0;
              
              return (
                <div key={role.value} className="bg-white rounded-xl shadow-sm border border-[#F7C7D3]/40 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      role.value === 'super_admin' ? 'bg-purple-50' :
                      role.value === 'admin' ? 'bg-[#FFF5F6]' :
                      'bg-[#F7C7D3]/20'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        role.value === 'super_admin' ? 'text-purple-500' :
                        role.value === 'admin' ? 'text-[#718369]' :
                        'text-[#2D1B2E]'
                      }`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2D1B2E]">{count}</p>
                      <p className="text-xs text-[#718369]/60">{role.label}</p>
                    </div>
                  </div>
                  {count > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            role.value === 'super_admin' ? 'bg-purple-500' :
                            role.value === 'admin' ? 'bg-[#718369]' :
                            'bg-[#2D1B2E]'
                          } rounded-full transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#718369]/60">{percentage}% active</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-[#F7C7D3]/40 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#718369]/40" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#718369] focus:border-transparent bg-white hover:border-[#718369]/30"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#718369] focus:border-transparent bg-white text-sm"
                >
                  <option value="all">All Roles</option>
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#718369] focus:border-transparent bg-white text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button
                  onClick={fetchUsers}
                  className="px-3 py-2 bg-white border border-[#F7C7D3]/50 rounded-lg hover:bg-[#FFF5F6] transition-colors text-[#2D1B2E] hover:text-[#718369]"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-[#F7C7D3]/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#FFF5F6] border-b border-[#F7C7D3]/40">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#2D1B2E] uppercase tracking-wider">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => {
                        if (sortBy === 'contactPerson') {
                          setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                        } else {
                          setSortBy('contactPerson');
                          setSortOrder('asc');
                        }
                      }}>
                        User
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#2D1B2E] uppercase tracking-wider">Role</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#2D1B2E] uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#2D1B2E] uppercase tracking-wider">Joined</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-[#2D1B2E] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7C7D3]/20">
                  {filteredUsers.map((user) => {
                    const roleBadge = getRoleBadge(user.role);
                    const RoleIcon = roleBadge.icon;
                    const statusBadge = getStatusBadge(user.isActive);
                    const StatusIcon = statusBadge.icon;
                    const isProtected = user.role === 'super_admin';
                    
                    return (
                      <tr key={user._id} className="hover:bg-[#FFF5F6] transition-colors">
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-xs ${
                              user.role === 'super_admin' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                              user.role === 'admin' ? 'bg-[#718369]' :
                              'bg-[#2D1B2E]'
                            }`}>
                              {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-[#2D1B2E] text-sm">{user.contactPerson || 'Unknown'}</p>
                              <p className="text-xs text-[#718369]/40 truncate max-w-[150px]">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                            <RoleIcon className="w-3 h-3" />
                            {roleBadge.label}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusBadge.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusBadge.label}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-[#718369]/60">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#718369]" />
                            {formatDate(user.createdAt)}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => toggleUserStatus(user._id)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                user.isActive 
                                  ? 'text-red-500 hover:bg-red-100' 
                                  : 'text-green-500 hover:bg-green-100'
                              }`}
                              title={user.isActive ? 'Deactivate' : 'Activate'}
                              disabled={isProtected}
                            >
                              {user.isActive ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                            </button>
                            
                            {!isProtected && (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingUser(user);
                                    setShowEditModal(true);
                                  }}
                                  className="p-1.5 text-[#718369] hover:bg-[#FFF5F6] rounded-lg transition-colors"
                                  title="Edit Permissions"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setDeletingUser(user);
                                    setShowDeleteModal(true);
                                  }}
                                  className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                                  title="Delete User"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                            
                            {isProtected && (
                              <span className="text-xs text-[#718369]/60 flex items-center gap-1">
                                <Crown className="w-3 h-3 text-yellow-500" />
                                Protected
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-[#718369]/30 mx-auto mb-3" />
                <p className="text-[#2D1B2E] font-medium">No admin users found</p>
                <p className="text-[#718369]/60 text-sm">Create a new admin or moderator account</p>
              </div>
            )}
            
            {/* Table Footer */}
            <div className="px-4 py-2 border-t border-[#F7C7D3]/40 bg-[#FFF5F6] flex justify-between items-center text-xs">
              <span className="text-[#718369]/60">
                Showing {filteredUsers.length} of {users.length} admin users
              </span>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && editingUser && (
          <EditPermissionsModal
            user={editingUser}
            onClose={() => {
              setShowEditModal(false);
              setEditingUser(null);
            }}
            onSave={updateUserRole}
            roles={roles}
            groupedPermissions={groupedPermissions}
            allPageKeys={allPageKeys}
            getRoleColor={getRoleColor}
          />
        )}

        {/* Delete Modal */}
        {showDeleteModal && deletingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
            <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-red-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-[#2D1B2E] mb-2">Delete User</h3>
                <p className="text-[#2D1B2E]/70 mb-6">
                  Are you sure you want to delete <strong className="text-[#718369]">{deletingUser.contactPerson}</strong>? 
                  This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-6 py-2 text-[#2D1B2E] hover:bg-[#FFF5F6] rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteUser(deletingUser._id)}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete User
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

// ============================================
// EDIT PERMISSIONS MODAL - Pink Theme
// ============================================
function EditPermissionsModal({ 
  user, 
  onClose, 
  onSave, 
  roles, 
  groupedPermissions,
  allPageKeys,
  getRoleColor 
}) {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [selectedPages, setSelectedPages] = useState(user.dashboardAccess || []);
  const [isActive, setIsActive] = useState(user.isActive);
  const [loading, setLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(
    Object.keys(groupedPermissions).reduce((acc, cat) => ({ ...acc, [cat]: true }), {})
  );

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const togglePage = (pageKey) => {
    setSelectedPages(prev =>
      prev.includes(pageKey)
        ? prev.filter(p => p !== pageKey)
        : [...prev, pageKey]
    );
  };

  const toggleAllPages = () => {
    if (selectedPages.length === allPageKeys.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages([...allPageKeys]);
    }
  };

  const toggleCategoryPages = (category) => {
    const categoryPages = groupedPermissions[category]?.map(p => p.key) || [];
    const allSelected = categoryPages.every(key => selectedPages.includes(key));
    
    if (allSelected) {
      setSelectedPages(prev => prev.filter(key => !categoryPages.includes(key)));
    } else {
      const newPages = [...new Set([...selectedPages, ...categoryPages])];
      setSelectedPages(newPages);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    await onSave(user._id, {
      role: selectedRole,
      dashboardAccess: selectedPages,
      isActive: isActive
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col border border-[#F7C7D3]/40">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#F7C7D3]/40 px-6 py-4 flex items-center justify-between z-10 flex-shrink-0">
          <h2 className="text-xl font-bold text-[#2D1B2E] flex items-center gap-2">
            <UserCog className="w-5 h-5 text-[#718369]" />
            Edit Permissions: {user.contactPerson}
          </h2>
          <button onClick={onClose} className="text-[#718369]/40 hover:text-[#718369] transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6 pb-8">
          {/* User Info */}
          <div className="bg-[#FFF5F6] rounded-xl p-4 mb-6 border border-[#F7C7D3]/40 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#718369] flex items-center justify-center text-white font-bold text-xl">
                {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-[#2D1B2E] text-lg">{user.contactPerson || 'Unknown'}</p>
                <p className="text-sm text-[#718369]/60">{user.email}</p>
                <p className="text-sm text-[#718369]/40">Current role: {roles.find(r => r.value === user.role)?.label || user.role}</p>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                  {selectedPages.length} pages selected
                </span>
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-6 flex-shrink-0">
            <label className="block text-sm font-medium text-[#2D1B2E] mb-2">
              <Shield className="w-4 h-4 inline mr-1 text-[#718369]" />
              Change Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roles.filter(r => r.value !== 'super_admin').map(role => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                    selectedRole === role.value
                      ? role.value === 'admin'
                        ? 'border-[#718369] bg-[#FFF5F6] text-[#718369] shadow-sm'
                        : 'border-[#2D1B2E] bg-[#F7C7D3]/10 text-[#2D1B2E] shadow-sm'
                      : 'border-[#F7C7D3]/50 hover:border-[#718369]/30 text-[#2D1B2E] hover:bg-[#FFF5F6]'
                  }`}
                >
                  <role.icon className={`w-4 h-4 inline mr-2 ${
                    selectedRole === role.value 
                      ? role.value === 'admin' ? 'text-[#718369]' : 'text-[#2D1B2E]'
                      : 'text-[#718369]/40'
                  }`} />
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Account Status */}
          <div className="mb-6 flex-shrink-0">
            <label className="block text-sm font-medium text-[#2D1B2E] mb-2">
              <UserCheck className="w-4 h-4 inline mr-1 text-[#718369]" />
              Account Status
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setIsActive(true)}
                className={`flex-1 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                    : 'border-[#F7C7D3]/50 hover:border-[#718369]/30 text-[#2D1B2E] hover:bg-[#FFF5F6]'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Active
              </button>
              <button
                onClick={() => setIsActive(false)}
                className={`flex-1 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  !isActive
                    ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                    : 'border-[#F7C7D3]/50 hover:border-[#718369]/30 text-[#2D1B2E] hover:bg-[#FFF5F6]'
                }`}
              >
                <XCircle className="w-4 h-4" />
                Inactive
              </button>
            </div>
          </div>

          {/* Page Permissions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-[#2D1B2E]">
                <LayoutDashboard className="w-5 h-5 inline mr-2 text-[#718369]" />
                Page Access Permissions
              </label>
              <button
                onClick={toggleAllPages}
                className="px-3 py-1.5 text-sm bg-[#FFF5F6] text-[#718369] rounded-lg hover:bg-[#F7C7D3]/30 transition-colors"
              >
                {selectedPages.length === allPageKeys.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(groupedPermissions).map(([category, pages]) => {
                const categoryPageKeys = pages.map(p => p.key);
                const allSelected = categoryPageKeys.every(key => selectedPages.includes(key));
                const someSelected = categoryPageKeys.some(key => selectedPages.includes(key));
                
                return (
                  <div key={category} className="border border-[#F7C7D3]/40 rounded-xl overflow-hidden">
                    <div
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-[#FFF5F6] hover:bg-[#F7C7D3]/20 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-[#2D1B2E]">{category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          allSelected ? 'bg-green-100 text-green-700' :
                          someSelected ? 'bg-yellow-100 text-yellow-700' :
                          'bg-[#F7C7D3]/20 text-[#718369]/60'
                        }`}>
                          {categoryPageKeys.filter(k => selectedPages.includes(k)).length}/{categoryPageKeys.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategoryPages(category);
                          }}
                          className="text-xs text-[#718369] hover:text-[#718369]/80 font-medium cursor-pointer"
                        >
                          {allSelected ? 'Deselect All' : 'Select All'}
                        </span>
                        {expandedCategories[category] ? (
                          <ChevronUp className="w-4 h-4 text-[#718369]/40" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#718369]/40" />
                        )}
                      </div>
                    </div>
                    
                    {expandedCategories[category] && (
                      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {pages.map(page => {
                          const IconComponent = page.icon;
                          return (
                            <label
                              key={page.key}
                              className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-all ${
                                selectedPages.includes(page.key) 
                                  ? 'border-[#718369] bg-[#FFF5F6] shadow-sm' 
                                  : 'border-[#F7C7D3]/40 hover:border-[#718369]/30 hover:bg-[#FFF5F6]'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedPages.includes(page.key)}
                                onChange={() => togglePage(page.key)}
                                className="w-4 h-4 text-[#718369] rounded border-[#F7C7D3]/50 focus:ring-[#718369]"
                              />
                              <span className="text-sm flex items-center gap-1.5 text-[#2D1B2E]">
                                {IconComponent && <IconComponent className="w-4 h-4 text-[#718369]/60" />}
                                {page.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#FFF5F6] border-t border-[#F7C7D3]/40 px-6 py-4 flex justify-end gap-3 flex-shrink-0 z-10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-[#2D1B2E] hover:bg-[#F7C7D3]/20 rounded-lg transition-colors font-medium"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2.5 bg-[#718369] text-white rounded-lg hover:shadow-lg hover:shadow-[#718369]/25 transition-all shadow-md font-medium flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Permissions
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}