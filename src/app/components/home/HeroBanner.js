

// 'use client';

// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import Link from 'next/link';
// import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const ACCENT_RED = '#CC1C34';

// const DEFAULT_DATA = {
//   slides: [
//     {
//       id: 'default-1',
//       bgImage: '/images/hh.PNG',
//       ctaLabel: 'Explore the Collection',
//       ctaHref: '/collection'
//     },
//     {
//       id: 'default-2',
//       bgImage: '/images/hh2.PNG',
//       ctaLabel: 'Shop New Arrivals',
//       ctaHref: '/new-arrivals'
//     }
//   ],
//   announcements: [
//     { id: 'a1', text: '🚚 Free Delivery on orders over ৳1000', order: 0 },
//     { id: 'a2', text: '💳 Cash on Delivery Available', order: 1 },
//     { id: 'a3', text: '🎁 Get 10% Off on Your First Order', order: 2 }
//   ]
// };

// const AUTOPLAY_MS = 5000;

// export default function HeroBannerCarousel({ slides: propSlides }) {
//   // ============================================================
//   // STATE
//   // ============================================================
//   const [slides, setSlides] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const timerRef = useRef(null);

//   // ============================================================
//   // FETCH
//   // ============================================================
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const apiUrl =
//           process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//         const response = await fetch(`${apiUrl}/api/banners/homepage`, {
//           cache: 'no-store'
//         });

//         if (response.ok) {
//           const result = await response.json();
//           if (result.success && result.data) {
//             const { slides: s = [], announcements: a = [] } = result.data;

//             if (s.length > 0) {
//               setSlides(s);
//             } else if (propSlides?.length) {
//               setSlides(propSlides);
//             } else {
//               setSlides(DEFAULT_DATA.slides);
//             }

//             setAnnouncements(a.length > 0 ? a : DEFAULT_DATA.announcements);
//             setIsLoading(false);
//             return;
//           }
//         }

//         setSlides(propSlides?.length ? propSlides : DEFAULT_DATA.slides);
//         setAnnouncements(DEFAULT_DATA.announcements);
//       } catch (error) {
//         console.error('Error fetching banner data:', error);
//         setSlides(propSlides?.length ? propSlides : DEFAULT_DATA.slides);
//         setAnnouncements(DEFAULT_DATA.announcements);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [propSlides]);

//   // ============================================================
//   // BANNER NAVIGATION
//   // ============================================================
//   const total = slides.length;
//   const slide = slides[index] || slides[0];

//   const goTo = useCallback(
//     (next) => {
//       if (total <= 1) return;
//       setIndex(((next % total) + total) % total);
//     },
//     [total]
//   );

//   const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
//   const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

//   // Autoplay
//   useEffect(() => {
//     if (isPaused || total <= 1 || isLoading) return undefined;
//     timerRef.current = setInterval(goNext, AUTOPLAY_MS);
//     return () => clearInterval(timerRef.current);
//   }, [goNext, isPaused, total, isLoading]);

//   // ============================================================
//   // LOADING
//   // ============================================================
//   if (isLoading) {
//     return (
//       <section className="relative w-full overflow-hidden bg-gray-200">
//         {/* Mobile — natural aspect ratio */}
//         <div className="aspect-[1902/630] w-full sm:hidden" />
//         {/* Desktop — fixed heights */}
//         <div className="hidden h-[55vh] w-full sm:block md:h-[65vh] lg:h-[70vh]" />

//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-sm text-gray-400">Loading...</div>
//         </div>
//       </section>
//     );
//   }

//   if (!slide) return null;

//   // ============================================================
//   // VARIANTS
//   // ============================================================
//   const bgVariants = {
//     enter: { opacity: 0, scale: 1.03 },
//     center: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
//         scale: { duration: 5.5, ease: [0.4, 0, 0.2, 1] }
//       }
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.99,
//       transition: {
//         opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
//       }
//     }
//   };

