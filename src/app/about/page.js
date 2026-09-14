// import { Suspense } from 'react';
// import AboutClient from './AboutClient';

// // Import for loading state
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Loading fallback component for About page
// function AboutLoading() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-[#2D1B2E] via-[#EE4275] to-[#FF6B9D] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 mx-auto bg-white/20 rounded-full animate-pulse mb-4"></div>
//           <div className="h-6 w-48 bg-white/20 rounded mx-auto animate-pulse"></div>
//           <div className="h-4 w-64 bg-white/20 rounded mx-auto mt-3 animate-pulse"></div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// // Beauty Bucket About Us Page SEO Metadata
// export const metadata = {
//   title: "About Beauty Bucket | Bangladesh's Trusted Premium Beauty & Cosmetics Store",
//   description: "Learn about Beauty Bucket - Bangladesh's premier online beauty store. We provide authentic skincare, makeup, fragrances, hair care, body care & beauty accessories with quality guarantee and best prices.",
//   keywords: [
//     // About us specific
//     "about beauty bucket",
//     "premium beauty store bangladesh",
//     "cosmetics company bd",
//     "beauty bucket story",
//     "cosmetics shop dhaka about",
//     "beauty brand bangladesh",
    
//     // Mission & values
//     "beauty company mission",
//     "cosmetics store values",
//     "authentic beauty products bangladesh",
//     "quality cosmetics bd",
//     "quality guarantee beauty products",
    
//     // Trust signals
//     "why choose beauty bucket",
//     "trusted beauty store bd",
//     "verified cosmetics bd",
//     "genuine beauty products bangladesh",
//     "premium cosmetics store bd",
//     "authentic makeup store bd",
    
//     // Team & milestones
//     "beauty bucket team",
//     "cosmetics company journey bd",
//     "beauty industry bangladesh",
//     "skincare company bangladesh",
    
//     // Company info
//     "online beauty store about",
//     "cosmetics retailer bangladesh",
//     "premium beauty store dhaka",
//     "authorized beauty seller bd",
//     "authentic cosmetics bangladesh",
    
//     // Social proof
//     "happy customers beauty bd",
//     "beauty enthusiasts bangladesh",
//     "beauty bucket reviews",
//     "customer trust cosmetics bd",
//     "satisfied buyers bd",
//     "recommended beauty store bd",
//     "trusted makeup store bd",
    
//     // Beauty categories
//     "skincare products bd",
//     "makeup products bangladesh",
//     "fragrances store bd",
//     "hair care products bangladesh",
//     "body care cosmetics bd",
//     "k beauty products bangladesh",
//     "natural skincare bd",
    
//     // Additional keywords
//     "best beauty price bd",
//     "authentic cosmetics warranty bd",
//     "certified beauty seller bangladesh",
//     "trusted cosmetics provider dhaka",
//     "quality assurance beauty bd",
//     "beauty consultation service bd",
//     "skincare expert bd",
//     "makeup artist recommended bd"
//   ],
//   openGraph: {
//     title: "About Beauty Bucket - Our Story | Premium Beauty & Cosmetics Store Bangladesh",
//     description: "Discover the Beauty Bucket story. We're on a mission to provide authentic premium beauty products at the best prices across Bangladesh. Quality guarantee, expert consultation, and exceptional service.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/about' || 'https://beautybucket.com.bd/about',
//     siteName: "Beauty Bucket",
//     images: [
//       {
//         url: '/about-og-beautybucket.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'About Beauty Bucket - Bangladesh\'s Premium Beauty & Cosmetics Store',
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
//     title: "About Beauty Bucket | Premium Beauty Store Bangladesh",
//     description: "Learn about our mission to provide authentic premium beauty products with quality guarantee. Join thousands of satisfied beauty lovers!",
//     images: ['/about-twitter-beautybucket.jpg'],
//   },
//   alternates: {
//     canonical: '/about',
//     languages: {
//       'en': '/about',
//       'bn': '/bn/about',
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
//     'application-name': 'Beauty Bucket About',
//     'msapplication-TileColor': '#EE4275',
//     'theme-color': '#EE4275',
//     'page-type': 'about-us',
//     'business-type': 'ecommerce-beauty-store',
//     'founded-year': '2020',
//     'headquarters': 'Dhaka, Bangladesh',
//     'service-area': 'Nationwide Delivery',
//     'product-categories': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
//     'brands': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
//     'quality-guarantee': '100% Authentic Beauty Products',
//     'certifications': 'Authorized Beauty Retailer, Quality Assured Store',
//     'employee-count': '30+ Beauty Experts',
//     'customer-count': '5,000+ Satisfied Beauty Lovers',
//     'social-responsibility': 'Promoting Beauty & Wellness in Bangladesh',
//     'contact-email': 'support@beautybucket.com',
//     'contact-phone': '+880123456789',
//     'business-hours': '10:00 AM - 10:00 PM (Everyday)',
//     'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//     'beauty-consultants': 'Available for Expert Advice',
//     'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
//     'ingredients': 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides, Squalane, Rosehip Oil, Shea Butter, Aloe Vera',
//     'ethical-features': 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options',
//     'safety-features': 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available), Paraben Free (Options Available)',
//     'beauty-commitment': 'Empowering beauty and confidence through authentic products',
//   },
// };

