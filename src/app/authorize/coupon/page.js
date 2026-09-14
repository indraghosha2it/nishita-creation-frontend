


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import NextLink from 'next/link';
// import { 
//   Plus, 
//   X, 
//   Save, 
//   ArrowLeft,
//   Ticket,
//   Percent,
//   DollarSign,
//   Truck,
//   Calendar,
//   Users,
//   ShoppingBag,
//   AlertCircle,
//   Loader2,
//   Hash,
//   Palette,
//   Type,
//   Clock,
//   Infinity,
//   Gift,
//   Tag,
//   Eye,
//   CheckCircle,
//   Minus,
//   Copy,
//   RefreshCw,
//   Settings,
//   Edit,
//   Trash2,
//   Search,
//   Filter,
//   EyeOff,
//   ChevronLeft,
//   ChevronRight,
//   LayoutGrid,
//   List,
//   Power,
//   Info
// } from 'lucide-react';
// import { toast } from 'sonner';

// // Coupon Types
// const DISCOUNT_TYPES = [
//   { value: 'percentage', label: 'Discount %', icon: Percent, color: '#4A8A90', description: 'Apply percentage discount (e.g., 20% off)' },
//   { value: 'fixed', label: 'Fixed Amount', icon: DollarSign, color: '#FFB6C1', description: 'Apply fixed amount discount (e.g., ৳500 off)' },
//   { value: 'free_shipping', label: 'Free Shipping', icon: Truck, color: '#FFD93D', description: 'Free shipping on the order' }
// ];

// // Color Themes
// const COLOR_THEMES = [
//   { name: 'Kids Play', primary: '#4A8A90', secondary: '#D4EDEE', accent: '#FFB6C1', text: '#2D3A5C', bg: '#FFF9F0' },
//   { name: 'Fun Rainbow', primary: '#FF6B6B', secondary: '#FFE0E0', accent: '#4ECDC4', text: '#2D3436', bg: '#FFFFFF' },
//   { name: 'Toy Box', primary: '#F7B731', secondary: '#FFF3E0', accent: '#5C6BC0', text: '#37474F', bg: '#FAFAFA' },
//   { name: 'Magic World', primary: '#9B59B6', secondary: '#F3E5F5', accent: '#FFB6C1', text: '#4A148C', bg: '#FCF8FF' },
//   { name: 'Ocean Adventure', primary: '#1ABC9C', secondary: '#E0F7FA', accent: '#3498DB', text: '#0D3B3B', bg: '#F0FDF4' },
//   { name: 'Space Explorer', primary: '#2C3E50', secondary: '#E8ECF1', accent: '#E67E22', text: '#1A252F', bg: '#F8F9FA' }
// ];

// // Get status config
// const getStatusConfig = (coupon, now = new Date()) => {
//   if (!coupon.isActive) {
//     return { label: 'Inactive', color: 'gray', bg: 'bg-gray-100', text: 'text-gray-600' };
//   }
//   if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
//     return { label: 'Expired', color: 'red', bg: 'bg-red-100', text: 'text-red-700' };
//   }
//   if (coupon.maxTotalUses && coupon.totalUsedCount >= coupon.maxTotalUses) {
//     return { label: 'Used Up', color: 'orange', bg: 'bg-orange-100', text: 'text-orange-700' };
//   }
//   return { label: 'Active', color: 'green', bg: 'bg-green-100', text: 'text-green-700' };
// };

// // Get discount display
// const getDiscountDisplay = (coupon) => {
//   if (coupon.discountType === 'percentage') {
//     return `${coupon.discountValue}% OFF`;
//   } else if (coupon.discountType === 'fixed') {
//     return `৳${coupon.discountValue} OFF`;
//   } else if (coupon.discountType === 'free_shipping') {
//     return 'Free Shipping';
//   }
//   return '-';
// };

// // Format date
// const formatDate = (dateString) => {
//   if (!dateString) return 'No expiry';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
// };

// export default function AdminCouponManager() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState('create'); // 'create', 'list', 'edit', 'view'
//   const [selectedCouponId, setSelectedCouponId] = useState(null);
//   const [viewCoupon, setViewCoupon] = useState(null);
  
//   // ============ CREATE COUPON STATE ============
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [generatedCode, setGeneratedCode] = useState('');
  
//   const [formData, setFormData] = useState({
//     title: '',
//     subtitle: '',
//     spendThreshold: '',
//     highlightText: '',
//     colorTheme: COLOR_THEMES[0],
//     description: '',
//     couponCode: '',
//     discountType: 'percentage',
//     discountValue: '',
//     minimumOrderAmount: '',
//     maxTotalUses: '',
//     maxUsesPerUser: '1',
//     expiresAt: '',
//     isActive: true,
//     showOnHomepage: false,
//     isFirstPurchaseOnly: false,
//     applicableCategories: [],
//     stackable: false,
//     autoApply: false
//   });
  
//   const [couponCodeError, setCouponCodeError] = useState('');
//   const [isCheckingCode, setIsCheckingCode] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [errors, setErrors] = useState({});
  
//   // ============ EDIT COUPON STATE ============
//   const [isEditing, setIsEditing] = useState(false);
//   const [editFormData, setEditFormData] = useState(null);
//   const [editCouponCodeError, setEditCouponCodeError] = useState('');
//   const [isEditCheckingCode, setIsEditCheckingCode] = useState(false);
//   const [editErrors, setEditErrors] = useState({});
//   const [editPreviewMode, setEditPreviewMode] = useState(false);
  
//   // ============ LIST COUPONS STATE ============
//   const [coupons, setCoupons] = useState([]);
//   const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCoupons, setTotalCoupons] = useState(0);
//   const [selectedCoupon, setSelectedCoupon] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
  
//   const itemsPerPage = 10;

//   // Load categories on mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Fetch coupons when on list tab
//   useEffect(() => {
//     if (activeTab === 'list') {
//       fetchCoupons();
//     }
//   }, [activeTab, currentPage, filterStatus, searchTerm]);

//   // Load coupon for edit/view when needed
//   useEffect(() => {
//     if ((activeTab === 'edit' || activeTab === 'view') && selectedCouponId) {
//       fetchSingleCoupon(selectedCouponId);
//     }
//   }, [activeTab, selectedCouponId]);

//   const fetchCategories = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/categories', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setCategories(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const fetchSingleCoupon = async (couponId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/coupons/${couponId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         if (activeTab === 'view') {
//           setViewCoupon(data.data);
//         } else if (activeTab === 'edit') {
//           setEditFormData({
//             title: data.data.title,
//             subtitle: data.data.subtitle || '',
//             spendThreshold: data.data.spendThreshold || '',
//             highlightText: data.data.highlightText,
//             colorTheme: data.data.colorTheme || COLOR_THEMES[0],
//             description: data.data.description || '',
//             couponCode: data.data.couponCode,
//             discountType: data.data.discountType,
//             discountValue: data.data.discountValue.toString(),
//             minimumOrderAmount: data.data.minimumOrderAmount?.toString() || '',
//             maxTotalUses: data.data.maxTotalUses?.toString() || '',
//             maxUsesPerUser: data.data.maxUsesPerUser?.toString() || '1',
//             expiresAt: data.data.expiresAt ? new Date(data.data.expiresAt).toISOString().slice(0, 16) : '',
//             isActive: data.data.isActive,
//             showOnHomepage: data.data.showOnHomepage || false,
//             isFirstPurchaseOnly: data.data.isFirstPurchaseOnly || false,
//             applicableCategories: data.data.applicableCategories || [],
//             stackable: data.data.stackable || false,
//             autoApply: data.data.autoApply || false
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching coupon:', error);
//       toast.error('Failed to load coupon');
//     }
//   };

//   // ============ CREATE COUPON FUNCTIONS ============
//   const generateCouponCode = () => {
//     const prefixes = ['KIDS', 'TOY', 'PLAY', 'FUN', 'GIFT', 'MAGIC', 'HAPPY', 'SMILE'];
//     const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
//     const code = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffix}`;
//     setFormData(prev => ({ ...prev, couponCode: code }));
//     setGeneratedCode(code);
//     setCouponCodeError('');
//   };
  
//   const checkCouponCode = async (code, isEdit = false) => {
//     if (!code || code.length < 3) return;
    
//     if (isEdit) {
//       setIsEditCheckingCode(true);
//     } else {
//       setIsCheckingCode(true);
//     }
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/coupons/check-code?code=${encodeURIComponent(code)}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (isEdit) {
//         if (data.exists && editFormData?.couponCode !== code) {
//           setEditCouponCodeError('This coupon code already exists. Please use a different code.');
//         } else {
//           setEditCouponCodeError('');
//         }
//         setIsEditCheckingCode(false);
//       } else {
//         if (data.exists) {
//           setCouponCodeError('This coupon code already exists. Please use a different code.');
//         } else {
//           setCouponCodeError('');
//         }
//         setIsCheckingCode(false);
//       }
//     } catch (error) {
//       console.error('Error checking coupon code:', error);
//       if (isEdit) {
//         setIsEditCheckingCode(false);
//       } else {
//         setIsCheckingCode(false);
//       }
//     }
//   };
  
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };
  
//   const handleEditChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (editErrors[name]) setEditErrors(prev => ({ ...prev, [name]: null }));
//   };
  
//   const handleEditNumberChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({ ...prev, [name]: value }));
//     if (editErrors[name]) setEditErrors(prev => ({ ...prev, [name]: null }));
//   };
  
//   const handleNumberChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };
  
//   const handleDiscountTypeChange = (type) => {
//     setFormData(prev => ({ ...prev, discountType: type, discountValue: '' }));
//   };
  
//   const handleEditDiscountTypeChange = (type) => {
//     setEditFormData(prev => ({ ...prev, discountType: type, discountValue: '' }));
//   };
  
//   const handleColorThemeChange = (theme) => {
//     setFormData(prev => ({ ...prev, colorTheme: theme }));
//   };
  
//   const handleEditColorThemeChange = (theme) => {
//     setEditFormData(prev => ({ ...prev, colorTheme: theme }));
//   };
  
//   const validateForm = (isEdit = false) => {
//     const data = isEdit ? editFormData : formData;
//     const newErrors = {};
    
//     if (!data?.title?.trim()) newErrors.title = 'Coupon title is required';
//     if (!data?.highlightText?.trim()) newErrors.highlightText = 'Highlight text is required';
    
//     if (!data?.couponCode?.trim()) {
//       newErrors.couponCode = 'Coupon code is required';
//     } else if (data.couponCode.length < 3) {
//       newErrors.couponCode = 'Coupon code must be at least 3 characters';
//     } else if (isEdit ? editCouponCodeError : couponCodeError) {
//       newErrors.couponCode = isEdit ? editCouponCodeError : couponCodeError;
//     }
    
//     if (data.discountType !== 'free_shipping') {
//       if (!data.discountValue || parseFloat(data.discountValue) <= 0) {
//         newErrors.discountValue = 'Discount value is required and must be greater than 0';
//       }
//       if (data.discountType === 'percentage' && parseFloat(data.discountValue) > 100) {
//         newErrors.discountValue = 'Percentage discount cannot exceed 100%';
//       }
//     }
    
//     if (data.expiresAt) {
//       const expiryDate = new Date(data.expiresAt);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (expiryDate < today) newErrors.expiresAt = 'Expiry date cannot be in the past';
//     }
    
//     if (data.maxUsesPerUser && parseFloat(data.maxUsesPerUser) < 1) {
//       newErrors.maxUsesPerUser = 'Max uses per user must be at least 1';
//     }
    
//     if (data.maxTotalUses && parseFloat(data.maxTotalUses) < 1) {
//       newErrors.maxTotalUses = 'Max total uses must be at least 1';
//     }
    
//     if (isEdit) {
//       setEditErrors(newErrors);
//     } else {
//       setErrors(newErrors);
//     }
//     return Object.keys(newErrors).length === 0;
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm(false)) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }
    
//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const payload = {
//         title: formData.title,
//         subtitle: formData.subtitle,
//         spendThreshold: formData.spendThreshold,
//         highlightText: formData.highlightText,
//         colorTheme: {
//           primary: formData.colorTheme.primary,
//           secondary: formData.colorTheme.secondary,
//           accent: formData.colorTheme.accent,
//           text: formData.colorTheme.text,
//           bg: formData.colorTheme.bg
//         },
//         description: formData.description,
//         couponCode: formData.couponCode.toUpperCase(),
//         discountType: formData.discountType,
//         discountValue: formData.discountType !== 'free_shipping' ? parseFloat(formData.discountValue) : 0,
//         minimumOrderAmount: formData.minimumOrderAmount ? parseFloat(formData.minimumOrderAmount) : 0,
//         maxTotalUses: formData.maxTotalUses ? parseFloat(formData.maxTotalUses) : null,
//         maxUsesPerUser: formData.maxUsesPerUser ? parseFloat(formData.maxUsesPerUser) : 1,
//         expiresAt: formData.expiresAt || null,
//         isActive: formData.isActive,
//         showOnHomepage: formData.showOnHomepage,
//         isFirstPurchaseOnly: formData.isFirstPurchaseOnly,
//         applicableCategories: formData.applicableCategories,
//         stackable: formData.stackable,
//         autoApply: formData.autoApply
//       };
      
