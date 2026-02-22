"use client";

import { useMemo } from "react";
import { Zap, Users, Rocket, Globe, Palette, LucideIcon } from "lucide-react";

export interface Mandate {
    id: string;
    title: string;
    category: 'Innovation' | 'Tech & ICT' | 'Creative' | 'Youth';
    description: string;
    icon: LucideIcon;
    status: 'Implementation' | 'Active' | 'Scaling';
    stats: string;
    url: string;
}

export const MANDATE_DATA: Mandate[] = [
    {
        id: '3mtt',
        title: "3MTT (3 Million Technical Talent)",
        category: 'Tech & ICT',
        description: "A nationwide initiative to build Nigeria's technical talent backbone by training 3 million people in high-demand digital skills.",
        icon: Users,
        status: 'Active',
        stats: '1.2M+ Applications',
        url: 'https://3mtt.nitda.gov.ng/'
    },
    {
        id: 'idice',
        title: "iDICE Program",
        category: 'Innovation',
        description: "Investment in Digital and Creative Enterprises (iDICE) providing $617M for startups and creative ventures to foster job creation.",
        icon: Rocket,
        status: 'Implementation',
        stats: '$617M Investment',
        url: '#'
    },
    {
        id: 'otni',
        title: "Outsource To Nigeria (OTNI)",
        category: 'Tech & ICT',
        description: "Positioning Nigeria as a leading global destination for business process outsourcing and digital services.",
        icon: Globe,
        status: 'Scaling',
        stats: '2.5k Jobs Created',
        url: '#'
    },
    {
        id: 'creative-economy',
        title: "Creative Economy Support",
        category: 'Creative',
        description: "Comprehensive policy framework to monetize Nigeria's cultural assets and creative talents for global export.",
        icon: Palette,
        status: 'Active',
        stats: '₦10B Fund',
        url: '#'
    },
    {
        id: 'youth-investment',
        title: "Nigeria Youth Investment Fund",
        category: 'Youth',
        description: "A strategic fund (NYIF) designed to generate at least 500,000 jobs through financial support for youth-led enterprises.",
        icon: Zap,
        status: 'Active',
        stats: '₦75B Capital',
        url: '#'
    }
];

export function useMandates() {
    const mandates = useMemo(() => MANDATE_DATA, []);
    return { mandates, loading: false };
}
