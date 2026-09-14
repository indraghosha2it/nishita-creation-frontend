


// // app/authorize/create-order/page.js
// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search,
//   UserPlus,
//   Users,
//   Package,
//   ShoppingBag,
//   MapPin,
//   Phone,
//   Mail,
//   User,
//   X,
//   Plus,
//   Minus,
//   Trash2,
//   Save,
//   Check,
//   AlertCircle,
//   Loader2,
//   ChevronDown,
//   ChevronUp,
//   DollarSign,
//   Tag,
//   Building2,
//   Globe,
//   Home,
//   CreditCard,
//   Truck,
//   Zap,
//   Eye,
//   Edit2,
//   UserCheck,
//   Sparkles,
//   ArrowLeft,
//   Calendar,
//   Clock,
//   Scale,
//   Palette,
//   Box,
//   EyeOff,
//   Smartphone,
//   Lock,
//   RefreshCw,
//   Layers,
//   Circle,
//   Grid
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ========== HELPER FUNCTIONS ==========
// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// const getColorName = (color) => {
//   const colorMap = {
//     '#000000': 'Black',
//     '#FFFFFF': 'White',
//     '#FF0000': 'Red',
//     '#00FF00': 'Green',
//     '#0000FF': 'Blue',
//     '#FFFF00': 'Yellow',
//     '#FF00FF': 'Magenta',
//     '#00FFFF': 'Cyan',
//     '#FFA500': 'Orange',
//     '#800080': 'Purple',
//     '#008000': 'Dark Green',
//     '#FFC0CB': 'Pink',
//     '#A52A2A': 'Brown',
//     '#808080': 'Gray',
//     '#C0C0C0': 'Silver',
//     '#4A90E2': 'Blue',
//     '#FF6B6B': 'Red',
//     '#4ECDC4': 'Teal',
//     '#45B7D1': 'Sky Blue',
//     '#96CEB4': 'Mint',
//     '#FFEAA7': 'Cream',
//     '#DDA0DD': 'Plum',
//     '#98D8C8': 'Seafoam',
//     '#F7DC6F': 'Gold',
//     '#BB8FCE': 'Lavender'
//   };
//   return colorMap[color] || color;
// };

// // ========== MAIN COMPONENT ==========
// export default function ManualOrderCreate() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
  
//   // ========== LOCATION DATA ==========
//   const [locationData, setLocationData] = useState({});
//   const [divisions, setDivisions] = useState({});
//   const [divisionList, setDivisionList] = useState([]);
//   const [citiesByDivision, setCitiesByDivision] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [locationLoading, setLocationLoading] = useState(true);
//   const [shippingCost, setShippingCost] = useState(0);
  
//   // ========== CUSTOMER SEARCH ==========
//   const [customerSearchQuery, setCustomerSearchQuery] = useState('');
//   const [customerSearchResults, setCustomerSearchResults] = useState([]);
//   const [searchingCustomers, setSearchingCustomers] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  
//   // ========== PRODUCT SEARCH ==========
//   const [productSearchQuery, setProductSearchQuery] = useState('');
//   const [productSearchResults, setProductSearchResults] = useState([]);
//   const [searchingProducts, setSearchingProducts] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedColorsWithQty, setSelectedColorsWithQty] = useState([]);
//   const [addQuantity, setAddQuantity] = useState(1);
//   const [showAddProduct, setShowAddProduct] = useState(false);
  
//   // ========== VARIANT STATE ==========
//   const [selectedVariantsWithQty, setSelectedVariantsWithQty] = useState([]);
  
//   // ========== ORDER ITEMS ==========
//   const [orderItems, setOrderItems] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [discountNote, setDiscountNote] = useState('');
//   const [orderNote, setOrderNote] = useState('');
  
//   // ========== EXPANDED SECTIONS FOR ORDER ITEMS ==========
//   const [expandedOrderItems, setExpandedOrderItems] = useState({});
  
//   // ========== CREATE CUSTOMER FORM ==========
//   const [createForm, setCreateForm] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     password: '',
//     confirmPassword: '',
//     subscribeToNewsletter: false
//   });
  
//   const [createFormErrors, setCreateFormErrors] = useState({});
//   const [isCreating, setIsCreating] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   // ========== ORDER FORM ==========
//   const [orderForm, setOrderForm] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     division: '',
//     address: '',
//     city: '',
//     zone: '',
//     area: '',
//     zipCode: '',
//     country: 'Bangladesh',
//     note: ''
//   });
  
//   const [formErrors, setFormErrors] = useState({});
  
//   // ========== UI STATE ==========
//   const [expandedSections, setExpandedSections] = useState({
//     customer: true,
//     products: true,
//     address: true,
//     summary: true
//   });
  
//   const [quantityInputs, setQuantityInputs] = useState({});
//   const [addQuantityInput, setAddQuantityInput] = useState(null);
//   const [itemQuantityInputs, setItemQuantityInputs] = useState({});

//   // ========== FETCH LOCATIONS ==========
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch('/api/locations');
//         const data = await response.json();
//         setLocationData(data.locationData || {});
        
//         const divisions = data.divisions || {};
//         const filteredDivisions = {};
//         const divisionKeys = [];
        
//         Object.keys(divisions).forEach(key => {
//           if (key !== 'Other') {
//             filteredDivisions[key] = divisions[key];
//             divisionKeys.push(key);
//           }
//         });
        
//         setDivisions(filteredDivisions);
//         setDivisionList(divisionKeys.sort());
//         setLocationLoading(false);
//       } catch (error) {
//         console.error('Failed to load location data:', error);
//         setLocationLoading(false);
//       }
//     };
//     fetchLocations();
//   }, []);
  
//   // ========== UPDATE CITIES WHEN DIVISION CHANGES ==========
//   useEffect(() => {
//     if (orderForm.division && divisions[orderForm.division]) {
//       setCitiesByDivision(divisions[orderForm.division]);
//       setOrderForm(prev => ({ ...prev, city: '' }));
//     } else {
//       setCitiesByDivision([]);
//     }
//   }, [orderForm.division, divisions]);
  
//   // ========== CALCULATE SHIPPING ==========
//   const calculateShipping = useCallback(async (city) => {
//     if (!city) {
//       setShippingCost(0);
//       return;
//     }
    
//     try {
//       const response = await fetch('http://localhost:5000/api/delivery/calculate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ city })
//       });
//       const data = await response.json();
//       if (data.success) {
//         setShippingCost(data.data.charge || 0);
//         return data.data.charge || 0;
//       }
//       setShippingCost(0);
//       return 0;
//     } catch (error) {
//       console.error('Error calculating shipping:', error);
//       setShippingCost(0);
//       return 0;
//     }
//   }, []);
  
//   // ========== RECALCULATE SHIPPING ON CITY CHANGE ==========
//   useEffect(() => {
//     if (orderForm.city) {
//       calculateShipping(orderForm.city);
//     }
//   }, [orderForm.city, calculateShipping]);
  
//   // ========== SEARCH CUSTOMERS ==========
//   const searchCustomers = useCallback(async (query) => {
//     if (!query || query.length < 2) {
//       setCustomerSearchResults([]);
//       return;
//     }
    
//     setSearchingCustomers(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `http://localhost:5000/api/auth/admin/customers?search=${encodeURIComponent(query)}&limit=10`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setCustomerSearchResults(data.customers || []);
//       } else {
//         setCustomerSearchResults([]);
//       }
//     } catch (error) {
//       console.error('Search customers error:', error);
//       setCustomerSearchResults([]);
//     } finally {
//       setSearchingCustomers(false);
//     }
//   }, []);
  
//   // Debounced customer search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (customerSearchQuery) {
//         searchCustomers(customerSearchQuery);
//       } else {
//         setCustomerSearchResults([]);
//       }
//     }, 300);
    
//     return () => clearTimeout(timer);
//   }, [customerSearchQuery, searchCustomers]);
  
//   // ========== SEARCH PRODUCTS ==========
//   const searchProducts = useCallback(async (query) => {
//     if (!query || query.length < 2) {
//       setProductSearchResults([]);
//       return;
//     }
    
//     setSearchingProducts(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `http://localhost:5000/api/orders/search-products?query=${encodeURIComponent(query)}&limit=10`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setProductSearchResults(data.data || []);
//       } else {
//         setProductSearchResults([]);
//       }
//     } catch (error) {
//       console.error('Search products error:', error);
//       setProductSearchResults([]);
//     } finally {
//       setSearchingProducts(false);
//     }
//   }, []);
  
//   // Debounced product search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (productSearchQuery) {
//         searchProducts(productSearchQuery);
//       } else {
//         setProductSearchResults([]);
//       }
//     }, 300);
    
//     return () => clearTimeout(timer);
//   }, [productSearchQuery, searchProducts]);
  
//   // ========== SELECT CUSTOMER ==========
//   const handleSelectCustomer = (customer) => {
//     setSelectedCustomer(customer);
//     setCustomerSearchQuery(customer.contactPerson || customer.email);
//     setCustomerSearchResults([]);
    
//     setOrderForm({
//       fullName: customer.contactPerson || '',
//       email: customer.email || '',
//       phone: customer.phone || '',
//       division: customer.division || '',
//       address: customer.address || '',
//       city: customer.city || '',
//       zone: customer.zone || '',
//       area: customer.area || '',
//       zipCode: customer.zipCode || '',
//       country: customer.country || 'Bangladesh',
//       note: ''
//     });
    
//     if (customer.city) {
//       calculateShipping(customer.city);
//     }
//   };
  
//   // ========== SELECT PRODUCT - FETCH FULL DETAILS ==========
//   const handleSelectProduct = async (product) => {
//     setProductSearchResults([]);
//     setProductSearchQuery(product.productName);
//     setSelectedColorsWithQty([]);
//     setAddQuantity(1);
//     setAddQuantityInput(null);
//     setSelectedVariantsWithQty([]);

//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${product._id}`);
//       const data = await response.json();
//       if (data.success) {
//         setSelectedProduct(data.data.product);
//       } else {
//         setSelectedProduct(product);
//       }
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//       setSelectedProduct(product);
//     }
//   };
  
//   // ========== VARIANT FUNCTIONS ==========
//   const toggleVariantSelection = (variantType, variant) => {
//     const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
    
//     // If variant has sub-variants, automatically select the first one
//     if (hasSubVariants) {
//       const firstSubVariant = variant.subVariants[0];
//       // Check if already selected
//       const exists = selectedVariantsWithQty.find(
//         v => v.variantId === variant.id && v.subVariantId === firstSubVariant.id
//       );
//       if (exists) {
//         // Remove if already selected
//         setSelectedVariantsWithQty(prev => 
//           prev.filter(v => !(v.variantId === variant.id && v.subVariantId === firstSubVariant.id))
//         );
//       } else {
//         // Add the first sub-variant - Store the actual variant name
//         setSelectedVariantsWithQty(prev => [...prev, {
//           variantId: variant.id,
//           variantName: variant.name, // ✅ Actual variant name (e.g., "White", "Pink")
//           variantType: variantType.type,
//           subVariantId: firstSubVariant.id,
//           subVariantName: firstSubVariant.name,
//           regularPrice: firstSubVariant.regularPrice || 0,
//           discountPrice: firstSubVariant.discountPrice || 0,
//           image: firstSubVariant.images?.[0] || variant.images?.[0] || '',
//           stockQuantity: firstSubVariant.stockQuantity || variant.stockQuantity || 0,
//           quantity: 1
//         }]);
//       }
//       return;
//     }
    
//     // Regular variant without sub-variants
//     setSelectedVariantsWithQty(prev => {
//       const exists = prev.find(v => v.variantId === variant.id && !v.subVariantId);
//       if (exists) {
//         return prev.filter(v => !(v.variantId === variant.id && !v.subVariantId));
//       }
//       return [...prev, {
//         variantId: variant.id,
//         variantName: variant.name, // ✅ Actual variant name (e.g., "Powder", "Liquid")
//         variantType: variantType.type,
//         subVariantId: null,
//         subVariantName: null,
//         regularPrice: variant.regularPrice || 0,
//         discountPrice: variant.discountPrice || 0,
//         image: variant.images?.[0] || '',
//         stockQuantity: variant.stockQuantity || 0,
//         quantity: 1
//       }];
//     });
//   };

//   const toggleSubVariantSelection = (variantType, variant, subVariant) => {
//     setSelectedVariantsWithQty(prev => {
//       const exists = prev.find(v => v.variantId === variant.id && v.subVariantId === subVariant.id);
//       if (exists) {
//         return prev.filter(v => !(v.variantId === variant.id && v.subVariantId === subVariant.id));
//       }
//       return [...prev, {
//         variantId: variant.id,
//         variantName: variant.name, // ✅ Actual parent variant name (e.g., "White", "Pink")
//         variantType: variantType.type,
//         subVariantId: subVariant.id,
//         subVariantName: subVariant.name,
//         regularPrice: subVariant.regularPrice || 0,
//         discountPrice: subVariant.discountPrice || 0,
//         image: subVariant.images?.[0] || '',
//         stockQuantity: subVariant.stockQuantity || 0,
//         quantity: 1
//       }];
//     });
//   };

//   const updateVariantQty = (variantId, subVariantId, newQty) => {
//     if (newQty < 1) return;
//     setSelectedVariantsWithQty(prev => prev.map(v => {
//       if (v.variantId === variantId && v.subVariantId === subVariantId) {
//         const max = v.stockQuantity || 999;
//         return { ...v, quantity: Math.min(newQty, max) };
//       }
//       return v;
//     }));
//   };

//   const isVariantSelectionComplete = () => {
//     if (!selectedProduct || !selectedProduct.hasVariants) return true;
//     if (selectedVariantsWithQty.length === 0) return false;
    
//     for (const v of selectedVariantsWithQty) {
//       if (v.quantity < 1) return false;
//     }
//     return true;
//   };

//   const getTotalVariantQuantity = () => {
//     return selectedVariantsWithQty.reduce((sum, v) => sum + v.quantity, 0);
//   };

//   const getTotalVariantPrice = () => {
//     return selectedVariantsWithQty.reduce((sum, v) => {
//       const price = v.discountPrice > 0 ? v.discountPrice : v.regularPrice;
//       return sum + (price * v.quantity);
//     }, 0);
//   };

//   // ========== COLOR FUNCTIONS ==========
//   const toggleColorSelection = (color) => {
//     setSelectedColorsWithQty(prev => {
//       const exists = prev.find(c => c.color === color);
//       if (exists) return prev.filter(c => c.color !== color);
//       return [...prev, { color, quantity: 1 }];
//     });
//   };

//   const updateSelectedColorQuantity = (color, newQuantity) => {
//     if (newQuantity < 1) return;
//     setSelectedColorsWithQty(prev =>
//       prev.map(c =>
//         c.color === color ? { ...c, quantity: newQuantity } : c
//       )
//     );
//   };

//   // ========== ADD VARIANT TO EXISTING ORDER ITEM ==========
//   const addVariantToExistingItem = async (productId, variant, variantTypeName) => {
//     // Find the existing item in order
//     const existingItemIndex = orderItems.findIndex(
//       item => item.productId === productId && item.hasVariants
//     );
    
//     if (existingItemIndex === -1) {
//       toast.error('Product not found in order');
//       return;
//     }

//     const existingItem = orderItems[existingItemIndex];
    
//     // Check if variant already exists
//     const variantExists = existingItem.variantItems.some(v => 
//       v.variantId === variant.id && !v.subVariantId
//     );
    
//     if (variantExists) {
//       toast.info('Variant already added');
//       return;
//     }

//     const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
    
//     // If variant has sub-variants, automatically add the first one
//     if (hasSubVariants) {
//       const firstSubVariant = variant.subVariants[0];
//       // Check if sub-variant already exists
//       const subVariantExists = existingItem.variantItems.some(v => 
//         v.variantId === variant.id && v.subVariantId === firstSubVariant.id
//       );
      
//       if (subVariantExists) {
//         toast.info('Sub-variant already added');
//         return;
//       }

//       // Add the first sub-variant with the parent variant name
//       const newSubVariant = {
//         productId: productId,
//         productName: existingItem.productName,
//         productSlug: existingItem.productSlug,
//         image: existingItem.image || '',
//         regularPrice: existingItem.regularPrice,
//         discountPrice: existingItem.discountPrice || 0,
//         stockQuantity: existingItem.stockQuantity,
//         unit: existingItem.unit || 'pcs',
//         variantId: variant.id,
//         variantName: variant.name, // ✅ Store the actual variant name (e.g., "White", "Pink")
//         variantType: variantTypeName || 'Variant',
//         subVariantId: firstSubVariant.id,
//         subVariantName: firstSubVariant.name,
//         variantRegularPrice: firstSubVariant.regularPrice || 0,
//         variantDiscountPrice: firstSubVariant.discountPrice || 0,
//         variantImage: firstSubVariant.images?.[0] || variant.images?.[0] || '',
//         selectedColor: firstSubVariant.color || null,
//         quantity: 1,
//         totalQuantity: 1,
//         isSubVariant: true,
//         isVariant: true,
//         isBaseProduct: false
//       };

//       setOrderItems(prev => {
//         const newItems = [...prev];
//         const updatedVariants = [...newItems[existingItemIndex].variantItems, newSubVariant];
//         const totalQty = updatedVariants.reduce((sum, v) => sum + (v.totalQuantity || v.quantity || 0), 0);
//         newItems[existingItemIndex] = {
//           ...newItems[existingItemIndex],
//           variantItems: updatedVariants,
//           totalQuantity: totalQty
//         };
//         return newItems;
//       });

//       toast.success(`Added ${firstSubVariant.name} (${variant.name}) to ${existingItem.productName}`);
//       return;
//     }

//     // Regular variant without sub-variants
//     const newVariant = {
//       productId: productId,
//       productName: existingItem.productName,
//       productSlug: existingItem.productSlug,
//       image: existingItem.image || '',
//       regularPrice: existingItem.regularPrice,
//       discountPrice: existingItem.discountPrice || 0,
//       stockQuantity: existingItem.stockQuantity,
//       unit: existingItem.unit || 'pcs',
//       variantId: variant.id,
//       variantName: variant.name, // ✅ Store the actual variant name
//       variantType: variantTypeName || 'Variant',
//       subVariantId: null,
//       subVariantName: null,
//       variantRegularPrice: variant.regularPrice || 0,
//       variantDiscountPrice: variant.discountPrice || 0,
//       variantImage: variant.images?.[0] || '',
//       selectedColor: null,
//       quantity: 1,
//       totalQuantity: 1,
//       isSubVariant: false,
//       isVariant: true,
//       isBaseProduct: false
//     };

//     setOrderItems(prev => {
//       const newItems = [...prev];
//       const updatedVariants = [...newItems[existingItemIndex].variantItems, newVariant];
//       const totalQty = updatedVariants.reduce((sum, v) => sum + (v.totalQuantity || v.quantity || 0), 0);
//       newItems[existingItemIndex] = {
//         ...newItems[existingItemIndex],
//         variantItems: updatedVariants,
//         totalQuantity: totalQty
//       };
//       return newItems;
//     });

//     toast.success(`Added ${variant.name} to ${existingItem.productName}`);
//   };

//   // ========== ADD SUB-VARIANT TO EXISTING ORDER ITEM ==========
//   const addSubVariantToExistingItem = async (productId, variantId, subVariant, parentVariantName, variantTypeName) => {
//     const existingItemIndex = orderItems.findIndex(
//       item => item.productId === productId && item.hasVariants
//     );
    
//     if (existingItemIndex === -1) {
//       toast.error('Product not found in order');
//       return;
//     }

//     const existingItem = orderItems[existingItemIndex];
    
//     // Check if sub-variant already exists
//     const subVariantExists = existingItem.variantItems.some(v => 
//       v.variantId === variantId && v.subVariantId === subVariant.id
//     );
    
//     if (subVariantExists) {
//       toast.info('Sub-variant already added');
//       return;
//     }

//     // Add the sub-variant with the parent variant name
//     const newSubVariant = {
//       productId: productId,
//       productName: existingItem.productName,
//       productSlug: existingItem.productSlug,
//       image: existingItem.image || '',
//       regularPrice: existingItem.regularPrice,
//       discountPrice: existingItem.discountPrice || 0,
//       stockQuantity: existingItem.stockQuantity,
//       unit: existingItem.unit || 'pcs',
//       variantId: variantId,
//       variantName: parentVariantName, // ✅ Store the actual parent variant name
//       variantType: variantTypeName || 'Variant',
//       subVariantId: subVariant.id,
//       subVariantName: subVariant.name,
//       variantRegularPrice: subVariant.regularPrice || 0,
//       variantDiscountPrice: subVariant.discountPrice || 0,
//       variantImage: subVariant.images?.[0] || '',
//       selectedColor: subVariant.color || null,
//       quantity: 1,
//       totalQuantity: 1,
//       isSubVariant: true,
//       isVariant: true,
//       isBaseProduct: false
//     };

//     setOrderItems(prev => {
//       const newItems = [...prev];
//       const updatedVariants = [...newItems[existingItemIndex].variantItems, newSubVariant];
//       const totalQty = updatedVariants.reduce((sum, v) => sum + (v.totalQuantity || v.quantity || 0), 0);
//       newItems[existingItemIndex] = {
//         ...newItems[existingItemIndex],
//         variantItems: updatedVariants,
//         totalQuantity: totalQty
//       };
//       return newItems;
//     });

//     toast.success(`Added ${subVariant.name} to ${existingItem.productName}`);
//   };

//   // ========== ADD PRODUCT TO ORDER ==========
//   const handleAddProductToOrder = () => {
//     if (!selectedProduct) {
//       toast.error('Please select a product');
//       return;
//     }
    
//     const hasColors = selectedProduct.colors && selectedProduct.colors.length > 0;
//     const hasVariants = selectedProduct.hasVariants && 
//                         selectedProduct.variantTypes && 
//                         selectedProduct.variantTypes.length > 0;
    
//     // ========== VALIDATE VARIANTS ==========
//     if (hasVariants) {
//       if (selectedVariantsWithQty.length === 0) {
//         toast.error('Please select at least one variant');
//         return;
//       }
//       if (!isVariantSelectionComplete()) {
//         toast.error('Please set quantity for all selected variants');
//         return;
//       }
//     }
    
//     // ========== VALIDATE COLORS ==========
//     if (hasColors && selectedColorsWithQty.length === 0 && !hasVariants) {
//       toast.error('Please select at least one color with quantity');
//       return;
//     }
    
//     let productSlug = selectedProduct.slug;
//     if (!productSlug && selectedProduct.productName) {
//       productSlug = selectedProduct.productName
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/^-+|-+$/g, '');
//     }
//     if (!productSlug) {
//       productSlug = 'unknown-product';
//     }
    
//     // ========== HANDLE VARIANTS ==========
//     if (hasVariants) {
//       const variantItems = selectedVariantsWithQty.map(v => ({
//         productId: selectedProduct._id,
//         productName: selectedProduct.productName,
//         productSlug: productSlug,
//         image: v.image || selectedProduct.images?.[0]?.url || '',
//         regularPrice: selectedProduct.regularPrice,
//         discountPrice: selectedProduct.discountPrice || 0,
//         stockQuantity: v.stockQuantity || selectedProduct.stockQuantity,
//         unit: selectedProduct.unit || 'pcs',
//         variantId: v.variantId,
//         variantName: v.variantName || 'Variant', // ✅ Store the actual variant name
//         variantType: v.variantType,
//         subVariantId: v.subVariantId,
//         subVariantName: v.subVariantName,
//         variantRegularPrice: v.regularPrice || 0,
//         variantDiscountPrice: v.discountPrice || 0,
//         variantImage: v.image || '',
//         selectedColor: null,
//         quantity: v.quantity || 1,
//         totalQuantity: v.quantity || 1,
//         isSubVariant: !!v.subVariantId,
//         isVariant: true,
//         isBaseProduct: false
//       }));
      
//       // Check if product already exists in order
//       const existingItemIndex = orderItems.findIndex(
//         item => item.productId === selectedProduct._id && item.hasVariants
//       );
      
//       if (existingItemIndex !== -1) {
//         // Merge with existing variants
//         const existing = orderItems[existingItemIndex];
//         const existingVariants = existing.variantItems || [];
//         const mergedVariants = [...existingVariants];
        
