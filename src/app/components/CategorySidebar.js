'use client';

import { X, Menu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function CategorySidebar({ isOpen, onClose, categories = [] }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
    setExpandedSubcategory(null);
  };

  const toggleSubcategory = (subcategoryId) => {
    setExpandedSubcategory((prev) =>
      prev === subcategoryId ? null : subcategoryId
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ================= OVERLAY ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px]"
          />

          {/* ================= SIDEBAR ================= */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="
              fixed left-0 top-0 z-[100]
              flex h-screen flex-col
              w-[22vw] min-w-[280px] max-w-[360px]
              bg-[#F1EFE3]
              shadow-[4px_0_24px_rgba(0,0,0,0.08)]
            "
          >
            {/* ================= HEADER ================= */}
            <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-[#dedcd2] px-5">
              <div className="flex items-center gap-2.5">
                <Menu
                  size={18}
                  strokeWidth={1.6}
                  className="text-[#292725]"
                />
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#292725]">
                  Categories
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close categories"
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#292725]/60 transition hover:bg-black/5 hover:text-[#292725]"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* ================= CATEGORY LIST ================= */}
            <div className="flex-1 overflow-y-auto py-1.5">
              {categories.length === 0 ? (
                <div className="flex min-h-[160px] items-center justify-center px-5 text-center text-[12px] text-[#292725]/50">
                  No categories found.
                </div>
              ) : (
                <ul className="flex flex-col">
                  {categories.map((category) => {
                    const categoryId = category._id || category.id;
                    const categorySlug = category.slug || categoryId;
                    const hasSubcategories = category.subcategories?.length > 0;
                    const isExpanded = expandedCategory === categoryId;

                    return (
                      <li key={categoryId}>
                        {/* ---------- CATEGORY ROW ---------- */}
                        <div className="group flex items-center">
                          <Link
                            href={`/products?category=${categorySlug}`}
                            onClick={onClose}
                            className="
                              flex flex-1 items-center
                              min-h-[38px] px-5
                              text-[12.5px] font-medium
                              text-[#292725]
                              transition-colors
                              hover:text-[#69272B]
                            "
                          >
                            {category.name}
                          </Link>

                          {hasSubcategories && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleCategory(categoryId);
                              }}
                              aria-label="Toggle subcategories"
                              className="
                                mr-3 flex h-6 w-6 shrink-0 items-center justify-center
                                rounded-full
                                text-[#292725]/40
                                transition-all
                                hover:bg-[#69272B]/10 hover:text-[#69272B]
                              "
                            >
                              <ChevronRight
                                size={13}
                                strokeWidth={2}
                                className={`transition-transform duration-200 ${
                                  isExpanded ? 'rotate-90' : ''
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* ---------- SUBCATEGORIES ---------- */}
                        <AnimatePresence initial={false}>
                          {hasSubcategories && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <ul className="ml-5 my-0.5 border-l border-[#dedcd2]">
                                {category.subcategories.map((sub) => {
                                  const subId = sub._id || sub.id;
                                  const subSlug = sub.slug || subId;
                                  const hasChildren = sub.children?.length > 0;
                                  const isSubExpanded =
                                    expandedSubcategory === subId;

                                  return (
                                    <li key={subId}>
                                      <div className="group flex items-center">
                                        <Link
                                          href={`/products?category=${categorySlug}&subcategory=${subSlug}`}
                                          onClick={onClose}
                                          className="
                                            flex flex-1 items-center
                                            min-h-[32px] pl-3 pr-2
                                            text-[12px] font-normal
                                            text-[#292725]/75
                                            transition-colors
                                            hover:text-[#69272B]
                                          "
                                        >
                                          {sub.name}
                                        </Link>

                                        {hasChildren && (
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              toggleSubcategory(subId);
                                            }}
                                            aria-label="Toggle child subcategories"
                                            className="
                                              mr-3 flex h-5 w-5 shrink-0 items-center justify-center
                                              rounded-full
                                              text-[#292725]/40
                                              transition-all
                                              hover:bg-[#69272B]/10 hover:text-[#69272B]
                                            "
                                          >
                                            <ChevronRight
                                              size={11}
                                              strokeWidth={2}
                                              className={`transition-transform duration-200 ${
                                                isSubExpanded
                                                  ? 'rotate-90'
                                                  : ''
                                              }`}
                                            />
                                          </button>
                                        )}
                                      </div>

                                      {/* ---------- CHILD SUBCATEGORIES ---------- */}
                                      <AnimatePresence initial={false}>
                                        {hasChildren && isSubExpanded && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                              height: 'auto',
                                              opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                              duration: 0.2,
                                              ease: 'easeOut',
                                            }}
                                            className="overflow-hidden"
                                          >
                                            <ul className="ml-5 my-0.5 border-l border-[#dedcd2]">
                                              {sub.children.map((child) => {
                                                const childId =
                                                  child._id || child.id;
                                                const childSlug =
                                                  child.slug || childId;

                                                return (
                                                  <li key={childId}>
                                                    <Link
                                                      href={`/products?category=${categorySlug}&subcategory=${subSlug}&child=${childSlug}`}
                                                      onClick={onClose}
                                                      className="
                                                        flex items-center
                                                        min-h-[28px] pl-3 pr-2
                                                        text-[11.5px] font-normal
                                                        text-[#292725]/60
                                                        transition-colors
                                                        hover:text-[#69272B]
                                                      "
                                                    >
                                                      {child.name}
                                                    </Link>
                                                  </li>
                                                );
                                              })}
                                            </ul>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* ================= FOOTER ================= */}
            <div className="shrink-0 border-t border-[#dedcd2] p-3">
              <Link
                href="/products"
                onClick={onClose}
                className="
                  flex h-[40px] items-center justify-center
                  rounded-md
                  bg-[#69272B] text-[11.5px] font-semibold
                  uppercase tracking-[0.08em] text-white
                  transition-opacity
                  hover:opacity-90
                "
              >
                View All Products
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}