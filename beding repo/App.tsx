
import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem, View, ChatMessage } from './types';
import { PRODUCTS, CATALOG_HIERARCHY } from './constants';
import { encryptData, decryptData } from './utils/crypto';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import AIAdvisor from './components/AIAdvisor';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  
  // Persistence state
  const [inventory, setInventory] = useState<Product[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your Lumina Sleep Stylist. Are you looking for crisp cool sheets, or something buttery soft for the winter? Tell me about how you sleep!" }
  ]);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial Load Logic
  useEffect(() => {
    // Load Inventory
    const savedInventory = localStorage.getItem('lumina_vault');
    if (savedInventory) {
      const decrypted = decryptData(savedInventory);
      if (decrypted && Array.isArray(decrypted)) setInventory(decrypted);
      else setInventory(PRODUCTS);
    } else {
      setInventory(PRODUCTS);
    }

    // Load Chat History
    const savedChat = localStorage.getItem('lumina_whispers');
    if (savedChat) {
      const decryptedChat = decryptData(savedChat);
      if (decryptedChat && Array.isArray(decryptedChat)) setChatHistory(decryptedChat);
    }

    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('lumina_vault', encryptData(inventory));
      localStorage.setItem('lumina_whispers', encryptData(chatHistory));
    }
  }, [inventory, chatHistory, isLoaded]);

  const filteredProducts = useMemo(() => {
    let results = inventory;
    if (selectedCategory !== 'All') {
      results = results.filter(p => p.category === selectedCategory);
    }
    if (selectedSubcategory !== 'All') {
      results = results.filter(p => p.subcategory === selectedSubcategory);
    }
    return results;
  }, [inventory, selectedCategory, selectedSubcategory]);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setCurrentView(View.Home);
    window.scrollTo(0, 0);
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubcategory('All');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={navigateTo}
        currentView={currentView}
      />

      <main className="flex-grow pt-20">
        {currentView === View.Home && (
          <>
            <Hero onShopNow={() => navigateTo(View.Catalog)} onAskAI={() => navigateTo(View.Stylist)} />
            <section className="max-w-7xl mx-auto px-6 py-20">
              <div className="flex flex-col mb-12">
                <h2 className="text-4xl font-bold mb-4 text-[#4A3F35]">Curated Collections</h2>
                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={() => handleCategoryChange('All')}
                    className={`px-6 py-2 rounded-full border transition-all ${
                      selectedCategory === 'All' ? 'bg-[#5C4D42] text-white shadow-md' : 'bg-transparent text-[#9C8F85] border-[#EAE3DC]'
                    }`}
                  >
                    All
                  </button>
                  {Object.keys(CATALOG_HIERARCHY).map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-6 py-2 rounded-full border transition-all ${
                        selectedCategory === cat ? 'bg-[#5C4D42] text-white shadow-md' : 'bg-transparent text-[#9C8F85] border-[#EAE3DC]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <ProductGrid products={filteredProducts} onProductClick={(p) => { setSelectedProduct(p); navigateTo(View.ProductDetail); }} />
            </section>
          </>
        )}

        {currentView === View.Catalog && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-5xl font-bold mb-12 text-center text-[#4A3F35]">Our Catalog</h1>
            <div className="mb-12">
              <div className="flex justify-center flex-wrap gap-4 mb-8">
                <button
                  onClick={() => handleCategoryChange('All')}
                  className={`px-8 py-3 rounded-full border transition-all ${
                    selectedCategory === 'All' ? 'bg-[#5C4D42] text-white shadow-md' : 'bg-transparent text-[#9C8F85] border-[#EAE3DC]'
                  }`}
                >
                  All Categories
                </button>
                {Object.keys(CATALOG_HIERARCHY).map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-8 py-3 rounded-full border transition-all ${
                      selectedCategory === cat ? 'bg-[#5C4D42] text-white shadow-md' : 'bg-transparent text-[#9C8F85] border-[#EAE3DC]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <ProductGrid products={filteredProducts} onProductClick={(p) => { setSelectedProduct(p); navigateTo(View.ProductDetail); }} />
          </section>
        )}

        {currentView === View.ProductDetail && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={addToCart} 
            onBack={() => navigateTo(View.Catalog)}
          />
        )}

        {currentView === View.Stylist && (
          <AIAdvisor 
            messages={chatHistory} 
            setMessages={setChatHistory} 
          />
        )}

        {currentView === View.Admin && (
          <AdminPanel 
            onAddProduct={(p) => { setInventory(prev => [...prev, p]); navigateTo(View.Catalog); }} 
            allProducts={inventory}
            onDeleteProduct={(id) => setInventory(prev => prev.filter(p => p.id !== id))}
            isAuthenticated={isAdminAuth}
            onLogin={setIsAdminAuth}
            onLogout={() => { setIsAdminAuth(false); navigateTo(View.Home); }}
            chatLogs={chatHistory}
          />
        )}

        {currentView === View.Checkout && (
          <Checkout 
            items={cart} 
            onComplete={handleCheckoutComplete} 
            onBack={() => navigateTo(View.Catalog)}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        onCheckout={() => { setIsCartOpen(false); navigateTo(View.Checkout); }}
      />
    </div>
  );
};

export default App;