//         variantItems.forEach(newVariant => {
//           const existingIndex = mergedVariants.findIndex(v => 
//             v.variantId === newVariant.variantId && 
//             v.subVariantId === newVariant.subVariantId
//           );
//           if (existingIndex !== -1) {
//             mergedVariants[existingIndex].quantity += newVariant.quantity;
//             mergedVariants[existingIndex].totalQuantity += newVariant.quantity;
//           } else {
//             mergedVariants.push(newVariant);
//           }
//         });
        
//         const totalQty = mergedVariants.reduce((sum, v) => sum + (v.totalQuantity || v.quantity || 0), 0);
//         setOrderItems(prev => {
//           const newItems = [...prev];
//           newItems[existingItemIndex] = {
//             ...newItems[existingItemIndex],
//             variantItems: mergedVariants,
//             totalQuantity: totalQty,
//             hasVariants: true,
//             variantTypes: selectedProduct.variantTypes || []
//           };
//           return newItems;
//         });
//       } else {
//         const totalQty = variantItems.reduce((sum, v) => sum + (v.totalQuantity || v.quantity || 0), 0);
//         setOrderItems(prev => [...prev, {
//           productId: selectedProduct._id,
//           productName: selectedProduct.productName,
//           productSlug: productSlug,
//           image: selectedProduct.images?.[0]?.url || '',
//           regularPrice: selectedProduct.regularPrice,
//           discountPrice: selectedProduct.discountPrice || 0,
//           stockQuantity: selectedProduct.stockQuantity,
//           unit: selectedProduct.unit || 'pcs',
//           variantItems: variantItems,
//           totalQuantity: totalQty,
//           hasVariants: true,
//           hasColors: false,
//           variantTypes: selectedProduct.variantTypes || []
//         }]);
//       }
      
//       toast.success(`Added ${variantItems.length} variant(s) of ${selectedProduct.productName}`);
//       resetProductSelection();
//       return;
//     }
    
//     // ========== HANDLE COLORS ==========
//     if (hasColors) {
//       const newItem = {
//         productId: selectedProduct._id,
//         productName: selectedProduct.productName,
//         productSlug: productSlug,
//         image: selectedProduct.images?.[0]?.url || '',
//         regularPrice: selectedProduct.regularPrice,
//         discountPrice: selectedProduct.discountPrice || 0,
//         stockQuantity: selectedProduct.stockQuantity,
//         unit: selectedProduct.unit || 'pcs',
//         colors: selectedColorsWithQty.map(c => ({
//           color: c.color,
//           quantity: Number(c.quantity || 0),
//           price: selectedProduct.discountPrice > 0 ? selectedProduct.discountPrice : selectedProduct.regularPrice
//         })),
//         totalQuantity: selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0),
//         selectedColors: selectedColorsWithQty.map(c => c.color),
//         hasVariants: false,
//         hasColors: true
//       };
      
//       const existingItemIndex = orderItems.findIndex(
//         item => item.productId === selectedProduct._id && !item.hasVariants
//       );
      
//       if (existingItemIndex !== -1) {
//         const existing = orderItems[existingItemIndex];
//         const existingColors = existing.colors || [];
//         const mergedColors = [...existingColors];
        
//         newItem.colors.forEach(newColor => {
//           const existingColorIndex = mergedColors.findIndex(c => c.color === newColor.color);
//           if (existingColorIndex !== -1) {
//             mergedColors[existingColorIndex].quantity += newColor.quantity;
//           } else {
//             mergedColors.push(newColor);
//           }
//         });
        
//         const updatedItem = {
//           ...existing,
//           colors: mergedColors,
//           totalQuantity: mergedColors.reduce((sum, c) => sum + c.quantity, 0),
//           selectedColors: mergedColors.map(c => c.color)
//         };
        
//         setOrderItems(prev => {
//           const newItems = [...prev];
//           newItems[existingItemIndex] = updatedItem;
//           return newItems;
//         });
//       } else {
//         setOrderItems(prev => [...prev, newItem]);
//       }
      
//       toast.success(`Added ${selectedProduct.productName} to order`);
//       resetProductSelection();
//       return;
//     }
    
//     // ========== HANDLE PLAIN PRODUCT (No Colors, No Variants) ==========
//     const newItem = {
//       productId: selectedProduct._id,
//       productName: selectedProduct.productName,
//       productSlug: productSlug,
//       image: selectedProduct.images?.[0]?.url || '',
//       regularPrice: selectedProduct.regularPrice,
//       discountPrice: selectedProduct.discountPrice || 0,
//       stockQuantity: selectedProduct.stockQuantity,
//       unit: selectedProduct.unit || 'pcs',
//       totalQuantity: addQuantity || 1,
//       hasVariants: false,
//       hasColors: false,
//       colors: []
//     };
    
//     const existingItemIndex = orderItems.findIndex(
//       item => item.productId === selectedProduct._id && !item.hasVariants && !item.hasColors
//     );
    
//     if (existingItemIndex !== -1) {
//       const existing = orderItems[existingItemIndex];
//       const newQty = existing.totalQuantity + (addQuantity || 1);
//       if (newQty > selectedProduct.stockQuantity) {
//         toast.error(`Only ${selectedProduct.stockQuantity} items available`);
//         return;
//       }
//       setOrderItems(prev => {
//         const newItems = [...prev];
//         newItems[existingItemIndex] = {
//           ...newItems[existingItemIndex],
//           totalQuantity: newQty
//         };
//         return newItems;
//       });
//     } else {
//       setOrderItems(prev => [...prev, newItem]);
//     }
    
//     toast.success(`Added ${selectedProduct.productName} to order`);
//     resetProductSelection();
//   };
  
//   const resetProductSelection = () => {
//     setShowAddProduct(false);
//     setSelectedProduct(null);
//     setProductSearchQuery('');
//     setProductSearchResults([]);
//     setSelectedColorsWithQty([]);
//     setAddQuantity(1);
//     setAddQuantityInput(null);
//     setSelectedVariantsWithQty([]);
//     setQuantityInputs({});
//   };
  
//   // ========== REMOVE ITEM FROM ORDER ==========
//   const removeItemFromOrder = (index) => {
//     const item = orderItems[index];
//     setOrderItems(prev => prev.filter((_, i) => i !== index));
//     toast.success(`Removed ${item.productName} from order`);
//   };
  
//   // ========== UPDATE ITEM QUANTITY ==========
//   const updateItemQuantity = (index, newQuantity) => {
//     const item = orderItems[index];
    
//     if (newQuantity < 1) {
//       removeItemFromOrder(index);
//       return;
//     }
    
//     if (newQuantity > item.stockQuantity) {
//       toast.warning(`Only ${item.stockQuantity} item(s) available in stock`);
//       return;
//     }
    
//     setOrderItems(prev => {
//       const newItems = [...prev];
//       newItems[index] = {
//         ...newItems[index],
//         totalQuantity: newQuantity
//       };
//       return newItems;
//     });
//   };
  
//   // ========== UPDATE VARIANT QUANTITY IN ORDER ==========
//   const updateVariantQuantityInOrder = (itemIndex, variantIndex, newQuantity) => {
//     if (newQuantity < 1) {
//       setOrderItems(prev => {
//         const newItems = [...prev];
//         const item = newItems[itemIndex];
//         const updatedVariants = item.variantItems.filter((_, i) => i !== variantIndex);
//         const totalQty = updatedVariants.reduce((sum, v) => sum + (v.quantity || 0), 0);
//         newItems[itemIndex] = {
//           ...item,
//           variantItems: updatedVariants,
//           totalQuantity: totalQty
//         };
//         if (updatedVariants.length === 0) {
//           newItems.splice(itemIndex, 1);
//         }
//         return newItems;
//       });
//       return;
//     }
    
//     const item = orderItems[itemIndex];
//     const variant = item.variantItems[variantIndex];
//     if (newQuantity > variant.stockQuantity) {
//       toast.warning(`Only ${variant.stockQuantity} item(s) available`);
//       return;
//     }
    
//     setOrderItems(prev => {
//       const newItems = [...prev];
//       const updatedVariants = newItems[itemIndex].variantItems.map((v, i) => 
//         i === variantIndex ? { ...v, quantity: newQuantity, totalQuantity: newQuantity } : v
//       );
//       const totalQty = updatedVariants.reduce((sum, v) => sum + (v.quantity || 0), 0);
//       newItems[itemIndex] = {
//         ...newItems[itemIndex],
//         variantItems: updatedVariants,
//         totalQuantity: totalQty
//       };
//       return newItems;
//     });
//   };
  
//   // ========== UPDATE COLOR QUANTITY IN ORDER ==========
//   const updateColorQuantityInOrder = (itemIndex, color, newQuantity) => {
//     if (newQuantity < 1) {
//       setOrderItems(prev => {
//         const newItems = [...prev];
//         const item = newItems[itemIndex];
//         const updatedColors = item.colors.filter(c => c.color !== color);
//         const totalQty = updatedColors.reduce((sum, c) => sum + c.quantity, 0);
//         newItems[itemIndex] = {
//           ...item,
//           colors: updatedColors,
//           totalQuantity: totalQty,
//           selectedColors: updatedColors.map(c => c.color)
//         };
//         if (updatedColors.length === 0) {
//           newItems.splice(itemIndex, 1);
//         }
//         return newItems;
//       });
//       return;
//     }
    
//     const item = orderItems[itemIndex];
//     const totalOtherColors = item.colors
//       .filter(c => c.color !== color)
//       .reduce((sum, c) => sum + c.quantity, 0);
    
//     if (totalOtherColors + newQuantity > item.stockQuantity) {
//       toast.warning(`Only ${item.stockQuantity - totalOtherColors} more items available for this color`);
//       return;
//     }
    
//     setOrderItems(prev => {
//       const newItems = [...prev];
//       const updatedColors = newItems[itemIndex].colors.map(c =>
//         c.color === color ? { ...c, quantity: newQuantity } : c
//       );
//       newItems[itemIndex] = {
//         ...newItems[itemIndex],
//         colors: updatedColors,
//         totalQuantity: updatedColors.reduce((sum, c) => sum + c.quantity, 0)
//       };
//       return newItems;
//     });
//   };
  
//   // ========== TOGGLE ORDER ITEM EXPAND ==========
//   const toggleOrderItemExpand = (productId) => {
//     setExpandedOrderItems(prev => ({
//       ...prev,
//       [productId]: !prev[productId]
//     }));
//   };
  
//   // ========== GET AVAILABLE VARIANTS FOR ORDER ITEM ==========
//   const getAvailableVariantsForItem = (orderItem) => {
//     if (!orderItem.variantTypes || orderItem.variantTypes.length === 0) return [];
    
//     const cartVariantIds = orderItem.variantItems
//       .map(item => item.variantId)
//       .filter(id => id);
    
//     const available = [];
//     orderItem.variantTypes.forEach(vt => {
//       vt.variants.forEach(v => {
//         if (!cartVariantIds.includes(v.id)) {
//           available.push({ ...v, type: vt.type });
//         }
//       });
//     });
//     return available;
//   };

//   // ========== GET AVAILABLE SUB-VARIANTS FOR ORDER ITEM ==========
//   const getAvailableSubVariantsForItem = (orderItem, variantId) => {
//     if (!orderItem.variantTypes) return [];
    
//     let targetVariant = null;
//     orderItem.variantTypes.forEach(vt => {
//       vt.variants.forEach(v => {
//         if (v.id === variantId) {
//           targetVariant = v;
//         }
//       });
//     });
    
//     if (!targetVariant || !targetVariant.subVariants) return [];
    
//     const cartSubVariantIds = orderItem.variantItems
//       .filter(item => item.variantId === variantId && item.subVariantId)
//       .map(item => item.subVariantId)
//       .filter(id => id && id !== 'null' && id !== '');
    
//     return targetVariant.subVariants.filter(sv => !cartSubVariantIds.includes(sv.id));
//   };

//   // ========== CHECK IF VARIANT HAS SUB-VARIANTS ==========
//   const variantHasSubVariants = (variantId, orderItem) => {
//     if (!orderItem.variantTypes) return false;
    
//     for (const vt of orderItem.variantTypes) {
//       for (const v of vt.variants || []) {
//         if (v.id === variantId && v.subVariants && v.subVariants.length > 0) {
//           return true;
//         }
//       }
//     }
//     return false;
//   };
  
//   // ========== CALCULATE SUBTOTAL ==========
//   const calculateSubtotal = useCallback(() => {
//     let subtotal = 0;
//     orderItems.forEach(item => {
//       if (item.hasVariants && item.variantItems) {
//         item.variantItems.forEach(variant => {
//           const price = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice : variant.variantRegularPrice || variant.regularPrice;
//           subtotal += price * (variant.quantity || 0);
//         });
//       } else if (item.hasColors && item.colors) {
//         item.colors.forEach(color => {
//           const price = color.price || item.discountPrice || item.regularPrice;
//           subtotal += price * (color.quantity || 0);
//         });
//       } else {
//         const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//         subtotal += price * (item.totalQuantity || 0);
//       }
//     });
//     return subtotal;
//   }, [orderItems]);
  
//   // ========== CALCULATE TOTAL ==========
//   const calculateTotal = useCallback(() => {
//     return calculateSubtotal() + shippingCost - (discount || 0);
//   }, [calculateSubtotal, shippingCost, discount]);
  
//   // ========== VALIDATE CREATE CUSTOMER FORM ==========
//   const validateCreateCustomerForm = () => {
//     const errors = {};
    
//     if (!createForm.contactPerson?.trim()) {
//       errors.contactPerson = 'Contact person is required';
//     }
//     if (!createForm.email?.trim()) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(createForm.email)) {
//       errors.email = 'Email is invalid';
//     }
//     if (!createForm.phone?.trim()) {
//       errors.phone = 'Phone number is required';
//     }
//     if (!createForm.country?.trim()) {
//       errors.country = 'Country is required';
//     }
//     if (!createForm.address?.trim()) {
//       errors.address = 'Address is required';
//     }
//     if (!createForm.city?.trim()) {
//       errors.city = 'City is required';
//     }
//     if (!createForm.zipCode?.trim()) {
//       errors.zipCode = 'ZIP Code is required';
//     }
//     if (!createForm.password) {
//       errors.password = 'Password is required';
//     } else if (createForm.password.length < 8) {
//       errors.password = 'Password must be at least 8 characters';
//     }
//     if (createForm.password !== createForm.confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }
    
//     setCreateFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };
  
//   // ========== CREATE CUSTOMER ==========
//   const handleCreateCustomer = async () => {
//     if (!validateCreateCustomerForm()) {
//       const firstErrorField = document.querySelector('.border-red-500');
//       if (firstErrorField) {
//         firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return false;
//     }
    
//     setIsCreating(true);
//     const loadingToast = toast.loading('Creating customer account...');
    
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:5000/api/auth/admin/create-customer', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           contactPerson: createForm.contactPerson,
//           email: createForm.email,
//           phone: createForm.phone,
//           whatsapp: createForm.whatsapp || '',
//           country: createForm.country,
//           address: createForm.address,
//           city: createForm.city,
//           zipCode: createForm.zipCode,
//           password: createForm.password
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (response.ok) {
//         toast.success('Customer Created Successfully!');
//         setCreateForm({
//           contactPerson: '',
//           email: '',
//           phone: '',
//           whatsapp: '',
//           country: '',
//           address: '',
//           city: '',
//           zipCode: '',
//           password: '',
//           confirmPassword: '',
//           subscribeToNewsletter: false
//         });
//         setCreateFormErrors({});
//         setShowCreateCustomer(false);
//         setIsCreating(false);
//         return data.user || data.data;
//       } else {
//         toast.error(data.error || 'Creation Failed');
//         setIsCreating(false);
//         return null;
//       }
//     } catch (error) {
//       console.error('Error creating customer:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error');
//       setIsCreating(false);
//       return null;
//     }
//   };
  
//   // ========== HANDLE CREATE FORM CHANGES ==========
//   const handleCreateChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setCreateForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (createFormErrors[name]) {
//       setCreateFormErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };
  
//   // ========== VALIDATE ORDER FORM ==========
//   const validateOrderForm = () => {
//     const errors = {};
    
//     if (!orderForm.fullName?.trim()) {
//       errors.fullName = 'Full name is required';
//     }
//     if (!orderForm.phone?.trim()) {
//       errors.phone = 'Phone number is required';
//     }
//     if (!orderForm.address?.trim()) {
//       errors.address = 'Address is required';
//     }
//     if (!orderForm.division?.trim()) {
//       errors.division = 'Division is required';
//     }
//     if (!orderForm.city?.trim()) {
//       errors.city = 'City is required';
//     }
//     if (!orderForm.zone?.trim()) {
//       errors.zone = 'Upazila/Thana is required';
//     }
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };
  
//   // ========== PLACE ORDER ==========
//   const handlePlaceOrder = async () => {
//     let customerId = selectedCustomer?._id;
    
//     if (showCreateCustomer) {
//       const newCustomer = await handleCreateCustomer();
//       if (newCustomer) {
//         customerId = newCustomer._id;
//         setOrderForm(prev => ({
//           ...prev,
//           fullName: newCustomer.contactPerson || '',
//           email: newCustomer.email || '',
//           phone: newCustomer.phone || '',
//           division: newCustomer.division || '',
//           address: newCustomer.address || '',
//           city: newCustomer.city || '',
//           zipCode: newCustomer.zipCode || '',
//           country: newCustomer.country || 'Bangladesh'
//         }));
//         setSelectedCustomer(newCustomer);
//         setShowCreateCustomer(false);
//       } else {
//         return;
//       }
//     }
    
//     if (!validateOrderForm()) {
//       const firstErrorField = document.querySelector('.border-red-500');
//       if (firstErrorField) {
//         firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }
    
//     // Build order items
//     const formattedItems = [];
    
//     orderItems.forEach(item => {
//       let productSlug = item.productSlug || 
//                         item.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 
//                         'unknown-product';
      
//       if (item.hasVariants && item.variantItems) {
//         // Add each variant as a separate item
//         item.variantItems.forEach(variant => {
//           formattedItems.push({
//             productId: item.productId,
//             productName: item.productName,
//             productSlug: productSlug,
//             image: variant.variantImage || variant.image || item.image || '',
//             regularPrice: variant.regularPrice || item.regularPrice,
//             discountPrice: variant.discountPrice || item.discountPrice || 0,
//             unit: item.unit || 'pcs',
//             stockQuantity: variant.stockQuantity || item.stockQuantity || 0,
//             quantity: variant.quantity || 0,
//             variantId: variant.variantId,
//             variantName: variant.variantName,
//             variantType: variant.variantType,
//             subVariantId: variant.subVariantId,
//             subVariantName: variant.subVariantName,
//             variantRegularPrice: variant.variantRegularPrice || 0,
//             variantDiscountPrice: variant.variantDiscountPrice || 0,
//             variantImage: variant.variantImage || '',
//             selectedColor: variant.selectedColor || null,
//             colors: []
//           });
//         });
//       } else if (item.hasColors && item.colors) {
//         // Add color product
//         item.colors.forEach(color => {
//           formattedItems.push({
//             productId: item.productId,
//             productName: item.productName,
//             productSlug: productSlug,
//             image: item.image || '',
//             regularPrice: item.regularPrice,
//             discountPrice: item.discountPrice || 0,
//             unit: item.unit || 'pcs',
//             stockQuantity: item.stockQuantity || 0,
//             quantity: color.quantity || 0,
//             variantId: null,
//             variantName: null,
//             variantType: null,
//             subVariantId: null,
//             subVariantName: null,
//             variantRegularPrice: 0,
//             variantDiscountPrice: 0,
//             variantImage: '',
//             selectedColor: color.color || null,
//             colors: [{
//               color: color.color,
//               quantity: color.quantity,
//               price: color.price || item.discountPrice || item.regularPrice
//             }]
//           });
//         });
//       } else {
//         // Add plain product
//         formattedItems.push({
//           productId: item.productId,
//           productName: item.productName,
//           productSlug: productSlug,
//           image: item.image || '',
//           regularPrice: item.regularPrice,
//           discountPrice: item.discountPrice || 0,
//           unit: item.unit || 'pcs',
//           stockQuantity: item.stockQuantity || 0,
//           quantity: item.totalQuantity || 0,
//           variantId: null,
//           variantName: null,
//           variantType: null,
//           subVariantId: null,
//           subVariantName: null,
//           variantRegularPrice: 0,
//           variantDiscountPrice: 0,
//           variantImage: '',
//           selectedColor: null,
//           colors: []
//         });
//       }
//     });
    
//     // Filter out items with quantity 0
//     const validItems = formattedItems.filter(item => item.quantity > 0);
    
//     if (validItems.length === 0) {
//       toast.error('Please add at least one product with valid quantity');
//       return;
//     }
    
//     setSubmitting(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = `manual_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      
//       const subtotal = calculateSubtotal();
//       const total = calculateTotal();
      
//       const orderData = {
//         items: validItems,
//         subtotal,
//         shippingCost,
//         discount: discount || 0,
//         total,
//         paymentMethod: 'cod',
//         customerInfo: {
//           fullName: orderForm.fullName,
//           email: orderForm.email || '',
//           phone: orderForm.phone,
//           division: orderForm.division,
//           address: orderForm.address,
//           city: orderForm.city,
//           zone: orderForm.zone || '',
//           area: orderForm.area || '',
//           zipCode: orderForm.zipCode || '',
//           country: orderForm.country || 'Bangladesh',
//           note: orderForm.note || ''
//         },
//         orderStatus: 'placed',
//         sessionId: sessionId,
//         clientDeviceInfo: {
//           deviceType: 'desktop',
//           browser: 'Admin Panel',
//           os: 'Manual Order',
//           screenResolution: '1920x1080'
//         }
//       };
      
//       if (customerId) {
//         orderData.userId = customerId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(orderData)
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Order placed successfully!');
//         router.push('/authorize/orders');
//       } else {
//         toast.error(data.error || 'Failed to place order');
//       }
//     } catch (error) {
//       console.error('Place order error:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   // ========== TOGGLE SECTION ==========
//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   // ========== RENDER ORDER ITEM (Variant Product with Expand) ==========
//   const renderVariantOrderItem = (item, index) => {
//     const isExpanded = expandedOrderItems[item.productId] !== false;
//     const availableVariants = getAvailableVariantsForItem(item);
    
//     // Group variants by variantId
//     const variantGroups = {};
//     item.variantItems.forEach(v => {
//       const key = v.variantId || 'no-variant';
//       if (!variantGroups[key]) variantGroups[key] = [];
//       variantGroups[key].push(v);
//     });

//     return (
//       <div key={`${item.productId}-${index}`} className="border border-gray-200 rounded-lg overflow-hidden mb-3">
//         {/* Product Header */}
//         <div className="flex items-center gap-3 p-3 bg-gray-50 border-b border-gray-200">
//           <img
//             src={item.image || 'https://via.placeholder.com/40'}
//             alt={item.productName}
//             className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
//             onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//           />
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center gap-2">
//               <p className="text-sm font-medium text-black truncate">{item.productName}</p>
//               <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full whitespace-nowrap">
//                 {item.variantItems.length} {item.variantItems.length > 1 ? 'variants' : 'variant'}
//               </span>
//             </div>
//             <div className="flex items-center gap-2 text-xs text-gray-500">
//               <span>Total: {item.totalQuantity} items</span>
//               <span className="text-[#8B9D83] font-medium">৳{item.variantItems.reduce((sum, v) => {
//                 const price = v.variantDiscountPrice > 0 ? v.variantDiscountPrice : v.variantRegularPrice || v.regularPrice;
//                 return sum + (price * (v.quantity || 0));
//               }, 0).toFixed(2)}</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => toggleOrderItemExpand(item.productId)}
//               className="p-1 text-gray-400 hover:text-[#8B9D83] transition-colors"
//             >
//               {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//             </button>
//             <button
//               onClick={() => removeItemFromOrder(index)}
//               className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* Variants List - Only show when expanded */}
//         {isExpanded && (
//           <div className="p-3 space-y-2">
//             {/* Existing Variants */}
//             {Object.entries(variantGroups).map(([variantId, variants]) => {
//               const representative = variants[0];
//               const availableSubVariants = getAvailableSubVariantsForItem(item, variantId);
//               const hasSubVariants = variantHasSubVariants(variantId, item);

