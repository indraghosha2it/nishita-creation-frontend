

// // components/home/HeroBannerCarousel.js
// // components/home/HeroBannerCarousel.js
// 'use client';

// import React, { useCallback, useEffect, useRef, useState, Fragment } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import Link from 'next/link';
// import {
//   FaArrowRight,
//   FaChevronLeft,
//   FaChevronRight,
//   FaLeaf,
// } from 'react-icons/fa';

// import FeatureBadges from './FeatureBadges';

// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

// // Default slides in case API fails
// const DEFAULT_SLIDES = [
//   {
//     id: 'default-1',
//     tagline: 'Timeless Collection',
//     title: 'Timeless Comfort,',
//     highlightedText: 'Modern Craftsmanship.',
//     description: 'Heritage technique meets contemporary design — each piece crafted to last.',
//     bgImage: '/images/hh.PNG',
//     ctaLabel: 'Explore the Collection',
//     ctaHref: '/collection',
//     trustIndicators: ['Heirloom Quality', 'Sustainably Made', 'Lifetime Care']
//   },
//   {
//     id: 'default-2',
//     tagline: 'New Arrivals',
//     title: 'Discover the',
//     highlightedText: 'Art of Living.',
//     description: 'Curated pieces that bring warmth and elegance to your everyday spaces.',
//     bgImage: '/images/hh2.PNG',
//     ctaLabel: 'Shop New Arrivals',
//     ctaHref: '/new-arrivals',
//     trustIndicators: ['Premium Quality', 'Handcrafted', 'Sustainably Sourced']
//   },
// ];

// const AUTOPLAY_MS = 6000;

// export default function HeroBannerCarousel({ slides: propSlides }) {
//   const [slides, setSlides] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const timerRef = useRef(null);

//   // Fetch banners from API
//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         setIsLoading(true);

//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//         const response = await fetch(`${apiUrl}/api/banners/homepage`, {
//           cache: 'no-store',
//         });

//         if (response.ok) {
//           const result = await response.json();

//           if (result.success && result.data && result.data.length > 0) {
//             setSlides(result.data);
//             setIsLoading(false);
//             return;
//           }
//         }

//         if (propSlides && propSlides.length > 0) {
//           setSlides(propSlides);
//         } else {
//           setSlides(DEFAULT_SLIDES);
//         }
//       } catch (error) {
//         console.error('Error fetching banners:', error);

//         if (propSlides && propSlides.length > 0) {
//           setSlides(propSlides);
//         } else {
//           setSlides(DEFAULT_SLIDES);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBanners();
//   }, [propSlides]);

//   const total = slides.length;
//   const slide = slides[index] || slides[0];

//   const goTo = useCallback(
//     (next) => {
//       if (total <= 1) return;

//       setDirection(
//         next > index || (index === total - 1 && next === 0) ? 1 : -1
//       );

//       setIndex(((next % total) + total) % total);
//     },
//     [index, total]
//   );

//   const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
//   const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

//   // Autoplay
//   useEffect(() => {
//     if (isPaused || total <= 1 || isLoading) {
//       return undefined;
//     }

//     timerRef.current = setInterval(goNext, AUTOPLAY_MS);

//     return () => clearInterval(timerRef.current);
//   }, [goNext, isPaused, total, isLoading]);

//   // Loading state
//   if (isLoading) {
//     return (
//       <section className="relative w-full h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-gray-200 animate-pulse">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-gray-400 text-sm">Loading banners...</div>
//         </div>
//       </section>
//     );
//   }

//   if (!slide) return null;

//  const bgVariants = {
//   enter: {
//     opacity: 0,
//     scale: 1.02,
//   },
//   center: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       opacity: {
//         duration: 0.9,
//         ease: [0.4, 0, 0.2, 1],
//       },
//       scale: {
//         duration: 1.2,
//         ease: [0.4, 0, 0.2, 1],
//       },
//     },
//   },
//   exit: {
//     opacity: 0,
//     scale: 0.99,
//     transition: {
//       opacity: {
//         duration: 0.9,
//         ease: [0.4, 0, 0.2, 1],
//       },
//       scale: {
//         duration: 0.9,
//         ease: [0.4, 0, 0.2, 1],
//       },
//     },
//   },
// };

