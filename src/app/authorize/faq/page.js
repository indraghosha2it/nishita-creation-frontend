// // app/authorize/faq/page.jsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { toast } from 'sonner';
// import { 
//   Plus, Edit, Trash2, Search, X, Save, 
//   ChevronDown, ChevronUp, RefreshCw, Eye, EyeOff,
//   MessageCircle, AlertCircle, Filter
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// export default function FAQManagementPage() {
//   const [faqs, setFaqs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [showOnlyActive, setShowOnlyActive] = useState(false);
//   const [categories, setCategories] = useState([]);
  
//   // Modal states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingFAQ, setEditingFAQ] = useState(null);
//   const [formData, setFormData] = useState({
//     question: '',
//     answer: '',
//     category: 'general',
//     keywords: '',
//     priority: 0,
//     isActive: true
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Fetch FAQs
//   const fetchFAQs = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const params = new URLSearchParams();
//       if (searchTerm) params.append('search', searchTerm);
//       if (selectedCategory !== 'all') params.append('category', selectedCategory);
//       if (showOnlyActive) params.append('isActive', 'true');
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chat/admin/faqs?${params.toString()}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setFaqs(data.data);
//       } else {
//         toast.error(data.error || 'Failed to load FAQs');
//       }
//     } catch (error) {
//       console.error('Error fetching FAQs:', error);
//       toast.error('Failed to load FAQs');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chat/admin/faqs/categories`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setCategories(['all', ...data.data]);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };
  
//   useEffect(() => {
//     fetchFAQs();
//     fetchCategories();
//   }, [searchTerm, selectedCategory, showOnlyActive]);
  
//   // Handle form submit (create/update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const payload = {
//         ...formData,
//         keywords: formData.keywords ? formData.keywords.split(',').map(k => k.trim()) : []
//       };
      
//       const url = editingFAQ 
//         ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chat/admin/faqs/${editingFAQ._id}`
//         : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chat/admin/faqs`;
      
//       const method = editingFAQ ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(payload)
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success(editingFAQ ? 'FAQ updated!' : 'FAQ created!');
//         setIsModalOpen(false);
//         setEditingFAQ(null);
//         resetForm();
//         fetchFAQs();
//       } else {
//         toast.error(data.error || 'Operation failed');
//       }
//     } catch (error) {
//       console.error('Error saving FAQ:', error);
//       toast.error('Failed to save FAQ');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   // Handle delete
//   const handleDelete = async (faqId) => {
//     if (!confirm('Are you sure you want to delete this FAQ?')) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chat/admin/faqs/${faqId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('FAQ deleted!');
//         fetchFAQs();
//       } else {
//         toast.error(data.error || 'Failed to delete');
//       }
//     } catch (error) {
//       console.error('Error deleting FAQ:', error);
//       toast.error('Failed to delete FAQ');
//     }
//   };
  
//   // Open edit modal
//   const handleEdit = (faq) => {
//     setEditingFAQ(faq);
//     setFormData({
//       question: faq.question,
//       answer: faq.answer,
//       category: faq.category || 'general',
//       keywords: faq.keywords ? faq.keywords.join(', ') : '',
//       priority: faq.priority || 0,
//       isActive: faq.isActive !== undefined ? faq.isActive : true
//     });
//     setIsModalOpen(true);
//   };
  
//   // Open create modal
//   const handleCreate = () => {
//     setEditingFAQ(null);
//     resetForm();
//     setIsModalOpen(true);
//   };
  
//   const resetForm = () => {
//     setFormData({
//       question: '',
//       answer: '',
//       category: 'general',
//       keywords: '',
//       priority: 0,
//       isActive: true
//     });
//   };
  
//   // Toggle active status
//   const toggleActive = async (faq) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chat/admin/faqs/${faq._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           ...faq,
//           isActive: !faq.isActive
//         })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         toast.success(`FAQ ${data.data.isActive ? 'activated' : 'deactivated'}`);
//         fetchFAQs();
//       } else {
//         toast.error(data.error || 'Failed to update');
//       }
//     } catch (error) {
//       console.error('Error toggling FAQ:', error);
//       toast.error('Failed to update');
//     }
//   };
  
