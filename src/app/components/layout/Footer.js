
// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import { 
//   FaFacebookF, 
//   FaInstagram, 
//   FaTwitter, 
//   FaWhatsapp,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaClock,
//   FaTruck,
//   FaShieldAlt,
//   FaYoutube,
//   FaLinkedinIn,
//   FaCcVisa,
//   FaCcMastercard,
//   FaPaypal,
//   FaApplePay,
//   FaPinterestP,
//   FaTiktok,
//   FaHeart,
//   FaStar
// } from 'react-icons/fa';
// import { HiOutlineBadgeCheck, HiOutlineChip } from 'react-icons/hi';
// import { IoIosFlash } from 'react-icons/io';
// import { GiLipstick } from 'react-icons/gi';

// // Icon mapping for social platforms
// const SOCIAL_ICONS = {
//   facebook: FaFacebookF,
//   instagram: FaInstagram,
//   twitter: FaTwitter,
//   whatsapp: FaWhatsapp,
//   youtube: FaYoutube,
//   linkedin: FaLinkedinIn,
//   pinterest: FaPinterestP,
//   tiktok: FaTiktok,
// };

// // Icon mapping for trust badges
// const TRUST_BADGE_ICONS = {
//   authentic: HiOutlineBadgeCheck,
//   warranty: FaShieldAlt,
//   delivery: IoIosFlash,
//   secure: FaShieldAlt,
//   trusted: HiOutlineBadgeCheck,
//   return: FaTruck,
//   support: FaPhone,
// };

// export default function Footer() {
//   const router = useRouter();
//   const currentYear = new Date().getFullYear();
//   const [footerData, setFooterData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch footer data from backend
//   useEffect(() => {
//     const fetchFooterData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/footer`);
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch footer data');
//         }
        
//         const data = await response.json();
        
//         if (data.success && data.data) {
//           setFooterData(data.data);
//         } else {
//           throw new Error('Invalid footer data');
//         }
//       } catch (err) {
//         console.error('Error fetching footer data:', err);
//         setError(err.message);
//         // Fallback to default data if API fails
//         setFooterData(getDefaultFooterData());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFooterData();
//   }, []);

//   // Default fallback data - Beauty Bucket theme
//   const getDefaultFooterData = () => ({
//     backgroundImage: '/images/footer.png',
//     company: {
//       name: "Beauty Bucket",
//       tagline: "Premium Beauty Essentials",
//       description: "Discover premium beauty products with expert care, fast delivery, and a touch of luxury across Bangladesh.",
//       address: "Dhaka, Bangladesh",
//       phone: "+880 1XXXXXXXXX",
//       email: "support@beautybucket.com",
//       hours: "Always Open • 24/7 Online Ordering • Quick Response",
//       logoUrl: "/images/logo3.png",
//     },
//     columns: [
//       {
//         id: 'default_1',
//         title: 'Company',
//         type: 'links',
//         items: [
//           { id: 'dl1', label: 'Home', url: '/' },
//           { id: 'dl2', label: 'Products', url: '/products' },
//           { id: 'dl3', label: 'Track Order', url: '/track' },
//           { id: 'dl4', label: 'About Us', url: '/about' },
//         ]
//       },
//       {
//         id: 'default_2',
//         title: 'Support',
//         type: 'support',
//         items: [
//           { id: 'ds1', label: 'Contact Us', url: '/contact' },
//           { id: 'ds2', label: 'Register', url: '/register' },
//           { id: 'ds3', label: 'Terms & Conditions', url: '/terms' },
//           { id: 'ds4', label: 'Privacy Policy', url: '/privacy' },
//         ],
//         socialLinks: [
//           { platform: 'facebook', url: 'https://facebook.com/beautybucket', active: true },
//           { platform: 'instagram', url: 'https://instagram.com/beautybucket', active: true },
//           { platform: 'youtube', url: 'https://youtube.com/beautybucket', active: true },
//         ]
//       },
//       {
//         id: 'default_3',
//         title: 'Contact Us',
//         type: 'contact',
//         items: [
//           { id: 'dc1', type: 'address', label: 'Address', value: 'Dhaka, Bangladesh' },
//           { id: 'dc2', type: 'phone', label: 'Phone', value: '+880 1XXXXXXXXX' },
//           { id: 'dc3', type: 'email', label: 'Email', value: 'support@beautybucket.com' },
//           { id: 'dc4', type: 'hours', label: 'Hours', value: 'Always Open • 24/7 Online Ordering' },
//         ]
//       }
//     ],
//     trustBadges: [
//       { type: 'authentic', label: '100% Authentic', active: true },
//       { type: 'warranty', label: 'Official Warranty', active: true },
//       { type: 'delivery', label: 'Fast Delivery', active: true },
//     ],
//     paymentMethods: [
//       { method: 'visa', active: true },
//       { method: 'mastercard', active: true },
//       { method: 'bkash', active: true },
//       { method: 'nagad', active: true },
//     ],
//     showTrustBadges: true,
//     showPaymentMethods: true,
//     footerText: 'All rights reserved.',
//     showCopyright: true,
//   });

