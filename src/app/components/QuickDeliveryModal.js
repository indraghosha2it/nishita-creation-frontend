'use client';

import { useState, useEffect } from 'react';
import { FaTruck, FaSpinner, FaTimes, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'sonner';

export default function QuickDeliveryModal({ isOpen, onClose, order, onDeliveryCreated }) {
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [weight, setWeight] = useState(0.5);

  useEffect(() => {
    if (isOpen) {
      fetchCouriers();
    }
  }, [isOpen]);

  const fetchCouriers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/couriers`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCouriers(data.data.filter(c => c.apiEnabled && c.configured));
      }
    } catch (error) {
      console.error('Fetch couriers error:', error);
      toast.error('Failed to fetch couriers');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDelivery = async () => {
    if (!selectedCourier) {
      toast.error('Please select a delivery service');
      return;
    }

    setCreating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${order._id}/delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courierSlug: selectedCourier,
          deliveryNote: deliveryNote || undefined,
          weight: weight || 0.5
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Delivery order created successfully');
        onDeliveryCreated();
        onClose();
      } else {
        toast.error(data.error || 'Failed to create delivery order');
      }
    } catch (error) {
      console.error('Create delivery error:', error);
      toast.error('Network error');
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl border border-blue-600/30 shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-blue-600 to-[#004767] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaTruck className="w-5 h-5" />
              <h2 className="text-lg font-bold">Create Delivery</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center py-4">
              <FaSpinner className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          ) : couriers.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-700">
              <FaInfoCircle className="inline w-4 h-4 mr-2" />
              No courier services configured. Please set up delivery services in settings.
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-[#004767] mb-1">
                  Select Delivery Service
                </label>
                <select
                  value={selectedCourier}
                  onChange={(e) => setSelectedCourier(e.target.value)}
                  className="w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select a courier service</option>
                  {couriers.map(courier => (
                    <option key={courier.slug} value={courier.slug}>
                      {courier.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#004767] mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                    min="0.1"
                    step="0.1"
                    className="w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#004767] mb-1">
                    Delivery Note
                  </label>
                  <input
                    type="text"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    placeholder="Optional note"
                    className="w-full px-3 py-2 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleCreateDelivery}
                disabled={!selectedCourier || creating}
                className="w-full py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-800 disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
              >
                {creating ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Creating Delivery...
                  </>
                ) : (
                  <>
                    <FaTruck className="w-4 h-4" />
                    Create Delivery Order
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}