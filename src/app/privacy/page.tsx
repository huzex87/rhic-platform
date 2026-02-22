"use client";

import React from 'react';
import { Shield, Lock, Eye, Server, UserCheck, Globe, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function PrivacyPolicy() {
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
                        <div className="w-16 h-16 bg-apc-cyan/10 rounded-2xl flex items-center justify-center">
                            <Shield className="w-8 h-8 text-apc-cyan" />
                        </div>
                        <h1 className="text-5xl font-display font-black text-foreground tracking-tighter">
                            Privacy <span className="text-apc-cyan italic">Protocols</span>
                        </h1>
                        <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                            Securing the data of Nigeria&apos;s most impactful mobilization network.
                        </p>
                    </header>

                    <div className="grid gap-12">
                        <section className="space-y-6">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                                <Eye className="w-4 h-4 text-apc-red" /> Data Transparency
                            </h2>
                            <div className="bg-white p-8 rounded-[2rem] border border-foreground/5 shadow-sm space-y-6 text-foreground/70 font-medium leading-relaxed">
                                <p>
                                    At RHIC (Renewed Hope Innovators Coalition), we prioritize the security and sovereignty of our members&apos; data. This protocol outlines how we collect, protect, and utilize information to drive national progress.
                                </p>
                                <ul className="space-y-4 list-disc pl-5">
                                    <li><strong className="text-foreground">Identity Verification</strong>: We collect basic profile data (Name, Phone, Location) to authenticate legitimate coalition members.</li>
                                    <li><strong className="text-foreground">Field Intelligence</strong>: Intelligence reports and media uploads are geotagged to verify ground truth during mobilization.</li>
                                    <li><strong className="text-foreground">Financial Security</strong>: All patronage and contributions are processed through encrypted, compliant gateways.</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                                <Lock className="w-4 h-4 text-apc-cyan" /> Security Architecture
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { icon: Server, title: "Sovereign Hosting", desc: "Data is stored on high-availability, high-security infrastructure with redundant backups." },
                                    { icon: UserCheck, title: "Role-Based Access", desc: "Intelligence is only visible to authorized command levels per the S-EAGLE protocols." },
                                    { icon: Globe, title: "Encrypted Transit", desc: "All communication between your device and our servers is secured via 256-bit SSL encryption." },
                                    { icon: Shield, title: "Zero Data Sale", desc: "We never sell or distribute member data to third-party commercial entities." }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-foreground/[0.02] rounded-3xl border border-foreground/5 space-y-4">
                                        <item.icon className="w-6 h-6 text-foreground/30" />
                                        <h3 className="font-black text-foreground uppercase tracking-tight">{item.title}</h3>
                                        <p className="text-xs text-foreground/50 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-3">
                                <Shield className="w-4 h-4 text-apc-gold" /> Your Rights
                            </h2>
                            <div className="premium-card space-y-6 bg-foreground text-ivory border-none">
                                <p className="text-sm font-medium opacity-80 leading-relaxed">
                                    As a member of the coalition, you retain full rights to request data extracts or the deletion of your profile in alignment with the NDPR (Nigeria Data Protection Regulation).
                                </p>
                                <button className="px-8 py-3 bg-apc-cyan text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-apc-cyan transition-all">
                                    Request Data Audit
                                </button>
                            </div>
                        </section>
                    </div>

                    <footer className="pt-12 border-t border-foreground/5 text-center">
                        <p className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em]">
                            Last Updated: February 2026 • Version 2.0 (Renewed Hope Standard)
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
