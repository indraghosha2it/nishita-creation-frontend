
// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Star, 
//   MessageCircle, 
//   ChevronLeft, 
//   ChevronRight, 
//   Quote, 
//   ArrowRight,
//   Eye,
//   X,
//   Calendar,
//   Award,
//   CheckCircle,
//   Package,
//   Sparkles,
//   Building2,
//   Globe,
//   TrendingUp,
//   User,
//   Briefcase,
//   MapPin,
//   Clock,
//   ThumbsUp,
//   Heart,
//   Search,
//   Filter,
//   SlidersHorizontal,
//   Loader2,
//   Users
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import WhatsAppButton from '../components/layout/WhatsAppButton';
// import ReviewModal from '../components/home/ReviewModal';


// // Jute Theme Colors
// const COLORS = {
//   primary: '#6B4F3A',
//   secondary: '#F5E6D3',
//   accent: '#3A7D44',
//   gold: '#C6A43B',
//   text: '#2C2420',
//   textLight: '#8B7355',
//   border: '#E5D5C0',
//   lightBg: '#FAF7F2'
// };

// export default function AllReviewsPage() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalReviews: 0,
//     limit: 9
//   });
//   const [filters, setFilters] = useState({
//     rating: '',
//     sort: 'newest',
//     search: ''
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [stats, setStats] = useState({
//     averageRating: 0,
//     totalReviews: 0,
//     ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
//   });

//   useEffect(() => {
//     fetchReviews();
//     fetchStats();
//   }, [pagination.currentPage, filters]);

//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams({
//         page: pagination.currentPage,
//         limit: pagination.limit,
//         sort: filters.sort === 'highest' ? '-rating' : '-createdAt'
//       });

//       if (filters.rating) {
//         params.append('rating', filters.rating);
//       }

//       if (filters.search) {
//         params.append('search', filters.search);
//       }

//       const response = await fetch(`http://localhost:5000/api/reviews/public?${params}`);
//       const data = await response.json();

//       if (data.success) {
//         setReviews(data.data);
//         setPagination(prev => ({
//           ...prev,
//           totalPages: data.pagination.pages,
//           totalReviews: data.pagination.total
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       toast.error('Failed to load reviews');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/reviews/public?limit=1000');
//       const data = await response.json();
      
//       if (data.success) {
//         const allReviews = data.data;
//         const total = allReviews.length;
//         const avgRating = total > 0 
//           ? allReviews.reduce((sum, r) => sum + r.rating, 0) / total 
//           : 0;
        
//         const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//         allReviews.forEach(r => {
//           distribution[r.rating] = (distribution[r.rating] || 0) + 1;
//         });

//         setStats({
//           averageRating: avgRating,
//           totalReviews: total,
//           ratingDistribution: distribution
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, currentPage: newPage }));
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//     setPagination(prev => ({ ...prev, currentPage: 1 }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       rating: '',
//       sort: 'newest',
//       search: ''
//     });
//     setPagination(prev => ({ ...prev, currentPage: 1 }));
//   };

//   const handleViewReview = (review) => {
//     setSelectedReview(review);
//     setIsViewModalOpen(true);
//   };

