

// // app/about/AboutClient.js
// 'use client';

// import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// import {
//   FaHeart,
//   FaLeaf,
//   FaShippingFast,
//   FaShieldAlt,
//   FaStar,
//   FaUsers,
//   FaAward,
//   FaGlobe,
//   FaArrowRight,
//   FaCheckCircle,
//   FaGift,
//   FaSmile,
//   FaRocket,
//   FaStore,
//   FaTrophy,
//   FaChevronLeft,
//   FaChevronRight,
//   FaGem,
//   FaHands,
//   FaSeedling,
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaTruck,
//   FaPlay,
//   FaQuoteLeft,
// } from 'react-icons/fa';

// import {
//   GiLipstick,
//   GiSparkles,
// } from 'react-icons/gi';

// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// /* =========================================================
//    FONTS
// ========================================================= */

// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
// const FONT_FAMILY_INTER = "'Inter', sans-serif";

// /* =========================================================
//    ICON MAP
// ========================================================= */

// const ICON_MAP = {
//   FaHeart,
//   FaLeaf,
//   FaShippingFast,
//   FaShieldAlt,
//   FaStar,
//   FaUsers,
//   FaAward,
//   FaGlobe,
//   FaCheckCircle,
//   FaGift,
//   FaSmile,
//   FaRocket,
//   FaStore,
//   FaTrophy,
//   FaGem,
//   FaHands,
//   FaSeedling,
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaTruck,
//   GiLipstick,
//   GiSparkles,
// };

// const getIcon = (iconName) => {
//   const Icon = ICON_MAP[iconName];
//   return Icon || FaStar;
// };

// /* =========================================================
//    ANIMATIONS
// ========================================================= */

// const fadeUp = {
//   hidden: {
//     opacity: 0,
//     y: 35,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.7,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// const fadeLeft = {
//   hidden: {
//     opacity: 0,
//     x: -45,
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.8,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// const fadeRight = {
//   hidden: {
//     opacity: 0,
//     x: 45,
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.8,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// const stagger = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.12,
//       delayChildren: 0.08,
//     },
//   },
// };

// const scaleFade = {
//   hidden: {
//     opacity: 0,
//     scale: 0.94,
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.6,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// /* =========================================================
//    DEFAULT STORY DATA
// ========================================================= */

// const getStoryData = (story) => {
//   return {
//     badge: story?.badge || 'Our Story',

//     title:
//       story?.title ||
//       'A Journey of Beauty & Trust',

//     paragraphs:
//       story?.paragraphs?.length > 0
//         ? story.paragraphs
//         : [
//             'BeautyBucket was founded with a simple yet powerful vision: to make premium beauty products accessible to everyone in Bangladesh.',
//             'We carefully curate each product in our collection, ensuring only the highest quality, authentic, and effective products make it to our shelves.',
//             'Our commitment to quality, transparency, and customer satisfaction has made us a beloved brand among thousands of customers across the country.',
//           ],

//     trustIndicators:
//       story?.trustIndicators?.length > 0
//         ? story.trustIndicators
//         : [
//             {
//               icon: 'FaCheckCircle',
//               label: 'Quality Assured',
//             },
//             {
//               icon: 'FaShippingFast',
//               label: 'Fast Delivery',
//             },
//             {
//               icon: 'FaGift',
//               label: 'Shipping Across the Country',
//             },
//             {
//               icon: 'FaSmile',
//               label: '100% Satisfaction',
//             },
//           ],

