// // app/contact/page.js
// import { Suspense } from 'react';
// import ContactClient from './ContactClient';

// // Import for loading state
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Loading fallback component for Contact page
// function ContactLoading() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-[#FFF5F6] via-[#EE4275]/20 to-[#2D1B2E]/10 flex items-center justify-center">
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

// // Beauty Bucket Contact Us Page SEO Metadata
// export const metadata = {
//   title: "Contact Us | Get in Touch with Beauty Bucket",
//   description: "Contact Beauty Bucket customer support for questions about skincare, makeup, fragrances, hair care, body care, orders, delivery, or product authenticity. Call, email, or visit us in Dhaka. We're here to help!",
//   keywords: [
//     // Contact specific
//     "contact beauty bucket",
//     "beauty store customer care bd",
//     "cosmetics support bangladesh",
//     "beauty bucket helpline",
//     "customer service cosmetics bd",
    
//     // Contact methods
//     "beauty shop phone number",
//     "beauty bucket email address",
//     "cosmetics store location dhaka",
//     "customer care number beauty bucket",
//     "beauty support bd",
//     "cosmetics store helpline",
    
//     // Support inquiries
//     "skincare order help",
//     "makeup delivery support bangladesh",
//     "fragrance return contact",
//     "product inquiry beauty bucket",
//     "quality guarantee support cosmetics",
//     "beauty accessories help",
//     "hair care product support bd",
    
//     // Business inquiries
//     "beauty business contact",
//     "cosmetics wholesale inquiry",
//     "beauty supplier bangladesh",
//     "partnership beauty bd",
//     "brand collaboration cosmetics",
    
//     // Social media
//     "beauty bucket facebook",
//     "beauty bucket instagram",
//     "cosmetics store social media",
//     "beauty store youtube",
//     "beauty bucket tiktok",
//     "beauty bucket pinterest",
    
//     // Location
//     "cosmetics store dhaka address",
//     "beauty shop gulshan",
//     "beauty bucket office location",
//     "beauty store near me dhaka",
//     "cosmetics showroom dhaka",
    
//     // Beauty specific
//     "beauty consultation bd",
//     "skincare advice bangladesh",
//     "makeup help dhaka",
//     "cosmetics support bd",
//     "beauty expert inquiry",
//     "skin care consultation dhaka",
    
//     // Customer service
//     "beauty product support",
//     "cosmetics helpline bd",
//     "beauty customer care",
//     "beauty bucket assistance",
//     "beauty expert help",
//     "cosmetics support team",
    
//     // Quality & Authenticity
//     "authentic beauty products bd",
//     "cosmetics authenticity check",
//     "genuine makeup warranty bd",
//     "beauty product quality guarantee",
//     "beauty bucket authenticity support",
//     "cosmetics return policy",
//     "beauty product exchange",
    
//     // Product categories
//     "skincare support bangladesh",
//     "makeup service dhaka",
//     "fragrance help bd",
//     "hair care support bangladesh",
//     "body care service",
//     "beauty accessories help",
//     "natural beauty support bd",
//     "k beauty products inquiry",
    
