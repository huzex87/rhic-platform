-- Phase 7: Field Intelligence & Verification Ops
-- Target: ehthkntdxnnulchhjblv

-- 1. Create Field Reports Table
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

-- 2. Indexes for fast retrieval
CREATE INDEX IF NOT EXISTS idx_field_reports_chapter ON public.field_reports(chapter_id);
CREATE INDEX IF NOT EXISTS idx_field_reports_pu ON public.field_reports(polling_unit_id);
CREATE INDEX IF NOT EXISTS idx_field_reports_status ON public.field_reports(status);
CREATE INDEX IF NOT EXISTS idx_field_reports_urgency ON public.field_reports(urgency);

-- 3. Row Level Security
ALTER TABLE public.field_reports ENABLE ROW LEVEL SECURITY;

-- Volunteers/Everyone logged in can insert
CREATE POLICY "Volunteers can submit field reports" 
ON public.field_reports FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Everyone can view verified reports
CREATE POLICY "Verified reports are public" 
ON public.field_reports FOR SELECT 
USING (status = 'verified');

-- Chapter coordinators can view all reports in their chapter
CREATE POLICY "Coordinators can view chapter reports" 
ON public.field_reports FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND (
            (profiles.role IN ('coordinator', 'admin', 'super_admin') AND profiles.chapter_id = field_reports.chapter_id)
            OR profiles.role IN ('admin', 'super_admin')
        )
    )
);

-- Coordinators/Admins can update reports (to verify/reject)
CREATE POLICY "Coordinators can moderate field reports" 
ON public.field_reports FOR UPDATE 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('coordinator', 'admin', 'super_admin')
    )
);

-- 4. RPC for Verifying Reports
CREATE OR REPLACE FUNCTION public.verify_field_report(report_id_param UUID, status_param TEXT)
RETURNS void AS $$
BEGIN
    UPDATE public.field_reports
    SET 
        status = status_param,
        verified_by = auth.uid(),
        verified_at = NOW()
    WHERE id = report_id_param;

    -- Log Activity
    INSERT INTO public.activities (user_id, type, title, metadata)
    VALUES (
        auth.uid(), 
        'report_verification', 
        'Verified Field Intelligence Report', 
        jsonb_build_object('report_id', report_id_param, 'status', status_param)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
