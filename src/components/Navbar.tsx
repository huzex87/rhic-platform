"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, BarChart3, Rocket, MessageSquare, BookOpen, LogOut, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthProvider";
import { useNotifications } from "./NotificationProvider";
import PrestigeBadge, { UserTier } from "./PrestigeBadge";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Missions", href: "/missions", icon: Rocket },
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
        <nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-4'}`}>
            <div className="max-w-7xl mx-auto">
                <div className={`rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'glass shadow-2xl border-accent-red/15' : 'bg-transparent'}`}>
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative">
                            <Image
                                src="/logo.png"
                                alt="RHIC Logo"
                                width={120}
                                height={48}
                                className="h-12 w-auto object-contain transition-transform group-hover:scale-110"
                                priority
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

                        {/* Strategy Room for Admins */}
                        {(user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'super_admin') && (
                            <Link
                                href="/situation-room"
                                className="flex items-center gap-2 text-accent-red font-black text-[10px] uppercase tracking-widest bg-accent-red/5 px-4 py-2 rounded-xl border border-accent-red/20 hover:bg-accent-red/10 transition-all group"
                            >
                                <Rocket className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                                <span>S-EAGLE COMMAND</span>
                            </Link>
                        )}

                        {/* Auth Button */}
                        {loading ? (
                            <div className="w-28 h-10 rounded-xl bg-forest/10 animate-pulse" />
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/settings"
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-forest/5 border border-accent-red/15 hover:bg-forest/10 transition-all group/profile relative"
                                >
                                    <UserCircle className="w-5 h-5 text-leaf group-hover/profile:scale-110 transition-transform" />
                                    {notifications.length > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-red border-2 border-ivory"></span>
                                        </span>
                                    )}
                                    <span className="text-sm font-bold text-forest max-w-[100px] truncate">
                                        {user.user_metadata?.full_name || user.email?.split("@")[0]}
                                    </span>
                                    <PrestigeBadge tier={user.user_metadata?.tier as UserTier || 'Supporter'} size="sm" />
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-forest/50 hover:text-accent-red hover:bg-accent-red/5 transition-all text-sm font-bold"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/auth"
                                className="forest-gradient text-ivory px-6 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all border border-accent-red/20"
                            >
                                Join Movement
                            </Link>
                        )}
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
