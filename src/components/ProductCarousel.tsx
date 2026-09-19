import React, { useRef } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  badge?: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistIds?: string[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  badge,
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="my-7 sm:my-8 relative">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2 px-1">
        <div>
          <div className="flex items-center gap-2">
            {badge && (
              <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600 animate-bounce" />
                {badge}
              </span>
            )}
              <h2 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Navigation arrow buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => scroll('left')}
            id={`carousel-prev-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 shadow-sm flex items-center justify-center text-slate-700 transition active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            id={`carousel-next-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 shadow-sm flex items-center justify-center text-slate-700 transition active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal smooth scrolling carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((prod) => (
          <div
            key={prod.id}
            className="w-[min(78vw,280px)] sm:w-[280px] shrink-0 snap-start"
          >
            <ProductCard
              product={prod}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(prod.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
