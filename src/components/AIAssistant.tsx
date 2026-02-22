"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, Bot, User, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAIBrain } from "@/hooks/useAIBrain";

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const { getStrategicAdvice } = useAIBrain();
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I am here to support our community for the Renewed Hope mandate. How can I help you take action today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput("");
        setIsTyping(true);

        // Artificial delay for "Intelligence Processing" feel
        await new Promise(resolve => setTimeout(resolve, 1200));

        const advice = getStrategicAdvice(userMessage);

        setMessages(prev => [...prev, {
            role: 'assistant',
            text: advice
        }]);
        setIsTyping(false);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 w-16 h-16 apc-cyan-gradient text-white rounded-2xl shadow-2xl flex items-center justify-center group hover:scale-110 transition-all z-50 border border-white/20"
            >
                <Sparkles className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-apc-red rounded-full border-2 border-white animate-bounce" />
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-28 right-8 w-[400px] h-[600px] ultra-glass rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-white/20"
                    >
                        {/* Header */}
                        <div className="apc-cyan-gradient p-6 flex items-center justify-between text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none" />
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/30">
                                    <Bot className="text-white w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-display font-black text-xs tracking-[0.1em] uppercase">Movement Advisor</div>
                                    <div className="flex items-center gap-1.5 text-[9px] font-black text-apc-gold uppercase">
                                        <span className="w-1.5 h-1.5 rounded-full bg-apc-green animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]" />
                                        Live Activity Feed
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors relative z-10">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-hide">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${m.role === 'user' ? 'bg-apc-cyan border-white/20' : 'bg-white/10 border-forest/5'}`}>
                                        {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Shield className="w-4 h-4 text-apc-cyan" />}
                                    </div>
                                    <div className={`p-4 rounded-2xl text-[13px] font-medium leading-relaxed max-w-[85%] shadow-sm transition-all ${m.role === 'user' ? 'apc-cyan-gradient text-white rounded-tr-none' : 'bg-white/40 backdrop-blur-md text-forest rounded-tl-none border border-white/50'
                                        }`}>
                                        {m.text}
                                        {m.role === 'assistant' && i === messages.length - 1 && !isTyping && (
                                            <div className="mt-4 flex gap-2">
                                                <button className="bg-apc-red/10 hover:bg-apc-red/20 text-apc-red text-[9px] font-black px-3 py-1.5 rounded-lg border border-apc-red/20 transition-all uppercase tracking-wider">
                                                    Start Activity
                                                </button>
                                                <button className="bg-apc-cyan/10 hover:bg-apc-cyan/20 text-apc-cyan text-[9px] font-black px-3 py-1.5 rounded-lg border border-apc-cyan/10 transition-all uppercase tracking-wider">
                                                    Quick Update
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-forest/5 flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4 text-apc-cyan animate-pulse" />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-md text-forest rounded-tl-none border border-white/50 flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-apc-cyan/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-apc-cyan/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-apc-cyan/40 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-forest/5 bg-white/20 backdrop-blur-xl">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask our Movement Advisor..."
                                    className="w-full pl-4 pr-12 py-4 rounded-2xl bg-white/50 border border-white/50 focus:border-apc-cyan focus:ring-4 focus:ring-apc-cyan/10 outline-none text-[13px] font-medium text-forest transition-all placeholder:text-forest/30"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 apc-cyan-gradient rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-apc-cyan/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
