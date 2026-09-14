

// 'use client';

// import { useRef, useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Mail, 
//   Lock, 
//   Eye, 
//   EyeOff, 
//   User, 
//   Phone, 
//   Globe, 
//   Sparkles,
//   Shield,
//   Smartphone,
//   Home,
//   Building2,
//   MapPinned,
//   Flower2,
//   Heart,
//   Gift,
//   Star,
//   ArrowRight,
//   Leaf
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import GoogleLoginButton from '../components/GoogleLoginButton';
// import Footer from '../components/layout/Footer';

// // Font family constant
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

// // Product-related texts for rotation
// const productMessages = [
//   {
//     text: "Luxury makeup collection — from natural everyday to bold glam."
//   },
//   {
//     text: "Discover premium skincare essentials for radiant, glowing skin."
//   },
//   {
//     text: "Nourish your hair with our sulfate-free, damage-repair formulas."
//   },
//   {
//     text: "Transform your skincare routine with our best-selling serums."
//   },
//   {
//     text: "Cruelty-free beauty that loves your skin and the planet."
//   },
//   {
//     text: "Complete beauty solutions — makeup, skincare, and hair care."
//   },
//   {
//     text: "Achieve flawless complexion with our dermatologist-tested products."
//   },
//   {
//     text: "Professional-grade hair care for strength, shine, and vitality."
//   }
// ];

// // Helper component for required field label
// const RequiredLabel = ({ children }) => (
//   <span>
//     {children}
//     <span className="text-red-400 ml-0.5">*</span>
//   </span>
// );

// export default function RegisterClient() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
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
//     agreeToTerms: false
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [messageIndex, setMessageIndex] = useState(0);
  
//   // OTP Modal States
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [otpEmail, setOtpEmail] = useState('');
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [registrationData, setRegistrationData] = useState(null);
//   const timerRef = useRef(null);

