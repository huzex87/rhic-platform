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
    Loader2,
    ShieldCheck,
    Radio,
    SignalHigh,
} from "lucide-react";
import NigeriaMap, { ZONE_LABELS } from "@/components/NigeriaMap";
import { useState } from "react";
import Link from "next/link";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useAuth } from "@/components/AuthProvider";
import { useActivities } from "@/hooks/useActivities";
import { useFieldCommand } from "@/hooks/useFieldCommand";
import { useChapterData } from "@/hooks/useChapterData";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<"map" | "zones">("map");
    const { stats, loading } = useDashboardData();
    const { activities, loading: activitiesLoading } = useActivities(5);
    const { user } = useAuth();
    const { chapter } = useChapterData();
    const { announcements } = useFieldCommand(chapter?.id);

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="px-2 py-0.5 rounded bg-accent-red/10 border border-accent-red/20 flex items-center gap-1.5">
                            <Radio className="w-2.5 h-2.5 text-accent-red animate-pulse" />
                            <span className="text-[9px] font-black text-accent-red uppercase tracking-wider">Status: Tactical</span>
                        </div>
                        <div className="px-2 py-0.5 rounded bg-leaf/10 border border-leaf/20 flex items-center gap-1.5">
                            <SignalHigh className="w-2.5 h-2.5 text-leaf" />
                            <span className="text-[9px] font-black text-leaf uppercase tracking-wider">Live Intel Feed</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-black text-forest leading-[0.9] tracking-tighter">
                        Campaign <span className="text-leaf italic underline decoration-accent-red/30 underline-offset-8">Headquarters</span>
                    </h1>
                    <p className="text-forest/60 font-medium mt-4">
                        {user ? `Operational Command established for ${user.user_metadata?.full_name || user.email?.split("@")[0]}. ` : ""}
                        Strategic deployment analysis across all 37 States.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="glass px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-forest/60 hover:text-forest hover:bg-white transition-all border border-forest/10">
                        Operational Log
                    </button>
                    <button className="forest-gradient text-ivory px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center gap-2 border border-accent-red/20 group">
                        <Plus className="w-4 h-4 text-leaf group-hover:rotate-90 transition-transform" />
                        Initiate Mobilization
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Supporters", value: stats?.totalSupporters ?? 0, icon: Users, color: "text-leaf" },
                    { label: "Active Chapters", value: stats?.activeChapters ?? 0, icon: Activity, color: "text-accent-red" },
                    { label: "Total Chapters", value: stats?.totalChapters ?? 0, icon: Shield, color: "text-forest" },
                    { label: "Recent Signups", value: stats?.recentSignups ?? 0, icon: TrendingUp, color: "text-leaf" },
                ].map((stat) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="premium-card flex items-center gap-4"
                    >
                        <div className={`w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-forest">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin text-leaf" /> : stat.value.toLocaleString()}
                            </div>
                            <div className="text-[10px] font-bold text-forest/30 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
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
                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${activeTab === "map"
                                        ? "forest-gradient text-ivory shadow-lg border-accent-red/20"
                                        : "bg-forest/5 text-forest/60 hover:bg-forest/10 border-transparent"
                                        }`}
                                >
                                    Map View
                                </button>
                                <button
                                    onClick={() => setActiveTab("zones")}
                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${activeTab === "zones"
                                        ? "forest-gradient text-ivory shadow-lg border-accent-red/20"
                                        : "bg-forest/5 text-forest/60 hover:bg-forest/10 border-transparent"
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
                                {stats?.zoneBreakdown && Object.entries(stats.zoneBreakdown).map(([zone, data]) => (
                                    <div
                                        key={zone}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-forest/[0.02] hover:bg-forest/[0.05] transition-all cursor-default border border-accent-red/5"
                                    >
                                        <div className="w-10 h-10 rounded-xl forest-gradient flex items-center justify-center text-ivory text-xs font-black shrink-0">
                                            {zone.slice(0, 2)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <span className="font-display font-bold text-forest text-sm">{ZONE_LABELS[zone] || zone}</span>
                                                <span className="text-leaf font-black text-sm">{data.supporters.toLocaleString()}</span>
                                            </div>
                                            <div className="mt-2 h-2 bg-forest/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min((data.supporters / 50000) * 100, 100)}%` }}
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
                                {!stats?.zoneBreakdown && loading && (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="w-8 h-8 animate-spin text-leaf" />
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Top Chapters Ticker */}
                        <div className="mt-6 pt-4 border-t border-accent-red/10">
                            <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-3 h-3 text-leaf" />
                                <span className="text-[10px] font-black text-forest/40 uppercase tracking-widest">Strongest Chapters</span>
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {(stats?.topChapters || []).map((c, i) => (
                                    <div
                                        key={c.id}
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-forest/[0.03] border border-accent-red/10 shrink-0 hover:border-leaf/30 transition-all"
                                    >
                                        <span className="text-xs font-black text-forest/30">#{i + 1}</span>
                                        <div>
                                            <div className="text-sm font-bold text-forest whitespace-nowrap">{c.state}</div>
                                            <div className="text-[10px] font-bold text-leaf">{(c.supporter_count || 0).toLocaleString()} supporters</div>
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex items-center px-4">
                                        <Loader2 className="w-4 h-4 animate-spin text-leaf" />
                                    </div>
                                )}
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
                                {(stats?.momentum || [40, 70, 45, 90, 65, 80, 55]).map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${Math.max(h, 5)}%` }}
                                        className="flex-1 bg-forest/10 rounded-t-md hover:bg-leaf/40 transition-colors relative group"
                                    >
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-forest text-ivory text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {h} mobilization events
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
                                {activities.length > 0 ? activities.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-forest/5 hover:bg-forest/10 transition-colors group cursor-pointer border border-accent-red/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-leaf" />
                                            <div>
                                                <div className="text-sm font-bold text-forest">{item.title}</div>
                                                <div className="text-[10px] text-forest/40 font-bold uppercase">{item.profiles?.full_name || 'Anonymous'} • {item.profiles?.state || 'Nigeria'}</div>
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-bold text-forest/30 group-hover:text-forest transition-colors">
                                            {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-forest/30 text-xs font-bold uppercase italic">
                                        {activitiesLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto text-leaf" /> : "No recent activity recorded"}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Chapter Announcements Widget */}
                        <div className="premium-card lg:col-span-2 border-leaf/10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest flex items-center gap-2">
                                    <Radio className="w-4 h-4 text-accent-red" />
                                    National Intelligence Stream
                                </h3>
                                <div className="text-[10px] font-black text-accent-red px-2 py-1 rounded bg-accent-red/5 uppercase border border-accent-red/10">
                                    Sector: {user?.user_metadata?.state || "National"}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {announcements.length > 0 ? announcements.slice(0, 2).map((ann) => (
                                    <div key={ann.id} className="p-4 rounded-2xl bg-forest/5 border border-forest/5 hover:border-leaf/20 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${ann.priority === 'High' || ann.priority === 'Urgent' ? 'bg-accent-red/10 text-accent-red' : 'bg-leaf/10 text-leaf'
                                                }`}>
                                                {ann.priority}
                                            </span>
                                            <span className="text-[9px] font-bold text-forest/20">{new Date(ann.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <h4 className="text-sm font-black text-forest mb-1">{ann.title}</h4>
                                        <p className="text-xs text-forest/60 line-clamp-2 font-medium">{ann.content}</p>
                                    </div>
                                )) : (
                                    <div className="col-span-2 flex flex-col items-center justify-center py-6 text-center">
                                        <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center mb-2">
                                            <Radio className="w-5 h-5 text-forest/10" />
                                        </div>
                                        <p className="text-[10px] font-bold text-forest/30 uppercase italic">No active field orders for your chapter</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Innovator Profile Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="premium-card border-leaf/30 bg-leaf/5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-leaf uppercase tracking-widest">Your Profile</h3>
                                <Link href="/settings" className="text-[10px] font-black text-forest/40 hover:text-forest transition-colors uppercase">Edit →</Link>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl forest-gradient flex items-center justify-center text-ivory font-black">
                                    {user?.user_metadata?.full_name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "RH"}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-display font-bold text-forest leading-tight truncate max-w-[150px]">
                                        {user?.user_metadata?.full_name || "Innovator"}
                                    </span>
                                    {user?.user_metadata?.is_volunteer && (
                                        <span className="text-[8px] font-black text-leaf uppercase tracking-widest flex items-center gap-1 mt-0.5">
                                            <ShieldCheck className="w-2.5 h-2.5" /> Verified Volunteer
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/50 border border-leaf/10 text-xs font-medium text-forest/70 leading-relaxed italic">
                                &quot;The Renewed Hope mandate is the foundation of our collective progress.&quot;
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Col: Leaderboard & Missions */}
                <div className="space-y-8">
                    <div className="premium-card forest-gradient text-ivory relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xs font-bold text-leaf uppercase tracking-[0.2em] mb-4">Ongoing Campaign</h3>
                            <div className="text-2xl font-display font-black mb-2">Build for Renewed Hope</div>
                            <p className="text-ivory/60 text-sm font-medium mb-6">
                                {stats ? `${stats.totalSupporters.toLocaleString()} supporters` : "3,450 Innovators"} building solutions right now.
                            </p>
                            <button className="leaf-gradient text-ivory w-full py-4 rounded-xl font-black shadow-xl hover:scale-[1.02] transition-all border border-accent-red/20">
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
                            {(stats?.topChapters || []).slice(0, 3).map((chapter, i) => (
                                <div key={chapter.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center font-black text-forest text-sm border border-accent-red/10">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-forest">{chapter.name}</div>
                                            <div className="text-[10px] font-bold text-forest/30 uppercase tracking-widest">{(chapter.supporter_count || 0).toLocaleString()} Supporters</div>
                                        </div>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${i < 2 ? 'bg-leaf' : 'bg-accent-red'} shadow-sm`} />
                                </div>
                            ))}
                            {loading && (
                                <div className="flex items-center justify-center py-4">
                                    <Loader2 className="w-5 h-5 animate-spin text-leaf" />
                                </div>
                            )}
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
                                <button key={action.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-accent-red/10 hover:border-leaf/50 hover:shadow-lg transition-all text-forest group btn-accent">
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
