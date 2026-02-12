"use client";

import { motion } from "framer-motion";
import {
    Users,
    TrendingUp,
    Activity,
    ChevronRight,
    Plus,
    Rocket,
    MessageSquare,
    Shield,
    Zap,
} from "lucide-react";
import NigeriaMap, { NIGERIA_STATES, ZONE_LABELS } from "@/components/NigeriaMap";
import { useState, useMemo } from "react";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<"map" | "zones">("map");

    // Compute zone-level stats
    const zoneStats = useMemo(() => {
        const zones: Record<string, { supporters: number; states: number; topState: string }> = {};
        NIGERIA_STATES.forEach((s) => {
            if (!zones[s.zone]) zones[s.zone] = { supporters: 0, states: 0, topState: "" };
            zones[s.zone].supporters += s.supporters;
            zones[s.zone].states += 1;
            if (!zones[s.zone].topState || s.supporters > (NIGERIA_STATES.find(x => x.name === zones[s.zone].topState)?.supporters || 0)) {
                zones[s.zone].topState = s.name;
            }
        });
        return zones;
    }, []);

    // Top 5 states by members
    const topStates = useMemo(
        () => [...NIGERIA_STATES].sort((a, b) => b.supporters - a.supporters).slice(0, 5),
        []
    );

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-display font-black text-forest leading-tight">
                        Campaign <span className="text-leaf italic">Headquarters</span>
                    </h1>
                    <p className="text-forest/60 font-medium">See how the movement is growing across Nigeria.</p>
                </div>
                <div className="flex gap-4">
                    <button className="glass px-6 py-3 rounded-xl font-bold text-forest hover:bg-white transition-all flex items-center gap-2">
                        Export Report
                    </button>
                    <button className="forest-gradient text-ivory px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                        <Plus className="w-5 h-5 text-leaf" />
                        New Mobilization
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Interactive Nigeria Map */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="premium-card overflow-hidden relative">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                            <div>
                                <h2 className="text-xl font-display font-bold text-forest">National Reach</h2>
                                <div className="flex items-center gap-2 text-xs font-bold text-forest/40 uppercase tracking-widest mt-1">
                                    <Activity className="w-3 h-3 text-leaf" />
                                    Live Activity Mapping
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveTab("map")}
                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeTab === "map"
                                        ? "forest-gradient text-ivory shadow-lg"
                                        : "bg-forest/5 text-forest/60 hover:bg-forest/10"
                                        }`}
                                >
                                    Map View
                                </button>
                                <button
                                    onClick={() => setActiveTab("zones")}
                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeTab === "zones"
                                        ? "forest-gradient text-ivory shadow-lg"
                                        : "bg-forest/5 text-forest/60 hover:bg-forest/10"
                                        }`}
                                >
                                    Zone Breakdown
                                </button>
                            </div>
                        </div>

                        {activeTab === "map" ? (
                            <NigeriaMap variant="dashboard" />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-3 pt-4"
                            >
                                {Object.entries(zoneStats).map(([zone, data]) => (
                                    <div
                                        key={zone}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-forest/[0.02] hover:bg-forest/[0.05] transition-all cursor-default"
                                    >
                                        <div className="w-10 h-10 rounded-xl forest-gradient flex items-center justify-center text-ivory text-xs font-black shrink-0">
                                            {zone}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <span className="font-display font-bold text-forest text-sm">{ZONE_LABELS[zone]}</span>
                                                <span className="text-leaf font-black text-sm">{data.supporters.toLocaleString()}</span>
                                            </div>
                                            <div className="mt-2 h-2 bg-forest/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(data.supporters / 50000) * 100}%` }}
                                                    transition={{ duration: 0.8, delay: 0.2 }}
                                                    className="h-full leaf-gradient rounded-full"
                                                />
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-[10px] font-bold text-forest/30 uppercase">{data.states} States</span>
                                                <span className="text-[10px] font-bold text-leaf/60">Top: {data.topState}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* Top States Ticker */}
                        <div className="mt-6 pt-4 border-t border-forest/5">
                            <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-3 h-3 text-leaf" />
                                <span className="text-[10px] font-black text-forest/40 uppercase tracking-widest">Strongest Chapters</span>
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {topStates.map((s, i) => (
                                    <div
                                        key={s.id}
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-forest/[0.03] border border-forest/5 shrink-0 hover:border-leaf/30 transition-all"
                                    >
                                        <span className="text-xs font-black text-forest/30">#{i + 1}</span>
                                        <div>
                                            <div className="text-sm font-bold text-forest whitespace-nowrap">{s.name}</div>
                                            <div className="text-[10px] font-bold text-leaf">{s.supporters.toLocaleString()} supporters</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="premium-card">
                            <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-leaf" />
                                Weekly Momentum
                            </h3>
                            <div className="h-40 flex items-end gap-2 px-2">
                                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        className="flex-1 bg-forest/10 rounded-t-md hover:bg-leaf/40 transition-colors relative group"
                                    >
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-forest text-ivory text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {h}k new supporters
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] font-bold text-forest/20 uppercase">
                                <span>Mon</span>
                                <span>Sun</span>
                            </div>
                        </div>

                        <div className="premium-card">
                            <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest mb-6">Latest Activities</h3>
                            <div className="space-y-4">
                                {[
                                    { title: "Campus Meetup", state: "Oyo", date: "2h ago" },
                                    { title: "Digital Mission #4", state: "Abuja", date: "5h ago" },
                                    { title: "Chapter Lunch", state: "Imo", date: "1d ago" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-forest/5 hover:bg-forest/10 transition-colors group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-leaf" />
                                            <div>
                                                <div className="text-sm font-bold text-forest">{item.title}</div>
                                                <div className="text-[10px] text-forest/40 font-bold uppercase">{item.state}</div>
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-bold text-forest/30 group-hover:text-forest transition-colors">{item.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Leaderboard & Missions */}
                <div className="space-y-8">
                    <div className="premium-card forest-gradient text-ivory relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xs font-bold text-leaf uppercase tracking-[0.2em] mb-4">Ongoing Campaign</h3>
                            <div className="text-2xl font-display font-black mb-2">Build for Renewed Hope</div>
                            <p className="text-ivory/60 text-sm font-medium mb-6">3,450 Innovators building solutions right now.</p>
                            <button className="leaf-gradient text-ivory w-full py-4 rounded-xl font-black shadow-xl hover:scale-[1.02] transition-all">
                                JOIN CHALLENGE
                            </button>
                        </div>
                        <Rocket className="absolute -bottom-8 -right-8 w-40 h-40 text-ivory/5 rotate-12" />
                    </div>

                    <div className="premium-card">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest">Top Performers</h3>
                            <ChevronRight className="w-4 h-4 text-forest/20" />
                        </div>
                        <div className="space-y-6">
                            {[
                                { name: "Lagos Innovation Hub", rank: 1, points: "45.2k", trend: "up" },
                                { name: "Abuja Tech Chapter", rank: 2, points: "38.9k", trend: "up" },
                                { name: "Kano Hackers", rank: 3, points: "31.5k", trend: "down" },
                            ].map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center font-black text-forest text-sm">
                                            {item.rank}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-forest">{item.name}</div>
                                            <div className="text-[10px] font-bold text-forest/30 uppercase tracking-widest">{item.points} Points</div>
                                        </div>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${item.trend === 'up' ? 'bg-leaf' : 'bg-accent-red'} shadow-sm`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card bg-ivory/50">
                        <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "New Mission", icon: Rocket },
                                { label: "Add Member", icon: Users },
                                { label: "Media Pack", icon: MessageSquare },
                                { label: "Support", icon: Shield },
                            ].map((action) => (
                                <button key={action.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-forest/5 hover:border-leaf/50 hover:shadow-lg transition-all text-forest group">
                                    <action.icon className="w-5 h-5 group-hover:text-leaf transition-colors" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
