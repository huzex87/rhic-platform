"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";

export interface Mission {
    id: string;
    title: string;
    description: string;
    category: string;
    points: number;
    difficulty: 'Easy' | 'Medium' | 'High';
    icon: string;
    status: 'active' | 'inactive';
}

export interface UserMission {
    mission_id: string;
    status: 'joined' | 'completed';
    completed_at: string | null;
}

export function useMissions() {
    const { user } = useAuth();
    const [missions, setMissions] = useState<Mission[]>([]);
    const [userMissions, setUserMissions] = useState<Record<string, UserMission>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const supabase = createClient();

        // 1. Fetch all active missions
        const { data: missionsData, error: missionsError } = await supabase
            .from("missions")
            .select("*")
            .eq("status", "active")
            .order("created_at", { ascending: false });

        if (missionsError) {
            setError(missionsError.message);
            setLoading(false);
            return;
        }

        setMissions(missionsData || []);

        // 2. Fetch current user's mission status if logged in
        if (user) {
            const { data: userMissionsData, error: userMissionsError } = await supabase
                .from("user_missions")
                .select("mission_id, status, completed_at")
                .eq("user_id", user.id);

            if (!userMissionsError && userMissionsData) {
                const statusMap: Record<string, UserMission> = {};
                (userMissionsData as unknown as UserMission[]).forEach(um => {
                    statusMap[um.mission_id] = um;
                });
                setUserMissions(statusMap);
            }
        }

        setLoading(false);
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const joinMission = async (missionId: string) => {
        if (!user) return;
        const supabase = createClient();
        const { error } = await supabase
            .from("user_missions")
            .insert({ user_id: user.id, mission_id: missionId, status: 'joined' });

        if (!error) {
            setUserMissions(prev => ({
                ...prev,
                [missionId]: { mission_id: missionId, status: 'joined', completed_at: null }
            }));
        }
        return { error };
    };

    const completeMission = async (missionId: string) => {
        if (!user) return;
        const supabase = createClient();

        // Call the RPC we defined in SQL
        const { error } = await supabase.rpc("complete_mission", {
            mission_id_param: missionId
        });

        if (!error) {
            setUserMissions(prev => ({
                ...prev,
                [missionId]: { ...prev[missionId], status: 'completed', completed_at: new Date().toISOString() }
            }));
            // Refresh to get potential point updates? 
            // Better to handle that in profile hook or just refetch missions.
        }
        return { error };
    };

    return { missions, userMissions, loading, error, joinMission, completeMission, refetch: fetchData };
}
