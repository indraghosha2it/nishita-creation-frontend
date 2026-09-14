// 'use client';

// import { useEffect } from 'react';

// export default function MetadataUpdater({ product }) {
//   useEffect(() => {
//     if (!product) return;
    
//     const updateMetadata = () => {
//       try {
//         // Get SEO data from product metaSettings or generate fallback for Beauty Bucket
//         const metaTitle = product.metaSettings?.metaTitle || 
//           `${product.productName} - Premium Beauty Product | Beauty Bucket Bangladesh`;
        
//         const metaDescription = product.metaSettings?.metaDescription || 
//           `${product.productName} - Premium quality beauty product from Beauty Bucket Bangladesh. ${product.shortDescription?.substring(0, 150) || ''} ✓100% Authentic ✓Dermatologist Approved ✓Free Delivery on orders above 2000 BDT.`;
        
//         const metaKeywords = product.metaSettings?.metaKeywords || [
//           product.productName,
//           product.category?.name,
//           product.tags,
//           'beauty products',
//           'skincare',
//           'cosmetics',
//           'makeup',
//           'haircare',
//           'fragrance',
//           'beauty bucket',
//           'premium beauty',
//           'authentic beauty products',
//           'dermatologist approved',
//           'cruelty free beauty',
//           'natural skincare',
//           ...(product.tags || [])
//         ].flat().filter(Boolean);
        
//         // Get primary image
//         const primaryImage = product.images?.find(img => img.isPrimary)?.url || 
//                              product.images?.[0]?.url || 
//                              '/beauty-default-og.jpg';
        
//         // Update document title
//         document.title = metaTitle;
        
//         // Helper function to update or create meta tags
//         const updateOrCreateMetaTag = (name, content, isProperty = false) => {
//           if (!content) return;
          
//           let meta;
//           if (isProperty) {
//             meta = document.querySelector(`meta[property="${name}"]`);
//           } else {
//             meta = document.querySelector(`meta[name="${name}"]`);
//           }
          
//           if (meta) {
//             meta.setAttribute('content', content);
//           } else {
//             meta = document.createElement('meta');
//             if (isProperty) {
//               meta.setAttribute('property', name);
//             } else {
//               meta.setAttribute('name', name);
//             }
//             meta.setAttribute('content', content);
//             document.head.appendChild(meta);
//           }
//         };
        
//         // Update basic meta tags
//         updateOrCreateMetaTag('description', metaDescription);
//         updateOrCreateMetaTag('keywords', Array.isArray(metaKeywords) ? metaKeywords.join(', ') : metaKeywords);
        
//         // Open Graph tags
//         updateOrCreateMetaTag('og:title', metaTitle, true);
//         updateOrCreateMetaTag('og:description', metaDescription, true);
//         updateOrCreateMetaTag('og:url', `https://beautybucket.com/productDetails?id=${product._id}`, true);
//         updateOrCreateMetaTag('og:image', primaryImage, true);
//         updateOrCreateMetaTag('og:type', 'product', true);
//         updateOrCreateMetaTag('og:site_name', 'Beauty Bucket', true);
//         updateOrCreateMetaTag('og:availability', product.stockQuantity > 0 ? 'in stock' : 'out of stock', true);
//         updateOrCreateMetaTag('og:price:amount', product.discountPrice || product.regularPrice, true);
//         updateOrCreateMetaTag('og:price:currency', 'BDT', true);
        
//         // Twitter tags
//         updateOrCreateMetaTag('twitter:title', metaTitle);
//         updateOrCreateMetaTag('twitter:description', metaDescription);
//         updateOrCreateMetaTag('twitter:image', primaryImage);
//         updateOrCreateMetaTag('twitter:card', 'summary_large_image');
//         updateOrCreateMetaTag('twitter:site', '@BeautyBucketBD');
        
