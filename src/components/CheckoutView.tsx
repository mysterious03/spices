import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, ArrowRight, CreditCard, Banknote, Sparkles, Check, CheckCircle, Smartphone } from 'lucide-react';
import { CartItem, Product, OrderDetails } from '../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  cartCount: number;
  onClearCart: () => void;
  onGoBackToCart: () => void;
}

type CheckoutStep = 'address' | 'payment' | 'confirm';

export default function CheckoutView({ cartItems, cartCount, onClearCart, onGoBackToCart }: CheckoutViewProps) {
  const [step, setStep] = useState<CheckoutStep>('address');
  const [formData, setFormData] = useState<OrderDetails>({
    fullName: '',
    phone: '',
    addressLines: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
    upiId: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const itemsSubtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const packagingFee = cartItems.length > 0 ? 30 : 0;
  const deliveryFee = itemsSubtotal > 700 ? 0 : 60;
  const totalAmount = itemsSubtotal + packagingFee + deliveryFee;

  const validateAddress = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Please enter a valid 10-digit phone number.';
    if (!formData.addressLines.trim()) newErrors.addressLines = 'Please specify your cottage/apartment street address.';
    if (!formData.city.trim()) newErrors.city = 'Please enter your home city.';
    if (!formData.postalCode.trim() || formData.postalCode.length < 6) newErrors.postalCode = 'Please enter your 6-digit postal code.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: { [key: string]: string } = {};
    if (formData.paymentMethod === 'upi') {
      if (!formData.upiId?.trim() || !formData.upiId.includes('@')) {
        newErrors.upiId = 'Please enter a valid UPI address (e.g., name@okaxis).';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 'address') {
      if (validateAddress()) {
        setStep('payment');
        setErrors({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (step === 'payment') {
      if (validatePayment()) {
        setStep('confirm');
        setErrors({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBackStep = () => {
    if (step === 'payment') {
      setStep('address');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onGoBackToCart();
    }
  };

  const handleFinalCheckout = () => {
    // Already in 'confirm' success state
    onClearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 page-transition">

      {/* STEPPED PROGRESS INDICATOR */}
      <div className="mb-12 mt-8">
        <div className="relative py-4 flex items-center justify-between">
          
          {/* Progress Grey Bar */}
          <div className="absolute top-1/2 left-0 right-0 h-[2.5px] bg-warm-beige -translate-y-1/2 z-0"></div>
          
          {/* Active Highlighted Progress line */}
          <div 
            className="absolute top-1/2 left-0 h-[2.5px] bg-terracotta -translate-y-1/2 z-0 transition-all duration-500"
            style={{
              width: step === 'address' ? '33%' : step === 'payment' ? '66%' : '100%'
            }}
          ></div>

          {/* Steps list dots */}
          {([
            { id: 'cart', label: 'Cart', active: true, done: true },
            { id: 'address', label: 'Address', active: step === 'address' || step === 'payment' || step === 'confirm', done: step === 'payment' || step === 'confirm' },
            { id: 'payment', label: 'Payment', active: step === 'payment' || step === 'confirm', done: step === 'confirm' },
            { id: 'confirm', label: 'Confirm', active: step === 'confirm', done: step === 'confirm' }
          ] as const).map((s, idx) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-300 ${
                  s.done 
                    ? 'bg-terracotta border-terracotta text-cream shadow-md' 
                    : s.active 
                    ? 'bg-cream border-terracotta text-terracotta scale-110 font-black font-mono shadow' 
                    : 'bg-warm-beige/65 border-warm-beige text-deep-brown/40'
                }`}
              >
                {s.done && s.id !== 'confirm' ? <Check size={12} /> : idx + 1}
              </div>
              <span className={`text-[10px] uppercase tracking-widest mt-2 font-semibold ${s.active ? 'text-deep-brown' : 'text-deep-brown/30'}`}>
                {s.label}
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* CHANNELS CONTAINER */}
      {step !== 'confirm' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT FORM BLOCK */}
          <div className="lg:col-span-7 bg-cream border border-warm-beige/60 rounded-[28px] p-6 sm:p-8 space-y-6">
            
            {step === 'address' ? (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-deep-brown mb-1">
                    Cottage Shipping Address
                  </h2>
                  <p className="text-xs text-deep-brown/50">
                    We only package for domestic speed postage. Specify where your masala batch is delivery-scheduled.
                  </p>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] tracking-widest uppercase text-deep-brown/60 font-bold font-sans">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ananya Roy Deshmukh"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full bg-warm-beige/25 border-b focus:outline-none focus:border-terracotta px-3 py-2 text-sm text-deep-brown ${
                      errors.fullName ? 'border-red-500' : 'border-deep-brown/15'
                    }`}
                  />
                  {errors.fullName && <p className="text-[10px] text-red-600 font-bold font-sans font-semibold">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="block text-[10px] tracking-widest uppercase text-deep-brown/60 font-bold font-sans flex items-center space-x-1">
                    <Smartphone size={10} />
                    <span>Phone Number (Whatsapp-Linked Preferred)</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9999999999"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    className={`w-full bg-warm-beige/25 border-b focus:outline-none focus:border-terracotta px-3 py-2 text-sm text-deep-brown ${
                      errors.phone ? 'border-red-500' : 'border-deep-brown/15'
                    }`}
                  />
                  {errors.phone && <p className="text-[10px] text-red-600 font-bold font-sans font-semibold">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label className="block text-[10px] tracking-widest uppercase text-deep-brown/60 font-bold font-sans">
                    Cottage, Flat, or Street Details
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Apt 4B, Heritage Mansions, Old Colony"
                    value={formData.addressLines}
                    onChange={(e) => setFormData({ ...formData, addressLines: e.target.value })}
                    className={`w-full bg-warm-beige/25 border-b focus:outline-none focus:border-terracotta px-3 py-2 text-sm text-deep-brown resize-none ${
                      errors.addressLines ? 'border-red-500' : 'border-deep-brown/15'
                    }`}
                  />
                  {errors.addressLines && <p className="text-[10px] text-red-600 font-bold font-sans font-semibold">{errors.addressLines}</p>}
                </div>

                {/* City and postal code */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] tracking-widest uppercase text-deep-brown/60 font-bold font-sans">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Pune"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`w-full bg-warm-beige/25 border-b focus:outline-none focus:border-terracotta px-3 py-2 text-sm text-deep-brown ${
                        errors.city ? 'border-red-500' : 'border-deep-brown/15'
                      }`}
                    />
                    {errors.city && <p className="text-[10px] text-red-600 font-bold font-sans font-semibold">{errors.city}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] tracking-widest uppercase text-deep-brown/60 font-bold font-sans">
                      postal code (6 Digits)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="411001"
                      maxLength={6}
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value.replace(/\D/g, '') })}
                      className={`w-full bg-warm-beige/25 border-b focus:outline-none focus:border-terracotta px-3 py-2 text-sm text-deep-brown ${
                        errors.postalCode ? 'border-red-500' : 'border-deep-brown/15'
                      }`}
                    />
                    {errors.postalCode && <p className="text-[10px] text-red-600 font-bold font-sans font-semibold">{errors.postalCode}</p>}
                  </div>
                </div>

              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-deep-brown mb-1">
                    Authentic Payment Options
                  </h2>
                  <p className="text-xs text-deep-brown/50">
                    Secure checkout. Pay via direct UPI or Cash-on-Delivery at doorstep.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  {/* UPI Radio */}
                  <label className={`flex items-start space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${
                    formData.paymentMethod === 'upi' ? 'bg-cream border-terracotta' : 'bg-transparent border-warm-beige/80 hover:bg-warm-beige/10'
                  }`}>
                    <input
                      type="radio"
                      name="payment_opt"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className="mt-1 text-terracotta focus:ring-terracotta"
                    />
                    <div className="space-y-1">
                      <span className="font-serif font-black text-sm text-deep-brown flex items-center space-x-1.5">
                        <CreditCard size={14} className="text-terracotta" />
                        <span>Instant UPI Transfer</span>
                      </span>
                      <span className="block text-xs text-deep-brown/60 leading-relaxed font-sans">
                        Fast-grind speed shipping. Enter your UPI ID below. A prompt request will be transmitted to resolve pay.
                      </span>
                      
                      {formData.paymentMethod === 'upi' && (
                        <div className="pt-2 space-y-1.5">
                          <input
                            type="text"
                            placeholder="ananya@okaxis"
                            value={formData.upiId || ''}
                            onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                            className="w-full bg-cream focus:outline-none focus:border-terracotta px-2.5 py-1.5 border border-deep-brown/15 text-xs text-deep-brown rounded-md"
                          />
                          {errors.upiId && <p className="text-[9px] text-red-600 font-bold font-sans font-semibold">{errors.upiId}</p>}
                        </div>
                      )}
                    </div>
                  </label>

                  {/* COD Radio */}
                  <label className={`flex items-start space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${
                    formData.paymentMethod === 'cod' ? 'bg-cream border-terracotta' : 'bg-transparent border-warm-beige/80 hover:bg-warm-beige/10'
                  }`}>
                    <input
                      type="radio"
                      name="payment_opt"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="mt-1 text-terracotta focus:ring-terracotta"
                    />
                    <div className="space-y-1">
                      <span className="font-serif font-black text-sm text-deep-brown flex items-center space-x-1.5">
                        <Banknote size={14} className="text-terracotta" />
                        <span>Cash On Delivery (COD)</span>
                      </span>
                      <span className="block text-xs text-deep-brown/60 leading-relaxed font-sans">
                        Pay ₹{totalAmount} in paper cash directly to the logistics representative upon physical receipt.
                      </span>
                    </div>
                  </label>

                </div>

              </div>
            )}

            {/* Stepper buttons trigger */}
            <div className="flex items-center justify-between pt-6 border-t border-warm-beige/50">
              <button
                onClick={handleBackStep}
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-deep-brown/60 hover:text-deep-brown cursor-pointer"
              >
                <ArrowLeft size={13} />
                <span>Go Back</span>
              </button>

              <button
                onClick={handleNextStep}
                className="bg-deep-brown hover:bg-deep-brown/95 text-cream px-8 py-3 rounded-full font-serif font-bold text-sm tracking-widest uppercase transition-all shadow flex items-center space-x-2 cursor-pointer"
              >
                <span>{step === 'address' ? 'Payment Routing' : 'Resolve Order'}</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

          {/* RIGHT SIDE CART SUMMARY PRE-PREVIEW */}
          <div className="lg:col-span-5 bg-warm-beige/25 border border-warm-beige/70 p-6 rounded-[24px] space-y-6">
            <h3 className="font-serif text-xl font-bold text-deep-brown border-b border-warm-beige pb-3">
              Summary of Batch
            </h3>

            {/* Mini thumbnails */}
            <div className="max-h-48 overflow-y-auto space-y-3 pr-2 no-scrollbar">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3 bg-cream/70 p-2 rounded-xl">
                  <div className="w-12 aspect-square rounded-lg overflow-hidden bg-warm-beige flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="min-w-0 flex-grow font-sans text-xs">
                    <span className="block font-bold truncate text-deep-brown">{item.product.name}</span>
                    <span className="block text-[10px] text-deep-brown/50">{item.quantity} jar(s) • ₹{item.product.price}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-deep-brown">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Price lines */}
            <div className="space-y-2 text-xs border-t border-warm-beige pt-4">
              <div className="flex justify-between">
                <span className="text-deep-brown/60">Provisions Value</span>
                <span className="font-mono">₹{itemsSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Wax Packing Seal</span>
                <span className="font-mono">+ ₹{packagingFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Postage Logistics</span>
                <span className="font-mono">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="border-t border-warm-beige pt-3 flex justify-between font-serif text-base font-bold text-deep-brown">
                <span>Estimated Sum</span>
                <span className="font-mono">₹{totalAmount}</span>
              </div>
            </div>

            <div className="bg-cream p-3 rounded-xl border border-warm-beige/50 flex items-start space-x-2 text-[10px]">
              <ShieldCheck size={14} className="text-terracotta mt-0.5" />
              <span className="text-deep-brown/60 leading-relaxed font-sans">
                Every jar contains strict batch tags signed by Meera Tai's mill team for complete biological traceability.
              </span>
            </div>

          </div>

        </div>
      ) : (
        /* CONFIRM / CONGRATULATIONS SCREEN (confetti element) */
        <div className="text-center py-16 bg-cream border border-warm-beige rounded-[32px] max-w-2xl mx-auto p-8 space-y-8 shadow-premium-elevated relative overflow-hidden">
          
          {/* Simulated floating spice specs confetti */}
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            <span className="absolute top-10 left-12 text-2xl animate-bounce">🍂</span>
            <span className="absolute bottom-20 left-6 text-xl animate-float">🌶️</span>
            <span className="absolute top-24 right-14 text-sm animate-pulse-subtle">✨</span>
            <span className="absolute bottom-10 right-14 text-xl animate-bounce">🟡</span>
            <span className="absolute top-1/2 left-10 text-xs animate-ping">⚫</span>
          </div>

          <div className="relative z-10 space-y-6">
            
            {/* Green verification tick badge */}
            <div className="w-16 h-16 rounded-full bg-green-700/10 border border-green-700/20 text-green-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle size={36} strokeWidth={1} className="animate-spin-slow" style={{ animationDuration: '4s' }} />
            </div>

            <div className="space-y-2">
              <span className="text-terracotta tracking-[0.25em] uppercase text-[10px] font-bold block">
                ORDER COMPLETED SUCCESSFULLY
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-deep-brown leading-tight">
                Your jar cache has been secured
              </h1>
              <p className="text-xs text-deep-brown/60 max-w-md mx-auto leading-relaxed">
                Thank you for supporting Meera Tai and our rural village weavers. Your small-batch order is officially logged into Tuesday’s upcoming grind slot.
              </p>
            </div>

            {/* Simulated confirmation document card */}
            <div className="bg-warm-beige/20 border border-warm-beige/50 rounded-2xl p-5 text-left max-w-md mx-auto space-y-4">
              <div className="flex justify-between items-center text-xs font-mono border-b border-warm-beige pb-2 text-deep-brown/60">
                <span>Receipt #SG-2026-0492</span>
                <span className="font-sans font-bold text-deep-brown uppercase tracking-widest text-[9px]">{formData.paymentMethod} Payment</span>
              </div>

              <div className="space-y-1.5 text-xs font-sans">
                <div><span className="text-deep-brown/50">Recipient:</span> <span className="font-bold text-deep-brown">{formData.fullName}</span></div>
                <div><span className="text-deep-brown/50">Postage to:</span> <span className="text-deep-brown/85">{formData.addressLines}, {formData.city} - {formData.postalCode}</span></div>
                <div><span className="text-deep-brown/50 font-semibold text-terracotta">Tuesday Shipment window:</span> <span className="text-deep-brown font-semibold animate-pulse">Tuesday, June 30th Batch #047</span></div>
              </div>

              <div className="border-t border-warm-beige pt-2 flex justify-between items-center text-xs font-bold font-serif text-deep-brown">
                <span>Sum Settled:</span>
                <span className="font-mono">₹{totalAmount}</span>
              </div>
            </div>

            {/* Custom CTA triggering WhatsApp confirm/share */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              
              <button
                onClick={() => {
                  const wsMsg = encodeURIComponent(
                    `Namaste! I just placed receipt #SG-2026-0492 on Slow Grinds for standard ₹${totalAmount} batch jars shipping directly to ${formData.city}. Can't wait!`
                  );
                  window.open(`https://wa.me/919999999999?text=${wsMsg}`, '_blank');
                }}
                className="w-full sm:w-auto bg-green-700 hover:bg-green-700/90 text-cream px-8 py-3 rounded-full font-sans font-medium text-xs tracking-widest uppercase transition-all flex items-center justify-center space-x-2 shadow cursor-pointer"
              >
                <span>Notify Crafters via WhatsApp</span>
              </button>

              <button
                onClick={handleFinalCheckout}
                className="w-full sm:w-auto bg-deep-brown hover:bg-deep-brown/90 text-cream px-8 py-3 rounded-full font-serif font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Return to Home</span>
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
