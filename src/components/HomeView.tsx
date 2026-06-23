import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Clock, Heart, MoveRight, HelpCircle } from 'lucide-react';
import { Product, ProcessStep } from '../types';
import { MASALA_PRODUCTS, PROCESS_STEPS, TESTIMONIALS, FLOATING_PIECES } from '../data';

interface HomeViewProps {
  onShopNow: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function HomeView({ onShopNow, onSelectProduct }: HomeViewProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [timelineAutoPlay, setTimelineAutoPlay] = useState(true);

  // Auto-slide process timeline for interactive life
  useEffect(() => {
    if (!timelineAutoPlay) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev === 5 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [timelineAutoPlay]);

  const handleWhatsAppChat = () => {
    const msg = encodeURIComponent("Namaste! I just discovered Slow Grinds on Instagram and fell in love with your artisanal homemade masalas. I'd love to learn more and try some small batch grinds!");
    window.open(`https://wa.me/919999999999?text=${msg}`, '_blank');
  };

  return (
    <div className="relative page-transition pt-20">
      
      {/* Floating Subtle Spice Particles (Middle Parallax Layer) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10 hidden md:block">
        {FLOATING_PIECES.map((piece, i) => (
          <span
            key={i}
            className={`absolute ${piece.size} animate-float opacity-30 select-none`}
            style={{
              top: piece.top,
              left: piece.left,
              right: piece.right,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${5 + (i * 2)}s`,
            }}
          >
            {piece.label}
          </span>
        ))}
      </div>

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-6 py-12 md:py-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline and Narrative (Off-centered column) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8 z-20">
            {/* Small micro badge */}
            <div className="inline-flex items-center space-x-2 text-terracotta tracking-[0.25em] uppercase text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta inline-block animate-pulse"></span>
              <span>ESTD. 2026 • Heirloom Stone Wheel Recipes</span>
            </div>
            
            {/* Cinematic Headline - Wood / Terracotta pairings */}
            <div className="space-y-4">
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-deep-brown leading-[1.05]">
                Authentic <br />
                <span className="relative inline-block pb-1">
                  Flavours
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-terracotta/80 rounded-full animate-pulse"></span>
                </span> <br />
                <span className="italic text-muted-gold font-light">Made At Home</span>
              </h1>
              
              <p className="font-sans text-deep-brown/70 text-base md:text-lg max-w-lg font-light leading-relaxed pt-2">
                Freshly crafted homemade masalas prepared in tiny micro-batches. Under forty hand-sealed jars per grind, capturing the fragrant volatile oils of stone-milled spices.
              </p>
            </div>

            {/* Action buttons (Agency Magnetic buttons simulation) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
              <button
                id="hero-shop-btn"
                onClick={onShopNow}
                className="custom-button-magnetic bg-terracotta hover:bg-terracotta/90 text-cream px-8 py-4 rounded-full font-sans font-medium text-sm tracking-widest uppercase transition-all shadow-premium-soft flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Shop the Grind</span>
                <MoveRight size={16} />
              </button>

              <button
                id="hero-wa-btn"
                onClick={handleWhatsAppChat}
                className="custom-button-magnetic border border-deep-brown/30 hover:border-deep-brown hover:bg-deep-brown/[0.03] text-deep-brown px-8 py-4 rounded-full font-sans font-medium text-sm tracking-widest uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Order On WhatsApp</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.022-.015-.03-.021-.108-.066-.078-.045-.463-.228-.535-.254-.071-.026-.123-.039-.176.039-.053.078-.205.254-.251.306-.046.052-.092.059-.17.013-.078-.046-.33-.122-.629-.388-.233-.208-.39-.465-.436-.541-.046-.077-.005-.119.034-.157.035-.034.078-.09.117-.137.039-.045.052-.078.078-.129.027-.052.013-.097-.007-.137-.02-.046-.176-.425-.241-.581-.064-.154-.128-.133-.176-.133-.046-.002-.098-.002-.15-.002-.051 0-.137.019-.208.097-.072.078-.273.267-.273.65 0 .384.28.756.319.808.039.052.551.84.1.758.12 1.344.384 1.761.303 2.112.553.04.148.017.266-.021.365-.038-.088-.098-.756-.73-1.014-1.026l-.003-.002zm2.148-11.453c-2.464-2.464-5.741-3.82-9.23-3.82C4.192 1.109.006 5.295.006 10.428c0 1.64.428 3.242 1.24 4.65l-1.32 4.821 4.933-1.294c1.362.743 2.893 1.135 4.453 1.136h.004c5.234 0 9.42-4.186 9.42-9.32 0-2.483-.967-4.816-2.718-6.568zM10.42 18.328c-1.39 0-2.754-.374-3.945-1.079l-.282-.168-2.93.768.782-2.855-.184-.294c-.775-1.233-1.185-2.657-1.185-4.12 0-4.321 3.518-7.839 7.842-7.839 2.094 0 4.062.816 5.542 2.298a7.786 7.786 0 0 1 2.293 5.547c0 4.323-3.518 7.842-7.838 7.842z" />
                </svg>
              </button>
            </div>

            {/* Organic metadata stamps */}
            <div className="flex items-center space-x-6 border-t border-warm-beige/60 pt-6 mt-4">
              <div>
                <span className="block font-serif text-2xl font-bold text-deep-brown">100%</span>
                <span className="block text-[10px] tracking-widest uppercase text-deep-brown/40 font-mono">Organic Crop</span>
              </div>
              <div className="h-8 w-[1px] bg-warm-beige"></div>
              <div>
                <span className="block font-serif text-2xl font-bold text-deep-brown">Stone</span>
                <span className="block text-[10px] tracking-widest uppercase text-deep-brown/40 font-mono">Chakki ground</span>
              </div>
              <div className="h-8 w-[1px] bg-warm-beige"></div>
              <div>
                <span className="block font-serif text-2xl font-bold text-deep-brown">12 Jars</span>
                <span className="block text-[10px] tracking-widest uppercase text-deep-brown/40 font-mono">Per Small Grind</span>
              </div>
            </div>
          </div>

          {/* Large Overlapping Masked Image (Breaking grid naturally as requested) */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center p-4">
            
            {/* Background Blob Frame */}
            <div className="absolute w-[85%] h-[85%] bg-warm-beige organic-shape-1 z-0 animate-pulse-subtle"></div>
            
            {/* Main organic food illustration container */}
            <div className="relative z-10 w-[90%] aspect-[4/3] rounded-[24px] overflow-hidden shadow-premium-elevated group border-4 border-cream">
              <img
                src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800"
                alt="Handcrafted Masala Bowl"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110"
              />
              
              {/* Overlapping glass label sticker */}
              <div className="absolute bottom-6 right-6 backdrop-blur-md bg-cream/70 border border-cream/50 px-4 py-3 rounded-2xl shadow-lg text-right max-w-[200px]">
                <span className="block text-[8px] tracking-widest text-terracotta uppercase font-bold font-mono">Today's Batch</span>
                <span className="block font-serif text-sm font-semibold text-deep-brown">Royally Ground Shahi Garam Masala (#01)</span>
              </div>
            </div>

            {/* Floating foreground secondary image (making elements overlap) */}
            <div className="absolute -bottom-6 -left-2 z-20 w-[42%] aspect-square rounded-[20px] overflow-hidden shadow-premium-elevated border-4 border-cream hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=400"
                alt="Stone Pound Mortar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/60 to-transparent flex items-end p-3">
                <span className="font-serif text-xs italic text-cream">Slow Granite Mortar</span>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. THE CHOSEN INGREDIENTS SHOWCASE (Asymmetrical composition) */}
      <section className="py-24 px-6 bg-cream border-y border-warm-beige/30 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-4">
              <span className="text-terracotta tracking-[0.2em] uppercase text-[11px] font-bold block mb-2">RAW NATURE</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-brown tracking-tight leading-none mb-6">
                Organically Healed, Hand-Selected.
              </h2>
              <p className="text-sm font-sans text-deep-brown/70 leading-relaxed max-w-sm mb-6">
                We believe in raw textures and absolute purity. No industrial mills, no color enhancers, and no chemical dusts. Every single spice pod is sourced from natural, wild-canopy groves.
              </p>
              <button 
                onClick={onShopNow}
                className="inline-flex items-center space-x-2 text-terracotta font-serif font-bold text-lg hover:text-deep-brown transition-colors group cursor-pointer"
              >
                <span>Read entire ingredient story</span>
                <MoveRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* BENTO ASYMMETRICAL SHOWCASE CARDS (Avoid generic shopify grids) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Ingredient Card 1 */}
              <div className="bg-warm-beige/30 hover:bg-warm-beige/50 transition-colors p-8 rounded-[24px] border border-warm-beige/25 flex flex-col justify-between min-h-[250px] shadow-premium-soft md:mt-6">
                <div>
                  <span className="text-3xl">🌿</span>
                  <h3 className="font-serif text-2xl font-bold text-deep-brown mt-4 mb-2">Black Stone Flower</h3>
                  <p className="text-xs text-deep-brown/70 font-sans leading-relaxed">
                    Known locally as 'Kalpasi'. This elusive forest lichen gives our Garam Masala its dark, magical woody fragrance, sourced entirely from mountain rocks in Tamil Nadu.
                  </p>
                </div>
                <div className="text-[10px] tracking-widest font-mono text-muted-gold font-bold pt-4">HIGH ESSENTIAL COMPOUND</div>
              </div>

              {/* Ingredient Card 2 */}
              <div className="bg-warm-beige/40 hover:bg-warm-beige/60 transition-colors p-8 rounded-[24px] border border-warm-beige/30 flex flex-col justify-between min-h-[250px] shadow-premium-soft">
                <div>
                  <span className="text-3xl">🌶️</span>
                  <h3 className="font-serif text-2xl font-bold text-deep-brown mt-4 mb-2">Bamboo Sun-Cured Mirch</h3>
                  <p className="text-xs text-deep-brown/70 font-sans leading-relaxed">
                    Organic Kashmiri red chilies cured naturally on woven bamboo sheets to let moisture extract passively beneath the clean Kashmir sun.
                  </p>
                </div>
                <div className="text-[10px] tracking-widest font-mono text-muted-gold font-bold pt-4">HEIRLOOM SPECIES</div>
              </div>

            </div>
          </div>

          {/* Organic Floating image with texture strip */}
          <div className="relative w-full rounded-[24px] overflow-hidden aspect-[21/9] md:aspect-[3/1] max-h-[300px] shadow-premium-elevated">
            <img
              src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=1200"
              alt="Raw spices display"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale-[15%] brightness-90 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-brown/80 via-deep-brown/30 to-transparent flex items-center px-12 text-cream">
              <div className="max-w-md">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-gold">The Stone-Ground Promise</span>
                <p className="font-serif text-xl md:text-3xl italic font-light leading-relaxed mt-2">
                  "Spices ground inside heated high-speed electric crushers lose up to 60% of their therapeutic aromatics."
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE STORY TIMELINE (Horizontal flow) */}
      <section className="py-24 px-6 bg-warm-beige/20 border-b border-warm-beige/50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-xl mx-auto">
            <span className="text-terracotta tracking-[0.25em] uppercase text-[10px] font-bold block mb-2">HOW IT BECOMES</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-brown tracking-tight">
              The Seven-Day Grind Story
            </h2>
            <p className="text-xs text-deep-brown/60 mt-4 leading-relaxed font-sans">
              Take an interactive walk of our handmaking lifecycle. Hover or step through to pause each phase.
            </p>
          </div>

          {/* Animated Connective Line across Timeline */}
          <div className="relative mt-12 mb-16 px-4">
            
            {/* The structural connection wire */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-warm-beige -translate-y-1/2 z-0 hidden md:block"></div>
            
            {/* Active Highlighted Line */}
            <div 
              className="absolute top-1/2 left-0 h-[2px] bg-terracotta -translate-y-1/2 z-0 transition-all duration-500 hidden md:block"
              style={{ width: `${(activeStep - 1) * 25}%` }}
            ></div>

            {/* Timeline Steps Dots Container */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-8">
              {PROCESS_STEPS.map((step) => {
                const isActive = activeStep === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStep(step.id);
                      setTimelineAutoPlay(false);
                    }}
                    onMouseEnter={() => {
                      setActiveStep(step.id);
                      setTimelineAutoPlay(false);
                    }}
                    className="flex flex-col items-center text-center focus:outline-none group cursor-pointer"
                  >
                    {/* Circle badge */}
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-base font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-terracotta text-cream scale-110 shadow-lg ring-[6px] ring-terracotta/20'
                          : 'bg-warm-beige/65 text-deep-brown hover:bg-warm-beige group-hover:scale-105'
                      }`}
                    >
                      0{step.id}
                    </div>

                    <span className={`mt-4 font-serif text-base font-bold tracking-tight transition-colors ${isActive ? 'text-terracotta' : 'text-deep-brown/60'}`}>
                      {step.title}
                    </span>
                    <span className="text-[10px] tracking-wider text-muted-gold uppercase mt-1 font-mono">
                      {step.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Display panel for active step */}
          <div className="bg-cream border border-warm-beige/50 rounded-[28px] overflow-hidden shadow-premium-elevated transition-all duration-500 p-6 md:p-10 max-w-4xl mx-auto">
            {PROCESS_STEPS.map((step) => {
              if (step.id !== activeStep) return null;
              return (
                <div key={step.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fade-in">
                  
                  {/* Step Image */}
                  <div className="md:col-span-5 h-[230px] rounded-[18px] overflow-hidden relative shadow-premium-soft">
                    <img
                      src={step.image}
                      alt={step.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur border border-cream text-terracotta text-xs font-mono font-bold px-3 py-1 rounded-full px-2 py-1 flex items-center space-x-1.5">
                      <Clock size={11} />
                      <span>Phase {step.id}</span>
                    </div>
                  </div>

                  {/* Step Details */}
                  <div className="md:col-span-7 space-y-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted-gold font-mono font-bold">
                      THE CRAFTER'S HANDS
                    </span>
                    <h3 className="font-serif text-3xl font-bold tracking-tight text-deep-brown leading-tight">
                      {step.title} — {step.subtitle}
                    </h3>
                    <p className="text-sm text-deep-brown/70 leading-relaxed font-sans">
                      {step.description}
                    </p>
                    
                    <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-terracotta">
                      <span>Interactive Step System</span>
                      <span>•</span>
                      <button 
                        onClick={() => setTimelineAutoPlay(!timelineAutoPlay)}
                        className="underline hover:text-deep-brown focus:outline-none cursor-pointer"
                      >
                        {timelineAutoPlay ? 'Pause Autoplay' : 'Resume Autoplay'}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (3D tilt aspect, overlapping, editorial) */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-terracotta tracking-[0.2em] uppercase text-[11px] font-bold block mb-2">LIMITED GRINDS</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-brown tracking-tight leading-none">
                Featured Small Batches
              </h2>
            </div>
            
            <button
              onClick={onShopNow}
              className="group inline-flex items-center space-x-3 text-sm font-sans tracking-widest uppercase font-bold text-deep-brown hover:text-terracotta transition-colors border-b border-deep-brown/20 pb-1 hover:border-terracotta cursor-pointer"
            >
              <span>Explore all 5 masalas</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* ASYMMETRICAL MOUNTED GRID (Symmetrical box cards are forbidden) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-stretch">
            
            {MASALA_PRODUCTS.slice(0, 3).map((product, idx) => {
              // Create dynamic spacing offsetting to break the horizontal alignment feel
              const offsetStyles = [
                'lg:translate-y-0',
                'lg:translate-y-6',
                'lg:-translate-y-4'
              ][idx] || '';

              return (
                <div
                  key={product.id}
                  className={`flex flex-col bg-cream border border-warm-beige/60 rounded-[28px] overflow-hidden shadow-premium-soft hover:shadow-premium-elevated transition-all duration-500 hover:-translate-y-2 group group cursor-pointer ${offsetStyles}`}
                  onClick={() => onSelectProduct(product)}
                >
                  
                  {/* Image container & overlay pricing */}
                  <div className="aspect-[4/3] w-full overflow-hidden relative border-b border-warm-beige/30">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-[2500ms] group-hover:scale-105"
                    />
                    
                    {/* Glass Stickers Price sticker (frosted glass as requested) */}
                    <div className="absolute top-4 right-4 backdrop-blur-md bg-cream/45 border-cream/50 border shadow-lg px-3.5 py-1.5 rounded-xl">
                      <span className="text-[10px] font-bold text-terracotta font-mono uppercase block text-center">Price</span>
                      <span className="font-serif text-lg font-bold text-deep-brown">₹{product.price}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-deep-brown/80 backdrop-blur text-cream text-[10px] font-mono tracking-widest px-3 py-1 rounded-full uppercase">
                      {product.weight} Jars
                    </div>
                  </div>

                  {/* Card Description */}
                  <div className="p-8 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif italic text-sm text-muted-gold">{product.hindiName}</span>
                        <div className="flex items-center space-x-1 text-terracotta text-xs font-bold">
                          <Star size={11} fill="currentColor" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl font-bold tracking-tight text-deep-brown group-hover:text-terracotta transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-xs text-deep-brown/70 font-sans leading-relaxed line-clamp-3">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-warm-beige/40 flex items-center justify-between text-xs font-bold uppercase tracking-widest font-sans text-deep-brown group-hover:text-terracotta transition-colors">
                      <span>View Story & Order</span>
                      <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* 5. MEET THE MAKER (High narrative page composition with real feel) */}
      <section className="py-24 px-6 bg-deep-brown text-cream border-t border-warm-beige/10 relative overflow-hidden">
        {/* Subtle background golden glow sphere */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-muted-gold/10 blur-[130px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Narrative description */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <span className="text-muted-gold tracking-[0.25em] uppercase text-[10px] font-bold block">
              HERITAGE HANDS
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight leading-none">
              Meet Meera Tai <br />
              <span className="italic font-light text-muted-gold">The Soul of Slow Grinds</span>
            </h2>
            
            <p className="text-sm font-sans text-cream/70 leading-relaxed font-light">
              "My stone mortar and pestle have been in our household for eighty years. It was carved by hand from a single block of black river-stone. It retains no chemical heat, ensuring my grandmother’s masala secrets remain exactly the same as they tasted under mud roofs."
            </p>

            <blockquote className="border-l-2 border-terracotta pl-6 italic text-lg font-serif text-cream/90 font-light max-w-xl">
              "When you pulverize a spice inside a machine at high speeds, you create friction heat. That heat burns away the fine natural essential spice oils. We never grind faster than my hands can stir."
            </blockquote>

            <div className="flex items-center space-x-4 pt-4">
              <div className="w-12 h-12 rounded-full border border-muted-gold/30 flex items-center justify-center font-serif text-muted-gold italic font-bold">
                M.T
              </div>
              <div>
                <span className="block font-serif text-base font-semibold">Meera Tai Deshmukh</span>
                <span className="block text-[10px] tracking-wider text-muted-gold uppercase font-mono">Master Mill Crafter</span>
              </div>
            </div>
          </div>

          {/* Asymmetrical Frame Visual (Overlapping) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            
            {/* Background clay frame */}
            <div className="absolute w-[90%] h-[95%] bg-terracotta/20 organic-shape-3 z-0"></div>
            
            {/* Maker image frame */}
            <div className="relative z-10 w-[85%] aspect-[3/4] rounded-[24px] overflow-hidden border border-warm-beige/10 shadow-premium-elevated">
              <img
                src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600"
                alt="Meera Tai selecting spices"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-95"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-deep-brown/90 backdrop-blur-md p-4 rounded-xl border border-white/5 text-center">
                <span className="text-[9px] uppercase tracking-widest text-muted-gold block">Authentic Capture</span>
                <span className="font-serif text-xs text-cream italic">Meera Tai assessing fresh Sangli Haldi rhizomes</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. REAL CUSTOMER REVIEWS (Polaroid style, hand rotation as requested) */}
      <section className="py-24 px-6 bg-cream relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-terracotta tracking-[0.2em] uppercase text-[11px] font-bold block mb-2">SHARED LOVES</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-brown tracking-tight">
              Polaroids from Quiet Kitchens
            </h2>
            <p className="text-xs text-deep-brown/65 font-sans mt-3">
              Hover over cards to straighten and lift them for closer reading.
            </p>
          </div>

          {/* Non-symmetrical polaroids grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start pt-6">
            
            {TESTIMONIALS.map((review, i) => {
              // Distribute slightly random rotation angles
              const rotations = [
                'hover:rotate-0 -rotate-2',
                'hover:rotate-0 rotate-3',
                'hover:rotate-0 -rotate-1 md:translate-y-4'
              ];
              const rotateStyle = rotations[i] || 'hover:rotate-0';

              return (
                <div
                  key={review.id}
                  className={`bg-white p-6 pb-10 transition-all duration-300 shadow-polaroid border border-warm-beige/30 flex flex-col space-y-6 ${rotateStyle} hover:-translate-y-4 hover:shadow-premium-elevated group cursor-pointer`}
                >
                  
                  {/* Polaroid Card image box (rustic placeholder aesthetic) */}
                  <div className="aspect-square bg-warm-beige/30 relative overflow-hidden border border-warm-beige/25">
                    <img
                      src={review.reviewImage || [
                        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&q=80&w=400',
                        'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=400'
                      ][i]}
                      alt={`${review.author}'s organic kitchen story`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter sepia-[15%] group-hover:sepia-0 transition-all duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-cream/90 backdrop-blur px-2 py-0.5 rounded text-[8px] font-mono text-deep-brown">
                      {review.date}
                    </div>
                  </div>

                  {/* Polaroid reviews content - handwritten-like rating stars */}
                  <div className="space-y-4 text-left">
                    <div className="flex items-center space-x-1 text-terracotta">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} size={13} fill="currentColor" />
                      ))}
                    </div>
                    
