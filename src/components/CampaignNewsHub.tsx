"use client";

import { motion } from "framer-motion";
import { Twitter, Instagram, Facebook, Share2, MessageCircle, TrendingUp, Users, ExternalLink } from "lucide-react";

const NEWS = [
    {
        id: 1,
        source: 'Twitter',
        author: '@RenewedHopeHQ',
        content: 'Record-breaking enrollment in the RHIC Innovation Lab today! Nigeria\'s digital future is being built by you. 🚀 #RenewedHope #RHIC',
        time: '2h ago',
        reach: '125K',
        icon: Twitter,
        color: 'text-sky-400'
    },
    {
        id: 2,
        source: 'Media Hub',
        author: 'Official RHIC News',
        content: 'New narrative toolkit for the South-West zone is now live. Download and share to amplify our progress in agricultural tech.',
        time: '5h ago',
        reach: '89K',
        icon: MessageCircle,
        color: 'text-apc-cyan'
    },
    {
        id: 3,
        source: 'Instagram',
        author: '@AsiwajuAdvocates',
        content: 'Spotted: Our community leaders mentoring youth in Jigawa State. This is what grassroots innovation looks like. 🇳🇬',
        time: '8h ago',
        reach: '210K',
        icon: Instagram,
        color: 'text-pink-500'
    }
];

export default function CampaignNewsHub() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-apc-cyan w-5 h-5" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Live Feed</h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-apc-green/10 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-apc-green animate-pulse" />
                    <span className="text-[10px] font-black text-apc-green uppercase tracking-widest">Real-time</span>
                </div>
            </div>

            <div className="space-y-4">
                {NEWS.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="premium-card p-6 group hover:border-apc-cyan/30 transition-all border-transparent"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-foreground/5 ${item.color}`}>
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-foreground uppercase tracking-wider">{item.author}</div>
                                    <div className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest">{item.source} • {item.time}</div>
                                </div>
                            </div>
                            <Share2 className="w-4 h-4 text-foreground/20 group-hover:text-apc-cyan transition-colors cursor-pointer" />
                        </div>

                        <p className="text-sm font-medium text-foreground/80 leading-relaxed mb-6">
                            {item.content}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5 text-foreground/30" />
                                    <span className="text-[10px] font-black text-foreground/40">{item.reach} Viewers</span>
                                </div>
                            </div>
                            <button className="text-[10px] font-black text-apc-cyan uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                                View Post
                                <ExternalLink className="w-3 h-3" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full py-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] transition-all">
                Load Historical Narratives
            </button>
        </div>
    );
}
