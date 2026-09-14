'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, Search, Loader2, Image as ImageIcon, 
  Video, CheckCircle, FolderOpen, ChevronDown,
  Grid3x3, List, Eye
} from 'lucide-react';
import { toast } from 'sonner';

const ROOT_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'power-bank';

export default function MediaLibraryPicker({ 
  isOpen, 
  onClose, 
  onSelect, 
  multiple = false,
  maxSelect = 6,
  currentImages = [],
  onlyVideos = false
}) {
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  const [items, setItems] = useState([]);
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState(ROOT_FOLDER);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [previewItem, setPreviewItem] = useState(null);
  
  const searchTimer = useRef(null);

  // Load folders - Only show power-bank related folders
  const loadFolders = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API}/api/admin/media/folders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      const folderList = data.folders || [];
      
      // ✅ Filter: Only keep folders that start with ROOT_FOLDER or are exactly ROOT_FOLDER
      const filteredFolders = folderList.filter(f => 
        f === ROOT_FOLDER || f.startsWith(ROOT_FOLDER + '/')
      );
      
      // Ensure ROOT_FOLDER is always present
      if (!filteredFolders.includes(ROOT_FOLDER)) {
        filteredFolders.unshift(ROOT_FOLDER);
      }
      
      setFolders(filteredFolders);
    } catch (error) {
      console.error('Error loading folders:', error);
      setFolders([ROOT_FOLDER]);
    }
  }, [API]);

  // Load media items
  const loadItems = useCallback(async (reset = true) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      
      if (folder) params.set('folder', folder);
      if (searchTerm) params.set('q', searchTerm);
      if (!reset && nextCursor) params.set('next_cursor', nextCursor);
      
      const response = await fetch(`${API}/api/admin/media?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      const newItems = data.items || [];
      
      setItems(prev => reset ? newItems : [...prev, ...newItems]);
      setNextCursor(data.next_cursor || null);
      
      if (reset) setSelectedItems([]);
    } catch (error) {
      console.error('Error loading items:', error);
      toast.error('Failed to load media');
    } finally {
      setLoading(false);
    }
  }, [API, folder, searchTerm, nextCursor, loading]);

  useEffect(() => {
    if (isOpen) {
      loadFolders();
      loadItems(true);
    }
  }, [isOpen]);

  // Search with debounce
  useEffect(() => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      loadItems(true);
    }, 300);
    return () => clearTimeout(searchTimer.current);
  }, [folder, searchTerm]);

  // Toggle selection
  const toggleSelect = (item) => {
    if (multiple) {
      setSelectedItems(prev => {
        const exists = prev.find(i => i.public_id === item.public_id);
        if (exists) {
          return prev.filter(i => i.public_id !== item.public_id);
        } else {
          if (prev.length >= maxSelect) {
            toast.error(`You can only select up to ${maxSelect} images`);
            return prev;
          }
          if (currentImages.includes(item.url)) {
            toast.error('This image is already in your product');
            return prev;
          }
          return [...prev, item];
        }
      });
    } else {
      setSelectedItems([item]);
    }
  };

  const handleConfirm = () => {
    if (selectedItems.length === 0) {
      toast.error('Please select at least one item');
      return;
    }
    onSelect(selectedItems);
    onClose();
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '—';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  // Filter items based on onlyVideos prop
  const displayItems = onlyVideos 
    ? items.filter(item => item.resource_type === 'video')
    : items;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col border border-[#06B6D4]/20">
        {/* Header */}
        <div className="p-4 border-b border-[#06B6D4]/20 bg-gradient-to-r from-[#06B6D4]/5 to-[#004767]/5 flex items-center justify-between rounded-t-2xl flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-[#004767]">
              {onlyVideos ? 'Select from Video Library' : 'Select from Media Library'}
            </h2>
            <p className="text-sm text-[#64748B]">
              {multiple ? `Select up to ${maxSelect} items (${selectedItems.length} selected)` : 'Select an item'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#06B6D4]/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-[#06B6D4]/20 bg-[#E2E7EA]/20 flex-shrink-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder={onlyVideos ? "Search videos..." : "Search images..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none bg-white"
              />
            </div>
            
            {/* ✅ Folder dropdown - Only shows power-bank related folders */}
            <div className="relative min-w-[150px]">
              <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-sm border border-[#06B6D4]/20 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent outline-none bg-white appearance-none cursor-pointer"
              >
                {folders.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 text-gray-500 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => loadItems(true)}
              disabled={loading}
              className="p-2 text-gray-500 hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
            >
              <Loader2 className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Grid/List View */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && displayItems.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-[#06B6D4]" />
            </div>
          ) : displayItems.length === 0 ? (
            <div className="text-center py-12">
              {onlyVideos ? (
                <Video className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              ) : (
                <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              )}
              <p className="text-gray-500">
                {onlyVideos ? 'No videos found' : 'No images found'}
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {displayItems.map((item) => {
                const isSelected = selectedItems.some(i => i.public_id === item.public_id);
                const isAlreadyUsed = currentImages.includes(item.url);
                const isVideo = item.resource_type === 'video';
                const filename = item.filename || item.public_id.split('/').pop();
                
                return (
                  <div
                    key={item.public_id}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-white shadow-sm ${
                      isSelected
                        ? 'border-[#06B6D4] ring-2 ring-[#06B6D4]/50 shadow-lg'
                        : isAlreadyUsed
                        ? 'border-gray-300 opacity-50 cursor-not-allowed'
                        : 'border-[#06B6D4]/20 hover:border-[#06B6D4]/50 hover:shadow-md'
                    }`}
                    onClick={() => !isAlreadyUsed && toggleSelect(item)}
                  >
                    {isVideo ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover bg-gray-100"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={filename}
                        className="w-full h-full object-cover bg-gray-100"
                        loading="lazy"
                      />
                    )}

                    {/* Selection indicator */}
                    <div className="absolute top-2 right-2">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-[#06B6D4] flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      ) : isAlreadyUsed ? (
                        <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center shadow-lg">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-white/70 bg-black/30" />
                      )}
                    </div>

                    {/* Already used badge */}
                    {isAlreadyUsed && (
                      <div className="absolute bottom-2 left-2 bg-gray-800/80 text-white text-[10px] px-2 py-0.5 rounded">
                        Already in product
                      </div>
                    )}

                    {/* Type badge */}
                    {isVideo && !isAlreadyUsed && (
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                        <Video className="w-3 h-3" /> Video
                      </div>
                    )}

                    {/* Hover preview */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewItem(item);
                      }}
                      className="absolute top-2 left-2 p-1 bg-black/50 rounded hover:bg-black/70 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#E2E7EA]">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Preview</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Size</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Uploaded</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">Select</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#06B6D4]/10">
                  {displayItems.map((item) => {
                    const isSelected = selectedItems.some(i => i.public_id === item.public_id);
                    const isAlreadyUsed = currentImages.includes(item.url);
                    const filename = item.filename || item.public_id.split('/').pop();
                    const isVideo = item.resource_type === 'video';
                    
                    return (
                      <tr 
                        key={item.public_id}
                        className={`hover:bg-[#06B6D4]/5 transition-colors ${isSelected ? 'bg-[#06B6D4]/10' : ''}`}
                      >
                        <td className="px-4 py-2">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#06B6D4]/20 bg-gray-100">
                            {isVideo ? (
                              <video src={item.url} className="w-full h-full object-cover" muted playsInline />
                            ) : (
                              <img src={item.url} alt={filename} className="w-full h-full object-cover" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-[#004767] truncate max-w-[200px]">{filename}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{formatFileSize(item.bytes)}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{formatDate(item.created_at)}</td>
                        <td className="px-4 py-2 text-center">
                          {isAlreadyUsed ? (
                            <span className="text-xs text-gray-400">Already used</span>
                          ) : (
                            <button
                              onClick={() => toggleSelect(item)}
                              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                                isSelected
                                  ? 'bg-[#06B6D4] text-white'
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                            >
                              {isSelected ? 'Selected' : 'Select'}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Load More */}
          {nextCursor && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => loadItems(false)}
                disabled={loading}
                className="px-4 py-2 text-sm text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded-lg transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Load More'}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#06B6D4]/20 bg-[#E2E7EA]/20 flex items-center justify-between flex-shrink-0 rounded-b-2xl">
          <span className="text-sm text-[#64748B]">
            {selectedItems.length} of {maxSelect} selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedItems.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-[#06B6D4] rounded-lg hover:bg-[#0891B2] transition-colors disabled:opacity-50"
            >
              Add Selected ({selectedItems.length})
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-[99999] bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#06B6D4]/20 flex items-center justify-between">
              <h3 className="font-semibold text-[#004767]">
                {previewItem.filename || previewItem.public_id.split('/').pop()}
              </h3>
              <button onClick={() => setPreviewItem(null)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-gray-100 flex items-center justify-center">
              {previewItem.resource_type === 'video' ? (
                <video src={previewItem.url} controls className="max-h-[60vh] max-w-full" />
              ) : (
                <img src={previewItem.url} alt="" className="max-h-[60vh] max-w-full object-contain" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}