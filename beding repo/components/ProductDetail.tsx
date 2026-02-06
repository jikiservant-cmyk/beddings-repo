
import React, { useState } from 'react';
import { Product } from '../types';
import { SIZES } from '../constants';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  const [selectedSize, setSelectedSize] = useState(SIZES[2]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 animate-fadeIn">
      <button 
        onClick={onBack}
        className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#C4A484] hover:text-[#5C4D42] mb-12 transition-colors"
      >
        <i className="fa-solid fa-arrow-left"></i>
        Return to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div className="aspect-[4/5] bg-[#F3EFEA] rounded-[2rem] overflow-hidden shadow-xl">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-[#F3EFEA] rounded-2xl overflow-hidden cursor-pointer group shadow-sm">
                <img 
                  src={`https://picsum.photos/seed/${product.id + i}/600/600`} 
                  alt={`${product.name} alternate view`}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-[#C4A484] font-bold uppercase tracking-[0.2em] text-[10px] mb-4 inline-block">{product.category} &bull; {product.subcategory}</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-2 mb-4 text-[#4A3F35] leading-tight">{product.name}</h1>
          <p className="text-xl italic serif text-[#9C8F85] mb-8">{product.material}</p>
          
          <div className="flex items-center gap-4 mb-10">
            <div className="flex text-amber-300">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fa-solid fa-star"></i>
              ))}
            </div>
            <span className="text-xs font-bold tracking-widest text-[#D1C7BC] border-l border-[#EAE3DC] pl-4 uppercase">248 Reviews</span>
          </div>

          <p className="text-4xl font-bold mb-10 text-[#5C4D42]">
            <span className="text-xs font-bold mr-2 text-[#C4A484]">UGX</span>
            {product.price.toLocaleString()}
          </p>
          
          <p className="text-[#7D6F64] leading-relaxed mb-12 text-lg font-medium">
            {product.description}
          </p>

          <div className="mb-12">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8F85] mb-5">Sanctuary Size</label>
            <div className="flex flex-wrap gap-3">
              {SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 text-[11px] font-bold rounded-xl transition-all border ${
                    selectedSize === size 
                      ? 'bg-[#5C4D42] text-white border-[#5C4D42] shadow-md' 
                      : 'bg-white text-[#9C8F85] border-[#EAE3DC] hover:border-[#C4A484] hover:text-[#5C4D42]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <button 
              onClick={() => onAddToCart(product, selectedSize)}
              className="w-full py-5 bg-[#5C4D42] text-white font-bold uppercase tracking-[0.2em] hover:bg-[#4A3F35] transition-all shadow-[0_15px_30px_rgba(92,77,66,0.15)] rounded-2xl flex items-center justify-center gap-4 group active:scale-[0.98]"
            >
              <i className="fa-solid fa-bag-shopping group-hover:animate-bounce"></i>
              Add to Collection
            </button>
            <button className="w-full py-5 bg-white border border-[#EAE3DC] text-[#9C8F85] font-bold uppercase tracking-[0.2em] hover:bg-[#FAF8F6] hover:text-[#5C4D42] transition-all rounded-2xl">
              Save to Favorites
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-10 border-t border-[#EAE3DC]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF9F3] flex items-center justify-center text-[#C4A484] shadow-sm">
                <i className="fa-solid fa-feather"></i>
              </div>
              <p className="text-[10px] text-[#9C8F85] font-bold uppercase tracking-widest leading-relaxed">Hypoallergenic & <br/>Breathable</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF9F3] flex items-center justify-center text-[#C4A484] shadow-sm">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <p className="text-[10px] text-[#9C8F85] font-bold uppercase tracking-widest leading-relaxed">Ethically <br/>Sourced</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;