//   const categoryColors = {
//     general: 'bg-blue-100 text-blue-700',
//     products: 'bg-purple-100 text-purple-700',
//     policies: 'bg-red-100 text-red-700',
//     orders: 'bg-orange-100 text-orange-700',
//     shipping: 'bg-green-100 text-green-700',
//     payment: 'bg-indigo-100 text-indigo-700',
//     brands: 'bg-pink-100 text-pink-700',
//     other: 'bg-gray-100 text-gray-700'
//   };

//   return (
//     <ProtectedRoute pageKey="manage_faq">
//       <div className="min-h-screen bg-[#FFF5F6]">
//         {/* Header */}
//         <div className="bg-white border-b border-[#EE4275]/20 shadow-sm sticky top-0 z-10">
//           <div className="px-4 sm:px-6 py-3 sm:py-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div className="flex items-center gap-2 sm:gap-4">
//                 <div className="min-w-0 flex-1">
//                   <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
//                     <div className="flex items-center gap-2">
//                       <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#EE4275]" />
//                       <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D1B2E] truncate">
//                         Chat FAQ Manager
//                       </h1>
//                     </div>
//                     <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#EE4275]/10 text-[#EE4275] text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
//                       Chat Assistant
//                     </span>
//                   </div>
//                   <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">
//                     Manage frequently asked questions for your chat assistant
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={fetchFAQs}
//                   className="p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors hover:text-gray-700"
//                   title="Refresh"
//                 >
//                   <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </button>
//                 <button
//                   onClick={handleCreate}
//                   className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg transition-all text-sm"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add FAQ
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-4 sm:p-6">
//           {/* Filters */}
//           <div className="flex flex-wrap gap-3 mb-4">
//             <div className="flex-1 min-w-[180px] relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search FAQs..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-9 pr-4 py-2 text-sm border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
//               />
//             </div>
            
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="px-4 py-2 text-sm border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
//             >
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>
//                   {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
//                 </option>
//               ))}
//             </select>
            
//             <button
//               onClick={() => setShowOnlyActive(!showOnlyActive)}
//               className={`flex items-center gap-2 px-4 py-2 text-sm rounded-xl border transition-all ${
//                 showOnlyActive 
//                   ? 'bg-[#EE4275]/10 border-[#EE4275] text-[#EE4275]' 
//                   : 'border-[#F7C7D3]/50 text-gray-500 hover:border-[#EE4275]/30'
//               }`}
//             >
//               {showOnlyActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
//               Active Only
//             </button>
            
//             {(searchTerm || selectedCategory !== 'all' || showOnlyActive) && (
//               <button
//                 onClick={() => {
//                   setSearchTerm('');
//                   setSelectedCategory('all');
//                   setShowOnlyActive(false);
//                 }}
//                 className="px-4 py-2 text-sm text-gray-500 hover:text-[#EE4275] transition-colors"
//               >
//                 Clear Filters
//               </button>
//             )}
//           </div>

