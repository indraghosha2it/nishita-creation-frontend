
// // app/contact/ContactClient.js
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { 
//   FaEnvelope, 
//   FaPhone, 
//   FaMapMarkerAlt, 
//   FaClock,
//   FaPaperPlane,
//   FaCheckCircle,
//   FaArrowRight,
//   FaUser,
//   FaFacebookF,
//   FaInstagram,
//   FaYoutube,
//   FaPinterestP,
//   FaTiktok,
//   FaSparkles,
//   FaShieldAlt,
//   FaTruck,
//   FaHeart,
//   FaStar,
//   FaGlobe,
//   FaWhatsapp,
//   FaAward,
//   FaUsers,
//   FaGem
// } from 'react-icons/fa';
// import { GiLipstick, GiSparkles } from 'react-icons/gi';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Font family constants - Same as Categories and About pages
// const FONT_FAMILY = "'Courgette', cursive";
// const FONT_FAMILY_PLAYFAIR = "serif";

// // Icon mapping for dynamic rendering
// const ICON_MAP = {
//   FaHeart,
//   FaShieldAlt,
//   FaTruck,
//   FaCheckCircle,
//   FaClock,
//   FaStar,
//   FaUsers,
//   FaAward,
//   FaGlobe,
//   FaWhatsapp,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaGem,
//   GiLipstick,
//   GiSparkles
// };

// const SOCIAL_ICON_MAP = {
//   FaFacebookF: FaFacebookF,
//   FaInstagram: FaInstagram,
//   FaYoutube: FaYoutube,
//   FaPinterest: FaPinterestP,
//   FaTiktok: FaTiktok,
// };

// const getIcon = (iconName) => {
//   const Icon = ICON_MAP[iconName];
//   return Icon || FaStar;
// };

// const getSocialIcon = (iconName) => {
//   const Icon = SOCIAL_ICON_MAP[iconName];
//   return Icon || FaFacebookF;
// };

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
// };

// const fadeInLeft = {
//   hidden: { opacity: 0, x: -40 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
// };

// const fadeInRight = {
//   hidden: { opacity: 0, x: 40 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.1
//     }
//   }
// };

// const scaleUp = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
// };

// export default function ContactClient() {
//   const [contactData, setContactData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     setFormStatus({ submitted: true, success: false, message: 'Sending...' });
//     setIsSubmitting(true);

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
//       const response = await fetch(`${apiUrl}/api/contact`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           subject: formData.subject || 'General Inquiry',
//           message: formData.message
//         }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setFormStatus({
//           submitted: true,
//           success: true,
//           message: data.message || 'Thank you! We\'ll get back to you within 24 hours.'
//         });
        
//         setFormData({ 
//           name: '', 
//           email: '', 
//           phone: '',
//           subject: '', 
//           message: '' 
//         });
        
//         setTimeout(() => {
//           setFormStatus({ submitted: false, success: false, message: '' });
//         }, 5000);
//       } else {
//         throw new Error(data.error || 'Failed to send message');
//       }
//     } catch (error) {
//       console.error('Contact form error:', error);
//       setFormStatus({
//         submitted: true,
//         success: false,
//         message: error.message || 'Failed to send message. Please try again later.'
//       });
      
//       setTimeout(() => {
//         setFormStatus({ submitted: false, success: false, message: '' });
//       }, 5000);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Default data
//   const defaultData = {
//     hero: {
//       bgImage: '/images/bg10.jpg',
//       badge: 'Get in Touch',
//       title: "We'd Love to",
//       highlightText: 'Hear From You',
//       description: 'Have questions about products, orders, or anything else? We\'re here to help and respond within 24 hours.'
//     },
//     stats: [
//       { icon: 'FaUsers', value: '10K+', label: 'Happy Customers' },
//       { icon: 'FaStar', value: '4.9/5', label: 'Average Rating' },
//       { icon: 'FaAward', value: '100%', label: 'Authentic Products' },
//       { icon: 'FaClock', value: '24/7', label: 'Support Available' }
//     ],
//     quickContacts: [
//       { icon: 'FaPhone', label: 'Phone', value: '+880 1XXXXXXX', link: 'tel:+8801XXXXXXX' },
//       { icon: 'FaEnvelope', label: 'Email', value: 'support@beautybucket.com', link: 'mailto:support@beautybucket.com' },
//       { icon: 'FaMapMarkerAlt', label: 'Address', value: 'House #470, Avenue #6, Road #6, Mirpur DOHS, Dhaka', link: 'https://maps.google.com' },
//       { icon: 'FaClock', label: 'Working Hours', value: '24/7 Online Ordering', link: '#' }
//     ],
//     leftSide: {
//       badge: 'Contact Us',
//       title: "Let's Connect",
//       subtitle: '& Make Beauty Happen',
//       description: 'Whether you have questions about a product, need assistance with an order, or just want some beauty advice - our team is ready to help you.',
//       features: [
//         { icon: 'CheckCircle', title: 'Quick Response', description: 'We reply within 24 hours' },
//         { icon: 'Shield', title: 'Expert Advice', description: 'Get guidance from beauty experts' },
//         { icon: 'Truck', title: 'Order Support', description: 'Track and manage your orders' }
//       ]
//     },
//     socialLinks: [
//       { platform: 'facebook', url: '#', icon: 'FaFacebookF', color: 'hover:bg-[#1877F2]' },
//       { platform: 'instagram', url: '#', icon: 'FaInstagram', color: 'hover:bg-[#E4405F]' },
//       { platform: 'youtube', url: '#', icon: 'FaYoutube', color: 'hover:bg-[#FF0000]' },
//       { platform: 'pinterest', url: '#', icon: 'FaPinterest', color: 'hover:bg-[#BD081C]' },
//       { platform: 'tiktok', url: '#', icon: 'FaTiktok', color: 'hover:bg-[#000000]' }
//     ],
//     map: {
//       title: 'Find Us',
//       embedCode: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5029279808477!2d90.3686038739732!3d23.83626858547701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a38f924d3%3A0x39a8c038652ae720!2sHouse%20470%2C%20R9PC%2BHGM%2C%206%20Avenue%206%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1781765267904!5m2!1sen!2sbd'
//     },
//     cta: {
//       bgImage: '/images/pattern.png',
//       badge: 'Still Have Questions?',
//       title: "We're Here to Help",
//       description: 'Our beauty experts are ready to assist you with any questions about products or orders.',
//       buttonText: 'Call Now',
//       buttonLink: 'tel:+8801871733305',
//       secondaryButtonText: 'Browse Products',
//       secondaryButtonLink: '/products'
//     },
//     form: {
//       title: 'Send Us a Message',
//       description: "Fill in the form and we'll get back to you within 24 hours",
//       successMessage: "Thank you! We'll get back to you within 24 hours."
//     }
//   };

//   // Fetch contact data from backend
//   useEffect(() => {
//     const fetchContactData = async () => {
//       try {
//         setIsLoading(true);
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//         const response = await fetch(`${apiUrl}/api/contact`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch contact data: ${response.status}`);
//         }

//         const result = await response.json();

//         if (result.success && result.data) {
//           const mergedData = {
//             hero: { ...defaultData.hero, ...result.data.hero },
//             stats: result.data.stats || defaultData.stats,
//             quickContacts: result.data.quickContacts || defaultData.quickContacts,
//             leftSide: { ...defaultData.leftSide, ...result.data.leftSide },
//             socialLinks: result.data.socialLinks || defaultData.socialLinks,
//             faq: { ...defaultData.faq, ...result.data.faq },
//             map: { ...defaultData.map, ...result.data.map },
//             cta: { ...defaultData.cta, ...result.data.cta },
//             form: { ...defaultData.form, ...result.data.form }
//           };
//           setContactData(mergedData);
//         } else {
//           setContactData(defaultData);
//         }
//       } catch (err) {
//         console.error('❌ Error fetching contact data:', err);
//         setContactData(defaultData);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchContactData();
//   }, []);

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white flex items-center justify-center -mt-20">
//           <div className="text-center">
//             <div className="inline-block w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-500 mt-2" style={{ fontFamily: FONT_FAMILY }}>Loading contact page...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const data = contactData || defaultData;
//   const { hero, stats, quickContacts, leftSide, socialLinks, map, cta, form } = data;

//   return (
//     <>
//       <Navbar />
      
//       <main className="min-h-screen bg-white overflow-hidden -mt-20">
        
//         {/* Hero Section */}
//         <section className="relative overflow-hidden pt-8 pb-8 lg:pt-10 lg:pb-10">
//           {/* Background Image */}
//           <div className="absolute inset-0 z-0">
//             <div 
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//               style={{
//                 backgroundImage: `url('${hero?.bgImage || '/images/bg10.jpg'}')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//             ></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-[#1A0E14]/88 via-[#1A0E14]/78 to-[#1A0E14]/68"></div>
//             <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/8 via-transparent to-[#FF6B9D]/8"></div>
//             <div className="absolute top-0 right-0 w-72 h-72 bg-[#EE4275]/10 rounded-full filter blur-3xl"></div>
//             <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6B9D]/10 rounded-full filter blur-3xl"></div>
//           </div>
          
//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={fadeInUp}
//               className="text-center max-w-3xl mx-auto"
//             >
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EE4275]/20 backdrop-blur-sm rounded-full text-[#FF6B9D] text-sm font-medium mb-4 border border-[#EE4275]/20">
//                 <GiSparkles className="w-4 h-4" />
//                 <span style={{ fontFamily: FONT_FAMILY }}>{hero?.badge || 'Get in Touch'}</span>
//               </div>
//               <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: FONT_FAMILY }}>
//                 {hero?.title || "We'd Love to"}
//                 <br />
//                 <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
//                   {hero?.highlightText || 'Hear From You'}
//                 </span>
//               </h1>
//               <p className="text-base text-white/70 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 {hero?.description || 'Have questions about products, orders, or anything else? We\'re here to help and respond within 24 hours.'}
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Contact Info Cards */}
//         <section className="py-10 lg:py-12 bg-white border-b border-[#FFD2DB]/20">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={staggerContainer}
//               className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6"
//             >
//               {quickContacts?.map((info, idx) => {
//                 const Icon = getIcon(info.icon);
//                 return (
//                   <motion.div
//                     key={idx}
//                     variants={scaleUp}
//                     className="group relative overflow-hidden rounded-2xl p-4 lg:p-6 border-2 border-[#FFD2DB]/30 hover:border-[#EE4275] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#EE4275]/10 bg-gradient-to-br from-white to-[#FFF5F6]"
//                   >
//                     <div className="flex flex-col items-center text-center gap-2 relative z-10">
//                       <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center text-[#EE4275] flex-shrink-0 group-hover:from-[#EE4275] group-hover:to-[#FF6B9D] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg">
//                         <Icon className="w-5 h-5" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-[#2D1B2E] text-xs lg:text-base" style={{ fontFamily: FONT_FAMILY }}>
//                           {info.label}
//                         </h4>
//                         <p className="text-[9px] lg:text-sm text-[#8B7A8C]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                           {info.value}
//                         </p>
//                         <a 
//                           href={info.link || '#'} 
//                           className="text-[10px] lg:text-sm text-[#EE4275] hover:text-[#EE4275]/70 font-medium inline-flex items-center gap-1 mt-1 group-hover:gap-2 transition-all" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                         >
//                           Contact
//                           <FaArrowRight className="w-2 h-2 lg:w-3 h-3" />
//                         </a>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>
//           </div>
//         </section>

