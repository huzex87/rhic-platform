"use client";

import { motion } from "framer-motion";
import { Megaphone, ShieldAlert, Clock, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface Directive {
    id: string;
    title: string;
    content: string;
    priority: string;
    created_at: string;
}

export default function CommandDirectives() {
    const [directives, setDirectives] = useState<Directive[]>([]);

    useEffect(() => {
        const fetchDirectives = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from('command_directives')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })
                .limit(3);
            if (data) setDirectives(data);
        };

        fetchDirectives();

        // Real-time subscription
        const supabase = createClient();
        const channel = supabase
            .channel('national-directives')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'command_directives' },
                () => fetchDirectives()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    if (directives.length === 0) return (
        <div className="premium-card bg-foreground/[0.02] border-dashed border-foreground/10 flex flex-col items-center justify-center py-12 text-center">
            <Megaphone className="w-8 h-8 text-foreground/10 mb-4" />
            <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">No Active Command Directives</p>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-black text-foreground/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-apc-red" />
                    High Command Directives
                </h3>
            </div>

            <div className="space-y-3">
                {directives.map((directive) => (
                    <motion.div
                        key={directive.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-5 rounded-2xl border transition-all ${directive.priority === 'Urgent'
                                ? 'bg-apc-red/5 border-apc-red/20'
                                : 'bg-foreground/5 border-foreground/10 hover:border-apc-cyan/50'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${directive.priority === 'Urgent' ? 'bg-apc-red text-white' : 'bg-apc-cyan/10 text-apc-cyan'
                                }`}>
                                {directive.priority} ORDER
                            </span>
                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-foreground/30">
                                <Clock className="w-3 h-3" />
                                {new Date(directive.created_at).toLocaleDateString()}
                            </div>
                        </div>
                        <h4 className="text-sm font-black text-foreground mb-2 uppercase tracking-tight">{directive.title}</h4>
                        <p className="text-xs text-foreground/60 font-medium leading-relaxed italic">&quot;{directive.content}&quot;</p>

                        <div className="mt-4 flex justify-end">
                            <button className="text-[9px] font-black text-apc-cyan uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                                Acknowledge Receipt <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