//   const StarRating = ({ rating, size = "w-4 h-4" }) => {
//     return (
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`${size} ${
//               star <= rating
//                 ? 'fill-[#C6A43B] text-[#C6A43B]'
//                 : 'text-gray-300'
//             }`}
//           />
//         ))}
//       </div>
//     );
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const getUserName = (review) => {
//     if (review.userName) return review.userName;
//     if (review.user) {
//       if (review.user.contactPerson) return review.user.contactPerson;
//       if (review.user.companyName) return review.user.companyName;
//     }
//     return 'Verified Buyer';
//   };

//   const getUserCompany = (review) => {
//     if (review.userCompany) return review.userCompany;
//     if (review.user?.companyName) return review.user.companyName;
//     return null;
//   };

//   const getUserCountry = (review) => {
//     return review.user?.country || null;
//   };

//   const getUserInitials = (review) => {
//     const name = getUserName(review);
//     return name.charAt(0).toUpperCase();
//   };

//   const getProductName = (review) => {
//     if (review.product?.productName) return review.product.productName;
//     return null;
//   };

//   const getRandomColor = (index) => {
//     const colors = ['#4A7C59', '#C6A43B', '#6B4F3A', '#3A7D44', '#8B6B51'];
//     return colors[index % colors.length];
//   };

//   const RatingProgressBar = ({ rating, count, total }) => {
//     const percentage = total > 0 ? (count / total) * 100 : 0;
    
//     return (
//       <div className="flex items-center gap-2 text-sm">
//         <span className="text-gray-600 w-8">{rating}★</span>
//         <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//           <div 
//             className="h-full bg-[#C6A43B] rounded-full"
//             style={{ width: `${percentage}%` }}
//           />
//         </div>
//         <span className="text-gray-500 w-8 text-right">{count}</span>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen pt-16" style={{ backgroundColor: COLORS.lightBg }}>
//      <div className="relative overflow-hidden min-h-[200px] md:min-h-[280px] flex items-center justify-center">
//   {/* Background Image */}
//   <div 
//     className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//     style={{
//       backgroundImage: `url('https://i.ibb.co.com/bgmvt8BP/Cakhk.png')`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//     }}
//   >
//     {/* Dark Overlay with Gradient */}
//     <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-[#6B4F3A]/60" />
//   </div>

//   {/* Jute Pattern Overlay */}
//   <div className="absolute inset-0 opacity-10">
//     <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//       <defs>
//         <pattern id="jutePatternHero" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
//           <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="1"/>
//         </pattern>
//       </defs>
//       <rect width="100%" height="100%" fill="url(#jutePatternHero)"/>
//     </svg>
//   </div>
  
//   <div className="container mx-auto px-4 max-w-7xl py-10 md:py-14 text-center relative z-10">
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Trust Badge */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.2 }}
//         className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-0.5 md:px-4 md:py-1.5 mb-3 md:mb-4 border border-white/20"
//       >
//         <span className="relative flex h-1.5 w-1.5">
//           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A43B] opacity-75"></span>
//           <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C6A43B]"></span>
//         </span>
//         <span className="text-[10px] md:text-xs font-semibold text-white tracking-wider uppercase">Real Customer Stories</span>
//       </motion.div>

//       {/* Main Heading */}
//       <motion.h1 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3, duration: 0.6 }}
//         className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 font-serif"
//       >
//         What Our 
//         <span className="relative inline-block mx-1 md:mx-2">
//           <span className="bg-gradient-to-r from-[#C6A43B] to-[#D4B85C] bg-clip-text text-transparent">
//             Customers Say
//           </span>
//           <svg className="absolute -bottom-1.5 left-0 w-full" height="3" viewBox="0 0 300 4" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M1 2C100 0.5 200 0.5 299 2" stroke="#C6A43B" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4"/>
//           </svg>
//         </span>
//       </motion.h1>

//       {/* Subtitle */}
//       <motion.p 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4, duration: 0.6 }}
//         className="text-white/80 text-xs md:text-sm max-w-2xl mx-auto mb-4 md:mb-5 font-sans px-2"
//       >
//         Real feedback from wholesale buyers and importers worldwide who trust Jute Craftify
//       </motion.p>

//       {/* Stats Row */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.6 }}
//         className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
//       >
//         <div className="flex items-center gap-1.5 md:gap-2">
//           <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#C6A43B]/20 flex items-center justify-center">
//             <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#C6A43B] fill-[#C6A43B]" />
//           </div>
//           <div className="text-left">
//             <div className="text-white font-bold text-sm md:text-base">4.8+</div>
//             <div className="text-white/60 text-[8px] md:text-[10px] font-sans">Avg Rating</div>
//           </div>
//         </div>
//         <div className="w-px h-6 md:h-8 bg-white/20"></div>
//         <div className="flex items-center gap-1.5 md:gap-2">
//           <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#C6A43B]/20 flex items-center justify-center">
//             <Users className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#C6A43B]" />
//           </div>
//           <div className="text-left">
//             <div className="text-white font-bold text-sm md:text-base">800+</div>
//             <div className="text-white/60 text-[8px] md:text-[10px] font-sans">Happy Clients</div>
//           </div>
//         </div>
//         <div className="w-px h-6 md:h-8 bg-white/20"></div>
//         <div className="flex items-center gap-1.5 md:gap-2">
//           <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#C6A43B]/20 flex items-center justify-center">
//             <Globe className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#C6A43B]" />
//           </div>
//           <div className="text-left">
//             <div className="text-white font-bold text-sm md:text-base">30+</div>
//             <div className="text-white/60 text-[8px] md:text-[10px] font-sans">Countries</div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   </div>
// </div>