//         {/* Contact Form Section */}
//         <section className="relative py-16 lg:py-24 overflow-hidden">
//           {/* Background Image */}
//           <div className="absolute inset-0 z-0">
//             <div 
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//               style={{
//                 backgroundImage: `url('/images/form-bg.jpg')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 backgroundAttachment: 'fixed'
//               }}
//             ></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/88 to-white/92"></div>
//             <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/8 via-transparent to-[#FF6B9D]/8"></div>
//             <div className="absolute top-0 right-0 w-96 h-96 bg-[#EE4275]/8 rounded-full filter blur-3xl"></div>
//             <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF6B9D]/8 rounded-full filter blur-3xl"></div>
//           </div>

//           <div className="container mx-auto px-4 relative z-10">
//             <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
//               {/* Left Side - Content */}
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 variants={staggerContainer}
//                 className="lg:col-span-2"
//               >
//                 <motion.div variants={fadeInUp}>
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
//                     <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
//                       {leftSide?.badge || 'Contact Us'}
//                     </span>
//                   </div>
//                 </motion.div>

//                 <motion.h2 
//                   variants={fadeInUp}
//                   className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#2D1B2E] mb-4" style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   {leftSide?.title || "Let's Connect"}
//                   <br />
//                   <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
//                     {leftSide?.subtitle || '& Make Beauty Happen'}
//                   </span>
//                 </motion.h2>

//                 <motion.p 
//                   variants={fadeInUp}
//                   className="text-sm lg:text-base text-[#8B7A8C] mb-6 leading-relaxed" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 >
//                   {leftSide?.description || 'Whether you have questions about a product, need assistance with an order, or just want some beauty advice - our team is ready to help you.'}
//                 </motion.p>

//                 {/* Benefits List */}
//                 <motion.div variants={fadeInUp} className="space-y-3 mb-6">
//                   {leftSide?.features?.map((feature, idx) => {
//                     const Icon = getIcon(feature.icon);
//                     return (
//                       <div key={idx} className="flex items-start gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-[#FFD2DB]/20 hover:border-[#EE4275]/30 transition-all hover:shadow-md">
//                         <div className="w-6 h-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                           <Icon className="w-3.5 h-3.5 text-green-600" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-[#2D1B2E] text-sm" style={{ fontFamily: FONT_FAMILY }}>{feature.title}</h4>
//                           <p className="text-xs lg:text-sm text-[#8B7A8C]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{feature.description}</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </motion.div>

//                 {/* Social Links */}
//                 <motion.div variants={fadeInUp}>
//                   <p className="text-xs lg:text-sm text-[#8B7A8C] mb-3" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Connect with us:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {socialLinks?.map((social, idx) => {
//                       const Icon = getSocialIcon(social.icon);
//                       return (
//                         <a
//                           key={idx}
//                           href={social.url || '#'}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white border border-[#FFD2DB]/30 text-[#8B7A8C] flex items-center justify-center transition-all duration-300 hover:text-white shadow-sm hover:shadow-lg ${social.color || 'hover:bg-[#1877F2]'}`}
//                           aria-label={social.platform}
//                         >
//                           <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
//                         </a>
//                       );
//                     })}
//                   </div>
//                 </motion.div>
//               </motion.div>

//               {/* Right Side - Contact Form */}
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 variants={fadeInRight}
//                 className="lg:col-span-3"
//               >
//                 <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 border border-[#FFD2DB]/30">
//                   {/* Form Header */}
//                   <div className="mb-6 lg:mb-8">
//                     <h3 className="text-xl lg:text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>{form?.title || 'Send Us a Message'}</h3>
//                     <p className="text-sm text-[#8B7A8C]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{form?.description || "Fill in the form and we'll get back to you within 24 hours"}</p>
//                   </div>

//                   {formStatus.submitted && formStatus.success ? (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       className="bg-green-50 border border-green-200 rounded-xl p-6 lg:p-8 text-center"
//                     >
//                       <div className="w-14 h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <FaCheckCircle className="text-green-600 w-7 h-7 lg:w-8 lg:h-8" />
//                       </div>
//                       <h4 className="text-lg lg:text-xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY }}>Message Sent! ✨</h4>
//                       <p className="text-sm lg:text-base text-[#8B7A8C] mb-4" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{formStatus.message}</p>
//                       <button
//                         onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
//                         className="text-[#EE4275] font-semibold hover:text-[#EE4275]/70 text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                       >
//                         Send Another Message →
//                       </button>
//                     </motion.div>
//                   ) : (
//                     <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
//                       {/* Name Field */}
//                       <div>
//                         <label className="block text-xs lg:text-sm font-semibold text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                           Full Name <span className="text-[#EE4275]">*</span>
//                         </label>
//                         <div className="relative group">
//                           <div className="absolute inset-0 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C4B5C5] w-4 h-4 lg:w-5 lg:h-5 z-10 group-hover:text-[#EE4275] transition-colors" />
//                           <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                             className="relative w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 text-sm lg:text-base border-2 border-[#FFD2DB]/40 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition bg-white/90 hover:bg-white text-[#2D1B2E] placeholder:text-[#C4B5C5] shadow-sm" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                             placeholder="Your Name"
//                           />
//                         </div>
//                       </div>

