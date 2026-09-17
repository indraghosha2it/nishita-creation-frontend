// 'use client';

// import { useState, useEffect, useRef, useMemo } from 'react';
// import {
//   Play,
//   X,
//   RectangleHorizontal,
//   RectangleVertical,
//   ChevronLeft,
//   ChevronRight,
//   Star,
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// const BRAND = '#CC1C34';

// // Desktop page size; mobile uses 2 (1 row of 2)
// const DESKTOP_VIDEOS_PER_PAGE = 5;
// const MOBILE_VIDEOS_PER_PAGE = 2;

// // ============================================================
// // HELPERS
// // ============================================================

// const getYouTubeVideoId = (url) => {
//   if (!url) return null;

//   const regex =
//     /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;

//   const match = url.match(regex);

//   return match ? match[1] : null;
// };

// const isPortraitVideo = (video) => {
//   if (!video) return false;

//   if (video.orientation) {
//     return video.orientation === 'portrait';
//   }

//   const url = (video.embedUrl || '').toLowerCase();

//   if (video.sourceType === 'instagram') return true;

//   if (
//     video.sourceType === 'youtube' &&
//     url.includes('/shorts/')
//   ) {
//     return true;
//   }

//   if (
//     video.sourceType === 'facebook' &&
//     (url.includes('/reel/') || url.includes('/reels/'))
//   ) {
//     return true;
//   }

//   return false;
// };

// const buildFacebookUrl = (
//   url,
//   { width = 400, autoplay = false } = {}
// ) =>
//   `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}` +
//   `&show_text=false&width=${Math.round(width)}&autoplay=${autoplay}` +
//   `&mute=1&allowfullscreen=true`;

// const getEmbedUrl = (
//   url,
//   sourceType,
//   portrait = false
// ) => {
//   if (!url) return '';

//   if (sourceType === 'youtube') {
//     const id = getYouTubeVideoId(url);

//     return id
//       ? `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0`
//       : '';
//   }

//   if (sourceType === 'facebook') {
//     return buildFacebookUrl(url, {
//       width: portrait ? 420 : 720,
//       autoplay: true,
//     });
//   }

//   if (sourceType === 'instagram') {
//     const clean = url.replace(/\/+$/, '').split('?')[0];

//     return `${clean}/embed`;
//   }

//   return '';
// };

// const getYouTubeThumbnail = (url) => {
//   const id = getYouTubeVideoId(url);

//   if (!id) return '';

//   return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
// };

// // ============================================================
// // RESPONSIVE HOOK — how many cards per page
// // ============================================================

// function useVideosPerPage() {
//   const [perPage, setPerPage] = useState(DESKTOP_VIDEOS_PER_PAGE);

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     const mq = window.matchMedia('(min-width: 640px)');

//     const update = () => {
//       setPerPage(
//         mq.matches
//           ? DESKTOP_VIDEOS_PER_PAGE
//           : MOBILE_VIDEOS_PER_PAGE
//       );
//     };

//     update();
//     mq.addEventListener('change', update);
//     return () => mq.removeEventListener('change', update);
//   }, []);

//   return perPage;
// }

// // ============================================================
// // PREVIEW CARD
// // ============================================================

// function VideoPreviewCard({ video, onOpen, index = 0 }) {
//   const cardRef = useRef(null);

//   const [isNear, setIsNear] = useState(false);

//   const isYouTube =
//     video.sourceType === 'youtube' && !!video.embedUrl;

//   const isFacebook =
//     video.sourceType === 'facebook' && !!video.embedUrl;

//   const thumbUrl = isYouTube
//     ? getYouTubeThumbnail(video.embedUrl)
//     : video.thumbnailUrl || '';

//   // ==========================================================
//   // FACEBOOK LAZY LOAD
//   // ==========================================================

//   useEffect(() => {
//     if (!isFacebook || !cardRef.current) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsNear(true);
//         }
//       },
//       { rootMargin: '300px' }
//     );

//     observer.observe(cardRef.current);

//     return () => observer.disconnect();
//   }, [isFacebook]);

//   // ==========================================================
//   // KEYBOARD
//   // ==========================================================

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       onOpen();
//     }
//   };

