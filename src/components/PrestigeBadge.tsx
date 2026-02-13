"use client";

import { motion } from "framer-motion";
import { Shield, Medal, Trophy, Star, LucideIcon } from "lucide-react";

export type UserTier = 'Supporter' | 'Vanguard' | 'Commander' | 'Sentinel';

interface PrestigeBadgeProps {
    tier: UserTier;
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
}

const tierConfig: Record<UserTier, { icon: LucideIcon; color: string; bg: string; border: string; label: string }> = {
    Supporter: {
        icon: Star,
        color: "text-forest/40",
        bg: "bg-forest/5",
        border: "border-forest/10",
        label: "Supporter"
    },
    Vanguard: {
        icon: Medal,
        color: "text-leaf",
        bg: "bg-leaf/10",
        border: "border-leaf/20",
        label: "Vanguard"
    },
    Commander: {
        icon: Shield,
        color: "text-accent-red",
        bg: "bg-accent-red/10",
        border: "border-accent-red/20",
        label: "Commander"
    },
    Sentinel: {
        icon: Trophy,
        color: "text-gold",
        bg: "bg-gold/10",
        border: "border-gold/30",
        label: "Sentinel"
    }
};

export default function PrestigeBadge({ tier, size = "md", showLabel = false }: PrestigeBadgeProps) {
    const config = tierConfig[tier] || tierConfig.Supporter;
    const Icon = config.icon;

    const sizeClasses = {
        sm: "p-1.5 gap-1.5 text-[8px]",
        md: "p-2 gap-2 text-[10px]",
        lg: "p-3 gap-2.5 text-xs"
    };

    const iconSizes = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5"
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center rounded-xl glass border ${config.bg} ${config.border} ${sizeClasses[size]} transition-all hover:scale-105 group shadow-sm`}
        >
            <div className={`${config.color} group-hover:rotate-12 transition-transform duration-300`}>
                <Icon className={iconSizes[size]} />
            </div>
            {showLabel && (
                <span className={`font-black uppercase tracking-widest ${config.color}`}>
                    {config.label}
                </span>
            )}
        </motion.div>
    );
}

// Custom styles for Gold color if not in tailwind config
// Add to globals.css if needed: .text-gold { color: #D4AF37; } .bg-gold\/10 { background-color: rgba(212, 175, 55, 0.1); }
