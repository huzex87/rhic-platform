import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    Send,
    ShieldCheck,
    Clock,
    UserPlus,
    ChevronRight,
    CheckCircle2,
    XCircle,
    Eye,
    Zap
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useAuth } from './AuthProvider';
import { useFieldReports, FieldReport } from '@/hooks/useFieldReports';

export default function CommandConsole() {
    const { user } = useAuth();
    const { pendingReports, verifyReport } = useFieldReports();
    const [directive, setDirective] = useState({ content: '', priority: 'Normal' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleIssueDirective = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!directive.content.trim()) return;

        setLoading(true);
        const supabase = createClient();
        const { error } = await supabase
            .from('command_directives')
            .insert({
                content: directive.content,
                priority: directive.priority,
                issuer_id: user?.id,
                status: 'active'
            });

        if (!error) {
            setSuccess(true);
            setDirective({ content: '', priority: 'Normal' });
            setTimeout(() => setSuccess(false), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-10">
            {/* Directive Issuance Section */}
            <div className="premium-card bg-foreground text-ivory border-none shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Send className="w-32 h-32 rotate-12" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-apc-cyan rounded-xl flex items-center justify-center shadow-lg shadow-apc-cyan/20">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-black tracking-tight">Issue Command Directive</h3>
                            <p className="text-[10px] font-black text-apc-cyan uppercase tracking-widest">National Broadcast Channel</p>
                        </div>
                    </div>

                    <form onSubmit={handleIssueDirective} className="space-y-6">
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                            <textarea
                                value={directive.content}
                                onChange={(e) => setDirective({ ...directive, content: e.target.value })}
                                placeholder="Enter national directive or strategic objective..."
                                className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium placeholder:text-white/20 min-h-[120px] resize-none"
                            />

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                                <div className="flex gap-2">
                                    {['Normal', 'High', 'Urgent'].map((p) => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setDirective({ ...directive, priority: p })}
                                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${directive.priority === p
                                                ? 'bg-apc-cyan text-white shadow-lg'
                                                : 'bg-white/5 text-white/40 hover:bg-white/10'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    disabled={loading || !directive.content.trim()}
                                    className="flex items-center gap-3 px-8 py-3 bg-apc-red hover:bg-apc-red-dark disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-apc-red/20 transition-all active:scale-95"
                                >
                                    {loading ? 'Transmitting...' : success ? 'Broadcast Sent' : 'Issue Order'}
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Verification Queue Section */}
            <div className="premium-card">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-foreground/5">
                    <div>
                        <h3 className="text-xl font-display font-black text-foreground">Intelligence Verification Queue</h3>
                        <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">Active Field Reports Pending Oversight</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-foreground/5 rounded-2xl border border-foreground/10 text-[xs] font-black uppercase text-foreground/40">
                        <Clock className="w-3 h-3" /> {pendingReports.length} Pending
                    </div>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                        {pendingReports.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 bg-foreground/[0.02] rounded-3xl border border-dashed border-foreground/10"
                            >
                                <ShieldCheck className="w-12 h-12 text-apc-cyan/20 mb-4" />
                                <p className="text-sm font-bold text-foreground/30 uppercase tracking-widest">Clear Awareness: All Reports Verified</p>
                            </motion.div>
                        ) : (
                            pendingReports.map((report: FieldReport) => (
                                <motion.div
                                    key={report.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="p-6 rounded-3xl border border-foreground/5 bg-white hover:border-apc-cyan/30 transition-all shadow-sm group"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {report.media_url && (
                                            <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-foreground/5 relative flex-shrink-0">
                                                <Image
                                                    src={report.media_url}
                                                    alt="Intelligence evidence"
                                                    fill
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Eye className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${report.urgency === 'Urgent' ? 'bg-apc-red/10 text-apc-red' :
                                                        report.urgency === 'High' ? 'bg-apc-gold/10 text-apc-gold' :
                                                            'bg-apc-cyan/10 text-apc-cyan'
                                                        }`}>
                                                        {report.urgency}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest leading-none">
                                                        {report.type} • {new Date(report.created_at).toLocaleTimeString()}
                                                    </span>
                                                </div>
                                                <div className="text-[9px] font-black text-foreground/20 uppercase tracking-widest">
                                                    ID: {report.id.slice(0, 8)}
                                                </div>
                                            </div>

                                            <p className="text-sm font-medium text-foreground/80 leading-relaxed">
                                                {report.content}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center font-black text-[8px] text-foreground/40">
                                                        {report.user_id.slice(0, 2).toUpperCase()}
                                                    </div>
                                                    <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Source Authenticated</span>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => verifyReport(report.id, 'rejected')}
                                                        className="p-2 rounded-xl text-foreground/20 hover:text-apc-red hover:bg-apc-red/10 transition-all border border-transparent hover:border-apc-red/20"
                                                        title="Reject Evidence"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => verifyReport(report.id, 'verified')}
                                                        className="flex items-center gap-2 px-5 py-2 bg-apc-cyan/10 hover:bg-apc-cyan text-apc-cyan hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-apc-cyan/20"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" /> Verify Ground Truth
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Patriot Promotion Section (Mini-interface) */}
            <div className="premium-card bg-ivory/50">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-display font-black text-foreground">Elite Patriot Promotion</h3>
                        <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">Direct Commissioning of High-Impact Contributors</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center bg-foreground/5 p-8 rounded-[2rem] border border-foreground/10 border-dashed">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                        <UserPlus className="w-8 h-8 text-apc-gold" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="text-base font-black text-foreground">Command-Level Commissioning</h4>
                        <p className="text-xs text-foreground/50 font-medium">Bypass automated reputation thresholds to promote strategic unit commanders.</p>
                    </div>
                    <button className="px-8 py-3 bg-white text-foreground rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-xl transition-all border border-foreground/5 flex items-center gap-2">
                        Open Promotion Panel <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
