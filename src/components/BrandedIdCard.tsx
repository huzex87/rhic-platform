"use client";

import { useRef, useCallback } from "react";
import { Download, Share2 } from "lucide-react";

interface BrandedIdCardProps {
    fullName: string;
    email: string;
    zone: string | null;
    state: string | null;
    lga: string | null;
    ward: string | null;
    pollingUnit?: string | null;
    role: string | null;
    isVolunteer: boolean;
    volunteerRole: string | null;
    memberId: string;
    achievements?: { name: string; icon_type: string }[];
}

export default function BrandedIdCard({
    fullName,
    zone,
    state,
    lga,
    ward,
    pollingUnit,
    role,
    isVolunteer,
    memberId,
    achievements = [],
}: BrandedIdCardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateCard = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = 1080;
        const h = 1350;
        canvas.width = w;
        canvas.height = h;

        // ── Background gradient ──
        const bg = ctx.createLinearGradient(0, 0, 0, h);
        bg.addColorStop(0, "#001B3D"); // Dark Navy
        bg.addColorStop(0.4, "#002D52");
        bg.addColorStop(1, "#000B20");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);

        // ── Decorative elements ──
        // Top-right accent circle
        ctx.beginPath();
        ctx.arc(w - 80, 80, 200, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 173, 239, 0.08)";
        ctx.fill();

        // Bottom-left accent
        ctx.beginPath();
        ctx.arc(80, h - 80, 250, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(227, 30, 36, 0.06)";
        ctx.fill();

        // ── Red accent stripe at top ──
        ctx.fillStyle = "#E31E24";
        ctx.fillRect(0, 0, w, 8);

        // ── Cyan accent stripe below red ──
        ctx.fillStyle = "#00AEEF";
        ctx.fillRect(0, 8, w, 4);

        // ── "RHIC" Header ──
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 48px 'Inter', 'Helvetica', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("RENEWED HOPE INNOVATION CENTRE", w / 2, 90);

        // Subtitle
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "bold 22px 'Inter', 'Helvetica', sans-serif";
        ctx.letterSpacing = "8px";
        ctx.fillText("OFFICIAL DIGITAL MOBILIZATION PLATFORM", w / 2, 130);

        // ── Divider line ──
        ctx.strokeStyle = "rgba(0, 173, 239, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(100, 160);
        ctx.lineTo(w - 100, 160);
        ctx.stroke();

        // ── "MEMBER ID CARD" label ──
        ctx.fillStyle = "#00AEEF";
        ctx.font = "900 28px 'Inter', 'Helvetica', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("— MEMBER ID CARD —", w / 2, 210);

        // ── Avatar circle ──
        const avatarY = 340;
        ctx.beginPath();
        ctx.arc(w / 2, avatarY, 100, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 173, 239, 0.15)";
        ctx.fill();
        ctx.strokeStyle = "#00AEEF";
        ctx.lineWidth = 4;
        ctx.stroke();

        // Initials inside avatar
        const initials = fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
        ctx.fillStyle = "#00AEEF";
        ctx.font = "bold 64px 'Inter', 'Helvetica', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(initials, w / 2, avatarY);
        ctx.textBaseline = "alphabetic";

        // ── Name ──
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 52px 'Inter', 'Helvetica', sans-serif";
        ctx.textAlign = "center";

        let displayName = fullName.toUpperCase();
        const maxNameWidth = w - 200;
        if (ctx.measureText(displayName).width > maxNameWidth) {
            // Truncate name if too long
            while (ctx.measureText(displayName + "…").width > maxNameWidth && displayName.length > 0) {
                displayName = displayName.substring(0, displayName.length - 1);
            }
            displayName += "…";
        }
        ctx.fillText(displayName, w / 2, 510);

        // ── Role badge ──
        ctx.font = "bold 18px 'Inter', 'Helvetica', sans-serif";
        let roleText = (role || "supporter").toUpperCase();
        const maxRoleWidth = 400;
        if (ctx.measureText(roleText).width > maxRoleWidth) {
            roleText = roleText.substring(0, 25) + "…";
        }

        const roleWidth = ctx.measureText(roleText).width + 60;
        const roleX = w / 2 - roleWidth / 2;
        ctx.fillStyle = "rgba(0, 173, 239, 0.15)";
        roundRect(ctx, roleX, 532, roleWidth, 40, 20);
        ctx.fill();
        ctx.fillStyle = "#00AEEF";
        ctx.fillText(roleText, w / 2, 558);

        // ── Volunteer Badge ──
        if (isVolunteer) {
            ctx.font = "bold 20px 'Inter', 'Helvetica', sans-serif";
            const vText = "VERIFIED FIELD VOLUNTEER";
            ctx.fillStyle = "#00AEEF";
            ctx.textAlign = "center";
            ctx.fillText("★ " + vText + " ★", w / 2, 595);
        }

        // ── Achievement Badges ──
        if (achievements.length > 0) {
            const badgeW = 60;
            const badgeGap = 20;
            const totalWidth = achievements.length * badgeW + (achievements.length - 1) * badgeGap;
            const startX = w / 2 - totalWidth / 2;
            const badgeY = 340 + 120; // Radius + offset

            achievements.slice(0, 5).forEach((ach, i) => {
                const x = startX + i * (badgeW + badgeGap);
                const centerX = x + badgeW / 2;
                const centerY = badgeY;

                // Create Gradient for the Medal
                const badgeGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, badgeW / 2);
                badgeGrad.addColorStop(0, "#00AEEF");
                badgeGrad.addColorStop(1, "#005696");

                // Draw badge outer ring
                ctx.beginPath();
                ctx.arc(centerX, centerY, badgeW / 2, 0, Math.PI * 2);
                ctx.fillStyle = badgeGrad;
                ctx.fill();

                // Gold Rim
                ctx.strokeStyle = "#FFD700";
                ctx.lineWidth = 3;
                ctx.stroke();

                // Draw a simple Vector Star instead of a placeholder emoji
                const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
                    let rot = (Math.PI / 2) * 3;
                    let x = cx;
                    let y = cy;
                    const step = Math.PI / spikes;

                    ctx.beginPath();
                    ctx.moveTo(cx, cy - outerRadius);
                    for (let i = 0; i < spikes; i++) {
                        x = cx + Math.cos(rot) * outerRadius;
                        y = cy + Math.sin(rot) * outerRadius;
                        ctx.lineTo(x, y);
                        rot += step;

                        x = cx + Math.cos(rot) * innerRadius;
                        y = cy + Math.sin(rot) * innerRadius;
                        ctx.lineTo(x, y);
                        rot += step;
                    }
                    ctx.lineTo(cx, cy - outerRadius);
                    ctx.closePath();
                    ctx.fillStyle = "#FFD700";
                    ctx.fill();
                };

                drawStar(centerX, centerY, 5, 12, 6);
            });
        }

        // ── Info grid ──
        const infoStartY = 630;
        const leftX = 120;
        const rightX = w / 2 + 60;
        const rowHeight = 100;

        const fields = [
            { label: "GEOPOLITICAL ZONE", value: zone || "Not Set", x: leftX },
            { label: "STATE", value: state || "Not Set", x: rightX },
            { label: "LOCAL GOVT. AREA", value: lga || "Not Set", x: leftX },
            { label: "WARD", value: ward || "Not Set", x: rightX },
            { label: "POLLING UNIT", value: pollingUnit || "Not Assigned", x: leftX },
            { label: "MEMBER ID", value: memberId.slice(0, 8).toUpperCase(), x: rightX },
        ];

        fields.forEach((field, i) => {
            const row = Math.floor(i / 2);
            const y = infoStartY + row * rowHeight;

            ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
            ctx.font = "bold 14px 'Inter', 'Helvetica', sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(field.label, field.x, y);

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 24px 'Inter', 'Helvetica', sans-serif";
            // Truncate long values
            let displayValue = field.value;
            if (displayValue.length > 22) {
                displayValue = displayValue.substring(0, 20) + "…";
            }
            ctx.fillText(displayValue, field.x, y + 32);
        });

        // ── Bottom red stripe ──
        ctx.fillStyle = "#E31E24";
        ctx.fillRect(0, h - 120, w, 4);

        // ── Bottom section ──
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.font = "bold 16px 'Inter', 'Helvetica', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("rhic-platform.vercel.app", w / 2, h - 70);

        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.font = "bold 13px 'Inter', 'Helvetica', sans-serif";
        ctx.fillText("This is an official digital identity of the Renewed Hope Innovation Centre", w / 2, h - 40);

        // ── Nigerian flag colors bar at very bottom ──
        const barH = 6;
        ctx.fillStyle = "#008751";
        ctx.fillRect(0, h - barH, w / 3, barH);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(w / 3, h - barH, w / 3, barH);
        ctx.fillStyle = "#E31E24"; // Using APC Red for the third segment to brand it fully APC-Nigeria
        ctx.fillRect((w / 3) * 2, h - barH, w / 3, barH);
    }, [fullName, zone, state, lga, ward, pollingUnit, role, isVolunteer, memberId, achievements]);

    const handleDownload = () => {
        generateCard();
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = `RHIC-ID-${fullName.replace(/\s+/g, "-")}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const handleShare = async () => {
        generateCard();
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.toBlob(async (blob) => {
            if (!blob) return;
            const file = new File([blob], `RHIC-ID-${fullName.replace(/\s+/g, "-")}.png`, {
                type: "image/png",
            });

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "My RHIC Member ID",
                        text: "I am a proud member of the Renewed Hope Innovation Centre! 🇳🇬",
                        files: [file],
                    });
                } catch {
                    // User cancelled share
                }
            } else {
                handleDownload();
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-apc-red/20 shadow-xl">
                <canvas
                    ref={canvasRef}
                    className="w-full h-auto"
                    style={{ maxHeight: "500px", objectFit: "contain" }}
                />
                {/* On-mount render */}
                <CanvasInitializer onInit={generateCard} />
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={handleDownload}
                    className="apc-cyan-gradient text-white py-4 rounded-2xl font-black text-sm shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border border-apc-red/20"
                >
                    <Download className="w-5 h-5" />
                    DOWNLOAD PNG
                </button>
                <button
                    onClick={handleShare}
                    className="py-4 rounded-2xl font-black text-sm border-2 border-apc-cyan/30 text-foreground hover:bg-apc-cyan/5 transition-all flex items-center justify-center gap-2"
                >
                    <Share2 className="w-5 h-5" />
                    SHARE
                </button>
            </div>

            <p className="text-center text-xs text-forest/30 font-medium">
                Use this as your social media profile picture or share it on your feed to show your support! 🇳🇬
            </p>
        </div>
    );
}

// Helper: Renders the canvas on mount
function CanvasInitializer({ onInit }: { onInit: () => void }) {
    // Use requestAnimationFrame to ensure canvas is mounted
    if (typeof window !== "undefined") {
        requestAnimationFrame(() => {
            onInit();
        });
    }
    return null;
}

// Helper: Draw a rounded rectangle
function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}
