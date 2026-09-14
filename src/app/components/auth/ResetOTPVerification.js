
// // components/auth/ResetOTPVerification.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { toast } from 'sonner';
// import { Loader2, Sparkles, Mail } from 'lucide-react';

// // Font family constants - matching beauty theme
// const FONT_FAMILY = "'Courgette', cursive";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// export default function ResetOTPVerification({ email, onBack, onSuccess }) {
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
//     if (value.length > 1) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value !== '' && index < 5) {
//       const nextInput = document.getElementById(`reset-otp-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
//       const prevInput = document.getElementById(`reset-otp-${index - 1}`);
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
    
//     const lastFilledIndex = newOtp.findLastIndex(val => val !== '');
//     if (lastFilledIndex < 5) {
//       document.getElementById(`reset-otp-${lastFilledIndex + 1}`)?.focus();
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
//       console.log('📤 Sending password reset OTP verification for:', email);
      
//       const response = await fetch('http://localhost:5000/api/auth/verify-reset-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           otp: otpString
//         })
//       });

//       console.log('📥 Response status:', response.status);
      
//       const data = await response.json();
//       console.log('📥 Response data:', data);
      
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         toast.error('Verification Failed', {
//           description: data.error || 'Invalid OTP'
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       console.log('✅ OTP verified successfully');

//       toast.success('OTP Verified!', {
//         description: 'Please set your new password'
//       });

//       onSuccess(otpString);

//     } catch (error) {
//       console.error('❌ Network/Connection error:', error);
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
//       const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
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
//       className="space-y-6"
//     >
//       <div className="text-center">
//         <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-full mb-3 border border-[#EE4275]/20">
//           <Mail className="w-6 h-6 text-[#EE4275]" />
//         </div>
//         <h2 className="text-2xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//           Enter Reset Code
//         </h2>
//         <p className="text-[#EE4275]/60 text-sm" style={{ fontFamily: FONT_FAMILY }}>
//           We've sent a 6-digit code to<br />
//           <span className="font-semibold text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{email}</span>
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex justify-center gap-2">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`reset-otp-${index}`}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               onPaste={index === 0 ? handlePaste : undefined}
//               className="w-12 h-12 text-center text-xl font-semibold border-2 border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-[#EE4275] bg-[#FFF5F6] focus:bg-white transition-all hover:border-[#EE4275]/30"
//               style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               required
//             />
//           ))}
//         </div>

//         <div className="text-center">
//           <p className="text-sm text-[#EE4275]/60" style={{ fontFamily: FONT_FAMILY }}>
//             Time remaining: <span className="font-semibold text-[#EE4275]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{formatTime(timer)}</span>
//           </p>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full py-3 text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//           style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//         >
//           {isSubmitting ? (
//             <span className="flex items-center justify-center gap-2">
//               <Loader2 className="w-5 h-5 animate-spin" />
//               Verifying...
//             </span>
//           ) : (
//             'Verify OTP'
//           )}
//         </button>

//         <div className="flex items-center justify-between">
//           <button
//             type="button"
//             onClick={onBack}
//             className="text-sm text-[#EE4275]/60 hover:text-[#EE4275] transition-colors"
//             style={{ fontFamily: FONT_FAMILY }}
//           >
//             ← Back
//           </button>
          
//           <button
//             type="button"
//             onClick={handleResendOTP}
//             disabled={!canResend}
//             className={`text-sm font-medium transition-colors ${
//               canResend 
//                 ? 'text-[#EE4275] hover:text-[#EE4275]/80 hover:underline' 
//                 : 'text-[#EE4275]/40 cursor-not-allowed'
//             }`}
//             style={{ fontFamily: FONT_FAMILY }}
//           >
//             Resend OTP
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   );
// }


// components/auth/ResetOTPVerification.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, Sparkles, Mail } from 'lucide-react';

// Font family constants - matching beauty theme
const FONT_FAMILY = "'Courgette', cursive";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

export default function ResetOTPVerification({ email, onBack, onSuccess }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  // Timer effect
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
      const nextInput = document.getElementById(`reset-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`reset-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    
    pastedData.forEach((value, index) => {
      if (index < 6 && /^\d+$/.test(value)) {
        newOtp[index] = value;
      }
    });
    
    setOtp(newOtp);
    
    const lastFilledIndex = newOtp.findLastIndex(val => val !== '');
    if (lastFilledIndex < 5) {
      document.getElementById(`reset-otp-${lastFilledIndex + 1}`)?.focus();
    }
  };

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
      console.log('📤 Sending password reset OTP verification for:', email);
      
      const response = await fetch('http://localhost:5000/api/auth/verify-reset-otp', {
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
        toast.error('Verification Failed', {
          description: data.error || 'Invalid OTP'
        });
        setIsSubmitting(false);
        return;
      }

      console.log('✅ OTP verified successfully');

      toast.success('OTP Verified!', {
        description: 'Please set your new password'
      });

      onSuccess(otpString);

    } catch (error) {
      console.error('❌ Network/Connection error:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server'
      });
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    const loadingToast = toast.loading('Sending new OTP...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#65705d]/10 to-[#8B9D83]/10 rounded-full mb-3 border border-[#65705d]/20">
          <Mail className="w-6 h-6 text-[#65705d]" />
        </div>
        <h2 className="text-2xl font-bold text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
          Enter Reset Code
        </h2>
        <p className="text-[#65705d]/70 text-sm" style={{ fontFamily: FONT_FAMILY }}>
          We've sent a 6-digit code to<br />
          <span className="font-semibold text-[#65705d]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`reset-otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center text-xl font-semibold border-2 border-[#e2e3dd]/70 rounded-lg focus:ring-2 focus:ring-[#65705d] focus:border-[#65705d] bg-[#FDF7EF] focus:bg-white transition-all hover:border-[#65705d]/30 text-[#263b32]"
              style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              required
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-[#65705d]/70" style={{ fontFamily: FONT_FAMILY }}>
            Time remaining: <span className="font-semibold text-[#65705d]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{formatTime(timer)}</span>
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-white bg-gradient-to-r from-[#65705d] to-[#8B9D83] rounded-lg hover:shadow-lg hover:shadow-[#65705d]/25 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </span>
          ) : (
            'Verify OTP'
          )}
        </button>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-[#65705d]/70 hover:text-[#65705d] transition-colors"
            style={{ fontFamily: FONT_FAMILY }}
          >
            ← Back
          </button>
          
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={!canResend}
            className={`text-sm font-medium transition-colors ${
              canResend 
                ? 'text-[#65705d] hover:text-[#8B9D83] hover:underline' 
                : 'text-[#65705d]/40 cursor-not-allowed'
            }`}
            style={{ fontFamily: FONT_FAMILY }}
          >
            Resend OTP
          </button>
        </div>
      </form>
    </motion.div>
  );
}