"use client";

import { motion } from "framer-motion";
import {
    Rocket,
    Target,
    Users,
    MessageSquare,
    ChevronRight,
    CheckCircle2,
    Clock
} from "lucide-react";

const missions = [
    {
        id: 1,
        title: "Digital Advocacy Blitz",
        description: "Share the latest Renewed Hope achievement graphics on your WhatsApp status and Twitter.",
        category: "Digital Advocacy",
        points: 250,
        status: "active",
        icon: MessageSquare,
        difficulty: "Easy"
    },
    {
        id: 2,
        title: "Innovator Recruitment",
        description: "Onboard 5 new tech-native innovators into the RHIC platform using your unique referral link.",
        category: "Recruitment",
        points: 1000,
        status: "active",
        icon: Users,
        difficulty: "Medium"
    },
    {
        id: 3,
        title: "Campus Tech Meetup",
        description: "Host a mini-session at your university to discuss digital economy opportunities under the Renewed Hope Agenda.",
        category: "Event",
        points: 2500,
        status: "available",
        icon: Rocket,
        difficulty: "High"
    },
    {
        id: 4,
        title: "Policy Feedback Brief",
        description: "Submit a 2-page brief on how to improve SME digitization in your local government area.",
        category: "Content",
        points: 1500,
        status: "in-progress",
        icon: Target,
        difficulty: "Medium"
    }
];

export default function MissionsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-display font-black text-navy">
                    Digital <span className="text-gold italic">Missions</span>
                </h1>
                <p className="max-w-2xl mx-auto text-navy/60 font-medium">
                    Complete weekly tasks to earn points, badges, and rank upgrades while powering the movement.
                </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="premium-card flex items-center gap-4">
                    <div className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="text-gold w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-navy">12</div>
                        <div className="text-xs font-bold text-navy/40 uppercase tracking-widest">Missions Completed</div>
                    </div>
                </div>
                <div className="premium-card flex items-center gap-4 border-gold/30">
                    <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center">
                        <Target className="text-gold w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-navy">4,500</div>
                        <div className="text-xs font-bold text-navy/40 uppercase tracking-widest">Total Points</div>
                    </div>
                </div>
                <div className="premium-card flex items-center gap-4">
                    <div className="w-12 h-12 bg-navy/5 rounded-2xl flex items-center justify-center">
                        <Clock className="text-navy w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-navy">Silver</div>
                        <div className="text-xs font-bold text-navy/40 uppercase tracking-widest">Current Rank</div>
                    </div>
                </div>
            </div>

            {/* Missions Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-display font-bold text-navy">Available Missions</h2>
                    <div className="flex gap-2">
                        {['All', 'Advocacy', 'Recruitment', 'Events'].map(tab => (
                            <button key={tab} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${tab === 'All' ? 'bg-navy text-ivory' : 'bg-navy/5 text-navy hover:bg-navy/10'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {missions.map((mission, idx) => (
                        <motion.div
                            key={mission.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="premium-card flex flex-col justify-between group cursor-pointer"
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-xl bg-opacity-10 ${mission.status === 'active' ? 'bg-green-500' : 'bg-navy/5'}`}>
                                        <mission.icon className={`w-6 h-6 ${mission.status === 'active' ? 'text-green-600' : 'text-navy/40'}`} />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-xl font-black text-navy">{mission.points}</div>
                                        <div className="text-[10px] font-bold text-navy/30 uppercase tracking-widest">Points</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-black text-navy group-hover:text-gold transition-colors">{mission.title}</h3>
                                    <p className="text-sm text-navy/60 font-medium leading-relaxed line-clamp-2">{mission.description}</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-navy/5 flex items-center justify-between">
                                <div className="flex gap-3">
                                    <span className="px-2 py-1 rounded bg-navy/5 text-[10px] font-black text-navy/40 uppercase tracking-widest">
                                        {mission.category}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${mission.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                        mission.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {mission.difficulty}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
                                    <span className="text-xs font-black text-navy uppercase tracking-widest">View Details</span>
                                    <ChevronRight className="w-4 h-4 text-gold" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
