
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import {
//   Search,
//   MapPin,
//   Phone,
//   Truck,
//   Menu,
//   Heart,
//   ShoppingBag,
//   User,
//   ChevronDown,
//   X,
//   Package,
//   LayoutDashboard,
//   Settings,
//   LogOut,
//   UserCircle,
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'sonner';

// import CartSidebar from '../CartSidebar';
// import OutletModal from '../OutletModal';
// import CategorySidebar from '../CategorySidebar';
// import { useNavbar } from '@/app/hooks/useNavbar';

// // ============================================================
// // API URL
// // ============================================================
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// // ============================================================
// // THEME COLOR
// // ============================================================
// const ACCENT_COLOR = '#69272B';

// export default function Navbar() {
//   // ============================================================
//   // HOOKS
//   // ============================================================
//   const { navbarData, loading: navbarLoading } = useNavbar();
//   const pathname = usePathname();
//   const router = useRouter();

//   // ============================================================
//   // STATES
//   // ============================================================
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [categorySidebarOpen, setCategorySidebarOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [outletModalOpen, setOutletModalOpen] = useState(false);

//   // Search states
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);

//   // User states
//   const [user, setUser] = useState(null);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [profileImageError, setProfileImageError] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   // Mobile category expansion
//   const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);

//   // Refs
//   const searchRef = useRef(null);
//   const mobileSearchRef = useRef(null);

//   // ============================================================
//   // STYLING - from backend
//   // ============================================================
//   const styles = navbarData?.styling || {
//     primaryColor: ACCENT_COLOR,
//     primaryLight: '#A8B8A0',
//     primaryDark: '#6B7D63',
//     backgroundColor: '#F1EFE3',
//     textColor: '#292725',
//     accentColor: '#d83a38',
//   };

//   // ============================================================
//   // SCROLL DETECTION
//   // ============================================================
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu on scroll
//   useEffect(() => {
//     if (isScrolled) {
//       setMobileMenuOpen(false);
//     }
//   }, [isScrolled]);

//   // ============================================================
//   // CHECK USER STATE
//   // ============================================================
//   const checkUserState = () => {
//     if (typeof window !== 'undefined') {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setUser(parsedUser);
//           setProfileImageError(false);
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//       setAuthLoading(false);
//     }
//   };

//   // ============================================================
//   // FETCH CART COUNT
//   // ============================================================
//   const fetchCartCount = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const headers = {};

//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else {
//         const sessionId = localStorage.getItem('cartSessionId');
//         if (sessionId) {
//           headers['x-session-id'] = sessionId;
//         }
//       }

//       const response = await fetch(`${API_URL}/api/cart`, { headers });

//       if (response.ok) {
//         const data = await response.json();
//         setCartCount(data.data?.totalItems || 0);
//       } else {
//         setCartCount(0);
//       }
//     } catch (error) {
//       console.error('Fetch cart count error:', error);
//       setCartCount(0);
//     }
//   };

//   // ============================================================
//   // AUTH + CART EVENTS
//   // ============================================================
//   useEffect(() => {
//     checkUserState();
//     fetchCartCount();

//     const handleAuthChange = () => {
//       checkUserState();
//       fetchCartCount();
//     };

//     window.addEventListener('auth-change', handleAuthChange);
//     window.addEventListener('focus', handleAuthChange);
//     window.addEventListener('cart-update', fetchCartCount);

//     return () => {
//       window.removeEventListener('auth-change', handleAuthChange);
//       window.removeEventListener('focus', handleAuthChange);
//       window.removeEventListener('cart-update', fetchCartCount);
//     };
//   }, []);

//   // Fetch cart when pathname changes
//   useEffect(() => {
//     fetchCartCount();
//   }, [pathname]);

//   // ============================================================
//   // CLOSE SEARCH ON OUTSIDE CLICK
//   // ============================================================
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowResults(false);
//         if (!event.target.closest('.search-trigger')) {
//           setSearchOpen(false);
//         }
//       }
//       if (
//         mobileSearchRef.current &&
//         !mobileSearchRef.current.contains(event.target) &&
//         !event.target.closest('.mobile-search-trigger')
//       ) {
//         setMobileSearchOpen(false);
//         setShowResults(false);
//         setSearchQuery('');
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // ============================================================
//   // PREVENT BODY SCROLL WHEN MOBILE MENU OPEN
//   // ============================================================
//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [mobileMenuOpen]);

//   // ============================================================
//   // SEARCH
//   // ============================================================
//   const performSearch = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       setShowResults(false);
//       return;
//     }

//     setSearchLoading(true);

//     try {
//       const response = await fetch(
//         `${API_URL}/api/products?search=${encodeURIComponent(query)}&limit=5`
//       );
//       const data = await response.json();

//       if (data.success && data.data && data.data.length > 0) {
//         setSearchResults(data.data);
//         setShowResults(true);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchResults([]);
//       setShowResults(false);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // Search debounce
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchQuery) {
//         performSearch(searchQuery);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   // Search submit
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchOpen(false);
//       setMobileSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
//     }
//   };

//   // Search result click
//   const handleResultClick = (result) => {
//     const productId = result._id;
//     const productSlug = result.slug || productId;

//     if (productSlug) {
//       setSearchOpen(false);
//       setMobileSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
//       setTimeout(() => {
//         router.push(`/product/${productSlug}`);
//       }, 50);
//     } else {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   // ============================================================
//   // LOGOUT
//   // ============================================================
//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     setCartCount(0);
//     setUserMenuOpen(false);

//     window.dispatchEvent(new Event('cart-update'));
//     window.dispatchEvent(new Event('auth-change'));

//     toast.success('Logged out successfully!');
//     router.push('/');
//   };

//   // ============================================================
//   // HELPER FUNCTIONS
//   // ============================================================
//   const getDashboardLink = () => {
//     if (!user) return '/';
//     if (['admin', 'super_admin', 'moderator'].includes(user.role)) {
//       return '/authorize/dashboard';
//     }
//     if (user.role === 'call_center_agent') {
//       return '/agent/dashboard';
//     }
//     return '/customer/dashboard';
//   };

//   const getSettingsLink = () => {
//     if (!user) return '/';
//     if (['admin', 'super_admin', 'moderator'].includes(user.role)) {
//       return '/authorize/settings';
//     }
//     if (user.role === 'call_center_agent') {
//       return '/agent/settings';
//     }
//     return '/customer/settings';
//   };

//   const getDisplayName = () => {
//     if (!user) return '';
//     return (
//       user.companyName ||
//       user.contactPerson ||
//       user.email?.split('@')[0] ||
//       'User'
//     );
//   };

//   const getInitials = () => {
//     if (!user) return 'U';
//     return getDisplayName().charAt(0).toUpperCase();
//   };

//   const getProfilePicture = () => {
//     return user?.profilePicture || user?.photoURL || null;
//   };

//   const getLogoUrl = (url) => {
//     if (!url) return '/logo.png';
//     if (url.includes('cloudinary.com')) {
//       const parts = url.split('/upload/');
//       if (parts.length === 2) {
//         return `${parts[0]}/upload/f_auto,q_auto:good,fl_preserve_transparency/${parts[1]}`;
//       }
//     }
//     return url;
//   };

//   const isActive = (path) => {
//     if (path === '/') return pathname === '/';
//     return pathname.startsWith(path);
//   };

//   // Get navigation items from backend
//   const navItems = navbarData?.items?.filter(item => item.isActive !== false) || [];

//   // Toggle mobile category expansion
//   const toggleMobileCategory = (itemId) => {
//     setExpandedMobileCategory(prev => prev === itemId ? null : itemId);
//   };

//   // ============================================================
//   // LOADING
//   // ============================================================
//   if (authLoading || navbarLoading) {
//     return (
//       <div className="fixed top-0 z-50 w-full bg-[#F1EFE3]">
//         <div className="mx-auto flex h-16 max-w-[1600px] items-center px-4">
//           <div className="h-10 w-24 animate-pulse rounded bg-black/10" />
//           <div className="ml-auto flex gap-4">
//             <div className="h-8 w-8 animate-pulse rounded bg-black/10" />
//             <div className="h-8 w-8 animate-pulse rounded bg-black/10" />
//             <div className="h-8 w-8 animate-pulse rounded bg-black/10" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // RENDER NAV ITEM (Desktop)
//   // ============================================================
//   const renderDesktopNavItem = (item, index, prefix = '') => {
//     const itemKey = `${prefix}${item.id || index}`;

//     // Category type with subcategories - show dropdown
//     if (item.type === 'category' && item.category?.subcategories?.length > 0) {
//       const categoryUrl = item.href || `/products?category=${item.category?.slug || item.category?._id}`;

//       return (
//         <div key={itemKey} className="group relative mr-5">
//           <Link
//             href={categoryUrl}
//             className={`flex items-center gap-[3px] whitespace-nowrap text-[12px] font-medium tracking-[-0.1px] transition hover:text-[#69272B] ${
//               item.highlight ? 'text-[#d83a38]' : 'text-[#292725]'
//             }`}
//           >
//             <span>{item.name}</span>
//             <ChevronDown
//               size={11}
//               strokeWidth={1.4}
//               className="transition-transform duration-200 group-hover:rotate-180"
//             />
//           </Link>

//           {/* Dropdown with subcategories and their children */}
//           <div className="invisible absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-lg border border-gray-200 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
//             {item.category.subcategories.map((sub) => {
//               const subSlug = sub.slug || sub._id;
//               const hasChildren = sub.children?.length > 0;

//               if (hasChildren) {
//                 // Subcategory with children - nested dropdown
//                 return (
//                   <div key={sub._id || sub.id} className="group/sub relative">
//                     <Link
//                       href={`/products?category=${item.category.slug || item.category._id}&subcategory=${subSlug}`}
//                       className="flex items-center justify-between px-4 py-2 text-[12px] text-gray-700 transition hover:bg-gray-50 hover:text-[#69272B]"
//                     >
//                       <span>{sub.name}</span>
//                       <ChevronDown size={12} className="-rotate-90" />
//                     </Link>

//                     {/* Child subcategories */}
//                     <div className="invisible absolute left-full top-0 ml-1 min-w-[180px] rounded-lg border border-gray-200 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover/sub:visible group-hover/sub:opacity-100">
//                       {sub.children.map((child) => (
//                         <Link
//                           key={child._id || child.id}
//                           href={`/products?category=${item.category.slug || item.category._id}&subcategory=${subSlug}&child=${child.slug || child._id}`}
//                           className="block px-4 py-2 text-[12px] text-gray-600 transition hover:bg-gray-50 hover:text-[#69272B]"
//                         >
//                           {child.name}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 );
//               }

//               // Simple subcategory link
//               return (
//                 <Link
//                   key={sub._id || sub.id}
//                   href={`/products?category=${item.category.slug || item.category._id}&subcategory=${subSlug}`}
//                   className="block px-4 py-2 text-[12px] text-gray-700 transition hover:bg-gray-50 hover:text-[#69272B]"
//                 >
//                   {sub.name}
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       );
//     }

