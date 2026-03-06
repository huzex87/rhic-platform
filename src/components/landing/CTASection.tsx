"use client";

import { motion } from "framer-motion";
import { Handshake, Zap, ShieldCheck, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,173,239,0.4)]"
                >
                    <div className="absolute inset-0 vibrant-apc-gradient opacity-95" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-apc-gold/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 px-10 py-24 md:px-24 md:py-32 flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 mb-10"
                            >
                                <Handshake className="w-5 h-5 text-apc-gold" />
                                <span className="text-xs font-black text-white tracking-[0.3em] uppercase">Become a Commander</span>
                            </motion.div>

                            <h2 className="text-5xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter mb-10">
                                Join the <br />
                                <span className="italic underline decoration-apc-gold decoration-8 underline-offset-8">Vanguard</span>
                            </h2>

                            <p className="max-w-xl text-xl text-white/80 font-medium leading-relaxed mb-14">
                                Nigeria is at a digital crossroads. We are recruiting the brightest minds to build,
                                deploy, and defend the technological future of our great nation.
                                Your mission starts here.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <Link
                                    href="/auth"
                                    className="bg-white text-apc-cyan px-12 py-6 rounded-3xl font-black text-xl shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all flex items-center gap-4 w-full sm:w-auto justify-center"
                                >
                                    Join Now
                                    <ChevronRight className="w-6 h-6" />
                                </Link>
                                <Link
                                    href="/chapter"
                                    className="px-12 py-6 rounded-3xl font-black text-xl text-white border-2 border-white/30 backdrop-blur-md hover:bg-white/10 transition-all w-full sm:w-auto text-center"
                                >
                                    Find Chapter
                                </Link>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 gap-6 w-full max-w-lg">
                            {[
                                { icon: Zap, title: "High-Resolution Impact", desc: "Build tools that reach millions instantly" },
                                { icon: ShieldCheck, title: "Elite Verification", desc: "Earn official national digital credentials" },
                                { icon: Globe, title: "360° Coordination", desc: "Sync with commanders across every ward" },
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="p-8 rounded-[2rem] bg-white/10 border border-white/10 backdrop-blur-xl hover:bg-white/15 transition-all group"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                                            <item.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-display font-black text-white mb-2 tracking-tight">{item.title}</div>
                                            <div className="text-white/60 text-sm font-medium leading-relaxed">{item.desc}</div>
                                        </div>
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
