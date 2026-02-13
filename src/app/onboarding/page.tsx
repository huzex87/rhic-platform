"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle, Briefcase, FileText, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LocationSelector, { type LocationSelection } from "@/components/LocationSelector";
import BrandedIdCard from "@/components/BrandedIdCard";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase";

export default function OnboardingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [loc, setLoc] = useState<LocationSelection | null>(null);
    const [profileData, setProfileData] = useState({
        phone: "",
        occupation: "",
        bio: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initial load from user metadata
    useEffect(() => {
        if (user) {
            setProfileData(prev => ({
                ...prev,
                phone: user.user_metadata?.phone || "",
            }));
        }
    }, [user]);

    const handleLocationSelect = (loc: LocationSelection) => {
        setLoc(loc);
    };

    const handleLocationComplete = () => {
        if (!loc) return;
        setStep(2);
    };

    const handleProfileComplete = async () => {
        if (!loc || !user) return;

        setLoading(true);
        setError(null);

        try {
            const supabase = createClient();

            // 1. Update user profile with location and professional info
            const { error: profileError } = await supabase
                .from("profiles")
                .update({
                    zone: loc.zone,
                    state: loc.state,
                    lga: loc.lga,
                    ward: loc.ward,
                    polling_unit_id: loc.polling_unit_id || null,
                    polling_unit_code: loc.polling_unit?.split('(')[1]?.replace(')', '') || null,
                    phone: profileData.phone,
                    occupation: profileData.occupation,
                    bio: profileData.bio,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", user.id);

            if (profileError) throw profileError;

            // 2. Try to assign chapter based on state
            const { data: chapter } = await supabase
                .from("chapters")
                .select("id")
                .eq("state", loc.state)
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

            // 3. Log activity
            await supabase.from("activities").insert({
                user_id: user.id,
                chapter_id: chapter?.id || null,
                type: "chapter_join",
                title: `Joined ${loc.state} chapter as ${profileData.occupation || "Supporter"}`,
                metadata: {
                    ...loc,
                    occupation: profileData.occupation,
                },
            });

            setStep(3);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to save profile";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user && !loading) {
            router.push("/auth");
        }
    }, [user, loading, router]);

    if (!user) {
        return null;
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <div className="min-h-screen py-12 px-4 flex items-center justify-center bg-ivory">
            <div className="w-full max-w-2xl">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="premium-card p-8 md:p-12 space-y-8"
                        >
                            <OnboardingHeader
                                title={`Welcome, ${user.user_metadata?.full_name?.split(' ')[0] || "Innovator"}`}
                                subtitle="Select your location to join your local RHIC chapter"
                            />

                            <LocationSelector onChange={handleLocationSelect} />

                            <button
                                onClick={handleLocationComplete}
                                disabled={!loc}
                                className="forest-gradient text-ivory w-full py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 border border-accent-red/20 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                CONTINUE
                                <ArrowRight className="w-6 h-6" />
                            </button>

                            <SkipButton onClick={() => router.push("/dashboard")} />
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="premium-card p-8 md:p-12 space-y-8"
                        >
                            <OnboardingHeader
                                title="Professional Profile"
                                subtitle="Tell us a bit about yourself to help us coordinate better"
                            />

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-forest/40 ml-2 uppercase tracking-widest flex items-center gap-2">
                                        <Phone className="w-3 h-3" /> Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="0801 234 5678"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData(p => ({ ...p, phone: e.target.value }))}
                                        className="w-full bg-forest/5 border border-forest/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-leaf/30 text-forest font-bold transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-forest/40 ml-2 uppercase tracking-widest flex items-center gap-2">
                                        <Briefcase className="w-3 h-3" /> Occupation
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Software Engineer, Farmer, Lawyer"
                                        value={profileData.occupation}
                                        onChange={(e) => setProfileData(p => ({ ...p, occupation: e.target.value }))}
                                        className="w-full bg-forest/5 border border-forest/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-leaf/30 text-forest font-bold transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-forest/40 ml-2 uppercase tracking-widest flex items-center gap-2">
                                        <FileText className="w-3 h-3" /> Professional Bio
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="A short description of your professional background and interests..."
                                        value={profileData.bio}
                                        onChange={(e) => setProfileData(p => ({ ...p, bio: e.target.value }))}
                                        className="w-full bg-forest/5 border border-forest/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-leaf/30 text-forest font-bold transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {error && <ErrorAlert message={error} />}

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={handleProfileComplete}
                                    disabled={loading}
                                    className="forest-gradient text-ivory w-full py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 border border-accent-red/20 disabled:opacity-40"
                                >
                                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                        <>
                                            FINALIZE PROFILE
                                            <ArrowRight className="w-6 h-6" />
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-sm font-bold text-forest/40 hover:text-forest transition-colors uppercase tracking-widest"
                                >
                                    Go Back
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="premium-card p-8 md:p-12 text-center space-y-8"
                        >
                            <div className="space-y-2">
                                <div className="w-16 h-16 mx-auto rounded-full bg-leaf/10 flex items-center justify-center mb-4">
                                    <CheckCircle className="w-10 h-10 text-leaf" />
                                </div>
                                <h2 className="text-3xl font-display font-black text-forest">
                                    Registration Complete!
                                </h2>
                                <p className="text-forest/60 font-medium">
                                    Welcome to the <span className="text-forest font-bold">{loc?.state}</span> Chapter.
                                </p>
                            </div>

                            <BrandedIdCard
                                fullName={user.user_metadata?.full_name || "Innovator"}
                                email={user.email || ""}
                                zone={loc?.zone || ""}
                                state={loc?.state || ""}
                                lga={loc?.lga || ""}
                                ward={loc?.ward || ""}
                                role={profileData.occupation || "supporter"}
                                memberId={user.id}
                                isVolunteer={false}
                                volunteerRole={null}
                                pollingUnit={loc?.polling_unit || null}
                            />

                            <button
                                onClick={() => router.push("/dashboard")}
                                className="forest-gradient text-ivory w-full py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-[1.02] transition-all border border-accent-red/20 flex items-center justify-center gap-3"
                            >
                                GO TO DASHBOARD
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function OnboardingHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto relative mb-2">
                <Image src="/logo.png" alt="RHIC" fill className="object-contain" />
            </div>
            <div>
                <h1 className="text-3xl font-display font-black text-forest">
                    {title}
                </h1>
                <p className="text-forest/60 font-medium mt-2">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

function ErrorAlert({ message }: { message: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-accent-red/10 border border-accent-red/20 text-sm font-medium text-accent-red"
        >
            {message}
        </motion.div>
    );
}

function SkipButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full text-center text-xs font-bold text-forest/20 hover:text-forest/40 transition-colors uppercase tracking-widest"
        >
            Skip for now
        </button>
    );
}
