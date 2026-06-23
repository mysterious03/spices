import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { ActivePage } from '../types';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  cartCount: number;
}

export default function Navbar({ activePage, setActivePage, cartCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Products', page: 'products' },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-cream/90 backdrop-blur-md border-b border-warm-beige/50 shadow-premium-soft py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo - Serif modern branding */}
          <button
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-2 text-left group cursor-pointer"
          >
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-deep-brown group-hover:text-terracotta transition-colors">
                SLOW GRINDS
              </span>
              <span className="block text-[8px] tracking-[0.3em] text-muted-gold font-mono -mt-1 font-semibold">
                AN ATELIER OF SPICES
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  setActivePage(item.page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`font-sans text-sm tracking-widest uppercase font-medium relative py-1 cursor-pointer transition-colors ${
                  activePage === item.page || (item.page === 'products' && activePage === 'product-details')
                    ? 'text-terracotta'
                    : 'text-deep-brown hover:text-terracotta'
                }`}
              >
                {item.label}
                {(activePage === item.page || (item.page === 'products' && activePage === 'product-details')) && (
                  <span 
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-terracotta animate-pulse"
                    style={{ animationDuration: '1.5s' }}
                  />
                )}
              </button>
            ))}
            
            {/* Custom Contact Trigger anchor */}
            <a
              href="#contact"
              onClick={(e) => {
                if (activePage !== 'home') {
                  setActivePage('home');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="font-sans text-sm tracking-widest uppercase font-medium text-deep-brown hover:text-terracotta"
            >
              Contact
            </a>
          </div>

          {/* Cart Icon & Mobile Hambuger */}
          <div className="flex items-center space-x-4">
            
            {/* Minimal Sticky Cart button */}
            <button
              onClick={() => {
                setActivePage('cart');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative p-2 text-deep-brown hover:text-terracotta transition-colors flex items-center justify-center cursor-pointer"
              title="View Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-terracotta text-cream text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold tracking-tighter shadow-md animate-bounce">
                  {cartCount}
                </div>
              )}
            </button>

            {/* Mobile menu action */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-deep-brown hover:text-terracotta transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-cream/98 border-b border-warm-beige/60 py-6 px-12 flex flex-col space-y-6 shadow-premium-elevated animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  setActivePage(item.page);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left font-sans text-sm tracking-widest uppercase font-semibold py-2 transition-colors ${
                  activePage === item.page ? 'text-terracotta' : 'text-deep-brown'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <a
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (activePage !== 'home') {
                  setActivePage('home');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-left font-sans text-sm tracking-widest uppercase font-semibold py-2 text-deep-brown"
            >
              Contact
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