//         // Canonical link
//         let canonical = document.querySelector('link[rel="canonical"]');
//         const canonicalUrl = `https://beautybucket.com/productDetails?id=${product._id}`;
//         if (canonical) {
//           canonical.setAttribute('href', canonicalUrl);
//         } else {
//           canonical = document.createElement('link');
//           canonical.setAttribute('rel', 'canonical');
//           canonical.setAttribute('href', canonicalUrl);
//           document.head.appendChild(canonical);
//         }
        
//         // Remove existing JSON-LD if any
//         const existingJsonLd = document.querySelector('#product-json-ld');
//         if (existingJsonLd) {
//           existingJsonLd.remove();
//         }
        
//         // Add JSON-LD structured data for better SEO - Beauty Bucket specific
//         const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice 
//           ? product.discountPrice 
//           : product.regularPrice;
        
//         const jsonLd = {
//           "@context": "https://schema.org",
//           "@type": "Product",
//           "name": product.productName,
//           "description": metaDescription,
//           "image": primaryImage,
//           "sku": product.skuCode || product._id,
//           "mpn": product.skuCode || product._id,
//           "brand": {
//             "@type": "Brand",
//             "name": product.brand || "Beauty Bucket",
//             "logo": "https://beautybucket.com/logo.png"
//           },
//           "manufacturer": {
//             "@type": "Organization",
//             "name": "Beauty Bucket",
//             "address": {
//               "@type": "PostalAddress",
//               "addressCountry": "BD",
//               "addressLocality": "Dhaka",
//               "addressRegion": "Dhaka"
//             }
//           },
//           "offers": {
//             "@type": "Offer",
//             "price": currentPrice,
//             "priceCurrency": "BDT",
//             "availability": product.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
//             "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
//             "url": `https://beautybucket.com/productDetails?id=${product._id}`,
//             "shippingDetails": {
//               "@type": "OfferShippingDetails",
//               "shippingDestination": {
//                 "@type": "DefinedRegion",
//                 "addressCountry": "BD"
//               },
//               "deliveryTime": {
//                 "@type": "ShippingDeliveryTime",
//                 "businessDays": {
//                   "@type": "OpeningHoursSpecification",
//                   "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//                   "opens": "09:00",
//                   "closes": "18:00"
//                 }
//               }
//             }
//           },
//           "additionalProperty": [
//             {
//               "@type": "PropertyValue",
//               "name": "Skin Type",
//               "value": product.skinType || "All Skin Types"
//             },
//             {
//               "@type": "PropertyValue",
//               "name": "Category",
//               "value": product.category?.name || product.categoryName || "Beauty Product"
//             },
//             {
//               "@type": "PropertyValue",
//               "name": "Ingredients",
//               "value": product.ingredients || "Natural, Dermatologist Approved Ingredients"
//             },
//             {
//               "@type": "PropertyValue",
//               "name": "Origin",
//               "value": "Imported, Bangladesh"
//             },
//             {
//               "@type": "PropertyValue",
//               "name": "Safety Certified",
//               "value": "Dermatologically Tested, Hypoallergenic"
//             }
//           ]
//         };
        
//         // Add subcategory info if available
//         if (product.subcategoryName) {
//           jsonLd.additionalProperty.push({
//             "@type": "PropertyValue",
//             "name": "Subcategory",
//             "value": product.subcategoryName
//           });
//         }
        
//         // Add benefits if available
//         if (product.benefits) {
//           jsonLd.additionalProperty.push({
//             "@type": "PropertyValue",
//             "name": "Benefits",
//             "value": product.benefits
//           });
//         }
        
//         // Add key ingredients if available
//         if (product.keyIngredients) {
//           jsonLd.additionalProperty.push({
//             "@type": "PropertyValue",
//             "name": "Key Ingredients",
//             "value": product.keyIngredients
//           });
//         }
        
//         // Add volume/weight if available
//         if (product.volume) {
//           jsonLd.additionalProperty.push({
//             "@type": "PropertyValue",
//             "name": "Volume/Weight",
//             "value": product.volume,
//             "unitText": product.volumeUnit || "ml"
//           });
//         }
        
