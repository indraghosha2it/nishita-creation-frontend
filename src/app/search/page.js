// // app/search/page.js
// import { Suspense } from 'react';
// import SearchClient from './SearchClient';

// // Import for loading state
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Loading fallback component for Search page
// function SearchLoading() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 mx-auto bg-blue-600/20 rounded-full animate-pulse mb-4"></div>
//           <div className="h-6 w-48 bg-blue-600/20 rounded mx-auto animate-pulse"></div>
//           <div className="h-4 w-64 bg-blue-600/20 rounded mx-auto mt-3 animate-pulse"></div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// // Smart Gadget Search Page SEO Metadata
// export const metadata = {
//   title: "Search Smart Gadgets ",
//   description: "Search for premium smart gadgets, electronics, accessories, and tech products at Smart Gadget Bangladesh. Find the perfect gadget for your needs.",
//   keywords: [
//     "search smart gadgets bangladesh",
//     "find electronics bd",
//     "smart gadget search",
//     "gadget finder",
//     "search electronics bangladesh",
//     "smart watch price in bd",
//     "best smart watch bangladesh",
//     "wireless earbuds price",
//     "bluetooth headphones bangladesh",
//     "smartphone accessories bd",
//     "gadget store bangladesh",
//     "tech accessories bd",
//     "smart home devices bangladesh",
//     "wearable tech bd",
//     "fitness tracker price bangladesh",
//     "smart band bangladesh",
//     "tablet price bd",
//     "power bank bangladesh",
//     "fast charger bd",
//     "usb cable bangladesh",
//     "car charger price bd",
//     "wireless charger bd",
//     "smart gadget price",
//     "original gadgets bangladesh",
//     "premium gadget store",
//     "authorized seller bd",
//     "buy gadgets online bd",
//     "cheapest gadgets bangladesh",
//     "gadget shop near me",
//     "electronics store dhaka",
//     "tech accessories bangladesh",
//     "gadget on sale bd",
//     "discount gadgets bangladesh",
//     "warranty gadgets bd",
//     "cod gadgets bangladesh",
//     "bkash payment electronics",
//     "nagad payment gadgets",
//     "free delivery gadgets",
//     "smart gadget warranty",
//     "1 year warranty gadgets"
//   ],
//   openGraph: {
//     title: "Search Smart Gadgets & Electronics | Smart Gadget Bangladesh",
//     description: "Find premium smart gadgets, electronics, accessories, and tech products. Search and discover the best gadgets at Smart Gadget Bangladesh.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://smartproductbuy.com/search',
//     siteName: "Smart Gadget",
//     images: [
//       {
//         url: '/search-og-smartgadget.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Search Smart Gadgets & Electronics - Smart Gadget Bangladesh',
//       },
//     ],
//     type: 'website',
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     site: '@SmartGadgetBD',
//     creator: '@SmartGadgetBD',
//     title: "Search Smart Gadgets & Electronics | Smart Gadget",
//     description: "Find premium smart gadgets, electronics, and accessories. Search and discover the best tech products at Smart Gadget Bangladesh.",
//     images: ['/search-twitter-smartgadget.jpg'],
//   },
//   alternates: {
//     canonical: '/search',
//     languages: {
//       'en': '/search',
//       'bn': '/bn/search',
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
//   other: {
//     'application-name': 'Smart Gadget Search',
//     'msapplication-TileColor': '#2563EB',
//     'theme-color': '#2563EB',
//     'page-type': 'search-results',
//     'user-action': 'search-products',
//     'service-type': 'product-search',
//     'product-categories': 'Smart Watches, Earbuds, Headphones, Power Banks, Chargers, Cables, Adapters, Accessories, Smart Home Devices, Wearables',
//     'authenticity': '100% Genuine Products',
//     'warranty': '1 Year Official Warranty',
//     'search-capabilities': 'Product Name, Brand, Category, Features, Price Range',
//     'gadget-types': 'Smart Watches, Wireless Earbuds, Bluetooth Headphones, Power Banks, Fast Chargers, Cables, Adapters',
//     'technology': 'Bluetooth 5.0, Fast Charging, Wireless Charging, USB-C, PD 3.0, QC 4.0',
//     'safety-features': 'Overcharge Protection, Short Circuit Protection, Overheat Protection, Surge Protection',
//     'durability': 'Shockproof, Water-Resistant, Durable Design',
//     'certification': 'CE, RoHS, FCC Certified',
//     'search-method': 'Keyword Search',
//     'filter-options': 'Price Range, Brand, Category, Rating',
//     'sort-options': 'Relevance, Price Low to High, Price High to Low, Newest First',
//     'result-count': 'Dynamic',
//     'customer-support': 'support@smartgadget.com',
//     'support-hours': '10:00 AM - 10:00 PM (Everyday)',
//     'return-policy': '7 Days Return Policy',
//     'satisfaction-guarantee': 'Money Back Guarantee',
//   },
// };

