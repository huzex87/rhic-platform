"use client";

import { useState } from "react";

const NARRATIVE_TEMPLATES: Record<string, string[]> = {
    "Digital Economy Growth": [
        "The digital economy is the backbone of our future. Under the Renewed Hope mandate, we're not just consumers of tech—we're creators. 🇳🇬 #DigitalEconomy #NigeriasFuture",
        "Empowering 1 million Nigerians with digital skills. The journey to a $1 trillion economy starts with our youth. #RenewedHope #InnovationNigeria",
        "From Silicon Valley to Lagos, the world is watching Nigeria's tech revolution. Proud to be part of the RHIC movement! 🚀 #TechNigeria #Innovators"
    ],
    "Agriculture Modernization": [
        "Food security is national security. We're integrating tech into every acre to ensure Nigeria feeds itself and the world. 🌾 #AgriTech #RenewedHope",
        "Supporting rural farmers with AI-driven insights. This is how we modernize the roots of our economy. #AgricultureNigeria #HopeRenewed",
        "Innovation meets the soil. Our farmers are becoming tech-entrepreneurs under President Tinubu's vision. 🚜 #FarmersFirst #NigeriaGrowth"
    ],
    "Youth Employment": [
        "The energy of Nigeria's youth is our greatest resource. We're creating the platforms where this energy builds the nation. 🇳🇬 #YouthPulse #NigeriasHope",
        "Jobs are the result of innovation. By supporting startups, we're building a future where every Nigerian youth can thrive. #RHIC #EmploymentMatters",
        "Leadership is about creating more leaders. The Renewed Hope mandate is a promise kept to the next generation. #YouthLeadership #BuildingNigeria"
    ]
};

export function useAIAssistant() {
    const [generating, setGenerating] = useState(false);
    const [lastResult, setLastResult] = useState("");

    const generateCaption = async (focus: string) => {
        setGenerating(true);
        // Simulate AI thinking
        await new Promise(resolve => setTimeout(resolve, 1500));

        const templates = NARRATIVE_TEMPLATES[focus] || NARRATIVE_TEMPLATES["Digital Economy Growth"];
        const result = templates[Math.floor(Math.random() * templates.length)];

        setLastResult(result);
        setGenerating(false);
        return result;
    };

    return { generateCaption, generating, lastResult };
}
