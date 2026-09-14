
// app/admin/terms/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Save,
  ArrowLeft,
  Loader2,
  Plus,
  X,
  Trash2,
  RefreshCw,
  GripVertical,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Pencil,
  FileText,
  ShoppingBag,
  CreditCard,
  Truck,
  Hand,
  Lock,
  Scale,
  AlertCircle,
  Zap,
  Gavel,
  Globe,
  Package,
  Users,
  Upload,
  Image as ImageIcon,
  AlertTriangle
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { toast } from 'sonner';

// ============================================================
// CLOUDINARY HELPER FUNCTIONS
// ============================================================

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

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================

const ImageUpload = ({ imageUrl, onImageChange, onImageRemove, label = 'Image', aspectRatio = '16/9' }) => {
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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
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
// ICON OPTIONS
// ============================================================

const ICON_OPTIONS = [
  { value: 'FaFileContract', label: 'Contract', icon: FileText },
  { value: 'FaShoppingBag', label: 'Shopping', icon: ShoppingBag },
  { value: 'FaCreditCard', label: 'Credit Card', icon: CreditCard },
  { value: 'FaTruck', label: 'Truck', icon: Truck },
  { value: 'FaHands', label: 'Hands', icon: Hand },
  { value: 'FaUserShield', label: 'User Shield', icon: Users },
  { value: 'FaLock', label: 'Lock', icon: Lock },
  { value: 'FaBalanceScale', label: 'Scale', icon: Scale },
  { value: 'FaExclamationTriangle', label: 'Alert', icon: AlertCircle },
];

// Helper function to generate unique ID
const generateId = () => `section_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// Beauty Bucket Default Sections
const getDefaultSections = () => [
  {
    id: generateId(),
    title: 'Acceptance of Terms',
    icon: 'FaFileContract',
    description: 'By using BeautyBucket\'s website and services, you agree to these Terms & Conditions',
    details: [
      'If you do not agree with any part of these terms, please do not use our platform',
      'We reserve the right to update these terms at any time without prior notice',
      'Continued use of our services constitutes acceptance of any changes'
    ],
    isActive: true,
    displayOrder: 0
  },
  {
    id: generateId(),
    title: 'Products & Services',
    icon: 'FaShoppingBag',
    description: 'BeautyBucket offers premium beauty products sourced from trusted brands and verified for authenticity.',
    details: [
      'All products are 100% authentic and sourced from authorized distributors',
      'Product descriptions and images are for illustrative purposes',
      'We reserve the right to modify or discontinue products at any time',
      'Prices are subject to change without prior notice'
    ],
    isActive: true,
    displayOrder: 1
  },
  {
    id: generateId(),
    title: 'Orders & Payments',
    icon: 'FaCreditCard',
    description: 'Orders are processed securely with multiple payment options including Cash on Delivery (COD) and online payments.',
    details: [
      'All orders are subject to acceptance and availability',
      'Payment must be completed before order processing',
      'Cash on Delivery is available for eligible areas',
      'Online payments are processed through secure gateways'
    ],
    isActive: true,
    displayOrder: 2
  },
  {
    id: generateId(),
    title: 'Delivery & Shipping',
    icon: 'FaTruck',
    description: 'We deliver across Bangladesh with fast and reliable shipping services.',
    details: [
      'Delivery times vary by location and product availability',
      'Shipping fees are calculated at checkout',
      'Free shipping is available for orders over ৳3000',
      'Tracking information is provided for all shipped orders'
    ],
    isActive: true,
    displayOrder: 3
  },
  {
    id: generateId(),
    title: 'Returns & Refunds',
    icon: 'FaHands',
    description: 'Customer satisfaction is our priority. We recommend inspecting your products upon delivery to ensure everything meets your expectations.',
    details: [
      'Please inspect the product in front of the delivery person upon arrival',
      'If you find any issues, you can refuse delivery or request an immediate return',
      'For issues noticed after delivery, contact us within 24 hours',
      'All return/refund requests must be submitted within 7 days of delivery',
      'Products must be unused, unopened, and in original packaging',
      'Refunds are processed within 7–10 business days after verification'
    ],
    isActive: true,
    displayOrder: 4
  },
  {
    id: generateId(),
    title: 'User Accounts',
    icon: 'FaUserShield',
    description: 'Creating an account with BeautyBucket provides you with a personalized shopping experience.',
    details: [
      'You are responsible for maintaining account security',
      'Provide accurate and complete registration information',
      'Notify us immediately of any unauthorized use',
      'We reserve the right to suspend accounts for violations'
    ],
    isActive: true,
    displayOrder: 5
  },
  {
    id: generateId(),
    title: 'Privacy & Data Protection',
    icon: 'FaLock',
    description: 'Your privacy is important to us. We protect your personal information in accordance with our Privacy Policy.',
    details: [
      'We collect minimal personal data necessary for order processing',
      'Your data is never shared with third parties without consent',
      'SSL encryption protects all transactions',
      'You may request data deletion at any time'
    ],
    isActive: true,
    displayOrder: 6
  },
  {
    id: generateId(),
    title: 'Intellectual Property',
    icon: 'FaBalanceScale',
    description: 'All content on BeautyBucket including logos, images, and text is protected by copyright.',
    details: [
      'Content is owned by BeautyBucket and its licensors',
      'You may not reproduce, modify, or distribute our content',
      'Trademarks and logos are protected by law',
      'Unauthorized use may result in legal action'
    ],
    isActive: true,
    displayOrder: 7
  },
  {
    id: generateId(),
    title: 'Limitation of Liability',
    icon: 'FaExclamationTriangle',
    description: 'BeautyBucket is not liable for any indirect, incidental, or consequential damages.',
    details: [
      'We are not responsible for third-party service interruptions',
      'Product descriptions are provided "as is" without warranties',
      'We are not liable for any damages exceeding the order value',
      'Users agree to indemnify BeautyBucket for any violations'
    ],
    isActive: true,
    displayOrder: 8
  }
];

// ============================================================
// DELETE CONFIRMATION MODAL
// ============================================================

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, sectionTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
        <div className="p-6">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <Trash2 className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Delete Section</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete <strong className="text-[#708268]">"{sectionTitle}"</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-pink-500/10 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// RESET CONFIRMATION MODAL
// ============================================================

const ResetConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-orange-100">
        <div className="p-6">
          <div className="flex items-center gap-3 text-orange-600 mb-4">
            <RefreshCw className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Reset Terms & Conditions</h3>
          </div>
          <div className="flex items-start gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-700">
              This will <strong>permanently delete</strong> all custom content and restore 
              the default settings. This action <strong>cannot be undone</strong>.
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to reset the Terms & Conditions page to default configuration?
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SECTION EDIT MODAL
// ============================================================

const SectionEditModal = ({ isOpen, onClose, onSave, section, isEditing }) => {
  const [formData, setFormData] = useState({
    title: '',
    icon: 'FaFileContract',
    description: '',
    details: [],
    isActive: true
  });
  const [newDetail, setNewDetail] = useState('');

  useEffect(() => {
    if (section && isEditing) {
      setFormData({
        title: section.title || '',
        icon: section.icon || 'FaFileContract',
        description: section.description || '',
        details: section.details || [],
        isActive: section.isActive !== undefined ? section.isActive : true
      });
    } else {
      setFormData({
        title: '',
        icon: 'FaFileContract',
        description: '',
        details: [],
        isActive: true
      });
    }
  }, [section, isEditing, isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addDetail = () => {
    if (newDetail.trim()) {
      setFormData(prev => ({
        ...prev,
        details: [...prev.details, newDetail.trim()]
      }));
      setNewDetail('');
    }
  };

  const removeDetail = (index) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (formData.details.length === 0) {
      toast.error('At least one detail is required');
      return;
    }
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col border border-pink-500/20">
        <div className="p-5 border-b border-pink-500/20 flex items-center justify-between bg-gradient-to-r from-pink-500/5 to-black/5">
          <h3 className="text-lg font-semibold text-black flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#708268]" />
            {isEditing ? 'Edit Section' : 'Add New Section'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-pink-500/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Acceptance of Terms"
              className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <select
              value={formData.icon}
              onChange={(e) => handleChange('icon', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
            >
              {ICON_OPTIONS.map(icon => (
                <option key={icon.value} value={icon.value}>
                  {icon.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={2}
              placeholder="Brief description of this section..."
              className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                placeholder="Add a detail point..."
                className="flex-1 px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                onKeyPress={(e) => e.key === 'Enter' && addDetail()}
              />
              <button
                type="button"
                onClick={addDetail}
                className="px-4 py-2 bg-[#708268] text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-medium"
              >
                Add
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {formData.details.map((detail, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="flex-1 text-sm text-gray-700">{detail}</span>
                  <button
                    type="button"
                    onClick={() => removeDetail(index)}
                    className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {formData.details.length === 0 && (
              <p className="text-xs text-gray-400 mt-2">Add at least one detail point</p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleChange('isActive', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#708268] focus:ring-pink-500"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
            <span className="text-xs text-gray-400">
              {formData.isActive ? 'Visible on the website' : 'Hidden from the website'}
            </span>
          </div>
        </div>

        <div className="p-5 border-t border-pink-500/20 flex gap-3 justify-end bg-pink-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-pink-500/10 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-[#708268] rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Save className="w-4 h-4" />
            {isEditing ? 'Update Section' : 'Add Section'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SECTION ITEM COMPONENT
// ============================================================

const SectionItem = ({ section, index, onUpdate, onRemove, onMove, isFirst, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const iconOption = ICON_OPTIONS.find(i => i.value === section.icon);
  const IconComponent = iconOption?.icon || FileText;

  const toggleSectionStatus = () => {
    const newStatus = !section.isActive;
    onUpdate(index, { ...section, isActive: newStatus });
    toast.success(`Section "${section.title}" ${newStatus ? 'activated' : 'deactivated'}`);
  };

  // Drag and drop handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    setTimeout(() => {
      e.target.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    e.target.classList.remove('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (draggedIndex !== index) {
      onMove(draggedIndex, index);
    }
  };

  const moveUp = () => {
    if (index > 0) {
      onMove(index, index - 1);
    }
  };

  const moveDown = () => {
    if (index < section.totalSections - 1) {
      onMove(index, index + 1);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
        section.isActive 
          ? 'border-pink-500/20 hover:border-pink-500/40' 
          : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
      } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={`flex items-center justify-between p-4 border-b ${
        section.isActive 
          ? 'bg-gradient-to-r from-pink-500/5 to-black/5 border-pink-500/20' 
          : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
            <GripVertical className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              section.isActive ? 'bg-pink-500/10 text-[#708268]' : 'bg-gray-200 text-gray-400'
            }`}>
              <IconComponent className="w-4 h-4" />
            </div>
            <span className={`text-sm font-medium ${
              section.isActive ? 'text-black' : 'text-gray-500'
            }`}>
              {section.title}
            </span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded ${
            section.isActive ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-500'
          }`}>
            {section.details?.length || 0} details
          </span>
          <div className="flex items-center gap-1">
            {section.isActive ? (
              <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200 whitespace-nowrap">
                <CheckCircle className="w-3 h-3" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full border border-gray-300 whitespace-nowrap">
                <XCircle className="w-3 h-3" />
                Inactive
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            <span className="text-xs text-gray-400">Order:</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
              section.isActive ? 'bg-gray-100 text-black' : 'bg-gray-200 text-gray-500'
            }`}>
              #{section.displayOrder !== undefined ? section.displayOrder : index + 1}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={moveUp}
            disabled={index === 0}
            className={`p-1 rounded transition-colors ${
              index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-200'
            }`}
            title="Move Up"
          >
            <MoveUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={moveDown}
            disabled={index === section.totalSections - 1}
            className={`p-1 rounded transition-colors ${
              index === section.totalSections - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-200'
            }`}
            title="Move Down"
          >
            <MoveDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={toggleSectionStatus}
            className={`p-1 rounded transition-colors ${
              section.isActive
                ? 'text-green-600 hover:bg-green-100'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            title={section.isActive ? 'Deactivate' : 'Activate'}
          >
            {section.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={`p-4 space-y-3 ${!section.isActive ? 'opacity-75' : ''}`}>
          <div>
            <p className="text-sm text-gray-600">{section.description}</p>
          </div>
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">Details:</h4>
            <ul className="space-y-1">
              {section.details?.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-3 h-3 text-[#708268] mt-0.5 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Icon: {section.icon}</span>
            <span>ID: {section.id}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN ADMIN COMPONENT
// ============================================================

export default function TermsManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState([]);
  const [heroTitle, setHeroTitle] = useState('Terms & Conditions');
  const [heroDescription, setHeroDescription] = useState('Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.');
  const [introText, setIntroText] = useState('Welcome to BeautyBucket. These Terms & Conditions govern your use of our website and services.');
  const [heroImage, setHeroImage] = useState('');
  const [ctaImage, setCtaImage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // ✅ State for reset modal
  const [showResetModal, setShowResetModal] = useState(false);

  // Fetch terms data
  useEffect(() => {
    fetchTermsData();
  }, []);

  const fetchTermsData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setSections(getDefaultSections());
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/terms/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('📡 Admin API Response Status:', response.status);

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to manage terms');
        setSections(getDefaultSections());
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        console.log('📦 Admin API Response:', result);

        if (result.success && result.data) {
          const allSections = result.data.sections || [];
          const sortedSections = allSections.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          setSections(sortedSections);
          setHeroTitle(result.data.heroTitle || 'Terms & Conditions');
          setHeroDescription(result.data.heroDescription || '');
          setIntroText(result.data.introText || '');
          setHeroImage(result.data.heroImage || '');
          setCtaImage(result.data.ctaImage || '');

          const activeCount = sortedSections.filter(s => s.isActive === true).length;
          const inactiveCount = sortedSections.filter(s => s.isActive === false).length;
          toast.success(`Loaded ${sortedSections.length} sections (${activeCount} active, ${inactiveCount} inactive)`);
        } else {
          console.error('❌ API returned success=false or no data');
          setSections(getDefaultSections());
        }
      } else {
        console.error('❌ API request failed with status:', response.status);
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'Failed to load terms data');
        setSections(getDefaultSections());
      }
    } catch (error) {
      console.error('Error fetching terms:', error);
      toast.error('Network error. Please try again.');
      setSections(getDefaultSections());
    } finally {
      setIsLoading(false);
    }
  };

  // Add new section
  const addSection = () => {
    setIsEditing(false);
    setEditTarget(null);
    setShowEditModal(true);
  };

  // Edit section
  const editSection = (index) => {
    setIsEditing(true);
    setEditTarget({ index, section: sections[index] });
    setShowEditModal(true);
  };

  // Save section
  const saveSection = (formData) => {
    if (isEditing && editTarget) {
      const updatedSections = [...sections];
      updatedSections[editTarget.index] = {
        ...editTarget.section,
        ...formData
      };
      setSections(updatedSections);
      toast.success('Section updated successfully');
    } else {
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      const newSection = {
        id: newId,
        ...formData,
        displayOrder: sections.length,
        isActive: formData.isActive !== undefined ? formData.isActive : true
      };
      setSections([...sections, newSection]);
      toast.success('Section added successfully');
    }
    setShowEditModal(false);
    setEditTarget(null);
    setIsEditing(false);
  };

  // Remove section
  const removeSection = (index) => {
    const section = sections[index];
    setDeleteTarget({ index, title: section.title });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      const updatedSections = sections.filter((_, i) => i !== deleteTarget.index);
      setSections(updatedSections);
      setShowDeleteModal(false);
      setDeleteTarget(null);
      toast.success('Section deleted successfully');
    }
  };

  // Update section
  const updateSection = (index, updatedSection) => {
    const updatedSections = [...sections];
    updatedSections[index] = updatedSection;
    setSections(updatedSections);
  };

  // Move section
  const moveSection = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const updatedSections = [...sections];
    const [removed] = updatedSections.splice(fromIndex, 1);
    updatedSections.splice(toIndex, 0, removed);
    updatedSections.forEach((section, idx) => section.displayOrder = idx);
    setSections(updatedSections);
    toast.success('Section reordered successfully');
  };

  // ✅ Reset handler - shows modal instead of confirm()
  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = async () => {
    setShowResetModal(false);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        return;
      }

      const response = await fetch('http://localhost:5000/api/terms/admin/reset', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const result = await response.json();

      if (response.status === 403) {
        toast.error('You do not have permission to reset terms');
        return;
      }

      if (result.success) {
        toast.success('Terms reset to default');
        setSections(getDefaultSections());
        setHeroTitle('Terms & Conditions');
        setHeroDescription('Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.');
        setIntroText('Welcome to BeautyBucket. These Terms & Conditions govern your use of our website and services.');
        setHeroImage('/images/bg10.jpg');
        setCtaImage('/images/pattern.png');
        await fetchTermsData();
      } else {
        toast.error(result.error || 'Failed to reset terms');
      }
    } catch (error) {
      console.error('Error resetting terms:', error);
      toast.error('Network error. Please try again.');
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        setIsSubmitting(false);
        return;
      }

      const submitData = {
        heroTitle,
        heroDescription,
        introText,
        heroImage,
        ctaImage,
        sections: sections.map((section, index) => ({
          ...section,
          displayOrder: index
        }))
      };

      console.log('📤 Submitting terms data:', submitData);

      const response = await fetch('http://localhost:5000/api/terms/admin', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      console.log('📡 Response status:', response.status);

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || 'You do not have permission to update terms');
        setIsSubmitting(false);
        return;
      }

      const result = await response.json();
      console.log('📥 Response data:', result);

      if (result.success) {
        toast.success('Terms updated successfully!');
        await fetchTermsData();
      } else {
        toast.error(result.error || 'Failed to update terms');
      }
    } catch (error) {
      console.error('Error saving terms:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#708268] mx-auto" />
          <p className="text-gray-500 mt-2">Loading terms data...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="terms_management">
      <div className="min-h-screen bg-gray-50">
        <SectionEditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditTarget(null);
            setIsEditing(false);
          }}
          onSave={saveSection}
          section={editTarget?.section}
          isEditing={isEditing}
        />

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteTarget(null);
          }}
          onConfirm={confirmDelete}
          sectionTitle={deleteTarget?.title || ''}
        />

        {/* ✅ Reset Confirmation Modal */}
        <ResetConfirmationModal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          onConfirm={handleResetConfirm}
        />

        {/* Header - Updated to Pink Theme */}
        <div className="bg-white border-b border-pink-500/20 shadow-lg sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#708268]" />
                      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black truncate">
                        Terms & Conditions Management
                      </h1>
                    </div>
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#708268]/20 text-[#708268] text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
                      Beauty Bucket
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/70 mt-0.5 sm:mt-1 truncate">
                    Manage Terms & Conditions sections, content, and banner images
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                {/* ✅ Updated Reset button - shows modal */}
                <button
                  onClick={handleResetClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-orange-500/10 text-orange-600 rounded-lg hover:bg-orange-500/30 transition-colors border border-orange-500/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={fetchTermsData}
                  className="p-1.5 sm:p-2 text-black/70 hover:bg-pink-500/20 rounded-lg transition-colors hover:text-black"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Page Settings with Image Uploads */}
            <div className="bg-white rounded-xl shadow-sm border border-pink-500/20 p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-black flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-[#708268]" />
                Page Settings & Images
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    placeholder="Terms & Conditions"
                    className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hero Description
                  </label>
                  <input
                    type="text"
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    placeholder="Please read these terms carefully before using our services..."
                    className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Intro Text
                  </label>
                  <textarea
                    value={introText}
                    onChange={(e) => setIntroText(e.target.value)}
                    rows={3}
                    placeholder="Welcome to BeautyBucket. These Terms & Conditions..."
                    className="w-full px-3 py-2 text-sm border border-pink-500/20 rounded-lg focus:ring-2 focus:ring-[#708268] focus:border-transparent outline-none transition bg-white hover:border-pink-500/40 resize-none"
                  />
                </div>

                {/* Hero Image Upload */}
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <ImageUpload
                    imageUrl={heroImage}
                    onImageChange={(url) => setHeroImage(url)}
                    onImageRemove={() => setHeroImage('')}
                    label="Hero Banner Image"
                    aspectRatio="16/9"
                  />
                </div>

                {/* CTA Image Upload */}
                {/* <div className="border-t border-gray-200 pt-4">
                  <ImageUpload
                    imageUrl={ctaImage}
                    onImageChange={(url) => setCtaImage(url)}
                    onImageRemove={() => setCtaImage('')}
                    label="CTA Background Image"
                    aspectRatio="16/9"
                  />
                </div> */}
              </div>
            </div>

            {/* Sections List */}
            <div className="bg-white rounded-xl shadow-sm border border-pink-500/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#708268]" />
                    Sections
                    <span className="text-xs font-normal text-gray-400 ml-2">
                      ({sections.filter(s => s.isActive === true).length} active, {sections.filter(s => s.isActive === false).length} inactive)
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      Drag and drop to reorder
                    </span>
                    • Use the arrow buttons to move sections up/down
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSection}
                  className="flex items-center gap-2 px-4 py-2 bg-[#708268] text-white rounded-lg hover:bg-[#414d3c] transition-colors text-sm font-semibold shadow-md hover:shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Section
                </button>
              </div>

              <div className="space-y-3">
                {sections.map((section, index) => (
                  <SectionItem
                    key={section.id || index}
                    section={{
                      ...section,
                      totalSections: sections.length
                    }}
                    index={index}
                    onUpdate={updateSection}
                    onRemove={removeSection}
                    onMove={moveSection}
                    isFirst={index === 0}
                    isLast={index === sections.length - 1}
                  />
                ))}
              </div>

              {sections.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-[#708268]/30" />
                  <p>No sections added</p>
                  <p className="text-sm">Click "Add Section" to create your first Terms & Conditions section</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-[#708268] text-white font-medium rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Terms</span>
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