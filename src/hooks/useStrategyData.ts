"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export interface ZoneStat {
    name: string;
    count: number;
    trend: string;
    readiness: number;
}

export interface StrategyStats {
    national_momentum: number;
    total_reach: string;
    active_volunteers: string;
    sentiment_score: number;
    top_zones: ZoneStat[];
    pu_saturation: number;
    pu_coverage: number; // Percent of PUs with at least 1 volunteer
    total_pus: number;
}

export function useStrategyData() {
    const [stats, setStats] = useState<StrategyStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStrategyData() {
            const supabase = createClient();

            // 1. Fetch Chapter Data for Totals and Zone Breakdown
            const { data: chaptersData } = await supabase
                .from("chapters")
                .select("*");

            // 2. Fetch Volunteer Count from Profiles
            const { count: volunteerCount } = await supabase
                .from("profiles")
                .select("*", { count: 'exact', head: true })
                .or('role.eq.Volunteer,role.eq.Coordinator');

            // 3. Fetch Momentum
            const { data: momentumData } = await supabase
                .from("mobilization_momentum")
                .select("*")
                .limit(1)
                .single();

            // 4. Fetch Polling Unit Stats
            const { count: puCount } = await supabase
                .from("polling_units")
                .select("*", { count: 'exact', head: true });

            // Count PUs with at least one volunteer
            const { data: activePUs } = await supabase
                .from("profiles")
                .select("polling_unit_id")
                .not("polling_unit_id", "is", null);

            const uniqueActivePUs = new Set(activePUs?.map(p => p.polling_unit_id)).size;

            if (chaptersData) {
                const totalSupporters = chaptersData.reduce((sum, c) => sum + (c.supporter_count || 0), 0);

                // Aggregate zones
                const zones: Record<string, number> = {};
                chaptersData.forEach(c => {
                    zones[c.zone] = (zones[c.zone] || 0) + (c.supporter_count || 0);
                });

                const top_zones: ZoneStat[] = Object.entries(zones)
                    .map(([name, count]) => ({
                        name,
                        count,
                        trend: "+12%", // In a real system, compute this from historical aggregates
                        readiness: Math.min(100, Math.floor((count / 1000000) * 100))
                    }))
                    .sort((a, b) => b.count - a.count);

                setStats({
                    national_momentum: momentumData?.growth_rate || 85,
                    total_reach: totalSupporters > 1000000
                        ? `${(totalSupporters / 1000000).toFixed(1)}M`
                        : `${(totalSupporters / 1000).toFixed(0)}K`,
                    active_volunteers: volunteerCount
                        ? (volunteerCount > 1000 ? `${(volunteerCount / 1000).toFixed(1)}K` : volunteerCount.toString())
                        : "0",
                    sentiment_score: 78,
                    top_zones,
                    pu_saturation: puCount ? Math.floor((uniqueActivePUs / puCount) * 100) : 0,
                    pu_coverage: uniqueActivePUs,
                    total_pus: puCount || 0
                });
            }
            setLoading(false);
        }

        fetchStrategyData();

        // Real-time updates
        const supabase = createClient();
        const channel = supabase
            .channel('strategy-room-sync')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'chapters' }, fetchStrategyData)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, fetchStrategyData)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { stats, loading };
}
