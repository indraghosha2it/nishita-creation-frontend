// 'use client';



// import { usePathname } from 'next/navigation';
// import Navbar from './Navbar';
// import WhatsAppButton from './WhatsAppButton';
// import Footer from './Footer';


// export default function LayoutContent({ children }) {
//   const pathname = usePathname();
  
//   // Define paths that should NOT show navbar and footer
//   const hideLayoutPaths = [
//     '/admin',
//     '/moderator',
//     '/customer',
 
//   ];
  
//   // Check if current path starts with any of the hide paths
//   const shouldHideLayout = hideLayoutPaths.some(path => 
//     pathname?.startsWith(path)
//   );

//   return (
//     <>
//       {!shouldHideLayout && <Navbar />}
      
//       <main className={!shouldHideLayout ? "min-h-screen pt-16" : "min-h-screen"}>
//         {children}
//       </main>
      
//       {!shouldHideLayout && <WhatsAppButton />}
//       {!shouldHideLayout && <Footer />}
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import WhatsAppButton from './WhatsAppButton';
import Footer from './Footer';

// Dynamically import ChatWidget to avoid SSR issues
const ChatWidget = dynamic(
  () => import('../chat/ChatWidget'),
  { 
    ssr: false,
    loading: () => null // Don't show anything while loading
  }
);

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  // Define paths that should NOT show navbar and footer
  const hideLayoutPaths = [
    '/admin',
    '/moderator',
    '/customer',
  ];
  
  // Check if current path starts with any of the hide paths
  const shouldHideLayout = hideLayoutPaths.some(path => 
    pathname?.startsWith(path)
  );

  // Also hide chat on admin/moderator/customer pages
  const shouldHideChat = shouldHideLayout || pathname?.startsWith('/checkout') || pathname?.startsWith('/login') || pathname?.startsWith('/register');

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      
      <main className={!shouldHideLayout ? "min-h-screen pt-16" : "min-h-screen"}>
        {children}
      </main>
      
      {!shouldHideLayout && <WhatsAppButton />}
      {!shouldHideLayout && <Footer />}
      
      {/* Chat Widget - Only show on client and not on hidden pages */}
      {isClient && !shouldHideChat && <ChatWidget />}
    </>
  );
}