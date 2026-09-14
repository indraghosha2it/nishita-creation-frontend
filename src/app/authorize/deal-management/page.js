// app/authorize/deal-management/page.js
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  GripVertical,
  X,
  Image as ImageIcon,
  Link,
  Calendar,
  Upload,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================================
// IMAGE UPLOAD COMPONENT (Matches About Management)
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
            className="flex items-center gap-2 px-4 py-2 bg-[#72846A] text-white rounded-lg hover:bg-[#414d3c] transition-colors text-sm disabled:opacity-50"
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
          <span className="text-xs text-gray-400">Size:1697x927px, JPG, PNG, WebP (max 5MB)</span>
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function DealManagementPage() {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    displayOrder: 0,
    isActive: true,
    startDate: '',
    endDate: '',
    backgroundColor: '#FFF5F6',
    textColor: '#2D1B2E',
    buttonColor: '#EE4275'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);

  const router = useRouter();

  // Fetch deals
  const fetchDeals = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/deals/admin`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch deals');
      
      const data = await response.json();
      if (data.success) {
        setDeals(data.data);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
      toast.error('Failed to load deals');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      image: '',
      buttonText: 'Shop Now',
      buttonLink: '/products',
      displayOrder: deals.length,
      isActive: true,
      startDate: '',
      endDate: '',
      backgroundColor: '#FFF5F6',
      textColor: '#2D1B2E',
      buttonColor: '#EE4275'
    });
    setEditingDeal(null);
  };

  // Open modal for create/edit
  const openModal = (deal = null) => {
    if (deal) {
      setEditingDeal(deal);
      setFormData({
        title: deal.title || '',
        subtitle: deal.subtitle || '',
        image: deal.image || '',
        buttonText: deal.buttonText || 'Shop Now',
        buttonLink: deal.buttonLink || '/products',
        displayOrder: deal.displayOrder || 0,
        isActive: deal.isActive !== undefined ? deal.isActive : true,
        startDate: deal.startDate ? deal.startDate.split('T')[0] : '',
        endDate: deal.endDate ? deal.endDate.split('T')[0] : '',
        backgroundColor: deal.backgroundColor || '#FFF5F6',
        textColor: deal.textColor || '#2D1B2E',
        buttonColor: deal.buttonColor || '#EE4275'
      });
    } else {
      resetForm();
      setFormData(prev => ({
        ...prev,
        displayOrder: deals.length
      }));
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

// app/authorize/deal-management/page.js - handleSubmit function

// Submit form
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate - Only image is required
  if (!formData.image) {
    toast.error('Image is required');
    return;
  }

  try {
    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please login first');
      setIsSubmitting(false);
      return;
    }
    
    const url = editingDeal 
      ? `${API_URL}/api/deals/admin/${editingDeal._id}`
      : `${API_URL}/api/deals/admin`;
    
    const method = editingDeal ? 'PUT' : 'POST';

    // Prepare data - send title as is (can be empty string)
    const submitData = {
      ...formData,
      // Don't add default title, send as is
    };

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(submitData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save deal');
    }

    const data = await response.json();
    if (data.success) {
      await fetchDeals();
      closeModal();
      toast.success(editingDeal ? 'Deal updated successfully!' : 'Deal created successfully!');
    }
  } catch (error) {
    console.error('Save deal error:', error);
    toast.error(error.message || 'Failed to save deal');
  } finally {
    setIsSubmitting(false);
  }
};

  // Delete deal
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this deal?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/deals/admin/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete deal');

      const data = await response.json();
      if (data.success) {
        await fetchDeals();
        toast.success('Deal deleted successfully!');
      }
    } catch (error) {
      console.error('Delete deal error:', error);
      toast.error('Failed to delete deal');
    }
  };

  // Toggle deal status
  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/deals/admin/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to toggle status');

      const data = await response.json();
      if (data.success) {
        await fetchDeals();
      }
    } catch (error) {
      console.error('Toggle status error:', error);
      toast.error('Failed to toggle deal status');
    }
  };

  // Drag and drop reordering
  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;

    const reordered = [...deals];
    const [draggedItem] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, draggedItem);

    // Update display orders
    const orders = reordered.map((item, index) => ({
      id: item._id,
      displayOrder: index
    }));

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/deals/admin/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orders })
      });

      if (!response.ok) throw new Error('Failed to reorder');

      const data = await response.json();
      if (data.success) {
        setDeals(data.data);
      }
    } catch (error) {
      console.error('Reorder error:', error);
      toast.error('Failed to reorder deals');
      await fetchDeals();
    }

    setDragIndex(null);
  };

  if (isLoading) {
    return (
       <ProtectedRoute pageKey="deal_management">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#72846A] mx-auto mb-4" />
          <p className="text-gray-500">Loading deals...</p>
        </div>
      </div>
      </ProtectedRoute>
    );
  }

  return (
     <ProtectedRoute pageKey="deal_management">
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D1B2E]">
            Deals Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage "Deals You Can't Miss" section
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#72846A] to-[#414d3c] text-white rounded-xl hover:shadow-lg hover:shadow-[#72846A]/30 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add New Deal
        </button>
      </div>

      {/* Deals Grid */}
      {deals.length === 0 ? (
        <div className="text-center py-12 bg-pink-50/30 rounded-2xl border-2 border-dashed border-pink-200">
          <ImageIcon className="w-16 h-16 text-pink-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#2D1B2E]">No deals yet</h3>
          <p className="text-gray-500 text-sm mt-1">
            Click "Add New Deal" to create your first deal
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((deal, index) => (
            <div
              key={deal._id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className={`group relative bg-white rounded-xl border border-pink-200/30 overflow-hidden hover:shadow-lg transition-all ${
                !deal.isActive ? 'opacity-60' : ''
              }`}
              style={{
                borderColor: deal.isActive ? '#FFD2DB' : '#e5e7eb'
              }}
            >
              {/* Drag Handle */}
              <div className="absolute top-2 left-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <GripVertical className="w-5 h-5 text-gray-400" />
              </div>

              {/* Image */}
              <div className="relative aspect-[16/10] bg-pink-50">
                <img
                  src={deal.image}
                  alt={deal.title || 'Deal'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                
                {/* Status Badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-medium ${
                  deal.isActive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {deal.isActive ? 'Active' : 'Inactive'}
                </div>

                {/* Date Range Badge */}
                {(deal.startDate || deal.endDate) && (
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {deal.startDate && new Date(deal.startDate).toLocaleDateString()}
                    {deal.startDate && deal.endDate && ' - '}
                    {deal.endDate && new Date(deal.endDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Content */}
             <div className="p-4">
  {deal.title && (
    <h3 className="font-semibold text-[#2D1B2E] text-base truncate">
      {deal.title}
    </h3>
  )}
  {deal.subtitle && (
    <p className="text-gray-500 text-sm truncate mt-0.5">
      {deal.subtitle}
    </p>
  )}
  
  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
    <Link className="w-3 h-3" />
    <span>{deal.buttonText} → {deal.buttonLink}</span>
  </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-pink-200/30">
                  <button
                    onClick={() => openModal(deal)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-[#72846A] hover:bg-pink-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(deal._id)}
                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      deal.isActive 
                        ? 'text-yellow-600 hover:bg-yellow-50' 
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {deal.isActive ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Show
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(deal._id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-pink-200/30 p-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-[#2D1B2E]">
                {editingDeal ? 'Edit Deal' : 'Create New Deal'}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-pink-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Title - Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Summer Sale (optional)"
                  className="w-full px-4 py-2 border border-pink-200/50 rounded-xl focus:ring-2 focus:ring-[#72846A]/30 focus:border-[#72846A] outline-none transition"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Up to 50% off on skincare"
                  className="w-full px-4 py-2 border border-pink-200/50 rounded-xl focus:ring-2 focus:ring-[#72846A]/30 focus:border-[#72846A] outline-none transition"
                />
              </div>

              {/* Image Upload - Required */}
              <ImageUpload
                imageUrl={formData.image}
                onImageChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                onImageRemove={() => setFormData(prev => ({ ...prev, image: '' }))}
                label="Deal Image * "
                aspectRatio="16/9"
              />
              <span className="text-xs text-gray-400 -pt-6">Size:1697x927px, JPG, PNG, WebP (max 5MB)</span>


              {/* Button Settings */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleInputChange}
                    placeholder="Shop Now"
                    className="w-full px-4 py-2 border border-pink-200/50 rounded-xl focus:ring-2 focus:ring-[#72846A]/30 focus:border-[#72846A] outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Link <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="buttonLink"
                    value={formData.buttonLink}
                    onChange={handleInputChange}
                    placeholder="/products"
                    className="w-full px-4 py-2 border border-pink-200/50 rounded-xl focus:ring-2 focus:ring-[#72846A]/30 focus:border-[#72846A] outline-none transition"
                  />
                </div>
              </div>

              {/* Colors */}
              {/* <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      name="backgroundColor"
                      value={formData.backgroundColor}
                      onChange={handleInputChange}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-pink-200/30 p-0"
                    />
                    <input
                      type="text"
                      name="backgroundColor"
                      value={formData.backgroundColor}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-pink-200/50 rounded-lg focus:ring-2 focus:ring-[#72846A]/30 focus:border-[#72846A] outline-none transition text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      name="textColor"
                      value={formData.textColor}
                      onChange={handleInputChange}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-pink-200/30 p-0"
                    />
                    <input
                      type="text"
                      name="textColor"
                      value={formData.textColor}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-pink-200/50 rounded-lg focus:ring-2 focus:ring-[#72846A]/30 focus:border-[#72846A] outline-none transition text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      name="buttonColor"
                      value={formData.buttonColor}
                      onChange={handleInputChange}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-pink-200/30 p-0"
                    />
                    <input
                      type="text"
                      name="buttonColor"
                      value={formData.buttonColor}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-pink-200/50 rounded-lg focus:ring-2 focus:ring-[#72846A]/30 focus:border-[#72846A] outline-none transition text-sm"
                    />
                  </div>
                </div>
              </div> */}

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-pink-200/50 rounded-xl focus:ring-2 focus:ring-[#72846A]/30 focus:border-[#72846A] outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-pink-200/50 rounded-xl focus:ring-2 focus:ring-[#72846A]/30 focus:border-[#72846A] outline-none transition"
                  />
                </div>
              </div>

              {/* Display Order & Active Status */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-pink-200/50 rounded-xl focus:ring-2 focus:ring-[#72846A]/30 focus:border-[#72846A] outline-none transition"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-pink-200 text-[#72846A] focus:ring-[#72846A]/30"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Active
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-pink-200/30">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-pink-200/50 text-[#2D1B2E] rounded-xl hover:bg-pink-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#72846A] to-[#414d3c] text-white rounded-xl hover:shadow-lg hover:shadow-[#72846A]/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    editingDeal ? 'Update Deal' : 'Create Deal'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}