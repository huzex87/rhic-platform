"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";

export interface Challenge {
    id: string;
    title: string;
    description: string;
    category: string;
    prize_pool: string;
    days_left: number;
    teams_count: number;
    status: 'Active' | 'Closed' | 'Archived';
    created_at: string;
}

export interface Submission {
    id: string;
    challenge_id: string;
    user_id: string;
    team_name: string;
    solution_summary: string;
    solution_url: string;
    status: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Winner';
    created_at: string;
}

export function useInnovation() {
    const { user } = useAuth();
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [userSubmissions, setUserSubmissions] = useState<Record<string, Submission>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const supabase = createClient();

        // Fetch challenges
        const { data: challengesData, error: challengesError } = await supabase
            .from("innovation_challenges")
            .select("*")
            .eq("status", "Active")
            .order("days_left", { ascending: true });

        if (challengesError) {
            setError(challengesError.message);
            setLoading(false);
            return;
        }

        setChallenges(challengesData || []);

        // Fetch user submissions if logged in
        if (user) {
            const { data: submissionsData } = await supabase
                .from("challenge_submissions")
                .select("*")
                .eq("user_id", user.id);

            const submissionsMap = (submissionsData || []).reduce((acc: Record<string, Submission>, sub) => {
                acc[sub.challenge_id] = sub as Submission;
                return acc;
            }, {});
            setUserSubmissions(submissionsMap);
        }

        setLoading(false);
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const submitSolution = async (challengeId: string, submission: Partial<Submission>) => {
        if (!user) return { data: null, error: new Error("User not authenticated") };
        const supabase = createClient();

        const { data, error } = await supabase
            .from("challenge_submissions")
            .insert({
                ...submission,
                challenge_id: challengeId,
                user_id: user.id
            })
            .select()
            .single();

        if (!error) {
            setUserSubmissions(prev => ({ ...prev, [challengeId]: data }));
        }
        return { data, error };
    };

    return { challenges, userSubmissions, loading, error, submitSolution, refetch: fetchData };
}