//           {/* FAQ List */}
//           <div className="bg-white rounded-2xl border border-[#EE4275]/20 overflow-hidden shadow-sm">
//             {loading ? (
//               <div className="p-8 text-center">
//                 <RefreshCw className="w-8 h-8 animate-spin text-[#EE4275] mx-auto" />
//                 <p className="text-gray-500 mt-2">Loading FAQs...</p>
//               </div>
//             ) : faqs.length === 0 ? (
//               <div className="p-12 text-center">
//                 <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500">No FAQs found</p>
//                 <button
//                   onClick={handleCreate}
//                   className="mt-4 px-4 py-2 bg-[#EE4275] text-white rounded-xl hover:bg-[#ca4f74] transition-colors"
//                 >
//                   Create your first FAQ
//                 </button>
//               </div>
//             ) : (
//               <div className="divide-y divide-[#F7C7D3]/30">
//                 {faqs.map((faq) => (
//                   <div key={faq._id} className="p-4 hover:bg-[#FFF5F6]/50 transition-colors">
//                     <div className="flex items-start justify-between gap-4">
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap mb-1">
//                           <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[faq.category] || categoryColors.other}`}>
//                             {faq.category || 'general'}
//                           </span>
//                           <span className={`text-xs px-2 py-0.5 rounded-full ${
//                             faq.isActive 
//                               ? 'bg-green-100 text-green-700' 
//                               : 'bg-gray-100 text-gray-500'
//                           }`}>
//                             {faq.isActive ? 'Active' : 'Inactive'}
//                           </span>
//                           {faq.priority > 5 && (
//                             <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
//                               Priority {faq.priority}
//                             </span>
//                           )}
//                           <span className="text-xs text-gray-400">
//                             Used {faq.timesUsed || 0} times
//                           </span>
//                         </div>
//                         <h3 className="font-medium text-gray-900">{faq.question}</h3>
//                         <p className="text-sm text-gray-600 line-clamp-2 mt-1">{faq.answer}</p>
//                         {faq.keywords && faq.keywords.length > 0 && (
//                           <div className="flex flex-wrap gap-1 mt-2">
//                             {faq.keywords.slice(0, 5).map((keyword, idx) => (
//                               <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
//                                 {keyword}
//                               </span>
//                             ))}
//                             {faq.keywords.length > 5 && (
//                               <span className="text-xs px-2 py-0.5 text-gray-400">
//                                 +{faq.keywords.length - 5} more
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>
                      
//                       <div className="flex items-center gap-1 flex-shrink-0">
//                         <button
//                           onClick={() => toggleActive(faq)}
//                           className="p-2 text-gray-400 hover:text-[#EE4275] transition-colors rounded-lg hover:bg-[#EE4275]/10"
//                           title={faq.isActive ? 'Deactivate' : 'Activate'}
//                         >
//                           {faq.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
//                         </button>
//                         <button
//                           onClick={() => handleEdit(faq)}
//                           className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50"
//                           title="Edit"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(faq._id)}
//                           className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             {/* Footer stats */}
//             {!loading && faqs.length > 0 && (
//               <div className="px-4 py-3 bg-[#FFF5F6] border-t border-[#F7C7D3]/30 text-sm text-gray-500">
//                 Showing {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Create/Edit Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//           <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-[#2D1B2E]">
//                 {editingFAQ ? 'Edit FAQ' : 'Create New FAQ'}
//               </h2>
//               <button
//                 onClick={() => {
//                   if (!isSubmitting) {
//                     setIsModalOpen(false);
//                     setEditingFAQ(null);
//                     resetForm();
//                   }
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Question <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.question}
//                   onChange={(e) => setFormData({...formData, question: e.target.value})}
//                   required
//                   className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
//                   placeholder="e.g. What is your return policy?"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Answer <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   value={formData.answer}
//                   onChange={(e) => setFormData({...formData, answer: e.target.value})}
//                   required
//                   rows={4}
//                   className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all resize-none"
//                   placeholder="Write your answer here..."
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Category
//                   </label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) => setFormData({...formData, category: e.target.value})}
//                     className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
//                   >
//                     <option value="general">General</option>
//                     <option value="products">Products</option>
//                     <option value="policies">Policies</option>
//                     <option value="orders">Orders</option>
//                     <option value="shipping">Shipping</option>
//                     <option value="payment">Payment</option>
//                     <option value="brands">Brands</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Priority (0-10)
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.priority}
//                     onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value) || 0})}
//                     min="0"
//                     max="10"
//                     className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Keywords (comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.keywords}
//                   onChange={(e) => setFormData({...formData, keywords: e.target.value})}
//                   placeholder="return, refund, exchange, money back"
//                   className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
//                 />
//                 <p className="text-xs text-gray-400 mt-1">
//                   Keywords help match user questions to this FAQ automatically
//                 </p>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.isActive}
//                   onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
//                   className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#EE4275] focus:ring-[#EE4275]"
//                 />
//                 <label className="text-sm text-gray-700">
//                   Active (visible to customers)
//                 </label>
//               </div>
              
//               <div className="flex justify-end gap-3 pt-4 border-t border-[#F7C7D3]/30">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     setEditingFAQ(null);
//                     resetForm();
//                   }}
//                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <RefreshCw className="w-4 h-4 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="w-4 h-4" />
//                       {editingFAQ ? 'Update FAQ' : 'Create FAQ'}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </ProtectedRoute>
//   );
// }


