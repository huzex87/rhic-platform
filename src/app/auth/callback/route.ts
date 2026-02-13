import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");

    if (code) {
        const supabase = await createSupabaseServerClient();
        const { error, data } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && data.user) {
            // Check if user has completed onboarding (has a zone set)
            const { data: profile } = await supabase
                .from("profiles")
                .select("zone")
                .eq("id", data.user.id)
                .single();

            // New users (no zone) go to onboarding; returning users go to dashboard
            const destination = profile?.zone ? "/dashboard" : "/onboarding";
            return NextResponse.redirect(`${origin}${destination}`);
        }
    }

    // Auth code exchange failed — redirect to auth page with error
    return NextResponse.redirect(`${origin}/auth?error=auth_failed`);
}
