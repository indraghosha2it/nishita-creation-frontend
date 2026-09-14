
// components/sections/TrustResultsSection.js
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ShieldCheck,
  FlaskConical,
  Leaf,
  HeartHandshake,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Icon mapping
const ICON_MAP = {
  ShieldCheck,
  FlaskConical,
  Leaf,
  HeartHandshake,
  Heart,
  Star,
  Users: Star,
  Award: Star,
};

export default function TrustResultsSection() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data?.featuredProducts && data.featuredProducts.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % data.featuredProducts.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [data?.featuredProducts]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/trust-results`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setTestimonialIndex(0);
      }
    } catch (error) {
      console.error('Error fetching trust results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextSlide = () => {
    if (!data?.featuredProducts) return;
    setCurrentSlide((prev) => (prev + 1) % data.featuredProducts.length);
  };

  const prevSlide = () => {
    if (!data?.featuredProducts) return;
    setCurrentSlide((prev) => (prev - 1 + data.featuredProducts.length) % data.featuredProducts.length);
  };

  const getVisibleTestimonials = (startIndex) => {
    if (!data?.testimonials || data.testimonials.length === 0) return [];
    const testimonials = data.testimonials;
    // Use the isMobile state instead of checking window.innerWidth directly
    const count = isMobile ? 1 : Math.min(3, testimonials.length);
    const result = [];
    for (let i = 0; i < count; i++) {
      const index = (startIndex + i) % testimonials.length;
      result.push({
        ...testimonials[index],
        _key: testimonials[index].id || `${testimonials[index].name}_${index}_${Date.now()}`
      });
    }
    return result;
  };

  const visibleTestimonials = data?.testimonials ? getVisibleTestimonials(testimonialIndex) : [];

  const nextTestimonials = () => {
    if (!data?.testimonials || data.testimonials.length === 0) return;
    setTestimonialIndex((prev) => (prev + 1) % data.testimonials.length);
  };

  const previousTestimonials = () => {
    if (!data?.testimonials || data.testimonials.length === 0) return;
    setTestimonialIndex((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length);
  };

  if (isLoading) {
    return (
      <section className="relative w-full bg-[#f8f7f2] py-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!data || !data.featuredProducts || data.featuredProducts.length === 0) {
    return null;
  }

  const currentProduct = data.featuredProducts[currentSlide];
  const trustFeatures = data.trustFeatures || [];

  // Separate features for mobile layout: 1st row (1 column), 2nd & 3rd rows (2 columns)
  const firstFeature = trustFeatures.length > 0 ? trustFeatures[0] : null;
  const remainingFeatures = trustFeatures.slice(1);

  return (
    <section className="relative w-full bg-[#f8f7f2] py-3 sm:py-5 md:py-7 overflow-hidden">
      <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-5">
        {/* Top Results Area */}
        <div className="rounded-[10px] border border-[#c5d5be] bg-gradient-to-br from-[#f5f8f2] via-[#f8faf5] to-[#f0f5ed] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          
          {/* Mobile Heading */}
          <div className="mb-5 text-center lg:hidden">
            <h2 className="text-[13px] sm:text-[15px] font-semibold tracking-[0.12em] text-[#393535]">
              {data.sectionTitle || 'TRUSTED BY THOUSANDS'}
            </h2>
          </div>

          {/* Main Grid - Carousel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.15fr_1fr] gap-6 lg:gap-7 items-start">
            
            {/* LEFT - Product Info & Stats */}
            <motion.div
              key={`product-${currentSlide}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Desktop Heading */}
              <div className="hidden lg:block mb-3">
                <h2 className="text-[13px] font-semibold tracking-[0.12em] text-[#393535]">
                  {data.sectionTitle || 'TRUSTED BY THOUSANDS'}
                </h2>
              </div>

              {/* Main Heading */}
              <h3 className="font-serif text-[25px] sm:text-[28px] lg:text-[25px] xl:text-[27px] leading-[1.15] tracking-[0.02em] text-[#34302e]">
                {data.mainHeading || 'REAL RESULTS. REAL CONFIDENCE.'}
              </h3>

              {/* Featured Product - Clickable */}
              <Link 
                href={currentProduct.link || '/products'}
                className="mt-4 flex items-center gap-3 group cursor-pointer transition-all hover:opacity-80"
              >
                <div className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full bg-white border border-[#c5d5be] flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={currentProduct.image || '/images/products/radiance-serum.png'}
                    alt={currentProduct.productName}
                    className="w-full h-full object-contain p-1.5 group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#8B9D83] mb-1 group-hover:text-[#6b7d63] transition-colors">
                    Featured Product
                  </p>
                  <h4 className="text-[13px] sm:text-[15px] text-[#332e2c] font-medium leading-tight group-hover:text-[#626d5c] transition-colors group-hover:underline">
                    {currentProduct.productName}
                  </h4>
                </div>
                <svg 
                  className="w-3 h-3 text-[#8B9D83] group-hover:text-[#6b7d63] group-hover:translate-x-1 transition-all" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Product Stats - Specific to this product */}
              {currentProduct.stats && currentProduct.stats.length > 0 && (
                <div className="mt-6 grid grid-cols-3 max-w-[330px]">
                  {currentProduct.stats.map((stat, index) => (
                    <div
                      key={`stat-${currentSlide}-${index}`}
                      className={`px-2 sm:px-3 ${index === 1 ? 'border-x border-[#c5d5be]' : ''}`}
                    >
                      <div className="font-serif text-[29px] sm:text-[32px] lg:text-[31px] leading-none text-[#8B9D83]">
                        {stat.value}
                      </div>
                      <p className="mt-2 text-[8px] sm:text-[9px] leading-[1.5] text-[#554e4b]">
                        {stat.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Carousel Indicators */}
              {data.featuredProducts.length > 1 && (
                <div className="flex gap-1.5 mt-4">
                  {data.featuredProducts.map((_, index) => (
                    <button
                      key={`indicator-${index}`}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide
                          ? 'w-6 h-1.5 bg-[#8B9D83]'
                          : 'w-1.5 h-1.5 bg-[#c5d5be] hover:bg-[#8B9D83]/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* CENTER - Before/After Images */}
            <motion.div
              key={`images-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[500px] mx-auto"
            >
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <div className="relative aspect-[0.82] overflow-hidden rounded-[8px] bg-[#d5ddce]">
                  <img
                    src={currentProduct.beforeAfter?.beforeImage || '/images/results-before.jpg'}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 sm:left-3 text-white text-[9px] sm:text-[10px] font-semibold tracking-wide drop-shadow-md">
                    {currentProduct.beforeAfter?.beforeLabel || 'BEFORE'}
                  </div>
                </div>

                <div className="relative aspect-[0.82] overflow-hidden rounded-[8px] bg-[#d5ddce]">
                  <img
                    src={currentProduct.beforeAfter?.afterImage || '/images/results-after.jpg'}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 sm:left-3 text-white text-[9px] sm:text-[10px] font-semibold tracking-wide drop-shadow-md">
                    {currentProduct.beforeAfter?.afterLabel || 'AFTER'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT - Trust Features - Mobile: 3 rows (1 + 2 columns) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full"
            >
              {/* Mobile Layout: 3 Rows */}
              <div className="lg:hidden flex flex-col gap-1.5">
                {/* Row 1: First feature - Full width */}
                {firstFeature && (
                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-3 min-h-[45px] rounded-[7px] border border-[#c5d5be] bg-white/45 px-3 sm:px-4"
                  >
                    {(() => {
                      const IconComponent = ICON_MAP[firstFeature.icon] || Heart;
                      return (
                        <>
                          <IconComponent className="w-[23px] h-[23px] flex-shrink-0 text-[#8B9D83] stroke-[1.3]" />
                          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.03em] text-[#403b39]">
                            {firstFeature.title}
                          </span>
                        </>
                      );
                    })()}
                  </motion.div>
                )}

                {/* Row 2 & 3: Remaining features - 2 columns */}
                <div className="grid grid-cols-2 gap-1.5">
                  {remainingFeatures.map((feature, index) => {
                    const IconComponent = ICON_MAP[feature.icon] || Heart;
                    return (
                      <motion.div
                        key={feature.id || `feature-${index}`}
                        initial={{ opacity: 0, x: 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + (index + 1) * 0.07 }}
                        className="flex items-center gap-2 min-h-[45px] rounded-[7px] border border-[#c5d5be] bg-white/45 px-2 sm:px-3"
                      >
                        <IconComponent className="w-[18px] h-[18px] flex-shrink-0 text-[#8B9D83] stroke-[1.3]" />
                        <span className="text-[8px] sm:text-[9px] font-medium tracking-[0.02em] text-[#403b39] leading-tight">
                          {feature.title}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Layout: All features in single column */}
              <div className="hidden lg:flex flex-col gap-1.5 sm:gap-2">
                {trustFeatures.map((feature, index) => {
                  const IconComponent = ICON_MAP[feature.icon] || Heart;
                  return (
                    <motion.div
                      key={feature.id || `feature-${index}`}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + index * 0.07 }}
                      className="flex items-center gap-3 min-h-[45px] sm:min-h-[48px] rounded-[7px] border border-[#c5d5be] bg-white/45 px-3 sm:px-4"
                    >
                      <IconComponent className="w-[23px] h-[23px] sm:w-[25px] sm:h-[25px] flex-shrink-0 text-[#8B9D83] stroke-[1.3]" />
                      <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.03em] text-[#403b39]">
                        {feature.title}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows for Carousel */}
          {data.featuredProducts.length > 1 && (
            <div className="flex justify-center gap-3 mt-4 lg:mt-0">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-white border border-[#c5d5be] flex items-center justify-center hover:bg-[#f0f5ed] hover:border-[#8B9D83] transition-all shadow-sm"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-4 h-4 text-[#554e4b]" />
              </button>
         
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-white border border-[#c5d5be] flex items-center justify-center hover:bg-[#f0f5ed] hover:border-[#8B9D83] transition-all shadow-sm"
                aria-label="Next product"
              >
                <ChevronRight className="w-4 h-4 text-[#554e4b]" />
              </button>
            </div>
          )}
        </div>

        {/* Testimonial Section - Mobile: 1 per page, Desktop: 3 per page */}
        {data.testimonials && data.testimonials.length > 0 && (
          <div className="relative mt-4 sm:mt-5">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-[13px] sm:text-[14px] md:text-[15px] font-semibold tracking-[0.1em] text-[#3d3937] mb-3"
            >
              {data.testimonialsTitle || 'LOVED BY OUR COMMUNITY'}
            </motion.h2>

            <div className="relative px-0 sm:px-10">
              {/* Navigation Arrows for Testimonials */}
              {data.testimonials.length > 1 && (
                <>
                  <button
                    onClick={previousTestimonials}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#d5ddce] flex items-center justify-center text-[#514b48] shadow-sm hover:bg-[#c5d5be] transition-colors duration-200 flex sm:flex"
                    aria-label="Previous testimonials  "
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    onClick={nextTestimonials}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#d5ddce] flex items-center justify-center text-[#514b48] shadow-sm hover:bg-[#c5d5be] transition-colors duration-200 flex sm:flex"
                    aria-label="Next testimonials"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
                <AnimatePresence mode="popLayout">
                  {visibleTestimonials.map((testimonial) => (
                    <motion.div
                      key={testimonial._key || testimonial.id || `testimonial-${testimonial.name}-${Date.now()}`}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-[116px] sm:min-h-[120px] rounded-[8px] border border-[#c5d5be] bg-gradient-to-r from-[#f0f5ed] to-[#f5f8f2] px-3 sm:px-4 py-3 flex items-center gap-3"
                    >
                      <div className="relative w-[67px] h-[67px] sm:w-[73px] sm:h-[73px] flex-shrink-0 rounded-full overflow-hidden bg-[#d5ddce]">
                        <img
                          src={testimonial.image || '/images/avatar-placeholder.jpg'}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-[2px] mb-2">
                          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-[12px] h-[12px] fill-[#e88b17] text-[#e88b17]" />
                          ))}
                        </div>
                        <p className="text-[9px] sm:text-[10px] italic leading-[1.4] text-[#403a38]">
                          {testimonial.review}
                        </p>
                        <p className="mt-0.5 text-[9px] sm:text-[10px] italic leading-[1.4] text-[#403a38]">
                          {testimonial.description}
                        </p>
                        <p className="mt-2 text-[9px] sm:text-[10px] font-medium text-[#514b48]">
                          — {testimonial.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Testimonial Indicators - Mobile */}
              {data.testimonials.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-3 md:hidden">
                  {data.testimonials.map((_, index) => (
                    <button
                      key={`testimonial-dot-${index}`}
                      onClick={() => setTestimonialIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === testimonialIndex
                          ? 'w-5 h-1.5 bg-[#8B9D83]'
                          : 'w-1.5 h-1.5 bg-[#c5d5be] hover:bg-[#8B9D83]/50'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B9D83]/50 to-transparent" />
    </section>
  );
}