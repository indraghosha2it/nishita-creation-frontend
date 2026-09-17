
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
//   const [isMobile, setIsMobile] = useState(false);

//   const scrollContainerRef = useRef(null);
//   const wrapperRef = useRef(null);

//   const CARDS_PER_VIEW = 8;

//   // Detect mobile screen
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

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

//   // Calculate page width - FIXED
//   const calculatePageWidth = () => {
//     if (!scrollContainerRef.current || !wrapperRef.current) {
//       return;
//     }

//     const wrapperParent = wrapperRef.current.parentElement;
//     if (!wrapperParent) return;

//     const parentWidth = wrapperParent.clientWidth;

//     const style = window.getComputedStyle(scrollContainerRef.current);
//     const gap = parseFloat(style.columnGap || style.gap) || 12;

//     // Get the first card to measure
//     const firstCard = scrollContainerRef.current.children[0];
//     if (!firstCard) {
//       setPageWidth(parentWidth);
//       return;
//     }

//     const cardWidth = firstCard.offsetWidth;

//     // Determine how many cards to show based on screen size
//     const isMobileDevice = window.innerWidth < 640;
//     const cardsToShow = isMobileDevice ? 4 : Math.min(CARDS_PER_VIEW, Math.floor((parentWidth + gap) / (cardWidth + gap)));

//     const width = cardsToShow * cardWidth + (cardsToShow - 1) * gap;
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

//   // Resize + scroll listeners - FIXED
//   useEffect(() => {
//     if (!scrollContainerRef.current) return;

//     // Initial calculations
//     const timeoutId = setTimeout(() => {
//       calculatePageWidth();
//       checkScroll();
//     }, 100);

//     // Debounced resize handler
//     let resizeTimeout;
//     const handleResize = () => {
//       clearTimeout(resizeTimeout);
//       resizeTimeout = setTimeout(() => {
//         calculatePageWidth();
//         checkScroll();
//       }, 150);
//     };

//     const container = scrollContainerRef.current;
//     container.addEventListener('scroll', checkScroll);

//     window.addEventListener('resize', handleResize);

//     return () => {
//       clearTimeout(timeoutId);
//       clearTimeout(resizeTimeout);
//       container.removeEventListener('scroll', checkScroll);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [categories]);

//   // Recalculate when isMobile changes
//   useEffect(() => {
//     if (!isLoading && categories.length > 0) {
//       setTimeout(() => {
//         calculatePageWidth();
//         checkScroll();
//       }, 50);
//     }
//   }, [isMobile, isLoading, categories.length]);

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

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const SIDE_SLOTS = 4;

