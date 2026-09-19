import React, { useState, useEffect } from 'react';
import { GlassImage } from './GlassImage';
import { 
  Flame, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Truck, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onOpenFlashDeals: () => void;
  onRequireAuth: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onOpenFlashDeals,
  onRequireAuth,
}) => {
  // Flash sale countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 27,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl my-4 sm:my-6 border border-slate-800">
      {/* Background ambient lighting effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-slate-700/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 py-8 sm:px-12 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Column: Promotion Copy & Interactive Countdown */}
        <div className="max-w-xl space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold backdrop-blur-md">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-amber-300">Florid Flash Sale</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-200">Limited Stock</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Shop Like a Billionaire.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-amber-200">
              Florid Essentials Collection
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
            Discover low prices, fast dispatch, and a smooth checkout experience.
          </p>

          {/* Flash Countdown Timer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Ends in:</span>
              <div className="flex gap-1 font-mono font-bold text-white">
                <span className="bg-white/10 px-2 py-1 rounded border border-white/20">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span className="bg-white/10 px-2 py-1 rounded border border-white/20">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span className="bg-white/10 px-2 py-1 rounded border border-white/20 text-amber-400">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure Verified Checkout</span>
            </div>
          </div>

          {/* Primary CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <button
              id="hero-explore-deals-btn"
              onClick={onExploreClick}
              className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-xs sm:text-sm hover:bg-slate-100 transition shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>Explore All Deals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-signup-verify-btn"
              onClick={onRequireAuth}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition backdrop-blur-md flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Join Florid Rewards</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual Product Highlight */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900/90 rounded-3xl p-4 border border-slate-700/80 shadow-2xl">
            {/* Top Tag */}
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
                Today's #1 Pick
              </span>
              <span className="text-slate-400 font-medium">94% Claimed</span>
            </div>

            {/* Featured Product Preview with glass shimmer wave */}
            <div className="relative rounded-2xl overflow-hidden shadow-md">
              <GlassImage
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                alt="AeroPulse Wireless Headphones"
                aspectRatio="square"
                className="hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-2 right-2 bg-red-600 text-white font-black text-xs px-2 py-1 rounded shadow-md">
                -68% OFF
              </div>
            </div>

            {/* Hero Card Footer */}
            <div className="mt-3 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white truncate max-w-[200px]">
                  AeroPulse Active Noise-Cancelling
                </h4>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-lg font-black text-white">$49.99</span>
                  <span className="text-xs text-slate-400 line-through">$159.00</span>
                </div>
              </div>
              <button
                onClick={onOpenFlashDeals}
                className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition flex items-center justify-center shadow"
                title="View deal"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Strip Footer */}
      <div className="border-t border-slate-800 bg-slate-950/60 px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-slate-400">
        <div className="flex items-center justify-center gap-1.5">
          <Truck className="w-4 h-4 text-slate-300" />
          <span>Free Express Shipping</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Secure Buyer Protection</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Price Match Guarantee</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-blue-400" />
          <span>90-Day Free Returns</span>
        </div>
      </div>
    </div>
  );
};