//   // Rotate messages
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMessageIndex((prev) => (prev + 1) % productMessages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Helper function to format seconds as MM:SS
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match!');
//       setIsSubmitting(false);
//       return;
//     }

//     if (!formData.agreeToTerms) {
//       toast.error('Please agree to the terms and conditions');
//       setIsSubmitting(false);
//       return;
//     }

//     const loadingToast = toast.loading('Creating your account...');

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contactPerson: formData.contactPerson,
//           email: formData.email,
//           phone: formData.phone,
//           whatsapp: formData.whatsapp,
//           country: formData.country,
//           address: formData.address,
//           city: formData.city,
//           zipCode: formData.zipCode,
//           password: formData.password,
//           role: 'customer'
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         toast.error(data.error || 'Registration failed');
//         setIsSubmitting(false);
//         return;
//       }

//       toast.success('Account created!', {
//         description: 'Please enter the OTP sent to your email.',
//         duration: 4000,
//       });

//       setOtpEmail(formData.email);
//       setRegistrationData(data);
//       setShowOtpModal(true);
//       setOtp('');
//       setIsSubmitting(false);
//       startCountdown();

//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server. Please try again!',
//       });
//       setIsSubmitting(false);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     if (!otp || otp.length !== 6) {
//       toast.error('Please enter a valid 6-digit OTP');
//       return;
//     }

//     setIsVerifying(true);
//     const verifyingToast = toast.loading('Verifying OTP...');

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: otpEmail,
//           otp: otp
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(verifyingToast);

//       if (!response.ok) {
//         toast.error(data.error || 'Invalid OTP');
//         setIsVerifying(false);
//         return;
//       }

//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
      
//       toast.success('Email verified successfully!', {
//         description: 'Welcome to Beauty Bucket!',
//       });

//       setShowOtpModal(false);
      
//       setTimeout(() => {
//         router.push('/customer/dashboard');
//       }, 1500);

//     } catch (error) {
//       console.error('OTP verification error:', error);
//       toast.dismiss(verifyingToast);
//       toast.error('Verification failed', {
//         description: 'Please try again',
//       });
//       setIsVerifying(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     if (resendDisabled) return;

//     const resendToast = toast.loading('Resending OTP...');

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/auth/resend-otp`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: otpEmail
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(resendToast);

//       if (!response.ok) {
//         toast.error(data.error || 'Failed to resend OTP');
//         return;
//       }

//       toast.success('OTP resent!', {
//         description: 'Check your email for the new code.',
//       });

//       startCountdown();

//     } catch (error) {
//       console.error('Resend OTP error:', error);
//       toast.dismiss(resendToast);
//       toast.error('Failed to resend OTP');
//     }
//   };

//   const startCountdown = () => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
    
//     setResendDisabled(true);
//     setCountdown(600);
    
//     timerRef.current = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           timerRef.current = null;
//           setResendDisabled(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   // Google Sign Up Success Handler
//   const handleGoogleSuccess = (data) => {
//     console.log('Google sign up success:', data);
    
//     if (data.token) {
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
      
//       if (data.requiresAdditionalInfo) {
//         toast.success('Google Sign Up Successful!', {
//           description: 'Please complete your profile to continue.',
//           duration: 4000,
//         });
//       } else {
//         toast.success('Google Sign Up Successful!', {
//           description: `Welcome to Beauty Bucket, ${data.user.contactPerson || data.user.companyName || 'Beauty Enthusiast'}!`,
//           duration: 4000,
//         });
//       }
//     }
//   };

//   const handleGoogleError = (error) => {
//     console.error('Google sign up error:', error);
//     toast.error('Google Sign Up Failed', {
//       description: error || 'Unable to sign up with Google. Please try again.',
//     });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-[calc(100vh-64px)] bg-[#0a0a0a] overflow-hidden relative flex">
        
//         {/* Background Image with Gradient Overlay */}
//         <div className="absolute inset-0">
//           <div
//             className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//             style={{
//               backgroundImage: 'url(/images/login-2.jpg)',
//             }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#8B9D83]/15 via-transparent to-[#8B9D83]/5" />
//           </div>

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

//         {/* Split Layout - Left Side (Product Messages) */}
//         <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center items-center px-12 py-8">
//           <div className="max-w-md w-full">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mb-8"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
//                   <Flower2 className="w-6 h-6 text-[#8B9D83]" />
//                 </div>
//                 <span className="text-white/60 text-xs tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
//                   BeautyBucket
//                 </span>
//               </div>
//             </motion.div>

//             <div className="relative min-h-[100px]">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={messageIndex}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.6, ease: "easeOut" }}
//                   className="absolute inset-0"
//                 >
//                   <div className="flex items-start gap-3">
//                     <Sparkles className="w-5 h-5 text-[#8B9D83] mt-1 flex-shrink-0" />
//                     <div>
//                       <p 
//                         className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-3"
//                         style={{ fontFamily: FONT_FAMILY }}
//                       >
//                         {productMessages[messageIndex].text}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             <div className="flex gap-2 mt-8">
//               {productMessages.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setMessageIndex(i)}
//                   className={`transition-all duration-300 rounded-full ${
//                     i === messageIndex 
//                       ? 'w-8 h-1.5 bg-[#8B9D83]' 
//                       : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
//                   }`}
//                 />
//               ))}
//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="mt-10 pt-8 border-t border-white/10"
//             >
//               <p 
//                 className="text-white/50 text-sm mb-4"
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 Already have an account?
//               </p>
//               <Link href="/login">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/30 flex items-center gap-2 group"
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   Sign In
//                 </motion.button>
//               </Link>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="flex items-center gap-6 mt-8"
//             >
//               <div className="flex items-center gap-2">
//                 <Heart className="w-3.5 h-3.5 text-[#8B9D83]" />
//                 <span className="text-[10px] text-white/40" style={{ fontFamily: FONT_FAMILY }}>10K+ Happy Users</span>
//               </div>
//               <div className="w-px h-4 bg-white/10" />
//               <div className="flex items-center gap-2">
//                 <Star className="w-3.5 h-3.5 text-[#8B9D83]" />
//                 <span className="text-[10px] text-white/40" style={{ fontFamily: FONT_FAMILY }}>4.9 Rating</span>
//               </div>
//               <div className="w-px h-4 bg-white/10" />
//               <div className="flex items-center gap-2">
//                 <Gift className="w-3.5 h-3.5 text-[#8B9D83]" />
//                 <span className="text-[10px] text-white/40" style={{ fontFamily: FONT_FAMILY }}>Free Shipping</span>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Right Side - Registration Form - INCREASED WIDTH */}
//         <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center px-4 py-6">
//           <div className="w-full max-w-2xl">
//             {/* Mobile Brand */}
//             <div className="lg:hidden text-center mb-5">
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <div className="inline-block mb-2">
//                   <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto shadow-xl">
//                     <Flower2 className="w-7 h-7 text-[#8B9D83]" />
//                   </div>
//                 </div>
//                 <h1
//                   className="text-2xl font-light text-white mb-0.5"
//                   style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.05em' }}
//                 >
//                   Create Account
//                 </h1>
//                 <p
//                   className="text-white/40 text-xs font-light"
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   Join the BeautyBucket family
//                 </p>
//               </motion.div>
//             </div>

//             {/* Registration Card with Animated Border - INCREASED WIDTH */}
//             <div className="relative">
//               {/* Animated Border Container */}
//               <div className="absolute -inset-0.5 rounded-xl overflow-hidden">
//                 <div className="absolute inset-0 rounded-xl border-2 border-transparent">
//                   <div className="absolute top-[-2px] left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#8B9D83] to-transparent animate-border-top" />
//                   <div className="absolute top-0 right-[-2px] w-[2px] h-1/3 bg-gradient-to-b from-transparent via-[#8B9D83] to-transparent animate-border-right" />
//                   <div className="absolute bottom-[-2px] right-0 w-1/3 h-[2px] bg-gradient-to-l from-transparent via-[#8B9D83] to-transparent animate-border-bottom" />
//                   <div className="absolute bottom-0 left-[-2px] w-[2px] h-1/3 bg-gradient-to-t from-transparent via-[#8B9D83] to-transparent animate-border-left" />
//                 </div>
//               </div>

//               {/* Form Card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 className="relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 shadow-2xl"
//               >
//                 {/* Desktop Header */}
//                 <div className="hidden lg:block mb-5">
//                   <h1
//                     className="text-xl font-light text-white"
//                     style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.05em' }}
//                   >
//                     Create Account
//                   </h1>
//                   <p
//                     className="text-white/40 text-xs font-light"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     Join the BeautyBucket family
//                   </p>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Contact Person - Required */}
//                     <div>
//                       <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-1" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
//                         <User className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
//                         <RequiredLabel>Full Name</RequiredLabel>
//                       </label>
//                       <input
//                         type="text"
//                         name="contactPerson"
//                         value={formData.contactPerson}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                         style={{ fontFamily: FONT_FAMILY }}
//                         placeholder="Full name"
//                       />
//                     </div>

//                     {/* Email - Required */}
//                     <div>
//                       <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-1" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
//                         <Mail className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
//                         <RequiredLabel>Email Address</RequiredLabel>
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                         style={{ fontFamily: FONT_FAMILY }}
//                         placeholder="your@email.com"
//                       />
//                     </div>

//                     {/* Phone - Required */}
//                     <div>
//                       <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-1" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
//                         <Phone className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
//                         <RequiredLabel>Phone Number</RequiredLabel>
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                         style={{ fontFamily: FONT_FAMILY }}
//                         placeholder="01XXXXXXXXX"
//                       />
//                     </div>

//                     {/* WhatsApp - NOT Required */}
//                     <div>
//                       <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-1" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
//                         <Smartphone className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
//                         WhatsApp
//                       </label>
//                       <input
//                         type="tel"
//                         name="whatsapp"
//                         value={formData.whatsapp}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                         style={{ fontFamily: FONT_FAMILY }}
//                         placeholder="+880-1XXXXXXXXX"
//                       />
//                     </div>

//                     {/* Country - Required */}
//                     <div>
//                       <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-1" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
//                         <Globe className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
//                         <RequiredLabel>Country</RequiredLabel>
//                       </label>
//                       <input
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                         style={{ fontFamily: FONT_FAMILY }}
//                         placeholder="Bangladesh"
//                       />
//                     </div>

//                     {/* City - Required */}
//                     <div>
//                       <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-1" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
//                         <Building2 className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
//                         <RequiredLabel>City</RequiredLabel>
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                         style={{ fontFamily: FONT_FAMILY }}
//                         placeholder="Dhaka"
//                       />
//                     </div>

//                     {/* Address - Required */}
//                     <div>
//                       <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-1" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
//                         <Home className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
//                         <RequiredLabel>Street Address</RequiredLabel>
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                         style={{ fontFamily: FONT_FAMILY }}
//                         placeholder="Your street address"
//                       />
//                     </div>

//                     {/* Zip Code - Required */}
//                     <div>
//                       <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-1" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
//                         <MapPinned className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
//                         <RequiredLabel>Zip Code</RequiredLabel>
//                       </label>
//                       <input
//                         type="text"
//                         name="zipCode"
//                         value={formData.zipCode}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                         style={{ fontFamily: FONT_FAMILY }}
//                         placeholder="10001"
//                       />
//                     </div>

//                     {/* Password - Required */}
//                     <div>
//                       <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-1" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
//                         <Lock className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
//                         <RequiredLabel>Password</RequiredLabel>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           name="password"
//                           value={formData.password}
//                           onChange={handleChange}
//                           required
//                           minLength="8"
//                           className="w-full px-4 py-2.5 pr-10 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                           style={{ fontFamily: FONT_FAMILY }}
//                           placeholder="Min. 8 chars"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
//                         >
//                           {showPassword ? (
//                             <EyeOff className="w-4 h-4" />
//                           ) : (
//                             <Eye className="w-4 h-4" />
//                           )}
//                         </button>
//                       </div>
//                     </div>

//                     {/* Confirm Password - Required */}
//                     <div>
//                       <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-1" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
//                         <Lock className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
//                         <RequiredLabel>Confirm Password</RequiredLabel>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showConfirmPassword ? "text" : "password"}
//                           name="confirmPassword"
//                           value={formData.confirmPassword}
//                           onChange={handleChange}
//                           required
//                           minLength="8"
//                           className="w-full px-4 py-2.5 pr-10 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                           style={{ fontFamily: FONT_FAMILY }}
//                           placeholder="Re-enter password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
//                         >
//                           {showConfirmPassword ? (
//                             <EyeOff className="w-4 h-4" />
//                           ) : (
//                             <Eye className="w-4 h-4" />
//                           )}
//                         </button>
//                       </div>
//                     </div>

//                     {/* Terms Agreement - Full Width */}
//                     <div className="md:col-span-2">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="agreeToTerms"
//                           checked={formData.agreeToTerms}
//                           onChange={handleChange}
//                           className="rounded border-white/20 bg-white/5 text-[#8B9D83] focus:ring-[#8B9D83]/50 focus:ring-offset-0 w-4 h-4"
//                         />
//                         <span className="text-[10px] text-white/40" style={{ fontFamily: FONT_FAMILY }}>
//                           I agree to the{' '}
//                           <Link href="/terms" className="text-[#8B9D83] hover:text-[#9aad92] transition-colors font-medium">
//                             Terms
//                           </Link>{' '}
//                           and{' '}
//                           <Link href="/privacy" className="text-[#8B9D83] hover:text-[#9aad92] transition-colors font-medium">
//                             Privacy Policy
//                           </Link>
//                         </span>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <motion.button
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     disabled={isSubmitting || !formData.agreeToTerms}
//                     className="w-full mt-4 bg-[#8B9D83] text-white py-3 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-[#7a8d72] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.06em' }}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         Creating...
//                       </>
//                     ) : (
//                       <>
//                         Create Account
//                         <ArrowRight className="w-4 h-4" />
//                       </>
//                     )}
//                   </motion.button>

//                   {/* Divider */}
//                   <div className="relative my-3">
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

//                   {/* Google Sign Up Button */}
//                   <div className="w-full">
//                     <GoogleLoginButton 
//                       mode="signup"
//                       onSuccess={handleGoogleSuccess}
//                       onError={handleGoogleError}
//                     />
//                   </div>

//                   {/* Login Link - On Form */}
//                   <div className="text-center pt-1">
//                     <p
//                       className="text-[11px] text-white/30"
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       Already have an account?{' '}
//                       <Link
//                         href="/login"
//                         className="text-[#8B9D83] hover:text-[#9aad92] transition-colors font-medium inline-flex items-center gap-1"
//                       >
//                         Sign In
//                         <ArrowRight className="w-3 h-3" />
//                       </Link>
//                     </p>
//                   </div>
//                 </form>
//               </motion.div>
//             </div>

//             {/* Trust Badge - Mobile */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.6 }}
//               className="lg:hidden flex items-center justify-center gap-4 mt-4"
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

//         {/* OTP Verification Modal */}
//         <AnimatePresence>
//           {showOtpModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center p-4"
//               style={{ 
//                 background: 'rgba(0, 0, 0, 0.7)',
//                 backdropFilter: 'blur(8px)',
//               }}
//               onClick={() => !isVerifying && setShowOtpModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                 className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 shadow-2xl max-w-md w-full relative"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="text-center mb-5">
//                   <div className="w-14 h-14 bg-[#8B9D83]/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border border-[#8B9D83]/30">
//                     <Mail className="w-7 h-7 text-[#8B9D83]" />
//                   </div>
//                   <h3 className="text-lg font-light text-white mb-1" style={{ fontFamily: FONT_FAMILY }}>
//                     Verify Your Email
//                   </h3>
//                   <p className="text-xs text-white/40" style={{ fontFamily: FONT_FAMILY }}>
//                     We've sent a verification code to <br />
//                     <span className="font-medium text-[#8B9D83]">{otpEmail}</span>
//                   </p>
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-2 text-center" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
//                     Enter 6-Digit Code
//                   </label>
//                   <input
//                     type="text"
//                     maxLength="6"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
//                     placeholder="000000"
//                     className="w-full px-4 py-2.5 text-center text-xl tracking-wider bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300 font-mono"
//                     style={{ fontFamily: FONT_FAMILY }}
//                     autoFocus
//                     disabled={isVerifying}
//                   />
//                 </div>

//                 <button
//                   onClick={handleVerifyOTP}
//                   disabled={isVerifying || otp.length !== 6}
//                   className="w-full bg-[#8B9D83] text-white py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-[#7a8d72] disabled:opacity-50 text-sm"
//                   style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.06em' }}
//                 >
//                   {isVerifying ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Verifying...
//                     </span>
//                   ) : (
//                     'Verify & Continue'
//                   )}
//                 </button>

//                 <div className="mt-3 text-center">
//                   <button
//                     onClick={handleResendOTP}
//                     disabled={resendDisabled}
//                     className="text-xs text-white/40 hover:text-[#8B9D83] transition-colors disabled:opacity-50 font-medium"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     {resendDisabled ? `Resend OTP in ${formatTime(countdown)}` : 'Resend OTP'}
//                   </button>
//                 </div>

//                 <div className="mt-3 pt-3 border-t border-white/10">
//                   <button
//                     onClick={() => {
//                       if (timerRef.current) {
//                         clearInterval(timerRef.current);
//                         timerRef.current = null;
//                       }
//                       setShowOtpModal(false);
//                     }}
//                     disabled={isVerifying}
//                     className="w-full text-xs text-white/20 hover:text-white/40 transition-colors"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
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

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  MapPin, 
  Globe, 
  CheckCircle, 
  Sparkles,
  Shield,
  Headphones,
  Truck,
  Smartphone,
  Home,
  Building2,
  MapPinned,
  Flower2,
  Heart,
  Gift,
  Star,
  ArrowRight,
  Leaf
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import GoogleLoginButton from '../components/GoogleLoginButton';
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

// Helper component for required field label
const RequiredLabel = ({ children }) => (
  <span>
    {children}
    <span className="text-red-400 ml-0.5">*</span>
  </span>
);

export default function RegisterClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  
  // OTP Modal States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [registrationData, setRegistrationData] = useState(null);
  const timerRef = useRef(null);

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % productMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to format seconds as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setIsSubmitting(false);
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      setIsSubmitting(false);
      return;
    }

    const loadingToast = toast.loading('Creating your account...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          country: formData.country,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          password: formData.password,
          role: 'customer'
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error(data.error || 'Registration failed');
        setIsSubmitting(false);
        return;
      }

      toast.success('Account created!', {
        description: 'Please enter the OTP sent to your email.',
        duration: 4000,
      });

      setOtpEmail(formData.email);
      setRegistrationData(data);
      setShowOtpModal(true);
      setOtp('');
      setIsSubmitting(false);
      startCountdown();

    } catch (error) {
      console.error('Registration error:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please try again!',
      });
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    const verifyingToast = toast.loading('Verifying OTP...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: otpEmail,
          otp: otp
        }),
      });

      const data = await response.json();
      toast.dismiss(verifyingToast);

      if (!response.ok) {
        toast.error(data.error || 'Invalid OTP');
        setIsVerifying(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast.success('Email verified successfully!', {
        description: 'Welcome to Beauty Bucket!',
      });

      setShowOtpModal(false);
      
      setTimeout(() => {
        router.push('/customer/dashboard');
      }, 1500);

    } catch (error) {
      console.error('OTP verification error:', error);
      toast.dismiss(verifyingToast);
      toast.error('Verification failed', {
        description: 'Please try again',
      });
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    const resendToast = toast.loading('Resending OTP...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: otpEmail
        }),
      });

      const data = await response.json();
      toast.dismiss(resendToast);

      if (!response.ok) {
        toast.error(data.error || 'Failed to resend OTP');
        return;
      }

      toast.success('OTP resent!', {
        description: 'Check your email for the new code.',
      });

      startCountdown();

    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.dismiss(resendToast);
      toast.error('Failed to resend OTP');
    }
  };

  const startCountdown = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setResendDisabled(true);
    setCountdown(600);
    
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Google Sign Up Success Handler
  const handleGoogleSuccess = (data) => {
    console.log('Google sign up success:', data);
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (data.requiresAdditionalInfo) {
        toast.success('Google Sign Up Successful!', {
          description: 'Please complete your profile to continue.',
          duration: 4000,
        });
      } else {
        toast.success('Google Sign Up Successful!', {
          description: `Welcome to Beauty Bucket, ${data.user.contactPerson || data.user.companyName || 'Beauty Enthusiast'}!`,
          duration: 4000,
        });
      }
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google sign up error:', error);
    toast.error('Google Sign Up Failed', {
      description: error || 'Unable to sign up with Google. Please try again.',
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

            {/* Sign In Button */}
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
                Already have an account?
              </p>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/30 flex items-center gap-2 group"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Sign In
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

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-md">
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
                  Create Account
                </h1>
                <p
                  className="text-white/40 text-xs font-light"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  Join the BeautyBucket family
                </p>
              </motion.div>
            </div>

            {/* Registration Card with Animated Border */}
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
                    Create Account
                  </h1>
                  <p
                    className="text-white/40 text-xs font-light"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Join the BeautyBucket family
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Contact Person - Required */}
                    <div>
                      <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-0.5" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
                        <User className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
                        <RequiredLabel>Full Name</RequiredLabel>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                        style={{ fontFamily: FONT_FAMILY }}
                        placeholder="Full name"
                      />
                    </div>

                    {/* Email - Required */}
                    <div>
                      <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-0.5" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
                        <Mail className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
                        <RequiredLabel>Email Address</RequiredLabel>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                        style={{ fontFamily: FONT_FAMILY }}
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Phone - Required */}
                    <div>
                      <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-0.5" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
                        <Phone className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
                        <RequiredLabel>Phone Number</RequiredLabel>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                        style={{ fontFamily: FONT_FAMILY }}
                        placeholder="01XXXXXXXXX"
                      />
                    </div>

                    {/* WhatsApp - NOT Required */}
                    <div>
                      <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-0.5" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
                        <Smartphone className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                        style={{ fontFamily: FONT_FAMILY }}
                        placeholder="+880-1XXXXXXXXX"
                      />
                    </div>

                    {/* Country - Required */}
                    <div>
                      <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-0.5" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
                        <Globe className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
                        <RequiredLabel>Country</RequiredLabel>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                        style={{ fontFamily: FONT_FAMILY }}
                        placeholder="Bangladesh"
                      />
                    </div>

                    {/* City - Required */}
                    <div>
                      <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-0.5" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
                        <Building2 className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
                        <RequiredLabel>City</RequiredLabel>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                        style={{ fontFamily: FONT_FAMILY }}
                        placeholder="Dhaka"
                      />
                    </div>

                    {/* Address - Required */}
                    <div>
                      <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-0.5" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
                        <Home className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
                        <RequiredLabel>Street Address</RequiredLabel>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                        style={{ fontFamily: FONT_FAMILY }}
                        placeholder="Your street address"
                      />
                    </div>

                    {/* Zip Code - Required */}
                    <div>
                      <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-0.5" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
                        <MapPinned className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
                        <RequiredLabel>Zip Code</RequiredLabel>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                        style={{ fontFamily: FONT_FAMILY }}
                        placeholder="10001"
                      />
                    </div>

                    {/* Password - Required */}
                    <div>
                      <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-0.5" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
                        <Lock className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
                        <RequiredLabel>Password</RequiredLabel>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength="8"
                          className="w-full px-3 py-2 pr-8 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                          style={{ fontFamily: FONT_FAMILY }}
                          placeholder="Min. 8 chars"
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

                    {/* Confirm Password - Required */}
                    <div>
                      <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-0.5" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
                        <Lock className="w-3 h-3 inline mr-1 text-[#8B9D83]" />
                        <RequiredLabel>Confirm Password</RequiredLabel>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          minLength="8"
                          className="w-full px-3 py-2 pr-8 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
                          style={{ fontFamily: FONT_FAMILY }}
                          placeholder="Re-enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Terms Agreement - Full Width */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="rounded border-white/20 bg-white/5 text-[#8B9D83] focus:ring-[#8B9D83]/50 focus:ring-offset-0 w-3.5 h-3.5"
                        />
                        <span className="text-[10px] text-white/40" style={{ fontFamily: FONT_FAMILY }}>
                          I agree to the{' '}
                          <Link href="/terms" className="text-[#8B9D83] hover:text-[#9aad92] transition-colors font-medium">
                            Terms
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-[#8B9D83] hover:text-[#9aad92] transition-colors font-medium">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || !formData.agreeToTerms}
                    className="w-full mt-3 bg-[#8B9D83] text-white py-2.5 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-[#7a8d72] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.06em' }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4" />
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

                  {/* Google Sign Up Button */}
                  <div className="w-full">
                    <GoogleLoginButton 
                      mode="signup"
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                    />
                  </div>

                  {/* Login Link - On Form */}
                  <div className="text-center pt-1">
                    <p
                      className="text-[11px] text-white/30"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      Already have an account?{' '}
                      <Link
                        href="/login"
                        className="text-[#8B9D83] hover:text-[#9aad92] transition-colors font-medium inline-flex items-center gap-1"
                      >
                        Sign In
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

        {/* OTP Verification Modal */}
        <AnimatePresence>
          {showOtpModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ 
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
              }}
              onClick={() => !isVerifying && setShowOtpModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 shadow-2xl max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-5">
                  <div className="w-14 h-14 bg-[#8B9D83]/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border border-[#8B9D83]/30">
                    <Mail className="w-7 h-7 text-[#8B9D83]" />
                  </div>
                  <h3 className="text-lg font-light text-white mb-1" style={{ fontFamily: FONT_FAMILY }}>
                    Verify Your Email
                  </h3>
                  <p className="text-xs text-white/40" style={{ fontFamily: FONT_FAMILY }}>
                    We've sent a verification code to <br />
                    <span className="font-medium text-[#8B9D83]">{otpEmail}</span>
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-[10px] font-medium tracking-wider uppercase text-white/50 mb-2 text-center" style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}>
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full px-4 py-2.5 text-center text-xl tracking-wider bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300 font-mono"
                    style={{ fontFamily: FONT_FAMILY }}
                    autoFocus
                    disabled={isVerifying}
                  />
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={isVerifying || otp.length !== 6}
                  className="w-full bg-[#8B9D83] text-white py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-[#7a8d72] disabled:opacity-50 text-sm"
                  style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.06em' }}
                >
                  {isVerifying ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    'Verify & Continue'
                  )}
                </button>

                <div className="mt-3 text-center">
                  <button
                    onClick={handleResendOTP}
                    disabled={resendDisabled}
                    className="text-xs text-white/40 hover:text-[#8B9D83] transition-colors disabled:opacity-50 font-medium"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {resendDisabled ? `Resend OTP in ${formatTime(countdown)}` : 'Resend OTP'}
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10">
                  <button
                    onClick={() => {
                      if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                      }
                      setShowOtpModal(false);
                    }}
                    disabled={isVerifying}
                    className="w-full text-xs text-white/20 hover:text-white/40 transition-colors"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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