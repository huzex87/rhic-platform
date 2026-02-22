"use client";

import { Mandate } from "@/hooks/useMandates";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MandateCard({ mandate, index }: { mandate: Mandate, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative h-full flex flex-col premium-card overflow-hidden bg-white/40 backdrop-blur-xl border border-white/50 hover:border-apc-cyan/30"
        >
            <div className="p-8 flex-1">
                <div className="flex items-start justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 bg-apc-cyan/5 border border-apc-cyan/10 group-hover:border-apc-cyan/30 shadow-inner`}>
                        <mandate.icon className="w-7 h-7 text-apc-cyan" />
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-apc-cyan uppercase tracking-[0.2em] mb-1">{mandate.category}</span>
                        <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-forest/5 border border-forest/10">
                            <span className={`w-1.5 h-1.5 rounded-full ${mandate.status === 'Active' ? 'bg-apc-green animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]' :
                                    mandate.status === 'Scaling' ? 'bg-apc-cyan animate-pulse' : 'bg-apc-gold'
                                }`} />
                            <span className="text-[10px] font-black uppercase text-forest/60 tracking-widest">{mandate.status}</span>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-display font-black text-forest mb-4 leading-tight group-hover:text-apc-cyan transition-colors">
                    {mandate.title}
                </h3>

                <p className="text-sm font-medium text-forest/60 leading-relaxed mb-6">
                    {mandate.description}
                </p>

                <div className="mt-auto">
                    <div className="text-4xl font-display font-black text-forest group-hover:scale-105 origin-left transition-transform duration-500">
                        {mandate.stats}
                    </div>
                </div>
            </div>

            <Link
                href={mandate.url}
                target={mandate.url !== '#' ? '_blank' : '_self'}
                className="w-full py-5 px-8 flex items-center justify-between bg-forest/5 border-t border-forest/5 hover:bg-forest/10 transition-colors group/btn"
            >
                <span className="text-[10px] font-black text-forest uppercase tracking-[0.3em]">Explore Initiative</span>
                {mandate.url !== '#' ? <ExternalLink className="w-4 h-4 text-forest/40 group-hover/btn:text-apc-cyan transition-colors" /> : <ArrowRight className="w-4 h-4 text-forest/40 group-hover/btn:text-apc-cyan transition-colors group-hover/btn:translate-x-1" />}
            </Link>

            {/* Premium Decorator */}
            <div className="absolute top-0 left-0 w-1 h-0 bg-apc-cyan group-hover:h-full transition-all duration-700" />
        </motion.div>
    );
}
