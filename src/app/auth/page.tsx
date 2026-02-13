"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="max-w-7xl mx-auto px-4 min-h-[80vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-leaf" />
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

    // Simplified form: just email + password (name collected at onboarding)
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
                        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
                    },
                });
                if (error) throw error;

                // If Supabase auto-confirms (no email verification), redirect immediately
                if (data.session) {
                    router.push("/onboarding");
                    router.refresh();
                } else {
                    setSuccess("Check your email for a confirmation link — then you'll be redirected to set up your profile.");
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
        <div className="max-w-7xl mx-auto px-4 min-h-[80vh] flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-6xl">

                {/* Left Side: Big Logo + Branding */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:flex flex-col gap-8 items-center lg:items-start"
                >
                    <div className="relative w-64 h-64">
                        <Image
                            src="/logo.png"
                            alt="RHIC Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-5xl font-display font-black text-forest leading-tight">
                        Join the <span className="text-leaf italic">Movement</span>
                    </h1>
                    <p className="text-lg text-forest/60 font-medium leading-relaxed max-w-md">
                        Be part of Nigeria&apos;s largest innovation mobilization network.
                        Connect with innovators across all 36 states and the FCT.
                    </p>
                    <div className="flex gap-8 pt-4">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-forest">250K+</span>
                            <span className="text-xs font-bold text-forest/30 uppercase tracking-widest">Supporters</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-forest">37</span>
                            <span className="text-xs font-bold text-forest/30 uppercase tracking-widest">Chapters Active</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-forest">6</span>
                            <span className="text-xs font-bold text-forest/30 uppercase tracking-widest">Zones</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Simplified Auth Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="premium-card p-10 bg-white relative overflow-hidden"
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <Image src="/logo.png" alt="RHIC Logo" width={120} height={120} className="object-contain" />
                    </div>

                    <div className="space-y-2 mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-display font-black text-forest">
                            {isLogin ? "Welcome Back" : "Join in Seconds"}
                        </h2>
                        <p className="text-forest/60 font-medium">
                            {isLogin ? "Sign in to continue your mission." : "Just your email and a password — that's it."}
                        </p>
                    </div>

                    {/* Error / Success Messages */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center gap-3"
                        >
                            <AlertCircle className="w-5 h-5 text-accent-red shrink-0" />
                            <span className="text-sm font-medium text-accent-red">{error}</span>
                        </motion.div>
                    )}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 rounded-xl bg-leaf/10 border border-leaf/20"
                        >
                            <span className="text-sm font-medium text-forest">{success}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-forest/40 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/20 w-5 h-5" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-forest/5 border border-accent-red/15 focus:ring-2 focus:ring-leaf focus:border-leaf outline-none font-medium transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-forest/40 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/20 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min 6 characters"
                                    required
                                    minLength={6}
                                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-forest/5 border border-accent-red/15 focus:ring-2 focus:ring-leaf focus:border-leaf outline-none font-medium transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-forest/30 hover:text-forest transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="forest-gradient text-ivory w-full py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 border border-accent-red/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? "SIGN IN" : "JOIN THE MOVEMENT"}
                                    <ArrowRight className="w-6 h-6" />
                                </>
                            )}
                        </button>
                    </form>

                    {!isLogin && (
                        <p className="mt-5 text-center text-xs text-forest/30 font-medium">
                            You&apos;ll set up your name, phone, and chapter location after joining.
                        </p>
                    )}

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-accent-red/10"></div></div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white px-4 text-forest/30">Or Continue With</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-4 rounded-xl border border-accent-red/15 hover:bg-forest/5 transition-all font-bold text-sm btn-accent">
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-4 rounded-xl border border-accent-red/15 hover:bg-forest/5 transition-all font-bold text-sm btn-accent">
                            <Mail className="w-4 h-4" /> Phone OTP
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm font-medium text-forest/40">
                        {isLogin ? "New to the movement? " : "Already have an account? "}
                        <button
                            onClick={() => { setIsLogin(!isLogin); setError(null); setSuccess(null); }}
                            className="text-leaf font-bold hover:underline"
                        >
                            {isLogin ? "Join Now" : "Sign In"}
                        </button>
                    </p>

                    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent-red/5 rounded-full blur-3xl" />
                </motion.div>
            </div>
        </div>
    );
}
