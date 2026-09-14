

// 'use client';

// import { useState, useEffect } from 'react';
// import { 
//   Star, 
//   MessageCircle, 
//   ThumbsUp, 
//   ChevronDown, 
//   ChevronUp,
//   Loader2,
//   CheckCircle,
//   Award,
//   ChevronRight,
//   Clock,
//   XCircle,
//   AlertCircle,
//   User
// } from 'lucide-react';
// import { toast } from 'sonner';
// import ReviewModal from './ReviewModal';

// export default function ProductReviews({ productId, productName }) {
//   const [reviews, setReviews] = useState([]);
//   const [allReviews, setAllReviews] = useState([]);
//   const [userReview, setUserReview] = useState(null);
//   const [displayCount, setDisplayCount] = useState(2);
//   const [stats, setStats] = useState({
//     averageRating: 0,
//     totalReviews: 0,
//     ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortBy, setSortBy] = useState('highest');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   // Check authentication status
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = () => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('token');
//       const userData = localStorage.getItem('user');
      
//       if (token && userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setIsAuthenticated(true);
//           setCurrentUser(parsedUser);
//           console.log('User authenticated:', parsedUser);
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//           setIsAuthenticated(false);
//           setCurrentUser(null);
//         }
//       } else {
//         console.log('No user authenticated');
//         setIsAuthenticated(false);
//         setCurrentUser(null);
//       }
//     }
//   };

//   useEffect(() => {
//     if (productId) {
//       fetchAllReviews();
//     }
//   }, [productId, sortBy, isAuthenticated, currentUser]); // Add dependencies

//   useEffect(() => {
//     // Listen for auth changes
//     const handleAuthChange = () => {
//       console.log('Auth change detected');
//       checkAuthStatus();
//     };

//     window.addEventListener('auth-change', handleAuthChange);
//     return () => window.removeEventListener('auth-change', handleAuthChange);
//   }, []);

// const fetchAllReviews = async () => {
//   setLoading(true);
//   setError(null);
//   try {
//     // Get the current auth state directly
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
//     let currentUserId = null;
    
//     if (token && userData) {
//       try {
//         const user = JSON.parse(userData);
//         currentUserId = user.id || user._id;
//         console.log('Current user ID from localStorage:', currentUserId);
//       } catch (e) {
//         console.error('Error parsing user data:', e);
//       }
//     }

//     // Fetch public reviews (approved only)
//     const url = `http://localhost:5000/api/reviews/product/${productId}?limit=100&sort=${sortBy === 'highest' ? '-rating' : '-createdAt'}`;
//     console.log('Fetching reviews from:', url);
    
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     console.log('Reviews data received:', data);

//     if (data.success) {
//       const allReviewsList = data.data.reviews || [];
//       console.log('All reviews:', allReviewsList);
      
//       setStats(data.data.productStats || {
//         averageRating: 0,
//         totalReviews: 0,
//         ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
//       });
      
//       setAllReviews(allReviewsList);
//       updateDisplayedReviews(allReviewsList);
      
//       // If user is authenticated, also fetch their personal review for this product
//       if (token && currentUserId) {
//         fetchUserReview();
//       } else {
//         setUserReview(null);
//       }
//     } else {
//       setError(data.error || 'Failed to load reviews');
//       toast.error(data.error || 'Failed to load reviews');
//     }
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     setError(error.message);
//     toast.error('Failed to load reviews');
//   } finally {
//     setLoading(false);
//   }
// };

// // New function to fetch user's personal review
// const fetchUserReview = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`http://localhost:5000/api/reviews/product/${productId}/my-review`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
    
//     if (response.status === 404) {
//       // User hasn't reviewed this product
//       setUserReview(null);
//       return;
//     }
    
//     const data = await response.json();
    
//     if (data.success) {
//       console.log('User review found:', data.data);
//       setUserReview(data.data);
      
//       // Remove user's review from the main list
//       setAllReviews(prev => prev.filter(review => review._id !== data.data._id));
//     }
//   } catch (error) {
//     console.error('Error fetching user review:', error);
//   }
// };

