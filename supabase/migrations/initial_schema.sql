-- RENEWED HOPE INNOVATORS COALITION (RHIC) - INITIAL SCHEMA

-- 1. Profiles Table (Extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'member', -- member, coordinator, admin
  chapter_state TEXT,
  mobilization_rank TEXT DEFAULT 'Bronze',
  points INTEGER DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Chapters Table
CREATE TABLE chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  state_name TEXT UNIQUE NOT NULL,
  coordinator_id UUID REFERENCES profiles(id),
  member_count INTEGER DEFAULT 0,
  momentum_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Missions Table
CREATE TABLE missions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- Digital Advocacy, Recruitment, Event, Content
  points_reward INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Mission Submissions
CREATE TABLE mission_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  submission_url TEXT, -- Link to post, social share screenshot, etc.
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  admin_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Hackathons Table
CREATE TABLE hackathons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'upcoming', -- upcoming, active, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Hackathon Submissions
CREATE TABLE hackathon_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hackathon_id UUID REFERENCES hackathons(id) ON DELETE CASCADE,
  team_name TEXT NOT NULL,
  project_title TEXT NOT NULL,
  project_description TEXT,
  github_url TEXT,
  demo_url TEXT,
  submitter_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mission_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathon_submissions ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (Simplified for development)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Missions are viewable by everyone" ON missions FOR SELECT USING (true);
CREATE POLICY "Users can view own submissions" ON mission_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON mission_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
