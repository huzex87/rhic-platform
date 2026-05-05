"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, Users, TrendingUp, ChevronRight } from "lucide-react";
import { useNationalStrategy } from "@/hooks/useNationalStrategy";
import Link from "next/link";

export default function ForceStrengthPreview() {
    const { regionalData, loading } = useNationalStrategy();
    const [selectedZone, setSelectedZone] = useState<string>("");

    useEffect(() => {
        if (regionalData.length > 0 && !selectedZone) {
            setSelectedZone(regionalData[0].zone);
        }
    }, [regionalData, selectedZone]);

    const activeZone = regionalData.find(z => z.zone === selectedZone);

    return (
        <section className="px-4 md:px-6 py-20 md:py-28 relative overflow-hidden">
            {/* Subtle separator */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-apc-cyan/15 to-transparent" aria-hidden="true" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-14 lg:gap-20">

                {/* ── Left: text + zone selector ── */}
                <div className="flex-1">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-apc-red/[0.07] border border-apc-red/15 mb-7">
                        <MapPin className="w-3.5 h-3.5 text-apc-red" aria-hidden="true" />
                        <span className="text-xs font-semibold text-apc-red tracking-[0.18em] uppercase">Tactical Intelligence</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter leading-none mb-5">
                        Real-Time{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-apc-cyan to-apc-green">
                            Force
                        </span>{" "}
                        Saturation
                    </h2>

                    <p className="text-base md:text-lg text-foreground/50 font-normal leading-[1.75] mb-10 max-w-md">
                        Select a region to view the current scale of the Renewed Hope Vanguard across every ward.
                    </p>

                    {/* Zone pill selector */}
                    <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Select geopolitical zone">
                        {loading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="skeleton h-9 w-24 rounded-full" />
                            ))
                            : regionalData.map((zone) => {
                                const active = selectedZone === zone.zone;
                                return (
                                    <button
                                        key={zone.zone}
                                        onClick={() => setSelectedZone(zone.zone)}
                                        aria-pressed={active}
                                        className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                            active
                                                ? "bg-apc-cyan text-white shadow-md shadow-apc-cyan/30"
                                                : "bg-black/[0.04] text-foreground/50 border border-black/[0.08] hover:bg-apc-cyan/8 hover:text-apc-cyan hover:border-apc-cyan/20"
                                        }`}
                                    >
                                        {zone.zone}
                                    </button>
                                );
                            })
                        }
                    </div>

                    {/* Enlist CTA */}
                    <Link
                        href="/auth"
                        className="btn-apc text-base px-8 py-4 rounded-xl group"
                    >
                        Enlist in {selectedZone || "Your Zone"}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </Link>
                </div>

                {/* ── Right: stats card ── */}
                <div className="flex-1 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedZone}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="surface-card p-8 md:p-10 relative overflow-hidden"
                        >
                            {/* Top accent */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-apc-cyan via-apc-green to-apc-cyan" aria-hidden="true" />

                            {/* Zone label */}
                            <div className="text-xs font-semibold text-apc-cyan uppercase tracking-[0.25em] mb-3">
                                {selectedZone || "Select a Zone"}
                            </div>

                            {/* Main number */}
                            <div className="font-display font-black tracking-tighter tabular-nums text-foreground leading-none mb-8">
                                {loading ? (
                                    <div className="skeleton h-16 w-48 rounded-xl" />
                                ) : (
                                    <span className="text-6xl md:text-7xl">
                                        {activeZone?.total_supporters.toLocaleString() ?? "0"}
                                    </span>
                                )}
                                <span className="block text-sm font-semibold text-foreground/35 tracking-wide mt-2">
                                    Total Supporters
                                </span>
                            </div>

                            {/* Sub-stats */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="surface-card p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="w-4 h-4 text-apc-green" aria-hidden="true" />
                                        <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-widest">Chapters</span>
                                    </div>
                                    {loading ? (
                                        <div className="skeleton h-8 w-16 rounded-lg" />
                                    ) : (
                                        <div className="text-3xl font-display font-black tabular-nums">
                                            {activeZone?.chapter_count ?? 0}
                                        </div>
                                    )}
                                </div>
                                <div className="surface-card p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 text-apc-gold" aria-hidden="true" />
                                        <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-widest">Momentum</span>
                                    </div>
                                    {loading ? (
                                        <div className="skeleton h-8 w-16 rounded-lg" />
                                    ) : (
                                        <div className="text-3xl font-display font-black tabular-nums">
                                            {Math.round(activeZone?.avg_momentum ?? 0)}
                                            <span className="text-xl font-bold text-foreground/40">%</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Decorative blob */}
                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-apc-cyan/[0.04] rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