//         <div className="container mx-auto px-4 max-w-7xl py-8">
//           {/* Stats Overview */}
//           {stats.totalReviews > 0 && (
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white rounded-2xl border border-[#E5D5C0] p-6 mb-8 shadow-sm"
//             >
//               <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
//                 {/* Rating Summary */}
//                 <div className="text-center lg:text-left">
//                   <div className="text-4xl font-bold text-[#6B4F3A] font-serif">
//                     {stats.averageRating.toFixed(1)}
//                   </div>
//                   <div className="mt-2">
//                     <StarRating rating={Math.round(stats.averageRating)} size="w-5 h-5" />
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {stats.totalReviews} reviews
//                   </p>
//                 </div>

//                 {/* Rating Distribution */}
//                 <div className="flex-1 space-y-2">
//                   {[5, 4, 3, 2, 1].map(rating => (
//                     <RatingProgressBar
//                       key={rating}
//                       rating={rating}
//                       count={stats.ratingDistribution[rating] || 0}
//                       total={stats.totalReviews}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Filters Bar */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="bg-white rounded-xl border border-[#E5D5C0] p-4 mb-8"
//           >
//             <div className="flex flex-col md:flex-row gap-4">
//               {/* Search */}
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search reviews by product or comment..."
//                   value={filters.search}
//                   onChange={(e) => handleFilterChange('search', e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent"
//                 />
//               </div>

//               {/* Filter Button (Mobile) */}
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="md:hidden flex items-center justify-center gap-2 px-4 py-2 bg-[#FAF7F2] rounded-lg text-gray-700 border border-[#E5D5C0]"
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//                 Filters
//                 {(filters.rating || filters.search) && (
//                   <span className="w-2 h-2 bg-[#C6A43B] rounded-full"></span>
//                 )}
//               </button>

//               {/* Desktop Filters */}
//               <div className="hidden md:flex items-center gap-3">
//                 <select
//                   value={filters.rating}
//                   onChange={(e) => handleFilterChange('rating', e.target.value)}
//                   className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C6A43B] bg-white"
//                 >
//                   <option value="">All Ratings</option>
//                   <option value="5">5 Stars</option>
//                   <option value="4">4 Stars</option>
//                   <option value="3">3 Stars</option>
//                   <option value="2">2 Stars</option>
//                   <option value="1">1 Star</option>
//                 </select>

//                 <select
//                   value={filters.sort}
//                   onChange={(e) => handleFilterChange('sort', e.target.value)}
//                   className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C6A43B] bg-white"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="highest">Highest Rated</option>
//                 </select>

//                 {(filters.rating || filters.search) && (
//                   <button
//                     onClick={clearFilters}
//                     className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-[#6B4F3A] transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                     Clear
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Mobile Filters Panel */}
//             {showFilters && (
//               <div className="mt-4 space-y-3 md:hidden">
//                 <select
//                   value={filters.rating}
//                   onChange={(e) => handleFilterChange('rating', e.target.value)}
//                   className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg"
//                 >
//                   <option value="">All Ratings</option>
//                   <option value="5">5 Stars</option>
//                   <option value="4">4 Stars</option>
//                   <option value="3">3 Stars</option>
//                   <option value="2">2 Stars</option>
//                   <option value="1">1 Star</option>
//                 </select>

//                 <select
//                   value={filters.sort}
//                   onChange={(e) => handleFilterChange('sort', e.target.value)}
//                   className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="highest">Highest Rated</option>
//                 </select>

