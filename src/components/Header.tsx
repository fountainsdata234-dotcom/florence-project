import React, { useEffect, useState } from 'react';
import { UserProfile, NotificationItem } from '../types';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Bell, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Sparkles, 
  Menu, 
  X,
  Flame,
  Check,
  Zap,
  Tag
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  currentUser: UserProfile | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  currentUser,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  isDarkMode,
  onToggleTheme,
  notifications,
  onMarkNotificationRead,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const categories = [
    { id: 'all', label: 'All Deals', icon: Sparkles },
    { id: 'electronics', label: 'Tech & Audio', icon: Zap },
    { id: 'smart-tech', label: 'Smart Gadgets', icon: Flame },
    { id: 'fashion', label: 'Fashion & Bags', icon: Tag },
    { id: 'home', label: 'Home Living', icon: Sparkles },
    { id: 'beauty', label: 'Beauty & Care', icon: Sparkles },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;
  const hour = currentTime.getHours();
  const greeting = hour >= 5 && hour < 12
    ? 'Good morning'
    : hour >= 12 && hour < 17
      ? 'Good afternoon'
      : hour >= 17 && hour < 21
        ? 'Good evening'
        : 'Good night';
  const firstName = currentUser?.displayName?.trim().split(/\s+/)[0];
  const greetingName = firstName || 'Florid shopper';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      {/* Top banner */}
      <div className="bg-slate-900 text-white text-[10px] sm:text-[11px] py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="shrink-0 font-bold text-amber-300">
              {greeting}, {greetingName}
            </span>
            <span className="hidden min-w-0 font-medium text-slate-200 truncate md:inline">
              <span className="mx-1 text-slate-500">|</span>
              ⚡ Up to 75% OFF + Free Shipping on all orders over $25 | Secure Checkout
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-300 font-medium shrink-0">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Secure Checkout Enabled
            </span>
            <span>Customer Care 24/7</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-6">
        {/* Brand logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-slate-200 lg:hidden text-slate-700 hover:bg-slate-100"
            aria-label="Open mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-base sm:text-lg shadow-md group-hover:bg-slate-800 transition">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none">
                FLORID
              </span>
              <span className="text-[9px] tracking-widest text-slate-500 uppercase font-semibold">
                Curated Deals
              </span>
            </div>
          </a>
        </div>

        {/* Global Search Input */}
        <div className="flex-1 min-w-0 max-w-xl mx-1 sm:mx-4 relative">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="global-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-8 py-2 sm:py-2.5 text-xs sm:text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white rounded-full border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action Controls: Light/Dark, Notifications, Auth, Cart */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Light / Dark Mode Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="flex p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
            title="Toggle light/dark theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative hidden sm:block">
            <button
              id="notifications-toggle-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 relative transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Menu */}
            {showNotifications && (
              <div 
                id="notifications-menu" 
                className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-1.5rem))] bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">Recent Notifications</span>
                  <span className="text-[10px] text-slate-400">{notifications.length} alerts</span>
                </div>
                <div className="space-y-2 mt-3 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                        n.read ? 'bg-white border-slate-100 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 font-medium'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="font-bold text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Account profile and login button */}
          <button
            id="auth-trigger-btn"
            onClick={() => onOpenAuth(currentUser ? undefined : 'signin')}
            className="p-2 sm:flex sm:items-center sm:gap-2 sm:px-3 sm:py-1.5 rounded-full border border-slate-200 hover:border-slate-400 text-slate-800 transition"
          >
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
              {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold leading-tight">
                {currentUser ? currentUser.displayName?.split(' ')[0] : 'Sign In'}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                <ShieldCheck className="w-2.5 h-2.5" />
                {currentUser ? 'Account Active' : 'Secure Account'}
              </span>
            </div>
          </button>

          {/* Cart Trigger */}
          <button
            id="open-cart-header-btn"
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-sm active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>

      {/* Horizontal Category Pill Bar */}
      <div className="hidden lg:block border-t border-slate-200/60 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-pill-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3">
          <div className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Browse Deals</div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCategory(c.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold border ${
                  selectedCategory === c.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
            <span className="text-slate-600 font-medium">Secure Checkout Enabled</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="font-bold text-slate-900 underline"
            >
              Manage Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
