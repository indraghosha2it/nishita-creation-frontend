


// components/AuthModal.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Mail, Lock, User, Building, Phone, MapPin, 
  Eye, EyeOff, ShoppingBag, ArrowRight, CheckCircle,
  Truck, Shield, Clock, Star, Package, Loader2,
  Leaf, Sparkles, Award, Heart
} from 'lucide-react';
import { toast } from 'sonner';
import OTPVerification from './auth/OTPVerification';
import ForgotPassword from './auth/ForgotPassword';
import ResetOTPVerification from './auth/ResetOTPVerification';
import ModalResetPassword from './auth/ModalResetPassword';
import GoogleLoginButtonPopUp from './GoogleLoginButtonPopUp';

// Jute Craftify Theme Colors
const JUTE_COLORS = {
  primary: '#6B4F3A',
  secondary: '#F5E6D3',
  accent: '#3A7D44',
  gold: '#C6A43B',
  text: '#2C2420',
  textLight: '#8B7355',
  border: '#E5D5C0',
  lightBg: '#FAF7F2',
  white: '#FFFFFF'
};

const AuthModal = ({ isOpen, onClose, initialTab = 'login', onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [step, setStep] = useState('form');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetOTP, setResetOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [registerData, setRegisterData] = useState({
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

  const benefits = [
    { icon: <Truck className="w-3.5 h-3.5" />, text: 'Free shipping on orders $500+' },
    { icon: <Shield className="w-3.5 h-3.5" />, text: 'Secure payments' },
    { icon: <Clock className="w-3.5 h-3.5" />, text: '24/7 customer support' },
    { icon: <Package className="w-3.5 h-3.5" />, text: 'Bulk order discounts' },
  ];

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.requiresVerification) {
          setRegisteredEmail(loginData.email);
          setStep('otp');
          toast.info('Please verify your email first', {
            description: 'We\'ve sent a verification code to your email.'
          });
          setIsLoading(false);
          return;
        }
        
        toast.error(data.error || 'Login failed');
        setIsLoading(false);
        return;
      }

      if (loginData.rememberMe) {
        localStorage.setItem('rememberedEmail', loginData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      toast.success('Welcome back!', {
        description: `Successfully signed in as ${data.user.contactPerson || data.user.companyName}`,
      });
      
      onAuthSuccess(data.user, data.token);
      window.dispatchEvent(new Event('auth-change'));
      
      setTimeout(() => {
        setStep('form');
        onClose();
      }, 1000);
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Connection error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    if (!registerData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: registerData.companyName,
          contactPerson: registerData.contactPerson,
          email: registerData.email,
          phone: registerData.phone,
          whatsapp: registerData.whatsapp,
          country: registerData.country,
          address: registerData.address,
          city: registerData.city,
          zipCode: registerData.zipCode,
          password: registerData.password,
          role: 'customer'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      toast.success('OTP Sent!', {
        description: 'Please check your email for verification code.',
      });
      
      setRegisteredEmail(registerData.email);
      setStep('otp');
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Connection error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSuccess = (user, token) => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast.success('Login successful!');
      onAuthSuccess(user, token);
      window.dispatchEvent(new Event('auth-change'));
      
      setTimeout(() => {
        setStep('form');
        setActiveTab('login');
        onClose();
      }, 1000);
    }
  };

  const handleGoogleSuccess = (data) => {
    const { token, user } = data;
    
    toast.success('Google sign in successful!', {
      description: `Welcome ${user.contactPerson || user.companyName}!`,
    });
    
    onAuthSuccess(user, token);
    window.dispatchEvent(new Event('auth-change'));
    
    setTimeout(() => {
      setStep('form');
      setActiveTab('login');
      onClose();
    }, 1500);
  };

  const handleGoogleError = (error) => {
    toast.error(error);
  };

  const handleForgotPassword = () => {
    setStep('forgot');
  };

  const handleForgotBack = () => {
    setStep('form');
    setActiveTab('login');
  };

  const handleForgotOTPSent = (email) => {
    setForgotEmail(email);
    setStep('reset-otp');
  };

  const handleResetOTPVerified = (otp) => {
    setResetOTP(otp);
    setStep('new-password');
  };

  const handleResetBack = () => {
    if (step === 'reset-otp') {
      setStep('forgot');
    } else if (step === 'new-password') {
      setStep('reset-otp');
    }
  };

  const handleResetSuccess = () => {
    toast.success('Password Reset Successful!', {
      description: 'You can now login with your new password.',
    });
    
    setStep('form');
    setActiveTab('login');
    setForgotEmail('');
    setResetOTP('');
    
    if (forgotEmail) {
      setLoginData(prev => ({
        ...prev,
        email: forgotEmail
      }));
    }
  };

  const handleBackToForm = () => {
    setStep('form');
  };

  const handleClose = () => {
    setStep('form');
    setActiveTab('login');
    setRegisteredEmail('');
    setForgotEmail('');
    setResetOTP('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-20 bg-white/80 backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left Side - Jute Craftify Branding */}
                <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-[#6B4F3A] to-[#8B6B51] p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                  
                  <div className="relative z-10">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="relative w-48 h-16 overflow-hidden">
                        <img 
                          src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
                          alt="Jute Craftify Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-0.5 mb-3">
                        <Leaf className="w-3 h-3 text-[#C6A43B]" />
                        <span className="text-[10px] font-medium">Premium Jute Products</span>
                      </div>
                      
                      {step === 'form' && (
                        <>
                          <h3 className="text-xl font-bold mb-1 font-serif">
                            {activeTab === 'login' ? 'Welcome Back!' : 'Join Our Marketplace'}
                          </h3>
                          <p className="text-white/80 text-xs">
                            {activeTab === 'login' 
                              ? 'Sign in to access your dashboard and manage orders.'
                              : 'Create an account to start buying at wholesale prices.'}
                          </p>
                        </>
                      )}

                      {step === 'otp' && (
                        <>
                          <h3 className="text-xl font-bold mb-1 font-serif">Verify Your Email</h3>
                          <p className="text-white/80 text-xs">
                            We've sent a verification code to your email address.
                          </p>
                        </>
                      )}

                      {(step === 'forgot' || step === 'reset-otp' || step === 'new-password') && (
                        <>
                          <h3 className="text-xl font-bold mb-1 font-serif">Reset Password</h3>
                          <p className="text-white/80 text-xs">
                            Follow the steps to reset your password securely.
                          </p>
                        </>
                      )}
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-2.5">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2.5"
                        >
                          <div className="p-1.5 bg-[#C6A43B]/20 rounded-lg text-[#C6A43B]">
                            {benefit.icon}
                          </div>
                          <span className="text-xs">{benefit.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-5 pt-3 border-t border-white/20 grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-[#C6A43B]">500+</p>
                        <p className="text-[9px] text-white/70">Active Retailers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-[#C6A43B]">50+</p>
                        <p className="text-[9px] text-white/70">Countries</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Forms */}
                <div className="md:w-3/5 p-6 max-h-[560px] overflow-y-auto custom-scrollbar" style={{ backgroundColor: JUTE_COLORS.white }}>
                  {step === 'form' && (
                    <>
                      {/* Tabs */}
                      <div className="flex gap-4 mb-5">
                        <button
                          onClick={() => setActiveTab('login')}
                          className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-all ${
                            activeTab === 'login'
                              ? 'border-[#C6A43B] text-[#6B4F3A]'
                              : 'border-transparent text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => setActiveTab('register')}
                          className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-all ${
                            activeTab === 'register'
                              ? 'border-[#C6A43B] text-[#6B4F3A]'
                              : 'border-transparent text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          Create Account
                        </button>
                      </div>

                      {/* Login Form */}
                      {activeTab === 'login' ? (
                        <>
                          <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Email Address
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                  type="email"
                                  name="email"
                                  value={loginData.email}
                                  onChange={handleLoginChange}
                                  required
                                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white transition-all"
                                  placeholder="your@company.com"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Password
                              </label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  value={loginData.password}
                                  onChange={handleLoginChange}
                                  required
                                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white transition-all"
                                  placeholder="••••••••"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-xs text-[#6B4F3A] hover:underline font-medium"
                              >
                                Forgot password?
                              </button>
                            </div>

                            <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#6B4F3A] to-[#8B6B51] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-sm"
                            >
                              {isLoading ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Signing in...
                                </>
                              ) : (
                                <>
                                  Sign In
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </button>
                          </form>

                          <div className="mt-4">
                            <div className="relative my-4">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                              </div>
                              <div className="relative flex justify-center text-[10px]">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                              </div>
                            </div>
                            <GoogleLoginButtonPopUp
                              mode="login"
                              onSuccess={handleGoogleSuccess}
                              onError={handleGoogleError}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <form onSubmit={handleRegister} className="space-y-3 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                                  Company Name <span className="text-[#6B4F3A]">*</span>
                                </label>
                                <div className="relative">
                                  <Building className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                  <input
                                    type="text"
                                    name="companyName"
                                    value={registerData.companyName}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                    placeholder="Company name"
                                  />
                                </div>
                              </div>

                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                                  Contact Person <span className="text-[#6B4F3A]">*</span>
                                </label>
                                <div className="relative">
                                  <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                  <input
                                    type="text"
                                    name="contactPerson"
                                    value={registerData.contactPerson}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                    placeholder="Full name"
                                  />
                                </div>
                              </div>

                              <div className="col-span-2">
                                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                                  Email Address <span className="text-[#6B4F3A]">*</span>
                                </label>
                                <div className="relative">
                                  <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                  <input
                                    type="email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                    placeholder="your@company.com"
                                  />
                                </div>
                              </div>

                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                                  Phone <span className="text-[#6B4F3A]">*</span>
                                </label>
                                <div className="relative">
                                  <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                  <input
                                    type="tel"
                                    name="phone"
                                    value={registerData.phone}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                    placeholder="+1 234 567 8900"
                                  />
                                </div>
                              </div>

                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                                  WhatsApp <span className="text-[#6B4F3A]">*</span>
                                </label>
                                <div className="relative">
                                  <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                  <input
                                    type="tel"
                                    name="whatsapp"
                                    value={registerData.whatsapp}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                    placeholder="+1 234 567 8900"
                                  />
                                </div>
                              </div>

                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                                  Country <span className="text-[#6B4F3A]">*</span>
                                </label>
                                <div className="relative">
                                  <MapPin className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                  <input
                                    type="text"
                                    name="country"
                                    value={registerData.country}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                    placeholder="Country"
                                  />
                                </div>
                              </div>

                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                                  City <span className="text-[#6B4F3A]">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  value={registerData.city}
                                  onChange={handleRegisterChange}
                                  required
                                  className="w-full px-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                  placeholder="City"
                                />
                              </div>

                              <div className="col-span-1">
                                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                                  Address <span className="text-[#6B4F3A]">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="address"
                                  value={registerData.address}
                                  onChange={handleRegisterChange}
                                  required
                                  className="w-full px-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                  placeholder="Street address"
                                />
                              </div>

                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                                  ZIP Code <span className="text-[#6B4F3A]">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="zipCode"
                                  value={registerData.zipCode}
                                  onChange={handleRegisterChange}
                                  required
                                  className="w-full px-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                  placeholder="ZIP code"
                                />
                              </div>

                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                                  Password <span className="text-[#6B4F3A]">*</span>
                                </label>
                                <div className="relative">
                                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full pl-8 pr-8 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                    placeholder="Min. 8 characters"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                  >
                                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                  </button>
                                </div>
                              </div>

                              <div className="col-span-2 md:col-span-1">
                                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
                                  Confirm Password <span className="text-[#6B4F3A]">*</span>
                                </label>
                                <div className="relative">
                                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                  <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={registerData.confirmPassword}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full pl-8 pr-8 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                    placeholder="Re-enter password"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                  >
                                    {showConfirmPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <input
                                type="checkbox"
                                name="agreeToTerms"
                                id="agreeToTerms"
                                checked={registerData.agreeToTerms}
                                onChange={handleRegisterChange}
                                required
                                className="mt-0.5 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#C6A43B] cursor-pointer w-3 h-3"
                              />
                              <label htmlFor="agreeToTerms" className="ml-1.5 text-[9px] text-gray-600">
                                I agree to the <span className="text-[#6B4F3A] hover:underline">Terms</span> & <span className="text-[#6B4F3A] hover:underline">Privacy</span>
                              </label>
                            </div>

                           <button
  type="submit"
  disabled={isLoading || !registerData.agreeToTerms}
  className="w-full py-2 px-4 bg-gradient-to-r from-[#6B4F3A] to-[#8B6B51] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-sm"
>
  {isLoading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      Creating...
    </>
  ) : (
    <>
      Create Account
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </>
  )}
</button>
                          </form>

                          <div className="mt-4">
                            <div className="relative my-3">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                              </div>
                              <div className="relative flex justify-center text-[10px]">
                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                              </div>
                            </div>
                            <GoogleLoginButtonPopUp 
                              mode="signup"
                              onSuccess={handleGoogleSuccess}
                              onError={handleGoogleError}
                              onSignupSuccess={(userData) => {
                                console.log('New user signed up:', userData);
                              }}
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {step === 'otp' && (
                    <div className="py-2">
                      <div className="text-center mb-4">
                        <div className="w-14 h-14 bg-[#F5E6D3] rounded-full flex items-center justify-center mx-auto mb-3">
                          <Mail className="w-6 h-6 text-[#6B4F3A]" />
                        </div>
                        <p className="text-xs text-gray-600">
                          We've sent a 6-digit code to<br />
                          <span className="font-semibold text-[#6B4F3A]">{registeredEmail}</span>
                        </p>
                      </div>
                      <OTPVerification 
                        email={registeredEmail}
                        onBack={handleBackToForm}
                        onSuccess={handleVerificationSuccess}
                      />
                    </div>
                  )}

                  {step === 'forgot' && (
                    <ForgotPassword 
                      onOTPSent={handleForgotOTPSent} 
                      onBack={handleForgotBack} 
                    />
                  )}

                  {step === 'reset-otp' && (
                    <ResetOTPVerification 
                      email={forgotEmail}
                      onBack={handleResetBack}
                      onSuccess={handleResetOTPVerified}
                    />
                  )}

                  {step === 'new-password' && (
                    <ModalResetPassword 
                      email={forgotEmail}
                      otp={resetOTP}
                      onBack={handleResetBack}
                      onSuccess={handleResetSuccess}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;