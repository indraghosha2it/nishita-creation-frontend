
// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { useState, useEffect, useRef } from 'react';
// import {
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   ArrowRight,
// } from 'lucide-react';

// // Font family constants - Updated to match site theme
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// export default function Categories() {
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(false);
//   const [pageWidth, setPageWidth] = useState(0);

//   const scrollContainerRef = useRef(null);
//   const wrapperRef = useRef(null);

//   const CARDS_PER_VIEW = 8;

//   // Fetch categories
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         'http://localhost:5000/api/categories/light'
//       );

//       const data = await response.json();

//       if (data.success) {
//         const formattedCategories = data.data.map((cat, index) => ({
//           _id: cat._id,
//           name: cat.name,
//           image: cat.image?.url || getDefaultImage(index),
//           slug: cat.slug,
//           productCount:
//             cat.productCount ||
//             Math.floor(Math.random() * 50) + 10,
//         }));

//         setCategories(formattedCategories);

//         setTimeout(() => {
//           calculatePageWidth();
//           checkScroll();
//         }, 150);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);

//       const fallbackCategories = [
//         {
//           _id: '1',
//           name: 'Makeup',
//           image:
//             'https://images.unsplash.com/photo-1596462502278-27bfdc6e3b6f?w=400&h=400&fit=crop',
//           productCount: 42,
//         },
//         {
//           _id: '2',
//           name: 'Skincare',
//           image:
//             'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
//           productCount: 38,
//         },
//         {
//           _id: '3',
//           name: 'Hair Care',
//           image:
//             'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
//           productCount: 25,
//         },
//         {
//           _id: '4',
//           name: 'Fragrance',
//           image:
//             'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
//           productCount: 31,
//         },
//         {
//           _id: '5',
//           name: 'Bath & Body',
//           image:
//             'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&h=400&fit=crop',
//           productCount: 19,
//         },
//         {
//           _id: '6',
//           name: 'Natural & Organic',
//           image:
//             'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop',
//           productCount: 27,
//         },
//         {
//           _id: '7',
//           name: 'Tools & Brushes',
//           image:
//             'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=400&fit=crop',
//           productCount: 22,
//         },
//         {
//           _id: '8',
//           name: 'Lip Care',
//           image:
//             'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=400&fit=crop',
//           productCount: 45,
//         },
//         {
//           _id: '9',
//           name: 'Eye Makeup',
//           image:
//             'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
//           productCount: 30,
//         },
//       ];

//       setCategories(fallbackCategories);

//       setTimeout(() => {
//         calculatePageWidth();
//         checkScroll();
//       }, 150);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getDefaultImage = (index) => {
//     const images = [
//       'https://images.unsplash.com/photo-1596462502278-27bfdc6e3b6f?w=400&h=400&fit=crop',
//       'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
//       'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
//       'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
//     ];

//     return images[index % images.length];
//   };

//   // Calculate page width
//   const calculatePageWidth = () => {
//     if (!scrollContainerRef.current || !wrapperRef.current) {
//       return;
//     }

//     const isMobile = window.innerWidth < 640;

//     const wrapperParent = wrapperRef.current.parentElement;

//     if (!wrapperParent) return;

//     const parentWidth = wrapperParent.clientWidth;

//     const style = window.getComputedStyle(
//       scrollContainerRef.current
//     );

//     const gap =
//       parseFloat(style.columnGap || style.gap) || 12;

//     // MOBILE = EXACTLY 4 CARDS
//     if (isMobile) {
//       // For mobile, we want 4 cards per view
//       const firstCard = scrollContainerRef.current.children[0];
//       if (!firstCard) {
//         setPageWidth(parentWidth);
//         return;
//       }
      
//       // Recalculate with 4 cards for mobile
//       const cardWidth = firstCard.offsetWidth;
//       const mobileCardsToShow = 4;
//       const mobileWidth = mobileCardsToShow * cardWidth + (mobileCardsToShow - 1) * gap;
//       setPageWidth(Math.min(mobileWidth, parentWidth));
//       return;
//     }

//     const firstCard =
//       scrollContainerRef.current.children[0];

//     if (!firstCard) return;

//     const cardWidth = firstCard.offsetWidth;

