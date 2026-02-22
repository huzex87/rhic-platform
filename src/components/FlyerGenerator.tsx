"use client";

import { motion } from "framer-motion";
import { Sparkles, Download, Share2, Layers, Type, Image as ImageIcon, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { toPng } from "html-to-image";

const TEMPLATES = [
    { id: 'tech', name: 'Digital Economy', color: 'apc-cyan', bg: 'bg-apc-cyan/10', gradient: 'from-apc-cyan/20 via-transparent to-apc-green/10' },
    { id: 'jobs', name: 'Youth Employment', color: 'apc-red', bg: 'bg-apc-red/10', gradient: 'from-apc-red/20 via-transparent to-apc-gold/10' },
    { id: 'growth', name: 'Economic Growth', color: 'apc-green', bg: 'bg-apc-green/10', gradient: 'from-apc-green/20 via-transparent to-apc-cyan/10' },
];

const FORMATS = [
    { id: 'flyer', name: 'A4 Flyer', aspect: 'aspect-[210/297]', icon: Layers },
    { id: 'square', name: 'Square Post', aspect: 'aspect-square', icon: ImageIcon },
    { id: 'sticker', name: 'Sticker', aspect: 'aspect-square rounded-full', icon: Sparkles },
];

export default function FlyerGenerator() {
    const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
    const [selectedFormat, setSelectedFormat] = useState(FORMATS[0]);
    const [headline, setHeadline] = useState("Renewed Hope for a Digital Nigeria");
    const [fontSize, setFontSize] = useState(64);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [generating, setGenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [exportStatus, setExportStatus] = useState<string | null>(null);
    const flyerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => setGenerating(false), 2000);
    };

    const handleDownload = useCallback(async () => {
        if (flyerRef.current === null) return;

        setIsExporting(true);
        setExportStatus("Generating High-Res Asset...");

        try {
            // Wait for a small delay to ensure rendering is stable
            await new Promise(resolve => setTimeout(resolve, 500));

            const dataUrl = await toPng(flyerRef.current, {
                cacheBust: true,
                style: {
                    borderRadius: selectedFormat.id === 'sticker' ? '9999px' : '0'
                }
            });

            const link = document.createElement('a');
            link.download = `APC_${selectedFormat.id}_${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
            setExportStatus("Download Complete!");
            setTimeout(() => setExportStatus(null), 3000);
        } catch (err) {
            console.error('Export failed', err);
            setExportStatus("Export Failed. Please try again.");
        } finally {
            setIsExporting(false);
        }
    }, [selectedFormat]);

    const handleShare = useCallback(async () => {
        if (flyerRef.current === null) return;

        setIsExporting(true);
        setExportStatus("Preparing for Sharing...");

        try {
            const dataUrl = await toPng(flyerRef.current, { cacheBust: true });
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], `APC_Flyer.png`, { type: 'image/png' });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'APC Campaign Asset',
                    text: headline
                });
            } else {
                // Fallback: Copy Image Data URL or just notify
                await navigator.clipboard.writeText(window.location.href);
                setExportStatus("Link Copied to Clipboard!");
            }
        } catch (err) {
            console.error('Share failed', err);
            setExportStatus("Sharing Unavailable.");
        } finally {
            setIsExporting(false);
            setTimeout(() => setExportStatus(null), 3000);
        }
    }, [headline]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
            {/* Controls */}
            <div className="space-y-8">
                <div className="premium-card">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="p-2 bg-apc-cyan/10 rounded-lg">
                            <Layers className="text-apc-cyan w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Flyer Builder</h3>
                    </div>

                    <div className="space-y-6">
                        {/* Headline Input */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-foreground/30 uppercase tracking-widest flex items-center gap-2">
                                <Type className="w-3 h-3" />
                                Custom Headline
                            </label>
                            <textarea
                                value={headline}
                                onChange={(e) => setHeadline(e.target.value)}
                                className="w-full p-4 rounded-xl bg-foreground/5 border border-foreground/5 focus:border-apc-cyan focus:ring-4 focus:ring-apc-cyan/10 outline-none text-sm font-medium transition-all resize-none h-24"
                                placeholder="Enter your campaign message..."
                            />
                        </div>

                        {/* Format Selection */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-foreground/30 uppercase tracking-widest flex items-center gap-2">
                                <Layers className="w-3 h-3" />
                                Export Format
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {FORMATS.map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => setSelectedFormat(f)}
                                        className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedFormat.id === f.id
                                            ? 'border-apc-cyan bg-apc-cyan/5 text-foreground'
                                            : 'border-transparent bg-foreground/5 text-foreground/40 hover:bg-foreground/10'
                                            }`}
                                    >
                                        <f.icon className="w-4 h-4" />
                                        <span className="text-[9px] font-black uppercase tracking-wider">{f.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-foreground/30 uppercase tracking-widest flex items-center gap-2">
                                <ImageIcon className="w-3 h-3" />
                                Portrait / Asset
                            </label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full py-8 border-2 border-dashed border-foreground/10 rounded-2xl hover:bg-foreground/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <div className="p-3 bg-apc-cyan/10 rounded-xl">
                                    <Sparkles className="w-5 h-5 text-apc-cyan" />
                                </div>
                                <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">
                                    {uploadedImage ? 'Change Image' : 'Click to Upload Portrait'}
                                </span>
                            </div>
                        </div>

                        {/* Typography Controls */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-foreground/30 uppercase tracking-widest block">Font Size</label>
                                <input
                                    type="range"
                                    min="24"
                                    max="120"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                                    className="w-full accent-apc-cyan"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-foreground/30 uppercase tracking-widest block">Theme Color</label>
                                <div className="flex gap-2">
                                    {TEMPLATES.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setSelectedTemplate(t)}
                                            className={`w-6 h-6 rounded-full border-2 ${selectedTemplate.id === t.id ? 'border-foreground' : 'border-transparent'}`}
                                            style={{ backgroundColor: `var(--color-${t.color})` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="btn-apc w-full py-5 flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            {generating ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <Sparkles className="w-6 h-6" />
                                    <span>Render Final Flyer</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="p-6 rounded-3xl bg-apc-green/5 border border-apc-green/20 flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-apc-green" />
                    <div>
                        <p className="text-xs font-black text-foreground uppercase tracking-wider">Verified Official Assets</p>
                        <p className="text-[11px] text-foreground/60 font-medium">All generated content adheres to the Renewed Hope branding guidelines.</p>
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <div className="sticky top-32 space-y-6">
                <div className="flex items-center justify-between px-2">
                    <div className="flex flex-col">
                        <h4 className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Real-time Preview</h4>
                        {exportStatus && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-[9px] font-bold text-apc-cyan uppercase mt-1"
                            >
                                {exportStatus}
                            </motion.span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownload}
                            disabled={isExporting}
                            className="p-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all disabled:opacity-50"
                        >
                            {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={handleShare}
                            disabled={isExporting}
                            className="p-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all disabled:opacity-50"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={flyerRef}
                    className={`${selectedFormat.aspect} relative overflow-hidden premium-shadow group bg-white shadow-2xl transition-all duration-700 ${selectedFormat.id === 'sticker' ? 'rounded-full' : 'rounded-[3rem]'}`}
                >
                    {/* Background Layer */}
                    <div className={`absolute inset-0 ${selectedTemplate.bg} transition-colors duration-500`} />
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedTemplate.gradient} opacity-50`} />

                    {/* Dynamic Design Elements */}
                    <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                        <div className={`absolute top-0 right-0 w-[80%] h-[80%] bg-${selectedTemplate.color}/20 blur-[120px] rounded-full -mr-[20%] -mt-[20%] opacity-60`} />
                        <div className="absolute bottom-0 left-0 w-[100%] h-[100%] bg-apc-green/10 blur-[150px] rounded-full -ml-[40%] -mb-[40%] opacity-40" />
                    </div>

                    <div className="relative h-full flex flex-col p-8 md:p-12 justify-between z-10">
                        <div className="flex justify-between items-start">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl p-4 relative overflow-hidden">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain p-3 md:p-4"
                                />
                            </div>
                            {selectedFormat.id !== 'sticker' && (
                                <div className="p-3 md:p-4 ultra-glass rounded-2xl border border-white/50 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-apc-cyan">
                                    Official Campaign Asset
                                </div>
                            )}
                        </div>

                        {/* Portrait Placeholder / Upload */}
                        {uploadedImage && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                                <Image
                                    src={uploadedImage}
                                    alt="Uploaded"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div className="space-y-6 md:space-y-8 max-w-[85%]">
                            <motion.h2
                                key={headline}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ fontSize: `${fontSize}px` }}
                                className="font-display font-black leading-[0.9] tracking-tighter text-foreground drop-shadow-sm"
                            >
                                {headline}
                            </motion.h2>

                            {selectedFormat.id !== 'sticker' && (
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className={`h-1 md:h-1.5 w-16 md:w-24 bg-${selectedTemplate.color} rounded-full`} />
                                    <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-foreground/40">
                                        Renewed Hope 2027
                                    </div>
                                </div>
                            )}
                        </div>

                        {selectedFormat.id !== 'sticker' && (
                            <div className="bg-foreground text-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between">
                                <div>
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Take Action Now</p>
                                    <p className="text-base md:text-lg font-black italic">Join the Movement</p>
                                </div>
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Overlay Grid */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
