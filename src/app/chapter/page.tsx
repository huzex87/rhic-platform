"use client";

import {
    UserPlus,
    BarChart3,
    MapPin,
    FileText,
    AlertCircle,
    MoreVertical,
    Loader2,
    Lock
} from "lucide-react";
import { useChapterData } from "@/hooks/useChapterData";
import { useAuth } from "@/components/AuthProvider";

export default function CoordinatorPanel() {
    const { user } = useAuth();
    const { chapter, members, loading } = useChapterData();

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

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-8">
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
                {isCoordinator && (
                    <div className="flex gap-4">
                        <button className="glass px-6 py-3 rounded-xl font-bold text-forest flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Submit Monthly Report
                        </button>
                        <button className="forest-gradient text-ivory px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2">
                            <UserPlus className="w-4 h-4 text-leaf" />
                            Add LGA Rep
                        </button>
                    </div>
                )}
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Members", value: chapter.supporter_count.toLocaleString(), trend: "Live" },
                    { label: "LGA Coverage", value: "Active", trend: "100%" },
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
                            <h3 className="text-xl font-display font-bold text-forest">
                                {isCoordinator ? 'Chapter Representatives' : 'Chapter Overview'}
                            </h3>
                            <div className="text-xs font-bold text-forest/20 uppercase">
                                {isCoordinator ? `Showing ${members.length} members` : 'Restricted Admin View'}
                            </div>
                        </div>

                        {isCoordinator ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-forest/5">
                                            <th className="pb-4 text-[10px] font-black text-forest/30 uppercase tracking-[0.2em]">Name</th>
                                            <th className="pb-4 text-[10px] font-black text-forest/30 uppercase tracking-[0.2em]">LGA</th>
                                            <th className="pb-4 text-[10px] font-black text-forest/30 uppercase tracking-[0.2em]">Role</th>
                                            <th className="pb-4 text-[10px] font-black text-forest/30 uppercase tracking-[0.2em]">Joined</th>
                                            <th className="pb-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-forest/5">
                                        {members.map((member, i) => (
                                            <tr key={i} className="hover:bg-forest/5 transition-colors group">
                                                <td className="py-5 font-bold text-forest">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-[10px] font-black uppercase">
                                                            {member.full_name?.split(' ').map(n => n[0]).join('') || 'RH'}
                                                        </div>
                                                        <span className="text-sm font-bold text-forest/80">{member.full_name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-5 text-sm font-medium text-forest/60">{member.lga || 'N/A'}</td>
                                                <td className="py-5">
                                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${member.role === 'coordinator' ? 'bg-leaf/10 text-leaf' : 'bg-forest/5 text-forest/40'}`}>
                                                        {member.role}
                                                    </span>
                                                </td>
                                                <td className="py-5 text-[10px] font-bold text-forest/30 uppercase">
                                                    {new Date(member.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-5 text-right">
                                                    <button className="text-forest/20 hover:text-forest transition-colors">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
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

                {/* Sidebar: Notifications & Reports */}
                <div className="space-y-8">
                    <div className="premium-card">
                        <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-leaf" />
                            Recent Actions
                        </h3>
                        <div className="space-y-6">
                            {[
                                { activity: `New members joined in ${chapter.state}`, time: "Live" },
                                { activity: "Chapter momentum updated", time: "1h ago" },
                                { activity: "National bulletin posted", time: "4h ago" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-1 h-auto bg-leaf/30 rounded-full" />
                                    <div>
                                        <div className="text-sm font-bold text-forest/80 leading-tight">{item.activity}</div>
                                        <div className="text-[10px] font-bold text-forest/20 uppercase mt-1">{item.time}</div>
                                    </div>
                                </div>
                            ))}
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
                </div>
            </div>
        </div>
    );
}
