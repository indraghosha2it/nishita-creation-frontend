

// // components/sections/DealsSection.js
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { FaArrowRight } from 'react-icons/fa';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// export default function DealsSection() {
//   const [deals, setDeals] = useState([]);
//   const [filteredDeals, setFilteredDeals] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [dealsPerPage, setDealsPerPage] = useState(3);

//   // Responsive: 2 cards on mobile, 3 on desktop
//   useEffect(() => {
//     const updateDealsPerPage = () => {
//       if (window.innerWidth < 768) {
//         setDealsPerPage(2);
//       } else {
//         setDealsPerPage(3);
//       }
//     };

//     updateDealsPerPage();
//     window.addEventListener('resize', updateDealsPerPage);
//     return () => window.removeEventListener('resize', updateDealsPerPage);
//   }, []);

//   useEffect(() => {
//     fetchDeals();
//   }, []);

//   const fetchDeals = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${API_URL}/api/deals`);
//       const data = await response.json();
      
//       if (data.success) {
//         setDeals(data.data);
//         filterDeals(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching deals:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filterDeals = (allDeals) => {
//     const now = new Date();
//     const active = allDeals.filter(deal => {
//       if (!deal.isActive) return false;
//       if (deal.endDate) {
//         const endDate = new Date(deal.endDate);
//         if (endDate < now) return false;
//       }
//       return true;
//     });
    
//     active.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
//     setFilteredDeals(active);
//     setCurrentPage(0);
//   };

//   useEffect(() => {
//     if (filteredDeals.length === 0 || filteredDeals.length <= dealsPerPage) return;
//     const interval = setInterval(() => {
//       setCurrentPage((prev) => (prev + 1) % Math.ceil(filteredDeals.length / dealsPerPage));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [filteredDeals.length, dealsPerPage]);

//   const nextPage = () => {
//     const totalPages = Math.ceil(filteredDeals.length / dealsPerPage);
//     setCurrentPage((prev) => (prev + 1) % totalPages);
//   };

//   const prevPage = () => {
//     const totalPages = Math.ceil(filteredDeals.length / dealsPerPage);
//     setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
//   };

//   const goToPage = (pageIndex) => {
//     setCurrentPage(pageIndex);
//   };

//   if (isLoading) {
//     return (
//       <div className="py-8 bg-[#f8f7f2]">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-center items-center h-48">
//             <div className="w-10 h-10 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (filteredDeals.length === 0) {
//     return null;
//   }

//   const startIndex = currentPage * dealsPerPage;
//   const totalPages = Math.ceil(filteredDeals.length / dealsPerPage);

//   // ✅ Build the current page's deals.
//   // - If the current page has fewer than `dealsPerPage` items, fill the
//   //   remaining slots with items from the beginning so the row always
//   //   looks full (no empty cells).
//   // - If the ENTIRE dataset is <= one page, don't fill (avoids weird
//   //   duplicate cards when there are only 1–2 deals total).
//   const currentDeals = (() => {
//     if (filteredDeals.length === 0) return [];

//     const slice = filteredDeals.slice(startIndex, startIndex + dealsPerPage);
//     if (slice.length >= dealsPerPage) return slice;
//     if (filteredDeals.length <= dealsPerPage) return slice;

//     const filled = [...slice];
//     let i = 0;
//     while (filled.length < dealsPerPage) {
//       filled.push(filteredDeals[i % filteredDeals.length]);
//       i++;
//     }
//     return filled;
//   })();

//   return (
//     <section className="py-1 md:py-1 bg-[#f8f7f2] overflow-hidden">
//       <div className="container mx-auto px-4">
//         {/* Section Header - Left aligned with arrows on right */}
//         <div className="flex items-center justify-between mb-2 md:mb-2">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="flex items-center gap-3"
//           >
//             <span className="w-10 h-px bg-[#8B9D83]/40"></span>
//             <span className="text-xs font-medium text-[#8B9D83] uppercase tracking-[0.2em]" style={{ fontFamily: "'Inter', sans-serif" }}>
//               Exclusive Deals
//             </span>
//           </motion.div>

