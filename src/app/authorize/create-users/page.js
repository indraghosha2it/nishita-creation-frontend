
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { toast } from 'sonner';
// import Link from 'next/link';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   Smartphone, 
//   Lock, 
//   Eye, 
//   EyeOff,
//   ArrowLeft,
//   Shield,
//   Sparkles,
//   Gift,
//   Rocket,
//   Briefcase,
//   Users,
//   CheckCircle,
//   AlertCircle,
//   Heart,
//   Store,
//   Crown,
//   Headphones,
//   UserCog,
//   Zap
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// export default function CreateUsers() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     password: '',
//     confirmPassword: '',
//     role: 'moderator'
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Password Mismatch', {
//         description: 'The passwords you entered do not match.',
//         duration: 4000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     if (formData.password.length < 8) {
//       toast.error('Weak Password', {
//         description: 'Password must be at least 8 characters long.',
//         duration: 4000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     if (!formData.contactPerson || !formData.email || !formData.phone || !formData.password) {
//       toast.error('Missing Fields', {
//         description: 'Please fill in all required fields.',
//         duration: 4000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     const loadingToast = toast.loading('Creating user account...');

//     try {
//       const token = localStorage.getItem('token');

//       let endpoint;
//       let requestBody;

//       if (formData.role === 'super_admin') {
//         endpoint = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/create-staff`;
//         requestBody = {
//           contactPerson: formData.contactPerson,
//           email: formData.email,
//           phone: formData.phone,
//           whatsapp: formData.whatsapp || '',
//           role: formData.role,
//           password: formData.password,
//           country: 'Bangladesh',
//           address: 'Not Specified',
//           city: 'Not Specified',
//           zipCode: 'Not Specified',
//           emailVerified: true,
//           isActive: true,
//           registrationStatus: 'completed',
//           permissions: ['*'],
//           dashboardAccess: [
//             'analytics', 'users', 'products', 'orders', 'content',
//             'reviews', 'support', 'settings', 'coupons', 'banners',
//             'blogs', 'delivery', 'payments', 'roles'
//           ]
//         };
//       } else {
//         endpoint = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/users`;
//         requestBody = {
//           contactPerson: formData.contactPerson,
//           email: formData.email,
//           phone: formData.phone,
//           whatsapp: formData.whatsapp || '',
//           role: formData.role,
//           password: formData.password,
//           country: 'Bangladesh',
//           address: 'Not Specified',
//           city: 'Not Specified',
//           zipCode: 'Not Specified',
//           emailVerified: true,
//           isActive: true,
//           registrationStatus: 'completed'
//         };
//       }

