'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Eye,
  Heart,
  Share2,
  Bookmark,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  ChevronRight,
  AlertCircle,
  Tag,
  Mail,
  Award,
  TrendingUp,
  Quote,
  Copy,
  Check,
  Star,
  Image as ImageIcon,
  List,
  X,
  ChevronLeft,
  Sparkles,
  Gift,
  Rocket,
  Smile
} from 'lucide-react';
import Footer from '@/app/components/layout/Footer';
import Navbar from '@/app/components/layout/Navbar';
import WhatsAppButton from '@/app/components/layout/WhatsAppButton';
import { motion, AnimatePresence } from 'framer-motion';
import BlogMetadataUpdater from './MetadataUpdater';

// ToyMart Brand Colors
const COLORS = {
  primary: '#4A8A90',
  secondary: '#FFB6C1',
  accent: '#FFD93D',
  neutral: '#FFFFFF',
  lightGray: '#FFF9F0',
  border: '#E5E7EB',
  text: '#2D3A5C',
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
];

// Helper function to strip HTML tags
const stripHtmlTags = (html) => {
  if (!html) return '';
  // Create a temporary div to decode HTML entities and strip tags
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

export default function BlogDetailsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const blogId = searchParams.get('id');
  
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(true);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  
  // Table of contents state
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');

  // Fetch blog details
  useEffect(() => {
    if (!blogId) {
      setError('No blog ID provided');
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
        const data = await response.json();
        
        if (data.success) {
          // Process content to fix HTML formatting
          let processedContent = data.data.content;
          
          // Fix lists - ensure proper HTML list formatting
          processedContent = processedContent.replace(/•\s+/g, '<li>');
          processedContent = processedContent.replace(/(<li>.*?)(\n|$)/g, '$1</li>\n');
          processedContent = processedContent.replace(/(<li>.*?<\/li>\n?)+/g, '<ul>$&</ul>');
          
          // Fix numbered lists
          processedContent = processedContent.replace(/(\d+)\.\s+/g, '<li value="$1">');
          processedContent = processedContent.replace(/(<li value="\d+">.*?)(\n|$)/g, '$1</li>\n');
          
          // Fix bold and strong tags
          processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          
          // Fix line breaks
          processedContent = processedContent.replace(/\n\n/g, '</p><p>');
          processedContent = processedContent.replace(/\n/g, '<br/>');
          
          // Wrap in paragraphs if not already
          if (!processedContent.startsWith('<')) {
            processedContent = `<p>${processedContent}</p>`;
          }
          
          setBlog({ ...data.data, content: processedContent });
          
          // Extract headings from content for table of contents
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = processedContent;
          
          // Get all heading elements (h2, h3, h4)
          const headingElements = tempDiv.querySelectorAll('h2, h3, h4');
          const extractedHeadings = [];
          
          headingElements.forEach((el, index) => {
            // Get clean text without HTML tags
            let headingText = el.textContent || el.innerText;
            headingText = stripHtmlTags(headingText).trim();
            
            if (headingText && headingText.length > 0) {
              // Create a clean ID
              const id = `heading-${index}-${headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;
              el.id = id;
              extractedHeadings.push({
                text: headingText,
                id: id,
                level: el.tagName.toLowerCase()
              });
            }
          });
          
          // Update content with IDs
          const updatedContent = tempDiv.innerHTML;
          setBlog(prev => ({ ...prev, content: updatedContent }));
          setHeadings(extractedHeadings);
          
          // Prepare gallery images
          const images = [];
          if (data.data.featuredImage) {
            images.push({ url: data.data.featuredImage, alt: data.data.title, type: 'featured' });
          }
          if (data.data.thumbnailImages && data.data.thumbnailImages.length > 0) {
            data.data.thumbnailImages.forEach(img => {
              images.push({ url: img.url, alt: data.data.title, type: 'thumbnail' });
            });
          }
          setGalleryImages(images);
          
          // Fetch related posts
          fetchRelatedPosts(data.data.category, data.data._id);
        } else {
          setError(data.message || 'Blog not found');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  // Fetch related posts
  const fetchRelatedPosts = async (category, currentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs?category=${category}&limit=3`);
      const data = await response.json();
      if (data.success) {
        setRelatedPosts(data.data.filter(post => post._id !== currentId).slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get reading time
  const getReadingTime = (content) => {
    if (!content) return '3';
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  // Get category details
  const getCategoryDetails = (categoryValue) => {
    return BLOG_CATEGORIES.find(c => c.value === categoryValue) || BLOG_CATEGORIES[0];
  };

  // Share blog
  const shareBlog = (platform) => {
    const url = window.location.href;
    const title = blog?.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Scroll to heading
  const scrollToHeading = (id, text) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveHeading(text);
    }
  };

  // Open lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Next image
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  // Previous image
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // Track active heading while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const headingsElements = headings.map(h => document.getElementById(h.id));
      for (let i = headingsElements.length - 1; i >= 0; i--) {
        if (headingsElements[i] && window.scrollY >= headingsElements[i].offsetTop - 100) {
          setActiveHeading(headings[i].text);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // Helper function to render rich text content safely
  const renderRichText = (content) => {
    if (!content) return '';
    return { __html: content };
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF9F0 0%, #D4EDEE 100%)' }}>
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 border-4 border-[#D4EDEE] border-t-[#4A8A90] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#4A8A90] animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-sm" style={{ color: COLORS.textLight }}>Reading a fun story... 🎈</p>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF9F0 0%, #D4EDEE 100%)' }}>
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.text }}>Story Not Found 🧸</h2>
            <p className="text-sm mb-6" style={{ color: COLORS.textLight }}>
              The article you're looking for has wandered off somewhere else!
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] text-white rounded-full hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Stories
            </Link>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  const category = getCategoryDetails(blog.category);
  const readingTime = getReadingTime(blog.content);

  return (
    <>
      {blog && <BlogMetadataUpdater blog={blog} />}
      <Navbar />
      
      <main className="-mt-18 min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF9F0 0%, #D4EDEE 100%)' }}>
        
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-xl md:text-2xl opacity-20"
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

        {/* ========== HERO BANNER WITH FEATURED IMAGE ========== */}
        <div className="relative h-[45vh] min-h-[350px] overflow-hidden">
          {blog.featuredImage ? (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat cursor-pointer"
                style={{ backgroundImage: `url(${blog.featuredImage})` }}
                onClick={() => openLightbox(0)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A8A90] to-[#FFB6C1]" />
          )}
          
          <div className="absolute bottom-0 left-0 right-0 pb-8 pt-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Stories
              </Link>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span 
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-white shadow-lg flex items-center gap-1"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon} {category.label}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight max-w-4xl" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span>{blog.author}</span>
                </div>
              
             
              </div>
            </div>
          </div>
        </div>

        {/* ========== MAIN CONTENT AREA ========== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            
            {/* ========== LEFT COLUMN - MAIN CONTENT ========== */}
            <div className="flex-1 lg:w-2/3">
              
              {/* EXCERPT SECTION */}
              {blog.excerpt && (
                <div className="mb-6 bg-gradient-to-r from-[#FFB6C1]/20 to-[#D4EDEE] rounded-2xl p-6 border-l-4 border-l-[#4A8A90] shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: COLORS.primary }}>
                    <Sparkles className="w-4 h-4" />
                    Story Snapshot
                  </h3>
                  <p className="text-base italic leading-relaxed" style={{ color: COLORS.text }}>
                    {blog.excerpt}
                  </p>
                </div>
              )}
              
              {/* Blog Content - Rich Text with proper list styling */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div 
                  className="prose prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:text-[#2D3A5C] prose-headings:mt-8 prose-headings:mb-4
                    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                    prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                    prose-a:text-[#4A8A90] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-[#2D3A5C] prose-strong:font-semibold
                    prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
                    prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
                    prose-li:text-gray-600 prose-li:mb-1
                    prose-li:marker:text-[#4A8A90]
                    prose-img:rounded-xl prose-img:shadow-md prose-img:my-6
                    prose-blockquote:border-l-4 prose-blockquote:border-[#4A8A90] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-500
                    prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                    prose-table:border-collapse prose-table:w-full
                    prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:bg-gray-100
                    prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4
                    [&_li]:text-gray-600 [&_li]:mb-1"
                  dangerouslySetInnerHTML={renderRichText(blog.content)}
                />
              </div>
              
              {/* Additional Sections (Paragraphs) */}
              {blog.paragraphs && blog.paragraphs.length > 0 && (
                <div className="mt-8 space-y-8">
                  {blog.paragraphs.map((paragraph, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                      {paragraph.header && (
                        <h2 
                          id={paragraph.header.toLowerCase().replace(/\s/g, '-')}
                          className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2" 
                          style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive", color: COLORS.text }}
                        >
                          <span className="w-6 h-6 bg-[#FFD93D] rounded-full flex items-center justify-center text-sm">🎈</span>
                          {paragraph.header}
                        </h2>
                      )}
                      {paragraph.image && (
                        <div className="mb-5 rounded-xl overflow-hidden cursor-pointer shadow-md" onClick={() => {
                          const imgIndex = galleryImages.findIndex(img => img.url === paragraph.image);
                          openLightbox(imgIndex !== -1 ? imgIndex : 0);
                        }}>
                          <img 
                            src={paragraph.image} 
                            alt={paragraph.header} 
                            className="w-full object-cover max-h-96 hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div 
                        className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: paragraph.description }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* YouTube Video Section */}
              {blog.youtubeVideo && blog.youtubeVideo.videoId && (
                <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      src={`https://www.youtube.com/embed/${blog.youtubeVideo.videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Thumbnail Gallery */}
              {blog.thumbnailImages && blog.thumbnailImages.length > 0 && (
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive", color: COLORS.text }}>
                    <ImageIcon className="w-5 h-5 text-[#4A8A90]" />
                    Fun Gallery 📸
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {blog.thumbnailImages.map((img, idx) => (
                      <div 
                        key={idx} 
                        className="rounded-lg overflow-hidden aspect-square cursor-pointer group shadow-md"
                        onClick={() => openLightbox(idx + 1)}
                      >
                        <img 
                          src={img.url} 
                          alt={`Gallery ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tags Section */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-[#4A8A90]" />
                    <span className="text-sm font-semibold" style={{ color: COLORS.text }}>Fun Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-[#D4EDEE] rounded-full text-xs hover:bg-[#FFB6C1] transition-colors cursor-pointer"
                        style={{ color: COLORS.text }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ========== RIGHT SIDEBAR ========== */}
            <aside className="lg:w-1/3 lg:pl-6">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Table of Contents - Clean headings without HTML tags */}
                {headings.length > 0 && (
                  <div className="bg-white rounded-2xl border border-[#FFB6C1]/30 p-5 shadow-lg">
                    <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 pb-3 border-b border-[#FFB6C1]/30" style={{ color: COLORS.text }}>
                      <List className="w-4 h-4 text-[#4A8A90]" />
                      Story Guide
                    </h3>
                    <nav className="space-y-2 max-h-64 overflow-y-auto">
                      {headings.map((heading, idx) => (
                        <button
                          key={idx}
                          onClick={() => scrollToHeading(heading.id, heading.text)}
                          className={`text-xs block w-full text-left px-3 py-2 rounded-lg transition-all ${
                            activeHeading === heading.text
                              ? 'bg-[#D4EDEE] text-[#4A8A90] font-medium'
                              : 'text-gray-500 hover:bg-[#FFF9F0] hover:text-[#4A8A90]'
                          }`}
                        >
                          {heading.level === 'h2' ? '📖' : heading.level === 'h3' ? '•' : '◦'} {heading.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Fun Facts Card */}
                <div className="bg-gradient-to-br from-[#4A8A90] to-[#FFB6C1] rounded-2xl p-5 text-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                      🧸
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Meet the Storyteller</h4>
                      <p className="text-sm font-medium">{blog.author}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Passionate about creating magical stories and sharing fun toy adventures for kids and parents!
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-center">
                      <div>
                        <div className="text-lg font-bold">🎨</div>
                        <div className="text-xs text-white/60">Creative</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">✨</div>
                        <div className="text-xs text-white/60">Magical</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">🎈</div>
                        <div className="text-xs text-white/60">Fun</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white rounded-2xl border border-[#FFB6C1]/30 overflow-hidden shadow-lg">
                    <div className="px-5 py-4 border-b border-[#FFB6C1]/30 bg-[#FFF9F0]">
                      <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: COLORS.text }}>
                        <Star className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" />
                        You Might Also Like
                      </h3>
                    </div>
                    <div className="p-4 space-y-4">
                      {relatedPosts.map((post, idx) => (
                        <Link key={post._id} href={`/blog/blogDetailsPage?id=${post._id}`}>
                          <div className="group cursor-pointer">
                            <div className="flex gap-3">
                              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[#D4EDEE] shadow-sm">
                                {post.featuredImage ? (
                                  <img
                                    src={post.featuredImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-[#4A8A90]/20 to-[#FFB6C1]/20 flex items-center justify-center">
                                    <Gift className="w-6 h-6 text-[#4A8A90]" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-[#4A8A90] transition-colors" style={{ color: COLORS.text }}>
                                  {post.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs mt-1 text-gray-400">
                                  <span>{post.author}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Section */}
                <div className="bg-white rounded-2xl border border-[#FFB6C1]/30 p-5 shadow-lg">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: COLORS.text }}>
                    <Share2 className="w-4 h-4 text-[#4A8A90]" />
                    Share the Magic
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => shareBlog('facebook')}
                      className="flex-1 p-2 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Facebook className="w-4 h-4" />
                      Share
                    </button>
                    <button
                      onClick={() => shareBlog('twitter')}
                      className="flex-1 p-2 bg-[#1DA1F2] text-white rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Twitter className="w-4 h-4" />
                      Tweet
                    </button>
                    <button
                      onClick={() => shareBlog('copy')}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Quote Card */}
                <div className="bg-gradient-to-r from-[#FFD93D]/20 to-[#FFB6C1]/20 rounded-2xl p-5 text-center border border-[#FFD93D]/30">
                  <Quote className="w-8 h-8 mx-auto mb-3 opacity-50 text-[#4A8A90]" />
                  <p className="text-sm italic" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive", color: COLORS.text }}>
                    "Play is the highest form of research — and we make it fun!"
                  </p>
                  <p className="text-xs mt-2 text-[#4A8A90]">- ToyMart Team</p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ========== LIGHTBOX MODAL ========== */}
        {lightboxOpen && galleryImages.length > 0 && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-5 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-5 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            
            <div className="max-w-5xl max-h-[90vh] mx-4">
              <img
                src={galleryImages[currentImageIndex]?.url}
                alt={galleryImages[currentImageIndex]?.alt || 'Gallery image'}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-5 left-0 right-0 text-center text-white/60 text-sm">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}