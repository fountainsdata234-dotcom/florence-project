import React, { useState } from 'react';
import { Product } from '../types';
import { GlassImage } from './GlassImage';
import { Star, ShoppingBag, Zap, Heart, Eye, Check, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const [addedEffect, setAddedEffect] = useState(false);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 1200);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onQuickView(product)}
      className="group relative flex min-w-0 flex-col bg-white rounded-2xl border border-slate-200/80 hover:border-slate-400/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      {/* Product Image Box with Glass Loading Shimmer */}
      <div className="relative p-2 pb-0">
        <GlassImage
          src={product.image}
          alt={product.title}
          aspectRatio="square"
          className="rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Discount / Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 items-start z-20 pointer-events-none">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[11px] font-extrabold tracking-wide uppercase bg-red-600 text-white rounded-md shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {product.badge && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-tight bg-slate-900/80 backdrop-blur-md text-white rounded-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            id={`wishlist-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist?.(product.id);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition-transform hover:scale-110"
            title="Add to Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'
              }`}
            />
          </button>
          <button
            type="button"
            id={`quick-preview-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition-transform hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Pill */}
        {product.freeShipping && (
          <div className="absolute bottom-2 left-4 z-20">
            <span className="text-[10px] font-semibold bg-emerald-500 text-white px-2 py-0.5 rounded-full shadow-sm">
              Free Shipping
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-2.5 sm:p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Rating and Sales */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount > 1000 ? `${(product.reviewsCount/1000).toFixed(1)}k` : product.reviewsCount})</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {product.soldCount > 1000 ? `${(product.soldCount/1000).toFixed(0)}k+ sold` : `${product.soldCount} sold`}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-sm text-slate-900 line-clamp-2 hover:text-slate-700 transition leading-snug">
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing and Cart Button */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-bold text-slate-900">$</span>
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {product.price.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium mt-0.5">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>Lowest Price 30d</span>
            </div>
          </div>

          <button
            id={`add-cart-btn-${product.id}`}
            type="button"
            onClick={handleAdd}
            className={`px-2 sm:px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95 ${
              addedEffect
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {addedEffect ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
