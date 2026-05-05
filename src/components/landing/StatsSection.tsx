"use client";

import { motion } from "framer-motion";
import { Users, Globe, Rocket, Star } from "lucide-react";

const stats = [
    {
        label: "Elite Vanguard",
        value: "250K+",
        icon: Users,
        trend: "+12% this month",
        featured: true,
        accentBg: "bg-apc-cyan",
        iconCls: "text-apc-cyan",
        iconBg: "bg-apc-cyan/10",
        trendCls: "text-apc-cyan bg-apc-cyan/8",
    },
    {
        label: "State Commands",
        value: "37",
        icon: Globe,
        trend: "Full Coverage",
        featured: false,
        accentBg: "bg-apc-green",
        iconCls: "text-apc-green",
        iconBg: "bg-apc-green/10",
        trendCls: "text-apc-green bg-apc-green/8",
    },
    {
        label: "Digital Assets",
        value: "1.2K+",
        icon: Rocket,
        trend: "+85%",
        featured: false,
        accentBg: "bg-apc-red",
        iconCls: "text-apc-red",
        iconBg: "bg-apc-red/10",
        trendCls: "text-apc-red bg-apc-red/8",
    },
    {
        label: "Field Missions",
        value: "500K+",
        icon: Star,
        trend: "Active",
        featured: false,
        accentBg: "bg-apc-gold",
        iconCls: "text-apc-gold",
        iconBg: "bg-apc-gold/10",
        trendCls: "text-apc-gold bg-apc-gold/8",
    },
] as const;

export default function StatsSection() {
    return (
        <section className="px-4 md:px-6" aria-label="Platform statistics">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <motion.article
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.07, duration: 0.5, ease: "easeOut" }}
                        className={`surface-card relative overflow-hidden ${stat.featured ? "col-span-2 lg:col-span-2" : "col-span-1"}`}
                    >
                        {/* Top accent line */}
                        <div className={`absolute top-0 left-0 right-0 h-[3px] ${stat.accentBg}`} aria-hidden="true" />

                        <div className={`p-5 md:p-7 flex flex-col h-full ${stat.featured ? "md:p-8" : ""}`}>
                            {/* Icon + trend row */}
                            <div className="flex items-center justify-between mb-5 md:mb-7">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                                    <stat.icon className={`w-4.5 h-4.5 ${stat.iconCls}`} aria-hidden="true" />
                                </div>
                                <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full ${stat.trendCls}`}>
                                    {stat.trend}
                                </span>
                            </div>

                            {/* Value */}
                            <div
                                className={`font-display font-black tracking-tighter tabular-nums text-foreground leading-none ${
                                    stat.featured
                                        ? "text-5xl md:text-6xl lg:text-7xl mb-2"
                                        : "text-3xl md:text-4xl lg:text-5xl mb-2"
                                }`}
                            >
                                {stat.value}
                            </div>

                            {/* Label */}
                            <div className="text-[11px] font-semibold text-foreground/40 uppercase tracking-[0.22em] mt-auto">
                                {stat.label}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
