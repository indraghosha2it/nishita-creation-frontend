'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useNavbar } from '../hooks/useNavbar';

export default function DynamicLogo({ 
  className = '', 
  textClassName = '', 
  iconClassName = '',
  linkClassName = '',
  showText = true,
  showIcon = true
}) {
  const { navbarData, loading } = useNavbar();

  // Helper function for Cloudinary logo URL with transparency
  const getLogoUrl = (url) => {
    if (!url) return null;
    
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        return `${parts[0]}/upload/f_auto,fl_preserve_transparency,w_auto,h_50,c_limit/${parts[1]}`;
      }
    }
    return url;
  };

  if (loading) {
    // Show skeleton loading state
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-8 h-8 bg-[#06B6D4]/20 rounded animate-pulse"></div>
        <div className="w-24 h-6 bg-[#06B6D4]/20 rounded animate-pulse"></div>
      </div>
    );
  }

  const logo = navbarData?.logo || {
    text: 'Hyper',
    highlightText: 'Volt',
    icon: 'Zap',
    logoUrl: ''
  };

  // If logoUrl exists, show image
  if (logo.logoUrl) {
    return (
      <Link href="/" className={`flex items-center ${linkClassName || className}`}>
        <div className="flex items-center justify-center h-[50px] max-h-[50px]">
          <img 
            src={getLogoUrl(logo.logoUrl)} 
            alt={logo.text || 'HyperVolt'} 
            className="h-full w-auto max-h-[50px] object-contain"
            style={{ 
              background: 'transparent',
              display: 'block',
              maxWidth: '200px',
              width: 'auto',
              height: '100%',
              maxHeight: '50px',
              objectFit: 'contain'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              // Show fallback text if image fails
              const parent = e.target.parentElement;
              const fallback = document.createElement('span');
              fallback.className = `font-bold tracking-tight ${textClassName || 'text-white text-lg'}`;
              fallback.innerHTML = `${logo.text || 'Hyper'}<span class="text-[#06B6D4]">${logo.highlightText || 'Volt'}</span>`;
              parent.appendChild(fallback);
            }}
          />
        </div>
      </Link>
    );
  }

  // Show text logo with icon
  return (
    <Link href="/" className={`flex items-center gap-1.5 ${linkClassName || className}`}>
      {showIcon && (
        <Zap className={`w-5 h-5 text-[#06B6D4] fill-[#06B6D4]/20 ${iconClassName}`} />
      )}
      {showText && (
        <span className={`font-bold tracking-tight ${textClassName || 'text-white text-lg'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
          {logo.text || 'Hyper'}<span className="text-[#06B6D4]">{logo.highlightText || 'Volt'}</span>
        </span>
      )}
    </Link>
  );
}