//                       {/* Email & Phone */}
//                       <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
//                         <div>
//                           <label className="block text-xs lg:text-sm font-semibold text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                             Email <span className="text-[#EE4275]">*</span>
//                           </label>
//                           <div className="relative group">
//                             <div className="absolute inset-0 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                             <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C4B5C5] w-4 h-4 lg:w-5 lg:h-5 z-10 group-hover:text-[#EE4275] transition-colors" />
//                             <input
//                               type="email"
//                               name="email"
//                               value={formData.email}
//                               onChange={handleChange}
//                               required
//                               className="relative w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 text-sm lg:text-base border-2 border-[#FFD2DB]/40 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition bg-white/90 hover:bg-white text-[#2D1B2E] placeholder:text-[#C4B5C5] shadow-sm" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                               placeholder="info@email.com"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label className="block text-xs lg:text-sm font-semibold text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                             Phone <span className="text-[#EE4275]">*</span>
//                           </label>
//                           <div className="relative group">
//                             <div className="absolute inset-0 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                             <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C4B5C5] w-4 h-4 lg:w-5 lg:h-5 z-10 group-hover:text-[#EE4275] transition-colors" />
//                             <input
//                               type="tel"
//                               name="phone"
//                               value={formData.phone}
//                               onChange={handleChange}
//                               required
//                               className="relative w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 text-sm lg:text-base border-2 border-[#FFD2DB]/40 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition bg-white/90 hover:bg-white text-[#2D1B2E] placeholder:text-[#C4B5C5] shadow-sm" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                               placeholder="+880 1XXXXXXXXX"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Subject Field */}
//                       <div>
//                         <label className="block text-xs lg:text-sm font-semibold text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                           Subject
//                         </label>
//                         <div className="relative group">
//                           <div className="absolute inset-0 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C4B5C5] w-4 h-4 lg:w-5 lg:h-5 z-10 group-hover:text-[#EE4275] transition-colors" />
//                           <input
//                             type="text"
//                             name="subject"
//                             value={formData.subject}
//                             onChange={handleChange}
//                             className="relative w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 text-sm lg:text-base border-2 border-[#FFD2DB]/40 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition bg-white/90 hover:bg-white text-[#2D1B2E] placeholder:text-[#C4B5C5] shadow-sm" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                             placeholder="e.g. Product Inquiry"
//                           />
//                         </div>
//                       </div>

//                       {/* Message Field */}
//                       <div>
//                         <label className="block text-xs lg:text-sm font-semibold text-[#2D1B2E] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                           Message <span className="text-[#EE4275]">*</span>
//                         </label>
//                         <div className="relative group">
//                           <div className="absolute inset-0 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           <textarea
//                             name="message"
//                             value={formData.message}
//                             onChange={handleChange}
//                             required
//                             rows={4}
//                             className="relative w-full px-4 py-2.5 lg:py-3 text-sm lg:text-base border-2 border-[#FFD2DB]/40 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition resize-none bg-white/90 hover:bg-white text-[#2D1B2E] placeholder:text-[#C4B5C5] shadow-sm" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                             placeholder="Tell us how we can help you..."
//                           />
//                         </div>
//                       </div>

//                       {/* Submit Button */}
//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold py-3 lg:py-3.5 rounded-xl hover:shadow-xl hover:shadow-[#EE4275]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 text-sm lg:text-base hover:-translate-y-0.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                       >
//                         {isSubmitting ? (
//                           <span className="flex items-center gap-2">
//                             <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                             Sending...
//                           </span>
//                         ) : (
//                           <>
//                             <FaPaperPlane className="w-4 h-4 lg:w-5 lg:h-5" />
//                             Send Message
//                           </>
//                         )}
//                       </button>

//                       <p className="text-center text-[10px] lg:text-xs text-[#C4B5C5]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         🔒 Your information is safe with us. We'll never share your data.
//                       </p>
//                     </form>
//                   )}
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Map Section */}
//         <section className="py-12 lg:py-20 bg-white">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//               className="text-center mb-6 lg:mb-8"
//             >
//               <div className="flex items-center justify-center gap-2 mb-3">
//                 <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
//                 <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>{map?.title || 'Find Us'}</span>
//                 <span className="w-10 h-0.5 bg-gradient-to-l from-[#EE4275] to-[#FF6B9D]"></span>
//               </div>
//               <h2 className="text-2xl lg:text-3xl font-bold text-[#2D1B2E]" style={{ fontFamily: FONT_FAMILY }}>Visit Our Showroom</h2>
//             </motion.div>

//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//               className="rounded-2xl overflow-hidden shadow-lg border border-[#FFD2DB]/20"
//             >
//               {(() => {
//                 let mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5029279808477!2d90.3686038739732!3d23.83626858547701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a38f924d3%3A0x39a8c038652ae720!2sHouse%20470%2C%20R9PC%2BHGM%2C%206%20Avenue%206%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1781765267904!5m2!1sen!2sbd';
                
//                 if (map?.embedCode) {
//                   if (map.embedCode.includes('<iframe')) {
//                     const srcMatch = map.embedCode.match(/src="([^"]+)"/);
//                     if (srcMatch && srcMatch[1]) {
//                       mapSrc = srcMatch[1];
//                     }
//                   } else if (map.embedCode.startsWith('http://') || map.embedCode.startsWith('https://')) {
//                     mapSrc = map.embedCode;
//                   }
//                 }
                