// // Generate JSON-LD structured data for Search page
// export const generateJsonLd = () => {
//   return {
//     '@context': 'https://schema.org',
//     '@type': 'WebPage',
//     '@id': process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://smartproductbuy.com/search',
//     name: 'Search Smart Gadgets & Electronics - Smart Gadget',
//     description: 'Search for premium smart gadgets, electronics, accessories, and tech products at Smart Gadget Bangladesh.',
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://smartproductbuy.com/search',
//     inLanguage: 'en',
//     breadcrumb: {
//       '@type': 'BreadcrumbList',
//       itemListElement: [
//         {
//           '@type': 'ListItem',
//           position: 1,
//           name: 'Home',
//           item: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartproductbuy.com'
//         },
//         {
//           '@type': 'ListItem',
//           position: 2,
//           name: 'Search',
//           item: process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://smartproductbuy.com/search'
//         }
//       ]
//     },
//     mainEntity: {
//       '@type': 'SearchResultsPage',
//       name: 'Smart Gadget Search Results',
//       description: 'Search results for smart gadgets, electronics, and accessories',
//       about: {
//         '@type': 'Thing',
//         name: 'Smart Gadget & Electronics Search',
//         description: 'Search for smart gadgets, electronics, and tech accessories'
//       }
//     },
//     potentialAction: {
//       '@type': 'SearchAction',
//       target: {
//         '@type': 'EntryPoint',
//         urlTemplate: process.env.NEXT_PUBLIC_BASE_URL + '/search?q={search_term_string}' || 'https://smartproductbuy.com/search?q={search_term_string}'
//       },
//       'query-input': 'required name=search_term_string'
//     }
//   };
// };

// // Server component with Suspense
// export default function SearchPage() {
//   // Generate JSON-LD
//   const jsonLd = generateJsonLd();
  
//   return (
//     <>
//       {/* JSON-LD Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <Suspense fallback={<SearchLoading />}>
//         <SearchClient />  
//       </Suspense>
//     </>
//   );
// }