//   // Content variants - smooth fade with slight movement
//   const contentVariants = {
//     enter: (direction) => ({
//       opacity: 0,
//       y: 20,
//     }),
//     center: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: [0.4, 0, 0.2, 1],
//       }
//     },
//     exit: (direction) => ({
//       opacity: 0,
//       y: -20,
//       transition: {
//         duration: 0.4,
//         ease: [0.4, 0, 0.2, 1],
//       }
//     })
//   };

//   return (
//     <>
//     <section
//       className="relative w-full h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       {/* Background Image - Always present, smooth crossfade */}
//       <div className="absolute inset-0">
//         <AnimatePresence initial={false}>
//           <motion.div
//             key={`bg-${index}`}
//             variants={bgVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             className="absolute inset-0"
//           >
//             {/* Background Image */}
//             <div
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//               style={{
//                 backgroundImage: `url('${slide.bgImage || '/images/hh.PNG'}')`,
//               }}
//             >
//               {/* Gradient overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/5" />
//             </div>

//             {/* Decorative botanical elements */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//               <div className="absolute top-10 left-[8%] opacity-10 animate-float">
//                 <FaLeaf className="w-10 h-10 text-white/30" />
//               </div>
//               <div className="absolute bottom-20 right-[10%] opacity-8 animate-float-delayed">
//                 <FaLeaf className="w-12 h-12 text-white/20 rotate-45" />
//               </div>
//               <div className="absolute top-1/3 right-[5%] opacity-8 animate-float-slow">
//                 <FaLeaf className="w-8 h-8 text-white/20 -rotate-12" />
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Content Container - Smooth fade with stagger */}
//       <div className="container mx-auto px-4 md:px-6 lg:px-8 h-full relative z-10">
//         <div className="flex flex-col justify-end h-full pb-6 md:pb-8 lg:pb-10 max-w-2xl">
          
//           {/* Tag/Badge */}
//           {slide.tagline && (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`tagline-${index}`}
//                 variants={contentVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ duration: 0.5, delay: 0.05 }}
//                 className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-[#8B9D83]/30 mb-2 w-fit"
//               >
//                 <span className="w-1 h-1 rounded-full bg-[#8B9D83]" />
//                 <span
//                   className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-white/80"
//                   style={{
//                     fontFamily: FONT_FAMILY,
//                     letterSpacing: '0.2em',
//                   }}
//                 >
//                   {slide.tagline}
//                 </span>
//               </motion.div>
//             </AnimatePresence>
//           )}

//           {/* Main Heading */}
//           {slide.title && (
//             <AnimatePresence mode="wait">
//               <motion.h1
//                 key={`title-${index}`}
//                 variants={contentVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-[1.1] tracking-wide text-white mb-1.5"
//                 style={{
//                   fontFamily: FONT_FAMILY,
//                   letterSpacing: '0.02em',
//                 }}
//               >
//                 {slide.title}
//                 {slide.highlightedText && (
//                   <>
//                     <br />
//                     <span className="text-[#8B9D83] font-medium">
//                       {slide.highlightedText}
//                     </span>
//                   </>
//                 )}
//               </motion.h1>
//             </AnimatePresence>
//           )}

//           {/* Description */}
//           {slide.description && (
//             <AnimatePresence mode="wait">
//               <motion.p
//                 key={`desc-${index}`}
//                 variants={contentVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ duration: 0.5, delay: 0.15 }}
//                 className="text-sm md:text-base text-white/70 max-w-lg leading-relaxed mb-4"
//                 style={{
//                   fontFamily: FONT_FAMILY,
//                   fontWeight: 300,
//                   letterSpacing: '0.02em',
//                 }}
//               >
//                 {slide.description}
//               </motion.p>
//             </AnimatePresence>
//           )}

