
// 'use client';

// import { useState, useEffect, useCallback, useMemo } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   MessageSquare,
//   FileText,
//   Package,
//   FolderPlus,
//   Gift,
//   ShoppingBag,
//   Ticket,
//   Award,
//   UserPlus,
//   UserCog,
//   Users,
//   Newspaper,
//   Star,
//   Settings,
//   LogOut,
//   Menu,
//   ChevronDown,
//   Home,
//   ChevronRight,
//   Truck,
//   ScanBarcode,
//   QrCode,
//   Cpu,
//   Smartphone,
//   Shield,
//   LayoutTemplate,
//   PanelTop,
//   Tag,
//   Sparkles,
//   Heart,
//   Store,
//   ShieldCheck,
//   UsersRound,
//   Headphones,
//   Settings2,
//   UserCheck,
//   Zap,
//   Battery,
//   ChevronUp,
//   Globe,
//   Phone,
//   Building2,
//   CircleAlert,
//   Ban,
//   Bike,
//   Layers,
//   SquareStack,
//   Box,
//   Palette,
//   Blocks,
//   Code2,
//   Database,
//   UserCog2,
//   Images,
//   MessageCircle,
//   Mail,
//   GiftIcon
// } from 'lucide-react';
// import DynamicLogo from '../components/DynamicLogo';
// import { FaChartLine } from 'react-icons/fa';

// export default function AuthorizeLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [userRole, setUserRole] = useState(null);
//   const [userPermissions, setUserPermissions] = useState([]);
//   const [dashboardAccess, setDashboardAccess] = useState([]);
//   const [expandedMenus, setExpandedMenus] = useState({
//     websiteLayout: true,
//     ordersGroup: true,
//     productsGroup: true,
//     pixelGroup: true,
//     usersGroup: true
//   });
//   const pathname = usePathname();
//   const router = useRouter();

//   // Toggle menu expansion
//   const toggleMenu = useCallback((menuKey) => {
//     setExpandedMenus(prev => ({
//       ...prev,
//       [menuKey]: !prev[menuKey]
//     }));
//   }, []);

//   // Helper function to normalize pathname
//   const normalizePath = useCallback((path) => {
//     if (path && path !== '/' && path.endsWith('/')) {
//       return path.slice(0, -1);
//     }
//     return path;
//   }, []);

//   // Helper function to check if a route is active - MEMOIZED
//   const isActive = useCallback((href) => {
//     const currentPath = normalizePath(pathname);
    
//     // Dashboard
//     if (href === '/authorize/dashboard') {
//       return currentPath === '/authorize/dashboard';
//     }

//     if (href === '/authorize/create-order') {
//       return currentPath === '/authorize/create-order';
//     }
    
//     // Orders group
//     if (href === '/authorize/orders') {
//       return currentPath === '/authorize/orders' || currentPath.startsWith('/authorize/orders/');
//     }
    
//     if (href === '/authorize/incomplete-orders') {
//       return currentPath === '/authorize/incomplete-orders' || currentPath.startsWith('/authorize/incomplete-orders/');
//     }
    
//     if (href === '/authorize/order-restrictions') {
//       return currentPath === '/authorize/order-restrictions' || currentPath.startsWith('/authorize/order-restrictions/');
//     }
    
//     if (href === '/authorize/courier-settings') {
//       return currentPath === '/authorize/courier-settings' || currentPath.startsWith('/authorize/courier-settings/');
//     }
    
//     if (href === '/authorize/courier-score-page') {
//       return currentPath === '/authorize/courier-score-page' || currentPath.startsWith('/authorize/courier-score-page/');
//     }
    
//     // Products group
//     if (href === '/authorize/all-products') {
//       const matches = ['/authorize/all-products', '/authorize/editProduct', '/authorize/viewProduct', '/authorize/product'].some(route => currentPath === route);
//       return matches || currentPath.startsWith('/authorize/products/');
//     }
    
//     if (href === '/authorize/create-products') {
//       return ['/authorize/create-products', '/authorize/createProduct'].some(route => currentPath === route);
//     }
    
//     if (href === '/authorize/create-categories') {
//       return ['/authorize/create-categories', '/authorize/createCategory'].some(route => currentPath === route);
//     }

//     if (href === '/authorize/tags') {
//       return currentPath === '/authorize/tags';
//     }

//     if (href === '/authorize/brand-management') {
//       return currentPath === '/authorize/brand-management';
//     }

//     // Pixel group
//     if (href === '/authorize/pixel-settings') {
//       return currentPath === '/authorize/pixel-settings';
//     }
    
//     if (href === '/authorize/custom-code') {
//       return currentPath === '/authorize/custom-code';
//     }

//     // Users group
//     if (href === '/authorize/create-users') {
//       return ['/authorize/create-users', '/authorize/createUser'].some(route => currentPath === route);
//     }
    
//     if (href === '/authorize/manage-users') {
//       return currentPath === '/authorize/manage-users' || currentPath === '/authorize/editUser' || currentPath.startsWith('/authorize/manage-users/');
//     }
    
//     if (href === '/authorize/all-customers') {
//       return currentPath === '/authorize/all-customers' || currentPath === '/authorize/customer' || currentPath.startsWith('/authorize/all-customers/');
//     }
    
//     if (href === '/authorize/role-management') {
//       return currentPath === '/authorize/role-management';
//     }

//     // Delivery
//     if (href === '/authorize/delivery-settings') {
//       return currentPath === '/authorize/delivery-settings';
//     }
    
//     // Banners
//     if (href === '/authorize/create-banner') {
//       return currentPath === '/authorize/create-banner';
//     }
    
//     if (href === '/authorize/banner-management') {
//       return currentPath === '/authorize/banner-management';
//     }
    
//     // Settings
//     if (href === '/authorize/settings') {
//       return currentPath === '/authorize/settings' || currentPath.startsWith('/authorize/settings/');
//     }

//     if (href === '/authorize/footer') {
//       return currentPath === '/authorize/footer';
//     }

//     if (href === '/authorize/support') {
//       return currentPath === '/authorize/support';
//     }
    
//     // Website Layout children
//     if (href === '/authorize/navbar-management') {
//       return currentPath === '/authorize/navbar-management';
//     }
    
//     if (href === '/authorize/homepage-management') {
//       return currentPath === '/authorize/homepage-management';
//     }
    
//     if (href === '/authorize/terms-management') {
//       return currentPath === '/authorize/terms-management';
//     }
//       if (href === '/authorize/why-choose-us-management') {
//       return currentPath === '/authorize/why-choose-us-management';
//     }
    
//     if (href === '/authorize/privacy-management') {
//       return currentPath === '/authorize/privacy-management';
//     }
    
//     if (href === '/authorize/contact-management') {
//       return currentPath === '/authorize/contact-management';
//     }
    
//     if (href === '/authorize/about-management') {
//       return currentPath === '/authorize/about-management';
//     }
    
//     // Manage Reviews
//     if (href === '/authorize/manage-reviews') {
//       return currentPath === '/authorize/manage-reviews';
//     } 
//      if (href === '/authorize/product-cost') {
//       return currentPath === '/authorize/product-cost';
//     } 
//     if (href === '/authorize/media-library') {
//       return currentPath === '/authorize/media-library';
//     } 
//     if (href === '/authorize/profit-margin') {
//       return currentPath === '/authorize/profit-margin';
//     }
//     if (href === '/authorize/email-settings') {
//       return currentPath === '/authorize/email-settings';
//     }

