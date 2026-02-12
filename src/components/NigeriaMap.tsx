"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// All 36 states + FCT with approximate SVG coordinates on a 500x540 viewBox
// and sample RHIC chapter data
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
    { id: "SK", name: "Sokoto", cx: 130, cy: 55, supporters: 4200, growth: "+8%", zone: "NW" },
    { id: "ZM", name: "Zamfara", cx: 160, cy: 90, supporters: 3100, growth: "+5%", zone: "NW" },
    { id: "KT", name: "Katsina", cx: 210, cy: 55, supporters: 5300, growth: "+11%", zone: "NW" },
    { id: "KN", name: "Kano", cx: 248, cy: 100, supporters: 12400, growth: "+15%", zone: "NW" },
    { id: "JG", name: "Jigawa", cx: 300, cy: 75, supporters: 3800, growth: "+7%", zone: "NW" },
    { id: "KD", name: "Kaduna", cx: 215, cy: 155, supporters: 9600, growth: "+12%", zone: "NW" },
    { id: "KEB", name: "Kebbi", cx: 115, cy: 115, supporters: 2800, growth: "+4%", zone: "NW" },

    // North-East
    { id: "BO", name: "Borno", cx: 405, cy: 80, supporters: 4500, growth: "+6%", zone: "NE" },
    { id: "YB", name: "Yobe", cx: 355, cy: 85, supporters: 3200, growth: "+5%", zone: "NE" },
    { id: "BA", name: "Bauchi", cx: 300, cy: 155, supporters: 5100, growth: "+9%", zone: "NE" },
    { id: "GM", name: "Gombe", cx: 340, cy: 150, supporters: 3400, growth: "+7%", zone: "NE" },
    { id: "AD", name: "Adamawa", cx: 395, cy: 195, supporters: 4100, growth: "+8%", zone: "NE" },
    { id: "TR", name: "Taraba", cx: 350, cy: 230, supporters: 2900, growth: "+3%", zone: "NE" },

    // North-Central
    { id: "NG", name: "Niger", cx: 160, cy: 190, supporters: 5800, growth: "+10%", zone: "NC" },
    { id: "KW", name: "Kwara", cx: 125, cy: 255, supporters: 5400, growth: "+9%", zone: "NC" },
    { id: "PL", name: "Plateau", cx: 280, cy: 205, supporters: 6200, growth: "+11%", zone: "NC" },
    { id: "NS", name: "Nasarawa", cx: 260, cy: 245, supporters: 4000, growth: "+6%", zone: "NC" },
    { id: "BN", name: "Benue", cx: 280, cy: 285, supporters: 5500, growth: "+8%", zone: "NC" },
    { id: "KG", name: "Kogi", cx: 195, cy: 285, supporters: 4300, growth: "+7%", zone: "NC" },
    { id: "FCT", name: "FCT Abuja", cx: 225, cy: 235, supporters: 18500, growth: "+22%", zone: "NC" },

    // South-West
    { id: "OY", name: "Oyo", cx: 105, cy: 305, supporters: 8200, growth: "+13%", zone: "SW" },
    { id: "OS", name: "Osun", cx: 125, cy: 330, supporters: 5900, growth: "+10%", zone: "SW" },
    { id: "OG", name: "Ogun", cx: 90, cy: 355, supporters: 7100, growth: "+11%", zone: "SW" },
    { id: "LA", name: "Lagos", cx: 68, cy: 385, supporters: 25600, growth: "+18%", zone: "SW" },
    { id: "ON", name: "Ondo", cx: 140, cy: 365, supporters: 4800, growth: "+9%", zone: "SW" },
    { id: "EK", name: "Ekiti", cx: 145, cy: 335, supporters: 3700, growth: "+6%", zone: "SW" },

    // South-East
    { id: "AN", name: "Anambra", cx: 210, cy: 355, supporters: 7800, growth: "+14%", zone: "SE" },
    { id: "EN", name: "Enugu", cx: 240, cy: 330, supporters: 6900, growth: "+12%", zone: "SE" },
    { id: "EB", name: "Ebonyi", cx: 265, cy: 345, supporters: 3600, growth: "+5%", zone: "SE" },
    { id: "IM", name: "Imo", cx: 215, cy: 385, supporters: 5200, growth: "+8%", zone: "SE" },
    { id: "AB", name: "Abia", cx: 245, cy: 380, supporters: 4500, growth: "+7%", zone: "SE" },

    // South-South
    { id: "ED", name: "Edo", cx: 170, cy: 345, supporters: 6100, growth: "+10%", zone: "SS" },
    { id: "DL", name: "Delta", cx: 175, cy: 385, supporters: 5700, growth: "+9%", zone: "SS" },
    { id: "BY", name: "Bayelsa", cx: 185, cy: 420, supporters: 3300, growth: "+4%", zone: "SS" },
    { id: "RV", name: "Rivers", cx: 220, cy: 420, supporters: 8900, growth: "+16%", zone: "SS" },
    { id: "AK", name: "Akwa Ibom", cx: 270, cy: 415, supporters: 5000, growth: "+7%", zone: "SS" },
    { id: "CR", name: "Cross River", cx: 295, cy: 370, supporters: 4200, growth: "+6%", zone: "SS" },
];

