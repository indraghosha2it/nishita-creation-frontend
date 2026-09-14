// // app/track/page.js
// import { Suspense } from 'react';
// import TrackClient from './TrackClient';

// // Import for loading state
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Loading fallback component for Track page
// function TrackLoading() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 mx-auto bg-[#EE4275]/20 rounded-full animate-pulse mb-4"></div>
//           <div className="h-6 w-48 bg-[#EE4275]/20 rounded mx-auto animate-pulse"></div>
//           <div className="h-4 w-64 bg-[#EE4275]/20 rounded mx-auto mt-3 animate-pulse"></div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// // Beauty Bucket Track Page SEO Metadata
// export const metadata = {
//   title: "Track Your Orders - Beauty Bucket | Beauty Product Delivery Tracking",
//   description: "Track your skincare, makeup, fragrances, hair care and beauty orders easily with your phone number. Check order status, delivery updates, and tracking information for all your purchases from Beauty Bucket Bangladesh.",
//   keywords: [
//     // Primary tracking keywords
//     "track order bangladesh",
//     "beauty product order tracking",
//     "beauty bucket track",
//     "order status check bd",
//     "track my order",
//     "cosmetics delivery tracking",
//     "beauty delivery status",
//     "online order tracking bd",
    
//     // Delivery tracking
//     "track order by phone",
//     "bangladesh cosmetics delivery",
//     "order tracking system",
//     "delivery status bd",
//     "skincare order tracking",
//     "makeup delivery tracking",
//     "fragrance order status",
//     "hair care tracking bd",
//     "beauty accessories delivery",
//     "cosmetics tracking",
    
//     // Customer support
//     "beauty order help",
//     "tracking support bd",
//     "delivery inquiry bangladesh",
//     "order status support",
//     "cosmetics shipping tracking",
//     "product delivery tracking",
//     "order inquiry beauty",
//     "delivery status cosmetics",
    
//     // Local keywords
//     "track order dhaka",
//     "beauty tracking bangladesh",
//     "order status bangladesh",
//     "beauty bucket delivery",
//     "cosmetics order tracking bd",
//     "premium beauty tracking",
//     "cosmetics order tracking dhaka",
//     "beauty shop delivery status",
    
//     // Product specific tracking
//     "skincare order tracking",
//     "makeup delivery status",
//     "fragrance order tracking",
//     "hair care delivery tracking",
//     "body care order status",
//     "beauty accessories delivery tracking",
//     "cosmetics order status",
//     "beauty product delivery tracking",
    
//     // Customer service
//     "beauty customer support",
//     "cosmetics order inquiry",
//     "beauty accessories tracking",
//     "premium cosmetics support",
//     "authentic beauty tracking",
//     "quality guarantee tracking",
    
//     // Beauty specific
//     "beauty order tracking bangladesh",
//     "cosmetics order status bd",
//     "skincare accessories tracking",
//     "beauty devices tracking",
//     "makeup kit delivery",
//     "beauty tools tracking",
//     "fragrance order status",
    
//     // Courier & Logistics
//     "courier status beauty bd",
//     "delivery partner tracking",
//     "shipment tracking bangladesh",
//     "order dispatch status",
//     "out for delivery tracking",
//     "cod order tracking",
//     "online payment order status",
    
//     // Beauty order types
//     "cosmetics gift delivery",
//     "beauty box tracking",
//     "skincare set delivery",
//     "makeup collection tracking",
//     "fragrance gift order",
//     "beauty haul tracking",
//     "cosmetics subscription tracking"
//   ],
//   openGraph: {
//     title: "Track Your Orders - Beauty Bucket | Beauty Product Order Tracking",
//     description: "Enter your phone number to track all your beauty orders. Get real-time updates on delivery status and order progress from Beauty Bucket Bangladesh.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
//     siteName: "Beauty Bucket",
//     images: [
//       {
//         url: '/track-og-beautybucket.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Track Your Orders - Beauty Bucket Bangladesh',
//       },
//     ],
//     type: 'website',
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     site: '@BeautyBucketBD',
//     creator: '@BeautyBucketBD',
//     title: "Track Your Orders | Beauty Bucket",
//     description: "Track all your beauty orders with your phone number. Check delivery status and order updates for skincare, makeup, fragrances, hair care and more.",
//     images: ['/track-twitter-beautybucket.jpg'],
//   },
//   alternates: {
//     canonical: '/track',
//     languages: {
//       'en': '/track',
//       'bn': '/bn/track',
//     },
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-snippet': -1,
//       'max-image-preview': 'large',
//       'max-video-preview': -1,
//     },
//   },
//   // Additional metadata
//   other: {
//     'application-name': 'Beauty Bucket Track',
//     'msapplication-TileColor': '#EE4275',
//     'theme-color': '#EE4275',
//     'page-type': 'order-tracking',
//     'user-action': 'track-orders',
//     'service-type': 'order-tracking',
//     'product-category': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
    