// app/search/page.js
import { Suspense } from 'react';
import SearchClient from './SearchClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Search page
function SearchLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#EE4275]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#EE4275]/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-[#EE4275]/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Beauty Bucket Search Page SEO Metadata
export const metadata = {
  title: "Search Beauty Products & Cosmetics | Beauty Bucket Bangladesh",
  description: "Search for premium skincare, makeup, fragrances, hair care, body care, and beauty accessories at Beauty Bucket Bangladesh. Find the perfect beauty product for your needs.",
  keywords: [
    // Primary search keywords
    "search beauty products bangladesh",
    "find cosmetics bd",
    "beauty bucket search",
    "beauty product finder",
    "search cosmetics bangladesh",
    
    // Skincare search
    "skin care products bd",
    "face serum price bangladesh",
    "best moisturizer bangladesh",
    "sunscreen cream price bd",
    "vitamin c serum price",
    "hyaluronic acid serum bd",
    "retinol cream bangladesh",
    "niacinamide serum price bd",
    "face wash bangladesh",
    "toner price bd",
    "eye cream bangladesh",
    "face mask price bd",
    "sheet mask bangladesh",
    "glycolic acid toner bd",
    "salicylic acid serum bangladesh",
    
    // Makeup search
    "makeup products bangladesh",
    "foundation price bd",
    "concealer price bangladesh",
    "lipstick price bd",
    "liquid lipstick bangladesh",
    "mascara price bd",
    "eyeshadow palette bangladesh",
    "kajal price bd",
    "eyeliner price bangladesh",
    "blush price bd",
    "highlighter bangladesh",
    "bronzer price bd",
    "setting spray bangladesh",
    "makeup brushes bd",
    "primer price bangladesh",
    "bb cream bangladesh",
    
    // Fragrance search
    "perfume price in bangladesh",
    "women perfume bd",
    "men perfume price bangladesh",
    "attar price bd",
    "fragrance oil bangladesh",
    "body mist price bd",
    "deodorant price bangladesh",
    "designer perfume bd",
    "oud perfume bangladesh",
    
    // Hair care search
    "hair care products bangladesh",
    "shampoo price bd",
    "conditioner price bangladesh",
    "hair serum bd",
    "hair oil price bangladesh",
    "hair mask bd",
    "hair spray price bangladesh",
    "dry shampoo bangladesh",
    "hair growth serum bd",
    
    // Body care search
    "body lotion price bangladesh",
    "body scrub bd",
    "body wash price bangladesh",
    "body butter bangladesh",
    "hand cream price bd",
    
    // K-Beauty & Trends
    "korean skincare bangladesh",
    "k beauty products bd",
    "korean makeup bangladesh",
    "glass skin routine bd",
    "korean face mask bangladesh",
    "cosrx products bd",
    "innisfree bangladesh",
    "laneige products bd",
    
    // Natural & Organic
    "natural skincare bangladesh",
    "organic beauty products bd",
    "vegan beauty bd",
    "cruelty free makeup bangladesh",
    "clean beauty products bd",
    "herbal cosmetics bangladesh",
    
    // Brands
    "loreal products bangladesh",
    "maybelline cosmetics bd",
    "nyx makeup bangladesh",
    "mac cosmetics bd",
    "estee lauder bangladesh",
    "clinique products bd",
    "the ordinary serums bd",
    "nivea beauty bd",
    "ponds products bangladesh",
    "garnier skincare bd",
    
    // Beauty accessories
    "beauty accessories bangladesh",
    "makeup sponge bd",
    "beauty blender price bangladesh",
    "makeup brushes set bd",
    "vanity mirror bangladesh",
    "makeup bag bd",
    
    // Shopping intent
    "buy cosmetics online bd",
    "best beauty price in dhaka",
    "authentic makeup bangladesh",
    "beauty shop near me",
    "cosmetics store dhaka",
    "premium beauty products bd",
    
    // Payment & Delivery
    "cod beauty products bangladesh",
    "bkash payment cosmetics",
    "nagad beauty store",
    "free delivery beauty dhaka",
    "authentic beauty products bd",
    
    // Skin concerns
    "acne treatment products bd",
    "anti aging cream bangladesh",
    "hyperpigmentation treatment bd",
    "dry skin moisturizer bangladesh",
    "oily skin care products bd",
    "sensitive skin products bangladesh",
    
    // Beauty deals
    "beauty products on sale bd",
    "discount cosmetics bangladesh",
    "beauty deals dhaka",
    "beauty bundle offers bd"
  ],
  openGraph: {
    title: "Search Beauty Products & Cosmetics | Beauty Bucket Bangladesh",
    description: "Find premium skincare, makeup, fragrances, hair care, body care, and beauty accessories. Search and discover the best beauty products at Beauty Bucket Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://beautybucket.com.bd/search',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/search-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Search Beauty Products & Cosmetics - Beauty Bucket Bangladesh',
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
    title: "Search Beauty Products & Cosmetics | Beauty Bucket",
    description: "Find premium skincare, makeup, fragrances, and beauty accessories. Search and discover the best beauty products at Beauty Bucket Bangladesh.",
    images: ['/search-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/search',
    languages: {
      'en': '/search',
      'bn': '/bn/search',
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
  other: {
    'application-name': 'Beauty Bucket Search',
    'msapplication-TileColor': '#EE4275',
    'theme-color': '#EE4275',
    'page-type': 'search-results',
    'user-action': 'search-products',
    'service-type': 'product-search',
    'product-categories': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
    'authenticity': '100% Genuine Beauty Products',
    'quality-guarantee': 'Quality Assured Products',
    'search-capabilities': 'Product Name, Brand, Category, Skin Type, Beauty Concern, Ingredients, Price Range',
    
    // Beauty product types
    'beauty-types': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories',
    'skincare-types': 'Cleansers, Toners, Serums, Moisturizers, Sunscreens, Face Masks, Eye Creams, Exfoliants',
    'makeup-types': 'Foundation, Concealer, Lipstick, Mascara, Eyeshadow, Eyeliner, Blush, Highlighter, Setting Spray',
    'fragrance-types': 'Eau de Parfum, Eau de Toilette, Body Mist, Attar, Perfume Oil',
    'hair-types': 'Shampoo, Conditioner, Hair Masks, Hair Serums, Hair Oils, Hair Sprays',
    
    // Beauty features
    'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
    'ingredients': 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides',
    'beauty-concerns': 'Acne, Aging, Hyperpigmentation, Dryness, Dullness, Fine Lines, Wrinkles, Dark Spots',
    'finish-types': 'Matte, Dewy, Satin, Natural, Glow, Shimmer, Metallic',
    'coverage-levels': 'Sheer, Light, Medium, Full, Buildable',
    
    // Safety & Ethics
    'safety-features': 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available)',
    'ethical-features': 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options',
    'certification': 'ISO, GMP Certified',
    
    // Search & Filter
    'search-method': 'Keyword Search',
    'filter-options': 'Price Range, Brand, Category, Skin Type, Beauty Concern, Ingredients, Rating',
    'sort-options': 'Relevance, Price Low to High, Price High to Low, Newest First, Top Rated',
    'result-count': 'Dynamic',
    
    // Customer support
    'customer-support': 'support@beautybucket.com',
    'beauty-consultant': 'Available for Product Guidance',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    'return-policy': '7 Days Return Policy',
    'satisfaction-guarantee': '100% Satisfaction Guarantee',
    
    // Brands available
    'brands-available': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
  },
};

// Generate JSON-LD structured data for Search page
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://beautybucket.com.bd/search',
    name: 'Search Beauty Products & Cosmetics - Beauty Bucket',
    description: 'Search for premium skincare, makeup, fragrances, hair care, body care, and beauty accessories at Beauty Bucket Bangladesh.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://beautybucket.com.bd/search',
    inLanguage: 'en',
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
          name: 'Search',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/search' || 'https://beautybucket.com.bd/search'
        }
      ]
    },
    mainEntity: {
      '@type': 'SearchResultsPage',
      name: 'Beauty Bucket Search Results',
      description: 'Search results for beauty products, cosmetics, skincare, makeup, and fragrances',
      about: {
        '@type': 'Thing',
        name: 'Beauty & Cosmetics Search',
        description: 'Search for beauty products, skincare, makeup, fragrances, and beauty accessories'
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: process.env.NEXT_PUBLIC_BASE_URL + '/search?q={search_term_string}' || 'https://beautybucket.com.bd/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

// Server component with Suspense
export default function SearchPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<SearchLoading />}>
        <SearchClient />  
      </Suspense>
    </>
  );
}