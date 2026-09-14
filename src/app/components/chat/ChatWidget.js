


// // // frontend/app/components/chat/ChatWidget.jsx

// // 'use client';

// // import { useState, useEffect, useRef, useCallback } from 'react';
// // import { X, Minimize2, Maximize2, Sparkles, AlertCircle, RefreshCw, Send, Loader2, User, MessageCircle } from 'lucide-react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // const ChatWidget = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isMinimized, setIsMinimized] = useState(false);
// //   const [messages, setMessages] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [sessionId, setSessionId] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [unreadCount, setUnreadCount] = useState(0);
// //   const [inputMessage, setInputMessage] = useState('');
  
// //   const messagesEndRef = useRef(null);
// //   const chatContainerRef = useRef(null);
// //   const inputRef = useRef(null);

// //   // Initialize session ID
// //   useEffect(() => {
// //     let storedSessionId = localStorage.getItem('chatSessionId');
// //     if (!storedSessionId) {
// //       storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
// //       localStorage.setItem('chatSessionId', storedSessionId);
// //     }
// //     setSessionId(storedSessionId);

// //     // Load previous messages
// //     const savedMessages = localStorage.getItem(`chatMessages_${storedSessionId}`);
// //     if (savedMessages) {
// //       try {
// //         const parsed = JSON.parse(savedMessages);
// //         setMessages(parsed);
// //       } catch (e) {
// //         console.error('Error loading messages:', e);
// //       }
// //     }
// //   }, []);

// //   // Save messages to localStorage
// //   useEffect(() => {
// //     if (sessionId && messages.length > 0) {
// //       localStorage.setItem(`chatMessages_${sessionId}`, JSON.stringify(messages));
// //     }
// //   }, [messages, sessionId]);

// //   // Scroll to bottom when messages change
// //   useEffect(() => {
// //     if (messagesEndRef.current) {
// //       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   }, [messages]);

// //   // Handle outside click to close
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (isOpen && chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
// //         const chatButton = document.getElementById('chat-button');
// //         if (chatButton && !chatButton.contains(event.target)) {
// //           setIsOpen(false);
// //         }
// //       }
// //     };

// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, [isOpen]);

// //   // Format time
// //   const formatTime = (date) => {
// //     if (!date) return '';
// //     return new Date(date).toLocaleTimeString('en-US', {
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   // Send message
// //   const sendMessage = useCallback(async () => {
// //     if (!inputMessage.trim() || isLoading) return;

// //     const message = inputMessage.trim();
// //     setInputMessage('');

// //     // Add user message to UI
// //     const userMessage = {
// //       id: `user_${Date.now()}`,
// //       text: message,
// //       isUser: true,
// //       timestamp: new Date().toISOString()
// //     };
// //     setMessages(prev => [...prev, userMessage]);
// //     setError(null);
// //     setIsLoading(true);

// //     try {
// //       const sessionId = localStorage.getItem('chatSessionId') || `session_${Date.now()}`;
// //       if (!localStorage.getItem('chatSessionId')) {
// //         localStorage.setItem('chatSessionId', sessionId);
// //       }

// //       // Try to use the backend API
// //       let responseText = '';
// //       let success = false;

// //       try {
// //         const response = await fetch('/api/chat', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({
// //             message: message,
// //             sessionId: sessionId,
// //           }),
// //         });

// //         const data = await response.json();

// //         if (data.success) {
// //           responseText = data.data.message;
// //           success = true;
// //         } else {
// //           responseText = data.fallback || '🌸 I\'m having trouble right now. Please contact support@beautybucket.com for assistance.';
// //         }
// //       } catch (fetchError) {
// //         console.error('Fetch error:', fetchError);
// //         responseText = '🌸 I apologize, but I\'m having trouble connecting. Please contact support@beautybucket.com for assistance.';
// //       }

// //       // Add AI response to UI
// //       const aiMessage = {
// //         id: `ai_${Date.now()}`,
// //         text: responseText,
// //         isUser: false,
// //         timestamp: new Date().toISOString(),
// //         isError: !success
// //       };
// //       setMessages(prev => [...prev, aiMessage]);
      
// //       if (!success) {
// //         setError('Failed to get response from server');
// //       }

// //     } catch (error) {
// //       console.error('Chat error:', error);
// //       const errorMessage = {
// //         id: `ai_${Date.now()}`,
// //         text: '🌸 I apologize, but I\'m having trouble connecting. Please contact support@beautybucket.com for assistance.',
// //         isUser: false,
// //         timestamp: new Date().toISOString(),
// //         isError: true
// //       };
// //       setMessages(prev => [...prev, errorMessage]);
// //       setError('Network error. Please check your connection.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, [inputMessage, isLoading]);

// //   // Handle Enter key
// //   const handleKeyDown = (e) => {
// //     if (e.key === 'Enter' && !e.shiftKey) {
// //       e.preventDefault();
// //       sendMessage();
// //     }
// //   };

// //   // Clear chat history
// //   const clearChat = useCallback(async () => {
// //     const currentSessionId = localStorage.getItem('chatSessionId');
// //     if (currentSessionId) {
// //       try {
// //         await fetch(`/api/chat?sessionId=${currentSessionId}`, {
// //           method: 'DELETE',
// //         });
// //       } catch (error) {
// //         console.error('Error clearing session:', error);
// //       }
// //     }
// //     setMessages([]);
// //     localStorage.removeItem(`chatMessages_${currentSessionId}`);
// //     setError(null);
// //     // Add welcome message
// //     const welcomeMessage = {
// //       id: `welcome_${Date.now()}`,
// //       text: "💄 Welcome to Beauty Bucket! I'm your beauty assistant. Ask me about:\n\n• Products we sell\n• Return policy & shipping\n• Order tracking\n• Payment methods\n\nOr search for a specific product! 🛍️",
// //       isUser: false,
// //       timestamp: new Date().toISOString()
// //     };
// //     setMessages([welcomeMessage]);
// //   }, []);

// //   // Toggle chat
// //   const toggleChat = () => {
// //     if (!isOpen) {
// //       setUnreadCount(0);
// //       if (messages.length === 0) {
// //         const welcomeMessage = {
// //           id: `welcome_${Date.now()}`,
// //           text: "💄 Welcome to Beauty Bucket! I'm your beauty assistant. Ask me about:\n\n• Products we sell\n• Return policy & shipping\n• Order tracking\n• Payment methods\n\nOr search for a specific product! 🛍️",
// //           isUser: false,
// //           timestamp: new Date().toISOString()
// //         };
// //         setMessages([welcomeMessage]);
// //         localStorage.setItem(`chatMessages_${sessionId}`, JSON.stringify([welcomeMessage]));
// //       }
// //     }
// //     setIsOpen(!isOpen);
// //     setIsMinimized(false);
// //   };

// //   // Toggle minimize
// //   const toggleMinimize = () => {
// //     setIsMinimized(!isMinimized);
// //   };

// //   return (
// //     <>
// //       {/* Chat Button */}
// //       <div id="chat-button" className="fixed bottom-9 right-6 z-50">
// //         <button
// //           onClick={toggleChat}
// //           className="relative group w-14 h-14 rounded-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
// //         >
// //           <motion.div
// //             initial={false}
// //             animate={{ rotate: isOpen ? 90 : 0 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             {isOpen ? (
// //               <X className="w-6 h-6 text-white" />
// //             ) : (
// //               <MessageCircle className="w-6 h-6 text-white" />
// //             )}
// //           </motion.div>
          
// //           {/* Pulsing ring */}
// //           {!isOpen && (
// //             <motion.div
// //               className="absolute inset-0 rounded-full border-2 border-[#EE4275]"
// //               animate={{
// //                 scale: [1, 1.2, 1],
// //                 opacity: [0.6, 0, 0.6]
// //               }}
// //               transition={{
// //                 duration: 2,
// //                 repeat: Infinity,
// //                 ease: 'easeInOut'
// //               }}
// //             />
// //           )}
// //         </button>
// //       </div>

// //       {/* Chat Window */}
// //       <AnimatePresence>
// //         {isOpen && (
// //           <motion.div
// //             ref={chatContainerRef}
// //             initial={{ opacity: 0, scale: 0.8, y: 20 }}
// //             animate={{ 
// //               opacity: 1, 
// //               scale: 1, 
// //               y: 0,
// //               ...(isMinimized ? { height: 60 } : { height: 'auto' })
// //             }}
// //             exit={{ opacity: 0, scale: 0.8, y: 20 }}
// //             transition={{ type: 'spring', damping: 25, stiffness: 300 }}
// //             className="fixed bottom-28 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-[#FFD2DB]/30 overflow-hidden"
// //             style={{ maxHeight: 'calc(100vh - 120px)' }}
// //           >
// //             {/* Header */}
// //             <div className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-4 py-3 flex items-center justify-between">
// //               <div className="flex items-center gap-2">
// //                 <Sparkles className="w-5 h-5 text-white" />
// //                 <div>
// //                   <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Courgette', cursive" }}>
// //                     Beauty Bucket Assistant
// //                   </h3>
// //                   <p className="text-[10px] text-white/80">
// //                     {isLoading ? 'Typing...' : 'Online • Here to help'}
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-1">
// //                 {messages.length > 1 && (
// //                   <button
// //                     onClick={clearChat}
// //                     className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
// //                     title="Clear chat"
// //                   >
// //                     <RefreshCw className="w-4 h-4" />
// //                   </button>
// //                 )}
// //                 <button
// //                   onClick={toggleMinimize}
// //                   className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
// //                 >
// //                   {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
// //                 </button>
// //                 <button
// //                   onClick={toggleChat}
// //                   className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
// //                 >
// //                   <X className="w-4 h-4" />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Messages Area */}
// //             {!isMinimized && (
// //               <>
// //                 <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50" style={{ maxHeight: '400px' }}>
// //                   {messages.map((msg) => (
// //                     <div key={msg.id} className={`flex items-start gap-3 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
// //                       {/* Avatar */}
// //                       <div className="flex-shrink-0">
// //                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
// //                           msg.isUser 
// //                             ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]' 
// //                             : 'bg-gray-200'
// //                         }`}>
// //                           {msg.isUser ? (
// //                             <User className="w-4 h-4 text-white" />
// //                           ) : (
// //                             <Sparkles className="w-4 h-4 text-[#EE4275]" />
// //                           )}
// //                         </div>
// //                       </div>

// //                       {/* Message bubble */}
// //                       <div className={`max-w-[80%] ${msg.isUser ? 'items-end' : 'items-start'}`}>
// //                         <div className={`rounded-2xl px-4 py-2.5 ${
// //                           msg.isUser
// //                             ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white'
// //                             : msg.isError
// //                             ? 'bg-red-50 text-red-700 border border-red-200'
// //                             : 'bg-gray-100 text-gray-800'
// //                         }`}>
// //                           <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
// //                             {msg.text}
// //                           </p>
// //                         </div>
// //                         {msg.timestamp && (
// //                           <span className="text-[10px] text-gray-400 mt-1 block">
// //                             {formatTime(msg.timestamp)}
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
                  
// //                   {/* Typing indicator */}
// //                   {isLoading && (
// //                     <div className="flex items-center gap-2 text-gray-400 text-sm">
// //                       <div className="flex gap-1">
// //                         <span className="w-2 h-2 bg-[#EE4275] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
// //                         <span className="w-2 h-2 bg-[#EE4275] rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
// //                         <span className="w-2 h-2 bg-[#EE4275] rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
// //                       </div>
// //                       <span className="text-xs">Beauty Bucket is typing...</span>
// //                     </div>
// //                   )}
                  
// //                   <div ref={messagesEndRef} />
// //                 </div>

// //                 {/* Error message */}
// //                 {error && (
// //                   <div className="px-4 py-2 bg-red-50 border-t border-red-200">
// //                     <p className="text-xs text-red-600 flex items-center gap-1">
// //                       <AlertCircle className="w-3 h-3" />
// //                       {error}
// //                     </p>
// //                   </div>
// //                 )}

// //                 {/* Input */}
// //                 <div className="p-3 bg-white border-t border-[#FFD2DB]/20">
// //                   <div className="flex items-end gap-2 bg-white border border-[#FFD2DB]/40 rounded-2xl p-1.5 focus-within:border-[#EE4275] focus-within:ring-2 focus-within:ring-[#EE4275]/20 transition-all">
// //                     <input
// //                       ref={inputRef}
// //                       type="text"
// //                       value={inputMessage}
// //                       onChange={(e) => setInputMessage(e.target.value)}
// //                       onKeyDown={handleKeyDown}
// //                       placeholder="Ask about products, policies..."
// //                       disabled={isLoading}
// //                       className="flex-1 bg-transparent border-0 outline-none text-sm text-gray-700 placeholder-gray-400 px-3 py-2 min-h-[40px]"
// //                     />
                    
// //                     <button
// //                       onClick={sendMessage}
// //                       disabled={!inputMessage.trim() || isLoading}
// //                       className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
// //                         inputMessage.trim() && !isLoading
// //                           ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25'
// //                           : 'bg-gray-100 text-gray-400 cursor-not-allowed'
// //                       }`}
// //                     >
// //                       {isLoading ? (
// //                         <Loader2 className="w-4 h-4 animate-spin" />
// //                       ) : (
// //                         <Send className="w-4 h-4" />
// //                       )}
// //                     </button>
// //                   </div>
// //                   <p className="text-[9px] text-gray-400 text-center mt-1.5">
// //                     🔒 Chat is private • Your data stays safe
// //                   </p>
// //                 </div>
// //               </>
// //             )}
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // };

// // export default ChatWidget;


// // frontend/app/components/chat/ChatWidget.jsx

// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { X, Minimize2, Maximize2, Sparkles, AlertCircle, RefreshCw, Send, Loader2, User, MessageCircle } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const ChatWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [sessionId, setSessionId] = useState(null);
//   const [error, setError] = useState(null);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [inputMessage, setInputMessage] = useState('');
  
//   const messagesEndRef = useRef(null);
//   const chatContainerRef = useRef(null);
//   const inputRef = useRef(null);

//   // Initialize session ID
//   useEffect(() => {
//     let storedSessionId = localStorage.getItem('chatSessionId');
//     if (!storedSessionId) {
//       storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       localStorage.setItem('chatSessionId', storedSessionId);
//     }
//     setSessionId(storedSessionId);

//     // Load previous messages
//     const savedMessages = localStorage.getItem(`chatMessages_${storedSessionId}`);
//     if (savedMessages) {
//       try {
//         const parsed = JSON.parse(savedMessages);
//         setMessages(parsed);
//       } catch (e) {
//         console.error('Error loading messages:', e);
//       }
//     } else {
//       // Add welcome message only on first visit
//       const welcomeMessage = {
//         id: `welcome_${Date.now()}`,
//         text: "💄 Welcome to Beauty Bucket! I'm your beauty assistant. Ask me about:\n\n• Products we sell\n• Return policy & shipping\n• Order tracking\n• Payment methods\n\nOr search for a specific product! 🛍️",
//         isUser: false,
//         timestamp: new Date().toISOString()
//       };
//       setMessages([welcomeMessage]);
//     }
//   }, []);

//   // Save messages to localStorage
//   useEffect(() => {
//     if (sessionId && messages.length > 0) {
//       localStorage.setItem(`chatMessages_${sessionId}`, JSON.stringify(messages));
//     }
//   }, [messages, sessionId]);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   // Auto-focus input when chat opens
//   useEffect(() => {
//     if (isOpen && !isMinimized && inputRef.current) {
//       setTimeout(() => {
//         inputRef.current?.focus();
//       }, 300);
//     }
//   }, [isOpen, isMinimized]);

//   // Format time
//   const formatTime = (date) => {
//     if (!date) return '';
//     return new Date(date).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Send message
//   const sendMessage = useCallback(async () => {
//     if (!inputMessage.trim() || isLoading) return;

//     const message = inputMessage.trim();
//     setInputMessage('');

//     // Add user message to UI
//     const userMessage = {
//       id: `user_${Date.now()}`,
//       text: message,
//       isUser: true,
//       timestamp: new Date().toISOString()
//     };
//     setMessages(prev => [...prev, userMessage]);
//     setError(null);
//     setIsLoading(true);

//     try {
//       const currentSessionId = localStorage.getItem('chatSessionId') || `session_${Date.now()}`;
//       if (!localStorage.getItem('chatSessionId')) {
//         localStorage.setItem('chatSessionId', currentSessionId);
//       }

//       // Try to use the backend API
//       let responseText = '';
//       let success = false;

//       try {
//         const response = await fetch('/api/chat', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             message: message,
//             sessionId: currentSessionId,
//           }),
//         });

//         const data = await response.json();

//         if (data.success) {
//           responseText = data.data.message;
//           success = true;
//         } else {
//           responseText = data.fallback || '🌸 I\'m having trouble right now. Please contact support@beautybucket.com for assistance.';
//         }
//       } catch (fetchError) {
//         console.error('Fetch error:', fetchError);
//         responseText = '🌸 I apologize, but I\'m having trouble connecting. Please contact support@beautybucket.com for assistance.';
//       }

//       // Add AI response to UI
//       const aiMessage = {
//         id: `ai_${Date.now()}`,
//         text: responseText,
//         isUser: false,
//         timestamp: new Date().toISOString(),
//         isError: !success
//       };
//       setMessages(prev => [...prev, aiMessage]);
      
//       if (!success) {
//         setError('Failed to get response from server');
//       }

//     } catch (error) {
//       console.error('Chat error:', error);
//       const errorMessage = {
//         id: `ai_${Date.now()}`,
//         text: '🌸 I apologize, but I\'m having trouble connecting. Please contact support@beautybucket.com for assistance.',
//         isUser: false,
//         timestamp: new Date().toISOString(),
//         isError: true
//       };
//       setMessages(prev => [...prev, errorMessage]);
//       setError('Network error. Please check your connection.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [inputMessage, isLoading]);

//   // Handle Enter key
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   // Clear chat history
//   const clearChat = useCallback(async () => {
//     const currentSessionId = localStorage.getItem('chatSessionId');
//     if (currentSessionId) {
//       try {
//         await fetch(`/api/chat?sessionId=${currentSessionId}`, {
//           method: 'DELETE',
//         });
//       } catch (error) {
//         console.error('Error clearing session:', error);
//       }
//     }
    
//     // Reset to welcome message
//     const welcomeMessage = {
//       id: `welcome_${Date.now()}`,
//       text: "💄 Welcome to Beauty Bucket! I'm your beauty assistant. Ask me about:\n\n• Products we sell\n• Return policy & shipping\n• Order tracking\n• Payment methods\n\nOr search for a specific product! 🛍️",
//       isUser: false,
//       timestamp: new Date().toISOString()
//     };
//     setMessages([welcomeMessage]);
//     localStorage.removeItem(`chatMessages_${currentSessionId}`);
//     setError(null);
//   }, []);

//   // Toggle chat
//   const toggleChat = () => {
//     if (!isOpen) {
//       setUnreadCount(0);
//     }
//     setIsOpen(!isOpen);
//     setIsMinimized(false);
//   };

//   // Toggle minimize
//   const toggleMinimize = () => {
//     setIsMinimized(!isMinimized);
//   };

//   return (
//     <>
//       {/* Chat Button */}
//       <div id="chat-button" className="fixed bottom-6 right-6 z-50">
//         <button
//           onClick={toggleChat}
//           className="relative group w-14 h-14 rounded-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
//         >
//           <motion.div
//             initial={false}
//             animate={{ rotate: isOpen ? 90 : 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {isOpen ? (
//               <X className="w-6 h-6 text-white" />
//             ) : (
//               <MessageCircle className="w-6 h-6 text-white" />
//             )}
//           </motion.div>
          
//           {/* Pulsing ring */}
//           {!isOpen && (
//             <motion.div
//               className="absolute inset-0 rounded-full border-2 border-[#EE4275]"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.6, 0, 0.6]
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: 'easeInOut'
//               }}
//             />
//           )}
//         </button>
//       </div>

//       {/* Chat Window */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             ref={chatContainerRef}
//             initial={{ opacity: 0, scale: 0.8, y: 20 }}
//             animate={{ 
//               opacity: 1, 
//               scale: 1, 
//               y: 0,
//               ...(isMinimized ? { height: 60 } : { height: 'auto' })
//             }}
//             exit={{ opacity: 0, scale: 0.8, y: 20 }}
//             transition={{ type: 'spring', damping: 25, stiffness: 300 }}
//             className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-[#FFD2DB]/30 overflow-hidden"
//             style={{ maxHeight: 'calc(100vh - 120px)' }}
//           >
//             {/* Header */}
//             <div className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-4 py-3 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Sparkles className="w-5 h-5 text-white" />
//                 <div>
//                   <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Courgette', cursive" }}>
//                     Beauty Bucket Assistant
//                   </h3>
//                   <p className="text-[10px] text-white/80">
//                     {isLoading ? 'Typing...' : 'Online • Here to help'}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-1">
//                 {messages.length > 1 && (
//                   <button
//                     onClick={clearChat}
//                     className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
//                     title="Clear chat"
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                   </button>
//                 )}
//                 <button
//                   onClick={toggleMinimize}
//                   className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
//                 >
//                   {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
//                 </button>
//                 <button
//                   onClick={toggleChat}
//                   className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Messages Area - Always visible when not minimized */}
//             {!isMinimized && (
//               <>
//                 <div 
//                   className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50" 
//                   style={{ maxHeight: '400px', minHeight: '200px' }}
//                 >
//                   {messages.map((msg) => (
//                     <div key={msg.id} className={`flex items-start gap-3 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
//                       {/* Avatar */}
//                       <div className="flex-shrink-0">
//                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                           msg.isUser 
//                             ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]' 
//                             : 'bg-gray-200'
//                         }`}>
//                           {msg.isUser ? (
//                             <User className="w-4 h-4 text-white" />
//                           ) : (
//                             <Sparkles className="w-4 h-4 text-[#EE4275]" />
//                           )}
//                         </div>
//                       </div>

//                       {/* Message bubble */}
//                       <div className={`max-w-[80%] ${msg.isUser ? 'items-end' : 'items-start'}`}>
//                         <div className={`rounded-2xl px-4 py-2.5 ${
//                           msg.isUser
//                             ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white'
//                             : msg.isError
//                             ? 'bg-red-50 text-red-700 border border-red-200'
//                             : 'bg-gray-100 text-gray-800'
//                         }`}>
//                           <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
//                             {msg.text}
//                           </p>
//                         </div>
//                         {msg.timestamp && (
//                           <span className="text-[10px] text-gray-400 mt-1 block">
//                             {formatTime(msg.timestamp)}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
                  
//                   {/* Typing indicator */}
//                   {isLoading && (
//                     <div className="flex items-center gap-2 text-gray-400 text-sm ml-11">
//                       <div className="flex gap-1">
//                         <span className="w-2 h-2 bg-[#EE4275] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
//                         <span className="w-2 h-2 bg-[#EE4275] rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
//                         <span className="w-2 h-2 bg-[#EE4275] rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
//                       </div>
//                       <span className="text-xs">Beauty Bucket is typing...</span>
//                     </div>
//                   )}
                  
//                   <div ref={messagesEndRef} />
//                 </div>

//                 {/* Error message */}
//                 {error && (
//                   <div className="px-4 py-2 bg-red-50 border-t border-red-200">
//                     <p className="text-xs text-red-600 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {error}
//                     </p>
//                   </div>
//                 )}

//                 {/* Input - Always visible */}
//                 <div className="p-3 bg-white border-t border-[#FFD2DB]/20">
//                   <div className="flex items-end gap-2 bg-white border border-[#FFD2DB]/40 rounded-2xl p-1.5 focus-within:border-[#EE4275] focus-within:ring-2 focus-within:ring-[#EE4275]/20 transition-all">
//                     <input
//                       ref={inputRef}
//                       type="text"
//                       value={inputMessage}
//                       onChange={(e) => setInputMessage(e.target.value)}
//                       onKeyDown={handleKeyDown}
//                       placeholder="Ask about products, policies..."
//                       disabled={isLoading}
//                       className="flex-1 bg-transparent border-0 outline-none text-sm text-gray-700 placeholder-gray-400 px-3 py-2 min-h-[40px]"
//                     />
                    
//                     <button
//                       onClick={sendMessage}
//                       disabled={!inputMessage.trim() || isLoading}
//                       className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
//                         inputMessage.trim() && !isLoading
//                           ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25'
//                           : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                       }`}
//                     >
//                       {isLoading ? (
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                       ) : (
//                         <Send className="w-4 h-4" />
//                       )}
//                     </button>
//                   </div>
//                   <p className="text-[9px] text-gray-400 text-center mt-1.5">
//                     🔒 Chat is private • Your data stays safe
//                   </p>
//                 </div>
//               </>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ChatWidget;




// frontend/app/components/chat/ChatWidget.jsx

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Minimize2, Maximize2, Sparkles, AlertCircle, RefreshCw, Send, Loader2, User, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const sessionIdRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    const handleAuthChange = () => {
      const newToken = localStorage.getItem('token');
      setIsLoggedIn(!!newToken);
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  // Initialize session ID
  useEffect(() => {
    let storedSessionId = localStorage.getItem('chatSessionId');
    
    if (!storedSessionId) {
      storedSessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatSessionId', storedSessionId);
    }
    
    setSessionId(storedSessionId);
    sessionIdRef.current = storedSessionId;
  }, []);

  // Load chat history from backend
  const loadChatHistory = useCallback(async () => {
    if (isLoadingHistory) return;
    
    setIsLoadingHistory(true);
    try {
      const token = localStorage.getItem('token');
      const currentSessionId = localStorage.getItem('chatSessionId');
      
      // ✅ UPDATED: Use conversation history endpoint
      const url = new URL('/api/chat/conversation/history', window.location.origin);
      if (currentSessionId) {
        url.searchParams.set('sessionId', currentSessionId);
      }
      
      const response = await fetch(url.toString(), {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      
      const data = await response.json();
      
      if (data.success && data.data && data.data.messages) {
        if (data.data.messages.length > 0) {
          setMessages(data.data.messages);
          if (data.data.sessionId) {
            setSessionId(data.data.sessionId);
            localStorage.setItem('chatSessionId', data.data.sessionId);
            sessionIdRef.current = data.data.sessionId;
          }
          return;
        }
      }
      
      // No history, add welcome message
      const welcomeMessage = {
        role: 'assistant',
        content: "💄 Welcome to Beauty Bucket! I'm your beauty assistant. Ask me about:\n\n• Products we sell\n• Return policy & shipping\n• Order tracking\n• Payment methods\n\nOr search for a specific product! 🛍️",
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
      
    } catch (error) {
      console.error('Error loading chat history:', error);
      const welcomeMessage = {
        role: 'assistant',
        content: "💄 Welcome to Beauty Bucket! I'm your beauty assistant. Ask me about:\n\n• Products we sell\n• Return policy & shipping\n• Order tracking\n• Payment methods\n\nOr search for a specific product! 🛍️",
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [isLoadingHistory]);

  // Load history when chat opens
  useEffect(() => {
    if (isOpen) {
      loadChatHistory();
    }
  }, [isOpen, loadChatHistory]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        const chatButton = document.getElementById('chat-button');
        if (chatButton && !chatButton.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);

  // Format time
  const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Send message
  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage('');

    // Add user message to UI immediately
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setError(null);
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const currentSessionId = localStorage.getItem('chatSessionId');
      
      // ✅ UPDATED: Use conversation message endpoint
      const response = await fetch('/api/chat/conversation/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          message: message,
          sessionId: currentSessionId
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.data.sessionId) {
          localStorage.setItem('chatSessionId', data.data.sessionId);
          sessionIdRef.current = data.data.sessionId;
        }
        
        const aiMessage = {
          role: 'assistant',
          content: data.data.message,
          timestamp: new Date().toISOString(),
          products: data.data.products || [],
          faqMatched: data.data.faqMatched || false
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const fallbackMessage = data.fallback || '🌸 I\'m having trouble right now. Please contact support@beautybucket.com for assistance.';
        const aiMessage = {
          role: 'assistant',
          content: fallbackMessage,
          timestamp: new Date().toISOString(),
          isError: true
        };
        setMessages(prev => [...prev, aiMessage]);
        setError(data.error || 'Failed to process message');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: '🌸 I apologize, but I\'m having trouble connecting. Please contact support@beautybucket.com for assistance.',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading]);

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear chat history
  const clearChat = useCallback(async () => {
    const currentSessionId = localStorage.getItem('chatSessionId');
    const token = localStorage.getItem('token');
    
    try {
      // ✅ UPDATED: Use conversation clear session endpoint
      const response = await fetch('/api/chat/conversation/session', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          sessionId: currentSessionId
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        const welcomeMessage = {
          role: 'assistant',
          content: "💄 Welcome to Beauty Bucket! I'm your beauty assistant. Ask me about:\n\n• Products we sell\n• Return policy & shipping\n• Order tracking\n• Payment methods\n\nOr search for a specific product! 🛍️",
          timestamp: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
        setError(null);
        toast.success('Chat cleared');
      } else {
        toast.error(data.error || 'Failed to clear chat');
      }
    } catch (error) {
      console.error('Error clearing chat:', error);
      toast.error('Failed to clear chat');
    }
  }, []);

  // Toggle chat
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  // Toggle minimize
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Button */}
      <div id="chat-button" className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="relative group w-14 h-14 rounded-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        >
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
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              ...(isMinimized ? { height: 60 } : { height: 'auto' })
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-[#FFD2DB]/30 overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-white" />
                <div>
                  <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Courgette', cursive" }}>
                    Beauty Bucket Assistant
                  </h3>
                  <p className="text-[10px] text-white/80">
                    {isLoading ? 'Typing...' : isLoadingHistory ? 'Loading...' : 'Online • Here to help'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <button
                    onClick={clearChat}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
                    title="Clear chat"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={toggleMinimize}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div 
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50" 
                  style={{ maxHeight: '400px', minHeight: '200px' }}
                >
                  {isLoadingHistory ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2 className="w-6 h-6 text-[#EE4275] animate-spin" />
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            msg.role === 'user' 
                              ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]' 
                              : 'bg-gray-200'
                          }`}>
                            {msg.role === 'user' ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Sparkles className="w-4 h-4 text-[#EE4275]" />
                            )}
                          </div>
                        </div>

                        {/* Message bubble */}
                        <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`rounded-2xl px-4 py-2.5 ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white'
                              : msg.isError
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                              {msg.content}
                            </p>
                            {msg.faqMatched && msg.role === 'assistant' && !msg.isError && (
                              <div className="mt-1 text-[8px] text-[#EE4275]/60">
                                ✨ Answered from FAQ
                              </div>
                            )}
                          </div>
                          {msg.timestamp && (
                            <span className="text-[10px] text-gray-400 mt-1 block">
                              {formatTime(msg.timestamp)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  
                  {isLoading && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm ml-11">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-[#EE4275] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-[#EE4275] rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                        <span className="w-2 h-2 bg-[#EE4275] rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
                      </div>
                      <span className="text-xs">Beauty Bucket is typing...</span>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {error && (
                  <div className="px-4 py-2 bg-red-50 border-t border-red-200">
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {error}
                    </p>
                  </div>
                )}

                {/* Input */}
                <div className="p-3 bg-white border-t border-[#FFD2DB]/20">
                  <div className="flex items-end gap-2 bg-white border border-[#FFD2DB]/40 rounded-2xl p-1.5 focus-within:border-[#EE4275] focus-within:ring-2 focus-within:ring-[#EE4275]/20 transition-all">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about products, policies..."
                      disabled={isLoading || isLoadingHistory}
                      className="flex-1 bg-transparent border-0 outline-none text-sm text-gray-700 placeholder-gray-400 px-3 py-2 min-h-[40px]"
                    />
                    
                    <button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isLoading || isLoadingHistory}
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        inputMessage.trim() && !isLoading && !isLoadingHistory
                          ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-[9px] text-gray-400 text-center mt-1.5">
                    🔒 Chat is private • Your data stays safe
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;