//           {/* Navigation Arrows - On same row as title */}
//           {totalPages > 1 && (
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={prevPage}
//                 className="w-8 h-8 rounded-full bg-white border border-[#d5e0cf] flex items-center justify-center hover:bg-[#f0f5ed] hover:border-[#8B9D83] transition-all shadow-sm hover:shadow-md"
//                 aria-label="Previous page"
//               >
//                 <ChevronLeft className="w-4 h-4 text-[#263b32]" />
//               </button>
//               <button
//                 onClick={nextPage}
//                 className="w-8 h-8 rounded-full bg-white border border-[#d5e0cf] flex items-center justify-center hover:bg-[#f0f5ed] hover:border-[#8B9D83] transition-all shadow-sm hover:shadow-md"
//                 aria-label="Next page"
//               >
//                 <ChevronRight className="w-4 h-4 text-[#263b32]" />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Deals Grid - 2 on mobile, 3 on desktop */}
//         <motion.div
//           key={currentPage}
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
//         >
//           {currentDeals.map((deal, index) => (
//             <motion.div
//               key={`${deal._id}-${currentPage}-${index}`}
//               initial={{ opacity: 0, scale: 0.97 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3, delay: index * 0.08 }}
//               className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
//               style={{
//                 backgroundColor: deal.backgroundColor || '#e8eee4',
//                 aspectRatio: '16/9',
//               }}
//             >
//               {/* Background Image */}
//               <div className="absolute inset-0">
//                 <img
//                   src={deal.image}
//                   alt={deal.title || 'Deal'}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   onError={(e) => {
//                     e.target.src = '/images/placeholder.jpg';
//                   }}
//                 />
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-400"></div>
//               </div>

//               {/* Content */}
//               <div className="relative z-10 flex flex-col justify-between h-full p-3 md:p-4 text-white">
//                 {/* Top Section */}
//                 <div className="flex-1 flex flex-col">
//                   {deal.title && (
//                     <h3 className="text-sm md:text-base font-semibold leading-tight drop-shadow-lg tracking-wide line-clamp-1">
//                       {deal.title}
//                     </h3>
//                   )}
                  
//                   {deal.subtitle && (
//                     <p className="text-[10px] md:text-xs text-white/85 line-clamp-1 drop-shadow-md mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
//                       {deal.subtitle}
//                     </p>
//                   )}
//                 </div>

