-- ============================================
-- RHIC Platform Core Schema
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ehthkntdxnnulchhjblv/sql
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Chapters Table (37 chapters: 36 states + FCT)
CREATE TABLE public.chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state TEXT NOT NULL UNIQUE,
    zone TEXT NOT NULL CHECK (zone IN ('North-West', 'North-East', 'North-Central', 'South-West', 'South-East', 'South-South')),
    name TEXT NOT NULL,
    coordinator_id UUID REFERENCES auth.users(id),
    supporter_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    state TEXT,
    lga TEXT,
    ward TEXT,
    zone TEXT,
    chapter_id UUID REFERENCES public.chapters(id),
    role TEXT DEFAULT 'supporter' CHECK (role IN ('supporter', 'coordinator', 'admin', 'super_admin')),
    avatar_url TEXT,
    nin_verified BOOLEAN DEFAULT FALSE,
    membership_card_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities Table (event log)
CREATE TABLE public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('signup', 'login', 'event_rsvp', 'chapter_join', 'profile_update', 'verification')),
    title TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Chapters are viewable by everyone" ON public.chapters FOR SELECT USING (true);
CREATE POLICY "Admins can manage chapters" ON public.chapters FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own activities" ON public.activities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all activities" ON public.activities FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin', 'coordinator'))
);
CREATE POLICY "System can insert activities" ON public.activities FOR INSERT WITH CHECK (true);

-- Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, phone, avatar_url)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'phone', NEW.raw_user_meta_data->>'avatar_url');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed 37 chapters (36 states + FCT)
INSERT INTO public.chapters (state, zone, name) VALUES
    ('Abia', 'South-East', 'RHIC Abia Chapter'),
    ('Adamawa', 'North-East', 'RHIC Adamawa Chapter'),
    ('Akwa Ibom', 'South-South', 'RHIC Akwa Ibom Chapter'),
    ('Anambra', 'South-East', 'RHIC Anambra Chapter'),
    ('Bauchi', 'North-East', 'RHIC Bauchi Chapter'),
    ('Bayelsa', 'South-South', 'RHIC Bayelsa Chapter'),
    ('Benue', 'North-Central', 'RHIC Benue Chapter'),
    ('Borno', 'North-East', 'RHIC Borno Chapter'),
    ('Cross River', 'South-South', 'RHIC Cross River Chapter'),
    ('Delta', 'South-South', 'RHIC Delta Chapter'),
    ('Ebonyi', 'South-East', 'RHIC Ebonyi Chapter'),
    ('Edo', 'South-South', 'RHIC Edo Chapter'),
    ('Ekiti', 'South-West', 'RHIC Ekiti Chapter'),
    ('Enugu', 'South-East', 'RHIC Enugu Chapter'),
    ('FCT', 'North-Central', 'RHIC FCT Abuja Chapter'),
    ('Gombe', 'North-East', 'RHIC Gombe Chapter'),
    ('Imo', 'South-East', 'RHIC Imo Chapter'),
    ('Jigawa', 'North-West', 'RHIC Jigawa Chapter'),
    ('Kaduna', 'North-West', 'RHIC Kaduna Chapter'),
    ('Kano', 'North-West', 'RHIC Kano Chapter'),
    ('Katsina', 'North-West', 'RHIC Katsina Chapter'),
    ('Kebbi', 'North-West', 'RHIC Kebbi Chapter'),
    ('Kogi', 'North-Central', 'RHIC Kogi Chapter'),
    ('Kwara', 'North-Central', 'RHIC Kwara Chapter'),
    ('Lagos', 'South-West', 'RHIC Lagos Chapter'),
    ('Nasarawa', 'North-Central', 'RHIC Nasarawa Chapter'),
    ('Niger', 'North-Central', 'RHIC Niger Chapter'),
    ('Ogun', 'South-West', 'RHIC Ogun Chapter'),
    ('Ondo', 'South-West', 'RHIC Ondo Chapter'),
    ('Osun', 'South-West', 'RHIC Osun Chapter'),
    ('Oyo', 'South-West', 'RHIC Oyo Chapter'),
    ('Plateau', 'North-Central', 'RHIC Plateau Chapter'),
    ('Rivers', 'South-South', 'RHIC Rivers Chapter'),
    ('Sokoto', 'North-West', 'RHIC Sokoto Chapter'),
    ('Taraba', 'North-East', 'RHIC Taraba Chapter'),
    ('Yobe', 'North-East', 'RHIC Yobe Chapter'),
    ('Zamfara', 'North-West', 'RHIC Zamfara Chapter');