//   // Get social links from columns
//   const getSocialLinks = () => {
//     if (!footerData) return [];
    
//     const supportColumn = footerData.columns?.find(col => col.type === 'support' || col.type === 'social');
//     if (supportColumn?.socialLinks) {
//       return supportColumn.socialLinks.filter(link => link.active);
//     }
//     return [];
//   };

//   // Get trust badges
//   const getTrustBadges = () => {
//     if (!footerData) return [];
//     return footerData.trustBadges?.filter(badge => badge.active) || [];
//   };

//   // Get column items by column title
//   const getColumnItems = (title) => {
//     if (!footerData) return [];
//     const column = footerData.columns?.find(col => col.title === title);
//     return column?.items || [];
//   };

//   // Get contact column items
//   const getContactItems = () => {
//     if (!footerData) return [];
//     const contactColumn = footerData.columns?.find(col => col.type === 'contact');
//     return contactColumn?.items || [];
//   };

//   const openGmail = (email) => {
//     window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
//   };

//   // Render contact item based on type
//   const renderContactItem = (item) => {
//     const icons = {
//       address: FaMapMarkerAlt,
//       phone: FaPhone,
//       email: FaEnvelope,
//       hours: FaClock,
//     };
//     const Icon = icons[item.type];
    
//     if (!Icon) return null;

//     if (item.type === 'email') {
//       return (
//         <motion.button 
//           key={item.id}
//           onClick={() => openGmail(item.value)}
//           className="flex items-center gap-3 text-white/80 hover:text-[#EE4275] transition-colors group w-full text-left font-['Inter']"
//           whileHover={{ x: 3 }}
//         >
//           <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/20 transition-colors">
//             <Icon className="text-[#EE4275] text-sm" />
//           </div>
//           <span className="text-sm">{item.value}</span>
//         </motion.button>
//       );
//     }

//     if (item.type === 'address') {
//       return (
//         <motion.a 
//           key={item.id}
//           href={`https://maps.google.com/?q=${encodeURIComponent(item.value)}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-start gap-3 text-white/80 hover:text-[#EE4275] transition-colors group font-['Inter']"
//           whileHover={{ x: 3 }}
//         >
//           <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/20 transition-colors">
//             <Icon className="text-[#EE4275] text-sm" />
//           </div>
//           <span className="text-sm leading-tight">{item.value}</span>
//         </motion.a>
//       );
//     }

//     if (item.type === 'phone') {
//       return (
//         <motion.a 
//           key={item.id}
//           href={`tel:${item.value}`}
//           className="flex items-center gap-3 text-white/80 hover:text-[#EE4275] transition-colors group font-['Inter']"
//           whileHover={{ x: 3 }}
//         >
//           <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/20 transition-colors">
//             <Icon className="text-[#EE4275] text-sm" />
//           </div>
//           <span className="text-sm">{item.value}</span>
//         </motion.a>
//       );
//     }

//     if (item.type === 'hours') {
//       return (
//         <div key={item.id} className="flex items-start gap-3 text-white/80 font-['Inter']">
//           <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
//             <Icon className="text-[#EE4275] text-sm" />
//           </div>
//           <span className="text-sm leading-tight">{item.value}</span>
//         </div>
//       );
//     }

//     return null;
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <footer className="relative text-white overflow-hidden bg-[#1A0E14]">
//         <div className="container mx-auto px-4 py-6 lg:py-5 relative z-10">
//           <div className="flex items-center justify-center min-h-[200px]">
//             <div className="text-center">
//               <div className="inline-block w-8 h-8 border-4 border-white/20 border-t-[#EE4275] rounded-full animate-spin"></div>
//               <p className="text-white/50 text-sm mt-2 font-['Inter']">Loading footer...</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     );
//   }