//     // Category type without subcategories - simple link
//     if (item.type === 'category' && item.category) {
//       const categoryUrl = item.href || `/products?category=${item.category?.slug || item.category?._id}`;
//       return (
//         <Link
//           key={itemKey}
//           href={categoryUrl}
//           className={`group mr-5 flex items-center gap-[3px] whitespace-nowrap text-[12px] font-medium tracking-[-0.1px] transition hover:text-[#69272B] ${
//             item.highlight ? 'text-[#d83a38]' : 'text-[#292725]'
//           }`}
//         >
//           <span>{item.name}</span>
//         </Link>
//       );
//     }

//     // Normal link item
//     return (
//       <Link
//         key={itemKey}
//         href={item.href || '/'}
//         className={`group mr-5 flex items-center gap-[3px] whitespace-nowrap text-[12px] font-medium tracking-[-0.1px] transition hover:text-[#69272B] ${
//           item.highlight ? 'text-[#d83a38]' : 'text-[#292725]'
//         }`}
//       >
//         <span>{item.name}</span>
//       </Link>
//     );
//   };

//   // ============================================================
//   // RENDER MOBILE NAV ITEM
//   // ============================================================
//   const renderMobileNavItem = (item, index) => {
//     const itemKey = `mobile-${item.id || index}`;
//     const hasSubcategories = item.type === 'category' && item.category?.subcategories?.length > 0;
//     const isExpanded = expandedMobileCategory === (item.id || index);

//     if (hasSubcategories) {
//       const categoryUrl = item.href || `/products?category=${item.category?.slug || item.category?._id}`;

//       return (
//         <div key={itemKey}>
//           <div
//             className={`flex min-h-[40px] items-center justify-between border-b border-[#eeeeee] text-[12px] font-medium ${
//               item.highlight ? 'text-[#d83a38]' : 'text-[#292725]'
//             }`}
//           >
//             <Link
//               href={categoryUrl}
//               onClick={() => setMobileMenuOpen(false)}
//               className="flex-1 py-2"
//             >
//               {item.name}
//             </Link>
//             <button
//               onClick={() => toggleMobileCategory(item.id || index)}
//               className="p-2"
//             >
//               <ChevronDown
//                 size={13}
//                 strokeWidth={1.4}
//                 className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
//               />
//             </button>
//           </div>

//           {/* Mobile Subcategories */}
//           <AnimatePresence>
//             {isExpanded && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: 'auto', opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className="overflow-hidden bg-gray-50"
//               >
//                 <div className="py-1">
//                   {item.category.subcategories.map((sub) => {
//                     const subSlug = sub.slug || sub._id;
//                     return (
//                       <Link
//                         key={sub._id || sub.id}
//                         href={`/products?category=${item.category.slug || item.category._id}&subcategory=${subSlug}`}
//                         onClick={() => setMobileMenuOpen(false)}
//                         className="block px-6 py-2 text-[11px] text-gray-600 transition hover:bg-gray-100 hover:text-[#69272B]"
//                       >
//                         {sub.name}
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       );
//     }

//     return (
//       <Link
//         key={itemKey}
//         href={item.href || '/'}
//         onClick={() => setMobileMenuOpen(false)}
//         className={`flex min-h-[40px] items-center justify-between border-b border-[#eeeeee] text-[12px] font-medium ${
//           item.highlight ? 'text-[#d83a38]' : 'text-[#292725]'
//         }`}
//       >
//         <span>{item.name}</span>
//       </Link>
//     );
//   };

//   // ============================================================
//   // RENDER
//   // ============================================================
//   return (
//     <>
//       {/* =====================================================
//           ORIGINAL HEADER
//       ===================================================== */}
//       <header
//         className={`
//           relative -mt-16 w-full bg-[#F1EFE3] text-[#292725]
//           transition-all duration-300
//           ${isScrolled ? 'pointer-events-none opacity-0' : 'opacity-100'}
//         `}
//       >
//         {/* =================================================
//             LOGO - COVERS BOTH ROWS
//         ================================================= */}
//         <Link
//           href="/"
//           className="absolute left-4 top-0 z-30 flex h-[89px] w-[100px] items-center justify-center lg:left-7"
//         >
//           {navbarData?.logo?.logoUrl ? (
//             <img
//               src={getLogoUrl(navbarData.logo.logoUrl)}
//               alt={navbarData.logo.text || 'Logo'}
//               className="h-auto max-h-[78px] w-auto max-w-[90px] object-contain"
//             />
//           ) : (
//             <div className="flex flex-col items-center">
//               <span className="text-lg font-bold" style={{ color: styles.textColor }}>
//                 {navbarData?.logo?.text || "Nishat's Collection"}
//               </span>
//               {navbarData?.logo?.highlightText && (
//                 <span
//                   className="text-[10px] font-medium tracking-widest"
//                   style={{ color: ACCENT_COLOR }}
//                 >
//                   {navbarData.logo.highlightText}
//                 </span>
//               )}
//             </div>
//           )}
//         </Link>

//         {/* =================================================
//             TOP NAVBAR
//         ================================================= */}
//         <div className="border-b border-[#dedcd2]">
//           <div className="relative mx-auto flex h-[46px] max-w-[1600px] items-center px-4 lg:px-7">
//             {/* Logo Space */}
//             <div className="w-[100px] shrink-0" />

//             {/* ================= SEARCH ================= */}
//             <div className="absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2">
//               <div className="relative w-full" ref={searchRef}>
//                 {!searchOpen ? (
//                   <button
//                     type="button"
//                     onClick={() => setSearchOpen(true)}
//                     className="search-trigger flex h-[33px] w-full items-center rounded-[8px] border border-[#dedbd7] bg-white pl-9 pr-3 text-left transition hover:border-[#69272B]"
//                   >
//                     <Search
//                       size={15}
//                       strokeWidth={1.4}
//                       className="absolute left-3 text-[#777]"
//                     />
//                     <span className="text-[11px] text-[#999]">
//                       Search products here
//                     </span>
//                   </button>
//                 ) : (
//                   <div className="relative">
//                     <form onSubmit={handleSearchSubmit}>
//                       <Search
//                         size={15}
//                         strokeWidth={1.4}
//                         className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]"
//                       />
//                       <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search products here"
//                         className="h-[33px] w-full rounded-[8px] border border-[#69272B] bg-white pl-9 pr-16 text-[11px] text-[#333] outline-none"
//                         autoFocus
//                       />
//                       <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
//                         {searchLoading ? (
//                           <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#69272B] border-t-transparent" />
//                         ) : (
//                           <button type="submit" className="p-1">
//                             <Search size={14} className="text-[#777]" />
//                           </button>
//                         )}
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setSearchOpen(false);
//                             setSearchQuery('');
//                             setShowResults(false);
//                           }}
//                           className="p-1"
//                         >
//                           <X size={14} className="text-[#777]" />
//                         </button>
//                       </div>
//                     </form>

