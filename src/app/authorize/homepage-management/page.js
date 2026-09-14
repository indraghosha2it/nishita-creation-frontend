
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
  Search,
  Package,
  Zap,
  LayoutTemplate,
  Grid3x3,
  Car,
  List,
  ChevronDown,
  ChevronUp,
  Shield,
  ShieldCheck,
  Bug,
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// Helper function to generate unique ID
const generateId = () => `section_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// Section type options - REMOVED 'brands'
const SYSTEM_SECTION_TYPES = [
  { value: 'hero', label: 'Hero Banner', icon: LayoutTemplate, deletable: false, hasProducts: false },

  { value: 'categories', label: 'Categories', icon: Grid3x3, deletable: false, hasProducts: false },
   { value: 'deals', label: 'Deals You Can\'t Miss', icon: Zap, deletable: false, hasProducts: false },
     { value: 'big_sale', label: 'Big Sale', icon: Car, deletable: false, hasProducts: false },
  { value: 'featured', label: 'Featured Products', icon: Zap, deletable: false, hasProducts: false },
  
    { value: 'trust_results', label: 'Trust & Results', icon: ShieldCheck, deletable: false, hasProducts: false },  // ✅ ADDED
   
];

// Custom section type (deletable, has products)
const CUSTOM_SECTION_TYPE = { value: 'custom', label: 'Custom Products', icon: Package, deletable: true, hasProducts: true };

// All section types combined
const SECTION_TYPES = [...SYSTEM_SECTION_TYPES, CUSTOM_SECTION_TYPE];

// Layout options for custom sections
const LAYOUT_OPTIONS = [
  { value: 'grid', label: 'Grid', icon: Grid3x3 },
  
];

const ITEMS_PER_ROW = [
  { value: 2, label: '2 per row' },
  { value: 3, label: '3 per row' },
  { value: 4, label: '4 per row' },
  { value: 5, label: '5 per row' },
  { value: 6, label: '6 per row' },
];

// Product Search Modal Component - Multiple Select
const ProductSearchModal = ({ isOpen, onClose, onSelectProducts, selectedProducts = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const searchTimeoutRef = useRef(null);

  // Load all products initially
  useEffect(() => {
    if (isOpen) {
      fetchAllProducts();
      setSelectedProductIds(selectedProducts.map(p => p.productId));
    }
  }, [isOpen]);

  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/products/admin/all?limit=200`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      if (data.success) {
        // Filter out already selected products
        const filtered = data.data.filter(p => 
          !selectedProducts.some(sp => sp.productId === p._id)
        );
        setAllProducts(filtered);
        setProducts(filtered);
      } else {
        toast.error(data.error || 'Failed to fetch products');
      }
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const searchProducts = (query) => {
    if (!query.trim()) {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter(p => 
      p.productName.toLowerCase().includes(query.toLowerCase()) ||
      p.skuCode?.toLowerCase().includes(query.toLowerCase()) ||
      p.brand?.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filtered);
  };

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(searchTerm);
    }, 300);
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchTerm]);

  const handleToggleProduct = (productId) => {
    setSelectedProductIds(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleConfirm = () => {
    const selected = products.filter(p => selectedProductIds.includes(p._id));
    if (selected.length > 0) {
      onSelectProducts(selected);
      onClose();
    } else {
      toast.error('Please select at least one product');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col border border-blue-500/20">
        <div className="p-5 border-b border-blue-500/20 flex items-center justify-between bg-gradient-to-r from-blue-500/5 to-black/5">
          <div>
            <h3 className="text-lg font-semibold text-black flex items-center gap-2">
              <Package className="w-5 h-5 text-[#72846A]" />
              Select Products
            </h3>
            <p className="text-xs text-gray-500 mt-1">Select multiple products to add to this section</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-blue-500/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5 border-b border-blue-500/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#72846A]/60" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by name, SKU, or brand..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-blue-500/20 rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-white hover:border-blue-500/40"
              autoFocus
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-400">
              Showing: <span className="font-medium text-black">{products.length}</span> products
            </p>
            <p className="text-xs text-gray-400">
              Selected: <span className="font-medium text-[#72846A]">{selectedProductIds.length}</span> products
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#72846A] animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-[#72846A]/30 mx-auto mb-3" />
              <p className="text-gray-500">
                {searchTerm ? 'No products found matching your search' : 'No products available'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Select All / Deselect All */}
              <div className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg border border-gray-200 mb-3">
                <button
                  onClick={() => {
                    const allIds = products.map(p => p._id);
                    setSelectedProductIds(allIds);
                  }}
                  className="text-xs text-[#72846A] hover:text-[#414d3c] font-medium"
                >
                  Select All
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => setSelectedProductIds([])}
                  className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                >
                  Deselect All
                </button>
              </div>

              {products.map((product) => {
                const isSelected = selectedProductIds.includes(product._id);
                return (
                  <div
                    key={product._id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#72846A] bg-blue-50 ring-1 ring-[#72846A]/30'
                        : 'border-blue-500/20 hover:border-[#72846A] hover:bg-blue-50'
                    }`}
                    onClick={() => handleToggleProduct(product._id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#72846A] bg-[#72846A]'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>
                      <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0].url}
                            alt={product.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{product.productName}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>SKU: {product.skuCode}</span>
                          <span>•</span>
                          <span>Brand: {product.brand}</span>
                          <span>•</span>
                          <span>৳{product.regularPrice}</span>
                          {product.discountPrice > 0 && (
                            <span className="text-green-600">-{product.discountPrice}%</span>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <span className="text-xs text-[#72846A] font-medium">Selected</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-5 border-t border-blue-500/20 flex gap-3 justify-end bg-blue-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedProductIds.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-[#72846A] rounded-lg hover:bg-[#414d3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <CheckCircle className="w-4 h-4" />
            Add {selectedProductIds.length} Product{selectedProductIds.length !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, sectionName }) => {
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
            Are you sure you want to delete <strong className="text-[#72846A]">"{sectionName}"</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-500/10 rounded-lg transition-colors"
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

// Section Item Component
const SectionItem = ({ section, index, onUpdate, onRemove, onMove }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(section.items || []);
  const [isDragging, setIsDragging] = useState(false);

  const sectionType = SECTION_TYPES.find(t => t.value === section.type);
  const TypeIcon = sectionType?.icon || Package;
  const isSystemSection = SYSTEM_SECTION_TYPES.some(t => t.value === section.type);
  const isCustomType = section.type === 'custom';

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

  const addProducts = (newProducts) => {
    const newItems = newProducts.map((product, idx) => ({
      id: generateId(),
      productId: product._id,
      displayOrder: selectedProducts.length + idx
    }));
    const updatedItems = [...selectedProducts, ...newItems];
    setSelectedProducts(updatedItems);
    onUpdate(index, { ...section, items: updatedItems });
    toast.success(`Added ${newProducts.length} product(s) to section`);
  };

  const removeProduct = (itemId) => {
    const updatedItems = selectedProducts.filter(item => item.id !== itemId);
    setSelectedProducts(updatedItems);
    onUpdate(index, { ...section, items: updatedItems });
    toast.success('Product removed from section');
  };

  const moveProductUp = (itemIndex) => {
    if (itemIndex === 0) return;
    const updatedItems = [...selectedProducts];
    [updatedItems[itemIndex - 1], updatedItems[itemIndex]] = [updatedItems[itemIndex], updatedItems[itemIndex - 1]];
    updatedItems.forEach((item, idx) => item.displayOrder = idx);
    setSelectedProducts(updatedItems);
    onUpdate(index, { ...section, items: updatedItems });
  };

  const moveProductDown = (itemIndex) => {
    if (itemIndex === selectedProducts.length - 1) return;
    const updatedItems = [...selectedProducts];
    [updatedItems[itemIndex + 1], updatedItems[itemIndex]] = [updatedItems[itemIndex], updatedItems[itemIndex + 1]];
    updatedItems.forEach((item, idx) => item.displayOrder = idx);
    setSelectedProducts(updatedItems);
    onUpdate(index, { ...section, items: updatedItems });
  };

  const toggleSectionStatus = () => {
    const newStatus = !section.isActive;
    const updatedSection = { 
      ...section, 
      isActive: newStatus
    };
    onUpdate(index, updatedSection);
    toast.success(`Section "${section.name}" ${newStatus ? 'activated' : 'deactivated'}`);
  };

  // Fetch product details for selected products
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (selectedProducts.length === 0) {
        setProductDetails([]);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const productIds = selectedProducts.map(item => item.productId);
        const response = await fetch(
          `http://localhost:5000/api/products/admin/all?limit=100`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        const data = await response.json();
        if (data.success) {
          const details = data.data.filter(p => productIds.includes(p._id));
          setProductDetails(details);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [selectedProducts]);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
        section.isActive 
          ? 'border-blue-500/20 hover:border-blue-500/40' 
          : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
      } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ProductSearchModal
        isOpen={isProductSearchOpen}
        onClose={() => setIsProductSearchOpen(false)}
        onSelectProducts={addProducts}
        selectedProducts={selectedProducts}
      />

      <div className={`flex items-center justify-between p-4 border-b ${
        section.isActive 
          ? 'bg-gradient-to-r from-blue-500/5 to-black/5 border-blue-500/20' 
          : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 text-gray-400 cursor-grab" title="Drag to reorder">
            <GripVertical className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <TypeIcon className={`w-4 h-4 ${section.isActive ? 'text-[#72846A]' : 'text-gray-400'}`} />
            <input
              type="text"
              value={section.name}
              onChange={(e) => onUpdate(index, { ...section, name: e.target.value })}
              placeholder="Section Name"
              className={`px-2 py-1 text-sm font-medium border rounded bg-white focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none ${
                section.isActive ? 'border-gray-300' : 'border-gray-200 text-gray-500'
              }`}
            />
          </div>
          <span className={`text-xs px-2 py-0.5 rounded whitespace-nowrap ${
            section.isActive ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-500'
          }`}>
            {sectionType?.label || 'Custom'}
          </span>
          {isSystemSection && (
            <span className="text-xs text-gray-400 bg-yellow-100 px-2 py-0.5 rounded border border-yellow-200 whitespace-nowrap">
              System
            </span>
          )}
          {isCustomType && (
            <span className={`text-xs whitespace-nowrap ${section.isActive ? 'text-gray-400' : 'text-gray-400'}`}>
              {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''}
            </span>
          )}
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
          {isCustomType && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          {isSystemSection && (
            <button
              type="button"
              className="p-1 text-gray-300 cursor-not-allowed"
              title="System sections cannot be deleted"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className={`p-4 space-y-4 ${!section.isActive ? 'opacity-75' : ''}`}>
          {/* Section Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Section Type
              </label>
              <select
                value={section.type}
                onChange={(e) => {
                  const newType = e.target.value;
                  const isSystem = SYSTEM_SECTION_TYPES.some(t => t.value === newType);
                  onUpdate(index, { 
                    ...section, 
                    type: newType,
                    items: isSystem ? [] : section.items
                  });
                }}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-white ${
                  section.isActive ? 'border-blue-500/20' : 'border-gray-200'
                }`}
              >
                {SECTION_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {isSystemSection && (
                <p className="text-xs text-gray-400 mt-1">System sections cannot be deleted</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Display Order (Read Only)
              </label>
              <input
                type="number"
                value={section.displayOrder !== undefined ? section.displayOrder : index}
                disabled
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Use drag & drop to reorder sections</p>
            </div>
          </div>

          {/* Custom Section Settings */}
          {isCustomType && (
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg border ${
              section.isActive ? 'bg-gray-50 border-blue-500/20' : 'bg-gray-100 border-gray-200'
            }`}>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Custom Title
                </label>
                <input
                  type="text"
                  value={section.customTitle || ''}
                  onChange={(e) => onUpdate(index, { ...section, customTitle: e.target.value })}
                  placeholder="e.g., New Arrivals"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-white ${
                    section.isActive ? 'border-blue-500/20' : 'border-gray-200'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Custom Description
                </label>
                <input
                  type="text"
                  value={section.customDescription || ''}
                  onChange={(e) => onUpdate(index, { ...section, customDescription: e.target.value })}
                  placeholder="Brief description"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-white ${
                    section.isActive ? 'border-blue-500/20' : 'border-gray-200'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Layout
                </label>
                <select
                  value={section.layout || 'grid'}
                  onChange={(e) => onUpdate(index, { ...section, layout: e.target.value })}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-white ${
                    section.isActive ? 'border-blue-500/20' : 'border-gray-200'
                  }`}
                >
                  {LAYOUT_OPTIONS.map(layout => (
                    <option key={layout.value} value={layout.value}>
                      {layout.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Items Per Row
                </label>
                <select
                  value={section.itemsPerRow || 6}
                  onChange={(e) => onUpdate(index, { ...section, itemsPerRow: parseInt(e.target.value) })}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-white ${
                    section.isActive ? 'border-blue-500/20' : 'border-gray-200'
                  }`}
                >
                  {ITEMS_PER_ROW.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  View All Link
                </label>
                <input
                  type="text"
                  value={section.viewAllLink || '/products'}
                  onChange={(e) => onUpdate(index, { ...section, viewAllLink: e.target.value })}
                  placeholder="/products"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#72846A] focus:border-transparent outline-none transition bg-white ${
                    section.isActive ? 'border-blue-500/20' : 'border-gray-200'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Products List - Only for custom sections */}
          {isCustomType && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Products <span className="text-xs text-gray-400">(Select products for this section)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsProductSearchOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#72846A] border border-blue-500/20 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Products
                </button>
              </div>

              {selectedProducts.length > 0 ? (
                <div className="space-y-2">
                  {selectedProducts.map((item, idx) => {
                    const product = productDetails.find(p => p._id === item.productId);
                    return (
                      <div key={item.id} className={`flex items-center gap-3 p-2 rounded-lg border ${
                        section.isActive ? 'bg-gray-50 border-gray-200' : 'bg-gray-100 border-gray-200'
                      }`}>
                        <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          {product?.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0].url}
                              alt={product.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            section.isActive ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {product?.productName || 'Unknown Product'}
                          </p>
                          <p className="text-xs text-gray-500">
                            SKU: {product?.skuCode || 'N/A'} • Brand: {product?.brand || 'N/A'}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveProductUp(idx)}
                            disabled={idx === 0}
                            className={`p-1 rounded hover:bg-gray-200 transition-colors ${idx === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveProductDown(idx)}
                            disabled={idx === selectedProducts.length - 1}
                            className={`p-1 rounded hover:bg-gray-200 transition-colors ${idx === selectedProducts.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'}`}
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeProduct(item.id)}
                            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                  <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>No products added to this section</p>
                  <button
                    type="button"
                    onClick={() => setIsProductSearchOpen(true)}
                    className="mt-2 text-[#72846A] hover:text-[#414d3c] font-medium text-sm"
                  >
                    + Add Products
                  </button>
                </div>
              )}
            </div>
          )}

          {/* System sections info */}
          {isSystemSection && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-black">System Section:</span> This is a system section. 
                Its content is managed automatically. You can only toggle it on/off.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main Admin Component
export default function HomepageManagement() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDebugOpen, setIsDebugOpen] = useState(false);

  // Fetch homepage settings
  useEffect(() => {
    fetchHomepageSettings();
  }, []);

  // 🔍 TEST FUNCTION: Fetch raw data from database
  const testRawData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('🔍 Fetching raw data from database...');
      
      const response = await fetch('http://localhost:5000/api/admin/homepage/raw-data', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      console.log('📊 RAW DATA TEST RESPONSE:', data);
      
      if (data.success && data.data) {
        console.log('✅ Raw data fetched successfully!');
        console.log('📋 Total sections in database:', data.data.sections?.length || 0);
        console.log('📋 Sections in raw data:');
        data.data.sections?.forEach((s, i) => {
          console.log(`  ${i + 1}. ${s.name}: isActive = ${s.isActive} (${typeof s.isActive})`);
        });
        
        const activeCount = data.data.sections?.filter(s => s.isActive === true).length || 0;
        const inactiveCount = data.data.sections?.filter(s => s.isActive === false).length || 0;
        toast.info(`📊 DB: ${data.data.sections?.length || 0} total sections (${activeCount} active, ${inactiveCount} inactive)`);
      } else {
        console.error('❌ Failed to fetch raw data:', data);
        toast.error('Failed to fetch raw data');
      }
    } catch (error) {
      console.error('❌ Error fetching raw data:', error);
      toast.error('Error fetching raw data');
    }
  };

  // 🔍 TEST FUNCTION: Test the admin API response
  const testAdminAPI = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('🔍 Testing admin API...');
      
      const response = await fetch('http://localhost:5000/api/admin/homepage', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      console.log('📊 ADMIN API TEST RESPONSE:', data);
      
      if (data.success && data.data) {
        console.log('📋 Sections from admin API:');
        data.data.sections?.forEach((s, i) => {
          console.log(`  ${i + 1}. ${s.name}: isActive = ${s.isActive} (${typeof s.isActive})`);
        });
        
        const activeCount = data.data.sections?.filter(s => s.isActive === true).length || 0;
        const inactiveCount = data.data.sections?.filter(s => s.isActive === false).length || 0;
        toast.info(`📊 API: ${data.data.sections?.length || 0} total sections (${activeCount} active, ${inactiveCount} inactive)`);
      }
    } catch (error) {
      console.error('❌ Error testing admin API:', error);
      toast.error('Error testing admin API');
    }
  };

  const fetchHomepageSettings = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to manage homepage');
        setSections(getDefaultSections());
        setIsLoading(false);
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/homepage/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('📡 Admin API (ALL) Response Status:', response.status);
      
      if (response.status === 403) {
        console.error('❌ Forbidden: User does not have permission');
        toast.error('You do not have permission to manage homepage');
        setSections(getDefaultSections());
        setIsLoading(false);
        return;
      }
      
      if (response.ok) {
        const data = await response.json();
        console.log('📡 Full Admin API (ALL) Response:', JSON.stringify(data, null, 2));
        
        if (data.success && data.data) {
          const allSections = data.data.sections || [];
          const sortedSections = allSections.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          setSections(sortedSections);
          toast.success(`Loaded ${sortedSections.length} sections`);
        } else {
          console.error('❌ API returned success=false or no data');
          setSections(getDefaultSections());
        }
      } else {
        console.error('❌ API request failed with status:', response.status);
        setSections(getDefaultSections());
      }
    } catch (error) {
      console.error('Error fetching homepage settings:', error);
      toast.error('Failed to load homepage settings');
      setSections(getDefaultSections());
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATED: Removed 'brands' from default sections
  // const getDefaultSections = () => [
  //   {
  //     id: generateId(),
  //     name: 'Hero Banner',
  //     type: 'hero',
  //     isActive: true,
  //     displayOrder: 0,
  //     items: []
  //   },
  //   {
  //     id: generateId(),
  //     name: 'Big Sale',
  //     type: 'big_sale',
  //     isActive: true,
  //     displayOrder: 1,
  //     items: []
  //   },
  //   {
  //     id: generateId(),
  //     name: 'Categories',
  //     type: 'categories',
  //     isActive: true,
  //     displayOrder: 2,
  //     items: []
  //   },
  //   {
  //     id: generateId(),
  //     name: 'Featured Products',
  //     type: 'featured',
  //     isActive: true,
  //     displayOrder: 3,
  //     items: []
  //   }
  // ];

  // app/authorize/homepage-management/page.jsx - Updated getDefaultSections (NO BRANDS)

const getDefaultSections = () => [
  {
    id: generateId(),
    name: 'Hero Banner',
    type: 'hero',
    isActive: true,
    displayOrder: 0,
    items: []
  },

  {
    id: generateId(),
    name: 'Categories',
    type: 'categories',
    isActive: true,
    displayOrder: 1,
    items: []
  },
   {
    id: generateId(),
    name: 'Deals You Can\'t Miss',
    type: 'deals',
    isActive: true,
    displayOrder: 2,
    items: []
  },
    {
    id: generateId(),
    name: 'Big Sale',
    type: 'big_sale',
    isActive: true,
    displayOrder: 3,
    items: []
  },
  {
    id: generateId(),
    name: 'Featured Products',
    type: 'featured',
    isActive: true,
    displayOrder: 4,
    items: []
  },

  {
    id: generateId(),
    name: 'Trust & Results',
    type: 'trust_results',
    isActive: true,
    displayOrder: 5,
    items: []
  }
];

  // Add new section
  const addSection = () => {
    const newSection = {
      id: generateId(),
      name: 'New Custom Section',
      type: 'custom',
      isActive: true,
      displayOrder: sections.length,
      items: [],
      customTitle: '',
      customDescription: '',
      layout: 'grid',
      itemsPerRow: 6,
      viewAllLink: '/products'
    };
    setSections([...sections, newSection]);
    toast.success('New custom section added');
  };

  // Update section
  const updateSection = (index, updatedSection) => {
    console.log('📝 Updating section at index', index, ':', updatedSection.name, 'isActive:', updatedSection.isActive);
    
    const updatedSections = [...sections];
    updatedSections[index] = {
      ...updatedSection,
      isActive: updatedSection.isActive
    };
    setSections(updatedSections);
  };

  // Remove section - only for custom sections
  const removeSection = (index) => {
    const section = sections[index];
    const isSystem = SYSTEM_SECTION_TYPES.some(t => t.value === section.type);
    if (isSystem) {
      toast.error('System sections cannot be deleted');
      return;
    }
    setDeleteTarget({ index, name: section.name });
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

  // Move section - updated for drag and drop
  const moveSection = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const updatedSections = [...sections];
    const [removed] = updatedSections.splice(fromIndex, 1);
    updatedSections.splice(toIndex, 0, removed);
    // Update displayOrder for all sections
    updatedSections.forEach((section, idx) => section.displayOrder = idx);
    setSections(updatedSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      const sectionsWithOrder = sections.map((section, index) => ({
        id: section.id || generateId(),
        name: section.name,
        type: section.type,
        isActive: section.isActive !== undefined ? section.isActive : true,
        displayOrder: index,
        items: section.items || [],
        customTitle: section.customTitle || '',
        customDescription: section.customDescription || '',
        layout: section.layout || 'grid',
        itemsPerRow: section.itemsPerRow || 6,
        viewAllLink: section.viewAllLink || '/products'
      }));

      const response = await fetch('http://localhost:5000/api/homepage/admin', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sections: sectionsWithOrder })
      });

      console.log('🔍 RESPONSE STATUS:', response.status);

      const data = await response.json();
      console.log('🔍 SERVER RESPONSE:', data);

      if (data.success) {
        toast.success('Homepage updated successfully!');
        await fetchHomepageSettings();
      } else {
        toast.error(data.error || 'Failed to update homepage');
      }
    } catch (error) {
      console.error('Error saving homepage:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset to default homepage configuration?')) {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/homepage/admin/reset', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        if (data.success) {
          toast.success('Homepage reset to default');
          await fetchHomepageSettings();
        }
      } catch (error) {
        toast.error('Failed to reset homepage');
      }
    }
  };

  // Debug UI
  const DebugPanel = () => {
    if (!isDebugOpen) return null;
    
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-yellow-800 flex items-center gap-2">
            <Bug className="w-4 h-4" />
            Debug Panel
          </h3>
          <button
            onClick={() => setIsDebugOpen(false)}
            className="text-yellow-600 hover:text-yellow-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={testRawData}
            className="px-3 py-1.5 text-xs font-medium bg-blue-500 text-white rounded-lg hover:bg-[#72846A] transition-colors"
          >
            Test Raw Data
          </button>
          <button
            onClick={testAdminAPI}
            className="px-3 py-1.5 text-xs font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Test Admin API
          </button>
          <button
            onClick={fetchHomepageSettings}
            className="px-3 py-1.5 text-xs font-medium bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Refresh Data
          </button>
          <button
            onClick={() => {
              console.log('📊 Current sections state:', sections);
              sections.forEach((s, i) => {
                console.log(`  ${i + 1}. ${s.name}: isActive = ${s.isActive}`);
              });
              toast.info(`Current: ${sections.length} sections`);
            }}
            className="px-3 py-1.5 text-xs font-medium bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Log Current State
          </button>
        </div>
        <div className="mt-3 text-xs text-gray-600">
          <p>Check the browser console for detailed logs.</p>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#72846A] mx-auto" />
          <p className="text-gray-500 mt-2">Loading homepage settings...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="manage_homepage">
    <div className="min-h-screen bg-gray-50">
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        onConfirm={confirmDelete}
        sectionName={deleteTarget?.name || ''}
      />

      {/* Header - Black and Blue Theme */}
      <div className="bg-white border-b border-blue-500/20 shadow-lg sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <a href="/authorize/dashboard" className="p-1.5 sm:p-2 hover:bg-blue-500/20 rounded-lg transition-colors flex-shrink-0">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black/80 hover:text-black" />
              </a>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black truncate">
                      Homepage Management
                    </h1>
                  </div>
                  <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
                    HyperVolt
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-black/70 mt-0.5 sm:mt-1 truncate">
                  Drag & drop sections to reorder. System sections cannot be deleted.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setIsDebugOpen(!isDebugOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg transition-colors border ${
                  isDebugOpen 
                    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/20' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20 border-white/10'
                }`}
              >
                <Bug className="w-4 h-4" />
                Debug
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-500/10 text-blue-800 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/20"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={fetchHomepageSettings}
                className="p-1.5 sm:p-2 text-white/70 hover:bg-blue-500/20 rounded-lg transition-colors hover:text-white"
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
        {/* Debug Panel */}
        <DebugPanel />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sections List */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-500/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                  <LayoutTemplate className="w-5 h-5 text-[#72846A]" />
                  Homepage Sections
                  <span className="text-xs font-normal text-gray-400 ml-2">
                    ({sections.filter(s => s.isActive === true).length} active, {sections.filter(s => s.isActive === false).length} inactive)
                  </span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="inline-flex items-center gap-1">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    Drag and drop to reorder
                  </span>
                  • System sections cannot be deleted • Custom sections can be fully managed with products
                </p>
              </div>
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-2 px-4 py-2 bg-[#72846A] text-white rounded-lg hover:bg-[#414d3c] transition-colors text-sm font-semibold shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Custom Section
              </button>
            </div>

            <div className="space-y-3">
              {sections.map((section, index) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  index={index}
                  onUpdate={updateSection}
                  onRemove={removeSection}
                  onMove={moveSection}
                />
              ))}
            </div>

            {sections.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <LayoutTemplate className="w-12 h-12 mx-auto mb-3 text-[#72846A]/30" />
                <p>No sections added</p>
                <p className="text-sm">Click "Add Custom Section" to create your first homepage section</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-[#72846A] text-white font-medium rounded-lg hover:bg-[#414d3c] transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Homepage</span>
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
