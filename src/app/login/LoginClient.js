
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import { 
//   Mail, 
//   Lock, 
//   Eye, 
//   EyeOff, 
//   ArrowRight,
//   Shield,
//   Flower2,
//   Leaf
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import GoogleLoginButton from '../components/GoogleLoginButton';
// import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
// import Footer from '../components/layout/Footer';

// // Font family constant
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

// export default function LoginClient() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);

//   // Load remembered email
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const rememberedEmail = localStorage.getItem('rememberedEmail');
//       if (rememberedEmail) {
//         setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
//       }
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // ========== HELPER: MERGE GUEST CART ==========
//   const mergeGuestCart = async (token) => {
//     try {
//       const guestCartSessionId = localStorage.getItem('cartSessionId');
//       if (!guestCartSessionId) return null;

//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/cart/merge`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'x-session-id': guestCartSessionId
//         },
//         body: JSON.stringify({ sessionId: guestCartSessionId })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         localStorage.removeItem('cartSessionId');
//         window.dispatchEvent(new Event('cart-update'));
//         window.dispatchEvent(new Event('auth-change'));
//         return data.data;
//       }
//       return null;
//     } catch (error) {
//       console.error('❌ Merge cart error:', error);
//       return null;
//     }
//   };

//   // ========== HELPER: MERGE GUEST WISHLIST ==========
//   const mergeGuestWishlist = async (token) => {
//     try {
//       const guestWishlistSessionId = localStorage.getItem('wishlistSessionId');
//       if (!guestWishlistSessionId) return null;

//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/wishlist/merge`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'x-session-id': guestWishlistSessionId
//         },
//         body: JSON.stringify({ sessionId: guestWishlistSessionId })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         localStorage.removeItem('wishlistSessionId');
//         window.dispatchEvent(new Event('wishlist-update'));
//         return data.data;
//       }
//       return null;
//     } catch (error) {
//       console.error('❌ Merge wishlist error:', error);
//       return null;
//     }
//   };

//   // ========== STORE AUTH DATA ==========
//   const storeAuthData = (token, user) => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
      
//       if (formData.rememberMe) {
//         localStorage.setItem('rememberedEmail', formData.email);
//       } else {
//         localStorage.removeItem('rememberedEmail');
//       }
      
//       return true;
//     }
//     return false;
//   };

//   const getDashboardPath = (role) => {
//     switch(role) {
//       case 'super_admin':
//       case 'admin':
//       case 'moderator':
//         return '/authorize/dashboard';
//       case 'call_center_agent':
//         return '/agent/dashboard';
//       default:
//         return '/customer/dashboard';
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const loadingToast = toast.loading('Logging in...');

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         if (data.requiresVerification) {
//           toast.info('Verify Your Email', {
//             description: 'Please check your email for verification code.',
//             duration: 5000,
//           });
//           setIsSubmitting(false);
//           return;
//         }
        
//         if (data.error && data.error.includes('google')) {
//           toast.error('Google Account Detected', {
//             description: 'This account uses Google Sign-In. Please use the "Continue with Google" button.',
//             duration: 6000,
//           });
//           setIsSubmitting(false);
//           return;
//         }
        
//         toast.error('Login failed', {
//           description: data.error || 'Please check your credentials and try again.',
//           duration: 5000,
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       toast.success('Welcome back!', {
//         description: `Logged in as ${data.user.contactPerson || data.user.email?.split('@')[0]}`,
//         duration: 4000,
//       });

//       const storeSuccess = storeAuthData(data.token, data.user);
//       if (!storeSuccess) {
//         toast.error('Storage Error', {
//           description: 'Failed to save login session. Please try again.',
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       window.dispatchEvent(new Event('auth-change'));
//       await new Promise(resolve => setTimeout(resolve, 300));

//       await mergeGuestCart(data.token);
//       await mergeGuestWishlist(data.token);

//       setTimeout(() => {
//         const userRole = data.user.role;
//         const dashboardPath = getDashboardPath(userRole);
//         window.location.href = dashboardPath;
//       }, 1500);

//     } catch (error) {
//       console.error('Login error:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect. Please try again!',
//         duration: 5000,
//       });
//       setIsSubmitting(false);
//     }
//   };

//   const handleGoogleSuccess = async (data) => {
//     console.log('✅ Google sign in success:', data);
    
//     if (data.token) {
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       window.dispatchEvent(new Event('auth-change'));

//       await new Promise(resolve => setTimeout(resolve, 300));
//       await mergeGuestCart(data.token);
//       await mergeGuestWishlist(data.token);
      
//       setTimeout(() => {
//         const userRole = data.user.role;
//         const dashboardPath = getDashboardPath(userRole);
//         window.location.href = dashboardPath;
//       }, 1500);
      
//       if (data.requiresAdditionalInfo) {
//         toast.success('Google Sign In Successful!', {
//           description: 'Please complete your profile to continue.',
//           duration: 4000,
//         });
//       } else {
//         toast.success('Welcome back!', {
//           description: `Logged in as ${data.user.contactPerson || data.user.email?.split('@')[0]}`,
//           duration: 4000,
//         });
//       }
//     }
//   };

//   const handleGoogleError = (error) => {
//     console.error('Google sign in error:', error);
//     toast.error('Google Sign In Failed', {
//       description: error || 'Unable to sign in with Google. Please try again.',
//     });
//   };

//   return (
//     <>
//       <Navbar />
    
//       <div className="min-h-[calc(100vh-64px)] bg-[#0a0a0a] overflow-hidden relative">
        
//         {/* Background Image with Gradient Overlay */}
//         <div className="absolute inset-0">
//           <div
//             className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//             style={{
//               backgroundImage: 'url(/images/login-2.jpg)',
//             }}
//           >
//             {/* Premium gradient overlays */}
//             <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30" />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#8B9D83]/10 via-transparent to-[#8B9D83]/5" />
//           </div>

//           {/* Decorative botanical elements */}
//           <div className="absolute inset-0 overflow-hidden pointer-events-none">
//             <div className="absolute top-10 left-[5%] opacity-8 animate-float">
//               <Leaf className="w-8 h-8 text-white/20" />
//             </div>
//             <div className="absolute bottom-20 right-[8%] opacity-6 animate-float-delayed">
//               <Leaf className="w-10 h-10 text-white/15 rotate-45" />
//             </div>
//             <div className="absolute top-1/4 right-[3%] opacity-6 animate-float-slow">
//               <Leaf className="w-6 h-6 text-white/15 -rotate-12" />
//             </div>
//           </div>
//         </div>

//         {/* Main Content - Compact */}
//         <div className="relative z-10 container mx-auto px-4 min-h-[calc(100vh-64px)] flex items-center justify-center">
//           <div className="w-full max-w-sm">
//             {/* Brand/Logo */}
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-center mb-5"
//             >
//               <div className="inline-block mb-2">
//                 <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto shadow-xl">
//                   <Flower2 className="w-7 h-7 text-[#8B9D83]" />
//                 </div>
//               </div>
//               <motion.h1
//                 initial={{ opacity: 0, y: 5 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 className="text-2xl font-light text-white mb-0.5"
//                 style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.05em' }}
//               >
//                 Welcome Back
//               </motion.h1>
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.15 }}
//                 className="text-white/40 text-xs font-light"
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 Sign in to continue
//               </motion.p>
//             </motion.div>

//             {/* Login Card with Animated Border */}
//             <div className="relative">
//               {/* Animated Border Container */}
//               <div className="absolute -inset-0.5 rounded-xl overflow-hidden">
//                 <div className="absolute inset-0 rounded-xl border-2 border-transparent">
//                   {/* Top-left to top-right */}
//                   <div className="absolute top-[-2px] left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#8B9D83] to-transparent animate-border-top" />
//                   {/* Top-right to bottom-right */}
//                   <div className="absolute top-0 right-[-2px] w-[2px] h-1/3 bg-gradient-to-b from-transparent via-[#8B9D83] to-transparent animate-border-right" />
//                   {/* Bottom-right to bottom-left */}
//                   <div className="absolute bottom-[-2px] right-0 w-1/3 h-[2px] bg-gradient-to-l from-transparent via-[#8B9D83] to-transparent animate-border-bottom" />
//                   {/* Bottom-left to top-left */}
//                   <div className="absolute bottom-0 left-[-2px] w-[2px] h-1/3 bg-gradient-to-t from-transparent via-[#8B9D83] to-transparent animate-border-left" />
//                 </div>
//               </div>

//               {/* Form Card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-5 shadow-2xl"
//               >
//                 <form onSubmit={handleSubmit} className="space-y-3.5">
//                   {/* Email Field */}
//                   <div className="space-y-0.5">
//                     <label
//                       htmlFor="email"
//                       className="block text-[10px] font-medium tracking-wider uppercase text-white/50"
//                       style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}
//                     >
//                       Email
//                     </label>
//                     <div className="relative group">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-white/30 group-focus-within:text-[#8B9D83] transition-colors" />
//                       <input
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full pl-9 pr-3 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                         style={{ fontFamily: FONT_FAMILY }}
//                         placeholder="you@example.com"
//                       />
//                     </div>
//                   </div>

//                   {/* Password Field */}
//                   <div className="space-y-0.5">
//                     <div className="flex justify-between items-center">
//                       <label
//                         htmlFor="password"
//                         className="block text-[10px] font-medium tracking-wider uppercase text-white/50"
//                         style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}
//                       >
//                         Password
//                       </label>
//                       <button
//                         type="button"
//                         onClick={() => setShowForgotPassword(true)}
//                         className="text-[10px] text-white/30 hover:text-[#8B9D83] transition-colors"
//                         style={{ fontFamily: FONT_FAMILY }}
//                       >
//                         Forgot?
//                       </button>
//                     </div>
//                     <div className="relative group">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-white/30 group-focus-within:text-[#8B9D83] transition-colors" />
//                       <input
//                         id="password"
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         className="w-full pl-9 pr-9 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                         style={{ fontFamily: FONT_FAMILY }}
//                         placeholder="Enter your password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
//                       >
//                         {showPassword ? (
//                           <EyeOff className="w-3.5 h-3.5" />
//                         ) : (
//                           <Eye className="w-3.5 h-3.5" />
//                         )}
//                       </button>
//                     </div>
//                   </div>

    

//                   {/* Submit Button */}
//                   <motion.button
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full py-2.5 px-4 bg-[#8B9D83] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-[#7a8d72] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
//                     style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.06em' }}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         Signing in...
//                       </>
//                     ) : (
//                       <>
//                         Sign In
//                         <ArrowRight className="w-3.5 h-3.5" />
//                       </>
//                     )}
//                   </motion.button>

//                   {/* Divider */}
//                   <div className="relative my-2.5">
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="w-full border-t border-white/10" />
//                     </div>
//                     <div className="relative flex justify-center">
//                       <span
//                         className="px-2 bg-transparent text-white/20 text-[10px]"
//                         style={{ fontFamily: FONT_FAMILY }}
//                       >
//                         OR
//                       </span>
//                     </div>
//                   </div>

//                   {/* Google Login Button */}
//                   <div className="w-full">
//                     <GoogleLoginButton 
//                       mode="login"
//                       onSuccess={handleGoogleSuccess}
//                       onError={handleGoogleError}
//                     />
//                   </div>

//                   {/* Register Link */}
//                   <div className="text-center pt-0.5">
//                     <p
//                       className="text-[11px] text-white/30"
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       Don't have an account?{' '}
//                       <Link
//                         href="/register"
//                         className="text-[#8B9D83] hover:text-[#9aad92] transition-colors font-medium"
//                       >
//                         Sign Up
//                       </Link>
//                     </p>
//                   </div>
//                 </form>
//               </motion.div>
//             </div>

//             {/* Trust Badge */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.6 }}
//               className="flex items-center justify-center gap-4 mt-4"
//             >
//               <div className="flex items-center gap-1.5">
//                 <Shield className="w-2.5 h-2.5 text-white/80" />
//                 <span className="text-[8px] text-white/80 tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
//                   Secure
//                 </span>
//               </div>
//               <div className="w-px h-3 bg-white/70" />
//               <div className="flex items-center gap-1.5">
//                 <Lock className="w-2.5 h-2.5 text-white/80" />
//                 <span className="text-[8px] text-white/80 tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
//                   Encrypted
//                 </span>
//               </div>
//               <div className="w-px h-3 bg-white/70" />
//               <div className="flex items-center gap-1.5">
//                 <Shield className="w-2.5 h-2.5 text-white/80" />
//                 <span className="text-[8px] text-white/80 tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
//                   Protected
//                 </span>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Forgot Password Modal */}
//         <ForgotPasswordModal 
//           isOpen={showForgotPassword}
//           onClose={() => setShowForgotPassword(false)}
//         />
//       </div>
//       <Footer />

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-10px) rotate(3deg); }
//         }
//         @keyframes float-delayed {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-8px) rotate(-2deg); }
//         }
//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-12px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float-delayed 7s ease-in-out infinite;
//         }
//         .animate-float-slow {
//           animation: float-slow 8s ease-in-out infinite;
//         }

//         /* Animated Border Keyframes */
//         @keyframes borderTop {
//           0% { left: 0; width: 0; }
//           25% { left: 0; width: 100%; }
//           50% { left: 100%; width: 0; }
//           75% { left: 100%; width: 0; }
//           100% { left: 0; width: 0; }
//         }
//         @keyframes borderRight {
//           0% { top: 0; height: 0; }
//           25% { top: 0; height: 0; }
//           50% { top: 0; height: 100%; }
//           75% { top: 100%; height: 0; }
//           100% { top: 0; height: 0; }
//         }
//         @keyframes borderBottom {
//           0% { right: 0; width: 0; }
//           25% { right: 0; width: 0; }
//           50% { right: 0; width: 0; }
//           75% { right: 0; width: 100%; }
//           100% { right: 100%; width: 0; }
//         }
//         @keyframes borderLeft {
//           0% { bottom: 0; height: 0; }
//           25% { bottom: 0; height: 0; }
//           50% { bottom: 0; height: 0; }
//           75% { bottom: 0; height: 0; }
//           100% { bottom: 0; height: 100%; }
//         }

//         .animate-border-top {
//           animation: borderTop 4s ease-in-out infinite;
//         }
//         .animate-border-right {
//           animation: borderRight 4s ease-in-out infinite;
//         }
//         .animate-border-bottom {
//           animation: borderBottom 4s ease-in-out infinite;
//         }
//         .animate-border-left {
//           animation: borderLeft 4s ease-in-out infinite;
//         }
//       `}</style>
//     </>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Shield,
  Flower2,
  Leaf,
  Sparkles,
  Heart,
  Star,
  Gift,
  ShoppingBag
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import GoogleLoginButton from '../components/GoogleLoginButton';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import Footer from '../components/layout/Footer';

// Font family constant
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

// Product-related texts for rotation
const productMessages = [
   {
    text: "Luxury makeup collection — from natural everyday to bold glam."
  },
  {
    text: "Discover premium skincare essentials for radiant, glowing skin."
  },
 
  {
    text: "Nourish your hair with our sulfate-free, damage-repair formulas."
  },
  {
    text: "Transform your skincare routine with our best-selling serums."
  },
  {
    text: "Cruelty-free beauty that loves your skin and the planet."
  },
  {
    text: "Complete beauty solutions — makeup, skincare, and hair care."
  },
  {
    text: "Achieve flawless complexion with our dermatologist-tested products."
  },
  {
    text: "Professional-grade hair care for strength, shine, and vitality."
  }
];

export default function LoginClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % productMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Load remembered email
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ========== HELPER: MERGE GUEST CART ==========
  const mergeGuestCart = async (token) => {
    try {
      const guestCartSessionId = localStorage.getItem('cartSessionId');
      if (!guestCartSessionId) return null;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/cart/merge`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'x-session-id': guestCartSessionId
        },
        body: JSON.stringify({ sessionId: guestCartSessionId })
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem('cartSessionId');
        window.dispatchEvent(new Event('cart-update'));
        window.dispatchEvent(new Event('auth-change'));
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('❌ Merge cart error:', error);
      return null;
    }
  };

  // ========== HELPER: MERGE GUEST WISHLIST ==========
  const mergeGuestWishlist = async (token) => {
    try {
      const guestWishlistSessionId = localStorage.getItem('wishlistSessionId');
      if (!guestWishlistSessionId) return null;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/wishlist/merge`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'x-session-id': guestWishlistSessionId
        },
        body: JSON.stringify({ sessionId: guestWishlistSessionId })
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem('wishlistSessionId');
        window.dispatchEvent(new Event('wishlist-update'));
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('❌ Merge wishlist error:', error);
      return null;
    }
  };

  // ========== STORE AUTH DATA ==========
  const storeAuthData = (token, user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      return true;
    }
    return false;
  };

  const getDashboardPath = (role) => {
    switch(role) {
      case 'super_admin':
      case 'admin':
      case 'moderator':
        return '/authorize/dashboard';
      case 'call_center_agent':
        return '/agent/dashboard';
      default:
        return '/customer/dashboard';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Logging in...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        if (data.requiresVerification) {
          toast.info('Verify Your Email', {
            description: 'Please check your email for verification code.',
            duration: 5000,
          });
          setIsSubmitting(false);
          return;
        }
        
        if (data.error && data.error.includes('google')) {
          toast.error('Google Account Detected', {
            description: 'This account uses Google Sign-In. Please use the "Continue with Google" button.',
            duration: 6000,
          });
          setIsSubmitting(false);
          return;
        }
        
        toast.error('Login failed', {
          description: data.error || 'Please check your credentials and try again.',
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      toast.success('Welcome back!', {
        description: `Logged in as ${data.user.contactPerson || data.user.email?.split('@')[0]}`,
        duration: 4000,
      });

      const storeSuccess = storeAuthData(data.token, data.user);
      if (!storeSuccess) {
        toast.error('Storage Error', {
          description: 'Failed to save login session. Please try again.',
        });
        setIsSubmitting(false);
        return;
      }

      window.dispatchEvent(new Event('auth-change'));
      await new Promise(resolve => setTimeout(resolve, 300));

      await mergeGuestCart(data.token);
      await mergeGuestWishlist(data.token);

      setTimeout(() => {
        const userRole = data.user.role;
        const dashboardPath = getDashboardPath(userRole);
        window.location.href = dashboardPath;
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect. Please try again!',
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (data) => {
    console.log('✅ Google sign in success:', data);
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('auth-change'));

      await new Promise(resolve => setTimeout(resolve, 300));
      await mergeGuestCart(data.token);
      await mergeGuestWishlist(data.token);
      
      setTimeout(() => {
        const userRole = data.user.role;
        const dashboardPath = getDashboardPath(userRole);
        window.location.href = dashboardPath;
      }, 1500);
      
      if (data.requiresAdditionalInfo) {
        toast.success('Google Sign In Successful!', {
          description: 'Please complete your profile to continue.',
          duration: 4000,
        });
      } else {
        toast.success('Welcome back!', {
          description: `Logged in as ${data.user.contactPerson || data.user.email?.split('@')[0]}`,
          duration: 4000,
        });
      }
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google sign in error:', error);
    toast.error('Google Sign In Failed', {
      description: error || 'Unable to sign in with Google. Please try again.',
    });
  };

  return (
    <>
      <Navbar />
    
      <div className="min-h-[calc(100vh-64px)] bg-[#0a0a0a] overflow-hidden relative flex">
        
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/login-2.jpg)',
            }}
          >
            {/* Premium gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#8B9D83]/15 via-transparent to-[#8B9D83]/5" />
          </div>

          {/* Decorative botanical elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-[5%] opacity-8 animate-float">
              <Leaf className="w-8 h-8 text-white/20" />
            </div>
            <div className="absolute bottom-20 right-[8%] opacity-6 animate-float-delayed">
              <Leaf className="w-10 h-10 text-white/15 rotate-45" />
            </div>
            <div className="absolute top-1/4 right-[3%] opacity-6 animate-float-slow">
              <Leaf className="w-6 h-6 text-white/15 -rotate-12" />
            </div>
          </div>
        </div>

        {/* Split Layout - Left Side (Product Messages) */}
        <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center items-center px-12 py-8">
          <div className="max-w-md w-full">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Flower2 className="w-6 h-6 text-[#8B9D83]" />
                </div>
                <span className="text-white/60 text-xs tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
                  BeautyBucket
                </span>
              </div>
            </motion.div>

            {/* Rotating Product Messages */}
            <div className="relative min-h-[100px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#8B9D83] mt-1 flex-shrink-0" />
                    <div>
                      <p 
                        className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-3"
                        style={{ fontFamily: FONT_FAMILY }}
                      >
                        {productMessages[messageIndex].text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Message Navigation Dots */}
            <div className="flex gap-2 mt-8">
              {productMessages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMessageIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === messageIndex 
                      ? 'w-8 h-1.5 bg-[#8B9D83]' 
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Sign Up Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 pt-8 border-t border-white/10"
            >
              <p 
                className="text-white/50 text-sm mb-4"
                style={{ fontFamily: FONT_FAMILY }}
              >
                New to BeautyBucket?
              </p>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/30 flex items-center gap-2 group"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 mt-8"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-[#8B9D83]" />
                <span className="text-[10px] text-white/40" style={{ fontFamily: FONT_FAMILY }}>10K+ Happy Users</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-[#8B9D83]" />
                <span className="text-[10px] text-white/40" style={{ fontFamily: FONT_FAMILY }}>4.9 Rating</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Gift className="w-3.5 h-3.5 text-[#8B9D83]" />
                <span className="text-[10px] text-white/40" style={{ fontFamily: FONT_FAMILY }}>Free Shipping</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-sm">
            {/* Mobile Brand - Visible on small screens */}
            <div className="lg:hidden text-center mb-5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block mb-2">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto shadow-xl">
                    <Flower2 className="w-7 h-7 text-[#8B9D83]" />
                  </div>
                </div>
                <h1
                  className="text-2xl font-light text-white mb-0.5"
                  style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.05em' }}
                >
                  Welcome Back
                </h1>
                <p
                  className="text-white/40 text-xs font-light"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  Sign in to continue
                </p>
              </motion.div>
            </div>

            {/* Login Card with Animated Border */}
            <div className="relative">
              {/* Animated Border Container */}
              <div className="absolute -inset-0.5 rounded-xl overflow-hidden">
                <div className="absolute inset-0 rounded-xl border-2 border-transparent">
                  {/* Top-left to top-right */}
                  <div className="absolute top-[-2px] left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#8B9D83] to-transparent animate-border-top" />
                  {/* Top-right to bottom-right */}
                  <div className="absolute top-0 right-[-2px] w-[2px] h-1/3 bg-gradient-to-b from-transparent via-[#8B9D83] to-transparent animate-border-right" />
                  {/* Bottom-right to bottom-left */}
                  <div className="absolute bottom-[-2px] right-0 w-1/3 h-[2px] bg-gradient-to-l from-transparent via-[#8B9D83] to-transparent animate-border-bottom" />
                  {/* Bottom-left to top-left */}
                  <div className="absolute bottom-0 left-[-2px] w-[2px] h-1/3 bg-gradient-to-t from-transparent via-[#8B9D83] to-transparent animate-border-left" />
                </div>
              </div>

              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-5 shadow-2xl"
              >
                {/* Desktop Header - Visible on large screens */}
                <div className="hidden lg:block mb-4">
                  <h1
                    className="text-xl font-light text-white"
                    style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.05em' }}
                  >
                    Welcome Back
                  </h1>
                  <p
                    className="text-white/40 text-xs font-light"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Sign in to continue your journey
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Email Field */}
                  <div className="space-y-0.5">
                    <label
                      htmlFor="email"
                      className="block text-[10px] font-medium tracking-wider uppercase text-white/50"
                      style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}
                    >
                      Email
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-white/30 group-focus-within:text-[#8B9D83] transition-colors" />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 pr-3 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                        style={{ fontFamily: FONT_FAMILY }}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="password"
                        className="block text-[10px] font-medium tracking-wider uppercase text-white/50"
                        style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-[10px] text-white/30 hover:text-[#8B9D83] transition-colors"
                        style={{ fontFamily: FONT_FAMILY }}
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-white/30 group-focus-within:text-[#8B9D83] transition-colors" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 pr-9 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                        style={{ fontFamily: FONT_FAMILY }}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-[#8B9D83] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-[#7a8d72] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.06em' }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="relative my-2.5">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center">
                      <span
                        className="px-2 bg-transparent text-white/20 text-[10px]"
                        style={{ fontFamily: FONT_FAMILY }}
                      >
                        OR
                      </span>
                    </div>
                  </div>

                  {/* Google Login Button */}
                  <div className="w-full">
                    <GoogleLoginButton 
                      mode="login"
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                    />
                  </div>

                  {/* Create Account Button - On Form */}
                  <div className="text-center pt-1">
                    <p
                      className="text-[11px] text-white/30"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      Don't have an account?{' '}
                      <Link
                        href="/register"
                        className="text-[#8B9D83] hover:text-[#9aad92] transition-colors font-medium inline-flex items-center gap-1"
                      >
                        Create Account
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </p>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Trust Badge - Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="lg:hidden flex items-center justify-center gap-4 mt-4"
            >
              <div className="flex items-center gap-1.5">
                <Shield className="w-2.5 h-2.5 text-white/80" />
                <span className="text-[8px] text-white/80 tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
                  Secure
                </span>
              </div>
              <div className="w-px h-3 bg-white/70" />
              <div className="flex items-center gap-1.5">
                <Lock className="w-2.5 h-2.5 text-white/80" />
                <span className="text-[8px] text-white/80 tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
                  Encrypted
                </span>
              </div>
              <div className="w-px h-3 bg-white/70" />
              <div className="flex items-center gap-1.5">
                <Shield className="w-2.5 h-2.5 text-white/80" />
                <span className="text-[8px] text-white/80 tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
                  Protected
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal 
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      </div>
      <Footer />

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        /* Animated Border Keyframes */
        @keyframes borderTop {
          0% { left: 0; width: 0; }
          25% { left: 0; width: 100%; }
          50% { left: 100%; width: 0; }
          75% { left: 100%; width: 0; }
          100% { left: 0; width: 0; }
        }
        @keyframes borderRight {
          0% { top: 0; height: 0; }
          25% { top: 0; height: 0; }
          50% { top: 0; height: 100%; }
          75% { top: 100%; height: 0; }
          100% { top: 0; height: 0; }
        }
        @keyframes borderBottom {
          0% { right: 0; width: 0; }
          25% { right: 0; width: 0; }
          50% { right: 0; width: 0; }
          75% { right: 0; width: 100%; }
          100% { right: 100%; width: 0; }
        }
        @keyframes borderLeft {
          0% { bottom: 0; height: 0; }
          25% { bottom: 0; height: 0; }
          50% { bottom: 0; height: 0; }
          75% { bottom: 0; height: 0; }
          100% { bottom: 0; height: 100%; }
        }

        .animate-border-top {
          animation: borderTop 4s ease-in-out infinite;
        }
        .animate-border-right {
          animation: borderRight 4s ease-in-out infinite;
        }
        .animate-border-bottom {
          animation: borderBottom 4s ease-in-out infinite;
        }
        .animate-border-left {
          animation: borderLeft 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}