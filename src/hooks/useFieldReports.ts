"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";

export interface FieldReport {
    id: string;
    user_id: string;
    chapter_id: string;
    polling_unit_id: string | null;
    type: 'Incident' | 'Status' | 'Result' | 'Logistics';
    content: string;
    media_url: string | null;
    urgency: 'Normal' | 'High' | 'Urgent';
    status: 'pending' | 'verified' | 'rejected';
    verified_by: string | null;
    verified_at: string | null;
    created_at: string;
    metadata: Record<string, unknown>;
    profiles?: {
        full_name: string;
        role: string;
        tier?: string;
    };
    polling_units?: {
        pu_name: string;
        pu_code: string;
        ward: string;
        lga: string;
    };
}

export function useFieldReports(chapterId?: string) {
    const { user } = useAuth();
    const [reports, setReports] = useState<FieldReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReports = useCallback(async () => {
        setLoading(true);
        const supabase = createClient();

        let query = supabase
            .from("field_reports")
            .select(`
                *,
                profiles (full_name, role, tier),
                polling_units (pu_name, pu_code, ward, lga)
            `)
            .order("created_at", { ascending: false });

        if (chapterId) {
            query = query.eq("chapter_id", chapterId);
        } else {
            // If no chapterId, we only see verified reports unless we are admin
            // The RLS policy handles this, but we can be explicit if needed.
            query = query.eq("status", "verified");
        }

        const { data, error: fetchError } = await query.limit(50);

        if (fetchError) {
            setError(fetchError.message);
        } else {
            setReports(data || []);
        }
        setLoading(false);
    }, [chapterId]);

    useEffect(() => {
        fetchReports();

        const supabase = createClient();
        const channel = supabase
            .channel(`field_reports${chapterId ? `:${chapterId}` : ''}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "field_reports",
                    ...(chapterId ? { filter: `chapter_id=eq.${chapterId}` } : {}),
                },
                () => {
                    fetchReports();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [chapterId, fetchReports]);

    const submitReport = async (report: Partial<FieldReport>) => {
        if (!user) return { error: new Error("Unauthorized") };
        const supabase = createClient();

        const { data, error } = await supabase
            .from("field_reports")
            .insert({
                ...report,
                user_id: user.id,
                status: 'pending'
            })
            .select()
            .single();

        return { data, error };
    };

    const verifyReport = async (reportId: string, status: 'verified' | 'rejected') => {
        if (!user) return { error: new Error("Unauthorized") };
        const supabase = createClient();

        const { error } = await supabase.rpc("verify_field_report", {
            report_id_param: reportId,
            status_param: status
        });

        return { error };
    };

    return {
        reports,
        loading,
        error,
        submitReport,
        verifyReport,
        refreshReports: fetchReports
    };
}