//   if (!footerData) {
//     return null;
//   }

//   const company = footerData.company || {};
//   const socialLinks = getSocialLinks();
//   const trustBadges = getTrustBadges();
//   const companyItems = getColumnItems('Company');
//   const supportItems = getColumnItems('Support');
//   const contactItems = getContactItems();
//   const showTrustBadges = footerData.showTrustBadges !== false;
//   const showPaymentMethods = footerData.showPaymentMethods !== false;
//   const showCopyright = footerData.showCopyright !== false;
//   const hasLogo = company.logoUrl && company.logoUrl.trim() !== '';

//   // Get background image from backend or use default
//   const backgroundImage = footerData.backgroundImage || '/images/footer.png';

//   return (
//     <footer className="relative text-white overflow-hidden">
//       {/* Background Image with Gradient Overlay */}
//       <div className="absolute inset-0 z-0">
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: `url('${backgroundImage}')`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         ></div>
//         {/* Dark Gradient Overlay - Beauty Theme */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#1A0E14]/70 via-[#1A0E14]/60 to-[#1A0E14]/75"></div>
//         {/* Pink Glow Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/5 via-transparent to-[#FF6B9D]/5"></div>
//         {/* Decorative Blur Circles */}
//         <div className="absolute top-0 left-0 w-96 h-96 bg-[#EE4275]/5 rounded-full filter blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FF6B9D]/5 rounded-full filter blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFD2DB]/3 rounded-full filter blur-3xl"></div>
//       </div>
      
//       {/* Top Pink Accent Line */}
//       <div className="relative z-10 w-full h-0.5 bg-gradient-to-r from-[#EE4275] via-[#FF6B9D] to-[#EE4275]"></div>
      
//       {/* Main Footer */}
//       <div className="relative z-10 container mx-auto px-4 py-10 lg:py-12">
        
//         {/* Main Grid - 4 Columns Desktop, 2 Columns Mobile */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          
//           {/* Column 1: Brand Info - Full width on mobile */}
//           <div className="col-span-2 lg:col-span-1">
//             {/* Logo */}
//             <div className="flex items-center gap-2">
//               {hasLogo ? (
//                 <img 
//                   src={company.logoUrl} 
//                   alt={company.name || 'Beauty Bucket'} 
//                   className="w-auto object-contain"
//                   style={{ height: '60px', width: 'auto' }}
//                 />
//               ) : (
//                 <div>
//                   <h2 className="text-2xl font-bold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
//                     {company.name || 'Beauty Bucket'}
//                   </h2>
//                   <span className="text-[10px] text-[#EE4275] tracking-wider uppercase" style={{ fontFamily: '"Playfair Display", serif' }}>
//                     Premium Beauty
//                   </span>
//                 </div>
//               )}
//             </div>
            
//             <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-xs font-['Inter']">
//               {company.description}
//             </p>