//     const maxFit = Math.floor(
//       (parentWidth + gap) / (cardWidth + gap)
//     );

//     const cardsToShow = Math.max(
//       1,
//       Math.min(CARDS_PER_VIEW, maxFit)
//     );

//     const width =
//       cardsToShow * cardWidth +
//       (cardsToShow - 1) * gap;

//     setPageWidth(width);
//   };

//   // Check arrows
//   const checkScroll = () => {
//     if (!scrollContainerRef.current) return;

//     const {
//       scrollLeft,
//       scrollWidth,
//       clientWidth,
//     } = scrollContainerRef.current;

//     setShowLeftArrow(scrollLeft > 20);

//     setShowRightArrow(
//       scrollLeft <
//         scrollWidth - clientWidth - 20
//     );
//   };

//   // Scroll
//   const scroll = (direction) => {
//     if (
//       !scrollContainerRef.current ||
//       !pageWidth
//     ) {
//       return;
//     }

//     const container =
//       scrollContainerRef.current;

//     const newScrollLeft =
//       direction === 'left'
//         ? container.scrollLeft - pageWidth
//         : container.scrollLeft + pageWidth;

//     container.scrollTo({
//       left: newScrollLeft,
//       behavior: 'smooth',
//     });
//   };

//   // Resize + scroll listeners
//   useEffect(() => {
//     const container =
//       scrollContainerRef.current;

//     if (!container) return;

//     calculatePageWidth();

//     container.addEventListener(
//       'scroll',
//       checkScroll
//     );

//     checkScroll();

//     const handleResize = () => {
//       calculatePageWidth();
//       checkScroll();
//     };

//     window.addEventListener(
//       'resize',
//       handleResize
//     );

//     return () => {
//       container.removeEventListener(
//         'scroll',
//         checkScroll
//       );

//       window.removeEventListener(
//         'resize',
//         handleResize
//       );
//     };
//   }, [categories]);

//   // Loading state
//   if (isLoading) {
//     return (
//       <section className="py-6 md:py-10 bg-[#f8f7f2]">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="flex gap-3 overflow-hidden justify-center">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="animate-pulse flex-shrink-0">
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-[#e5e3da]" />
//                 <div className="h-3 w-12 bg-[#e5e3da] rounded mx-auto mt-1.5" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="pt-4 md:pt-8 lg:pt-8 pb-1 md:pb-2 lg:pb-2 bg-[#f8f7f2] overflow-hidden relative">
//       {/* Background Effects */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#8B9D83]/5 rounded-full blur-3xl" />
//         <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#8B9D83]/5 rounded-full blur-3xl" />
//       </div>

//       <div className="container mx-auto px-0 max-w-7xl relative z-10">
//         {/* Categories */}
//         <div className="relative group px-2 sm:px-4 md:px-6">
//           {/* Left Arrow */}
//           <AnimatedArrow
//             show={showLeftArrow}
//             direction="left"
//             onClick={() => scroll('left')}
//             Icon={ChevronLeft}
//           />

//           {/* Right Arrow */}
//           <AnimatedArrow
//             show={showRightArrow}
//             direction="right"
//             onClick={() => scroll('right')}
//             Icon={ChevronRight}
//           />

//           {/* Wrapper */}
//           <div
//             ref={wrapperRef}
//             className="mx-auto overflow-hidden"
//             style={{
//               width: pageWidth ? `${pageWidth}px` : '100%',
//               maxWidth: '100%',
//             }}
//           >
//             {/* Scroll Container */}
//             <div
//               ref={scrollContainerRef}
//               className="flex gap-2 sm:gap-3 md:gap-4 pb-3 overflow-x-auto scroll-smooth snap-x snap-mandatory"
//               style={{
//                 scrollbarWidth: 'none',
//                 msOverflowStyle: 'none',
//                 WebkitOverflowScrolling: 'touch',
//               }}
//             >
//               {categories.map((category, index) => (
//                 <CategoryCard
//                   key={category._id || index}
//                   category={category}
//                   index={index}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ============================================================
// // Animated Arrow
// // ============================================================

// function AnimatedArrow({ show, direction, onClick, Icon }) {
//   if (!show) return null;

//   return (
//     <motion.button
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       onClick={onClick}
//       aria-label={direction === 'left' ? 'Previous categories' : 'Next categories'}
//       className={`
//         absolute top-[calc(50%-14px)] -translate-y-1/2 z-30
//         bg-white shadow-lg rounded-full p-1.5 sm:p-2
//         border border-[#8B9D83]/30
//         hover:border-[#8B9D83] hover:bg-[#8B9D83]
//         transition-all duration-300
//         ${direction === 'left' ? 'left-0 lg:left-3 -ml-1 lg:-ml-2' : 'right-0 lg:right-3 -mr-1 lg:-mr-2'}
//       `}
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B9D83] hover:text-white transition-colors" />
//     </motion.button>
//   );
// }

