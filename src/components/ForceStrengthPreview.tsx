"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, Users, Target, Rocket, ChevronRight } from "lucide-react";
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
        <section className="px-6 py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-apc-cyan/20 to-transparent" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-apc-cyan/20 mb-8">
                        <Target className="w-4 h-4 text-apc-red animate-pulse" />
                        <span className="text-[10px] font-black text-apc-cyan tracking-[0.3em] uppercase">Tactical Intelligence</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-8 leading-[0.9]">
                        Real-Time <span className="text-apc-cyan">Force</span> <br />
                        Saturation
                    </h2>

                    <p className="text-xl text-foreground/60 font-medium leading-relaxed mb-12 max-w-xl">
                        Select a region to view the current scale of the Renewed Hope Vanguard.
                        Our molecular-level mobilization ensures coverage in every ward.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                        {regionalData.map((zone) => (
                            <button
                                key={zone.zone}
                                onClick={() => setSelectedZone(zone.zone)}
                                className={`px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 border ${selectedZone === zone.zone
                                        ? 'apc-cyan-gradient text-white shadow-lg border-white/20'
                                        : 'bg-white/50 border-forest/10 text-forest/40 hover:border-apc-cyan/30'
                                    }`}
                            >
                                {zone.zone}
                            </button>
                        ))}
                    </div>

                    <Link
                        href="/auth"
                        className="btn-apc inline-flex items-center gap-4 text-lg px-10 py-5"
                    >
                        Enlist in {selectedZone || 'Your Zone'}
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="flex-1 w-full">
                    <motion.div
                        key={selectedZone}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ultra-glass p-12 rounded-[4rem] relative overflow-hidden group border border-white/40 shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-10">
                            <MapPin className="w-12 h-12 text-apc-cyan/20 group-hover:text-apc-cyan/40 transition-colors duration-500" />
                        </div>

                        <div className="relative z-10">
                            <div className="text-[11px] font-black text-apc-cyan uppercase tracking-[0.4em] mb-4">Current Strength</div>
                            <div className="text-7xl md:text-8xl font-display font-black tracking-tighter mb-10 text-forest">
                                {loading ? '---' : activeZone?.total_supporters.toLocaleString() || '0'}
                            </div>

                            <div className="grid grid-cols-2 gap-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Users className="w-5 h-5 text-apc-green" />
                                        <div className="text-[10px] font-black text-forest/40 uppercase tracking-widest">Active Chapters</div>
                                    </div>
                                    <div className="text-3xl font-display font-black">{activeZone?.chapter_count || 0}</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Rocket className="w-5 h-5 text-apc-gold" />
                                        <div className="text-[10px] font-black text-forest/40 uppercase tracking-widest">Momentum</div>
                                    </div>
                                    <div className="text-3xl font-display font-black">{Math.round(activeZone?.avg_momentum || 0)}%</div>
                                </div>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-apc-cyan/5 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
