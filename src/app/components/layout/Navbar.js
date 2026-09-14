


// 'use client';

// import Link from 'next/link';
// import { useState, useEffect, useRef } from 'react';
// import { usePathname, useRouter } from 'next/navigation';

// import {
//   LogOut,
//   User,
//   LayoutDashboard,
//   ShoppingBag,
//   Search,
//   X,
//   Home,
//   Package,
//   Info,
//   Phone,
//   Menu,
//   UserCircle,
//   ChevronDown,
//   MapPin,
//   Zap,
//   Heart,
//   Sparkles,
//   Settings,
//   Flower2,
// } from 'lucide-react';

// import { toast } from 'sonner';
// import CartSidebar from '../CartSidebar';

// // ============================================================
// // ICON MAPPING
// // ============================================================

// const ICON_MAP = {
//   Home: Home,
//   Zap: Zap,
//   MapPin: MapPin,
//   Info: Info,
//   Phone: Phone,
//   Package: Package,
//   User: User,
//   Heart: Heart,
//   Sparkles: Sparkles,
//   Flower2: Flower2,
// };

// // ============================================================
// // COLOR PALETTE - BEAUTY THEME
// // ============================================================
// // Foundation/Skin tones: Warm beige, nude, tan
// // Green accents: Sage, olive, eucalyptus
// // ============================================================

// const COLORS = {
//   primary: '#8B9D83', // Sage green - main accent
//   primaryLight: '#A8B8A0', // Lighter sage
//   primaryDark: '#6B7D63', // Darker sage
//   primaryBg: '#F2F5F0', // Very light sage background
//   skin: '#F5EDE3', // Light foundation/skin tone
//   skinMedium: '#E8DCD0', // Medium skin tone
//   skinDark: '#D4C4B4', // Darker skin tone
//   text: '#3D3D3D',
//   textLight: '#6B6B6B',
//   white: '#FFFFFF',
//   border: '#E8E0D8',
// };

// export default function Navbar() {
//   // ============================================================
//   // STATES
//   // ============================================================

//   const [navbarData, setNavbarData] = useState(null);
//   const [navbarLoading, setNavbarLoading] = useState(true);

//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const [userMenuOpen, setUserMenuOpen] = useState(false);

//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);

//   const [user, setUser] = useState(null);

//   const [cartCount, setCartCount] = useState(0);

//   const [authLoading, setAuthLoading] = useState(true);

//   const [scrolled, setScrolled] = useState(false);

//   const [profileImageError, setProfileImageError] = useState(false);

//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // ============================================================
//   // REFS
//   // ============================================================

//   const searchRef = useRef(null);
//   const mobileSearchRef = useRef(null);

//   // ============================================================
//   // ROUTER
//   // ============================================================

//   const pathname = usePathname();
//   const router = useRouter();

//   // ============================================================
//   // HOME PAGE
//   // ============================================================

//   const isHomePage = pathname === '/';

//   // ============================================================
//   // API BASE URL
//   // ============================================================

//   const API_URL =
//     process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

//   // ============================================================
//   // FETCH NAVBAR DATA
//   // ============================================================

//   useEffect(() => {
//     const fetchNavbar = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/navbar`);

//         if (response.ok) {
//           const data = await response.json();

//           if (data.success) {
//             setNavbarData(data.data);
//           } else {
//             setNavbarData({
//               items: [
//                 {
//                   id: '1',
//                   name: 'Home',
//                   href: '/',
//                   icon: 'Home',
//                   isActive: true,
//                 },
//                 {
//                   id: '2',
//                   name: 'Products',
//                   href: '/products',
//                   icon: 'Package',
//                   isActive: true,
//                 },
//                 {
//                   id: '3',
//                   name: 'Track Order',
//                   href: '/track',
//                   icon: 'MapPin',
//                   isActive: true,
//                 },
//                 {
//                   id: '4',
//                   name: 'About',
//                   href: '/about',
//                   icon: 'Flower2',
//                   isActive: true,
//                 },
//                 {
//                   id: '5',
//                   name: 'Contact',
//                   href: '/contact',
//                   icon: 'Phone',
//                   isActive: true,
//                 },
//               ],

//               logo: {
//                 text: 'Glow&Co',
//                 highlightText: '',
//                 icon: 'Package',
//                 logoUrl: '/logo.png',
//               },
//             });
//           }
//         } else {
//           setNavbarData({
//             items: [
//               {
//                 id: '1',
//                 name: 'Home',
//                 href: '/',
//                 icon: 'Home',
//                 isActive: true,
//               },
//               {
//                 id: '2',
//                 name: 'Products',
//                 href: '/products',
//                 icon: 'Sparkles',
//                 isActive: true,
//               },
//               {
//                 id: '3',
//                 name: 'Track Order',
//                 href: '/track',
//                 icon: 'MapPin',
//                 isActive: true,
//               },
//               {
//                 id: '4',
//                 name: 'About',
//                 href: '/about',
//                 icon: 'Flower2',
//                 isActive: true,
//               },
//               {
//                 id: '5',
//                 name: 'Contact',
//                 href: '/contact',
//                 icon: 'Phone',
//                 isActive: true,
//               },
//             ],

//             logo: {
//               text: 'Glow&Co',
//               highlightText: 'BEAUTY',
//               icon: 'Package',
//               logoUrl: '/logo.png',
//             },
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching navbar:', error);

//         setNavbarData({
//           items: [
//             {
//               id: '1',
//               name: 'Home',
//               href: '/',
//               icon: 'Home',
//               isActive: true,
//             },
//             {
//               id: '2',
//               name: 'Products',
//               href: '/products',
//               icon: 'Sparkles',
//               isActive: true,
//             },
//             {
//               id: '3',
//               name: 'Track Order',
//               href: '/track',
//               icon: 'MapPin',
//               isActive: true,
//             },
//             {
//               id: '4',
//               name: 'About',
//               href: '/about',
//               icon: 'Flower2',
//               isActive: true,
//             },
//             {
//               id: '5',
//               name: 'Contact',
//               href: '/contact',
//               icon: 'Phone',
//               isActive: true,
//             },
//           ],

//           logo: {
//             text: 'Glow&Co',
//             highlightText: 'BEAUTY',
//             icon: 'Package',
//             logoUrl: '/logo.png',
//           },
//         });
//       } finally {
//         setNavbarLoading(false);
//       }
//     };

//     fetchNavbar();
//   }, [API_URL]);

//   // ============================================================
//   // SCROLL EFFECT
//   // ============================================================

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // ============================================================
//   // CLOSE DESKTOP SEARCH ON OUTSIDE CLICK
//   // ============================================================

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target)
//       ) {
//         setShowResults(false);

//         if (!event.target.closest('.search-trigger')) {
//           setSearchOpen(false);
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener(
//         'mousedown',
//         handleClickOutside
//       );
//     };
//   }, []);

//   // ============================================================
//   // CLOSE MOBILE SEARCH ON OUTSIDE CLICK
//   // ============================================================

//   useEffect(() => {
//     const handleClickOutside = (event) => {
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

//     return () => {
//       document.removeEventListener(
//         'mousedown',
//         handleClickOutside
//       );
//     };
//   }, []);

//   // ============================================================
//   // PREVENT BODY SCROLL WHEN MOBILE MENU OPEN
//   // ============================================================

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMenuOpen]);

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
//           console.error(
//             'Error parsing user data:',
//             error
//           );

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
//         const sessionId =
//           localStorage.getItem('cartSessionId');

//         if (sessionId) {
//           headers['x-session-id'] = sessionId;
//         }
//       }

//       const response = await fetch(
//         `${API_URL}/api/cart`,
//         {
//           headers,
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();

//         setCartCount(
//           data.data?.totalItems || 0
//         );
//       } else {
//         setCartCount(0);
//       }
//     } catch (error) {
//       console.error(
//         'Fetch cart count error:',
//         error
//       );

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

//     window.addEventListener(
//       'auth-change',
//       handleAuthChange
//     );

//     window.addEventListener(
//       'focus',
//       handleAuthChange
//     );

//     window.addEventListener(
//       'cart-update',
//       fetchCartCount
//     );

//     return () => {
//       window.removeEventListener(
//         'auth-change',
//         handleAuthChange
//       );

//       window.removeEventListener(
//         'focus',
//         handleAuthChange
//       );

//       window.removeEventListener(
//         'cart-update',
//         fetchCartCount
//       );
//     };
//   }, []);

//   // ============================================================
//   // FETCH CART WHEN PATHNAME CHANGES
//   // ============================================================

//   useEffect(() => {
//     fetchCartCount();
//   }, [pathname]);

//   // ============================================================
//   // CART UPDATE LISTENER
//   // ============================================================

//   useEffect(() => {
//     const handleCartUpdate = () => {
//       fetchCartCount();
//     };

//     window.addEventListener(
//       'cart-update',
//       handleCartUpdate
//     );

//     return () => {
//       window.removeEventListener(
//         'cart-update',
//         handleCartUpdate
//       );
//     };
//   }, []);

//   // ============================================================
//   // GET ICON
//   // ============================================================

//   const getIcon = (iconName) => {
//     const Icon = ICON_MAP[iconName];

//     return Icon || Package;
//   };

//   // ============================================================
//   // NAVIGATION ITEMS
//   // ============================================================

//   const getNavItems = () => {
//     if (
//       navbarData?.items &&
//       navbarData.items.length > 0
//     ) {
//       return navbarData.items.filter(
//         (item) => item.isActive !== false
//       );
//     }

//     return [
//       {
//         id: '1',
//         name: 'Home',
//         href: '/',
//         icon: 'Home',
//       },
//       {
//         id: '2',
//         name: 'Products',
//         href: '/products',
//         icon: 'Sparkles',
//       },
//       {
//         id: '3',
//         name: 'Track Order',
//         href: '/track',
//         icon: 'MapPin',
//       },
//       {
//         id: '4',
//         name: 'About',
//         href: '/about',
//         icon: 'Flower2',
//       },
//       {
//         id: '5',
//         name: 'Contact',
//         href: '/contact',
//         icon: 'Phone',
//       },
//     ];
//   };