//             {/* Social Links */}
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-white/60 font-medium mr-1 font-['Inter']">Follow us:</span>
//               {socialLinks.length > 0 ? (
//                 socialLinks.map((social, index) => {
//                   const IconComponent = SOCIAL_ICONS[social.platform];
//                   if (!IconComponent) return null;
//                   return (
//                     <motion.a
//                       key={social.platform || index}
//                       href={social.url || '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#EE4275] hover:text-white hover:border-[#EE4275] transition-all duration-300 group"
//                       whileHover={{ y: -2 }}
//                       title={social.platform}
//                     >
//                       <span className="text-white group-hover:text-white transition-colors">
//                         <IconComponent size={14} />
//                       </span>
//                     </motion.a>
//                   );
//                 })
//               ) : (
//                 <>
//                   <motion.a
//                     href="#"
//                     className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#EE4275] hover:text-white hover:border-[#EE4275] transition-all duration-300 group"
//                     whileHover={{ y: -2 }}
//                   >
//                     <FaFacebookF size={14} className="text-white" />
//                   </motion.a>
//                   <motion.a
//                     href="#"
//                     className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#EE4275] hover:text-white hover:border-[#EE4275] transition-all duration-300 group"
//                     whileHover={{ y: -2 }}
//                   >
//                     <FaInstagram size={14} className="text-white" />
//                   </motion.a>
//                   <motion.a
//                     href="#"
//                     className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#EE4275] hover:text-white hover:border-[#EE4275] transition-all duration-300 group"
//                     whileHover={{ y: -2 }}
//                   >
//                     <FaYoutube size={14} className="text-white" />
//                   </motion.a>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Column 2: Company Links */}
//           <div className="col-span-1">
//             <h3 className="text-sm font-bold text-white mb-4 relative inline-block" style={{ fontFamily: '"Playfair Display", serif' }}>
//               Company
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
//             </h3>
//             <ul className="space-y-2.5">
//               {(companyItems.length > 0 ? companyItems : [
//                 { id: '1', label: 'Home', url: '/' },
//                 { id: '2', label: 'Products', url: '/products' },
//                 { id: '3', label: 'Track Order', url: '/track' },
//                 { id: '4', label: 'About Us', url: '/about' },
//               ]).map((link) => (
//                 <li key={link.id}>
//                   <Link 
//                     href={link.url}
//                     className="text-white/70 hover:text-[#EE4275] transition-colors duration-200 text-sm flex items-center gap-2 group font-['Inter']"
//                   >
//                     <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3: Support */}
//           <div className="col-span-1">
//             <h3 className="text-sm font-bold text-white mb-4 relative inline-block" style={{ fontFamily: '"Playfair Display", serif' }}>
//               Support
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
//             </h3>
//             <ul className="space-y-2.5">
//               {(supportItems.length > 0 ? supportItems : [
//                 { id: '1', label: 'Contact Us', url: '/contact' },
//                 { id: '2', label: 'Register', url: '/register' },
//                 { id: '3', label: 'Terms & Conditions', url: '/terms' },
//                 { id: '4', label: 'Privacy Policy', url: '/privacy' },
//               ]).map((link) => (
//                 <li key={link.id}>
//                   <Link 
//                     href={link.url}
//                     className="text-white/70 hover:text-[#EE4275] transition-colors duration-200 text-sm flex items-center gap-2 group font-['Inter']"
//                   >
//                     <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 4: Contact Us */}
//           <div className="col-span-2 lg:col-span-1">
//             <h3 className="text-sm font-bold text-white mb-4 relative inline-block" style={{ fontFamily: '"Playfair Display", serif' }}>
//               Contact Us
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
//             </h3>
            
//             <div className="space-y-3">
//               {contactItems.length > 0 ? (
//                 contactItems.map((item) => renderContactItem(item))
//               ) : (
//                 <>
//                   <motion.a 
//                     href={`https://maps.google.com/?q=${encodeURIComponent('Dhaka, Bangladesh')}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-start gap-3 text-white/80 hover:text-[#EE4275] transition-colors group font-['Inter']"
//                     whileHover={{ x: 3 }}
//                   >
//                     <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/20 transition-colors">
//                       <FaMapMarkerAlt className="text-[#EE4275] text-sm" />
//                     </div>
//                     <span className="text-sm leading-tight">Dhaka, Bangladesh</span>
//                   </motion.a>
                  
//                   <motion.a 
//                     href="tel:+8801XXXXXXXXX"
//                     className="flex items-center gap-3 text-white/80 hover:text-[#EE4275] transition-colors group font-['Inter']"
//                     whileHover={{ x: 3 }}
//                   >
//                     <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/20 transition-colors">
//                       <FaPhone className="text-[#EE4275] text-sm" />
//                     </div>
//                     <span className="text-sm">+880 1XXXXXXXXX</span>
//                   </motion.a>
                  
//                   <motion.button 
//                     onClick={() => openGmail('support@beautybucket.com')}
//                     className="flex items-center gap-3 text-white/80 hover:text-[#EE4275] transition-colors group w-full text-left font-['Inter']"
//                     whileHover={{ x: 3 }}
//                   >
//                     <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/20 transition-colors">
//                       <FaEnvelope className="text-[#EE4275] text-sm" />
//                     </div>
//                     <span className="text-sm">support@beautybucket.com</span>
//                   </motion.button>
                  
//                   <div className="flex items-start gap-3 text-white/80 font-['Inter']">
//                     <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
//                       <FaClock className="text-[#EE4275] text-sm" />
//                     </div>
//                     <span className="text-sm leading-tight">Always Open • 24/7 Online Ordering</span>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-4 mt-4 -mb-8 border-t border-white/10">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-3">
//             {showCopyright && (
//               <p className="text-white/40 text-xs font-['Inter']">
//                 © {currentYear} <span className="text-[#EE4275] font-medium" style={{ fontFamily: '"Playfair Display", serif' }}>{company.name || 'Beauty Bucket'}</span>. {footerData.footerText || 'All rights reserved.'}
//               </p>
//             )}
            
