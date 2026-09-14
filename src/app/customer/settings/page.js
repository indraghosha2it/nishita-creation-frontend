


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   Save,
//   Lock,
//   Eye,
//   EyeOff,
//   Shield,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Edit,
//   Key,
//   Info,
//   Sparkles,
//   Smartphone,
//   Gift,
//   Briefcase,
//   Calendar,
//   Award,
//   Heart,
//   Store,
//   ArrowLeft,
//   Zap,
//   MapPin,
//   Home,
//   Building2,
//   MapPinned,
//   Globe
// } from 'lucide-react';

// export default function CustomerSettings() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [changingPassword, setChangingPassword] = useState(false);
//   const [activeTab, setActiveTab] = useState('view');
//   const [profileImageError, setProfileImageError] = useState(false);
  
//   const [userData, setUserData] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     role: '',
//     emailVerified: false,
//     lastLogin: null,
//     loginCount: 0,
//     createdAt: null,
//     profilePicture: '',
//     isSubscribedToNewsletter: false
//   });

//   const [editFormData, setEditFormData] = useState({
//     contactPerson: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: ''
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     setProfileImageError(false);
//   }, [userData.profilePicture]);

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch('http://localhost:5000/api/auth/me', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const user = data.user;
//         setUserData({
//           contactPerson: user.contactPerson || '',
//           email: user.email || '',
//           phone: user.phone || '',
//           whatsapp: user.whatsapp || '',
//           country: user.country || '',
//           address: user.address || '',
//           city: user.city || '',
//           zipCode: user.zipCode || '',
//           role: user.role || 'customer',
//           emailVerified: user.emailVerified || false,
//           lastLogin: user.lastLogin || null,
//           loginCount: user.loginCount || 0,
//           createdAt: user.createdAt || null,
//           profilePicture: user.profilePicture || '',
//           isSubscribedToNewsletter: user.isSubscribedToNewsletter || false
//         });

//         setEditFormData({
//           contactPerson: user.contactPerson || '',
//           phone: user.phone || '',
//           whatsapp: user.whatsapp || '',
//           country: user.country || '',
//           address: user.address || '',
//           city: user.city || '',
//           zipCode: user.zipCode || ''
//         });
//       } else {
//         toast.error('Failed to load profile');
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       toast.error('Connection Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch('http://localhost:5000/api/auth/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           contactPerson: editFormData.contactPerson,
//           phone: editFormData.phone,
//           whatsapp: editFormData.whatsapp,
//           country: editFormData.country,
//           address: editFormData.address,
//           city: editFormData.city,
//           zipCode: editFormData.zipCode
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUserData(prev => ({
//           ...prev,
//           contactPerson: editFormData.contactPerson,
//           phone: editFormData.phone,
//           whatsapp: editFormData.whatsapp,
//           country: editFormData.country,
//           address: editFormData.address,
//           city: editFormData.city,
//           zipCode: editFormData.zipCode
//         }));

//         const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
//         localStorage.setItem('user', JSON.stringify({
//           ...storedUser,
//           contactPerson: editFormData.contactPerson,
//           phone: editFormData.phone,
//           whatsapp: editFormData.whatsapp
//         }));

//         toast.success('Profile Updated! 🎉');
//         setActiveTab('view');
//       } else {
//         toast.error('Update Failed');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Connection Error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
    
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       toast.error('Password Mismatch');
//       return;
//     }

//     if (passwordData.newPassword.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       return;
//     }

//     setChangingPassword(true);

//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch('http://localhost:5000/api/auth/change-password', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Password Changed Successfully!');
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         });
//         setActiveTab('view');
//       } else {
//         toast.error(data.error || 'Current password is incorrect');
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//       toast.error('Connection Error');
//     } finally {
//       setChangingPassword(false);
//     }
//   };

//   const calculatePasswordStrength = (password) => {
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/[a-z]/.test(password)) strength++;
//     if (/[0-9]/.test(password)) strength++;
//     if (/[^A-Za-z0-9]/.test(password)) strength++;
//     setPasswordStrength(strength);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handlePasswordInputChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     if (name === 'newPassword') {
//       calculatePasswordStrength(value);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Never';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#EE4275] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading your profile...</p>
//           <Sparkles className="w-5 h-5 text-[#EE4275] mx-auto mt-2 animate-pulse" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FFF5F6] py-8">
//       <div className="container mx-auto px-4 max-w-4xl">
//         {/* Header - Pink Theme */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-1">
//             <div className="p-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-xl shadow-md shadow-[#EE4275]/25">
//               <User className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-[#2D1B2E]">My Profile</h1>
//             <Zap className="w-5 h-5 text-[#EE4275] ml-1" />
//           </div>
//           <p className="text-[#EE4275]/60 text-sm ml-14">Manage your account information and preferences</p>
//         </div>

//         {/* Tabs - Pink Theme */}
//         <div className="mb-6 border-b border-[#F7C7D3]/40 bg-white rounded-t-xl px-4 shadow-sm">
//           <div className="flex gap-1 overflow-x-auto">
//             {[
//               { id: 'view', label: 'Profile Info', icon: Info },
//               { id: 'edit', label: 'Edit Profile', icon: Edit },
//               { id: 'security', label: 'Security', icon: Key }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? 'text-[#EE4275]'
//                     : 'text-[#2D1B2E]/60 hover:text-[#EE4275]'
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#EE4275]' : 'text-[#EE4275]/40'}`} />
//                   {tab.label}
//                 </div>
//                 {activeTab === tab.id && (
//                   <motion.div
//                     layoutId="activeTab"
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE4275]"
//                     initial={false}
//                     transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Tab Content */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//           >
//             {/* Profile Info Tab */}
//             {activeTab === 'view' && (
//               <div className="bg-white rounded-xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-[#F7C7D3]/40 bg-[#FFF5F6]">
//                   <h2 className="text-lg font-semibold text-[#2D1B2E]">Profile Information</h2>
//                   <p className="text-sm text-[#EE4275]/60 mt-0.5">Your personal details and account information</p>
//                 </div>

//                 <div className="p-6">
//                   {/* Profile Header */}
//                   <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#F7C7D3]/40">
//                     <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#EE4275]/25">
//                       {userData.contactPerson?.charAt(0) || '?'}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-[#2D1B2E]">{userData.contactPerson}</h3>
//                       <div className="flex flex-wrap items-center gap-2 mt-1">
//                         <span className="px-3 py-1 bg-[#FFF5F6] text-[#EE4275] rounded-full text-xs font-medium border border-[#EE4275]/30 flex items-center gap-1">
//                           <Shield className="w-3 h-3" />
//                           Customer
//                         </span>
//                         {userData.isSubscribedToNewsletter && (
//                           <span className="px-3 py-1 bg-[#F7C7D3]/20 text-[#2D1B2E] rounded-full text-xs font-medium border border-[#2D1B2E]/20 flex items-center gap-1">
//                             📧 Subscribed
//                           </span>
//                         )}
//                         <Sparkles className="w-4 h-4 text-[#EE4275]" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Information Grid */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <h4 className="text-sm font-semibold text-[#EE4275] flex items-center gap-2">
//                         <User className="w-4 h-4" />
//                         Personal Information
//                       </h4>
                      
//                       <div className="space-y-3">
//                         <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
//                           <User className="w-4 h-4 text-[#EE4275] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-[#EE4275]/60">Full Name</p>
//                             <p className="text-sm font-medium text-[#2D1B2E]">{userData.contactPerson}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
//                           <Mail className="w-4 h-4 text-[#EE4275] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-[#EE4275]/60">Email Address</p>
//                             <p className="text-sm font-medium text-[#2D1B2E]">{userData.email}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
//                           <Phone className="w-4 h-4 text-[#EE4275] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-[#EE4275]/60">Phone Number</p>
//                             <p className="text-sm font-medium text-[#2D1B2E]">{userData.phone || 'Not provided'}</p>
//                           </div>
//                         </div>

//                         {userData.whatsapp && (
//                           <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
//                             <Smartphone className="w-4 h-4 text-green-500 mt-0.5" />
//                             <div>
//                               <p className="text-xs text-[#EE4275]/60">WhatsApp</p>
//                               <p className="text-sm font-medium text-[#2D1B2E]">{userData.whatsapp}</p>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <h4 className="text-sm font-semibold text-[#EE4275] flex items-center gap-2">
//                         <MapPin className="w-4 h-4" />
//                         Address Information
//                       </h4>
                      
//                       <div className="space-y-3">
//                         <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
//                           <Home className="w-4 h-4 text-[#EE4275] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-[#EE4275]/60">Street Address</p>
//                             <p className="text-sm font-medium text-[#2D1B2E]">{userData.address || 'Not provided'}</p>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-2">
//                           <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
//                             <Building2 className="w-4 h-4 text-[#EE4275] mt-0.5" />
//                             <div>
//                               <p className="text-xs text-[#EE4275]/60">City</p>
//                               <p className="text-sm font-medium text-[#2D1B2E]">{userData.city || 'Not provided'}</p>
//                             </div>
//                           </div>
//                           <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
//                             <Globe className="w-4 h-4 text-[#EE4275] mt-0.5" />
//                             <div>
//                               <p className="text-xs text-[#EE4275]/60">Country</p>
//                               <p className="text-sm font-medium text-[#2D1B2E]">{userData.country || 'Not provided'}</p>
//                             </div>
//                           </div>
//                         </div>

//                         {userData.zipCode && (
//                           <div className="flex items-start gap-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
//                             <MapPinned className="w-4 h-4 text-[#EE4275] mt-0.5" />
//                             <div>
//                               <p className="text-xs text-[#EE4275]/60">ZIP / Postal Code</p>
//                               <p className="text-sm font-medium text-[#2D1B2E]">{userData.zipCode}</p>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="mt-6 pt-6 border-t border-[#F7C7D3]/40 flex flex-wrap gap-3">
//                     <button
//                       onClick={() => setActiveTab('edit')}
//                       className="px-6 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all text-sm font-medium flex items-center gap-2 shadow-md"
//                     >
//                       <Edit className="w-4 h-4" />
//                       Edit Profile
//                     </button>
//                     <button
//                       onClick={() => setActiveTab('security')}
//                       className="px-6 py-2.5 border border-[#F7C7D3]/50 text-[#2D1B2E] rounded-lg hover:bg-[#FFF5F6] hover:border-[#EE4275]/30 transition-all text-sm font-medium flex items-center gap-2"
//                     >
//                       <Key className="w-4 h-4 text-[#EE4275]" />
//                       Change Password
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Edit Profile Tab */}
//             {activeTab === 'edit' && (
//               <div className="bg-white rounded-xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-[#F7C7D3]/40 bg-[#FFF5F6]">
//                   <h2 className="text-lg font-semibold text-[#2D1B2E]">Edit Profile</h2>
//                   <p className="text-sm text-[#EE4275]/60 mt-0.5">Update your personal information</p>
//                 </div>