//   const navItems = getNavItems();

//   // ============================================================
//   // ACTIVE LINK
//   // ============================================================

//   const isActive = (path) => {
//     if (path === '/') {
//       return pathname === '/';
//     }

//     return pathname.startsWith(path);
//   };

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
//         `${API_URL}/api/products?search=${encodeURIComponent(
//           query
//         )}&limit=5`
//       );

//       const data = await response.json();

//       if (
//         data.success &&
//         data.data &&
//         data.data.length > 0
//       ) {
//         setSearchResults(data.data);
//         setShowResults(true);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     } catch (error) {
//       console.error(
//         'Search error:',
//         error
//       );

//       setSearchResults([]);
//       setShowResults(false);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // ============================================================
//   // SEARCH DEBOUNCE
//   // ============================================================

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

//   // ============================================================
//   // SEARCH SUBMIT
//   // ============================================================

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();

//     if (searchQuery.trim()) {
//       router.push(
//         `/search?q=${encodeURIComponent(
//           searchQuery
//         )}`
//       );

//       setSearchOpen(false);
//       setMobileSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
//     }
//   };

//   // ============================================================
//   // SEARCH RESULT CLICK
//   // ============================================================

//   const handleResultClick = (result) => {
//     const productId = result._id;

//     const productSlug =
//       result.slug || productId;

//     if (productSlug) {
//       setSearchOpen(false);
//       setMobileSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);

//       setTimeout(() => {
//         router.push(
//           `/product/${productSlug}`
//         );
//       }, 50);
//     } else {
//       router.push(
//         `/search?q=${encodeURIComponent(
//           searchQuery
//         )}`
//       );
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

//     window.dispatchEvent(
//       new Event('cart-update')
//     );

//     window.dispatchEvent(
//       new Event('auth-change')
//     );

//     toast.success(
//       'Logged out successfully!'
//     );

//     router.push('/');
//   };

//   // ============================================================
//   // DASHBOARD LINK
//   // ============================================================

//   const getDashboardLink = () => {
//     if (!user) {
//       return '/';
//     }

//     if (
//       [
//         'admin',
//         'super_admin',
//         'moderator',
//       ].includes(user.role)
//     ) {
//       return '/authorize/dashboard';
//     }

//     if (
//       user.role === 'call_center_agent'
//     ) {
//       return '/agent/dashboard';
//     }

//     return '/customer/dashboard';
//   };

//   // ============================================================
//   // SETTINGS LINK
//   // ============================================================

//   const getSettingsLink = () => {
//     if (!user) {
//       return '/';
//     }

//     if (
//       [
//         'admin',
//         'super_admin',
//         'moderator',
//       ].includes(user.role)
//     ) {
//       return '/authorize/settings';
//     }

//     if (
//       user.role === 'call_center_agent'
//     ) {
//       return '/agent/settings';
//     }

//     return '/customer/settings';
//   };

//   // ============================================================
//   // DISPLAY NAME
//   // ============================================================

//   const getDisplayName = () => {
//     if (!user) {
//       return '';
//     }

//     return (
//       user.companyName ||
//       user.contactPerson ||
//       user.email?.split('@')[0] ||
//       'User'
//     );
//   };

//   // ============================================================
//   // INITIALS
//   // ============================================================

//   const getInitials = () => {
//     if (!user) {
//       return 'U';
//     }

//     const name = getDisplayName();

//     return name
//       .charAt(0)
//       .toUpperCase();
//   };

//   // ============================================================
//   // PROFILE PICTURE
//   // ============================================================

//   const getProfilePicture = () => {
//     return (
//       user?.profilePicture ||
//       user?.photoURL ||
//       null
//     );
//   };

//   // ============================================================
//   // LOGO URL
//   // ============================================================

//   const getLogoUrl = (url) => {
//     if (!url) {
//       return '/logo.png';
//     }

//     if (
//       url.includes(
//         'cloudinary.com'
//       )
//     ) {
//       const parts =
//         url.split('/upload/');

//       if (parts.length === 2) {
//         return `${parts[0]}/upload/f_auto,q_auto:good,fl_preserve_transparency/${parts[1]}`;
//       }
//     }

//     return url;
//   };

//   // ============================================================
//   // AUTHORIZE ROLE
//   // ============================================================

