"use client";

import { motion } from "framer-motion";
import { TrendingUp, Target, Trophy, ShieldIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

interface ChapterMomentum {
    id: string;
    state: string;
    zone: string;
    momentum_score: number;
    supporter_count: number;
    rank?: number;
}

export default function LeaderboardPage() {
    const [chapters, setChapters] = useState<ChapterMomentum[]>([]);
    const [, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const { data, error } = await supabase
                .from('chapters')
                .select('id, state, zone, momentum_score, supporter_count')
                .order('momentum_score', { ascending: false });

            if (!error && data) {
                setChapters(data.map((c, i) => ({ ...c, rank: i + 1 })));
            }
            setLoading(false);
        };

        fetchLeaderboard();
    }, [supabase]);

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-32 space-y-12">
                {/* Header */}
                <header className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center border border-forest/20 ultra-glass">
                            <Trophy className="text-forest w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase italic leading-none">
                                National Command <span className="text-transparent bg-clip-text vibrant-apc-gradient">Matrix</span>
                            </h1>
                            <p className="text-forest/60 font-medium tracking-tight mt-1">Real-time mobilization momentum across all 37 chapters.</p>
                        </div>
                    </motion.div>
                </header>

                {/* Top Chapters Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {chapters.slice(0, 3).map((chapter, index) => (
                        <motion.div
                            key={chapter.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-[2rem] overflow-hidden group border transition-all duration-500 hover:scale-[1.02] ${index === 0
                                ? "border-gold/30 bg-gold/5 ultra-glass shadow-[0_20px_50px_-10px_rgba(212,175,55,0.2)]"
                                : "border-forest/10 ultra-glass shadow-xl"
                                }`}
                        >
                            {/* Decorative Background Glow */}
                            <div className={`absolute -right-10 -top-10 w-32 h-32 blur-[60px] opacity-20 rounded-full ${index === 0 ? "bg-gold" : "bg-forest"
                                }`} />

                            <div className="relative z-10 space-y-6">
                                <div className="flex justify-between items-start">
                                    <span className={`text-5xl font-display font-black italic tracking-tighter ${index === 0 ? "text-gold glow-text" : "text-forest/40"
                                        }`}>
                                        #0{index + 1}
                                    </span>
                                    <div className={`p-2 rounded-lg ${index === 0 ? "bg-gold/10" : "bg-forest/5"}`}>
                                        <ShieldIcon className={index === 0 ? "text-gold" : "text-forest/20"} size={20} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-display font-black text-forest tracking-tighter truncate leading-none">
                                        {chapter.state.toUpperCase()}
                                    </h3>
                                    <p className="text-[10px] font-black text-forest/40 uppercase tracking-[0.2em]">{chapter.zone}</p>
                                </div>
                                <div className="pt-6 border-t border-forest/5 flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black text-forest/40 uppercase tracking-widest mb-1">Momentum</p>
                                        <p className="text-3xl font-display font-black text-forest italic leading-none">{chapter.momentum_score.toLocaleString()}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center">
                                        <TrendingUp className="text-leaf w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* Full matrix table */}
                <section className="ultra-glass rounded-[2rem] overflow-hidden border border-forest/10 shadow-2xl">
                    <div className="p-8 border-b border-forest/5 flex justify-between items-center bg-white/40">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-forest/5">
                                <Target className="text-forest/40 w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-display font-black text-forest tracking-tighter uppercase italic leading-none">Deployment Matrix</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/5 border border-forest/10">
                            <div className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
                            <span className="text-[10px] font-black text-forest/60 uppercase tracking-widest">Live Updates Active</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-forest/[0.03]">
                                    <th className="p-6 text-[10px] font-black text-forest/40 uppercase tracking-widest">Rank</th>
                                    <th className="p-6 text-[10px] font-black text-forest/40 uppercase tracking-widest">Chapter</th>
                                    <th className="p-6 text-[10px] font-black text-forest/40 uppercase tracking-widest">Zone</th>
                                    <th className="p-6 text-[10px] font-black text-forest/40 uppercase tracking-widest text-right">Supporters</th>
                                    <th className="p-6 text-[10px] font-black text-forest/40 uppercase tracking-widest text-right">Momentum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chapters.map((chapter) => (
                                    <motion.tr
                                        key={chapter.id}
                                        whileHover={{ backgroundColor: "rgba(0,141,67,0.02)" }}
                                        className="border-b border-forest/5 group cursor-default"
                                    >
                                        <td className="p-6 font-display font-black italic text-forest/20 group-hover:text-forest transition-colors text-xl">
                                            #{chapter.rank?.toString().padStart(2, '0')}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="font-display font-black text-forest tracking-tight uppercase text-lg">{chapter.state}</span>
                                                <span className="text-[10px] font-bold text-forest/40 uppercase tracking-widest">Verified Chapter</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-[10px] font-black px-3 py-1 rounded-full border border-forest/10 text-forest/60 uppercase tracking-[0.1em] ultra-glass">
                                                {chapter.zone}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right font-display font-bold text-forest/60 tabular-nums text-lg">
                                            {chapter.supporter_count.toLocaleString()}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="font-display font-black text-forest tabular-nums italic text-xl leading-none">
                                                    {chapter.momentum_score.toLocaleString()}
                                                </span>
                                                <div className="flex items-center gap-1 text-[10px] text-leaf font-bold mt-1">
                                                    <TrendingUp size={10} />
                                                    <span>+2.4%</span>
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}