//                 <form onSubmit={handleProfileUpdate} className="p-6">
//                   <div className="space-y-5">
//                     <div>
//                       <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                         Full Name <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="contactPerson"
//                         value={editFormData.contactPerson}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                         placeholder="Your full name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                         Email Address
//                       </label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                         <input
//                           type="email"
//                           value={userData.email}
//                           disabled
//                           className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg bg-[#FFF5F6] text-[#EE4275]/60 cursor-not-allowed"
//                         />
//                       </div>
//                       <p className="text-xs text-[#EE4275]/40 mt-1">Email cannot be changed</p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                           Phone Number <span className="text-[#EE4275]">*</span>
//                         </label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={editFormData.phone}
//                             onChange={handleEditChange}
//                             required
//                             className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                             placeholder="+880 1234 567890"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                           WhatsApp Number
//                         </label>
//                         <div className="relative">
//                           <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                           <input
//                             type="tel"
//                             name="whatsapp"
//                             value={editFormData.whatsapp}
//                             onChange={handleEditChange}
//                             className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                             placeholder="+880 1234 567890"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                           Country <span className="text-[#EE4275]">*</span>
//                         </label>
//                         <div className="relative">
//                           <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                           <input
//                             type="text"
//                             name="country"
//                             value={editFormData.country}
//                             onChange={handleEditChange}
//                             required
//                             className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                             placeholder="Bangladesh"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                           City <span className="text-[#EE4275]">*</span>
//                         </label>
//                         <div className="relative">
//                           <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                           <input
//                             type="text"
//                             name="city"
//                             value={editFormData.city}
//                             onChange={handleEditChange}
//                             required
//                             className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                             placeholder="Dhaka"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                         Street Address <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <div className="relative">
//                         <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                         <input
//                           type="text"
//                           name="address"
//                           value={editFormData.address}
//                           onChange={handleEditChange}
//                           required
//                           className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                           placeholder="Your street address"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                         ZIP / Postal Code <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <div className="relative">
//                         <MapPinned className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                         <input
//                           type="text"
//                           name="zipCode"
//                           value={editFormData.zipCode}
//                           onChange={handleEditChange}
//                           required
//                           className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                           placeholder="1230"
//                         />
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3 pt-4">
//                       <button
//                         type="button"
//                         onClick={() => setActiveTab('view')}
//                         className="flex-1 px-6 py-2.5 border border-[#F7C7D3]/50 rounded-lg hover:bg-[#FFF5F6] transition-all font-medium text-[#2D1B2E]"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={saving}
//                         className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
//                       >
//                         {saving ? (
//                           <>
//                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             Saving...
//                           </>
//                         ) : (
//                           <>
//                             <Save className="w-4 h-4" />
//                             Save Changes
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {/* Security Tab */}
//             {activeTab === 'security' && (
//               <div className="bg-white rounded-xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-[#F7C7D3]/40 bg-[#FFF5F6]">
//                   <h2 className="text-lg font-semibold text-[#2D1B2E]">Security Settings</h2>
//                   <p className="text-sm text-[#EE4275]/60 mt-0.5">Change your password to keep your account secure</p>
//                 </div>