//   const isAuthorizeRole =
//     user &&
//     [
//       'admin',
//       'super_admin',
//       'moderator',
//     ].includes(user.role);

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (
//     authLoading ||
//     navbarLoading
//   ) {
//     return (
//       <div
//         className="fixed top-0 z-50 w-full bg-white border-b border-[#E8E0D8]"
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">

//             <div className="w-10 h-10 bg-[#E8DCD0] rounded animate-pulse" />

//             <div className="flex gap-4">

//               <div className="w-8 h-8 bg-[#E8DCD0] rounded animate-pulse" />

//               <div className="w-8 h-8 bg-[#E8DCD0] rounded animate-pulse" />

//               <div className="w-16 h-8 bg-[#E8DCD0] rounded animate-pulse" />

//             </div>

//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ============================================================
//   // RETURN
//   // ============================================================

//   return (
//     <>
//       {/* ======================================================
//           MAIN NAVBAR - WHITE BACKGROUND
//       ====================================================== */}

//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
//           scrolled ? 'shadow-md' : 'shadow-sm'
//         }`}
//       >
//         <div className="container mx-auto px-4">

//           <div className="flex items-center justify-between h-16">

//             {/* ==================================================
//                 LEFT SECTION
//             ================================================== */}

//             <div className="flex items-center gap-1 md:gap-0 flex-1">

//               {/* Mobile Menu */}
//               <button
//                 onClick={() =>
//                   setIsMenuOpen(
//                     !isMenuOpen
//                   )
//                 }
//                 className="md:hidden p-2 -ml-1 rounded-lg transition-all duration-200 hover:bg-[#F2F5F0]"
//               >
//                 <Menu
//                   className="w-5 h-5 text-[#3D3D3D]"
//                 />
//               </button>

//               {/* Desktop Navigation */}
//               <div className="hidden md:flex items-center space-x-1">

//                 {navItems.map((item) => {
//                   const Icon =
//                     getIcon(item.icon);

//                   return (
//                     <Link
//                       key={
//                         item.id ||
//                         item.name
//                       }
//                       href={item.href}
//                       className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                         isActive(
//                           item.href
//                         )
//                           ? 'text-[#8B9D83]'
//                           : 'text-[#3D3D3D] hover:text-[#8B9D83]'
//                       }`}
//                       style={{
//                         fontFamily:
//                           '"Raleway", "Inter", sans-serif',
//                       }}
//                     >
//                       {item.name}

//                       {isActive(
//                         item.href
//                       ) && (
//                         <span
//                           className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full bg-[#8B9D83]"
//                         />
//                       )}
//                     </Link>
//                   );
//                 })}

//               </div>
//             </div>

//             {/* ==================================================
//                 CENTER LOGO
//             ================================================== */}

//             <div className="flex items-center justify-center flex-shrink-0">

//               <Link
//                 href="/"
//                 className="flex items-center group"
//               >
//                 <div className="relative w-24 h-11 md:w-28 md:h-12 lg:w-32 lg:h-14 transition-transform group-hover:scale-105 duration-300">

//                   {navbarData?.logo?.logoUrl ? (
//                     <img
//                       src={getLogoUrl(
//                         navbarData.logo.logoUrl
//                       )}
//                       alt={
//                         navbarData.logo.text ||
//                         'Glow&Co'
//                       }
//                       className="w-full h-full object-contain"
//                       style={{
//                         background:
//                           'transparent',
//                       }}
//                     />
//                   ) : (
//                     <img
//                       src="/logo.png"
//                       alt="Glow&Co Logo"
//                       className="w-full h-full object-contain"
//                     />
//                   )}

//                 </div>
//               </Link>

//             </div>

//             {/* ==================================================
//                 RIGHT SECTION - BEAUTY THEME
//             ================================================== */}

//             <div className="flex items-center justify-end flex-1">

//               {/* ==================================================
//                   DESKTOP SEARCH
//               ================================================== */}

//               <div
//                 className="hidden md:block relative"
//                 ref={searchRef}
//               >

//                 {!searchOpen ? (

//                   /* Search Trigger - Skin tone style */
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setSearchOpen(true)
//                     }
//                     className="search-trigger group flex items-center w-[200px] lg:w-[260px] border-b border-[#E8E0D8] hover:border-[#8B9D83] transition-colors duration-200 py-2"
//                   >

//                     <Search
//                       className="w-[18px] h-[18px] text-[#6B6B6B] flex-shrink-0"
//                       strokeWidth={1.7}
//                     />

//                     <span
//                       className="ml-4 text-[14px] text-[#6B6B6B] group-hover:text-[#3D3D3D] transition-colors"
//                       style={{
//                         fontFamily:
//                           '"Raleway", "Inter", sans-serif',
//                       }}
//                     >
//                       Search beauty...
//                     </span>

//                   </button>

//                 ) : (

//                   /* Active Search */
//                   <div className="relative">

//                     <form
//                       onSubmit={
//                         handleSearchSubmit
//                       }
//                       className="relative"
//                     >

//                       <div className="flex items-center w-[200px] lg:w-[260px] border-b border-[#8B9D83] py-1.5">

//                         <Search
//                           className="w-[18px] h-[18px] text-[#3D3D3D] flex-shrink-0"
//                           strokeWidth={1.7}
//                         />

//                         <input
//                           type="text"
//                           value={
//                             searchQuery
//                           }
//                           onChange={(e) =>
//                             setSearchQuery(
//                               e.target.value
//                             )
//                           }
//                           placeholder="Search beauty..."
//                           className="w-full ml-4 pr-16 text-[14px] text-[#3D3D3D] placeholder:text-[#6B6B6B] bg-transparent focus:outline-none"
//                           style={{
//                             fontFamily:
//                               '"Raleway", "Inter", sans-serif',
//                           }}
//                           autoFocus
//                         />

//                         <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">

//                           {searchLoading ? (
//                             <div className="w-4 h-4 border-2 border-[#8B9D83] border-t-transparent rounded-full animate-spin" />
//                           ) : (
//                             <button
//                               type="submit"
//                               className="p-1 text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors"
//                             >
//                               <Search
//                                 className="w-[15px] h-[15px]"
//                                 strokeWidth={1.7}
//                               />
//                             </button>
//                           )}

//                           <button
//                             type="button"
//                             onClick={() => {
//                               setSearchOpen(
//                                 false
//                               );

//                               setSearchQuery(
//                                 ''
//                               );

//                               setShowResults(
//                                 false
//                               );
//                             }}
//                             className="p-1 ml-1 text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors"
//                           >
//                             <X
//                               className="w-[15px] h-[15px]"
//                               strokeWidth={1.7}
//                             />
//                           </button>

//                         </div>

//                       </div>

//                     </form>

//                     {/* ==================================================
//                         DESKTOP SEARCH RESULTS
//                     ================================================== */}

//                     {showResults &&
//                       searchResults.length >
//                         0 && (

//                         <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-[#E8E0D8] max-h-96 overflow-y-auto z-50">

//                           <div className="py-2">

//                             {searchResults.map(
//                               (product) => (

//                                 <button
//                                   key={
//                                     product._id
//                                   }
//                                   onMouseDown={(
//                                     e
//                                   ) => {
//                                     e.preventDefault();

//                                     handleResultClick(
//                                       product
//                                     );
//                                   }}
//                                   className="w-full px-4 py-3 text-left hover:bg-[#F2F5F0] transition-colors flex items-center gap-3 border-b border-[#E8E0D8] last:border-0"
//                                 >

//                                   {product.images &&
//                                   product
//                                     .images
//                                     .length >
//                                     0 ? (

//                                     <img
//                                       src={
//                                         product
//                                           .images[0]
//                                           ?.url ||
//                                         product
//                                           .images[0]
//                                       }
//                                       alt={
//                                         product.productName ||
//                                         product.name
//                                       }
//                                       className="w-10 h-10 rounded-lg object-cover bg-[#F5EDE3]"
//                                     />

//                                   ) : (

//                                     <div className="w-10 h-10 rounded-lg bg-[#F5EDE3] flex items-center justify-center">

//                                       <Package
//                                         className="w-5 h-5 text-[#6B6B6B]"
//                                         strokeWidth={
//                                           1.5
//                                         }
//                                       />

//                                     </div>
//                                   )}

//                                   <div className="flex-1 min-w-0">

//                                     <p
//                                       className="font-medium text-[#3D3D3D] text-sm line-clamp-1"
//                                       style={{
//                                         fontFamily:
//                                           '"Raleway", "Inter", sans-serif',
//                                       }}
//                                     >
//                                       {product.productName ||
//                                         product.name ||
//                                         product.title}
//                                     </p>

//                                     <div className="flex items-center gap-2 mt-0.5">

//                                       <p
//                                         className="text-sm font-semibold text-[#8B9D83]"
//                                         style={{
//                                           fontFamily:
//                                             '"Raleway", "Inter", sans-serif',
//                                         }}
//                                       >
//                                         ৳
//                                         {product.discountPrice ||
//                                           product.regularPrice ||
//                                           product.price}
//                                       </p>

//                                       {product.discountPrice &&
//                                         product.regularPrice && (
//                                           <p className="text-xs text-[#6B6B6B] line-through">
//                                             ৳
//                                             {
//                                               product.regularPrice
//                                             }
//                                           </p>
//                                         )}

//                                     </div>

//                                   </div>

//                                 </button>
//                               )
//                             )}

//                             <button
//                               onClick={
//                                 handleSearchSubmit
//                               }
//                               className="w-full px-4 py-2.5 text-center text-sm text-[#8B9D83] hover:bg-[#F2F5F0] font-medium border-t border-[#E8E0D8] transition-colors"
//                               style={{
//                                 fontFamily:
//                                   '"Raleway", "Inter", sans-serif',
//                               }}
//                             >
//                               View all results
//                               for "
//                               {
//                                 searchQuery
//                               }
//                               " →
//                             </button>

//                           </div>

//                         </div>
//                       )}

//                   </div>
//                 )}

//               </div>

//               {/* ==================================================
//                   MOBILE SEARCH TRIGGER
//               ================================================== */}

//               <button
//                 onClick={() =>
//                   setMobileSearchOpen(
//                     true
//                   )
//                 }
//                 className="mobile-search-trigger md:hidden p-2 hover:bg-[#F2F5F0] rounded-full transition-colors"
//               >
//                 <Search
//                   className="w-[20px] h-[20px] text-[#3D3D3D]"
//                   strokeWidth={1.7}
//                 />
//               </button>

//               {/* ==================================================
//                   USER ICON
//               ================================================== */}

//               {user ? (

//                 <div className="relative ml-5">

//                   <button
//                     onClick={() =>
//                       setUserMenuOpen(
//                         !userMenuOpen
//                       )
//                     }
//                     className="flex items-center justify-center hover:opacity-70 transition-opacity"
//                     aria-label="Account"
//                   >

//                     {getProfilePicture() &&
//                     !profileImageError ? (

//                       <img
//                         src={getProfilePicture()}
//                         alt={getDisplayName()}
//                         onError={() =>
//                           setProfileImageError(
//                             true
//                           )
//                         }
//                         className="w-[24px] h-[24px] rounded-full object-cover"
//                       />

//                     ) : (

//                       <UserCircle
//                         className="w-[25px] h-[25px] text-[#3D3D3D]"
//                         strokeWidth={1.5}
//                       />

//                     )}

//                   </button>

//                   {/* USER DROPDOWN */}

//                   {userMenuOpen && (
//                     <>
//                       <div
//                         className="fixed inset-0 z-40"
//                         onClick={() =>
//                           setUserMenuOpen(
//                             false
//                           )
//                         }
//                       />

//                       <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-[#E8E0D8] overflow-hidden z-50 animate-fadeIn">

//                         {/* User Info */}

//                         <div className="px-4 py-3 border-b border-[#E8E0D8] bg-[#F5EDE3]">

//                           <p
//                             className="text-[#3D3D3D] font-semibold text-sm truncate"
//                             style={{
//                               fontFamily:
//                                 '"Raleway", "Inter", sans-serif',
//                             }}
//                           >
//                             {getDisplayName()}
//                           </p>

//                           <p
//                             className="text-[#6B6B6B] text-xs truncate mt-0.5"
//                             style={{
//                               fontFamily:
//                                 '"Raleway", "Inter", sans-serif',
//                             }}
//                           >
//                             {user.email}
//                           </p>

//                           <div className="mt-1.5">

//                             <span
//                               className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#8B9D83] text-white"
//                               style={{
//                                 fontFamily:
//                                   '"Raleway", "Inter", sans-serif',
//                               }}
//                             >
//                               {user.role ===
//                               'call_center_agent'
//                                 ? 'Call Center Agent'
//                                 : user.role ===
//                                   'super_admin'
//                                 ? 'Super Admin'
//                                 : user.role ===
//                                   'admin'
//                                 ? 'Admin'
//                                 : user.role ===
//                                   'moderator'
//                                 ? 'Moderator'
//                                 : 'Customer'}
//                             </span>

//                           </div>

//                         </div>

//                         {/* Dropdown Actions */}

//                         <div className="py-2">

//                           {/* Dashboard */}

//                           <div
//                             onClick={() => {
//                               setUserMenuOpen(
//                                 false
//                               );

//                               window.location.href =
//                                 getDashboardLink();
//                             }}
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3D3D3D] hover:bg-[#F2F5F0] transition-colors cursor-pointer"
//                             style={{
//                               fontFamily:
//                                 '"Raleway", "Inter", sans-serif',
//                             }}
//                           >

//                             <LayoutDashboard
//                               className="w-4 h-4 text-[#8B9D83]"
//                               strokeWidth={
//                                 1.7
//                               }
//                             />

//                             <span>
//                               Dashboard
//                             </span>

//                           </div>

//                           {/* Settings */}

//                           <div
//                             onClick={() => {
//                               setUserMenuOpen(
//                                 false
//                               );

//                               window.location.href =
//                                 getSettingsLink();
//                             }}
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3D3D3D] hover:bg-[#F2F5F0] transition-colors cursor-pointer"
//                             style={{
//                               fontFamily:
//                                 '"Raleway", "Inter", sans-serif',
//                             }}
//                           >

//                             <Settings
//                               className="w-4 h-4 text-[#8B9D83]"
//                               strokeWidth={
//                                 1.7
//                               }
//                             />

//                             <span>
//                               Settings
//                             </span>

//                           </div>

//                           <div className="border-t border-[#E8E0D8] my-1" />

//                           {/* Logout */}

//                           <button
//                             onClick={() => {
//                               setUserMenuOpen(
//                                 false
//                               );

//                               logout();
//                             }}
//                             className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
//                             style={{
//                               fontFamily:
//                                 '"Raleway", "Inter", sans-serif',
//                             }}
//                           >

//                             <LogOut
//                               className="w-4 h-4"
//                               strokeWidth={
//                                 1.7
//                               }
//                             />

//                             <span>
//                               Logout
//                             </span>

//                           </button>

//                         </div>

//                       </div>
//                     </>
//                   )}

//                 </div>

//               ) : (

//                 /* Logged Out User Icon */

//                 <Link
//                   href="/login"
//                   className="ml-5 flex items-center justify-center hover:opacity-70 transition-opacity"
//                   aria-label="Sign In"
//                 >
//                   <UserCircle
//                     className="w-[25px] h-[25px] text-[#3D3D3D]"
//                     strokeWidth={1.5}
//                   />
//                 </Link>

//               )}

//               {/* ==================================================
//                   SHOPPING BAG
//               ================================================== */}

//               <button
//                 onClick={() =>
//                   setIsCartOpen(true)
//                 }
//                 className="relative ml-5 flex items-center justify-center hover:opacity-70 transition-opacity"
//                 aria-label="Shopping bag"
//               >

//                 <ShoppingBag
//                   className="w-[25px] h-[25px] text-[#3D3D3D]"
//                   strokeWidth={1.5}
//                 />

//                 {/* Cart Count */}

//                 {cartCount > 0 && (
//                   <span
//                     className="absolute -top-2 -right-2 bg-[#8B9D83] text-white text-[9px] font-semibold rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-1"
//                     style={{
//                       fontFamily:
//                         '"Raleway", "Inter", sans-serif',
//                     }}
//                   >
//                     {cartCount > 9
//                       ? '9+'
//                       : cartCount}
//                   </span>
//                 )}

//               </button>

//             </div>

//           </div>

//         </div>
//       </nav>

//       {/* ========================================================
//           MOBILE SEARCH OVERLAY
//       ======================================================== */}

//       {mobileSearchOpen && (
//         <div className="fixed top-16 left-0 right-0 z-40 bg-white shadow-lg border-b border-[#E8E0D8] animate-slideDown md:hidden">

//           <div
//             className="container mx-auto px-4 py-3"
//             ref={mobileSearchRef}
//           >

//             <form
//               onSubmit={
//                 handleSearchSubmit
//               }
//               className="relative"
//             >

//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) =>
//                   setSearchQuery(
//                     e.target.value
//                   )
//                 }
//                 placeholder="Search beauty..."
//                 className="w-full px-4 py-3 pr-20 text-sm text-[#3D3D3D] bg-[#F5EDE3] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all"
//                 style={{
//                   fontFamily:
//                     '"Raleway", "Inter", sans-serif',
//                 }}
//                 autoFocus
//               />

//               <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">

//                 <button
//                   type="submit"
//                   className="p-1.5"
//                 >

//                   {searchLoading ? (
//                     <div className="w-4 h-4 border-2 border-[#8B9D83] border-t-transparent rounded-full animate-spin" />
//                   ) : (
//                     <Search className="w-4 h-4 text-[#8B9D83]" />
//                   )}

//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setMobileSearchOpen(
//                       false
//                     );

//                     setSearchQuery('');
//                     setShowResults(false);
//                   }}
//                   className="p-1.5 text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>

//               </div>

//             </form>

//             {/* Mobile Search Results */}

//             {showResults &&
//               searchResults.length >
//                 0 && (

//                 <div className="mt-3 bg-white rounded-lg border border-[#E8E0D8] max-h-96 overflow-y-auto">

//                   {searchResults.map(
//                     (product) => (

//                       <button
//                         key={
//                           product._id
//                         }
//                         onMouseDown={(
//                           e
//                         ) => {
//                           e.preventDefault();

//                           handleResultClick(
//                             product
//                           );
//                         }}
//                         className="w-full px-3 py-3 text-left hover:bg-[#F2F5F0] transition-colors flex items-center gap-3 border-b border-[#E8E0D8] last:border-0"
//                       >

//                         {product.images &&
//                         product.images.length >
//                           0 ? (

//                           <img
//                             src={
//                               product
//                                 .images[0]
//                                 ?.url ||
//                               product
//                                 .images[0]
//                             }
//                             alt={
//                               product.productName ||
//                               product.name
//                             }
//                             className="w-12 h-12 rounded-lg object-cover bg-[#F5EDE3]"
//                           />

//                         ) : (

//                           <div className="w-12 h-12 rounded-lg bg-[#F5EDE3] flex items-center justify-center">

//                             <Package className="w-6 h-6 text-[#6B6B6B]" />

//                           </div>

//                         )}

//                         <div className="flex-1">

//                           <p
//                             className="font-medium text-[#3D3D3D] text-sm line-clamp-1"
//                             style={{
//                               fontFamily:
//                                 '"Raleway", "Inter", sans-serif',
//                             }}
//                           >
//                             {product.productName ||
//                               product.name ||
//                               product.title}
//                           </p>

//                           <p
//                             className="text-sm font-semibold text-[#8B9D83] mt-0.5"
//                             style={{
//                               fontFamily:
//                                 '"Raleway", "Inter", sans-serif',
//                             }}
//                           >
//                             ৳
//                             {product.discountPrice ||
//                               product.regularPrice ||
//                               product.price}
//                           </p>

//                         </div>

//                       </button>
//                     )
//                   )}

//                   <button
//                     onClick={
//                       handleSearchSubmit
//                     }
//                     className="w-full px-4 py-3 text-center text-sm text-[#8B9D83] hover:bg-[#F2F5F0] font-medium border-t border-[#E8E0D8]"
//                     style={{
//                       fontFamily:
//                         '"Raleway", "Inter", sans-serif',
//                     }}
//                   >
//                     View all results
//                     for "
//                     {searchQuery}"
//                     →
//                   </button>

//                 </div>
//               )}

//           </div>

//         </div>
//       )}

//       {/* ========================================================
//           MOBILE MENU SIDEBAR
//       ======================================================== */}

//       <div
//         className={`fixed inset-0 z-50 md:hidden ${
//           isMenuOpen
//             ? 'visible'
//             : 'invisible'
//         }`}
//       >

//         {/* Overlay */}

//         <div
//           className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
//             isMenuOpen
//               ? 'opacity-100'
//               : 'opacity-0'
//           }`}
//           onClick={() =>
//             setIsMenuOpen(false)
//           }
//         />

//         {/* Sidebar */}

//         <div
//           className={`absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
//             isMenuOpen
//               ? 'translate-x-0'
//               : '-translate-x-full'
//           }`}
//         >

//           <div className="flex flex-col h-full">

//             {/* Header */}

//             <div className="flex items-center justify-between p-5 border-b border-[#E8E0D8]">

//               <div className="flex items-center space-x-2.5">

//                 <div className="w-8 h-8">

//                   {navbarData?.logo?.logoUrl ? (

//                     <img
//                       src={getLogoUrl(
//                         navbarData.logo.logoUrl
//                       )}
//                       alt={
//                         navbarData.logo.text ||
//                         'Glow&Co'
//                       }
//                       className="w-full h-full object-contain"
//                     />

//                   ) : (

//                     <img
//                       src="/logo.png"
//                       alt="Logo"
//                       className="w-full h-full object-contain"
//                     />

//                   )}

//                 </div>

//                 <div>

//                   <span
//                     className="font-bold text-[#3D3D3D] text-base"
//                     style={{
//                       fontFamily:
//                         '"Raleway", "Inter", sans-serif',
//                     }}
//                   >
//                     {navbarData?.logo
//                       ?.text ||
//                       'Glow&Co'}

//                     {navbarData?.logo
//                       ?.highlightText && (
//                       <span className="text-[#8B9D83]">
//                         {
//                           navbarData
//                             .logo
//                             .highlightText
//                         }
//                       </span>
//                     )}
//                   </span>

//                   <span
//                     className="text-[10px] text-[#8B9D83] block -mt-1 tracking-wider"
//                     style={{
//                       fontFamily:
//                         '"Raleway", "Inter", sans-serif',
//                     }}
//                   >
//                     BEAUTY
//                   </span>

//                 </div>

//               </div>

//               <button
//                 onClick={() =>
//                   setIsMenuOpen(
//                     false
//                   )
//                 }
//                 className="p-2 rounded-lg hover:bg-[#F2F5F0] transition-colors"
//               >
//                 <X className="w-5 h-5 text-[#3D3D3D]" />
//               </button>

//             </div>

//             {/* Navigation Items */}

//             <div className="flex-1 overflow-y-auto py-3">

//               {navItems.map((item) => {

//                 const Icon =
//                   getIcon(item.icon);

//                 return (
//                   <Link
//                     key={
//                       item.id ||
//                       item.name
//                     }
//                     href={item.href}
//                     onClick={() =>
//                       setIsMenuOpen(
//                         false
//                       )
//                     }
//                     className={`flex items-center gap-3 px-5 py-3 mx-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                       isActive(
//                         item.href
//                       )
//                         ? 'text-[#8B9D83] font-semibold'
//                         : 'text-[#3D3D3D] hover:text-[#8B9D83] hover:bg-[#F2F5F0]'
//                     }`}
//                     style={{
//                       fontFamily:
//                         '"Raleway", "Inter", sans-serif',

//                       borderLeft:
//                         isActive(
//                           item.href
//                         )
//                           ? '3px solid #8B9D83'
//                           : 'none',

//                       paddingLeft:
//                         isActive(
//                           item.href
//                         )
//                           ? '17px'
//                           : '20px',
//                     }}
//                   >

//                     <Icon
//                       className={`w-4.5 h-4.5 ${
//                         isActive(
//                           item.href
//                         )
//                           ? 'text-[#8B9D83]'
//                           : 'text-[#6B6B6B]'
//                       }`}
//                     />

//                     <span>
//                       {item.name}
//                     </span>

//                   </Link>
//                 );
//               })}

//               <div className="my-3 mx-5 h-px bg-gradient-to-r from-[#8B9D83]/20 via-[#8B9D83]/40 to-[#8B9D83]/20" />

//               {/* ==================================================
//                   MOBILE AUTH
//               ================================================== */}

//               {!user ? (

//                 <div className="px-5 mt-3">

//                   <Link
//                     href="/login"
//                     onClick={() =>
//                       setIsMenuOpen(
//                         false
//                       )
//                     }
//                     className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-[#8B9D83] text-white hover:bg-[#6B7D63] transition-all shadow-sm"
//                     style={{
//                       fontFamily:
//                         '"Raleway", "Inter", sans-serif',
//                     }}
//                   >
//                     Sign In
//                   </Link>

//                 </div>

//               ) : (

//                 <div className="px-5 mt-3">

//                   {/* Mobile User Info */}

//                   <div className="flex items-center gap-3 p-3 bg-[#F5EDE3] rounded-lg mb-3">

//                     {getProfilePicture() &&
//                     !profileImageError ? (

//                       <img
//                         src={getProfilePicture()}
//                         alt={getDisplayName()}
//                         onError={() =>
//                           setProfileImageError(
//                             true
//                           )
//                         }
//                         className="w-10 h-10 rounded-full object-cover border-2 border-[#8B9D83]/30"
//                       />

//                     ) : (

//                       <div className="w-10 h-10 rounded-full bg-[#8B9D83] flex items-center justify-center text-white font-semibold text-sm">

//                         {getInitials()}

//                       </div>

//                     )}

//                     <div className="flex-1">

//                       <p
//                         className="font-semibold text-[#3D3D3D] text-sm"
//                         style={{
//                           fontFamily:
//                             '"Raleway", "Inter", sans-serif',
//                         }}
//                       >
//                         {getDisplayName()}
//                       </p>

//                       <p
//                         className="text-[#8B9D83] text-xs truncate"
//                         style={{
//                           fontFamily:
//                             '"Raleway", "Inter", sans-serif',
//                         }}
//                       >
//                         {user.email}
//                       </p>

//                     </div>

//                   </div>

//                   {/* Dashboard */}

//                   <div
//                     onClick={() => {
//                       setIsMenuOpen(
//                         false
//                       );

//                       window.location.href =
//                         getDashboardLink();
//                     }}
//                     className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-[#3D3D3D] hover:bg-[#F2F5F0] transition-colors mb-1 cursor-pointer"
//                     style={{
//                       fontFamily:
//                         '"Raleway", "Inter", sans-serif',
//                     }}
//                   >

//                     <LayoutDashboard className="w-4 h-4 text-[#8B9D83]" />

//                     Dashboard

//                   </div>

//                   {/* Settings */}

//                   <div
//                     onClick={() => {
//                       setIsMenuOpen(
//                         false
//                       );

//                       window.location.href =
//                         getSettingsLink();
//                     }}
//                     className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-[#3D3D3D] hover:bg-[#F2F5F0] transition-colors mb-2 cursor-pointer"
//                     style={{
//                       fontFamily:
//                         '"Raleway", "Inter", sans-serif',
//                     }}
//                   >

//                     <Settings className="w-4 h-4 text-[#8B9D83]" />

//                     Settings

//                   </div>

//                   {/* Logout */}

//                   <button
//                     onClick={() => {
//                       setIsMenuOpen(
//                         false
//                       );

//                       logout();
//                     }}
//                     className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
//                     style={{
//                       fontFamily:
//                         '"Raleway", "Inter", sans-serif',
//                     }}
//                   >

//                     <LogOut className="w-4 h-4" />

//                     Logout

//                   </button>

//                 </div>

//               )}

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* ========================================================
//           CART SIDEBAR
//       ======================================================== */}

//       <CartSidebar
//         isOpen={isCartOpen}
//         onClose={() =>
//           setIsCartOpen(false)
//         }
//       />

//       {/* ========================================================
//           ANIMATIONS
//       ======================================================== */}

//       <style jsx>{`

//         @keyframes slideLeft {
//           from {
//             opacity: 0;
//             transform: translateX(20px);
//           }

//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .animate-slideLeft {
//           animation: slideLeft 0.25s ease-out;
//         }

//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }

//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-slideDown {
//           animation: slideDown 0.25s ease-out;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }

//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }

//         .w-4.5 {
//           width: 1.125rem;
//         }

//         .h-4.5 {
//           height: 1.125rem;
//         }

//       `}</style>
//     </>
//   );
// }



'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  LogOut,
  User,
  LayoutDashboard,
  ShoppingBag,
  Search,
  X,
  Home,
  Package,
  Info,
  Phone,
  Menu,
  UserCircle,
  ChevronDown,
  MapPin,
  Zap,
  Heart,
  Sparkles,
  Settings,
  Flower2,
} from 'lucide-react';

