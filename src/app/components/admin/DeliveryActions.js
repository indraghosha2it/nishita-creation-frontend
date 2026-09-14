import { useState } from 'react';
import { FaTruck, FaShippingFast, FaSpinner, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';

export const DeliveryActions = ({ order, onUpdate }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('pathao');

  const handleCreateDelivery = async () => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/delivery/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: order._id,
          provider: selectedProvider
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`✅ Delivery created with ${selectedProvider}`);
        onUpdate();
        setShowModal(false);
      } else {
        toast.error(data.error || 'Failed to create delivery');
      }
    } catch (error) {
      console.error('Create delivery error:', error);
      toast.error('Network error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTrackDelivery = async () => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/delivery/track/${order._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`📦 Status: ${data.data.statusLabel || data.data.status}`);
        onUpdate();
      } else {
        toast.error(data.error || 'Failed to track delivery');
      }
    } catch (error) {
      console.error('Track delivery error:', error);
      toast.error('Network error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelDelivery = async () => {
    if (!confirm('Are you sure you want to cancel this delivery?')) return;

    setIsProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/delivery/cancel/${order._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reason: 'Cancelled by admin' })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Delivery cancelled');
        onUpdate();
      } else {
        toast.error(data.error || 'Failed to cancel delivery');
      }
    } catch (error) {
      console.error('Cancel delivery error:', error);
      toast.error('Network error');
    } finally {
      setIsProcessing(false);
    }
  };

  // If order already has delivery
  if (order.deliveryProvider) {
    const statusColors = {
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'picked': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'failed': 'bg-red-100 text-red-800'
    };

    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
          <FaShippingFast className="w-3 h-3" />
          {order.deliveryProvider}
        </span>
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusColors[order.deliveryStatus] || 'bg-gray-100'}`}>
          {order.deliveryStatus}
        </span>
        {order.deliveryTrackingNumber && (
          <span className="text-xs text-gray-500 font-mono">
            #{order.deliveryTrackingNumber.slice(-8)}
          </span>
        )}
        <div className="flex gap-1">
          <button
            onClick={handleTrackDelivery}
            disabled={isProcessing}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Track Delivery"
          >
            {isProcessing ? <FaSpinner className="w-3.5 h-3.5 animate-spin" /> : <FaTruck className="w-3.5 h-3.5" />}
          </button>
          {order.deliveryStatus !== 'delivered' && order.deliveryStatus !== 'cancelled' && (
            <button
              onClick={handleCancelDelivery}
              disabled={isProcessing}
              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Cancel Delivery"
            >
              <FaTimes className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // If no delivery yet
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-1 px-3 py-1 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] transition-colors text-sm"
      >
        <FaTruck className="w-3.5 h-3.5" />
        Create Delivery
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-[#4A8A90] to-[#6BA3A9] text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Create Delivery</h3>
                <button onClick={() => setShowModal(false)} className="p-1 hover:bg-white/20 rounded-lg">
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Select Delivery Provider
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
                >
                  <option value="pathao">Pathao</option>
                  <option value="steadfast">Steadfast Courier</option>
                </select>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  📦 This will create a delivery order with the selected provider.
                  The customer will receive tracking updates automatically.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDelivery}
                disabled={isProcessing}
                className="flex-1 px-3 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {isProcessing ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaCheckCircle className="w-3 h-3" />}
                Create Delivery
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};