//     return false;
//   }, [pathname, normalizePath]);

//   // Check if any child route is active
//   const isChildActive = useCallback((childHrefs) => {
//     return childHrefs.some(href => isActive(href));
//   }, [isActive]);

//   // Check if user can access a menu item
//   const canAccessMenuItem = useCallback((menuItem) => {
//     if (userRole === 'super_admin') return true;
    
//     const oldToNewKeyMap = {
//       'analytics': 'dashboard',
//       'orders': 'all_orders',
//       'products': 'all_products',
//       'banners': 'manage_banner',
//       'content': 'manage_navbar',
//       'users': 'manage_users',
//       'roles': 'role_management',
//       'delivery': 'delivery_settings',
//       'media': 'media_library',
//       'homepage': 'manage_homepage',
//       'reviews': 'manage_reviews',
//       'settings': 'settings',
//       'create_order': 'create_order',
//       'why_choose_us': 'manage_why_choose_us'
//     };
    
//     if (typeof menuItem === 'string') {
//       const newKey = oldToNewKeyMap[menuItem] || menuItem;
//       return dashboardAccess.includes(newKey) || dashboardAccess.includes(menuItem);
//     }
    
//     if (menuItem.children) {
//       return menuItem.children.some(child => {
//         const newKey = oldToNewKeyMap[child.accessKey] || child.accessKey;
//         return dashboardAccess.includes(newKey) || dashboardAccess.includes(child.accessKey);
//       });
//     }
    
//     if (menuItem.accessKey) {
//       const newKey = oldToNewKeyMap[menuItem.accessKey] || menuItem.accessKey;
//       return dashboardAccess.includes(newKey) || dashboardAccess.includes(menuItem.accessKey);
//     }
    
//     return false;
//   }, [userRole, dashboardAccess]);

//   // Get role display name and icon
//   const getRoleInfo = useCallback((role) => {
//     const roleMap = {
//       super_admin: { 
//         name: 'Super Administrator', 
//         icon: ShieldCheck,
//         color: 'from-yellow-500 to-orange-500',
//         badgeColor: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-200'
//       },
//       admin: { 
//         name: 'Administrator', 
//         icon: UsersRound,
//         color: 'from-[#EE4275] to-[#FF6B9D]',
//         badgeColor: 'bg-[#F7C7D3]/30 text-[#EE4275] border-[#EE4275]/30'
//       },
//       moderator: { 
//         name: 'Moderator', 
//         icon: Shield,
//         color: 'from-blue-600 to-blue-700',
//         badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
//       },
//       call_center_agent: { 
//         name: 'Call Center Agent', 
//         icon: Headphones,
//         color: 'from-purple-600 to-purple-700',
//         badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
//       }
//     };
//     return roleMap[role] || roleMap.admin;
//   }, []);

//   // Navigation items - MEMOIZED
//   const navigationItems = useMemo(() => [
//     { 
//       name: 'Dashboard', 
//       href: '/authorize/dashboard', 
//       icon: LayoutDashboard,
//       accessKey: 'dashboard'
//     },
//     { 
//       name: 'Profit Margin', 
//       href: '/authorize/profit-margin', 
//       icon: FaChartLine,
//       accessKey: 'profit_margin'
//     },
//     {
//       name: 'Orders',
//       isGroup: true,
//       accessKey: 'orders',
//       icon: ShoppingBag,
//       children: [

//         {
//           name: 'Create Order',
//           href: '/authorize/create-order',
//           icon: ShoppingBag,
//           accessKey: 'create_order'
//         },
//         { 
//           name: 'All Orders', 
//           href: '/authorize/orders', 
//           icon: MessageSquare,
//           accessKey: 'all_orders'
//         },
//         { 
//           name: 'Incomplete Orders', 
//           href: '/authorize/incomplete-orders', 
//           icon: CircleAlert,
//           accessKey: 'incomplete_orders'
//         },
//         { 
//           name: 'Order Restriction', 
//           href: '/authorize/order-restrictions', 
//           icon: Ban,
//           accessKey: 'order_restrictions'
//         },
//         { 
//           name: 'Courier Settings', 
//           href: '/authorize/courier-settings', 
//           icon: Bike,
//           accessKey: 'courier_settings'
//         },
//         { 
//           name: 'Courier Score', 
//           href: '/authorize/courier-score-page', 
//           icon: Bike,
//           accessKey: 'courier_score'
//         }
//       ]
//     },
//     {
//       name: 'Products',
//       isGroup: true,
//       accessKey: 'products',
//       icon: Box,
//       children: [
//         { 
//           name: 'All Products', 
//           href: '/authorize/all-products', 
//           icon: ShoppingBag,
//           accessKey: 'all_products'
//         },
//         { 
//           name: 'Create Products', 
//           href: '/authorize/create-products', 
//           icon: Gift,
//           accessKey: 'create_products'
//         },
//         { 
//           name: 'Cost Settings', 
//           href: '/authorize/product-cost', 
//           icon: Gift,
//           accessKey: 'product_cost'
//         },
//         { 
//           name: 'Create Category', 
//           href: '/authorize/create-categories', 
//           icon: FolderPlus,
//           accessKey: 'create_category'
//         },
//         { 
//           name: 'Manage Brands', 
//           href: '/authorize/brand-management', 
//           icon: Tag,
//           accessKey: 'manage_brands'
//         },
//         { 
//           name: 'Manage Tags', 
//           href: '/authorize/tags', 
//           icon: Layers,
//           accessKey: 'manage_tags'
//         }
//       ]
//     },
//     {
//       name: 'Website Layout',
//       isGroup: true,
//       accessKey: 'banners',
//       icon: LayoutTemplate,
//       children: [
//         { 
//           name: 'Manage Navbar', 
//           href: '/authorize/navbar-management', 
//           icon: Menu,
//           accessKey: 'manage_navbar'
//         },
//         { 
//           name: 'Create Banner', 
//           href: '/authorize/create-banner', 
//           icon: PanelTop,
//           accessKey: 'create_banner'
//         },
//         { 
//           name: 'Manage Banner', 
//           href: '/authorize/banner-management', 
//           icon: LayoutTemplate,
//           accessKey: 'manage_banner'
//         },
//         {
//   name: 'Manage Choose Us',
//   href: '/authorize/why-choose-us-management',
//   icon: Sparkles,
//   accessKey: 'manage_why_choose_us'
// },
// // In navigationItems array
// {
//   name: 'Deal Management',
//   href: '/authorize/deal-management',
//   icon: GiftIcon,
//   accessKey: 'deal_management'
// },
// // In navigationItems array, add:
// {
//   name: 'Trust Results',
//   href: '/authorize/trust-results-management',
//   icon: ShieldCheck,
//   accessKey: 'trust_results_management'
// },
//         { 
//           name: 'Manage Homepage', 
//           href: '/authorize/homepage-management', 
//           icon: Store,
//           accessKey: 'manage_homepage'
//         },
//         { 
//           name: 'Manage Footer', 
//           href: '/authorize/footer', 
//           icon: Globe,
//           accessKey: 'manage_footer'
//         },
//         { 
//           name: 'Terms Management', 
//           href: '/authorize/terms-management', 
//           icon: FileText,
//           accessKey: 'terms_management'
//         },
//         { 
//           name: 'Privacy Management', 
//           href: '/authorize/privacy-management', 
//           icon: Shield,
//           accessKey: 'privacy_management'
//         },
//         { 
//           name: 'Contact Management', 
//           href: '/authorize/contact-management', 
//           icon: Phone,
//           accessKey: 'contact_management'
//         },
//         { 
//           name: 'About Management', 
//           href: '/authorize/about-management', 
//           icon: Building2,
//           accessKey: 'about_management'
//         }
//       ]
//     },
//     {
//       name: 'Pixel',
//       isGroup: true,
//       accessKey: 'content',
//       icon: Code2,
//       children: [
//         { 
//           name: 'Pixel Settings', 
//           href: '/authorize/pixel-settings', 
//           icon: Database,
//           accessKey: 'pixel_settings'
//         },
//         { 
//           name: 'Custom Code', 
//           href: '/authorize/custom-code', 
//           icon: Code2,
//           accessKey: 'custom_code'
//         }
//       ]
//     },
//     { 
//       name: 'Manage Reviews', 
//       href: '/authorize/manage-reviews', 
//       icon: Star,
//       accessKey: 'manage_reviews'
//     },
//     {
//       name: 'User Management',
//       isGroup: true,
//       accessKey: 'users',
//       icon: Users,
//       children: [
//         { 
//           name: 'Create Users', 
//           href: '/authorize/create-users', 
//           icon: UserPlus,
//           accessKey: 'create_users'
//         },
//         { 
//           name: 'Manage Users', 
//           href: '/authorize/manage-users', 
//           icon: UserCog,
//           accessKey: 'manage_users'
//         },
//         { 
//           name: 'Create & Manage Customers', 
//           href: '/authorize/all-customers', 
//           icon: UsersRound,
//           accessKey: 'manage_customers'
//         },
//         { 
//           name: 'Role Management', 
//           href: '/authorize/role-management', 
//           icon: ShieldCheck,
//           accessKey: 'role_management'
//         }
//       ]
//     },
//     { 
//       name: 'Delivery Settings', 
//       href: '/authorize/delivery-settings', 
//       icon: Truck,
//       accessKey: 'delivery_settings'
//     },
//     { 
//       name: 'Media Library', 
//       href: '/authorize/media-library', 
//       icon: Images,
//       accessKey: 'media_library'
//     },
//     // In your admin sidebar/navigation
// {
//   name: 'Chat FAQ',
//   href: '/authorize/faq',
//   icon: MessageCircle,
//    accessKey: 'manage_faq'
// },
//     { 
//       name: 'Email Settings', 
//       href: '/authorize/email-settings', 
//       icon: Mail,
//       accessKey: 'email_settings'
//     },
//     { 
//       name: 'Settings', 
//       href: '/authorize/settings', 
//       icon: Settings,
//       accessKey: 'settings'
//     }
//   ], []);

