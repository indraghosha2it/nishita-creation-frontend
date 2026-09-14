// src/components/SEO/ProductStructuredData.js
'use client';

import { useEffect } from 'react';

export default function ProductStructuredData({ product }) {
  useEffect(() => {
    if (!product) return;

    // Generate product schema
    const productSchema = {
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
        "url": process.env.NEXT_PUBLIC_BASE_URL || 'https://asianclothify.com'
      },
      "offers": {
        "@type": "Offer",
        "price": product.pricePerUnit,
        "priceCurrency": "USD",
        "availability": product.isActive ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://asianclothify.com'}/product/${product.slug || product._id}`,
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
      productSchema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": product.reviewStats.averageRating,
        "reviewCount": product.reviewStats.totalReviews,
        "bestRating": "5",
        "worstRating": "1"
      };
    }

    // Add bulk pricing offers if available
    if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
      productSchema.offers = product.quantityBasedPricing.map(tier => ({
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

    // Update or create script tag
    let scriptTag = document.querySelector('#product-structured-data');
    if (scriptTag) {
      scriptTag.innerHTML = JSON.stringify(productSchema);
    } else {
      scriptTag = document.createElement('script');
      scriptTag.id = 'product-structured-data';
      scriptTag.type = 'application/ld+json';
      scriptTag.innerHTML = JSON.stringify(productSchema);
      document.head.appendChild(scriptTag);
    }

    // Generate breadcrumb schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": process.env.NEXT_PUBLIC_BASE_URL || 'https://asianclothify.com'
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://asianclothify.com'}/products`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": product.productName,
          "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://asianclothify.com'}/product/${product.slug || product._id}`
        }
      ]
    };

    let breadcrumbTag = document.querySelector('#breadcrumb-structured-data');
    if (breadcrumbTag) {
      breadcrumbTag.innerHTML = JSON.stringify(breadcrumbSchema);
    } else {
      breadcrumbTag = document.createElement('script');
      breadcrumbTag.id = 'breadcrumb-structured-data';
      breadcrumbTag.type = 'application/ld+json';
      breadcrumbTag.innerHTML = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(breadcrumbTag);
    }
  }, [product]);

  return null;
}