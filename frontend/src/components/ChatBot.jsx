import { useState, useRef, useEffect } from 'react';
import { groqChat } from '../api';

const WELCOME_MSG = {
  role: 'bot',
  text: 'Hi! I\'m Aditya\'s AI assistant. Ask me anything about his skills, projects, experience, or background!',
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEnd = useRef(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await groqChat(userMsg);
      const reply = res.data.reply || res.data.fallback || 'Sorry, I could not process that.';
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', text: 'I\'m having trouble connecting right now. Please reach out to Aditya directly at adityarai29052005@gmail.com' }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-widget">
      {open && (
        <div className="chatbot-panel">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0d0d15]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-xs font-bold">AI</div>
              <span className="text-sm font-semibold">Portfolio Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#00d4ff]/20 to-[#7c3aed]/20 text-white rounded-tr-none'
                    : 'bg-white/5 text-gray-300 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-3 py-2 rounded-xl rounded-tl-none text-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEnd} />
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Aditya..."
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-3 py-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-lg text-white text-sm disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-[#00d4ff]/20"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(!open)} className="chatbot-toggle" title="Ask AI about Aditya">
        <i className={`fas ${open ? 'fa-times' : 'fa-robot'}`}></i>
      </button>
    </div>
  );
}
