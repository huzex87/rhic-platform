-- Phase 9: S-EAGLE Intelligence & Strategy Foundation
-- UNIVERSAL BOOTSTRAP SCRIPT (Ensures all dependencies exist)

-- 1. Polling Unit Infrastructure (Phase 6b)
CREATE TABLE IF NOT EXISTS public.polling_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
    state TEXT NOT NULL,
    lga TEXT NOT NULL,
    ward TEXT NOT NULL,
    pu_name TEXT NOT NULL,
    pu_code TEXT NOT NULL UNIQUE,
    volunteer_target INTEGER DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Field Intelligence Infrastructure (Phase 7)
CREATE TABLE IF NOT EXISTS public.field_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
    polling_unit_id UUID REFERENCES public.polling_units(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('Incident', 'Status', 'Result', 'Logistics')),
    content TEXT NOT NULL,
    media_url TEXT,
    urgency TEXT NOT NULL CHECK (urgency IN ('Normal', 'High', 'Urgent')) DEFAULT 'Normal',
    status TEXT NOT NULL CHECK (status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
    verified_by UUID REFERENCES auth.users(id),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- 3. Gamification Schema Safety (Phase 8)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS reputation_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'Supporter' CHECK (tier IN ('Supporter', 'Vanguard', 'Commander', 'Sentinel'));

ALTER TABLE public.chapters
ADD COLUMN IF NOT EXISTS momentum_score INTEGER DEFAULT 0;

-- 4. National Readiness Metrics (Phase 9)
CREATE OR REPLACE FUNCTION calculate_national_readiness()
RETURNS TABLE (
    total_supporters BIGINT,
    total_volunteers BIGINT,
    active_chapters BIGINT,
    national_readiness_score NUMERIC
) LANGUAGE plpgsql AS $$
DECLARE
    total_supp BIGINT;
    total_vol BIGINT;
    active_chap BIGINT;
BEGIN
    SELECT SUM(supporter_count) INTO total_supp FROM chapters;
    SELECT COUNT(*) INTO total_vol FROM profiles WHERE is_volunteer = true;
    SELECT COUNT(*) INTO active_chap FROM chapters WHERE supporter_count > 0;
    
    RETURN QUERY SELECT 
        total_supp,
        total_vol,
        active_chap,
        ROUND((total_supp * 0.4 + total_vol * 10.0 + active_chap * 100.0) / 1000.0, 2);
END;
$$;

-- 5. Aggregate Region Strategy View (S-EAGLE CORE)
CREATE OR REPLACE VIEW regional_strategy_matrix AS
SELECT 
    zone,
    COUNT(*) as chapter_count,
    SUM(supporter_count) as total_supporters,
    AVG(momentum_score) as avg_momentum,
    (SELECT COUNT(*) FROM field_reports fr 
     JOIN chapters c2 ON fr.chapter_id = c2.id 
     WHERE c2.zone = chapters.zone AND fr.urgency = 'Urgent' AND fr.status = 'pending') as urgent_incidents
FROM chapters
GROUP BY zone;

-- 6. Permissions
GRANT SELECT ON regional_strategy_matrix TO authenticated;
GRANT EXECUTE ON FUNCTION calculate_national_readiness() TO authenticated;