//     // Tracking service info
//     'tracking-method': 'Phone Number',
//     'tracking-status': 'Real-time Updates',
//     'order-history': 'Available',
//     'delivery-updates': 'Live Tracking',
//     'tracking-accuracy': 'High Precision',
    
//     // Support information
//     'customer-support-phone': '+880123456789',
//     'customer-support-email': 'support@beautybucket.com',
//     'support-hours': '10:00 AM - 10:00 PM (Everyday)',
//     'beauty-consultant': 'Available via Support',
//     'live-chat': 'Available',
    
//     // Business info
//     'business-name': 'Beauty Bucket Bangladesh',
//     'business-type': 'E-commerce Beauty & Cosmetics Store',
//     'service-area': 'Nationwide Delivery',
//     'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//     'established': '2024',
    
//     // Delivery info
//     'delivery-time': '1-3 Business Days',
//     'free-delivery': 'Orders over 3000 BDT',
//     'cod-charge': 'Free for all orders',
//     'delivery-partners': 'Multiple Delivery Partners',
//     'same-day-delivery': 'Available in Dhaka',
//     'express-delivery': 'Available',
    
//     // Product guarantees
//     'authenticity-guarantee': '100% Genuine Beauty Products',
//     'quality-check': 'Pre-shipment Quality Check',
//     'quality-guarantee': '100% Authentic Products Guaranteed',
//     'satisfaction-guarantee': 'Money Back Guarantee',
//     'return-policy': '7 Days Return Policy',
    
//     // Beauty product specs
//     'brands-available': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
//     'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
//     'ingredients': 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides, Squalane, Rosehip Oil, Shea Butter, Aloe Vera',
//     'beauty-concerns': 'Acne, Aging, Hyperpigmentation, Dryness, Dullness, Fine Lines, Wrinkles, Dark Spots, Uneven Skin Tone',
//     'ethical-features': 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options',
//     'safety-features': 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available), Paraben Free (Options Available)',
    
//     // Beauty product details
//     'shades-available': 'Fair to Deep Skin Tones',
//     'texture-types': 'Cream, Gel, Serum, Oil, Balm, Powder, Liquid, Stick',
//     'formulation-types': 'Water-based, Oil-based, Silicone-based, Hybrid',
//     'finish-types': 'Matte, Dewy, Satin, Natural, Glow, Shimmer, Metallic',
//     'coverage-levels': 'Sheer, Light, Medium, Full, Buildable',
//     'skin-benefits': 'Hydrating, Brightening, Anti-Aging, Soothing, Calming, Firming, Plumping',
//   },
// };

