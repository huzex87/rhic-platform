"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export interface NationalMetrics {
    total_supporters: number;
    total_volunteers: number;
    active_chapters: number;
    national_readiness_score: number;
}

export interface RegionalStrategy {
    zone: string;
    chapter_count: number;
    total_supporters: number;
    avg_momentum: number;
    urgent_incidents: number;
}

export function useNationalStrategy() {
    const [metrics, setMetrics] = useState<NationalMetrics | null>(null);
    const [regionalData, setRegionalData] = useState<RegionalStrategy[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const supabase = createClient();

        try {
            // 1 & 2. Fetch National Readiness and Regional Matrix concurrently
            const [readinessResult, regionalResult] = await Promise.all([
                supabase.rpc("calculate_national_readiness"),
                supabase.from("regional_strategy_matrix").select("*")
            ]);

            if (readinessResult.error) throw readinessResult.error;
            if (regionalResult.error) throw regionalResult.error;

            setMetrics(readinessResult.data[0]);
            setRegionalData(regionalResult.data || []);

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Subscription for real-time updates could go here if needed
        // but since these are views/aggregated functions, we might just poll
        // or rely on manual refresh for strategic high-level data.
    }, []);

    return { metrics, regionalData, loading, error, refresh: fetchData };
}
