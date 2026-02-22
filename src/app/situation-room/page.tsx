"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity,
    Globe,
    Zap,
    Radar,
    ChevronRight,
    ShieldAlert,
    Radio,
    Users,
    AlertTriangle,
    Signal,
    Target,
    Maximize2,
    Lock,
    TrendingUp
} from 'lucide-react';
import { useNationalStrategy } from "@/hooks/useNationalStrategy";
import { useAuth } from "@/components/AuthProvider";
import StrategicAdvisor from "@/components/StrategicAdvisor";
import IntelligenceFeed from "@/components/IntelligenceFeed";
import TacticalTicker from "@/components/TacticalTicker";
import CommandDirectives from "@/components/CommandDirectives";
import CommandConsole from "@/components/CommandConsole";
import Navbar from "@/components/Navbar";

export default function SituationRoom() {
    const { user } = useAuth();
    const { metrics, regionalData, loading, refresh } = useNationalStrategy();
    const [view, setView] = useState<'strategic' | 'command'>('strategic');

    const isAuthorized = ['admin', 'super_admin'].includes(user?.user_metadata?.role || '');

    if (!isAuthorized) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6 px-4 text-center">
                <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center animate-pulse">
                    <Lock className="w-10 h-10 text-apc-cyan/20" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-display font-black text-foreground uppercase tracking-widest">Access Restricted</h1>
                    <p className="text-foreground/40 font-medium max-w-md mx-auto">
                        The S-EAGLE Situation Room is reserved for National Command and Strategic Oversight teams.
                        Unauthorized access attempts have been logged.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory">
            <Navbar />

            {/* Tactical Incident Ticker */}
            <div className="pt-20">
                <TacticalTicker />
            </div>

            <div className="max-w-[1600px] mx-auto px-6 space-y-12 pb-24">
                {/* Header / Command Level */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 pt-8 border-b border-foreground/5 pb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="px-2 py-0.5 rounded bg-apc-red/10 border border-apc-red/20 flex items-center gap-1.5">
                                <Radio className="w-2.5 h-2.5 text-apc-red animate-pulse" />
                                <span className="text-[9px] font-black text-apc-red uppercase tracking-wider">Status: Combat Ready</span>
                            </div>
                        </div>
                        <h1 className="text-5xl font-display font-black text-foreground leading-[0.9] tracking-tighter">
                            National <span className="text-apc-cyan italic underline decoration-apc-red/30 underline-offset-8">Situation Room</span>
                        </h1>
                        <p className="text-foreground/60 font-medium mt-4 max-w-2xl">
                            Real-time intelligence and strategic oversight for national security and operational readiness.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex bg-foreground/5 p-1 rounded-2xl border border-foreground/10 backdrop-blur-md">
                            <button
                                onClick={() => setView('strategic')}
                                className={`px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${view === 'strategic'
                                    ? 'bg-foreground text-ivory shadow-xl'
                                    : 'text-foreground/40 hover:text-foreground'
                                    }`}
                            >
                                Strategic View
                            </button>
                            <button
                                onClick={() => setView('command')}
                                className={`px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${view === 'command'
                                    ? 'bg-apc-red text-white shadow-xl'
                                    : 'text-foreground/40 hover:text-apc-red'
                                    }`}
                            >
                                Command Control
                            </button>
                        </div>
                        <div className="premium-card bg-foreground text-ivory flex items-center gap-6 px-8 py-4 border-none shadow-2xl">
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-apc-cyan mb-1">National Readiness</div>
                                <div className="text-4xl font-display font-black">
                                    {loading ? "---" : metrics?.national_readiness_score}%
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                <Zap className="w-6 h-6 text-apc-cyan fill-apc-cyan" />
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {view === 'command' ? (
                        <motion.div
                            key="command"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <CommandConsole />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="strategic"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            {/* Left Column: AI Advisor & Strategic Metrics */}
                            <div className="lg:col-span-4 space-y-10">
                                <div className="premium-card space-y-6 bg-foreground/5 border-foreground/10">
                                    <h3 className="text-sm font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-apc-cyan" /> Total National Force
                                    </h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        {[
                                            { label: "Supporters", value: metrics?.total_supporters.toLocaleString(), color: "text-foreground", icon: Users, trend: "+1.2%" },
                                            { label: "Volunteers", value: metrics?.total_volunteers.toLocaleString(), color: "text-apc-cyan", icon: Activity, trend: "+0.8%" },
                                        ].map((stat, index) => (
                                            <div key={index} className="flex flex-col justify-between items-start">
                                                <div className="flex items-center justify-between w-full">
                                                    <div className={`w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center ${stat.color}`}>
                                                        <stat.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className={`text-[10px] font-black ${stat.trend.includes('+') ? 'text-apc-green' : stat.trend === 'Optimal' ? 'text-apc-cyan' : 'text-apc-red'}`}>
                                                        {stat.trend}
                                                    </span>
                                                </div>
                                                <div className="mt-4">
                                                    <div className="text-2xl font-black text-foreground">{stat.value}</div>
                                                    <div className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest leading-none">{stat.label}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-6 border-t border-foreground/5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black text-foreground uppercase tracking-widest">Deployment Saturation</span>
                                            <span className="text-xs font-black text-apc-cyan">{(metrics?.active_chapters || 0)} / 37 Chapters</span>
                                        </div>
                                        <div className="w-full h-2 bg-foreground/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${((metrics?.active_chapters || 0) / 37) * 100}%` }}
                                                className="h-full bg-apc-cyan shadow-[0_0_10px_rgba(22,163,74,0.3)] transition-all duration-1000"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content: Regional Force Matrix */}
                            <div className="lg:col-span-8 space-y-10">
                                <div className="premium-card border-foreground/5 shadow-xl bg-white/50 backdrop-blur-xl">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h2 className="text-xl font-display font-black text-foreground">Strategic Overlay</h2>
                                            <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Across all 6 Geo-Political Zones</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => refresh()}
                                                className="w-10 h-10 rounded-full border border-foreground/5 flex items-center justify-center hover:bg-foreground/5 transition-all group"
                                            >
                                                <Radar className="w-5 h-5 text-foreground/40 group-hover:text-apc-cyan transition-colors" />
                                            </button>
                                            <button className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors">
                                                <Maximize2 className="w-4 h-4 text-foreground/40" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Top Metrics Row */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                        {[
                                            { label: "Mobilization Units", value: "842", icon: Users, color: "text-apc-cyan", trend: "+12.4%" },
                                            { label: "Critical Incidents", value: "14", icon: AlertTriangle, color: "text-apc-red", trend: "-2.1%" },
                                            { label: "Network Strength", value: "98.2%", icon: Signal, color: "text-apc-green", trend: "Optimal" },
                                            { label: "Strategic Reserves", value: "₦4.2M", icon: Target, color: "text-apc-gold", trend: "+5.0%" },
                                        ].map((stat) => (
                                            <div key={stat.label} className="premium-card p-4 bg-foreground/5 border-foreground/10 flex flex-col justify-between">
                                                <div className="flex items-center justify-between">
                                                    <div className={`w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center ${stat.color}`}>
                                                        <stat.icon className="w-4 h-4" />
                                                    </div>
                                                    <span className={`text-[9px] font-black ${stat.trend.includes('+') ? 'text-apc-green' : stat.trend === 'Optimal' ? 'text-apc-cyan' : 'text-apc-red'}`}>
                                                        {stat.trend}
                                                    </span>
                                                </div>
                                                <div className="mt-3">
                                                    <div className="text-xl font-black text-foreground">{stat.value}</div>
                                                    <div className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest leading-none">{stat.label}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {regionalData.map((region, idx) => (
                                            <motion.div
                                                key={region.zone}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="relative group p-6 rounded-3xl border border-foreground/5 hover:border-apc-cyan/30 transition-all bg-ivory shadow-sm hover:shadow-2xl overflow-hidden"
                                            >
                                                {/* Risk Indicator */}
                                                {region.urgent_incidents > 0 && (
                                                    <div className="absolute top-0 right-0 px-4 py-2 bg-apc-red text-white text-[9px] font-black uppercase tracking-widest rounded-bl-2xl flex items-center gap-2">
                                                        <ShieldAlert className="w-3 h-3 animate-bounce" /> {region.urgent_incidents} Hot Zones
                                                    </div>
                                                )}

                                                <div className="space-y-6 relative z-10">
                                                    <div>
                                                        <div className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mb-1">{region.zone}</div>
                                                        <h4 className="text-xl font-black text-foreground group-hover:text-apc-cyan transition-colors">{region.chapter_count} Active Chapters</h4>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="bg-foreground/[0.03] p-4 rounded-2xl">
                                                            <div className="text-[9px] font-bold text-foreground/30 uppercase mb-1">Supporters</div>
                                                            <div className="text-xl font-black text-foreground">{region.total_supporters.toLocaleString()}</div>
                                                        </div>
                                                        <div className="bg-foreground/[0.03] p-4 rounded-2xl">
                                                            <div className="text-[9px] font-bold text-foreground/30 uppercase mb-1">Momentum</div>
                                                            <div className="text-xl font-black text-foreground">{Math.round(region.avg_momentum)}%</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
                                                        <div className="flex -space-x-2">
                                                            {[1, 2, 3].map(i => (
                                                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-foreground/5 flex items-center justify-center text-[8px] font-black text-foreground/40">
                                                                    {i}
                                                                </div>
                                                            ))}
                                                            <div className="w-6 h-6 rounded-full border-2 border-white bg-apc-cyan flex items-center justify-center text-[8px] font-black text-white">
                                                                + {region.chapter_count}
                                                            </div>
                                                        </div>
                                                        <button className="text-[10px] font-black text-foreground/40 group-hover:text-apc-cyan uppercase tracking-widest flex items-center gap-1 transition-all">
                                                            DEPLOYMENT MAP <ChevronRight className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Background Decor */}
                                                <Activity className="absolute -bottom-4 -right-4 w-32 h-32 text-foreground/[0.02] group-hover:text-apc-cyan/[0.05] transition-all" />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 opacity-80 mt-8">
                                        {[
                                            { label: "Zone Strength", value: "88%", color: "bg-apc-cyan" },
                                            { label: "Mobilization Rate", value: "92%", color: "bg-apc-green" },
                                            { label: "Risk Mitigation", value: "High", color: "bg-apc-gold" },
                                        ].map((insight) => (
                                            <div key={insight.label} className="flex flex-col gap-2">
                                                <div className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">{insight.label}</div>
                                                <div className="flex items-end gap-3">
                                                    <div className="text-xl font-black text-foreground">{insight.value}</div>
                                                    <div className="flex-1 h-1.5 bg-foreground/5 rounded-full mb-1.5">
                                                        <div className={`h-full ${insight.color} rounded-full`} style={{ width: insight.value.includes('%') ? insight.value : '90%' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <StrategicAdvisor />
                                        <div className="premium-card">
                                            <h3 className="text-sm font-black text-foreground/40 uppercase tracking-widest mb-6 py-2 border-b border-apc-red/10 flex items-center justify-between">
                                                <span>Live National Intel</span>
                                                <span className="text-[10px] text-apc-cyan">Verifiable Stream</span>
                                            </h3>
                                            <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                                <IntelligenceFeed isNational />
                                            </div>
                                        </div>
                                    </div>

                                    <CommandDirectives />
                                </div>

                                <div className="premium-card">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-sm font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-apc-green" />
                                            National Performance Trendlines
                                        </h3>
                                    </div>
                                    <div className="h-48 flex items-end gap-2 px-2 pb-6 border-b border-foreground/5">
                                        {[65, 45, 75, 55, 85, 95, 80, 70, 90, 85, 95, 100].map((h, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                                <div className="w-full bg-foreground/5 rounded-t-lg hover:bg-apc-cyan/40 transition-all relative" style={{ height: `${h}%` }}>
                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-black">
                                                        {h}% STRENGTH
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
