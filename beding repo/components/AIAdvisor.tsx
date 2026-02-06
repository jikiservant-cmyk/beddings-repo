
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getStylistResponse } from '../services/geminiService';

interface AIAdvisorProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ messages, setMessages }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getStylistResponse(messages, userMsg);
    
    setIsLoading(false);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
  };

  const handleReset = () => {
    if (window.confirm("Clear our styling session and start fresh?")) {
      setMessages([{ 
        role: 'model', 
        text: "Hello! I'm your Lumina Sleep Stylist. Are you looking for crisp cool sheets, or something buttery soft for the winter? Tell me about how you sleep!" 
      }]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between items-start mb-12">
        <div className="text-left">
          <h1 className="text-4xl font-bold mb-4 text-[#4A3F35]">Sleep Stylist</h1>
          <p className="text-[#9C8F85] italic serif">Curating your sanctuary experience.</p>
        </div>
        <button 
          onClick={handleReset}
          className="p-3 text-[#D1C7BC] hover:text-[#5C4D42] transition-colors"
          title="Reset Conversation"
        >
          <i className="fa-solid fa-rotate-right"></i>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(205,180,155,0.15)] overflow-hidden flex flex-col h-[650px] border border-[#F3EFEA]">
        <div className="flex-grow overflow-y-auto p-10 space-y-8 scroll-hide" ref={scrollRef}>
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-[1.5rem] px-8 py-5 shadow-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-[#5C4D42] text-[#FAF8F6]' 
                  : 'bg-[#FAF8F6] text-[#4A3F35] border border-[#EAE3DC]'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#FAF8F6] rounded-full px-8 py-5 flex gap-2 border border-[#EAE3DC]">
                <span className="w-2 h-2 bg-[#C4A484] rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-[#D1C7BC] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-[#C4A484] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 bg-[#FAF8F6] border-t border-[#EAE3DC] flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your perfect night's rest..."
            className="flex-grow bg-white border border-[#EAE3DC] rounded-xl px-8 py-4 focus:outline-none focus:ring-4 focus:ring-[#FEF3C7]/20 transition-all text-[#5C4D42] placeholder:text-[#D1C7BC]"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-[#5C4D42] text-white w-14 h-14 rounded-xl flex items-center justify-center hover:bg-[#4A3F35] disabled:bg-[#D1C7BC] transition-all shadow-lg active:scale-95"
          >
            <i className="fa-solid fa-sparkles"></i>
          </button>
        </div>
      </div>
      
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {[
          "Best for hot sleepers?",
          "Cozy minimalist room colors?",
          "How to wash linen?"
        ].map(prompt => (
          <button 
            key={prompt}
            onClick={() => setInput(prompt)} 
            className="px-6 py-3 bg-white border border-[#EAE3DC] rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#9C8F85] hover:border-[#C4A484] hover:text-[#5C4D42] transition-all shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIAdvisor;
