"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative px-4 overflow-hidden pt-12 md:pt-20">
            {/* Ambient background */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-apc-cyan/[0.07] rounded-full blur-[160px] -z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-apc-green/[0.06] rounded-full blur-[140px] -z-10 pointer-events-none" aria-hidden="true" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                {/* ── Text side ── */}
                <div className="flex-1 text-left z-10 max-w-2xl lg:max-w-none">

                    {/* Eyebrow badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-apc-cyan/[0.08] border border-apc-cyan/20 mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-apc-cyan" aria-hidden="true" />
                        <span className="text-xs font-semibold text-apc-cyan tracking-[0.18em] uppercase">
                            National Support Group for Nigeria&apos;s Future
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.08 }}
                        className="text-[2.75rem] md:text-7xl lg:text-[5.5rem] font-display font-black leading-none tracking-tighter mb-6 select-none"
                    >
                        <span className="block text-foreground">Renewed Hope</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-apc-cyan via-apc-green to-apc-cyan">
                            Innovators
                        </span>
                        <span className="block text-foreground">Coalition</span>
                    </motion.h1>

                    {/* Body copy */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.16 }}
                        className="max-w-md text-base md:text-lg text-foreground/55 font-normal leading-[1.75] mb-10"
                    >
                        Join the <span className="text-foreground font-medium">community of innovators</span> building a better Nigeria.
                        See our{" "}
                        <Link href="/mandate" className="text-apc-cyan underline underline-offset-2 decoration-apc-cyan/30 hover:decoration-apc-cyan transition-colors">
                            progress updates
                        </Link>{" "}
                        or sign up to help scale our national vision.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.24 }}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                    >
                        <Link
                            href="/auth"
                            className="btn-apc text-base px-8 py-4 rounded-xl group"
                        >
                            Join Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                        </Link>
                        <Link
                            href="/innovation"
                            className="btn-ghost text-base px-8 py-4 rounded-xl"
                        >
                            Strategy Console
                            <ShieldCheck className="w-4 h-4 text-apc-cyan" aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>

                {/* ── Image side ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 relative group w-full max-w-xl lg:max-w-none"
                >
                    {/* Image frame — no thick white border */}
                    <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.22)] ring-1 ring-black/[0.06]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-apc-cyan/10 via-transparent to-apc-red/10 pointer-events-none z-10" aria-hidden="true" />
                        <Image
                            src="/president-tinubu.png"
                            alt="President Bola Ahmed Tinubu"
                            width={800}
                            height={1000}
                            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
                            priority
                        />

                        {/* Verified badge — solid card style */}
                        <div
                            className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm border border-black/[0.06] rounded-2xl shadow-lg px-4 py-3 z-20 [animation:var(--animate-float)]"
                            aria-label="Verified Digital Vanguard member"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full apc-cyan-gradient flex items-center justify-center shrink-0 shadow-sm">
                                    <ShieldCheck className="w-5 h-5 text-white" aria-hidden="true" />
                                </div>
                                <div>
                                    <div className="text-[11px] font-semibold text-apc-cyan uppercase tracking-widest">Verified</div>
                                    <div className="text-sm font-bold text-foreground leading-none mt-0.5">Digital Vanguard</div>
                                </div>
                            </div>
                        </div>

                        {/* Quote overlay — solid card style */}
                        <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8 bg-white/95 backdrop-blur-sm border border-black/[0.06] rounded-2xl shadow-xl p-5 md:p-7 z-20 transition-transform duration-500 group-hover:-translate-y-2">
                            <p className="text-foreground font-semibold text-sm md:text-base leading-snug mb-4">
                                &ldquo;Our diversity is our strength; our innovation is our future.&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-[2px] w-8 bg-apc-red rounded-full shrink-0" aria-hidden="true" />
                                <div>
                                    <p className="text-[11px] font-bold text-foreground uppercase tracking-[0.25em] leading-none">
                                        President Bola Ahmed Tinubu
                                    </p>
                                    <p className="text-[10px] font-medium text-foreground/45 uppercase tracking-widest mt-1">
                                        Federal Republic of Nigeria
                                    </p>
                                </div>
                                {/* Momentum pill */}
                                <div className="ml-auto flex items-center gap-1.5 bg-apc-green/10 px-2.5 py-1 rounded-full">
                                    <TrendingUp className="w-3 h-3 text-apc-green" aria-hidden="true" />
                                    <span className="text-[10px] font-bold text-apc-green">+12%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ambient glows */}
                    <div className="absolute -top-16 -right-16 w-80 h-80 bg-apc-cyan/15 rounded-full blur-[100px] -z-10 group-hover:bg-apc-cyan/22 transition-colors duration-700 pointer-events-none" aria-hidden="true" />
                    <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-apc-gold/10 rounded-full blur-[120px] -z-10 group-hover:bg-apc-gold/18 transition-colors duration-700 pointer-events-none" aria-hidden="true" />
                </motion.div>

            </div>
        </section>
    );
}