export const ZONE_COLORS: Record<string, string> = {
    NW: "#084824",
    NE: "#0a5c2e",
    NC: "#388E3C",
    SW: "#4CAF50",
    SE: "#66BB6A",
    SS: "#1B5E20",
};

export const ZONE_LABELS: Record<string, string> = {
    NW: "North-West",
    NE: "North-East",
    NC: "North-Central",
    SW: "South-West",
    SE: "South-East",
    SS: "South-South",
};

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
                    viewBox="0 0 480 480"
                    className="w-full h-auto"
                    style={{ maxHeight: variant === "dashboard" ? "420px" : "500px" }}
                >
                    {/* Nigeria outline – simplified polygon */}
                    <path
                        d="M95,40 L130,30 L175,25 L220,30 L260,20 L305,40 L340,35 L370,50 L410,55 L440,80 L445,120 L430,150 L420,190 L415,220 L395,250 L375,270 L350,280 L330,310 L310,340 L295,370 L275,400 L255,430 L230,445 L200,445 L170,430 L155,410 L130,400 L100,395 L75,380 L55,370 L50,340 L55,310 L60,285 L65,260 L75,235 L85,210 L90,185 L85,155 L80,125 L78,100 L82,70 L90,50 Z"
                        fill="none"
                        stroke="rgba(8,72,36,0.15)"
                        strokeWidth="2"
                        className="transition-all duration-500"
                    />
                    {/* Nigeria filled shape — very subtle */}
                    <path
                        d="M95,40 L130,30 L175,25 L220,30 L260,20 L305,40 L340,35 L370,50 L410,55 L440,80 L445,120 L430,150 L420,190 L415,220 L395,250 L375,270 L350,280 L330,310 L310,340 L295,370 L275,400 L255,430 L230,445 L200,445 L170,430 L155,410 L130,400 L100,395 L75,380 L55,370 L50,340 L55,310 L60,285 L65,260 L75,235 L85,210 L90,185 L85,155 L80,125 L78,100 L82,70 L90,50 Z"
                        fill="rgba(8,72,36,0.03)"
                    />

                    {/* Connection lines from FCT to zone capitals */}
                    {variant === "dashboard" && (
                        <g opacity="0.08">
                            {NIGERIA_STATES.filter((s) => ["LA", "KN", "RV", "BO", "EN", "KD"].includes(s.id)).map((s) => (
                                <line
                                    key={`line-${s.id}`}
                                    x1={225}
                                    y1={235}
                                    x2={s.cx}
                                    y2={s.cy}
                                    stroke="#388E3C"
                                    strokeWidth="1"
                                    strokeDasharray="4 4"
                                />
                            ))}
                        </g>
                    )}

                    {/* State Dots */}
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
                                        stroke={ZONE_COLORS[state.zone]}
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
                                    fill={ZONE_COLORS[state.zone]}
                                    opacity={isFiltered ? 0.08 : isHovered ? 1 : 0.7}
                                    className="cursor-pointer transition-all duration-300"
                                    onMouseEnter={() => setHoveredState(state)}
                                    onMouseLeave={() => setHoveredState(null)}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: idx * 0.02 + 0.2, type: "spring", stiffness: 200, damping: 15 }}
                                    style={{ filter: isHovered ? `drop-shadow(0 0 8px ${ZONE_COLORS[state.zone]}80)` : "none" }}
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

                    {/* FCT Star Marker */}
                    <motion.g
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                    >
                        <circle cx={225} cy={235} r={variant === "dashboard" ? 18 : 14} fill="#084824" opacity="0.15" />
                        <circle cx={225} cy={235} r={variant === "dashboard" ? 12 : 9} fill="#084824" />
                        <text
                            x={225}
                            y={variant === "dashboard" ? 238 : 238}
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
                            left: `${(hoveredState.cx / 480) * 100}%`,
                            top: `${(hoveredState.cy / 480) * 100 - 12}%`,
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
