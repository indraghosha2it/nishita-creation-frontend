// app/authorize/why-choose-us-management/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  Shield,
  Truck,
  Leaf,
  Award,
  Star,
  Heart,
  Clock,
  Gift,
  Sparkles,
  ThumbsUp,
  CheckCircle2,
  Crown,
  Users,
  Smile,
  Gem,
  Hand,
  Flower2,
  Droplets,
  Sun,
  Moon,
  Image as ImageIcon
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { toast } from 'sonner';

// ============================================================
// ICON OPTIONS
// ============================================================

const ICON_OPTIONS = [
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Truck', label: 'Truck', icon: Truck },
  { value: 'Leaf', label: 'Leaf', icon: Leaf },
  { value: 'Award', label: 'Award', icon: Award },
  { value: 'Star', label: 'Star', icon: Star },
  { value: 'Heart', label: 'Heart', icon: Heart },
  { value: 'Clock', label: 'Clock', icon: Clock },
  { value: 'Gift', label: 'Gift', icon: Gift },
  { value: 'Sparkles', label: 'Sparkles', icon: Sparkles },
  { value: 'ThumbsUp', label: 'Thumbs Up', icon: ThumbsUp },
  { value: 'CheckCircle2', label: 'Check Circle', icon: CheckCircle2 },
  { value: 'Crown', label: 'Crown', icon: Crown },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Smile', label: 'Smile', icon: Smile },
  { value: 'Gem', label: 'Gem', icon: Gem },
  { value: 'Hand', label: 'Hand', icon: Hand },
  { value: 'Flower2', label: 'Flower', icon: Flower2 },
  { value: 'Droplets', label: 'Droplets', icon: Droplets },
  { value: 'Sun', label: 'Sun', icon: Sun },
  { value: 'Moon', label: 'Moon', icon: Moon }
];

const TRUST_BADGE_ICONS = [
  { value: 'ThumbsUp', label: 'Thumbs Up', icon: ThumbsUp },
  { value: 'CheckCircle2', label: 'Check Circle', icon: CheckCircle2 },
  { value: 'Crown', label: 'Crown', icon: Crown },
  { value: 'Award', label: 'Award', icon: Award },
  { value: 'Heart', label: 'Heart', icon: Heart },
  { value: 'Star', label: 'Star', icon: Star },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Users', label: 'Users', icon: Users }
];

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================

