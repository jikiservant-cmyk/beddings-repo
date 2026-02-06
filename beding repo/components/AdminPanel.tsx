
import React, { useState } from 'react';
import { Product, ChatMessage } from '../types';
import { CATALOG_HIERARCHY } from '../constants';

interface AdminPanelProps {
  onAddProduct: (product: Product) => void;
  allProducts: Product[];
  onDeleteProduct: (id: string) => void;
  isAuthenticated: boolean;
  onLogin: (success: boolean) => void;
  onLogout: () => void;
  chatLogs: ChatMessage[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onAddProduct, 
  allProducts, 
  onDeleteProduct, 
  isAuthenticated, 
  onLogin, 
  onLogout,
  chatLogs
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'logs'>('add');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Bedding',
    subcategory: 'Fitted Sheets',
    price: '',
    description: '',
    material: '',
    image: '',
    color: '',
    benefits: ''
  });

  const categories = Object.keys(CATALOG_HIERARCHY);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'cozy') {
      onLogin(true);
      setError(false);
    } else {
      setError(true);
      setPasscode('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      alert("Please fill in required fields (Name, Price, Image URL)");
      return;
    }

    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory,
      price: Number(formData.price),
      description: formData.description,
      material: formData.material,
      image: formData.image,
      color: formData.color || 'Default',
      rating: 5.0,
      benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b !== '')
    };

    onAddProduct(newProduct);
    setFormData({
      name: '',
      category: 'Bedding',
      subcategory: 'Fitted Sheets',
      price: '',
      description: '',
      material: '',
      image: '',
      color: '',
      benefits: ''
    });
    setActiveTab('manage');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(205,180,155,0.2)] border border-[#F3EFEA] text-center animate-fadeIn">
          <div className="w-16 h-16 bg-[#FEF9F3] rounded-full flex items-center justify-center mx-auto mb-6 text-[#C4A484] text-2xl">
            <i className="fa-solid fa-key"></i>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-[#4A3F35]">Owner Entry</h1>
          <p className="text-[#9C8F85] text-sm mb-8 font-medium">Whisper the secret word to enter.</p>
          
          <form onSubmit={handleLoginSubmit}>
            <div className="relative group mb-6">
              <input 
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="cozy"
                className={`w-full bg-[#FAF8F6] border-2 py-4 px-2 text-center text-2xl tracking-[0.5em] focus:outline-none transition-all rounded-2xl ${
                  error ? 'border-red-200 text-red-400' : 'border-[#EAE3DC] focus:border-[#C4A484] text-[#5C4D42]'
                }`}
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-xs font-bold mb-6 uppercase tracking-widest">Access Refused</p>}
            <button 
              type="submit"
              className="w-full py-4 bg-[#5C4D42] text-[#FAF8F6] font-bold uppercase tracking-widest hover:bg-[#4A3F35] transition-all shadow-lg rounded-2xl active:scale-[0.98]"
            >
              Unlock Sanctuary
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12 border-b border-[#EAE3DC] pb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-[#4A3F35]">Boutique Manager</h1>
          <p className="text-[#C4A484] italic serif text-lg">Insights & Inventory.</p>
        </div>
        <button onClick={onLogout} className="px-6 py-2 bg-[#F3EFEA] text-[#5C4D42] text-[10px] font-bold uppercase tracking-widest hover:bg-[#EAE3DC] rounded-full">
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        {[
          { id: 'add', label: 'Add Item', icon: 'fa-plus' },
          { id: 'manage', label: 'Catalog', icon: 'fa-list-check' },
          { id: 'logs', label: 'Stylist Logs', icon: 'fa-sparkles' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
              activeTab === tab.id 
              ? 'bg-[#5C4D42] text-white border-[#5C4D42] shadow-lg' 
              : 'bg-white text-[#9C8F85] border-[#F3EFEA] hover:bg-[#FAF8F6]'
            }`}
          >
            <i className={`fa-solid ${tab.icon} mr-2`}></i> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'add' && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-[#F3EFEA] animate-fadeIn">
          <h2 className="text-2xl font-bold mb-8 text-[#4A3F35]">New Collection Item</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8F85] mb-2 ml-1">Product Name *</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#FAF8F6] border border-[#EAE3DC] rounded-xl px-5 py-3 text-[#5C4D42]" placeholder="e.g. Silk Set" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8F85] mb-2 ml-1">Price (UGX) *</label>
              <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#FAF8F6] border border-[#EAE3DC] rounded-xl px-5 py-3 text-[#5C4D42]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C8F85] mb-2 ml-1">Image URL *</label>
              <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-[#FAF8F6] border border-[#EAE3DC] rounded-xl px-5 py-3 text-[#5C4D42]" />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full py-5 bg-[#5C4D42] text-white font-bold uppercase tracking-[0.2em] rounded-2xl">Add to Catalog</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-[#F3EFEA] animate-fadeIn">
          <h2 className="text-2xl font-bold mb-8 text-[#4A3F35]">Active Catalog</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto scroll-hide">
            {allProducts.map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-[#FAF8F6] rounded-2xl border border-[#EAE3DC]">
                <div className="flex items-center gap-4">
                  <img src={p.image} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold text-[#4A3F35]">{p.name}</p>
                    <p className="text-[10px] text-[#C4A484] uppercase tracking-widest">{p.category}</p>
                  </div>
                </div>
                <button onClick={() => onDeleteProduct(p.id)} className="p-2 text-rose-300 hover:text-rose-500 transition-colors">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-[#F3EFEA] animate-fadeIn">
          <h2 className="text-2xl font-bold mb-8 text-[#4A3F35]">Stylist Transcripts</h2>
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 scroll-hide">
            {chatLogs.length <= 1 ? (
              <p className="text-[#9C8F85] italic text-center py-20">No active customer conversations to show.</p>
            ) : (
              chatLogs.map((log, i) => (
                <div key={i} className={`flex flex-col ${log.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[#D1C7BC] mb-1 px-2">
                    {log.role === 'user' ? 'Customer' : 'Sleep Stylist'}
                  </span>
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[90%] ${
                    log.role === 'user' ? 'bg-[#FAF8F6] text-[#4A3F35] border border-[#EAE3DC]' : 'bg-[#5C4D42] text-white'
                  }`}>
                    {log.text}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-8 pt-8 border-t border-[#F3EFEA]">
            <p className="text-[10px] text-[#C4A484] italic serif">Logs represent the current local browser session history.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