//                 <form onSubmit={handlePasswordChange} className="p-6">
//                   <div className="space-y-5">
//                     <div>
//                       <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                         Current Password <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                         <input
//                           type={showCurrentPassword ? "text" : "password"}
//                           name="currentPassword"
//                           value={passwordData.currentPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                           placeholder="Enter your current password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 hover:text-[#EE4275]"
//                         >
//                           {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                         New Password <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                         <input
//                           type={showNewPassword ? "text" : "password"}
//                           name="newPassword"
//                           value={passwordData.newPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                           placeholder="Enter new password (min. 8 characters)"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowNewPassword(!showNewPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 hover:text-[#EE4275]"
//                         >
//                           {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>

//                       {passwordData.newPassword && (
//                         <div className="mt-2">
//                           <div className="flex items-center gap-1 mb-1">
//                             {[1,2,3,4,5].map((level) => (
//                               <div
//                                 key={level}
//                                 className={`h-1 flex-1 rounded-full ${
//                                   level <= passwordStrength 
//                                     ? level <= 2 ? 'bg-[#EE4275]' : level <= 4 ? 'bg-[#EE4275]' : 'bg-green-500'
//                                     : 'bg-[#F7C7D3]'
//                                 }`}
//                               />
//                             ))}
//                           </div>
//                           <p className="text-xs text-[#EE4275]/60">
//                             {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 4 ? 'Medium' : 'Strong'} password
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                         Confirm New Password <span className="text-[#EE4275]">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EE4275]/40" />
//                         <input
//                           type={showConfirmPassword ? "text" : "password"}
//                           name="confirmPassword"
//                           value={passwordData.confirmPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                           placeholder="Confirm your new password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 hover:text-[#EE4275]"
//                         >
//                           {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>

