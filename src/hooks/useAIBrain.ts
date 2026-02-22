"use client";

import { useNationalStrategy } from "./useNationalStrategy";
import { useFieldReports } from "./useFieldReports";
import { useChapterData } from "./useChapterData";
import { useAuth } from "@/components/AuthProvider";
import { useCallback } from "react";

export function useAIBrain() {
    const { user } = useAuth();
    const { chapter } = useChapterData();
    const { metrics, regionalData } = useNationalStrategy();
    const { reports } = useFieldReports(chapter?.id);

    const getStrategicAdvice = useCallback((input: string) => {
        const text = input.toLowerCase();

        // 1. Context derivation
        const userState = user?.user_metadata?.state || "National";
        const zoneMetrics = regionalData.find(r => r.zone === chapter?.zone);
        const latestIncidents = reports.filter(r => r.urgency === 'Urgent' && r.status === 'pending');

        // 2. Intelligence Logic
        if (text.includes("status") || text.includes("readiness")) {
            return `Strategic status for ${userState}: Readiness score is currently ${metrics?.national_readiness_score || 'analyzing...'}. ${zoneMetrics ? `In your zone (${chapter?.zone}), we have ${zoneMetrics.total_supporters.toLocaleString()} supporters across ${zoneMetrics.chapter_count} chapters.` : ''}`;
        }

        if (text.includes("mission") || text.includes("task") || text.includes("do")) {
            if (latestIncidents.length > 0) {
                return `Alert: I've detected ${latestIncidents.length} urgent field reports in your chapter. Prioritizing 'Verification' missions for these incidents is recommended.`;
            }
            return `Based on current momentum, I recommend initiating a 'Digital Advocacy' mission to boost suppressed engagement in ${userState}.`;
        }

        if (text.includes("momentum") || text.includes("growth")) {
            const momentum = chapter?.momentum_score || 0;
            if (momentum < 50) {
                return `Intelligence indicates low momentum (${momentum}) in your local chapter. Re-initializing mobilization drives is critical for the Renewed Hope mandate.`;
            }
            return `Chapter performance is optimal (Score: ${momentum}). Strategic focus should now shift to stabilizing polling unit coverage.`;
        }

        // Default "Vibe" Responses but with context
        const generalResponses = [
            `The Renewed Hope mandate in ${userState} is progressing. We've mapped ${metrics?.total_supporters.toLocaleString() || 'significant'} supporters nationwide.`,
            `Intelligence stream active. Regional coordination in the ${chapter?.zone || 'target'} zone is 85% synchronized.`,
            `RHIC Command established. I'm monitoring live feeds for any incident reports in ${chapter?.name || 'your area'}.`
        ];

        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }, [user, chapter, metrics, regionalData, reports]);

    return { getStrategicAdvice };
}
