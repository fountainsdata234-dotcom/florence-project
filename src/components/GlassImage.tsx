import React, { useState } from 'react';

interface GlassImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  priority?: boolean;
}

export const GlassImage: React.FC<GlassImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'square',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-3/4',
    auto: 'h-full',
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden bg-slate-100/80 rounded-xl ${aspectClass} ${containerClassName}`}
    >
      {/* Glass card loading placeholder with light wave sliding */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-md bg-white/40 border border-white/60 shadow-inner">
          <div className="animate-glass-wave" />
          <div className="w-10 h-10 rounded-full border border-slate-300/60 bg-white/70 shadow-sm flex items-center justify-center">
            <svg
              className="w-5 h-5 text-slate-400 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
          <span className="mt-2 text-[11px] font-medium text-slate-500 tracking-wider uppercase">
            Loading preview...
          </span>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={hasError ? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-105 blur-sm'
        } ${className}`}
      />
    </div>
  );
};
