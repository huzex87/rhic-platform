"use client";

import Link from "next/link";
import { Menu, X, Shield, BarChart3, Rocket, MessageSquare, BookOpen } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Missions", href: "/missions", icon: Rocket },
    { name: "Innovation", href: "/innovation", icon: BookOpen },
    { name: "Media", href: "/media", icon: MessageSquare },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
            <div className="max-w-7xl mx-auto">
                <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center shadow-lg">
                            <Shield className="text-gold w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xl font-display font-bold text-navy tracking-tight block leading-none">RHIC</span>
                            <span className="text-[10px] text-navy/60 font-medium tracking-widest uppercase">Mobilize Hub</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-2 text-navy/70 hover:text-navy font-medium transition-colors group"
                            >
                                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                        <Link
                            href="/auth"
                            className="navy-gradient text-ivory px-6 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Join Movement
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-navy p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden mt-2 glass rounded-2xl overflow-hidden"
                        >
                            <div className="flex flex-col p-4 gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 text-navy font-medium p-2 rounded-lg hover:bg-navy/5"
                                    >
                                        <item.icon className="w-5 h-5 text-gold" />
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                                <Link
                                    href="/auth"
                                    className="navy-gradient text-ivory p-3 rounded-xl font-bold text-center shadow-lg"
                                >
                                    Join Movement
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
