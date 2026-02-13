-- ============================================
-- RHIC Innovation & Media Schema
-- ============================================

-- 1. Innovation Arena
CREATE TABLE public.innovation_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    prize_pool TEXT NOT NULL,
    days_left INTEGER NOT NULL,
    teams_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Closed', 'Archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.challenge_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES public.innovation_challenges(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    team_name TEXT,
    solution_summary TEXT,
    solution_url TEXT,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewing', 'Shortlisted', 'Winner')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Media Centre
CREATE TABLE public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Image', 'Video', 'Graphics', 'Document')),
    format TEXT NOT NULL,
    size TEXT NOT NULL,
    download_url TEXT,
    category TEXT NOT NULL DEFAULT 'All',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RLS Policies
ALTER TABLE public.innovation_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Challenges viewable by everyone" ON public.innovation_challenges FOR SELECT USING (true);

ALTER TABLE public.challenge_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own submissions" ON public.challenge_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create submissions" ON public.challenge_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Assets viewable by everyone" ON public.media_assets FOR SELECT USING (true);

-- 4. Seed Data
INSERT INTO public.innovation_challenges (title, description, category, prize_pool, days_left) VALUES
    ('Agri-Tech Modernization', 'Build scalable IoT or software solutions to improve agricultural yield in North-Central Nigeria.', 'Agriculture', '₦5,000,000', 12),
    ('SME Digitization Engine', 'Create a simple inventory and payment system for local market traders in the South-West.', 'Fintech', '₦3,500,000', 5),
    ('Renewed Hope Identity', 'Improve citizen digital identity verification for social investment programs.', 'Gov-Tech', '₦2,000,000', 14);

INSERT INTO public.media_assets (title, type, format, size, category) VALUES
    ('Renewed Hope 2027 Main Logo', 'Image', 'PNG/SVG', '2.4MB', 'Graphics'),
    ('Youth Empowerment Success Stories', 'Video', 'MP4', '15MB', 'Video'),
    ('Social Media Carousel Pack #1', 'Graphics', 'ZIP', '8.5MB', 'Graphics'),
    ('Economic Achievement Brief 2026', 'Document', 'PDF', '1.2MB', 'Docs');
