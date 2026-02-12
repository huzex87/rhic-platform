"use client";

import { motion } from "framer-motion";
import { Shield, ArrowRight, Github, Mail, Phone, Lock } from "lucide-react";
import { useState } from "react";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 min-h-[80vh] flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-6xl">

                {/* Left Side: Branding */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:flex flex-col gap-8"
                >
                    <div className="w-20 h-20 bg-navy rounded-3xl flex items-center justify-center shadow-2xl">
                        <Shield className="text-gold w-10 h-10" />
                    </div>
                    <h1 className="text-6xl font-display font-black text-navy leading-tight">
                        Join the <span className="text-gold italic">Elite</span> Movement
                    </h1>
                    <p className="text-xl text-navy/60 font-medium leading-relaxed max-w-md">
                        The national digital operating system for Nigeria&apos;s brightest innovators.
                        Structured mobilization for a renewed national momentum.
                    </p>
                    <div className="flex gap-8 pt-4">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-navy">250K+</span>
                            <span className="text-xs font-bold text-navy/30 uppercase tracking-widest">Verified Members</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-navy">37</span>
                            <span className="text-xs font-bold text-navy/30 uppercase tracking-widest">Chapters Active</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Auth Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="premium-card p-10 bg-white relative overflow-hidden"
                >
                    <div className="space-y-2 mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-display font-black text-navy">
                            {isLogin ? "Welcome Back" : "Initiate Membership"}
                        </h2>
                        <p className="text-navy/60 font-medium">
                            {isLogin ? "Continue your mobilization mission." : "Start your journey as a verified RHIC innovator."}
                        </p>
                    </div>

                    <form className="space-y-6">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-black text-navy/40 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/20 w-5 h-5" />
                                    <input type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-navy/5 border-none focus:ring-2 focus:ring-gold outline-none font-medium" />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-black text-navy/40 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/20 w-5 h-5" />
                                <input type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-navy/5 border-none focus:ring-2 focus:ring-gold outline-none font-medium" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-navy/40 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/20 w-5 h-5" />
                                <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-navy/5 border-none focus:ring-2 focus:ring-gold outline-none font-medium" />
                            </div>
                        </div>

                        <button className="navy-gradient text-ivory w-full py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                            {isLogin ? "LOGIN TO HUB" : "CREATE ACCOUNT"}
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-navy/10"></div></div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white px-4 text-navy/30">Or Continue With</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-4 rounded-xl border border-navy/10 hover:bg-navy/5 transition-all font-bold text-sm">
                            <Github className="w-4 h-4" /> Github
                        </button>
                        <button className="flex items-center justify-center gap-2 py-4 rounded-xl border border-navy/10 hover:bg-navy/5 transition-all font-bold text-sm">
                            <Phone className="w-4 h-4" /> Phone OTP
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm font-medium text-navy/40">
                        {isLogin ? "New to the movement? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-gold font-bold hover:underline"
                        >
                            {isLogin ? "Join Now" : "Sign In"}
                        </button>
                    </p>

                    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-navy/5 rounded-full blur-3xl" />
                </motion.div>
            </div>
        </div>
    );
}