//   const updateDisplayedReviews = (reviewsList = allReviews) => {
//     console.log('Updating displayed reviews with list:', reviewsList.length);
//     const sorted = [...reviewsList].sort((a, b) => {
//       if (sortBy === 'highest') {
//         return b.rating - a.rating;
//       } else {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       }
//     });
//     setReviews(sorted.slice(0, displayCount));
//   };

//   useEffect(() => {
//     if (allReviews.length > 0) {
//       updateDisplayedReviews();
//     }
//   }, [displayCount, sortBy, allReviews]);

//   const handleViewMore = () => {
//     setDisplayCount(prev => Math.min(prev + 2, allReviews.length));
//   };

//   const handleViewLess = () => {
//     setDisplayCount(2);
//   };

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//     setDisplayCount(2);
//   };

//   const handleMarkHelpful = async (reviewId) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.info('Please login to mark reviews as helpful');
//         return;
//       }

//       const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/helpful`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Update in all reviews
//         setAllReviews(prev => prev.map(r => 
//           r._id === reviewId 
//             ? { ...r, helpfulCount: data.data.helpfulCount }
//             : r
//         ));
        
//         // Also update in user review if it's the same
//         if (userReview && userReview._id === reviewId) {
//           setUserReview(prev => ({ ...prev, helpfulCount: data.data.helpfulCount }));
//         }
        
//         toast.success('Thank you for your feedback!');
//       }
//     } catch (error) {
//       console.error('Error marking helpful:', error);
//     }
//   };

// const handleReviewSubmitted = () => {
//   console.log('Review submitted, refreshing...');
//   // Refresh both public reviews and user's review
//   fetchAllReviews();
// };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'approved':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
//             <CheckCircle className="w-3 h-3" />
//             Approved
//           </span>
//         );
//       case 'pending':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
//             <Clock className="w-3 h-3" />
//             Pending Review
//           </span>
//         );
//       case 'rejected':
//         return (
//           <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
//             <XCircle className="w-3 h-3" />
//             Not Approved
//           </span>
//         );
//       default:
//         return null;
//     }
//   };

