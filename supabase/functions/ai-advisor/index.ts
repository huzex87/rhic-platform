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

        // 3. Request synthesis from LLM (Mocked for now, to be integrated with Gemini/OpenAI API)
        const analysis = [
            `High activity detected in ${reports[0]?.chapters?.state || 'Northern'} regions.`,
            "Mobilization density reaching target thresholds in urban centers.",
            "Recommend immediate deployment of logistical support to flagged hot zones."
        ];

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
