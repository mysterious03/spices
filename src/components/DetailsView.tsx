import React, { useState } from 'react';
import { 
  ArrowLeft, Star, ShoppingBag, ShieldCheck, HelpCircle, Heart, Share2, Sparkles, 
  Check, Truck, Lock, ChevronDown, Search, ThumbsUp, Camera, Info, Eye, Compass, MessageSquare, AlertCircle
} from 'lucide-react';
import { Product, Review } from '../types';
import { MASALA_PRODUCTS } from '../data';

interface DetailsViewProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onInstantBuy: (product: Product, quantity: number) => void;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

// Dynamic FAQ list based on product
const FAQ_DATABASE: Record<string, { q: string; a: string }[]> = {
  'garam-masala': [
    {
      q: "Is this garam masala very spicy and hot?",
      a: "No. Unlike mass-market garam masalas that use cheap black pepper and red dry chilies as fillers to create artificial heat, our blend is heavy on sweet green cardamom, Ceylon cinnamon, black stone flower (kalpasi), and high-grade mace. It gives a luxurious, warm sweet aroma with very moderate, throat-soothing heat."
    },
    {
      q: "How much should I use for a family-sized curry?",
      a: "Since our spices are stone-milled under 40 RPM, none of the natural volatile oils are lost to machine friction. The blend is highly concentrated - we recommend starting with just 1/2 of a teaspoon for gas-stewed lentil or vegetable curries serving 4 people."
    },
    {
      q: "How is that signature Black Stone Flower different?",
      a: "Black Stone Flower (Kalpasi) is a wild lichen harvested from forest trees in southern India. When cooked in oil or ghee, it releases an incredibly complex, mossy, dark wood-fired truffle aroma that defines authentic royal Mughlai and Rajput dishes."
    }
  ],
  'kashmiri-mirch': [
    {
      q: "Does this contain any added red dyes or mineral oils?",
      a: "Absolutely not. Commercial brands often spray mineral oil, paprika extract, or synthetic red colorings to simulate brightness. We sun-tune our premium Srinagar long wrinkly chilies on wooden bamboo frames and add only a single droplet of cold-pressed organic mustard oil during solar drying to naturally lock the red carotenoid compounds."
    },
    {
      q: "Is it hot enough to irritate a sensitive stomach?",
      a: "No, this is highly cherished for its color rather than burn. We painstakingly de-stem and de-seed every single chili by hand before pounding. This reduces capsaicin heat levels to the absolute minimum, rendering it mild, sweet, and incredibly gentle on the digestive track."
    }
  ],
  'stone-ground-haldi': [
    {
      q: "Does it stain cooking spoons and fingers?",
      a: "Yes, instantly. This is the ultimate proof of its pristine therapeutic level. Our Sangli Vedic Turmeric has a certified curcumin content exceeding 5.68%. Standard retail yellow powders are heavily diluted with starch, rice starch, or toxic lead chromate to appear yellow, while having almost no curcumin. Use soap or lemon juice to wash away organic stains."
    },
    {
      q: "Why is sun-curing in earthenware pots important?",
      a: "Earthenware pots help uniform steaming of turmeric fingers under low and gentle pressure. This cures the internal rhizome flesh without boiling away the crucial turmeric gingerols and earthy oils, maintaining high nutritional values."
    }
  ],
  'tellicherry-dhania': [
    {
      q: "Can I use this as a direct table seasoning?",
      a: "Yes, it is designed for it! Since we crack it coarsely with granite mortices rather than fine-pulverizing, this blend leaves distinct crunchy specks. It is spectacular when dusted over cheese planks, flatbread doughs, butter toast, salads, or steamed potatoes."
    },
    {
      q: "What makes Tellicherry peppercorn different from standard black pepper?",
      a: "Tellicherry Special Extra Bold (TGSEB) represents only the top 10% largest, most matured peppercorns on the vine. They are left to ripen longer, developing a rich fruity, citrus-forward sweetness alongside a sharp, clean peppery kick, instead of just flat hot bitterness."
    }
  ],
  'chai-karha': [
    {
      q: "Does this chai masala contain tea leaves or sugar?",
      a: "No, this is a 105% pure dry-spice formulation. It contains zero black tea leaves, sugarcane dust, fillers, or artificial preservatives. It is purely composed of dried ginger root, cardamom shells, toasted Saigon cinnamon, cloves, and nutmeg."
    },
    {
      q: "How do I brew this for maximum comfort?",
      a: "Add a swift pinch (about 1/4th of a teaspoon) directly into the milk and water mixture while boiling your organic tea leaves. Let it boil on slow heat for 3-4 minutes to unlock the ginger and nutmeg warmth completely. Strain and serve piping hot."
    }
  ]
};

