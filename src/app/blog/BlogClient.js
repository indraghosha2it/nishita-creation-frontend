



'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import { 
  Calendar, 
  User, 
  ChevronRight, 
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  X,
  Eye,
  Sparkles,
  Gift,
  Heart,
  Star,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ToyMart Kids Theme Colors
const COLORS = {
  primary: '#4A8A90',      // Teal
  secondary: '#FFB6C1',    // Soft Pink
  accent: '#FFD93D',       // Yellow
  neutral: '#FFFFFF',
  lightGray: '#FFF9F0',    // Warm Cream
  border: '#E5E7EB',
  text: '#2D3A5C',         // Dark Blue
  textLight: '#6B7280',
  dark: '#1A1512',
  gold: '#FFD93D'
};

// Blog Categories for ToyMart
const BLOG_CATEGORIES = [
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
  { value: 'sustainability-eco-friendly', label: 'Sustainability', icon: '🌿', color: '#2ECC71' }
];

// Floating elements for background
const floatingElements = [
  { icon: '🎈', left: '3%', top: '15%', delay: 0, duration: 8 },
  { icon: '🧸', left: '95%', top: '25%', delay: 1, duration: 10 },
  { icon: '🎪', left: '5%', top: '80%', delay: 2, duration: 9 },
  { icon: '🎨', left: '93%', top: '75%', delay: 0.5, duration: 11 },
  { icon: '🚀', left: '10%', top: '50%', delay: 1.5, duration: 7 },
  { icon: '⭐', left: '88%', top: '45%', delay: 2.5, duration: 12 },
  { icon: '🎮', left: '15%', top: '85%', delay: 3, duration: 8 },
  { icon: '🎵', left: '85%', top: '85%', delay: 0.8, duration: 9 },
];

