'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MapPin, Building, User, Mail, Loader2, CheckCircle, ArrowRight, MessageCircle, Globe } from 'lucide-react';
import { toast } from 'sonner';

const CompleteProfileModal = ({ isOpen, onClose, user, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: user?.companyName || '',
    contactPerson: user?.contactPerson || '',
    phone: user?.phone || '',
    whatsapp: user?.whatsapp || '',
    country: user?.country || '',
    address: user?.address || '',
    city: user?.city || '',
    zipCode: user?.zipCode || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/complete-profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Profile completed successfully!');
        
        // Update local storage with new user data and token
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Dispatch event to update other components
        window.dispatchEvent(new Event('auth-change'));
        window.dispatchEvent(new Event('cart-update'));
        
        onComplete(data.user);
        onClose();
      } else {
        toast.error(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error completing profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors z-20 bg-white"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="p-5">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 text-[#E39A65]" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Complete Your Profile</h2>
                  <p className="text-sm text-gray-600">
                    Please provide the following information to continue
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Company Name */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    {/* Contact Person */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Contact Person <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                          placeholder="Full name"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                          placeholder="Your country"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                        placeholder="City"
                      />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                        placeholder="Street address"
                      />
                    </div>

                    {/* ZIP Code */}
                    <div className="md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent"
                        placeholder="ZIP code"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Complete Profile & Continue
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CompleteProfileModal;