//   return (
//     <motion.div
//       ref={cardRef}
//       role="button"
//       tabIndex={0}
//       onClick={onOpen}
//       onKeyDown={handleKeyDown}
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{
//         duration: 0.4,
//         delay: index * 0.05,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       whileHover={{ y: -4 }}
//       className="
//         group relative w-full aspect-[9/16] cursor-pointer
//         rounded-2xl overflow-hidden
//         bg-[#0f1210]
//         ring-1 ring-black/5
//         shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.15)]
//         hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.25)]
//         transition-shadow duration-300
//         focus:outline-none
//         focus-visible:ring-2
//         focus-visible:ring-[#8B9D83]
//         focus-visible:ring-offset-2
//         focus-visible:ring-offset-[#f8f7f2]
//       "
//     >
//       {/* UPLOADED VIDEO */}
//       {video.sourceType === 'upload' && video.videoUrl && (
//         <video
//           src={`${video.videoUrl}#t=0.1`}
//           poster={video.thumbnailUrl || undefined}
//           className="w-full h-full object-contain bg-black"
//           muted
//           playsInline
//           preload="metadata"
//         />
//       )}

//       {/* YOUTUBE THUMBNAIL */}
//       {isYouTube && (
//         <>
//           {thumbUrl ? (
//             <img
//               src={thumbUrl}
//               alt={video.title || 'Video'}
//               className="
//                 absolute inset-0
//                 w-full h-full
//                 object-cover
//                 bg-black
//                 transition-transform duration-700
//                 group-hover:scale-[1.04]
//               "
//               onError={(e) => {
//                 const id = getYouTubeVideoId(video.embedUrl);

//                 if (id && !e.target.dataset.fallback) {
//                   e.target.dataset.fallback = '1';
//                   e.target.src =
//                     `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
//                 }
//               }}
//             />
//           ) : (
//             <div className="absolute inset-0 bg-black" />
//           )}
//         </>
//       )}

//       {/* FACEBOOK */}
//       {isFacebook && (
//         <>
//           {thumbUrl ? (
//             <img
//               src={thumbUrl}
//               alt={video.title || 'Video'}
//               className="
//                 absolute inset-0
//                 w-full h-full
//                 object-cover
//                 bg-black
//               "
//             />
//           ) : (
//             <div className="
//               absolute inset-0
//               bg-gradient-to-br
//               from-[#8B9D83]
//               to-[#6b7d63]
//             " />
//           )}

//           {isNear && (
//             <iframe
//               src={buildFacebookUrl(video.embedUrl, {
//                 width: 420,
//                 autoplay: false,
//               })}
//               title={video.title || 'Video'}
//               loading="lazy"
//               scrolling="no"
//               frameBorder="0"
//               className="
//                 absolute inset-0
//                 w-full h-full
//                 pointer-events-none
//               "
//               allow="
//                 autoplay;
//                 encrypted-media;
//                 picture-in-picture
//               "
//             />
//           )}
//         </>
//       )}

//       {/* INSTAGRAM / UNKNOWN */}
//       {!video.sourceType ||
//       (!isYouTube &&
//         !isFacebook &&
//         video.sourceType !== 'upload') ? (
//         <>
//           {thumbUrl ? (
//             <img
//               src={thumbUrl}
//               alt={video.title || 'Video'}
//               className="
//                 w-full h-full
//                 object-contain
//                 bg-black
//               "
//             />
//           ) : (
//             <div className="
//               w-full h-full
//               bg-gradient-to-br
//               from-[#8B9D83]
//               to-[#6b7d63]
//             " />
//           )}
//         </>
//       ) : null}

//       {/* SUBTLE NEUTRAL SCRIM */}
//       <div className="
//         absolute inset-0
//         pointer-events-none
//         bg-gradient-to-t
//         from-black/70
//         via-black/5
//         to-black/10
//       " />

//       {/* PLAY BUTTON */}
//       <div className="
//         absolute inset-0
//         flex items-center
//         justify-center
//       ">
//         <motion.button
//           type="button"
//           onClick={(e) => {
//             e.stopPropagation();
//             onOpen();
//           }}
//           aria-label="Play video"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.94 }}
//           className="
//             w-11 h-11
//             rounded-full
//             bg-white/95
//             backdrop-blur-sm
//             flex items-center
//             justify-center
//             shadow-lg
//             ring-1 ring-black/5
//             transition-all duration-200
//             opacity-90
//             group-hover:opacity-100
//             focus:outline-none
//             focus-visible:ring-2
//             focus-visible:ring-white
//           "
//         >
//           <Play
//             className="w-4 h-4 ml-0.5"
//             style={{ color: BRAND }}
//             fill={BRAND}
//           />
//         </motion.button>
//       </div>

//       {/* BOTTOM INFO */}
//       <div className="
//         absolute
//         bottom-0
//         left-0
//         right-0
//         p-3
//         text-left
//         pointer-events-none
//       ">
//         {video.title && (
//           <p className="
//             text-[13px]
//             font-medium
//             text-white
//             leading-snug
//             line-clamp-2
//             drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]
//           ">
//             {video.title}
//           </p>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// // ============================================================
// // MAIN
// // ============================================================

// export default function VideoSection({
//   title = 'Watch Our Videos',
// }) {
//   const [videos, setVideos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [portraitOverride, setPortraitOverride] =
//     useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Responsive page size: 2 on mobile, 5 on desktop
//   const videosPerPage = useVideosPerPage();

//   // ==========================================================
//   // FILTER: 'all'  → all featured videos
//   //         other  → featured videos of that type only
//   // ==========================================================

//   const [activeType, setActiveType] = useState('all');

//   // ==========================================================
//   // FETCH VIDEOS
//   // ==========================================================

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         setIsLoading(true);

//         const response = await fetch(
//           `${API_URL}/api/videos`
//         );

//         const data = await response.json();

//         if (data.success && data.data.length > 0) {
//           setVideos(data.data);
//         }
//       } catch (error) {
//         console.error(
//           'Error fetching videos:',
//           error
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   // ==========================================================
//   // ONLY FEATURED VIDEOS
//   // ==========================================================

//   const featuredVideos = useMemo(
//     () => videos.filter((v) => v.isFeatured === true),
//     [videos]
//   );

//   // ==========================================================
//   // UNIQUE TYPES AMONG FEATURED VIDEOS
//   // ==========================================================

//   const videoTypes = useMemo(() => {
//     const types = featuredVideos
//       .map((v) => (v.type || '').trim().toLowerCase())
//       .filter(Boolean);

//     const unique = Array.from(new Set(types));

//     unique.sort((a, b) => a.localeCompare(b));

//     return unique;
//   }, [featuredVideos]);

//   // ==========================================================
//   // ENSURE ACTIVE TYPE IS VALID
//   // ==========================================================

//   useEffect(() => {
//     if (activeType === 'all') return;

//     if (!videoTypes.includes(activeType)) {
//       setActiveType('all');
//     }
//   }, [videoTypes, activeType]);

//   // ==========================================================
//   // FILTERED FEATURED VIDEOS
//   // ==========================================================

//   const filteredVideos = useMemo(() => {
//     if (activeType === 'all') return featuredVideos;

//     return featuredVideos.filter(
//       (v) =>
//         (v.type || '').trim().toLowerCase() ===
//         activeType
//     );
//   }, [featuredVideos, activeType]);

//   // ==========================================================
//   // PAGINATION (uses responsive page size)
//   // ==========================================================

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredVideos.length / videosPerPage)
//   );