//   return (
//     <>
//       {/* ============================================================
//           HERO BANNER
//           Mobile  → aspect-ratio based (full image visible, no crop)
//           Desktop → fixed viewport heights (as before)
//       ============================================================ */}
//       <section
//         className="
//           relative w-full overflow-hidden
//           aspect-[1902/630]
//           sm:aspect-auto sm:h-[55vh]
//           md:h-[65vh]
//           lg:h-[70vh]
//         "
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//       >
//         {/* Background Image — crossfade */}
//         <div className="absolute inset-0">
//           <AnimatePresence initial={false}>
//             <motion.div
//               key={`bg-${index}`}
//               variants={bgVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               className="absolute inset-0"
//             >
//               <div
//                 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//                 style={{
//                   backgroundImage: `url('${slide.bgImage || '/images/hh.PNG'}')`
//                 }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* ============================================================
//             LEFT ARROW — center-left of banner
//         ============================================================ */}
//         {total > 1 && (
//     <button
//   onClick={goPrev}
//   aria-label="Previous slide"
//   className="absolute left-2 top-1/2 z-30 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/60 hover:bg-black/50 sm:left-5 sm:h-10 sm:w-10 md:left-8 md:h-11 md:w-11"
// >
//   <FaChevronLeft className="h-2 w-2 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
// </button>
//         )}

//         {/* ============================================================
//             RIGHT ARROW — center-right of banner
//         ============================================================ */}
//         {total > 1 && (
//         <button
//   onClick={goNext}
//   aria-label="Next slide"
//   className="absolute right-2 top-1/2 z-30 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/60 hover:bg-black/50 sm:right-5 sm:h-10 sm:w-10 md:right-8 md:h-11 md:w-11"
// >
//   <FaChevronRight className="h-2 w-2 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
// </button>
//         )}

//         {/* ============================================================
//             CTA BUTTON — centered at bottom
//         ============================================================ */}
//        {/* ============================================================
//     CTA BUTTON — centered at bottom
//     Very small on mobile, original size on sm+
// ============================================================ */}
// {slide.ctaLabel && slide.ctaLabel.trim() !== '' && (
//   <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 sm:bottom-8 md:bottom-10">
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={`cta-${index}`}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.5, delay: 0.15 }}
//       >
//         <Link
//           href={slide.ctaHref || '/products'}
//           className="
//             group inline-flex items-center gap-1 rounded-sm font-semibold uppercase text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
//             px-2.5 py-1 text-[8px] tracking-[0.06em]
//             sm:gap-2 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.1em] sm:shadow-lg sm:hover:shadow-xl
//             md:px-7 md:py-3.5 md:text-sm
//           "
//           style={{
//             backgroundColor: ACCENT_RED,
//             fontFamily: FONT_FAMILY
//           }}
//         >
//           {slide.ctaLabel}
//           <FaArrowRight className="h-1.5 w-1.5 transition-transform group-hover:translate-x-1 sm:h-3 sm:w-3" />
//         </Link>
//       </motion.div>
//     </AnimatePresence>
//   </div>
// )}

//         {/* ============================================================
//             DOT INDICATORS — bottom center
//         ============================================================ */}
//         {total > 1 && (
//           <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-3 sm:gap-2">
//             {slides.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => goTo(i)}
//                 aria-label={`Go to slide ${i + 1}`}
//                 className={`rounded-full transition-all duration-300 ${
//                   i === index
//                     ? 'h-1 w-6 sm:h-1.5 sm:w-8'
//                     : 'h-1 w-1 bg-white/40 hover:bg-white/70 sm:h-1.5 sm:w-1.5'
//                 }`}
//                 style={{
//                   backgroundColor: i === index ? ACCENT_RED : undefined
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* ============================================================
//           ANNOUNCEMENT MARQUEE
//       ============================================================ */}
//       {announcements.length > 0 && (
//         <AnnouncementMarquee
//           announcements={announcements}
//           backgroundColor={ACCENT_RED}
//         />
//       )}
//     </>
//   );
// }
// function AnnouncementMarquee({ announcements, backgroundColor }) {
//   const parts = announcements.map((a) => a.text);

//   return (
//     <div
//       className="relative w-full overflow-hidden"
//       style={{ backgroundColor }}
//     >
//       <div className="flex h-5 items-center sm:h-9">
//         {/* Marquee track (full width — no icon strip) */}
//         <div className="relative flex-1 overflow-hidden">
//           <div className="marquee-track flex whitespace-nowrap">
//             {/* Copy 1 */}
//             <div className="flex flex-shrink-0">
//               {parts.map((text, i) => (
//                 <React.Fragment key={`a-${i}`}>
//                   <span
//                     className="text-[9px] font-medium text-white sm:text-xs"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     {text}
//                   </span>
//                   <span
//                     aria-hidden="true"
//                     className="mx-3 text-[9px] text-white/60 sm:mx-8 sm:text-xs"
//                   >
//                     •
//                   </span>
//                 </React.Fragment>
//               ))}
//             </div>

