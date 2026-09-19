import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, UserProfile, NotificationItem } from './types';
import { INITIAL_PRODUCTS, INITIAL_NOTIFICATIONS } from './mockData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCarousel } from './components/ProductCarousel';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { 
  ArrowUp, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Check, 
  SlidersHorizontal,
  Layers
} from 'lucide-react';

export default function App() {
  const ambientImages = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&q=70',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1400&q=70',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&q=70',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1400&q=70',
  ];
  const [ambientImageIndex, setAmbientImageIndex] = useState(0);
  // Application State
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('florid_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'popular'>('featured');
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // User Authentication
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Back to Top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('florid_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Local storage cart save error:', e);
    }
  }, [cart]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleAmbientScroll = () => {
      const sectionHeight = Math.max(window.innerHeight * 0.9, 520);
      setAmbientImageIndex(Math.floor(window.scrollY / sectionHeight) % ambientImages.length);
    };
    window.addEventListener('scroll', handleAmbientScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleAmbientScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Cart operations
  const handleAddToCart = (
    product: Product, 
    quantity = 1, 
    selectedColor = 'Florid Slate', 
    selectedSize = 'Standard'
  ): boolean => {
    if (!currentUser) {
      setAuthInitialMode('signin');
      setIsAuthOpen(true);
      return false;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          selectedColor,
          selectedSize,
        },
      ];
    });
    return true;
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...result].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating);
      case 'popular':
        return [...result].sort((a, b) => b.soldCount - a.soldCount);
      default:
        return result;
    }
  }, [products, selectedCategory, searchQuery, sortBy]);

  const flashSaleProducts = useMemo(() => {
    return products.filter((p) => p.isFlashDeal);
  }, [products]);

  const trendingProducts = useMemo(() => {
    return products.filter((p) => p.isTrending);
  }, [products]);

  return (
    <div className={`relative min-h-screen overflow-x-hidden font-sans antialiased transition-colors ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div
        key={ambientImageIndex}
        aria-hidden="true"
        className={`ambient-backdrop ${isDarkMode ? 'ambient-backdrop-dark' : ''}`}
        style={{ backgroundImage: `url(${ambientImages[ambientImageIndex]})` }}
      />
      {/* Top Header with brand, search, theme toggle, account, and cart */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={(mode) => {
          if (mode) setAuthInitialMode(mode);
          setIsAuthOpen(true);
        }}
        currentUser={currentUser}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
      />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        {/* Landing hero banner with countdown */}
        <HeroBanner
          onExploreClick={() => {
            const section = document.getElementById('all-products-section');
            section?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenFlashDeals={() => {
            const section = document.getElementById('flash-deals-carousel');
            section?.scrollIntoView({ behavior: 'smooth' });
          }}
          onRequireAuth={() => {
            setAuthInitialMode('signup');
            setIsAuthOpen(true);
          }}
        />

        {/* SECTION 1: Flash sale carousel */}
        <div id="flash-deals-carousel">
          <ProductCarousel
            title="Florid Lightning Deals"
            subtitle="Massive discounts up to 75% off. Guaranteed Lowest Price."
            badge="Flash Sale"
            products={flashSaleProducts}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        </div>

        {/* SECTION 2: Trending Bestsellers Carousel */}
        <div id="trending-carousel">
          <ProductCarousel
            title="Trending & Customer Favorites"
            subtitle="Top-purchased items with 4.8+ star verified ratings and buyer protection."
            badge="Viral Trends"
            products={trendingProducts}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        </div>

        {/* SECTION 3: Main Product Grid with Dynamic Filters & Sorting */}
        <section id="all-products-section" className="mt-10 sm:mt-12">
          {/* Header & Filter Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-slate-700" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {selectedCategory === 'all'
                    ? 'Explore All Deals & Essentials'
                    : `Category: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Showing {filteredProducts.length} verified products with smooth loading and secure checkout.
              </p>
            </div>

            {/* Sorting controls */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Sort:
              </span>
              <select
                id="product-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-sm text-slate-800"
              >
                <option value="featured">Featured / Default</option>
                <option value="popular">Most Popular / Sold</option>
                <option value="rating">Highest Rated (4.8+)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid: Fully responsive remodelled layout for phones, tablets & desktops */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No products matched your search</h3>
              <p className="text-xs text-slate-500">
                Try searching for "headphones", "titanium watch", "leather pack", or reset category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow hover:bg-slate-800"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-5 sm:mt-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlistIds.includes(prod.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Buyer trust information */}
        <section className="mt-16 rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              Secure Checkout Enabled
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Genuine Security for Every Transaction
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every checkout session is protected with account verification, buyer support, money-back assurance, and free tracked transit.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1 text-slate-200">
                <Check className="w-4 h-4 text-emerald-400" />
                Account Verification
              </span>
              <span className="flex items-center gap-1 text-slate-200">
                <Check className="w-4 h-4 text-emerald-400" />
                90-Day Free Return Policy
              </span>
              <span className="flex items-center gap-1 text-slate-200">
                <Check className="w-4 h-4 text-emerald-400" />
                Fast Express Tracking
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                S
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight text-base">
                FLORID STORE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Curated everyday essentials with reliable delivery and buyer protection.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
            <a href="#" className="hover:text-slate-900 transition">Flash Deals</a>
            <a href="#" className="hover:text-slate-900 transition">Buyer Protection</a>
            <a href="#" className="hover:text-slate-900 transition">Security Center</a>
            <a href="#" className="hover:text-slate-900 transition">Terms of Sale</a>
            <a href="#" className="hover:text-slate-900 transition">Shipping & Delivery</a>
          </div>

          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} Florid. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Back to Top Floating Button */}
      {showBackToTop && (
        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-3 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border border-slate-700 flex items-center justify-center"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currentUser={currentUser}
        onRequireAuth={() => {
          setIsCartOpen(false);
          setAuthInitialMode('signin');
          setIsAuthOpen(true);
        }}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
      />

      {/* Account authentication modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        initialMode={authInitialMode}
      />
    </div>
  );
}
