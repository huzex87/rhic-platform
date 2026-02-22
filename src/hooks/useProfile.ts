"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";

export interface UserProfile {
    id: string;
    full_name: string;
    role: string;
    state: string | null;
    lga: string | null;
    ward: string | null;
    polling_unit_id: string | null;
    chapter_id: string | null;
    is_volunteer: boolean;
    tier: string;
    reputation_score: number;
    avatar_url: string | null;
    zone: string | null;
}

export function useProfile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        const supabase = createClient();
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (error) {
            setError(error.message);
        } else {
            setProfile(data);
        }
        setLoading(false);
    }, [user]);

    useEffect(() => {
        fetchProfile();

        const supabase = createClient();
        if (user) {
            const channel = supabase
                .channel(`profile:${user.id}`)
                .on(
                    "postgres_changes",
                    {
                        event: "UPDATE",
                        schema: "public",
                        table: "profiles",
                        filter: `id=eq.${user.id}`,
                    },
                    (payload) => {
                        setProfile(payload.new as UserProfile);
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [user, fetchProfile]);

    return { profile, loading, error, refreshProfile: fetchProfile };
}
