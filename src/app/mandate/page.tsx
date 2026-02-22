"use client";

import { motion } from "framer-motion";
import { useMandates } from "@/hooks/useMandates";
import MandateCard from "@/components/MandateCard";
import { ShieldCheck, Target, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MandatePage() {
    const { mandates } = useMandates();
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Innovation', 'Tech & ICT', 'Creative', 'Youth'];
    const filteredMandates = filter === 'All' ? mandates : mandates.filter(m => m.category === filter);

    return (
        <div className="flex flex-col gap-24">
            {/* National Command Header */}
            <section className="relative px-6 pt-12 overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-apc-cyan/5 blur-[120px] -z-10" />

                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass mb-10 border border-apc-cyan/30"
                    >
                        <ShieldCheck className="w-4 h-4 text-apc-green" />
                        <span className="text-[10px] font-black text-apc-cyan tracking-[0.3em] uppercase">
                            Official National Registry
                        </span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8 leading-[0.85]">
                        The National <br />
                        <span className="text-transparent bg-clip-text vibrant-apc-gradient italic pr-4">Innovation</span> Mandate
                    </h1>

                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-forest/60 font-medium leading-relaxed mb-16">
                        Tracking the digital revolution and youth-driven prosperity under the
                        Renewed Hope mandate. A world-class ledger of our technological future.
                    </p>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 border ${filter === cat
                                        ? 'apc-cyan-gradient text-white shadow-lg border-white/20'
                                        : 'bg-white/50 border-forest/10 text-forest/40 hover:border-apc-cyan/30'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mandate Grid */}
            <section className="px-6 pb-32">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMandates.map((mandate, idx) => (
                        <MandateCard key={mandate.id} mandate={mandate} index={idx} />
                    ))}
                </div>
            </section>

            {/* Bottom Strategic CTA */}
            <section className="px-6 pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-[4rem] overflow-hidden p-12 md:p-24 bg-forest text-white group shadow-[0_50px_100px_-30px_rgba(30,58,47,0.4)]">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <Target className="w-64 h-64" />
                        </div>

                        <div className="relative z-10 max-w-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <Zap className="w-6 h-6 text-apc-gold" />
                                <span className="text-xs font-black text-white/40 tracking-[0.4em] uppercase">Join the Vision</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-display font-black mb-8 leading-tight">
                                Ready to build the <br />
                                <span className="text-apc-cyan italic">Digital Future</span> of Nigeria?
                            </h2>
                            <p className="text-xl text-white/60 mb-12 font-medium">
                                We are recruiting innovators across every ward to scale these
                                mandates to every citizen. Your expertise is our national advantage.
                            </p>
                            <Link href="/auth" className="btn-apc inline-flex items-center gap-4 text-lg px-12 py-5 shadow-2xl">
                                Enlist with the Vanguard
                                <ChevronRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