//             {/* Copy 2 — duplicate for seamless loop */}
//             <div className="flex flex-shrink-0" aria-hidden="true">
//               {parts.map((text, i) => (
//                 <React.Fragment key={`b-${i}`}>
//                   <span
//                     className="text-[9px] font-medium text-white sm:text-xs"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     {text}
//                   </span>
//                   <span className="mx-3 text-[9px] text-white/60 sm:mx-8 sm:text-xs">
//                     •
//                   </span>
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Marquee animation */}
//       <style jsx>{`
//         .marquee-track {
//           animation: marquee-scroll 20s linear infinite;
//           will-change: transform;
//         }
//         .marquee-track:hover {
//           animation-play-state: paused;
//         }
//         @keyframes marquee-scroll {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//         /* Mobile — faster scroll */
//         @media (max-width: 640px) {
//           .marquee-track {
//             animation-duration: 10s;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const ACCENT_RED = '#CC1C34';

const DEFAULT_DATA = {
  slides: [
    {
      id: 'default-1',
      title: '',
      bgImage: '/images/hh.PNG',
      ctaLabel: 'Explore the Collection',
      ctaHref: '/collection'
    },
    {
      id: 'default-2',
      title: '',
      bgImage: '/images/hh2.PNG',
      ctaLabel: 'Shop New Arrivals',
      ctaHref: '/new-arrivals'
    }
  ],
  announcements: [
    { id: 'a1', text: '🚚 Free Delivery on orders over ৳1000', order: 0 },
    { id: 'a2', text: '💳 Cash on Delivery Available', order: 1 },
    { id: 'a3', text: '🎁 Get 10% Off on Your First Order', order: 2 }
  ]
};

const AUTOPLAY_MS = 5000;

