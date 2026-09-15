'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AchievementSection() {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ============================================================
  // FETCH
  // ============================================================
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/achievements`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
          setAchievements(data.data);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // ============================================================
  // AUTO-ROTATE — every 5 seconds (only when more than 1)
  // ============================================================
  useEffect(() => {
    if (achievements.length <= 1) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [achievements.length]);

  // ============================================================
  // BODY SCROLL LOCK FOR MODAL
  // ============================================================
  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  // ============================================================
  // LOADING
  // ============================================================
  if (isLoading) {
    return (
      <section className="py-10 bg-[#f8f7f2]">
        <div className="flex justify-center items-center h-32">
          <div className="w-8 h-8 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (achievements.length === 0) return null;

  // ============================================================
  // NAVIGATION
  // ============================================================
  const total = achievements.length;
  const current = achievements[currentIndex];

  const nextSlide = () => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // ============================================================
  // SINGLE ACHIEVEMENT
  // ============================================================
  if (total === 1) {
    return (
      <>
        <section className="py-2 md:py-4 bg-[#f8f7f2] overflow-hidden">
          <div className="max-w-6xl mx-auto px-0 sm:px-6 md:px-10">
            <div className="flex items-center justify-center h-[500px] sm:h-[440px] md:h-[380px]">
              <div className="w-full">
                <AchievementRow
                  achievement={current}
                  onSeeMore={() => setActiveModal(current)}
                />
              </div>
            </div>
          </div>
        </section>

        <AchievementModal
          activeModal={activeModal}
          setActiveModal={setActiveModal}
        />
        <RichTextStyles />
      </>
    );
  }

  // ============================================================
  // MULTIPLE ACHIEVEMENTS — carousel
  // Mobile: arrows on image sides
  // Desktop: arrows on section left/right edges
  // ============================================================
  return (
    <>
      <section className="py-2 md:py-4 bg-[#f8f7f2] overflow-hidden">
        <div className="max-w-6xl mx-auto px-0 sm:px-6 md:px-10">
          <div className="relative">
            {/* Slide content */}
            <div className="px-0 sm:px-7 md:px-9 flex items-center justify-center h-[500px] sm:h-[440px] md:h-[380px]">
              <AchievementRow
                achievement={current}
                onSeeMore={() => setActiveModal(current)}
                prevSlide={prevSlide}
                nextSlide={nextSlide}
              />
            </div>

            {/* DESKTOP-ONLY ARROWS — fixed on section left/right edges */}
            {/* LEFT ARROW */}
            <button
              onClick={prevSlide}
              aria-label="Previous achievement"
              className="
                hidden md:flex
                absolute left-0 top-1/2 -translate-y-1/2 z-30
                items-center justify-center
                w-10 h-10
                text-[#263b32]/60 hover:text-[#B52036]
                transition-colors duration-200
                -ml-2
              "
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={nextSlide}
              aria-label="Next achievement"
              className="
                hidden md:flex
                absolute right-0 top-1/2 -translate-y-1/2 z-30
                items-center justify-center
                w-10 h-10
                text-[#263b32]/60 hover:text-[#B52036]
                transition-colors duration-200
                -mr-2
              "
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <AchievementModal
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
      <RichTextStyles />
    </>
  );
}

// ============================================================
// REUSABLE — Achievement Row
// ============================================================
function AchievementRow({ achievement, onSeeMore, prevSlide, nextSlide }) {
  const descRef = useRef(null);
  const mobileDescRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isMobileOverflowing, setIsMobileOverflowing] = useState(false);

  // Desktop overflow check (7 lines / 180px)
  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsOverflowing(el.scrollHeight > el.clientHeight + 2);
    };

    checkOverflow();
    const t = setTimeout(checkOverflow, 300);
    window.addEventListener('resize', checkOverflow);

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [achievement.description]);

  // Mobile overflow check (3 lines)
  useEffect(() => {
    const el = mobileDescRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsMobileOverflowing(el.scrollHeight > el.clientHeight + 2);
    };

    checkOverflow();
    const t = setTimeout(checkOverflow, 300);
    window.addEventListener('resize', checkOverflow);

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [achievement.description]);

  // Mobile arrows need to be rendered here (inside image wrapper)
  const hasArrows = typeof prevSlide === 'function' && typeof nextSlide === 'function';

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-4 sm:gap-5 md:gap-6">
      {/* LEFT — Text */}
      <div className="w-full md:w-3/5 flex flex-col px-4 sm:px-0">
        {/* Logo + (Title / Subtitle) row */}
        <div className="flex items-center gap-2 sm:gap-3">
          {achievement.logo && (
            <img
              src={achievement.logo}
              alt={`${achievement.title} logo`}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain flex-shrink-0"
            />
          )}
          <div className="flex flex-col min-w-0">
            <h3 className="text-base sm:text-lg md:text-2xl font-bold text-[#A4222C] leading-tight">
              {achievement.title}
            </h3>
            {achievement.subtitle && (
              <p className="text-[11px] sm:text-xs md:text-base font-normal text-[#b0ab90] mt-0.5 leading-snug">
                {achievement.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* MOBILE — Description clamped to 3 lines + Read More inline (only if overflow) */}
        {achievement.description && (
          <div className="md:hidden mt-3">
            <div className="flex items-end gap-2">
              <div
                ref={mobileDescRef}
                className="achievement-rich-text text-xs text-gray-600 overflow-hidden flex-1"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}
                dangerouslySetInnerHTML={{ __html: achievement.description }}
              />
              {isMobileOverflowing && (
                <button
                  onClick={onSeeMore}
                  className="flex-shrink-0 text-xs font-semibold text-[#CC1D34] hover:text-[#992028] underline underline-offset-2 transition-colors whitespace-nowrap"
                >
                  Read More
                </button>
              )}
            </div>
          </div>
        )}

        {/* DESKTOP — Description clamped to 7 lines */}
        {achievement.description && (
          <div className="hidden md:block mt-4">
            <div
              ref={descRef}
              className="achievement-rich-text text-xs md:text-sm text-gray-600 overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 7,
                WebkitBoxOrient: 'vertical',
                maxHeight: '180px'
              }}
              dangerouslySetInnerHTML={{ __html: achievement.description }}
            />

            {isOverflowing && (
              <button
                onClick={onSeeMore}
                className="mt-4 text-xs md:text-sm font-semibold text-[#CC1D34] hover:text-[#992028] underline underline-offset-2 transition-colors"
              >
                Read More
              </button>
            )}
          </div>
        )}
      </div>

      {/* RIGHT — Image with MOBILE-only arrows on image sides */}
      <div className="w-full md:w-2/5 relative flex items-center justify-center">
        {/* MOBILE LEFT ARROW — centered on image */}
        {hasArrows && (
          <button
            onClick={prevSlide}
            aria-label="Previous achievement"
            className="
              md:hidden
              absolute left-0 top-1/2 -translate-y-1/2 z-20
              flex items-center justify-center
              w-7 h-7
              text-[#263b32]/60 hover:text-[#B52036]
              transition-colors duration-200
              -ml-1
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <img
          src={achievement.image}
          alt={achievement.title}
          className="w-full h-auto max-h-[240px] sm:max-h-[280px] md:max-h-[320px] object-contain"
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg';
          }}
        />

        {/* MOBILE RIGHT ARROW — centered on image */}
        {hasArrows && (
          <button
            onClick={nextSlide}
            aria-label="Next achievement"
            className="
              md:hidden
              absolute right-0 top-1/2 -translate-y-1/2 z-20
              flex items-center justify-center
              w-7 h-7
              text-[#263b32]/60 hover:text-[#B52036]
              transition-colors duration-200
              -mr-1
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================
// REUSABLE — Modal
// ============================================================
function AchievementModal({ activeModal, setActiveModal }) {
  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60"
          onClick={() => setActiveModal(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-start justify-between gap-4 p-5 border-b border-[#c5d5be]/40 bg-[#f8f7f2]">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {activeModal.logo && (
                  <img
                    src={activeModal.logo}
                    alt={activeModal.title}
                    className="w-12 h-12 object-contain flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-[#A4222C] truncate">
                    {activeModal.title}
                  </h3>
                  {activeModal.subtitle && (
                    <p className="text-xs md:text-sm font-medium text-[#8B9D83] truncate mt-0.5">
                      {activeModal.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="flex-shrink-0 p-1.5 rounded-full hover:bg-[#c5d5be]/40 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-5 md:p-6 overflow-y-auto">
              <div
                className="achievement-rich-text text-sm md:text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: activeModal.description }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// REUSABLE — Rich Text Styles
// ============================================================
function RichTextStyles() {
  return (
    <style jsx global>{`
      .achievement-rich-text p {
        margin: 0 0 0.6rem 0;
        line-height: 1.65;
      }
      .achievement-rich-text p:last-child {
        margin-bottom: 0;
      }
      .achievement-rich-text h1 {
        font-size: 1.25rem;
        font-weight: 700;
        color: #A4222C;
        margin: 0.875rem 0 0.4rem 0;
      }
      .achievement-rich-text h2 {
        font-size: 1.1rem;
        font-weight: 700;
        color: #A4222C;
        margin: 0.75rem 0 0.4rem 0;
      }
      .achievement-rich-text h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #A4222C;
        margin: 0.625rem 0 0.35rem 0;
      }
      .achievement-rich-text strong,
      .achievement-rich-text b {
        font-weight: 600;
        color: #263b32;
      }
      .achievement-rich-text em,
      .achievement-rich-text i {
        font-style: italic;
      }
      .achievement-rich-text u {
        text-decoration: underline;
      }
      .achievement-rich-text s {
        text-decoration: line-through;
      }
      .achievement-rich-text ul {
        list-style-type: disc;
        padding-left: 1.1rem;
        margin: 0.4rem 0 0.6rem 0;
      }
      .achievement-rich-text ol {
        list-style-type: decimal;
        padding-left: 1.1rem;
        margin: 0.4rem 0 0.6rem 0;
      }
      .achievement-rich-text li {
        margin: 0.2rem 0;
        line-height: 1.55;
      }
      .achievement-rich-text a {
        color: #8B9D83;
        text-decoration: underline;
      }
      .achievement-rich-text a:hover {
        color: #6b7d63;
      }
      .achievement-rich-text blockquote {
        border-left: 3px solid #8B9D83;
        padding-left: 0.875rem;
        margin: 0.6rem 0;
        color: #53645a;
        font-style: italic;
      }
      .achievement-rich-text code {
        background-color: #f0f5ed;
        color: #263b32;
        padding: 0.1rem 0.3rem;
        border-radius: 0.25rem;
        font-size: 0.85em;
        font-family: monospace;
      }
      .achievement-rich-text hr {
        border: none;
        border-top: 1px solid #c5d5be;
        margin: 0.875rem 0;
      }
      .achievement-rich-text [style*='text-align: center'],
      .achievement-rich-text .text-center {
        text-align: center;
      }
      .achievement-rich-text [style*='text-align: right'],
      .achievement-rich-text .text-right {
        text-align: right;
      }
    `}</style>
  );
}