//       const response = await fetch('http://localhost:5000/api/coupons', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Coupon "${formData.couponCode}" created successfully!`);
//         setFormData({
//           title: '',
//           subtitle: '',
//           spendThreshold: '',
//           highlightText: '',
//           colorTheme: COLOR_THEMES[0],
//           description: '',
//           couponCode: '',
//           discountType: 'percentage',
//           discountValue: '',
//           minimumOrderAmount: '',
//           maxTotalUses: '',
//           maxUsesPerUser: '1',
//           expiresAt: '',
//           isActive: true,
//           showOnHomepage: false,
//           isFirstPurchaseOnly: false,
//           applicableCategories: [],
//           stackable: false,
//           autoApply: false
//         });
//         setCouponCodeError('');
//         setActiveTab('list');
//         fetchCoupons();
//       } else {
//         toast.error(data.error || 'Failed to create coupon');
//       }
//     } catch (error) {
//       console.error('Error creating coupon:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm(true)) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }
    
//     setIsEditing(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const payload = {
//         title: editFormData.title,
//         subtitle: editFormData.subtitle,
//         spendThreshold: editFormData.spendThreshold,
//         highlightText: editFormData.highlightText,
//         colorTheme: {
//           primary: editFormData.colorTheme.primary,
//           secondary: editFormData.colorTheme.secondary,
//           accent: editFormData.colorTheme.accent,
//           text: editFormData.colorTheme.text,
//           bg: editFormData.colorTheme.bg
//         },
//         description: editFormData.description,
//         couponCode: editFormData.couponCode.toUpperCase(),
//         discountType: editFormData.discountType,
//         discountValue: editFormData.discountType !== 'free_shipping' ? parseFloat(editFormData.discountValue) : 0,
//         minimumOrderAmount: editFormData.minimumOrderAmount ? parseFloat(editFormData.minimumOrderAmount) : 0,
//         maxTotalUses: editFormData.maxTotalUses ? parseFloat(editFormData.maxTotalUses) : null,
//         maxUsesPerUser: editFormData.maxUsesPerUser ? parseFloat(editFormData.maxUsesPerUser) : 1,
//         expiresAt: editFormData.expiresAt || null,
//         isActive: editFormData.isActive,
//         showOnHomepage: editFormData.showOnHomepage,
//         isFirstPurchaseOnly: editFormData.isFirstPurchaseOnly,
//         applicableCategories: editFormData.applicableCategories,
//         stackable: editFormData.stackable,
//         autoApply: editFormData.autoApply
//       };
      
//       const response = await fetch(`http://localhost:5000/api/coupons/${selectedCouponId}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Coupon "${editFormData.couponCode}" updated successfully!`);
//         setActiveTab('list');
//         fetchCoupons();
//       } else {
//         toast.error(data.error || 'Failed to update coupon');
//       }
//     } catch (error) {
//       console.error('Error updating coupon:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsEditing(false);
//     }
//   };
  
//   // ============ LIST COUPONS FUNCTIONS ============
//   const fetchCoupons = async () => {
//     setIsLoadingCoupons(true);
//     try {
//       const token = localStorage.getItem('token');
//       let url = `http://localhost:5000/api/coupons?page=${currentPage}&limit=${itemsPerPage}`;
      
//       if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
//       if (filterStatus !== 'all') {
//         if (filterStatus === 'active') url += '&isActive=true';
//         if (filterStatus === 'inactive') url += '&isActive=false';
//       }
      
//       const response = await fetch(url, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCoupons(data.data);
//         setTotalPages(data.pagination?.pages || 1);
//         setTotalCoupons(data.pagination?.total || 0);
//       } else {
//         toast.error(data.error || 'Failed to fetch coupons');
//       }
//     } catch (error) {
//       console.error('Error fetching coupons:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsLoadingCoupons(false);
//     }
//   };

//   const handleDeleteClick = (coupon) => {
//     setSelectedCoupon(coupon);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!selectedCoupon) return;
    
//     setIsDeleting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/coupons/${selectedCoupon._id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Coupon "${selectedCoupon.couponCode}" deleted successfully`);
//         fetchCoupons();
//       } else {
//         toast.error(data.error || 'Failed to delete coupon');
//       }
//     } catch (error) {
//       console.error('Error deleting coupon:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsDeleting(false);
//       setShowDeleteModal(false);
//       setSelectedCoupon(null);
//     }
//   };

//   const handleToggleStatus = async (coupon) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/coupons/${coupon._id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ isActive: !coupon.isActive })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Coupon ${!coupon.isActive ? 'activated' : 'deactivated'} successfully`);
//         fetchCoupons();
//       } else {
//         toast.error(data.error || 'Failed to update coupon status');
//       }
//     } catch (error) {
//       console.error('Error toggling coupon status:', error);
//       toast.error('Network error. Please try again.');
//     }
//   };

//   const handleDuplicate = async (coupon) => {
//     try {
//       const token = localStorage.getItem('token');
//       const newCode = `${coupon.couponCode}_COPY${Math.floor(Math.random() * 1000)}`;
      
//       const payload = {
//         title: `${coupon.title} (Copy)`,
//         subtitle: coupon.subtitle,
//         spendThreshold: coupon.spendThreshold,
//         highlightText: coupon.highlightText,
//         colorTheme: coupon.colorTheme,
//         description: coupon.description,
//         couponCode: newCode,
//         discountType: coupon.discountType,
//         discountValue: coupon.discountValue,
//         minimumOrderAmount: coupon.minimumOrderAmount,
//         maxTotalUses: coupon.maxTotalUses,
//         maxUsesPerUser: coupon.maxUsesPerUser,
//         expiresAt: coupon.expiresAt,
//         isActive: false,
//         showOnHomepage: false,
//         isFirstPurchaseOnly: coupon.isFirstPurchaseOnly,
//         stackable: coupon.stackable,
//         autoApply: coupon.autoApply
//       };
      
//       const response = await fetch('http://localhost:5000/api/coupons', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(`Coupon duplicated as "${newCode}"`);
//         fetchCoupons();
//       } else {
//         toast.error(data.error || 'Failed to duplicate coupon');
//       }
//     } catch (error) {
//       console.error('Error duplicating coupon:', error);
//       toast.error('Network error. Please try again.');
//     }
//   };

//   const handleCopyCode = (code) => {
//     navigator.clipboard.writeText(code);
//     toast.success('Coupon code copied to clipboard');
//   };

//   // Get discount icon for preview
//   const getDiscountIcon = (discountType, isEdit = false) => {
//     const type = isEdit ? editFormData?.discountType : discountType;
//     const discountTypeObj = DISCOUNT_TYPES.find(d => d.value === type);
//     if (discountTypeObj) {
//       const Icon = discountTypeObj.icon;
//       return <Icon className="w-4 h-4" />;
//     }
//     return <Percent className="w-4 h-4" />;
//   };
  
//   const getDiscountDisplayText = (isEdit = false) => {
//     const data = isEdit ? editFormData : formData;
//     if (data?.discountType === 'percentage' && data?.discountValue) {
//       return `${data.discountValue}% OFF`;
//     } else if (data?.discountType === 'fixed' && data?.discountValue) {
//       return `৳${data.discountValue} OFF`;
//     } else if (data?.discountType === 'free_shipping') {
//       return 'FREE SHIPPING';
//     }
//     return '';
//   };

//   // Render coupon preview card (reusable)
//   const CouponPreviewCard = ({ data, isEdit = false }) => {
//     const theme = data?.colorTheme || COLOR_THEMES[0];
//     const discountText = isEdit ? getDiscountDisplayText(true) : getDiscountDisplayText();
//     const discountIcon = isEdit ? getDiscountIcon(editFormData?.discountType, true) : getDiscountIcon(formData.discountType);
    
//     return (
//       <div className="max-w-md mx-auto">
//         <div className="relative">
//           <div 
//             className="relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl"
//             style={{ 
//               background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg} 100%)`,
//               border: `2px dashed ${theme.primary}`,
//             }}
//           >
//             <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-50 rounded-b-full" style={{ backgroundColor: '#F9FAFB' }}></div>
            
//             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-2xl" style={{ borderColor: theme.primary }}></div>
//             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-2xl" style={{ borderColor: theme.primary }}></div>
//             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-2xl" style={{ borderColor: theme.primary }}></div>
//             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-2xl" style={{ borderColor: theme.primary }}></div>
            
//             <div className="p-6">
//               {data?.subtitle && (
//                 <div className="absolute -top-2 right-6">
//                   <div className="relative">
//                     <div className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-md" style={{ backgroundColor: theme.accent }}>
//                       {data.subtitle}
//                     </div>
//                     <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent" style={{ borderTopColor: theme.accent }}></div>
//                   </div>
//                 </div>
//               )}
              
//               <div className="text-center mb-3">
//                 <span className="text-xs tracking-wider font-semibold uppercase opacity-70" style={{ color: theme.primary }}>
//                   🎁 Toy Store Bangladesh
//                 </span>
//               </div>
              
//               {discountText && (
//                 <div className="flex justify-center mb-4">
//                   <div 
//                     className="relative w-28 h-28 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300"
//                     style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)` }}
//                   >
//                     <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center">
//                       {data?.discountType === 'percentage' && (
//                         <>
//                           <span className="text-2xl font-black text-white">{data.discountValue}</span>
//                           <span className="text-xs font-bold text-white">% OFF</span>
//                         </>
//                       )}
//                       {data?.discountType === 'fixed' && (
//                         <>
//                           <span className="text-xl font-black text-white">৳{data.discountValue}</span>
//                           <span className="text-xs font-bold text-white">OFF</span>
//                         </>
//                       )}
//                       {data?.discountType === 'free_shipping' && (
//                         <>
//                           <span className="text-xl font-black text-white">FREE</span>
//                           <span className="text-xs font-bold text-white">SHIPPING</span>
//                         </>
//                       )}
//                     </div>
//                     <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: theme.primary }}></div>
//                   </div>
//                 </div>
//               )}
              
//               <div className="text-center mb-4">
//                 <h3 className="text-xl font-bold mb-1" style={{ color: theme.text }}>
//                   {data?.title || 'COUPON TITLE'}
//                 </h3>
//                 <div className="h-0.5 w-12 mx-auto rounded-full" style={{ backgroundColor: theme.primary }}></div>
//               </div>
              
//               <div className="space-y-2 mb-4">
//                 {data?.spendThreshold && (
//                   <div className="flex items-center justify-center gap-2 text-xs">
//                     <span>💰</span>
//                     <span className="font-medium" style={{ color: theme.text }}>{data.spendThreshold}</span>
//                   </div>
//                 )}
//                 {data?.minimumOrderAmount && parseFloat(data.minimumOrderAmount) > 0 && (
//                   <div className="flex items-center justify-center gap-2 text-xs">
//                     <span>🛒</span>
//                     <span className="font-medium" style={{ color: theme.text }}>Minimum Purchase: ৳{data.minimumOrderAmount}</span>
//                   </div>
//                 )}
//               </div>
              
//               <div className="relative my-4">
//                 <div className="relative flex justify-center">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-dashed" style={{ borderColor: theme.primary }}></div>
//                   </div>
//                   <div className="relative flex justify-center text-xs">
//                     <span className="px-3 bg-white text-gray-400" style={{ backgroundColor: theme.bg }}>COUPON CODE</span>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <div className="flex items-center justify-between p-3 rounded-xl border-2 shadow-inner" style={{ backgroundColor: theme.secondary, borderColor: theme.primary }}>
//                     <code className="text-base font-mono font-bold tracking-wider" style={{ color: theme.primary }}>
//                       {data?.couponCode || 'COUPON123'}
//                     </code>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         if (data?.couponCode) {
//                           navigator.clipboard.writeText(data.couponCode);
//                           toast.success('Code copied!');
//                         }
//                       }}
//                       className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg transition-all hover:scale-105"
//                       style={{ backgroundColor: theme.primary, color: 'white' }}
//                     >
//                       <Copy className="w-3 h-3" />
//                       Copy
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="text-center mt-4 pt-3 border-t" style={{ borderColor: theme.secondary }}>
//                 {data?.expiresAt && (
//                   <p className="text-xs opacity-60" style={{ color: theme.text }}>
//                     ⏰ Valid until {new Date(data.expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//                   </p>
//                 )}
//                 <p className="text-[10px] opacity-40 mt-2" style={{ color: theme.text }}>
//                   Terms & conditions apply
//                 </p>
//               </div>
//             </div>
            
//             <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-50 rounded-t-full" style={{ backgroundColor: '#F9FAFB' }}></div>
//           </div>
//           <div className="absolute -bottom-2 left-2 right-2 h-2 bg-black/5 rounded-full blur-sm"></div>
//         </div>
//       </div>
//     );
//   };

//   // Render form fields (reusable)
//   const renderFormFields = (isEdit = false) => {
//     const data = isEdit ? editFormData : formData;
//     const setData = isEdit ? setEditFormData : setFormData;
//     const discountTypeChange = isEdit ? handleEditDiscountTypeChange : handleDiscountTypeChange;
//     const colorThemeChange = isEdit ? handleEditColorThemeChange : handleColorThemeChange;
//     const couponCodeErrorField = isEdit ? editCouponCodeError : couponCodeError;
//     const isChecking = isEdit ? isEditCheckingCode : isCheckingCode;
//     const formErrors = isEdit ? editErrors : errors;
    
