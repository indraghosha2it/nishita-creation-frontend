// app/register/page.js
import { Suspense } from 'react';
import RegisterClient from './RegisterClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Register page
function RegisterLoading() {
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

// Beauty Bucket Register Page SEO Metadata
export const metadata = {
  title: "Create Account | Join Beauty Bucket - Premium Beauty Store Bangladesh",
  description: "Create your Beauty Bucket account today! Get exclusive beauty deals, track orders, save wishlist, receive personalized skincare advice, and access premium beauty products. Join thousands of satisfied beauty lovers in Bangladesh.",
  keywords: [
    // Registration specific
    "create account beauty bucket",
    "sign up cosmetics store bd",
    "register beauty products bangladesh",
    "beauty bucket account creation",
    "new customer registration beauty",
    
    // Benefits
    "first purchase discount cosmetics",
    "beauty membership benefits",
    "premium beauty club bd",
    "cosmetics loyalty program",
    "exclusive beauty deals members",
    "welcome gift new members",
    
    // Account features
    "track beauty orders online",
    "save favorite cosmetics",
    "beauty wishlist account",
    "fast checkout beauty products",
    "beauty purchase history",
    "skincare routine saver",
    "beauty consultation access",
    
    // User intent
    "join beauty community bd",
    "become beauty member",
    "sign up for beauty deals",
    "create cosmetics account bd",
    "register for beauty shopping",
    
    // Trust signals
    "safe beauty shopping account",
    "secure registration cosmetics",
    "verified beauty store bd",
    "trusted cosmetics store",
    "authentic beauty products guaranteed",
    
    // Beauty specific
    "skincare account registration",
    "makeup store sign up bd",
    "fragrance account create",
    "hair care store register",
    "beauty products sign up bd",
    "cosmetics account creation",
    "skincare routine account",
    "beauty tips subscription",
    
    // Local keywords
    "premium beauty account bd",
    "cosmetics store registration",
    "beauty shopping account",
    "beauty store member sign up",
    
    // Beauty enthusiast
    "beauty lover account bd",
    "skincare enthusiast sign up",
    "makeup lover account create",
    "beauty community member",
    "beauty expert tips account",
    
    // Additional benefits
    "personalized beauty recommendations",
    "skin type based suggestions",
    "beauty product alerts",
    "new collection notifications",
    "beauty event invitations"
  ],
  openGraph: {
    title: "Join Beauty Bucket - Create Your Premium Beauty Account | Bangladesh",
    description: "Sign up for Beauty Bucket and get exclusive beauty deals! Shop premium skincare, makeup, fragrances, hair care, body care & more. Quality guarantee & best prices.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/register' || 'https://beautybucket.com.bd/register',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/register-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket Register - Join Thousands of Beauty Lovers',
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
    title: "Join Beauty Bucket - Create Your Account | Premium Beauty Store Bangladesh",
    description: "Get exclusive beauty deals! Track orders, save favorites, get skincare advice, and access premium beauty products. Join thousands of satisfied beauty lovers today!",
    images: ['/register-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/register',
    languages: {
      'en': '/register',
      'bn': '/bn/register',
    },
  },
  robots: {
    index: false,  // Registration pages should not be indexed
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
    'application-name': 'Beauty Bucket Registration',
    'msapplication-TileColor': '#52665a',
    'theme-color': '#52665a',
    'page-type': 'registration',
    'user-action': 'signup',
    'business-name': 'Beauty Bucket Bangladesh',
    'business-type': 'E-commerce Beauty & Cosmetics Store',
    'secure-registration': '256-bit SSL Encrypted',
    'welcome-offer': 'Exclusive Deals for New Members',
    
    // Beauty specific benefits
    'beauty-consultation': 'Free Consultation for New Members',
    'personalized-recommendations': 'Based on Skin Type & Preferences',
    'skin-routine-saver': 'Save Your Skincare Routine',
    'welcome-gift': 'Special Welcome Gift',
    'birthday-benefits': 'Birthday Discounts & Offers',
    'exclusive-access': 'Early Access to New Collections',
    'beauty-tips': 'Monthly Beauty Tips & Tutorials',
    
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
    
    // Customer commitment
    'authenticity-guarantee': '100% Authentic Beauty Products',
    'quality-assurance': 'Quality Guaranteed',
    'satisfaction-guarantee': 'Money Back Guarantee',
    'return-policy': '7 Days Return Policy',
    'free-delivery': 'Free delivery over 3000 BDT',
    
    // Security
    'two-factor-auth': 'Available for Enhanced Security',
    'password-recovery': 'Secure Password Recovery',
    'data-protection': 'GDPR & CCPA Compliant',
    
    // Beauty education
    'skincare-guides': 'Free Skincare Guides',
    'makeup-tutorials': 'Makeup Tutorials Access',
    'beauty-blog': 'Beauty Blog Access',
    'expert-advice': 'Expert Beauty Advice',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/register' || 'https://beautybucket.com.bd/register',
    name: 'Register - Beauty Bucket',
    description: 'Create your Beauty Bucket account to shop premium beauty products, skincare, makeup, and cosmetics.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/register' || 'https://beautybucket.com.bd/register',
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
          name: 'Register',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/register' || 'https://beautybucket.com.bd/register'
        }
      ]
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Customer Registration System',
      description: 'Create account to shop premium beauty products, get personalized skincare advice, and join the beauty community',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern browser'
    }
  };
};

// Server component with Suspense
export default function RegisterPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<RegisterLoading />}>
        <RegisterClient />
      </Suspense>
    </>
  );
}