//             <div className="flex items-center gap-2">
//               <span className="text-white/40 text-xs font-['Inter']">Made with</span>
//               <FaHeart className="text-[#EE4275] text-xs" />
//               <span className="text-white/40 text-xs font-['Inter']">for beauty lovers</span>
//             </div>
            
//             {/* Payment Methods */}
//             {showPaymentMethods && footerData.paymentMethods && footerData.paymentMethods.length > 0 && (
//               <div className="flex items-center gap-2">
//                 <span className="text-white/40 text-xs font-['Inter']">Secure payments:</span>
//                 <div className="flex gap-1.5">
//                   {footerData.paymentMethods
//                     .filter(pm => pm.active)
//                     .map((pm) => (
//                       <div key={pm.method} className="px-2 py-0.5 bg-white/10 rounded border border-white/20 text-[10px] text-white/60 font-['Inter']">
//                         {pm.method.charAt(0).toUpperCase() + pm.method.slice(1)}
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaShieldAlt,
  FaYoutube,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaApplePay,
  FaPinterestP,
  FaTiktok,
  FaHeart,
  FaStar
} from 'react-icons/fa';
import { HiOutlineBadgeCheck, HiOutlineChip } from 'react-icons/hi';
import { IoIosFlash } from 'react-icons/io';
import { GiLipstick } from 'react-icons/gi';

