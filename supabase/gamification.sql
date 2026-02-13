-- Phase 8: Elite Leaderboards & Gamification
-- Target: ehthkntdxnnulchhjblv

-- 1. Extend Profiles and Chapters
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS reputation_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'Supporter' CHECK (tier IN ('Supporter', 'Vanguard', 'Commander', 'Sentinel'));

ALTER TABLE public.chapters
ADD COLUMN IF NOT EXISTS momentum_score INTEGER DEFAULT 0;

-- 2. Reputation Calculation Logic
CREATE OR REPLACE FUNCTION public.calculate_user_reputation()
RETURNS TRIGGER AS $$
DECLARE
    points_to_add INTEGER := 0;
    current_reputation INTEGER;
    new_tier TEXT;
BEGIN
    -- Determine points based on activity type
    IF NEW.type = 'signup' THEN points_to_add := 50;
    ELSIF NEW.type = 'chapter_join' THEN points_to_add := 100;
    ELSIF NEW.type = 'report_verification' THEN points_to_add := 250;
    ELSIF NEW.type = 'verification' THEN points_to_add := 500; -- Official verification
    END IF;

    -- Update profile reputation
    UPDATE public.profiles
    SET reputation_score = reputation_score + points_to_add
    WHERE id = NEW.user_id
    RETURNING reputation_score INTO current_reputation;

    -- Update Tier based on reputation thresholds
    IF current_reputation >= 5000 THEN new_tier := 'Sentinel';
    ELSIF current_reputation >= 2000 THEN new_tier := 'Commander';
    ELSIF current_reputation >= 500 THEN new_tier := 'Vanguard';
    ELSE new_tier := 'Supporter';
    END IF;

    UPDATE public.profiles SET tier = new_tier WHERE id = NEW.user_id;

    -- Update Chapter Momentum
    IF NEW.chapter_id IS NOT NULL THEN
        UPDATE public.chapters
        SET momentum_score = momentum_score + points_to_add
        WHERE id = NEW.chapter_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Trigger on Activities
DROP TRIGGER IF EXISTS on_activity_reputation ON public.activities;
CREATE TRIGGER on_activity_reputation
AFTER INSERT ON public.activities
FOR EACH ROW EXECUTE FUNCTION public.calculate_user_reputation();

-- 4. Initial Momentum Sync for existing chapters
UPDATE public.chapters c
SET momentum_score = (
    SELECT COALESCE(SUM(p.reputation_score), 0)
    FROM public.profiles p
    WHERE p.chapter_id = c.id
);