//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         toast.error('Creation Failed', {
//           description: data.error || 'Something went wrong. Please try again.',
//           duration: 5000,
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       const roleNames = {
//         super_admin: 'Super Admin',
//         admin: 'Admin',
//         moderator: 'Moderator',
//         call_center_agent: 'Call Center Agent'
//       };

//       toast.success('User Created Successfully!', {
//         description: `${roleNames[formData.role] || formData.role} account for ${formData.contactPerson} has been created.`,
//         duration: 5000,
//       });

//       toast.info('Login Credentials', {
//         description: `Email: ${formData.email}`,
//         duration: 8000,
//       });

//       setFormData({
//         contactPerson: '',
//         email: '',
//         phone: '',
//         whatsapp: '',
//         password: '',
//         confirmPassword: '',
//         role: 'moderator'
//       });

//     setTimeout(() => {
//   window.location.href = '/authorize/manage-users';
// }, 2000);

//     } catch (err) {
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server. Please check your internet connection.',
//         duration: 5000,
//       });
//       setIsSubmitting(false);
//     }
//   };

//   // Get role icon and color - Pink theme
//   const getRoleInfo = (role) => {
//     const roles = {
//       super_admin: { 
//         icon: Crown, 
//         color: 'from-yellow-500 to-orange-500',
//         bgColor: 'bg-yellow-50',
//         borderColor: 'border-yellow-300',
//         textColor: 'text-yellow-600',
//         description: 'Full system access - can manage all users and roles'
//       },
//       admin: { 
//         icon: Shield, 
//         color: 'from-[#EE4275] to-[#FF6B9D]',
//         bgColor: 'bg-[#FFF5F6]',
//         borderColor: 'border-[#EE4275]/30',
//         textColor: 'text-[#EE4275]',
//         description: 'Can manage users, products, orders, and content'
//       },
//       moderator: { 
//         icon: Briefcase, 
//         color: 'from-[#2D1B2E] to-[#5D3B5E]',
//         bgColor: 'bg-[#F7C7D3]/10',
//         borderColor: 'border-[#2D1B2E]/20',
//         textColor: 'text-[#2D1B2E]',
//         description: 'Can manage products, content, and reviews'
//       },
//       call_center_agent: { 
//         icon: Headphones, 
//         color: 'from-purple-500 to-violet-500',
//         bgColor: 'bg-purple-50',
//         borderColor: 'border-purple-300',
//         textColor: 'text-purple-600',
//         description: 'Can manage orders, delivery, and customer support'
//       }
//     };
//     return roles[role] || roles.moderator;
//   };

//   return (
//     <ProtectedRoute pageKey="create_users">
//     <div className="min-h-screen bg-[#FFF5F6] py-8">
//       <div className="container mx-auto px-4 max-w-4xl">
//         {/* Header with back button */}
//         <div className="mb-6 flex items-center justify-between">
//           <a
//             href="/authorize/manage-users" 
//             className="inline-flex items-center text-[#2D1B2E] hover:text-[#EE4275] transition-colors group"
//           >
//             <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 group-hover:bg-[#EE4275] group-hover:text-white transition-all border border-[#F7C7D3]/40">
//               <ArrowLeft className="w-4 h-4" />
//             </div>
//             <span className="font-medium">Back to Users</span>
//           </a>
          
//           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-[#F7C7D3]/40">
//             <Zap className="w-4 h-4 text-[#EE4275]" />
//             <span className="text-sm font-medium text-[#2D1B2E]">Create User</span>
//           </div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-lg border border-[#F7C7D3]/40 overflow-hidden"
//         >
//           {/* Header */}
//           <div className="px-6 py-5 border-b border-[#F7C7D3]/40 bg-gradient-to-r from-[#FFF5F6] to-[#F7C7D3]/20">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-[#2D1B2E] flex items-center gap-2">
//                   <UserCog className="w-6 h-6 text-[#EE4275]" />
//                   Create New User
//                 </h1>
//                 <p className="text-[#EE4275]/60 text-sm mt-1">
//                   Create admin, moderator, call center, or super admin accounts
//                 </p>
//               </div>
//               <div className="bg-[#F7C7D3]/30 p-3 rounded-lg border border-[#EE4275]/20">
//                 <Zap className="w-6 h-6 text-[#EE4275]" />
//               </div>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6">
//             {/* Role Selection */}
//             <div className="mb-8">
//               <label className="block text-sm font-semibold text-[#2D1B2E] mb-3">
//                 Select User Role <span className="text-[#EE4275]">*</span>
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 {['super_admin', 'admin', 'moderator', 'call_center_agent'].map((role) => {
//                   const roleInfo = getRoleInfo(role);
//                   const RoleIcon = roleInfo.icon;
//                   const isSelected = formData.role === role;
                  
//                   return (
//                     <label
//                       key={role}
//                       className={`
//                         relative flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200
//                         ${isSelected 
//                           ? `${roleInfo.borderColor} ${roleInfo.bgColor} shadow-md` 
//                           : 'border-[#F7C7D3]/40 hover:border-[#EE4275]/40 hover:bg-[#FFF5F6]'}
//                       `}
//                     >
//                       <input
//                         type="radio"
//                         name="role"
//                         value={role}
//                         checked={isSelected}
//                         onChange={handleChange}
//                         className="sr-only"
//                       />
//                       <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
//                         isSelected 
//                           ? `bg-gradient-to-r ${roleInfo.color} text-white shadow-md` 
//                           : 'bg-[#F7C7D3]/10 text-[#EE4275]/40'
//                       }`}>
//                         <RoleIcon className="w-5 h-5" />
//                       </div>
//                       <div className="mt-2 text-center">
//                         <div className={`text-xs font-semibold ${isSelected ? roleInfo.textColor : 'text-[#2D1B2E]/70'}`}>
//                           {role === 'super_admin' ? 'Super Admin' :
//                            role === 'call_center_agent' ? 'Call Center' :
//                            role.charAt(0).toUpperCase() + role.slice(1)}
//                         </div>
//                       </div>
//                       {isSelected && (
//                         <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-[#EE4275] bg-white rounded-full" />
//                       )}
//                     </label>
//                   );
//                 })}
//               </div>
              
//               {/* Role description */}
//               <div className="mt-3 p-3 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
//                 <p className="text-xs text-[#2D1B2E]/70">
//                   <span className="font-medium text-[#2D1B2E]">Role: </span>
//                   {getRoleInfo(formData.role).description}
//                 </p>
//               </div>
//             </div>

//             {/* Info Banner - Super Admin Warning */}
//             {formData.role === 'super_admin' && (
//               <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
//                 <div className="flex items-start gap-3">
//                   <div className="text-yellow-500 mt-0.5">
//                     <Crown className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-yellow-800">Super Admin Privileges</p>
//                     <p className="text-xs text-yellow-700 mt-1">
//                       Super Admins have unrestricted access to all system features, including 
//                       user management, role management, and system settings. Use with caution.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Info Banner */}
//             <div className="mb-6 p-4 bg-[#FFF5F6] rounded-lg border border-[#EE4275]/20">
//               <div className="flex items-start gap-3">
//                 <div className="text-[#EE4275] mt-0.5">
//                   <Sparkles className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-[#2D1B2E]">Account Verification</p>
//                   <p className="text-xs text-[#2D1B2E]/70 mt-1">
//                     Users created by admin are automatically verified. No email verification required. 
//                     They can login immediately with the provided credentials.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {/* Full Name */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                   Full Name <span className="text-[#EE4275]">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="w-5 h-5 text-[#EE4275]/40 group-focus-within:text-[#EE4275] transition-colors" />
//                   </div>
//                   <input
//                     type="text"
//                     name="contactPerson"
//                     value={formData.contactPerson}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                     placeholder="Enter full name"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                   Email Address <span className="text-[#EE4275]">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="w-5 h-5 text-[#EE4275]/40 group-focus-within:text-[#EE4275] transition-colors" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                     placeholder="user@example.com"
//                   />
//                 </div>
//               </div>

//               {/* Phone Number */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                   Phone Number <span className="text-[#EE4275]">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Phone className="w-5 h-5 text-[#EE4275]/40 group-focus-within:text-[#EE4275] transition-colors" />
//                   </div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                     placeholder="+880 1234 567890"
//                   />
//                 </div>
//               </div>

//               {/* WhatsApp */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                   WhatsApp Number
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Smartphone className="w-5 h-5 text-[#EE4275]/40 group-focus-within:text-[#EE4275] transition-colors" />
//                   </div>
//                   <input
//                     type="tel"
//                     name="whatsapp"
//                     value={formData.whatsapp}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                     placeholder="+880 1234 567890"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                   Password <span className="text-[#EE4275]">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="w-5 h-5 text-[#EE4275]/40 group-focus-within:text-[#EE4275] transition-colors" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-10 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                     placeholder="Min. 8 characters"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 hover:text-[#EE4275] transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-[#2D1B2E] mb-1">
//                   Confirm Password <span className="text-[#EE4275]">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="w-5 h-5 text-[#EE4275]/40 group-focus-within:text-[#EE4275] transition-colors" />
//                   </div>
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-10 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent transition-all bg-white hover:border-[#EE4275]/30"
//                     placeholder="Re-enter password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EE4275]/40 hover:text-[#EE4275] transition-colors"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Password Strength Indicator */}
//             {formData.password && (
//               <div className="mt-6 p-4 bg-[#FFF5F6] rounded-lg border border-[#F7C7D3]/40">
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className={`h-2 flex-1 rounded-full ${
//                     formData.password.length >= 8 ? 'bg-[#EE4275]' : 'bg-[#F7C7D3]'
//                   }`} />
//                   <div className={`h-2 flex-1 rounded-full ${
//                     /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'bg-[#EE4275]' : 'bg-[#F7C7D3]'
//                   }`} />
//                   <div className={`h-2 flex-1 rounded-full ${
//                     /[0-9]/.test(formData.password) ? 'bg-[#EE4275]' : 'bg-[#F7C7D3]'
//                   }`} />
//                   <div className={`h-2 flex-1 rounded-full ${
//                     /[^A-Za-z0-9]/.test(formData.password) ? 'bg-[#EE4275]' : 'bg-[#F7C7D3]'
//                   }`} />
//                 </div>
//                 <p className="text-xs text-[#2D1B2E]/70 flex items-center gap-1">
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#EE4275]"></span>
//                   Password must be at least 8 characters with uppercase, lowercase, number and special character
//                 </p>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="mt-8">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full py-3 px-4 text-white font-semibold rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${
//                   formData.role === 'super_admin'
//                     ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-yellow-200/50 focus:ring-yellow-500'
//                     : 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] hover:shadow-[#EE4275]/25 focus:ring-[#EE4275]'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Creating User...
//                   </span>
//                 ) : (
//                   <span className="flex items-center justify-center gap-2">
//                     <Zap className="w-5 h-5" />
//                     Create {formData.role === 'super_admin' ? 'Super Admin' : 
//                            formData.role === 'call_center_agent' ? 'Call Center Agent' :
//                            formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Account
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Note about login */}
//             <div className="mt-4 text-center">
//               <p className="text-xs text-[#EE4275]/60 flex items-center justify-center gap-1">
//                 <span className="w-1 h-1 rounded-full bg-[#EE4275]"></span>
//                 Users will be able to login immediately with the provided credentials.
//                 No email verification required.
//               </p>
//             </div>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//     </ProtectedRoute>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  Smartphone, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Shield,
  Sparkles,
  Gift,
  Rocket,
  Briefcase,
  Users,
  CheckCircle,
  AlertCircle,
  Heart,
  Store,
  Crown,
  Headphones,
  UserCog,
  Zap
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================================
// FONT CONSTANTS - MATCHING ABOUT PAGE
// ============================================================
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

export default function CreateUsers() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    password: '',
    confirmPassword: '',
    role: 'moderator'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Password Mismatch', {
        description: 'The passwords you entered do not match.',
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Weak Password', {
        description: 'Password must be at least 8 characters long.',
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.contactPerson || !formData.email || !formData.phone || !formData.password) {
      toast.error('Missing Fields', {
        description: 'Please fill in all required fields.',
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    const loadingToast = toast.loading('Creating user account...');

    try {
      const token = localStorage.getItem('token');

      let endpoint;
      let requestBody;

      if (formData.role === 'super_admin') {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/create-staff`;
        requestBody = {
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp || '',
          role: formData.role,
          password: formData.password,
          country: 'Bangladesh',
          address: 'Not Specified',
          city: 'Not Specified',
          zipCode: 'Not Specified',
          emailVerified: true,
          isActive: true,
          registrationStatus: 'completed',
          permissions: ['*'],
          dashboardAccess: [
            'analytics', 'users', 'products', 'orders', 'content',
            'reviews', 'support', 'settings', 'coupons', 'banners',
            'blogs', 'delivery', 'payments', 'roles'
          ]
        };
      } else {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/users`;
        requestBody = {
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp || '',
          role: formData.role,
          password: formData.password,
          country: 'Bangladesh',
          address: 'Not Specified',
          city: 'Not Specified',
          zipCode: 'Not Specified',
          emailVerified: true,
          isActive: true,
          registrationStatus: 'completed'
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error('Creation Failed', {
          description: data.error || 'Something went wrong. Please try again.',
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      const roleNames = {
        super_admin: 'Super Admin',
        admin: 'Admin',
        moderator: 'Moderator',
        call_center_agent: 'Call Center Agent'
      };

      toast.success('User Created Successfully!', {
        description: `${roleNames[formData.role] || formData.role} account for ${formData.contactPerson} has been created.`,
        duration: 5000,
      });

      toast.info('Login Credentials', {
        description: `Email: ${formData.email}`,
        duration: 8000,
      });

      setFormData({
        contactPerson: '',
        email: '',
        phone: '',
        whatsapp: '',
        password: '',
        confirmPassword: '',
        role: 'moderator'
      });

    setTimeout(() => {
  window.location.href = '/authorize/manage-users';
}, 2000);

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please check your internet connection.',
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };

  // Get role icon and color - Sage Green theme
  const getRoleInfo = (role) => {
    const roles = {
      super_admin: { 
        icon: Crown, 
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-300',
        textColor: 'text-yellow-600',
        description: 'Full system access - can manage all users and roles'
      },
      admin: { 
        icon: Shield, 
        color: 'from-[#52665a] to-[#71816F]',
        bgColor: 'bg-[#f7f4ef]',
        borderColor: 'border-[#52665a]/30',
        textColor: 'text-[#52665a]',
        description: 'Can manage users, products, orders, and content'
      },
      moderator: { 
        icon: Briefcase, 
        color: 'from-[#29362f] to-[#52665a]',
        bgColor: 'bg-[#e2e3dd]/10',
        borderColor: 'border-[#29362f]/20',
        textColor: 'text-[#29362f]',
        description: 'Can manage products, content, and reviews'
      },
      call_center_agent: { 
        icon: Headphones, 
        color: 'from-purple-500 to-violet-500',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-300',
        textColor: 'text-purple-600',
        description: 'Can manage orders, delivery, and customer support'
      }
    };
    return roles[role] || roles.moderator;
  };

  return (
    <ProtectedRoute pageKey="create_users">
    <div className="min-h-screen bg-[#f7f4ef] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with back button */}
        <div className="mb-6 flex items-center justify-between">
          <a
            href="/authorize/manage-users" 
            className="inline-flex items-center text-[#29362f] hover:text-[#52665a] transition-colors group"
            style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 group-hover:bg-[#52665a] group-hover:text-white transition-all border border-[#e2e3dd]/60">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">Back to Users</span>
          </a>
          
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-[#e2e3dd]/60">
            <Zap className="w-4 h-4 text-[#52665a]" />
            <span className="text-sm font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>Create User</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg border border-[#e2e3dd]/60 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#e2e3dd]/60 bg-gradient-to-r from-[#f7f4ef] to-[#e2e3dd]/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#29362f] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                  <UserCog className="w-6 h-6 text-[#52665a]" />
                  Create New User
                </h1>
                <p className="text-[#52665a]/60 text-sm mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Create admin, moderator, call center, or super admin accounts
                </p>
              </div>
              <div className="bg-[#e2e3dd]/30 p-3 rounded-lg border border-[#52665a]/20">
                <Zap className="w-6 h-6 text-[#52665a]" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Role Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-[#29362f] mb-3" style={{ fontFamily: FONT_FAMILY_INTER }}>
                Select User Role <span className="text-[#52665a]">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['super_admin', 'admin', 'moderator', 'call_center_agent'].map((role) => {
                  const roleInfo = getRoleInfo(role);
                  const RoleIcon = roleInfo.icon;
                  const isSelected = formData.role === role;
                  
                  return (
                    <label
                      key={role}
                      className={`
                        relative flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? `${roleInfo.borderColor} ${roleInfo.bgColor} shadow-md` 
                          : 'border-[#e2e3dd]/60 hover:border-[#52665a]/40 hover:bg-[#f7f4ef]'}
                      `}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={isSelected}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        isSelected 
                          ? `bg-gradient-to-r ${roleInfo.color} text-white shadow-md` 
                          : 'bg-[#e2e3dd]/10 text-[#52665a]/40'
                      }`}>
                        <RoleIcon className="w-5 h-5" />
                      </div>
                      <div className="mt-2 text-center">
                        <div className={`text-xs font-semibold ${isSelected ? roleInfo.textColor : 'text-[#29362f]/70'}`} style={{ fontFamily: FONT_FAMILY_INTER }}>
                          {role === 'super_admin' ? 'Super Admin' :
                           role === 'call_center_agent' ? 'Call Center' :
                           role.charAt(0).toUpperCase() + role.slice(1)}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-[#52665a] bg-white rounded-full" />
                      )}
                    </label>
                  );
                })}
              </div>
              
              {/* Role description */}
              <div className="mt-3 p-3 bg-[#f7f4ef] rounded-lg border border-[#e2e3dd]/60">
                <p className="text-xs text-[#29362f]/70" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  <span className="font-medium text-[#29362f]">Role: </span>
                  {getRoleInfo(formData.role).description}
                </p>
              </div>
            </div>

            {/* Info Banner - Super Admin Warning */}
            {formData.role === 'super_admin' && (
              <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <div className="text-yellow-500 mt-0.5">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-800" style={{ fontFamily: FONT_FAMILY_INTER }}>Super Admin Privileges</p>
                    <p className="text-xs text-yellow-700 mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                      Super Admins have unrestricted access to all system features, including 
                      user management, role management, and system settings. Use with caution.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-[#f7f4ef] rounded-lg border border-[#52665a]/20">
              <div className="flex items-start gap-3">
                <div className="text-[#52665a] mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>Account Verification</p>
                  <p className="text-xs text-[#29362f]/70 mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    Users created by admin are automatically verified. No email verification required. 
                    They can login immediately with the provided credentials.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Full Name <span className="text-[#52665a]">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-[#52665a]/40 group-focus-within:text-[#52665a] transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Email Address <span className="text-[#52665a]">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-[#52665a]/40 group-focus-within:text-[#52665a] transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Phone Number <span className="text-[#52665a]">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-[#52665a]/40 group-focus-within:text-[#52665a] transition-colors" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                    placeholder="+880 1234 567890"
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  WhatsApp Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="w-5 h-5 text-[#52665a]/40 group-focus-within:text-[#52665a] transition-colors" />
                  </div>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                    placeholder="+880 1234 567890"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Password <span className="text-[#52665a]">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-[#52665a]/40 group-focus-within:text-[#52665a] transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52665a]/40 hover:text-[#52665a] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Confirm Password <span className="text-[#52665a]">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-[#52665a]/40 group-focus-within:text-[#52665a] transition-colors" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52665a]/40 hover:text-[#52665a] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-6 p-4 bg-[#f7f4ef] rounded-lg border border-[#e2e3dd]/60">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-2 flex-1 rounded-full ${
                    formData.password.length >= 8 ? 'bg-[#52665a]' : 'bg-[#e2e3dd]'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'bg-[#52665a]' : 'bg-[#e2e3dd]'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[0-9]/.test(formData.password) ? 'bg-[#52665a]' : 'bg-[#e2e3dd]'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[^A-Za-z0-9]/.test(formData.password) ? 'bg-[#52665a]' : 'bg-[#e2e3dd]'
                  }`} />
                </div>
                <p className="text-xs text-[#29362f]/70 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52665a]"></span>
                  Password must be at least 8 characters with uppercase, lowercase, number and special character
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 text-white font-semibold rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${
                  formData.role === 'super_admin'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-yellow-200/50 focus:ring-yellow-500'
                    : 'bg-gradient-to-r from-[#52665a] to-[#71816F] hover:shadow-[#52665a]/25 focus:ring-[#52665a]'
                }`}
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating User...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Create {formData.role === 'super_admin' ? 'Super Admin' : 
                           formData.role === 'call_center_agent' ? 'Call Center Agent' :
                           formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Account
                  </span>
                )}
              </button>
            </div>

            {/* Note about login */}
            <div className="mt-4 text-center">
              <p className="text-xs text-[#52665a]/60 flex items-center justify-center gap-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                <span className="w-1 h-1 rounded-full bg-[#52665a]"></span>
                Users will be able to login immediately with the provided credentials.
                No email verification required.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
    </ProtectedRoute>
  );
}