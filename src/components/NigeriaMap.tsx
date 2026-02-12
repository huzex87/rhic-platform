"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// All 36 states + FCT with approximate SVG coordinates mapped onto the accurate Nigeria outline
// Coordinates are projected onto a 500×520 viewBox matching the real SVG path below
export interface StateData {
    id: string;
    name: string;
    cx: number;
    cy: number;
    supporters: number;
    growth: string;
    zone: string;
}

export const NIGERIA_STATES: StateData[] = [
    // North-West
    { id: "SK", name: "Sokoto", cx: 128, cy: 62, supporters: 4200, growth: "+8%", zone: "NW" },
    { id: "ZM", name: "Zamfara", cx: 155, cy: 100, supporters: 3100, growth: "+5%", zone: "NW" },
    { id: "KT", name: "Katsina", cx: 210, cy: 58, supporters: 5300, growth: "+11%", zone: "NW" },
    { id: "KN", name: "Kano", cx: 248, cy: 100, supporters: 12400, growth: "+15%", zone: "NW" },
    { id: "JG", name: "Jigawa", cx: 298, cy: 78, supporters: 3800, growth: "+7%", zone: "NW" },
    { id: "KD", name: "Kaduna", cx: 218, cy: 158, supporters: 9600, growth: "+12%", zone: "NW" },
    { id: "KEB", name: "Kebbi", cx: 112, cy: 125, supporters: 2800, growth: "+4%", zone: "NW" },

    // North-East
    { id: "BO", name: "Borno", cx: 400, cy: 95, supporters: 4500, growth: "+6%", zone: "NE" },
    { id: "YB", name: "Yobe", cx: 352, cy: 92, supporters: 3200, growth: "+5%", zone: "NE" },
    { id: "BA", name: "Bauchi", cx: 300, cy: 150, supporters: 5100, growth: "+9%", zone: "NE" },
    { id: "GM", name: "Gombe", cx: 340, cy: 148, supporters: 3400, growth: "+7%", zone: "NE" },
    { id: "AD", name: "Adamawa", cx: 390, cy: 200, supporters: 4100, growth: "+8%", zone: "NE" },
    { id: "TR", name: "Taraba", cx: 345, cy: 230, supporters: 2900, growth: "+3%", zone: "NE" },

    // North-Central
    { id: "NG", name: "Niger", cx: 160, cy: 195, supporters: 5800, growth: "+10%", zone: "NC" },
    { id: "KW", name: "Kwara", cx: 120, cy: 265, supporters: 5400, growth: "+9%", zone: "NC" },
    { id: "PL", name: "Plateau", cx: 278, cy: 210, supporters: 6200, growth: "+11%", zone: "NC" },
    { id: "NS", name: "Nasarawa", cx: 262, cy: 248, supporters: 4000, growth: "+6%", zone: "NC" },
    { id: "BN", name: "Benue", cx: 280, cy: 290, supporters: 5500, growth: "+8%", zone: "NC" },
    { id: "KG", name: "Kogi", cx: 195, cy: 290, supporters: 4300, growth: "+7%", zone: "NC" },
    { id: "FCT", name: "FCT Abuja", cx: 228, cy: 242, supporters: 18500, growth: "+22%", zone: "NC" },

    // South-West
    { id: "OY", name: "Oyo", cx: 105, cy: 310, supporters: 8200, growth: "+13%", zone: "SW" },
    { id: "OS", name: "Osun", cx: 128, cy: 332, supporters: 5900, growth: "+10%", zone: "SW" },
    { id: "OG", name: "Ogun", cx: 90, cy: 360, supporters: 7100, growth: "+11%", zone: "SW" },
    { id: "LA", name: "Lagos", cx: 70, cy: 388, supporters: 25600, growth: "+18%", zone: "SW" },
    { id: "ON", name: "Ondo", cx: 142, cy: 365, supporters: 4800, growth: "+9%", zone: "SW" },
    { id: "EK", name: "Ekiti", cx: 148, cy: 335, supporters: 3700, growth: "+6%", zone: "SW" },

    // South-East
    { id: "AN", name: "Anambra", cx: 210, cy: 355, supporters: 7800, growth: "+14%", zone: "SE" },
    { id: "EN", name: "Enugu", cx: 240, cy: 330, supporters: 6900, growth: "+12%", zone: "SE" },
    { id: "EB", name: "Ebonyi", cx: 262, cy: 345, supporters: 3600, growth: "+5%", zone: "SE" },
    { id: "IM", name: "Imo", cx: 215, cy: 388, supporters: 5200, growth: "+8%", zone: "SE" },
    { id: "AB", name: "Abia", cx: 245, cy: 378, supporters: 4500, growth: "+7%", zone: "SE" },

    // South-South
    { id: "ED", name: "Edo", cx: 170, cy: 350, supporters: 6100, growth: "+10%", zone: "SS" },
    { id: "DL", name: "Delta", cx: 175, cy: 390, supporters: 5700, growth: "+9%", zone: "SS" },
    { id: "BY", name: "Bayelsa", cx: 188, cy: 425, supporters: 3300, growth: "+4%", zone: "SS" },
    { id: "RV", name: "Rivers", cx: 225, cy: 420, supporters: 8900, growth: "+16%", zone: "SS" },
    { id: "AK", name: "Akwa Ibom", cx: 270, cy: 412, supporters: 5000, growth: "+7%", zone: "SS" },
    { id: "CR", name: "Cross River", cx: 295, cy: 370, supporters: 4200, growth: "+6%", zone: "SS" },
];

