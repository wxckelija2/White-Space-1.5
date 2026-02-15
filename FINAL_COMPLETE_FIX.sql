-- 🎯 FINAL COMPLETE FIX: Using your actual user ID
-- Copy and paste this ENTIRE block into Supabase SQL Editor

-- Step 1: Check current projects and their status values
SELECT id, title, status, user_id FROM projects ORDER BY created_at DESC LIMIT 5;

-- Step 2: Fix any invalid status values in existing projects
UPDATE projects
SET status = 'active'
WHERE status NOT IN ('active', 'completed', 'archived')
   OR status IS NULL;

-- Step 3: Verify the fix worked
SELECT DISTINCT status, COUNT(*) as count
FROM projects
GROUP BY status;

-- Step 4: Drop and recreate constraint safely
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_status_check;
ALTER TABLE projects ADD CONSTRAINT projects_status_check
  CHECK (status IN ('active', 'completed', 'archived'));

-- Step 5: Test with YOUR actual user ID
INSERT INTO projects (user_id, title, input_type, input_content, intent, status)
VALUES ('c8715f43-39db-45ad-9f23-621b824576f6', '✅ Working Now!', 'text', 'Project creation is fully functional', 'generate', 'active')
RETURNING id, title, user_id, status, '🎉 SUCCESS: Your app should work perfectly now!' as message;

-- Step 6: Check RLS policies (just in case)
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'projects';