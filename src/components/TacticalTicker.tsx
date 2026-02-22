"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface Incident {
    id: string;
    content: string;
    type: string;
    urgency: string;
    chapter_name: string;
    verified_at: string;
}

export default function TacticalTicker() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchIncidents = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from('recent_verified_incidents')
                .select('*');
            if (data) setIncidents(data);
        };

        fetchIncidents();

        // Real-time subscription for new verified reports
        const supabase = createClient();
        const channel = supabase
            .channel('verified-incidents')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'field_reports', filter: 'status=eq.verified' },
                () => fetchIncidents()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        if (incidents.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % incidents.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [incidents]);

    if (incidents.length === 0) return null;

    const current = incidents[currentIndex];

    return (
        <div className="w-full bg-apc-red/5 border-y border-apc-red/20 overflow-hidden py-3">
            <div className="max-w-7xl mx-auto px-4 flex items-center gap-6">
                <div className="flex items-center gap-2 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-apc-red animate-pulse" />
                    <span className="text-[10px] font-black text-apc-red uppercase tracking-[0.3em]">Tactical Feed</span>
                </div>

                <div className="h-6 w-px bg-apc-red/20" />

                <div className="flex-1 relative h-6 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-4"
                        >
                            <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">{current.chapter_name} Sector:</span>
                            <span className="text-sm font-bold text-foreground line-clamp-1">{current.content}</span>
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase tracking-widest ${current.urgency === 'Urgent' ? 'bg-apc-red text-white' : 'bg-apc-red/10 text-apc-red'
                                }`}>
                                {current.urgency}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="hidden md:flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-apc-green">
                        <Zap className="w-3 h-3" />
                        LIVE INTEL
                    </div>
                </div>
            </div>
        </div>
    );
}
