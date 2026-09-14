


// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import dynamic from 'next/dynamic'; 

import ScrollToTop from "./components/layout/ScrollToTop";
import PromotionalModalWrapper from "./components/PromotionalModalWrapper";
import NewsletterPopup from "./components/NewsletterPopup";
import UnifiedPopupManager from "./components/UnifiedPopupManager";
import PixelTracker from "./components/PixelTracker";
import CustomCodeInjector from "./components/CustomCodeInjector";

import ChatWrapper from "./components/ChatWrapper"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================
// BEAUTY BUCKET - Premium Beauty & Cosmetics E-commerce (Bangladesh)
// Complete SEO Optimization for Beauty Market
// ============================================

export const metadata = {
  // Base metadata
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'),
  title: {
    default: "Beauty Bucket | Premium Beauty & Cosmetics Store in Bangladesh - Skincare, Makeup, Fragrances & More",
    template: "%s | Beauty Bucket Bangladesh"
  },
  description: "Beauty Bucket - Bangladesh's trusted premium beauty store. Shop authentic skincare, makeup, fragrances, hair care, body care & beauty accessories. ✓COD ✓bKash/Nagad ✓100% Authentic ✓Best Prices",
  
  // Keywords optimized for Bangladesh beauty market
  keywords: [
    // Primary keywords
    "online beauty store bangladesh",
    "beauty bucket bd",
    "cosmetics shop dhaka",
    "best beauty products bangladesh",
    
    // Skincare
    "skincare products bangladesh",
    "best skincare routine bd",
    "face cream price bangladesh",
    "serum price bd",
    "vitamin c serum bangladesh",
    "hyaluronic acid serum bd",
    "sunscreen price bangladesh",
    "moisturizer price bd",
    "face wash price bangladesh",
    "toner price bd",
    "eye cream bangladesh",
    "retinol serum bd",
    "niacinamide serum price bangladesh",
    "face mask price bd",
    "sheet mask bangladesh",
    
    // Makeup
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
    
    // Hair Care
    "hair care products bangladesh",
    "shampoo price bd",
    "conditioner price bangladesh",
    "hair serum bd",
    "hair oil price bangladesh",
    "hair mask bd",
    "hair spray price bangladesh",
    "dry shampoo bangladesh",
    "hair growth serum bd",
    
    // Fragrances
    "perfume price in bangladesh",
    "women perfume bd",
    "men perfume price bangladesh",
    "attar price bd",
    "fragrance oil bangladesh",
    "body mist price bd",
    "deodorant price bangladesh",
    "luxury perfume bd",
    
    // Body Care
    "body lotion price bangladesh",
    "body scrub bd",
    "body wash price bangladesh",
    "body butter bangladesh",
    "hand cream price bd",
    "foot cream bangladesh",
    
    // Natural & Organic
    "natural skincare bangladesh",
    "organic beauty products bd",
    "herbal cosmetics price bangladesh",
    "vegan beauty bd",
    "cruelty free makeup bangladesh",
    "clean beauty products bd",
    
    // Beauty Accessories
    "beauty accessories bangladesh",
    "makeup sponge bd",
    "beauty blender price bangladesh",
    "makeup bag bd",
    "mirror price bangladesh",
    "beauty tools bd",
    
    // Shopping intent
    "buy cosmetics online bangladesh",
    "best beauty price in bd",
    "beauty shop dhaka",
    "authentic makeup bangladesh",
    "beauty store near me",
    "cosmetics shop bd",
    
    // Payment & Delivery
    "cod beauty products bangladesh",
    "bkash payment cosmetics",
    "nagad beauty store",
    "free delivery beauty dhaka",
    "warranty cosmetics bangladesh",
    
    // Trending beauty
    "korean skincare bangladesh",
    "k beauty products bd",
    "vegan makeup bangladesh",
    "clean beauty bd",
    "cruelty free beauty products bangladesh",
    "sustainable beauty bd",
    "glow skincare bangladesh"
  ],
  
  authors: [{ name: "Beauty Bucket", url: "https://beautybucket.com.bd" }],
  creator: "Beauty Bucket",
  publisher: "Beauty Bucket Bangladesh",
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'bn-BD': '/bn',
    },
  },
  
  // Open Graph for social sharing (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "Beauty Bucket - Bangladesh's Premium Beauty Store | Skincare, Makeup, Fragrances",
    description: "✓COD Available ✓bKash/Nagad ✓100% Authentic ✓Best Prices. Shop premium skincare, makeup, fragrances, hair care & beauty accessories at Beauty Bucket Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/og-image-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket - Premium Beauty Store in Bangladesh | Shop Cosmetics Online',
      },
    ],
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
    type: 'website',
    emails: ['support@beautybucket.com'],
    phoneNumbers: ['+880123456789'],
    countryName: 'Bangladesh',
  },
  
  // Twitter Card optimization
  twitter: {
    card: 'summary_large_image',
    site: '@BeautyBucketBD',
    siteId: 'beautybucket_bangladesh',
    creator: '@BeautyBucketBD',
    creatorId: 'beautybucket',
    title: "Beauty Bucket - Premium Beauty Store Bangladesh | Skincare, Makeup & Cosmetics",
    description: "Bangladesh's trusted premium beauty store. Shop authentic skincare, makeup, fragrances, hair care. COD & bKash/Nagad available. 100% authentic products.",
    images: ['/twitter-card-beautybucket.jpg'],
  },
  
  // Verification (add your actual verification codes)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
    me: 'beautybucket@contact',
  },
  
  // Additional metadata
  category: "Premium Beauty & Cosmetics E-commerce",
  classification: "Online Beauty Store | Cosmetics Bangladesh | Skincare Products",
  
  // App links for mobile
  appleWebApp: {
    title: "Beauty Bucket",
    statusBarStyle: "default",
    capable: true,
  },
  
  // Format detection
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  
  // Theme & Viewport - Beauty Bucket brand colors (Pink theme)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EE4275" },
    { media: "(prefers-color-scheme: dark)", color: "#CC3366" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  
  // Manifest for PWA
  manifest: "/manifest.json",
  
  // Other important SEO tags
  other: {
    'geo.region': 'BD',
    'geo.placename': 'Dhaka',
    'geo.position': '23.8103;90.4125',
    'ICBM': '23.8103, 90.4125',
    'copyright': `Beauty Bucket ${new Date().getFullYear()}`,
    'distribution': 'global',
    'rating': 'General',
    'revisit-after': '1 day',
    'language': 'English, Bengali',
    'audience': 'Beauty Enthusiasts, Skincare Lovers, Makeup Artists, Women in Bangladesh',
    'target_country': 'Bangladesh',
    'price_range': '200-20000 BDT',
    'currency': 'BDT',
    'delivery': 'Cash on Delivery, Free Delivery over 3000 BDT',
    'payment_methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'warranty': '100% Authentic Products Guaranteed',
  },
};