import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

// ============================================================
// TYPEWRITER CUSTOM HOOK
// ============================================================

function useTypewriter(words, speed = 100, deleteSpeed = 50, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer;

    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pause);
      return () => clearTimeout(timer);
    }

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, deleteSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length === currentWord.length) {
          setIsPaused(true);
        }
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [text, wordIndex, isDeleting, isPaused, words, speed, deleteSpeed, pause]);

  return text;
}

// ============================================================
// ICON MAPPING
// ============================================================

const ICON_MAP = {
  Home: Home,
  Zap: Zap,
  MapPin: MapPin,
  Info: Info,
  Phone: Phone,
  Package: Package,
  User: User,
  Heart: Heart,
  Sparkles: Sparkles,
  Flower2: Flower2,
};

// ============================================================
// COLOR PALETTE - BEAUTY THEME
// ============================================================
// Foundation/Skin tones: Warm beige, nude, tan
// Green accents: Sage, olive, eucalyptus
// ============================================================

const COLORS = {
  primary: '#8B9D83', // Sage green - main accent
  primaryLight: '#A8B8A0', // Lighter sage
  primaryDark: '#6B7D63', // Darker sage
  primaryBg: '#F2F5F0', // Very light sage background
  skin: '#F5EDE3', // Light foundation/skin tone
  skinMedium: '#E8DCD0', // Medium skin tone
  skinDark: '#D4C4B4', // Darker skin tone
  text: '#3D3D3D',
  textLight: '#6B6B6B',
  white: '#FFFFFF',
  border: '#E8E0D8',
};