// Accurate Nigeria outline path derived from geographic coordinates
// Projected onto a 500×520 viewBox (longitude 2.6°E–14.7°E → x 0–500, latitude 4.2°N–13.9°N → y 520–0)
const NIGERIA_PATH = `
M 0,28 L 6,25 L 14,30 L 22,22 L 36,18 L 50,10 L 62,8 L 72,0 L 82,2
L 100,10 L 108,5 L 120,0 L 138,2 L 152,0 L 168,5 L 182,2
L 200,8 L 218,5 L 232,10 L 248,8 L 260,12 L 272,10 L 285,15
L 298,12 L 310,20 L 322,18 L 338,25 L 350,22 L 362,28 L 375,30
L 385,35 L 395,40 L 408,48 L 418,55 L 425,62 L 432,70 L 438,82
L 442,95 L 445,108 L 448,118 L 450,130 L 448,142 L 445,155
L 435,168 L 428,178 L 420,188 L 412,198 L 408,210 L 405,220
L 400,235 L 395,248 L 388,258 L 380,268 L 370,278 L 362,288
L 350,298 L 340,310 L 332,318 L 322,328 L 315,338 L 308,348
L 300,358 L 295,365 L 288,375 L 282,382 L 278,390 L 272,398
L 268,408 L 262,415 L 255,425 L 248,432 L 240,438 L 232,442
L 222,448 L 212,452 L 200,455 L 192,458 L 180,460 L 168,462
L 158,465 L 148,468 L 138,472 L 128,475 L 118,478 L 108,480
L 95,478 L 85,475 L 78,470 L 70,465 L 62,458 L 55,452
L 48,445 L 42,438 L 38,430 L 35,418 L 32,408 L 28,395
L 26,385 L 25,375 L 22,362 L 20,350 L 18,338 L 16,325
L 15,312 L 14,298 L 12,285 L 10,270 L 8,258 L 6,245
L 5,235 L 4,222 L 2,210 L 1,198 L 0,185 L 0,170 L 0,155
L 0,140 L 0,125 L 0,110 L 0,95 L 0,80 L 0,65 L 0,50 L 0,28 Z
`;

export const ZONE_LABELS: Record<string, string> = {
    NW: "North-West",
    NE: "North-East",
    NC: "North-Central",
    SW: "South-West",
    SE: "South-East",
    SS: "South-South",
};

// Red accent color for all dots
const DOT_COLOR = "#D32F2F";
const DOT_COLOR_LIGHT = "#EF5350";
const DOT_PULSE_COLOR = "#D32F2F";

interface NigeriaMapProps {
    variant?: "landing" | "dashboard";
}