//     return (
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={data?.title || ''}
//             onChange={isEdit ? handleEditChange : handleChange}
//             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
//               formErrors.title ? 'border-red-500' : 'border-gray-300'
//             }`}
//             placeholder="e.g., Summer Sale Extravaganza"
//           />
//           {formErrors.title && <p className="text-xs text-red-600 mt-1">{formErrors.title}</p>}
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Subtitle / Badge <span className="text-gray-400 text-xs">(Optional)</span>
//           </label>
//           <input
//             type="text"
//             name="subtitle"
//             value={data?.subtitle || ''}
//             onChange={isEdit ? handleEditChange : handleChange}
//             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
//             placeholder="e.g., Limited Time Offer"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Spend Threshold Display Text <span className="text-gray-400 text-xs">(Optional)</span>
//           </label>
//           <input
//             type="text"
//             name="spendThreshold"
//             value={data?.spendThreshold || ''}
//             onChange={isEdit ? handleEditChange : handleChange}
//             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
//             placeholder="e.g., Spend ৳2000 or more"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Highlight Text <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="highlightText"
//             value={data?.highlightText || ''}
//             onChange={isEdit ? handleEditChange : handleChange}
//             className={`w-full px-3 py-2 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
//               formErrors.highlightText ? 'border-red-500' : 'border-gray-300'
//             }`}
//             placeholder="e.g., UP TO 50% OFF"
//           />
//           {formErrors.highlightText && <p className="text-xs text-red-600 mt-1">{formErrors.highlightText}</p>}
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Color Theme
//           </label>
//           <div className="grid grid-cols-3 gap-3">
//             {COLOR_THEMES.map((theme, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => colorThemeChange(theme)}
//                 className={`p-3 rounded-lg border-2 transition-all ${
//                   data?.colorTheme?.name === theme.name
//                     ? 'border-teal-500 shadow-md'
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}
//                 style={{ backgroundColor: theme.bg }}
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }} />
//                   <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.secondary }} />
//                   <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }} />
//                 </div>
//                 <p className="text-xs font-medium" style={{ color: theme.text }}>{theme.name}</p>
//               </button>
//             ))}
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Description <span className="text-gray-400 text-xs">(Optional)</span>
//           </label>
//           <textarea
//             name="description"
//             value={data?.description || ''}
//             onChange={isEdit ? handleEditChange : handleChange}
//             rows="3"
//             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
//             placeholder="Describe the coupon terms and conditions..."
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Coupon Code <span className="text-red-500">*</span>
//           </label>
//           <div className="flex gap-2">
//             <div className="flex-1 relative">
//               <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 name="couponCode"
//                 value={data?.couponCode || ''}
//                 onChange={(e) => {
//                   const value = e.target.value.toUpperCase();
//                   setData(prev => ({ ...prev, couponCode: value }));
//                   checkCouponCode(value, isEdit);
//                 }}
//                 className={`w-full pl-9 pr-3 py-2 text-sm font-mono border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
//                   formErrors.couponCode || couponCodeErrorField ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="SUMMER2024"
//               />
//             </div>
//             {!isEdit && (
//               <button
//                 type="button"
//                 onClick={generateCouponCode}
//                 className="px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Generate
//               </button>
//             )}
//           </div>
//           {(formErrors.couponCode || couponCodeErrorField) && (
//             <p className="text-xs text-red-600 mt-1">{formErrors.couponCode || couponCodeErrorField}</p>
//           )}
//           {isChecking && <p className="text-xs text-gray-500 mt-1">Checking availability...</p>}
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Discount Type <span className="text-red-500">*</span>
//           </label>
//           <div className="grid grid-cols-3 gap-3">
//             {DISCOUNT_TYPES.map(type => {
//               const Icon = type.icon;
//               return (
//                 <button
//                   key={type.value}
//                   type="button"
//                   onClick={() => discountTypeChange(type.value)}
//                   className={`p-3 rounded-lg border-2 text-center transition-all ${
//                     data?.discountType === type.value
//                       ? 'border-teal-500 shadow-md'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                   style={data?.discountType === type.value ? { backgroundColor: `${type.color}10` } : {}}
//                 >
//                   <Icon className={`w-5 h-5 mx-auto mb-1`} style={{ color: type.color }} />
//                   <p className="text-xs font-medium" style={{ color: type.color }}>{type.label}</p>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
        
//         {data?.discountType !== 'free_shipping' && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               {data?.discountType === 'percentage' ? 'Discount Percentage (%)' : 'Discount Amount (৳)'}
//               <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               {data?.discountType === 'percentage' ? (
//                 <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               ) : (
//                 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               )}
//               <input
//                 type="number"
//                 name="discountValue"
//                 value={data?.discountValue || ''}
//                 onChange={isEdit ? handleEditNumberChange : handleNumberChange}
//                 onWheel={(e) => e.target.blur()}
//                 min="0"
//                 step={data?.discountType === 'percentage' ? '1' : '10'}
//                 className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
//                   formErrors.discountValue ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder={data?.discountType === 'percentage' ? 'e.g., 25' : 'e.g., 500'}
//               />
//             </div>
//             {formErrors.discountValue && <p className="text-xs text-red-600 mt-1">{formErrors.discountValue}</p>}
//           </div>
//         )}
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Minimum Order Amount (৳)
//           </label>
//           <div className="relative">
//             <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="number"
//               name="minimumOrderAmount"
//               value={data?.minimumOrderAmount || ''}
//               onChange={isEdit ? handleEditNumberChange : handleNumberChange}
//               onWheel={(e) => e.target.blur()}
//               min="0"
//               step="100"
//               className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
//               placeholder="e.g., 1000"
//             />
//           </div>
//         </div>
        
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Max Total Uses
//             </label>
//             <div className="relative">
//               <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="number"
//                 name="maxTotalUses"
//                 value={data?.maxTotalUses || ''}
//                 onChange={isEdit ? handleEditNumberChange : handleNumberChange}
//                 onWheel={(e) => e.target.blur()}
//                 min="1"
//                 className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
//                 placeholder="Unlimited"
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Max Uses Per User
//             </label>
//             <div className="relative">
//               <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="number"
//                 name="maxUsesPerUser"
//                 value={data?.maxUsesPerUser || '1'}
//                 onChange={isEdit ? handleEditNumberChange : handleNumberChange}
//                 onWheel={(e) => e.target.blur()}
//                 min="1"
//                 className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
//               />
//             </div>
//             {formErrors.maxUsesPerUser && <p className="text-xs text-red-600 mt-1">{formErrors.maxUsesPerUser}</p>}
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Expires At
//           </label>
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="datetime-local"
//               name="expiresAt"
//               value={data?.expiresAt || ''}
//               onChange={isEdit ? handleEditChange : handleChange}
//               className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
//                 formErrors.expiresAt ? 'border-red-500' : 'border-gray-300'
//               }`}
//             />
//           </div>
//           {formErrors.expiresAt && <p className="text-xs text-red-600 mt-1">{formErrors.expiresAt}</p>}
//         </div>
        
//         <div className="space-y-3 pt-2">
//           <label className="flex items-center gap-3 cursor-pointer">
//             <input
//               type="checkbox"
//               name="isActive"
//               checked={data?.isActive || false}
//               onChange={isEdit ? handleEditChange : handleChange}
//               className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
//             />
//             <div>
//               <span className="text-sm font-medium text-gray-700">Active</span>
//               <p className="text-xs text-gray-500">Coupon is available for customers to use</p>
//             </div>
//           </label>
          
//           <label className="flex items-center gap-3 cursor-pointer">
//             <input
//               type="checkbox"
//               name="showOnHomepage"
//               checked={data?.showOnHomepage || false}
//               onChange={isEdit ? handleEditChange : handleChange}
//               className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
//             />
//             <div>
//               <span className="text-sm font-medium text-gray-700">Show on Homepage</span>
//               <p className="text-xs text-gray-500">Display this coupon in the homepage promotions section</p>
//             </div>
//           </label>
          
//           <label className="flex items-center gap-3 cursor-pointer">
//             <input
//               type="checkbox"
//               name="isFirstPurchaseOnly"
//               checked={data?.isFirstPurchaseOnly || false}
//               onChange={isEdit ? handleEditChange : handleChange}
//               className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
//             />
//             <div>
//               <span className="text-sm font-medium text-gray-700">First Purchase Only</span>
//               <p className="text-xs text-gray-500">Applicable only for customers making their first purchase</p>
//             </div>
//           </label>
          
//           <label className="flex items-center gap-3 cursor-pointer">
//             <input
//               type="checkbox"
//               name="stackable"
//               checked={data?.stackable || false}
//               onChange={isEdit ? handleEditChange : handleChange}
//               className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
//             />
//             <div>
//               <span className="text-sm font-medium text-gray-700">Stackable</span>
//               <p className="text-xs text-gray-500">Can be combined with other coupons</p>
//             </div>
//           </label>
          
//           <label className="flex items-center gap-3 cursor-pointer">
//             <input
//               type="checkbox"
//               name="autoApply"
//               checked={data?.autoApply || false}
//               onChange={isEdit ? handleEditChange : handleChange}
//               className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
//             />
//             <div>
//               <span className="text-sm font-medium text-gray-700">Auto Apply</span>
//               <p className="text-xs text-gray-500">Automatically apply to eligible carts without code entry</p>
//             </div>
//           </label>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <NextLink href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </NextLink>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <Ticket className="w-6 h-6 text-teal-600" />
//                   <h1 className="text-xl font-bold text-gray-800">
//                     Coupon Manager
//                   </h1>
//                   <span className="px-2 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-700">
//                     {totalCoupons} Total Coupons
//                   </span>
//                 </div>
              
//               </div>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-1 mt-4 border-b border-gray-200">
//             <button
//               onClick={() => {
//                 setActiveTab('create');
//                 setSelectedCouponId(null);
//               }}
//               className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
//                 activeTab === 'create'
//                   ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
//                   : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <Plus className="w-4 h-4" />
//               Create Coupon
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('list');
//                 setSelectedCouponId(null);
//               }}
//               className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
//                 activeTab === 'list'
//                   ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
//                   : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <List className="w-4 h-4" />
//               All Coupons
//               {totalCoupons > 0 && (
//                 <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-200 rounded-full">{totalCoupons}</span>
//               )}
//             </button>
//             {activeTab === 'edit' && (
//               <button
//                 onClick={() => setActiveTab('list')}
//                 className="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 bg-teal-50 text-teal-700 border-b-2 border-teal-600"
//               >
//                 <Edit className="w-4 h-4" />
//                 Edit Coupon
//               </button>
//             )}
//             {activeTab === 'view' && (
//               <button
//                 onClick={() => setActiveTab('list')}
//                 className="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 bg-teal-50 text-teal-700 border-b-2 border-teal-600"
//               >
//                 <Eye className="w-4 h-4" />
//                 View Coupon
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Content based on active tab */}
//       <div className="p-6">
//         {activeTab === 'create' && (
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <div className="lg:col-span-2 space-y-6">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   <div className="p-5 bg-gray-50 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//                       <Palette className="w-5 h-5 text-teal-600" />
//                       Display Settings
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Configure how your coupon appears to customers</p>
//                   </div>
//                   <div className="p-5">
//                     {renderFormFields(false)}
//                   </div>
//                 </div>
                
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   <div className="p-5 bg-gray-50 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//                       <Settings className="w-5 h-5 text-teal-600" />
//                       Additional Settings
//                     </h2>
//                   </div>
//                   <div className="p-5">
//                     {/* Additional settings already included in renderFormFields */}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-6">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
//                     <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
//                       <Eye className="w-4 h-4 text-teal-600" />
//                       Coupon Preview
//                     </h3>
//                     <button
//                       type="button"
//                       onClick={() => setPreviewMode(!previewMode)}
//                       className="text-xs text-teal-600 hover:text-teal-700"
//                     >
//                       {previewMode ? 'Hide' : 'Show'} Preview
//                     </button>
//                   </div>
//                   {previewMode && (
//                     <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
//                       <CouponPreviewCard data={formData} isEdit={false} />
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   <div className="p-4 border-b border-gray-200 bg-gray-50">
//                     <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
//                       <Ticket className="w-4 h-4 text-teal-600" />
//                       Coupon Summary
//                     </h3>
//                   </div>
//                   <div className="p-4 space-y-3">
//                     <div className="flex justify-between text-sm py-1 border-b border-gray-100">
//                       <span className="text-gray-500">Title:</span>
//                       <span className="font-medium text-gray-700">{formData.title || 'Not set'}</span>
//                     </div>
//                     <div className="flex justify-between text-sm py-1 border-b border-gray-100">
//                       <span className="text-gray-500">Code:</span>
//                       <span className="font-mono font-bold text-teal-600">{formData.couponCode || 'Not generated'}</span>
//                     </div>
//                     <div className="flex justify-between text-sm py-1 border-b border-gray-100">
//                       <span className="text-gray-500">Discount:</span>
//                       <span className="font-medium text-green-600">{getDiscountDisplayText() || 'Not set'}</span>
//                     </div>
//                     <div className="flex justify-between text-sm py-1 border-b border-gray-100">
//                       <span className="text-gray-500">Min. Order:</span>
//                       <span className="font-medium">
//                         {formData.minimumOrderAmount && parseFloat(formData.minimumOrderAmount) > 0 ? `৳${formData.minimumOrderAmount}` : 'No minimum'}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-sm py-1 border-b border-gray-100">
//                       <span className="text-gray-500">Per User:</span>
//                       <span className="font-medium">{formData.maxUsesPerUser || 1} time(s)</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Status:</span>
//                       <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
//                         formData.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {formData.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-8 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setFormData({
//                     title: '',
//                     subtitle: '',
//                     spendThreshold: '',
//                     highlightText: '',
//                     colorTheme: COLOR_THEMES[0],
//                     description: '',
//                     couponCode: '',
//                     discountType: 'percentage',
//                     discountValue: '',
//                     minimumOrderAmount: '',
//                     maxTotalUses: '',
//                     maxUsesPerUser: '1',
//                     expiresAt: '',
//                     isActive: true,
//                     showOnHomepage: false,
//                     isFirstPurchaseOnly: false,
//                     applicableCategories: [],
//                     stackable: false,
//                     autoApply: false
//                   });
//                   setCouponCodeError('');
//                 }}
//                 className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//               >
//                 Clear Form
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
//               >
//                 {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                 {isSubmitting ? 'Creating...' : 'Create Coupon'}
//               </button>
//             </div>
//           </form>
//         )}
        