//               return (
//                 <div
//                   key={variantId}
//                   className="rounded-lg border border-gray-200 bg-gray-50/50 overflow-hidden"
//                 >
//                   <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100/50 border-b border-gray-200">
//                     <Layers className="w-3 h-3 text-[#8B9D83] flex-shrink-0" />
//                     <span className="text-[11px] font-semibold text-gray-800">
//                       {representative.variantName || 'Variant'}
//                     </span>
//                     {representative.selectedColor && (
//                       <Circle
//                         className="w-2.5 h-2.5 flex-shrink-0"
//                         style={{ color: representative.selectedColor, fill: representative.selectedColor }}
//                       />
//                     )}
//                     <span className="text-[9px] text-gray-400 ml-auto">
//                       {variants.filter(v => !v.isBaseProduct).length} {variants.filter(v => !v.isBaseProduct).length > 1 ? 'options' : 'option'} added
//                     </span>
//                   </div>

//                   <div className="p-1.5 space-y-1.5">
//                     {variants
//                       .filter(v => !v.isBaseProduct)
//                       .map((variant, vIndex) => {
//                         const isSubVariant = variant.isSubVariant;
//                         const price = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice : variant.variantRegularPrice || variant.regularPrice;
//                         const originalPrice = variant.variantRegularPrice || variant.regularPrice;
//                         const hasDiscount = variant.variantDiscountPrice > 0 && variant.variantDiscountPrice < variant.variantRegularPrice;
                        
//                         return (
//                           <div
//                             key={variant.itemId || `variant-${vIndex}`}
//                             className={isSubVariant ? 'ml-3 pl-2 border-l-2 border-[#8B9D83]/25' : ''}
//                           >
//                             <div className="bg-white rounded-lg border border-gray-200 p-2 hover:border-[#8B9D83]/30 transition-all">
//                               <div className="flex items-center gap-2">
//                                 <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50">
//                                   <img
//                                     src={variant.variantImage || variant.image || item.image || 'https://via.placeholder.com/40?text=V'}
//                                     alt={variant.variantName || 'Variant'}
//                                     className="w-full h-full object-cover"
//                                     onError={(e) => {
//                                       e.target.src = 'https://via.placeholder.com/40?text=V';
//                                     }}
//                                   />
//                                 </div>

//                                 <div className="flex-1 min-w-0">
//                                   <div className="flex items-center gap-1.5 flex-wrap">
//                                     <span className="text-xs font-medium text-gray-800">
//                                       {isSubVariant ? variant.subVariantName : variant.variantName}
//                                     </span>
//                                     {variant.selectedColor && (
//                                       <span className="inline-flex items-center gap-0.5 text-[9px] text-[#8B9D83]">
//                                         <Circle 
//                                           className="w-2.5 h-2.5" 
//                                           style={{ color: variant.selectedColor, fill: variant.selectedColor }} 
//                                         />
//                                         {getColorName(variant.selectedColor)}
//                                       </span>
//                                     )}
//                                     {isSubVariant && (
//                                       <span className="text-[8px] bg-blue-50 text-blue-600 px-1 py-0.5 rounded">Sub</span>
//                                     )}
//                                     {!isSubVariant && (
//                                       <span className="text-[8px] bg-purple-50 text-purple-600 px-1 py-0.5 rounded">Variant</span>
//                                     )}
//                                     {hasDiscount && (
//                                       <span className="text-[8px] text-green-600 font-medium bg-green-50 px-1 py-0.5 rounded">
//                                         {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
//                                       </span>
//                                     )}
//                                   </div>
//                                   <div className="flex items-center gap-1.5 mt-0.5">
//                                     <span className="text-xs font-semibold text-[#8B9D83]">
//                                       ৳{Number(price).toFixed(2)}
//                                     </span>
//                                     {hasDiscount && (
//                                       <span className="text-[9px] text-gray-400 line-through">
//                                         ৳{Number(originalPrice).toFixed(2)}
//                                       </span>
//                                     )}
//                                     <span className="text-[9px] text-gray-400">| Stock: {variant.stockQuantity}</span>
//                                   </div>
//                                 </div>

//                                 <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white flex-shrink-0">
//                                   <button
//                                     onClick={() => updateVariantQuantityInOrder(index, vIndex, variant.quantity - 1)}
//                                     disabled={variant.quantity <= 1}
//                                     className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
//                                   >
//                                     <Minus className="w-3 h-3" />
//                                   </button>
//                                   <span className="w-8 text-center text-xs font-medium text-gray-900">
//                                     {variant.quantity}
//                                   </span>
//                                   <button
//                                     onClick={() => updateVariantQuantityInOrder(index, vIndex, variant.quantity + 1)}
//                                     disabled={variant.quantity >= variant.stockQuantity}
//                                     className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
//                                   >
//                                     <Plus className="w-3 h-3" />
//                                   </button>
//                                 </div>

//                                 <button
//                                   onClick={() => updateVariantQuantityInOrder(index, vIndex, 0)}
//                                   className="p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
//                                 >
//                                   <X className="w-3 h-3" />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}

//                     {/* Available Sub-Variants */}
//                     {hasSubVariants && availableSubVariants.length > 0 && (
//                       <div className="ml-3 pl-2 border-l-2 border-dashed border-gray-300 pt-1">
//                         <p className="text-[9px] text-gray-400 mb-1">
//                           Add sub-variant:
//                         </p>
//                         <div className="flex flex-wrap gap-1">
//                           {availableSubVariants.map((subVariant) => (
//                             <button
//                               key={subVariant.id}
//                               onClick={() => {
//                                 const parentVariant = item.variantTypes
//                                   .flatMap(vt => vt.variants)
//                                   .find(v => v.id === variantId);
//                                 const parentVariantType = item.variantTypes
//                                   .find(vt => vt.variants.some(v => v.id === variantId));
//                                 addSubVariantToExistingItem(
//                                   item.productId,
//                                   variantId,
//                                   subVariant,
//                                   parentVariant?.name || 'Variant',
//                                   parentVariantType?.type || 'Variant'
//                                 );
//                               }}
//                               className="text-[9px] px-2 py-1 rounded-full border border-gray-300 hover:border-[#8B9D83] text-gray-700 hover:bg-white transition-all flex items-center gap-1 bg-white/60"
//                             >
//                               <Plus className="w-2 h-2" />
//                               {subVariant.name}
//                               {subVariant.color && (
//                                 <span
//                                   className="inline-block w-2 h-2 rounded-full"
//                                   style={{ backgroundColor: subVariant.color }}
//                                 />
//                               )}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Available Variants to Add */}
//             {availableVariants.length > 0 && (
//               <div className="pt-1 border-t border-gray-200 mt-1">
//                 <p className="text-[9px] text-gray-400 mb-1.5">
//                   Add more variants:
//                 </p>
//                 <div className="flex flex-wrap gap-1">
//                   {availableVariants.map((v) => {
//                     const hasSubVariants = v.subVariants && v.subVariants.length > 0;
                    
//                     return (
//                       <button
//                         key={v.id}
//                         onClick={() => {
//                           // If variant has sub-variants, automatically add the first one
//                           if (hasSubVariants) {
//                             const firstSub = v.subVariants[0];
//                             const parentVariant = item.variantTypes
//                               .flatMap(vt => vt.variants)
//                               .find(vt => vt.id === v.id);
//                             const parentVariantType = item.variantTypes
//                               .find(vt => vt.variants.some(vt2 => vt2.id === v.id));
//                             addSubVariantToExistingItem(
//                               item.productId,
//                               v.id,
//                               firstSub,
//                               v.name,
//                               parentVariantType?.type || 'Variant'
//                             );
//                             return;
//                           }
//                           addVariantToExistingItem(item.productId, v, v.type);
//                         }}
//                         className={`text-[9px] px-2 py-1 rounded-full border transition-all flex items-center gap-1 ${
//                           hasSubVariants
//                             ? 'border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-400'
//                             : 'border-gray-300 hover:border-[#8B9D83] text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         <Plus className="w-2 h-2" />
//                         {v.name}
//                         {v.color && (
//                           <span
//                             className="inline-block w-2 h-2 rounded-full"
//                             style={{ backgroundColor: v.color }}
//                           />
//                         )}
//                         {hasSubVariants && (
//                           <span className="text-[8px] bg-amber-200 text-amber-700 px-1 py-0.5 rounded-full">
//                             {v.subVariants.length} sub
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // ========== RENDER ==========
//   return (
//     <ProtectedRoute pageKey="all_orders">
//       <div className="min-h-screen bg-white">
//         <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div>
//                   <h1 className="text-2xl font-bold text-black flex items-center gap-2">
//                     <ShoppingBag className="w-6 h-6 text-[#718369]" />
//                     Manual Order Creation
//                   </h1>
//                   <p className="text-sm text-gray-500">Create orders for customers manually</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => router.push('/authorize/orders')}
//                   className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handlePlaceOrder}
//                   disabled={submitting || orderItems.length === 0}
//                   className="px-6 py-2 bg-[#5b6b54] text-white rounded-lg hover:bg-[#4d5c47]transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Placing Order...
//                     </>
//                   ) : (
//                     <>
//                       <Zap className="w-4 h-4" />
//                       Place Order
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="p-6 max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column - Forms */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* ========== CUSTOMER SECTION ========== */}
//               <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//                 <button
//                   onClick={() => toggleSection('customer')}
//                   className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Users className="w-5 h-5 text-black" />
//                     <h2 className="text-base font-semibold text-black">Customer</h2>
//                     {selectedCustomer && (
//                       <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
//                         Selected
//                       </span>
//                     )}
//                     {showCreateCustomer && (
//                       <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
//                         New Customer
//                       </span>
//                     )}
//                   </div>
//                   {expandedSections.customer ? (
//                     <ChevronUp className="w-4 h-4 text-gray-400" />
//                   ) : (
//                     <ChevronDown className="w-4 h-4 text-gray-400" />
//                   )}
//                 </button>
                
//                 {expandedSections.customer && (
//                   <div className="px-5 pb-5 space-y-4">
//                     {/* Customer Search */}
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         Search Existing Customer
//                       </label>
//                       <div className="relative">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           type="text"
//                           value={customerSearchQuery}
//                           onChange={(e) => setCustomerSearchQuery(e.target.value)}
//                           placeholder="Search by name, email, or phone..."
//                           className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                         />
//                         {searchingCustomers && (
//                           <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
//                         )}
//                       </div>
                      
//                       {customerSearchResults.length > 0 && (
//                         <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
//                           {customerSearchResults.map(customer => (
//                             <button
//                               key={customer._id}
//                               onClick={() => handleSelectCustomer(customer)}
//                               className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center gap-3"
//                             >
//                               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
//                                 {customer.contactPerson?.charAt(0) || '?'}
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-sm font-medium text-black truncate">
//                                   {customer.contactPerson}
//                                 </p>
//                                 <p className="text-xs text-gray-500 truncate">
//                                   {customer.email} • {customer.phone}
//                                 </p>
//                               </div>
//                               <UserCheck className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Selected Customer Display */}
//                     {selectedCustomer && !showCreateCustomer && (
//                       <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-semibold text-sm">
//                             {selectedCustomer.contactPerson?.charAt(0) || '?'}
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-black">{selectedCustomer.contactPerson}</p>
//                             <p className="text-xs text-gray-500">{selectedCustomer.email} • {selectedCustomer.phone}</p>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => {
//                             setSelectedCustomer(null);
//                             setCustomerSearchQuery('');
//                           }}
//                           className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
                    