//   const paginatedVideos = useMemo(() => {
//     const start = (currentPage - 1) * videosPerPage;

//     return filteredVideos.slice(
//       start,
//       start + videosPerPage
//     );
//   }, [filteredVideos, currentPage, videosPerPage]);

//   // Reset page when filter / count / page size changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeType, filteredVideos.length, videosPerPage]);

//   // ==========================================================
//   // OPEN VIDEO
//   // ==========================================================

//   const openVideo = (video) => {
//     setPortraitOverride(null);
//     setActiveVideo(video);
//   };

//   // ==========================================================
//   // BODY SCROLL
//   // ==========================================================

//   useEffect(() => {
//     document.body.style.overflow =
//       activeVideo ? 'hidden' : '';

//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [activeVideo]);

//   // ==========================================================
//   // ESCAPE
//   // ==========================================================

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === 'Escape') {
//         setActiveVideo(null);
//       }
//     };

//     if (activeVideo) {
//       window.addEventListener('keydown', onKey);
//     }

//     return () =>
//       window.removeEventListener('keydown', onKey);
//   }, [activeVideo]);

//   // ==========================================================
//   // LOADING
//   // ==========================================================

//   if (isLoading) {
//     return (
//       <section className="py-12 bg-[#f8f7f2]">
//         <div className="flex justify-center items-center h-32">
//           <div className="
//             w-8 h-8
//             border-4
//             border-[#8B9D83]
//             border-t-transparent
//             rounded-full
//             animate-spin
//           " />
//         </div>
//       </section>
//     );
//   }

//   // Hide whole section if no featured videos exist
//   if (featuredVideos.length === 0) {
//     return null;
//   }

//   // ==========================================================
//   // MODAL TYPES
//   // ==========================================================

//   const isUploadModal =
//     activeVideo &&
//     activeVideo.sourceType === 'upload' &&
//     activeVideo.videoUrl;

//   const isFacebookModal =
//     activeVideo &&
//     activeVideo.sourceType === 'facebook';

//   const portrait =
//     portraitOverride !== null
//       ? portraitOverride
//       : isPortraitVideo(activeVideo);

//   const embedBoxClass =
//     isFacebookModal
//       ? 'w-[min(92vw,520px)] h-[min(80vh,860px)]'
//       : portrait
//       ? 'h-[80vh] max-h-[80vh] aspect-[9/16] max-w-[90vw]'
//       : 'w-[min(90vw,900px)] aspect-video max-h-[80vh]';

//   // Options for the toggle: 'all' + each featured type
//   const filterOptions = ['all', ...videoTypes];

//   return (
//     <>
//       {/* ======================================================
//           VIDEO SECTION
//           ====================================================== */}

//       <section className="py-12 md:py-16 bg-[#f8f7f2]">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6">

//           {/* HEADER */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-6 md:mb-8"
//           >
//             <h2 className="
//               text-2xl
//               md:text-3xl
//               font-semibold
//               tracking-tight
//               text-[#263b32]
//             ">
//               {title}
//             </h2>

//             <div
//               className="w-12 h-0.5 mx-auto mt-3 rounded-full"
//               style={{ backgroundColor: BRAND }}
//             />
//           </motion.div>

//           {/* TOGGLE — All + featured types only
//               - On mobile: single line, horizontally scrollable
//               - On desktop: centered, wraps if needed */}
//           {filterOptions.length > 1 && (
//             <motion.div
//               initial={{ opacity: 0, y: 8 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: 0.1 }}
//               className="
//                 mb-8
//                 md:mb-10
//                 -mx-4
//                 px-4
//                 sm:mx-0
//                 sm:px-0
//               "
//             >
//               <div className="
//                 flex
//                 sm:justify-center
//                 overflow-x-auto
//                 no-scrollbar
//                 -webkit-overflow-scrolling-touch
//               ">
//                 <div className="
//                   inline-flex
//                   items-center
//                   gap-1
//                   p-1
//                   rounded-full
//                   bg-white/80
//                   backdrop-blur
//                   border
//                   border-black/5
//                   shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]
//                   shrink-0
//                 ">
//                   {filterOptions.map((type) => {
//                     const isActive = type === activeType;
//                     const label =
//                       type === 'all' ? 'All Featured' : type;

//                     return (
//                       <button
//                         key={type}
//                         type="button"
//                         onClick={() => setActiveType(type)}
//                         aria-pressed={isActive}
//                         className={`
//                           relative
//                           px-4
//                           sm:px-5
//                           py-2
//                           rounded-full
//                           text-[11px]
//                           sm:text-xs
//                           font-semibold
//                           uppercase
//                           tracking-[0.08em]
//                           whitespace-nowrap
//                           transition-colors
//                           duration-200
//                           focus:outline-none
//                           focus-visible:ring-2
//                           focus-visible:ring-[#8B9D83]
//                           focus-visible:ring-offset-2
//                           focus-visible:ring-offset-[#f8f7f2]
//                           ${
//                             isActive
//                               ? 'text-white'
//                               : 'text-[#263b32]/70 hover:text-[#263b32]'
//                           }
//                         `}
//                       >
//                         {isActive && (
//                           <motion.span
//                             layoutId="activeFeaturedTypePill"
//                             className="
//                               absolute inset-0
//                               rounded-full
//                               shadow-[0_2px_8px_-2px_rgba(204,28,52,0.5)]
//                             "
//                             style={{ backgroundColor: BRAND }}
//                             transition={{
//                               type: 'spring',
//                               stiffness: 380,
//                               damping: 32,
//                             }}
//                           />
//                         )}

//                         <span className="
//                           relative z-10
//                           flex items-center gap-1.5
//                         ">
//                           {type === 'all' && (
//                             <Star
//                               className="w-3 h-3"
//                               fill={
//                                 isActive
//                                   ? 'currentColor'
//                                   : 'none'
//                               }
//                             />
//                           )}
//                           {label}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* VIDEO GRID — 2 cols mobile, more on larger screens */}
//           {paginatedVideos.length > 0 ? (
//             <motion.div
//               layout
//               className="
//                 grid
//                 grid-cols-2
//                 sm:grid-cols-3
//                 md:grid-cols-4
//                 lg:grid-cols-5
//                 gap-3
//                 sm:gap-4
//               "
//             >
//               <AnimatePresence mode="popLayout">
//                 {paginatedVideos.map((video, i) => (
//                   <VideoPreviewCard
//                     key={video._id}
//                     video={video}
//                     index={i}
//                     onOpen={() => openVideo(video)}
//                   />
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.35 }}
//               className="
//                 text-center
//                 py-12
//                 text-[#263b32]/50
//                 text-sm
//               "
//             >
//               No featured videos in this category yet.
//             </motion.div>
//           )}

