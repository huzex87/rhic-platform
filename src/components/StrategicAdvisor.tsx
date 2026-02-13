"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function StrategicAdvisor() {
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'ready'>('idle');
    const [briefing, setBriefing] = useState<string[]>([]);
    const [expanded, setExpanded] = useState(true);

    const generateBriefing = () => {
        setStatus('analyzing');
        setTimeout(() => {
            setBriefing([
                "Mobilization velocity in North-West 20% above 7-day average.",
                "Lagos Chapter exhibits high-density polling unit saturation (88%).",
                "Flagged coordination bottleneck in South-South Logistics stream.",
                "Action Required: Allocate higher volunteer density to 4 rural LGAs in Borno."
            ]);
            setStatus('ready');
        }, 2000);
    };

    useEffect(() => {
        generateBriefing();
    }, []);

    return (
        <div className="premium-card bg-forest border-none text-ivory relative overflow-hidden ring-4 ring-leaf/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            {/* Background Visuals */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Terminal className="w-32 h-32 rotate-12" />
            </div>

            <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-leaf/10 rounded-xl flex items-center justify-center">
                            <Sparkles className="text-leaf w-5 h-5 shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em]">Strategic <span className="text-leaf">Advisor</span></h3>
                            <div className="text-[9px] font-bold text-ivory/40 uppercase tracking-widest flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-leaf animate-pulse" /> AI Analysis Active
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>

                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-6 overflow-hidden"
                        >
                            <div className="space-y-4">
                                {status === 'analyzing' ? (
                                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 border-2 border-leaf/20 border-t-leaf rounded-full animate-spin" />
                                            <Terminal className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-leaf" />
                                        </div>
                                        <p className="text-[10px] font-black text-leaf uppercase tracking-widest animate-pulse">Running Neural Synthesis...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {briefing.map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                                            >
                                                <div className="w-5 h-5 mt-0.5 rounded-full bg-leaf/20 flex items-center justify-center shrink-0">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-leaf" />
                                                </div>
                                                <p className="text-xs font-medium text-ivory/80 leading-relaxed italic">
                                                    &ldquo;{item}&rdquo;
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={generateBriefing}
                                className="w-full group flex items-center justify-center gap-3 py-4 rounded-xl bg-leaf text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-leaf shadow-leaf/20 transition-all hover:scale-[1.02]"
                            >
                                <RefreshCw className={`w-3 h-3 group-hover:rotate-180 transition-all duration-700 ${status === 'analyzing' ? 'animate-spin' : ''}`} />
                                Re-Synthesize Intelligence
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
