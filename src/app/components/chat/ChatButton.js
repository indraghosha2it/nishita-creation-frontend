// frontend/app/components/chat/ChatButton.jsx

'use client';

import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const ChatButton = ({ isOpen, onClick, unreadCount = 0 }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </div>
      
      {/* Unread badge */}
      {!isOpen && unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span className="text-[10px] font-bold text-white">{unreadCount}</span>
        </motion.div>
      )}
      
      {/* Pulsing ring */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#EE4275]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.button>
  );
};

export default ChatButton;