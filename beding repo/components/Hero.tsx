
import React from 'react';

interface HeroProps {
  onShopNow: () => void;
  onAskAI: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow, onAskAI }) => {
  return (
    <section className="relative h-[85vh] overflow-hidden flex items-center justify-center">
      <img 
        src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2000" 
        alt="Luxury Bedding"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 text-center text-white px-6">
        <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          Fall Collection 2024
        </span>
        <h1 className="text-5xl md:text-8xl font-bold mb-6 max-w-4xl leading-tight">
          Redefine Your <br /><span className="italic serif">Restful Haven</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Artisan-crafted linens made from the world's finest organic fibers. Experience the transformative power of a perfect night's sleep.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onShopNow}
            className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all transform active:scale-95"
          >
            Explore Collections
          </button>
          <button 
            onClick={onAskAI}
            className="w-full sm:w-auto px-10 py-4 bg-black/40 backdrop-blur-md text-white border border-white/30 font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-sparkles text-amber-400"></i>
            Find My Style
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <i className="fa-solid fa-chevron-down text-white/50 text-2xl"></i>
      </div>
    </section>
  );
};

export default Hero;