//           {/* PAGINATION — arrows only */}
//           {totalPages > 1 && (
//             <div className="
//               flex
//               items-center
//               justify-center
//               gap-3
//               mt-8
//               md:mt-10
//             ">
//               <button
//                 onClick={() =>
//                   setCurrentPage((p) =>
//                     Math.max(1, p - 1)
//                   )
//                 }
//                 disabled={currentPage === 1}
//                 aria-label="Previous page"
//                 className="
//                   w-10 h-10
//                   flex items-center
//                   justify-center
//                   rounded-full
//                   bg-white
//                   ring-1 ring-black/5
//                   text-[#263b32]
//                   shadow-[0_1px_2px_rgba(0,0,0,0.04)]
//                   hover:bg-[#f0f5ed]
//                   disabled:opacity-40
//                   disabled:cursor-not-allowed
//                   disabled:hover:bg-white
//                   transition-all
//                   duration-200
//                 "
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>

//               <button
//                 onClick={() =>
//                   setCurrentPage((p) =>
//                     Math.min(totalPages, p + 1)
//                   )
//                 }
//                 disabled={currentPage === totalPages}
//                 aria-label="Next page"
//                 className="
//                   w-10 h-10
//                   flex items-center
//                   justify-center
//                   rounded-full
//                   text-white
//                   shadow-[0_2px_8px_-2px_rgba(204,28,52,0.5)]
//                   disabled:opacity-40
//                   disabled:cursor-not-allowed
//                   transition-all
//                   duration-200
//                 "
//                 style={{ backgroundColor: BRAND }}
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ======================================================
//           MODAL
//           ====================================================== */}

//       <AnimatePresence>
//         {activeVideo && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="
//               fixed inset-0
//               z-[9999]
//               flex
//               items-center
//               justify-center
//               p-4
//               bg-black/85
//               backdrop-blur-sm
//             "
//             onClick={() => setActiveVideo(null)}
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.96 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.96 }}
//               transition={{ duration: 0.2 }}
//               onClick={(e) => e.stopPropagation()}
//               className="
//                 relative
//                 flex
//                 flex-col
//                 items-center
//                 max-w-[90vw]
//                 max-h-[90vh]
//               "
//             >
//               {/* MODAL CONTROLS */}
//               <div className="
//                 absolute
//                 -top-12
//                 right-0
//                 flex
//                 items-center
//                 gap-1
//               ">
//                 {!isUploadModal && !isFacebookModal && (
//                   <button
//                     onClick={() =>
//                       setPortraitOverride(!portrait)
//                     }
//                     className="
//                       p-2
//                       text-white/80
//                       hover:text-white
//                       transition-colors
//                     "
//                     aria-label={
//                       portrait
//                         ? 'Switch to landscape'
//                         : 'Switch to portrait'
//                     }
//                     title={
//                       portrait
//                         ? 'Switch to landscape'
//                         : 'Switch to portrait'
//                     }
//                   >
//                     {portrait ? (
//                       <RectangleHorizontal className="w-6 h-6" />
//                     ) : (
//                       <RectangleVertical className="w-6 h-6" />
//                     )}
//                   </button>
//                 )}

