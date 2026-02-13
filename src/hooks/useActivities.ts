"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export interface Activity {
    id: string;
    user_id: string;
    type: string;
    title: string;
    metadata: Record<string, unknown>;
    created_at: string;
    profiles?: {
        full_name: string;
        state: string;
    };
}

export function useActivities(limit: number = 5) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchActivities = useCallback(async () => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from("activities")
            .select(`
                *,
                profiles:user_id (
                    full_name,
                    state
                )
            `)
            .order("created_at", { ascending: false })
            .limit(limit);

        if (!error && data) {
            setActivities(data as unknown as Activity[]);
        }
        setLoading(false);
    }, [limit]);

    useEffect(() => {
        fetchActivities();

        const supabase = createClient();
        const channel = supabase
            .channel("public:activities")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "activities" }, () => {
                fetchActivities();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchActivities]);

    return { activities, loading, refresh: fetchActivities };
}
