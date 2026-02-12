"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, User, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LocationSelector, { type LocationSelection } from "@/components/LocationSelector";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase";

export default function OnboardingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1);
    const [location, setLocation] = useState<LocationSelection | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLocationSelect = (loc: LocationSelection) => {
        setLocation(loc);
    };

    const handleComplete = async () => {
        if (!location || !user) return;

        setLoading(true);
        setError(null);

        try {
            const supabase = createClient();

            // Update user profile with location
            const { error: profileError } = await supabase
                .from("profiles")
                .update({
                    zone: location.zone,
                    state: location.state,
                    lga: location.lga,
                    ward: location.ward,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", user.id);

            if (profileError) throw profileError;

            // Try to assign chapter based on state
            const { data: chapter } = await supabase
                .from("chapters")
                .select("id")
                .eq("state", location.state)
                .single();

            if (chapter) {
                await supabase
                    .from("profiles")
                    .update({ chapter_id: chapter.id })
                    .eq("id", user.id);

                // Increment chapter supporter count (silent fail if RPC not created yet)
                try {
                    await supabase.rpc("increment_supporter_count", { chapter_id_param: chapter.id });
                } catch {
                    // RPC may not exist yet
                }
            }

            // Log activity
            await supabase.from("activities").insert({
                user_id: user.id,
                chapter_id: chapter?.id || null,
                type: "chapter_join",
                title: `Joined ${location.state} chapter from ${location.ward} ward, ${location.lga} LGA`,
                metadata: location,
            });

            setStep(2);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to save location";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        router.push("/auth");
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 min-h-[80vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl"
            >
                {step === 1 ? (
                    <div className="premium-card p-8 md:p-12 space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 mx-auto relative">
                                <Image src="/logo.png" alt="RHIC" fill className="object-contain" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-display font-black text-forest">
                                    Welcome, <span className="text-leaf italic">{user.user_metadata?.full_name || "Innovator"}</span>
                                </h1>
                                <p className="text-forest/60 font-medium mt-2">
                                    Select your location to join your local RHIC chapter
                                </p>
                            </div>
                        </div>

                        {/* Location Selector */}
                        <LocationSelector
                            onChange={handleLocationSelect}
                        />

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-accent-red/10 border border-accent-red/20 text-sm font-medium text-accent-red"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Submit */}
                        <button
                            onClick={handleComplete}
                            disabled={!location || loading}
                            className="forest-gradient text-ivory w-full py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 border border-accent-red/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    JOIN MY CHAPTER
                                    <ArrowRight className="w-6 h-6" />
                                </>
                            )}
                        </button>

                        {/* Skip */}
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="w-full text-center text-sm font-medium text-forest/30 hover:text-forest/60 transition-colors"
                        >
                            Skip for now
                        </button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="premium-card p-12 text-center space-y-8"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="w-24 h-24 mx-auto rounded-full bg-leaf/10 flex items-center justify-center"
                        >
                            <CheckCircle className="w-12 h-12 text-leaf" />
                        </motion.div>
                        <div>
                            <h2 className="text-3xl font-display font-black text-forest mb-2">
                                You&apos;re All Set!
                            </h2>
                            <p className="text-forest/60 font-medium">
                                You&apos;ve been assigned to the <span className="font-bold text-forest">{location?.state}</span> chapter.
                            </p>
                            <p className="text-forest/40 text-sm mt-1">
                                {location?.ward} Ward • {location?.lga} LGA • {location?.zone}
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 p-4 bg-forest/5 rounded-2xl border border-accent-red/10">
                            <User className="w-5 h-5 text-leaf" />
                            <span className="text-sm font-bold text-forest">
                                You can update your location anytime from Settings
                            </span>
                        </div>

                        <button
                            onClick={() => router.push("/dashboard")}
                            className="forest-gradient text-ivory w-full py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-[1.02] transition-all border border-accent-red/20"
                        >
                            GO TO DASHBOARD
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