// Structured Data for better SEO (JSON-LD)
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#organization`,
        name: 'Beauty Bucket Bangladesh',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
        logo: 'https://beautybucket.com.bd/logo.png',
        sameAs: [
          'https://facebook.com/beautybucketbd',
          'https://instagram.com/beautybucket.bd',
          'https://twitter.com/BeautyBucketBD',
          'https://pinterest.com/beautybucketbd',
          'https://youtube.com/beautybucketbd',
          'https://tiktok.com/@beautybucketbd',
        ],
        description: 'Premium beauty, skincare, and cosmetics store in Bangladesh.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BD',
          addressLocality: 'Dhaka',
          addressRegion: 'Dhaka',
          postalCode: '1212',
          streetAddress: 'Gulshan Avenue',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+880123456789',
          contactType: 'customer service',
          availableLanguage: ['English', 'Bengali'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '10:00',
            closes: '22:00',
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#website`,
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
        name: 'Beauty Bucket - Premium Beauty E-commerce Bangladesh',
        description: 'Best online beauty store in Bangladesh. Shop premium skincare, makeup, fragrances, hair care & beauty accessories.',
        publisher: { '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: ['en', 'bn'],
      },
      {
        '@type': 'Store',
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#store`,
        name: 'Beauty Bucket Online Store',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
        image: 'https://beautybucket.com.bd/store-image.jpg',
        priceRange: '৳200 - ৳20000',
        currenciesAccepted: 'BDT',
        paymentAccepted: 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
        openingHours: 'Mo-Su 10:00-22:00',
        telephone: '+880123456789',
        email: 'support@beautybucket.com',
        description: 'Premium beauty, skincare, makeup, and cosmetics products.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BD',
          addressLocality: 'Dhaka',
        },
        // Beauty-specific schema
        product: {
          '@type': 'Product',
          name: 'Premium Beauty Products',
          description: 'Authentic skincare, makeup, fragrances, hair care & body care products',
          brand: {
            '@type': 'Brand',
            name: 'Beauty Bucket',
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'BDT',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '200',
              maxPrice: '20000',
              priceCurrency: 'BDT',
            },
          },
        },
      },
      // Add ItemList for beauty categories
      {
        '@type': 'ItemList',
        name: 'Beauty Categories',
        description: 'Browse our wide selection of beauty and cosmetic products',
        numberOfItems: 8,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Skincare',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/skincare`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Makeup',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/makeup`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Fragrances',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/fragrances`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Hair Care',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/hair-care`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Body Care',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/body-care`,
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'Natural Beauty',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/natural-beauty`,
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Beauty Accessories',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/accessories`,
          },
          {
            '@type': 'ListItem',
            position: 8,
            name: 'K-Beauty',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/k-beauty`,
          },
        ],
      },
      // BreadcrumbList for navigation
      {
        '@type': 'BreadcrumbList',
        name: 'Breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Beauty',
            item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/beauty`,
          },
        ],
      },
    ],
  };
};

