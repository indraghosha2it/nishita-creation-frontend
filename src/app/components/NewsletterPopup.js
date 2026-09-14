
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'sonner';
// import { Mail, Bell, X, Leaf, CheckCircle, User, Lock, ArrowRight, Loader2, Eye, EyeOff, Building, Phone, MapPin } from 'lucide-react';
// import GoogleLoginButtonPopUp from './GoogleLoginButtonPopUp';

// export default function NewsletterPopup({ 
//   isExternallyControlled = false, 
//   onClose: externalOnClose = null,
//   forceOpen = false
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showCount, setShowCount] = useState(0);
//   const [isSubscribing, setIsSubscribing] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authMode, setAuthMode] = useState('login');
//   const [pendingSubscription, setPendingSubscription] = useState(false);
  
//   // OTP Verification States
//   const [showOTPModal, setShowOTPModal] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [otpEmail, setOtpEmail] = useState('');
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(0);
  
//   // Login States
//   const [loginEmail, setLoginEmail] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
//   const [loginLoading, setLoginLoading] = useState(false);
//   const [showLoginPassword, setShowLoginPassword] = useState(false);
  
//   // Register States
//   const [registerForm, setRegisterForm] = useState({
//     companyName: '',
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
//   const [showRegisterPassword, setShowRegisterPassword] = useState(false);
//   const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);
  
//   // Track if popup has been shown in this session
//   const [hasShownInSession, setHasShownInSession] = useState(false);
  
//   const timerRef = useRef(null);
//   const intervalRef = useRef(null);
//   const router = useRouter();

//   // Format time for countdown
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Start countdown for OTP resend
//   const startCountdown = () => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
    
//     setResendDisabled(true);
//     setCountdown(60);
    
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

//   // Check if user is logged in
//   useEffect(() => {
//     const checkUser = () => {
//       const token = localStorage.getItem('token');
//       const userData = localStorage.getItem('user');
      
//       if (token && userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setUser(parsedUser);
//           setIsLoggedIn(true);
//           checkSubscriptionStatus(parsedUser);
//         } catch (error) {
//           console.error('Error parsing user:', error);
//         }
//       } else {
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     };
    
//     checkUser();
    
//     const handleAuthChange = () => {
//       console.log('🔄 Auth change detected in popup, refreshing...');
//       checkUser();
//     };
    
//     window.addEventListener('auth-change', handleAuthChange);
//     return () => window.removeEventListener('auth-change', handleAuthChange);
//   }, []);

//   // Check subscription status
//   const checkSubscriptionStatus = async (userData) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) return;
      
//       const response = await fetch('http://localhost:5000/api/auth/subscription-status', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setIsSubscribed(data.isSubscribed);
//       }
//     } catch (error) {
//       console.error('Error checking subscription:', error);
//     }
//   };

//   // Handle forceOpen from parent
//   useEffect(() => {
//     if (forceOpen && !isOpen) {
//       console.log('📧 Force opening newsletter popup from parent');
//       setIsOpen(true);
//     }
//   }, [forceOpen]);

//   // Handle popup timing - respect external control
//   useEffect(() => {
//     // Don't auto-show when externally controlled
//     if (isExternallyControlled) return;
    
//     if (isSubscribed) return;
    
//     // Generate a unique session ID for this page load
//     const sessionId = Date.now().toString();
//     const currentSession = localStorage.getItem('newsletterPopupSession');
    
//     // If this is a new session (page reload), reset the counter
//     if (!currentSession || currentSession !== sessionId) {
//       localStorage.setItem('newsletterPopupSession', sessionId);
//       localStorage.removeItem('newsletterPopupCount');
//       setShowCount(0);
//       setHasShownInSession(false);
//     }
    
//     // Get current show count (should be 0 on fresh reload)
//     const storedCount = localStorage.getItem('newsletterPopupCount');
//     const initialCount = storedCount ? parseInt(storedCount) : 0;
//     setShowCount(initialCount);
    
//     // If already shown 3 times in this session, don't show again
//     if (initialCount >= 3) return;
    
//     // Show popup after 5 seconds
//     const firstTimer = setTimeout(() => {
//       if (!hasShownInSession && initialCount < 3) {
//         setIsOpen(true);
//         setHasShownInSession(true);
//       }
//     }, 5000);
    
//     return () => {
//       clearTimeout(firstTimer);
//     };
//   }, [isSubscribed, isExternallyControlled]);

//   // Handle popup close with external control support
//   const handleClose = () => {
//     if (isExternallyControlled && externalOnClose) {
//       setIsOpen(false);
//       externalOnClose();
//     } else {
//       // Original close logic
//       setIsOpen(false);
//       const newCount = showCount + 1;
//       setShowCount(newCount);
//       localStorage.setItem('newsletterPopupCount', newCount.toString());
//       setHasShownInSession(false);
      
//       // If not shown 3 times yet, schedule next popup
//       if (newCount < 3) {
//         const nextTimer = setTimeout(() => {
//           setIsOpen(true);
//           setHasShownInSession(true);
//         }, 15000);
        
//         // Store timeout reference for cleanup
//         if (intervalRef.current) clearTimeout(intervalRef.current);
//         intervalRef.current = nextTimer;
//       }
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (intervalRef.current) clearTimeout(intervalRef.current);
//     };
//   }, []);

//   // Handle subscribe button click
//   const handleSubscribeClick = () => {
//     if (!isLoggedIn) {
//       setPendingSubscription(true);
//       setIsOpen(false);
//       setShowAuthModal(true);
//       setAuthMode('login');
//     } else if (isSubscribed) {
//       toast.info('Already Subscribed', {
//         description: 'You are already subscribed to our newsletter.'
//       });
//       handleClose();
//     } else {
//       performSubscription();
//     }
//   };

