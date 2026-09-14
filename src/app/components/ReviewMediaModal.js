'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Loader2 } from 'lucide-react';

const ReviewMediaModal = ({ 
  isOpen, 
  onClose, 
  mediaItems = [], 
  initialIndex = 0,
  reviewTitle = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsLoading(true);
      setIsVideoPlaying(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, initialIndex]);

  const handlePrevious = (e) => {
    e?.stopPropagation();
    setIsLoading(true);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setIsLoading(true);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrevious(e);
    if (e.key === 'ArrowRight') handleNext(e);
  };

  // This useEffect must be here, before any conditional returns
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Now we can do conditional returns after all hooks
  if (!isOpen || mediaItems.length === 0) return null;

  const currentItem = mediaItems[currentIndex];
  const isVideo = currentItem?.type === 'video';
  const isImage = currentItem?.type === 'image';
  const totalItems = mediaItems.length;

  // Get YouTube video ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
      /youtube\.com\/v\/([^&\s?#]+)/,
      /youtube\.com\/live\/([^&\s?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  // Get YouTube thumbnail
  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeId(url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
  };

  const renderMediaContent = () => {
    if (isVideo) {
      const videoUrl = currentItem.url;
      const isYouTube = currentItem.videoType === 'youtube' || videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be');
      const videoId = getYouTubeId(videoUrl);

      if (isYouTube && videoId) {
        // YouTube Video
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              className="w-full h-full max-w-4xl max-h-[80vh] aspect-video rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Review Video"
            />
          </div>
        );
      } else {
        // Uploaded Video
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full max-w-4xl max-h-[80vh] rounded-lg"
              onLoadedData={() => setIsLoading(false)}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              </div>
            )}
          </div>
        );
      }
    } else if (isImage) {
      // Image
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={currentItem.url}
            alt={`Review media ${currentIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Media Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
            {currentIndex + 1} / {totalItems}
          </div>

          {/* Review Title */}
          {reviewTitle && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white px-4 py-2 rounded-lg text-sm max-w-[80%] truncate backdrop-blur-sm">
              {reviewTitle}
            </div>
          )}

          {/* Media Content */}
          <div 
            className="relative w-full h-full flex items-center justify-center px-4 sm:px-12"
            onClick={(e) => e.stopPropagation()}
          >
            {renderMediaContent()}
          </div>

          {/* Navigation Buttons - Only show if more than 1 item */}
          {totalItems > 1 && (
            <>
              {/* Left Arrow */}
              <button
                onClick={handlePrevious}
                className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>

              {/* Thumbnail Navigation at Bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 overflow-x-auto max-w-[90%] px-4 py-2 scrollbar-thin scrollbar-thumb-white/30">
                {mediaItems.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  const isVideoItem = item.type === 'video';
                  const thumbUrl = isVideoItem 
                    ? (item.videoType === 'youtube' ? getYouTubeThumbnail(item.url) : item.thumbnail || item.url)
                    : item.url;

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsLoading(true);
                        setIsVideoPlaying(false);
                        if (videoRef.current) {
                          videoRef.current.pause();
                        }
                        setCurrentIndex(idx);
                      }}
                      className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        isActive 
                          ? 'border-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={thumbUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/60x60?text=Media';
                          }}
                        />
                        {isVideoItem && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                        )}
                        {isActive && (
                          <div className="absolute inset-0 border-2 border-[#06B6D4] rounded-lg" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewMediaModal;