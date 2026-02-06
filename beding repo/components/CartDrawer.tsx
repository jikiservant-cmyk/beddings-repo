
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, size: string) => void;
  onUpdateQty: (id: string, size: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-[#2D241E]/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[60] shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-8 border-b border-[#F3EFEA] flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-[#4A3F35]">Your Bag ({items.length})</h2>
            <button onClick={onClose} className="p-2 hover:bg-[#FAF8F6] rounded-full transition-colors text-[#C4A484]">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-8 space-y-8 scroll-hide">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-[#FEF9F3] rounded-full flex items-center justify-center mb-6 text-[#C4A484]">
                  <i className="fa-solid fa-bag-shopping text-3xl"></i>
                </div>
                <p className="text-[#9C8F85] font-medium mb-6">Your bag is currently empty.</p>
                <button 
                  onClick={onClose}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-[#C4A484] hover:text-[#5C4D42] underline decoration-1 underline-offset-8 transition-all"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 animate-fadeIn">
                  <div className="w-24 h-32 bg-[#F3EFEA] rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-[#4A3F35]">{item.name}</h3>
                      <button 
                        onClick={() => onRemove(item.id, item.selectedSize)}
                        className="text-[#D1C7BC] hover:text-rose-400 transition-colors"
                      >
                        <i className="fa-solid fa-trash-can text-sm"></i>
                      </button>
                    </div>
                    <p className="text-[10px] text-[#C4A484] uppercase tracking-widest mb-4 font-bold">Size: {item.selectedSize}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-[#EAE3DC] rounded-lg bg-[#FAF8F6]">
                        <button 
                          onClick={() => onUpdateQty(item.id, item.selectedSize, -1)}
                          className="px-3 py-1 text-[#9C8F85] hover:text-[#5C4D42]"
                        >
                          <i className="fa-solid fa-minus text-[10px]"></i>
                        </button>
                        <span className="px-3 py-1 text-sm font-bold text-[#4A3F35]">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, item.selectedSize, 1)}
                          className="px-3 py-1 text-[#9C8F85] hover:text-[#5C4D42]"
                        >
                          <i className="fa-solid fa-plus text-[10px]"></i>
                        </button>
                      </div>
                      <p className="font-bold text-sm text-[#5C4D42]"><span className="text-[10px] mr-1 text-[#C4A484]">UGX</span>{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-8 bg-[#FAF8F6] border-t border-[#EAE3DC]">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#9C8F85] font-bold uppercase tracking-widest text-[10px]">Subtotal</p>
                <p className="text-xl font-bold text-[#4A3F35]"><span className="text-xs mr-2 text-[#C4A484]">UGX</span>{subtotal.toLocaleString()}</p>
              </div>
              <p className="text-[10px] text-[#C4A484] mb-8 italic serif">Complimentary shipping on your sanctuary collection.</p>
              <button 
                onClick={onCheckout}
                className="w-full py-5 bg-[#5C4D42] text-[#FAF8F6] font-bold uppercase tracking-[0.2em] hover:bg-[#4A3F35] transition-all shadow-[0_15px_30px_rgba(92,77,66,0.15)] rounded-2xl active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