//                 {/* Shop Now Button */}
//                 {deal.buttonText && (
//                   <div className="mt-1 md:mt-1.5">
//                     <Link
//                       href={deal.buttonLink || '/products'}
//                       className="
//                         group/btn
//                         relative
//                         inline-flex
//                         items-center
//                         gap-1.5 md:gap-2
//                         px-2.5 md:px-3.5
//                         py-0.5 md:py-1
//                         rounded-full
//                         text-white
//                         font-medium
//                         text-[10px] md:text-xs
//                         tracking-wide
//                         transition-all
//                         duration-300
//                         overflow-hidden
//                         shadow-md
//                         hover:shadow-lg
//                         hover:scale-105
//                         active:scale-95
//                       "
//                       style={{
//                         background: 'linear-gradient(135deg, #8B9D83 0%, #6b7d63 100%)',
//                       }}
//                     >
//                       {/* Shimmer effect */}
//                       <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                      
//                       <span className="relative z-10 flex items-center gap-1 md:gap-1.5">
//                         <span className="font-medium">{deal.buttonText}</span>
//                         <motion.span
//                           className="inline-block"
//                           animate={{
//                             x: [0, 3, 0],
//                           }}
//                           transition={{
//                             duration: 1.5,
//                             repeat: Infinity,
//                             ease: "easeInOut",
//                           }}
//                         >
//                           <FaArrowRight className="w-2 h-2 md:w-2.5 md:h-2.5" />
//                         </motion.span>
//                       </span>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Page Indicators */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-1.5 mt-4 md:mt-6">
//             {Array.from({ length: totalPages }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToPage(index)}
//                 className={`transition-all duration-300 rounded-full ${
//                   index === currentPage
//                     ? 'w-4 md:w-6 h-1.5 bg-[#8B9D83]'
//                     : 'w-1.5 h-1.5 bg-[#c5d5be] hover:bg-[#8B9D83]/50'
//                 }`}
//                 aria-label={`Go to page ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// components/sections/DealsSection.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function DealsSection() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ============================================================
  // FETCH DEALS
  // ============================================================
  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/deals`);
      const data = await response.json();

      if (data.success) {
        setDeals(data.data);
        filterDeals(data.data);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterDeals = (allDeals) => {
    const now = new Date();
    const active = allDeals.filter((deal) => {
      if (!deal.isActive) return false;
      if (deal.endDate) {
        const endDate = new Date(deal.endDate);
        if (endDate < now) return false;
      }
      return true;
    });

    active.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    setFilteredDeals(active);
    setCurrentIndex(0);
  };

  // ============================================================
  // AUTO-ROTATE — every 5 seconds
  // ============================================================
  useEffect(() => {
    if (filteredDeals.length <= 1) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredDeals.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredDeals.length]);

  // ============================================================
  // NAVIGATION
  // ============================================================
  const total = filteredDeals.length;
  const currentDeal = filteredDeals[currentIndex];

  const nextSlide = () => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // ============================================================
  // LOADING
  // ============================================================
  if (isLoading) {
    return (
      <div className="py-4 bg-[#f8f7f2]">
        <div className="">
          <div className="flex justify-center items-center h-32">
            <div className="w-8 h-8 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (total === 0 || !currentDeal) {
    return null;
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <section className="py-1 bg-[#f8f7f2] overflow-hidden">
      <div className="">
        {/* ======================================================
            DEAL CARD — clean crossfade, no zoom, no slide
        ====================================================== */}
        <div className="relative w-full overflow-hidden">
          {/* Static placeholder reserves vertical space */}
          <div
            className="w-full"
            style={{
              aspectRatio: '16/4',
            }}
            aria-hidden="true"
          />

          <AnimatePresence initial={false}>
            <motion.div
              key={currentDeal._id || currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute inset-0"
              style={{
                willChange: 'opacity',
              }}
            >
              <div
                className="relative w-full h-full overflow-hidden shadow-sm"
                style={{
                  backgroundColor: currentDeal.backgroundColor || '#e8eee4',
                }}
              >
                {/* Background Image — plain, no overlay, no zoom */}
                <div className="absolute inset-0">
                  <img
                    src={currentDeal.image}
                    alt={currentDeal.title || 'Deal'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>

                {/* CTA Button — Centered at bottom */}
                {currentDeal.buttonText && (
                  <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 sm:bottom-3 md:bottom-4">
                    <Link
                      href={currentDeal.buttonLink || '/products'}
                      className="
                        group/btn
                        inline-flex
                        items-center
                        gap-0.5
                        px-2 py-0.5
                        sm:gap-2 sm:px-4 sm:py-1.5
                        md:px-6 md:py-2
                        bg-white
                        text-[#B52036]
                        font-semibold
                        text-[7px] sm:text-[10px] md:text-xs
                        tracking-[0.04em] sm:tracking-[0.08em]
                        uppercase
                        transition-all
                        duration-300
                        shadow-sm
                        hover:shadow-lg
                        hover:bg-[#B52036]
                        hover:text-white
                      "
                    >
                      <span className="font-semibold">
                        {currentDeal.buttonText}
                      </span>
                      <FaArrowRight className="w-1 h-1 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================
            NAVIGATION ROW — Left Arrow | Dots | Right Arrow
            Only shown if more than 1 deal
        ====================================================== */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-3 mt-1 sm:gap-4 sm:mt-1">
            {/* Left Arrow — no background */}
            <button
              onClick={prevSlide}
              aria-label="Previous deal"
              className="
                flex items-center justify-center
                text-[#263b32]/70
                transition-colors duration-200
                hover:text-[#B52036]
              "
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: total }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to deal ${index + 1}`}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-4 md:w-6 h-1.5 bg-[#B52036]'
                      : 'w-1.5 h-1.5 bg-[#c5d5be] hover:bg-[#B52036]/40'
                  }`}
                />
              ))}
            </div>

            {/* Right Arrow — no background */}
            <button
              onClick={nextSlide}
              aria-label="Next deal"
              className="
                flex items-center justify-center
                text-[#263b32]/70
                transition-colors duration-200
                hover:text-[#B52036]
              "
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}