//                     {/* Desktop Search Results */}
//                     {showResults && searchResults.length > 0 && (
//                       <div className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg z-50">
//                         {searchResults.map((product) => (
//                           <button
//                             key={product._id}
//                             onMouseDown={(e) => {
//                               e.preventDefault();
//                               handleResultClick(product);
//                             }}
//                             className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-50 last:border-0"
//                           >
//                             {product.images?.[0] ? (
//                               <img
//                                 src={product.images[0]?.url || product.images[0]}
//                                 alt={product.productName || product.name}
//                                 className="h-10 w-10 rounded-lg object-cover bg-gray-100"
//                               />
//                             ) : (
//                               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
//                                 <Package className="h-5 w-5 text-gray-400" />
//                               </div>
//                             )}
//                             <div className="flex-1 min-w-0">
//                               <p className="truncate text-sm font-medium text-gray-900">
//                                 {product.productName || product.name || product.title}
//                               </p>
//                               <p className="text-sm font-semibold" style={{ color: ACCENT_COLOR }}>
//                                 ৳{product.discountPrice || product.regularPrice || product.price}
//                               </p>
//                             </div>
//                           </button>
//                         ))}
//                         <button
//                           onClick={handleSearchSubmit}
//                           className="w-full px-4 py-3 text-center text-sm font-medium border-t border-gray-100 transition hover:bg-gray-50"
//                           style={{ color: ACCENT_COLOR }}
//                         >
//                           View all results for &quot;{searchQuery}&quot; →
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* ================= TOP INFORMATION ================= */}
//             <div className="ml-auto hidden items-center gap-6 lg:flex">
//               {/* PHONE */}
//               {navbarData?.topBar?.phone && (
//                 <Link
//                   href={navbarData.topBar.phoneLink || '/contact'}
//                   className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#292725] transition hover:text-[#69272B]"
//                 >
//                   <Phone size={17} strokeWidth={1.4} />
//                   <span>{navbarData.topBar.phone}</span>
//                 </Link>
//               )}

//               {/* OUR OUTLET */}
//               {navbarData?.topBar?.showOutlet !== false && (
//                 <button
//                   onClick={() => setOutletModalOpen(true)}
//                   className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#292725] transition hover:text-[#69272B]"
//                 >
//                   <MapPin size={17} strokeWidth={1.4} />
//                   <span>{navbarData?.topBar?.outletText || 'Our Outlet'}</span>
//                 </button>
//               )}

//               {/* TRACK ORDER */}
//               {navbarData?.topBar?.showTrackOrder !== false && (
//                 <Link
//                   href={navbarData.topBar.trackOrderLink || '/track'}
//                   className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#292725] transition hover:text-[#69272B]"
//                 >
//                   <Truck size={19} strokeWidth={1.4} />
//                   <span>{navbarData?.topBar?.trackOrderText || 'Track Order'}</span>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* =================================================
//             BOTTOM NAVBAR
//         ================================================= */}
//         <div className="border-b border-[#dedcd2]">
//           <div className="mx-auto flex h-[43px] max-w-[1600px] items-center px-4 lg:px-7">
//             {/* Logo Space */}
//             <div className="w-[100px] shrink-0" />

//             {/* ================= DESKTOP NAV ================= */}
//             <nav className="hidden items-center lg:flex">
//               {/* ALL Button */}
//               <button
//                 type="button"
//                 onClick={() => setCategorySidebarOpen(true)}
//                 className="group mr-5 flex items-center gap-[3px] whitespace-nowrap text-[12px] font-medium tracking-[-0.1px] text-[#292725] transition hover:text-[#69272B]"
//               >
//                 <Menu size={17} strokeWidth={1.6} className="mr-[2px]" />
//                 <span>ALL</span>
//               </button>

//               {/* Nav Items from Backend */}
//               {navItems.map((item, index) => renderDesktopNavItem(item, index, 'desktop-'))}
//             </nav>

//             {/* ================= RIGHT ICONS ================= */}
//             <div className="ml-auto flex items-center gap-4">
//               {/* Mobile Search Trigger */}
//               <button
//                 onClick={() => setMobileSearchOpen(true)}
//                 className="mobile-search-trigger lg:hidden"
//                 aria-label="Search"
//               >
//                 <Search size={20} strokeWidth={1.4} />
//               </button>

//               {/* Wishlist */}
//               <Link
//                 href="/wishlist"
//                 aria-label="Wishlist"
//                 className="text-[#292725] transition hover:text-[#69272B]"
//               >
//                 <Heart size={20} strokeWidth={1.4} />
//               </Link>

//               {/* Shopping Bag */}
//               <button
//                 onClick={() => setIsCartOpen(true)}
//                 aria-label="Shopping bag"
//                 className="relative text-[#292725] transition hover:text-[#69272B]"
//               >
//                 <ShoppingBag size={19} strokeWidth={1.4} />
//                 {cartCount > 0 && (
//                   <span
//                     className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full px-1 text-[9px] font-semibold text-white"
//                     style={{ backgroundColor: ACCENT_COLOR }}
//                   >
//                     {cartCount > 9 ? '9+' : cartCount}
//                   </span>
//                 )}
//               </button>

//               {/* Account */}
//               {user ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setUserMenuOpen(!userMenuOpen)}
//                     className="flex items-center justify-center"
//                     aria-label="Account"
//                   >
//                     {getProfilePicture() && !profileImageError ? (
//                       <img
//                         src={getProfilePicture()}
//                         alt={getDisplayName()}
//                         onError={() => setProfileImageError(true)}
//                         className="h-6 w-6 rounded-full object-cover"
//                       />
//                     ) : (
//                       <UserCircle size={20} strokeWidth={1.4} />
//                     )}
//                   </button>

//                   {/* User Dropdown */}
//                   {userMenuOpen && (
//                     <>
//                       <div
//                         className="fixed inset-0 z-40"
//                         onClick={() => setUserMenuOpen(false)}
//                       />
//                       <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
//                         <div className="border-b border-gray-100 bg-[#F5EDE3] px-4 py-3">
//                           <p className="truncate text-sm font-semibold text-gray-900">
//                             {getDisplayName()}
//                           </p>
//                           <p className="truncate text-xs text-gray-500">
//                             {user.email}
//                           </p>
//                         </div>
//                         <div className="py-2">
//                           <button
//                             onClick={() => {
//                               setUserMenuOpen(false);
//                               router.push(getDashboardLink());
//                             }}
//                             className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
//                           >
//                             <LayoutDashboard className="h-4 w-4" style={{ color: ACCENT_COLOR }} />
//                             <span>Dashboard</span>
//                           </button>
//                           <button
//                             onClick={() => {
//                               setUserMenuOpen(false);
//                               router.push(getSettingsLink());
//                             }}
//                             className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
//                           >
//                             <Settings className="h-4 w-4" style={{ color: ACCENT_COLOR }} />
//                             <span>Settings</span>
//                           </button>
//                           <div className="my-1 border-t border-gray-100" />
//                           <button
//                             onClick={() => {
//                               setUserMenuOpen(false);
//                               logout();
//                             }}
//                             className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
//                           >
//                             <LogOut className="h-4 w-4" />
//                             <span>Logout</span>
//                           </button>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ) : (
//                 <Link
//                   href="/login"
//                   aria-label="Account"
//                   className="text-[#292725] transition hover:text-[#69272B]"
//                 >
//                   <User size={20} strokeWidth={1.4} />
//                 </Link>
//               )}

//               {/* Mobile Menu Toggle */}
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen((prev) => !prev)}
//                 aria-label="Toggle menu"
//                 className="lg:hidden"
//               >
//                 {mobileMenuOpen ? (
//                   <X size={22} strokeWidth={1.5} />
//                 ) : (
//                   <Menu size={22} strokeWidth={1.5} />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* =================================================
//             MOBILE MENU
//         ================================================= */}
//         {mobileMenuOpen && (
//           <div className="border-b border-[#ededeb] bg-white lg:hidden">
//             <nav className="flex flex-col px-4">
//               {/* ALL Button */}
//               <button
//                 type="button"
//                 onClick={() => {
//                   setCategorySidebarOpen(true);
//                   setMobileMenuOpen(false);
//                 }}
//                 className="flex min-h-[40px] items-center justify-between border-b border-[#eeeeee] text-left text-[12px] font-medium text-[#292725]"
//               >
//                 <span className="flex items-center gap-2">
//                   <Menu size={17} strokeWidth={1.6} />
//                   ALL
//                 </span>
//               </button>

//               {/* Nav Items */}
//               {navItems.map((item, index) => renderMobileNavItem(item, index))}
//             </nav>
//           </div>
//         )}
//       </header>