//         {activeTab === 'edit' && editFormData && (
//           <form onSubmit={handleEditSubmit}>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <div className="lg:col-span-2 space-y-6">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   <div className="p-5 bg-gray-50 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//                       <Edit className="w-5 h-5 text-teal-600" />
//                       Edit Coupon
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Modify your coupon details</p>
//                   </div>
//                   <div className="p-5">
//                     {renderFormFields(true)}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-6">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
//                     <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
//                       <Eye className="w-4 h-4 text-teal-600" />
//                       Coupon Preview
//                     </h3>
//                     <button
//                       type="button"
//                       onClick={() => setEditPreviewMode(!editPreviewMode)}
//                       className="text-xs text-teal-600 hover:text-teal-700"
//                     >
//                       {editPreviewMode ? 'Hide' : 'Show'} Preview
//                     </button>
//                   </div>
//                   {editPreviewMode && (
//                     <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
//                       <CouponPreviewCard data={editFormData} isEdit={true} />
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   <div className="p-4 border-b border-gray-200 bg-gray-50">
//                     <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
//                       <Ticket className="w-4 h-4 text-teal-600" />
//                       Coupon Summary
//                     </h3>
//                   </div>
//                   <div className="p-4 space-y-3">
//                     <div className="flex justify-between text-sm py-1 border-b border-gray-100">
//                       <span className="text-gray-500">Title:</span>
//                       <span className="font-medium text-gray-700">{editFormData.title || 'Not set'}</span>
//                     </div>
//                     <div className="flex justify-between text-sm py-1 border-b border-gray-100">
//                       <span className="text-gray-500">Code:</span>
//                       <span className="font-mono font-bold text-teal-600">{editFormData.couponCode || 'Not generated'}</span>
//                     </div>
//                     <div className="flex justify-between text-sm py-1 border-b border-gray-100">
//                       <span className="text-gray-500">Discount:</span>
//                       <span className="font-medium text-green-600">{getDiscountDisplayText(true) || 'Not set'}</span>
//                     </div>
//                     <div className="flex justify-between text-sm py-1 border-b border-gray-100">
//                       <span className="text-gray-500">Min. Order:</span>
//                       <span className="font-medium">
//                         {editFormData.minimumOrderAmount && parseFloat(editFormData.minimumOrderAmount) > 0 ? `৳${editFormData.minimumOrderAmount}` : 'No minimum'}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-sm py-1 border-b border-gray-100">
//                       <span className="text-gray-500">Per User:</span>
//                       <span className="font-medium">{editFormData.maxUsesPerUser || 1} time(s)</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Status:</span>
//                       <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
//                         editFormData.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {editFormData.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-8 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setActiveTab('list')}
//                 className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isEditing}
//                 className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
//               >
//                 {isEditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                 {isEditing ? 'Updating...' : 'Update Coupon'}
//               </button>
//             </div>
//           </form>
//         )}
        
//    {activeTab === 'view' && viewCoupon && (
//   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//     {/* Left Column - All Details */}
//     <div className="space-y-6">
//       {/* Basic Information */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="p-5 bg-gray-50 border-b border-gray-200">
//           <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//             <Info className="w-5 h-5 text-teal-600" />
//             Coupon Details
//           </h2>
//         </div>
//         <div className="p-5">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Title</label>
//               <p className="text-sm font-medium text-gray-900 mt-1">{viewCoupon.title || '-'}</p>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Coupon Code</label>
//               <div className="flex items-center gap-2 mt-1">
//                 <code className="text-sm font-mono font-bold text-teal-600">{viewCoupon.couponCode}</code>
//                 <button onClick={() => handleCopyCode(viewCoupon.couponCode)} className="p-1 text-gray-400 hover:text-gray-600">
//                   <Copy className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>
//             {viewCoupon.subtitle && (
//               <div>
//                 <label className="text-xs text-gray-500 uppercase tracking-wider">Badge / Subtitle</label>
//                 <p className="text-sm text-gray-700 mt-1">{viewCoupon.subtitle}</p>
//               </div>
//             )}
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Highlight Text</label>
//               <p className="text-sm font-bold text-gray-900 mt-1">{viewCoupon.highlightText || '-'}</p>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Status</label>
//               <div className="mt-1">
//                 <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                   getStatusConfig(viewCoupon).bg
//                 } ${getStatusConfig(viewCoupon).text}`}>
//                   {getStatusConfig(viewCoupon).label}
//                 </span>
//               </div>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Discount Type</label>
//               <p className="text-sm font-semibold text-green-600 mt-1">{getDiscountDisplay(viewCoupon)}</p>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Discount Value</label>
//               <p className="text-sm text-gray-700 mt-1">
//                 {viewCoupon.discountType === 'percentage' && `${viewCoupon.discountValue}%`}
//                 {viewCoupon.discountType === 'fixed' && `৳${viewCoupon.discountValue}`}
//                 {viewCoupon.discountType === 'free_shipping' && 'Free Shipping'}
//               </p>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Minimum Order Amount</label>
//               <p className="text-sm text-gray-700 mt-1">
//                 {viewCoupon.minimumOrderAmount > 0 ? `৳${viewCoupon.minimumOrderAmount}` : 'No minimum'}
//               </p>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Max Total Uses</label>
//               <p className="text-sm text-gray-700 mt-1">{viewCoupon.maxTotalUses || 'Unlimited'}</p>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Max Uses Per User</label>
//               <p className="text-sm text-gray-700 mt-1">{viewCoupon.maxUsesPerUser} time(s)</p>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Total Used Count</label>
//               <p className="text-sm text-gray-700 mt-1">{viewCoupon.totalUsedCount || 0}</p>
//               {viewCoupon.maxTotalUses && (
//                 <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
//                   <div 
//                     className="bg-teal-600 h-1.5 rounded-full"
//                     style={{ width: `${Math.min((viewCoupon.totalUsedCount / viewCoupon.maxTotalUses) * 100, 100)}%` }}
//                   ></div>
//                 </div>
//               )}
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Expiry Date</label>
//               <p className="text-sm text-gray-700 mt-1">{formatDate(viewCoupon.expiresAt)}</p>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Created At</label>
//               <p className="text-sm text-gray-700 mt-1">{new Date(viewCoupon.createdAt).toLocaleString()}</p>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Last Updated</label>
//               <p className="text-sm text-gray-700 mt-1">{new Date(viewCoupon.updatedAt).toLocaleString()}</p>
//             </div>
//             {viewCoupon.spendThreshold && (
//               <div>
//                 <label className="text-xs text-gray-500 uppercase tracking-wider">Spend Threshold Text</label>
//                 <p className="text-sm text-gray-700 mt-1">{viewCoupon.spendThreshold}</p>
//               </div>
//             )}
//           </div>
          
//           {viewCoupon.description && (
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Description</label>
//               <p className="text-sm text-gray-700 mt-1">{viewCoupon.description}</p>
//             </div>
//           )}
          
//           {/* Color Theme Details */}
//           {viewCoupon.colorTheme && (
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Color Theme</label>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1">
//                   <div className="w-6 h-6 rounded-full" style={{ backgroundColor: viewCoupon.colorTheme.primary }}></div>
//                   <span className="text-xs">Primary</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-6 h-6 rounded-full" style={{ backgroundColor: viewCoupon.colorTheme.secondary }}></div>
//                   <span className="text-xs">Secondary</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-6 h-6 rounded-full" style={{ backgroundColor: viewCoupon.colorTheme.accent }}></div>
//                   <span className="text-xs">Accent</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-6 h-6 rounded-full" style={{ backgroundColor: viewCoupon.colorTheme.text }}></div>
//                   <span className="text-xs">Text</span>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {/* Features Badges */}
//           <div className="mt-4 pt-4 border-t border-gray-200">
//             <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Features</label>
//             <div className="flex flex-wrap gap-2">
//               {viewCoupon.isActive && (
//                 <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 flex items-center gap-1">
//                   <CheckCircle className="w-3 h-3" /> Active
//                 </span>
//               )}
//               {viewCoupon.showOnHomepage && (
//                 <span className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-700 flex items-center gap-1">
//                   <Eye className="w-3 h-3" /> Show on Homepage
//                 </span>
//               )}
//               {viewCoupon.isFirstPurchaseOnly && (
//                 <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
//                   <Users className="w-3 h-3" /> First Purchase Only
//                 </span>
//               )}
//               {viewCoupon.stackable && (
//                 <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
//                   <Plus className="w-3 h-3" /> Stackable
//                 </span>
//               )}
//               {viewCoupon.autoApply && (
//                 <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700 flex items-center gap-1">
//                   <RefreshCw className="w-3 h-3" /> Auto Apply
//                 </span>
//               )}
//             </div>
//           </div>
          
//           {/* Created By */}
//           {viewCoupon.createdBy && (
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <label className="text-xs text-gray-500 uppercase tracking-wider">Created By</label>
//               <p className="text-sm text-gray-700 mt-1">
//                 {viewCoupon.createdBy.name || viewCoupon.createdBy.email || 'Unknown'}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Usage History - If you have usage records */}
//       {viewCoupon.usageRecords && viewCoupon.usageRecords.length > 0 && (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="p-5 bg-gray-50 border-b border-gray-200">
//             <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//               <Users className="w-5 h-5 text-teal-600" />
//               Usage History
//             </h2>
//           </div>
//           <div className="p-5">
//             <div className="space-y-3">
//               {viewCoupon.usageRecords.slice(0, 10).map((record, index) => (
//                 <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
//                   <div>
//                     <p className="text-sm text-gray-700">
//                       Used on {new Date(record.usedAt).toLocaleString()}
//                     </p>
//                     {record.discountAmount > 0 && (
//                       <p className="text-xs text-gray-500">Saved: ৳{record.discountAmount}</p>
//                     )}
//                   </div>
//                   <span className="text-xs text-gray-400">Order #{record.orderId?.slice(-6) || 'N/A'}</span>
//                 </div>
//               ))}
//               {viewCoupon.usageRecords.length > 10 && (
//                 <p className="text-xs text-center text-gray-500 pt-2">
//                   + {viewCoupon.usageRecords.length - 10} more uses
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
    
//     {/* Right Column - Preview Card */}
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
//         <div className="p-4 border-b border-gray-200 bg-gray-50">
//           <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
//             <Eye className="w-4 h-4 text-teal-600" />
//             Coupon Preview
//           </h3>
//         </div>
//         <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
//           <CouponPreviewCard data={viewCoupon} isEdit={false} />
//         </div>
//       </div>
      
//       {/* Quick Stats Card */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="p-4 border-b border-gray-200 bg-gray-50">
//           <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
//             <Ticket className="w-4 h-4 text-teal-600" />
//             Quick Stats
//           </h3>
//         </div>
//         <div className="p-5">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="text-center p-3 bg-gray-50 rounded-lg">
//               <p className="text-2xl font-bold text-teal-600">{viewCoupon.totalUsedCount || 0}</p>
//               <p className="text-xs text-gray-500">Total Uses</p>
//             </div>
//             <div className="text-center p-3 bg-gray-50 rounded-lg">
//               <p className="text-2xl font-bold text-teal-600">
//                 {viewCoupon.maxTotalUses ? `${Math.round((viewCoupon.totalUsedCount / viewCoupon.maxTotalUses) * 100)}%` : '∞'}
//               </p>
//               <p className="text-xs text-gray-500">Usage Rate</p>
//             </div>
//             <div className="text-center p-3 bg-gray-50 rounded-lg">
//               <p className="text-xl font-bold text-teal-600">{viewCoupon.maxUsesPerUser}</p>
//               <p className="text-xs text-gray-500">Per User Limit</p>
//             </div>
//             <div className="text-center p-3 bg-gray-50 rounded-lg">
//               <p className="text-xl font-bold text-teal-600">
//                 {viewCoupon.expiresAt ? Math.ceil((new Date(viewCoupon.expiresAt) - new Date()) / (1000 * 60 * 60 * 24)) : '∞'}
//               </p>
//               <p className="text-xs text-gray-500">Days Remaining</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )}
        
