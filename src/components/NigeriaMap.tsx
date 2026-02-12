"use client";

import { motion } from "framer-motion";
import { useState, memo } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from "react-simple-maps";

// TopoJSON from world-atlas – only Nigeria (country code 566) will be highlighted
const GEO_URL = "/world-110m.json";

// All 36 states + FCT with real geographic coordinates [lng, lat]
export interface StateData {
    id: string;
    name: string;
    coordinates: [number, number]; // [longitude, latitude]
    supporters: number;
    growth: string;
    zone: string;
}

export const NIGERIA_STATES: StateData[] = [
    // North-West
    { id: "SK", name: "Sokoto", coordinates: [5.24, 13.06], supporters: 4200, growth: "+8%", zone: "NW" },
    { id: "ZM", name: "Zamfara", coordinates: [6.25, 12.17], supporters: 3100, growth: "+5%", zone: "NW" },
    { id: "KT", name: "Katsina", coordinates: [7.60, 13.00], supporters: 5300, growth: "+11%", zone: "NW" },
    { id: "KN", name: "Kano", coordinates: [8.52, 12.00], supporters: 12400, growth: "+15%", zone: "NW" },
    { id: "JG", name: "Jigawa", coordinates: [9.35, 12.23], supporters: 3800, growth: "+7%", zone: "NW" },
    { id: "KD", name: "Kaduna", coordinates: [7.43, 10.52], supporters: 9600, growth: "+12%", zone: "NW" },
    { id: "KEB", name: "Kebbi", coordinates: [4.20, 12.45], supporters: 2800, growth: "+4%", zone: "NW" },

    // North-East
    { id: "BO", name: "Borno", coordinates: [13.15, 11.85], supporters: 4500, growth: "+6%", zone: "NE" },
    { id: "YB", name: "Yobe", coordinates: [11.75, 12.29], supporters: 3200, growth: "+5%", zone: "NE" },
    { id: "BA", name: "Bauchi", coordinates: [9.84, 10.31], supporters: 5100, growth: "+9%", zone: "NE" },
    { id: "GM", name: "Gombe", coordinates: [11.17, 10.29], supporters: 3400, growth: "+7%", zone: "NE" },
    { id: "AD", name: "Adamawa", coordinates: [12.50, 9.33], supporters: 4100, growth: "+8%", zone: "NE" },
    { id: "TR", name: "Taraba", coordinates: [10.99, 7.87], supporters: 2900, growth: "+3%", zone: "NE" },

    // North-Central
    { id: "NG", name: "Niger", coordinates: [5.98, 9.93], supporters: 5800, growth: "+10%", zone: "NC" },
    { id: "KW", name: "Kwara", coordinates: [4.55, 8.49], supporters: 5400, growth: "+9%", zone: "NC" },
    { id: "PL", name: "Plateau", coordinates: [8.89, 9.22], supporters: 6200, growth: "+11%", zone: "NC" },
    { id: "NS", name: "Nasarawa", coordinates: [8.50, 8.49], supporters: 4000, growth: "+6%", zone: "NC" },
    { id: "BN", name: "Benue", coordinates: [8.80, 7.34], supporters: 5500, growth: "+8%", zone: "NC" },
    { id: "KG", name: "Kogi", coordinates: [6.74, 7.73], supporters: 4300, growth: "+7%", zone: "NC" },
    { id: "FCT", name: "FCT Abuja", coordinates: [7.49, 9.06], supporters: 18500, growth: "+22%", zone: "NC" },

    // South-West
    { id: "OY", name: "Oyo", coordinates: [3.93, 7.84], supporters: 8200, growth: "+13%", zone: "SW" },
    { id: "OS", name: "Osun", coordinates: [4.55, 7.56], supporters: 5900, growth: "+10%", zone: "SW" },
    { id: "OG", name: "Ogun", coordinates: [3.35, 7.00], supporters: 7100, growth: "+11%", zone: "SW" },
    { id: "LA", name: "Lagos", coordinates: [3.39, 6.52], supporters: 25600, growth: "+18%", zone: "SW" },
    { id: "ON", name: "Ondo", coordinates: [4.83, 7.10], supporters: 4800, growth: "+9%", zone: "SW" },
    { id: "EK", name: "Ekiti", coordinates: [5.31, 7.72], supporters: 3700, growth: "+6%", zone: "SW" },

    // South-East
    { id: "AN", name: "Anambra", coordinates: [6.93, 6.22], supporters: 7800, growth: "+14%", zone: "SE" },
    { id: "EN", name: "Enugu", coordinates: [7.51, 6.44], supporters: 6900, growth: "+12%", zone: "SE" },
    { id: "EB", name: "Ebonyi", coordinates: [8.08, 6.26], supporters: 3600, growth: "+5%", zone: "SE" },
    { id: "IM", name: "Imo", coordinates: [7.03, 5.57], supporters: 5200, growth: "+8%", zone: "SE" },
    { id: "AB", name: "Abia", coordinates: [7.49, 5.45], supporters: 4500, growth: "+7%", zone: "SE" },

    // South-South
    { id: "ED", name: "Edo", coordinates: [5.63, 6.63], supporters: 6100, growth: "+10%", zone: "SS" },
    { id: "DL", name: "Delta", coordinates: [5.69, 5.70], supporters: 5700, growth: "+9%", zone: "SS" },
    { id: "BY", name: "Bayelsa", coordinates: [5.90, 4.92], supporters: 3300, growth: "+4%", zone: "SS" },
    { id: "RV", name: "Rivers", coordinates: [6.92, 4.84], supporters: 8900, growth: "+16%", zone: "SS" },
    { id: "AK", name: "Akwa Ibom", coordinates: [7.85, 5.01], supporters: 5000, growth: "+7%", zone: "SS" },
    { id: "CR", name: "Cross River", coordinates: [8.33, 5.87], supporters: 4200, growth: "+6%", zone: "SS" },
];