                    <p className="font-serif text-base italic leading-relaxed text-deep-brown/85">
                      {review.text}
                    </p>

                    <div className="border-t border-warm-beige/30 pt-4 flex items-center justify-between text-xs">
                      <span className="font-sans font-semibold text-deep-brown">{review.author}</span>
                      <span className="font-mono text-[9px] tracking-wider text-muted-gold uppercase">{review.location}</span>
                    </div>
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION (Magazine elegant layout) */}
      <section id="contact" className="py-20 px-6 bg-cream border-t border-warm-beige/40">
        <div className="max-w-5xl mx-auto bg-warm-beige/30 rounded-[32px] p-8 md:p-16 border border-warm-beige/40 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          
          {/* Background clay blur */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-terracotta/5 blur-3xl"></div>
          
          <div className="flex-1 space-y-6">
            <span className="text-terracotta tracking-[0.25em] uppercase text-[10px] font-bold block">
              SECURE A GRIND
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-deep-brown leading-tight">
              Ready to elevate <br />your cooking daily?
            </h2>
            <p className="text-xs md:text-sm text-deep-brown/70 leading-relaxed font-sans max-w-sm">
              We pack masala grinds in rotating sequences every Tuesday. Select your jars today to ensure prompt shipping straight from the mortar stone.
            </p>
            
            {/* Contact Details informational section */}
            <div className="pt-4 border-t border-warm-beige/50 text-[11px] font-mono text-deep-brown/50 uppercase tracking-widest space-y-2">
              <div>Phone: +91 99999 99999</div>
              <div>Email: hello@slowgrinds.com</div>
              <div>Studio: Sangli Road Rural Outpost, Maharashtra</div>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-4">
            <button
              onClick={onShopNow}
              className="custom-button-magnetic bg-terracotta hover:bg-terracotta/90 text-cream px-8 py-4 rounded-full font-serif font-bold text-base transition-all shadow-premium-soft flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Shop Small Batch</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={handleWhatsAppChat}
              className="custom-button-magnetic bg-cream hover:bg-cream/80 text-deep-brown border border-deep-brown/20 px-8 py-4 rounded-full font-sans font-medium text-sm tracking-widest uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Order via Chat</span>
            </button>
          </div>

        </div>
      </section>

      {/* Decorative Brand footer */}
      <footer className="py-12 px-6 bg-cream border-t border-warm-beige/40 text-center">
        <h3 className="font-serif text-xl tracking-wider text-deep-brown">SLOW GRINDS MASALA</h3>
        <span className="block text-[8px] tracking-[0.3em] text-muted-gold font-mono uppercase mt-1">EVERY SPECK AUTHENTIC, EVERY PINCH HANDCRAFTED</span>
        <div className="mt-6 text-[10px] text-deep-brown/40 font-sans font-light">
          © {new Date().getFullYear()} Slow Grinds Spice Atelier. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
