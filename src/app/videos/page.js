// app/videos/page.js
import { Suspense } from 'react';
import VideosClient from './VideosClient';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function VideosLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto bg-[#e6e1d8] rounded-full animate-pulse mb-4" />
          <div className="h-5 w-52 bg-[#e6e1d8] rounded mx-auto animate-pulse" />
          <div className="h-3 w-72 bg-[#e6e1d8] rounded mx-auto mt-3 animate-pulse" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export const metadata = {
  title:
    "Videos & Live Sessions | Beauty Bucket - Watch Tutorials, Reviews & Product Showcases",
  description:
    "Explore Beauty Bucket's video library — product tutorials, beauty tips, customer reviews, and upcoming live sessions.",
  keywords: [
    'beauty videos bangladesh',
    'cosmetics video tutorials bd',
    'beauty bucket videos',
    'live beauty sessions bd',
    'beauty product videos bangladesh',
    'makeup tutorials bangladesh',
    'skincare videos bd',
  ],
  openGraph: {
    title: 'Videos & Live Sessions | Beauty Bucket',
    description:
      'Discover product tutorials, beauty tips, customer reviews, and upcoming live sessions.',
    url:
      (process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd') +
      '/videos',
    siteName: 'Beauty Bucket',
    type: 'website',
    locale: 'en_BD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Videos & Live Sessions | Beauty Bucket',
    description:
      'Watch beauty tutorials, product reviews, and join live sessions.',
  },
  alternates: {
    canonical: '/videos',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VideosPage() {
  return (
    <Suspense fallback={<VideosLoading />}>
      <VideosClient />
    </Suspense>
  );
}