-- ============================================
-- RHIC Dynamic Core Schema
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ehthkntdxnnulchhjblv/sql
-- ============================================

-- 1. Profile Adjustments
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS rank TEXT DEFAULT 'Silver';

-- 2. Missions System
CREATE TABLE public.missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    points INTEGER NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'High')),
    icon TEXT NOT NULL, -- Lucide icon name
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    mission_id UUID REFERENCES public.missions(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'joined' CHECK (status IN ('joined', 'completed')),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, mission_id)
);

-- 3. Policy Pipeline (Proposals)
CREATE TABLE public.proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'Trending' CHECK (status IN ('Trending', 'Shortlisted', 'Reviewing', 'Implemented')),
    votes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.proposal_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    proposal_id UUID REFERENCES public.proposals(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, proposal_id)
);

-- 4. RPC Functions

-- Toggle Proposal Vote
CREATE OR REPLACE FUNCTION public.toggle_proposal_vote(proposal_id_param UUID)
RETURNS void AS $$
DECLARE
    vote_exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM public.proposal_votes 
        WHERE user_id = auth.uid() AND proposal_id = proposal_id_param
    ) INTO vote_exists;

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
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Complete Mission
CREATE OR REPLACE FUNCTION public.complete_mission(mission_id_param UUID)
RETURNS void AS $$
DECLARE
    m_points INTEGER;
    m_status TEXT;
BEGIN
    -- Check if mission exists and user has joined
    SELECT status INTO m_status 
    FROM public.user_missions 
    WHERE user_id = auth.uid() AND mission_id = mission_id_param;

    IF m_status = 'joined' THEN
        -- Get points
        SELECT points INTO m_points FROM public.missions WHERE id = mission_id_param;
        
        -- Update mission status
        UPDATE public.user_missions 
        SET status = 'completed', completed_at = NOW()
        WHERE user_id = auth.uid() AND mission_id = mission_id_param;
        
        -- Add points to profile
        UPDATE public.profiles 
        SET points = points + m_points 
        WHERE id = auth.uid();
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RLS Policies
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Missions viewable by everyone" ON public.missions FOR SELECT USING (true);

ALTER TABLE public.user_missions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own missions" ON public.user_missions FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Proposals viewable by everyone" ON public.proposals FOR SELECT USING (true);
CREATE POLICY "Users can create proposals" ON public.proposals FOR INSERT WITH CHECK (auth.uid() = author_id);

ALTER TABLE public.proposal_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Votes viewable by everyone" ON public.proposal_votes FOR SELECT USING (true);
CREATE POLICY "Users can manage own vote" ON public.proposal_votes FOR ALL USING (auth.uid() = user_id);

-- 6. Initial Seed Data
INSERT INTO public.missions (title, description, category, points, difficulty, icon) VALUES
    ('Digital Advocacy Blitz', 'Share the latest Renewed Hope achievement graphics on your WhatsApp status and Twitter.', 'Digital Advocacy', 250, 'Easy', 'MessageSquare'),
    ('Innovator Recruitment', 'Onboard 5 new tech-native innovators into the RHIC platform using your unique referral link.', 'Recruitment', 1000, 'Medium', 'Users'),
    ('Campus Tech Meetup', 'Host a mini-session at your university to discuss digital economy opportunities.', 'Event', 2500, 'High', 'Rocket');

INSERT INTO public.proposals (title, author_id, category, excerpt, status, votes_count) VALUES
    ('Blockchain for Land Registry', NULL, 'Registry', 'Integrating blockchain technology into the national land registry system to eliminate fraud.', 'Reviewing', 1240),
    ('AI-Powered Agri-Advisor', NULL, 'Agri-Tech', 'A localized AI assistant that helps rural farmers optimize crop cycles.', 'Shortlisted', 850);
