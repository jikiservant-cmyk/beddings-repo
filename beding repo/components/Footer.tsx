
import React from 'react';
import { View } from '../types';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div className="text-2xl font-bold tracking-tighter serif">LUMINA LINENS</div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Crafting premium bedroom essentials for the modern sanctuary. Sustainable, ethical, and designed for life.
          </p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-amber-500 transition-colors"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-amber-500 transition-colors"><i className="fa-brands fa-pinterest"></i></a>
            <a href="#" className="hover:text-amber-500 transition-colors"><i className="fa-brands fa-tiktok"></i></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Collections</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><button onClick={() => onNavigate(View.Catalog)} className="hover:text-white transition-colors">Bed Sheets</button></li>
            <li><button onClick={() => onNavigate(View.Catalog)} className="hover:text-white transition-colors">Duvet Sets</button></li>
            <li><button onClick={() => onNavigate(View.Catalog)} className="hover:text-white transition-colors">Pillows & Shams</button></li>
            <li><button onClick={() => onNavigate(View.Catalog)} className="hover:text-white transition-colors">Weighted Blankets</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Service</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><button onClick={() => onNavigate(View.Stylist)} className="hover:text-white transition-colors">Sleep Stylist AI</button></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Fabric Care Guide</a></li>
            <li><button onClick={() => onNavigate(View.Admin)} className="text-amber-600 hover:text-amber-500 font-bold">Owner Portal</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-6">Join our circle for exclusive early access and sleep tips.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-transparent border border-gray-700 px-4 py-2 text-sm focus:outline-none focus:border-white flex-grow"
            />
            <button className="bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors">Join</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-500 uppercase tracking-widest">
        <p>&copy; 2024 Lumina Linens. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Accessibility</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