export default function RootLayout({ children }) {
  // Generate JSON-LD structured data
  const jsonLd = generateJsonLd();
  
  return (
    <html 
      lang="en" 
      data-scroll-behavior="smooth" 
      data-theme="light" 
      suppressHydrationWarning
      style={{ colorScheme: 'light' }}
      dir="ltr"
    >
      <head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="light only" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Beauty Bucket - Bangladesh's premium beauty store. Shop skincare, makeup, fragrances, hair care & beauty accessories. ✓COD ✓bKash/Nagad ✓100% Authentic ✓Best Prices" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Geo Tags for Bangladesh */}
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Dhaka" />
        <meta name="geo.position" content="23.8103;90.4125" />
        <meta name="ICBM" content="23.8103, 90.4125" />
        
        {/* Business Meta Tags */}
        <meta name="business:contact_data:country_name" content="Bangladesh" />
        <meta name="business:contact_data:website" content={process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'} />
        <meta name="business:contact_data:email" content="support@beautybucket.com" />
        
        {/* Beauty E-commerce Meta Tags */}
        <meta name="og:availability" content="in stock" />
        <meta name="product:retailer_item_id" content="global" />
        <meta name="shopping:price_currency" content="BDT" />
        <meta name="shopping:authorized_seller" content="true" />
        <meta name="shopping:return_policy" content="7 days return" />
        <meta name="shopping:authenticity" content="100% authentic products" />
        <meta name="beauty:categories" content="Skincare, Makeup, Fragrances, Hair Care, Body Care" />
        <meta name="beauty:brands" content="Estée Lauder, L'Oréal, MAC, NARS, Clinique, Kiehl's, The Ordinary" />
        
        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color - Beauty Bucket Brand Color (Pink) */}
        <meta name="theme-color" content="#EE4275" />
        <meta name="msapplication-TileColor" content="#EE4275" />
        
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts - Playfair Display + Courgette for Beauty Brand */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700;800;900&family=Courgette&display=swap" rel="stylesheet" /> */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700;800;900&family=Courgette&display=swap&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900" rel="stylesheet" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'} />
        
        {/* Alternate Language Versions */}
        <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/en`} />
        <link rel="alternate" hrefLang="bn" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/bn`} />
        <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'} />
        
        {/* CSS Variables for Beauty Bucket Theme - Pink + Rose + Blush */}
        <style>{`
          :root {
            color-scheme: light only;
            --primary-color: #EE4275;
            --secondary-color: #FF6B9D;
            --accent-color: #FF8FAB;
            --beauty-pink: #EE4275;
            --beauty-rose: #FF6B9D;
            --beauty-blush: #FFD2DB;
            --beauty-dark: #2D1B2E;
            --beauty-light: #FFF5F6;
            --beauty-gold: #FFD700;
            --beauty-gradient: linear-gradient(135deg, #EE4275, #FF6B9D);
          }
        `}</style>
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="h-16"></div>
        {children}

        <PixelTracker />
        <CustomCodeInjector />
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={true}
          duration={4000}
          theme="light"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#333333',
              border: '1px solid #EE4275',
              borderRadius: '12px',
              marginTop: '40px',
            },
          }}
        />
        
        {/* UI Components */}
        <ScrollToTop />
         {/* <ChatWrapper /> */}

        {/* Optional Popup Components - Uncomment when ready */}
        {/* <PromotionalModalWrapper /> */}
        {/* <NewsletterPopup /> */}
        {/* <UnifiedPopupManager /> */}
      </body>
    </html>
  );
}