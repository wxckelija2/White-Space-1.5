-- 🚀 Check Current RLS Policies on Drafts Table

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'drafts' AND schemaname = 'public';

-- List all policies on drafts table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'drafts'
ORDER BY policyname;

-- Test the policy logic manually
-- This should return the project if it exists and belongs to a user
SELECT
  p.id as project_id,
  p.user_id,
  p.title
FROM projects p
WHERE p.id = 'e3fc69fb-691f-4e63-abf3-c8f5b306e082'
  AND p.user_id = 'da0fa46e-aed8-48e8-b63b-23506cbfe448';