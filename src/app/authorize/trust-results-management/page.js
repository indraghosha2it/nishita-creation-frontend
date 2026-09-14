// app/authorize/trust-results-management/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  RotateCcw, 
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  ArrowLeft,
  Upload,
  X,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  ShieldCheck,
  FlaskConical,
  Leaf,
  HeartHandshake,
  Heart,
  Star,
  Users,
  Award,
  Search,
  Package
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================================
// ICON OPTIONS
// ============================================================

const ICON_OPTIONS = [
  { value: 'ShieldCheck', label: 'Shield Check', icon: ShieldCheck },
  { value: 'FlaskConical', label: 'Flask Conical', icon: FlaskConical },
  { value: 'Leaf', label: 'Leaf', icon: Leaf },
  { value: 'HeartHandshake', label: 'Heart Handshake', icon: HeartHandshake },
  { value: 'Heart', label: 'Heart', icon: Heart },
  { value: 'Star', label: 'Star', icon: Star },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Award', label: 'Award', icon: Award }
];

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================

const ImageUpload = ({ imageUrl, onImageChange, onImageRemove, label = 'Image', aspectRatio = '16/9', className = '' }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(imageUrl || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setPreview(imageUrl || '');
  }, [imageUrl]);

  const validateImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: 'Only JPG, PNG, and WebP formats are allowed.' };
    }
    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, message: 'Image size must be less than 5MB.' };
    }
    return { valid: true };
  };

  const compressImageSmart = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          let quality = 0.4;
          if (file.size > 5 * 1024 * 1024) quality = 0.25;
          else if (file.size > 2 * 1024 * 1024) quality = 0.3;
          else if (file.size > 1 * 1024 * 1024) quality = 0.35;
          else if (file.size > 500 * 1024) quality = 0.45;
          else quality = 0.55;
          
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            'image/jpeg',
            quality
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  const uploadToCloudinary = async (file) => {
    const compressedFile = await compressImageSmart(file);
    
    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      const data = await response.json();
      if (data.secure_url) {
        return {
          url: data.secure_url,
          publicId: data.public_id,
        };
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.message);
      toast.error(validation.message);
      return;
    }

    setError('');
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      const result = await uploadToCloudinary(file);
      
      if (result && result.url) {
        onImageChange(result.url);
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image');
      toast.error('Failed to upload image');
      setPreview('');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageRemove();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {preview ? (
        <div className="relative inline-block">
          <div className={`rounded-lg overflow-hidden border-2 border-[#86987E]/30 bg-gray-100`}
               style={{ width: '200px', aspectRatio: aspectRatio }}>
            <img 
              src={preview} 
              alt={label} 
              className="w-full h-full object-cover"
            />
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-[#708268] text-white rounded-lg hover:bg-pink-700 transition-colors text-sm disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <span className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</span>
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

// ============================================================
// PRODUCT SEARCH COMPONENT
// ============================================================

const ProductSearch = ({ onProductSelect, selectedProduct, label = 'Search Product' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      setSearchTerm(selectedProduct.name);
    }
  }, [selectedProduct]);

  const searchProducts = async (query) => {
    if (!query || query.trim().length < 2) {
      setProducts([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/api/products/admin/all?search=${encodeURIComponent(query)}&limit=10`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (!value && selectedProduct) {
      onProductSelect(null);
    }
    
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(value);
    }, 300);
  };

  const handleSelectProduct = (product) => {
    onProductSelect({
      id: product._id,
      name: product.productName,
      image: product.images && product.images.length > 0 ? product.images[0].url : '',
    });
    setSearchTerm(product.productName);
    setShowDropdown(false);
    setProducts([]);
  };

  const handleClearSelection = () => {
    onProductSelect(null);
    setSearchTerm('');
    setProducts([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => {
                if (searchTerm && searchTerm.length >= 2 && products.length > 0) {
                  setShowDropdown(true);
                }
              }}
              placeholder="Search products by name, SKU, or brand..."
              className="w-full pl-10 pr-10 py-2 border border-pink-200/50 rounded-xl focus:ring-2 focus:ring-[#708268]/30 focus:border-[#708268] outline-none transition bg-white text-sm"
              autoComplete="off"
            />
            {selectedProduct && (
              <button
                onClick={handleClearSelection}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-[#708268]" />
              </div>
            )}
          </div>
        </div>

        {selectedProduct && (
          <div className="mt-2 flex items-center gap-3 p-3 bg-pink-50 rounded-lg border border-pink-200/50">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-pink-200/30">
              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{selectedProduct.name}</p>
              <p className="text-xs text-gray-500">Selected product will be featured</p>
            </div>
            <button
              onClick={handleClearSelection}
              className="ml-auto text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {showDropdown && products.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-pink-200/50 max-h-60 overflow-y-auto">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleSelectProduct(product)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-pink-50 cursor-pointer transition-colors border-b border-pink-100/50 last:border-b-0"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.productName}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.productName}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {product.brand || 'No brand'} • {product.skuCode || 'No SKU'} • ৳{product.regularPrice}
                  </p>
                </div>
                <button className="text-[#708268] text-sm font-medium">Select</button>
              </div>
            ))}
          </div>
        )}

        {showDropdown && products.length === 0 && searchTerm.length >= 2 && !isLoading && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-pink-200/50 p-4 text-center">
            <p className="text-sm text-gray-500">No products found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// GENERATE ID HELPER
// ============================================================

const generateId = () => `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// ============================================================
// DEFAULT DATA
// ============================================================

const DEFAULT_DATA = {
  sectionTitle: 'TRUSTED BY THOUSANDS',
  mainHeading: 'REAL RESULTS. REAL CONFIDENCE.',
  featuredProducts: [
    {
      id: generateId(),
      productId: null,
      productName: 'Radiance Face Serum',
      image: '/images/products/radiance-serum.png',
      link: '/products',
      stats: [
        { value: '92%', text: 'saw brighter skin' },
        { value: '91%', text: 'noticed smoother texture' },
        { value: '89%', text: 'felt more confident in their skin' }
      ],
      beforeAfter: {
        beforeImage: '/images/results-before.jpg',
        afterImage: '/images/results-after.jpg',
        beforeLabel: 'BEFORE',
        afterLabel: 'AFTER'
      },
      displayOrder: 0,
      isActive: true
    },
    {
      id: generateId(),
      productId: null,
      productName: 'Nourishing Night Cream',
      image: '/images/products/night-cream.png',
      link: '/products',
      stats: [
        { value: '95%', text: 'woke up with hydrated skin' },
        { value: '88%', text: 'reduced fine lines' },
        { value: '93%', text: 'felt more rested' }
      ],
      beforeAfter: {
        beforeImage: '/images/results-before-2.jpg',
        afterImage: '/images/results-after-2.jpg',
        beforeLabel: 'BEFORE',
        afterLabel: 'AFTER'
      },
      displayOrder: 1,
      isActive: true
    },
    {
      id: generateId(),
      productId: null,
      productName: 'Revitalizing Eye Cream',
      image: '/images/products/eye-cream.png',
      link: '/products',
      stats: [
        { value: '90%', text: 'reduced dark circles' },
        { value: '87%', text: 'looked more awake' },
        { value: '94%', text: 'felt confident without makeup' }
      ],
      beforeAfter: {
        beforeImage: '/images/results-before-3.jpg',
        afterImage: '/images/results-after-3.jpg',
        beforeLabel: 'BEFORE',
        afterLabel: 'AFTER'
      },
      displayOrder: 2,
      isActive: true
    }
  ],
  trustFeatures: [
    { id: 1, icon: 'ShieldCheck', title: 'DERMATOLOGIST TESTED', displayOrder: 0, isActive: true },
    { id: 2, icon: 'FlaskConical', title: 'CLINICALLY PROVEN', displayOrder: 1, isActive: true },
    { id: 3, icon: 'Leaf', title: 'CLEAN & NON-TOXIC', displayOrder: 2, isActive: true },
    { id: 4, icon: 'HeartHandshake', title: 'CRUELTY FREE', displayOrder: 3, isActive: true },
    { id: 5, icon: 'Heart', title: 'MADE WITH LOVE', displayOrder: 4, isActive: true }
  ],
  testimonials: [
    {
      id: 1,
      name: 'Jessica M.',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop',
      review: '"My skin has never looked better!"',
      description: '"The Radiance Serum is a game changer."',
      rating: 5,
      displayOrder: 0,
      isActive: true
    },
    {
      id: 2,
      name: 'Priya R.',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop',
      review: '"I love how gentle yet effective"',
      description: '"these products are. Highly recommend!"',
      rating: 5,
      displayOrder: 1,
      isActive: true
    },
    {
      id: 3,
      name: 'Emily T.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
      review: '"Luminous, clean, and results-driven."',
      description: '"Lumine is now my go-to skincare."',
      rating: 5,
      displayOrder: 2,
      isActive: true
    }
  ],
  testimonialsTitle: 'LOVED BY OUR COMMUNITY'
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function TrustResultsManagement() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch(`${API_URL}/api/trust-results/admin`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 403) {
        toast.error('You do not have permission to manage trust results');
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setData(result.data);
          toast.success('Data loaded successfully');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to load data');
        setData(DEFAULT_DATA);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Network error. Please try again.');
      setData(DEFAULT_DATA);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setIsSaving(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/trust-results/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.status === 403) {
        toast.error('You do not have permission to update');
        setIsSaving(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          toast.success('Trust results updated successfully!');
          await fetchData();
        } else {
          toast.error(result.error || 'Failed to save');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset to default? This action cannot be undone.')) {
      return;
    }

    try {
      setIsResetting(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setIsResetting(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/trust-results/admin/reset`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 403) {
        toast.error('You do not have permission to reset');
        setIsResetting(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          toast.success('Trust results reset to default!');
          setData(DEFAULT_DATA);
        } else {
          toast.error(result.error || 'Failed to reset');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to reset data');
      }
    } catch (error) {
      console.error('Error resetting data:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  // Update handlers
  const updateField = (section, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addArrayItem = (section, template) => {
    setData(prev => {
      const currentItems = Array.isArray(prev[section]) ? prev[section] : [];
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      return {
        ...prev,
        [section]: [...currentItems, { ...template, id: newId, isActive: true, displayOrder: currentItems.length }]
      };
    });
  };

  const removeArrayItem = (section, index) => {
    setData(prev => {
      const currentItems = Array.isArray(prev[section]) ? prev[section] : [];
      const newItems = [...currentItems];
      newItems.splice(index, 1);
      return { ...prev, [section]: newItems };
    });
  };

  const toggleArrayItemActive = (section, index) => {
    setData(prev => {
      const currentItems = Array.isArray(prev[section]) ? prev[section] : [];
      const newItems = [...currentItems];
      if (newItems[index]) {
        newItems[index] = { ...newItems[index], isActive: !newItems[index].isActive };
      }
      return { ...prev, [section]: newItems };
    });
  };

  const updateArrayItem = (section, index, field, value) => {
    setData(prev => {
      const currentItems = Array.isArray(prev[section]) ? prev[section] : [];
      const newItems = [...currentItems];
      if (newItems[index]) {
        newItems[index] = { ...newItems[index], [field]: value };
      }
      return { ...prev, [section]: newItems };
    });
  };

  const moveArrayItem = (section, fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    setData(prev => {
      const currentItems = Array.isArray(prev[section]) ? [...prev[section]] : [];
      const [removed] = currentItems.splice(fromIndex, 1);
      currentItems.splice(toIndex, 0, removed);
      currentItems.forEach((item, idx) => item.displayOrder = idx);
      return { ...prev, [section]: currentItems };
    });
  };

  if (isLoading) {
    return (
      <ProtectedRoute pageKey="trust_results_management">
        <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#708268] mx-auto" />
            <p className="text-gray-500 mt-2">Loading data...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const currentData = data || DEFAULT_DATA;

  return (
    <ProtectedRoute pageKey="trust_results_management">
      <div className="min-h-screen bg-[#f0f7fa]">
        {/* Header */}
        <div className="bg-white border-b border-[#708268]/20 shadow-lg sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4">
                <a href="/authorize/dashboard" className="p-1.5 sm:p-2 hover:bg-[#86987E]/20 rounded-lg transition-colors flex-shrink-0">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black/80 hover:text-black" />
                </a>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black truncate">
                    Trust & Results Management
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">
                    Manage featured products, trust features, stats, testimonials, and more
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleReset}
                  disabled={isResetting}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-[#86987E]/20 text-black rounded-lg hover:bg-[#86987E]/30 transition-colors border border-[#86987E]/20 disabled:opacity-50"
                >
                  {isResetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
                  Reset
                </button>
                <button
                  onClick={fetchData}
                  className="p-1.5 sm:p-2 text-gray-600 hover:bg-[#708268]/10 rounded-lg transition-colors hover:text-[#708268]"
                  title="Refresh"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[#708268]/20 pb-2 bg-white rounded-t-xl shadow-sm border border-[#708268]/20 p-4">
              {[
                { id: 'general', label: 'General' },
                { id: 'featured_products', label: 'Featured Products' },
                { id: 'trust_features', label: 'Trust Features' },
                { id: 'testimonials', label: 'Testimonials' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#708268] text-white'
                      : 'text-gray-600 hover:bg-[#708268]/10 hover:text-[#708268]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* ============================================================
                  GENERAL TAB
              ============================================================ */}
              {activeTab === 'general' && (
                <div className="bg-white rounded-xl shadow-sm border border-[#708268]/20 p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
                    General Settings
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                      <input
                        type="text"
                        value={currentData.sectionTitle || ''}
                        onChange={(e) => setData(prev => ({ ...prev, sectionTitle: e.target.value }))}
                        className="w-full px-3 py-2 border border-[#708268]/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                        placeholder="TRUSTED BY THOUSANDS"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Main Heading</label>
                      <input
                        type="text"
                        value={currentData.mainHeading || ''}
                        onChange={(e) => setData(prev => ({ ...prev, mainHeading: e.target.value }))}
                        className="w-full px-3 py-2 border border-[#708268]/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                        placeholder="REAL RESULTS. REAL CONFIDENCE."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Testimonials Title</label>
                      <input
                        type="text"
                        value={currentData.testimonialsTitle || ''}
                        onChange={(e) => setData(prev => ({ ...prev, testimonialsTitle: e.target.value }))}
                        className="w-full px-3 py-2 border border-[#708268]/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                        placeholder="LOVED BY OUR COMMUNITY"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================
                  FEATURED PRODUCTS TAB
              ============================================================ */}
              {activeTab === 'featured_products' && (
                <div className="bg-white rounded-xl shadow-sm border border-[#708268]/20 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#708268]" />
                      Featured Products <span className="text-xs font-normal text-gray-400">(Carousel)</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        const newProduct = {
                          id: generateId(),
                          productId: null,
                          productName: 'New Product',
                          image: '',
                          link: '/products',
                          stats: [
                            { value: '90%', text: 'new stat 1' },
                            { value: '85%', text: 'new stat 2' },
                            { value: '88%', text: 'new stat 3' }
                          ],
                          beforeAfter: {
                            beforeImage: '',
                            afterImage: '',
                            beforeLabel: 'BEFORE',
                            afterLabel: 'AFTER'
                          },
                          displayOrder: (currentData.featuredProducts || []).length,
                          isActive: true
                        };
                        setData(prev => ({
                          ...prev,
                          featuredProducts: [...(prev.featuredProducts || []), newProduct]
                        }));
                        toast.success('New featured product added');
                      }}
                      className="px-3 py-1.5 bg-[#708268] text-white text-sm rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Product
                    </button>
                  </div>

                  <div className="space-y-6">
                    {(currentData.featuredProducts || []).map((product, index) => (
                      <div key={product.id || index} className="border border-pink-200/50 rounded-xl p-4 bg-pink-50/30">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-gray-700 flex items-center gap-2">
                            <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                            Product #{index + 1}
                            <span className={`text-xs px-2 py-0.5 rounded ${product.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                              {product.isActive !== false ? 'Active' : 'Inactive'}
                            </span>
                          </h3>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setData(prev => {
                                  const items = [...(prev.featuredProducts || [])];
                                  items[index] = { ...items[index], isActive: !items[index].isActive };
                                  return { ...prev, featuredProducts: items };
                                });
                              }}
                              className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            >
                              {product.isActive !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Remove "${product.productName}" from featured products?`)) {
                                  setData(prev => ({
                                    ...prev,
                                    featuredProducts: (prev.featuredProducts || []).filter((_, i) => i !== index)
                                  }));
                                  toast.success('Product removed');
                                }
                              }}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Left Column - Product Details */}
                          <div className="space-y-3">
                            <ProductSearch
                              onProductSelect={(selected) => {
                                if (selected) {
                                  setData(prev => {
                                    const items = [...(prev.featuredProducts || [])];
                                    items[index] = {
                                      ...items[index],
                                      productId: selected.id,
                                      productName: selected.name,
                                      image: selected.image
                                    };
                                    return { ...prev, featuredProducts: items };
                                  });
                                }
                              }}
                              selectedProduct={product.productId ? { id: product.productId, name: product.productName, image: product.image } : null}
                              label="Search Product"
                            />

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Product Name</label>
                              <input
                                type="text"
                                value={product.productName || ''}
                                onChange={(e) => {
                                  setData(prev => {
                                    const items = [...(prev.featuredProducts || [])];
                                    items[index] = { ...items[index], productName: e.target.value };
                                    return { ...prev, featuredProducts: items };
                                  });
                                }}
                                className="w-full px-3 py-1.5 border border-pink-200/50 rounded-lg text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                                placeholder="Product name"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Product Link</label>
                              <input
                                type="text"
                                value={product.link || '/products'}
                                onChange={(e) => {
                                  setData(prev => {
                                    const items = [...(prev.featuredProducts || [])];
                                    items[index] = { ...items[index], link: e.target.value };
                                    return { ...prev, featuredProducts: items };
                                  });
                                }}
                                className="w-full px-3 py-1.5 border border-pink-200/50 rounded-lg text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                                placeholder="/products"
                              />
                            </div>

                            <ImageUpload
                              imageUrl={product.image || ''}
                              onImageChange={(url) => {
                                setData(prev => {
                                  const items = [...(prev.featuredProducts || [])];
                                  items[index] = { ...items[index], image: url };
                                  return { ...prev, featuredProducts: items };
                                });
                              }}
                              onImageRemove={() => {
                                setData(prev => {
                                  const items = [...(prev.featuredProducts || [])];
                                  items[index] = { ...items[index], image: '' };
                                  return { ...prev, featuredProducts: items };
                                });
                              }}
                              label="Product Image"
                              aspectRatio="1/1"
                            />
                          </div>

                          {/* Right Column - Stats & Before/After */}
                          <div className="space-y-3">
                            {/* Stats */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-medium text-gray-700">Stats</label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setData(prev => {
                                      const items = [...(prev.featuredProducts || [])];
                                      const stats = [...(items[index].stats || [])];
                                      stats.push({ value: '90%', text: 'new stat' });
                                      items[index] = { ...items[index], stats };
                                      return { ...prev, featuredProducts: items };
                                    });
                                  }}
                                  className="text-xs text-[#708268] hover:text-pink-700"
                                >
                                  + Add Stat
                                </button>
                              </div>
                              <div className="space-y-1.5">
                                {(product.stats || []).map((stat, statIndex) => (
                                  <div key={statIndex} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={stat.value || ''}
                                      onChange={(e) => {
                                        setData(prev => {
                                          const items = [...(prev.featuredProducts || [])];
                                          const stats = [...(items[index].stats || [])];
                                          stats[statIndex] = { ...stats[statIndex], value: e.target.value };
                                          items[index] = { ...items[index], stats };
                                          return { ...prev, featuredProducts: items };
                                        });
                                      }}
                                      className="w-20 px-2 py-1 border border-pink-200/50 rounded text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                                      placeholder="92%"
                                    />
                                    <input
                                      type="text"
                                      value={stat.text || ''}
                                      onChange={(e) => {
                                        setData(prev => {
                                          const items = [...(prev.featuredProducts || [])];
                                          const stats = [...(items[index].stats || [])];
                                          stats[statIndex] = { ...stats[statIndex], text: e.target.value };
                                          items[index] = { ...items[index], stats };
                                          return { ...prev, featuredProducts: items };
                                        });
                                      }}
                                      className="flex-1 px-2 py-1 border border-pink-200/50 rounded text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                                      placeholder="Stat text"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setData(prev => {
                                          const items = [...(prev.featuredProducts || [])];
                                          const stats = [...(items[index].stats || [])];
                                          stats.splice(statIndex, 1);
                                          items[index] = { ...items[index], stats };
                                          return { ...prev, featuredProducts: items };
                                        });
                                      }}
                                      className="text-red-400 hover:text-red-600"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Before/After Images */}
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-2">Before / After Images</label>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <ImageUpload
                                    imageUrl={product.beforeAfter?.beforeImage || ''}
                                    onImageChange={(url) => {
                                      setData(prev => {
                                        const items = [...(prev.featuredProducts || [])];
                                        items[index] = {
                                          ...items[index],
                                          beforeAfter: { ...items[index].beforeAfter, beforeImage: url }
                                        };
                                        return { ...prev, featuredProducts: items };
                                      });
                                    }}
                                    onImageRemove={() => {
                                      setData(prev => {
                                        const items = [...(prev.featuredProducts || [])];
                                        items[index] = {
                                          ...items[index],
                                          beforeAfter: { ...items[index].beforeAfter, beforeImage: '' }
                                        };
                                        return { ...prev, featuredProducts: items };
                                      });
                                    }}
                                    label="Before Image"
                                    aspectRatio="4/5"
                                  />
                                </div>
                                <div>
                                  <ImageUpload
                                    imageUrl={product.beforeAfter?.afterImage || ''}
                                    onImageChange={(url) => {
                                      setData(prev => {
                                        const items = [...(prev.featuredProducts || [])];
                                        items[index] = {
                                          ...items[index],
                                          beforeAfter: { ...items[index].beforeAfter, afterImage: url }
                                        };
                                        return { ...prev, featuredProducts: items };
                                      });
                                    }}
                                    onImageRemove={() => {
                                      setData(prev => {
                                        const items = [...(prev.featuredProducts || [])];
                                        items[index] = {
                                          ...items[index],
                                          beforeAfter: { ...items[index].beforeAfter, afterImage: '' }
                                        };
                                        return { ...prev, featuredProducts: items };
                                      });
                                    }}
                                    label="After Image"
                                    aspectRatio="4/5"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3 mt-2">
                                <input
                                  type="text"
                                  value={product.beforeAfter?.beforeLabel || 'BEFORE'}
                                  onChange={(e) => {
                                    setData(prev => {
                                      const items = [...(prev.featuredProducts || [])];
                                      items[index] = {
                                        ...items[index],
                                        beforeAfter: { ...items[index].beforeAfter, beforeLabel: e.target.value }
                                      };
                                      return { ...prev, featuredProducts: items };
                                    });
                                  }}
                                  className="w-full px-2 py-1 border border-pink-200/50 rounded text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                                  placeholder="BEFORE"
                                />
                                <input
                                  type="text"
                                  value={product.beforeAfter?.afterLabel || 'AFTER'}
                                  onChange={(e) => {
                                    setData(prev => {
                                      const items = [...(prev.featuredProducts || [])];
                                      items[index] = {
                                        ...items[index],
                                        beforeAfter: { ...items[index].beforeAfter, afterLabel: e.target.value }
                                      };
                                      return { ...prev, featuredProducts: items };
                                    });
                                  }}
                                  className="w-full px-2 py-1 border border-pink-200/50 rounded text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                                  placeholder="AFTER"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {(currentData.featuredProducts || []).length === 0 && (
                      <div className="text-center py-8 text-gray-500 border-2 border-dashed border-pink-200 rounded-xl">
                        <Package className="w-12 h-12 mx-auto mb-2 text-pink-300" />
                        <p>No featured products added yet</p>
                        <p className="text-sm">Click "Add Product" to create your first featured product</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ============================================================
                  TRUST FEATURES TAB
              ============================================================ */}
              {activeTab === 'trust_features' && (
                <div className="bg-white rounded-xl shadow-sm border border-[#708268]/20 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      Trust Features
                    </h2>
                    <button
                      type="button"
                      onClick={() => addArrayItem('trustFeatures', { icon: 'ShieldCheck', title: 'New Feature' })}
                      className="px-3 py-1.5 bg-[#708268] text-white text-sm rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Feature
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(currentData.trustFeatures || []).map((feature, index) => {
                      const IconComponent = ICON_OPTIONS.find(opt => opt.value === feature.icon)?.icon || ShieldCheck;
                      return (
                        <div key={feature.id || index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
                                <select
                                  value={feature.icon || 'ShieldCheck'}
                                  onChange={(e) => updateArrayItem('trustFeatures', index, 'icon', e.target.value)}
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                                >
                                  {ICON_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                                <input
                                  type="text"
                                  value={feature.title || ''}
                                  onChange={(e) => updateArrayItem('trustFeatures', index, 'title', e.target.value)}
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                                  placeholder="DERMATOLOGIST TESTED"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => toggleArrayItemActive('trustFeatures', index)}
                                className={`px-2 py-1 text-xs rounded ${feature.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                              >
                                {feature.isActive !== false ? 'Active' : 'Inactive'}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('trustFeatures', index)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {(currentData.trustFeatures || []).length === 0 && (
                      <p className="text-gray-500 text-center py-4">No trust features added yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* ============================================================
                  TESTIMONIALS TAB
              ============================================================ */}
              {activeTab === 'testimonials' && (
                <div className="bg-white rounded-xl shadow-sm border border-[#708268]/20 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      Testimonials
                    </h2>
                    <button
                      type="button"
                      onClick={() => addArrayItem('testimonials', { 
                        name: 'New Customer', 
                        image: '', 
                        review: '"Great product!"', 
                        description: '"Highly recommend."', 
                        rating: 5 
                      })}
                      className="px-3 py-1.5 bg-[#708268] text-white text-sm rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Testimonial
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(currentData.testimonials || []).map((testimonial, index) => (
                      <div key={testimonial.id || index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                              <input
                                type="text"
                                value={testimonial.name || ''}
                                onChange={(e) => updateArrayItem('testimonials', index, 'name', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                                placeholder="Jessica M."
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Rating (1-5)</label>
                              <input
                                type="number"
                                min="1"
                                max="5"
                                value={testimonial.rating || 5}
                                onChange={(e) => updateArrayItem('testimonials', index, 'rating', parseInt(e.target.value) || 5)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Review</label>
                              <input
                                type="text"
                                value={testimonial.review || ''}
                                onChange={(e) => updateArrayItem('testimonials', index, 'review', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                                placeholder='"My skin has never looked better!"'
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                              <input
                                type="text"
                                value={testimonial.description || ''}
                                onChange={(e) => updateArrayItem('testimonials', index, 'description', e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none"
                                placeholder='"The Radiance Serum is a game changer."'
                              />
                            </div>
                            <div className="md:col-span-2">
                              <ImageUpload
                                imageUrl={testimonial.image || ''}
                                onImageChange={(url) => updateArrayItem('testimonials', index, 'image', url)}
                                onImageRemove={() => updateArrayItem('testimonials', index, 'image', '')}
                                label="Customer Image"
                                aspectRatio="1/1"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleArrayItemActive('testimonials', index)}
                              className={`px-2 py-1 text-xs rounded ${testimonial.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                            >
                              {testimonial.isActive !== false ? 'Active' : 'Inactive'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('testimonials', index)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(currentData.testimonials || []).length === 0 && (
                      <p className="text-gray-500 text-center py-4">No testimonials added yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-[#708268]/20">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-[#708268]  text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}