//     // Expert advice
//     "skincare routine advice bd",
//     "makeup tips bangladesh",
//     "fragrance selection help",
//     "beauty consultation dhaka",
//     "skin concern support bd",
//     "beauty expert guidance",
//     "cosmetics recommendation"
//   ],
//   openGraph: {
//     title: "Contact Beauty Bucket - We're Here to Help | Premium Beauty & Cosmetics Store Bangladesh",
//     description: "Need help with your beauty order? Have questions about skincare, makeup, fragrances, or product authenticity? Contact our friendly beauty experts via phone, email, or visit our Dhaka store.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://beautybucket.com.bd/contact',
//     siteName: "Beauty Bucket",
//     images: [
//       {
//         url: '/contact-og-beautybucket.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Contact Beauty Bucket - Customer Support for Premium Beauty Products & Cosmetics',
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
//     title: "Contact Beauty Bucket | Customer Support",
//     description: "Questions about skincare, makeup, fragrances, or orders? Contact our friendly beauty experts. Call, email, or visit us in Dhaka.",
//     images: ['/contact-twitter-beautybucket.jpg'],
//   },
//   alternates: {
//     canonical: '/contact',
//     languages: {
//       'en': '/contact',
//       'bn': '/bn/contact',
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
//   // Contact page specific metadata
//   other: {
//     'application-name': 'Beauty Bucket Contact',
//     'msapplication-TileColor': '#EE4275',
//     'theme-color': '#EE4275',
//     'page-type': 'contact-us',
//     'contact-email': 'support@beautybucket.com',
//     'contact-phone': '+8801234567890',
//     'business-hours': 'Mon-Sat 10AM-10PM, Sun 10AM-6PM',
//     'address-locality': 'Dhaka',
//     'address-country': 'BD',
//     'product-categories': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
//     'authenticity': '100% Authentic Beauty Products',
//     'beauty-consultation': 'Available via Chat & Phone',
//     'customer-care-type': 'Beauty Experts Support',
//     'quality-guarantee': '100% Authentic Products Guaranteed',
//     'service-available': 'Product Support, Authenticity Check, Product Exchange, Beauty Consultation, Skin Care Advice',
//     'brands-available': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
//     'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
//     'ingredients': 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides, Squalane, Rosehip Oil, Shea Butter, Aloe Vera',
//     'beauty-concerns': 'Acne, Aging, Hyperpigmentation, Dryness, Dullness, Fine Lines, Wrinkles, Dark Spots, Uneven Skin Tone',
//     'ethical-features': 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options',
//     'safety-features': 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available), Paraben Free (Options Available)',
//     'return-policy': '7 Days Return Policy',
//     'free-delivery': 'Free delivery over 3000 BDT',
//     'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//     'shades-available': 'Fair to Deep Skin Tones',
//     'texture-types': 'Cream, Gel, Serum, Oil, Balm, Powder, Liquid, Stick',
//     'finish-types': 'Matte, Dewy, Satin, Natural, Glow, Shimmer, Metallic',
//     'coverage-levels': 'Sheer, Light, Medium, Full, Buildable',
//     'skin-benefits': 'Hydrating, Brightening, Anti-Aging, Soothing, Calming, Firming, Plumping',
//   },
// };

// // Generate JSON-LD structured data
// export const generateJsonLd = () => {
//   return {
//     '@context': 'https://schema.org',
//     '@type': 'ContactPage',
//     '@id': process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://beautybucket.com.bd/contact',
//     name: 'Contact Beauty Bucket - Customer Support',
//     description: 'Contact Beauty Bucket customer support for questions about skincare, makeup, fragrances, hair care, body care, orders, delivery, or product authenticity.',
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://beautybucket.com.bd/contact',
//     inLanguage: 'en',
//     about: {
//       '@type': 'Thing',
//       name: 'Beauty & Cosmetics Customer Support',
//       description: 'Support for skincare, makeup, fragrances, hair care, body care, and beauty accessories'
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
//           name: 'Contact Us',
//           item: process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://beautybucket.com.bd/contact'
//         }
//       ]
//     },
//     mainEntity: {
//       '@type': 'Organization',
//       name: 'Beauty Bucket Bangladesh',
//       url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
//       email: 'support@beautybucket.com',
//       telephone: '+8801234567890',
//       address: {
//         '@type': 'PostalAddress',
//         streetAddress: 'Gulshan Avenue',
//         addressLocality: 'Dhaka',
//         addressRegion: 'Dhaka',
//         postalCode: '1212',
//         addressCountry: 'BD'
//       },
//       contactPoint: {
//         '@type': 'ContactPoint',
//         telephone: '+8801234567890',
//         contactType: 'customer service',
//         availableLanguage: ['English', 'Bengali'],
//         hoursAvailable: {
//           '@type': 'OpeningHoursSpecification',
//           dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//           opens: '10:00',
//           closes: '22:00'
//         }
//       },
//       sameAs: [
//         'https://facebook.com/beautybucketbd',
//         'https://instagram.com/beautybucket.bd',
//         'https://twitter.com/BeautyBucketBD',
//         'https://pinterest.com/beautybucketbd',
//         'https://youtube.com/beautybucketbd',
//         'https://tiktok.com/@beautybucketbd'
//       ],
//       openingHours: ['Mo-Sa 10:00-22:00', 'Su 10:00-18:00']
//     }
//   };
// };

