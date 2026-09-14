// // components/home/BrandScroll.js
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Building2, ChevronDown, ChevronUp, Zap } from 'lucide-react';

// export default function BrandScroll() {
//   const [brands, setBrands] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);

//   // Fetch brands from API
//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/brands?isActive=true&limit=50');
//         const data = await response.json();
//         if (data.success) {
//           setBrands(data.data);
//         } else {
//           setBrands([]);
//         }
//       } catch (error) {
//         console.error('Error fetching brands:', error);
//         setBrands([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchBrands();
//   }, []);

//   // Get visible brands based on showAll state
//   const visibleBrands = showAll ? brands : brands.slice(0, 10);
//   const hasMoreBrands = brands.length > 10;

//   if (isLoading) {
//     return (
//       <div className="w-full py-8 md:py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {[...Array(10)].map((_, i) => (
//               <div key={i} className="h-20 bg-[#E2E7EA] rounded-xl animate-pulse"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (brands.length === 0) {
//     return null;
//   }

//   return (
//     <div className="w-full py-6 md:py-12 bg-gradient-to-b from-white via-[#F4F8FA] to-white">
//       <div className="container mx-auto px-4">
//         {/* Section Header - Left Aligned with Playfair Display */}
//         <div className="mb-2 md:mb-4">
//           <div className="inline-flex items-center gap-2  py-1.5 bg-[#06B6D4]/10 rounded-full mb-2">
//             <Zap className="w-4 h-4 text-[#06B6D4]" />
//             <span className="text-xs font-medium text-[#06B6D4] tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
//               Trusted Partners
//             </span>
//             <Zap className="w-4 h-4 text-[#06B6D4]" />
//           </div>
          
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#004767] tracking-tight leading-[1.1]" style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif", fontWeight: 700 }}>
//             Our <span className="text-[#06B6D4]">Premium</span> Brands
//           </h2>
          
//           <p className="text-[#64748B] mt-2 text-sm max-w-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
//             Discover power solutions from the world's most trusted brands
//           </p>
          
//           <div className="flex items-center gap-2 mt-3">
//             <div className="h-0.5 w-12 bg-[#06B6D4]/30 rounded-full"></div>
//             <div className="h-1.5 w-1.5 bg-[#06B6D4] rounded-full"></div>
//             <div className="h-0.5 w-12 bg-[#06B6D4]/30 rounded-full"></div>
//           </div>
          
        
//         </div>

//         {/* Brands Grid - 5 columns, 2 rows initially */}
//       <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-1 sm:gap-x-2 sm:gap-y-1 md:gap-x-5 md:gap-y-4">
  
//   {visibleBrands.map((brand) => (
//     <Link
//       key={brand._id}
//       href={`/products?brand=${brand._id}`}
//       className="group"
//     >
//       <div className="relative h-20 md:h-24 bg-white rounded-xl border border-[#DCE7EC] hover:border-[#06B6D4] transition-all duration-300 flex items-center justify-center p-4 hover:shadow-lg hover:shadow-[#06B6D4]/15 hover:-translate-y-1 overflow-hidden">
//         {/* Subtle gradient overlay on hover */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
//         {/* Brand Logo */}
//         {brand.logo ? (
//           <img
//             src={brand.logo}
//             alt={brand.name}
//             className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-105"
//             loading="lazy"
//           />
//         ) : (
//           <div className="flex flex-col items-center justify-center">
//             <Building2 className="w-8 h-8 text-gray-400 group-hover:text-[#06B6D4] transition-colors duration-300" />
//             <span className="text-xs font-medium text-gray-600 group-hover:text-[#004767] transition-colors duration-300 mt-1 text-center line-clamp-1" style={{ fontFamily: "'Inter', sans-serif" }}>
//               {brand.name}
//             </span>
//           </div>
//         )}
        
//         {/* Cyan accent line on hover */}
//         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-[#06B6D4] rounded-full transition-all duration-300"></div>
//       </div>
      
//       {/* Brand Name Below Card */}
//       <p className="text-center text-xs font-medium text-[#64748B] mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-[#004767]" style={{ fontFamily: "'Inter', sans-serif" }}>
//         {brand.name}
//       </p>
//     </Link>
//   ))}
// </div>

//         {/* Show All / Show Less Button - Professional */}
//         {hasMoreBrands && (
//           <div className="flex justify-center mt-8 md:mt-10">
//             <button
//               onClick={() => setShowAll(!showAll)}
//               className="group inline-flex items-center gap-2.5 px-8 py-2.5 border-2 border-[#06B6D4] text-[#06B6D4] rounded-lg hover:bg-[#06B6D4] hover:text-white transition-all duration-300 font-medium text-sm hover:shadow-lg hover:shadow-[#06B6D4]/20"
//               style={{ fontFamily: "'Inter', sans-serif" }}
//             >
//               {showAll ? (
//                 <>
//                   <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
//                   <span>Show Less</span>
//                 </>
//               ) : (
//                 <>
//                   <span>View All {brands.length} Brands</span>
//                   <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
//                 </>
//               )}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// components/home/BrandScroll.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, ChevronDown, ChevronUp, Zap } from 'lucide-react';