//   const StarRating = ({ rating, size = "w-4 h-4", showNumber = false }) => (
//     <div className="flex items-center gap-1">
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`${size} ${
//               star <= rating
//                 ? 'fill-yellow-400 text-yellow-400'
//                 : 'text-gray-300'
//             }`}
//           />
//         ))}
//       </div>
//       {showNumber && <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>}
//     </div>
//   );

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const RatingBreakdown = () => {
//     const total = stats.totalReviews;
//     const average = stats.averageRating;

//     return (
//       <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100 mb-6">
//         <div className="flex items-center gap-3">
//           <div className="text-3xl font-bold text-gray-900">{average.toFixed(1)}</div>
//           <div className="flex flex-col">
//             <StarRating rating={Math.round(average)} />
//             <span className="text-xs text-gray-500 mt-0.5">{total} reviews</span>
//           </div>
//         </div>

//         <div className="flex-1 flex items-center gap-4">
//           {[5, 4, 3, 2, 1].map(rating => {
//             const count = stats.ratingDistribution[rating] || 0;
//             const percentage = total > 0 ? (count / total) * 100 : 0;
            
//             return (
//               <div key={rating} className="flex-1 group relative">
//                 <div className="text-xs text-gray-500 text-center mb-1">{rating}★</div>
//                 <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full bg-[#6B4F3A] rounded-full group-hover:bg-[#d48b54] transition-colors"
//                     style={{ width: `${percentage}%` }}
//                   />
//                 </div>
//                 <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                   {count} reviews
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
//           <CheckCircle className="w-4 h-4" />
//           <span className="text-xs font-medium">Verified</span>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-16">
//         <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-16 bg-red-50 rounded-xl border border-red-100">
//         <MessageCircle className="w-12 h-12 text-red-300 mx-auto mb-3" />
//         <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load reviews</h3>
//         <p className="text-sm text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//             <MessageCircle className="w-5 h-5 text-[#6B4F3A]" />
//             Customer Reviews
//           </h2>
//         </div>

//         <div className="p-6">
//           {/* Rating Breakdown */}
//           <RatingBreakdown />

//           {/* User's Own Review (if exists) */}
//           {userReview && (
//             <div className="mb-8 p-5 bg-orange-50 rounded-xl border-2 border-[#6B4F3A] relative">
//               <div className="absolute -top-3 left-4 px-3 py-1 bg-[#6B4F3A] text-white text-xs font-medium rounded-full flex items-center gap-1">
//                 <User className="w-3 h-3" />
//                 Your Review
//               </div>
              
//               <div className="mt-2">
//                 <div className="flex items-start justify-between mb-3">
//                   <div className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B4F3A] to-[#d48b54] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
//                       {userReview.userName?.charAt(0).toUpperCase()}
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="font-medium text-gray-900">{userReview.userName}</span>
//                         {getStatusBadge(userReview.status)}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <StarRating rating={userReview.rating} />
//                         <span className="text-xs text-gray-400">•</span>
//                         <span className="text-xs text-gray-400">{formatDate(userReview.createdAt)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="ml-13 pl-13">
//                   {userReview.title && (
//                     <h4 className="font-semibold text-gray-900 mb-2">{userReview.title}</h4>
//                   )}
//                   <p className="text-gray-600 mb-4 leading-relaxed">{userReview.comment}</p>

//                   {userReview.status === 'pending' && (
//                     <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
//                       <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
//                       <p className="text-xs text-yellow-700">
//                         Your review is pending moderation. It will be published once approved by our team.
//                       </p>
//                     </div>
//                   )}

//                   {userReview.status === 'rejected' && (
//                     <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
//                       <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-xs text-red-700 font-medium mb-1">Review not approved</p>
//                         {userReview.moderationNote && (
//                           <p className="text-xs text-red-600">Reason: {userReview.moderationNote}</p>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between">
//                     {userReview.userCompany && (
//                       <span className="text-xs text-gray-400 flex items-center gap-1">
//                         <CheckCircle className="w-3 h-3 text-green-500" />
//                         Verified Buyer • {userReview.userCompany}
//                       </span>
//                     )}
//                     <button
//                       onClick={() => handleMarkHelpful(userReview._id)}
//                       className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
//                     >
//                       <ThumbsUp className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#6B4F3A]" />
//                       <span className="text-xs text-gray-500 group-hover:text-[#6B4F3A]">
//                         Helpful ({userReview.helpfulCount || 0})
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Sort and Filter Bar */}
//           {allReviews.length > 0 && (
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-500">Sort by:</span>
//                 <select
//                   value={sortBy}
//                   onChange={handleSortChange}
//                   className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent bg-white"
//                 >
//                   <option value="highest">Top Rated</option>
//                   <option value="newest">Most Recent</option>
//                 </select>
//               </div>
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="text-sm text-[#6B4F3A] hover:text-[#d48b54] font-medium flex items-center gap-1 transition-colors"
//               >
//                 {userReview ? 'Edit Your Review' : 'Write a Review'}
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           )}

