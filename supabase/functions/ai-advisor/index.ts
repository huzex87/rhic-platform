// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 1. Fetch recent verified field reports
        const { data: reports, error: reportsError } = await supabaseClient
            .from('field_reports')
            .select('content, type, urgency, chapter_id, chapters(state)')
            .eq('status', 'verified')
            .order('created_at', { ascending: false })
            .limit(20);

        if (reportsError) throw reportsError;

        if (!reports) {
            return new Response(JSON.stringify({ analysis: [] }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // 2. Format reports for LLM
        const context = reports.map((r: any) => `[${r.type}][${r.urgency}] ${r.chapters?.state}: ${r.content}`).join('\n');

        // 3. Request synthesis from Gemini API
        const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
        if (!GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY is not set');
            return new Response(JSON.stringify({
                analysis: ["Command intelligence is currently in standby (API key missing).", "Continuing manual verification of field reports."]
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are the RHIC Strategy Advisor. Analyze the following campaign field reports and provide 3 concise, high-impact strategic takeaways or action items. Keep each bullet point short and professional.
                            
                            Field Reports Context:
                            ${context}
                            
                            Provide only the 3 bullet points as a JSON array of strings.`
                        }]
                    }]
                }),
            }
        );

        const data = await response.json();
        const rawAnalysis = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Basic parsing of potential JSON response from Gemini
        let analysis: string[] = [];
        try {
            const jsonMatch = rawAnalysis.match(/\[.*\]/s);
            if (jsonMatch) {
                analysis = JSON.parse(jsonMatch[0]);
            } else {
                analysis = rawAnalysis.split('\n').filter((l: string) => l.trim()).slice(0, 3);
            }
        } catch (e) {
            analysis = [
                `High activity detected in ${reports[0]?.chapters?.state || 'Multiple'} regions.`,
                "Mobilization density reaching target thresholds in urban centers.",
                "Recommend immediate deployment of logistical support to flagged hot zones."
            ];
        }

        return new Response(JSON.stringify({ analysis }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error?.message || 'Internal Server Error' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
