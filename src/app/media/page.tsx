"use client";

import { motion } from "framer-motion";
import {
    Download,
    Share2,
    Image as ImageIcon,
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
                    <h1 className="text-5xl font-display font-black text-forest leading-tight">
                        Media <span className="text-leaf italic">War Room</span>
                    </h1>
                    <p className="text-forest/60 font-medium max-w-xl">
                        Centralized hub for verified campaign assets, narrative toolkits,
                        and AI-powered digital advocacy generators.
                    </p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/30 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search assets..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl glass border-none focus:ring-2 focus:ring-leaf outline-none text-forest font-medium"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Col: Asset Library */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-display font-bold text-forest">Asset Library</h2>
                        <div className="flex gap-2">
                            {['All', 'Graphics', 'Video', 'Audio', 'Docs'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-forest text-ivory' : 'bg-forest/5 text-forest hover:bg-forest/10'}`}
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
                                        <div className="aspect-video bg-forest/5 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                                            {asset.type === 'Image' && <ImageIcon className="w-12 h-12 text-forest/10" />}
                                            {asset.type === 'Video' && <Video className="w-12 h-12 text-forest/10" />}
                                            {asset.type === 'Graphics' && <Sparkles className="w-12 h-12 text-forest/10" />}
                                            {asset.type === 'Document' && <FileText className="w-12 h-12 text-forest/10" />}

                                            <div className="absolute inset-0 bg-forest/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button className="bg-leaf text-ivory p-3 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                                                    <Download className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-forest mb-1 group-hover:text-leaf transition-colors">{asset.title}</h3>
                                                <div className="flex gap-3 text-[10px] font-black text-forest/30 uppercase tracking-widest">
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
                                <button className="w-full py-6 rounded-2xl border-2 border-dashed border-forest/10 text-forest/40 font-bold hover:bg-forest/5 transition-all flex items-center justify-center gap-2">
                                    Load More Assets
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Right Col: AI Advocacy Assistant */}
                <div className="space-y-8">
                    <div className="premium-card forest-gradient text-ivory relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-leaf/20 rounded-lg">
                                    <Sparkles className="text-leaf w-5 h-5" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-leaf">AI Narrator</span>
                            </div>
                            <h3 className="text-2xl font-display font-black mb-4 leading-tight">Generate Campaign Copy</h3>
                            <p className="text-ivory/50 text-sm font-medium mb-8">
                                Instantly create pro-Renewed Hope social media captions tailored for your audience.
                            </p>

                            <div className="space-y-4">
                                <div className="glass bg-white/10 p-4 rounded-xl border-white/5">
                                    <span className="text-[10px] font-bold text-leaf uppercase tracking-widest block mb-2">Narrative Focus</span>
                                    <select
                                        value={focus}
                                        onChange={(e) => setFocus(e.target.value)}
                                        className="bg-transparent text-sm font-medium outline-none w-full cursor-pointer appearance-none"
                                    >
                                        <option value="Digital Economy Growth" className="text-forest">Digital Economy Growth</option>
                                        <option value="Agriculture Modernization" className="text-forest">Agriculture Modernization</option>
                                        <option value="Youth Employment" className="text-forest">Youth Employment</option>
                                    </select>
                                </div>

                                {lastResult && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 rounded-xl bg-leaf/10 border border-leaf/20 text-sm font-medium text-ivory/90 leading-relaxed relative group"
                                    >
                                        {lastResult}
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(lastResult);
                                                alert("Caption copied to clipboard!");
                                            }}
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-forest/40 p-1.5 rounded-lg"
                                        >
                                            <Download className="w-3 h-3 text-leaf" />
                                        </button>
                                    </motion.div>
                                )}

                                <button
                                    onClick={handleGenerate}
                                    disabled={generating}
                                    className="leaf-gradient text-ivory w-full py-4 rounded-xl font-black shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
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
                        <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest mb-6">Trending Narratives</h3>
                        <div className="space-y-4">
                            {[
                                { tag: "#RenewedHopeWorks", reach: "2.4M reach", trend: "up" },
                                { tag: "#InnovatorsForNigeria", reach: "1.8M reach", trend: "up" },
                                { tag: "#RHIC2027", reach: "900K reach", trend: "up" },
                            ].map((t, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-forest/5 hover:bg-forest/10 transition-colors group cursor-pointer">
                                    <div>
                                        <div className="text-sm font-black text-forest">{t.tag}</div>
                                        <div className="text-[10px] font-bold text-forest/30 uppercase tracking-widest">{t.reach}</div>
                                    </div>
                                    <Share2 className="w-4 h-4 text-forest/20 group-hover:text-leaf transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card bg-leaf/5 flex items-center justify-between group cursor-pointer border-leaf/20">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-leaf/20 rounded-xl flex items-center justify-center">
                                <ExternalLink className="w-5 h-5 text-leaf" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-forest">Media WhatsApp Group</div>
                                <div className="text-[10px] text-forest/30 font-bold uppercase tracking-widest">Direct Broadcast</div>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-forest/20 group-hover:text-forest transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
}
