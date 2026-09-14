
// 'use client';

// import { useState, useEffect, useRef, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { 
//   Plus, 
//   X, 
//   Save, 
//   ArrowLeft,
//   Image as ImageIcon,
//   AlertCircle,
//   CheckCircle,
//   Loader2,
//   Trash2,
//   Edit,
//   Eye,
//   Search,
//   XCircle,
//   Calendar,
//   User,
//   FileText,
//   Hash,
//   Clock,
//   RefreshCw,
//   Upload,
//   Package,
//   Info,
//   FolderTree,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   Zap,
//   Battery,
//   Shield,
//   Sparkles
// } from 'lucide-react';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// function AdminCategoriesContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: ''
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [imageError, setImageError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   const [expandedSubcategories, setExpandedSubcategories] = useState(false);
//   const [viewSubcategoriesList, setViewSubcategoriesList] = useState([]);
//   const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  
//   const [expandedChildren, setExpandedChildren] = useState({});

//   const [userRole, setUserRole] = useState('');

//   const fileInputRef = useRef(null);
//   const editFileInputRef = useRef(null);

//   const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '', productCount: 0 });
//   const [viewModal, setViewModal] = useState({ show: false, category: null });
//   const [editModal, setEditModal] = useState({ show: false, category: null, imageFile: null, imagePreview: null, imageError: '' });

//   const [subcategoryModal, setSubcategoryModal] = useState({ 
//     show: false, 
//     category: null,
//     subcategories: [{ name: '', id: Date.now() }],
//     isSubmitting: false
//   });

//   const [editSubcategoryModal, setEditSubcategoryModal] = useState({
//     show: false,
//     category: null,
//     subcategory: null,
//     name: '',
//     isSubmitting: false
//   });

//   const [childSubcategoryModal, setChildSubcategoryModal] = useState({
//     show: false,
//     category: null,
//     subcategory: null,
//     children: [{ name: '', id: Date.now() }],
//     isSubmitting: false
//   });

//   const [editChildSubcategoryModal, setEditChildSubcategoryModal] = useState({
//     show: false,
//     category: null,
//     subcategory: null,
//     child: null,
//     name: '',
//     isSubmitting: false
//   });

//   const [viewSubcategoriesModal, setViewSubcategoriesModal] = useState({
//     show: false,
//     category: null,
//     subcategories: [],
//     isLoading: false,
//     expandedChildren: {}
//   });

//   const [deleteSubcategoryModal, setDeleteSubcategoryModal] = useState({
//     show: false,
//     categoryId: null,
//     subcategoryId: null,
//     subcategoryName: '',
//     productCount: 0,
//     isChild: false,
//     childId: null
//   });

//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//   const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
//   const maxFileSize = 5 * 1024 * 1024;

//   // Get user role on mount
//   useEffect(() => {
//     const getUserRole = () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           const payload = JSON.parse(atob(token.split('.')[1]));
//           setUserRole(payload.role || '');
//         }
//       } catch (error) {
//         console.error('Error getting user role:', error);
//       }
//     };
//     getUserRole();
//   }, []);

//   // Check if user can delete (Super Admin and Admin only)
//   const canDelete = userRole === 'super_admin' || userRole === 'admin';

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:5000/api/categories', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         const categoriesWithCounts = data.data.map(category => {
//           let productCount = 0;
          
//           if (category.products && Array.isArray(category.products)) {
//             productCount = category.products.length;
//           } else if (category.productCount) {
//             productCount = category.productCount;
//           }
          
//           const subcategoryCount = category.subcategories?.length || 0;
          
//           return {
//             ...category,
//             productCount,
//             subcategoryCount
//           };
//         });
        
//         setCategories(categoriesWithCounts);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       toast.error('Failed to fetch categories');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         return data.data.subcategories;
//       }
//       return [];
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//       return [];
//     }
//   };

//   const fetchChildren = async (categoryId, subcategoryId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         return data.data.children;
//       }
//       return [];
//     } catch (error) {
//       console.error('Error fetching children:', error);
//       return [];
//     }
//   };

//   const fetchViewSubcategories = async (categoryId) => {
//     setIsLoadingSubcategories(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setViewSubcategoriesList(data.data.subcategories);
//       } else {
//         setViewSubcategoriesList([]);
//       }
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//       setViewSubcategoriesList([]);
//     } finally {
//       setIsLoadingSubcategories(false);
//     }
//   };

//   const handleViewClick = (category) => {
//     setViewModal({ show: true, category });
//     setExpandedSubcategories(false);
//     fetchViewSubcategories(category._id);
//   };

//   const handleViewClose = () => {
//     setViewModal({ show: false, category: null });
//     setExpandedSubcategories(false);
//     setViewSubcategoriesList([]);
//     setExpandedChildren({});
//   };

//   const handleEditClick = (category) => {
//     setEditModal({ 
//       show: true, 
//       category,
//       formData: {
//         name: category.name,
//         description: category.description || ''
//       },
//       imagePreview: category.image?.url || null,
//       imageFile: null,
//       imageError: ''
//     });
//   };

//   const handleEditClose = () => {
//     setEditModal({ show: false, category: null, formData: { name: '', description: '' }, imagePreview: null, imageFile: null, imageError: '' });
//     setErrors({});
//   };

//   const handleViewSubcategories = async (category) => {
//     setViewSubcategoriesModal({
//       show: true,
//       category,
//       subcategories: [],
//       isLoading: true,
//       expandedChildren: {}
//     });
    
//     const subcategories = await fetchSubcategories(category._id);
//     setViewSubcategoriesModal(prev => ({
//       ...prev,
//       subcategories,
//       isLoading: false
//     }));
//   };

//   const toggleViewChildren = async (subcategoryId) => {
//     if (viewSubcategoriesModal.expandedChildren[subcategoryId]) {
//       setViewSubcategoriesModal(prev => ({
//         ...prev,
//         expandedChildren: { ...prev.expandedChildren, [subcategoryId]: false }
//       }));
//     } else {
//       const children = await fetchChildren(viewSubcategoriesModal.category._id, subcategoryId);
//       setViewSubcategoriesModal(prev => ({
//         ...prev,
//         subcategories: prev.subcategories.map(sub => 
//           sub._id === subcategoryId ? { ...sub, children: children } : sub
//         ),
//         expandedChildren: { ...prev.expandedChildren, [subcategoryId]: true }
//       }));
//     }
//   };

//   const handleAddSubcategory = (category) => {
//     setSubcategoryModal({
//       show: true,
//       category,
//       subcategories: [{ name: '', id: Date.now() }],
//       isSubmitting: false
//     });
//   };

//   const addSubcategoryField = () => {
//     setSubcategoryModal(prev => ({
//       ...prev,
//       subcategories: [...prev.subcategories, { name: '', id: Date.now() }]
//     }));
//   };

//   const removeSubcategoryField = (id) => {
//     if (subcategoryModal.subcategories.length === 1) {
//       toast.error('At least one subcategory is required');
//       return;
//     }
//     setSubcategoryModal(prev => ({
//       ...prev,
//       subcategories: prev.subcategories.filter(sub => sub.id !== id)
//     }));
//   };

//   const updateSubcategoryName = (id, value) => {
//     setSubcategoryModal(prev => ({
//       ...prev,
//       subcategories: prev.subcategories.map(sub => 
//         sub.id === id ? { ...sub, name: value } : sub
//       )
//     }));
//   };

//   const handleAddSubcategorySubmit = async (e) => {
//     e.preventDefault();
    
//     const validSubcategories = subcategoryModal.subcategories.filter(sub => sub.name.trim());
    
//     if (validSubcategories.length === 0) {
//       toast.error('At least one subcategory name is required');
//       return;
//     }

//     const names = validSubcategories.map(sub => sub.name.trim().toLowerCase());
//     const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
//     if (duplicates.length > 0) {
//       toast.error(`Duplicate subcategory names: ${duplicates.join(', ')}`);
//       return;
//     }

//     setSubcategoryModal(prev => ({ ...prev, isSubmitting: true }));

//     try {
//       const token = localStorage.getItem('token');
//       let successCount = 0;
//       let errorCount = 0;

//       for (const subcategory of validSubcategories) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/categories/${subcategoryModal.category._id}/subcategories`, {
//             method: 'POST',
//             headers: { 
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ name: subcategory.name.trim() })
//           });

//           const data = await response.json();

//           if (data.success) {
//             successCount++;
//           } else {
//             errorCount++;
//           }
//         } catch (error) {
//           errorCount++;
//         }
//       }

//       if (successCount > 0) {
//         toast.success(`Successfully added ${successCount} subcategor${successCount === 1 ? 'y' : 'ies'}!`);
//         if (errorCount > 0) {
//           toast.warning(`${errorCount} subcategor${errorCount === 1 ? 'y' : 'ies'} failed to add`);
//         }
        
//         setSubcategoryModal({
//           show: false,
//           category: null,
//           subcategories: [{ name: '', id: Date.now() }],
//           isSubmitting: false
//         });
//         fetchCategories();
        
//         if (viewSubcategoriesModal.show && viewSubcategoriesModal.category?._id === subcategoryModal.category._id) {
//           const updatedSubcategories = await fetchSubcategories(subcategoryModal.category._id);
//           setViewSubcategoriesModal(prev => ({
//             ...prev,
//             subcategories: updatedSubcategories
//           }));
//         }
//       } else {
//         toast.error('Failed to add subcategories. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error adding subcategories:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setSubcategoryModal(prev => ({ ...prev, isSubmitting: false }));
//     }
//   };

//   const handleEditSubcategory = (category, subcategory) => {
//     setEditSubcategoryModal({
//       show: true,
//       category,
//       subcategory,
//       name: subcategory.name,
//       isSubmitting: false
//     });
//   };

//   const handleEditSubcategorySubmit = async (e) => {
//     e.preventDefault();
    
//     if (!editSubcategoryModal.name.trim()) {
//       toast.error('Subcategory name is required');
//       return;
//     }

//     setEditSubcategoryModal(prev => ({ ...prev, isSubmitting: true }));

//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(
//         `http://localhost:5000/api/categories/${editSubcategoryModal.category._id}/subcategories/${editSubcategoryModal.subcategory._id}`,
//         {
//           method: 'PUT',
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ name: editSubcategoryModal.name.trim() })
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Subcategory updated successfully!');
//         setEditSubcategoryModal({
//           show: false,
//           category: null,
//           subcategory: null,
//           name: '',
//           isSubmitting: false
//         });
//         fetchCategories();
        
//         if (viewSubcategoriesModal.show && viewSubcategoriesModal.category?._id === editSubcategoryModal.category._id) {
//           const updatedSubcategories = await fetchSubcategories(editSubcategoryModal.category._id);
//           setViewSubcategoriesModal(prev => ({
//             ...prev,
//             subcategories: updatedSubcategories
//           }));
//         }
//       } else {
//         toast.error(data.error || 'Failed to update subcategory');
//       }
//     } catch (error) {
//       console.error('Error updating subcategory:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setEditSubcategoryModal(prev => ({ ...prev, isSubmitting: false }));
//     }
//   };

//   const handleAddChildSubcategory = (category, subcategory) => {
//     setChildSubcategoryModal({
//       show: true,
//       category,
//       subcategory,
//       children: [{ name: '', id: Date.now() }],
//       isSubmitting: false
//     });
//   };

//   const addChildField = () => {
//     setChildSubcategoryModal(prev => ({
//       ...prev,
//       children: [...prev.children, { name: '', id: Date.now() }]
//     }));
//   };

//   const removeChildField = (id) => {
//     if (childSubcategoryModal.children.length === 1) {
//       toast.error('At least one child subcategory is required');
//       return;
//     }
//     setChildSubcategoryModal(prev => ({
//       ...prev,
//       children: prev.children.filter(child => child.id !== id)
//     }));
//   };

//   const updateChildName = (id, value) => {
//     setChildSubcategoryModal(prev => ({
//       ...prev,
//       children: prev.children.map(child => 
//         child.id === id ? { ...child, name: value } : child
//       )
//     }));
//   };

//   const handleAddChildSubcategorySubmit = async (e) => {
//     e.preventDefault();
    
//     const validChildren = childSubcategoryModal.children.filter(child => child.name.trim());
    
//     if (validChildren.length === 0) {
//       toast.error('At least one child subcategory name is required');
//       return;
//     }

//     const names = validChildren.map(child => child.name.trim().toLowerCase());
//     const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
//     if (duplicates.length > 0) {
//       toast.error(`Duplicate child subcategory names: ${duplicates.join(', ')}`);
//       return;
//     }

//     setChildSubcategoryModal(prev => ({ ...prev, isSubmitting: true }));

//     try {
//       const token = localStorage.getItem('token');
//       let successCount = 0;
//       let errorCount = 0;

//       for (const child of validChildren) {
//         try {
//           const response = await fetch(
//             `http://localhost:5000/api/categories/${childSubcategoryModal.category._id}/subcategories/${childSubcategoryModal.subcategory._id}/children`,
//             {
//               method: 'POST',
//               headers: { 
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({ name: child.name.trim() })
//             }
//           );