export default function HeroBannerCarousel({ slides: propSlides }) {
  // ============================================================
  // STATE
  // ============================================================
  const [slides, setSlides] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const timerRef = useRef(null);

  // ============================================================
  // FETCH
  // ============================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/banners/homepage`, {
          cache: 'no-store'
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            const { slides: s = [], announcements: a = [] } = result.data;

            if (s.length > 0) {
              setSlides(s);
            } else if (propSlides?.length) {
              setSlides(propSlides);
            } else {
              setSlides(DEFAULT_DATA.slides);
            }

            setAnnouncements(a.length > 0 ? a : DEFAULT_DATA.announcements);
            setIsLoading(false);
            return;
          }
        }

        setSlides(propSlides?.length ? propSlides : DEFAULT_DATA.slides);
        setAnnouncements(DEFAULT_DATA.announcements);
      } catch (error) {
        console.error('Error fetching banner data:', error);
        setSlides(propSlides?.length ? propSlides : DEFAULT_DATA.slides);
        setAnnouncements(DEFAULT_DATA.announcements);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [propSlides]);

  // ============================================================
  // BANNER NAVIGATION
  // ============================================================
  const total = slides.length;
  const slide = slides[index] || slides[0];

  const goTo = useCallback(
    (next) => {
      if (total <= 1) return;
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (isPaused || total <= 1 || isLoading) return undefined;
    timerRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [goNext, isPaused, total, isLoading]);

  // ============================================================
  // LOADING
  // ============================================================
  if (isLoading) {
    return (
      <section className="relative w-full overflow-hidden bg-gray-200">
        <div className="aspect-[1902/630] w-full sm:hidden" />
        <div className="hidden h-[55vh] w-full sm:block md:h-[65vh] lg:h-[70vh]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm text-gray-400">Loading...</div>
        </div>
      </section>
    );
  }

  if (!slide) return null;

  // ============================================================
  // VARIANTS
  // ============================================================
  const bgVariants = {
    enter: { opacity: 0, scale: 1.03 },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 5.5, ease: [0.4, 0, 0.2, 1] }
      }
    },
    exit: {
      opacity: 0,
      scale: 0.99,
      transition: {
        opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
      }
    }
  };

  return (
    <>
      {/* ============================================================
          HERO BANNER
      ============================================================ */}
      <section
        className="
          relative w-full overflow-hidden
          aspect-[1902/630]
          sm:aspect-auto sm:h-[55vh]
          md:h-[65vh]
          lg:h-[70vh]
        "
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Image — crossfade */}
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
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${slide.bgImage || '/images/hh.PNG'}')`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ============================================================
            PER-SLIDE TITLE — top-center
            Fades in/out with the slide
        ============================================================ */}
        {slide.title && slide.title.trim() !== '' && (
          <div className="pointer-events-none absolute left-1/2 top-[10%] z-20 -translate-x-1/2 px-4 sm:top-[12%] md:top-[14%] lg:top-[15%]">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${index}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="
                  text-center
                  text-[18px] font-semibold
                  tracking-[0.12em] uppercase
                  text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]
                  sm:text-2xl sm:tracking-[0.15em]
                  md:text-3xl
                  lg:text-4xl
                "
                style={{ fontFamily: FONT_FAMILY }}
              >
                {slide.title}
              </motion.h2>
            </AnimatePresence>
          </div>
        )}

        {/* ============================================================
            LEFT ARROW
        ============================================================ */}
        {total > 1 && (
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 z-30 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white transition-all hover:scale-105 sm:left-5 sm:h-10 sm:w-10 sm:border sm:border-white/30 sm:bg-black/30 sm:backdrop-blur-sm sm:hover:border-white/60 sm:hover:bg-black/50 md:left-8 md:h-11 md:w-11"
          >
            <FaChevronLeft className="h-2 w-2 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
          </button>
        )}

        {/* ============================================================
            RIGHT ARROW
        ============================================================ */}
        {total > 1 && (
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 z-30 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white transition-all hover:scale-105 sm:right-5 sm:h-10 sm:w-10 sm:border sm:border-white/30 sm:bg-black/30 sm:backdrop-blur-sm sm:hover:border-white/60 sm:hover:bg-black/50 md:right-8 md:h-11 md:w-11"
          >
            <FaChevronRight className="h-2 w-2 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
          </button>
        )}

        {/* ============================================================
            CTA BUTTON — centered at bottom
        ============================================================ */}
        {slide.ctaLabel && slide.ctaLabel.trim() !== '' && (
          <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 sm:bottom-8 md:bottom-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`cta-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Link
                  href={slide.ctaHref || '/products'}
                  className="
                    group inline-flex items-center gap-1 rounded-sm font-semibold uppercase text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                    px-2.5 py-1 text-[8px] tracking-[0.06em]
                    sm:gap-2 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.1em] sm:shadow-lg sm:hover:shadow-xl
                    md:px-7 md:py-3.5 md:text-sm
                  "
                  style={{
                    backgroundColor: ACCENT_RED,
                    fontFamily: FONT_FAMILY
                  }}
                >
                  {slide.ctaLabel}
                  <FaArrowRight className="h-1.5 w-1.5 transition-transform group-hover:translate-x-1 sm:h-3 sm:w-3" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* ============================================================
            DOT INDICATORS
        ============================================================ */}
        {total > 1 && (
          <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-3 sm:gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? 'h-1 w-6 sm:h-1.5 sm:w-8'
                    : 'h-1 w-1 bg-white/40 hover:bg-white/70 sm:h-1.5 sm:w-1.5'
                }`}
                style={{
                  backgroundColor: i === index ? ACCENT_RED : undefined
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* ============================================================
          ANNOUNCEMENT MARQUEE
      ============================================================ */}
      {announcements.length > 0 && (
        <AnnouncementMarquee
          announcements={announcements}
          backgroundColor={ACCENT_RED}
        />
      )}
    </>
  );
}

// ============================================================
// ANNOUNCEMENT MARQUEE
// ============================================================
function AnnouncementMarquee({ announcements, backgroundColor }) {
  const parts = announcements.map((a) => a.text);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="flex h-5 items-center sm:h-9">
        <div className="relative flex-1 overflow-hidden">
          <div className="marquee-track flex whitespace-nowrap">
            {/* Copy 1 */}
            <div className="flex flex-shrink-0">
              {parts.map((text, i) => (
                <React.Fragment key={`a-${i}`}>
                  <span
                    className="text-[9px] font-medium text-white sm:text-xs"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {text}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mx-3 text-[9px] text-white/60 sm:mx-8 sm:text-xs"
                  >
                    •
                  </span>
                </React.Fragment>
              ))}
            </div>

            {/* Copy 2 — duplicate for seamless loop */}
            <div className="flex flex-shrink-0" aria-hidden="true">
              {parts.map((text, i) => (
                <React.Fragment key={`b-${i}`}>
                  <span
                    className="text-[9px] font-medium text-white sm:text-xs"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    {text}
                  </span>
                  <span className="mx-3 text-[9px] text-white/60 sm:mx-8 sm:text-xs">
                    •
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 20s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (max-width: 640px) {
          .marquee-track {
            animation-duration: 10s;
          }
        }
      `}</style>
    </div>
  );
}