//                 {(filters.rating || filters.search) && (
//                   <button
//                     onClick={clearFilters}
//                     className="w-full px-4 py-2 text-sm bg-[#FAF7F2] rounded-lg text-[#6B4F3A] border border-[#E5D5C0]"
//                   >
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             )}
//           </motion.div>

//           {/* Reviews Grid */}
//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <div className="relative">
//                 <Loader2 className="w-10 h-10 animate-spin text-[#C6A43B]" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-2 h-2 bg-[#C6A43B] rounded-full animate-pulse"></div>
//                 </div>
//               </div>
//             </div>
//           ) : reviews.length === 0 ? (
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-20 bg-white rounded-2xl border border-[#E5D5C0]"
//             >
//               <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2 font-serif">No reviews found</h3>
//               <p className="text-gray-500">Try adjusting your filters or search criteria</p>
//             </motion.div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {reviews.map((review, idx) => {
//                   const color = getRandomColor(idx);
//                   const userName = getUserName(review);
//                   const userCompany = getUserCompany(review);
//                   const userCountry = getUserCountry(review);
//                   const productName = getProductName(review);
//                   const reviewDate = formatDate(review.createdAt);
                  
//                   return (
//                     <motion.div
//                       key={review._id}
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: idx * 0.05 }}
//                       whileHover={{ y: -8 }}
//                       className="group bg-white rounded-2xl border border-[#E5D5C0] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
//                       onClick={() => handleViewReview(review)}
//                     >
//                       {/* Card Content - Same as ReviewsSection */}
//                       <div className="p-5 md:p-6">
//                         {/* Header - Avatar and Rating */}
//                         <div className="flex items-start justify-between mb-4">
//                           <div className="flex items-center gap-3">
//                             <div 
//                               className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
//                               style={{ backgroundColor: color }}
//                             >
//                               {getUserInitials(review)}
//                             </div>
//                             <div>
//                               <h4 className="font-semibold text-[#2C2420] font-serif text-sm md:text-base">
//                                 {userName}
//                               </h4>
//                               {userCompany && (
//                                 <p className="text-[10px] text-[#C6A43B] font-medium font-sans flex items-center gap-1">
//                                   <Briefcase className="w-2.5 h-2.5" />
//                                   {userCompany}
//                                 </p>
//                               )}
//                               {userCountry && (
//                                 <p className="text-[9px] text-gray-400 font-sans flex items-center gap-1 mt-0.5">
//                                   <MapPin className="w-2.5 h-2.5" />
//                                   {userCountry}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                           <StarRating rating={review.rating} size="w-3 h-3" />
//                         </div>

//                         {/* Testimonial Text */}
//                         <div className="mb-4">
//                           <div className="flex items-center gap-1 mb-2">
//                             <Quote className="w-4 h-4 text-[#C6A43B]/40" />
//                             {review.title && (
//                               <p className="text-xs font-semibold text-[#4A7C59] uppercase tracking-wide font-sans">
//                                 {review.title}
//                               </p>
//                             )}
//                           </div>
//                           <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-sans line-clamp-4">
//                             "{review.comment}"
//                           </p>
//                         </div>

//                         {/* Product Info */}
//                         {productName && (
//                           <div className="mb-4 pt-3 border-t border-[#E5D5C0]">
//                             <div className="flex items-center gap-1.5">
//                               <Package className="w-3 h-3 text-[#4A7C59]" />
//                               <p className="text-[10px] text-gray-500 font-sans">
//                                 Product: <span className="font-medium text-[#2C2420]">{productName}</span>
//                               </p>
//                             </div>
//                           </div>
//                         )}

//                         {/* Date and Verification Badge */}
//                         <div className="flex items-center justify-between pt-3 border-t border-[#E5D5C0]">
//                           <div className="flex items-center gap-1">
//                             <Clock className="w-3 h-3 text-gray-400" />
//                             <span className="text-[9px] text-gray-400 font-sans">{reviewDate}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <CheckCircle className="w-3 h-3 text-[#4A7C59]" />
//                             <span className="text-[9px] text-[#4A7C59] font-sans font-medium">Verified</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Footer Buttons */}
//                       <div className="flex border-t border-[#E5D5C0] bg-[#FAF7F2]">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleViewReview(review);
//                           }}
//                           className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium text-gray-600 hover:bg-white hover:text-[#4A7C59] transition-all duration-300"
//                         >
//                           <Eye className="w-3.5 h-3.5" />
//                           Read Full Review
//                         </button>
//                         <div className="w-px bg-[#E5D5C0]"></div>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setIsWriteModalOpen(true);
//                           }}
//                           className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium text-gray-600 hover:bg-white hover:text-[#4A7C59] transition-all duration-300"
//                         >
//                           <MessageCircle className="w-3.5 h-3.5" />
//                           Write Review
//                         </button>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>

