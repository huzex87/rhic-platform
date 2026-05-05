"use client";

import { motion } from "framer-motion";
import { Users, Globe, Rocket, Star } from "lucide-react";

export default function StatsSection() {
    return (
        <section className="px-6 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {[
                    {
                        label: "Elite Vanguard", value: "250K+", icon: Users, trend: "+12%",
                        iconCls: "text-apc-cyan", iconBg: "from-apc-cyan/5", iconBorder: "border-apc-cyan/10 group-hover:border-apc-cyan/30",
                        trendCls: "text-apc-cyan bg-apc-cyan/10", valueCls: "group-hover:text-apc-cyan", bar: "via-apc-cyan/20",
                    },
                    {
                        label: "State Commands", value: "37", icon: Globe, trend: "Full Coverage",
                        iconCls: "text-apc-green", iconBg: "from-apc-green/5", iconBorder: "border-apc-green/10 group-hover:border-apc-green/30",
                        trendCls: "text-apc-green bg-apc-green/10", valueCls: "group-hover:text-apc-green", bar: "via-apc-green/20",
                    },
                    {
                        label: "Digital Assets", value: "1.2K+", icon: Rocket, trend: "+85%",
                        iconCls: "text-apc-red", iconBg: "from-apc-red/5", iconBorder: "border-apc-red/10 group-hover:border-apc-red/30",
                        trendCls: "text-apc-red bg-apc-red/10", valueCls: "group-hover:text-apc-red", bar: "via-apc-red/20",
                    },
                    {
                        label: "Field Missions", value: "500K+", icon: Star, trend: "Active",
                        iconCls: "text-apc-gold", iconBg: "from-apc-gold/5", iconBorder: "border-apc-gold/10 group-hover:border-apc-gold/30",
                        trendCls: "text-apc-gold bg-apc-gold/10", valueCls: "group-hover:text-apc-gold", bar: "via-apc-gold/20",
                    },
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        className="premium-card group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className={`text-xs font-black uppercase tracking-widest px-2 py-1 rounded-full ${stat.trendCls}`}>{stat.trend}</span>
                        </div>

                        <div className={`w-16 h-16 rounded-3xl mb-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br ${stat.iconBg} to-transparent border ${stat.iconBorder} shadow-inner`}>
                            <stat.icon className={`w-8 h-8 ${stat.iconCls}`} aria-hidden="true" />
                        </div>
                        <div className={`text-5xl font-display font-black tracking-tighter mb-3 transition-colors duration-300 ${stat.valueCls}`}>{stat.value}</div>
                        <div className="text-xs font-black text-foreground/50 uppercase tracking-[0.25em]">{stat.label}</div>

                        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${stat.bar} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} aria-hidden="true" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
