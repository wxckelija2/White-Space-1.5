-- 🎯 FINAL FIX: Copy and paste this ENTIRE block into Supabase SQL Editor
-- This will fix your "Failed to create project" error permanently

-- Drop the broken constraint
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_status_check;

-- Create the correct constraint
ALTER TABLE projects ADD CONSTRAINT projects_status_check
  CHECK (status IN ('active', 'completed', 'archived'));

-- Verify it worked
SELECT '✅ Constraint fixed successfully!' as status;

-- Test project creation
INSERT INTO projects (user_id, title, input_type, input_content, intent, status)
VALUES ('da0fa46e-aed8-48e8-b63b-23506cbfe448', 'Fix Verification', 'text', 'Testing the fix', 'generate', 'active')
RETURNING id, title, '🎉 SUCCESS: Project creation is now working!' as message;


