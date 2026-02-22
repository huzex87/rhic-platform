"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, BarChart3, Rocket, MessageSquare, BookOpen, LogOut, UserCircle, ArrowRight, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthProvider";
import { useNotifications } from "./NotificationProvider";
import PrestigeBadge, { UserTier } from "./PrestigeBadge";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Missions", href: "/missions", icon: Rocket },
    { name: "Mandates", href: "/mandate", icon: Target },
    { name: "Innovation", href: "/innovation", icon: BookOpen },
    { name: "Media", href: "/media", icon: MessageSquare },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, loading, signOut } = useAuth();
    const { notifications } = useNotifications();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/";
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-6'}`}>
            <div className="max-w-7xl mx-auto">
                <div className={`rounded-3xl px-8 py-4 flex items-center justify-between transition-all duration-500 ${scrolled ? 'ultra-glass shadow-[0_20px_50px_-10px_rgba(0,173,239,0.2)]' : 'bg-white/5 backdrop-blur-md border border-white/10'}`}>
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative">
                            <Image
                                src="/logo.png"
                                alt="RHIC Logo"
                                width={120}
                                height={48}
                                className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,173,239,0.3)]"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-2.5 text-foreground/60 hover:text-apc-cyan font-bold text-sm transition-all duration-300 group relative py-2"
                            >
                                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                <span>{item.name}</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-apc-cyan transition-all duration-300 group-hover:w-full rounded-full" />
                            </Link>
                        ))}

                        {/* Strategy Room for Admins */}
                        {(user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'super_admin') && (
                            <Link
                                href="/situation-room"
                                className="flex items-center gap-2.5 text-apc-red font-black text-[11px] uppercase tracking-[0.2em] bg-apc-red/[0.03] px-5 py-2.5 rounded-2xl border border-apc-red/20 hover:bg-apc-red/10 transition-all duration-500 group overflow-hidden relative shadow-sm"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-apc-red/0 via-apc-red/5 to-apc-red/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <Rocket className="w-4 h-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                                <span>S-EAGLE COMMAND</span>
                            </Link>
                        )}

                        {/* Auth Button */}
                        {loading ? (
                            <div className="w-32 h-11 rounded-2xl bg-foreground/5 animate-pulse" />
                        ) : user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/settings"
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-foreground/[0.02] border border-apc-cyan/10 hover:border-apc-cyan/30 hover:bg-foreground/[0.05] transition-all duration-500 group/profile relative shadow-sm"
                                >
                                    <div className="relative">
                                        <UserCircle className="w-6 h-6 text-apc-green group-hover/profile:scale-110 transition-transform duration-500" />
                                        {notifications.length > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apc-red opacity-75" />
                                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-apc-red border-2 border-white shadow-sm" />
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-sm font-black text-foreground max-w-[120px] truncate tracking-tight">
                                        {user.user_metadata?.full_name || user.email?.split("@")[0]}
                                    </span>
                                    <PrestigeBadge tier={user.user_metadata?.tier as UserTier || 'Supporter'} size="sm" />
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="p-2.5 rounded-2xl text-foreground/40 hover:text-apc-red hover:bg-apc-red/5 transition-all duration-500 group"
                                    title="Sign Out"
                                >
                                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/auth"
                                className="btn-apc px-8 py-3.5 rounded-2xl font-black text-sm shadow-[0_15px_30px_-10px_rgba(0,173,239,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(0,173,239,0.5)] flex items-center gap-2 group border border-white/20"
                            >
                                Join Movement
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-3 rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6 text-apc-red" /> : <Menu className="w-6 h-6 text-apc-cyan" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden mt-2 glass rounded-2xl overflow-hidden border border-accent-red/15"
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
                                {(user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'super_admin') && (
                                    <Link
                                        href="/admin/strategy"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 text-accent-red font-black text-sm p-3 rounded-xl bg-accent-red/5 border border-accent-red/20"
                                    >
                                        <Rocket className="w-5 h-5" />
                                        <span>NATIONAL STRATEGY</span>
                                    </Link>
                                )}
                                {user ? (
                                    <>
                                        <Link
                                            href="/settings"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-2 p-2 border-t border-accent-red/10 pt-4 hover:bg-forest/5 rounded-lg transition-colors"
                                        >
                                            <UserCircle className="w-5 h-5 text-leaf" />
                                            <span className="text-sm font-bold text-forest">
                                                {user.user_metadata?.full_name || user.email?.split("@")[0]}
                                            </span>
                                            <div className="ml-auto flex items-center gap-2">
                                                <PrestigeBadge tier={user.user_metadata?.tier as UserTier || 'Supporter'} size="sm" />
                                                <span className="text-[10px] font-black text-leaf uppercase tracking-widest">Settings</span>
                                            </div>
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-2 p-3 rounded-xl text-accent-red font-bold hover:bg-accent-red/5 transition-colors"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/auth"
                                        className="forest-gradient text-ivory p-3 rounded-xl font-bold text-center shadow-lg border border-accent-red/20"
                                    >
                                        Join Movement
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
