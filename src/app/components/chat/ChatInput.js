// frontend/app/components/chat/ChatInput.jsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ onSend, isLoading, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-2 bg-white border border-[#FFD2DB]/40 rounded-2xl p-1.5 focus-within:border-[#EE4275] focus-within:ring-2 focus-within:ring-[#EE4275]/20 transition-all">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about products, policies, or anything..."
          disabled={disabled || isLoading}
          className="flex-1 resize-none bg-transparent border-0 outline-none text-sm text-gray-700 placeholder-gray-400 min-h-[40px] max-h-[120px] px-3 py-2"
          rows={1}
        />
        
        <motion.button
          type="submit"
          disabled={!message.trim() || isLoading || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            message.trim() && !isLoading && !disabled
              ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default ChatInput;