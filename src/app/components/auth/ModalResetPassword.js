// // components/auth/ModalResetPassword.jsx
// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
// import { toast } from 'sonner';

// export default function ModalResetPassword({ email, otp, onBack, onSuccess }) {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Validate passwords match
//     if (password !== confirmPassword) {
//       toast.error('Password Mismatch', {
//         description: 'The passwords you entered do not match.'
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     // Validate password strength
//     if (password.length < 8) {
//       toast.error('Weak Password', {
//         description: 'Password must be at least 8 characters long.'
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     // Validate password has at least one number and one letter
//     const hasNumber = /\d/.test(password);
//     const hasLetter = /[a-zA-Z]/.test(password);
    
//     if (!hasNumber || !hasLetter) {
//       toast.error('Weak Password', {
//         description: 'Password must contain at least one letter and one number.'
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     const loadingToast = toast.loading('Resetting password...');

//     try {
//       console.log('Sending reset request:', { email, otp, password: '***' });

//       const response = await fetch('http://localhost:5000/api/auth/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           otp,
//           password
//         })
//       });

//       const data = await response.json();
//       console.log('Reset response:', data);
      
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         console.error('Reset failed:', data);
//         toast.error('Reset Failed', {
//           description: data.error || 'Could not reset password'
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       // Call onSuccess to return to login form in modal
//       if (onSuccess) {
//         onSuccess();
//       }

//     } catch (error) {
//       toast.dismiss(loadingToast);
//       console.error('Reset error:', error);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//       setIsSubmitting(false);
//     }
//   };

//   const EyeIcon = ({ isVisible }) => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       {isVisible ? (
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//       ) : (
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//       )}
//     </svg>
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       className="space-y-6"
//     >
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-pink-600 mb-2">Reset Password</h2>
//         <p className="text-gray-600">
//           Create a new password for<br />
//           <span className="font-semibold text-[#6B4F3A]">{email}</span>
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             New Password
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               autoComplete="new-password"
//               className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent bg-gray-50 focus:bg-white"
//               placeholder="Min. 8 characters with letters & numbers"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2"
//             >
//               <EyeIcon isVisible={showPassword} />
//             </button>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Confirm New Password
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               autoComplete="new-password"
//               className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent bg-gray-50 focus:bg-white"
//               placeholder="Re-enter password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2"
//             >
//               <EyeIcon isVisible={showConfirmPassword} />
//             </button>
//           </div>
//         </div>

//         {/* Password requirements hint */}
//         <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
//           <p className="font-medium mb-1">Password must contain:</p>
//           <ul className="list-disc list-inside space-y-1">
//             <li className={password.length >= 8 ? 'text-green-600' : ''}>
//               {password.length >= 8 ? '✓' : '○'} At least 8 characters
//             </li>
//             <li className={/[a-zA-Z]/.test(password) ? 'text-green-600' : ''}>
//               {/[a-zA-Z]/.test(password) ? '✓' : '○'} At least one letter
//             </li>
//             <li className={/\d/.test(password) ? 'text-green-600' : ''}>
//               {/\d/.test(password) ? '✓' : '○'} At least one number
//             </li>
//           </ul>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full py-3 px-4 bg-gradient-to-r from-[#6B4F3A] to-[#926c4f] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#6B4F3A]/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="w-5 h-5 animate-spin" />
//               Resetting...
//             </>
//           ) : (
//             <>
//               Reset Password
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </>
//           )}
//         </button>

//         <button
//           type="button"
//           onClick={onBack}
//           className="w-full text-sm text-gray-500 hover:text-[#6B4F3A] transition-colors"
//         >
//           ← Back
//         </button>
//       </form>
//     </motion.div>
//   );
// }