//                       {passwordData.confirmPassword && (
//                         <p className={`text-xs mt-1 flex items-center gap-1 ${
//                           passwordData.newPassword === passwordData.confirmPassword
//                             ? 'text-green-600'
//                             : 'text-[#EE4275]'
//                         }`}>
//                           {passwordData.newPassword === passwordData.confirmPassword ? (
//                             <>✓ Passwords match</>
//                           ) : (
//                             <>✗ Passwords do not match</>
//                           )}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-3 pt-4">
//                       <button
//                         type="button"
//                         onClick={() => setActiveTab('view')}
//                         className="flex-1 px-6 py-2.5 border border-[#F7C7D3]/50 rounded-lg hover:bg-[#FFF5F6] transition-all font-medium text-[#2D1B2E]"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={changingPassword}
//                         className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
//                       >
//                         {changingPassword ? (
//                           <>
//                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             Updating...
//                           </>
//                         ) : (
//                           <>
//                             <Key className="w-4 h-4" />
//                             Update Password
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Save,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Key,
  Info,
  Sparkles,
  Smartphone,
  Gift,
  Briefcase,
  Calendar,
  Award,
  Heart,
  Store,
  ArrowLeft,
  Zap,
  MapPin,
  Home,
  Building2,
  MapPinned,
  Globe
} from 'lucide-react';

