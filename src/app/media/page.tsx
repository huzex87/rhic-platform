"use client";

import { motion } from "framer-motion";
import {
    Download,
    ImageIcon,
    Video,
    FileText,
    Sparkles,
    Search,
    ExternalLink,
    ChevronRight,
    Loader2
} from "lucide-react";
import { useState } from "react";
import { useMedia } from "@/hooks/useMedia";
import { useAIAssistant } from "@/hooks/useAIAssistant";

import FlyerGenerator from "@/components/FlyerGenerator";
import CampaignNewsHub from "@/components/CampaignNewsHub";

export default function MediaWarRoom() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { assets, loading } = useMedia(selectedCategory);
    const [focus, setFocus] = useState("Digital Economy Growth");
    const { generateCaption, generating, lastResult } = useAIAssistant();

    const handleGenerate = async () => {
        await generateCaption(focus);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground leading-tight">
                        Digital <span className="text-apc-cyan italic">Campaign Center</span>
                    </h1>
                    <p className="text-foreground/60 font-medium max-w-xl text-sm md:text-base">
                        Your unified hub for active advocacy. Generate campaign visual assets,
                        access narrative toolkits, and track live movement updates.
                    </p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search assets..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl glass border-none focus:ring-2 focus:ring-apc-cyan outline-none text-foreground font-medium"
                    />
                </div>
            </div>

            {/* AI Generator Section - NEW HIGH POWERED FEATURE */}
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="h-1 w-12 bg-apc-red rounded-full" />
                    <h2 className="text-xl font-display font-black text-foreground uppercase tracking-wider">Advocacy Generators</h2>
                </div>
                <FlyerGenerator />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Col: Asset Library */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-display font-bold text-foreground">Asset Library</h2>
                        <div className="flex gap-2">
                            {['All', 'Graphics', 'Video', 'Audio', 'Docs'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedCategory === cat ? 'apc-cyan-gradient text-white' : 'bg-foreground/5 text-foreground hover:bg-foreground/10'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-20 flex justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-leaf" />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {assets.map((asset, i) => (
                                    <motion.div
                                        key={asset.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="premium-card group cursor-pointer"
                                    >
                                        <div className="aspect-video bg-foreground/5 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                                            {asset.type === 'Image' && <ImageIcon className="w-12 h-12 text-foreground/10" />}
                                            {asset.type === 'Video' && <Video className="w-12 h-12 text-foreground/10" />}
                                            {asset.type === 'Graphics' && <Sparkles className="w-12 h-12 text-foreground/10" />}
                                            {asset.type === 'Document' && <FileText className="w-12 h-12 text-foreground/10" />}

                                            <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button className="bg-apc-cyan text-white p-3 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                                                    <Download className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-foreground mb-1 group-hover:text-apc-cyan transition-colors">{asset.title}</h3>
                                                <div className="flex gap-3 text-[10px] font-black text-foreground/30 uppercase tracking-widest">
                                                    <span>{asset.type}</span>
                                                    <span>•</span>
                                                    <span>{asset.format}</span>
                                                    <span>•</span>
                                                    <span>{asset.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {assets.length === 0 && (
                                    <div className="col-span-full py-20 text-center text-forest/30 font-bold uppercase tracking-widest text-xs">
                                        No assets found in this category.
                                    </div>
                                )}
                            </div>

                            {assets.length > 0 && (
                                <button className="w-full py-6 rounded-2xl border-2 border-dashed border-foreground/10 text-foreground/40 font-bold hover:bg-foreground/5 transition-all flex items-center justify-center gap-2">
                                    Load More Assets
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Right Col: AI Advocacy Assistant */}
                <div className="space-y-8">
                    <div className="premium-card apc-cyan-gradient text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Sparkles className="text-white w-5 h-5" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-white">AI Narrator</span>
                            </div>
                            <h3 className="text-2xl font-display font-black mb-4 leading-tight">Generate Campaign Copy</h3>
                            <p className="text-white/60 text-sm font-medium mb-8">
                                Instantly create pro-Renewed Hope social media captions tailored for your audience.
                            </p>

                            <div className="space-y-4">
                                <div className="glass bg-white/20 p-4 rounded-xl border-white/5">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block mb-2">Narrative Focus</span>
                                    <select
                                        value={focus}
                                        onChange={(e) => setFocus(e.target.value)}
                                        className="bg-transparent text-sm font-medium outline-none w-full cursor-pointer appearance-none text-white"
                                    >
                                        <option value="Digital Economy Growth" className="text-foreground">Digital Economy Growth</option>
                                        <option value="Agriculture Modernization" className="text-foreground">Agriculture Modernization</option>
                                        <option value="Youth Employment" className="text-foreground">Youth Employment</option>
                                    </select>
                                </div>

                                {lastResult && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 rounded-xl bg-white/10 border border-white/20 text-sm font-medium text-white/90 leading-relaxed relative group"
                                    >
                                        {lastResult}
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(lastResult);
                                                alert("Caption copied to clipboard!");
                                            }}
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/40 p-1.5 rounded-lg"
                                        >
                                            <Download className="w-3 h-3 text-white" />
                                        </button>
                                    </motion.div>
                                )}

                                <button
                                    onClick={handleGenerate}
                                    disabled={generating}
                                    className="apc-red-gradient text-white w-full py-4 rounded-xl font-black shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
                                >
                                    {generating ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            {lastResult ? 'REGENERATE NARRATIVE' : 'GENERATE CAPTION'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-leaf/10 rounded-full blur-3xl" />
                    </div>

                    <div className="premium-card">
                        <CampaignNewsHub />
                    </div>

                    <div className="premium-card bg-apc-cyan/5 flex items-center justify-between group cursor-pointer border-apc-cyan/20">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-apc-cyan/20 rounded-xl flex items-center justify-center">
                                <ExternalLink className="w-5 h-5 text-apc-cyan" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-foreground">Media WhatsApp Group</div>
                                <div className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest">Direct Broadcast</div>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-foreground/20 group-hover:text-foreground transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
}
