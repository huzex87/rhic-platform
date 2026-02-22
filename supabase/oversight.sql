-- Command Directives Table
CREATE TABLE IF NOT EXISTS public.command_directives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    issuer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE, -- NULL means National
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('Normal', 'High', 'Urgent')) DEFAULT 'Normal',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'
);

-- RLS for Directives
ALTER TABLE public.command_directives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Directives are viewable by all authenticated users"
    ON public.command_directives FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Only super_admins and admins can issue directives"
    ON public.command_directives FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() 
            AND (role = 'super_admin' OR role = 'admin')
        )
    );

-- Ticker View for Verified Incidents
CREATE OR REPLACE VIEW public.recent_verified_incidents AS
SELECT 
    fr.id,
    fr.content,
    fr.type,
    fr.urgency,
    c.state as chapter_name,
    fr.verified_at
FROM public.field_reports fr
JOIN public.chapters c ON fr.chapter_id = c.id
WHERE fr.status = 'verified'
AND fr.type = 'Incident'
ORDER BY fr.verified_at DESC
LIMIT 10;
