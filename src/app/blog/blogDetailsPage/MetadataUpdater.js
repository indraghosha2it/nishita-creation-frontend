'use client';

import { useEffect } from 'react';

export default function BlogMetadataUpdater({ blog }) {
  useEffect(() => {
    if (!blog) return;
    
    const updateMetadata = () => {
      try {
        // Get SEO data from blog metaSettings or generate fallback for ToyMart
        const metaTitle = blog.metaTitle || 
          `${blog.title} | ToyMart Blog - Kids Stories & Parenting Tips`;
        
        const metaDescription = blog.metaDescription || 
          `${blog.excerpt?.substring(0, 160) || blog.title} | Read this engaging article about ${blog.category?.replace(/-/g, ' ') || 'kids toys'} at ToyMart Blog. Perfect for parents looking for tips and fun ideas for their children.`;
        
        const metaKeywords = blog.metaKeywords || [
          blog.title,
          blog.category?.replace(/-/g, ' '),
          blog.tags,
          'kids blog bangladesh',
          'parenting tips',
          'toy blog',
          'child development',
          'kids activities',
          'toymart blog'
        ].flat().filter(Boolean).join(', ');
        
        // Get primary image
        const primaryImage = blog.featuredImage || '/blog-default-og.jpg';
        
        // Get category details for display
        const categoryMap = {
          'parenting-kids': 'Parenting & Kids',
          'toys-games': 'Toys & Games',
          'education-learning': 'Education & Learning',
          'gift-guides': 'Gift Guides',
          'kids-activities': 'Kids Activities',
          'child-development': 'Child Development',
          'trends-news': 'Trends & News',
          'health-safety': 'Health & Safety',
          'lifestyle-family': 'Lifestyle & Family',
          'sustainability-eco-friendly': 'Sustainability'
        };
        
        const categoryName = categoryMap[blog.category] || blog.category || 'Blog';
        
        // Update document title
        document.title = metaTitle;
        
        // Helper function to update or create meta tags
        const updateOrCreateMetaTag = (name, content, isProperty = false) => {
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
        updateOrCreateMetaTag('description', metaDescription);
        updateOrCreateMetaTag('keywords', metaKeywords);
        
        // Open Graph tags
        updateOrCreateMetaTag('og:title', metaTitle, true);
        updateOrCreateMetaTag('og:description', metaDescription, true);
        updateOrCreateMetaTag('og:url', `https://toymart.com.bd/blog/blogDetailsPage?id=${blog._id}`, true);
        updateOrCreateMetaTag('og:image', primaryImage, true);
        updateOrCreateMetaTag('og:type', 'article', true);
        updateOrCreateMetaTag('og:site_name', 'ToyMart', true);
        updateOrCreateMetaTag('article:published_time', blog.publishDate, true);
        updateOrCreateMetaTag('article:author', blog.author, true);
        updateOrCreateMetaTag('article:section', categoryName, true);
        
        // Article tags
        if (blog.tags && blog.tags.length > 0) {
          blog.tags.forEach(tag => {
            updateOrCreateMetaTag('article:tag', tag, true);
          });
        }
        
        // Twitter tags
        updateOrCreateMetaTag('twitter:title', metaTitle);
        updateOrCreateMetaTag('twitter:description', metaDescription);
        updateOrCreateMetaTag('twitter:image', primaryImage);
        updateOrCreateMetaTag('twitter:card', 'summary_large_image');
        updateOrCreateMetaTag('twitter:site', '@ToyMartBD');
        updateOrCreateMetaTag('twitter:creator', '@ToyMartBD');
        
        // Canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        const canonicalUrl = `https://toymart.com.bd/blog/blogDetailsPage?id=${blog._id}`;
        if (canonical) {
          canonical.setAttribute('href', canonicalUrl);
        } else {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          canonical.setAttribute('href', canonicalUrl);
          document.head.appendChild(canonical);
        }
        
        // Remove existing JSON-LD if any
        const existingJsonLd = document.querySelector('#blog-json-ld');
        if (existingJsonLd) {
          existingJsonLd.remove();
        }
        
        // Add JSON-LD structured data for Blog Post - ToyMart specific
        const jsonLd = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": blog.title,
          "description": metaDescription,
          "image": primaryImage,
          "datePublished": blog.publishDate,
          "dateModified": blog.updatedAt || blog.publishDate,
          "author": {
            "@type": "Person",
            "name": blog.author,
            "url": `https://toymart.com.bd/blog/author/${blog.author?.toLowerCase().replace(/\s/g, '-')}`
          },
          "publisher": {
            "@type": "Organization",
            "name": "ToyMart",
            "logo": {
              "@type": "ImageObject",
              "url": "https://toymart.com.bd/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          },
          "articleSection": categoryName,
          "keywords": blog.tags?.join(', ') || categoryName,
          "url": canonicalUrl,
          "inLanguage": "en-US",
          "isAccessibleForFree": true
        };
        
        // Add estimated reading time
        const readingTime = Math.ceil((blog.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0) / 200);
        jsonLd.estimatedReadingTime = `${readingTime} minute${readingTime !== 1 ? 's' : ''}`;
        
        // Add thumbnail images if available
        if (blog.thumbnailImages && blog.thumbnailImages.length > 0) {
          jsonLd.thumbnailUrl = blog.thumbnailImages.map(img => img.url);
        }
        
        // Add the JSON-LD script to head
        const script = document.createElement('script');
        script.id = 'blog-json-ld';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLd);
        document.head.appendChild(script);
        
        // Add BreadcrumbList JSON-LD
        const existingBreadcrumbJsonLd = document.querySelector('#breadcrumb-json-ld');
        if (existingBreadcrumbJsonLd) {
          existingBreadcrumbJsonLd.remove();
        }
        
        const breadcrumbJsonLd = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://toymart.com.bd"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://toymart.com.bd/blog"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": blog.title,
              "item": canonicalUrl
            }
          ]
        };
        
        const breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = 'breadcrumb-json-ld';
        breadcrumbScript.type = 'application/ld+json';
        breadcrumbScript.textContent = JSON.stringify(breadcrumbJsonLd);
        document.head.appendChild(breadcrumbScript);
        
        console.log('Metadata updated for ToyMart blog post:', blog.title);
        console.log('JSON-LD added for blog post:', blog.title);
        
      } catch (error) {
        console.error('Error updating blog metadata:', error);
      }
    };
    
    updateMetadata();
  }, [blog]);
  
  return null;
}