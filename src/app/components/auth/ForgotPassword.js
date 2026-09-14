

// // components/auth/ForgotPassword.jsx
// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';
// import { toast } from 'sonner';

// // Font family constants - matching beauty theme
// const FONT_FAMILY = "'Courgette', cursive";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// export default function ForgotPassword({ onOTPSent, onBack }) {
//   const [email, setEmail] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const loadingToast = toast.loading('Sending reset code...');

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
//           description: data.error || 'Could not send reset code'
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       toast.success('Reset Code Sent!', {
//         description: 'Please check your email for the OTP.',
//         icon: '📧',
//       });

//       onOTPSent(email);

//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server'
//       });
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       className="space-y-6"
//     >
//       <div className="text-center">
//         <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-full mb-3 border border-[#EE4275]/20">
//           <Sparkles className="w-6 h-6 text-[#EE4275]" />
//         </div>
//         <h2 className="text-2xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//           Forgot Password?
//         </h2>
//         <p className="text-[#EE4275]/60 text-sm" style={{ fontFamily: FONT_FAMILY }}>
//           Enter your email address and we'll send you a OTP to reset your password.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-[#2D1B2E] mb-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//             Email Address
//           </label>
//           <div className="relative group">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#EE4275]/40 group-focus-within:text-[#EE4275] transition-colors" />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-[#FFF5F6] focus:bg-white transition-all hover:border-[#EE4275]/30"
//               placeholder="your@email.com"
//               style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full py-3 px-4 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
//           style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="w-5 h-5 animate-spin" />
//               Sending...
//             </>
//           ) : (
//             <>
//               Send Reset Code
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </>
//           )}
//         </button>

//         <button
//           type="button"
//           onClick={onBack}
//           className="w-full text-sm text-[#EE4275]/60 hover:text-[#EE4275] transition-colors"
//           style={{ fontFamily: FONT_FAMILY }}
//         >
//           ← Back to Login
//         </button>
//       </form>
//     </motion.div>
//   );
// }


// components/auth/ForgotPassword.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// Font family constants - matching beauty theme
const FONT_FAMILY = "'Courgette', cursive";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

export default function ForgotPassword({ onOTPSent, onBack }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Sending reset code...');

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
          description: data.error || 'Could not send reset code'
        });
        setIsSubmitting(false);
        return;
      }

      toast.success('Reset Code Sent!', {
        description: 'Please check your email for the OTP.',
        icon: '📧',
      });

      onOTPSent(email);

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#65705d]/10 to-[#8B9D83]/10 rounded-full mb-3 border border-[#65705d]/20">
          <Sparkles className="w-6 h-6 text-[#65705d]" />
        </div>
        <h2 className="text-2xl font-bold text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
          Forgot Password?
        </h2>
        <p className="text-[#65705d]/70 text-sm" style={{ fontFamily: FONT_FAMILY }}>
          Enter your email address and we'll send you a OTP to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#263b32] mb-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#65705d]/40 group-focus-within:text-[#65705d] transition-colors" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-[#e2e3dd]/70 rounded-lg focus:ring-2 focus:ring-[#65705d] focus:border-transparent bg-[#FDF7EF] focus:bg-white transition-all hover:border-[#65705d]/30 text-[#263b32] placeholder:text-[#8a9284]"
              placeholder="your@email.com"
              style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-gradient-to-r from-[#65705d] to-[#8B9D83] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#65705d]/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Reset Code
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-sm text-[#65705d]/70 hover:text-[#65705d] transition-colors"
          style={{ fontFamily: FONT_FAMILY }}
        >
          ← Back to Login
        </button>
      </form>
    </motion.div>
  );
}