//   // Filter navigation based on user role and permissions - MEMOIZED
//   const filteredNavigation = useMemo(() => {
//     return navigationItems.filter(item => {
//       if (item.isGroup) {
//         return item.children.some(child => canAccessMenuItem(child));
//       }
//       return canAccessMenuItem(item);
//     });
//   }, [navigationItems, canAccessMenuItem]);

//   // Check if any child in group is active
//   const getGroupActiveState = useCallback((group) => {
//     if (!group.isGroup) return false;
//     const childHrefs = group.children.map(child => child.href);
//     return isChildActive(childHrefs);
//   }, [isChildActive]);

//   // Navigation click handler - FIXED with better error handling
//   const handleNavigation = useCallback((href, e) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
    
//     console.log('🔄 Navigating to:', href);
//     setSidebarOpen(false);
    
//     // Use window.location for problematic routes to force navigation
//     const problemRoutes = ['/authorize/dashboard', '/authorize/create-products' ,  '/authorize/all-products', '/authorize/manage-users' , '/authorize/create-users', '/authorize/banner-management',];
//     if (problemRoutes.includes(href)) {
//       window.location.href = href;
//     } else {
//       router.push(href);
//     }
//   }, [router]);

//   useEffect(() => {
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';
    
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (!token || !userData) {
//       console.log('No token or user data found, redirecting to login');
//       logout();
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userData);
//       console.log('Parsed user data:', parsedUser);
//       console.log('User role:', parsedUser.role);
//       console.log('Dashboard Access:', parsedUser.dashboardAccess);
      
//       const adminRoles = ['super_admin', 'admin', 'moderator', 'call_center_agent'];
      
//       if (!adminRoles.includes(parsedUser.role)) {
//         console.log('Unauthorized admin access attempt by:', parsedUser.role);
//         logout();
//         return;
//       }

//       setUser(parsedUser);
//       setUserRole(parsedUser.role);
//       setUserPermissions(parsedUser.permissions || []);
//       setDashboardAccess(parsedUser.dashboardAccess || []);
      
//       console.log('✅ User authenticated successfully:', {
//         role: parsedUser.role,
//         permissions: parsedUser.permissions || [],
//         dashboardAccess: parsedUser.dashboardAccess || []
//       });
      
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [router]);

