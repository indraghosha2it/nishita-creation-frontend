// ============================================
// CTA SECTION - Smart Gadget (Simplified Colors)
// ============================================
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Clock, 
  Shield, 
  Truck, 
  Headphones,
  CheckCircle,
  Send,
  Smartphone,
  Laptop,
  Watch,
  Package,
  Zap,
  Star,
  Users,
  Award,
  Gift,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  MessageCircle
} from 'lucide-react';

export default function CTASection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productInterest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });

  const benefits = [
    { icon: Shield, text: "100% Genuine Products" },
    { icon: Clock, text: "Response within 24 hours" },
    { icon: Truck, text: "Free Delivery over ৳3,000" },
    { icon: Headphones, text: "24/7 Tech Support" }
  ];

  const stats = [
    { value: "10,000+", label: "Happy Customers", icon: Users },
    { value: "500+", label: "Premium Products", icon: Package },
    { value: "98%", label: "Satisfaction Rate", icon: Star },
    { value: "24/7", label: "Customer Support", icon: Headphones }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

// In CTASection.js - handleSubmit function (around line 80-95)

const handleSubmit = async (e) => {
  e.preventDefault();
  
  setFormStatus({ submitted: true, success: false, message: 'Sending...' });
  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.productInterest || 'General Inquiry',  // <-- CHANGE THIS LINE
        message: formData.message
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setFormStatus({
        submitted: true,
        success: true,
        message: data.message || 'Thank you! We\'ll contact you within 24 hours.'
      });
      
      setFormData({ 
        name: '', 
        email: '', 
        phone: '',
        productInterest: '', 
        message: '' 
      });
      
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: '' });
      }, 5000);
    } else {
      throw new Error(data.error || 'Failed to send message');
    }
  } catch (error) {
    console.error('Contact form error:', error);
    setFormStatus({
      submitted: true,
      success: false,
      message: error.message || 'Failed to send message. Please try again later.'
    });
    
    setTimeout(() => {
      setFormStatus({ submitted: false, success: false, message: '' });
    }, 5000);
  } finally {
    setIsSubmitting(false);
  }
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <section 
      id="cta-section" 
      ref={sectionRef} 
      className="py-6 md:py-0 lg:py-0 bg-gray-50 overflow-hidden relative"
    >
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M30 30v-6h-3v6h-6v3h6v6h3v-6h6v-3h-6zm0-45V0h-3v6h-6v3h6v6h3V9h6V6h-6zM9 30v-6H6v6H0v3h6v6h3v-6h6v-3H9zM9 6V0H6v6H0v3h6v6h3V9h6V6H9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1 mb-4 md:mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] md:text-xs font-semibold text-blue-700 tracking-wider uppercase">
                  🚀 Exclusive Deals
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight"
            >
              Upgrade Your{' '}
              <span className="relative inline-block text-black">
                Tech Game
                <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 300 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 2C100 0.5 200 0.5 299 2" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
                </svg>
              </span>
            </motion.h2>

            {/* Subheading */}
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Get premium gadgets at the best prices with official warranty. 
              From smartphones to smart home devices – we've got you covered.
            </motion.p>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8"
            >
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white rounded-lg p-2 md:p-3 text-center border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Icon className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                      <span className="text-sm md:text-base lg:text-lg font-bold text-gray-900">{stat.value}</span>
                    </div>
                    <p className="text-[8px] md:text-[9px] text-gray-500 font-sans">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Benefits List */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-2 md:gap-3 mb-6 md:mb-8"
            >
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-2.5 h-2.5 md:w-3 md:h-3 text-blue-600" />
                    </div>
                    <span className="text-[9px] md:text-[10px] lg:text-xs text-gray-700 font-sans leading-tight">{benefit.text}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="group relative overflow-hidden bg-black text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto shadow-md hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
                    Shop Now
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-blue-700"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
              
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white border border-gray-300 text-gray-700 font-medium px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 w-full sm:w-auto text-sm md:text-base"
                >
                  <Headphones className="w-4 h-4 md:w-5 md:h-5" />
                  Contact Support
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-5 md:p-6 lg:p-8 border border-gray-200"
          >
            <div className="mb-4 md:mb-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-100 text-blue-700 text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full">
                  💬 GET IN TOUCH
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Need Help Choosing?</h3>
              <p className="text-[10px] md:text-xs text-gray-500">Tell us what you're looking for & we'll find the perfect match</p>
            </div>
            
            {formStatus.submitted && formStatus.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 md:p-6 text-center"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="text-green-600 w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1">Thank You!</h4>
                <p className="text-xs md:text-sm text-gray-600 mb-3">{formStatus.message}</p>
                <button
                  onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                  className="text-blue-600 font-semibold hover:text-blue-700 text-xs md:text-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-[10px] md:text-xs font-semibold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 md:w-4 md:h-4" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 md:pl-10 pr-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-[10px] md:text-xs font-semibold text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 md:w-4 md:h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 md:pl-10 pr-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                        placeholder="info@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-semibold text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 md:w-4 md:h-4" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 md:pl-10 pr-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                        placeholder="+880 1871-733305"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] md:text-xs font-semibold text-gray-700 mb-1">
                    Gadget You're Looking For
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 md:w-4 md:h-4" />
                    <input
                      type="text"
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                      className="w-full pl-9 md:pl-10 pr-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                      placeholder="e.g. iPhone 15, Gaming Laptop, Smartwatch..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] md:text-xs font-semibold text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
             
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full pl-9 md:pl-10 pr-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none bg-gray-50 hover:bg-white"
                      placeholder="Tell us about your requirements, budget, or any specific needs..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white font-semibold py-2.5 md:py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 text-sm md:text-base shadow-sm hover:shadow-md"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Find My Gadget
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[8px] md:text-[9px] text-gray-400 text-center">
                  🔒 100% secure. We'll respond within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}