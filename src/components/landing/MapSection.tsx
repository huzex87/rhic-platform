"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import NigeriaMap from "@/components/NigeriaMap";

export default function MapSection() {
    return (
        <section className="px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-apc-green/[0.08] border border-apc-green/15 mb-6">
                        <MapPin className="w-3.5 h-3.5 text-apc-green" aria-hidden="true" />
                        <span className="text-xs font-semibold text-apc-green tracking-[0.2em] uppercase">National Coverage</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter leading-none mb-4">
                        Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-apc-green to-apc-cyan">
                            National
                        </span>{" "}
                        Impact
                    </h2>
                    <p className="max-w-lg mx-auto text-base md:text-lg text-foreground/50 font-normal leading-[1.75]">
                        See how we are growing across Nigeria — from cities to villages,
                        working together for a renewed hope.
                    </p>
                </motion.div>

                {/* Map container */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                    className="surface-card overflow-hidden p-0"
                    style={{ borderRadius: "1.5rem" }}
                >
                    <NigeriaMap variant="landing" />
                </motion.div>
            </div>
        </section>
    );
}
