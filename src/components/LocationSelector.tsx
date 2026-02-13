"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown, MapPin, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { createClient } from "@/lib/supabase";

// Type for the full geo data: Zone -> State -> LGA -> Ward[]
type GeoData = Record<string, Record<string, Record<string, string[]>>>;

export interface LocationSelection {
    zone: string;
    state: string;
    lga: string;
    ward: string;
    polling_unit?: string;
    polling_unit_id?: string;
}

interface LocationSelectorProps {
    value?: Partial<LocationSelection>;
    onChange: (location: LocationSelection) => void;
    className?: string;
}

export default function LocationSelector({ value, onChange, className = "" }: LocationSelectorProps) {
    const [geoData, setGeoData] = useState<GeoData | null>(null);
    const [loading, setLoading] = useState(true);

    const [zone, setZone] = useState(value?.zone || "");
    const [state, setState] = useState(value?.state || "");
    const [lga, setLga] = useState(value?.lga || "");
    const [ward, setWard] = useState(value?.ward || "");
    const [pollingUnit, setPollingUnit] = useState(value?.polling_unit || "");
    const [pollingUnits, setPollingUnits] = useState<{ id: string; name: string; code: string }[]>([]);
    const [loadingPUs, setLoadingPUs] = useState(false);

    // Load geo data on mount
    useEffect(() => {
        fetch("/data/nigeria-geo.json")
            .then((res) => res.json())
            .then((data: GeoData) => {
                setGeoData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Fetch Polling Units when ward changes
    useEffect(() => {
        if (!ward || !lga || !state) {
            setPollingUnits([]);
            return;
        }

        async function fetchPUs() {
            setLoadingPUs(true);
            const supabase = createClient();
            const { data, error } = await supabase
                .from("polling_units")
                .select("id, pu_name, pu_code")
                .eq("state", state)
                .eq("lga", lga)
                .eq("ward", ward)
                .order("pu_name");

            if (!error && data) {
                setPollingUnits(data.map(d => ({
                    id: d.id,
                    name: `${d.pu_name} (${d.pu_code})`,
                    code: d.pu_code
                })));
            }
            setLoadingPUs(false);
        }

        fetchPUs();
    }, [ward, lga, state]);

    // Derived options
    const zones = geoData ? Object.keys(geoData).sort() : [];
    const states = zone && geoData?.[zone] ? Object.keys(geoData[zone]).sort() : [];
    const lgas = zone && state && geoData?.[zone]?.[state] ? Object.keys(geoData[zone][state]).sort() : [];
    const wards = zone && state && lga && geoData?.[zone]?.[state]?.[lga] ? [...geoData[zone][state][lga]].sort() : [];

    // Cascade reset
    const handleZoneChange = useCallback((val: string) => {
        setZone(val);
        setState("");
        setLga("");
        setWard("");
        setPollingUnit("");
        setPollingUnitId("");
    }, []);

    const handleStateChange = useCallback((val: string) => {
        setState(val);
        setLga("");
        setWard("");
        setPollingUnit("");
        setPollingUnitId("");
    }, []);

    const handleLgaChange = useCallback((val: string) => {
        setLga(val);
        setWard("");
        setPollingUnit("");
        setPollingUnitId("");
    }, []);

    const handleWardChange = useCallback((val: string) => {
        setWard(val);
        setPollingUnit("");
        if (zone && state && lga && val) {
            onChange({ zone, state, lga, ward: val });
        }
    }, [zone, state, lga, onChange]);

    const handlePUChange = useCallback((val: string) => {
        const selected = pollingUnits.find(p => p.name === val);
        if (selected) {
            setPollingUnit(selected.name);
            onChange({
                zone,
                state,
                lga,
                ward,
                polling_unit: selected.name,
                polling_unit_id: selected.id
            });
        }
    }, [zone, state, lga, ward, pollingUnits, onChange]);

    if (loading) {
        return (
            <div className={`flex items-center justify-center py-8 ${className}`}>
                <Loader2 className="w-6 h-6 animate-spin text-leaf" />
                <span className="ml-3 text-sm font-medium text-forest/50">Loading locations...</span>
            </div>
        );
    }

    const completionSteps = [
        { label: "Zone", done: !!zone },
        { label: "State", done: !!state },
        { label: "LGA", done: !!lga },
        { label: "Ward", done: !!ward },
        { label: "PU", done: !!pollingUnit },
    ];

    return (
        <div className={`space-y-5 ${className}`}>
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-2">
                {completionSteps.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${step.done
                            ? "bg-leaf text-ivory"
                            : "bg-forest/5 text-forest/30"
                            }`}>
                            {step.done ? <Check className="w-3 h-3" /> : i + 1}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${step.done ? "text-forest" : "text-forest/30"
                            }`}>
                            {step.label}
                        </span>
                        {i < 4 && <div className={`w-4 h-[2px] mx-1 ${step.done ? "bg-leaf" : "bg-forest/10"}`} />}
                    </div>
                ))}
            </div>

            {/* Zone Selector */}
            <CascadeSelect
                label="Geopolitical Zone"
                icon={<MapPin className="w-4 h-4" />}
                value={zone}
                options={zones}
                onChange={handleZoneChange}
                placeholder="Select your zone"
            />

            {/* State Selector */}
            <AnimatePresence>
                {zone && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <CascadeSelect
                            label="State"
                            value={state}
                            options={states}
                            onChange={handleStateChange}
                            placeholder="Select your state"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* LGA Selector */}
            <AnimatePresence>
                {state && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <CascadeSelect
                            label="Local Government Area"
                            value={lga}
                            options={lgas}
                            onChange={handleLgaChange}
                            placeholder="Select your LGA"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ward Selector */}
            <AnimatePresence>
                {lga && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <CascadeSelect
                            label="Ward"
                            value={ward}
                            options={wards}
                            onChange={handleWardChange}
                            placeholder="Select your ward"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Polling Unit Selector */}
            <AnimatePresence>
                {ward && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <CascadeSelect
                            label="Polling Unit"
                            value={pollingUnit}
                            options={pollingUnits.map(p => p.name)}
                            onChange={handlePUChange}
                            placeholder={loadingPUs ? "Decrypting Units..." : "Select Polling Unit"}
                            loading={loadingPUs}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Reusable cascading select
function CascadeSelect({
    label,
    icon,
    value,
    options,
    onChange,
    placeholder,
    loading,
}: {
    label: string;
    icon?: React.ReactNode;
    value: string;
    options: string[];
    onChange: (val: string) => void;
    placeholder: string;
    loading?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filtered = search
        ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
        : options;

    return (
        <div className="space-y-1.5">
            <label className="text-[10px] font-black text-forest/40 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                {icon}
                {label}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={`w-full text-left pl-4 pr-10 py-4 rounded-2xl bg-forest/5 border font-medium transition-all ${open ? "border-leaf ring-2 ring-leaf/20" : "border-accent-red/15 hover:border-accent-red/30"
                        } ${value ? "text-forest" : "text-forest/40"}`}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>{placeholder}</span>
                        </div>
                    ) : (
                        value || placeholder
                    )}
                    <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/30 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-accent-red/10 overflow-hidden"
                        >
                            {/* Search input */}
                            {options.length > 8 && (
                                <div className="p-3 border-b border-forest/5">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder={`Search ${label.toLowerCase()}...`}
                                        className="w-full px-3 py-2 rounded-xl bg-forest/5 text-sm font-medium text-forest outline-none focus:ring-2 focus:ring-leaf/30"
                                        autoFocus
                                    />
                                </div>
                            )}

                            <div className="max-h-60 overflow-y-auto overscroll-contain">
                                {filtered.length === 0 && (
                                    <div className="px-4 py-6 text-center text-sm text-forest/30 font-medium">No results found</div>
                                )}
                                {filtered.map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => {
                                            onChange(option);
                                            setOpen(false);
                                            setSearch("");
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-all hover:bg-leaf/5 ${value === option
                                            ? "bg-leaf/10 text-forest font-bold"
                                            : "text-forest/70"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option}</span>
                                            {value === option && <Check className="w-4 h-4 text-leaf" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