// // ============================================================
// // Category Card - Circular - Reduced Size
// // ============================================================

// function CategoryCard({ category, index }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{
//         duration: 0.4,
//         delay: Math.min(index * 0.03, 0.4),
//       }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       className="shrink-0 snap-start w-[calc((100%-2rem)/4)] sm:w-20 md:w-24 lg:w-28 xl:w-32"
//     >
//       <Link href={`/products?category=${category._id}`}>
//         <div className="cursor-pointer group/card w-full">
//           {/* Category Image - Circular */}
//           <motion.div
//             className="relative w-full aspect-square rounded-full overflow-hidden bg-[#e8e6dd]"
//             style={{
//               boxShadow: isHovered
//                 ? '0 6px 20px rgba(139, 157, 131, 0.2)'
//                 : '0 3px 8px rgba(0, 0, 0, 0.06)',
//               border: isHovered
//                 ? '2.5px solid #8B9D83'
//                 : '2.5px solid transparent',
//               transition: 'border 0.3s ease, box-shadow 0.3s ease',
//             }}
//           >
//             {/* Image */}
//             <img
//               src={category.image}
//               alt={category.name}
//               className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
//               loading="lazy"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src =
//                   'https://images.unsplash.com/photo-1596462502278-27bfdc6e3b6f?w=400&h=400&fit=crop';
//               }}
//             />

//             {/* Dark Gradient - Circular */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-full" />

//             {/* Green Hover Overlay - Circular */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-t from-[#8B9D83]/60 via-[#8B9D83]/30 to-[#8B9D83]/10 rounded-full"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: isHovered ? 1 : 0 }}
//               transition={{ duration: 0.3 }}
//             />

//             {/* Explore Button - Smaller */}
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center z-20"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: isHovered ? 1 : 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="bg-white/95 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 border border-[#8B9D83]/30">
//                 <span
//                   className="text-[7px] sm:text-[9px] font-medium text-[#8B9D83]"
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   Explore
//                 </span>
//                 <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8B9D83]" />
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Category Name - Smaller */}
//           <motion.div className="mt-1.5 text-center">
//             <motion.h3
//               className="text-[8px] sm:text-[10px] md:text-xs font-medium text-[#263b32] px-1 truncate"
//               style={{ fontFamily: FONT_FAMILY }}
//               animate={{
//                 color: isHovered ? '#8B9D83' : '#263b32',
//               }}
//               transition={{ duration: 0.2 }}
//             >
//               {category.name}
//             </motion.h3>

//             {/* Green Underline - Smaller */}
//             <motion.div
//               className="h-0.5 bg-gradient-to-r from-[#8B9D83] to-[#8B9D83]/30 rounded-full mx-auto mt-0.5"
//               initial={{ width: 0, opacity: 0 }}
//               animate={{
//                 width: isHovered ? '30%' : 0,
//                 opacity: isHovered ? 1 : 0,
//               }}
//               transition={{ duration: 0.3 }}
//             />
//           </motion.div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

