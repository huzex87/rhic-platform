"use client";

import { motion } from "framer-motion";
import { Sparkles, Download, Share2, Layers, Type, Image as ImageIcon, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

const TEMPLATES = [
    { id: 'tech', name: 'Digital Economy', color: 'apc-cyan', bg: 'bg-apc-cyan/10' },
    { id: 'jobs', name: 'Youth Employment', color: 'apc-red', bg: 'bg-apc-red/10' },
    { id: 'growth', name: 'Economic Growth', color: 'apc-green', bg: 'bg-apc-green/10' },
];

export default function FlyerGenerator() {
    const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
    const [headline, setHeadline] = useState("Renewed Hope for a Digital Nigeria");
    const [generating, setGenerating] = useState(false);
    const flyerRef = useRef<HTMLDivElement>(null);

    const handleGenerate = () => {
        setGenerating(true);
        // Simulate generation delay
        setTimeout(() => setGenerating(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
            {/* Controls */}
            <div className="space-y-8">
                <div className="premium-card">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="p-2 bg-apc-cyan/10 rounded-lg">
                            <Layers className="text-apc-cyan w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Flyer Builder</h3>
                    </div>

                    <div className="space-y-6">
                        {/* Headline Input */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-foreground/30 uppercase tracking-widest flex items-center gap-2">
                                <Type className="w-3 h-3" />
                                Custom Headline
                            </label>
                            <textarea
                                value={headline}
                                onChange={(e) => setHeadline(e.target.value)}
                                className="w-full p-4 rounded-xl bg-foreground/5 border border-foreground/5 focus:border-apc-cyan focus:ring-4 focus:ring-apc-cyan/10 outline-none text-sm font-medium transition-all resize-none h-24"
                                placeholder="Enter your campaign message..."
                            />
                        </div>

                        {/* Template Selection */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-foreground/30 uppercase tracking-widest flex items-center gap-2">
                                <ImageIcon className="w-3 h-3" />
                                Base Theme
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {TEMPLATES.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTemplate(t)}
                                        className={`p-3 rounded-xl border-2 transition-all text-[10px] font-black uppercase tracking-wider ${selectedTemplate.id === t.id
                                                ? `border-${t.color} bg-${t.color}/5 text-foreground`
                                                : 'border-transparent bg-foreground/5 text-foreground/40 hover:bg-foreground/10'
                                            }`}
                                    >
                                        {t.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="btn-apc w-full py-5 flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            {generating ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <Sparkles className="w-6 h-6" />
                                    <span>Render Final Flyer</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="p-6 rounded-3xl bg-apc-green/5 border border-apc-green/20 flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-apc-green" />
                    <div>
                        <p className="text-xs font-black text-foreground uppercase tracking-wider">Verified Official Assets</p>
                        <p className="text-[11px] text-foreground/60 font-medium">All generated content adheres to the Renewed Hope branding guidelines.</p>
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <div className="sticky top-32 space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h4 className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Real-time Preview</h4>
                    <div className="flex gap-2">
                        <button className="p-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all">
                            <Download className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={flyerRef}
                    className="aspect-[4/5] relative rounded-[3rem] overflow-hidden premium-shadow group bg-white"
                >
                    {/* Flyer Content */}
                    <div className={`absolute inset-0 ${selectedTemplate.bg} transition-colors duration-500`} />

                    {/* Design Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-apc-cyan/20 blur-[100px] rounded-full -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-apc-green/10 blur-[120px] rounded-full -ml-32 -mb-32" />

                    <div className="relative h-full flex flex-col p-12 justify-between z-10">
                        <div className="flex justify-between items-start">
                            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl p-4">
                                <img src="/logo.png" alt="Logo" className="w-full h-auto object-contain" />
                            </div>
                            <div className="p-4 ultra-glass rounded-2xl border border-white/50 text-[10px] font-black uppercase tracking-[0.3em] text-apc-cyan">
                                Official Template
                            </div>
                        </div>

                        <div className="space-y-8">
                            <motion.h2
                                key={headline}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-6xl font-display font-black leading-[0.9] tracking-tighter text-foreground"
                            >
                                {headline}
                            </motion.h2>

                            <div className="flex items-center gap-6">
                                <div className={`h-1.5 w-24 bg-${selectedTemplate.color} rounded-full`} />
                                <div className="text-xs font-black uppercase tracking-[0.4em] text-foreground/40">
                                    Renewed Hope 2027
                                </div>
                            </div>
                        </div>

                        <div className="bg-foreground text-white p-8 rounded-[2rem] flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Take Action Now</p>
                                <p className="text-lg font-black italic">Join the Movement</p>
                            </div>
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <ChevronRight className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Overlay Grid */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