//               {/* Pagination */}
//               {pagination.totalPages > 1 && (
//                 <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 mt-8 bg-white rounded-xl border border-[#E5D5C0]">
//                   <p className="text-sm text-gray-500">
//                     Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
//                     {Math.min(pagination.currentPage * pagination.limit, pagination.totalReviews)} of {pagination.totalReviews} reviews
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => handlePageChange(pagination.currentPage - 1)}
//                       disabled={pagination.currentPage === 1}
//                       className="p-2 text-gray-400 hover:text-[#6B4F3A] hover:bg-[#FAF7F2] rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
//                     >
//                       <ChevronLeft className="w-5 h-5" />
//                     </button>
//                     <div className="flex items-center gap-1">
//                       {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
//                         let pageNum;
//                         if (pagination.totalPages <= 5) {
//                           pageNum = i + 1;
//                         } else if (pagination.currentPage <= 3) {
//                           pageNum = i + 1;
//                         } else if (pagination.currentPage >= pagination.totalPages - 2) {
//                           pageNum = pagination.totalPages - 4 + i;
//                         } else {
//                           pageNum = pagination.currentPage - 2 + i;
//                         }
                        
//                         const isActive = pagination.currentPage === pageNum;
                        
//                         return (
//                           <button
//                             key={pageNum}
//                             onClick={() => handlePageChange(pageNum)}
//                             className={`w-8 h-8 text-sm font-medium rounded-lg transition-all ${
//                               isActive
//                                 ? 'bg-[#6B4F3A] text-white shadow-md'
//                                 : 'text-gray-700 hover:bg-[#FAF7F2] hover:text-[#6B4F3A]'
//                             }`}
//                           >
//                             {pageNum}
//                           </button>
//                         );
//                       })}
//                     </div>
//                     <button
//                       onClick={() => handlePageChange(pagination.currentPage + 1)}
//                       disabled={pagination.currentPage === pagination.totalPages}
//                       className="p-2 text-gray-400 hover:text-[#6B4F3A] hover:bg-[#FAF7F2] rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Write Review Modal */}
//       <ReviewModal
//         isOpen={isWriteModalOpen}
//         onClose={() => setIsWriteModalOpen(false)}
//         onReviewSubmitted={() => {
//           fetchReviews();
//           fetchStats();
//           setIsWriteModalOpen(false);
//         }}
//       />

//       {/* View Details Modal */}
//       <AnimatePresence>
//         {isViewModalOpen && selectedReview && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 overflow-y-auto"
//           >
//             <div className="flex items-center justify-center min-h-screen px-4">
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="fixed inset-0 bg-black/60 backdrop-blur-sm"
//                 onClick={() => setIsViewModalOpen(false)}
//               />

//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: 50 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: 50 }}
//                 transition={{ type: "spring", duration: 0.5 }}
//                 className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
//               >
//                 <button
//                   onClick={() => setIsViewModalOpen(false)}
//                   className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>