//         {activeTab === 'list' && (
//           <div>
//             {/* Filters */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
//               <div className="flex flex-wrap items-center justify-between gap-4">
//                 <div className="relative flex-1 max-w-md">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search by CouponCode ..."
//                     value={searchTerm}
//                     onChange={(e) => {
//                       setSearchTerm(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
//                   />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Filter className="w-4 h-4 text-gray-400" />
//                   <select
//                     value={filterStatus}
//                     onChange={(e) => {
//                       setFilterStatus(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
//                   >
//                     <option value="all">All Status</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>
//                 <button
//                   onClick={fetchCoupons}
//                   className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Coupons Table */}
//             {isLoadingCoupons ? (
//               <div className="flex items-center justify-center py-12">
//                 <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
//               </div>
//             ) : coupons.length === 0 ? (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
//                 <Ticket className="w-16 h-16 mx-auto text-gray-300 mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No coupons found</h3>
//                 <p className="text-gray-500 mb-6">
//                   {searchTerm ? 'Try a different search term' : 'Create your first coupon to get started'}
//                 </p>
//                 {!searchTerm && (
//                   <button
//                     onClick={() => setActiveTab('create')}
//                     className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
//                   >
//                     Create First Coupon
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <>
//                 {/* Desktop Table */}
//                 <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                   <table className="w-full">
//                     <thead className="bg-gray-50 border-b border-gray-200">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uses</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                         <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {coupons.map((coupon) => {
//                         const status = getStatusConfig(coupon);
//                         return (
//                           <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
//                             <td className="px-6 py-4">
//                               <div className="flex items-center gap-2">
//                                 <code className="font-mono text-sm font-bold text-teal-600">{coupon.couponCode}</code>
//                                 <button onClick={() => handleCopyCode(coupon.couponCode)} className="p-1 text-gray-400 hover:text-gray-600">
//                                   <Copy className="w-3 h-3" />
//                                 </button>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4">
//                               <p className="text-sm font-medium text-gray-900">{coupon.title}</p>
//                               {coupon.subtitle && <p className="text-xs text-gray-500">{coupon.subtitle}</p>}
//                             </td>
//                             <td className="px-6 py-4">
//                               <span className="text-sm font-semibold text-green-600">{getDiscountDisplay(coupon)}</span>
//                               {coupon.minimumOrderAmount > 0 && (
//                                 <p className="text-xs text-gray-500">Min. ৳{coupon.minimumOrderAmount}</p>
//                               )}
//                             </td>
//                             <td className="px-6 py-4">
//                               <span className="text-sm text-gray-700">{coupon.totalUsedCount || 0} / {coupon.maxTotalUses || '∞'}</span>
//                             </td>
//                             <td className="px-6 py-4">
//                               <div className="flex items-center gap-1">
//                                 <Calendar className="w-3 h-3 text-gray-400" />
//                                 <span className="text-sm text-gray-600">{formatDate(coupon.expiresAt)}</span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4">
//                               <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
//                                 {status.label}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 text-right">
//                               <div className="flex items-center justify-end gap-2">
//                                 <button
//                                   onClick={() => {
//                                     setSelectedCouponId(coupon._id);
//                                     setActiveTab('view');
//                                   }}
//                                   className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
//                                   title="View Details"
//                                 >
//                                   <Eye className="w-4 h-4" />
//                                 </button>
//                                 <button
//                                   onClick={() => {
//                                     setSelectedCouponId(coupon._id);
//                                     setActiveTab('edit');
//                                   }}
//                                   className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg"
//                                   title="Edit"
//                                 >
//                                   <Edit className="w-4 h-4" />
//                                 </button>
//                                 <button
//                                   onClick={() => handleDuplicate(coupon)}
//                                   className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg"
//                                   title="Duplicate"
//                                 >
//                                   <Copy className="w-4 h-4" />
//                                 </button>
//                                 <button
//                                   onClick={() => handleToggleStatus(coupon)}
//                                   className={`p-1.5 rounded-lg ${coupon.isActive ? 'text-gray-600 hover:bg-gray-50' : 'text-green-600 hover:bg-green-50'}`}
//                                   title={coupon.isActive ? 'Deactivate' : 'Activate'}
//                                 >
//                                   <Power className="w-4 h-4" />
//                                 </button>
//                                 <button
//                                   onClick={() => handleDeleteClick(coupon)}
//                                   className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
//                                   title="Delete"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Mobile Cards */}
//                 <div className="lg:hidden space-y-4">
//                   {coupons.map((coupon) => {
//                     const status = getStatusConfig(coupon);
//                     return (
//                       <div key={coupon._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <div className="flex items-center gap-2">
//                               <code className="font-mono text-sm font-bold text-teal-600">{coupon.couponCode}</code>
//                               <button onClick={() => handleCopyCode(coupon.couponCode)} className="p-1 text-gray-400">
//                                 <Copy className="w-3 h-3" />
//                               </button>
//                             </div>
//                             <h3 className="text-sm font-medium text-gray-900 mt-1">{coupon.title}</h3>
//                           </div>
//                           <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
//                             {status.label}
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-2 gap-3 text-sm mb-3">
//                           <div>
//                             <p className="text-xs text-gray-500">Discount</p>
//                             <p className="font-semibold text-green-600">{getDiscountDisplay(coupon)}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500">Uses</p>
//                             <p>{coupon.totalUsedCount || 0} / {coupon.maxTotalUses || '∞'}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500">Min. Order</p>
//                             <p>{coupon.minimumOrderAmount > 0 ? `৳${coupon.minimumOrderAmount}` : 'None'}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500">Expiry</p>
//                             <p className="text-xs">{formatDate(coupon.expiresAt)}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
//                           <button
//                             onClick={() => {
//                               setSelectedCouponId(coupon._id);
//                               setActiveTab('view');
//                             }}
//                             className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
//                           >
//                             View
//                           </button>
//                           <button
//                             onClick={() => {
//                               setSelectedCouponId(coupon._id);
//                               setActiveTab('edit');
//                             }}
//                             className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg"
//                           >
//                             Edit
//                           </button>
//                           <button onClick={() => handleDuplicate(coupon)} className="px-3 py-1.5 text-sm text-orange-600 hover:bg-orange-50 rounded-lg">
//                             Duplicate
//                           </button>
//                           <button onClick={() => handleToggleStatus(coupon)} className={`px-3 py-1.5 text-sm rounded-lg ${coupon.isActive ? 'text-gray-600 hover:bg-gray-50' : 'text-green-600 hover:bg-green-50'}`}>
//                             {coupon.isActive ? 'Deactivate' : 'Activate'}
//                           </button>
//                           <button onClick={() => handleDeleteClick(coupon)} className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="flex items-center justify-between mt-6">
//                     <p className="text-sm text-gray-500">
//                       Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCoupons)} of {totalCoupons} coupons
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                         disabled={currentPage === 1}
//                         className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <ChevronLeft className="w-4 h-4" />
//                       </button>
//                       <div className="flex items-center gap-1">
//                         {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                           let pageNum;
//                           if (totalPages <= 5) {
//                             pageNum = i + 1;
//                           } else if (currentPage <= 3) {
//                             pageNum = i + 1;
//                           } else if (currentPage >= totalPages - 2) {
//                             pageNum = totalPages - 4 + i;
//                           } else {
//                             pageNum = currentPage - 2 + i;
//                           }
//                           return (
//                             <button
//                               key={pageNum}
//                               onClick={() => setCurrentPage(pageNum)}
//                               className={`w-8 h-8 text-sm rounded-lg transition-colors ${
//                                 currentPage === pageNum ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'
//                               }`}
//                             >
//                               {pageNum}
//                             </button>
//                           );
//                         })}
//                       </div>
//                       <button
//                         onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                         disabled={currentPage === totalPages}
//                         className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && selectedCoupon && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
//             <div className="flex items-center gap-3 text-red-600 mb-4">
//               <AlertCircle className="w-6 h-6" />
//               <h3 className="text-lg font-semibold">Delete Coupon</h3>
//             </div>
//             <p className="text-gray-600 mb-2">
//               Are you sure you want to delete the coupon <strong className="font-mono">{selectedCoupon.couponCode}</strong>?
//             </p>
//             <p className="text-sm text-gray-500 mb-6">
//               This action cannot be undone. All usage data for this coupon will be permanently removed.
//             </p>
//             <div className="flex items-center justify-end gap-3">
//               <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
//                 Cancel
//               </button>
//               <button onClick={handleDeleteConfirm} disabled={isDeleting} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2">
//                 {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
//                 {isDeleting ? 'Deleting...' : 'Delete'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { 
  Plus, 
  X, 
  Save, 
  ArrowLeft,
  Ticket,
  Percent,
  DollarSign,
  Truck,
  Calendar,
  Users,
  ShoppingBag,
  AlertCircle,
  Loader2,
  Hash,
  Palette,
  Type,
  Clock,
  Infinity,
  Gift,
  Tag,
  Eye,
  CheckCircle,
  Minus,
  Copy,
  RefreshCw,
  Settings,
  Edit,
  Trash2,
  Search,
  Filter,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Power,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

// Coupon Types
const DISCOUNT_TYPES = [
  { value: 'percentage', label: 'Discount %', icon: Percent, color: '#4A8A90', description: 'Apply percentage discount (e.g., 20% off)' },
  { value: 'fixed', label: 'Fixed Amount', icon: DollarSign, color: '#FFB6C1', description: 'Apply fixed amount discount (e.g., ৳500 off)' },
  { value: 'free_shipping', label: 'Free Shipping', icon: Truck, color: '#FFD93D', description: 'Free shipping on the order' }
];

// Color Themes
const COLOR_THEMES = [
  { name: 'Kids Play', primary: '#4A8A90', secondary: '#D4EDEE', accent: '#FFB6C1', text: '#2D3A5C', bg: '#FFF9F0' },
  { name: 'Fun Rainbow', primary: '#FF6B6B', secondary: '#FFE0E0', accent: '#4ECDC4', text: '#2D3436', bg: '#FFFFFF' },
  { name: 'Toy Box', primary: '#F7B731', secondary: '#FFF3E0', accent: '#5C6BC0', text: '#37474F', bg: '#FAFAFA' },
  { name: 'Magic World', primary: '#9B59B6', secondary: '#F3E5F5', accent: '#FFB6C1', text: '#4A148C', bg: '#FCF8FF' },
  { name: 'Ocean Adventure', primary: '#1ABC9C', secondary: '#E0F7FA', accent: '#3498DB', text: '#0D3B3B', bg: '#F0FDF4' },
  { name: 'Space Explorer', primary: '#2C3E50', secondary: '#E8ECF1', accent: '#E67E22', text: '#1A252F', bg: '#F8F9FA' }
];

// Get status config
const getStatusConfig = (coupon, now = new Date()) => {
  if (!coupon.isActive) {
    return { label: 'Inactive', color: 'gray', bg: 'bg-gray-100', text: 'text-gray-600' };
  }
  if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
    return { label: 'Expired', color: 'red', bg: 'bg-red-100', text: 'text-red-700' };
  }
  if (coupon.maxTotalUses && coupon.totalUsedCount >= coupon.maxTotalUses) {
    return { label: 'Used Up', color: 'orange', bg: 'bg-orange-100', text: 'text-orange-700' };
  }
  return { label: 'Active', color: 'green', bg: 'bg-green-100', text: 'text-green-700' };
};

