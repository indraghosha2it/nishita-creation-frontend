import { Suspense } from 'react';
import CheckoutClient from './CheckoutClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Checkout page
function CheckoutLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F0F7FF] pt-20 sm:pt-24">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Smart Gadget Checkout Page SEO Metadata
export const metadata = {
  title: "Secure Checkout | Complete Your Gadget Order - Smart Gadget Bangladesh",
  description: "Secure checkout for your premium gadgets at Smart Gadget Bangladesh. ✓ Cash on Delivery ✓ bKash/Nagad ✓ Credit Card ✓ Official Warranty ✓ Free delivery on orders over 3000 BDT. Complete your purchase safely.",
  keywords: [
    // Checkout specific
    "secure checkout bangladesh",
    "gadget checkout page",
    "complete order electronics bd",
    "smart gadget checkout",
    "payment checkout gadgets",
    "secure online payment bd",
    
    // Payment methods
    "cash on delivery checkout",
    "bkash payment online bd",
    "nagad payment gateway",
    "credit card payment gadgets",
    "online payment bd",
    "mobile payment bd",
    "digital payment electronics",
    "emi payment gadgets bd",
    
    // Customer info
    "shipping address bd",
    "delivery information gadgets",
    "billing details electronics",
    "order confirmation bd",
    "buyer information bd",
    
    // Order summary
    "review order before payment",
    "gadget cart checkout",
    "finalize purchase electronics",
    "place order gadgets bd",
    "tech product checkout",
    
    // Security
    "secure payment bd",
    "safe online shopping electronics",
    "encrypted checkout",
    "ssl commerce payment",
    "secure transaction bd",
    "protected checkout bd",
    "payment security bd",
    
    // Delivery
    "free delivery on gadgets",
    "home delivery bd",
    "gadget shipping charges",
    "delivery inside dhaka",
    "delivery outside dhaka",
    "express delivery gadgets",
    "same day delivery dhaka",
    
    // Coupon & discount
    "gadget coupon code",
    "discount on electronics bd",
    "promo code gadgets",
    "offer on tech purchase",
    "festival offer bd",
    
    // Trust signals
    "7 day return policy",
    "secure gadget shopping",
    "verified checkout",
    "official warranty",
    "authentic products bd",
    "trusted electronics store",
    
    // Additional
    "gadget purchase bd",
    "electronics checkout process",
    "order tracking bd",
    "invoice generation bd",
    "payment confirmation",
    "order receipt bd"
  ],
  openGraph: {
    title: "Secure Checkout - Smart Gadget | Complete Your Premium Gadget Order",
    description: "Safe and secure checkout for your gadget purchase. Pay with Cash on Delivery, bKash, Nagad, or Credit Card. Free delivery on orders over 3000 BDT. Official warranty included.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/checkout' || 'https://smartgadget.com.bd/checkout',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/checkout-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Gadget Secure Checkout - Complete Your Premium Gadget Order',
      },
    ],
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SmartGadgetBD',
    creator: '@SmartGadgetBD',
    title: "Secure Checkout | Smart Gadget Bangladesh",
    description: "Complete your premium gadget purchase securely. COD, bKash, Nagad, and Credit Card accepted. Free delivery over 3000 BDT. Official warranty.",
    images: ['/checkout-twitter-smartgadget.jpg'],
  },
  alternates: {
    canonical: '/checkout',
    languages: {
      'en': '/checkout',
      'bn': '/bn/checkout',
    },
  },
  robots: {
    index: false,  // Checkout pages should not be indexed by search engines
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata for better SEO
  other: {
    'application-name': 'Smart Gadget Checkout',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'page-type': 'checkout',
    'user-action': 'complete-purchase',
    'payment-methods': 'cod,bkash,nagad,credit-card',
    'secure-checkout': 'true',
    'return-policy': '7 Days Return Policy',
    'warranty': 'Official Brand Warranty Available',
    'delivery-estimate': '1-3 business days',
    'free-delivery-threshold': '3000 BDT',
    
    // Payment security
    'ssl-secured': 'true',
    'encryption': '256-bit SSL Encryption',
    'payment-processor': 'SSL Commerz',
    
    // Additional checkout info
    'order-tracking': 'Available',
    'invoice-format': 'Digital Invoice',
    'payment-confirmation': 'Instant Confirmation',
    'customer-support': '24/7 Support Available',
    
    // Order types
    'accepted-orders': 'Individual, Corporate, Bulk',
    'gift-option': 'Available',
    'tax-included': 'Yes (VAT Included)',
  },
};

// Server component with Suspense
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutClient />
    </Suspense>
  );
}