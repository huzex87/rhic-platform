"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export interface Chapter {
    id: string;
    state: string;
    zone: string;
    name: string;
    supporter_count: number;
    status: string;
}

export interface DashboardStats {
    totalSupporters: number;
    totalChapters: number;
    activeChapters: number;
    zoneBreakdown: Record<string, { supporters: number; states: number; topState: string }>;
    topChapters: Chapter[];
    recentSignups: number;
}

export function useDashboardData() {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const supabase = createClient();

            // Fetch all chapters
            const { data: chaptersData } = await supabase
                .from("chapters")
                .select("*")
                .order("supporter_count", { ascending: false });

            if (chaptersData) {
                setChapters(chaptersData);

                // Compute stats
                const totalSupporters = chaptersData.reduce((sum, c) => sum + (c.supporter_count || 0), 0);
                const activeChapters = chaptersData.filter(c => c.status === "active").length;

                // Zone breakdown
                const zoneBreakdown: Record<string, { supporters: number; states: number; topState: string }> = {};
                chaptersData.forEach(c => {
                    if (!zoneBreakdown[c.zone]) {
                        zoneBreakdown[c.zone] = { supporters: 0, states: 0, topState: "" };
                    }
                    zoneBreakdown[c.zone].supporters += c.supporter_count || 0;
                    zoneBreakdown[c.zone].states += 1;
                    if (!zoneBreakdown[c.zone].topState ||
                        (c.supporter_count || 0) > (chaptersData.find(x => x.state === zoneBreakdown[c.zone].topState)?.supporter_count || 0)) {
                        zoneBreakdown[c.zone].topState = c.state;
                    }
                });

                setStats({
                    totalSupporters,
                    totalChapters: chaptersData.length,
                    activeChapters,
                    zoneBreakdown,
                    topChapters: chaptersData.slice(0, 5),
                    recentSignups: 0,
                });
            }

            setLoading(false);
        }

        fetchData();

        // Real-time subscription for live updates
        const supabase = createClient();
        const channel = supabase
            .channel("dashboard-updates")
            .on("postgres_changes", { event: "*", schema: "public", table: "chapters" }, () => {
                fetchData();
            })
            .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { chapters, stats, loading };
}
