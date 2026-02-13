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
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-display font-black text-forest">
                    Digital <span className="text-leaf italic">Missions</span>
                </h1>
                <p className="max-w-2xl mx-auto text-forest/60 font-medium">
                    Complete weekly tasks to earn points, badges, and rank upgrades while powering the movement.
                </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="premium-card flex items-center gap-4">
                    <div className="w-12 h-12 bg-forest rounded-2xl flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="text-leaf w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-forest">
                            {Object.values(userMissions).filter(m => m.status === 'completed').length}
                        </div>
                        <div className="text-xs font-bold text-forest/40 uppercase tracking-widest">Missions Completed</div>
                    </div>
                </div>
                <div className="premium-card flex items-center gap-4 border-leaf/30">
                    <div className="w-12 h-12 bg-leaf/10 rounded-2xl flex items-center justify-center">
                        <Target className="text-leaf w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-forest">
                            {user?.user_metadata?.points || 0}
                        </div>
                        <div className="text-xs font-bold text-forest/40 uppercase tracking-widest">Total Points</div>
                    </div>
                </div>
                <div className="premium-card flex items-center gap-4">
                    <div className="w-12 h-12 bg-forest/5 rounded-2xl flex items-center justify-center">
                        <Clock className="text-forest w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-forest">
                            {user?.user_metadata?.rank || 'Silver'}
                        </div>
                        <div className="text-xs font-bold text-forest/40 uppercase tracking-widest">Current Rank</div>
                    </div>
                </div>
            </div>

            {/* Missions Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-display font-bold text-forest">Available Missions</h2>
                    <div className="flex gap-2">
                        {['All', 'Advocacy', 'Recruitment', 'Event'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === tab ? 'bg-forest text-ivory' : 'bg-forest/5 text-forest hover:bg-forest/10'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredMissions.map((mission, idx) => {
                        const userStatus = userMissions[mission.id]?.status;
                        const IconComponent = (LucideIcons as unknown as Record<string, typeof Rocket>)[mission.icon] || Rocket;

                        return (
                            <motion.div
                                key={mission.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`premium-card flex flex-col justify-between group cursor-pointer transition-all ${userStatus === 'completed' ? 'opacity-70 border-leaf/20' : ''}`}
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className={`p-3 rounded-xl bg-opacity-10 ${userStatus ? 'bg-leaf' : 'bg-forest/5'}`}>
                                            <IconComponent className={`w-6 h-6 ${userStatus ? 'text-leaf' : 'text-forest/40'}`} />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="text-xl font-black text-forest">{mission.points}</div>
                                            <div className="text-[10px] font-bold text-forest/30 uppercase tracking-widest">Points</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-lg font-black text-forest group-hover:text-leaf transition-colors flex items-center gap-2">
                                            {mission.title}
                                            {userStatus === 'completed' && <CheckCircle2 className="w-4 h-4 text-leaf" />}
                                        </h3>
                                        <p className="text-sm text-forest/60 font-medium leading-relaxed line-clamp-2">{mission.description}</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-forest/5 flex items-center justify-between">
                                    <div className="flex gap-3">
                                        <span className="px-2 py-1 rounded bg-forest/5 text-[10px] font-black text-forest/40 uppercase tracking-widest">
                                            {mission.category}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${mission.difficulty === 'Easy' ? 'bg-leaf/10 text-leaf' :
                                            mission.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-accent-red/10 text-accent-red'
                                            }`}>
                                            {mission.difficulty}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleAction(mission)}
                                        disabled={!!actionLoading || userStatus === 'completed'}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${userStatus === 'completed'
                                            ? 'bg-leaf/10 text-leaf cursor-default'
                                            : userStatus === 'joined'
                                                ? 'bg-leaf text-ivory hover:scale-105'
                                                : 'bg-forest/5 text-forest hover:bg-forest/10 hover:scale-105'
                                            }`}
                                    >
                                        {actionLoading === mission.id ? (
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : userStatus === 'completed' ? (
                                            <Check className="w-3 h-3" />
                                        ) : userStatus === 'joined' ? (
                                            <CheckCircle2 className="w-3 h-3" />
                                        ) : (
                                            <Play className="w-3 h-3" />
                                        )}
                                        {userStatus === 'completed' ? 'DONE' : userStatus === 'joined' ? 'COMPLETE' : 'JOIN'}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
