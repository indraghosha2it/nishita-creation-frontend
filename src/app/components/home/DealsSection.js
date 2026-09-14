

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
//   const currentDeals = filteredDeals.slice(startIndex, startIndex + dealsPerPage);
//   const totalPages = Math.ceil(filteredDeals.length / dealsPerPage);

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

//         {/* Deals Grid - 2 on mobile, 3 on desktop - Reduced height on desktop */}
//         <motion.div
//           key={currentPage}
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
//         >
//           {currentDeals.map((deal, index) => (
//             <motion.div
//               key={deal._id}
//               initial={{ opacity: 0, scale: 0.97 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3, delay: index * 0.08 }}
//               className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
//               style={{
//                 backgroundColor: deal.backgroundColor || '#e8eee4',
//                 aspectRatio: '16/9', // Reduced from 16/10 to 16/9 for shorter cards
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

//               {/* Content - Tighter padding on desktop */}
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

//                   {/* Date Range - More compact */}
//                   {/* {deal.startDate && deal.endDate && (
//                     <p className="text-[8px] md:text-[10px] text-white/60 mt-0.5 flex items-center gap-1">
//                       <span className="opacity-70">📅</span>
//                       {new Date(deal.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
//                       <span className="opacity-40 mx-0.5">—</span> 
//                       {new Date(deal.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                     </p>
//                   )} */}
//                 </div>

//                 {/* Shop Now Button - Smaller */}
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

//         {/* Page Indicators - Only show if more than 1 page */}
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
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function DealsSection() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [dealsPerPage, setDealsPerPage] = useState(3);

  // Responsive: 2 cards on mobile, 3 on desktop
  useEffect(() => {
    const updateDealsPerPage = () => {
      if (window.innerWidth < 768) {
        setDealsPerPage(2);
      } else {
        setDealsPerPage(3);
      }
    };

    updateDealsPerPage();
    window.addEventListener('resize', updateDealsPerPage);
    return () => window.removeEventListener('resize', updateDealsPerPage);
  }, []);

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
    const active = allDeals.filter(deal => {
      if (!deal.isActive) return false;
      if (deal.endDate) {
        const endDate = new Date(deal.endDate);
        if (endDate < now) return false;
      }
      return true;
    });
    
    active.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    setFilteredDeals(active);
    setCurrentPage(0);
  };

  useEffect(() => {
    if (filteredDeals.length === 0 || filteredDeals.length <= dealsPerPage) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % Math.ceil(filteredDeals.length / dealsPerPage));
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredDeals.length, dealsPerPage]);

  const nextPage = () => {
    const totalPages = Math.ceil(filteredDeals.length / dealsPerPage);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    const totalPages = Math.ceil(filteredDeals.length / dealsPerPage);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (isLoading) {
    return (
      <div className="py-8 bg-[#f8f7f2]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (filteredDeals.length === 0) {
    return null;
  }

  const startIndex = currentPage * dealsPerPage;
  const totalPages = Math.ceil(filteredDeals.length / dealsPerPage);

  // ✅ Build the current page's deals.
  // - If the current page has fewer than `dealsPerPage` items, fill the
  //   remaining slots with items from the beginning so the row always
  //   looks full (no empty cells).
  // - If the ENTIRE dataset is <= one page, don't fill (avoids weird
  //   duplicate cards when there are only 1–2 deals total).
  const currentDeals = (() => {
    if (filteredDeals.length === 0) return [];

    const slice = filteredDeals.slice(startIndex, startIndex + dealsPerPage);
    if (slice.length >= dealsPerPage) return slice;
    if (filteredDeals.length <= dealsPerPage) return slice;

    const filled = [...slice];
    let i = 0;
    while (filled.length < dealsPerPage) {
      filled.push(filteredDeals[i % filteredDeals.length]);
      i++;
    }
    return filled;
  })();

  return (
    <section className="py-1 md:py-1 bg-[#f8f7f2] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header - Left aligned with arrows on right */}
        <div className="flex items-center justify-between mb-2 md:mb-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="w-10 h-px bg-[#8B9D83]/40"></span>
            <span className="text-xs font-medium text-[#8B9D83] uppercase tracking-[0.2em]" style={{ fontFamily: "'Inter', sans-serif" }}>
              Exclusive Deals
            </span>
          </motion.div>

          {/* Navigation Arrows - On same row as title */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevPage}
                className="w-8 h-8 rounded-full bg-white border border-[#d5e0cf] flex items-center justify-center hover:bg-[#f0f5ed] hover:border-[#8B9D83] transition-all shadow-sm hover:shadow-md"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4 text-[#263b32]" />
              </button>
              <button
                onClick={nextPage}
                className="w-8 h-8 rounded-full bg-white border border-[#d5e0cf] flex items-center justify-center hover:bg-[#f0f5ed] hover:border-[#8B9D83] transition-all shadow-sm hover:shadow-md"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4 text-[#263b32]" />
              </button>
            </div>
          )}
        </div>

        {/* Deals Grid - 2 on mobile, 3 on desktop */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
        >
          {currentDeals.map((deal, index) => (
            <motion.div
              key={`${deal._id}-${currentPage}-${index}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
              style={{
                backgroundColor: deal.backgroundColor || '#e8eee4',
                aspectRatio: '16/9',
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={deal.image}
                  alt={deal.title || 'Deal'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-400"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full p-3 md:p-4 text-white">
                {/* Top Section */}
                <div className="flex-1 flex flex-col">
                  {deal.title && (
                    <h3 className="text-sm md:text-base font-semibold leading-tight drop-shadow-lg tracking-wide line-clamp-1">
                      {deal.title}
                    </h3>
                  )}
                  
                  {deal.subtitle && (
                    <p className="text-[10px] md:text-xs text-white/85 line-clamp-1 drop-shadow-md mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {deal.subtitle}
                    </p>
                  )}
                </div>

                {/* Shop Now Button */}
                {deal.buttonText && (
                  <div className="mt-1 md:mt-1.5">
                    <Link
                      href={deal.buttonLink || '/products'}
                      className="
                        group/btn
                        relative
                        inline-flex
                        items-center
                        gap-1.5 md:gap-2
                        px-2.5 md:px-3.5
                        py-0.5 md:py-1
                        rounded-full
                        text-white
                        font-medium
                        text-[10px] md:text-xs
                        tracking-wide
                        transition-all
                        duration-300
                        overflow-hidden
                        shadow-md
                        hover:shadow-lg
                        hover:scale-105
                        active:scale-95
                      "
                      style={{
                        background: 'linear-gradient(135deg, #8B9D83 0%, #6b7d63 100%)',
                      }}
                    >
                      {/* Shimmer effect */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                      
                      <span className="relative z-10 flex items-center gap-1 md:gap-1.5">
                        <span className="font-medium">{deal.buttonText}</span>
                        <motion.span
                          className="inline-block"
                          animate={{
                            x: [0, 3, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <FaArrowRight className="w-2 h-2 md:w-2.5 md:h-2.5" />
                        </motion.span>
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Page Indicators */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1.5 mt-4 md:mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentPage
                    ? 'w-4 md:w-6 h-1.5 bg-[#8B9D83]'
                    : 'w-1.5 h-1.5 bg-[#c5d5be] hover:bg-[#8B9D83]/50'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}