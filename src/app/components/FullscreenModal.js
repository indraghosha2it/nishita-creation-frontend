// components/FullscreenModal.js
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FullscreenModal({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onImageChange,
  productName 
}) {
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
      
      return () => {
        // Restore body scroll
        const scrollY = document.body.style.top;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[100000] p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
        aria-label="Close fullscreen"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
      </button>
      
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
              onImageChange(newIndex);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[100000] p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
              onImageChange(newIndex);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[100000] p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}
      
      <div 
        className="relative max-w-[95vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]?.url || images[0]?.url}
          alt={productName}
          className="max-w-[95vw] max-h-[85vh] object-contain select-none"
          draggable={false}
        />
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100000] bg-black/60 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>,
    document.body
  );
}