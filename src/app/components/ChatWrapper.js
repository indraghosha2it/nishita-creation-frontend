// app/components/ChatWrapper.jsx

'use client';

import dynamic from 'next/dynamic';

// Dynamically import ChatWidget with SSR disabled
const ChatWidget = dynamic(
  () => import('./chat/ChatWidget'),
  { 
    ssr: false,
    loading: () => null
  }
);

export default function ChatWrapper() {
  return <ChatWidget />;
}