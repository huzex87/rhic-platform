"use client";

import { motion } from "framer-motion";
import { useActivities } from "@/hooks/useActivities";
import { Zap, Shield, Users, Trophy, LucideIcon } from "lucide-react";

const TYPE_ICONS: Record<string, LucideIcon> = {
    signup: Users,
    mission_complete: Trophy,
    report_verified: Shield,
    innovation_submitted: Zap
};

export default function LiveCommandTicker() {
    const { activities } = useActivities(10);

    if (activities.length === 0) return null;

    return (
        <div className="w-full bg-forest text-ivory/80 py-3 border-y border-white/10 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-forest via-transparent to-forest z-10 pointer-events-none" />

            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex items-center gap-12 whitespace-nowrap px-4"
            >
                {/* Duplicate items for seamless loop */}
                {[...activities, ...activities].map((activity, idx) => {
                    const Icon = TYPE_ICONS[activity.type] || Zap;
                    return (
                        <div key={`${activity.id}-${idx}`} className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-apc-cyan animate-pulse" />
                            <Icon className="w-4 h-4 text-apc-gold" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="text-white">{activity.profiles?.full_name || "Innovator"}</span>
                                <span className="mx-2 opacity-40">|</span>
                                <span className="text-apc-cyan">{activity.profiles?.state || "National"}</span>
                                <span className="mx-2 opacity-40">»</span>
                                {activity.title}
                            </span>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}