//                 <button
//                   onClick={() => setActiveVideo(null)}
//                   className="
//                     p-2
//                     text-white/80
//                     hover:text-white
//                     transition-colors
//                   "
//                   aria-label="Close"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               {/* VIDEO */}
//               <div className="
//                 bg-black
//                 rounded-2xl
//                 overflow-hidden
//                 shadow-2xl
//                 flex
//                 items-center
//                 justify-center
//                 relative
//                 z-10
//               ">
//                 {isUploadModal ? (
//                   <video
//                     src={activeVideo.videoUrl}
//                     className="
//                       max-w-[90vw]
//                       max-h-[80vh]
//                       w-auto
//                       h-auto
//                     "
//                     controls
//                     autoPlay
//                     playsInline
//                   />
//                 ) : (
//                   <div className={embedBoxClass}>
//                     <iframe
//                       key={`${activeVideo._id}-${portrait ? 'p' : 'l'}-modal`}
//                       src={getEmbedUrl(
//                         activeVideo.embedUrl,
//                         activeVideo.sourceType,
//                         portrait
//                       )}
//                       className="w-full h-full"
//                       scrolling="no"
//                       frameBorder="0"
//                       allow="
//                         autoplay;
//                         encrypted-media;
//                         picture-in-picture;
//                         clipboard-write;
//                         fullscreen
//                       "
//                       allowFullScreen
//                       // Critical for mobile: allow interactions inside the FB iframe
//                       style={{
//                         pointerEvents: 'auto',
//                         touchAction: 'auto',
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* TITLE */}
//               {activeVideo.title && (
//                 <p className="
//                   mt-3
//                   text-center
//                   text-white
//                   text-sm
//                   md:text-base
//                   font-medium
//                   max-w-md
//                   truncate
//                 ">
//                   {activeVideo.title}
//                 </p>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  X,
  RectangleHorizontal,
  RectangleVertical,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const BRAND = '#CC1C34';

// Desktop page size; mobile uses 2 (1 row of 2)
const DESKTOP_VIDEOS_PER_PAGE = 5;
const MOBILE_VIDEOS_PER_PAGE = 2;


// ============================================================
// HELPERS
// ============================================================

const getYouTubeVideoId = (url) => {
  if (!url) return null;

  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;

  const match = url.match(regex);

  return match ? match[1] : null;
};

const isPortraitVideo = (video) => {
  if (!video) return false;

  if (video.orientation) {
    return video.orientation === 'portrait';
  }

  const url = (video.embedUrl || '').toLowerCase();

  if (video.sourceType === 'instagram') return true;

  if (
    video.sourceType === 'youtube' &&
    url.includes('/shorts/')
  ) {
    return true;
  }

  if (
    video.sourceType === 'facebook' &&
    (url.includes('/reel/') || url.includes('/reels/'))
  ) {
    return true;
  }

  return false;
};

const buildFacebookUrl = (
  url,
  { width = 400, autoplay = false } = {}
) =>
  `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}` +
  `&show_text=false&width=${Math.round(width)}&autoplay=${autoplay}` +
  `&mute=1&allowfullscreen=true`;

const getEmbedUrl = (
  url,
  sourceType,
  portrait = false
) => {
  if (!url) return '';

  if (sourceType === 'youtube') {
    const id = getYouTubeVideoId(url);

    return id
      ? `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0`
      : '';
  }

  if (sourceType === 'facebook') {
    return buildFacebookUrl(url, {
      width: portrait ? 420 : 720,
      autoplay: true,
    });
  }

  if (sourceType === 'instagram') {
    const clean = url.replace(/\/+$/, '').split('?')[0];

    return `${clean}/embed`;
  }

  return '';
};

const getYouTubeThumbnail = (url) => {
  const id = getYouTubeVideoId(url);

  if (!id) return '';

  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
};

// ============================================================
// RESPONSIVE HOOK — how many cards per page
// ============================================================

function useVideosPerPage() {
  const [perPage, setPerPage] = useState(DESKTOP_VIDEOS_PER_PAGE);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(min-width: 640px)');

    const update = () => {
      setPerPage(
        mq.matches
          ? DESKTOP_VIDEOS_PER_PAGE
          : MOBILE_VIDEOS_PER_PAGE
      );
    };

    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return perPage;
}

// ============================================================
// PREVIEW CARD
// ============================================================