// Font constants - Beauty Bucket Theme
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// Icon mapping for social platforms
const SOCIAL_ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaTwitter,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  pinterest: FaPinterestP,
  tiktok: FaTiktok,
};

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch footer data from backend
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/footer`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch footer data');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          setFooterData(data.data);
        } else {
          throw new Error('Invalid footer data');
        }
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setFooterData(getDefaultFooterData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Default fallback data - Beauty Bucket theme
  const getDefaultFooterData = () => ({
    backgroundImage: '/images/footer.png',
    company: {
      name: "Beauty Bucket",
      tagline: "Premium Beauty Essentials",
      description: "Discover premium beauty products with expert care, fast delivery, and a touch of luxury across Bangladesh.",
      address: "Dhaka, Bangladesh",
      phone: "+880 1XXXXXXXXX",
      email: "support@beautybucket.com",
      hours: "Always Open • 24/7 Online Ordering • Quick Response",
      logoUrl: "/images/logo3.png",
    },
    columns: [
      {
        id: 'default_1',
        title: 'Company',
        type: 'links',
        items: [
          { id: 'dl1', label: 'Home', url: '/' },
          { id: 'dl2', label: 'Products', url: '/products' },
          { id: 'dl3', label: 'Track Order', url: '/track' },
          { id: 'dl4', label: 'About Us', url: '/about' },
        ]
      },
      {
        id: 'default_2',
        title: 'Support',
        type: 'support',
        items: [
          { id: 'ds1', label: 'Contact Us', url: '/contact' },
          { id: 'ds2', label: 'Register', url: '/register' },
          { id: 'ds3', label: 'Terms & Conditions', url: '/terms' },
          { id: 'ds4', label: 'Privacy Policy', url: '/privacy' },
        ],
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com/beautybucket', active: true },
          { platform: 'instagram', url: 'https://instagram.com/beautybucket', active: true },
          { platform: 'youtube', url: 'https://youtube.com/beautybucket', active: true },
        ]
      },
      {
        id: 'default_3',
        title: 'Contact Us',
        type: 'contact',
        items: [
          { id: 'dc1', type: 'address', label: 'Address', value: 'Dhaka, Bangladesh' },
          { id: 'dc2', type: 'phone', label: 'Phone', value: '+880 1XXXXXXXXX' },
          { id: 'dc3', type: 'email', label: 'Email', value: 'support@beautybucket.com' },
          { id: 'dc4', type: 'hours', label: 'Hours', value: 'Always Open • 24/7 Online Ordering' },
        ]
      }
    ],
    trustBadges: [
      { type: 'authentic', label: '100% Authentic', active: true },
      { type: 'warranty', label: 'Official Warranty', active: true },
      { type: 'delivery', label: 'Fast Delivery', active: true },
    ],
    paymentMethods: [
      { method: 'visa', active: true },
      { method: 'mastercard', active: true },
      { method: 'bkash', active: true },
      { method: 'nagad', active: true },
    ],
    showTrustBadges: true,
    showPaymentMethods: true,
    footerText: 'All rights reserved.',
    showCopyright: true,
  });

  // Get social links from columns
  const getSocialLinks = () => {
    if (!footerData) return [];
    const supportColumn = footerData.columns?.find(col => col.type === 'support' || col.type === 'social');
    if (supportColumn?.socialLinks) {
      return supportColumn.socialLinks.filter(link => link.active);
    }
    return [];
  };

  // Get column items by column title
  const getColumnItems = (title) => {
    if (!footerData) return [];
    const column = footerData.columns?.find(col => col.title === title);
    return column?.items || [];
  };

  // Get contact column items
  const getContactItems = () => {
    if (!footerData) return [];
    const contactColumn = footerData.columns?.find(col => col.type === 'contact');
    return contactColumn?.items || [];
  };

  const openGmail = (email) => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
  };

  // Render contact item based on type
  const renderContactItem = (item) => {
    const icons = {
      address: FaMapMarkerAlt,
      phone: FaPhone,
      email: FaEnvelope,
      hours: FaClock,
    };
    const Icon = icons[item.type];
    if (!Icon) return null;

    if (item.type === 'email') {
      return (
        <motion.button 
          key={item.id}
          onClick={() => openGmail(item.value)}
          className="flex items-center gap-1.5 sm:gap-2 text-white/70 hover:text-[#8B9D83] transition-colors group w-full text-left"
          style={{ fontFamily: FONT_FAMILY }}
          whileHover={{ x: 2 }}
        >
          <Icon className="text-[#8B9D83] text-[10px] sm:text-[11px] flex-shrink-0" />
          <span className="text-[11px] sm:text-[13px] break-all">{item.value}</span>
        </motion.button>
      );
    }

    if (item.type === 'address') {
      return (
        <motion.a 
          key={item.id}
          href={`https://maps.google.com/?q=${encodeURIComponent(item.value)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-1.5 sm:gap-2 text-white/70 hover:text-[#8B9D83] transition-colors group"
          style={{ fontFamily: FONT_FAMILY }}
          whileHover={{ x: 2 }}
        >
          <Icon className="text-[#8B9D83] text-[10px] sm:text-[11px] mt-0.5 flex-shrink-0" />
          <span className="text-[11px] sm:text-[13px] leading-tight">{item.value}</span>
        </motion.a>
      );
    }

    if (item.type === 'phone') {
      return (
        <motion.a 
          key={item.id}
          href={`tel:${item.value}`}
          className="flex items-center gap-1.5 sm:gap-2 text-white/70 hover:text-[#8B9D83] transition-colors group"
          style={{ fontFamily: FONT_FAMILY }}
          whileHover={{ x: 2 }}
        >
          <Icon className="text-[#8B9D83] text-[10px] sm:text-[11px] flex-shrink-0" />
          <span className="text-[11px] sm:text-[13px]">{item.value}</span>
        </motion.a>
      );
    }

    if (item.type === 'hours') {
      return (
        <div key={item.id} className="flex items-start gap-1.5 sm:gap-2 text-white/70" style={{ fontFamily: FONT_FAMILY }}>
          <Icon className="text-[#8B9D83] text-[10px] sm:text-[11px] mt-0.5 flex-shrink-0" />
          <span className="text-[11px] sm:text-[13px] leading-tight">{item.value}</span>
        </div>
      );
    }

    return null;
  };

  // Show loading state
  if (isLoading) {
    return (
      <footer className="relative text-white overflow-hidden bg-[#1A0E14]">
        <div className="container mx-auto px-4 py-6 lg:py-5 relative z-10">
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-white/20 border-t-[#8B9D83] rounded-full animate-spin"></div>
              <p className="text-white/50 text-sm mt-2" style={{ fontFamily: FONT_FAMILY }}>Loading footer...</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (!footerData) {
    return null;
  }

  const company = footerData.company || {};
  const socialLinks = getSocialLinks();
  const companyItems = getColumnItems('Company');
  const supportItems = getColumnItems('Support');
  const contactItems = getContactItems();
  const showPaymentMethods = footerData.showPaymentMethods !== false;
  const showCopyright = footerData.showCopyright !== false;
  const hasLogo = company.logoUrl && company.logoUrl.trim() !== '';

  const backgroundImage = footerData.backgroundImage || '';

  return (
    <footer className="relative text-white overflow-hidden bg-[#1A0E14]">
      {/* Background Image with Gradient Overlay */}
      {backgroundImage && backgroundImage.trim() !== '' && (
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0E14]/90 via-[#1A0E14]/85 to-[#1A0E14]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#8B9D83]/5 via-transparent to-[#8B9D83]/5"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#8B9D83]/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#6b7d63]/5 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8B9D83]/3 rounded-full filter blur-3xl"></div>
        </div>
      )}
      
      {/* Top Accent Line - Green */}
      <div className="relative z-10 w-full h-0.5 bg-gradient-to-r from-[#8B9D83] via-[#6b7d63] to-[#8B9D83]"></div>
      
      {/* Main Footer */}
      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 lg:py-10">
        
        {/* Main Grid - 50% Left / 50% Right */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2">
          
          {/* Left Side: Brand Info - Center on mobile, left on desktop */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left pr-0 md:pr-8">
            {/* Logo */}
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              {hasLogo ? (
                <img 
                  src={company.logoUrl} 
                  alt={company.name || 'Beauty Bucket'} 
                  className="w-auto object-contain"
                  style={{ height: '45px', width: 'auto' }}
                />
              ) : (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                    {company.name || 'Beauty Bucket'}
                  </h2>
                  <span className="text-[9px] md:text-[10px] text-[#8B9D83] tracking-wider uppercase" style={{ fontFamily: FONT_FAMILY }}>
                    Premium Beauty
                  </span>
                </div>
              )}
            </div>
            
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 max-w-sm" style={{ fontFamily: FONT_FAMILY }}>
              {company.description}
            </p>

            {/* Social Links - Center on mobile, left on desktop */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs text-white/40 font-medium mr-1 hidden sm:inline" style={{ fontFamily: FONT_FAMILY }}>Follow us:</span>
              {socialLinks.length > 0 ? (
                socialLinks.map((social, index) => {
                  const IconComponent = SOCIAL_ICONS[social.platform];
                  if (!IconComponent) return null;
                  return (
                    <motion.a
                      key={social.platform || index}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83] transition-all duration-300 group"
                      whileHover={{ y: -2 }}
                      title={social.platform}
                    >
                      <IconComponent size={11} className="text-white/70 group-hover:text-white sm:text-[12px]" />
                    </motion.a>
                  );
                })
              ) : (
                <>
                  <motion.a href="#" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#8B9D83] transition-all duration-300 group" whileHover={{ y: -2 }}>
                    <FaFacebookF size={11} className="text-white/70 group-hover:text-white sm:text-[12px]" />
                  </motion.a>
                  <motion.a href="#" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#8B9D83] transition-all duration-300 group" whileHover={{ y: -2 }}>
                    <FaInstagram size={11} className="text-white/70 group-hover:text-white sm:text-[12px]" />
                  </motion.a>
                  <motion.a href="#" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#8B9D83] transition-all duration-300 group" whileHover={{ y: -2 }}>
                    <FaYoutube size={11} className="text-white/70 group-hover:text-white sm:text-[12px]" />
                  </motion.a>
                </>
              )}
            </div>
          </div>

          {/* Right Side: Navigation Columns - 50% */}
          <div className="grid grid-cols-3 gap-.5  md:gap-4">
            
            {/* Company Column */}
            <div>
              <h3 className="text-[10px] sm:text-xs font-bold text-white/60 mb-2 sm:mb-3 uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
                Company
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {(companyItems.length > 0 ? companyItems : [
                  { id: '1', label: 'Home', url: '/' },
                  { id: '2', label: 'Products', url: '/products' },
                  { id: '3', label: 'Track Order', url: '/track' },
                  { id: '4', label: 'About Us', url: '/about' },
                ]).map((link) => (
                  <li key={link.id}>
                    <Link 
                      href={link.url}
                      className="text-white/50 hover:text-[#8B9D83] transition-colors duration-200 text-[10px] sm:text-[13px]"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div className="-ml-4  ">
              <h3 className="text-[10px] sm:text-xs font-bold text-white/60 mb-2 sm:mb-3 uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
                Support
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {(supportItems.length > 0 ? supportItems : [
                  { id: '1', label: 'Contact Us', url: '/contact' },
                  { id: '2', label: 'Register', url: '/register' },
                  { id: '3', label: 'Terms & Conditions', url: '/terms' },
                  { id: '4', label: 'Privacy Policy', url: '/privacy' },
                ]).map((link) => (
                  <li key={link.id}>
                    <Link 
                      href={link.url}
                      className="text-white/50 hover:text-[#8B9D83] transition-colors duration-200 text-[10px] sm:text-[13px]"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us Column */}
            <div className="-ml-4">
              <h3 className="text-[10px] sm:text-xs font-bold text-white/60 mb-2 sm:mb-3 uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
                Contact
              </h3>
              
              <div className="space-y-1.5 sm:space-y-2">
                {contactItems.length > 0 ? (
                  contactItems.map((item) => renderContactItem(item))
                ) : (
                  <>
                    <motion.a 
                      href={`https://maps.google.com/?q=${encodeURIComponent('Dhaka, Bangladesh')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-1.5 sm:gap-2 text-white/50 hover:text-[#8B9D83] transition-colors group"
                      style={{ fontFamily: FONT_FAMILY }}
                      whileHover={{ x: 2 }}
                    >
                      <FaMapMarkerAlt className="text-[#8B9D83] text-[10px] sm:text-[11px] mt-0.5 flex-shrink-0" />
                      <span className="text-[10px] sm:text-[13px] leading-tight">Dhaka, Bangladesh</span>
                    </motion.a>
                    
                    <motion.a 
                      href="tel:+8801XXXXXXXXX"
                      className="flex items-center gap-1.5 sm:gap-2 text-white/50 hover:text-[#8B9D83] transition-colors group"
                      style={{ fontFamily: FONT_FAMILY }}
                      whileHover={{ x: 2 }}
                    >
                      <FaPhone className="text-[#8B9D83] text-[10px] sm:text-[11px] flex-shrink-0" />
                      <span className="text-[10px] sm:text-[13px]">+880 1XXXXXXXXX</span>
                    </motion.a>
                    
                    <motion.button 
                      onClick={() => openGmail('support@beautybucket.com')}
                      className="flex items-center gap-1.5 sm:gap-2 text-white/50 hover:text-[#8B9D83] transition-colors group w-full text-left"
                      style={{ fontFamily: FONT_FAMILY }}
                      whileHover={{ x: 2 }}
                    >
                      <FaEnvelope className="text-[#8B9D83] text-[10px] sm:text-[11px] flex-shrink-0" />
                      <span className="text-[10px] sm:text-[13px] break-all">support@beautybucket.com</span>
                    </motion.button>
                    
                    <div className="flex items-start gap-1.5 sm:gap-2 text-white/50" style={{ fontFamily: FONT_FAMILY }}>
                      <FaClock className="text-[#8B9D83] text-[10px] sm:text-[11px] mt-0.5 flex-shrink-0" />
                      <span className="text-[10px] sm:text-[13px] leading-tight">Always Open</span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 mt-3 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
            {showCopyright && (
              <p className="text-white/40 text-[10px] sm:text-[11px]" style={{ fontFamily: FONT_FAMILY }}>
                © {currentYear} <span className="text-[#8B9D83] font-medium">{company.name || 'Beauty Bucket'}</span>. {footerData.footerText || 'All rights reserved.'}
              </p>
            )}
            
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-[10px] sm:text-[11px]" style={{ fontFamily: FONT_FAMILY }}>Made with</span>
              <FaHeart className="text-[#8B9D83] text-[9px] sm:text-[10px]" />
              <span className="text-white/40 text-[10px] sm:text-[11px]" style={{ fontFamily: FONT_FAMILY }}>for beauty lovers</span>
            </div>
            
            {/* Payment Methods */}
            {showPaymentMethods && footerData.paymentMethods && footerData.paymentMethods.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-[10px] sm:text-[11px]" style={{ fontFamily: FONT_FAMILY }}>Secure:</span>
                <div className="flex gap-1">
                  {footerData.paymentMethods
                    .filter(pm => pm.active)
                    .map((pm) => (
                      <div key={pm.method} className="px-1.5 sm:px-2 py-0.5 bg-white/10 rounded border border-white/20 text-[9px] sm:text-[10px] text-white/40" style={{ fontFamily: FONT_FAMILY }}>
                        {pm.method.charAt(0).toUpperCase() + pm.method.slice(1)}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}