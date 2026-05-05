"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";

const features = [
    {
        num: "01",
        icon: Zap,
        title: "High-Resolution Impact",
        desc: "Build tools that reach millions across Nigeria instantly.",
    },
    {
        num: "02",
        icon: ShieldCheck,
        title: "Elite Verification",
        desc: "Earn official national digital credentials.",
    },
    {
        num: "03",
        icon: Globe,
        title: "360° Coordination",
        desc: "Sync with commanders across every ward.",
    },
];

export default function CTASection() {
    return (
        <section className="px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-[2rem] overflow-hidden"
                    style={{ boxShadow: "0 40px 80px -20px rgba(0,173,239,0.3), 0 16px 40px -8px rgba(0,0,0,0.1)" }}
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ADEF] via-[#008D43] to-[#005f2d]" />

                    {/* Subtle dot grid */}
                    <div
                        className="absolute inset-0 opacity-[0.05]"
                        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                        aria-hidden="true"
                    />

                    {/* Ambient glow */}
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-apc-gold/15 rounded-full blur-[60px] pointer-events-none" aria-hidden="true" />

                    <div className="relative z-10 px-8 py-20 md:px-16 md:py-24 lg:px-20 flex flex-col lg:flex-row items-start gap-16 lg:gap-20">

                        {/* ── Left: heading + CTAs ── */}
                        <div className="flex-1">
                            {/* Eyebrow */}
                            <motion.div
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-apc-gold" aria-hidden="true" />
                                <span className="text-xs font-semibold text-white tracking-[0.2em] uppercase">
                                    Become a Commander
                                </span>
                            </motion.div>

                            {/* Headline */}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white leading-none tracking-tighter mb-6">
                                Join the{" "}
                                <span className="underline decoration-apc-gold decoration-[5px] underline-offset-6">
                                    Vanguard
                                </span>
                            </h2>

                            {/* Body */}
                            <p className="max-w-md text-base md:text-lg text-white/70 font-normal leading-[1.75] mb-10">
                                Nigeria is at a digital crossroads. We are recruiting the brightest minds to build,
                                deploy, and defend the technological future of our great nation.
                            </p>

                            {/* CTA buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <Link
                                    href="/auth"
                                    className="inline-flex items-center justify-center gap-3 bg-white text-apc-cyan px-8 py-4 rounded-xl font-bold text-base
                                               shadow-lg hover:shadow-xl hover:bg-white/95 active:scale-[0.97] transition-all duration-200 cursor-pointer"
                                >
                                    Join Now
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                </Link>
                                <Link
                                    href="/chapter"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white
                                               border border-white/25 hover:bg-white/10 hover:border-white/40 active:scale-[0.97] transition-all duration-200 cursor-pointer"
                                >
                                    Find a Chapter
                                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>

                        {/* ── Right: feature cards ── */}
                        <div className="flex-1 w-full max-w-lg space-y-4">
                            {features.map((item, idx) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: 32 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.12 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                                    className="flex items-start gap-5 p-6 rounded-2xl bg-white/[0.08] border border-white/[0.1]
                                               hover:bg-white/[0.12] hover:border-white/[0.18] transition-colors duration-200"
                                >
                                    {/* Number prefix */}
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-white/80" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-white/35 tabular-nums">{item.num}</span>
                                            <div className="h-px w-4 bg-white/20" aria-hidden="true" />
                                            <span className="text-base font-bold text-white">{item.title}</span>
                                        </div>
                                        <p className="text-sm text-white/55 font-normal leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
