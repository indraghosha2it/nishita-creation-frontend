import { Suspense } from 'react';
import BlogClient from './BlogClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Blog page
function BlogLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#4A8A90]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#4A8A90]/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-[#4A8A90]/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ToyMart Blog Page SEO Metadata
export const metadata = {
  title: "Toy Blog | Parenting Tips, Toy Reviews & Kids Activities",
  description: "Discover fun articles, parenting tips, toy reviews, and kids activities at ToyMart Blog. Expert advice on child development, educational toys, and gift guides for children in Bangladesh.",
  keywords: [
    // Blog general
    "toy blog bangladesh",
    "kids blog bd",
    "parenting blog bangladesh",
    "toymart stories",
    "children blog articles",
    
    // Parenting topics
    "parenting tips bd",
    "child development bangladesh",
    "raising kids blog",
    "parenting advice toys",
    "toddler activities bd",
    
    // Toy related
    "toy reviews bangladesh",
    "best toys for kids",
    "educational toy guide",
    "toy recommendations bd",
    "kids gift ideas",
    
    // Education
    "learning through play",
    "educational activities kids",
    "STEM toys benefits",
    "Montessori methods",
    "early childhood education",
    
    // Gift guides
    "birthday gift ideas kids",
    "toy gift guide bd",
    "holiday toys bangladesh",
    "children present ideas",
    
    // Activities
    "kids activities bangladesh",
    "indoor games for kids",
    "outdoor play ideas",
    "creative activities children",
    
    // Safety
    "toy safety tips",
    "child safety blog",
    "non-toxic toys bd",
    "age appropriate toys",
    
    // Trends
    "toy trends 2024",
    "popular kids toys bd",
    "latest toy releases",
    "kids fashion blog"
  ],
  openGraph: {
    title: "ToyMart Blog - Parenting Tips, Toy Reviews & Kids Fun Activities",
    description: "Explore ToyMart's blog for expert parenting advice, honest toy reviews, fun kids activities, and gift guides. Helping parents make informed choices for their children.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/blog' || 'https://toymart.com.bd/blog',
    siteName: "ToyMart",
    images: [
      {
        url: '/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToyMart Blog - Parenting Tips & Toy Reviews',
      },
    ],
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ToyMartBD',
    creator: '@ToyMartBD',
    title: "ToyMart Blog | Parenting & Kids",
    description: "Discover fun articles, parenting tips, toy reviews, and activities for kids in Bangladesh.",
    images: ['/blog-twitter.jpg'],
  },
  alternates: {
    canonical: '/blog',
    languages: {
      'en': '/blog',
      'bn': '/bn/blog',
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
  // Blog page specific metadata
  other: {
    'application-name': 'ToyMart Blog',
    'msapplication-TileColor': '#FF6B35',
    'theme-color': '#FF6B35',
    'page-type': 'blog-index',
    'blog-categories': 'parenting,toys,education,gifts,activities,development',
    'content-language': 'en',
  },
};

// Server component with Suspense
export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogClient />
    </Suspense>
  );
}