export default function DetailsView({ product, onAddToCart, onInstantBuy, onBack, onSelectProduct }: DetailsViewProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'faq' | 'reviews'>('info');
  
  // Interactive helpful votes states
  const [upvotedReviews, setUpvotedReviews] = useState<Record<string, boolean>>({});
  const [reviewVotes, setReviewVotes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    product.reviews?.forEach(r => {
      initial[r.id] = r.helpfulVotes || 0;
    });
    return initial;
  });

  // Photo viewer modal state
  const [selectedReviewImage, setSelectedReviewImage] = useState<{
    imageUrl: string;
    reviewText: string;
    author: string;
  } | null>(null);

  // Search box state for Q&A
  const [qaSearch, setQaSearch] = useState('');

  const handleUpvoteReview = (reviewId: string) => {
    if (upvotedReviews[reviewId]) return;
    setUpvotedReviews(prev => ({ ...prev, [reviewId]: true }));
    setReviewVotes(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
  };

  const relatedProducts = MASALA_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  // Standard Product specs for Amazon specification matrix
  const productSpecs = [
    { label: "Brand", value: "Slow Grinds" },
    { label: "Form", value: product.id === 'tellicherry-dhania' ? "Coarsely Cracked" : "Stone-Ground Powder" },
    { label: "Specialty", value: "Organic, Preservative-Free, Stone-Chakki Mill <40 RPM" },
    { label: "Item Weight", value: product.weight },
    { label: "Region of Origin", value: product.id === 'kashmiri-mirch' ? "Srinagar (Kashmir)" : product.id === 'stone-ground-haldi' ? "Sangli (Maharashtra)" : "Malabar Highlands" },
    { label: "Diet Type", value: "Vegetarian, Gluten-Free, Vegan Friendly" },
    { label: "Package Type", value: "Airtight Hermetic Burlap Glass Jar" },
    { label: "Curing Style", value: product.id === 'kashmiri-mirch' ? "Sun-Infused Bamboo Trays" : "Earthenware Steam Cooked" }
  ];

  // Calculate rating shares
  const reviewCount = product.reviews?.length || 0;
  const ratingDetails = {
    '5 star': product.rating >= 4.8 ? '85%' : '75%',
    '4 star': product.rating >= 4.8 ? '15%' : '20%',
    '3 star': product.rating >= 4.8 ? '0%' : '5%',
    '2 star': '0%',
    '1 star': '0%'
  };

  const faqs = FAQ_DATABASE[product.id] || [];
  const filteredFaqs = faqs.filter(
    f => f.q.toLowerCase().includes(qaSearch.toLowerCase()) || 
         f.a.toLowerCase().includes(qaSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16 page-transition bg-cream text-deep-brown font-sans">
      
      {/* 1. Amazon Breadcrumb navigation & Store Header */}
      <div className="border-b border-warm-beige/60 pb-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-deep-brown hover:text-terracotta cursor-pointer transition-colors group"
        >
          <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to spice pantry</span>
        </button>
        <div className="text-xs font-mono text-deep-brown/60">
          Spices & Seasonings &gt; Mixed Spices &gt; <span className="font-bold text-deep-brown">{product.name}</span>
        </div>
      </div>

      {/* 2. THE THREE-COLUMN AMAZON LAYOUT */}
      <div id="product-main-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
        
        {/* COLUMN A: INTERACTIVE IMAGE GALLERY (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="sticky top-24">
            
            {/* Main Picture Box with Choice badge overlay */}
            <div className="aspect-square rounded-2xl overflow-hidden border border-warm-beige shadow-premium-soft relative bg-warm-beige/10 group">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Amazon-style Choice Badge */}
              <div className="absolute top-4 left-4 bg-deep-brown text-cream text-[10px] uppercase tracking-widest font-mono font-bold px-3 py-1 rounded shadow-md flex items-center space-x-1.5 border border-white/10">
                <span className="text-muted-gold">✦</span>
                <span>ATELIER'S CHOICE</span>
              </div>
            </div>

            {/* Thumbnails row */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-white ${
                    activeImage === imgUrl ? 'border-terracotta scale-105 shadow-md' : 'border-warm-beige hover:border-deep-brown/40'
                  }`}
                  aria-label={`Product thumbnail ${idx + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`Product thumb ${idx}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* CUSTOMER REVIEWS IMAGE TRAY (Satisfies photo reviews picture request!) */}
            {product.reviews && product.reviews.some(r => r.reviewImage) && (
              <div className="mt-8 border border-warm-beige/80 rounded-xl bg-warm-beige/10 p-4">
                <span className="text-xs font-mono text-muted-gold uppercase tracking-wider block mb-3 font-semibold flex items-center gap-1.5">
                  <Camera size={14} className="text-terracotta" />
                  Images from customers
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.reviews.map((r) => r.reviewImage && (
                    <button
                      key={r.id}
                      onClick={() => setSelectedReviewImage({
                        imageUrl: r.reviewImage!,
                        reviewText: r.text,
                        author: r.author
                      })}
                      className="w-16 h-16 rounded-lg overflow-hidden border border-warm-beige hover:border-terracotta transition-all cursor-pointer relative group bg-white shadow-sm"
                      title={`Review photo by ${r.author}`}
                    >
                      <img
                        src={r.reviewImage}
                        alt="Customer feedback image"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 group-hover:scale-105 transition-all"
                      />
                      <div className="absolute inset-0 bg-deep-brown/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Eye size={12} className="text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* COLUMN B: AMAZON BULLET & SPEC DETAILS (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            
            {/* Store title link */}
            <div className="text-xs font-mono uppercase tracking-widest text-muted-gold font-bold">
              Brand: Slow Grinds Atelier
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-deep-brown leading-tight">
              {product.name} ({product.hindiName})
            </h1>

            {/* Rating count & answer questions link */}
            <div className="flex flex-wrap items-center gap-4 py-1.5 text-xs text-deep-brown/80 border-b border-warm-beige/40 pb-3">
              <div className="flex items-center space-x-1 text-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                    strokeWidth={1.8} 
                  />
                ))}
                <span className="font-bold text-deep-brown text-sm ml-1">{product.rating}</span>
              </div>
              <span className="text-deep-brown/30">|</span>
              <span className="font-sans text-deep-brown/70 cursor-pointer hover:text-terracotta hover:underline">
                {reviewCount + 124} global ratings
              </span>
              <span className="text-deep-brown/30">|</span>
              <span className="font-mono text-muted-gold font-bold">BATCH #047</span>
            </div>
          </div>

          {/* Price section with standard Amazon breakdowns */}
          <div className="space-y-1 py-3 bg-warm-beige/10 px-4 rounded-xl border border-warm-beige/30">
            <div className="flex items-baseline space-x-2">
              <span className="text-terracotta font-serif text-3xl font-bold">₹{product.price}</span>
              <span className="text-xs font-mono text-deep-brown/50">/ {product.weight} net payload</span>
            </div>
            <div className="text-xs text-green-700 font-sans flex items-center space-x-1">
              <Check size={12} />
              <span>Inclusive of all organic tax and direct farmer shipping.</span>
            </div>
            <p className="text-[10px] text-deep-brown/65 italic font-mono pt-1">
              *Micro-batch ground only once a week every Tuesday. Secure yours before batch slots exhaust.
            </p>
          </div>

          {/* Quick specs pills */}
          <div className="grid grid-cols-2 gap-2.5 py-1 text-xs">
            <div className="bg-cream border border-warm-beige p-2.5 rounded-lg flex flex-col justify-center">
              <span className="text-deep-brown/40 text-[9px] uppercase font-mono font-bold tracking-wider">Flavour Profile</span>
              <span className="font-serif font-bold text-deep-brown mt-0.5">
                {product.id === 'garam-masala' ? 'Rich Wood & Aromatic Sweet' : product.id === 'kashmiri-mirch' ? 'Smoky Mild Red Sweetness' : product.id === 'stone-ground-haldi' ? 'Earthy & Herbal Curcumin' : 'Citric, Spicy Crunch'}
              </span>
            </div>
            <div className="bg-cream border border-warm-beige p-2.5 rounded-lg flex flex-col justify-center">
              <span className="text-deep-brown/40 text-[9px] uppercase font-mono font-bold tracking-wider">Milling Method</span>
              <span className="font-serif font-bold text-deep-brown mt-0.5">Slow-Chakki Stone</span>
            </div>
          </div>

          {/* "About this item" Amazon-Style Bullet points */}
          <div className="space-y-3.5 border-t border-warm-beige/60 pt-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-deep-brown font-bold text-muted-gold">
              About this item:
            </h3>
            <ul className="space-y-2 text-xs font-sans text-deep-brown/85 leading-relaxed list-disc pl-4">
              <li>
                <strong className="text-deep-brown font-semibold">Genuine Micro-Batch Grind: </strong> 
                {product.shortDescription}
              </li>
              <li>
                <strong className="text-deep-brown font-semibold">Traditional Stone-Wheeled: </strong>
                Milled at less than 40 revolutions per minute, completely avoiding machine friction-heat that burns volatile natural oils.
              </li>
              <li>
                <strong className="text-deep-brown font-semibold">100% Honest Ingredients: </strong>
                Contains: {product.ingredients.join(', ')}. Zero fillers, starches, salt, or artificial flavorings added.
              </li>
              <li>
                <strong className="text-deep-brown font-semibold">Therapeutic Properties: </strong>
                {product.benefits[0] || "Supports immune defense."} Keeps volatile organic integrity intact for 4 months.
              </li>
              <li>
                <strong className="text-deep-brown font-semibold">Fresh Sun-Cured Process: </strong>
                Sourced from small multi-crop regenerative farms, sun-dried on organic bamboo trays above dusty ground levels.
              </li>
            </ul>
          </div>

        </div>

        {/* COLUMN C: THE STICKY BUY BOX (3 Cols) */}
        <div id="amazon-buy-box" className="lg:col-span-3 sticky top-24 bg-white border border-warm-beige rounded-[20px] p-5 shadow-premium-soft space-y-4 font-sans">
          
          <div className="space-y-1">
            <div className="text-2xl font-serif font-bold text-deep-brown">₹{product.price}</div>
            <div className="text-xs font-mono text-deep-brown/60">Fulfilled by Slow Grinds</div>
          </div>

          <div className="text-xs font-sans space-y-2 py-2 border-y border-warm-beige/40">
            <div className="flex items-start space-x-2 text-deep-brown/85">
              <Truck size={14} className="text-terracotta shrink-0 mt-0.5" />
              <div>
                <span>FREE shipping directly to your kitchen.</span>
                <span className="block text-[10px] font-semibold text-muted-gold mt-0.5 font-mono">Arrives: Next Tuesday (Fresh batch)</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-deep-brown/80">
              <Lock size={14} className="text-deep-brown/50 shrink-0" />
              <span className="text-[10px] font-mono tracking-wider">SECURED HERMETIC TRANSACTION</span>
            </div>
          </div>

          {/* Stock Notification */}
          <div className="space-y-1">
            <span className="font-bold text-sm text-green-700 block">In Stock.</span>
            <span className="text-[10px] text-terracotta uppercase font-mono font-bold tracking-wider animate-pulse flex items-center space-x-1">
              <AlertCircle size={10} />
              <span>Only 4 left in stock - order soon!</span>
            </span>
          </div>

          {/* Delivery Region Indicator */}
          <div className="text-[10px] bg-warm-beige/30 p-2 rounded border border-warm-beige/30 hover:bg-warm-beige/50 hover:border-warm-beige/65 cursor-pointer transition-all flex items-center justify-between">
            <span className="text-deep-brown/70 leading-tight">Delivering to: <span className="font-bold text-deep-brown">India Residence (Mainland)</span></span>
            <ChevronDown size={12} className="text-deep-brown" />
          </div>

          {/* Quantity Selector */}
          <div className="space-y-1.5 pt-1.5">
            <label className="text-[10px] font-mono tracking-wider text-deep-brown/50 uppercase block font-bold">Jar Quantity:</label>
            <div className="relative">
              <select 
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-cream border border-warm-beige/80 rounded-xl px-3 py-1.5 text-xs text-deep-brown font-mono font-bold focus:outline-none focus:border-terracotta cursor-pointer appearance-none shadow-sm"
              >
                {[1, 2, 3, 4, 5, 8].map((num) => (
                  <option key={num} value={num}>{num} Jar{num > 1 ? 's' : ''} (₹{product.price * num})</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-2.5 text-deep-brown/50 pointer-events-none" />
            </div>
          </div>

          {/* Transaction Buttons (Amazon styled palettes) */}
          <div className="space-y-2.5 pt-3">
            
            <button
              onClick={() => onAddToCart(product, quantity)}
              className="w-full bg-amber-400 hover:bg-amber-500 text-deep-brown border border-amber-500/30 py-3 px-4 rounded-full font-serif font-bold text-xs tracking-widest uppercase transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer active:scale-[0.98]"
            >
              <ShoppingBag size={14} />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => onInstantBuy(product, quantity)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-cream py-3 px-4 rounded-full font-serif font-bold text-xs tracking-widest uppercase transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer active:scale-[0.98]"
            >
              <span>Instant Purchase</span>
            </button>

          </div>

          <div className="text-[10px] text-center text-deep-brown/40 font-mono">
            Securely processed via slow banking networks
          </div>

        </div>

      </div>

      {/* 3. DETAILED TECHNICAL SPECIFICATIONS MATRIX */}
      <section className="border-t border-warm-beige/60 pt-10 mb-16">
        <h2 className="font-serif text-2xl font-bold text-deep-brown mb-6 flex items-center space-x-2">
          <span>📋</span>
          <span>Technical Details & Specifications</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {productSpecs.map((spec, i) => (
            <div 
              key={i} 
              className={`grid grid-cols-12 text-xs py-3 border-b border-warm-beige/40 ${
                i % 2 === 0 ? 'bg-warm-beige/10 px-3 rounded-lg' : 'px-3'
              }`}
            >
              <span className="col-span-5 font-bold text-deep-brown/70 font-mono uppercase tracking-wider text-[10px]">{spec.label}</span>
              <span className="col-span-7 text-deep-brown font-serif text-sm font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CARE, STORAGE AND SACRED COOKING INFOGRAPHIC STRIP */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        
        <div className="bg-warm-beige/30 p-6 md:p-8 rounded-2xl border border-warm-beige/50 space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-bold text-muted-gold uppercase block">STORAGE MANUAL</span>
          <h3 className="font-serif text-xl font-bold text-deep-brown">Keep Curcumin & Essential Oils Secured</h3>
          <p className="text-xs text-deep-brown/80 leading-relaxed font-sans">
            {product.storageInstructions} Our tinted amber-burlap glass preserves natural organic molecular bonds better than plastic jars which invite condensation.
          </p>
        </div>

        <div className="bg-deep-brown text-cream p-6 md:p-8 rounded-2xl shadow-premium-elevated space-y-3">
          <span className="text-[10px] font-mono tracking-widest font-bold text-muted-gold uppercase block">THE ATELIER DISH RITUAL</span>
          <h3 className="font-serif text-xl font-bold text-white leading-tight">Mastering {product.name}</h3>
          <p className="text-xs text-cream/80 leading-relaxed font-sans italic">
            "{product.cookingSuggestions}"
          </p>
        </div>

      </section>

      {/* 5. INTERACTIVE SECTION TABS (Review list / FAQ / Specs) */}
      <div className="border-b border-warm-beige/70 mb-8 flex space-x-6 text-sm">
        <button
          onClick={() => setActiveTab('info')}
          className={`pb-3 font-semibold transition-all relative cursor-pointer ${
            activeTab === 'info' ? 'text-terracotta border-b-2 border-terracotta' : 'text-deep-brown/60 hover:text-deep-brown'
          }`}
        >
          Product Info & Specs
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`pb-3 font-semibold transition-all relative cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'faq' ? 'text-terracotta border-b-2 border-terracotta' : 'text-deep-brown/60 hover:text-deep-brown'
          }`}
        >
          <span>Q&A Board ({faqs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 font-semibold transition-all relative cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'reviews' ? 'text-terracotta border-b-2 border-terracotta' : 'text-deep-brown/60 hover:text-deep-brown'
          }`}
        >
          <span>Customer Reviews ({reviewCount})</span>
        </button>
      </div>

      {activeTab === 'info' && (
        <div className="bg-white border border-warm-beige/60 p-6 rounded-2xl mb-16 space-y-4">
          <h3 className="font-serif text-xl font-bold text-deep-brown">The Honest Heritage behind {product.name}</h3>
          <p className="text-xs leading-relaxed text-deep-brown/80 font-sans">
            {product.fullDescription}
          </p>
          <div className="bg-warm-beige/20 p-4 rounded-lg flex items-start gap-3 border border-warm-beige">
            <ShieldCheck className="text-terracotta shrink-0 mt-0.5" size={16} />
            <div className="text-[11px] leading-relaxed text-deep-brown/80 font-mono">
              <strong className="text-deep-brown uppercase tracking-wider block mb-1">Our Purity Pledge:</strong>
              No added lead chromate colorants, zero starch dust blends, zero cardboard powders. Only pure premium whole-spices carefully secured in dry mountain storages, ground in high-density river stones.
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE AMANON-STYLE Q&A SECTION */}
      {activeTab === 'faq' && (
        <div className="bg-white border border-warm-beige/60 p-6 rounded-2xl mb-16 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-warm-beige/40 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-deep-brown">Customer Questions & Answers</h3>
              <p className="text-[11px] text-deep-brown/60">Find quick replies from master milling artisans and organic harvesters.</p>
            </div>
            
            {/* Search filter input */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-3 text-deep-brown/40" />
              <input
                type="text"
                value={qaSearch}
                onChange={(e) => setQaSearch(e.target.value)}
                placeholder="Have a question? Search answers..."
                className="bg-cream border border-warm-beige rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-terracotta w-64 max-w-full placeholder:text-deep-brown/40"
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <div key={i} className="space-y-2 text-xs font-sans border-b border-warm-beige/30 pb-4 last:border-none">
                  {/* Question */}
                  <div className="flex items-start gap-2.5">
                    <span className="bg-deep-brown text-cream w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">Q</span>
                    <span className="font-bold text-deep-brown leading-snug">{faq.q}</span>
                  </div>
                  
                  {/* Answer */}
                  <div className="flex items-start gap-2.5">
                    <span className="bg-terracotta text-cream w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">A</span>
                    <div className="text-deep-brown/80 leading-relaxed font-light pl-0.5">
                      {faq.a}
                      <span className="block text-[9px] text-muted-gold font-mono tracking-wider uppercase mt-2 font-semibold">
                        — answered by Meera Tai Deshmukh (Master Mill Crafter)
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-deep-brown/50 font-mono">
                No archived community questions matched your search query. Try typing "spicy", "curing", or "stain".
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. SYSTEMATIC REVIEWS MATRIX & REVIEWS FEEDBACK (Amazon Style) */}
      {activeTab === 'reviews' && (
        <div id="product-reviews-box" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16 bg-white border border-warm-beige/60 p-6 md:p-8 rounded-2xl">
          
          {/* L.H.S: Rating Breakdown (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-deep-brown">Customer Reviews</h3>
              <div className="flex items-center space-x-2 text-terracotta text-sm">
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                    />
                  ))}
                </div>
                <span className="font-bold text-deep-brown text-sm font-sans">{product.rating} out of 5 stars</span>
              </div>
              <span className="text-[11px] text-deep-brown/50 font-mono block">100% Verified Buyer Responses</span>
            </div>

            {/* Star Distribution Bars */}
            <div className="space-y-2.5 pt-2 border-t border-warm-beige/40">
              {Object.entries(ratingDetails).map(([star, percentage]) => (
                <div key={star} className="flex items-center space-x-3 text-xs">
                  <span className="text-deep-brown/70 w-12 text-right font-mono text-[10px] uppercase font-bold">{star}</span>
                  <div className="flex-1 h-2 bg-warm-beige/30 rounded-full overflow-hidden border border-warm-beige/40 relative">
                    <div 
                      className="absolute top-0 bottom-0 left-0 bg-terracotta rounded-full"
                      style={{ width: percentage }}
                    />
                  </div>
                  <span className="text-deep-brown/60 w-8 text-right font-mono font-bold">{percentage}</span>
                </div>
              ))}
            </div>

            <div className="bg-warm-beige/10 p-3 rounded-lg border border-warm-beige/45 text-[10px] leading-relaxed text-deep-brown/70">
              <p className="font-semibold text-deep-brown uppercase tracking-wider block mb-1">About Verified Purchases:</p>
              These reviews are compiled from buyers who secured slots path via Tuesday and completed payments. Reviewers sometimes provided photographs of their prepared dishes, shown below.
            </div>
          </div>

          {/* R.H.S: Individual Detailed Reviews listing with Photos (8 Cols) */}
          <div className="lg:col-span-8 space-y-6 lg:border-l lg:border-warm-beige/60 lg:pl-10">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-gold font-bold mb-4 block">
              Top reviews from India & global kitchens
            </h4>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-8">
                {product.reviews.map((review) => (
                  <div key={review.id} className="space-y-3 pb-6 border-b border-warm-beige/40 last:border-none last:pb-0 text-xs">
                    
                    {/* User profile bar */}
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-warm-beige flex items-center justify-center text-deep-brown/50 font-mono text-[10px] font-bold border border-warm-beige/65 uppercase shadow-sm">
                        {review.author.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <span className="font-semibold text-deep-brown text-xs block">{review.author}</span>
                        <span className="text-[9px] text-muted-gold font-mono uppercase tracking-wider leading-none">
                          In {review.location} • Verified Buyer
                        </span>
                      </div>
                    </div>

                    {/* Star Rating & Headline */}
                    <div className="flex items-center space-x-2 pt-1">
                      <div className="flex items-center text-terracotta">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={11} 
                            fill={i < review.rating ? 'currentColor' : 'none'} 
                          />
                        ))}
                      </div>
                      <span className="font-bold text-deep-brown text-sm leading-tight font-serif">
                        {review.headline || "Aromatic masterwork"}
                      </span>
                    </div>

                    {/* Date stamp */}
                    <span className="block text-[10px] text-deep-brown/40 font-mono tracking-wider uppercase">
                      Reviewed on {review.date}
                    </span>

                    {/* Review Body */}
                    <p className="text-deep-brown/85 leading-relaxed font-sans font-light">
                      {review.text}
                    </p>

                    {/* REVIEW WITH PRODUCT IMAGE ATTACHMENT (Zoomable clickable - AMAZING!) */}
                    {review.reviewImage && (
                      <div className="pt-2">
                        <button
                          onClick={() => setSelectedReviewImage({
                            imageUrl: review.reviewImage!,
                            reviewText: review.text,
                            author: review.author
                          })}
                          className="inline-flex flex-col items-start border border-warm-beige rounded-xl overflow-hidden shadow-sm hover:shadow-premium-soft hover:border-terracotta transition-all cursor-pointer bg-cream max-w-[240px] text-left group"
                        >
                          <div className="w-full h-32 overflow-hidden bg-warm-beige">
                            <img
                              src={review.reviewImage}
                              alt="Customer cooked dish snapshot"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="p-2 w-full flex items-center justify-between text-[9px] font-mono font-bold tracking-wider text-muted-gold uppercase bg-white">
                            <span>📷 Click to zoom image</span>
                            <Eye size={10} className="text-terracotta" />
                          </div>
                        </button>
                      </div>
                    )}

                    {/* Helpful upvote panel */}
                    <div className="flex items-center space-x-3 pt-2 text-deep-brown/50">
                      <button
                        onClick={() => handleUpvoteReview(review.id)}
                        disabled={upvotedReviews[review.id]}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border text-[10px] font-mono tracking-wider uppercase transition-all shadow-sm ${
                          upvotedReviews[review.id]
                            ? 'bg-green-500/10 border-green-500/20 text-green-700 font-bold cursor-default'
                            : 'bg-cream hover:bg-warm-beige border-warm-beige/80 text-deep-brown hover:text-terracotta cursor-pointer'
                        }`}
                      >
                        <ThumbsUp size={10} />
                        <span>{upvotedReviews[review.id] ? 'Upvoted!' : 'Helpful'}</span>
                      </button>
                      
                      <span className="text-[10px] font-mono text-deep-brown/40">
                        {reviewVotes[review.id] || 0} customer{reviewVotes[review.id] === 1 ? '' : 's'} found this helpful
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <span className="text-xs font-mono text-deep-brown/40 block py-6">
                No detailed reviews logged yet this batch sequence.
              </span>
            )}
          </div>

        </div>
      )}

      {/* 7. RELATED/RECOMMENDED PRODUCTS SLIDER */}
      <div className="border-t border-warm-beige/60 pt-12">
        <h3 className="font-serif text-2xl font-bold text-deep-brown mb-8 tracking-tight text-center md:text-left">
          Customers also browsed these home-ground jars:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectProduct(p);
                setActiveImage(p.image);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-cream hover:bg-warm-beige/20 border border-warm-beige p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-soft group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-warm-beige/10">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xs italic text-muted-gold">{p.hindiName}</span>
                    <span className="font-mono text-[9px] text-deep-brown/40 uppercase">{p.weight}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-deep-brown group-hover:text-terracotta transition-colors line-clamp-1">
                    {p.name}
                  </h4>
                  <div className="flex items-center space-x-1 text-terracotta">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill={i < Math.floor(p.rating) ? 'currentColor' : 'none'} />
                    ))}
                    <span className="text-[10px] font-mono text-deep-brown/50 ml-1">({p.rating})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-warm-beige/40">
                <span className="font-mono text-xs font-semibold text-terracotta">₹{p.price}</span>
                <span className="text-[10px] font-sans text-deep-brown/40 group-hover:underline uppercase tracking-wider font-bold">
                  View jar →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. DYNAMIC/LIGHTBOX PHOTO VIEWER OVERLAY MODAL */}
      {selectedReviewImage && (
        <div 
          onClick={() => setSelectedReviewImage(null)}
          className="fixed inset-0 z-50 bg-deep-brown/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-cream max-w-4xl w-full rounded-2xl overflow-hidden border border-warm-beige/20 shadow-premium-elevated flex flex-col md:flex-row relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReviewImage(null)}
              className="absolute top-4 right-4 bg-deep-brown/80 backdrop-blur text-cream hover:bg-terracotta p-2 rounded-full focus:outline-none transition-all z-20 cursor-pointer text-xs font-bold font-mono px-3.5 shadow-md uppercase tracking-wider"
            >
              ✕ Close
            </button>

            {/* Photo Column */}
            <div className="md:w-3/5 bg-deep-brown/10 flex items-center justify-center p-4 min-h-[300px] md:min-h-[450px]">
              <img
                src={selectedReviewImage.imageUrl}
                alt="Zoomed customer dish"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md"
              />
            </div>

            {/* Context Review Column */}
            <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-muted-gold font-mono text-[10px] tracking-widest uppercase block bg-warm-beige/20 inline-block px-2.5 py-1 rounded-full font-bold">
                  Reviewer Photo Spotlight
                </span>
                <p className="font-serif text-lg italic text-deep-brown leading-relaxed">
                  {selectedReviewImage.reviewText}
                </p>
                <div className="border-t border-warm-beige/50 pt-4 text-xs font-sans">
                  <span className="block font-bold text-deep-brown">{selectedReviewImage.author}</span>
                  <span className="text-deep-brown/50 uppercase tracking-widest font-mono text-[9px]">Verified Buyer Kitchen</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[10px] font-mono text-deep-brown/40">
                <ShieldCheck size={14} className="text-green-700" />
                <span>100% Genuine Cooked Result</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
