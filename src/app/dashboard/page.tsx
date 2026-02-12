"use client";

import { motion } from "framer-motion";
import {
    Users,
    TrendingUp,
    Activity,
    ChevronRight,
    Plus,
    Rocket,
    MessageSquare,
    Shield
} from "lucide-react";

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-display font-black text-forest leading-tight">
                        Mobilization <span className="text-leaf italic">Situation Room</span>
                    </h1>
                    <p className="text-forest/60 font-medium">Real-time national momentum and chapter performance metrics.</p>
                </div>
                <div className="flex gap-4">
                    <button className="glass px-6 py-3 rounded-xl font-bold text-forest hover:bg-white transition-all flex items-center gap-2">
                        Export Report
                    </button>
                    <button className="forest-gradient text-ivory px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                        <Plus className="w-5 h-5 text-leaf" />
                        New Mobilization
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Nigeria Map & State Stats */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="premium-card min-h-[500px] flex flex-col justify-between overflow-hidden relative">
                        <div className="flex justify-between items-start z-10">
                            <div>
                                <h2 className="text-xl font-display font-bold text-forest">National Reach</h2>
                                <div className="flex items-center gap-2 text-xs font-bold text-forest/40 uppercase tracking-widest mt-1">
                                    <Activity className="w-3 h-3 text-leaf" />
                                    Live Activity Mapping
                                </div>
                            </div>
                            <div className="forest-glass px-3 py-1 rounded-lg text-xs font-black text-forest">
                                36 STATES + FCT ACTIVE
                            </div>
                        </div>

                        {/* Stylized Nigeria Map SVG representation */}
                        <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
                            <svg viewBox="0 0 800 600" className="w-full h-full max-h-[400px] text-forest/5 fill-current">
                                <path d="M150,150 L200,100 L300,80 L450,100 L600,150 L700,300 L650,450 L500,550 L300,580 L150,500 L100,350 Z" className="animate-pulse" />
                                {/* State markers */}
                                <circle cx="200" cy="200" r="8" className="fill-leaf" />
                                <circle cx="400" cy="300" r="12" className="fill-leaf/60" />
                                <circle cx="550" cy="400" r="10" className="fill-leaf" />
                                <circle cx="300" cy="450" r="6" className="fill-leaf/40" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-forest/10 font-display text-4xl md:text-7xl font-black tracking-widest opacity-20">MOBILIZE</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 z-10 p-2">
                            {[
                                { state: "Lagos", trend: "+12%", color: "text-leaf" },
                                { state: "Kano", trend: "+8%", color: "text-leaf" },
                                { state: "Rivers", trend: "+15%", color: "text-leaf" },
                            ].map((s) => (
                                <div key={s.state} className="glass p-3 rounded-xl flex sm:block items-center justify-between">
                                    <div className="text-[10px] font-bold text-forest/40 uppercase">{s.state}</div>
                                    <div className={`text-base md:text-lg font-black ${s.color}`}>{s.trend}</div>
                                </div>
                            ))}
                        </div>

                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-radial-gradient from-leaf/5 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="premium-card">
                            <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-leaf" />
                                Growth Velocity
                            </h3>
                            <div className="h-40 flex items-end gap-2 px-2">
                                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        className="flex-1 bg-forest/10 rounded-t-md hover:bg-leaf/40 transition-colors relative group"
                                    >
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-forest text-ivory text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {h}k new members
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] font-bold text-forest/20 uppercase">
                                <span>Mon</span>
                                <span>Sun</span>
                            </div>
                        </div>

                        <div className="premium-card">
                            <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest mb-6">Recent Deployments</h3>
                            <div className="space-y-4">
                                {[
                                    { title: "Campus Meetup", state: "Oyo", date: "2h ago" },
                                    { title: "Digital Mission #4", state: "Abuja", date: "5h ago" },
                                    { title: "Chapter Lunch", state: "Imo", date: "1d ago" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-forest/5 hover:bg-forest/10 transition-colors group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-leaf" />
                                            <div>
                                                <div className="text-sm font-bold text-forest">{item.title}</div>
                                                <div className="text-[10px] text-forest/40 font-bold uppercase">{item.state}</div>
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-bold text-forest/30 group-hover:text-forest transition-colors">{item.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Leaderboard & Missions */}
                <div className="space-y-8">
                    <div className="premium-card forest-gradient text-ivory relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xs font-bold text-leaf uppercase tracking-[0.2em] mb-4">Active Campaign</h3>
                            <div className="text-2xl font-display font-black mb-2">Build for Renewed Hope</div>
                            <p className="text-ivory/60 text-sm font-medium mb-6">3,450 Innovators building solutions right now.</p>
                            <button className="leaf-gradient text-ivory w-full py-4 rounded-xl font-black shadow-xl hover:scale-[1.02] transition-all">
                                JOIN CHALLENGE
                            </button>
                        </div>
                        <Rocket className="absolute -bottom-8 -right-8 w-40 h-40 text-ivory/5 rotate-12" />
                    </div>

                    <div className="premium-card">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest">Top Performers</h3>
                            <ChevronRight className="w-4 h-4 text-forest/20" />
                        </div>
                        <div className="space-y-6">
                            {[
                                { name: "Lagos Innovation Hub", rank: 1, points: "45.2k", trend: "up" },
                                { name: "Abuja Tech Chapter", rank: 2, points: "38.9k", trend: "up" },
                                { name: "Kano Hackers", rank: 3, points: "31.5k", trend: "down" },
                            ].map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center font-black text-forest text-sm">
                                            {item.rank}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-forest">{item.name}</div>
                                            <div className="text-[10px] font-bold text-forest/30 uppercase tracking-widest">{item.points} Points</div>
                                        </div>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${item.trend === 'up' ? 'bg-leaf' : 'bg-accent-red'} shadow-sm`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card bg-ivory/50">
                        <h3 className="text-sm font-bold text-forest/40 uppercase tracking-widest mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "New Mission", icon: Rocket },
                                { label: "Add Member", icon: Users },
                                { label: "Media Pack", icon: MessageSquare },
                                { label: "Support", icon: Shield },
                            ].map((action) => (
                                <button key={action.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-forest/5 hover:border-leaf/50 hover:shadow-lg transition-all text-forest group">
                                    <action.icon className="w-5 h-5 group-hover:text-leaf transition-colors" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