//           {/* CTA Button */}
//           {slide.ctaLabel && (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`cta-${index}`}
//                 variants={contentVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 <Link
//                   href={slide.ctaHref || '/collection'}
//                   className="group inline-flex items-center gap-1.5 px-5 py-2 md:px-6 md:py-2.5 bg-[#8B9D83] text-white text-xs md:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
//                   style={{
//                     fontFamily: FONT_FAMILY,
//                     letterSpacing: '0.06em',
//                   }}
//                 >
//                   {slide.ctaLabel}
//                   <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </motion.div>
//             </AnimatePresence>
//           )}

//           {/* Trust Indicators */}
//           {slide.trustIndicators && slide.trustIndicators.length > 0 && (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`trust-${index}`}
//                 variants={contentVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ duration: 0.5, delay: 0.25 }}
//                 className="flex items-center gap-4 mt-5 pt-4 border-t border-white/10 flex-wrap"
//               >
//                 {slide.trustIndicators.map((indicator, i) => (
//                   <Fragment key={i}>
//                     <span
//                       className="text-[10px] md:text-xs text-white/50 font-medium tracking-[0.15em] uppercase"
//                       style={{
//                         fontFamily: FONT_FAMILY,
//                         letterSpacing: '0.15em',
//                       }}
//                     >
//                       {indicator}
//                     </span>
//                     {i < slide.trustIndicators.length - 1 && (
//                       <span className="w-px h-3 bg-white/15" />
//                     )}
//                   </Fragment>
//                 ))}
//               </motion.div>
//             </AnimatePresence>
//           )}
//         </div>
//       </div>

//       {/* Navigation Arrows - Bottom Right */}
//       {total > 1 && (
//         <div className="absolute bottom-24 md:bottom-28 lg:bottom-32 right-4 md:right-6 lg:right-8 z-30 flex items-center gap-2">
//           <button
//             onClick={goPrev}
//             aria-label="Previous slide"
//             className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-all border border-white/20 hover:border-white/40 hover:scale-105"
//           >
//             <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
//           </button>
//           <button
//             onClick={goNext}
//             aria-label="Next slide"
//             className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-all border border-white/20 hover:border-white/40 hover:scale-105"
//           >
//             <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
//           </button>
//         </div>
//       )}

//       {/* Dot Indicators - Bottom Center */}
//       {total > 1 && (
//         <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
//           {slides.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goTo(i)}
//               aria-label={`Go to slide ${i + 1}`}
//               className={`
//                 rounded-full transition-all duration-300
//                 ${i === index
//                   ? 'w-8 h-2 bg-[#8B9D83]'
//                   : 'w-2 h-2 bg-white/30 hover:bg-white/50'
//                 }
//               `}
//             />
//           ))}
//         </div>
//       )}

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-15px) rotate(5deg); }
//         }
//         @keyframes float-delayed {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-12px) rotate(-3deg); }
//         }
//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float-delayed 7s ease-in-out infinite;
//         }
//         .animate-float-slow {
//           animation: float-slow 8s ease-in-out infinite;
//         }
//       `}</style>
//     </section>

//     <FeatureBadges />
//     </>
//   );
// }
// components/home/HeroBannerCarousel.js
'use client';

import React, { useCallback, useEffect, useRef, useState, Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaLeaf,
} from 'react-icons/fa';

import FeatureBadges from './FeatureBadges';

const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

