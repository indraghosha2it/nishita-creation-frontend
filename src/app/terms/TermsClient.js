

// // app/terms/page.js
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import {
//   FaCheckCircle,
//   FaArrowRight,
//   FaFileContract,
//   FaUserShield,
//   FaCreditCard,
//   FaTruck,
//   FaShoppingBag,
//   FaHands,
//   FaLock,
//   FaExclamationTriangle,
//   FaBalanceScale,
//   FaPrint,
//   FaListUl,
//   FaHeart,
//   FaSparkles
// } from 'react-icons/fa';
// import { GiSparkles } from 'react-icons/gi';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Font constants
// const FONT_FAMILY = "'Courgette', cursive";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";
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

// // Icon mapping
// const ICON_MAP = {
//   FaFileContract: FaFileContract,
//   FaShoppingBag: FaShoppingBag,
//   FaCreditCard: FaCreditCard,
//   FaTruck: FaTruck,
//   FaHands: FaHands,
//   FaUserShield: FaUserShield,
//   FaLock: FaLock,
//   FaBalanceScale: FaBalanceScale,
//   FaExclamationTriangle: FaExclamationTriangle,
// };

// const getIcon = (iconName) => {
//   const Icon = ICON_MAP[iconName];
//   return Icon || FaFileContract;
// };

// export default function TermsPage() {
//   const [termsData, setTermsData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeId, setActiveId] = useState(1);

//   // Fetch terms data from backend
//   useEffect(() => {
//     const fetchTermsData = async () => {
//       try {
//         setIsLoading(true);
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
//         const response = await fetch(`${apiUrl}/api/terms`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch terms: ${response.status}`);
//         }
        
//         const result = await response.json();
        
//         if (result.success && result.data) {
//           setTermsData(result.data);
//           if (result.data.sections && result.data.sections.length > 0) {
//             setActiveId(result.data.sections[0].id);
//           }
//         } else {
//           setTermsData(getDefaultData());
//         }
//       } catch (err) {
//         console.error('Error fetching terms:', err);
//         setTermsData(getDefaultData());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTermsData();
//   }, []);

//   const getDefaultData = () => ({
//     heroTitle: 'Terms & Conditions',
//     heroDescription: 'Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.',
//     introText: 'Welcome to BeautyBucket. These Terms & Conditions ("Terms") govern your use of the BeautyBucket website, mobile application, and all related services (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Platform.',
//     heroImage: '/images/bg10.jpg',
//     ctaImage: '/images/pattern.png',
//     lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
//     sections: [
//       {
//         id: 1,
//         title: 'Acceptance of Terms',
//         icon: 'FaFileContract',
//         description: 'By using BeautyBucket\'s website and services, you agree to comply with and be bound by these Terms & Conditions.',
//         details: [
//           'These terms apply to all users of the BeautyBucket platform',
//           'By placing an order, you accept these terms in full',
//           'We reserve the right to update these terms at any time',
//           'Continued use constitutes acceptance of updated terms'
//         ]
//       },
//       // ... more default sections
//     ]
//   });

//   // Track which section is in view to highlight the sidebar TOC
//   useEffect(() => {
//     if (!termsData?.sections) return;

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

//     termsData.sections.forEach((section) => {
//       const el = document.getElementById(`section-${section.id}`);
//       if (el) observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, [termsData]);

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white flex items-center justify-center -mt-20">
//           <div className="text-center">
//             <div className="inline-block w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-500 mt-2" style={{ fontFamily: FONT_FAMILY_INTER }}>Loading terms...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const data = termsData || getDefaultData();
//   const { heroTitle, heroDescription, introText, heroImage, ctaImage, sections, lastUpdated } = data;

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
//                 <span style={{ fontFamily: FONT_FAMILY }}>Legal Agreement</span>
//               </div>
//               <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: FONT_FAMILY }}>
//                 {heroTitle || 'Terms & Conditions'}
//               </h1>
//               <p className="text-white/70 leading-relaxed max-w-xl text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                 {heroDescription || 'Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.'}
//               </p>
            
//             </motion.div>
//           </div>
//         </section>

//         {/* Body */}
//         <section className="py-12 lg:py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
//               {/* Sidebar TOC */}
//               <aside className="hidden lg:block">
//                 <div className="sticky top-28">
//                   <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D1B2E] mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                     <FaListUl className="w-3.5 h-3.5 text-[#EE4275]" />
//                     On this page
//                   </div>
//                   <nav className="space-y-1 border-l border-[#EFE6E9]">
//                     {sections && sections.map((section) => (
//                       <a
//                         key={section.id}
//                         href={`#section-${section.id}`}
//                         className={`block pl-4 pr-2 py-1.5 -ml-px border-l text-sm transition-colors ${
//                           activeId === section.id
//                             ? 'border-[#EE4275] text-[#EE4275] font-medium'
//                             : 'border-transparent text-[#8B7A8C] hover:text-[#2D1B2E]'
//                         }`}
//                         style={{ fontFamily: FONT_FAMILY_INTER }}
//                       >
//                         {String(section.id).padStart(2, '0')}. {section.title}
//                       </a>
//                     ))}
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
//                   {introText || 'Welcome to BeautyBucket. These Terms & Conditions govern your use of our website and services.'}
//                 </motion.p>

//                 {sections && sections.map((section) => {
//                   const Icon = getIcon(section.icon);
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
//                           {String(section.id).padStart(2, '0')}
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
//                         These Terms & Conditions are a legal agreement between you and BeautyBucket.
//                         By using our Platform, you acknowledge that you have read, understood, and agree
//                         to be bound by these Terms. If you have any questions, please contact our support team.
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
//                           href="/privacy"
//                           className="inline-flex items-center gap-1.5 text-[#EE4275] hover:text-[#c22f5c] font-medium text-sm" style={{ fontFamily: FONT_FAMILY_INTER }}
//                         >
//                           Privacy Policy
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
//                 Have Questions About Our Terms?
//               </h2>
//               <p className="text-white/80 text-sm lg:text-base mb-8" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                 Our team is here to help you understand our policies and ensure your experience is seamless.
//               </p>
//               <div className="flex flex-wrap gap-4 justify-center">
//                 <Link href="/contact">
//                   <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 bg-white text-[#EE4275] rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all font-medium hover:-translate-y-0.5 text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                     Contact Support
//                     <FaArrowRight className="w-4 h-4" />
//                   </button>
//                 </Link>
//                 <Link href="/products">
//                   <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium hover:-translate-y-0.5 text-sm lg:text-base" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                     <FaShoppingBag className="w-4 h-4" />
//                     Start Shopping
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


// app/terms/page.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaArrowRight,
  FaFileContract,
  FaUserShield,
  FaCreditCard,
  FaTruck,
  FaShoppingBag,
  FaHands,
  FaLock,
  FaExclamationTriangle,
  FaBalanceScale,
  FaPrint,
  FaListUl,
  FaHeart,
  FaSparkles
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Font constants - Same as Contact page
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
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
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// Icon mapping
const ICON_MAP = {
  FaFileContract: FaFileContract,
  FaShoppingBag: FaShoppingBag,
  FaCreditCard: FaCreditCard,
  FaTruck: FaTruck,
  FaHands: FaHands,
  FaUserShield: FaUserShield,
  FaLock: FaLock,
  FaBalanceScale: FaBalanceScale,
  FaExclamationTriangle: FaExclamationTriangle,
};

const getIcon = (iconName) => {
  const Icon = ICON_MAP[iconName];
  return Icon || FaFileContract;
};

export default function TermsPage() {
  const [termsData, setTermsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState(1);

  // Fetch terms data from backend
  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${apiUrl}/api/terms`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch terms: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setTermsData(result.data);
          if (result.data.sections && result.data.sections.length > 0) {
            setActiveId(result.data.sections[0].id);
          }
        } else {
          setTermsData(getDefaultData());
        }
      } catch (err) {
        console.error('Error fetching terms:', err);
        setTermsData(getDefaultData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchTermsData();
  }, []);

  const getDefaultData = () => ({
    heroTitle: 'Terms & Conditions',
    heroDescription: 'Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.',
    introText: 'Welcome to BeautyBucket. These Terms & Conditions ("Terms") govern your use of the BeautyBucket website, mobile application, and all related services (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Platform.',
    heroImage: '/images/bg10.jpg',
    ctaImage: '/images/pattern.png',
    lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    sections: [
      {
        id: 1,
        title: 'Acceptance of Terms',
        icon: 'FaFileContract',
        description: 'By using BeautyBucket\'s website and services, you agree to comply with and be bound by these Terms & Conditions.',
        details: [
          'These terms apply to all users of the BeautyBucket platform',
          'By placing an order, you accept these terms in full',
          'We reserve the right to update these terms at any time',
          'Continued use constitutes acceptance of updated terms'
        ]
      },
      {
        id: 2,
        title: 'User Accounts',
        icon: 'FaUserShield',
        description: 'To access certain features of our Platform, you may be required to create a user account.',
        details: [
          'You are responsible for maintaining the confidentiality of your account credentials',
          'You agree to provide accurate and complete information when creating your account',
          'You are solely responsible for all activities that occur under your account',
          'We reserve the right to suspend or terminate accounts that violate these terms'
        ]
      },
      {
        id: 3,
        title: 'Product Information & Pricing',
        icon: 'FaShoppingBag',
        description: 'We strive to provide accurate product descriptions, images, and pricing information on our Platform.',
        details: [
          'Product images are for illustrative purposes and may vary from actual products',
          'Prices are subject to change without prior notice',
          'We reserve the right to correct any errors in pricing or product information',
          'All products are subject to availability'
        ]
      },
      {
        id: 4,
        title: 'Payments & Transactions',
        icon: 'FaCreditCard',
        description: 'All payments made through our Platform are processed securely through our trusted payment partners.',
        details: [
          'We accept various payment methods including credit/debit cards and mobile payments',
          'All transactions are processed in BDT (Bangladeshi Taka)',
          'You agree to pay all charges incurred under your account',
          'We use SSL encryption to protect your payment information'
        ]
      },
      {
        id: 5,
        title: 'Shipping & Delivery',
        icon: 'FaTruck',
        description: 'We are committed to delivering your orders in a timely and efficient manner.',
        details: [
          'Delivery times are estimated and may vary based on location',
          'You will receive a tracking number once your order is shipped',
          'We are not responsible for delays caused by courier services or customs',
          'Please ensure your delivery address is accurate and complete'
        ]
      },
      {
        id: 6,
        title: 'Returns & Refunds',
        icon: 'FaHands',
        description: 'Your satisfaction is our priority. We offer a transparent returns and refunds policy.',
        details: [
          'Returns are accepted within 7 days of delivery with original packaging',
          'Products must be unused and in original condition',
          'Refunds will be processed within 5-7 business days',
          'Shipping charges are non-refundable'
        ]
      },
      {
        id: 7,
        title: 'Intellectual Property',
        icon: 'FaBalanceScale',
        description: 'All content on our Platform is protected by copyright, trademark, and other intellectual property laws.',
        details: [
          'All content including text, images, logos, and designs are owned by BeautyBucket',
          'You may not reproduce, distribute, or create derivative works without permission',
          'Trademarks and logos may not be used without prior written consent',
          'Unauthorized use of our intellectual property will result in legal action'
        ]
      },
      {
        id: 8,
        title: 'Limitation of Liability',
        icon: 'FaExclamationTriangle',
        description: 'BeautyBucket provides the Platform and services "as is" without warranties of any kind.',
        details: [
          'We are not liable for any indirect, incidental, or consequential damages',
          'Our liability is limited to the purchase price of the product',
          'We do not guarantee that the Platform will be uninterrupted or error-free',
          'You use the Platform at your own risk'
        ]
      },
      {
        id: 9,
        title: 'Governing Law',
        icon: 'FaBalanceScale',
        description: 'These Terms are governed by and construed in accordance with the laws of Bangladesh.',
        details: [
          'Any disputes shall be subject to the exclusive jurisdiction of Dhaka courts',
          'Bangladesh laws shall apply to all matters relating to these terms',
          'If any provision is found to be invalid, the remaining provisions remain in effect',
          'These terms constitute the entire agreement between you and BeautyBucket'
        ]
      }
    ]
  });

  // Track which section is in view to highlight the sidebar TOC
  useEffect(() => {
    if (!termsData?.sections) return;

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

    termsData.sections.forEach((section) => {
      const el = document.getElementById(`section-${section.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [termsData]);

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

  const data = termsData || getDefaultData();
  const { heroTitle, heroDescription, introText, heroImage, ctaImage, sections, lastUpdated } = data;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f7f2] -mt-20">

        {/* ======================================================
            HERO - Green Theme (Same as Contact)
        ====================================================== */}

        <section className="relative min-h-[180px] sm:min-h-[180px] lg:min-h-[250px] overflow-hidden bg-[#f3eee7]">
          {/* Background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${heroImage || '/images/bg10.jpg'}')`,
              }}
            />
            {/* Soft cream overlay */}
            <div className="absolute inset-0 bg-[#f3eee7]/35" />
            {/* Left side readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f3eee7]/35 via-[#f3eee7]/15 to-transparent" />
            {/* Very subtle right fade */}
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent to-[#f3eee7]/10" />
          </div>

          {/* Decorative soft shapes */}
          <div className="absolute -left-20 -top-20 w-56 h-56 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-[#c9bca8]/10 blur-3xl" />

          <div className="container mx-auto px-5 sm:px-8 lg:px-10 relative z-10 h-full">
            <div className="min-h-[180px] sm:min-h-[180px] lg:min-h-[250px] flex items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInLeft}
                className="w-full max-w-[390px] sm:max-w-[460px] lg:max-w-[510px] py-10 sm:py-12 lg:py-14"
              >
                {/* Small editorial label */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="w-7 sm:w-9 h-px bg-[#8B9D83]" />
                  <span
                    className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#68776b]"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Legal Agreement
                  </span>
                </div>

                {/* Main Heading */}
                <h1
                  className="text-[32px] leading-[0.98] sm:text-[40px] sm:leading-[1] lg:text-[50px] lg:leading-[1] font-normal text-[#263b32] tracking-[-0.025em]"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  {heroTitle || 'Terms & Conditions'}
                </h1>

                {/* Small decorative line */}
                <div className="flex items-center gap-2 mt-4 mb-3">
                  <span className="w-12 sm:w-16 h-[1px] bg-[#8B9D83]/60" />
                  <span className="w-1 h-1 rounded-full bg-[#8B9D83]" />
                </div>

                {/* Description */}
                <p
                  className="max-w-[330px] sm:max-w-[390px] text-[9px] sm:text-[10px] lg:text-[11px] leading-[1.7] text-[#59655d]"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  {heroDescription || 'Please read these terms carefully before using our website and services.'}
                </p>
              </motion.div>
            </div>
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
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#263b32] mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
                    <FaListUl className="w-3.5 h-3.5 text-[#8B9D83]" />
                    On this page
                  </div>
                  <nav className="space-y-1 border-l border-[#c5d5be]/60">
                    {sections && sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#section-${section.id}`}
                        className={`block pl-4 pr-2 py-1.5 -ml-px border-l text-sm transition-colors ${
                          activeId === section.id
                            ? 'border-[#8B9D83] text-[#8B9D83] font-medium'
                            : 'border-transparent text-[#53645a] hover:text-[#263b32]'
                        }`}
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      >
                        {String(section.id).padStart(2, '0')}. {section.title}
                      </a>
                    ))}
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
                  className="text-[#53645a] leading-relaxed text-sm lg:text-base pb-8 mb-8 border-b border-[#c5d5be]/40"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  {introText || 'Welcome to BeautyBucket. These Terms & Conditions govern your use of our website and services.'}
                </motion.p>

                {sections && sections.map((section) => {
                  const Icon = getIcon(section.icon);
                  return (
                    <motion.div
                      key={section.id}
                      variants={fadeInUp}
                      id={`section-${section.id}`}
                      data-section-id={section.id}
                      className="mb-10 lg:mb-12 scroll-mt-28"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#c5d5be]/60 bg-white text-[#8B9D83] flex-shrink-0 text-xs font-semibold" style={{ fontFamily: FONT_FAMILY_INTER }}>
                          {String(section.id).padStart(2, '0')}
                        </div>
                        <div className="flex-1 pt-1">
                          <h2 className="text-lg lg:text-xl font-light text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      <div className="pl-13 lg:pl-13">
                        <p className="text-sm lg:text-base text-[#53645a] leading-relaxed mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
                          {section.description}
                        </p>

                        <ul className="space-y-2.5">
                          {section.details && section.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-sm text-[#263b32] leading-relaxed" style={{ fontFamily: FONT_FAMILY_INTER }}
                            >
                              <FaCheckCircle className="w-3.5 h-3.5 text-[#8B9D83] mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 border-t border-[#c5d5be]/30" />
                    </motion.div>
                  );
                })}

                {/* Important Notice - Green Theme */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-xl p-6 lg:p-8 border border-[#c5d5be]/60 mt-4 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#f0f5ed] flex-shrink-0">
                      <FaExclamationTriangle className="w-4 h-4 text-[#8B9D83]" />
                    </div>
                    <div>
                      <h3 className="text-base font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
                        Important Notice
                      </h3>
                      <p className="text-sm text-[#53645a] leading-relaxed" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        These Terms & Conditions are a legal agreement between you and BeautyBucket.
                        By using our Platform, you acknowledge that you have read, understood, and agree
                        to be bound by these Terms. If you have any questions, please contact our support team.
                      </p>
                      <div className="flex flex-wrap gap-5 mt-4">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-[#8B9D83] hover:text-[#6b7d63] font-medium text-sm transition-colors" style={{ fontFamily: FONT_FAMILY_INTER }}
                        >
                          Contact Us
                          <FaArrowRight className="w-3 h-3" />
                        </Link>
                        <Link
                          href="/privacy"
                          className="inline-flex items-center gap-1.5 text-[#8B9D83] hover:text-[#6b7d63] font-medium text-sm transition-colors" style={{ fontFamily: FONT_FAMILY_INTER }}
                        >
                          Privacy Policy
                          <FaArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Last Updated */}
                {lastUpdated && (
                  <motion.p
                    variants={fadeInUp}
                    className="text-xs text-[#8B9D83]/50 mt-6 text-right"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    Last Updated: {lastUpdated}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            CTA - Green Theme (Left Aligned)
        ====================================================== */}

        <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url('${ctaImage || '/images/cta-bg.jpg'}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B9D83]/85 to-[#6b7d63]/85" />
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
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-4">
                <GiSparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-xs sm:text-sm text-white font-medium" style={{ fontFamily: FONT_FAMILY }}>
                  Have Questions?
                </span>
              </div>

              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-3 leading-tight" 
                style={{ fontFamily: FONT_FAMILY }}
              >
                Have Questions About Our Terms?
              </h2>

              <p 
                className="text-xs sm:text-sm lg:text-base text-white/90 max-w-xl mb-7 leading-relaxed" 
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                Our team is here to help you understand our policies and ensure your experience is seamless.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#8B9D83] rounded-xl text-xs sm:text-sm font-medium hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  <FaArrowRight className="w-3.5 h-3.5" />
                  Contact Support
                </Link>

                <Link 
                  href="/products"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-white/40 text-white rounded-xl text-xs sm:text-sm font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  <FaShoppingBag className="w-3.5 h-3.5" />
                  Start Shopping
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