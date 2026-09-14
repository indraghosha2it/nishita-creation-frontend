

// app/reviews/page.jsx
import ReviewsClient from './ReviewsClient';

// Metadata for Reviews page
export const metadata = {
  title: "Reviews - what our customers say ",
  description: "Read authentic reviews from our B2B customers worldwide. See why businesses trust Asian Clothify for wholesale clothing orders. 4.8+ rating from 500+ verified buyers.",
  keywords: [
    "clothing supplier reviews",
    "wholesale clothing reviews",
    "Asian Clothify reviews",
    "B2B clothing reviews",
    "Bangladesh clothing manufacturer reviews",
    "customer testimonials",
    "verified reviews"
  ],
  openGraph: {
    title: "Customer Reviews - what our customers say ",
    description: "See what our customers say about Asian Clothify. Real reviews from verified buyers worldwide. Quality products, fast shipping, excellent service.",
    url: "https://asianclothify.com/reviews",
    siteName: "Asian Clothify",
    images: [
      {
        url: "/reviews-og.jpg",
        width: 1200,
        height: 630,
        alt: "Asian Clothify Customer Reviews - Trusted Wholesale Clothing Supplier"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews | Asian Clothify",
    description: "Read real reviews from our B2B clothing customers. 4.8+ rating from verified buyers worldwide.",
    images: ["/reviews-og.jpg"],
    site: "@asianclothify",
  },
  alternates: {
    canonical: "/reviews"
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-site-verification", // Optional: Add if you have Google Search Console
  }
};

// Simple server component that renders the client component
export default function ReviewsPage() {
  return <ReviewsClient />;
}