export default function Navbar() {
  // ============================================================
  // STATES
  // ============================================================

  const [navbarData, setNavbarData] = useState(null);
  const [navbarLoading, setNavbarLoading] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [user, setUser] = useState(null);

  const [cartCount, setCartCount] = useState(0);

  const [authLoading, setAuthLoading] = useState(true);

  const [scrolled, setScrolled] = useState(false);

  const [profileImageError, setProfileImageError] = useState(false);

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);

  // ============================================================
  // TYPEWRITER PLACEHOLDER WORDS
  // ============================================================

  const searchPlaceholders = [
    'Search Products...',
    'Makeup...',
    'Skincare...',
    'Hair Care...',
    'Face cream...',
    'Lipstick...',
    'Serum...',
    'Moisturizer...',
    'Sunscreen...',
    'Face wash...',
    'Perfume...'
  ];

  const typewriterText = useTypewriter(searchPlaceholders, 80, 40, 2000);

  // ============================================================
  // REFS
  // ============================================================

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // ============================================================
  // ROUTER
  // ============================================================

  const pathname = usePathname();
  const router = useRouter();

  // ============================================================
  // HOME PAGE
  // ============================================================

  const isHomePage = pathname === '/';

  // ============================================================
  // API BASE URL
  // ============================================================

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // ============================================================
  // FETCH NAVBAR DATA
  // ============================================================

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const response = await fetch(`${API_URL}/api/navbar`);

        if (response.ok) {
          const data = await response.json();

          if (data.success) {
            setNavbarData(data.data);
          } else {
            setNavbarData({
              items: [
                {
                  id: '1',
                  name: 'Home',
                  href: '/',
                  icon: 'Home',
                  isActive: true,
                },
                {
                  id: '2',
                  name: 'Products',
                  href: '/products',
                  icon: 'Package',
                  isActive: true,
                },
                {
                  id: '3',
                  name: 'Track Order',
                  href: '/track',
                  icon: 'MapPin',
                  isActive: true,
                },
                {
                  id: '4',
                  name: 'About',
                  href: '/about',
                  icon: 'Flower2',
                  isActive: true,
                },
                {
                  id: '5',
                  name: 'Contact',
                  href: '/contact',
                  icon: 'Phone',
                  isActive: true,
                },
              ],

              logo: {
                text: 'Glow&Co',
                highlightText: '',
                icon: 'Package',
                logoUrl: '/logo.png',
              },
            });
          }
        } else {
          setNavbarData({
            items: [
              {
                id: '1',
                name: 'Home',
                href: '/',
                icon: 'Home',
                isActive: true,
              },
              {
                id: '2',
                name: 'Products',
                href: '/products',
                icon: 'Sparkles',
                isActive: true,
              },
              {
                id: '3',
                name: 'Track Order',
                href: '/track',
                icon: 'MapPin',
                isActive: true,
              },
              {
                id: '4',
                name: 'About',
                href: '/about',
                icon: 'Flower2',
                isActive: true,
              },
              {
                id: '5',
                name: 'Contact',
                href: '/contact',
                icon: 'Phone',
                isActive: true,
              },
            ],

            logo: {
              text: 'Glow&Co',
              highlightText: 'BEAUTY',
              icon: 'Package',
              logoUrl: '/logo.png',
            },
          });
        }
      } catch (error) {
        console.error('Error fetching navbar:', error);

        setNavbarData({
          items: [
            {
              id: '1',
              name: 'Home',
              href: '/',
              icon: 'Home',
              isActive: true,
            },
            {
              id: '2',
              name: 'Products',
              href: '/products',
              icon: 'Sparkles',
              isActive: true,
            },
            {
              id: '3',
              name: 'Track Order',
              href: '/track',
              icon: 'MapPin',
              isActive: true,
            },
            {
              id: '4',
              name: 'About',
              href: '/about',
              icon: 'Flower2',
              isActive: true,
            },
            {
              id: '5',
              name: 'Contact',
              href: '/contact',
              icon: 'Phone',
              isActive: true,
            },
          ],

          logo: {
            text: 'Glow&Co',
            highlightText: 'BEAUTY',
            icon: 'Package',
            logoUrl: '/logo.png',
          },
        });
      } finally {
        setNavbarLoading(false);
      }
    };

    fetchNavbar();
  }, [API_URL]);

  // ============================================================
  // SCROLL EFFECT
  // ============================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ============================================================
  // CLOSE DESKTOP SEARCH ON OUTSIDE CLICK
  // ============================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowResults(false);

        if (!event.target.closest('.search-trigger')) {
          setSearchOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  // ============================================================
  // CLOSE MOBILE SEARCH ON OUTSIDE CLICK
  // ============================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target) &&
        !event.target.closest('.mobile-search-trigger')
      ) {
        setMobileSearchOpen(false);
        setShowResults(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  // ============================================================
  // PREVENT BODY SCROLL WHEN MOBILE MENU OPEN
  // ============================================================

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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
          console.error(
            'Error parsing user data:',
            error
          );

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
        const sessionId =
          localStorage.getItem('cartSessionId');

        if (sessionId) {
          headers['x-session-id'] = sessionId;
        }
      }

      const response = await fetch(
        `${API_URL}/api/cart`,
        {
          headers,
        }
      );

      if (response.ok) {
        const data = await response.json();

        setCartCount(
          data.data?.totalItems || 0
        );
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error(
        'Fetch cart count error:',
        error
      );

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

    window.addEventListener(
      'auth-change',
      handleAuthChange
    );

    window.addEventListener(
      'focus',
      handleAuthChange
    );

    window.addEventListener(
      'cart-update',
      fetchCartCount
    );

    return () => {
      window.removeEventListener(
        'auth-change',
        handleAuthChange
      );

      window.removeEventListener(
        'focus',
        handleAuthChange
      );

      window.removeEventListener(
        'cart-update',
        fetchCartCount
      );
    };
  }, []);

  // ============================================================
  // FETCH CART WHEN PATHNAME CHANGES
  // ============================================================

  useEffect(() => {
    fetchCartCount();
  }, [pathname]);

  // ============================================================
  // CART UPDATE LISTENER
  // ============================================================

  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener(
      'cart-update',
      handleCartUpdate
    );

    return () => {
      window.removeEventListener(
        'cart-update',
        handleCartUpdate
      );
    };
  }, []);

  // ============================================================
  // GET ICON
  // ============================================================

  const getIcon = (iconName) => {
    const Icon = ICON_MAP[iconName];

    return Icon || Package;
  };

  // ============================================================
  // NAVIGATION ITEMS
  // ============================================================

  const getNavItems = () => {
    if (
      navbarData?.items &&
      navbarData.items.length > 0
    ) {
      return navbarData.items.filter(
        (item) => item.isActive !== false
      );
    }

    return [
      {
        id: '1',
        name: 'Home',
        href: '/',
        icon: 'Home',
      },
      {
        id: '2',
        name: 'Products',
        href: '/products',
        icon: 'Sparkles',
      },
      {
        id: '3',
        name: 'Track Order',
        href: '/track',
        icon: 'MapPin',
      },
      {
        id: '4',
        name: 'About',
        href: '/about',
        icon: 'Flower2',
      },
      {
        id: '5',
        name: 'Contact',
        href: '/contact',
        icon: 'Phone',
      },
    ];
  };

  const navItems = getNavItems();

  // ============================================================
  // ACTIVE LINK
  // ============================================================

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(path);
  };

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
        `${API_URL}/api/products?search=${encodeURIComponent(
          query
        )}&limit=5`
      );

      const data = await response.json();

      if (
        data.success &&
        data.data &&
        data.data.length > 0
      ) {
        setSearchResults(data.data);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error(
        'Search error:',
        error
      );

      setSearchResults([]);
      setShowResults(false);
    } finally {
      setSearchLoading(false);
    }
  };

  // ============================================================
  // SEARCH DEBOUNCE
  // ============================================================

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

  // ============================================================
  // SEARCH SUBMIT
  // ============================================================

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(
          searchQuery
        )}`
      );

      setSearchOpen(false);
      setMobileSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  // ============================================================
  // SEARCH RESULT CLICK
  // ============================================================

  const handleResultClick = (result) => {
    const productId = result._id;

    const productSlug =
      result.slug || productId;

    if (productSlug) {
      setSearchOpen(false);
      setMobileSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);

      setTimeout(() => {
        router.push(
          `/product/${productSlug}`
        );
      }, 50);
    } else {
      router.push(
        `/search?q=${encodeURIComponent(
          searchQuery
        )}`
      );
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

    window.dispatchEvent(
      new Event('cart-update')
    );

    window.dispatchEvent(
      new Event('auth-change')
    );

    toast.success(
      'Logged out successfully!'
    );

    router.push('/');
  };

  // ============================================================
  // DASHBOARD LINK
  // ============================================================

  const getDashboardLink = () => {
    if (!user) {
      return '/';
    }

    if (
      [
        'admin',
        'super_admin',
        'moderator',
      ].includes(user.role)
    ) {
      return '/authorize/dashboard';
    }

    if (
      user.role === 'call_center_agent'
    ) {
      return '/agent/dashboard';
    }

    return '/customer/dashboard';
  };

  // ============================================================
  // SETTINGS LINK
  // ============================================================

  const getSettingsLink = () => {
    if (!user) {
      return '/';
    }

    if (
      [
        'admin',
        'super_admin',
        'moderator',
      ].includes(user.role)
    ) {
      return '/authorize/settings';
    }

    if (
      user.role === 'call_center_agent'
    ) {
      return '/agent/settings';
    }

    return '/customer/settings';
  };

  // ============================================================
  // DISPLAY NAME
  // ============================================================

  const getDisplayName = () => {
    if (!user) {
      return '';
    }

    return (
      user.companyName ||
      user.contactPerson ||
      user.email?.split('@')[0] ||
      'User'
    );
  };

  // ============================================================
  // INITIALS
  // ============================================================

  const getInitials = () => {
    if (!user) {
      return 'U';
    }

    const name = getDisplayName();

    return name
      .charAt(0)
      .toUpperCase();
  };

  // ============================================================
  // PROFILE PICTURE
  // ============================================================

  const getProfilePicture = () => {
    return (
      user?.profilePicture ||
      user?.photoURL ||
      null
    );
  };

  // ============================================================
  // LOGO URL
  // ============================================================

  const getLogoUrl = (url) => {
    if (!url) {
      return '/logo.png';
    }

    if (
      url.includes(
        'cloudinary.com'
      )
    ) {
      const parts =
        url.split('/upload/');

      if (parts.length === 2) {
        return `${parts[0]}/upload/f_auto,q_auto:good,fl_preserve_transparency/${parts[1]}`;
      }
    }

    return url;
  };

  // ============================================================
  // AUTHORIZE ROLE
  // ============================================================

  const isAuthorizeRole =
    user &&
    [
      'admin',
      'super_admin',
      'moderator',
    ].includes(user.role);

  // ============================================================
  // LOADING
  // ============================================================

  if (
    authLoading ||
    navbarLoading
  ) {
    return (
      <div
        className="fixed top-0 z-50 w-full bg-white border-b border-[#E8E0D8]"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            <div className="w-10 h-10 bg-[#E8DCD0] rounded animate-pulse" />

            <div className="flex gap-4">

              <div className="w-8 h-8 bg-[#E8DCD0] rounded animate-pulse" />

              <div className="w-8 h-8 bg-[#E8DCD0] rounded animate-pulse" />

              <div className="w-16 h-8 bg-[#E8DCD0] rounded animate-pulse" />

            </div>

          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <>
      {/* ======================================================
          MAIN NAVBAR - WHITE BACKGROUND
      ====================================================== */}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4">

          <div className="flex items-center justify-between h-16">

            {/* ==================================================
                LEFT SECTION
            ================================================== */}

            <div className="flex items-center gap-1 md:gap-0 flex-1">

              {/* Mobile Menu */}
              <button
                onClick={() =>
                  setIsMenuOpen(
                    !isMenuOpen
                  )
                }
                className="md:hidden p-2 -ml-1 rounded-lg transition-all duration-200 hover:bg-[#F2F5F0]"
              >
                <Menu
                  className="w-5 h-5 text-[#3D3D3D]"
                />
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">

                {navItems.map((item) => {
                  const Icon =
                    getIcon(item.icon);

                  return (
                    <Link
                      key={
                        item.id ||
                        item.name
                      }
                      href={item.href}
                      className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(
                          item.href
                        )
                          ? 'text-[#8B9D83]'
                          : 'text-[#3D3D3D] hover:text-[#8B9D83]'
                      }`}
                      style={{
                        fontFamily:
                          '"Raleway", "Inter", sans-serif',
                      }}
                    >
                      {item.name}

                      {isActive(
                        item.href
                      ) && (
                        <span
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full bg-[#8B9D83]"
                        />
                      )}
                    </Link>
                  );
                })}

              </div>
            </div>

            {/* ==================================================
                CENTER LOGO
            ================================================== */}

            <div className="flex items-center justify-center flex-shrink-0">

              <Link
                href="/"
                className="flex items-center group"
              >
                <div className="relative w-24 h-11 md:w-28 md:h-12 lg:w-32 lg:h-14 transition-transform group-hover:scale-105 duration-300">

                  {navbarData?.logo?.logoUrl ? (
                    <img
                      src={getLogoUrl(
                        navbarData.logo.logoUrl
                      )}
                      alt={
                        navbarData.logo.text ||
                        'Glow&Co'
                      }
                      className="w-full h-full object-contain"
                      style={{
                        background:
                          'transparent',
                      }}
                    />
                  ) : (
                    <img
                      src="/logo.png"
                      alt="Glow&Co Logo"
                      className="w-full h-full object-contain"
                    />
                  )}

                </div>
              </Link>

            </div>

            {/* ==================================================
                RIGHT SECTION - BEAUTY THEME
            ================================================== */}

            <div className="flex items-center justify-end flex-1">

              {/* ==================================================
                  DESKTOP SEARCH
              ================================================== */}

              <div
                className="hidden md:block relative"
                ref={searchRef}
              >

                {!searchOpen ? (

                  /* Search Trigger - Skin tone style */
                  <button
                    type="button"
                    onClick={() =>
                      setSearchOpen(true)
                    }
                    className="search-trigger group flex items-center w-[200px] lg:w-[260px] border-b border-[#E8E0D8] hover:border-[#8B9D83] transition-colors duration-200 py-2"
                  >

                    <Search
                      className="w-[18px] h-[18px] text-[#6B6B6B] flex-shrink-0"
                      strokeWidth={1.7}
                    />

                    <span
                      className="ml-4 text-[14px] text-[#6B6B6B] group-hover:text-[#3D3D3D] transition-colors"
                      style={{
                        fontFamily:
                          '"Raleway", "Inter", sans-serif',
                      }}
                    >
                      {typewriterText}
                    </span>

                  </button>

                ) : (

                  /* Active Search */
                  <div className="relative">

                    <form
                      onSubmit={
                        handleSearchSubmit
                      }
                      className="relative"
                    >

                      <div className="flex items-center w-[200px] lg:w-[260px] border-b border-[#8B9D83] py-1.5">

                        <Search
                          className="w-[18px] h-[18px] text-[#3D3D3D] flex-shrink-0"
                          strokeWidth={1.7}
                        />

                        <input
                          type="text"
                          value={
                            searchQuery
                          }
                          onChange={(e) =>
                            setSearchQuery(
                              e.target.value
                            )
                          }
                          placeholder={typewriterText}
                          className="w-full ml-4 pr-16 text-[14px] text-[#3D3D3D] placeholder:text-[#6B6B6B] bg-transparent focus:outline-none"
                          style={{
                            fontFamily:
                              '"Raleway", "Inter", sans-serif',
                          }}
                          autoFocus
                        />

                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">

                          {searchLoading ? (
                            <div className="w-4 h-4 border-2 border-[#8B9D83] border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <button
                              type="submit"
                              className="p-1 text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors"
                            >
                              <Search
                                className="w-[15px] h-[15px]"
                                strokeWidth={1.7}
                              />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              setSearchOpen(
                                false
                              );

                              setSearchQuery(
                                ''
                              );

                              setShowResults(
                                false
                              );
                            }}
                            className="p-1 ml-1 text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors"
                          >
                            <X
                              className="w-[15px] h-[15px]"
                              strokeWidth={1.7}
                            />
                          </button>

                        </div>

                      </div>

                    </form>

                    {/* ==================================================
                        DESKTOP SEARCH RESULTS
                    ================================================== */}

                    {showResults &&
                      searchResults.length >
                        0 && (

                        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-[#E8E0D8] max-h-96 overflow-y-auto z-50">

                          <div className="py-2">

                            {searchResults.map(
                              (product) => (

                                <button
                                  key={
                                    product._id
                                  }
                                  onMouseDown={(
                                    e
                                  ) => {
                                    e.preventDefault();

                                    handleResultClick(
                                      product
                                    );
                                  }}
                                  className="w-full px-4 py-3 text-left hover:bg-[#F2F5F0] transition-colors flex items-center gap-3 border-b border-[#E8E0D8] last:border-0"
                                >

                                  {product.images &&
                                  product
                                    .images
                                    .length >
                                    0 ? (

                                    <img
                                      src={
                                        product
                                          .images[0]
                                          ?.url ||
                                        product
                                          .images[0]
                                      }
                                      alt={
                                        product.productName ||
                                        product.name
                                      }
                                      className="w-10 h-10 rounded-lg object-cover bg-[#F5EDE3]"
                                    />

                                  ) : (

                                    <div className="w-10 h-10 rounded-lg bg-[#F5EDE3] flex items-center justify-center">

                                      <Package
                                        className="w-5 h-5 text-[#6B6B6B]"
                                        strokeWidth={
                                          1.5
                                        }
                                      />

                                    </div>
                                  )}

                                  <div className="flex-1 min-w-0">

                                    <p
                                      className="font-medium text-[#3D3D3D] text-sm line-clamp-1"
                                      style={{
                                        fontFamily:
                                          '"Raleway", "Inter", sans-serif',
                                      }}
                                    >
                                      {product.productName ||
                                        product.name ||
                                        product.title}
                                    </p>

                                    <div className="flex items-center gap-2 mt-0.5">

                                      <p
                                        className="text-sm font-semibold text-[#8B9D83]"
                                        style={{
                                          fontFamily:
                                            '"Raleway", "Inter", sans-serif',
                                        }}
                                      >
                                        ৳
                                        {product.discountPrice ||
                                          product.regularPrice ||
                                          product.price}
                                      </p>

                                      {product.discountPrice &&
                                        product.regularPrice && (
                                          <p className="text-xs text-[#6B6B6B] line-through">
                                            ৳
                                            {
                                              product.regularPrice
                                            }
                                          </p>
                                        )}

                                    </div>

                                  </div>

                                </button>
                              )
                            )}

                            <button
                              onClick={
                                handleSearchSubmit
                              }
                              className="w-full px-4 py-2.5 text-center text-sm text-[#8B9D83] hover:bg-[#F2F5F0] font-medium border-t border-[#E8E0D8] transition-colors"
                              style={{
                                fontFamily:
                                  '"Raleway", "Inter", sans-serif',
                              }}
                            >
                              View all results
                              for "
                              {
                                searchQuery
                              }
                              " →
                            </button>

                          </div>

                        </div>
                      )}

                  </div>
                )}

              </div>

              {/* ==================================================
                  MOBILE SEARCH TRIGGER
              ================================================== */}

              <button
                onClick={() =>
                  setMobileSearchOpen(
                    true
                  )
                }
                className="mobile-search-trigger md:hidden p-2 hover:bg-[#F2F5F0] rounded-full transition-colors"
              >
                <Search
                  className="w-[20px] h-[20px] text-[#3D3D3D]"
                  strokeWidth={1.7}
                />
              </button>

              {/* ==================================================
                  USER ICON
              ================================================== */}

              {user ? (

                <div className="relative ml-5">

                  <button
                    onClick={() =>
                      setUserMenuOpen(
                        !userMenuOpen
                      )
                    }
                    className="flex items-center justify-center hover:opacity-70 transition-opacity"
                    aria-label="Account"
                  >

                    {getProfilePicture() &&
                    !profileImageError ? (

                      <img
                        src={getProfilePicture()}
                        alt={getDisplayName()}
                        onError={() =>
                          setProfileImageError(
                            true
                          )
                        }
                        className="w-[24px] h-[24px] rounded-full object-cover"
                      />

                    ) : (

                      <UserCircle
                        className="w-[25px] h-[25px] text-[#3D3D3D]"
                        strokeWidth={1.5}
                      />

                    )}

                  </button>

                  {/* USER DROPDOWN */}

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() =>
                          setUserMenuOpen(
                            false
                          )
                        }
                      />

                      <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-[#E8E0D8] overflow-hidden z-50 animate-fadeIn">

                        {/* User Info */}

                        <div className="px-4 py-3 border-b border-[#E8E0D8] bg-[#F5EDE3]">

                          <p
                            className="text-[#3D3D3D] font-semibold text-sm truncate"
                            style={{
                              fontFamily:
                                '"Raleway", "Inter", sans-serif',
                            }}
                          >
                            {getDisplayName()}
                          </p>

                          <p
                            className="text-[#6B6B6B] text-xs truncate mt-0.5"
                            style={{
                              fontFamily:
                                '"Raleway", "Inter", sans-serif',
                            }}
                          >
                            {user.email}
                          </p>

                          <div className="mt-1.5">

                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#8B9D83] text-white"
                              style={{
                                fontFamily:
                                  '"Raleway", "Inter", sans-serif',
                              }}
                            >
                              {user.role ===
                              'call_center_agent'
                                ? 'Call Center Agent'
                                : user.role ===
                                  'super_admin'
                                ? 'Super Admin'
                                : user.role ===
                                  'admin'
                                ? 'Admin'
                                : user.role ===
                                  'moderator'
                                ? 'Moderator'
                                : 'Customer'}
                            </span>

                          </div>

                        </div>

                        {/* Dropdown Actions */}

                        <div className="py-2">

                          {/* Dashboard */}

                          <div
                            onClick={() => {
                              setUserMenuOpen(
                                false
                              );

                              window.location.href =
                                getDashboardLink();
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3D3D3D] hover:bg-[#F2F5F0] transition-colors cursor-pointer"
                            style={{
                              fontFamily:
                                '"Raleway", "Inter", sans-serif',
                            }}
                          >

                            <LayoutDashboard
                              className="w-4 h-4 text-[#8B9D83]"
                              strokeWidth={
                                1.7
                              }
                            />

                            <span>
                              Dashboard
                            </span>

                          </div>

                          {/* Settings */}

                          <div
                            onClick={() => {
                              setUserMenuOpen(
                                false
                              );

                              window.location.href =
                                getSettingsLink();
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3D3D3D] hover:bg-[#F2F5F0] transition-colors cursor-pointer"
                            style={{
                              fontFamily:
                                '"Raleway", "Inter", sans-serif',
                            }}
                          >

                            <Settings
                              className="w-4 h-4 text-[#8B9D83]"
                              strokeWidth={
                                1.7
                              }
                            />

                            <span>
                              Settings
                            </span>

                          </div>

                          <div className="border-t border-[#E8E0D8] my-1" />

                          {/* Logout */}

                          <button
                            onClick={() => {
                              setUserMenuOpen(
                                false
                              );

                              logout();
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
                            style={{
                              fontFamily:
                                '"Raleway", "Inter", sans-serif',
                            }}
                          >

                            <LogOut
                              className="w-4 h-4"
                              strokeWidth={
                                1.7
                              }
                            />

                            <span>
                              Logout
                            </span>

                          </button>

                        </div>

                      </div>
                    </>
                  )}

                </div>

              ) : (

                /* Logged Out User Icon */

                <Link
                  href="/login"
                  className="ml-5 flex items-center justify-center hover:opacity-70 transition-opacity"
                  aria-label="Sign In"
                >
                  <UserCircle
                    className="w-[25px] h-[25px] text-[#3D3D3D]"
                    strokeWidth={1.5}
                  />
                </Link>

              )}

              {/* ==================================================
                  SHOPPING BAG
              ================================================== */}

              <button
                onClick={() =>
                  setIsCartOpen(true)
                }
                className="relative ml-5 flex items-center justify-center hover:opacity-70 transition-opacity"
                aria-label="Shopping bag"
              >

                <ShoppingBag
                  className="w-[25px] h-[25px] text-[#3D3D3D]"
                  strokeWidth={1.5}
                />

                {/* Cart Count */}

                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-[#8B9D83] text-white text-[9px] font-semibold rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-1"
                    style={{
                      fontFamily:
                        '"Raleway", "Inter", sans-serif',
                    }}
                  >
                    {cartCount > 9
                      ? '9+'
                      : cartCount}
                  </span>
                )}

              </button>

            </div>

          </div>

        </div>
      </nav>

      {/* ========================================================
          MOBILE SEARCH OVERLAY
      ======================================================== */}

      {mobileSearchOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white shadow-lg border-b border-[#E8E0D8] animate-slideDown md:hidden">

          <div
            className="container mx-auto px-4 py-3"
            ref={mobileSearchRef}
          >

            <form
              onSubmit={
                handleSearchSubmit
              }
              className="relative"
            >

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                placeholder={typewriterText}
                className="w-full px-4 py-3 pr-20 text-sm text-[#3D3D3D] bg-[#F5EDE3] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all"
                style={{
                  fontFamily:
                    '"Raleway", "Inter", sans-serif',
                }}
                autoFocus
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">

                <button
                  type="submit"
                  className="p-1.5"
                >

                  {searchLoading ? (
                    <div className="w-4 h-4 border-2 border-[#8B9D83] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 text-[#8B9D83]" />
                  )}

                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileSearchOpen(
                      false
                    );

                    setSearchQuery('');
                    setShowResults(false);
                  }}
                  className="p-1.5 text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

              </div>

            </form>

            {/* Mobile Search Results */}

            {showResults &&
              searchResults.length >
                0 && (

                <div className="mt-3 bg-white rounded-lg border border-[#E8E0D8] max-h-96 overflow-y-auto">

                  {searchResults.map(
                    (product) => (

                      <button
                        key={
                          product._id
                        }
                        onMouseDown={(
                          e
                        ) => {
                          e.preventDefault();

                          handleResultClick(
                            product
                          );
                        }}
                        className="w-full px-3 py-3 text-left hover:bg-[#F2F5F0] transition-colors flex items-center gap-3 border-b border-[#E8E0D8] last:border-0"
                      >

                        {product.images &&
                        product.images.length >
                          0 ? (

                          <img
                            src={
                              product
                                .images[0]
                                ?.url ||
                              product
                                .images[0]
                            }
                            alt={
                              product.productName ||
                              product.name
                            }
                            className="w-12 h-12 rounded-lg object-cover bg-[#F5EDE3]"
                          />

                        ) : (

                          <div className="w-12 h-12 rounded-lg bg-[#F5EDE3] flex items-center justify-center">

                            <Package className="w-6 h-6 text-[#6B6B6B]" />

                          </div>

                        )}

                        <div className="flex-1">

                          <p
                            className="font-medium text-[#3D3D3D] text-sm line-clamp-1"
                            style={{
                              fontFamily:
                                '"Raleway", "Inter", sans-serif',
                            }}
                          >
                            {product.productName ||
                              product.name ||
                              product.title}
                          </p>

                          <p
                            className="text-sm font-semibold text-[#8B9D83] mt-0.5"
                            style={{
                              fontFamily:
                                '"Raleway", "Inter", sans-serif',
                            }}
                          >
                            ৳
                            {product.discountPrice ||
                              product.regularPrice ||
                              product.price}
                          </p>

                        </div>

                      </button>
                    )
                  )}

                  <button
                    onClick={
                      handleSearchSubmit
                    }
                    className="w-full px-4 py-3 text-center text-sm text-[#8B9D83] hover:bg-[#F2F5F0] font-medium border-t border-[#E8E0D8]"
                    style={{
                      fontFamily:
                        '"Raleway", "Inter", sans-serif',
                    }}
                  >
                    View all results
                    for "
                    {searchQuery}"
                    →
                  </button>

                </div>
              )}

          </div>

        </div>
      )}

      {/* ========================================================
          MOBILE MENU SIDEBAR
      ======================================================== */}

      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isMenuOpen
            ? 'visible'
            : 'invisible'
        }`}
      >

        {/* Overlay */}

        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen
              ? 'opacity-100'
              : 'opacity-0'
          }`}
          onClick={() =>
            setIsMenuOpen(false)
          }
        />

        {/* Sidebar */}

        <div
          className={`absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }`}
        >

          <div className="flex flex-col h-full">

            {/* Header */}

            <div className="flex items-center justify-between p-5 border-b border-[#E8E0D8]">

              <div className="flex items-center space-x-2.5">

                <div className="w-8 h-8">

                  {navbarData?.logo?.logoUrl ? (

                    <img
                      src={getLogoUrl(
                        navbarData.logo.logoUrl
                      )}
                      alt={
                        navbarData.logo.text ||
                        'Glow&Co'
                      }
                      className="w-full h-full object-contain"
                    />

                  ) : (

                    <img
                      src="/logo.png"
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />

                  )}

                </div>

                <div>

                  <span
                    className="font-bold text-[#3D3D3D] text-base"
                    style={{
                      fontFamily:
                        '"Raleway", "Inter", sans-serif',
                    }}
                  >
                    {navbarData?.logo
                      ?.text ||
                      'Glow&Co'}

                    {navbarData?.logo
                      ?.highlightText && (
                      <span className="text-[#8B9D83]">
                        {
                          navbarData
                            .logo
                            .highlightText
                        }
                      </span>
                    )}
                  </span>

                  <span
                    className="text-[10px] text-[#8B9D83] block -mt-1 tracking-wider"
                    style={{
                      fontFamily:
                        '"Raleway", "Inter", sans-serif',
                    }}
                  >
                    BEAUTY
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  setIsMenuOpen(
                    false
                  )
                }
                className="p-2 rounded-lg hover:bg-[#F2F5F0] transition-colors"
              >
                <X className="w-5 h-5 text-[#3D3D3D]" />
              </button>

            </div>

            {/* Navigation Items */}

            <div className="flex-1 overflow-y-auto py-3">

              {navItems.map((item) => {

                const Icon =
                  getIcon(item.icon);

                return (
                  <Link
                    key={
                      item.id ||
                      item.name
                    }
                    href={item.href}
                    onClick={() =>
                      setIsMenuOpen(
                        false
                      )
                    }
                    className={`flex items-center gap-3 px-5 py-3 mx-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(
                        item.href
                      )
                        ? 'text-[#8B9D83] font-semibold'
                        : 'text-[#3D3D3D] hover:text-[#8B9D83] hover:bg-[#F2F5F0]'
                    }`}
                    style={{
                      fontFamily:
                        '"Raleway", "Inter", sans-serif',

                      borderLeft:
                        isActive(
                          item.href
                        )
                          ? '3px solid #8B9D83'
                          : 'none',

                      paddingLeft:
                        isActive(
                          item.href
                        )
                          ? '17px'
                          : '20px',
                    }}
                  >

                    <Icon
                      className={`w-4.5 h-4.5 ${
                        isActive(
                          item.href
                        )
                          ? 'text-[#8B9D83]'
                          : 'text-[#6B6B6B]'
                      }`}
                    />

                    <span>
                      {item.name}
                    </span>

                  </Link>
                );
              })}

              <div className="my-3 mx-5 h-px bg-gradient-to-r from-[#8B9D83]/20 via-[#8B9D83]/40 to-[#8B9D83]/20" />

              {/* ==================================================
                  MOBILE AUTH
              ================================================== */}

              {!user ? (

                <div className="px-5 mt-3">

                  <Link
                    href="/login"
                    onClick={() =>
                      setIsMenuOpen(
                        false
                      )
                    }
                    className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-[#8B9D83] text-white hover:bg-[#6B7D63] transition-all shadow-sm"
                    style={{
                      fontFamily:
                        '"Raleway", "Inter", sans-serif',
                    }}
                  >
                    Sign In
                  </Link>

                </div>

              ) : (

                <div className="px-5 mt-3">

                  {/* Mobile User Info */}

                  <div className="flex items-center gap-3 p-3 bg-[#F5EDE3] rounded-lg mb-3">

                    {getProfilePicture() &&
                    !profileImageError ? (

                      <img
                        src={getProfilePicture()}
                        alt={getDisplayName()}
                        onError={() =>
                          setProfileImageError(
                            true
                          )
                        }
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#8B9D83]/30"
                      />

                    ) : (

                      <div className="w-10 h-10 rounded-full bg-[#8B9D83] flex items-center justify-center text-white font-semibold text-sm">

                        {getInitials()}

                      </div>

                    )}

                    <div className="flex-1">

                      <p
                        className="font-semibold text-[#3D3D3D] text-sm"
                        style={{
                          fontFamily:
                            '"Raleway", "Inter", sans-serif',
                        }}
                      >
                        {getDisplayName()}
                      </p>

                      <p
                        className="text-[#8B9D83] text-xs truncate"
                        style={{
                          fontFamily:
                            '"Raleway", "Inter", sans-serif',
                        }}
                      >
                        {user.email}
                      </p>

                    </div>

                  </div>

                  {/* Dashboard */}

                  <div
                    onClick={() => {
                      setIsMenuOpen(
                        false
                      );

                      window.location.href =
                        getDashboardLink();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-[#3D3D3D] hover:bg-[#F2F5F0] transition-colors mb-1 cursor-pointer"
                    style={{
                      fontFamily:
                        '"Raleway", "Inter", sans-serif',
                    }}
                  >

                    <LayoutDashboard className="w-4 h-4 text-[#8B9D83]" />

                    Dashboard

                  </div>

                  {/* Settings */}

                  <div
                    onClick={() => {
                      setIsMenuOpen(
                        false
                      );

                      window.location.href =
                        getSettingsLink();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-[#3D3D3D] hover:bg-[#F2F5F0] transition-colors mb-2 cursor-pointer"
                    style={{
                      fontFamily:
                        '"Raleway", "Inter", sans-serif',
                    }}
                  >

                    <Settings className="w-4 h-4 text-[#8B9D83]" />

                    Settings

                  </div>

                  {/* Logout */}

                  <button
                    onClick={() => {
                      setIsMenuOpen(
                        false
                      );

                      logout();
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
                    style={{
                      fontFamily:
                        '"Raleway", "Inter", sans-serif',
                    }}
                  >

                    <LogOut className="w-4 h-4" />

                    Logout

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          CART SIDEBAR
      ======================================================== */}

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() =>
          setIsCartOpen(false)
        }
      />

      {/* ========================================================
          ANIMATIONS
      ======================================================== */}

      <style jsx>{`

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideLeft {
          animation: slideLeft 0.25s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .w-4.5 {
          width: 1.125rem;
        }

        .h-4.5 {
          height: 1.125rem;
        }

      `}</style>
    </>
  );
}