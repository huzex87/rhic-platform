"use client";

import React from 'react';
import { Scale, Heart, Zap, ShieldCheck, Flag, Users, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function TermsOfEngagement() {
    return (
        <div className="min-h-screen bg-ivory">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-apc-cyan transition-colors mb-12"
                >
                    <ChevronLeft className="w-3 h-3" /> Back to Coalition
                </Link>

                <div className="space-y-16">
                    <header className="space-y-6">
                        <div className="w-16 h-16 bg-apc-red/10 rounded-2xl flex items-center justify-center">
                            <Scale className="w-8 h-8 text-apc-red" />
                        </div>
                        <h1 className="text-5xl font-display font-black text-foreground tracking-tighter">
                            Terms of <span className="text-apc-red italic">Engagement</span>
                        </h1>
                        <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                            Defining the code of conduct for Nigeria&apos;s most disciplined mobilization force.
                        </p>
                    </header>

                    <div className="grid gap-12">
                        <section className="space-y-6">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                                <Heart className="w-4 h-4 text-apc-red" /> The Standard of Conduct
                            </h2>
                            <div className="bg-white p-8 rounded-[2rem] border border-foreground/5 shadow-sm space-y-6 text-foreground/70 font-medium leading-relaxed">
                                <p>
                                    Participation in the RHIC platform is a commitment to national excellence. All members agree to the following pillars of engagement:
                                </p>
                                <div className="grid sm:grid-cols-2 gap-8 mt-8">
                                    {[
                                        { icon: ShieldCheck, title: "Absolute Integrity", desc: "No falsification of results or ground intelligence. Truth is our primary strategic asset." },
                                        { icon: Flag, title: "Non-Violence", desc: "The RHIC is a peaceful mobilization force. We strictly prohibit any form of intimidation or aggression." },
                                        { icon: Users, title: "Brotherhood", desc: "Respect for all coalition members regardless of region or rank. Unity is our strength." },
                                        { icon: Zap, title: "Excellence", desc: "Commitment to the highest standard of professionalism in every assigned mission." }
                                    ].map((pillar, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex items-center gap-2 text-apc-red font-black text-xs uppercase tracking-widest">
                                                <pillar.icon className="w-4 h-4" /> {pillar.title}
                                            </div>
                                            <p className="text-xs text-foreground/50 leading-relaxed">{pillar.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                                <Scale className="w-4 h-4 text-apc-cyan" /> Legal Framework
                            </h2>
                            <div className="space-y-6 text-foreground/60 text-sm font-medium leading-relaxed">
                                <div className="p-6 bg-foreground/[0.02] rounded-2xl border border-foreground/5">
                                    <h3 className="font-black text-foreground uppercase tracking-tight mb-2">1. Eligibility</h3>
                                    <p>You must be a citizen of Nigeria or a verified diaspora supporter to participate in mobilization missions.</p>
                                </div>
                                <div className="p-6 bg-foreground/[0.02] rounded-2xl border border-foreground/5">
                                    <h3 className="font-black text-foreground uppercase tracking-tight mb-2">2. Identity Security</h3>
                                    <p>Members are responsible for the confidentiality of their login credentials. Any security breach must be reported to High Command immediately.</p>
                                </div>
                                <div className="p-6 bg-foreground/[0.02] rounded-2xl border border-foreground/5">
                                    <h3 className="font-black text-foreground uppercase tracking-tight mb-2">3. Termination of Engagement</h3>
                                    <p>High Command reserves the right to terminate access for any member found to be in violation of the National Standard of Conduct.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <footer className="pt-12 border-t border-foreground/5 text-center">
                        <p className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em]">
                            © 2026 Renewed Hope Innovators Coalition • For National Stability
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