export default function BlogClient() {
  const [blogs, setBlogs] = useState([]);
  const [latestFeaturedPost, setLatestFeaturedPost] = useState(null);
  const [moreFeaturedPosts, setMoreFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [savedPosts, setSavedPosts] = useState([]);
  
  const blogsPerPage = 6;

  // Fetch featured posts
  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs?limit=4&sort=-publishDate');
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setLatestFeaturedPost(data.data[0]);
          setMoreFeaturedPosts(data.data.slice(1, 4));
        }
      } catch (error) {
        console.error('Error fetching featured posts:', error);
      }
    };
    fetchFeaturedPosts();
  }, []);

  // Fetch blogs with pagination and category
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: blogsPerPage,
          ...(selectedCategory !== 'all' && { category: selectedCategory }),
          ...(searchTerm && { search: searchTerm })
        });

        const response = await fetch(`http://localhost:5000/api/blogs?${params}`);
        const data = await response.json();

        if (data.success) {
          setBlogs(data.data);
          setTotalPages(data.pagination.pages);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => fetchBlogs(), 300);
    return () => clearTimeout(timer);
  }, [currentPage, selectedCategory, searchTerm]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryDetails = (categoryValue) => {
    return BLOG_CATEGORIES.find(c => c.value === categoryValue) || BLOG_CATEGORIES[0];
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      y: -8,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  return (
    <>
      <Navbar />
      
<main className="min-h-screen relative overflow-hidden -mt-16" style={{ background: 'linear-gradient(135deg, #FFF9F0 0%, #D4EDEE 100%)' }}>        
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-xl md:text-2xl opacity-30"
              style={{ left: item.left, top: item.top }}
              animate={{ 
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          
          {/* ========== FUN HEADER ========== */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#FFD93D]" />
              <span className="text-sm font-semibold text-[#4A8A90] uppercase tracking-wider">Toy Stories</span>
              <Sparkles className="w-5 h-5 text-[#FFD93D]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive", color: COLORS.text }}>
              Welcome to Toy Blog! 🎈
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] mx-auto rounded-full mb-3"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover fun articles, parenting tips, and the latest toy trends for your little ones!
            </p>
          </motion.div>

          {/* ========== SECTION 1: FEATURED POSTS (2-COLUMN LAYOUT) ========== */}
          {latestFeaturedPost && moreFeaturedPosts.length > 0 && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {/* LEFT COLUMN - Latest Featured Post (2/3 width) */}
              <motion.div 
                className="lg:col-span-2 group cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
              >
                <Link href={`/blog/blogDetailsPage?id=${latestFeaturedPost._id}`}>
                  <div className="relative overflow-hidden rounded-2xl h-[450px] md:h-[500px] shadow-xl">
                    {latestFeaturedPost.featuredImage ? (
                      <motion.img
                        src={latestFeaturedPost.featuredImage}
                        alt={latestFeaturedPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#4A8A90] to-[#FFB6C1] flex items-center justify-center">
                        <Gift className="w-20 h-20 text-white/30" />
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                      {/* Featured Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#FFD93D] to-[#FFB347] rounded-full shadow-lg mb-4">
                        <Star className="w-3.5 h-3.5 text-[#2D3A5C] fill-[#2D3A5C]" />
                        <span className="text-xs font-bold text-[#2D3A5C]">FEATURED STORY</span>
                      </div>

                      {/* Category Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full mb-4">
                        <span className="text-sm">
                          {getCategoryDetails(latestFeaturedPost.category).icon}
                        </span>
                        <span className="text-xs text-white">
                          {getCategoryDetails(latestFeaturedPost.category).label}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                        {latestFeaturedPost.title}
                      </h2>
                      
                      <p className="text-sm mb-4 line-clamp-2 text-white/80">
                        {latestFeaturedPost.excerpt || latestFeaturedPost.content?.replace(/<[^>]*>/g, '').slice(0, 120) + '...'}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 mb-4">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          <span>{latestFeaturedPost.author}</span>
                        </div>
                      
                      </div>
                      
                      <motion.div 
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFD93D]"
                        whileHover={{ gap: 8 }}
                      >
                        Read the Adventure <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* RIGHT COLUMN - 3 More Featured Posts (List Cards) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-4 h-4 text-[#4A8A90]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#4A8A90]">
                    More Fun Reads
                  </span>
                </div>
                {moreFeaturedPosts.map((post, idx) => {
                  const category = getCategoryDetails(post.category);
                  return (
                    <motion.div
                      key={post._id}
                      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <Link href={`/blog/blogDetailsPage?id=${post._id}`}>
                        <div className="flex gap-4 p-4">
                          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-[#D4EDEE]">
                            {post.featuredImage ? (
                              <motion.img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#4A8A90]/20 to-[#FFB6C1]/20 flex items-center justify-center">
                                <Gift className="w-6 h-6 text-[#4A8A90]" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
                                {category.icon} {category.label}
                              </span>
                              {idx === 0 && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-[#FFD93D]/20 text-[#E67E22] flex items-center gap-0.5">
                                  🔥 Popular
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-[#4A8A90] transition-colors" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive", color: COLORS.text }}>
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span className="truncate max-w-[80px]">{post.author}</span>
                              </div>
                             
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ========== SECTION 2: CATEGORY TABS & SEARCH ========== */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#FFB6C1] fill-[#FFB6C1]" />
                <h2 className="text-xl font-bold" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive", color: COLORS.text }}>
                  Explore by Category
                </h2>
              </div>
              
              {/* Search Field */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="🔍 Search fun articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 bg-white border-2 border-[#FFB6C1]/30 rounded-full focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] outline-none transition-all text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Tabs - Scrollable */}
            <div className="flex flex-wrap gap-2 pb-3">
              {BLOG_CATEGORIES.map((category) => (
                <motion.button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.value
                      ? 'text-white shadow-md'
                      : 'bg-white border-2 border-[#FFB6C1]/30 text-[#2D3A5C] hover:border-[#4A8A90] hover:shadow-sm'
                  }`}
                  style={selectedCategory === category.value ? { backgroundColor: category.color } : {}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-1.5">{category.icon}</span>
                  {category.label}
                </motion.button>
              ))}
            </div>

            {/* Active Filters Info */}
            {(selectedCategory !== 'all' || searchTerm) && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <p className="text-sm text-gray-500">
                  Showing {blogs.length} article{blogs.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'all' && (
                    <span> in <span className="font-medium text-[#4A8A90]">{BLOG_CATEGORIES.find(c => c.value === selectedCategory)?.label}</span></span>
                  )}
                  {searchTerm && (
                    <span> matching <span className="font-medium">"{searchTerm}"</span></span>
                  )}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    clearSearch();
                  }}
                  className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear filters
                </button>
              </div>
            )}
          </motion.div>

          {/* ========== SECTION 3: BLOG GRID ========== */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-[#D4EDEE] border-t-[#4A8A90] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#4A8A90] animate-pulse" />
                </div>
              </div>
            </div>
          ) : blogs.length === 0 ? (
            <motion.div 
              className="text-center py-16 bg-white rounded-2xl border-2 border-[#FFB6C1]/30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold mb-2 text-[#2D3A5C]">No articles found 🎈</h3>
              <p className="text-gray-500">Try adjusting your search or explore other categories</p>
            </motion.div>
          ) : (
            <>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <AnimatePresence mode="wait">
                  {blogs.map((blog, idx) => {
                    const category = getCategoryDetails(blog.category);
                    
                    return (
                      <motion.article
                        key={blog._id}
                        variants={cardVariants}
                        whileHover="hover"
                        layout
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="group bg-white rounded-2xl border-2 border-[#FFB6C1]/30 overflow-hidden hover:shadow-xl transition-all duration-300"
                      >
                        <Link href={`/blog/blogDetailsPage?id=${blog._id}`}>
                          {/* Image Container */}
                          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#D4EDEE] to-[#FFF9F0]">
                            {blog.featuredImage ? (
                              <motion.img
                                src={blog.featuredImage}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Gift className="w-12 h-12 text-[#4A8A90]/30" />
                              </div>
                            )}
                            
                            {/* Category Badge */}
                            <div 
                              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium text-white shadow-md flex items-center gap-1"
                              style={{ backgroundColor: category.color }}
                            >
                              <span>{category.icon}</span>
                              <span>{category.label}</span>
                            </div>
                            
                            {/* Fun Badge for new posts */}
                            {idx === 0 && (
                              <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold bg-[#FFD93D] text-[#2D3A5C] shadow-md flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                New!
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            {/* Meta Info */}
                            <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{blog.author}</span>
                              </div>
                             
                            </div>
                            
                            {/* Title */}
                            <h3 className="font-bold mb-2 group-hover:text-[#4A8A90] transition-colors line-clamp-2 text-lg" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive", color: COLORS.text }}>
                              {blog.title}
                            </h3>
                            
                            {/* Excerpt */}
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                              {blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').slice(0, 100) + '...'}
                            </p>
                            
                            {/* Read More Link */}
                            <motion.div 
                              className="inline-flex items-center gap-2 text-sm font-semibold"
                              style={{ color: COLORS.primary }}
                              whileHover={{ gap: 8 }}
                            >
                              Read Story <ArrowRight className="w-4 h-4" />
                            </motion.div>
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div 
                  className="flex justify-center gap-2 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#FFB6C1]/30 bg-white disabled:opacity-40 hover:border-[#4A8A90] transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    const isActive = currentPage === pageNum;
                    
                    return (
                      <motion.button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-full font-medium transition-all ${
                          isActive
                            ? 'text-white shadow-md'
                            : 'bg-white border-2 border-[#FFB6C1]/30 text-gray-600 hover:border-[#4A8A90]'
                        }`}
                        style={isActive ? { backgroundColor: COLORS.primary } : {}}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="w-10 flex items-center justify-center text-gray-400">...</span>
                  )}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#FFB6C1]/30 bg-white disabled:opacity-40 hover:border-[#4A8A90] transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </>
          )}

          {/* Fun Footer Banner */}
       <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-16 p-6 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] rounded-2xl text-center"
>
  <div className="flex items-center justify-center gap-2 mb-2">
    <Gift className="w-6 h-6 text-white" />
    <h3
      className="text-xl font-bold text-white"
      style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
    >
      Discover Amazing Toys!
    </h3>
    <Gift className="w-6 h-6 text-white" />
  </div>

  <p className="text-white/90 text-sm mb-5">
    Explore fun, educational, and magical toys for every child.
  </p>

  <a
    href="/products"
    className="inline-block px-6 py-2 bg-white text-[#4A8A90] rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
  >
    Shop Now 🛍️
  </a>
</motion.div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}