"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, Bot, User, Shield } from "lucide-react";
import { useState } from "react";

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello Innovator! I'm your RHIC Mobilization Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: 'user', text: input }]);
        setInput("");

        // Simulate AI response with state-specific context
        setTimeout(() => {
            const responses = [
                "Innovator, Lagos Chapter is currently leading the Growth Velocity! Your contributions could push them even further.",
                "I've analyzed the mission queue. There's a high-priority 'Digital Advocacy' mission in Abuja ready for initialization.",
                "Your mobilization rank is nearing 'Silver'. Completing one more innovation mission should trigger the promotion!",
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            setMessages(prev => [...prev, {
                role: 'assistant',
                text: randomResponse
            }]);
        }, 1000);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 w-16 h-16 apc-cyan-gradient text-white rounded-2xl shadow-2xl flex items-center justify-center group hover:scale-110 transition-all z-50 border border-white/20"
            >
                <Sparkles className="w-8 h-8 text-apc-gold group-hover:rotate-12 transition-transform" />
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-28 right-8 w-[400px] h-[600px] glass rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border-apc-cyan/20"
                    >
                        {/* Header */}
                        <div className="apc-cyan-gradient p-6 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Bot className="text-white w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-display font-black text-sm tracking-tight">VANGUARD AI COMMAND</div>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-white/60 uppercase">
                                        <span className="w-1.5 h-1.5 rounded-full bg-apc-green animate-pulse" />
                                        Active Mobilization
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto space-y-4">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-apc-cyan' : 'bg-apc-cyan/10'}`}>
                                        {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Shield className="w-4 h-4 text-apc-cyan" />}
                                    </div>
                                    <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed max-w-[80%] ${m.role === 'user' ? 'bg-apc-cyan text-white rounded-tr-none' : 'bg-apc-cyan/5 text-foreground rounded-tl-none'
                                        }`}>
                                        {m.text}
                                        {m.role === 'assistant' && i === messages.length - 1 && (
                                            <div className="mt-4 flex gap-2">
                                                <button className="bg-apc-red/10 hover:bg-apc-red/20 text-apc-red text-[10px] font-black px-3 py-1.5 rounded-lg border border-apc-red/20 transition-all uppercase">
                                                    Start Mission
                                                </button>
                                                <button className="bg-apc-cyan/10 hover:bg-apc-cyan/20 text-apc-cyan text-[10px] font-black px-3 py-1.5 rounded-lg border border-apc-cyan/10 transition-all uppercase">
                                                    Details
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-6 border-t border-apc-cyan/5 bg-white/50">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about your next mission..."
                                    className="w-full pl-4 pr-12 py-4 rounded-2xl glass border-none focus:ring-2 focus:ring-apc-cyan outline-none text-sm font-medium text-foreground"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 apc-cyan-gradient rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all"
                                >
                                    <Send className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
