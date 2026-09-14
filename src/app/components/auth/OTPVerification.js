// // components/auth/OTPVerification.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { toast } from 'sonner';

// export default function OTPVerification({ email, onBack, onSuccess }) {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [timer, setTimer] = useState(600); // 10 minutes in seconds
//   const [canResend, setCanResend] = useState(false);

//   // Timer effect
//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     } else {
//       setCanResend(true);
//     }
//   }, [timer]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const handleChange = (index, value) => {
//     if (value.length > 1) return; // Only allow single digit
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next input
//     if (value !== '' && index < 5) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     // Handle backspace
//     if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
//     const newOtp = [...otp];
    
//     pastedData.forEach((value, index) => {
//       if (index < 6 && /^\d+$/.test(value)) {
//         newOtp[index] = value;
//       }
//     });
    
//     setOtp(newOtp);
    
//     // Focus last filled input or next empty
//     const lastFilledIndex = newOtp.findLastIndex(val => val !== '');
//     if (lastFilledIndex < 5) {
//       document.getElementById(`otp-${lastFilledIndex + 1}`)?.focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const otpString = otp.join('');
//     if (otpString.length !== 6) {
//       toast.error('Invalid OTP', {
//         description: 'Please enter all 6 digits'
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     const loadingToast = toast.loading('Verifying OTP...');

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           otp: otpString
//         })
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         toast.error('Verification Failed', {
//           description: data.error || 'Invalid OTP'
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       toast.success('Success!', {
//         description: 'Email verified successfully'
//       });

//       // Store token and user data
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));

//       // Call onSuccess callback
//       onSuccess(data.user);

//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//       setIsSubmitting(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     if (!canResend) return;

//     const loadingToast = toast.loading('Sending new OTP...');

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email })
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         toast.error('Failed', {
//           description: data.error || 'Could not resend OTP'
//         });
//         return;
//       }

//       toast.success('OTP Resent!', {
//         description: 'Please check your email'
//       });

//       // Reset timer
//       setTimer(600);
//       setCanResend(false);

//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-xl shadow-lg p-8"
//     >
//       <div className="text-center mb-6">
//         <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg className="w-10 h-10" style={{ color: '#6B4F3A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//           </svg>
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
//         <p className="text-gray-600">
//           We've sent a 6-digit code to<br />
//           <span className="font-semibold" style={{ color: '#6B4F3A' }}>{email}</span>
//         </p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="flex justify-center gap-2 mb-6">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               onPaste={index === 0 ? handlePaste : undefined}
//               className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-[#6B4F3A]"
//               required
//             />
//           ))}
//         </div>

//         <div className="text-center mb-6">
//           <p className="text-sm text-gray-500">
//             Time remaining: <span className="font-semibold" style={{ color: '#6B4F3A' }}>{formatTime(timer)}</span>
//           </p>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-all font-medium mb-3"
//           style={{ background: 'linear-gradient(135deg, #6B4F3A 0%, #e6a87c 100%)' }}
//         >
//           {isSubmitting ? 'Verifying...' : 'Verify Email'}
//         </button>

//         <div className="flex items-center justify-between">
//           <button
//             type="button"
//             onClick={onBack}
//             className="text-sm text-gray-600 hover:underline"
//           >
//             ← Back to registration
//           </button>
          
//           <button
//             type="button"
//             onClick={handleResendOTP}
//             disabled={!canResend}
//             className={`text-sm font-medium ${
//               canResend 
//                 ? 'hover:underline' 
//                 : 'text-gray-400 cursor-not-allowed'
//             }`}
//             style={canResend ? { color: '#6B4F3A' } : {}}
//           >
//             Resend OTP
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   );
// }


// components/auth/OTPVerification.jsx
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function OTPVerification({ email, onBack, onSuccess }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const otpString = otp.join('');
//     if (otpString.length !== 6) {
//       toast.error('Invalid OTP', {
//         description: 'Please enter all 6 digits'
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     const loadingToast = toast.loading('Verifying OTP...');

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           otp: otpString
//         })
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         toast.error('Verification Failed', {
//           description: data.error || 'Invalid OTP'
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       toast.success('Success!', {
//         description: 'Email verified successfully'
//       });

//       onSuccess(data.user);

//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//       setIsSubmitting(false);
//     }
//   };

// components/auth/OTPVerification.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const otpString = otp.join('');
  if (otpString.length !== 6) {
    toast.error('Invalid OTP', {
      description: 'Please enter all 6 digits'
    });
    return;
  }

  setIsSubmitting(true);
  const loadingToast = toast.loading('Verifying OTP...');

  try {
    console.log('📤 Sending OTP verification request for:', email);
    
    const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp: otpString
      })
    });

    console.log('📥 Response status:', response.status);
    
    const data = await response.json();
    console.log('📥 Response data:', data);
    
    toast.dismiss(loadingToast);

    if (!response.ok) {
      console.error('❌ Verification failed:', data);
      toast.error('Verification Failed', {
        description: data.error || 'Invalid OTP'
      });
      setIsSubmitting(false);
      return;
    }

    console.log('✅ Verification successful, token:', data.token);
    console.log('✅ User data:', data.user);

    toast.success('Success!', {
      description: 'Email verified successfully'
    });

    // Pass the FULL user data with token to onSuccess
    onSuccess(data.user, data.token);

  } catch (error) {
    console.error('❌ Network/Connection error:', error);
    toast.dismiss(loadingToast);
    toast.error('Connection Error', {
      description: 'Unable to connect to server. Please check your internet connection.'
    });
    setIsSubmitting(false);
  }
};

  const handleResendOTP = async () => {
    if (!canResend) return;

    const loadingToast = toast.loading('Sending new OTP...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error('Failed', {
          description: data.error || 'Could not resend OTP'
        });
        return;
      }

      toast.success('OTP Resent!', {
        description: 'Please check your email'
      });

      setTimer(600);
      setCanResend(false);

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center gap-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-[#6B4F3A]"
            required
          />
        ))}
      </div>

      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">
          Time remaining: <span className="font-semibold" style={{ color: '#6B4F3A' }}>{formatTime(timer)}</span>
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-all font-medium mb-3"
        style={{ background: 'linear-gradient(135deg, #6B4F3A 0%, #6B4F3A 100%)' }}
      >
        {isSubmitting ? 'Verifying...' : 'Verify Email'}
      </button>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to registration
        </button>
        
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={!canResend}
          className={`text-sm font-medium ${
            canResend 
              ? 'hover:underline' 
              : 'text-gray-400 cursor-not-allowed'
          }`}
          style={canResend ? { color: '#6B4F3A' } : {}}
        >
          Resend OTP
        </button>
      </div>
    </form>
  );
}