// ============================================
// OCCASION CARD
// ============================================
function OccasionCard({
  image,
  imageMobile,
  title,
  subtitle,
  href,
  center = false,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const displayImage =
    center && imageMobile && isMobile ? imageMobile : image;

  return (
    <Link
      href={href}
      className={`
        group relative block overflow-hidden rounded-[5px]
        ${center ? 'aspect-[2/1] md:aspect-auto md:h-full' : 'aspect-[2/1]'}
      `}
    >
      <Image
        key={displayImage}
        src={displayImage}
        alt={title}
        fill
        priority
        className="
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-105
        "
        sizes="
          (max-width: 767px) 100vw,
          (max-width: 1024px) 50vw,
          33vw
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/65
          via-black/10
          to-transparent
        "
      />

      <div
        className={`
          absolute
          bottom-5
          left-4
          right-4
          text-white
          ${center ? 'text-center md:text-center' : 'text-left'}
        `}
      >
        <h3
          className="
            text-[18px]
            leading-tight
            font-medium
            tracking-[-0.3px]
            md:text-[20px]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-[10px]
            font-medium
            tracking-[0.3px]
            md:text-[11px]
          "
        >
          {subtitle}
          <span className="ml-1 text-[14px]">→</span>
        </p>
      </div>
    </Link>
  );
}

// ============================================
// PLACEHOLDER CARD
// ============================================
function PlaceholderCard({ center = false }) {
  return (
    <div
      className={`
        relative block rounded-[5px] bg-[#F4F4F4]
        ${center ? 'aspect-[2/1] md:aspect-auto md:h-full' : 'aspect-[2/1]'}
      `}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] md:text-[11px] tracking-[0.3px] font-medium text-[#B8B8B8]">
          COMING SOON
        </span>
      </div>
    </div>
  );
}

export default function OccasionSection() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`${API_URL}/api/tags?isActive=true`, {
          cache: 'no-store',
        });
        const data = await response.json();
        if (data.success) {
          const sorted = [...data.data].sort((a, b) => a.order - b.order);
          setTags(sorted);
        }
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const centerTag = tags.find((t) => t.order === 0) || null;

  const sideTags = tags
    .filter((t) => t.order !== 0)
    .sort((a, b) => a.order - b.order);

  const totalPages = Math.max(1, Math.ceil(sideTags.length / SIDE_SLOTS));
  const hasMultiplePages = totalPages > 1;

  const currentPage = Math.min(page, totalPages - 1);
  const startIndex = currentPage * SIDE_SLOTS;

  const visibleSide = [];
  for (let i = 0; i < SIDE_SLOTS; i++) {
    const idx = startIndex + i;
    if (idx < sideTags.length) {
      visibleSide.push(sideTags[idx]);
    } else if (sideTags.length > 0) {
      visibleSide.push(sideTags[i % sideTags.length]);
    }
  }

  const leftTop = visibleSide[0] || null;
  const rightTop = visibleSide[1] || null;
  const leftBottom = visibleSide[2] || null;
  const rightBottom = visibleSide[3] || null;

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () =>
    setPage((p) => Math.min(totalPages - 1, p + 1));

  if (loading || tags.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-6 md:py-8 lg:py-9">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">

        {/* HEADER */}
        <div className="mb-5 flex items-center justify-between md:mb-6">
          <h2
            className="
              text-[25px]
              font-medium
              leading-none
              tracking-[-1px]
              text-[#3F3F3F]
              md:text-[29px]
              lg:text-[32px]
            "
          >
            Shop By{' '}
            <span className="font-semibold text-[#A5252E]">
              Collections
            </span>
          </h2>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/collections"
              className="
                border-b
                border-[#333]
                pb-[2px]
                text-[11px]
                font-medium
                tracking-wide
                text-[#333]
                transition-opacity
                hover:opacity-60
                md:text-[12px]
              "
            >
              ALL COLLECTIONS
            </Link>

            {hasMultiplePages && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  aria-label="Previous"
                  className="
                    flex h-7 w-7 items-center justify-center
                    rounded-full border border-[#333]/25
                    text-[#333]
                    transition
                    hover:bg-[#B82E68] hover:text-white hover:border-[#B82E68]
                    disabled:opacity-30 disabled:cursor-not-allowed
                    disabled:hover:bg-transparent disabled:hover:text-[#333]
                    disabled:hover:border-[#333]/25
                  "
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPage >= totalPages - 1}
                  aria-label="Next"
                  className="
                    flex h-7 w-7 items-center justify-center
                    rounded-full border border-[#333]/25
                    text-[#333]
                    transition
                    hover:bg-[#B82E68] hover:text-white hover:border-[#B82E68]
                    disabled:opacity-30 disabled:cursor-not-allowed
                    disabled:hover:bg-transparent disabled:hover:text-[#333]
                    disabled:hover:border-[#333]/25
                  "
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            gap-2.5

            md:grid-cols-3
            md:grid-rows-2
            md:gap-3.5
          "
        >

          {/* LEFT TOP */}
          {leftTop ? (
            <OccasionCard
              image={leftTop.image}
              title={leftTop.name}
              subtitle="ALL COLLECTIONS"
              href={`/collections?tag=${leftTop.slug}`}
            />
          ) : (
            <PlaceholderCard />
          )}

          {/* CENTER */}
          {centerTag ? (
            <div className="md:row-span-2">
              <OccasionCard
                image={centerTag.image}
                imageMobile={centerTag.imageMobile}
                title={centerTag.name}
                subtitle="EXPLORE"
                href={`/collections?tag=${centerTag.slug}`}
                center
              />
            </div>
          ) : (
            <div className="md:row-span-2">
              <PlaceholderCard center />
            </div>
          )}

          {/* RIGHT TOP */}
          {rightTop ? (
            <OccasionCard
              image={rightTop.image}
              title={rightTop.name}
              subtitle="ALL COLLECTIONS"
              href={`/collections?tag=${rightTop.slug}`}
            />
          ) : (
            <PlaceholderCard />
          )}

          {/* LEFT BOTTOM */}
          {leftBottom ? (
            <OccasionCard
              image={leftBottom.image}
              title={leftBottom.name}
              subtitle="ALL COLLECTIONS"
              href={`/collections?tag=${leftBottom.slug}`}
            />
          ) : (
            <PlaceholderCard />
          )}

          {/* RIGHT BOTTOM */}
          {rightBottom ? (
            <OccasionCard
              image={rightBottom.image}
              title={rightBottom.name}
              subtitle="ALL COLLECTIONS"
              href={`/collections?tag=${rightBottom.slug}`}
            />
          ) : (
            <PlaceholderCard />
          )}

        </div>

        {/* Mobile View All + arrows */}
        <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
          {hasMultiplePages && (
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 0}
              aria-label="Previous"
              className="
                flex h-7 w-7 items-center justify-center
                rounded-full border border-[#333]/25
                text-[#333]
                disabled:opacity-30 disabled:cursor-not-allowed
              "
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          <Link
            href="/collections"
            className="
              border-b
              border-[#333]
              pb-1
              text-[11px]
              font-medium
              tracking-wide
              text-[#333]
            "
          >
            VIEW ALL EVENTS
          </Link>

          {hasMultiplePages && (
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              aria-label="Next"
              className="
                flex h-7 w-7 items-center justify-center
                rounded-full border border-[#333]/25
                text-[#333]
                disabled:opacity-30 disabled:cursor-not-allowed
              "
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
}