// // Generate JSON-LD structured data
// export const generateJsonLd = () => {
//   return {
//     '@context': 'https://schema.org',
//     '@type': 'WebPage',
//     '@id': process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
//     name: 'Track Your Orders - Beauty Bucket',
//     description: 'Track your beauty orders easily with your phone number. Check order status, delivery updates, and tracking information for skincare, makeup, fragrances, hair care, and more.',
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
//     inLanguage: 'en',
//     about: {
//       '@type': 'Thing',
//       name: 'Beauty Order Tracking',
//       description: 'Track beauty products, cosmetics, skincare, makeup, and accessories orders'
//     },
//     breadcrumb: {
//       '@type': 'BreadcrumbList',
//       itemListElement: [
//         {
//           '@type': 'ListItem',
//           position: 1,
//           name: 'Home',
//           item: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'
//         },
//         {
//           '@type': 'ListItem',
//           position: 2,
//           name: 'Track Orders',
//           item: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track'
//         }
//       ]
//     },
//     mainEntity: {
//       '@type': 'WebApplication',
//       name: 'Beauty Bucket Order Tracking System',
//       description: 'Track beauty products, cosmetics, skincare, and makeup orders by phone number',
//       applicationCategory: 'BusinessApplication',
//       operatingSystem: 'All',
//       browserRequirements: 'Requires modern browser',
//       offers: {
//         '@type': 'Offer',
//         description: 'Order tracking service for beauty and cosmetics purchases',
//         category: 'E-commerce Tracking',
//         availability: 'https://schema.org/InStock',
//         price: '0',
//         priceCurrency: 'BDT'
//       }
//     }
//   };
// };

// // Server component with Suspense
// export default function TrackPage() {
//   // Generate JSON-LD
//   const jsonLd = generateJsonLd();
  
//   return (
//     <>
//       {/* JSON-LD Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <Suspense fallback={<TrackLoading />}>
//         <TrackClient />
//       </Suspense>
//     </>
//   );
// }


