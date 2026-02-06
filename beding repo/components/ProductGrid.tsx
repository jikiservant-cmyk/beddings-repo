
import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product) => (
        <div 
          key={product.id}
          className="group cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 mb-6 rounded-sm">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4">
              <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                <i className="fa-regular fa-heart"></i>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest shadow-xl">
                Quick View
              </button>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{product.category}</p>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <p className="text-[10px] text-amber-700 uppercase tracking-widest">{product.subcategory}</p>
              </div>
              <h3 className="text-xl font-bold group-hover:text-amber-800 transition-colors">{product.name}</h3>
              <p className="text-gray-500 text-sm italic serif mt-1">{product.material}</p>
            </div>
            <p className="font-bold text-lg text-right"><span className="text-xs mr-1">UGX</span>{product.price.toLocaleString()}</p>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <div className="flex text-amber-400 text-[10px]">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fa-solid fa-star ${i >= Math.floor(product.rating) ? 'text-gray-200' : ''}`}></i>
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-400">({product.rating})</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
