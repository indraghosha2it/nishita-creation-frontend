// // app/components/layout/ScrollToTop.jsx (Refined Version)
// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function ScrollToTop() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <AnimatePresence mode="wait">
//       {isVisible && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 20 }}
//           transition={{ 
//             duration: 0.4,
//             ease: [0.23, 1, 0.32, 1] // Cubic bezier for smooth motion
//           }}
//           className="fixed bottom-24 right-6 z-50"
//         >
//           <motion.button
//             onClick={scrollToTop}
//             className="relative flex items-center justify-center w-14 h-14 group"
//             whileHover="hover"
//             initial="initial"
//             aria-label="Scroll to top"
//           >
//             {/* Subtle background that appears on hover */}
//             <motion.div
//               className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E39A65]/0 to-[#E39A65]/0 group-hover:from-[#E39A65]/5 group-hover:to-[#E39A65]/10 transition-all duration-500"
//               variants={{
//                 hover: {
//                   scale: 1.2,
//                   transition: { duration: 0.3 }
//                 }
//               }}
//             />
            
//             {/* Thin circular border */}
//             <div className="absolute inset-0 rounded-full border border-gray-200/60 group-hover:border-[#E39A65]/40 transition-all duration-500" />
            
//             {/* Inner dot decoration */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#E39A65] transition-colors duration-500" />
            
//             {/* Arrow with bounce animation */}
//             <motion.div
//               animate={{ 
//                 y: [0, -6, 0],
//               }}
//               transition={{
//                 duration: 2.5,
//                 repeat: Infinity,
//                 repeatType: "loop",
//                 ease: "easeInOut",
//                 times: [0, 0.5, 1]
//               }}
//             >
//               <svg 
//                 width="22" 
//                 height="22" 
//                 viewBox="0 0 24 24" 
//                 fill="none" 
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="text-gray-500 group-hover:text-[#E39A65] transition-colors duration-500"
//               >
//                 <path 
//                   d="M12 20V4M12 4L5 11M12 4L19 11" 
//                   stroke="currentColor" 
//                   strokeWidth="1.8" 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </motion.div>

//             {/* Elegant tooltip */}
//             <motion.div
//               variants={{
//                 initial: { opacity: 0, x: -15 },
//                 hover: { opacity: 1, x: 0 }
//               }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               className="absolute right-full mr-4 px-4 py-2 bg-white shadow-xl rounded-lg text-sm font-medium text-gray-700 whitespace-nowrap border border-gray-100 pointer-events-none"
//             >
//               <span className="flex items-center gap-2">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#E39A65]">
//                   <path d="M12 20V4M12 4L5 11M12 4L19 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 Scroll to top
//               </span>
//               {/* Tooltip arrow */}
//               <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-gray-100 rotate-45"></div>
//             </motion.div>
//           </motion.button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


// app/components/layout/ScrollToTop.jsx (Reduced Size Version)
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="fixed bottom-24 right-9 z-50"
        >
          <motion.button
            onClick={scrollToTop}
            className="relative flex items-center justify-center w-10 h-10 group"
            whileHover="hover"
            initial="initial"
            aria-label="Scroll to top"
          >
            {/* Subtle background that appears on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E39A65]/0 to-[#E39A65]/0 group-hover:from-[#E39A65]/5 group-hover:to-[#E39A65]/10 transition-all duration-500"
              variants={{
                hover: {
                  scale: 1.2,
                  transition: { duration: 0.3 }
                }
              }}
            />
            
            {/* Thin circular border */}
            <div className=" absolute inset-0 rounded-full border border-gray-200/60 group-hover:border-[#E39A65]/40 transition-all duration-500" />
            
            {/* Inner dot decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#E39A65] transition-colors duration-500" />
            
            {/* Arrow with bounce animation */}
            <motion.div
              animate={{ 
                y: [0, -6, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500 group-hover:text-[#E39A65] transition-colors duration-500"
              >
                <path 
                  d="M12 20V4M12 4L5 11M12 4L19 11" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Elegant tooltip */}
            <motion.div
              variants={{
                initial: { opacity: 0, x: -15 },
                hover: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-full mr-3 px-3 py-1.5 bg-white shadow-xl rounded-lg text-xs font-medium text-gray-700 whitespace-nowrap border border-gray-100 pointer-events-none"
            >
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#E39A65]">
                  <path d="M12 20V4M12 4L5 11M12 4L19 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Scroll to top
              </span>
              {/* Tooltip arrow */}
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-gray-100 rotate-45"></div>
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}