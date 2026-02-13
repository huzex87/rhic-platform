"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, MapPin, Save, Loader2, CheckCircle, LogOut, Shield, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import LocationSelector, { type LocationSelection } from "@/components/LocationSelector";
import BrandedIdCard from "@/components/BrandedIdCard";
import { useAuth } from "@/components/AuthProvider";
import { useAchievements } from "@/hooks/useAchievements";
import { createClient } from "@/lib/supabase";

interface Profile {
    full_name: string | null;
    phone: string | null;
    zone: string | null;
    state: string | null;
    lga: string | null;
    ward: string | null;
    occupation: string | null;
    bio: string | null;
    role: string | null;
    polling_unit_id: string | null;
    polling_unit_code: string | null;
    is_volunteer: boolean;
    volunteer_role: string | null;
    created_at: string | null;
}

export default function SettingsPage() {
    const { user, signOut } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showLocationEditor, setShowLocationEditor] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { achievements } = useAchievements();

    // Editable fields
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [occupation, setOccupation] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        if (!user) return;
        async function fetchProfile() {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("profiles")
                .select("full_name, phone, zone, state, lga, ward, polling_unit_id, polling_unit_code, occupation, bio, role, is_volunteer, volunteer_role, created_at")
                .eq("id", user!.id)
                .single();

            if (!error && data) {
                setProfile(data);
                setFullName(data.full_name || "");
                setPhone(data.phone || "");
                setOccupation(data.occupation || "");
                setBio(data.bio || "");
            }
            setLoading(false);
        }
        fetchProfile();
    }, [user]);

    const handleSaveProfile = async () => {
        if (!user) return;
        setSaving(true);
        setError(null);
        const supabase = createClient();

        const { error: updateError } = await supabase
            .from("profiles")
            .update({
                full_name: fullName,
                phone: phone || null,
                occupation: occupation || null,
                bio: bio || null,
                updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);

        if (updateError) {
            setError(updateError.message);
        } else {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            setProfile((prev) => prev ? {
                ...prev,
                full_name: fullName,
                phone,
                occupation,
                bio
            } : prev);
        }
        setSaving(false);
    };

    const handleLocationUpdate = async (location: LocationSelection) => {
        if (!user) return;
        setSaving(true);
        setError(null);
        const supabase = createClient();

        const { error: updateError } = await supabase
            .from("profiles")
            .update({
                zone: location.zone,
                state: location.state,
                lga: location.lga,
                ward: location.ward,
                polling_unit_id: location.polling_unit_id || null,
                polling_unit_code: location.polling_unit?.split('(')[1]?.replace(')', '') || null,
                updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);

        if (updateError) {
            setError(updateError.message);
        } else {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            setProfile((prev) => prev ? { ...prev, ...location } : prev);
            setShowLocationEditor(false);
        }
        setSaving(false);
    };

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    if (!user) {
        router.push("/auth");
        return null;
    }

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-leaf" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-display font-black text-forest">Settings</h1>
                <p className="text-forest/50 font-medium mt-2">Manage your profile, ID card, and chapter affiliation</p>
            </motion.div>

            {/* Success toast */}
            {saved && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-leaf/10 border border-leaf/20 flex items-center gap-3"
                >
                    <CheckCircle className="w-5 h-5 text-leaf" />
                    <span className="text-sm font-bold text-forest">Changes saved successfully!</span>
                </motion.div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-accent-red/10 border border-accent-red/20 text-sm font-medium text-accent-red"
                >
                    {error}
                </motion.div>
            )}

            {/* Profile Info Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="premium-card p-8 space-y-6"
            >
                <div className="flex items-center gap-3 pb-4 border-b border-accent-red/10">
                    <div className="w-10 h-10 rounded-xl bg-leaf/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-leaf" />
                    </div>
                    <div>
                        <h2 className="text-xl font-display font-black text-forest">Profile Information</h2>
                        <p className="text-xs text-forest/40 font-medium">{user.email}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/5 border border-accent-red/10">
                        <Shield className="w-3.5 h-3.5 text-leaf" />
                        <span className="text-[10px] font-black text-forest/50 uppercase tracking-widest">
                            {profile?.role || "supporter"}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-forest/40 uppercase tracking-widest ml-1">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-4 rounded-2xl bg-forest/5 border border-accent-red/15 focus:ring-2 focus:ring-leaf focus:border-leaf outline-none font-medium transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-forest/40 uppercase tracking-widest ml-1">Phone</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+234 800 000 0000"
                            className="w-full px-4 py-4 rounded-2xl bg-forest/5 border border-accent-red/15 focus:ring-2 focus:ring-leaf focus:border-leaf outline-none font-medium transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-forest/40 uppercase tracking-widest ml-1">Occupation</label>
                        <input
                            type="text"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            placeholder="e.g. Software Engineer, Farmer"
                            className="w-full px-4 py-4 rounded-2xl bg-forest/5 border border-accent-red/15 focus:ring-2 focus:ring-leaf focus:border-leaf outline-none font-medium transition-all"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black text-forest/40 uppercase tracking-widest ml-1">Professional Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={3}
                            placeholder="A short description of your background..."
                            className="w-full px-4 py-4 rounded-2xl bg-forest/5 border border-accent-red/15 focus:ring-2 focus:ring-leaf focus:border-leaf outline-none font-medium transition-all resize-none"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="forest-gradient text-ivory px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg hover:scale-[1.02] transition-all flex items-center gap-2 border border-accent-red/20 disabled:opacity-60"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    SAVE PROFILE
                </button>
            </motion.div>

            {/* Branded ID Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="premium-card p-8 space-y-6"
            >
                <div className="flex items-center gap-3 pb-4 border-b border-accent-red/10">
                    <div className="w-10 h-10 rounded-xl bg-leaf/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-leaf" />
                    </div>
                    <div>
                        <h2 className="text-xl font-display font-black text-forest">Your RHIC Member ID</h2>
                        <p className="text-xs text-forest/40 font-medium">Download and use as your profile picture or share on social media</p>
                    </div>
                </div>

                <BrandedIdCard
                    fullName={fullName || "RHIC Member"}
                    email={user.email || ""}
                    zone={profile?.zone || null}
                    state={profile?.state || null}
                    lga={profile?.lga || null}
                    ward={profile?.ward || null}
                    role={occupation || profile?.role || "supporter"}
                    memberId={user.id}
                    isVolunteer={profile?.is_volunteer || false}
                    volunteerRole={profile?.volunteer_role || null}
                    achievements={achievements}
                />
            </motion.div>

            {/* Location Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="premium-card p-8 space-y-6"
            >
                <div className="flex items-center gap-3 pb-4 border-b border-accent-red/10">
                    <div className="w-10 h-10 rounded-xl bg-leaf/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-leaf" />
                    </div>
                    <div>
                        <h2 className="text-xl font-display font-black text-forest">Chapter Location</h2>
                        <p className="text-xs text-forest/40 font-medium">Your political geography assignment</p>
                    </div>
                </div>

                {profile?.zone ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Zone", value: profile.zone },
                                { label: "State", value: profile.state },
                                { label: "LGA", value: profile.lga },
                                { label: "Ward", value: profile.ward },
                                { label: "Polling Unit", value: profile.polling_unit_code ? `PU: ${profile.polling_unit_code}` : "Not Assigned" },
                            ].map((item) => (
                                <div key={item.label} className="p-4 rounded-2xl bg-forest/5 border border-accent-red/10">
                                    <div className="text-[10px] font-black text-forest/30 uppercase tracking-widest">{item.label}</div>
                                    <div className="text-sm font-bold text-forest mt-1">{item.value || "—"}</div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowLocationEditor(!showLocationEditor)}
                            className="text-sm font-bold text-leaf hover:text-forest transition-colors"
                        >
                            {showLocationEditor ? "Cancel" : "Change Location →"}
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-forest/40 font-medium mb-4">You haven&apos;t set your location yet.</p>
                        <button
                            onClick={() => setShowLocationEditor(true)}
                            className="leaf-gradient text-forest px-6 py-3 rounded-2xl font-bold text-sm"
                        >
                            Set Your Location
                        </button>
                    </div>
                )}

                {showLocationEditor && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pt-4 border-t border-accent-red/10 space-y-5"
                    >
                        <LocationSelector
                            value={profile ? {
                                zone: profile.zone || "",
                                state: profile.state || "",
                                lga: profile.lga || "",
                                ward: profile.ward || "",
                                polling_unit_id: profile.polling_unit_id || ""
                            } : undefined}
                            onChange={handleLocationUpdate}
                        />
                    </motion.div>
                )}
            </motion.div>

            {/* Account Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="premium-card p-8 space-y-6"
            >
                <div className="flex items-center gap-3 pb-4 border-b border-accent-red/10">
                    <div className="w-10 h-10 rounded-xl bg-accent-red/10 flex items-center justify-center">
                        <LogOut className="w-5 h-5 text-accent-red" />
                    </div>
                    <div>
                        <h2 className="text-xl font-display font-black text-forest">Account</h2>
                        <p className="text-xs text-forest/40 font-medium">
                            Member since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-NG", { year: "numeric", month: "long" }) : "—"}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleSignOut}
                    className="px-8 py-3.5 rounded-2xl font-black text-sm border-2 border-accent-red/20 text-accent-red hover:bg-accent-red/5 transition-all flex items-center gap-2"
                >
                    <LogOut className="w-4 h-4" />
                    SIGN OUT
                </button>
            </motion.div>
        </div>
    );
}
