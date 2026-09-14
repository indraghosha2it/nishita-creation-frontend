// app/login/page.js
import { Suspense } from 'react';
import LoginClient from './LoginClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Login page
function LoginLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#52665a] border-t-transparent rounded-full animate-spin"></div>
      </div>
      <Footer />
    </>
  );
}

// Beauty Bucket Login Page SEO Metadata
export const metadata = {
  title: "Login to Beauty Bucket | Sign In for Premium Beauty Products in Bangladesh",
  description: "Login to your Beauty Bucket account to shop premium skincare, makeup, fragrances, hair care & more. Track orders, save wishlist, get beauty tips, and exclusive beauty deals.",
  keywords: [
    // Login specific
    "login beauty bucket",
    "sign in cosmetics store bd",
    "customer login bangladesh beauty",
    "beauty bucket account access",
    "member login cosmetics",
    
    // Account related
    "my beauty account",
    "cosmetics shopping login",
    "beauty products account bd",
    "premium cosmetics login",
    "beauty bucket member sign in",
    
    // Benefits
    "track beauty orders",
    "save wishlist login beauty",
    "exclusive beauty deals",
    "skincare discount for members",
    "beauty product discount",
    
    // Authentication
    "secure login cosmetics",
    "beauty store authentication",
    "online cosmetics shop login bd",
    "beauty bucket customer portal",
    
    // User intent
    "access my beauty account",
    "login to buy cosmetics online",
    "beauty shopping account bd",
    "cosmetics store sign in",
    
    // Beauty specific
    "skincare account login",
    "makeup store login bd",
    "fragrance account access",
    "hair care store sign in",
    "beauty products login bd",
    "cosmetics account access",
    "skincare routine account",
    "beauty consultation login",
    
    // Local keywords
    "login bd beauty store",
    "premium cosmetics account",
    "beauty store customer login",
    "beauty shopping account bd",
    
    // Beauty enthusiast
    "beauty lover account",
    "skincare enthusiast login",
    "makeup lover account bd",
    "beauty community login",
    "beauty tips account",
    
    // New customer
    "create beauty account",
    "register beauty store bd",
    "new beauty customer",
    "beauty account sign up"
  ],
  openGraph: {
    title: "Login to Beauty Bucket - Your Premium Beauty Account | Bangladesh",
    description: "Sign in to your Beauty Bucket account to shop premium skincare, makeup, fragrances, hair care, body care & more. Quality guarantee & best prices!",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://beautybucket.com.bd/login',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/login-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket Login - Sign in to Your Premium Beauty Account',
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
    title: "Login to Beauty Bucket | Premium Beauty Store Bangladesh",
    description: "Sign in to access your beauty account, track orders, save favorites, get skincare advice, and exclusive member deals!",
    images: ['/login-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/login',
    languages: {
      'en': '/login',
      'bn': '/bn/login',
    },
  },
  robots: {
    index: false,  // Login pages should not be indexed
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata
  other: {
    'application-name': 'Beauty Bucket Login',
    'msapplication-TileColor': '#52665a',
    'theme-color': '#52665a',
    'page-type': 'login',
    'user-action': 'authentication',
    'business-name': 'Beauty Bucket Bangladesh',
    'business-type': 'E-commerce Beauty & Cosmetics Store',
    'secure-login': '256-bit SSL Encrypted',
    'session-timeout': '7 days',
    
    // Beauty specific benefits
    'beauty-consultation': 'Available with Account',
    'personalized-recommendations': 'Based on Skin Type & Preferences',
    'skin-routine-saver': 'Save Your Skincare Routine',
    'wishlist-feature': 'Save Favorite Products',
    'price-alerts': 'Get Notified on Price Drops',
    'exclusive-offers': 'Member-Only Discounts',
    'early-access': 'Early Access to New Products',
    'beauty-tips': 'Exclusive Beauty Tips & Tutorials',
    'order-tracking': 'Real-time Order Tracking',
    
    // Account features
    'saved-skin-type': 'Store Your Skin Type Preferences',
    'saved-allergies': 'Ingredient Allergy Preferences (Optional)',
    'shade-preferences': 'Makeup Shade Preferences (Optional)',
    'fragrance-preferences': 'Fragrance Preferences (Optional)',
    'product-reviews': 'Write & Read Product Reviews',
    'beauty-history': 'View Purchase History',
    'consultation-history': 'View Beauty Consultation History',
    
    // Beauty categories
    'product-categories': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
    'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
    'brands-available': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
    
    // Security
    'two-factor-auth': 'Available for Enhanced Security',
    'password-recovery': 'Secure Password Recovery',
    'data-protection': 'GDPR & CCPA Compliant',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://beautybucket.com.bd/login',
    name: 'Login - Beauty Bucket',
    description: 'Login to your Beauty Bucket account to shop premium beauty products, skincare, makeup, and cosmetics.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://beautybucket.com.bd/login',
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
          name: 'Login',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://beautybucket.com.bd/login'
        }
      ]
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Customer Login System',
      description: 'Login to access your beauty account, track orders, and get personalized recommendations',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern browser'
    }
  };
};

// Server component with Suspense
export default function LoginPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<LoginLoading />}>
        <LoginClient />
      </Suspense>
    </>
  );
}