

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, blog: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // ADD THIS
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userRole, setUserRole] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Categories for filter
  const categories = [
   { value: 'all', label: 'All Articles', icon: '📚', color: '#4A8A90' },
  { value: 'parenting-kids', label: 'Parenting & Kids', icon: '👨‍👩‍👧', color: '#FF6B6B' },
  { value: 'toys-games', label: 'Toys & Games', icon: '🎮', color: '#9B59B6' },
  { value: 'education-learning', label: 'Education & Learning', icon: '📚', color: '#3498DB' },
  { value: 'gift-guides', label: 'Gift Guides', icon: '🎁', color: '#E67E22' },
  { value: 'kids-activities', label: 'Kids Activities', icon: '🎨', color: '#1ABC9C' },
  { value: 'child-development', label: 'Child Development', icon: '🌱', color: '#27AE60' },
  { value: 'trends-news', label: 'Trends & News', icon: '📈', color: '#F39C12' },
  { value: 'health-safety', label: 'Health & Safety', icon: '🛡️', color: '#E74C3C' },
  { value: 'lifestyle-family', label: 'Lifestyle & Family', icon: '🏠', color: '#16A085' },
  { value: 'sustainability-eco-friendly', label: 'Sustainability & Eco-Friendly', icon: '🌿', color: '#2ECC71' }
  ];

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active', icon: '✅' },
    { value: 'inactive', label: 'Inactive', icon: '❌' }
  ];

  // Check user role - Allow both admin and moderator
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserRole(user.role);
        // Allow both admin and moderator
        if (user.role !== 'admin' && user.role !== 'moderator') {
          toast.error('Access denied. Admin or moderator privileges required.');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error parsing user:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Build query params
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit
      });
      
      if (categoryFilter !== 'all') {
        params.append('category', categoryFilter);
      }
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      // USE DEBOUNCED SEARCH TERM
      if (debouncedSearchTerm) {
        params.append('search', debouncedSearchTerm);
      }

      const response = await fetch(`http://localhost:5000/api/blogs/admin/all?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);
        setPagination(prev => ({
          ...prev,
          total: data.total,
          pages: data.pages
        }));
      } else {
        toast.error(data.error || 'Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and on filter change - USE DEBOUNCED SEARCH TERM
  useEffect(() => {
    fetchBlogs();
  }, [pagination.page, categoryFilter, statusFilter, debouncedSearchTerm]);

  // Debounce search - ADD THIS
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPagination(prev => ({ ...prev, page: 1 }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle delete
  const handleDelete = async () => {
    if (!deleteModal.blog) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/blogs/admin/${deleteModal.blog._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Blog post deleted successfully');
        setDeleteModal({ show: false, blog: null });
        fetchBlogs();
      } else {
        toast.error(data.error || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Network error. Please try again.');
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (blog) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/blogs/admin/${blog._id}/toggle`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Blog ${data.data.isActive ? 'activated' : 'deactivated'} successfully`);
        fetchBlogs();
      } else {
        toast.error(data.error || 'Failed to toggle blog status');
      }
    } catch (error) {
      console.error('Error toggling blog status:', error);
      toast.error('Network error. Please try again.');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get category details
  const getCategoryDetails = (categoryValue) => {
    return categories.find(c => c.value === categoryValue) || { label: categoryValue, icon: '📄' };
  };

  // Get status badge
  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
        <CheckCircle className="w-3 h-3" />
        Active
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
        <XCircle className="w-3 h-3" />
        Inactive
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    userRole === 'admin' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {userRole === 'admin' ? 'Admin' : 'Moderator'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Manage all blog posts across the platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={userRole === 'admin' ? '/admin/create-blog' : '/moderator/create-blog'}
                className="flex items-center gap-2 px-4 py-2 bg-[#71543E] text-white rounded-lg hover:bg-[#89674d] transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Create New Blog
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex-1 relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs by title, author, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#71543E] focus:border-transparent outline-none transition"
              />
            </div>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <div className="w-full md:w-48 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#71543E] focus:border-transparent outline-none transition appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-40 relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#71543E] focus:border-transparent outline-none transition bg-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blogs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#71543E]" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
              <p className="text-sm text-gray-500 mb-6">Get started by creating your first blog post</p>
              <Link
                href={userRole === 'admin' ? '/admin/create-blog' : '/moderator/create-blog'}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#71543E] text-white rounded-lg hover:bg-[#89674d] transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Create New Blog
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {blogs.map((blog) => {
                      const category = getCategoryDetails(blog.category);
                      return (
                        <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                {blog.featuredImage ? (
                                  <img 
                                    src={blog.featuredImage} 
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-900 line-clamp-1 max-w-[250px]">
                                  {blog.title}
                                </h3>
                                <p className="text-xs text-gray-500 line-clamp-1 max-w-[250px]">
                                  {blog.excerpt}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{blog.author}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">
                              {category.icon} {category.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(blog.isActive)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{formatDate(blog.publishDate)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/blog/blogDetailsPage?id=${blog._id}`}
                                className="p-2 text-gray-400 hover:text-[#71543E] hover:bg-orange-50 rounded-lg transition-colors"
                                title="View"
                                target="_blank"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <Link
                                href={`/admin/editBlog?id=${blog._id}`}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleToggleStatus(blog)}
                                className={`p-2 rounded-lg transition-colors ${
                                  blog.isActive
                                    ? 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                                    : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                                }`}
                                title={blog.isActive ? 'Deactivate' : 'Activate'}
                              >
                                {blog.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                              </button>
                              {userRole === 'admin' && (
                                <button
                                  onClick={() => setDeleteModal({ show: true, blog })}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      disabled={pagination.page === 1}
                      className="p-2 text-gray-400 hover:text-[#71543E] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      disabled={pagination.page === pagination.pages}
                      className="p-2 text-gray-400 hover:text-[#71543E] hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && deleteModal.blog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Blog Post</h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to delete "{deleteModal.blog.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal({ show: false, blog: null })}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}