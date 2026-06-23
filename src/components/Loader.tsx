import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onFinished: () => void;
}

export default function Loader({ onFinished }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onFinished();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [progress, onFinished]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream text-deep-brown px-6">
      {/* Decorative Rotating Spices */}
      <div className="relative mb-10 w-24 h-24 flex items-center justify-center">
        {/* Outer orbital rings */}
        <div className="absolute inset-0 border border-warm-beige rounded-full animate-spin-slow"></div>
        <div className="absolute inset-2 border border-dotted border-muted-gold/40 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        
        {/* Central Grinder mortar and pestle animation */}
        <div className="relative z-10 text-terracotta text-4xl animate-bounce" style={{ animationDuration: '2s' }}>
          🍂
        </div>
        
        {/* Small floating specs */}
        <span className="absolute -top-1 left-12 text-xs opacity-60 animate-ping">🌶️</span>
        <span className="absolute -bottom-2 left-6 text-xs opacity-40 animate-pulse">⚫</span>
        <span className="absolute top-12 -right-2 text-xs opacity-50 animate-bounce">🟡</span>
      </div>

      <h1 className="font-serif text-3xl md:text-4xl text-center font-medium tracking-wide mb-2">
        SLOW GRINDS
      </h1>
      
      <p className="text-xs tracking-[0.2em] uppercase text-muted-gold font-light mb-8 animate-pulse-subtle">
        Crafting your flavor experience...
      </p>

      {/* Elegant minimalist progress bar */}
      <div className="w-48 h-[2px] bg-warm-beige rounded-full overflow-hidden">
        <div 
          className="h-full bg-terracotta transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mt-4 font-mono text-[10px] text-deep-brown/40">
        BATCH #047 / STONE HEATED WHEELS
      </div>
    </div>
  );
}