export default function NigeriaMap({ variant = "landing" }: NigeriaMapProps) {
    const [hoveredState, setHoveredState] = useState<StateData | null>(null);
    const [selectedZone, setSelectedZone] = useState<string | null>(null);

    const totalSupporters = NIGERIA_STATES.reduce((a, s) => a + s.supporters, 0);

    const getRadius = (supporters: number) => {
        if (variant === "dashboard") {
            const min = 5, max = 16;
            const maxS = 25600;
            return min + (supporters / maxS) * (max - min);
        }
        const min = 4, max = 12;
        const maxS = 25600;
        return min + (supporters / maxS) * (max - min);
    };

    return (
        <div className="relative w-full">
            {/* Zone Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                <button
                    onClick={() => setSelectedZone(null)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${!selectedZone
                        ? "forest-gradient text-ivory shadow-lg"
                        : "bg-forest/5 text-forest/60 hover:bg-forest/10"
                        }`}
                >
                    All Zones
                </button>
                {Object.entries(ZONE_LABELS).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedZone(selectedZone === key ? null : key)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${selectedZone === key
                            ? "forest-gradient text-ivory shadow-lg"
                            : "bg-forest/5 text-forest/60 hover:bg-forest/10"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Map SVG */}
            <div className="relative">
                <svg
                    viewBox="0 0 500 520"
                    className="w-full h-auto"
                    style={{ maxHeight: variant === "dashboard" ? "420px" : "500px" }}
                >
                    {/* Accurate Nigeria outline — filled subtly */}
                    <path
                        d={NIGERIA_PATH}
                        fill="rgba(8,72,36,0.04)"
                        stroke="rgba(8,72,36,0.18)"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />

                    {/* Connection lines from FCT to major cities (dashboard only) */}
                    {variant === "dashboard" && (
                        <g opacity="0.10">
                            {NIGERIA_STATES.filter((s) => ["LA", "KN", "RV", "BO", "EN", "KD"].includes(s.id)).map((s) => (
                                <line
                                    key={`line-${s.id}`}
                                    x1={228}
                                    y1={242}
                                    x2={s.cx}
                                    y2={s.cy}
                                    stroke={DOT_COLOR}
                                    strokeWidth="1"
                                    strokeDasharray="4 4"
                                />
                            ))}
                        </g>
                    )}

                    {/* State Dots — RED */}
                    {NIGERIA_STATES.map((state, idx) => {
                        const isFiltered = selectedZone && state.zone !== selectedZone;
                        const isHovered = hoveredState?.id === state.id;
                        const r = getRadius(state.supporters);

                        return (
                            <g key={state.id}>
                                {/* Pulse ring for large chapters */}
                                {state.supporters > 8000 && !isFiltered && (
                                    <motion.circle
                                        cx={state.cx}
                                        cy={state.cy}
                                        r={r + 6}
                                        fill="none"
                                        stroke={DOT_PULSE_COLOR}
                                        strokeWidth="1"
                                        initial={{ opacity: 0.6, r: r + 2 }}
                                        animate={{ opacity: 0, r: r + 14 }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: idx * 0.15,
                                        }}
                                    />
                                )}

                                {/* Main dot */}
                                <motion.circle
                                    cx={state.cx}
                                    cy={state.cy}
                                    r={isHovered ? r + 3 : r}
                                    fill={isHovered ? DOT_COLOR_LIGHT : DOT_COLOR}
                                    opacity={isFiltered ? 0.1 : isHovered ? 1 : 0.75}
                                    className="cursor-pointer transition-all duration-300"
                                    onMouseEnter={() => setHoveredState(state)}
                                    onMouseLeave={() => setHoveredState(null)}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: idx * 0.02 + 0.2, type: "spring", stiffness: 200, damping: 15 }}
                                    style={{ filter: isHovered ? `drop-shadow(0 0 8px ${DOT_COLOR}80)` : "none" }}
                                />

                                {/* State label for dashboard only or hovered */}
                                {(variant === "dashboard" || isHovered) && !isFiltered && (
                                    <motion.text
                                        x={state.cx}
                                        y={state.cy - r - 5}
                                        textAnchor="middle"
                                        className="fill-forest font-display pointer-events-none select-none"
                                        fontSize={isHovered ? 11 : 8}
                                        fontWeight={isHovered ? 900 : 700}
                                        opacity={isHovered ? 1 : 0.5}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isHovered ? 1 : (variant === "dashboard" ? 0.5 : 0) }}
                                    >
                                        {state.id}
                                    </motion.text>
                                )}
                            </g>
                        );
                    })}

                    {/* FCT Abuja — central hub marker */}
                    <motion.g
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                    >
                        <circle cx={228} cy={242} r={variant === "dashboard" ? 18 : 14} fill={DOT_COLOR} opacity="0.15" />
                        <circle cx={228} cy={242} r={variant === "dashboard" ? 12 : 9} fill={DOT_COLOR} />
                        <text
                            x={228}
                            y={245}
                            textAnchor="middle"
                            className="fill-ivory font-display pointer-events-none select-none"
                            fontSize={variant === "dashboard" ? 8 : 7}
                            fontWeight={900}
                        >
                            FCT
                        </text>
                    </motion.g>
                </svg>

                {/* Tooltip */}
                {hoveredState && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-30 pointer-events-none"
                        style={{
                            left: `${(hoveredState.cx / 500) * 100}%`,
                            top: `${(hoveredState.cy / 520) * 100 - 10}%`,
                            transform: "translate(-50%, -100%)",
                        }}
                    >
                        <div className="bg-forest text-ivory px-4 py-3 rounded-xl shadow-2xl min-w-[160px]">
                            <div className="font-display font-black text-sm">{hoveredState.name}</div>
                            <div className="text-[10px] font-bold text-leaf uppercase tracking-wider mb-2">
                                {ZONE_LABELS[hoveredState.zone]}
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <div className="text-ivory/50 text-[9px] font-bold uppercase">Supporters</div>
                                    <div className="font-black text-base text-leaf">{hoveredState.supporters.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-ivory/50 text-[9px] font-bold uppercase">Growth</div>
                                    <div className="font-black text-base text-leaf">{hoveredState.growth}</div>
                                </div>
                            </div>
                            <div className="absolute left-1/2 -bottom-1.5 w-3 h-3 bg-forest transform -translate-x-1/2 rotate-45" />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Summary Stats Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-center">
                <div>
                    <div className="text-2xl md:text-3xl font-display font-black text-forest">
                        {totalSupporters.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-bold text-forest/40 uppercase tracking-widest">Supporters Nationwide</div>
                </div>
                <div className="w-px h-8 bg-forest/10 hidden md:block" />
                <div>
                    <div className="text-2xl md:text-3xl font-display font-black text-leaf">37</div>
                    <div className="text-[10px] font-bold text-forest/40 uppercase tracking-widest">States + FCT</div>
                </div>
                <div className="w-px h-8 bg-forest/10 hidden md:block" />
                <div>
                    <div className="text-2xl md:text-3xl font-display font-black text-forest">6</div>
                    <div className="text-[10px] font-bold text-forest/40 uppercase tracking-widest">Regions</div>
                </div>
            </div>
        </div>
    );
}
