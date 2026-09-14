'use client';

import { useEffect } from 'react';

export default function ClientSideMetadata({ 
  title, 
  description, 
  canonical,
  image,
  product 
}) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      
      let meta;
      if (isProperty) {
        meta = document.querySelector(`meta[property="${name}"]`);
      } else {
        meta = document.querySelector(`meta[name="${name}"]`);
      }
      
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Update basic meta tags
    if (description) {
      updateMetaTag('description', description);
    }

    // Open Graph tags
    if (title) updateMetaTag('og:title', title, true);
    if (description) updateMetaTag('og:description', description, true);
    if (canonical) updateMetaTag('og:url', `https://asianclothify.com${canonical}`, true);
    if (image) updateMetaTag('og:image', image, true);
    updateMetaTag('og:type', 'website', true);

    // Twitter tags
    if (title) updateMetaTag('twitter:title', title);
    if (description) updateMetaTag('twitter:description', description);
    if (image) updateMetaTag('twitter:image', image);

    // Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (link) {
        link.setAttribute('href', `https://asianclothify.com${canonical}`);
      } else {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', `https://asianclothify.com${canonical}`);
        document.head.appendChild(link);
      }
    }
  }, [title, description, canonical, image]);

  return null;
}