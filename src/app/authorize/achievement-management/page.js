'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  X,
  Image as ImageIcon,
  Upload,
  Loader2,
  Award
} from 'lucide-react';
import { toast } from 'sonner';
import { MantineProvider } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TiptapLink from '@tiptap/extension-link';

import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';

import ProtectedRoute from '@/app/components/ProtectedRoute';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================
const ImageUpload = ({
  imageUrl,
  onImageChange,
  onImageRemove,
  label = 'Image',
  aspectRatio = '1/1',
  className = ''
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

        // ✅ Check if file is a format that supports transparency
        const isTransparent =
          file.type === 'image/png' ||
          file.type === 'image/webp' ||
          file.type === 'image/gif';

        if (isTransparent) {
          // ✅ Clear canvas so transparency is preserved
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let outputFormat = 'image/jpeg';
        let quality = 0.4;

        if (isTransparent) {
          outputFormat = 'image/png';   // ✅ Keep PNG
          quality = 0.9;                // PNG ignores this, but keeps code clean
        } else {
          // Adjust JPEG quality based on file size
          if (file.size > 5 * 1024 * 1024) quality = 0.25;
          else if (file.size > 2 * 1024 * 1024) quality = 0.3;
          else if (file.size > 1 * 1024 * 1024) quality = 0.35;
          else if (file.size > 500 * 1024) quality = 0.45;
          else quality = 0.55;
        }

        if (outputFormat === 'image/png') {
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name, {
                type: 'image/png',
                lastModified: Date.now()
              });
              resolve(compressedFile);
            },
            'image/png'
          );
        } else {
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, '.jpg'),
                {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                }
              );
              resolve(compressedFile);
            },
            'image/jpeg',
            quality
          );
        }
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
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget'
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );

      const data = await response.json();
      if (data.secure_url) {
        return { url: data.secure_url, publicId: data.public_id };
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
      reader.onload = (event) => setPreview(event.target.result);
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
          <div
            className="rounded-lg overflow-hidden border-2 border-[#8B9D83]/30 bg-gray-100"
            style={{ width: '140px', aspectRatio }}
          >
            <img src={preview} alt={label} className="w-full h-full object-cover" />
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
            className="flex items-center gap-2 px-4 py-2 bg-[#8B9D83] text-white rounded-lg hover:bg-[#6b7d63] transition-colors text-sm disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {isUploading ? 'Uploading...' : 'Upload'}
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
// MAIN COMPONENT
// ============================================================
export default function AchievementManagementPage() {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [formData, setFormData] = useState({
    logo: '',
    title: '',
    subtitle: '',
    description: '',
    image: '',
    displayOrder: 0,
    isActive: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // ============================================================
  // RICH TEXT EDITOR FOR DESCRIPTION
  // ============================================================
  const descriptionEditor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, description: editor.getHTML() }));
    }
  });

  // Mount guard (needed for Mantine/Tiptap SSR)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ============================================================
  // FETCH
  // ============================================================
  const fetchAchievements = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/achievements/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch achievements');

      const data = await response.json();
      if (data.success) {
        setAchievements(data.data);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      toast.error('Failed to load achievements');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  // ============================================================
  // FORM
  // ============================================================
  const resetForm = () => {
    setFormData({
      logo: '',
      title: '',
      subtitle: '',
      description: '',
      image: '',
      displayOrder: achievements.length,
      isActive: true
    });
    if (descriptionEditor) {
      descriptionEditor.commands.setContent('');
    }
    setEditingAchievement(null);
  };

  const openModal = (achievement = null) => {
    if (achievement) {
      setEditingAchievement(achievement);
      setFormData({
        logo: achievement.logo || '',
        title: achievement.title || '',
        subtitle: achievement.subtitle || '',
        description: achievement.description || '',
        image: achievement.image || '',
        displayOrder: achievement.displayOrder || 0,
        isActive: achievement.isActive !== undefined ? achievement.isActive : true
      });

      // Load description into the editor
      if (descriptionEditor) {
        descriptionEditor.commands.setContent(achievement.description || '');
      }
    } else {
      setFormData({
        logo: '',
        title: '',
        subtitle: '',
        description: '',
        image: '',
        displayOrder: achievements.length,
        isActive: true
      });
      if (descriptionEditor) {
        descriptionEditor.commands.setContent('');
      }
      setEditingAchievement(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.logo || !formData.title || !formData.image) {
      toast.error('Logo, title, and image are required');
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

      const url = editingAchievement
        ? `${API_URL}/api/achievements/admin/${editingAchievement._id}`
        : `${API_URL}/api/achievements/admin`;

      const method = editingAchievement ? 'PUT' : 'POST';

      // Ensure description is up to date from editor
      const submitData = {
        ...formData,
        description: descriptionEditor?.getHTML() || formData.description || ''
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save achievement');
      }

      const data = await response.json();
      if (data.success) {
        await fetchAchievements();
        closeModal();
        toast.success(
          editingAchievement ? 'Achievement updated!' : 'Achievement created!'
        );
      }
    } catch (error) {
      console.error('Save achievement error:', error);
      toast.error(error.message || 'Failed to save achievement');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // DELETE
  // ============================================================
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/achievements/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete achievement');

      const data = await response.json();
      if (data.success) {
        await fetchAchievements();
        toast.success('Achievement deleted!');
      }
    } catch (error) {
      console.error('Delete achievement error:', error);
      toast.error('Failed to delete achievement');
    }
  };

  // ============================================================
  // TOGGLE
  // ============================================================
  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/api/achievements/admin/${id}/toggle`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!response.ok) throw new Error('Failed to toggle status');

      const data = await response.json();
      if (data.success) {
        await fetchAchievements();
      }
    } catch (error) {
      console.error('Toggle status error:', error);
      toast.error('Failed to toggle achievement status');
    }
  };

  // ============================================================
  // DRAG & DROP
  // ============================================================
  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();

    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reordered = [...achievements];
    const [draggedItem] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, draggedItem);

    const withNewOrder = reordered.map((item, index) => ({
      ...item,
      displayOrder: index
    }));

    setAchievements(withNewOrder);
    setDragIndex(null);
    setDragOverIndex(null);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Please login first');
        await fetchAchievements();
        return;
      }

      const orders = withNewOrder.map((item) => ({
        id: item._id,
        displayOrder: item.displayOrder
      }));

      const response = await fetch(`${API_URL}/api/achievements/admin/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ orders })
      });

      if (!response.ok) throw new Error('Failed to reorder');

      const data = await response.json();
      if (data.success) {
        setAchievements(data.data);
        toast.success('Achievements reordered');
      }
    } catch (error) {
      console.error('Reorder error:', error);
      toast.error('Failed to reorder achievements');
      await fetchAchievements();
    }
  };

  // ============================================================
  // LOADING
  // ============================================================
  if (isLoading) {
    return (
      <ProtectedRoute pageKey="achievement_management">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-[#8B9D83] mx-auto mb-4" />
            <p className="text-gray-500">Loading achievements...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <ProtectedRoute pageKey="achievement_management">
      <MantineProvider>
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#263b32] flex items-center gap-2">
                <Award className="w-7 h-7 text-[#8B9D83]" />
                Achievement Management
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Manage achievements — drag cards to reorder
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Add New Achievement
            </button>
          </div>

          {/* Grid */}
          {achievements.length === 0 ? (
            <div className="text-center py-12 bg-[#f0f5ed] rounded-2xl border-2 border-dashed border-[#c5d5be]">
              <Award className="w-16 h-16 text-[#8B9D83]/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#263b32]">No achievements yet</h3>
              <p className="text-gray-500 text-sm mt-1">
                Click &quot;Add New Achievement&quot; to create your first achievement
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => {
                const isDragging = dragIndex === index;
                const isDragOver = dragOverIndex === index && dragIndex !== index;

                return (
                  <div
                    key={achievement._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`group relative bg-white rounded-xl border overflow-hidden transition-all ${
                      isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'
                    } ${
                      isDragOver
                        ? 'border-[#8B9D83] ring-2 ring-[#8B9D83]/30 shadow-lg'
                        : 'border-[#c5d5be]/40 hover:shadow-lg'
                    } ${!achievement.isActive ? 'opacity-60' : ''}`}
                  >
                    {/* Drag Handle */}
                    <div className="absolute top-2 left-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/90 rounded p-0.5">
                      <GripVertical className="w-5 h-5 text-gray-500" />
                    </div>

                    {/* Order Badge */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      #{index + 1}
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[16/10] bg-[#f0f5ed]">
                      <img
                        src={achievement.image}
                        alt={achievement.title || 'Achievement'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />

                     {achievement.logo && (
  <div className="absolute bottom-2 left-2 w-10 h-10 overflow-hidden drop-shadow-sm">
    <img
      src={achievement.logo}
      alt="logo"
      className="w-full h-full object-contain"
    />
  </div>
)}

                      {/* Status Badge */}
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-medium ${
                          achievement.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {achievement.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-[#263b32] text-base truncate">
                        {achievement.title}
                      </h3>
                      {achievement.subtitle && (
                        <p className="text-[#8B9D83] text-sm truncate mt-0.5">
                          {achievement.subtitle}
                        </p>
                      )}
                      {achievement.description && (
                        <div
                          className="text-gray-500 text-xs mt-1 line-clamp-2 prose prose-sm max-w-none [&>p]:m-0"
                          dangerouslySetInnerHTML={{ __html: achievement.description }}
                        />
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#c5d5be]/40">
                        <button
                          onClick={() => openModal(achievement)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-[#8B9D83] hover:bg-[#f0f5ed] rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleStatus(achievement._id)}
                          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            achievement.isActive
                              ? 'text-yellow-600 hover:bg-yellow-50'
                              : 'text-green-600 hover:bg-green-50'
                          }`}
                        >
                          {achievement.isActive ? (
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
                          onClick={() => handleDelete(achievement._id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                <div className="sticky top-0 bg-white border-b border-[#c5d5be]/40 p-4 flex items-center justify-between z-10">
                  <h2 className="text-xl font-bold text-[#263b32]">
                    {editingAchievement ? 'Edit Achievement' : 'Create New Achievement'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-1 hover:bg-[#f0f5ed] rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                  {/* Logo + Image */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUpload
                      imageUrl={formData.logo}
                      onImageChange={(url) =>
                        setFormData((prev) => ({ ...prev, logo: url }))
                      }
                      onImageRemove={() =>
                        setFormData((prev) => ({ ...prev, logo: '' }))
                      }
                      label="Logo *"
                      aspectRatio="1/1"
                    />
                    <ImageUpload
                      imageUrl={formData.image}
                      onImageChange={(url) =>
                        setFormData((prev) => ({ ...prev, image: url }))
                      }
                      onImageRemove={() =>
                        setFormData((prev) => ({ ...prev, image: '' }))
                      }
                      label="Image *"
                      aspectRatio="16/10"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Best Customer Service Award 2024"
                      className="w-full px-4 py-2 border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none transition"
                    />
                  </div>

                  {/* Subtitle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle{' '}
                      <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                      placeholder="e.g., National E-commerce Awards"
                      className="w-full px-4 py-2 border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none transition"
                    />
                  </div>

                  {/* Description — RICH TEXT EDITOR */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description{' '}
                      <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                    </label>
                    {isMounted && descriptionEditor ? (
                      <div className="border border-[#c5d5be] rounded-xl overflow-hidden">
                        <RichTextEditor editor={descriptionEditor}>
                          <RichTextEditor.Toolbar>
                            <RichTextEditor.ControlsGroup>
                              <RichTextEditor.Bold />
                              <RichTextEditor.Italic />
                              <RichTextEditor.Underline />
                              <RichTextEditor.Strikethrough />
                            </RichTextEditor.ControlsGroup>
                            <RichTextEditor.ControlsGroup>
                              <RichTextEditor.H1 />
                              <RichTextEditor.H2 />
                              <RichTextEditor.H3 />
                            </RichTextEditor.ControlsGroup>
                            <RichTextEditor.ControlsGroup>
                              <RichTextEditor.BulletList />
                              <RichTextEditor.OrderedList />
                            </RichTextEditor.ControlsGroup>
                            <RichTextEditor.ControlsGroup>
                              <RichTextEditor.AlignLeft />
                              <RichTextEditor.AlignCenter />
                              <RichTextEditor.AlignRight />
                            </RichTextEditor.ControlsGroup>
                            <RichTextEditor.ControlsGroup>
                              <RichTextEditor.Link />
                              <RichTextEditor.Unlink />
                            </RichTextEditor.ControlsGroup>
                          </RichTextEditor.Toolbar>
                          <RichTextEditor.Content />
                        </RichTextEditor>
                      </div>
                    ) : (
                      <div className="h-32 bg-gray-50 border border-[#c5d5be] rounded-xl animate-pulse" />
                    )}
                  </div>

                  {/* Display Order & Active */}
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
                        className="w-full px-4 py-2 border border-[#c5d5be] rounded-xl focus:ring-2 focus:ring-[#8B9D83]/30 focus:border-[#8B9D83] outline-none transition"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded border-[#c5d5be] text-[#8B9D83] focus:ring-[#8B9D83]/30"
                      />
                      <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                        Active
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-[#c5d5be]/40">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-[#c5d5be] text-[#263b32] rounded-xl hover:bg-[#f0f5ed] transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </span>
                      ) : editingAchievement ? (
                        'Update Achievement'
                      ) : (
                        'Create Achievement'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </MantineProvider>
    </ProtectedRoute>
  );
}