//           const data = await response.json();

//           if (data.success) {
//             successCount++;
//           } else {
//             errorCount++;
//           }
//         } catch (error) {
//           errorCount++;
//         }
//       }

//       if (successCount > 0) {
//         toast.success(`Successfully added ${successCount} child subcategor${successCount === 1 ? 'y' : 'ies'}!`);
//         if (errorCount > 0) {
//           toast.warning(`${errorCount} child subcategor${errorCount === 1 ? 'y' : 'ies'} failed to add`);
//         }
        
//         setChildSubcategoryModal({
//           show: false,
//           category: null,
//           subcategory: null,
//           children: [{ name: '', id: Date.now() }],
//           isSubmitting: false
//         });
//         fetchCategories();
        
//         if (viewSubcategoriesModal.show) {
//           const updatedSubcategories = await fetchSubcategories(childSubcategoryModal.category._id);
//           setViewSubcategoriesModal(prev => ({
//             ...prev,
//             subcategories: updatedSubcategories
//           }));
//         }
//       } else {
//         toast.error('Failed to add child subcategories. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error adding child subcategories:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setChildSubcategoryModal(prev => ({ ...prev, isSubmitting: false }));
//     }
//   };

//   const handleEditChildSubcategory = (category, subcategory, child) => {
//     setEditChildSubcategoryModal({
//       show: true,
//       category,
//       subcategory,
//       child,
//       name: child.name,
//       isSubmitting: false
//     });
//   };

//   const handleEditChildSubcategorySubmit = async (e) => {
//     e.preventDefault();
    
//     if (!editChildSubcategoryModal.name.trim()) {
//       toast.error('Child subcategory name is required');
//       return;
//     }

//     setEditChildSubcategoryModal(prev => ({ ...prev, isSubmitting: true }));

//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(
//         `http://localhost:5000/api/categories/${editChildSubcategoryModal.category._id}/subcategories/${editChildSubcategoryModal.subcategory._id}/children/${editChildSubcategoryModal.child._id}`,
//         {
//           method: 'PUT',
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ name: editChildSubcategoryModal.name.trim() })
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Child subcategory updated successfully!');
//         setEditChildSubcategoryModal({
//           show: false,
//           category: null,
//           subcategory: null,
//           child: null,
//           name: '',
//           isSubmitting: false
//         });
//         fetchCategories();
        
//         if (viewSubcategoriesModal.show) {
//           const updatedSubcategories = await fetchSubcategories(editChildSubcategoryModal.category._id);
//           setViewSubcategoriesModal(prev => ({
//             ...prev,
//             subcategories: updatedSubcategories
//           }));
//         }
//       } else {
//         toast.error(data.error || 'Failed to update child subcategory');
//       }
//     } catch (error) {
//       console.error('Error updating child subcategory:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setEditChildSubcategoryModal(prev => ({ ...prev, isSubmitting: false }));
//     }
//   };

//   const handleDeleteSubcategoryClick = (categoryId, subcategoryId, subcategoryName, productCount, isChild = false, childId = null) => {
//     setDeleteSubcategoryModal({
//       show: true,
//       categoryId,
//       subcategoryId,
//       subcategoryName,
//       productCount,
//       isChild,
//       childId
//     });
//   };

//   const handleDeleteSubcategoryConfirm = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       let url;
      
//       if (deleteSubcategoryModal.isChild) {
//         url = `http://localhost:5000/api/categories/${deleteSubcategoryModal.categoryId}/subcategories/${deleteSubcategoryModal.subcategoryId}/children/${deleteSubcategoryModal.childId}`;
//       } else {
//         url = `http://localhost:5000/api/categories/${deleteSubcategoryModal.categoryId}/subcategories/${deleteSubcategoryModal.subcategoryId}`;
//       }
      
//       const response = await fetch(url, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success(`${deleteSubcategoryModal.isChild ? 'Child subcategory' : 'Subcategory'} deleted successfully`);
//         setDeleteSubcategoryModal({
//           show: false,
//           categoryId: null,
//           subcategoryId: null,
//           subcategoryName: '',
//           productCount: 0,
//           isChild: false,
//           childId: null
//         });
//         fetchCategories();
        
//         if (viewSubcategoriesModal.show) {
//           const updatedSubcategories = await fetchSubcategories(deleteSubcategoryModal.categoryId);
//           setViewSubcategoriesModal(prev => ({
//             ...prev,
//             subcategories: updatedSubcategories
//           }));
//         }
//       } else {
//         toast.error(data.error || 'Failed to delete');
//       }
//     } catch (error) {
//       console.error('Error deleting:', error);
//       toast.error('Network error. Please try again.');
//     }
//   };

