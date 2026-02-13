-- ============================================
-- RHIC Phase 3: Mobilization Analytics
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ehthkntdxnnulchhjblv/sql
-- ============================================

-- 1. Expand Activities Table Types
ALTER TABLE public.activities DROP CONSTRAINT IF EXISTS activities_type_check;
ALTER TABLE public.activities ADD CONSTRAINT activities_type_check 
CHECK (type IN ('signup', 'login', 'event_rsvp', 'chapter_join', 'profile_update', 'verification', 'proposal_vote', 'mission_complete', 'innovation_submission', 'prosal_create'));

-- 2. Enhanced Toggle Proposal Vote with Activity Logging
CREATE OR REPLACE FUNCTION public.toggle_proposal_vote(proposal_id_param UUID)
RETURNS void AS $$
DECLARE
    vote_exists BOOLEAN;
    p_title TEXT;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM public.proposal_votes 
        WHERE user_id = auth.uid() AND proposal_id = proposal_id_param
    ) INTO vote_exists;

    SELECT title INTO p_title FROM public.proposals WHERE id = proposal_id_param;

    IF vote_exists THEN
        DELETE FROM public.proposal_votes 
        WHERE user_id = auth.uid() AND proposal_id = proposal_id_param;
        
        UPDATE public.proposals 
        SET votes_count = votes_count - 1 
        WHERE id = proposal_id_param;
    ELSE
        INSERT INTO public.proposal_votes (user_id, proposal_id)
        VALUES (auth.uid(), proposal_id_param);
        
        UPDATE public.proposals 
        SET votes_count = votes_count + 1 
        WHERE id = proposal_id_param;

        -- Log Activity
        INSERT INTO public.activities (user_id, type, title, metadata)
        VALUES (auth.uid(), 'proposal_vote', 'Voted for Proposal', jsonb_build_object('proposal_id', proposal_id_param, 'proposal_title', p_title));
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Enhanced Complete Mission with Activity Logging
CREATE OR REPLACE FUNCTION public.complete_mission(mission_id_param UUID)
RETURNS void AS $$
DECLARE
    m_points INTEGER;
    m_title TEXT;
    m_status TEXT;
BEGIN
    SELECT status INTO m_status 
    FROM public.user_missions 
    WHERE user_id = auth.uid() AND mission_id = mission_id_param;

    IF m_status = 'joined' THEN
        SELECT points, title INTO m_points, m_title FROM public.missions WHERE id = mission_id_param;
        
        UPDATE public.user_missions 
        SET status = 'completed', completed_at = NOW()
        WHERE user_id = auth.uid() AND mission_id = mission_id_param;
        
        UPDATE public.profiles 
        SET points = points + m_points 
        WHERE id = auth.uid();

        -- Log Activity
        INSERT INTO public.activities (user_id, type, title, metadata)
        VALUES (auth.uid(), 'mission_complete', 'Completed Mission: ' || m_title, jsonb_build_object('mission_id', mission_id_param, 'points', m_points));
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Momentum View for Dashboard
CREATE OR REPLACE VIEW public.mobilization_momentum AS
SELECT 
    DATE_TRUNC('day', created_at) as day,
    COUNT(*) as activity_count
FROM public.activities
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY 1
ORDER BY 1 ASC;

-- 5. Seed some mock activities if table is empty (for visualization testing)
INSERT INTO public.activities (user_id, type, title, created_at)
SELECT 
    auth.uid(), 
    'signup', 
    'New Supporter Joined',
    NOW() - (n || ' hours')::interval
FROM generate_series(1, 24) n
WHERE EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid());