//   // Fetch updated user data periodically or on route change
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return;
        
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           if (data.success && data.user) {
//             localStorage.setItem('user', JSON.stringify(data.user));
//             setUser(data.user);
//             setUserRole(data.user.role);
//             setUserPermissions(data.user.permissions || []);
//             setDashboardAccess(data.user.dashboardAccess || []);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [pathname]);

//   const logout = useCallback(() => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   }, [router]);

//   // FIX: Add route watcher to handle navigation issues
//   useEffect(() => {
//     // Fix any broken routes on initial load
//     const fixRoute = () => {
//       const currentPath = window.location.pathname;
//       const problemRoutes = ['/authorize/dashboard', '/authorize/create-products', '/authorize/all-products', '/authorize/manage-users', '/authorize/create-users', '/authorize/banner-management'];
      
//       if (problemRoutes.includes(currentPath) && currentPath !== pathname) {
//         console.log('🔄 Fixing broken route:', currentPath);
//         router.replace(currentPath);
//       }
//     };

//     fixRoute();

//     // Handle browser back/forward
//     const handlePopState = () => {
//       const newPath = window.location.pathname;
//       if (newPath !== pathname) {
//         router.push(newPath);
//       }
//     };

//     window.addEventListener('popstate', handlePopState);
//     return () => window.removeEventListener('popstate', handlePopState);
//   }, [pathname, router]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#EE4275] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   const roleInfo = getRoleInfo(userRole);

//   return (
//     <>
//       <style jsx global>{`
//         html, body {
//           margin: 0 !important;
//           padding: 0 !important;
//           overflow-x: hidden;
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//         }
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
      
//       <div className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
//         {/* Mobile sidebar backdrop */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar - Pink theme */}
//         <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-[#F7C7D3]/40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}>
//           {/* Sidebar header with dynamic logo */}
//           <div className="h-20 flex items-center justify-center px-6 border-b border-[#F7C7D3]/40 bg-white">
//             <DynamicLogo 
//               className="justify-center"
//               textClassName="text-xl font-bold text-[#2D1B2E]"
//               iconClassName="w-8 h-8 text-[#EE4275]"
//               linkClassName="justify-center"
//             />
//           </div>

//           {/* User info - Pink accent */}
//           {user && (
//             <div className="px-4 py-4 border-b border-[#F7C7D3]/40 bg-[#FFF5F6]">
//               <div className="flex items-center gap-3">
//                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-lg bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]`}>
//                   {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-[#2D1B2E] truncate">
//                     {user.contactPerson || 'Admin User'}
//                   </p>
//                   <p className="text-xs text-gray-500 truncate mt-0.5">
//                     {user.email}
//                   </p>
//                   <div className="flex items-center gap-1.5 mt-1.5">
//                     <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${roleInfo.badgeColor}`}>
//                       {roleInfo.name}
//                     </span>
//                     <roleInfo.icon className="w-3 h-3 text-[#EE4275] ml-1" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation - Pink active state */}
//           <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24 custom-scroll">
//             <div className="space-y-0.5">
//               {filteredNavigation.map((item, index) => {
//                 if (item.isGroup) {
//                   const isGroupActive = getGroupActiveState(item);
//                   const isExpanded = expandedMenus[item.name.replace(/\s/g, '')];
                  
//                   const filteredChildren = item.children.filter(child => 
//                     userRole === 'super_admin' || canAccessMenuItem(child)
//                   );
                  
//                   if (filteredChildren.length === 0) return null;
                  
//                   return (
//                     <div key={item.name} className="mb-1">
//                       {/* Parent Group Button - Pink accent */}
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleMenu(item.name.replace(/\s/g, ''));
//                         }}
//                         className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
//                           isGroupActive
//                             ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/20'
//                             : 'text-[#2D1B2E] hover:bg-[#F7C7D3]/20'
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <item.icon className={`w-5 h-5 ${
//                             isGroupActive ? 'text-white' : 'text-[#EE4275]'
//                           }`} />
//                           <span className={isGroupActive ? 'text-white font-semibold' : ''}>{item.name}</span>
//                           {isGroupActive && (
//                             <span className="ml-auto text-xs bg-white text-[#EE4275] px-2 py-0.5 rounded-full">
//                               {filteredChildren.length}
//                             </span>
//                           )}
//                         </div>
//                         {isExpanded ? (
//                           <ChevronUp className={`w-4 h-4 ${isGroupActive ? 'text-white' : 'text-[#EE4275]'}`} />
//                         ) : (
//                           <ChevronDown className={`w-4 h-4 ${isGroupActive ? 'text-white' : 'text-[#EE4275]'}`} />
//                         )}
//                       </button>

//                       {/* Sub-menu items - Pink border */}
//                       {isExpanded && (
//                         <div className="ml-4 mt-2 space-y-1 border-l-2 border-[#F7C7D3]/50 pl-3">
//                           {filteredChildren.map((child) => {
//                             const active = isActive(child.href);
//                             return (
//                               <div
//                                 key={child.name}
//                                 onClick={(e) => handleNavigation(child.href, e)}
//                                 className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
//                                   active
//                                     ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/20'
//                                     : 'text-[#2D1B2E] hover:bg-[#F7C7D3]/20'
//                                 }`}
//                               >
//                                 <child.icon className={`w-4 h-4 ${
//                                   active ? 'text-white' : 'text-[#EE4275]'
//                                 }`} />
//                                 <span>{child.name}</span>
//                                 {active && <ChevronRight className="w-3 h-3 ml-auto text-white" />}
//                               </div>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 }
                
//                 // Regular menu item - Pink active
//                 const active = isActive(item.href);
//                 return (
//                   <div
//                     key={item.name}
//                     onClick={(e) => handleNavigation(item.href, e)}
//                     className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
//                       active
//                         ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/20'
//                         : 'text-[#2D1B2E] hover:bg-[#F7C7D3]/20'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon className={`w-5 h-5 ${
//                         active ? 'text-white' : 'text-[#EE4275]'
//                       }`} />
//                       <span>{item.name}</span>
//                     </div>
//                     {active && <ChevronRight className="w-4 h-4 text-white" />}
//                   </div>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Logout button - Pink accent */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#F7C7D3]/40 bg-white">
//             <button
//               onClick={logout}
//               className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#2D1B2E] rounded-xl hover:bg-[#F7C7D3]/30 hover:text-[#EE4275] w-full transition-all group"
//             >
//               <div className="w-8 h-8 rounded-lg bg-[#F7C7D3]/20 group-hover:bg-[#F7C7D3]/50 flex items-center justify-center">
//                 <LogOut className="w-4 h-4 text-[#EE4275] group-hover:text-[#EE4275]" />
//               </div>
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="lg:ml-72 min-h-screen -mt-16">
//           {/* Top header - White with pink accents */}
//           <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#F7C7D3]/40 shadow-sm" style={{ margin: 0 }}>
//             <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
//               <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
//                 {/* Left section */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setSidebarOpen(true)}
//                     className="lg:hidden w-10 h-10 rounded-lg bg-[#F7C7D3]/20 flex items-center justify-center text-[#EE4275] hover:bg-[#F7C7D3]/40 transition-colors"
//                   >
//                     <Menu className="w-5 h-5" />
//                   </button>
                  
//                   {/* Dynamic Logo in header */}
//                   <div className="lg:hidden">
//                     <DynamicLogo 
//                       textClassName="text-lg font-bold text-[#2D1B2E]"
//                       iconClassName="w-6 h-6 text-[#EE4275]"
//                     />
//                   </div>
                  
//                   {/* Welcome Message */}
//                   {user && (
//                     <div className="hidden lg:flex items-center gap-2">
//                       <span className="text-lg md:text-2xl font-bold text-[#2D1B2E]">Welcome back,</span>
//                       <span className="text-lg md:text-2xl font-bold text-[#EE4275]">
//                         {user.contactPerson || 'Admin'}
//                       </span>
//                       <Sparkles className="w-5 h-5 text-[#EE4275] hidden md:block" />
                      
//                       {/* Role badge in header - Pink accent */}
//                       <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full border ${roleInfo.badgeColor} hidden md:inline-flex items-center gap-1`}>
//                         <roleInfo.icon className="w-3 h-3" />
//                         {roleInfo.name}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right section */}
//                 <div className="flex items-center gap-3">
//                   <Link 
//                     href="/" 
//                     className="w-10 h-10 rounded-lg bg-[#F7C7D3]/20 flex items-center justify-center text-[#EE4275] hover:bg-[#F7C7D3]/40 transition-colors group"
//                     title="Go to Homepage"
//                   >
//                     <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                   </Link>

//                   {/* User Dropdown - Pink accent */}
//                   {user && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setUserMenuOpen(!userMenuOpen)}
//                         className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-[#F7C7D3]/20 transition-colors"
//                       >
//                         <div className="text-right hidden md:block">
//                           <p className="text-sm font-medium text-[#2D1B2E]">{user.contactPerson || 'Admin'}</p>
//                           <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>
//                         <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] shadow-md shadow-[#EE4275]/20`}>
//                           {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                         </div>
//                         <ChevronDown className={`w-4 h-4 text-[#EE4275] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
//                       </button>

//                       {/* Dropdown Menu - Pink accent */}
//                       {userMenuOpen && (
//                         <>
//                           <div 
//                             className="fixed inset-0 z-40"
//                             onClick={() => setUserMenuOpen(false)}
//                           />
//                           <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#F7C7D3]/40 py-2 z-50">
//                             <div className={`px-4 py-3 border-b border-[#F7C7D3]/40 bg-[#FFF5F6] rounded-t-2xl`}>
//                               <p className="text-sm font-semibold text-[#2D1B2E]">{user.contactPerson || 'Admin'}</p>
//                               <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${roleInfo.badgeColor}`}>
//                                   {roleInfo.name}
//                                 </span>
//                                 <Sparkles className="w-3 h-3 text-[#EE4275]" />
//                               </div>
//                             </div>
                            
//                             {userRole === 'super_admin' && (
//                               <div
//                                 onClick={(e) => {
//                                   setUserMenuOpen(false);
//                                   handleNavigation('/authorize/role-management', e);
//                                 }}
//                                 className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2D1B2E] hover:bg-[#F7C7D3]/20 transition-colors cursor-pointer"
//                               >
//                                 <ShieldCheck className="w-4 h-4 text-[#EE4275]" />
//                                 <span>Role Management</span>
//                               </div>
//                             )}
                            
//                             <div
//                               onClick={(e) => {
//                                 setUserMenuOpen(false);
//                                 handleNavigation('/authorize/settings', e);
//                               }}
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2D1B2E] hover:bg-[#F7C7D3]/20 transition-colors cursor-pointer"
//                             >
//                               <Settings className="w-4 h-4 text-[#EE4275]" />
//                               <span>Settings</span>
//                             </div>
                            
//                             <button
//                               onClick={() => {
//                                 setUserMenuOpen(false);
//                                 logout();
//                               }}
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left border-t border-[#F7C7D3]/40 mt-1 pt-2 rounded-b-2xl"
//                             >
//                               <LogOut className="w-4 h-4" />
//                               <span>Logout</span>
//                             </button>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Page content */}
//           <main className="" style={{ margin: 0, padding: 0 }}>
//             {children}
//           </main>
//         </div>
//       </div>

//       {/* Custom scrollbar styles - Pink */}
//       <style jsx>{`
//         .custom-scroll::-webkit-scrollbar {
//           width: 5px;
//         }
//         .custom-scroll::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #EE4275, #FF6B9D);
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #d43b68, #ee5a8c);
//         }
//       `}</style>
//     </>
//   );
// }

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare,
  FileText,
  Package,
  FolderPlus,
  Gift,
  ShoppingBag,
  Ticket,
  Award,
  UserPlus,
  UserCog,
  Users,
  Newspaper,
  Star,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  Home,
  ChevronRight,
  Truck,
  ScanBarcode,
  QrCode,
  Cpu,
  Smartphone,
  Shield,
  LayoutTemplate,
  PanelTop,
  Tag,
  Sparkles,
  Heart,
  Store,
  ShieldCheck,
  UsersRound,
  Headphones,
  Settings2,
  UserCheck,
  Zap,
  Battery,
  ChevronUp,
  Globe,
  Phone,
  Building2,
  CircleAlert,
  Ban,
  Bike,
  Layers,
  SquareStack,
  Box,
  Palette,
  Blocks,
  Code2,
  Database,
  UserCog2,
  Images,
  MessageCircle,
  Mail,
  GiftIcon
} from 'lucide-react';
import DynamicLogo from '../components/DynamicLogo';
import { FaChartLine } from 'react-icons/fa';

export default function AuthorizeLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [dashboardAccess, setDashboardAccess] = useState([]);
  const [expandedMenus, setExpandedMenus] = useState({
    websiteLayout: true,
    ordersGroup: true,
    productsGroup: true,
    pixelGroup: true,
    usersGroup: true
  });
  const pathname = usePathname();
  const router = useRouter();

  // Toggle menu expansion
  const toggleMenu = useCallback((menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  }, []);

  // Helper function to normalize pathname
  const normalizePath = useCallback((path) => {
    if (path && path !== '/' && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  }, []);

  // Helper function to check if a route is active - MEMOIZED
  const isActive = useCallback((href) => {
    const currentPath = normalizePath(pathname);
    
    // Dashboard
    if (href === '/authorize/dashboard') {
      return currentPath === '/authorize/dashboard';
    }

    if (href === '/authorize/create-order') {
      return currentPath === '/authorize/create-order';
    }
    
    // Orders group
    if (href === '/authorize/orders') {
      return currentPath === '/authorize/orders' || currentPath.startsWith('/authorize/orders/');
    }
    
    if (href === '/authorize/incomplete-orders') {
      return currentPath === '/authorize/incomplete-orders' || currentPath.startsWith('/authorize/incomplete-orders/');
    }
    
    if (href === '/authorize/order-restrictions') {
      return currentPath === '/authorize/order-restrictions' || currentPath.startsWith('/authorize/order-restrictions/');
    }
    
    if (href === '/authorize/courier-settings') {
      return currentPath === '/authorize/courier-settings' || currentPath.startsWith('/authorize/courier-settings/');
    }
    
    if (href === '/authorize/courier-score-page') {
      return currentPath === '/authorize/courier-score-page' || currentPath.startsWith('/authorize/courier-score-page/');
    }
    
    // Products group
    if (href === '/authorize/all-products') {
      const matches = ['/authorize/all-products', '/authorize/editProduct', '/authorize/viewProduct', '/authorize/product'].some(route => currentPath === route);
      return matches || currentPath.startsWith('/authorize/products/');
    }
    
    if (href === '/authorize/create-products') {
      return ['/authorize/create-products', '/authorize/createProduct'].some(route => currentPath === route);
    }
    
    if (href === '/authorize/create-categories') {
      return ['/authorize/create-categories', '/authorize/createCategory'].some(route => currentPath === route);
    }

    if (href === '/authorize/tags') {
      return currentPath === '/authorize/tags';
    }

    if (href === '/authorize/brand-management') {
      return currentPath === '/authorize/brand-management';
    }

    // Pixel group
    if (href === '/authorize/pixel-settings') {
      return currentPath === '/authorize/pixel-settings';
    }
    
    if (href === '/authorize/custom-code') {
      return currentPath === '/authorize/custom-code';
    }

    // Users group
    if (href === '/authorize/create-users') {
      return ['/authorize/create-users', '/authorize/createUser'].some(route => currentPath === route);
    }
    
    if (href === '/authorize/manage-users') {
      return currentPath === '/authorize/manage-users' || currentPath === '/authorize/editUser' || currentPath.startsWith('/authorize/manage-users/');
    }
    
    if (href === '/authorize/all-customers') {
      return currentPath === '/authorize/all-customers' || currentPath === '/authorize/customer' || currentPath.startsWith('/authorize/all-customers/');
    }
    
    if (href === '/authorize/role-management') {
      return currentPath === '/authorize/role-management';
    }

    // Delivery
    if (href === '/authorize/delivery-settings') {
      return currentPath === '/authorize/delivery-settings';
    }
    
    // Banners
    if (href === '/authorize/create-banner') {
      return currentPath === '/authorize/create-banner';
    }
    
    if (href === '/authorize/banner-management') {
      return currentPath === '/authorize/banner-management';
    }  
    
    if (href === '/authorize/deal-management') {
      return currentPath === '/authorize/deal-management';
    }
    
    if (href === '/authorize/trust-results-management') {
      return currentPath === '/authorize/trust-results-management';
    }

    
    
    
    
    // Settings
    if (href === '/authorize/settings') {
      return currentPath === '/authorize/settings' || currentPath.startsWith('/authorize/settings/');
    }

    if (href === '/authorize/footer') {
      return currentPath === '/authorize/footer';
    }

    if (href === '/authorize/support') {
      return currentPath === '/authorize/support';
    }
    
    // Website Layout children
    if (href === '/authorize/navbar-management') {
      return currentPath === '/authorize/navbar-management';
    }
    
    if (href === '/authorize/homepage-management') {
      return currentPath === '/authorize/homepage-management';
    }
    
    if (href === '/authorize/terms-management') {
      return currentPath === '/authorize/terms-management';
    }
      if (href === '/authorize/why-choose-us-management') {
      return currentPath === '/authorize/why-choose-us-management';
    }
    
    if (href === '/authorize/privacy-management') {
      return currentPath === '/authorize/privacy-management';
    }
    
    if (href === '/authorize/contact-management') {
      return currentPath === '/authorize/contact-management';
    }
    
    if (href === '/authorize/about-management') {
      return currentPath === '/authorize/about-management';
    }
    
    // Manage Reviews
    if (href === '/authorize/manage-reviews') {
      return currentPath === '/authorize/manage-reviews';
    } 
     if (href === '/authorize/product-cost') {
      return currentPath === '/authorize/product-cost';
    } 
    if (href === '/authorize/media-library') {
      return currentPath === '/authorize/media-library';
    } 
    if (href === '/authorize/profit-margin') {
      return currentPath === '/authorize/profit-margin';
    }
    if (href === '/authorize/email-settings') {
      return currentPath === '/authorize/email-settings';
    }

    return false;
  }, [pathname, normalizePath]);

  // Check if any child route is active
  const isChildActive = useCallback((childHrefs) => {
    return childHrefs.some(href => isActive(href));
  }, [isActive]);

  // Check if user can access a menu item
  const canAccessMenuItem = useCallback((menuItem) => {
    if (userRole === 'super_admin') return true;
    
    const oldToNewKeyMap = {
      'analytics': 'dashboard',
      'orders': 'all_orders',
      'products': 'all_products',
      'banners': 'manage_banner',
      'content': 'manage_navbar',
      'users': 'manage_users',
      'roles': 'role_management',
      'delivery': 'delivery_settings',
      'media': 'media_library',
      'homepage': 'manage_homepage',
      'reviews': 'manage_reviews',
      'settings': 'settings',
      'create_order': 'create_order',
      'why_choose_us': 'manage_why_choose_us'
    };
    
    if (typeof menuItem === 'string') {
      const newKey = oldToNewKeyMap[menuItem] || menuItem;
      return dashboardAccess.includes(newKey) || dashboardAccess.includes(menuItem);
    }
    
    if (menuItem.children) {
      return menuItem.children.some(child => {
        const newKey = oldToNewKeyMap[child.accessKey] || child.accessKey;
        return dashboardAccess.includes(newKey) || dashboardAccess.includes(child.accessKey);
      });
    }
    
    if (menuItem.accessKey) {
      const newKey = oldToNewKeyMap[menuItem.accessKey] || menuItem.accessKey;
      return dashboardAccess.includes(newKey) || dashboardAccess.includes(menuItem.accessKey);
    }
    
    return false;
  }, [userRole, dashboardAccess]);

  // Get role display name and icon - Updated colors
  const getRoleInfo = useCallback((role) => {
    const roleMap = {
      super_admin: { 
        name: 'Super Administrator', 
        icon: ShieldCheck,
        color: 'from-[#8B9D83] to-[#6b7d63]',
        badgeColor: 'bg-[#8B9D83]/20 text-[#8B9D83] border-[#8B9D83]/30'
      },
      admin: { 
        name: 'Administrator', 
        icon: UsersRound,
        color: 'from-[#8B9D83] to-[#6b7d63]',
        badgeColor: 'bg-[#8B9D83]/20 text-[#8B9D83] border-[#8B9D83]/30'
      },
      moderator: { 
        name: 'Moderator', 
        icon: Shield,
        color: 'from-[#8B9D83] to-[#6b7d63]',
        badgeColor: 'bg-[#8B9D83]/20 text-[#8B9D83] border-[#8B9D83]/30'
      },
      call_center_agent: { 
        name: 'Call Center Agent', 
        icon: Headphones,
        color: 'from-[#8B9D83] to-[#6b7d63]',
        badgeColor: 'bg-[#8B9D83]/20 text-[#8B9D83] border-[#8B9D83]/30'
      }
    };
    return roleMap[role] || roleMap.admin;
  }, []);

  // Navigation items - MEMOIZED (same as before)
  const navigationItems = useMemo(() => [
    { 
      name: 'Dashboard', 
      href: '/authorize/dashboard', 
      icon: LayoutDashboard,
      accessKey: 'dashboard'
    },
    { 
      name: 'Profit Margin', 
      href: '/authorize/profit-margin', 
      icon: FaChartLine,
      accessKey: 'profit_margin'
    },
    {
      name: 'Orders',
      isGroup: true,
      accessKey: 'orders',
      icon: ShoppingBag,
      children: [
        {
          name: 'Create Order',
          href: '/authorize/create-order',
          icon: ShoppingBag,
          accessKey: 'create_order'
        },
        { 
          name: 'All Orders', 
          href: '/authorize/orders', 
          icon: MessageSquare,
          accessKey: 'all_orders'
        },
        { 
          name: 'Incomplete Orders', 
          href: '/authorize/incomplete-orders', 
          icon: CircleAlert,
          accessKey: 'incomplete_orders'
        },
        { 
          name: 'Order Restriction', 
          href: '/authorize/order-restrictions', 
          icon: Ban,
          accessKey: 'order_restrictions'
        },
        { 
          name: 'Courier Settings', 
          href: '/authorize/courier-settings', 
          icon: Bike,
          accessKey: 'courier_settings'
        },
        { 
          name: 'Courier Score', 
          href: '/authorize/courier-score-page', 
          icon: Bike,
          accessKey: 'courier_score'
        }
      ]
    },
    {
      name: 'Products',
      isGroup: true,
      accessKey: 'products',
      icon: Box,
      children: [
        { 
          name: 'All Products', 
          href: '/authorize/all-products', 
          icon: ShoppingBag,
          accessKey: 'all_products'
        },
        { 
          name: 'Create Products', 
          href: '/authorize/create-products', 
          icon: Gift,
          accessKey: 'create_products'
        },
        { 
          name: 'Cost Settings', 
          href: '/authorize/product-cost', 
          icon: Gift,
          accessKey: 'product_cost'
        },
        { 
          name: 'Create Category', 
          href: '/authorize/create-categories', 
          icon: FolderPlus,
          accessKey: 'create_category'
        },
        { 
          name: 'Manage Brands', 
          href: '/authorize/brand-management', 
          icon: Tag,
          accessKey: 'manage_brands'
        },
        { 
          name: 'Manage Tags', 
          href: '/authorize/tags', 
          icon: Layers,
          accessKey: 'manage_tags'
        }
      ]
    },
    {
      name: 'Website Layout',
      isGroup: true,
      accessKey: 'banners',
      icon: LayoutTemplate,
      children: [
        { 
          name: 'Manage Navbar', 
          href: '/authorize/navbar-management', 
          icon: Menu,
          accessKey: 'manage_navbar'
        },
        { 
          name: 'Create Banner', 
          href: '/authorize/create-banner', 
          icon: PanelTop,
          accessKey: 'create_banner'
        },
        { 
          name: 'Manage Banner', 
          href: '/authorize/banner-management', 
          icon: LayoutTemplate,
          accessKey: 'manage_banner'
        },
        // {
        //   name: 'Manage Choose Us',
        //   href: '/authorize/why-choose-us-management',
        //   icon: Sparkles,
        //   accessKey: 'manage_why_choose_us'
        // },
        {
          name: 'Deal Management',
          href: '/authorize/deal-management',
          icon: GiftIcon,
          accessKey: 'deal_management'
        },
        {
          name: 'Trust Results',
          href: '/authorize/trust-results-management',
          icon: ShieldCheck,
          accessKey: 'trust_results_management'
        },
        { 
          name: 'Manage Homepage', 
          href: '/authorize/homepage-management', 
          icon: Store,
          accessKey: 'manage_homepage'
        },
        { 
          name: 'Manage Footer', 
          href: '/authorize/footer', 
          icon: Globe,
          accessKey: 'manage_footer'
        },
        { 
          name: 'Terms Management', 
          href: '/authorize/terms-management', 
          icon: FileText,
          accessKey: 'terms_management'
        },
        { 
          name: 'Privacy Management', 
          href: '/authorize/privacy-management', 
          icon: Shield,
          accessKey: 'privacy_management'
        },
        { 
          name: 'Contact Management', 
          href: '/authorize/contact-management', 
          icon: Phone,
          accessKey: 'contact_management'
        },
        { 
          name: 'About Management', 
          href: '/authorize/about-management', 
          icon: Building2,
          accessKey: 'about_management'
        }
      ]
    },
    {
      name: 'Pixel',
      isGroup: true,
      accessKey: 'content',
      icon: Code2,
      children: [
        { 
          name: 'Pixel Settings', 
          href: '/authorize/pixel-settings', 
          icon: Database,
          accessKey: 'pixel_settings'
        },
        { 
          name: 'Custom Code', 
          href: '/authorize/custom-code', 
          icon: Code2,
          accessKey: 'custom_code'
        }
      ]
    },
    { 
      name: 'Manage Reviews', 
      href: '/authorize/manage-reviews', 
      icon: Star,
      accessKey: 'manage_reviews'
    },
    {
      name: 'User Management',
      isGroup: true,
      accessKey: 'users',
      icon: Users,
      children: [
        { 
          name: 'Create Users', 
          href: '/authorize/create-users', 
          icon: UserPlus,
          accessKey: 'create_users'
        },
        { 
          name: 'Manage Users', 
          href: '/authorize/manage-users', 
          icon: UserCog,
          accessKey: 'manage_users'
        },
        { 
          name: 'Create & Manage Customers', 
          href: '/authorize/all-customers', 
          icon: UsersRound,
          accessKey: 'manage_customers'
        },
        { 
          name: 'Role Management', 
          href: '/authorize/role-management', 
          icon: ShieldCheck,
          accessKey: 'role_management'
        }
      ]
    },
    { 
      name: 'Delivery Settings', 
      href: '/authorize/delivery-settings', 
      icon: Truck,
      accessKey: 'delivery_settings'
    },
    { 
      name: 'Media Library', 
      href: '/authorize/media-library', 
      icon: Images,
      accessKey: 'media_library'
    },
    // {
    //   name: 'Chat FAQ',
    //   href: '/authorize/faq',
    //   icon: MessageCircle,
    //   accessKey: 'manage_faq'
    // },
    { 
      name: 'Email Settings', 
      href: '/authorize/email-settings', 
      icon: Mail,
      accessKey: 'email_settings'
    },
    { 
      name: 'Settings', 
      href: '/authorize/settings', 
      icon: Settings,
      accessKey: 'settings'
    }
  ], []);

  // Filter navigation based on user role and permissions - MEMOIZED
  const filteredNavigation = useMemo(() => {
    return navigationItems.filter(item => {
      if (item.isGroup) {
        return item.children.some(child => canAccessMenuItem(child));
      }
      return canAccessMenuItem(item);
    });
  }, [navigationItems, canAccessMenuItem]);

  // Check if any child in group is active
  const getGroupActiveState = useCallback((group) => {
    if (!group.isGroup) return false;
    const childHrefs = group.children.map(child => child.href);
    return isChildActive(childHrefs);
  }, [isChildActive]);

  // Navigation click handler
  const handleNavigation = useCallback((href, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('🔄 Navigating to:', href);
    setSidebarOpen(false);
    
    const problemRoutes = ['/authorize/dashboard', '/authorize/create-products' ,  '/authorize/all-products', '/authorize/manage-users' , '/authorize/create-users', '/authorize/banner-management',];
    if (problemRoutes.includes(href)) {
      window.location.href = href;
    } else {
      router.push(href);
    }
  }, [router]);

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      console.log('No token or user data found, redirecting to login');
      logout();
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      console.log('Parsed user data:', parsedUser);
      console.log('User role:', parsedUser.role);
      console.log('Dashboard Access:', parsedUser.dashboardAccess);
      
      const adminRoles = ['super_admin', 'admin', 'moderator', 'call_center_agent'];
      
      if (!adminRoles.includes(parsedUser.role)) {
        console.log('Unauthorized admin access attempt by:', parsedUser.role);
        logout();
        return;
      }

      setUser(parsedUser);
      setUserRole(parsedUser.role);
      setUserPermissions(parsedUser.permissions || []);
      setDashboardAccess(parsedUser.dashboardAccess || []);
      
      console.log('✅ User authenticated successfully:', {
        role: parsedUser.role,
        permissions: parsedUser.permissions || [],
        dashboardAccess: parsedUser.dashboardAccess || []
      });
      
    } catch (error) {
      console.error('Error parsing user data:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Fetch updated user data periodically or on route change
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            setUserRole(data.user.role);
            setUserPermissions(data.user.permissions || []);
            setDashboardAccess(data.user.dashboardAccess || []);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [pathname]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  }, [router]);

  // Route watcher
  useEffect(() => {
    const fixRoute = () => {
      const currentPath = window.location.pathname;
      const problemRoutes = ['/authorize/dashboard', '/authorize/create-products', '/authorize/all-products', '/authorize/manage-users', '/authorize/create-users', '/authorize/banner-management'];
      
      if (problemRoutes.includes(currentPath) && currentPath !== pathname) {
        console.log('🔄 Fixing broken route:', currentPath);
        router.replace(currentPath);
      }
    };

    fixRoute();

    const handlePopState = () => {
      const newPath = window.location.pathname;
      if (newPath !== pathname) {
        router.push(newPath);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7f2]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#53645a] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const roleInfo = getRoleInfo(userRole);

  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      
      <div className="min-h-screen bg-[#f8f7f2]" style={{ margin: 0, padding: 0 }}>
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Green theme */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-[#c5d5be]/40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Sidebar header with dynamic logo */}
          <div className="h-20 flex items-center justify-center px-6 border-b border-[#c5d5be]/40 bg-white">
            <DynamicLogo 
              className="justify-center"
              textClassName="text-xl font-bold text-[#263b32]"
              iconClassName="w-8 h-8 text-[#8B9D83]"
              linkClassName="justify-center"
            />
          </div>

          {/* User info - Green accent */}
          {user && (
            <div className="px-4 py-4 border-b border-[#c5d5be]/40 bg-[#f0f5ed]">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-lg bg-gradient-to-r from-[#8B9D83] to-[#6b7d63]`}>
                  {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#263b32] truncate">
                    {user.contactPerson || 'Admin User'}
                  </p>
                  <p className="text-xs text-[#53645a] truncate mt-0.5">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${roleInfo.badgeColor}`}>
                      {roleInfo.name}
                    </span>
                    <roleInfo.icon className="w-3 h-3 text-[#8B9D83] ml-1" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation - Green active state */}
          <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24 custom-scroll">
            <div className="space-y-0.5">
              {filteredNavigation.map((item, index) => {
                if (item.isGroup) {
                  const isGroupActive = getGroupActiveState(item);
                  const isExpanded = expandedMenus[item.name.replace(/\s/g, '')];
                  
                  const filteredChildren = item.children.filter(child => 
                    userRole === 'super_admin' || canAccessMenuItem(child)
                  );
                  
                  if (filteredChildren.length === 0) return null;
                  
                  return (
                    <div key={item.name} className="mb-1">
                      {/* Parent Group Button - Green accent */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(item.name.replace(/\s/g, ''));
                        }}
                        className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isGroupActive
                            ? 'bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white shadow-md shadow-[#8B9D83]/20'
                            : 'text-[#263b32] hover:bg-[#c5d5be]/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={`w-5 h-5 ${
                            isGroupActive ? 'text-white' : 'text-[#8B9D83]'
                          }`} />
                          <span className={isGroupActive ? 'text-white font-semibold' : ''}>{item.name}</span>
                          {isGroupActive && (
                            <span className="ml-auto text-xs bg-white text-[#8B9D83] px-2 py-0.5 rounded-full">
                              {filteredChildren.length}
                            </span>
                          )}
                        </div>
                        {isExpanded ? (
                          <ChevronUp className={`w-4 h-4 ${isGroupActive ? 'text-white' : 'text-[#8B9D83]'}`} />
                        ) : (
                          <ChevronDown className={`w-4 h-4 ${isGroupActive ? 'text-white' : 'text-[#8B9D83]'}`} />
                        )}
                      </button>

                      {/* Sub-menu items - Green border */}
                      {isExpanded && (
                        <div className="ml-4 mt-2 space-y-1 border-l-2 border-[#c5d5be]/50 pl-3">
                          {filteredChildren.map((child) => {
                            const active = isActive(child.href);
                            return (
                              <div
                                key={child.name}
                                onClick={(e) => handleNavigation(child.href, e)}
                                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                                  active
                                    ? 'bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white shadow-md shadow-[#8B9D83]/20'
                                    : 'text-[#263b32] hover:bg-[#c5d5be]/30'
                                }`}
                              >
                                <child.icon className={`w-4 h-4 ${
                                  active ? 'text-white' : 'text-[#8B9D83]'
                                }`} />
                                <span>{child.name}</span>
                                {active && <ChevronRight className="w-3 h-3 ml-auto text-white" />}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                
                // Regular menu item - Green active
                const active = isActive(item.href);
                return (
                  <div
                    key={item.name}
                    onClick={(e) => handleNavigation(item.href, e)}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white shadow-md shadow-[#8B9D83]/20'
                        : 'text-[#263b32] hover:bg-[#c5d5be]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${
                        active ? 'text-white' : 'text-[#8B9D83]'
                      }`} />
                      <span>{item.name}</span>
                    </div>
                    {active && <ChevronRight className="w-4 h-4 text-white" />}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Logout button - Green accent */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#c5d5be]/40 bg-white">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#263b32] rounded-xl hover:bg-[#c5d5be]/30 hover:text-[#8B9D83] w-full transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#c5d5be]/20 group-hover:bg-[#c5d5be]/50 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-[#8B9D83] group-hover:text-[#8B9D83]" />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:ml-72 min-h-screen -mt-16">
          {/* Top header - White with green accents */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#c5d5be]/40 shadow-sm" style={{ margin: 0 }}>
            <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
              <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
                {/* Left section */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-10 h-10 rounded-lg bg-[#c5d5be]/20 flex items-center justify-center text-[#8B9D83] hover:bg-[#c5d5be]/40 transition-colors"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  
                  {/* Dynamic Logo in header */}
                  <div className="lg:hidden">
                    <DynamicLogo 
                      textClassName="text-lg font-bold text-[#263b32]"
                      iconClassName="w-6 h-6 text-[#8B9D83]"
                    />
                  </div>
                  
                  {/* Welcome Message */}
                  {user && (
                    <div className="hidden lg:flex items-center gap-2">
                      <span className="text-lg md:text-2xl font-light text-[#263b32]">Welcome back,</span>
                      <span className="text-lg md:text-2xl font-medium text-[#8B9D83]">
                        {user.contactPerson || 'Admin'}
                      </span>
                      <Sparkles className="w-5 h-5 text-[#8B9D83] hidden md:block" />
                      
                      {/* Role badge in header - Green accent */}
                      <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full border ${roleInfo.badgeColor} hidden md:inline-flex items-center gap-1`}>
                        <roleInfo.icon className="w-3 h-3" />
                        {roleInfo.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">
                  <Link 
                    href="/" 
                    className="w-10 h-10 rounded-lg bg-[#c5d5be]/20 flex items-center justify-center text-[#8B9D83] hover:bg-[#c5d5be]/40 transition-colors group"
                    title="Go to Homepage"
                  >
                    <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>

                  {/* User Dropdown - Green accent */}
                  {user && (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-[#c5d5be]/20 transition-colors"
                      >
                        <div className="text-right hidden md:block">
                          <p className="text-sm font-medium text-[#263b32]">{user.contactPerson || 'Admin'}</p>
                          <p className="text-xs text-[#53645a]">{user.email}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] shadow-md shadow-[#8B9D83]/20`}>
                          {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-[#8B9D83] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu - Green accent */}
                      {userMenuOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#c5d5be]/40 py-2 z-50">
                            <div className={`px-4 py-3 border-b border-[#c5d5be]/40 bg-[#f0f5ed] rounded-t-2xl`}>
                              <p className="text-sm font-semibold text-[#263b32]">{user.contactPerson || 'Admin'}</p>
                              <p className="text-xs text-[#53645a] truncate mt-0.5">{user.email}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${roleInfo.badgeColor}`}>
                                  {roleInfo.name}
                                </span>
                                <Sparkles className="w-3 h-3 text-[#8B9D83]" />
                              </div>
                            </div>
                            
                            {userRole === 'super_admin' && (
                              <div
                                onClick={(e) => {
                                  setUserMenuOpen(false);
                                  handleNavigation('/authorize/role-management', e);
                                }}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#263b32] hover:bg-[#c5d5be]/20 transition-colors cursor-pointer"
                              >
                                <ShieldCheck className="w-4 h-4 text-[#8B9D83]" />
                                <span>Role Management</span>
                              </div>
                            )}
                            
                            <div
                              onClick={(e) => {
                                setUserMenuOpen(false);
                                handleNavigation('/authorize/settings', e);
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#263b32] hover:bg-[#c5d5be]/20 transition-colors cursor-pointer"
                            >
                              <Settings className="w-4 h-4 text-[#8B9D83]" />
                              <span>Settings</span>
                            </div>
                            
                            <button
                              onClick={() => {
                                setUserMenuOpen(false);
                                logout();
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left border-t border-[#c5d5be]/40 mt-1 pt-2 rounded-b-2xl"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="" style={{ margin: 0, padding: 0 }}>
            {children}
          </main>
        </div>
      </div>

      {/* Custom scrollbar styles - Green */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8B9D83, #6b7d63);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7a8c72, #5a6b53);
        }
      `}</style>
    </>
  );
}