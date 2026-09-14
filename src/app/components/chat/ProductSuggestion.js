// frontend/app/components/chat/ProductSuggestion.jsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const ProductSuggestion = ({ products }) => {
  if (!products || products.length === 0) return null;
  
  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs font-medium text-gray-500">🛍️ Related Products:</p>
      <div className="space-y-1.5">
        {products.map((product, index) => (
          <motion.div
            key={product._id || index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={`/product/${product.slug}`}
              className="block p-2 bg-white border border-[#FFD2DB]/30 rounded-lg hover:border-[#EE4275] hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                {product.images && product.images[0] && (
                  <img
                    src={product.images[0].url || product.images[0]}
                    alt={product.productName}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {product.productName}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#EE4275]">
                      ৳{(product.discountPrice || product.regularPrice).toFixed(2)}
                    </span>
                    {product.discountPrice && product.discountPrice < product.regularPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ৳{product.regularPrice.toFixed(2)}
                      </span>
                    )}
                    {product.brand && (
                      <span className="text-xs text-gray-500">{product.brand}</span>
                    )}
                  </div>
                </div>
                <button className="text-xs text-[#EE4275] hover:underline">
                  View →
                </button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductSuggestion;