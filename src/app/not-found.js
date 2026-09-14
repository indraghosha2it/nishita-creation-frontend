// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#004767]">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
        <Link 
          href="/" 
          className="inline-block mt-6 px-6 py-3 bg-[#06B6D4] text-white rounded-lg hover:bg-[#0891B2] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}