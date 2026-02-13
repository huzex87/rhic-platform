"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";

export interface Announcement {
    id: string;
    chapter_id: string;
    author_id: string;
    title: string;
    content: string;
    priority: 'Normal' | 'High' | 'Urgent';
    created_at: string;
}

export function useFieldCommand(chapterId?: string) {
    const { user } = useAuth();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAnnouncements = useCallback(async () => {
        if (!chapterId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const supabase = createClient();

        const { data, error: fetchError } = await supabase
            .from("announcements")
            .select("*")
            .eq("chapter_id", chapterId)
            .order("created_at", { ascending: false });

        if (fetchError) {
            setError(fetchError.message);
        } else {
            setAnnouncements(data || []);
        }
        setLoading(false);
    }, [chapterId]);

    useEffect(() => {
        fetchAnnouncements();

        if (!chapterId) return;

        const supabase = createClient();
        const channel = supabase
            .channel(`announcements:${chapterId}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "announcements",
                    filter: `chapter_id=eq.${chapterId}`,
                },
                () => {
                    fetchAnnouncements();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [chapterId, fetchAnnouncements]);

    const postAnnouncement = async (title: string, content: string, priority: string = 'Normal') => {
        if (!user || !chapterId) return { error: new Error("Unauthorized or Chapter ID missing") };
        const supabase = createClient();

        const { data, error } = await supabase.rpc("post_announcement", {
            chapter_id_param: chapterId,
            title_param: title,
            content_param: content,
            priority_param: priority
        });

        return { data, error };
    };

    const promoteToVolunteer = async (memberId: string, role: string) => {
        if (!user) return { error: new Error("Unauthorized") };
        const supabase = createClient();

        const { error } = await supabase.rpc("promote_to_volunteer", {
            user_id_param: memberId,
            role_param: role
        });

        return { error };
    };

    return {
        announcements,
        loading,
        error,
        postAnnouncement,
        promoteToVolunteer,
        refreshAnnouncements: fetchAnnouncements
    };
}