// frontend/app/authorize/faq/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Plus, Edit, Trash2, Search, X, Save, 
  RefreshCw, Eye, EyeOff, AlertCircle, MessageCircle
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function FAQManagementPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [categories, setCategories] = useState([]);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general',
    keywords: '',
    priority: 0,
    isActive: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Fetch FAQs
  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (showOnlyActive) params.append('isActive', 'true');
      
      // ✅ UPDATED: Use FAQ admin endpoint
      const response = await fetch(`${API_BASE}/api/chat/faq/admin/faqs?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setFaqs(data.data);
      } else {
        toast.error(data.error || 'Failed to load FAQs');
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      // ✅ UPDATED: Use FAQ categories endpoint
      const response = await fetch(`${API_BASE}/api/chat/faq/admin/faqs/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(['all', ...data.data]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  useEffect(() => {
    fetchFAQs();
    fetchCategories();
  }, [searchTerm, selectedCategory, showOnlyActive]);
  
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        keywords: formData.keywords ? formData.keywords.split(',').map(k => k.trim()) : []
      };
      
      // ✅ UPDATED: Use FAQ admin endpoint
      const url = editingFAQ 
        ? `${API_BASE}/api/chat/faq/admin/faqs/${editingFAQ._id}`
        : `${API_BASE}/api/chat/faq/admin/faqs`;
      
      const method = editingFAQ ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(editingFAQ ? 'FAQ updated!' : 'FAQ created!');
        setIsModalOpen(false);
        setEditingFAQ(null);
        resetForm();
        fetchFAQs();
      } else {
        toast.error(data.error || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast.error('Failed to save FAQ');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle delete
  const handleDelete = async (faqId) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    
    try {
      const token = localStorage.getItem('token');
      // ✅ UPDATED: Use FAQ admin endpoint
      const response = await fetch(`${API_BASE}/api/chat/faq/admin/faqs/${faqId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('FAQ deleted!');
        fetchFAQs();
      } else {
        toast.error(data.error || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error('Failed to delete FAQ');
    }
  };
  
  // Open edit modal
  const handleEdit = (faq) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'general',
      keywords: faq.keywords ? faq.keywords.join(', ') : '',
      priority: faq.priority || 0,
      isActive: faq.isActive !== undefined ? faq.isActive : true
    });
    setIsModalOpen(true);
  };
  
  // Open create modal
  const handleCreate = () => {
    setEditingFAQ(null);
    resetForm();
    setIsModalOpen(true);
  };
  
  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'general',
      keywords: '',
      priority: 0,
      isActive: true
    });
  };
  
  // Toggle active status
  const toggleActive = async (faq) => {
    try {
      const token = localStorage.getItem('token');
      // ✅ UPDATED: Use FAQ admin endpoint
      const response = await fetch(`${API_BASE}/api/chat/faq/admin/faqs/${faq._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...faq,
          isActive: !faq.isActive
        })
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success(`FAQ ${data.data.isActive ? 'activated' : 'deactivated'}`);
        fetchFAQs();
      } else {
        toast.error(data.error || 'Failed to update');
      }
    } catch (error) {
      console.error('Error toggling FAQ:', error);
      toast.error('Failed to update');
    }
  };
  
  const categoryColors = {
    general: 'bg-blue-100 text-blue-700',
    products: 'bg-purple-100 text-purple-700',
    policies: 'bg-red-100 text-red-700',
    orders: 'bg-orange-100 text-orange-700',
    shipping: 'bg-green-100 text-green-700',
    payment: 'bg-indigo-100 text-indigo-700',
    brands: 'bg-pink-100 text-pink-700',
    other: 'bg-gray-100 text-gray-700'
  };

  return (
    <ProtectedRoute pageKey="manage_faq">
      <div className="min-h-screen bg-[#FFF5F6]">
        {/* Header */}
        <div className="bg-white border-b border-[#EE4275]/20 shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#EE4275]" />
                      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D1B2E] truncate">
                        Chat FAQ Manager
                      </h1>
                    </div>
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#EE4275]/10 text-[#EE4275] text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
                      Chat Assistant
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">
                    Manage frequently asked questions for your chat assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchFAQs}
                  className="p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors hover:text-gray-700"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleCreate}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg hover:shadow-lg transition-all text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add FAQ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-1 min-w-[180px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 text-sm border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setShowOnlyActive(!showOnlyActive)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-xl border transition-all ${
                showOnlyActive 
                  ? 'bg-[#EE4275]/10 border-[#EE4275] text-[#EE4275]' 
                  : 'border-[#F7C7D3]/50 text-gray-500 hover:border-[#EE4275]/30'
              }`}
            >
              {showOnlyActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              Active Only
            </button>
            
            {(searchTerm || selectedCategory !== 'all' || showOnlyActive) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setShowOnlyActive(false);
                }}
                className="px-4 py-2 text-sm text-gray-500 hover:text-[#EE4275] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* FAQ List */}
          <div className="bg-white rounded-2xl border border-[#EE4275]/20 overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-8 text-center">
                <RefreshCw className="w-8 h-8 animate-spin text-[#EE4275] mx-auto" />
                <p className="text-gray-500 mt-2">Loading FAQs...</p>
              </div>
            ) : faqs.length === 0 ? (
              <div className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No FAQs found</p>
                <button
                  onClick={handleCreate}
                  className="mt-4 px-4 py-2 bg-[#EE4275] text-white rounded-xl hover:bg-[#ca4f74] transition-colors"
                >
                  Create your first FAQ
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#F7C7D3]/30">
                {faqs.map((faq) => (
                  <div key={faq._id} className="p-4 hover:bg-[#FFF5F6]/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[faq.category] || categoryColors.other}`}>
                            {faq.category || 'general'}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            faq.isActive 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {faq.isActive ? 'Active' : 'Inactive'}
                          </span>
                          {faq.priority > 5 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                              Priority {faq.priority}
                            </span>
                          )}
                          <span className="text-xs text-gray-400">
                            Used {faq.timesUsed || 0} times
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-900">{faq.question}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{faq.answer}</p>
                        {faq.keywords && faq.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {faq.keywords.slice(0, 5).map((keyword, idx) => (
                              <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                {keyword}
                              </span>
                            ))}
                            {faq.keywords.length > 5 && (
                              <span className="text-xs px-2 py-0.5 text-gray-400">
                                +{faq.keywords.length - 5} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => toggleActive(faq)}
                          className="p-2 text-gray-400 hover:text-[#EE4275] transition-colors rounded-lg hover:bg-[#EE4275]/10"
                          title={faq.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {faq.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleEdit(faq)}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq._id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!loading && faqs.length > 0 && (
              <div className="px-4 py-3 bg-[#FFF5F6] border-t border-[#F7C7D3]/30 text-sm text-gray-500">
                Showing {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#2D1B2E]">
                {editingFAQ ? 'Edit FAQ' : 'Create New FAQ'}
              </h2>
              <button
                onClick={() => {
                  if (!isSubmitting) {
                    setIsModalOpen(false);
                    setEditingFAQ(null);
                    resetForm();
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
                  placeholder="e.g. What is your return policy?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Answer <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all resize-none"
                  placeholder="Write your answer here..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
                  >
                    <option value="general">General</option>
                    <option value="products">Products</option>
                    <option value="policies">Policies</option>
                    <option value="orders">Orders</option>
                    <option value="shipping">Shipping</option>
                    <option value="payment">Payment</option>
                    <option value="brands">Brands</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority (0-10)
                  </label>
                  <input
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value) || 0})}
                    min="0"
                    max="10"
                    className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                  placeholder="return, refund, exchange, money back"
                  className="w-full px-3 py-2 border border-[#F7C7D3]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white hover:border-[#EE4275]/30 transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Keywords help match user questions to this FAQ automatically
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4 rounded border-[#F7C7D3]/50 text-[#EE4275] focus:ring-[#EE4275]"
                />
                <label className="text-sm text-gray-700">
                  Active (visible to customers)
                </label>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-[#F7C7D3]/30">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingFAQ(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {editingFAQ ? 'Update FAQ' : 'Create FAQ'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}