//     images:
//       story?.images?.length > 0
//         ? story.images
//         : [
//             {
//               src: '/images/about1.jpg',
//               alt: 'Happy customer',
//             },
//             {
//               src: '/images/bg6.png',
//               alt: 'Beauty products display',
//             },
//             {
//               src: '/images/bg9.PNG',
//               alt: 'Product curation',
//             },
//             {
//               src: '/images/bg8.png',
//               alt: 'Beauty team',
//             },
//           ],
//   };
// };

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function AboutClient() {
//   const [aboutData, setAboutData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showVideo, setShowVideo] = useState(false);

//   /* =======================================================
//      DEFAULT DATA
//   ======================================================= */

//   const getDefaultData = () => ({
//     hero: {
//       image: '/images/bg1.png',
//       leftImage: '/images/bg1.png',
//       overlayImage: '/images/bg2.jpg',
//       rightImage: '/images/bg8.png',
//       secondaryImage: '/images/bg8.png',

//       badge: 'About Us',

//       title: 'Redefining Beauty',

//       highlightedText: 'for Everyone',

//       description:
//         'We believe beauty is for everyone. Our mission is to bring you the finest beauty products with expert care, fast delivery, and a touch of luxury.',

//       buttonText: 'Explore Products',
//       buttonLink: '/products',

//       secondaryButtonText: 'Get in Touch',
//       secondaryButtonLink: '/contact',
//     },

//     stats: {
//       backgroundImage: '/images/bg5.PNG',

//       items: [
//         {
//           icon: 'FaAward',
//           value: '50+',
//           label: 'Premium Brands',
//         },
//         {
//           icon: 'FaUsers',
//           value: '5K+',
//           label: 'Happy Customers',
//         },
//         {
//           icon: 'GiLipstick',
//           value: '500+',
//           label: 'Products',
//         },
//         {
//           icon: 'FaStar',
//           value: '98%',
//           label: 'Satisfaction Rate',
//         },
//       ],
//     },

//     story: {
//       badge: 'Our Story',

//       title: 'A Journey of Beauty & Trust',

//       paragraphs: [
//         'BeautyBucket was founded with a simple yet powerful vision: to make premium beauty products accessible to everyone in Bangladesh.',
//         'We carefully curate each product in our collection, ensuring only the highest quality, authentic, and effective products make it to our shelves.',
//         'Our commitment to quality, transparency, and customer satisfaction has made us a beloved brand among thousands of customers across the country.',
//       ],

//       trustIndicators: [
//         {
//           icon: 'FaCheckCircle',
//           label: 'Quality Assured',
//         },
//         {
//           icon: 'FaShippingFast',
//           label: 'Fast Delivery',
//         },
//         {
//           icon: 'FaGift',
//           label: 'Shipping Across the Country',
//         },
//         {
//           icon: 'FaSmile',
//           label: '100% Satisfaction',
//         },
//       ],

//       images: [
//         {
//           src: '/images/about1.jpg',
//           alt: 'Happy customer',
//         },
//         {
//           src: '/images/bg6.png',
//           alt: 'Beauty products display',
//         },
//         {
//           src: '/images/bg9.PNG',
//           alt: 'Product curation',
//         },
//         {
//           src: '/images/bg8.png',
//           alt: 'Beauty team',
//         },
//       ],
//     },

//     whyChooseUs: {
//       backgroundImage: '/images/bg5.PNG',

//       badge: 'Why Choose Us',

//       title: 'Beauty Is Power, A Smile Is Its Word',

//       description:
//         'We believe that true beauty starts from within. Our carefully selected products are designed to help you feel confident, radiant, and completely yourself.',

//       buttonText: 'Explore More',
//       buttonLink: '/products',

//       cards: [
//         {
//           icon: 'FaLeaf',
//           title: '100% Organic',
//           description:
//             'Carefully selected products made with ingredients you can trust.',
//         },
//         {
//           icon: 'FaHeart',
//           title: 'Improve Health',
//           description:
//             'Beauty essentials designed to support your everyday self-care.',
//         },
//         {
//           icon: 'FaShieldAlt',
//           title: '100% Authentic',
//           description:
//             'Every product is verified for authenticity and quality.',
//         },
//         {
//           icon: 'FaTruck',
//           title: 'Fast Delivery',
//           description:
//             'Quick and reliable delivery right to your doorstep.',
//         },
//       ],
//     },

//     curatedForYou: {
//       badge: 'Curated For You',

//       title: 'Beauty, Curated For You',

//       description:
//         'Discover our handpicked collection of premium beauty products, carefully selected to enhance your natural beauty.',

//       buttonText: 'View All Products',

//       buttonLink: '/products',

//       categories: [],
//     },

//     cta: {
//       backgroundImage: '/images/cta-bg.jpg',

//       title: "We're Here to Help",

//       description:
//         'Our beauty experts are ready to assist you with any questions about products or orders.',

//       buttonText: 'Shop Now',

//       buttonLink: '/products',

//       secondaryButtonText: 'Contact Us',

//       secondaryButtonLink: '/contact',
//     },
//   });

//   /* =======================================================
//      FETCH DATA
//   ======================================================= */

//   useEffect(() => {
//     const fetchAboutData = async () => {
//       try {
//         setIsLoading(true);

//         const apiUrl =
//           process.env.NEXT_PUBLIC_API_URL ||
//           'http://localhost:5000';

//         const response = await fetch(
//           `${apiUrl}/api/about/page`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(
//             `Failed to fetch about data: ${response.status}`
//           );
//         }

//         const result = await response.json();

//         if (result.success && result.data) {
//           setAboutData(result.data);
//         } else {
//           setAboutData(getDefaultData());
//         }
//       } catch (error) {
//         console.error(
//           'Error fetching about data:',
//           error
//         );

//         setAboutData(getDefaultData());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAboutData();
//   }, []);

//   /* =======================================================
//      AUTO STORY SLIDER
//   ======================================================= */

//   useEffect(() => {
//     if (!aboutData?.story?.images?.length) return;

//     const interval = setInterval(() => {
//       setCurrentSlide(
//         (prev) =>
//           (prev + 1) %
//           aboutData.story.images.length
//       );
//     }, 4500);

//     return () => clearInterval(interval);
//   }, [aboutData?.story?.images?.length]);

//   const nextSlide = () => {
//     if (!aboutData?.story?.images?.length) return;

//     setCurrentSlide(
//       (prev) =>
//         (prev + 1) %
//         aboutData.story.images.length
//     );
//   };

//   const prevSlide = () => {
//     if (!aboutData?.story?.images?.length) return;

//     setCurrentSlide(
//       (prev) =>
//         (prev -
//           1 +
//           aboutData.story.images.length) %
//         aboutData.story.images.length
//     );
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />

//         <div className="flex min-h-screen items-center justify-center bg-[#f7f4ef]">
//           <div className="text-center">
//             <div className="mx-auto h-8 w-8 animate-spin rounded-full border-[3px] border-[#879681] border-t-transparent" />

//             <p
//               className="mt-4 text-xs tracking-wide text-[#687269]"
//               style={{
//                 fontFamily: FONT_FAMILY_INTER,
//               }}
//             >
//               Loading about page...
//             </p>
//           </div>
//         </div>

//         <Footer />
//       </>
//     );
//   }

//   /* =======================================================
//      DATA
//   ======================================================= */

//   const data = aboutData || getDefaultData();

//   const {
//     hero,
//     stats,
//     story,
//     whyChooseUs,
//     curatedForYou,
//     cta,
//   } = data;

//   const storyData = getStoryData(story);

//   const statsItems = stats?.items || stats || [];

//   const whyChooseUsCards =
//     whyChooseUs?.cards || [];

//   const categories =
//     curatedForYou?.categories || [];

//   /* =======================================================
//      RETURN
//   ======================================================= */

//   return (
//     <>
//       <Navbar />

//       <main className="relative -mt-24 overflow-hidden bg-[#f7f4ef]">

//         {/* ==================================================
//             HERO
//         ================================================== */}

//         <section className="relative px-3 pb-10 pt-5 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8 lg:pb-16">

//           {/* soft background shapes */}

//           <div className="pointer-events-none absolute left-[-180px] top-[100px] h-[400px] w-[400px] rounded-full bg-[#d7dfd2]/30 blur-[100px]" />

//           <div className="pointer-events-none absolute right-[-160px] top-[-80px] h-[450px] w-[450px] rounded-full bg-[#e7d9d0]/30 blur-[100px]" />

//           <div className="relative z-10 mx-auto max-w-[1500px]">

//             <div className="grid items-center gap-5 lg:grid-cols-[0.8fr_1.4fr_0.8fr] xl:gap-8">

//               {/* LEFT IMAGE */}

//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeLeft}
//                 className="relative hidden lg:block"
//               >
//                 <div className="relative overflow-hidden rounded-[28px] bg-white p-1.5 shadow-[0_25px_80px_rgba(45,55,48,0.10)]">

//                   <div className="relative aspect-[0.82/1] overflow-hidden rounded-[23px]">

//                     <img
//                       src={
//                         hero?.leftImage ||
//                         hero?.image ||
//                         '/images/bg1.png'
//                       }
//                       alt="Beauty"
//                       className="h-full w-full object-cover transition-transform duration-[1.5s] hover:scale-105"
//                       onError={(e) => {
//                         e.currentTarget.src =
//                           '/images/bg1.png';
//                       }}
//                     />

//                     <div className="absolute inset-0 bg-gradient-to-t from-[#24372e]/25 via-transparent to-white/5" />

//                   </div>

//                 </div>

               

//               </motion.div>


//               {/* CENTER */}

//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeUp}
//                 className="relative px-2 text-center sm:px-5"
//               >

//                 {/* label */}

//                 <div className="mb-5 flex items-center justify-center gap-3">

//                   <span className="h-px w-8 bg-[#a9afa5] mt-4 -mb-3" />

//                   <span
//                     className="text-[9px] mt-4 -mb-3 font-medium uppercase tracking-[0.38em] text-[#7f887e]"
//                     style={{
//                       fontFamily: FONT_FAMILY_INTER,
//                     }}
//                   >
//                     {hero?.badge || 'About Us'}
//                   </span>

//                   <span className="h-px w-8 bg-[#a9afa5] mt-4 -mb-3" />

//                 </div>


//                 {/* heading */}

//                 <h1
//                   className="text-[38px] font-light leading-[0.98] tracking-[-0.045em] text-[#29362f] sm:text-[52px] md:text-[60px] lg:text-[56px] xl:text-[70px]"
//                   style={{
//                     fontFamily:
//                       FONT_FAMILY_PLAYFAIR,
//                   }}
//                 >
//                   {hero?.title ||
//                     'Redefining Beauty'}

//                   <br />

//                   <span className="italic text-[#84947f]">
//                     {hero?.highlightedText ||
//                       'for Everyone'}
//                   </span>
//                 </h1>


//                 {/* decorative line */}

//                 <div className="my-6 flex items-center justify-center gap-2">

//                   <span className="h-px w-12 bg-[#b5bcb2]" />

//                   <span className="h-1.5 w-1.5 rounded-full bg-[#879681]" />

//                   <span className="h-px w-12 bg-[#b5bcb2]" />

//                 </div>


//                 <p
//                   className="mx-auto max-w-[560px] text-[11px] leading-6 text-[#687169] sm:text-[13px]"
//                   style={{
//                     fontFamily: FONT_FAMILY_INTER,
//                   }}
//                 >
//                   {hero?.description ||
//                     'We believe beauty is for everyone. Our mission is to bring you the finest beauty products with expert care, fast delivery, and a touch of luxury.'}
//                 </p>


//                 {/* buttons */}

//                 <div className="mt-7 flex flex-wrap justify-center gap-3">

//                   <Link
//                     href={
//                       hero?.buttonLink ||
//                       '/products'
//                     }
//                     className="group inline-flex items-center gap-2 rounded-full bg-[#52665a] px-6 py-3 text-[9px] font-medium uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_rgba(82,102,90,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#405347] hover:shadow-[0_15px_35px_rgba(82,102,90,0.25)]"
//                   >
//                     {hero?.buttonText ||
//                       'Explore Products'}

//                     <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
//                   </Link>


//                   <Link
//                     href={
//                       hero?.secondaryButtonLink ||
//                       '/contact'
//                     }
//                     className="inline-flex items-center gap-2 rounded-full border border-[#bfc5bd] bg-white/60 px-6 py-3 text-[9px] font-medium uppercase tracking-[0.12em] text-[#4e5b53] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white"
//                   >
//                     {hero?.secondaryButtonText ||
//                       'Get in Touch'}
//                   </Link>

//                 </div>


//                 {/* tiny brand line */}

//                 <div className="mt-6 -mb-10 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.3em] text-[#a1a69f]">

//                   <FaGem />

//                   <span>
//                     Beauty • Care • Confidence
//                   </span>

//                 </div>

//               </motion.div>


//               {/* RIGHT IMAGE */}

//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeRight}
//                 className="relative hidden lg:block"
//               >

//                 <div className="relative overflow-hidden rounded-[28px] bg-white p-1.5 shadow-[0_25px_80px_rgba(45,55,48,0.10)]">

//                   <div className="relative aspect-[0.82/1] overflow-hidden rounded-[23px]">

//                     <img
//                       src={
//                         hero?.rightImage ||
//                         hero?.secondaryImage ||
//                         '/images/bg8.png'
//                       }
//                       alt="Beauty care"
//                       className="h-full w-full object-cover transition-transform duration-[1.5s] hover:scale-105"
//                       onError={(e) => {
//                         e.currentTarget.src =
//                           '/images/bg8.png';
//                       }}
//                     />

//                     <div className="absolute inset-0 bg-gradient-to-t from-[#24372e]/20 via-transparent to-transparent" />

//                     <div className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/80 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#52665a] shadow-lg backdrop-blur-md">
//                       Premium
//                     </div>

//                   </div>

//                 </div>


//                 <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-[#d9e1d5]/50 blur-2xl" />

//               </motion.div>


//               {/* MOBILE IMAGES */}

//               <div className="mt-2 grid grid-cols-2 gap-3 lg:hidden">

//                 <motion.div
//                   initial={{
//                     opacity: 0,
//                     x: -20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   transition={{
//                     duration: 0.6,
//                   }}
//                   className="relative overflow-hidden rounded-[20px] bg-white p-1 shadow-lg"
//                 >
//                   <div className="aspect-square overflow-hidden rounded-[17px]">

//                     <img
//                       src={
//                         hero?.leftImage ||
//                         hero?.image ||
//                         '/images/bg1.png'
//                       }
//                       alt="Beauty"
//                       className="h-full w-full object-cover"
//                       onError={(e) => {
//                         e.currentTarget.src =
//                           '/images/bg1.png';
//                       }}
//                     />

//                   </div>
//                 </motion.div>


//                 <motion.div
//                   initial={{
//                     opacity: 0,
//                     x: 20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   transition={{
//                     duration: 0.6,
//                     delay: 0.1,
//                   }}
//                   className="relative overflow-hidden rounded-[20px] bg-white p-1 shadow-lg"
//                 >
//                   <div className="relative aspect-square overflow-hidden rounded-[17px]">

//                     <img
//                       src={
//                         hero?.rightImage ||
//                         hero?.secondaryImage ||
//                         '/images/bg8.png'
//                       }
//                       alt="Beauty"
//                       className="h-full w-full object-cover"
//                       onError={(e) => {
//                         e.currentTarget.src =
//                           '/images/bg8.png';
//                       }}
//                     />

//                     <span className="absolute right-2 top-2 rounded-full bg-[#52665a]/90 px-2 py-1 text-[6px] font-bold uppercase tracking-wider text-white">
//                       Premium
//                     </span>

//                   </div>
//                 </motion.div>

//               </div>

//             </div>

//           </div>

//         </section>


//         {/* ==================================================
//             STATS
//         ================================================== */}

//    {/* ==================================================
//     STATS SECTION
// ================================================== */}

// {/* ==================================================
//     STATS SECTION
// ================================================== */}

// <section
//   className="relative overflow-hidden py-8 sm:py-10 lg:py-12"
//   style={{
//     backgroundImage: `url('${
//       stats?.backgroundImage || '/images/bg5.PNG'
//     }')`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   }}
// >
//   {/* Main #71816F overlay */}
//   <div className="absolute inset-0 bg-[#71816F]/65" />

//   {/* Slightly softer center overlay */}
//   <div className="absolute inset-0 bg-gradient-to-r from-[#71816F]/75 via-[#71816F]/55 to-[#71816F]/70" />

//   {/* Content */}
//   <div className="relative z-10 mx-auto max-w-[1450px] px-4 sm:px-7 lg:px-10">

//     <motion.div
//       variants={stagger}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{
//         once: true,
//         amount: 0.2,
//       }}
//       className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-5"
//     >

//       {statsItems.map((stat, index) => {
//         const Icon = getIcon(stat.icon);

//         return (
//           <motion.div
//             key={index}
//             variants={scaleFade}
//             className="group relative overflow-hidden rounded-[20px] border border-white/40 bg-white/75 p-4 text-center shadow-[0_12px_35px_rgba(40,55,45,0.15)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_18px_45px_rgba(40,55,45,0.20)] sm:p-5 lg:p-6"
//           >

//             {/* Soft decorative glow */}
//             <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#71816F]/20 blur-2xl transition-transform duration-700 group-hover:scale-150" />

//             <div className="relative z-10">

//               {/* Icon */}
//               <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#71816F]/20 bg-[#71816F]/10 text-[#71816F] shadow-sm transition-all duration-300 group-hover:bg-[#71816F] group-hover:text-white sm:h-11 sm:w-11">
//                 <Icon className="text-sm sm:text-base" />
//               </div>

//               {/* Number */}
//               <div
//                 className="text-2xl font-medium tracking-tight text-[#526257] sm:text-3xl"
//                 style={{
//                   fontFamily: FONT_FAMILY_PLAYFAIR,
//                 }}
//               >
//                 {stat.value}
//               </div>

//               {/* Label */}
//               <div
//                 className="mt-1.5 text-[7px] font-medium uppercase tracking-[0.16em] text-[#68736A] sm:text-[8px]"
//                 style={{
//                   fontFamily: FONT_FAMILY_INTER,
//                 }}
//               >
//                 {stat.label}
//               </div>

//             </div>

//           </motion.div>
//         );
//       })}

//     </motion.div>

//   </div>
// </section>

//         {/* ==================================================
//             OUR STORY
//         ================================================== */}

//              {/* ==================================================
//             OUR STORY - Reduced Height
//         ================================================== */}

//         <section
//           id="story"
//           className="bg-[#faf9f5] px-4 py-10 sm:px-7 sm:py-14 lg:px-10 lg:py-8"
//         >

//           <div className="mx-auto max-w-[1400px]">

//             <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

//               {/* TEXT */}

//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{
//                   once: true,
//                   amount: 0.2,
//                 }}
//                 variants={fadeLeft}
//               >

//                 <div className="mb-3 flex items-center gap-3">

//                   <span className="h-px w-8 bg-[#879681]" />

//                   <span
//                     className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#7e897e]"
//                     style={{
//                       fontFamily:
//                         FONT_FAMILY_INTER,
//                     }}
//                   >
//                     {storyData.badge}
//                   </span>

//                 </div>


//                 <h2
//                   className="max-w-[570px] text-[32px] font-light leading-[1.05] tracking-[-0.035em] text-[#303b34] sm:text-[40px]"
//                   style={{
//                     fontFamily:
//                       FONT_FAMILY_PLAYFAIR,
//                   }}
//                 >
//                   {storyData.title}
//                 </h2>


//                 <div className="mt-5 max-w-[590px] space-y-3">

//                   {storyData.paragraphs.map(
//                     (paragraph, index) => (
//                       <p
//                         key={index}
//                         className="text-[11px] leading-5 text-[#70776f] sm:text-[12px]"
//                         style={{
//                           fontFamily:
//                             FONT_FAMILY_INTER,
//                         }}
//                       >
//                         {paragraph}
//                       </p>
//                     )
//                   )}

//                 </div>


//                 {/* trust */}

//                 <div className="mt-6 grid max-w-[600px] grid-cols-2 gap-2">

//                   {storyData.trustIndicators.map(
//                     (indicator, index) => {
//                       const Icon = getIcon(
//                         indicator.icon
//                       );

//                       return (
//                         <div
//                           key={index}
//                           className="group flex items-center gap-2.5 rounded-xl border border-[#e2e3dd] bg-white/70 px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b9c6b3] hover:bg-white"
//                         >

//                           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#edf1ea] text-[#748571] transition-colors group-hover:bg-[#748571] group-hover:text-white">

//                             <Icon className="text-[9px]" />

//                           </div>

//                           <span
//                             className="text-[8px] font-medium text-[#59635c] sm:text-[9px]"
//                             style={{
//                               fontFamily:
//                                 FONT_FAMILY_INTER,
//                             }}
//                           >
//                             {indicator.label}
//                           </span>

//                         </div>
//                       );
//                     }
//                   )}

//                 </div>

//               </motion.div>


//               {/* IMAGE - Reduced Height */}

//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{
//                   once: true,
//                   amount: 0.2,
//                 }}
//                 variants={fadeRight}
//                 className="relative"
//               >

//                 <div className="relative rounded-[24px] bg-[#eeeae3] p-1.5 shadow-[0_20px_60px_rgba(55,60,53,0.08)]">

//                   <div className="relative aspect-[1.4/1] overflow-hidden rounded-[20px]">

//                     <AnimatePresence mode="wait">

//                       {storyData.images.map(
//                         (image, index) =>
//                           index ===
//                           currentSlide && (
//                             <motion.img
//                               key={`${image.src}-${index}`}
//                               src={image.src}
//                               alt={
//                                 image.alt ||
//                                 'Beauty story'
//                               }
//                               initial={{
//                                 opacity: 0,
//                                 scale: 1.06,
//                               }}
//                               animate={{
//                                 opacity: 1,
//                                 scale: 1,
//                               }}
//                               exit={{
//                                 opacity: 0,
//                                 scale: 1.02,
//                               }}
//                               transition={{
//                                 duration: 0.7,
//                               }}
//                               className="absolute inset-0 h-full w-full object-cover"
//                               onError={(e) => {
//                                 e.currentTarget.src =
//                                   '/images/bg6.png';
//                               }}
//                             />
//                           )
//                       )}

//                     </AnimatePresence>


//                     <div className="absolute inset-0 bg-gradient-to-t from-[#26372f]/30 via-transparent to-transparent" />


//                     {/* slide counter */}

//                     <div className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/15 px-2.5 py-1 text-[6px] font-medium tracking-[0.2em] text-white backdrop-blur-md">
//                       {String(
//                         currentSlide + 1
//                       ).padStart(2, '0')}{' '}
//                       /{' '}
//                       {String(
//                         storyData.images.length
//                       ).padStart(2, '0')}
//                     </div>


//                     {/* arrows */}

//                     <button
//                       type="button"
//                       onClick={prevSlide}
//                       aria-label="Previous story image"
//                       className="absolute left-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/80 text-[#45554b] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white"
//                     >
//                       <FaChevronLeft className="text-[10px]" />
//                     </button>


//                     <button
//                       type="button"
//                       onClick={nextSlide}
//                       aria-label="Next story image"
//                       className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/80 text-[#45554b] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white"
//                     >
//                       <FaChevronRight className="text-[10px]" />
//                     </button>


//                     {/* dots */}

//                     <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">

//                       {storyData.images.map(
//                         (_, index) => (
//                           <button
//                             key={index}
//                             type="button"
//                             onClick={() =>
//                               goToSlide(
//                                 index
//                               )
//                             }
//                             className={`h-1 rounded-full transition-all duration-300 ${
//                               index ===
//                               currentSlide
//                                 ? 'w-5 bg-white'
//                                 : 'w-1 bg-white/50'
//                             }`}
//                           />
//                         )
//                       )}

//                     </div>

//                   </div>

//                 </div>


//                 {/* floating quote */}

//                 <div className="absolute -bottom-4 -left-4 hidden max-w-[200px] rounded-2xl border border-white/80 bg-white/90 p-3 shadow-xl backdrop-blur-xl sm:block">

//                   <FaQuoteLeft className="mb-1.5 text-[10px] text-[#9aaa94]" />

//                   <p
//                     className="text-[8px] leading-4 text-[#687168]"
//                     style={{
//                       fontFamily:
//                         FONT_FAMILY_INTER,
//                     }}
//                   >
//                     Beauty is not about being
//                     perfect. It's about feeling
//                     confident in your own skin.
//                   </p>

//                 </div>

//               </motion.div>

//             </div>

//           </div>

//         </section>



//         {/* ==================================================
//             WHY CHOOSE US - Fixed Overlay
//         ================================================== */}

// <section className="relative overflow-hidden bg-[#F8F5F0] px-4 py-8 sm:px-7 sm:py-10 lg:px-10 lg:py-12">

//   {/* Premium Background */}
//   <div className="pointer-events-none absolute inset-0">

//     {/* Background Image */}
//     <div
//       className="absolute inset-0 bg-cover bg-center opacity-[0.16]"
//       style={{
//         backgroundImage: `url('${whyChooseUs?.backgroundImage || '/images/bg5.PNG'}')`,
//       }}
//     />

//     {/* Warm Ivory + Blush Overlay */}
//     <div className="absolute inset-0 bg-gradient-to-br from-[#F8F5F0]/95 via-[#F6EFEA]/80 to-[#EAD9D6]/60" />

//     {/* Soft Premium Glow - Top Right */}
//     <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#E8C8C7]/20 blur-3xl" />

//     {/* Soft Sage Glow - Bottom Left */}
//     <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#B7C2B1]/20 blur-3xl" />

//     {/* Center Light */}
//     <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />

//     {/* Subtle Decorative Blurs */}
//     <div className="absolute left-0 top-10 h-40 w-40 rounded-full bg-white/40 blur-3xl" />
//     <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#D8B5B5]/10 blur-3xl" />

//   </div>

//   <div className="relative z-10 mx-auto max-w-[1400px]">

//     <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">

//       {/* LEFT */}
//       <motion.div
//         initial="hidden"
//         whileInView="visible"
//         viewport={{
//           once: true,
//           amount: 0.2,
//         }}
//         variants={fadeLeft}
//       >

//         <div className="mb-2.5 flex items-center gap-2.5">

//           <span className="h-px w-6 bg-[#B88C8D]" />

//           <span
//             className="text-[6px] uppercase tracking-[0.3em] text-[#9C7072]"
//             style={{
//               fontFamily: FONT_FAMILY_INTER,
//             }}
//           >
//             {whyChooseUs?.badge || 'Why Choose Us'}
//           </span>

//         </div>

//         <h2
//           className="max-w-[500px] text-[28px] font-light leading-[1.05] tracking-[-0.035em] text-[#34352F] sm:text-[36px]"
//           style={{
//             fontFamily: FONT_FAMILY_PLAYFAIR,
//           }}
//         >
//           {whyChooseUs?.title ||
//             'Beauty Is Power, A Smile Is Its Word'}
//         </h2>

//         <p
//           className="mt-3 max-w-[480px] text-[9px] leading-5 text-[#77766F] sm:text-[10px]"
//           style={{
//             fontFamily: FONT_FAMILY_INTER,
//           }}
//         >
//           {whyChooseUs?.description ||
//             'We believe that true beauty starts from within. Our carefully selected products are designed to help you feel confident, radiant, and completely yourself.'}
//         </p>

//         <Link
//           href={
//             whyChooseUs?.buttonLink ||
//             '/products'
//           }
//           className="group mt-4 inline-flex items-center gap-2 rounded-full bg-[#4C554B] px-4 py-2 text-[7px] font-medium uppercase tracking-[0.12em] text-white shadow-[0_8px_25px_rgba(60,65,58,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3E463E]"
//         >
//           {whyChooseUs?.buttonText ||
//             'Explore More'}

//           <FaArrowRight className="text-[8px] transition-transform group-hover:translate-x-1" />
//         </Link>

//       </motion.div>


//       {/* RIGHT CARDS */}
//       <motion.div
//         variants={stagger}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{
//           once: true,
//           amount: 0.2,
//         }}
//         className="grid grid-cols-2 gap-2 sm:gap-2.5"
//       >

//         {whyChooseUsCards.map(
//           (item, index) => {
//             const Icon = getIcon(item.icon);

//             return (
//               <motion.div
//                 key={item.title || index}
//                 variants={scaleFade}
//                 className="group relative overflow-hidden rounded-[14px] border border-white/80 bg-white/65 p-3 shadow-[0_8px_30px_rgba(70,62,55,0.06)] backdrop-blur-md transition-all duration-400 hover:-translate-y-0.5 hover:bg-white/85 hover:shadow-[0_12px_35px_rgba(70,62,55,0.10)] sm:p-4"
//               >

//                 {/* Card Glow */}
//                 <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-[#E8C8C7]/30 blur-2xl transition-all duration-500 group-hover:scale-150" />

//                 {/* Bottom Accent */}
//                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#B88C8D] to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-40" />

//                 <div className="relative z-10">

//                   <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#DED8D1] bg-[#F5F1EC] text-[#81786E] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#8B746E] group-hover:text-white sm:h-8 sm:w-8">

//                     <Icon className="text-[9px] sm:text-[10px]" />

//                   </div>

//                   <h3
//                     className="text-[12px] text-[#45463F] sm:text-[14px]"
//                     style={{
//                       fontFamily: FONT_FAMILY_PLAYFAIR,
//                     }}
//                   >
//                     {item.title}
//                   </h3>

//                   <p
//                     className="mt-1 text-[6.5px] leading-3.5 text-[#85827B] sm:text-[7.5px]"
//                     style={{
//                       fontFamily: FONT_FAMILY_INTER,
//                     }}
//                   >
//                     {item.description}
//                   </p>

//                   <div className="mt-1.5 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">

//                     <span className="h-0.5 w-3 rounded-full bg-[#B88C8D]/40" />

//                     <span className="h-0.5 w-0.5 rounded-full bg-[#B88C8D]/60" />

//                   </div>

//                 </div>

//               </motion.div>
//             );
//           }
//         )}

//       </motion.div>

//     </div>

//   </div>

// </section>

//         {/* ==================================================
//             CURATED FOR YOU
//         ================================================== */}

//               {/* ==================================================
//             CURATED FOR YOU - Premium with Auto-Scroll (No Shadows)
//         ================================================== */}

//         <section className="bg-[#faf9f5] px-4 py-10 sm:px-7 sm:py-14 lg:px-10 lg:py-8 overflow-hidden relative">
          
//           {/* Decorative background elements */}
//           <div className="pointer-events-none absolute inset-0">
//             <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#d4d9ce]/20 blur-3xl" />
//             <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#c5cbbf]/20 blur-3xl" />
//           </div>

//           <div className="mx-auto max-w-[1400px] relative z-10">

//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{
//                 once: true,
//               }}
//               variants={fadeUp}
//               className="mx-auto mb-10 max-w-[650px] text-center"
//             >

//               <div className=" flex items-center justify-center gap-3">

//                 <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#aeb6aa]" />

//                 <span
//                   className="text-[8px] uppercase tracking-[0.35em] text-[#818a81]"
//                   style={{
//                     fontFamily:
//                       FONT_FAMILY_INTER,
//                   }}
//                 >
//                   {curatedForYou?.badge ||
//                     'Curated For You'}
//                 </span>

//                 <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#aeb6aa]" />

//               </div>


//               <h2
//                 className="text-[32px] font-light tracking-[-0.035em] text-[#344039] sm:text-[42px]"
//                 style={{
//                   fontFamily:
//                     FONT_FAMILY_PLAYFAIR,
//                 }}
//               >
//                 {curatedForYou?.title ||
//                   'Beauty, Curated For You'}
//               </h2>


//               <p
//                 className="mx-auto mt-3 max-w-[580px] text-[10px] leading-5 text-[#777e77] sm:text-[11px]"
//                 style={{
//                   fontFamily:
//                     FONT_FAMILY_INTER,
//                 }}
//               >
//                 {curatedForYou?.description ||
//                   'Discover our handpicked collection of premium beauty products, carefully selected to enhance your natural beauty.'}
//               </p>

//             </motion.div>


//             {/* Categories - Single Row with Auto-Scroll */}

//             {categories.length > 0 && (
//               <div className="relative">
                
//                 {/* NO SHADOWS - Removed gradient fade divs */}

//                 {/* Auto-scroll container */}
//                 <div className="overflow-hidden">
//                   <div 
//                     className="flex gap-4 pb-4 auto-scroll-track"
//                     style={{
//                       width: 'max-content',
//                       animation: 'scrollCategories 30s linear infinite',
//                     }}
//                   >
//                     {/* Double the categories for seamless loop effect */}
//                     {[...categories, ...categories].map((category, index) => (
//                       <motion.div
//                         key={`${category._id || index}-${index}`}
//                         className="flex-shrink-0 w-[160px] sm:w-[180px] lg:w-[200px]"
//                       >
//                         <Link
//                           href={`/products?category=${category._id}`}
//                           className="group block"
//                         >
//                           <div className="relative overflow-hidden rounded-[20px] bg-[#e9eee6] shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_45px_rgba(70,85,73,0.15)]">

//                             <div className="aspect-[0.9/1] overflow-hidden">

//                               <img
//                                 src={
//                                   category
//                                     .image
//                                     ?.url ||
//                                   category.image ||
//                                   '/images/bg6.png'
//                                 }
//                                 alt={
//                                   category.name
//                                 }
//                                 className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
//                                 onError={(
//                                   e
//                                 ) => {
//                                   e.currentTarget.src =
//                                     '/images/bg6.png';
//                                 }}
//                               />

//                             </div>

//                             <div className="absolute inset-0 bg-gradient-to-t from-[#25352d]/85 via-[#25352d]/20 to-transparent" />

//                             {/* Premium badge */}
//                             <div className="absolute left-3 top-3">
//                               <span className="rounded-full border border-white/30 bg-black/20 px-2.5 py-1 text-[5px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
//                                 Premium
//                               </span>
//                             </div>

//                             {/* Arrow on hover */}
//                             <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#52645a] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
//                               <FaArrowRight className="-rotate-45 text-[8px]" />
//                             </div>

//                             <div className="absolute bottom-3 left-3 right-3">

//                               <h3
//                                 className="truncate text-[13px] text-white sm:text-[15px]"
//                                 style={{
//                                   fontFamily:
//                                     FONT_FAMILY_PLAYFAIR,
//                                 }}
//                               >
//                                 {category.name}
//                               </h3>

                           

//                               {/* Decorative line on hover */}
//                               <div className="mt-1.5 h-[1.5px] w-0 rounded-full bg-white/50 transition-all duration-500 group-hover:w-8" />

//                             </div>

//                           </div>
//                         </Link>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Auto-scroll animation styles */}
//                 <style jsx>{`
//                   .auto-scroll-track {
//                     animation: scrollCategories 30s linear infinite;
//                   }
                  
//                   .auto-scroll-track:hover {
//                     animation-play-state: paused;
//                   }
                  
//                   @keyframes scrollCategories {
//                     0% {
//                       transform: translateX(0);
//                     }
//                     100% {
//                       transform: translateX(-50%);
//                     }
//                   }
                  
//                   @media (max-width: 640px) {
//                     .auto-scroll-track {
//                       animation-duration: 25s;
//                     }
//                   }
//                 `}</style>

//               </div>
//             )}


//             {/* View All Button - Premium */}

//             <motion.div
//               initial={{
//                 opacity: 0,
//                 y: 20,
//               }}
//               whileInView={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               viewport={{
//                 once: true,
//               }}
//               className="mt-8 text-center"
//             >

//               <Link
//                 href={
//                   curatedForYou?.buttonLink ||
//                   '/products'
//                 }
//                 className="group inline-flex items-center gap-3 rounded-full border border-[#aeb8ac] bg-white/80 px-6 py-2.5 text-[8px] font-medium uppercase tracking-[0.12em] text-[#56655b] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#53665a] hover:text-white hover:shadow-lg"
//                 style={{
//                   fontFamily:
//                     FONT_FAMILY_INTER,
//                 }}
//               >
//                 {curatedForYou?.buttonText ||
//                   'View All Products'}

//                 <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />

//               </Link>

//             </motion.div>

//           </div>

//         </section>


//         {/* ==================================================
//             FINAL CTA
//         ================================================== */}

//         <section className="relative min-h-[400px] overflow-hidden">

//           <div className="absolute inset-0">

//             <img
//               src={
//                 cta?.backgroundImage ||
//                 '/images/cta-bg.jpg'
//               }
//               alt=""
//               className="h-full w-full object-cover"
//               onError={(e) => {
//                 e.currentTarget.src =
//                   '/images/bg5.PNG';
//               }}
//             />

//             <div className="absolute inset-0 bg-[#405348]/75" />

//             <div className="absolute inset-0 bg-gradient-to-r from-[#304239]/70 via-[#506257]/40 to-transparent" />

//           </div>


//           {/* decorative circles */}

//           <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />

//           <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />


//           <div className="relative z-10 mx-auto flex min-h-[400px] max-w-[1400px] items-center px-5 py-16 sm:px-8 lg:px-10">

//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{
//                 once: true,
//               }}
//               variants={fadeLeft}
//               className="max-w-[620px]"
//             >

//               <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">

//                 <GiSparkles className="text-[10px] text-[#e8d8c9]" />

//                 <span
//                   className="text-[7px] uppercase tracking-[0.25em] text-white/80"
//                   style={{
//                     fontFamily:
//                       FONT_FAMILY_INTER,
//                   }}
//                 >
//                   Need Assistance?
//                 </span>

//               </div>


//               <h2
//                 className="text-[44px] font-light leading-[0.95] tracking-[-0.035em] text-white sm:text-[58px]"
//                 style={{
//                   fontFamily:
//                     FONT_FAMILY_PLAYFAIR,
//                 }}
//               >
//                 {cta?.title ||
//                   "We're Here to Help"}
//               </h2>


//               <p
//                 className="mt-5 max-w-[520px] text-[11px] leading-6 text-white/70 sm:text-[12px]"
//                 style={{
//                   fontFamily:
//                     FONT_FAMILY_INTER,
//                 }}
//               >
//                 {cta?.description ||
//                   'Our beauty experts are ready to assist you with any questions about products or orders.'}
//               </p>


//               <div className="mt-7 flex flex-wrap gap-3">

//                 <Link
//                   href={
//                     cta?.buttonLink ||
//                     '/products'
//                   }
//                   className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[9px] font-medium uppercase tracking-[0.12em] text-[#506257] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#f4efe9]"
//                 >
//                   {cta?.buttonText ||
//                     'Shop Now'}

//                   <FaArrowRight className="transition-transform group-hover:translate-x-1" />

//                 </Link>


//                 <Link
//                   href={
//                     cta?.secondaryButtonLink ||
//                     '/contact'
//                   }
//                   className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-[9px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
//                 >
//                   {cta?.secondaryButtonText ||
//                     'Contact Us'}
//                 </Link>

//               </div>

//             </motion.div>

//           </div>

//         </section>


//         {/* ==================================================
//             VIDEO MODAL
//         ================================================== */}

//         <AnimatePresence>

//           {showVideo && (
//             <motion.div
//               initial={{
//                 opacity: 0,
//               }}
//               animate={{
//                 opacity: 1,
//               }}
//               exit={{
//                 opacity: 0,
//               }}
//               className="fixed inset-0 z-[999] flex items-center justify-center bg-[#18221d]/80 p-5 backdrop-blur-md"
//               onClick={() =>
//                 setShowVideo(false)
//               }
//             >

//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   scale: 0.94,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   scale: 1,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   scale: 0.94,
//                 }}
//                 transition={{
//                   duration: 0.3,
//                 }}
//                 onClick={(e) =>
//                   e.stopPropagation()
//                 }
//                 className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-[24px] border border-white/20 bg-[#26332c] shadow-2xl"
//               >

//                 <div className="flex h-full flex-col items-center justify-center text-center text-white">

//                   <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">

//                     <FaPlay className="ml-1 text-lg" />

//                   </div>

//                   <h3
//                     className="text-3xl font-light"
//                     style={{
//                       fontFamily:
//                         FONT_FAMILY_PLAYFAIR,
//                     }}
//                   >
//                     BeautyBucket
//                   </h3>

//                   <p
//                     className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/50"
//                     style={{
//                       fontFamily:
//                         FONT_FAMILY_INTER,
//                     }}
//                   >
//                     Your beauty journey starts here
//                   </p>

//                 </div>


//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowVideo(false)
//                   }
//                   className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur-md transition hover:bg-white/20"
//                   aria-label="Close video"
//                 >
//                   ×
//                 </button>

//               </motion.div>

//             </motion.div>
//           )}

//         </AnimatePresence>

//       </main>

//       <Footer />
//     </>
//   );
// }


// app/about/AboutClient.js
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import {
  FaHeart,
  FaLeaf,
  FaShippingFast,
  FaShieldAlt,
  FaStar,
  FaUsers,
  FaAward,
  FaGlobe,
  FaArrowRight,
  FaCheckCircle,
  FaGift,
  FaSmile,
  FaRocket,
  FaStore,
  FaTrophy,
  FaChevronLeft,
  FaChevronRight,
  FaGem,
  FaHands,
  FaSeedling,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTruck,
  FaPlay,
  FaQuoteLeft,
} from 'react-icons/fa';

import {
  GiLipstick,
  GiSparkles,
} from 'react-icons/gi';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

/* =========================================================
   FONTS
========================================================= */

const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

/* =========================================================
   ICON MAP
========================================================= */

const ICON_MAP = {
  FaHeart,
  FaLeaf,
  FaShippingFast,
  FaShieldAlt,
  FaStar,
  FaUsers,
  FaAward,
  FaGlobe,
  FaCheckCircle,
  FaGift,
  FaSmile,
  FaRocket,
  FaStore,
  FaTrophy,
  FaGem,
  FaHands,
  FaSeedling,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTruck,
  GiLipstick,
  GiSparkles,
};

const getIcon = (iconName) => {
  const Icon = ICON_MAP[iconName];
  return Icon || FaStar;
};

/* =========================================================
   ANIMATIONS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const scaleFade = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   DEFAULT STORY DATA
========================================================= */

const getStoryData = (story) => {
  return {
    badge: story?.badge || 'Our Story',
    title: story?.title || 'A Journey of Beauty & Trust',
    paragraphs: story?.paragraphs?.length > 0
      ? story.paragraphs
      : [
          'BeautyBucket was founded with a simple yet powerful vision: to make premium beauty products accessible to everyone in Bangladesh.',
          'We carefully curate each product in our collection, ensuring only the highest quality, authentic, and effective products make it to our shelves.',
          'Our commitment to quality, transparency, and customer satisfaction has made us a beloved brand among thousands of customers across the country.',
        ],
    trustIndicators: story?.trustIndicators?.length > 0
      ? story.trustIndicators
      : [
          { icon: 'FaCheckCircle', label: 'Quality Assured' },
          { icon: 'FaShippingFast', label: 'Fast Delivery' },
          { icon: 'FaGift', label: 'Shipping Across the Country' },
          { icon: 'FaSmile', label: '100% Satisfaction' },
        ],
    images: story?.images?.length > 0
      ? story.images
      : [
          { src: '/images/about1.jpg', alt: 'Happy customer' },
          { src: '/images/bg6.png', alt: 'Beauty products display' },
          { src: '/images/bg9.PNG', alt: 'Product curation' },
          { src: '/images/bg8.png', alt: 'Beauty team' },
        ],
  };
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AboutClient() {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  /* =======================================================
     DEFAULT DATA
  ======================================================= */

  const getDefaultData = () => ({
    hero: {
      image: '/images/bg1.png',
      leftImage: '/images/bg1.png',
      overlayImage: '/images/bg2.jpg',
      rightImage: '/images/bg8.png',
      secondaryImage: '/images/bg8.png',
      badge: 'About Us',
      title: 'Redefining Beauty',
      highlightedText: 'for Everyone',
      description: 'We believe beauty is for everyone. Our mission is to bring you the finest beauty products with expert care, fast delivery, and a touch of luxury.',
      buttonText: 'Explore Products',
      buttonLink: '/products',
      secondaryButtonText: 'Get in Touch',
      secondaryButtonLink: '/contact',
    },
    stats: {
      backgroundImage: '/images/bg5.PNG',
      items: [
        { icon: 'FaAward', value: '50+', label: 'Premium Brands' },
        { icon: 'FaUsers', value: '5K+', label: 'Happy Customers' },
        { icon: 'GiLipstick', value: '500+', label: 'Products' },
        { icon: 'FaStar', value: '98%', label: 'Satisfaction Rate' },
      ],
    },
    story: {
      badge: 'Our Story',
      title: 'A Journey of Beauty & Trust',
      paragraphs: [
        'BeautyBucket was founded with a simple yet powerful vision: to make premium beauty products accessible to everyone in Bangladesh.',
        'We carefully curate each product in our collection, ensuring only the highest quality, authentic, and effective products make it to our shelves.',
        'Our commitment to quality, transparency, and customer satisfaction has made us a beloved brand among thousands of customers across the country.',
      ],
      trustIndicators: [
        { icon: 'FaCheckCircle', label: 'Quality Assured' },
        { icon: 'FaShippingFast', label: 'Fast Delivery' },
        { icon: 'FaGift', label: 'Shipping Across the Country' },
        { icon: 'FaSmile', label: '100% Satisfaction' },
      ],
      images: [
        { src: '/images/about1.jpg', alt: 'Happy customer' },
        { src: '/images/bg6.png', alt: 'Beauty products display' },
        { src: '/images/bg9.PNG', alt: 'Product curation' },
        { src: '/images/bg8.png', alt: 'Beauty team' },
      ],
    },
    whyChooseUs: {
      backgroundImage: '/images/bg5.PNG',
      badge: 'Why Choose Us',
      title: 'Beauty Is Power, A Smile Is Its Word',
      description: 'We believe that true beauty starts from within. Our carefully selected products are designed to help you feel confident, radiant, and completely yourself.',
      buttonText: 'Explore More',
      buttonLink: '/products',
      cards: [
        { icon: 'FaLeaf', title: '100% Organic', description: 'Carefully selected products made with ingredients you can trust.' },
        { icon: 'FaHeart', title: 'Improve Health', description: 'Beauty essentials designed to support your everyday self-care.' },
        { icon: 'FaShieldAlt', title: '100% Authentic', description: 'Every product is verified for authenticity and quality.' },
        { icon: 'FaTruck', title: 'Fast Delivery', description: 'Quick and reliable delivery right to your doorstep.' },
      ],
    },
    curatedForYou: {
      badge: 'Curated For You',
      title: 'Beauty, Curated For You',
      description: 'Discover our handpicked collection of premium beauty products, carefully selected to enhance your natural beauty.',
      buttonText: 'View All Products',
      buttonLink: '/products',
      categories: [],
    },
    cta: {
      backgroundImage: '/images/cta-bg.jpg',
      title: "We're Here to Help",
      description: 'Our beauty experts are ready to assist you with any questions about products or orders.',
      buttonText: 'Shop Now',
      buttonLink: '/products',
      secondaryButtonText: 'Contact Us',
      secondaryButtonLink: '/contact',
    },
  });

  /* =======================================================
     FETCH DATA
  ======================================================= */

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/about/page`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch about data: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setAboutData(result.data);
        } else {
          setAboutData(getDefaultData());
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
        setAboutData(getDefaultData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  /* =======================================================
     AUTO STORY SLIDER
  ======================================================= */

  useEffect(() => {
    if (!aboutData?.story?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutData.story.images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [aboutData?.story?.images?.length]);

  const nextSlide = () => {
    if (!aboutData?.story?.images?.length) return;
    setCurrentSlide((prev) => (prev + 1) % aboutData.story.images.length);
  };

  const prevSlide = () => {
    if (!aboutData?.story?.images?.length) return;
    setCurrentSlide((prev) => (prev - 1 + aboutData.story.images.length) % aboutData.story.images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-[#f7f4ef]">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-[3px] border-[#879681] border-t-transparent" />
            <p className="mt-4 text-xs tracking-wide text-[#687269]" style={{ fontFamily: FONT_FAMILY_INTER }}>
              Loading about page...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* =======================================================
     DATA
  ======================================================= */

  const data = aboutData || getDefaultData();
  const { hero, stats, story, whyChooseUs, curatedForYou, cta } = data;
  const storyData = getStoryData(story);
  const statsItems = stats?.items || stats || [];
  const whyChooseUsCards = whyChooseUs?.cards || [];
  const categories = curatedForYou?.categories || [];

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <>
      <Navbar />

      <main className="relative -mt-24 overflow-hidden bg-[#f7f4ef]">

        {/* ==================================================
            HERO - Mobile Optimized
        ================================================== */}

        <section className="relative px-3 pb-8 pt-5 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8 lg:pb-16">
          {/* Soft background shapes */}
          <div className="pointer-events-none absolute left-[-180px] top-[100px] h-[400px] w-[400px] rounded-full bg-[#d7dfd2]/30 blur-[100px]" />
          <div className="pointer-events-none absolute right-[-160px] top-[-80px] h-[450px] w-[450px] rounded-full bg-[#e7d9d0]/30 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-[1500px]">

            <div className="grid items-center gap-4 lg:grid-cols-[0.8fr_1.4fr_0.8fr] xl:gap-8">

              {/* LEFT IMAGE - Hidden on mobile, visible on large */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeLeft}
                className="relative hidden lg:block"
              >
                <div className="relative overflow-hidden rounded-[28px] bg-white p-1.5 shadow-[0_25px_80px_rgba(45,55,48,0.10)]">
                  <div className="relative aspect-[0.82/1] overflow-hidden rounded-[23px]">
                    <img
                      src={hero?.leftImage || hero?.image || '/images/bg1.png'}
                      alt="Beauty"
                      className="h-full w-full object-cover transition-transform duration-[1.5s] hover:scale-105"
                      onError={(e) => { e.currentTarget.src = '/images/bg1.png'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24372e]/25 via-transparent to-white/5" />
                  </div>
                </div>
              </motion.div>

              {/* CENTER - Mobile Optimized */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="relative px-2 text-center sm:px-5"
              >
                {/* label */}
                <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5">
                  <span className="h-px w-5 bg-[#a9afa5] lg:mt-4 mt-7 -mb-3 sm:w-8" />
                  <span
                    className="text-[7px] lg:mt-4 mt-7 -mb-3 font-medium uppercase tracking-[0.3em] text-[#7f887e] sm:text-[9px] sm:tracking-[0.38em]"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    {hero?.badge || 'About Us'}
                  </span>
                  <span className="h-px w-5 bg-[#a9afa5] lg:mt-4 mt-7 -mb-3 sm:w-8" />
                </div>

                {/* heading - Responsive sizes */}
                <h1
                  className="text-[28px] font-light leading-[0.98] tracking-[-0.04em] text-[#29362f] sm:text-[52px] md:text-[60px] lg:text-[56px] xl:text-[70px]"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  {hero?.title || 'Redefining Beauty'}
                  <br />
                  <span className="italic text-[#84947f]">
                    {hero?.highlightedText || 'for Everyone'}
                  </span>
                </h1>

                {/* decorative line */}
                <div className="my-4 flex items-center justify-center gap-2 sm:my-6">
                  <span className="h-px w-8 bg-[#b5bcb2] sm:w-12" />
                  <span className="h-1 w-1 rounded-full bg-[#879681] sm:h-1.5 sm:w-1.5" />
                  <span className="h-px w-8 bg-[#b5bcb2] sm:w-12" />
                </div>

                {/* description - Smaller on mobile */}
                <p
                  className="mx-auto max-w-[560px] text-[10px] leading-5 text-[#687169] sm:text-[13px] sm:leading-6"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  {hero?.description || 'We believe beauty is for everyone. Our mission is to bring you the finest beauty products with expert care, fast delivery, and a touch of luxury.'}
                </p>

                {/* buttons - Smaller on mobile */}
                <div className="mt-5 flex flex-wrap justify-center gap-2 sm:mt-7 sm:gap-3">
                  <Link
                    href={hero?.buttonLink || '/products'}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-[#52665a] px-4 py-2 text-[7px] font-medium uppercase tracking-[0.1em] text-white shadow-[0_10px_30px_rgba(82,102,90,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#405347] hover:shadow-[0_15px_35px_rgba(82,102,90,0.25)] sm:px-6 sm:py-3 sm:text-[9px] sm:tracking-[0.12em]"
                  >
                    {hero?.buttonText || 'Explore Products'}
                    <FaArrowRight className="text-[8px] transition-transform duration-300 group-hover:translate-x-1 sm:text-[10px]" />
                  </Link>

                  <Link
                    href={hero?.secondaryButtonLink || '/contact'}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#bfc5bd] bg-white/60 px-4 py-2 text-[7px] font-medium uppercase tracking-[0.1em] text-[#4e5b53] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white sm:px-6 sm:py-3 sm:text-[9px] sm:tracking-[0.12em]"
                  >
                    {hero?.secondaryButtonText || 'Get in Touch'}
                  </Link>
                </div>

                {/* tiny brand line */}
                <div className="mt-4 -mb-10 flex items-center justify-center gap-2 text-[6px] uppercase tracking-[0.25em] text-[#a1a69f] sm:mt-6 sm:text-[8px] sm:tracking-[0.3em]">
                  <FaGem className="text-[6px] sm:text-[8px]" />
                  <span>Beauty • Care • Confidence</span>
                </div>
              </motion.div>

              {/* RIGHT IMAGE - Hidden on mobile, visible on large */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeRight}
                className="relative hidden lg:block"
              >
                <div className="relative overflow-hidden rounded-[28px] bg-white p-1.5 shadow-[0_25px_80px_rgba(45,55,48,0.10)]">
                  <div className="relative aspect-[0.82/1] overflow-hidden rounded-[23px]">
                    <img
                      src={hero?.rightImage || hero?.secondaryImage || '/images/bg8.png'}
                      alt="Beauty care"
                      className="h-full w-full object-cover transition-transform duration-[1.5s] hover:scale-105"
                      onError={(e) => { e.currentTarget.src = '/images/bg8.png'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24372e]/20 via-transparent to-transparent" />
                    <div className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/80 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#52665a] shadow-lg backdrop-blur-md">
                      Premium
                    </div>
                  </div>
                </div>
                <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-[#d9e1d5]/50 blur-2xl" />
              </motion.div>

              {/* MOBILE IMAGES - 2 column grid */}
              <div className="mt-2 grid grid-cols-2 gap-2 lg:hidden sm:gap-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden rounded-[16px] bg-white p-1 shadow-lg sm:rounded-[20px]"
                >
                  <div className="aspect-square overflow-hidden rounded-[14px] sm:rounded-[17px]">
                    <img
                      src={hero?.leftImage || hero?.image || '/images/bg1.png'}
                      alt="Beauty"
                      className="h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/images/bg1.png'; }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative overflow-hidden rounded-[16px] bg-white p-1 shadow-lg sm:rounded-[20px]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[14px] sm:rounded-[17px]">
                    <img
                      src={hero?.rightImage || hero?.secondaryImage || '/images/bg8.png'}
                      alt="Beauty"
                      className="h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/images/bg8.png'; }}
                    />
                    <span className="absolute right-1.5 top-1.5 rounded-full bg-[#52665a]/90 px-1.5 py-0.5 text-[5px] font-bold uppercase tracking-wider text-white sm:right-2 sm:top-2 sm:px-2 sm:py-1 sm:text-[6px]">
                      Premium
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================================================
            STATS - Mobile Optimized
        ================================================== */}

        <section
          className="relative overflow-hidden py-6 sm:py-8 lg:py-12"
          style={{
            backgroundImage: `url('${stats?.backgroundImage || '/images/bg5.PNG'}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#71816F]/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#71816F]/75 via-[#71816F]/55 to-[#71816F]/70" />

          <div className="relative z-10 mx-auto max-w-[1450px] px-3 sm:px-7 lg:px-10">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 lg:gap-5"
            >
              {statsItems.map((stat, index) => {
                const Icon = getIcon(stat.icon);
                return (
                  <motion.div
                    key={index}
                    variants={scaleFade}
                    className="group relative overflow-hidden rounded-[14px] border border-white/40 bg-white/75 p-3 text-center shadow-[0_12px_35px_rgba(40,55,45,0.15)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_18px_45px_rgba(40,55,45,0.20)] sm:p-5 lg:p-6"
                  >
                    <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#71816F]/20 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                    <div className="relative z-10">
                      <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#71816F]/20 bg-[#71816F]/10 text-[#71816F] shadow-sm transition-all duration-300 group-hover:bg-[#71816F] group-hover:text-white sm:h-11 sm:w-11">
                        <Icon className="text-[10px] sm:text-sm" />
                      </div>
                      <div
                        className="text-xl font-medium tracking-tight text-[#526257] sm:text-3xl"
                        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="mt-1 text-[6px] font-medium uppercase tracking-[0.14em] text-[#68736A] sm:mt-1.5 sm:text-[8px] sm:tracking-[0.16em]"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ==================================================
            OUR STORY - Mobile Optimized
        ================================================== */}

        <section id="story" className="bg-[#faf9f5] px-3 py-8 sm:px-7 sm:py-14 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid items-center gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

              {/* TEXT */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeLeft}
              >
                <div className="mb-2 flex items-center gap-2 sm:mb-3">
                  <span className="h-px w-6 bg-[#879681] sm:w-8" />
                  <span
                    className="text-[7px] font-medium uppercase tracking-[0.25em] text-[#7e897e] sm:text-[8px] sm:tracking-[0.3em]"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    {storyData.badge}
                  </span>
                </div>

                <h2
                  className="max-w-[570px] text-[24px] font-light leading-[1.05] tracking-[-0.035em] text-[#303b34] sm:text-[40px]"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  {storyData.title}
                </h2>

                <div className="mt-3 max-w-[590px] space-y-2 sm:mt-5 sm:space-y-3">
                  {storyData.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[10px] leading-5 text-[#70776f] sm:text-[12px]"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* trust indicators */}
                <div className="mt-4 grid max-w-[600px] grid-cols-2 gap-1.5 sm:mt-6 sm:gap-2">
                  {storyData.trustIndicators.map((indicator, index) => {
                    const Icon = getIcon(indicator.icon);
                    return (
                      <div
                        key={index}
                        className="group flex items-center gap-2 rounded-xl border border-[#e2e3dd] bg-white/70 px-2 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b9c6b3] hover:bg-white sm:px-3 sm:py-2.5"
                      >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#edf1ea] text-[#748571] transition-colors group-hover:bg-[#748571] group-hover:text-white sm:h-6 sm:w-6">
                          <Icon className="text-[7px] sm:text-[9px]" />
                        </div>
                        <span
                          className="text-[7px] font-medium text-[#59635c] sm:text-[9px]"
                          style={{ fontFamily: FONT_FAMILY_INTER }}
                        >
                          {indicator.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* IMAGE - Mobile Optimized */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeRight}
                className="relative"
              >
                <div className="relative rounded-[20px] bg-[#eeeae3] p-1 shadow-[0_20px_60px_rgba(55,60,53,0.08)] sm:rounded-[24px] sm:p-1.5">
                  <div className="relative aspect-[1.4/1] overflow-hidden rounded-[16px] sm:rounded-[20px]">
                    <AnimatePresence mode="wait">
                      {storyData.images.map((image, index) =>
                        index === currentSlide && (
                          <motion.img
                            key={`${image.src}-${index}`}
                            src={image.src}
                            alt={image.alt || 'Beauty story'}
                            initial={{ opacity: 0, scale: 1.06 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0 h-full w-full object-cover"
                            onError={(e) => { e.currentTarget.src = '/images/bg6.png'; }}
                          />
                        )
                      )}
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#26372f]/30 via-transparent to-transparent" />

                    {/* slide counter */}
                    <div className="absolute left-2 top-2 rounded-full border border-white/30 bg-black/15 px-2 py-0.5 text-[5px] font-medium tracking-[0.15em] text-white backdrop-blur-md sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[6px] sm:tracking-[0.2em]">
                      {String(currentSlide + 1).padStart(2, '0')} / {String(storyData.images.length).padStart(2, '0')}
                    </div>

                    {/* arrows - Smaller on mobile */}
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label="Previous story image"
                      className="absolute left-1.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/80 text-[#45554b] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white sm:left-2.5 sm:h-8 sm:w-8"
                    >
                      <FaChevronLeft className="text-[8px] sm:text-[10px]" />
                    </button>

                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Next story image"
                      className="absolute right-1.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/80 text-[#45554b] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white sm:right-2.5 sm:h-8 sm:w-8"
                    >
                      <FaChevronRight className="text-[8px] sm:text-[10px]" />
                    </button>

                    {/* dots */}
                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 sm:bottom-3 sm:gap-1.5">
                      {storyData.images.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => goToSlide(index)}
                          className={`h-0.5 rounded-full transition-all duration-300 sm:h-1 ${
                            index === currentSlide
                              ? 'w-3 bg-white sm:w-5'
                              : 'w-0.5 bg-white/50 sm:w-1'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* floating quote - hidden on mobile */}
                <div className="absolute -bottom-4 -left-4 hidden max-w-[200px] rounded-2xl border border-white/80 bg-white/90 p-3 shadow-xl backdrop-blur-xl sm:block">
                  <FaQuoteLeft className="mb-1.5 text-[10px] text-[#9aaa94]" />
                  <p
                    className="text-[8px] leading-4 text-[#687168]"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    Beauty is not about being perfect. It's about feeling confident in your own skin.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==================================================
            WHY CHOOSE US - Mobile Optimized
        ================================================== */}

        <section className="relative overflow-hidden bg-[#F8F5F0] px-3 py-6 sm:px-7 sm:py-10 lg:px-10 lg:py-12">
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.16]"
              style={{ backgroundImage: `url('${whyChooseUs?.backgroundImage || '/images/bg5.PNG'}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#F8F5F0]/95 via-[#F6EFEA]/80 to-[#EAD9D6]/60" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#E8C8C7]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#B7C2B1]/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1400px]">
            <div className="grid items-center gap-4 lg:grid-cols-[1fr_1.15fr] lg:gap-10">

              {/* LEFT */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeLeft}
              >
                <div className="mb-2 flex items-center gap-2 sm:mb-2.5">
                  <span className="h-px w-5 bg-[#B88C8D] sm:w-6" />
                  <span
                    className="text-[5px] uppercase tracking-[0.25em] text-[#9C7072] sm:text-[6px] sm:tracking-[0.3em]"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    {whyChooseUs?.badge || 'Why Choose Us'}
                  </span>
                </div>

                <h2
                  className="max-w-[500px] text-[22px] font-light leading-[1.05] tracking-[-0.035em] text-[#34352F] sm:text-[36px]"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  {whyChooseUs?.title || 'Beauty Is Power, A Smile Is Its Word'}
                </h2>

                <p
                  className="mt-2 max-w-[480px] text-[8px] leading-4 text-[#77766F] sm:mt-3 sm:text-[10px] sm:leading-5"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  {whyChooseUs?.description || 'We believe that true beauty starts from within. Our carefully selected products are designed to help you feel confident, radiant, and completely yourself.'}
                </p>

                <Link
                  href={whyChooseUs?.buttonLink || '/products'}
                  className="group mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#4C554B] px-3 py-1.5 text-[6px] font-medium uppercase tracking-[0.1em] text-white shadow-[0_8px_25px_rgba(60,65,58,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3E463E] sm:mt-4 sm:px-4 sm:py-2 sm:text-[7px] sm:tracking-[0.12em]"
                >
                  {whyChooseUs?.buttonText || 'Explore More'}
                  <FaArrowRight className="text-[6px] transition-transform group-hover:translate-x-1 sm:text-[8px]" />
                </Link>
              </motion.div>

              {/* RIGHT CARDS */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-2 gap-1.5 sm:gap-2.5"
              >
                {whyChooseUsCards.map((item, index) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <motion.div
                      key={item.title || index}
                      variants={scaleFade}
                      className="group relative overflow-hidden rounded-[12px] border border-white/80 bg-white/65 p-2 shadow-[0_8px_30px_rgba(70,62,55,0.06)] backdrop-blur-md transition-all duration-400 hover:-translate-y-0.5 hover:bg-white/85 hover:shadow-[0_12px_35px_rgba(70,62,55,0.10)] sm:p-4"
                    >
                      <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-[#E8C8C7]/30 blur-2xl transition-all duration-500 group-hover:scale-150" />
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#B88C8D] to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-40" />

                      <div className="relative z-10">
                        <div className="mb-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-[#DED8D1] bg-[#F5F1EC] text-[#81786E] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#8B746E] group-hover:text-white sm:mb-2 sm:h-8 sm:w-8">
                          <Icon className="text-[7px] sm:text-[10px]" />
                        </div>

                        <h3
                          className="text-[10px] text-[#45463F] sm:text-[14px]"
                          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                        >
                          {item.title}
                        </h3>

                        <p
                          className="mt-0.5 text-[5.5px] leading-3 text-[#85827B] sm:mt-1 sm:text-[7.5px] sm:leading-3.5"
                          style={{ fontFamily: FONT_FAMILY_INTER }}
                        >
                          {item.description}
                        </p>

                        <div className="mt-1 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:mt-1.5">
                          <span className="h-0.5 w-2 rounded-full bg-[#B88C8D]/40 sm:w-3" />
                          <span className="h-0.5 w-0.5 rounded-full bg-[#B88C8D]/60" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==================================================
            CURATED FOR YOU - Mobile Optimized
        ================================================== */}

        <section className="bg-[#faf9f5] px-3 py-6 sm:px-7 sm:py-14 lg:px-10 lg:py-8 overflow-hidden relative">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#d4d9ce]/20 blur-3xl" />
            <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#c5cbbf]/20 blur-3xl" />
          </div>

          <div className="mx-auto max-w-[1400px] relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mx-auto mb-6 max-w-[650px] text-center sm:mb-10"
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#aeb6aa] sm:w-10" />
                <span
                  className="text-[6px] uppercase tracking-[0.25em] text-[#818a81] sm:text-[8px] sm:tracking-[0.35em]"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  {curatedForYou?.badge || 'Curated For You'}
                </span>
                <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#aeb6aa] sm:w-10" />
              </div>

              <h2
                className="text-[24px] font-light tracking-[-0.035em] text-[#344039] sm:text-[42px]"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                {curatedForYou?.title || 'Beauty, Curated For You'}
              </h2>

              <p
                className="mx-auto mt-2 max-w-[580px] text-[9px] leading-4 text-[#777e77] sm:mt-3 sm:text-[11px] sm:leading-5"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                {curatedForYou?.description || 'Discover our handpicked collection of premium beauty products, carefully selected to enhance your natural beauty.'}
              </p>
            </motion.div>

            {/* Categories - Single Row with Auto-Scroll */}
            {categories.length > 0 && (
              <div className="relative">
                <div className="overflow-hidden">
                  <div 
                    className="flex gap-3 pb-3 auto-scroll-track sm:gap-4 sm:pb-4"
                    style={{
                      width: 'max-content',
                      animation: 'scrollCategories 30s linear infinite',
                    }}
                  >
                    {[...categories, ...categories].map((category, index) => (
                      <motion.div
                        key={`${category._id || index}-${index}`}
                        className="flex-shrink-0 w-[130px] sm:w-[180px] lg:w-[200px]"
                      >
                        <Link
                          href={`/products?category=${category._id}`}
                          className="group block"
                        >
                          <div className="relative overflow-hidden rounded-[16px] bg-[#e9eee6] shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_45px_rgba(70,85,73,0.15)] sm:rounded-[20px]">
                            <div className="aspect-[0.9/1] overflow-hidden">
                              <img
                                src={category.image?.url || category.image || '/images/bg6.png'}
                                alt={category.name}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => { e.currentTarget.src = '/images/bg6.png'; }}
                              />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-[#25352d]/85 via-[#25352d]/20 to-transparent" />

                            <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
                              <span className="rounded-full border border-white/30 bg-black/20 px-1.5 py-0.5 text-[4px] font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md sm:px-2.5 sm:py-1 sm:text-[5px] sm:tracking-[0.18em]">
                                Premium
                              </span>
                            </div>

                            <div className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white/90 text-[#52645a] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 sm:right-3 sm:top-3 sm:h-6 sm:w-6">
                              <FaArrowRight className="-rotate-45 text-[6px] sm:text-[8px]" />
                            </div>

                            <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                              <h3
                                className="truncate text-[10px] text-white sm:text-[15px]"
                                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                              >
                                {category.name}
                              </h3>
                              <div className="mt-1 h-[1.5px] w-0 rounded-full bg-white/50 transition-all duration-500 group-hover:w-6 sm:w-0 sm:group-hover:w-8" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <style jsx>{`
                  .auto-scroll-track {
                    animation: scrollCategories 30s linear infinite;
                  }
                  .auto-scroll-track:hover {
                    animation-play-state: paused;
                  }
                  @keyframes scrollCategories {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  @media (max-width: 640px) {
                    .auto-scroll-track {
                      animation-duration: 25s;
                    }
                  }
                `}</style>
              </div>
            )}

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-5 text-center sm:mt-8"
            >
              <Link
                href={curatedForYou?.buttonLink || '/products'}
                className="group inline-flex items-center gap-2 rounded-full border border-[#aeb8ac] bg-white/80 px-4 py-1.5 text-[7px] font-medium uppercase tracking-[0.1em] text-[#56655b] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#53665a] hover:text-white hover:shadow-lg sm:px-6 sm:py-2.5 sm:text-[8px] sm:tracking-[0.12em]"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                {curatedForYou?.buttonText || 'View All Products'}
                <FaArrowRight className="text-[8px] transition-transform duration-300 group-hover:translate-x-1 sm:text-[10px]" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ==================================================
            FINAL CTA - Mobile Optimized
        ================================================== */}

        <section className="relative min-h-[300px] overflow-hidden sm:min-h-[400px]">
          <div className="absolute inset-0">
            <img
              src={cta?.backgroundImage || '/images/cta-bg.jpg'}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => { e.currentTarget.src = '/images/bg5.PNG'; }}
            />
            <div className="absolute inset-0 bg-[#405348]/75" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#304239]/70 via-[#506257]/40 to-transparent" />
          </div>

          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />

          <div className="relative z-10 mx-auto flex min-h-[300px] max-w-[1400px] items-center px-4 py-10 sm:min-h-[400px] sm:px-8 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeLeft}
              className="max-w-[620px]"
            >
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2 py-1 backdrop-blur-md sm:mb-5 sm:px-3 sm:py-1.5">
                <GiSparkles className="text-[8px] text-[#e8d8c9] sm:text-[10px]" />
                <span
                  className="text-[6px] uppercase tracking-[0.2em] text-white/80 sm:text-[7px] sm:tracking-[0.25em]"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  Need Assistance?
                </span>
              </div>

              <h2
                className="text-[30px] font-light leading-[0.95] tracking-[-0.035em] text-white sm:text-[58px]"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                {cta?.title || "We're Here to Help"}
              </h2>

              <p
                className="mt-3 max-w-[520px] text-[10px] leading-5 text-white/70 sm:mt-5 sm:text-[12px] sm:leading-6"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                {cta?.description || 'Our beauty experts are ready to assist you with any questions about products or orders.'}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
                <Link
                  href={cta?.buttonLink || '/products'}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[7px] font-medium uppercase tracking-[0.1em] text-[#506257] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#f4efe9] sm:px-6 sm:py-3 sm:text-[9px] sm:tracking-[0.12em]"
                >
                  {cta?.buttonText || 'Shop Now'}
                  <FaArrowRight className="text-[8px] transition-transform group-hover:translate-x-1 sm:text-[10px]" />
                </Link>

                <Link
                  href={cta?.secondaryButtonLink || '/contact'}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[7px] font-medium uppercase tracking-[0.1em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 sm:px-6 sm:py-3 sm:text-[9px] sm:tracking-[0.12em]"
                >
                  {cta?.secondaryButtonText || 'Contact Us'}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================================================
            VIDEO MODAL
        ================================================== */}

        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-[#18221d]/80 p-4 backdrop-blur-md sm:p-5"
              onClick={() => setShowVideo(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-[20px] border border-white/20 bg-[#26332c] shadow-2xl sm:rounded-[24px]"
              >
                <div className="flex h-full flex-col items-center justify-center text-center text-white">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md sm:mb-5 sm:h-16 sm:w-16">
                    <FaPlay className="ml-1 text-base sm:text-lg" />
                  </div>
                  <h3
                    className="text-2xl font-light sm:text-3xl"
                    style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                  >
                    BeautyBucket
                  </h3>
                  <p
                    className="mt-1 text-[8px] uppercase tracking-[0.15em] text-white/50 sm:mt-2 sm:text-[10px] sm:tracking-[0.2em]"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    Your beauty journey starts here
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowVideo(false)}
                  className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-lg text-white backdrop-blur-md transition hover:bg-white/20 sm:right-4 sm:top-4 sm:h-9 sm:w-9"
                  aria-label="Close video"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
    </>
  );
}