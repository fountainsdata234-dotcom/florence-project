import React, { useState } from 'react';
import { Product } from '../types';
import { GlassImage } from './GlassImage';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Heart,
  Share2,
  Sparkles 
} from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => boolean;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Florid Slate');
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const currentImage = selectedImage || product.image;
  const colors = ['Florid Slate', 'Pearl White', 'Matte Carbon', 'Obsidian'];
  const sizes = ['Standard', 'Compact', 'Pro Plus'];

  const handleAddToCart = () => {
    if (onAddToCart(product, quantity, selectedColor, selectedSize)) {
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        onClose();
      }, 900);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <div 
        id="quick-view-modal" 
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh] flex flex-col md:flex-row"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          id="close-quickview-btn"
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Gallery with Glass wave effects */}
        <div className="w-full md:w-1/2 p-3 sm:p-6 bg-slate-50 flex flex-col justify-between">
          <div className="relative">
            <GlassImage
              src={currentImage}
              alt={product.title}
              aspectRatio="square"
              className="rounded-2xl shadow-inner border border-slate-200/60"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black uppercase px-2.5 py-1 rounded-md shadow">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {[product.image, ...product.gallery].filter((v, i, a) => a.indexOf(v) === i).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                  currentImage === img ? 'border-slate-900 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <GlassImage src={img} alt={`thumb-${idx}`} aspectRatio="square" />
              </button>
            ))}
          </div>

          {/* Guarantee Badges */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 font-medium">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-slate-800" />
              <span>Free Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-slate-800" />
              <span>90-Day Free Return</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Detail & Interaction */}
        <div className="w-full md:w-1/2 p-4 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[calc(100dvh-17rem)] md:max-h-none">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-900">{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount.toLocaleString()} reviews)</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {product.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">{product.subtitle}</p>

            {/* Price Box */}
            <div className="my-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-slate-900">$</span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                    Save {(100 - (product.price / product.originalPrice) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Florid Deal Guarantee: In stock ({product.stock} units left)
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleWishlist?.(product.id)}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* Specifications & Description */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Option */}
            <div className="mt-4">
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Color Option: <span className="font-normal text-slate-600">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 text-xs rounded-xl font-medium border transition ${
                      selectedColor === c
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-4 flex items-center gap-4">
              <label className="text-xs font-bold text-slate-800">Quantity:</label>
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-bold text-slate-900 font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex gap-3">
            <button
              id="modal-add-to-cart-btn"
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart • ${(product.price * quantity).toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