export const ZONE_LABELS: Record<string, string> = {
    NW: "North-West",
    NE: "North-East",
    NC: "North-Central",
    SW: "South-West",
    SE: "South-East",
    SS: "South-South",
};

const DOT_COLOR = "#D32F2F";
const DOT_HOVER = "#EF5350";

interface NigeriaMapProps {
    variant?: "landing" | "dashboard";
}

function NigeriaMap({ variant = "landing" }: NigeriaMapProps) {
    const [hoveredState, setHoveredState] = useState<StateData | null>(null);
    const [selectedZone, setSelectedZone] = useState<string | null>(null);

    const totalSupporters = NIGERIA_STATES.reduce((a, s) => a + s.supporters, 0);

    const getRadius = (supporters: number) => {
        const min = variant === "dashboard" ? 4 : 3;
        const max = variant === "dashboard" ? 10 : 8;
        return min + (supporters / 25600) * (max - min);
    };

    return (
        <div className="relative w-full">
            {/* Zone Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
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

            {/* react-simple-maps — zoomed to Nigeria */}
            <div className="relative">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        center: [8.5, 9.1],
                        scale: 2800,
                    }}
                    width={500}
                    height={480}
                    style={{ width: "100%", height: "auto", maxHeight: variant === "dashboard" ? "420px" : "500px" }}
                >
                    <ZoomableGroup center={[8.5, 9.1]} zoom={1} minZoom={1} maxZoom={1}>
                        {/* Render world geography — highlight Nigeria */}
                        <Geographies geography={GEO_URL}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const isNigeria = geo.id === "566";
                                    if (!isNigeria) return null;
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill="rgba(8,72,36,0.06)"
                                            stroke="rgba(8,72,36,0.25)"
                                            strokeWidth={1}
                                            style={{
                                                default: { outline: "none" },
                                                hover: { outline: "none", fill: "rgba(8,72,36,0.09)" },
                                                pressed: { outline: "none" },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>

                        {/* State Markers — RED */}
                        {NIGERIA_STATES.map((state, idx) => {
                            const isFiltered = selectedZone && state.zone !== selectedZone;
                            const isHovered = hoveredState?.id === state.id;
                            const r = getRadius(state.supporters);

                            return (
                                <Marker
                                    key={state.id}
                                    coordinates={state.coordinates}
                                    onMouseEnter={() => setHoveredState(state)}
                                    onMouseLeave={() => setHoveredState(null)}
                                >
                                    {/* Pulse for big chapters */}
                                    {state.supporters > 8000 && !isFiltered && (
                                        <motion.circle
                                            r={r + 4}
                                            fill="none"
                                            stroke={DOT_COLOR}
                                            strokeWidth={0.8}
                                            initial={{ opacity: 0.5, r: r + 1 }}
                                            animate={{ opacity: 0, r: r + 10 }}
                                            transition={{ duration: 2.2, repeat: Infinity, delay: idx * 0.12 }}
                                        />
                                    )}
                                    {/* Main dot */}
                                    <motion.circle
                                        r={isHovered ? r + 2 : r}
                                        fill={isHovered ? DOT_HOVER : DOT_COLOR}
                                        opacity={isFiltered ? 0.1 : isHovered ? 1 : 0.75}
                                        className="cursor-pointer"
                                        initial={{ r: 0 }}
                                        animate={{ r: isHovered ? r + 2 : r }}
                                        transition={{ type: "spring", stiffness: 250, damping: 15 }}
                                        style={{ filter: isHovered ? `drop-shadow(0 0 6px ${DOT_COLOR}90)` : "none" }}
                                    />
                                    {/* Label */}
                                    {(variant === "dashboard" || isHovered) && !isFiltered && (
                                        <text
                                            textAnchor="middle"
                                            y={-r - 4}
                                            style={{
                                                fontSize: isHovered ? 9 : 6,
                                                fontWeight: isHovered ? 900 : 700,
                                                fill: "#084824",
                                                opacity: isHovered ? 1 : 0.5,
                                                fontFamily: "var(--font-display), sans-serif",
                                                pointerEvents: "none",
                                            }}
                                        >
                                            {state.id}
                                        </text>
                                    )}
                                </Marker>
                            );
                        })}

                        {/* FCT hub marker */}
                        <Marker coordinates={[7.49, 9.06]}>
                            <circle r={variant === "dashboard" ? 13 : 10} fill={DOT_COLOR} opacity={0.15} />
                            <circle r={variant === "dashboard" ? 8 : 6} fill={DOT_COLOR} />
                            <text
                                textAnchor="middle"
                                y={3}
                                style={{
                                    fontSize: 5,
                                    fontWeight: 900,
                                    fill: "#FEFAE0",
                                    fontFamily: "var(--font-display), sans-serif",
                                    pointerEvents: "none",
                                }}
                            >
                                FCT
                            </text>
                        </Marker>
                    </ZoomableGroup>
                </ComposableMap>

                {/* HTML Tooltip */}
                {hoveredState && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-30 pointer-events-none"
                        style={{
                            left: "50%",
                            top: "10%",
                            transform: "translate(-50%, 0)",
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
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Summary Stats */}
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

export default memo(NigeriaMap);