export default function BrandScroll() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/brands?isActive=true&limit=50');
        const data = await response.json();
        if (data.success) {
          setBrands(data.data);
        } else {
          setBrands([]);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrands([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBrands();
  }, []);

  // Get visible brands based on device and showAll state
  const getInitialCount = () => {
    if (typeof window !== 'undefined') {
      // Check if it's a small device (mobile)
      const isSmallDevice = window.innerWidth < 768;
      return isSmallDevice ? 6 : 10;
    }
    // Default for server-side rendering
    return 10;
  };

  const [initialCount, setInitialCount] = useState(10);

  useEffect(() => {
    // Update initial count on mount and resize
    const updateCount = () => {
      const isSmallDevice = window.innerWidth < 768;
      setInitialCount(isSmallDevice ? 6 : 10);
    };
    
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const visibleBrands = showAll ? brands : brands.slice(0, initialCount);
  const hasMoreBrands = brands.length > initialCount;

  if (isLoading) {
    return (
      <div className="w-full py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2 md:gap-5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-20 bg-[#E2E7EA] rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (brands.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-4 md:py-12 bg-gradient-to-b from-white via-[#F4F8FA] to-white">
      <div className="container mx-auto px-4">
        {/* Section Header - Left Aligned with Playfair Display */}
        <div className="mb-4 md:mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#06B6D4]/10 rounded-full mb-1">
            <Zap className="w-4 h-4 text-[#06B6D4]" />
            <span className="text-xs font-medium text-[#06B6D4] tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
              Trusted Partners
            </span>
            <Zap className="w-4 h-4 text-[#06B6D4]" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#004767] tracking-tight leading-[1.1]" style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif", fontWeight: 700 }}>
            Our <span className="text-[#06B6D4]">Premium</span> Brands
          </h2>
          
          <p className="text-[#64748B] mt-2 text-sm max-w-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
            Discover power solutions from the world's most trusted brands
          </p>
          
          <div className="flex items-center gap-2 mt-3">
            <div className="h-0.5 w-12 bg-[#06B6D4]/30 rounded-full"></div>
            <div className="h-1.5 w-1.5 bg-[#06B6D4] rounded-full"></div>
            <div className="h-0.5 w-12 bg-[#06B6D4]/30 rounded-full"></div>
          </div>
          
       
        </div>

        {/* Brands Grid - 5 columns on large, 2 columns on small */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-0 sm:gap-x-2 sm:gap-y-1 md:gap-x-5 md:gap-y-4">
          {visibleBrands.map((brand) => (
            <Link
              key={brand._id}
              href={`/products?brand=${brand._id}`}
              className="group"
            >
              <div className="relative h-20 md:h-24 bg-white rounded-xl border border-[#DCE7EC] hover:border-[#06B6D4] transition-all duration-300 flex items-center justify-center p-4 hover:shadow-lg hover:shadow-[#06B6D4]/15 hover:-translate-y-1 overflow-hidden">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Brand Logo */}
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Building2 className="w-8 h-8 text-gray-400 group-hover:text-[#06B6D4] transition-colors duration-300" />
                    <span className="text-xs font-medium text-gray-600 group-hover:text-[#004767] transition-colors duration-300 mt-1 text-center line-clamp-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {brand.name}
                    </span>
                  </div>
                )}
                
                {/* Cyan accent line on hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-[#06B6D4] rounded-full transition-all duration-300"></div>
              </div>
              
              {/* Brand Name Below Card */}
              <p className="text-center text-xs font-medium text-[#64748B] mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-[#004767]" style={{ fontFamily: "'Inter', sans-serif" }}>
                {brand.name}
              </p>
            </Link>
          ))}
        </div>

        {/* Show All / Show Less Button */}
     {hasMoreBrands && (
  <div className="flex justify-center mt-4 md:mt-6">
    <button
      onClick={() => setShowAll(!showAll)}
      className={`group inline-flex items-center gap-2 transition-all duration-300 font-medium hover:shadow-lg hover:shadow-[#06B6D4]/20 ${
        showAll
          ? 'bg-[#06B6D4] text-white hover:bg-[#0891B2] border-2 border-[#06B6D4]'
          : 'bg-white text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white border-2 border-[#06B6D4]'
      } ${
        // Small device: smaller padding and text
        'px-4 py-1.5 text-xs sm:px-6 sm:py-2 sm:text-sm md:px-8 md:py-2.5 md:text-sm'
      } rounded-lg transition-all duration-300`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Icon with animation */}
      <span className="transition-transform duration-300 group-hover:scale-110">
        {showAll ? (
          <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        )}
      </span>
      
      <span>{showAll ? 'Show Less' : 'View All Brands'}</span>
      
      {/* Decorative dot on hover */}
      <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  </div>
)}
      </div>
    </div>
  );
}