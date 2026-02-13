"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Map as MapIcon,
    TrendingUp,
    ShieldAlert,
    Zap,
    Globe,
    Radio,
    Terminal,
} from 'lucide-react';
import NigeriaMap from '@/components/NigeriaMap';
import { useStrategyData } from '@/hooks/useStrategyData';

// Strategy Room Component - Real-time aggregate visualization


export default function StrategyRoom() {
    const [activeTab, setActiveTab] = useState<'overview' | 'geospatial' | 'analytics'>('overview');
    const { stats, loading } = useStrategyData();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-12 h-12 border-4 border-leaf border-t-transparent rounded-full animate-spin" />
                <p className="text-forest/40 font-black uppercase tracking-widest text-xs">Decrypting Strategic Data...</p>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-8 pb-12">
            {/* Strategic Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="px-2 py-0.5 rounded bg-accent-red/10 border border-accent-red/20 flex items-center gap-1.5 transition-all">
                            <Radio className="w-2.5 h-2.5 text-accent-red animate-pulse" />
                            <span className="text-[9px] font-black text-accent-red uppercase tracking-wider">Operational Mode: Strategic Command</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-forest tracking-[0.02em] leading-tight md:leading-[0.9]">
                        Situation <span className="text-leaf underline decoration-accent-red/30 underline-offset-8 md:underline-offset-12">Console</span>
                    </h1>
                    <p className="text-forest/60 font-medium mt-3 md:mt-4 max-w-xl text-sm md:text-lg leading-relaxed">
                        Real-time aggregate analysis of national mobilization vectors and regional force readiness.
                    </p>
                </div>

                <div className="flex bg-forest/5 p-1 rounded-2xl border border-forest/10 backdrop-blur-md w-full md:w-auto overflow-x-auto no-scrollbar">
                    {[
                        { id: 'overview', icon: BarChart3, label: 'Analytics' },
                        { id: 'geospatial', icon: MapIcon, label: 'Deployment' },
                        { id: 'analytics', icon: TrendingUp, label: 'Projections' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'overview' | 'geospatial' | 'analytics')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === tab.id
                                ? 'bg-ivory text-forest shadow-2xl scale-[1.02] md:scale-[1.05] border border-accent-red/10'
                                : 'text-forest/40 hover:text-forest hover:bg-forest/5'
                                }`}
                        >
                            <tab.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="whitespace-nowrap">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="National Momentum" value={`${stats.national_momentum}%`} icon={Zap} color="text-leaf" trend="+4.2%" />
                    <StatCard title="Total Outreach" value={stats.total_reach} icon={Globe} color="text-forest" trend="+120k" />
                    <StatCard title="Verified Force" value={stats.active_volunteers} icon={ShieldAlert} color="text-accent-red" trend="+1.2k" />
                    <StatCard
                        title="Molecular Saturation"
                        value={`${stats.pu_saturation}%`}
                        icon={TrendingUp}
                        color="text-leaf"
                        trend="Cold Zone Analysis"
                        subtext={`${stats.pu_coverage} / ${stats.total_pus} PUs Covered`}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 premium-card overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-forest">Geospatial Momentum</h3>
                            <p className="text-xs text-forest/40 font-bold uppercase tracking-widest mt-1">Cross-State Mobilization Density</p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-forest/40">
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-forest/10" /> Low</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-leaf" /> High</span>
                        </div>
                    </div>

                    <div className="h-[500px] w-full bg-forest/5 rounded-3xl flex items-center justify-center border border-forest/10 relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
                            <NigeriaMap />
                        </div>
                        <div className="relative z-10 text-center space-y-4 p-6">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-ivory rounded-xl md:rounded-2xl shadow-xl flex items-center justify-center mx-auto border border-forest/5">
                                <MapIcon className="w-6 h-6 md:w-8 md:h-8 text-leaf" />
                            </div>
                            <div>
                                <h4 className="text-base md:text-lg font-black text-forest">Interactive Strategy Map</h4>
                                <p className="text-xs md:text-sm text-forest/60 font-medium max-w-xs px-2 md:px-6">Select a region to deep-dive into LGA readiness and volunteer saturation.</p>
                            </div>
                            <button className="w-full md:w-auto px-8 py-3 bg-forest text-ivory rounded-xl font-bold text-xs md:text-sm hover:bg-leaf transition-colors shadow-lg">
                                Activate Live Map
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="premium-card">
                        <h3 className="text-xl font-black text-forest mb-6">Zone Breakdown</h3>
                        <div className="space-y-6">
                            {stats.top_zones.map((zone, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-[10px] font-black text-forest/20 uppercase tracking-widest">{zone.trend} growth</span>
                                            <p className="text-sm font-black text-forest">{zone.name}</p>
                                        </div>
                                        <span className="text-xs font-bold text-forest/40">{zone.count >= 1000000 ? `${(zone.count / 1000000).toFixed(1)}M` : `${(zone.count / 1000).toFixed(0)}K`} Supporters</span>
                                    </div>
                                    <div className="h-2 w-full bg-forest/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${zone.readiness}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className="h-full bg-leaf rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card bg-forest text-ivory border border-white/10 relative overflow-hidden group shadow-2xl shadow-forest/40">
                        <Terminal className="absolute -top-12 -right-12 w-48 h-48 text-ivory/5 rotate-12" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-ivory/10 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                                <ShieldAlert className="w-6 h-6 text-leaf" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight">Intelligence Integrity</h3>
                            <p className="text-ivory/60 text-sm font-medium mb-8 leading-relaxed">
                                All mission data is encrypted in transit and gated by **Command Level 5** RLS protocols. Strategic clearance is required for regional granular views.
                            </p>
                            <div className="flex items-center gap-3 group cursor-pointer bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                <span className="text-[10px] font-black text-leaf tracking-widest uppercase">Inspect Integrity Logs</span>
                                <TrendingUp className="w-3 h-3 text-leaf" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, trend, subtext }: { title: string; value: string; icon: React.ElementType; color?: string; trend: string; subtext?: string }) {
    return (
        <div className="premium-card group hover:scale-[1.02] transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center transition-colors group-hover:bg-forest group-hover:text-ivory text-forest`}>
                    <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-leaf bg-leaf/10 px-2 py-1 rounded tracking-tighter">
                    {trend}
                </span>
            </div>
            <div>
                <p className="text-xs font-bold text-forest/30 uppercase tracking-widest mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <p className={`text-3xl font-black text-forest tabular-nums tracking-tighter`}>{value}</p>
                    {subtext && <span className="text-[10px] font-black text-forest/40 uppercase tracking-tighter">{subtext}</span>}
                </div>
            </div>
        </div>
    );
}
