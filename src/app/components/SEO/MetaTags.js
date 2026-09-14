// src/components/SEO/MetaTags.js
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * MetaTags Component - Dynamically updates meta tags for SEO
 * @param {Object} props
 * @param {Object} props.product - Product data with metaSettings
 * @param {string} props.type - Page type (product, category, home, etc.)
 * @param {Object} props.customMeta - Custom meta tags override
 */
export default function MetaTags({ product, type = 'product', customMeta = {} }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!product && type !== 'home') return;

    // Generate meta data based on type
    const metaData = generateMetaData();
    
    // Update all meta tags
    updateMetaTags(metaData);
    
    // Add structured data for product pages
    if (type === 'product' && product) {
      addProductStructuredData(product);
    }
    
    // Add breadcrumb structured data
    addBreadcrumbStructuredData();
    
    // Cleanup function (optional - remove tags if needed)
    return () => {
      // Cleanup if needed, but usually not necessary
    };
  }, [product, type, pathname]);

  const generateMetaData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://asianclothify.com';
    const currentUrl = `${baseUrl}${pathname}`;
    
    // Default meta data
    let metaData = {
      title: 'Asian Clothify | Top Clothing Seller in Bangladesh',
      description: 'Premium wholesale clothing from Bangladesh. Bulk orders, custom manufacturing, and ready-to-ship collections for global businesses.',
      keywords: ['wholesale clothing', 'b2b clothing', 'bulk clothing', 'fashion wholesale', 'Bangladesh clothing manufacturer'],
      canonical: currentUrl,
      ogTitle: 'Asian Clothify - Wholesale Clothing Platform',
      ogDescription: 'Premium wholesale clothing from Bangladesh. Bulk orders, custom manufacturing, and ready-to-ship collections for global businesses.',
      ogImage: `${baseUrl}/og-image.jpg`,
      ogType: 'website',
      twitterTitle: 'Asian Clothify',
      twitterDescription: 'B2B Wholesale Clothing Platform',
      twitterImage: `${baseUrl}/og-image.jpg`,
      twitterCard: 'summary_large_image',
      robots: 'index, follow'
    };

    // Override with product data if available
    if (type === 'product' && product) {
      const metaTitle = customMeta.title || product.metaSettings?.metaTitle || 
        `${product.productName} | Asian Clothify - Premium Wholesale Clothing`;
      
      const metaDescription = customMeta.description || product.metaSettings?.metaDescription || 
        `${product.productName} - Available in ${product.colors?.length || 0} colors, ${product.sizes?.length || 0} sizes. MOQ: ${product.moq || 0} pieces. Perfect for wholesale and bulk orders.`;
      
      const metaKeywords = customMeta.keywords || product.metaSettings?.metaKeywords || 
        [product.productName, product.fabric, 'wholesale clothing', 'bulk order', 'b2b fashion', 'Bangladesh'];
      
      const productImage = product.images?.[0]?.url || `${baseUrl}/og-image.jpg`;
      
      metaData = {
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords,
        canonical: `${baseUrl}/product/${product.slug || product._id}`,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
        ogImage: productImage,
        ogType: 'product',
        ogUrl: `${baseUrl}/product/${product.slug || product._id}`,
        twitterTitle: metaTitle,
        twitterDescription: metaDescription,
        twitterImage: productImage,
        twitterCard: 'summary_large_image',
        robots: product.isActive !== false ? 'index, follow' : 'noindex, nofollow'
      };
    }
    
    // Override with custom meta if provided
    if (customMeta) {
      metaData = { ...metaData, ...customMeta };
    }
    
    return metaData;
  };

  const updateMetaTags = (metaData) => {
    // Update document title
    document.title = metaData.title;

    // Update or create meta description
    updateOrCreateMetaTag('name', 'description', metaData.description);
    
    // Update meta keywords
    if (Array.isArray(metaData.keywords)) {
      updateOrCreateMetaTag('name', 'keywords', metaData.keywords.join(', '));
    } else if (metaData.keywords) {
      updateOrCreateMetaTag('name', 'keywords', metaData.keywords);
    }
    
    // Update canonical URL
    updateOrCreateLinkTag('canonical', metaData.canonical);
    
    // Update robots meta tag
    updateOrCreateMetaTag('name', 'robots', metaData.robots);
    
    // Update viewport (ensure proper mobile rendering)
    updateOrCreateMetaTag('name', 'viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
    
    // Update Open Graph tags
    updateOrCreateMetaTag('property', 'og:title', metaData.ogTitle);
    updateOrCreateMetaTag('property', 'og:description', metaData.ogDescription);
    updateOrCreateMetaTag('property', 'og:image', metaData.ogImage);
    updateOrCreateMetaTag('property', 'og:type', metaData.ogType);
    updateOrCreateMetaTag('property', 'og:site_name', 'Asian Clothify');
    updateOrCreateMetaTag('property', 'og:locale', 'en_US');
    
    if (metaData.ogUrl) {
      updateOrCreateMetaTag('property', 'og:url', metaData.ogUrl);
    }
    
    // Update Twitter tags
    updateOrCreateMetaTag('name', 'twitter:card', metaData.twitterCard);
    updateOrCreateMetaTag('name', 'twitter:title', metaData.twitterTitle);
    updateOrCreateMetaTag('name', 'twitter:description', metaData.twitterDescription);
    updateOrCreateMetaTag('name', 'twitter:image', metaData.twitterImage);
    updateOrCreateMetaTag('name', 'twitter:site', '@AsianClothify');
    updateOrCreateMetaTag('name', 'twitter:creator', '@AsianClothify');
    
    // Add additional meta tags for better SEO
    updateOrCreateMetaTag('name', 'author', 'Asian Clothify');
    updateOrCreateMetaTag('name', 'copyright', 'Asian Clothify');
    updateOrCreateMetaTag('name', 'language', 'English');
    updateOrCreateMetaTag('name', 'revisit-after', '7 days');
    updateOrCreateMetaTag('name', 'distribution', 'global');
    updateOrCreateMetaTag('name', 'rating', 'general');
    
    // Add geo tags if applicable
    updateOrCreateMetaTag('name', 'geo.region', 'BD');
    updateOrCreateMetaTag('name', 'geo.placename', 'Dhaka');
    updateOrCreateMetaTag('name', 'geo.position', '23.8103;90.4125');
    updateOrCreateMetaTag('name', 'ICBM', '23.8103, 90.4125');
    
    // Add mobile app links if applicable
    updateOrCreateMetaTag('name', 'apple-mobile-web-app-capable', 'yes');
    updateOrCreateMetaTag('name', 'apple-mobile-web-app-status-bar-style', 'black-translucent');
    updateOrCreateMetaTag('name', 'apple-mobile-web-app-title', 'Asian Clothify');
    updateOrCreateMetaTag('name', 'format-detection', 'telephone=no');
  };

  const updateOrCreateMetaTag = (attribute, name, content) => {
    if (!content) return;
    
    let tag = document.querySelector(`meta[${attribute}="${name}"]`);
    if (tag) {
      tag.setAttribute('content', content);
    } else {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, name);
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    }
  };

  const updateOrCreateLinkTag = (rel, href) => {
    if (!href) return;
    
    let tag = document.querySelector(`link[rel="${rel}"]`);
    if (tag) {
      tag.setAttribute('href', href);
    } else {
      tag = document.createElement('link');
      tag.setAttribute('rel', rel);
      tag.setAttribute('href', href);
      document.head.appendChild(tag);
    }
  };

  const addProductStructuredData = (product) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://asianclothify.com';
    const currentUrl = `${baseUrl}${pathname}`;
    
    // Product structured data (Schema.org)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.productName,
      "description": product.metaSettings?.metaDescription || product.description || product.productName,
      "sku": product._id,
      "mpn": product._id,
      "image": product.images?.map(img => img.url) || [],
      "brand": {
        "@type": "Brand",
        "name": "Asian Clothify"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Asian Clothify",
        "url": baseUrl
      },
      "offers": {
        "@type": "Offer",
        "price": product.pricePerUnit,
        "priceCurrency": "USD",
        "availability": product.isActive ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "url": currentUrl,
        "seller": {
          "@type": "Organization",
          "name": "Asian Clothify"
        }
      },
      "category": product.category?.name || "Clothing",
      "material": product.fabric || "Cotton",
      "color": product.colors?.map(c => c.code) || [],
      "size": product.sizes || [],
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "MOQ",
          "value": product.moq
        },
        {
          "@type": "PropertyValue",
          "name": "Target Audience",
          "value": product.targetedCustomer || "Unisex"
        }
      ]
    };

    // Add aggregate rating if available
    if (product.reviewStats?.averageRating > 0 && product.reviewStats?.totalReviews > 0) {
      structuredData.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": product.reviewStats.averageRating,
        "reviewCount": product.reviewStats.totalReviews,
        "bestRating": "5",
        "worstRating": "1"
      };
    }

    // Add bulk pricing tiers if available
    if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
      structuredData.offers = product.quantityBasedPricing.map(tier => ({
        "@type": "Offer",
        "price": tier.price,
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "valueAddedTaxIncluded": true,
          "eligibleQuantity": {
            "@type": "QuantitativeValue",
            "value": tier.range,
            "unitCode": "C62" // Unit code for pieces
          }
        },
        "availability": product.isActive ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }));
    }

    // Add review snippets if available
    if (product.reviews && product.reviews.length > 0) {
      structuredData.review = product.reviews.slice(0, 3).map(review => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": review.userName || "Anonymous"
        },
        "datePublished": review.createdAt,
        "reviewBody": review.comment
      }));
    }

    // Add or update script tag
    let scriptTag = document.querySelector('#product-structured-data');
    if (scriptTag) {
      scriptTag.innerHTML = JSON.stringify(structuredData);
    } else {
      scriptTag = document.createElement('script');
      scriptTag.id = 'product-structured-data';
      scriptTag.type = 'application/ld+json';
      scriptTag.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(scriptTag);
    }
  };

  const addBreadcrumbStructuredData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://asianclothify.com';
    const pathSegments = pathname.split('/').filter(segment => segment);
    
    // Build breadcrumb items
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ];
    
    let currentPath = '';
    let position = 2;
    
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      currentPath += `/${segment}`;
      
      // Format segment name for display
      let name = segment;
      if (segment === 'product') {
        name = 'Products';
      } else if (segment === 'category') {
        name = 'Categories';
      } else if (segment === 'inquiry-cart') {
        name = 'Inquiry Cart';
      } else if (segment === 'profile') {
        name = 'My Profile';
      } else {
        name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
      
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": position,
        "name": name,
        "item": `${baseUrl}${currentPath}`
      });
      
      position++;
    }
    
    // If product exists and we're on product page, add product name as last item
    if (type === 'product' && product && pathSegments.includes('product')) {
      breadcrumbItems[breadcrumbItems.length - 1].name = product.productName;
    }
    
    const breadcrumbStructuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };
    
    let scriptTag = document.querySelector('#breadcrumb-structured-data');
    if (scriptTag) {
      scriptTag.innerHTML = JSON.stringify(breadcrumbStructuredData);
    } else {
      scriptTag = document.createElement('script');
      scriptTag.id = 'breadcrumb-structured-data';
      scriptTag.type = 'application/ld+json';
      scriptTag.innerHTML = JSON.stringify(breadcrumbStructuredData);
      document.head.appendChild(scriptTag);
    }
  };

  // This component doesn't render anything visible
  return null;
}