//         // Add colors if available
//         if (product.colors && product.colors.length > 0) {
//           jsonLd.color = product.colors;
//         }
        
//         // Add rating if available
//         if (product.rating && product.rating > 0) {
//           jsonLd.aggregateRating = {
//             "@type": "AggregateRating",
//             "ratingValue": product.rating,
//             "reviewCount": product.reviewCount || 0,
//             "bestRating": "5",
//             "worstRating": "1"
//           };
//         }
        
//         // Add COD availability
//         jsonLd.additionalProperty.push({
//           "@type": "PropertyValue",
//           "name": "Cash on Delivery",
//           "value": product.codAvailable !== false ? "Available" : "Not Available"
//         });
        
//         // Add authenticity
//         jsonLd.additionalProperty.push({
//           "@type": "PropertyValue",
//           "name": "Authenticity",
//           "value": "100% Genuine Product"
//         });
        
//         // Add return policy
//         jsonLd.additionalProperty.push({
//           "@type": "PropertyValue",
//           "name": "Return Policy",
//           "value": "7 Days Return Policy for defective products"
//         });
        
//         // Add cruelty-free status
//         jsonLd.additionalProperty.push({
//           "@type": "PropertyValue",
//           "name": "Cruelty Free",
//           "value": "Yes"
//         });
        
//         // Add dermatologist approved
//         jsonLd.additionalProperty.push({
//           "@type": "PropertyValue",
//           "name": "Dermatologist Approved",
//           "value": "Yes"
//         });
        
//         // Add the JSON-LD script to head
//         const script = document.createElement('script');
//         script.id = 'product-json-ld';
//         script.type = 'application/ld+json';
//         script.textContent = JSON.stringify(jsonLd);
//         document.head.appendChild(script);
        
//         // Add organization JSON-LD if not present
//         const existingOrgJsonLd = document.querySelector('#organization-json-ld');
//         if (!existingOrgJsonLd) {
//           const orgJsonLd = {
//             "@context": "https://schema.org",
//             "@type": "Store",
//             "name": "Beauty Bucket",
//             "url": "https://beautybucket.com",
//             "logo": "https://beautybucket.com/logo.png",
//             "description": "Bangladesh's premier beauty e-commerce website. Shop skincare, makeup, haircare, fragrances, and premium beauty products. 100% authentic, dermatologist approved.",
//             "address": {
//               "@type": "PostalAddress",
//               "addressCountry": "BD",
//               "addressLocality": "Dhaka",
//               "addressRegion": "Dhaka",
//               "postalCode": "1212"
//             },
//             "contactPoint": {
//               "@type": "ContactPoint",
//               "contactType": "Customer Service",
//               "telephone": "+8801234567890",
//               "email": "support@beautybucket.com",
//               "availableLanguage": ["English", "Bengali"]
//             },
//             "sameAs": [
//               "https://www.facebook.com/beautybucketbd",
//               "https://www.instagram.com/beautybucket.bd"
//             ],
//             "priceRange": "৳200 - ৳50000",
//             "currenciesAccepted": "BDT",
//             "paymentAccepted": "Cash on Delivery, bKash, Nagad, Credit Card",
//             "openingHoursSpecification": {
//               "@type": "OpeningHoursSpecification",
//               "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//               "opens": "09:00",
//               "closes": "21:00"
//             }
//           };
          
//           const orgScript = document.createElement('script');
//           orgScript.id = 'organization-json-ld';
//           orgScript.type = 'application/ld+json';
//           orgScript.textContent = JSON.stringify(orgJsonLd);
//           document.head.appendChild(orgScript);
//         }
        
//         console.log('Metadata updated for Beauty Bucket product:', product.productName);
//         console.log('JSON-LD added for product:', product.productName);
        
//       } catch (error) {
//         console.error('Error updating metadata:', error);
//       }
//     };
    
