"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldAlert, Clock, MapPin, User, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useFieldReports } from "@/hooks/useFieldReports";
import { useAuth } from "@/components/AuthProvider";
import PrestigeBadge, { UserTier } from "./PrestigeBadge";

interface IntelligenceFeedProps {
    chapterId?: string;
    isNational?: boolean;
}

export default function IntelligenceFeed({ chapterId }: IntelligenceFeedProps) {
    const { reports, loading, verifyReport } = useFieldReports(chapterId);
    const { user } = useAuth();
    const isCoordinator = user?.user_metadata?.role === 'coordinator' || user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'super_admin';

    if (loading && reports.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-12 h-12 border-4 border-apc-cyan/20 border-t-apc-cyan rounded-full animate-spin" />
                <p className="text-foreground/40 text-sm font-bold uppercase tracking-widest">Decrypting Intel Stream...</p>
            </div>
        );
    }

    if (reports.length === 0) {
        return (
            <div className="text-center py-12 p-8 border-2 border-dashed border-foreground/5 rounded-3xl">
                <Clock className="w-10 h-10 text-foreground/10 mx-auto mb-3" />
                <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">No intelligence reports transmitted yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {reports.map((report) => (
                    <motion.div
                        key={report.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`relative group bg-white rounded-2xl p-6 border transition-all hover:shadow-xl ${report.urgency === 'Urgent'
                            ? "border-apc-red/20 shadow-lg shadow-apc-red/5"
                            : "border-foreground/5 hover:border-apc-cyan/20"
                            }`}
                    >
                        {/* Urgency Overlay for Urgent reports */}
                        {report.urgency === 'Urgent' && report.status === 'pending' && (
                            <div className="absolute inset-0 rounded-2xl border-2 border-apc-red animate-pulse pointer-events-none" />
                        )}

                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                {/* Header Info */}
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${report.type === 'Incident' ? 'bg-apc-red/10 text-apc-red' :
                                        report.type === 'Result' ? 'bg-apc-cyan/10 text-apc-cyan' :
                                            'bg-foreground/10 text-foreground'
                                        }`}>
                                        {report.type}
                                    </span>
                                    {report.urgency !== 'Normal' && (
                                        <span className={`flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${report.urgency === 'Urgent' ? 'bg-apc-red text-white' : 'bg-orange-500 text-white'}`}>
                                            <ShieldAlert className="w-3 h-3" /> {report.urgency}
                                        </span>
                                    )}
                                    <span className="text-[10px] font-bold text-foreground/30 flex items-center gap-1 uppercase tracking-widest">
                                        <Clock className="w-3 h-3" /> {formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}
                                    </span>
                                </div>

                                {/* Content */}
                                <p className="text-foreground font-bold leading-relaxed">
                                    {report.content}
                                </p>

                                {/* Location & Source */}
                                <div className="flex items-center gap-6 pt-2 border-t border-foreground/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
                                            <User className="w-4 h-4 text-foreground/40" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-[10px] font-black text-foreground uppercase tracking-widest leading-none">
                                                    {report.profiles?.full_name || "Unknown Agent"}
                                                </p>
                                                <PrestigeBadge tier={report.profiles?.tier as UserTier || 'Supporter'} size="sm" />
                                            </div>
                                            <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest mt-0.5">
                                                {report.profiles?.role || "Field Volunteer"}
                                            </p>
                                        </div>
                                    </div>

                                    {report.polling_units && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-apc-cyan/5 flex items-center justify-center">
                                                <MapPin className="w-4 h-4 text-apc-cyan/40" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-foreground uppercase tracking-widest leading-none">
                                                    {report.polling_units.pu_name}
                                                </p>
                                                <p className="text-[9px] font-bold text-apc-cyan uppercase tracking-widest mt-0.5">
                                                    {report.polling_units.ward} • {report.polling_units.lga}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Status & Verification Actions */}
                            <div className="flex flex-col items-end gap-2">
                                {report.status === 'verified' ? (
                                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-apc-cyan/10 text-apc-cyan border border-apc-cyan/20 shadow-sm shadow-apc-cyan/5">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Verified Intel</span>
                                    </div>
                                ) : report.status === 'rejected' ? (
                                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-foreground/5 text-foreground/40">
                                        <XCircle className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Discarded</span>
                                    </div>
                                ) : (
                                    isCoordinator && (
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => verifyReport(report.id, 'verified')}
                                                className="flex items-center gap-2 px-4 py-2 bg-apc-cyan text-white rounded-xl shadow-lg hover:bg-apc-cyan-dark transition-all text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                                            >
                                                <CheckCircle className="w-4 h-4" /> Verify Report
                                            </button>
                                            <button
                                                onClick={() => verifyReport(report.id, 'rejected')}
                                                className="flex items-center gap-2 px-4 py-2 bg-foreground/5 text-foreground/40 rounded-xl hover:bg-foreground/10 transition-all text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                                            >
                                                <XCircle className="w-4 h-4" /> Discard
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
