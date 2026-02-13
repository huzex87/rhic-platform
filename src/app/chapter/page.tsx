"use client";

import {
    BarChart3,
    MapPin,
    Loader2,
    Lock,
    Megaphone,
    ShieldCheck,
    Plus,
    X,
    Rocket,
    TrendingUp
} from "lucide-react";
import { useChapterData, Chapter, ChapterMember } from "@/hooks/useChapterData";
import { useAuth } from "@/components/AuthProvider";
import { useFieldCommand } from "@/hooks/useFieldCommand";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FieldReportModal from "@/components/FieldReportModal";
import IntelligenceFeed from "@/components/IntelligenceFeed";

export default function CoordinatorPanel() {
    const { user } = useAuth();
    const { chapter, members, loading, refreshData } = useChapterData() as {
        chapter: Chapter | null;
        members: ChapterMember[];
        loading: boolean;
        refreshData: () => Promise<void>;
    };
    const { announcements, postAnnouncement, promoteToVolunteer } = useFieldCommand(chapter?.id);

    const [showBroadcastModal, setShowBroadcastModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [broadcastForm, setBroadcastForm] = useState({ title: '', content: '', priority: 'Normal' as 'Normal' | 'High' | 'Urgent' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedLgaFilter, setSelectedLgaFilter] = useState<string | null>(null);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-leaf" />
            </div>
        );
    }

    if (!chapter) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-forest/5 rounded-full flex items-center justify-center">
                    <MapPin className="text-forest/20 w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-forest uppercase tracking-widest">Chapter Not Found</h2>
                <p className="text-forest/40 text-sm font-medium">Please set your location in settings to view your chapter.</p>
            </div>
        );
    }

    const isCoordinator = ['coordinator', 'admin', 'super_admin'].includes(user?.user_metadata?.role || 'supporter');

    const handleBroadcast = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { error } = await postAnnouncement(broadcastForm.title, broadcastForm.content, broadcastForm.priority);
        if (!error) {
            setShowBroadcastModal(false);
            setBroadcastForm({ title: '', content: '', priority: 'Normal' });
        }
        setIsSubmitting(false);
    };

    const handlePromote = async (memberId: string, name: string) => {
        if (!confirm(`Promote ${name} to Field Volunteer?`)) return;
        const { error } = await promoteToVolunteer(memberId, 'Field Mobilizer');
        if (!error) {
            alert(`${name} has been promoted and notified.`);
            if (refreshData) refreshData();
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-forest/40 uppercase tracking-[0.2em] mb-2">
                        <MapPin className="w-3 h-3 text-leaf" />
                        {chapter.state} State Chapter
                    </div>
                    <h1 className="text-4xl font-display font-black text-forest leading-tight">
                        Chapter <span className="text-leaf italic">Command Panel</span>
                    </h1>
                </div>
                {(isCoordinator || user?.user_metadata?.is_volunteer) && (
                    <div className="flex gap-4">
                        {user?.user_metadata?.is_volunteer && (
                            <button
                                onClick={() => setShowReportModal(true)}
                                className="glass px-6 py-3 rounded-xl font-bold text-leaf flex items-center gap-2 border border-leaf/20 hover:bg-leaf/5 transition-colors shadow-lg"
                            >
                                <Plus className="w-4 h-4" />
                                Submit Field Intel
                            </button>
                        )}
                        {isCoordinator && (
                            <>
                                <button
                                    onClick={() => setShowBroadcastModal(true)}
                                    className="glass px-6 py-3 rounded-xl font-bold text-forest flex items-center gap-2 border border-leaf/20 hover:bg-leaf/5 transition-colors"
                                >
                                    <Megaphone className="w-4 h-4 text-leaf" />
                                    Command Broadcast
                                </button>
                                <button className="forest-gradient text-ivory px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 group">
                                    <Plus className="w-4 h-4 text-leaf group-hover:rotate-90 transition-transform" />
                                    Add LGA Rep
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Members", value: chapter.supporter_count.toLocaleString(), trend: "Live" },
                    { label: "Volunteers", value: members.filter(m => m.is_volunteer).length.toString(), trend: "Active" },
                    { label: "Growth Rate", value: "+12%", trend: "Elite" },
                    { label: "Momentum", value: "98/100", trend: "Peak" },
                ].map((stat, i) => (
                    <div key={i} className="premium-card">
                        <div className="text-xs font-bold text-forest/40 uppercase tracking-widest mb-2">{stat.label}</div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-black text-forest">{stat.value}</div>
                            <div className="text-[10px] font-bold text-leaf bg-leaf/10 px-2 py-1 rounded-lg">{stat.trend}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Table: Chapter Members */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="premium-card">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <h3 className="text-xl font-display font-bold text-forest">
                                    {isCoordinator ? 'Chapter Registry' : 'Chapter Overview'}
                                </h3>
                                {isCoordinator && (
                                    <div className="flex items-center gap-2">
                                        <select
                                            className="text-[10px] font-black text-forest/60 bg-forest/5 border border-forest/10 rounded-lg px-3 py-1.5 outline-none focus:border-leaf/30 transition-all uppercase"
                                            value={selectedLgaFilter || ''}
                                            onChange={(e) => setSelectedLgaFilter(e.target.value || null)}
                                        >
                                            <option value="">All LGAs</option>
                                            {Array.from(new Set(members.map(m => m.lga).filter(Boolean))).sort().map(lga => (
                                                <option key={lga} value={lga}>{lga}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                            <div className="text-xs font-bold text-forest/20 uppercase">
                                {isCoordinator ? `Showing ${members.filter(m => !selectedLgaFilter || m.lga === selectedLgaFilter).length} members` : 'Restricted Admin View'}
                            </div>
                        </div>

                        {isCoordinator ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-forest/5">
                                            <th className="pb-4 text-[10px] font-black text-forest/30 uppercase tracking-[0.2em]">Name</th>
                                            <th className="pb-4 text-[10px] font-black text-forest/30 uppercase tracking-[0.2em]">LGA</th>
                                            <th className="pb-4 text-[10px] font-black text-forest/30 uppercase tracking-[0.2em]">Status</th>
                                            <th className="pb-4 text-[10px] font-black text-forest/30 uppercase tracking-[0.2em]">Command</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-forest/5">
                                        {members
                                            .filter(m => !selectedLgaFilter || m.lga === selectedLgaFilter)
                                            .map((member) => (
                                                <tr key={member.id} className="hover:bg-forest/5 transition-colors group">
                                                    <td className="py-5 font-bold text-forest">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full forest-gradient flex items-center justify-center text-[10px] font-black uppercase text-ivory">
                                                                {member.full_name?.split(' ').map((n) => n[0]).join('') || 'RH'}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-forest/80">{member.full_name}</span>
                                                                {member.is_volunteer && (
                                                                    <span className="text-[8px] font-black text-leaf uppercase tracking-widest flex items-center gap-1">
                                                                        <ShieldCheck className="w-2 h-2" /> Verified Volunteer
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-sm font-medium text-forest/60">{member.lga || 'N/A'}</td>
                                                    <td className="py-5">
                                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${member.role === 'coordinator' ? 'bg-leaf/10 text-leaf' : 'bg-forest/5 text-forest/40'}`}>
                                                            {member.role}
                                                        </span>
                                                    </td>
                                                    <td className="py-5 text-right">
                                                        {!member.is_volunteer && member.role !== 'coordinator' && (
                                                            <button
                                                                onClick={() => handlePromote(member.id, member.full_name)}
                                                                className="text-[10px] font-black text-leaf hover:bg-leaf/10 px-3 py-1.5 rounded-lg border border-leaf/20 transition-all uppercase"
                                                            >
                                                                Promote
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                                <Lock className="w-12 h-12 text-forest/10" />
                                <div className="space-y-2">
                                    <h4 className="text-lg font-bold text-forest">Coordinator Access Only</h4>
                                    <p className="text-sm text-forest/40 max-w-xs mx-auto">Detailed chapter membership lists are only available to verified state and LGA coordinators.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar: Announcements & Health */}
                <div className="space-y-8">
                    <div className="premium-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest flex items-center gap-2">
                                <Megaphone className="w-4 h-4 text-leaf" />
                                Chapter Broadcasts
                            </h3>
                        </div>
                        <div className="space-y-6">
                            {announcements.length > 0 ? announcements.map((ann) => (
                                <div key={ann.id} className="p-4 rounded-xl bg-forest/5 border border-forest/5 hover:border-leaf/20 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded ${ann.priority === 'High' ? 'bg-accent-red/10 text-accent-red' :
                                            ann.priority === 'Urgent' ? 'bg-accent-red text-ivory' : 'bg-leaf/10 text-leaf'
                                            }`}>
                                            {ann.priority}
                                        </span>
                                        <span className="text-[10px] font-bold text-forest/20">{new Date(ann.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className="text-sm font-black text-forest mb-1">{ann.title}</h4>
                                    <p className="text-xs text-forest/60 leading-relaxed font-medium line-clamp-2">{ann.content}</p>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-forest/20 text-[10px] font-bold uppercase italic">
                                    No announcements posted
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="premium-card bg-forest relative overflow-hidden group border-none">
                        <div className="relative z-10 text-ivory">
                            <h3 className="text-xs font-bold text-leaf uppercase tracking-widest mb-4">Chapter Health</h3>
                            <div className="text-4xl font-display font-black mb-1">Elite</div>
                            <p className="text-ivory/40 text-[10px] font-bold uppercase tracking-widest">Category A Chapter</p>
                            <div className="mt-8 space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-ivory/60">Target Progress</span>
                                    <span>88%</span>
                                </div>
                                <div className="w-full h-1.5 bg-ivory/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-leaf transition-all duration-1000" style={{ width: '88%' }} />
                                </div>
                            </div>
                        </div>
                        <BarChart3 className="absolute -bottom-6 -right-6 w-32 h-32 text-ivory/5 group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-forest uppercase tracking-widest flex items-center gap-2 ml-2">
                            <ShieldCheck className="w-4 h-4 text-leaf" />
                            Live Intel Stream
                        </h3>
                        <IntelligenceFeed chapterId={chapter.id} />
                    </div>
                </div>
            </div>

            {/* Impact Heatmap Section */}
            <div className="premium-card">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-display font-black text-forest">Chapter <span className="text-leaf italic">Impact Heatmap</span></h3>
                        <p className="text-xs text-forest/40 font-bold uppercase tracking-widest mt-1">Mobilization Density by LGA</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(
                        members.reduce((acc: Record<string, number>, m: ChapterMember) => {
                            const lga = m.lga || 'Unknown';
                            acc[lga] = (acc[lga] || 0) + 1;
                            return acc;
                        }, {} as Record<string, number>)
                    ).sort((a, b) => b[1] - a[1]).map(([lga, count], idx) => {
                        const intensity = Math.min((count / Math.max(members.length / 5, 1)) * 100, 100);
                        return (
                            <motion.div
                                key={lga}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-5 rounded-2xl bg-forest/[0.02] border border-forest/5 hover:border-leaf/20 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <div className="text-sm font-black text-forest group-hover:text-leaf transition-colors">{lga}</div>
                                        <div className="text-[10px] font-bold text-forest/30 uppercase tracking-widest">{count} Supporters</div>
                                    </div>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${intensity > 70 ? 'bg-leaf text-ivory' : 'bg-forest/5 text-forest/40'
                                        }`}>
                                        {Math.round(intensity)}%
                                    </div>
                                </div>
                                <div className="w-full h-1.5 bg-forest/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${intensity}%` }}
                                        className={`h-full rounded-full transition-all duration-1000 ${intensity > 70 ? 'bg-leaf' : 'bg-forest/20'}`}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Ward-level Coordination Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="premium-card">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-display font-black text-forest">Ward <span className="text-leaf italic">Operations</span></h3>
                            <p className="text-xs text-forest/40 font-bold uppercase tracking-widest mt-1">Granular Mobilization Analysis</p>
                        </div>
                        <ShieldCheck className="w-6 h-6 text-leaf/40" />
                    </div>

                    <div className="space-y-4">
                        {Object.entries(
                            members.reduce((acc: Record<string, { supporters: number; volunteers: number }>, m: ChapterMember) => {
                                const ward = m.ward || 'General';
                                if (!acc[ward]) acc[ward] = { supporters: 0, volunteers: 0 };
                                acc[ward].supporters++;
                                if (m.is_volunteer) acc[ward].volunteers++;
                                return acc;
                            }, {} as Record<string, { supporters: number; volunteers: number }>)
                        ).sort((a: [string, { supporters: number; volunteers: number }], b: [string, { supporters: number; volunteers: number }]) => b[1].supporters - a[1].supporters).slice(0, 6).map(([ward, stats], idx) => (
                            <div key={ward} className="flex items-center justify-between p-4 rounded-xl bg-forest/[0.03] border border-forest/5 group hover:border-leaf/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center font-black text-forest text-xs">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-forest group-hover:text-leaf transition-colors uppercase">{ward}</div>
                                        <div className="text-[10px] font-bold text-forest/30 uppercase tracking-widest">{stats.supporters} Members • {stats.volunteers} Volunteers</div>
                                    </div>
                                </div>
                                <div className="text-[10px] font-black text-leaf bg-leaf/10 px-2 py-1 rounded">
                                    {Math.round((stats.volunteers / Math.max(stats.supporters, 1)) * 100)}% Readiness
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="premium-card border-accent-red/10 bg-accent-red/[0.02]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-display font-black text-forest">Polling Unit <span className="text-accent-red italic">Readiness</span></h3>
                            <p className="text-xs text-forest/40 font-bold uppercase tracking-widest mt-1">Election Day Strategic Hub</p>
                        </div>
                        <Rocket className="w-6 h-6 text-accent-red/30" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white border border-accent-red/10 shadow-sm">
                            <div className="text-[10px] font-black text-forest/30 uppercase tracking-widest mb-1">Total Wards</div>
                            <div className="text-3xl font-display font-black text-forest">
                                {new Set(members.map(m => m.ward).filter(Boolean)).size}
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-accent-red/10 shadow-sm">
                            <div className="text-[10px] font-black text-forest/30 uppercase tracking-widest mb-1">Avg. Volunteers/Ward</div>
                            <div className="text-3xl font-display font-black text-forest text-leaf">
                                {(members.filter(m => m.is_volunteer).length / Math.max(new Set(members.map(m => m.ward).filter(Boolean)).size, 1)).toFixed(1)}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-6 rounded-2xl bg-forest text-ivory relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-xs font-bold text-leaf uppercase tracking-widest mb-2">Strategy Room</h4>
                            <p className="text-sm font-medium text-ivory/60 leading-relaxed mb-6">
                                Optimize polling unit coverage by assigning volunteers to under-mobilized wards.
                            </p>
                            <button className="w-full py-3 rounded-xl bg-ivory text-forest font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-scale">
                                Open Tactical Map
                            </button>
                        </div>
                        <TrendingUp className="absolute -bottom-4 -right-4 w-24 h-24 text-ivory/5" />
                    </div>
                </div>
            </div>

            {/* Broadcast Modal */}
            <AnimatePresence>
                {showBroadcastModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-ivory w-full max-w-lg rounded-3xl p-8 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setShowBroadcastModal(false)}
                                className="absolute top-6 right-6 p-2 hover:bg-forest/5 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-forest/40" />
                            </button>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-display font-black text-forest">Issue <span className="text-leaf italic">Command Broadcast</span></h2>
                                    <p className="text-sm text-forest/40 font-bold uppercase tracking-widest mt-1">State-level Strategic Communication</p>
                                </div>

                                <form onSubmit={handleBroadcast} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-forest/30 uppercase tracking-widest ml-1">Subject Title</label>
                                        <input
                                            required
                                            value={broadcastForm.title}
                                            onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                                            className="w-full bg-forest/5 border border-forest/10 rounded-2xl p-4 text-forest font-bold focus:outline-none focus:border-leaf/50 transition-colors"
                                            placeholder="e.g. LGA Mobilization Order"
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        {(['Normal', 'High', 'Urgent'] as const).map((p) => (
                                            <button
                                                key={p}
                                                type="button"
                                                onClick={() => setBroadcastForm({ ...broadcastForm, priority: p })}
                                                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${broadcastForm.priority === p
                                                    ? 'bg-leaf text-ivory border-leaf shadow-lg'
                                                    : 'bg-white text-forest/40 border-forest/10 hover:border-leaf/30'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-forest/30 uppercase tracking-widest ml-1">Message Content</label>
                                        <textarea
                                            required
                                            value={broadcastForm.content}
                                            onChange={(e) => setBroadcastForm({ ...broadcastForm, content: e.target.value })}
                                            rows={4}
                                            className="w-full bg-forest/5 border border-forest/10 rounded-2xl p-4 text-forest font-medium focus:outline-none focus:border-leaf/50 transition-colors"
                                            placeholder="Enter state-wide mobilization directives..."
                                        />
                                    </div>

                                    <button
                                        disabled={isSubmitting}
                                        className="w-full forest-gradient text-ivory py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Megaphone className="w-5 h-5 text-leaf" />
                                                Authorize Broadcast
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <FieldReportModal
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
                chapterId={chapter.id}
                pollingUnitId={user?.user_metadata?.polling_unit_id}
            />
        </div>
    );
}
