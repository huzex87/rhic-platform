"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";

export interface Chapter {
    id: string;
    state: string;
    zone: string;
    name: string;
    supporter_count: number;
    status: string;
}

export interface ChapterMember {
    id: string;
    full_name: string;
    lga: string;
    ward?: string;
    role: string;
    is_volunteer: boolean;
    volunteer_role?: string;
    created_at: string;
}

export function useChapterData() {
    const { user } = useAuth();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [members, setMembers] = useState<ChapterMember[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const supabase = createClient();

        // 1. Get user's profile to find their state
        const { data: profile } = await supabase
            .from("profiles")
            .select("state, role")
            .eq("id", user.id)
            .single();

        if (!profile?.state) {
            setLoading(false);
            return;
        }

        // 2. Fetch Chapter details
        const { data: chapterData } = await supabase
            .from("chapters")
            .select("*")
            .eq("state", profile.state)
            .single();

        if (chapterData) {
            setChapter(chapterData);

            // 3. Fetch Members (only if coordinator/admin)
            if (['coordinator', 'admin', 'super_admin'].includes(profile.role)) {
                const { data: membersData } = await supabase
                    .from("profiles")
                    .select("id, full_name, lga, ward, role, is_volunteer, volunteer_role, created_at")
                    .eq("state", profile.state)
                    .order("created_at", { ascending: false })
                    .limit(50);

                setMembers(membersData || []);
            }
        }
        setLoading(false);
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { chapter, members, loading, refreshData: fetchData };
}