// Get discount display
const getDiscountDisplay = (coupon) => {
  if (coupon.discountType === 'percentage') {
    return `${coupon.discountValue}% OFF`;
  } else if (coupon.discountType === 'fixed') {
    return `৳${coupon.discountValue} OFF`;
  } else if (coupon.discountType === 'free_shipping') {
    return 'Free Shipping';
  }
  return '-';
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'No expiry';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function AdminCouponManager() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('create'); // 'create', 'list', 'edit', 'view'
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [viewCoupon, setViewCoupon] = useState(null);
  
  // ============ CREATE COUPON STATE ============
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    spendThreshold: '',
    highlightText: '',
    colorTheme: COLOR_THEMES[0],
    description: '',
    couponCode: '',
    discountType: 'percentage',
    discountValue: '',
    minimumOrderAmount: '',
    maxTotalUses: '',
    maxUsesPerUser: '1',
    expiresAt: '',
    isActive: true,
    showOnHomepage: false,
    isFirstPurchaseOnly: false,
    applicableCategories: [],
    stackable: false,
    autoApply: false
  });
  
  const [couponCodeError, setCouponCodeError] = useState('');
  const [isCheckingCode, setIsCheckingCode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  
  // ============ EDIT COUPON STATE ============
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [editCouponCodeError, setEditCouponCodeError] = useState('');
  const [isEditCheckingCode, setIsEditCheckingCode] = useState(false);
  const [editErrors, setEditErrors] = useState({});
  const [editPreviewMode, setEditPreviewMode] = useState(false);
  
  // ============ LIST COUPONS STATE ============
  const [coupons, setCoupons] = useState([]);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const itemsPerPage = 10;

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch coupons when on list tab
  useEffect(() => {
    if (activeTab === 'list') {
      fetchCoupons();
    }
  }, [activeTab, currentPage, filterStatus, searchTerm]);

  // Load coupon for edit/view when needed
  useEffect(() => {
    if ((activeTab === 'edit' || activeTab === 'view') && selectedCouponId) {
      fetchSingleCoupon(selectedCouponId);
    }
  }, [activeTab, selectedCouponId]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSingleCoupon = async (couponId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/coupons/${couponId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        if (activeTab === 'view') {
          setViewCoupon(data.data);
        } else if (activeTab === 'edit') {
          setEditFormData({
            title: data.data.title,
            subtitle: data.data.subtitle || '',
            spendThreshold: data.data.spendThreshold || '',
            highlightText: data.data.highlightText,
            colorTheme: data.data.colorTheme || COLOR_THEMES[0],
            description: data.data.description || '',
            couponCode: data.data.couponCode,
            discountType: data.data.discountType,
            discountValue: data.data.discountValue.toString(),
            minimumOrderAmount: data.data.minimumOrderAmount?.toString() || '',
            maxTotalUses: data.data.maxTotalUses?.toString() || '',
            maxUsesPerUser: data.data.maxUsesPerUser?.toString() || '1',
            expiresAt: data.data.expiresAt ? new Date(data.data.expiresAt).toISOString().slice(0, 16) : '',
            isActive: data.data.isActive,
            showOnHomepage: data.data.showOnHomepage || false,
            isFirstPurchaseOnly: data.data.isFirstPurchaseOnly || false,
            applicableCategories: data.data.applicableCategories || [],
            stackable: data.data.stackable || false,
            autoApply: data.data.autoApply || false
          });
        }
      }
    } catch (error) {
      console.error('Error fetching coupon:', error);
      toast.error('Failed to load coupon');
    }
  };

  // ============ CREATE COUPON FUNCTIONS ============
  const generateCouponCode = () => {
    const prefixes = ['KIDS', 'TOY', 'PLAY', 'FUN', 'GIFT', 'MAGIC', 'HAPPY', 'SMILE'];
    const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffix}`;
    setFormData(prev => ({ ...prev, couponCode: code }));
    setGeneratedCode(code);
    setCouponCodeError('');
  };
  
  const checkCouponCode = async (code, isEdit = false) => {
    if (!code || code.length < 3) return;
    
    if (isEdit) {
      setIsEditCheckingCode(true);
    } else {
      setIsCheckingCode(true);
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/coupons/check-code?code=${encodeURIComponent(code)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (isEdit) {
        if (data.exists && editFormData?.couponCode !== code) {
          setEditCouponCodeError('This coupon code already exists. Please use a different code.');
        } else {
          setEditCouponCodeError('');
        }
        setIsEditCheckingCode(false);
      } else {
        if (data.exists) {
          setCouponCodeError('This coupon code already exists. Please use a different code.');
        } else {
          setCouponCodeError('');
        }
        setIsCheckingCode(false);
      }
    } catch (error) {
      console.error('Error checking coupon code:', error);
      if (isEdit) {
        setIsEditCheckingCode(false);
      } else {
        setIsCheckingCode(false);
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };
  
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (editErrors[name]) setEditErrors(prev => ({ ...prev, [name]: null }));
  };
  
  const handleEditNumberChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
    if (editErrors[name]) setEditErrors(prev => ({ ...prev, [name]: null }));
  };
  
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };
  
  const handleDiscountTypeChange = (type) => {
    setFormData(prev => ({ ...prev, discountType: type, discountValue: '' }));
  };
  
  const handleEditDiscountTypeChange = (type) => {
    setEditFormData(prev => ({ ...prev, discountType: type, discountValue: '' }));
  };
  
  const handleColorThemeChange = (theme) => {
    setFormData(prev => ({ ...prev, colorTheme: theme }));
  };
  
  const handleEditColorThemeChange = (theme) => {
    setEditFormData(prev => ({ ...prev, colorTheme: theme }));
  };
  
  const validateForm = (isEdit = false) => {
    const data = isEdit ? editFormData : formData;
    const newErrors = {};
    
    if (!data?.title?.trim()) newErrors.title = 'Coupon title is required';
    if (!data?.highlightText?.trim()) newErrors.highlightText = 'Highlight text is required';
    
    if (!data?.couponCode?.trim()) {
      newErrors.couponCode = 'Coupon code is required';
    } else if (data.couponCode.length < 3) {
      newErrors.couponCode = 'Coupon code must be at least 3 characters';
    } else if (isEdit ? editCouponCodeError : couponCodeError) {
      newErrors.couponCode = isEdit ? editCouponCodeError : couponCodeError;
    }
    
    if (data.discountType !== 'free_shipping') {
      if (!data.discountValue || parseFloat(data.discountValue) <= 0) {
        newErrors.discountValue = 'Discount value is required and must be greater than 0';
      }
      if (data.discountType === 'percentage' && parseFloat(data.discountValue) > 100) {
        newErrors.discountValue = 'Percentage discount cannot exceed 100%';
      }
    }
    
    if (data.expiresAt) {
      const expiryDate = new Date(data.expiresAt);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (expiryDate < today) newErrors.expiresAt = 'Expiry date cannot be in the past';
    }
    
    if (data.maxUsesPerUser && parseFloat(data.maxUsesPerUser) < 1) {
      newErrors.maxUsesPerUser = 'Max uses per user must be at least 1';
    }
    
    if (data.maxTotalUses && parseFloat(data.maxTotalUses) < 1) {
      newErrors.maxTotalUses = 'Max total uses must be at least 1';
    }
    
    if (isEdit) {
      setEditErrors(newErrors);
    } else {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(false)) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        spendThreshold: formData.spendThreshold,
        highlightText: formData.highlightText,
        colorTheme: {
          primary: formData.colorTheme.primary,
          secondary: formData.colorTheme.secondary,
          accent: formData.colorTheme.accent,
          text: formData.colorTheme.text,
          bg: formData.colorTheme.bg
        },
        description: formData.description,
        couponCode: formData.couponCode.toUpperCase(),
        discountType: formData.discountType,
        discountValue: formData.discountType !== 'free_shipping' ? parseFloat(formData.discountValue) : 0,
        minimumOrderAmount: formData.minimumOrderAmount ? parseFloat(formData.minimumOrderAmount) : 0,
        maxTotalUses: formData.maxTotalUses ? parseFloat(formData.maxTotalUses) : null,
        maxUsesPerUser: formData.maxUsesPerUser ? parseFloat(formData.maxUsesPerUser) : 1,
        expiresAt: formData.expiresAt || null,
        isActive: formData.isActive,
        showOnHomepage: formData.showOnHomepage,
        isFirstPurchaseOnly: formData.isFirstPurchaseOnly,
        applicableCategories: formData.applicableCategories,
        stackable: formData.stackable,
        autoApply: formData.autoApply
      };
      
      const response = await fetch('http://localhost:5000/api/coupons', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Coupon "${formData.couponCode}" created successfully!`);
        setFormData({
          title: '',
          subtitle: '',
          spendThreshold: '',
          highlightText: '',
          colorTheme: COLOR_THEMES[0],
          description: '',
          couponCode: '',
          discountType: 'percentage',
          discountValue: '',
          minimumOrderAmount: '',
          maxTotalUses: '',
          maxUsesPerUser: '1',
          expiresAt: '',
          isActive: true,
          showOnHomepage: false,
          isFirstPurchaseOnly: false,
          applicableCategories: [],
          stackable: false,
          autoApply: false
        });
        setCouponCodeError('');
        setActiveTab('list');
        fetchCoupons();
      } else {
        toast.error(data.error || 'Failed to create coupon');
      }
    } catch (error) {
      console.error('Error creating coupon:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(true)) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsEditing(true);
    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        title: editFormData.title,
        subtitle: editFormData.subtitle,
        spendThreshold: editFormData.spendThreshold,
        highlightText: editFormData.highlightText,
        colorTheme: {
          primary: editFormData.colorTheme.primary,
          secondary: editFormData.colorTheme.secondary,
          accent: editFormData.colorTheme.accent,
          text: editFormData.colorTheme.text,
          bg: editFormData.colorTheme.bg
        },
        description: editFormData.description,
        couponCode: editFormData.couponCode.toUpperCase(),
        discountType: editFormData.discountType,
        discountValue: editFormData.discountType !== 'free_shipping' ? parseFloat(editFormData.discountValue) : 0,
        minimumOrderAmount: editFormData.minimumOrderAmount ? parseFloat(editFormData.minimumOrderAmount) : 0,
        maxTotalUses: editFormData.maxTotalUses ? parseFloat(editFormData.maxTotalUses) : null,
        maxUsesPerUser: editFormData.maxUsesPerUser ? parseFloat(editFormData.maxUsesPerUser) : 1,
        expiresAt: editFormData.expiresAt || null,
        isActive: editFormData.isActive,
        showOnHomepage: editFormData.showOnHomepage,
        isFirstPurchaseOnly: editFormData.isFirstPurchaseOnly,
        applicableCategories: editFormData.applicableCategories,
        stackable: editFormData.stackable,
        autoApply: editFormData.autoApply
      };
      
      const response = await fetch(`http://localhost:5000/api/coupons/${selectedCouponId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Coupon "${editFormData.couponCode}" updated successfully!`);
        setActiveTab('list');
        fetchCoupons();
      } else {
        toast.error(data.error || 'Failed to update coupon');
      }
    } catch (error) {
      console.error('Error updating coupon:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsEditing(false);
    }
  };
  
  // ============ LIST COUPONS FUNCTIONS ============
  const fetchCoupons = async () => {
    setIsLoadingCoupons(true);
    try {
      const token = localStorage.getItem('token');
      let url = `http://localhost:5000/api/coupons?page=${currentPage}&limit=${itemsPerPage}`;
      
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
      if (filterStatus !== 'all') {
        if (filterStatus === 'active') url += '&isActive=true';
        if (filterStatus === 'inactive') url += '&isActive=false';
      }
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCoupons(data.data);
        setTotalPages(data.pagination?.pages || 1);
        setTotalCoupons(data.pagination?.total || 0);
      } else {
        toast.error(data.error || 'Failed to fetch coupons');
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoadingCoupons(false);
    }
  };

  const handleDeleteClick = (coupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCoupon) return;
    
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/coupons/${selectedCoupon._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Coupon "${selectedCoupon.couponCode}" deleted successfully`);
        fetchCoupons();
      } else {
        toast.error(data.error || 'Failed to delete coupon');
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setSelectedCoupon(null);
    }
  };

  const handleToggleStatus = async (coupon) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/coupons/${coupon._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !coupon.isActive })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Coupon ${!coupon.isActive ? 'activated' : 'deactivated'} successfully`);
        fetchCoupons();
      } else {
        toast.error(data.error || 'Failed to update coupon status');
      }
    } catch (error) {
      console.error('Error toggling coupon status:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleDuplicate = async (coupon) => {
    try {
      const token = localStorage.getItem('token');
      const newCode = `${coupon.couponCode}_COPY${Math.floor(Math.random() * 1000)}`;
      
      const payload = {
        title: `${coupon.title} (Copy)`,
        subtitle: coupon.subtitle,
        spendThreshold: coupon.spendThreshold,
        highlightText: coupon.highlightText,
        colorTheme: coupon.colorTheme,
        description: coupon.description,
        couponCode: newCode,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minimumOrderAmount: coupon.minimumOrderAmount,
        maxTotalUses: coupon.maxTotalUses,
        maxUsesPerUser: coupon.maxUsesPerUser,
        expiresAt: coupon.expiresAt,
        isActive: false,
        showOnHomepage: false,
        isFirstPurchaseOnly: coupon.isFirstPurchaseOnly,
        stackable: coupon.stackable,
        autoApply: coupon.autoApply
      };
      
      const response = await fetch('http://localhost:5000/api/coupons', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Coupon duplicated as "${newCode}"`);
        fetchCoupons();
      } else {
        toast.error(data.error || 'Failed to duplicate coupon');
      }
    } catch (error) {
      console.error('Error duplicating coupon:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied to clipboard');
  };

  // Get discount icon for preview
  const getDiscountIcon = (discountType, isEdit = false) => {
    const type = isEdit ? editFormData?.discountType : discountType;
    const discountTypeObj = DISCOUNT_TYPES.find(d => d.value === type);
    if (discountTypeObj) {
      const Icon = discountTypeObj.icon;
      return <Icon className="w-4 h-4" />;
    }
    return <Percent className="w-4 h-4" />;
  };
  
  const getDiscountDisplayText = (isEdit = false) => {
    const data = isEdit ? editFormData : formData;
    if (data?.discountType === 'percentage' && data?.discountValue) {
      return `${data.discountValue}% OFF`;
    } else if (data?.discountType === 'fixed' && data?.discountValue) {
      return `৳${data.discountValue} OFF`;
    } else if (data?.discountType === 'free_shipping') {
      return 'FREE SHIPPING';
    }
    return '';
  };

  // Render coupon preview card (reusable)
  const CouponPreviewCard = ({ data, isEdit = false }) => {
    const theme = data?.colorTheme || COLOR_THEMES[0];
    const discountText = isEdit ? getDiscountDisplayText(true) : getDiscountDisplayText();
    const discountIcon = isEdit ? getDiscountIcon(editFormData?.discountType, true) : getDiscountIcon(formData.discountType);
    
    return (
      <div className="max-w-md mx-auto">
        <div className="relative">
          <div 
            className="relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl"
            style={{ 
              background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg} 100%)`,
              border: `2px dashed ${theme.primary}`,
            }}
          >
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-50 rounded-b-full" style={{ backgroundColor: '#F9FAFB' }}></div>
            
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-2xl" style={{ borderColor: theme.primary }}></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-2xl" style={{ borderColor: theme.primary }}></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-2xl" style={{ borderColor: theme.primary }}></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-2xl" style={{ borderColor: theme.primary }}></div>
            
            <div className="p-6">
              {data?.subtitle && (
                <div className="absolute -top-2 right-6">
                  <div className="relative">
                    <div className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-md" style={{ backgroundColor: theme.accent }}>
                      {data.subtitle}
                    </div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent" style={{ borderTopColor: theme.accent }}></div>
                  </div>
                </div>
              )}
              
              <div className="text-center mb-3">
                <span className="text-xs tracking-wider font-semibold uppercase opacity-70" style={{ color: theme.primary }}>
                  🎁 Toy Store Bangladesh
                </span>
              </div>
              
              {discountText && (
                <div className="flex justify-center mb-4">
                  <div 
                    className="relative w-28 h-28 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)` }}
                  >
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center">
                      {data?.discountType === 'percentage' && (
                        <>
                          <span className="text-2xl font-black text-white">{data.discountValue}</span>
                          <span className="text-xs font-bold text-white">% OFF</span>
                        </>
                      )}
                      {data?.discountType === 'fixed' && (
                        <>
                          <span className="text-xl font-black text-white">৳{data.discountValue}</span>
                          <span className="text-xs font-bold text-white">OFF</span>
                        </>
                      )}
                      {data?.discountType === 'free_shipping' && (
                        <>
                          <span className="text-xl font-black text-white">FREE</span>
                          <span className="text-xs font-bold text-white">SHIPPING</span>
                        </>
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: theme.primary }}></div>
                  </div>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-1" style={{ color: theme.text }}>
                  {data?.title || 'COUPON TITLE'}
                </h3>
                <div className="h-0.5 w-12 mx-auto rounded-full" style={{ backgroundColor: theme.primary }}></div>
              </div>
              
              <div className="space-y-2 mb-4">
                {data?.spendThreshold && (
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span>💰</span>
                    <span className="font-medium" style={{ color: theme.text }}>{data.spendThreshold}</span>
                  </div>
                )}
                {data?.minimumOrderAmount && parseFloat(data.minimumOrderAmount) > 0 && (
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span>🛒</span>
                    <span className="font-medium" style={{ color: theme.text }}>Minimum Purchase: ৳{data.minimumOrderAmount}</span>
                  </div>
                )}
              </div>
              
              <div className="relative my-4">
                <div className="relative flex justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed" style={{ borderColor: theme.primary }}></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-gray-400" style={{ backgroundColor: theme.bg }}>COUPON CODE</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between p-3 rounded-xl border-2 shadow-inner" style={{ backgroundColor: theme.secondary, borderColor: theme.primary }}>
                    <code className="text-base font-mono font-bold tracking-wider" style={{ color: theme.primary }}>
                      {data?.couponCode || 'COUPON123'}
                    </code>
                    <button
                      type="button"
                      onClick={() => {
                        if (data?.couponCode) {
                          navigator.clipboard.writeText(data.couponCode);
                          toast.success('Code copied!');
                        }
                      }}
                      className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg transition-all hover:scale-105"
                      style={{ backgroundColor: theme.primary, color: 'white' }}
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-4 pt-3 border-t" style={{ borderColor: theme.secondary }}>
                {data?.expiresAt && (
                  <p className="text-xs opacity-60" style={{ color: theme.text }}>
                    ⏰ Valid until {new Date(data.expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
                <p className="text-[10px] opacity-40 mt-2" style={{ color: theme.text }}>
                  Terms & conditions apply
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-50 rounded-t-full" style={{ backgroundColor: '#F9FAFB' }}></div>
          </div>
          <div className="absolute -bottom-2 left-2 right-2 h-2 bg-black/5 rounded-full blur-sm"></div>
        </div>
      </div>
    );
  };

  // Render form fields (reusable)
  const renderFormFields = (isEdit = false) => {
    const data = isEdit ? editFormData : formData;
    const setData = isEdit ? setEditFormData : setFormData;
    const discountTypeChange = isEdit ? handleEditDiscountTypeChange : handleDiscountTypeChange;
    const colorThemeChange = isEdit ? handleEditColorThemeChange : handleColorThemeChange;
    const couponCodeErrorField = isEdit ? editCouponCodeError : couponCodeError;
    const isChecking = isEdit ? isEditCheckingCode : isCheckingCode;
    const formErrors = isEdit ? editErrors : errors;
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={data?.title || ''}
            onChange={isEdit ? handleEditChange : handleChange}
            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
              formErrors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Summer Sale Extravaganza"
          />
          {formErrors.title && <p className="text-xs text-red-600 mt-1">{formErrors.title}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle / Badge <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <input
            type="text"
            name="subtitle"
            value={data?.subtitle || ''}
            onChange={isEdit ? handleEditChange : handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            placeholder="e.g., Limited Time Offer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Spend Threshold Display Text <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <input
            type="text"
            name="spendThreshold"
            value={data?.spendThreshold || ''}
            onChange={isEdit ? handleEditChange : handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            placeholder="e.g., Spend ৳2000 or more"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Highlight Text <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="highlightText"
            value={data?.highlightText || ''}
            onChange={isEdit ? handleEditChange : handleChange}
            className={`w-full px-3 py-2 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
              formErrors.highlightText ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., UP TO 50% OFF"
          />
          {formErrors.highlightText && <p className="text-xs text-red-600 mt-1">{formErrors.highlightText}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Theme
          </label>
          <div className="grid grid-cols-3 gap-3">
            {COLOR_THEMES.map((theme, index) => (
              <button
                key={index}
                type="button"
                onClick={() => colorThemeChange(theme)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  data?.colorTheme?.name === theme.name
                    ? 'border-teal-500 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ backgroundColor: theme.bg }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.secondary }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }} />
                </div>
                <p className="text-xs font-medium" style={{ color: theme.text }}>{theme.name}</p>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <textarea
            name="description"
            value={data?.description || ''}
            onChange={isEdit ? handleEditChange : handleChange}
            rows="3"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Describe the coupon terms and conditions..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coupon Code <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="couponCode"
                value={data?.couponCode || ''}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  setData(prev => ({ ...prev, couponCode: value }));
                  checkCouponCode(value, isEdit);
                }}
                className={`w-full pl-9 pr-3 py-2 text-sm font-mono border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
                  formErrors.couponCode || couponCodeErrorField ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="SUMMER2024"
              />
            </div>
            {!isEdit && (
              <button
                type="button"
                onClick={generateCouponCode}
                className="px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <RefreshCw className="w-4 h-4" />
                Generate
              </button>
            )}
          </div>
          {(formErrors.couponCode || couponCodeErrorField) && (
            <p className="text-xs text-red-600 mt-1">{formErrors.couponCode || couponCodeErrorField}</p>
          )}
          {isChecking && <p className="text-xs text-gray-500 mt-1">Checking availability...</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Discount Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {DISCOUNT_TYPES.map(type => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => discountTypeChange(type.value)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    data?.discountType === type.value
                      ? 'border-teal-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={data?.discountType === type.value ? { backgroundColor: `${type.color}10` } : {}}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1`} style={{ color: type.color }} />
                  <p className="text-xs font-medium" style={{ color: type.color }}>{type.label}</p>
                </button>
              );
            })}
          </div>
        </div>
        
        {data?.discountType !== 'free_shipping' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {data?.discountType === 'percentage' ? 'Discount Percentage (%)' : 'Discount Amount (৳)'}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              {data?.discountType === 'percentage' ? (
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              ) : (
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              )}
              <input
                type="number"
                name="discountValue"
                value={data?.discountValue || ''}
                onChange={isEdit ? handleEditNumberChange : handleNumberChange}
                onWheel={(e) => e.target.blur()}
                min="0"
                step={data?.discountType === 'percentage' ? '1' : '10'}
                className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
                  formErrors.discountValue ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={data?.discountType === 'percentage' ? 'e.g., 25' : 'e.g., 500'}
              />
            </div>
            {formErrors.discountValue && <p className="text-xs text-red-600 mt-1">{formErrors.discountValue}</p>}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Order Amount (৳)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              name="minimumOrderAmount"
              value={data?.minimumOrderAmount || ''}
              onChange={isEdit ? handleEditNumberChange : handleNumberChange}
              onWheel={(e) => e.target.blur()}
              min="0"
              step="100"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              placeholder="e.g., 1000"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Total Uses
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                name="maxTotalUses"
                value={data?.maxTotalUses || ''}
                onChange={isEdit ? handleEditNumberChange : handleNumberChange}
                onWheel={(e) => e.target.blur()}
                min="1"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                placeholder="Unlimited"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Uses Per User
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                name="maxUsesPerUser"
                value={data?.maxUsesPerUser || '1'}
                onChange={isEdit ? handleEditNumberChange : handleNumberChange}
                onWheel={(e) => e.target.blur()}
                min="1"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>
            {formErrors.maxUsesPerUser && <p className="text-xs text-red-600 mt-1">{formErrors.maxUsesPerUser}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expires At
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="datetime-local"
              name="expiresAt"
              value={data?.expiresAt || ''}
              onChange={isEdit ? handleEditChange : handleChange}
              className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition ${
                formErrors.expiresAt ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {formErrors.expiresAt && <p className="text-xs text-red-600 mt-1">{formErrors.expiresAt}</p>}
        </div>
        
        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={data?.isActive || false}
              onChange={isEdit ? handleEditChange : handleChange}
              className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Active</span>
              <p className="text-xs text-gray-500">Coupon is available for customers to use</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="showOnHomepage"
              checked={data?.showOnHomepage || false}
              onChange={isEdit ? handleEditChange : handleChange}
              className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Show on Homepage</span>
              <p className="text-xs text-gray-500">Display this coupon in the homepage promotions section</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isFirstPurchaseOnly"
              checked={data?.isFirstPurchaseOnly || false}
              onChange={isEdit ? handleEditChange : handleChange}
              className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">First Purchase Only</span>
              <p className="text-xs text-gray-500">Applicable only for customers making their first purchase</p>
            </div>
          </label>
          
          {/* <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="stackable"
              checked={data?.stackable || false}
              onChange={isEdit ? handleEditChange : handleChange}
              className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Stackable</span>
              <p className="text-xs text-gray-500">Can be combined with other coupons</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="autoApply"
              checked={data?.autoApply || false}
              onChange={isEdit ? handleEditChange : handleChange}
              className="w-5 h-5 rounded border-gray-300 focus:ring-teal-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Auto Apply</span>
              <p className="text-xs text-gray-500">Automatically apply to eligible carts without code entry</p>
            </div>
          </label> */}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <NextLink href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </NextLink>
              <div>
                <div className="flex items-center gap-2">
                  <Ticket className="w-6 h-6 text-teal-600" />
                  <h1 className="text-xl font-bold text-gray-800">
                    Coupon Manager
                  </h1>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-700">
                    {totalCoupons} Total Coupons
                  </span>
                </div>
              
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('create');
                setSelectedCouponId(null);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
                activeTab === 'create'
                  ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Plus className="w-4 h-4" />
              Create Coupon
            </button>
            <button
              onClick={() => {
                setActiveTab('list');
                setSelectedCouponId(null);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 ${
                activeTab === 'list'
                  ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4" />
              All Coupons
              {totalCoupons > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-200 rounded-full">{totalCoupons}</span>
              )}
            </button>
            {activeTab === 'edit' && (
              <button
                onClick={() => setActiveTab('list')}
                className="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 bg-teal-50 text-teal-700 border-b-2 border-teal-600"
              >
                <Edit className="w-4 h-4" />
                Edit Coupon
              </button>
            )}
            {activeTab === 'view' && (
              <button
                onClick={() => setActiveTab('list')}
                className="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 bg-teal-50 text-teal-700 border-b-2 border-teal-600"
              >
                <Eye className="w-4 h-4" />
                View Coupon
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Content based on active tab */}
      <div className="p-6">
        {activeTab === 'create' && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                      <Palette className="w-5 h-5 text-teal-600" />
                      Display Settings
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Configure how your coupon appears to customers</p>
                  </div>
                  <div className="p-5">
                    {renderFormFields(false)}
                  </div>
                </div>
         
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <Eye className="w-4 h-4 text-teal-600" />
                      Coupon Preview
                    </h3>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="text-xs text-teal-600 hover:text-teal-700"
                    >
                      {previewMode ? 'Hide' : 'Show'} Preview
                    </button>
                  </div>
                  {previewMode && (
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                      <CouponPreviewCard data={formData} isEdit={false} />
                    </div>
                  )}
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <Ticket className="w-4 h-4 text-teal-600" />
                      Coupon Summary
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500">Title:</span>
                      <span className="font-medium text-gray-700">{formData.title || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500">Code:</span>
                      <span className="font-mono font-bold text-teal-600">{formData.couponCode || 'Not generated'}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500">Discount:</span>
                      <span className="font-medium text-green-600">{getDiscountDisplayText() || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500">Min. Order:</span>
                      <span className="font-medium">
                        {formData.minimumOrderAmount && parseFloat(formData.minimumOrderAmount) > 0 ? `৳${formData.minimumOrderAmount}` : 'No minimum'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500">Per User:</span>
                      <span className="font-medium">{formData.maxUsesPerUser || 1} time(s)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        formData.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {formData.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    title: '',
                    subtitle: '',
                    spendThreshold: '',
                    highlightText: '',
                    colorTheme: COLOR_THEMES[0],
                    description: '',
                    couponCode: '',
                    discountType: 'percentage',
                    discountValue: '',
                    minimumOrderAmount: '',
                    maxTotalUses: '',
                    maxUsesPerUser: '1',
                    expiresAt: '',
                    isActive: true,
                    showOnHomepage: false,
                    isFirstPurchaseOnly: false,
                    applicableCategories: [],
                    stackable: false,
                    autoApply: false
                  });
                  setCouponCodeError('');
                }}
                className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSubmitting ? 'Creating...' : 'Create Coupon'}
              </button>
            </div>
          </form>
        )}
        
        {activeTab === 'edit' && editFormData && (
          <form onSubmit={handleEditSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                      <Edit className="w-5 h-5 text-teal-600" />
                      Edit Coupon
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Modify your coupon details</p>
                  </div>
                  <div className="p-5">
                    {renderFormFields(true)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <Eye className="w-4 h-4 text-teal-600" />
                      Coupon Preview
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditPreviewMode(!editPreviewMode)}
                      className="text-xs text-teal-600 hover:text-teal-700"
                    >
                      {editPreviewMode ? 'Hide' : 'Show'} Preview
                    </button>
                  </div>
                  {editPreviewMode && (
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                      <CouponPreviewCard data={editFormData} isEdit={true} />
                    </div>
                  )}
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <Ticket className="w-4 h-4 text-teal-600" />
                      Coupon Summary
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500">Title:</span>
                      <span className="font-medium text-gray-700">{editFormData.title || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500">Code:</span>
                      <span className="font-mono font-bold text-teal-600">{editFormData.couponCode || 'Not generated'}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500">Discount:</span>
                      <span className="font-medium text-green-600">{getDiscountDisplayText(true) || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500">Min. Order:</span>
                      <span className="font-medium">
                        {editFormData.minimumOrderAmount && parseFloat(editFormData.minimumOrderAmount) > 0 ? `৳${editFormData.minimumOrderAmount}` : 'No minimum'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500">Per User:</span>
                      <span className="font-medium">{editFormData.maxUsesPerUser || 1} time(s)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        editFormData.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {editFormData.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isEditing}
                className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {isEditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isEditing ? 'Updating...' : 'Update Coupon'}
              </button>
            </div>
          </form>
        )}
        
   {activeTab === 'view' && viewCoupon && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Left Column - All Details */}
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <Info className="w-5 h-5 text-teal-600" />
            Coupon Details
          </h2>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Title</label>
              <p className="text-sm font-medium text-gray-900 mt-1">{viewCoupon.title || '-'}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Coupon Code</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-sm font-mono font-bold text-teal-600">{viewCoupon.couponCode}</code>
                <button onClick={() => handleCopyCode(viewCoupon.couponCode)} className="p-1 text-gray-400 hover:text-gray-600">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
            {viewCoupon.subtitle && (
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Badge / Subtitle</label>
                <p className="text-sm text-gray-700 mt-1">{viewCoupon.subtitle}</p>
              </div>
            )}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Highlight Text</label>
              <p className="text-sm font-bold text-gray-900 mt-1">{viewCoupon.highlightText || '-'}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Status</label>
              <div className="mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  getStatusConfig(viewCoupon).bg
                } ${getStatusConfig(viewCoupon).text}`}>
                  {getStatusConfig(viewCoupon).label}
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Discount Type</label>
              <p className="text-sm font-semibold text-green-600 mt-1">{getDiscountDisplay(viewCoupon)}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Discount Value</label>
              <p className="text-sm text-gray-700 mt-1">
                {viewCoupon.discountType === 'percentage' && `${viewCoupon.discountValue}%`}
                {viewCoupon.discountType === 'fixed' && `৳${viewCoupon.discountValue}`}
                {viewCoupon.discountType === 'free_shipping' && 'Free Shipping'}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Minimum Order Amount</label>
              <p className="text-sm text-gray-700 mt-1">
                {viewCoupon.minimumOrderAmount > 0 ? `৳${viewCoupon.minimumOrderAmount}` : 'No minimum'}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Max Total Uses</label>
              <p className="text-sm text-gray-700 mt-1">{viewCoupon.maxTotalUses || 'Unlimited'}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Max Uses Per User</label>
              <p className="text-sm text-gray-700 mt-1">{viewCoupon.maxUsesPerUser} time(s)</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Total Used Count</label>
              <p className="text-sm text-gray-700 mt-1">{viewCoupon.totalUsedCount || 0}</p>
              {viewCoupon.maxTotalUses && (
                <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-teal-600 h-1.5 rounded-full"
                    style={{ width: `${Math.min((viewCoupon.totalUsedCount / viewCoupon.maxTotalUses) * 100, 100)}%` }}
                  ></div>
                </div>
              )}
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Expiry Date</label>
              <p className="text-sm text-gray-700 mt-1">{formatDate(viewCoupon.expiresAt)}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Created At</label>
              <p className="text-sm text-gray-700 mt-1">{new Date(viewCoupon.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Last Updated</label>
              <p className="text-sm text-gray-700 mt-1">{new Date(viewCoupon.updatedAt).toLocaleString()}</p>
            </div>
            {viewCoupon.spendThreshold && (
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Spend Threshold Text</label>
                <p className="text-sm text-gray-700 mt-1">{viewCoupon.spendThreshold}</p>
              </div>
            )}
          </div>
          
          {viewCoupon.description && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="text-xs text-gray-500 uppercase tracking-wider">Description</label>
              <p className="text-sm text-gray-700 mt-1">{viewCoupon.description}</p>
            </div>
          )}
          
          {/* Color Theme Details */}
          {viewCoupon.colorTheme && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Color Theme</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: viewCoupon.colorTheme.primary }}></div>
                  <span className="text-xs">Primary</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: viewCoupon.colorTheme.secondary }}></div>
                  <span className="text-xs">Secondary</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: viewCoupon.colorTheme.accent }}></div>
                  <span className="text-xs">Accent</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: viewCoupon.colorTheme.text }}></div>
                  <span className="text-xs">Text</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Features Badges */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Features</label>
            <div className="flex flex-wrap gap-2">
              {viewCoupon.isActive && (
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Active
                </span>
              )}
              {viewCoupon.showOnHomepage && (
                <span className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-700 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Show on Homepage
                </span>
              )}
              {viewCoupon.isFirstPurchaseOnly && (
                <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
                  <Users className="w-3 h-3" /> First Purchase Only
                </span>
              )}
              {viewCoupon.stackable && (
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Stackable
                </span>
              )}
              {viewCoupon.autoApply && (
                <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Auto Apply
                </span>
              )}
            </div>
          </div>
          
          {/* Created By */}
          {viewCoupon.createdBy && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="text-xs text-gray-500 uppercase tracking-wider">Created By</label>
              <p className="text-sm text-gray-700 mt-1">
                {viewCoupon.createdBy.name || viewCoupon.createdBy.email || 'Unknown'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Usage History - If you have usage records */}
      {viewCoupon.usageRecords && viewCoupon.usageRecords.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <Users className="w-5 h-5 text-teal-600" />
              Usage History
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {viewCoupon.usageRecords.slice(0, 10).map((record, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-700">
                      Used on {new Date(record.usedAt).toLocaleString()}
                    </p>
                    {record.discountAmount > 0 && (
                      <p className="text-xs text-gray-500">Saved: ৳{record.discountAmount}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">Order #{record.orderId?.slice(-6) || 'N/A'}</span>
                </div>
              ))}
              {viewCoupon.usageRecords.length > 10 && (
                <p className="text-xs text-center text-gray-500 pt-2">
                  + {viewCoupon.usageRecords.length - 10} more uses
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    
    {/* Right Column - Preview Card */}
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
            <Eye className="w-4 h-4 text-teal-600" />
            Coupon Preview
          </h3>
        </div>
        <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
          <CouponPreviewCard data={viewCoupon} isEdit={false} />
        </div>
      </div>
      
      {/* Quick Stats Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
            <Ticket className="w-4 h-4 text-teal-600" />
            Quick Stats
          </h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-teal-600">{viewCoupon.totalUsedCount || 0}</p>
              <p className="text-xs text-gray-500">Total Uses</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-teal-600">
                {viewCoupon.maxTotalUses ? `${Math.round((viewCoupon.totalUsedCount / viewCoupon.maxTotalUses) * 100)}%` : '∞'}
              </p>
              <p className="text-xs text-gray-500">Usage Rate</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xl font-bold text-teal-600">{viewCoupon.maxUsesPerUser}</p>
              <p className="text-xs text-gray-500">Per User Limit</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xl font-bold text-teal-600">
                {viewCoupon.expiresAt ? Math.ceil((new Date(viewCoupon.expiresAt) - new Date()) / (1000 * 60 * 60 * 24)) : '∞'}
              </p>
              <p className="text-xs text-gray-500">Days Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
        
        {activeTab === 'list' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by CouponCode ..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <button
                  onClick={fetchCoupons}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Coupons Table */}
            {isLoadingCoupons ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
              </div>
            ) : coupons.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Ticket className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No coupons found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? 'Try a different search term' : 'Create your first coupon to get started'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Create First Coupon
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uses</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {coupons.map((coupon) => {
                        const status = getStatusConfig(coupon);
                        return (
                          <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <code className="font-mono text-sm font-bold text-teal-600">{coupon.couponCode}</code>
                                <button onClick={() => handleCopyCode(coupon.couponCode)} className="p-1 text-gray-400 hover:text-gray-600">
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm font-medium text-gray-900">{coupon.title}</p>
                              {coupon.subtitle && <p className="text-xs text-gray-500">{coupon.subtitle}</p>}
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-semibold text-green-600">{getDiscountDisplay(coupon)}</span>
                              {coupon.minimumOrderAmount > 0 && (
                                <p className="text-xs text-gray-500">Min. ৳{coupon.minimumOrderAmount}</p>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-gray-700">{coupon.totalUsedCount || 0} / {coupon.maxTotalUses || '∞'}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-gray-400" />
                                <span className="text-sm text-gray-600">{formatDate(coupon.expiresAt)}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                                {status.label}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedCouponId(coupon._id);
                                    setActiveTab('view');
                                  }}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedCouponId(coupon._id);
                                    setActiveTab('edit');
                                  }}
                                  className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDuplicate(coupon)}
                                  className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg"
                                  title="Duplicate"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleToggleStatus(coupon)}
                                  className={`p-1.5 rounded-lg ${coupon.isActive ? 'text-gray-600 hover:bg-gray-50' : 'text-green-600 hover:bg-green-50'}`}
                                  title={coupon.isActive ? 'Deactivate' : 'Activate'}
                                >
                                  <Power className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(coupon)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                  {coupons.map((coupon) => {
                    const status = getStatusConfig(coupon);
                    return (
                      <div key={coupon._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-sm font-bold text-teal-600">{coupon.couponCode}</code>
                              <button onClick={() => handleCopyCode(coupon.couponCode)} className="p-1 text-gray-400">
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 mt-1">{coupon.title}</h3>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                            {status.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                          <div>
                            <p className="text-xs text-gray-500">Discount</p>
                            <p className="font-semibold text-green-600">{getDiscountDisplay(coupon)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Uses</p>
                            <p>{coupon.totalUsedCount || 0} / {coupon.maxTotalUses || '∞'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Min. Order</p>
                            <p>{coupon.minimumOrderAmount > 0 ? `৳${coupon.minimumOrderAmount}` : 'None'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Expiry</p>
                            <p className="text-xs">{formatDate(coupon.expiresAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => {
                              setSelectedCouponId(coupon._id);
                              setActiveTab('view');
                            }}
                            className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCouponId(coupon._id);
                              setActiveTab('edit');
                            }}
                            className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg"
                          >
                            Edit
                          </button>
                          <button onClick={() => handleDuplicate(coupon)} className="px-3 py-1.5 text-sm text-orange-600 hover:bg-orange-50 rounded-lg">
                            Duplicate
                          </button>
                          <button onClick={() => handleToggleStatus(coupon)} className={`px-3 py-1.5 text-sm rounded-lg ${coupon.isActive ? 'text-gray-600 hover:bg-gray-50' : 'text-green-600 hover:bg-green-50'}`}>
                            {coupon.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button onClick={() => handleDeleteClick(coupon)} className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-gray-500">
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCoupons)} of {totalCoupons} coupons
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                                currentPage === pageNum ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Delete Coupon</h3>
            </div>
            <p className="text-gray-600 mb-2">
              Are you sure you want to delete the coupon <strong className="font-mono">{selectedCoupon.couponCode}</strong>?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. All usage data for this coupon will be permanently removed.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} disabled={isDeleting} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 