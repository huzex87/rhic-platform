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
                        <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center border border-forest/20">
                            <Trophy className="text-forest w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-forest tracking-tighter uppercase italic">
                                National Command <span className="text-accent-red">Matrix</span>
                            </h1>
                            <p className="text-forest/60 font-medium tracking-tight">Real-time mobilization momentum across all 37 chapters.</p>
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
                            className={`premium-card relative overflow-hidden group border-2 ${index === 0 ? "border-gold/30 bg-gold/5" : "border-forest/10"
                                }`}
                        >
                            <div className="relative z-10 space-y-4">
                                <div className="flex justify-between items-start">
                                    <span className={`text-4xl font-black italic ${index === 0 ? "text-gold" : index === 1 ? "text-forest/40" : "text-forest/20"
                                        }`}>
                                        #0{index + 1}
                                    </span>
                                    <ShieldIcon className={index === 0 ? "text-gold" : "text-forest/20"} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-forest tracking-tighter truncate">
                                        {chapter.state.toUpperCase()}
                                    </h3>
                                    <p className="text-sm font-bold text-forest/40 uppercase tracking-widest">{chapter.zone}</p>
                                </div>
                                <div className="pt-4 border-t border-forest/5 flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black text-forest/40 uppercase tracking-widest mb-1">Momentum</p>
                                        <p className="text-2xl font-black text-forest italic">{chapter.momentum_score.toLocaleString()}</p>
                                    </div>
                                    <TrendingUp className="text-leaf w-6 h-6 opacity-40" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* Full matrix table */}
                <section className="premium-card !p-0 overflow-hidden border-forest/10">
                    <div className="p-6 border-b border-forest/5 bg-forest-glass flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Target className="text-forest/40 w-5 h-5" />
                            <h2 className="text-xl font-black text-forest tracking-tighter uppercase italic">Deployment Matrix</h2>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-forest/5">
                                    <th className="p-4 text-[10px] font-black text-forest/40 uppercase tracking-widest">Rank</th>
                                    <th className="p-4 text-[10px] font-black text-forest/40 uppercase tracking-widest">Chapter</th>
                                    <th className="p-4 text-[10px] font-black text-forest/40 uppercase tracking-widest">Zone</th>
                                    <th className="p-4 text-[10px] font-black text-forest/40 uppercase tracking-widest text-right">Supporters</th>
                                    <th className="p-4 text-[10px] font-black text-forest/40 uppercase tracking-widest text-right">Momentum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chapters.map((chapter) => (
                                    <motion.tr
                                        key={chapter.id}
                                        className="border-b border-forest/5 hover:bg-forest/[0.02] transition-colors group"
                                    >
                                        <td className="p-4 font-black italic text-forest/20 group-hover:text-forest transition-colors">
                                            #{chapter.rank?.toString().padStart(2, '0')}
                                        </td>
                                        <td className="p-4 font-black text-forest tracking-tight uppercase">
                                            {chapter.state}
                                        </td>
                                        <td className="p-4">
                                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full border border-forest/10 text-forest/60 uppercase tracking-widest">
                                                {chapter.zone}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-bold text-forest/60 tabular-nums">
                                            {chapter.supporter_count.toLocaleString()}
                                        </td>
                                        <td className="p-4 text-right font-black text-forest tabular-nums italic">
                                            {chapter.momentum_score.toLocaleString()}
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
