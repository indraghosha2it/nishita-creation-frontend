// components/auth/ForgotPasswordModal.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ForgotPassword from './ForgotPassword';
import ResetOTPVerification from './ResetOTPVerification';
import ResetPassword from './ResetPassword';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [step, setStep] = useState('email'); // 'email', 'otp', 'reset'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(''); // Store OTP

  if (!isOpen) return null;

  const handleOTPSent = (userEmail) => {
    setEmail(userEmail);
    setStep('otp');
  };

  const handleOTPVerified = (verifiedOtp) => {
    // Store the OTP when verified
    setOtp(verifiedOtp);
    sessionStorage.setItem('resetOTP', verifiedOtp);
    setStep('reset');
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('email');
    } else if (step === 'reset') {
      setStep('otp');
    }
  };

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setOtp('');
    sessionStorage.removeItem('resetOTP');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="p-8">
                {step === 'email' && (
                  <ForgotPassword onOTPSent={handleOTPSent} onBack={handleClose} />
                )}

                {step === 'otp' && (
                  <ResetOTPVerification 
                    email={email}
                    onBack={handleBack}
                    onSuccess={handleOTPVerified}
                  />
                )}

                {step === 'reset' && (
                  <ResetPassword 
                    email={email} 
                    otp={otp}
                    onBack={handleBack} 
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}