// app/track/page.js
import { Suspense } from 'react';
import TrackClient from './TrackClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Track page
function TrackLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#52665a]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#52665a]/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-[#52665a]/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Beauty Bucket Track Page SEO Metadata
export const metadata = {
  title: "Track Your Orders - Beauty Bucket | Beauty Product Delivery Tracking",
  description: "Track your skincare, makeup, fragrances, hair care and beauty orders easily with your phone number. Check order status, delivery updates, and tracking information for all your purchases from Beauty Bucket Bangladesh.",
  keywords: [
    // Primary tracking keywords
    "track order bangladesh",
    "beauty product order tracking",
    "beauty bucket track",
    "order status check bd",
    "track my order",
    "cosmetics delivery tracking",
    "beauty delivery status",
    "online order tracking bd",
    
    // Delivery tracking
    "track order by phone",
    "bangladesh cosmetics delivery",
    "order tracking system",
    "delivery status bd",
    "skincare order tracking",
    "makeup delivery tracking",
    "fragrance order status",
    "hair care tracking bd",
    "beauty accessories delivery",
    "cosmetics tracking",
    
    // Customer support
    "beauty order help",
    "tracking support bd",
    "delivery inquiry bangladesh",
    "order status support",
    "cosmetics shipping tracking",
    "product delivery tracking",
    "order inquiry beauty",
    "delivery status cosmetics",
    
    // Local keywords
    "track order dhaka",
    "beauty tracking bangladesh",
    "order status bangladesh",
    "beauty bucket delivery",
    "cosmetics order tracking bd",
    "premium beauty tracking",
    "cosmetics order tracking dhaka",
    "beauty shop delivery status",
    
    // Product specific tracking
    "skincare order tracking",
    "makeup delivery status",
    "fragrance order tracking",
    "hair care delivery tracking",
    "body care order status",
    "beauty accessories delivery tracking",
    "cosmetics order status",
    "beauty product delivery tracking",
    
    // Customer service
    "beauty customer support",
    "cosmetics order inquiry",
    "beauty accessories tracking",
    "premium cosmetics support",
    "authentic beauty tracking",
    "quality guarantee tracking",
    
    // Beauty specific
    "beauty order tracking bangladesh",
    "cosmetics order status bd",
    "skincare accessories tracking",
    "beauty devices tracking",
    "makeup kit delivery",
    "beauty tools tracking",
    "fragrance order status",
    
    // Courier & Logistics
    "courier status beauty bd",
    "delivery partner tracking",
    "shipment tracking bangladesh",
    "order dispatch status",
    "out for delivery tracking",
    "cod order tracking",
    "online payment order status",
    
    // Beauty order types
    "cosmetics gift delivery",
    "beauty box tracking",
    "skincare set delivery",
    "makeup collection tracking",
    "fragrance gift order",
    "beauty haul tracking",
    "cosmetics subscription tracking"
  ],
  openGraph: {
    title: "Track Your Orders - Beauty Bucket | Beauty Product Order Tracking",
    description: "Enter your phone number to track all your beauty orders. Get real-time updates on delivery status and order progress from Beauty Bucket Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/track-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Track Your Orders - Beauty Bucket Bangladesh',
      },
    ],
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BeautyBucketBD',
    creator: '@BeautyBucketBD',
    title: "Track Your Orders | Beauty Bucket",
    description: "Track all your beauty orders with your phone number. Check delivery status and order updates for skincare, makeup, fragrances, hair care and more.",
    images: ['/track-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/track',
    languages: {
      'en': '/track',
      'bn': '/bn/track',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata
  other: {
    'application-name': 'Beauty Bucket Track',
    'msapplication-TileColor': '#52665a',
    'theme-color': '#52665a',
    'page-type': 'order-tracking',
    'user-action': 'track-orders',
    'service-type': 'order-tracking',
    'product-category': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
    
    // Tracking service info
    'tracking-method': 'Phone Number',
    'tracking-status': 'Real-time Updates',
    'order-history': 'Available',
    'delivery-updates': 'Live Tracking',
    'tracking-accuracy': 'High Precision',
    
    // Support information
    'customer-support-phone': '+880123456789',
    'customer-support-email': 'support@beautybucket.com',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    'beauty-consultant': 'Available via Support',
    'live-chat': 'Available',
    
    // Business info
    'business-name': 'Beauty Bucket Bangladesh',
    'business-type': 'E-commerce Beauty & Cosmetics Store',
    'service-area': 'Nationwide Delivery',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'established': '2024',
    
    // Delivery info
    'delivery-time': '1-3 Business Days',
    'free-delivery': 'Orders over 3000 BDT',
    'cod-charge': 'Free for all orders',
    'delivery-partners': 'Multiple Delivery Partners',
    'same-day-delivery': 'Available in Dhaka',
    'express-delivery': 'Available',
    
    // Product guarantees
    'authenticity-guarantee': '100% Genuine Beauty Products',
    'quality-check': 'Pre-shipment Quality Check',
    'quality-guarantee': '100% Authentic Products Guaranteed',
    'satisfaction-guarantee': 'Money Back Guarantee',
    'return-policy': '7 Days Return Policy',
    
    // Beauty product specs
    'brands-available': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
    'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
    'ingredients': 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides, Squalane, Rosehip Oil, Shea Butter, Aloe Vera',
    'beauty-concerns': 'Acne, Aging, Hyperpigmentation, Dryness, Dullness, Fine Lines, Wrinkles, Dark Spots, Uneven Skin Tone',
    'ethical-features': 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options',
    'safety-features': 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available), Paraben Free (Options Available)',
    
    // Beauty product details
    'shades-available': 'Fair to Deep Skin Tones',
    'texture-types': 'Cream, Gel, Serum, Oil, Balm, Powder, Liquid, Stick',
    'formulation-types': 'Water-based, Oil-based, Silicone-based, Hybrid',
    'finish-types': 'Matte, Dewy, Satin, Natural, Glow, Shimmer, Metallic',
    'coverage-levels': 'Sheer, Light, Medium, Full, Buildable',
    'skin-benefits': 'Hydrating, Brightening, Anti-Aging, Soothing, Calming, Firming, Plumping',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
    name: 'Track Your Orders - Beauty Bucket',
    description: 'Track your beauty orders easily with your phone number. Check order status, delivery updates, and tracking information for skincare, makeup, fragrances, hair care, and more.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: 'Beauty Order Tracking',
      description: 'Track beauty products, cosmetics, skincare, makeup, and accessories orders'
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Track Orders',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track'
        }
      ]
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Beauty Bucket Order Tracking System',
      description: 'Track beauty products, cosmetics, skincare, and makeup orders by phone number',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern browser',
      offers: {
        '@type': 'Offer',
        description: 'Order tracking service for beauty and cosmetics purchases',
        category: 'E-commerce Tracking',
        availability: 'https://schema.org/InStock',
        price: '0',
        priceCurrency: 'BDT'
      }
    }
  };
};

// Server component with Suspense
export default function TrackPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<TrackLoading />}>
        <TrackClient />
      </Suspense>
    </>
  );
}