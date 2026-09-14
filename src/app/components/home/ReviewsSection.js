

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, Eye, CheckCircle, Image as ImageIcon, Video, X, Sparkles, Award, Heart, Shield, Truck, CreditCard } from 'lucide-react';
import ReviewModal from './ReviewModal';
import { toast } from 'sonner';

export default function Testimonials() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isCardHovering, setIsCardHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch featured and approved reviews
  useEffect(() => {
    fetchFeaturedReviews();
  }, []);

  // Auto-scroll functionality for both mobile and desktop
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const reviewsPerView = isMobile ? 1 : 3;
    if (!isCardHovering && featuredReviews.length > reviewsPerView) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isCardHovering, featuredReviews.length, isMobile]);

  const handleManualPrev = () => {
    if (featuredReviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length);
    setIsCardHovering(true);
    setTimeout(() => setIsCardHovering(false), 3000);
  };

  const handleManualNext = () => {
    if (featuredReviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
    setIsCardHovering(true);
    setTimeout(() => setIsCardHovering(false), 3000);
  };

  const fetchFeaturedReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/featured?limit=9`);
      const data = await response.json();
      
      if (data.success) {
        setFeaturedReviews(data.data || []);
      } else {
        console.error('Failed to fetch featured reviews:', data.error);
        setFeaturedReviews([]);
      }
    } catch (error) {
      console.error('Error fetching featured reviews:', error);
      setFeaturedReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const fixedImage = 'https://i.ibb.co.com/MWF9N8y/Gemini-Generated-Image-x69sikx69sikx69s-1-removebg-preview.png';

  // Get visible testimonials based on device
  const getVisibleTestimonials = () => {
    if (featuredReviews.length === 0) return [];
    const reviewsPerView = isMobile ? 1 : 3;
    const result = [];
    for (let i = 0; i < reviewsPerView; i++) {
      const index = (currentIndex + i) % featuredReviews.length;
      result.push(featuredReviews[index]);
    }
    return result;
  };

  const visibleTestimonials = getVisibleTestimonials();

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${
              star <= rating 
                ? 'fill-[#FFD93D] text-[#FFD93D] drop-shadow-sm' 
                : 'text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

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

  const DetailViewModal = () => (
    <AnimatePresence>
      {isDetailModalOpen && selectedReview && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDetailModalOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10 rounded-t-2xl sm:rounded-t-3xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">Review Details</h2>
                </div>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
              
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Customer Info */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${getAvatarColor(selectedReview.userName)} flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md`}>
                      {selectedReview.userName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-gray-900 text-sm sm:text-base">{selectedReview.userName}</p>
                        {selectedReview.isVerifiedPurchase && (
                          <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-green-100 text-green-700">
                            <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(selectedReview.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 px-2 sm:px-3 py-1 rounded-full">
                    {renderStars(selectedReview.rating)}
                  </div>
                </div>
                
                {/* Product Info */}
                {selectedReview.productName && (
                  <div className="bg-gradient-to-r from-[#4A8A90]/10 to-[#FFB6C1]/10 rounded-xl p-3 sm:p-4 border border-[#FFD93D]/30">
                    <p className="text-[10px] sm:text-xs text-[#4A8A90] font-semibold mb-1">🎁 Product</p>
                    <p className="font-medium text-gray-800 text-sm sm:text-base">{selectedReview.productName}</p>
                  </div>
                )}
                
                {/* Title */}
                {selectedReview.title && (
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg">{selectedReview.title}</h3>
                )}
                
                {/* Comment */}
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{selectedReview.comment}</p>
                </div>
                
                {/* Images */}
                {selectedReview.images && selectedReview.images.length > 0 && (
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4A8A90]" />
                      📸 Attached Images ({selectedReview.images.length})
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedReview.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url}
                          alt={`Review image ${idx + 1}`}
                          className="w-full h-24 sm:h-32 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity shadow-md"
                          onClick={() => window.open(img.url, '_blank')}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Video */}
                {selectedReview.video?.url && (
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4A8A90]" />
                      🎥 Attached Video
                    </p>
                    <video
                      src={selectedReview.video.url}
                      controls
                      className="w-full rounded-xl shadow-md"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  if (loading) {
    return (
      <section className="w-full bg-gradient-to-br from-[#F0F7F7] via-white to-[#FEF9F9] py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#4A8A90]/10 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 mb-4">
              <span className="text-base sm:text-lg">⭐</span>
              <span className="text-[#4A8A90] font-semibold text-xs sm:text-sm md:text-base">Trusted by Parents Worldwide</span>
            </div>
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full bg-gradient-to-br from-[#F0F7F7] via-white to-[#FEF9F9] py-10 sm:py-10 md:py-10 relative overflow-hidden">
        {/* Animated Background Elements - Hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          <div className="absolute top-10 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-[#FFB6C1]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 sm:w-40 h-32 sm:h-40 bg-[#4A8A90]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-1 sm:gap-2 ">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-[#4A8A90] tracking-wide uppercase" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
                Happy Parents Share
              </span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2D3A5C] mb-2 sm:mb-3 px-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
              What Our{' '}
              <span className="bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] bg-clip-text text-transparent">
                Customers Say
              </span>
            </h2>
            
            <p className="text-[10px] sm:text-xs md:text-sm text-[#6B7280] max-w-2xl mx-auto px-4" style={{ fontFamily: "'Comic Neue', 'Quicksand', sans-serif" }}>
              Join thousands of happy parents who trust us for quality toys
            </p>
          </motion.div>

          {/* Action Buttons - Responsive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
           className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap"
          >
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="group px-4 sm:px-6 py-1.5 sm:py-2.5 bg-gradient-to-r from-[#4A8A90] to-[#5A9AA0] text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" />
              Write a Review
            </button>
            <button
              onClick={() => router.push('/reviews')}
              className="group px-4 sm:px-6 py-1.5 sm:py-2.5 bg-white border-2 border-[#4A8A90] text-[#4A8A90] font-semibold rounded-full shadow-md hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
              All Reviews
            </button>
          </motion.div>

          {/* Main Row: Hidden on mobile, visible on desktop */}
          {!isMobile ? (
            <div className="flex flex-col lg:flex-row items-stretch -ml-20">
              {/* Left: Fixed Main Image - Hidden on mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 lg:w-72 xl:w-80 flex items-center"
              >
                <div className="relative w-full">
                  <div className="absolute -top-4 -left-4 w-24 h-16 bg-[#FFB6C1]/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#4A8A90]/20 rounded-full blur-2xl"></div>
                  <img
                    src={fixedImage}
                    alt="Happy child with toy"
                    className="w-full h-auto max-h-64 md:max-h-[348px] object-contain drop-shadow-2xl relative z-10 mx-auto"
                  />
                </div>
              </motion.div>

              {/* Right: 3 Testimonial Cards - Desktop */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 -ml-[42px]">
                {visibleTestimonials.map((review, index) => (
                  <TestimonialCard
                    key={`card-${review._id}-${currentIndex}-${index}`}
                    review={review}
                    index={index}
                    getAvatarColor={getAvatarColor}
                    renderStars={renderStars}
                    truncateText={truncateText}
                    setSelectedReview={setSelectedReview}
                    setIsDetailModalOpen={setIsDetailModalOpen}
                    setHoveredCard={setHoveredCard}
                    setIsCardHovering={setIsCardHovering}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Mobile: 1 Card per row with horizontal scroll */
            <div className="relative">
              {/* Navigation Arrows for Mobile */}
              {featuredReviews.length > 1 && (
                <>
                  <button
                    onClick={handleManualPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 border-2 border-[#D4EDEE] hover:bg-[#D4EDEE] -ml-2"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#4A8A90]" />
                  </button>
                  <button
                    onClick={handleManualNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 border-2 border-[#D4EDEE] hover:bg-[#D4EDEE] -mr-2"
                  >
                    <ChevronRight className="w-4 h-4 text-[#4A8A90]" />
                  </button>
                </>
              )}
              
              {/* Mobile Cards Carousel */}
              <div className="flex overflow-x-auto gap-4 pb-4 scroll-smooth snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {visibleTestimonials.map((review, index) => (
                  <div key={`mobile-card-${review._id}`} className="flex-shrink-0 w-full snap-center">
                    <TestimonialCard
                      review={review}
                      index={index}
                      getAvatarColor={getAvatarColor}
                      renderStars={renderStars}
                      truncateText={truncateText}
                      setSelectedReview={setSelectedReview}
                      setIsDetailModalOpen={setIsDetailModalOpen}
                      setHoveredCard={setHoveredCard}
                      setIsCardHovering={setIsCardHovering}
                      isMobile={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls - Dots */}
          {featuredReviews.length > (isMobile ? 1 : 3) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12"
            >
              <button
                onClick={handleManualPrev}
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#4A8A90] hover:bg-[#F0F7F7] transition-all duration-300 shadow-sm hover:shadow-lg group"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#4A8A90] group-hover:scale-110 transition-transform" />
              </button>

              {/* Dots Navigation */}
              <div className="flex gap-1.5 sm:gap-2">
                {Array.from({ length: Math.ceil(featuredReviews.length / (isMobile ? 1 : 3)) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index * (isMobile ? 1 : 3));
                      setIsCardHovering(true);
                      setTimeout(() => setIsCardHovering(false), 3000);
                    }}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                      Math.floor(currentIndex / (isMobile ? 1 : 3)) === index
                        ? 'bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] w-6 sm:w-8'
                        : 'bg-gray-300 w-1.5 sm:w-2 hover:bg-[#4A8A90] hover:w-3 sm:hover:w-4'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleManualNext}
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#4A8A90] hover:bg-[#F0F7F7] transition-all duration-300 shadow-sm hover:shadow-lg group"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#4A8A90] group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* Trust Badges - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200"
          >
            {[
              { icon: <Trophy className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />, text: 'Award Winning Toys', color: 'text-yellow-500' },
              { icon: <Shield className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />, text: '100% Safe', color: 'text-green-500' },
              { icon: <Truck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />, text: 'Fast Delivery', color: 'text-blue-500' },
              { icon: <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />, text: 'Secure Payment', color: 'text-purple-500' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 sm:gap-2 bg-white/50 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full shadow-sm"
              >
                <span className={`text-xs sm:text-base md:text-xl ${item.color}`}>{item.icon}</span>
                <span className="text-[8px] sm:text-xs md:text-sm text-gray-600 whitespace-nowrap">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={() => {
          fetchFeaturedReviews();
        }}
        productId={null}
        productName={null}
      />

      <ReviewModal
        isOpen={isAllReviewsModalOpen}
        onClose={() => setIsAllReviewsModalOpen(false)}
        onReviewSubmitted={() => {}}
        productId={null}
        productName={null}
        viewAllMode={true}
      />

      <DetailViewModal />
    </>
  );
}

// Separate Testimonial Card Component
function TestimonialCard({ review, index, getAvatarColor, renderStars, truncateText, setSelectedReview, setIsDetailModalOpen, setHoveredCard, setIsCardHovering, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
      whileHover={{ y: -5 }}
      onHoverStart={() => {
        setHoveredCard?.(review._id);
        setIsCardHovering?.(true);
      }}
      onHoverEnd={() => {
        setHoveredCard?.(null);
        setIsCardHovering?.(false);
      }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative bg-white rounded-t-4xl rounded-br-4xl p-4 sm:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        {/* Quote Icon */}
        <div className="mb-2 sm:mb-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center shadow-md">
            <Quote className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
        </div>

        {/* Rating */}
        <div className="mb-2 sm:mb-3">
          {renderStars(review.rating)}
        </div>

        {/* Product Name Badge */}
        {review.productName && (
          <div className="mb-2">
            <span className="text-[9px] sm:text-xs font-semibold text-[#4A8A90] bg-[#4A8A90]/10 px-1.5 sm:px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              🎁 {truncateText(review.productName, isMobile ? 25 : 35)}
            </span>
          </div>
        )}

        {/* Review Title */}
        {review.title && (
          <h3 className="font-bold text-gray-800 text-xs sm:text-sm mb-1 line-clamp-1">
            {review.title}
          </h3>
        )}

        {/* Review Comment */}
        <p className="text-gray-600 text-[10px] sm:text-xs leading-relaxed mb-2 sm:mb-3 line-clamp-2">
          "{review.comment}"
        </p>

        {/* Images Preview */}
        {review.images && review.images.length > 0 && (
          <div className="mb-2 sm:mb-3">
            <div className="flex gap-1 sm:gap-1.5">
              {review.images.slice(0, 3).map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`Review pic ${idx + 1}`}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover cursor-pointer hover:scale-110 transition-transform shadow-sm"
                  onClick={() => {
                    setSelectedReview(review);
                    setIsDetailModalOpen(true);
                  }}
                />
              ))}
              {review.images.length > 3 && (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[9px] sm:text-xs font-semibold text-gray-500">
                  +{review.images.length - 3}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Video Badge */}
        {review.video?.url && (
          <div className="mb-2 sm:mb-3">
            <div className="flex items-center gap-1 text-[9px] sm:text-xs text-gray-500 bg-gray-100 rounded-full px-1.5 sm:px-2 py-0.5 w-fit">
              <Video className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#4A8A90]" />
              <span>Has video</span>
            </div>
          </div>
        )}

        {/* Author Info */}
        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${getAvatarColor(review.userName)} flex items-center justify-center text-white font-bold text-[9px] sm:text-xs shadow-md`}>
              {review.userName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <p className="font-bold text-gray-800 text-[9px] sm:text-xs">{truncateText(review.userName, isMobile ? 10 : 15)}</p>
                {review.isVerifiedPurchase && (
                  <CheckCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-green-500" />
                )}
              </div>
              <p className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              setSelectedReview(review);
              setIsDetailModalOpen(true);
            }}
            className="p-1 sm:p-1.5 text-gray-400 hover:text-[#4A8A90] hover:bg-[#4A8A90]/10 rounded-full transition-all"
            title="View full review"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Trophy icon component
const Trophy = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);