// // Server component with Suspense
// export default function ContactPage() {
//   // Generate JSON-LD
//   const jsonLd = generateJsonLd();
  
//   return (
//     <>
//       {/* JSON-LD Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <Suspense fallback={<ContactLoading />}>
//         <ContactClient />
//       </Suspense>
//     </>
//   );
// }


// app/contact/page.js
import { Suspense } from 'react';
import ContactClient from './ContactClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Contact page
function ContactLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f7f4ef] via-[#52665a]/20 to-[#29362f]/10 flex items-center justify-center">
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

// Beauty Bucket Contact Us Page SEO Metadata
export const metadata = {
  title: "Contact Us | Get in Touch with Beauty Bucket",
  description: "Contact Beauty Bucket customer support for questions about skincare, makeup, fragrances, hair care, body care, orders, delivery, or product authenticity. Call, email, or visit us in Dhaka. We're here to help!",
  keywords: [
    // Contact specific
    "contact beauty bucket",
    "beauty store customer care bd",
    "cosmetics support bangladesh",
    "beauty bucket helpline",
    "customer service cosmetics bd",
    
    // Contact methods
    "beauty shop phone number",
    "beauty bucket email address",
    "cosmetics store location dhaka",
    "customer care number beauty bucket",
    "beauty support bd",
    "cosmetics store helpline",
    
    // Support inquiries
    "skincare order help",
    "makeup delivery support bangladesh",
    "fragrance return contact",
    "product inquiry beauty bucket",
    "quality guarantee support cosmetics",
    "beauty accessories help",
    "hair care product support bd",
    
    // Business inquiries
    "beauty business contact",
    "cosmetics wholesale inquiry",
    "beauty supplier bangladesh",
    "partnership beauty bd",
    "brand collaboration cosmetics",
    
    // Social media
    "beauty bucket facebook",
    "beauty bucket instagram",
    "cosmetics store social media",
    "beauty store youtube",
    "beauty bucket tiktok",
    "beauty bucket pinterest",
    
    // Location
    "cosmetics store dhaka address",
    "beauty shop gulshan",
    "beauty bucket office location",
    "beauty store near me dhaka",
    "cosmetics showroom dhaka",
    
    // Beauty specific
    "beauty consultation bd",
    "skincare advice bangladesh",
    "makeup help dhaka",
    "cosmetics support bd",
    "beauty expert inquiry",
    "skin care consultation dhaka",
    
    // Customer service
    "beauty product support",
    "cosmetics helpline bd",
    "beauty customer care",
    "beauty bucket assistance",
    "beauty expert help",
    "cosmetics support team",
    
    // Quality & Authenticity
    "authentic beauty products bd",
    "cosmetics authenticity check",
    "genuine makeup warranty bd",
    "beauty product quality guarantee",
    "beauty bucket authenticity support",
    "cosmetics return policy",
    "beauty product exchange",
    
    // Product categories
    "skincare support bangladesh",
    "makeup service dhaka",
    "fragrance help bd",
    "hair care support bangladesh",
    "body care service",
    "beauty accessories help",
    "natural beauty support bd",
    "k beauty products inquiry",
    
    // Expert advice
    "skincare routine advice bd",
    "makeup tips bangladesh",
    "fragrance selection help",
    "beauty consultation dhaka",
    "skin concern support bd",
    "beauty expert guidance",
    "cosmetics recommendation"
  ],
  openGraph: {
    title: "Contact Beauty Bucket - We're Here to Help | Premium Beauty & Cosmetics Store Bangladesh",
    description: "Need help with your beauty order? Have questions about skincare, makeup, fragrances, or product authenticity? Contact our friendly beauty experts via phone, email, or visit our Dhaka store.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://beautybucket.com.bd/contact',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/contact-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Beauty Bucket - Customer Support for Premium Beauty Products & Cosmetics',
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
    title: "Contact Beauty Bucket | Customer Support",
    description: "Questions about skincare, makeup, fragrances, or orders? Contact our friendly beauty experts. Call, email, or visit us in Dhaka.",
    images: ['/contact-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/contact',
    languages: {
      'en': '/contact',
      'bn': '/bn/contact',
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
  // Contact page specific metadata
  other: {
    'application-name': 'Beauty Bucket Contact',
    'msapplication-TileColor': '#52665a',
    'theme-color': '#52665a',
    'page-type': 'contact-us',
    'contact-email': 'support@beautybucket.com',
    'contact-phone': '+8801234567890',
    'business-hours': 'Mon-Sat 10AM-10PM, Sun 10AM-6PM',
    'address-locality': 'Dhaka',
    'address-country': 'BD',
    'product-categories': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
    'authenticity': '100% Authentic Beauty Products',
    'beauty-consultation': 'Available via Chat & Phone',
    'customer-care-type': 'Beauty Experts Support',
    'quality-guarantee': '100% Authentic Products Guaranteed',
    'service-available': 'Product Support, Authenticity Check, Product Exchange, Beauty Consultation, Skin Care Advice',
    'brands-available': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
    'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
    'ingredients': 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides, Squalane, Rosehip Oil, Shea Butter, Aloe Vera',
    'beauty-concerns': 'Acne, Aging, Hyperpigmentation, Dryness, Dullness, Fine Lines, Wrinkles, Dark Spots, Uneven Skin Tone',
    'ethical-features': 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options',
    'safety-features': 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available), Paraben Free (Options Available)',
    'return-policy': '7 Days Return Policy',
    'free-delivery': 'Free delivery over 3000 BDT',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'shades-available': 'Fair to Deep Skin Tones',
    'texture-types': 'Cream, Gel, Serum, Oil, Balm, Powder, Liquid, Stick',
    'finish-types': 'Matte, Dewy, Satin, Natural, Glow, Shimmer, Metallic',
    'coverage-levels': 'Sheer, Light, Medium, Full, Buildable',
    'skin-benefits': 'Hydrating, Brightening, Anti-Aging, Soothing, Calming, Firming, Plumping',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://beautybucket.com.bd/contact',
    name: 'Contact Beauty Bucket - Customer Support',
    description: 'Contact Beauty Bucket customer support for questions about skincare, makeup, fragrances, hair care, body care, orders, delivery, or product authenticity.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://beautybucket.com.bd/contact',
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: 'Beauty & Cosmetics Customer Support',
      description: 'Support for skincare, makeup, fragrances, hair care, body care, and beauty accessories'
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
          name: 'Contact Us',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://beautybucket.com.bd/contact'
        }
      ]
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'Beauty Bucket Bangladesh',
      url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
      email: 'support@beautybucket.com',
      telephone: '+8801234567890',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Gulshan Avenue',
        addressLocality: 'Dhaka',
        addressRegion: 'Dhaka',
        postalCode: '1212',
        addressCountry: 'BD'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+8801234567890',
        contactType: 'customer service',
        availableLanguage: ['English', 'Bengali'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00',
          closes: '22:00'
        }
      },
      sameAs: [
        'https://facebook.com/beautybucketbd',
        'https://instagram.com/beautybucket.bd',
        'https://twitter.com/BeautyBucketBD',
        'https://pinterest.com/beautybucketbd',
        'https://youtube.com/beautybucketbd',
        'https://tiktok.com/@beautybucketbd'
      ],
      openingHours: ['Mo-Sa 10:00-22:00', 'Su 10:00-18:00']
    }
  };
};

// Server component with Suspense
export default function ContactPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<ContactLoading />}>
        <ContactClient />
      </Suspense>
    </>
  );
}