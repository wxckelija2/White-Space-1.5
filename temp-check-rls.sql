-- Check if RLS is enabled and what policies exist
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'projects';

-- Show all RLS policies for projects table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'projects'
ORDER BY policyname;

-- Test if we can see existing projects (should work if authenticated)
SELECT COUNT(*) as project_count FROM projects;

-- If RLS is blocking, temporarily disable it for testing
-- ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
-- Then test the insert again
-- Then re-enable: ALTER TABLE projects ENABLE ROW LEVEL SECURITY;