//                 <div className="p-6 md:p-8">
//                   {/* User Info */}
//                   <div className="flex items-start gap-4 mb-6">
//                     <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A7C59] to-[#C6A43B] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
//                       {getUserInitials(selectedReview)}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold text-gray-900 font-serif">
//                         {getUserName(selectedReview)}
//                       </h3>
//                       {getUserCompany(selectedReview) && (
//                         <p className="text-gray-600 font-sans">{getUserCompany(selectedReview)}</p>
//                       )}
//                       {getUserCountry(selectedReview) && (
//                         <p className="text-xs text-gray-400 font-sans flex items-center gap-1 mt-1">
//                           <MapPin className="w-3 h-3" />
//                           {getUserCountry(selectedReview)}
//                         </p>
//                       )}
//                       <div className="flex items-center gap-3 mt-2">
//                         <StarRating rating={selectedReview.rating} size="w-5 h-5" />
//                         <span className="text-sm text-gray-400 flex items-center gap-1 font-sans">
//                           <Calendar className="w-4 h-4" />
//                           {formatDate(selectedReview.createdAt)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Review Title */}
//                   {selectedReview.title && (
//                     <h4 className="text-xl font-bold text-gray-900 mb-4 font-serif">
//                       {selectedReview.title}
//                     </h4>
//                   )}

//                   {/* Review Comment */}
//                   <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
//                     <Quote className="w-8 h-8 text-[#C6A43B]/30 mb-3" />
//                     <p className="text-gray-700 text-sm leading-relaxed font-sans">
//                       "{selectedReview.comment}"
//                     </p>
//                   </div>

//                   {/* Product Info */}
//                   {getProductName(selectedReview) && (
//                     <div className="mb-6 p-4 bg-[#F5E6D3] rounded-lg border border-[#E5D5C0]">
//                       <p className="text-xs text-[#4A7C59] mb-2 flex items-center gap-1 font-sans">
//                         <Package className="w-4 h-4" />
//                         Product Reviewed
//                       </p>
//                       <div>
//                         <p className="font-semibold text-gray-900 font-sans">
//                           {getProductName(selectedReview)}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Verification Badges */}
//                   <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
//                     <div className="flex items-center gap-1 text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full">
//                       <CheckCircle className="w-4 h-4 text-green-500" />
//                       Verified Buyer
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <Footer />
//       <WhatsAppButton />
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Eye, 
  CheckCircle, 
  Image as ImageIcon, 
  Video, 
  Search, 
  Filter,
  X,
  ChevronDown,
  Heart,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