//   // Perform actual subscription
//   const performSubscription = async () => {
//     setIsSubscribing(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/auth/subscribe', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         toast.success('Subscribed Successfully!', {
//           description: 'You will now receive our B2B newsletter.',
//           duration: 5000,
//         });
//         setIsSubscribed(true);
//         setIsOpen(false);
//         setPendingSubscription(false);
//         window.dispatchEvent(new Event('auth-change'));
//       } else {
//         toast.error('Subscription Failed', {
//           description: data.error || 'Something went wrong.'
//         });
//       }
//     } catch (error) {
//       console.error('Subscribe error:', error);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server.'
//       });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   // Handle OTP Verification
//   const handleVerifyOTP = async () => {
//     if (!otp || otp.length !== 6) {
//       toast.error('Please enter a valid 6-digit OTP');
//       return;
//     }

//     setIsVerifying(true);
//     const verifyingToast = toast.loading('Verifying OTP...');

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: otpEmail, otp: otp }),
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
//         description: 'Welcome to Jute Craftify!',
//       });

//       setUser(data.user);
//       setIsLoggedIn(true);
//       setShowOTPModal(false);
//       setShowAuthModal(false);
//       setOtp('');
      
//       window.dispatchEvent(new Event('auth-change'));
      
//       await checkSubscriptionStatus(data.user);
      
//       if (pendingSubscription && !data.user.isSubscribedToNewsletter) {
//         setTimeout(() => {
//           setIsOpen(true);
//         }, 500);
//       } else if (pendingSubscription && data.user.isSubscribedToNewsletter) {
//         toast.info('Already Subscribed', {
//           description: 'This account is already subscribed to our newsletter.'
//         });
//         setPendingSubscription(false);
//       }

//     } catch (error) {
//       console.error('OTP verification error:', error);
//       toast.dismiss(verifyingToast);
//       toast.error('Verification failed', {
//         description: 'Please try again',
//       });
//       setIsVerifying(false);
//     }
//   };

//   // Handle resend OTP
//   const handleResendOTP = async () => {
//     if (resendDisabled) return;

//     const resendToast = toast.loading('Resending OTP...');

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: otpEmail }),
//       });

//       const data = await response.json();
//       toast.dismiss(resendToast);

//       if (!response.ok) {
//         toast.error(data.error || 'Failed to resend OTP');
//         return;
//       }

//       toast.success('OTP resent successfully!', {
//         description: 'Please check your email.',
//       });

//       startCountdown();

//     } catch (error) {
//       console.error('Resend OTP error:', error);
//       toast.dismiss(resendToast);
//       toast.error('Failed to resend OTP');
//     }
//   };

//   // Handle login from modal
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!loginEmail || !loginPassword) {
//       toast.error('Please fill in all fields');
//       return;
//     }
    
//     setLoginLoading(true);
    
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: loginEmail, password: loginPassword })
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
        
//         window.dispatchEvent(new Event('auth-change'));
        
//         toast.success('Login successful!');
        
//         setUser(data.user);
//         setIsLoggedIn(true);
        
//         await checkSubscriptionStatus(data.user);
        
//         setShowAuthModal(false);
//         setLoginEmail('');
//         setLoginPassword('');
        
//         if (pendingSubscription && !data.user.isSubscribedToNewsletter) {
//           setTimeout(() => {
//             setIsOpen(true);
//           }, 500);
//         } else if (pendingSubscription && data.user.isSubscribedToNewsletter) {
//           toast.info('Already Subscribed', {
//             description: 'This account is already subscribed to our newsletter.'
//           });
//           setPendingSubscription(false);
//         }
//       } else {
//         if (data.requiresVerification) {
//           setOtpEmail(loginEmail);
//           setShowAuthModal(false);
//           setShowOTPModal(true);
//           startCountdown();
//           toast.info('Please verify your email', {
//             description: 'We\'ve sent a verification code to your email.'
//           });
//         } else {
//           toast.error(data.error || 'Login failed');
//         }
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error('Connection Error');
//     } finally {
//       setLoginLoading(false);
//     }
//   };

//   // Handle register
//   const handleRegister = async (e) => {
//     e.preventDefault();
    
//     if (registerForm.password !== registerForm.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }
    
//     if (registerForm.password.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       return;
//     }
    
//     if (!registerForm.agreeToTerms) {
//       toast.error('Please agree to the terms and conditions');
//       return;
//     }
    
//     const requiredFields = ['companyName', 'contactPerson', 'email', 'phone', 'country', 'address', 'city', 'zipCode'];
//     const missingFields = requiredFields.filter(field => !registerForm[field]);
    
//     if (missingFields.length > 0) {
//       toast.error('Missing Fields', {
//         description: `Please fill in: ${missingFields.join(', ')}`
//       });
//       return;
//     }
    
