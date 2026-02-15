-- White Space Pro Database Diagnostic
-- Run this in Supabase SQL Editor to check if tables were created

-- Check if tables exist
SELECT
    schemaname,
    tablename,
    tableowner
FROM pg_tables
WHERE schemaname = 'public'
    AND tablename IN ('subscriptions', 'usage_stats', 'generated_images', 'projects', 'drafts', 'draft_outputs', 'user_settings')
ORDER BY tablename;

-- Check RLS status
SELECT
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
    AND tablename IN ('subscriptions', 'usage_stats', 'generated_images')
ORDER BY tablename;

-- Check policies
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE schemaname = 'public'
    AND tablename IN ('subscriptions', 'usage_stats', 'generated_images')
ORDER BY tablename, policyname;

-- Test table access (should return 0 rows if no data)
SELECT COUNT(*) as subscription_count FROM subscriptions;
SELECT COUNT(*) as usage_stats_count FROM usage_stats;
SELECT COUNT(*) as generated_images_count FROM generated_images;

-- Show current user info for debugging
SELECT auth.uid() as current_user_id, auth.jwt() as jwt_claims;