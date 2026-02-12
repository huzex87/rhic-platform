import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const redirect = searchParams.get("redirect") || "/dashboard";

    if (code) {
        const supabase = await createSupabaseServerClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${redirect}`);
        }
    }

    // Auth code exchange failed — redirect to auth page with error
    return NextResponse.redirect(`${origin}/auth?error=auth_failed`);
}
