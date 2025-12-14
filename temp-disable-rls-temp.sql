-- TEMPORARILY DISABLE RLS FOR TESTING
-- WARNING: This removes security - only use for testing!

ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE drafts DISABLE ROW LEVEL SECURITY;
ALTER TABLE draft_outputs DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings DISABLE ROW LEVEL SECURITY;

-- Now try creating a project in your app
-- If it works, the issue is RLS policies
-- After testing, RE-ENABLE RLS:

-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE draft_outputs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;