//                 return (
//                   <iframe
//                     src={mapSrc}
//                     width="100%"
//                     height="400"
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                     className="w-full h-[250px] sm:h-[300px] md:h-[400px]"
//                     title="BeautyBucket Location"
//                   />
//                 );
//               })()}
//             </motion.div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="relative py-16 lg:py-20 overflow-hidden">
//           <div 
//             className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//             style={{
//               backgroundImage: `url('${cta?.bgImage || '/images/pattern.png'}')`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-[#EE4275] to-[#FF6B9D]"></div>
//           </div>
//           <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
          
//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//               className="text-center max-w-2xl mx-auto"
//             >
//               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 border border-white/20">
//                 <GiSparkles className="w-4 h-4 text-white" />
//                 <span className="text-sm font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>{cta?.badge || 'Still Have Questions?'}</span>
//               </div>
//               <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: FONT_FAMILY }}>
//                 {cta?.title || "We're Here to Help"}
//               </h2>
//               <p className="text-white/80 text-base lg:text-lg mb-8" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 {cta?.description || 'Our beauty experts are ready to assist you with any questions about products or orders.'}
//               </p>
//               <div className="flex flex-wrap gap-4 justify-center">
//                 <a href={cta?.buttonLink || 'tel:+8801871733305'}>
//                   <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 bg-white text-[#EE4275] rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all font-medium hover:-translate-y-0.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     <FaPhone className="w-4 h-4" />
//                     {cta?.buttonText || 'Call Now'}
//                   </button>
//                 </a>
//                 <Link href={cta?.secondaryButtonLink || '/products'}>
//                   <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium hover:-translate-y-0.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     {cta?.secondaryButtonText || 'Browse Products'}
//                     <FaArrowRight className="w-4 h-4" />
//                   </button>
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//       </main>

//       <Footer />
//     </>
//   );
// }


// app/contact/ContactClient.js
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaArrowRight,
  FaUser,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaTiktok,
  FaShieldAlt,
  FaTruck,
  FaHeart,
  FaStar,
  FaGlobe,
  FaWhatsapp,
  FaAward,
  FaUsers,
  FaGem,
} from 'react-icons/fa';

import {
  GiLipstick,
  GiSparkles,
} from 'react-icons/gi';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// ============================================================
// FONTS - Beauty Bucket Theme
// ============================================================

const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = " serif";

// ============================================================
// ICON MAP
// ============================================================

const ICON_MAP = {
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaUsers,
  FaAward,
  FaGlobe,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGem,
  GiLipstick,
  GiSparkles,

  // Aliases
  Heart: FaHeart,
  Shield: FaShieldAlt,
  CheckCircle: FaCheckCircle,
  Truck: FaTruck,
  Clock: FaClock,
  Star: FaStar,
  Users: FaUsers,
  Award: FaAward,
  Globe: FaGlobe,
  Whatsapp: FaWhatsapp,
  Phone: FaPhone,
  Envelope: FaEnvelope,
  MapMarker: FaMapMarkerAlt,
  Gem: FaGem,
  Lipstick: GiLipstick,
  Sparkles: GiSparkles,
};

const SOCIAL_ICON_MAP = {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterest: FaPinterestP,
  FaPinterestP,
  FaTiktok,
};

const getIcon = (iconName) => {
  if (!iconName) return FaStar;
  return ICON_MAP[iconName] || FaStar;
};

const getSocialIcon = (iconName) => {
  if (!iconName) return FaFacebookF;
  return SOCIAL_ICON_MAP[iconName] || FaFacebookF;
};

// ============================================================
// ANIMATION VARIANTS
// ============================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

// ============================================================
// COMPONENT
// ============================================================

export default function ContactClient() {
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  // ============================================================
  // FORM CHANGE
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ============================================================
  // FORM SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({ submitted: true, success: false, message: 'Sending...' });
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'General Inquiry',
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          submitted: true,
          success: true,
          message: data.message || "Thank you! We'll get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

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
        message: error.message || 'Failed to send message. Please try again later.',
      });

      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: '' });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // DEFAULT DATA
  // ============================================================

  const defaultData = {
    hero: {
      bgImage: '/images/bg10.jpg',
      badge: 'Get in Touch',
      title: "We'd Love to",
      highlightText: 'Hear From You',
      description:
        "Have questions about products, orders, or anything else? We're here to help and respond within 24 hours.",
    },
    stats: [
      { icon: 'FaUsers', value: '10K+', label: 'Happy Customers' },
      { icon: 'FaStar', value: '4.9/5', label: 'Average Rating' },
      { icon: 'FaAward', value: '100%', label: 'Authentic Products' },
      { icon: 'FaClock', value: '24/7', label: 'Support Available' },
    ],
    quickContacts: [
      {
        icon: 'FaPhone',
        label: 'Phone',
        value: '+880 1XXXXXXX',
        link: 'tel:+8801XXXXXXX',
      },
      {
        icon: 'FaWhatsapp',
        label: 'WhatsApp',
        value: '+880 1XXXXXXX',
        link: 'https://wa.me/8801XXXXXXX',
      },
      {
        icon: 'FaEnvelope',
        label: 'Email',
        value: 'support@beautybucket.com',
        link: 'mailto:support@beautybucket.com',
      },
      {
        icon: 'FaMapMarkerAlt',
        label: 'Our Shop',
        value: 'House #470, Avenue #6, Road #6, Mirpur DOHS, Dhaka',
        link: 'https://maps.google.com',
      },
    ],
    leftSide: {
      badge: 'Beauty Bucket',
      title: "Let's Connect",
      subtitle: '& Make Beauty Happen',
      description:
        'Whether you have questions about a product, need assistance with an order, or just want some beauty advice - our team is ready to help you.',
      features: [
        {
          icon: 'CheckCircle',
          title: 'Quick Response',
          description: 'We reply within 24 hours',
        },
        {
          icon: 'Shield',
          title: 'Expert Advice',
          description: 'Get guidance from beauty experts',
        },
        {
          icon: 'Truck',
          title: 'Order Support',
          description: 'Track and manage your orders',
        },
      ],
    },
    socialLinks: [
      { platform: 'facebook', url: '#', icon: 'FaFacebookF', color: 'hover:bg-[#1877F2]' },
      { platform: 'instagram', url: '#', icon: 'FaInstagram', color: 'hover:bg-[#E4405F]' },
      { platform: 'youtube', url: '#', icon: 'FaYoutube', color: 'hover:bg-[#FF0000]' },
      { platform: 'pinterest', url: '#', icon: 'FaPinterest', color: 'hover:bg-[#BD081C]' },
      { platform: 'tiktok', url: '#', icon: 'FaTiktok', color: 'hover:bg-[#000000]' },
    ],
    map: {
      title: 'Find Us',
      embedCode:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5029279808477!2d90.3686038739732!3d23.83626858547701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a38f924d3%3A0x39a8c038652ae720!2sHouse%20470%2C%20R9PC%2BHGM%2C%206%20Avenue%206%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1781765267904!5m2!1sen!2sbd',
    },
    cta: {
      bgImage: '/images/pattern.png',
      badge: 'Still Have Questions?',
      title: "We're Here to Help",
      description: 'Our beauty experts are ready to assist you with any questions about products or orders.',
      buttonText: 'Call Now',
      buttonLink: 'tel:+8801871733305',
      secondaryButtonText: 'Browse Products',
      secondaryButtonLink: '/products',
    },
    form: {
      title: 'Get In Touch',
      description: "Fill in the form and we'll get back to you within 24 hours",
      successMessage: "Thank you! We'll get back to you within 24 hours.",
    },
  };

  // ============================================================
  // FETCH CONTACT DATA
  // ============================================================

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/contact`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch contact data: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          const mergedData = {
            hero: { ...defaultData.hero, ...result.data.hero },
            stats: result.data.stats || defaultData.stats,
            quickContacts: result.data.quickContacts || defaultData.quickContacts,
            leftSide: { ...defaultData.leftSide, ...result.data.leftSide },
            socialLinks: result.data.socialLinks || defaultData.socialLinks,
            faq: { ...defaultData.faq, ...result.data.faq },
            map: { ...defaultData.map, ...result.data.map },
            cta: { ...defaultData.cta, ...result.data.cta },
            form: { ...defaultData.form, ...result.data.form },
          };
          setContactData(mergedData);
        } else {
          setContactData(defaultData);
        }
      } catch (err) {
        console.error('❌ Error fetching contact data:', err);
        setContactData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // ============================================================
  // LOADING
  // ============================================================

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f8f7f2] flex items-center justify-center -mt-20">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#53645a] mt-3 text-sm" style={{ fontFamily: FONT_FAMILY }}>
              Loading...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const data = contactData || defaultData;
  const { hero, quickContacts, leftSide, socialLinks, map, cta, form } = data;

  let mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5029279808477!2d90.3686038739732!3d23.83626858547701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a38f924d3%3A0x39a8c038652ae720!2sHouse%20470%2C%20R9PC%2BHGM%2C%206%20Avenue%206%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1781765267904!5m2!1sen!2sbd';

  if (map?.embedCode) {
    if (map.embedCode.includes('<iframe')) {
      const srcMatch = map.embedCode.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) mapSrc = srcMatch[1];
    } else if (map.embedCode.startsWith('http://') || map.embedCode.startsWith('https://')) {
      mapSrc = map.embedCode;
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f7f2] overflow-hidden -mt-20">

        {/* ======================================================
            HERO - REFERENCE STYLE / BEAUTY EDITORIAL
        ====================================================== */}

        <section className="relative min-h-[200px] sm:min-h-[200px] lg:min-h-[250px] overflow-hidden bg-[#f3eee7]">
          
          {/* Background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${hero?.bgImage || '/images/bg10.jpg'}')`,
              }}
            />

            {/* Soft cream overlay */}
            <div className="absolute inset-0 bg-[#f3eee7]/5" />

            {/* Left side readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f3eee7]/55 via-[#f3eee7]/25 to-transparent" />

            {/* Very subtle right fade */}
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent to-[#f3eee7]/10" />
          </div>

          {/* Decorative soft shapes */}
          <div className="absolute -left-20 -top-20 w-56 h-56 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-[#c9bca8]/10 blur-3xl" />

          <div className="container mx-auto px-5 sm:px-8 lg:px-10 relative z-10 h-full">
            <div className="min-h-[200px] sm:min-h-[200px] lg:min-h-[250px]  flex items-center">

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInLeft}
                className="
                  w-full
                  max-w-[390px]
                  sm:max-w-[460px]
                  lg:max-w-[510px]
                  py-10
                  sm:py-12
                  lg:py-14
                "
              >

                {/* Small editorial label */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="w-7 sm:w-9 h-px bg-[#8B9D83]" />

                  <span
                    className="
                      text-[8px]
                      sm:text-[9px]
                      uppercase
                      tracking-[0.28em]
                      text-[#68776b]
                    "
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {hero?.badge || 'Get in Touch'}
                  </span>
                </div>

                {/* Main Heading */}
                <h1
                  className="
                    text-[32px]
                    leading-[0.98]
                    sm:text-[40px]
                    sm:leading-[1]
                    lg:text-[50px]
                    lg:leading-[1]
                    font-normal
                    text-[#263b32]
                    tracking-[-0.025em]
                  "
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  {hero?.title || "We'd Love to"}

                  <span
                    className="
                      block
                      text-[#789072]
                      font-normal
                    "
                  >
                    {hero?.highlightText || 'Hear From You'}
                  </span>
                </h1>

                {/* Small decorative line */}
                <div className="flex items-center gap-2 mt-4 mb-3">
                  <span className="w-12 sm:w-16 h-[1px] bg-[#8B9D83]/60" />
                  <span className="w-1 h-1 rounded-full bg-[#8B9D83]" />
                </div>

                {/* Description */}
                <p
                  className="
                    max-w-[330px]
                    sm:max-w-[390px]
                    text-[9px]
                    sm:text-[10px]
                    lg:text-[11px]
                    leading-[1.7]
                    text-[#59655d]
                  "
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  {hero?.description ||
                    "Have questions about products, orders, or anything else? We're here to help and respond within 24 hours."}
                </p>

              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            MAIN CONTACT AREA - Green Theme
        ====================================================== */}

        <section className="relative py-8 sm:py-14 lg:py-10 bg-[#f8f7f2]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B9D83]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6b7d63]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

              {/* ==================================================
                  LEFT SIDE - Green Theme
              ================================================== */}

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeInLeft}
              >
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-0.5 bg-[#8B9D83]" />
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      Contact Information
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
                    We'd Love to Hear
                    <span className="text-[#8B9D83] font-medium"> From You</span>
                  </h2>
                </div>

                {/* Contact Cards */}
                <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                  {quickContacts?.map((info, idx) => {
                    const Icon = getIcon(info.icon);
                    return (
                      <motion.a
                        key={idx}
                        href={info.link || '#'}
                        variants={scaleUp}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="group relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border border-[#c5d5be]/60 hover:border-[#8B9D83]/40 shadow-sm hover:shadow-xl hover:shadow-[#8B9D83]/10 transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8B9D83]/0 to-[#8B9D83]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#f0f5ed] text-[#8B9D83] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B9D83] group-hover:text-white transition-all duration-300">
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-xs sm:text-sm font-medium text-[#263b32] mb-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                {info.label}
                              </h3>
                              <p className="text-[9px] sm:text-[11px] lg:text-xs text-[#53645a] leading-relaxed line-clamp-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                                {info.value}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </motion.div>

                {/* Map - Green Theme */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#c5d5be]/60 shadow-sm"
                >
                  <div className="px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between border-b border-[#c5d5be]/40">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#f0f5ed] flex items-center justify-center">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B9D83]" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
                          {map?.title || 'Find Us'}
                        </h3>
                        <p className="text-[9px] sm:text-[10px] text-[#53645a]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                          Visit our location
                        </p>
                      </div>
                    </div>
                    <a
                      href={quickContacts?.find((item) => item.icon === 'FaMapMarkerAlt')?.link || 'https://maps.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] sm:text-xs text-[#8B9D83] font-medium flex items-center gap-1 hover:gap-2 transition-all"
                      style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                    >
                      Open Map
                      <FaArrowRight className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="260"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[220px] sm:h-[260px] lg:h-[280px]"
                    title="BeautyBucket Location"
                  />
                </motion.div>
              </motion.div>

              {/* ==================================================
                  RIGHT SIDE - FORM - Green Theme
              ================================================== */}

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeInRight}
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#c5d5be]/60 shadow-xl shadow-[#8B9D83]/5 p-5 sm:p-7 lg:p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-0.5 bg-[#8B9D83]" />
                      <span className="text-xs uppercase tracking-[0.15em] text-[#8B9D83] font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                        Send a Message
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
                      {form?.title || 'Get In Touch'}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#53645a] mt-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      {form?.description || "Fill in the form and we'll get back to you within 24 hours"}
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {formStatus.submitted && formStatus.success ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-green-50 border border-green-200 rounded-2xl p-7 sm:p-10 text-center"
                      >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaCheckCircle className="text-green-600 w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                          Message Sent! ✨
                        </h3>
                        <p className="text-sm text-[#53645a] mb-5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                          {formStatus.message}
                        </p>
                        <button
                          onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                          className="text-[#8B9D83] font-medium text-sm hover:underline"
                          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                        >
                          Send Another Message →
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                            Name <span className="text-[#8B9D83]">*</span>
                          </label>
                          <div className="relative">
                            <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9D83]/40 w-3.5 h-3.5" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Your Name"
                              className="w-full pl-10 pr-4 py-3 text-sm border border-[#c5d5be]/50 rounded-xl bg-white text-[#263b32] placeholder:text-[#8B9D83] outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all"
                              style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                            />
                          </div>
                        </div>

                        {/* Email + Phone */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                              Email <span className="text-[#8B9D83]">*</span>
                            </label>
                            <div className="relative">
                              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9D83]/40 w-3.5 h-3.5" />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="info@email.com"
                                className="w-full pl-10 pr-3 py-3 text-sm border border-[#c5d5be]/50 rounded-xl bg-white text-[#263b32] placeholder:text-[#8B9D83] outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all"
                                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                              Phone <span className="text-[#8B9D83]">*</span>
                            </label>
                            <div className="relative">
                              <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9D83]/40 w-3.5 h-3.5" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="+880 1XXXXXXXXX"
                                className="w-full pl-10 pr-3 py-3 text-sm border border-[#c5d5be]/50 rounded-xl bg-white text-[#263b32] placeholder:text-[#8B9D83] outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all"
                                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="block text-xs font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                            Subject
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="e.g. Product Inquiry"
                            className="w-full px-4 py-3 text-sm border border-[#c5d5be]/50 rounded-xl bg-white text-[#263b32] placeholder:text-[#8B9D83] outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all"
                            style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-xs font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                            Message <span className="text-[#8B9D83]">*</span>
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Tell us how we can help you..."
                            className="w-full px-4 py-3 text-sm border border-[#c5d5be]/50 rounded-xl bg-white text-[#263b32] placeholder:text-[#8B9D83] outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all resize-none"
                            style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                          />
                        </div>

                        {/* Submit - Green */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#8B9D83]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <FaPaperPlane className="w-4 h-4" />
                              Send Message
                            </>
                          )}
                        </button>

                        {/* Privacy */}
                        <p className="text-center text-[10px] text-[#8B9D83]/40" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                          🔒 Your information is safe with us. We'll never share your data.
                        </p>

                        {/* Error */}
                        {formStatus.submitted && !formStatus.success && formStatus.message !== 'Sending...' && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-red-50 border border-red-200 rounded-xl text-center"
                          >
                            <p className="text-xs text-red-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                              {formStatus.message}
                            </p>
                          </motion.div>
                        )}
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ======================================================
            LET'S CONNECT SECTION - Green Theme
        ====================================================== */}

        <section className="py-8 sm:py-16 lg:py-10 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInUp}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-10 sm:w-14 h-px bg-gradient-to-r from-transparent to-[#8B9D83]" />
                <span className="text-xs sm:text-sm uppercase tracking-[0.16em] text-[#8B9D83] font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                  {leftSide?.badge || 'Beauty Bucket'}
                </span>
                <span className="w-10 sm:w-14 h-px bg-gradient-to-l from-transparent to-[#8B9D83]" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
                {leftSide?.title || "Let's Connect"}
                <span className="block sm:inline text-[#8B9D83] font-medium">
                  {' '}{leftSide?.subtitle || '& Make Beauty Happen'}
                </span>
              </h2>

              <p className="max-w-2xl mx-auto mt-4 text-xs sm:text-sm lg:text-base text-[#53645a] leading-relaxed" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                {leftSide?.description}
              </p>
            </motion.div>

            {/* Features - Green Theme */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto mt-8"
            >
              {leftSide?.features?.map((feature, idx) => {
                const Icon = getIcon(feature.icon);
                return (
                  <motion.div
                    key={idx}
                    variants={scaleUp}
                    whileHover={{ y: -5 }}
                    className="bg-[#f8f7f2] border border-[#c5d5be]/50 rounded-2xl p-5 text-center hover:border-[#8B9D83]/40 hover:shadow-lg hover:shadow-[#8B9D83]/10 transition-all duration-300"
                  >
                    <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-[#f0f5ed] text-[#8B9D83] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-medium text-[#263b32] mb-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      {feature.title}
                    </h3>
                    <p className="text-xs text-[#53645a]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-8"
            >
              <p className="text-xs text-[#53645a] mb-3" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                Follow us & stay connected
              </p>
              <div className="flex justify-center gap-2.5">
                {socialLinks?.map((social, idx) => {
                  const Icon = getSocialIcon(social.icon);
                  return (
                    <a
                      key={idx}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#c5d5be]/60 text-[#53645a] flex items-center justify-center hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.color || 'hover:bg-[#8B9D83]'}`}
                    >
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ======================================================
            CTA - Green Theme
        ====================================================== */}
        {/* ======================================================
            CTA - Left Aligned Text Design with Background Image
        ====================================================== */}

        <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0">
            {/* Background Image - Now visible */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url('${cta?.bgImage || '/images/cta-bg.jpg'}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Gradient Overlay - Made semi-transparent so image shows through */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B9D83]/35 to-[#6b7d63]/35" />
            {/* Subtle dark overlay for readability */}
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-3xl"
            >
              {/* Small badge - optional */}
              {cta?.badge && (
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-4">
                  <GiSparkles className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs sm:text-sm text-white font-medium" style={{ fontFamily: FONT_FAMILY }}>
                    {cta?.badge}
                  </span>
                </div>
              )}

              {/* Main Heading - Left Aligned */}
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-3 leading-tight" 
                style={{ fontFamily: FONT_FAMILY }}
              >
                {cta?.title || "We're Here to Help"}
              </h2>

              {/* Description - Left Aligned */}
              <p 
                className="text-xs sm:text-sm lg:text-base text-white/90 max-w-xl mb-7 leading-relaxed" 
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                {cta?.description || 'Our beauty experts are ready to assist you with any questions about products or orders.'}
              </p>

              {/* Buttons - Left Aligned */}
              <div className="flex flex-wrap gap-3">
                <a 
                  href={cta?.buttonLink || 'tel:+8801871733305'}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#8B9D83] rounded-xl text-xs sm:text-sm font-medium hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  <FaPhone className="w-3.5 h-3.5" />
                  {cta?.buttonText || 'Call Now'}
                </a>

                <Link 
                  href={cta?.secondaryButtonLink || '/products'}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-white/40 text-white rounded-xl text-xs sm:text-sm font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  {cta?.secondaryButtonText || 'Browse Products'}
                  <FaArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}