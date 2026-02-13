-- Phase 6b: Polling Unit Precision Infrastructure
-- TARGET PROJECT: ehthkntdxnnulchhjblv

-- 1. Create Polling Units Table
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

-- 2. Add Polling Unit Reference to Profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS polling_unit_id UUID REFERENCES public.polling_units(id) ON DELETE SET NULL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS polling_unit_code TEXT;

-- 3. Create Indexes for High-Speed Drill-Down
CREATE INDEX IF NOT EXISTS idx_polling_units_ward ON public.polling_units(ward);
CREATE INDEX IF NOT EXISTS idx_polling_units_lga ON public.polling_units(lga);
CREATE INDEX IF NOT EXISTS idx_profiles_pu_id ON public.profiles(polling_unit_id);

-- 4. RLS for Polling Units
ALTER TABLE public.polling_units ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Polling units are viewable by everyone' AND tablename = 'polling_units') THEN
        CREATE POLICY "Polling units are viewable by everyone" 
        ON public.polling_units FOR SELECT 
        USING (true);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Only admins can manage polling units' AND tablename = 'polling_units') THEN
        CREATE POLICY "Only admins can manage polling units" 
        ON public.polling_units FOR ALL 
        USING (
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE profiles.id = auth.uid() 
                AND profiles.role IN ('admin', 'super_admin')
            )
        );
    END IF;
END $$;

-- 5. Seed some sample PUs for Alausa, Ikeja, Lagos
INSERT INTO public.polling_units (chapter_id, state, lga, ward, pu_name, pu_code)
SELECT 
    id, 'Lagos', 'Ikeja', 'Alausa', 'Alausa/Governors Office', '24-01-01-001'
FROM public.chapters WHERE state = 'Lagos'
ON CONFLICT (pu_code) DO NOTHING;

INSERT INTO public.polling_units (chapter_id, state, lga, ward, pu_name, pu_code)
SELECT 
    id, 'Lagos', 'Ikeja', 'Alausa', 'Alausa/Police Station', '24-01-01-002'
FROM public.chapters WHERE state = 'Lagos'
ON CONFLICT (pu_code) DO NOTHING;
