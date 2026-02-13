-- Phase 4: Field Command & Election Readiness
-- 1. Infrastructure for Announcements
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    priority TEXT CHECK (priority IN ('Normal', 'High', 'Urgent')) DEFAULT 'Normal',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Volunteer Status in Profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_volunteer BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS volunteer_role TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS verified_volunteer_at TIMESTAMPTZ;

-- 3. RLS Policies for Announcements
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Everyone can read announcements in their chapter
CREATE POLICY "Users can view announcements in their chapter"
ON public.announcements FOR SELECT
USING (
    chapter_id IN (
        SELECT chapter_id FROM public.profiles WHERE id = auth.uid()
    )
);

-- Only coordinators/admins can post
CREATE POLICY "Coordinators can manage announcements"
ON public.announcements FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role IN ('coordinator', 'admin', 'super_admin')
    )
);

-- 4. RPC for Volunteer Promotion
CREATE OR REPLACE FUNCTION public.promote_to_volunteer(user_id_param UUID, role_param TEXT)
RETURNS void AS $$
BEGIN
    -- Check if recruiter (caller) is coordinator or higher
    IF EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role IN ('coordinator', 'admin', 'super_admin')
    ) THEN
        UPDATE public.profiles
        SET 
            is_volunteer = TRUE,
            volunteer_role = role_param,
            verified_volunteer_at = NOW()
        WHERE id = user_id_param;

        -- Log Activity
        INSERT INTO public.activities (user_id, type, title, metadata)
        VALUES (
            user_id_param, 
            'volunteer_promotion', 
            'Promoted to Field Volunteer', 
            jsonb_build_object('role', role_param, 'promoted_by', auth.uid())
        );
    ELSE
        RAISE EXCEPTION 'Unauthorized: Only coordinators can promote volunteers';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RPC for Posting Announcements (with activity log)
CREATE OR REPLACE FUNCTION public.post_announcement(chapter_id_param UUID, title_param TEXT, content_param TEXT, priority_param TEXT)
RETURNS UUID AS $$
DECLARE
    new_id UUID;
BEGIN
    INSERT INTO public.announcements (chapter_id, author_id, title, content, priority)
    VALUES (chapter_id_param, auth.uid(), title_param, content_param, priority_param)
    RETURNING id INTO new_id;

    -- Log Activity for the chapter
    INSERT INTO public.activities (user_id, chapter_id, type, title, metadata)
    VALUES (
        auth.uid(),
        chapter_id_param,
        'announcement_post',
        'New Chapter Announcement',
        jsonb_build_object('announcement_id', new_id, 'title', title_param)
    );

    RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