export default function AllReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
 
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(6);
  
  // Fetch all approved reviews
  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews?status=approved&limit=100`);
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data || []);
        setFilteredReviews(data.data || []);
      } else {
        console.error('Failed to fetch reviews:', data.error);
        setReviews([]);
        setFilteredReviews([]);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...reviews];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(review => 
        review.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (ratingFilter !== 'all') {
      const minRating = parseInt(ratingFilter);
      filtered = filtered.filter(review => review.rating >= minRating);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    
    setFilteredReviews(filtered);
    setCurrentPage(1);
  }, [searchTerm, ratingFilter, sortBy, reviews]);

  // Get current reviews for pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setRatingFilter('all');
    setSortBy('newest');
  };

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'fill-[#FFD93D] text-[#FFD93D]' 
                : 'text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  // Truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Get avatar color
  const getAvatarColor = (name) => {
    const colors = [
      'from-pink-400 to-rose-400',
      'from-purple-400 to-indigo-400',
      'from-blue-400 to-cyan-400',
      'from-green-400 to-emerald-400',
      'from-yellow-400 to-orange-400',
      'from-red-400 to-pink-400',
      'from-teal-400 to-green-400',
    ];
    const index = name?.length % colors.length || 0;
    return colors[index];
  };

  // Detail View Modal
  const DetailViewModal = () => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDetailModalOpen(false)} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="sticky top-0 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <h2 className="text-xl font-bold text-white">Review Details</h2>
            </div>
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div className="p-6 space-y-5">
            {/* Customer Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(selectedReview?.userName)} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                  {selectedReview?.userName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-gray-900">{selectedReview?.userName}</p>
                    {selectedReview?.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedReview?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="bg-yellow-50 px-3 py-1 rounded-full">
                {renderStars(selectedReview?.rating)}
              </div>
            </div>
            
            {/* Product Info */}
            {selectedReview?.productName && (
              <div className="bg-gradient-to-r from-[#4A8A90]/10 to-[#FFB6C1]/10 rounded-xl p-4 border border-[#FFD93D]/30">
                <p className="text-xs text-[#4A8A90] font-semibold mb-1">🎁 Product</p>
                <p className="font-medium text-gray-800">{selectedReview.productName}</p>
              </div>
            )}
            
            {/* Title */}
            {selectedReview?.title && (
              <h3 className="font-bold text-gray-800 text-lg">{selectedReview.title}</h3>
            )}
            
            {/* Comment */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedReview?.comment}</p>
            </div>
            
            {/* Images */}
            {selectedReview?.images && selectedReview.images.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#4A8A90]" />
                  Attached Images ({selectedReview.images.length})
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {selectedReview.images.slice(0, 3).map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={`Review image ${idx + 1}`}
                      className="w-full h-28 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity shadow-md"
                      onClick={() => window.open(img.url, '_blank')}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Video */}
            {selectedReview?.video?.url && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#4A8A90]" />
                  Attached Video
                </p>
                <video
                  src={selectedReview.video.url}
                  controls
                  className="w-full rounded-lg shadow-md max-h-48"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
  <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF9F0] py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6">
         
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D3A5C] mb-3">
            What Our{' '}
            <span className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] bg-clip-text text-transparent">
              Customers Say
            </span>
          </h1>
          
          <p className="text-sm md:text-base text-[#6B7280] max-w-2xl mx-auto">
            Read honest reviews from parents who have purchased from us
          </p>
        </div>

     {/* Stats Bar */}


        {/* Filters Panel */}
      {/* Filters Panel - Always Visible */}
<div className="bg-white rounded-xl shadow-sm p-6 mb-6">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Search */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, product, or review..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
        />
      </div>
    </div>
    
    {/* Rating Filter */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
      <select
        value={ratingFilter}
        onChange={(e) => setRatingFilter(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
      >
        <option value="all">All Ratings</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars & Up</option>
        <option value="3">3 Stars & Up</option>
        <option value="2">2 Stars & Up</option>
        <option value="1">1 Star & Up</option>
      </select>
    </div>
    
    {/* Sort By */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="highest">Highest Rated</option>
        <option value="lowest">Lowest Rated</option>
      </select>
    </div>
  </div>
  
  <div className="flex justify-end mt-4">
    <button
      onClick={resetFilters}
      className="text-sm text-[#4A8A90] hover:underline"
    >
      Reset Filters
    </button>
  </div>
</div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <p className="text-gray-500">No reviews found matching your criteria.</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-[#4A8A90] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentReviews.map((review) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  
                  <div className="relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-3">
                      {renderStars(review.rating)}
                    </div>

                    {/* Product Name Badge */}
                    {review.productName && (
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-[#4A8A90] bg-[#4A8A90]/10 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          🎁 {truncateText(review.productName, 35)}
                        </span>
                      </div>
                    )}

                    {/* Review Title */}
                    {review.title && (
                      <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">
                        {review.title}
                      </h3>
                    )}

                    {/* Review Comment */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                      "{review.comment}"
                    </p>

                    {/* Images Preview */}
                    {review.images && review.images.length > 0 && (
                      <div className="mb-3">
                        <div className="flex gap-1.5">
                          {review.images.slice(0, 3).map((img, idx) => (
                            <img
                              key={idx}
                              src={img.url}
                              alt={`Review pic ${idx + 1}`}
                              className="w-10 h-10 rounded-lg object-cover cursor-pointer hover:scale-110 transition-transform shadow-sm"
                              onClick={() => {
                                setSelectedReview(review);
                                setIsDetailModalOpen(true);
                              }}
                            />
                          ))}
                          {review.images.length > 3 && (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
                              +{review.images.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Video Badge */}
                    {review.video?.url && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5 w-fit">
                          <Video className="w-3 h-3 text-[#4A8A90]" />
                          <span>Has video</span>
                        </div>
                      </div>
                    )}

                    {/* Author Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(review.userName)} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                          {review.userName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-bold text-gray-800 text-xs">{truncateText(review.userName, 15)}</p>
                            {review.isVerifiedPurchase && (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            )}
                          </div>
                          <p className="text-[9px] text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setSelectedReview(review);
                          setIsDetailModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-[#4A8A90] hover:bg-[#4A8A90]/10 rounded-full transition-all"
                        title="View full review"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && <DetailViewModal />}
    </div>
    <Footer />
      </>
  );
}