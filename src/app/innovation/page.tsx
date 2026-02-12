"use client";

import { motion } from "framer-motion";
import {
    Trophy,
    Rocket,
    Users,
    Code,
    ChevronRight,
    Timer,
    Lightbulb,
    Award
} from "lucide-react";

const challenges = [
    {
        title: "Agri-Tech Modernization",
        prize: "₦5,000,000",
        teams: 124,
        daysLeft: 12,
        category: "Agriculture",
        description: "Build scalable IoT or software solutions to improve agricultural yield in North-Central Nigeria.",
        status: "Active"
    },
    {
        title: "SME Digitization Engine",
        prize: "₦3,500,000",
        teams: 89,
        daysLeft: 5,
        category: "Fintech",
        description: "Create a simple inventory and payment system for local market traders in the South-West.",
        status: "Active"
    },
    {
        title: "Renewed Hope Identity",
        prize: "₦2,000,000",
        teams: 56,
        daysLeft: 14,
        category: "Gov-Tech",
        description: "Improve citizen digital identity verification for social investment programs.",
        status: "Active"
    }
];

export default function InnovationArena() {
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12">
            {/* Hero Section of Arena */}
            <section className="premium-card bg-forest text-ivory relative overflow-hidden py-16 px-12 border-none">
                <div className="relative z-10 max-w-2xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf/10 border border-leaf/20">
                        <Trophy className="text-leaf w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-leaf">Innovation League 2026</span>
                    </div>
                    <h1 className="text-6xl font-display font-black leading-tight">
                        The <span className="text-leaf italic">Arena</span> of Ideas
                    </h1>
                    <p className="text-ivory/60 text-lg font-medium">
                        Where Nigeria&apos;s brightest young minds build solutions that power
                        the Renewed Hope Agenda. Competitive innovation at a national scale.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <button className="leaf-gradient text-ivory px-8 py-4 rounded-xl font-black shadow-2xl hover:scale-105 transition-all">
                            Initialize Team
                        </button>
                        <button className="glass border-white/10 text-ivory px-8 py-4 rounded-xl font-bold hover:bg-white/5 transition-all">
                            View Hall of Fame
                        </button>
                    </div>
                </div>

                {/* Background Visuals */}
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none overflow-hidden">
                    <Code className="text-ivory w-[500px] h-[500px] -rotate-12 absolute -right-20 -bottom-20" />
                </div>
            </section>

            {/* Arena Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { icon: Users, label: "Active Innovators", value: "12,450" },
                    { icon: Rocket, label: "Solutions Built", value: "842" },
                    { icon: Award, label: "Total Prizes Won", value: "₦45M" },
                    { icon: Lightbulb, label: "Policy Briefs", value: "156" },
                ].map((stat, i) => (
                    <div key={i} className="premium-card flex flex-col items-center text-center gap-3">
                        <div className="w-10 h-10 bg-forest/5 rounded-xl flex items-center justify-center">
                            <stat.icon className="text-leaf w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-forest">{stat.value}</div>
                            <div className="text-[10px] font-bold text-forest/30 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* active challenges */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-display font-black text-forest">Open Challenges</h2>
                    <button className="text-sm font-black text-leaf uppercase tracking-[0.2em] flex items-center gap-2 group">
                        View All Challenges
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {challenges.map((challenge, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card flex flex-col justify-between group h-full border-forest/5 hover:border-leaf/50"
                        >
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-black text-forest/30 uppercase tracking-[0.2em] bg-forest/5 px-2 py-1 rounded">
                                        {challenge.category}
                                    </span>
                                    <div className="flex items-center gap-2 text-accent-red">
                                        <Timer className="w-4 h-4" />
                                        <span className="text-xs font-black uppercase">{challenge.daysLeft}d Left</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-black text-forest group-hover:text-leaf transition-colors">{challenge.title}</h3>
                                    <p className="text-sm text-forest/60 font-medium leading-relaxed">{challenge.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-forest/5 p-3 rounded-xl text-center">
                                        <div className="text-[10px] font-bold text-forest/30 uppercase">Prize Pool</div>
                                        <div className="text-lg font-black text-forest">{challenge.prize}</div>
                                    </div>
                                    <div className="bg-forest/5 p-3 rounded-xl text-center">
                                        <div className="text-[10px] font-bold text-forest/30 uppercase">Teams</div>
                                        <div className="text-lg font-black text-forest">{challenge.teams}</div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-8 py-4 rounded-xl bg-forest text-ivory font-black text-sm shadow-lg group-hover:bg-forest/90 transition-all flex items-center justify-center gap-2">
                                SUBMIT SOLUTION
                                <ChevronRight className="w-4 h-4 text-leaf" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
