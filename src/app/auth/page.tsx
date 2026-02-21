"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Shield, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="max-w-7xl mx-auto px-4 min-h-[80vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-apc-cyan" />
            </div>
        }>
            <AuthForm />
        </Suspense>
    );
}

function AuthForm() {
    const [isLogin, setIsLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/dashboard";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const supabase = createClient();

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                router.push(redirect);
                router.refresh();
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            email_confirmed: true,
                        },
                    },
                });
                if (error) throw error;

                // Auto-login after signup — no email verification required
                if (data.session) {
                    router.push("/onboarding");
                    router.refresh();
                } else {
                    // Fallback: try signing in immediately after signup
                    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
                    if (signInError) {
                        setSuccess("Account created! Please sign in to continue.");
                        setIsLogin(true);
                    } else {
                        router.push("/onboarding");
                        router.refresh();
                    }
                }
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "An unexpected error occurred";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative max-w-7xl mx-auto px-4 min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-apc-cyan/8 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-apc-green/8 rounded-full blur-[140px] -z-10 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-apc-red/5 rounded-full blur-[100px] -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-6xl">

                {/* Left Side: APC-Branded Identity */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hidden lg:flex flex-col gap-10 items-start"
                >
                    {/* Logo with subtle glow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-apc-cyan/10 rounded-full blur-3xl scale-150" />
                        <div className="relative w-56 h-56">
                            <Image
                                src="/logo.png"
                                alt="RHIC Logo"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <h1 className="text-6xl font-display font-black text-foreground leading-[0.95] tracking-tighter">
                            Join the{" "}
                            <span className="text-transparent bg-clip-text vibrant-apc-gradient italic">
                                Vanguard
                            </span>
                        </h1>
                        <p className="text-lg text-foreground/50 font-medium leading-relaxed max-w-md mt-6">
                            Be part of Nigeria&apos;s elite digital mobilization network.
                            Connect with commanders across all 36 states and the FCT.
                        </p>
                    </motion.div>

                    {/* Stats with colorful accents */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex gap-10 pt-2"
                    >
                        {[
                            { value: "250K+", label: "Supporters", color: "text-apc-cyan", border: "border-apc-cyan/20" },
                            { value: "37", label: "Chapters", color: "text-apc-green", border: "border-apc-green/20" },
                            { value: "6", label: "Zones", color: "text-apc-red", border: "border-apc-red/20" },
                        ].map((stat) => (
                            <div key={stat.label} className={`flex flex-col pl-4 border-l-2 ${stat.border}`}>
                                <span className={`text-3xl font-display font-black ${stat.color}`}>{stat.value}</span>
                                <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Trust badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-apc-cyan/10"
                    >
                        <Shield className="w-5 h-5 text-apc-green" />
                        <span className="text-xs font-bold text-foreground/40">End-to-end encrypted &bull; Military-grade security</span>
                    </motion.div>
                </motion.div>

                {/* Right Side: Premium Auth Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Outer gradient border effect */}
                    <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-apc-cyan/20 via-transparent to-apc-red/20 -z-10" />

                    <div className="premium-card p-10 lg:p-12 bg-white/95 backdrop-blur-xl relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-20px_rgba(0,173,239,0.15)]">
                        {/* Mobile logo */}
                        <div className="lg:hidden flex justify-center mb-8">
                            <Image src="/logo.png" alt="RHIC Logo" width={100} height={100} className="object-contain" />
                        </div>

                        {/* Header with animated indicator */}
                        <div className="space-y-3 mb-10 text-center lg:text-left">
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={isLogin ? "login" : "signup"}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-3xl font-display font-black text-foreground"
                                >
                                    {isLogin ? "Welcome Back" : "Join in Seconds"}
                                </motion.h2>
                            </AnimatePresence>
                            <p className="text-foreground/50 font-medium text-sm">
                                {isLogin
                                    ? "Sign in to continue your mission."
                                    : "Just your email and a password \u2014 that\u2019s it."
                                }
                            </p>
                        </div>

                        {/* Error / Success Messages */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: -10, height: 0 }}
                                    className="mb-6 p-4 rounded-xl bg-apc-red/8 border border-apc-red/15 flex items-center gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-apc-red shrink-0" />
                                    <span className="text-sm font-medium text-apc-red">{error}</span>
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: -10, height: 0 }}
                                    className="mb-6 p-4 rounded-xl bg-apc-green/8 border border-apc-green/15 flex items-center gap-3"
                                >
                                    <Sparkles className="w-5 h-5 text-apc-green shrink-0" />
                                    <span className="text-sm font-medium text-foreground">{success}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-foreground/35 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 w-5 h-5 transition-colors group-focus-within:text-apc-cyan" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-foreground/[0.03] border border-foreground/10 focus:ring-2 focus:ring-apc-cyan/30 focus:border-apc-cyan/50 outline-none font-medium transition-all text-foreground placeholder:text-foreground/25"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-foreground/35 uppercase tracking-[0.2em] ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 w-5 h-5 transition-colors group-focus-within:text-apc-cyan" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min 6 characters"
                                        required
                                        minLength={6}
                                        className="w-full pl-12 pr-12 py-4 rounded-xl bg-foreground/[0.03] border border-foreground/10 focus:ring-2 focus:ring-apc-cyan/30 focus:border-apc-cyan/50 outline-none font-medium transition-all text-foreground placeholder:text-foreground/25"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/25 hover:text-foreground/60 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                className="w-full py-5 rounded-xl font-black text-base shadow-[0_20px_50px_-15px_rgba(0,173,239,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed vibrant-apc-gradient text-white tracking-wide mt-2"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        {isLogin ? "SIGN IN" : "JOIN THE VANGUARD"}
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {!isLogin && (
                            <p className="mt-5 text-center text-[11px] text-foreground/25 font-medium">
                                You&apos;ll set up your name, phone, and chapter location after joining.
                            </p>
                        )}

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-foreground/5"></div>
                            </div>
                            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.25em]">
                                <span className="bg-white px-5 text-foreground/25">Or Continue With</span>
                            </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2.5 py-4 rounded-xl border border-foreground/8 hover:border-foreground/15 hover:bg-foreground/[0.02] transition-all font-bold text-sm text-foreground"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Google
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2.5 py-4 rounded-xl border border-foreground/8 hover:border-foreground/15 hover:bg-foreground/[0.02] transition-all font-bold text-sm text-foreground"
                            >
                                <Mail className="w-4 h-4 text-apc-cyan" /> Phone OTP
                            </motion.button>
                        </div>

                        {/* Toggle Login/Signup */}
                        <p className="mt-10 text-center text-sm font-medium text-foreground/35">
                            {isLogin ? "New to the movement? " : "Already have an account? "}
                            <button
                                onClick={() => { setIsLogin(!isLogin); setError(null); setSuccess(null); }}
                                className="text-apc-cyan font-bold hover:underline underline-offset-4 transition-all"
                            >
                                {isLogin ? "Join Now" : "Sign In"}
                            </button>
                        </p>

                        {/* Decorative APC glow elements */}
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-apc-cyan/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -top-12 -left-12 w-40 h-40 bg-apc-red/5 rounded-full blur-3xl pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
