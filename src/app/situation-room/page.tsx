"use client";

import { motion } from "framer-motion";
import {
    ShieldAlert,
    TrendingUp,
    Globe,
    Zap,
    Radar,
    Activity,
    ChevronRight,
    Lock,
    Cpu
} from "lucide-react";
import { useNationalStrategy } from "@/hooks/useNationalStrategy";
import { useAuth } from "@/components/AuthProvider";
import StrategicAdvisor from "@/components/StrategicAdvisor";

export default function SituationRoom() {
    const { user } = useAuth();
    const { metrics, regionalData, loading, refresh } = useNationalStrategy();

    const isAuthorized = ['admin', 'super_admin'].includes(user?.user_metadata?.role || '');

    if (!isAuthorized) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6 px-4 text-center">
                <div className="w-20 h-20 bg-forest/5 rounded-full flex items-center justify-center animate-pulse">
                    <Lock className="w-10 h-10 text-forest/20" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-display font-black text-forest uppercase tracking-widest">Access Restricted</h1>
                    <p className="text-forest/40 font-medium max-w-md mx-auto">
                        The S-EAGLE Situation Room is reserved for National Command and Strategic Oversight teams.
                        Unauthorized access attempts have been logged.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto px-6 space-y-12 pb-24">
            {/* Header / Command Level */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 pt-8 border-b border-forest/5 pb-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-accent-red px-3 py-1 rounded text-[10px] font-black text-white uppercase tracking-[0.3em] animate-pulse">
                            Live Stream Active
                        </div>
                        <div className="text-[10px] font-black text-forest/40 uppercase tracking-[0.2em] flex items-center gap-1">
                            <Activity className="w-3 h-3 text-leaf" /> National Strategy Room 2026
                        </div>
                    </div>
                    <h1 className="text-7xl font-display font-black text-forest leading-none tracking-tighter">
                        S-EAGLE <span className="text-leaf italic">Situation Room</span>
                    </h1>
                </div>

                <div className="flex gap-4">
                    <div className="premium-card bg-forest text-ivory flex items-center gap-6 px-8 py-4 border-none shadow-2xl">
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-leaf mb-1">National Readiness</div>
                            <div className="text-4xl font-display font-black">
                                {loading ? "---" : metrics?.national_readiness_score}%
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                            <Zap className="w-6 h-6 text-leaf fill-leaf" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: AI Advisor & Strategic Metrics */}
                <div className="lg:col-span-4 space-y-10">
                    <StrategicAdvisor />

                    <div className="premium-card space-y-6 bg-forest/5 border-forest/10">
                        <h3 className="text-sm font-black text-forest uppercase tracking-[0.2em] flex items-center gap-2">
                            <Globe className="w-4 h-4 text-leaf" /> Total National Force
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <div className="text-[10px] font-bold text-forest/30 uppercase tracking-widest leading-none">Supporters</div>
                                <div className="text-3xl font-black text-forest leading-none">
                                    {loading ? "---" : metrics?.total_supporters.toLocaleString()}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-bold text-forest/30 uppercase tracking-widest leading-none">Volunteers</div>
                                <div className="text-3xl font-black text-leaf leading-none">
                                    {loading ? "---" : metrics?.total_volunteers.toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-forest/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-black text-forest uppercase tracking-widest">Deployment Saturation</span>
                                <span className="text-xs font-black text-leaf">{(metrics?.active_chapters || 0)} / 37 Chapters</span>
                            </div>
                            <div className="w-full h-2 bg-forest/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((metrics?.active_chapters || 0) / 37) * 100}%` }}
                                    className="h-full bg-leaf shadow-[0_0_10px_rgba(22,163,74,0.3)] transition-all duration-1000"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content: Regional Force Matrix */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="premium-card border-forest/5 shadow-xl bg-white/50 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-display font-black text-forest uppercase tracking-tight">
                                    Regional <span className="text-leaf italic">Intelligence Matrix</span>
                                </h3>
                                <p className="text-[10px] font-bold text-forest/30 uppercase tracking-[0.2em] mt-2">
                                    Strategic Analysis by Geopolitical Zone
                                </p>
                            </div>
                            <button
                                onClick={() => refresh()}
                                className="w-10 h-10 rounded-full border border-forest/5 flex items-center justify-center hover:bg-forest/5 transition-all group"
                            >
                                <Radar className="w-5 h-5 text-forest/40 group-hover:text-leaf transition-colors" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {regionalData.map((region, idx) => (
                                <motion.div
                                    key={region.zone}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative group p-6 rounded-3xl border border-forest/5 hover:border-leaf/30 transition-all bg-ivory shadow-sm hover:shadow-2xl overflow-hidden"
                                >
                                    {/* Risk Indicator */}
                                    {region.urgent_incidents > 0 && (
                                        <div className="absolute top-0 right-0 px-4 py-2 bg-accent-red text-white text-[9px] font-black uppercase tracking-widest rounded-bl-2xl flex items-center gap-2">
                                            <ShieldAlert className="w-3 h-3 animate-bounce" /> {region.urgent_incidents} Hot Zones
                                        </div>
                                    )}

                                    <div className="space-y-6 relative z-10">
                                        <div>
                                            <div className="text-[10px] font-black text-forest/30 uppercase tracking-[0.3em] mb-1">{region.zone}</div>
                                            <h4 className="text-xl font-black text-forest group-hover:text-leaf transition-colors">{region.chapter_count} Active Chapters</h4>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-forest/[0.03] p-4 rounded-2xl">
                                                <div className="text-[9px] font-bold text-forest/30 uppercase mb-1">Supporters</div>
                                                <div className="text-xl font-black text-forest">{region.total_supporters.toLocaleString()}</div>
                                            </div>
                                            <div className="bg-forest/[0.03] p-4 rounded-2xl">
                                                <div className="text-[9px] font-bold text-forest/30 uppercase mb-1">Momentum</div>
                                                <div className="text-xl font-black text-forest">{Math.round(region.avg_momentum)}%</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-forest/5">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-forest/5 flex items-center justify-center text-[8px] font-black text-forest/40">
                                                        {i}
                                                    </div>
                                                ))}
                                                <div className="w-6 h-6 rounded-full border-2 border-white bg-leaf flex items-center justify-center text-[8px] font-black text-white">
                                                    + {region.chapter_count}
                                                </div>
                                            </div>
                                            <button className="text-[10px] font-black text-forest/40 group-hover:text-leaf uppercase tracking-widest flex items-center gap-1 transition-all">
                                                DEPLOYMENT MAP <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Background Decor */}
                                    <Activity className="absolute -bottom-4 -right-4 w-32 h-32 text-forest/[0.02] group-hover:text-leaf/[0.05] transition-all" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="premium-card bg-accent-red/[0.02] border-accent-red/10 flex flex-col justify-between group">
                            <div className="space-y-6">
                                <div className="w-12 h-12 bg-accent-red/10 rounded-2xl flex items-center justify-center">
                                    <TrendingUp className="text-accent-red w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-display font-black text-forest uppercase italic">Incident Velocity</h4>
                                    <p className="text-xs text-forest/40 font-medium leading-relaxed">
                                        Real-time tracking of report density changes over the last 60 minutes.
                                    </p>
                                </div>
                            </div>
                            <button className="mt-10 py-4 w-full rounded-2xl bg-forest text-ivory text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-accent-red transition-all shadow-xl">
                                ANALYZE TRENDS
                            </button>
                        </div>

                        <div className="premium-card bg-leaf/[0.02] border-leaf/10 flex flex-col justify-between group">
                            <div className="space-y-6">
                                <div className="w-12 h-12 bg-leaf/10 rounded-2xl flex items-center justify-center">
                                    <Cpu className="text-leaf w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-display font-black text-forest uppercase italic">S-EAGLE Prediction</h4>
                                    <p className="text-xs text-forest/40 font-medium leading-relaxed">
                                        ML-driven forecasting of mobilization velocity based on historic data.
                                    </p>
                                </div>
                            </div>
                            <button className="mt-10 py-4 w-full rounded-2xl bg-forest text-ivory text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-leaf transition-all shadow-xl">
                                UNLOCK FORECAST
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
