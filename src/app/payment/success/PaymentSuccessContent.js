'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaSpinner, FaTimesCircle } from 'react-icons/fa';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const tran_id = searchParams.get('tran_id');
      const val_id = searchParams.get('val_id');
      const status = searchParams.get('status');
      
      if (tran_id && val_id) {
        try {
          const response = await fetch(`http://localhost:5000/api/payments/validate?tran_id=${tran_id}&val_id=${val_id}&status=${status}`);
          const result = await response.json();
          
          if (result.success && result.status === 'success') {
            setPaymentStatus('success');
            setOrderId(result.orderId);
            // Clear cart after successful payment
            const token = localStorage.getItem('token');
            const sessionId = localStorage.getItem('cartSessionId');
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;
            if (sessionId) headers['x-session-id'] = sessionId;
            await fetch('http://localhost:5000/api/cart', { method: 'DELETE', headers });
            window.dispatchEvent(new Event('cart-update'));
          } else {
            setPaymentStatus('failed');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          setPaymentStatus('failed');
        }
      } else {
        setPaymentStatus('unknown');
      }
      setVerifying(false);
    };
    
    verifyPayment();
  }, [searchParams]);

  if (verifying) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="w-12 h-12 text-[#4A8A90] animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#2D3A5C]">Verifying Payment...</h2>
            <p className="text-gray-500 mt-2">Please wait while we confirm your payment</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFF9F0] pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            {paymentStatus === 'success' ? (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-2xl font-bold text-[#2D3A5C] mb-2">Payment Successful! 🎉</h1>
                <p className="text-gray-600 mb-4">Thank you for your purchase!</p>
                {orderId && (
                  <p className="text-sm text-gray-500 mb-6">Order ID: {orderId.slice(-8).toUpperCase()}</p>
                )}
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <p className="text-green-700">A confirmation email has been sent to your email address.</p>
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link href="/customer/orders">
                    <button className="px-6 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition">
                      View My Orders
                    </button>
                  </Link>
                  <Link href="/products">
                    <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </>
            ) : paymentStatus === 'failed' ? (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTimesCircle className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-[#2D3A5C] mb-2">Payment Failed</h1>
                <p className="text-gray-600 mb-6">Your payment could not be processed. Please try again.</p>
                <Link href="/checkout">
                  <button className="px-6 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition">
                    Try Again
                  </button>
                </Link>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-[#2D3A5C] mb-2">Payment Status Unknown</h1>
                <p className="text-gray-600 mb-6">We couldn't verify your payment status. Please contact support.</p>
                <Link href="/contact">
                  <button className="px-6 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition">
                    Contact Support
                  </button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}