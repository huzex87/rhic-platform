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

interface VolunteerRank {
    id: string;
    full_name: string;
    state: string;
    tier: string;
    reputation_score: number;
    rank?: number;
}

export default function LeaderboardPage() {
    const [view, setView] = useState<"chapters" | "volunteers">("chapters");
    const [chapters, setChapters] = useState<ChapterMomentum[]>([]);
    const [volunteers, setVolunteers] = useState<VolunteerRank[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);

            // 1. Fetch Chapters
            const { data: chapterData, error: chapterError } = await supabase
                .from('chapters')
                .select('id, state, zone, momentum_score, supporter_count')
                .order('momentum_score', { ascending: false });

            if (!chapterError && chapterData) {
                setChapters(chapterData.map((c, i) => ({ ...c, rank: i + 1 })));
            }

            // 2. Fetch Top volunteers
            const { data: volunteerData, error: volunteerError } = await supabase
                .from('profiles')
                .select('id, full_name, state, tier, reputation_score')
                .order('reputation_score', { ascending: false })
                .limit(50);

            if (!volunteerError && volunteerData) {
                setVolunteers(volunteerData.map((v, i) => ({ ...v, rank: i + 1 })));
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

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={() => setView("chapters")}
                            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border ${view === "chapters"
                                ? "vibrant-apc-gradient text-white shadow-xl scale-105 border-transparent"
                                : "glass border-forest/10 text-forest/40 hover:bg-forest/5"
                                }`}
                        >
                            Chapter Rankings
                        </button>
                        <button
                            onClick={() => setView("volunteers")}
                            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border ${view === "volunteers"
                                ? "vibrant-apc-gradient text-white shadow-xl scale-105 border-transparent"
                                : "glass border-forest/10 text-forest/40 hover:bg-forest/5"
                                }`}
                        >
                            Elite Volunteers
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 bg-forest/5 rounded-full flex items-center justify-center animate-spin">
                            <Trophy className="text-apc-cyan w-6 h-6" />
                        </div>
                        <p className="text-[10px] font-black text-forest/40 uppercase tracking-[0.2em]">Synchronizing Matrix...</p>
                    </div>
                ) : (
                    <>
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {view === "chapters" ? chapters.slice(0, 3).map((chapter, index) => (
                                <motion.div
                                    key={chapter.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`relative p-8 rounded-[2rem] overflow-hidden group border transition-all duration-500 hover:scale-[1.02] ${index === 0
                                        ? "border-gold/30 bg-gold/5 ultra-glass shadow-[0_20px_50px_-10px_rgba(212,175,55,0.2)]"
                                        : "border-forest/10 ultra-glass shadow-xl"
                                        }`}
                                >
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex justify-between items-start">
                                            <span className={`text-5xl font-display font-black italic tracking-tighter ${index === 0 ? "text-gold" : "text-forest/40"}`}>#0{index + 1}</span>
                                            <div className="p-2 rounded-lg bg-forest/5"><ShieldIcon size={20} className="text-forest/20" /></div>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-display font-black text-forest tracking-tighter truncate leading-none">{chapter.state.toUpperCase()}</h3>
                                            <p className="text-[10px] font-black text-forest/40 uppercase tracking-[0.2em]">{chapter.zone}</p>
                                        </div>
                                        <div className="pt-6 border-t border-forest/5 flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-black text-forest/40 uppercase tracking-widest mb-1">Momentum</p>
                                                <p className="text-3xl font-display font-black text-forest italic leading-none">{chapter.momentum_score.toLocaleString()}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center"><TrendingUp className="text-leaf w-5 h-5" /></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )) : volunteers.slice(0, 3).map((volunteer, index) => (
                                <motion.div
                                    key={volunteer.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`relative p-8 rounded-[2rem] overflow-hidden group border transition-all duration-500 hover:scale-[1.02] ${index === 0
                                        ? "border-apc-cyan/30 bg-apc-cyan/5 ultra-glass shadow-[0_20px_50px_-10px_rgba(0,174,239,0.2)]"
                                        : "border-forest/10 ultra-glass shadow-xl"
                                        }`}
                                >
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex justify-between items-start">
                                            <span className={`text-5xl font-display font-black italic tracking-tighter ${index === 0 ? "text-apc-cyan" : "text-forest/40"}`}>#0{index + 1}</span>
                                            <div className="p-2 rounded-lg bg-forest/5"><Trophy size={20} className="text-forest/20" /></div>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-display font-black text-forest tracking-tighter truncate leading-none">{volunteer.full_name}</h3>
                                            <p className="text-[10px] font-black text-forest/40 uppercase tracking-[0.2em]">{volunteer.state || 'National'}</p>
                                        </div>
                                        <div className="pt-6 border-t border-forest/5 flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-black text-forest/40 uppercase tracking-widest mb-1">{volunteer.tier} Rank</p>
                                                <p className="text-3xl font-display font-black text-forest italic leading-none">{volunteer.reputation_score.toLocaleString()} PTS</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center"><Target className="text-apc-cyan w-5 h-5" /></div>
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
                                            <th className="p-6 text-[10px] font-black text-forest/40 uppercase tracking-widest">
                                                {view === "chapters" ? "Chapter" : "Elite Volunteer"}
                                            </th>
                                            <th className="p-6 text-[10px] font-black text-forest/40 uppercase tracking-widest">
                                                {view === "chapters" ? "Zone" : "State / Class"}
                                            </th>
                                            <th className="p-6 text-[10px] font-black text-forest/40 uppercase tracking-widest text-right">
                                                {view === "chapters" ? "Supporters" : "Rank Tier"}
                                            </th>
                                            <th className="p-6 text-[10px] font-black text-forest/40 uppercase tracking-widest text-right">
                                                {view === "chapters" ? "Momentum" : "Reputation"}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {view === "chapters" ? chapters.map((chapter) => (
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
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        )) : volunteers.map((volunteer) => (
                                            <motion.tr
                                                key={volunteer.id}
                                                whileHover={{ backgroundColor: "rgba(0,174,239,0.02)" }}
                                                className="border-b border-forest/5 group cursor-default"
                                            >
                                                <td className="p-6 font-display font-black italic text-forest/20 group-hover:text-apc-cyan transition-colors text-xl">
                                                    #{volunteer.rank?.toString().padStart(2, '0')}
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-display font-black text-forest tracking-tight uppercase text-lg">{volunteer.full_name}</span>
                                                        <span className="text-[10px] font-bold text-forest/40 uppercase tracking-widest">Official Elite Member</span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <span className="text-[10px] font-black px-3 py-1 rounded-full border border-forest/10 text-forest/60 uppercase tracking-[0.1em] ultra-glass">
                                                        {volunteer.state || 'National'}
                                                    </span>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <span className="text-xs font-black text-apc-cyan uppercase tracking-widest px-3 py-1 rounded-lg bg-apc-cyan/5 border border-apc-cyan/10">
                                                        {volunteer.tier}
                                                    </span>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <div className="flex flex-col items-end">
                                                        <span className="font-display font-black text-forest tabular-nums italic text-xl leading-none">
                                                            {volunteer.reputation_score.toLocaleString()}
                                                        </span>
                                                        <span className="text-[10px] text-apc-cyan font-bold mt-1 uppercase">Points Gained</span>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}
