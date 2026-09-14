
// // app/privacy/PrivacyClient.js
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import {
//   FaCheckCircle,
//   FaArrowRight,
//   FaShieldAlt,
//   FaUsers,
//   FaEye,
//   FaLock,
//   FaCookie,
//   FaExclamationTriangle,
//   FaGlobe,
//   FaServer,
//   FaClock,
//   FaPrint,
//   FaListUl,
//   FaShoppingBag,
//   FaEnvelope,
//   FaPhone
// } from 'react-icons/fa';
// import { GiSparkles } from 'react-icons/gi';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Font constants
// const FONT_FAMILY = "'Courgette', cursive";
// const FONT_FAMILY_INTER = "'Inter', sans-serif";

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08, delayChildren: 0.05 },
//   },
// };

// // Icon mapping - Fixed: Using correct icon names
// const ICON_MAP = {
//   FaShieldAlt: FaShieldAlt,
//   FaShield: FaShieldAlt,
//   FaUsers: FaUsers,
//   FaEye: FaEye,
//   FaLock: FaLock,
//   FaCookie: FaCookie,
//   FaExclamationTriangle: FaExclamationTriangle,
//   FaAlertCircle: FaExclamationTriangle,
//   FaGlobe: FaGlobe,
//   FaServer: FaServer,
//   FaClock: FaClock,
// };

// const getIcon = (iconName) => {
//   const Icon = ICON_MAP[iconName];
//   return Icon || FaShieldAlt;
// };

// export default function PrivacyClient() {
//   const [privacyData, setPrivacyData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeId, setActiveId] = useState(1);

//   // Fetch privacy data from backend
//   useEffect(() => {
//     const fetchPrivacyData = async () => {
//       try {
//         setIsLoading(true);
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
//         const response = await fetch(`${apiUrl}/api/privacy`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch privacy policy: ${response.status}`);
//         }
        
//         const result = await response.json();
        
//         if (result.success && result.data) {
//           setPrivacyData(result.data);
//           if (result.data.sections && result.data.sections.length > 0) {
//             setActiveId(result.data.sections[0].id);
//           }
//         } else {
//           setPrivacyData(getDefaultData());
//         }
//       } catch (err) {
//         console.error('Error fetching privacy policy:', err);
//         setPrivacyData(getDefaultData());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPrivacyData();
//   }, []);