//   const handleDeleteClick = (id, name, productCount) => {
//     setDeleteModal({ show: true, id, name, productCount });
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/categories/${deleteModal.id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Category deleted successfully');
//         fetchCategories();
//       } else {
//         toast.error(data.error || 'Failed to delete category');
//       }
//     } catch (error) {
//       console.error('Error deleting category:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setDeleteModal({ show: false, id: null, name: '', productCount: 0 });
//     }
//   };

//   const validateImageFile = (file) => {
//     if (!allowedFileTypes.includes(file.type)) {
//       const fileExtension = file.name.split('.').pop().toLowerCase();
//       return {
//         valid: false,
//         message: `Invalid file format: .${fileExtension}. Please upload: ${allowedExtensions.join(', ')}`
//       };
//     }

//     if (file.size > maxFileSize) {
//       const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
//       return {
//         valid: false,
//         message: `File size too large: ${fileSizeMB}MB. Maximum allowed size is 5MB`
//       };
//     }

//     return { valid: true };
//   };

//   const handleEditImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validation = validateImageFile(file);
//     if (!validation.valid) {
//       setEditModal(prev => ({
//         ...prev,
//         imageError: validation.message
//       }));
//       if (editFileInputRef.current) {
//         editFileInputRef.current.value = '';
//       }
//       return;
//     }

//     setEditModal(prev => ({
//       ...prev,
//       imageError: '',
//       imageFile: file
//     }));

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setEditModal(prev => ({
//         ...prev,
//         imagePreview: reader.result
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleEditRemoveImage = () => {
//     setEditModal(prev => ({
//       ...prev,
//       imageFile: null,
//       imagePreview: null,
//       imageError: ''
//     }));
//     if (editFileInputRef.current) {
//       editFileInputRef.current.value = '';
//     }
//   };

//   const handleEditChooseAgain = () => {
//     setEditModal(prev => ({
//       ...prev,
//       imageError: ''
//     }));
//     if (editFileInputRef.current) {
//       editFileInputRef.current.click();
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!editModal.formData.name.trim()) {
//       setErrors({ name: 'Category name is required' });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', editModal.formData.name);
//       formDataToSend.append('description', editModal.formData.description);
      
//       if (editModal.imageFile) {
//         formDataToSend.append('image', editModal.imageFile);
//       }

//       const response = await fetch(`http://localhost:5000/api/categories/${editModal.category._id}`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${token}` },
//         body: formDataToSend
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Category updated successfully!');
//         fetchCategories();
//         handleEditClose();
//       } else {
//         toast.error(data.error || 'Failed to update category');
//       }
//     } catch (error) {
//       console.error('Error updating category:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) {
//       newErrors.name = 'Category name is required';
//     } else if (formData.name.length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     } else if (formData.name.length > 100) {
//       newErrors.name = 'Name cannot exceed 100 characters';
//     }
  
    
//     if (!imageFile && !imagePreview) {
//       newErrors.image = 'Category image is required';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validation = validateImageFile(file);
//     if (!validation.valid) {
//       setImageError(validation.message);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//       return;
//     }

//     setImageError('');
//     setImageFile(file);
//     const reader = new FileReader();
//     reader.onloadend = () => setImagePreview(reader.result);
//     reader.readAsDataURL(file);
    
//     if (errors.image) setErrors({ ...errors, image: null });
//   };

//   const removeImage = () => {
//     setImageFile(null);
//     setImagePreview(null);
//     setImageError('');
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('image', imageFile);

//       const response = await fetch('http://localhost:5000/api/categories', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` },
//         body: formDataToSend
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success('Category created successfully!');
//         setFormData({ name: '', description: '' });
//         setImagePreview(null);
//         setImageFile(null);
//         setImageError('');
//         if (fileInputRef.current) {
//           fileInputRef.current.value = '';
//         }
//         fetchCategories();
//       } else {
//         toast.error(data.error || 'Failed to create category');
//       }
//     } catch (error) {
//       console.error('Error creating category:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const filteredCategories = categories.filter(cat => 
//     cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (cat.description && cat.description.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const truncateDescription = (text, wordLimit = 10) => {
//     if (!text) return '—';
//     const words = text.split(' ');
//     if (words.length <= wordLimit) return text;
//     return words.slice(0, wordLimit).join(' ') + '...';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <ProtectedRoute pageKey="create_category">
//     <div className="min-h-screen bg-gradient-to-br from-[#004767]/5 via-white to-[#73856B]/5">
//       {/* Header - HyperVolt Theme */}
//       <div className="bg-white border-b border-[#73856B]/20 sticky top-0 z-10 shadow-lg">
//         <div className="px-4 sm:px-6 py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div className="flex items-center gap-2 sm:gap-4">
//               <a href="/authorize/dashboard" className="p-1.5 sm:p-2 hover:bg-[#73856B]/20 rounded-lg transition-colors flex-shrink-0">
//                 <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black/80 hover:text-black" />
//               </a>
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
//                   <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black flex items-center gap-2">
//                     <Battery className="w-5 h-5 sm:w-6 sm:h-6 text-[#73856B]" />
//                     Category Management
//                   </h1>
//                 </div>
//                 <p className="text-xs sm:text-sm text-black/70 mt-0.5 sm:mt-1 truncate">
//                   Manage categories, subcategories for power products
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
//               <div className="text-xs sm:text-sm text-black/70 bg-[#73856B]/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#73856B]/20">
//                 Total: <span className="font-semibold text-[#73856B]">{categories.length}</span> categories
//               </div>
//               <button onClick={fetchCategories} className="p-1.5 sm:p-2 text-[#73856B] hover:bg-[#73856B]/20 rounded-lg transition-colors hover:text-blue-800" title="Refresh">
//                 <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
//           {/* Create Form */}
//           <div className="lg:col-span-1">
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#73856B]/20 sticky top-24">
//               <div className="p-5 border-b border-[#73856B]/20 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5">
//                 <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                   <Plus className="w-5 h-5 text-[#73856B]" />
//                   Add New Category
//                 </h2>
//               </div>
              
//               <form onSubmit={handleSubmit} className="p-5 space-y-4">
//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Image <span className="text-red-500">*</span>
//                   </label>
                  
//                   {!imagePreview ? (
//                     <>
//                       <div 
//                         className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
//                           imageError ? 'border-red-300 bg-red-50' : errors.image ? 'border-red-300 bg-red-50' : 'border-[#73856B]/30 hover:border-[#73856B] hover:bg-[#73856B]/5'
//                         }`}
//                         onClick={() => {
//                           setImageError('');
//                           fileInputRef.current?.click();
//                         }}
//                       >
//                         <input 
//                           type="file" 
//                           ref={fileInputRef}
//                           className="hidden" 
//                           accept="image/jpeg,image/jpg,image/png,image/webp" 
//                           onChange={handleImageChange} 
//                         />
//                         <Upload className={`w-8 h-8 mx-auto mb-2 ${imageError || errors.image ? 'text-red-400' : 'text-[#73856B]'}`} />
//                         <p className={`text-xs ${imageError || errors.image ? 'text-red-600' : 'text-gray-600'}`}>
//                           Click to upload
//                         </p>
//                         <p className="text-xs text-gray-400 mt-2">
//                           Allowed formats: JPG, JPEG, PNG, WebP (max 5MB)
//                         </p>
//                       </div>
//                       {imageError && (
//                         <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
//                           <AlertCircle className="w-3 h-3" />
//                           {imageError}
//                         </p>
//                       )}
//                     </>
//                   ) : (
//                     <div className="space-y-3">
//                       <div className="relative rounded-lg overflow-hidden border border-[#73856B]/20">
//                         <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover" />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button type="button" onClick={removeImage} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors">
//                           <Trash2 className="w-3.5 h-3.5" />
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                   {errors.image && !imagePreview && !imageError && (
//                     <p className="text-xs text-red-600 mt-1">{errors.image}</p>
//                   )}
//                 </div>

//                 {/* Category Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition ${
//                       errors.name ? 'border-red-500' : 'border-[#73856B]/30'
//                     } bg-white hover:border-[#73856B]/50`}
//                     placeholder="e.g., Power Banks"
//                   />
//                   {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
//                 </div>

          

// <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//     Description   {/* ← Remove the * */}
//   </label>
//   <textarea
//     name="description"
//     value={formData.description}
//     onChange={handleChange}
//     rows="3"
//     className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition ${
//       errors.description ? 'border-red-500' : 'border-[#73856B]/30'  // ← Remove this error check
//     } bg-white hover:border-[#73856B]/50`}
//     placeholder="Brief description about this category (Optional)"
//   />
//   {/* Remove this error message block */}
//   {/* {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>} */}
// </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#73856B] hover:bg-[#55634f]/90 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-md hover:shadow-lg hover:shadow-[#73856B]/20"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       <span>Creating...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Save className="w-4 h-4" />
//                       <span>Create Category</span>
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Categories Table */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#73856B]/20 overflow-hidden">
//               <div className="p-5 border-b border-[#73856B]/20 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
//                     <Zap className="w-5 h-5 text-[#73856B]" />
//                     All Categories ({filteredCategories.length})
//                   </h2>
//                   <div className="relative w-64">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
//                     <input
//                       type="text"
//                       placeholder="Search categories..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2 text-sm border border-[#73856B]/20 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition placeholder:text-gray-400 bg-white hover:border-[#73856B]/40"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Table */}
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5">
//                     <tr>
//                       <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Image</th>
//                       <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Name</th>
//                       <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Description</th>
//                       <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">
//                         <div className="flex items-center gap-1">
//                           <FolderTree className="w-3.5 h-3.5 text-[#73856B]" />
//                           SubCategories
//                         </div>
//                       </th>
//                       <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">
//                         <div className="flex items-center gap-1">
//                           <Package className="w-3.5 h-3.5 text-[#73856B]" />
//                           Products
//                         </div>
//                       </th>
//                       <th className="px-5 py-3 text-right text-xs font-medium text-[#64748B] uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-[#73856B]/10">
//                     {isLoading ? (
//                       <tr>
//                         <td colSpan="6" className="px-5 py-8 text-center">
//                           <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#73856B]" />
//                         </td>
//                       </tr>
//                     ) : filteredCategories.length === 0 ? (
//                       <tr>
//                         <td colSpan="6" className="px-5 py-8 text-center text-[#64748B]">
//                           {searchTerm ? 'No categories found matching your search' : 'No categories created yet'}
//                         </td>
//                       </tr>
//                     ) : (
//                       filteredCategories.map((category) => (
//                         <tr key={category._id} className="hover:bg-[#73856B]/5 transition-colors">
//                           <td className="px-5 py-3">
//                             <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#73856B]/20">
//                               <img 
//                                 src={category.image?.url || '/placeholder-image.jpg'} 
//                                 alt={category.name}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {
//                                   e.target.onerror = null;
//                                   e.target.src = 'https://via.placeholder.com/48?text=No+Image';
//                                 }}
//                               />
//                             </div>
//                           </td>
//                           <td className="px-5 py-3">
//                             <div className="text-sm font-medium text-gray-900">{category.name}</div>
//                             <div className="text-xs text-[#64748B] mt-0.5">ID: {category._id.slice(-6)}</div>
//                           </td>
//                           <td className="px-5 py-3">
//                             <div className="text-sm text-gray-600 max-w-xs">
//                               {truncateDescription(category.description, 8)}
//                             </div>
//                           </td>
//                           <td className="px-5 py-3">
//                             <button
//                               onClick={() => handleViewSubcategories(category)}
//                               className="flex items-center gap-1.5 px-2 py-1 bg-[#73856B]/10 text-[#73856B] rounded-lg hover:bg-[#73856B]/20 transition-colors text-xs font-medium border border-[#73856B]/20"
//                             >
//                               <FolderTree className="w-3.5 h-3.5" />
//                               {category.subcategoryCount || 0} Total
//                               <ChevronRight className="w-3 h-3" />
//                             </button>
//                           </td>
//                           <td className="px-5 py-3">
//                             <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                               category.productCount > 0 
//                                 ? 'bg-green-100 text-green-700 border border-green-200' 
//                                 : 'bg-gray-100 text-gray-600 border border-gray-200'
//                             }`}>
//                               {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
//                             </span>
//                           </td>
//                           <td className="px-5 py-3">
//                             <div className="flex items-center justify-end gap-2">
//                               <button onClick={() => handleViewClick(category)} className="p-1.5 text-gray-600 hover:text-[#73856B] hover:bg-[#73856B]/10 rounded-lg transition-colors" title="View Details">
//                                 <Eye className="w-4 h-4" />
//                               </button>
//                               <button onClick={() => handleAddSubcategory(category)} className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Add Subcategory">
//                                 <Plus className="w-4 h-4" />
//                               </button>
//                               <button onClick={() => handleEditClick(category)} className="p-1.5 text-gray-600 hover:text-[#73856B] hover:bg-[#73856B]/10 rounded-lg transition-colors" title="Edit">
//                                 <Edit className="w-4 h-4" />
//                               </button>
                              
//                               <div className="relative group">
//                                 <button
//                                   onClick={() => {
//                                     if (category.productCount === 0 && canDelete) {
//                                       handleDeleteClick(category._id, category.name, category.productCount);
//                                     }
//                                   }}
//                                   disabled={category.productCount > 0 || !canDelete}
//                                   className={`p-1.5 rounded-lg transition-colors ${
//                                     category.productCount > 0 || !canDelete
//                                       ? 'text-gray-300 cursor-not-allowed'
//                                       : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
//                                   }`}
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </button>
//                                 {category.productCount > 0 && (
//                                   <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-[#004767] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 w-48 text-center shadow-lg">
//                                     <div className="flex items-start gap-1.5">
//                                       <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#73856B]" />
//                                       <span className="leading-tight break-words text-left">
//                                         Cannot delete - This category has {category.productCount} product{category.productCount !== 1 ? 's' : ''}
//                                       </span>
//                                     </div>
//                                     <div className="absolute top-full right-2 -mt-1 border-4 border-transparent border-t-[#004767]"></div>
//                                   </div>
//                                 )}
//                                 {!canDelete && !category.productCount && (
//                                   <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
//                                     Delete disabled for this role
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="px-5 py-3 border-t border-[#73856B]/20 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5">
//                 <p className="text-xs text-[#64748B]">
//                   Showing {filteredCategories.length} of {categories.length} categories
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* View Category Modal - HyperVolt colors */}
//       {viewModal.show && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto border border-[#73856B]/20">
//             <div className="flex items-center justify-between px-6 py-4 border-b border-[#73856B]/20 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#73856B]/20">
//                   <img 
//                     src={viewModal.category?.image?.url || '/placeholder-image.jpg'} 
//                     alt={viewModal.category?.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold text-[#004767]">{viewModal.category?.name}</h2>
//                   <p className="text-xs text-[#64748B]">Category Details</p>
//                 </div>
//               </div>
//               <button onClick={handleViewClose} className="p-1.5 hover:bg-[#73856B]/10 rounded-lg transition-colors">
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             {/* View content */}
//             <div className="p-6">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Hash className="w-3.5 h-3.5 text-[#73856B]" />
//                     <span className="text-xs font-medium text-[#64748B]">Category ID</span>
//                   </div>
//                   <p className="text-xs font-mono text-gray-900 break-all">{viewModal.category?._id}</p>
//                 </div>

//                 <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FolderTree className="w-3.5 h-3.5 text-[#73856B]" />
//                     <span className="text-xs font-medium text-[#64748B]">Subcategories</span>
//                   </div>
//                   <button
//                     onClick={() => setExpandedSubcategories(!expandedSubcategories)}
//                     className="w-full flex items-center justify-between px-3 py-2 bg-[#73856B]/10 hover:bg-[#73856B]/20 rounded-lg transition-colors group border border-[#73856B]/20"
//                   >
//                     <div className="flex items-center gap-2">
//                       <FolderTree className="w-4 h-4 text-[#73856B]" />
//                       <span className="text-sm font-medium text-[#004767]">
//                         {viewSubcategoriesList.length} subcategor{viewSubcategoriesList.length === 1 ? 'y' : 'ies'}
//                       </span>
//                     </div>
//                     <ChevronRight className={`w-4 h-4 text-[#73856B] transition-transform duration-200 ${expandedSubcategories ? 'rotate-90' : ''}`} />
//                   </button>
                  
//                   {expandedSubcategories && (
//                     <div className="mt-3 pt-3 border-t border-[#73856B]/20">
//                       {isLoadingSubcategories ? (
//                         <div className="flex items-center justify-center py-4">
//                           <Loader2 className="w-4 h-4 animate-spin text-[#73856B]" />
//                           <span className="text-xs text-[#64748B] ml-2">Loading...</span>
//                         </div>
//                       ) : viewSubcategoriesList.length === 0 ? (
//                         <p className="text-xs text-[#64748B] text-center py-4">No subcategories found</p>
//                       ) : (
//                         <div className="space-y-2 max-h-48 overflow-y-auto">
//                           {viewSubcategoriesList.map((sub, idx) => (
//                             <div key={sub._id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#73856B]/20 hover:shadow-sm transition-shadow">
//                               <div className="flex items-center gap-2 flex-1 min-w-0">
//                                 <span className="text-xs text-gray-400 font-mono flex-shrink-0 w-5">#{idx + 1}</span>
//                                 <span className="text-sm font-medium text-gray-800 truncate">{sub.name}</span>
//                                 {sub.productCount > 0 && (
//                                   <span className="text-xs text-gray-500 flex-shrink-0">
//                                     ({sub.productCount})
//                                   </span>
//                                 )}
//                               </div>
//                               <div className="flex items-center gap-1 flex-shrink-0 ml-2">
//                                 <button
//                                   onClick={() => {
//                                     handleViewClose();
//                                     handleEditSubcategory(viewModal.category, sub);
//                                   }}
//                                   className="p-1 text-gray-400 hover:text-[#73856B] hover:bg-[#73856B]/10 rounded transition-colors"
//                                   title="Edit Subcategory"
//                                 >
//                                   <Edit className="w-3.5 h-3.5" />
//                                 </button>
//                                 {canDelete && sub.productCount === 0 && (
//                                   <button
//                                     onClick={() => {
//                                       handleViewClose();
//                                       handleDeleteSubcategoryClick(viewModal.category._id, sub._id, sub.name, sub.productCount, false, null);
//                                     }}
//                                     className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
//                                     title="Delete Subcategory"
//                                   >
//                                     <Trash2 className="w-3.5 h-3.5" />
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Package className="w-3.5 h-3.5 text-[#73856B]" />
//                     <span className="text-xs font-medium text-[#64748B]">Total Products</span>
//                   </div>
//                   <p className="text-xs font-medium text-gray-900">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                       viewModal.category?.productCount > 0 
//                         ? 'bg-green-100 text-green-700 border border-green-200' 
//                         : 'bg-gray-100 text-gray-600 border border-gray-200'
//                     }`}>
//                       {viewModal.category?.productCount || 0} {viewModal.category?.productCount === 1 ? 'product' : 'products'}
//                     </span>
//                   </p>
//                 </div>

//                 <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Calendar className="w-3.5 h-3.5 text-[#73856B]" />
//                     <span className="text-xs font-medium text-[#64748B]">Created</span>
//                   </div>
//                   <p className="text-xs font-medium text-gray-900">
//                     {viewModal.category?.createdAt && formatDate(viewModal.category.createdAt)}
//                   </p>
//                 </div>

//                 <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
//                   <div className="flex items-center gap-2 mb-1">
//                     <User className="w-3.5 h-3.5 text-[#73856B]" />
//                     <span className="text-xs font-medium text-[#64748B]">Created By</span>
//                   </div>
//                   <p className="text-xs font-medium text-gray-900">
//                     {viewModal.category?.createdBy?.contactPerson || 'Unknown'}
//                   </p>
//                 </div>

//                 <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Clock className="w-3.5 h-3.5 text-[#73856B]" />
//                     <span className="text-xs font-medium text-[#64748B]">Updated</span>
//                   </div>
//                   <p className="text-xs font-medium text-gray-900">
//                     {viewModal.category?.updatedAt && formatDate(viewModal.category.updatedAt)}
//                   </p>
//                 </div>

//                 <div className="col-span-2 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
//                   <div className="flex items-center gap-2 mb-1">
//                     <FileText className="w-3.5 h-3.5 text-[#73856B]" />
//                     <span className="text-xs font-medium text-[#64748B]">Description</span>
//                   </div>
//                   <p className="text-xs text-gray-700 leading-relaxed">
//                     {viewModal.category?.description || 'No description provided for this category.'}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-[#73856B]/20">
//                 <button
//                   onClick={() => {
//                     handleViewClose();
//                     handleAddSubcategory(viewModal.category);
//                   }}
//                   className="px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-1 border border-green-200"
//                 >
//                   <Plus className="w-3.5 h-3.5" />
//                   Add Subcategory
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleViewClose();
//                     handleEditClick(viewModal.category);
//                   }}
//                   className="px-3 py-1.5 text-xs font-medium text-[#73856B] hover:bg-[#73856B]/10 rounded-lg transition-colors flex items-center gap-1 border border-[#73856B]/20"
//                 >
//                   <Edit className="w-3.5 h-3.5" />
//                   Edit Category
//                 </button>
//                 <button onClick={handleViewClose} className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Subcategories Modal - HyperVolt colors */}
//       {viewSubcategoriesModal.show && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden border border-[#73856B]/20">
//             <div className="flex items-center justify-between px-6 py-4 border-b border-[#73856B]/20 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5">
//               <div>
//                 <h2 className="text-lg font-semibold text-[#004767]">
//                   Subcategories: {viewSubcategoriesModal.category?.name}
//                 </h2>
//                 <p className="text-sm text-[#64748B]">
//                   Total: {viewSubcategoriesModal.subcategories.length} subcategories
//                 </p>
//               </div>
//               <button 
//                 onClick={() => setViewSubcategoriesModal({ show: false, category: null, subcategories: [], isLoading: false, expandedChildren: {} })}
//                 className="p-1.5 hover:bg-[#73856B]/10 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
//               {viewSubcategoriesModal.isLoading ? (
//                 <div className="text-center py-12">
//                   <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#73856B]" />
//                   <p className="text-[#64748B] mt-2">Loading subcategories...</p>
//                 </div>
//               ) : viewSubcategoriesModal.subcategories.length === 0 ? (
//                 <div className="text-center py-12">
//                   <FolderTree className="w-12 h-12 mx-auto text-[#73856B]/30 mb-3" />
//                   <p className="text-[#64748B]">No subcategories found</p>
//                   <button
//                     onClick={() => {
//                       setViewSubcategoriesModal({ show: false, category: null, subcategories: [], isLoading: false, expandedChildren: {} });
//                       handleAddSubcategory(viewSubcategoriesModal.category);
//                     }}
//                     className="mt-3 px-4 py-2 bg-[#73856B] text-white text-sm rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:shadow-[#73856B]/20 font-semibold"
//                   >
//                     Add First Subcategory
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   {viewSubcategoriesModal.subcategories.map((sub, index) => {
//                     const childCount = sub.children?.length || 0;
                    
//                     return (
//                       <div key={sub._id} className="border border-[#73856B]/20 rounded-lg overflow-hidden">
//                         <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 hover:bg-[#73856B]/10 transition-colors">
//                           <div className="flex items-center gap-3 flex-1">
//                             {childCount > 0 ? (
//                               <button
//                                 onClick={() => toggleViewChildren(sub._id)}
//                                 className="p-0.5 hover:bg-[#73856B]/20 rounded transition-colors"
//                               >
//                                 {viewSubcategoriesModal.expandedChildren[sub._id] ? (
//                                   <ChevronDown className="w-4 h-4 text-[#73856B]" />
//                                 ) : (
//                                   <ChevronRight className="w-4 h-4 text-[#73856B]" />
//                                 )}
//                               </button>
//                             ) : (
//                               <div className="w-5" />
//                             )}
                            
//                             <div className="flex items-center gap-3 flex-1 flex-wrap">
//                               <span className="text-gray-400 text-sm font-mono w-6">#{index + 1}</span>
//                               <span className="text-gray-800 font-medium">{sub.name}</span>
                              
//                               <div className="flex items-center gap-2 flex-wrap">
//                                 {sub.productCount > 0 && (
//                                   <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs border border-green-200">
//                                     <Package className="w-3 h-3" />
//                                     {sub.productCount} {sub.productCount === 1 ? 'product' : 'products'}
//                                   </span>
//                                 )}
                                
//                                 {childCount > 0 && (
//                                   <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#73856B]/10 text-[#73856B] rounded-full text-xs border border-[#73856B]/20">
//                                     <FolderTree className="w-3 h-3" />
//                                     {childCount} Sub-subcategor{childCount === 1 ? 'y' : 'ies'}
//                                   </span>
//                                 )}
                                
//                                 {sub.productCount === 0 && childCount === 0 && (
//                                   <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs border border-gray-200">
//                                     No items
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
                          
//                           <div className="flex items-center gap-1">
//                             <button
//                               onClick={() => handleAddChildSubcategory(viewSubcategoriesModal.category, sub)}
//                               className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
//                               title="Add Child Subcategory"
//                             >
//                               <Plus className="w-3.5 h-3.5" />
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setViewSubcategoriesModal({ show: false, category: null, subcategories: [], isLoading: false, expandedChildren: {} });
//                                 handleEditSubcategory(viewSubcategoriesModal.category, sub);
//                               }}
//                               className="p-1.5 text-gray-600 hover:text-[#73856B] hover:bg-[#73856B]/10 rounded-lg"
//                               title="Edit Subcategory"
//                             >
//                               <Edit className="w-3.5 h-3.5" />
//                             </button>
//                             <div className="relative group">
//                               {canDelete && sub.productCount === 0 && childCount === 0 && (
//                                 <button
//                                   onClick={() => {
//                                     handleDeleteSubcategoryClick(
//                                       viewSubcategoriesModal.category._id,
//                                       sub._id,
//                                       sub.name,
//                                       sub.productCount || 0,
//                                       false,
//                                       null
//                                     );
//                                   }}
//                                   className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
//                                   title="Delete Subcategory"
//                                 >
//                                   <Trash2 className="w-3.5 h-3.5" />
//                                 </button>
//                               )}
//                               {(!canDelete || sub.productCount > 0 || childCount > 0) && (
//                                 <button
//                                   disabled
//                                   className={`p-1.5 rounded-lg ${
//                                     sub.productCount > 0 || childCount > 0
//                                       ? 'text-gray-300 cursor-not-allowed'
//                                       : 'text-gray-300 cursor-not-allowed'
//                                   }`}
//                                 >
//                                   <Trash2 className="w-3.5 h-3.5" />
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         {viewSubcategoriesModal.expandedChildren[sub._id] && (
//                           <div className="pl-8 pr-3 pb-3 pt-2 bg-[#73856B]/5 border-t border-[#73856B]/20">
//                             {!sub.children || sub.children.length === 0 ? (
//                               <div className="text-center py-4">
//                                 <p className="text-xs text-gray-400">No child subcategories</p>
//                                 <button
//                                   onClick={() => handleAddChildSubcategory(viewSubcategoriesModal.category, sub)}
//                                   className="mt-2 text-xs text-green-600 hover:text-green-700 flex items-center gap-1 mx-auto"
//                                 >
//                                   <Plus className="w-3 h-3" />
//                                   Add First Child Subcategory
//                                 </button>
//                               </div>
//                             ) : (
//                               <div className="space-y-1">
//                                 {sub.children.map((child, childIdx) => (
//                                   <div key={child._id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#73856B]/20 hover:shadow-sm transition-shadow">
//                                     <div className="flex items-center gap-3 flex-1">
//                                       <span className="text-gray-400 text-xs font-mono w-6">{childIdx + 1}</span>
//                                       <span className="text-sm font-medium text-gray-800">{child.name}</span>
                                      
//                                       {child.productCount > 0 && (
//                                         <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs border border-green-200">
//                                           <Package className="w-3 h-3" />
//                                           {child.productCount} {child.productCount === 1 ? 'product' : 'products'}
//                                         </span>
//                                       )}
                                      
//                                       {child.productCount === 0 && (
//                                         <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs border border-gray-200">
//                                           No products
//                                         </span>
//                                       )}
//                                     </div>
//                                     <div className="flex items-center gap-1">
//                                       <button
//                                         onClick={() => {
//                                           setViewSubcategoriesModal({ show: false, category: null, subcategories: [], isLoading: false, expandedChildren: {} });
//                                           handleEditChildSubcategory(viewSubcategoriesModal.category, sub, child);
//                                         }}
//                                         className="p-1 text-gray-400 hover:text-[#73856B] hover:bg-[#73856B]/10 rounded"
//                                         title="Edit Child Subcategory"
//                                       >
//                                         <Edit className="w-3.5 h-3.5" />
//                                       </button>
//                                       {canDelete && child.productCount === 0 && (
//                                         <button
//                                           onClick={() => {
//                                             handleDeleteSubcategoryClick(
//                                               viewSubcategoriesModal.category._id,
//                                               sub._id,
//                                               child.name,
//                                               child.productCount || 0,
//                                               true,
//                                               child._id
//                                             );
//                                           }}
//                                           className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
//                                           title="Delete Child Subcategory"
//                                         >
//                                           <Trash2 className="w-3.5 h-3.5" />
//                                         </button>
//                                       )}
//                                       {(!canDelete || child.productCount > 0) && (
//                                         <button
//                                           disabled
//                                           className={`p-1 rounded ${
//                                             child.productCount > 0 || !canDelete
//                                               ? 'text-gray-300 cursor-not-allowed'
//                                               : 'text-gray-300 cursor-not-allowed'
//                                           }`}
//                                         >
//                                           <Trash2 className="w-3.5 h-3.5" />
//                                         </button>
//                                       )}
//                                     </div>
//                                   </div>
//                                 ))}
//                                 <button
//                                   onClick={() => handleAddChildSubcategory(viewSubcategoriesModal.category, sub)}
//                                   className="w-full mt-2 text-xs text-green-600 hover:text-green-700 flex items-center justify-center gap-1 py-1 border border-dashed border-[#73856B]/20 rounded-lg hover:bg-green-50"
//                                 >
//                                   <Plus className="w-3 h-3" />
//                                   Add Child Subcategory
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             <div className="px-6 py-4 border-t border-[#73856B]/20 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 flex justify-end">
//               <button
//                 onClick={() => handleAddSubcategory(viewSubcategoriesModal.category)}
//                 className="px-4 py-2 bg-[#73856B] text-white text-sm font-semibold rounded-lg hover:bg-pink-800 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg hover:shadow-[#73856B]/20"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add Subcategory
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Subcategory Modal - HyperVolt colors */}
//       {subcategoryModal.show && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden border border-[#73856B]/20">
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-[#73856B]/10 rounded-lg">
//                     <Plus className="w-5 h-5 text-[#73856B]" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-[#004767]">
//                       Add Subcategories to {subcategoryModal.category?.name}
//                     </h3>
//                     <p className="text-sm text-[#64748B] mt-1">
//                       Add multiple subcategories at once
//                     </p>
//                   </div>
//                 </div>
//                 <button onClick={() => setSubcategoryModal(prev => ({ ...prev, show: false }))} className="p-1 hover:bg-[#73856B]/10 rounded-lg">
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>

//               <form onSubmit={handleAddSubcategorySubmit} className="space-y-4">
//                 <div className="space-y-3">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Subcategories <span className="text-red-500">*</span>
//                   </label>
                  
//                   {subcategoryModal.subcategories.map((sub, index) => (
//                     <div key={sub.id} className="flex items-center gap-2">
//                       <div className="flex-1 relative">
//                         <input
//                           type="text"
//                           value={sub.name}
//                           onChange={(e) => updateSubcategoryName(sub.id, e.target.value)}
//                           className="w-full px-3 py-2 text-sm border border-[#73856B]/20 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none bg-white hover:border-[#73856B]/40"
//                           placeholder={`e.g., Subcategory ${index + 1}`}
//                           autoFocus={index === subcategoryModal.subcategories.length - 1}
//                         />
//                         {index === 0 && (
//                           <p className="text-xs text-[#64748B] mt-1">
//                             Examples: Premium, Standard, Deluxe, etc.
//                           </p>
//                         )}
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeSubcategoryField(sub.id)}
//                         className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         title="Remove subcategory"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={addSubcategoryField}
//                   className="flex items-center gap-2 px-3 py-2 text-sm text-[#73856B] hover:bg-[#73856B]/10 rounded-lg transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add Another Subcategory
//                 </button>

//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#73856B]/20">
//                   <button
//                     type="button"
//                     onClick={() => setSubcategoryModal(prev => ({ ...prev, show: false }))}
//                     className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#73856B]/10 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={subcategoryModal.isSubmitting}
//                     className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#73856B] to-[#55634f] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-[#73856B]/20"
//                   >
//                     {subcategoryModal.isSubmitting ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         <span>Adding {subcategoryModal.subcategories.filter(s => s.name.trim()).length} Subcategor{subcategoryModal.subcategories.filter(s => s.name.trim()).length === 1 ? 'y' : 'ies'}...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-4 h-4" />
//                         <span>Add {subcategoryModal.subcategories.filter(s => s.name.trim()).length} Subcategor{subcategoryModal.subcategories.filter(s => s.name.trim()).length === 1 ? 'y' : 'ies'}</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Category Modal - HyperVolt colors */}
//       {editModal.show && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-[#73856B]/20">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-[#73856B]/10 rounded-lg">
//                     <Edit className="w-5 h-5 text-[#73856B]" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-[#004767]">Edit Category</h3>
//                 </div>
//                 <button onClick={handleEditClose} className="p-1 hover:bg-[#73856B]/10 rounded-lg transition-colors">
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>

//               <form onSubmit={handleEditSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Category Image
//                   </label>
                  
//                   {!editModal.imagePreview ? (
//                     <>
//                       <div 
//                         className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
//                           editModal.imageError ? 'border-red-300 bg-red-50' : 'border-[#73856B]/30 hover:border-[#73856B] hover:bg-[#73856B]/5'
//                         }`}
//                         onClick={() => {
//                           setEditModal(prev => ({ ...prev, imageError: '' }));
//                           editFileInputRef.current?.click();
//                         }}
//                       >
//                         <input 
//                           type="file" 
//                           ref={editFileInputRef}
//                           className="hidden" 
//                           accept="image/jpeg,image/jpg,image/png,image/webp" 
//                           onChange={handleEditImageChange} 
//                         />
//                         <Upload className={`w-8 h-8 mx-auto mb-2 ${editModal.imageError ? 'text-red-400' : 'text-[#73856B]'}`} />
//                         <p className={`text-xs ${editModal.imageError ? 'text-red-600' : 'text-gray-600'}`}>
//                           Click to upload new image
//                         </p>
//                         <p className="text-xs text-gray-400 mt-2">
//                           Allowed formats: JPG, JPEG, PNG, WebP (max 5MB)
//                         </p>
//                       </div>
//                       {editModal.imageError && (
//                         <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
//                           <AlertCircle className="w-3 h-3" />
//                           {editModal.imageError}
//                         </p>
//                       )}
//                     </>
//                   ) : (
//                     <div className="space-y-3">
//                       <div className="flex items-center gap-3">
//                         <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#73856B]/20">
//                           <img src={editModal.imagePreview} alt="Preview" className="w-full h-full object-cover" />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-gray-700">New image selected</p>
//                           <p className="text-xs text-gray-500">Click below to change or remove</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button 
//                           type="button" 
//                           onClick={handleEditRemoveImage}
//                           className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
//                         >
//                           <Trash2 className="w-3.5 h-3.5" />
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={editModal.formData?.name || ''}
//                     onChange={(e) => setEditModal(prev => ({
//                       ...prev,
//                       formData: { ...prev.formData, name: e.target.value }
//                     }))}
//                     className="w-full px-3 py-2 text-sm border border-[#73856B]/20 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none bg-white hover:border-[#73856B]/40"
//                     placeholder="e.g., Power Banks"
//                   />
//                 </div>

//                <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//     Description  {/* Remove the * */}
//   </label>
//   <textarea
//     value={editModal.formData?.description || ''}
//     onChange={(e) => setEditModal(prev => ({
//       ...prev,
//       formData: { ...prev.formData, description: e.target.value }
//     }))}
//     rows="3"
//     className="w-full px-3 py-2 text-sm border border-[#73856B]/20 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none bg-white hover:border-[#73856B]/40"
//     placeholder="Brief description (optional)"
//   />
// </div>

//                 <div className="flex justify-end gap-3 pt-4 border-t border-[#73856B]/20">
//                   <button
//                     type="button"
//                     onClick={handleEditClose}
//                     className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#73856B]/10 rounded-lg transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#73856B] to-[#004767] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-[#73856B]/20"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         <span>Saving...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-4 h-4" />
//                         <span>Save Changes</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Category Confirmation Modal - HyperVolt colors */}
//       {deleteModal.show && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
//             <div className="p-6">
//               <div className="flex items-center gap-3 text-red-600 mb-4">
//                 <AlertCircle className="w-6 h-6" />
//                 <h3 className="text-lg font-semibold">Delete Category</h3>
//               </div>
              
//               <p className="text-gray-600 mb-2">
//                 Are you sure you want to delete <span className="font-semibold text-[#73856B]">"{deleteModal.name}"</span>?
//               </p>
//               <p className="text-sm text-gray-500 mb-6">
//                 This action cannot be undone. The category and its image will be permanently removed.
//               </p>

//               <div className="flex items-center justify-end gap-3">
//                 <button
//                   onClick={() => setDeleteModal({ show: false, id: null, name: '', productCount: 0 })}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#73856B]/10 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteConfirm}
//                   className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-200/50"
//                 >
//                   Delete Category
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Subcategory/Child Confirmation Modal - HyperVolt colors */}
//       {deleteSubcategoryModal.show && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
//             <div className="p-6">
//               <div className="flex items-center gap-3 text-red-600 mb-4">
//                 <AlertCircle className="w-6 h-6" />
//                 <h3 className="text-lg font-semibold">
//                   Delete {deleteSubcategoryModal.isChild ? 'Child ' : ''}Subcategory
//                 </h3>
//               </div>
              
//               <p className="text-gray-600 mb-2">
//                 Are you sure you want to delete <span className="font-semibold text-[#73856B]">"{deleteSubcategoryModal.subcategoryName}"</span>?
//               </p>
//               <p className="text-sm text-gray-500 mb-6">
//                 This action cannot be undone. The {deleteSubcategoryModal.isChild ? 'child ' : ''}subcategory will be permanently removed.
//               </p>

//               <div className="flex items-center justify-end gap-3">
//                 <button
//                   onClick={() => setDeleteSubcategoryModal({
//                     show: false,
//                     categoryId: null,
//                     subcategoryId: null,
//                     subcategoryName: '',
//                     productCount: 0,
//                     isChild: false,
//                     childId: null
//                   })}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#73856B]/10 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteSubcategoryConfirm}
//                   className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-200/50"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </ProtectedRoute>
//   );
// }

// // Main export with Suspense wrapper
// export default function AdminCategories() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-gradient-to-br from-[#004767]/5 via-white to-[#73856B]/5 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-[#73856B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500 text-sm">Loading categories...</p>
//         </div>
//       </div>
//     }>
//       <AdminCategoriesContent />
//     </Suspense>
//   );
// }


'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Plus, 
  X, 
  Save, 
  ArrowLeft,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Loader2,
  Trash2,
  Edit,
  Eye,
  Search,
  XCircle,
  Calendar,
  User,
  FileText,
  Hash,
  Clock,
  RefreshCw,
  Upload,
  Package,
  Info,
  FolderTree,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Battery,
  Shield,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

function AdminCategoriesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [expandedSubcategories, setExpandedSubcategories] = useState(false);
  const [viewSubcategoriesList, setViewSubcategoriesList] = useState([]);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  
  const [expandedChildren, setExpandedChildren] = useState({});

  const [userRole, setUserRole] = useState('');

  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '', productCount: 0 });
  const [viewModal, setViewModal] = useState({ show: false, category: null });
  const [editModal, setEditModal] = useState({ show: false, category: null, formData: { name: '', description: '' }, imageFile: null, imagePreview: null, imageError: '' });

  const [subcategoryModal, setSubcategoryModal] = useState({ 
    show: false, 
    category: null,
    subcategories: [{ name: '', id: Date.now() }],
    isSubmitting: false
  });

  const [editSubcategoryModal, setEditSubcategoryModal] = useState({
    show: false,
    category: null,
    subcategory: null,
    name: '',
    isSubmitting: false
  });

  const [childSubcategoryModal, setChildSubcategoryModal] = useState({
    show: false,
    category: null,
    subcategory: null,
    children: [{ name: '', id: Date.now() }],
    isSubmitting: false
  });

  const [editChildSubcategoryModal, setEditChildSubcategoryModal] = useState({
    show: false,
    category: null,
    subcategory: null,
    child: null,
    name: '',
    isSubmitting: false
  });

  const [viewSubcategoriesModal, setViewSubcategoriesModal] = useState({
    show: false,
    category: null,
    subcategories: [],
    isLoading: false,
    expandedChildren: {}
  });

  const [deleteSubcategoryModal, setDeleteSubcategoryModal] = useState({
    show: false,
    categoryId: null,
    subcategoryId: null,
    subcategoryName: '',
    productCount: 0,
    isChild: false,
    childId: null
  });

  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const maxFileSize = 5 * 1024 * 1024;

  // Get user role on mount
  useEffect(() => {
    const getUserRole = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUserRole(payload.role || '');
        }
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    };
    getUserRole();
  }, []);

  // Check if user can delete (Super Admin and Admin only)
  const canDelete = userRole === 'super_admin' || userRole === 'admin';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      
      if (data.success) {
        const categoriesWithCounts = data.data.map(category => {
          let productCount = 0;
          
          if (category.products && Array.isArray(category.products)) {
            productCount = category.products.length;
          } else if (category.productCount) {
            productCount = category.productCount;
          }
          
          // Count direct subcategories only
          const subcategoryCount = category.subcategories?.length || 0;
          
          return {
            ...category,
            productCount,
            subcategoryCount
          };
        });
        
        setCategories(categoriesWithCounts);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        return data.data.subcategories;
      }
      return [];
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      return [];
    }
  };

  const fetchChildren = async (categoryId, subcategoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        return data.data.children;
      }
      return [];
    } catch (error) {
      console.error('Error fetching children:', error);
      return [];
    }
  };

  const fetchViewSubcategories = async (categoryId) => {
    setIsLoadingSubcategories(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setViewSubcategoriesList(data.data.subcategories);
      } else {
        setViewSubcategoriesList([]);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setViewSubcategoriesList([]);
    } finally {
      setIsLoadingSubcategories(false);
    }
  };

  const handleViewClick = (category) => {
    setViewModal({ show: true, category });
    setExpandedSubcategories(false);
    fetchViewSubcategories(category._id);
  };

  const handleViewClose = () => {
    setViewModal({ show: false, category: null });
    setExpandedSubcategories(false);
    setViewSubcategoriesList([]);
    setExpandedChildren({});
  };

  const handleEditClick = (category) => {
    setEditModal({ 
      show: true, 
      category,
      formData: {
        name: category.name,
        description: category.description || ''
      },
      imagePreview: category.image?.url || null,
      imageFile: null,
      imageError: ''
    });
  };

  const handleEditClose = () => {
    setEditModal({ show: false, category: null, formData: { name: '', description: '' }, imagePreview: null, imageFile: null, imageError: '' });
    setErrors({});
  };

  const handleViewSubcategories = async (category) => {
    setViewSubcategoriesModal({
      show: true,
      category,
      subcategories: [],
      isLoading: true,
      expandedChildren: {}
    });
    
    const subcategories = await fetchSubcategories(category._id);
    setViewSubcategoriesModal(prev => ({
      ...prev,
      subcategories,
      isLoading: false
    }));
  };

  const toggleViewChildren = async (subcategoryId) => {
    if (viewSubcategoriesModal.expandedChildren[subcategoryId]) {
      setViewSubcategoriesModal(prev => ({
        ...prev,
        expandedChildren: { ...prev.expandedChildren, [subcategoryId]: false }
      }));
    } else {
      const children = await fetchChildren(viewSubcategoriesModal.category._id, subcategoryId);
      setViewSubcategoriesModal(prev => ({
        ...prev,
        subcategories: prev.subcategories.map(sub => 
          sub._id === subcategoryId ? { ...sub, children: children } : sub
        ),
        expandedChildren: { ...prev.expandedChildren, [subcategoryId]: true }
      }));
    }
  };

  // FIXED: Add Subcategory Handlers
  const handleAddSubcategory = (category) => {
    setSubcategoryModal({
      show: true,
      category,
      subcategories: [{ name: '', id: Date.now() }],
      isSubmitting: false
    });
  };

  const addSubcategoryField = () => {
    setSubcategoryModal(prev => ({
      ...prev,
      subcategories: [...prev.subcategories, { name: '', id: Date.now() }]
    }));
  };

  const removeSubcategoryField = (id) => {
    if (subcategoryModal.subcategories.length === 1) {
      toast.error('At least one subcategory is required');
      return;
    }
    setSubcategoryModal(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter(sub => sub.id !== id)
    }));
  };

  const updateSubcategoryName = (id, value) => {
    setSubcategoryModal(prev => ({
      ...prev,
      subcategories: prev.subcategories.map(sub => 
        sub.id === id ? { ...sub, name: value } : sub
      )
    }));
  };

  const handleAddSubcategorySubmit = async (e) => {
    e.preventDefault();
    
    const validSubcategories = subcategoryModal.subcategories.filter(sub => sub.name.trim());
    
    if (validSubcategories.length === 0) {
      toast.error('At least one subcategory name is required');
      return;
    }

    const names = validSubcategories.map(sub => sub.name.trim().toLowerCase());
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    if (duplicates.length > 0) {
      toast.error(`Duplicate subcategory names: ${duplicates.join(', ')}`);
      return;
    }

    setSubcategoryModal(prev => ({ ...prev, isSubmitting: true }));

    try {
      const token = localStorage.getItem('token');
      let successCount = 0;
      let errorCount = 0;

      for (const subcategory of validSubcategories) {
        try {
          const response = await fetch(`http://localhost:5000/api/categories/${subcategoryModal.category._id}/subcategories`, {
            method: 'POST',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: subcategory.name.trim() })
          });

          const data = await response.json();

          if (data.success) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully added ${successCount} subcategor${successCount === 1 ? 'y' : 'ies'}!`);
        if (errorCount > 0) {
          toast.warning(`${errorCount} subcategor${errorCount === 1 ? 'y' : 'ies'} failed to add`);
        }
        
        setSubcategoryModal({
          show: false,
          category: null,
          subcategories: [{ name: '', id: Date.now() }],
          isSubmitting: false
        });
        fetchCategories();
        
        if (viewSubcategoriesModal.show && viewSubcategoriesModal.category?._id === subcategoryModal.category._id) {
          const updatedSubcategories = await fetchSubcategories(subcategoryModal.category._id);
          setViewSubcategoriesModal(prev => ({
            ...prev,
            subcategories: updatedSubcategories
          }));
        }
      } else {
        toast.error('Failed to add subcategories. Please try again.');
      }
    } catch (error) {
      console.error('Error adding subcategories:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSubcategoryModal(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleEditSubcategory = (category, subcategory) => {
    setEditSubcategoryModal({
      show: true,
      category,
      subcategory,
      name: subcategory.name,
      isSubmitting: false
    });
  };

  const handleEditSubcategorySubmit = async (e) => {
    e.preventDefault();
    
    if (!editSubcategoryModal.name.trim()) {
      toast.error('Subcategory name is required');
      return;
    }

    setEditSubcategoryModal(prev => ({ ...prev, isSubmitting: true }));

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(
        `http://localhost:5000/api/categories/${editSubcategoryModal.category._id}/subcategories/${editSubcategoryModal.subcategory._id}`,
        {
          method: 'PUT',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: editSubcategoryModal.name.trim() })
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('Subcategory updated successfully!');
        setEditSubcategoryModal({
          show: false,
          category: null,
          subcategory: null,
          name: '',
          isSubmitting: false
        });
        fetchCategories();
        
        if (viewSubcategoriesModal.show && viewSubcategoriesModal.category?._id === editSubcategoryModal.category._id) {
          const updatedSubcategories = await fetchSubcategories(editSubcategoryModal.category._id);
          setViewSubcategoriesModal(prev => ({
            ...prev,
            subcategories: updatedSubcategories
          }));
        }
      } else {
        toast.error(data.error || 'Failed to update subcategory');
      }
    } catch (error) {
      console.error('Error updating subcategory:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setEditSubcategoryModal(prev => ({ ...prev, isSubmitting: false }));
    }
  };