const ImageUpload = ({ 
  imageUrl, 
  onImageChange, 
  onImageRemove, 
  label = 'Image', 
  aspectRatio = '16/9', 
  className = '',
  helpText = '',
  required = false
}) => {
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
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageRemove();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {preview ? (
        <div className="relative inline-block">
          <div className={`rounded-lg overflow-hidden border-2 border-pink-500/30 bg-gray-100`}
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
            className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm disabled:opacity-50"
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
      {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

// ============================================================
// ICON PICKER COMPONENT
// ============================================================

const IconPicker = ({ value, onChange, options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedIcon = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none flex items-center gap-2 bg-white"
      >
        {selectedIcon ? (
          <>
            <selectedIcon.icon className="w-4 h-4 text-pink-600" />
            <span>{selectedIcon.label}</span>
          </>
        ) : (
          <span className="text-gray-400">Select icon</span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="grid grid-cols-2 gap-1 p-2">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-pink-50 transition-colors ${
                  value === opt.value ? 'bg-pink-100 text-pink-600' : 'text-gray-700'
                }`}
              >
                <opt.icon className="w-4 h-4" />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// DEFAULT DATA
// ============================================================

const DEFAULT_DATA = {
  section: {
    badge: 'Why Choose Us',
    title: 'Why Choose Us',
    subtitle: 'Discover why thousands of beauty enthusiasts trust us for their skincare and makeup needs'
  },
  cards: [
    { icon: 'Shield', title: '100% Authentic', description: 'Premium quality products sourced directly from trusted brands', side: 'left', displayOrder: 0, isActive: true },
    { icon: 'Truck', title: 'Fast Delivery', description: 'Free shipping on orders above ৳500 with express delivery options', side: 'left', displayOrder: 1, isActive: true },
    { icon: 'Leaf', title: 'Cruelty-Free', description: 'We only stock products that are ethically sourced and tested', side: 'left', displayOrder: 2, isActive: true },
    { icon: 'Award', title: 'Curated Selection', description: 'Handpicked beauty products by our expert team of professionals', side: 'left', displayOrder: 3, isActive: true },
    { icon: 'Star', title: 'Trusted Reviews', description: 'Real customer reviews to help you make the right choice', side: 'right', displayOrder: 4, isActive: true },
    { icon: 'Heart', title: 'Love Your Skin', description: 'Formulated with natural ingredients for sensitive skin. Enriched with soothing botanicals', side: 'right', displayOrder: 5, isActive: true },
    { icon: 'Clock', title: '24/7 Support', description: 'Dedicated customer care team ready to assist you anytime', side: 'right', displayOrder: 6, isActive: true },
    { icon: 'Gift', title: 'Loyalty Rewards', description: 'Earn points and unlock exclusive deals with every purchase', side: 'right', displayOrder: 7, isActive: true }
  ],
  centerImage: '/images/choose.jpg',
  trustBadges: [
    { icon: 'ThumbsUp', label: 'Trusted by 10k+ Customers', isActive: true },
    { icon: 'CheckCircle2', label: '100% Satisfaction Guaranteed', isActive: true },
    { icon: 'Crown', label: 'Premium Quality Products', isActive: true }
  ],
  isActive: true
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function WhyChooseUsManagement() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [activeTab, setActiveTab] = useState('cards');

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setLoading(false);
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/admin/why-choose-us', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to manage Why Choose Us');
        setLoading(false);
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
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setSaving(false);
        return;
      }

      const dataToSave = {
        section: data.section || DEFAULT_DATA.section,
        cards: data.cards || DEFAULT_DATA.cards,
        centerImage: data.centerImage || DEFAULT_DATA.centerImage,
        trustBadges: data.trustBadges || DEFAULT_DATA.trustBadges,
        isActive: data.isActive !== undefined ? data.isActive : true
      };

      const response = await fetch('http://localhost:5000/api/admin/why-choose-us', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSave)
      });

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to update');
        setSaving(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          toast.success('✅ Updated successfully!');
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
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset to default? This action cannot be undone.')) {
      return;
    }

    try {
      setResetting(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setResetting(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/admin/why-choose-us/reset', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to reset');
        setResetting(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          toast.success('Reset to default!');
          setData(DEFAULT_DATA);
        } else {
          toast.error(result.error || 'Failed to reset');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to reset');
      }
    } catch (error) {
      console.error('Error resetting:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setResetting(false);
    }
  };

  // Update handlers
  const updateField = (section, field, value) => {
    setData(prev => {
      if (!prev) return DEFAULT_DATA;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  };

  const updateCard = (index, field, value) => {
    setData(prev => {
      if (!prev) return DEFAULT_DATA;
      const cards = [...(prev.cards || [])];
      if (cards[index]) {
        cards[index] = { ...cards[index], [field]: value };
      }
      return { ...prev, cards };
    });
  };

  const addCard = () => {
    setData(prev => {
      if (!prev) return DEFAULT_DATA;
      const cards = [...(prev.cards || [])];
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      cards.push({
        id: newId,
        icon: 'Shield',
        title: 'New Feature',
        description: 'Description of this feature',
        side: 'left',
        displayOrder: cards.length,
        isActive: true
      });
      return { ...prev, cards };
    });
  };

  const removeCard = (index) => {
    setData(prev => {
      if (!prev) return DEFAULT_DATA;
      const cards = [...(prev.cards || [])];
      cards.splice(index, 1);
      return { ...prev, cards };
    });
  };

  const toggleCardActive = (index) => {
    setData(prev => {
      if (!prev) return DEFAULT_DATA;
      const cards = [...(prev.cards || [])];
      if (cards[index]) {
        cards[index] = { ...cards[index], isActive: !cards[index].isActive };
      }
      return { ...prev, cards };
    });
  };

  const updateTrustBadge = (index, field, value) => {
    setData(prev => {
      if (!prev) return DEFAULT_DATA;
      const badges = [...(prev.trustBadges || [])];
      if (badges[index]) {
        badges[index] = { ...badges[index], [field]: value };
      }
      return { ...prev, trustBadges: badges };
    });
  };

  const addTrustBadge = () => {
    setData(prev => {
      if (!prev) return DEFAULT_DATA;
      const badges = [...(prev.trustBadges || [])];
      badges.push({
        icon: 'ThumbsUp',
        label: 'New Trust Badge',
        isActive: true
      });
      return { ...prev, trustBadges: badges };
    });
  };

  const removeTrustBadge = (index) => {
    setData(prev => {
      if (!prev) return DEFAULT_DATA;
      const badges = [...(prev.trustBadges || [])];
      badges.splice(index, 1);
      return { ...prev, trustBadges: badges };
    });
  };

  const toggleTrustBadgeActive = (index) => {
    setData(prev => {
      if (!prev) return DEFAULT_DATA;
      const badges = [...(prev.trustBadges || [])];
      if (badges[index]) {
        badges[index] = { ...badges[index], isActive: !badges[index].isActive };
      }
      return { ...prev, trustBadges: badges };
    });
  };

  if (loading) {
    return (
      <ProtectedRoute pageKey="manage_why_choose_us">
        <div className="min-h-screen bg-[#f0f7fa] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-pink-600 mx-auto" />
            <p className="text-gray-500 mt-2">Loading...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const currentData = data || DEFAULT_DATA;
  const cards = currentData.cards || [];
  const trustBadges = currentData.trustBadges || [];

  return (
    <ProtectedRoute pageKey="manage_why_choose_us">
      <div className="min-h-screen bg-[#f0f7fa]">
        {/* Header */}
        <div className="bg-white border-b border-pink-600/20 shadow-lg sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4">
                <Link href="/authorize" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black truncate">
                      Why Choose Us Management
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">
                    Manage the "Why Choose Us" section content, cards, and trust badges
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleReset}
                  disabled={resetting}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-pink-500/20 text-pink-700 rounded-lg hover:bg-pink-500/30 transition-colors border border-pink-500/20 disabled:opacity-50"
                >
                  {resetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
                  Reset
                </button>
                <button
                  onClick={fetchData}
                  className="p-1.5 sm:p-2 text-gray-600 hover:bg-pink-600/10 rounded-lg transition-colors hover:text-pink-600"
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
            <div className="flex flex-wrap gap-2 border-b border-pink-600/20 pb-2 bg-white rounded-t-xl shadow-sm border border-pink-600/20 p-4">
              {[
                { id: 'cards', label: 'Cards', icon: Sparkles },
                { id: 'section', label: 'Section Settings', icon: Shield },
                { id: 'badges', label: 'Trust Badges', icon: ThumbsUp },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-600 hover:bg-pink-600/10 hover:text-pink-600'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Cards Tab */}
              {activeTab === 'cards' && (
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-pink-600" />
                      Feature Cards
                    </h2>
                    <button
                      type="button"
                      onClick={addCard}
                      className="px-3 py-1.5 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Card
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cards.map((card, index) => (
                      <div key={card.id || index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <IconPicker
                                value={card.icon}
                                onChange={(val) => updateCard(index, 'icon', val)}
                                options={ICON_OPTIONS}
                                label="Icon"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Side</label>
                              <select
                                value={card.side || 'left'}
                                onChange={(e) => updateCard(index, 'side', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                              >
                                <option value="left">Left Side</option>
                                <option value="right">Right Side</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                              <input
                                type="text"
                                value={card.title || ''}
                                onChange={(e) => updateCard(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                                placeholder="Card title"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Display Order</label>
                              <input
                                type="number"
                                value={card.displayOrder || 0}
                                onChange={(e) => updateCard(index, 'displayOrder', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                                min="0"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                              <textarea
                                value={card.description || ''}
                                onChange={(e) => updateCard(index, 'description', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none resize-none"
                                placeholder="Card description"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleCardActive(index)}
                              className={`px-2 py-1 text-xs rounded ${
                                card.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {card.isActive !== false ? 'Active' : 'Inactive'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeCard(index)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {cards.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No cards added yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Section Settings Tab - WITH CENTER IMAGE UPLOAD */}
              {activeTab === 'section' && (
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20 p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-pink-600" />
                    Section Settings
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                      <input
                        type="text"
                        value={currentData.section?.badge || ''}
                        onChange={(e) => updateField('section', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                        placeholder="Why Choose Us"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={currentData.section?.title || ''}
                        onChange={(e) => updateField('section', 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                        placeholder="Why Choose Us"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                      <textarea
                        value={currentData.section?.subtitle || ''}
                        onChange={(e) => updateField('section', 'subtitle', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-pink-600/20 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none resize-none"
                        placeholder="Discover why thousands of beauty enthusiasts trust us..."
                      />
                    </div>

                    {/* ✅ CENTER IMAGE UPLOAD - Enhanced with better UI */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <ImageIcon className="w-5 h-5 text-pink-600" />
                        <h3 className="text-md font-medium text-gray-700">Center Image</h3>
                      </div>
                      
                      <ImageUpload
                        imageUrl={currentData.centerImage || ''}
                        onImageChange={(url) => setData(prev => ({ ...prev, centerImage: url }))}
                        onImageRemove={() => setData(prev => ({ ...prev, centerImage: '' }))}
                        label="Upload Center Image"
                        aspectRatio="3/4"
                        helpText="Recommended: Portrait orientation, minimum 400x600px. This image appears in the center of the section."
                      />
                      
                      {/* Preview of current image */}
                      {currentData.centerImage && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">Current Image Preview:</p>
                          <div className="relative w-32 h-40 rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={currentData.centerImage}
                              alt="Center Image Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/placeholder.jpg';
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Trust Badges Tab */}
              {activeTab === 'badges' && (
                <div className="bg-white rounded-xl shadow-sm border border-pink-600/20 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5 text-pink-600" />
                      Trust Badges
                    </h2>
                    <button
                      type="button"
                      onClick={addTrustBadge}
                      className="px-3 py-1.5 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Badge
                    </button>
                  </div>

                  <div className="space-y-3">
                    {trustBadges.map((badge, index) => (
                      <div key={badge.id || index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <IconPicker
                                value={badge.icon || 'ThumbsUp'}
                                onChange={(val) => updateTrustBadge(index, 'icon', val)}
                                options={TRUST_BADGE_ICONS}
                                label="Icon"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
                              <input
                                type="text"
                                value={badge.label || ''}
                                onChange={(e) => updateTrustBadge(index, 'label', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                                placeholder="Trusted by 10k+ Customers"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleTrustBadgeActive(index)}
                              className={`px-2 py-1 text-xs rounded ${
                                badge.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {badge.isActive !== false ? 'Active' : 'Inactive'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeTrustBadge(index)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {trustBadges.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No trust badges added yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-pink-600/20">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
              >
                {saving ? (
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