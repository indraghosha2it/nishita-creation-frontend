'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartSidebar from '../components/CartSidebar';
import {
  Search,
  Grid,
  List,
  X,
  Loader2,
  Package,
  Tag as TagIcon,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const ITEMS_PER_PAGE = 20;

// ============================================================
// Minimal product card (reuse your ProductGridCard if you want)
// ============================================================
const SimpleProductCard = ({ product, router }) => {
  const productName = product?.productName || 'Product';
  const regularPrice = Number(product?.regularPrice || 0);
  const discountPrice = Number(product?.discountPrice || 0);
  const currentPrice =
    discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
  const discountPercent =
    regularPrice > 0 && discountPrice > 0 && discountPrice < regularPrice
      ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100)
      : 0;

  const img =
    product?.images?.[0]?.url ||
    (typeof product?.images?.[0] === 'string' ? product.images[0] : '') ||
    '/placeholder-product.jpg';

  return (
    <Link
      href={`/product/${product.slug || product._id}`}
      className="group block rounded-2xl border border-[#c5d5be]/30 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
    >
      <div className="relative aspect-square bg-[#f8f7f2] overflow-hidden">
        <img
          src={img}
          alt={productName}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-[#8B9D83] text-white text-[10px] font-bold px-2 py-1 rounded">
            {discountPercent}% OFF
          </div>
        )}
      </div>
      <div className="p-3">
        <h3
          className="text-[13px] font-semibold text-[#263b32] line-clamp-2 min-h-[34px] group-hover:text-[#8B9D83] transition-colors"
          style={{ fontFamily: FONT_FAMILY }}
        >
          {productName}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[15px] font-bold text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
            ৳{currentPrice.toFixed(2)}
          </span>
          {discountPercent > 0 && (
            <span className="text-[11px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
              ৳{regularPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

// ============================================================
// MAIN PAGE
// ============================================================
export default function EventsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tags, setTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [activeTagSlug, setActiveTagSlug] = useState(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const searchTimerRef = useRef(null);

  // ============================================================
  // 1. Read ?tag=<slug> on mount + on URL change
  // ============================================================
  useEffect(() => {
    const tagSlug = searchParams.get('tag');
    setActiveTagSlug(tagSlug || null);
    setCurrentPage(1);
  }, [searchParams]);

  // ============================================================
  // 2. Fetch tags once
  // ============================================================
  useEffect(() => {
    const fetchTags = async () => {
      setTagsLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/tags?isActive=true`, {
          cache: 'no-store',
        });
        const data = await res.json();
        if (data.success) {
          setTags(data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch tags:', err);
        toast.error('Failed to load tags');
      } finally {
        setTagsLoading(false);
      }
    };
    fetchTags();
  }, []);

  // ============================================================
  // 3. Fetch products whenever filters change
  // ============================================================
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', ITEMS_PER_PAGE);
      params.append('sort', 'newest');

      if (activeTagSlug) {
        params.append('tags', activeTagSlug); // backend now accepts slug
      }
      if (search.trim()) {
        params.append('search', search.trim());
      }

      const res = await fetch(`${API_URL}/api/products?${params.toString()}`, {
        cache: 'no-store',
      });
      const data = await res.json();

      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [activeTagSlug, search, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ============================================================
  // 4. Handlers
  // ============================================================
  const handleTagClick = (slug) => {
    const params = new URLSearchParams(window.location.search);
    if (slug) {
      params.set('tag', slug);
    } else {
      params.delete('tag');
    }
    router.push(`/events${params.toString() ? `?${params.toString()}` : ''}`, {
      scroll: false,
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setSearch(value);
      setCurrentPage(1);
    }, 500);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearch('');
    setCurrentPage(1);
  };

  // Find active tag object (for header title)
  const activeTag = tags.find((t) => t.slug === activeTagSlug);

  // ============================================================
  // 5. Render
  // ============================================================
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#f0f5ed] via-white to-[#f0f5ed] border-b border-[#c5d5be]/20">
        <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-[#B82E68]" />
              <h1
                className="text-2xl md:text-3xl lg:text-4xl font-light text-[#263b32]"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                Shop By{' '}
                <span className="text-[#8B9D83] font-medium">Collections</span>
              </h1>
            </div>
            <p className="text-[#53645a] text-sm mb-3" style={{ fontFamily: FONT_FAMILY }}>
              {activeTag
                ? `Showing products tagged "${activeTag.name}"`
                : 'Browse all our curated collections'}
            </p>

            {/* Search */}
            <div className="w-full max-w-md">
              <div className="relative flex items-center bg-white border border-[#8B9D83]/20 rounded-full shadow-sm overflow-hidden focus-within:border-[#8B9D83] focus-within:ring-2 focus-within:ring-[#8B9D83]/20 transition-all">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-10 py-2 text-sm border-0 focus:outline-none bg-transparent"
                  style={{ fontFamily: FONT_FAMILY }}
                />
                {searchInput && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 p-1 text-gray-400 hover:text-[#8B9D83]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-[#f8f7f2]">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          {/* Tag chips row */}
          <div className="mb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {/* All */}
              <button
                onClick={() => handleTagClick(null)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  !activeTagSlug
                    ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/25'
                    : 'bg-white border border-[#c5d5be]/40 text-gray-700 hover:border-[#8B9D83]/50 hover:text-[#8B9D83]'
                }`}
                style={{ fontFamily: FONT_FAMILY }}
              >
                <Sparkles className="w-3 h-3" />
                All Collections
              </button>

              {/* Tag chips */}
              {tagsLoading
                ? [...Array(5)].map((_, i) => (
                    <div key={i} className="h-7 w-24 rounded-full bg-gray-100 animate-pulse shrink-0" />
                  ))
                : tags.map((tag) => {
                    const isActive = activeTagSlug === tag.slug;
                    return (
                      <button
                        key={tag._id}
                        onClick={() => handleTagClick(tag.slug)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                          isActive
                            ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/25'
                            : 'bg-white border border-[#c5d5be]/40 text-gray-700 hover:border-[#8B9D83]/50 hover:text-[#8B9D83]'
                        }`}
                        style={{ fontFamily: FONT_FAMILY }}
                      >
                        {tag.image && (
                          <img
                            src={tag.image}
                            alt=""
                            className="w-4 h-4 rounded-full object-cover"
                          />
                        )}
                        {tag.name}
                      </button>
                    );
                  })}
            </div>
          </div>

          {/* Result header + view toggle */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs text-gray-600" style={{ fontFamily: FONT_FAMILY }}>
              {loading
                ? 'Loading products...'
                : `${totalProducts} product${totalProducts !== 1 ? 's' : ''} found`}
            </p>
            <div className="flex items-center gap-0.5 bg-white border border-[#8B9D83]/30 rounded-full p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-all ${
                  viewMode === 'grid' ? 'bg-[#8B9D83] text-white' : 'text-gray-500 hover:bg-[#f0f5ed]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-full transition-all ${
                  viewMode === 'list' ? 'bg-[#8B9D83] text-white' : 'text-gray-500 hover:bg-[#f0f5ed]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Products grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#c5d5be]/30 overflow-hidden animate-pulse">
                  <div className="aspect-square bg-[#c5d5be]/10" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#c5d5be]/30">
              <Package className="w-12 h-12 text-[#c5d5be] mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: FONT_FAMILY }}>
                No products found{activeTag ? ` for "${activeTag.name}"` : ''}
              </p>
              {activeTagSlug && (
                <button
                  onClick={() => handleTagClick(null)}
                  className="px-4 py-1.5 bg-[#8B9D83] text-white text-xs font-medium rounded-full"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  Show All Products
                </button>
              )}
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {products.map((p) => (
                    <SimpleProductCard key={p._id} product={p} router={router} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((p) => (
                    <SimpleProductCard key={p._id} product={p} router={router} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1.5 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-[#c5d5be]/30 rounded-full disabled:opacity-50 text-xs hover:bg-[#f0f5ed]"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Prev
                  </button>
                  {[...Array(totalPages)].map((_, i) => {
                    const n = i + 1;
                    if (
                      n === 1 ||
                      n === totalPages ||
                      (n >= currentPage - 1 && n <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={n}
                          onClick={() => setCurrentPage(n)}
                          className={`min-w-[28px] h-7 text-xs font-medium rounded-full transition-all ${
                            currentPage === n
                              ? 'bg-[#8B9D83] text-white'
                              : 'border border-[#c5d5be]/30 text-gray-700 hover:bg-[#f0f5ed]'
                          }`}
                          style={{ fontFamily: FONT_FAMILY }}
                        >
                          {n}
                        </button>
                      );
                    } else if (n === currentPage - 2 || n === currentPage + 2) {
                      return <span key={n} className="text-xs text-gray-400">...</span>;
                    }
                    return null;
                  })}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-[#c5d5be]/30 rounded-full disabled:opacity-50 text-xs hover:bg-[#f0f5ed]"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}