//           {/* Reviews List */}
//           {allReviews.length > 0 ? (
//             <>
//               <div className="space-y-6">
//                 {reviews.map((review, index) => (
//                   <div 
//                     key={review._id} 
//                     className={`${index !== reviews.length - 1 ? 'border-b border-gray-100 pb-6' : ''}`}
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex items-start gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B4F3A] to-[#d48b54] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
//                           {review.userName?.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className="font-medium text-gray-900">{review.userName}</span>
//                             {review.isFeatured && (
//                               <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full flex items-center gap-1">
//                                 <Award className="w-3 h-3" />
//                                 Featured
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <StarRating rating={review.rating} />
//                             <span className="text-xs text-gray-400">•</span>
//                             <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="ml-13 pl-13">
//                       {review.title && (
//                         <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
//                       )}
//                       <p className="text-gray-600 mb-4 leading-relaxed">{review.comment}</p>

//                       <div className="flex items-center justify-between">
//                         {review.userCompany && (
//                           <span className="text-xs text-gray-400 flex items-center gap-1">
//                             <CheckCircle className="w-3 h-3 text-green-500" />
//                             Verified Buyer • {review.userCompany}
//                           </span>
//                         )}
//                         <button
//                           onClick={() => handleMarkHelpful(review._id)}
//                           className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
//                         >
//                           <ThumbsUp className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#6B4F3A]" />
//                           <span className="text-xs text-gray-500 group-hover:text-[#6B4F3A]">
//                             Helpful ({review.helpfulCount || 0})
//                           </span>
//                         </button>
//                       </div>

//                       {review.response && (
//                         <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
//                           <p className="text-xs font-medium text-blue-700 mb-2 flex items-center gap-1">
//                             <MessageCircle className="w-3 h-3" />
//                             Response from seller:
//                           </p>
//                           <p className="text-sm text-blue-800">{review.response.text}</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* View More / View Less Controls */}
//               {allReviews.length > 2 && (
//                 <div className="mt-8 flex flex-col items-center gap-3">
//                   {displayCount < allReviews.length ? (
//                     <button
//                       onClick={handleViewMore}
//                       className="inline-flex items-center gap-2 px-6 py-3 bg-[#6B4F3A] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-all duration-300 group"
//                     >
//                       <span>View More Reviews</span>
//                       <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
//                     </button>
//                   ) : displayCount > 2 && (
//                     <button
//                       onClick={handleViewLess}
//                       className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-300 group"
//                     >
//                       <span>View Less</span>
//                       <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
//                     </button>
//                   )}
                  
//                   <p className="text-sm text-gray-400">
//                     Showing {Math.min(displayCount, allReviews.length)} of {allReviews.length} reviews
//                   </p>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <MessageCircle className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
//               <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                 {userReview 
//                   ? 'You have submitted a review. It will appear here once approved.'
//                   : 'Be the first to share your experience with this product'}
//               </p>
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-[#6B4F3A] text-white font-medium rounded-lg hover:bg-[#d48b54] transition-colors"
//               >
//                 {userReview ? 'Edit Your Review' : 'Write a Review'}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Review Modal */}
//       <ReviewModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onReviewSubmitted={handleReviewSubmitted}
//         productId={productId}
//         productName={productName}
//       />
//     </>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { 
  Star, 
  MessageCircle, 
  ThumbsUp, 
  ChevronDown, 
  ChevronUp,
  Loader2,
  CheckCircle,
  Award,
  ChevronRight,
  Clock,
  XCircle,
  AlertCircle,
  User,
  Quote,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import ReviewModal from './ReviewModal';

// Jute Theme Colors
const COLORS = {
  primary: '#6B4F3A',
  secondary: '#F5E6D3',
  accent: '#3A7D44',
  gold: '#C6A43B',
  text: '#2C2420',
  textLight: '#8B7355',
  border: '#E5D5C0',
  lightBg: '#FAF7F2'
};

export default function ProductReviews({ productId, productName }) {
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [displayCount, setDisplayCount] = useState(2);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('highest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);

  // Check authentication status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setIsAuthenticated(true);
          setCurrentUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    }
  };

  useEffect(() => {
    if (productId) {
      fetchAllReviews();
    }
  }, [productId, sortBy, isAuthenticated, currentUser]);

  useEffect(() => {
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const fetchAllReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      let currentUserId = null;
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          currentUserId = user.id || user._id;
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }

      const url = `http://localhost:5000/api/reviews/product/${productId}?limit=100&sort=${sortBy === 'highest' ? '-rating' : '-createdAt'}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.success) {
        const allReviewsList = data.data.reviews || [];
        
        setStats(data.data.productStats || {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        });
        
        setAllReviews(allReviewsList);
        updateDisplayedReviews(allReviewsList);
        
        if (token && currentUserId) {
          fetchUserReview();
        } else {
          setUserReview(null);
        }
      } else {
        setError(data.error || 'Failed to load reviews');
        toast.error(data.error || 'Failed to load reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError(error.message);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReview = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/reviews/product/${productId}/my-review`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 404) {
        setUserReview(null);
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        setUserReview(data.data);
        setAllReviews(prev => prev.filter(review => review._id !== data.data._id));
      }
    } catch (error) {
      console.error('Error fetching user review:', error);
    }
  };

  const updateDisplayedReviews = (reviewsList = allReviews) => {
    const sorted = [...reviewsList].sort((a, b) => {
      if (sortBy === 'highest') {
        return b.rating - a.rating;
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setReviews(sorted.slice(0, displayCount));
  };

  useEffect(() => {
    if (allReviews.length > 0) {
      updateDisplayedReviews();
    }
  }, [displayCount, sortBy, allReviews]);

  const handleViewMore = () => {
    setDisplayCount(prev => Math.min(prev + 2, allReviews.length));
  };

  const handleViewLess = () => {
    setDisplayCount(2);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setDisplayCount(2);
  };

  const handleMarkHelpful = async (reviewId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.info('Please login to mark reviews as helpful');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/helpful`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setAllReviews(prev => prev.map(r => 
          r._id === reviewId 
            ? { ...r, helpfulCount: data.data.helpfulCount }
            : r
        ));
        
        if (userReview && userReview._id === reviewId) {
          setUserReview(prev => ({ ...prev, helpfulCount: data.data.helpfulCount }));
        }
        
        toast.success('Thank you for your feedback!');
      }
    } catch (error) {
      console.error('Error marking helpful:', error);
    }
  };

  const handleReviewSubmitted = () => {
    fetchAllReviews();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] md:text-xs rounded-full">
            <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] md:text-xs rounded-full">
            <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-[10px] md:text-xs rounded-full">
            <XCircle className="w-2.5 h-2.5 md:w-3 md:h-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const StarRating = ({ rating, size = "w-3 h-3 md:w-4 md:h-4", showNumber = false }) => (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating
                ? `fill-[${COLORS.gold}] text-[${COLORS.gold}]`
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showNumber && <span className="text-xs md:text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>}
    </div>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const RatingBreakdown = () => {
    const total = stats.totalReviews;
    const average = stats.averageRating;

    return (
      <div className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-xl md:rounded-2xl p-4 md:p-5 border border-[#E5D5C0] mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          {/* Rating Summary */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-[#6B4F3A] font-serif">{average.toFixed(1)}</div>
              <StarRating rating={Math.round(average)} size="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1 block">{total} reviews</span>
            </div>
            <div className="w-px h-8 md:h-12 bg-[#E5D5C0] hidden sm:block"></div>
          </div>

          {/* Rating Bars */}
          <div className="flex-1 space-y-1.5 md:space-y-2 w-full">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = stats.ratingDistribution[rating] || 0;
              const percentage = total > 0 ? (count / total) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center gap-1.5 md:gap-2 group">
                  <span className="text-[10px] md:text-xs text-gray-500 w-5 md:w-6">{rating}★</span>
                  <div className="flex-1 h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
                       onMouseEnter={() => setHoveredRating(rating)}
                       onMouseLeave={() => setHoveredRating(null)}>
                    <div 
                      className="h-full bg-[#C6A43B] rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-400 w-6 md:w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-1.5 md:gap-2 bg-green-50 px-2 py-1 md:px-3 md:py-2 rounded-full">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
            <span className="text-[9px] md:text-xs font-medium text-green-700">Verified</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 md:py-16">
        <div className="relative">
          <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin text-[#C6A43B]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#C6A43B] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 md:py-16 bg-red-50 rounded-xl md:rounded-2xl border border-red-200">
        <MessageCircle className="w-10 h-10 md:w-12 md:h-12 text-red-300 mx-auto mb-2 md:mb-3" />
        <h3 className="text-base md:text-lg font-medium text-red-800 mb-1 md:mb-2">Unable to load reviews</h3>
        <p className="text-xs md:text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl md:rounded-2xl border border-[#E5D5C0] overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 bg-[#FAF7F2] border-b border-[#E5D5C0]">
          <h2 className="text-base md:text-lg font-semibold text-[#2C2420] flex items-center gap-2 font-serif">
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-[#C6A43B]" />
            Customer Reviews
            {stats.totalReviews > 0 && (
              <span className="text-xs md:text-sm font-normal text-gray-500 ml-1">
                ({stats.totalReviews})
              </span>
            )}
          </h2>
        </div>

        <div className="p-4 md:p-6">
          {/* Rating Breakdown */}
          <RatingBreakdown />

          {/* User's Own Review */}
          {userReview && (
            <div className="mb-6 md:mb-8 p-4 md:p-5 bg-gradient-to-r from-[#F5E6D3] to-white rounded-xl md:rounded-2xl border-2 border-[#C6A43B] relative">
              <div className="absolute -top-3 left-4 px-2 md:px-3 py-0.5 md:py-1 bg-[#C6A43B] text-white text-[10px] md:text-xs font-medium rounded-full flex items-center gap-1">
                <User className="w-2.5 h-2.5 md:w-3 md:h-3" />
                Your Review
              </div>
              
              <div className="mt-2">
                <div className="flex items-start justify-between mb-2 md:mb-3 flex-wrap gap-2">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#6B4F3A] to-[#C6A43B] flex items-center justify-center text-white font-semibold text-xs md:text-sm flex-shrink-0">
                      {userReview.userName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium text-[#2C2420] text-sm md:text-base">{userReview.userName}</span>
                        {getStatusBadge(userReview.status)}
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                        <StarRating rating={userReview.rating} />
                        <span className="text-[10px] md:text-xs text-gray-400">•</span>
                        <span className="text-[10px] md:text-xs text-gray-400">{formatDate(userReview.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-10 md:ml-13">
                  {userReview.title && (
                    <h4 className="font-semibold text-[#2C2420] mb-1.5 text-sm md:text-base">{userReview.title}</h4>
                  )}
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 leading-relaxed">{userReview.comment}</p>

                  {userReview.status === 'pending' && (
                    <div className="mb-3 md:mb-4 p-2 md:p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] md:text-xs text-yellow-700">
                        Your review is pending moderation. It will be published once approved.
                      </p>
                    </div>
                  )}

                  {userReview.status === 'rejected' && (
                    <div className="mb-3 md:mb-4 p-2 md:p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                      <XCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] md:text-xs text-red-700 font-medium mb-0.5">Review not approved</p>
                        {userReview.moderationNote && (
                          <p className="text-[9px] md:text-xs text-red-600">Reason: {userReview.moderationNote}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    {userReview.userCompany && (
                      <span className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500" />
                        Verified • {userReview.userCompany}
                      </span>
                    )}
                    <button
                      onClick={() => handleMarkHelpful(userReview._id)}
                      className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 bg-[#FAF7F2] hover:bg-[#F5E6D3] rounded-lg transition-colors group"
                    >
                      <ThumbsUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-400 group-hover:text-[#C6A43B]" />
                      <span className="text-[10px] md:text-xs text-gray-500 group-hover:text-[#6B4F3A]">
                        Helpful ({userReview.helpfulCount || 0})
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sort and Write Review Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
            {allReviews.length > 0 && (
              <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
                <span className="text-xs md:text-sm text-gray-500">Sort by:</span>
                <div className="relative flex-1 sm:flex-initial">
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="w-full sm:w-auto text-xs md:text-sm border border-[#E5D5C0] rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-white cursor-pointer appearance-none pr-7 md:pr-8"
                  >
                    <option value="highest">⭐ Top Rated</option>
                    <option value="newest">📅 Most Recent</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}
          <button
  onClick={() => setIsModalOpen(true)}
  className="text-xs bg-[#6B4F3A] hover:bg-[#8B6B51] text-white font-medium px-2 py-1 rounded-lg flex items-center justify-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md w-auto whitespace-nowrap"
>
  <Sparkles className="w-2.5 h-2.5" />
  <span>{userReview ? 'Edit Review' : 'Write a Review'}</span>
  <ChevronRight className="w-3 h-3" />
</button>
          </div>

          {/* Reviews List */}
          {allReviews.length > 0 ? (
            <>
              <div className="space-y-5 md:space-y-6">
                {reviews.map((review, index) => (
                  <div 
                    key={review._id} 
                    className={`${index !== reviews.length - 1 ? 'border-b border-[#E5D5C0] pb-5 md:pb-6' : ''}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2 md:mb-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#6B4F3A] to-[#C6A43B] flex items-center justify-center text-white font-semibold text-xs md:text-sm flex-shrink-0">
                          {review.userName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-medium text-[#2C2420] text-sm md:text-base">{review.userName}</span>
                            {review.isFeatured && (
                              <span className="px-1.5 py-0.5 bg-[#C6A43B]/10 text-[#C6A43B] text-[9px] md:text-xs rounded-full flex items-center gap-0.5 md:gap-1">
                                <Award className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                            <StarRating rating={review.rating} />
                            <span className="text-[10px] md:text-xs text-gray-400">•</span>
                            <span className="text-[10px] md:text-xs text-gray-400">{formatDate(review.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-10 md:ml-13">
                      {review.title && (
                        <h4 className="font-semibold text-[#2C2420] mb-1.5 text-sm md:text-base">{review.title}</h4>
                      )}
                      <div className="relative">
                        <Quote className="absolute -top-0.5 -left-1.5 md:-top-1 md:-left-2 w-3.5 h-3.5 md:w-5 md:h-5 text-[#C6A43B]/20" />
                        <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 leading-relaxed pl-3 md:pl-4">
                          "{review.comment}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between flex-wrap gap-2">
                        {review.userCompany && (
                          <span className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1">
                            <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500" />
                            Verified • {review.userCompany}
                          </span>
                        )}
                     
                      </div>

                      {review.response && (
                        <div className="mt-3 md:mt-4 p-3 md:p-4 bg-blue-50 rounded-xl border border-blue-100">
                          <p className="text-[10px] md:text-xs font-medium text-blue-700 mb-1.5 md:mb-2 flex items-center gap-1">
                            <MessageCircle className="w-3 h-3 md:w-3.5 md:h-3.5" />
                            Response from Jute Craftify:
                          </p>
                          <p className="text-xs md:text-sm text-blue-800">{review.response.text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* View More / View Less Controls */}
              {allReviews.length > 2 && (
                <div className="mt-6 md:mt-8 flex flex-col items-center gap-2 md:gap-3">
                  {displayCount < allReviews.length ? (
                    <button
                      onClick={handleViewMore}
                      className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-white border-2 border-[#C6A43B] text-[#C6A43B] text-xs md:text-sm font-medium rounded-lg hover:bg-[#C6A43B] hover:text-white transition-all duration-300 group"
                    >
                      <span>View More Reviews</span>
                      <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  ) : displayCount > 2 && (
                    <button
                      onClick={handleViewLess}
                      className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-white border border-[#E5D5C0] text-gray-700 text-xs md:text-sm font-medium rounded-lg hover:bg-[#FAF7F2] transition-all duration-300 group"
                    >
                      <span>View Less</span>
                      <ChevronUp className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  )}
                  
                  <p className="text-[10px] md:text-sm text-gray-400">
                    Showing {Math.min(displayCount, allReviews.length)} of {allReviews.length} reviews
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 md:py-16 bg-[#FAF7F2] rounded-xl md:rounded-2xl border border-[#E5D5C0]">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-sm">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-[#C6A43B]" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[#2C2420] mb-1 md:mb-2 font-serif">No reviews yet</h3>
              <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 max-w-md mx-auto px-4">
                {userReview 
                  ? 'You have submitted a review. It will appear here once approved.'
                  : 'Be the first to share your experience with this product'}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 bg-[#6B4F3A] text-white text-xs md:text-sm font-medium rounded-lg hover:bg-[#8B6B51] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                {userReview ? 'Edit Your Review' : 'Write a Review'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
        productId={productId}
        productName={productName}
      />
    </>
  );
}