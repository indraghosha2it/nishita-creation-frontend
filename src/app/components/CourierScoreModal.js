
// src/app/components/CourierScoreModal.jsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTimes, 
  FaTruck, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaSpinner,
  FaInfoCircle,
  FaExclamationTriangle,
  FaUser,
  FaPhone,
  FaMoneyBillWave,
  FaBox,
  FaClock,
  FaStar,
  FaChartLine
} from 'react-icons/fa';

const COURIER_DISPLAY = [
  { key: 'pathao', name: 'Pathao', color: 'bg-red-500' },
  { key: 'steadfast', name: 'SteadFast Courier', color: 'bg-orange-500' },
  { key: 'redx', name: 'REDX', color: 'bg-rose-600' },
];

export default function CourierScoreModal({ isOpen, onClose, order }) {
  const [loading, setLoading] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && order) {
      fetchCourierScore();
    }
  }, [isOpen, order]);

  const fetchCourierScore = async () => {
    if (!order?.customerInfo?.phone) {
      setError('No phone number found for this order');
      return;
    }

    setLoading(true);
    setError(null);
    setScoreData(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const cleanPhone = order.customerInfo.phone.replace(/[\s\-\(\)\+]/g, '');
      
      const response = await fetch(`${API_URL}/api/courier-lifetime?phone=${cleanPhone}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setScoreData(data.data);
      } else {
        setError(data.error || 'Failed to fetch courier score');
      }
    } catch (err) {
      console.error('Fetch courier score error:', err);
      setError(err.message || 'Failed to fetch courier score');
    } finally {
      setLoading(false);
    }
  };

  const getSuccessColor = (rate) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    if (rate >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-[#06B6D4]/30 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
      >
        {/* Header - PowerBank style */}
        <div className="px-5 py-4 border-b border-[#06B6D4]/30 flex flex-wrap items-center justify-between gap-3 bg-black">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FaChartLine className="text-blue-800" />
              Courier Score
            </h2>
            <p className="text-xs text-white/80 mt-0.5">
              {order && (
                <>Order #{order.orderNumber || order._id?.slice(-8).toUpperCase()} | </>
              )}
              Customer: {order?.customerInfo?.fullName || 'N/A'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm border border-[#06B6D4]/30 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaTimes className="inline mr-1" /> Close
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-100px)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FaSpinner className="w-8 h-8 animate-spin text-[#06B6D4]" />
              <p className="text-sm text-[#64748B] mt-3">Fetching courier history...</p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              {error}
            </div>
          ) : scoreData ? (
            <div className="rounded-2xl border border-[#06B6D4]/30 bg-white shadow-sm overflow-hidden">
              {/* Header with phone number */}
              <div className="px-5 py-4 border-b border-[#06B6D4]/30 flex flex-wrap items-center justify-between gap-3 bg-[#E2E7EA]/20">
                <div>
                  <h2 className="text-lg font-bold text-black">Courier Score</h2>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Mobile <span className="font-mono font-semibold text-black">{scoreData.phone}</span> — All shops/platforms combined
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fetchCourierScore}
                  disabled={loading}
                  className="px-3 py-1.5 text-sm border border-[#06B6D4]/30 text-[#004767] rounded-lg hover:bg-white disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Refreshing…' : 'Refresh'}
                </button>
              </div>

              {!scoreData.anyConfigured && (
                <div className="m-5 rounded-xl border border-[#06B6D4]/30 bg-[#06B6D4]/10 p-4 text-sm text-[#06B6D4]">
                  Courier not configured. Add credentials to see real data.
                </div>
              )}

              {/* Stats Cards - PowerBank colors */}
              <div className="p-5 grid lg:grid-cols-[1fr_auto] gap-6">
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">📦</span>
                    <div>
                      <p className="text-xs text-[#64748B]">Total Parcels</p>
                      <p className="text-2xl font-bold text-[#004767]">{scoreData.summary?.totalParcels || 0}</p>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">🚚</span>
                    <div>
                      <p className="text-xs text-[#64748B]">Successful</p>
                      <p className="text-2xl font-bold text-green-700">{scoreData.summary?.totalDelivered || 0}</p>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">✕</span>
                    <div>
                      <p className="text-xs text-[#64748B]">Cancelled</p>
                      <p className="text-2xl font-bold text-red-700">{scoreData.summary?.totalCancelled || 0}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-[#06B6D4]">{scoreData.summary?.deliverySuccessRate || 0}%</div>
                  <p className="text-xs text-[#64748B] font-medium">Success Ratio</p>
                </div>
              </div>

              {/* Courier-wise Table - PowerBank colors */}
              <div className="px-5 pb-5 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-[#64748B] uppercase border-b border-[#06B6D4]/30 bg-[#E2E7EA]/30">
                      <th className="text-left py-3 px-3 font-semibold">Courier Name</th>
                      <th className="text-center py-3 px-2">Total Parcels</th>
                      <th className="text-center py-3 px-2">Successful</th>
                      <th className="text-center py-3 px-2">Cancelled</th>
                      <th className="text-left py-3 px-4 min-w-[10rem]">Success Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#06B6D4]/10">
                    {COURIER_DISPLAY.map(({ key, name }) => {
                      const row = scoreData.couriers?.[key] || {};
                      const configured = row.configured;
                      const total = row.total || 0;
                      const delivered = row.delivered || 0;
                      const cancelled = row.cancelled || 0;
                      const rate = row.successRate || 0;
                      const barColor = rate >= 70 ? 'bg-emerald-500' : rate >= 40 ? 'bg-amber-500' : 'bg-gray-300';

                      return (
                        <tr key={key} className="hover:bg-[#E2E7EA]/30 transition-colors">
                          <td className="py-3 px-3 font-medium text-[#004767]">{name}</td>
                          <td className="py-3 px-2 text-center font-semibold text-[#004767]">
                            {configured ? total : '—'}
                          </td>
                          <td className="py-3 px-2 text-center text-emerald-700">
                            {configured ? delivered : '—'}
                          </td>
                          <td className="py-3 px-2 text-center text-red-600">
                            {configured ? cancelled : '—'}
                          </td>
                          <td className="py-3 px-4">
                            {!configured ? (
                              <span className="text-xs text-[#64748B]">Not connected</span>
                            ) : row.error ? (
                              <span className="text-xs text-red-600">Error: {row.error}</span>
                            ) : row.ratingBased ? (
                              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full w-fit 
                                ${row.rating === 'good_customer' ? 'bg-emerald-100 text-emerald-700' :
                                  row.rating === 'regular_customer' ? 'bg-[#06B6D4]/10 text-[#06B6D4]' :
                                  row.rating === 'bad_customer' ? 'bg-red-100 text-red-700' :
                                  row.rating === 'blocked' ? 'bg-red-200 text-red-800' :
                                  'bg-[#E2E7EA] text-[#64748B]'}`}>
                                {row.rating?.replace('_', ' ')}
                              </span>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 rounded-full bg-[#E2E7EA] overflow-hidden">
                                  <div className={`h-full rounded-full ${barColor}`} style={{ width: `${rate}%` }} />
                                </div>
                                <span className={`text-xs font-bold w-10 text-right ${getSuccessColor(rate)}`}>
                                  {rate}%
                                </span>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <p className="text-[11px] text-[#64748B]/60 mt-3">
                  {scoreData.fetchedAt ? `Updated ${new Date(scoreData.fetchedAt).toLocaleString()}` : ''}
                  {scoreData.cached ? ' (cached)' : ''}
                </p>
              </div>

              {/* Note */}
              <div className="px-5 pb-5">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                  <p className="text-xs text-yellow-700 flex items-start gap-2">
                    <FaInfoCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                    <span>
                      <strong>Note:</strong> This data shows the customer's lifetime delivery history 
                      across Pathao, Steadfast, and RedX networks from all merchants.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}