-- If RLS is blocking project creation, temporarily disable it
-- WARNING: This removes security temporarily for testing!

-- Disable RLS on projects table
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Now try creating a project in your app
-- If it works, the issue is RLS policies

-- AFTER TESTING, re-enable security:
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;