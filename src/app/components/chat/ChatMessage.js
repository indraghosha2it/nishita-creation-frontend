// frontend/app/components/chat/ChatMessage.jsx

'use client';

import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import ProductSuggestion from './ProductSuggestion';

const ChatMessage = ({ message, isUser, timestamp, products }) => {
  const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if message contains product listings
  const hasProductLinks = message.includes('/product/') || products?.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]' 
            : 'bg-gray-200'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Sparkles className="w-4 h-4 text-[#EE4275]" />
          )}
        </div>
      </div>

      {/* Message bubble */}
      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-2.5 ${
          isUser
            ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white'
            : 'bg-gray-100 text-gray-800'
        }`}>
          <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
            {message}
          </div>
          
          {/* Product suggestions */}
          {!isUser && products && products.length > 0 && (
            <ProductSuggestion products={products} />
          )}
        </div>
        
        {timestamp && (
          <span className="text-[10px] text-gray-400 mt-1 block">
            {formatTime(timestamp)}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;