//   const getDefaultData = () => ({
//     heroTitle: 'Your Privacy',
//     heroSubtitle: 'Matters to Us',
//     heroDescription: 'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.',
//     heroImage: '/images/bg10.jpg',
//     ctaImage: '/images/pattern.png',
//     introText: 'Welcome to BeautyBucket. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.',
//     lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
//     quickInfo: {
//       email: 'privacy@beautybucket.com',
//       phone: '+880 1XXXXXXXXX',
//       responseTime: 'Within 24 hours'
//     },
//     sections: [
//       {
//         id: 1,
//         title: 'Information We Collect',
//         icon: 'FaUsers',
//         description: 'We collect information to provide and improve our services to you.',
//         details: [
//           'Name, email address, phone number, and shipping/billing address',
//           'Payment information (processed securely through our payment partners)',
//           'IP address, browser type, device information, and usage data',
//           'Cookies and similar tracking technologies'
//         ]
//       },
//       {
//         id: 2,
//         title: 'How We Use Your Information',
//         icon: 'FaEye',
//         description: 'Your data helps us serve you better and improve our platform.',
//         details: [
//           'Process and fulfill your orders and deliveries',
//           'Communicate with you about orders, products, and promotions',
//           'Improve our website, products, and customer service',
//           'Prevent fraud and ensure the security of our platform'
//         ]
//       },
//       {
//         id: 3,
//         title: 'Data Sharing & Disclosure',
//         icon: 'FaShieldAlt',
//         description: 'We respect your privacy and limit data sharing to trusted partners.',
//         details: [
//           'We never sell or rent your personal data to third parties',
//           'Share data with trusted service providers',
//           'May disclose data when required by law',
//           'Third-party services have their own privacy policies'
//         ]
//       },
//       {
//         id: 4,
//         title: 'Data Security',
//         icon: 'FaLock',
//         description: 'We implement industry-standard security measures to protect your data.',
//         details: [
//           'SSL encryption for all data transmission',
//           'Regular security audits and vulnerability assessments',
//           'Access controls and authentication measures',
//           'Secure data storage with industry-standard practices'
//         ]
//       },
//       {
//         id: 5,
//         title: 'Cookies & Tracking',
//         icon: 'FaCookie',
//         description: 'We use cookies to enhance your browsing experience.',
//         details: [
//           'Essential cookies for site functionality',
//           'Analytics cookies to understand user behavior',
//           'Preference cookies to remember your settings',
//           'You can manage cookie preferences in your browser settings'
//         ]
//       },
//       {
//         id: 6,
//         title: 'Your Rights',
//         icon: 'FaExclamationTriangle',
//         description: 'You have control over your personal data.',
//         details: [
//           'Access, correct, or delete your personal data',
//           'Withdraw consent for marketing communications',
//           'Request data portability',
//           'Lodge a complaint with data protection authorities'
//         ]
//       }
//     ],
//     additionalInfo: [
//       {
//         id: 1,
//         title: 'International Data Transfers',
//         icon: 'FaGlobe',
//         description: 'BeautyBucket operates primarily in Bangladesh. However, we may use service providers located in other countries. When we transfer your data internationally, we ensure that appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.'
//       },
//       {
//         id: 2,
//         title: "Children's Privacy",
//         icon: 'FaUsers',
//         description: 'Our services are not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal data, please contact us immediately.'
//       },
//       {
//         id: 3,
//         title: 'Updates to This Policy',
//         icon: 'FaClock',
//         description: 'We may update this Privacy Policy periodically. The latest version will always be posted on this page with the effective date. We encourage you to review this policy regularly.'
//       }
//     ]
//   });

//   // Track which section is in view to highlight the sidebar TOC
//   useEffect(() => {
//     if (!privacyData?.sections) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const id = entry.target.getAttribute('data-section-id');
//             if (id) setActiveId(Number(id));
//           }
//         });
//       },
//       { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
//     );

//     privacyData.sections.forEach((section) => {
//       const el = document.getElementById(`section-${section.id}`);
//       if (el) observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, [privacyData]);

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white flex items-center justify-center -mt-20">
//           <div className="text-center">
//             <div className="inline-block w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-500 mt-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Loading privacy policy...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const data = privacyData || getDefaultData();
//   const { heroTitle, heroSubtitle, heroDescription, heroImage, ctaImage, introText, sections, additionalInfo, lastUpdated, quickInfo } = data;

//   const quickInfoItems = [
//     {
//       icon: <FaEnvelope className="w-4 h-4" />,
//       label: "Privacy Email",
//       value: quickInfo?.email || 'privacy@beautybucket.com',
//       link: `mailto:${quickInfo?.email || 'privacy@beautybucket.com'}`
//     },
//     {
//       icon: <FaPhone className="w-4 h-4" />,
//       label: "Privacy Hotline",
//       value: quickInfo?.phone || '+880 1XXXXXXXXX',
//       link: `tel:${quickInfo?.phone?.replace(/\s/g, '') || '+8801XXXXXXXXX'}`
//     },
//     {
//       icon: <FaClock className="w-4 h-4" />,
//       label: "Response Time",
//       value: quickInfo?.responseTime || 'Within 24 hours'
//     }
//   ];

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen bg-white -mt-20">
//         {/* Hero Section - With Background Image from Backend */}
//         <section className="relative overflow-hidden pt-28 pb-14">
//           {/* Background Image */}
//           <div className="absolute inset-0 z-0">
//             <div 
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//               style={{
//                 backgroundImage: `url('${heroImage || '/images/bg10.jpg'}')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//             ></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-[#1A0E14]/88 via-[#1A0E14]/78 to-[#1A0E14]/68"></div>
//             <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/8 via-transparent to-[#FF6B9D]/8"></div>
//             <div className="absolute top-0 right-0 w-72 h-72 bg-[#EE4275]/10 rounded-full filter blur-3xl"></div>
//             <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6B9D]/10 rounded-full filter blur-3xl"></div>
//           </div>