//     updateMetadata();
//   }, [product]);
  
//   return null;
// }


'use client';

import { useEffect } from 'react';

export default function MetadataUpdater({ product }) {
  useEffect(() => {
    if (!product) return;
    
    const updateMetadata = () => {
      try {
        // Get SEO data from product metaSettings or generate fallback for Smart Gadget
        const metaTitle = product.metaSettings?.metaTitle || 
          `${product.productName} - Premium Gadget | Smart Gadget Bangladesh`;
        
        const metaDescription = product.metaSettings?.metaDescription || 
          `${product.productName} - Premium quality gadget from Smart Gadget Bangladesh. ${product.shortDescription?.substring(0, 150) || ''} ✓100% Authentic ✓Brand Warranty ✓Free Delivery on orders above 3000 BDT.`;
        
        const metaKeywords = product.metaSettings?.metaKeywords || [
          product.productName,
          product.category?.name,
          product.tags,
          'gadgets',
          'electronics',
          'smartphones',
          'laptops',
          'smartwatches',
          'headphones',
          'gaming accessories',
          'smart home',
          'smart gadget',
          'premium gadgets',
          'authentic electronics',
          'brand warranty',
          'tech products',
          ...(product.tags || [])
        ].flat().filter(Boolean);
        
        // Get primary image
        const primaryImage = product.images?.find(img => img.isPrimary)?.url || 
                             product.images?.[0]?.url || 
                             '/smartgadget-default-og.jpg';
        
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
        updateOrCreateMetaTag('keywords', Array.isArray(metaKeywords) ? metaKeywords.join(', ') : metaKeywords);
        
        // Open Graph tags
        updateOrCreateMetaTag('og:title', metaTitle, true);
        updateOrCreateMetaTag('og:description', metaDescription, true);
        updateOrCreateMetaTag('og:url', `https://smartgadget.com.bd/product/${product._id}`, true);
        updateOrCreateMetaTag('og:image', primaryImage, true);
        updateOrCreateMetaTag('og:type', 'product', true);
        updateOrCreateMetaTag('og:site_name', 'Smart Gadget', true);
        updateOrCreateMetaTag('og:availability', product.stockQuantity > 0 ? 'in stock' : 'out of stock', true);
        updateOrCreateMetaTag('og:price:amount', product.discountPrice || product.regularPrice, true);
        updateOrCreateMetaTag('og:price:currency', 'BDT', true);
        
        // Twitter tags
        updateOrCreateMetaTag('twitter:title', metaTitle);
        updateOrCreateMetaTag('twitter:description', metaDescription);
        updateOrCreateMetaTag('twitter:image', primaryImage);
        updateOrCreateMetaTag('twitter:card', 'summary_large_image');
        updateOrCreateMetaTag('twitter:site', '@SmartGadgetBD');
        
        // Canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        const canonicalUrl = `https://smartgadget.com.bd/product/${product._id}`;
        if (canonical) {
          canonical.setAttribute('href', canonicalUrl);
        } else {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          canonical.setAttribute('href', canonicalUrl);
          document.head.appendChild(canonical);
        }
        
        // Remove existing JSON-LD if any
        const existingJsonLd = document.querySelector('#product-json-ld');
        if (existingJsonLd) {
          existingJsonLd.remove();
        }
        
        // Add JSON-LD structured data for better SEO - Smart Gadget specific
        const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice 
          ? product.discountPrice 
          : product.regularPrice;
        
        const jsonLd = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.productName,
          "description": metaDescription,
          "image": primaryImage,
          "sku": product.skuCode || product._id,
          "mpn": product.skuCode || product._id,
          "brand": {
            "@type": "Brand",
            "name": product.brand || "Smart Gadget",
            "logo": "https://smartgadget.com.bd/logo.png"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "Smart Gadget",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BD",
              "addressLocality": "Dhaka",
              "addressRegion": "Dhaka"
            }
          },
          "offers": {
            "@type": "Offer",
            "price": currentPrice,
            "priceCurrency": "BDT",
            "availability": product.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            "url": `https://smartgadget.com.bd/product/${product._id}`,
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "BD"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "businessDays": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              }
            }
          },
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "Category",
              "value": product.category?.name || product.categoryName || "Gadget"
            },
            {
              "@type": "PropertyValue",
              "name": "Condition",
              "value": "New, Original"
            },
            {
              "@type": "PropertyValue",
              "name": "Origin",
              "value": "Imported, Bangladesh"
            },
            {
              "@type": "PropertyValue",
              "name": "Warranty",
              "value": "Official Brand Warranty Available"
            }
          ]
        };
        
        // Add subcategory info if available
        if (product.subcategoryName) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Subcategory",
            "value": product.subcategoryName
          });
        }
        
        // Add brand info if available
        if (product.brand) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Brand",
            "value": product.brand
          });
        }
        
        // Add color if available
        if (product.colors && product.colors.length > 0) {
          jsonLd.color = product.colors;
        }
        
        // Add rating if available
        if (product.rating && product.rating > 0) {
          jsonLd.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviewCount || 0,
            "bestRating": "5",
            "worstRating": "1"
          };
        }
        
        // Add COD availability
        jsonLd.additionalProperty.push({
          "@type": "PropertyValue",
          "name": "Cash on Delivery",
          "value": product.codAvailable !== false ? "Available" : "Not Available"
        });
        
        // Add authenticity
        jsonLd.additionalProperty.push({
          "@type": "PropertyValue",
          "name": "Authenticity",
          "value": "100% Genuine Product"
        });
        
        // Add return policy
        jsonLd.additionalProperty.push({
          "@type": "PropertyValue",
          "name": "Return Policy",
          "value": "7 Days Return Policy"
        });
        
        // Add technology features if available
        if (product.technology) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Technology",
            "value": product.technology
          });
        }
        
        // Add connectivity if available
        if (product.connectivity) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Connectivity",
            "value": product.connectivity
          });
        }
        
        // Add the JSON-LD script to head
        const script = document.createElement('script');
        script.id = 'product-json-ld';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLd);
        document.head.appendChild(script);
        
        // Add organization JSON-LD if not present
        const existingOrgJsonLd = document.querySelector('#organization-json-ld');
        if (!existingOrgJsonLd) {
          const orgJsonLd = {
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Smart Gadget",
            "url": "https://smartgadget.com.bd",
            "logo": "https://smartgadget.com.bd/logo.png",
            "description": "Bangladesh's premier gadget and electronics e-commerce website. Shop smartphones, laptops, smartwatches, headphones, gaming accessories, and more. 100% authentic, brand warranty.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BD",
              "addressLocality": "Dhaka",
              "addressRegion": "Dhaka",
              "postalCode": "1212"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "telephone": "+8801234567890",
              "email": "support@smartgadget.com.bd",
              "availableLanguage": ["English", "Bengali"]
            },
            "sameAs": [
              "https://www.facebook.com/smartgadgetbd",
              "https://www.instagram.com/smartgadget.bd",
              "https://twitter.com/SmartGadgetBD"
            ],
            "priceRange": "৳500 - ৳200000",
            "currenciesAccepted": "BDT",
            "paymentAccepted": "Cash on Delivery, bKash, Nagad, Rocket, Credit Card",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "21:00"
            }
          };
          
          const orgScript = document.createElement('script');
          orgScript.id = 'organization-json-ld';
          orgScript.type = 'application/ld+json';
          orgScript.textContent = JSON.stringify(orgJsonLd);
          document.head.appendChild(orgScript);
        }
        
        console.log('Metadata updated for Smart Gadget product:', product.productName);
        console.log('JSON-LD added for product:', product.productName);
        
      } catch (error) {
        console.error('Error updating metadata:', error);
      }
    };
    
    updateMetadata();
  }, [product]);
  
  return null;
}