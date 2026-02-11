"use client";

import { motion } from "framer-motion";
import {
    Users,
    UserPlus,
    BarChart3,
    MapPin,
    FileText,
    Settings,
    AlertCircle,
    MoreVertical
} from "lucide-react";

export default function CoordinatorPanel() {
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-navy/40 uppercase tracking-[0.2em] mb-2">
                        <MapPin className="w-3 h-3 text-gold" />
                        Lagos State Chapter
                    </div>
                    <h1 className="text-4xl font-display font-black text-navy leading-tight">
                        Chapter <span className="text-gold italic">Command Panel</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <button className="glass px-6 py-3 rounded-xl font-bold text-navy flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Submit Monthly Report
                    </button>
                    <button className="navy-gradient text-ivory px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-gold" />
                        Add LGA Rep
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Members", value: "45,200", trend: "+12%" },
                    { label: "LGA Reps", value: "20/20", trend: "100%" },
                    { label: "Active Ambassadors", value: "450", trend: "+55" },
                    { label: "Momentum Score", value: "98/100", trend: "Elite" },
                ].map((stat, i) => (
                    <div key={i} className="premium-card">
                        <div className="text-xs font-bold text-navy/40 uppercase tracking-widest mb-2">{stat.label}</div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-black text-navy">{stat.value}</div>
                            <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Table: LGA Reps */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="premium-card">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-display font-bold text-navy">LGA Coordinators</h3>
                            <div className="text-xs font-bold text-navy/20 uppercase">Showing 20 representatives</div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-navy/5">
                                        <th className="pb-4 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">LGA Name</th>
                                        <th className="pb-4 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Coordinator</th>
                                        <th className="pb-4 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Recruitment</th>
                                        <th className="pb-4 text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Status</th>
                                        <th className="pb-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-navy/5">
                                    {[
                                        { lga: "Alimosho", rep: "Tunde Ednut", count: 12400, status: "Active" },
                                        { lga: "Ikeja", rep: "Babatunde Raji", count: 8900, status: "Active" },
                                        { lga: "Eti-Osa", rep: "Funke Akindele", count: 4500, status: "Inactive" },
                                        { lga: "Lagos Island", rep: "Musiliu Obanikoro", count: 3200, status: "Active" },
                                    ].map((item, i) => (
                                        <tr key={i} className="hover:bg-navy/5 transition-colors group">
                                            <td className="py-5 font-bold text-navy">{item.lga}</td>
                                            <td className="py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-[10px] font-black">
                                                        {item.rep.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="text-sm font-medium text-navy/80">{item.rep}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 font-black text-navy">{item.count.toLocaleString()}</td>
                                            <td className="py-5">
                                                <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="py-5 text-right">
                                                <button className="text-navy/20 hover:text-navy transition-colors">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Notifications & Reports */}
                <div className="space-y-8">
                    <div className="premium-card">
                        <h3 className="text-sm font-bold text-navy/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-gold" />
                            Recent Actions
                        </h3>
                        <div className="space-y-6">
                            {[
                                { activity: "New LGA Rep added for Ikorodu", time: "12m ago" },
                                { activity: "Monthly report approved by National", time: "1h ago" },
                                { activity: "Low activity alert: Badagry", time: "4h ago" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-1 h-auto bg-gold/30 rounded-full" />
                                    <div>
                                        <div className="text-sm font-bold text-navy/80 leading-tight">{item.activity}</div>
                                        <div className="text-[10px] font-bold text-navy/20 uppercase mt-1">{item.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card bg-navy relative overflow-hidden group border-none">
                        <div className="relative z-10 text-ivory">
                            <h3 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Chapter Health</h3>
                            <div className="text-4xl font-display font-black mb-1">Elite</div>
                            <p className="text-ivory/40 text-[10px] font-bold uppercase tracking-widest">Category A Chapter</p>
                            <div className="mt-8 space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-ivory/60">Target Progress</span>
                                    <span>88%</span>
                                </div>
                                <div className="w-full h-1.5 bg-ivory/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-gold transition-all duration-1000" style={{ width: '88%' }} />
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
