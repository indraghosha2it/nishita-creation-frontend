import { Suspense } from 'react';
import BlogDetailsClient from './BlogDetailsClient';

// Import for loading state
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

// Loading fallback component for Blog Details page
function BlogDetailsLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-[#D4EDEE] border-t-[#4A8A90] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 bg-[#4A8A90] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">Loading fun story... 🎈</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ToyMart Blog Details Page SEO Metadata
// Note: Dynamic metadata is handled client-side by MetadataUpdater component
export const metadata = {
  title: "Blog Post | Kids Stories & Parenting Tips | ToyMart Bangladesh",
  description: "Read engaging articles about kids toys, parenting tips, child development, and fun activities. Expert advice for parents in Bangladesh.",
  keywords: [
    "kids blog bangladesh",
    "parenting articles",
    "toy stories",
    "child development tips",
    "kids activities bd"
  ],
  openGraph: {
    title: "ToyMart Blog - Kids Stories & Parenting Tips",
    description: "Discover engaging articles about toys, parenting, and child development.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/blog/blogDetailsPage' || 'https://toymart.com.bd/blog/blogDetailsPage',
    siteName: "ToyMart",
    images: [
      {
        url: '/blog-details-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Blog Post',
      },
    ],
    type: 'article',
    locale: 'en_BD',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ToyMartBD',
    creator: '@ToyMartBD',
    title: "ToyMart Blog | Kids Stories",
    description: "Read engaging articles for parents and kids.",
    images: ['/blog-details-twitter.jpg'],
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
};

// Server component with Suspense
export default function BlogDetailsPage() {
  return (
    <Suspense fallback={<BlogDetailsLoading />}>
      <BlogDetailsClient />
    </Suspense>
  );
}