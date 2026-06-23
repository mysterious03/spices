import React from 'react';
import { ShoppingBag, ChevronRight, Trash2, ArrowLeft, ArrowRight, Truck, Info } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartViewProps {
  cartItems: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQty: (productId: string, qty: number) => void;
  onCheckout: () => void;
  onBrowseSpices: () => void;
}

export default function CartView({ cartItems, onRemoveItem, onUpdateQty, onCheckout, onBrowseSpices }: CartViewProps) {
  
  // Calculate pricing breakdown
  const itemsSubtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const packagingFee = cartItems.length > 0 ? 30 : 0; // Linen wrapping & clay jars preservation fee
  const deliveryFee = itemsSubtotal > 700 ? 0 : 60; // Free shipping above 700 INR
  const totalAmount = itemsSubtotal + packagingFee + deliveryFee;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 page-transition">
      
      {/* Title */}
      <div className="mb-12 mt-8 space-y-2">
        <span className="text-terracotta tracking-[0.2em] uppercase text-[10px] font-bold block">
          YOUR SELECTIONS
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-deep-brown tracking-tight">
          Your Spice Atelier Cart
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-warm-beige/10 rounded-[28px] border border-dashed border-warm-beige/80 space-y-6">
          <div className="text-4xl text-muted-gold select-none">🍯</div>
          <h2 className="font-serif text-2xl italic text-deep-brown/70 font-medium">Your jar cache is currently empty</h2>
          <p className="text-xs text-deep-brown/55 max-w-sm mx-auto font-sans leading-relaxed">
            Meera Tai has not ground any masalas for your kitchen yet. Return to the Provisions list to select your active Tuesday blends.
          </p>
          <button
            onClick={onBrowseSpices}
            className="bg-deep-brown hover:bg-deep-brown/90 text-cream px-8 py-3 rounded-full font-serif font-bold text-sm tracking-widest uppercase transition-all shadow-md inline-flex items-center space-x-2 cursor-pointer"
          >
            <span>Browse Products</span>
            <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column - Product Items list */}
          <div className="lg:col-span-7 space-y-6">
            {cartItems.map((item) => (
              <div 
                key={item.product.id}
                className="flex items-center space-x-4 bg-cream border border-warm-beige/50 p-4 rounded-2xl shadow-premium-soft hover:shadow-premium-elevated transition-shadow"
              >
                
                {/* Thumb icon */}
                <div className="w-20 aspect-square rounded-xl overflow-hidden bg-warm-beige/25 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0 space-y-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-serif text-base font-bold text-deep-brown truncate mr-2">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 text-deep-brown/40 hover:text-terracotta cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={14} strokeWidth={1.8} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono font-bold text-muted-gold">
                    <span>₹{item.product.price} / {item.product.weight}</span>
                    <span className="text-deep-brown italic font-serif">₹{item.product.price * item.quantity}</span>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-deep-brown/20 rounded-full py-1 px-2.5 bg-cream">
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                        className="p-0.5 text-deep-brown/60 hover:text-terracotta text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-4 font-mono font-semibold text-xs text-deep-brown w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                        className="p-0.5 text-deep-brown/60 hover:text-terracotta text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}

            {/* Back to catalog button link */}
            <button
              onClick={onBrowseSpices}
              className="inline-flex items-center space-x-2 text-xs font-sans tracking-widest uppercase font-bold text-deep-brown hover:text-terracotta transition-colors pt-2 cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Continue Adding Provisions</span>
            </button>
          </div>

          {/* Right Column - Premium Cost Summary */}
          <div className="lg:col-span-5 bg-warm-beige/30 border border-warm-beige/70 rounded-[24px] p-6 space-y-6">
            
            <h2 className="font-serif text-2xl font-semibold text-deep-brown border-b border-warm-beige/80 pb-3">
              Order Summary
            </h2>

            {/* Price lines */}
            <div className="space-y-3 text-xs font-sans">
              
              <div className="flex justify-between items-center text-deep-brown/80">
                <span>Jar Provisions Subtotal</span>
                <span className="font-mono font-semibold text-deep-brown">₹{itemsSubtotal}</span>
              </div>

              {/* Artisan specific linen fee */}
              <div className="flex justify-between items-center text-deep-brown/80">
                <div className="flex items-center space-x-1">
                  <span>Linen Wax Capping Seal ({cartItems.length} jars)</span>
                  <div className="group relative">
                    <Info size={11} className="text-muted-gold cursor-help" />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-deep-brown text-cream text-[9px] rounded px-2 py-1 w-40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                      Every glass jar is hand-poured with sealing wax and covered in coarse organic linen to prevent air infiltration during transit.
                    </span>
                  </div>
                </div>
                <span className="font-mono font-semibold text-deep-brown">+ ₹{packagingFee}</span>
              </div>

              <div className="flex justify-between items-center text-deep-brown/80">
                <span>Hand-delivery Logistics</span>
                <span className="font-mono font-semibold text-deep-brown">
                  {deliveryFee === 0 ? <span className="text-green-700 font-bold">FREE (GIFTED)</span> : `₹${deliveryFee}`}
                </span>
              </div>

              {/* Free delivery banner */}
              {itemsSubtotal < 700 ? (
                <div className="bg-cream/50 p-2.5 rounded-lg border border-warm-beige text-[10px] text-deep-brown/60 text-center font-light leading-snug">
                  Add just <span className="font-semibold text-terracotta">₹{700 - itemsSubtotal}</span> more value to unlock <span className="font-semibold text-green-700">Gifted Delivery Logistics</span>.
                </div>
              ) : (
                <div className="bg-green-700/5 p-2.5 rounded-lg border border-green-700/20 text-[10px] text-green-700 text-center font-semibold leading-none">
                  ✔ Gifted Delivery Logistics Unlocked
                </div>
              )}

              <div className="border-t border-warm-beige/80 pt-3 flex justify-between items-center text-base font-serif font-bold text-deep-brown">
                <span>Estimated Sum</span>
                <span className="font-mono">₹{totalAmount}</span>
              </div>

            </div>

            {/* Custom delivery estimate */}
            <div className="p-3.5 bg-cream border border-warm-beige rounded-xl flex items-start space-x-3 text-xs">
              <Truck size={16} className="text-terracotta mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <span className="block font-bold text-deep-brown font-serif">Tuesday's Grind Shipment</span>
                <span className="block text-[11px] text-deep-brown/70 leading-relaxed font-sans">
                  The active batch ships directly from our mud outpost this coming Tuesday, arriving at your doorstep via speed logistics in <span className="font-semibold">3-4 business days</span>.
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={onCheckout}
              className="w-full bg-terracotta hover:bg-terracotta/90 text-cream py-3 rounded-full font-serif font-bold text-sm tracking-widest uppercase transition-all shadow-premium-soft flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Secure Batch Slots</span>
              <ChevronRight size={15} className="transform group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
