"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon_type: string;
    unlocked_at: string;
}

export function useAchievements() {
    const { user } = useAuth();
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        if (!user) return;

        const fetchAchievements = async () => {
            const { data, error } = await supabase
                .from('user_achievements')
                .select(`
          id,
          unlocked_at,
          achievements (
            name,
            description,
            icon_type
          )
        `)
                .eq('user_id', user.id);

            if (!error && data) {
                interface AchievementJoinResult {
                    id: string;
                    unlocked_at: string;
                    achievements: {
                        name: string;
                        description: string;
                        icon_type: string;
                    } | {
                        name: string;
                        description: string;
                        icon_type: string;
                    }[];
                }

                setAchievements((data as unknown as AchievementJoinResult[]).map((item) => {
                    const ach = Array.isArray(item.achievements) ? item.achievements[0] : item.achievements;
                    return {
                        id: item.id,
                        name: ach?.name || "Unknown Achievement",
                        description: ach?.description || "",
                        icon_type: ach?.icon_type || "default",
                        unlocked_at: item.unlocked_at,
                    };
                }));
            }
            setLoading(false);
        };

        fetchAchievements();

        // Setup real-time listener for new achievements
        const channel = supabase
            .channel('user-achievements')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'user_achievements',
                    filter: `user_id=eq.${user.id}`,
                },
                async (payload) => {
                    // Fetch full achievement details for the new record
                    const { data, error } = await supabase
                        .from('achievements')
                        .select('name, description, icon_type')
                        .eq('id', payload.new.achievement_id)
                        .single();

                    if (!error && data) {
                        const newAch: Achievement = {
                            id: payload.new.id,
                            name: data.name,
                            description: data.description,
                            icon_type: data.icon_type,
                            unlocked_at: payload.new.unlocked_at,
                        };
                        setAchievements((prev) => [newAch, ...prev]);

                        // Note: In a real app, you might trigger a "Congratulations" notification here.
                        // But since the database trigger will log an activity, our SITUATION ROOM already picks it up.
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, supabase]);

    return { achievements, loading };
}
