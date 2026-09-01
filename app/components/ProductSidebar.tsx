"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
  productCount: number;
}

interface SanityProduct {
  _id: string;
  title: string;
  slug: string;
  categorySlug: string;
}

interface ProductSidebarProps {
  currentHref: string;
  categories: SanityCategory[];
  products: SanityProduct[];
}

function CategoryAccordion({
  category,
  products,
  currentHref,
  isOpen,
  onToggle,
}: {
  category: SanityCategory;
  products: SanityProduct[];
  currentHref: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const categoryProducts = products.filter((p) => p.categorySlug === category.slug);

  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="
          flex items-center justify-between w-full
          py-3 px-3 min-h-[44px]
          group
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0047BB]
        "
      >
        <span
          className="subheading text-[#0f172a] group-hover:text-[#0047BB] transition-colors leading-none flex-1"
          style={{ fontSize: "13px", letterSpacing: "0.08em" }}
        >
          {category.title}
        </span>
        <span
          className={`text-slate-300 group-hover:text-[#0047BB] transition-transform duration-200 flex-shrink-0 ml-3 ${isOpen ? "rotate-90" : ""}`}
          aria-hidden="true"
        >
          →
        </span>
      </button>
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden bg-blue-50/30"
          >
            {categoryProducts.map((product) => (
              <li key={product._id}>
                <Link
                  href={`/products/${product.categorySlug}/${product.slug}`}
                  className={`
                    flex items-center gap-2
                    py-2 px-6
                    text-[12px] text-slate-600
                    border-l-2 border-slate-200
                    hover:border-[#0047BB] hover:text-[#0047BB] hover:bg-blue-100/50
                    transition-colors
                    ${`/products/${product.categorySlug}/${product.slug}` === currentHref
                      ? "bg-blue-50/70 text-[#0047BB] font-semibold border-[#0047BB]"
                      : ""
                    }
                  `}
                >
                  <span
                    className={`h-1 w-1 flex-shrink-0 rounded-full ${
                      `/products/${product.categorySlug}/${product.slug}` === currentHref
                        ? "bg-[#0047BB]"
                        : "bg-slate-300"
                    }`}
                    aria-hidden="true"
                  />
                  {product.title}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductSidebar({ currentHref, categories, products }: ProductSidebarProps) {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  // Auto-open the category that contains the current product
  const currentProductCategorySlug = categories.find((cat) =>
    products.some((p) => `/products/${p.categorySlug}/${p.slug}` === currentHref && p.categorySlug === cat.slug)
  )?.slug;

  return (
    <div className="border border-slate-200 bg-[#f8fafc] p-3 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <div className="eyebrow text-[#0047BB] px-3 pt-2 pb-3">PRODUCTS</div>
      <nav className="flex flex-col gap-1" aria-label="Products">
        {categories.map((category) => {
          const isOpen = openCategories.includes(category.slug) || category.slug === currentProductCategorySlug;
          return (
            <CategoryAccordion
              key={category._id}
              category={category}
              products={products}
              currentHref={currentHref}
              isOpen={isOpen}
              onToggle={() =>
                setOpenCategories((prev) =>
                  prev.includes(category.slug)
                    ? prev.filter((s) => s !== category.slug)
                    : [...prev, category.slug]
                )
              }
            />
          );
        })}
      </nav>
    </div>
  );
}
