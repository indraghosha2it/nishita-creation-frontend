'use client';

import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact your administrator if you think this is a mistake.
        </p>
        <Link
          href="/authorize/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#004767] text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}