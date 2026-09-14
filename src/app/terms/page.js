// app/terms/page.js
import { Suspense } from 'react';
import TermsClient from './TermsClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Terms page
function TermsLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f7f4ef] to-[#e2e3dd] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#52665a]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#52665a]/20 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Beauty Bucket Terms & Conditions Page SEO Metadata
export const metadata = {
  title: "Terms & Conditions - Beauty Bucket | Legal Terms for Beauty Products Purchase",
  description: "Read Beauty Bucket's terms and conditions for online beauty and cosmetics purchases in Bangladesh. Learn about pricing, shipping, returns, product authenticity, and legal policies for premium beauty products.",
  keywords: [
    // Legal terms specific
    "terms and conditions beauty bucket",
    "cosmetics store legal terms bd",
    "beauty products purchase terms",
    "beauty bucket policies",
    "online cosmetics store terms bangladesh",
    "legal terms beauty bd",
    
    // Purchase terms
    "beauty purchase agreement",
    "cosmetics products terms bd",
    "beauty bucket return policy",
    "cosmetics warranty terms",
    "refund policy beauty products",
    "consumer cosmetics terms",
    
    // Shipping terms
    "beauty delivery terms",
    "shipping policy cosmetics bd",
    "cod terms beauty products",
    "beauty bucket shipping policy",
    "cosmetics delivery policy bd",
    "express delivery terms beauty",
    
    // Payment terms
    "beauty payment terms",
    "bkash payment policy cosmetics",
    "nagad payment terms beauty",
    "cosmetics pricing policy",
    "emi payment terms bd beauty",
    "credit card payment policy cosmetics",
    
    // Authenticity & Quality
    "beauty product authenticity policy",
    "cosmetics quality guarantee",
    "authenticity guarantee terms bd",
    "quality assurance beauty products",
    "genuine products policy bd",
    "skin care product authenticity",
    
    // Returns & Exchanges
    "beauty return policy bangladesh",
    "cosmetics exchange policy",
    "makeup return terms bd",
    "skincare product return policy",
    "fragrance return policy bd",
    "beauty product exchange terms",
    
    // Warranty & Service
    "cosmetics warranty policy",
    "beauty product guarantee",
    "quality claim terms bd",
    "after sales service policy beauty",
    "beauty support terms",
    "satisfaction guarantee terms",
    
    // Legal compliance
    "cosmetics safety compliance",
    "consumer rights beauty bd",
    "product liability cosmetics",
    "beauty bucket legal information",
    "cosmetics standards bd",
    "beauty product regulations bd",
    
    // Account terms
    "user account terms beauty",
    "customer agreement cosmetics",
    "beauty bucket account policy",
    "beauty buyer agreement",
    
    // Privacy & Security
    "privacy policy beauty products",
    "data protection cosmetics bd",
    "secure transaction terms beauty",
    "customer data policy bd beauty",
    
    // Beauty specific
    "skin care product terms",
    "makeup purchase policy",
    "cosmetics consumer protection",
    "beauty product warranty bd",
    "authentic skincare terms",
    "beauty shopping terms bd",
    
    // Additional
    "consumer protection bd beauty",
    "digital commerce terms cosmetics",
    "online purchase policy bd beauty",
    "beauty buyer protection",
    "cosmetics transaction terms",
    "eco-friendly beauty policy"
  ],
  openGraph: {
    title: "Terms & Conditions - Beauty Bucket | Legal Information for Beauty Products Purchases",
    description: "Review Beauty Bucket's complete terms and conditions. Understand our policies on pricing, shipping, returns, authenticity, privacy, and customer responsibilities for premium beauty products.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/terms' || 'https://beautybucket.com.bd/terms',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/terms-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket Terms & Conditions - Legal Information for Beauty Products',
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
    title: "Terms & Conditions | Beauty Bucket",
    description: "Read Beauty Bucket's terms for online beauty and cosmetics purchases in Bangladesh. Pricing, shipping, returns, authenticity, and privacy policies.",
    images: ['/terms-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/terms',
    languages: {
      'en': '/terms',
      'bn': '/bn/terms',
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
  // Terms page specific metadata
  other: {
    'application-name': 'Beauty Bucket Terms',
    'msapplication-TileColor': '#52665a',
    'theme-color': '#52665a',
    'page-type': 'legal-terms',
    'last-updated': '2024-01-01',
    'jurisdiction': 'Bangladesh',
    'legal-entity': 'Beauty Bucket BD',
    'company-registration': 'Registered in Bangladesh',
    'tax-id': 'TIN: 123456789',
    
    // Policy details
    'return-policy-period': '7 Days',
    'authenticity-guarantee': '100% Authentic Products',
    'refund-policy': 'Within 7-14 business days',
    'replacement-policy': 'Within 7 days of delivery',
    'exchange-policy': 'Subject to terms and conditions',
    
    // Consumer rights
    'consumer-protection': 'Bangladesh Consumer Rights Act',
    'dispute-resolution': 'Mediation and Arbitration',
    'governing-law': 'Laws of Bangladesh',
    
    // Shipping policy
    'shipping-policy': 'Nationwide Delivery',
    'delivery-time': '1-3 business days',
    'free-delivery': 'Orders over 3000 BDT',
    'shipping-charges': 'As per delivery location',
    'cod-charge': 'Free for all orders',
    
    // Payment policy
    'accepted-payments': 'COD, bKash, Nagad, Rocket, Credit Card',
    'payment-security': '256-bit SSL Encrypted',
    'refund-processing': '5-7 business days',
    
    // Authenticity & Quality
    'authenticity-policy': '100% Genuine Beauty Products',
    'quality-guarantee': 'Quality Assured Products',
    'quality-check': 'Pre-shipment Quality Check',
    'brand-authorization': 'Authorized Beauty Retailer',
    'certified-products': 'Dermatologically Tested Products Available',
    
    // Product safety
    'safety-standards': 'ISO, GMP Certified',
    'skin-safety': 'Hypoallergenic Options, Non-Comedogenic Options',
    'ingredient-transparency': 'Full Ingredient Disclosure Available',
    'ethical-standards': 'Cruelty Free Options, Vegan Options',
    'eco-friendly': 'Eco-Friendly Packaging Options',
    
    // Data protection
    'privacy-policy': 'Data Protection Compliant',
    'data-collection': 'Order & Delivery Information Only',
    'data-sharing': 'Not shared with third parties',
    'data-security': 'Encrypted Storage',
    
    // Beauty specific policies
    'shade-matching': 'Color Matching Support Available',
    'skin-consultation': 'Skin Care Consultation Available',
    'product-advice': 'Beauty Expert Advice Available',
    'sample-policy': 'Selected Products Available for Testing',
    
    // Additional
    'business-hours': '10:00 AM - 10:00 PM (Everyday)',
    'customer-support': 'support@beautybucket.com',
    'emergency-contact': '+880123456789',
    'terms-version': 'v2.0',
    'effective-date': 'January 1, 2024',
    'beauty-expert': 'Available for Product Guidance',
    'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
  },
};

// Server component with Suspense
export default function TermsPage() {
  return (
    <Suspense fallback={<TermsLoading />}>
      <TermsClient />
    </Suspense>
  );
}