function VideoPreviewCard({ video, onOpen, index = 0 }) {
  const cardRef = useRef(null);

  const [isNear, setIsNear] = useState(false);

  const isYouTube =
    video.sourceType === 'youtube' && !!video.embedUrl;

  const isFacebook =
    video.sourceType === 'facebook' && !!video.embedUrl;

  const thumbUrl = isYouTube
    ? getYouTubeThumbnail(video.embedUrl)
    : video.thumbnailUrl || '';

  // ==========================================================
  // FACEBOOK LAZY LOAD
  // ==========================================================

  useEffect(() => {
    if (!isFacebook || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [isFacebook]);

  // ==========================================================
  // KEYBOARD
  // ==========================================================

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="
        group relative w-full aspect-[9/16] cursor-pointer
        rounded-2xl overflow-hidden
        bg-[#0f1210]
        ring-1 ring-black/5
        shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.15)]
        hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.25)]
        transition-shadow duration-300
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#8B9D83]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#f8f7f2]
      "
    >
      {/* UPLOADED VIDEO */}
      {video.sourceType === 'upload' && video.videoUrl && (
        <video
          src={`${video.videoUrl}#t=0.1`}
          poster={video.thumbnailUrl || undefined}
          className="w-full h-full object-contain bg-black"
          muted
          playsInline
          preload="metadata"
        />
      )}

      {/* YOUTUBE THUMBNAIL */}
      {isYouTube && (
        <>
          {thumbUrl ? (
            <img
              src={thumbUrl}
              alt={video.title || 'Video'}
              className="
                absolute inset-0
                w-full h-full
                object-cover
                bg-black
                transition-transform duration-700
                group-hover:scale-[1.04]
              "
              onError={(e) => {
                const id = getYouTubeVideoId(video.embedUrl);

                if (id && !e.target.dataset.fallback) {
                  e.target.dataset.fallback = '1';
                  e.target.src =
                    `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
                }
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-black" />
          )}
        </>
      )}

      {/* FACEBOOK */}
      {isFacebook && (
        <>
          {thumbUrl ? (
            <img
              src={thumbUrl}
              alt={video.title || 'Video'}
              className="
                absolute inset-0
                w-full h-full
                object-cover
                bg-black
              "
            />
          ) : (
            <div className="
              absolute inset-0
              bg-gradient-to-br
              from-[#8B9D83]
              to-[#6b7d63]
            " />
          )}

          {isNear && (
            <iframe
              src={buildFacebookUrl(video.embedUrl, {
                width: 420,
                autoplay: false,
              })}
              title={video.title || 'Video'}
              loading="lazy"
              scrolling="no"
              frameBorder="0"
              className="
                absolute inset-0
                w-full h-full
                pointer-events-none
              "
              allow="
                autoplay;
                encrypted-media;
                picture-in-picture
              "
            />
          )}
        </>
      )}

      {/* INSTAGRAM / UNKNOWN */}
      {!video.sourceType ||
      (!isYouTube &&
        !isFacebook &&
        video.sourceType !== 'upload') ? (
        <>
          {thumbUrl ? (
            <img
              src={thumbUrl}
              alt={video.title || 'Video'}
              className="
                w-full h-full
                object-contain
                bg-black
              "
            />
          ) : (
            <div className="
              w-full h-full
              bg-gradient-to-br
              from-[#8B9D83]
              to-[#6b7d63]
            " />
          )}
        </>
      ) : null}

      {/* SUBTLE NEUTRAL SCRIM */}
      <div className="
        absolute inset-0
        pointer-events-none
        bg-gradient-to-t
        from-black/70
        via-black/5
        to-black/10
      " />

      {/* PLAY BUTTON */}
      <div className="
        absolute inset-0
        flex items-center
        justify-center
      ">
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          aria-label="Play video"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          className="
            w-11 h-11
            rounded-full
            bg-white/95
            backdrop-blur-sm
            flex items-center
            justify-center
            shadow-lg
            ring-1 ring-black/5
            transition-all duration-200
            opacity-90
            group-hover:opacity-100
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
          "
        >
          <Play
            className="w-4 h-4 ml-0.5"
            style={{ color: BRAND }}
            fill={BRAND}
          />
        </motion.button>
      </div>

      {/* BOTTOM INFO */}
      <div className="
        absolute
        bottom-0
        left-0
        right-0
        p-3
        text-left
        pointer-events-none
      ">
        {video.title && (
          <p className="
            text-[13px]
            font-medium
            text-white
            leading-snug
            line-clamp-2
            drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]
          ">
            {video.title}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================
// MAIN
// ============================================================

export default function VideoSection({
  title = 'Watch Our Videos',
}) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [portraitOverride, setPortraitOverride] =
    useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Responsive page size: 2 on mobile, 5 on desktop
  const videosPerPage = useVideosPerPage();

  // ==========================================================
  // FILTER: 'all'  → all featured videos
  //         other  → featured videos of that type only
  // ==========================================================

  const [activeType, setActiveType] = useState('all');

  // ==========================================================
  // FETCH VIDEOS
  // ==========================================================

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${API_URL}/api/videos`
        );

        const data = await response.json();

        if (data.success && data.data.length > 0) {
          setVideos(data.data);
        }
      } catch (error) {
        console.error(
          'Error fetching videos:',
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // ==========================================================
  // ONLY FEATURED VIDEOS
  // ==========================================================

  const featuredVideos = useMemo(
    () => videos.filter((v) => v.isFeatured === true),
    [videos]
  );

  // ==========================================================
  // UNIQUE TYPES AMONG FEATURED VIDEOS
  // ==========================================================

  const videoTypes = useMemo(() => {
    const types = featuredVideos
      .map((v) => (v.type || '').trim().toLowerCase())
      .filter(Boolean);

    const unique = Array.from(new Set(types));

    unique.sort((a, b) => a.localeCompare(b));

    return unique;
  }, [featuredVideos]);

  // ==========================================================
  // ENSURE ACTIVE TYPE IS VALID
  // ==========================================================

  useEffect(() => {
    if (activeType === 'all') return;

    if (!videoTypes.includes(activeType)) {
      setActiveType('all');
    }
  }, [videoTypes, activeType]);

  // ==========================================================
  // FILTERED FEATURED VIDEOS
  // ==========================================================

  const filteredVideos = useMemo(() => {
    if (activeType === 'all') return featuredVideos;

    return featuredVideos.filter(
      (v) =>
        (v.type || '').trim().toLowerCase() ===
        activeType
    );
  }, [featuredVideos, activeType]);

  // ==========================================================
  // PAGINATION (uses responsive page size)
  // ==========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVideos.length / videosPerPage)
  );

  const paginatedVideos = useMemo(() => {
    const start = (currentPage - 1) * videosPerPage;

    return filteredVideos.slice(
      start,
      start + videosPerPage
    );
  }, [filteredVideos, currentPage, videosPerPage]);

  // Reset page when filter / count / page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeType, filteredVideos.length, videosPerPage]);

  // ==========================================================
  // OPEN VIDEO
  // ==========================================================

  const openVideo = (video) => {
    setPortraitOverride(null);
    setActiveVideo(video);
  };

  // ==========================================================
  // BODY SCROLL
  // ==========================================================

  useEffect(() => {
    document.body.style.overflow =
      activeVideo ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  // ==========================================================
  // ESCAPE
  // ==========================================================

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
      }
    };

    if (activeVideo) {
      window.addEventListener('keydown', onKey);
    }

    return () =>
      window.removeEventListener('keydown', onKey);
  }, [activeVideo]);

  // ==========================================================
  // LOADING
  // ==========================================================

  if (isLoading) {
    return (
      <section className="py-12 bg-[#f8f7f2]">
        <div className="flex justify-center items-center h-32">
          <div className="
            w-8 h-8
            border-4
            border-[#8B9D83]
            border-t-transparent
            rounded-full
            animate-spin
          " />
        </div>
      </section>
    );
  }

  // Hide whole section if no featured videos exist
  if (featuredVideos.length === 0) {
    return null;
  }

  // ==========================================================
  // MODAL TYPES
  // ==========================================================

  const isUploadModal =
    activeVideo &&
    activeVideo.sourceType === 'upload' &&
    activeVideo.videoUrl;

  const isFacebookModal =
    activeVideo &&
    activeVideo.sourceType === 'facebook';

  const portrait =
    portraitOverride !== null
      ? portraitOverride
      : isPortraitVideo(activeVideo);

  const embedBoxClass =
    isFacebookModal
      ? 'w-[min(92vw,520px)] h-[min(80vh,860px)]'
      : portrait
      ? 'h-[80vh] max-h-[80vh] aspect-[9/16] max-w-[90vw]'
      : 'w-[min(90vw,900px)] aspect-video max-h-[80vh]';

  // Options for the toggle: 'all' + each featured type
  const filterOptions = ['all', ...videoTypes];

  return (
    <>
      {/* ======================================================
          VIDEO SECTION
          ====================================================== */}

      <section className="py-6 md:py-10 bg-[#f8f7f2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-2 md:mb-4"
          >
            <h2 className="
              text-2xl
              md:text-3xl
              font-semibold
              font- serif
              tracking-tight
              text-[#263b32]
            ">
              {title}
            </h2>

            <div
              className="w-12 h-0.5 mx-auto mt-3 rounded-full"
              style={{ backgroundColor: BRAND }}
            />
          </motion.div>

          {/* TOGGLE — All + featured types only
              - On mobile: single line, horizontally scrollable
              - On desktop: centered, wraps if needed */}
          {filterOptions.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="
                mb-8
                md:mb-10
                -mx-4
                px-4
                sm:mx-0
                sm:px-0
              "
            >
            <div
  className="
    flex
    sm:justify-center
    overflow-x-auto
    -webkit-overflow-scrolling-touch
  "
  style={{
    scrollbarWidth: 'none',       // Firefox
    msOverflowStyle: 'none',      // legacy IE/Edge
  }}
>
  <style>{`
    .hide-scrollbar::-webkit-scrollbar { display: none; }
  `}</style>
                <div className="
                  inline-flex
                  items-center
                  gap-1
                  p-1
                  rounded-full
                  bg-white/80
                  backdrop-blur
                  border
                  border-black/5
                  shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]
                  shrink-0
                ">
                  {filterOptions.map((type) => {
                    const isActive = type === activeType;
                    const label =
                      type === 'all' ? 'All Featured' : type;

                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setActiveType(type)}
                        aria-pressed={isActive}
                        className={`
                          relative
                          px-4
                          sm:px-5
                          py-2
                          rounded-full
                          text-[11px]
                          sm:text-xs
                          font-semibold
                          uppercase
                          tracking-[0.08em]
                          whitespace-nowrap
                          transition-colors
                          duration-200
                          focus:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#8B9D83]
                          focus-visible:ring-offset-2
                          focus-visible:ring-offset-[#f8f7f2]
                          ${
                            isActive
                              ? 'text-white'
                              : 'text-[#263b32]/70 hover:text-[#263b32]'
                          }
                        `}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="activeFeaturedTypePill"
                            className="
                              absolute inset-0
                              rounded-full
                              shadow-[0_2px_8px_-2px_rgba(204,28,52,0.5)]
                            "
                            style={{ backgroundColor: BRAND }}
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 32,
                            }}
                          />
                        )}

                        <span className="
                          relative z-10
                          flex items-center gap-1.5
                        ">
                          {type === 'all' && (
                            <Star
                              className="w-3 h-3"
                              fill={
                                isActive
                                  ? 'currentColor'
                                  : 'none'
                              }
                            />
                          )}
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* VIDEO GRID — 2 cols mobile, more on larger screens */}
          {paginatedVideos.length > 0 ? (
            <motion.div
              layout
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                gap-3
                sm:gap-4
              "
            >
              <AnimatePresence mode="popLayout">
                {paginatedVideos.map((video, i) => (
                  <VideoPreviewCard
                    key={video._id}
                    video={video}
                    index={i}
                    onOpen={() => openVideo(video)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="
                text-center
                py-12
                text-[#263b32]/50
                text-sm
              "
            >
              No featured videos in this category yet.
            </motion.div>
          )}

          {/* PAGINATION — left arrow · View All · right arrow */}
        <div className="
  flex
  items-center
  justify-center
  gap-2
  sm:gap-3
  mt-8
  md:mt-10
  -mb-15 md:-mb-1
">
  {/* LEFT ARROW — white bg */}
  <button
    onClick={() =>
      setCurrentPage((p) =>
        Math.max(1, p - 1)
      )
    }
    disabled={currentPage === 1}
    aria-label="Previous page"
    className="
      w-10 h-10
      flex items-center
      justify-center
      rounded-full
      bg-white
      ring-1 ring-black/5
      text-[#263b32]
      shadow-[0_1px_2px_rgba(0,0,0,0.04)]
      hover:bg-[#f0f5ed]
      disabled:opacity-40
      disabled:cursor-not-allowed
      disabled:hover:bg-white
      transition-all
      duration-200
    "
  >
    <ChevronLeft className="w-5 h-5" />
  </button>

  {/* VIEW ALL — brand red */}
  <Link
    href="/videos"
    className="
      inline-flex items-center gap-1.5
      px-5 sm:px-7
      py-2.5 sm:py-3
      rounded-full
      text-white
      text-[10px] sm:text-xs
      font-semibold
      uppercase
      tracking-[0.1em]
      whitespace-nowrap
      shadow-[0_2px_10px_-2px_rgba(204,28,52,0.5)]
      hover:-translate-y-0.5
      hover:shadow-[0_4px_14px_-2px_rgba(204,28,52,0.6)]
      transition-all
      duration-200
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-[#CC1C34]
      focus-visible:ring-offset-2
      focus-visible:ring-offset-[#f8f7f2]
    "
    style={{ backgroundColor: BRAND }}
  >
    View All
  </Link>

  {/* RIGHT ARROW — white bg */}
  <button
    onClick={() =>
      setCurrentPage((p) =>
        Math.min(totalPages, p + 1)
      )
    }
    disabled={currentPage === totalPages}
    aria-label="Next page"
    className="
      w-10 h-10
      flex items-center
      justify-center
      rounded-full
      bg-white
      ring-1 ring-black/5
      text-[#263b32]
      shadow-[0_1px_2px_rgba(0,0,0,0.04)]
      hover:bg-[#f0f5ed]
      disabled:opacity-40
      disabled:cursor-not-allowed
      disabled:hover:bg-white
      transition-all
      duration-200
    "
  >
    <ChevronRight className="w-5 h-5" />
  </button>
</div>
        </div>
      </section>

      {/* ======================================================
          MODAL
          ====================================================== */}

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="
              fixed inset-0
              z-[9999]
              flex
              items-center
              justify-center
              p-4
              bg-black/85
              backdrop-blur-sm
            "
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative
                flex
                flex-col
                items-center
                max-w-[90vw]
                max-h-[90vh]
              "
            >
              {/* MODAL CONTROLS */}
              <div className="
                absolute
                -top-12
                right-0
                flex
                items-center
                gap-1
              ">
                {!isUploadModal && !isFacebookModal && (
                  <button
                    onClick={() =>
                      setPortraitOverride(!portrait)
                    }
                    className="
                      p-2
                      text-white/80
                      hover:text-white
                      transition-colors
                    "
                    aria-label={
                      portrait
                        ? 'Switch to landscape'
                        : 'Switch to portrait'
                    }
                    title={
                      portrait
                        ? 'Switch to landscape'
                        : 'Switch to portrait'
                    }
                  >
                    {portrait ? (
                      <RectangleHorizontal className="w-6 h-6" />
                    ) : (
                      <RectangleVertical className="w-6 h-6" />
                    )}
                  </button>
                )}

                <button
                  onClick={() => setActiveVideo(null)}
                  className="
                    p-2
                    text-white/80
                    hover:text-white
                    transition-colors
                  "
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* VIDEO */}
              <div className="
                bg-black
                rounded-2xl
                overflow-hidden
                shadow-2xl
                flex
                items-center
                justify-center
                relative
                z-10
              ">
                {isUploadModal ? (
                  <video
                    src={activeVideo.videoUrl}
                    className="
                      max-w-[90vw]
                      max-h-[80vh]
                      w-auto
                      h-auto
                    "
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <div className={embedBoxClass}>
                    <iframe
                      key={`${activeVideo._id}-${portrait ? 'p' : 'l'}-modal`}
                      src={getEmbedUrl(
                        activeVideo.embedUrl,
                        activeVideo.sourceType,
                        portrait
                      )}
                      className="w-full h-full"
                      scrolling="no"
                      frameBorder="0"
                      allow="
                        autoplay;
                        encrypted-media;
                        picture-in-picture;
                        clipboard-write;
                        fullscreen
                      "
                      allowFullScreen
                      style={{
                        pointerEvents: 'auto',
                        touchAction: 'auto',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* TITLE */}
              {activeVideo.title && (
                <p className="
                  mt-3
                  text-center
                  text-white
                  text-sm
                  md:text-base
                  font-medium
                  max-w-md
                  truncate
                ">
                  {activeVideo.title}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}