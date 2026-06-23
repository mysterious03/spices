import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Minus, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { MASALA_PRODUCTS } from '../data';

interface ListingViewProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ListingView({ onSelectProduct, onAddToCart }: ListingViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'blends' | 'single-spices' | 'beverages'>('all');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    'garam-masala': 1,
    'kashmiri-mirch': 1,
    'stone-ground-haldi': 1,
    'tellicherry-dhania': 1,
    'chai-karha': 1,
  });

  const handleQtyChange = (productId: string, amount: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = current + amount;
      return { ...prev, [productId]: next < 1 ? 1 : next };
    });
  };

  // Classify products into categories loosely
  const categorizedProducts = MASALA_PRODUCTS.filter((product) => {
    // Category classification mappings
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'blends' && (product.id === 'garam-masala' || product.id === 'tellicherry-dhania')) ||
      (selectedCategory === 'single-spices' && (product.id === 'kashmiri-mirch' || product.id === 'stone-ground-haldi')) ||
      (selectedCategory === 'beverages' && product.id === 'chai-karha');

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.hindiName && product.hindiName.includes(searchQuery)) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 page-transition">
      
      {/* Editorial Header */}
      <div className="mb-16 mt-8 space-y-4">
        <span className="text-terracotta tracking-[0.2em] uppercase text-[10px] font-bold block">
          THE CATALOGUE
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-light text-deep-brown tracking-tight leading-none">
          Micro Grinds <br />
          <span className="italic text-muted-gold font-light">Small Batch Provisions</span>
        </h1>
        <p className="text-sm font-sans text-deep-brown/75 max-w-xl font-light leading-relaxed">
          Crafting forty-jar batches every recurring Tuesday. Our blends are numbered, certified by stone rotation speeds, and hand-capped inside raw cotton jars.
        </p>
      </div>

      {/* FILTER PANEL & INTEGRATED BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 border-b border-warm-beige pb-8 mb-16">
        
        {/* Category triggers */}
        <div className="flex flex-wrap items-center gap-2">
          {([
            { id: 'all', label: 'All Masalas' },
            { id: 'blends', label: 'Secret Blends' },
            { id: 'single-spices', label: 'Single Origin' },
            { id: 'beverages', label: 'Elixirs & Tea' },
          ] as const).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-deep-brown text-cream shadow-md'
                  : 'bg-warm-beige/30 hover:bg-warm-beige/60 text-deep-brown/85 border border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search bar input container (minimal, non-saas) */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search spice drawer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-warm-beige/25 border-b border-deep-brown/20 focus:border-terracotta text-deep-brown px-4 py-2.5 pr-10 text-sm font-sans font-light focus:outline-none transition-colors"
          />
          <Search size={16} className="absolute right-3 top-3.5 text-deep-brown/50" />
        </div>

      </div>

      {/* ASYMMETRICAL EDITORIAL LAYOUT CARDS */}
      <div className="space-y-24 md:space-y-36">
        
        {categorizedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 rounded-3xl border border-dashed border-warm-beige/80">
            <span className="text-4xl block">🍃</span>
            <p className="font-serif text-2xl italic text-deep-brown/60">No batch currently active under this filter.</p>
            <p className="text-xs text-deep-brown/40">Try searching for other authentic key terms like "Haldi" or "Chai".</p>
          </div>
        ) : (
          categorizedProducts.map((product, idx) => {
            const qty = quantities[product.id] || 1;
            
            // Set up distinct layouts per indices
            const styleVariant = idx % 3;

            if (styleVariant === 0) {
              // VARIANT 1: Image Left, Story/Buy Controls Right (Clean overlapping)
              return (
                <div
                  key={product.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center"
                >
                  {/* Left Column Image (Asymmetric height border) */}
                  <div className="lg:col-span-6 relative group">
                    <div className="absolute w-[95%] h-[95%] bg-warm-beige/45 organic-shape-2 z-0"></div>
                    
                    <div 
                      onClick={() => onSelectProduct(product)}
                      className="relative z-10 aspect-[4/3] rounded-[24px] overflow-hidden shadow-premium-elevated border-4 border-cream cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      
                      {/* Glass Sticker sticker */}
                      <div className="absolute bottom-4 right-4 backdrop-blur-md bg-cream/70 border border-cream/50 px-3 py-1.5 rounded-xl shadow">
                        <span className="font-serif text-sm font-bold text-deep-brown">{product.weight} batch</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column details */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg italic text-muted-gold font-medium">{product.hindiName}</span>
                      <span className="font-sans text-xs tracking-widest text-deep-brown/40 uppercase font-bold">BATCH No.0{idx + 1}</span>
                    </div>

                    <h2 
                      onClick={() => onSelectProduct(product)}
                      className="font-serif text-3xl md:text-4xl font-bold text-deep-brown hover:text-terracotta cursor-pointer transition-colors leading-tight"
                    >
                      {product.name}
                    </h2>

                    <p className="text-sm text-deep-brown/70 leading-relaxed font-sans font-light">
                      {product.fullDescription.slice(0, 180)}...
                    </p>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-warm-beige/50 text-xs font-sans">
                      <div>
                        <span className="block text-deep-brown/40 uppercase tracking-widest text-[9px] mb-1 font-bold">Base Price</span>
                        <span className="font-serif text-lg text-deep-brown font-bold">₹{product.price} <span className="text-xs text-deep-brown/50">/ jar</span></span>
                      </div>
                      <div>
                        <span className="block text-deep-brown/40 uppercase tracking-widest text-[9px] mb-1 font-bold">Heirloom Grade</span>
                        <span className="text-deep-brown font-semibold">100% Curative Pure</span>
                      </div>
                    </div>

                    {/* Interactive Quantity Selector & Buy */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
                      
                      {/* Quantity Container */}
                      <div className="flex items-center border border-deep-brown/20 rounded-full py-2 px-3 bg-cream shadow-inner w-full sm:w-auto">
                        <button
                          onClick={() => handleQtyChange(product.id, -1)}
                          className="p-1 text-deep-brown/60 hover:text-terracotta cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-6 font-mono font-bold text-sm text-deep-brown flex-1 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(product.id, 1)}
                          className="p-1 text-deep-brown/60 hover:text-terracotta cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => onAddToCart(product, qty)}
                        className="w-full sm:flex-1 bg-terracotta hover:bg-terracotta/90 text-cream py-3 rounded-full font-serif font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center space-x-2 shadow-premium-soft cursor-pointer"
                      >
                        <ShoppingCart size={15} />
                        <span>Incorporate to Cart (₹{product.price * qty})</span>
                      </button>

                    </div>
                  </div>
                </div>
              );
            } else if (styleVariant === 1) {
              // VARIANT 2: Right Column Image, Left Column Content. Reverse composition.
              return (
                <div
                  key={product.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center"
                >
                  
                  {/* Left Column details (gets rendered first on screen) */}
                  <div className="lg:col-span-6 space-y-6 lg:order-1 order-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg italic text-muted-gold font-medium">{product.hindiName}</span>
                      <span className="font-sans text-xs tracking-widest text-deep-brown/40 uppercase font-bold">BATCH No.0{idx + 1}</span>
                    </div>

                    <h2 
                      onClick={() => onSelectProduct(product)}
                      className="font-serif text-3xl md:text-4xl font-bold text-deep-brown hover:text-terracotta cursor-pointer transition-colors leading-tight"
                    >
                      {product.name}
                    </h2>

                    <p className="text-sm text-deep-brown/70 leading-relaxed font-sans font-light">
                      {product.fullDescription.slice(0, 180)}...
                    </p>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-warm-beige/50 text-xs font-sans">
                      <div>
                        <span className="block text-deep-brown/40 uppercase tracking-widest text-[9px] mb-1 font-bold">Aromatics Pack</span>
                        <span className="text-deep-brown font-semibold">100% Glass Seal</span>
                      </div>
                      <div>
                        <span className="block text-deep-brown/40 uppercase tracking-widest text-[9px] mb-1 font-bold">Weight</span>
                        <span className="font-serif text-base text-deep-brown font-bold">{product.weight}</span>
                      </div>
                    </div>

                    {/* Interactive Quantity Selector & Buy */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
                      
                      {/* Quantity Container */}
                      <div className="flex items-center border border-deep-brown/20 rounded-full py-2 px-3 bg-cream shadow-inner w-full sm:w-auto">
                        <button
                          onClick={() => handleQtyChange(product.id, -1)}
                          className="p-1 text-deep-brown/60 hover:text-terracotta cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-6 font-mono font-bold text-sm text-deep-brown flex-1 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(product.id, 1)}
                          className="p-1 text-deep-brown/60 hover:text-terracotta cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => onAddToCart(product, qty)}
                        className="w-full sm:flex-1 bg-deep-brown hover:bg-deep-brown/90 text-cream py-3 rounded-full font-serif font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center space-x-2 shadow-premium-soft cursor-pointer"
                      >
                        <ShoppingCart size={15} />
                        <span>Incorporate to Cart (₹{product.price * qty})</span>
                      </button>

                    </div>
                  </div>

                  {/* Right Column Image */}
                  <div className="lg:col-span-6 relative group lg:order-2 order-1">
                    <div className="absolute w-[95%] h-[95%] bg-warm-beige/45 organic-shape-3 z-0 right-0 top-0"></div>
                    
                    <div 
                      onClick={() => onSelectProduct(product)}
                      className="relative z-10 aspect-[4/3] rounded-[24px] overflow-hidden shadow-premium-elevated border-4 border-cream cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      
                      <div className="absolute bottom-4 left-4 backdrop-blur-md bg-cream/70 border border-cream/50 px-3 py-1.5 rounded-xl shadow">
                        <span className="font-serif text-sm font-bold text-deep-brown">₹{product.price} jar</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            } else {
              // VARIANT 3: Moody Terracotta Block Card backdrop for premium contrast shift
              return (
                <div
                  key={product.id}
                  className="bg-deep-brown/98 text-cream rounded-[40px] p-6 sm:p-12 border border-white/5 shadow-premium-elevated relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Subtle graphical background design */}
                  <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-terracotta/20 blur-3xl pointer-events-none"></div>

                  <div className="lg:col-span-5 relative group">
                    <div className="aspect-square w-full rounded-[24px] overflow-hidden border border-white/10 shadow-lg cursor-pointer" onClick={() => onSelectProduct(product)}>
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex py-1 px-3 rounded-full border border-muted-gold/30 text-xs font-mono tracking-widest text-muted-gold uppercase">
                      HEIRLOOM SIGNATURE RECIPE
                    </div>

                    <div className="space-y-1">
                      <span className="font-serif text-lg italic text-muted-gold block">{product.hindiName}</span>
                      <h2 
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white hover:text-muted-gold transition-colors leading-[1.1]"
                      >
                        {product.name}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-sans font-light">
                      {product.shortDescription} {product.fullDescription.slice(0, 100)}...
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 items-center pt-2">
                      <div className="flex items-center space-x-1.5 flex-1">
                        <div>
                          <span className="block text-[8px] tracking-wider uppercase text-cream/40 font-mono">Weight jar</span>
                          <span className="font-serif text-lg text-white font-bold">{product.weight}</span>
                        </div>
                        <div className="h-6 w-[1.5px] bg-white/10 mx-6"></div>
                        <div>
                          <span className="block text-[8px] tracking-wider uppercase text-cream/40 font-mono">Curcumin / Oil Premium</span>
                          <span className="font-serif text-base text-muted-gold font-bold">Unmodified</span>
                        </div>
                      </div>

                      <div className="flex items-center border border-white/15 rounded-full py-2 px-3 bg-deep-brown shadow-inner w-full sm:w-auto">
                        <button
                          onClick={() => handleQtyChange(product.id, -1)}
                          className="p-1 text-white/50 hover:text-muted-gold cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-6 font-mono font-bold text-sm text-white flex-1 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(product.id, 1)}
                          className="p-1 text-white/50 hover:text-muted-gold cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => onAddToCart(product, qty)}
                        className="w-full sm:w-auto bg-terracotta hover:bg-terracotta/90 text-cream px-8 py-3.5 rounded-full font-serif font-bold text-sm tracking-widest uppercase transition-all shadow-md cursor-pointer"
                      >
                        Incorporate (₹{product.price * qty})
                      </button>
                    </div>

                  </div>
                </div>
              );
            }
          })
        )}

      </div>

    </div>
  );
}