// Default slides in case API fails
const DEFAULT_SLIDES = [
  {
    id: 'default-1',
    tagline: 'Timeless Collection',
    title: 'Timeless Comfort,',
    highlightedText: 'Modern Craftsmanship.',
    description: 'Heritage technique meets contemporary design — each piece crafted to last.',
    bgImage: '/images/hh.PNG',
    ctaLabel: 'Explore the Collection',
    ctaHref: '/collection',
    trustIndicators: ['Heirloom Quality', 'Sustainably Made', 'Lifetime Care']
  },
  {
    id: 'default-2',
    tagline: 'New Arrivals',
    title: 'Discover the',
    highlightedText: 'Art of Living.',
    description: 'Curated pieces that bring warmth and elegance to your everyday spaces.',
    bgImage: '/images/hh2.PNG',
    ctaLabel: 'Shop New Arrivals',
    ctaHref: '/new-arrivals',
    trustIndicators: ['Premium Quality', 'Handcrafted', 'Sustainably Sourced']
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroBannerCarousel({ slides: propSlides }) {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const timerRef = useRef(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/banners/homepage`, {
          cache: 'no-store',
        });

        if (response.ok) {
          const result = await response.json();

          if (result.success && result.data && result.data.length > 0) {
            setSlides(result.data);
            setIsLoading(false);
            return;
          }
        }

        if (propSlides && propSlides.length > 0) {
          setSlides(propSlides);
        } else {
          setSlides(DEFAULT_SLIDES);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);

        if (propSlides && propSlides.length > 0) {
          setSlides(propSlides);
        } else {
          setSlides(DEFAULT_SLIDES);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, [propSlides]);

  const total = slides.length;
  const slide = slides[index] || slides[0];

  const goTo = useCallback(
    (next) => {
      if (total <= 1) return;

      setDirection(
        next > index || (index === total - 1 && next === 0) ? 1 : -1
      );

      setIndex(((next % total) + total) % total);
    },
    [index, total]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (isPaused || total <= 1 || isLoading) {
      return undefined;
    }

    timerRef.current = setInterval(goNext, AUTOPLAY_MS);

    return () => clearInterval(timerRef.current);
  }, [goNext, isPaused, total, isLoading]);

  // Loading state
  if (isLoading) {
    return (
      <section className="relative w-full h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading banners...</div>
        </div>
      </section>
    );
  }

  if (!slide) return null;

 const bgVariants = {
  enter: {
    opacity: 0,
    scale: 1.02,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: {
        duration: 0.9,
        ease: [0.4, 0, 0.2, 1],
      },
      scale: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    transition: {
      opacity: {
        duration: 0.9,
        ease: [0.4, 0, 0.2, 1],
      },
      scale: {
        duration: 0.9,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
};

  // Content variants - smooth fade with slight movement
  const contentVariants = {
    enter: (direction) => ({
      opacity: 0,
      y: 20,
    }),
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    exit: (direction) => ({
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }
    })
  };

  return (
    <>
    <section
      className="relative w-full aspect-[16/9] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image - Always present, smooth crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${index}`}
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Background Image - Full cover on all devices */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${slide.bgImage || '/images/hh.PNG'}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Gradient overlay - More opacity on mobile for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5 sm:from-black/60 sm:via-black/20 sm:to-black/5" />
            </div>

            {/* Decorative botanical elements - Hidden on mobile, visible on larger screens */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-[8%] opacity-10 animate-float hidden sm:block">
                <FaLeaf className="w-8 h-8 sm:w-10 sm:h-10 text-white/30" />
              </div>
              <div className="absolute bottom-20 right-[10%] opacity-8 animate-float-delayed hidden md:block">
                <FaLeaf className="w-10 h-10 sm:w-12 sm:h-12 text-white/20 rotate-45" />
              </div>
              <div className="absolute top-1/3 right-[5%] opacity-8 animate-float-slow hidden lg:block">
                <FaLeaf className="w-6 h-6 sm:w-8 sm:h-8 text-white/20 -rotate-12" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Container - Smooth fade with stagger */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-full relative z-10">
        <div className="flex flex-col justify-end h-full pb-3 sm:pb-6 md:pb-8 lg:pb-10 max-w-2xl">
          
          {/* Tag/Badge - Smaller on mobile */}
          {slide.tagline && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`tagline-${index}`}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.05 }}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-sm border border-[#8B9D83]/30 mb-1 sm:mb-2 w-fit"
              >
                <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#8B9D83]" />
                <span
                  className="text-[7px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.1em] sm:tracking-[0.2em] uppercase text-white/80"
                  style={{
                    fontFamily: FONT_FAMILY,
                    letterSpacing: '0.1em',
                  }}
                >
                  {slide.tagline}
                </span>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Main Heading - Smaller on mobile */}
          {slide.title && (
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${index}`}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-[1.1] tracking-wide text-white mb-0.5 sm:mb-1.5"
                style={{
                  fontFamily: FONT_FAMILY,
                  letterSpacing: '0.02em',
                }}
              >
                {slide.title}
                {slide.highlightedText && (
                  <>
                    <br />
                    <span className="text-[#8B9D83] font-medium">
                      {slide.highlightedText}
                    </span>
                  </>
                )}
              </motion.h1>
            </AnimatePresence>
          )}

          {/* Description - Smaller on mobile */}
          {slide.description && (
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${index}`}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-[9px] sm:text-sm md:text-base text-white/70 max-w-lg leading-relaxed mb-1.5 sm:mb-4 line-clamp-1 sm:line-clamp-3"
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                }}
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>
          )}

          {/* CTA Button - Smaller on mobile */}
          {slide.ctaLabel && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`cta-${index}`}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href={slide.ctaHref || '/collection'}
                  className="group inline-flex items-center gap-1 px-3 py-1 sm:px-5 sm:py-2 md:px-6 md:py-2.5 bg-[#8B9D83] text-white text-[8px] sm:text-xs md:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  style={{
                    fontFamily: FONT_FAMILY,
                    letterSpacing: '0.06em',
                  }}
                >
                  {slide.ctaLabel}
                  <FaArrowRight className="w-2 h-2 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Trust Indicators - Smaller on mobile */}
          {slide.trustIndicators && slide.trustIndicators.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`trust-${index}`}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex items-center gap-1.5 sm:gap-4 mt-1.5 sm:mt-5 pt-1.5 sm:pt-4 border-t border-white/10 flex-wrap"
              >
                {slide.trustIndicators.map((indicator, i) => (
                  <Fragment key={i}>
                    <span
                      className="text-[6px] sm:text-[10px] md:text-xs text-white/50 font-medium tracking-[0.05em] sm:tracking-[0.15em] uppercase whitespace-nowrap"
                      style={{
                        fontFamily: FONT_FAMILY,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {indicator}
                    </span>
                    {i < slide.trustIndicators.length - 1 && (
                      <span className="w-px h-1.5 sm:h-3 bg-white/15" />
                    )}
                  </Fragment>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Navigation Arrows - Bottom Right Corner */}
      {total > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 right-3 sm:right-4 md:right-5 lg:right-6 z-30 flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-all border border-white/20 hover:border-white/40 hover:scale-105"
          >
            <FaChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-all border border-white/20 hover:border-white/40 hover:scale-105"
          >
            <FaChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5" />
          </button>
        </div>
      )}

      {/* Dot Indicators - Bottom Center */}
      {total > 1 && (
        <div className="absolute bottom-1.5 sm:bottom-2 md:bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0.5 sm:gap-1.5 md:gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                rounded-full transition-all duration-300
                ${i === index
                  ? 'w-3 sm:w-5 md:w-6 lg:w-7 h-0.5 sm:h-1.5 md:h-2 bg-[#8B9D83]'
                  : 'w-0.5 sm:w-1.5 md:w-2 h-0.5 sm:h-1.5 md:h-2 bg-white/30 hover:bg-white/50'
                }
              `}
            />
          ))}
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>

    <FeatureBadges />
    </>
  );
}