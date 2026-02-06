
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (view: View) => void;
  currentView: View;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigate, currentView }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl z-40 border-b border-stone-50 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div 
          className="text-2xl font-bold tracking-tighter cursor-pointer serif flex items-center gap-3 text-[#2D241E]"
          onClick={() => onNavigate(View.Home)}
        >
          <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          LUMINA LINENS
        </div>

        <div className="hidden md:flex items-center gap-12 text-[11px] font-bold tracking-[0.2em] uppercase text-stone-400">
          <button 
            onClick={() => onNavigate(View.Home)}
            className={`hover:text-[#2D241E] transition-colors ${currentView === View.Home ? 'text-[#2D241E] border-b-2 border-amber-400 pb-1' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate(View.Catalog)}
            className={`hover:text-[#2D241E] transition-colors ${currentView === View.Catalog ? 'text-[#2D241E] border-b-2 border-amber-400 pb-1' : ''}`}
          >
            Collections
          </button>
          <button 
            onClick={() => onNavigate(View.Stylist)}
            className={`flex items-center gap-2 hover:text-[#2D241E] transition-colors ${currentView === View.Stylist ? 'text-[#2D241E] border-b-2 border-amber-400 pb-1' : ''}`}
          >
            <i className="fa-solid fa-sparkles text-amber-500"></i>
            Stylist
          </button>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate(View.Admin)}
            className={`text-stone-300 hover:text-amber-600 transition-colors ${currentView === View.Admin ? 'text-amber-600' : ''}`}
            title="Owner Sanctuary"
          >
            <i className="fa-solid fa-user-gear text-lg"></i>
          </button>
          <button className="text-stone-400 hover:text-[#2D241E]">
            <i className="fa-solid fa-magnifying-glass text-lg"></i>
          </button>
          <button 
            onClick={onOpenCart}
            className="relative text-stone-400 hover:text-[#2D241E]"
          >
            <i className="fa-solid fa-bag-shopping text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
