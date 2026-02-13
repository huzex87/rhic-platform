-- Privilege Escalation: Granting huzex87@gmail.com Super Admin status
-- Title: Convener and National Coordinator

-- 1. Get the User ID from auth.users and update public.profiles
DO $$
DECLARE
    target_user_id UUID;
BEGIN
    SELECT id INTO target_user_id FROM auth.users WHERE email = 'huzex87@gmail.com';

    IF target_user_id IS NOT NULL THEN
        -- Update Profile Role and Title
        UPDATE public.profiles
        SET 
            role = 'super_admin',
            volunteer_role = 'Convener and National Coordinator',
            is_volunteer = TRUE,
            verified_volunteer_at = NOW()
        WHERE id = target_user_id;

        -- Update Auth Metadata to ensure the JWT reflects the new role
        -- Note: The user will need to log out and back in for metadata changes in JWT to fully propagate
        -- if the app reads directly from user_metadata.
        UPDATE auth.users
        SET raw_user_meta_data = raw_user_meta_data || 
            jsonb_build_object(
                'role', 'super_admin',
                'title', 'Convener and National Coordinator',
                'is_volunteer', true
            )
        WHERE id = target_user_id;

        -- Log Activity
        INSERT INTO public.activities (user_id, type, title, metadata)
        VALUES (
            target_user_id,
            'verification',
            'Super Admin Privileges Granted',
            jsonb_build_object('elevation_type', 'Manual CLI Override', 'timestamp', NOW())
        );

        RAISE NOTICE 'User huzex87@gmail.com successfully promoted to Super Admin.';
    ELSE
        RAISE EXCEPTION 'User huzex87@gmail.com not found in auth.users.';
    END IF;
END $$;