// FIXED: Child Subcategory Handlers - This opens the child modal
const handleAddChildSubcategory = (category, subcategory) => {
  console.log('🎯 Opening child subcategory modal for:', subcategory?.name);
  setChildSubcategoryModal({
    show: true,
    category: category,
    subcategory: subcategory,
    children: [{ name: '', id: Date.now() }],
    isSubmitting: false
  });
};

const addChildField = () => {
  setChildSubcategoryModal(prev => ({
    ...prev,
    children: [...prev.children, { name: '', id: Date.now() }]
  }));
};

const removeChildField = (id) => {
  if (childSubcategoryModal.children.length === 1) {
    toast.error('At least one child subcategory is required');
    return;
  }
  setChildSubcategoryModal(prev => ({
    ...prev,
    children: prev.children.filter(child => child.id !== id)
  }));
};

// FIXED: Added missing closing parenthesis
const updateChildName = (id, value) => {
  setChildSubcategoryModal(prev => ({
    ...prev,
    children: prev.children.map(child => 
      child.id === id ? { ...child, name: value } : child
    )
  }));
};

  const handleAddChildSubcategorySubmit = async (e) => {
    e.preventDefault();
    
    const validChildren = childSubcategoryModal.children.filter(child => child.name.trim());
    
    if (validChildren.length === 0) {
      toast.error('At least one child subcategory name is required');
      return;
    }

    const names = validChildren.map(child => child.name.trim().toLowerCase());
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    if (duplicates.length > 0) {
      toast.error(`Duplicate child subcategory names: ${duplicates.join(', ')}`);
      return;
    }

    setChildSubcategoryModal(prev => ({ ...prev, isSubmitting: true }));

    try {
      const token = localStorage.getItem('token');
      let successCount = 0;
      let errorCount = 0;

      for (const child of validChildren) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/categories/${childSubcategoryModal.category._id}/subcategories/${childSubcategoryModal.subcategory._id}/children`,
            {
              method: 'POST',
              headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name: child.name.trim() })
            }
          );

          const data = await response.json();

          if (data.success) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully added ${successCount} child subcategor${successCount === 1 ? 'y' : 'ies'}!`);
        if (errorCount > 0) {
          toast.warning(`${errorCount} child subcategor${errorCount === 1 ? 'y' : 'ies'} failed to add`);
        }
        
        setChildSubcategoryModal({
          show: false,
          category: null,
          subcategory: null,
          children: [{ name: '', id: Date.now() }],
          isSubmitting: false
        });
        fetchCategories();
        
        if (viewSubcategoriesModal.show) {
          const updatedSubcategories = await fetchSubcategories(childSubcategoryModal.category._id);
          setViewSubcategoriesModal(prev => ({
            ...prev,
            subcategories: updatedSubcategories
          }));
        }
      } else {
        toast.error('Failed to add child subcategories. Please try again.');
      }
    } catch (error) {
      console.error('Error adding child subcategories:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setChildSubcategoryModal(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleEditChildSubcategory = (category, subcategory, child) => {
    setEditChildSubcategoryModal({
      show: true,
      category,
      subcategory,
      child,
      name: child.name,
      isSubmitting: false
    });
  };

  const handleEditChildSubcategorySubmit = async (e) => {
    e.preventDefault();
    
    if (!editChildSubcategoryModal.name.trim()) {
      toast.error('Child subcategory name is required');
      return;
    }

    setEditChildSubcategoryModal(prev => ({ ...prev, isSubmitting: true }));

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(
        `http://localhost:5000/api/categories/${editChildSubcategoryModal.category._id}/subcategories/${editChildSubcategoryModal.subcategory._id}/children/${editChildSubcategoryModal.child._id}`,
        {
          method: 'PUT',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: editChildSubcategoryModal.name.trim() })
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('Child subcategory updated successfully!');
        setEditChildSubcategoryModal({
          show: false,
          category: null,
          subcategory: null,
          child: null,
          name: '',
          isSubmitting: false
        });
        fetchCategories();
        
        if (viewSubcategoriesModal.show) {
          const updatedSubcategories = await fetchSubcategories(editChildSubcategoryModal.category._id);
          setViewSubcategoriesModal(prev => ({
            ...prev,
            subcategories: updatedSubcategories
          }));
        }
      } else {
        toast.error(data.error || 'Failed to update child subcategory');
      }
    } catch (error) {
      console.error('Error updating child subcategory:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setEditChildSubcategoryModal(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleDeleteSubcategoryClick = (categoryId, subcategoryId, subcategoryName, productCount, isChild = false, childId = null) => {
    setDeleteSubcategoryModal({
      show: true,
      categoryId,
      subcategoryId,
      subcategoryName,
      productCount,
      isChild,
      childId
    });
  };

  const handleDeleteSubcategoryConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      let url;
      
      if (deleteSubcategoryModal.isChild) {
        url = `http://localhost:5000/api/categories/${deleteSubcategoryModal.categoryId}/subcategories/${deleteSubcategoryModal.subcategoryId}/children/${deleteSubcategoryModal.childId}`;
      } else {
        url = `http://localhost:5000/api/categories/${deleteSubcategoryModal.categoryId}/subcategories/${deleteSubcategoryModal.subcategoryId}`;
      }
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`${deleteSubcategoryModal.isChild ? 'Child subcategory' : 'Subcategory'} deleted successfully`);
        setDeleteSubcategoryModal({
          show: false,
          categoryId: null,
          subcategoryId: null,
          subcategoryName: '',
          productCount: 0,
          isChild: false,
          childId: null
        });
        fetchCategories();
        
        if (viewSubcategoriesModal.show) {
          const updatedSubcategories = await fetchSubcategories(deleteSubcategoryModal.categoryId);
          setViewSubcategoriesModal(prev => ({
            ...prev,
            subcategories: updatedSubcategories
          }));
        }
      } else {
        toast.error(data.error || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleDeleteClick = (id, name, productCount) => {
    setDeleteModal({ show: true, id, name, productCount });
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${deleteModal.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Category deleted successfully');
        fetchCategories();
      } else {
        toast.error(data.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setDeleteModal({ show: false, id: null, name: '', productCount: 0 });
    }
  };

  const validateImageFile = (file) => {
    if (!allowedFileTypes.includes(file.type)) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return {
        valid: false,
        message: `Invalid file format: .${fileExtension}. Please upload: ${allowedExtensions.join(', ')}`
      };
    }

    if (file.size > maxFileSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return {
        valid: false,
        message: `File size too large: ${fileSizeMB}MB. Maximum allowed size is 5MB`
      };
    }

    return { valid: true };
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setEditModal(prev => ({
        ...prev,
        imageError: validation.message
      }));
      if (editFileInputRef.current) {
        editFileInputRef.current.value = '';
      }
      return;
    }

    setEditModal(prev => ({
      ...prev,
      imageError: '',
      imageFile: file
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditModal(prev => ({
        ...prev,
        imagePreview: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditRemoveImage = () => {
    setEditModal(prev => ({
      ...prev,
      imageFile: null,
      imagePreview: null,
      imageError: ''
    }));
    if (editFileInputRef.current) {
      editFileInputRef.current.value = '';
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!editModal.formData.name.trim()) {
      setErrors({ name: 'Category name is required' });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('name', editModal.formData.name);
      formDataToSend.append('description', editModal.formData.description);
      
      if (editModal.imageFile) {
        formDataToSend.append('image', editModal.imageFile);
      }

      const response = await fetch(`http://localhost:5000/api/categories/${editModal.category._id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Category updated successfully!');
        fetchCategories();
        handleEditClose();
      } else {
        toast.error(data.error || 'Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name cannot exceed 100 characters';
    }
  
    
    if (!imageFile && !imagePreview) {
      newErrors.image = 'Category image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setImageError(validation.message);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setImageError('');
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    
    if (errors.image) setErrors({ ...errors, image: null });
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', imageFile);

      const response = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Category created successfully!');
        setFormData({ name: '', description: '' });
        setImagePreview(null);
        setImageFile(null);
        setImageError('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        fetchCategories();
      } else {
        toast.error(data.error || 'Failed to create category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const truncateDescription = (text, wordLimit = 10) => {
    if (!text) return '—';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <ProtectedRoute pageKey="create_category">
    <div className="min-h-screen bg-gradient-to-br from-[#004767]/5 via-white to-[#73856B]/5">
      {/* Header - HyperVolt Theme */}
      <div className="bg-white border-b border-[#73856B]/20 sticky top-0 z-10 shadow-lg">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <a href="/authorize/dashboard" className="p-1.5 sm:p-2 hover:bg-[#73856B]/20 rounded-lg transition-colors flex-shrink-0">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black/80 hover:text-black" />
              </a>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black flex items-center gap-2">
                    <Battery className="w-5 h-5 sm:w-6 sm:h-6 text-[#73856B]" />
                    Category Management
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-black/70 mt-0.5 sm:mt-1 truncate">
                  Manage categories, subcategories for power products
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
              <div className="text-xs sm:text-sm text-black/70 bg-[#73856B]/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#73856B]/20">
                Total: <span className="font-semibold text-[#73856B]">{categories.length}</span> categories
              </div>
              <button onClick={fetchCategories} className="p-1.5 sm:p-2 text-[#73856B] hover:bg-[#73856B]/20 rounded-lg transition-colors hover:text-blue-800" title="Refresh">
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Create Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#73856B]/20 sticky top-24">
              <div className="p-5 border-b border-[#73856B]/20 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5">
                <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#73856B]" />
                  Add New Category
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image <span className="text-red-500">*</span>
                  </label>
                  
                  {!imagePreview ? (
                    <>
                      <div 
                        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
                          imageError ? 'border-red-300 bg-red-50' : errors.image ? 'border-red-300 bg-red-50' : 'border-[#73856B]/30 hover:border-[#73856B] hover:bg-[#73856B]/5'
                        }`}
                        onClick={() => {
                          setImageError('');
                          fileInputRef.current?.click();
                        }}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          className="hidden" 
                          accept="image/jpeg,image/jpg,image/png,image/webp" 
                          onChange={handleImageChange} 
                        />
                        <Upload className={`w-8 h-8 mx-auto mb-2 ${imageError || errors.image ? 'text-red-400' : 'text-[#73856B]'}`} />
                        <p className={`text-xs ${imageError || errors.image ? 'text-red-600' : 'text-gray-600'}`}>
                          Click to upload
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Allowed formats: JPG, JPEG, PNG, WebP (max 5MB)
                        </p>
                      </div>
                      {imageError && (
                        <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {imageError}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="relative rounded-lg overflow-hidden border border-[#73856B]/20">
                        <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover" />
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={removeImage} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                  {errors.image && !imagePreview && !imageError && (
                    <p className="text-xs text-red-600 mt-1">{errors.image}</p>
                  )}
                </div>

                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition ${
                      errors.name ? 'border-red-500' : 'border-[#73856B]/30'
                    } bg-white hover:border-[#73856B]/50`}
                    placeholder="e.g., Power Banks"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 text-sm border border-[#73856B]/30 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition bg-white hover:border-[#73856B]/50"
                    placeholder="Brief description about this category (Optional)"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#73856B] hover:bg-[#55634f]/90 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-md hover:shadow-lg hover:shadow-[#73856B]/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Create Category</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Categories Table */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#73856B]/20 overflow-hidden">
              <div className="p-5 border-b border-[#73856B]/20 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#004767] flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#73856B]" />
                    All Categories ({filteredCategories.length})
                  </h2>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-[#73856B]/20 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none transition placeholder:text-gray-400 bg-white hover:border-[#73856B]/40"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Image</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Name</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">Description</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <FolderTree className="w-3.5 h-3.5 text-[#73856B]" />
                          SubCategories
                        </div>
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-[#64748B] uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <Package className="w-3.5 h-3.5 text-[#73856B]" />
                          Products
                        </div>
                      </th>
                      <th className="px-5 py-3 text-right text-xs font-medium text-[#64748B] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#73856B]/10">
                    {isLoading ? (
                      <tr>
                        <td colSpan="6" className="px-5 py-8 text-center">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#73856B]" />
                        </td>
                      </tr>
                    ) : filteredCategories.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-5 py-8 text-center text-[#64748B]">
                          {searchTerm ? 'No categories found matching your search' : 'No categories created yet'}
                        </td>
                      </tr>
                    ) : (
                      filteredCategories.map((category) => (
                        <tr key={category._id} className="hover:bg-[#73856B]/5 transition-colors">
                          <td className="px-5 py-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#73856B]/20">
                              <img 
                                src={category.image?.url || '/placeholder-image.jpg'} 
                                alt={category.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/48?text=No+Image';
                                }}
                              />
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                            <div className="text-xs text-[#64748B] mt-0.5">ID: {category._id.slice(-6)}</div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="text-sm text-gray-600 max-w-xs">
                              {truncateDescription(category.description, 8)}
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <button
                              onClick={() => handleViewSubcategories(category)}
                              className="flex items-center gap-1.5 px-2 py-1 bg-[#73856B]/10 text-[#73856B] rounded-lg hover:bg-[#73856B]/20 transition-colors text-xs font-medium border border-[#73856B]/20"
                            >
                              <FolderTree className="w-3.5 h-3.5" />
                              {category.subcategoryCount || 0} Total
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </td>
                          <td className="px-5 py-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              category.productCount > 0 
                                ? 'bg-green-100 text-green-700 border border-green-200' 
                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}>
                              {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleViewClick(category)} className="p-1.5 text-gray-600 hover:text-[#73856B] hover:bg-[#73856B]/10 rounded-lg transition-colors" title="View Details">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleAddSubcategory(category)} className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Add Subcategory">
                                <Plus className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleEditClick(category)} className="p-1.5 text-gray-600 hover:text-[#73856B] hover:bg-[#73856B]/10 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              
                              <div className="relative group">
                                <button
                                  onClick={() => {
                                    if (category.productCount === 0 && canDelete) {
                                      handleDeleteClick(category._id, category.name, category.productCount);
                                    }
                                  }}
                                  disabled={category.productCount > 0 || !canDelete}
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    category.productCount > 0 || !canDelete
                                      ? 'text-gray-300 cursor-not-allowed'
                                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                                  }`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                {category.productCount > 0 && (
                                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-[#004767] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 w-48 text-center shadow-lg">
                                    <div className="flex items-start gap-1.5">
                                      <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#73856B]" />
                                      <span className="leading-tight break-words text-left">
                                        Cannot delete - This category has {category.productCount} product{category.productCount !== 1 ? 's' : ''}
                                      </span>
                                    </div>
                                    <div className="absolute top-full right-2 -mt-1 border-4 border-transparent border-t-[#004767]"></div>
                                  </div>
                                )}
                                {!canDelete && !category.productCount && (
                                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                    Delete disabled for this role
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-[#73856B]/20 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5">
                <p className="text-xs text-[#64748B]">
                  Showing {filteredCategories.length} of {categories.length} categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Category Modal */}
      {viewModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto border border-[#73856B]/20">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#73856B]/20 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#73856B]/20">
                  <img 
                    src={viewModal.category?.image?.url || '/placeholder-image.jpg'} 
                    alt={viewModal.category?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#004767]">{viewModal.category?.name}</h2>
                  <p className="text-xs text-[#64748B]">Category Details</p>
                </div>
              </div>
              <button onClick={handleViewClose} className="p-1.5 hover:bg-[#73856B]/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* View content */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Hash className="w-3.5 h-3.5 text-[#73856B]" />
                    <span className="text-xs font-medium text-[#64748B]">Category ID</span>
                  </div>
                  <p className="text-xs font-mono text-gray-900 break-all">{viewModal.category?._id}</p>
                </div>

                <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <FolderTree className="w-3.5 h-3.5 text-[#73856B]" />
                    <span className="text-xs font-medium text-[#64748B]">Subcategories</span>
                  </div>
                  <button
                    onClick={() => setExpandedSubcategories(!expandedSubcategories)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-[#73856B]/10 hover:bg-[#73856B]/20 rounded-lg transition-colors group border border-[#73856B]/20"
                  >
                    <div className="flex items-center gap-2">
                      <FolderTree className="w-4 h-4 text-[#73856B]" />
                      <span className="text-sm font-medium text-[#004767]">
                        {viewSubcategoriesList.length} subcategor{viewSubcategoriesList.length === 1 ? 'y' : 'ies'}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-[#73856B] transition-transform duration-200 ${expandedSubcategories ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {expandedSubcategories && (
                    <div className="mt-3 pt-3 border-t border-[#73856B]/20">
                      {isLoadingSubcategories ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="w-4 h-4 animate-spin text-[#73856B]" />
                          <span className="text-xs text-[#64748B] ml-2">Loading...</span>
                        </div>
                      ) : viewSubcategoriesList.length === 0 ? (
                        <p className="text-xs text-[#64748B] text-center py-4">No subcategories found</p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {viewSubcategoriesList.map((sub, idx) => (
                            <div key={sub._id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#73856B]/20 hover:shadow-sm transition-shadow">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="text-xs text-gray-400 font-mono flex-shrink-0 w-5">#{idx + 1}</span>
                                <span className="text-sm font-medium text-gray-800 truncate">{sub.name}</span>
                                {sub.productCount > 0 && (
                                  <span className="text-xs text-gray-500 flex-shrink-0">
                                    ({sub.productCount})
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                <button
                                  onClick={() => {
                                    handleViewClose();
                                    handleEditSubcategory(viewModal.category, sub);
                                  }}
                                  className="p-1 text-gray-400 hover:text-[#73856B] hover:bg-[#73856B]/10 rounded transition-colors"
                                  title="Edit Subcategory"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                {canDelete && sub.productCount === 0 && (
                                  <button
                                    onClick={() => {
                                      handleViewClose();
                                      handleDeleteSubcategoryClick(viewModal.category._id, sub._id, sub.name, sub.productCount, false, null);
                                    }}
                                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Delete Subcategory"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-3.5 h-3.5 text-[#73856B]" />
                    <span className="text-xs font-medium text-[#64748B]">Total Products</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      viewModal.category?.productCount > 0 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      {viewModal.category?.productCount || 0} {viewModal.category?.productCount === 1 ? 'product' : 'products'}
                    </span>
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#73856B]" />
                    <span className="text-xs font-medium text-[#64748B]">Created</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">
                    {viewModal.category?.createdAt && formatDate(viewModal.category.createdAt)}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-3.5 h-3.5 text-[#73856B]" />
                    <span className="text-xs font-medium text-[#64748B]">Created By</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">
                    {viewModal.category?.createdBy?.contactPerson || 'Unknown'}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#73856B]" />
                    <span className="text-xs font-medium text-[#64748B]">Updated</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">
                    {viewModal.category?.updatedAt && formatDate(viewModal.category.updatedAt)}
                  </p>
                </div>

                <div className="col-span-2 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 rounded-lg p-3 border border-[#73856B]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-3.5 h-3.5 text-[#73856B]" />
                    <span className="text-xs font-medium text-[#64748B]">Description</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {viewModal.category?.description || 'No description provided for this category.'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-[#73856B]/20">
                <button
                  onClick={() => {
                    handleViewClose();
                    handleAddSubcategory(viewModal.category);
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-1 border border-green-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Subcategory
                </button>
                <button
                  onClick={() => {
                    handleViewClose();
                    handleEditClick(viewModal.category);
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-[#73856B] hover:bg-[#73856B]/10 rounded-lg transition-colors flex items-center gap-1 border border-[#73856B]/20"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit Category
                </button>
                <button onClick={handleViewClose} className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Subcategories Modal */}
      {viewSubcategoriesModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden border border-[#73856B]/20">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#73856B]/20 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5">
              <div>
                <h2 className="text-lg font-semibold text-[#004767]">
                  Subcategories: {viewSubcategoriesModal.category?.name}
                </h2>
                <p className="text-sm text-[#64748B]">
                  Total: {viewSubcategoriesModal.subcategories.length} subcategories
                </p>
              </div>
              <button 
                onClick={() => setViewSubcategoriesModal({ show: false, category: null, subcategories: [], isLoading: false, expandedChildren: {} })}
                className="p-1.5 hover:bg-[#73856B]/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {viewSubcategoriesModal.isLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#73856B]" />
                  <p className="text-[#64748B] mt-2">Loading subcategories...</p>
                </div>
              ) : viewSubcategoriesModal.subcategories.length === 0 ? (
                <div className="text-center py-12">
                  <FolderTree className="w-12 h-12 mx-auto text-[#73856B]/30 mb-3" />
                  <p className="text-[#64748B]">No subcategories found</p>
                  <button
                    onClick={() => {
                      setViewSubcategoriesModal({ show: false, category: null, subcategories: [], isLoading: false, expandedChildren: {} });
                      handleAddSubcategory(viewSubcategoriesModal.category);
                    }}
                    className="mt-3 px-4 py-2 bg-[#73856B] text-white text-sm rounded-lg hover:bg-[#55634f] transition-all shadow-md hover:shadow-lg hover:shadow-[#73856B]/20 font-semibold"
                  >
                    Add First Subcategory
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {viewSubcategoriesModal.subcategories.map((sub, index) => {
                    const childCount = sub.children?.length || 0;
                    
                    return (
                      <div key={sub._id} className="border border-[#73856B]/20 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 hover:bg-[#73856B]/10 transition-colors">
                          <div className="flex items-center gap-3 flex-1">
                            {childCount > 0 ? (
                              <button
                                onClick={() => toggleViewChildren(sub._id)}
                                className="p-0.5 hover:bg-[#73856B]/20 rounded transition-colors"
                              >
                                {viewSubcategoriesModal.expandedChildren[sub._id] ? (
                                  <ChevronDown className="w-4 h-4 text-[#73856B]" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-[#73856B]" />
                                )}
                              </button>
                            ) : (
                              <div className="w-5" />
                            )}
                            
                            <div className="flex items-center gap-3 flex-1 flex-wrap">
                              <span className="text-gray-400 text-sm font-mono w-6">#{index + 1}</span>
                              <span className="text-gray-800 font-medium">{sub.name}</span>
                              
                              <div className="flex items-center gap-2 flex-wrap">
                                {sub.productCount > 0 && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs border border-green-200">
                                    <Package className="w-3 h-3" />
                                    {sub.productCount} {sub.productCount === 1 ? 'product' : 'products'}
                                  </span>
                                )}
                                
                                {childCount > 0 && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#73856B]/10 text-[#73856B] rounded-full text-xs border border-[#73856B]/20">
                                    <FolderTree className="w-3 h-3" />
                                    {childCount} Sub-subcategor{childCount === 1 ? 'y' : 'ies'}
                                  </span>
                                )}
                                
                                {sub.productCount === 0 && childCount === 0 && (
                                  <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs border border-gray-200">
                                    No items
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleAddChildSubcategory(viewSubcategoriesModal.category, sub)}
                              className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
                              title="Add Child Subcategory"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setViewSubcategoriesModal({ show: false, category: null, subcategories: [], isLoading: false, expandedChildren: {} });
                                handleEditSubcategory(viewSubcategoriesModal.category, sub);
                              }}
                              className="p-1.5 text-gray-600 hover:text-[#73856B] hover:bg-[#73856B]/10 rounded-lg"
                              title="Edit Subcategory"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <div className="relative group">
                              {canDelete && sub.productCount === 0 && childCount === 0 && (
                                <button
                                  onClick={() => {
                                    handleDeleteSubcategoryClick(
                                      viewSubcategoriesModal.category._id,
                                      sub._id,
                                      sub.name,
                                      sub.productCount || 0,
                                      false,
                                      null
                                    );
                                  }}
                                  className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                  title="Delete Subcategory"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {(!canDelete || sub.productCount > 0 || childCount > 0) && (
                                <button
                                  disabled
                                  className={`p-1.5 rounded-lg ${
                                    sub.productCount > 0 || childCount > 0
                                      ? 'text-gray-300 cursor-not-allowed'
                                      : 'text-gray-300 cursor-not-allowed'
                                  }`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {viewSubcategoriesModal.expandedChildren[sub._id] && (
                          <div className="pl-8 pr-3 pb-3 pt-2 bg-[#73856B]/5 border-t border-[#73856B]/20">
                            {!sub.children || sub.children.length === 0 ? (
                              <div className="text-center py-4">
                                <p className="text-xs text-gray-400">No child subcategories</p>
                                <button
                                  onClick={() => handleAddChildSubcategory(viewSubcategoriesModal.category, sub)}
                                  className="mt-2 text-xs text-green-600 hover:text-green-700 flex items-center gap-1 mx-auto"
                                >
                                  <Plus className="w-3 h-3" />
                                  Add First Child Subcategory
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                {sub.children.map((child, childIdx) => (
                                  <div key={child._id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#73856B]/20 hover:shadow-sm transition-shadow">
                                    <div className="flex items-center gap-3 flex-1">
                                      <span className="text-gray-400 text-xs font-mono w-6">{childIdx + 1}</span>
                                      <span className="text-sm font-medium text-gray-800">{child.name}</span>
                                      
                                      {child.productCount > 0 && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs border border-green-200">
                                          <Package className="w-3 h-3" />
                                          {child.productCount} {child.productCount === 1 ? 'product' : 'products'}
                                        </span>
                                      )}
                                      
                                      {child.productCount === 0 && (
                                        <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs border border-gray-200">
                                          No products
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => {
                                          setViewSubcategoriesModal({ show: false, category: null, subcategories: [], isLoading: false, expandedChildren: {} });
                                          handleEditChildSubcategory(viewSubcategoriesModal.category, sub, child);
                                        }}
                                        className="p-1 text-gray-400 hover:text-[#73856B] hover:bg-[#73856B]/10 rounded"
                                        title="Edit Child Subcategory"
                                      >
                                        <Edit className="w-3.5 h-3.5" />
                                      </button>
                                      {canDelete && child.productCount === 0 && (
                                        <button
                                          onClick={() => {
                                            handleDeleteSubcategoryClick(
                                              viewSubcategoriesModal.category._id,
                                              sub._id,
                                              child.name,
                                              child.productCount || 0,
                                              true,
                                              child._id
                                            );
                                          }}
                                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                          title="Delete Child Subcategory"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                      {(!canDelete || child.productCount > 0) && (
                                        <button
                                          disabled
                                          className={`p-1 rounded ${
                                            child.productCount > 0 || !canDelete
                                              ? 'text-gray-300 cursor-not-allowed'
                                              : 'text-gray-300 cursor-not-allowed'
                                          }`}
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                <button
                                  onClick={() => handleAddChildSubcategory(viewSubcategoriesModal.category, sub)}
                                  className="w-full mt-2 text-xs text-green-600 hover:text-green-700 flex items-center justify-center gap-1 py-1 border border-dashed border-[#73856B]/20 rounded-lg hover:bg-green-50"
                                >
                                  <Plus className="w-3 h-3" />
                                  Add Child Subcategory
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-[#73856B]/20 bg-gradient-to-r from-[#73856B]/5 to-[#004767]/5 flex justify-end">
              <button
                onClick={() => handleAddSubcategory(viewSubcategoriesModal.category)}
                className="px-4 py-2 bg-[#73856B] text-white text-sm font-semibold rounded-lg hover:bg-[#485742] transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg hover:shadow-[#73856B]/20"
              >
                <Plus className="w-4 h-4" />
                Add Subcategory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subcategory Modal */}
      {subcategoryModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden border border-[#73856B]/20">
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#73856B]/10 rounded-lg">
                    <Plus className="w-5 h-5 text-[#73856B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#004767]">
                      Add Subcategories to {subcategoryModal.category?.name}
                    </h3>
                    <p className="text-sm text-[#64748B] mt-1">
                      Add multiple subcategories at once
                    </p>
                  </div>
                </div>
                <button onClick={() => setSubcategoryModal(prev => ({ ...prev, show: false }))} className="p-1 hover:bg-[#73856B]/10 rounded-lg">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleAddSubcategorySubmit} className="space-y-4">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Subcategories <span className="text-red-500">*</span>
                  </label>
                  
                  {subcategoryModal.subcategories.map((sub, index) => (
                    <div key={sub.id} className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={sub.name}
                          onChange={(e) => updateSubcategoryName(sub.id, e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-[#73856B]/20 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none bg-white hover:border-[#73856B]/40"
                          placeholder={`e.g., Subcategory ${index + 1}`}
                          autoFocus={index === subcategoryModal.subcategories.length - 1}
                        />
                        {index === 0 && (
                          <p className="text-xs text-[#64748B] mt-1">
                            Examples: Premium, Standard, Deluxe, etc.
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSubcategoryField(sub.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove subcategory"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addSubcategoryField}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[#73856B] hover:bg-[#73856B]/10 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Subcategory
                </button>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#73856B]/20">
                  <button
                    type="button"
                    onClick={() => setSubcategoryModal(prev => ({ ...prev, show: false }))}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#73856B]/10 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={subcategoryModal.isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#73856B] to-[#55634f] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-[#73856B]/20"
                  >
                    {subcategoryModal.isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Adding {subcategoryModal.subcategories.filter(s => s.name.trim()).length} Subcategor{subcategoryModal.subcategories.filter(s => s.name.trim()).length === 1 ? 'y' : 'ies'}...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Add {subcategoryModal.subcategories.filter(s => s.name.trim()).length} Subcategor{subcategoryModal.subcategories.filter(s => s.name.trim()).length === 1 ? 'y' : 'ies'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Child Subcategory Modal - FIXED: This is the modal that was not showing */}
      {childSubcategoryModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden border border-[#73856B]/20">
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Plus className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#004767]">
                      Add Child Subcategories to {childSubcategoryModal.subcategory?.name}
                    </h3>
                    <p className="text-sm text-[#64748B] mt-1">
                      Add sub-subcategories under {childSubcategoryModal.subcategory?.name}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setChildSubcategoryModal(prev => ({ ...prev, show: false }))}
                  className="p-1 hover:bg-[#73856B]/10 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleAddChildSubcategorySubmit} className="space-y-4">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Child Subcategories <span className="text-red-500">*</span>
                  </label>
                  
                  {childSubcategoryModal.children.map((child, index) => (
                    <div key={child.id} className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={child.name}
                          onChange={(e) => updateChildName(child.id, e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-[#73856B]/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white hover:border-[#73856B]/40"
                          placeholder={`e.g., Child Subcategory ${index + 1}`}
                          autoFocus={index === childSubcategoryModal.children.length - 1}
                        />
                        {index === 0 && (
                          <p className="text-xs text-[#64748B] mt-1">
                            Examples: Premium, Standard, Deluxe, etc.
                          </p>
                        )}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => removeChildField(child.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove child subcategory"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addChildField}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Child Subcategory
                </button>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#73856B]/20">
                  <button
                    type="button"
                    onClick={() => setChildSubcategoryModal(prev => ({ ...prev, show: false }))}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#73856B]/10 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={childSubcategoryModal.isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-green-600/20"
                  >
                    {childSubcategoryModal.isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Adding {childSubcategoryModal.children.filter(c => c.name.trim()).length} Child Subcategor{childSubcategoryModal.children.filter(c => c.name.trim()).length === 1 ? 'y' : 'ies'}...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Add Child Subcategor{childSubcategoryModal.children.filter(c => c.name.trim()).length === 1 ? 'y' : 'ies'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-[#73856B]/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#73856B]/10 rounded-lg">
                    <Edit className="w-5 h-5 text-[#73856B]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#004767]">Edit Category</h3>
                </div>
                <button onClick={handleEditClose} className="p-1 hover:bg-[#73856B]/10 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Image
                  </label>
                  
                  {!editModal.imagePreview ? (
                    <>
                      <div 
                        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                          editModal.imageError ? 'border-red-300 bg-red-50' : 'border-[#73856B]/30 hover:border-[#73856B] hover:bg-[#73856B]/5'
                        }`}
                        onClick={() => {
                          setEditModal(prev => ({ ...prev, imageError: '' }));
                          editFileInputRef.current?.click();
                        }}
                      >
                        <input 
                          type="file" 
                          ref={editFileInputRef}
                          className="hidden" 
                          accept="image/jpeg,image/jpg,image/png,image/webp" 
                          onChange={handleEditImageChange} 
                        />
                        <Upload className={`w-8 h-8 mx-auto mb-2 ${editModal.imageError ? 'text-red-400' : 'text-[#73856B]'}`} />
                        <p className={`text-xs ${editModal.imageError ? 'text-red-600' : 'text-gray-600'}`}>
                          Click to upload new image
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Allowed formats: JPG, JPEG, PNG, WebP (max 5MB)
                        </p>
                      </div>
                      {editModal.imageError && (
                        <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {editModal.imageError}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#73856B]/20">
                          <img src={editModal.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">New image selected</p>
                          <p className="text-xs text-gray-500">Click below to change or remove</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          type="button" 
                          onClick={handleEditRemoveImage}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editModal.formData?.name || ''}
                    onChange={(e) => setEditModal(prev => ({
                      ...prev,
                      formData: { ...prev.formData, name: e.target.value }
                    }))}
                    className="w-full px-3 py-2 text-sm border border-[#73856B]/20 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none bg-white hover:border-[#73856B]/40"
                    placeholder="e.g., Power Banks"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editModal.formData?.description || ''}
                    onChange={(e) => setEditModal(prev => ({
                      ...prev,
                      formData: { ...prev.formData, description: e.target.value }
                    }))}
                    rows="3"
                    className="w-full px-3 py-2 text-sm border border-[#73856B]/20 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none bg-white hover:border-[#73856B]/40"
                    placeholder="Brief description (optional)"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#73856B]/20">
                  <button
                    type="button"
                    onClick={handleEditClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#73856B]/10 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#73856B] to-[#004767] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-[#73856B]/20"
                  >
                    {isSubmitting ? (
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
        </div>
      )}

      {/* Edit Subcategory Modal */}
      {editSubcategoryModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-[#73856B]/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Edit className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#004767]">Edit Subcategory</h3>
                </div>
                <button 
                  onClick={() => setEditSubcategoryModal(prev => ({ ...prev, show: false }))}
                  className="p-1 hover:bg-[#73856B]/10 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleEditSubcategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategory Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editSubcategoryModal.name}
                    onChange={(e) => setEditSubcategoryModal(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-[#73856B]/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white hover:border-[#73856B]/40"
                    placeholder="e.g., Casual Shirts"
                    autoFocus
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#73856B]/20">
                  <button
                    type="button"
                    onClick={() => setEditSubcategoryModal(prev => ({ ...prev, show: false }))}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#73856B]/10 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editSubcategoryModal.isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-700 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-blue-600/20"
                  >
                    {editSubcategoryModal.isSubmitting ? (
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
        </div>
      )}

      {/* Edit Child Subcategory Modal */}
      {editChildSubcategoryModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-[#73856B]/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Edit className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#004767]">Edit Child Subcategory</h3>
                </div>
                <button 
                  onClick={() => setEditChildSubcategoryModal(prev => ({ ...prev, show: false }))}
                  className="p-1 hover:bg-[#73856B]/10 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleEditChildSubcategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Child Subcategory Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editChildSubcategoryModal.name}
                    onChange={(e) => setEditChildSubcategoryModal(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-[#73856B]/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white hover:border-[#73856B]/40"
                    placeholder="e.g., Premium Quality"
                    autoFocus
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#73856B]/20">
                  <button
                    type="button"
                    onClick={() => setEditChildSubcategoryModal(prev => ({ ...prev, show: false }))}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#73856B]/10 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editChildSubcategoryModal.isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-indigo-600/20"
                  >
                    {editChildSubcategoryModal.isSubmitting ? (
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
        </div>
      )}

      {/* Delete Category Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
            <div className="p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Delete Category</h3>
              </div>
              
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete <span className="font-semibold text-[#73856B]">"{deleteModal.name}"</span>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The category and its image will be permanently removed.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteModal({ show: false, id: null, name: '', productCount: 0 })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#73856B]/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-200/50"
                >
                  Delete Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Subcategory/Child Confirmation Modal */}
      {deleteSubcategoryModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-red-100">
            <div className="p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">
                  Delete {deleteSubcategoryModal.isChild ? 'Child ' : ''}Subcategory
                </h3>
              </div>
              
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete <span className="font-semibold text-[#73856B]">"{deleteSubcategoryModal.subcategoryName}"</span>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The {deleteSubcategoryModal.isChild ? 'child ' : ''}subcategory will be permanently removed.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteSubcategoryModal({
                    show: false,
                    categoryId: null,
                    subcategoryId: null,
                    subcategoryName: '',
                    productCount: 0,
                    isChild: false,
                    childId: null
                  })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#73856B]/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSubcategoryConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-200/50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}

// Main export with Suspense wrapper
export default function AdminCategories() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#004767]/5 via-white to-[#73856B]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#73856B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading categories...</p>
        </div>
      </div>
    }>
      <AdminCategoriesContent />
    </Suspense>
  );
}