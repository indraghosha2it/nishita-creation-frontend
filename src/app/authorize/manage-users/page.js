
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import { 
//   Search, 
//   Plus, 
//   Edit2, 
//   Trash2, 
//   Shield, 
//   UserCog,
//   Mail,
//   Phone,
//   Smartphone,
//   ChevronLeft,
//   ChevronRight,
//   RefreshCw,
//   AlertTriangle,
//   X,
//   CheckCircle,
//   UserX,
//   Save,
//   Users,
//   Sparkles,
//   Gift,
//   Calendar,
//   MoreVertical,
//   Briefcase,
//   Heart,
//   Store,
//   Crown,
//   Headphones,
//   Zap,
//   UserCheck,
//   Clock,
//   EyeOff
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ✅ Helper to get user role
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

// export default function ManageUsers() {
//   const router = useRouter();
//   const userRole = getUserRole();
  
//   // ✅ Check if user has permission to access this page (Only Super Admin and Admin)
//   const hasAccess = userRole === 'super_admin' || userRole === 'admin';
  
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRole, setSelectedRole] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null, userName: '', userRole: '' });
//   const [editModal, setEditModal] = useState({ isOpen: false, user: null });
//   const [editFormData, setEditFormData] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     role: ''
//   });
//   const [roleStats, setRoleStats] = useState({
//     super_admin: 0,
//     admin: 0,
//     moderator: 0,
//     call_center_agent: 0,
//     customer: 0
//   });

//   const usersPerPage = 10;

//   // ✅ Redirect if no permission
//   useEffect(() => {
//     if (!hasAccess) {
//       toast.error('Access Denied', {
//         description: 'You do not have permission to manage users'
//       });
//     }
//   }, [hasAccess]);

//   // Get current user on mount
//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
    
//     if (userData && token) {
//       try {
//         const parsed = JSON.parse(userData);
//         setCurrentUser({
//           ...parsed,
//           id: parsed.id || parsed._id || parsed.userId
//         });
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//       }
//     }
//   }, []);

//   // Fetch users
//   useEffect(() => {
//     if (hasAccess) {
//       fetchUsers();
//     }
//   }, [currentPage, selectedRole, searchTerm, hasAccess]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const params = new URLSearchParams({
//         page: currentPage,
//         limit: usersPerPage,
//         role: selectedRole !== 'all' ? selectedRole : '',
//         search: searchTerm
//       });