//                     {/* Create New Customer Toggle */}
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => {
//                           setShowCreateCustomer(!showCreateCustomer);
//                           if (!showCreateCustomer) {
//                             setSelectedCustomer(null);
//                             setCustomerSearchQuery('');
//                             setCreateForm({
//                               contactPerson: '',
//                               email: '',
//                               phone: '',
//                               whatsapp: '',
//                               country: '',
//                               address: '',
//                               city: '',
//                               zipCode: '',
//                               password: '',
//                               confirmPassword: '',
//                               subscribeToNewsletter: false
//                             });
//                             setCreateFormErrors({});
//                           }
//                         }}
//                         className="text-sm text-black hover:underline flex items-center gap-1"
//                       >
//                         <UserPlus className="w-4 h-4" />
//                         {showCreateCustomer ? 'Cancel' : 'Create New Customer'}
//                       </button>
//                     </div>
                    
//                     {/* Create Customer Form */}
//                     {showCreateCustomer && (
//                       <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4">
//                         <h3 className="text-sm font-medium text-black">New Customer Details</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Contact Person <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               name="contactPerson"
//                               value={createForm.contactPerson}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.contactPerson ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="Your full name"
//                             />
//                             {createFormErrors.contactPerson && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.contactPerson}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Email Address <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="email"
//                               name="email"
//                               value={createForm.email}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.email ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="your@email.com"
//                             />
//                             {createFormErrors.email && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.email}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Phone <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="tel"
//                               name="phone"
//                               value={createForm.phone}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.phone ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="01XXXXXXXXX"
//                             />
//                             {createFormErrors.phone && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.phone}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               WhatsApp
//                             </label>
//                             <input
//                               type="tel"
//                               name="whatsapp"
//                               value={createForm.whatsapp}
//                               onChange={handleCreateChange}
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                               placeholder="01XXXXXXXXX"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Country <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               name="country"
//                               value={createForm.country}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.country ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="Country"
//                             />
//                             {createFormErrors.country && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.country}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               City <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               name="city"
//                               value={createForm.city}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.city ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="City"
//                             />
//                             {createFormErrors.city && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.city}</p>
//                             )}
//                           </div>
//                           <div className="md:col-span-2">
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Address <span className="text-red-500">*</span>
//                             </label>
//                             <textarea
//                               name="address"
//                               value={createForm.address}
//                               onChange={handleCreateChange}
//                               rows="2"
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none ${
//                                 createFormErrors.address ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="Street address"
//                             />
//                             {createFormErrors.address && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.address}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               ZIP Code <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               name="zipCode"
//                               value={createForm.zipCode}
//                               onChange={handleCreateChange}
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                                 createFormErrors.zipCode ? 'border-red-500' : 'border-gray-300'
//                               }`}
//                               placeholder="ZIP Code"
//                             />
//                             {createFormErrors.zipCode && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.zipCode}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Password <span className="text-red-500">*</span>
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 name="password"
//                                 value={createForm.password}
//                                 onChange={handleCreateChange}
//                                 className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent pr-10 ${
//                                   createFormErrors.password ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                                 placeholder="Min 8 characters"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                               >
//                                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                               </button>
//                             </div>
//                             {createFormErrors.password && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.password}</p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">
//                               Confirm Password <span className="text-red-500">*</span>
//                             </label>
//                             <div className="relative">
//                               <input
//                                 type={showConfirmPassword ? 'text' : 'password'}
//                                 name="confirmPassword"
//                                 value={createForm.confirmPassword}
//                                 onChange={handleCreateChange}
//                                 className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent pr-10 ${
//                                   createFormErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                                 placeholder="Confirm password"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                               >
//                                 {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                               </button>
//                             </div>
//                             {createFormErrors.confirmPassword && (
//                               <p className="text-xs text-red-500 mt-1">{createFormErrors.confirmPassword}</p>
//                             )}
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
//                           <button
//                             type="button"
//                             onClick={() => setShowCreateCustomer(false)}
//                             className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             type="button"
//                             onClick={async () => {
//                               const newCustomer = await handleCreateCustomer();
//                               if (newCustomer) {
//                                 handleSelectCustomer(newCustomer);
//                                 setShowCreateCustomer(false);
//                               }
//                             }}
//                             disabled={isCreating}
//                             className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
//                           >
//                             {isCreating ? (
//                               <>
//                                 <RefreshCw className="w-4 h-4 animate-spin" />
//                                 Creating...
//                               </>
//                             ) : (
//                               <>
//                                 <UserPlus className="w-4 h-4" />
//                                 Create & Select
//                               </>
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
              
//               {/* ========== PRODUCTS SECTION ========== */}
//               <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//                 <button
//                   onClick={() => toggleSection('products')}
//                   className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Package className="w-5 h-5 text-black" />
//                     <h2 className="text-base font-semibold text-black">Products</h2>
//                     {orderItems.length > 0 && (
//                       <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
//                         {orderItems.length} items
//                       </span>
//                     )}
//                   </div>
//                   {expandedSections.products ? (
//                     <ChevronUp className="w-4 h-4 text-gray-400" />
//                   ) : (
//                     <ChevronDown className="w-4 h-4 text-gray-400" />
//                   )}
//                 </button>
                
//                 {expandedSections.products && (
//                   <div className="px-5 pb-5 space-y-4">
//                     {/* Add Product Button */}
//                     {!showAddProduct ? (
//                       <button
//                         onClick={() => setShowAddProduct(true)}
//                         className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-black flex items-center justify-center gap-2"
//                       >
//                         <Plus className="w-4 h-4" />
//                         Add Product
//                       </button>
//                     ) : (
//                       <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                         <div className="flex items-center justify-between mb-3">
//                           <h3 className="text-sm font-medium text-black">Add Product</h3>
//                           <button
//                             onClick={resetProductSelection}
//                             className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
                        
//                         {/* Product Search */}
//                         <div className="relative mb-3">
//                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           <input
//                             type="text"
//                             value={productSearchQuery}
//                             onChange={(e) => setProductSearchQuery(e.target.value)}
//                             placeholder="Search products by name, SKU, or barcode..."
//                             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
//                             autoFocus
//                           />
//                           {searchingProducts && (
//                             <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
//                           )}
//                         </div>
                        
//                         {/* Search Results */}
//                         {productSearchResults.length > 0 && (
//                           <div className="mb-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white">
//                             {productSearchResults.map(product => (
//                               <button
//                                 key={product._id}
//                                 onClick={() => handleSelectProduct(product)}
//                                 className={`w-full p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center gap-3 ${
//                                   selectedProduct?._id === product._id ? 'bg-gray-50' : ''
//                                 }`}
//                               >
//                                 <img
//                                   src={product.images?.[0]?.url || 'https://via.placeholder.com/40'}
//                                   alt={product.productName}
//                                   className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                                 />
//                                 <div className="flex-1 min-w-0">
//                                   <p className="text-sm font-medium text-black truncate">{product.productName}</p>
//                                   <div className="flex items-center gap-2 text-xs text-gray-500">
//                                     <span>৳{(product.discountPrice || product.regularPrice).toFixed(2)}</span>
//                                     {product.discountPrice > 0 && (
//                                       <span className="line-through">৳{product.regularPrice.toFixed(2)}</span>
//                                     )}
//                                     <span>• Stock: {product.stockQuantity}</span>
//                                     {product.hasVariants && (
//                                       <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
//                                         Has Variants
//                                       </span>
//                                     )}
//                                     {product.colors && product.colors.length > 0 && (
//                                       <span className="text-xs bg-pink-100 text-[#5b6b54] px-1.5 py-0.5 rounded-full">
//                                         {product.colors.length} colors
//                                       </span>
//                                     )}
//                                   </div>
//                                 </div>
//                                 {selectedProduct?._id === product._id && (
//                                   <Check className="w-4 h-4 text-black" />
//                                 )}
//                               </button>
//                             ))}
//                           </div>
//                         )}
                        
//                         {/* Selected Product - Display Variants */}
//                         {selectedProduct && (
//                           <div className="bg-white rounded-lg p-3 border border-gray-200 space-y-3">
//                             <div className="flex items-center gap-3">
//                               <img
//                                 src={selectedProduct.images?.[0]?.url || 'https://via.placeholder.com/40'}
//                                 alt={selectedProduct.productName}
//                                 className="w-12 h-12 rounded-lg object-cover border border-gray-200"
//                                 onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                               />
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-sm font-medium text-black">{selectedProduct.productName}</p>
//                                 <p className="text-xs text-gray-500">
//                                   Stock: {selectedProduct.stockQuantity} • ৳{(selectedProduct.discountPrice || selectedProduct.regularPrice).toFixed(2)}
//                                   {selectedProduct.hasVariants && (
//                                     <span className="ml-2 text-blue-600">• Has Variants</span>
//                                   )}
//                                 </p>
//                               </div>
//                             </div>
                            
//                             {/* ========== VARIANTS SECTION ========== */}
//                             {selectedProduct.hasVariants && selectedProduct.variantTypes?.length > 0 && (
//                               <div className="space-y-3">
//                                 {selectedProduct.variantTypes.map((vt) => (
//                                   <div key={vt.id || vt.type} className="space-y-2">
//                                     <p className="text-xs font-medium text-gray-700">
//                                       {vt.type.charAt(0).toUpperCase() + vt.type.slice(1)} Variants:
//                                     </p>
//                                     <div className="space-y-2">
//                                       {vt.variants.map((v) => {
//                                         const hasSub = v.subVariants && v.subVariants.length > 0;
//                                         // For variants with sub-variants, check if any sub-variant is selected
//                                         let isSelected = false;
//                                         if (hasSub) {
//                                           isSelected = selectedVariantsWithQty.some(sv => 
//                                             sv.variantId === v.id && sv.subVariantId !== null
//                                           );
//                                         } else {
//                                           isSelected = selectedVariantsWithQty.some(sv => 
//                                             sv.variantId === v.id && !sv.subVariantId
//                                           );
//                                         }
                                        
//                                         return (
//                                           <div key={v.id} className="border rounded-lg p-2 bg-white">
//                                             <div className="flex items-center gap-2">
//                                               {v.images?.[0] && (
//                                                 <img src={v.images[0]} className="w-8 h-8 rounded object-cover border border-gray-200" alt={v.name} />
//                                               )}
//                                               <span className="text-sm font-medium text-gray-800">{v.name}</span>
//                                               <span className="text-xs text-gray-500 ml-auto">
//                                                 ৳{(v.discountPrice || v.regularPrice || 0).toFixed(2)}
//                                               </span>
//                                               <button
//                                                 onClick={() => toggleVariantSelection(vt, v)}
//                                                 className={`px-2 py-0.5 text-xs rounded ${
//                                                   isSelected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-black text-white hover:bg-gray-800'
//                                                 }`}
//                                               >
//                                                 {isSelected ? 'Remove' : 'Add'}
//                                               </button>
//                                               {hasSub && (
//                                                 <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
//                                                   {v.subVariants.length} sub
//                                                 </span>
//                                               )}
//                                             </div>
                                            
//                                             {/* For variants WITH sub-variants, show selected sub-variant and quantity */}
//                                             {hasSub && (
//                                               <div className="mt-2 pl-3 space-y-1 border-l-2 border-gray-200">
//                                                 {v.subVariants.map((sv) => {
//                                                   const selectedSub = selectedVariantsWithQty.find(
//                                                     x => x.variantId === v.id && x.subVariantId === sv.id
//                                                   );
//                                                   const isSubSelected = !!selectedSub;
                                                  
//                                                   return (
//                                                     <div key={sv.id} className="flex items-center gap-2 py-1">
//                                                       {sv.images?.[0] && (
//                                                         <img src={sv.images[0]} className="w-5 h-5 rounded object-cover border border-gray-200" alt={sv.name} />
//                                                       )}
//                                                       <span className="text-xs text-gray-700">{sv.name}</span>
//                                                       <span className="text-[10px] text-gray-500">
//                                                         ৳{(sv.discountPrice || sv.regularPrice || 0).toFixed(2)}
//                                                       </span>
//                                                       <button
//                                                         onClick={() => toggleSubVariantSelection(vt, v, sv)}
//                                                         className={`px-1.5 py-0.5 text-[10px] rounded ${
//                                                           isSubSelected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-black text-white hover:bg-gray-800'
//                                                         }`}
//                                                       >
//                                                         {isSubSelected ? 'Remove' : 'Add'}
//                                                       </button>
//                                                       {isSubSelected && (
//                                                         <div className="flex items-center gap-1">
//                                                           <button
//                                                             onClick={() => updateVariantQty(v.id, sv.id, (selectedSub?.quantity || 1) - 1)}
//                                                             className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
//                                                             disabled={selectedSub?.quantity <= 1}
//                                                           >
//                                                             <Minus className="w-2.5 h-2.5" />
//                                                           </button>
//                                                           <span className="w-6 text-center text-[10px] font-medium">
//                                                             {selectedSub?.quantity || 1}
//                                                           </span>
//                                                           <button
//                                                             onClick={() => updateVariantQty(v.id, sv.id, (selectedSub?.quantity || 1) + 1)}
//                                                             className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
//                                                             disabled={selectedSub?.quantity >= (sv.stockQuantity || 999)}
//                                                           >
//                                                             <Plus className="w-2.5 h-2.5" />
//                                                           </button>
//                                                         </div>
//                                                       )}
//                                                     </div>
//                                                   );
//                                                 })}
//                                               </div>
//                                             )}
                                            
//                                             {/* For variants WITHOUT sub-variants, show quantity */}
//                                             {!hasSub && isSelected && (
//                                               <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
//                                                 <span className="text-xs text-gray-500">Qty:</span>
//                                                 <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
//                                                   <button
//                                                     onClick={() => updateVariantQty(v.id, null, (selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1) - 1)}
//                                                     className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
//                                                     disabled={(selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1) <= 1}
//                                                   >
//                                                     <Minus className="w-3 h-3" />
//                                                   </button>
//                                                   <span className="w-8 text-center text-xs font-medium">
//                                                     {selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1}
//                                                   </span>
//                                                   <button
//                                                     onClick={() => updateVariantQty(v.id, null, (selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1) + 1)}
//                                                     className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
//                                                     disabled={(selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1) >= (v.stockQuantity || 999)}
//                                                   >
//                                                     <Plus className="w-3 h-3" />
//                                                   </button>
//                                                 </div>
//                                                 <span className="text-[10px] text-gray-400">
//                                                   max {v.stockQuantity || 0}
//                                                 </span>
//                                               </div>
//                                             )}
//                                           </div>
//                                         );
//                                       })}
//                                     </div>
//                                   </div>
//                                 ))}
                                
//                                 {/* Selected Variants Summary */}
//                                 {selectedVariantsWithQty.length > 0 && (
//                                   <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
//                                     <div className="flex items-center justify-between text-xs">
//                                       <span className="text-blue-700 font-medium">
//                                         {selectedVariantsWithQty.length} variant(s) selected
//                                       </span>
//                                       <span className="text-blue-700 font-medium">
//                                         Total: {getTotalVariantQuantity()} items • ৳{getTotalVariantPrice().toFixed(2)}
//                                       </span>
//                                     </div>
//                                   </div>
//                                 )}
//                               </div>
//                             )}
                            
//                             {/* ========== COLORS SECTION (for products without variants) ========== */}
//                             {!selectedProduct.hasVariants && selectedProduct.colors && selectedProduct.colors.length > 0 && (
//                               <div className="space-y-2">
//                                 <p className="text-xs font-medium text-gray-700">Select Colors:</p>
//                                 <div className="flex flex-wrap gap-2">
//                                   {selectedProduct.colors.map((color) => {
//                                     const selected = selectedColorsWithQty.find(c => c.color === color);
//                                     const isSelected = !!selected;
//                                     const quantity = selected?.quantity || 1;
                                    
//                                     return (
//                                       <div key={color} className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white">
//                                         <div 
//                                           className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
//                                           style={{ backgroundColor: color }}
//                                           title={color}
//                                         />
//                                         <button
//                                           onClick={() => toggleColorSelection(color)}
//                                           className={`px-2 py-0.5 text-xs rounded ${
//                                             isSelected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-black text-white hover:bg-gray-800'
//                                           }`}
//                                         >
//                                           {isSelected ? 'Remove' : 'Add'}
//                                         </button>
//                                         {isSelected && (
//                                           <div className="flex items-center gap-1">
//                                             <button
//                                               onClick={() => updateSelectedColorQuantity(color, quantity - 1)}
//                                               className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
//                                               disabled={quantity <= 1}
//                                             >
//                                               <Minus className="w-3 h-3" />
//                                             </button>
//                                             <span className="w-8 text-center text-xs font-medium">{quantity}</span>
//                                             <button
//                                               onClick={() => updateSelectedColorQuantity(color, quantity + 1)}
//                                               className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
//                                               disabled={quantity >= selectedProduct.stockQuantity}
//                                             >
//                                               <Plus className="w-3 h-3" />
//                                             </button>
//                                           </div>
//                                         )}
//                                       </div>
//                                     );
//                                   })}
//                                 </div>
//                               </div>
//                             )}
                            
//                             {/* ========== QUANTITY (No Colors, No Variants) ========== */}
//                             {!selectedProduct.hasVariants && (!selectedProduct.colors || selectedProduct.colors.length === 0) && (
//                               <div className="flex items-center gap-3">
//                                 <span className="text-xs text-gray-600">Quantity:</span>
//                                 <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
//                                   <button
//                                     onClick={() => setAddQuantity(prev => Math.max(1, prev - 1))}
//                                     className="px-2 py-1 hover:bg-gray-100 transition-colors"
//                                     disabled={addQuantity <= 1}
//                                   >
//                                     <Minus className="w-3 h-3" />
//                                   </button>
//                                   <input
//                                     type="text"
//                                     inputMode="numeric"
//                                     pattern="[0-9]*"
//                                     value={addQuantity}
//                                     onChange={(e) => {
//                                       const value = e.target.value;
//                                       if (value === '' || /^\d+$/.test(value)) {
//                                         const numValue = parseInt(value) || 1;
//                                         setAddQuantity(Math.min(numValue, selectedProduct.stockQuantity || 999));
//                                       }
//                                     }}
//                                     className="w-14 text-center text-sm py-1 bg-white focus:outline-none"
//                                   />
//                                   <button
//                                     onClick={() => setAddQuantity(prev => Math.min(selectedProduct.stockQuantity || 999, prev + 1))}
//                                     className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 transition-colors"
//                                     disabled={addQuantity >= (selectedProduct.stockQuantity || 999)}
//                                   >
//                                     <Plus className="w-3 h-3" />
//                                   </button>
//                                 </div>
//                                 <span className="text-xs text-gray-500">/ {selectedProduct.stockQuantity || 0}</span>
//                               </div>
//                             )}
                            
//                             {/* Add to Order Button */}
//                             <button
//                               onClick={handleAddProductToOrder}
//                               disabled={
//                                 (selectedProduct.hasVariants && selectedVariantsWithQty.length === 0) ||
//                                 (selectedProduct.hasVariants && !isVariantSelectionComplete())
//                               }
//                               className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
//                                 (selectedProduct.hasVariants && selectedVariantsWithQty.length === 0) ||
//                                 (selectedProduct.hasVariants && !isVariantSelectionComplete())
//                                   ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                                   : 'bg-black text-white hover:bg-gray-800 transition-colors'
//                               }`}
//                             >
//                               <Plus className="w-4 h-4" />
//                               {selectedProduct.hasVariants 
//                                 ? `Add ${selectedVariantsWithQty.length} Variant(s) to Order`
//                                 : 'Add to Order'}
//                             </button>
//                             {selectedProduct.hasVariants && selectedVariantsWithQty.length === 0 && (
//                               <p className="text-xs text-amber-600 text-center mt-1">
//                                 Please select at least one variant
//                               </p>
//                             )}
//                             {selectedProduct.hasVariants && selectedVariantsWithQty.length > 0 && !isVariantSelectionComplete() && (
//                               <p className="text-xs text-amber-600 text-center mt-1">
//                                 Please set quantity for all selected variants
//                               </p>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     )}
                    
//                     {/* Order Items List - With Variant Add Options */}
//                     {orderItems.length > 0 && (
//                       <div className="space-y-3 mt-3">
//                         {orderItems.map((item, index) => {
//                           if (item.hasVariants && item.variantItems) {
//                             return renderVariantOrderItem(item, index);
//                           } else if (item.hasColors && item.colors) {
//                             // ========== COLOR PRODUCT DISPLAY ==========
//                             return (
//                               <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
//                                 <div className="flex items-center gap-3 p-3 bg-gray-50 border-b border-gray-200">
//                                   <img
//                                     src={item.image || 'https://via.placeholder.com/40'}
//                                     alt={item.productName}
//                                     className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
//                                     onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                                   />
//                                   <div className="flex-1 min-w-0">
//                                     <p className="text-sm font-medium text-black">{item.productName}</p>
//                                     <div className="flex items-center gap-2 text-xs text-gray-500">
//                                       <span>Stock: {item.stockQuantity}</span>
//                                       <span>• Total: {item.totalQuantity} items</span>
//                                       <span className="text-[#718369]">• {item.colors.length} colors</span>
//                                     </div>
//                                   </div>
//                                   <button
//                                     onClick={() => removeItemFromOrder(index)}
//                                     className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
//                                   >
//                                     <Trash2 className="w-4 h-4" />
//                                   </button>
//                                 </div>
                                
//                                 <div className="p-3 space-y-2">
//                                   {item.colors.map((colorInfo) => (
//                                     <div key={colorInfo.color} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
//                                       <div 
//                                         className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
//                                         style={{ backgroundColor: colorInfo.color }}
//                                         title={colorInfo.color}
//                                       />
//                                       <div className="flex-1 min-w-0">
//                                         <p className="text-xs font-medium text-gray-800">{getColorName(colorInfo.color)}</p>
//                                         <div className="flex items-center gap-2 text-[10px] text-gray-500">
//                                           <span className="font-medium text-gray-700">
//                                             ৳{(colorInfo.price || item.discountPrice || item.regularPrice).toFixed(2)}
//                                           </span>
//                                         </div>
//                                       </div>
//                                       <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
//                                         <button
//                                           onClick={() => updateColorQuantityInOrder(index, colorInfo.color, colorInfo.quantity - 1)}
//                                           disabled={colorInfo.quantity <= 1}
//                                           className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
//                                         >
//                                           <Minus className="w-3 h-3" />
//                                         </button>
//                                         <span className="w-8 text-center text-xs font-medium text-gray-900">
//                                           {colorInfo.quantity}
//                                         </span>
//                                         <button
//                                           onClick={() => updateColorQuantityInOrder(index, colorInfo.color, colorInfo.quantity + 1)}
//                                           disabled={colorInfo.quantity >= item.stockQuantity}
//                                           className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
//                                         >
//                                           <Plus className="w-3 h-3" />
//                                         </button>
//                                       </div>
//                                       <button
//                                         onClick={() => updateColorQuantityInOrder(index, colorInfo.color, 0)}
//                                         className="p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
//                                       >
//                                         <X className="w-3 h-3" />
//                                       </button>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             );
//                           } else {
//                             // ========== PLAIN PRODUCT DISPLAY ==========
//                             const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//                             return (
//                               <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
//                                 <img
//                                   src={item.image || 'https://via.placeholder.com/40'}
//                                   alt={item.productName}
//                                   className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
//                                 />
//                                 <div className="flex-1 min-w-0">
//                                   <p className="text-sm font-medium text-black">{item.productName}</p>
//                                   <div className="flex items-center gap-2 text-xs text-gray-500">
//                                     <span>৳{price.toFixed(2)}</span>
//                                     {item.discountPrice > 0 && (
//                                       <span className="line-through">৳{item.regularPrice.toFixed(2)}</span>
//                                     )}
//                                     <span>• Stock: {item.stockQuantity}</span>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
//                                   <button
//                                     onClick={() => updateItemQuantity(index, item.totalQuantity - 1)}
//                                     disabled={item.totalQuantity <= 1}
//                                     className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
//                                   >
//                                     <Minus className="w-3 h-3" />
//                                   </button>
//                                   <span className="w-10 text-center text-sm font-medium text-gray-900">
//                                     {item.totalQuantity}
//                                   </span>
//                                   <button
//                                     onClick={() => updateItemQuantity(index, item.totalQuantity + 1)}
//                                     disabled={item.totalQuantity >= item.stockQuantity}
//                                     className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
//                                   >
//                                     <Plus className="w-3 h-3" />
//                                   </button>
//                                 </div>
//                                 <button
//                                   onClick={() => removeItemFromOrder(index)}
//                                   className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             );
//                           }
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
              
//               {/* ========== DELIVERY ADDRESS SECTION ========== */}
//               <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//                 <button
//                   onClick={() => toggleSection('address')}
//                   className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-5 h-5 text-black" />
//                     <h2 className="text-base font-semibold text-black">Delivery Address</h2>
//                   </div>
//                   {expandedSections.address ? (
//                     <ChevronUp className="w-4 h-4 text-gray-400" />
//                   ) : (
//                     <ChevronDown className="w-4 h-4 text-gray-400" />
//                   )}
//                 </button>
                
//                 {expandedSections.address && (
//                   <div className="px-5 pb-5 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Full Name <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           value={orderForm.fullName}
//                           onChange={(e) => setOrderForm(prev => ({ ...prev, fullName: e.target.value }))}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                             formErrors.fullName ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="Customer Name"
//                         />
//                         {formErrors.fullName && (
//                           <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Phone <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="tel"
//                           value={orderForm.phone}
//                           onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                             formErrors.phone ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="01XXXXXXXXX"
//                         />
//                         {formErrors.phone && (
//                           <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           value={orderForm.email}
//                           onChange={(e) => setOrderForm(prev => ({ ...prev, email: e.target.value }))}
//                           className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                           placeholder="name@example.com"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Division <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           value={orderForm.division}
//                           onChange={(e) => {
//                             const division = e.target.value;
//                             setOrderForm(prev => ({ 
//                               ...prev, 
//                               division: division,
//                               city: '',
//                               zone: '',
//                               area: ''
//                             }));
//                             if (division && divisions[division]) {
//                               setCitiesByDivision(divisions[division]);
//                             } else {
//                               setCitiesByDivision([]);
//                             }
//                             setZones([]);
//                             setAreas([]);
//                           }}
//                           className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                             formErrors.division ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                         >
//                           <option value="">Select Division</option>
//                           {divisionList.map(division => (
//                             <option key={division} value={division}>{division}</option>
//                           ))}
//                         </select>
//                         {formErrors.division && (
//                           <p className="text-xs text-red-500 mt-1">{formErrors.division}</p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           District/City <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           value={orderForm.city}
//                           onChange={(e) => {
//                             const city = e.target.value;
//                             setOrderForm(prev => ({ ...prev, city: city, zone: '', area: '' }));
//                             if (city && locationData[city]) {
//                               const availableZones = Object.keys(locationData[city].zones || {});
//                               setZones(availableZones);
//                             } else {
//                               setZones([]);
//                             }
//                             setAreas([]);
//                             if (city) {
//                               calculateShipping(city);
//                             }
//                           }}
//                           disabled={!orderForm.division}
//                           className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                             formErrors.city ? 'border-red-500' : 'border-gray-300'
//                           } ${!orderForm.division ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//                         >
//                           <option value="">Select District</option>
//                           {citiesByDivision.map(city => (
//                             <option key={city} value={city}>{city}</option>
//                           ))}
//                         </select>
//                         {formErrors.city && (
//                           <p className="text-xs text-red-500 mt-1">{formErrors.city}</p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Upazila/Thana <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           value={orderForm.zone}
//                           onChange={(e) => {
//                             const zone = e.target.value;
//                             setOrderForm(prev => ({ ...prev, zone: zone, area: '' }));
//                             if (zone && orderForm.city && locationData[orderForm.city]) {
//                               const availableAreas = locationData[orderForm.city].zones[zone] || [];
//                               setAreas(availableAreas);
//                             } else {
//                               setAreas([]);
//                             }
//                             if (orderForm.city && zone) {
//                               calculateShipping(orderForm.city);
//                             }
//                           }}
//                           disabled={!orderForm.city}
//                           className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                             formErrors.zone ? 'border-red-500' : 'border-gray-300'
//                           } ${!orderForm.city ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//                         >
//                           <option value="">Select Upazila/Thana</option>
//                           {zones.map(zone => (
//                             <option key={zone} value={zone}>{zone}</option>
//                           ))}
//                         </select>
//                         {formErrors.zone && (
//                           <p className="text-xs text-red-500 mt-1">{formErrors.zone}</p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Union/Area
//                         </label>
//                         <select
//                           value={orderForm.area}
//                           onChange={(e) => {
//                             const area = e.target.value;
//                             setOrderForm(prev => ({ ...prev, area: area }));
//                             if (orderForm.city && orderForm.zone && area) {
//                               calculateShipping(orderForm.city);
//                             }
//                           }}
//                           disabled={!orderForm.zone}
//                           className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
//                             !orderForm.zone ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
//                           }`}
//                         >
//                           <option value="">Select Union/Area</option>
//                           {areas.map(area => (
//                             <option key={area} value={area}>{area}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Address <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                           value={orderForm.address}
//                           onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
//                           rows="2"
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none ${
//                             formErrors.address ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="House #, Road #, Area"
//                         />
//                         {formErrors.address && (
//                           <p className="text-xs text-red-500 mt-1">{formErrors.address}</p>
//                         )}
//                       </div>
//                     </div>
                    
//                     {orderForm.city && (
//                       <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
//                         <div className="flex items-center gap-2 text-sm">
//                           <Truck className="w-4 h-4 text-gray-500" />
//                           <span className="text-gray-600">Shipping Cost:</span>
//                         </div>
//                         <span className="text-sm font-semibold text-black">
//                           ৳{shippingCost.toFixed(2)}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* ========== RIGHT COLUMN - ORDER SUMMARY ========== */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-24">
//                 <div className="px-5 py-3 border-b border-gray-200">
//                   <div className="flex items-center gap-2">
//                     <ShoppingBag className="w-5 h-5 text-black" />
//                     <h2 className="text-base font-semibold text-black">Order Summary</h2>
//                     <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
//                       {orderItems.reduce((sum, item) => sum + (item.totalQuantity || 0), 0)} items
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="p-5 space-y-4">
//                   {/* Customer Info */}
//                   <div className="space-y-1 text-sm">
//                     <p className="text-xs text-gray-500 font-medium">Customer</p>
//                     {selectedCustomer ? (
//                       <>
//                         <p className="text-sm font-medium text-black">{selectedCustomer.contactPerson}</p>
//                         <p className="text-xs text-gray-500">{selectedCustomer.email} • {selectedCustomer.phone}</p>
//                       </>
//                     ) : showCreateCustomer ? (
//                       <p className="text-sm text-blue-600">New Customer (will be created)</p>
//                     ) : (
//                       <p className="text-sm text-gray-400">No customer selected</p>
//                     )}
//                   </div>
                  
//                   {/* Order Items Summary */}
//                   <div className="border-t border-gray-200 pt-3">
//                     <p className="text-xs text-gray-500 font-medium mb-2">Items ({orderItems.length})</p>
//                     <div className="max-h-60 overflow-y-auto space-y-2">
//                       {orderItems.map((item, index) => {
//                         const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
                        
//                         if (item.hasVariants && item.variantItems) {
//                           // Group variants by variantId for hierarchical display
//                           const variantGroups = {};
//                           item.variantItems.forEach(v => {
//                             const key = v.variantId || 'no-variant';
//                             if (!variantGroups[key]) variantGroups[key] = [];
//                             variantGroups[key].push(v);
//                           });

//                           return (
//                             <div key={index} className="border border-gray-100 rounded-lg p-2 bg-gray-50/50">
//                               <div className="flex items-start gap-2 mb-1.5">
//                                 <img
//                                   src={item.image || 'https://via.placeholder.com/30'}
//                                   alt={item.productName}
//                                   className="w-8 h-8 rounded object-cover border border-gray-200 flex-shrink-0"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                                 />
//                                 <div className="flex-1 min-w-0">
//                                   <p className="text-xs font-medium text-black truncate">{item.productName}</p>
//                                   <p className="text-[10px] text-gray-500">{item.variantItems.length} variants</p>
//                                 </div>
//                                 <span className="text-xs font-medium text-black whitespace-nowrap">
//                                   ৳{item.variantItems.reduce((sum, v) => {
//                                     const vPrice = v.variantDiscountPrice > 0 ? v.variantDiscountPrice : v.variantRegularPrice || v.regularPrice;
//                                     return sum + (vPrice * (v.quantity || 0));
//                                   }, 0).toFixed(2)}
//                                 </span>
//                               </div>
                              
//                               {/* Hierarchical Variant Display */}
//                               <div className="space-y-1 ml-10">
//                                 {Object.entries(variantGroups).map(([variantId, variants]) => {
//                                   // Get the parent variant (the one without subVariantId or the first one)
//                                   const parentVariant = variants.find(v => !v.isSubVariant);
//                                   // If no parent variant found, use the first variant's variantName
//                                   const parentName = parentVariant?.variantName || variants[0]?.variantName || 'Variant';
                                  
//                                   // Get sub-variants
//                                   const subVariants = variants.filter(v => v.isSubVariant);
                                  
//                                   // If there are sub-variants, show parent name with sub-variants indented
//                                   if (subVariants.length > 0) {
//                                     return (
//                                       <div key={variantId} className="space-y-0.5">
//                                         {/* Parent variant name - show actual name like "White" or "Pink" */}
//                                         <div className="text-xs font-medium text-gray-700">
//                                           {parentName}
//                                         </div>
//                                         {/* Sub-variants indented */}
//                                         <div className="space-y-0.5 ml-3">
//                                           {subVariants.map((variant, vi) => {
//                                             const vPrice = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice : variant.variantRegularPrice || variant.regularPrice;
//                                             return (
//                                               <div key={vi} className="flex items-center justify-between text-xs">
//                                                 <div className="flex items-center gap-1.5">
//                                                   <span className="text-gray-400 text-[10px]">→</span>
//                                                   <span className="text-gray-600 text-[10px]">
//                                                     {variant.subVariantName}
//                                                   </span>
//                                                   {variant.selectedColor && (
//                                                     <span className="inline-flex items-center gap-0.5">
//                                                       <Circle 
//                                                         className="w-2 h-2" 
//                                                         style={{ color: variant.selectedColor, fill: variant.selectedColor }} 
//                                                       />
//                                                     </span>
//                                                   )}
//                                                 </div>
//                                                 <div className="flex items-center gap-2">
//                                                   <span className="text-gray-500 text-[10px]">x{variant.quantity}</span>
//                                                   <span className="text-black font-medium text-[10px]">
//                                                     ৳{(vPrice * variant.quantity).toFixed(2)}
//                                                   </span>
//                                                 </div>
//                                               </div>
//                                             );
//                                           })}
//                                         </div>
//                                       </div>
//                                     );
//                                   } else {
//                                     // No sub-variants - show variants with their actual names
//                                     return variants.map((variant, vi) => {
//                                       const vPrice = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice : variant.variantRegularPrice || variant.regularPrice;
//                                       // Use variantName for display (e.g., "Powder", "Liquid")
//                                       const displayName = variant.variantName || 'Variant';
//                                       return (
//                                         <div key={vi} className="flex items-center justify-between text-xs">
//                                           <div className="flex items-center gap-1.5">
//                                             <span className="text-gray-600 text-[10px]">
//                                               {displayName}
//                                             </span>
//                                             {variant.selectedColor && (
//                                               <span className="inline-flex items-center gap-0.5">
//                                                 <Circle 
//                                                   className="w-2 h-2" 
//                                                   style={{ color: variant.selectedColor, fill: variant.selectedColor }} 
//                                                 />
//                                               </span>
//                                             )}
//                                           </div>
//                                           <div className="flex items-center gap-2">
//                                             <span className="text-gray-500 text-[10px]">x{variant.quantity}</span>
//                                             <span className="text-black font-medium text-[10px]">
//                                               ৳{(vPrice * variant.quantity).toFixed(2)}
//                                             </span>
//                                           </div>
//                                         </div>
//                                       );
//                                     });
//                                   }
//                                 })}
//                               </div>
//                             </div>
//                           );
//                         } else if (item.hasColors && item.colors) {
//                           return (
//                             <div key={index} className="border border-gray-100 rounded-lg p-2 bg-gray-50/50">
//                               <div className="flex items-start gap-2 mb-1.5">
//                                 <img
//                                   src={item.image || 'https://via.placeholder.com/30'}
//                                   alt={item.productName}
//                                   className="w-8 h-8 rounded object-cover border border-gray-200 flex-shrink-0"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                                 />
//                                 <div className="flex-1 min-w-0">
//                                   <p className="text-xs font-medium text-black truncate">{item.productName}</p>
//                                   <p className="text-[10px] text-gray-500">{item.colors.length} colors</p>
//                                 </div>
//                                 <span className="text-xs font-medium text-black whitespace-nowrap">
//                                   ৳{item.colors.reduce((sum, c) => sum + ((c.price || price) * c.quantity), 0).toFixed(2)}
//                                 </span>
//                               </div>
//                               <div className="space-y-1 ml-10">
//                                 {item.colors.map((colorInfo, ci) => (
//                                   <div key={ci} className="flex items-center justify-between text-xs">
//                                     <div className="flex items-center gap-1.5">
//                                       <div 
//                                         className="w-3 h-3 rounded-full border border-gray-200 flex-shrink-0"
//                                         style={{ backgroundColor: colorInfo.color }}
//                                       />
//                                       <span className="text-gray-600 text-[10px]">{getColorName(colorInfo.color)}</span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                       <span className="text-gray-500 text-[10px]">x{colorInfo.quantity}</span>
//                                       <span className="text-black font-medium text-[10px]">
//                                         ৳{((colorInfo.price || price) * colorInfo.quantity).toFixed(2)}
//                                       </span>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           );
//                         } else {
//                           return (
//                             <div key={index} className="flex items-center justify-between text-xs p-2 border border-gray-100 rounded-lg bg-gray-50/50">
//                               <div className="flex items-center gap-2">
//                                 <img
//                                   src={item.image || 'https://via.placeholder.com/30'}
//                                   alt={item.productName}
//                                   className="w-6 h-6 rounded object-cover border border-gray-200 flex-shrink-0"
//                                   onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
//                                 />
//                                 <span className="text-gray-700 truncate max-w-[120px]">{item.productName}</span>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <span className="text-gray-500">x{item.totalQuantity}</span>
//                                 <span className="text-black font-medium">৳{(price * item.totalQuantity).toFixed(2)}</span>
//                               </div>
//                             </div>
//                           );
//                         }
//                       })}
//                     </div>
//                   </div>
                  
//                   {/* Totals */}
//                   <div className="border-t border-gray-200 pt-3 space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Subtotal</span>
//                       <span className="text-black">৳{calculateSubtotal().toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Shipping</span>
//                       <span className="text-green-600">৳{shippingCost.toFixed(2)}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                       <input
//                         type="text"
//                         inputMode="decimal"
//                         value={discount === 0 ? '' : discount}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           if (value === '' || /^\d*\.?\d*$/.test(value)) {
//                             if (value === '') {
//                               setDiscount(0);
//                             } else {
//                               const numValue = parseFloat(value);
//                               if (!isNaN(numValue) && numValue >= 0) {
//                                 setDiscount(numValue);
//                               }
//                             }
//                           }
//                         }}
//                         className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                         placeholder="Discount amount"
//                       />
//                     </div>
//                     {discount > 0 && (
//                       <div className="flex justify-between text-sm text-green-600">
//                         <span>Discount Applied</span>
//                         <span>- ৳{discount.toFixed(2)}</span>
//                       </div>
//                     )}
                    
//                     <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
//                       <span className="text-black">Total</span>
//                       <span className="text-black">৳{calculateTotal().toFixed(2)}</span>
//                     </div>
//                   </div>
                  
//                   {/* Order Note */}
//                   <div className="border-t border-gray-200 pt-3">
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Order Note
//                     </label>
//                     <textarea
//                       value={orderForm.note}
//                       onChange={(e) => setOrderForm(prev => ({ ...prev, note: e.target.value }))}
//                       rows="2"
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
//                       placeholder="Special instructions for this order..."
//                     />
//                   </div>
                  
//                   {/* Place Order Button */}
//                   <button
//                     onClick={handlePlaceOrder}
//                     disabled={submitting || orderItems.length === 0}
//                     className="w-full py-3 bg-[#718369] text-white rounded-lg hover:bg-[#5b6b54] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {submitting ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Placing Order...
//                       </>
//                     ) : (
//                       <>
//                         <Zap className="w-4 h-4" />
//                         Place Order
//                       </>
//                     )}
//                   </button>
                  
//                   {orderItems.length === 0 && (
//                     <p className="text-xs text-orange-500 text-center">
//                       Please add at least one product
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// app/authorize/create-order/page.js
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  UserPlus,
  Users,
  Package,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  User,
  X,
  Plus,
  Minus,
  Trash2,
  Save,
  Check,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Tag,
  Building2,
  Globe,
  Home,
  CreditCard,
  Truck,
  Zap,
  Eye,
  Edit2,
  UserCheck,
  Sparkles,
  ArrowLeft,
  Calendar,
  Clock,
  Scale,
  Palette,
  Box,
  EyeOff,
  Smartphone,
  Lock,
  RefreshCw,
  Layers,
  Circle,
  Grid
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ========== HELPER FUNCTIONS ==========
const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

const getColorName = (color) => {
  const colorMap = {
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#FF0000': 'Red',
    '#00FF00': 'Green',
    '#0000FF': 'Blue',
    '#FFFF00': 'Yellow',
    '#FF00FF': 'Magenta',
    '#00FFFF': 'Cyan',
    '#FFA500': 'Orange',
    '#800080': 'Purple',
    '#008000': 'Dark Green',
    '#FFC0CB': 'Pink',
    '#A52A2A': 'Brown',
    '#808080': 'Gray',
    '#C0C0C0': 'Silver',
    '#4A90E2': 'Blue',
    '#FF6B6B': 'Red',
    '#4ECDC4': 'Teal',
    '#45B7D1': 'Sky Blue',
    '#96CEB4': 'Mint',
    '#FFEAA7': 'Cream',
    '#DDA0DD': 'Plum',
    '#98D8C8': 'Seafoam',
    '#F7DC6F': 'Gold',
    '#BB8FCE': 'Lavender'
  };
  return colorMap[color] || color;
};

// ========== MAIN COMPONENT ==========
export default function ManualOrderCreate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // ========== LOCATION DATA ==========
  const [locationData, setLocationData] = useState({});
  const [divisions, setDivisions] = useState({});
  const [divisionList, setDivisionList] = useState([]);
  const [citiesByDivision, setCitiesByDivision] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);
  const [shippingCost, setShippingCost] = useState(0);
  
  // ========== CUSTOMER SEARCH ==========
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [customerSearchResults, setCustomerSearchResults] = useState([]);
  const [searchingCustomers, setSearchingCustomers] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  
  // ========== PRODUCT SEARCH ==========
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [productSearchResults, setProductSearchResults] = useState([]);
  const [searchingProducts, setSearchingProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColorsWithQty, setSelectedColorsWithQty] = useState([]);
  const [addQuantity, setAddQuantity] = useState(1);
  const [showAddProduct, setShowAddProduct] = useState(false);
  
  // ========== VARIANT STATE ==========
  const [selectedVariantsWithQty, setSelectedVariantsWithQty] = useState([]);
  
  // ========== ORDER ITEMS ==========
  const [orderItems, setOrderItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountNote, setDiscountNote] = useState('');
  const [orderNote, setOrderNote] = useState('');
  
  // ========== EXPANDED SECTIONS FOR ORDER ITEMS ==========
  const [expandedOrderItems, setExpandedOrderItems] = useState({});
  
  // ========== CREATE CUSTOMER FORM ==========
  const [createForm, setCreateForm] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    subscribeToNewsletter: false
  });
  
  const [createFormErrors, setCreateFormErrors] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // ========== ORDER FORM ==========
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    division: '',
    address: '',
    city: '',
    zone: '',
    area: '',
    zipCode: '',
    country: 'Bangladesh',
    note: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  // ========== UI STATE ==========
  const [expandedSections, setExpandedSections] = useState({
    customer: true,
    products: true,
    address: true,
    summary: true
  });
  
  const [quantityInputs, setQuantityInputs] = useState({});
  const [addQuantityInput, setAddQuantityInput] = useState(null);
  const [itemQuantityInputs, setItemQuantityInputs] = useState({});

  // ========== FETCH LOCATIONS ==========
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        const data = await response.json();
        setLocationData(data.locationData || {});
        
        const divisions = data.divisions || {};
        const filteredDivisions = {};
        const divisionKeys = [];
        
        Object.keys(divisions).forEach(key => {
          if (key !== 'Other') {
            filteredDivisions[key] = divisions[key];
            divisionKeys.push(key);
          }
        });
        
        setDivisions(filteredDivisions);
        setDivisionList(divisionKeys.sort());
        setLocationLoading(false);
      } catch (error) {
        console.error('Failed to load location data:', error);
        setLocationLoading(false);
      }
    };
    fetchLocations();
  }, []);
  
  // ========== UPDATE CITIES WHEN DIVISION CHANGES ==========
  useEffect(() => {
    if (orderForm.division && divisions[orderForm.division]) {
      setCitiesByDivision(divisions[orderForm.division]);
      setOrderForm(prev => ({ ...prev, city: '' }));
    } else {
      setCitiesByDivision([]);
    }
  }, [orderForm.division, divisions]);
  
  // ========== CALCULATE SHIPPING ==========
  const calculateShipping = useCallback(async (city) => {
    if (!city) {
      setShippingCost(0);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/delivery/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city })
      });
      const data = await response.json();
      if (data.success) {
        setShippingCost(data.data.charge || 0);
        return data.data.charge || 0;
      }
      setShippingCost(0);
      return 0;
    } catch (error) {
      console.error('Error calculating shipping:', error);
      setShippingCost(0);
      return 0;
    }
  }, []);
  
  // ========== RECALCULATE SHIPPING ON CITY CHANGE ==========
  useEffect(() => {
    if (orderForm.city) {
      calculateShipping(orderForm.city);
    }
  }, [orderForm.city, calculateShipping]);
  
  // ========== SEARCH CUSTOMERS ==========
  const searchCustomers = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setCustomerSearchResults([]);
      return;
    }
    
    setSearchingCustomers(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/auth/admin/customers?search=${encodeURIComponent(query)}&limit=10`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data.success) {
        setCustomerSearchResults(data.customers || []);
      } else {
        setCustomerSearchResults([]);
      }
    } catch (error) {
      console.error('Search customers error:', error);
      setCustomerSearchResults([]);
    } finally {
      setSearchingCustomers(false);
    }
  }, []);
  
  // Debounced customer search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (customerSearchQuery) {
        searchCustomers(customerSearchQuery);
      } else {
        setCustomerSearchResults([]);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [customerSearchQuery, searchCustomers]);
  
  // ========== SEARCH PRODUCTS ==========
  const searchProducts = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setProductSearchResults([]);
      return;
    }
    
    setSearchingProducts(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/orders/search-products?query=${encodeURIComponent(query)}&limit=10`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data.success) {
        setProductSearchResults(data.data || []);
      } else {
        setProductSearchResults([]);
      }
    } catch (error) {
      console.error('Search products error:', error);
      setProductSearchResults([]);
    } finally {
      setSearchingProducts(false);
    }
  }, []);
  
  // Debounced product search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (productSearchQuery) {
        searchProducts(productSearchQuery);
      } else {
        setProductSearchResults([]);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [productSearchQuery, searchProducts]);
  
  // ========== SELECT CUSTOMER ==========
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomerSearchQuery(customer.contactPerson || customer.email);
    setCustomerSearchResults([]);
    
    setOrderForm({
      fullName: customer.contactPerson || '',
      email: customer.email || '',
      phone: customer.phone || '',
      division: customer.division || '',
      address: customer.address || '',
      city: customer.city || '',
      zone: customer.zone || '',
      area: customer.area || '',
      zipCode: customer.zipCode || '',
      country: customer.country || 'Bangladesh',
      note: ''
    });
    
    if (customer.city) {
      calculateShipping(customer.city);
    }
  };
  
  // ========== SELECT PRODUCT - FETCH FULL DETAILS ==========
  const handleSelectProduct = async (product) => {
    setProductSearchResults([]);
    setProductSearchQuery(product.productName);
    setSelectedColorsWithQty([]);
    setAddQuantity(1);
    setAddQuantityInput(null);
    setSelectedVariantsWithQty([]);

    try {
      const response = await fetch(`http://localhost:5000/api/products/${product._id}`);
      const data = await response.json();
      if (data.success) {
        setSelectedProduct(data.data.product);
      } else {
        setSelectedProduct(product);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      setSelectedProduct(product);
    }
  };
  
  // ========== VARIANT FUNCTIONS ==========
  const toggleVariantSelection = (variantType, variant) => {
    const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
    
    // If variant has sub-variants, automatically select the first one
    if (hasSubVariants) {
      const firstSubVariant = variant.subVariants[0];
      // Check if already selected
      const exists = selectedVariantsWithQty.find(
        v => v.variantId === variant.id && v.subVariantId === firstSubVariant.id
      );
      if (exists) {
        // Remove if already selected
        setSelectedVariantsWithQty(prev => 
          prev.filter(v => !(v.variantId === variant.id && v.subVariantId === firstSubVariant.id))
        );
      } else {
        // Add the first sub-variant - Store the actual variant name
        setSelectedVariantsWithQty(prev => [...prev, {
          variantId: variant.id,
          variantName: variant.name,
          variantType: variantType.type,
          subVariantId: firstSubVariant.id,
          subVariantName: firstSubVariant.name,
          regularPrice: firstSubVariant.regularPrice || 0,
          discountPrice: firstSubVariant.discountPrice || 0,
          image: firstSubVariant.images?.[0] || variant.images?.[0] || '',
          stockQuantity: firstSubVariant.stockQuantity || variant.stockQuantity || 0,
          quantity: 1
        }]);
      }
      return;
    }
    
    // Regular variant without sub-variants
    setSelectedVariantsWithQty(prev => {
      const exists = prev.find(v => v.variantId === variant.id && !v.subVariantId);
      if (exists) {
        return prev.filter(v => !(v.variantId === variant.id && !v.subVariantId));
      }
      return [...prev, {
        variantId: variant.id,
        variantName: variant.name,
        variantType: variantType.type,
        subVariantId: null,
        subVariantName: null,
        regularPrice: variant.regularPrice || 0,
        discountPrice: variant.discountPrice || 0,
        image: variant.images?.[0] || '',
        stockQuantity: variant.stockQuantity || 0,
        quantity: 1
      }];
    });
  };

  const toggleSubVariantSelection = (variantType, variant, subVariant) => {
    setSelectedVariantsWithQty(prev => {
      const exists = prev.find(v => v.variantId === variant.id && v.subVariantId === subVariant.id);
      if (exists) {
        return prev.filter(v => !(v.variantId === variant.id && v.subVariantId === subVariant.id));
      }
      return [...prev, {
        variantId: variant.id,
        variantName: variant.name,
        variantType: variantType.type,
        subVariantId: subVariant.id,
        subVariantName: subVariant.name,
        regularPrice: subVariant.regularPrice || 0,
        discountPrice: subVariant.discountPrice || 0,
        image: subVariant.images?.[0] || '',
        stockQuantity: subVariant.stockQuantity || 0,
        quantity: 1
      }];
    });
  };

  const updateVariantQty = (variantId, subVariantId, newQty) => {
    // If newQty is empty string, keep it as empty string for the input
    if (newQty === '') {
      setSelectedVariantsWithQty(prev => prev.map(v => {
        if (v.variantId === variantId && v.subVariantId === subVariantId) {
          return { ...v, quantity: '' };
        }
        return v;
      }));
      return;
    }
    
    // If newQty is a string number, convert to number
    const qty = typeof newQty === 'string' ? parseInt(newQty) : newQty;
    
    // Validate
    if (isNaN(qty) || qty < 1) return;
    
    setSelectedVariantsWithQty(prev => prev.map(v => {
      // Match by both variantId AND subVariantId (or null)
      if (v.variantId === variantId && v.subVariantId === subVariantId) {
        const max = v.stockQuantity || 999;
        return { ...v, quantity: Math.min(qty, max) };
      }
      return v;
    }));
  };

  const isVariantSelectionComplete = () => {
    if (!selectedProduct || !selectedProduct.hasVariants) return true;
    if (selectedVariantsWithQty.length === 0) return false;
    
    for (const v of selectedVariantsWithQty) {
      if (v.quantity < 1) return false;
    }
    return true;
  };

  const getTotalVariantQuantity = () => {
    return selectedVariantsWithQty.reduce((sum, v) => sum + v.quantity, 0);
  };

  const getTotalVariantPrice = () => {
    return selectedVariantsWithQty.reduce((sum, v) => {
      const price = v.discountPrice > 0 ? v.discountPrice : v.regularPrice;
      return sum + (price * v.quantity);
    }, 0);
  };

  // ========== COLOR FUNCTIONS ==========
  const toggleColorSelection = (color) => {
    setSelectedColorsWithQty(prev => {
      const exists = prev.find(c => c.color === color);
      if (exists) return prev.filter(c => c.color !== color);
      return [...prev, { color, quantity: 1 }];
    });
  };

  const updateSelectedColorQuantity = (color, newQuantity) => {
    if (newQuantity < 1) return;
    setSelectedColorsWithQty(prev =>
      prev.map(c =>
        c.color === color ? { ...c, quantity: newQuantity } : c
      )
    );
  };

  // ========== ADD VARIANT TO EXISTING ORDER ITEM ==========
  const addVariantToExistingItem = async (productId, variant, variantTypeName) => {
    // Find the existing item in order
    const existingItemIndex = orderItems.findIndex(
      item => item.productId === productId && item.hasVariants
    );
    
    if (existingItemIndex === -1) {
      toast.error('Product not found in order');
      return;
    }

    const existingItem = orderItems[existingItemIndex];
    
    // Check if variant already exists
    const variantExists = existingItem.variantItems.some(v => 
      v.variantId === variant.id && !v.subVariantId
    );
    
    if (variantExists) {
      toast.info('Variant already added');
      return;
    }

    const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;
    
    // If variant has sub-variants, automatically add the first one
    if (hasSubVariants) {
      const firstSubVariant = variant.subVariants[0];
      // Check if sub-variant already exists
      const subVariantExists = existingItem.variantItems.some(v => 
        v.variantId === variant.id && v.subVariantId === firstSubVariant.id
      );
      
      if (subVariantExists) {
        toast.info('Sub-variant already added');
        return;
      }

      // Add the first sub-variant with the parent variant name
      const newSubVariant = {
        productId: productId,
        productName: existingItem.productName,
        productSlug: existingItem.productSlug,
        image: existingItem.image || '',
        regularPrice: existingItem.regularPrice,
        discountPrice: existingItem.discountPrice || 0,
        stockQuantity: existingItem.stockQuantity,
        unit: existingItem.unit || 'pcs',
        variantId: variant.id,
        variantName: variant.name,
        variantType: variantTypeName || 'Variant',
        subVariantId: firstSubVariant.id,
        subVariantName: firstSubVariant.name,
        variantRegularPrice: firstSubVariant.regularPrice || 0,
        variantDiscountPrice: firstSubVariant.discountPrice || 0,
        variantImage: firstSubVariant.images?.[0] || variant.images?.[0] || '',
        selectedColor: firstSubVariant.color || null,
        quantity: 1,
        totalQuantity: 1,
        isSubVariant: true,
        isVariant: true,
        isBaseProduct: false
      };

      setOrderItems(prev => {
        const newItems = [...prev];
        const updatedVariants = [...newItems[existingItemIndex].variantItems, newSubVariant];
        const totalQty = updatedVariants.reduce((sum, v) => sum + (v.totalQuantity || v.quantity || 0), 0);
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          variantItems: updatedVariants,
          totalQuantity: totalQty
        };
        return newItems;
      });

      toast.success(`Added ${firstSubVariant.name} (${variant.name}) to ${existingItem.productName}`);
      return;
    }

    // Regular variant without sub-variants
    const newVariant = {
      productId: productId,
      productName: existingItem.productName,
      productSlug: existingItem.productSlug,
      image: existingItem.image || '',
      regularPrice: existingItem.regularPrice,
      discountPrice: existingItem.discountPrice || 0,
      stockQuantity: existingItem.stockQuantity,
      unit: existingItem.unit || 'pcs',
      variantId: variant.id,
      variantName: variant.name,
      variantType: variantTypeName || 'Variant',
      subVariantId: null,
      subVariantName: null,
      variantRegularPrice: variant.regularPrice || 0,
      variantDiscountPrice: variant.discountPrice || 0,
      variantImage: variant.images?.[0] || '',
      selectedColor: null,
      quantity: 1,
      totalQuantity: 1,
      isSubVariant: false,
      isVariant: true,
      isBaseProduct: false
    };

    setOrderItems(prev => {
      const newItems = [...prev];
      const updatedVariants = [...newItems[existingItemIndex].variantItems, newVariant];
      const totalQty = updatedVariants.reduce((sum, v) => sum + (v.totalQuantity || v.quantity || 0), 0);
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        variantItems: updatedVariants,
        totalQuantity: totalQty
      };
      return newItems;
    });

    toast.success(`Added ${variant.name} to ${existingItem.productName}`);
  };

  // ========== ADD SUB-VARIANT TO EXISTING ORDER ITEM ==========
  const addSubVariantToExistingItem = async (productId, variantId, subVariant, parentVariantName, variantTypeName) => {
    const existingItemIndex = orderItems.findIndex(
      item => item.productId === productId && item.hasVariants
    );
    
    if (existingItemIndex === -1) {
      toast.error('Product not found in order');
      return;
    }

    const existingItem = orderItems[existingItemIndex];
    
    // Check if sub-variant already exists
    const subVariantExists = existingItem.variantItems.some(v => 
      v.variantId === variantId && v.subVariantId === subVariant.id
    );
    
    if (subVariantExists) {
      toast.info('Sub-variant already added');
      return;
    }

    // Add the sub-variant with the parent variant name
    const newSubVariant = {
      productId: productId,
      productName: existingItem.productName,
      productSlug: existingItem.productSlug,
      image: existingItem.image || '',
      regularPrice: existingItem.regularPrice,
      discountPrice: existingItem.discountPrice || 0,
      stockQuantity: existingItem.stockQuantity,
      unit: existingItem.unit || 'pcs',
      variantId: variantId,
      variantName: parentVariantName,
      variantType: variantTypeName || 'Variant',
      subVariantId: subVariant.id,
      subVariantName: subVariant.name,
      variantRegularPrice: subVariant.regularPrice || 0,
      variantDiscountPrice: subVariant.discountPrice || 0,
      variantImage: subVariant.images?.[0] || '',
      selectedColor: subVariant.color || null,
      quantity: 1,
      totalQuantity: 1,
      isSubVariant: true,
      isVariant: true,
      isBaseProduct: false
    };

    setOrderItems(prev => {
      const newItems = [...prev];
      const updatedVariants = [...newItems[existingItemIndex].variantItems, newSubVariant];
      const totalQty = updatedVariants.reduce((sum, v) => sum + (v.totalQuantity || v.quantity || 0), 0);
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        variantItems: updatedVariants,
        totalQuantity: totalQty
      };
      return newItems;
    });

    toast.success(`Added ${subVariant.name} to ${existingItem.productName}`);
  };

  // ========== UPDATE VARIANT QUANTITY IN ORDER (by identity) ==========
  const updateVariantQuantityInOrder = (itemIndex, variantId, subVariantId, newQuantity) => {
    const item = orderItems[itemIndex];
    const variant = item.variantItems.find(v => v.variantId === variantId && v.subVariantId === subVariantId);
    if (!variant) return;

    if (newQuantity < 1) {
      setOrderItems(prev => {
        const newItems = [...prev];
        const it = newItems[itemIndex];
        const updatedVariants = it.variantItems.filter(v => !(v.variantId === variantId && v.subVariantId === subVariantId));
        const totalQty = updatedVariants.reduce((sum, v) => sum + (v.quantity || 0), 0);
        newItems[itemIndex] = { ...it, variantItems: updatedVariants, totalQuantity: totalQty };
        if (updatedVariants.length === 0) newItems.splice(itemIndex, 1);
        return newItems;
      });
      return;
    }

    if (newQuantity > variant.stockQuantity) {
      toast.warning(`Only ${variant.stockQuantity} item(s) available`);
      return;
    }

    setOrderItems(prev => {
      const newItems = [...prev];
      const it = newItems[itemIndex];
      const updatedVariants = it.variantItems.map(v =>
        (v.variantId === variantId && v.subVariantId === subVariantId)
          ? { ...v, quantity: newQuantity, totalQuantity: newQuantity }
          : v
      );
      const totalQty = updatedVariants.reduce((sum, v) => sum + (v.quantity || 0), 0);
      newItems[itemIndex] = { ...it, variantItems: updatedVariants, totalQuantity: totalQty };
      return newItems;
    });
  };

  // ========== ADD PRODUCT TO ORDER ==========
  const handleAddProductToOrder = () => {
    if (!selectedProduct) {
      toast.error('Please select a product');
      return;
    }
    
    const hasColors = selectedProduct.colors && selectedProduct.colors.length > 0;
    const hasVariants = selectedProduct.hasVariants && 
                        selectedProduct.variantTypes && 
                        selectedProduct.variantTypes.length > 0;
    
    // ========== VALIDATE VARIANTS ==========
    if (hasVariants) {
      if (selectedVariantsWithQty.length === 0) {
        toast.error('Please select at least one variant');
        return;
      }
      if (!isVariantSelectionComplete()) {
        toast.error('Please set quantity for all selected variants');
        return;
      }
    }
    
    // ========== VALIDATE COLORS ==========
    if (hasColors && selectedColorsWithQty.length === 0 && !hasVariants) {
      toast.error('Please select at least one color with quantity');
      return;
    }
    
    let productSlug = selectedProduct.slug;
    if (!productSlug && selectedProduct.productName) {
      productSlug = selectedProduct.productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    if (!productSlug) {
      productSlug = 'unknown-product';
    }
    
    // ========== HANDLE VARIANTS ==========
    if (hasVariants) {
      const variantItems = selectedVariantsWithQty.map(v => ({
        productId: selectedProduct._id,
        productName: selectedProduct.productName,
        productSlug: productSlug,
        image: v.image || selectedProduct.images?.[0]?.url || '',
        regularPrice: selectedProduct.regularPrice,
        discountPrice: selectedProduct.discountPrice || 0,
        stockQuantity: v.stockQuantity || selectedProduct.stockQuantity,
        unit: selectedProduct.unit || 'pcs',
        variantId: v.variantId,
        variantName: v.variantName || 'Variant',
        variantType: v.variantType,
        subVariantId: v.subVariantId,
        subVariantName: v.subVariantName,
        variantRegularPrice: v.regularPrice || 0,
        variantDiscountPrice: v.discountPrice || 0,
        variantImage: v.image || '',
        selectedColor: null,
        quantity: v.quantity || 1,
        totalQuantity: v.quantity || 1,
        isSubVariant: !!v.subVariantId,
        isVariant: true,
        isBaseProduct: false
      }));
      
      // Check if product already exists in order
      const existingItemIndex = orderItems.findIndex(
        item => item.productId === selectedProduct._id && item.hasVariants
      );
      
      if (existingItemIndex !== -1) {
        // Merge with existing variants
        const existing = orderItems[existingItemIndex];
        const existingVariants = existing.variantItems || [];
        const mergedVariants = [...existingVariants];
        
        variantItems.forEach(newVariant => {
          const existingIndex = mergedVariants.findIndex(v => 
            v.variantId === newVariant.variantId && 
            v.subVariantId === newVariant.subVariantId
          );
          if (existingIndex !== -1) {
            mergedVariants[existingIndex].quantity += newVariant.quantity;
            mergedVariants[existingIndex].totalQuantity += newVariant.quantity;
          } else {
            mergedVariants.push(newVariant);
          }
        });
        
        const totalQty = mergedVariants.reduce((sum, v) => sum + (v.totalQuantity || v.quantity || 0), 0);
        setOrderItems(prev => {
          const newItems = [...prev];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            variantItems: mergedVariants,
            totalQuantity: totalQty,
            hasVariants: true,
            variantTypes: selectedProduct.variantTypes || []
          };
          return newItems;
        });
      } else {
        const totalQty = variantItems.reduce((sum, v) => sum + (v.totalQuantity || v.quantity || 0), 0);
        setOrderItems(prev => [...prev, {
          productId: selectedProduct._id,
          productName: selectedProduct.productName,
          productSlug: productSlug,
          image: selectedProduct.images?.[0]?.url || '',
          regularPrice: selectedProduct.regularPrice,
          discountPrice: selectedProduct.discountPrice || 0,
          stockQuantity: selectedProduct.stockQuantity,
          unit: selectedProduct.unit || 'pcs',
          variantItems: variantItems,
          totalQuantity: totalQty,
          hasVariants: true,
          hasColors: false,
          variantTypes: selectedProduct.variantTypes || []
        }]);
      }
      
      toast.success(`Added ${variantItems.length} variant(s) of ${selectedProduct.productName}`);
      resetProductSelection();
      return;
    }
    
    // ========== HANDLE COLORS ==========
    if (hasColors) {
      const newItem = {
        productId: selectedProduct._id,
        productName: selectedProduct.productName,
        productSlug: productSlug,
        image: selectedProduct.images?.[0]?.url || '',
        regularPrice: selectedProduct.regularPrice,
        discountPrice: selectedProduct.discountPrice || 0,
        stockQuantity: selectedProduct.stockQuantity,
        unit: selectedProduct.unit || 'pcs',
        colors: selectedColorsWithQty.map(c => ({
          color: c.color,
          quantity: Number(c.quantity || 0),
          price: selectedProduct.discountPrice > 0 ? selectedProduct.discountPrice : selectedProduct.regularPrice
        })),
        totalQuantity: selectedColorsWithQty.reduce((sum, c) => sum + Number(c.quantity || 0), 0),
        selectedColors: selectedColorsWithQty.map(c => c.color),
        hasVariants: false,
        hasColors: true
      };
      
      const existingItemIndex = orderItems.findIndex(
        item => item.productId === selectedProduct._id && !item.hasVariants
      );
      
      if (existingItemIndex !== -1) {
        const existing = orderItems[existingItemIndex];
        const existingColors = existing.colors || [];
        const mergedColors = [...existingColors];
        
        newItem.colors.forEach(newColor => {
          const existingColorIndex = mergedColors.findIndex(c => c.color === newColor.color);
          if (existingColorIndex !== -1) {
            mergedColors[existingColorIndex].quantity += newColor.quantity;
          } else {
            mergedColors.push(newColor);
          }
        });
        
        const updatedItem = {
          ...existing,
          colors: mergedColors,
          totalQuantity: mergedColors.reduce((sum, c) => sum + c.quantity, 0),
          selectedColors: mergedColors.map(c => c.color)
        };
        
        setOrderItems(prev => {
          const newItems = [...prev];
          newItems[existingItemIndex] = updatedItem;
          return newItems;
        });
      } else {
        setOrderItems(prev => [...prev, newItem]);
      }
      
      toast.success(`Added ${selectedProduct.productName} to order`);
      resetProductSelection();
      return;
    }
    
    // ========== HANDLE PLAIN PRODUCT (No Colors, No Variants) ==========
    const newItem = {
      productId: selectedProduct._id,
      productName: selectedProduct.productName,
      productSlug: productSlug,
      image: selectedProduct.images?.[0]?.url || '',
      regularPrice: selectedProduct.regularPrice,
      discountPrice: selectedProduct.discountPrice || 0,
      stockQuantity: selectedProduct.stockQuantity,
      unit: selectedProduct.unit || 'pcs',
      totalQuantity: addQuantity || 1,
      hasVariants: false,
      hasColors: false,
      colors: []
    };
    
    const existingItemIndex = orderItems.findIndex(
      item => item.productId === selectedProduct._id && !item.hasVariants && !item.hasColors
    );
    
    if (existingItemIndex !== -1) {
      const existing = orderItems[existingItemIndex];
      const newQty = existing.totalQuantity + (addQuantity || 1);
      if (newQty > selectedProduct.stockQuantity) {
        toast.error(`Only ${selectedProduct.stockQuantity} items available`);
        return;
      }
      setOrderItems(prev => {
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          totalQuantity: newQty
        };
        return newItems;
      });
    } else {
      setOrderItems(prev => [...prev, newItem]);
    }
    
    toast.success(`Added ${selectedProduct.productName} to order`);
    resetProductSelection();
  };
  
  const resetProductSelection = () => {
    setShowAddProduct(false);
    setSelectedProduct(null);
    setProductSearchQuery('');
    setProductSearchResults([]);
    setSelectedColorsWithQty([]);
    setAddQuantity(1);
    setAddQuantityInput(null);
    setSelectedVariantsWithQty([]);
    setQuantityInputs({});
  };
  
  // ========== REMOVE ITEM FROM ORDER ==========
  const removeItemFromOrder = (index) => {
    const item = orderItems[index];
    setOrderItems(prev => prev.filter((_, i) => i !== index));
    toast.success(`Removed ${item.productName} from order`);
  };
  
  // ========== UPDATE ITEM QUANTITY ==========
  const updateItemQuantity = (index, newQuantity) => {
    const item = orderItems[index];
    
    if (newQuantity < 1) {
      removeItemFromOrder(index);
      return;
    }
    
    if (newQuantity > item.stockQuantity) {
      toast.warning(`Only ${item.stockQuantity} item(s) available in stock`);
      return;
    }
    
    setOrderItems(prev => {
      const newItems = [...prev];
      newItems[index] = {
        ...newItems[index],
        totalQuantity: newQuantity
      };
      return newItems;
    });
  };
  
  // ========== UPDATE COLOR QUANTITY IN ORDER ==========
  const updateColorQuantityInOrder = (itemIndex, color, newQuantity) => {
    if (newQuantity < 1) {
      setOrderItems(prev => {
        const newItems = [...prev];
        const item = newItems[itemIndex];
        const updatedColors = item.colors.filter(c => c.color !== color);
        const totalQty = updatedColors.reduce((sum, c) => sum + c.quantity, 0);
        newItems[itemIndex] = {
          ...item,
          colors: updatedColors,
          totalQuantity: totalQty,
          selectedColors: updatedColors.map(c => c.color)
        };
        if (updatedColors.length === 0) {
          newItems.splice(itemIndex, 1);
        }
        return newItems;
      });
      return;
    }
    
    const item = orderItems[itemIndex];
    const totalOtherColors = item.colors
      .filter(c => c.color !== color)
      .reduce((sum, c) => sum + c.quantity, 0);
    
    if (totalOtherColors + newQuantity > item.stockQuantity) {
      toast.warning(`Only ${item.stockQuantity - totalOtherColors} more items available for this color`);
      return;
    }
    
    setOrderItems(prev => {
      const newItems = [...prev];
      const updatedColors = newItems[itemIndex].colors.map(c =>
        c.color === color ? { ...c, quantity: newQuantity } : c
      );
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        colors: updatedColors,
        totalQuantity: updatedColors.reduce((sum, c) => sum + c.quantity, 0)
      };
      return newItems;
    });
  };
  
  // ========== TOGGLE ORDER ITEM EXPAND ==========
  const toggleOrderItemExpand = (productId) => {
    setExpandedOrderItems(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };
  
  // ========== GET AVAILABLE VARIANTS FOR ORDER ITEM ==========
  const getAvailableVariantsForItem = (orderItem) => {
    if (!orderItem.variantTypes || orderItem.variantTypes.length === 0) return [];
    
    const cartVariantIds = orderItem.variantItems
      .map(item => item.variantId)
      .filter(id => id);
    
    const available = [];
    orderItem.variantTypes.forEach(vt => {
      vt.variants.forEach(v => {
        if (!cartVariantIds.includes(v.id)) {
          available.push({ ...v, type: vt.type });
        }
      });
    });
    return available;
  };

  // ========== GET AVAILABLE SUB-VARIANTS FOR ORDER ITEM ==========
  const getAvailableSubVariantsForItem = (orderItem, variantId) => {
    if (!orderItem.variantTypes) return [];
    
    let targetVariant = null;
    orderItem.variantTypes.forEach(vt => {
      vt.variants.forEach(v => {
        if (v.id === variantId) {
          targetVariant = v;
        }
      });
    });
    
    if (!targetVariant || !targetVariant.subVariants) return [];
    
    const cartSubVariantIds = orderItem.variantItems
      .filter(item => item.variantId === variantId && item.subVariantId)
      .map(item => item.subVariantId)
      .filter(id => id && id !== 'null' && id !== '');
    
    return targetVariant.subVariants.filter(sv => !cartSubVariantIds.includes(sv.id));
  };

  // ========== CHECK IF VARIANT HAS SUB-VARIANTS ==========
  const variantHasSubVariants = (variantId, orderItem) => {
    if (!orderItem.variantTypes) return false;
    
    for (const vt of orderItem.variantTypes) {
      for (const v of vt.variants || []) {
        if (v.id === variantId && v.subVariants && v.subVariants.length > 0) {
          return true;
        }
      }
    }
    return false;
  };
  
  // ========== CALCULATE SUBTOTAL ==========
  const calculateSubtotal = useCallback(() => {
    let subtotal = 0;
    orderItems.forEach(item => {
      if (item.hasVariants && item.variantItems) {
        item.variantItems.forEach(variant => {
          const price = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice : variant.variantRegularPrice || variant.regularPrice;
          subtotal += price * (variant.quantity || 0);
        });
      } else if (item.hasColors && item.colors) {
        item.colors.forEach(color => {
          const price = color.price || item.discountPrice || item.regularPrice;
          subtotal += price * (color.quantity || 0);
        });
      } else {
        const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
        subtotal += price * (item.totalQuantity || 0);
      }
    });
    return subtotal;
  }, [orderItems]);
  
  // ========== CALCULATE TOTAL ==========
  const calculateTotal = useCallback(() => {
    return calculateSubtotal() + shippingCost - (discount || 0);
  }, [calculateSubtotal, shippingCost, discount]);
  
  // ========== VALIDATE CREATE CUSTOMER FORM ==========
  const validateCreateCustomerForm = () => {
    const errors = {};
    
    if (!createForm.contactPerson?.trim()) {
      errors.contactPerson = 'Contact person is required';
    }
    if (!createForm.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(createForm.email)) {
      errors.email = 'Email is invalid';
    }
    if (!createForm.phone?.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!createForm.country?.trim()) {
      errors.country = 'Country is required';
    }
    if (!createForm.address?.trim()) {
      errors.address = 'Address is required';
    }
    if (!createForm.city?.trim()) {
      errors.city = 'City is required';
    }
    if (!createForm.zipCode?.trim()) {
      errors.zipCode = 'ZIP Code is required';
    }
    if (!createForm.password) {
      errors.password = 'Password is required';
    } else if (createForm.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (createForm.password !== createForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setCreateFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // ========== CREATE CUSTOMER ==========
  const handleCreateCustomer = async () => {
    if (!validateCreateCustomerForm()) {
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    
    setIsCreating(true);
    const loadingToast = toast.loading('Creating customer account...');
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/auth/admin/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactPerson: createForm.contactPerson,
          email: createForm.email,
          phone: createForm.phone,
          whatsapp: createForm.whatsapp || '',
          country: createForm.country,
          address: createForm.address,
          city: createForm.city,
          zipCode: createForm.zipCode,
          password: createForm.password
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success('Customer Created Successfully!');
        setCreateForm({
          contactPerson: '',
          email: '',
          phone: '',
          whatsapp: '',
          country: '',
          address: '',
          city: '',
          zipCode: '',
          password: '',
          confirmPassword: '',
          subscribeToNewsletter: false
        });
        setCreateFormErrors({});
        setShowCreateCustomer(false);
        setIsCreating(false);
        return data.user || data.data;
      } else {
        toast.error(data.error || 'Creation Failed');
        setIsCreating(false);
        return null;
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error');
      setIsCreating(false);
      return null;
    }
  };
  
  // ========== HANDLE CREATE FORM CHANGES ==========
  const handleCreateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (createFormErrors[name]) {
      setCreateFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // ========== VALIDATE ORDER FORM ==========
  const validateOrderForm = () => {
    const errors = {};
    
    if (!orderForm.fullName?.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!orderForm.phone?.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!orderForm.address?.trim()) {
      errors.address = 'Address is required';
    }
    if (!orderForm.division?.trim()) {
      errors.division = 'Division is required';
    }
    if (!orderForm.city?.trim()) {
      errors.city = 'City is required';
    }
    if (!orderForm.zone?.trim()) {
      errors.zone = 'Upazila/Thana is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // ========== PLACE ORDER ==========
  const handlePlaceOrder = async () => {
    let customerId = selectedCustomer?._id;
    
    if (showCreateCustomer) {
      const newCustomer = await handleCreateCustomer();
      if (newCustomer) {
        customerId = newCustomer._id;
        setOrderForm(prev => ({
          ...prev,
          fullName: newCustomer.contactPerson || '',
          email: newCustomer.email || '',
          phone: newCustomer.phone || '',
          division: newCustomer.division || '',
          address: newCustomer.address || '',
          city: newCustomer.city || '',
          zipCode: newCustomer.zipCode || '',
          country: newCustomer.country || 'Bangladesh'
        }));
        setSelectedCustomer(newCustomer);
        setShowCreateCustomer(false);
      } else {
        return;
      }
    }
    
    if (!validateOrderForm()) {
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Build order items
    const formattedItems = [];
    
    orderItems.forEach(item => {
      let productSlug = item.productSlug || 
                        item.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 
                        'unknown-product';
      
      if (item.hasVariants && item.variantItems) {
        // Add each variant as a separate item
        item.variantItems.forEach(variant => {
          formattedItems.push({
            productId: item.productId,
            productName: item.productName,
            productSlug: productSlug,
            image: variant.variantImage || variant.image || item.image || '',
            regularPrice: variant.regularPrice || item.regularPrice,
            discountPrice: variant.discountPrice || item.discountPrice || 0,
            unit: item.unit || 'pcs',
            stockQuantity: variant.stockQuantity || item.stockQuantity || 0,
            quantity: variant.quantity || 0,
            variantId: variant.variantId,
            variantName: variant.variantName,
            variantType: variant.variantType,
            subVariantId: variant.subVariantId,
            subVariantName: variant.subVariantName,
            variantRegularPrice: variant.variantRegularPrice || 0,
            variantDiscountPrice: variant.variantDiscountPrice || 0,
            variantImage: variant.variantImage || '',
            selectedColor: variant.selectedColor || null,
            colors: []
          });
        });
      } else if (item.hasColors && item.colors) {
        // Add color product
        item.colors.forEach(color => {
          formattedItems.push({
            productId: item.productId,
            productName: item.productName,
            productSlug: productSlug,
            image: item.image || '',
            regularPrice: item.regularPrice,
            discountPrice: item.discountPrice || 0,
            unit: item.unit || 'pcs',
            stockQuantity: item.stockQuantity || 0,
            quantity: color.quantity || 0,
            variantId: null,
            variantName: null,
            variantType: null,
            subVariantId: null,
            subVariantName: null,
            variantRegularPrice: 0,
            variantDiscountPrice: 0,
            variantImage: '',
            selectedColor: color.color || null,
            colors: [{
              color: color.color,
              quantity: color.quantity,
              price: color.price || item.discountPrice || item.regularPrice
            }]
          });
        });
      } else {
        // Add plain product
        formattedItems.push({
          productId: item.productId,
          productName: item.productName,
          productSlug: productSlug,
          image: item.image || '',
          regularPrice: item.regularPrice,
          discountPrice: item.discountPrice || 0,
          unit: item.unit || 'pcs',
          stockQuantity: item.stockQuantity || 0,
          quantity: item.totalQuantity || 0,
          variantId: null,
          variantName: null,
          variantType: null,
          subVariantId: null,
          subVariantName: null,
          variantRegularPrice: 0,
          variantDiscountPrice: 0,
          variantImage: '',
          selectedColor: null,
          colors: []
        });
      }
    });
    
    // Filter out items with quantity 0
    const validItems = formattedItems.filter(item => item.quantity > 0);
    
    if (validItems.length === 0) {
      toast.error('Please add at least one product with valid quantity');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = `manual_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      
      const subtotal = calculateSubtotal();
      const total = calculateTotal();
      
      const orderData = {
        items: validItems,
        subtotal,
        shippingCost,
        discount: discount || 0,
        total,
        paymentMethod: 'cod',
        customerInfo: {
          fullName: orderForm.fullName,
          email: orderForm.email || '',
          phone: orderForm.phone,
          division: orderForm.division,
          address: orderForm.address,
          city: orderForm.city,
          zone: orderForm.zone || '',
          area: orderForm.area || '',
          zipCode: orderForm.zipCode || '',
          country: orderForm.country || 'Bangladesh',
          note: orderForm.note || ''
        },
        orderStatus: 'placed',
        sessionId: sessionId,
        clientDeviceInfo: {
          deviceType: 'desktop',
          browser: 'Admin Panel',
          os: 'Manual Order',
          screenResolution: '1920x1080'
        }
      };
      
      if (customerId) {
        orderData.userId = customerId;
      }
      
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Order placed successfully!');
        router.push('/authorize/orders');
      } else {
        toast.error(data.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Place order error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // ========== TOGGLE SECTION ==========
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // ========== RENDER ORDER ITEM (Variant Product with Expand) ==========
  const renderVariantOrderItem = (item, index) => {
    const isExpanded = expandedOrderItems[item.productId] !== false;
    const availableVariants = getAvailableVariantsForItem(item);
    
    // Group variants by variantId
    const variantGroups = {};
    item.variantItems.forEach(v => {
      const key = v.variantId || 'no-variant';
      if (!variantGroups[key]) variantGroups[key] = [];
      variantGroups[key].push(v);
    });

    return (
      <div key={`${item.productId}-${index}`} className="border border-gray-200 rounded-lg overflow-hidden mb-3">
        {/* Product Header */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 border-b border-gray-200">
          <img
            src={item.image || 'https://via.placeholder.com/40'}
            alt={item.productName}
            className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-black truncate">{item.productName}</p>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                {item.variantItems.length} {item.variantItems.length > 1 ? 'variants' : 'variant'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Total: {item.totalQuantity} items</span>
              <span className="text-[#8B9D83] font-medium">৳{item.variantItems.reduce((sum, v) => {
                const price = v.variantDiscountPrice > 0 ? v.variantDiscountPrice : v.variantRegularPrice || v.regularPrice;
                return sum + (price * (v.quantity || 0));
              }, 0).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleOrderItemExpand(item.productId)}
              className="p-1 text-gray-400 hover:text-[#8B9D83] transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={() => removeItemFromOrder(index)}
              className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Variants List - Only show when expanded */}
        {isExpanded && (
          <div className="p-3 space-y-2">
            {/* Existing Variants */}
            {Object.entries(variantGroups).map(([variantId, variants]) => {
              const representative = variants[0];
              const availableSubVariants = getAvailableSubVariantsForItem(item, variantId);
              const hasSubVariants = variantHasSubVariants(variantId, item);

              return (
                <div
                  key={variantId}
                  className="rounded-lg border border-gray-200 bg-gray-50/50 overflow-hidden"
                >
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100/50 border-b border-gray-200">
                    <Layers className="w-3 h-3 text-[#8B9D83] flex-shrink-0" />
                    <span className="text-[11px] font-semibold text-gray-800">
                      {representative.variantName || 'Variant'}
                    </span>
                    {representative.selectedColor && (
                      <Circle
                        className="w-2.5 h-2.5 flex-shrink-0"
                        style={{ color: representative.selectedColor, fill: representative.selectedColor }}
                      />
                    )}
                    <span className="text-[9px] text-gray-400 ml-auto">
                      {variants.filter(v => !v.isBaseProduct).length} {variants.filter(v => !v.isBaseProduct).length > 1 ? 'options' : 'option'} added
                    </span>
                  </div>

                  <div className="p-1.5 space-y-1.5">
                    {variants
                      .filter(v => !v.isBaseProduct)
                      .map((variant) => {
                        // ✅ Resolve the REAL index in the flat item.variantItems array
                        const realIndex = item.variantItems.findIndex(v =>
                          v.variantId === variant.variantId && v.subVariantId === variant.subVariantId
                        );

                        const isSubVariant = variant.isSubVariant;
                        const price = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice : variant.variantRegularPrice || variant.regularPrice;
                        const originalPrice = variant.variantRegularPrice || variant.regularPrice;
                        const hasDiscount = variant.variantDiscountPrice > 0 && variant.variantDiscountPrice < variant.variantRegularPrice;
                        
                        return (
                          <div
                            key={variant.itemId || `variant-${variant.variantId}-${variant.subVariantId}`}
                            className={isSubVariant ? 'ml-3 pl-2 border-l-2 border-[#8B9D83]/25' : ''}
                          >
                            <div className="bg-white rounded-lg border border-gray-200 p-2 hover:border-[#8B9D83]/30 transition-all">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50">
                                  <img
                                    src={variant.variantImage || variant.image || item.image || 'https://via.placeholder.com/40?text=V'}
                                    alt={variant.variantName || 'Variant'}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = 'https://via.placeholder.com/40?text=V';
                                    }}
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-xs font-medium text-gray-800">
                                      {isSubVariant ? variant.subVariantName : variant.variantName}
                                    </span>
                                    {variant.selectedColor && (
                                      <span className="inline-flex items-center gap-0.5 text-[9px] text-[#8B9D83]">
                                        <Circle 
                                          className="w-2.5 h-2.5" 
                                          style={{ color: variant.selectedColor, fill: variant.selectedColor }} 
                                        />
                                        {getColorName(variant.selectedColor)}
                                      </span>
                                    )}
                                    {isSubVariant && (
                                      <span className="text-[8px] bg-blue-50 text-blue-600 px-1 py-0.5 rounded">Sub</span>
                                    )}
                                    {!isSubVariant && (
                                      <span className="text-[8px] bg-purple-50 text-purple-600 px-1 py-0.5 rounded">Variant</span>
                                    )}
                                    {hasDiscount && (
                                      <span className="text-[8px] text-green-600 font-medium bg-green-50 px-1 py-0.5 rounded">
                                        {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-xs font-semibold text-[#8B9D83]">
                                      ৳{Number(price).toFixed(2)}
                                    </span>
                                    {hasDiscount && (
                                      <span className="text-[9px] text-gray-400 line-through">
                                        ৳{Number(originalPrice).toFixed(2)}
                                      </span>
                                    )}
                                    <span className="text-[9px] text-gray-400">| Stock: {variant.stockQuantity}</span>
                                  </div>
                                </div>

                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                  <button
                                    onClick={() => {
                                      const newQty = variant.quantity - 1;
                                      if (newQty < 1) {
                                        updateVariantQuantityInOrder(index, variant.variantId, variant.subVariantId, 0);
                                      } else {
                                        updateVariantQuantityInOrder(index, variant.variantId, variant.subVariantId, newQty);
                                      }
                                    }}
                                    disabled={variant.quantity <= 1}
                                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={variant.quantity}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (value === '') {
                                        setOrderItems(prev => {
                                          const newItems = [...prev];
                                          const itm = newItems[index];
                                          const updatedVariants = itm.variantItems.map((v, i) =>
                                            i === realIndex ? { ...v, quantity: '' } : v
                                          );
                                          newItems[index] = { ...itm, variantItems: updatedVariants };
                                          return newItems;
                                        });
                                        return;
                                      }
                                      if (/^\d+$/.test(value)) {
                                        const numValue = parseInt(value);
                                        if (numValue <= (variant.stockQuantity || 999)) {
                                          setOrderItems(prev => {
                                            const newItems = [...prev];
                                            const itm = newItems[index];
                                            const updatedVariants = itm.variantItems.map((v, i) =>
                                              i === realIndex ? { ...v, quantity: numValue } : v
                                            );
                                            newItems[index] = { ...itm, variantItems: updatedVariants };
                                            return newItems;
                                          });
                                        }
                                      }
                                    }}
                                    onBlur={() => {
                                      let numValue = parseInt(variant.quantity);
                                      if (isNaN(numValue) || numValue < 1) {
                                        updateVariantQuantityInOrder(index, variant.variantId, variant.subVariantId, 1);
                                      } else if (numValue > (variant.stockQuantity || 999)) {
                                        updateVariantQuantityInOrder(index, variant.variantId, variant.subVariantId, variant.stockQuantity || 999);
                                      }
                                    }}
                                    className="w-8 text-center text-xs py-0.5 bg-white focus:outline-none"
                                  />
                                  <button
                                    onClick={() => {
                                      const newQty = variant.quantity + 1;
                                      if (newQty <= variant.stockQuantity) {
                                        updateVariantQuantityInOrder(index, variant.variantId, variant.subVariantId, newQty);
                                      } else {
                                        toast.warning(`Only ${variant.stockQuantity} item(s) available`);
                                      }
                                    }}
                                    disabled={variant.quantity >= variant.stockQuantity}
                                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => updateVariantQuantityInOrder(index, variant.variantId, variant.subVariantId, 0)}
                                  className="p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    {/* Available Sub-Variants */}
                    {hasSubVariants && availableSubVariants.length > 0 && (
                      <div className="ml-3 pl-2 border-l-2 border-dashed border-gray-300 pt-1">
                        <p className="text-[9px] text-gray-400 mb-1">
                          Add sub-variant:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {availableSubVariants.map((subVariant) => (
                            <button
                              key={subVariant.id}
                              onClick={() => {
                                const parentVariant = item.variantTypes
                                  .flatMap(vt => vt.variants)
                                  .find(v => v.id === variantId);
                                const parentVariantType = item.variantTypes
                                  .find(vt => vt.variants.some(v => v.id === variantId));
                                addSubVariantToExistingItem(
                                  item.productId,
                                  variantId,
                                  subVariant,
                                  parentVariant?.name || 'Variant',
                                  parentVariantType?.type || 'Variant'
                                );
                              }}
                              className="text-[9px] px-2 py-1 rounded-full border border-gray-300 hover:border-[#8B9D83] text-gray-700 hover:bg-white transition-all flex items-center gap-1 bg-white/60"
                            >
                              <Plus className="w-2 h-2" />
                              {subVariant.name}
                              {subVariant.color && (
                                <span
                                  className="inline-block w-2 h-2 rounded-full"
                                  style={{ backgroundColor: subVariant.color }}
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Available Variants to Add */}
            {availableVariants.length > 0 && (
              <div className="pt-1 border-t border-gray-200 mt-1">
                <p className="text-[9px] text-gray-400 mb-1.5">
                  Add more variants:
                </p>
                <div className="flex flex-wrap gap-1">
                  {availableVariants.map((v) => {
                    const hasSubVariants = v.subVariants && v.subVariants.length > 0;
                    
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          // If variant has sub-variants, automatically add the first one
                          if (hasSubVariants) {
                            const firstSub = v.subVariants[0];
                            const parentVariant = item.variantTypes
                              .flatMap(vt => vt.variants)
                              .find(vt => vt.id === v.id);
                            const parentVariantType = item.variantTypes
                              .find(vt => vt.variants.some(vt2 => vt2.id === v.id));
                            addSubVariantToExistingItem(
                              item.productId,
                              v.id,
                              firstSub,
                              v.name,
                              parentVariantType?.type || 'Variant'
                            );
                            return;
                          }
                          addVariantToExistingItem(item.productId, v, v.type);
                        }}
                        className={`text-[9px] px-2 py-1 rounded-full border transition-all flex items-center gap-1 ${
                          hasSubVariants
                            ? 'border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-400'
                            : 'border-gray-300 hover:border-[#8B9D83] text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Plus className="w-2 h-2" />
                        {v.name}
                        {v.color && (
                          <span
                            className="inline-block w-2 h-2 rounded-full"
                            style={{ backgroundColor: v.color }}
                          />
                        )}
                        {hasSubVariants && (
                          <span className="text-[8px] bg-amber-200 text-amber-700 px-1 py-0.5 rounded-full">
                            {v.subVariants.length} sub
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ========== RENDER ==========
  return (
    <ProtectedRoute pageKey="all_orders">
      <div className="min-h-screen bg-white">
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-black flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-[#718369]" />
                    Manual Order Creation
                  </h1>
                  <p className="text-sm text-gray-500">Create orders for customers manually</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/authorize/orders')}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={submitting || orderItems.length === 0}
                  className="px-6 py-2 bg-[#5b6b54] text-white rounded-lg hover:bg-[#4d5c47]transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Place Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* ========== CUSTOMER SECTION ========== */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('customer')}
                  className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-black" />
                    <h2 className="text-base font-semibold text-black">Customer</h2>
                    {selectedCustomer && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                    {showCreateCustomer && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        New Customer
                      </span>
                    )}
                  </div>
                  {expandedSections.customer ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                
                {expandedSections.customer && (
                  <div className="px-5 pb-5 space-y-4">
                    {/* Customer Search */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Search Existing Customer
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={customerSearchQuery}
                          onChange={(e) => setCustomerSearchQuery(e.target.value)}
                          placeholder="Search by name, email, or phone..."
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                        {searchingCustomers && (
                          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                        )}
                      </div>
                      
                      {customerSearchResults.length > 0 && (
                        <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                          {customerSearchResults.map(customer => (
                            <button
                              key={customer._id}
                              onClick={() => handleSelectCustomer(customer)}
                              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center gap-3"
                            >
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
                                {customer.contactPerson?.charAt(0) || '?'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-black truncate">
                                  {customer.contactPerson}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {customer.email} • {customer.phone}
                                </p>
                              </div>
                              <UserCheck className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Selected Customer Display */}
                    {selectedCustomer && !showCreateCustomer && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-semibold text-sm">
                            {selectedCustomer.contactPerson?.charAt(0) || '?'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-black">{selectedCustomer.contactPerson}</p>
                            <p className="text-xs text-gray-500">{selectedCustomer.email} • {selectedCustomer.phone}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedCustomer(null);
                            setCustomerSearchQuery('');
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {/* Create New Customer Toggle */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setShowCreateCustomer(!showCreateCustomer);
                          if (!showCreateCustomer) {
                            setSelectedCustomer(null);
                            setCustomerSearchQuery('');
                            setCreateForm({
                              contactPerson: '',
                              email: '',
                              phone: '',
                              whatsapp: '',
                              country: '',
                              address: '',
                              city: '',
                              zipCode: '',
                              password: '',
                              confirmPassword: '',
                              subscribeToNewsletter: false
                            });
                            setCreateFormErrors({});
                          }
                        }}
                        className="text-sm text-black hover:underline flex items-center gap-1"
                      >
                        <UserPlus className="w-4 h-4" />
                        {showCreateCustomer ? 'Cancel' : 'Create New Customer'}
                      </button>
                    </div>
                    
                    {/* Create Customer Form */}
                    {showCreateCustomer && (
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4">
                        <h3 className="text-sm font-medium text-black">New Customer Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Contact Person <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="contactPerson"
                              value={createForm.contactPerson}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.contactPerson ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Your full name"
                            />
                            {createFormErrors.contactPerson && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.contactPerson}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={createForm.email}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="your@email.com"
                            />
                            {createFormErrors.email && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.email}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={createForm.phone}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="01XXXXXXXXX"
                            />
                            {createFormErrors.phone && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.phone}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              WhatsApp
                            </label>
                            <input
                              type="tel"
                              name="whatsapp"
                              value={createForm.whatsapp}
                              onChange={handleCreateChange}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                              placeholder="01XXXXXXXXX"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Country <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="country"
                              value={createForm.country}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.country ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Country"
                            />
                            {createFormErrors.country && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.country}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={createForm.city}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.city ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="City"
                            />
                            {createFormErrors.city && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.city}</p>
                            )}
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Address <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="address"
                              value={createForm.address}
                              onChange={handleCreateChange}
                              rows="2"
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none ${
                                createFormErrors.address ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Street address"
                            />
                            {createFormErrors.address && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.address}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              ZIP Code <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={createForm.zipCode}
                              onChange={handleCreateChange}
                              className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                                createFormErrors.zipCode ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="ZIP Code"
                            />
                            {createFormErrors.zipCode && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.zipCode}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={createForm.password}
                                onChange={handleCreateChange}
                                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent pr-10 ${
                                  createFormErrors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Min 8 characters"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                            {createFormErrors.password && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.password}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={createForm.confirmPassword}
                                onChange={handleCreateChange}
                                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent pr-10 ${
                                  createFormErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Confirm password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                            {createFormErrors.confirmPassword && (
                              <p className="text-xs text-red-500 mt-1">{createFormErrors.confirmPassword}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                          <button
                            type="button"
                            onClick={() => setShowCreateCustomer(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              const newCustomer = await handleCreateCustomer();
                              if (newCustomer) {
                                handleSelectCustomer(newCustomer);
                                setShowCreateCustomer(false);
                              }
                            }}
                            disabled={isCreating}
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
                          >
                            {isCreating ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Creating...
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-4 h-4" />
                                Create & Select
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* ========== PRODUCTS SECTION ========== */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('products')}
                  className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-black" />
                    <h2 className="text-base font-semibold text-black">Products</h2>
                    {orderItems.length > 0 && (
                      <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        {orderItems.length} items
                      </span>
                    )}
                  </div>
                  {expandedSections.products ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                
                {expandedSections.products && (
                  <div className="px-5 pb-5 space-y-4">
                    {/* Add Product Button */}
                    {!showAddProduct ? (
                      <button
                        onClick={() => setShowAddProduct(true)}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-black flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Product
                      </button>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium text-black">Add Product</h3>
                          <button
                            onClick={resetProductSelection}
                            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Product Search */}
                        <div className="relative mb-3">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={productSearchQuery}
                            onChange={(e) => setProductSearchQuery(e.target.value)}
                            placeholder="Search products by name, SKU, or barcode..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                            autoFocus
                          />
                          {searchingProducts && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                          )}
                        </div>
                        
                        {/* Search Results */}
                        {productSearchResults.length > 0 && (
                          <div className="mb-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white">
                            {productSearchResults.map(product => (
                              <button
                                key={product._id}
                                onClick={() => handleSelectProduct(product)}
                                className={`w-full p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center gap-3 ${
                                  selectedProduct?._id === product._id ? 'bg-gray-50' : ''
                                }`}
                              >
                                <img
                                  src={product.images?.[0]?.url || 'https://via.placeholder.com/40'}
                                  alt={product.productName}
                                  className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-black truncate">{product.productName}</p>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>৳{(product.discountPrice || product.regularPrice).toFixed(2)}</span>
                                    {product.discountPrice > 0 && (
                                      <span className="line-through">৳{product.regularPrice.toFixed(2)}</span>
                                    )}
                                    <span>• Stock: {product.stockQuantity}</span>
                                    {product.hasVariants && (
                                      <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                                        Has Variants
                                      </span>
                                    )}
                                    {product.colors && product.colors.length > 0 && (
                                      <span className="text-xs bg-pink-100 text-[#4d5c47] px-1.5 py-0.5 rounded-full">
                                        {product.colors.length} colors
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {selectedProduct?._id === product._id && (
                                  <Check className="w-4 h-4 text-black" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {/* Selected Product - Display Variants */}
                        {selectedProduct && (
                          <div className="bg-white rounded-lg p-3 border border-gray-200 space-y-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={selectedProduct.images?.[0]?.url || 'https://via.placeholder.com/40'}
                                alt={selectedProduct.productName}
                                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-black">{selectedProduct.productName}</p>
                                <p className="text-xs text-gray-500">
                                  Stock: {selectedProduct.stockQuantity} • ৳{(selectedProduct.discountPrice || selectedProduct.regularPrice).toFixed(2)}
                                  {selectedProduct.hasVariants && (
                                    <span className="ml-2 text-blue-600">• Has Variants</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            
                            {/* ========== VARIANTS SECTION ========== */}
                            {selectedProduct.hasVariants && selectedProduct.variantTypes?.length > 0 && (
                              <div className="space-y-3">
                                {selectedProduct.variantTypes.map((vt) => (
                                  <div key={vt.id || vt.type} className="space-y-2">
                                    <p className="text-xs font-medium text-gray-700">
                                      {vt.type.charAt(0).toUpperCase() + vt.type.slice(1)} Variants:
                                    </p>
                                    <div className="space-y-2">
                                      {vt.variants.map((v) => {
                                        const hasSub = v.subVariants && v.subVariants.length > 0;
                                        // For variants with sub-variants, check if any sub-variant is selected
                                        let isSelected = false;
                                        if (hasSub) {
                                          isSelected = selectedVariantsWithQty.some(sv => 
                                            sv.variantId === v.id && sv.subVariantId !== null
                                          );
                                        } else {
                                          isSelected = selectedVariantsWithQty.some(sv => 
                                            sv.variantId === v.id && !sv.subVariantId
                                          );
                                        }
                                        
                                        return (
                                          <div key={v.id} className="border rounded-lg p-2 bg-white">
                                            <div className="flex items-center gap-2">
                                              {v.images?.[0] && (
                                                <img src={v.images[0]} className="w-8 h-8 rounded object-cover border border-gray-200" alt={v.name} />
                                              )}
                                              <span className="text-sm font-medium text-gray-800">{v.name}</span>
                                              <span className="text-xs text-gray-500 ml-auto">
                                                ৳{(v.discountPrice || v.regularPrice || 0).toFixed(2)}
                                              </span>
                                              <button
                                                onClick={() => toggleVariantSelection(vt, v)}
                                                className={`px-2 py-0.5 text-xs rounded ${
                                                  isSelected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-black text-white hover:bg-gray-800'
                                                }`}
                                              >
                                                {isSelected ? 'Remove' : 'Add'}
                                              </button>
                                              {hasSub && (
                                                <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
                                                  {v.subVariants.length} sub
                                                </span>
                                              )}
                                            </div>
                                            
                                            {/* For variants WITH sub-variants, show selected sub-variant and quantity */}
                                            {hasSub && (
                                              <div className="mt-2 pl-3 space-y-1 border-l-2 border-gray-200">
                                                {v.subVariants.map((sv) => {
                                                  const selectedSub = selectedVariantsWithQty.find(
                                                    x => x.variantId === v.id && x.subVariantId === sv.id
                                                  );
                                                  const isSubSelected = !!selectedSub;
                                                  
                                                  return (
                                                    <div key={sv.id} className="flex items-center gap-2 py-1">
                                                      {sv.images?.[0] && (
                                                        <img src={sv.images[0]} className="w-5 h-5 rounded object-cover border border-gray-200" alt={sv.name} />
                                                      )}
                                                      <span className="text-xs text-gray-700">{sv.name}</span>
                                                      <span className="text-[10px] text-gray-500">
                                                        ৳{(sv.discountPrice || sv.regularPrice || 0).toFixed(2)}
                                                      </span>
                                                      <button
                                                        onClick={() => toggleSubVariantSelection(vt, v, sv)}
                                                        className={`px-1.5 py-0.5 text-[10px] rounded ${
                                                          isSubSelected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-black text-white hover:bg-gray-800'
                                                        }`}
                                                      >
                                                        {isSubSelected ? 'Remove' : 'Add'}
                                                      </button>
                                                      {isSubSelected && (
                                                        <div className="flex items-center gap-1">
                                                          <button
                                                            onClick={() => {
                                                              const currentQty = selectedVariantsWithQty.find(x => x.variantId === v.id && x.subVariantId === sv.id)?.quantity || 1;
                                                              updateVariantQty(v.id, sv.id, Math.max(1, currentQty - 1));
                                                            }}
                                                            className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                                                            disabled={selectedSub?.quantity <= 1}
                                                          >
                                                            <Minus className="w-2.5 h-2.5" />
                                                          </button>
                                                          <input
                                                            type="text"
                                                            inputMode="numeric"
                                                            pattern="[0-9]*"
                                                            value={selectedSub?.quantity || 1}
                                                            onChange={(e) => {
                                                              const value = e.target.value;
                                                              if (value === '') {
                                                                updateVariantQty(v.id, sv.id, '');
                                                                return;
                                                              }
                                                              if (/^\d+$/.test(value)) {
                                                                const numValue = parseInt(value);
                                                                if (numValue <= (sv.stockQuantity || 999)) {
                                                                  updateVariantQty(v.id, sv.id, numValue);
                                                                }
                                                              }
                                                            }}
                                                            onBlur={() => {
                                                              const currentQty = selectedVariantsWithQty.find(x => x.variantId === v.id && x.subVariantId === sv.id)?.quantity;
                                                              let numValue = typeof currentQty === 'string' ? parseInt(currentQty) : currentQty;
                                                              if (isNaN(numValue) || numValue < 1) {
                                                                updateVariantQty(v.id, sv.id, 1);
                                                              } else if (numValue > (sv.stockQuantity || 999)) {
                                                                updateVariantQty(v.id, sv.id, sv.stockQuantity || 999);
                                                              }
                                                            }}
                                                            className="w-8 text-center text-[10px] py-0.5 bg-white focus:outline-none border border-gray-200 rounded"
                                                          />
                                                          <button
                                                            onClick={() => {
                                                              const currentQty = selectedVariantsWithQty.find(x => x.variantId === v.id && x.subVariantId === sv.id)?.quantity || 1;
                                                              updateVariantQty(v.id, sv.id, Math.min(sv.stockQuantity || 999, currentQty + 1));
                                                            }}
                                                            className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                                                            disabled={selectedSub?.quantity >= (sv.stockQuantity || 999)}
                                                          >
                                                            <Plus className="w-2.5 h-2.5" />
                                                          </button>
                                                        </div>
                                                      )}
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            )}
                                            
                                            {/* For variants WITHOUT sub-variants, show quantity */}
                                            {!hasSub && isSelected && (
                                              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                                                <span className="text-xs text-gray-500">Qty:</span>
                                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                                                  <button
                                                    onClick={() => {
                                                      const currentQty = selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1;
                                                      updateVariantQty(v.id, null, Math.max(1, currentQty - 1));
                                                    }}
                                                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                                    disabled={(selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1) <= 1}
                                                  >
                                                    <Minus className="w-3 h-3" />
                                                  </button>
                                                  <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    value={selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1}
                                                    onChange={(e) => {
                                                      const value = e.target.value;
                                                      if (value === '') {
                                                        updateVariantQty(v.id, null, '');
                                                        return;
                                                      }
                                                      if (/^\d+$/.test(value)) {
                                                        const numValue = parseInt(value);
                                                        if (numValue <= (v.stockQuantity || 999)) {
                                                          updateVariantQty(v.id, null, numValue);
                                                        }
                                                      }
                                                    }}
                                                    onBlur={() => {
                                                      const currentQty = selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity;
                                                      let numValue = typeof currentQty === 'string' ? parseInt(currentQty) : currentQty;
                                                      if (isNaN(numValue) || numValue < 1) {
                                                        updateVariantQty(v.id, null, 1);
                                                      } else if (numValue > (v.stockQuantity || 999)) {
                                                        updateVariantQty(v.id, null, v.stockQuantity || 999);
                                                      }
                                                    }}
                                                    className="w-10 text-center text-xs py-0.5 bg-white focus:outline-none border border-gray-200 rounded"
                                                  />
                                                  <button
                                                    onClick={() => {
                                                      const currentQty = selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1;
                                                      updateVariantQty(v.id, null, Math.min(v.stockQuantity || 999, currentQty + 1));
                                                    }}
                                                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                                    disabled={(selectedVariantsWithQty.find(s => s.variantId === v.id && !s.subVariantId)?.quantity || 1) >= (v.stockQuantity || 999)}
                                                  >
                                                    <Plus className="w-3 h-3" />
                                                  </button>
                                                </div>
                                                <span className="text-[10px] text-gray-400">
                                                  max {v.stockQuantity || 0}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                                
                                {/* Selected Variants Summary */}
                                {selectedVariantsWithQty.length > 0 && (
                                  <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="text-blue-700 font-medium">
                                        {selectedVariantsWithQty.length} variant(s) selected
                                      </span>
                                      <span className="text-blue-700 font-medium">
                                        Total: {getTotalVariantQuantity()} items • ৳{getTotalVariantPrice().toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* ========== COLORS SECTION (for products without variants) ========== */}
                            {!selectedProduct.hasVariants && selectedProduct.colors && selectedProduct.colors.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-xs font-medium text-gray-700">Select Colors:</p>
                                <div className="flex flex-wrap gap-2">
                                  {selectedProduct.colors.map((color) => {
                                    const selected = selectedColorsWithQty.find(c => c.color === color);
                                    const isSelected = !!selected;
                                    const quantity = selected?.quantity || 1;
                                    
                                    return (
                                      <div key={color} className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white">
                                        <div 
                                          className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                                          style={{ backgroundColor: color }}
                                          title={color}
                                        />
                                        <button
                                          onClick={() => toggleColorSelection(color)}
                                          className={`px-2 py-0.5 text-xs rounded ${
                                            isSelected ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-black text-white hover:bg-gray-800'
                                          }`}
                                        >
                                          {isSelected ? 'Remove' : 'Add'}
                                        </button>
                                        {isSelected && (
                                          <div className="flex items-center gap-1">
                                            <button
                                              onClick={() => {
                                                const currentQty = selectedColorsWithQty.find(c => c.color === color)?.quantity || 1;
                                                updateSelectedColorQuantity(color, Math.max(1, currentQty - 1));
                                              }}
                                              className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                                              disabled={quantity <= 1}
                                            >
                                              <Minus className="w-3 h-3" />
                                            </button>
                                            <input
                                              type="text"
                                              inputMode="numeric"
                                              pattern="[0-9]*"
                                              value={quantity}
                                              onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === '') {
                                                  updateSelectedColorQuantity(color, '');
                                                  return;
                                                }
                                                if (/^\d+$/.test(value)) {
                                                  const numValue = parseInt(value);
                                                  if (numValue <= (selectedProduct.stockQuantity || 999)) {
                                                    updateSelectedColorQuantity(color, numValue);
                                                  }
                                                }
                                              }}
                                              onBlur={() => {
                                                const currentQty = selectedColorsWithQty.find(c => c.color === color)?.quantity;
                                                let numValue = typeof currentQty === 'string' ? parseInt(currentQty) : currentQty;
                                                if (isNaN(numValue) || numValue < 1) {
                                                  updateSelectedColorQuantity(color, 1);
                                                } else if (numValue > (selectedProduct.stockQuantity || 999)) {
                                                  updateSelectedColorQuantity(color, selectedProduct.stockQuantity || 999);
                                                }
                                              }}
                                              className="w-10 text-center text-xs py-0.5 bg-white focus:outline-none border border-gray-200 rounded"
                                            />
                                            <button
                                              onClick={() => {
                                                const currentQty = selectedColorsWithQty.find(c => c.color === color)?.quantity || 1;
                                                updateSelectedColorQuantity(color, Math.min(selectedProduct.stockQuantity || 999, currentQty + 1));
                                              }}
                                              className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                                              disabled={quantity >= selectedProduct.stockQuantity}
                                            >
                                              <Plus className="w-3 h-3" />
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                            
                            {/* ========== QUANTITY (No Colors, No Variants) ========== */}
                            {!selectedProduct.hasVariants && (!selectedProduct.colors || selectedProduct.colors.length === 0) && (
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-600">Quantity:</span>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                                  <button
                                    onClick={() => {
                                      const currentQty = typeof addQuantity === 'string' ? parseInt(addQuantity) || 1 : addQuantity;
                                      setAddQuantity(Math.max(1, currentQty - 1));
                                    }}
                                    className="px-2 py-1 hover:bg-gray-100 transition-colors"
                                    disabled={addQuantity <= 1}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={addQuantity}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (value === '') {
                                        setAddQuantity('');
                                        return;
                                      }
                                      if (/^\d+$/.test(value)) {
                                        const numValue = parseInt(value);
                                        if (numValue <= (selectedProduct.stockQuantity || 999)) {
                                          setAddQuantity(numValue);
                                        }
                                      }
                                    }}
                                    onBlur={() => {
                                      let numValue = typeof addQuantity === 'string' ? parseInt(addQuantity) : addQuantity;
                                      if (isNaN(numValue) || numValue < 1) {
                                        setAddQuantity(1);
                                      } else if (numValue > (selectedProduct.stockQuantity || 999)) {
                                        setAddQuantity(selectedProduct.stockQuantity || 999);
                                      }
                                    }}
                                    className="w-14 text-center text-sm py-1 bg-white focus:outline-none"
                                  />
                                  <button
                                    onClick={() => {
                                      const currentQty = typeof addQuantity === 'string' ? parseInt(addQuantity) || 1 : addQuantity;
                                      setAddQuantity(Math.min(selectedProduct.stockQuantity || 999, currentQty + 1));
                                    }}
                                    className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                                    disabled={addQuantity >= (selectedProduct.stockQuantity || 999)}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <span className="text-xs text-gray-500">/ {selectedProduct.stockQuantity || 0}</span>
                              </div>
                            )}
                            
                            {/* Add to Order Button */}
                            <button
                              onClick={handleAddProductToOrder}
                              disabled={
                                (selectedProduct.hasVariants && selectedVariantsWithQty.length === 0) ||
                                (selectedProduct.hasVariants && !isVariantSelectionComplete())
                              }
                              className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                                (selectedProduct.hasVariants && selectedVariantsWithQty.length === 0) ||
                                (selectedProduct.hasVariants && !isVariantSelectionComplete())
                                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                  : 'bg-black text-white hover:bg-gray-800 transition-colors'
                              }`}
                            >
                              <Plus className="w-4 h-4" />
                              {selectedProduct.hasVariants 
                                ? `Add ${selectedVariantsWithQty.length} Variant(s) to Order`
                                : 'Add to Order'}
                            </button>
                            {selectedProduct.hasVariants && selectedVariantsWithQty.length === 0 && (
                              <p className="text-xs text-amber-600 text-center mt-1">
                                Please select at least one variant
                              </p>
                            )}
                            {selectedProduct.hasVariants && selectedVariantsWithQty.length > 0 && !isVariantSelectionComplete() && (
                              <p className="text-xs text-amber-600 text-center mt-1">
                                Please set quantity for all selected variants
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Order Items List - With Variant Add Options */}
                    {orderItems.length > 0 && (
                      <div className="space-y-3 mt-3">
                        {orderItems.map((item, index) => {
                          if (item.hasVariants && item.variantItems) {
                            return renderVariantOrderItem(item, index);
                          } else if (item.hasColors && item.colors) {
                            // ========== COLOR PRODUCT DISPLAY ==========
                            return (
                              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 border-b border-gray-200">
                                  <img
                                    src={item.image || 'https://via.placeholder.com/40'}
                                    alt={item.productName}
                                    className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-black">{item.productName}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <span>Stock: {item.stockQuantity}</span>
                                      <span>• Total: {item.totalQuantity} items</span>
                                      <span className="text-[#718369]">• {item.colors.length} colors</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => removeItemFromOrder(index)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                                
                                <div className="p-3 space-y-2">
                                  {item.colors.map((colorInfo) => (
                                    <div key={colorInfo.color} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                                      <div 
                                        className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                                        style={{ backgroundColor: colorInfo.color }}
                                        title={colorInfo.color}
                                      />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-gray-800">{getColorName(colorInfo.color)}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                          <span className="font-medium text-gray-700">
                                            ৳{(colorInfo.price || item.discountPrice || item.regularPrice).toFixed(2)}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                                        <button
                                          onClick={() => {
                                            const newQty = colorInfo.quantity - 1;
                                            if (newQty < 1) {
                                              updateColorQuantityInOrder(index, colorInfo.color, 0);
                                            } else {
                                              updateColorQuantityInOrder(index, colorInfo.color, newQty);
                                            }
                                          }}
                                          disabled={colorInfo.quantity <= 1}
                                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                        >
                                          <Minus className="w-3 h-3" />
                                        </button>
                                        <input
                                          type="text"
                                          inputMode="numeric"
                                          pattern="[0-9]*"
                                          value={colorInfo.quantity}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '') {
                                              setOrderItems(prev => {
                                                const newItems = [...prev];
                                                const item = newItems[index];
                                                const updatedColors = item.colors.map(c =>
                                                  c.color === colorInfo.color ? { ...c, quantity: '' } : c
                                                );
                                                newItems[index] = { ...item, colors: updatedColors };
                                                return newItems;
                                              });
                                              return;
                                            }
                                            if (/^\d+$/.test(value)) {
                                              const numValue = parseInt(value);
                                              if (numValue <= (item.stockQuantity || 999)) {
                                                setOrderItems(prev => {
                                                  const newItems = [...prev];
                                                  const item = newItems[index];
                                                  const updatedColors = item.colors.map(c =>
                                                    c.color === colorInfo.color ? { ...c, quantity: numValue } : c
                                                  );
                                                  newItems[index] = { ...item, colors: updatedColors };
                                                  return newItems;
                                                });
                                              }
                                            }
                                          }}
                                          onBlur={() => {
                                            let numValue = parseInt(colorInfo.quantity);
                                            if (isNaN(numValue) || numValue < 1) {
                                              updateColorQuantityInOrder(index, colorInfo.color, 1);
                                            } else if (numValue > (item.stockQuantity || 999)) {
                                              updateColorQuantityInOrder(index, colorInfo.color, item.stockQuantity || 999);
                                            }
                                          }}
                                          className="w-8 text-center text-xs py-0.5 bg-white focus:outline-none"
                                        />
                                        <button
                                          onClick={() => {
                                            const newQty = colorInfo.quantity + 1;
                                            if (newQty <= item.stockQuantity) {
                                              updateColorQuantityInOrder(index, colorInfo.color, newQty);
                                            } else {
                                              toast.warning(`Only ${item.stockQuantity} items available`);
                                            }
                                          }}
                                          disabled={colorInfo.quantity >= item.stockQuantity}
                                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                        >
                                          <Plus className="w-3 h-3" />
                                        </button>
                                      </div>
                                      <button
                                        onClick={() => updateColorQuantityInOrder(index, colorInfo.color, 0)}
                                        className="p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          } else {
                            // ========== PLAIN PRODUCT DISPLAY ==========
                            const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
                            return (
                              <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                                <img
                                  src={item.image || 'https://via.placeholder.com/40'}
                                  alt={item.productName}
                                  className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-black">{item.productName}</p>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>৳{price.toFixed(2)}</span>
                                    {item.discountPrice > 0 && (
                                      <span className="line-through">৳{item.regularPrice.toFixed(2)}</span>
                                    )}
                                    <span>• Stock: {item.stockQuantity}</span>
                                  </div>
                                </div>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                                  <button
                                    onClick={() => {
                                      const newQty = item.totalQuantity - 1;
                                      if (newQty < 1) {
                                        removeItemFromOrder(index);
                                      } else {
                                        updateItemQuantity(index, newQty);
                                      }
                                    }}
                                    disabled={item.totalQuantity <= 1}
                                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={item.totalQuantity}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (value === '') {
                                        setOrderItems(prev => {
                                          const newItems = [...prev];
                                          newItems[index] = { ...newItems[index], totalQuantity: '' };
                                          return newItems;
                                        });
                                        return;
                                      }
                                      if (/^\d+$/.test(value)) {
                                        const numValue = parseInt(value);
                                        if (numValue <= (item.stockQuantity || 999)) {
                                          setOrderItems(prev => {
                                            const newItems = [...prev];
                                            newItems[index] = { ...newItems[index], totalQuantity: numValue };
                                            return newItems;
                                          });
                                        }
                                      }
                                    }}
                                    onBlur={() => {
                                      let numValue = parseInt(item.totalQuantity);
                                      if (isNaN(numValue) || numValue < 1) {
                                        updateItemQuantity(index, 1);
                                      } else if (numValue > (item.stockQuantity || 999)) {
                                        updateItemQuantity(index, item.stockQuantity || 999);
                                      }
                                    }}
                                    className="w-10 text-center text-sm py-0.5 bg-white focus:outline-none"
                                  />
                                  <button
                                    onClick={() => {
                                      const newQty = item.totalQuantity + 1;
                                      if (newQty <= item.stockQuantity) {
                                        updateItemQuantity(index, newQty);
                                      } else {
                                        toast.warning(`Only ${item.stockQuantity} items available`);
                                      }
                                    }}
                                    disabled={item.totalQuantity >= item.stockQuantity}
                                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeItemFromOrder(index)}
                                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            );
                          }
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* ========== DELIVERY ADDRESS SECTION ========== */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('address')}
                  className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-black" />
                    <h2 className="text-base font-semibold text-black">Delivery Address</h2>
                  </div>
                  {expandedSections.address ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                
                {expandedSections.address && (
                  <div className="px-5 pb-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={orderForm.fullName}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, fullName: e.target.value }))}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Customer Name"
                        />
                        {formErrors.fullName && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={orderForm.phone}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            formErrors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="01XXXXXXXXX"
                        />
                        {formErrors.phone && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={orderForm.email}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="name@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Division <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={orderForm.division}
                          onChange={(e) => {
                            const division = e.target.value;
                            setOrderForm(prev => ({ 
                              ...prev, 
                              division: division,
                              city: '',
                              zone: '',
                              area: ''
                            }));
                            if (division && divisions[division]) {
                              setCitiesByDivision(divisions[division]);
                            } else {
                              setCitiesByDivision([]);
                            }
                            setZones([]);
                            setAreas([]);
                          }}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            formErrors.division ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Division</option>
                          {divisionList.map(division => (
                            <option key={division} value={division}>{division}</option>
                          ))}
                        </select>
                        {formErrors.division && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.division}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          District/City <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={orderForm.city}
                          onChange={(e) => {
                            const city = e.target.value;
                            setOrderForm(prev => ({ ...prev, city: city, zone: '', area: '' }));
                            if (city && locationData[city]) {
                              const availableZones = Object.keys(locationData[city].zones || {});
                              setZones(availableZones);
                            } else {
                              setZones([]);
                            }
                            setAreas([]);
                            if (city) {
                              calculateShipping(city);
                            }
                          }}
                          disabled={!orderForm.division}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            formErrors.city ? 'border-red-500' : 'border-gray-300'
                          } ${!orderForm.division ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        >
                          <option value="">Select District</option>
                          {citiesByDivision.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        {formErrors.city && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Upazila/Thana <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={orderForm.zone}
                          onChange={(e) => {
                            const zone = e.target.value;
                            setOrderForm(prev => ({ ...prev, zone: zone, area: '' }));
                            if (zone && orderForm.city && locationData[orderForm.city]) {
                              const availableAreas = locationData[orderForm.city].zones[zone] || [];
                              setAreas(availableAreas);
                            } else {
                              setAreas([]);
                            }
                            if (orderForm.city && zone) {
                              calculateShipping(orderForm.city);
                            }
                          }}
                          disabled={!orderForm.city}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            formErrors.zone ? 'border-red-500' : 'border-gray-300'
                          } ${!orderForm.city ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        >
                          <option value="">Select Upazila/Thana</option>
                          {zones.map(zone => (
                            <option key={zone} value={zone}>{zone}</option>
                          ))}
                        </select>
                        {formErrors.zone && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.zone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Union/Area
                        </label>
                        <select
                          value={orderForm.area}
                          onChange={(e) => {
                            const area = e.target.value;
                            setOrderForm(prev => ({ ...prev, area: area }));
                            if (orderForm.city && orderForm.zone && area) {
                              calculateShipping(orderForm.city);
                            }
                          }}
                          disabled={!orderForm.zone}
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            !orderForm.zone ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Union/Area</option>
                          {areas.map(area => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={orderForm.address}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                          rows="2"
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none ${
                            formErrors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="House #, Road #, Area"
                        />
                        {formErrors.address && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.address}</p>
                        )}
                      </div>
                    </div>
                    
                    {orderForm.city && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Truck className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Shipping Cost:</span>
                        </div>
                        <span className="text-sm font-semibold text-black">
                          ৳{shippingCost.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* ========== RIGHT COLUMN - ORDER SUMMARY ========== */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-24">
                <div className="px-5 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-black" />
                    <h2 className="text-base font-semibold text-black">Order Summary</h2>
                    <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {orderItems.reduce((sum, item) => sum + (item.totalQuantity || 0), 0)} items
                    </span>
                  </div>
                </div>
                
                <div className="p-5 space-y-4">
                  {/* Customer Info */}
                  <div className="space-y-1 text-sm">
                    <p className="text-xs text-gray-500 font-medium">Customer</p>
                    {selectedCustomer ? (
                      <>
                        <p className="text-sm font-medium text-black">{selectedCustomer.contactPerson}</p>
                        <p className="text-xs text-gray-500">{selectedCustomer.email} • {selectedCustomer.phone}</p>
                      </>
                    ) : showCreateCustomer ? (
                      <p className="text-sm text-blue-600">New Customer (will be created)</p>
                    ) : (
                      <p className="text-sm text-gray-400">No customer selected</p>
                    )}
                  </div>
                  
                  {/* Order Items Summary */}
                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-500 font-medium mb-2">Items ({orderItems.length})</p>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {orderItems.map((item, index) => {
                        const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
                        
                        if (item.hasVariants && item.variantItems) {
                          // Group variants by variantId for hierarchical display
                          const variantGroups = {};
                          item.variantItems.forEach(v => {
                            const key = v.variantId || 'no-variant';
                            if (!variantGroups[key]) variantGroups[key] = [];
                            variantGroups[key].push(v);
                          });

                          return (
                            <div key={index} className="border border-gray-100 rounded-lg p-2 bg-gray-50/50">
                              <div className="flex items-start gap-2 mb-1.5">
                                <img
                                  src={item.image || 'https://via.placeholder.com/30'}
                                  alt={item.productName}
                                  className="w-8 h-8 rounded object-cover border border-gray-200 flex-shrink-0"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-black truncate">{item.productName}</p>
                                  <p className="text-[10px] text-gray-500">{item.variantItems.length} variants</p>
                                </div>
                                <span className="text-xs font-medium text-black whitespace-nowrap">
                                  ৳{item.variantItems.reduce((sum, v) => {
                                    const vPrice = v.variantDiscountPrice > 0 ? v.variantDiscountPrice : v.variantRegularPrice || v.regularPrice;
                                    return sum + (vPrice * (v.quantity || 0));
                                  }, 0).toFixed(2)}
                                </span>
                              </div>
                              
                              {/* Hierarchical Variant Display */}
                              <div className="space-y-1 ml-10">
                                {Object.entries(variantGroups).map(([variantId, variants]) => {
                                  // Get the parent variant (the one without subVariantId or the first one)
                                  const parentVariant = variants.find(v => !v.isSubVariant);
                                  // If no parent variant found, use the first variant's variantName
                                  const parentName = parentVariant?.variantName || variants[0]?.variantName || 'Variant';
                                  
                                  // Get sub-variants
                                  const subVariants = variants.filter(v => v.isSubVariant);
                                  
                                  // If there are sub-variants, show parent name with sub-variants indented
                                  if (subVariants.length > 0) {
                                    return (
                                      <div key={variantId} className="space-y-0.5">
                                        {/* Parent variant name - show actual name like "White" or "Pink" */}
                                        <div className="text-xs font-medium text-gray-700">
                                          {parentName}
                                        </div>
                                        {/* Sub-variants indented */}
                                        <div className="space-y-0.5 ml-3">
                                          {subVariants.map((variant, vi) => {
                                            const vPrice = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice : variant.variantRegularPrice || variant.regularPrice;
                                            return (
                                              <div key={vi} className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-1.5">
                                                  <span className="text-gray-400 text-[10px]">→</span>
                                                  <span className="text-gray-600 text-[10px]">
                                                    {variant.subVariantName}
                                                  </span>
                                                  {variant.selectedColor && (
                                                    <span className="inline-flex items-center gap-0.5">
                                                      <Circle 
                                                        className="w-2 h-2" 
                                                        style={{ color: variant.selectedColor, fill: variant.selectedColor }} 
                                                      />
                                                    </span>
                                                  )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                  <span className="text-gray-500 text-[10px]">x{variant.quantity}</span>
                                                  <span className="text-black font-medium text-[10px]">
                                                    ৳{(vPrice * variant.quantity).toFixed(2)}
                                                  </span>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  } else {
                                    // No sub-variants - show variants with their actual names
                                    return variants.map((variant, vi) => {
                                      const vPrice = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice : variant.variantRegularPrice || variant.regularPrice;
                                      // Use variantName for display (e.g., "Powder", "Liquid")
                                      const displayName = variant.variantName || 'Variant';
                                      return (
                                        <div key={vi} className="flex items-center justify-between text-xs">
                                          <div className="flex items-center gap-1.5">
                                            <span className="text-gray-600 text-[10px]">
                                              {displayName}
                                            </span>
                                            {variant.selectedColor && (
                                              <span className="inline-flex items-center gap-0.5">
                                                <Circle 
                                                  className="w-2 h-2" 
                                                  style={{ color: variant.selectedColor, fill: variant.selectedColor }} 
                                                />
                                              </span>
                                            )}
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className="text-gray-500 text-[10px]">x{variant.quantity}</span>
                                            <span className="text-black font-medium text-[10px]">
                                              ৳{(vPrice * variant.quantity).toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    });
                                  }
                                })}
                              </div>
                            </div>
                          );
                        } else if (item.hasColors && item.colors) {
                          return (
                            <div key={index} className="border border-gray-100 rounded-lg p-2 bg-gray-50/50">
                              <div className="flex items-start gap-2 mb-1.5">
                                <img
                                  src={item.image || 'https://via.placeholder.com/30'}
                                  alt={item.productName}
                                  className="w-8 h-8 rounded object-cover border border-gray-200 flex-shrink-0"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-black truncate">{item.productName}</p>
                                  <p className="text-[10px] text-gray-500">{item.colors.length} colors</p>
                                </div>
                                <span className="text-xs font-medium text-black whitespace-nowrap">
                                  ৳{item.colors.reduce((sum, c) => sum + ((c.price || price) * c.quantity), 0).toFixed(2)}
                                </span>
                              </div>
                              <div className="space-y-1 ml-10">
                                {item.colors.map((colorInfo, ci) => (
                                  <div key={ci} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5">
                                      <div 
                                        className="w-3 h-3 rounded-full border border-gray-200 flex-shrink-0"
                                        style={{ backgroundColor: colorInfo.color }}
                                      />
                                      <span className="text-gray-600 text-[10px]">{getColorName(colorInfo.color)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-500 text-[10px]">x{colorInfo.quantity}</span>
                                      <span className="text-black font-medium text-[10px]">
                                        ৳{((colorInfo.price || price) * colorInfo.quantity).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div key={index} className="flex items-center justify-between text-xs p-2 border border-gray-100 rounded-lg bg-gray-50/50">
                              <div className="flex items-center gap-2">
                                <img
                                  src={item.image || 'https://via.placeholder.com/30'}
                                  alt={item.productName}
                                  className="w-6 h-6 rounded object-cover border border-gray-200 flex-shrink-0"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/30?text=Product'; }}
                                />
                                <span className="text-gray-700 truncate max-w-[120px]">{item.productName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">x{item.totalQuantity}</span>
                                <span className="text-black font-medium">৳{(price * item.totalQuantity).toFixed(2)}</span>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                  
                  {/* Totals */}
                  <div className="border-t border-gray-200 pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-black">৳{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">৳{shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        inputMode="decimal"
                        value={discount === 0 ? '' : discount}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || /^\d*\.?\d*$/.test(value)) {
                            if (value === '') {
                              setDiscount(0);
                            } else {
                              const numValue = parseFloat(value);
                              if (!isNaN(numValue) && numValue >= 0) {
                                setDiscount(numValue);
                              }
                            }
                          }
                        }}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Discount amount"
                      />
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount Applied</span>
                        <span>- ৳{discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                      <span className="text-black">Total</span>
                      <span className="text-black">৳{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Order Note */}
                  <div className="border-t border-gray-200 pt-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Order Note
                    </label>
                    <textarea
                      value={orderForm.note}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, note: e.target.value }))}
                      rows="2"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                      placeholder="Special instructions for this order..."
                    />
                  </div>
                  
                  {/* Place Order Button */}
                  <button
                    onClick={handlePlaceOrder}
                    disabled={submitting || orderItems.length === 0}
                    className="w-full py-3 bg-[#718369] text-white rounded-lg hover:bg-[#5b6b54] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Place Order
                      </>
                    )}
                  </button>
                  
                  {orderItems.length === 0 && (
                    <p className="text-xs text-orange-500 text-center">
                      Please add at least one product
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}