"use client";

import { motion } from "framer-motion";
import {
    Rocket,
    Target,
    CheckCircle2,
    Clock,
    Loader2,
    Play,
    Check
} from "lucide-react";
import { useMissions, type Mission } from "@/hooks/useMissions";
import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import * as LucideIcons from "lucide-react";

export default function MissionsPage() {
    const { user } = useAuth();
    const { missions, userMissions, loading, joinMission, completeMission } = useMissions();
    const [filter, setFilter] = useState('All');
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const filteredMissions = missions.filter(m => {
        if (filter === 'All') return true;
        return m.category.includes(filter);
    });

    const handleAction = async (mission: Mission) => {
        if (!user) return;
        const status = userMissions[mission.id]?.status;

        setActionLoading(mission.id);
        if (!status) {
            await joinMission(mission.id);
        } else if (status === 'joined') {
            await completeMission(mission.id);
        }
        setActionLoading(null);
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-leaf" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12">
            {/* Header */}
            <div className="text-center space-y-6 pt-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-display font-black text-forest leading-none tracking-tighter uppercase"
                >
                    Digital <span className="text-transparent bg-clip-text vibrant-apc-gradient italic">Missions</span>
                </motion.h1>
                <div className="max-w-2xl mx-auto p-4 rounded-2xl ultra-glass border border-forest/5 shadow-xl">
                    <p className="text-forest/60 font-medium leading-relaxed">
                        Complete weekly Tasks to earn points, badges, and rank upgrades while powering the movement through high-impact digital advocacy.
                    </p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: CheckCircle2, label: "Missions Completed", value: Object.values(userMissions).filter(m => m.status === 'completed').length, color: "text-leaf", bg: "bg-leaf/10" },
                    { icon: Target, label: "Total Points", value: user?.user_metadata?.points || 0, color: "text-gold", bg: "bg-gold/10", border: "border-gold/30" },
                    { icon: Clock, label: "Current Rank", value: user?.user_metadata?.rank || 'Silver', color: "text-forest", bg: "bg-forest/5" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`ultra-glass p-8 rounded-[2rem] flex items-center gap-6 border border-forest/5 shadow-lg relative overflow-hidden group ${stat.border || ""}`}
                    >
                        <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-500`}>
                            <stat.icon className={`${stat.color} w-8 h-8`} />
                        </div>
                        <div>
                            <div className="text-3xl font-display font-black text-forest leading-none">{stat.value}</div>
                            <div className="text-[10px] font-black text-forest/40 uppercase tracking-[0.2em] mt-1">{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Missions Grid */}
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-leaf rounded-full shadow-[0_0_15px_rgba(0,141,67,0.5)]" />
                        <h2 className="text-3xl font-display font-black text-forest tracking-tighter uppercase italic leading-none">Available Operations</h2>
                    </div>
                    <div className="flex gap-2 p-1.5 rounded-2xl ultra-glass border border-forest/10 shadow-sm overflow-x-auto max-w-full">
                        {['All', 'Advocacy', 'Recruitment', 'Event'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all duration-300 ${filter === tab
                                        ? 'bg-forest text-ivory shadow-lg scale-105'
                                        : 'text-forest/40 hover:text-forest hover:bg-forest/5'
                                    }`}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredMissions.map((mission, idx) => {
                        const userStatus = userMissions[mission.id]?.status;
                        const IconComponent = (LucideIcons as unknown as Record<string, typeof Rocket>)[mission.icon] || Rocket;

                        return (
                            <motion.div
                                key={mission.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`group relative ultra-glass rounded-[2.5rem] p-8 border border-forest/10 transition-all duration-500 hover:shadow-2xl hover:border-forest/20 ${userStatus === 'completed' ? 'opacity-70 bg-forest/[0.02]' : 'hover:-translate-y-1'
                                    }`}
                            >
                                <div className="flex flex-col h-full gap-8">
                                    <div className="flex justify-between items-start">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${userStatus === 'completed' ? 'bg-leaf/10' : 'bg-forest/5 group-hover:bg-forest/10'
                                            }`}>
                                            <IconComponent className={`w-7 h-7 ${userStatus === 'completed' ? 'text-leaf' : 'text-forest/40'}`} />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="text-3xl font-display font-black text-forest leading-none glow-text">{mission.points}</div>
                                            <div className="text-[10px] font-black text-forest/30 uppercase tracking-widest mt-1">Reward Points</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-display font-black text-forest group-hover:text-leaf transition-colors flex items-center gap-3 leading-tight tracking-tight">
                                            {mission.title}
                                            {userStatus === 'completed' && (
                                                <div className="w-6 h-6 rounded-full bg-leaf flex items-center justify-center">
                                                    <Check className="w-3.5 h-3.5 text-ivory shadow-leaf" />
                                                </div>
                                            )}
                                        </h3>
                                        <p className="text-forest/60 font-medium leading-relaxed line-clamp-2 text-sm">{mission.description}</p>
                                    </div>

                                    <div className="mt-auto pt-8 border-t border-forest/5 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 rounded-lg ultra-glass text-[10px] font-black text-forest/40 uppercase tracking-widest border border-forest/5">
                                                {mission.category}
                                            </span>
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-forest/5 ${mission.difficulty === 'Easy' ? 'bg-leaf/5 text-leaf border-leaf/10' :
                                                    mission.difficulty === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                        'bg-accent-red/5 text-accent-red border-accent-red/10'
                                                }`}>
                                                {mission.difficulty}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => handleAction(mission)}
                                            disabled={!!actionLoading || userStatus === 'completed'}
                                            className={`relative h-12 px-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden group/btn ${userStatus === 'completed'
                                                    ? 'bg-forest/5 text-forest/40 cursor-default'
                                                    : userStatus === 'joined'
                                                        ? 'bg-leaf text-ivory shadow-[0_10px_20px_-5px_rgba(0,141,67,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(0,141,67,0.5)] hover:scale-105'
                                                        : 'bg-forest text-ivory shadow-xl hover:shadow-[0_15px_30px_-5px_rgba(0,29,51,0.4)] hover:scale-105'
                                                }`}
                                        >
                                            <div className="relative z-10 flex items-center gap-2">
                                                {actionLoading === mission.id ? (
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                ) : userStatus === 'completed' ? (
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                ) : userStatus === 'joined' ? (
                                                    <Rocket className="w-3.5 h-3.5" />
                                                ) : (
                                                    <Play className="w-3.5 h-3.5" />
                                                )}
                                                <span>{userStatus === 'completed' ? 'SUCCESS' : userStatus === 'joined' ? 'EXECUTE' : 'ENLIST'}</span>
                                            </div>
                                            {/* Button Gradient Overlay */}
                                            {!userStatus && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