//       {/* =====================================================
//           MOBILE SEARCH OVERLAY
//       ===================================================== */}
//       {mobileSearchOpen && (
//         <div className="fixed left-0 right-0 top-16 z-40 border-b border-[#E8E0D8] bg-white shadow-lg lg:hidden">
//           <div className="mx-auto px-4 py-3" ref={mobileSearchRef}>
//             <form onSubmit={handleSearchSubmit} className="relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search products here"
//                 className="w-full rounded-lg border-2 border-transparent bg-[#F5EDE3] px-4 py-3 pr-20 text-sm text-[#3D3D3D] transition-all focus:border-[#69272B] focus:outline-none"
//                 autoFocus
//               />
//               <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
//                 <button type="submit" className="p-1.5">
//                   {searchLoading ? (
//                     <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#69272B] border-t-transparent" />
//                   ) : (
//                     <Search className="h-4 w-4 text-[#69272B]" />
//                   )}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setMobileSearchOpen(false);
//                     setSearchQuery('');
//                     setShowResults(false);
//                   }}
//                   className="p-1.5"
//                 >
//                   <X className="h-4 w-4 text-gray-500" />
//                 </button>
//               </div>
//             </form>

//             {/* Mobile Search Results */}
//             {showResults && searchResults.length > 0 && (
//               <div className="mt-3 max-h-80 overflow-y-auto rounded-lg border border-gray-200 bg-white">
//                 {searchResults.map((product) => (
//                   <button
//                     key={product._id}
//                     onMouseDown={(e) => {
//                       e.preventDefault();
//                       handleResultClick(product);
//                     }}
//                     className="flex w-full items-center gap-3 border-b border-gray-100 px-3 py-3 text-left transition hover:bg-gray-50 last:border-0"
//                   >
//                     {product.images?.[0] ? (
//                       <img
//                         src={product.images[0]?.url || product.images[0]}
//                         alt={product.productName || product.name}
//                         className="h-12 w-12 rounded-lg object-cover bg-gray-100"
//                       />
//                     ) : (
//                       <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
//                         <Package className="h-6 w-6 text-gray-400" />
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       <p className="truncate text-sm font-medium text-gray-900">
//                         {product.productName || product.name || product.title}
//                       </p>
//                       <p className="text-sm font-semibold" style={{ color: ACCENT_COLOR }}>
//                         ৳{product.discountPrice || product.regularPrice || product.price}
//                       </p>
//                     </div>
//                   </button>
//                 ))}
//                 <button
//                   onClick={handleSearchSubmit}
//                   className="w-full px-4 py-3 text-center text-sm font-medium border-t border-gray-100"
//                   style={{ color: ACCENT_COLOR }}
//                 >
//                   View all results for &quot;{searchQuery}&quot; →
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* =====================================================
//           STICKY NAVBAR AFTER SCROLL
//       ===================================================== */}
//       <div
//         className={`
//           fixed left-0 right-0 top-0 z-50 border-b border-[#dedcd2] bg-[#F1EFE3]
//           shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300
//           ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full pointer-events-none opacity-0'}
//         `}
//       >
//         <div className="mx-auto flex h-[52px] max-w-[1600px] items-center px-4 lg:px-7">
//           {/* Small Logo */}
//           <Link href="/" className="flex h-full w-[100px] shrink-0 items-center justify-start">
//             {navbarData?.logo?.logoUrl ? (
//               <img
//                 src={getLogoUrl(navbarData.logo.logoUrl)}
//                 alt="Logo"
//                 className="max-h-[44px] max-w-[70px] object-contain"
//               />
//             ) : (
//               <div className="flex flex-col">
//                 <span className="text-sm font-bold" style={{ color: styles.textColor }}>
//                   {navbarData?.logo?.text || "Nishat's Collection"}
//                 </span>
//               </div>
//             )}
//           </Link>

//           {/* Sticky Desktop Nav */}
//           <nav className="hidden items-center lg:flex">
//             <button
//               type="button"
//               onClick={() => setCategorySidebarOpen(true)}
//               className="group mr-5 flex items-center gap-[3px] whitespace-nowrap text-[12px] font-medium text-[#292725] transition hover:text-[#69272B]"
//             >
//               <Menu size={17} strokeWidth={1.6} className="mr-[2px]" />
//               ALL
//             </button>

//             {navItems.map((item, index) => renderDesktopNavItem(item, index, 'sticky-'))}
//           </nav>

//           {/* Sticky Right Icons */}
//           <div className="ml-auto flex items-center gap-4">
//             <Link href="/wishlist" aria-label="Wishlist" className="text-[#292725] transition hover:text-[#69272B]">
//               <Heart size={20} strokeWidth={1.4} />
//             </Link>
//             <button
//               onClick={() => setIsCartOpen(true)}
//               aria-label="Shopping bag"
//               className="relative text-[#292725] transition hover:text-[#69272B]"
//             >
//               <ShoppingBag size={19} strokeWidth={1.4} />
//               {cartCount > 0 && (
//                 <span
//                   className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full px-1 text-[9px] font-semibold text-white"
//                   style={{ backgroundColor: ACCENT_COLOR }}
//                 >
//                   {cartCount > 9 ? '9+' : cartCount}
//                 </span>
//               )}
//             </button>
//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center justify-center"
//                   aria-label="Account"
//                 >
//                   {getProfilePicture() && !profileImageError ? (
//                     <img
//                       src={getProfilePicture()}
//                       alt={getDisplayName()}
//                       onError={() => setProfileImageError(true)}
//                       className="h-6 w-6 rounded-full object-cover"
//                     />
//                   ) : (
//                     <UserCircle size={20} strokeWidth={1.4} />
//                   )}
//                 </button>
//                 {userMenuOpen && (
//                   <>
//                     <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
//                     <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
//                       <div className="border-b border-gray-100 bg-[#F5EDE3] px-4 py-3">
//                         <p className="truncate text-sm font-semibold text-gray-900">{getDisplayName()}</p>
//                         <p className="truncate text-xs text-gray-500">{user.email}</p>
//                       </div>
//                       <div className="py-2">
//                         <button
//                           onClick={() => {
//                             setUserMenuOpen(false);
//                             router.push(getDashboardLink());
//                           }}
//                           className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
//                         >
//                           <LayoutDashboard className="h-4 w-4" style={{ color: ACCENT_COLOR }} />
//                           <span>Dashboard</span>
//                         </button>
//                         <button
//                           onClick={() => {
//                             setUserMenuOpen(false);
//                             router.push(getSettingsLink());
//                           }}
//                           className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
//                         >
//                           <Settings className="h-4 w-4" style={{ color: ACCENT_COLOR }} />
//                           <span>Settings</span>
//                         </button>
//                         <div className="my-1 border-t border-gray-100" />
//                         <button
//                           onClick={() => {
//                             setUserMenuOpen(false);
//                             logout();
//                           }}
//                           className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
//                         >
//                           <LogOut className="h-4 w-4" />
//                           <span>Logout</span>
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <Link href="/login" aria-label="Account" className="text-[#292725] transition hover:text-[#69272B]">
//                 <User size={20} strokeWidth={1.4} />
//               </Link>
//             )}
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen((prev) => !prev)}
//               aria-label="Toggle menu"
//               className="lg:hidden"
//             >
//               {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           CATEGORY SIDEBAR
//       ===================================================== */}
//       <CategorySidebar
//         isOpen={categorySidebarOpen}
//         onClose={() => setCategorySidebarOpen(false)}
//         categories={navbarData?.categories || []}
//       />

//       {/* =====================================================
//           OUTLET MODAL
//       ===================================================== */}
//       <OutletModal
//         isOpen={outletModalOpen}
//         onClose={() => setOutletModalOpen(false)}
//         outlet={navbarData?.outlet}
//       />

//       {/* =====================================================
//           CART SIDEBAR
//       ===================================================== */}
//       <CartSidebar
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//       />
//     </>
//   );
// }
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Phone,
  Truck,
  Menu,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  X,
  Package,
  LayoutDashboard,
  Settings,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import CartSidebar from '../CartSidebar';
import OutletModal from '../OutletModal';
import CategorySidebar from '../CategorySidebar';
import { useNavbar } from '@/app/hooks/useNavbar';

// ============================================================
// API URL
// ============================================================
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================================
// THEME COLOR
// ============================================================
const ACCENT_COLOR = '#69272B';