// Font family constants - Updated to match site theme
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [pageWidth, setPageWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const scrollContainerRef = useRef(null);
  const wrapperRef = useRef(null);

  const CARDS_PER_VIEW = 8;

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        'http://localhost:5000/api/categories/light'
      );

      const data = await response.json();

      if (data.success) {
        const formattedCategories = data.data.map((cat, index) => ({
          _id: cat._id,
          name: cat.name,
          image: cat.image?.url || getDefaultImage(index),
          slug: cat.slug,
          productCount:
            cat.productCount ||
            Math.floor(Math.random() * 50) + 10,
        }));

        setCategories(formattedCategories);

        setTimeout(() => {
          calculatePageWidth();
          checkScroll();
        }, 150);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);

      const fallbackCategories = [
        {
          _id: '1',
          name: 'Makeup',
          image:
            'https://images.unsplash.com/photo-1596462502278-27bfdc6e3b6f?w=400&h=400&fit=crop',
          productCount: 42,
        },
        {
          _id: '2',
          name: 'Skincare',
          image:
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
          productCount: 38,
        },
        {
          _id: '3',
          name: 'Hair Care',
          image:
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
          productCount: 25,
        },
        {
          _id: '4',
          name: 'Fragrance',
          image:
            'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
          productCount: 31,
        },
        {
          _id: '5',
          name: 'Bath & Body',
          image:
            'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&h=400&fit=crop',
          productCount: 19,
        },
        {
          _id: '6',
          name: 'Natural & Organic',
          image:
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop',
          productCount: 27,
        },
        {
          _id: '7',
          name: 'Tools & Brushes',
          image:
            'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=400&fit=crop',
          productCount: 22,
        },
        {
          _id: '8',
          name: 'Lip Care',
          image:
            'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=400&fit=crop',
          productCount: 45,
        },
        {
          _id: '9',
          name: 'Eye Makeup',
          image:
            'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
          productCount: 30,
        },
      ];

      setCategories(fallbackCategories);

      setTimeout(() => {
        calculatePageWidth();
        checkScroll();
      }, 150);
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultImage = (index) => {
    const images = [
      'https://images.unsplash.com/photo-1596462502278-27bfdc6e3b6f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
    ];

    return images[index % images.length];
  };

  // Calculate page width - FIXED
  const calculatePageWidth = () => {
    if (!scrollContainerRef.current || !wrapperRef.current) {
      return;
    }

    const wrapperParent = wrapperRef.current.parentElement;
    if (!wrapperParent) return;

    const parentWidth = wrapperParent.clientWidth;

    const style = window.getComputedStyle(scrollContainerRef.current);
    const gap = parseFloat(style.columnGap || style.gap) || 12;

    // Get the first card to measure
    const firstCard = scrollContainerRef.current.children[0];
    if (!firstCard) {
      setPageWidth(parentWidth);
      return;
    }

    const cardWidth = firstCard.offsetWidth;

    // Determine how many cards to show based on screen size
    const isMobileDevice = window.innerWidth < 640;
    const cardsToShow = isMobileDevice ? 4 : Math.min(CARDS_PER_VIEW, Math.floor((parentWidth + gap) / (cardWidth + gap)));

    const width = cardsToShow * cardWidth + (cardsToShow - 1) * gap;
    setPageWidth(width);
  };

  // Check arrows
  const checkScroll = () => {
    if (!scrollContainerRef.current) return;

    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = scrollContainerRef.current;

    setShowLeftArrow(scrollLeft > 20);

    setShowRightArrow(
      scrollLeft <
        scrollWidth - clientWidth - 20
    );
  };

  // Scroll
  const scroll = (direction) => {
    if (
      !scrollContainerRef.current ||
      !pageWidth
    ) {
      return;
    }

    const container =
      scrollContainerRef.current;

    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - pageWidth
        : container.scrollLeft + pageWidth;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  // Resize + scroll listeners - FIXED
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    // Initial calculations
    const timeoutId = setTimeout(() => {
      calculatePageWidth();
      checkScroll();
    }, 100);

    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        calculatePageWidth();
        checkScroll();
      }, 150);
    };

    const container = scrollContainerRef.current;
    container.addEventListener('scroll', checkScroll);

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeout);
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [categories]);

  // Recalculate when isMobile changes
  useEffect(() => {
    if (!isLoading && categories.length > 0) {
      setTimeout(() => {
        calculatePageWidth();
        checkScroll();
      }, 50);
    }
  }, [isMobile, isLoading, categories.length]);

  // Loading state
  if (isLoading) {
    return (
      <section className="py-6 md:py-10 bg-[#f8f7f2]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-3 overflow-hidden justify-center">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-[#e5e3da]" />
                <div className="h-3 w-12 bg-[#e5e3da] rounded mx-auto mt-1.5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-4 md:pt-8 lg:pt-8 pb-1 md:pb-2 lg:pb-2 bg-[#f8f7f2] overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#8B9D83]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#8B9D83]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-0 max-w-7xl relative z-10">
        {/* Categories */}
        <div className="relative group px-2 sm:px-4 md:px-6">
          {/* Left Arrow */}
          <AnimatedArrow
            show={showLeftArrow}
            direction="left"
            onClick={() => scroll('left')}
            Icon={ChevronLeft}
          />

          {/* Right Arrow */}
          <AnimatedArrow
            show={showRightArrow}
            direction="right"
            onClick={() => scroll('right')}
            Icon={ChevronRight}
          />

          {/* Wrapper */}
          <div
            ref={wrapperRef}
            className="mx-auto overflow-hidden"
            style={{
              width: pageWidth ? `${pageWidth}px` : '100%',
              maxWidth: '100%',
            }}
          >
            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-2 sm:gap-3 md:gap-4 pb-3 overflow-x-auto scroll-smooth snap-x snap-mandatory"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {categories.map((category, index) => (
                <CategoryCard
                  key={category._id || index}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Animated Arrow
// ============================================================

function AnimatedArrow({ show, direction, onClick, Icon }) {
  if (!show) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous categories' : 'Next categories'}
      className={`
        absolute top-[calc(50%-14px)] -translate-y-1/2 z-30
        bg-white shadow-lg rounded-full p-1.5 sm:p-2
        border border-[#8B9D83]/30
        hover:border-[#8B9D83] hover:bg-[#8B9D83]
        transition-all duration-300
        ${direction === 'left' ? 'left-0 lg:left-3 -ml-1 lg:-ml-2' : 'right-0 lg:right-3 -mr-1 lg:-mr-2'}
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B9D83] hover:text-white transition-colors" />
    </motion.button>
  );
}

// ============================================================
// Category Card - Circular - Reduced Size
// ============================================================

function CategoryCard({ category, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.03, 0.4),
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="shrink-0 snap-start w-[calc((100%-2rem)/4)] sm:w-20 md:w-24 lg:w-28 xl:w-32"
    >
      <Link href={`/products?category=${category._id}`}>
        <div className="cursor-pointer group/card w-full">
          {/* Category Image - Circular */}
          <motion.div
            className="relative w-full aspect-square rounded-full overflow-hidden bg-[#e8e6dd]"
            style={{
              boxShadow: isHovered
                ? '0 6px 20px rgba(139, 157, 131, 0.2)'
                : '0 3px 8px rgba(0, 0, 0, 0.06)',
              border: isHovered
                ? '2.5px solid #8B9D83'
                : '2.5px solid transparent',
              transition: 'border 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://images.unsplash.com/photo-1596462502278-27bfdc6e3b6f?w=400&h=400&fit=crop';
              }}
            />

            {/* Dark Gradient - Circular */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-full" />

            {/* Green Hover Overlay - Circular */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#8B9D83]/60 via-[#8B9D83]/30 to-[#8B9D83]/10 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Explore Button - Smaller */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/95 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 border border-[#8B9D83]/30">
                <span
                  className="text-[7px] sm:text-[9px] font-medium text-[#8B9D83]"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  Explore
                </span>
                <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8B9D83]" />
              </div>
            </motion.div>
          </motion.div>

          {/* Category Name - Smaller */}
          <motion.div className="mt-1.5 text-center">
            <motion.h3
              className="text-[8px] sm:text-[10px] md:text-xs font-medium text-[#263b32] px-1 truncate"
              style={{ fontFamily: FONT_FAMILY }}
              animate={{
                color: isHovered ? '#8B9D83' : '#263b32',
              }}
              transition={{ duration: 0.2 }}
            >
              {category.name}
            </motion.h3>

            {/* Green Underline - Smaller */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-[#8B9D83] to-[#8B9D83]/30 rounded-full mx-auto mt-0.5"
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: isHovered ? '30%' : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}