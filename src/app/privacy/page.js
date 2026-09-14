// app/privacy/page.js
import { Suspense } from 'react';
import PrivacyClient from './PrivacyClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Privacy page
function PrivacyLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f7f4ef] via-[#e2e3dd] to-[#F8F5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#52665a]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#52665a]/20 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Beauty Bucket Privacy Policy Page SEO Metadata
export const metadata = {
  title: "Privacy Policy | Protecting Your Personal & Beauty Information",
  description: "Read Beauty Bucket's privacy policy to understand how we collect, use, and protect your personal information. Learn about data security, cookies, and your privacy rights in Bangladesh.",
  keywords: [
    // Privacy policy specific
    "privacy policy beauty bucket",
    "cosmetics store privacy policy bd",
    "beauty data protection",
    "beauty bucket privacy practices",
    "online beauty store privacy bangladesh",
    
    // Data collection
    "personal information collection cosmetics",
    "customer data protection beauty",
    "skincare purchase privacy",
    "shopping data security beauty",
    "beauty store data collection",
    
    // Security measures
    "ssl encryption beauty",
    "secure payment cosmetics bd",
    "data security beauty store",
    "beauty bucket security policy",
    "encryption standards bd beauty",
    
    // User rights
    "data access rights beauty",
    "delete my data cosmetics",
    "opt out marketing beauty bucket",
    "gdpr compliance beauty bd",
    "ccpa rights bangladesh beauty",
    
    // Cookies & tracking
    "cookie policy beauty",
    "website tracking cosmetics",
    "analytics privacy beauty",
    "user tracking consent bd beauty",
    
    // Beauty specific privacy
    "skin type data privacy",
    "product preferences data beauty",
    "beauty purchase history",
    "cosmetics recommendations privacy",
    "personalized beauty suggestions",
    
    // Product & skin data
    "skin concern data protection",
    "beauty product usage information privacy",
    "beauty consultation data",
    "skincare routine data privacy",
    "beauty product warranty data",
    
    // Legal compliance
    "data protection bangladesh beauty",
    "privacy compliance cosmetics",
    "ccpa rights beauty bd",
    "gdpr rights beauty customers",
    "bangladesh data protection act cosmetics",
    
    // Marketing & communications
    "beauty newsletter privacy",
    "promotional emails privacy beauty",
    "cosmetics offers data usage",
    "marketing consent beauty",
    "email marketing opt out beauty",
    
    // Skincare specific
    "skincare data protection",
    "skin analysis privacy bd",
    "skincare purchase data security",
    "skin type preferences privacy",
    
    // Makeup specific
    "makeup data privacy",
    "cosmetics purchase information",
    "shade preferences privacy",
    "makeup product compatibility privacy",
    
    // Fragrance specific
    "fragrance data privacy",
    "perfume preferences information",
    "scent preferences privacy",
    "fragrance purchase data",
    
    // Hair care specific
    "hair care data privacy",
    "hair type preferences information",
    "hair care purchase privacy",
    "hair product compatibility data",
    
    // Additional
    "beauty bucket data security",
    "cosmetics customer privacy",
    "beauty data protection bd",
    "beauty purchase privacy",
    "online beauty store privacy",
    "clean beauty data privacy",
    "vegan beauty data protection",
    "cruelty free beauty privacy"
  ],
  openGraph: {
    title: "Privacy Policy - Beauty Bucket | Your Beauty Data Protection & Privacy Rights",
    description: "Learn how Beauty Bucket protects your personal information. We're committed to transparent data practices, secure payments, and respecting your privacy rights in Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/privacy' || 'https://beautybucket.com.bd/privacy',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/privacy-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket Privacy Policy - Your Beauty Data Protection',
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
    title: "Privacy Policy | Beauty Bucket",
    description: "How we collect, use, and protect your personal information. Your privacy rights and beauty data security explained.",
    images: ['/privacy-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/privacy',
    languages: {
      'en': '/privacy',
      'bn': '/bn/privacy',
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
  // Privacy page specific metadata
  other: {
    'application-name': 'Beauty Bucket Privacy',
    'msapplication-TileColor': '#52665a',
    'theme-color': '#52665a',
    'page-type': 'privacy-policy',
    'privacy-policy-version': '2.0',
    'last-updated': '2024-01-01',
    'data-controller': 'Beauty Bucket Bangladesh',
    'privacy-contact': 'privacy@beautybucket.com',
    'gdpr-compliant': 'true',
    'ccpa-compliant': 'true',
    'data-retention-period': '2 years',
    'cookie-policy': 'opt-in',
    
    // Beauty specific data collection
    'data-collection-types': 'Name, Email, Phone, Address, Purchase History, Skin Type Preferences, Product Interests, Beauty Concerns',
    'sensitive-data': 'Skin Type, Skin Concerns, Allergies (Optional), Product Compatibility Preferences (Optional)',
    'data-usage': 'Order Processing, Product Recommendations, Beauty Consultation, Marketing (with consent)',
    'third-party-sharing': 'Only with Delivery Partners and Payment Processors',
    
    // Security measures
    'encryption-standard': '256-bit SSL Encryption',
    'payment-security': 'PCI DSS Compliant',
    'data-storage': 'Secure Cloud Storage',
    'access-control': 'Role-Based Access Control',
    
    // User rights
    'rights-access': 'Access Personal Data',
    'rights-correction': 'Correct Inaccurate Data',
    'rights-deletion': 'Request Data Deletion',
    'rights-opt-out': 'Opt-out of Marketing',
    'rights-portability': 'Data Portability',
    
    // Children's privacy
    'children-privacy': 'COPPA Compliant',
    'age-restriction': '13+ with Parental Consent',
    'parental-consent': 'Required for Under 18',
    
    // Cookie policy
    'cookie-types': 'Essential, Analytics, Marketing (optional)',
    'cookie-retention': 'Session and Persistent',
    'third-party-cookies': 'Google Analytics, Social Media',
    
    // Beauty marketing
    'marketing-consent': 'Explicit Opt-in Required',
    'email-marketing': 'Opt-out Available',
    'personalized-recommendations': 'Based on Purchase History and Skin Type',
    'beauty-newsletters': 'Optional Subscription',
    
    // Beauty specific privacy
    'skin-data': 'Skin Type and Skin Concerns (Optional)', 
    'product-preferences': 'Beauty Product Preferences (Optional)',
    'shade-preferences': 'Makeup Shade Preferences (Optional)',
    'fragrance-preferences': 'Fragrance Preferences (Optional)',
    'hair-type-data': 'Hair Type and Concerns (Optional)',
    'product-feedback': 'Product Review and Feedback Data',
    'beauty-consultation': 'Consultation History (Optional)',
    
    // Skincare specific
    'skincare-data': 'Skin Type, Skin Concerns, Current Routine (Optional)',
    'skin-concerns': 'Acne, Aging, Hyperpigmentation, Dryness, Sensitivity (Optional)',
    
    // Makeup specific
    'makeup-data': 'Shade Preferences, Makeup Style Preferences (Optional)',
    'shade-range': 'Fair to Deep Skin Tones',
    
    // Fragrance specific
    'fragrance-data': 'Scent Preferences, Fragrance Categories (Optional)',
    'scent-types': 'Floral, Woody, Oriental, Fresh, Fruity (Optional)',
    
    // Hair care specific
    'hair-data': 'Hair Type, Hair Concerns (Optional)',
    'hair-types': 'Straight, Wavy, Curly, Coily (Optional)',
    
    // Legal compliance
    'compliance-standard': 'Bangladesh Data Protection Act',
    'international-compliance': 'GDPR, CCPA',
    'data-breach-notification': '72 Hours',
    'dispute-resolution': 'Customer Support + Regulatory',
    
    // Product safety
    'product-safety-data': 'Safety Certification Records',
    'quality-control': 'Quality Assurance Data',
    'beauty-safety': 'Product Safety Test Data',
    'dermatological-testing': 'Dermatologically Tested Products',
    
    // Brands & products
    'brands-covered': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
    'product-categories': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
    
    // Ethical privacy
    'ethical-data': 'Cruelty Free Preferences, Vegan Preferences (Optional)',
    'ingredient-preferences': 'Ingredient Preferences, Allergies (Optional)',
    'eco-friendly-preferences': 'Eco-Friendly Packaging Preferences (Optional)',
  },
};

// Generate JSON-LD structured data for Privacy page
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/privacy' || 'https://beautybucket.com.bd/privacy',
    name: 'Privacy Policy - Beauty Bucket',
    description: 'Read Beauty Bucket\'s privacy policy to understand how we collect, use, and protect your personal information.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/privacy' || 'https://beautybucket.com.bd/privacy',
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
          name: 'Privacy Policy',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/privacy' || 'https://beautybucket.com.bd/privacy'
        }
      ]
    },
    mainEntity: {
      '@type': 'PrivacyPolicy',
      name: 'Beauty Bucket Privacy Policy',
      description: 'This privacy policy explains how Beauty Bucket collects, uses, and protects your personal information.',
      datePublished: '2024-01-01',
      dateModified: '2024-01-01',
      jurisdiction: 'Bangladesh',
      appliesTo: {
        '@type': 'Organization',
        name: 'Beauty Bucket Bangladesh',
      },
      privacyPolicy: {
        '@type': 'CreativeWork',
        name: 'Beauty Bucket Privacy Policy',
        text: 'Beauty Bucket is committed to protecting your privacy. We collect personal information to process orders, provide beauty consultation, and improve your shopping experience.',
      },
      dataCollection: {
        '@type': 'DataCollection',
        dataType: ['Personal Information', 'Purchase History', 'Skin Type Preferences', 'Beauty Concerns', 'Product Interests', 'Shade Preferences', 'Fragrance Preferences'],
        method: 'User Provided, Automatic Collection',
        usage: 'Order Processing, Beauty Consultation, Customer Service, Product Recommendations, Marketing (with consent)'
      },
      dataSecurity: {
        '@type': 'DataSecurity',
        description: 'We use 256-bit SSL encryption and PCI DSS compliant payment processing to protect your data.',
      },
      userRights: {
        '@type': 'DigitalDocument',
        name: 'User Rights',
        description: 'You have the right to access, correct, delete, and opt-out of marketing communications.',
      },
      productCategories: {
        '@type': 'ItemList',
        name: 'Product Categories Covered',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Skincare' },
          { '@type': 'ListItem', position: 2, name: 'Makeup' },
          { '@type': 'ListItem', position: 3, name: 'Fragrances' },
          { '@type': 'ListItem', position: 4, name: 'Hair Care' },
          { '@type': 'ListItem', position: 5, name: 'Body Care' },
          { '@type': 'ListItem', position: 6, name: 'Beauty Accessories' },
          { '@type': 'ListItem', position: 7, name: 'Natural Beauty' },
          { '@type': 'ListItem', position: 8, name: 'K-Beauty' },
        ]
      }
    },
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: 'Beauty Bucket Bangladesh',
    }
  };
};

// Server component with Suspense
export default function PrivacyPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<PrivacyLoading />}>
        <PrivacyClient />
      </Suspense>
    </>
  );
}