//     setIsRegistering(true);
    
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           companyName: registerForm.companyName,
//           contactPerson: registerForm.contactPerson,
//           email: registerForm.email,
//           phone: registerForm.phone,
//           whatsapp: registerForm.whatsapp,
//           country: registerForm.country,
//           address: registerForm.address,
//           city: registerForm.city,
//           zipCode: registerForm.zipCode,
//           password: registerForm.password,
//           role: 'customer'
//         })
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         toast.success('OTP Sent!', {
//           description: 'Please check your email for verification code.',
//         });
        
//         setOtpEmail(registerForm.email);
//         setShowAuthModal(false);
//         setShowOTPModal(true);
//         startCountdown();
        
//         setRegisterForm({
//           companyName: '', contactPerson: '', email: '', phone: '', whatsapp: '',
//           country: '', address: '', city: '', zipCode: '', password: '', confirmPassword: '', agreeToTerms: false
//         });
//       } else {
//         toast.error(data.error || 'Registration failed');
//       }
//     } catch (error) {
//       console.error('Register error:', error);
//       toast.error('Connection Error');
//     } finally {
//       setIsRegistering(false);
//     }
//   };

//   // Handle Google success
//   const handleGoogleSuccess = async (data) => {
//     const { token, user: userData } = data;
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
    
//     window.dispatchEvent(new Event('auth-change'));
    
//     setUser(userData);
//     setIsLoggedIn(true);
//     setShowAuthModal(false);
    
//     await checkSubscriptionStatus(userData);
    
//     toast.success('Welcome!');
    
//     if (pendingSubscription && !userData.isSubscribedToNewsletter) {
//       setTimeout(() => {
//         setIsOpen(true);
//       }, 500);
//     } else if (pendingSubscription && userData.isSubscribedToNewsletter) {
//       toast.info('Already Subscribed', {
//         description: 'This account is already subscribed to our newsletter.'
//       });
//       setPendingSubscription(false);
//     }
//   };

//   const handleGoogleError = (error) => {
//     toast.error(error);
//   };

//   // Register form change handler
//   const handleRegisterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setRegisterForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // Early return conditions - MODIFIED
//   // For externally controlled, check subscription status
//   if (isExternallyControlled && isSubscribed) return null;
  
//   // Don't block rendering for externally controlled - parent handles visibility
//   if (!isExternallyControlled && isSubscribed) return null;

//   return (
//     <>
//       {/* Main Newsletter Popup */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             style={{ 
//               background: 'rgba(0, 0, 0, 0.6)',
//               backdropFilter: 'blur(8px)',
//             }}
//             onClick={(e) => {
//               if (e.target === e.currentTarget) handleClose();
//             }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
//             >
//               {/* Header */}
//               <div className="relative bg-gradient-to-r from-[#6B4F3A] to-[#3bc24f] px-6 py-4">
//                 <button
//                   onClick={handleClose}
//                   className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
                
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
//                     <Bell className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-white">Stay Updated!</h3>
//                     <p className="text-white/80 text-xs">Get B2B news & exclusive offers</p>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Content */}
//               <div className="p-6">
//                 <div className="text-center mb-4">
//                   <div className="w-20 h-20 rounded-full bg-[#F5E6D3] flex items-center justify-center mx-auto mb-3">
//                     <Mail className="w-10 h-10 text-[#3bc24f]" />
//                   </div>
//                   <h4 className="text-xl font-bold text-[#6B4F3A] font-serif">
//                     Subscribe to Newsletter
//                   </h4>
//                   <p className="text-gray-500 text-xs mt-1">
//                     Get the latest updates on new products, bulk offers, and industry news
//                   </p>
//                 </div>
                
//                 {/* Benefits */}
//                 <div className="space-y-2 mb-5">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
//                     <span>Exclusive B2B wholesale offers</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
//                     <span>New product launch alerts</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
//                     <span>Sustainability & export updates</span>
//                   </div>
//                 </div>
                
//                 {/* Subscribe Button */}
//                 <button
//                   onClick={handleSubscribeClick}
//                   disabled={isSubscribing}
//                   className="w-full bg-[#3bc24f] text-white py-3 rounded-lg font-semibold hover:bg-[#2da63f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
//                 >
//                   {isSubscribing ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Subscribing...
//                     </>
//                   ) : (
//                     <>
//                       <Bell className="w-4 h-4" />
//                       {isLoggedIn ? 'Subscribe Now' : 'Login to Subscribe'}
//                     </>
//                   )}
//                 </button>
                
//                 {!isLoggedIn && (
//                   <p className="text-center text-xs text-gray-400 mt-3">
//                     Login or create an account to subscribe
//                   </p>
//                 )}
                
//                 {isLoggedIn && isSubscribed && (
//                   <p className="text-center text-xs text-green-600 mt-3">
//                     ✓ You are already subscribed
//                   </p>
//                 )}
                
//                 {/* Trust Badge */}
//                 <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center gap-3">
//                   <Leaf className="w-4 h-4 text-[#3bc24f]" />
//                   <span className="text-[10px] text-gray-400">No spam. Unsubscribe anytime.</span>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
      
//       {/* Login/Register Modal */}
//       <AnimatePresence>
//         {showAuthModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             style={{ 
//               background: 'rgba(0, 0, 0, 0.6)',
//               backdropFilter: 'blur(8px)',
//             }}
//             onClick={(e) => {
//               if (e.target === e.currentTarget) {
//                 setShowAuthModal(false);
//                 setPendingSubscription(false);
//               }
//             }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto"
//             >
//               {/* Modal Header */}
//               <div className="sticky top-0 relative bg-gradient-to-r from-[#6B4F3A] to-[#3bc24f] px-6 py-4 z-10">
//                 <button
//                   onClick={() => {
//                     setShowAuthModal(false);
//                     setPendingSubscription(false);
//                   }}
//                   className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
                
//                 <div className="text-center">
//                   <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
//                     {authMode === 'login' ? (
//                       <User className="w-6 h-6 text-white" />
//                     ) : (
//                       <User className="w-6 h-6 text-white" />
//                     )}
//                   </div>
//                   <h3 className="text-lg font-bold text-white">
//                     {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
//                   </h3>
//                   <p className="text-white/80 text-xs">
//                     {authMode === 'login' 
//                       ? 'Login to subscribe to our newsletter' 
//                       : 'Join Jute Craftify as a wholesale buyer'}
//                   </p>
//                 </div>
//               </div>
              
//               {/* Modal Content */}
//               <div className="p-6">
//                 {authMode === 'login' ? (
//                   // LOGIN FORM
//                   <form onSubmit={handleLogin}>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Email Address
//                         </label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           <input
//                             type="email"
//                             value={loginEmail}
//                             onChange={(e) => setLoginEmail(e.target.value)}
//                             required
//                             className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent"
//                             placeholder="your@company.com"
//                           />
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Password
//                         </label>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           <input
//                             type={showLoginPassword ? "text" : "password"}
//                             value={loginPassword}
//                             onChange={(e) => setLoginPassword(e.target.value)}
//                             required
//                             className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent"
//                             placeholder="Enter your password"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowLoginPassword(!showLoginPassword)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2"
//                           >
//                             {showLoginPassword ? (
//                               <EyeOff className="w-4 h-4 text-gray-400" />
//                             ) : (
//                               <Eye className="w-4 h-4 text-gray-400" />
//                             )}
//                           </button>
//                         </div>
//                       </div>
                      
//                       <button
//                         type="submit"
//                         disabled={loginLoading}
//                         className="w-full bg-[#3bc24f] text-white py-2 rounded-lg font-semibold hover:bg-[#2da63f] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
//                       >
//                         {loginLoading ? (
//                           <>
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                             Logging in...
//                           </>
//                         ) : (
//                           <>
//                             Login
//                             <ArrowRight className="w-4 h-4" />
//                           </>
//                         )}
//                       </button>
                      
//                       <div className="relative my-3">
//                         <div className="absolute inset-0 flex items-center">
//                           <div className="w-full border-t border-gray-200" />
//                         </div>
//                         <div className="relative flex justify-center text-xs">
//                           <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                         </div>
//                       </div>
                      
//                       <GoogleLoginButtonPopUp 
//                         mode="login"
//                         onSuccess={handleGoogleSuccess}
//                         onError={handleGoogleError}
//                       />
                      
//                       <div className="text-center mt-3">
//                         <p className="text-xs text-gray-600">
//                           Don't have an account?{' '}
//                           <button
//                             type="button"
//                             onClick={() => setAuthMode('register')}
//                             className="text-[#3bc24f] font-semibold hover:underline"
//                           >
//                             Sign up
//                           </button>
//                         </p>
//                       </div>
//                     </div>
//                   </form>
//                 ) : (
//                   // REGISTER FORM
//                   <form onSubmit={handleRegister}>
//                     <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
//                       <div className="grid grid-cols-2 gap-3">
//                         <div className="col-span-2 md:col-span-1">
//                           <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
//                             Company Name <span className="text-red-500">*</span>
//                           </label>
//                           <div className="relative">
//                             <Building className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                             <input
//                               type="text"
//                               name="companyName"
//                               value={registerForm.companyName}
//                               onChange={handleRegisterChange}
//                               required
//                               className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
//                               placeholder="Company name"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-span-2 md:col-span-1">
//                           <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
//                             Contact Person <span className="text-red-500">*</span>
//                           </label>
//                           <div className="relative">
//                             <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                             <input
//                               type="text"
//                               name="contactPerson"
//                               value={registerForm.contactPerson}
//                               onChange={handleRegisterChange}
//                               required
//                               className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
//                               placeholder="Full name"
//                             />
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
//                           Email Address <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                           <input
//                             type="email"
//                             name="email"
//                             value={registerForm.email}
//                             onChange={handleRegisterChange}
//                             required
//                             className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
//                             placeholder="your@company.com"
//                           />
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
//                             Phone <span className="text-red-500">*</span>
//                           </label>
//                           <div className="relative">
//                             <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                             <input
//                               type="tel"
//                               name="phone"
//                               value={registerForm.phone}
//                               onChange={handleRegisterChange}
//                               required
//                               className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
//                               placeholder="+1 234 567 8900"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
//                             WhatsApp <span className="text-red-500">*</span>
//                           </label>
//                           <div className="relative">
//                             <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                             <input
//                               type="tel"
//                               name="whatsapp"
//                               value={registerForm.whatsapp}
//                               onChange={handleRegisterChange}
//                               required
//                               className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
//                               placeholder="+1 234 567 8900"
//                             />
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
//                             Country <span className="text-red-500">*</span>
//                           </label>
//                           <div className="relative">
//                             <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                             <input
//                               type="text"
//                               name="country"
//                               value={registerForm.country}
//                               onChange={handleRegisterChange}
//                               required
//                               className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
//                               placeholder="Country"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
//                             City <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="city"
//                             value={registerForm.city}
//                             onChange={handleRegisterChange}
//                             required
//                             className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
//                             placeholder="City"
//                           />
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
//                             Address <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="address"
//                             value={registerForm.address}
//                             onChange={handleRegisterChange}
//                             required
//                             className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
//                             placeholder="Street address"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
//                             ZIP Code <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="zipCode"
//                             value={registerForm.zipCode}
//                             onChange={handleRegisterChange}
//                             required
//                             className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
//                             placeholder="ZIP code"
//                           />
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
//                             Password <span className="text-red-500">*</span>
//                           </label>
//                           <div className="relative">
//                             <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                             <input
//                               type={showRegisterPassword ? "text" : "password"}
//                               name="password"
//                               value={registerForm.password}
//                               onChange={handleRegisterChange}
//                               required
//                               className="w-full pl-8 pr-8 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
//                               placeholder="Min. 8 characters"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowRegisterPassword(!showRegisterPassword)}
//                               className="absolute right-2 top-1/2 -translate-y-1/2"
//                             >
//                               {showRegisterPassword ? (
//                                 <EyeOff className="w-3 h-3 text-gray-400" />
//                               ) : (
//                                 <Eye className="w-3 h-3 text-gray-400" />
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                         <div>
//                           <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
//                             Confirm Password <span className="text-red-500">*</span>
//                           </label>
//                           <div className="relative">
//                             <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                             <input
//                               type={showRegisterConfirmPassword ? "text" : "password"}
//                               name="confirmPassword"
//                               value={registerForm.confirmPassword}
//                               onChange={handleRegisterChange}
//                               required
//                               className="w-full pl-8 pr-8 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
//                               placeholder="Re-enter password"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)}
//                               className="absolute right-2 top-1/2 -translate-y-1/2"
//                             >
//                               {showRegisterConfirmPassword ? (
//                                 <EyeOff className="w-3 h-3 text-gray-400" />
//                               ) : (
//                                 <Eye className="w-3 h-3 text-gray-400" />
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-start gap-2">
//                         <input
//                           type="checkbox"
//                           name="agreeToTerms"
//                           id="agreeToTerms"
//                           checked={registerForm.agreeToTerms}
//                           onChange={handleRegisterChange}
//                           required
//                           className="mt-0.5 rounded border-gray-300 text-[#3bc24f] focus:ring-[#3bc24f]"
//                         />
//                         <label htmlFor="agreeToTerms" className="text-[10px] text-gray-600">
//                           I agree to the <span className="text-[#3bc24f] hover:underline">Terms</span> & <span className="text-[#3bc24f] hover:underline">Privacy Policy</span>
//                         </label>
//                       </div>
                      
//                       <button
//                         type="submit"
//                         disabled={isRegistering}
//                         className="w-full bg-[#3bc24f] text-white py-2 rounded-lg font-semibold hover:bg-[#2da63f] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
//                       >
//                         {isRegistering ? (
//                           <>
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                             Creating Account...
//                           </>
//                         ) : (
//                           <>
//                             Create Account
//                             <ArrowRight className="w-4 h-4" />
//                           </>
//                         )}
//                       </button>
                      
//                       <div className="relative my-2">
//                         <div className="absolute inset-0 flex items-center">
//                           <div className="w-full border-t border-gray-200" />
//                         </div>
//                         <div className="relative flex justify-center text-xs">
//                           <span className="px-2 bg-white text-gray-500">Or sign up with</span>
//                         </div>
//                       </div>
                      
//                       <GoogleLoginButtonPopUp 
//                         mode="signup"
//                         onSuccess={handleGoogleSuccess}
//                         onError={handleGoogleError}
//                       />
                      
//                       <div className="text-center mt-2">
//                         <p className="text-xs text-gray-600">
//                           Already have an account?{' '}
//                           <button
//                             type="button"
//                             onClick={() => setAuthMode('login')}
//                             className="text-[#3bc24f] font-semibold hover:underline"
//                           >
//                             Login
//                           </button>
//                         </p>
//                       </div>
//                     </div>
//                   </form>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* OTP Verification Modal */}
//       <AnimatePresence>
//         {showOTPModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             style={{ 
//               background: 'rgba(0, 0, 0, 0.6)',
//               backdropFilter: 'blur(8px)',
//             }}
//             onClick={(e) => {
//               if (e.target === e.currentTarget) {
//                 setShowOTPModal(false);
//                 setShowAuthModal(true);
//               }
//             }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
//             >
//               <div className="relative bg-gradient-to-r from-[#6B4F3A] to-[#3bc24f] px-6 py-4">
//                 <button
//                   onClick={() => {
//                     setShowOTPModal(false);
//                     setShowAuthModal(true);
//                   }}
//                   className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
                
//                 <div className="text-center">
//                   <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
//                     <Mail className="w-6 h-6 text-white" />
//                   </div>
//                   <h3 className="text-lg font-bold text-white">Verify Your Email</h3>
//                   <p className="text-white/80 text-xs">
//                     We've sent a verification code to
//                   </p>
//                   <p className="text-white font-semibold text-sm mt-1">{otpEmail}</p>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Enter OTP Code
//                   </label>
//                   <input
//                     type="text"
//                     maxLength="6"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
//                     placeholder="000000"
//                     className="w-full px-4 py-3 text-center text-2xl tracking-wider border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-[#3bc24f] focus:outline-none transition-all font-mono"
//                     autoFocus
//                     disabled={isVerifying}
//                   />
//                   <p className="text-xs text-gray-500 mt-3 text-center">
//                     Enter the 6-digit code sent to your email
//                   </p>
//                 </div>

//                 <button
//                   onClick={handleVerifyOTP}
//                   disabled={isVerifying || otp.length !== 6}
//                   className="w-full bg-[#3bc24f] text-white py-3 rounded-lg font-semibold hover:bg-[#2da63f] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {isVerifying ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Verifying...
//                     </>
//                   ) : (
//                     <>
//                       Verify & Continue
//                       <ArrowRight className="w-4 h-4" />
//                     </>
//                   )}
//                 </button>

//                 <div className="mt-4 text-center">
//                   <button
//                     onClick={handleResendOTP}
//                     disabled={resendDisabled}
//                     className="text-sm text-[#3bc24f] hover:text-[#2da63f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//                   >
//                     {resendDisabled ? `Resend OTP in ${formatTime(countdown)}` : 'Resend OTP'}
//                   </button>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <button
//                     onClick={() => {
//                       setShowOTPModal(false);
//                       setShowAuthModal(true);
//                     }}
//                     className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
//                   >
//                     Back to Login
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Bell, X, Leaf, CheckCircle, User, Lock, ArrowRight, Loader2, Eye, EyeOff, Building, Phone, MapPin } from 'lucide-react';
import GoogleLoginButtonPopUp from './GoogleLoginButtonPopUp';

export default function NewsletterPopup({ 
  isExternallyControlled = false, 
  onClose: externalOnClose = null,
  forceOpen = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCount, setShowCount] = useState(0);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [pendingSubscription, setPendingSubscription] = useState(false);
  
  // OTP Verification States
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // Login States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Register States
  const [registerForm, setRegisterForm] = useState({
    companyName: '',
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
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Track if popup has been shown in this session
  const [hasShownInSession, setHasShownInSession] = useState(false);
  
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const router = useRouter();

  // Format time for countdown
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start countdown for OTP resend
  const startCountdown = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setResendDisabled(true);
    setCountdown(60);
    
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

  // Check if user is logged in
  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsLoggedIn(true);
          checkSubscriptionStatus(parsedUser);
        } catch (error) {
          console.error('Error parsing user:', error);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    
    checkUser();
    
    const handleAuthChange = () => {
      console.log('🔄 Auth change detected in popup, refreshing...');
      checkUser();
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  // Check subscription status
  const checkSubscriptionStatus = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('http://localhost:5000/api/auth/subscription-status', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setIsSubscribed(data.isSubscribed);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  // Handle forceOpen from parent - FIXED
  useEffect(() => {
    console.log('📧 ForceOpen effect - forceOpen:', forceOpen, 'isOpen:', isOpen);
    if (forceOpen) {
      console.log('📧 Force opening newsletter popup from parent');
      setIsOpen(true);
    }
  }, [forceOpen]);

  // Handle popup timing - respect external control
  useEffect(() => {
    // Don't auto-show when externally controlled
    if (isExternallyControlled) return;
    
    if (isSubscribed) return;
    
    // Generate a unique session ID for this page load
    const sessionId = Date.now().toString();
    const currentSession = localStorage.getItem('newsletterPopupSession');
    
    // If this is a new session (page reload), reset the counter
    if (!currentSession || currentSession !== sessionId) {
      localStorage.setItem('newsletterPopupSession', sessionId);
      localStorage.removeItem('newsletterPopupCount');
      setShowCount(0);
      setHasShownInSession(false);
    }
    
    // Get current show count (should be 0 on fresh reload)
    const storedCount = localStorage.getItem('newsletterPopupCount');
    const initialCount = storedCount ? parseInt(storedCount) : 0;
    setShowCount(initialCount);
    
    // If already shown 3 times in this session, don't show again
    if (initialCount >= 3) return;
    
    // Show popup after 5 seconds
    const firstTimer = setTimeout(() => {
      if (!hasShownInSession && initialCount < 3) {
        setIsOpen(true);
        setHasShownInSession(true);
      }
    }, 5000);
    
    return () => {
      clearTimeout(firstTimer);
    };
  }, [isSubscribed, isExternallyControlled]);

  // Handle popup close with external control support
  const handleClose = () => {
    if (isExternallyControlled && externalOnClose) {
      setIsOpen(false);
      externalOnClose();
    } else {
      // Original close logic
      setIsOpen(false);
      const newCount = showCount + 1;
      setShowCount(newCount);
      localStorage.setItem('newsletterPopupCount', newCount.toString());
      setHasShownInSession(false);
      
      // If not shown 3 times yet, schedule next popup
      if (newCount < 3) {
        const nextTimer = setTimeout(() => {
          setIsOpen(true);
          setHasShownInSession(true);
        }, 15000);
        
        // Store timeout reference for cleanup
        if (intervalRef.current) clearTimeout(intervalRef.current);
        intervalRef.current = nextTimer;
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  // Handle subscribe button click
  const handleSubscribeClick = () => {
    if (!isLoggedIn) {
      setPendingSubscription(true);
      setIsOpen(false);
      setShowAuthModal(true);
      setAuthMode('login');
    } else if (isSubscribed) {
      toast.info('Already Subscribed', {
        description: 'You are already subscribed to our newsletter.'
      });
      handleClose();
    } else {
      performSubscription();
    }
  };

  // Perform actual subscription
  const performSubscription = async () => {
    setIsSubscribing(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/subscribe', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Subscribed Successfully!', {
          description: 'You will now receive our B2B newsletter.',
          duration: 5000,
        });
        setIsSubscribed(true);
        setIsOpen(false);
        setPendingSubscription(false);
        window.dispatchEvent(new Event('auth-change'));
      } else {
        toast.error('Subscription Failed', {
          description: data.error || 'Something went wrong.'
        });
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      toast.error('Connection Error', {
        description: 'Unable to connect to server.'
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  // Handle OTP Verification
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    const verifyingToast = toast.loading('Verifying OTP...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail, otp: otp }),
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
        description: 'Welcome to Jute Craftify!',
      });

      setUser(data.user);
      setIsLoggedIn(true);
      setShowOTPModal(false);
      setShowAuthModal(false);
      setOtp('');
      
      window.dispatchEvent(new Event('auth-change'));
      
      await checkSubscriptionStatus(data.user);
      
      if (pendingSubscription && !data.user.isSubscribedToNewsletter) {
        setTimeout(() => {
          setIsOpen(true);
        }, 500);
      } else if (pendingSubscription && data.user.isSubscribedToNewsletter) {
        toast.info('Already Subscribed', {
          description: 'This account is already subscribed to our newsletter.'
        });
        setPendingSubscription(false);
      }

    } catch (error) {
      console.error('OTP verification error:', error);
      toast.dismiss(verifyingToast);
      toast.error('Verification failed', {
        description: 'Please try again',
      });
      setIsVerifying(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (resendDisabled) return;

    const resendToast = toast.loading('Resending OTP...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail }),
      });

      const data = await response.json();
      toast.dismiss(resendToast);

      if (!response.ok) {
        toast.error(data.error || 'Failed to resend OTP');
        return;
      }

      toast.success('OTP resent successfully!', {
        description: 'Please check your email.',
      });

      startCountdown();

    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.dismiss(resendToast);
      toast.error('Failed to resend OTP');
    }
  };

  // Handle login from modal
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoginLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        window.dispatchEvent(new Event('auth-change'));
        
        toast.success('Login successful!');
        
        setUser(data.user);
        setIsLoggedIn(true);
        
        await checkSubscriptionStatus(data.user);
        
        setShowAuthModal(false);
        setLoginEmail('');
        setLoginPassword('');
        
        if (pendingSubscription && !data.user.isSubscribedToNewsletter) {
          setTimeout(() => {
            setIsOpen(true);
          }, 500);
        } else if (pendingSubscription && data.user.isSubscribedToNewsletter) {
          toast.info('Already Subscribed', {
            description: 'This account is already subscribed to our newsletter.'
          });
          setPendingSubscription(false);
        }
      } else {
        if (data.requiresVerification) {
          setOtpEmail(loginEmail);
          setShowAuthModal(false);
          setShowOTPModal(true);
          startCountdown();
          toast.info('Please verify your email', {
            description: 'We\'ve sent a verification code to your email.'
          });
        } else {
          toast.error(data.error || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Connection Error');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (registerForm.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    if (!registerForm.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    const requiredFields = ['companyName', 'contactPerson', 'email', 'phone', 'country', 'address', 'city', 'zipCode'];
    const missingFields = requiredFields.filter(field => !registerForm[field]);
    
    if (missingFields.length > 0) {
      toast.error('Missing Fields', {
        description: `Please fill in: ${missingFields.join(', ')}`
      });
      return;
    }
    
    setIsRegistering(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: registerForm.companyName,
          contactPerson: registerForm.contactPerson,
          email: registerForm.email,
          phone: registerForm.phone,
          whatsapp: registerForm.whatsapp,
          country: registerForm.country,
          address: registerForm.address,
          city: registerForm.city,
          zipCode: registerForm.zipCode,
          password: registerForm.password,
          role: 'customer'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('OTP Sent!', {
          description: 'Please check your email for verification code.',
        });
        
        setOtpEmail(registerForm.email);
        setShowAuthModal(false);
        setShowOTPModal(true);
        startCountdown();
        
        setRegisterForm({
          companyName: '', contactPerson: '', email: '', phone: '', whatsapp: '',
          country: '', address: '', city: '', zipCode: '', password: '', confirmPassword: '', agreeToTerms: false
        });
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Register error:', error);
      toast.error('Connection Error');
    } finally {
      setIsRegistering(false);
    }
  };

  // Handle Google success
  const handleGoogleSuccess = async (data) => {
    const { token, user: userData } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    window.dispatchEvent(new Event('auth-change'));
    
    setUser(userData);
    setIsLoggedIn(true);
    setShowAuthModal(false);
    
    await checkSubscriptionStatus(userData);
    
    toast.success('Welcome!');
    
    if (pendingSubscription && !userData.isSubscribedToNewsletter) {
      setTimeout(() => {
        setIsOpen(true);
      }, 500);
    } else if (pendingSubscription && userData.isSubscribedToNewsletter) {
      toast.info('Already Subscribed', {
        description: 'This account is already subscribed to our newsletter.'
      });
      setPendingSubscription(false);
    }
  };

  const handleGoogleError = (error) => {
    toast.error(error);
  };

  // Register form change handler
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // REMOVED the problematic early returns - the component should always render
  // The popup visibility is controlled by isOpen state and AnimatePresence

  return (
    <>
      {/* Main Newsletter Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ 
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#6B4F3A] to-[#3bc24f] px-6 py-4">
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Stay Updated!</h3>
                    <p className="text-white/80 text-xs">Get B2B news & exclusive offers</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-[#F5E6D3] flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-10 h-10 text-[#3bc24f]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#6B4F3A] font-serif">
                    Subscribe to Newsletter
                  </h4>
                  <p className="text-gray-500 text-xs mt-1">
                    Get the latest updates on new products, bulk offers, and industry news
                  </p>
                </div>
                
                {/* Benefits */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                    <span>Exclusive B2B wholesale offers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                    <span>New product launch alerts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                    <span>Sustainability & export updates</span>
                  </div>
                </div>
                
                {/* Subscribe Button */}
                <button
                  onClick={handleSubscribeClick}
                  disabled={isSubscribing}
                  className="w-full bg-[#3bc24f] text-white py-3 rounded-lg font-semibold hover:bg-[#2da63f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4" />
                      {isLoggedIn ? 'Subscribe Now' : 'Login to Subscribe'}
                    </>
                  )}
                </button>
                
                {!isLoggedIn && (
                  <p className="text-center text-xs text-gray-400 mt-3">
                    Login or create an account to subscribe
                  </p>
                )}
                
                {isLoggedIn && isSubscribed && (
                  <p className="text-center text-xs text-green-600 mt-3">
                    ✓ You are already subscribed
                  </p>
                )}
                
                {/* Trust Badge */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center gap-3">
                  <Leaf className="w-4 h-4 text-[#3bc24f]" />
                  <span className="text-[10px] text-gray-400">No spam. Unsubscribe anytime.</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Login/Register Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ 
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowAuthModal(false);
                setPendingSubscription(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 relative bg-gradient-to-r from-[#6B4F3A] to-[#3bc24f] px-6 py-4 z-10">
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    setPendingSubscription(false);
                  }}
                  className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                    {authMode === 'login' ? (
                      <User className="w-6 h-6 text-white" />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {authMode === 'login' 
                      ? 'Login to subscribe to our newsletter' 
                      : 'Join Jute Craftify as a wholesale buyer'}
                  </p>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6">
                {authMode === 'login' ? (
                  // LOGIN FORM
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent"
                            placeholder="your@company.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showLoginPassword ? "text" : "password"}
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showLoginPassword ? (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Eye className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full bg-[#3bc24f] text-white py-2 rounded-lg font-semibold hover:bg-[#2da63f] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loginLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          <>
                            Login
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                      
                      <div className="relative my-3">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>
                      
                      <GoogleLoginButtonPopUp 
                        mode="login"
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                      />
                      
                      <div className="text-center mt-3">
                        <p className="text-xs text-gray-600">
                          Don't have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setAuthMode('register')}
                            className="text-[#3bc24f] font-semibold hover:underline"
                          >
                            Sign up
                          </button>
                        </p>
                      </div>
                    </div>
                  </form>
                ) : (
                  // REGISTER FORM - Keep existing code
                  <form onSubmit={handleRegister}>
                    <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                      {/* Keep all your existing register form fields */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Building className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                            <input
                              type="text"
                              name="companyName"
                              value={registerForm.companyName}
                              onChange={handleRegisterChange}
                              required
                              className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
                              placeholder="Company name"
                            />
                          </div>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                            Contact Person <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                            <input
                              type="text"
                              name="contactPerson"
                              value={registerForm.contactPerson}
                              onChange={handleRegisterChange}
                              required
                              className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
                              placeholder="Full name"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={registerForm.email}
                            onChange={handleRegisterChange}
                            required
                            className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f]"
                            placeholder="your@company.com"
                          />
                        </div>
                      </div>
                      
                      {/* Continue with remaining register fields... */}
                      {/* Phone, WhatsApp, Country, City, Address, ZipCode, Password, Confirm Password, Terms */}
                      
                      <div className="flex items-start gap-2 mt-2">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          id="agreeToTerms"
                          checked={registerForm.agreeToTerms}
                          onChange={handleRegisterChange}
                          required
                          className="mt-0.5 rounded border-gray-300 text-[#3bc24f] focus:ring-[#3bc24f]"
                        />
                        <label htmlFor="agreeToTerms" className="text-[10px] text-gray-600">
                          I agree to the <span className="text-[#3bc24f] hover:underline">Terms</span> & <span className="text-[#3bc24f] hover:underline">Privacy Policy</span>
                        </label>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isRegistering}
                        className="w-full bg-[#3bc24f] text-white py-2 rounded-lg font-semibold hover:bg-[#2da63f] transition-all disabled:opacity-50"
                      >
                        {isRegistering ? 'Creating Account...' : 'Create Account'}
                      </button>
                      
                      <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                        </div>
                      </div>
                      
                      <GoogleLoginButtonPopUp 
                        mode="signup"
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                      />
                      
                      <div className="text-center mt-2">
                        <p className="text-xs text-gray-600">
                          Already have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setAuthMode('login')}
                            className="text-[#3bc24f] font-semibold hover:underline"
                          >
                            Login
                          </button>
                        </p>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OTP Verification Modal */}
      <AnimatePresence>
        {showOTPModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ 
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowOTPModal(false);
                setShowAuthModal(true);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="relative bg-gradient-to-r from-[#6B4F3A] to-[#3bc24f] px-6 py-4">
                <button
                  onClick={() => {
                    setShowOTPModal(false);
                    setShowAuthModal(true);
                  }}
                  className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Verify Your Email</h3>
                  <p className="text-white/80 text-xs">
                    We've sent a verification code to
                  </p>
                  <p className="text-white font-semibold text-sm mt-1">{otpEmail}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP Code
                  </label>
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full px-4 py-3 text-center text-2xl tracking-wider border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-[#3bc24f] focus:outline-none transition-all font-mono"
                    autoFocus
                    disabled={isVerifying}
                  />
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={isVerifying || otp.length !== 6}
                  className="w-full bg-[#3bc24f] text-white py-3 rounded-lg font-semibold hover:bg-[#2da63f] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                </button>

                <div className="mt-4 text-center">
                  <button
                    onClick={handleResendOTP}
                    disabled={resendDisabled}
                    className="text-sm text-[#3bc24f] hover:text-[#2da63f] transition-colors disabled:opacity-50"
                  >
                    {resendDisabled ? `Resend OTP in ${formatTime(countdown)}` : 'Resend OTP'}
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowOTPModal(false);
                      setShowAuthModal(true);
                    }}
                    className="w-full text-sm text-gray-500 hover:text-gray-700"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}