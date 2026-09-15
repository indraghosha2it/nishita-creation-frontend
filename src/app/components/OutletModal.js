'use client';

import { X, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OutletModal({ isOpen, onClose, outlet }) {
  if (!outlet) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 z-[201] w-[95vw] max-w-[600px] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B9D83]/10">
                  <MapPin className="h-5 w-5 text-[#8B9D83]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {outlet.name || 'Our Outlet'}
                  </h2>
                  <p className="text-xs text-gray-500">Visit us in person</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[calc(90vh-80px)] overflow-y-auto">
              {/* Google Maps Embed */}
              {outlet.googleMapsEmbedUrl && (
                <div className="relative h-[250px] w-full bg-gray-100">
                  <iframe
                    src={outlet.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Outlet Location"
                  />
                </div>
              )}

              {/* Info */}
              <div className="p-6 space-y-5">
                {/* Address */}
                {outlet.address && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8B9D83]/10">
                      <MapPin className="h-4 w-4 text-[#8B9D83]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Address
                      </p>
                      <p className="mt-1 text-sm text-gray-700">{outlet.address}</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {outlet.phone && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8B9D83]/10">
                      <Phone className="h-4 w-4 text-[#8B9D83]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Phone
                      </p>
                      <a
                        href={`tel:${outlet.phone.replace(/\s/g, '')}`}
                        className="mt-1 block text-sm text-gray-700 hover:text-[#8B9D83]"
                      >
                        {outlet.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {outlet.email && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8B9D83]/10">
                      <Mail className="h-4 w-4 text-[#8B9D83]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Email
                      </p>
                      <a
                        href={`mailto:${outlet.email}`}
                        className="mt-1 block text-sm text-gray-700 hover:text-[#8B9D83]"
                      >
                        {outlet.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Open in Google Maps Button */}
                {outlet.googleMapsLink && (
                  <a
                    href={outlet.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#8B9D83] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#6B7D63]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in Google Maps
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}