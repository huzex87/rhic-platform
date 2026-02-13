"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, AlertTriangle, FileCheck, Loader2 } from "lucide-react";
import { useFieldReports } from "@/hooks/useFieldReports";

interface FieldReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    chapterId: string;
    pollingUnitId?: string;
}

interface FieldReportData {
    type: 'Incident' | 'Status' | 'Result' | 'Logistics';
    content: string;
    urgency: 'Normal' | 'High' | 'Urgent';
}

export default function FieldReportModal({ isOpen, onClose, chapterId, pollingUnitId }: FieldReportModalProps) {
    const { submitReport } = useFieldReports(chapterId);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [reportData, setReportData] = useState<FieldReportData>({
        type: 'Status',
        content: '',
        urgency: 'Normal',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reportData.content.trim()) return;

        setLoading(true);
        const { error } = await submitReport({
            ...reportData,
            chapter_id: chapterId,
            polling_unit_id: pollingUnitId || null,
        });

        if (!error) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setReportData({ type: 'Status', content: '', urgency: 'Normal' });
                onClose();
            }, 2000);
        }
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-lg bg-ivory rounded-3xl shadow-2xl overflow-hidden border border-leaf/20"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 forest-gradient flex items-center justify-between border-b border-white/10">
                            <div>
                                <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">
                                    Submit Field Intel
                                </h3>
                                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
                                    Polling Unit Command
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 text-center space-y-4"
                                >
                                    <div className="w-20 h-20 mx-auto bg-leaf/10 rounded-full flex items-center justify-center">
                                        <FileCheck className="w-10 h-10 text-leaf" />
                                    </div>
                                    <h4 className="text-2xl font-display font-black text-forest">Report Transmitted</h4>
                                    <p className="text-forest/60 font-medium">Your intelligence has been sent to command center.</p>
                                </motion.div>
                            ) : (
                                <>
                                    {/* Report Type */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {(['Status', 'Incident', 'Result', 'Logistics'] as const).map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => setReportData(prev => ({ ...prev, type: t }))}
                                                className={`py-3 rounded-xl border-2 font-black text-xs uppercase tracking-widest transition-all ${reportData.type === t
                                                    ? "border-leaf bg-leaf/10 text-leaf"
                                                    : "border-forest/5 bg-forest/5 text-forest/40 hover:bg-forest/10"
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-forest/40 uppercase tracking-widest ml-1">
                                            Situation Report (Intel)
                                        </label>
                                        <textarea
                                            value={reportData.content}
                                            onChange={(e) => setReportData(prev => ({ ...prev, content: e.target.value }))}
                                            placeholder="Provide clear, concise details of the situation or results..."
                                            rows={5}
                                            className="w-full bg-forest/5 border border-forest/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-leaf/30 text-forest font-bold transition-all resize-none"
                                            required
                                        />
                                    </div>

                                    {/* Urgency */}
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-forest/40 uppercase tracking-widest ml-1">Urgency:</span>
                                        <div className="flex bg-forest/5 p-1 rounded-xl gap-1">
                                            {(['Normal', 'High', 'Urgent'] as const).map((u) => (
                                                <button
                                                    key={u}
                                                    type="button"
                                                    onClick={() => setReportData(prev => ({ ...prev, urgency: u }))}
                                                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${reportData.urgency === u
                                                        ? (u === 'Urgent' ? "bg-accent-red text-white shadow-lg" : "bg-forest/20 text-forest")
                                                        : "text-forest/30 hover:text-forest/50"
                                                        }`}
                                                >
                                                    {u}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Warning for High Urgency */}
                                    {reportData.urgency === 'Urgent' && (
                                        <div className="p-4 rounded-xl bg-accent-red/10 border border-accent-red/20 flex gap-3 text-accent-red">
                                            <AlertTriangle className="w-5 h-5 shrink-0" />
                                            <p className="text-xs font-bold leading-relaxed">
                                                MARKING AS URGENT: This will trigger a critical alert in the Situation Room. Only use for mission-critical incidents.
                                            </p>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading || !reportData.content.trim()}
                                        className="forest-gradient text-ivory w-full py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 border border-accent-red/20 disabled:opacity-40"
                                    >
                                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                            <>
                                                TRANSMIT INTELLIGENCE
                                                <Send className="w-6 h-6" />
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
