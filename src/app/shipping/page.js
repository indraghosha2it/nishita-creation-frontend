// app/shipping/page.js
import ShippingDeliveryClient from './ShippingDeliveryClient';

// Metadata for Shipping & Delivery page
export const metadata = {
  title: "Custom Manufacturing & Global Logistics ",
  description: "Explore Jute Craftify's OEM/ODM custom manufacturing services and worldwide shipping solutions. Learn about our production process, shipping methods, incoterms, packaging standards, and global delivery network for premium jute products.",
  keywords: [
    "custom manufacturing",
    "OEM ODM jute products",
    "jute product manufacturing",
    "private label jute bags",
    "custom jute bags",
    "shipping policy",
    "international shipping",
    "logistics and export",
    "incoterms",
    "FOB CIF EXW",
    "sea freight",
    "air freight",
    "jute export from Bangladesh",
    "global shipping network",
    "packaging standards",
    "quality control jute",
    "bulk order shipping",
    "export documentation",
    "letter of credit",
    "jute product delivery"
  ],
  openGraph: {
    title: "Custom Manufacturing & Global Logistics | Jute Craftify",
    description: "End-to-end OEM/ODM manufacturing and worldwide shipping solutions for premium jute products from Bangladesh.",
    url: "https://jutecraftify.com/shipping",
    siteName: "Jute Craftify",
    images: [
      {
        url: "/shipping-og.jpg",
        width: 1200,
        height: 630,
        alt: "Jute Craftify - Custom Manufacturing & Global Shipping"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Manufacturing & Global Logistics | Jute Craftify",
    description: "OEM/ODM custom jute manufacturing and worldwide shipping solutions from Bangladesh.",
    images: ["/shipping-og.jpg"],
    site: "@jutecraftify",
  },
  alternates: {
    canonical: "/shipping"
  },
  robots: {
    index: true,
    follow: true,
  }
};

// Simple server component that renders the client component
export default function ShippingPage() {
  return <ShippingDeliveryClient />;
}