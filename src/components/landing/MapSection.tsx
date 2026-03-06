"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import NigeriaMap from "@/components/NigeriaMap";

export default function MapSection() {
    return (
        <section className="px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-apc-cyan/20 mb-8">
                        <MapPin className="w-4 h-4 text-apc-red animate-pulse" />
                        <span className="text-[10px] font-black text-apc-cyan tracking-[0.3em] uppercase">Molecular Saturation</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter mb-6">
                        Our <span className="text-apc-green">National</span> Impact
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-foreground/60 leading-relaxed font-medium">
                        See how we are growing across Nigeria. From cities to villages,
                        we are working together for a renewed hope.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative p-1 rounded-[3rem] bg-gradient-to-tr from-apc-cyan/20 via-apc-gold/10 to-apc-red/20 shadow-2xl"
                >
                    <div className="bg-white rounded-[2.9rem] overflow-hidden">
                        <NigeriaMap variant="landing" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