export default function CustomerSettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('view');
  const [profileImageError, setProfileImageError] = useState(false);
  
  const [userData, setUserData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    role: '',
    emailVerified: false,
    lastLogin: null,
    loginCount: 0,
    createdAt: null,
    profilePicture: '',
    isSubscribedToNewsletter: false
  });

  const [editFormData, setEditFormData] = useState({
    contactPerson: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    setProfileImageError(false);
  }, [userData.profilePicture]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user;
        setUserData({
          contactPerson: user.contactPerson || '',
          email: user.email || '',
          phone: user.phone || '',
          whatsapp: user.whatsapp || '',
          country: user.country || '',
          address: user.address || '',
          city: user.city || '',
          zipCode: user.zipCode || '',
          role: user.role || 'customer',
          emailVerified: user.emailVerified || false,
          lastLogin: user.lastLogin || null,
          loginCount: user.loginCount || 0,
          createdAt: user.createdAt || null,
          profilePicture: user.profilePicture || '',
          isSubscribedToNewsletter: user.isSubscribedToNewsletter || false
        });

        setEditFormData({
          contactPerson: user.contactPerson || '',
          phone: user.phone || '',
          whatsapp: user.whatsapp || '',
          country: user.country || '',
          address: user.address || '',
          city: user.city || '',
          zipCode: user.zipCode || ''
        });
      } else {
        toast.error('Failed to load profile');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Connection Error');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactPerson: editFormData.contactPerson,
          phone: editFormData.phone,
          whatsapp: editFormData.whatsapp,
          country: editFormData.country,
          address: editFormData.address,
          city: editFormData.city,
          zipCode: editFormData.zipCode
        })
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(prev => ({
          ...prev,
          contactPerson: editFormData.contactPerson,
          phone: editFormData.phone,
          whatsapp: editFormData.whatsapp,
          country: editFormData.country,
          address: editFormData.address,
          city: editFormData.city,
          zipCode: editFormData.zipCode
        }));

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({
          ...storedUser,
          contactPerson: editFormData.contactPerson,
          phone: editFormData.phone,
          whatsapp: editFormData.whatsapp
        }));

        toast.success('Profile Updated! 🎉');
        setActiveTab('view');
      } else {
        toast.error('Update Failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Connection Error');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Password Mismatch');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setChangingPassword(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Password Changed Successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setActiveTab('view');
      } else {
        toast.error(data.error || 'Current password is incorrect');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Connection Error');
    } finally {
      setChangingPassword(false);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7f2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#263b32] font-medium">Loading your profile...</p>
          <Sparkles className="w-5 h-5 text-[#8B9D83] mx-auto mt-2 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f2] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header - Green Theme */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] rounded-xl shadow-md shadow-[#8B9D83]/25">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-light text-[#263b32]">My Profile</h1>
            <Zap className="w-5 h-5 text-[#8B9D83] ml-1" />
          </div>
          <p className="text-[#53645a] text-sm ml-14">Manage your account information and preferences</p>
        </div>

        {/* Tabs - Green Theme */}
        <div className="mb-6 border-b border-[#c5d5be]/40 bg-white rounded-t-xl px-4 shadow-sm">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'view', label: 'Profile Info', icon: Info },
              { id: 'edit', label: 'Edit Profile', icon: Edit },
              { id: 'security', label: 'Security', icon: Key }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-[#8B9D83]'
                    : 'text-[#263b32]/60 hover:text-[#8B9D83]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#8B9D83]' : 'text-[#8B9D83]/40'}`} />
                  {tab.label}
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B9D83]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Profile Info Tab */}
            {activeTab === 'view' && (
              <div className="bg-white rounded-xl shadow-lg border border-[#c5d5be]/40 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#c5d5be]/40 bg-[#f0f5ed]">
                  <h2 className="text-lg font-medium text-[#263b32]">Profile Information</h2>
                  <p className="text-sm text-[#53645a] mt-0.5">Your personal details and account information</p>
                </div>

                <div className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#c5d5be]/40">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] flex items-center justify-center text-white text-2xl font-medium shadow-lg shadow-[#8B9D83]/25">
                      {userData.contactPerson?.charAt(0) || '?'}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-[#263b32]">{userData.contactPerson}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-3 py-1 bg-[#f0f5ed] text-[#8B9D83] rounded-full text-xs font-medium border border-[#8B9D83]/30 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Customer
                        </span>
                        {userData.isSubscribedToNewsletter && (
                          <span className="px-3 py-1 bg-[#c5d5be]/20 text-[#263b32] rounded-full text-xs font-medium border border-[#263b32]/20 flex items-center gap-1">
                            📧 Subscribed
                          </span>
                        )}
                        <Sparkles className="w-4 h-4 text-[#8B9D83]" />
                      </div>
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-[#8B9D83] flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Personal Information
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/40">
                          <User className="w-4 h-4 text-[#8B9D83] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#53645a]">Full Name</p>
                            <p className="text-sm font-medium text-[#263b32]">{userData.contactPerson}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/40">
                          <Mail className="w-4 h-4 text-[#8B9D83] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#53645a]">Email Address</p>
                            <p className="text-sm font-medium text-[#263b32]">{userData.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/40">
                          <Phone className="w-4 h-4 text-[#8B9D83] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#53645a]">Phone Number</p>
                            <p className="text-sm font-medium text-[#263b32]">{userData.phone || 'Not provided'}</p>
                          </div>
                        </div>

                        {userData.whatsapp && (
                          <div className="flex items-start gap-3 p-3 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/40">
                            <Smartphone className="w-4 h-4 text-[#8B9D83] mt-0.5" />
                            <div>
                              <p className="text-xs text-[#53645a]">WhatsApp</p>
                              <p className="text-sm font-medium text-[#263b32]">{userData.whatsapp}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-[#8B9D83] flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Address Information
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/40">
                          <Home className="w-4 h-4 text-[#8B9D83] mt-0.5" />
                          <div>
                            <p className="text-xs text-[#53645a]">Street Address</p>
                            <p className="text-sm font-medium text-[#263b32]">{userData.address || 'Not provided'}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-start gap-3 p-3 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/40">
                            <Building2 className="w-4 h-4 text-[#8B9D83] mt-0.5" />
                            <div>
                              <p className="text-xs text-[#53645a]">City</p>
                              <p className="text-sm font-medium text-[#263b32]">{userData.city || 'Not provided'}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/40">
                            <Globe className="w-4 h-4 text-[#8B9D83] mt-0.5" />
                            <div>
                              <p className="text-xs text-[#53645a]">Country</p>
                              <p className="text-sm font-medium text-[#263b32]">{userData.country || 'Not provided'}</p>
                            </div>
                          </div>
                        </div>

                        {userData.zipCode && (
                          <div className="flex items-start gap-3 p-3 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/40">
                            <MapPinned className="w-4 h-4 text-[#8B9D83] mt-0.5" />
                            <div>
                              <p className="text-xs text-[#53645a]">ZIP / Postal Code</p>
                              <p className="text-sm font-medium text-[#263b32]">{userData.zipCode}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-6 border-t border-[#c5d5be]/40 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab('edit')}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-lg hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all text-sm font-medium flex items-center gap-2 shadow-md"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className="px-6 py-2.5 border border-[#c5d5be]/50 text-[#263b32] rounded-lg hover:bg-[#f0f5ed] hover:border-[#8B9D83]/30 transition-all text-sm font-medium flex items-center gap-2"
                    >
                      <Key className="w-4 h-4 text-[#8B9D83]" />
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile Tab */}
            {activeTab === 'edit' && (
              <div className="bg-white rounded-xl shadow-lg border border-[#c5d5be]/40 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#c5d5be]/40 bg-[#f0f5ed]">
                  <h2 className="text-lg font-medium text-[#263b32]">Edit Profile</h2>
                  <p className="text-sm text-[#53645a] mt-0.5">Update your personal information</p>
                </div>

                <form onSubmit={handleProfileUpdate} className="p-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1">
                        Full Name <span className="text-[#8B9D83]">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={editFormData.contactPerson}
                        onChange={handleEditChange}
                        required
                        className="w-full px-4 py-2.5 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent transition-all bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9D83]/40" />
                        <input
                          type="email"
                          value={userData.email}
                          disabled
                          className="w-full pl-10 pr-4 py-2.5 border border-[#c5d5be]/50 rounded-lg bg-[#f0f5ed] text-[#53645a] cursor-not-allowed"
                        />
                      </div>
                      <p className="text-xs text-[#53645a]/60 mt-1">Email cannot be changed</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#263b32] mb-1">
                          Phone Number <span className="text-[#8B9D83]">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9D83]/40" />
                          <input
                            type="tel"
                            name="phone"
                            value={editFormData.phone}
                            onChange={handleEditChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent transition-all bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                            placeholder="+880 1234 567890"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#263b32] mb-1">
                          WhatsApp Number
                        </label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9D83]/40" />
                          <input
                            type="tel"
                            name="whatsapp"
                            value={editFormData.whatsapp}
                            onChange={handleEditChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent transition-all bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                            placeholder="+880 1234 567890"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#263b32] mb-1">
                          Country <span className="text-[#8B9D83]">*</span>
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9D83]/40" />
                          <input
                            type="text"
                            name="country"
                            value={editFormData.country}
                            onChange={handleEditChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent transition-all bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                            placeholder="Bangladesh"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#263b32] mb-1">
                          City <span className="text-[#8B9D83]">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9D83]/40" />
                          <input
                            type="text"
                            name="city"
                            value={editFormData.city}
                            onChange={handleEditChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent transition-all bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                            placeholder="Dhaka"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1">
                        Street Address <span className="text-[#8B9D83]">*</span>
                      </label>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9D83]/40" />
                        <input
                          type="text"
                          name="address"
                          value={editFormData.address}
                          onChange={handleEditChange}
                          required
                          className="w-full pl-10 pr-4 py-2.5 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent transition-all bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                          placeholder="Your street address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1">
                        ZIP / Postal Code <span className="text-[#8B9D83]">*</span>
                      </label>
                      <div className="relative">
                        <MapPinned className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9D83]/40" />
                        <input
                          type="text"
                          name="zipCode"
                          value={editFormData.zipCode}
                          onChange={handleEditChange}
                          required
                          className="w-full pl-10 pr-4 py-2.5 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent transition-all bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                          placeholder="1230"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab('view')}
                        className="flex-1 px-6 py-2.5 border border-[#c5d5be]/50 rounded-lg hover:bg-[#f0f5ed] transition-all font-medium text-[#263b32]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-lg hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                      >
                        {saving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-lg border border-[#c5d5be]/40 overflow-hidden">
                <div className="px-6 py-4 border-b border-[#c5d5be]/40 bg-[#f0f5ed]">
                  <h2 className="text-lg font-medium text-[#263b32]">Security Settings</h2>
                  <p className="text-sm text-[#53645a] mt-0.5">Change your password to keep your account secure</p>
                </div>

                <form onSubmit={handlePasswordChange} className="p-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1">
                        Current Password <span className="text-[#8B9D83]">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9D83]/40" />
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent transition-all bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                          placeholder="Enter your current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B9D83]/40 hover:text-[#8B9D83]"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1">
                        New Password <span className="text-[#8B9D83]">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9D83]/40" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent transition-all bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                          placeholder="Enter new password (min. 8 characters)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B9D83]/40 hover:text-[#8B9D83]"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {passwordData.newPassword && (
                        <div className="mt-2">
                          <div className="flex items-center gap-1 mb-1">
                            {[1,2,3,4,5].map((level) => (
                              <div
                                key={level}
                                className={`h-1 flex-1 rounded-full ${
                                  level <= passwordStrength 
                                    ? level <= 2 ? 'bg-[#8B9D83]' : level <= 4 ? 'bg-[#8B9D83]' : 'bg-green-500'
                                    : 'bg-[#c5d5be]'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-[#53645a]">
                            {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 4 ? 'Medium' : 'Strong'} password
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#263b32] mb-1">
                        Confirm New Password <span className="text-[#8B9D83]">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9D83]/40" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-[#c5d5be]/50 rounded-lg focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent transition-all bg-white hover:border-[#8B9D83]/30 text-[#263b32]"
                          placeholder="Confirm your new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B9D83]/40 hover:text-[#8B9D83]"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {passwordData.confirmPassword && (
                        <p className={`text-xs mt-1 flex items-center gap-1 ${
                          passwordData.newPassword === passwordData.confirmPassword
                            ? 'text-green-600'
                            : 'text-[#8B9D83]'
                        }`}>
                          {passwordData.newPassword === passwordData.confirmPassword ? (
                            <>✓ Passwords match</>
                          ) : (
                            <>✗ Passwords do not match</>
                          )}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab('view')}
                        className="flex-1 px-6 py-2.5 border border-[#c5d5be]/50 rounded-lg hover:bg-[#f0f5ed] transition-all font-medium text-[#263b32]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={changingPassword}
                        className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-lg hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                      >
                        {changingPassword ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Key className="w-4 h-4" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}