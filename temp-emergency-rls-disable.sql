-- EMERGENCY: Disable RLS to test if that's blocking project creation
-- This is safe for testing since you can re-enable it immediately after

ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- After testing in your app, RE-ENABLE security:
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;