//           <div className="container mx-auto px-4 relative z-10 -mt-8">
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={fadeInUp}
//               className="max-w-3xl"
//             >
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EE4275]/20 backdrop-blur-sm rounded-full text-[#FF6B9D] text-sm font-medium mb-4 border border-[#EE4275]/20">
//                 <GiSparkles className="w-4 h-4" />
//                 <span style={{ fontFamily: FONT_FAMILY }}>Privacy Policy</span>
//               </div>
//               <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: FONT_FAMILY }}>
//                 {heroTitle || 'Your Privacy'}
//                 <br />
//                 <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
//                   {heroSubtitle || 'Matters to Us'}
//                 </span>
//               </h1>
//               <p className="text-white/70 leading-relaxed max-w-xl text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                 {heroDescription || 'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.'}
//               </p>
            
//             </motion.div>
//           </div>
//         </section>

//         {/* Body */}
//         <section className="py-12 lg:py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
//               {/* Sidebar TOC - Shows serial numbers based on order */}
//               <aside className="hidden lg:block">
//                 <div className="sticky top-28">
//                   <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D1B2E] mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                     <FaListUl className="w-3.5 h-3.5 text-[#EE4275]" />
//                     On this page
//                   </div>
//                   <nav className="space-y-1 border-l border-[#EFE6E9]">
//                     {sections && sections.map((section, index) => {
//                       // Use the actual index + 1 as the serial number based on order
//                       const serialNumber = index + 1;
//                       return (
//                         <a
//                           key={section.id}
//                           href={`#section-${section.id}`}
//                           className={`block pl-4 pr-2 py-1.5 -ml-px border-l text-sm transition-colors ${
//                             activeId === section.id
//                               ? 'border-[#EE4275] text-[#EE4275] font-medium'
//                               : 'border-transparent text-[#8B7A8C] hover:text-[#2D1B2E]'
//                           }`}
//                           style={{ fontFamily: FONT_FAMILY_INTER }}
//                         >
//                           {String(serialNumber).padStart(2, '0')}. {section.title}
//                         </a>
//                       );
//                     })}
//                   </nav>

                 
//                 </div>
//               </aside>

//               {/* Content */}
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 variants={staggerContainer}
//               >
//                 <motion.p
//                   variants={fadeInUp}
//                   className="text-[#5B4B5C] leading-relaxed text-sm lg:text-base pb-8 mb-8 border-b border-[#EFE6E9]" style={{ fontFamily: FONT_FAMILY_INTER }}
//                 >
//                   {introText || 'Welcome to BeautyBucket. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.'}
//                 </motion.p>

//                 {sections && sections.map((section, index) => {
//                   const Icon = getIcon(section.icon);
//                   // Use the actual index + 1 as the serial number based on order
//                   const serialNumber = index + 1;
//                   return (
//                     <motion.div
//                       key={section.id}
//                       variants={fadeInUp}
//                       id={`section-${section.id}`}
//                       data-section-id={section.id}
//                       className="mb-10 lg:mb-12 scroll-mt-28"
//                     >
//                       <div className="flex items-start gap-4 mb-4">
//                         <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#EFE6E9] bg-[#FCF7F8] text-[#EE4275] flex-shrink-0 text-xs font-semibold" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                           {String(serialNumber).padStart(2, '0')}
//                         </div>
//                         <div className="flex-1 pt-1">
//                           <h2 className="text-lg lg:text-xl font-bold text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                             {section.title}
//                           </h2>
//                         </div>
//                       </div>

//                       <div className="pl-13 lg:pl-13">
//                         <p className="text-sm lg:text-base text-[#5B4B5C] leading-relaxed mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                           {section.description}
//                         </p>

//                         <ul className="space-y-2.5">
//                           {section.details && section.details.map((detail, idx) => (
//                             <li
//                               key={idx}
//                               className="flex items-start gap-2.5 text-sm text-[#2D1B2E] leading-relaxed" style={{ fontFamily: FONT_FAMILY_INTER }}
//                             >
//                               <FaCheckCircle className="w-3.5 h-3.5 text-[#EE4275] mt-0.5 flex-shrink-0" />
//                               <span>{detail}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div className="mt-8 border-t border-[#F5EEF0]" />
//                     </motion.div>
//                   );
//                 })}

//                 {/* Quick Contact Info */}
//                 <motion.div
//                   variants={fadeInUp}
//                   className="bg-[#FCF7F8] rounded-xl p-6 lg:p-8 border border-[#EFE6E9] mt-4"
//                 >
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
//                     <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>Get in Touch</span>
//                   </div>
//                   <h3 className="text-lg lg:text-xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                     Have Questions About Your Privacy?
//                   </h3>
//                   <p className="text-sm text-[#5B4B5C] mb-6" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                     Our privacy team is ready to assist you with any questions or concerns.
//                   </p>

//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     {quickInfoItems.map((item, idx) => (
//                       <div key={idx} className="bg-white rounded-lg p-4 border border-[#EFE6E9] text-center">
//                         <div className="w-10 h-10 rounded-full bg-[#EE4275]/10 flex items-center justify-center mx-auto mb-2">
//                           <span className="text-[#EE4275]">{item.icon}</span>
//                         </div>
//                         <p className="text-[10px] font-medium text-[#8B7A8C] uppercase tracking-wider mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                           {item.label}
//                         </p>
//                         {item.link ? (
//                           <a href={item.link} className="text-sm text-[#EE4275] hover:text-[#c22f5c] font-semibold transition-colors" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                             {item.value}
//                           </a>
//                         ) : (
//                           <p className="text-sm text-[#2D1B2E] font-semibold" style={{ fontFamily: FONT_FAMILY_INTER }}>{item.value}</p>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-6 text-center">
//                     <Link href="/contact">
//                       <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#EE4275] hover:bg-[#c22f5c] text-white rounded-lg transition-colors font-medium text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                         Send Privacy Inquiry
//                         <FaArrowRight className="w-3.5 h-3.5" />
//                       </button>
//                     </Link>
//                   </div>
//                 </motion.div>

//                 {/* Important Notice */}
//                 <motion.div
//                   variants={fadeInUp}
//                   className="bg-[#FCF7F8] rounded-xl p-6 lg:p-8 border border-[#EFE6E9] mt-4"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#EE4275]/10 flex-shrink-0">
//                       <FaExclamationTriangle className="w-4 h-4 text-[#EE4275]" />
//                     </div>
//                     <div>
//                       <h3 className="text-base font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                         Important Notice
//                       </h3>
//                       <p className="text-sm text-[#5B4B5C] leading-relaxed" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                         This Privacy Policy is a legal agreement between you and BeautyBucket. By using our Platform, 
//                         you acknowledge that you have read, understood, and agree to the practices described in this policy.
//                       </p>
//                       <div className="flex flex-wrap gap-5 mt-4">
//                         <Link
//                           href="/contact"
//                           className="inline-flex items-center gap-1.5 text-[#EE4275] hover:text-[#c22f5c] font-medium text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}
//                         >
//                           Contact Us
//                           <FaArrowRight className="w-3 h-3" />
//                         </Link>
//                         <Link
//                           href="/terms"
//                           className="inline-flex items-center gap-1.5 text-[#EE4275] hover:text-[#c22f5c] font-medium text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}
//                         >
//                           Terms & Conditions
//                           <FaArrowRight className="w-3 h-3" />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section - With Background Image from Backend */}
//         <section className="relative py-14 lg:py-16 overflow-hidden">
//           <div 
//             className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//             style={{
//               backgroundImage: `url('${ctaImage || '/images/pattern.png'}')`,
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
//               <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <GiSparkles className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4" style={{ fontFamily: FONT_FAMILY }}>
//                 Your Privacy is Our Priority
//               </h2>
//               <p className="text-white/80 text-sm lg:text-base mb-8" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                 Have questions about how we handle your data? Our team is here to help.
//               </p>
//               <div className="flex flex-wrap gap-4 justify-center">
//                 <Link href="/contact">
//                   <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 bg-white text-[#EE4275] rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all font-medium hover:-translate-y-0.5 text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                     Contact Privacy Team
//                     <FaArrowRight className="w-4 h-4" />
//                   </button>
//                 </Link>
//                 <Link href="/products">
//                   <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium hover:-translate-y-0.5 text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                     <FaShoppingBag className="w-4 h-4" />
//                     Browse Products
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

// app/privacy/PrivacyClient.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaUsers,
  FaEye,
  FaLock,
  FaCookie,
  FaExclamationTriangle,
  FaGlobe,
  FaServer,
  FaClock,
  FaPrint,
  FaListUl,
  FaShoppingBag,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Font constants - Beauty Bucket Theme
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// Icon mapping
const ICON_MAP = {
  FaShieldAlt: FaShieldAlt,
  FaShield: FaShieldAlt,
  FaUsers: FaUsers,
  FaEye: FaEye,
  FaLock: FaLock,
  FaCookie: FaCookie,
  FaExclamationTriangle: FaExclamationTriangle,
  FaAlertCircle: FaExclamationTriangle,
  FaGlobe: FaGlobe,
  FaServer: FaServer,
  FaClock: FaClock,
};

const getIcon = (iconName) => {
  const Icon = ICON_MAP[iconName];
  return Icon || FaShieldAlt;
};

export default function PrivacyClient() {
  const [privacyData, setPrivacyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState(1);

  // Fetch privacy data from backend
  useEffect(() => {
    const fetchPrivacyData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${apiUrl}/api/privacy`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch privacy policy: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setPrivacyData(result.data);
          if (result.data.sections && result.data.sections.length > 0) {
            setActiveId(result.data.sections[0].id);
          }
        } else {
          setPrivacyData(getDefaultData());
        }
      } catch (err) {
        console.error('Error fetching privacy policy:', err);
        setPrivacyData(getDefaultData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrivacyData();
  }, []);

  const getDefaultData = () => ({
    heroTitle: 'Your Privacy',
    heroSubtitle: 'Matters to Us',
    heroDescription: 'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.',
    heroImage: '/images/bg10.jpg',
    ctaImage: '/images/pattern.png',
    introText: 'Welcome to BeautyBucket. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.',
    lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    quickInfo: {
      email: 'privacy@beautybucket.com',
      phone: '+880 1XXXXXXXXX',
      responseTime: 'Within 24 hours'
    },
    sections: [
      {
        id: 1,
        title: 'Information We Collect',
        icon: 'FaUsers',
        description: 'We collect information to provide and improve our services to you.',
        details: [
          'Name, email address, phone number, and shipping/billing address',
          'Payment information (processed securely through our payment partners)',
          'IP address, browser type, device information, and usage data',
          'Cookies and similar tracking technologies'
        ]
      },
      {
        id: 2,
        title: 'How We Use Your Information',
        icon: 'FaEye',
        description: 'Your data helps us serve you better and improve our platform.',
        details: [
          'Process and fulfill your orders and deliveries',
          'Communicate with you about orders, products, and promotions',
          'Improve our website, products, and customer service',
          'Prevent fraud and ensure the security of our platform'
        ]
      },
      {
        id: 3,
        title: 'Data Sharing & Disclosure',
        icon: 'FaShieldAlt',
        description: 'We respect your privacy and limit data sharing to trusted partners.',
        details: [
          'We never sell or rent your personal data to third parties',
          'Share data with trusted service providers',
          'May disclose data when required by law',
          'Third-party services have their own privacy policies'
        ]
      },
      {
        id: 4,
        title: 'Data Security',
        icon: 'FaLock',
        description: 'We implement industry-standard security measures to protect your data.',
        details: [
          'SSL encryption for all data transmission',
          'Regular security audits and vulnerability assessments',
          'Access controls and authentication measures',
          'Secure data storage with industry-standard practices'
        ]
      },
      {
        id: 5,
        title: 'Cookies & Tracking',
        icon: 'FaCookie',
        description: 'We use cookies to enhance your browsing experience.',
        details: [
          'Essential cookies for site functionality',
          'Analytics cookies to understand user behavior',
          'Preference cookies to remember your settings',
          'You can manage cookie preferences in your browser settings'
        ]
      },
      {
        id: 6,
        title: 'Your Rights',
        icon: 'FaExclamationTriangle',
        description: 'You have control over your personal data.',
        details: [
          'Access, correct, or delete your personal data',
          'Withdraw consent for marketing communications',
          'Request data portability',
          'Lodge a complaint with data protection authorities'
        ]
      }
    ],
    additionalInfo: [
      {
        id: 1,
        title: 'International Data Transfers',
        icon: 'FaGlobe',
        description: 'BeautyBucket operates primarily in Bangladesh. However, we may use service providers located in other countries. When we transfer your data internationally, we ensure that appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.'
      },
      {
        id: 2,
        title: "Children's Privacy",
        icon: 'FaUsers',
        description: 'Our services are not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal data, please contact us immediately.'
      },
      {
        id: 3,
        title: 'Updates to This Policy',
        icon: 'FaClock',
        description: 'We may update this Privacy Policy periodically. The latest version will always be posted on this page with the effective date. We encourage you to review this policy regularly.'
      }
    ]
  });

  // Track which section is in view to highlight the sidebar TOC
  useEffect(() => {
    if (!privacyData?.sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id');
            if (id) setActiveId(Number(id));
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    privacyData.sections.forEach((section) => {
      const el = document.getElementById(`section-${section.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [privacyData]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f8f7f2] flex items-center justify-center -mt-20">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#53645a] mt-2" style={{ fontFamily: FONT_FAMILY }}>Loading privacy policy...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const data = privacyData || getDefaultData();
  const { heroTitle, heroSubtitle, heroDescription, heroImage, ctaImage, introText, sections, additionalInfo, lastUpdated, quickInfo } = data;

  const quickInfoItems = [
    {
      icon: <FaEnvelope className="w-4 h-4" />,
      label: "Privacy Email",
      value: quickInfo?.email || 'privacy@beautybucket.com',
      link: `mailto:${quickInfo?.email || 'privacy@beautybucket.com'}`
    },
    {
      icon: <FaPhone className="w-4 h-4" />,
      label: "Privacy Hotline",
      value: quickInfo?.phone || '+880 1XXXXXXXXX',
      link: `tel:${quickInfo?.phone?.replace(/\s/g, '') || '+8801XXXXXXXXX'}`
    },
    {
      icon: <FaClock className="w-4 h-4" />,
      label: "Response Time",
      value: quickInfo?.responseTime || 'Within 24 hours'
    }
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f7f2] -mt-20">

        {/* ======================================================
            HERO - Cream/Beige Overlay (Matching ContactClient)
        ====================================================== */}

      <section className="relative min-h-[200px] sm:min-h-[200px] lg:min-h-[250px] overflow-hidden bg-[#f3eee7]">
  <div className="absolute inset-0 z-0">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${heroImage || '/images/bg10.jpg'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />

    {/* Cream/Beige overlay - Matching ContactClient */}
    <div className="absolute inset-0 bg-[#f3eee7]/65" />

    {/* Left side readability gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#f3eee7]/55 via-[#f3eee7]/25 to-transparent" />

    {/* Very subtle right fade */}
    <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent to-[#f3eee7]/10" />
  </div>

  {/* Decorative soft shapes */}
  <div className="absolute -left-20 -top-20 w-56 h-56 rounded-full bg-white/30 blur-3xl" />
  <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-[#c9bca8]/10 blur-3xl" />

  <div className="container mx-auto px-4 relative z-10">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="max-w-3xl py-10 sm:py-12 lg:py-14"
    >
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="w-7 sm:w-9 h-px bg-[#8B9D83]" />
        <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#68776b]" style={{ fontFamily: FONT_FAMILY }}>
          Privacy Policy
        </span>
      </div>

      <h1 className="text-[32px] leading-[0.98] sm:text-[40px] sm:leading-[1] lg:text-[50px] lg:leading-[1] font-normal text-[#263b32] tracking-[-0.025em]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
        {heroTitle || 'Your Privacy'}
        <span className="block text-[#789072] font-normal">
          {heroSubtitle || 'Matters to Us'}
        </span>
      </h1>

      <div className="flex items-center gap-2 mt-4 mb-3">
        <span className="w-12 sm:w-16 h-[1px] bg-[#8B9D83]/60" />
        <span className="w-1 h-1 rounded-full bg-[#8B9D83]" />
      </div>

      <p className="max-w-[330px] sm:max-w-[390px] text-[9px] sm:text-[10px] lg:text-[11px] leading-[1.7] text-[#59655d]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
        {heroDescription || 'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.'}
      </p>
    </motion.div>
  </div>
</section>

        {/* ======================================================
            BODY - Green Theme
        ====================================================== */}

        <section className="py-12 lg:py-16 bg-[#f8f7f2]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
              {/* Sidebar TOC - Green Theme */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#263b32] mb-4" style={{ fontFamily: FONT_FAMILY }}>
                    <FaListUl className="w-3.5 h-3.5 text-[#8B9D83]" />
                    On this page
                  </div>
                  <nav className="space-y-1 border-l border-[#c5d5be]">
                    {sections && sections.map((section, index) => {
                      const serialNumber = index + 1;
                      return (
                        <a
                          key={section.id}
                          href={`#section-${section.id}`}
                          className={`block pl-4 pr-2 py-1.5 -ml-px border-l text-sm transition-colors ${
                            activeId === section.id
                              ? 'border-[#8B9D83] text-[#8B9D83] font-medium'
                              : 'border-transparent text-[#53645a] hover:text-[#263b32]'
                          }`}
                          style={{ fontFamily: FONT_FAMILY }}
                        >
                          {String(serialNumber).padStart(2, '0')}. {section.title}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              {/* Content - Green Theme */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-[#53645a] leading-relaxed text-sm lg:text-base pb-8 mb-8 border-b border-[#c5d5be]" style={{ fontFamily: FONT_FAMILY }}
                >
                  {introText || 'Welcome to BeautyBucket. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.'}
                </motion.p>

                {sections && sections.map((section, index) => {
                  const Icon = getIcon(section.icon);
                  const serialNumber = index + 1;
                  return (
                    <motion.div
                      key={section.id}
                      variants={fadeInUp}
                      id={`section-${section.id}`}
                      data-section-id={section.id}
                      className="mb-10 lg:mb-12 scroll-mt-28"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#c5d5be] bg-[#f0f5ed] text-[#8B9D83] flex-shrink-0 text-xs font-medium" style={{ fontFamily: FONT_FAMILY }}>
                          {String(serialNumber).padStart(2, '0')}
                        </div>
                        <div className="flex-1 pt-1">
                          <h2 className="text-lg lg:text-xl font-light text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      <div className="pl-13 lg:pl-13">
                        <p className="text-sm lg:text-base text-[#53645a] leading-relaxed mb-4" style={{ fontFamily: FONT_FAMILY }}>
                          {section.description}
                        </p>

                        <ul className="space-y-2.5">
                          {section.details && section.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-sm text-[#263b32] leading-relaxed" style={{ fontFamily: FONT_FAMILY }}
                            >
                              <FaCheckCircle className="w-3.5 h-3.5 text-[#8B9D83] mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 border-t border-[#c5d5be]" />
                    </motion.div>
                  );
                })}

                {/* Quick Contact Info - Green Theme */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-[#f0f5ed] rounded-xl p-6 lg:p-8 border border-[#c5d5be] mt-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-10 h-0.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63]" />
                    <span className="text-sm font-medium text-[#8B9D83] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>Get in Touch</span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                    Have Questions About Your Privacy?
                  </h3>
                  <p className="text-sm text-[#53645a] mb-6" style={{ fontFamily: FONT_FAMILY }}>
                    Our privacy team is ready to assist you with any questions or concerns.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickInfoItems.map((item, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 border border-[#c5d5be] text-center">
                        <div className="w-10 h-10 rounded-full bg-[#8B9D83]/10 flex items-center justify-center mx-auto mb-2">
                          <span className="text-[#8B9D83]">{item.icon}</span>
                        </div>
                        <p className="text-[10px] font-medium text-[#53645a] uppercase tracking-wider mb-1" style={{ fontFamily: FONT_FAMILY }}>
                          {item.label}
                        </p>
                        {item.link ? (
                          <a href={item.link} className="text-sm text-[#8B9D83] hover:text-[#6b7d63] font-semibold transition-colors" style={{ fontFamily: FONT_FAMILY }}>
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-[#263b32] font-semibold" style={{ fontFamily: FONT_FAMILY }}>{item.value}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Link href="/contact">
                      <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#8B9D83] hover:bg-[#6b7d63] text-white rounded-lg transition-colors font-medium text-sm" style={{ fontFamily: FONT_FAMILY }}>
                        Send Privacy Inquiry
                        <FaArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </motion.div>

                {/* Important Notice - Green Theme */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-[#f0f5ed] rounded-xl p-6 lg:p-8 border border-[#c5d5be] mt-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#8B9D83]/10 flex-shrink-0">
                      <FaExclamationTriangle className="w-4 h-4 text-[#8B9D83]" />
                    </div>
                    <div>
                      <h3 className="text-base font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                        Important Notice
                      </h3>
                      <p className="text-sm text-[#53645a] leading-relaxed" style={{ fontFamily: FONT_FAMILY }}>
                        This Privacy Policy is a legal agreement between you and BeautyBucket. By using our Platform, 
                        you acknowledge that you have read, understood, and agree to the practices described in this policy.
                      </p>
                      <div className="flex flex-wrap gap-5 mt-4">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-[#8B9D83] hover:text-[#6b7d63] font-medium text-sm" style={{ fontFamily: FONT_FAMILY }}
                        >
                          Contact Us
                          <FaArrowRight className="w-3 h-3" />
                        </Link>
                        <Link
                          href="/terms"
                          className="inline-flex items-center gap-1.5 text-[#8B9D83] hover:text-[#6b7d63] font-medium text-sm" style={{ fontFamily: FONT_FAMILY }}
                        >
                          Terms & Conditions
                          <FaArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            CTA - Left Aligned with Background Image & Cream Overlay
        ====================================================== */}

        <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url('${ctaImage || '/images/pattern.png'}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-[#f3eee7]/65" />
            <div className="absolute inset-0 bg-[#8B9D83]/8" />
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#c9bca8]/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 bg-[#8B9D83]/15 backdrop-blur-md border border-[#8B9D83]/20 rounded-full px-4 py-1.5 mb-4">
                <GiSparkles className="w-3.5 h-3.5 text-[#8B9D83]" />
                <span className="text-xs sm:text-sm text-[#263b32] font-medium" style={{ fontFamily: FONT_FAMILY }}>
                  Still Have Questions?
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-[#263b32] mb-3 leading-tight" style={{ fontFamily: FONT_FAMILY }}>
                Your Privacy is Our Priority
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-[#53645a] max-w-xl mb-7 leading-relaxed" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                Have questions about how we handle your data? Our team is here to help.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#8B9D83] text-white rounded-xl text-xs sm:text-sm font-medium hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    Contact Privacy Team
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
                <Link href="/products">
                  <button className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-[#8B9D83]/40 text-[#263b32] rounded-xl text-xs sm:text-sm font-medium hover:bg-[#8B9D83]/10 hover:-translate-y-0.5 transition-all duration-300" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    <FaShoppingBag className="w-3.5 h-3.5" />
                    Browse Products
                  </button>
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