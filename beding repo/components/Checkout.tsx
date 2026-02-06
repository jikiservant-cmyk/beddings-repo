
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onComplete: () => void;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onComplete, onBack }) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleNext = () => {
    if (step === 'shipping') setStep('payment');
    else if (step === 'payment') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('success');
      }, 2000);
    }
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center animate-fadeIn">
        <div className="w-24 h-24 bg-[#FEF9F3] rounded-full flex items-center justify-center mx-auto mb-8 text-[#C4A484] text-4xl">
          <i className="fa-solid fa-check"></i>
        </div>
        <h1 className="text-5xl font-bold mb-6 text-[#4A3F35]">Rest is on the way.</h1>
        <p className="text-lg text-[#9C8F85] italic serif mb-10 leading-relaxed">
          Thank you for choosing Lumina Linens. Your order has been curated and is being prepared for its journey to your sanctuary.
        </p>
        <button 
          onClick={onComplete}
          className="px-12 py-5 bg-[#5C4D42] text-[#FAF8F6] font-bold uppercase tracking-[0.2em] hover:bg-[#4A3F35] transition-all rounded-2xl shadow-xl"
        >
          Return to Boutique
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Checkout Forms */}
        <div className="flex-grow space-y-12">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={onBack} className="text-[#C4A484] hover:text-[#5C4D42] transition-colors">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <h1 className="text-4xl font-bold text-[#4A3F35]">Secure Checkout</h1>
          </div>

          <div className="flex gap-12 border-b border-[#EAE3DC] pb-8">
            <div className={`flex items-center gap-3 ${step === 'shipping' ? 'text-[#5C4D42]' : 'text-[#D1C7BC]'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 'shipping' ? 'bg-[#5C4D42] text-white' : 'bg-[#FAF8F6]'}`}>1</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Shipping</span>
            </div>
            <div className={`flex items-center gap-3 ${step === 'payment' ? 'text-[#5C4D42]' : 'text-[#D1C7BC]'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 'payment' ? 'bg-[#5C4D42] text-white' : 'bg-[#FAF8F6]'}`}>2</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Payment</span>
            </div>
          </div>

          <div className="animate-fadeIn">
            {step === 'shipping' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8F85] mb-3">Full Name</label>
                  <input type="text" className="w-full bg-[#FAF8F6] border border-[#EAE3DC] rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-[#FEF3C7]/30 text-[#5C4D42]" placeholder="Jane Doe" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8F85] mb-3">Address</label>
                  <input type="text" className="w-full bg-[#FAF8F6] border border-[#EAE3DC] rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-[#FEF3C7]/30 text-[#5C4D42]" placeholder="123 Serenity Lane" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8F85] mb-3">City</label>
                  <input type="text" className="w-full bg-[#FAF8F6] border border-[#EAE3DC] rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-[#FEF3C7]/30 text-[#5C4D42]" placeholder="Kampala" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8F85] mb-3">Phone</label>
                  <input type="tel" className="w-full bg-[#FAF8F6] border border-[#EAE3DC] rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-[#FEF3C7]/30 text-[#5C4D42]" placeholder="+256..." />
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8F85] mb-3">Card Number</label>
                  <div className="relative">
                    <input type="text" className="w-full bg-[#FAF8F6] border border-[#EAE3DC] rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-[#FEF3C7]/30 text-[#5C4D42]" placeholder="•••• •••• •••• ••••" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D1C7BC]">
                      <i className="fa-brands fa-cc-visa text-2xl"></i>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8F85] mb-3">Expiry</label>
                    <input type="text" className="w-full bg-[#FAF8F6] border border-[#EAE3DC] rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-[#FEF3C7]/30 text-[#5C4D42]" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8F85] mb-3">CVV</label>
                    <input type="text" className="w-full bg-[#FAF8F6] border border-[#EAE3DC] rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-[#FEF3C7]/30 text-[#5C4D42]" placeholder="•••" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={handleNext}
            disabled={isProcessing}
            className="w-full py-5 bg-[#5C4D42] text-[#FAF8F6] font-bold uppercase tracking-[0.2em] hover:bg-[#4A3F35] transition-all shadow-xl rounded-2xl flex items-center justify-center gap-4 disabled:bg-[#D1C7BC]"
          >
            {isProcessing ? (
              <i className="fa-solid fa-circle-notch animate-spin"></i>
            ) : (
              step === 'shipping' ? 'Continue to Payment' : 'Complete Order'
            )}
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white p-8 rounded-[2rem] border border-[#F3EFEA] shadow-sm sticky top-32">
            <h2 className="text-xl font-bold text-[#4A3F35] mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 scroll-hide">
              {items.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-bold text-[#4A3F35] leading-none mb-1">{item.name}</p>
                      <p className="text-[10px] text-[#C4A484] uppercase tracking-widest font-bold">{item.selectedSize} &times; {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#5C4D42]">{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-8 border-t border-[#F3EFEA]">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9C8F85]">Subtotal</span>
                <span className="text-sm font-bold text-[#4A3F35]">UGX {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9C8F85]">Shipping</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C4A484]">Complimentary</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#F3EFEA]">
                <span className="text-sm font-bold text-[#4A3F35] uppercase tracking-[0.1em]">Total</span>
                <span className="text-2xl font-bold text-[#5C4D42]">UGX {subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