// // Server component with Suspense
// export default function AboutPage() {
//   return (
//     <Suspense fallback={<AboutLoading />}>
//       <AboutClient />
//     </Suspense>
//   );
// }


import { Suspense } from 'react';
import AboutClient from './AboutClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for About page
function AboutLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#29362f] via-[#52665a] to-[#71816F] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-white/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-white/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-white/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Beauty Bucket About Us Page SEO Metadata
export const metadata = {
  title: "About Beauty Bucket | Bangladesh's Trusted Premium Beauty & Cosmetics Store",
  description: "Learn about Beauty Bucket - Bangladesh's premier online beauty store. We provide authentic skincare, makeup, fragrances, hair care, body care & beauty accessories with quality guarantee and best prices.",
  keywords: [
    // About us specific
    "about beauty bucket",
    "premium beauty store bangladesh",
    "cosmetics company bd",
    "beauty bucket story",
    "cosmetics shop dhaka about",
    "beauty brand bangladesh",
    
    // Mission & values
    "beauty company mission",
    "cosmetics store values",
    "authentic beauty products bangladesh",
    "quality cosmetics bd",
    "quality guarantee beauty products",
    
    // Trust signals
    "why choose beauty bucket",
    "trusted beauty store bd",
    "verified cosmetics bd",
    "genuine beauty products bangladesh",
    "premium cosmetics store bd",
    "authentic makeup store bd",
    
    // Team & milestones
    "beauty bucket team",
    "cosmetics company journey bd",
    "beauty industry bangladesh",
    "skincare company bangladesh",
    
    // Company info
    "online beauty store about",
    "cosmetics retailer bangladesh",
    "premium beauty store dhaka",
    "authorized beauty seller bd",
    "authentic cosmetics bangladesh",
    
    // Social proof
    "happy customers beauty bd",
    "beauty enthusiasts bangladesh",
    "beauty bucket reviews",
    "customer trust cosmetics bd",
    "satisfied buyers bd",
    "recommended beauty store bd",
    "trusted makeup store bd",
    
    // Beauty categories
    "skincare products bd",
    "makeup products bangladesh",
    "fragrances store bd",
    "hair care products bangladesh",
    "body care cosmetics bd",
    "k beauty products bangladesh",
    "natural skincare bd",
    
    // Additional keywords
    "best beauty price bd",
    "authentic cosmetics warranty bd",
    "certified beauty seller bangladesh",
    "trusted cosmetics provider dhaka",
    "quality assurance beauty bd",
    "beauty consultation service bd",
    "skincare expert bd",
    "makeup artist recommended bd"
  ],
  openGraph: {
    title: "About Beauty Bucket - Our Story | Premium Beauty & Cosmetics Store Bangladesh",
    description: "Discover the Beauty Bucket story. We're on a mission to provide authentic premium beauty products at the best prices across Bangladesh. Quality guarantee, expert consultation, and exceptional service.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/about' || 'https://beautybucket.com.bd/about',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/about-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'About Beauty Bucket - Bangladesh\'s Premium Beauty & Cosmetics Store',
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
    title: "About Beauty Bucket | Premium Beauty Store Bangladesh",
    description: "Learn about our mission to provide authentic premium beauty products with quality guarantee. Join thousands of satisfied beauty lovers!",
    images: ['/about-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/about',
    languages: {
      'en': '/about',
      'bn': '/bn/about',
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
    'application-name': 'Beauty Bucket About',
    'msapplication-TileColor': '#52665a',
    'theme-color': '#52665a',
    'page-type': 'about-us',
    'business-type': 'ecommerce-beauty-store',
    'founded-year': '2020',
    'headquarters': 'Dhaka, Bangladesh',
    'service-area': 'Nationwide Delivery',
    'product-categories': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
    'brands': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
    'quality-guarantee': '100% Authentic Beauty Products',
    'certifications': 'Authorized Beauty Retailer, Quality Assured Store',
    'employee-count': '30+ Beauty Experts',
    'customer-count': '5,000+ Satisfied Beauty Lovers',
    'social-responsibility': 'Promoting Beauty & Wellness in Bangladesh',
    'contact-email': 'support@beautybucket.com',
    'contact-phone': '+880123456789',
    'business-hours': '10:00 AM - 10:00 PM (Everyday)',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'beauty-consultants': 'Available for Expert Advice',
    'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
    'ingredients': 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides, Squalane, Rosehip Oil, Shea Butter, Aloe Vera',
    'ethical-features': 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options',
    'safety-features': 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available), Paraben Free (Options Available)',
    'beauty-commitment': 'Empowering beauty and confidence through authentic products',
  },
};

// Server component with Suspense
export default function AboutPage() {
  return (
    <Suspense fallback={<AboutLoading />}>
      <AboutClient />
    </Suspense>
  );
}