"use client";

import { motion } from "framer-motion";
import { Users, Globe, Rocket, Star } from "lucide-react";

export default function StatsSection() {
    return (
        <section className="px-6 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {[
                    { label: "Elite Vanguard", value: "250K+", icon: Users, color: "apc-cyan", trend: "+12%" },
                    { label: "State Commands", value: "37", icon: Globe, color: "apc-green", trend: "Full Coverage" },
                    { label: "Digital Assets", value: "1.2K+", icon: Rocket, color: "apc-red", trend: "+85%" },
                    { label: "Field Missions", value: "500K+", icon: Star, color: "apc-gold", trend: "Active" },
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.8 }}
                        className="premium-card group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-[10px] font-black text-apc-cyan uppercase tracking-widest bg-apc-cyan/10 px-2 py-1 rounded-full">{stat.trend}</span>
                        </div>

                        <div className={`w-16 h-16 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br from-apc-cyan/5 to-transparent border border-apc-cyan/10 group-hover:border-apc-cyan/30 shadow-inner`}>
                            <stat.icon className="w-8 h-8 text-apc-cyan transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="text-5xl font-display font-black tracking-tighter mb-3 group-hover:text-apc-cyan transition-colors duration-500">{stat.value}</div>
                        <div className="text-[11px] font-black text-foreground/50 uppercase tracking-[0.3em]">{stat.label}</div>

                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-apc-cyan/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
