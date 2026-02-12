"use client";

import Link from "next/link";
import { Menu, X, Shield, BarChart3, Rocket, MessageSquare, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Missions", href: "/missions", icon: Rocket },
    { name: "Innovation", href: "/innovation", icon: BookOpen },
    { name: "Media", href: "/media", icon: MessageSquare },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-4'}`}>
            <div className="max-w-7xl mx-auto">
                <div className={`rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'glass shadow-2xl border-white/20' : 'bg-transparent'}`}>
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative">
                            <img
                                src="/logo.png"
                                alt="RHIC Logo"
                                className="h-12 w-auto object-contain transition-transform group-hover:scale-110"
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-2 text-forest/70 hover:text-forest font-medium transition-colors group"
                            >
                                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                        <Link
                            href="/auth"
                            className="forest-gradient text-ivory px-6 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Join Movement
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-forest p-2" onClick={() => setIsOpen(!isOpen)}>
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
                                        className="flex items-center gap-3 text-forest font-medium p-2 rounded-lg hover:bg-forest/5"
                                    >
                                        <item.icon className="w-5 h-5 text-leaf" />
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                                <Link
                                    href="/auth"
                                    className="forest-gradient text-ivory p-3 rounded-xl font-bold text-center shadow-lg"
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