export default function Navbar() {
  // ============================================================
  // HOOKS
  // ============================================================
  const { navbarData, loading: navbarLoading } = useNavbar();
  const pathname = usePathname();
  const router = useRouter();

  // ============================================================
  // STATES
  // ============================================================
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categorySidebarOpen, setCategorySidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [outletModalOpen, setOutletModalOpen] = useState(false);

  // Search states
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // User states
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileImageError, setProfileImageError] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Mobile expansion state
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);

  // Refs
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // ============================================================
  // STYLING - from backend
  // ============================================================
  const styles = navbarData?.styling || {
    primaryColor: ACCENT_COLOR,
    primaryLight: '#A8B8A0',
    primaryDark: '#6B7D63',
    backgroundColor: '#F1EFE3',
    textColor: '#292725',
    accentColor: '#d83a38',
  };

  // ============================================================
  // SCROLL DETECTION
  // ============================================================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on scroll (desktop only behavior — mobile menu is independent)
  useEffect(() => {
    if (
      isScrolled &&
      typeof window !== 'undefined' &&
      window.innerWidth >= 1024
    ) {
      setMobileMenuOpen(false);
    }
  }, [isScrolled]);

  // ============================================================
  // CHECK USER STATE
  // ============================================================
  const checkUserState = () => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setProfileImageError(false);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    }
  };

  // ============================================================
  // FETCH CART COUNT
  // ============================================================
  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        const sessionId = localStorage.getItem('cartSessionId');
        if (sessionId) {
          headers['x-session-id'] = sessionId;
        }
      }

      const response = await fetch(`${API_URL}/api/cart`, { headers });

      if (response.ok) {
        const data = await response.json();
        setCartCount(data.data?.totalItems || 0);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error('Fetch cart count error:', error);
      setCartCount(0);
    }
  };

  // ============================================================
  // AUTH + CART EVENTS
  // ============================================================
  useEffect(() => {
    checkUserState();
    fetchCartCount();

    const handleAuthChange = () => {
      checkUserState();
      fetchCartCount();
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('focus', handleAuthChange);
    window.addEventListener('cart-update', fetchCartCount);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('focus', handleAuthChange);
      window.removeEventListener('cart-update', fetchCartCount);
    };
  }, []);

  // Fetch cart when pathname changes
  useEffect(() => {
    fetchCartCount();
  }, [pathname]);

  // ============================================================
  // CLOSE SEARCH ON OUTSIDE CLICK
  // ============================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        if (!event.target.closest('.search-trigger')) {
          setSearchOpen(false);
        }
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        // Keep mobile search query so user can continue typing
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ============================================================
  // PREVENT BODY SCROLL WHEN MOBILE MENU OPEN
  // ============================================================
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // ============================================================
  // SEARCH
  // ============================================================
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setSearchLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/products?search=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();

      if (data.success && data.data && data.data.length > 0) {
        setSearchResults(data.data);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setSearchLoading(false);
    }
  };

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  // Search result click
  const handleResultClick = (result) => {
    const productId = result._id;
    const productSlug = result.slug || productId;

    if (productSlug) {
      setSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
      setTimeout(() => {
        router.push(`/product/${productSlug}`);
      }, 50);
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // ============================================================
  // LOGOUT
  // ============================================================
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCartCount(0);
    setUserMenuOpen(false);

    window.dispatchEvent(new Event('cart-update'));
    window.dispatchEvent(new Event('auth-change'));

    toast.success('Logged out successfully!');
    router.push('/');
  };

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================
  const getDashboardLink = () => {
    if (!user) return '/';
    if (['admin', 'super_admin', 'moderator'].includes(user.role)) {
      return '/authorize/dashboard';
    }
    if (user.role === 'call_center_agent') {
      return '/agent/dashboard';
    }
    return '/customer/dashboard';
  };

  const getSettingsLink = () => {
    if (!user) return '/';
    if (['admin', 'super_admin', 'moderator'].includes(user.role)) {
      return '/authorize/settings';
    }
    if (user.role === 'call_center_agent') {
      return '/agent/settings';
    }
    return '/customer/settings';
  };

  const getDisplayName = () => {
    if (!user) return '';
    return (
      user.companyName ||
      user.contactPerson ||
      user.email?.split('@')[0] ||
      'User'
    );
  };

  const getInitials = () => {
    if (!user) return 'U';
    return getDisplayName().charAt(0).toUpperCase();
  };

  const getProfilePicture = () => {
    return user?.profilePicture || user?.photoURL || null;
  };

  const getLogoUrl = (url) => {
    if (!url) return '/logo.png';
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        return `${parts[0]}/upload/f_auto,q_auto:good,fl_preserve_transparency/${parts[1]}`;
      }
    }
    return url;
  };

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // Get navigation items from backend
  const navItems =
    navbarData?.items?.filter((item) => item.isActive !== false) || [];

  // Toggle mobile category expansion
  const toggleMobileCategory = (itemId) => {
    setExpandedMobileCategory((prev) => (prev === itemId ? null : itemId));
  };

  // ============================================================
  // LOADING
  // ============================================================
  if (authLoading || navbarLoading) {
    return (
      <div className="fixed top-0 z-50 w-full bg-[#F1EFE3]">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center px-4">
          <div className="h-10 w-24 animate-pulse rounded bg-black/10" />
          <div className="ml-auto flex gap-4">
            <div className="h-8 w-8 animate-pulse rounded bg-black/10" />
            <div className="h-8 w-8 animate-pulse rounded bg-black/10" />
            <div className="h-8 w-8 animate-pulse rounded bg-black/10" />
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER NAV ITEM (Desktop)
  // ============================================================
  const renderDesktopNavItem = (item, index, prefix = '') => {
    const itemKey = `${prefix}${item.id || index}`;

    // Category type with subcategories - show dropdown
    if (
      item.type === 'category' &&
      item.category?.subcategories?.length > 0
    ) {
      const categoryUrl =
        item.href ||
        `/products?category=${item.category?.slug || item.category?._id}`;

      return (
        <div key={itemKey} className="group relative mr-5">
          <Link
            href={categoryUrl}
            className={`flex items-center gap-[3px] whitespace-nowrap text-[12px] font-medium tracking-[-0.1px] transition hover:text-[#69272B] ${
              item.highlight ? 'text-[#d83a38]' : 'text-[#292725]'
            }`}
          >
            <span>{item.name}</span>
            <ChevronDown
              size={11}
              strokeWidth={1.4}
              className="transition-transform duration-200 group-hover:rotate-180"
            />
          </Link>

          {/* Dropdown */}
          <div className="invisible absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-lg border border-gray-200 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
            {item.category.subcategories.map((sub) => {
              const subSlug = sub.slug || sub._id;
              const hasChildren = sub.children?.length > 0;

              if (hasChildren) {
                return (
                  <div key={sub._id || sub.id} className="group/sub relative">
                    <Link
                      href={`/products?category=${
                        item.category.slug || item.category._id
                      }&subcategory=${subSlug}`}
                      className="flex items-center justify-between px-4 py-2 text-[12px] text-gray-700 transition hover:bg-gray-50 hover:text-[#69272B]"
                    >
                      <span>{sub.name}</span>
                      <ChevronDown size={12} className="-rotate-90" />
                    </Link>

                    <div className="invisible absolute left-full top-0 ml-1 min-w-[180px] rounded-lg border border-gray-200 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover/sub:visible group-hover/sub:opacity-100">
                      {sub.children.map((child) => (
                        <Link
                          key={child._id || child.id}
                          href={`/products?category=${
                            item.category.slug || item.category._id
                          }&subcategory=${subSlug}&child=${
                            child.slug || child._id
                          }`}
                          className="block px-4 py-2 text-[12px] text-gray-600 transition hover:bg-gray-50 hover:text-[#69272B]"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={sub._id || sub.id}
                  href={`/products?category=${
                    item.category.slug || item.category._id
                  }&subcategory=${subSlug}`}
                  className="block px-4 py-2 text-[12px] text-gray-700 transition hover:bg-gray-50 hover:text-[#69272B]"
                >
                  {sub.name}
                </Link>
              );
            })}
          </div>
        </div>
      );
    }

    // Category type without subcategories
    if (item.type === 'category' && item.category) {
      const categoryUrl =
        item.href ||
        `/products?category=${item.category?.slug || item.category?._id}`;
      return (
        <Link
          key={itemKey}
          href={categoryUrl}
          className={`group mr-5 flex items-center gap-[3px] whitespace-nowrap text-[12px] font-medium tracking-[-0.1px] transition hover:text-[#69272B] ${
            item.highlight ? 'text-[#d83a38]' : 'text-[#292725]'
          }`}
        >
          <span>{item.name}</span>
        </Link>
      );
    }

    // Normal link item
    return (
      <Link
        key={itemKey}
        href={item.href || '/'}
        className={`group mr-5 flex items-center gap-[3px] whitespace-nowrap text-[12px] font-medium tracking-[-0.1px] transition hover:text-[#69272B] ${
          item.highlight ? 'text-[#d83a38]' : 'text-[#292725]'
        }`}
      >
        <span>{item.name}</span>
      </Link>
    );
  };

  // ============================================================
  // RENDER MOBILE NAV ITEM (inside sidebar)
  // ============================================================
  const renderMobileNavItem = (item, index) => {
    const itemKey = `mobile-${item.id || index}`;
    const hasSubcategories =
      item.type === 'category' && item.category?.subcategories?.length > 0;
    const isExpanded = expandedMobileCategory === (item.id || index);

    if (hasSubcategories) {
      const categoryUrl =
        item.href ||
        `/products?category=${item.category?.slug || item.category?._id}`;

      return (
        <div key={itemKey}>
          <div
            className={`flex min-h-[48px] items-center justify-between border-b border-[#eeeeee] text-[13px] font-medium ${
              item.highlight ? 'text-[#d83a38]' : 'text-[#292725]'
            }`}
          >
            <Link
              href={categoryUrl}
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-3"
            >
              {item.name}
            </Link>
            <button
              onClick={() => toggleMobileCategory(item.id || index)}
              className="p-3"
              aria-label="Toggle subcategories"
            >
              <ChevronDown
                size={16}
                strokeWidth={1.6}
                className={`transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden bg-gray-50"
              >
                <div className="py-1">
                  {item.category.subcategories.map((sub) => {
                    const subSlug = sub.slug || sub._id;
                    return (
                      <Link
                        key={sub._id || sub.id}
                        href={`/products?category=${
                          item.category.slug || item.category._id
                        }&subcategory=${subSlug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-6 py-2.5 text-[12px] text-gray-600 transition hover:bg-gray-100 hover:text-[#69272B]"
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link
        key={itemKey}
        href={item.href || '/'}
        onClick={() => setMobileMenuOpen(false)}
        className={`flex min-h-[48px] items-center justify-between border-b border-[#eeeeee] text-[13px] font-medium ${
          item.highlight ? 'text-[#d83a38]' : 'text-[#292725]'
        }`}
      >
        <span>{item.name}</span>
      </Link>
    );
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      {/* =====================================================
          MOBILE HEADER
          TOP:
            Search + Phone / Truck / MapPin
          BOTTOM:
            Menu + Logo + Wishlist / Bag / User

          On scroll:
            TOP ROW hides
            BOTTOM ROW becomes fixed to top
      ===================================================== */}
      <header
        className={`
          block w-full bg-[#F1EFE3] text-[#292725] lg:hidden
          transition-all duration-300
          ${isScrolled ? 'pt-0' : '-mt-16'}
        `}
      >
        {/* =================================================
            MOBILE TOP ROW — hidden after scrolling
            Height reduced: 52 → 42
        ================================================= */}
        <div
          className={`
            overflow-hidden border-b border-[#dedcd2]
            transition-all duration-300
            ${
              isScrolled
                ? 'max-h-0 border-b-0 opacity-0'
                : 'max-h-[42px] opacity-100'
            }
          `}
        >
          <div className="flex h-[42px] items-center gap-2 px-3">
            {/* Search bar */}
            <div className="relative flex-1" ref={mobileSearchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search
                  size={14}
                  strokeWidth={1.5}
                  className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#777]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="
                    h-[30px] w-full rounded-full
                    border border-[#dedbd7]
                    bg-white pl-8 pr-3
                    text-[11px] text-[#333]
                    outline-none
                    focus:border-[#69272B]
                  "
                />
              </form>

              {showResults && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-[38px] z-[60] max-h-80 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                  {searchResults.map((product) => (
                    <button
                      key={product._id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleResultClick(product);
                      }}
                      className="
                        flex w-full items-center gap-3
                        border-b border-gray-100
                        px-3 py-3 text-left
                        transition hover:bg-gray-50
                        last:border-0
                      "
                    >
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]?.url || product.images[0]}
                          alt={product.productName || product.name}
                          className="h-12 w-12 rounded-lg bg-gray-100 object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {product.productName ||
                            product.name ||
                            product.title}
                        </p>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: ACCENT_COLOR }}
                        >
                          ৳
                          {product.discountPrice ||
                            product.regularPrice ||
                            product.price}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right icons */}
            <div className="flex shrink-0 items-center gap-0.5">
              {navbarData?.topBar?.phone && (
                <Link
                  href={navbarData.topBar.phoneLink || '/contact'}
                  aria-label="Call us"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#292725] transition hover:bg-black/5"
                >
                  <Phone size={16} strokeWidth={1.6} />
                </Link>
              )}

              {navbarData?.topBar?.showTrackOrder !== false && (
                <Link
                  href={navbarData.topBar.trackOrderLink || '/track'}
                  aria-label="Track order"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#292725] transition hover:bg-black/5"
                >
                  <Truck size={16} strokeWidth={1.6} />
                </Link>
              )}

              {navbarData?.topBar?.showOutlet !== false && (
                <button
                  onClick={() => setOutletModalOpen(true)}
                  aria-label="Our outlet"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#292725] transition hover:bg-black/5"
                >
                  <MapPin size={16} strokeWidth={1.6} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            MOBILE BOTTOM ROW — becomes fixed on scroll
            Height reduced: 56 → 48
        ================================================= */}
        <div
          className={`
            border-b border-[#dedcd2] bg-[#F1EFE3]
            transition-all duration-300
            ${
              isScrolled
                ? 'fixed left-0 right-0 top-0 z-50 shadow-[0_2px_10px_rgba(0,0,0,0.04)]'
                : 'relative'
            }
          `}
        >
          <div className="flex h-[48px] items-center px-3">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#292725] transition hover:bg-black/5"
              >
                <Menu size={20} strokeWidth={1.6} />
              </button>

              <Link href="/" className="flex items-center pl-1">
                {navbarData?.logo?.logoUrl ? (
                  <img
                    src={getLogoUrl(navbarData.logo.logoUrl)}
                    alt={navbarData.logo.text || 'Logo'}
                    className={`
                      w-auto object-contain transition-all duration-300
                      ${
                        isScrolled
                          ? 'h-6 max-w-[90px]'
                          : 'h-7 max-w-[100px]'
                      }
                    `}
                  />
                ) : (
                  <div className="flex flex-col leading-tight">
                    <span
                      className="text-[13px] font-bold"
                      style={{ color: styles.textColor }}
                    >
                      {navbarData?.logo?.text || "Nishat's Collection"}
                    </span>
                    {navbarData?.logo?.highlightText && (
                      <span
                        className="text-[7px] font-medium tracking-widest"
                        style={{ color: ACCENT_COLOR }}
                      >
                        {navbarData.logo.highlightText}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            </div>

            {/* Right: Wishlist + Bag + Account */}
            <div className="ml-auto flex items-center gap-0.5">
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#292725] transition hover:bg-black/5"
              >
                <Heart size={18} strokeWidth={1.5} />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping bag"
                className="relative flex h-8 w-8 items-center justify-center rounded-full text-[#292725] transition hover:bg-black/5"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span
                    className="absolute right-0 top-0 flex h-[14px] min-w-[14px] items-center justify-center rounded-full px-1 text-[8px] font-semibold text-white"
                    style={{ backgroundColor: ACCENT_COLOR }}
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {user ? (
                <Link
                  href={getDashboardLink()}
                  aria-label="Account"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#292725] transition hover:bg-black/5"
                >
                  {getProfilePicture() && !profileImageError ? (
                    <img
                      src={getProfilePicture()}
                      alt={getDisplayName()}
                      onError={() => setProfileImageError(true)}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle size={18} strokeWidth={1.5} />
                  )}
                </Link>
              ) : (
                <Link
                  href="/login"
                  aria-label="Account"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#292725] transition hover:bg-black/5"
                >
                  <User size={18} strokeWidth={1.5} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            SPACER — matches new bottom row height (48)
        ================================================= */}
        <div
          className={`
            transition-[height] duration-300 ease-out
            ${isScrolled ? 'h-[48px]' : 'h-0'}
          `}
          aria-hidden="true"
        />
      </header>

      {/* =====================================================
          DESKTOP HEADER (hidden below lg)
      ===================================================== */}
      <header
        className={`
          relative hidden w-full bg-[#F1EFE3] text-[#292725] lg:-mt-16 lg:block
          transition-all duration-300
          ${
            isScrolled
              ? 'pointer-events-none opacity-0'
              : 'opacity-100'
          }
        `}
      >
        {/* LOGO */}
        <Link
          href="/"
          className="absolute left-4 top-0 z-30 flex h-[89px] w-[100px] items-center justify-center lg:left-7"
        >
          {navbarData?.logo?.logoUrl ? (
            <img
              src={getLogoUrl(navbarData.logo.logoUrl)}
              alt={navbarData.logo.text || 'Logo'}
              className="h-auto max-h-[78px] w-auto max-w-[90px] object-contain"
            />
          ) : (
            <div className="flex flex-col items-center">
              <span
                className="text-lg font-bold"
                style={{ color: styles.textColor }}
              >
                {navbarData?.logo?.text || "Nishat's Collection"}
              </span>
              {navbarData?.logo?.highlightText && (
                <span
                  className="text-[10px] font-medium tracking-widest"
                  style={{ color: ACCENT_COLOR }}
                >
                  {navbarData.logo.highlightText}
                </span>
              )}
            </div>
          )}
        </Link>

        {/* TOP NAVBAR */}
        <div className="border-b border-[#dedcd2]">
          <div className="relative mx-auto flex h-[46px] max-w-[1600px] items-center px-4 lg:px-7">
            <div className="w-[100px] shrink-0" />

            {/* SEARCH */}
            <div className="absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-full" ref={searchRef}>
                {!searchOpen ? (
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="search-trigger flex h-[33px] w-full items-center rounded-[8px] border border-[#dedbd7] bg-white pl-9 pr-3 text-left transition hover:border-[#69272B]"
                  >
                    <Search
                      size={15}
                      strokeWidth={1.4}
                      className="absolute left-3 text-[#777]"
                    />
                    <span className="text-[11px] text-[#999]">
                      Search products here
                    </span>
                  </button>
                ) : (
                  <div className="relative">
                    <form onSubmit={handleSearchSubmit}>
                      <Search
                        size={15}
                        strokeWidth={1.4}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]"
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products here"
                        className="h-[33px] w-full rounded-[8px] border border-[#69272B] bg-white pl-9 pr-16 text-[11px] text-[#333] outline-none"
                        autoFocus
                      />
                      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
                        {searchLoading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#69272B] border-t-transparent" />
                        ) : (
                          <button type="submit" className="p-1">
                            <Search size={14} className="text-[#777]" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                            setShowResults(false);
                          }}
                          className="p-1"
                        >
                          <X size={14} className="text-[#777]" />
                        </button>
                      </div>
                    </form>

                    {showResults && searchResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg z-50">
                        {searchResults.map((product) => (
                          <button
                            key={product._id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleResultClick(product);
                            }}
                            className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-50 last:border-0"
                          >
                            {product.images?.[0] ? (
                              <img
                                src={
                                  product.images[0]?.url ||
                                  product.images[0]
                                }
                                alt={product.productName || product.name}
                                className="h-10 w-10 rounded-lg object-cover bg-gray-100"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                <Package className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="truncate text-sm font-medium text-gray-900">
                                {product.productName ||
                                  product.name ||
                                  product.title}
                              </p>
                              <p
                                className="text-sm font-semibold"
                                style={{ color: ACCENT_COLOR }}
                              >
                                ৳
                                {product.discountPrice ||
                                  product.regularPrice ||
                                  product.price}
                              </p>
                            </div>
                          </button>
                        ))}
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full px-4 py-3 text-center text-sm font-medium border-t border-gray-100 transition hover:bg-gray-50"
                          style={{ color: ACCENT_COLOR }}
                        >
                          View all results for &quot;{searchQuery}&quot; →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* TOP INFO */}
            <div className="ml-auto hidden items-center gap-6 lg:flex">
              {navbarData?.topBar?.phone && (
                <Link
                  href={navbarData.topBar.phoneLink || '/contact'}
                  className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#292725] transition hover:text-[#69272B]"
                >
                  <Phone size={17} strokeWidth={1.4} />
                  <span>{navbarData.topBar.phone}</span>
                </Link>
              )}

              {navbarData?.topBar?.showOutlet !== false && (
                <button
                  onClick={() => setOutletModalOpen(true)}
                  className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#292725] transition hover:text-[#69272B]"
                >
                  <MapPin size={17} strokeWidth={1.4} />
                  <span>
                    {navbarData?.topBar?.outletText || 'Our Outlet'}
                  </span>
                </button>
              )}

              {navbarData?.topBar?.showTrackOrder !== false && (
                <Link
                  href={navbarData.topBar.trackOrderLink || '/track'}
                  className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#292725] transition hover:text-[#69272B]"
                >
                  <Truck size={19} strokeWidth={1.4} />
                  <span>
                    {navbarData?.topBar?.trackOrderText || 'Track Order'}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM NAVBAR */}
        <div className="border-b border-[#dedcd2]">
          <div className="mx-auto flex h-[43px] max-w-[1600px] items-center px-4 lg:px-7">
            <div className="w-[100px] shrink-0" />

            <nav className="hidden items-center lg:flex">
              <button
                type="button"
                onClick={() => setCategorySidebarOpen(true)}
                className="group mr-5 flex items-center gap-[3px] whitespace-nowrap text-[12px] font-medium tracking-[-0.1px] text-[#292725] transition hover:text-[#69272B]"
              >
                <Menu size={17} strokeWidth={1.6} className="mr-[2px]" />
                <span>ALL</span>
              </button>

              {navItems.map((item, index) =>
                renderDesktopNavItem(item, index, 'desktop-')
              )}
            </nav>

            <div className="ml-auto flex items-center gap-4">
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="text-[#292725] transition hover:text-[#69272B]"
              >
                <Heart size={20} strokeWidth={1.4} />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping bag"
                className="relative text-[#292725] transition hover:text-[#69272B]"
              >
                <ShoppingBag size={19} strokeWidth={1.4} />
                {cartCount > 0 && (
                  <span
                    className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full px-1 text-[9px] font-semibold text-white"
                    style={{ backgroundColor: ACCENT_COLOR }}
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center justify-center"
                    aria-label="Account"
                  >
                    {getProfilePicture() && !profileImageError ? (
                      <img
                        src={getProfilePicture()}
                        alt={getDisplayName()}
                        onError={() => setProfileImageError(true)}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle size={20} strokeWidth={1.4} />
                    )}
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                        <div className="border-b border-gray-100 bg-[#F5EDE3] px-4 py-3">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {getDisplayName()}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {user.email}
                          </p>
                        </div>
                        <div className="py-2">
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              router.push(getDashboardLink());
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                          >
                            <LayoutDashboard
                              className="h-4 w-4"
                              style={{ color: ACCENT_COLOR }}
                            />
                            <span>Dashboard</span>
                          </button>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              router.push(getSettingsLink());
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                          >
                            <Settings
                              className="h-4 w-4"
                              style={{ color: ACCENT_COLOR }}
                            />
                            <span>Settings</span>
                          </button>
                          <div className="my-1 border-t border-gray-100" />
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              logout();
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  aria-label="Account"
                  className="text-[#292725] transition hover:text-[#69272B]"
                >
                  <User size={20} strokeWidth={1.4} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          STICKY NAVBAR AFTER SCROLL (DESKTOP ONLY)
      ===================================================== */}
      <div
        className={`
          fixed left-0 right-0 top-0 z-50 hidden border-b border-[#dedcd2] bg-[#F1EFE3] lg:block
          shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300
          ${
            isScrolled
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full pointer-events-none opacity-0'
          }
        `}
      >
        <div className="mx-auto flex h-[52px] max-w-[1600px] items-center px-4 lg:px-7">
          <Link
            href="/"
            className="flex h-full w-[100px] shrink-0 items-center justify-start"
          >
            {navbarData?.logo?.logoUrl ? (
              <img
                src={getLogoUrl(navbarData.logo.logoUrl)}
                alt="Logo"
                className="max-h-[44px] max-w-[70px] object-contain"
              />
            ) : (
              <div className="flex flex-col">
                <span
                  className="text-sm font-bold"
                  style={{ color: styles.textColor }}
                >
                  {navbarData?.logo?.text || "Nishat's Collection"}
                </span>
              </div>
            )}
          </Link>

          <nav className="hidden items-center lg:flex">
            <button
              type="button"
              onClick={() => setCategorySidebarOpen(true)}
              className="group mr-5 flex items-center gap-[3px] whitespace-nowrap text-[12px] font-medium text-[#292725] transition hover:text-[#69272B]"
            >
              <Menu size={17} strokeWidth={1.6} className="mr-[2px]" />
              ALL
            </button>

            {navItems.map((item, index) =>
              renderDesktopNavItem(item, index, 'sticky-')
            )}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="text-[#292725] transition hover:text-[#69272B]"
            >
              <Heart size={20} strokeWidth={1.4} />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping bag"
              className="relative text-[#292725] transition hover:text-[#69272B]"
            >
              <ShoppingBag size={19} strokeWidth={1.4} />
              {cartCount > 0 && (
                <span
                  className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full px-1 text-[9px] font-semibold text-white"
                  style={{ backgroundColor: ACCENT_COLOR }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center justify-center"
                  aria-label="Account"
                >
                  {getProfilePicture() && !profileImageError ? (
                    <img
                      src={getProfilePicture()}
                      alt={getDisplayName()}
                      onError={() => setProfileImageError(true)}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle size={20} strokeWidth={1.4} />
                  )}
                </button>
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                      <div className="border-b border-gray-100 bg-[#F5EDE3] px-4 py-3">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {getDisplayName()}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            router.push(getDashboardLink());
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                        >
                          <LayoutDashboard
                            className="h-4 w-4"
                            style={{ color: ACCENT_COLOR }}
                          />
                          <span>Dashboard</span>
                        </button>
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            router.push(getSettingsLink());
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                        >
                          <Settings
                            className="h-4 w-4"
                            style={{ color: ACCENT_COLOR }}
                          />
                          <span>Settings</span>
                        </button>
                        <div className="my-1 border-t border-gray-100" />
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                aria-label="Account"
                className="text-[#292725] transition hover:text-[#69272B]"
              >
                <User size={20} strokeWidth={1.4} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE SIDEBAR MENU
      ===================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 z-[100] flex h-screen w-[85vw] max-w-[360px] flex-col bg-white shadow-2xl lg:hidden"
            >
              {/* Header */}
              <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-gray-200 px-4">
                <span className="text-sm font-semibold uppercase tracking-wide text-[#292725]">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
                >
                  <X size={20} strokeWidth={1.8} />
                </button>
              </div>

              {/* Nav Items */}
              <div className="flex-1 overflow-y-auto">
                <nav className="flex flex-col px-2 py-2">
                  {/* ========================================
                      ALL CATEGORIES — expands inline
                  ======================================== */}
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        toggleMobileCategory('__all_categories__')
                      }
                      className="flex min-h-[48px] w-full items-center justify-between rounded-lg px-3 text-left text-[13px] font-semibold text-[#292725] transition hover:bg-gray-50"
                    >
                      <span>ALL CATEGORIES</span>
                      <ChevronDown
                        size={16}
                        strokeWidth={1.8}
                        className={`transition-transform duration-200 ${
                          expandedMobileCategory === '__all_categories__'
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedMobileCategory === '__all_categories__' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mb-2 ml-3 border-l border-[#eeeeee] py-1 pl-2">
                            {(navbarData?.categories || []).length === 0 ? (
                              <p className="px-3 py-3 text-[12px] text-gray-400">
                                No categories found.
                              </p>
                            ) : (
                              (navbarData?.categories || []).map(
                                (category) => {
                                  const categoryId =
                                    category._id || category.id;
                                  const categorySlug =
                                    category.slug || categoryId;
                                  const hasSubcategories =
                                    category.subcategories?.length > 0;
                                  const catKey = `cat-${categoryId}`;
                                  const isCatExpanded =
                                    expandedMobileCategory === catKey;

                                  return (
                                    <div key={categoryId}>
                                      {/* Category row */}
                                      <div className="flex items-center justify-between">
                                        <Link
                                          href={`/products?category=${categorySlug}`}
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                          className="flex-1 rounded-md px-3 py-2.5 text-[12.5px] font-medium text-[#292725] transition hover:bg-gray-50 hover:text-[#69272B]"
                                        >
                                          {category.name}
                                        </Link>

                                        {hasSubcategories && (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              toggleMobileCategory(
                                                catKey
                                              )
                                            }
                                            aria-label="Toggle subcategories"
                                            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-[#69272B]"
                                          >
                                            <ChevronDown
                                              size={14}
                                              strokeWidth={1.8}
                                              className={`transition-transform duration-200 ${
                                                isCatExpanded
                                                  ? 'rotate-180'
                                                  : ''
                                              }`}
                                            />
                                          </button>
                                        )}
                                      </div>

                                      {/* Subcategories */}
                                      <AnimatePresence initial={false}>
                                        {hasSubcategories &&
                                          isCatExpanded && (
                                            <motion.div
                                              initial={{
                                                height: 0,
                                                opacity: 0,
                                              }}
                                              animate={{
                                                height: 'auto',
                                                opacity: 1,
                                              }}
                                              exit={{
                                                height: 0,
                                                opacity: 0,
                                              }}
                                              transition={{
                                                duration: 0.2,
                                                ease: 'easeOut',
                                              }}
                                              className="overflow-hidden"
                                            >
                                              <div className="ml-3 border-l border-[#eeeeee] py-0.5 pl-2">
                                                {category.subcategories.map(
                                                  (sub) => {
                                                    const subId =
                                                      sub._id || sub.id;
                                                    const subSlug =
                                                      sub.slug || subId;
                                                    const hasChildren =
                                                      sub.children?.length >
                                                      0;
                                                    const subKey = `sub-${subId}`;
                                                    const isSubExpanded =
                                                      expandedMobileCategory ===
                                                      subKey;

                                                    return (
                                                      <div key={subId}>
                                                        <div className="flex items-center justify-between">
                                                          <Link
                                                            href={`/products?category=${categorySlug}&subcategory=${subSlug}`}
                                                            onClick={() =>
                                                              setMobileMenuOpen(
                                                                false
                                                              )
                                                            }
                                                            className="flex-1 rounded-md px-3 py-2 text-[12px] text-gray-600 transition hover:bg-gray-50 hover:text-[#69272B]"
                                                          >
                                                            {sub.name}
                                                          </Link>

                                                          {hasChildren && (
                                                            <button
                                                              type="button"
                                                              onClick={() =>
                                                                toggleMobileCategory(
                                                                  subKey
                                                                )
                                                              }
                                                              aria-label="Toggle child subcategories"
                                                              className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-[#69272B]"
                                                            >
                                                              <ChevronDown
                                                                size={12}
                                                                strokeWidth={
                                                                  1.8
                                                                }
                                                                className={`transition-transform duration-200 ${
                                                                  isSubExpanded
                                                                    ? 'rotate-180'
                                                                    : ''
                                                                }`}
                                                              />
                                                            </button>
                                                          )}
                                                        </div>

                                                        {/* Child subcategories */}
                                                        <AnimatePresence
                                                          initial={false}
                                                        >
                                                          {hasChildren &&
                                                            isSubExpanded && (
                                                              <motion.div
                                                                initial={{
                                                                  height: 0,
                                                                  opacity: 0,
                                                                }}
                                                                animate={{
                                                                  height:
                                                                    'auto',
                                                                  opacity: 1,
                                                                }}
                                                                exit={{
                                                                  height: 0,
                                                                  opacity: 0,
                                                                }}
                                                                transition={{
                                                                  duration: 0.2,
                                                                  ease: 'easeOut',
                                                                }}
                                                                className="overflow-hidden"
                                                              >
                                                                <div className="ml-3 border-l border-[#eeeeee] py-0.5 pl-2">
                                                                  {sub.children.map(
                                                                    (
                                                                      child
                                                                    ) => {
                                                                      const childId =
                                                                        child._id ||
                                                                        child.id;
                                                                      const childSlug =
                                                                        child.slug ||
                                                                        childId;
                                                                      return (
                                                                        <Link
                                                                          key={
                                                                            childId
                                                                          }
                                                                          href={`/products?category=${categorySlug}&subcategory=${subSlug}&child=${childSlug}`}
                                                                          onClick={() =>
                                                                            setMobileMenuOpen(
                                                                              false
                                                                            )
                                                                          }
                                                                          className="block rounded-md px-3 py-1.5 text-[11.5px] text-gray-500 transition hover:bg-gray-50 hover:text-[#69272B]"
                                                                        >
                                                                          {
                                                                            child.name
                                                                          }
                                                                        </Link>
                                                                      );
                                                                    }
                                                                  )}
                                                                </div>
                                                              </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            </motion.div>
                                          )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                }
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Nav items */}
                  {navItems.map((item, index) =>
                    renderMobileNavItem(item, index)
                  )}
                </nav>
              </div>

              {/* Footer — user / auth */}
              <div className="shrink-0 border-t border-gray-200 p-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                      {getProfilePicture() && !profileImageError ? (
                        <img
                          src={getProfilePicture()}
                          alt={getDisplayName()}
                          onError={() => setProfileImageError(true)}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
                          style={{ backgroundColor: ACCENT_COLOR }}
                        >
                          {getInitials()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[#292725]">
                          {getDisplayName()}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        router.push(getDashboardLink());
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#292725] transition hover:bg-gray-50"
                    >
                      <LayoutDashboard
                        size={16}
                        style={{ color: ACCENT_COLOR }}
                      />
                      <span>Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        router.push(getSettingsLink());
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#292725] transition hover:bg-gray-50"
                    >
                      <Settings
                        size={16}
                        style={{ color: ACCENT_COLOR }}
                      />
                      <span>Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-lg py-3 text-sm font-medium text-white transition hover:opacity-90"
                    style={{ backgroundColor: ACCENT_COLOR }}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          CATEGORY SIDEBAR (desktop "ALL" button only)
      ===================================================== */}
      <CategorySidebar
        isOpen={categorySidebarOpen}
        onClose={() => setCategorySidebarOpen(false)}
        categories={navbarData?.categories || []}
      />

      {/* =====================================================
          OUTLET MODAL
      ===================================================== */}
      <OutletModal
        isOpen={outletModalOpen}
        onClose={() => setOutletModalOpen(false)}
        outlet={navbarData?.outlet}
      />

      {/* =====================================================
          CART SIDEBAR
      ===================================================== */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}