// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { FaTimesCircle, FaArrowLeft } from 'react-icons/fa';
// import Navbar from '../../components/layout/Navbar';
// import Footer from '../../components/layout/Footer';

// export default function PaymentCancelPage() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-[#FFF9F0] pt-20 pb-12">
//         <div className="container mx-auto px-4 max-w-2xl">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl shadow-xl p-8 text-center"
//           >
//             <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FaTimesCircle className="w-10 h-10 text-yellow-500" />
//             </div>
//             <h1 className="text-2xl font-bold text-[#2D3A5C] mb-2">Payment Cancelled</h1>
//             <p className="text-gray-600 mb-6">
//               You cancelled the payment process. Your order has not been placed.
//             </p>
//             <div className="flex gap-4 justify-center">
//               <Link href="/checkout">
//                 <button className="px-6 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition flex items-center gap-2">
//                   <FaArrowLeft className="w-4 h-4" />
//                   Back to Checkout
//                 </button>
//               </Link>
//               <Link href="/cart">
//                 <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
//                   Review Cart
//                 </button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

import { Suspense } from 'react';
import PaymentCancelContent from './PaymentCancelContent';

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#4A8A90] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentCancelContent />
    </Suspense>
  );
}