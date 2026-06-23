/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ListingView from './components/ListingView';
import DetailsView from './components/DetailsView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import { ActivePage, CartItem, Product } from './types';
import { MASALA_PRODUCTS } from './data';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(MASALA_PRODUCTS[0]);
  
  // Cart persistence state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const local = localStorage.getItem('slow_grinds_cart');
      return local ? JSON.parse(local) : [];
    } catch (e) {
      console.error("Failed to parse local cart state, resetting.", e);
      return [];
    }
  });

  // Desktop magnetic cursor coordinates state
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Save cart state
    localStorage.setItem('slow_grinds_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // Detect viewport and track mouse on desktop
    const checkViewport = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);

    const trackMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (window.innerWidth > 1024) {
      window.addEventListener('mousemove', trackMouse);
    }

    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('mousemove', trackMouse);
    };
  }, []);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity }];
    });
    
    // Smooth scroll to top and transition to Cart View
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInstantBuy = (product: Product, quantity: number) => {
    // Add item, go directly to checkout
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity = quantity; // Update directly
        return next;
      }
      return [...prev, { product, quantity }];
    });
    
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateCartQty = (productId: string, qty: number) => {
    setCartItems((prev) => {
      if (qty < 1) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity: qty };
        }
        return item;
      });
    });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const renderActiveView = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomeView
            onShopNow={() => {
              setActivePage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              setActivePage('product-details');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'products':
        return (
          <ListingView
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              setActivePage('product-details');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
          />
        );
      case 'product-details':
        return (
          <DetailsView
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onInstantBuy={handleInstantBuy}
            onBack={() => {
              setActivePage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'cart':
        return (
          <CartView
            cartItems={cartItems}
            onRemoveItem={handleRemoveCartItem}
            onUpdateQty={handleUpdateCartQty}
            onCheckout={() => {
              setActivePage('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBrowseSpices={() => {
              setActivePage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'checkout':
        return (
          <CheckoutView
            cartItems={cartItems}
            cartCount={cartCount}
            onClearCart={() => {
              setCartItems([]);
              setActivePage('home');
            }}
            onGoBackToCart={() => {
              setActivePage('cart');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader onFinished={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen bg-cream text-deep-brown selection:bg-terracotta selection:text-cream">
          {/* Custom Cursor Glow (Desktop Only) */}
          {isDesktop && (
            <div
              className="cursor-glow pointer-events-none fixed"
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
              }}
            />
          )}

          {/* Minimal sticky navbar */}
          <Navbar
            activePage={activePage}
            setActivePage={setActivePage}
            cartCount={cartCount}
          />

          {/* Content Space with transition revealed */}
          <main className="transition-all duration-300">
            {renderActiveView()}
          </main>
        </div>
      )}
    </>
  );
}

