"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Lightbulb,
    ArrowUp,
    MessageSquare,
    Globe,
    FileCheck,
    Target,
    Download,
    Rocket,
    Loader2,
    X,
    Plus
} from "lucide-react";
import { useState } from "react";
import { useProposals } from "@/hooks/useProposals";
import { useAuth } from "@/components/AuthProvider";

type TabType = 'Trending' | 'Most Voted' | 'Recent' | 'In Review';

export default function IdeasPipeline() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>('Trending');
    const { proposals, loading, toggleVote, submitProposal } = useProposals(activeTab);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    // Submission state
    const [newTitle, setNewTitle] = useState("");
    const [newCategory, setNewCategory] = useState("Technology");
    const [newExcerpt, setNewExcerpt] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsSubmitting(true);
        const result = await submitProposal({
            title: newTitle,
            category: newCategory,
            excerpt: newExcerpt,
            status: 'Trending'
        });
        setIsSubmitting(false);
        if (result && !result.error) {
            setIsSubmitModalOpen(false);
            setNewTitle("");
            setNewExcerpt("");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 text-forest/60 text-[10px] font-black uppercase tracking-widest border border-forest/5">
                        <Target className="w-3 h-3 text-leaf" />
                        Ideas to Governance
                    </div>
                    <h1 className="text-5xl font-display font-black text-forest leading-tight">
                        Policy <span className="text-leaf italic">Pipeline</span>
                    </h1>
                    <p className="text-forest/60 font-medium max-w-xl">
                        Submit, vote, and refine innovation ideas that can be transformed
                        into structured policy briefs for national consideration.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsSubmitModalOpen(true)}
                        className="leaf-gradient text-ivory px-8 py-4 rounded-xl font-black shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <Lightbulb className="w-5 h-5" />
                        SUBMIT IDEA
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Ideas List */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex gap-8 border-b border-forest/5 pb-4">
                        {(['Trending', 'Most Voted', 'Recent', 'In Review'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-sm font-bold tracking-tight transition-all relative ${activeTab === tab ? 'text-forest' : 'text-forest/40 hover:text-forest'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="activeTab" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-leaf" />
                                )}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="py-12 flex justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-leaf" />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {proposals.map((idea, i) => (
                                <motion.div
                                    key={idea.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="premium-card group hover:border-leaf/30"
                                >
                                    <div className="flex gap-6">
                                        <div className="flex flex-col items-center gap-2">
                                            <button
                                                onClick={() => toggleVote(idea.id)}
                                                className={`p-3 rounded-xl transition-all ${idea.user_has_voted ? 'bg-leaf text-ivory' : 'bg-forest/5 text-forest hover:bg-leaf/10'}`}
                                            >
                                                <ArrowUp className="w-5 h-5" />
                                            </button>
                                            <span className="text-sm font-black text-forest">{idea.votes_count}</span>
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black text-leaf uppercase tracking-widest">{idea.category}</span>
                                                <span className="w-1 h-1 rounded-full bg-forest/10" />
                                                <span className="text-[10px] font-bold text-forest/30 uppercase tracking-widest">
                                                    By {idea.author_id === user?.id ? 'You' : 'Innovator'}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-black text-forest group-hover:text-leaf transition-colors">{idea.title}</h3>
                                            <p className="text-sm text-forest/60 font-medium leading-relaxed">{idea.excerpt}</p>

                                            <div className="flex items-center justify-between pt-4">
                                                <div className="flex items-center gap-6 text-[10px] font-bold text-forest/40 uppercase tracking-widest">
                                                    <div className="flex items-center gap-2">
                                                        <MessageSquare className="w-3 h-3" />
                                                        {idea.comments_count} Comments
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="w-3 h-3" />
                                                        Global Visibility
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${idea.status === 'Reviewing' ? 'bg-orange-50 text-orange-600' :
                                                    idea.status === 'Shortlisted' ? 'bg-leaf/10 text-leaf' :
                                                        idea.status === 'Implemented' ? 'bg-forest text-ivory' : 'bg-forest/5 text-forest/40'
                                                    }`}>
                                                    {idea.status}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {proposals.length === 0 && (
                                <div className="text-center py-12 text-forest/40 font-bold uppercase tracking-widest text-xs">
                                    No proposals found in this category.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar: Briefs & Stats */}
                <div className="space-y-8">
                    <div className="premium-card bg-ivory relative overflow-hidden group border-leaf/20">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <FileCheck className="text-leaf w-5 h-5" />
                                <span className="text-xs font-black uppercase tracking-widest text-forest">Recent Briefs</span>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: "SME Recovery Strategy", date: "Jan 2026" },
                                    { title: "Youth Mobility Framework", date: "Dec 2025" }
                                ].map((brief, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-forest/5 hover:bg-leaf/5 hover:border-leaf/50 transition-all cursor-pointer">
                                        <span className="text-sm font-bold text-forest">{brief.title}</span>
                                        <Download className="w-4 h-4 text-forest/30" />
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-4 rounded-xl border border-leaf/30 text-leaf text-xs font-black uppercase tracking-widest hover:bg-leaf/5 transition-all">
                                VIEW ALL BRIEFS
                            </button>
                        </div>
                    </div>

                    <div className="premium-card text-center space-y-4">
                        <div className="w-16 h-16 bg-leaf/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Rocket className="text-leaf w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-forest">Impact Tracker</h3>
                        <p className="text-xs text-forest/50 font-medium">15 Ideas from this pipeline have been implemented in the national strategy.</p>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-forest/5 mt-4">
                            <div>
                                <div className="text-xl font-black text-forest">15</div>
                                <div className="text-[10px] font-bold text-forest/30 uppercase">Implemented</div>
                            </div>
                            <div>
                                <div className="text-xl font-black text-forest">84</div>
                                <div className="text-[10px] font-bold text-forest/30 uppercase">In Review</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Idea Modal */}
            <AnimatePresence>
                {isSubmitModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSubmitModalOpen(false)}
                            className="absolute inset-0 bg-forest/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-lg bg-ivory rounded-3xl p-8 shadow-2xl overflow-hidden border border-leaf/20"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-forest uppercase tracking-widest">Submit Proposal</h2>
                                <button onClick={() => setIsSubmitModalOpen(false)} className="p-2 hover:bg-forest/5 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-forest/40" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-forest/40 uppercase tracking-[0.2em] ml-1">Proposal Title</label>
                                    <input
                                        required
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        placeholder="e.g. AI-Powered Agri-Advisor"
                                        className="w-full bg-forest/5 border border-forest/5 rounded-xl px-4 py-3 text-forest font-bold placeholder:text-forest/20 focus:outline-none focus:border-leaf/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-forest/40 uppercase tracking-[0.2em] ml-1">Category</label>
                                    <select
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="w-full bg-forest/5 border border-forest/5 rounded-xl px-4 py-3 text-forest font-bold focus:outline-none focus:border-leaf/50 transition-all"
                                    >
                                        <option>Technology</option>
                                        <option>Agriculture</option>
                                        <option>Energy</option>
                                        <option>Education</option>
                                        <option>Infrastructure</option>
                                        <option>Registry</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-forest/40 uppercase tracking-[0.2em] ml-1">Short Excerpt (The &apos;What&apos;)</label>
                                    <textarea
                                        required
                                        value={newExcerpt}
                                        onChange={(e) => setNewExcerpt(e.target.value)}
                                        rows={3}
                                        placeholder="Describe your idea in a few sentences..."
                                        className="w-full bg-forest/5 border border-forest/5 rounded-xl px-4 py-3 text-forest font-bold placeholder:text-forest/20 focus:outline-none focus:border-leaf/50 transition-all resize-none"
                                    />
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full leaf-gradient text-ivory py-4 rounded-xl font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                                    SUBMIT FOR REVIEW
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