//       const response = await fetch(`http://localhost:5000/api/admin/users?${params}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUsers(data.users);
//         setTotalPages(data.totalPages);
//         if (data.roleStats) {
//           setRoleStats(data.roleStats);
//         }
//       } else {
//         toast.error('Failed to fetch users');
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       toast.error('Connection Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:5000/api/admin/users/${deleteModal.userId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('User Deleted', {
//           description: `${deleteModal.userName} has been removed successfully`,
//         });
//         fetchUsers();
//         setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' });
//       } else {
//         toast.error('Delete Failed', {
//           description: data.error || 'Something went wrong'
//         });
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       toast.error('Connection Error');
//     }
//   };

//   const handleEdit = (user) => {
//     setEditFormData({
//       contactPerson: user.contactPerson,
//       email: user.email,
//       phone: user.phone,
//       whatsapp: user.whatsapp || '',
//       role: user.role
//     });
//     setEditModal({ isOpen: true, user });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
    
//     // ✅ Prevent Admin from assigning Super Admin role
//     if (userRole === 'admin' && editFormData.role === 'super_admin') {
//       toast.error('Permission Denied', {
//         description: 'You cannot assign Super Admin role'
//       });
//       return;
//     }
    
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(`http://localhost:5000/api/admin/users/${editModal.user._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(editFormData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('User Updated', {
//           description: `${editFormData.contactPerson}'s information has been updated`,
//         });
//         setEditModal({ isOpen: false, user: null });
//         fetchUsers();
//       } else {
//         toast.error('Update Failed', {
//           description: data.error || 'Something went wrong'
//         });
//       }
//     } catch (error) {
//       console.error('Error updating user:', error);
//       toast.error('Connection Error');
//     }
//   };

//   const isCurrentUser = (userId) => {
//     if (!currentUser || !userId) return false;
//     return (
//       currentUser.id === userId || 
//       currentUser._id === userId || 
//       currentUser.userId === userId
//     );
//   };

//   // ✅ Check if user can edit (Super Admin can edit anyone, Admin can edit everyone except Super Admin)
//   const canEditUser = (user) => {
//     if (userRole === 'super_admin') return true;
//     if (userRole === 'admin') {
//       // Admin cannot edit Super Admin accounts
//       return user.role !== 'super_admin';
//     }
//     return false;
//   };

//   // ✅ Check if user can delete (Super Admin can delete anyone, Admin can delete everyone except Super Admin and themselves)
//   const canDeleteUser = (user) => {
//     if (userRole === 'super_admin') return !isCurrentUser(user._id);
//     if (userRole === 'admin') {
//       // Admin cannot delete Super Admin accounts or their own account
//       return user.role !== 'super_admin' && !isCurrentUser(user._id);
//     }
//     return false;
//   };

//   // ✅ Get available roles for dropdown based on current user's role
//   const getAvailableRoles = () => {
//     const allRoles = [
//       { value: 'super_admin', label: 'Super Admin - Full System Access' },
//       { value: 'admin', label: 'Admin - Full Access' },
//       { value: 'moderator', label: 'Moderator - Limited Access' },
//       { value: 'call_center_agent', label: 'Call Center Agent - Support Access' }
//     ];
    
//     // Super Admin can see all roles
//     if (userRole === 'super_admin') return allRoles;
    
//     // Admin can see all roles except Super Admin
//     if (userRole === 'admin') {
//       return allRoles.filter(role => role.value !== 'super_admin');
//     }
    
//     return [];
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Never';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric'
//     });
//   };

//   const getRoleBadge = (role) => {
//     switch(role) {
//       case 'super_admin':
//         return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-300';
//       case 'admin':
//         return 'bg-[#FFF5F6] text-[#EE4275] border-[#EE4275]/30';
//       case 'moderator':
//         return 'bg-[#F7C7D3]/20 text-[#2D1B2E] border-[#2D1B2E]/20';
//       case 'call_center_agent':
//         return 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border-purple-300';
//       default:
//         return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const getRoleIcon = (role) => {
//     switch(role) {
//       case 'super_admin':
//         return <Crown className="w-3 h-3" />;
//       case 'admin':
//         return <Shield className="w-3 h-3" />;
//       case 'moderator':
//         return <Briefcase className="w-3 h-3" />;
//       case 'call_center_agent':
//         return <Headphones className="w-3 h-3" />;
//       default:
//         return <Users className="w-3 h-3" />;
//     }
//   };

//   const getRoleDisplayName = (role) => {
//     switch(role) {
//       case 'super_admin': return 'Super Admin';
//       case 'admin': return 'Admin';
//       case 'moderator': return 'Moderator';
//       case 'call_center_agent': return 'Call Center';
//       default: return role || 'User';
//     }
//   };

//   // Role stats cards
//   const roleStatCards = [
//     { key: 'super_admin', label: 'Super Admin', icon: Crown, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50' },
//     { key: 'admin', label: 'Admin', icon: Shield, color: 'from-[#EE4275] to-[#FF6B9D]', bgColor: 'bg-[#FFF5F6]' },
//     { key: 'moderator', label: 'Moderator', icon: Briefcase, color: 'from-[#2D1B2E] to-[#5D3B5E]', bgColor: 'bg-[#F7C7D3]/10' },
//     { key: 'call_center_agent', label: 'Call Center', icon: Headphones, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50' },
//   ];

//   // ✅ If no access, show Access Denied page
//   if (!hasAccess) {
//     return (
//       <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center py-8">
//         <div className="bg-white rounded-2xl shadow-xl border border-[#F7C7D3]/40 max-w-md w-full mx-4 p-8 text-center">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <EyeOff className="w-10 h-10 text-red-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-[#2D1B2E] mb-2">Access Denied</h2>
//           <p className="text-[#2D1B2E]/70 text-sm mb-6">
//             You don't have permission to manage users. This page is restricted to Administrators and Super Administrators only.
//           </p>
//           <div className="flex flex-col gap-3">
//             <Link
//               href="/authorize/dashboard"
//               className="px-6 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all font-semibold"
//             >
//               Go to Dashboard
//             </Link>
//             <button
//               onClick={() => router.back()}
//               className="px-6 py-2.5 border border-[#F7C7D3]/40 text-[#2D1B2E] rounded-lg hover:bg-[#FFF5F6] transition-colors text-sm"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="manage_users">
//     <div className="min-h-screen bg-[#FFF5F6] py-8">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Header */}
//         <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-[#2D1B2E] flex items-center gap-2">
//               <UserCog className="w-7 h-7 text-[#EE4275]" />
//               Manage Users
//             </h1>
//             <p className="text-sm text-[#EE4275]/60 mt-1">
//               View and manage all user accounts across the platform
//             </p>
//           </div>
          
//           <a
//             href="/authorize/create-users"
//             className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-300 shadow-md text-sm md:text-base"
//           >
//             <Zap className="w-4 h-4" />
//             <span>Create New User</span>
//           </a>
//         </div>

//         {/* Role Statistics Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//           {roleStatCards.map((stat) => {
//             const Icon = stat.icon;
//             const count = roleStats[stat.key] || 0;
//             return (
//               <div 
//                 key={stat.key}
//                 className={`${stat.bgColor} rounded-lg border border-[#F7C7D3]/40 p-3 shadow-sm`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-white shadow-md`}>
//                     <Icon className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="text-xl font-bold text-[#2D1B2E]">{count}</p>
//                     <p className="text-xs text-[#EE4275]/60">{stat.label}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Filters and Search */}
//         <div className="mb-6 flex flex-col sm:flex-row gap-3">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]" />
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//             />
//           </div>
          
//           <select
//             value={selectedRole}
//             onChange={(e) => setSelectedRole(e.target.value)}
//             className="px-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 cursor-pointer"
//           >
//             <option value="all">All Roles</option>
//             <option value="super_admin">Super Admin</option>
//             <option value="admin">Admin</option>
//             <option value="moderator">Moderator</option>
//             <option value="call_center_agent">Call Center</option>
//           </select>

//           <button
//             onClick={fetchUsers}
//             className="px-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg hover:bg-[#FFF5F6] transition-all flex items-center gap-2 bg-white hover:border-[#EE4275]/30"
//           >
//             <RefreshCw className="w-4 h-4 text-[#EE4275]" />
//             <span className="hidden sm:inline text-[#2D1B2E]">Refresh</span>
//           </button>
//         </div>

//         {/* Users Table - Mobile Responsive Card View */}
//         <div className="bg-white rounded-xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden">
//           {/* Desktop Table View - Hidden on mobile */}
//           <div className="hidden md:block overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-[#FFF5F6] border-b border-[#F7C7D3]/40">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">
//                     User
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">
//                     Joined
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-semibold text-[#2D1B2E] uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#F7C7D3]/20">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="5" className="px-6 py-12 text-center">
//                       <div className="flex justify-center items-center gap-2">
//                         <RefreshCw className="w-5 h-5 animate-spin text-[#EE4275]" />
//                         <span className="text-[#EE4275]/60">Loading users...</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : users.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="px-6 py-12 text-center">
//                       <div className="text-[#EE4275]/60">
//                         <Users className="w-12 h-12 mx-auto mb-3 text-[#EE4275]/30" />
//                         <p className="text-lg font-medium text-[#2D1B2E]">No users found</p>
//                         <p className="text-sm mt-1">Try adjusting your search or filters</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   users.map((user) => {
//                     const currentUserAccount = isCurrentUser(user._id);
                    
//                     return (
//                       <tr key={user._id} className={`hover:bg-[#FFF5F6] transition-colors ${currentUserAccount ? 'bg-[#FFF5F6]' : ''}`}>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${
//                               user.role === 'super_admin' ? 'from-yellow-500 to-orange-500' :
//                               user.role === 'admin' ? 'from-[#EE4275] to-[#FF6B9D]' :
//                               user.role === 'moderator' ? 'from-[#2D1B2E] to-[#5D3B5E]' :
//                               'from-purple-500 to-violet-500'
//                             } flex items-center justify-center text-white font-semibold text-sm relative shadow-md`}>
//                               {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                               {currentUserAccount && (
//                                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                               )}
//                             </div>
//                             <div>
//                               <div className="font-medium text-[#2D1B2E] flex items-center gap-2 text-sm">
//                                 {user.contactPerson}
//                                 {currentUserAccount && (
//                                   <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
//                                     You
//                                   </span>
//                                 )}
//                               </div>
//                               <div className="text-xs text-[#EE4275]/40">
//                                 ID: {user._id.slice(-8)}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="space-y-1">
//                             <div className="flex items-center gap-1.5 text-sm text-[#2D1B2E]">
//                               <Mail className="w-3.5 h-3.5 text-[#EE4275]" />
//                               <span className="truncate max-w-[150px] text-xs">{user.email}</span>
//                             </div>
//                             <div className="flex items-center gap-1.5 text-sm text-[#2D1B2E]">
//                               <Phone className="w-3.5 h-3.5 text-[#EE4275]" />
//                               <span className="text-xs">{user.phone}</span>
//                             </div>
//                             {user.whatsapp && (
//                               <div className="flex items-center gap-1.5 text-xs text-emerald-600">
//                                 <Smartphone className="w-3.5 h-3.5" />
//                                 <span>WhatsApp</span>
//                               </div>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}>
//                             {getRoleIcon(user.role)}
//                             {getRoleDisplayName(user.role)}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-1.5 text-xs text-[#EE4275]/60">
//                             <Calendar className="w-3.5 h-3.5 text-[#EE4275]" />
//                             <span>{formatDate(user.createdAt)}</span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <div className="flex items-center justify-end gap-2">
//                             {canEditUser(user) && (
//                               <button
//                                 onClick={() => handleEdit(user)}
//                                 className="p-2 text-[#EE4275]/60 hover:text-[#EE4275] hover:bg-[#FFF5F6] rounded-lg transition-all"
//                                 title="Edit user"
//                               >
//                                 <Edit2 className="w-4 h-4" />
//                               </button>
//                             )}
                            
//                             {canDeleteUser(user) ? (
//                               <button
//                                 onClick={() => setDeleteModal({ 
//                                   isOpen: true, 
//                                   userId: user._id, 
//                                   userName: user.contactPerson,
//                                   userRole: user.role
//                                 })}
//                                 className="p-2 text-[#EE4275]/60 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
//                                 title="Delete user"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             ) : currentUserAccount ? (
//                               <button
//                                 disabled
//                                 className="p-2 text-gray-300 cursor-not-allowed rounded-lg"
//                                 title="You cannot delete your own account"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             ) : (
//                               <button
//                                 disabled
//                                 className="p-2 text-gray-300 cursor-not-allowed rounded-lg"
//                                 title="You don't have permission to delete this user"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Card View */}
//           <div className="md:hidden divide-y divide-[#F7C7D3]/20">
//             {loading ? (
//               <div className="p-8 text-center">
//                 <RefreshCw className="w-6 h-6 animate-spin text-[#EE4275] mx-auto" />
//                 <p className="text-[#EE4275]/60 mt-2 text-sm">Loading users...</p>
//               </div>
//             ) : users.length === 0 ? (
//               <div className="p-8 text-center">
//                 <Users className="w-12 h-12 mx-auto mb-3 text-[#EE4275]/30" />
//                 <p className="text-[#EE4275]/60">No users found</p>
//               </div>
//             ) : (
//               users.map((user) => {
//                 const currentUserAccount = isCurrentUser(user._id);
                
//                 return (
//                   <div key={user._id} className={`p-4 ${currentUserAccount ? 'bg-[#FFF5F6]' : ''}`}>
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex items-center gap-3">
//                         <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
//                           user.role === 'super_admin' ? 'from-yellow-500 to-orange-500' :
//                           user.role === 'admin' ? 'from-[#EE4275] to-[#FF6B9D]' :
//                           user.role === 'moderator' ? 'from-[#2D1B2E] to-[#5D3B5E]' :
//                           'from-purple-500 to-violet-500'
//                         } flex items-center justify-center text-white font-semibold text-base relative shadow-md`}>
//                           {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                           {currentUserAccount && (
//                             <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                           )}
//                         </div>
//                         <div>
//                           <div className="font-semibold text-[#2D1B2E] flex items-center gap-2">
//                             {user.contactPerson}
//                             {currentUserAccount && (
//                               <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">You</span>
//                             )}
//                           </div>
//                           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getRoleBadge(user.role)}`}>
//                             {getRoleIcon(user.role)}
//                             {getRoleDisplayName(user.role)}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="flex gap-1">
//                         {canEditUser(user) && (
//                           <button
//                             onClick={() => handleEdit(user)}
//                             className="p-2 text-[#EE4275]/60 hover:text-[#EE4275] rounded-lg"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                           </button>
//                         )}
//                         {canDeleteUser(user) && (
//                           <button
//                             onClick={() => setDeleteModal({ 
//                               isOpen: true, 
//                               userId: user._id, 
//                               userName: user.contactPerson,
//                               userRole: user.role
//                             })}
//                             className="p-2 text-[#EE4275]/60 hover:text-rose-600 rounded-lg"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2 text-sm">
//                       <div className="flex items-center gap-2 text-[#2D1B2E]">
//                         <Mail className="w-4 h-4 text-[#EE4275]" />
//                         <span className="text-xs break-all">{user.email}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-[#2D1B2E]">
//                         <Phone className="w-4 h-4 text-[#EE4275]" />
//                         <span className="text-xs">{user.phone}</span>
//                       </div>
//                       {user.whatsapp && (
//                         <div className="flex items-center gap-2 text-emerald-600">
//                           <Smartphone className="w-4 h-4" />
//                           <span className="text-xs">WhatsApp available</span>
//                         </div>
//                       )}
//                       <div className="flex items-center gap-2 text-[#EE4275]/40 text-xs pt-1">
//                         <Calendar className="w-3.5 h-3.5 text-[#EE4275]" />
//                         <span>Joined {formatDate(user.createdAt)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           {/* Pagination */}
//           {!loading && users.length > 0 && (
//             <div className="px-4 md:px-6 py-4 border-t border-[#F7C7D3]/40 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FFF5F6]">
//               <p className="text-xs text-[#EE4275]/60">
//                 Showing page <span className="font-medium text-[#EE4275]">{currentPage}</span> of <span className="font-medium text-[#EE4275]">{totalPages}</span>
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 border border-[#F7C7D3]/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] transition-colors bg-white"
//                 >
//                   <ChevronLeft className="w-4 h-4 text-[#EE4275]" />
//                 </button>
//                 <span className="px-3 py-1.5 bg-white border border-[#F7C7D3]/50 rounded-lg text-sm font-medium text-[#EE4275]">
//                   {currentPage}
//                 </span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="p-2 border border-[#F7C7D3]/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] transition-colors bg-white"
//                 >
//                   <ChevronRight className="w-4 h-4 text-[#EE4275]" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Delete Confirmation Modal */}
//         {deleteModal.isOpen && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden border border-[#F7C7D3]/40"
//             >
//               <div className="px-6 py-4 bg-[#FFF5F6] border-b border-[#F7C7D3]/40 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
//                     <AlertTriangle className="w-4 h-4 text-rose-600" />
//                   </div>
//                   <h3 className="text-base font-semibold text-[#2D1B2E]">Delete User Account</h3>
//                 </div>
//                 <button
//                   onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' })}
//                   className="text-[#EE4275]/40 hover:text-[#EE4275]"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="p-6">
//                 <p className="text-sm text-[#2D1B2E]/70 mb-4">
//                   Are you sure you want to delete <strong className="text-[#EE4275]">{deleteModal.userName}</strong>'s account? This action cannot be undone.
//                 </p>

//                 <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
//                   <p className="text-xs text-amber-800 flex items-start gap-2">
//                     <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
//                     <span>All user data will be permanently removed from the system.</span>
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' })}
//                     className="flex-1 px-4 py-2 border border-[#F7C7D3]/50 rounded-lg hover:bg-[#FFF5F6] transition-colors text-sm font-medium text-[#2D1B2E]"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 shadow-md"
//                   >
//                     <UserX className="w-4 h-4" />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* Edit User Modal */}
//         {editModal.isOpen && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden border border-[#F7C7D3]/40"
//             >
//               <div className="px-6 py-4 bg-[#FFF5F6] border-b border-[#F7C7D3]/40 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] flex items-center justify-center">
//                     <Edit2 className="w-4 h-4 text-white" />
//                   </div>
//                   <h3 className="text-base font-semibold text-[#2D1B2E]">Edit User</h3>
//                 </div>
//                 <button
//                   onClick={() => setEditModal({ isOpen: false, user: null })}
//                   className="text-[#EE4275]/40 hover:text-[#EE4275]"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               <form onSubmit={handleEditSubmit} className="p-6">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                       Full Name <span className="text-[#EE4275]">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="contactPerson"
//                       value={editFormData.contactPerson}
//                       onChange={handleEditChange}
//                       required
//                       className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                       Email <span className="text-[#EE4275]">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={editFormData.email}
//                       onChange={handleEditChange}
//                       required
//                       className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                       Phone <span className="text-[#EE4275]">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={editFormData.phone}
//                       onChange={handleEditChange}
//                       required
//                       className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                       WhatsApp
//                     </label>
//                     <input
//                       type="tel"
//                       name="whatsapp"
//                       value={editFormData.whatsapp}
//                       onChange={handleEditChange}
//                       className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
//                       Role <span className="text-[#EE4275]">*</span>
//                     </label>
//                     <select
//                       name="role"
//                       value={editFormData.role}
//                       onChange={handleEditChange}
//                       className="w-full px-3 py-2 text-sm border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 cursor-pointer"
//                     >
//                       {getAvailableRoles().map(role => (
//                         <option key={role.value} value={role.value}>
//                           {role.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#F7C7D3]/40">
//                   <button
//                     type="button"
//                     onClick={() => setEditModal({ isOpen: false, user: null })}
//                     className="flex-1 px-4 py-2 border border-[#F7C7D3]/50 rounded-lg hover:bg-[#FFF5F6] transition-colors text-sm font-medium text-[#2D1B2E]"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 px-4 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 shadow-md"
//                   >
//                     <Save className="w-4 h-4" />
//                     Save Changes
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
  Plus, 
  Edit2, 
  Trash2, 
  Shield, 
  UserCog,
  Mail,
  Phone,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  X,
  CheckCircle,
  UserX,
  Save,
  Users,
  Sparkles,
  Gift,
  Calendar,
  MoreVertical,
  Briefcase,
  Heart,
  Store,
  Crown,
  Headphones,
  Zap,
  UserCheck,
  Clock,
  EyeOff
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================================
// FONT CONSTANTS - MATCHING ABOUT PAGE
// ============================================================
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

// ✅ Helper to get user role
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

export default function ManageUsers() {
  const router = useRouter();
  const userRole = getUserRole();
  
  // ✅ Check if user has permission to access this page (Only Super Admin and Admin)
  const hasAccess = userRole === 'super_admin' || userRole === 'admin';
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null, userName: '', userRole: '' });
  const [editModal, setEditModal] = useState({ isOpen: false, user: null });
  const [editFormData, setEditFormData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    role: ''
  });
  const [roleStats, setRoleStats] = useState({
    super_admin: 0,
    admin: 0,
    moderator: 0,
    call_center_agent: 0,
    customer: 0
  });

  const usersPerPage = 10;

  // ✅ Redirect if no permission
  useEffect(() => {
    if (!hasAccess) {
      toast.error('Access Denied', {
        description: 'You do not have permission to manage users'
      });
    }
  }, [hasAccess]);

  // Get current user on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      try {
        const parsed = JSON.parse(userData);
        setCurrentUser({
          ...parsed,
          id: parsed.id || parsed._id || parsed.userId
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Fetch users
  useEffect(() => {
    if (hasAccess) {
      fetchUsers();
    }
  }, [currentPage, selectedRole, searchTerm, hasAccess]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: usersPerPage,
        role: selectedRole !== 'all' ? selectedRole : '',
        search: searchTerm
      });

      const response = await fetch(`http://localhost:5000/api/admin/users?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
        if (data.roleStats) {
          setRoleStats(data.roleStats);
        }
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Connection Error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/admin/users/${deleteModal.userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('User Deleted', {
          description: `${deleteModal.userName} has been removed successfully`,
        });
        fetchUsers();
        setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' });
      } else {
        toast.error('Delete Failed', {
          description: data.error || 'Something went wrong'
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Connection Error');
    }
  };

  const handleEdit = (user) => {
    setEditFormData({
      contactPerson: user.contactPerson,
      email: user.email,
      phone: user.phone,
      whatsapp: user.whatsapp || '',
      role: user.role
    });
    setEditModal({ isOpen: true, user });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Prevent Admin from assigning Super Admin role
    if (userRole === 'admin' && editFormData.role === 'super_admin') {
      toast.error('Permission Denied', {
        description: 'You cannot assign Super Admin role'
      });
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/admin/users/${editModal.user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('User Updated', {
          description: `${editFormData.contactPerson}'s information has been updated`,
        });
        setEditModal({ isOpen: false, user: null });
        fetchUsers();
      } else {
        toast.error('Update Failed', {
          description: data.error || 'Something went wrong'
        });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Connection Error');
    }
  };

  const isCurrentUser = (userId) => {
    if (!currentUser || !userId) return false;
    return (
      currentUser.id === userId || 
      currentUser._id === userId || 
      currentUser.userId === userId
    );
  };

  // ✅ Check if user can edit (Super Admin can edit anyone, Admin can edit everyone except Super Admin)
  const canEditUser = (user) => {
    if (userRole === 'super_admin') return true;
    if (userRole === 'admin') {
      // Admin cannot edit Super Admin accounts
      return user.role !== 'super_admin';
    }
    return false;
  };

  // ✅ Check if user can delete (Super Admin can delete anyone, Admin can delete everyone except Super Admin and themselves)
  const canDeleteUser = (user) => {
    if (userRole === 'super_admin') return !isCurrentUser(user._id);
    if (userRole === 'admin') {
      // Admin cannot delete Super Admin accounts or their own account
      return user.role !== 'super_admin' && !isCurrentUser(user._id);
    }
    return false;
  };

  // ✅ Get available roles for dropdown based on current user's role
  const getAvailableRoles = () => {
    const allRoles = [
      { value: 'super_admin', label: 'Super Admin - Full System Access' },
      { value: 'admin', label: 'Admin - Full Access' },
      { value: 'moderator', label: 'Moderator - Limited Access' },
      { value: 'call_center_agent', label: 'Call Center Agent - Support Access' }
    ];
    
    // Super Admin can see all roles
    if (userRole === 'super_admin') return allRoles;
    
    // Admin can see all roles except Super Admin
    if (userRole === 'admin') {
      return allRoles.filter(role => role.value !== 'super_admin');
    }
    
    return [];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'super_admin':
        return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-300';
      case 'admin':
        return 'bg-[#f7f4ef] text-[#52665a] border-[#52665a]/30';
      case 'moderator':
        return 'bg-[#e2e3dd]/30 text-[#29362f] border-[#29362f]/20';
      case 'call_center_agent':
        return 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'super_admin':
        return <Crown className="w-3 h-3" />;
      case 'admin':
        return <Shield className="w-3 h-3" />;
      case 'moderator':
        return <Briefcase className="w-3 h-3" />;
      case 'call_center_agent':
        return <Headphones className="w-3 h-3" />;
      default:
        return <Users className="w-3 h-3" />;
    }
  };

  const getRoleDisplayName = (role) => {
    switch(role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'moderator': return 'Moderator';
      case 'call_center_agent': return 'Call Center';
      default: return role || 'User';
    }
  };

  // Role stats cards
  const roleStatCards = [
    { key: 'super_admin', label: 'Super Admin', icon: Crown, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50' },
    { key: 'admin', label: 'Admin', icon: Shield, color: 'from-[#52665a] to-[#71816F]', bgColor: 'bg-[#f7f4ef]' },
    { key: 'moderator', label: 'Moderator', icon: Briefcase, color: 'from-[#29362f] to-[#52665a]', bgColor: 'bg-[#e2e3dd]/10' },
    { key: 'call_center_agent', label: 'Call Center', icon: Headphones, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50' },
  ];

  // ✅ If no access, show Access Denied page
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-[#e2e3dd]/60 max-w-md w-full mx-4 p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <EyeOff className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#29362f] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Access Denied</h2>
          <p className="text-[#29362f]/70 text-sm mb-6" style={{ fontFamily: FONT_FAMILY_INTER }}>
            You don't have permission to manage users. This page is restricted to Administrators and Super Administrators only.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/authorize/dashboard"
              className="px-6 py-2.5 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all font-semibold"
              style={{ fontFamily: FONT_FAMILY_INTER }}
            >
              Go to Dashboard
            </Link>
            <button
              onClick={() => router.back()}
              className="px-6 py-2.5 border border-[#e2e3dd]/60 text-[#29362f] rounded-lg hover:bg-[#f7f4ef] transition-colors text-sm"
              style={{ fontFamily: FONT_FAMILY_INTER }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="manage_users">
    <div className="min-h-screen bg-[#f7f4ef] py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#29362f] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
              <UserCog className="w-7 h-7 text-[#52665a]" />
              Manage Users
            </h1>
            <p className="text-sm text-[#52665a]/60 mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
              View and manage all user accounts across the platform
            </p>
          </div>
          
          <a
            href="/authorize/create-users"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all duration-300 shadow-md text-sm md:text-base"
            style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            <Zap className="w-4 h-4" />
            <span>Create New User</span>
          </a>
        </div>

        {/* Role Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {roleStatCards.map((stat) => {
            const Icon = stat.icon;
            const count = roleStats[stat.key] || 0;
            return (
              <div 
                key={stat.key}
                className={`${stat.bgColor} rounded-lg border border-[#e2e3dd]/60 p-3 shadow-sm`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{count}</p>
                    <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52665a]" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
              style={{ fontFamily: FONT_FAMILY_INTER }}
            />
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent bg-white hover:border-[#52665a]/30 cursor-pointer"
            style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="call_center_agent">Call Center</option>
          </select>

          <button
            onClick={fetchUsers}
            className="px-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg hover:bg-[#f7f4ef] transition-all flex items-center gap-2 bg-white hover:border-[#52665a]/30"
          >
            <RefreshCw className="w-4 h-4 text-[#52665a]" />
            <span className="hidden sm:inline text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>Refresh</span>
          </button>
        </div>

        {/* Users Table - Mobile Responsive Card View */}
        <div className="bg-white rounded-xl shadow-lg border border-[#e2e3dd]/60 overflow-hidden">
          {/* Desktop Table View - Hidden on mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f7f4ef] border-b border-[#e2e3dd]/60">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#29362f] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#29362f] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#29362f] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#29362f] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-[#29362f] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e3dd]/30">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin text-[#52665a]" />
                        <span className="text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="text-[#52665a]/60">
                        <Users className="w-12 h-12 mx-auto mb-3 text-[#52665a]/30" />
                        <p className="text-lg font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>No users found</p>
                        <p className="text-sm mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const currentUserAccount = isCurrentUser(user._id);
                    
                    return (
                      <tr key={user._id} className={`hover:bg-[#f7f4ef] transition-colors ${currentUserAccount ? 'bg-[#f7f4ef]' : ''}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                              user.role === 'super_admin' ? 'from-yellow-500 to-orange-500' :
                              user.role === 'admin' ? 'from-[#52665a] to-[#71816F]' :
                              user.role === 'moderator' ? 'from-[#29362f] to-[#52665a]' :
                              'from-purple-500 to-violet-500'
                            } flex items-center justify-center text-white font-semibold text-sm relative shadow-md`}>
                              {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                              {currentUserAccount && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-[#29362f] flex items-center gap-2 text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}>
                                {user.contactPerson}
                                {currentUserAccount && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-[#52665a]/40" style={{ fontFamily: FONT_FAMILY_INTER }}>
                                ID: {user._id.slice(-8)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                              <Mail className="w-3.5 h-3.5 text-[#52665a]" />
                              <span className="truncate max-w-[150px] text-xs">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                              <Phone className="w-3.5 h-3.5 text-[#52665a]" />
                              <span className="text-xs">{user.phone}</span>
                            </div>
                            {user.whatsapp && (
                              <div className="flex items-center gap-1.5 text-xs text-emerald-600" style={{ fontFamily: FONT_FAMILY_INTER }}>
                                <Smartphone className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`} style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {getRoleIcon(user.role)}
                            {getRoleDisplayName(user.role)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            <Calendar className="w-3.5 h-3.5 text-[#52665a]" />
                            <span>{formatDate(user.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {canEditUser(user) && (
                              <button
                                onClick={() => handleEdit(user)}
                                className="p-2 text-[#52665a]/60 hover:text-[#52665a] hover:bg-[#f7f4ef] rounded-lg transition-all"
                                title="Edit user"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            )}
                            
                            {canDeleteUser(user) ? (
                              <button
                                onClick={() => setDeleteModal({ 
                                  isOpen: true, 
                                  userId: user._id, 
                                  userName: user.contactPerson,
                                  userRole: user.role
                                })}
                                className="p-2 text-[#52665a]/60 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                title="Delete user"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            ) : currentUserAccount ? (
                              <button
                                disabled
                                className="p-2 text-gray-300 cursor-not-allowed rounded-lg"
                                title="You cannot delete your own account"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                disabled
                                className="p-2 text-gray-300 cursor-not-allowed rounded-lg"
                                title="You don't have permission to delete this user"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-[#e2e3dd]/30">
            {loading ? (
              <div className="p-8 text-center">
                <RefreshCw className="w-6 h-6 animate-spin text-[#52665a] mx-auto" />
                <p className="text-[#52665a]/60 mt-2 text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}>Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-3 text-[#52665a]/30" />
                <p className="text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>No users found</p>
              </div>
            ) : (
              users.map((user) => {
                const currentUserAccount = isCurrentUser(user._id);
                
                return (
                  <div key={user._id} className={`p-4 ${currentUserAccount ? 'bg-[#f7f4ef]' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                          user.role === 'super_admin' ? 'from-yellow-500 to-orange-500' :
                          user.role === 'admin' ? 'from-[#52665a] to-[#71816F]' :
                          user.role === 'moderator' ? 'from-[#29362f] to-[#52665a]' :
                          'from-purple-500 to-violet-500'
                        } flex items-center justify-center text-white font-semibold text-base relative shadow-md`}>
                          {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                          {currentUserAccount && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-[#29362f] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {user.contactPerson}
                            {currentUserAccount && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">You</span>
                            )}
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getRoleBadge(user.role)}`} style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {getRoleIcon(user.role)}
                            {getRoleDisplayName(user.role)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {canEditUser(user) && (
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 text-[#52665a]/60 hover:text-[#52665a] rounded-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {canDeleteUser(user) && (
                          <button
                            onClick={() => setDeleteModal({ 
                              isOpen: true, 
                              userId: user._id, 
                              userName: user.contactPerson,
                              userRole: user.role
                            })}
                            className="p-2 text-[#52665a]/60 hover:text-rose-600 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        <Mail className="w-4 h-4 text-[#52665a]" />
                        <span className="text-xs break-all">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        <Phone className="w-4 h-4 text-[#52665a]" />
                        <span className="text-xs">{user.phone}</span>
                      </div>
                      {user.whatsapp && (
                        <div className="flex items-center gap-2 text-emerald-600" style={{ fontFamily: FONT_FAMILY_INTER }}>
                          <Smartphone className="w-4 h-4" />
                          <span className="text-xs">WhatsApp available</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-[#52665a]/40 text-xs pt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        <Calendar className="w-3.5 h-3.5 text-[#52665a]" />
                        <span>Joined {formatDate(user.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {!loading && users.length > 0 && (
            <div className="px-4 md:px-6 py-4 border-t border-[#e2e3dd]/60 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#f7f4ef]">
              <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>
                Showing page <span className="font-medium text-[#52665a]">{currentPage}</span> of <span className="font-medium text-[#52665a]">{totalPages}</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-[#e2e3dd]/60 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f7f4ef] transition-colors bg-white"
                >
                  <ChevronLeft className="w-4 h-4 text-[#52665a]" />
                </button>
                <span className="px-3 py-1.5 bg-white border border-[#e2e3dd]/60 rounded-lg text-sm font-medium text-[#52665a]" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-[#e2e3dd]/60 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f7f4ef] transition-colors bg-white"
                >
                  <ChevronRight className="w-4 h-4 text-[#52665a]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden border border-[#e2e3dd]/60"
            >
              <div className="px-6 py-4 bg-[#f7f4ef] border-b border-[#e2e3dd]/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                  </div>
                  <h3 className="text-base font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Delete User Account</h3>
                </div>
                <button
                  onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' })}
                  className="text-[#52665a]/40 hover:text-[#52665a]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <p className="text-sm text-[#29362f]/70 mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Are you sure you want to delete <strong className="text-[#52665a]">{deleteModal.userName}</strong>'s account? This action cannot be undone.
                </p>

                <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-800 flex items-start gap-2" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>All user data will be permanently removed from the system.</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '', userRole: '' })}
                    className="flex-1 px-4 py-2 border border-[#e2e3dd]/60 rounded-lg hover:bg-[#f7f4ef] transition-colors text-sm font-medium text-[#29362f]"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 shadow-md"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    <UserX className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit User Modal */}
        {editModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden border border-[#e2e3dd]/60"
            >
              <div className="px-6 py-4 bg-[#f7f4ef] border-b border-[#e2e3dd]/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#52665a] to-[#71816F] flex items-center justify-center">
                    <Edit2 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Edit User</h3>
                </div>
                <button
                  onClick={() => setEditModal({ isOpen: false, user: null })}
                  className="text-[#52665a]/40 hover:text-[#52665a]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                      Full Name <span className="text-[#52665a]">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={editFormData.contactPerson}
                      onChange={handleEditChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                      Email <span className="text-[#52665a]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                      Phone <span className="text-[#52665a]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditChange}
                      required
                      className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={editFormData.whatsapp}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                      Role <span className="text-[#52665a]">*</span>
                    </label>
                    <select
                      name="role"
                      value={editFormData.role}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 text-sm border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent bg-white hover:border-[#52665a]/30 cursor-pointer"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    >
                      {getAvailableRoles().map(role => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#e2e3dd]/60">
                  <button
                    type="button"
                    onClick={() => setEditModal({ isOpen: false, user: null })}
                    className="flex-1 px-4 py-2 border border-[#e2e3dd]/60 rounded-lg hover:bg-[#f7f4ef] transition-colors text-sm font-medium text-[#29362f]"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 shadow-md"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
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