"use client";

import { motion } from "framer-motion";
import {
    Lightbulb,
    ArrowUp,
    MessageSquare,
    Globe,
    FileCheck,
    Target,
    Download,
    Rocket
} from "lucide-react";

const ideas = [
    {
        title: "Blockchain for Land Registry",
        author: "Zainab B.",
        votes: 1240,
        comments: 89,
        category: "Registry",
        excerpt: "Integrating blockchain technology into the national land registry system to eliminate fraud and improve transparency.",
        status: "Reviewing"
    },
    {
        title: "AI-Powered Agri-Advisor",
        author: "Emeka O.",
        votes: 850,
        comments: 45,
        category: "Agri-Tech",
        excerpt: "A localized AI assistant that helps rural farmers optimize crop cycles based on real-time weather and soil data.",
        status: "Shortlisted"
    },
    {
        title: "Solar-Powered Digital Hubs",
        author: "Ibrahim K.",
        votes: 720,
        comments: 32,
        category: "Energy",
        excerpt: "Setting up small-scale, solar-powered tech hubs in off-grid communities to provide internet access and skills training.",
        status: "Trending"
    }
];

export default function IdeasPipeline() {
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 text-navy/60 text-[10px] font-black uppercase tracking-widest border border-navy/5">
                        <Target className="w-3 h-3 text-gold" />
                        Ideas to Governance
                    </div>
                    <h1 className="text-5xl font-display font-black text-navy leading-tight">
                        Policy <span className="text-gold italic">Pipeline</span>
                    </h1>
                    <p className="text-navy/60 font-medium max-w-xl">
                        Submit, vote, and refine innovation ideas that can be transformed
                        into structured policy briefs for national consideration.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="gold-gradient text-navy px-8 py-4 rounded-xl font-black shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        SUBMIT IDEA
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Ideas List */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex gap-8 border-b border-navy/5 pb-4">
                        {['Trending', 'Most Voted', 'Recent', 'In Review'].map((tab, i) => (
                            <button key={tab} className={`text-sm font-bold tracking-tight transition-all ${i === 0 ? 'text-navy border-b-2 border-gold pb-4 -mb-[18px]' : 'text-navy/40 hover:text-navy'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-6">
                        {ideas.map((idea, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="premium-card group hover:border-gold/30"
                            >
                                <div className="flex gap-6">
                                    <div className="flex flex-col items-center gap-2">
                                        <button className="p-3 rounded-xl bg-navy/5 hover:bg-gold hover:text-navy transition-all">
                                            <ArrowUp className="w-5 h-5" />
                                        </button>
                                        <span className="text-sm font-black text-navy">{idea.votes}</span>
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-gold uppercase tracking-widest">{idea.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-navy/10" />
                                            <span className="text-[10px] font-bold text-navy/30 uppercase tracking-widest">By {idea.author}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-navy group-hover:text-gold transition-colors">{idea.title}</h3>
                                        <p className="text-sm text-navy/60 font-medium leading-relaxed">{idea.excerpt}</p>

                                        <div className="flex items-center justify-between pt-4">
                                            <div className="flex items-center gap-6 text-[10px] font-bold text-navy/40 uppercase tracking-widest">
                                                <div className="flex items-center gap-2">
                                                    <MessageSquare className="w-3 h-3" />
                                                    {idea.comments} Comments
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-3 h-3" />
                                                    Global Visibility
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${idea.status === 'Reviewing' ? 'bg-orange-50 text-orange-600' :
                                                idea.status === 'Shortlisted' ? 'bg-green-50 text-green-600' : 'bg-navy/5 text-navy/40'
                                                }`}>
                                                {idea.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar: Briefs & Stats */}
                <div className="space-y-8">
                    <div className="premium-card bg-ivory relative overflow-hidden group border-gold/20">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <FileCheck className="text-gold w-5 h-5" />
                                <span className="text-xs font-black uppercase tracking-widest text-navy">Recent Briefs</span>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: "SME Recovery Strategy", date: "Jan 2026" },
                                    { title: "Youth Mobility Framework", date: "Dec 2025" }
                                ].map((brief, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-navy/5 hover:bg-gold/5 hover:border-gold/50 transition-all cursor-pointer">
                                        <span className="text-sm font-bold text-navy">{brief.title}</span>
                                        <Download className="w-4 h-4 text-navy/30" />
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-4 rounded-xl border border-gold/30 text-gold text-xs font-black uppercase tracking-widest hover:bg-gold/5 transition-all">
                                VIEW ALL BRIEFS
                            </button>
                        </div>
                    </div>

                    <div className="premium-card text-center space-y-4">
                        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Rocket className="text-gold w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-navy">Impact Tracker</h3>
                        <p className="text-xs text-navy/50 font-medium">15 Ideas from this pipeline have been implemented in the national strategy.</p>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-navy/5 mt-4">
                            <div>
                                <div className="text-xl font-black text-navy">15</div>
                                <div className="text-[10px] font-bold text-navy/30 uppercase">Implemented</div>
                            </div>
                            <div>
                                <div className="text-xl font-black text-navy">84</div>
                                <div className="text-[10px] font-bold text-navy/30 uppercase">In Review</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
